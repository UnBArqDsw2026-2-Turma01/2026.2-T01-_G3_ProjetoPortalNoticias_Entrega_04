import { noticiasIniciais } from "@/data/noticias";
import type { Categoria, Noticia } from "@/types/noticia";

/**
 * Singleton (GoF criacional), reaproveitado da Entrega 03:
 * https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_03/tree/main/demonstracao_codigos/SubGrupo1/singleton
 *
 * É a ÚNICA fonte de notícias do portal. Toda página, componente ou hook pede as notícias
 * aqui, nunca ao array de src/data. Assim, trocar os dados de exemplo por uma API no futuro
 * exige mudar só este arquivo.
 *
 * O que mudou em relação à versão da Entrega 03 (JavaScript):
 * - TypeScript tem `private constructor`: o compilador já impede `new RepositorioNoticias()`,
 *   então saiu o truque da flag `#liberado` que o JS precisava;
 * - as notícias seguem o contrato `Noticia` (src/types/noticia.ts), compartilhado com todo o portal;
 * - novas consultas que as telas precisam: buscarPorId, buscar (busca textual) e listarTodas;
 * - sugestões dos leitores (UGC) ficam separadas das notícias publicadas, aguardando moderação.
 *
 * Limitação (senso crítico): sem back-end, os dados vivem na memória de cada ambiente.
 * O build estático cria uma instância ao gerar o HTML e o navegador cria outra ao carregar o
 * JavaScript; uma sugestão enviada some ao recarregar a página.
 */
export class RepositorioNoticias {
  private static instancia: RepositorioNoticias | null = null;
  private static instanciasCriadas = 0; // usado nos testes para provar o padrão

  private readonly noticias: Noticia[];
  private readonly sugestoes: Noticia[] = [];

  // Construtor privado: só getInstancia() consegue criar o objeto.
  private constructor(noticiasIniciaisDoPortal: Noticia[]) {
    // Copia para que ninguém altere os dados de exemplo por fora.
    this.noticias = noticiasIniciaisDoPortal.map(copiar);
    RepositorioNoticias.instanciasCriadas++;
  }

  /** Ponto global de acesso: cria a instância só na primeira chamada (inicialização preguiçosa). */
  static getInstancia(): RepositorioNoticias {
    if (RepositorioNoticias.instancia === null) {
      RepositorioNoticias.instancia = new RepositorioNoticias(noticiasIniciais);
    }
    return RepositorioNoticias.instancia;
  }

  static get totalInstanciasCriadas(): number {
    return RepositorioNoticias.instanciasCriadas;
  }

  /** Todas as notícias publicadas, da mais recente para a mais antiga. */
  listarTodas(): Noticia[] {
    return ordenarPorData(this.noticias);
  }

  /** As `quantidade` notícias mais recentes. */
  listarRecentes(quantidade = 5): Noticia[] {
    return this.listarTodas().slice(0, quantidade);
  }

  buscarPorId(id: string): Noticia | undefined {
    const encontrada = this.noticias.find((n) => n.id === id);
    return encontrada ? copiar(encontrada) : undefined;
  }

  listarPorCategoria(categoria: Categoria): Noticia[] {
    return ordenarPorData(this.noticias.filter((n) => n.categoria === categoria));
  }

  listarDestaques(): Noticia[] {
    return ordenarPorData(this.noticias.filter((n) => n.destaque));
  }

  /** Busca no título, no resumo e no autor, sem diferenciar maiúsculas nem acentos. */
  buscar(termo: string): Noticia[] {
    const procurado = normalizar(termo.trim());
    if (procurado === "") return [];
    return this.listarTodas().filter((n) =>
      [n.titulo, n.resumo, n.autor].some((campo) => normalizar(campo).includes(procurado)),
    );
  }

  /**
   * Recebe uma notícia sugerida por um leitor (montada pelo NoticiaBuilder, vaga 4) e a guarda
   * como pendente de moderação. Ela NÃO aparece nas listagens de notícias publicadas.
   */
  adicionarSugestao(noticia: Noticia): void {
    if (!noticia.titulo.trim()) {
      throw new Error("Só é possível sugerir uma notícia com título.");
    }
    if (this.sugestoes.some((s) => s.id === noticia.id)) {
      throw new Error(`Já existe uma sugestão com o id "${noticia.id}".`);
    }
    this.sugestoes.push({ ...copiar(noticia), origem: "ugc" });
  }

  listarSugestoes(): Noticia[] {
    return ordenarPorData(this.sugestoes);
  }
}

// As consultas devolvem CÓPIAS (da lista e de cada notícia): quem lê não consegue mexer nos dados
// internos (encapsulamento). Copiar só o array não basta: os objetos lá dentro continuariam
// sendo os mesmos, e o teste "não deixa quem consulta alterar a lista interna" pegou esse erro.
function copiar(noticia: Noticia): Noticia {
  return { ...noticia, conteudo: [...noticia.conteudo] };
}

function ordenarPorData(lista: Noticia[]): Noticia[] {
  return lista.map(copiar).sort((a, b) => Date.parse(b.publicadaEm) - Date.parse(a.publicadaEm));
}

function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Atalho usado pelas páginas e componentes: `import { repositorioNoticias } from "@/lib/repositorioNoticias"`. */
export const repositorioNoticias = RepositorioNoticias.getInstancia();
