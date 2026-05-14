"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  portfolioItems,
  SCOPE_CATEGORIES,
  getItemCategories,
  type Lang,
  type ScopeCategory,
} from "@/data/portfolio";
import { PortfolioCard } from "@/components/seperate-pages/portfolio/portfolio-card";
import { PortfolioBackground } from "./portfolio-background";

type Props = { lang?: Lang };

/* ─────────────────────────────────────────────────────────
   UI strings — local. Move to copy.ts later if you want.
   ───────────────────────────────────────────────────────── */
const UI = {
  en: {
    kicker:        "PORTFOLIO",
    title:         "Engineering projects.",
    desc:          "Curated building dossiers — scope, systems, deliverables. Filter by the work delivered.",
    filterAll:     "All",
    showingPrefix: "Showing",
    showingSuffix: "projects",
    clearAll:      "Clear filters",
    emptyTitle:    "No matches.",
    emptyDesc:     "No projects match the selected filters. Try removing one.",
  },
  ka: {
    kicker:        "პორტფოლიო",
    title:         "საინჟინრო პროექტები.",
    desc:          "შენობების კურირებული დოსიეები — სამუშაოს მოცულობა, სისტემები, ჩაბარება. გაფილტრეთ შესრულებული სამუშაოს მიხედვით.",
    filterAll:     "ყველა",
    showingPrefix: "ნაჩვენებია",
    showingSuffix: "პროექტი",
    clearAll:      "ფილტრების გასუფთავება",
    emptyTitle:    "შესაბამისობა ვერ მოიძებნა.",
    emptyDesc:     "შერჩეული ფილტრებით პროექტი ვერ მოიძებნა. სცადეთ ერთის მოშორება.",
  },
};

