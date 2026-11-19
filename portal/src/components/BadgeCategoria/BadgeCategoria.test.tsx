import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CATEGORIAS, NOMES_CATEGORIAS } from "@/types/noticia";
import { BadgeCategoria } from "./BadgeCategoria";

describe("BadgeCategoria", () => {
  afterEach(cleanup);

  it.each(CATEGORIAS)("'%s': nome da categoria na cor da categoria", (categoria) => {
    render(<BadgeCategoria categoria={categoria} />);

    const badge = screen.getByText(NOMES_CATEGORIAS[categoria]);
    expect(badge.style.getPropertyValue("--cor-categoria")).toBe(`var(--cor-${categoria})`);
  });
});
