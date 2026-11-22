import type { Universe } from "../types";
import { realWorks } from "../mock";

export const fineline: Universe = {
  slug: "fineline",
  name: "Fine Line",
  order: 2,
  kicker: "Traço fino, delicado e cheio de respiro.",
  description:
    "Florais, letterings e composições delicadas em traço fino, com muito respiro entre as linhas.",
  info: [
    { title: "Traço fino", text: "Linhas delicadas pedem mão firme e uma boa região da pele para durar bonitas." },
    { title: "Tamanho", text: "Quanto mais detalhe, maior precisa ser o desenho para o traço não se perder com o tempo." },
    { title: "Retoque", text: "Traços muito finos podem pedir um retoque depois de cicatrizar. Isso é normal e faz parte." },
  ],
  cta: { label: "Pedir orçamento Fine Line", hint: "Mencione o universo Fine Line na mensagem." },
  portal: { art: "/universos/fineline/portal.png" },
  mock: true,
  works: realWorks("fineline", "Fine Line", [
    "C33Sl8-JDjF",
    "C5eWnUUpnFP",
    "CsBpqI2OanW",
    "CtaEuYHxOYK",
    "CuApOWhJdlE",
    "Cw8ZL1rpISJ",
    "CzBxE-GLSDi",
    "CzlZ-BJuS_d",
    "DMJYo_AS-EV",
  ]),
};
