"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/data/services";
import BuildingCutaway from "./building-cutaway";

type Lang = "en" | "ka";

const DELIVERY_STEPS = {
  en: ["Design & engineering", "Installation", "Testing & handover", "Long-term maintenance"],
  ka: ["პროექტირება", "მონტაჟი", "ტესტირება და ჩაბარება", "გრძელვადიანი სერვისი"],
} as const;

const UI = {
  en: {
    viewAll:     "View all",
    selectHint:  "Select a service",
    detailKick:  "Service details",
    emptyDesc:   "Select a service from the list to see scope, deliverables, and how the system fits into the building.",
    stepsLabel:  "Delivery",
    viewScope:   "View full scope",
    scopeKick:   "Service scope",
    title:       "Services",
    cutawayKick: "Building Cutaway",
    cutawayIdle: "All systems",
  },
  ka: {
    viewAll:     "ყველა",
    selectHint:  "აირჩიეთ სერვისი",
    detailKick:  "სერვისის დეტალები",
    emptyDesc:   "აირჩიეთ სერვისი, რომ ნახოთ მისი მოცულობა, ჩაბარების ეტაპები და როგორ ერთვის შენობაში.",
    stepsLabel:  "ჩაბარების ეტაპები",
    viewScope:   "სრული მოცულობა",
    scopeKick:   "სერვისის მოცულობა",
    title:       "სერვისები",
    cutawayKick: "შენობის ჭრილი",
    cutawayIdle: "ყველა სისტემა",
  },
};

