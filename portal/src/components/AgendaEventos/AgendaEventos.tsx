import Link from "next/link";
import type { EventoCultural } from "@/data/eventos";
import styles from "./AgendaEventos.module.css";

export interface AgendaEventosProps {
  eventos: readonly EventoCultural[];
}

// Bloco "Eventos" da tela de Cultura (Figma 250:1678): os cards da lista de eventos.
export function AgendaEventos({ eventos }: AgendaEventosProps) {
  return (
    <section className={styles.agenda} aria-labelledby="agenda-eventos">
      <h2 id="agenda-eventos" className={styles.titulo}>
        Eventos
      </h2>
      <ul className={styles.lista}>
        {eventos.map((evento) => (
          <li key={evento.id}>
            <Link href={`/noticia/${evento.noticiaId}`} className={styles.evento}>
              <span className={styles.data}>
                <span className={styles.dia}>{evento.dia}</span>
                <span className={styles.diaSemana}>{evento.diaSemana}</span>
              </span>
              <span className={styles.texto}>
                <span className={styles.nome}>{evento.titulo}</span>
                <span className={styles.resumo}>{evento.resumo}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
