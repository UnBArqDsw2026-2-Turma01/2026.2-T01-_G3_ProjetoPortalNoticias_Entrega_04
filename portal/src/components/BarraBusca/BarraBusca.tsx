"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
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
 *   repositorioNoticias e mostra os resultados em um dropdown abaixo da barra.
 * - Não navega para outra página: clicar em um resultado abre a notícia.
 */
export function BarraBusca({ placeholder, valorInicial }: BarraBuscaProps) {
  const [valor, setValor] = useState(valorInicial ?? "");
  const [resultados, setResultados] = useState<Noticia[]>([]);
  const [abrirResultados, setAbrirResultados] = useState(false);
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

  // Fecha o dropdown e cancela busca pendente ao desmontar.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const aoSelecionar = useCallback((id: string) => {
    setValor("");
    setResultados([]);
    setAbrirResultados(false);
    window.location.href = `/noticia/${id}`;
  }, []);

  const aoCliqueFora = useCallback(() => {
    setAbrirResultados(false);
  }, []);

  return (
    <div className={styles.wrapper} onClick={aoCliqueFora}>
      <div className={styles.barraBusca} onClick={(e) => e.stopPropagation()}>
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

      {abrirResultados && resultados.length > 0 && (
        <div className={styles.resultados} role="listbox" aria-label="Resultados da busca">
          {resultados.map((noticia) => (
            <div
              key={noticia.id}
              className={styles.resultadoItem}
              onClick={(e) => {
                e.stopPropagation();
                aoSelecionar(noticia.id);
              }}
            >
              <img
                src={noticia.imagemUrl}
                alt=""
                className={styles.resultadoImagem}
              />
              <div className={styles.resultadoInfo}>
                <div className={styles.resultadoTitulo}>{noticia.titulo}</div>
                <div className={styles.resultadoResumo}>{noticia.resumo}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}