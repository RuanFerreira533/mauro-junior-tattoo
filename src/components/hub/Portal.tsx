"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Universe } from "@/universes/types";
import { ui } from "@/universes/ui";
import { vars } from "@/lib/css";
import { useStage } from "@/components/stage/StageProvider";
import { useCanHover } from "@/lib/useCanHover";

/**
 * Portal de um universo em forma de pasta de vidro (ideia do "glass-folder-cards" do 21st.dev, em CSS puro).
 * Fundo na cor do universo com a arte recortada (sem texto), três trabalhos reais que saem no hover e um painel
 * de vidro fosco na frente com título e "Ver projetos" (texto real). Sem arte, usa o desenho próprio (PortalArt).
 * É um link real: teclado, leitor de tela e abrir em nova aba continuam funcionando.
 * Estados: idle → preview (hover/foco/centralizado) → opening (clique) → véu. Os outros ficam "dim".
 * O portal carrega o próprio data-theme: mantém cor de destaque do seu universo mesmo com outro em preview.
 */
export function Portal({ u, index }: { u: Universe; index: number }) {
  const { preview, entering, previewIntent, previewLeave, enter } = useStage();
  const canHover = useCanHover();
  const { PortalArt } = ui[u.slug];
  const art = u.portal?.art;
  // três trabalhos reais saem da pasta no hover
  const files = u.works.flatMap((w) => (w.image.src ? [w.image.src] : [])).slice(0, 3);

  const state =
    entering === u.slug ? "opening" : entering ? "dim" : preview === u.slug ? "preview" : preview ? "dim" : "idle";

  const mouseLike = (e: { pointerType: string }) => e.pointerType === "mouse" || e.pointerType === "pen";

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const el = e.currentTarget;
    const byKeyboardOrReader = e.detail === 0;
    // Toque: o primeiro toque centraliza (preview); o toque no card centralizado entra.
    if (!canHover && !byKeyboardOrReader && preview !== u.slug) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      return;
    }
    const r = el.getBoundingClientRect();
    enter(u.slug, byKeyboardOrReader ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: e.clientX, y: e.clientY });
  }

  return (
    <Link
      href={`/${u.slug}`}
      className="portal"
      data-theme={u.slug}
      data-state={state}
      data-art={art ? "image" : "drawn"}
      onClick={onClick}
      onPointerEnter={(e) => mouseLike(e) && previewIntent(u.slug)}
      onPointerLeave={(e) => mouseLike(e) && previewLeave()}
      onFocus={() => canHover && previewIntent(u.slug, true)}
      onBlur={(e) => {
        // Foco indo para outro portal: quem assume chama previewIntent; não deixar o "sair" desfazer.
        const next = e.relatedTarget;
        if (canHover && !(next instanceof Element && next.closest(".portal"))) previewLeave();
      }}
      aria-label={`Ver projetos do universo ${u.name}`}
      draggable={false}
      style={vars({ "--chars": u.name.length })}
    >
      <span className="portal__back" aria-hidden="true" />
      <span className="portal__files" aria-hidden="true">
        {files.map((src, i) => (
          <span key={src} className="portal__sheet" style={vars({ "--i": i })}>
            <Image src={src} alt="" fill sizes="(max-width: 760px) 60vw, 18vw" draggable={false} />
          </span>
        ))}
      </span>
      <span className="portal__artbox" aria-hidden="true">
        {art ? (
          <Image src={art} alt="" fill sizes="(max-width: 760px) 78vw, 25vw" className="portal__art" draggable={false} />
        ) : (
          <span className="portal__scene">{PortalArt && <PortalArt />}</span>
        )}
      </span>
      <span className="portal__front" aria-hidden="true">
        {u.portal?.jp && <span className="portal__jp">{u.portal.jp}</span>}
        <span className="portal__name">{u.name}</span>
        <span className="portal__cta">Ver projetos</span>
        <span className="portal__go">
          <svg viewBox="0 0 16 16" width="55%" height="55%" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M2 8h11M9 4l4 4-4 4" />
          </svg>
        </span>
      </span>
      <span className="sr-only">{String(index + 1).padStart(2, "0")}</span>
    </Link>
  );
}
