import { describe, expect, it } from "vitest";
import { caminhoPublico } from "./caminhos";

describe("caminhoPublico", () => {
  it("mantém caminhos locais começando com barra", () => {
    // Nos testes NEXT_PUBLIC_BASE_PATH está vazio, como no `npm run dev`.
    expect(caminhoPublico("/noticias/x.jpg")).toBe("/noticias/x.jpg");
    expect(caminhoPublico("noticias/x.jpg")).toBe("/noticias/x.jpg");
  });

  it("não altera URLs externas", () => {
    expect(caminhoPublico("https://exemplo.com/a.png")).toBe("https://exemplo.com/a.png");
  });
});
