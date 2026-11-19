import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaNoticia } from "@/components/PaginaNoticia";
import { repositorioNoticias } from "@/lib/repositorioNoticias";

// O export estático precisa das duas declarações: dynamicParams = false impede rotas fora
// da lista e generateStaticParams gera um HTML por notícia do repositório.
export const dynamicParams = false;

export function generateStaticParams() {
  return repositorioNoticias.listarTodas().map((noticia) => ({ id: noticia.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const noticia = repositorioNoticias.buscarPorId(id);
  if (!noticia) return { title: "Notícia · Burburinho" };
  return { title: `${noticia.titulo} · Burburinho`, description: noticia.resumo };
}

export default async function Noticia({ params }: Props) {
  const { id } = await params;
  const noticia = repositorioNoticias.buscarPorId(id);
  if (!noticia) notFound();

  return <PaginaNoticia noticia={noticia} />;
}
