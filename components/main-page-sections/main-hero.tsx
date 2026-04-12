"use client";

import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { type Application } from "@splinetool/runtime";
import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonPrimary } from "@/components/ui/button-primary";
import { copy, type Lang } from "@/content/copy";

type HeroVideoProps = {
  className?: string;
  lang?: Lang;
};

export default function HeroVideo({
  className,
  lang = "en",
}: HeroVideoProps) {
  const reduceMotion = useReducedMotion();
  const t = copy[lang].home.hero;

  const onLoad = useCallback((app: Application) => {
    try {
      const tryNames = ["Camera", "Personal Camera", "camera", "Cam"];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cam: any = undefined;
      for (const name of tryNames) {
        const found = app.findObjectByName(name);
        if (found) { cam = found; break; }
      }
      if (cam) {
        cam.position.z *= 1.5;
      }

      // Kill wheel zoom only — all other mouse events pass through
      const canvas = app.canvas as HTMLCanvasElement | null;
      if (canvas) {
        canvas.addEventListener(
          "wheel",
          (e: WheelEvent) => { e.preventDefault(); e.stopPropagation(); },
          { passive: false, capture: true }
        );
      }
    } catch (_) {}
  }, []);

  return (
    <section className={`relative min-h-[100vh] overflow-hidden ${className ?? ""}`}>

      {/* Solid dark base */}
      <div className="absolute inset-0 bg-[#080706]" />

      {/* Spline — full right side */}
      {!reduceMotion && (
        <div
          className="absolute inset-y-0 right-0 hidden md:block"
          style={{ width: "52%" }}
          aria-hidden="true"
        >
          {/* Gradient fades — pointer-events-none so hover reaches Spline */}
          <div className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{ width: "55%", background: "linear-gradient(90deg, #080706 0%, rgba(8,7,6,0.96) 40%, rgba(8,7,6,0.55) 75%, transparent 100%)" }}
          />
          <div className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{ height: "200px", background: "linear-gradient(180deg, #080706 0%, transparent 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{ height: "200px", background: "linear-gradient(0deg, #080706 0%, transparent 100%)" }}
          />
          <div className="absolute inset-y-0 right-0 z-10 pointer-events-none"
            style={{ width: "60px", background: "linear-gradient(270deg, #080706 0%, transparent 100%)" }}
          />

          <Spline
            scene="https://prod.spline.design/7wCoLJVRgGEjN8c0/scene.splinecode"
            onLoad={onLoad}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}


      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100vh] max-w-7xl items-center px-4 py-16 md:px-6">
        <div className="w-full md:w-[52%]">

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

            {/* Buttons — pointer-events-auto so they are still clickable */}
            <div className="pointer-events-auto mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonPrimary className="button-primary--hero w-full sm:w-auto">
                <Link href={`/${lang}/contact`} className="block w-full text-center text-white">
                  {t.ctaContact}
                </Link>
              </ButtonPrimary>

              <Link
                href={`/${lang}/portfolio`}
                className="
                  inline-flex w-full items-center justify-center
                  rounded-xl border border-white/15 bg-white/5
                  px-6 py-3 text-sm font-semibold text-[#EAF1FF]
                  transition hover:bg-white/8 active:scale-[0.98] sm:w-auto
                "
              >
                {t.ctaPortfolio}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom section fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 z-10 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #080706)" }}
      />
    </section>
  );
}