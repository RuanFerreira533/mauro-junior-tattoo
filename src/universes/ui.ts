import type { UniverseUI } from "./types";
import { AnimeAmbient } from "./anime/Ambient";
import { AnimeArt } from "./anime/Art";
import { BlackworkAmbient } from "./blackwork/Ambient";
import { BlackworkPortalArt } from "./blackwork/PortalArt";
import { BlackworkArt } from "./blackwork/Art";
import { FinelineAmbient } from "./fineline/Ambient";
import { FinelineArt } from "./fineline/Art";
import { RealismoAmbient } from "./realismo/Ambient";
import { RealismoPortalArt } from "./realismo/PortalArt";
import { RealismoArt } from "./realismo/Art";
import "./anime/theme.css";
import "./blackwork/theme.css";
import "./realismo/theme.css";
import "./fineline/theme.css";

// Componentes de cada universo (atmosfera, desenho do portal, arte provisória). A galeria é única e compartilhada.
export const ui: Record<string, UniverseUI> = {
  anime: { Ambient: AnimeAmbient, Art: AnimeArt },
  fineline: { Ambient: FinelineAmbient, Art: FinelineArt },
  blackwork: {
    Ambient: BlackworkAmbient,
    PortalArt: BlackworkPortalArt,
    Art: BlackworkArt,
  },
  realismo: {
    Ambient: RealismoAmbient,
    PortalArt: RealismoPortalArt,
    Art: RealismoArt,
  },
};
