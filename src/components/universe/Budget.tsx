import type { Universe } from "@/universes/types";

import { INSTAGRAM_URL, whatsappUrl } from "@/lib/contact";

export function Budget({ u }: { u: Universe }) {
  return (
    <section id="orcamento" className="budget" aria-labelledby="orc-titulo">
      <h2 id="orc-titulo">Vamos conversar?</h2>
      <p>{u.cta.hint}</p>
      <a className="btn" href={whatsappUrl(`Oi, Mauro! Quero pedir um orçamento de ${u.name}.`)} target="_blank" rel="noopener noreferrer">
        {u.cta.label}
        <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      </a>
      <small>
        Ou chame no{" "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        .
      </small>
    </section>
  );
}
