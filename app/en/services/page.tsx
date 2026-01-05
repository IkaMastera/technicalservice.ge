import type { Metadata } from "next";
import ServicesIndex from "@/components/seperate-pages/services/services-index";

export const metadata: Metadata = {
  title: "Services | Technical Service Company",
  description:
    "Engineering services: fire systems, electrical, HVAC, plumbing, CCTV, automation, and more — delivered with inspection-ready discipline.",
};

export default function ServicesPage() {
  return <ServicesIndex />;
}