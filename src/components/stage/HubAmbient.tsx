import { vars } from "@/lib/css";

/** Atmosfera base do hub (verde, provisória: D-12). Névoa lenta e brilho difuso. */
export function HubAmbient() {
  return (
    <>
      <div className="par" style={vars({ "--depth": -14 })}>
        <div className="h-glow" />
      </div>
      <div className="par" style={vars({ "--depth": 22 })}>
        <div className="h-mist h-mist--a" />
        <div className="h-mist h-mist--b" />
      </div>
    </>
  );
}
