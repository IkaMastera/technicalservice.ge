import type { Metadata } from "next";
import ServicesIndex from "@/components/seperate-pages/services/services-index";

export const metadata: Metadata = {
  title: "MEP Engineering Services in Georgia | TSC",
  description:
    "MEP engineering services across Georgia: fire safety systems, electrical installations, HVAC & ventilation, plumbing, CCTV, and low-voltage automation — designed, installed, and maintained for reliable operation and compliance.",

  alternates: {
    canonical: "https://technicalservice.ge/en/services",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return <ServicesIndex />;
}