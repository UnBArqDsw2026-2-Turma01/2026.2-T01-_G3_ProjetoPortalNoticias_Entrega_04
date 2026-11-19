// O estado vem do login simulado e do localStorage: os loaders preparam cada cenário antes de renderizar.
import { definirCategoriasSeguidas, SEGUIDAS_PADRAO } from "@/lib/categoriasSeguidas";
import { noFigma } from "@/lib/noFigma";
import { definirLogado } from "@/lib/sessaoSimulada";
import { BotaoSeguir } from "./BotaoSeguir";

const cenario = (logado: boolean) => async () => {
  definirLogado(logado);
  definirCategoriasSeguidas(SEGUIDAS_PADRAO);
  return {};
};

const meta = {
  title: "Interação/BotaoSeguir",
  component: BotaoSeguir,
  tags: ["autodocs"],
};
export default meta;

export const Seguir = {
  args: { categoria: "tecnologia" },
  loaders: [cenario(true)],
  parameters: noFigma("183:1654"),
};

export const Seguindo = {
  args: { categoria: "esporte" },
  loaders: [cenario(true)],
  parameters: noFigma("183:1765"),
};

export const JuntarSe = {
  args: { categoria: "politica", rotuloSeguir: "Juntar-se", convite: "preenchido" },
  loaders: [cenario(false)],
  parameters: noFigma("143:445"),
};
