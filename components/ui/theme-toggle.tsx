"use client";

import { useCallback, useEffect, useState } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type ThemeMode = "dark" | "light";
const STORAGE_KEY = "tsc-theme";

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === "dark" || saved === "light") return saved;
  } catch {}

  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }
  return "dark";
}

function applyTheme(theme: ThemeMode) {
  // Your CSS uses: :root[data-theme="light"] { ... }
  if (theme === "light") document.documentElement.dataset.theme = "light";
  else document.documentElement.removeAttribute("data-theme");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cx(
        "relative inline-flex h-10 items-center gap-2 rounded-xl px-2",
        "border border-white/10 bg-surface text-text",
        "hover:bg-white/4 active:scale-[0.98] transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      )}
    >
      {/* status ring (engineering indicator) */}
      <span
        aria-hidden="true"
        className={cx(
          "relative grid h-6 w-6 place-items-center rounded-lg border",
          "border-white/10 bg-bg"
        )}
      >
        <span
          className={cx(
            "absolute inset-0 rounded-lg",
            "transition-opacity duration-200",
            isDark ? "opacity-0" : "opacity-100"
          )}
          style={{
            boxShadow: "inset 0 0 0 1px rgba(245,179,1,0.35)",
          }}
        />
        {/* icon */}
        {isDark ? (
          // moon (clean)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-text/80">
            <path
              d="M21 14.5A7.5 7.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // sun (clean)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent">
            <path
              d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 2.5v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 19.5v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M2.5 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M19.5 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {/* micro label (feels like a control panel, not a toy) */}
      <span className="hidden sm:block text-[12px] uppercase tracking-[0.22em] text-muted">
        {isDark ? "Dark" : "Light"}
      </span>

      {/* slider (precision switch) */}
      <span
        aria-hidden="true"
        className={cx(
          "relative h-6 w-11 rounded-full border",
          "border-white/10 bg-bg"
        )}
      >
        <span
          className={cx(
            "absolute top-1/2 -translate-y-1/2",
            "h-4 w-4 rounded-full border",
            "border-white/15 bg-surface",
            "transition-[left] duration-200 ease-out",
            isDark ? "left-1" : "left-6"
          )}
        />
      </span>
    </button>
  );
}