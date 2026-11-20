import Image from "next/image";
import type { ComponentType } from "react";
import type { Work } from "@/universes/types";

/**
 * Imagem de uma obra. Com `work.image.src` (foto real em /public/universos/<slug>/) usa next/image (lazy, AVIF/WebP);
 * sem ela, mostra a arte provisória do universo, sempre rotulada PLACEHOLDER (D-35).
 */
export function WorkArt({ work, Draw, sizes }: { work: Work; Draw: ComponentType<{ seed: string }>; sizes: string }) {
  const { src, alt } = work.image;
  if (src) {
    return (
      <span className="art">
        <Image src={src} alt={alt} fill sizes={sizes} className="art__img" />
      </span>
    );
  }
  return (
    <span className="art" role="img" aria-label={alt}>
      <Draw seed={work.id} />
      <span className="art__tag" aria-hidden="true">
        PLACEHOLDER
      </span>
    </span>
  );
}
