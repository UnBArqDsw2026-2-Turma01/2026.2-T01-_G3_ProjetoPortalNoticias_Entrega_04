import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Responsividade no celular (vaga 8). O CSS não roda no jsdom, então os testes conferem o CONTRATO:
// os tokens existem em globals.css, ficam neutros no desktop, ganham valor abaixo de 600px
// e os componentes que precisam de alvo de toque ou fonte mínima continuam usando os tokens.

const ler = (caminho: string) => readFileSync(join(process.cwd(), "src", caminho), "utf-8");
const globais = ler("app/globals.css");

describe("tokens de responsividade (globals.css)", () => {
  it("são neutros no desktop, para não alterar o layout do Figma", () => {
    expect(globais).toMatch(/--alvo-toque-minimo:\s*0px;/);
    expect(globais).toMatch(/--fonte-minima:\s*0rem;/);
    expect(globais).toMatch(/--fonte-minima-campo:\s*0rem;/);
  });

  it("ganham valor abaixo de 600px: toque de 44px, fonte de 12px e campos de 16px", () => {
    const celular = globais.match(/@media \(max-width: 600px\) \{\s*:root \{([^}]*)\}/);
    expect(celular).not.toBeNull();
    expect(celular![1]).toMatch(/--alvo-toque-minimo:\s*44px;/);
    expect(celular![1]).toMatch(/--fonte-minima:\s*0\.75rem;/);
    expect(celular![1]).toMatch(/--fonte-minima-campo:\s*1rem;/);
  });
});

describe("componentes que reutilizam os tokens", () => {
  it.each([
    "components/SideBar/SideBar.module.css",
    "components/PostCard/PostCard.module.css",
    "components/CampoFormulario/CampoFormulario.module.css",
    "components/BotaoSeguir/BotaoSeguir.module.css",
    "components/NotificationBell/NotificationBell.module.css",
    "components/CardEmAlta/CardEmAlta.module.css",
    "components/PaginaSugerir/PaginaSugerir.module.css",
    "app/_home/PaginaInicial.module.css",
    "app/perfil/page.module.css",
    "app/salvos/page.module.css",
    "components/BotaoAcao/BotaoAcao.module.css",
    "components/CardEvento/CardEvento.module.css",
    "components/BarraBusca/BarraBusca.module.css",
  ])("%s garante o alvo de toque mínimo", (arquivo) => {
    expect(ler(arquivo)).toContain("var(--alvo-toque-minimo)");
  });

  it.each([
    "components/BadgeCategoria/BadgeCategoria.module.css",
    "components/CardEvento/CardEvento.module.css",
    "components/CardComunidade/CardComunidade.module.css",
    "components/AgendaEventos/AgendaEventos.module.css",
    "components/PostCard/PostCard.module.css",
    "components/PaginaSugerir/PaginaSugerir.module.css",
    "app/perfil/page.module.css",
    "app/acessibilidade/page.module.css",
  ])("%s garante a fonte mínima legível", (arquivo) => {
    expect(ler(arquivo)).toContain("var(--fonte-minima)");
  });

  it.each([
    "components/CampoFormulario/CampoFormulario.module.css",
    "components/BarraBusca/BarraBusca.module.css",
  ])("%s usa 16px nos campos (evita o zoom automático do iPhone)", (arquivo) => {
    expect(ler(arquivo)).toContain("var(--fonte-minima-campo)");
  });
});

describe("cabeçalhos que quebram linha no celular", () => {
  it.each(["app/_home/PaginaInicial.module.css", "app/busca/page.module.css"])(
    "%s permite quebrar o cabeçalho abaixo de 600px",
    (arquivo) => {
      const css = ler(arquivo);
      const celular = css.slice(css.lastIndexOf("@media (max-width: 600px)"));
      expect(celular).toMatch(/\.cabecalho \{\s*flex-wrap: wrap;/);
    },
  );
});
