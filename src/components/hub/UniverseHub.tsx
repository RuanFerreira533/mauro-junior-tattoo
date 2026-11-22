"use client";

import { useEffect, useRef, useState } from "react";
import { getUniverse, universes } from "@/universes";
import { useStage } from "@/components/stage/StageProvider";
import { AmbientLayer } from "@/components/stage/AmbientLayer";
import { useCanHover } from "@/lib/useCanHover";
import { Portal } from "./Portal";
import { HubHero } from "./HubHero";
import { HubFooter } from "./HubFooter";
import { HubAbout } from "./HubAbout";
import { HubContact } from "./HubContact";
import { HubReviews } from "./HubReviews";
import { HubFaq } from "./HubFaq";
import { HubLocal } from "./HubLocal";

/**
 * Home em três partes independentes:
 *  1. Hero: fixa, segue o mockup do usuário (não reage aos universos).
 *  2. Seção dos portais: ÚNICA parte que se transforma (tokens + atmosfera escopados em `data-theme`).
 *  3. Rodapé: fixo, com estilo próprio.
 */
export function UniverseHub() {
  const { preview, previewIntent, previewLeave } = useStage();
  const canHover = useCanHover();
  const list = useRef<HTMLUListElement>(null);
  const section = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const current = getUniverse(preview);

  // Sem hover: só vale quando a seção de portais está na tela (a hero fica sempre no estado base).
  useEffect(() => {
    const el = section.current;
    if (canHover || !el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [canHover]);

  // O card que cruza o centro do carrossel vira o preview (equivalente ao hover, D-39).
  useEffect(() => {
    const root = list.current;
    if (canHover || !root) return;
    if (!inView) {
      previewLeave();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) previewIntent((e.target as HTMLElement).dataset.slug!, true);
      },
      { root, rootMargin: "0px -45% 0px -45%", threshold: 0 },
    );
    root.querySelectorAll("li[data-slug]").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [canHover, inView, previewIntent, previewLeave]);

  return (
    <>
      <main id="conteudo" tabIndex={-1}>
        <HubHero />
        <HubAbout />

        <section
          id="estilos"
          className="hub__styles"
          ref={section}
          data-theme={preview ?? undefined}
          aria-labelledby="universos-titulo"
        >
          <AmbientLayer theme={preview} scope="section" />
          <div className="hub__styles-in">
            <h2 className="hub__pick" id="universos-titulo">
              Escolha seu universo.
            </h2>
            <p className="hub__line">{current ? current.kicker : "Cada estilo tem o seu mundo."}</p>

            <ul className="portals" ref={list}>
              {universes.map((u, i) => (
                <li key={u.slug} data-slug={u.slug}>
                  <Portal u={u} index={i} />
                </li>
              ))}
            </ul>

            {!canHover && <p className="hub__hint">Deslize para o lado e toque no portal centralizado para entrar.</p>}
          </div>
        </section>

        <HubContact />
        <HubReviews />
        <HubFaq />
        <HubLocal />
      </main>

      <HubFooter />
    </>
  );
}
