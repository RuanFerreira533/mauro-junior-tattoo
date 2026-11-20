"use client";

import { useEffect, useRef } from "react";
import type { Universe, Work } from "@/universes/types";
import { ui } from "@/universes/ui";
import { WorkArt } from "./WorkArt";

/** Detalhe da obra em <dialog> modal: Esc fecha, foco volta ao botão de origem (comportamento nativo). */
export default function ProjectViewer({
  work,
  u,
  index,
  onClose,
  onStep,
}: {
  work: Work;
  u: Universe;
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="viewer"
      aria-labelledby="viewer-titulo"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="viewer__box">
        <button type="button" className="viewer__close" onClick={() => ref.current?.close()} aria-label="Fechar">
          ×
        </button>
        <div className="viewer__art">
          <WorkArt work={work} Draw={ui[u.slug].Art} sizes="(max-width: 720px) 94vw, 520px" />
        </div>
        <div className="viewer__info">
          <p className="hero__kicker">
            {u.name} · {String(index + 1).padStart(2, "0")}/{String(u.works.length).padStart(2, "0")}
          </p>
          <h2 id="viewer-titulo">{work.title}</h2>
          <p>{work.note}</p>
          {work.meta && (
            <dl className="viewer__meta">
              <dt>Região</dt>
              <dd>{work.meta.region}</dd>
              <dt>Tamanho</dt>
              <dd>{work.meta.size}</dd>
              <dt>Sessões</dt>
              <dd>{work.meta.sessions}</dd>
            </dl>
          )}
          {!work.image.src && <span className="mock-tag">dados de exemplo</span>}
          <div className="viewer__nav">
            <button type="button" className="btn btn--ghost" onClick={() => onStep(-1)}>
              ← Anterior
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => onStep(1)}>
              Próxima →
            </button>
            <a
              className="btn"
              href="#orcamento"
              onClick={() => ref.current?.close()}
            >
              Pedir orçamento
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
