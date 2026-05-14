"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import MapEmbed from "@/components/contact/map-embed";
import { CONTACT, CONTACT_LINKS } from "@/data/contact";
import { IconGlobe, IconMail, IconPhone, IconPin } from "@/components/icons/contact-icons";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

function Field(props: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  rows?: number;
}) {
  const { label, name, required, placeholder, type = "text", rows } = props;
  const isTextarea = typeof rows === "number";

  const commonInput = cx(
    "w-full bg-transparent text-sm text-text outline-none",
    "placeholder:text-muted/70",
    "px-3 py-2 pr-8"
  );

  return (
    <label className="block">
      <span className="sr-only">
        {label}
        {required ? " (required)" : ""}
      </span>

      <div className="group relative">
        <div
          className={cx(
            "relative overflow-hidden rounded-xl border border-border bg-bg",
            "transition-colors duration-200",
            "group-focus-within:border-white/20 group-focus-within:bg-surface2/30"
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute left-2 top-2 h-2.5 w-2.5",
              "border-l border-t opacity-0 transition-opacity duration-200",
              "group-focus-within:opacity-100"
            )}
            style={{ borderColor: "rgba(47,107,255,0.28)" }}
          />
          <span
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute right-2 bottom-2 h-2.5 w-2.5",
              "border-r border-b opacity-0 transition-opacity duration-200",
              "group-focus-within:opacity-100"
            )}
            style={{ borderColor: "rgba(47,107,255,0.28)" }}
          />

          <span
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute left-3 right-3 bottom-[6px] h-px",
              "bg-accent/90 origin-left scale-x-0 opacity-0",
              "transition-all duration-250 ease-out",
              "group-focus-within:scale-x-100 group-focus-within:opacity-100"
            )}
          />

          <span
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full",
              "bg-muted/60 transition-colors duration-200",
              "group-focus-within:bg-accent"
            )}
          />

          {isTextarea ? (
            <textarea
              required={required}
              name={name}
              placeholder={placeholder}
              rows={rows}
              className={cx(commonInput, "min-h-[120px]")}
            />
          ) : (
            <input
              required={required}
              name={name}
              type={type}
              inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
              placeholder={placeholder}
              className={commonInput}
            />
          )}
        </div>
      </div>
    </label>
  );
}

function ContactCard(props: {
  title: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  canHover: boolean;
}) {
  const { title, value, href, icon, canHover } = props;

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      variants={fadeUp}
      whileHover={
        canHover
          ? { y: -2, transition: { duration: 0.16, ease: "easeOut" } }
          : undefined
      }
      whileTap={{ scale: 0.99 }}
      className={cx(
        "group relative flex items-center gap-3 rounded-xl border border-border bg-surface2 px-4 py-3",
        "transition-colors duration-200 hover:border-white/20"
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute left-3 right-3 bottom-2 h-px",
          "bg-accent/90 origin-left scale-x-0 opacity-0",
          "transition-all duration-300 ease-out",
          "group-hover:scale-x-100 group-hover:opacity-100"
        )}
      />

      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute left-0 top-3 bottom-3 w-px",
          "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        )}
        style={{ backgroundColor: "rgba(47,107,255,0.35)" }}
      />

      <div
        className={cx(
          "grid h-10 w-10 place-items-center rounded-lg border border-border bg-bg",
          "text-accent2 transition-transform duration-200",
          "group-hover:translate-y-[-1px]"
        )}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[12px] text-muted">{title}</p>
        <p className="truncate text-sm font-semibold text-text">{value}</p>
      </div>

      <span
        aria-hidden="true"
        className={cx(
          "ml-auto h-1.5 w-1.5 rounded-full bg-muted/60 transition-colors duration-200",
          "group-hover:bg-accent"
        )}
      />
    </motion.a>
  );
}

