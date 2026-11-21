"use client";

import { useSyncExternalStore } from "react";
import {
  alternarNoticiaSalva,
  assinarNoticiasSalvas,
  lerNoticiasSalvas,
  removerNoticiaSalva,
  salvosNoServidor,
} from "@/lib/noticiasSalvas";

export function useSalvos() {
  const idsSalvos = useSyncExternalStore(
    assinarNoticiasSalvas,
    lerNoticiasSalvas,
    salvosNoServidor,
  );
  return {
    idsSalvos,
    estaSalvo: (id: string): boolean => idsSalvos.includes(id),
    alternar: alternarNoticiaSalva,
    remover: removerNoticiaSalva,
  };
}
