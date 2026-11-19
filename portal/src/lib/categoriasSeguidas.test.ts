import { beforeEach, describe, expect, it } from "vitest";
import { definirCategoriasSeguidas, lerCategoriasSeguidas, SEGUIDAS_PADRAO, seguirCategoria } from "./categoriasSeguidas";

const CHAVE = "burburinho:categorias-seguidas";

describe("categoriasSeguidas", () => {
  beforeEach(() => window.localStorage.clear());

  it("sem nada salvo, usa as categorias do usuário de exemplo do Figma", () => {
    expect(lerCategoriasSeguidas()).toEqual(["esporte", "cultura", "politica"]);
    expect(lerCategoriasSeguidas()).toBe(SEGUIDAS_PADRAO);
  });

  it("seguir e deixar de seguir ficam salvos no localStorage, na ordem em que foram seguidas", () => {
    seguirCategoria("tecnologia", true);
    seguirCategoria("esporte", false);

    expect(JSON.parse(window.localStorage.getItem(CHAVE)!)).toEqual(["cultura", "politica", "tecnologia"]);
    expect(lerCategoriasSeguidas()).toEqual(["cultura", "politica", "tecnologia"]);
  });

  it("devolve o mesmo array enquanto nada muda (exigência do useSyncExternalStore)", () => {
    definirCategoriasSeguidas(["cultura"]);
    expect(lerCategoriasSeguidas()).toBe(lerCategoriasSeguidas());
  });

  it("ignora valores inválidos no armazenamento", () => {
    window.localStorage.setItem(CHAVE, '["economia", "cultura"]');
    expect(lerCategoriasSeguidas()).toEqual(["cultura"]);

    window.localStorage.setItem(CHAVE, "{quebrado");
    expect(lerCategoriasSeguidas()).toEqual(SEGUIDAS_PADRAO);
  });

  it("seguir uma categoria já seguida não altera nada", () => {
    seguirCategoria("esporte", true);
    expect(window.localStorage.getItem(CHAVE)).toBeNull();
  });
});
