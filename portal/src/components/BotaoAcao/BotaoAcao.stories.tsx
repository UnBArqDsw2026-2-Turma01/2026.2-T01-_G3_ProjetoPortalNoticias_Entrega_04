import { noFigma } from "@/lib/noFigma";
import { IconeCompartilhar, IconeEnviar, IconeSalvar, IconeVoltar } from "@/components/IconesAcao";
import { BotaoAcao } from "./BotaoAcao";

const meta = {
  title: "Interação/BotaoAcao",
  component: BotaoAcao,
  tags: ["autodocs"],
};
export default meta;

export const Primario = {
  args: { rotulo: "Enviar", variante: "primario", icone: <IconeEnviar /> },
  parameters: noFigma("142:1009"),
};

export const Secundario = {
  args: { rotulo: "Seguir", variante: "secundario" },
};

export const Texto = {
  args: { rotulo: "Voltar", icone: <IconeVoltar /> },
  parameters: noFigma("15:1725"),
};

export const Compartilhar = {
  args: { rotulo: "Compartilhar", icone: <IconeCompartilhar /> },
  parameters: noFigma("15:1725"),
};

export const Salvar = {
  args: { rotulo: "Salvar", icone: <IconeSalvar />, ativo: false },
  parameters: noFigma("15:1725"),
};

export const Salvo = {
  args: { rotulo: "Salvo", icone: <IconeSalvar preenchido />, ativo: true },
};

export const ComoLink = {
  args: { rotulo: "Voltar", href: "/", icone: <IconeVoltar /> },
};
