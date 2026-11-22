"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { universes } from "@/universes";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";
import s from "./contact.module.css";

const STYLES = ["Ainda não sei", ...universes.map((u) => u.name), "Outro"];

const TITLE = ["Peça", "seu", "orçamento."];

// O caminho real do pedido: faz sentido numerar, é uma sequência.
const STEPS = [
  { t: "Conte a ideia", d: "Escreva o que você imagina, o tamanho e onde quer fazer." },
  { t: "Eu faço o desenho", d: "Depois eu passo o valor e a gente ajusta o desenho junto." },
  { t: "Combine o dia", d: "Fechou? A gente marca o horário. Eu atendo somente com agendamento." },
];

/**
 * Contato dinâmico: o visitante descreve a ideia e o site monta a mensagem pronta para o WhatsApp do Mauro.
 * Nada é guardado nem enviado a servidor: a mensagem só sai quando a pessoa clica em enviar.
 * Visual: a ficha é um papel (como o do decalque) preso com fita, sobre o fundo âmbar.
 */
export function HubContact() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState(STYLES[0]);
  const [body, setBody] = useState("");
  const [idea, setIdea] = useState("");

  function send(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Oi, Mauro! ${name.trim() ? `Meu nome é ${name.trim()}. ` : ""}Quero pedir um orçamento.`,
      style !== STYLES[0] && `Estilo: ${style}`,
      body.trim() && `Região do corpo: ${body.trim()}`,
      idea.trim() && `Minha ideia: ${idea.trim()}`,
    ].filter(Boolean) as string[];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="band hcontact" aria-labelledby="contato-titulo">
      <div className={`band__in ${s.wrap}`}>
        <div className={s.intro}>
          <h2 id="contato-titulo" className={s.title}>
            {TITLE.map((w, i) => (
              <span key={w} className={s.word}>
                <span style={{ "--i": i } as CSSProperties}>{w}</span>{" "}
              </span>
            ))}
          </h2>

          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.t}>
                <span className={s.num} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <strong>{st.t}</strong>
                  <p>{st.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className={s.callout}>Prefere falar direto?</p>
          <a className={s.phone} href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            {WHATSAPP_DISPLAY}
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
          <p className={s.alt}>
            Ou chame no Instagram:{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              @maurojr_tattoo
            </a>
          </p>
        </div>

        <form className={s.card} onSubmit={send}>
          <span className={s.tape} aria-hidden="true" />
          <h3 className={s.cardTitle}>Sua ficha de orçamento</h3>

          <label className={s.field}>
            <span>Como posso te chamar?</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
          </label>

          <fieldset className={s.field}>
            <legend>Que estilo combina com a sua ideia?</legend>
            <div className={s.chips}>
              {STYLES.map((st) => (
                <label key={st} className={s.chip}>
                  <input type="radio" name="estilo" value={st} checked={style === st} onChange={() => setStyle(st)} />
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className={s.field}>
            <span>Onde no corpo?</span>
            <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Antebraço, costela, perna…" />
          </label>

          <label className={s.field}>
            <span>Conte a sua ideia</span>
            <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} placeholder="O que você imagina e o tamanho aproximado. As referências você manda depois, no WhatsApp." />
          </label>

          <button type="submit" className={s.send}>
            Pedir orçamento no WhatsApp
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 13L13 3M5 3h8v8" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
