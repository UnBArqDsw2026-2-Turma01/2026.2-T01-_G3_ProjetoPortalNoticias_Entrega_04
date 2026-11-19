"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { BotaoAcao } from "@/components/BotaoAcao";
import { CampoFormulario } from "@/components/CampoFormulario";
import { IconeEnviar } from "@/components/IconesAcao";
import { PostCard } from "@/components/PostCard";
import { caminhoPublico } from "@/lib/caminhos";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { ErroNoticiaBuilder, NoticiaBuilder, type CampoNoticia } from "@/padroes/NoticiaBuilder";
import { CATEGORIAS, NOMES_CATEGORIAS, type Categoria, type Noticia } from "@/types/noticia";
import styles from "./PaginaSugerir.module.css";

const OPCOES_CATEGORIA = CATEGORIAS.map((categoria) => ({
  valor: categoria,
  rotulo: NOMES_CATEGORIAS[categoria],
}));

const ETAPAS = [
  { numero: 1, rotulo: "Conte o que aconteceu" },
  { numero: 2, rotulo: "Revise" },
  { numero: 3, rotulo: "Envie" },
];

// Tela Sugerir Publicação (Figma 142:1009 e 280:2147). O formulário é o Director do Builder:
// cada campo chama um passo (comTitulo, comCategoria...) e o construir() valida e devolve a
// Noticia pronta, que o repositório guarda para moderação.
export function PaginaSugerir() {
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [erros, setErros] = useState<Partial<Record<CampoNoticia, string>>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [sugestao, setSugestao] = useState<Noticia | null>(null);

  const preenchido = Boolean(categoria && titulo.trim() && texto.trim() && autor.trim());
  const etapaAtual = sugestao ? 3 : preenchido ? 2 : 1;

  function limparErro(campo: CampoNoticia) {
    setErros((atuais) => {
      if (!atuais[campo]) return atuais;
      const proximos = { ...atuais };
      delete proximos[campo];
      return proximos;
    });
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErroGeral("");
    setErros({});

    try {
      const builder = new NoticiaBuilder()
        .comTitulo(titulo)
        .comParagrafos(texto.split(/\n+/))
        .comAutor(autor);

      // Só envia a categoria quando ela existe: assim o erro do Builder aponta para o campo.
      if (categoria) builder.comCategoria(categoria as Categoria);

      const noticia = builder.construir();
      repositorioNoticias.adicionarSugestao(noticia);

      setSugestao(noticia);
      setCategoria("");
      setTitulo("");
      setAutor("");
      setTexto("");
    } catch (erro) {
      if (erro instanceof ErroNoticiaBuilder) {
        setErros({ [erro.campo]: erro.message });
        return;
      }
      setErroGeral(erro instanceof Error ? erro.message : "Não foi possível enviar a sugestão.");
    }
  }

  return (
    <div className={styles.pagina}>
      <header className={styles.banner}>
        <Image
          className={styles.ilustracao}
          src={caminhoPublico("/ilustracoes/sugerir-publicacao.svg")}
          alt=""
          width={640}
          height={420}
          priority
        />
        <h1 className={styles.tituloBanner}>
          <span className={styles.chamada}>Sugerir</span>
          <span className={styles.destaque}>Publicação</span>
        </h1>
      </header>

      <div className={styles.conteudo}>
        <ol className={styles.etapas} aria-label="Etapas da sugestão">
          {ETAPAS.map((etapa) => (
            <li
              key={etapa.numero}
              className={styles.etapa}
              data-estado={
                etapa.numero < etapaAtual ? "concluida" : etapa.numero === etapaAtual ? "atual" : "pendente"
              }
              aria-current={etapa.numero === etapaAtual ? "step" : undefined}
            >
              <span className={styles.numero} aria-hidden="true">
                {etapa.numero}
              </span>
              <span className={styles.rotuloEtapa}>{etapa.rotulo}</span>
            </li>
          ))}
        </ol>

        {sugestao ? (
          <section className={styles.sucesso} aria-labelledby="titulo-sucesso">
            <h2 id="titulo-sucesso" className={styles.tituloSucesso}>
              Sugestão enviada para moderação
            </h2>
            <p className={styles.textoSucesso}>
              A redação vai revisar o texto antes de publicá-lo no portal. Obrigado por contribuir com o
              Burburinho!
            </p>
            <p className={styles.nota}>
              Nesta demonstração sem back-end, a sugestão fica apenas na memória desta sessão e some ao
              recarregar a página.
            </p>

            <h3 className={styles.tituloPrevia}>Prévia da publicação</h3>
            <div className={styles.previa}>
              <PostCard noticia={sugestao} variante="destaque" href={null} />
            </div>

            <BotaoAcao
              rotulo="Enviar outra sugestão"
              variante="secundario"
              onClick={() => setSugestao(null)}
            />
          </section>
        ) : (
          <form className={styles.formulario} onSubmit={enviar} noValidate>
            <CampoFormulario
              rotulo="Escolha um Conteúdo"
              nome="categoria"
              tipo="selecao"
              valor={categoria}
              aoMudar={(valor) => {
                setCategoria(valor);
                limparErro("categoria");
              }}
              opcoes={OPCOES_CATEGORIA}
              placeholder="Selecione o tipo do seu conteúdo"
              erro={erros.categoria}
              obrigatorio
            />

            <CampoFormulario
              rotulo="Título da Publicação"
              nome="titulo"
              tipo="texto"
              valor={titulo}
              aoMudar={(valor) => {
                setTitulo(valor);
                limparErro("titulo");
              }}
              placeholder="Ex.: Feira cultural movimenta a Praça da Liberdade"
              erro={erros.titulo}
              obrigatorio
            />

            <CampoFormulario
              rotulo="Conte o que aconteceu"
              nome="conteudo"
              tipo="area"
              valor={texto}
              aoMudar={(valor) => {
                setTexto(valor);
                limparErro("paragrafos");
              }}
              placeholder="Escreva a notícia com quem, quando, onde e por que o fato aconteceu."
              dica="Separe os parágrafos com Enter."
              erro={erros.paragrafos}
              obrigatorio
            />

            <CampoFormulario
              rotulo="Seu nome"
              nome="autor"
              tipo="texto"
              valor={autor}
              aoMudar={(valor) => {
                setAutor(valor);
                limparErro("autor");
              }}
              placeholder="Como você quer ser creditado"
              dica="Seu nome aparece como autor da publicação."
              erro={erros.autor}
              obrigatorio
            />

            {erroGeral && (
              <p className={styles.erroGeral} role="alert">
                {erroGeral}
              </p>
            )}

            <div className={styles.acoes}>
              <BotaoAcao
                type="submit"
                rotulo="Enviar sugestão"
                variante="primario"
                icone={<IconeEnviar />}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
