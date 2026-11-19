// No GitHub Pages o portal fica em uma subpasta (/.../portal). O Next aplica o basePath
// sozinho só em <Link>. Ele NÃO aplica em next/image (exigência documentada do Next), em
// <img src="/...">, em CSS url() nem em fetch(). Use esta função nesses casos:
// caminhoPublico("/noticias/x.jpg").

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function caminhoPublico(caminho: string): string {
  if (/^(https?:)?\/\//.test(caminho)) return caminho; // URL externa: não mexe
  const comBarra = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return `${BASE_PATH}${comBarra}`;
}
