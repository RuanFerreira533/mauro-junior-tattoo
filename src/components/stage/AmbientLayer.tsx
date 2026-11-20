"use client";

import { useEffect, useRef } from "react";
import { universes } from "@/universes";
import { ui } from "@/universes/ui";
import { HubAmbient } from "./HubAmbient";

/**
 * Atmosfera de fundo: uma camada por universo, sempre montada, com cross-fade por opacidade.
 * Camadas fora de tema ficam pausadas (animation-play-state) e invisíveis.
 * Parallax: só ponteiro fino e sem reduced motion; escreve --px/--py (−1..1) em rAF.
 */
export function AmbientLayer({ theme, scope = "page" }: { theme: string | null; scope?: "page" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      ref.current?.style.setProperty("--px", x.toFixed(3));
      ref.current?.style.setProperty("--py", y.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      x = (e.clientX / window.innerWidth) * 2 - 1;
      y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={scope === "section" ? "ambient ambient--section" : "ambient"} ref={ref} aria-hidden="true">
      {scope === "page" && (
        <div className="amb" data-u="hub" data-on={theme === null}>
          <HubAmbient />
        </div>
      )}
      {universes.map((u) => {
        const { Ambient } = ui[u.slug];
        return (
          <div className="amb" key={u.slug} data-u={u.slug} data-on={theme === u.slug}>
            <Ambient on={theme === u.slug} />
          </div>
        );
      })}
    </div>
  );
}
