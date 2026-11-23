"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  assinarPerfil,
  lerPerfil,
  perfilNoServidor,
  salvarPerfil,
  type PerfilSimulado,
} from "@/lib/sessaoSimulada";

// Perfil compartilhado pela página de perfil (edição) e pela Home (nome e avatar).
// useSyncExternalStore lê o localStorage só no navegador; no export estático a página
// é gerada com o perfil padrão.
export function usePerfil() {
  const perfil = useSyncExternalStore(assinarPerfil, lerPerfil, perfilNoServidor);

  const salvar = useCallback((dados: PerfilSimulado) => salvarPerfil(dados), []);

  return { ...perfil, salvar };
}
