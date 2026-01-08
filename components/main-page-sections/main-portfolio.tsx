"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";
import { PortfolioCard } from "./portfolio-card";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08 } },
};

export default function PortfolioPreview() {
  const featured = portfolioItems.filter((x) => x.featured).slice(0, 4);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-muted">Portfolio</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Selected projects, delivered{" "}
                <span className="text-accent">inspection-ready</span>.
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted">
                Real buildings. Real systems. Clear scope, testing, and handover — executed with engineering discipline.
              </p>
            </div>

            <Link
              href="/en/portfolio"
              className="
                hidden sm:inline-flex items-center justify-center rounded-xl border border-border bg-surface2
                px-4 py-2 text-sm text-text
                hover:bg-surface transition
              "
            >
              View all
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((item) => (
              <PortfolioCard key={item.slug} item={item} />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/en/portfolio"
              className="
                inline-flex w-full items-center justify-center rounded-xl border border-border bg-surface2
                px-4 py-2 text-sm text-text
                hover:bg-surface transition
              "
            >
              View all projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}