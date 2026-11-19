import { cleanup, render } from "@testing-library/react";
import type { ComponentType } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as agenda from "./AgendaEventos/AgendaEventos.stories";
import * as badge from "./BadgeCategoria/BadgeCategoria.stories";
import * as botaoAcao from "./BotaoAcao/BotaoAcao.stories";
import * as botaoSeguir from "./BotaoSeguir/BotaoSeguir.stories";
import * as campoFormulario from "./CampoFormulario/CampoFormulario.stories";
import * as cardComunidade from "./CardComunidade/CardComunidade.stories";
import * as paginaCategoria from "./PaginaCategoria/PaginaCategoria.stories";
import * as postCard from "./PostCard/PostCard.stories";

type Decorator = (Story: ComponentType) => React.ReactNode;
interface Story {
  args?: Record<string, unknown>;
  loaders?: (() => Promise<unknown>)[];
  decorators?: Decorator[];
}
interface Meta extends Story {
  title: string;
  component: ComponentType<Record<string, unknown>>;
}

const modulos = { agenda, badge, botaoAcao, botaoSeguir, campoFormulario, cardComunidade, paginaCategoria, postCard };

const casos = Object.values(modulos).flatMap((modulo) => {
  const { default: meta, ...stories } = modulo as unknown as { default: Meta } & Record<string, Story>;
  return Object.entries(stories).map(([nome, story]) => [`${meta.title}/${nome}`, meta, story] as const);
});

describe("stories do portal", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("existe pelo menos uma story por componente", () => {
    expect(casos.length).toBeGreaterThanOrEqual(Object.keys(modulos).length);
  });

  it.each(casos)("%s renderiza", async (_nome, meta, story) => {
    for (const loader of [...(meta.loaders ?? []), ...(story.loaders ?? [])]) await loader();

    const Componente = meta.component;
    const args = { ...meta.args, ...story.args };
    const decorators = [...(story.decorators ?? []), ...(meta.decorators ?? [])];
    const Base: ComponentType = () => <Componente {...args} />;
    const Final = decorators.reduce<ComponentType>((Interna, decorar) => {
      const Envolvida = () => <>{decorar(Interna)}</>;
      return Envolvida;
    }, Base);

    const { container } = render(<Final />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });
});
