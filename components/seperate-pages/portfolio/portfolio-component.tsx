"use client";

import { useMemo, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { portfolioItems, type PortfolioCategory } from "@/data/portfolio";
import { PortfolioCard } from "@/components/main-page-sections/portfolio-card";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const categories: (PortfolioCategory | "All")[] = [
  "All",
  "Hotels",
  "Airports",
  "Commercial Spaces",
  "Apartments",
  "Spas",
  "Offices",
];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return portfolioItems;
    return portfolioItems.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-muted">Portfolio</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-text">
              Engineering projects.
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted">
              Filter by building type. Each project has a dedicated dossier page with full scope and deliverables.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`
                    rounded-xl border px-3 py-2 text-sm transition
                    ${
                      isActive
                        ? "border-border bg-surface text-text"
                        : "border-border bg-surface2 text-muted hover:bg-surface"
                    }
                  `}
                  aria-pressed={isActive}
                >
                  <span className={isActive ? "text-accent" : ""}>{c}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            layout
          >
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                variants={itemV}
                layout
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              >
                <PortfolioCard item={p} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}