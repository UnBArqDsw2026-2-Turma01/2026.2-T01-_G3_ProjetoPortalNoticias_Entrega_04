"use client";

import { useCallback, useEffect, useState } from "react";
import { assinar, publicar } from "@/padroes/eventBus";

export interface Notificacao {
  id: string;
  titulo: string;
  lida: boolean;
  publicadaEm: string; // ISO 8601
}

// 3 notificações de exemplo para começar.
const NOTIFICACOES_INICIAIS: Notificacao[] = [
  {
    id: "notif-1",
    titulo: "Nova notícia publicada: Festival de rua movimenta o Centro",
    lida: false,
    publicadaEm: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min atrás
  },
  {
    id: "notif-2",
    titulo: "Sua sugestão foi revisada pela redação",
    lida: false,
    publicadaEm: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h atrás
  },
  {
    id: "notif-3",
    titulo: "Lembrete: aula de flauta terça-feira às 14h",
    lida: true,
    publicadaEm: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
  },
];

export function useNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(NOTIFICACOES_INICIAIS);

  // Assina o eventBus quando monta, cancela no cleanup.
  // O cancelamento é essencial: sem ele, cada render cria uma nova assinatura que
  // nunca é removida, vazando memória e disparando callbacks em componentes desmontados.
  useEffect(() => {
    const cancelarNoticia = assinar("noticia-publicada", (dados: any) => {
      const noticia = dados as { id?: string; titulo?: string };
      setNotificacoes((atual) => [
        {
          id: `notif-${Date.now()}`,
          titulo: noticia.titulo ?? "Nova notícia publicada",
          lida: false,
          publicadaEm: new Date().toISOString(),
        },
        ...atual,
      ]);
    });

    const cancelarSugestao = assinar("sugestao-enviada", (dados: any) => {
      const sugestao = dados as { id?: string; titulo?: string };
      setNotificacoes((atual) => [
        {
          id: `notif-${Date.now()}`,
          titulo: sugestao.titulo ?? "Sua sugestão foi enviada",
          lida: false,
          publicadaEm: new Date().toISOString(),
        },
        ...atual,
      ]);
    });

    return () => {
      cancelarNoticia();
      cancelarSugestao();
    };
  }, []);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  const marcarComoLidas = useCallback((): void => {
    setNotificacoes((atual) => atual.map((n) => ({ ...n, lida: true })));
  }, []);

  // Expõe publicar para que outros componentes (ex.: vaga 4 ao enviar sugestão)
  // possam disparar eventos no eventBus.
  return { notificacoes, naoLidas, marcarComoLidas, publicar };
}