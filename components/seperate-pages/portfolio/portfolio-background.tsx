"use client";

import { useReducedMotion } from "framer-motion";

export function PortfolioBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_18%_10%,rgba(70, 130, 180,0.08),transparent_60%),radial-gradient(980px_720px_at_86%_18%,rgba(47,107,255,0.10),transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10),transparent_28%,rgba(0,0,0,0.28))]" />

      {/* BIG grid (very visible) */}
      <div
        className={[
          "absolute -inset-24",
          "opacity-[0.26]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)]",
          "[background-size:56px_56px]",
          "[mask-image:radial-gradient(920px_620px_at_50%_26%,black,transparent_88%)]",
          reduce ? "" : "animate-[gridPan_12s_linear_infinite]",
        ].join(" ")}
      />

      {/* MICRO grid */}
      <div
        className={[
          "absolute -inset-24",
          "opacity-[0.18]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)]",
          "[background-size:14px_14px]",
          "[mask-image:radial-gradient(920px_620px_at_50%_26%,black,transparent_88%)]",
          reduce ? "" : "animate-[gridPan_18s_linear_infinite_reverse]",
        ].join(" ")}
      />

      {/* Static haze (no moving rectangle) */}
      <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(740px_440px_at_50%_34%,rgba(255,255,255,0.08),transparent_72%)]" />

      <style jsx global>{`
        @keyframes gridPan {
          0% {
            transform: translate3d(0px, 0px, 0);
          }
          100% {
            transform: translate3d(56px, 0px, 0);
          }
        }
      `}</style>
    </div>
  );
}