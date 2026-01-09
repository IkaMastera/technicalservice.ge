import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
// If you also have portfolio slugs later, you’ll add them here too.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://technicalservice.ge";

  const staticEnRoutes = [
    "/en",
    "/en/services",
    "/en/portfolio",
    "/en/about",
    "/en/contact",
  ];

  const serviceRoutes = SERVICES.map((s) => `/en/services/${s.slug}`);

  const urls = [...staticEnRoutes, ...serviceRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/en" ? 1 : 0.7,
  }));

  return urls;
}
