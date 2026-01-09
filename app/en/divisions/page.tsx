import type { Metadata } from "next";
import DivisionsPage from "@/components/seperate-pages/divisions/divisions-page";

export const metadata: Metadata = {
  title: "Divisions | TSC — Technical Service Company",
  description:
    "Specialized divisions under TSC, including Control4 Smart Systems and the Fiix engineering platform.",
  alternates: {
    canonical: "https://technicalservice.ge/en/divisions",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <DivisionsPage lang="en" />;
}