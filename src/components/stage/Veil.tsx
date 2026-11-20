import { getUniverse } from "@/universes";
import { vars } from "@/lib/css";

/** Véu da travessia: nasce no ponto do clique e cobre a tela com o tema do destino. */
export function Veil({ veil, phase }: { veil: { slug: string; x: number; y: number }; phase: "covering" | "arriving" }) {
  const u = getUniverse(veil.slug);
  return (
    <div
      className="veil"
      data-theme={veil.slug}
      data-phase={phase}
      style={vars({ "--vx": `${veil.x}px`, "--vy": `${veil.y}px` })}
      aria-hidden="true"
    >
      <span className="veil__name">{u?.name}</span>
    </div>
  );
}
