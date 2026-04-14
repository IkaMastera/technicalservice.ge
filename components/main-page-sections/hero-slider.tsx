"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";
import type { Lang } from "@/content/copy";

const SLIDES = portfolioItems.filter((x) => x.featured);
const AUTO_MS = 4000;

type Props = { lang?: Lang };

function pad(n: number) { return String(n).padStart(2, "0"); }

const BRAND_CONTENT = {
  en: [
    {
      kicker: "MEP Engineering · Georgia",
      headline: "Nothing is impossible.",
      sub: "Everything is permitted.",
      body: "We design, install, and maintain fire safety, electrical, HVAC, and low-voltage systems for commercial and residential buildings across Georgia.",
    },
    {
      kicker: "Fire Safety · Electrical · HVAC",
      headline: "Trusted by Georgia's",
      sub: "landmark buildings.",
      body: "17 years of combined engineering experience. 100+ projects delivered inspection-ready — from 5-star hotels to commercial complexes.",
    },
    {
      kicker: "Inspection-Ready Delivery",
      headline: "Every system we build",
      sub: "passes inspection.",
      body: "Compliance-ready documentation, clean handover, and long-term maintenance support. Engineering discipline from day one.",
    },
    {
      kicker: "Integration Discipline",
      headline: "Fire. Electrical. HVAC.",
      sub: "No chaos wiring.",
      body: "We integrate all MEP systems as one coordinated solution — not isolated installs. Built to work together, maintained together.",
    },
  ],
  ka: [
    {
      kicker: "MEP ინჟინერია · საქართველო",
      headline: "არაფერია შეუძლებელი.",
      sub: "ყველაფერი ნებადართულია.",
      body: "ვაპროექტებთ, ვამონტაჟებთ და ვემსახურებით სახანძრო, ელექტრო, HVAC და დაბალი ძაბვის სისტემებს კომერციული და საცხოვრებელი ობიექტებისთვის.",
    },
    {
      kicker: "სახანძრო · ელექტრო · HVAC",
      headline: "სანდო პარტნიორი",
      sub: "საქართველოს ლენდმარკებისთვის.",
      body: "17 წლის კომბინირებული საინჟინრო გამოცდილება. 100+ პროექტი ინსპექციისთვის მზად ჩაბარებული.",
    },
    {
      kicker: "ინსპექციისთვის მზად",
      headline: "ყველა სისტემა,",
      sub: "რომელსაც ვაშენებთ — გადის ინსპექციას.",
      body: "დოკუმენტაციის დისციპლინა, სუფთა ჩაბარება და გრძელვადიანი სერვისი. საინჟინრო სტანდარტი პირველი დღიდან.",
    },
    {
      kicker: "ინტეგრაციის დისციპლინა",
      headline: "ხანძარი. ელექტრო. HVAC.",
      sub: "ქაოსური გაყვანილობის გარეშე.",
      body: "ყველა MEP სისტემას ვაერთიანებთ ერთ კოორდინირებულ გადაწყვეტაში — მონტაჟიდან მომსახურებამდე.",
    },
  ],
};

const TRUST = {
  en: ["Compliance-ready documentation", "Commercial & residential", "17 years of combined experience"],
  ka: ["დოკუმენტაცია ინსპექციისთვის მზად", "კომერციული და საცხოვრებელი", "17 წლის კომბინირებული გამოცდილება"],
};

