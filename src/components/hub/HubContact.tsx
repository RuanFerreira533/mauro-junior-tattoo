"use client";

import { useState, type FormEvent } from "react";
import { universes } from "@/universes";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

/**
 * Contato dinâmico: o visitante descreve a ideia e o site monta a mensagem pronta para o WhatsApp do Mauro.
 * Nada é guardado nem enviado a servidor: a mensagem só vai para o WhatsApp quando a pessoa clica.
 */
export function HubContact() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [body, setBody] = useState("");
  const [idea, setIdea] = useState("");

  function send(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Oi, Mauro! ${name.trim() ? `Meu nome é ${name.trim()}. ` : ""}Quero pedir um orçamento.`,
      style && `Estilo: ${style}`,
      body.trim() && `Região do corpo: ${body.trim()}`,
      idea.trim() && `Minha ideia: ${idea.trim()}`,
    ].filter(Boolean) as string[];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="hcontact" aria-labelledby="contato-titulo">
      <div className="hcontact__intro">
        <p className="habout__kicker">
          <span aria-hidden="true" />
          Contato
        </p>
        <h2 id="contato-titulo" className="habout__title">
          Conte a sua <em>ideia.</em>
        </h2>
        <p>Preencha o que souber. A gente monta a mensagem e você confere antes de enviar pelo WhatsApp.</p>
        <ul className="hcontact__list">
          <li>
            <span>WhatsApp</span>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              {WHATSAPP_DISPLAY}
            </a>
          </li>
          <li>
            <span>Instagram</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              @maurojr_tattoo
            </a>
          </li>
          <li>
            <span>Cidade</span>
            <b>Santa Isabel, SP</b>
          </li>
        </ul>
      </div>

      <form className="hcontact__form" onSubmit={send}>
        <label>
          Seu nome
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
        </label>
        <label>
          Estilo
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">Ainda não sei</option>
            {universes.map((u) => (
              <option key={u.slug} value={u.name}>
                {u.name}
              </option>
            ))}
            <option value="Outro">Outro</option>
          </select>
        </label>
        <label>
          Região do corpo
          <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Ex.: antebraço" />
        </label>
        <label className="hcontact__wide">
          Sua ideia
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={4} placeholder="Conte o que você imagina, tamanho aproximado, referências…" />
        </label>
        <button type="submit" className="hfoot__btn">
          Enviar pelo WhatsApp
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M3 13L13 3M5 3h8v8" />
          </svg>
        </button>
      </form>
    </section>
  );
}
