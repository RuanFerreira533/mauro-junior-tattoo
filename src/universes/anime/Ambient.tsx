import { vars } from "@/lib/css";

// [x%, y%, atraso, escala]
const SPARKS: [number, number, number, number][] = [
  [8, 22, 0, 1],
  [22, 72, 0.6, 0.7],
  [38, 14, 1.2, 0.9],
  [55, 84, 0.3, 1.1],
  [68, 26, 1.8, 0.8],
  [82, 64, 0.9, 1],
  [92, 16, 1.5, 0.7],
  [47, 50, 2.1, 0.6],
  [14, 46, 2.4, 0.8],
  [76, 90, 0.2, 0.6],
];

/** Anime: paisagem de céu aberto (fundo de anime) com escurecimento para legibilidade e brilhos. */
export function AnimeAmbient() {
  return (
    <>
      <div className="par" style={vars({ "--depth": -12 })}>
        <div className="a-sky" />
      </div>
      <div className="a-shade" />
      <div className="par" style={vars({ "--depth": 46 })}>
        {SPARKS.map(([x, y, d, s], i) => (
          <span key={i} className="a-spark" style={{ left: `${x}%`, top: `${y}%`, ...vars({ "--d": d, "--s": s }) }} />
        ))}
      </div>
    </>
  );
}
