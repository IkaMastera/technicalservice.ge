"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

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
      headline: "ჩვენ არამხოლოდ ვამონტაჟებთ - ასევე ვაპროექტებთ.",
      body: "ყველა სისტემა, რომელსაც ვაინსტალირებთ, დაპროექტებულია, დოკუმენტირებულია და ჩაბარებულია საინჟინრო დისციპლინით.",
      accent: false,
    },
    {
      number: "02",
      headline: "17 წლიანი რეალური გამოცდილება.",
      body: "ჩვენი გამოცდილება გასცდება თეორიას. გადალახული გვაქვს ყველა ტიპის სამშენებლო ბარიერი და თითოეული პროექტი წარმატებით მიგვიყვანია ბოლომდე.",
      accent: true,
    },
    {
      number: "03",
      headline: "დოკუმენტაცია თქვენ საკუთრებაშია.",
      body: "ყველა პროექტი მთავრდება სუფთა ნახაზებით, ტესტის ჩანაწერებითა და ჩაბარების ფაილებით.",
      accent: false,
    },
    {
      number: "04",
      headline: "სახანძრო. ელექტრო. HVAC. სანტექნიკა. სრული ინტეგრაცია.",
      body: "ყველა MEP სისტემას ვაქცევთ ერთ, იდეალურად სინქრონიზებულ მექანიზმად. ერთიანი დაგეგმარება, უნაკლო ჩაბარება.",
      accent: false,
    }
  ],
};

