import type { Universe } from "../types";
import { realWorks } from "../mock";

export const blackwork: Universe = {
  slug: "blackwork",
  name: "Blackwork",
  order: 3,
  kicker: "Preto sólido, geometria e peso.",
  description:
    "Preto sólido, geometria, símbolos e composições de alto contraste, pensadas para ocupar a pele com peso e presença.",
  info: [
    { title: "Massa de preto", text: "O preto cheio pede planejamento do espaço e da pele antes de começar." },
    { title: "Geometria", text: "Simetria e proporção guiam o desenho, por isso cada medida conta." },
    { title: "Cicatrização", text: "Áreas grandes de preto pedem cuidado específico para cicatrizar de forma uniforme." },
  ],
  cta: { label: "Pedir orçamento Blackwork", hint: "Mencione o universo Blackwork na mensagem." },
  portal: { art: "/universos/blackwork/portal.png" },
  mock: true,
  works: realWorks("blackwork", "Blackwork", [
    "CsludvZLWD5",
    "CsysSa8LuAb",
    "CuiJV3IJqEh",
    "Cuo57ExrXhZ",
    "CvKuEd5spLU",
    "Cy3LE6TLiv4",
    "CzhIB4DJbhH",
    "DJXt3e3J3dx",
    "De-GxONR8oq",
  ]),
};
