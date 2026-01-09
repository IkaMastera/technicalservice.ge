"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";

export function PortfolioCard({ item, lang = "en" }: { item: PortfolioItem; lang?: Lang }) {
  const reduce = useReducedMotion();
  const t = copy[lang].home.portfolio.card;

  return (
    <motion.article
      className={[
        "group relative overflow-hidden rounded-2xl",
        "border border-border bg-surface",
        "shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
      ].join(" ")}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link
        href={`/${lang}/portfolio/${item.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      >
        {/* Media */}
        <div className="relative aspect-[16/10] bg-surface2">
          <Image
            src={item.cover.src}
            alt={item.cover.alt}
            fill
            priority={!!item.featured}
            className={[
              "object-cover",
              "grayscale contrast-[1.06] brightness-[0.82] saturate-[0.85]",
              reduce
                ? ""
                : "transition-[filter,transform] duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-[1.02] group-hover:saturate-[1.08] group-hover:scale-[1.015]",
            ].join(" ")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Blueprint overlay (only on hover) */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0",
              "opacity-0",
              reduce ? "" : "group-hover:opacity-[0.18] transition-opacity duration-300",
              "[background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
              "[background-size:28px_28px]",
            ].join(" ")}
          />

          {/* Top-right stamp */}
          <div
            className={[
              "absolute right-3 top-3",
              "opacity-0 translate-y-[-6px]",
              reduce ? "opacity-100 translate-y-0" : "group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250",
            ].join(" ")}
          >
            <div className="rounded-lg border border-border bg-surface/70 px-2 py-1 backdrop-blur-[6px]">
              <span className="text-[11px] tracking-[0.22em] text-muted">{t.stamp}</span>
            </div>
          </div>

          {/* Inspection corners */}
          <div aria-hidden="true" className="absolute inset-0">
            <CornerMarks />
          </div>

          {/* Bottom tag (always visible) */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-border bg-surface/75 px-3 py-2 backdrop-blur-[8px]">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <p className="truncate text-sm font-semibold text-text">{item.title}</p>
            </div>
          </div>

          {/* Spec plate (slides up) */}
          <div
            className={[
              "absolute inset-x-0 bottom-0",
              "translate-y-[38%] opacity-0",
              reduce ? "translate-y-0 opacity-100" : "group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out",
            ].join(" ")}
          >
            <div className="bg-gradient-to-t from-black/70 via-black/35 to-transparent p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{item.category}</Pill>
                {item.year ? <Pill>{String(item.year)}</Pill> : null}
              </div>

              <div className="mt-2 grid gap-1">
                <p className="text-sm text-text/95">
                  <span className="text-muted">{t.location}</span> {item.location}
                </p>
                <p className="text-sm text-muted">
                  <span className="text-text/90">{t.systems}</span>{" "}
                  {item.systems.slice(0, 3).join(" • ")}
                  {item.systems.length > 3 ? " • …" : ""}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-[11px] text-muted">{t.openFile}</span>
              </div>
            </div>
          </div>

          {/* One-pass scanline on hover */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0 opacity-0",
              reduce ? "opacity-0" : "group-hover:opacity-100",
            ].join(" ")}
          >
            <div className="absolute -top-10 left-0 h-10 w-full bg-[linear-gradient(to_bottom,transparent,rgba(255,176,32,0.16),transparent)] animate-[cardScan_0.9s_ease-out_1]" />
          </div>

          <style jsx global>{`
            @keyframes cardScan {
              0% { transform: translateY(0); opacity: 0; }
              12% { opacity: 1; }
              100% { transform: translateY(260px); opacity: 0; }
            }
          `}</style>
        </div>
      </Link>
    </motion.article>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-border bg-surface2/70 px-2 py-1 text-[11px] text-muted backdrop-blur-[6px]">
      {children}
    </span>
  );
}

function CornerMarks() {
  return (
    <>
      <span className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-accent/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-accent/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute left-3 bottom-3 h-3 w-3 border-l-2 border-b-2 border-accent/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r-2 border-b-2 border-accent/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );
}