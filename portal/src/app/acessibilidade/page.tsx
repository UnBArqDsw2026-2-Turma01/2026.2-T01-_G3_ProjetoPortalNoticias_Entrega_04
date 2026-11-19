"use client";

import Image from "next/image";
import { caminhoPublico } from "@/lib/caminhos";
import { ToggleModoEscuro } from "@/components/ToggleModoEscuro";
import { ControleAcessibilidade } from "@/components/ControleAcessibilidade/ControleAcessibilidade";
import { useTema } from "@/hooks/useTema";
import type { Fonte } from "@/contexts/ThemeProvider";
import styles from "./page.module.css";

const FONTES: Fonte[] = ["normal", "grande", "muito-grande"];
const ROTULOS = { normal: "Normal", grande: "Grande", "muito-grande": "Muito grande" };

export default function Acessibilidade() {
  const p = useTema();
  return (
    <div className={styles.pagina}>
      <header className={styles.banner}>
        <div className={styles.ilustracao}>
          <Image src={caminhoPublico("/acessibilidade/burburinho.svg")} alt="" width={531.988} height={330.314} priority />
        </div>
        <h1><span>Opções de</span>Acessibilidade</h1>
      </header>
      <div className={styles.conteudo}>
        <section aria-labelledby="conteudo-acessibilidade">
          <h2 id="conteudo-acessibilidade">Conteúdo</h2>
          <div className={styles.controles}>
            <ControleAcessibilidade rotulo="Texto Maior" nomeAcessivel={`Texto Maior: ${ROTULOS[p.fonte]}`} descricao="Alterna entre fonte normal, grande e muito grande." icone="texto" tipo="button" onClick={() => p.definirFonte(FONTES[(FONTES.indexOf(p.fonte) + 1) % FONTES.length])}>
              <span className={styles.niveis} aria-hidden="true">{FONTES.map((fonte) => <span key={fonte} data-ativo={p.fonte === fonte} />)}</span>
              <span className={styles.somenteLeitor} aria-live="polite">{ROTULOS[p.fonte]}</span>
            </ControleAcessibilidade>
            <ControleAcessibilidade rotulo="Cursor maior" descricao="Aumenta o ponteiro do mouse no portal." icone="cursor" ativo={p.cursorMaior} onClick={() => p.definirCursorMaior(!p.cursorMaior)} />
            <ControleAcessibilidade rotulo="Dicas de ferramenta" descricao="Exibe explicações ao focar ou apontar para os controles. Escape fecha a dica." icone="dicas" ativo={p.dicasFerramenta} onClick={() => p.definirDicasFerramenta(!p.dicasFerramenta)} />
            <ControleAcessibilidade rotulo="Reduzir animações" descricao="Desativa animações e transições do portal." ativo={p.reduzirAnimacoes} onClick={() => p.definirReduzirAnimacoes(!p.reduzirAnimacoes)} />
          </div>
        </section>
        <section aria-labelledby="cores-acessibilidade">
          <h2 id="cores-acessibilidade">Cores</h2>
          <div className={styles.controles}>
            <ToggleModoEscuro selecionar />
            <ControleAcessibilidade rotulo="Modo Claro" descricao="Aplica o tema claro." icone="brilho" tipo="button" ativo={p.tema === "claro"} onClick={() => p.definirTema("claro")} />
            
            <ControleAcessibilidade rotulo="Brilho" descricao="Reduz o brilho do portal para 80%. Não altera o brilho do dispositivo." icone="brilho" ativo={p.brilhoReduzido} onClick={() => p.definirBrilhoReduzido(!p.brilhoReduzido)} />
            <ControleAcessibilidade rotulo="Contraste" descricao="Usa preto, branco e amarelo para aumentar o contraste." icone="contraste" ativo={p.altoContraste} onClick={() => p.definirAltoContraste(!p.altoContraste)} />
            <ControleAcessibilidade rotulo="Saturação" descricao="Alterna entre as cores originais e tons de cinza." icone="saturacao" ativo={p.semSaturacao} onClick={() => p.definirSemSaturacao(!p.semSaturacao)} />
          </div>
        </section>
        <section aria-labelledby="navegacao-acessibilidade">
          <h2 id="navegacao-acessibilidade">Navegação</h2>
          <div className={styles.controles}>
            <ControleAcessibilidade rotulo="Guia de leitura" descricao="Mostra uma linha horizontal que acompanha o ponteiro." icone="guia" larguraIcone={38.5714} ativo={p.guiaLeitura} onClick={() => p.definirGuiaLeitura(!p.guiaLeitura)} />
            <ControleAcessibilidade rotulo="Destacar links" descricao="Adiciona sublinhado e contorno aos links do portal." icone="links" ativo={p.destacarLinks} onClick={() => p.definirDestacarLinks(!p.destacarLinks)} />
          </div>
        </section>
        <button type="button" className={styles.redefinir} onClick={p.redefinir}>REDEFINIR</button>
      </div>
    </div>
  );
}
