"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import styles from "./NotificationBell.module.css";

// Sino com contador e lista suspensa de notificações (Figma: Notificações).
// Usa o hook useNotificacoes (Observer da Entrega 03 via eventBus).
export function NotificationBell() {
  const { notificacoes, naoLidas, marcarComoLidas } = useNotificacoes();
  const [aberta, setAberta] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const alternar = useCallback(() => setAberta((a) => !a), []);

  useEffect(() => {
    if (!aberta) return;
    const fecharAoClicarFora = (evento: PointerEvent) => {
      if (!wrapperRef.current?.contains(evento.target as Node)) setAberta(false);
    };
    const fecharComEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberta(false);
    };
    document.addEventListener("pointerdown", fecharAoClicarFora);
    document.addEventListener("keydown", fecharComEscape);
    return () => {
      document.removeEventListener("pointerdown", fecharAoClicarFora);
      document.removeEventListener("keydown", fecharComEscape);
    };
  }, [aberta]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      <button
        type="button"
        className={styles.botaoSino}
        onClick={alternar}
        aria-label={naoLidas > 0 ? `Notificações, ${naoLidas} não lidas` : "Notificações"}
        aria-expanded={aberta}
        aria-controls="lista-notificacoes"
      >
      <div className={styles.sino}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {naoLidas > 0 && (
          <span className={styles.contador}>{naoLidas}</span>
        )}
      </div>
      </button>

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