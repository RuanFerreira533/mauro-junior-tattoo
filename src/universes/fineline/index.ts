import type { Universe } from "../types";
import { realWorks } from "../mock";

export const fineline: Universe = {
  slug: "fineline",
  name: "Fine Line",
  order: 2,
  kicker: "Traço fino, delicado e cheio de respiro.",
  description:
    "Texto de exemplo. Aqui entram florais, letterings e composições de linha única, com traço fino e muito espaço vazio.",
  info: [
    { title: "Traço fino", text: "Texto de exemplo: linhas delicadas pedem mão firme e boa região da pele." },
    { title: "Tamanho", text: "Texto de exemplo: o detalhe define o tamanho mínimo para o traço durar." },
    { title: "Retoque", text: "Texto de exemplo: traços finos podem pedir um retoque depois de cicatrizar." },
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
