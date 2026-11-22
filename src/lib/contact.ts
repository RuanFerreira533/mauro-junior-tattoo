// Canais de contato (confirmados pelo usuário em 2026-11-19).
export const INSTAGRAM_URL = "https://www.instagram.com/maurojr_tattoo/";
export const WHATSAPP_DISPLAY = "(11) 95460-0110";

/** Link do WhatsApp com mensagem pré-preenchida (opcional). */
export const whatsappUrl = (message?: string) =>
  `https://wa.me/5511954600110${message ? `?text=${encodeURIComponent(message)}` : ""}`;
