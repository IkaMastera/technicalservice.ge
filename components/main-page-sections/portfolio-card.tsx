"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";
import { ChevronRight } from "lucide-react";

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
        group relative overflow-hidden rounded-xl border border-border bg-surface
        shadow-[0_12px_35px_rgba(0,0,0,0.22)]
      "
    >
      {/* Blueprint grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.25]">
        <div
          className="
            absolute inset-0
            [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
            [background-size:26px_26px]
          "
        />
      </div>

      {/* Spec stripe */}
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-accent/90" />

      <Link href={`/en/portfolio/${item.slug}`} className="block">
        {/* Media */}
        <div className="relative aspect-[16/9] overflow-hidden bg-surface2">
          <Image
            src={item.cover.src}
            alt={item.cover.alt}
            fill
            className={`
              object-cover
              ${reduce ? "" : "transition-transform duration-500 ease-out group-hover:scale-[1.03]"}
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Darken overlay on hover */}
          <div
            aria-hidden="true"
            className={`
              absolute inset-0
              ${reduce ? "opacity-25" : "opacity-15 group-hover:opacity-35 transition-opacity duration-300"}
              bg-black
            `}
          />
        </div>

        {/* Body */}
        <div className="relative p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-muted">
                {item.category} • {item.location}
                {item.year ? ` • ${item.year}` : ""}
              </p>

              <h3 className="mt-1 truncate text-lg font-semibold tracking-tight text-text">
                {item.title}
              </h3>

              {/* Underline indicator */}
              <div className="mt-3 h-[1px] w-full bg-border" />
              <div
                aria-hidden="true"
                className={`
                  mt-[-1px] h-[2px] w-10 bg-accent
                  ${reduce ? "" : "transition-all duration-300 group-hover:w-20"}
                `}
              />
            </div>

            <span
              className="
                inline-flex items-center gap-1 rounded-lg border border-border bg-surface2 px-2 py-1
                text-xs text-muted
              "
            >
              View <ChevronRight className="h-4 w-4 text-accent" />
            </span>
          </div>

          {/* Hover dossier */}
          <div
            className={`
              mt-4 grid gap-3
              ${reduce ? "" : "transition-all duration-300"}
            `}
          >
            <div className="flex flex-wrap gap-2">
              {item.systems.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="
                    rounded-full border border-border bg-surface2 px-2.5 py-1
                    text-xs text-muted
                  "
                >
                  {s}
                </span>
              ))}
            </div>

            <div
              className={`
                overflow-hidden rounded-xl border border-border bg-surface2 p-3
                ${reduce ? "" : "max-h-0 group-hover:max-h-40 transition-[max-height] duration-500 ease-out"}
              `}
            >
              <p className="text-xs font-medium text-text">Scope highlights</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
                {item.highlights.slice(0, 3).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
