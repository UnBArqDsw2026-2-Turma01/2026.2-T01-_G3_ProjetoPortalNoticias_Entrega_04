import type { ReactNode } from "react";
import { SideBar } from "@/components/SideBar";
import styles from "./AppLayout.module.css";

export interface AppLayoutProps {
  /** A página atual. O Next encaixa cada page.tsx aqui pelo layout.tsx raiz. */
  children: ReactNode;
}

// Estrutura comum a todas as telas do Figma: SideBar à esquerda e o conteúdo à direita.
// Reutilização por COMPOSIÇÃO: o AppLayout não sabe qual página vai receber; quem decide é o
// framework (layout.tsx), e nenhuma page.tsx precisa importar a SideBar.
// É um Server Component: só a SideBar (que lê a URL) roda no navegador.
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.lateral}>
        <SideBar />
      </div>
      <main className={styles.conteudo}>{children}</main>
    </div>
  );
}
