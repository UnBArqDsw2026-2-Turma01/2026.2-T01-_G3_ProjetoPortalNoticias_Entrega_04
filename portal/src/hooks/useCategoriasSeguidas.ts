"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  assinarCategoriasSeguidas,
  lerCategoriasSeguidas,
  SEGUIDAS_PADRAO,
  seguirCategoria,
} from "@/lib/categoriasSeguidas";
import type { Categoria } from "@/types/noticia";

// Usado pelo BotaoSeguir e pelo "Meus Conteúdos" da SideBar: seguir em uma tela atualiza a outra.
export function useCategoriasSeguidas() {
  const seguidas = useSyncExternalStore(assinarCategoriasSeguidas, lerCategoriasSeguidas, () => SEGUIDAS_PADRAO);

  const segue = useCallback((categoria: Categoria) => seguidas.includes(categoria), [seguidas]);
  const definir = useCallback((categoria: Categoria, seguir: boolean) => seguirCategoria(categoria, seguir), []);

  return { seguidas, segue, definir };
}