function Clip({
  children, delay = 0, exitDelay = 0, slideKey, className = "",
}: {
  children: React.ReactNode; delay?: number; exitDelay?: number;
  slideKey: string; className?: string;
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

export default function HeroSlider({ lang = "en" }: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir]     = useState(1);
  const [tick, setTick]   = useState(0);
  const pausedRef          = useRef(false);
  const touchStartY        = useRef<number | null>(null);

  const go = useCallback((nextIdx: number, direction: number) => {
    setDir(direction);
    setIndex((nextIdx + SLIDES.length) % SLIDES.length);
    setTick((t) => t + 1);
  }, []);

  const next = useCallback((idx: number) => go(idx + 1,  1), [go]);
  const prev = useCallback((idx: number) => go(idx - 1, -1), [go]);

  /*
    setInterval — fires every AUTO_MS ms.
    If paused (mouse over) it just skips that tick.
    Simple, reliable, never gets stuck.
  */
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setDir(1);
      setIndex((i) => (i + 1) % SLIDES.length);
      setTick((t) => t + 1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") setIndex((i) => { next(i); return i; });
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  setIndex((i) => { prev(i); return i; });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 48) setIndex((i) => { dy < 0 ? next(i) : prev(i); return i; });
    touchStartY.current = null;
  }, [next, prev]);

  const onMouseEnter = useCallback(() => { pausedRef.current = true;  }, []);
  const onMouseLeave = useCallback(() => { pausedRef.current = false; }, []);

  const slide = SLIDES[index];
  const brand = BRAND_CONTENT[lang][index];
  const trust = TRUST[lang];
  const imgEnter = { y: dir > 0 ? "100%" : "-100%" };
  const imgExit  = { y: dir > 0 ? "-100%" : "100%" };

  return (
    <section
      className="relative flex h-[100svh] w-full overflow-hidden bg-[#080706]"
      aria-label="TSC Engineering showcase"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >

      {/* ══ LEFT — image panel 55% ══ */}
      <div className="relative h-full w-full md:w-[55%] overflow-hidden flex-shrink-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={slide.slug + "-img"}
            initial={imgEnter}
            animate={{ y: "0%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ ...imgExit, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
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
              quality={90}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,7,6,0.70) 0%, rgba(8,7,6,0.25) 35%, rgba(8,7,6,0.25) 65%, rgba(8,7,6,0.95) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,122,53,0.18) 0%, transparent 65%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(8,7,6,0.65) 100%)" }} />
            <div className="absolute inset-y-0 right-0 w-36 hidden md:block" style={{ background: "linear-gradient(90deg, transparent, rgba(8,7,6,0.90))" }} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-8 z-10">
          <Clip slideKey={slide.slug + "-ref"} delay={0.05}>
            <div className="flex items-center gap-2">
              <div className="h-px w-5 bg-accent/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
                {slide.title} · {slide.location}
              </span>
            </div>
          </Clip>
        </div>
      </div>

      {/* ══ CENTER — vertical line indicators ══ */}
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
                  backgroundColor: i === index ? "#FF7A35" : "rgba(255,255,255,0.5)",
                  width: i === index ? 2 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full"
                style={{ willChange: "transform, opacity" }}
              />
              {i < SLIDES.length - 1 && <div className="h-4" />}
            </button>
          ))}
        </div>
        <div className="w-px bg-gradient-to-b from-white/6 via-white/8 to-transparent flex-1" />
      </div>

      {/* ══ RIGHT — brand content panel 45% ══ */}
      <div className="relative flex h-full w-full flex-col bg-[#080706] md:w-[45%] flex-shrink-0 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 15% 60%, rgba(255,122,53,0.05) 0%, transparent 55%)" }} />
        <div className="absolute top-0 left-0 right-16 h-px" style={{ background: "linear-gradient(90deg, rgba(255,122,53,0.45) 0%, transparent 80%)" }} />

        {/* Counter — large current number with diagonal slash and total */}
        <div className="relative z-10 flex items-start justify-end px-10 pt-20 lg:px-14">
          <div className="relative flex items-start gap-1">
            {/* Large animated current number */}
            <Clip slideKey={"counter-" + index} delay={0}>
              <span className="font-mono text-5xl font-thin leading-none tracking-tight text-white/70">
                {pad(index + 1)}
              </span>
            </Clip>
            {/* Slash + total stacked */}
            <div className="flex flex-col ml-1 pt-1">
              <span className="font-mono text-base text-white/20 leading-none" style={{ display: "inline-block", transform: "rotate(12deg)" }}>/</span>
              <span className="font-mono text-sm font-thin leading-none text-white/25 mt-1.5">{pad(SLIDES.length)}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-10 lg:px-14">

          <Clip slideKey={slide.slug + "-proj-ref"} delay={0.04} exitDelay={0.1} className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{slide.title}</span>
              <span className="text-white/10">·</span>
              <span className="text-[10px] font-mono text-white/15 uppercase tracking-[0.2em]">{slide.location}</span>
            </div>
          </Clip>

          <Clip slideKey={brand.kicker + "-kick"} delay={0.06} exitDelay={0.08} className="mb-5">
            <div className="inline-flex items-center gap-2">
              <div className="h-px w-4 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{brand.kicker}</span>
            </div>
          </Clip>

          <Clip slideKey={brand.headline} delay={0.12} exitDelay={0.04} className="mb-1">
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white lg:text-5xl xl:text-[3.2rem]">
              {brand.headline}
            </h2>
          </Clip>

          <Clip slideKey={brand.sub} delay={0.18} exitDelay={0.02} className="mb-6">
            <h3 className="text-4xl font-bold leading-[1.05] tracking-tight text-accent lg:text-5xl xl:text-[3.2rem]">
              {brand.sub}
            </h3>
          </Clip>

          <Clip slideKey={brand.body} delay={0.24} exitDelay={0} className="mb-6">
            <p className="max-w-[300px] text-sm leading-[1.75] text-white/45">{brand.body}</p>
          </Clip>

          <div className="mb-8 flex flex-col gap-2">
            {trust.map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-accent/60 flex-shrink-0" />
                <span className="text-[11px] text-white/30">{t}</span>
              </div>
            ))}
          </div>

          <Clip slideKey={"cta-" + lang} delay={0.34} exitDelay={0}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:bg-accent2 active:scale-[0.98] shadow-[0_4px_20px_rgba(255,122,53,0.30)]"
              >
                {lang === "en" ? "Contact Us" : "დაგვიკავშირდით"}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href={`/${lang}/services`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
              >
                {lang === "en" ? "Our Services" : "სერვისები"}
              </Link>
            </div>
          </Clip>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 px-10 pb-8 lg:px-14">
          <div className="flex items-center gap-4">
            <ProgressBar duration={AUTO_MS} tick={tick} />
            <span className="font-mono text-[9px] tracking-widest text-white/20 flex-shrink-0">
              {pad(index + 1)} — {pad(SLIDES.length)}
            </span>
          </div>
        </div>

        {/* Vertical arrows */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <button
            onClick={() => prev(index)}
            aria-label="Previous"
            className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.08] active:scale-95"
          >
            <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-[0.07]" />
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="relative z-10 text-white/40 transition-colors group-hover:text-white/80">
              <path d="M6.5 10V3M6.5 3L2.5 7M6.5 3L10.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex justify-center py-0.5">
            <div className="h-1 w-1 rounded-full bg-accent/50" />
          </div>
          <button
            onClick={() => next(index)}
            aria-label="Next"
            className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.08] active:scale-95"
          >
            <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-[0.07]" />
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="relative z-10 text-white/40 transition-colors group-hover:text-white/80">
              <path d="M6.5 3V10M6.5 10L10.5 6M6.5 10L2.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Preload ALL images */}
      <div className="sr-only" aria-hidden>
        {SLIDES.slice(1).map((s) => (
          <Image key={s.slug} src={s.cover.src} alt="" fill sizes="1px" />
        ))}
      </div>
    </section>
  );
}