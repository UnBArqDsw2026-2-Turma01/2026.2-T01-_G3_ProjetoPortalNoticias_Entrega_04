import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppLayout } from "./AppLayout";

const meta = {
  title: "Layout/AppLayout",
  component: AppLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Pagina: Story = { args: { children: <h1>Conteúdo da página</h1> } };
