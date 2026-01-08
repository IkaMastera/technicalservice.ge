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
  if (!s) return { title: "Service not found | Technical Service Company" };

  const count = SERVICE_MEDIA[p.slug]?.count ?? 0;

  return {
    title: `${s.title} | Services | Technical Service Company`,
    description: count
      ? `${count} project images. Engineering-grade execution and maintenance.`
      : `Service details for ${s.title}.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const p = await params;
  const s = SERVICES.find((x) => x.slug === p.slug);
  if (!s) notFound();

  const images = getServiceImagePaths(p.slug, "jpg");

  return <ServiceDetailTemplate title={s.title} slug={p.slug} images={images} />;
}