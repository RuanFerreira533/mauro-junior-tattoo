import type { Universe } from "./types";
import { anime } from "./anime";
import { blackwork } from "./blackwork";
import { realismo } from "./realismo";
import { fineline } from "./fineline";

// Para adicionar um universo (ex.: Tribal): crie a pasta, adicione UMA linha aqui e UMA em ui.ts.
export const universes: Universe[] = [anime, fineline, blackwork, realismo].sort((a, b) => a.order - b.order);

export const getUniverse = (slug: string | null | undefined) => universes.find((u) => u.slug === slug);
