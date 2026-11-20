import type { Universe } from "../types";
import { realWorks } from "../mock";

export const blackwork: Universe = {
  slug: "blackwork",
  name: "Blackwork",
  order: 3,
  kicker: "Preto sólido, geometria e peso.",
  description:
    "Texto de exemplo. Aqui entram grandes massas de preto, geometria sagrada, dotwork e composições gráficas de alto contraste.",
  info: [
    { title: "Massa de preto", text: "Texto de exemplo: o preto sólido pede planejamento da pele e do espaço." },
    { title: "Geometria", text: "Texto de exemplo: simetria e proporção guiam o desenho." },
    { title: "Cicatrização", text: "Texto de exemplo: áreas grandes de preto pedem cuidado específico." },
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
