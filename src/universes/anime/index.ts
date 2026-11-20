import type { Universe } from "../types";
import { realWorks } from "../mock";

export const anime: Universe = {
  slug: "anime",
  name: "Anime",
  order: 1,
  kicker: "Cor, energia e linhas de impacto.",
  description:
    "Texto de exemplo. Aqui entram personagens, cenas e referências de animação, com cor chapada, contorno forte e muito movimento.",
  info: [
    { title: "Referências", text: "Texto de exemplo: envie o personagem ou a cena que você tem em mente." },
    { title: "Cor e contorno", text: "Texto de exemplo: o estilo pede contorno firme e cor com intenção." },
    { title: "Tamanho", text: "Texto de exemplo: o detalhe define o tamanho mínimo ideal." },
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
