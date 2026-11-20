import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Marcador } from "./Marcador";

const meta = { title: "Layout/Marcador", component: Marcador } satisfies Meta<typeof Marcador>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Provisorio: Story = { args: { componente: "PostCard", children: "Notícia de exemplo" } };
