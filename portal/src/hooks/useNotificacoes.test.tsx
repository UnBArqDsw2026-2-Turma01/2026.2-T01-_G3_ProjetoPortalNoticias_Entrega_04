import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { publicar } from "@/padroes/eventBus";
import { useNotificacoes } from "./useNotificacoes";

describe("useNotificacoes", () => {
  beforeEach(() => {
    // Limpa o estado do eventBus entre testes
    // (não há API para limpar handlers, então usamos um id único)
  });

  afterEach(() => {
    // não há estado global para limpar além do eventBus interno
  });

  it("começa com 3 notificações de exemplo", () => {
    const { result } = renderHook(() => useNotificacoes());
    expect(result.current.notificacoes).toHaveLength(3);
    expect(result.current.naoLidas).toBe(2); // 2 não lidas, 1 lida
  });

  it("publicar evento incrementa naoLidas", () => {
    const { result } = renderHook(() => useNotificacoes());
    const inicial = result.current.naoLidas;

    act(() => {
      publicar("noticia-publicada", { id: "n1", titulo: "Nova notícia" });
    });

    expect(result.current.naoLidas).toBe(inicial + 1);
    expect(result.current.notificacoes[0].titulo).toBe("Nova notícia");
    expect(result.current.notificacoes[0].lida).toBe(false);
  });

  it("marcarComoLidas zera naoLidas", () => {
    const { result } = renderHook(() => useNotificacoes());
    expect(result.current.naoLidas).toBeGreaterThan(0);

    act(() => {
      result.current.marcarComoLidas();
    });

    expect(result.current.naoLidas).toBe(0);
    expect(result.current.notificacoes.every((n) => n.lida)).toBe(true);
  });
});
it("eventos no mesmo milissegundo geram notificações com identidades distintas", () => {
  const agora = vi.spyOn(Date, "now").mockReturnValue(1234567890);
  try {
    const { result } = renderHook(() => useNotificacoes());
    act(() => {
      publicar("noticia-publicada", { titulo: "Primeira" });
      publicar("sugestao-enviada", { titulo: "Segunda" });
    });
    expect(result.current.notificacoes).toHaveLength(5);
    expect(new Set(result.current.notificacoes.map((n) => n.id)).size).toBe(5);
  } finally { agora.mockRestore(); }
});
