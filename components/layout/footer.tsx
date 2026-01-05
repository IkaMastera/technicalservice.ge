"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

type FooterLink = { label: string; href: string };
type FooterContact = { label: string; value: string; href?: string; icon: React.ReactNode };

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.06 * i },
  }),
};

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const navLeft: FooterLink[] = [
    { label: "Home", href: "/en" },
    { label: "Services", href: "/en/services" },
    { label: "Portfolio", href: "/en/portfolio" },
    { label: "About", href: "/en/about" },
  ];

  const navRight: FooterLink[] = [
    { label: "Contact", href: "/en/contact" },
    // add more later if needed
  ];

  const contacts: FooterContact[] = [
    {
      label: "Address",
      value: "Zh. Shartava Str. #25, Batumi, Georgia",
      icon: <MapPin className="h-4 w-4" aria-hidden="true" />,
    },
    {
      label: "Email",
      value: "info@technicalservice.ge",
      href: "mailto:info@technicalservice.ge",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
    },
    {
      label: "Email",
      value: "t.kakhidze@technicalservice.ge",
      href: "mailto:t.kakhidze@technicalservice.ge",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
    },
    {
      label: "Phone",
      value: "+995 511 22 33 66",
      href: "tel:+995511223366",
      icon: <Phone className="h-4 w-4" aria-hidden="true" />,
    },
    {
      label: "Phone",
      value: "+995 511 22 33 55",
      href: "tel:+995511223355",
      icon: <Phone className="h-4 w-4" aria-hidden="true" />,
    },
    {
      label: "Website",
      value: "technicalservice.ge",
      href: "https://www.technicalservice.ge",
      icon: <Globe className="h-4 w-4" aria-hidden="true" />,
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0B0F14]">
      {/* Calibration divider */}
      <div
        className={cx(
          "h-px opacity-60",
          "bg-[repeating-linear-gradient(to_right,transparent_0,transparent_110px,#FFB020_110px,#FFB020_112px)]"
        )}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* ABOUT */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
          >
            <SectionLabel title="About TSC" />

            <div className="mt-5 rounded-xl border border-white/10 bg-linear-to-b from-[#121926] to-[#171F2E] p-5">
              {/* Replace with your real logo component/image if you want */}
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black/20">
                  <span className="text-sm font-semibold text-[#EAF1FF]">TSC</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#EAF1FF]">Technical Service Company</p>
                  <p className="text-xs text-[#9FB0C8]">Engineering & Technical Systems</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#9FB0C8]">
                Engineering-grade integration for critical building systems:
                <span className="text-[#EAF1FF]"> Fire</span>,{" "}
                <span className="text-[#EAF1FF]">Electrical</span>,{" "}
                <span className="text-[#EAF1FF]">HVAC</span>,{" "}
                <span className="text-[#EAF1FF]">CCTV</span>,{" "}
                <span className="text-[#EAF1FF]">Automation</span>.
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs tracking-wide text-[#9FB0C8]">EST. 2020</span>
                <span className="text-xs text-[#9FB0C8]">Inspection-ready documentation</span>
              </div>
            </div>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
          >
            <SectionLabel title="Navigation" />

            <div className="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-1">
              <nav className="space-y-3">
                {navLeft.map((l) => (
                  <FooterNavLink key={l.href} {...l} />
                ))}
              </nav>

              <nav className="space-y-3">
                {navRight.map((l) => (
                  <FooterNavLink key={l.href} {...l} />
                ))}
              </nav>
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
          >
            <SectionLabel title="Contact information" />

            <ul className="mt-5 space-y-3">
              {contacts.map((c, idx) => (
                <li key={`${c.value}-${idx}`}>
                  <ContactRow {...c} />
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-[#9FB0C8]">
                Response time depends on ongoing site work. For urgent issues, call directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom legal plate */}
      <div className="border-t border-white/10 bg-[#121926]">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#9FB0C8]">© {year} Technical Service Company</p>

            <p className="text-xs tracking-[0.18em] text-[#9FB0C8]">ENGINEERING SYSTEMS</p>

            <div className="flex items-center gap-3">
              <SocialIcon
                label="Facebook"
                href="#"
                icon={<Facebook className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialIcon
                label="Twitter"
                href="#"
                icon={<Twitter className="h-4 w-4" aria-hidden="true" />}
              />
              <SocialIcon
                label="Instagram"
                href="#"
                icon={<Instagram className="h-4 w-4" aria-hidden="true" />}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-4 w-1 rounded-full bg-[#FFB020]" aria-hidden="true" />
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#EAF1FF]">
        {title}
      </h3>
    </div>
  );
}

function FooterNavLink({ label, href }: FooterLink) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-[#9FB0C8] transition-colors hover:text-[#EAF1FF]"
    >
      <span className="text-[#2F6BFF]/80">—</span>
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#FFB020] transition-all duration-150 group-hover:w-full" />
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true" />
    </Link>
  );
}

function ContactRow({ label, value, href, icon }: FooterContact) {
  const content = (
    <div className="group flex items-start gap-3">
      <span className="mt-0.5 text-[#2F6BFF] transition-colors group-hover:text-[#FFB020]">
        {icon}
      </span>
      <div className="min-w-0">
        <span className="sr-only">{label}</span>
        <p className="wrap-break-word text-sm text-[#EAF1FF]">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className="block rounded-lg border border-transparent p-2 -ml-2 transition-colors hover:border-white/10 hover:bg-white/2"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

function SocialIcon({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/10 text-[#9FB0C8] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/3 hover:text-[#FFB020] active:translate-y-0 active:scale-[0.98]"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {icon}
    </a>
  );
}