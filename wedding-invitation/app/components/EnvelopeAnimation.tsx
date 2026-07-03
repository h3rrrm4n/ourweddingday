"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EnvelopeAnimationProps {
  onOpen: () => void;
}

export default function EnvelopeAnimation({ onOpen }: EnvelopeAnimationProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => setPhase("done"), 1200);
    setTimeout(() => onOpen(), 1600);
  };

  const flapOpen = phase === "opening" || phase === "done";

  // W=400 H=280 envelope. Center = (200, 140).
  // Four fold triangles meeting at center.
  const W = 400;
  const H = 280;
  const cx = W / 2;   // 200
  const cy = H / 2;   // 140

  // Top flap — when open it collapses to the top edge line
  const flapClosed = `M 0 0 L ${W} 0 L ${cx} ${cy} Z`;
  const flapOpen_d  = `M 0 0 L ${W} 0 L ${cx} 0 Z`;

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Բացել հրավերը"
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: phase === "idle" ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {/* Hint text */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              position: "absolute",
              top: -48,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem",
              color: "#9A9080",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              animation: "hintPulse 3.5s ease-in-out infinite",
            }}
          >
            Հպվեք ծրարը բացելու համար
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope */}
      <motion.div
        animate={{ y: flapOpen ? -12 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", width: W, height: H }}
      >
        {/* ── Main SVG ── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            // Layered shadow for paper depth
            filter: [
              "drop-shadow(0 2px 3px rgba(60,50,30,0.10))",
              "drop-shadow(0 8px 20px rgba(60,50,30,0.14))",
              "drop-shadow(0 24px 48px rgba(60,50,30,0.12))",
            ].join(" "),
            overflow: "visible",
          }}
        >
          <defs>
            {/* Milky white body */}
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FDFBF8" />
              <stop offset="100%" stopColor="#F4EFE4" />
            </linearGradient>

            {/* Left fold — warm shadow on the left side */}
            <linearGradient id="leftFold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#C8B888" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#C8B888" stopOpacity="0.01" />
            </linearGradient>

            {/* Right fold — warm shadow on the right side */}
            <linearGradient id="rightFold" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%"   stopColor="#C8B888" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#C8B888" stopOpacity="0.01" />
            </linearGradient>

            {/* Bottom fold — deeper shadow at base */}
            <linearGradient id="bottomFold" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#B0A080" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#B0A080" stopOpacity="0.02" />
            </linearGradient>

            {/* Top flap — slightly cooler/whiter than body */}
            <linearGradient id="topFlap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0EBE0" />
            </linearGradient>

            {/* Wax seal */}
            <radialGradient id="waxRed" cx="36%" cy="28%" r="70%">
              <stop offset="0%"   stopColor="#B83030" />
              <stop offset="40%"  stopColor="#8E1A1A" />
              <stop offset="76%"  stopColor="#6A0E0E" />
              <stop offset="100%" stopColor="#480808" />
            </radialGradient>
            <radialGradient id="waxGloss" cx="34%" cy="24%" r="38%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"   />
            </radialGradient>
            <filter id="sealDrop" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#200404" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ── Body (base rectangle) ── */}
          <rect x="0" y="0" width={W} height={H} rx="2"
            fill="url(#bodyGrad)"
            stroke="rgba(180,160,110,0.30)"
            strokeWidth="1"
          />

          {/* ── Inner fold triangles ── */}
          {/* Left */}
          <path d={`M 0 0 L 0 ${H} L ${cx} ${cy} Z`} fill="url(#leftFold)" />
          {/* Right */}
          <path d={`M ${W} 0 L ${W} ${H} L ${cx} ${cy} Z`} fill="url(#rightFold)" />
          {/* Bottom */}
          <path d={`M 0 ${H} L ${W} ${H} L ${cx} ${cy} Z`} fill="url(#bottomFold)" />

          {/* ── Crease lines (all four from corners to center) ── */}
          <line x1="0"  y1="0"  x2={cx} y2={cy} stroke="rgba(160,140,90,0.22)" strokeWidth="0.8" />
          <line x1={W}  y1="0"  x2={cx} y2={cy} stroke="rgba(160,140,90,0.22)" strokeWidth="0.8" />
          <line x1="0"  y1={H}  x2={cx} y2={cy} stroke="rgba(140,120,70,0.28)" strokeWidth="0.9" />
          <line x1={W}  y1={H}  x2={cx} y2={cy} stroke="rgba(140,120,70,0.28)" strokeWidth="0.9" />

          {/* ── Wax seal — heart, hidden once open ── */}
          {!flapOpen && (
            <g transform={`translate(${cx}, ${cy})`} filter="url(#sealDrop)">
              {/* Heart path centered at 0,0 */}
              <path
                fill="url(#waxRed)"
                d="M0,-13
                   C0,-23 -13,-30 -24,-22
                   C-36,-14 -36,3 -24,17
                   C-16,27 -7,33 0,37
                   C7,33 16,27 24,17
                   C36,3 36,-14 24,-22
                   C13,-30 0,-23 0,-13 Z"
              />
              {/* Gloss */}
              <path
                fill="url(#waxGloss)"
                d="M0,-13
                   C0,-23 -13,-30 -24,-22
                   C-36,-14 -36,3 -24,17
                   C-16,27 -7,33 0,37
                   C7,33 16,27 24,17
                   C36,3 36,-14 24,-22
                   C13,-30 0,-23 0,-13 Z"
              />
              {/* Botanical engraving — shadow pass */}
              <g fill="none" stroke="#1A0404" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" transform="translate(0.8,0.8)">
                <path d="M0,16 C-4,7 -11,0 -18,-3 C-11,4 -5,11 0,16 Z" />
                <path d="M0,16 C4,7 11,0 18,-3 C11,4 5,11 0,16 Z" />
                <path d="M-18,-3 C-22,-10 -20,-19 -13,-21" />
                <path d="M18,-3 C22,-10 20,-19 13,-21" />
                <path d="M-13,-21 C-8,-26 0,-27 0,-24" />
                <path d="M13,-21 C8,-26 0,-27 0,-24" />
                <circle cx="-23" cy="-6" r="1.8" fill="#1A0404" />
                <circle cx="23"  cy="-6" r="1.8" fill="#1A0404" />
                <circle cx="0"   cy="-27" r="1.8" fill="#1A0404" />
              </g>
              {/* Botanical engraving — highlight pass */}
              <g fill="none" stroke="#F0A878" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                <path d="M0,16 C-4,7 -11,0 -18,-3 C-11,4 -5,11 0,16 Z" />
                <path d="M0,16 C4,7 11,0 18,-3 C11,4 5,11 0,16 Z" />
                <path d="M-18,-3 C-22,-10 -20,-19 -13,-21" />
                <path d="M18,-3 C22,-10 20,-19 13,-21" />
                <path d="M-13,-21 C-8,-26 0,-27 0,-24" />
                <path d="M13,-21 C8,-26 0,-27 0,-24" />
                <circle cx="-23" cy="-6" r="1.8" fill="#F0A878" />
                <circle cx="23"  cy="-6" r="1.8" fill="#F0A878" />
                <circle cx="0"   cy="-27" r="1.8" fill="#F0A878" />
              </g>
            </g>
          )}

          {/* ── Top flap (animates open) ── */}
          <motion.path
            d={flapOpen ? flapOpen_d : flapClosed}
            animate={{ d: flapOpen ? flapOpen_d : flapClosed }}
            transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
            fill="url(#topFlap)"
            stroke="rgba(160,140,90,0.22)"
            strokeWidth="0.8"
          />

          {/* Top crease line (always on top) */}
          <line x1="0" y1="0" x2={W} y2="0" stroke="rgba(200,185,145,0.3)" strokeWidth="0.8" />
        </svg>

        {/* Idle pulse ring */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              style={{ position: "absolute", inset: 0, borderRadius: 2, pointerEvents: "none", zIndex: 20 }}
              animate={{ boxShadow: ["0 0 0 0px rgba(180,160,100,0.4)", "0 0 0 16px rgba(180,160,100,0)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes hintPulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
