"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { caminhoPublico } from "@/lib/caminhos";
import { useTema } from "@/hooks/useTema";
import styles from "@/components/ToggleModoEscuro/ToggleModoEscuro.module.css";

interface Props {
  rotulo: string;
  descricao: string;
  icone?: string;
  larguraIcone?: number;
  alturaIcone?: number;
  ativo?: boolean;
  tipo?: "switch" | "button";
  nomeAcessivel?: string;
  onClick: () => void;
  children?: ReactNode;
}

export function ControleAcessibilidade({ rotulo, descricao, icone, larguraIcone = 45, alturaIcone = 45, ativo, tipo = "switch", nomeAcessivel, onClick, children }: Props) {
  const { dicasFerramenta } = useTema();
  const [mostrarDica, setMostrarDica] = useState(false);
  const id = useId();
  const visivel = dicasFerramenta && mostrarDica;
  return (
    <button type="button" role={tipo} aria-label={nomeAcessivel ?? rotulo}
      aria-checked={tipo === "switch" ? ativo : undefined}
      aria-pressed={tipo === "button" ? ativo : undefined}
      aria-describedby={visivel ? id : undefined}
      className={styles.controle} onClick={onClick}
      onMouseEnter={() => setMostrarDica(true)} onMouseLeave={() => setMostrarDica(false)}
      onFocus={() => setMostrarDica(true)} onBlur={() => setMostrarDica(false)}
      onKeyDown={(evento) => { if (evento.key === "Escape") setMostrarDica(false); }}>
      <span className={styles.icone} aria-hidden="true">
        {icone ? <Image src={caminhoPublico(`/icones/acessibilidade/${icone}.svg`)} alt="" width={larguraIcone} height={alturaIcone} /> : <span className={styles.pausa}>Ⅱ</span>}
      </span>
      <span className={styles.rotulo}>{rotulo}</span>
      {children}
      {visivel && <span className={styles.dica} role="tooltip" id={id}>{descricao}</span>}
    </button>
  );
}
