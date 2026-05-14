"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { portfolioItems, type Lang, type ScopeItem } from "@/data/portfolio";

const AUTO_MS = 4500;

type Props = { lang?: Lang };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* Dedupe scope rows by EN label — same logic the card uses.
   Tsinandali tags one row under two categories on purpose (for filtering);
   we don't want it appearing twice in the UI. */
function dedupeScope(scope: ScopeItem[]): ScopeItem[] {
  const seen = new Set<string>();
  return scope.filter((s) => {
    const k = s.label.en;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/* ─────────────────────────────────────────────────────────
   Brand headlines — one per featured slide. Order must match
   the featured-project order in portfolio.ts.
   ───────────────────────────────────────────────────────── */
const BRAND_CONTENT = {
  en: [
    {
      kicker: "MEP Engineering · Georgia",
      headline: "Nothing is impossible.",
      sub: "Everything is permitted.",
      body: "Design, installation, and maintenance of fire safety, electrical, HVAC, and low-voltage systems — delivered inspection-ready for one of Tbilisi's landmark hotels.",
    },
    {
      kicker: "Fire Safety · Critical Venues",
      headline: "Trusted by Georgia's",
      sub: "landmark buildings.",
      body: "Fire alarm and announcement systems built for high-traffic public venues. Rapid evacuation reliability. 24/7 operational confidence.",
    },
    {
      kicker: "Heritage-Grade Maintenance",
      headline: "Every system we build",
      sub: "passes inspection.",
      body: "Ongoing firefighting system and fire pump service for one of the country's most prestigious resort properties.",
    },
    {
      kicker: "Integration Discipline",
      headline: "Unified MEP solutions.",
      sub: "One accountable partner.",
      body: "Fire, mechanical, electrical, and building management — all delivered as one coordinated scope. Installation through long-term service.",
    },
  ],
  ka: [
    {
      kicker: "MEP ინჟინერია · საქართველო",
      headline: "არაფერია შეუძლებელი.",
      sub: "ყველაფერი თქვენს ხელშია.",
      body: "სახანძრო, ელექტრო, HVAC და დაბალი ძაბვის სისტემების დიზაინი, მონტაჟი და მომსახურება — ჩაბარებული თბილისის ერთ-ერთი მთავარი სასტუმროსთვის.",
    },
    {
      kicker: "სახანძრო უსაფრთხოება",
      headline: "სანდო პარტნიორი",
      sub: "საქართველოს ინფრასტრუქტურისთვის.",
      body: "სახანძრო სიგნალიზაცია და შეტყობინების სისტემები მაღალი დატვირთვის საზოგადოებრივი ობიექტებისთვის.",
    },
    {
      kicker: "ისტორიული ობიექტების მომსახურება",
      headline: "ყველა სისტემა,",
      sub: "რომელსაც ვაშენებთ - გადის ინსპექციას.",
      body: "ხანძარქრობის სისტემისა და სახანძრო ტუმბოს მუდმივი მომსახურება ქვეყნის ერთ-ერთი ყველაზე პრესტიჟული საკურორტო ობიექტისთვის.",
    },
    {
      kicker: "ინტეგრაციის დისციპლინა",
      headline: "სრული MEP გადაწყვეტა.",
      sub: "ერთი პასუხისმგებელი პარტნიორი.",
      body: "სახანძრო, მექანიკური, ელექტრო და შენობის მართვა — ერთ კოორდინირებულ პროექტში. მონტაჟიდან გრძელვადიან მომსახურებამდე.",
    },
  ],
};

const UI = {
  en: {
    scopeLabel: "Scope of Work",
    trustLabel: "Engineering Standard",
    trust: ["17 years of combined experience", "100+ projects delivered", "Inspection-ready handover"],
    contact: "Contact Us",
    services: "Our Services",
  },
  ka: {
    scopeLabel: "შესრულებული სამუშაოები",
    trustLabel: "საინჟინრო სტანდარტი",
    trust: ["17 წლის კომბინირებული გამოცდილება", "100+ ჩაბარებული პროექტი", "ინსპექციისთვის მზად ჩაბარება"],
    contact: "დაგვიკავშირდით",
    services: "სერვისები",
  },
};

/* Clip — vertical mask + slide for the big text blocks. */
function Clip({
  children,
  delay = 0,
  exitDelay = 0,
  slideKey,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  exitDelay?: number;
  slideKey: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slideKey}
          initial={{ y: "110%" }}
          animate={{ y: "0%", transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1], delay } }}
          exit={{ y: "-110%", transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0], delay: exitDelay } }}
          style={{ willChange: "transform" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProgressBar({ duration, tick }: { duration: number; tick: number }) {
  return (
    <div className="relative h-px flex-1 bg-white/8 overflow-hidden">
      <motion.div
        key={tick}
        className="absolute inset-y-0 left-0 bg-accent/60 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        style={{ width: "100%", willChange: "transform" }}
      />
    </div>
  );
}

/* ScopeList — staggered bullet animations. One AnimatePresence
   wraps the whole list (fewer animation contexts = better perf).
   Each bullet enters diagonally with a slight blur fade; the dot
   overshoots then settles for visible "landing" feel. */
const listVariants: Variants = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const bulletVariants: Variants = {
  initial: { opacity: 0, x: -28, y: 12, filter: "blur(4px)" },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 20,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
  },
};

const dotVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  enter: {
    scale: [0, 1.4, 1],
    opacity: 1,
    transition: { duration: 0.6, times: [0, 0.6, 1], ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

function ScopeList({
  scope,
  lang,
  slideKey,
}: {
  scope: ScopeItem[];
  lang: Lang;
  slideKey: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={slideKey}
        variants={listVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="flex flex-col gap-2"
      >
        {scope.map((s, i) => (
          <motion.li
            key={`${slideKey}-${i}`}
            variants={bulletVariants}
            className="flex items-start gap-2.5"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              variants={dotVariants}
              className="mt-[7px] h-1 w-1 rounded-full bg-accent flex-shrink-0"
              style={{ willChange: "transform" }}
            />
            <div className="flex flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-[12px] leading-snug text-white/75">
                {s.label[lang]}
              </span>
              <span className="font-mono text-[10px] leading-none text-accent/75 tracking-wider">
                {s.yearRange}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}

/* MAIN */
export default function HeroSlider({ lang = "en" }: Props) {
  const reduce = useReducedMotion();

  const SLIDES = useMemo(
    () => portfolioItems.filter((x) => x.featured),
    []
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [tick, setTick] = useState(0);
  const pausedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const slidesLen = SLIDES.length;

  const go = useCallback(
    (nextIdx: number, direction: number) => {
      setDir(direction);
      setIndex(((nextIdx % slidesLen) + slidesLen) % slidesLen);
      setTick((t) => t + 1);
    },
    [slidesLen]
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setDir(1);
      setIndex((i) => (i + 1) % slidesLen);
      setTick((t) => t + 1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [slidesLen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY.current === null) return;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dy) > 48) {
        if (dy < 0) next();
        else prev();
      }
      touchStartY.current = null;
    },
    [next, prev]
  );

  const onMouseEnter = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const onMouseLeave = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const slide = SLIDES[index];
  const brand = BRAND_CONTENT[lang][index];
  const ui = UI[lang];

  const scope = useMemo(() => dedupeScope(slide.scope), [slide]);

  const imgEnter = reduce ? { y: 0 } : { y: dir > 0 ? "100%" : "-100%" };
  const imgExit  = reduce ? { y: 0 } : { y: dir > 0 ? "-100%" : "100%" };

  return (
    <section
      className="relative flex h-[100svh] w-full overflow-hidden bg-[#080706]"
      aria-label="TSC Engineering showcase"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* LEFT — image panel */}
      <div className="relative h-full w-full md:w-[55%] overflow-hidden flex-shrink-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={slide.slug + "-img"}
            initial={imgEnter}
            animate={{ y: "0%", transition: { duration: reduce ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ ...imgExit, transition: { duration: reduce ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute inset-0"
            style={{ willChange: "transform" }}
          >
            <Image
              src={slide.cover.src}
              alt={slide.cover.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
              quality={85}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,9,15,0.75) 0%, rgba(7,9,15,0.30) 35%, rgba(7,9,15,0.30) 65%, rgba(7,9,15,0.95) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 65%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(7,9,15,0.60) 100%)" }} />
            <div className="absolute inset-y-0 right-0 w-36 hidden md:block" style={{ background: "linear-gradient(90deg, transparent, rgba(7,9,15,0.90))" }} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-8 z-10 max-w-[80%]">
          <Clip slideKey={slide.slug + "-ref"} delay={0.05}>
            <div className="flex items-center gap-2">
              <div className="h-px w-5 bg-accent/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
                {slide.title[lang]} · {slide.location[lang]}
              </span>
            </div>
          </Clip>
        </div>
      </div>

      {/* CENTER — indicators */}
      <div className="absolute left-[55%] top-0 z-20 hidden h-full md:flex flex-col items-center -translate-x-1/2">
        <div className="w-px bg-gradient-to-b from-transparent via-white/8 to-white/6 flex-1" />
        <div className="flex flex-col items-center gap-0 py-8">
          {SLIDES.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  height: i === index ? 36 : 14,
                  opacity: i === index ? 1 : 0.2,
                  backgroundColor: i === index
                    ? "var(--color-accent)"
                    : "rgba(255,255,255,0.5)",
                  width: i === index ? 2 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full"
                style={{ willChange: "transform, opacity" }}
              />
              {i < slidesLen - 1 && <div className="h-4" />}
            </button>
          ))}
        </div>
        <div className="w-px bg-gradient-to-b from-white/6 via-white/8 to-transparent flex-1" />
      </div>

      {/* RIGHT — content panel */}
      <div className="relative flex h-full w-full flex-col bg-[#080706] md:w-[45%] flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 15% 60%, color-mix(in srgb, var(--color-accent) 5%, transparent) 0%, transparent 55%)" }} />
        <div className="absolute top-0 left-0 right-16 h-px" style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 45%, transparent) 0%, transparent 80%)" }} />

        {/* Counter */}
        <div className="relative z-10 flex items-start justify-end px-10 pt-20 lg:px-14">
          <div className="relative flex items-start gap-1">
            <Clip slideKey={"counter-" + index} delay={0}>
              <span className="font-mono text-5xl font-thin leading-none tracking-tight text-text/70">
                {pad(index + 1)}
              </span>
            </Clip>
            <div className="flex flex-col ml-1 pt-1">
              <span className="font-mono text-base text-white/20 leading-none" style={{ display: "inline-block", transform: "rotate(12deg)" }}>/</span>
              <span className="font-mono text-sm font-thin leading-none text-white/25 mt-1.5">{pad(slidesLen)}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-10 lg:px-14 overflow-y-auto">
          <Clip slideKey={slide.slug + "-proj-ref"} delay={0.04} exitDelay={0.1} className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">{slide.title[lang]}</span>
              <span className="text-white/15">·</span>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{slide.location[lang]}</span>
            </div>
          </Clip>

          <Clip slideKey={brand.kicker + "-kick-" + index} delay={0.06} exitDelay={0.08} className="mb-5">
            <div className="inline-flex items-center gap-2">
              <div className="h-px w-4 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{brand.kicker}</span>
            </div>
          </Clip>

          <Clip slideKey={brand.headline + "-" + index} delay={0.12} exitDelay={0.04} className="mb-1">
            <h2 className="pb-2 text-3xl font-bold leading-[1.05] tracking-tight text-text lg:text-4xl xl:text-[2.6rem]">
              {brand.headline}
            </h2>
          </Clip>

          <Clip slideKey={brand.sub + "-" + index} delay={0.18} exitDelay={0.02} className="mb-5">
            <h3 className="pb-3 text-3xl font-bold leading-[1.05] tracking-tight text-accent lg:text-4xl xl:text-[2.6rem]">
              {brand.sub}
            </h3>
          </Clip>

          <Clip slideKey={brand.body + "-" + index} delay={0.24} exitDelay={0} className="mb-6">
            <p className="max-w-[340px] text-sm leading-[1.65] text-white/45">{brand.body}</p>
          </Clip>

          {/* SCOPE LIST */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                {ui.scopeLabel}
              </span>
              <div className="h-px flex-1 bg-white/8 max-w-[80px]" />
            </div>
            <ScopeList scope={scope} lang={lang} slideKey={slide.slug} />
          </div>

          {/* TRUST STRIP — always shown */}
          <div className="mb-7 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">
                {ui.trustLabel}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {ui.trust.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/30 flex-shrink-0" />
                  <span className="text-[11px] text-white/30">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <Clip slideKey={"cta-" + lang} delay={0.5} exitDelay={0}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:bg-accent2 active:scale-[0.98] shadow-[0_4px_20px_rgba(255,122,53,0.30)]"
              >
                {ui.contact}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href={`/${lang}/services`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
              >
                {ui.services}
              </Link>
            </div>
          </Clip>
        </div>

        {/* Progress */}
        <div className="relative z-10 px-10 pb-8 lg:px-14">
          <div className="flex items-center gap-4">
            <ProgressBar duration={AUTO_MS} tick={tick} />
            <span className="font-mono text-[9px] tracking-widest text-white/20 flex-shrink-0">
              {pad(index + 1)} — {pad(slidesLen)}
            </span>
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <button
            onClick={prev}
            aria-label="Previous"
            className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.08] active:scale-95"
          >
            <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-[0.07]" />
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="relative z-10 text-white/40 transition-colors group-hover:text-white/80">
              <path d="M6.5 10V3M6.5 3L2.5 7M6.5 3L10.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex justify-center py-0.5">
            <div className="h-1 w-1 rounded-full bg-accent/50" />
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.08] active:scale-95"
          >
            <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-[0.07]" />
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="relative z-10 text-white/40 transition-colors group-hover:text-white/80">
              <path d="M6.5 3V10M6.5 10L10.5 6M6.5 10L2.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}