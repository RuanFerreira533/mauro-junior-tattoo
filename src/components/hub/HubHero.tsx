import Image from "next/image";
import Link from "next/link";
import { universes } from "@/universes";
import { whatsappUrl } from "@/lib/contact";

// Foto da hero: para trocar, substitua public/hero/mjr.png (ou mude o caminho aqui).
const HERO_PHOTO = "/hero/mjr.png";
const CONTACT_URL = whatsappUrl("Oi, Mauro! Quero pedir um orçamento.");

const Arrow = ({ down = false }: { down?: boolean }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={down ? { rotate: "90deg" } : undefined}>
    <path d="M3 13L13 3M5 3h8v8" />
  </svg>
);

/** Logo "M" enviada pelo usuário (PNG branco com transparência, em public/brand/logo-m.png). */
const Mark = () => <Image src="/brand/logo-m.png" alt="" width={640} height={366} className="hnav__mark" />;

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

      <header className="hnav">
        <Link className="hnav__logo" href="/" aria-label="Mauro Junior, início">
          <Mark />
        </Link>
        <nav className="hnav__links" aria-label="Principal">
          <a href="#estilos">Estilos</a>
          <a className="hnav__cta" href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
            Orçamento <Arrow />
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
        </nav>
      </header>

      <div className="hhero__body">
        <p className="hhero__kicker">
          <span aria-hidden="true" />
          Tatuador profissional
        </p>
        <h1 id="hero-titulo" className="hhero__title">
          <i className="hhero__sq" aria-hidden="true" />
          <span>Arte que</span>
          <span>
            fica pra <em>sempre.</em>
          </span>
        </h1>
        <p className="hhero__lead">Transforme suas ideias em arte com um tatuador que entende de verdade sobre o que faz.</p>
        <a className="hhero__go" href="#estilos">
          Explore os estilos <Arrow down />
        </a>
      </div>

      <ol className="hhero__count" aria-label="Universos">
        {universes.map((u, i) => (
          <li key={u.slug}>
            <a href="#estilos">
              <span className="hhero__count-name">{u.name}</span>
              {String(i + 1).padStart(2, "0")}
              <span className="sr-only"> · universo {u.name}</span>
            </a>
          </li>
        ))}
      </ol>

      <p className="hhero__tag">Santa Isabel-SP</p>
    </section>
  );
}
