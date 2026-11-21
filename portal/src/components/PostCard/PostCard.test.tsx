import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PostCard } from "./PostCard";

const noticia = repositorioNoticias.buscarPorId("remo-contra-o-fluminense")!;

describe("PostCard", () => {
  afterEach(cleanup);

  it("mostra o título como link para a página da notícia", () => {
    render(<PostCard noticia={noticia} />);

    expect(screen.getByRole("link", { name: noticia.titulo })).toHaveAttribute("href", `/noticia/${noticia.id}`);
    expect(screen.getAllByRole("link")).toHaveLength(1); // o card inteiro usa um único link
  });

  it("compacto: badge da categoria e autor, sem resumo nem botão Ler Mais", () => {
    render(<PostCard noticia={noticia} variante="compacto" />);

    expect(screen.getByText("Esporte")).toBeInTheDocument();
    expect(screen.getByText(noticia.autor)).toBeInTheDocument();
    expect(screen.queryByText(noticia.resumo)).not.toBeInTheDocument();
    expect(screen.queryByText("Ler Mais")).not.toBeInTheDocument();
  });

  it("horizontal: badge e Ler Mais, sem autor (como nas páginas de categoria)", () => {
    render(<PostCard noticia={noticia} variante="horizontal" />);

    expect(screen.getByText("Esporte")).toBeInTheDocument();
    expect(screen.getByText("Ler Mais")).toBeInTheDocument();
    expect(screen.queryByText(noticia.autor)).not.toBeInTheDocument();
  });

  it("destaque: selo Destaque, resumo e Ler Notícia", () => {
    render(<PostCard noticia={noticia} variante="destaque" />);

    expect(screen.getByText("Destaque")).toBeInTheDocument();
    expect(screen.getByText(noticia.resumo)).toBeInTheDocument();
    expect(screen.getByText("Ler Notícia")).toBeInTheDocument();
    expect(screen.queryByText("Esporte")).not.toBeInTheDocument();
  });

  it("mostrarResumo sobrescreve o padrão da variante", () => {
    render(<PostCard noticia={noticia} variante="compacto" mostrarResumo />);
    expect(screen.getByText(noticia.resumo)).toBeInTheDocument();
  });

  it("encaixa os botões de outras vagas no espaço de ações (composição)", () => {
    render(<PostCard noticia={noticia} acoes={<button type="button">Salvar</button>} />);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("sem href, mostra o título sem link (prévia da sugestão)", () => {
    render(<PostCard noticia={noticia} href={null} />);

    expect(screen.getByText(noticia.titulo)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("marca a data de publicação em um <time> legível por máquina", () => {
    const { container } = render(<PostCard noticia={noticia} />);
    expect(container.querySelector("time")).toHaveAttribute("datetime", noticia.publicadaEm);
  });
});
