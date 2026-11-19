"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { repositorioNoticias } from "@/lib/repositorioNoticias";
import type { Noticia } from "@/types/noticia";
import styles from "./BarraBusca.module.css";

export interface BarraBuscaProps {
  placeholder?: string;
  valorInicial?: string;
}

/**
 * Barra de busca do tipo rede social (Instagram/TikTok).
 * - Fica sempre visível no topo da Home.
 * - À medida que o usuário digita, após um debounce de 300 ms, busca no
 *   repositório Noticias e mostra os resultados em um dropdown abaixo da barra.
 * - Cada resultado é um <Link> para a página da notícia.
 */
export function BarraBusca({ placeholder, valorInicial }: BarraBuscaProps) {
  const [valor, setValor] = useState(valorInicial ?? "");
  const [resultados, setResultados] = useState<Noticia[]>([]);
  const [abriResultados, setAbrirResultados] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const aoDigitar = useCallback(
    (evento: React.ChangeEvent<HTMLInputElement>) => {
      const termo = evento.target.value;
      setValor(termo);
      setAbrirResultados(termo.trim().length > 0);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (termo.trim() === "") {
          setResultados([]);
          return;
        }
        const encontrados = repositorioNoticias.buscar(termo);
        setResultados(encontrados);
      }, 300);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.barraBusca}>
        <input
          type="search"
          placeholder={placeholder ?? "Buscar conteúdos, notícias e assuntos"}
          value={valor}
          onChange={aoDigitar}
          autoComplete="off"
          spellCheck={false}
          className={styles.input}
        />
      </div>

      {abriResultados && resultados.length > 0 && (
        <div className={styles.resultados} role="listbox" aria-label="Resultados da busca">
          {resultados.map((noticia) => (
            <Link
              key={noticia.id}
              href={`/noticia/${noticia.id}`}
              className={styles.resultadoItem}
            >
              <Image
                src={caminhoPublico(noticia.imagemUrl)}
                alt=""
                className={styles.resultadoImagem}
                width={56}
                height={56}
                priority
              />
              <div className={styles.resultadoInfo}>
                <div className={styles.resultadoTitulo}>{noticia.titulo}</div>
                <div className={styles.resultadoResumo}>{noticia.resumo}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function caminhoPublico(caminho: string): string {
  if (/^(https?:)?\/\//.test(caminho)) return caminho;
  const comBarra = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return comBarra;
}
