"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

/**
 * Ano atual. O rodapé é gerado na publicação, então um `new Date()` no servidor ficaria preso ao ano do deploy.
 * Aqui o servidor manda o ano do build e, logo após a hidratação, o navegador troca pelo ano de hoje.
 */
export function Year() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{year}</>;
}
