import type { Work } from "./types";

/**
 * Obras reais (fotos do Instagram @maurojr_tattoo, baixadas em 2026-11-19), em public/universos/<slug>/works/<código>.jpg.
 * ATENÇÃO: falta confirmar a autorização de cada cliente para exibir a foto (D-19) antes de publicar.
 * Sem título/região/tamanho inventados: só o que se vê na foto.
 */
export function realWorks(slug: string, label: string, codes: string[]): Work[] {
  return codes.map((code, i) => ({
    id: `${slug}-${code}`,
    title: `${label} ${String(i + 1).padStart(2, "0")}`,
    note: "Trabalho do Mauro Junior",
    image: {
      src: `/universos/${slug}/works/${code}.jpg`,
      alt: `Tatuagem no estilo ${label}, feita pelo Mauro Junior`,
    },
  }));
}
