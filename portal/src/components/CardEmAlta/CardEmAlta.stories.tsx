import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardEmAlta } from "./CardEmAlta";

const meta = { title: "Conteúdo/CardEmAlta", component: CardEmAlta } satisfies Meta<typeof CardEmAlta>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { args: { assuntos: ["Arquitetura e Desenho", "Cultura", "Tecnologia"] } };
export const Limitado: Story = { args: { ...Padrao.args, limite: 2 } };
