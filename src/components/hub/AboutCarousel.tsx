"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import s from "./about.module.css";

export type AboutSlide = { src: string; alt: string; name: string; role: string; quote: string; focus?: string };

const AUTOPLAY_MS = 7000;
const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/**
 * Carrossel circular do Sobre (ideia do "circular-testimonials" do 21st.dev, reescrita em CSS puro:
 * o projeto não usa Tailwind, framer-motion nem react-icons). Mostra 3 fotos em leque, com um texto por foto.
 * Entrada: ao chegar na tela, a foto central sobe e as laterais saem de trás dela; o texto entra palavra por palavra.
 */
export function AboutCarousel({ slides }: { slides: AboutSlide[] }) {
  const n = slides.length;
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  // Entrada: dispara uma vez, quando o bloco aparece. Sem movimento reduzido, já nasce visível.
  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        window.setTimeout(() => setReady(true), 1600);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Troca sozinha; pausa com o mouse em cima ou foco nos controles; não roda com movimento reduzido.
  useEffect(() => {
    if (!seen || paused || n < 2 || reduced) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [i, seen, paused, n, reduced]);

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const pos = (idx: number) => {
    const o = (idx - i + n) % n;
    return o === 0 ? "c" : o === 1 ? "r" : o === n - 1 ? "l" : "h";
  };
  const cur = slides[i];

  return (
    <div
      ref={root}
      className={s.wrap}
      data-in={seen || reduced}
      data-ready={ready || reduced}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Fotos e histórias do Mauro"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className={s.stage}>
        {slides.map((sl, idx) => (
          <div key={sl.src} className={s.img} data-pos={pos(idx)} aria-hidden={idx !== i}>
            <Image
              src={sl.src}
              alt={idx === i ? sl.alt : ""}
              fill
              sizes="(max-width: 900px) 80vw, 440px"
              style={{ objectPosition: sl.focus ?? "50% 50%" }}
            />
          </div>
        ))}
      </div>

      <div className={s.content}>
        <div key={i} className={s.text} aria-live={paused ? "polite" : "off"}>
          <h3 className={s.name}>{cur.name}</h3>
          <p className={s.role}>{cur.role}</p>
          <p className={s.quote}>
            {cur.quote.split(" ").map((w, k) => (
              <span key={k} className={s.word} style={{ "--w": k } as React.CSSProperties}>
                {w}&nbsp;
              </span>
            ))}
          </p>
        </div>

        <div className={s.ctrl}>
          <button type="button" className={s.arrow} onClick={() => go(-1)} aria-label="Foto anterior">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" className={s.arrow} onClick={() => go(1)} aria-label="Próxima foto">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <div className={s.dots}>
            {slides.map((sl, idx) => (
              <button key={sl.src} type="button" className={s.dot} data-on={idx === i} onClick={() => setI(idx)} aria-label={`Ir para a foto ${idx + 1}`} aria-current={idx === i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
