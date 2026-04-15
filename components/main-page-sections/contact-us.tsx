"use client";

import Link from "next/link";
import { CONTACT, CONTACT_LINKS } from "@/data/contact";
import { IconGlobe, IconMail, IconPhone, IconPin } from "@/components/icons/contact-icons";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Item({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={cx(
          "mt-0.5 grid h-10 w-10 place-items-center rounded-lg",
          "border border-border bg-surface2",
          "text-accent2"
        )}
        aria-hidden="true"
      >
        <span className="h-5 w-5">{icon}</span>
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{label}</p>
        <div className="mt-1 text-[14px] text-text">{children}</div>
      </div>
    </div>
  );
}

export default function ContactUsSection({ lang = "en" }: { lang?: Lang }) {
  const t = copy[lang].home.contact;
  const mapsUrl = CONTACT_LINKS.mapsCoords(CONTACT.address.lat, CONTACT.address.lng);

  return (
    <section id="contact" className="relative border-t border-border bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 12% 10%, rgba(70, 130, 180,0.08), transparent 60%), radial-gradient(900px 520px at 88% 18%, rgba(255,255,255,0.03), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{t.kicker}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text">{t.heading}</h2>
            <div className="mt-4 h-px w-40 bg-accent/70" />
            <p className="mt-5 text-[15px] leading-7 text-muted">{t.desc}</p>
          </div>

          {/* Right card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{t.cardTitle}</p>
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface2 px-3 py-1 text-[12px] text-text">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {t.cardChip}
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Item icon={<IconPin className="h-5 w-5" />} label={t.labels.address}>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    {CONTACT.address.line}
                  </a>
                </Item>

                <Item icon={<IconGlobe className="h-5 w-5" />} label={t.labels.website}>
                  <a
                    href={`https://${CONTACT.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    {CONTACT.website}
                  </a>
                </Item>

                <Item icon={<IconMail className="h-5 w-5" />} label={t.labels.email}>
                  <div className="space-y-1">
                    <a
                      href={CONTACT_LINKS.mailto(CONTACT.emailPrimary)}
                      className="block hover:underline underline-offset-4"
                    >
                      {CONTACT.emailPrimary}
                    </a>
                    <a
                      href={CONTACT_LINKS.mailto(CONTACT.emailSecondary)}
                      className="block hover:underline underline-offset-4"
                    >
                      {CONTACT.emailSecondary}
                    </a>
                  </div>
                </Item>

                <Item icon={<IconPhone className="h-5 w-5" />} label={t.labels.phone}>
                  <div className="space-y-1">
                    {CONTACT.phones.map((p) => (
                      <a
                        key={p}
                        href={CONTACT_LINKS.tel(p)}
                        className="block hover:underline underline-offset-4"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </Item>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-bg p-4 text-[13px] leading-6 text-muted">
                {CONTACT.note}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={`/${lang}/contact`}
                  className={cx(
                    "rounded-xl border border-border bg-surface2 px-4 py-2 text-sm text-text",
                    "hover:border-white/20 transition"
                  )}
                >
                  {t.ctaOpen}
                </Link>

                <a
                  href={CONTACT_LINKS.tel(CONTACT.phones[0])}
                  className={cx(
                    "rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text",
                    "hover:border-white/20 transition"
                  )}
                >
                  {t.ctaCall}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}