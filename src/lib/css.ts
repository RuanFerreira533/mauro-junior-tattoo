import type { CSSProperties } from "react";

/** Permite passar custom properties no atributo style com tipagem. */
export const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;
