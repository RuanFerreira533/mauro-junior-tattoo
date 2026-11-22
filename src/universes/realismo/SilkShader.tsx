"use client";

import { useEffect, useRef } from "react";
import { SILK_FRAGMENT } from "./silk.frag";

const VERTEX = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";
// #0F0F0F, #474444, #2D2B2B, #333030 (0–1), mais 4 vetores zerados (u_colors[8])
const COLORS = new Float32Array([
  0.059, 0.059, 0.059, 0.278, 0.267, 0.267, 0.176, 0.169, 0.169, 0.2, 0.188, 0.188, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

/**
 * Fundo "Silk" (WebGL1 puro, sem bibliotecas). Triângulo em tela cheia + fragment shader fornecido.
 * Só roda quando `on` e a aba está visível; com reduced motion desenha um quadro estático.
 * DPR limitado a 2. Sem WebGL: não desenha nada (o fundo CSS do tema aparece).
 */
export function SilkShader({ on = true }: { on?: boolean }) {
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
      const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) return;
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, SILK_FRAGMENT);
      if (!vs || !fs) return;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const U = (n: string) => gl.getUniformLocation(prog, n);
      const uColors = U("u_colors[0]") ?? U("u_colors");
      const uScene = U("u_scene");
      const uShape = U("u_shape");
      const uSurface = U("u_surface");
      const uFinish = U("u_finish");
      const uTransform = U("u_transform");
      const uSpace = U("u_space");
      const uCursor = U("u_cursor");

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mouse = { x: 0, y: 0, presence: 0, target: 0 };
      let raf = 0;
      let active = false;
      const t0 = performance.now();
      let w = 0;
      let h = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        w = Math.max(1, Math.round(canvas.clientWidth * dpr));
        h = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
      };

      const draw = (now: number) => {
        mouse.presence += (mouse.target - mouse.presence) * 0.08;
        gl.uniform3fv(uColors, COLORS);
        gl.uniform4f(uScene, w, h, ((now - t0) / 1000) * 0.31, 4);
        gl.uniform4f(uShape, 1.26, 0.09, 0.5, 0);
        gl.uniform4f(uSurface, 2.4, 1.11, 0, 0.4);
        gl.uniform4f(uFinish, 0, 0.16, 0.016, 0.07);
        gl.uniform4f(uTransform, 1581, 0, 0, 0);
        gl.uniform4f(uSpace, -0.23, 0, mouse.x, mouse.y);
        gl.uniform4f(uCursor, mouse.presence, 2, 0.65, 0.46); // swirl
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const loop = (now: number) => {
        draw(now);
        raf = requestAnimationFrame(loop);
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

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const r = canvas.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
        mouse.x = nx;
        mouse.y = ny;
        mouse.target = Math.abs(nx) <= 1 && Math.abs(ny) <= 1 ? 1 : 0;
      };
      const onLeave = () => (mouse.target = 0);

      resize();
      const ro = new ResizeObserver(() => {
        resize();
        if (reduced && active) draw(performance.now());
      });
      ro.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      // O contexto é criado uma vez; `on` só liga/desliga o laço (sem recompilar o shader a cada hover).
      ctl.current = {
        set: (v) => {
          active = v;
          if (!v) return stop();
          resize();
          if (reduced) draw(performance.now());
          else start();
        },
      };

      return () => {
        ctl.current = null;
        stop();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    };

    // Compilar o shader custa: se o universo ainda não está visível (hub), espera o navegador ficar ocioso.
    const init = () => {
      if (cancelled) return;
      cleanup = setup();
      if (cleanup) ctl.current?.set(latestOn.current);
    };
    if (latestOn.current) init();
    else timerId = window.setTimeout(init, 5500); // depois da hero, e sem coincidir com o canvas do Blackwork


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

  return <canvas ref={ref} className="r-shader" aria-hidden="true" />;
}
