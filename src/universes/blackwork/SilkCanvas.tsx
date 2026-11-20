"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo "seda" do Blackwork (canvas 2D). Adaptado do componente 21st.dev "silk-background-animation":
 * mesma função de padrão e de ruído, mas
 *  - desenhado em baixa resolução (1 px = 4 px da tela) e esticado por CSS;
 *  - ~30 quadros/s, só anima quando o universo está ativo e a aba visível;
 *  - criado uma vez (hover não recria); no hub, a criação espera o navegador ficar ocioso;
 *  - cor em osso bem escura (contraste AA); reduced motion: um quadro estático.
 */
const SCALE = 4;
const SPEED = 0.02;
const TEX_SCALE = 2;
const NOISE = 0.8;
const LEVEL = 0.22; // brilho máximo (0–1): mantém o fundo escuro

const noise = (x: number, y: number) => {
  const G = 2.71828;
  const rx = G * Math.sin(G * x);
  const ry = G * Math.sin(G * y);
  return (rx * ry * (1 + x)) % 1;
};

export function SilkCanvas({ on = true }: { on?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const ctl = useRef<{ set: (v: boolean) => void } | null>(null);
  const latestOn = useRef(on);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let timerId = 0;

    const setup = (): (() => void) | undefined => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let time = 0;
      let raf = 0;
      let active = false;
      let last = 0;
      let image: ImageData | null = null;

      const resize = () => {
        canvas.width = Math.max(1, Math.ceil(canvas.clientWidth / SCALE));
        canvas.height = Math.max(1, Math.ceil(canvas.clientHeight / SCALE));
        image = ctx.createImageData(canvas.width, canvas.height);
      };

      const draw = () => {
        if (!image) return;
        const { width, height } = canvas;
        const data = image.data;
        const tOffset = SPEED * time;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const u = (x / width) * TEX_SCALE;
            const v = (y / height) * TEX_SCALE;
            const texY = v + 0.03 * Math.sin(8.0 * u - tOffset);
            const pattern =
              0.6 +
              0.4 *
                Math.sin(
                  5.0 * (u + texY + Math.cos(3.0 * u + 5.0 * texY) + 0.02 * tOffset) +
                    Math.sin(20.0 * (u + texY - 0.1 * tOffset)),
                );
            const k = Math.max(0, pattern - (noise(x * SCALE, y * SCALE) / 15.0) * NOISE) * LEVEL;
            const i = (y * width + x) * 4;
            data[i] = 239 * k;
            data[i + 1] = 236 * k;
            data[i + 2] = 228 * k;
            data[i + 3] = 255;
          }
        }
        ctx.putImageData(image, 0, 0);
      };

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (now - last < 33) return;
        last = now;
        time += 2;
        draw();
      };
      const start = () => {
        if (reduced || raf || document.hidden || !active) return;
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        cancelAnimationFrame(raf);
        raf = 0;
      };
      const onVisibility = () => (document.hidden ? stop() : start());
      const onResize = () => {
        resize();
        if (reduced && active) draw();
      };

      resize();
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      ctl.current = {
        set: (v) => {
          active = v;
          if (!v) return stop();
          if (reduced) draw();
          else start();
        },
      };

      return () => {
        ctl.current = null;
        stop();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    };

    // Se o universo ainda não está visível (hub), espera o navegador ficar ocioso para criar.
    const init = () => {
      if (cancelled) return;
      cleanup = setup();
      if (cleanup) ctl.current?.set(latestOn.current);
    };
    if (latestOn.current) init();
    else timerId = window.setTimeout(init, 2500); // depois da entrada da hero


    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    latestOn.current = on;
    ctl.current?.set(on);
  }, [on]);

  return <canvas ref={ref} className="b-silk" aria-hidden="true" />;
}
