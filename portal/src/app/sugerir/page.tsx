import type { Metadata } from "next";
import { PaginaSugerir } from "@/components/PaginaSugerir";

export const metadata: Metadata = {
  title: "Sugerir Publicação · Burburinho",
  description: "Envie uma notícia para a redação do Burburinho revisar e publicar.",
};

export default function Sugerir() {
  return <PaginaSugerir />;
}
