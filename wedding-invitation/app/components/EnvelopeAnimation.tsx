"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EnvelopeAnimationProps {
  onOpen: () => void;
}

export default function EnvelopeAnimation({ onOpen }: EnvelopeAnimationProps) {
  const [phase, setPhase] = useState<"idle" | "lifting" | "opening" | "sliding" | "done">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("lifting");
    setTimeout(() => setPhase("opening"), 400);
    setTimeout(() => setPhase("sliding"), 900);
    setTimeout(() => setPhase("done"), 1600);
    setTimeout(() => onOpen(), 1800);
  };

  const envelopeY = phase === "idle" ? 0 : phase === "lifting" ? -20 : -26;
  const flapOpen = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding" || phase === "done";

  // Flap path: closed = triangle pointing down, open = flat line at top
  const flapClosed = "M 0 0 L 340 0 L 170 130 Z";
  const flapFlat   = "M 0 0 L 340 0 L 170 0 Z";

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      aria-label="Բացել հրավերը"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); }
      }}
    >
      {/* Hint text */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute text-center uppercase"
            style={{
              top: -52,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.68rem",
              color: "#A07830",
              letterSpacing: "0.22em",
              animation: "hintPulse 3s ease-in-out infinite",
            }}
          >
            Հպվեք ծրարը բացելու համար
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope wrapper */}
      <motion.div
        animate={{ y: envelopeY }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
        style={{ width: 340, height: 240 }}
      >
        {/* Card that slides out */}
        <AnimatePresence>
          {cardVisible && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -110, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 z-20 pointer-events-none"
              style={{ width: 280, bottom: 0, transform: "translateX(-50%)" }}
            >
              <div style={{
                background: "linear-gradient(160deg, #FFFFFF 0%, #FAF8F5 60%, #F5EED8 100%)",
                border: "1px solid rgba(201,168,76,0.4)",
                borderRadius: 12,
                boxShadow: "0 12px 40px rgba(120,88,30,0.18), inset 0 1px 0 rgba(255,255,255,1)",
                padding: "20px 24px 18px",
                textAlign: "center",
              }}>
                <div style={{ color: "#C9A84C", fontSize: "9.5px", letterSpacing: "0.38em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 9 }}>
                  Հարսանյաց Հրավեր
                </div>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "21px", color: "#3D3530", lineHeight: 1.3 }}>
                  Անի{" "}
                  <motion.span style={{ color: "#C9A84C" }} animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="inline-block">♥</motion.span>
                  {" "}Արման
                </div>
                <div style={{ color: "#9A7240", fontSize: "11.5px", marginTop: 8, fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.1em" }}>
                  20 Սեպտեմբերի 2026
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main envelope SVG ── */}
        <svg
          viewBox="0 0 340 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 18px 44px rgba(100,75,20,0.22))",
            overflow: "visible",
          }}
        >
          <defs>
            {/* Milky white envelope body */}
            <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="55%"  stopColor="#FAF8F4" />
              <stop offset="100%" stopColor="#F2EAD8" />
            </linearGradient>

            {/* Flap — slightly warmer than body so it reads as a fold */}
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#F8F4EC" />
              <stop offset="100%" stopColor="#EBD898" stopOpacity="0.6" />
            </linearGradient>

            {/* Inner fold triangles */}
            <linearGradient id="foldL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#DDD0A8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#EDE5C8" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="foldR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#EDE5C8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#DDD0A8" stopOpacity="0.45" />
            </linearGradient>

            {/* Gold border */}
            <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#D4B060" />
              <stop offset="50%"  stopColor="#EDD898" />
              <stop offset="100%" stopColor="#B8902A" />
            </linearGradient>

            {/* Wax seal */}
            <radialGradient id="waxBody" cx="38%" cy="30%" r="72%">
              <stop offset="0%"   stopColor="#C04040" />
              <stop offset="45%"  stopColor="#982020" />
              <stop offset="78%"  stopColor="#7A1818" />
              <stop offset="100%" stopColor="#521010" />
            </radialGradient>
            <radialGradient id="waxSheen" cx="35%" cy="26%" r="42%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="waxDrop" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3a0f0f" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* ── Body ── */}
          <rect x="1" y="1" width="338" height="238" rx="10" fill="url(#envBody)" stroke="url(#goldBorder)" strokeWidth="1.2" />

          {/* Subtle inner envelope rectangle */}
          <rect x="5" y="5" width="330" height="230" rx="8" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.8" />

          {/* ── Inner fold triangles (bottom half) ── */}
          <path d="M1 10 L170 138 L1 238"   fill="url(#foldL)" />
          <path d="M339 10 L170 138 L339 238" fill="url(#foldR)" />
          {/* fold crease lines */}
          <line x1="1"   y1="238" x2="170" y2="138" stroke="rgba(180,150,70,0.18)" strokeWidth="0.7" />
          <line x1="339" y1="238" x2="170" y2="138" stroke="rgba(180,150,70,0.18)" strokeWidth="0.7" />

          {/* ── Botanical corner ornaments ── */}
          <g stroke="#C9AB6A" strokeWidth="0.6" fill="none" opacity="0.4">
            {/* top-left */}
            <path d="M14 22 Q22 12 34 20 Q37 27 28 30 Q16 32 14 22Z" />
            <path d="M12 20 Q7 14 4 6" />
            {/* top-right */}
            <path d="M326 22 Q318 12 306 20 Q303 27 312 30 Q324 32 326 22Z" />
            <path d="M328 20 Q333 14 336 6" />
            {/* bottom-left */}
            <path d="M14 218 Q22 228 34 221 Q37 214 28 210 Q16 208 14 218Z" />
            <path d="M12 220 Q7 226 4 234" />
            {/* bottom-right */}
            <path d="M326 218 Q318 228 306 221 Q303 214 312 210 Q324 208 326 218Z" />
            <path d="M328 220 Q333 226 336 234" />
          </g>

          {/* ── Wax seal (hidden while flap is open) ── */}
          {!flapOpen && (
            <g transform="translate(118, 90)">
              <path
                filter="url(#waxDrop)"
                fill="url(#waxBody)"
                d="M52 4c5 0 9 5 14 6s11-3 15 1s0 11 3 14s8 8 6 13s-8 6-10 10s1 12-4 14s-11-2-15 0s-7 9-12 9s-8-7-12-9s-11 2-15 0s-1-10-4-14s-10-5-10-10s6-9 6-13s-3-10 0-14s11-2 15-1s9-6 14-6z"
              />
              <ellipse cx="37" cy="29" rx="24" ry="16" fill="url(#waxSheen)" />
              <circle cx="52" cy="52" r="36" fill="none" stroke="#3a0f0f" strokeWidth="0.9" opacity="0.45" />
              <circle cx="52" cy="52" r="31" fill="none" stroke="#d09060" strokeWidth="0.6" opacity="0.3" />
              {/* Rose emblem shadow */}
              <g fill="none" stroke="#3a0f0f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" transform="translate(1.5 1.5)">
                <path d="M52 30c-11 2-13 14-6 19c-9 2-13 11-6 18c3 3 7 4 10 1c1 7 7 10 12 7c5 8 14 7 15-2" />
                <path d="M52 30c3-4 11-4 12 0c2 4 0 8-4 9" />
                <path d="M40 43c-4 2-6 8-2 11" />
                <path d="M52 30v38" />
                <path d="M43 62c3-3 7-3 9-1c2-3 6-3 9 1" />
              </g>
              {/* Rose emblem highlight */}
              <g fill="none" stroke="#E8B88A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
                <path d="M52 30c-11 2-13 14-6 19c-9 2-13 11-6 18c3 3 7 4 10 1c1 7 7 10 12 7c5 8 14 7 15-2" />
                <path d="M52 30c3-4 11-4 12 0c2 4 0 8-4 9" />
                <path d="M40 43c-4 2-6 8-2 11" />
                <path d="M52 30v38" />
                <path d="M43 62c3-3 7-3 9-1c2-3 6-3 9 1" />
              </g>
            </g>
          )}

          {/* ── Animated flap (SVG motion.path — stays in the same SVG so z-index is correct) ── */}
          <motion.path
            d={flapOpen ? flapFlat : flapClosed}
            fill="url(#flapGrad)"
            stroke="url(#goldBorder)"
            strokeWidth="1.1"
            animate={{ d: flapOpen ? flapFlat : flapClosed }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "170px 0px" }}
          />

          {/* thin top edge line so body rect border shows through flap seam */}
          <line x1="1" y1="1" x2="339" y2="1" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8" />
        </svg>

        {/* Idle pulse ring */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ borderRadius: 10 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(201,168,76,0.4)", "0 0 0 18px rgba(201,168,76,0)"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes hintPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
