import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { definirLogado } from "@/lib/sessaoSimulada";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PaginaInicial } from "./PaginaInicial";
import { saudacaoPorHorario } from "./saudacao";

const evento = {
  titulo: "Feira Cultural da Praça",
  data: "Dom, 14 de out",
  publicadoHa: "5d",
  local: "Praça da Sé (SP)",
  imagemUrl: "/noticias/feira-cultural.jpg",
  href: "/noticia/feira-cultural-da-praca",
};
const assuntos = ["A1", "A2", "A3", "A4", "A5", "A6", "A7"];

function renderizarHome() {
  return render(
    <PaginaInicial
      destaque={repositorioNoticias.listarDestaques()[0]}
      ultimas={repositorioNoticias.listarRecentes(3)}
      assuntosEmAlta={assuntos}
      evento={evento}
    />,
  );
}

describe("Home (PaginaInicial)", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("deslogado: mostra Entrar, sem saudação, e 7 assuntos em alta", () => {
    renderizarHome();

    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "A7" })).toBeInTheDocument();
  });

  it("logado: saúda o usuário, mostra o perfil e só 5 assuntos em alta", () => {
    act(() => definirLogado(true));
    renderizarHome();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/, Johnn!$/);
    expect(screen.getByRole("link", { name: "Meu perfil" })).toHaveAttribute("href", "/perfil");
    expect(screen.queryByRole("button", { name: "Entrar" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "A5" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "A6" })).not.toBeInTheDocument();
  });

  it("o botão Entrar alterna para o estado logado, e Sair volta", () => {
    renderizarHome();

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Johnn");

    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("lista as últimas notícias com link para a página de cada uma", () => {
    renderizarHome();
    const [primeira] = repositorioNoticias.listarRecentes(3);

    const secao = screen.getByRole("region", { name: "Últimas notícias" });
    expect(within(secao).getByRole("link", { name: primeira.titulo })).toHaveAttribute("href", `/noticia/${primeira.id}`);
  });
});

describe("saudacaoPorHorario", () => {
  it.each([
    [5, "Bom dia"],
    [11, "Bom dia"],
    [12, "Boa tarde"],
    [17, "Boa tarde"],
    [18, "Boa noite"],
    [2, "Boa noite"],
  ])("%ih → %s", (hora, esperado) => {
    expect(saudacaoPorHorario(hora)).toBe(esperado);
  });
});
