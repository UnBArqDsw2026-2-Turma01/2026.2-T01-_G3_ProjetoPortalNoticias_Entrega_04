import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

it("mantém uma story ao lado de cada componente do catálogo", () => {
  const pasta = join(process.cwd(), "src/components");
  const faltantes = readdirSync(pasta, { withFileTypes: true })
    .filter((entrada) => entrada.isDirectory())
    .map((entrada) => entrada.name)
    .filter((nome) =>
      existsSync(join(pasta, nome, `${nome}.tsx`)) &&
      !existsSync(join(pasta, nome, `${nome}.stories.tsx`)),
    );
  expect(faltantes).toEqual([]);
});
