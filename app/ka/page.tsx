import type { Metadata } from "next";

import AboutUsSection from "@/components/main-page-sections/about-us";
import HeroVideo from "@/components/main-page-sections/main-hero";
import PortfolioPreview from "@/components/main-page-sections/main-portfolio";
import ServicesGridSection from "@/components/main-page-sections/main-services";
import ContactUsSection from "@/components/main-page-sections/contact-us";

export const metadata: Metadata = {
  title: "საინჟინრო და ტექნიკური MEP სერვისები საქართველოში | TSC",
  description:
    "პროფესიონალური MEP საინჟინრო სერვისები საქართველოში: სახანძრო უსაფრთხოების სისტემები, ელექტრო მონტაჟი, HVAC/ვენტილაცია, CCTV და დაბალი ძაბვის ავტომატიკა კომერციული და საცხოვრებელი ობიექტებისთვის.",

  alternates: {
    canonical: "https://technicalservice.ge/ka",
  },

  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "https://technicalservice.ge/ka",
    siteName: "TSC — Technical Service Company",
    title: "საინჟინრო და ტექნიკური MEP სერვისები საქართველოში | TSC",
    description:
      "საინჟინრო სამუშაოები, მონტაჟი და მოვლა: სახანძრო უსაფრთხოება, ელექტრო, HVAC, CCTV და ავტომატიკა საქართველოს მასშტაბით.",
    images: [
      {
        url: "https://technicalservice.ge/media/images/og/home.webp",
        width: 1200,
        height: 630,
        alt: "TSC საინჟინრო სისტემები — ხანძარსაწინააღმდეგო, ელექტრო, HVAC & ავტომატიკა",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "საინჟინრო და ტექნიკური MEP სერვისები საქართველოში | TSC",
    description:
      "სერტიფიცირებული სერვისები: სახანძრო უსაფრთხოება, ელექტრო, HVAC და ავტომატიკა საქართველოს მასშტაბით.",
    images: ["https://technicalservice.ge/media/images/og/home.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function KaHomePage() {
  return (
    <>
      <HeroVideo lang="ka" />
      <AboutUsSection lang="ka" />
      <ServicesGridSection lang="ka" />
      <PortfolioPreview lang="ka" />
      <ContactUsSection lang="ka"/>
    </>
  );
}