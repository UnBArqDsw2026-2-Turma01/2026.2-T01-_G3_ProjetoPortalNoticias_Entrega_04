import { afterEach, describe, expect, it, vi } from "vitest";
import { assinar, publicar } from "./eventBus";

const cancelamentos: (() => void)[] = [];
afterEach(() => { cancelamentos.splice(0).forEach((cancelar) => cancelar()); vi.restoreAllMocks(); });

describe("EventBus: isolamento e contrato de entrega", () => {
  it("continua entregando se um assinante lança exceção", () => {
    const erro = vi.spyOn(console, "error").mockImplementation(() => {});
    const receptor = vi.fn();
    cancelamentos.push(assinar("falha", () => { throw new Error("falhou"); }), assinar("falha", receptor));
    expect(() => publicar("falha", { titulo: "notícia" })).not.toThrow();
    expect(receptor).toHaveBeenCalledWith({ titulo: "notícia" });
    expect(erro).toHaveBeenCalledOnce();
  });

  it("trata rejeição assíncrona sem impedir o outro assinante", async () => {
    const erro = vi.spyOn(console, "error").mockImplementation(() => {});
    const receptor = vi.fn();
    cancelamentos.push(assinar("async", async () => { throw new Error("falhou"); }), assinar("async", receptor));
    publicar("async", "dados");
    await Promise.resolve();
    expect(receptor).toHaveBeenCalledWith("dados");
    expect(erro).toHaveBeenCalledOnce();
  });

  it("aceita nomes que colidiam com propriedades de Object", () => {
    const receptor = vi.fn();
    const cancelar = assinar("constructor", receptor);
    cancelamentos.push(cancelar);
    publicar("constructor", 1);
    cancelar();
    publicar("constructor", 2);
    expect(receptor).toHaveBeenCalledExactlyOnceWith(1);
  });

  it("cancelar durante a entrega só afeta as próximas publicações", () => {
    const receptor = vi.fn();
    const primeiro = assinar("cancelamento", () => segundo());
    const segundo = assinar("cancelamento", receptor);
    cancelamentos.push(primeiro, segundo);
    publicar("cancelamento", 1);
    publicar("cancelamento", 2);
    expect(receptor).toHaveBeenCalledExactlyOnceWith(1);
  });
});
