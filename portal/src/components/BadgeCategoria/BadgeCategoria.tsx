import Image from "next/image";
import { caminhoPublico } from "@/lib/caminhos";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import type { Categoria } from "@/types/noticia";
import styles from "./BadgeCategoria.module.css";

export interface BadgeCategoriaProps {
  categoria: Categoria;
  /** "p" nos cards compactos da Home, "m" nos cards das categorias. */
  tamanho?: "p" | "m";
}

export function BadgeCategoria({ categoria, tamanho = "m" }: BadgeCategoriaProps) {
  const fabrica = FabricaCategoria.para(categoria);
  const tema = fabrica.criarTema();
  const { nome } = fabrica.criarApresentacao();

  return (
    <span className={`${styles.badge} ${styles[tamanho]}`} style={tema.estilo()}>
      <Image className={styles.icone} src={caminhoPublico(tema.icone.src)} alt="" width={tema.icone.largura} height={tema.icone.altura} />
      {nome}
    </span>
  );
}
