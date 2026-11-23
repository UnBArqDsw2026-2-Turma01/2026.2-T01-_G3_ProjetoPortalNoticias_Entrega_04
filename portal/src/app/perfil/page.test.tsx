import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Perfil from "./page";

const CHAVE_PERFIL = "burburinho:perfil";

function abrirEdicao() {
  fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/ }));
  return screen.getByRole("dialog", { name: "Editar Perfil" });
}

describe("Página de Perfil", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("abre a edição, salva o nome e atualiza a página", () => {
    render(<Perfil />);
    expect(screen.getByRole("heading", { name: "Usuário anônimo" })).toBeInTheDocument();

    const dialogo = abrirEdicao();
    fireEvent.change(within(dialogo).getByLabelText(/Nome de usuário/), {
      target: { value: "Luis Felipe" },
    });
    fireEvent.click(within(dialogo).getByRole("button", { name: "Salvar" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Luis Felipe" })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(CHAVE_PERFIL)!)).toEqual({
      nome: "Luis Felipe",
      foto: null,
    });
  });

  it("não salva nome vazio e explica o erro", () => {
    render(<Perfil />);
    const dialogo = abrirEdicao();

    fireEvent.change(within(dialogo).getByLabelText(/Nome de usuário/), {
      target: { value: "   " },
    });
    fireEvent.click(within(dialogo).getByRole("button", { name: "Salvar" }));

    expect(screen.getByRole("dialog", { name: "Editar Perfil" })).toBeInTheDocument();
    expect(within(dialogo).getByRole("alert")).toHaveTextContent("Informe um nome de usuário.");
    expect(screen.getByRole("heading", { name: "Usuário anônimo" })).toBeInTheDocument();
  });

  it("cancelar descarta o rascunho", () => {
    render(<Perfil />);
    const dialogo = abrirEdicao();

    fireEvent.change(within(dialogo).getByLabelText(/Nome de usuário/), {
      target: { value: "Outro nome" },
    });
    fireEvent.click(within(dialogo).getByRole("button", { name: "Cancelar" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Usuário anônimo" })).toBeInTheDocument();
    expect(window.localStorage.getItem(CHAVE_PERFIL)).toBeNull();
  });

  it("mostra a foto salva e permite removê-la", () => {
    window.localStorage.setItem(
      CHAVE_PERFIL,
      JSON.stringify({ nome: "Luis", foto: "data:image/webp;base64,abc" }),
    );
    render(<Perfil />);

    expect(screen.getByRole("img", { name: "Foto de perfil de Luis" })).toBeInTheDocument();

    const dialogo = abrirEdicao();
    fireEvent.click(within(dialogo).getByRole("button", { name: "Remover foto" }));
    fireEvent.click(within(dialogo).getByRole("button", { name: "Salvar" }));

    expect(screen.queryByRole("img", { name: "Foto de perfil de Luis" })).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(CHAVE_PERFIL)!)).toEqual({
      nome: "Luis",
      foto: null,
    });
  });
});
