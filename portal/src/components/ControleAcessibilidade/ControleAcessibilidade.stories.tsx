import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ControleAcessibilidade } from "./ControleAcessibilidade";

const meta = {
  title: "Tema/ControleAcessibilidade",
  component: ControleAcessibilidade,
  render: function Controle(args) {
    const [ativo, setAtivo] = useState(false);
    return <ControleAcessibilidade {...args} ativo={ativo} onClick={() => setAtivo(!ativo)} />;
  },
} satisfies Meta<typeof ControleAcessibilidade>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Alternar: Story = { args: { rotulo: "Exemplo", descricao: "Exemplo de controle acessível", onClick: () => {} } };
