import { rng } from "@/lib/seed";

const INK = "#efece4";

const poly = (n: number, r: number, rot: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((i / n) * 360 + rot - 90) * (Math.PI / 180);
    return `${(200 + r * Math.cos(a)).toFixed(1)},${(250 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

/** Arte provisória Blackwork: três composições (polígonos, raios, anéis) com dotwork. Gerada a partir do id da obra. */
export function BlackworkArt({ seed }: { seed: string }) {
  const r = rng(seed);
  const motif = Math.floor(r() * 3);
  const n = 3 + Math.floor(r() * 6);
  const layers = 6 + Math.floor(r() * 4);
  const step = 180 / n / layers;
  const rays = 24 + Math.floor(r() * 4) * 6;
  const dots = `bdots-${seed}`;
  const fade = `bfade-${seed}`;
  const mask = `bmask-${seed}`;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="art__svg" aria-hidden="true">
      <defs>
        <pattern id={dots} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.3" fill={INK} />
        </pattern>
        <radialGradient id={fade} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={mask}>
          <circle cx="200" cy="250" r="190" fill={`url(#${fade})`} />
        </mask>
      </defs>
      <rect width="400" height="500" fill="#090909" />
      <rect width="400" height="500" fill={`url(#${dots})`} mask={`url(#${mask})`} opacity="0.55" />
      {motif === 0 &&
        Array.from({ length: layers }, (_, k) => (
          <polygon
            key={k}
            points={poly(n, 175 - k * (150 / layers), k * step * 2)}
            fill={k === layers - 1 ? INK : "none"}
            stroke={INK}
            strokeWidth={k % 3 === 0 ? 2.2 : 1}
            opacity={0.95 - k * 0.07}
          />
        ))}
      {motif === 1 && (
        <g stroke={INK} fill="none">
          {Array.from({ length: rays }, (_, i) => (
            <line key={i} x1="200" y1="110" x2="200" y2="62" strokeWidth={i % 2 ? 1 : 2.4} transform={`rotate(${(i * 360) / rays} 200 250)`} />
          ))}
          <circle cx="200" cy="250" r="140" strokeWidth="2" />
          <circle cx="200" cy="250" r="100" strokeWidth="1" strokeDasharray="3 6" />
          <path d="M200 160a90 90 0 1 0 0 180a60 90 0 1 1 0-180z" fill={INK} stroke="none" />
        </g>
      )}
      {motif === 2 && (
        <g stroke={INK} fill="none">
          {[170, 140, 110, 80, 50].map((rad, i) => (
            <circle key={rad} cx="200" cy="250" r={rad} strokeWidth={i % 2 ? 1 : 5} strokeDasharray={i % 2 ? "2 5" : undefined} />
          ))}
          <path d="M200 60V440M10 250H390" strokeWidth="1" />
          <circle cx="200" cy="250" r="18" fill={INK} stroke="none" />
        </g>
      )}
      <circle cx="200" cy="250" r="190" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="2 7" />
      <path d="M20 44V20h24M356 20h24v24M380 456v24h-24M44 480H20v-24" fill="none" stroke={INK} strokeWidth="2" />
    </svg>
  );
}
