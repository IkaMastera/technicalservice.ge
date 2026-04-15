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

// ── Static data — defined outside component ──

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

// Mockup data for real-world images and short descriptions. 
// Replace these Unsplash URLs with your actual real-world project photos.
const SERVICE_ASSETS: Record<string, { img: string, desc: { en: string, ka: string } }> = {
  "building-exterior-interior": {
    img: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    desc: {
      en: "Heavy-duty construction and structural finishing executed with exact tolerances. We handle the physical shell so the internal systems have a perfect foundation.",
      ka: "მძიმე კონსტრუქციული და მოსაპირკეთებელი სამუშაოები ზუსტი ტოლერანტობით. ჩვენ ვუზრუნველყოფთ იდეალურ საძირკველს შიდა სისტემებისთვის.",
    }
  },
  "electrical-systems": {
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    desc: {
      en: "Industrial-grade electrical routing, load balancing, and panel installations. No chaos wiring—just clean, documented, and fully inspected power grids.",
      ka: "ინდუსტრიული დონის ელექტრო გაყვანილობა და პანელების მონტაჟი. სუფთა, დოკუმენტირებული და სრულად შემოწმებული ელექტრო ქსელები.",
    }
  },
  "air-conditioning": {
    img: "https://images.unsplash.com/photo-1581092591462-8178dcc2bc5d?auto=format&fit=crop&q=80&w=800",
    desc: {
      en: "High-capacity HVAC solutions designed for optimal airflow and thermal efficiency. We engineer systems that handle peak loads without breaking a sweat.",
      ka: "მაღალი სიმძლავრის HVAC გადაწყვეტილებები ოპტიმალური ჰაერნაკადისთვის. ჩვენ ვაპროექტებთ სისტემებს, რომლებიც უძლებენ მაქსიმალურ დატვირთვას.",
    }
  },
  // Fallback for everything else to keep this snippet clean
  "default": {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    desc: {
      en: "Precision engineering, rigorous testing, and seamless integration. Our team ensures this system operates flawlessly within your broader infrastructure.",
      ka: "ზუსტი ინჟინერია, მკაცრი ტესტირება და უნაკლო ინტეგრაცია. ჩვენი გუნდი უზრუნველყოფს ამ სისტემის უნაკლო მუშაობას.",
    }
  }
};

const DELIVERY_STEPS = {
  en: ["Design & engineering", "Installation", "Testing & handover", "Long-term maintenance"],
  ka: ["პროექტირება", "მონტაჟი", "ტესტირება და ჩაბარება", "გრძელვადიანი სერვისი"],
} as const;

const PANEL_STYLE = {
  background: "color-mix(in srgb, var(--color-bg) 90%, transparent)",
  backdropFilter: "blur(12px)",
} as const;

const ICON_ACTIVE_STYLE = {
  background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
  border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
  boxShadow: "0 0 20px color-mix(in srgb, var(--color-accent) 12%, transparent)",
} as const;

const MOBILE_DETAIL_STYLE = {
  background: "var(--color-surface)",
  border: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
} as const;

const AMBIENT_STYLE = {
  background: "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, transparent 65%)",
} as const;

