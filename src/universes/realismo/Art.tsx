import { rng } from "@/lib/seed";

/** Arte provisória Realismo: luz suave, névoa e uma esfera luminosa em preto e cinza. */
export function RealismoArt({ seed }: { seed: string }) {
  const r = rng(seed);
  const lx = 25 + r() * 50;
  const ly = 15 + r() * 40;
  const px = 150 + r() * 100;
  const py = 190 + r() * 120;
  const id = (s: string) => `${s}-${seed}`;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="art__svg" aria-hidden="true">
      <defs>
        <radialGradient id={id("bg")} cx={`${lx}%`} cy={`${ly}%`} r="95%">
          <stop offset="0" stopColor="#9a9c9f" />
          <stop offset="0.45" stopColor="#3b3d40" />
          <stop offset="1" stopColor="#0b0c0d" />
        </radialGradient>
        <radialGradient id={id("orb")} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#f3f1ec" />
          <stop offset="0.5" stopColor="#8d8f92" />
          <stop offset="1" stopColor="#1a1b1d" />
        </radialGradient>
        <filter id={id("blur")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={id("grain")}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("bg")})`} />
      <g filter={`url(#${id("blur")})`} opacity="0.55">
        <ellipse cx={80 + r() * 60} cy="120" rx="130" ry="40" fill="#cfd1d3" />
        <ellipse cx={260 + r() * 60} cy="400" rx="150" ry="46" fill="#aeb0b3" />
      </g>
      <ellipse cx={px} cy={py + 120} rx="80" ry="14" fill="#000" opacity="0.5" filter={`url(#${id("blur")})`} />
      <circle cx={px} cy={py} r="76" fill={`url(#${id("orb")})`} />
      <rect width="400" height="500" filter={`url(#${id("grain")})`} opacity="0.12" />
    </svg>
  );
}
