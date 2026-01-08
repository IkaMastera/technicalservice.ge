"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";

import { SERVICES } from "@/data/services";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function ServiceDetailTemplate({
  title,
  slug,
  images,
}: {
  title: string;
  slug: string;
  images: string[];
}) {
  const reduce = useReducedMotion();

  const service = useMemo(() => SERVICES.find((x) => x.slug === slug), [slug]);
  const Icon = service?.Icon;

  const count = images.length;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    setIdx((v) => Math.min(v, count - 1));
  }, [count]);

  const plate = useMemo(() => {
    const a = String(Math.min(idx + 1, Math.max(count, 1))).padStart(2, "0");
    const c = String(Math.max(count, 0)).padStart(2, "0");
    return `#${a}/${c}`;
  }, [idx, count]);

  const canPrev = idx > 0;
  const canNext = idx < count - 1;

  const goPrev = () => setIdx((v) => Math.max(0, v - 1));
  const goNext = () => setIdx((v) => Math.min(count - 1, v + 1));

  useEffect(() => {
    if (count <= 1) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.02 },
    },
  };

  const up: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" } },
  };

  const imgVariants: Variants = {
    initial: { opacity: 0, scale: reduce ? 1 : 0.995 },
    animate: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.22, ease: "easeOut" } },
    exit: { opacity: 0, scale: reduce ? 1 : 0.995, transition: { duration: reduce ? 0 : 0.18 } },
  };

  return (
    <main className="relative bg-bg">
      {/* blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* warm wash */}
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
        {/* top bar */}
        <motion.div variants={up} className="flex items-center justify-between gap-4">
          <Link href="/en/services" className="text-[13px] text-muted hover:text-text transition">
            ← Back
          </Link>
        </motion.div>

        <motion.section variants={up} className="mt-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* LEFT: compact service identity (sticky on desktop) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24">
              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-bg">
                    {Icon ? (
                      <Icon className="h-8 w-8" aria-hidden="true" focusable="false" />
                    ) : (
                      <span className="h-8 w-8 rounded bg-white/5" aria-hidden="true" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Service</p>
                    <h1 className="mt-2 text-[15px] sm:text-[16px] font-extrabold leading-6 text-text">
                      {title}
                    </h1>
                    <div className="mt-3 h-px w-20 bg-accent/70" />
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: image hero */}
            <div className="lg:col-span-9">
              {count === 0 ? (
                <div className="rounded-lg border border-border bg-surface p-6 text-muted">
                  No photos available yet for this service.
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-surface overflow-hidden">
                  {/* header strip (minimal) */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <span className="rounded-md border border-border bg-bg px-3 py-1 text-[12px] text-text">
                      {plate}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-bg">
                      {/* arrows ON the image */}
                      {count > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={goPrev}
                            disabled={!canPrev}
                            className={cx(
                              "absolute left-3 top-1/2 z-10 -translate-y-1/2",
                              "h-11 w-11 rounded-md border grid place-items-center",
                              "transition",
                              canPrev
                                ? "border-white/15 bg-bg/70 text-text hover:border-white/25 hover:bg-bg/85"
                                : "border-white/10 bg-bg/40 text-muted opacity-40 cursor-not-allowed"
                            )}
                            aria-label="Previous image"
                            title="Previous"
                          >
                            ‹
                          </button>

                          <button
                            type="button"
                            onClick={goNext}
                            disabled={!canNext}
                            className={cx(
                              "absolute right-3 top-1/2 z-10 -translate-y-1/2",
                              "h-11 w-11 rounded-md border grid place-items-center",
                              "transition",
                              canNext
                                ? "border-white/15 bg-bg/70 text-text hover:border-white/25 hover:bg-bg/85"
                                : "border-white/10 bg-bg/40 text-muted opacity-40 cursor-not-allowed"
                            )}
                            aria-label="Next image"
                            title="Next"
                          >
                            ›
                          </button>
                        </>
                      )}

                      {/* plate label bottom-left (industrial stamp) */}
                      <div className="absolute left-3 bottom-3 z-10 rounded-md border border-white/15 bg-bg/70 px-3 py-1 text-[12px] text-text">
                        Plate {String(idx + 1).padStart(2, "0")}
                      </div>

                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={images[idx]}
                          variants={imgVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0"
                        >
                          <Image
                            src={images[idx]}
                            alt={`${title} photo ${idx + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 900px"
                            className="object-cover"
                            priority={idx < 2}
                          />

                          {/* subtle vignette (more industrial than scanlines) */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "radial-gradient(900px 520px at 50% 40%, transparent 60%, rgba(0,0,0,0.45) 100%)",
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* progress line (clean, not “UI demo”) */}
                    {count > 1 && (
                      <div className="mt-4 h-2 rounded-full border border-border bg-bg overflow-hidden">
                        <div
                          className="h-full bg-accent/70 transition-[width] duration-200"
                          style={{
                            width: `${Math.round(((idx + 1) / count) * 100)}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}