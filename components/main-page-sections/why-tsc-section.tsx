"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

type Lang = "en" | "ka";

/* ─────────────────────────────────────────────────────────
   CONTENT — engineering ledger pillars
   Tight, declarative, position-taking. No marketing fluff.
   ───────────────────────────────────────────────────────── */
const PILLARS = {
  en: [
    {
      number: "01",
      headline: "Design through service. One scope.",
      body: "We design, install, and maintain MEP systems as one continuous scope. The team that drew the system is the team that commissions it and services it for the next ten years.",
    },
    {
      number: "02",
      headline: "Engineered for operational reality.",
      body: "Built for long-term lifecycle performance. Our systems are designed to minimize energy consumption, reduce maintenance overhead, and operate flawlessly under peak loads.",
    },
    {
      number: "03",
      headline: "Unified infrastructure by design.",
      body: "Mechanical, electrical, fire protection, and automated BMS are engineered from day one to function as a singular, intelligent ecosystem. By consolidating all disciplines, we guarantee seamless performance and absolute accountability.",
    },
    {
      number: "04",
      headline: "17 years on real projects.",
      body: "Hotels, towers, malls, schools, heritage sites. Constraint-heavy buildings where guessing isn't an option. Field experience over theory.",
    },
  ],
  ka: [
    {
      number: "01",
      headline: "სრული საინჟინრო ციკლი. ერთი პასუხისმგებლობა.",
      body: "ჩვენ ვუზრუნველყოფთ MEP სისტემების პროექტირებას, მონტაჟსა და მომსახურებას როგორც ერთ, უწყვეტ პროცესს. გუნდი, რომელიც ქმნის ნახაზს, თავად რთავს სისტემას ექსპლუატაციაში და უწევს მას ტექნიკურ ზედამხედველობას მომდევნო ათი წლის განმავლობაში.",
    },
    {
      number: "02",
      headline: "გათვლილი რეალურ დატვირთვაზე.",
      body: "სისტემები შექმნილია გრძელვადიანი და სტაბილური მუშაობისთვის. მინიმალური ენერგოდანახარჯი, გამარტივებული მოვლა და შეუფერხებელი ფუნქციონირება პიკური დატვირთვის დროს.",
    },
    {
      number: "03",
      headline: "ერთიანი, სინქრონიზებული ინფრასტრუქტურა.",
      body: "სახანძრო, მექანიკური, ელექტრო და ავტომატიზაციის (BMS) სისტემები საწყის ეტაპზევე იქმნება, როგორც ერთიანი ინტელექტუალური ეკოსისტემა. ყველა მიმართულების გაერთიანებით, ჩვენ ვუზრუნველყოფთ უწყვეტ ფუნქციონირებას და ვიღებთ აბსოლუტურ პასუხისმგებლობას მუშაობის ხარისხზე.",
    },
    {
      number: "04",
      headline: "17 წელი რთულ ობიექტებზე.",
      body: "სასტუმროები, ცათამბჯენები, სავაჭრო ცენტრები, სკოლები და ისტორიული ძეგლები. ჩვენ ვმუშაობთ სპეციფიკური შეზღუდვების მქონე შენობებზე, სადაც ვარაუდით მოქმედება დაუშვებელია. ჩვენი საყრდენი რეალური პრაქტიკაა და არა მხოლოდ თეორია.",
    },
  ],
};

const UI = {
  en: {
    kicker: "Why TSC",
    title1: "Built different.",
    title2: "Delivered right.",
    ctaTitle: "Ready for engineered precision?",
    ctaBody:
      "Schedule a site visit. We define scope, document the delivery, and stay accountable for the lifetime of the system.",
    ctaButton: "Start a Conversation",
    specStamp: "ENGINEERING STANDARD · TSC",
  },
  ka: {
    kicker: "რატომ TSC",
    title1: "ზუსტი მიდგომა.",
    title2: "უნაკლო ჩაბარება.",
    ctaTitle: "მზად ხართ საინჟინრო სიზუსტისთვის?",
    ctaBody:
      "დაგეგმეთ ვიზიტი ობიექტზე. განვსაზღვრავთ სამუშაოს მოცულობას, დავადოკუმენტირებთ ჩაბარებას და პასუხისმგებლები ვართ სისტემის სიცოცხლის ციკლზე.",
    ctaButton: "დაგვიკავშირდით",
    specStamp: "საინჟინრო სტანდარტი · TSC",
  },
};

/* ─────────────────────────────────────────────────────────
   Animations — typed as Variants so cubic-beziers don't fight TS
   ───────────────────────────────────────────────────────── */
const rowVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const headerVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const expandVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
      opacity: { duration: 0.15 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

/* ─────────────────────────────────────────────────────────
   MAIN
   ───────────────────────────────────────────────────────── */
export default function WhyTSCSection({ lang = "en" }: { lang?: Lang }) {
  const reduce = useReducedMotion();
  const pillars = useMemo(() => PILLARS[lang], [lang]);
  const ui = UI[lang];

  // Accordion state — first row pre-opened so the interaction is visible
  // on first load. User can collapse it by clicking again.
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-bg py-20 lg:py-28"
      aria-label="Why TSC"
    >
      {/* ── BACKGROUND LAYERS ────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Depth gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_15%_20%,color-mix(in_srgb,var(--color-accent)_5%,transparent),transparent_60%),radial-gradient(900px_700px_at_85%_80%,color-mix(in_srgb,var(--color-text)_3%,transparent),transparent_62%)]" />

        {/* Engineering grid — static, no scroll animation (perf win) */}
        <div
          className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(1000px_700px_at_50%_50%,black,transparent_85%)]"
        />

        {/* Diagonal accent line — subtle blueprint feel */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.05]"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
          fill="none"
        >
          <line x1="0" y1="200" x2="1000" y2="800" stroke="currentColor" strokeWidth="0.5" className="text-text" strokeDasharray="4 8" />
          <line x1="0" y1="800" x2="1000" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-text" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

          {/* ════════════════════════════════════════════
              LEFT — heading + technical visual
              ════════════════════════════════════════════ */}
          <motion.div
            initial={reduce ? false : "initial"}
            whileInView={reduce ? undefined : "enter"}
            viewport={{ once: true, margin: "-80px" }}
            variants={headerVariants}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Kicker */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                {ui.kicker}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-black tracking-tight text-text leading-[1.02] text-4xl sm:text-5xl lg:text-[3.5rem]">
              {ui.title1}
              <br />
              <span className="text-accent">{ui.title2}</span>
            </h2>

            {/* Engineering spec block — adds presence without ornament */}
            <div className="mt-10 hidden lg:block">
              <div className="relative rounded-2xl border border-border bg-surface/40 backdrop-blur-sm p-5 max-w-[320px]">
                {/* Corner marks */}
                <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-accent/60" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-accent/60" />
                <span className="absolute left-2 bottom-2 h-2.5 w-2.5 border-l border-b border-accent/60" />
                <span className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r border-b border-accent/60" />

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] tracking-[0.22em] text-accent/80 uppercase">
                    {ui.specStamp}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 font-mono text-[11px] text-muted">
                  <SpecRow label="SCOPE" value="MEP · Integration · Service" />
                  <SpecRow label="DELIVERY" value="Inspection-ready" />
                  <SpecRow label="EXPERIENCE" value="17 years · 100+ projects" />
                  <SpecRow label="REGION" value="Georgia" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════
              RIGHT — ledger of 4 pillars
              ════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            <ul
              role="list"
              className="relative flex flex-col rounded-2xl border border-border bg-surface/30 backdrop-blur-sm overflow-hidden"
            >
              {pillars.map((p, i) => {
                const isOpen = openIndex === i;
                return (
                  <motion.li
                    key={p.number}
                    custom={i}
                    initial={reduce ? false : "initial"}
                    whileInView={reduce ? undefined : "enter"}
                    viewport={{ once: true, margin: "-60px" }}
                    variants={rowVariants}
                    className={[
                      "relative border-b border-border/60 last:border-b-0",
                      isOpen ? "bg-surface/40" : "",
                    ].join(" ")}
                  >
                    {/* Row header — clickable */}
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-5 px-5 py-5 lg:px-7 lg:py-6 text-left transition-colors hover:bg-surface/50"
                    >
                      {/* Number */}
                      <span className="font-mono text-xs text-accent/70 tracking-wider flex-shrink-0">
                        {p.number}
                      </span>

                      {/* Vertical accent rail — present, intensifies when open */}
                      <span
                        className={[
                          "h-6 w-px flex-shrink-0 transition-all duration-300",
                          isOpen ? "bg-accent h-10" : "bg-border group-hover:bg-accent/40",
                        ].join(" ")}
                      />

                      {/* Headline */}
                      <span
                        className={[
                          "flex-1 text-base lg:text-[17px] font-semibold tracking-tight leading-snug transition-colors",
                          isOpen ? "text-text" : "text-text/80 group-hover:text-text",
                        ].join(" ")}
                      >
                        {p.headline}
                      </span>

                      {/* Indicator */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={[
                          "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border transition-colors",
                          isOpen
                            ? "border-accent/40 bg-accent/[0.10] text-accent"
                            : "border-border text-muted group-hover:border-accent/30 group-hover:text-accent",
                        ].join(" ")}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                            d="M5.5 1V10 M1 5.5H10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.span>
                    </button>

                    {/* Expand panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          variants={expandVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 pl-[3.25rem] lg:px-7 lg:pb-7 lg:pl-[4.5rem]">
                            <p className="text-sm leading-[1.75] text-muted max-w-[58ch]">
                              {p.body}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>

            {/* Small caption below ledger */}
            <p className="mt-3 font-mono text-[10px] text-muted/60 tracking-[0.2em] uppercase">
              {lang === "en"
                ? "Select a row for detail · " + pillars.length + " principles"
                : "დააჭირეთ რიგს დეტალებისთვის · " + pillars.length + " პრინციპი"}
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            CTA — preserved from old section, simplified
            ════════════════════════════════════════════ */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur-xl p-8 lg:p-12">

            {/* Subtle internal grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.10] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-text) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              }}
            />

            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex-1 max-w-2xl">
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-text mb-3">
                  {ui.ctaTitle}
                </h3>
                <p className="text-sm lg:text-base text-muted leading-relaxed">
                  {ui.ctaBody}
                </p>
              </div>

              <Link
                href={`/${lang}/contact`}
                className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-accent to-accent2 border border-accent/40 px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] overflow-hidden flex-shrink-0"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">{ui.ctaButton}</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SpecRow — small mono key/value pair for the spec card
   ───────────────────────────────────────────────────────── */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted/60 w-20 flex-shrink-0">{label}</span>
      <span className="h-px flex-1 bg-border/60" />
      <span className="text-text/80">{value}</span>
    </div>
  );
}