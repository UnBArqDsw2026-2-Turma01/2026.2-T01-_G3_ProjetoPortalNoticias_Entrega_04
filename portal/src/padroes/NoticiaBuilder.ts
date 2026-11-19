import type { Categoria, Noticia } from "@/types/noticia";

// Builder (GoF criacional) adaptado do Builder de montagem da notícia da Entrega 03:
// https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_03/tree/main/demonstracao_codigos/SubGrupo1/builder/js
//
// O que mudou na adaptação:
// - o produto é o contrato Noticia do portal (src/types/noticia.ts), e não o HTML do protótipo;
// - o Director não é necessário: o formulário de Sugerir Publicação já é o roteiro, chamando
//   um passo de cada vez;
// - os builders concretos de destaque/compacta/mista saíram: no portal quem escolhe o visual
//   é o PostCard (variante), não a notícia. O Builder cuida só dos dados;
// - a validação saiu do Director e ficou no construir(), com mensagens para o leitor.

const IMAGENS_PADRAO: Record<Categoria, string> = {
  politica: "/categorias/banner-politica.jpg",
  esporte: "/categorias/banner-esporte.jpg",
  tecnologia: "/categorias/banner-tecnologia.jpg",
  cultura: "/categorias/banner-cultura.jpg",
};

// Garante ids diferentes mesmo quando duas sugestões são enviadas no mesmo milissegundo.
let sequencia = 0;

/** Campo do formulário que originou o erro, para a tela mostrar a mensagem no lugar certo. */
export type CampoNoticia = "titulo" | "categoria" | "paragrafos" | "autor";

export class ErroNoticiaBuilder extends Error {
  constructor(
    readonly campo: CampoNoticia,
    mensagem: string,
  ) {
    super(mensagem);
    this.name = "ErroNoticiaBuilder";
  }
}

export class NoticiaBuilder {
  private titulo = "";
  private categoria: Categoria | null = null;
  private paragrafos: string[] = [];
  private autor = "";
  private resumo = "";
  private imagemUrl = "";

  comTitulo(titulo: string): this {
    this.titulo = titulo;
    return this;
  }

  comCategoria(categoria: Categoria): this {
    this.categoria = categoria;
    return this;
  }

  comParagrafos(paragrafos: readonly string[]): this {
    this.paragrafos = [...paragrafos];
    return this;
  }

  comAutor(autor: string): this {
    this.autor = autor;
    return this;
  }

  /** Opcional: sem resumo, o primeiro parágrafo vira a chamada do card. */
  comResumo(resumo: string): this {
    this.resumo = resumo;
    return this;
  }

  /** Opcional: sem imagem, usa o banner da categoria. */
  comImagem(imagemUrl: string): this {
    this.imagemUrl = imagemUrl;
    return this;
  }

  construir(): Noticia {
    const titulo = this.titulo.trim();
    const autor = this.autor.trim();
    const paragrafos = this.paragrafos.map((paragrafo) => paragrafo.trim()).filter(Boolean);

    if (!titulo) throw new ErroNoticiaBuilder("titulo", "Dê um título à sua publicação antes de enviar.");
    if (!this.categoria) throw new ErroNoticiaBuilder("categoria", "Escolha uma categoria para a publicação.");
    if (paragrafos.length === 0) {
      throw new ErroNoticiaBuilder("paragrafos", "Conte o que aconteceu em pelo menos um parágrafo.");
    }
    if (!autor) throw new ErroNoticiaBuilder("autor", "Informe seu nome para que a redação possa falar com você.");

    const categoria = this.categoria;
    const noticia: Noticia = {
      id: gerarId(titulo),
      titulo,
      resumo: this.resumo.trim() || resumir(paragrafos[0]),
      conteudo: paragrafos,
      categoria,
      autor,
      publicadaEm: new Date().toISOString(),
      imagemUrl: this.imagemUrl.trim() || IMAGENS_PADRAO[categoria],
      origem: "ugc",
    };

    // Depois de construir, o builder volta ao início para a próxima sugestão.
    this.limpar();
    return noticia;
  }

  private limpar() {
    this.titulo = "";
    this.categoria = null;
    this.paragrafos = [];
    this.autor = "";
    this.resumo = "";
    this.imagemUrl = "";
  }
}

function gerarId(titulo: string): string {
  const slug = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  sequencia += 1;
  return `${slug || "sugestao"}-${Date.now().toString(36)}-${sequencia}`;
}

function resumir(texto: string): string {
  const limpo = texto.replace(/\s+/g, " ").trim();
  return limpo.length <= 140 ? limpo : `${limpo.slice(0, 137).trimEnd()}...`;
}
