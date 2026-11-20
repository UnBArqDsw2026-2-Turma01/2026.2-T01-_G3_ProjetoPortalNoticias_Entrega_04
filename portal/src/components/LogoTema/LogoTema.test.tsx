import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LogoTema, temaPorData } from "./LogoTema";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("LogoTema", () => {
  it.each([
    [new Date(2026, 11, 25), "natal"],
    [new Date(2026, 9, 31), "halloween"],
    [new Date(2026, 7, 11), "estudante"],
    [new Date(2026, 11, 26), "padrao"],
  ] as const)("seleciona o tema da data %s", (data, esperado) => {
    expect(temaPorData(data)).toBe(esperado);
  });

  it("usa a data local, atualiza à meia-noite e permite forçar o padrão", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 24, 23, 59, 59));
    const { rerender } = render(<LogoTema />);
    expect(screen.getByAltText("Burburinho")).toHaveAttribute("src", "/logos/burburinho.svg");
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByAltText("Burburinho")).toHaveAttribute("src", "/logos/BurburinhoNatal.svg");
    rerender(<LogoTema tema="padrao" />);
    expect(screen.getByAltText("Burburinho")).toHaveAttribute("src", "/logos/burburinho.svg");
  });
});
