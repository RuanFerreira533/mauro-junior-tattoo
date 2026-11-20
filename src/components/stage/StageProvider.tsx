"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUniverse } from "@/universes";
import { AmbientLayer } from "./AmbientLayer";
import { Veil } from "./Veil";

// Tempos (ms). Total da travessia <= 1,5 s (DECISIONS D-27).
const INTENT_MS = 100; // espera antes de iniciar o preview
const GRACE_MS = 250; // carência ao sair do portal (evita piscar)
const COVER_MS = 850; // véu cobrindo a tela
const COVER_REDUCED_MS = 220;
const ARRIVE_MS = 600; // véu saindo
const FAILSAFE_MS = 5000;

type Origin = { x: number; y: number };
type Veil = { slug: string } & Origin;

export type StageApi = {
  /** Universo da rota atual (ou null no hub). */
  active: string | null;
  /** Universo em preview temporário (hover/foco/centralizado no toque). */
  preview: string | null;
  /** Universo para o qual a travessia está em andamento. */
  entering: string | null;
  previewIntent: (slug: string, immediate?: boolean) => void;
  previewLeave: () => void;
  enter: (slug: string, origin?: Origin) => void;
};

const StageContext = createContext<StageApi | null>(null);

export function useStage() {
  const ctx = useContext(StageContext);
  if (!ctx) throw new Error("useStage fora do StageProvider");
  return ctx;
}

/**
 * Camada persistente do site (ThemeProvider + ThemeTransition).
 * Vive no layout raiz: o tema muda por atributo `data-theme`, sem remontar nada.
 * theme = universo da rota. Tokens e transição de cor são CSS (ver globals.css).
 */
export function StageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const seg = pathname.split("/")[1];
  const active = getUniverse(seg)?.slug ?? null;

  const [preview, setPreviewState] = useState<string | null>(null);
  const [veil, setVeil] = useState<Veil | null>(null);
  const previewRef = useRef<string | null>(null);
  const veilRef = useRef<Veil | null>(null);
  const timers = useRef<{ intent?: number; leave?: number; push?: number; failsafe?: number }>({});

  const setPreview = useCallback((v: string | null) => {
    previewRef.current = v;
    setPreviewState(v);
  }, []);

  const clearPreviewTimers = () => {
    window.clearTimeout(timers.current.intent);
    window.clearTimeout(timers.current.leave);
  };

  const previewIntent = useCallback(
    (slug: string, immediate = false) => {
      if (veilRef.current) return;
      clearPreviewTimers();
      // Já em preview de outro universo: troca direta A→B, sem passar pelo hub.
      if (previewRef.current || immediate) setPreview(slug);
      else timers.current.intent = window.setTimeout(() => setPreview(slug), INTENT_MS);
    },
    [setPreview],
  );

  const previewLeave = useCallback(() => {
    if (veilRef.current) return;
    clearPreviewTimers();
    timers.current.leave = window.setTimeout(() => setPreview(null), GRACE_MS);
  }, [setPreview]);

  const finish = useCallback(() => {
    veilRef.current = null;
    setVeil(null);
    setPreview(null);
  }, [setPreview]);

  const enter = useCallback(
    (slug: string, origin?: Origin) => {
      if (veilRef.current || !getUniverse(slug)) return;
      clearPreviewTimers();
      const o = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const next = { slug, ...o };
      veilRef.current = next;
      setVeil(next);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      timers.current.push = window.setTimeout(() => router.push(`/${slug}`), reduced ? COVER_REDUCED_MS : COVER_MS);
      timers.current.failsafe = window.setTimeout(finish, FAILSAFE_MS);
    },
    [router, finish],
  );

  // Chegou na rota de destino: o véu sai e o preview é limpo (o tema já é o mesmo).
  const arrived = veil !== null && active === veil.slug;
  useEffect(() => {
    if (!arrived) return;
    window.clearTimeout(timers.current.failsafe);
    const t = window.setTimeout(finish, ARRIVE_MS);
    return () => window.clearTimeout(t);
  }, [arrived, finish]);

  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach((id) => window.clearTimeout(id));
  }, []);

  // O palco só muda de tema por rota (universo ativo). O preview do hub é escopado à seção dos
  // portais (UniverseHub), para que hero e rodapé permaneçam fixos.
  const theme = active;
  const state = veil ? "entering" : preview ? "preview" : active ? "active" : "base";
  const api = useMemo<StageApi>(
    () => ({ active, preview, entering: veil?.slug ?? null, previewIntent, previewLeave, enter }),
    [active, preview, veil, previewIntent, previewLeave, enter],
  );

  return (
    <StageContext.Provider value={api}>
      <div className="stage" data-theme={theme ?? undefined} data-state={state}>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <AmbientLayer theme={theme} />
        <div className="stage__content">{children}</div>
        {veil && <Veil veil={veil} phase={arrived ? "arriving" : "covering"} />}
      </div>
    </StageContext.Provider>
  );
}
