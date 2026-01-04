"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ButtonPrimary } from "../ui/button-primary";
import TscLogo from "../brand/tsc-logo";

const NAV = [
  { label: "Home", href: "/en" },
  { label: "Services", href: "/en/services" },
  { label: "Portfolio", href: "/en/portfolio" },
  { label: "About", href: "/en/about" },
  { label: "Contact", href: "/en/contact" },
] as const;

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/en") return pathname === "/en";
  return pathname.startsWith(href);
}

function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cx(
        "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-white/10 bg-[#121926] text-[#EAF1FF]",
        "hover:bg-white/[0.04] active:scale-[0.98] transition"
      )}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>

      <span className="relative block h-4 w-5" aria-hidden="true">
        {/* top */}
        <span
          className={cx(
            "absolute left-0 top-0 h-[2px] w-full rounded-full bg-current",
            "transition-transform duration-200 ease-out",
            open && "translate-y-[7px] rotate-45"
          )}
        />
        {/* middle */}
        <span
          className={cx(
            "absolute left-0 top-[7px] h-[2px] w-full rounded-full bg-current",
            "transition-opacity duration-150 ease-out",
            open && "opacity-0"
          )}
        />
        {/* bottom */}
        <span
          className={cx(
            "absolute left-0 top-[14px] h-[2px] w-full rounded-full bg-current",
            "transition-transform duration-200 ease-out",
            open && "-translate-y-[7px] -rotate-45"
          )}
        />
      </span>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
      <div className="relative border-b border-white/10 bg-[#0B0F14]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* ruler ticks */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-between px-4 md:px-6 opacity-[0.35]" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={cx("block w-px bg-white/30", i % 5 === 0 ? "h-3" : "h-2")} />
          ))}
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Brand */}
          <Link href="/en" className="flex items-center gap-3" aria-label="Go to home">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-[#121926]">
              <TscLogo className="h-7 w-auto text-[#2F6BFF]" />
            </span>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-[#EAF1FF]">Technical Service Company</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "relative rounded-lg px-3 py-2 text-sm transition",
                    "text-[#9FB0C8] hover:text-[#EAF1FF] hover:bg-white/[0.04]",
                    active && "text-[#EAF1FF]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-3 right-3 top-[calc(100%+6px)] h-[2px] rounded-full bg-[#FFB020]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ButtonPrimary className="button-primary--full">
                <Link
                    href="/en/contact"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center"
                >
                    Request Quote
                </Link>
               </ButtonPrimary>
            </div>

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
              className="fixed left-0 right-0 top-[68px] z-[70] md:hidden"
              aria-label="Close menu overlay"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed left-0 right-0 top-[68px] z-50 md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
            >
              <div className="mx-4 rounded-2xl border border-white/10 bg-[#121926] shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <nav className="flex flex-col p-2" aria-label="Mobile navigation">
                  {NAV.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={cx(
                          "flex items-center justify-between rounded-xl px-3 py-3 text-sm transition",
                          active
                            ? "bg-white/[0.06] text-[#EAF1FF]"
                            : "text-[#9FB0C8] hover:bg-white/[0.04] hover:text-[#EAF1FF]"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <span>{item.label}</span>
                        {active && <span className="h-2 w-2 rounded-full bg-[#FFB020]" aria-hidden="true" />}
                      </Link>
                    );
                  })}

                  <div className="mt-2 border-t border-white/10 pt-2">
                    <ButtonPrimary>
                      <Link href="/en/contact" onClick={() => setOpen(false)} className="block">
                        Request Quote
                      </Link>
                    </ButtonPrimary>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}