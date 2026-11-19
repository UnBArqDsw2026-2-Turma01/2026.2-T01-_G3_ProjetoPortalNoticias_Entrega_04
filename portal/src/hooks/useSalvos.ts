"use client";

import { useCallback, useEffect, useState } from "react";

// Chave do localStorage. Mesmo padrão do categoriasSeguidas (CHAVE + EVENTO).
const CHAVE = "burburinho:salvos";

// Lê os ids salvos do localStorage com proteção (servidor sem window, armazenamento bloqueado...).
function lerIdsSalvos(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const texto = window.localStorage.getItem(CHAVE);
    if (!texto) return [];
    const valor = JSON.parse(texto);
    if (!Array.isArray(valor)) return [];
    return valor.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
}

export function useSalvos() {
  const [idsSalvos, setIdsSalvos] = useState<string[]>([]);

  // Carrega do localStorage só no navegador (useEffect). No export estático (servidor)
  // o código roda sem window, então acessar localStorage fora do useEffect quebra o build.
  useEffect(() => {
    setIdsSalvos(lerIdsSalvos());
  }, []);

  // Persiste toda mudança no localStorage, com try/catch.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(idsSalvos));
    } catch {
      // armazenamento bloqueado: os salvos não sobrevivem ao recarregar
    }
  }, [idsSalvos]);

  const estaSalvo = useCallback(
    (id: string): boolean => idsSalvos.includes(id),
    [idsSalvos],
  );

  const alternar = useCallback(
    (id: string): void => {
      setIdsSalvos((atual) =>
        atual.includes(id) ? atual.filter((i) => i !== id) : [...atual, id],
      );
    },
    [],
  );

  const remover = useCallback(
    (id: string): void => {
      setIdsSalvos((atual) => atual.filter((i) => i !== id));
    },
    [],
  );

  return { idsSalvos, estaSalvo, alternar, remover };
}