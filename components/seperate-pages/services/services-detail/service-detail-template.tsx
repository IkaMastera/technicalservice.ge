"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";

import { SERVICES, type ServiceItem, type SystemLayer } from "@/data/services";
import { portfolioItems, type ScopeCategory } from "@/data/portfolio";
import { PortfolioCard } from "@/components/seperate-pages/portfolio/portfolio-card";
import BuildingCutaway from "@/components/main-page-sections/building-cutaway";

type Lang = "en" | "ka";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────
   UI strings
   ───────────────────────────────────────────────────────── */
const UI = {
  en: {
    backToServices: "Back to services",
    overviewLabel:  "Overview",
    galleryLabel:   "Project Gallery",
    galleryEmpty:   "No photos available yet for this service.",
    processLabel:   "Delivery Process",
    processIntro:   "Every project follows the same four phases — designed for accountability and clean handover.",
    relatedLabel:   "Related Projects",
    relatedEmpty:   "No portfolio projects feature this service yet.",
    ctaTitle:       "Need this service for your building?",
    ctaBody:        "Schedule a site visit. We define scope, document the delivery, and stay accountable for the lifetime of the system.",
    ctaButton:      "Start a Conversation",
    cutawayLabel:   "System Cutaway",
  },
  ka: {
    backToServices: "სერვისების სიაში დაბრუნება",
    overviewLabel:  "მიმოხილვა",
    galleryLabel:   "ფოტო გალერეა",
    galleryEmpty:   "ფოტოები ჯერ არ არის ხელმისაწვდომი.",
    processLabel:   "ჩაბარების პროცესი",
    processIntro:   "ყველა პროექტი გადის იმავე ოთხ ეტაპს — დაგეგმილია პასუხისმგებლობისა და სუფთა ჩაბარებისთვის.",
    relatedLabel:   "მსგავსი პროექტები",
    relatedEmpty:   "ამ სერვისით ჯერ არცერთი პროექტი არ არის ნაჩვენები.",
    ctaTitle:       "გჭირდებათ ეს სერვისი თქვენი შენობისთვის?",
    ctaBody:        "დაგეგმეთ ვიზიტი ობიექტზე. განვსაზღვრავთ სამუშაოს მოცულობას, დავადოკუმენტირებთ ჩაბარებას და პასუხისმგებლები ვართ სისტემის სიცოცხლის ციკლზე.",
    ctaButton:      "დაგვიკავშირდით",
    cutawayLabel:   "სისტემის ჭრილი",
  },
};

/* Delivery process — same 4 steps everywhere, with a one-liner each */
const PROCESS = {
  en: [
    { num: "01", title: "Design & Engineering",   body: "Load calculations, drawings, and equipment selection before a single screw is turned." },
    { num: "02", title: "Installation",           body: "Coordinated with other trades. No on-site improvisation, no clashes." },
    { num: "03", title: "Testing & Handover",     body: "Commissioning, documentation, and a clean as-built package for the building owner." },
    { num: "04", title: "Long-Term Maintenance",  body: "Scheduled service, logbook, and accountability for the lifetime of the system." },
  ],
  ka: [
    { num: "01", title: "პროექტირება და ინჟინერია", body: "დატვირთვის გათვლები, ნახაზები და მოწყობილობების შერჩევა მონტაჟის დაწყებამდე." },
    { num: "02", title: "მონტაჟი",                  body: "სხვა სამუშაოებთან კოორდინირებული. იმპროვიზაცია არ არის, კონფლიქტებიც." },
    { num: "03", title: "ტესტირება და ჩაბარება",     body: "ჩაბარება, დოკუმენტაცია და სუფთა ფაქტობრივი პაკეტი მფლობელისთვის." },
    { num: "04", title: "გრძელვადიანი მომსახურება",  body: "გრაფიკული სერვისი, ჟურნალი და პასუხისმგებლობა სისტემის სიცოცხლის ციკლზე." },
  ],
};

/* ─────────────────────────────────────────────────────────
   System-layer → portfolio-scope-category mapping.
   Lets us pull related projects from the portfolio for any service.
   Lives in the template (not the data) — it's a translation between
   two type systems, used only here.
   ───────────────────────────────────────────────────────── */
