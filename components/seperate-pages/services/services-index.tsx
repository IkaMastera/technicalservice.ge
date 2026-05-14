"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SERVICES } from "@/data/services";

type Lang = "en" | "ka";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────
   UI strings — local. Move to copy.ts later if you want.
   ───────────────────────────────────────────────────────── */
const UI = {
  en: {
    kicker:        "Engineering Services · Integration · Maintenance",
    title:         "Services",
    desc:          "Choose a service to view scope.",
    filterLabel:   "Filter",
    verifiedTag:   "Verified process",
    searchPh:      "Search services (HVAC, fire, CCTV...)",
    catAll:        "All",
    viewDetails:   "View details",
    empty:         "No services found. Try another keyword or category.",
  },
  ka: {
    kicker:        "საინჟინრო სერვისები · ინტეგრაცია · მომსახურება",
    title:         "სერვისები",
    desc:          "აირჩიეთ სერვისი მისი მოცულობის სანახავად.",
    filterLabel:   "ფილტრი",
    verifiedTag:   "დადასტურებული პროცესი",
    searchPh:      "სერვისის ძიება (HVAC, სახანძრო, CCTV...)",
    catAll:        "ყველა",
    viewDetails:   "დეტალების ნახვა",
    empty:         "სერვისი ვერ მოიძებნა. სცადეთ სხვა საკვანძო სიტყვა ან კატეგორია.",
  },
};

type Props = { lang?: Lang };

/** Special sentinel for the "All" filter — stored as a stable string,
 *  translated at render time. Using this instead of the localized
 *  string means switching language doesn't strand the state. */
const ALL_KEY = "__ALL__";

export default function ServicesIndex({ lang = "en" }: Props) {
  const reduce = useReducedMotion();
  const ui = UI[lang];

  const [q, setQ] = useState("");
  /** activeCat stores the ENGLISH category name (or ALL_KEY for "all").
   *  This is language-agnostic so it survives lang switches. */
  const [activeCat, setActiveCat] = useState<string>(ALL_KEY);

  /* ── Build category list — pairs English key (stable) with localized
        label (display only). ── */
  const cats = useMemo(() => {
    const seen = new Set<string>();
    const list: { key: string; label: string }[] = [
      { key: ALL_KEY, label: ui.catAll },
    ];
    SERVICES.forEach((s) => {
      const enKey = s.category.en;
      if (seen.has(enKey)) return;
      seen.add(enKey);
      list.push({ key: enKey, label: s.category[lang] });
    });
    // Sort everything after "All" by localized label
    const all = list[0];
    const rest = list.slice(1).sort((a, b) => a.label.localeCompare(b.label));
    return [all, ...rest];
  }, [lang, ui.catAll]);

  /* ── Filter logic ──
     - Category match: ALL_KEY or English-key match
     - Query match: title (both langs) + slug + category (both langs) + description */
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const matchesCat = activeCat === ALL_KEY || s.category.en === activeCat;

      if (!matchesCat) return false;
      if (!query) return true;

      const haystack = [
        s.title[lang],
        s.title.en,
        s.slug,
        s.category[lang],
        s.category.en,
        s.description[lang],
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [q, activeCat, lang]);

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.02,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.35, ease: "easeOut" },
    },
  };

  return (
    <main className="relative bg-bg">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 520px at 15% 10%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 60%), radial-gradient(900px 480px at 85% 20%, rgba(255,255,255,0.03), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">

        {/* ════════════════════════════════════════════════
            HEADER
            ════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {ui.kicker}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text">
              {ui.title}
            </h1>
            <div className="mt-4 h-px w-44 bg-accent/70" />
            <p className="mt-5 text-[15px] leading-7 text-muted">{ui.desc}</p>
          </div>

          {/* Search + filter card */}
          <div className="w-full max-w-xl">
            <div className="rounded-xl border border-border bg-surface px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">
                  {ui.filterLabel}
                </p>
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface2 px-3 py-1 text-[12px] text-text">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {ui.verifiedTag}
                </span>
              </div>

              <label className="mt-3 block">
                <span className="sr-only">{ui.searchPh}</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={ui.searchPh}
                  className={cx(
                    "mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2",
                    "text-[14px] text-text placeholder:text-muted",
                    "outline-none focus:border-white/20"
                  )}
                />
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {cats.map((c) => {
                  const active = c.key === activeCat;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setActiveCat(c.key)}
                      className={cx(
                        "rounded-lg border px-3 py-1 text-[12px] transition",
                        active
                          ? "border-accent/60 bg-accent/10 text-text"
                          : "border-border bg-surface2 text-muted hover:border-white/20 hover:text-text"
                      )}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            GRID
            ════════════════════════════════════════════════ */}
        <motion.div
          key={`${activeCat}:${q}:${lang}`}
          variants={wrap}
          initial="hidden"
          animate="show"
          layout
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((s) => {
            const cat = s.category[lang];
            const Icon = s.Icon;

            return (
              <motion.div key={s.slug} variants={item} layout>
                <Link
                  href={`/${lang}/services/${s.slug}`}
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
                      {s.title[lang]}
                    </h3>

                    <div className="mt-4 h-px w-full bg-white/10" />

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-[12px] text-muted">{ui.viewDetails}</p>

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
            {ui.empty}
          </div>
        )}
      </div>
    </main>
  );
}