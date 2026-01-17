"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------------------- helpers -------------------------------- */

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

type Lang = "en" | "ka";

function getLang(pathname: string | null): Lang {
  if (!pathname) return "en";
  return pathname.startsWith("/ka") ? "ka" : "en";
}

function swapLang(pathname: string | null, to: Lang) {
  const p = pathname ?? "/en";
  const stripped = p.replace(/^\/(en|ka)(?=\/|$)/, "");
  return `/${to}${stripped || ""}`;
}

const FLAGS = {
  en: {
    src: "/flags/gb.svg",
    label: "English",
  },
  ka: {
    src: "/flags/ge.svg",
    label: "ქართული",
  },
} as const;

/* ------------------------------ component --------------------------------- */

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const lang = useMemo(() => getLang(pathname), [pathname]);
  const nextEn = useMemo(() => swapLang(pathname, "en"), [pathname]);
  const nextKa = useMemo(() => swapLang(pathname, "ka"), [pathname]);

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  /* close on Esc */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "inline-flex h-10 items-center gap-2 rounded-xl px-3",
          "border border-white/10 bg-surface text-text",
          "hover:bg-white/4 active:scale-[0.98] transition"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className="relative h-5 w-5 overflow-hidden rounded-full">
          <Image
            src={FLAGS[lang].src}
            alt=""
            fill
            sizes="20px"
            className="object-cover"
            priority
          />
        </span>

        <span className="text-sm font-semibold uppercase">{lang}</span>

        <span
          className={cx(
            "ml-0.5 text-muted transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className={cx(
              "absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl",
              "border border-white/10 bg-surface",
              "shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            )}
            role="menu"
          >
            {/* English */}
            <Link
              href={nextEn}
              role="menuitem"
              className="flex items-center justify-between px-4 py-3 text-sm hover:bg-white/4 transition"
            >
              <span className="flex items-center gap-2">
                <span className="relative h-5 w-5 overflow-hidden rounded-full">
                  <Image
                    src={FLAGS.en.src}
                    alt=""
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </span>
                {FLAGS.en.label}
              </span>
              {lang === "en" && <span className="text-accent">✓</span>}
            </Link>

            <div className="h-px bg-white/10" />

            {/* Georgian */}
            <Link
              href={nextKa}
              role="menuitem"
              className="flex items-center justify-between px-4 py-3 text-sm hover:bg-white/4 transition"
            >
              <span className="flex items-center gap-2">
                <span className="relative h-5 w-5 overflow-hidden rounded-full">
                  <Image
                    src={FLAGS.ka.src}
                    alt=""
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </span>
                {FLAGS.ka.label}
              </span>
              {lang === "ka" && <span className="text-accent">✓</span>}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}