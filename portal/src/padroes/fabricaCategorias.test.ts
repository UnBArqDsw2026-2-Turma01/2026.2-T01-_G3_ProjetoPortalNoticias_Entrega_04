import { describe, expect, it } from "vitest";
import { CATEGORIAS, NOMES_CATEGORIAS, type Categoria } from "@/types/noticia";
import { ehCategoria, FabricaCategoria, SecaoEventos, SecaoVazia, TemaCategoria } from "./fabricaCategorias";

describe("FabricaCategoria (Abstract Factory)", () => {
  it.each(CATEGORIAS)("a fábrica de '%s' cria uma família completa e da mesma categoria", (categoria) => {
    const fabrica = FabricaCategoria.para(categoria);
    const tema = fabrica.criarTema();
    const apresentacao = fabrica.criarApresentacao();

    expect(tema).toBeInstanceOf(TemaCategoria);
    expect(tema.categoria).toBe(categoria);
    expect(apresentacao.categoria).toBe(categoria);
    expect(apresentacao.nome).toBe(NOMES_CATEGORIAS[categoria]);
    expect(tema.banner.src).toBe(`/categorias/banner-${categoria}.jpg`);
  });

  it("o tema aplica a família na tela pelas variáveis CSS", () => {
    const estilo = FabricaCategoria.para("esporte").criarTema().estilo() as Record<string, string>;
    expect(estilo["--cor-categoria"]).toBe("var(--cor-esporte)");
    expect(estilo["--posicao-banner"]).toBe("center 53%");
  });

  it("a seção própria muda de comportamento conforme a família", () => {
    expect(FabricaCategoria.para("cultura").criarSecao()).toBeInstanceOf(SecaoEventos);
    expect(FabricaCategoria.para("cultura").criarSecao().renderizar()).not.toBeNull();

    for (const categoria of ["politica", "esporte", "tecnologia"] as const) {
      const secao = FabricaCategoria.para(categoria).criarSecao();
      expect(secao).toBeInstanceOf(SecaoVazia);
      expect(secao.renderizar()).toBeNull();
    }
  });

  it("cada categoria tem a sua própria família (nenhum produto repetido entre elas)", () => {
    const temas = CATEGORIAS.map((c) => FabricaCategoria.para(c).criarTema());
    expect(new Set(temas.map((t) => t.cor)).size).toBe(CATEGORIAS.length);
    expect(new Set(temas.map((t) => t.banner.src)).size).toBe(CATEGORIAS.length);
  });

  it("recusa uma categoria que não existe", () => {
    expect(() => FabricaCategoria.para("economia" as Categoria)).toThrow("Categoria desconhecida");
  });

  it("ehCategoria só aceita as categorias do contrato", () => {
    expect(ehCategoria("cultura")).toBe(true);
    expect(ehCategoria("Cultura")).toBe(false);
    expect(ehCategoria("economia")).toBe(false);
  });
});
