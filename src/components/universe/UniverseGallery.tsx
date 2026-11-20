"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Universe } from "@/universes/types";
import { ui } from "@/universes/ui";
import { SqueezeCarousel, type SqueezeSlide } from "./SqueezeCarousel";

// O visualizador só baixa quando a primeira obra é aberta.
const ProjectViewer = dynamic(() => import("./ProjectViewer"));

/**
 * Seção de trabalhos de TODOS os universos: carrossel "squeeze" (D-54). O visual de cada universo vem dos tokens
 * (cor de destaque, fonte, raio); o detalhe abre no visualizador compartilhado.
 */
export function UniverseGallery({ u }: { u: Universe }) {
  const [index, setIndex] = useState<number | null>(null);
  const { Art } = ui[u.slug];
  const work = index === null ? null : u.works[index];

  const slides = useMemo<SqueezeSlide[]>(
    () =>
      u.works.map((w, i) => ({
        id: w.id,
        title: w.title + ".",
        description: w.note,
        label: `${w.title}: ${w.note}`,
        image: w.image.src,
        imageAlt: w.image.alt,
        art: <Art seed={w.id} />,
        overlay: (
          <>
            {u.name} · {String(i + 1).padStart(2, "0")}
          </>
        ),
        action: "Ver detalhes",
        onAction: () => setIndex(i),
      })),
    [u, Art],
  );

  return (
    <section id="trabalhos" className="gallery" aria-labelledby="trabalhos-titulo">
      <div className="sec-head">
        <h2 id="trabalhos-titulo" className="sec-title">
          Trabalhos
        </h2>
        {u.works.some((w) => !w.image.src) && <span className="mock-tag">imagens de exemplo</span>}
      </div>
      <SqueezeCarousel slides={slides} label={`Trabalhos do universo ${u.name}`} />
      {work && index !== null && (
        <ProjectViewer
          work={work}
          u={u}
          index={index}
          onClose={() => setIndex(null)}
          onStep={(dir) => setIndex((i) => (((i ?? 0) + dir + u.works.length) % u.works.length))}
        />
      )}
    </section>
  );
}
