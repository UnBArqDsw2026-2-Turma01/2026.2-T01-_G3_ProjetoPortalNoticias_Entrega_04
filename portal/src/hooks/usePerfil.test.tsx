import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { usePerfil } from "./usePerfil";

const CHAVE_PERFIL = "burburinho:perfil";

describe("usePerfil", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("começa com o perfil padrão e salva nome e foto", () => {
    const { result } = renderHook(() => usePerfil());

    expect(result.current.nome).toBe("Usuário anônimo");
    expect(result.current.foto).toBeNull();

    act(() => {
      result.current.salvar({ nome: "Luis Felipe", foto: "data:image/webp;base64,abc" });
    });

    expect(result.current.nome).toBe("Luis Felipe");
    expect(result.current.foto).toBe("data:image/webp;base64,abc");
    expect(JSON.parse(window.localStorage.getItem(CHAVE_PERFIL)!)).toEqual({
      nome: "Luis Felipe",
      foto: "data:image/webp;base64,abc",
    });
  });

  it("dois consumidores compartilham a mesma edição", () => {
    const a = renderHook(() => usePerfil());
    const b = renderHook(() => usePerfil());

    act(() => {
      a.result.current.salvar({ nome: "Luis", foto: null });
    });

    expect(b.result.current.nome).toBe("Luis");
  });

  it("acompanha uma edição feita em outra aba", () => {
    const { result } = renderHook(() => usePerfil());

    act(() => {
      window.localStorage.setItem(
        CHAVE_PERFIL,
        JSON.stringify({ nome: "Outra aba", foto: null }),
      );
      window.dispatchEvent(
        new StorageEvent("storage", { key: CHAVE_PERFIL, storageArea: window.localStorage }),
      );
    });

    expect(result.current.nome).toBe("Outra aba");
  });
});
