import type { Metadata } from "next";

import HeroSlider from "@/components/main-page-sections/hero-slider";
import HeroVideo from "@/components/main-page-sections/main-hero";
import WhyTSCSection from "@/components/main-page-sections/why-tsc-section";
import AboutUsSection from "@/components/main-page-sections/about-us";
import ContactUsSection from "@/components/main-page-sections/contact-us";

export const metadata: Metadata = {
  title: "MEP Engineering & Technical Services in Georgia | TSC",
  description:
    "Professional MEP engineering services in Georgia: fire safety systems, electrical installations, HVAC & ventilation, CCTV, and low-voltage automation for commercial and residential buildings.",

  alternates: {
    canonical: "https://technicalservice.ge/en",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://technicalservice.ge/en",
    siteName: "TSC — Technical Service Company",
    title: "MEP Engineering & Technical Services in Georgia | TSC",
    description:
      "Engineering, installation, and maintenance of fire safety, electrical, HVAC, CCTV, and automation systems across Georgia.",
    images: [
      {
        url: "https://technicalservice.ge/media/images/og/home.webp",
        width: 1200,
        height: 630,
        alt: "TSC Engineering — Fire, Electrical, HVAC & Automation Systems",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MEP Engineering & Technical Services in Georgia | TSC",
    description:
      "Certified engineering services for fire safety, electrical, HVAC, and automation systems across Georgia.",
    images: ["https://technicalservice.ge/media/images/og/home.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function EnHomePage() {
  return (
    <>
      <HeroSlider lang="en" />
      <HeroVideo lang="en" />
      <WhyTSCSection lang="en" />
      <AboutUsSection lang="en" />
      <ContactUsSection lang="en" />
    </>
  );
}