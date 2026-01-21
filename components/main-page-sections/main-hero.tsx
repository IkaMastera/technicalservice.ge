"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { copy, type Lang } from "@/content/copy";

type HeroVideoProps = {
  posterSrc?: string;
  className?: string;
  lang?: Lang;
};

export default function HeroVideo({
  posterSrc = "/media/images/main-page/main-hero.webp",
  className,
  lang = "en",
}: HeroVideoProps) {
  const reduceMotion = useReducedMotion();
  const t = copy[lang].home.hero;

  return (
    <section className={`relative min-h-[100vh] overflow-hidden ${className ?? ""}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B0F14]">
        {/* Base depth */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,25,38,0.92) 0%, rgba(11,15,20,1) 100%)",
          }}
        />

        {/* Blueprint image */}
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={[
            "absolute inset-0 object-cover opacity-[0.58] md:opacity-[0.62]",
            !reduceMotion ? "hero-cad-drift" : "",
          ].join(" ")}
        />

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 55% 35%, rgba(11,15,20,0.10) 0%, rgba(11,15,20,0.55) 70%, rgba(11,15,20,0.82) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,15,20,0.96) 0%, rgba(11,15,20,0.90) 28%, rgba(11,15,20,0.58) 42%, rgba(11,15,20,0.00) 52%, rgba(11,15,20,0.00) 100%)",
          }}
        />

        {!reduceMotion ? (
          <div
            className="absolute inset-y-0 left-0 w-[58%] hero-cad-grid"
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-y-0 left-0 w-[58%] hero-cad-grid hero-cad-grid--static"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100vh] max-w-6xl items-center px-4 py-16 md:px-6">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] tracking-wide backdrop-blur"
          >
            <span className="text-[#EAF1FF]">{t.strap[0]}</span>
            <span className="opacity-50 text-[#9FB0C8]">•</span>
            <span className="text-[#9FB0C8]">{t.strap[1]}</span>
            <span className="opacity-50 text-[#9FB0C8]">•</span>
            <span className="text-[#9FB0C8]">{t.strap[2]}</span>
            <span className="opacity-50 text-[#9FB0C8]">•</span>
            <span className="text-[#9FB0C8]">{t.strap[3]}</span>
            <span className="opacity-50 text-[#9FB0C8]">•</span>
            <span className="text-[#9FB0C8]">{t.strap[4]}</span>
            <span className="opacity-50 text-[#9FB0C8]">•</span>
            <span className="text-[#9FB0C8]">{t.strap[5]}</span>
            <span className="opacity-50 text-[#9FB0C8]">•</span>
            <span className="text-[#9FB0C8]">{t.strap[6]}</span>
          </motion.div>

          {/* Left rail / label panel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.06 }}
            className="mt-6 border-l border-white/15 bg-black/20 pl-5 pr-2 py-2 md:pl-7"
          >
            <div className="text-xs font-semibold tracking-wider text-[#9FB0C8]">
              {t.kicker}
            </div>

            <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#EAF1FF] md:text-4xl">
              {t.title}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[#9FB0C8] md:text-base">
              {t.desc}
            </p>

            {/* Trust line */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#9FB0C8]">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                {t.trustA}
              </span>
              <span className="opacity-40">•</span>
              <span>{t.trustB}</span>
              <span className="opacity-40">•</span>
              <span>{t.trustC}</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonPrimary className="button-primary--hero w-full sm:w-auto">
                <Link href={`/${lang}/contact`} className="block w-full text-center text-white">
                  {t.ctaContact}
                </Link>
              </ButtonPrimary>

              <Link
                href={`/${lang}/portfolio`}
                className="
                  inline-flex w-full items-center justify-center
                  rounded-xl
                  border border-white/15
                  bg-white/5
                  px-6 py-3
                  text-sm font-semibold text-[#EAF1FF]
                  transition
                  hover:bg-white/8
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                {t.ctaPortfolio}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}