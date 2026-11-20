import type { Universe } from "@/universes/types";
import { vars } from "@/lib/css";

export function Hero({ u }: { u: Universe }) {
  return (
    <section className="hero" data-u={u.slug} aria-labelledby="titulo">
      <p className="hero__kicker arrive" style={vars({ "--i": 0 })}>
        Universo · {u.kicker}
      </p>
      <h1 id="titulo" className="hero__title arrive" style={vars({ "--i": 1 })}>
        {u.name}
      </h1>
      <p className="hero__lead arrive" style={vars({ "--i": 2 })}>
        {u.description}
      </p>
      <div className="hero__actions arrive" style={vars({ "--i": 3 })}>
        <a className="btn" href="#trabalhos">
          Ver trabalhos
        </a>
        <a className="btn btn--ghost" href="#orcamento">
          Pedir orçamento
        </a>
      </div>
    </section>
  );
}
