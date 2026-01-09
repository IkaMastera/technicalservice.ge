"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import TscLogo from "../brand/tsc-logo";
import ThemeToggle from "@/components/ui/theme-toggle";
import LanguageSwitcher from "@/components/ui/language-switcher";

const NAV = [
  { label: "Home", href: "" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Divisions", href: "/divisions" },
] as const;

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function getLocalePrefix(pathname: string | null) {
  if (!pathname) return "/en";
  return pathname.startsWith("/ka") ? "/ka" : "/en";
}

// ✅ ONLY change: special-case Home so it doesn't match every /en/* or /ka/*
function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;

  // Home should only be active on exact locale root
  if (href === "/en" || href === "/ka") return pathname === href;

  return pathname === href || pathname.startsWith(href + "/");
}

function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cx(
        "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-white/10 bg-surface text-text",
        "hover:bg-white/4 active:scale-[0.98] transition"
      )}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>

      <span className="relative block h-4 w-5" aria-hidden="true">
        <span
          className={cx(
            "absolute left-0 top-0 h-0.5 w-full rounded-full bg-current",
            "transition-transform duration-200 ease-out",
            open && "translate-y-1.75 rotate-45"
          )}
        />
        <span
          className={cx(
            "absolute left-0 top-1.75 h-0.5 w-full rounded-full bg-current",
            "transition-opacity duration-150 ease-out",
            open && "opacity-0"
          )}
        />
        <span
          className={cx(
            "absolute left-0 top-3.5 h-0.5 w-full rounded-full bg-current",
            "transition-transform duration-200 ease-out",
            open && "-translate-y-1.75 -rotate-45"
          )}
        />
      </span>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const locale = getLocalePrefix(pathname);

  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 10;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    if (!open) return;
    if (prev === null) return;
    if (prev === pathname) return;

    const id = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname, open]);

  // ✅ Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cx(
          "relative border-b border-white/10",
          "bg-header/75 backdrop-blur-md",
          scrolled && "shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        )}
      >
        {/* subtle blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Brand */}
          <Link href={locale} className="flex items-center gap-3" aria-label="Go to home">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-surface">
              <TscLogo className="h-7 w-auto text-accent" />
            </span>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-text">Technical Service Company</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <LayoutGroup id="header-nav">
            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
              {NAV.map((item) => {
                const href = `${locale}${item.href}`;
                const active = isActive(pathname, href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cx(
                      "relative rounded-lg px-3 py-2 text-sm transition",
                      "text-muted hover:text-text hover:bg-white/4",
                      active && "text-text"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}

                    {/* Shared underline that slides between items */}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 top-[calc(100%+6px)] h-0.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 700, damping: 45 }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <BurgerButton open={open} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed left-0 right-0 top-17 z-70 md:hidden"
              aria-label="Close menu overlay"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed left-0 right-0 top-17 z-50 md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
            >
              <div className="mx-4 rounded-2xl border border-white/10 bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <nav className="flex flex-col p-2" aria-label="Mobile navigation">
                  {NAV.map((item) => {
                    const href = `${locale}${item.href}`;
                    const active = isActive(pathname, href);

                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeMenu}
                        className={cx(
                          "flex items-center justify-between rounded-xl px-3 py-3 text-sm transition",
                          active ? "bg-white/6 text-text" : "text-muted hover:bg-white/4 hover:text-text"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <span>{item.label}</span>
                        {active && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}