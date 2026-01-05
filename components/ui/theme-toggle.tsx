"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const fromAttr = document.documentElement.dataset.theme as Theme | undefined;
  const fromLS = localStorage.getItem("tsc-theme") as Theme | null;
  return fromAttr || fromLS || "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  // ✅ apply theme to DOM (no setState here → ESLint stops yelling)
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("tsc-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-border bg-surface2 px-3 py-2 text-[12px] font-semibold text-text hover:border-white/20 transition"
      aria-label="Toggle theme"
      title="Toggle theme"
      suppressHydrationWarning
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}