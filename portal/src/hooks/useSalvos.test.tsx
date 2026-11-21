import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { renderHook, act, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSalvos } from "./useSalvos";

describe("useSalvos", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("alternar salva e remove", () => {
    const { result } = renderHook(() => useSalvos());

    // Começa vazio
    expect(result.current.idsSalvos).toHaveLength(0);
    expect(result.current.estaSalvo("noticia-1")).toBe(false);

    // Salvar
    act(() => {
      result.current.alternar("noticia-1");
    });
    expect(result.current.estaSalvo("noticia-1")).toBe(true);
    expect(result.current.idsSalvos).toContain("noticia-1");

    // Remover (alternar de novo)
    act(() => {
      result.current.alternar("noticia-1");
    });
    expect(result.current.estaSalvo("noticia-1")).toBe(false);
    expect(result.current.idsSalvos).not.toContain("noticia-1");
  });

  it("persiste no localStorage e sobrevive ao recarregar", () => {
    const { result } = renderHook(() => useSalvos());

    act(() => {
      result.current.alternar("noticia-1");
    });

    // Simula recriação do hook (recarregar a página)
    const { result: resultado2 } = renderHook(() => useSalvos());
    expect(resultado2.current.estaSalvo("noticia-1")).toBe(true);
  });

  it("remove(id) remove um id específico", () => {
    const { result } = renderHook(() => useSalvos());

    act(() => {
      result.current.alternar("noticia-1");
      result.current.alternar("noticia-2");
    });
    expect(result.current.idsSalvos).toHaveLength(2);

    act(() => {
      result.current.remover("noticia-1");
    });
    expect(result.current.estaSalvo("noticia-1")).toBe(false);
    expect(result.current.estaSalvo("noticia-2")).toBe(true);
    expect(result.current.idsSalvos).toHaveLength(1);
  });

  it("protege contra localStorage indisponível (servidor)", () => {
    const originalLocalStorage = window.localStorage;
    // Simula ambiente sem window.localStorage (export estático no servidor)
    Object.defineProperty(window, "localStorage", {
      get: () => undefined,
      configurable: true,
    });

    expect(() => {
      renderHook(() => useSalvos());
    }).not.toThrow();

    // Restaura
    Object.defineProperty(window, "localStorage", {
      get: () => originalLocalStorage,
      configurable: true,
    });
  });
});
describe("useSalvos reutilizado entre telas", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: null })));
    cleanup();
  });

  it("dois consumidores compartilham mudanças sem sobrescrever o outro", () => {
    const a = renderHook(() => useSalvos());
    const b = renderHook(() => useSalvos());
    act(() => { a.result.current.alternar("a"); b.result.current.alternar("b"); });
    expect(a.result.current.idsSalvos).toEqual(["a", "b"]);
    expect(b.result.current.idsSalvos).toEqual(["a", "b"]);
    act(() => b.result.current.remover("a"));
    expect(a.result.current.idsSalvos).toEqual(["b"]);
    expect(JSON.parse(window.localStorage.getItem("burburinho:salvos")!)).toEqual(["b"]);
  });

  it("acompanha alterações e limpeza feitas em outra aba", () => {
    const { result } = renderHook(() => useSalvos());
    act(() => {
      window.localStorage.setItem("burburinho:salvos", '["outra-aba"]');
      window.dispatchEvent(new StorageEvent("storage", { key: "burburinho:salvos", storageArea: window.localStorage }));
    });
    expect(result.current.idsSalvos).toEqual(["outra-aba"]);
    act(() => { window.localStorage.clear(); window.dispatchEvent(new StorageEvent("storage", { key: null })); });
    expect(result.current.idsSalvos).toEqual([]);
  });

  it("preserva a escolha na aba mesmo se a gravação for bloqueada", () => {
    const a = renderHook(() => useSalvos());
    const b = renderHook(() => useSalvos());
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
    act(() => a.result.current.alternar("a"));
    expect(b.result.current.idsSalvos).toEqual(["a"]);
    act(() => b.result.current.alternar("b"));
    expect(a.result.current.idsSalvos).toEqual(["a", "b"]);
  });

  it("hidrata HTML estático sem divergência nem apagar dados persistidos", async () => {
    window.localStorage.setItem("burburinho:salvos", '["persistida"]');
    function Contagem() { return <span>{useSalvos().idsSalvos.length}</span>; }
    const container = document.createElement("div");
    container.innerHTML = renderToString(<Contagem />);
    expect(container.textContent).toBe("0");
    const onRecoverableError = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <Contagem />, { onRecoverableError }); });
    expect(container.textContent).toBe("1");
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(window.localStorage.getItem("burburinho:salvos")).toBe('["persistida"]');
    act(() => root!.unmount());
  });
});
