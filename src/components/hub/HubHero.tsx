import Image from "next/image";
import { HubNav } from "./HubNav";

// Foto da hero: para trocar, substitua public/hero/hero.jpg (ou mude o caminho aqui).
const HERO_PHOTO = "/hero/hero.jpg";

const Arrow = ({ down = false }: { down?: boolean }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={down ? { rotate: "90deg" } : undefined}>
    <path d="M3 13L13 3M5 3h8v8" />
  </svg>
);

/**
 * Hero do hub: parte fixa, no layout do mockup do usuário (foto em tela cheia, título à esquerda,
 * menu no topo, contador de universos à direita). Não reage aos universos: só a seção dos portais se transforma.
 */
export function HubHero() {
  return (
    <section className="hhero" aria-labelledby="hero-titulo">
      <div className="hhero__photo" aria-hidden="true">
        <Image src={HERO_PHOTO} alt="" fill sizes="100vw" preload className="hhero__img" />
        <span className="hhero__shade" />
      </div>

      <HubNav />

      <div className="hhero__body">
        <p className="hhero__name">
          <span className="sr-only">Mauro Junior</span>
          <span aria-hidden="true">
            {[..."Mauro Junior"].map((c, i) => (
              <span key={i} className="hhero__ch" style={{ "--i": i } as React.CSSProperties}>
                {c === " " ? " " : c}
              </span>
            ))}
          </span>
          <small>Tatuador profissional</small>
        </p>
        <h1 id="hero-titulo" className="hhero__title">
          <i className="hhero__sq" aria-hidden="true" />
          <span>Arte que</span>
          <span>
            fica pra <em>sempre.</em>
          </span>
        </h1>
        <p className="hhero__lead">Transforme suas ideias em arte comigo, um tatuador que entende de verdade o que faz.</p>
        <a className="hhero__go" href="#estilos">
          Explore os estilos <Arrow down />
        </a>
      </div>

      <p className="hhero__tag">Santa Isabel, SP</p>
    </section>
  );
}
