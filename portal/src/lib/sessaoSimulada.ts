// Login SIMULADO: o portal não tem back-end, então "estar logado" é só uma flag guardada no
// localStorage do navegador. Login e Cadastro reais estão fora do escopo da Entrega 04.
// Lógica sem interface (sem React): o hook useSessaoSimulada é quem conecta isto aos componentes.

import type { Categoria } from "@/types/noticia";

export interface PerfilSimulado {
  nome: string;
  /** Foto escolhida na página de perfil, guardada como data URL. */
  foto: string | null;
}

export interface UsuarioExemplo extends PerfilSimulado {
  categoriasSeguidas: readonly Categoria[]; // "Meus Conteúdos" da SideBar, na ordem do Figma
}

export const USUARIO_EXEMPLO: UsuarioExemplo = {
  nome: "Usuário anônimo",
  foto: null,
  categoriasSeguidas: ["esporte", "cultura", "politica"],
};

export const PERFIL_PADRAO: PerfilSimulado = {
  nome: USUARIO_EXEMPLO.nome,
  foto: null,
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

// ---------------------------------------------------------------------------
// Perfil (nome e foto) — separado da flag de login para continuar valendo
// quando o usuário sai e entra de novo. Como não há back-end, a foto fica
// guardada como data URL; se o localStorage estourar, mantemos em memória.
// ---------------------------------------------------------------------------

const CHAVE_PERFIL = "burburinho:perfil";
const EVENTO_PERFIL = "burburinho:perfil";

let ultimoTextoPerfil: string | null = null;
let perfilAtual: PerfilSimulado = PERFIL_PADRAO;
let perfilApenasMemoria = false;

function interpretarPerfil(texto: string | null): PerfilSimulado {
  if (texto === null) return PERFIL_PADRAO;
  try {
    const valor: unknown = JSON.parse(texto);
    if (typeof valor !== "object" || valor === null) return PERFIL_PADRAO;

    const { nome, foto } = valor as { nome?: unknown; foto?: unknown };
    const nomeValido = typeof nome === "string" && nome.trim() ? nome.trim() : PERFIL_PADRAO.nome;
    const fotoValida = typeof foto === "string" && foto.startsWith("data:image/") ? foto : null;

    return { nome: nomeValido, foto: fotoValida };
  } catch {
    return PERFIL_PADRAO;
  }
}

// useSyncExternalStore exige o mesmo objeto enquanto nada mudar.
export function lerPerfil(): PerfilSimulado {
  if (typeof window === "undefined") return PERFIL_PADRAO;
  if (perfilApenasMemoria) return perfilAtual;

  try {
    const texto = window.localStorage.getItem(CHAVE_PERFIL);
    if (texto !== ultimoTextoPerfil) {
      ultimoTextoPerfil = texto;
      perfilAtual = interpretarPerfil(texto);
    }
  } catch {
    // Armazenamento bloqueado: mantém o perfil disponível nesta aba.
  }

  return perfilAtual;
}

export function perfilNoServidor(): PerfilSimulado {
  return PERFIL_PADRAO;
}

export function salvarPerfil(perfil: PerfilSimulado): void {
  perfilAtual = {
    nome: perfil.nome.trim() || PERFIL_PADRAO.nome,
    foto: perfil.foto || null,
  };
  ultimoTextoPerfil = JSON.stringify(perfilAtual);

  try {
    window.localStorage.setItem(CHAVE_PERFIL, ultimoTextoPerfil);
    perfilApenasMemoria = false;
  } catch {
    // Cota estourada ou armazenamento bloqueado: a edição vale até recarregar.
    perfilApenasMemoria = true;
  }

  window.dispatchEvent(new Event(EVENTO_PERFIL));
}

export function assinarPerfil(aoMudar: () => void): () => void {
  const aoMudarStorage = (evento: StorageEvent) => {
    if (evento.key !== CHAVE_PERFIL && evento.key !== null) return;
    if (evento.storageArea && evento.storageArea !== window.localStorage) return;
    perfilApenasMemoria = false;
    aoMudar();
  };
  window.addEventListener(EVENTO_PERFIL, aoMudar);
  window.addEventListener("storage", aoMudarStorage);
  return () => {
    window.removeEventListener(EVENTO_PERFIL, aoMudar);
    window.removeEventListener("storage", aoMudarStorage);
  };
}
