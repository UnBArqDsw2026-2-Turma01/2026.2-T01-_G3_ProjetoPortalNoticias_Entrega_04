import type { Noticia } from "@/types/noticia";

// Dados de exemplo do portal. Títulos, autores e imagens vêm do protótipo no Figma;
// os parágrafos que o protótipo não mostra foram completados para a demonstração.
// NÃO importe este array direto nas páginas: use o repositorioNoticias (src/lib).

export const noticiasIniciais: Noticia[] = [
  // ---------------------------------------------------------------- Cultura
  {
    id: "festival-de-rua-movimenta-o-centro",
    titulo: "Festival de rua movimenta o Centro neste fim de semana",
    resumo: "Shows, arte, gastronomia e atividades gratuitas prometem agitar o coração da cidade.",
    conteudo: [
      "Neste final de semana, o Centro da cidade ganha novas cores, sons e aromas. A partir das 10h deste sábado, o tradicional Festival de Cultura Urbana toma conta da Avenida Central e de suas travessas históricas, transformando o asfalto em um grande corredor de lazer ao ar livre.",
      "O evento, que já faz parte do calendário oficial do município, espera atrair mais de 20 mil visitantes ao longo dos dois dias com uma programação totalmente gratuita. Com dois palcos principais montados nas praças da Matriz e dos Pracinhas, a maratona cultural contará com mais de 15 atrações musicais, variando entre samba, rap, MPB e música eletrônica.",
      "Além dos shows, o festival reúne feira de artesanato, oficinas de grafite para crianças e uma área gastronômica com food trucks de diferentes regiões do país. A organização recomenda o uso do transporte público, já que as ruas do entorno ficarão fechadas para carros durante todo o evento.",
    ],
    categoria: "cultura",
    autor: "João Pedro Lopes",
    publicadaEm: "2026-11-19T09:42:00-03:00",
    imagemUrl: "/noticias/festival-centro.jpg",
    origem: "redacao",
    destaque: true,
  },
  {
    id: "dede-espetos-nao-sai-da-boca-do-povo",
    titulo: "Dedé Espetos não sai da boca do povo! Literalmente...",
    resumo: "O espetinho mais comentado do bairro virou ponto de encontro depois das aulas.",
    conteudo: [
      "Quem passa pela praça depois das 18h já conhece a fila. O Dedé Espetos, que começou com uma churrasqueira e duas mesas, hoje ocupa a calçada inteira e virou parada obrigatória de estudantes e trabalhadores da região.",
      "O segredo, segundo o próprio Dedé, é o tempero da casa e o preço justo. A publicação foi enviada por um leitor e confirmada pela redação do Burburinho.",
    ],
    categoria: "cultura",
    autor: "Dedé Espetos",
    publicadaEm: "2026-11-19T07:30:00-03:00",
    imagemUrl: "/noticias/dede-espetos.jpg",
    origem: "ugc",
  },
  {
    id: "aula-de-flauta-terca-feira",
    titulo: "Quem faz aula de flauta terça feira 14h da tarde??",
    resumo: "Grupo de iniciantes procura novos colegas para as aulas gratuitas no parque.",
    conteudo: [
      "Um grupo de estudantes de música está reunindo interessados em aulas de flauta doce às terças-feiras, às 14h, no gramado do parque central. As aulas são gratuitas e voltadas para quem nunca tocou um instrumento.",
      "Quem quiser participar só precisa levar a própria flauta. A organização é feita pelos próprios alunos, que compartilham partituras e dicas pelo Burburinho.",
    ],
    categoria: "cultura",
    autor: "Flauta Aulas",
    publicadaEm: "2026-11-14T14:00:00-03:00",
    imagemUrl: "/noticias/aula-flauta.jpg",
    origem: "ugc",
  },
  {
    id: "feira-cultural-da-praca",
    titulo: "Feira Cultural da Praça reúne artistas locais no domingo",
    resumo: "Artesanato, música ao vivo e comidas típicas na Praça da Sé a partir das 9h.",
    conteudo: [
      "A Feira Cultural da Praça volta no domingo com mais de 60 expositores de artesanato, livros usados e comidas típicas. A programação inclui apresentações de grupos de dança e uma roda de choro ao meio-dia.",
      "A entrada é gratuita e o evento acontece até as 17h. Em caso de chuva, as barracas serão transferidas para a galeria coberta ao lado da praça.",
    ],
    categoria: "cultura",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-17T10:15:00-03:00",
    imagemUrl: "/noticias/feira-cultural.jpg",
    origem: "redacao",
  },

  // ---------------------------------------------------------------- Tecnologia
  {
    id: "nova-empresa-de-tecnologia-muda-o-mercado",
    titulo: "Nova empresa de tecnologia muda o mercado",
    resumo: "Startup local cresce rápido oferecendo sistemas para pequenos comércios.",
    conteudo: [
      "A Renatech, fundada por ex-alunos da universidade, anunciou nesta semana que já atende mais de 300 pequenos comércios da região com um sistema simples de vendas e estoque.",
      "Segundo os fundadores, o diferencial é o atendimento próximo e um aplicativo pensado para quem nunca usou um sistema de gestão. A empresa está contratando estagiários de desenvolvimento.",
    ],
    categoria: "tecnologia",
    autor: "Renatech",
    publicadaEm: "2026-11-19T05:40:00-03:00",
    imagemUrl: "/noticias/renatech.jpg",
    origem: "ugc",
  },
  {
    id: "gatinhos-injetam-bugs-nos-servidores",
    titulo: "Gatinhos injetam bugs nos servidores da Amazon",
    resumo: "Relato bem-humorado de desenvolvedores viraliza: os culpados tinham bigodes.",
    conteudo: [
      "Uma publicação de desenvolvedores que trabalham de casa viralizou ao culpar os próprios gatos por uma série de bugs: teclas pressionadas, cabos puxados e até um deploy acidental.",
      "Brincadeiras à parte, o caso reacendeu a discussão sobre boas práticas de revisão de código e por que nenhuma alteração deveria ir para produção sem testes e sem uma segunda pessoa olhando.",
    ],
    categoria: "tecnologia",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-18T16:20:00-03:00",
    imagemUrl: "/noticias/gatinhos-bugs.jpg",
    origem: "redacao",
  },
  {
    id: "realidade-virtual-chega-aos-shows",
    titulo: "Realidade virtual chega aos shows e muda a experiência do público",
    resumo: "Casas de show testam óculos de RV para quem quer ver o palco de outros ângulos.",
    conteudo: [
      "Duas casas de show da cidade começaram a testar óculos de realidade virtual que permitem acompanhar a apresentação de diferentes pontos do palco, inclusive ao lado da banda.",
      "Especialistas lembram que a tecnologia ainda é cara e pode causar enjoo em parte do público, mas apostam que ela deve se popularizar nos próximos anos.",
    ],
    categoria: "tecnologia",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-16T11:00:00-03:00",
    imagemUrl: "/noticias/realidade-virtual.jpg",
    origem: "redacao",
  },

  // ---------------------------------------------------------------- Política
  {
    id: "debate-rumos-do-pais",
    titulo: "Debate coloca diferentes opiniões em confronto sobre os rumos do país",
    resumo: "Encontro reuniu representantes de vários partidos para discutir economia e educação.",
    conteudo: [
      "O debate promovido nesta semana reuniu representantes de cinco partidos para discutir propostas de economia, educação e segurança pública. O encontro foi transmitido ao vivo e teve participação do público com perguntas enviadas pela internet.",
      "Os temas que mais geraram discussão foram o financiamento das universidades públicas e as políticas de geração de emprego para jovens.",
    ],
    categoria: "politica",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-19T08:00:00-03:00",
    imagemUrl: "/noticias/debate-rumos-do-pais.jpg",
    origem: "redacao",
    destaque: true,
  },
  {
    id: "eleicoes-prazo-titulo",
    titulo: "Prazo para regularizar o título de eleitor termina no fim do mês",
    resumo: "Quem tem pendências pode resolver tudo pela internet, sem sair de casa.",
    conteudo: [
      "A Justiça Eleitoral lembra que o prazo para tirar, transferir ou regularizar o título de eleitor termina no último dia útil do mês. O atendimento pode ser feito pelo site oficial.",
      "Jovens a partir de 16 anos já podem emitir o título e votar nas próximas eleições.",
    ],
    categoria: "politica",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-17T13:30:00-03:00",
    imagemUrl: "/noticias/eleicao.jpg",
    origem: "redacao",
  },
  {
    id: "congresso-vota-orcamento",
    titulo: "Congresso deve votar orçamento antes do recesso",
    resumo: "Parlamentares correm para aprovar a proposta até a segunda quinzena de dezembro.",
    conteudo: [
      "Lideranças do Congresso Nacional afirmaram que a proposta de orçamento para o próximo ano deve ser votada antes do recesso parlamentar. A discussão gira em torno dos recursos para saúde e educação.",
      "Se a votação atrasar, o governo precisará trabalhar com um orçamento provisório no início do ano.",
    ],
    categoria: "politica",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-15T18:45:00-03:00",
    imagemUrl: "/noticias/brasilia.jpg",
    origem: "redacao",
  },

  // ---------------------------------------------------------------- Esporte
  {
    id: "remo-contra-o-fluminense",
    titulo: "Remo contra o Fluminense já está marcado para próxima quinta",
    resumo: "Partida promete estádio cheio e é decisiva para a classificação.",
    conteudo: [
      "O confronto entre Remo e Fluminense foi confirmado para a próxima quinta-feira, às 21h30. Os ingressos começam a ser vendidos nesta sexta pela internet e nas bilheterias do estádio.",
      "A partida é considerada decisiva: uma vitória pode garantir a classificação antecipada para a próxima fase da competição.",
    ],
    categoria: "esporte",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-19T06:10:00-03:00",
    imagemUrl: "/noticias/remo-fluminense.jpg",
    origem: "redacao",
    destaque: true,
  },
  {
    id: "tenis-nas-olimpiadas",
    titulo: "Nas Olimpíadas a pergunta é: qual o verdadeiro poder das bolas?",
    resumo: "Cientistas explicam como o material das bolinhas de tênis muda o jogo.",
    conteudo: [
      "Pesquisadores analisaram as bolas usadas no tênis olímpico e mostraram como pequenas diferenças de pressão e de feltro alteram a velocidade e o quique, o que favorece estilos diferentes de jogo.",
      "Os atletas ouvidos dizem que sentem a diferença logo nos primeiros saques e ajustam a estratégia de acordo com a quadra.",
    ],
    categoria: "esporte",
    autor: "Redação Burburinho",
    publicadaEm: "2026-11-16T09:05:00-03:00",
    imagemUrl: "/noticias/tenis-olimpiadas.jpg",
    origem: "redacao",
  },
  {
    id: "torneio-de-volei-de-praia",
    titulo: "Torneio de vôlei de praia abre inscrições para duplas amadoras",
    resumo: "Competição acontece no parque da cidade e tem categorias mista e feminina.",
    conteudo: [
      "Estão abertas as inscrições para o torneio amador de vôlei de praia do parque da cidade. As partidas acontecem nos dois próximos fins de semana, com categorias mista, masculina e feminina.",
      "A inscrição é gratuita e as duplas campeãs ganham kits esportivos doados por lojas parceiras. A publicação foi sugerida por um leitor do Burburinho.",
    ],
    categoria: "esporte",
    autor: "Liga de Vôlei Amador",
    publicadaEm: "2026-11-13T17:00:00-03:00",
    imagemUrl: "/noticias/volei-praia.jpg",
    origem: "ugc",
  },
];
