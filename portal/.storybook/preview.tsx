import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "../src/contexts/ThemeProvider";
import "../src/app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: { nextjs: { appDirectory: true } },
  globalTypes: {
    tema: {
      description: "Tema do portal",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [{ value: "claro", title: "Claro" }, { value: "escuro", title: "Escuro" }],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { tema: "claro" },
  decorators: [
    (Story, context) => (
      <ThemeProvider key={context.globals.tema} temaInicial={context.globals.tema === "escuro" ? "escuro" : "claro"}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
