import { Mandala } from "./Mandala";

/** Interior do portal Blackwork: duas folhas pretas que se abrem e revelam a mandala. */
export function BlackworkPortalArt() {
  return (
    <>
      <Mandala className="pb-mandala" />
      <span className="pb-half pb-half--l" />
      <span className="pb-half pb-half--r" />
      <span className="pb-slit" />
    </>
  );
}
