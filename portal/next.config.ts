import type { NextConfig } from "next";

// O portal é publicado como site estático no GitHub Pages, dentro da subpasta /portal.
// No GitHub Actions a variável NEXT_PUBLIC_BASE_PATH recebe
// "/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04/portal"; localmente ela fica vazia.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Gera HTML/CSS/JS estáticos em portal/out (o Pages não roda servidor Node.js).
  output: "export",
  basePath,
  // Rotas viram pastas com index.html (/salvos/ -> /salvos/index.html), o formato que o Pages serve.
  trailingSlash: true,
  // A otimização de imagens do Next exige servidor; no export estático servimos as imagens como estão.
  images: { unoptimized: true },
};

export default nextConfig;
