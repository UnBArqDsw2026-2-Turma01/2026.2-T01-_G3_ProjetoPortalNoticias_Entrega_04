"use client";

import Image from "next/image";
import { useCategoriasSeguidas } from "@/hooks/useCategoriasSeguidas";
import { useSessaoSimulada } from "@/hooks/useSessaoSimulada";
import { caminhoPublico } from "@/lib/caminhos";
import type { Categoria } from "@/types/noticia";
import styles from "./BotaoSeguir.module.css";

export interface BotaoSeguirProps {
  categoria: Categoria;
  /** O Explorar usa "Juntar-se". */
  rotuloSeguir?: string;
  /** Visual antes de seguir: "contorno" (categorias) ou "preenchido" (Explorar). */
  convite?: "contorno" | "preenchido";
}

// A escolha fica no localStorage (useCategoriasSeguidas) e aparece também no "Meus Conteúdos"
// da SideBar. Sem escolha salva, valem as categorias do usuário de exemplo do Figma.
export function BotaoSeguir({ categoria, rotuloSeguir = "Seguir", convite = "contorno" }: BotaoSeguirProps) {
  const { logado, entrar } = useSessaoSimulada();
  const { segue, definir } = useCategoriasSeguidas();
  const seguindo = logado && segue(categoria);

  function alternar() {
    if (!logado) {
      entrar();
      definir(categoria, true);
      return;
    }
    definir(categoria, !seguindo);
  }

  const classe = seguindo ? styles.seguindo : convite === "preenchido" ? styles.preenchido : styles.contorno;

  return (
    <button type="button" className={`${styles.botao} ${classe}`} aria-pressed={seguindo} onClick={alternar}>
      {seguindo ? (
        <Image src={caminhoPublico("/icones/categoria/seguindo.svg")} alt="" width={19} height={19} />
      ) : (
        convite === "contorno" && <Image src={caminhoPublico("/icones/categoria/seguir.svg")} alt="" width={19} height={19} />
      )}
      {seguindo ? "Seguindo" : rotuloSeguir}
    </button>
  );
}
