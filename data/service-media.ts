export type ServiceMedia = {
  slug: string;
  count: number;
};

export const SERVICE_MEDIA: Record<string, ServiceMedia> = {
  "building-exterior-interior": { slug: "building-exterior-interior", count: 2 },
  "fire-alarm-sound": { slug: "fire-alarm-sound", count: 15 },
  "generator-transformer": { slug: "generator-transformer", count: 2 },
  "electrical-systems": { slug: "electrical-systems", count: 7 },
  "air-conditioning": { slug: "air-conditioning", count: 6 },
  "plumbing-mechanical": { slug: "plumbing-mechanical", count: 7 },
  "boiler-heating": { slug: "boiler-heating", count: 6 },
  "water-treatment": { slug: "water-treatment", count: 2 },
  "kitchen-laundry": { slug: "kitchen-laundry", count: 2 },
  "telecommunication-tv": { slug: "telecommunication-tv", count: 12 },
  "cctv-monitoring": { slug: "cctv-monitoring", count: 3 },
  "parking-automation": { slug: "parking-automation", count: 0 },
};

export function getServiceImagePaths(slug: string, ext: "webp" | "jpg" = "webp") {
  const entry = SERVICE_MEDIA[slug];
  const count = entry?.count ?? 0;

  const paths: string[] = [];
  for (let i = 1; i <= count; i++) {
    const n = String(i).padStart(2, "0");
    paths.push(`/media/images/services/${slug}/${n}.${ext}`);
  }
  return paths;
}