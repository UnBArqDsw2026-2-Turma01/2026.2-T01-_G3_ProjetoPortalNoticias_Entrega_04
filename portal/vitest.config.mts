import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Configuração seguindo o guia oficial do Next.js (node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md).
// tsconfigPaths faz o alias "@/..." funcionar nos testes; jsdom simula o navegador para testar componentes.
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
