export const CONTACT = {
  company: "Technical Service Company",
  address: {
    line: "Zh. Shartava Str. #25, Batumi, Georgia",
    lat: 41.63124877209199,
    lng: 41.624612006746894,
  },
  emailPrimary: "info@technicalservice.ge",
  emailSecondary: "t.kakhidze@technicalservice.ge",
  phones: ["+995 511 22 33 66", "+995 511 22 33 55"],
  website: "technicalservice.ge",
  note: "Response time depends on ongoing site work. For urgent issues, call directly.",
};

// Helpers (clean links)
export const CONTACT_LINKS = {
  mailto: (email: string) => `mailto:${email}`,
  tel: (phone: string) => `tel:${phone.replace(/\s+/g, "")}`,
  mapsCoords: (lat: number, lng: number) =>
    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
};