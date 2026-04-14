"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { type Application } from "@splinetool/runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SERVICES } from "@/data/services";
import { copy } from "@/content/copy";

// Lazy load Spline — does not block page hydration
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

type Lang = "en" | "ka";

// ── Static data — defined outside component so they're never recreated ──

const CATEGORY_BY_SLUG: Record<string, string> = {
  "building-exterior-interior": "Construction",
  "fire-alarm-sound":           "Fire Systems",
  "generator-transformer":      "Power",
  "electrical-systems":         "Electrical",
  "air-conditioning":           "HVAC",
  "plumbing-mechanical":        "Plumbing",
  "boiler-heating":             "Heating",
  "water-treatment":            "Water",
  "kitchen-laundry":            "Appliances",
  "telecommunication-tv":       "Low Voltage",
  "cctv-monitoring":            "CCTV",
  "parking-automation":         "Automation",
};

const DELIVERY_STEPS = {
  en: ["Design & engineering", "Installation", "Testing & handover", "Long-term maintenance"],
  ka: ["პროექტირება", "მონტაჟი", "ტესტირება და ჩაბარება", "გრძელვადიანი სერვისი"],
} as const;

const PANEL_STYLE = {
  background: "rgba(8,7,6,0.85)",
  backdropFilter: "blur(12px)",
} as const;

const ICON_ACTIVE_STYLE = {
  background: "rgba(255,122,53,0.12)",
  border: "1px solid rgba(255,122,53,0.3)",
  boxShadow: "0 0 20px rgba(255,122,53,0.12)",
} as const;

const STEP_ICON_STYLE = {
  background: "rgba(255,122,53,0.08)",
  border: "1px solid rgba(255,122,53,0.15)",
} as const;

const MOBILE_DETAIL_STYLE = {
  background: "rgba(8,7,6,0.95)",
  border: "1px solid rgba(255,122,53,0.15)",
} as const;

const MOBILE_ICON_STYLE = {
  background: "rgba(255,122,53,0.12)",
  border: "1px solid rgba(255,122,53,0.3)",
} as const;

const AMBIENT_STYLE = {
  background: "radial-gradient(ellipse at 50% 50%, rgba(255,122,53,0.04) 0%, transparent 65%)",
} as const;

// ── Clip reveal component ──

