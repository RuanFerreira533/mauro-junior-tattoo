"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import s from "./squeeze.module.css";

/*
 * Carrossel "squeeze": um painel aberto e o resto espremido em ripas à direita.
 * Port do componente 21st.dev "carousel-squeeze" (Tailwind/shadcn) para CSS puro, sem dependências.
 * Mudanças: classes viraram CSS Module; `art` (nó React) substitui `image` para a arte provisória;
 * cores, fonte e raio vêm dos tokens do universo (--accent, --ink, --font-body, --radius).
 */

export type SqueezeSlide = {
  id?: string | number;
  title: string;
  description?: string;
  /** Foto real (URL). */
  image?: string;
  imageAlt?: string;
  /** Arte provisória desenhada em SVG (usada quando não há `image`). */
  art?: ReactNode;
  /** Rótulo no canto do painel aberto. */
  overlay?: ReactNode;
  action?: string;
  href?: string;
  target?: string;
  /** Roda ao clicar no botão e também ao clicar no painel já aberto. */
  onAction?: () => void;
  /** Texto para leitor de tela do painel (a arte provisória é decorativa). */
  label?: string;
};

type Size = number | string;
const size = (v: Size) => (typeof v === "number" ? `${v}px` : v);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Quatro colunas e uma cauda de ripas. A coluna 0 começa de um bloco 16:9 e devolve um pouco.
const SHARES = [-0.06, 0.61, 0.3, 0.15];
const STRETCHED = [0, 0.71, 0.4, 0.25];
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];

type Card = { key: number; slide: number };

const subscribeMotion = (cb: () => void) => {
  const q = window.matchMedia("(prefers-reduced-motion: reduce)");
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);

export type SqueezeCarouselProps = {
  slides: SqueezeSlide[];
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  height?: Size;
  slatWidth?: Size;
  slatGap?: Size;
  gap?: Size;
  radius?: Size;
  duration?: number;
  hoverGrow?: boolean;
  autoplay?: boolean;
  interval?: number;
  controls?: boolean;
  label?: string;
  className?: string;
};

