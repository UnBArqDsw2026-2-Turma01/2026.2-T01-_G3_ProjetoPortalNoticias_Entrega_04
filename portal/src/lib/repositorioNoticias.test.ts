import { describe, expect, it } from "vitest";
import { noticiasIniciais } from "@/data/noticias";
import { CATEGORIAS, type Noticia } from "@/types/noticia";
import { RepositorioNoticias, repositorioNoticias } from "./repositorioNoticias";

describe("RepositorioNoticias (Singleton)", () => {
  it("sempre devolve a mesma instância", () => {
    expect(RepositorioNoticias.getInstancia()).toBe(RepositorioNoticias.getInstancia());
    expect(RepositorioNoticias.getInstancia()).toBe(repositorioNoticias);
    expect(RepositorioNoticias.totalInstanciasCriadas).toBe(1);
  });

  it("lista todas as notícias da mais recente para a mais antiga", () => {
    const todas = repositorioNoticias.listarTodas();
    expect(todas).toHaveLength(noticiasIniciais.length);
    for (let i = 1; i < todas.length; i++) {
      expect(Date.parse(todas[i - 1].publicadaEm)).toBeGreaterThanOrEqual(Date.parse(todas[i].publicadaEm));
    }
  });

  it.each(CATEGORIAS)("listarPorCategoria('%s') só devolve aquela categoria e não vem vazia", (categoria) => {
    const lista = repositorioNoticias.listarPorCategoria(categoria);
    expect(lista.length).toBeGreaterThan(0);
    expect(lista.every((n) => n.categoria === categoria)).toBe(true);
  });

  it("encontra uma notícia pelo id e devolve undefined para id inexistente", () => {
    expect(repositorioNoticias.buscarPorId("festival-de-rua-movimenta-o-centro")?.titulo).toBe(
      "Festival de rua movimenta o Centro neste fim de semana",
    );
    expect(repositorioNoticias.buscarPorId("nao-existe")).toBeUndefined();
  });

  it("busca sem diferenciar maiúsculas nem acentos", () => {
    const resultado = repositorioNoticias.buscar("OLIMPIADAS");
    expect(resultado.map((n) => n.id)).toContain("tenis-nas-olimpiadas");
    expect(repositorioNoticias.buscar("   ")).toEqual([]);
  });

  it("só lista como destaque as notícias marcadas", () => {
    const destaques = repositorioNoticias.listarDestaques();
    expect(destaques.length).toBeGreaterThan(0);
    expect(destaques.every((n) => n.destaque)).toBe(true);
  });

  it("não deixa quem consulta alterar a lista interna (encapsulamento)", () => {
    const lista = repositorioNoticias.listarTodas();
    lista.pop();
    lista[0].conteudo.push("alteração indevida");
    expect(repositorioNoticias.listarTodas()).toHaveLength(noticiasIniciais.length);
    const original = repositorioNoticias.buscarPorId(lista[0].id);
    expect(original?.conteudo).not.toContain("alteração indevida");
  });

  it("guarda sugestões de leitores separadas das notícias publicadas", () => {
    const sugestao: Noticia = {
      id: "sugestao-teste",
      titulo: "Sugestão de teste",
      resumo: "Resumo",
      conteudo: ["Parágrafo"],
      categoria: "cultura",
      autor: "Leitor",
      publicadaEm: "2026-11-19T12:00:00-03:00",
      imagemUrl: "/noticias/feira-cultural.jpg",
      origem: "redacao",
    };
    repositorioNoticias.adicionarSugestao(sugestao);

    expect(repositorioNoticias.listarSugestoes().map((s) => s.id)).toContain("sugestao-teste");
    expect(repositorioNoticias.listarSugestoes()[0].origem).toBe("ugc");
    expect(repositorioNoticias.buscarPorId("sugestao-teste")).toBeUndefined();
    expect(() => repositorioNoticias.adicionarSugestao(sugestao)).toThrow();
    expect(() => repositorioNoticias.adicionarSugestao({ ...sugestao, id: "x", titulo: " " })).toThrow();
  });
});

describe("dados de exemplo", () => {
  it("têm ids únicos e no mínimo 3 notícias por categoria", () => {
    const ids = noticiasIniciais.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const categoria of CATEGORIAS) {
      expect(noticiasIniciais.filter((n) => n.categoria === categoria).length).toBeGreaterThanOrEqual(3);
    }
  });
});