function Clip({
  children,
  delay = 0,
  slideKey,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  slideKey: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slideKey}
          initial={{ y: "105%" }}
          animate={{
            y: "0%",
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
          }}
          exit={{
            y: "-105%",
            transition: { duration: 0.28, ease: [0.7, 0, 0.84, 0] },
          }}
          style={{ willChange: "transform" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main component ──

export default function RobotServicesSection({ lang = "en" }: { lang?: Lang }) {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeService = activeIdx !== null ? SERVICES[activeIdx] : null;
  const steps = DELIVERY_STEPS[lang];
  const t = copy[lang].home.services;

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const init = {
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        movementX: e.movementX,
        movementY: e.movementY,
        bubbles: false,
        cancelable: true,
        view: window,
      };
      canvas.dispatchEvent(new MouseEvent("mousemove", init));
      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          ...init,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
        })
      );
    };
    document.addEventListener("pointermove", handler, { passive: true });
    return () => document.removeEventListener("pointermove", handler);
  }, []);

  const onLoad = useCallback((app: Application) => {
    canvasRef.current = app.canvas as HTMLCanvasElement | null;
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.addEventListener(
          "wheel",
          (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            window.scrollBy({ top: e.deltaY * 1.5, behavior: "auto" });
          },
          { passive: false, capture: true }
        );
      }
    } catch (_) {}
  }, []);

  const handleSelect = useCallback((i: number) => {
    setActiveIdx((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section
      id="services"
      className="relative bg-[#080706] overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={AMBIENT_STYLE} />

      {/* Section title */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pt-6 lg:px-8 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="h-8 w-1 rounded-full bg-accent" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            TSC <span className="text-accent">Services</span>
          </h2>
        </div>
        <Link
          href={`/${lang}/services`}
          className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold text-white/50 transition hover:border-white/20 hover:text-white"
        >
          {lang === "en" ? "View all" : "ყველა"} →
        </Link>
      </div>

      {/* Spline — full section */}
      {!reduceMotion && (
        <div className="absolute inset-0 z-10">
          <div
            className="absolute inset-x-0 top-0 h-28 z-20 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #080706 0%, transparent 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 z-20 pointer-events-none"
            style={{ background: "linear-gradient(0deg, #080706 0%, transparent 100%)" }}
          />
          <Spline
            scene="https://prod.spline.design/T0U-FbppQxrzvUlN/scene.splinecode"
            onLoad={onLoad}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* ── DESKTOP — 3-column layout ── */}
      <div className="absolute inset-0 hidden lg:flex">

        {/* LEFT — permanent service list */}
        <div
          className="relative z-30 flex w-[26%] flex-shrink-0 flex-col justify-center border-r border-white/5"
          style={PANEL_STYLE}
        >
          <div
            className="absolute inset-x-0 top-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #080706 0%, transparent 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(0deg, #080706 0%, transparent 100%)" }}
          />

          <div className="flex flex-col px-5 lg:px-7 overflow-y-auto">
            {SERVICES.map((svc, i) => {
              const isActive = activeIdx === i;
              const Icon = svc.Icon;
              const cat = CATEGORY_BY_SLUG[svc.slug] ?? "";

              return (
                <motion.button
                  key={svc.slug}
                  onClick={() => handleSelect(i)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.04,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex items-center gap-3 py-2.5 text-left"
                >
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 bottom-1 w-[2px] rounded-full bg-accent origin-center"
                    style={{ left: "-20px" }}
                  />

                  <span className={`font-mono text-[9px] w-5 flex-shrink-0 transition-colors duration-150 ${isActive ? "text-accent" : "text-white/15 group-hover:text-white/30"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <motion.div
                    animate={{
                      backgroundColor: isActive ? "rgba(255,122,53,0.15)" : "rgba(255,255,255,0.03)",
                      borderColor: isActive ? "rgba(255,122,53,0.4)" : "rgba(255,255,255,0.07)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border"
                  >
                    <Icon className={`h-5 w-5 transition-colors duration-150 ${isActive ? "text-accent" : "text-white/25 group-hover:text-white/55"}`} aria-hidden />
                  </motion.div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className={`text-[12px] font-semibold leading-tight truncate transition-colors duration-150 ${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                      {svc.title}
                    </span>
                    <span className={`text-[9px] uppercase tracking-[0.15em] mt-0.5 transition-colors duration-150 ${isActive ? "text-accent/60" : "text-white/20"}`}>
                      {cat}
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

        {/* CENTER — spacer */}
        <div className="relative flex-1 z-10">
          <AnimatePresence>
            {activeIdx === null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2.0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none font-mono text-[7px] tracking-[0.35em] uppercase text-white/10 whitespace-nowrap"
              >
                {lang === "en" ? "← select a service" : "← აირჩიეთ სერვისი"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — detail panel */}
        <div
          className="relative z-30 flex w-[26%] flex-shrink-0 flex-col justify-center border-l border-white/5"
          style={PANEL_STYLE}
        >
          <AnimatePresence mode="wait">
            {activeService ? (
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col px-6 lg:px-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl" style={ICON_ACTIVE_STYLE}>
                    <activeService.Icon className="h-5 w-5 text-accent" aria-hidden />
                  </div>
                  <div>
                    <Clip slideKey={`cat-${activeService.slug}`}>
                      <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-accent/50">
                        {CATEGORY_BY_SLUG[activeService.slug]}
                      </span>
                    </Clip>
                    <Clip slideKey={`title-${activeService.slug}`} delay={0.04}>
                      <h3 className="text-sm font-bold text-white leading-tight mt-0.5">
                        {activeService.title}
                      </h3>
                    </Clip>
                  </div>
                </div>

                <motion.div
                  className="h-px bg-white/6 mb-5"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  style={{ transformOrigin: "left" }}
                />

                <Clip slideKey={`steps-${activeService.slug}`} delay={0.1} className="mb-5">
                  <div className="flex flex-col gap-3">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md" style={STEP_ICON_STYLE}>
                          <span className="font-mono text-[7px] text-accent/50">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <span className="text-[11px] text-white/40">{step}</span>
                      </div>
                    ))}
                  </div>
                </Clip>

                <div className="h-px w-8 bg-accent/30 mb-5" />

                <Clip slideKey={`cta-${activeService.slug}`} delay={0.16}>
                  <Link
                    href={`/${lang}/services/${activeService.slug}`}
                    className="group inline-flex items-center justify-between rounded-xl bg-accent px-4 py-3 text-xs font-bold text-white transition hover:bg-accent2 active:scale-[0.98] shadow-[0_4px_16px_rgba(255,122,53,0.25)]"
                  >
                    <span>{lang === "en" ? "View full scope" : "სრული სკოუპი"}</span>
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </Clip>

                <div className="mt-6 flex items-center gap-2">
                  <span className="font-mono text-[8px] text-white/15">
                    {String((activeIdx ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(SERVICES.length).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px bg-white/6" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start px-6 lg:px-8"
              >
                <div className="h-px w-8 bg-accent/20 mb-4" />
                <p className="text-[10px] text-white/20 leading-relaxed max-w-[160px]">
                  {lang === "en"
                    ? "Select any service from the list to view scope and details."
                    : "აირჩიეთ სერვისი სიისგან დეტალების სანახავად."}
                </p>
                <div className="mt-6 flex flex-col gap-1.5">
                  {(["Design", "Install", "Maintain"] as const).map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="h-px w-3 bg-accent/20" />
                      <span className="text-[9px] uppercase tracking-wider text-white/15">{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden absolute inset-0 overflow-y-auto z-20">
        <div className="min-h-full flex flex-col px-4 pt-20 pb-8">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SERVICES.map((svc, i) => {
              const Icon = svc.Icon;
              const isActive = activeIdx === i;
              const cat = CATEGORY_BY_SLUG[svc.slug] ?? "";
              return (
                <button
                  key={svc.slug}
                  onClick={() => handleSelect(i)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 ${isActive ? "border-accent/40 bg-accent/10" : "border-white/8 bg-white/[0.03] hover:border-white/15"}`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${isActive ? "border-accent/40 bg-accent/10" : "border-white/8 bg-white/[0.03]"}`}>
                    <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-accent" : "text-white/40"}`} aria-hidden />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide leading-tight transition-colors ${isActive ? "text-white" : "text-white/40"}`}>
                    {svc.title}
                  </span>
                  <span className={`text-[8px] uppercase tracking-wider transition-colors ${isActive ? "text-accent/50" : "text-white/20"}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeService && (
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                className="mt-4 rounded-2xl p-5"
                style={MOBILE_DETAIL_STYLE}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={MOBILE_ICON_STYLE}>
                    <activeService.Icon className="h-5 w-5 text-accent" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono uppercase tracking-wider text-accent/50">
                      {CATEGORY_BY_SLUG[activeService.slug]}
                    </p>
                    <h3 className="text-sm font-bold text-white">{activeService.title}</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="font-mono text-[8px] text-accent/40">{String(i + 1).padStart(2, "0")}</span>
                      <div className="h-px w-3 bg-accent/20" />
                      <span className="text-[11px] text-white/40">{step}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${lang}/services/${activeService.slug}`}
                  className="flex items-center justify-between rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white transition hover:bg-accent2 active:scale-[0.98]"
                >
                  <span>{lang === "en" ? "View full scope" : "სრული სკოუპი"}</span>
                  <span>→</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}