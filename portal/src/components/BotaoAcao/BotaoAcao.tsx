import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./BotaoAcao.module.css";

export type VarianteBotaoAcao = "primario" | "secundario" | "texto";

export interface BotaoAcaoProps {
  rotulo: string;
  icone?: ReactNode;
  /** primario: ação principal (Enviar); secundario: contorno; texto: Voltar, Compartilhar e Salvar. */
  variante?: VarianteBotaoAcao;
  /** Estado de alternância, como o Salvar/Salvo. */
  ativo?: boolean;
  onClick?: () => void;
  /** Quando existe, o botão vira link (o Next aplica o basePath sozinho). */
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

// Um único botão para as ações de todas as telas. A aparência vem da variante e o
// comportamento, do elemento escolhido: <button> quando há onClick e <Link> quando há href.
export function BotaoAcao({
  rotulo,
  icone,
  variante = "texto",
  ativo,
  onClick,
  href,
  type = "button",
  className,
}: BotaoAcaoProps) {
  const classes = [styles.botao, styles[variante], ativo ? styles.ativo : "", className].filter(Boolean).join(" ");
  const conteudo = (
    <>
      {icone && (
        <span className={styles.icone} aria-hidden="true">
          {icone}
        </span>
      )}
      {rotulo}
    </>
  );

  if (href) {
    const externo = /^(https?:)?\/\//.test(href);
    if (externo) {
      return (
        <a className={classes} href={href} data-ativo={ativo ? "" : undefined}>
          {conteudo}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} data-ativo={ativo ? "" : undefined}>
        {conteudo}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-pressed={ativo === undefined ? undefined : ativo}
      data-ativo={ativo ? "" : undefined}
    >
      {conteudo}
    </button>
  );
}
