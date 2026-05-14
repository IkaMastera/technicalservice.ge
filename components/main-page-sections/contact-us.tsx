"use client";

import Link from "next/link";
import { CONTACT, CONTACT_LINKS } from "@/data/contact";
import {
  IconGlobe,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/icons/contact-icons";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────
   OSM mini-map URL — computes a bbox from a single lat/lng
   with a city-scale offset. No API key, no cost.
   ───────────────────────────────────────────────────────── */
function osmEmbedUrl(lat: number, lng: number) {
  const offset = 0.005;
  const bbox = [
    lng - offset,
    lat - offset,
    lng + offset,
    lat + offset,
  ].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

/* ─────────────────────────────────────────────────────────
   Local UI strings — kept inline so this section doesn't
   need a copy.ts change to ship.
   ───────────────────────────────────────────────────────── */
const LOCAL_UI = {
  en: {
    hoursLabel: "Office Hours",
    hoursValue: "Mon – Fri · 09:00 – 18:00",
    mapHint: "Open in Google Maps",
    statusOpen: "Open now",
    statusClosed: "Closed now",
  },
  ka: {
    hoursLabel: "სამუშაო საათები",
    hoursValue: "ორშ. – პარ. · 09:00 – 18:00",
    mapHint: "Google Maps-ში გახსნა",
    statusOpen: "ღიაა",
    statusClosed: "დაკეტილია",
  },
};

/* Simple Tbilisi-local "are we open now" check.
   Returns boolean using user's clock — close enough for an
   indicator; the actual hours are the source of truth. */
function useIsOpenNow(): boolean {
  // SSR-safe: render closed-by-default during hydration, then
  // client effect could flip it. For simplicity here we just
  // compute at render — minor mismatch is acceptable for a status pill.
  if (typeof window === "undefined") return false;
  const d = new Date();
  const day = d.getDay(); // 0 = Sun, 6 = Sat
  const hour = d.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
}

/* ─────────────────────────────────────────────────────────
   InfoRow — used for the stacked contact list
   ───────────────────────────────────────────────────────── */
function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 border-b border-border/40 last:border-b-0">
      <div
        className={cx(
          "mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg",
          "border border-border bg-surface2/60",
          "text-accent2"
        )}
        aria-hidden="true"
      >
        <span className="h-5 w-5">{icon}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-muted/70">
          {label}
        </p>
        <div className="mt-1 text-[14px] leading-relaxed text-text">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN
   ───────────────────────────────────────────────────────── */
export default function ContactUsSection({ lang = "en" }: { lang?: Lang }) {
  const t = copy[lang].home.contact;
  const u = LOCAL_UI[lang];

  const mapsUrl = CONTACT_LINKS.mapsCoords(
    CONTACT.address.lat,
    CONTACT.address.lng
  );
  const embedUrl = osmEmbedUrl(CONTACT.address.lat, CONTACT.address.lng);
  const isOpen = useIsOpenNow();

  return (
    <section
      id="contact"
      className="relative border-t border-border bg-bg"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 12% 10%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 60%), radial-gradient(900px 520px at 88% 80%, rgba(255,255,255,0.025), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">

          {/* ════════════════════════════════════════════
              LEFT — heading + CTAs
              ════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                {t.kicker}
              </p>
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-text leading-[1.05]">
              {t.heading}
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-muted">
              {t.desc}
            </p>

            {/* CTAs — primary dominates, secondary supports */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:bg-accent2 active:scale-[0.98] shadow-[0_4px_20px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]"
              >
                {t.ctaOpen}
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>

              <a
                href={CONTACT_LINKS.tel(CONTACT.phones[0])}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-text transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <IconPhone className="h-4 w-4" />
                {t.ctaCall}
              </a>
            </div>

            {/* Office hours indicator — pushed to bottom on tall layouts */}
            <div className="mt-10 lg:mt-auto pt-8">
              <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface/40 px-4 py-3 backdrop-blur-sm">
                <span
                  className={cx(
                    "relative flex h-2.5 w-2.5 flex-shrink-0",
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={cx(
                      "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
                      isOpen ? "bg-emerald-400" : "bg-muted"
                    )}
                  />
                  <span
                    className={cx(
                      "relative inline-flex h-2.5 w-2.5 rounded-full",
                      isOpen ? "bg-emerald-400" : "bg-muted"
                    )}
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted">
                    {u.hoursLabel}
                  </span>
                  <span className="text-[13px] font-semibold text-text">
                    {u.hoursValue}
                  </span>
                </div>
                <span
                  className={cx(
                    "ml-3 rounded-md border px-2 py-1 text-[10px] font-mono uppercase tracking-wider",
                    isOpen
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-border bg-surface2 text-muted"
                  )}
                >
                  {isOpen ? u.statusOpen : u.statusClosed}
                </span>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT — info card + map
              ════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_18px_50px_rgba(0,0,0,0.22)]">

              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              {/* ── MAP ── */}
              <div className="relative aspect-[21/9] bg-surface2">
                <iframe
                  src={embedUrl}
                  title="TSC office location"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.4] contrast-[1.05] brightness-[0.85]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Subtle overlay to blend the map with the surface */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent"
                />

                {/* "Open in Google Maps" pill — top-right */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/85 px-3 py-1.5 text-[11px] font-semibold text-text backdrop-blur-md transition hover:border-accent/40 hover:bg-surface"
                >
                  <IconPin className="h-3.5 w-3.5 text-accent" />
                  {u.mapHint}
                  <span className="text-muted">↗</span>
                </a>
              </div>

              {/* ── CONTACT LIST ── */}
              <div className="p-6 lg:p-7">
                <div className="flex flex-col">
                  <InfoRow icon={<IconPin className="h-5 w-5" />} label={t.labels.address}>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                    >
                      {CONTACT.address.line}
                    </a>
                  </InfoRow>

                  <InfoRow icon={<IconPhone className="h-5 w-5" />} label={t.labels.phone}>
                    <div className="flex flex-col gap-1">
                      {CONTACT.phones.map((p) => (
                        <a
                          key={p}
                          href={CONTACT_LINKS.tel(p)}
                          className="hover:text-accent transition-colors underline-offset-4 hover:underline font-mono"
                        >
                          {p}
                        </a>
                      ))}
                    </div>
                  </InfoRow>

                  <InfoRow icon={<IconMail className="h-5 w-5" />} label={t.labels.email}>
                    <div className="flex flex-col gap-1">
                      <a
                        href={CONTACT_LINKS.mailto(CONTACT.emailPrimary)}
                        className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                      >
                        {CONTACT.emailPrimary}
                      </a>
                      <a
                        href={CONTACT_LINKS.mailto(CONTACT.emailSecondary)}
                        className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                      >
                        {CONTACT.emailSecondary}
                      </a>
                    </div>
                  </InfoRow>

                  <InfoRow icon={<IconGlobe className="h-5 w-5" />} label={t.labels.website}>
                    <a
                      href={`https://${CONTACT.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                    >
                      {CONTACT.website}
                    </a>
                  </InfoRow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}