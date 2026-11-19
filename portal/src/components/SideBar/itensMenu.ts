// Configuração do menu da SideBar. Os itens são DADOS, não 4 blocos de JSX repetidos:
// adicionar uma opção ao menu é acrescentar uma linha aqui, sem mexer no componente.
// A ordem segue o componente "Menu de Opções SideBar" do Figma (node 46:573).

import type { Categoria } from "@/types/noticia";

export type IdItemMenu = "inicio" | "explorar" | "salvos" | "sugerir";

export interface ItemMenu {
  id: IdItemMenu;
  rotulo: string;
  href: string;
  icone: { src: string; largura: number; altura: number }; // SVG exportado do Figma
}

export const ITENS_MENU: readonly ItemMenu[] = [
  { id: "inicio", rotulo: "Início", href: "/", icone: { src: "/icones/sidebar/inicio.svg", largura: 18, altura: 16 } },
  { id: "explorar", rotulo: "Explorar", href: "/explorar", icone: { src: "/icones/sidebar/explorar.svg", largura: 18, altura: 18 } },
  { id: "salvos", rotulo: "Salvos", href: "/salvos", icone: { src: "/icones/sidebar/salvos.svg", largura: 15, altura: 21 } },
  { id: "sugerir", rotulo: "Sugerir Publicação", href: "/sugerir", icone: { src: "/icones/sidebar/sugerir.svg", largura: 20, altura: 20 } },
];

// Ícone de cada categoria nos círculos de "Meus Conteúdos" (SVGs do Figma, node 115:68).
// A cor do círculo vem de var(--cor-<categoria>), a mesma usada nos badges.
export const ICONES_CATEGORIA: Record<Categoria, ItemMenu["icone"]> = {
  esporte: { src: "/icones/sidebar/icone-esporte.svg", largura: 15, altura: 15 },
  cultura: { src: "/icones/sidebar/icone-cultura.svg", largura: 13, altura: 13 },
  politica: { src: "/icones/sidebar/icone-politica.svg", largura: 15, altura: 15 },
  tecnologia: { src: "/icones/sidebar/icone-tecnologia.svg", largura: 15, altura: 11 }, // da tela Explorar
};

// Descobre qual item está ativo a partir da URL atual (usePathname).
// "/explorar" e "/explorar/qualquer-coisa" ativam Explorar; "/" só ativa Início na raiz.
export function itemAtivoPelaRota(pathname: string | null): IdItemMenu | undefined {
  const rota = pathname && pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  return ITENS_MENU.find((item) =>
    item.href === "/" ? rota === "/" : rota === item.href || rota.startsWith(`${item.href}/`),
  )?.id;
}
