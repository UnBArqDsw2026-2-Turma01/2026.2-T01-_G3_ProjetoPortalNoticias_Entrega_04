"use client";

import { useId } from "react";
import styles from "./CampoFormulario.module.css";

export interface OpcaoCampoFormulario {
  valor: string;
  rotulo: string;
}

export interface CampoFormularioProps {
  rotulo: string;
  nome: string;
  tipo: "texto" | "area" | "selecao";
  opcoes?: readonly OpcaoCampoFormulario[];
  valor: string;
  aoMudar: (valor: string) => void;
  erro?: string;
  obrigatorio?: boolean;
  placeholder?: string;
  dica?: string;
}

// Rótulo + campo + mensagem de erro, o padrão que se repete em todo o formulário de sugestão.
// useId liga o <label> ao campo mesmo com vários campos na mesma página (acessibilidade).
export function CampoFormulario({
  rotulo,
  nome,
  tipo,
  opcoes = [],
  valor,
  aoMudar,
  erro,
  obrigatorio,
  placeholder,
  dica,
}: CampoFormularioProps) {
  const id = useId();
  const idErro = `${id}-erro`;
  const idDica = `${id}-dica`;
  const descritoPor = [erro ? idErro : "", dica ? idDica : ""].filter(Boolean).join(" ") || undefined;

  const comuns = {
    id,
    name: nome,
    value: valor,
    required: obrigatorio,
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": descritoPor,
    className: `${styles.entrada} ${erro ? styles.comErro : ""}`,
  };

  return (
    <div className={styles.campo}>
      <label className={styles.rotulo} htmlFor={id}>
        {rotulo}
        {obrigatorio && (
          <span className={styles.asterisco} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {tipo === "area" && (
        <textarea
          {...comuns}
          rows={5}
          placeholder={placeholder}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
      )}

      {tipo === "texto" && (
        <input
          {...comuns}
          type="text"
          placeholder={placeholder}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
      )}

      {tipo === "selecao" && (
        <div className={styles.selecao}>
          <select {...comuns} data-vazio={valor === "" ? "" : undefined} onChange={(evento) => aoMudar(evento.target.value)}>
            <option value="">{placeholder ?? "Selecione uma opção"}</option>
            {opcoes.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.rotulo}
              </option>
            ))}
          </select>
          <svg className={styles.seta} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {dica && (
        <p id={idDica} className={styles.dica}>
          {dica}
        </p>
      )}

      {erro && (
        <p id={idErro} className={styles.erro} role="alert">
          {erro}
        </p>
      )}
    </div>
  );
}
