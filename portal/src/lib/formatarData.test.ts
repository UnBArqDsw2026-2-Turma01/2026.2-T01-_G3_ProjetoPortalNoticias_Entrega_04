import { describe, expect, it } from "vitest";
import { formatarDataCurta, formatarTempoRelativo } from "./formatarData";

const agora = new Date("2026-11-19T12:00:00-03:00");

describe("formatarTempoRelativo", () => {
  it.each([
    ["2026-11-19T11:59:40-03:00", "agora"],
    ["2026-11-19T11:50:00-03:00", "10min"],
    ["2026-11-19T10:00:00-03:00", "2h"],
    ["2026-11-14T12:00:00-03:00", "5d"],
    ["2026-11-01T09:00:00-03:00", "1 de nov"],
  ])("%s → %s", (iso, esperado) => {
    expect(formatarTempoRelativo(iso, agora)).toBe(esperado);
  });
});

describe("formatarDataCurta", () => {
  it("usa o fuso de Brasília, e não o do computador", () => {
    // 01h30 em UTC do dia 20 ainda é dia 19 em Brasília
    expect(formatarDataCurta("2026-11-20T01:30:00Z")).toBe("19 de nov");
  });

  it("escreve o mês abreviado sem ponto", () => {
    expect(formatarDataCurta("2026-10-14T10:00:00-03:00")).toBe("14 de out");
  });
});
