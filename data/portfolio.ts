export type PortfolioCategory =
  | "Hotels"
  | "Airports"
  | "Commercial Spaces"
  | "Apartments"
  | "Spas"
  | "Offices";

export type PortfolioItem = {
  slug: string;
  title: string;
  location: string;
  category: PortfolioCategory;
  cover: {
    src: string;
    alt: string;
  };
  systems: string[];
  highlights: string[];
  deliverables: string[];
  year?: string;
  featured?: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "cozy-loft-hotel",
    title: "Cozy Loft Hotel",
    location: "Tbilisi, Georgia",
    category: "Hotels",
    cover: { src: "/media/images/portfolio/cozylofthotel.jpg", alt: "Cozy Loft Hotel exterior" },
    systems: ["Fire Alarm", "CCTV", "Electrical"],
    highlights: ["System integration with clean handover", "Inspection-ready configuration"],
    deliverables: ["As-built documentation", "Commissioning & testing", "Client handover checklist"],
    year: "2023",
    featured: true,
  },
  {
    slug: "radisson-blu-batumi",
    title: "Radisson Blu Batumi",
    location: "Batumi, Georgia",
    category: "Hotels",
    cover: { src: "/media/images/portfolio/radissonblubatumi.jpg", alt: "Radisson Blu Batumi tower" },
    systems: ["Fire Alarm", "BMS", "Electrical"],
    highlights: ["High-rise coordination", "Reliable zoning & signaling"],
    deliverables: ["Drawings & specs", "Site testing protocol", "Documentation package"],
    year: "2022",
    featured: true,
  },
  {
    slug: "radisson-blu-iveria",
    title: "Radisson Blu Iveria Hotel",
    location: "Tbilisi, Georgia",
    category: "Hotels",
    cover: { src: "/media/images/portfolio/radissonblueiveria.jpg", alt: "Radisson Blu Iveria night view" },
    systems: ["Fire Alarm", "CCTV", "Low Current"],
    highlights: ["Critical systems delivery", "Stable long-term operation focus"],
    deliverables: ["Testing & commissioning", "Handover report", "Service readiness"],
    year: "2021",
    featured: true,
  },
  {
    slug: "batumi-mall",
    title: "Batumi Mall",
    location: "Batumi, Georgia",
    category: "Commercial Spaces",
    cover: { src: "/media/images/portfolio/batumimall.jpg", alt: "Batumi Mall facade" },
    systems: ["CCTV", "Electrical", "Access Control"],
    highlights: ["Public-space reliability", "Operational clarity for staff"],
    deliverables: ["System diagrams", "Handover training", "Maintenance notes"],
    year: "2020",
    featured: true,
  },
];