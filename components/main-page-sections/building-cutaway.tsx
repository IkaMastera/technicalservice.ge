"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import type { SystemLayer } from "@/data/services";

type Props = {
  /** Which layers should be highlighted right now. Empty array = "structure only" idle state. */
  activeLayers: SystemLayer[];
  className?: string;
};

/* ─────────────────────────────────────────────────────────
   BuildingCutaway — single SVG, every MEP layer drawn but
   conditionally visible. When a layer is "active" it
   becomes vivid + animated; when inactive it's faded to
   structure-only opacity (or hidden entirely).
   ───────────────────────────────────────────────────────── */
export default function BuildingCutaway({ activeLayers, className }: Props) {
  const reduce = useReducedMotion();

  // Set-based lookup for layer activation
  const active = useMemo(() => new Set<SystemLayer>(activeLayers), [activeLayers]);

  // BMS overlay activates ALL systems at once (it's the supervisory layer)
  const bmsMode = active.has("bms-overlay");
  const isActive = (l: SystemLayer) => bmsMode || active.has(l);

  // Idle state = no service selected. Show structure at full strength.
  const idle = activeLayers.length === 0;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Soft glow filter for active elements */}
          <filter id="bc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for hot signals (fire detectors, gauges) */}
          <filter id="bc-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dashed-line drawing pattern for pipes/cables (the "drawing-in" effect) */}
          <pattern id="bc-hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        {/* ════════════════════════════════════════════════
            STRUCTURE — walls, floors, roof, basement, garage
            Always visible. Brighter in idle, dimmed when a
            specific layer is active.
            ════════════════════════════════════════════════ */}
        <g
          stroke="currentColor"
          fill="none"
          className={`text-text/70 transition-opacity duration-500 ${idle ? "opacity-100" : "opacity-30"}`}
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          {/* Ground line */}
          <line x1="40" y1="540" x2="760" y2="540" strokeWidth="2" />

          {/* Main building outline — 4 stories + roof */}
          <path d="M 140 540 L 140 140 L 560 140 L 560 540" />

          {/* Roof line (flat with parapet) */}
          <path d="M 130 140 L 130 120 L 570 120 L 570 140" />

          {/* Floor separators */}
          <line x1="140" y1="440" x2="560" y2="440" />
          <line x1="140" y1="340" x2="560" y2="340" />
          <line x1="140" y1="240" x2="560" y2="240" />

          {/* Basement */}
          <path d="M 140 540 L 140 580 L 560 580 L 560 540" strokeDasharray="2 3" />

          {/* Windows — interior detail */}
          {[180, 230, 280, 330, 380, 430, 480].map((x) => (
            <g key={x}>
              {/* Floor 1 windows */}
              <rect x={x - 8} y={490} width={16} height={22} className="text-text/40" />
              {/* Floor 2 */}
              <rect x={x - 8} y={390} width={16} height={22} className="text-text/40" />
              {/* Floor 3 */}
              <rect x={x - 8} y={290} width={16} height={22} className="text-text/40" />
              {/* Floor 4 */}
              <rect x={x - 8} y={190} width={16} height={22} className="text-text/40" />
            </g>
          ))}

          {/* Entrance + garage ramp (right side) */}
          <path d="M 560 540 L 620 540 L 700 520 L 760 520" />
          <path d="M 620 540 L 620 480" />
          <path d="M 560 480 L 620 480" />

          {/* Garage opening label-ish lines */}
          <line x1="630" y1="520" x2="690" y2="520" strokeDasharray="2 2" opacity="0.5" />
        </g>

        {/* ════════════════════════════════════════════════
            LAYER 1 — GENERATOR + TRANSFORMER (right exterior)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("generator")} reduce={reduce}>
          {/* Generator unit (exterior pad, right side) */}
          <rect x="660" y="490" width="70" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="666" y="495" width="58" height="6" fill="currentColor" opacity="0.5" />
          {/* Exhaust stack */}
          <line x1="720" y1="490" x2="720" y2="465" strokeWidth="2" />
          <circle cx="720" cy="460" r="3" fill="none" strokeWidth="1.5" />
          {/* Power line to building */}
          <path d="M 660 505 L 600 505 L 600 480 L 560 480" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Transformer (basement) */}
          <rect x="200" y="550" width="50" height="22" rx="1" fill="none" strokeWidth="2" />
          <line x1="210" y1="557" x2="240" y2="557" strokeWidth="0.8" />
          <line x1="210" y1="562" x2="240" y2="562" strokeWidth="0.8" />
          <line x1="210" y1="567" x2="240" y2="567" strokeWidth="0.8" />
          {/* Label */}
          <text x="660" y="485" fontSize="9" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">GEN</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 2 — ELECTRICAL (panel + wiring)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("electrical")} reduce={reduce}>
          {/* Main panel (left interior wall, floor 1) */}
          <rect x="155" y="480" width="22" height="40" fill="none" strokeWidth="2" />
          <line x1="160" y1="490" x2="172" y2="490" strokeWidth="0.6" />
          <line x1="160" y1="494" x2="172" y2="494" strokeWidth="0.6" />
          <line x1="160" y1="498" x2="172" y2="498" strokeWidth="0.6" />
          <line x1="160" y1="502" x2="172" y2="502" strokeWidth="0.6" />
          <line x1="160" y1="506" x2="172" y2="506" strokeWidth="0.6" />
          <line x1="160" y1="510" x2="172" y2="510" strokeWidth="0.6" />
          {/* Wiring traces — vertical riser */}
          <path d="M 166 480 L 166 150" strokeWidth="1.2" strokeDasharray="4 2" />
          {/* Branch circuits per floor */}
          <path d="M 166 200 L 540 200" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
          <path d="M 166 300 L 540 300" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
          <path d="M 166 400 L 540 400" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
          <path d="M 166 500 L 540 500" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
          <text x="180" y="475" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">MDP</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 3 — HVAC (rooftop AHU + ducts + diffusers)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("hvac")} reduce={reduce}>
          {/* Rooftop AHU */}
          <rect x="280" y="85" width="120" height="35" fill="none" strokeWidth="2" />
          <line x1="290" y1="95" x2="395" y2="95" strokeWidth="0.6" opacity="0.5" />
          <line x1="290" y1="105" x2="395" y2="105" strokeWidth="0.6" opacity="0.5" />
          <line x1="290" y1="115" x2="395" y2="115" strokeWidth="0.6" opacity="0.5" />
          {/* Roof penetration to duct riser */}
          <rect x="330" y="120" width="20" height="20" fill="none" strokeWidth="1.5" />
          {/* Vertical duct riser */}
          <rect x="335" y="140" width="10" height="380" fill="none" strokeWidth="1.2" />
          {/* Horizontal ducts per floor */}
          {[230, 330, 430, 530].map((y) => (
            <g key={y}>
              <rect x={180} y={y - 6} width={155} height={6} fill="none" strokeWidth="1" opacity="0.9" />
              <rect x={345} y={y - 6} width={195} height={6} fill="none" strokeWidth="1" opacity="0.9" />
              {/* Diffusers */}
              {[200, 240, 280, 380, 430, 480, 520].map((dx) => (
                <rect key={dx} x={dx} y={y} width={8} height={3} fill="currentColor" opacity="0.6" />
              ))}
            </g>
          ))}
          <text x="285" y="80" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">AHU</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 4 — PLUMBING (vertical stacks + fixtures)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("plumbing")} reduce={reduce}>
          {/* Cold water riser */}
          <path d="M 460 540 L 460 150" strokeWidth="1.4" />
          {/* Hot water riser (parallel, slight offset) */}
          <path d="M 470 540 L 470 150" strokeWidth="1.4" strokeDasharray="6 3" />
          {/* Branch lines per floor */}
          {[200, 300, 400, 500].map((y) => (
            <g key={y}>
              <path d={`M 460 ${y} L 510 ${y}`} strokeWidth="1" />
              {/* Fixture (toilet/sink combo) */}
              <rect x={510} y={y - 4} width={10} height={8} fill="none" strokeWidth="1" />
              <circle cx={520} cy={y} r="2" fill="none" strokeWidth="0.8" />
            </g>
          ))}
          {/* Drain stack */}
          <path d="M 455 540 L 455 580" strokeWidth="1.4" strokeDasharray="3 2" />
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 5 — BOILER (basement + radiator zones)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("boiler")} reduce={reduce}>
          {/* Boiler unit (basement) */}
          <rect x="280" y="545" width="50" height="32" fill="none" strokeWidth="2" />
          <circle cx="295" cy="561" r="4" fill="none" strokeWidth="1" />
          <circle cx="315" cy="561" r="4" fill="none" strokeWidth="1" />
          {/* Flue */}
          <line x1="305" y1="545" x2="305" y2="500" strokeWidth="1.5" />
          {/* Supply riser (hot water for radiators) */}
          <path d="M 280 555 L 220 555 L 220 160" strokeWidth="1.4" />
          {/* Return */}
          <path d="M 330 555 L 380 555 L 380 160" strokeWidth="1.4" strokeDasharray="5 2" />
          {/* Radiators per floor */}
          {[210, 310, 410, 510].map((y) => (
            <g key={y}>
              <rect x={225} y={y - 8} width={28} height={12} fill="none" strokeWidth="1" />
              <line x1={228} y1={y - 6} x2={228} y2={y + 2} strokeWidth="0.6" />
              <line x1={232} y1={y - 6} x2={232} y2={y + 2} strokeWidth="0.6" />
              <line x1={236} y1={y - 6} x2={236} y2={y + 2} strokeWidth="0.6" />
              <line x1={240} y1={y - 6} x2={240} y2={y + 2} strokeWidth="0.6" />
              <line x1={244} y1={y - 6} x2={244} y2={y + 2} strokeWidth="0.6" />
              <line x1={248} y1={y - 6} x2={248} y2={y + 2} strokeWidth="0.6" />
            </g>
          ))}
          <text x="280" y="542" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">BOILER</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 6 — WATER TREATMENT (basement tank + filter)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("water-treatment")} reduce={reduce}>
          {/* Inlet tank */}
          <rect x="380" y="548" width="40" height="28" fill="none" strokeWidth="2" />
          <line x1="380" y1="556" x2="420" y2="556" strokeWidth="0.5" opacity="0.5" />
          <path d="M 384 562 Q 388 558, 392 562 T 400 562 T 408 562 T 416 562" strokeWidth="0.7" fill="none" opacity="0.7" />
          {/* Filter unit */}
          <rect x="430" y="548" width="20" height="28" fill="none" strokeWidth="2" />
          <circle cx="440" cy="562" r="6" fill="none" strokeWidth="0.8" />
          <line x1="436" y1="562" x2="444" y2="562" strokeWidth="0.6" />
          {/* Plumbing in/out */}
          <path d="M 420 562 L 430 562" strokeWidth="1.4" />
          <path d="M 450 562 L 460 562 L 460 540" strokeWidth="1.4" />
          <text x="380" y="545" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">WTR TRT</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 7 — FIRE DETECTORS + SPEAKERS
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("fire-detectors")} reduce={reduce}>
          {/* Detectors — one per floor, multiple per */}
          {[220, 320, 420, 520].map((y) =>
            [200, 280, 360, 440, 520].map((x) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="3" fill="none" strokeWidth="1.2" />
                <circle cx={x} cy={y} r="1.5" fill="currentColor" />
                {/* Pulse rings — only animate when active */}
                <circle cx={x} cy={y} r="3" fill="none" strokeWidth="1" opacity="0">
                  {!reduce && (
                    <animate
                      attributeName="r"
                      values="3;8;3"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${(x + y) % 1500}ms`}
                    />
                  )}
                  {!reduce && (
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${(x + y) % 1500}ms`}
                    />
                  )}
                </circle>
              </g>
            ))
          )}
          {/* Speaker horns at corners */}
          {[150, 550].map((x) => (
            [180, 280, 380, 480].map((y) => (
              <g key={`spk-${x}-${y}`}>
                <path d={x === 150
                  ? `M ${x + 5} ${y - 5} L ${x + 12} ${y - 8} L ${x + 12} ${y + 8} L ${x + 5} ${y + 5} Z`
                  : `M ${x - 5} ${y - 5} L ${x - 12} ${y - 8} L ${x - 12} ${y + 8} L ${x - 5} ${y + 5} Z`}
                  fill="none" strokeWidth="1.1" />
              </g>
            ))
          ))}
          {/* Panel */}
          <rect x="195" y="490" width="14" height="18" fill="none" strokeWidth="1.5" />
          <line x1="199" y1="496" x2="205" y2="496" strokeWidth="0.6" />
          <line x1="199" y1="500" x2="205" y2="500" strokeWidth="0.6" />
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 8 — KITCHEN (top floor: hood + appliances)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("kitchen")} reduce={reduce}>
          {/* Hood */}
          <path d="M 200 180 L 200 162 L 280 162 L 280 180 Z" fill="none" strokeWidth="1.5" />
          <line x1="200" y1="170" x2="280" y2="170" strokeWidth="0.5" opacity="0.5" />
          {/* Hood exhaust to roof */}
          <line x1="240" y1="162" x2="240" y2="142" strokeWidth="1.4" />
          <rect x="235" y="125" width="10" height="15" fill="none" strokeWidth="1.2" />
          {/* Range */}
          <rect x="205" y="185" width="30" height="20" fill="none" strokeWidth="1.5" />
          <circle cx="212" cy="192" r="2" fill="none" strokeWidth="0.7" />
          <circle cx="221" cy="192" r="2" fill="none" strokeWidth="0.7" />
          <circle cx="212" cy="201" r="2" fill="none" strokeWidth="0.7" />
          <circle cx="221" cy="201" r="2" fill="none" strokeWidth="0.7" />
          {/* Prep table */}
          <rect x="240" y="190" width="40" height="15" fill="none" strokeWidth="1.2" />
          <text x="200" y="158" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">KITCHEN</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 9 — TELECOM (cable trays through floors)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("telecom")} reduce={reduce}>
          {/* Cable tray riser */}
          <rect x="540" y="160" width="8" height="370" fill="none" strokeWidth="1.2" />
          {/* Multiple parallel cables inside */}
          <line x1="542" y1="160" x2="542" y2="530" strokeWidth="0.4" opacity="0.6" />
          <line x1="544" y1="160" x2="544" y2="530" strokeWidth="0.4" opacity="0.6" />
          <line x1="546" y1="160" x2="546" y2="530" strokeWidth="0.4" opacity="0.6" />
          {/* IDF cabinet per floor */}
          {[210, 310, 410, 510].map((y) => (
            <g key={y}>
              <rect x={510} y={y - 12} width={22} height={20} fill="none" strokeWidth="1.4" />
              <line x1={514} y1={y - 8} x2={528} y2={y - 8} strokeWidth="0.5" />
              <line x1={514} y1={y - 4} x2={528} y2={y - 4} strokeWidth="0.5" />
              <line x1={514} y1={y} x2={528} y2={y} strokeWidth="0.5" />
              <line x1={514} y1={y + 4} x2={528} y2={y + 4} strokeWidth="0.5" />
              <path d={`M 540 ${y - 5} L 532 ${y - 5}`} strokeWidth="0.8" />
            </g>
          ))}
          {/* TV antenna on roof */}
          <line x1="500" y1="120" x2="500" y2="95" strokeWidth="1.4" />
          <line x1="492" y1="100" x2="508" y2="100" strokeWidth="1" />
          <line x1="494" y1="95" x2="506" y2="95" strokeWidth="1" />
          <line x1="496" y1="90" x2="504" y2="90" strokeWidth="1" />
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 10 — CCTV (facade cameras + NVR)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("cctv")} reduce={reduce}>
          {/* Facade cameras with FOV cones */}
          {[
            { x: 145, y: 175, dir: 1 },
            { x: 555, y: 175, dir: -1 },
            { x: 145, y: 375, dir: 1 },
            { x: 555, y: 375, dir: -1 },
            { x: 350, y: 540, dir: 0 },
            { x: 615, y: 525, dir: -1 },
          ].map((cam, i) => (
            <g key={i}>
              {/* Camera body */}
              <rect x={cam.x - 4} y={cam.y - 3} width={8} height={6} fill="currentColor" />
              <circle cx={cam.x + (cam.dir * 3)} cy={cam.y} r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-bg" />
              {/* FOV cone */}
              {cam.dir !== 0 && (
                <path
                  d={`M ${cam.x + cam.dir * 4} ${cam.y - 2}
                      L ${cam.x + cam.dir * 32} ${cam.y - 16}
                      L ${cam.x + cam.dir * 32} ${cam.y + 16}
                      L ${cam.x + cam.dir * 4} ${cam.y + 2} Z`}
                  fill="currentColor"
                  opacity="0.12"
                />
              )}
              {cam.dir === 0 && (
                <path
                  d={`M ${cam.x - 2} ${cam.y + 4}
                      L ${cam.x - 18} ${cam.y + 32}
                      L ${cam.x + 18} ${cam.y + 32}
                      L ${cam.x + 2} ${cam.y + 4} Z`}
                  fill="currentColor"
                  opacity="0.12"
                />
              )}
            </g>
          ))}
          {/* NVR rack (basement) */}
          <rect x="490" y="548" width="18" height="28" fill="none" strokeWidth="1.5" />
          <line x1="493" y1="554" x2="505" y2="554" strokeWidth="0.5" />
          <line x1="493" y1="560" x2="505" y2="560" strokeWidth="0.5" />
          <line x1="493" y1="566" x2="505" y2="566" strokeWidth="0.5" />
          <line x1="493" y1="572" x2="505" y2="572" strokeWidth="0.5" />
          <text x="490" y="545" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">NVR</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            LAYER 11 — PARKING GATE (garage entrance)
            ════════════════════════════════════════════════ */}
        <SystemGroup active={isActive("parking-gate")} reduce={reduce}>
          {/* Gate housing */}
          <rect x="650" y="500" width="8" height="20" fill="none" strokeWidth="1.5" />
          {/* Arm (raised at 30deg) */}
          <line x1="654" y1="500" x2="710" y2="475" strokeWidth="2" />
          {/* Counterweight */}
          <rect x="648" y="495" width="4" height="8" fill="currentColor" opacity="0.7" />
          {/* Loop detector marks on ground */}
          <rect x="665" y="535" width="35" height="4" fill="none" strokeWidth="0.8" strokeDasharray="2 2" />
          {/* LPR camera pole */}
          <line x1="640" y1="500" x2="640" y2="465" strokeWidth="1.4" />
          <rect x="634" y="460" width="12" height="6" fill="currentColor" />
          <text x="668" y="495" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.7">LPR</text>
        </SystemGroup>

        {/* ════════════════════════════════════════════════
            DIMENSION LINES & TICK MARKS (engineering feel)
            Always visible at low opacity
            ════════════════════════════════════════════════ */}
        <g stroke="currentColor" strokeWidth="0.6" className="text-text/25" fill="none">
          {/* Top horizontal dimension */}
          <line x1="140" y1="100" x2="560" y2="100" />
          <line x1="140" y1="95" x2="140" y2="105" />
          <line x1="560" y1="95" x2="560" y2="105" />
          {/* Left vertical dimension */}
          <line x1="110" y1="140" x2="110" y2="540" />
          <line x1="105" y1="140" x2="115" y2="140" />
          <line x1="105" y1="540" x2="115" y2="540" />
          {/* Corner crosshairs */}
          <line x1="40" y1="40" x2="55" y2="40" />
          <line x1="40" y1="40" x2="40" y2="55" />
          <line x1="760" y1="40" x2="745" y2="40" />
          <line x1="760" y1="40" x2="760" y2="55" />
          <line x1="40" y1="560" x2="55" y2="560" />
          <line x1="40" y1="560" x2="40" y2="545" />
          <line x1="760" y1="560" x2="745" y2="560" />
          <line x1="760" y1="560" x2="760" y2="545" />
        </g>

        {/* Bottom-left spec label */}
        <text x="48" y="585" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" className="text-text/40">
          TSC — MEP CUTAWAY · REV.04
        </text>
        <text x="700" y="585" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" className="text-text/40">
          SCALE 1:50
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SystemGroup — wraps each layer's elements with the
   activation logic (opacity + glow + color shift).
   Single source of truth for layer-activation visuals.
   ───────────────────────────────────────────────────────── */
function SystemGroup({
  active,
  reduce,
  children,
}: {
  active: boolean;
  reduce: boolean | null;
  children: React.ReactNode;
}) {
  return (
    <g
      className={`transition-all duration-500 ${active ? "text-accent" : "text-text/15"}`}
      style={{
        filter: active && !reduce ? "url(#bc-glow)" : undefined,
        opacity: active ? 1 : 0,
      }}
      fill="none"
      stroke="currentColor"
    >
      {children}
    </g>
  );
}