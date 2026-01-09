import type { Metadata } from "next";
import PortfolioGrid from "@/components/seperate-pages/portfolio/portfolio-component";

export const metadata: Metadata = {
  title: "Engineering Project Portfolio | TSC",
  description:
    "Selected engineering projects by TSC, including fire safety systems, electrical installations, HVAC, CCTV, and automation solutions for commercial and residential buildings in Georgia.",

  alternates: {
    canonical: "https://technicalservice.ge/en/portfolio",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PortfolioPage() {
  return <PortfolioGrid />;
}