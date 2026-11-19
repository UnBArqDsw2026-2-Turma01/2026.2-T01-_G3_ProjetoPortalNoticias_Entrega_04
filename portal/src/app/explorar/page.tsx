import type { Metadata } from "next";
import Image from "next/image";
import { CardComunidade } from "@/components/CardComunidade";
import { caminhoPublico } from "@/lib/caminhos";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import { CATEGORIAS } from "@/types/noticia";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Explorar · Burburinho",
};

// Tela Explorar (Figma 15:1956): um card por categoria do contrato.
export default function Explorar() {
  return (
    <div className={styles.pagina}>
      <header className={styles.hero}>
        <div className={styles.faixa} />
        <Image
          className={styles.sapos}
          src={caminhoPublico("/ilustracoes/explorar-sapos.svg")}
          alt=""
          width={916}
          height={605}
          priority
        />
        <h1 className={styles.titulo}>
          <span className={styles.chamada}>Encontre seu</span>
          <span className={styles.destaque}>Conteúdo</span>
        </h1>
      </header>

      <ul className={styles.comunidades}>
        {CATEGORIAS.map((categoria) => (
          <li key={categoria}>
            <CardComunidade fabrica={FabricaCategoria.para(categoria)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
