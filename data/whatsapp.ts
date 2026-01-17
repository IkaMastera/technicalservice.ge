export const TSC_WHATSAPP = {
  phoneE164Digits: "995511223366",

  message:
    "Hello TSC."
};

export function buildWhatsAppUrl(phoneE164Digits: string, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phoneE164Digits}?text=${text}`;
}