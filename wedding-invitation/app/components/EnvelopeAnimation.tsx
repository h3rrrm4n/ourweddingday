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
    setTimeout(() => setPhase("opening"), 380);
    setTimeout(() => setPhase("sliding"), 950);
    setTimeout(() => setPhase("done"), 1750);
    setTimeout(() => onOpen(), 1950);
  };

  const flapOpen    = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding"  || phase === "done";
  const envelopeY   = phase === "idle" ? 0 : -16;

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Բացել հրավերը"
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
    >
      {/* Hint */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              position: "absolute",
              top: -52,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.62rem",
              color: "#7B8363",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              animation: "hintPulse 3.2s ease-in-out infinite",
              whiteSpace: "nowrap",
            }}
          >
            Հպվեք ծրարը բացելու համար
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope + card stack */}
      <motion.div
        animate={{ y: envelopeY }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", width: 340, height: 240 }}
      >

        {/* ── Preview card slides up ── */}
        <AnimatePresence>
          {cardVisible && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: -160, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 296,
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <div style={{
                background: "linear-gradient(170deg, #FFFFFF 0%, #FAF8F5 60%, #F5EDD8 100%)",
                borderRadius: 14,
                border: "1px solid rgba(123,131,99,0.2)",
                boxShadow: "0 20px 60px rgba(60,55,40,0.16), 0 4px 16px rgba(60,55,40,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                padding: "26px 24px 22px",
                textAlign: "center",
              }}>
                {/* Photo circle */}
                <div style={{
                  width: 76, height: 76,
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  background: "linear-gradient(135deg, #EDF0E8 0%, #D8DDD0 100%)",
                  border: "2.5px solid rgba(123,131,99,0.3)",
                  boxShadow: "0 0 0 6px rgba(123,131,99,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
                    <circle cx="24" cy="17" r="9" fill="rgba(123,131,99,0.35)" />
                    <path d="M5 44 Q5 30 24 30 Q43 30 43 44" fill="rgba(123,131,99,0.22)" />
                  </svg>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(123,131,99,0.35))" }} />
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#7B8363", opacity: 0.6 }} />
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(123,131,99,0.35))" }} />
                </div>

                {/* Names */}
                <div style={{
                  fontFamily: "var(--font-cormorant), var(--font-playfair), serif",
                  fontSize: "clamp(1.3rem, 5vw, 1.55rem)",
                  color: "#2A2520",
                  lineHeight: 1.2,
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                }}>
                  Անի{" "}
                  <span style={{ color: "#7B8363", fontStyle: "normal" }}>&</span>
                  {" "}Արման
                </div>

                {/* Date */}
                <div style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.66rem",
                  color: "#7B8363",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginTop: 11,
                }}>
                  20 · Սեպտեմբեր · 2026
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Envelope SVG ── */}
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
            filter: "drop-shadow(0 16px 40px rgba(40,50,30,0.28)) drop-shadow(0 4px 12px rgba(40,50,30,0.14))",
            overflow: "visible",
          }}
        >
          <defs>
            {/* Olive green body */}
            <linearGradient id="oliveBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#8A9172" />
              <stop offset="100%" stopColor="#6A7158" />
            </linearGradient>
            {/* Flap — slightly lighter olive */}
            <linearGradient id="oliveFlap" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#7B8363" />
              <stop offset="100%" stopColor="#6E7758" />
            </linearGradient>
            {/* Inner folds — darker olive shadow */}
            <linearGradient id="foldLO" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#505840" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#505840" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="foldRO" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#505840" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#505840" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="foldBO" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#505840" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#505840" stopOpacity="0.35" />
            </linearGradient>
            {/* Wax seal — deep crimson */}
            <radialGradient id="waxH" cx="36%" cy="28%" r="70%">
              <stop offset="0%"   stopColor="#B83030" />
              <stop offset="42%"  stopColor="#8E1A1A" />
              <stop offset="76%"  stopColor="#6E1010" />
              <stop offset="100%" stopColor="#4C0808" />
            </radialGradient>
            <radialGradient id="waxGloss" cx="34%" cy="26%" r="38%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="sealShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1A0404" floodOpacity="0.40" />
            </filter>
          </defs>

          {/* Body */}
          <rect x="0" y="0" width="340" height="240" rx="2" fill="url(#oliveBody)" />

          {/* Paper texture overlay — ultra-subtle noise */}
          <rect x="0" y="0" width="340" height="240" rx="2" fill="url(#oliveBody)" opacity="0.5" />

          {/* Inner fold triangles */}
          <path d="M0 0 L170 138 L0 240"    fill="url(#foldLO)" />
          <path d="M340 0 L170 138 L340 240"  fill="url(#foldRO)" />
          <path d="M0 240 L170 138 L340 240"  fill="url(#foldBO)" />

          {/* Crease lines */}
          <line x1="0"   y1="0"   x2="170" y2="138" stroke="rgba(40,50,30,0.20)" strokeWidth="0.7" />
          <line x1="340" y1="0"   x2="170" y2="138" stroke="rgba(40,50,30,0.20)" strokeWidth="0.7" />
          <line x1="0"   y1="240" x2="170" y2="138" stroke="rgba(40,50,30,0.28)" strokeWidth="0.8" />
          <line x1="340" y1="240" x2="170" y2="138" stroke="rgba(40,50,30,0.28)" strokeWidth="0.8" />

          {/* Edge highlight — top */}
          <line x1="0" y1="0" x2="340" y2="0" stroke="rgba(200,210,180,0.25)" strokeWidth="1" />
          {/* Edge highlight — left / right */}
          <line x1="0" y1="0" x2="0" y2="240"   stroke="rgba(200,210,180,0.15)" strokeWidth="0.8" />
          <line x1="340" y1="0" x2="340" y2="240" stroke="rgba(30,40,20,0.25)" strokeWidth="0.8" />
          <line x1="0" y1="240" x2="340" y2="240" stroke="rgba(30,40,20,0.30)" strokeWidth="0.8" />

          {/* ── Heart wax seal ── */}
          {!flapOpen && (
            <g transform="translate(170,142)" filter="url(#sealShadow)">
              {/* Heart path — centered at 0,0, radius ~34px */}
              <path
                fill="url(#waxH)"
                d="M0,-11
                   C0,-21 -12,-28 -22,-21
                   C-34,-13 -34,2 -22,15
                   C-14,24 -6,30 0,34
                   C6,30 14,24 22,15
                   C34,2 34,-13 22,-21
                   C12,-28 0,-21 0,-11 Z"
              />
              <path
                fill="url(#waxGloss)"
                d="M0,-11
                   C0,-21 -12,-28 -22,-21
                   C-34,-13 -34,2 -22,15
                   C-14,24 -6,30 0,34
                   C6,30 14,24 22,15
                   C34,2 34,-13 22,-21
                   C12,-28 0,-21 0,-11 Z"
              />
              {/* Botanical engraving */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Shadow */}
                <g stroke="#1A0404" strokeWidth="1.4" opacity="0.4" transform="translate(0.7,0.7)">
                  <path d="M0,14 C-4,6 -10,0 -16,-2 C-10,4 -5,10 0,14 Z" />
                  <path d="M0,14 C4,6 10,0 16,-2 C10,4 5,10 0,14 Z" />
                  <path d="M-16,-2 C-20,-8 -18,-16 -12,-18" />
                  <path d="M16,-2  C20,-8  18,-16  12,-18" />
                  <path d="M-12,-18 C-8,-23 0,-24 0,-22" />
                  <path d="M12,-18  C8,-23  0,-24  0,-22" />
                  <circle cx="-20" cy="-5" r="1.6" fill="#1A0404" />
                  <circle cx="20"  cy="-5" r="1.6" fill="#1A0404" />
                  <circle cx="0"   cy="-24" r="1.6" fill="#1A0404" />
                </g>
                {/* Highlight */}
                <g stroke="#E8A878" strokeWidth="0.9" opacity="0.65">
                  <path d="M0,14 C-4,6 -10,0 -16,-2 C-10,4 -5,10 0,14 Z" />
                  <path d="M0,14 C4,6 10,0 16,-2 C10,4 5,10 0,14 Z" />
                  <path d="M-16,-2 C-20,-8 -18,-16 -12,-18" />
                  <path d="M16,-2  C20,-8  18,-16  12,-18" />
                  <path d="M-12,-18 C-8,-23 0,-24 0,-22" />
                  <path d="M12,-18  C8,-23  0,-24  0,-22" />
                  <circle cx="-20" cy="-5" r="1.6" fill="#E8A878" />
                  <circle cx="20"  cy="-5" r="1.6" fill="#E8A878" />
                  <circle cx="0"   cy="-24" r="1.6" fill="#E8A878" />
                </g>
              </g>
            </g>
          )}

          {/* ── Animated flap ── */}
          <motion.path
            fill="url(#oliveFlap)"
            stroke="rgba(40,50,30,0.18)"
            strokeWidth="0.8"
            d={flapOpen ? "M0,0 L340,0 L170,0 Z" : "M0,0 L340,0 L170,138 Z"}
            animate={{ d: flapOpen ? "M0,0 L340,0 L170,0 Z" : "M0,0 L340,0 L170,138 Z" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
          {/* Flap top highlight */}
          {!flapOpen && (
            <line x1="0" y1="0" x2="340" y2="0" stroke="rgba(200,210,180,0.2)" strokeWidth="0.8" />
          )}
        </svg>

        {/* Pulse ring */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              style={{ position: "absolute", inset: 0, borderRadius: 2, zIndex: 20, pointerEvents: "none" }}
              animate={{ boxShadow: ["0 0 0 0px rgba(123,131,99,0.5)", "0 0 0 18px rgba(123,131,99,0)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes hintPulse {
          0%, 100% { opacity: 0.38; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
