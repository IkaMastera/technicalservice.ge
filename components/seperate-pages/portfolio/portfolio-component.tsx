"use client";

import { useMemo, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { portfolioItems, type PortfolioCategory } from "@/data/portfolio";
import { PortfolioCard } from "@/components/main-page-sections/portfolio-card";
import { PortfolioBackground } from "./portfolio-background";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.06 },
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

  const forceShowcase4 = filtered.length <= 4;

  const featured = useMemo(() => filtered.filter((x) => x.featured).slice(0, 4), [filtered]);
  const rest = useMemo(() => filtered.filter((x) => !x.featured), [filtered]);

  return (
    <section className="relative py-10 sm:py-12">
      <PortfolioBackground />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-muted">PORTFOLIO</p>
            <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Engineering projects.
            </h1>
            <p className="max-w-2xl text-base text-muted">
              Curated building dossiers — scope, systems, deliverables. Filter by building type.
            </p>
          </div>

          {/* Sticky filters */}
          <div className="sticky top-3 z-20">
            <div className="rounded-2xl border border-border bg-surface/70 p-3 backdrop-blur-[10px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const isActive = c === active;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setActive(c)}
                        className={[
                          "rounded-xl border px-3 py-2 text-sm transition",
                          isActive
                            ? "border-border bg-surface2 text-text"
                            : "border-border bg-surface2/40 text-muted hover:bg-surface2",
                        ].join(" ")}
                        aria-pressed={isActive}
                      >
                        <span className={isActive ? "text-accent" : ""}>{c}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-2 w-2 rounded-full bg-accent/80" />
                  <span>
                    Showing <span className="text-text">{filtered.length}</span> projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {forceShowcase4 ? (
          <div className="mt-6 grid grid-cols-12 gap-6">
            {filtered[0] ? (
              <div className="col-span-12 lg:col-span-6">
                <PortfolioCard item={filtered[0]} />
              </div>
            ) : null}

            {filtered[1] ? (
              <div className="col-span-12 lg:col-span-6">
                <PortfolioCard item={filtered[1]} />
              </div>
            ) : null}

            {filtered[2] ? (
              <div className="col-span-12 lg:col-span-6">
                <PortfolioCard item={filtered[2]} />
              </div>
            ) : null}

            {filtered[3] ? (
              <div className="col-span-12 lg:col-span-6">
                <PortfolioCard item={filtered[3]} />
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {featured.length ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <PortfolioCard item={featured[0]} />
                </div>
                <div className="grid gap-6 lg:col-span-5">
                  {featured[1] ? <PortfolioCard item={featured[1]} /> : null}
                  {featured[2] ? <PortfolioCard item={featured[2]} /> : null}
                  {featured[3] ? <PortfolioCard item={featured[3]} /> : null}
                </div>
              </div>
            ) : null}

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="mt-8 grid grid-cols-12 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
                exit="hidden"
                layout
              >
                {rest.map((p, idx) => {
                  const pattern =
                    idx % 10 === 0
                      ? "col-span-12 md:col-span-8"
                      : idx % 10 === 1
                      ? "col-span-12 md:col-span-4"
                      : idx % 10 === 2
                      ? "col-span-12 md:col-span-6"
                      : idx % 10 === 3
                      ? "col-span-12 md:col-span-6"
                      : "col-span-12 md:col-span-4";

                  return (
                    <motion.div
                      key={p.slug}
                      className={pattern}
                      variants={itemV}
                      layout
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                    >
                      <PortfolioCard item={p} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}