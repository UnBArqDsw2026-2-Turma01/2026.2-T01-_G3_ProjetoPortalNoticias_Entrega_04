import { caminhoPublico } from "@/lib/caminhos";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { NOMES_CATEGORIAS } from "@/types/noticia";
import styles from "./page.module.css";

// PÁGINA PROVISÓRIA criada pela vaga 1 só para provar que projeto, dados, repositório e
// cores funcionam (e que o deploy no GitHub Pages está no ar).
// A Home de verdade, igual ao Figma, é da vaga 2 e substitui este arquivo.
export default function Home() {
  const noticias = repositorioNoticias.listarTodas();

  return (
    <main className={styles.pagina}>
      <h1 className={styles.titulo}>Burburinho</h1>
      <p className={styles.aviso}>
        Página provisória do projeto base (vaga 1). {noticias.length} notícias carregadas pelo
        repositorioNoticias.
      </p>

      <ul className={styles.lista}>
        {noticias.map((noticia) => (
          <li key={noticia.id} className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element -- export estático: imagem servida como está */}
            <img className={styles.imagem} src={caminhoPublico(noticia.imagemUrl)} alt="" />
            <div className={styles.conteudo}>
              <span className={styles.badge} style={{ background: `var(--cor-${noticia.categoria})` }}>
                {NOMES_CATEGORIAS[noticia.categoria]}
              </span>
              <h2 className={styles.tituloNoticia}>{noticia.titulo}</h2>
              <p className={styles.autor}>{noticia.autor}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
