"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BadgeCategoria } from "@/components/BadgeCategoria";
import { BotaoAcao } from "@/components/BotaoAcao";
import { DataPublicacao } from "@/components/DataPublicacao";
import { IconeCompartilhar, IconeSalvar, IconeVoltar } from "@/components/IconesAcao";
import { caminhoPublico } from "@/lib/caminhos";
import { FabricaCategoria } from "@/padroes/fabricaCategorias";
import type { Noticia } from "@/types/noticia";
import styles from "./PaginaNoticia.module.css";

export interface PaginaNoticiaProps {
  noticia: Noticia;
}

// Página /noticia/[id] (Figma 15:1725 e 280:1053). O texto vem pronto do repositório;
// esta parte é cliente só por causa das ações Voltar, Compartilhar e Salvar.
export function PaginaNoticia({ noticia }: PaginaNoticiaProps) {
  const router = useRouter();
  const [salvo, setSalvo] = useState(false);
  const [aviso, setAviso] = useState("");
  const tema = FabricaCategoria.para(noticia.categoria).criarTema();

  function voltar() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  async function compartilhar() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: noticia.titulo, text: noticia.resumo, url });
        return;
      } catch (erro) {
        // Fechar o menu de compartilhamento não é erro; os outros casos caem no copiar.
        if (erro instanceof DOMException && erro.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setAviso("Link copiado para a área de transferência.");
    } catch {
      setAviso("Não foi possível copiar o link. Use a barra de endereços do navegador.");
    }
  }

  // A vaga 5 troca este estado local pelo useSalvos, que persiste no localStorage.
  function alternarSalvo() {
    setSalvo((valorAtual) => !valorAtual);
    setAviso(salvo ? "Notícia removida dos salvos." : "Notícia salva.");
  }

  const primeiroParagrafo = noticia.conteudo[0] ?? "";

  return (
    <article className={styles.pagina} style={tema.estilo()}>
      <BotaoAcao rotulo="Voltar" icone={<IconeVoltar />} onClick={voltar} />

      <header className={styles.cabecalho}>
        <BadgeCategoria categoria={noticia.categoria} />
        <h1 className={styles.titulo}>{noticia.titulo}</h1>

        <div className={styles.meta}>
          <div className={styles.autor}>
            <span className={styles.avatar} aria-hidden="true">
              {noticia.autor.charAt(0).toUpperCase()}
            </span>
            <div className={styles.identificacao}>
              <span className={styles.nome}>Por {noticia.autor}</span>
              <DataPublicacao iso={noticia.publicadaEm} className={styles.data} />
            </div>
          </div>

          <div className={styles.acoes}>
            <BotaoAcao rotulo="Compartilhar" icone={<IconeCompartilhar />} onClick={compartilhar} />
            <BotaoAcao
              rotulo={salvo ? "Salvo" : "Salvar"}
              icone={<IconeSalvar preenchido={salvo} />}
              ativo={salvo}
              onClick={alternarSalvo}
            />
          </div>
        </div>
      </header>

      {aviso && (
        <p className={styles.aviso} role="status" aria-live="polite">
          {aviso}
        </p>
      )}

      <div className={styles.imagem}>
        <Image
          src={caminhoPublico(noticia.imagemUrl)}
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 1008px"
        />
      </div>

      <div className={styles.corpo}>
        {noticia.conteudo.map((paragrafo, indice) =>
          indice === 0 ? (
            <p key={indice} className={styles.paragrafo}>
              <span className={styles.capitular}>{primeiroParagrafo.charAt(0)}</span>
              {primeiroParagrafo.slice(1)}
            </p>
          ) : (
            <p key={indice} className={styles.paragrafo}>
              {paragrafo}
            </p>
          ),
        )}
      </div>
    </article>
  );
}
