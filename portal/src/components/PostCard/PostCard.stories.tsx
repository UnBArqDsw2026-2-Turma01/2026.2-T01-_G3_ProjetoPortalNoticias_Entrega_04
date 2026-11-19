import type { ComponentType } from "react";
import { noFigma } from "@/lib/noFigma";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PostCard } from "./PostCard";

const noticia = (id: string) => repositorioNoticias.buscarPorId(id)!;
function largura(px: number) {
  return function ComLargura(Story: ComponentType) {
    return (
      <div style={{ width: px }}>
        <Story />
      </div>
    );
  };
}

const meta = {
  title: "Conteúdo/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  args: { noticia: noticia("festival-de-rua-movimenta-o-centro") },
};
export default meta;

export const Destaque = {
  args: { variante: "destaque" },
  decorators: [largura(598)],
  parameters: noFigma("6:254"),
};

export const DestaqueSemResumo = {
  args: { variante: "destaque", mostrarResumo: false },
  decorators: [largura(598)],
};

export const Compacto = {
  args: { noticia: noticia("dede-espetos-nao-sai-da-boca-do-povo"), variante: "compacto" },
  decorators: [largura(180)],
  parameters: noFigma("230:1153"),
};

export const Horizontal = {
  args: { noticia: noticia("remo-contra-o-fluminense"), variante: "horizontal" },
  decorators: [largura(410)],
  parameters: noFigma("183:654"),
};

export const ComAcaoSalvar = {
  args: { variante: "compacto", acoes: <button type="button">Salvar</button> },
  decorators: [largura(180)],
};

export const Politica = {
  args: { noticia: noticia("debate-rumos-do-pais"), variante: "horizontal" },
  decorators: [largura(410)],
  parameters: noFigma("280:1367"),
};

export const Esporte = {
  args: { noticia: noticia("tenis-nas-olimpiadas"), variante: "horizontal" },
  decorators: [largura(410)],
  parameters: noFigma("183:669"),
};

export const Tecnologia = {
  args: { noticia: noticia("gatinhos-injetam-bugs-nos-servidores"), variante: "horizontal" },
  decorators: [largura(410)],
  parameters: noFigma("183:1662"),
};

export const Cultura = {
  args: { noticia: noticia("aula-de-flauta-terca-feira"), variante: "horizontal" },
  decorators: [largura(410)],
  parameters: noFigma("230:1032"),
};
