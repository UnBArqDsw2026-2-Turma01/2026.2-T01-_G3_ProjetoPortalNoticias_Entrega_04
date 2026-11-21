import { noFigma } from "@/lib/noFigma";
import { CampoFormulario } from "./CampoFormulario";

const opcoes = [
  { valor: "cultura", rotulo: "Cultura" },
  { valor: "esporte", rotulo: "Esporte" },
  { valor: "politica", rotulo: "Política" },
  { valor: "tecnologia", rotulo: "Tecnologia" },
];

const meta = {
  title: "Formulário/CampoFormulario",
  component: CampoFormulario,
  tags: ["autodocs"],
  args: { aoMudar: () => {} },
};
export default meta;

export const Texto = {
  args: {
    rotulo: "Título da Publicação",
    nome: "titulo",
    tipo: "texto",
    valor: "",
    placeholder: "Ex.: Feira cultural movimenta a Praça da Liberdade",
    obrigatorio: true,
  },
  parameters: noFigma("142:1009"),
};

export const Area = {
  args: {
    rotulo: "Conte o que aconteceu",
    nome: "texto",
    tipo: "area",
    valor: "",
    placeholder: "Escreva os parágrafos da sua notícia...",
    obrigatorio: true,
  },
  parameters: noFigma("142:1009"),
};

export const Selecao = {
  args: {
    rotulo: "Escolha um Conteúdo",
    nome: "categoria",
    tipo: "selecao",
    valor: "",
    opcoes,
    placeholder: "Selecione o tipo do seu conteúdo",
    obrigatorio: true,
  },
  parameters: noFigma("142:1009"),
};

export const ComErro = {
  args: {
    rotulo: "Título da Publicação",
    nome: "titulo",
    tipo: "texto",
    valor: "",
    erro: "Dê um título à sua publicação.",
    obrigatorio: true,
  },
};
