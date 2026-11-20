import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardEvento } from "./CardEvento";

const meta = { title: "Conteúdo/CardEvento", component: CardEvento } satisfies Meta<typeof CardEvento>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Feira: Story = {
  args: {
    evento: {
      titulo: "Feira Cultural da Praça", data: "Dom, 14 de out", publicadoHa: "5d",
      local: "Praça da Sé (SP)", imagemUrl: "/noticias/feira-cultural.jpg", href: "/noticia/feira-cultural-da-praca",
    },
    hrefTodos: "/categoria/cultura",
  },
};