export default function ContactPage({ lang = "en" }: { lang?: Lang }) {
  const t = copy[lang].contact.page;

  const mapsUrl = CONTACT_LINKS.mapsCoords(CONTACT.address.lat, CONTACT.address.lng);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [mapExpanded, setMapExpanded] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanHover(!!m.matches);
    apply();
    m.addEventListener?.("change", apply);
    return () => m.removeEventListener?.("change", apply);
  }, []);

  const mapHeightClass = mapExpanded ? "h-[70vh] sm:h-[420px]" : "h-[320px] sm:h-[420px]";

  const cards = useMemo(
    () => [
      {
        title: t.cards.phone,
        value: CONTACT.phones[0] ?? "",
        href: CONTACT_LINKS.tel(CONTACT.phones[0] ?? ""),
        icon: <IconPhone className="h-5 w-5" />,
      },
      {
        title: t.cards.email,
        value: CONTACT.emailPrimary,
        href: CONTACT_LINKS.mailto(CONTACT.emailPrimary),
        icon: <IconMail className="h-5 w-5" />,
      },
      {
        title: t.cards.address,
        value: t.map.openLocation,
        href: mapsUrl,
        icon: <IconPin className="h-5 w-5" />,
      },
      {
        title: t.cards.website,
        value: CONTACT.website,
        href: `https://${CONTACT.website}`,
        icon: <IconGlobe className="h-5 w-5" />,
      },
    ],
    [mapsUrl, t]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      // TODO: connect to API LATER DONT FORGET
      await new Promise((r) => setTimeout(r, 450));
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <main className="relative bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.22em] text-muted">
            {t.kicker}
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text">
            {t.title}
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-4 h-px w-44 bg-accent/70" />
        </motion.div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface2 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
              <p className="text-sm font-semibold text-text">{t.centerTitle}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="p-4 sm:p-5">
                <div className="overflow-hidden rounded-xl border border-border bg-bg">
                  <motion.div layout transition={{ duration: 0.25, ease: "easeOut" }}>
                    <MapEmbed lat={CONTACT.address.lat} lng={CONTACT.address.lng} heightClass={mapHeightClass} />
                  </motion.div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-muted">
                  <span className="truncate">{CONTACT.address.line}</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMapExpanded((v) => !v)}
                      className={cx(
                        "sm:hidden rounded-lg border border-border bg-surface2 px-2 py-1",
                        "text-[12px] text-text transition hover:border-white/20"
                      )}
                      aria-pressed={mapExpanded}
                    >
                      {mapExpanded ? t.map.collapse : t.map.expand}
                    </button>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 hover:text-text transition"
                    >
                      {t.map.openGoogle}
                    </a>
                  </div>
                </div>

                <motion.div initial="hidden" animate="show" variants={stagger} className="mt-4 grid gap-2 sm:grid-cols-2">
                  {cards.map((c) => (
                    <ContactCard
                      key={c.title}
                      title={c.title}
                      value={c.value}
                      href={c.href}
                      icon={c.icon}
                      canHover={canHover}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-4 sm:p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-text">{t.form.title}</h2>
                  </div>

                  <div className="text-[12px] text-muted">
                    {t.form.statusLabel}:{" "}
                    <span
                      className={cx(
                        status === "sent"
                          ? "text-text"
                          : status === "error"
                          ? "text-red-300"
                          : "text-muted"
                      )}
                    >
                      {status === "idle"
                        ? t.form.status.ready
                        : status === "sending"
                        ? t.form.status.sending
                        : status === "sent"
                        ? t.form.status.sent
                        : t.form.status.error}
                    </span>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="mt-5 space-y-3">
                  <Field required label={t.form.fields.nameLabel} name="name" placeholder={t.form.fields.namePh} />
                  <Field required label={t.form.fields.phoneLabel} name="phone" type="tel" placeholder={t.form.fields.phonePh} />
                  <Field label={t.form.fields.emailLabel} name="email" type="email" placeholder={t.form.fields.emailPh} />
                  <Field
                    required
                    label={t.form.fields.detailsLabel}
                    name="message"
                    placeholder={t.form.fields.detailsPh}
                    rows={5}
                  />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cx(
                      "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
                      "bg-accent text-[#0B0F14]",
                      "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
                      status === "sending" && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {status === "sending"
                      ? t.form.submit.sending
                      : status === "sent"
                      ? t.form.submit.sent
                      : t.form.submit.idle}
                  </button>

                  {status === "error" && (
                    <p className="text-[12px] text-red-300">{t.form.errorText}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}