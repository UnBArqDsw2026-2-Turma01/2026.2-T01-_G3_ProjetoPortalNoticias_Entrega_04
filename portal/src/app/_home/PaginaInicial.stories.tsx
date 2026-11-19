import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PaginaInicial } from "./PaginaInicial";

const meta = {
  title: "Layout/PaginaInicial",
  component: PaginaInicial,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PaginaInicial>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    destaque: repositorioNoticias.listarDestaques()[0],
    ultimas: repositorioNoticias.listarRecentes(3),
    assuntosEmAlta: ["Arquitetura e Desenho", "Cultura"],
    evento: {
      titulo: "Feira Cultural da Praça", data: "Dom, 14 de out", publicadoHa: "5d",
      local: "Praça da Sé (SP)", imagemUrl: "/noticias/feira-cultural.jpg", href: "/noticia/feira-cultural-da-praca",
    },
  },
};
