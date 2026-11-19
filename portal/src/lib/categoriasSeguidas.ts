// Categorias que o usuário segue, guardadas no localStorage (mesmo padrão do sessaoSimulada).
// Enquanto ele não seguir nem deixar de seguir nada, vale a lista do usuário de exemplo do Figma.

import { USUARIO_EXEMPLO } from "@/lib/sessaoSimulada";
import { CATEGORIAS, type Categoria } from "@/types/noticia";

const CHAVE = "burburinho:categorias-seguidas";
const EVENTO = "burburinho:categorias-seguidas";

export const SEGUIDAS_PADRAO: readonly Categoria[] = USUARIO_EXEMPLO.categoriasSeguidas;

// useSyncExternalStore exige devolver o mesmo array enquanto nada mudar.
let ultimoTexto: string | null = null;
let ultimaLista: readonly Categoria[] = SEGUIDAS_PADRAO;

function ler(): string | null {
  try {
    return window.localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}

function interpretar(texto: string | null): readonly Categoria[] {
  if (texto === null) return SEGUIDAS_PADRAO;
  try {
    const valor: unknown = JSON.parse(texto);
    if (!Array.isArray(valor)) return SEGUIDAS_PADRAO;
    return CATEGORIAS.filter((c) => valor.includes(c)).sort((a, b) => valor.indexOf(a) - valor.indexOf(b));
  } catch {
    return SEGUIDAS_PADRAO;
  }
}

export function lerCategoriasSeguidas(): readonly Categoria[] {
  const texto = ler();
  if (texto !== ultimoTexto) {
    ultimoTexto = texto;
    ultimaLista = interpretar(texto);
  }
  return ultimaLista;
}

export function definirCategoriasSeguidas(lista: readonly Categoria[]): void {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    // armazenamento bloqueado: a escolha não sobrevive ao recarregar
  }
  window.dispatchEvent(new Event(EVENTO));
}

export function seguirCategoria(categoria: Categoria, seguir: boolean): void {
  const atual = lerCategoriasSeguidas();
  if (atual.includes(categoria) === seguir) return;
  definirCategoriasSeguidas(seguir ? [...atual, categoria] : atual.filter((c) => c !== categoria));
}

export function assinarCategoriasSeguidas(aoMudar: () => void): () => void {
  const aoMudarStorage = (evento: StorageEvent) => {
    if (evento.key === CHAVE || evento.key === null) aoMudar();
  };
  window.addEventListener(EVENTO, aoMudar);
  window.addEventListener("storage", aoMudarStorage);
  return () => {
    window.removeEventListener(EVENTO, aoMudar);
    window.removeEventListener("storage", aoMudarStorage);
  };
}