// ── Clip reveal component ──
function Clip({ children, delay = 0, slideKey, className = "" }: { children: React.ReactNode; delay?: number; slideKey: string; className?: string; }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slideKey}
          initial={{ y: "105%" }}
          animate={{ y: "0%", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay } }}
          exit={{ y: "-105%", transition: { duration: 0.28, ease: [0.7, 0, 0.84, 0] } }}
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
  
  // Get active assets (image and description)
  const activeAssets = activeService 
    ? (SERVICE_ASSETS[activeService.slug] || SERVICE_ASSETS["default"]) 
    : null;

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const init = {
        clientX: e.clientX, clientY: e.clientY, screenX: e.screenX, screenY: e.screenY,
        movementX: e.movementX, movementY: e.movementY, bubbles: false, cancelable: true, view: window,
      };
      canvas.dispatchEvent(new MouseEvent("mousemove", init));
      canvas.dispatchEvent(new PointerEvent("pointermove", { ...init, pointerId: 1, pointerType: "mouse", isPrimary: true }));
    };
    document.addEventListener("pointermove", handler, { passive: true });
    return () => document.removeEventListener("pointermove", handler);
  }, []);

  const onLoad = useCallback((app: Application) => {
    canvasRef.current = app.canvas as HTMLCanvasElement | null;
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.addEventListener("wheel", (e: WheelEvent) => {
          e.preventDefault(); e.stopPropagation();
          window.scrollBy({ top: e.deltaY * 1.5, behavior: "auto" });
        }, { passive: false, capture: true });
      }
    } catch (_) {}
  }, []);

  const handleSelect = useCallback((i: number) => {
    setActiveIdx((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section id="services" className="relative bg-bg overflow-hidden" style={{ height: "100vh" }}>
      <div className="absolute inset-0 pointer-events-none" style={AMBIENT_STYLE} />

      {/* Section title */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pt-6 lg:px-8 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="h-8 w-1 rounded-full bg-accent" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-text">
            TSC <span className="text-accent">Services</span>
          </h2>
        </div>
        <Link
          href={`/${lang}/services`}
          className="pointer-events-auto flex items-center gap-2 rounded-xl border border-border bg-text/5 px-4 py-2 text-[11px] font-semibold text-muted transition hover:border-text/20 hover:text-text"
        >
          {lang === "en" ? "View all" : "ყველა"} →
        </Link>
      </div>

      {/* Spline — full section */}
      {!reduceMotion && (
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-x-0 top-0 h-28 z-20 pointer-events-none hidden dark:block" style={{ background: "linear-gradient(180deg, var(--color-bg) 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-20 z-20 pointer-events-none hidden dark:block" style={{ background: "linear-gradient(0deg, var(--color-bg) 0%, transparent 100%)" }} />
          <Spline scene="https://prod.spline.design/T0U-FbppQxrzvUlN/scene.splinecode" onLoad={onLoad} style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      {/* ── DESKTOP — 3-column layout ── */}
      <div className="absolute inset-0 hidden lg:flex">

        {/* LEFT — permanent service list */}
        <div className="relative z-30 flex w-[26%] flex-shrink-0 flex-col justify-center border-r border-border" style={PANEL_STYLE}>
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none" style={{ background: "linear-gradient(180deg, var(--color-bg) 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(0deg, var(--color-bg) 0%, transparent 100%)" }} />

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
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex items-center gap-4 py-2.5 text-left"
                >
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 bottom-1 w-[2px] rounded-full bg-accent origin-center"
                    style={{ left: "-20px" }}
                  />
                  <span className={`font-mono text-[9px] w-5 flex-shrink-0 transition-colors duration-150 ${isActive ? "text-accent" : "text-text/30 group-hover:text-text/50"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? "color-mix(in srgb, var(--color-accent) 15%, transparent)" : "color-mix(in srgb, var(--color-text) 4%, transparent)",
                      borderColor: isActive ? "color-mix(in srgb, var(--color-accent) 40%, transparent)" : "color-mix(in srgb, var(--color-text) 8%, transparent)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border"
                  >
                    <Icon className={`h-6 w-6 transition-colors duration-150 ${isActive ? "text-accent" : "text-text/40 group-hover:text-text/70"}`} aria-hidden />
                  </motion.div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className={`text-[12px] font-semibold leading-tight truncate transition-colors duration-150 ${isActive ? "text-text" : "text-text/60 group-hover:text-text/90"}`}>
                      {svc.title}
                    </span>
                    <span className={`text-[9px] uppercase tracking-[0.15em] mt-0.5 transition-colors duration-150 ${isActive ? "text-accent/80" : "text-muted/60"}`}>
                      {cat}
                    </span>
                  </div>
                  <motion.span animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }} transition={{ duration: 0.15 }} className="text-accent text-xs flex-shrink-0">
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 2.0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none font-mono text-[7px] tracking-[0.35em] uppercase text-text/40 whitespace-nowrap"
              >
                {lang === "en" ? "← select a service" : "← აირჩიეთ სერვისი"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Minimal Premium Detail Panel */}
        <div
          className="relative z-30 flex w-[28%] flex-shrink-0 flex-col justify-center border-l border-white/10 bg-[rgba(5,10,20,0.72)] backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {activeService && activeAssets ? (
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 py-8 lg:px-8"
              >
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                  <div className="relative h-[220px] w-full">
                    <img
                      src={activeAssets.img}
                      alt={activeService.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,8,18,0.92)] via-[rgba(4,8,18,0.18)] to-transparent" />

                    {/* subtle corner accents */}
                    <div className="absolute left-4 top-4 h-4 w-4 border-l border-t border-accent/60" />
                    <div className="absolute right-4 top-4 h-4 w-4 border-r border-t border-accent/60" />
                    <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-accent/60" />
                    <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-accent/60" />

                    <div className="absolute bottom-5 left-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-[rgba(8,14,28,0.55)] backdrop-blur-md">
                        <activeService.Icon className="h-5 w-5 text-accent" aria-hidden />
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent/80">
                          {CATEGORY_BY_SLUG[activeService.slug]}
                        </p>
                        <h3 className="text-[24px] font-black leading-tight text-white">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-7">
                  <p className="text-[13px] leading-[1.8] text-white/68">
                    {activeAssets.desc[lang]}
                  </p>
                </div>

                {/* Steps */}
                <div className="mb-7 border-t border-white/10 pt-5">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-start gap-3">
                        <span className="mt-[2px] font-mono text-[10px] text-accent/75">
                          0{i + 1}
                        </span>
                        <span className="text-[11px] leading-relaxed text-white/78">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/${lang}/services/${activeService.slug}`}
                  className="group flex items-center justify-between rounded-[18px] border border-accent/25 bg-[linear-gradient(180deg,rgba(34,120,255,0.18),rgba(34,120,255,0.10))] px-5 py-4 transition-all duration-300 hover:border-accent/40 hover:bg-[linear-gradient(180deg,rgba(34,120,255,0.24),rgba(34,120,255,0.14))]"
                >
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent/75">
                      {lang === "en" ? "Service scope" : "სერვისის სკოუპი"}
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-white">
                      {lang === "en" ? "View Full Breakdown" : "სრული განხილვის ნახვა"}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:translate-x-1">
                    <span className="text-white/85">→</span>
                  </div>
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
                <div className="max-w-[240px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/70 mb-3">
                    {lang === "en" ? "Service details" : "სერვისის დეტალები"}
                  </p>
                  <p className="text-[13px] leading-relaxed text-white/55">
                    {lang === "en"
                      ? "Select a service to view its scope, value, and execution flow."
                      : "აირჩიეთ სერვისი რომ ნახოთ მისი სკოუპი, ღირებულება და შესრულების პროცესი."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE (Also Updated to Dossier Style) ── */}
      <div className="lg:hidden absolute inset-0 overflow-y-auto z-20">
        <div className="min-h-full flex flex-col px-4 pt-20 pb-8">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SERVICES.map((svc, i) => {
              const Icon = svc.Icon;
              const isActive = activeIdx === i;
              const cat = CATEGORY_BY_SLUG[svc.slug] ?? "";
              return (
                <button
                  key={svc.slug} onClick={() => handleSelect(i)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 ${isActive ? "border-accent/40 bg-accent/10" : "border-text/10 bg-text/5 hover:border-text/20"}`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${isActive ? "border-accent/40 bg-accent/10" : "border-text/10 bg-text/5"}`}>
                    <Icon className={`h-6 w-6 transition-colors ${isActive ? "text-accent" : "text-text/50"}`} aria-hidden />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide leading-tight transition-colors ${isActive ? "text-text" : "text-text/60"}`}>
                    {svc.title}
                  </span>
                  <span className={`text-[8px] uppercase tracking-wider transition-colors ${isActive ? "text-accent/80" : "text-muted/60"}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeService && activeAssets && (
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.3 }}
                className="mt-6 rounded-3xl p-5 border shadow-xl"
                style={MOBILE_DETAIL_STYLE}
              >
                {/* Mobile Image */}
                <div className="relative w-full h-[140px] rounded-xl overflow-hidden mb-5 border border-border">
                  <img src={activeAssets.img} alt={activeService.title} className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg/80 backdrop-blur-md border border-border">
                      <activeService.Icon className="h-4 w-4 text-accent" aria-hidden />
                    </div>
                    <div>
                      <p className="text-[7px] font-mono uppercase tracking-wider text-accent">{CATEGORY_BY_SLUG[activeService.slug]}</p>
                      <h3 className="text-sm font-bold text-text leading-tight">{activeService.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted mb-6 leading-relaxed">
                  {activeAssets.desc[lang]}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {steps.map((step, i) => (
                    <div key={step} className="flex flex-col gap-1 border-l-2 border-accent/30 pl-2">
                      <span className="font-mono text-[7px] text-accent/60">0{i + 1}</span>
                      <span className="text-[9px] text-text/80 font-medium leading-tight">{step}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${lang}/services/${activeService.slug}`}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-accent to-accent2 border border-accent/40 px-4 py-3 text-xs font-bold text-white transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[tsc-btn-sweep_2s_infinite_ease-in-out]" />
                  <span className="relative z-10">{lang === "en" ? "View Full Scope" : "სრული სკოუპი"}</span>
                  <span className="relative z-10">→</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}