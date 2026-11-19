import type { ComponentType } from "react";
import { noFigma } from "@/lib/noFigma";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import { CardComunidade } from "./CardComunidade";

const meta = {
  title: "Conteúdo/CardComunidade",
  component: CardComunidade,
  tags: ["autodocs"],
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: 457 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Politica = { args: { fabrica: FabricaCategoria.para("politica") }, parameters: noFigma("143:443") };
export const Esporte = { args: { fabrica: FabricaCategoria.para("esporte") }, parameters: noFigma("143:473") };
export const Tecnologia = { args: { fabrica: FabricaCategoria.para("tecnologia") }, parameters: noFigma("143:463") };
export const Cultura = { args: { fabrica: FabricaCategoria.para("cultura") }, parameters: noFigma("143:453") };
