import type { Metadata } from "next";
import AboutSection from "@/components/seperate-pages/about/about-page";

export const metadata: Metadata = {
  title: "About TSC | Engineering & Technical Services in Georgia",
  description:
    "Learn about TSC — Technical Service Company. An engineering contractor delivering fire safety, electrical, HVAC, and automation systems for residential and commercial buildings across Georgia.",

  alternates: {
    canonical: "https://technicalservice.ge/en/about",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutSection lang="en"/>;
}