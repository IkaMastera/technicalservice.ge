"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SERVICES } from "@/data/services";
import { ButtonPrimary } from "../ui/button-primary";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function ServicesGridSection() {
  const reduce = useReducedMotion();

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
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.4, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="relative bg-bg border-t border-border">
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
            "radial-gradient(900px 500px at 18% 18%, rgba(255,176,32,0.08), transparent 60%), radial-gradient(800px 420px at 82% 22%, rgba(255,255,255,0.03), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* header */}
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Systems & Integration
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Services
          </h2>
          <div className="mt-4 h-px w-40 bg-accent/70" />
          <p className="mt-5 text-[15px] leading-7 text-muted">
            Engineering-grade installations, integration, and maintenance — delivered
            with documentation discipline and inspection-ready handover.
          </p>
        </div>

        {/* grid */}
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => {
            const Icon = s.Icon;

            return (
              <motion.div key={s.slug} variants={item}>
                <Link
                  href={`/en/services/${s.slug}`}
                  className={cx(
                    "group block h-full rounded-xl border border-border",
                    "bg-surface",
                    "transition-transform duration-200 hover:-translate-y-0.5",
                    "hover:border-white/20"
                  )}
                >
                  <div className="flex h-full flex-col items-center text-center px-5 py-7">
                    {/* icon panel */}
                    <div
                      className={cx(
                        "relative flex items-center justify-center",
                        "h-16 w-16 rounded-lg border border-border",
                        "bg-surface2",
                        "transition-transform duration-200 group-hover:-translate-y-0.5"
                      )}
                    >
                      <Icon
                        className="
                          h-10 w-10
                          text-muted
                          transition-colors duration-200
                          group-hover:text-[color:var(--color-accent)]
                        "
                        aria-hidden
                      />
                    </div>

                    {/* title */}
                    <p className="mt-4 text-[13px] font-bold uppercase tracking-wide text-text leading-5 min-h-10">
                      {s.title}
                    </p>

                    {/* divider tick */}
                    <div className="mt-4 h-7 w-px bg-accent2/35 group-hover:bg-accent/70 transition-colors duration-200" />

                    {/* micro hint */}
                    <p className="mt-3 text-[12px] leading-5 text-muted opacity-90">
                      View details
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        <ButtonPrimary
                className="mt-8"
                onClick={() => (window.location.href = "/en/about")}
                >
                View All
        </ButtonPrimary>
      </div>
    </section>
  );
}