import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { NotificationBell } from "./NotificationBell";
afterEach(cleanup);

it("usa botão nativo e mantém a lista aberta ao marcar como lida", () => {
  render(<NotificationBell />);
  const botao = screen.getByRole("button", { name: "Notificações" });
  expect(botao.tagName).toBe("BUTTON");
  fireEvent.click(botao);
  const painel = screen.getByRole("region", { name: "Notificações" });
  fireEvent.click(within(painel).getByRole("button", { name: "Marcar todas como lidas" }));
  expect(painel).toBeInTheDocument();
  expect(botao).toHaveAttribute("aria-expanded", "true");
  expect(botao).not.toHaveTextContent("2");
  fireEvent.keyDown(painel, { key: "Escape" });
  expect(screen.queryByRole("region")).not.toBeInTheDocument();
  expect(botao).toHaveFocus();
});

it("cada sino controla sua própria lista, sem IDs repetidos", () => {
  render(<><NotificationBell /><NotificationBell /></>);
  const botoes = screen.getAllByRole("button", { name: "Notificações" });
  botoes.forEach((botao) => fireEvent.click(botao));
  const ids = botoes.map((botao) => botao.getAttribute("aria-controls"));
  expect(new Set(ids).size).toBe(2);
  ids.forEach((id) => expect(document.getElementById(id!)).toHaveAttribute("role", "region"));
});
