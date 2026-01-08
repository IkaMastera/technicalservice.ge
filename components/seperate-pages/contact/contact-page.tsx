"use client";

import { useState } from "react";
import MapEmbed from "@/components/contact/map-embed";
import { CONTACT, CONTACT_LINKS } from "@/data/contact";
import { IconGlobe, IconMail, IconPhone, IconPin } from "@/components/icons/contact-icons";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function ContactPage() {
  const mapsUrl = CONTACT_LINKS.mapsCoords(CONTACT.address.lat, CONTACT.address.lng);

  // Simple form state (you can wire this to email later)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // TODO: connect to your API route (/api/contact) later
    // For now: simulate success
    await new Promise((r) => setTimeout(r, 450));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <main className="relative bg-bg">
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Contact</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Let’s talk about your project
        </h1>
        <div className="mt-4 h-px w-44 bg-accent/70" />
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted">
          Share location, scope, and urgency. For urgent issues, call directly.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Map */}
          <div className="lg:col-span-7">
            <MapEmbed lat={CONTACT.address.lat} lng={CONTACT.address.lng} heightClass="h-[520px]" />
            <div className="mt-3 flex justify-between text-[12px] text-muted">
              <span>{CONTACT.address.line}</span>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="hover:text-text transition">
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Right: info + form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info card */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-sm font-bold text-text">Contact Information</h2>
              <div className="mt-5 space-y-4 text-[14px]">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface2 text-accent2">
                    <IconPin className="h-5 w-5" />
                  </div>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-text hover:underline underline-offset-4">
                    {CONTACT.address.line}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface2 text-accent2">
                    <IconMail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <a href={CONTACT_LINKS.mailto(CONTACT.emailPrimary)} className="block text-text hover:underline underline-offset-4">
                      {CONTACT.emailPrimary}
                    </a>
                    <a href={CONTACT_LINKS.mailto(CONTACT.emailSecondary)} className="block text-text hover:underline underline-offset-4">
                      {CONTACT.emailSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface2 text-accent2">
                    <IconPhone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    {CONTACT.phones.map((p) => (
                      <a key={p} href={CONTACT_LINKS.tel(p)} className="block text-text hover:underline underline-offset-4">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface2 text-accent2">
                    <IconGlobe className="h-5 w-5" />
                  </div>
                  <a href={`https://${CONTACT.website}`} target="_blank" rel="noreferrer" className="text-text hover:underline underline-offset-4">
                    {CONTACT.website}
                  </a>
                </div>

                <div className="mt-4 rounded-xl border border-border bg-bg p-4 text-[13px] leading-6 text-muted">
                  {CONTACT.note}
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-sm font-bold text-text">Request a call / quote</h2>

              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-white/20"
                />
                <input
                  required
                  name="phone"
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-white/20"
                />
                <input
                  name="email"
                  placeholder="Email (optional)"
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-white/20"
                />
                <textarea
                  required
                  name="message"
                  placeholder="Project details (location, scope, urgency)"
                  rows={4}
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-white/20"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cx(
                    "w-full rounded-xl border px-4 py-2 text-sm font-semibold transition",
                    "border-border bg-surface2 text-text hover:border-white/20",
                    status === "sending" && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send request"}
                </button>

                {status === "error" && (
                  <p className="text-[12px] text-red-400">
                    Something failed. Please call or email directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}