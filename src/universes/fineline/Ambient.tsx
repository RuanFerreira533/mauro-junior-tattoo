import { vars } from "@/lib/css";

const STARS: [number, number, number][] = [
  [14, 24, 0],
  [78, 18, 1.4],
  [34, 70, 2.2],
  [88, 62, 0.8],
  [58, 40, 3],
  [8, 82, 1.9],
];

/** Fine Line: círculo de traço finíssimo que se desenha, linha vertical e estrelinhas. Muito espaço vazio. */
export function FinelineAmbient() {
  return (
    <>
      <div className="par" style={vars({ "--depth": -10 })}>
        <svg className="f-ring" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <circle cx="200" cy="200" r="180" pathLength="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="f-vline" />
      </div>
      <div className="par" style={vars({ "--depth": 26 })}>
        {STARS.map(([x, y, d], i) => (
          <span key={i} className="f-star" style={{ left: `${x}%`, top: `${y}%`, ...vars({ "--d": d }) }} />
        ))}
      </div>
    </>
  );
}
