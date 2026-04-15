"use client";

import { useMemo } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* bubble outline */}
      <path
        d="M12 2.25c-5.376 0-9.75 4.215-9.75 9.402 0 1.78.52 3.43 1.42 4.84L2.25 21.75l5.45-1.36c1.39.75 2.99 1.18 4.3 1.18 5.376 0 9.75-4.215 9.75-9.402S17.376 2.25 12 2.25Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* phone glyph */}
      <path
        d="M9.2 7.95c-.17-.4-.35-.42-.52-.42h-.44c-.16 0-.42.06-.64.31-.22.25-.86.84-.86 2.06s.89 2.4 1.02 2.56c.12.17 1.74 2.69 4.28 3.67.59.23 1.06.37 1.42.47.6.18 1.15.16 1.58.1.49-.07 1.6-.64 1.83-1.27.22-.63.22-1.16.16-1.27-.06-.1-.23-.16-.48-.29l-1.68-.82c-.23-.12-.4-.17-.57.1-.17.27-.65.82-.8.99-.15.17-.3.2-.55.08-.25-.12-1.05-.4-2.01-1.27-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.1-.51.11-.12.25-.3.38-.45.13-.16.17-.27.25-.45.08-.18.04-.34-.02-.47l-.73-1.82Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function WhatsAppFab({
  phoneE164 = "+995511223366",
  message = "Hello TSC — I’d like a quote. Please contact me.",
  className,
}: {
  phoneE164?: string;
  message?: string;
  className?: string;
}) {
  const digits = useMemo(() => phoneE164.replace(/[^\d]/g, ""), [phoneE164]);

  const href = useMemo(() => {
    const text = encodeURIComponent(message);
    return `https://wa.me/${digits}?text=${text}`;
  }, [digits, message]);

  return (
    <>
      <style>{`
        @keyframes tsc-fab-pulse {
          0% { transform: translateZ(0) scale(1); box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent) 22%, transparent); }
          70% { transform: translateZ(0) scale(1.01); box-shadow: 0 0 0 14px transparent; }
          100% { transform: translateZ(0) scale(1); box-shadow: 0 0 0 0 transparent; }
        }
        @keyframes tsc-fab-vibe {
          0%, 100% { transform: translateZ(0) translateX(0); }
          20% { transform: translateZ(0) translateX(-1px); }
          40% { transform: translateZ(0) translateX(1px); }
          60% { transform: translateZ(0) translateX(-1px); }
          80% { transform: translateZ(0) translateX(1px); }
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with TSC on WhatsApp"
        className={cx(
          "fixed z-[60] right-4 bottom-4 md:right-6 md:bottom-6",
          "group grid h-14 w-14 place-items-center rounded-2xl",
          "bg-surface border border-border",
          "shadow-[0_14px_40px_rgba(0,0,0,0.45)]",
          "transition-transform duration-200 will-change-transform",
          "motion-safe:[animation:tsc-fab-pulse_2.6s_ease-out_infinite]",
          "hover:-translate-y-0.5",
          className
        )}
      >
        {/* inner plate */}
        <span
          className={cx(
            "grid place-items-center h-11 w-11 rounded-xl",
            "bg-bg border border-white/10",
            "transition",
            "group-hover:border-white/15"
          )}
        >
          <WhatsAppIcon
            className={cx(
              "h-6 w-6",
              "text-muted group-hover:text-accent transition-colors duration-200",
              "motion-safe:group-hover:[animation:tsc-fab-vibe_0.28s_linear_infinite]"
            )}
          />
        </span>

        <span
          aria-hidden="true"
          className={cx(
            "absolute -top-1 -right-1 h-3 w-3 rounded-full",
            "bg-accent",
            "ring-2 ring-bg"
          )}
        />

        {/* tooltip */}
        <span
          className={cx(
            "pointer-events-none absolute right-full mr-3",
            "rounded-lg border border-border bg-surface px-3 py-2",
            "text-[12px] text-text shadow-[0_16px_50px_rgba(0,0,0,0.55)]",
            "opacity-0 translate-x-1 transition",
            "group-hover:opacity-100 group-hover:translate-x-0"
          )}
        >
          WhatsApp TSC
          <span className="block text-[11px] text-muted mt-0.5">{phoneE164}</span>
        </span>
      </a>
    </>
  );
}