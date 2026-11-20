# Portal Burburinho (Next.js)

Implementação do protótipo do [Figma](https://www.figma.com/design/LnkN55jPy6jk8dsjpmYJSF/Prot%C3%B3tipo?node-id=0-1) com **componentes React reutilizáveis**, para a Entrega 04 (Reutilização).

- **Publicado em:** https://unbarqdsw2026-2-turma01.github.io/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04/portal/
- **Stack:** Next.js 16 (App Router, export estático) · React 19 · TypeScript · CSS Modules · Vitest + Testing Library
- **Como contribuir (branch, commit, PR):** [CONTRIBUTING.md](../CONTRIBUTING.md)

## Rodando

```shell
cd portal
npm install
npm run dev      # http://localhost:3000
npm test         # testes (Vitest)
npm run lint     # padrões de código
npm run build    # gera o site estático em portal/out
npm run storybook       # http://localhost:6006
npm run build-storybook # gera o catálogo estático
```

Para o Storybook, use **Node.js 20.19+ ou 22.12+** (o CI usa o 24).

## Como escrever uma story

Crie `Nome/Nome.stories.tsx` ao lado do componente. O catálogo usa as pastas
`Layout/`, `Conteúdo/`, `Formulário/`, `Interação/` e `Tema/`; escolha uma no
`title`. Cada exportação nomeada é um exemplo. O Autodocs é habilitado
globalmente e gera a página **Docs** e a tabela de props. Exemplo:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BadgeCategoria } from "./BadgeCategoria";

const meta = {
  title: "Conteúdo/BadgeCategoria",
  component: BadgeCategoria,
  tags: ["autodocs"],
} satisfies Meta<typeof BadgeCategoria>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Cultura: Story = { args: { categoria: "cultura" } };
export const Esporte: Story = { args: { categoria: "esporte" } };
```

Rode `npm run storybook`, confira **Docs**, os controles e as variantes no
navegador e execute `npm run build-storybook`. O seletor **Tema** na barra
fornece o `ThemeProvider`; não envolva a story em outro provider de tema.
Para imagens de `public/`, use `caminhoPublico` como no portal. No Pages, o
workflow configura o caminho específico `/storybook` para os assets.
As categorias sem stories ainda não aparecem no menu.

O Storybook atual recomenda [`@storybook/nextjs-vite`](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite),
em vez do pacote Webpack `@storybook/nextjs` dos exemplos antigos. O catálogo
será publicado [aqui](https://unbarqdsw2026-2-turma01.github.io/2026.2-T01-_G3_ProjetoPortalNoticias_Entrega_04/storybook/)
após o merge e a execução bem-sucedida do workflow de Pages.

## Estrutura de pastas

```
src/
  app/          rotas: cada pasta é uma URL (page.tsx, layout.tsx)
  components/   um componente por pasta: Nome/Nome.tsx, Nome.module.css, Nome.stories.tsx, Nome.test.tsx, index.ts
  hooks/        hooks customizados (useTema, useSalvos, useNotificacoes)
  contexts/     Context Providers (ThemeProvider)
  lib/          lógica sem interface (repositorioNoticias, caminhos)
  padroes/      GoFs reaproveitados da Entrega 03
  data/         dados de exemplo (noticias.ts)
  types/        tipos compartilhados (noticia.ts)
```

## Regras que valem para todo mundo

1. **Dados só pelo repositório.** Use `repositorioNoticias` (`@/lib/repositorioNoticias`), nunca o array de `src/data` direto:
   ```ts
   import { repositorioNoticias } from "@/lib/repositorioNoticias";
   const cultura = repositorioNoticias.listarPorCategoria("cultura");
   ```
   Métodos: `listarTodas()`, `listarRecentes(n)`, `buscarPorId(id)`, `listarPorCategoria(c)`, `listarDestaques()`, `buscar(termo)`, `adicionarSugestao(noticia)`, `listarSugestoes()`.
2. **Tipos compartilhados** em `@/types/noticia`: `Noticia`, `Categoria`, `CATEGORIAS`, `NOMES_CATEGORIAS`.
3. **Cores só com variáveis** (`var(--cor-primaria)`, `var(--cor-cultura)`...), definidas em `src/app/globals.css` a partir do Figma. Nunca `#fff` ou `black` dentro de componente, senão o modo escuro quebra.
4. **Imagens e arquivos de `public/`:** no Pages o portal fica numa subpasta. Só o `<Link>` acrescenta essa subpasta sozinho. O `next/image` **não** acrescenta ([documentação do `basePath`](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath#images)), e o mesmo vale para `<img src>`, CSS `url()` e `fetch`. Em todos esses casos use `caminhoPublico()` de `@/lib/caminhos`, senão a imagem funciona no `npm run dev` e quebra no site publicado:
   ```tsx
   <Image src={caminhoPublico(noticia.imagemUrl)} alt="" width={84} height={77} />
   ```
5. **Rotas dinâmicas** (ex.: `/noticia/[id]`, `/categoria/[categoria]`): o export estático exige **as duas** coisas abaixo, senão o build falha:
   ```tsx
   export const dynamicParams = false; // só existem as páginas geradas abaixo
   export function generateStaticParams() {
     return repositorioNoticias.listarTodas().map((n) => ({ id: n.id }));
   }
   // No Next 16, params é uma Promise:
   export default async function Pagina({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
   }
   ```
6. **Componentes com estado, efeitos ou eventos** (useState, useEffect, onClick, localStorage) precisam de `"use client";` na primeira linha. `localStorage`/`window` só dentro de `useEffect`.
7. **Não funciona no export estático:** Server Actions, rotas de API, cookies, redirects/rewrites e a otimização padrão de imagens. Tudo roda no navegador com dados de exemplo.

## Documentação oficial da versão instalada

Esta versão do Next.js é recente e tem mudanças em relação a tutoriais antigos (e ao que muitas IAs sugerem). Na dúvida, consulte `node_modules/next/dist/docs/` (ex.: `01-app/02-guides/static-exports.md`) ou https://nextjs.org/docs.
