"use client";

import { useState, type FormEvent } from "react";
import { universes } from "@/universes";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

const STYLES = ["Ainda não sei", ...universes.map((u) => u.name), "Outro"];

/**
 * Contato dinâmico: o visitante descreve a ideia e o site monta a mensagem pronta para o WhatsApp do Mauro.
 * Nada é guardado nem enviado a servidor: a mensagem só sai quando a pessoa clica em enviar.
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
      <div className="band__in hcontact__in">
        <div className="hcontact__intro">
          <h2 id="contato-titulo" className="band__title">
            <i className="band__sq" aria-hidden="true" />
            Conte a ideia. A gente desenha junto.
          </h2>
          <a className="hcontact__number" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            {WHATSAPP_DISPLAY}
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
          <p className="hcontact__sub">
            Atendimento em Santa Isabel, SP. Prefere o Instagram?{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              @maurojr_tattoo
            </a>
          </p>
        </div>

        <form className="hcontact__form" onSubmit={send}>
          <label className="hfield">
            <span>Seu nome</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
          </label>

          <fieldset className="hfield hfield--chips">
            <legend>Estilo</legend>
            <div className="hchips">
              {STYLES.map((s) => (
                <label key={s} className="hchip">
                  <input type="radio" name="estilo" value={s} checked={style === s} onChange={() => setStyle(s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="hfield">
            <span>Região do corpo</span>
            <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Antebraço, costela, perna…" />
          </label>

          <label className="hfield">
            <span>Sua ideia</span>
            <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} placeholder="O que você imagina, tamanho aproximado, referências…" />
          </label>

          <button type="submit" className="hfoot__btn">
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
