import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { ToggleModoEscuro } from "@/components/ToggleModoEscuro";
import Acessibilidade from "@/app/acessibilidade/page";

const CHAVE = "burburinho:preferencias";
function montar() { return render(<ThemeProvider><ToggleModoEscuro /></ThemeProvider>); }

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  for (const nome of ["tema", "fonte", "contraste", "animacoes", "cursor", "dicas", "inversao", "brilho", "saturacao", "guia", "links"]) delete document.documentElement.dataset[nome];
});

describe("ThemeProvider", () => {
  it("alternar muda data-tema no html e o estado acessível do switch", () => {
    montar();
    const botao = screen.getByRole("switch", { name: "Modo Escuro" });
    expect(document.documentElement).toHaveAttribute("data-tema", "claro");
    fireEvent.click(botao);
    expect(document.documentElement).toHaveAttribute("data-tema", "escuro");
    expect(botao).toHaveAttribute("aria-checked", "true");
    fireEvent.click(botao);
    expect(document.documentElement).toHaveAttribute("data-tema", "claro");
  });

  it("seleciona claro/escuro e persiste cursor maior e dicas", () => {
    const { unmount } = render(<ThemeProvider><Acessibilidade /></ThemeProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Modo Escuro" }));
    fireEvent.click(screen.getByRole("button", { name: "Modo Claro" }));
    expect(document.documentElement).toHaveAttribute("data-tema", "claro");
    fireEvent.click(screen.getByRole("switch", { name: "Cursor maior" }));
    fireEvent.click(screen.getByRole("switch", { name: "Dicas de ferramenta" }));
    const fonte = screen.getByRole("button", { name: "Texto Maior: Normal" });
    fireEvent.focus(fonte);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Alterna entre fonte normal");
    fireEvent.keyDown(fonte, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    unmount();
    montar();
    expect(document.documentElement).toHaveAttribute("data-cursor", "grande");
    expect(document.documentElement).toHaveAttribute("data-dicas", "ativas");
  });

  it("persiste os novos controles e redefine todas as preferências", () => {
    const { unmount } = render(<ThemeProvider><Acessibilidade /></ThemeProvider>);
    for (const nome of ["Brilho", "Saturação", "Guia de leitura", "Destacar links"]) {
      fireEvent.click(screen.getByRole("switch", { name: nome }));
    }
    unmount();
    render(<ThemeProvider><Acessibilidade /></ThemeProvider>);
    for (const atributo of ["inversao", "brilho", "saturacao", "guia", "links"]) {
      expect(document.documentElement).toHaveAttribute(`data-${atributo}`, "ativo");
    }
    fireEvent.click(screen.getByRole("button", { name: "REDEFINIR" }));
    for (const atributo of ["inversao", "brilho", "saturacao", "guia", "links"]) {
      expect(document.documentElement).toHaveAttribute(`data-${atributo}`, "inativo");
    }
    expect(JSON.parse(localStorage.getItem(CHAVE)!)).toMatchObject({ tema: "claro", fonte: "normal", cursorMaior: false, dicasFerramenta: false, altoContraste: false, reduzirAnimacoes: false });
  });

  it("usa o tema do sistema quando não existe preferência salva", () => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    montar();
    expect(document.documentElement).toHaveAttribute("data-tema", "escuro");
  });

  it("persiste a escolha e recupera ao remontar, com prioridade sobre o sistema", () => {
    const { unmount } = montar();
    fireEvent.click(screen.getByRole("switch", { name: "Modo Escuro" }));
    expect(JSON.parse(localStorage.getItem(CHAVE)!)).toMatchObject({ tema: "escuro" });
    unmount();
    montar();
    expect(document.documentElement).toHaveAttribute("data-tema", "escuro");
  });

  it("aplica e recupera todas as preferências de acessibilidade", () => {
    const { unmount } = render(<ThemeProvider><Acessibilidade /></ThemeProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Texto Maior: Normal" }));
    expect(document.documentElement).toHaveAttribute("data-fonte", "grande");
    fireEvent.click(screen.getByRole("button", { name: "Texto Maior: Grande" }));
    fireEvent.click(screen.getByRole("switch", { name: "Contraste" }));
    fireEvent.click(screen.getByRole("switch", { name: "Reduzir animações" }));
    unmount();
    montar();
    expect(document.documentElement).toHaveAttribute("data-fonte", "muito-grande");
    expect(document.documentElement).toHaveAttribute("data-contraste", "alto");
    expect(document.documentElement).toHaveAttribute("data-animacoes", "reduzidas");
  });

  it.each(["{inválido", '{"tema":"inexistente","fonte":"gigante","altoContraste":"sim"}'])
  ("ignora dados inválidos: %s", (valor) => {
    localStorage.setItem(CHAVE, valor);
    montar();
    expect(document.documentElement).toHaveAttribute("data-tema", "claro");
    expect(document.documentElement).toHaveAttribute("data-fonte", "normal");
    expect(document.documentElement).toHaveAttribute("data-contraste", "normal");
  });

  it("funciona mesmo quando o armazenamento está bloqueado", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Bloqueado"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Bloqueado"); });
    montar();
    fireEvent.click(screen.getByRole("switch", { name: "Modo Escuro" }));
    expect(document.documentElement).toHaveAttribute("data-tema", "escuro");
  });
});
