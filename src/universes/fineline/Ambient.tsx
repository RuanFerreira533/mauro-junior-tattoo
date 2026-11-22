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
// tf = posição e rotação do desenho (corações são desenhados em torno de 0,0).
type Line = { d: string; o: number; t: number; s: number; tf?: string };

/** Onda senoidal fina de ponta a ponta: amp = altura, wl = comprimento de onda. */
const wave = (y: number, amp: number, wl: number) =>
  `M-50 ${y} q${wl / 4} ${-amp} ${wl / 2} 0` + ` t${wl / 2} 0`.repeat(Math.ceil(1700 / (wl / 2)) - 1);

// Coração em um traço só, centrado em 0,0 (~100 de largura vezes k). O tamanho entra nas coordenadas, não em scale():
// com traço de espessura fixa (non-scaling-stroke) o tracejado não acompanha o scale e o desenho aparece cortado.
const heart = (k: number) =>
  "M0 38 C-46 8 -52 -26 -28 -38 C-12 -46 0 -34 0 -22 C0 -34 12 -46 28 -38 C52 -26 46 8 0 38 Z".replace(/-?\d+/g, (n) => String(Number(n) * k));

const LINES: Line[] = [
  // floreios em espiral
  { d: "M300 160 C420 60 560 140 520 240 S360 300 340 220 S440 120 560 170", o: 0.38, t: 16, s: 2 },
  { d: "M1250 760 C1330 660 1460 720 1430 800 S1300 850 1290 790 S1370 700 1450 740", o: 0.38, t: 18, s: 9 },
  // corações
  { d: heart(2.3), o: 0.45, t: 17, s: 3, tf: "translate(1230 330) rotate(8)" },
  { d: heart(1.1), o: 0.4, t: 14, s: 10, tf: "translate(250 640) rotate(-14)" },
  { d: heart(0.6), o: 0.35, t: 12, s: 6, tf: "translate(900 130) rotate(12)" },
  // batimento cardíaco cruzando a tela
  { d: "M-50 700 H520 l30 0 l22 -70 l30 140 l30 -110 l24 40 H1000 l30 0 l22 -60 l28 120 l24 -60 H1650", o: 0.3, t: 21, s: 13 },
  // ondas empilhadas e uma onda com crista enrolada
  { d: wave(800, 34, 260), o: 0.24, t: 20, s: 5 },
  { d: wave(830, 26, 200), o: 0.2, t: 24, s: 11 },
  { d: "M-20 880 C60 880 110 830 120 770 C130 700 190 640 260 660 C330 680 340 760 285 785 C245 800 215 765 236 738", o: 0.4, t: 19, s: 8 },
];

/**
 * Fine Line: desenhos em um traço só que se desenham e se apagam pela tela (corações, batimento, ondas e floreios em
 * espiral), um círculo discreto e estrelinhas. Muito espaço vazio, tudo em 1px.
 */
export function FinelineAmbient() {
  return (
    <>
      <div className="par" style={vars({ "--depth": -6 })}>
        <svg className="f-flow" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
          {LINES.map((l, i) => (
            <g key={i} transform={l.tf}>
              <path d={l.d} pathLength="1" vectorEffect="non-scaling-stroke" className="f-p" style={vars({ "--o": l.o, "--t": `${l.t}s`, "--s": l.s })} />
            </g>
          ))}
        </svg>
      </div>
      <div className="par" style={vars({ "--depth": -10 })}>
        <svg className="f-ring" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <circle cx="200" cy="200" r="180" pathLength="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="par" style={vars({ "--depth": 26 })}>
        {STARS.map(([x, y, d], i) => (
          <span key={i} className="f-star" style={{ left: `${x}%`, top: `${y}%`, ...vars({ "--d": d }) }} />
        ))}
      </div>
    </>
  );
}
