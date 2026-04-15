"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ButtonPrimary } from "../ui/button-primary";
import { copy } from "@/content/copy";

type Lang = "en" | "ka";

type Stat = {
  readonly label: string;
  readonly value: string;
  readonly hint: string;
};

type Principle = {
  readonly title: string;
  readonly desc: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function AboutUsSection({ lang = "en" }: { lang?: Lang }) {
  const reduce = useReducedMotion();

  const t = copy[lang].home.about;

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.45,
        ease: "easeOut",
      },
    },
  };

  const line: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: reduce ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const stats: ReadonlyArray<Stat> = t.stats;
  const principles: ReadonlyArray<Principle> = t.principles;

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-bg"
      aria-label={t.ariaLabel}
    >
      {/* soft depth gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 20% 15%, rgba(70, 130, 180,0.08), transparent 60%), radial-gradient(800px 420px at 80% 30%, rgba(47,107,255,0.06), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 lg:grid-cols-12"
        >
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/3 px-3 py-1 text-xs text-muted"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              {t.badge}
            </motion.div>

            <motion.h2
              variants={item}
              className="mt-4 font-semibold tracking-tight text-text text-3xl sm:text-4xl"
            >
              {t.heading}
            </motion.h2>

            <motion.div variants={line} className="mt-4 h-px w-40 origin-left bg-accent/70" />

            <motion.p variants={item} className="mt-5 text-base leading-7 text-muted">
              <span className="text-text">{t.motto}</span>
            </motion.p>

            <motion.div variants={item} className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
              {t.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonPrimary onClick={() => (window.location.href = `/${lang}/about`)}>
                {t.ctaPrimary}
              </ButtonPrimary>

              <a
                href={`/${lang}/portfolio`}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/2 px-5 py-3 text-sm font-semibold text-text
                           transition-colors duration-200 hover:bg-white/5"
              >
                {t.ctaSecondary}
              </a>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              <motion.div
                variants={item}
                className="rounded-xl border border-white/10 bg-surface p-5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">{t.profileKicker}</p>
                    <p className="mt-1 text-lg font-bold text-text">{t.profileTitle}</p>
                  </div>

                  <div className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[11px] text-muted">
                    {t.profileChip}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <motion.div
                      key={s.label}
                      whileHover={reduce ? undefined : { y: -2 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-lg border border-white/10 bg-surface2 p-3"
                    >
                      <p className="text-[11px] uppercase tracking-wide text-muted">{s.label}</p>
                      <p className="mt-1 text-xl font-extrabold text-text">{s.value}</p>
                      <p className="mt-1 text-[11px] leading-4 text-muted">{s.hint}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item} className="rounded-xl border border-white/10 bg-surface p-5">
                <p className="text-xs uppercase tracking-wider text-muted">{t.principlesKicker}</p>

                <div className="mt-4 space-y-3">
                  {principles.map((p) => (
                    <motion.div
                      key={p.title}
                      whileHover={reduce ? undefined : { y: -2 }}
                      transition={{ duration: 0.18 }}
                      className={cx("rounded-lg border border-white/10 bg-surface2 p-4", "hover:border-white/20")}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-accent" />
                        <div>
                          <p className="text-sm font-bold text-text">{p.title}</p>
                          <p className="mt-1 text-[13px] leading-6 text-muted">{p.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={line} className="mt-5 h-px w-full origin-left bg-white/10" />

                <div className="mt-4 flex items-center justify-between text-[12px] text-muted">
                  <span>{t.footerLeft}</span>
                  <span className="text-[#2F6BFF]">{t.footerRight}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}