export default function PortfolioGrid({ lang = "en" }: Props) {
  /* ─────────────────────────────────────────────────────
     Filter state — Set of active scope categories.
     Empty set = "All" (show everything).
     ───────────────────────────────────────────────────── */
  const [activeFilters, setActiveFilters] = useState<Set<ScopeCategory>>(
    new Set()
  );
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const ui = UI[lang];

  /* OR-mode filtering: project matches if ANY of its categories is selected.
     If no filters active, show all. */
  const filtered = useMemo(() => {
    if (activeFilters.size === 0) return portfolioItems;
    return portfolioItems.filter((p) => {
      const projectCats = getItemCategories(p);
      return projectCats.some((c) => activeFilters.has(c));
    });
  }, [activeFilters]);

  /* Active filters as array (for passing into card highlighting) */
  const activeFiltersArr = useMemo(
    () => Array.from(activeFilters),
    [activeFilters]
  );

  /* ─────────────────────────────────────────────────────
     Filter handlers
     ───────────────────────────────────────────────────── */
  const toggleFilter = useCallback((cat: ScopeCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
    // Collapse any open card when filters change — it might filter out
    setExpandedSlug(null);
  }, []);

  const clearAll = useCallback(() => {
    setActiveFilters(new Set());
    setExpandedSlug(null);
  }, []);

  /* ─────────────────────────────────────────────────────
     Card expand handlers
     ───────────────────────────────────────────────────── */
  const toggleExpand = useCallback((slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }, []);

  /* Escape closes any expanded card */
  useEffect(() => {
    if (!expandedSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedSlug]);

  /* ─────────────────────────────────────────────────────
     Layout decision
     - "All" view & no expand: featured asymmetry (1 big + 3 stacked)
     - Filtered OR something expanded: uniform grid for predictable reflow
     ───────────────────────────────────────────────────── */
  const useAsymmetricFeatured =
    activeFilters.size === 0 && expandedSlug === null;

  const featured = useMemo(
    () => filtered.filter((x) => x.featured).slice(0, 4),
    [filtered]
  );
  const rest = useMemo(() => filtered.filter((x) => !x.featured), [filtered]);

  return (
    <section className="relative py-10 sm:py-12">
      <PortfolioBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════
            HEADER
            ════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-muted">{ui.kicker}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              {ui.title}
            </h1>
            <p className="max-w-2xl text-base text-muted">{ui.desc}</p>
          </div>

          {/* ════════════════════════════════════════════════
              STICKY FILTER BAR
              ════════════════════════════════════════════════ */}
          <div className="sticky top-3 z-30">
            <div className="rounded-2xl border border-border bg-surface/80 p-3 backdrop-blur-[12px] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-3">

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2">
                  {/* "All" — clears all filters */}
                  <FilterChip
                    label={ui.filterAll}
                    isActive={activeFilters.size === 0}
                    onClick={clearAll}
                  />

                  {SCOPE_CATEGORIES.map((c) => {
                    const isActive = activeFilters.has(c.key);
                    return (
                      <FilterChip
                        key={c.key}
                        label={c.label[lang]}
                        isActive={isActive}
                        onClick={() => toggleFilter(c.key)}
                      />
                    );
                  })}
                </div>

                {/* Status row — count + clear */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <span className="h-2 w-2 rounded-full bg-accent/80" />
                    <span>
                      {ui.showingPrefix}{" "}
                      <span className="text-text font-medium">
                        {filtered.length}
                      </span>{" "}
                      {ui.showingSuffix}
                    </span>
                  </div>

                  {activeFilters.size > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-accent hover:underline"
                    >
                      {ui.clearAll}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            CONTENT
            ════════════════════════════════════════════════ */}
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 rounded-2xl border border-border bg-surface/60 p-10 text-center"
              >
                <h3 className="text-lg font-semibold text-text">
                  {ui.emptyTitle}
                </h3>
                <p className="mt-2 text-sm text-muted">{ui.emptyDesc}</p>
                <button
                  onClick={clearAll}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/[0.08] px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/[0.14]"
                >
                  {ui.clearAll}
                </button>
              </motion.div>
            ) : useAsymmetricFeatured ? (
              /* ── ASYMMETRIC FEATURED LAYOUT ── */
              <motion.div
                key="featured-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {featured.length > 0 && (
                  <div className="mt-6 grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <PortfolioCard
                        item={featured[0]}
                        lang={lang}
                        isExpanded={expandedSlug === featured[0].slug}
                        onToggle={() => toggleExpand(featured[0].slug)}
                        activeCategories={activeFiltersArr}
                      />
                    </div>
                    <div className="grid gap-6 lg:col-span-5">
                      {featured.slice(1, 4).map((f) => (
                        <PortfolioCard
                          key={f.slug}
                          item={f}
                          lang={lang}
                          isExpanded={expandedSlug === f.slug}
                          onToggle={() => toggleExpand(f.slug)}
                          activeCategories={activeFiltersArr}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {rest.length > 0 && (
                  <div className="mt-8 grid grid-cols-12 gap-6">
                    {rest.map((p) => (
                      <div key={p.slug} className="col-span-12 md:col-span-6 lg:col-span-4">
                        <PortfolioCard
                          item={p}
                          lang={lang}
                          isExpanded={expandedSlug === p.slug}
                          onToggle={() => toggleExpand(p.slug)}
                          activeCategories={activeFiltersArr}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              /* ── UNIFORM GRID — used when filtering OR expanding ── */
              <motion.div
                key="uniform-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 grid grid-cols-12 gap-6"
              >
                {filtered.map((p) => {
                  const isExp = expandedSlug === p.slug;
                  return (
                    <motion.div
                      key={p.slug}
                      layout
                      transition={{
                        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      }}
                      className={
                        isExp
                          ? "col-span-12"
                          : "col-span-12 md:col-span-6 lg:col-span-4"
                      }
                    >
                      <PortfolioCard
                        item={p}
                        lang={lang}
                        isExpanded={isExp}
                        onToggle={() => toggleExpand(p.slug)}
                        activeCategories={activeFiltersArr}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FilterChip — small reusable button
   ───────────────────────────────────────────────────────── */
function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        "rounded-xl border px-3 py-2 text-sm transition-all",
        isActive
          ? "border-accent/50 bg-accent/[0.12] text-accent shadow-[0_2px_10px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]"
          : "border-border bg-surface2/40 text-muted hover:bg-surface2 hover:text-text",
      ].join(" ")}
    >
      {label}
    </button>
  );
}