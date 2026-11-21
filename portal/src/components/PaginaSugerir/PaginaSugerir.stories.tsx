import { useEffect, type ComponentType } from "react";
import { noFigma } from "@/lib/noFigma";
import { PaginaSugerir } from "./PaginaSugerir";

// O tema escuro é aplicado no <html> pelo ThemeProvider (vaga 6). Aqui o decorator faz o mesmo
// só enquanto a story está montada, e desfaz ao sair para não vazar para as outras stories.
function temaEscuro(Story: ComponentType) {
  function ComTemaEscuro() {
    useEffect(() => {
      document.documentElement.setAttribute("data-tema", "escuro");
      return () => document.documentElement.removeAttribute("data-tema");
    }, []);

    return <Story />;
  }
  return <ComTemaEscuro />;
}

const meta = {
  title: "Conteúdo/PaginaSugerir",
  component: PaginaSugerir,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Clara = {
  parameters: noFigma("142:1009"),
};

export const Escura = {
  decorators: [temaEscuro],
  parameters: noFigma("280:2147"),
};
