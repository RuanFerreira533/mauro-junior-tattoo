import { SilkCanvas } from "./SilkCanvas";

/** Blackwork: seda escura em movimento lento (canvas), vinheta pesada e cantos de moldura. */
export function BlackworkAmbient({ on = true }: { on?: boolean }) {
  return (
    <>
      <SilkCanvas on={on} />
      <div className="b-vignette" />
      <span className="b-corner b-corner--tl" />
      <span className="b-corner b-corner--tr" />
      <span className="b-corner b-corner--bl" />
      <span className="b-corner b-corner--br" />
    </>
  );
}
