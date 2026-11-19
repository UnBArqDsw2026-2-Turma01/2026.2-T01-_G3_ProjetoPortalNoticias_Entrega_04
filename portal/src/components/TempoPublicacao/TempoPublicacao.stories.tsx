import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TempoPublicacao } from "./TempoPublicacao";

const meta = { title: "Conteúdo/TempoPublicacao", component: TempoPublicacao } satisfies Meta<typeof TempoPublicacao>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Data: Story = { args: { iso: "2026-11-01T12:00:00Z" } };
