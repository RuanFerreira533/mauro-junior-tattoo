"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { universes } from "@/universes";
import { useStage } from "@/components/stage/StageProvider";

/** Navegação constante: voltar ao hub, trocar de universo direto (D-07) e chegar ao orçamento. */
export function UniverseNav({ slug }: { slug: string }) {
  const { enter } = useStage();

  function go(e: MouseEvent<HTMLAnchorElement>, target: string) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (target === slug) return;
    const r = e.currentTarget.getBoundingClientRect();
    enter(target, e.detail === 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: e.clientX, y: e.clientY });
  }

  return (
    <header className="unav">
      <Link className="unav__brand" href="/">
        Mauro Junior
      </Link>
      <Link className="unav__back" href="/">
        ← Universos
      </Link>
      <nav className="unav__nav" aria-label="Trocar de universo">
        <ul className="unav__switch">
          {universes.map((u) => (
            <li key={u.slug}>
              <a
                href={`/${u.slug}`}
                aria-current={u.slug === slug ? "page" : undefined}
                onClick={(e) => go(e, u.slug)}
              >
                {u.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="btn" href="#orcamento">
        Orçamento
      </a>
    </header>
  );
}
