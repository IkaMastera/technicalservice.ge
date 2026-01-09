import type { Metadata } from "next";
import AboutSection from "@/components/seperate-pages/about/about-page";

export const metadata: Metadata = {
  title: "TSC-ის შესახებ | Technical Service Company",
  description:
    "გაიგეთ მეტი TSC-ის შესახებ — უსაფრთხოებაზე ორიენტირებული ინჟინერია, დოკუმენტირებული დელივერი და ინსპექციისთვის მზად ინტეგრაცია საქართველოში.",
  alternates: {
    canonical: "https://technicalservice.ge/ka/about",
    languages: {
      en: "https://technicalservice.ge/en/about",
      ka: "https://technicalservice.ge/ka/about",
    },
  },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "https://technicalservice.ge/ka/about",
    siteName: "TSC — Technical Service Company",
    title: "TSC-ის შესახებ | Technical Service Company",
    description:
      "უსაფრთხოებაზე ორიენტირებული ინჟინერია, დოკუმენტირებული დელივერი და ინსპექციისთვის მზად ინტეგრაცია საქართველოში.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSC-ის შესახებ | Technical Service Company",
    description:
      "უსაფრთხოებაზე ორიენტირებული ინჟინერია, დოკუმენტირებული დელივერი და ინსპექციისთვის მზად ინტეგრაცია საქართველოში.",
  },
};

export default function Page() {
  return (
    <main>
      <AboutSection lang="ka" />
    </main>
  );
}