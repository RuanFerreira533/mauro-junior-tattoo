import { rng } from "@/lib/seed";

/** Arte provisória Fine Line: um ramo de traço fino com folhas, num círculo aberto. Gerada a partir do id da obra. */
export function FinelineArt({ seed }: { seed: string }) {
  const r = rng(seed);
  const bend = 40 + r() * 60;
  const leaves = 4 + Math.floor(r() * 4);
  const flip = r() > 0.5 ? -1 : 1;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="art__svg" aria-hidden="true">
      <rect width="400" height="500" fill="#0b0b0c" />
      <g fill="none" stroke="#f1f1ef" strokeLinecap="round" strokeWidth="1.2">
        <path d={`M${200 - flip * 150} 120A150 150 0 1 1 ${200 - flip * 120} 380`} opacity="0.55" strokeDasharray="1 0" />
        <path d={`M200 460C${200 + flip * bend} 380 ${200 - flip * bend} 300 200 90`} />
        {Array.from({ length: leaves }, (_, i) => {
          const y = 400 - i * (260 / leaves);
          const side = i % 2 ? 1 : -1;
          const w = 34 + r() * 34;
          return <path key={i} d={`M200 ${y}q${side * w} ${-w * 0.3} ${side * w * 1.4} ${-w * 0.9}q${-side * w * 0.2} ${w * 0.7} ${-side * w * 1.4} ${w * 0.9}`} />;
        })}
        <path d="M200 70l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" opacity="0.8" />
      </g>
      <g fill="#f1f1ef">
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="200" cy={470 + i * 8} r="1.3" opacity="0.7" />
        ))}
      </g>
    </svg>
  );
}
