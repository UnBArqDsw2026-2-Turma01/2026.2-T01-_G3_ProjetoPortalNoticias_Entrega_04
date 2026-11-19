import Link from "next/link";
import styles from "./page.module.css";

export default function Perfil() {
  return (
    <div className={styles.pagina}>
      <header className={styles.capa}>
        <Link href="/" className={styles.voltar}>‹ Voltar</Link>
      </header>
      <section className={styles.perfil} aria-labelledby="nome-perfil">
        <div className={styles.linha}>
          <svg className={styles.avatar} width="230" height="230" viewBox="0 0 85 85" role="img" aria-label="Avatar genérico">
            <circle cx="42.5" cy="42.5" r="42.5" fill="var(--cor-perfil-secundaria)" />
            <circle cx="42.5" cy="32" r="13" fill="var(--cor-fundo)" />
            <path d="M20 68c0-22 45-22 45 0Z" fill="var(--cor-fundo)" />
          </svg>
          <button type="button" className={styles.editar} disabled>Editar Perfil <span aria-hidden="true">✎</span></button>
        </div>
        <h1 id="nome-perfil">Usuário anônimo</h1>
        <div className={styles.vazio}>
          <svg width="85" height="85" viewBox="0 0 85 85" aria-hidden="true">
            <circle cx="42.5" cy="42.5" r="42.5" fill="currentColor" />
            <circle cx="42.5" cy="32" r="13" fill="var(--cor-fundo)" />
            <path d="M20 68c0-22 45-22 45 0Z" fill="var(--cor-fundo)" />
          </svg>
          <p>Você ainda não possui nenhuma contribuição</p>
        </div>
      </section>
    </div>
  );
}
