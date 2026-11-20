import type { Metadata } from "next";
import { Inter, League_Gothic, League_Spartan } from "next/font/google";
import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import "./globals.css";

// Fonte do protótipo (Inter). A variável --fonte-inter é usada por --fonte-base em globals.css.
const inter = Inter({
  variable: "--fonte-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const leagueGothic = League_Gothic({ variable: "--fonte-league-gothic", subsets: ["latin"], weight: "400" });
const leagueSpartan = League_Spartan({ variable: "--fonte-league-spartan", subsets: ["latin"], weight: "600" });

const leagueSpartan = League_Spartan({
  variable: "--fonte-league-spartan",
  subsets: ["latin"],
  weight: "600",
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
    <html lang="pt-BR" className={`${inter.variable} ${leagueGothic.variable} ${leagueSpartan.variable}`}>
      <body>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
