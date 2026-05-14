"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { PortfolioItem, Lang, ScopeCategory } from "@/data/portfolio";
import { getItemCategories } from "@/data/portfolio";

/* ─────────────────────────────────────────────────────────
   UI strings — kept local so we don't have to round-trip
   through copy.ts. Easy to lift later if you want one source.
   ───────────────────────────────────────────────────────── */
const UI = {
  en: {
    stamp:     "DOSSIER",
    location:  "Location",
    scope:     "Scope of Work",
    overview:  "Overview",
    close:     "Close",
    openFile:  "Open project file",
    yearShort: "Year",
  },
  ka: {
    stamp:     "დოსიე",
    location:  "მდებარეობა",
    scope:     "შესრულებული სამუშაოები",
    overview:  "მიმოხილვა",
    close:     "დახურვა",
    openFile:  "პროექტის ფაილის გახსნა",
    yearShort: "წელი",
  },
};

type Props = {
  item: PortfolioItem;
  lang?: Lang;
  isExpanded: boolean;
  onToggle: () => void;
  /** Hint to the card whether the user has any filters active.
   *  When true, we highlight matching scope categories. */
  activeCategories?: ScopeCategory[];
};

export function PortfolioCard({
  item,
  lang = "en",
  isExpanded,
  onToggle,
  activeCategories = [],
}: Props) {
  const reduce = useReducedMotion();
  const t = UI[lang];

  const cats = getItemCategories(item);

  /* Click handler — only collapsed card triggers expand on body click.
     When expanded, body click does NOT collapse (would cause accidental
     close while reading). User uses the X button or Escape. */
  const onCardClick = () => {
    if (!isExpanded) onToggle();
  };

  return (
    <motion.article
      layout
      transition={{
        layout: { duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onCardClick}
      className={[
        "group relative overflow-hidden rounded-2xl cursor-pointer",
        "border border-border bg-surface",
        "shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
        isExpanded ? "cursor-default ring-1 ring-accent/30" : "",
      ].join(" ")}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={item.title[lang]}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isExpanded) {
          e.preventDefault();
          onToggle();
        }
      }}
      whileHover={reduce || isExpanded ? undefined : { y: -2 }}
    >
      {/* ════════════════════════════════════════════════════
          MEDIA — always rendered. In collapsed state: 16:10.
          In expanded state: 21:9 panoramic.
          ════════════════════════════════════════════════════ */}
      <motion.div
        layout
        className={[
          "relative bg-surface2",
          isExpanded ? "aspect-[21/9]" : "aspect-[16/10]",
        ].join(" ")}
        transition={{
          layout: { duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <Image
          src={item.cover.src}
          alt={item.cover.alt}
          fill
          priority={!!item.featured}
          className={[
            "object-cover",
            // Dossier treatment — desaturated when collapsed, full color when hovered/expanded
            isExpanded
              ? "grayscale-0 brightness-[1.02] saturate-[1.05]"
              : "grayscale contrast-[1.06] brightness-[0.82] saturate-[0.85]",
            reduce
              ? ""
              : "transition-[filter,transform] duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-[1.02] group-hover:saturate-[1.08] group-hover:scale-[1.015]",
          ].join(" ")}
          sizes={
            isExpanded
              ? "100vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />

        {/* Blueprint grid overlay (hover only when collapsed) */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0",
            isExpanded ? "opacity-[0.10]" : "opacity-0",
            reduce ? "" : "transition-opacity duration-300",
            !isExpanded ? "group-hover:opacity-[0.18]" : "",
            "[background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
            "[background-size:28px_28px]",
          ].join(" ")}
        />

        {/* Top-right DOSSIER stamp */}
        <div
          className={[
            "absolute right-3 top-3",
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-6px]",
            reduce
              ? ""
              : "group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250",
          ].join(" ")}
        >
          <div className="rounded-lg border border-border bg-surface/70 px-2 py-1 backdrop-blur-[6px]">
            <span className="text-[11px] tracking-[0.22em] text-muted">
              {t.stamp}
            </span>
          </div>
        </div>

        {/* Inspection corners */}
        <div aria-hidden="true" className="absolute inset-0">
          <CornerMarks visible={isExpanded} />
        </div>

        {/* Bottom title plate — always visible */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-border bg-surface/75 px-3 py-2 backdrop-blur-[8px]">
            <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
            <p className="truncate text-sm font-semibold text-text">
              {item.title[lang]}
            </p>
          </div>
        </div>

        {/* Close X — only when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              key="close-btn"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              aria-label={t.close}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur-md text-text/80 hover:text-text hover:bg-surface hover:border-accent/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 2 L12 12 M12 2 L2 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Collapsed-state spec plate (slides up on hover) */}
        {!isExpanded && (
          <div
            className={[
              "absolute inset-x-0 bottom-0",
              "translate-y-[38%] opacity-0",
              reduce
                ? "translate-y-0 opacity-100"
                : "group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out",
            ].join(" ")}
          >
            <div className="bg-gradient-to-t from-black/70 via-black/35 to-transparent p-4">
              <div className="flex flex-wrap items-center gap-2">
                {cats.slice(0, 3).map((c) => (
                  <CategoryPill
                    key={c}
                    label={c}
                    highlighted={activeCategories.includes(c)}
                  />
                ))}
                {cats.length > 3 && (
                  <span className="text-[11px] text-muted">
                    +{cats.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-2 grid gap-1">
                <p className="text-sm text-text/95">
                  <span className="text-muted">{t.location}:</span>{" "}
                  {item.location[lang]}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-[11px] text-muted">{t.openFile}</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="text-muted"
                >
                  <path
                    d="M2 5 H8 M5 2 L8 5 L5 8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* ════════════════════════════════════════════════════
          EXPANDED PANEL — Overview + full scope list
          ════════════════════════════════════════════════════ */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.15 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 lg:p-8 grid gap-8 lg:grid-cols-12">
              {/* LEFT — overview + meta */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px w-6 bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                      {t.overview}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-text lg:text-3xl mb-2">
                    {item.title[lang]}
                  </h3>
                  <p className="text-sm text-muted">{item.location[lang]}</p>
                </div>

                <p className="text-sm leading-[1.7] text-text/80">
                  {item.summary[lang]}
                </p>

                {/* Category pills row */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cats.map((c) => (
                    <CategoryPill
                      key={c}
                      label={c}
                      highlighted={activeCategories.includes(c)}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT — scope list, full detail */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                    {t.scope}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <ul className="flex flex-col divide-y divide-border/60">
                  {dedupeScope(item.scope).map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.2 + i * 0.05, duration: 0.3 },
                      }}
                      className="flex items-start gap-3 py-3"
                    >
                      <div className="mt-[8px] h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[13px] leading-snug text-text/90">
                          {s.label[lang]}
                        </span>
                        <span className="font-mono text-[10px] text-accent/80 tracking-wider rounded-md bg-accent/[0.06] border border-accent/15 px-1.5 py-0.5">
                          {s.yearRange}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

function CategoryPill({
  label,
  highlighted,
}: {
  label: string;
  highlighted?: boolean;
}) {
  return (
    <span
      className={[
        "rounded-lg border px-2 py-1 text-[11px] backdrop-blur-[6px] transition-colors",
        highlighted
          ? "border-accent/50 bg-accent/[0.10] text-accent"
          : "border-border bg-surface2/70 text-muted",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function CornerMarks({ visible }: { visible: boolean }) {
  const base =
    "absolute h-3 w-3 border-accent/70 transition-opacity duration-300";
  const vis = visible ? "opacity-100" : "opacity-0 group-hover:opacity-100";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l-2 border-t-2 ${vis}`} />
      <span className={`${base} right-3 top-3 border-r-2 border-t-2 ${vis}`} />
      <span className={`${base} left-3 bottom-3 border-l-2 border-b-2 ${vis}`} />
      <span
        className={`${base} right-3 bottom-3 border-r-2 border-b-2 ${vis}`}
      />
    </>
  );
}

/**
 * Some projects (Tsinandali) intentionally tag the same scope row under
 * multiple categories so they appear in multiple filter results. When
 * we DISPLAY the scope list inside a card, we don't want duplicates.
 * Dedupe by English label since labels are stable strings.
 */
function dedupeScope(scope: PortfolioItem["scope"]): PortfolioItem["scope"] {
  const seen = new Set<string>();
  return scope.filter((s) => {
    const k = s.label.en;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}