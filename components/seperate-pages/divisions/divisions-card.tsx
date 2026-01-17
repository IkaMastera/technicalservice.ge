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
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide",
        live ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-white/12 bg-white/5 text-muted"
      )}
    >
      <span className={cx("h-2 w-2 rounded-full", live ? "bg-emerald-300" : "bg-accent/80")} aria-hidden="true" />
      {live ? liveLabel : underLabel}
    </span>
  );
}

export default function DivisionCard({
  icon,
  eyebrow,
  title,
  status,
  liveLabel,
  underLabel,
  tags,
  description,
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
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-accent/80" />

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
            "opacity-[0.88] grayscale",
            "transition duration-500 ease-out",
            "group-hover:opacity-100 group-hover:grayscale-0"
          )}
        />
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

      <div className="relative grid min-h-[460px] grid-rows-[auto_auto_1fr_auto] p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-black/35">
              {icon}
            </div>

            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text">{title}</h2>
            </div>
          </div>

          <StatusPill status={status} liveLabel={liveLabel} underLabel={underLabel} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[12px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="min-h-0" />

        <div className="pt-6">
          <p
            className={cx(
              "max-w-[52ch] text-sm leading-relaxed text-text/90",
              "transition duration-300 ease-out",
              reduce ? "" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            )}
          >
            {description}
          </p>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="text-[12px] text-muted">
              {ownershipLabel} <span className="text-text">{ownershipValue}</span>
            </div>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold",
                "transition active:scale-[0.98]",
                status === "LIVE"
                  ? "bg-accent text-black hover:translate-y-[-1px] hover:shadow-[0_10px_26px_rgba(0,0,0,0.26)]"
                  : "border border-white/15 bg-white/5 text-text hover:bg-white/8"
              )}
            >
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
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