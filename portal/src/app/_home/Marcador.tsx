import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PaginaInicial.module.css";

// MARCADOR PROVISÓRIO: ocupa o lugar de um componente de outra vaga que ainda não está no main
// (combinado do cronograma, #10). Quando o componente entrar, a Home troca o marcador por ele
// e este arquivo é apagado.
export function Marcador({ componente, href, children }: { componente: string; href?: string; children?: ReactNode }) {
  return (
    <div className={styles.marcador} data-marcador={componente} title={`${componente}: componente de outra vaga, entra aqui`}>
      <span className={styles.marcadorRotulo}>{componente}</span>
      {children && (href ? <Link href={href}>{children}</Link> : <span>{children}</span>)}
    </div>
  );
}
