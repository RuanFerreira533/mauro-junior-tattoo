import { vars } from "@/lib/css";

const STARS: [number, number, number][] = [
  [14, 24, 0],
  [78, 18, 1.4],
  [34, 70, 2.2],
  [88, 62, 0.8],
  [58, 40, 3],
  [8, 82, 1.9],
];

// Traços que atravessam a tela (viewBox 1600x900). o = opacidade, t = duração (s), d = defasagem (s).
// Cada um se desenha, fica um instante e se apaga pela ponta, como uma caneta fazendo uma linha contínua.
const LINES: { d: string; o: number; t: number; s: number }[] = [
  { d: "M-50 620 C250 420 450 820 800 600 S1350 380 1650 520", o: 0.32, t: 22, s: 0 },
  { d: "M-50 300 C300 120 520 460 860 280 S1300 80 1650 240", o: 0.26, t: 26, s: 7 },
  { d: "M-50 780 C350 700 600 560 900 740 S1400 860 1650 700", o: 0.22, t: 19, s: 12 },
  { d: "M-50 450 C200 560 520 240 900 420 S1250 600 1650 380", o: 0.18, t: 30, s: 4 },
  { d: "M200 -50 C400 300 300 600 700 950", o: 0.14, t: 24, s: 15 },
  // floreios em espiral
  { d: "M300 160 C420 60 560 140 520 240 S360 300 340 220 S440 120 560 170", o: 0.38, t: 16, s: 2 },
  { d: "M1250 760 C1330 660 1460 720 1430 800 S1300 850 1290 790 S1370 700 1450 740", o: 0.38, t: 18, s: 9 },
];

/**
 * Fine Line: traços finíssimos que se desenham e se apagam pela tela, floreios em espiral,
 * círculo que se desenha e estrelinhas. Muito espaço vazio, tudo em 1px.
 */
export function FinelineAmbient() {
  return (
    <>
      <div className="par" style={vars({ "--depth": -6 })}>
        <svg className="f-flow" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
          {LINES.map((l, i) => (
            <path key={i} d={l.d} pathLength="1" vectorEffect="non-scaling-stroke" className="f-p" style={vars({ "--o": l.o, "--t": `${l.t}s`, "--s": l.s })} />
          ))}
        </svg>
      </div>
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
