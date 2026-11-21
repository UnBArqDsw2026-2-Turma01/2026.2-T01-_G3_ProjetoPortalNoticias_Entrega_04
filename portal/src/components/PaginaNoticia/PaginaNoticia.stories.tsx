import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PaginaNoticia } from "./PaginaNoticia";

const noticia = repositorioNoticias.buscarPorId("festival-de-rua-movimenta-o-centro")!;

const meta = {
  title: "Conteúdo/PaginaNoticia",
  component: PaginaNoticia,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PaginaNoticia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cultura: Story = {
  args: { noticia },
};
