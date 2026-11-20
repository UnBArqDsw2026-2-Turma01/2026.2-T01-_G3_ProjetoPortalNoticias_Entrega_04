import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IconeSalvar } from "@/components/IconesAcao";
import { BotaoAcao } from "./BotaoAcao";

describe("BotaoAcao", () => {
  afterEach(cleanup);

  it("chama onClick ao ser clicado", () => {
    const aoClicar = vi.fn();
    render(<BotaoAcao rotulo="Compartilhar" onClick={aoClicar} />);

    fireEvent.click(screen.getByRole("button", { name: "Compartilhar" }));

    expect(aoClicar).toHaveBeenCalledTimes(1);
  });

  it("vira link quando recebe href", () => {
    render(<BotaoAcao rotulo="Voltar" href="/" />);

    expect(screen.getByRole("link", { name: "Voltar" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("button", { name: "Voltar" })).not.toBeInTheDocument();
  });

  it("anuncia o estado ativo, como no Salvar/Salvo", () => {
    render(<BotaoAcao rotulo="Salvo" ativo icone={<IconeSalvar preenchido />} />);

    expect(screen.getByRole("button", { name: "Salvo" })).toHaveAttribute("aria-pressed", "true");
  });
});
