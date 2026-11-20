import type { Universe } from "../types";
import { realWorks } from "../mock";

export const realismo: Universe = {
  slug: "realismo",
  name: "Realismo",
  order: 4,
  kicker: "Luz, sombra e textura de fotografia.",
  description:
    "Texto de exemplo. Aqui entram retratos, animais e cenas em preto e cinza, com gradiente suave e leitura fotográfica.",
  info: [
    { title: "Foto de referência", text: "Texto de exemplo: boa luz e boa resolução mudam o resultado." },
    { title: "Sombreado", text: "Texto de exemplo: o degradê suave pede sessões mais longas." },
    { title: "Posicionamento", text: "Texto de exemplo: a anatomia guia o enquadramento." },
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
