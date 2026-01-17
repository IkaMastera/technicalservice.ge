"use client";

import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Building2, Cpu, Wrench } from "lucide-react";
import DivisionCard from "./divisions-card";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";
type DivisionStatus = "LIVE" | "UNDER_CONSTRUCTION";

type DivisionItem = {
  name: string;
  subtitle: string;
  description: string;
  status: DivisionStatus;
  externalUrl?: string;
  tags: string[];
};

function pickIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("control4")) return Cpu;
  if (n.includes("fiix")) return Wrench;
  return Building2;
}

const IMAGE_BY_NAME: Record<string, string> = {
  "Control4 Smart Systems": "/media/images/hero.jpg",
  "Fiix.ge": "/media/images/fiix.webp",
};

export default function DivisionsPage({ lang = "en" }: { lang?: Lang }) {
  const reduce = useReducedMotion();
  const t = copy[lang].divisions.page;

  const wrap: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: "easeOut", staggerChildren: reduce ? 0 : 0.08 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" } },
  };

  const divisions = t.items as unknown as DivisionItem[];

  return (
    <main className="relative bg-bg">
      {/* background */}
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
            "radial-gradient(900px 520px at 12% 10%, rgba(255,176,32,0.10), transparent 60%), radial-gradient(900px 520px at 88% 18%, rgba(255,255,255,0.03), transparent 60%)",
        }}
      />

      <motion.div
        variants={wrap}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20"
      >
        <motion.div variants={item} className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface px-3 py-2 text-[11px] tracking-wide text-muted">
            <Building2 className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-text">{t.sectionPillLeft}</span>
            <span className="opacity-40">•</span>
            <span>{t.sectionPillRight}</span>
          </div>

          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold text-text transition hover:bg-white/8 active:scale-[0.98]"
          >
            {t.contactCta}
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-8 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">{t.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{t.desc}</p>
        </motion.div>

        <motion.div variants={item} className="mt-10 grid gap-6 lg:grid-cols-2">
          {divisions.map((d) => {
            const Icon = pickIcon(d.name);
            const imageSrc = IMAGE_BY_NAME[d.name] ?? "/media/images/divisions/placeholder.webp";
            const ctaLabel = d.status === "LIVE" ? t.actions.visit : t.actions.viewStatus;

            return (
              <DivisionCard
                key={d.name}
                icon={<Icon className="h-5 w-5 text-accent" aria-hidden="true" />}
                eyebrow={d.subtitle}
                title={d.name}
                status={d.status}
                liveLabel={t.status.live}
                underLabel={t.status.under}
                tags={d.tags}
                description={d.description}
                ownershipLabel={t.meta.ownershipLabel}
                ownershipValue={t.meta.ownershipValue}
                ctaLabel={ctaLabel}
                href={d.externalUrl ?? "#"}
                imageSrc={imageSrc}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </main>
  );
}