// Eventos do bloco "Eventos" da tela de Cultura no Figma (nó 250:1678). Cada um leva à notícia correspondente.

export interface EventoCultural {
  id: string;
  dia: string; // como no Figma: "14"
  diaSemana: string; // "DOM"
  titulo: string;
  resumo: string;
  noticiaId: string;
}

export const eventosCulturais: EventoCultural[] = [
  {
    id: "feira-cultural",
    dia: "14",
    diaSemana: "DOM",
    titulo: "Feira Cultural da Praça",
    resumo: "A feira cultural estará na praça com artesanato, música e comidas típicas.",
    noticiaId: "feira-cultural-da-praca",
  },
  {
    id: "aulas-de-flauta",
    dia: "16",
    diaSemana: "TER",
    titulo: "Aulas de flauta",
    resumo: "Flautistas do DF, as aulas de flauta transversal estão de volta.",
    noticiaId: "aula-de-flauta-terca-feira",
  },
  {
    id: "dede-espetos",
    dia: "19",
    diaSemana: "SEX",
    titulo: "Dedé espetos",
    resumo: "Dedé espetos fará uma aparição com muito churrasco no Gama.",
    noticiaId: "dede-espetos-nao-sai-da-boca-do-povo",
  },
];
