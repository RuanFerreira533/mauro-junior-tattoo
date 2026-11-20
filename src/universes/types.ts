import type { ComponentType } from "react";

/** Uma obra. `image.src` vazio = arte provisória (placeholder); preencha quando houver foto real. */
export type Work = {
  id: string;
  title: string;
  note: string;
  meta?: { region: string; size: string; sessions: string };
  image: { src?: string; alt: string; width?: number; height?: number };
};

export type Universe = {
  slug: string;
  name: string;
  order: number;
  /** Frase curta mostrada no hub durante o preview. */
  kicker: string;
  description: string;
  info: { title: string; text: string }[];
  cta: { label: string; hint: string };
  /** Portal do hub: `art` = arte recortada sem texto (WebP/PNG com alfa); `jp` = rótulo opcional em japonês. */
  portal?: { art?: string; jp?: string };
  works: Work[];
  /** true enquanto textos e obras forem de exemplo. */
  mock: boolean;
};

export type UniverseUI = {
  /** `on` = universo visível agora (permite pausar trabalho pesado, como WebGL). */
  Ambient: ComponentType<{ on?: boolean }>;
  /** Desenho do portal quando ainda não há arte recortada. */
  PortalArt?: ComponentType;
  Art: ComponentType<{ seed: string }>;
};
