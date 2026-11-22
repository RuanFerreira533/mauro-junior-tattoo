import type { Universe } from "../types";
import { realWorks } from "../mock";

export const anime: Universe = {
  slug: "anime",
  name: "Anime",
  order: 1,
  kicker: "Cor, energia e linhas de impacto.",
  description:
    "Personagens e cenas de animação, mangá e games levados para a pele, com contorno firme e sombras que dão vida ao traço.",
  info: [
    { title: "Referência", text: "Mande o personagem ou a cena. Quanto melhor a referência, mais fiel fica o desenho." },
    { title: "Tamanho e detalhe", text: "Rostos e cenários cheios de detalhe pedem um tamanho que deixe o traço respirar." },
    { title: "Cicatrização", text: "Linhas firmes e áreas escuras pedem cuidado depois da sessão para o resultado durar." },
  ],
  cta: { label: "Pedir orçamento Anime", hint: "Mencione o universo Anime na mensagem." },
  portal: { art: "/universos/anime/portal.png", jp: "アニメ" },
  mock: true,
  works: realWorks("anime", "Anime", [
    "CqkvS1jOrSt",
    "CrlMfKALpIS",
    "Cx6XKh7p91X",
    "CyOnNeRJI_3",
    "DGqjfqjJnq9",
    "DHi9HQZRnuI",
    "DUeRLb5EiEQ",
    "Dd1XJOIOdwF",
  ]),
};
