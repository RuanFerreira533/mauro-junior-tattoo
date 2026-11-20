import type { Metadata, Viewport } from "next";
import { fontVars } from "@/universes/fonts";
import { StageProvider } from "@/components/stage/StageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mauro Junior · Tatuador",
  description: "Protótipo: site de universos do tatuador Mauro Junior (Santa Isabel-SP).",
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVars}>
      <body>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
        </noscript>
        <StageProvider>{children}</StageProvider>
      </body>
    </html>
  );
}
