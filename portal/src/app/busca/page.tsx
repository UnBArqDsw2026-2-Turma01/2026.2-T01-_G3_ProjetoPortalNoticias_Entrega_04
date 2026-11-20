"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import { PostCard } from "@/components/PostCard";
import type { Noticia } from "@/types/noticia";
import styles from "./page.module.css";

// Conteúdo da busca (Client Component que lê `?q=` com useSearchParams).
function ConteudoBusca() {
  const searchParams = useSearchParams();
  const termo = searchParams.get("q") ?? "";

  // Computa os resultados a partir do termo (sem useEffect: é derivado direto dos props/params).
  const resultados: Noticia[] = useMemo(() => {
    if (!termo.trim()) return [];
    return repositorioNoticias.buscar(termo);
  }, [termo]);

  return (
    <div className={styles.pagina}>
      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>
          Resultados para “{termo}”
        </h1>
        <span className={styles.contagem}>
          {resultados.length} publicação{resultados.length !== 1 ? "s" : ""}
        </span>
      </header>

      {resultados.length === 0 && termo.trim() !== "" ? (
        <div className={styles.vazio}>
          <p>Nenhuma publicação encontrada para “{termo}”.</p>
        </div>
      ) : (
        <ul className={styles.lista}>
          {resultados.map((noticia) => (
            <li key={noticia.id}>
              <PostCard noticia={noticia} variante="horizontal" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Página de busca envolta em <Suspense> para usar useSearchParams (Next.js export estático).
export default function Busca() {
  return (
    <Suspense fallback={<div className={styles.pagina}>Carregando busca...</div>}>
      <ConteudoBusca />
    </Suspense>
  );
}