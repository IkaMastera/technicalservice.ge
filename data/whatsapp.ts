export const TSC_WHATSAPP = {
  phoneE164Digits: "995511223366",

  message:
    "Hello TSC."
};

export function buildWhatsAppUrl(phoneE164Digits: string, message: string) {
  const text = encodeURIComponent(message);
  // wa.me works everywhere and opens app on mobile
  return `https://wa.me/${phoneE164Digits}?text=${text}`;
}