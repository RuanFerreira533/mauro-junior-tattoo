import { useSyncExternalStore } from "react";

const Q = "(hover: hover) and (pointer: fine)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(Q);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Capacidade (não user agent): o dispositivo realmente tem hover e ponteiro fino? */
export function useCanHover() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(Q).matches, () => true);
}
