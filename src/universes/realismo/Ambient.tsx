import { vars } from "@/lib/css";
import { SilkShader } from "./SilkShader";

const DUST: [number, number, number][] = [
  [12, 30, 0],
  [28, 66, 3],
  [44, 20, 6],
  [61, 78, 2],
  [74, 40, 8],
  [88, 70, 5],
  [53, 52, 10],
];

/** Realismo: shader "Silk" (WebGL, com redemoinho no cursor), poeira e vinheta. Só renderiza com o tema ativo. */
export function RealismoAmbient({ on = true }: { on?: boolean }) {
  return (
    <>
      <SilkShader on={on} />
      <div className="par" style={vars({ "--depth": 30 })}>
        {DUST.map(([x, y, d], i) => (
          <span key={i} className="r-dust" style={{ left: `${x}%`, top: `${y}%`, ...vars({ "--d": d }) }} />
        ))}
      </div>
      <div className="r-vignette" />
    </>
  );
}
