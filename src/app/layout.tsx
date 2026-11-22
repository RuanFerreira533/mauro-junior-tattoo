import type { Metadata, Viewport } from "next";
import { fontVars } from "@/universes/fonts";
import { StageProvider } from "@/components/stage/StageProvider";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Mauro Junior · Tatuador em Santa Isabel, SP",
  description:
    "Tatuador em Santa Isabel, SP. Escolha um estilo (Anime, Fine Line, Blackwork, Realismo), veja os trabalhos e peça seu orçamento pelo WhatsApp.",
  openGraph: { title: "Mauro Junior · Tatuador", description: "Arte que fica pra sempre. Veja os trabalhos e peça seu orçamento.", locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVars}>
      <body>
        <StageProvider>{children}</StageProvider>
      </body>
    </html>
  );
}
