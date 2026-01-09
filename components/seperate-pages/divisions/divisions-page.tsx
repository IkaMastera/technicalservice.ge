"use client";

import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Building2, Cpu, Wrench } from "lucide-react";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";
type DivisionStatus = "LIVE" | "UNDER_CONSTRUCTION";

type DivisionUI = {
  name: string;
  subtitle: string;
  description: string;
  status: DivisionStatus;
  externalUrl?: string;
  tags: string[];
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function StatusBadge({
  status,
  liveLabel,
  underLabel,
}: {
  status: DivisionStatus;
  liveLabel: string;
  underLabel: string;
}) {
  const isLive = status === "LIVE";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide",
        isLive
          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
          : "border-white/12 bg-white/5 text-muted"
      )}
    >
      <span
        className={cx(
          "h-2 w-2 rounded-full",
          isLive ? "bg-emerald-300" : "bg-accent/80"
        )}
        aria-hidden="true"
      />
      {isLive ? liveLabel : underLabel}
    </span>
  );
}

function pickIcon(name: string) {
  // simple deterministic mapping (no icon stored in copy)
  if (name.toLowerCase().includes("control4")) return Cpu;
  if (name.toLowerCase().includes("fiix")) return Wrench;
  return Building2;
}

export default function DivisionsPage({ lang = "en" }: { lang?: Lang }) {
  const reduce = useReducedMotion();
  const t = copy[lang].divisions.page;

  const wrap: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.5,
        ease: "easeOut",
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" },
    },
  };

  const divisions = t.items as unknown as DivisionUI[];

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
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{t.desc}</p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {divisions.map((d) => {
            const Icon = pickIcon(d.name);
            const isLive = d.status === "LIVE";
            const actionLabel = isLive ? t.actions.visit : t.actions.viewStatus;

            return (
              <motion.article
                key={d.name}
                variants={item}
                whileHover={reduce ? undefined : { y: -2 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6"
              >
                <div aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-accent/70" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-bg">
                      <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
                        {d.subtitle}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold text-text">{d.name}</h2>
                    </div>
                  </div>

                  <StatusBadge
                    status={d.status}
                    liveLabel={t.status.live}
                    underLabel={t.status.under}
                  />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{d.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-bg px-3 py-1 text-[12px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="text-[12px] text-muted">
                    {t.meta.ownershipLabel}{" "}
                    <span className="text-text">{t.meta.ownershipValue}</span>
                  </div>

                  {d.externalUrl ? (
                    <a
                      href={d.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition active:scale-[0.98]",
                        isLive
                          ? "bg-accent text-black hover:translate-y-[-2px] hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)]"
                          : "border border-white/15 bg-white/5 text-text hover:bg-white/8"
                      )}
                    >
                      {actionLabel}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}