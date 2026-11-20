import { rng } from "@/lib/seed";

// [principal, fundo, destaque]
const PALS = [
  ["#ff3d81", "#2b1670", "#ffd23f"],
  ["#2de2e6", "#16306e", "#ff3d81"],
  ["#ffd23f", "#6a1b9a", "#2de2e6"],
];

/** Arte provisória Anime: raios, retícula e um raio de energia. Gerada a partir do id da obra. */
export function AnimeArt({ seed }: { seed: string }) {
  const r = rng(seed);
  const [main, bg, accent] = PALS[Math.floor(r() * PALS.length)];
  const cx = 150 + r() * 100;
  const cy = 170 + r() * 100;
  const motif = Math.floor(r() * 3);
  const N = 26;
  const R = 640;
  const rays = Array.from({ length: N }, (_, i) => {
    const a1 = ((i * 2) / (N * 2)) * Math.PI * 2;
    const a2 = a1 + (Math.PI * 2) / (N * 2);
    return `${cx},${cy} ${(cx + R * Math.cos(a1)).toFixed(1)},${(cy + R * Math.sin(a1)).toFixed(1)} ${(cx + R * Math.cos(a2)).toFixed(1)},${(cy + R * Math.sin(a2)).toFixed(1)}`;
  });
  const dots = `dots-${seed}`;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="art__svg" aria-hidden="true">
      <defs>
        <pattern id={dots} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="3.2" fill={bg} />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={bg} />
      {rays.map((p, i) => (
        <polygon key={i} points={p} fill={main} opacity={0.32} />
      ))}
      <circle cx={cx} cy={cy} r="96" fill={main} stroke="#fff" strokeWidth="6" />
      <circle cx={cx} cy={cy} r="96" fill={`url(#${dots})`} opacity="0.5" />
      <g transform={`translate(${cx} ${cy}) rotate(${Math.round(r() * 24 - 12)})`} stroke="#fff" strokeWidth="6" strokeLinejoin="round">
        {motif === 0 && <polygon points="0,-120 44,-120 12,-30 56,-30 -34,128 -6,12 -46,12" fill={accent} />}
        {motif === 1 && (
          <polygon
            points="0,-130 22,-40 112,-90 56,-12 130,34 38,36 36,130 0,52 -36,130 -38,36 -130,34 -56,-12 -112,-90 -22,-40"
            fill={accent}
          />
        )}
        {motif === 2 && (
          <>
            <circle r="64" fill={bg} />
            <circle r="38" fill={accent} />
            <path d="M-150 70L150 -70" strokeWidth="14" fill="none" />
          </>
        )}
      </g>
      <rect y="410" width="400" height="90" fill={`url(#${dots})`} opacity="0.6" />
      <rect x="0" y="0" width="400" height="500" fill="none" stroke="#fff" strokeWidth="10" />
    </svg>
  );
}
