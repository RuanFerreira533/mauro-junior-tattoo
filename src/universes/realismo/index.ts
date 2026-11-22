import type { Universe } from "../types";
import { realWorks } from "../mock";

export const realismo: Universe = {
  slug: "realismo",
  name: "Realismo",
  order: 4,
  kicker: "Luz, sombra e textura de fotografia.",
  description:
    "Retratos, animais e cenas em preto e cinza, com luz e sombra suaves para a tatuagem parecer uma fotografia.",
  info: [
    { title: "Foto de referência", text: "Uma foto nítida e bem iluminada muda completamente o resultado." },
    { title: "Sombreado", text: "O degradê suave leva mais tempo e costuma pedir sessões mais longas." },
    { title: "Posicionamento", text: "A anatomia guia o enquadramento para a imagem acompanhar o corpo." },
  ],
  cta: { label: "Pedir orçamento Realismo", hint: "Mencione o universo Realismo na mensagem." },
  portal: { art: "/universos/realismo/portal.png" },
  mock: true,
  works: realWorks("realismo", "Realismo", [
    "C-Oji_lphBU",
    "C0MgTO7Lqk0",
    "C88EKChJRkF",
    "C8egNl4xett",
    "CtkTeS1JXZg",
    "CuMvkn5LJq1",
    "CwXhlT_rE5O",
    "CyI_Sz0rbML",
    "CylevvQu0mw",
    "DCDG8xqpBLk",
    "Dfw0r66O6Nr",
  ]),
};
