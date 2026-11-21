import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconeCompartilhar, IconeSalvar, IconeVoltar } from "./IconesAcao";

const meta = {
  title: "Conteúdo/IconesAcao",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Acoes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, color: "currentColor" }}>
      <IconeVoltar />
      <IconeCompartilhar />
      <IconeSalvar />
      <IconeSalvar preenchido />
    </div>
  ),
};
