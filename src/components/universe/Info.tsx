import type { Universe } from "@/universes/types";

export function Info({ u }: { u: Universe }) {
  return (
    <section className="info" aria-label={`Sobre o universo ${u.name}`}>
      {u.info.map((item) => (
        <article key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}
