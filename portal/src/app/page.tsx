import type { Evento } from "@/components/CardEvento";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PaginaInicial } from "./_home/PaginaInicial";

// Assuntos do card "Em alta na sua região", na ordem do Figma (Home deslogado mostra os 7).
const ASSUNTOS_EM_ALTA = [
  "Arquitetura e Desenho",
  "Luis no BBB 27",
  "FCTE evasão de alunos",
  "Burburinho é o melhor site!",
  "Falange é um bom nome gamer",
  "Júlia enfrenta Itachi!",
  "Milene eleita melhor professora da FCTE",
] as const;

// Card "Próximo Evento": a feira do Figma é a mesma notícia "Feira Cultural da Praça" dos dados.
const PROXIMO_EVENTO: Evento = {
  titulo: "Feira Cultural da Praça",
  data: "Dom, 14 de out",
  publicadoHa: "5d",
  local: "Praça da Sé (SP)",
  imagemUrl: "/noticias/feira-cultural.jpg",
  href: "/noticia/feira-cultural-da-praca",
};

// Home. Esta página NÃO importa a SideBar: ela vem do AppLayout, aplicado no layout.tsx.
// Roda no build (export estático): busca os dados no repositório e entrega à parte interativa.
export default function Home() {
  const destaque = repositorioNoticias.listarDestaques()[0];
  const ultimas = repositorioNoticias
    .listarRecentes(4)
    .filter((noticia) => noticia.id !== destaque?.id)
    .slice(0, 3);

  return (
    <PaginaInicial destaque={destaque} ultimas={ultimas} assuntosEmAlta={ASSUNTOS_EM_ALTA} evento={PROXIMO_EVENTO} />
  );
}
