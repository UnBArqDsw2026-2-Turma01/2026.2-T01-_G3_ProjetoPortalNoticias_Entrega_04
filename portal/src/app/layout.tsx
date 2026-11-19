import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "@/components/AppLayout";
import "./globals.css";

// Fonte do protótipo (Inter). A variável --fonte-inter é usada por --fonte-base em globals.css.
const inter = Inter({
  variable: "--fonte-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Burburinho: Portal de Notícias",
  description: "Portal de notícias com conteúdo jornalístico e contribuições dos leitores (Grupo 3, Arquitetura e Desenho de Software).",
};

// Layout raiz: o Next chama este componente e encaixa cada página em {children}.
// O AppLayout (vaga 2) coloca a SideBar em todas as rotas, sem nenhuma page.tsx importá-la.
// Próximo passo (vaga 6): envolver o <AppLayout> com <ThemeProvider>.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
