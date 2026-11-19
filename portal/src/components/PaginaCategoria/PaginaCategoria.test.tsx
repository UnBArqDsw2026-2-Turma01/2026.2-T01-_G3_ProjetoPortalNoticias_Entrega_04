import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SideBar } from "@/components/SideBar";
import { eventosCulturais } from "@/data/eventos";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import { definirLogado } from "@/lib/sessaoSimulada";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { CATEGORIAS } from "@/types/noticia";
import { PaginaCategoria } from "./PaginaCategoria";

vi.mock("next/navigation", () => ({ usePathname: () => "/categoria/tecnologia" }));

describe("PaginaCategoria", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it.each(CATEGORIAS)("'%s': o mesmo componente monta a tela com os produtos da fábrica", (categoria) => {
    const apresentacao = FabricaCategoria.para(categoria).criarApresentacao();
    render(<PaginaCategoria fabrica={FabricaCategoria.para(categoria)} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(apresentacao.nome);
    expect(screen.getByText(apresentacao.descricao)).toBeInTheDocument();
  });

  it("lista só as notícias da categoria, como cards horizontais", () => {
    render(<PaginaCategoria fabrica={FabricaCategoria.para("esporte")} />);
    const esperadas = repositorioNoticias.listarPorCategoria("esporte");

    const secao = screen.getByRole("region", { name: "Últimas notícias" });
    const links = within(secao).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(esperadas.map((n) => n.titulo));
    expect(within(secao).getAllByText("Ler Mais")).toHaveLength(esperadas.length);
  });

  it("Cultura mostra o bloco Eventos, criado pela própria fábrica", () => {
    render(<PaginaCategoria fabrica={FabricaCategoria.para("cultura")} />);

    const eventos = screen.getByRole("region", { name: "Eventos" });
    for (const evento of eventosCulturais) {
      expect(within(eventos).getByRole("link", { name: new RegExp(evento.titulo) })).toHaveAttribute(
        "href",
        `/noticia/${evento.noticiaId}`,
      );
    }
  });

  it("as outras categorias não têm o bloco Eventos", () => {
    render(<PaginaCategoria fabrica={FabricaCategoria.para("esporte")} />);
    expect(screen.queryByRole("region", { name: "Eventos" })).not.toBeInTheDocument();
  });
});

describe("BotaoSeguir na PaginaCategoria", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("logado: Esporte aparece como Seguindo e Tecnologia como Seguir (igual ao Figma)", () => {
    act(() => definirLogado(true));

    const { unmount } = render(<PaginaCategoria fabrica={FabricaCategoria.para("esporte")} />);
    expect(screen.getByRole("button", { name: "Seguindo" })).toHaveAttribute("aria-pressed", "true");
    unmount();

    render(<PaginaCategoria fabrica={FabricaCategoria.para("tecnologia")} />);
    expect(screen.getByRole("button", { name: "Seguir" })).toHaveAttribute("aria-pressed", "false");
  });

  it("clicar alterna entre Seguir e Seguindo", () => {
    act(() => definirLogado(true));
    render(<PaginaCategoria fabrica={FabricaCategoria.para("tecnologia")} />);

    fireEvent.click(screen.getByRole("button", { name: "Seguir" }));
    expect(screen.getByRole("button", { name: "Seguindo" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Seguindo" }));
    expect(screen.getByRole("button", { name: "Seguir" })).toBeInTheDocument();
  });

  it("deslogado: seguir entra com o usuário de exemplo e já segue a categoria", () => {
    render(<PaginaCategoria fabrica={FabricaCategoria.para("tecnologia")} />);

    fireEvent.click(screen.getByRole("button", { name: "Seguir" }));
    expect(screen.getByRole("button", { name: "Seguindo" })).toBeInTheDocument();
    expect(window.localStorage.getItem("burburinho:logado")).toBe("1");
  });

  it("a escolha fica salva: continua Seguindo depois de recarregar a página", () => {
    act(() => definirLogado(true));
    const { unmount } = render(<PaginaCategoria fabrica={FabricaCategoria.para("tecnologia")} />);
    fireEvent.click(screen.getByRole("button", { name: "Seguir" }));
    unmount();

    render(<PaginaCategoria fabrica={FabricaCategoria.para("tecnologia")} />);
    expect(screen.getByRole("button", { name: "Seguindo" })).toBeInTheDocument();
  });

  it("seguir aparece na hora em Meus Conteúdos da SideBar", () => {
    act(() => definirLogado(true));
    render(
      <>
        <SideBar />
        <PaginaCategoria fabrica={FabricaCategoria.para("tecnologia")} />
      </>,
    );
    const menu = screen.getByRole("complementary");
    expect(within(menu).queryByRole("link", { name: "Tecnologia" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Seguir" }));
    expect(within(menu).getByRole("link", { name: "Tecnologia" })).toHaveAttribute("href", "/categoria/tecnologia");
  });
});
