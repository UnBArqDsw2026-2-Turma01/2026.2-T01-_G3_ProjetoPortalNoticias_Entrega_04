import Image from "next/image";
import Link from "next/link";
import { caminhoPublico } from "@/lib/caminhos";
import styles from "./CardEmAlta.module.css";

export interface CardEmAltaProps {
  /** Assuntos em alta, do mais para o menos comentado. */
  assuntos: readonly string[];
  /** Quantos mostrar (Home logado: 5; deslogado: 7). Padrão: todos. */
  limite?: number;
  titulo?: string;
}

// Card "Trending" da Home (Figma node 15:1349). Cada assunto leva à busca por aquele termo.
export function CardEmAlta({ assuntos, limite, titulo = "Em alta na sua região" }: CardEmAltaProps) {
  const visiveis = limite === undefined ? assuntos : assuntos.slice(0, limite);

  return (
    <section className={styles.card} aria-labelledby="card-em-alta-titulo">
      <h2 id="card-em-alta-titulo" className={styles.titulo}>
        <Image src={caminhoPublico("/icones/home/em-alta.svg")} alt="" width={27} height={28} />
        {titulo}
      </h2>
      <ol className={styles.lista}>
        {visiveis.map((assunto, indice) => (
          <li key={assunto}>
            <Link href={`/busca?q=${encodeURIComponent(assunto)}`} className={styles.assunto}>
              <span className={styles.posicao} aria-hidden="true">
                {indice + 1}
              </span>
              {assunto}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
