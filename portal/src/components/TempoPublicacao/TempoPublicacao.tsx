"use client";

import { useSyncExternalStore } from "react";
import { formatarDataCurta, formatarTempoRelativo } from "@/lib/formatarData";

export interface TempoPublicacaoProps {
  iso: string;
  className?: string;
}

// No build estático o "2h" ficaria congelado: o HTML sai com a data curta e o navegador
// troca pelo tempo relativo, atualizando a cada minuto.
function assinarMinuto(aoMudar: () => void) {
  const intervalo = window.setInterval(aoMudar, 60_000);
  return () => window.clearInterval(intervalo);
}

const minutoAtual = () => Math.floor(Date.now() / 60_000);
const semRelogio = () => null;

export function TempoPublicacao({ iso, className }: TempoPublicacaoProps) {
  const minuto = useSyncExternalStore(assinarMinuto, minutoAtual, semRelogio);
  const texto = minuto === null ? formatarDataCurta(iso) : formatarTempoRelativo(iso, new Date(minuto * 60_000));

  return (
    <time dateTime={iso} className={className}>
      {texto}
    </time>
  );
}
