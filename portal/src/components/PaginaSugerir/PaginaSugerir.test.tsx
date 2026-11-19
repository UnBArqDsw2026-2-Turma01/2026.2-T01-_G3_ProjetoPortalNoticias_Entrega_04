import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PaginaSugerir } from "./PaginaSugerir";

function preencher(titulo: string) {
  fireEvent.change(screen.getByLabelText(/Escolha um Conteúdo/), { target: { value: "cultura" } });
  fireEvent.change(screen.getByLabelText(/Título da Publicação/), { target: { value: titulo } });
  fireEvent.change(screen.getByLabelText(/Conte o que aconteceu/), {
    target: { value: "O evento reuniu artistas locais.\nA programação segue até domingo." },
  });
  fireEvent.change(screen.getByLabelText(/Seu nome/), { target: { value: "Luís Cunha" } });
}

describe("PaginaSugerir", () => {
  afterEach(cleanup);

  it("monta a notícia com o Builder e envia para moderação", () => {
    const titulo = "Feira cultural movimenta a Praça da Liberdade";
    render(<PaginaSugerir />);

    preencher(titulo);
    fireEvent.click(screen.getByRole("button", { name: "Enviar sugestão" }));

    expect(screen.getByText("Sugestão enviada para moderação")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: titulo })).toBeInTheDocument();

    const enviada = repositorioNoticias.listarSugestoes().find((noticia) => noticia.titulo === titulo);
    expect(enviada).toBeDefined();
    expect(enviada?.origem).toBe("ugc");
    expect(enviada?.categoria).toBe("cultura");
    expect(enviada?.autor).toBe("Luís Cunha");
    expect(enviada?.conteudo).toEqual([
      "O evento reuniu artistas locais.",
      "A programação segue até domingo.",
    ]);
  });

  it("mostra o erro no campo de título quando o formulário está vazio", () => {
    render(<PaginaSugerir />);

    fireEvent.click(screen.getByRole("button", { name: "Enviar sugestão" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Dê um título à sua publicação antes de enviar.");
    expect(screen.getByLabelText(/Título da Publicação/)).toHaveAttribute("aria-invalid", "true");
  });

  it("limpa o erro do campo assim que o leitor começa a corrigir", () => {
    render(<PaginaSugerir />);

    fireEvent.click(screen.getByRole("button", { name: "Enviar sugestão" }));
    fireEvent.change(screen.getByLabelText(/Título da Publicação/), { target: { value: "Uma notícia" } });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("volta ao formulário limpo para enviar outra sugestão", () => {
    render(<PaginaSugerir />);

    preencher("Segunda sugestão da mesma sessão");
    fireEvent.click(screen.getByRole("button", { name: "Enviar sugestão" }));
    fireEvent.click(screen.getByRole("button", { name: "Enviar outra sugestão" }));

    expect(screen.queryByText("Sugestão enviada para moderação")).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Título da Publicação/)).toHaveValue("");
  });
});
