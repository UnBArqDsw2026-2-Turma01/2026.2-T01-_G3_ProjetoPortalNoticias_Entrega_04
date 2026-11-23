import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const CHAVE_PERFIL = "burburinho:perfil";

describe("perfil simulado", () => {
  let modulo: typeof import("./sessaoSimulada");

  beforeEach(async () => {
    vi.resetModules();
    window.localStorage.clear();
    modulo = await import("./sessaoSimulada");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("começa com o perfil padrão", () => {
    expect(modulo.lerPerfil()).toEqual(modulo.PERFIL_PADRAO);
  });

  it("salva nome e foto e lê de volta", () => {
    modulo.salvarPerfil({ nome: "  Luis Felipe  ", foto: "data:image/webp;base64,abc" });

    expect(modulo.lerPerfil()).toEqual({
      nome: "Luis Felipe",
      foto: "data:image/webp;base64,abc",
    });
    expect(JSON.parse(window.localStorage.getItem(CHAVE_PERFIL)!)).toEqual({
      nome: "Luis Felipe",
      foto: "data:image/webp;base64,abc",
    });
  });

  it("ignora nome vazio e foto que não seja data URL de imagem", () => {
    window.localStorage.setItem(
      CHAVE_PERFIL,
      JSON.stringify({ nome: "   ", foto: "https://exemplo.com/foto.jpg" }),
    );

    expect(modulo.lerPerfil()).toEqual(modulo.PERFIL_PADRAO);
  });

  it("mantém a edição em memória quando o localStorage bloqueia a gravação", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("cota cheia");
    });

    modulo.salvarPerfil({ nome: "Luis", foto: null });

    expect(modulo.lerPerfil()).toEqual({ nome: "Luis", foto: null });
  });

  it("aceita o nome padrão quando o nome salvo está vazio", () => {
    modulo.salvarPerfil({ nome: "   ", foto: null });

    expect(modulo.lerPerfil()).toEqual(modulo.PERFIL_PADRAO);
  });
});
