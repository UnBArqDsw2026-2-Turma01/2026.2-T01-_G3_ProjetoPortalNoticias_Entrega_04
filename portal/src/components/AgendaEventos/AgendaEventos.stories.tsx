import { eventosCulturais } from "@/data/eventos";
import { noFigma } from "@/lib/noFigma";
import { AgendaEventos } from "./AgendaEventos";

const meta = {
  title: "Conteúdo/AgendaEventos",
  component: AgendaEventos,
  tags: ["autodocs"],
};
export default meta;

export const EventosDeCultura = { args: { eventos: eventosCulturais }, parameters: noFigma("250:1678") };
export const UmEvento = { args: { eventos: eventosCulturais.slice(0, 1) }, parameters: noFigma("230:997") };
