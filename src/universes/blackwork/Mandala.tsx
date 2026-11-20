const pts = (n: number, r: number, rot: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((i / n) * 360 + rot - 90) * (Math.PI / 180);
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

/** Geometria de linhas finas: anéis, raios e polígonos rotacionados. Usa a cor do texto do tema. */
export function Mandala({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-200 -200 400 400" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {[190, 160, 120, 80, 40].map((r) => (
        <circle key={r} r={r} vectorEffect="non-scaling-stroke" />
      ))}
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1="0" y1="-40" x2="0" y2="-190" transform={`rotate(${i * 15})`} vectorEffect="non-scaling-stroke" />
      ))}
      <polygon points={pts(8, 150, 0)} vectorEffect="non-scaling-stroke" />
      <polygon points={pts(8, 150, 22.5)} vectorEffect="non-scaling-stroke" />
      <polygon points={pts(6, 100, 0)} vectorEffect="non-scaling-stroke" />
      <polygon points={pts(6, 100, 30)} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
