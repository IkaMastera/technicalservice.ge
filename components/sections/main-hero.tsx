"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonPrimary } from "@/components/ui/button-primary";

type HeroVideoProps = {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
};

export default function HeroVideo({
  videoSrc = "/media/images/main-page/main-hero-video1080.webm",
  posterSrc = "/media/images/main-page/main-hero-video1080.webp",
  className,
}: HeroVideoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Background media */}
      <div className="absolute inset-0">
        {/* Poster always present (fast first paint) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${posterSrc})` }}
          aria-hidden="true"
        />

        {/* Video only when motion is allowed */}
        {!reduceMotion && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        )}

        {/* Dark scrim (readability) */}
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        {/* Blueprint grid overlay (subtle) */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        {/* “Dossier / spec header strip” */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#121926]/80 px-3 py-2 text-[11px] tracking-wide text-[#9FB0C8] backdrop-blur"
        >
          <span className="text-[#EAF1FF]">MEP SYSTEMS</span>
          <span className="opacity-50">•</span>
          <span>FIRE</span>
          <span className="opacity-50">•</span>
          <span>ELECTRICAL</span>
          <span className="opacity-50">•</span>
          <span>HVAC</span>
          <span className="opacity-50">•</span>
          <span>CCTV</span>
          <span className="opacity-50">•</span>
          <span>AUTOMATION</span>
          <span className="opacity-50">•</span>
          <span>GEORGIA</span>
        </motion.div>

        {/* Main spec card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, delay: 0.06 }}
          className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-[#0B0F14]/70 p-5 backdrop-blur md:p-7"
        >
          <div className="text-xs font-semibold tracking-wider text-[#9FB0C8]">
            SECTION 01 — OVERVIEW
          </div>

          <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#EAF1FF] md:text-4xl">
            Engineering, installation, and maintenance of critical building systems.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#9FB0C8] md:text-base">
            Fire safety, electrical, HVAC & ventilation, CCTV, and low-voltage automation —
            executed with inspection-ready discipline and long-term reliability.
          </p>

          {/* Trust line */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#9FB0C8]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FFB020]" aria-hidden="true" />
              Compliance-ready
            </span>
            <span className="opacity-40">•</span>
            <span>Commercial & residential</span>
            <span className="opacity-40">•</span>
            <span>Install + maintenance</span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonPrimary className="button-primary--hero button-primary--full sm:button-primary--auto">
                <Link href="/en/contact" className="block w-full text-center">
                    Request Quote
                </Link>
            </ButtonPrimary>

            <Link
              href="/en/portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-[#EAF1FF] transition hover:bg-white/[0.06] active:scale-[0.98]"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}