// ── SUB-COMPONENT FOR INDIVIDUAL SLIDES ──
function StatementLayer({ 
  item, 
  index, 
  activeIndexFloat 
}: { 
  item: typeof STATEMENTS["en"][0]; 
  index: number; 
  activeIndexFloat: MotionValue<number>;
}) {
  const progress = useTransform(activeIndexFloat, (v) => v - index);
  
  const scale = useTransform(progress, [-1, -0.35, 0.35, 1], [0.6, 1, 1, 1.4]);
  const y = useTransform(progress, [-1, -0.35, 0.35, 1], ["40%", "0%", "0%", "-40%"]);
  const blur = useTransform(progress, [-1, -0.35, 0.35, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const opacity = useTransform(progress, [-1, -0.35, -0.2, 0.2, 0.35, 1], [0, 0, 1, 1, 0, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ scale, opacity, y, filter: blur, zIndex: 10 - index }}
    >
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[10%]">
        <span 
          className="font-black leading-none select-none"
          style={{
            fontSize: "clamp(12rem, 35vw, 40rem)",
            color: "transparent",
            WebkitTextStroke: "2px color-mix(in srgb, var(--color-text) 15%, transparent)",
            letterSpacing: "-0.05em",
            transform: "translateZ(0)",
          }}
        >
          {item.number}
        </span>
      </div>

      <div className="absolute left-0 lg:left-[5%] max-w-2xl w-full p-6 lg:p-10 pointer-events-auto">
        <div 
          className="rounded-3xl border border-border bg-surface/60 backdrop-blur-2xl shadow-2xl p-8 lg:p-12"
          style={{
            boxShadow: "0 25px 50px -12px color-mix(in srgb, var(--color-bg) 50%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-text) 10%, transparent)"
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent/10 text-accent font-mono text-xs font-bold border border-accent/20">
              {item.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
          </div>
          
          <h3 className={`text-3xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-6 ${item.accent ? "text-accent" : "text-text"}`}>
            {item.headline}
          </h3>
          
          <p className="text-base lg:text-lg leading-relaxed text-muted font-medium">
            {item.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN COMPONENT ──
export default function WhyTSCSection({ lang = "en" }: { lang?: Lang }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const statements = STATEMENTS[lang];
  
  const totalSteps = statements.length + 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndexFloat = useTransform(scrollYProgress, [0, 1], [0, totalSteps - 1]);

  // ── CALL FINAL CTA HOOKS AT TOP LEVEL ──
  const ctaIndex = statements.length;
  const ctaProgress = useTransform(activeIndexFloat, (v) => v - ctaIndex);
  
  const ctaScale = useTransform(ctaProgress, [-1, -0.3, 0], [0.6, 1, 1]);
  // Resting at 12vh pushes the container down to create a gap from the fixed header
  const ctaY = useTransform(ctaProgress, [-1, -0.3, 0], ["40vh", "12vh", "12vh"]);
  const ctaOpacity = useTransform(ctaProgress, [-1, -0.3, -0.1, 0], [0, 0, 1, 1]);
  const ctaBlur = useTransform(ctaProgress, [-1, -0.3, 0], ["blur(12px)", "blur(0px)", "blur(0px)"]);

  return (
    <section ref={containerRef} className="relative bg-bg" style={{ height: `${totalSteps * 150}vh` }}>
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Animated Engineering Grid Background */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Depth gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_18%_10%,color-mix(in_srgb,var(--color-accent)_6%,transparent),transparent_60%),radial-gradient(980px_720px_at_86%_18%,color-mix(in_srgb,var(--color-text)_4%,transparent),transparent_62%)]" />
          
          {/* BIG grid */}
          <div
            className={`absolute -inset-24 opacity-60 dark:opacity-40 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(920px_620px_at_50%_26%,black,transparent_88%)] ${reduceMotion ? "" : "animate-[gridPan_12s_linear_infinite]"}`}
          />

          {/* MICRO grid */}
          <div
            className={`absolute -inset-24 opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(920px_620px_at_50%_26%,black,transparent_88%)] ${reduceMotion ? "" : "animate-[gridPan_18s_linear_infinite_reverse]"}`}
          />

          <style>{`
            @keyframes gridPan {
              0% { transform: translate3d(0px, 0px, 0); }
              100% { transform: translate3d(56px, 0px, 0); }
            }
          `}</style>
        </div>

        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 60%)" }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
          
          {/* Static Header */}
          <div className="absolute top-12 lg:top-24 left-6 lg:left-12 right-6 lg:right-12 z-40 flex justify-between items-start pointer-events-none">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-8 rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {lang === "en" ? "Why TSC" : "რატომ TSC"}
                </span>
              </div>
              <h2 className="font-black tracking-tight text-text leading-[1.05] drop-shadow-lg" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                {lang === "en" ? "Built different." : "ზუსტი მიდგომა."}
                <br />
                <span className="text-accent">{lang === "en" ? "Delivered right." : "უნაკლო ჩაბარება."}</span>
              </h2>
            </div>
          </div>

          {/* ── KINETIC 3D LAYERS ── */}
          <div className="relative w-full h-[60vh] flex items-center justify-center mt-12">
            
            {statements.map((item, i) => (
              <StatementLayer 
                key={item.number} 
                item={item} 
                index={i} 
                activeIndexFloat={activeIndexFloat} 
              />
            ))}

            {/* ── SLIDE 5: THE COMPACT FINAL CTA ── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ scale: ctaScale, opacity: ctaOpacity, y: ctaY, filter: ctaBlur, zIndex: 20 }}
            >
              {/* Subtle backdrop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                 <div className="w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-accent blur-[100px] rounded-full mix-blend-screen" />
              </div>

              <div className="relative w-full max-w-2xl px-6 pointer-events-auto">
                <div 
                  className="relative overflow-hidden rounded-3xl border border-border bg-surface/80 backdrop-blur-3xl p-8 lg:p-12 text-center shadow-2xl"
                >
                  {/* Internal micro-grid for the CTA box */}
                  <div 
                    className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--color-text) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                      maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
                    }}
                  />
                  
                  {/* Subtle top/bottom structural lines */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  
                  <h3 className="relative z-10 text-3xl lg:text-5xl font-black tracking-tight text-text mb-4">
                    {lang === "en" ? "Ready for engineered" : "საინჟინრო სიზუსტე თქვენი"}{" "}
                    <span className="text-accent">{lang === "en" ? "precision?" : "პროექტისთვის"}</span>
                  </h3>
                  
                  <p className="relative z-10 text-base text-muted font-medium mb-8 max-w-lg mx-auto">
                    {lang === "en" 
                      ? "Stop guessing. Start engineering. Schedule a site visit, define the scope, and receive a complete proposal—no commitment required." 
                      : "ნუ დახარჯავთ რესურსებს ვარაუდებზე. დაგეგმეთ ვიზიტი ობიექტზე და მიიღეთ ზუსტი საინჟინრო გადაწყვეტა უფასო კონსულტაციის ფარგლებში."}
                  </p>

                  <div className="flex justify-center relative z-10">
                    <Link
                      href={`/${lang}/contact`}
                      className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-accent to-accent2 border border-accent/40 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] overflow-hidden"
                    >
                      {/* Metallic sheen overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                      
                      {/* Sweep animation */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[tsc-btn-sweep_2s_infinite_ease-in-out]" />
                      
                      <span className="relative z-10">{lang === "en" ? "Start a Conversation" : "დაგვიკავშირდით"}</span>
                      <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}