"use client";

import Image from "next/image";
import Link from "next/link";
import { useSessaoSimulada } from "@/hooks/useSessaoSimulada";
import { BarraBusca } from "@/components/BarraBusca";
import { NotificationBell } from "@/components/NotificationBell";
import { CardEmAlta } from "@/components/CardEmAlta";
import { CardEvento, type Evento } from "@/components/CardEvento";
import { caminhoPublico } from "@/lib/caminhos";
import type { Noticia } from "@/types/noticia";
import { Marcador } from "./Marcador";
import { saudacaoPorHorario } from "./saudacao";
import styles from "./PaginaInicial.module.css";

export interface PaginaInicialProps {
  destaque?: Noticia;
  ultimas: readonly Noticia[];
  assuntosEmAlta: readonly string[];
  evento: Evento;
}

// Home logado (Figma 6:5) e deslogado (Figma 115:144). Os dados chegam prontos do page.tsx
// (que consulta o repositorioNoticias); aqui só se decide o que muda com o login simulado.
export function PaginaInicial({ destaque, ultimas, assuntosEmAlta, evento }: PaginaInicialProps) {
  const { logado, usuario, entrar, sair } = useSessaoSimulada();

  return (
    <div className={styles.pagina}>
      <header className={styles.cabecalho}>
        {usuario && (
          <h1 className={styles.saudacao}>
            {saudacaoPorHorario(new Date().getHours())}, {usuario.nome}!
          </h1>
        )}

        <div className={styles.acoesTopo}>
          <Link href="/acessibilidade" className={styles.iconeTopo} aria-label="Acessibilidade">
            <span
              className={styles.iconeAcessibilidade}
              style={{ maskImage: `url(${caminhoPublico("/icones/home/acessibilidade.svg")})` }}
            />
          </Link>

          {logado ? (
            <>
              <NotificationBell />
              <Link href="/perfil" className={styles.avatar} aria-label="Meu perfil">
                <Image src={caminhoPublico("/perfil/johnn.png")} alt="" width={60} height={60} />
              </Link>
              <button type="button" className={styles.botaoSair} onClick={sair}>
                Sair
              </button>
            </>
          ) : (
            <button type="button" className={styles.botaoEntrar} onClick={entrar}>
              Entrar
            </button>
          )}
        </div>
      </header>

      <div className={styles.colunas}>
        <div className={styles.principal}>
          <BarraBusca
            placeholder="Buscar conteúdos, notícias e assuntos"
          />

          {destaque && (
            // TODO vaga 3 (#3): trocar por <PostCard noticia={destaque} variante="destaque" />
            <Marcador componente="PostCard (destaque)" href={`/noticia/${destaque.id}`}>
              {destaque.titulo}
            </Marcador>
          )}

          <section aria-labelledby="ultimas-noticias">
            <div className={styles.tituloSecao}>
              <h2 id="ultimas-noticias">Últimas notícias</h2>
              <Link href="/explorar" className={styles.verTodas}>
                Ver todas
                <Image src={caminhoPublico("/icones/home/seta-direita.svg")} alt="" width={6} height={10} />
              </Link>
            </div>
            <ul className={styles.ultimas}>
              {ultimas.map((noticia) => (
                <li key={noticia.id}>
                  {/* TODO vaga 3 (#3): trocar por <PostCard noticia={noticia} variante="compacto" /> */}
                  <Marcador componente="PostCard" href={`/noticia/${noticia.id}`}>
                    {noticia.titulo}
                  </Marcador>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className={styles.lateral}>
          <CardEmAlta assuntos={assuntosEmAlta} limite={logado ? 5 : 7} />
          <CardEvento evento={evento} hrefTodos="/categoria/cultura" />
        </aside>
      </div>
    </div>
  );
}
