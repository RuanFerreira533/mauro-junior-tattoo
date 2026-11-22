"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/contact";

const CONTACT_URL = whatsappUrl("Oi, Mauro! Quero pedir um orçamento.");

// Mesma ordem em que as seções aparecem na página.
const LINKS = [
  { id: "sobre", label: "Sobre" },
  { id: "estilos", label: "Estilos" },
  { id: "contato", label: "Contato" },
  { id: "perguntas", label: "Perguntas" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "local", label: "Local" },
];

/**
 * Menu fixo do topo (vidro). No computador mostra todas as seções e destaca a que está na tela;
 * no celular vira um botão "Menu" que abre um painel de vidro. Logo "M" enviada pelo usuário.
 */
export function HubNav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);

  // Destaca a seção que cruza o meio da tela (a hero, no topo, não destaca nada).
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        setActive(LINKS.find((l) => seen.get(l.id))?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Painel do celular: fecha com Escape ou clicando fora.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const link = (l: (typeof LINKS)[number], i?: number) => (
    <a
      key={l.id}
      href={`#${l.id}`}
      data-on={active === l.id}
      aria-current={active === l.id ? "location" : undefined}
      style={i === undefined ? undefined : ({ "--i": i } as React.CSSProperties)}
      onClick={() => setOpen(false)}
    >
      {l.label}
    </a>
  );

  return (
    <header className="hnav" ref={root}>
      <Link className="hnav__logo" href="/" aria-label="Mauro Junior, início">
        <Image src="/brand/logo-m.png" alt="" width={640} height={366} className="hnav__mark" />
      </Link>

      <nav className="hnav__links" aria-label="Principal">
        <div className="hnav__list">{LINKS.map((l) => link(l))}</div>
        <button
          type="button"
          className="hnav__burger"
          aria-expanded={open}
          aria-controls="hnav-panel"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" data-open={open}>
            <path d="M2 5h12M2 11h12" />
          </svg>
        </button>
        <a className="hnav__cta" href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
          Orçamento
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M3 13L13 3M5 3h8v8" />
          </svg>
          <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
        </a>
      </nav>

      {/* painel do celular: fora do vidro do menu para ele também desfocar o que está atrás */}
      <div id="hnav-panel" className="hnav__panel" data-open={open}>
        {LINKS.map((l, i) => link(l, i))}
      </div>
    </header>
  );
}
