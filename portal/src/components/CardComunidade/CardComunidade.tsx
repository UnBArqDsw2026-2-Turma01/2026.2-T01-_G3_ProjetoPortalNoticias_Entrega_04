import Image from "next/image";
import Link from "next/link";
import { BotaoSeguir } from "@/components/BotaoSeguir";
import { caminhoPublico } from "@/lib/caminhos";
import type { FabricaCategoria } from "@/padroes/fabricaCategorias";
import styles from "./CardComunidade.module.css";

export interface CardComunidadeProps {
  fabrica: FabricaCategoria;
}

// Card do Explorar (Figma 143:443): mesma fábrica e mesmo BotaoSeguir da PaginaCategoria.
export function CardComunidade({ fabrica }: CardComunidadeProps) {
  const tema = fabrica.criarTema();
  const apresentacao = fabrica.criarApresentacao();
  const categoria = tema.categoria;

  return (
    <article className={styles.card} style={tema.estilo()}>
      <span className={styles.circulo}>
        <Image
          src={caminhoPublico(tema.icone.src)}
          alt=""
          width={Math.round(tema.icone.largura * 2)}
          height={Math.round(tema.icone.altura * 2)}
        />
      </span>

      <div className={styles.texto}>
        <h2 className={styles.nome}>
          <Link href={`/categoria/${categoria}`} className={styles.link}>
            {apresentacao.nome}
          </Link>
        </h2>
        <p className={styles.membros}>{apresentacao.membros}</p>
        <p className={styles.descricao}>{apresentacao.descricao}</p>
      </div>

      <div className={styles.acao}>
        <BotaoSeguir categoria={categoria} rotuloSeguir="Juntar-se" convite="preenchido" />
      </div>
    </article>
  );
}
