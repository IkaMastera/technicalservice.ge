"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

type Lang = "en" | "ka";

const STATEMENTS = {
  en: [
    {
      number: "01",
      headline: "We don't just install. We engineer.",
      body: "Every system we touch is designed, documented, and delivered with engineering discipline. Not guesswork. Not chaos wiring. A coordinated solution that passes inspection every time.",
      accent: false,
    },
    {
      number: "02",
      headline: "17 years of real field experience.",
      body: "Not theoretical. Not outsourced. Our team has seen every constraint, every site condition, every deadline pressure — and delivered anyway.",
      accent: true,
    },
    {
      number: "03",
      headline: "You keep the documentation.",
      body: "Every project ends with clean drawings, test records, and handover files. Because a system you can't document is a system you can't trust.",
      accent: false,
    },
    {
      number: "04",
      headline: "Fire. Power. Air. Water. One team.",
      body: "We integrate all MEP systems as one coordinated solution. No finger-pointing between contractors. No gaps between systems. One scope, one handover.",
      accent: false,
    },
  ],
  ka: [
    {
      number: "01",
      headline: "ჩვენ არ ვამონტაჟებთ — ჩვენ ვაპროექტებთ.",
      body: "ყველა სისტემა, რომელსაც ვაყენებთ, დაპროექტებულია, დოკუმენტირებულია და ჩაბარებულია საინჟინრო დისციპლინით.",
      accent: false,
    },
    {
      number: "02",
      headline: "17 წლის რეალური გამოცდილება.",
      body: "არა თეორიული. ჩვენი გუნდი ნახულია ყველა შეზღუდვა, ყველა სამშენებლო პირობა — და მიუხედავად ამისა, ჩავაბარა.",
      accent: true,
    },
    {
      number: "03",
      headline: "დოკუმენტაცია თქვენ გრჩებათ.",
      body: "ყველა პროექტი მთავრდება სუფთა ნახაზებით, ტესტის ჩანაწერებითა და ჩაბარების ფაილებით.",
      accent: false,
    },
    {
      number: "04",
      headline: "ხანძარი. ენერგია. ჰაერი. წყალი. ერთი გუნდი.",
      body: "ყველა MEP სისტემას ვაერთიანებთ ერთ კოორდინირებულ გადაწყვეტაში. ერთი მოცულობა, ერთი ჩაბარება.",
      accent: false,
    },
  ],
}

function Statement({
  item,
  index,
}: {
  item: {
    number: string;
    headline: string;
    body: string;
    accent: boolean;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 py-16 lg:py-20 border-b border-white/5 ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Ghost number — deep background, very subtle */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className={`font-black leading-none ${isEven ? "ml-0" : "ml-auto"}`}
          style={{
            fontSize: "clamp(8rem, 18vw, 20rem)",
            opacity: 0.04,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.5)",
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            WebkitTextFillColor: "transparent",
          }}
        >
          {item.number}
        </motion.span>
      </div>

      {/* Left — number + accent line */}
      <div className="relative flex-shrink-0 w-24 lg:w-32" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-accent mb-4"
          style={{ transformOrigin: "left", width: "100%" }}
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent/60">
          {item.number}
        </span>
      </div>

      {/* Right — headline + body */}
      <div className="relative flex-1" style={{ zIndex: 1 }}>
        <h3
          className={`font-black leading-[1.05] tracking-tight mb-5 ${
            item.accent ? "text-accent" : "text-white"
          }`}
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}
        >
          {item.headline}
        </h3>
        <p className="text-[15px] leading-relaxed text-white/40 max-w-xl">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyTSCSection({ lang = "en" }: { lang?: Lang }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on the section title
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const statements = STATEMENTS[lang];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080706] overflow-hidden"
      aria-labelledby="why-tsc-heading"
    >
      {/* Top accent rule */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,122,53,0.35) 40%, rgba(255,122,53,0.35) 60%, transparent 100%)",
        }}
      />

      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,122,53,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          style={{ y: titleY }}
          className="pt-20 lg:pt-28 pb-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-accent" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent">
              {lang === "en" ? "Why TSC" : "რატომ TSC"}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              id="why-tsc-heading"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-black tracking-tight text-white leading-[1.0]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
            >
              {lang === "en" ? "Built different." : "განსხვავებულად."}
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-2">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="font-black tracking-tight text-accent leading-[1.0]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
            >
              {lang === "en" ? "Delivered right." : "სწორად ჩაბარებული."}
            </motion.h2>
          </div>
        </motion.div>

        {/* Statements */}
        <div className="mt-4">
          {statements.map((item, i) => (
            <Statement key={item.number} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-16 lg:py-20 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="flex-1">
            <p className="text-lg font-bold text-white mb-1">
              {lang === "en"
                ? "Ready to work with an engineering firm that documents everything?"
                : "მზად ხართ ითანამშრომლოთ?"}
            </p>
            <p className="text-sm text-white/30">
              {lang === "en"
                ? "Site visit, scope, and proposal — no commitment required."
                : "ვიზიტი, მოცულობა და შეთავაზება — ვალდებულების გარეშე."}
            </p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-3 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white transition hover:bg-accent2 active:scale-[0.98] shadow-[0_4px_24px_rgba(255,122,53,0.30)] flex-shrink-0"
          >
            {lang === "en" ? "Start a conversation" : "დაგვიკავშირდით"}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent)",
        }}
      />
    </section>
  );
}