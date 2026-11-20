"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { caminhoPublico } from "@/lib/caminhos";

export type TemaLogo = "padrao" | "natal" | "halloween" | "estudante";

export interface LogoTemaProps {
  /** Força uma variante; quando omitida, escolhe pela data local. */
  tema?: TemaLogo;
}

export function temaPorData(data: Date): TemaLogo {
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  if (dia === 25 && mes === 12) return "natal";
  if (dia === 31 && mes === 10) return "halloween";
  if (dia === 11 && mes === 8) return "estudante";
  return "padrao";
}

function assinarDia(aoMudar: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  function agendar() {
    const agora = new Date();
    const meiaNoite = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1);
    timer = setTimeout(() => {
      aoMudar();
      agendar();
    }, meiaNoite.getTime() - agora.getTime());
  }
  agendar();
  document.addEventListener("visibilitychange", aoMudar);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", aoMudar);
  };
}

const temaAtual = () => temaPorData(new Date());
const temaServidor = (): TemaLogo => "padrao";

const logos: Record<TemaLogo, { arquivo: string; largura: number; altura: number }> = {
  padrao: { arquivo: "burburinho.svg", largura: 296, altura: 191 },
  natal: { arquivo: "BurburinhoNatal.svg", largura: 311, altura: 220 },
  halloween: { arquivo: "BurburinhoHalloween.svg", largura: 296, altura: 210 },
  estudante: { arquivo: "BurburinhoEstudante.svg", largura: 296, altura: 244 },
};

function LogoBase({ tema }: { tema: TemaLogo }) {
  const { arquivo, largura, altura } = logos[tema];
  return <Image src={caminhoPublico(`/logos/${arquivo}`)} alt="Burburinho" width={largura} height={altura} priority />;
}

/** Identidade do Burburinho com variantes sazonais da Entrega 03. */
export function LogoTema({ tema }: LogoTemaProps) {
  const automatico = useSyncExternalStore(assinarDia, temaAtual, temaServidor);
  return <LogoBase tema={tema ?? automatico} />;
}
