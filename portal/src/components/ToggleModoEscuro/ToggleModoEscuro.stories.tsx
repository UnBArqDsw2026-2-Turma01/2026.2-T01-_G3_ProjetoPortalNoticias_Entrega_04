import type { ComponentType } from "react";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ToggleModoEscuro } from "./ToggleModoEscuro";
import "@/app/globals.css";

// CSF sem imports do Storybook: o catálogo é responsabilidade da vaga 7.
const meta = {
  title: "Componentes/ToggleModoEscuro",
  component: ToggleModoEscuro,
  decorators: [(Story: ComponentType) => <ThemeProvider><Story /></ThemeProvider>],
};

export default meta;

export const Padrao = {};
