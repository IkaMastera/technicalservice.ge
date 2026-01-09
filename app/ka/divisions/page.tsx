import type { Metadata } from "next";
import DivisionsPage from "@/components/seperate-pages/divisions/divisions-page";

export const metadata: Metadata = {
  title: "დივიზიონები | TSC — Technical Service Company",
  description: "TSC-ის დივიზიონები და პლატფორმები: Control4 Smart Systems და Fiix.ge.",
  alternates: {
    canonical: "https://technicalservice.ge/ka/divisions",
    languages: {
      en: "https://technicalservice.ge/en/divisions",
      ka: "https://technicalservice.ge/ka/divisions",
    },
  },
};

export default function Page() {
  return <DivisionsPage lang="ka" />;
}
