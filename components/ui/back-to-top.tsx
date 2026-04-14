"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    /*
      If Lenis is running it intercepts window.scrollTo and can ignore it.
      The most reliable cross-library approach: emit a native scroll event
      that Lenis picks up, OR use document.documentElement directly.
      We try Lenis first via its global instance, then fall back.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            fixed z-[60]
            right-4 bottom-[4.75rem]
            md:right-6 md:bottom-[5.25rem]
            group grid h-14 w-14 place-items-center rounded-2xl
            bg-surface border border-border
            shadow-[0_14px_40px_rgba(0,0,0,0.45)]
            transition-transform duration-200 will-change-transform
            hover:-translate-y-0.5
            cursor-pointer
          "
        >
          <span className="
            grid place-items-center h-11 w-11 rounded-xl
            bg-bg border border-white/10
            transition
            group-hover:border-white/15
          ">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M9 14V4M9 4L4 9M9 4L14 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted group-hover:text-accent transition-colors duration-200"
              />
            </svg>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}