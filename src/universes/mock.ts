import type { Work } from "./types";

// Dados de exemplo: nada aqui é trabalho real do tatuador (DECISIONS D-35).
const REGIONS = ["Antebraço", "Costas", "Coxa", "Ombro", "Panturrilha", "Peito"];
const SIZES = ["Médio", "Grande", "Pequeno", "Grande", "Médio", "Médio"];
const SESSIONS = ["1 sessão", "2 sessões", "1 sessão", "3 sessões", "2 sessões", "1 sessão"];

export function mockWorks(slug: string, label: string, items: [title: string, note: string][]): Work[] {
  return items.map(([title, note], i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${slug}-${n}`,
      title,
      note,
      meta: { region: REGIONS[i % 6], size: SIZES[i % 6], sessions: SESSIONS[i % 6] },
      image: { alt: `Arte provisória (placeholder) ${n} do universo ${label}: ${note}` },
    };
  });
}

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
