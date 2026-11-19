"use client";

import { useCallback, useState } from "react";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import styles from "./NotificationBell.module.css";

// Sino com contador e lista suspensa de notificações (Figma: Notificações).
// Usa o hook useNotificacoes (Observer da Entrega 03 via eventBus).
export function NotificationBell() {
  const { notificacoes, naoLidas, marcarComoLidas } = useNotificacoes();
  const [aberta, setAberta] = useState(false);

  const alternar = useCallback(() => setAberta((a) => !a), []);
  const fechar = useCallback(() => setAberta(false), []);

  // Ao abrir, marca todas como lidas (o contador zera).
  const aoAbrir = useCallback(() => {
    marcarComoLidas();
    setAberta(true);
  }, [marcarComoLidas]);

  return (
    <div className={styles.wrapper} onClick={alternar} role="button" tabIndex={0} aria-label="Notificações" aria-expanded={aberta} aria-controls="lista-notificacoes">
      <div className={styles.sino}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {naoLidas > 0 && (
          <span className={styles.contador}>{naoLidas}</span>
        )}
      </div>

      {aberta && (
        <div className={styles.lista} id="lista-notificacoes" role="listbox" aria-label="Notificações">
          {notificacoes.length === 0 ? (
            <p className={styles.vazio}>Sem notificações no momento.</p>
          ) : (
            <ul className={styles.itens}>
              {notificacoes.map((n) => (
                <li key={n.id} className={styles.item}>
                  <span className={styles.titulo}>{n.titulo}</span>
                  <span className={styles.tempo}>{tempoRelativo(n.publicadaEm)}</span>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className={styles.botaoLerTodas} onClick={marcarComoLidas}>
            Marcar todas como lidas
          </button>
        </div>
      )}
    </div>
  );
}

function tempoRelativo(iso: string): string {
  const minutos = Math.floor((Date.now() - Date.parse(iso)) / 1000 / 60);
  if (minutos < 1) return "agora";
  if (minutos < 60) return `${minutos}min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas}h`;
  const dias = Math.floor(horas / 24);
  return `${dias}d`;
}