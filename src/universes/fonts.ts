import { Bangers, M_PLUS_Rounded_1c, Oswald, Bebas_Neue, Cinzel, Space_Mono, Cormorant_Garamond, Inter } from "next/font/google";

// Provisórias (D-36). preload:false => o arquivo só baixa quando o universo é usado (hover/foco).
const animeDisplay = Bangers({ subsets: ["latin"], preload: false, display: "swap", weight: "400", variable: "--f-anime-display" });
const animeBody = M_PLUS_Rounded_1c({ subsets: ["latin"], preload: false, display: "swap", weight: ["400", "700"], variable: "--f-anime-body" });
const blackDisplay = Bebas_Neue({ subsets: ["latin"], preload: false, display: "swap", weight: "400", variable: "--f-blackwork-display" });
const fineDisplay = Cinzel({ subsets: ["latin"], preload: false, display: "swap", weight: ["400", "600"], variable: "--f-fineline-display" });
// Coberturas ainda não existe como universo; a fonte já fica pronta (Oswald Bold).
const coverDisplay = Oswald({ subsets: ["latin"], preload: false, display: "swap", weight: "700", variable: "--f-coberturas-display" });
const blackBody = Space_Mono({ subsets: ["latin"], preload: false, display: "swap", weight: ["400", "700"], variable: "--f-blackwork-body" });
const realDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  preload: false,
  display: "swap",
  weight: ["300", "500"],
  style: ["normal", "italic"],
  variable: "--f-realismo-display",
});
// Inter: fonte da marca (hero, menu, rodapé). Variável (100–900); título usa 900.
const base = Inter({ subsets: ["latin"], display: "swap", variable: "--f-base" });
const realBody = Inter({ subsets: ["latin"], preload: false, display: "swap", variable: "--f-realismo-body" });

export const fontVars = [base, fineDisplay, coverDisplay, animeDisplay, animeBody, blackDisplay, blackBody, realDisplay, realBody]
  .map((f) => f.variable)
  .join(" ");
