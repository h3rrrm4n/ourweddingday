"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EnvelopeAnimationProps {
  onOpen: () => void;
}

export default function EnvelopeAnimation({ onOpen }: EnvelopeAnimationProps) {
  const [phase, setPhase] = useState<
    "idle" | "lifting" | "opening" | "sliding" | "done"
  >("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("lifting");
    setTimeout(() => setPhase("opening"), 350);
    setTimeout(() => setPhase("sliding"), 900);
    setTimeout(() => setPhase("done"), 1700);
    setTimeout(() => onOpen(), 1900);
  };

  const flapOpen   = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible= phase === "sliding"  || phase === "done";
  const envelopeY  = phase === "idle" ? 0 : -18;

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Բացել հրավերը"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); }
      }}
    >
      {/* ── Tap hint ── */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              position: "absolute",
              top: -50,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.68rem",
              color: "#A07830",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              animation: "hintPulse 3s ease-in-out infinite",
            }}
          >
            Հպվեք ծրարը բացելու համար
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Envelope + card container ── */}
      <motion.div
        animate={{ y: envelopeY }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ position: "relative", width: 340, height: 240 }}
      >

        {/* ── Preview card (slides up out of envelope) ── */}
        <AnimatePresence>
          {cardVisible && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: -148, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 288,
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <div style={{
                background: "linear-gradient(160deg, #FFFFFF 0%, #FAF8F5 70%, #F5EDD8 100%)",
                border: "1px solid rgba(201,168,76,0.38)",
                borderRadius: 16,
                boxShadow: "0 16px 48px rgba(100,70,20,0.18), inset 0 1px 0 #fff",
                padding: "24px 22px 20px",
                textAlign: "center",
              }}>
                {/* Photo circle */}
                <div style={{
                  width: 72, height: 72,
                  borderRadius: "50%",
                  margin: "0 auto 14px",
                  background: "linear-gradient(135deg, #F5E6C8 0%, #EDD9A8 100%)",
                  border: "2px solid rgba(201,168,76,0.45)",
                  boxShadow: "0 4px 16px rgba(140,100,40,0.15), 0 0 0 5px rgba(201,168,76,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
                    <circle cx="24" cy="17" r="9" fill="rgba(201,168,76,0.35)" />
                    <path d="M6 44 Q6 32 24 32 Q42 32 42 44" fill="rgba(201,168,76,0.22)" />
                  </svg>
                </div>

                {/* Thin divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.45))" }} />
                  <svg viewBox="0 0 12 12" width="10" height="10">
                    <path d="M6 1 L7 5 L11 5 L8 7.5 L9 11 L6 9 L3 11 L4 7.5 L1 5 L5 5 Z" fill="rgba(201,168,76,0.65)" />
                  </svg>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.45))" }} />
                </div>

                {/* Names */}
                <div style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.2rem, 5vw, 1.45rem)",
                  color: "#3D3530",
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                }}>
                  Անի{" "}
                  <motion.span
                    style={{ color: "#C9A84C", display: "inline-block" }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >♥</motion.span>
                  {" "}Արման
                </div>

                {/* Date */}
                <div style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.72rem",
                  color: "#9A7240",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 10,
                }}>
                  20 Սեպտեմբերի 2026
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Envelope SVG (body + fold lines) ── */}
        <svg
          viewBox="0 0 340 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            filter: "drop-shadow(0 14px 36px rgba(90,65,15,0.20))",
            overflow: "visible",
          }}
        >
          <defs>
            {/* Linen / off-white body — matches reference exactly */}
            <linearGradient id="envBody2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#F9F4EA" />
              <stop offset="100%" stopColor="#EFE5CC" />
            </linearGradient>

            {/* Left inner fold */}
            <linearGradient id="foldL2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#C8B070" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#E8D8A8" stopOpacity="0.05" />
            </linearGradient>
            {/* Right inner fold */}
            <linearGradient id="foldR2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#E8D8A8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#C8B070" stopOpacity="0.22" />
            </linearGradient>
            {/* Bottom fold */}
            <linearGradient id="foldB2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#E8D8A8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#C8B070" stopOpacity="0.28" />
            </linearGradient>

            {/* Flap gradient */}
            <linearGradient id="flapGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#EDE3CD" />
              <stop offset="100%" stopColor="#E0D0AC" />
            </linearGradient>

            {/* Wax seal — dark crimson heart */}
            <radialGradient id="waxHeart" cx="38%" cy="30%" r="72%">
              <stop offset="0%"   stopColor="#B83030" />
              <stop offset="40%"  stopColor="#901818" />
              <stop offset="75%"  stopColor="#721010" />
              <stop offset="100%" stopColor="#4E0C0C" />
            </radialGradient>
            <radialGradient id="waxGlow" cx="35%" cy="28%" r="40%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3a0808" floodOpacity="0.38" />
            </filter>
          </defs>

          {/* Envelope body */}
          <rect x="0" y="0" width="340" height="240" rx="3"
            fill="url(#envBody2)"
            stroke="rgba(180,155,90,0.35)"
            strokeWidth="1"
          />

          {/* Inner fold triangles — left, right, bottom — like reference */}
          <path d="M0 0 L170 138 L0 240"   fill="url(#foldL2)" />
          <path d="M340 0 L170 138 L340 240" fill="url(#foldR2)" />
          <path d="M0 240 L170 138 L340 240" fill="url(#foldB2)" />

          {/* Fold crease lines (very subtle) */}
          <line x1="0"   y1="240" x2="170" y2="138" stroke="rgba(160,130,60,0.20)" strokeWidth="0.8" />
          <line x1="340" y1="240" x2="170" y2="138" stroke="rgba(160,130,60,0.20)" strokeWidth="0.8" />
          <line x1="0"   y1="0"   x2="170" y2="138" stroke="rgba(160,130,60,0.12)" strokeWidth="0.6" />
          <line x1="340" y1="0"   x2="170" y2="138" stroke="rgba(160,130,60,0.12)" strokeWidth="0.6" />

          {/* ── Heart wax seal (hidden when flap is open) ── */}
          {!flapOpen && (
            <g transform="translate(170,138)" filter="url(#sealShadow)">
              {/* Heart shape, centered at 0,0 */}
              <path
                fill="url(#waxHeart)"
                d="M0,-10
                   C0,-18 -10,-24 -20,-18
                   C-30,-12 -30,0 -20,12
                   C-14,20 -6,26 0,30
                   C6,26 14,20 20,12
                   C30,0 30,-12 20,-18
                   C10,-24 0,-18 0,-10 Z"
              />
              {/* Gloss highlight */}
              <path
                fill="url(#waxGlow)"
                d="M0,-10
                   C0,-18 -10,-24 -20,-18
                   C-30,-12 -30,0 -20,12
                   C-14,20 -6,26 0,30
                   C6,26 14,20 20,12
                   C30,0 30,-12 20,-18
                   C10,-24 0,-18 0,-10 Z"
              />
              {/* Botanical engraving inside heart */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Shadow pass */}
                <g stroke="#3a0808" strokeWidth="1.3" opacity="0.45" transform="translate(0.8,0.8)">
                  <path d="M0,12 C0,4 -6,-2 -12,-4 C-8,2 -4,8 0,12 Z" />
                  <path d="M0,12 C0,4 6,-2 12,-4 C8,2 4,8 0,12 Z" />
                  <path d="M-12,-4 C-16,-8 -14,-14 -10,-16" />
                  <path d="M12,-4 C16,-8 14,-14 10,-16" />
                  <path d="M-10,-16 C-8,-20 -2,-22 0,-20" />
                  <path d="M10,-16 C8,-20 2,-22 0,-20" />
                  <circle cx="-16" cy="-6" r="1.5" fill="#3a0808" />
                  <circle cx="16"  cy="-6" r="1.5" fill="#3a0808" />
                  <circle cx="0"   cy="-21" r="1.5" fill="#3a0808" />
                </g>
                {/* Highlight pass */}
                <g stroke="#E8A880" strokeWidth="0.9" opacity="0.6">
                  <path d="M0,12 C0,4 -6,-2 -12,-4 C-8,2 -4,8 0,12 Z" />
                  <path d="M0,12 C0,4 6,-2 12,-4 C8,2 4,8 0,12 Z" />
                  <path d="M-12,-4 C-16,-8 -14,-14 -10,-16" />
                  <path d="M12,-4 C16,-8 14,-14 10,-16" />
                  <path d="M-10,-16 C-8,-20 -2,-22 0,-20" />
                  <path d="M10,-16 C8,-20 2,-22 0,-20" />
                  <circle cx="-16" cy="-6" r="1.5" fill="#E8A880" />
                  <circle cx="16"  cy="-6" r="1.5" fill="#E8A880" />
                  <circle cx="0"   cy="-21" r="1.5" fill="#E8A880" />
                </g>
              </g>
            </g>
          )}

          {/* ── Animated flap (morphs open) ── */}
          <motion.path
            fill="url(#flapGrad2)"
            stroke="rgba(160,135,65,0.4)"
            strokeWidth="0.9"
            d={flapOpen
              ? "M0,0 L340,0 L170,0 Z"
              : "M0,0 L340,0 L170,138 Z"
            }
            animate={{
              d: flapOpen
                ? "M0,0 L340,0 L170,0 Z"
                : "M0,0 L340,0 L170,138 Z",
            }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>

        {/* Idle pulse */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 3,
                zIndex: 20,
                pointerEvents: "none",
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(201,168,76,0.38)",
                  "0 0 0 16px rgba(201,168,76,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes hintPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
