"use client";

import { caminhoPublico } from "@/lib/caminhos";
import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Tema = "claro" | "escuro";
export type Fonte = "normal" | "grande" | "muito-grande";
export interface PreferenciasTema {
  tema: Tema;
  fonte: Fonte;
  altoContraste: boolean;
  reduzirAnimacoes: boolean;
  cursorMaior: boolean;
  dicasFerramenta: boolean;
  inverterCores: boolean;
  brilhoReduzido: boolean;
  semSaturacao: boolean;
  guiaLeitura: boolean;
  destacarLinks: boolean;

}

interface ContextoTema extends PreferenciasTema {
  definirCursorMaior: (ativo: boolean) => void;
  definirDicasFerramenta: (ativo: boolean) => void;
  definirInverterCores: (ativo: boolean) => void;
  definirBrilhoReduzido: (ativo: boolean) => void;
  definirSemSaturacao: (ativo: boolean) => void;
  definirGuiaLeitura: (ativo: boolean) => void;
  definirDestacarLinks: (ativo: boolean) => void;
  redefinir: () => void;
  definirTema: (tema: Tema) => void;
  definirFonte: (fonte: Fonte) => void;
  definirAltoContraste: (ativo: boolean) => void;
  definirReduzirAnimacoes: (ativo: boolean) => void;
}

export const TemaContext = createContext<ContextoTema | undefined>(undefined);
const CHAVE = "burburinho:preferencias";
const PADRAO: PreferenciasTema = {
  tema: "claro", fonte: "normal", altoContraste: false, reduzirAnimacoes: false, cursorMaior: false, dicasFerramenta: false,
  inverterCores: false, brilhoReduzido: false, semSaturacao: false, guiaLeitura: false, destacarLinks: false,
};

export function ThemeProvider({ children, temaInicial }: { children: ReactNode; temaInicial?: Tema }) {
  const [preferencias, setPreferencias] = useState(PADRAO);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const inicial = { ...PADRAO };
    inicial.tema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
    try {
      const salvo = JSON.parse(window.localStorage.getItem(CHAVE) ?? "null");
      if (salvo && typeof salvo === "object") {
        if (salvo.tema === "claro" || salvo.tema === "escuro") inicial.tema = salvo.tema;
        if (["normal", "grande", "muito-grande"].includes(salvo.fonte)) inicial.fonte = salvo.fonte;
        if (typeof salvo.altoContraste === "boolean") inicial.altoContraste = salvo.altoContraste;
        if (typeof salvo.inverterCores === "boolean") inicial.inverterCores = salvo.inverterCores;
        if (typeof salvo.brilhoReduzido === "boolean") inicial.brilhoReduzido = salvo.brilhoReduzido;
        if (typeof salvo.semSaturacao === "boolean") inicial.semSaturacao = salvo.semSaturacao;
        if (typeof salvo.guiaLeitura === "boolean") inicial.guiaLeitura = salvo.guiaLeitura;
        if (typeof salvo.destacarLinks === "boolean") inicial.destacarLinks = salvo.destacarLinks;
        if (typeof salvo.cursorMaior === "boolean") inicial.cursorMaior = salvo.cursorMaior;
        if (typeof salvo.dicasFerramenta === "boolean") inicial.dicasFerramenta = salvo.dicasFerramenta;
        if (typeof salvo.reduzirAnimacoes === "boolean") inicial.reduzirAnimacoes = salvo.reduzirAnimacoes;
      }
    } catch {
      // Armazenamento indisponível ou inválido: mantém as preferências padrão.
    }
    if (temaInicial !== undefined) inicial.tema = temaInicial;
    // A leitura inicial depende das APIs do navegador e ocorre apenas após a hidratação.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferencias(inicial);
    setCarregado(true);
  }, [temaInicial]);

  useEffect(() => {
    if (!carregado) return;
    const html = document.documentElement;
    html.dataset.tema = preferencias.tema;
    html.style.setProperty("--cursor-acessivel", `url("${caminhoPublico("/icones/acessibilidade/cursor-maior.svg")}") 4 3, auto`);
    html.dataset.cursor = preferencias.cursorMaior ? "grande" : "normal";
    html.dataset.dicas = preferencias.dicasFerramenta ? "ativas" : "inativas";
    html.dataset.inversao = preferencias.inverterCores ? "ativo" : "inativo";
    html.dataset.brilho = preferencias.brilhoReduzido ? "ativo" : "inativo";
    html.dataset.saturacao = preferencias.semSaturacao ? "ativo" : "inativo";
    html.dataset.guia = preferencias.guiaLeitura ? "ativo" : "inativo";
    html.dataset.links = preferencias.destacarLinks ? "ativo" : "inativo";
    html.dataset.fonte = preferencias.fonte;
    html.dataset.contraste = preferencias.altoContraste ? "alto" : "normal";
    html.dataset.animacoes = preferencias.reduzirAnimacoes ? "reduzidas" : "normais";
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch {
      // As escolhas continuam funcionando nesta sessão sem localStorage.
    }
  }, [preferencias, carregado]);

  useEffect(() => {
    if (!preferencias.guiaLeitura) return;
    const mover = (evento: PointerEvent) => document.documentElement.style.setProperty("--posicao-guia", `${evento.clientY}px`);
    window.addEventListener("pointermove", mover);
    return () => window.removeEventListener("pointermove", mover);
  }, [preferencias.guiaLeitura]);

  const valor = useMemo<ContextoTema>(() => ({
    ...preferencias,
    definirInverterCores: (inverterCores) => setPreferencias((atual) => ({ ...atual, inverterCores })),
    definirBrilhoReduzido: (brilhoReduzido) => setPreferencias((atual) => ({ ...atual, brilhoReduzido })),
    definirSemSaturacao: (semSaturacao) => setPreferencias((atual) => ({ ...atual, semSaturacao })),
    definirGuiaLeitura: (guiaLeitura) => setPreferencias((atual) => ({ ...atual, guiaLeitura })),
    definirDestacarLinks: (destacarLinks) => setPreferencias((atual) => ({ ...atual, destacarLinks })),
    redefinir: () => setPreferencias({ ...PADRAO, tema: window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro" }),
    definirCursorMaior: (cursorMaior) => setPreferencias((atual) => ({ ...atual, cursorMaior })),
    definirDicasFerramenta: (dicasFerramenta) => setPreferencias((atual) => ({ ...atual, dicasFerramenta })),
    definirTema: (tema) => setPreferencias((atual) => ({ ...atual, tema })),
    definirFonte: (fonte) => setPreferencias((atual) => ({ ...atual, fonte })),
    definirAltoContraste: (altoContraste) => setPreferencias((atual) => ({ ...atual, altoContraste })),
    definirReduzirAnimacoes: (reduzirAnimacoes) => setPreferencias((atual) => ({ ...atual, reduzirAnimacoes })),
  }), [preferencias]);

  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}
