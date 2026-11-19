import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaCategoria } from "@/components/PaginaCategoria";
import { ehCategoria, FabricaCategoria } from "@/padroes/fabricaCategorias";
import { CATEGORIAS, NOMES_CATEGORIAS } from "@/types/noticia";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIAS.map((categoria) => ({ categoria }));
}

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  return { title: ehCategoria(categoria) ? `${NOMES_CATEGORIAS[categoria]} · Burburinho` : "Burburinho" };
}

export default async function Categoria({ params }: Props) {
  const { categoria } = await params;
  if (!ehCategoria(categoria)) notFound();

  return <PaginaCategoria fabrica={FabricaCategoria.para(categoria)} />;
}
