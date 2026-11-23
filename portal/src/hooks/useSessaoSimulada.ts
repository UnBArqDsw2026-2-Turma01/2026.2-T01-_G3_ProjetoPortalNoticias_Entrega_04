"use client";

import { useCallback, useSyncExternalStore } from "react";
import { usePerfil } from "@/hooks/usePerfil";
import { assinarSessao, definirLogado, estaLogado, USUARIO_EXEMPLO } from "@/lib/sessaoSimulada";

// Hook do login simulado, compartilhado pela SideBar ("Meus Conteúdos") e pela Home (saudação,
// botão Entrar). useSyncExternalStore lê o localStorage só no navegador; no export estático
// (servidor) a página é gerada como "deslogado".
export function useSessaoSimulada() {
  const logado = useSyncExternalStore(assinarSessao, estaLogado, () => false);
  const { nome, foto } = usePerfil();

  const entrar = useCallback(() => definirLogado(true), []);
  const sair = useCallback(() => definirLogado(false), []);

  return {
    logado,
    usuario: logado ? { ...USUARIO_EXEMPLO, nome, foto } : null,
    entrar,
    sair,
  };
}
