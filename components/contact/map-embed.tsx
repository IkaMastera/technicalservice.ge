"use client";

export default function MapEmbed({
  lat,
  lng,
  zoom = 15,
  heightClass = "h-72",
}: {
  lat: number;
  lng: number;
  zoom?: number;
  heightClass?: string;
}) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-surface ${heightClass}`}>
      <iframe
        title="Google Maps"
        src={src}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