export default function ServicesSection({ lang = "en" }: { lang?: Lang }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const ui = UI[lang];
  const steps = DELIVERY_STEPS[lang];

  const activeService = activeIdx !== null ? SERVICES[activeIdx] : null;
  const activeLayers = activeService?.systems ?? [];

  const handleSelect = useCallback((i: number) => {
    setActiveIdx((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section
      id="services"
      className="relative bg-bg overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Engineering grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.25] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(900px_600px_at_50%_50%,black,transparent_85%)]"
      />

      {/* Header */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-6 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-4">
          <div className="h-8 w-1 rounded-full bg-accent" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-text">
            TSC <span className="text-accent">{ui.title}</span>
          </h2>
        </div>
        <Link
          href={`/${lang}/services`}
          className="flex items-center gap-2 rounded-xl border border-border bg-text/5 px-4 py-2 text-[11px] font-semibold text-muted transition hover:border-text/20 hover:text-text"
        >
          {ui.viewAll} →
        </Link>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP — 3 columns
          ════════════════════════════════════════════════════════ */}
      <div className="relative z-20 hidden lg:flex h-[calc(100vh-6rem)] w-full">

        {/* ── LEFT: service list ── */}
        <div className="relative flex w-[28%] flex-shrink-0 flex-col justify-center border-r border-border bg-surface/30 backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none bg-gradient-to-b from-bg to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-bg to-transparent" />

          <div className="flex flex-col px-5 lg:px-7 py-4 overflow-y-auto max-h-full">
            {SERVICES.map((svc, i) => {
              const isActive = activeIdx === i;
              const Icon = svc.Icon;

              return (
                <motion.button
                  key={svc.slug}
                  onClick={() => handleSelect(i)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.05 + i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex items-center gap-4 py-2.5 text-left"
                >
                  {/* Active rail */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 bottom-1 w-[2px] rounded-full bg-accent origin-center"
                    style={{ left: "-20px" }}
                  />

                  {/* Number */}
                  <span
                    className={`font-mono text-[9px] w-5 flex-shrink-0 transition-colors ${
                      isActive ? "text-accent" : "text-text/30 group-hover:text-text/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon tile */}
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? "color-mix(in srgb, var(--color-accent) 15%, transparent)"
                        : "color-mix(in srgb, var(--color-text) 4%, transparent)",
                      borderColor: isActive
                        ? "color-mix(in srgb, var(--color-accent) 40%, transparent)"
                        : "color-mix(in srgb, var(--color-text) 8%, transparent)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border"
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors ${
                        isActive ? "text-accent" : "text-text/40 group-hover:text-text/70"
                      }`}
                      aria-hidden
                    />
                  </motion.div>

                  {/* Title + category */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      className={`text-[12px] font-semibold leading-tight truncate transition-colors ${
                        isActive ? "text-text" : "text-text/65 group-hover:text-text/90"
                      }`}
                    >
                      {svc.title[lang]}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-[0.15em] mt-0.5 transition-colors ${
                        isActive ? "text-accent/80" : "text-muted/60"
                      }`}
                    >
                      {svc.category[lang]}
                    </span>
                  </div>

                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-accent text-xs flex-shrink-0"
                  >
                    →
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── MIDDLE: building cutaway ── */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6">
          {/* Cutaway header label */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            <div className="h-px w-6 bg-accent/60" />
            <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-accent/70">
              {ui.cutawayKick}
            </span>
            <span className="font-mono text-[9px] tracking-[0.15em] text-muted/60">
              · {activeService ? activeService.category[lang] : ui.cutawayIdle}
            </span>
            <div className="h-px w-6 bg-accent/60" />
          </div>

          <div className="w-full max-w-[680px] aspect-[4/3]">
            <BuildingCutaway activeLayers={activeLayers} />
          </div>

          {/* Hint at bottom */}
          <AnimatePresence>
            {activeIdx === null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none font-mono text-[9px] tracking-[0.3em] uppercase text-text/40 whitespace-nowrap"
              >
                ← {ui.selectHint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: detail panel ── */}
        <div className="relative flex w-[30%] flex-shrink-0 flex-col justify-center border-l border-border bg-surface/40 backdrop-blur-md">
          <AnimatePresence mode="wait">
            {activeService ? (
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 py-8 lg:px-8 overflow-y-auto max-h-full"
              >
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-border bg-surface2">
                  <div className="relative aspect-[16/10] w-full">
                    {/* Use Next/Image when local, regular img when remote — Unsplash URLs are remote */}
                    <Image
                      src={activeService.image}
                      alt={activeService.title[lang]}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />

                    {/* Corner brackets */}
                    <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/60" />
                    <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent/60" />
                    <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent/60" />
                    <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/60" />

                    {/* Icon + title overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-bg/70 backdrop-blur-md">
                        <activeService.Icon className="h-5 w-5 text-accent" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent/80">
                          {activeService.category[lang]}
                        </p>
                        <h3 className="text-[18px] font-bold leading-tight text-text">
                          {activeService.title[lang]}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-[13px] leading-[1.75] text-text/75">
                  {activeService.description[lang]}
                </p>

                {/* Steps */}
                <div className="mb-6 border-t border-border pt-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted mb-3">
                    {ui.stepsLabel}
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-start gap-2">
                        <span className="mt-[1px] font-mono text-[10px] text-accent/75">
                          0{i + 1}
                        </span>
                        <span className="text-[11px] leading-snug text-text/75">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/${lang}/services/${activeService.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-accent/30 bg-accent/[0.08] px-4 py-3 transition hover:border-accent/50 hover:bg-accent/[0.14]"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent/80">
                      {ui.scopeKick}
                    </p>
                    <p className="mt-0.5 text-[13px] font-semibold text-text">
                      {ui.viewScope}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg/40 text-text transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-8 lg:px-8"
              >
                <div className="max-w-[260px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70 mb-3">
                    {ui.detailKick}
                  </p>
                  <p className="text-[13px] leading-[1.75] text-text/55">
                    {ui.emptyDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE
          ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative z-20 px-4 pt-8 pb-12">
        {/* Mobile cutaway preview */}
        <div className="mb-6 rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-4 bg-accent/60" />
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-accent/70">
              {ui.cutawayKick}
            </span>
          </div>
          <div className="aspect-[4/3] w-full">
            <BuildingCutaway activeLayers={activeLayers} />
          </div>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SERVICES.map((svc, i) => {
            const Icon = svc.Icon;
            const isActive = activeIdx === i;
            return (
              <button
                key={svc.slug}
                onClick={() => handleSelect(i)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
                  isActive
                    ? "border-accent/40 bg-accent/10"
                    : "border-border bg-text/5 hover:border-text/20"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                    isActive ? "border-accent/40 bg-accent/10" : "border-border bg-text/5"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-text/50"}`} aria-hidden />
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide leading-tight ${
                    isActive ? "text-text" : "text-text/60"
                  }`}
                >
                  {svc.title[lang]}
                </span>
                <span
                  className={`text-[8px] uppercase tracking-wider ${
                    isActive ? "text-accent/80" : "text-muted/60"
                  }`}
                >
                  {svc.category[lang]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile detail */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-2xl border border-border bg-surface p-5"
            >
              <div className="relative aspect-[16/10] w-full mb-4 overflow-hidden rounded-xl border border-border">
                <Image
                  src={activeService.image}
                  alt={activeService.title[lang]}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/85 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg/70 backdrop-blur-md">
                    <activeService.Icon className="h-4 w-4 text-accent" aria-hidden />
                  </div>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-accent/80">
                      {activeService.category[lang]}
                    </p>
                    <h3 className="text-sm font-bold text-text leading-tight">
                      {activeService.title[lang]}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed mb-5">
                {activeService.description[lang]}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {steps.map((step, i) => (
                  <div key={step} className="flex flex-col gap-1 border-l-2 border-accent/30 pl-2">
                    <span className="font-mono text-[8px] text-accent/60">0{i + 1}</span>
                    <span className="text-[10px] text-text/80 font-medium leading-tight">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/${lang}/services/${activeService.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent border border-accent/40 px-4 py-3 text-xs font-bold text-white"
              >
                <span>{ui.viewScope}</span>
                <span>→</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}