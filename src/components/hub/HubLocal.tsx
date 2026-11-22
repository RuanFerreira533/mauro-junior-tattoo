import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";
import styles from "./hubmore.module.css";

const STREET = "R. Pref. Arthur José da Costa, 191";
const AREA = "Parque São Benedito, Santa Isabel, SP, 07500-000";
const QUERY = encodeURIComponent(`Mauro Jr Tattoo, ${STREET}, ${AREA}`);
const ROUTE_URL = `https://www.google.com/maps/dir/?api=1&destination=${QUERY}`;
const MAP_URL = `https://www.google.com/maps?q=${QUERY}&output=embed`;

/**
 * Local: mapa em largura total com um cartão por cima (em telas estreitas, o cartão vem abaixo do mapa).
 * Endereço e atendimento vêm do perfil no Google. O horário exato não está publicado
 * (só "atendimento mediante agendamento"), então a seção manda combinar pelo WhatsApp.
 */
export function HubLocal() {
  return (
    <section id="local" className="band hlocal" aria-labelledby="local-titulo">
      <div className={styles.localStage}>
        <div className={styles.map}>
          <iframe
            title="Mapa do estúdio Mauro Jr Tattoo em Santa Isabel, SP"
            src={MAP_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className={styles.info}>
          <h2 id="local-titulo" className="band__title">
            <i className="band__sq" aria-hidden="true" />
            Onde me encontrar
          </h2>
          <address className={styles.address}>
            <p>
              <strong>Mauro Jr Tattoo e Piercing</strong>
            </p>
            <p>{STREET}</p>
            <p>{AREA}</p>
          </address>
          <p className={styles.note}>Atendo somente com agendamento. Chame no WhatsApp para combinar o dia e o horário.</p>
          <p className={styles.phone}>{WHATSAPP_DISPLAY}</p>
          <div className={styles.actions}>
            <a className="hfoot__btn" href={ROUTE_URL} target="_blank" rel="noopener noreferrer">
              Como chegar
              <span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </a>
            <a className={styles.ghost} href={whatsappUrl("Oi, Mauro! Quero agendar um horário.")} target="_blank" rel="noopener noreferrer">
              Agendar pelo WhatsApp
              <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
