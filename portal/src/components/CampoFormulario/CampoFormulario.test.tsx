import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CampoFormulario } from "./CampoFormulario";

describe("CampoFormulario", () => {
  afterEach(cleanup);

  it("mostra erro e liga a mensagem ao campo", () => {
    render(
      <CampoFormulario
        rotulo="Título da Publicação"
        nome="titulo"
        tipo="texto"
        valor=""
        aoMudar={() => {}}
        erro="Dê um título à sua publicação."
        obrigatorio
      />,
    );

    const campo = screen.getByLabelText(/Título da Publicação/);
    const erro = screen.getByRole("alert");

    expect(erro).toHaveTextContent("Dê um título à sua publicação.");
    expect(campo).toHaveAttribute("aria-invalid", "true");
    expect(campo).toHaveAttribute("aria-describedby", erro.id);
    expect(campo).toBeRequired();
  });

  it("avisa o valor digitado", () => {
    const aoMudar = vi.fn();
    render(
      <CampoFormulario rotulo="Seu nome" nome="autor" tipo="texto" valor="" aoMudar={aoMudar} />,
    );

    fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Luís Cunha" } });

    expect(aoMudar).toHaveBeenCalledWith("Luís Cunha");
  });

  it("mostra as opções no campo de seleção", () => {
    render(
      <CampoFormulario
        rotulo="Escolha um Conteúdo"
        nome="categoria"
        tipo="selecao"
        valor=""
        aoMudar={() => {}}
        placeholder="Selecione o tipo do seu conteúdo"
        opcoes={[
          { valor: "cultura", rotulo: "Cultura" },
          { valor: "esporte", rotulo: "Esporte" },
        ]}
      />,
    );

    const selecao = screen.getByLabelText("Escolha um Conteúdo");
    expect(selecao).toHaveValue("");
    expect(screen.getByRole("option", { name: "Selecione o tipo do seu conteúdo" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cultura" })).toBeInTheDocument();
  });
});