const LAYER_TO_PORTFOLIO_CATEGORY: Partial<Record<SystemLayer, ScopeCategory[]>> = {
  "bms-overlay":    ["BMS"],
  "fire-detectors": ["Fire Alarm", "Fire Announcement"],
  "generator":      ["Electrical"],
  "electrical":     ["Electrical"],
  "hvac":           ["HVAC / Mechanical"],
  "plumbing":       ["HVAC / Mechanical"],
  "boiler":         ["Maintenance & Inspection", "HVAC / Mechanical"],
  "water-treatment": ["Maintenance & Inspection"],
  "kitchen":        ["HVAC / Mechanical"],
  "telecom":        [],
  "cctv":           [],
  "parking-gate":   [],
};

function getRelatedProjects(service: ServiceItem) {
  const categories = new Set<ScopeCategory>();
  service.systems.forEach((layer) => {
    const cats = LAYER_TO_PORTFOLIO_CATEGORY[layer] ?? [];
    cats.forEach((c) => categories.add(c));
  });

  if (categories.size === 0) return [];

  return portfolioItems.filter((p) =>
    p.scope.some((s) => categories.has(s.category))
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN
   ───────────────────────────────────────────────────────── */
type Props = {
  slug: string;
  lang?: Lang;
  images: string[];
};

export default function ServiceDetailTemplate({
  slug,
  lang = "en",
  images,
}: Props) {
  const reduce = useReducedMotion();
  const ui = UI[lang];

  /* Look up the service from SERVICES inside the client component.
     Passing the whole ServiceItem object from the server page would
     fail because Icon is a non-serializable React component. */
  const service = useMemo(() => SERVICES.find((x) => x.slug === slug), [slug]);

  const relatedProjects = useMemo(
    () => (service ? getRelatedProjects(service) : []),
    [service]
  );

  /* Carousel state */
  const count = images.length;
  const [rawIdx, setIdx] = useState(0);
  // Clamp at render-time (not in an effect — avoids cascading renders)
  const idx = count === 0 ? 0 : Math.min(rawIdx, count - 1);

  const goPrev = () => setIdx((v) => Math.max(0, v - 1));
  const goNext = () => setIdx((v) => Math.min(count - 1, v + 1));

  useEffect(() => {
    if (count <= 1) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  /* Hard guard — if the slug isn't found in SERVICES, render nothing.
     Page's notFound() should have caught this server-side, but if
     a stale slug slips through we don't want to crash the client. */
  if (!service) return null;

  const Icon = service.Icon;

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.02 },
    },
  };
  const up: Variants = {
    hidden: { opacity: 0, y: 10 },
    show:   { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" } },
  };
  const imgVariants: Variants = {
    initial: { opacity: 0, scale: reduce ? 1 : 0.995 },
    animate: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.22, ease: "easeOut" } },
    exit:    { opacity: 0, scale: reduce ? 1 : 0.995, transition: { duration: reduce ? 0 : 0.18 } },
  };

  return (
    <main className="relative bg-bg">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 12% 10%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 60%), radial-gradient(900px 520px at 88% 80%, rgba(255,255,255,0.03), transparent 60%)",
        }}
      />

      <motion.div
        variants={wrap}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-14 lg:pb-24"
      >
        {/* ════════════════════════════════════════════════
            TOP BAR — back link
            ════════════════════════════════════════════════ */}
        <motion.div variants={up}>
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-text transition"
          >
            <span>←</span>
            {ui.backToServices}
          </Link>
        </motion.div>

        {/* ════════════════════════════════════════════════
            HERO — cutaway + service identity
            ════════════════════════════════════════════════ */}
        <motion.section variants={up} className="mt-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">

            {/* LEFT — service identity */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-accent" />
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                  {service.category[lang]}
                </p>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-surface2/60">
                  <Icon className="h-7 w-7 text-accent" aria-hidden />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text leading-[1.1]">
                  {service.title[lang]}
                </h1>
              </div>

              <p className="text-[15px] leading-[1.75] text-muted max-w-md">
                {service.description[lang]}
              </p>
            </div>

            {/* RIGHT — building cutaway */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-sm p-6">
                {/* Top accent line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px w-6 bg-accent/60" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-accent/70">
                    {ui.cutawayLabel}
                  </span>
                  <div className="h-px w-6 bg-accent/60" />
                </div>

                <div className="w-full aspect-[4/3]">
                  <BuildingCutaway activeLayers={service.systems} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════════
            GALLERY — image carousel (only if images exist)
            ════════════════════════════════════════════════ */}
        {count > 0 && (
          <motion.section variants={up} className="mt-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-accent" />
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                {ui.galleryLabel}
              </p>
              <span className="font-mono text-[10px] text-muted ml-2">
                {String(idx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="p-5">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-bg">
                  {count > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={idx === 0}
                        aria-label="Previous image"
                        className={cx(
                          "absolute left-3 top-1/2 z-10 -translate-y-1/2",
                          "h-11 w-11 rounded-md border grid place-items-center transition",
                          idx > 0
                            ? "border-white/15 bg-bg/70 text-text hover:border-white/25 hover:bg-bg/85"
                            : "border-white/10 bg-bg/40 text-muted opacity-40 cursor-not-allowed"
                        )}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={idx === count - 1}
                        aria-label="Next image"
                        className={cx(
                          "absolute right-3 top-1/2 z-10 -translate-y-1/2",
                          "h-11 w-11 rounded-md border grid place-items-center transition",
                          idx < count - 1
                            ? "border-white/15 bg-bg/70 text-text hover:border-white/25 hover:bg-bg/85"
                            : "border-white/10 bg-bg/40 text-muted opacity-40 cursor-not-allowed"
                        )}
                      >
                        ›
                      </button>
                    </>
                  )}

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={images[idx]}
                      variants={imgVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[idx]}
                        alt={`${service.title[lang]} photo ${idx + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className="object-cover"
                        priority={idx < 2}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(900px 520px at 50% 40%, transparent 60%, rgba(0,0,0,0.45) 100%)",
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress bar */}
                {count > 1 && (
                  <div className="mt-4 h-2 rounded-full border border-border bg-bg overflow-hidden">
                    <div
                      className="h-full bg-accent/70 transition-[width] duration-200"
                      style={{ width: `${Math.round(((idx + 1) / count) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ════════════════════════════════════════════════
            DELIVERY PROCESS
            ════════════════════════════════════════════════ */}
        <motion.section variants={up} className="mt-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-accent" />
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              {ui.processLabel}
            </p>
          </div>
          <p className="text-sm text-muted max-w-2xl mb-8">{ui.processIntro}</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS[lang].map((step) => (
              <div
                key={step.num}
                className="relative rounded-xl border border-border bg-surface/40 backdrop-blur-sm p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-accent/75 tracking-wider">
                    {step.num}
                  </span>
                  <div className="h-px flex-1 bg-border/60" />
                </div>
                <h3 className="text-sm font-bold text-text mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[12px] leading-[1.6] text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════════
            RELATED PROJECTS
            ════════════════════════════════════════════════ */}
        <motion.section variants={up} className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              {ui.relatedLabel}
            </p>
            {relatedProjects.length > 0 && (
              <span className="font-mono text-[10px] text-muted ml-2">
                {String(relatedProjects.length).padStart(2, "0")}
              </span>
            )}
          </div>

          {relatedProjects.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface/40 p-6 text-sm text-muted">
              {ui.relatedEmpty}
            </div>
          ) : (
            /* Related projects render as STATIC (non-expanding) cards.
               PortfolioCard requires isExpanded/onToggle props — we pass
               them but always keep collapsed since this is just a teaser. */
            <div className="grid grid-cols-12 gap-6">
              {relatedProjects.map((p) => (
                <div key={p.slug} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <PortfolioCard
                    item={p}
                    lang={lang}
                    isExpanded={false}
                    onToggle={() => {
                      // Could navigate to /portfolio?expand=slug in the future
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* ════════════════════════════════════════════════
            CTA
            ════════════════════════════════════════════════ */}
        <motion.section variants={up} className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-xl p-8 lg:p-10">
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            {/* Internal grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-text) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex-1 max-w-2xl">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-text mb-3">
                  {ui.ctaTitle}
                </h3>
                <p className="text-sm lg:text-base text-muted leading-relaxed">
                  {ui.ctaBody}
                </p>
              </div>

              <Link
                href={`/${lang}/contact`}
                className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-accent border border-accent/40 px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] overflow-hidden flex-shrink-0"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{ui.ctaButton}</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}