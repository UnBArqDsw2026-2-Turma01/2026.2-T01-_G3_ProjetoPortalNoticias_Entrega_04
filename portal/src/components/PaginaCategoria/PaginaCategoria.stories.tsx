// O mesmo componente gera as 4 telas: cada story só troca a fábrica.
import { noFigma } from "@/lib/noFigma";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import { PaginaCategoria } from "./PaginaCategoria";

const meta = {
  title: "Conteúdo/PaginaCategoria",
  component: PaginaCategoria,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Politica = { args: { fabrica: FabricaCategoria.para("politica") }, parameters: noFigma("280:1284") };
export const Esporte = { args: { fabrica: FabricaCategoria.para("esporte") }, parameters: noFigma("183:639") };
export const Tecnologia = { args: { fabrica: FabricaCategoria.para("tecnologia") }, parameters: noFigma("183:1647") };
export const Cultura = { args: { fabrica: FabricaCategoria.para("cultura") }, parameters: noFigma("230:737") };
