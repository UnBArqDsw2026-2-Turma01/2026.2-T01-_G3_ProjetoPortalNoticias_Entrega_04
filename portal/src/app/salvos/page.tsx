"use client";

import { useState } from "react";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { useSalvos } from "@/hooks/useSalvos";
import { PostCard } from "@/components/PostCard";
import type { Noticia } from "@/types/noticia";
import styles from "./page.module.css";

// Página Salvos (Figma: Salvos). Lista PostCards das notícias salvas pelo hook useSalvos.
// Persiste no localStorage: continua com as mesmas notícias após recarregar.
export default function Salvos() {
  const { idsSalvos, estaSalvo, alternar } = useSalvos();
  const [notificacao, setNotificacao] = useState<string | null>(null);

  // Busca as notícias completas a partir dos ids salvos.
  const salvos: Noticia[] = idsSalvos
    .map((id) => repositorioNoticias.buscarPorId(id))
    .filter((n): n is Noticia => n !== undefined);

  const aoAlternar = (id: string) => {
    alternar(id);
    setNotificacao(estaSalvo(id) ? "Removido dos salvos" : "Salvo!");
    setTimeout(() => setNotificacao(null), 2000);
  };

  return (
    <div className={styles.pagina}>
      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>Salvos</h1>
        {notificacao && <span className={styles.notificacao}>{notificacao}</span>}
      </header>

      {salvos.length === 0 ? (
        <div className={styles.vazio}>
          <p>Você ainda não salvou nenhuma publicação.</p>
        </div>
      ) : (
        <ul className={styles.lista}>
          {salvos.map((noticia) => (
            <li key={noticia.id}>
              <PostCard
                noticia={noticia}
                variante="compacto"
                acoes={
                  <button
                    type="button"
                    className={styles.botaoSalvar}
                    aria-pressed={estaSalvo(noticia.id)}
                    onClick={() => aoAlternar(noticia.id)}
                  >
                    {estaSalvo(noticia.id) ? "Remover" : "Salvar"}
                  </button>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}