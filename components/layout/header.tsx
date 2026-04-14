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
  { label: "Home",      href: "" },
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
  { label: "Divisions", href: "/divisions" },
] as const;
 
function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}
 
function getLocalePrefix(pathname: string | null) {
  if (!pathname) return "/en";
  return pathname.startsWith("/ka") ? "/ka" : "/en";
}
 
function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/en" || href === "/ka") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}
 
function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cx(
        "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl",
        "border border-border bg-surface text-text",
        "hover:border-accent/30 active:scale-[0.98] transition"
      )}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="relative block h-4 w-5" aria-hidden="true">
        <span className={cx("absolute left-0 top-0 h-0.5 w-full rounded-full bg-current","transition-transform duration-200 ease-out", open && "translate-y-1.75 rotate-45")} />
        <span className={cx("absolute left-0 top-1.75 h-0.5 w-full rounded-full bg-current","transition-opacity duration-150 ease-out", open && "opacity-0")} />
        <span className={cx("absolute left-0 top-3.5 h-0.5 w-full rounded-full bg-current","transition-transform duration-200 ease-out", open && "-translate-y-1.75 -rotate-45")} />
      </span>
    </button>
  );
}
 
export default function Header() {
  const pathname = usePathname();
  const locale   = getLocalePrefix(pathname);
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

 
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled((prev) => { const next = y > 24; return prev === next ? prev : next; });
  });
 
  const closeMenu  = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);
 
  const prevPathRef = useRef<string | null>(null);
  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;
    if (!open || prev === null || prev === pathname) return;
    const id = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname, open]);
 
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);
 
  return (
    /*
      ── fixed instead of sticky ──
      sticky can disappear when a parent has overflow:hidden or a transform.
      fixed top-0 guarantees the header is ALWAYS on screen no matter what.
      The main content needs padding-top to account for the header height.
    */
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={cx("transition-all duration-300 ease-out", scrolled ? "px-4 pt-2 md:px-8" : "px-0 pt-0")}>
        <motion.div
          className={cx(
            "relative flex items-center justify-between",
            "border border-border bg-header/85 backdrop-blur-xl",
            "transition-all duration-300",
            scrolled
              ? "rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,122,53,0.08)]"
              : "rounded-none px-4 py-3 md:px-6 shadow-none border-x-0 border-t-0"
          )}
        >
          <div className={cx("pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300", scrolled ? "opacity-100" : "opacity-0")} aria-hidden="true"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,122,53,0.07) 0%, transparent 70%)" }}
          />
 
          {/* Brand */}
          <Link href={locale} className="group relative flex items-center gap-2.5 z-10" aria-label="Go to home">
            <span className={cx("grid h-9 w-9 place-items-center rounded-xl","border border-border bg-surface","transition-all duration-200","group-hover:border-accent/40 group-hover:bg-accent/10")}>
              <TscLogo className="h-6 w-auto text-accent" />
            </span>
            <div className="hidden sm:block leading-tight">
              <div className="text-[13px] font-semibold tracking-tight text-text">Technical Service</div>
              <div className="text-[10px] font-medium tracking-widest uppercase text-accent opacity-80">Company</div>
            </div>
          </Link>
 
          {/* Desktop nav */}
          <LayoutGroup id="header-nav">
            <nav className="hidden items-center gap-0.5 md:flex z-10" aria-label="Primary navigation">
              {NAV.map((item) => {
                const href   = `${locale}${item.href}`;
                const active = isActive(pathname, href);
                return (
                  <Link key={href} href={href}
                    className={cx("relative rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-150", active ? "text-text bg-surface" : "text-muted hover:text-text hover:bg-surface/60")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-3 right-3 top-[calc(100%+5px)] h-0.5 rounded-full bg-accent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 700, damping: 45 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

          {/* Actions */}
          <div className="flex items-center gap-2 z-10">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href={`${locale}/contact`} className={cx("hidden md:inline-flex items-center gap-1.5","rounded-xl px-4 py-2 text-[13px] font-bold","bg-accent text-white","transition-all duration-150","hover:bg-accent2 hover:-translate-y-px","active:scale-[0.98]","shadow-[0_4px_14px_rgba(255,122,53,0.35)]")}>
              Contact Us
            </Link>
            <BurgerButton open={open} onClick={toggleMenu} />
          </div>
        </motion.div>
      </div>
 
      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button type="button" className="fixed inset-0 top-16 z-40 md:hidden cursor-default" aria-label="Close menu overlay" onClick={closeMenu}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div className="fixed left-0 right-0 top-16 z-50 md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className={cx("mx-3 mt-2 rounded-2xl overflow-hidden","border border-border bg-surface","shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,122,53,0.08)]")}>
                <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,122,53,0.5), transparent)" }} />
                <nav className="flex flex-col p-2" aria-label="Mobile navigation">
                  {NAV.map((item) => {
                    const href   = `${locale}${item.href}`;
                    const active = isActive(pathname, href);
                    return (
                      <Link key={href} href={href} onClick={closeMenu}
                        className={cx("flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-150", active ? "bg-accent/10 text-text" : "text-muted hover:bg-surface2 hover:text-text")}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="font-medium">{item.label}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                      </Link>
                    );
                  })}
                </nav>
                <div className="px-3 pb-3">
                  <Link href={`${locale}/contact`} onClick={closeMenu}
                    className={cx("flex w-full items-center justify-center rounded-xl py-3","bg-accent text-white text-sm font-bold","shadow-[0_4px_14px_rgba(255,122,53,0.3)]","hover:bg-accent2 transition-colors")}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}