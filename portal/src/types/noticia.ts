// Contrato compartilhado: todo componente, página e hook que lida com notícias importa daqui.
// Mudar este arquivo afeta o portal inteiro, então combine no grupo antes de alterar.

export type Categoria = "politica" | "esporte" | "tecnologia" | "cultura";

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string[]; // um item por parágrafo
  categoria: Categoria;
  autor: string;
  publicadaEm: string; // data ISO 8601, ex.: '2026-11-18T09:42:00-03:00'
  imagemUrl: string; // caminho em /public, ex.: '/noticias/festival-centro.jpg'
  origem: "redacao" | "ugc"; // ugc = conteúdo gerado pelo usuário (Sugerir Publicação)
  destaque?: boolean;
}

// Ordem e nomes de exibição das categorias, reutilizados em menus, badges e páginas.
export const CATEGORIAS: readonly Categoria[] = ["politica", "esporte", "tecnologia", "cultura"];

export const NOMES_CATEGORIAS: Record<Categoria, string> = {
  politica: "Política",
  esporte: "Esporte",
  tecnologia: "Tecnologia",
  cultura: "Cultura",
};
