import Link from "next/link";
import { universes } from "@/universes";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

const INSTAGRAM = INSTAGRAM_URL;
const WHATSAPP = whatsappUrl();
const BUDGET = whatsappUrl("Oi, Mauro! Quero pedir um orçamento.");

/**
 * Rodapé do hub: parte própria, fixa, fora da transformação dos universos.
 * Estrutura inspirada num footer de 4 colunas (21st.dev "footer-section"), reescrita em CSS puro.
 * Só usa fatos confirmados (nome, cidade, Instagram). Endereço, telefone e horários entram quando confirmados.
 * Sem newsletter (não há back-end) e sem links para páginas que não existem.
 */
export function HubFooter() {
  return (
    <footer className="hfoot">
      <div className="hfoot__grid">
        <div className="hfoot__col hfoot__col--cta">
          <h2 className="hfoot__title">
            Vamos transformar a ideia em <em>decalque?</em>
          </h2>
          <p className="hfoot__text">Conte o que você imagina e a gente desenha junto, do rascunho até a pele.</p>
          <a className="hfoot__btn" href={BUDGET} target="_blank" rel="noopener noreferrer">
            Pedir orçamento
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 13L13 3M5 3h8v8" />
            </svg>
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
          <p className="hfoot__note">
            Ou chame no{" "}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            .
          </p>
          <span className="hfoot__glow" aria-hidden="true" />
        </div>

        <nav className="hfoot__col" aria-label="Links rápidos">
          <h3 className="hfoot__h">Links rápidos</h3>
          <ul className="hfoot__list">
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/#sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/#estilos">Estilos</Link>
            </li>
            <li>
              <Link href="/#contato">Contato</Link>
            </li>
            <li>
              <Link href="/#avaliacoes">Avaliações</Link>
            </li>
            <li>
              <Link href="/#local">Local</Link>
            </li>
            {universes.map((u) => (
              <li key={u.slug}>
                <Link href={`/${u.slug}`}>{u.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hfoot__col">
          <h3 className="hfoot__h">Contato</h3>
          <address className="hfoot__list hfoot__address">
            <p>Mauro Junior · Tatuador</p>
            <p>Santa Isabel, SP</p>
            <p>
              WhatsApp:{" "}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                {WHATSAPP_DISPLAY}
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                @maurojr_tattoo
              </a>
            </p>
          </address>
        </div>

        <div className="hfoot__col">
          <h3 className="hfoot__h">Siga</h3>
          <a className="hfoot__social" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram do Mauro Junior (abre em nova aba)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hfoot__bar">
        <p>© {new Date().getFullYear()} Mauro Junior · Todos os direitos reservados</p>
        <p>Protótipo · imagens e textos de exemplo</p>
      </div>
    </footer>
  );
}
