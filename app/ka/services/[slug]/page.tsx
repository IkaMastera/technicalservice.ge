import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import ServiceDetailTemplate from "@/components/seperate-pages/services/services-detail/service-detail-template";
import { getServiceImagePaths, SERVICE_MEDIA } from "@/data/service-media";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const s = SERVICES.find((x) => x.slug === p.slug);

  if (!s) {
    return {
      title: "Service not found | TSC",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${s.title} in Georgia | TSC Engineering Services`,
    description: `Professional ${s.title.toLowerCase()} services in Georgia. Design, installation, and maintenance for commercial and residential buildings, delivered with reliable engineering standards.`,

    alternates: {
      canonical: `https://technicalservice.ge/en/services/${s.slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const p = await params;
  const s = SERVICES.find((x) => x.slug === p.slug);

  if (!s) notFound();

  const images = getServiceImagePaths(p.slug, "jpg");

  return (
    <ServiceDetailTemplate
      title={s.title}
      slug={p.slug}
      images={images}
    />
  );
}