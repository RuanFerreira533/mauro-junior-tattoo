import styles from "./hubmore.module.css";

// Link público do perfil no Google (nota e avaliações).
export const GOOGLE_URL = "https://share.google/ZQ9JGUFOUxUFn3LZc";

type Review = { quote: string; name: string };

// Comentários reais do Google (texto original). Nome abreviado por privacidade.
const REVIEWS: Review[] = [
  {
    quote:
      "Queria deixar registrado o quanto fiquei satisfeito com o trabalho. Profissionalismo desde o atendimento até o resultado final. Traço firme, atenção aos detalhes e muito cuidado em cada etapa. Dá pra ver que não é só tatuagem, é arte com responsabilidade. Recomendo de olhos fechados.",
    name: "Marcos C.",
  },
  { quote: "Bem atencioso, atende todos os nossos pedidos, dedicado e ágil.", name: "Silvana B." },
  { quote: "Adorei a experiência, voltarei mais vezes. Tatuador muito simpático e muito profissional.", name: "Jailane S." },
  { quote: "Ótimo profissional, já é a segunda tatuagem que fiz com ele, super profissional e um ótimo atendimento.", name: "Fabiano R." },
  { quote: "O trabalho é top, atendimento de primeira qualidade.", name: "Vinícius R." },
  {
    quote:
      "Ótima, lugar limpo e bem cuidado, materiais estéreis e boa recepção. Além de um ótimo profissionalismo. Ansioso para o retorno para mais sessões de tatuagens.",
    name: "Carlos Eduardo",
  },
  {
    quote: "Eu super amei, com certeza voltarei mais vezes. Conversa boa, sinceridade e o melhor de tudo, tatuagens impecáveis.",
    name: "Heloísa S.",
  },
  {
    quote: "Atendimento rápido, local bem organizado e muito gente boa, entregou o que foi pedido com excelência, traços finos e delicados.",
    name: "Angelica J.",
  },
  {
    quote: "Um ótimo tatuador. Gostei já na primeira tattoo. As próximas sem dúvida nenhuma serão com ele. Sucesso, continue com o excelente trabalho.",
    name: "Joao Antonio",
  },
];

const COLUMNS = [REVIEWS.slice(0, 3), REVIEWS.slice(3, 6), REVIEWS.slice(6, 9)];

function Card({ r }: { r: Review }) {
  return (
    <figure className={styles.card}>
      <blockquote>{r.quote}</blockquote>
      <figcaption>
        <span className={styles.avatar} aria-hidden="true">
          {r.name.charAt(0)}
        </span>
        <cite>{r.name}</cite>
      </figcaption>
    </figure>
  );
}

/** Uma coluna que rola sozinha na vertical: a lista é repetida e a repetição some para leitores de tela. */
function Column({ items, className, speed }: { items: Review[]; className?: string; speed: string }) {
  return (
    <div className={`${styles.col} ${className ?? ""}`}>
      <div className={styles.track} style={{ "--dur": speed } as React.CSSProperties}>
        {items.map((r) => (
          <Card key={r.name} r={r} />
        ))}
        <div className={styles.dup} aria-hidden="true">
          {items.map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Avaliações: nota e quantidade vêm do perfil no Google (4,9 com 63 avaliações); textos são comentários reais.
 * Colunas rolando na vertical (ideia do "testimonials" do 21st.dev, em CSS puro, sem Tailwind nem Radix).
 */
export function HubReviews() {
  return (
    <section id="avaliacoes" className="band hreviews" aria-labelledby="avaliacoes-titulo">
      <div className={`band__in ${styles.reviewsIn}`}>
        <div className={styles.head}>
          <h2 id="avaliacoes-titulo" className="band__title">
            <i className="band__sq" aria-hidden="true" />
            Quem já tatuou comigo
          </h2>
          <div className={styles.score}>
            <strong>4,9</strong>
            <span>
              63 avaliações no Google
              <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">
                Ver todas
                <span className="sr-only"> no Google (abre em nova aba)</span>
              </a>
            </span>
          </div>
        </div>

        <div className={styles.cols}>
          {/* telas largas: 3 colunas; telas estreitas: 1 coluna com todas */}
          <Column items={COLUMNS[0]} className={styles.wide} speed="42s" />
          <Column items={COLUMNS[1]} className={`${styles.wide} ${styles.rev}`} speed="56s" />
          <Column items={COLUMNS[2]} className={styles.wide} speed="48s" />
          <Column items={REVIEWS} className={styles.narrow} speed="90s" />
        </div>
      </div>
    </section>
  );
}
