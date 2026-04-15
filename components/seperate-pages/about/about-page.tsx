"use client";

import React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { BadgeCheck, LayoutGrid, ShieldCheck, Wrench } from "lucide-react";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";

type Capability = {
  readonly icon: React.ElementType;
  readonly title: string;
  readonly desc: string;
};

type Spec = {
  readonly icon: React.ElementType;
  readonly title: string;
  readonly value: string;
  readonly note: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Card({
  icon: Icon,
  title,
  desc,
  k,
  reduce,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  k: "cap" | "spec";
  reduce: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
      className={cx(
        "relative rounded-xl border border-border bg-surface p-4",
        "shadow-[0_10px_26px_rgba(0,0,0,0.16)]"
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          "absolute left-0 top-0 h-full w-0.75 rounded-l-xl",
          k === "spec" ? "bg-accent/70" : "bg-white/10"
        )}
      />

      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-border bg-surface2 p-2">
          <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-text">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection({ lang = "en" }: { lang?: Lang }) {
  const reduce = !!useReducedMotion();
  const t = copy[lang].about.section;

  const CAPABILITIES: ReadonlyArray<Capability> = [
    { icon: ShieldCheck, title: t.capabilities.safetyTitle, desc: t.capabilities.safetyDesc },
    { icon: LayoutGrid, title: t.capabilities.docsTitle, desc: t.capabilities.docsDesc },
    { icon: Wrench, title: t.capabilities.integrationTitle, desc: t.capabilities.integrationDesc },
    { icon: BadgeCheck, title: t.capabilities.qualifiedTitle, desc: t.capabilities.qualifiedDesc },
  ];

  const SPECS: ReadonlyArray<Spec> = [
    { icon: LayoutGrid, title: t.specs.establishedTitle, value: t.specs.establishedValue, note: t.specs.establishedNote },
    { icon: ShieldCheck, title: t.specs.experienceTitle, value: t.specs.experienceValue, note: t.specs.experienceNote },
    { icon: BadgeCheck, title: t.specs.approachTitle, value: t.specs.approachValue, note: t.specs.approachNote },
  ];

  const wrap: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: "easeOut", staggerChildren: reduce ? 0 : 0.08 },
    },
  };

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-16 sm:py-20">
      {/* background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to_right, var(--color-border) 1px, transparent 1px), linear-gradient(to_bottom, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 12% 12%, rgba(70, 130, 180,0.08), transparent 60%), radial-gradient(900px 520px at 88% 18%, rgba(255,255,255,0.03), transparent 60%)",
          }}
        />
        {!reduce && (
          <motion.div
            className="absolute inset-x-0 top-0 h-0.5 bg-white/10"
            initial={{ y: 0, opacity: 0.18 }}
            animate={{ y: ["0%", "100%"], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 7, ease: "linear", repeat: Infinity }}
          />
        )}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {/* header */}
          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-xs tracking-[0.22em] text-muted">{t.sectionKicker}</span>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="mt-4">
            <h2 id="about-title" className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {t.titlePrefix} <span className="text-accent">{t.titleAccent}</span>
            </h2>

            <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-muted">
              {t.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* layout */}
          <motion.div variants={{ hidden: {}, show: {} }} className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {CAPABILITIES.map((c) => (
                  <Card key={c.title} icon={c.icon} title={c.title} desc={c.desc} k="cap" reduce={reduce} />
                ))}
              </div>
            </div>

            {/* right: spec stack */}
            <div className="lg:col-span-5">
              <div className="grid gap-3">
                {SPECS.map((s) => (
                  <Card
                    key={s.title}
                    icon={s.icon}
                    title={`${s.title} — ${s.value}`}
                    desc={s.note}
                    k="spec"
                    reduce={reduce}
                  />
                ))}
              </div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="mt-5 rounded-xl border border-border bg-surface p-4"
              >
                <p className="text-sm text-muted">
                  {t.footerLinePrefix} <span className="text-text">{t.footerLineStrongA}</span>,{" "}
                  <span className="text-text">{t.footerLineStrongB}</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}