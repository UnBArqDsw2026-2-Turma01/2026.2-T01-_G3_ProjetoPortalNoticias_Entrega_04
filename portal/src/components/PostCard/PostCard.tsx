import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCategoria } from "@/components/BadgeCategoria";
import { TempoPublicacao } from "@/components/TempoPublicacao";
import { caminhoPublico } from "@/lib/caminhos";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import type { Noticia } from "@/types/noticia";
import styles from "./PostCard.module.css";

export type VariantePostCard = "destaque" | "compacto" | "horizontal";

export interface PostCardProps {
  noticia: Noticia;
  /** Figma: destaque = Home, compacto = Últimas notícias (230:1153), horizontal = categorias (183:654). */
  variante?: VariantePostCard;
  /** Padrão: só no destaque. */
  mostrarResumo?: boolean;
  /** Botões de outras vagas (ex.: Salvar, vaga 5). */
  acoes?: ReactNode;
  /** Destino do card. Padrão: a página da notícia. `null` deixa o título sem link (prévia). */
  href?: string | null;
}

const TAMANHOS_IMAGEM: Record<VariantePostCard, string> = {
  destaque: "230px",
  compacto: "(max-width: 600px) 100vw, 180px",
  horizontal: "210px",
};

// O link do título cobre o card inteiro (::after no CSS), para os botões de `acoes`
// não ficarem dentro de um <a>.
export function PostCard({ noticia, variante = "compacto", mostrarResumo, acoes, href }: PostCardProps) {
  const tema = FabricaCategoria.para(noticia.categoria).criarTema();
  const exibirResumo = mostrarResumo ?? variante === "destaque";
  const destino = href === undefined ? `/noticia/${noticia.id}` : href;

  return (
    <article className={`${styles.card} ${styles[variante]}`} style={tema.estilo()}>
      <div className={styles.imagem}>
        <Image src={caminhoPublico(noticia.imagemUrl)} alt="" fill sizes={TAMANHOS_IMAGEM[variante]} />
      </div>

      <div className={styles.corpo}>
        <div className={styles.topo}>
          {variante === "destaque" ? (
            <span className={styles.selo}>Destaque</span>
          ) : (
            <BadgeCategoria categoria={noticia.categoria} tamanho={variante === "compacto" ? "p" : "m"} />
          )}
          {acoes && <div className={styles.acoes}>{acoes}</div>}
        </div>

        <h3 className={styles.titulo}>
          {destino ? (
            <Link href={destino} className={styles.link}>
              {noticia.titulo}
            </Link>
          ) : (
            noticia.titulo
          )}
        </h3>

        {exibirResumo && <p className={styles.resumo}>{noticia.resumo}</p>}

        <div className={styles.rodape}>
          {variante !== "horizontal" && (
            <span className={styles.autor}>
              <span className={styles.avatar} aria-hidden="true">
                {noticia.autor.charAt(0).toUpperCase()}
              </span>
              <span className={styles.nomeAutor}>{noticia.autor}</span>
              <span className={styles.ponto} aria-hidden="true" />
              <TempoPublicacao iso={noticia.publicadaEm} className={styles.tempo} />
            </span>
          )}
          {variante !== "compacto" && destino && (
            <span className={styles.botao} aria-hidden="true">
              {variante === "destaque" ? "Ler Notícia" : "Ler Mais"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
