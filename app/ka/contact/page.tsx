import type { Metadata } from "next";
import ContactPage from "@/components/seperate-pages/contact/contact-page";

export const metadata: Metadata = {
  title: "კონტაქტი | TSC — Technical Service Company",
  description:
    "დაგვიკავშირდით TSC-ს — ობიექტის დათვალიერება, შეთავაზება და მომსახურება: ხანძარსაწინააღმდეგო, ელექტრო, HVAC, CCTV და ავტომატიკა საქართველოში.",
  alternates: {
    canonical: "https://technicalservice.ge/ka/contact",
    languages: {
      en: "https://technicalservice.ge/en/contact",
      ka: "https://technicalservice.ge/ka/contact",
    },
  },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "https://technicalservice.ge/ka/contact",
    siteName: "TSC — Technical Service Company",
    title: "კონტაქტი | TSC — Technical Service Company",
    description:
      "დაგვიკავშირდით TSC-ს — ობიექტის დათვალიერება, შეთავაზება და მომსახურება საქართველოში.",
  },
  twitter: {
    card: "summary_large_image",
    title: "კონტაქტი | TSC — Technical Service Company",
    description:
      "დაგვიკავშირდით TSC-ს — ობიექტის დათვალიერება, შეთავაზება და მომსახურება საქართველოში.",
  },
};

export default function Page() {
  return <ContactPage lang="ka" />;
}
