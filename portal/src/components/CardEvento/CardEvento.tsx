import Image from "next/image";
import Link from "next/link";
import { caminhoPublico } from "@/lib/caminhos";
import styles from "./CardEvento.module.css";

export interface Evento {
  titulo: string;
  data: string; // como aparece no card, ex.: "Dom, 14 de out"
  publicadoHa: string; // ex.: "5d"
  local: string;
  imagemUrl: string; // caminho em /public
  href: string; // página com os detalhes do evento
}

export interface CardEventoProps {
  evento: Evento;
  /** Destino do link "Ver todos os eventos". */
  hrefTodos: string;
}

// Card "Próximo Evento" da Home (Figma node 230:1005).
export function CardEvento({ evento, hrefTodos }: CardEventoProps) {
  return (
    <section className={styles.card} aria-labelledby="card-evento-titulo">
      <h2 id="card-evento-titulo" className={styles.titulo}>
        <Image src={caminhoPublico("/icones/home/calendario.svg")} alt="" width={28} height={28} />
        Próximo Evento
      </h2>

      <Link href={evento.href} className={styles.evento}>
        <Image
          className={styles.imagem}
          src={caminhoPublico(evento.imagemUrl)}
          alt=""
          width={84}
          height={77}
        />
        <span className={styles.detalhes}>
          <span className={styles.nome}>{evento.titulo}</span>
          <span className={styles.meta}>
            {evento.data}
            <span className={styles.ponto} aria-hidden="true" />
            <span className={styles.ha}>{evento.publicadoHa}</span>
          </span>
          <span className={styles.meta}>
            <Image src={caminhoPublico("/icones/home/local.svg")} alt="" width={10} height={12} />
            {evento.local}
          </span>
        </span>
      </Link>

      <Link href={hrefTodos} className={styles.verTodos}>
        Ver todos os eventos
        <Image src={caminhoPublico("/icones/home/seta-direita.svg")} alt="" width={6} height={10} />
      </Link>
    </section>
  );
}
