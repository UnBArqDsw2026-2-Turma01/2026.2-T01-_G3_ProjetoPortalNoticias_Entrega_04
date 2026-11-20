"use client";

import { useSyncExternalStore } from "react";
import { formatarDataCurta, formatarDataHora } from "@/lib/formatarData";

export interface DataPublicacaoProps {
  iso: string;
  className?: string;
}

// No export estático o "Hoje" ficaria congelado no dia do build. O HTML sai com a data curta
// e o navegador troca por "Hoje, 09:42" (ou pela data com hora) assim que hidrata.
function assinarMinuto(aoMudar: () => void) {
  const intervalo = window.setInterval(aoMudar, 60_000);
  return () => window.clearInterval(intervalo);
}

const minutoAtual = () => Math.floor(Date.now() / 60_000);
const semRelogio = () => null;

export function DataPublicacao({ iso, className }: DataPublicacaoProps) {
  const minuto = useSyncExternalStore(assinarMinuto, minutoAtual, semRelogio);
  const texto = minuto === null ? formatarDataCurta(iso) : formatarDataHora(iso, new Date(minuto * 60_000));

  return (
    <time dateTime={iso} className={className}>
      {texto}
    </time>
  );
}
