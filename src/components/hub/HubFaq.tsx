import { universes } from "@/universes";
import { whatsappUrl } from "@/lib/contact";
import styles from "./hubmore.module.css";

const STYLES = universes.map((u) => u.name).join(", ");

// Respostas provisórias, na voz do Mauro: confirmar com ele antes de divulgar (D-69).
const FAQ: { q: string; a: string }[] = [
  {
    q: "Como faço para agendar?",
    a: "Chame no WhatsApp ou preencha o formulário de contato aqui no site. Você me conta a ideia e a gente combina o dia e o horário. Eu atendo somente com agendamento.",
  },
  {
    q: "Quanto custa uma tatuagem?",
    a: "O valor depende do tamanho, da região do corpo e do nível de detalhe. Depois de ver a sua ideia, eu passo o orçamento pelo WhatsApp, sem compromisso.",
  },
  {
    q: "Você faz cobertura de tatuagem antiga?",
    a: "Faço. Cada caso é avaliado individualmente, porque o resultado depende do desenho que já está na pele. Me mande uma foto da tatuagem atual e a ideia que você tem para cobrir.",
  },
  {
    q: "Quais estilos você faz?",
    a: `Trabalho com ${STYLES}, e também com letras e homenagens. Se a sua ideia for diferente, é só perguntar.`,
  },
  {
    q: "Posso levar uma referência?",
    a: "Pode, e ajuda muito. Foto, desenho ou até um rascunho seu: quanto mais referência, mais fácil acertar o desenho. A gente ajusta o tamanho e o encaixe no corpo juntos.",
  },
  {
    q: "Como cuido da tatuagem depois?",
    a: "No fim da sessão eu passo as orientações. Em geral: lavar com sabonete neutro, hidratar e evitar sol, piscina e mar enquanto cicatriza. Qualquer dúvida, é só chamar.",
  },
];

/** Perguntas frequentes: lista que abre e fecha com <details> nativo (sem JavaScript), uma aberta por vez. */
export function HubFaq() {
  return (
    <section id="perguntas" className="band hfaq" aria-labelledby="perguntas-titulo">
      <div className={`band__in ${styles.faqIn}`}>
        <div className={styles.faqIntro}>
          <h2 id="perguntas-titulo" className="band__title">
            <i className="band__sq" aria-hidden="true" />
            Perguntas frequentes
          </h2>
          <p>Não achou a sua dúvida? Me chame no WhatsApp que eu respondo.</p>
          <a className="hfoot__btn" href={whatsappUrl("Oi, Mauro! Tenho uma dúvida.")} target="_blank" rel="noopener noreferrer">
            Tirar dúvida
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
        </div>

        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} name="faq" className={styles.item}>
              <summary>
                <span>{f.q}</span>
                <i className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
