import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataPublicacao } from "./DataPublicacao";

const meta = {
  title: "Conteúdo/DataPublicacao",
  component: DataPublicacao,
} satisfies Meta<typeof DataPublicacao>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  args: { iso: "2026-11-19T09:42:00-03:00" },
};
