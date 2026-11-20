import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoTema } from "./LogoTema";

const meta = {
  title: "Tema/LogoTema",
  component: LogoTema,
  decorators: [(Story) => <div style={{ width: 296, background: "var(--cor-sidebar)" }}><Story /></div>],
} satisfies Meta<typeof LogoTema>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { args: { tema: "padrao" } };
export const Natal: Story = { args: { tema: "natal" } };
export const Halloween: Story = { args: { tema: "halloween" } };
export const Estudante: Story = { args: { tema: "estudante" } };
