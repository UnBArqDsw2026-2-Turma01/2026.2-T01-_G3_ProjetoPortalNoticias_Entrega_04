import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PaginaNoticia } from "./PaginaNoticia";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn(), push: vi.fn() }),
}));

const noticia = repositorioNoticias.buscarPorId("festival-de-rua-movimenta-o-centro")!;

describe("PaginaNoticia", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("mostra o título, o autor, a categoria e todos os parágrafos", () => {
    render(<PaginaNoticia noticia={noticia} />);

    expect(screen.getByRole("heading", { level: 1, name: noticia.titulo })).toBeInTheDocument();
    expect(screen.getByText(`Por ${noticia.autor}`)).toBeInTheDocument();
    expect(screen.getByText("Cultura")).toBeInTheDocument();
    for (const paragrafo of noticia.conteudo) {
      expect(screen.getByText((_, elemento) => elemento?.tagName === "P" && elemento.textContent === paragrafo)).toBeInTheDocument();
    }
  });

  it("alterna Salvar/Salvo e anuncia o estado", () => {
    render(<PaginaNoticia noticia={noticia} />);

    const salvar = screen.getByRole("button", { name: "Salvar" });
    expect(salvar).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(salvar);

    expect(screen.getByRole("button", { name: "Salvo" })).toHaveAttribute("aria-pressed", "true");
  });

  it("persiste o Salvar com useSalvos para a notícia aparecer em /salvos", () => {
    render(<PaginaNoticia noticia={noticia} />);

    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));
    expect(JSON.parse(window.localStorage.getItem("burburinho:salvos") ?? "[]")).toEqual([noticia.id]);

    cleanup();
    render(<PaginaNoticia noticia={noticia} />);
    expect(screen.getByRole("button", { name: "Salvo" })).toHaveAttribute("aria-pressed", "true");
  });

  it("copia o link quando o navegador não tem navigator.share", async () => {
    const escrever = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText: escrever }, configurable: true });
    Object.defineProperty(navigator, "share", { value: undefined, configurable: true });

    render(<PaginaNoticia noticia={noticia} />);
    fireEvent.click(screen.getByRole("button", { name: "Compartilhar" }));

    await waitFor(() => expect(escrever).toHaveBeenCalledWith(window.location.href));
    expect(await screen.findByText("Link copiado para a área de transferência.")).toBeInTheDocument();
  });
});