export function SqueezeCarousel({
  slides,
  defaultIndex = 0,
  onIndexChange,
  height = "clamp(200px, 34cqi, 400px)",
  slatWidth = 8,
  slatGap = 8,
  gap = 16,
  radius = "var(--radius, 6px)",
  duration = 1000,
  hoverGrow = true,
  autoplay = false,
  interval = 6000,
  controls = true,
  label = "Trabalhos",
  className,
}: SqueezeCarouselProps) {
  const count = slides.length;
  const wrap = (i: number) => ((i % count) + count) % count;
  const slats = clamp(count - 4, 1, 3);
  const visible = 4 + slats;

  const reduced = useReducedMotion();
  const ms = reduced ? 0 : duration;
  const ids = useId();
  const seed = useRef(visible); // as chaves 0..visible-1 são dos cartões iniciais

  const [cards, setCards] = useState<Card[]>(() =>
    Array.from({ length: visible }, (_, p) => ({ key: p, slide: wrap(defaultIndex + p) })),
  );
  const [column, setColumn] = useState(0);
  const columnRef = useRef(0);
  const forward = useRef(true);
  const [slid, setSlid] = useState(0);
  const [still, setStill] = useState(false);
  const [hover, setHover] = useState(-1);

  const open = cards[-column]?.slide ?? defaultIndex;
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Depois do movimento, corta a tira para os cartões visíveis e zera os números (mesma imagem, sem animar).
  const settle = useCallback(() => {
    setCards((strip) => (forward.current ? strip.slice(-visible) : strip.slice(0, visible)));
    columnRef.current = 0;
    setColumn(0);
    setSlid(0);
    setStill(true);
  }, [visible]);

  useLayoutEffect(() => {
    if (!still) return;
    const id = requestAnimationFrame(() => setStill(false));
    return () => cancelAnimationFrame(id);
  }, [still]);

  const step = useCallback(
    (by: number) => {
      if (count < 2 || by === 0) return;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      forward.current = by > 0;
      if (by > 0) {
        setCards((strip) => [
          ...strip,
          ...Array.from({ length: by }, (_, k) => ({ key: seed.current++, slide: wrap(strip[strip.length - 1].slide + 1 + k) })),
        ]);
        columnRef.current -= by;
        setColumn(columnRef.current);
        setSlid((v) => v - by);
      } else {
        setCards((strip) => [
          ...Array.from({ length: -by }, (_, k) => ({ key: seed.current++, slide: wrap(strip[0].slide - (-by - k)) })),
          ...strip,
        ]);
        setSlid((v) => v + by);
        setStill(true);
        timers.current.push(window.setTimeout(() => setSlid(0), 0));
      }
      timers.current.push(window.setTimeout(settle, ms + 20));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, ms, settle],
  );

  useEffect(() => {
    onIndexChange?.(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoplay || paused || reduced || count < 2) return;
    const t = window.setTimeout(() => step(1), interval);
    return () => clearTimeout(t);
  }, [autoplay, paused, reduced, count, open, interval, step]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const by = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!by) return;
    e.preventDefault();
    step(by);
  };

  if (!count) return null;

  const slat = size(slatWidth);
  const idle = !(hoverGrow && hover >= 0 && hover <= 3 && !reduced);
  const shareOf = (col: number) => (idle ? SHARES[col] : hover === col ? STRETCHED[col] : SQUEEZED[col]);
  const widthOf = (col: number) => {
    if (col < 0 || col > 3) return slat;
    if (col === 0) return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
    return `calc(var(--sq-room) * ${shareOf(col)})`;
  };

  const vars = {
    "--sq-h": size(height),
    "--sq-gap": size(gap),
    "--sq-slat-gap": size(slatGap),
    "--sq-radius": size(radius),
    "--sq-ms": `${ms}ms`,
    "--sq-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
    "--sq-fill": "var(--accent)",
    "--sq-on-fill": "var(--accent-ink)",
    "--sq-hero": "calc(var(--sq-h) * 16 / 9)",
    "--sq-room": `calc(100cqi - var(--sq-hero) - ${slats} * var(--sq-slat-gap) - 3 * var(--sq-gap) - ${slats} * ${slat})`,
  } as CSSProperties;

  return (
    <div
      className={`${s.root} ${className ?? ""}`}
      style={vars}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHover(-1);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {controls && count > 1 && (
        <div className={s.controls}>
          <Arrow back label="Anterior" onClick={() => step(-1)} />
          <Arrow label="Próximo" onClick={() => step(1)} />
        </div>
      )}

      <div className={s.viewport}>
        <div
          role="tablist"
          aria-label={label}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className={s.strip}
          style={{
            transform: `translateX(calc(${slid} * (${slat} + var(--sq-gap))))`,
            transition: still ? "none" : "transform var(--sq-ms) var(--sq-ease)",
          }}
        >
          {cards.map((card, place) => {
            const col = place + column;
            const slide = slides[card.slide];
            const front = col === 0;
            return (
              <button
                key={card.key}
                type="button"
                role="tab"
                id={`${ids}-tab-${card.key}`}
                aria-selected={front}
                aria-controls={`${ids}-panel`}
                aria-label={slide.label ?? slide.title}
                tabIndex={front ? 0 : -1}
                onMouseMove={() => hoverGrow && setHover(col)}
                onClick={() => (col > 0 ? step(col) : slide.onAction?.())}
                className={s.card}
                style={{
                  width: widthOf(col),
                  marginLeft: place === 0 ? 0 : col < 4 ? "var(--sq-gap)" : "var(--sq-slat-gap)",
                  borderRadius: `min(var(--sq-radius), calc(${widthOf(col)} / 2))`,
                  transitionProperty: "width, margin-left",
                  transitionDuration: still ? "0s" : "var(--sq-ms)",
                  transitionTimingFunction: "var(--sq-ease)",
                }}
              >
                <Picture slide={slide} />
                {slide.overlay && (
                  <span aria-hidden="true" className={s.overlay} style={{ opacity: front ? 1 : 0 }}>
                    {slide.overlay}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${ids}-panel`} role="tabpanel" aria-live="polite" className={s.panel}>
        {slides.map((slide, i) => {
          const shown = i === open;
          return (
            <div
              key={slide.id ?? i}
              aria-hidden={!shown}
              className={s.copy}
              style={{ opacity: shown ? 1 : 0, visibility: shown ? "visible" : "hidden", pointerEvents: shown ? "auto" : "none" }}
            >
              <p className={s.text}>
                <span className={s.title}>{slide.title}</span>{" "}
                {slide.description && <span className={s.desc}>{slide.description}</span>}
              </p>
              {slide.action && <Action slide={slide} shown={shown} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Desenhada num bloco 16:9 fixo e centralizada: o painel só muda o quanto dela se vê (uma escala só). */
function Picture({ slide }: { slide: SqueezeSlide }) {
  if (slide.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={slide.image} alt={slide.imageAlt ?? ""} draggable={false} loading="lazy" decoding="async" className={s.pic} />;
  }
  return (
    <span aria-hidden="true" className={s.pic}>
      {slide.art}
    </span>
  );
}

function Arrow({ back = false, label, onClick }: { back?: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={s.arrow}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path
          d={
            back
              ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
              : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
          }
        />
      </svg>
    </button>
  );
}

function Action({ slide, shown }: { slide: SqueezeSlide; shown: boolean }) {
  const inside = (
    <>
      {slide.action}
      <svg width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true" className={s.actionArrow}>
        <path d="M1.2 1 4.7 4.5 1.2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
  if (slide.href) {
    return (
      <a
        href={slide.href}
        target={slide.target}
        rel={slide.target === "_blank" ? "noreferrer" : undefined}
        tabIndex={shown ? 0 : -1}
        onClick={slide.onAction}
        className={s.action}
      >
        {inside}
      </a>
    );
  }
  return (
    <button type="button" tabIndex={shown ? 0 : -1} onClick={slide.onAction} className={s.action}>
      {inside}
    </button>
  );
}

export default SqueezeCarousel;
