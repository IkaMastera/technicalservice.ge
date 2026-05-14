import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import ServiceDetailTemplate from "@/components/seperate-pages/services/services-detail/service-detail-template";
import { getServiceImagePaths } from "@/data/service-media";

type Lang = "en" | "ka";

type Props = {
  params: Promise<{ lang: Lang; slug: string }> | { lang: Lang; slug: string };
};

/* ─────────────────────────────────────────────────────────
   METADATA — bilingual title and description
   ───────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const s = SERVICES.find((x) => x.slug === p.slug);

  if (!s) {
    return {
      title: "Service not found | TSC",
      robots: { index: false, follow: false },
    };
  }

  const lang: Lang = p.lang === "ka" ? "ka" : "en";
  const title = s.title[lang] ?? s.title.en ?? s.slug;
  const rawDesc = s.description[lang] ?? s.description.en ?? "";
  const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + "…" : rawDesc;

  return {
    title: `${title} | TSC Engineering Services`,
    description: desc,
    alternates: {
      canonical: `https://technicalservice.ge/${lang}/services/${s.slug}`,
      languages: {
        en: `https://technicalservice.ge/en/services/${s.slug}`,
        ka: `https://technicalservice.ge/ka/services/${s.slug}`,
      },
    },
    robots: { index: true, follow: true },
  };
}

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */
export default async function ServicePage({ params }: Props) {
  const p = await params;
  const s = SERVICES.find((x) => x.slug === p.slug);

  if (!s) notFound();

  const images = getServiceImagePaths(p.slug, "jpg");

  return (
    <ServiceDetailTemplate
      slug={p.slug}
      lang={p.lang}
      images={images}
    />
  );
}