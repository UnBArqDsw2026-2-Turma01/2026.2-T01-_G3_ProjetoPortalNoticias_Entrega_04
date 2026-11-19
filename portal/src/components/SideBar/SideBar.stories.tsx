import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SideBar } from "./SideBar";

const meta = {
  title: "Layout/SideBar",
  component: SideBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SideBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Deslogado: Story = { args: { itemAtivo: "inicio", logado: false } };
export const Logado: Story = { args: { itemAtivo: "explorar", logado: true, categoriasSeguidas: ["cultura", "esporte"] } };
