import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
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