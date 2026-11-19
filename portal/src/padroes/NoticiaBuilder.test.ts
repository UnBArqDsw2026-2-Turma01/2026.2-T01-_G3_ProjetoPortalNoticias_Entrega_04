import { describe, expect, it } from "vitest";
import { NoticiaBuilder } from "./NoticiaBuilder";

describe("NoticiaBuilder", () => {
  it("monta uma notícia UGC passo a passo", () => {
    const noticia = new NoticiaBuilder()
      .comTitulo("Feira cultural movimenta a Praça da Liberdade")
      .comCategoria("cultura")
      .comParagrafos(["A feira reuniu artistas locais.", "O evento acontece até domingo."])
      .comAutor("Luís Cunha")
      .construir();

    expect(noticia.titulo).toBe("Feira cultural movimenta a Praça da Liberdade");
    expect(noticia.categoria).toBe("cultura");
    expect(noticia.autor).toBe("Luís Cunha");
    expect(noticia.conteudo).toEqual(["A feira reuniu artistas locais.", "O evento acontece até domingo."]);
    expect(noticia.resumo).toBe("A feira reuniu artistas locais.");
    expect(noticia.origem).toBe("ugc");
    expect(noticia.imagemUrl).toBe("/categorias/banner-cultura.jpg");
    expect(noticia.id).toMatch(/^feira-cultural-movimenta-a-praca-da-liberdade-/);
    expect(Number.isNaN(Date.parse(noticia.publicadaEm))).toBe(false);
  });

  it("recusa notícia sem título", () => {
    expect(() =>
      new NoticiaBuilder()
        .comCategoria("cultura")
        .comParagrafos(["Um parágrafo."])
        .comAutor("Luís Cunha")
        .construir(),
    ).toThrow(/título/i);
  });

  it("recusa notícia sem parágrafo", () => {
    expect(() =>
      new NoticiaBuilder()
        .comTitulo("Uma notícia")
        .comCategoria("cultura")
        .comParagrafos(["   "])
        .comAutor("Luís Cunha")
        .construir(),
    ).toThrow(/parágrafo/i);
  });

  it("gera ids diferentes para sugestões seguidas", () => {
    const criar = () =>
      new NoticiaBuilder()
        .comTitulo("Mesmo título")
        .comCategoria("esporte")
        .comParagrafos(["Texto."])
        .comAutor("Luís Cunha");

    const primeira = criar().construir();
    const segunda = criar().construir();

    expect(primeira.id).not.toBe(segunda.id);
  });
});
