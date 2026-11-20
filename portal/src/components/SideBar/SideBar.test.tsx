import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { definirLogado } from "@/lib/sessaoSimulada";
import { itemAtivoPelaRota } from "./itensMenu";
import { SideBar } from "./SideBar";

// usePathname só existe dentro do roteador do Next; no teste devolvemos a rota que quisermos.
const rotaAtual = vi.hoisted(() => ({ valor: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => rotaAtual.valor }));

function linkDoMenu(rotulo: string) {
  return screen.getByRole("link", { name: rotulo });
}

describe("SideBar", () => {
  beforeEach(() => {
    rotaAtual.valor = "/";
    window.localStorage.clear();
  });
  afterEach(cleanup);

  it("marca o item ativo pela URL atual", () => {
    rotaAtual.valor = "/salvos/";
    render(<SideBar />);

    expect(linkDoMenu("Salvos")).toHaveAttribute("aria-current", "page");
    expect(linkDoMenu("Início")).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("link", { current: "page" })).toHaveLength(1);
  });

  it("a prop itemAtivo tem prioridade sobre a URL (variantes do Figma)", () => {
    rotaAtual.valor = "/";
    render(<SideBar itemAtivo="sugerir" />);

    expect(linkDoMenu("Sugerir Publicação")).toHaveAttribute("aria-current", "page");
    expect(linkDoMenu("Início")).not.toHaveAttribute("aria-current");
  });

  it("gera um link por item da configuração do menu", () => {
    render(<SideBar />);

    expect(linkDoMenu("Início")).toHaveAttribute("href", "/");
    expect(linkDoMenu("Explorar")).toHaveAttribute("href", "/explorar");
    expect(linkDoMenu("Salvos")).toHaveAttribute("href", "/salvos");
    expect(linkDoMenu("Sugerir Publicação")).toHaveAttribute("href", "/sugerir");
  });

  it("só mostra Meus Conteúdos para quem está logado", () => {
    const { rerender } = render(<SideBar logado={false} />);
    expect(screen.queryByText("Meus Conteúdos")).not.toBeInTheDocument();

    rerender(<SideBar logado categoriasSeguidas={["esporte", "cultura"]} />);
    expect(screen.getByText("Meus Conteúdos")).toBeInTheDocument();
    expect(linkDoMenu("Esporte")).toHaveAttribute("href", "/categoria/esporte");
    expect(linkDoMenu("Cultura")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Política" })).not.toBeInTheDocument();
  });

  it("limita Meus Conteúdos às três categorias visíveis do Figma", () => {
    render(
      <SideBar
        logado
        categoriasSeguidas={["esporte", "cultura", "politica", "tecnologia"]}
      />,
    );

    expect(screen.getByText("Esporte")).toBeInTheDocument();
    expect(screen.getByText("Cultura")).toBeInTheDocument();
    expect(screen.getByText("Política")).toBeInTheDocument();
    expect(screen.queryByText("Tecnologia")).not.toBeInTheDocument();
  });

  it("acompanha o login simulado quando a prop logado não é passada", () => {
    render(<SideBar />);
    expect(screen.queryByText("Meus Conteúdos")).not.toBeInTheDocument();

    act(() => definirLogado(true));
    expect(screen.getByText("Meus Conteúdos")).toBeInTheDocument();
  });
});

describe("itemAtivoPelaRota", () => {
  it.each([
    ["/", "inicio"],
    ["/explorar", "explorar"],
    ["/explorar/", "explorar"],
    ["/salvos", "salvos"],
    ["/sugerir", "sugerir"],
    ["/noticia/1", undefined],
    ["/salvos-antigos", undefined],
  ])("%s → %s", (rota, esperado) => {
    expect(itemAtivoPelaRota(rota)).toBe(esperado);
  });
});
