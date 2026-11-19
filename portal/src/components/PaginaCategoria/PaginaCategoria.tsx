import Image from "next/image";
import { BotaoSeguir } from "@/components/BotaoSeguir";
import { PostCard } from "@/components/PostCard";
import { caminhoPublico } from "@/lib/caminhos";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import type { FabricaCategoria } from "@/padroes/fabricaCategorias";
import styles from "./PaginaCategoria.module.css";

export interface PaginaCategoriaProps {
  /** Fábrica concreta da categoria, escolhida por quem usa a página (a rota). */
  fabrica: FabricaCategoria;
}

// Um componente para as 4 telas de categoria do Figma: tudo o que muda vem dos produtos da fábrica.
export function PaginaCategoria({ fabrica }: PaginaCategoriaProps) {
  const tema = fabrica.criarTema();
  const apresentacao = fabrica.criarApresentacao();
  const secao = fabrica.criarSecao().renderizar();
  const noticias = repositorioNoticias.listarPorCategoria(tema.categoria);

  return (
    <div className={styles.pagina} style={tema.estilo()}>
      <header className={styles.banner}>
        <Image
          className={styles.fotoBanner}
          src={caminhoPublico(tema.banner.src)}
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 1098px"
        />
        <div className={styles.sombraBanner} aria-hidden="true" />
        <h1 className={styles.tituloBanner}>{apresentacao.nome}</h1>
      </header>

      <div className={styles.conteudo}>
        <div className={styles.cabecalho}>
          <p className={styles.identidade}>
            <span className={styles.circulo}>
              <Image
                src={caminhoPublico(tema.icone.src)}
                alt=""
                width={Math.round(tema.icone.largura * 1.7)}
                height={Math.round(tema.icone.altura * 1.7)}
              />
            </span>
            {apresentacao.nome}
          </p>
          <BotaoSeguir categoria={tema.categoria} />
        </div>

        <p className={styles.descricao}>{apresentacao.descricao}</p>

        {secao && <div className={styles.secao}>{secao}</div>}

        <section className={styles.ultimas} aria-labelledby="categoria-ultimas-noticias">
          <h2 id="categoria-ultimas-noticias" className={styles.tituloSecao}>
            Últimas notícias
          </h2>
          {noticias.length > 0 ? (
            <ul className={styles.lista}>
              {noticias.map((noticia) => (
                <li key={noticia.id}>
                  <PostCard noticia={noticia} variante="horizontal" />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.vazio}>Ainda não há notícias publicadas em {apresentacao.nome}.</p>
          )}
        </section>
      </div>
    </div>
  );
}
