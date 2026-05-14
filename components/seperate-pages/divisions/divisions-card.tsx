"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type DivisionStatus = "LIVE" | "UNDER_CONSTRUCTION";

type Props = {
  icon: React.ReactNode;

  eyebrow: string;
  title: string;

  status: DivisionStatus;
  liveLabel: string;
  underLabel: string;

  tags: string[];
  description: string;

  ownershipLabel: string;
  ownershipValue: string;

  ctaLabel: string;
  href: string;

  imageSrc: string;
  imageAlt?: string;

  className?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function StatusPill({
  status,
  liveLabel,
  underLabel,
}: {
  status: DivisionStatus;
  liveLabel: string;
  underLabel: string;
}) {
  const live = status === "LIVE";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide flex-shrink-0",
        live
          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
          : "border-white/12 bg-white/5 text-muted"
      )}
    >
      <span
        className={cx(
          "h-2 w-2 rounded-full",
          live ? "bg-emerald-300" : "bg-accent/80"
        )}
        aria-hidden="true"
      />
      {live ? liveLabel : underLabel}
    </span>
  );
}

export default function DivisionCard({
  icon,
  eyebrow,
  title,
  status,
  // tags is accepted but not displayed in this layout — kept for API parity
  tags: _tags,
  description,
  liveLabel,
  underLabel,
  ownershipLabel,
  ownershipValue,
  ctaLabel,
  href,
  imageSrc,
  imageAlt,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const hoverMotion: TargetAndTransition | undefined = reduce ? undefined : { y: -3 };

  return (
    <motion.article
      whileHover={hoverMotion}
      transition={reduce ? undefined : { duration: 0.25, ease: "easeOut" }}
      className={cx(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface",
        "shadow-[0_10px_30px_rgba(0,0,0,0.22)]",
        className
      )}
    >
      {/* Accent rail */}
      <div aria-hidden="true" className="absolute left-0 top-0 z-10 h-full w-[3px] bg-accent/80" />

      {/* Image layer */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          priority={false}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cx(
            "object-cover",
            "opacity-[0.55] grayscale",
            "transition duration-500 ease-out",
            "group-hover:opacity-[0.75] group-hover:grayscale-0"
          )}
        />

        {/* Bottom-to-top dark gradient — guarantees text legibility on every image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55"
        />

        {/* Radar pulse on hover */}
        <div
          aria-hidden="true"
          className={cx(
            "absolute left-1/2 top-1/2 h-[72rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full",
            "border border-accent/18 opacity-0",
            "group-hover:opacity-100",
            "motion-reduce:animate-none",
            "group-hover:animate-[tsc-radar_1100ms_ease-out_forwards]"
          )}
        />
        <div
          aria-hidden="true"
          className={cx(
            "absolute left-1/2 top-1/2 h-[72rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full",
            "border border-accent/10 opacity-0",
            "group-hover:opacity-100",
            "motion-reduce:animate-none",
            "group-hover:animate-[tsc-radar_1100ms_ease-out_forwards]"
          )}
          style={{ animationDelay: "160ms" }}
        />
      </div>

      {/* ─────────────────────────────────────────────────
          CONTENT — flex column. Top block at top, bottom
          block pinned to bottom via mt-auto on the bottom
          block. Description sits in between, taking
          flex-1 so the dead zone disappears.
          ───────────────────────────────────────────────── */}
      <div className="relative flex min-h-[460px] flex-col p-7">

        {/* ── TOP: icon + title + status pill ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm">
              {icon}
            </div>

            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.22em] text-muted">
                {eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text">
                {title}
              </h2>
            </div>
          </div>

          <StatusPill status={status} liveLabel={liveLabel} underLabel={underLabel} />
        </div>

        {/* ── MIDDLE: description, takes available space ── */}
        <div className="mt-6 flex-1">
          <p
            className={cx(
              "max-w-[52ch] text-sm leading-relaxed",
              // Always visible, brightens on hover
              reduce
                ? "text-text/85"
                : "text-text/70 transition-colors duration-300 group-hover:text-text/95"
            )}
          >
            {description}
          </p>
        </div>

        {/* ── BOTTOM: ownership + CTA, baseline-aligned ──
            mt-auto pushes this to the card's bottom edge.
            border-t separates it visually from the description
            and gives the same horizontal line on every card. */}
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          {/* Ownership */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70 flex-shrink-0">
              {ownershipLabel}
            </span>
            <span className="text-sm font-semibold text-text">
              {ownershipValue}
            </span>
          </div>

          {/* CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold",
              "transition-all duration-200 active:scale-[0.98] flex-shrink-0",
              status === "LIVE"
                ? "bg-accent text-black hover:bg-accent2 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--color-accent)_35%,transparent)]"
                : "border border-white/15 bg-white/5 text-text hover:border-white/30 hover:bg-white/10"
            )}
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes tsc-radar {
          0% {
            transform: translate(-50%, -50%) scale(0.15);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </motion.article>
  );
}