// Login SIMULADO: o portal não tem back-end, então "estar logado" é só uma flag guardada no
// localStorage do navegador. Login e Cadastro reais estão fora do escopo da Entrega 04.
// Lógica sem interface (sem React): o hook useSessaoSimulada é quem conecta isto aos componentes.

import type { Categoria } from "@/types/noticia";

export interface UsuarioExemplo {
  nome: string;
  categoriasSeguidas: readonly Categoria[]; // "Meus Conteúdos" da SideBar, na ordem do Figma
}

export const USUARIO_EXEMPLO: UsuarioExemplo = {
  nome: "Usuário anônimo",
  categoriasSeguidas: ["esporte", "cultura", "politica"],
};

const CHAVE = "burburinho:logado";
const EVENTO = "burburinho:sessao";

export function estaLogado(): boolean {
  try {
    return window.localStorage.getItem(CHAVE) === "1";
  } catch {
    return false; // navegação privada ou armazenamento bloqueado: trata como deslogado
  }
}

export function definirLogado(logado: boolean): void {
  try {
    if (logado) window.localStorage.setItem(CHAVE, "1");
    else window.localStorage.removeItem(CHAVE);
  } catch {
    // sem armazenamento: o aviso abaixo ainda atualiza a tela atual
  }
  window.dispatchEvent(new Event(EVENTO));
}

// Avisa quem estiver ouvindo quando a sessão muda (nesta aba ou em outra).
export function assinarSessao(aoMudar: () => void): () => void {
  const aoMudarStorage = (evento: StorageEvent) => {
    if (evento.key === CHAVE) aoMudar();
  };
  window.addEventListener(EVENTO, aoMudar);
  window.addEventListener("storage", aoMudarStorage);
  return () => {
    window.removeEventListener(EVENTO, aoMudar);
    window.removeEventListener("storage", aoMudarStorage);
  };
}
