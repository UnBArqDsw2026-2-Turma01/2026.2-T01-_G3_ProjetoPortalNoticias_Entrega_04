import { createElement, type CSSProperties, type ReactNode } from "react";
import { AgendaEventos } from "@/components/AgendaEventos";
import { eventosCulturais } from "@/data/eventos";
import { CATEGORIAS, NOMES_CATEGORIAS, type Categoria } from "@/types/noticia";

// Abstract Factory (GoF criacional) reaproveitado da Entrega 03: cada categoria é uma família
// de produtos (tema, textos e seção própria) e as telas só conhecem a fábrica e os produtos abstratos.
// https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_03/tree/main/demonstracao_codigos/SubGrupo1/abstract-factory

// ---------------------------------------------------------------- Produtos

export interface IconeCategoria {
  src: string;
  largura: number;
  altura: number;
}

/** Produto 1: identidade visual. O `estilo()` aplica a família na tela (o aplicar() da Entrega 03). */
export class TemaCategoria {
  constructor(
    readonly categoria: Categoria,
    readonly cor: string,
    readonly icone: IconeCategoria,
    readonly banner: { readonly src: string; readonly posicao: string },
  ) {}

  estilo(): CSSProperties {
    return { "--cor-categoria": this.cor, "--posicao-banner": this.banner.posicao } as CSSProperties;
  }
}

/** Produto 2: textos da categoria. */
export interface ApresentacaoCategoria {
  readonly categoria: Categoria;
  readonly nome: string;
  readonly descricao: string;
  readonly membros: string;
}

/** Produto 3: seção própria da categoria, com comportamento diferente em cada família. */
export abstract class SecaoCategoria {
  abstract renderizar(): ReactNode;
}

/** Cultura: bloco "Eventos" do Figma. */
export class SecaoEventos extends SecaoCategoria {
  renderizar(): ReactNode {
    return createElement(AgendaEventos, { eventos: eventosCulturais });
  }
}

/** Política, Esporte e Tecnologia não têm seção própria no Figma (Null Object: não desenha nada). */
export class SecaoVazia extends SecaoCategoria {
  renderizar(): ReactNode {
    return null;
  }
}

// ---------------------------------------------------------------- Fábrica abstrata

export abstract class FabricaCategoria {
  abstract criarTema(): TemaCategoria;
  abstract criarApresentacao(): ApresentacaoCategoria;
  abstract criarSecao(): SecaoCategoria;

  /** O definirFactory() da Entrega 03. */
  static para(categoria: Categoria): FabricaCategoria {
    const Fabrica = FABRICAS[categoria];
    if (!Fabrica) {
      throw new Error(`Categoria desconhecida: ${categoria}`);
    }
    return new Fabrica();
  }
}

// ---------------------------------------------------------------- Fábricas concretas

class FabricaPolitica extends FabricaCategoria {
  criarTema() {
    return new TemaCategoria(
      "politica",
      "var(--cor-politica)",
      { src: "/icones/sidebar/icone-politica.svg", largura: 15, altura: 15 },
      { src: "/categorias/banner-politica.jpg", posicao: "center 70%" },
    );
  }

  criarApresentacao(): ApresentacaoCategoria {
    return {
      categoria: "politica",
      nome: NOMES_CATEGORIAS.politica,
      descricao:
        "Acompanhe as principais notícias e acontecimentos da política no Brasil e no mundo. Confira decisões, debates, eleições, projetos de lei e os principais acontecimentos que impactam a sociedade.",
      membros: "12 mil membros",
    };
  }

  criarSecao() {
    return new SecaoVazia();
  }
}

class FabricaEsporte extends FabricaCategoria {
  criarTema() {
    return new TemaCategoria(
      "esporte",
      "var(--cor-esporte)",
      { src: "/icones/sidebar/icone-esporte.svg", largura: 15, altura: 15 },
      { src: "/categorias/banner-esporte.jpg", posicao: "center 53%" },
    );
  }

  criarApresentacao(): ApresentacaoCategoria {
    return {
      categoria: "esporte",
      nome: NOMES_CATEGORIAS.esporte,
      descricao:
        "Acompanhe as principais notícias do mundo dos esportes. Confira resultados, competições, transferências, destaques, análises e tudo o que movimenta atletas, clubes e torcedores no Brasil e no mundo.",
      membros: "58 membros",
    };
  }

  criarSecao() {
    return new SecaoVazia();
  }
}

class FabricaTecnologia extends FabricaCategoria {
  criarTema() {
    return new TemaCategoria(
      "tecnologia",
      "var(--cor-tecnologia)",
      { src: "/icones/sidebar/icone-tecnologia.svg", largura: 15, altura: 11 },
      { src: "/categorias/banner-tecnologia.jpg", posicao: "center" },
    );
  }

  criarApresentacao(): ApresentacaoCategoria {
    return {
      categoria: "tecnologia",
      nome: NOMES_CATEGORIAS.tecnologia,
      descricao:
        "Fique por dentro das principais novidades do mundo da tecnologia. Acompanhe lançamentos, inovação, inteligência artificial, ciência, aplicativos, dispositivos e as tendências que estão transformando a sociedade e o nosso dia a dia.",
      membros: "50 mil membros",
    };
  }

  criarSecao() {
    return new SecaoVazia();
  }
}

class FabricaCultura extends FabricaCategoria {
  criarTema() {
    return new TemaCategoria(
      "cultura",
      "var(--cor-cultura)",
      { src: "/icones/sidebar/icone-cultura.svg", largura: 13, altura: 13 },
      { src: "/categorias/banner-cultura.jpg", posicao: "center" },
    );
  }

  criarApresentacao(): ApresentacaoCategoria {
    return {
      categoria: "cultura",
      nome: NOMES_CATEGORIAS.cultura,
      descricao:
        "Explore as histórias, manifestações e acontecimentos que movimentam a cultura. Aqui você encontra notícias sobre música, cinema, arte, literatura, televisão, eventos e muito mais, acompanhando as tendências e os principais destaques do cenário cultural.",
      membros: "5 membros",
    };
  }

  criarSecao() {
    return new SecaoEventos();
  }
}

// Record<Categoria, ...>: o TypeScript acusa se faltar a fábrica de alguma categoria.
const FABRICAS: Record<Categoria, new () => FabricaCategoria> = {
  politica: FabricaPolitica,
  esporte: FabricaEsporte,
  tecnologia: FabricaTecnologia,
  cultura: FabricaCultura,
};

export function ehCategoria(valor: string): valor is Categoria {
  return (CATEGORIAS as readonly string[]).includes(valor);
}
