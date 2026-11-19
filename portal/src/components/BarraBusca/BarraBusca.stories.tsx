import type { ComponentType } from "react";
import { BarraBusca } from "./BarraBusca";

function largura(px: number) {
  return function ComLargura(Story: ComponentType) {
    return <div style={{ width: px }}><Story /></div>;
  };
}

export const Default = {
  args: {
    placeholder: "Buscar conteúdos, notícias e assuntos",
  },
  decorators: [largura(440)],
};

export const ComValorInicial = {
  args: {
    placeholder: "Buscar…",
    valorInicial: "flauta",
  },
  decorators: [largura(440)],
};

export const SemPlaceholder = {
  args: {},
  decorators: [largura(300)],
};