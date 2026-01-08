// components/sections/AboutSection.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { BadgeCheck, LayoutGrid, ShieldCheck, Wrench } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SpecCard({
  icon: Icon,
  title,
  value,
  note,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div
      className="
        rounded-xl border border-border
        bg-surface
        p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            rounded-lg border border-border
            bg-surface2
            p-2
          "
          aria-hidden="true"
        >
          <Icon className="h-5 w-5 text-accent" />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-muted">{title}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-text">
            {value}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden py-16 sm:py-20"
    >
      {/* LayoutGrid grid texture (subtle, variable-only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute inset-0
            opacity-[0.28]
            bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
          "
        />
        {/* soft vignette */}
        <div
          className="
            absolute inset-0
            [background:radial-gradient(70%_60%_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.55)_100%)]
          "
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <motion.div variants={item} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Title + Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                <span
                  className="h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                About us
              </div>

              <h2
                id="about-title"
                className="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl"
              >
                Nothing is impossible.{" "}
                <span className="text-accent">Everything is permitted.</span>
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                <span className="text-text">TSC — Technical Service Company</span>{" "}
                delivers innovative engineering services to create better living spaces since{" "}
                <span className="text-text">2020</span>.
              </p>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                We are a multifunctional outsourcing company with qualified and authorized services,
                integrating sustainable engineering solutions into residential and commercial environments.
              </p>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                Our strategic approach is to build safe, future-oriented systems — backed by{" "}
                <span className="text-text">17 years of experience</span> and an
                inspection-ready delivery mindset.
              </p>

              {/* Capability bullets */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Safety-first engineering",
                    desc: "Decisions built to pass inspection, not just look good.",
                  },
                  {
                    icon: LayoutGrid,
                    title: "Documented delivery",
                    desc: "Clear scope, drawings, checklists, and handover.",
                  },
                  {
                    icon: Wrench,
                    title: "Integration & service",
                    desc: "Systems that work together — maintained long-term.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Qualified execution",
                    desc: "Authorized services with disciplined standards.",
                  },
                ].map((b) => (
                  <div
                    key={b.title}
                    className="
                      rounded-xl border border-border
                      bg-surface
                      p-4
                    "
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="
                          rounded-lg border border-border
                          bg-surface2
                          p-2
                        "
                        aria-hidden="true"
                      >
                        <b.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-text">{b.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Spec cards */}
            <motion.div variants={item} className="lg:col-span-5">
              <div className="grid gap-4">
                <SpecCard
                  icon={LayoutGrid}
                  title="Established"
                  value="Since 2020"
                  note="Focused on engineering-grade systems and reliable delivery."
                />
                <SpecCard
                  icon={ShieldCheck}
                  title="Experience"
                  value="17+ years"
                  note="Applied field experience across real projects and constraints."
                />
                <SpecCard
                  icon={BadgeCheck}
                  title="Approach"
                  value="Inspection-ready"
                  note="Scope clarity, documentation discipline, and clean handover."
                />
              </div>

              {/* Divider bar */}
              <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                <p className="text-sm text-muted">
                  Minimalism isn’t “less effort.” It’s{" "}
                  <span className="text-text">fewer claims</span>,{" "}
                  <span className="text-text">more proof</span>.
                </p>
                <div className="mt-3 h-0.5 w-full bg-border" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}