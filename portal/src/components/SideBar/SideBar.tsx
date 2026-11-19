"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSessaoSimulada } from "@/hooks/useSessaoSimulada";
import { caminhoPublico } from "@/lib/caminhos";
import { NOMES_CATEGORIAS, type Categoria } from "@/types/noticia";
import { ICONES_CATEGORIA, ITENS_MENU, itemAtivoPelaRota, type IdItemMenu } from "./itensMenu";
import styles from "./SideBar.module.css";

export interface SideBarProps {
  /** Força o item destacado (as 4 variantes do Figma). Sem ela, o item vem da URL atual. */
  itemAtivo?: IdItemMenu;
  /** Força o estado de login. Sem ela, usa o login simulado (useSessaoSimulada). */
  logado?: boolean;
  /** Categorias de "Meus Conteúdos" (só aparecem logado). Sem ela, usa as do usuário de exemplo. */
  categoriasSeguidas?: readonly Categoria[];
}

// Barra lateral presente em todas as telas do Figma ("Side Bar", node 115:68).
// Variantes do componente "Menu de Opções SideBar" (node 46:573): Padrão, 2, 3 e 4 = item ativo
// Início, Explorar, Salvos e Sugerir Publicação.
export function SideBar({ itemAtivo, logado, categoriasSeguidas }: SideBarProps) {
  const pathname = usePathname();
  const sessao = useSessaoSimulada();

  const ativo = itemAtivo ?? itemAtivoPelaRota(pathname);
  const estaLogado = logado ?? sessao.logado;
  const categorias = categoriasSeguidas ?? sessao.usuario?.categoriasSeguidas ?? [];

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logo} aria-label="Burburinho: página inicial">
        <Image src={caminhoPublico("/logos/burburinho.svg")} alt="Burburinho" width={296} height={191} priority />
      </Link>

      <nav aria-label="Menu principal">
        <ul className={styles.menu}>
          {ITENS_MENU.map((item) => {
            const estaAtivo = item.id === ativo;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={estaAtivo ? `${styles.item} ${styles.itemAtivo}` : styles.item}
                  aria-current={estaAtivo ? "page" : undefined}
                >
                  <span className={styles.icone}>
                    <Image src={caminhoPublico(item.icone.src)} alt="" width={item.icone.largura} height={item.icone.altura} />
                  </span>
                  <span className={styles.rotulo}>{item.rotulo}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {estaLogado && (
        <section className={styles.meusConteudos} aria-labelledby="sidebar-meus-conteudos">
          <h2 id="sidebar-meus-conteudos" className={styles.tituloSecao}>
            Meus Conteúdos
          </h2>
          <ul className={styles.categorias}>
            {categorias.map((categoria) => {
              const icone = ICONES_CATEGORIA[categoria];
              return (
                <li key={categoria}>
                  <Link href={`/categoria/${categoria}`} className={styles.categoria}>
                    <span className={styles.circulo} style={{ background: `var(--cor-${categoria})` }}>
                      <Image src={caminhoPublico(icone.src)} alt="" width={icone.largura} height={icone.altura} />
                    </span>
                    {NOMES_CATEGORIAS[categoria]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/explorar" className={styles.verTodos}>
            Ver todos
          </Link>
        </section>
      )}
    </aside>
  );
}
