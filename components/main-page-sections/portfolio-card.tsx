"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";

const cardIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={cardIn}
      className="
        group relative overflow-hidden rounded-xl
        border border-border bg-surface
        shadow-[0_12px_35px_rgba(0,0,0,0.22)]
      "
    >
      {/* Thin inspection stripe (kept, but quieter) */}
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-[2px] bg-accent/80" />

      <Link
        href={`/en/portfolio/${item.slug}`}
        className="
          block focus:outline-none
          focus-visible:ring-2 focus-visible:ring-accent/70
          focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
        "
      >
        {/* Media */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface2">
          {/* Photo */}
          <Image
            src={item.cover.src}
            alt={item.cover.alt}
            fill
            priority={!!item.featured}
            className={[
              "object-cover",
              // Start slightly muted, go “truer” on hover (visual-first)
              "saturate-[0.92] contrast-[1.02]",
              reduce ? "" : "transition-transform duration-500 ease-out group-hover:scale-[1.015]",
            ].join(" ")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Default subtle darken to fit dark UI; ease off on hover */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0",
              "bg-black",
              reduce
                ? "opacity-25"
                : "opacity-30 group-hover:opacity-18 transition-opacity duration-300",
            ].join(" ")}
          />

          {/* Blueprint grid only on hover (keeps engineering identity without clutter) */}
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-0",
              reduce ? "opacity-0" : "opacity-0 group-hover:opacity-[0.18] transition-opacity duration-300",
            ].join(" ")}
          >
            <div
              className="
                absolute inset-0
                [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
                [background-size:28px_28px]
              "
            />
          </div>

          {/* Bottom-left always-visible minimal label (title only) */}
          <div className="absolute bottom-3 left-3 right-3">
            <div
              className="
                inline-flex max-w-full items-center
                rounded-lg border border-border bg-surface/80 px-3 py-2
                backdrop-blur-[6px]
              "
            >
              <p className="truncate text-sm font-semibold text-text">
                {item.title}
              </p>
            </div>
          </div>

          {/* Hover dossier overlay (compact “spec plate”) */}
          <div
            className={[
              "absolute inset-0",
              "flex items-end",
              reduce ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity duration-250",
            ].join(" ")}
          >
            <div
              className="
                w-full p-4
                bg-gradient-to-t from-black/65 via-black/35 to-transparent
              "
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-border bg-surface2/80 px-2 py-1 text-[11px] text-muted">
                  {item.category}
                </span>
                {item.year ? (
                  <span className="rounded-md border border-border bg-surface2/80 px-2 py-1 text-[11px] text-muted">
                    {item.year}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm text-text/95">
                <span className="text-muted">Location:</span>{" "}
                {item.location}
              </p>

              {/* Systems: single line, max 3. No pills everywhere. */}
              <p className="mt-1 text-sm text-muted">
                <span className="text-text/90">Systems:</span>{" "}
                {item.systems.slice(0, 3).join(" • ")}
                {item.systems.length > 3 ? " • …" : ""}
              </p>

              {/* Micro “detail hint” (engineering-style) */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-[11px] text-muted">
                  Open project dossier
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}