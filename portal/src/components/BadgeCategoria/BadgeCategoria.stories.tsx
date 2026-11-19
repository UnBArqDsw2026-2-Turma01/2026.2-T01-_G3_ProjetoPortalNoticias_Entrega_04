import { noFigma } from "@/lib/noFigma";
import { BadgeCategoria } from "./BadgeCategoria";

const meta = {
  title: "Conteúdo/BadgeCategoria",
  component: BadgeCategoria,
  tags: ["autodocs"],
};
export default meta;

export const Politica = { args: { categoria: "politica" }, parameters: noFigma("280:1377") };
export const Esporte = { args: { categoria: "esporte" }, parameters: noFigma("253:1152") };
export const Tecnologia = { args: { categoria: "tecnologia" }, parameters: noFigma("273:524") };
export const Cultura = { args: { categoria: "cultura" }, parameters: noFigma("230:1212") };

export const PequenoHome = {
  args: { categoria: "cultura", tamanho: "p" },
  parameters: noFigma("230:1155"),
};
