"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SERVICES } from "@/data/services";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const CATEGORY_BY_SLUG: Record<string, string> = {
  "building-exterior-interior": "Construction",
  "fire-alarm-sound": "Fire Systems",
  "generator-transformer": "Power",
  "electrical-systems": "Electrical",
  "air-conditioning": "HVAC",
  "plumbing-mechanical": "Plumbing",
  "boiler-heating": "Heating",
  "water-treatment": "Water",
  "kitchen-laundry": "Appliances",
  "telecommunication-tv": "Low Voltage",
  "cctv-monitoring": "CCTV",
  "parking-automation": "Automation",
};

export default function ServicesIndex() {
  const reduce = useReducedMotion();

  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const cats = useMemo(() => {
    const set = new Set<string>();
    SERVICES.forEach((s) => set.add(CATEGORY_BY_SLUG[s.slug] ?? "General"));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const cat = CATEGORY_BY_SLUG[s.slug] ?? "General";
      const matchesCat = activeCat === "All" || cat === activeCat;
      const matchesQ =
        !query ||
        s.title.toLowerCase().includes(query) ||
        s.slug.toLowerCase().includes(query) ||
        cat.toLowerCase().includes(query);
      return matchesCat && matchesQ;
    });
  }, [q, activeCat]);

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.02 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.35, ease: "easeOut" } },
  };

  return (
    <main className="relative bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 520px at 15% 10%, rgba(70, 130, 180,0.08), transparent 60%), radial-gradient(900px 480px at 85% 20%, rgba(255,255,255,0.03), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              Engineering Services • Integration • Maintenance
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text">
              Services
            </h1>
            <div className="mt-4 h-px w-44 bg-accent/70" />
            <p className="mt-5 text-[15px] leading-7 text-muted">
              Choose a service to view scope, deliverables, and standards. Built for real-world execution —
              documentation discipline, clean handover, inspection-ready.
            </p>
          </div>

          {/* Search */}
          <div className="w-full max-w-xl">
            <div className="rounded-xl border border-border bg-surface px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Filter</p>
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface2 px-3 py-1 text-[12px] text-text">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Verified process
                </span>
              </div>

              <label className="mt-3 block">
                <span className="sr-only">Search services</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search services (HVAC, fire, CCTV...)"
                  className={cx(
                    "mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2",
                    "text-[14px] text-text placeholder:text-muted",
                    "outline-none focus:border-white/20"
                  )}
                />
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {cats.map((c) => {
                  const active = c === activeCat;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCat(c)}
                      className={cx(
                        "rounded-lg border px-3 py-1 text-[12px] transition",
                        active
                          ? "border-accent/60 bg-accent/10 text-text"
                          : "border-border bg-surface2 text-muted hover:border-white/20 hover:text-text"
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          key={`${activeCat}:${q}`}
          variants={wrap}
          initial="hidden"
          animate="show"
          layout
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((s) => {
            const cat = CATEGORY_BY_SLUG[s.slug] ?? "General";
            const Icon = s.Icon;

            return (
              <motion.div key={s.slug} variants={item} layout>
                <Link
                  href={`/en/services/${s.slug}`}
                  className={cx(
                    "group block h-full rounded-xl border border-border bg-surface",
                    "transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20"
                  )}
                >
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cx(
                          "relative flex items-center justify-center",
                          "h-14 w-14 rounded-lg border border-border bg-surface2",
                          "transition-transform duration-200 group-hover:-translate-y-0.5"
                        )}
                      >
                        <Icon
                          aria-hidden="true"
                          focusable="false"
                          className={cx(
                            "h-9 w-9",
                            "text-muted",
                            "transition-transform duration-200 ease-out",
                            "group-hover:-translate-y-0.5 group-hover:scale-[1.04]",
                            "group-hover:text-accent"
                          )}
                        />
                      </div>

                      <span className="rounded-lg border border-border bg-bg px-3 py-1 text-[12px] text-muted">
                        {cat}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-bold text-text leading-6 min-h-12">
                      {s.title}
                    </h3>

                    <div className="mt-4 h-px w-full bg-white/10" />

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-[12px] text-muted">View details</p>

                      <div className="flex items-center gap-2">
                        <span className="h-1 w-8 bg-accent/60 transition-all duration-200 group-hover:w-10" />
                        <span className="text-[12px] text-text">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-xl border border-border bg-surface p-6 text-muted">
            No services found. Try another keyword or category.
          </div>
        )}
      </div>
    </main>
  );
}