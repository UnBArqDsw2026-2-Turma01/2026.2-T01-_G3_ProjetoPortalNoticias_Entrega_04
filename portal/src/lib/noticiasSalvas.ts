// Estado compartilhado entre todos os consumidores de useSalvos.
// O servidor usa um snapshot vazio; a leitura do navegador ocorre na hidratação.
const CHAVE = "burburinho:salvos";
const EVENTO = "burburinho:salvos";
const VAZIO: readonly string[] = [];
let ultimoTexto: string | null = null;
let ids: readonly string[] = VAZIO;
let apenasMemoria = false;

export function salvosNoServidor(): readonly string[] {
  return VAZIO;
}

export function lerNoticiasSalvas(): readonly string[] {
  if (typeof window === "undefined") return VAZIO;
  if (apenasMemoria) return ids;
  try {
    const texto = window.localStorage.getItem(CHAVE);
    if (texto !== ultimoTexto) {
      ultimoTexto = texto;
      try {
        const valor: unknown = JSON.parse(texto ?? "null");
        ids = Array.isArray(valor)
          ? [...new Set(valor.filter((id): id is string => typeof id === "string"))]
          : VAZIO;
      } catch {
        ids = VAZIO;
      }
    }
  } catch {
    // Armazenamento bloqueado: mantém o estado disponível nesta aba.
  }
  return ids;
}

function gravar(novosIds: readonly string[]): void {
  ids = novosIds;
  ultimoTexto = JSON.stringify(novosIds);
  try {
    window.localStorage.setItem(CHAVE, ultimoTexto);
    apenasMemoria = false;
  } catch {
    apenasMemoria = true;
  }
  window.dispatchEvent(new Event(EVENTO));
}

export function alternarNoticiaSalva(id: string): void {
  const atual = lerNoticiasSalvas();
  gravar(atual.includes(id) ? atual.filter((salvo) => salvo !== id) : [...atual, id]);
}

export function removerNoticiaSalva(id: string): void {
  const atual = lerNoticiasSalvas();
  if (atual.includes(id)) gravar(atual.filter((salvo) => salvo !== id));
}

export function assinarNoticiasSalvas(aoMudar: () => void): () => void {
  const aoMudarStorage = (evento: StorageEvent) => {
    if (evento.key !== CHAVE && evento.key !== null) return;
    if (evento.storageArea && evento.storageArea !== window.localStorage) return;
    apenasMemoria = false;
    aoMudar();
  };
  window.addEventListener(EVENTO, aoMudar);
  window.addEventListener("storage", aoMudarStorage);
  return () => {
    window.removeEventListener(EVENTO, aoMudar);
    window.removeEventListener("storage", aoMudarStorage);
  };
}
