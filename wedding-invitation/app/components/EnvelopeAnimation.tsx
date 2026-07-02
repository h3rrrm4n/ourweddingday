"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props { onOpen: () => void; }

export default function EnvelopeAnimation({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "lift" | "open" | "slide" | "done">("idle");

  const tap = () => {
    if (phase !== "idle") return;
    setPhase("lift");
    setTimeout(() => setPhase("open"),  380);
    setTimeout(() => setPhase("slide"), 950);
    setTimeout(() => setPhase("done"),  1650);
    setTimeout(() => onOpen(),          1900);
  };

  const flapped   = phase === "open"  || phase === "slide" || phase === "done";
  const cardOut   = phase === "slide" || phase === "done";

  return (
    <motion.div
      className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden"
      onClick={tap}
      role="button"
      aria-label="Բացել ծրարը"
      /* gentle lift when tapped */
      animate={{ y: phase === "lift" ? -16 : 0, scale: phase === "lift" ? 1.015 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0, scale: 1.07, filter: "blur(12px)", transition: { duration: 0.5 } }}
    >
      {/* ── PAPER BACKGROUND ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #DDD0BC 0%, #D0C0A8 40%, #C8B898 100%)",
        }}
      />

      {/* ── EMBOSSED FLORAL TEXTURE (SVG overlay, very subtle) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ mixBlendMode: "multiply", opacity: 0.22 }}
      >
        {/* Top-left bouquet */}
        <g stroke="#8B6E50" strokeWidth="1.1" strokeLinecap="round">
          <path d="M28 55 Q38 35 52 44 Q43 62 28 55Z" fill="#8B6E50" fillOpacity="0.12"/>
          <path d="M52 44 Q68 28 76 48 Q58 57 52 44Z" fill="#8B6E50" fillOpacity="0.1"/>
          <path d="M40 72 Q48 56 62 64 Q54 80 40 72Z" fill="#8B6E50" fillOpacity="0.1"/>
          <line x1="40" y1="82" x2="36" y2="118"/>
          <path d="M38 92 Q30 88 26 80"/>
          <path d="M37 104 Q46 100 48 92"/>
          <circle cx="58" cy="136" r="2.2" fill="#8B6E50" fillOpacity="0.3"/>
          <circle cx="76" cy="154" r="1.6" fill="#8B6E50" fillOpacity="0.25"/>
          <path d="M94 38 Q104 22 116 32 Q108 48 94 38Z" fill="#8B6E50" fillOpacity="0.1"/>
          <path d="M20 154 Q28 138 42 146 Q34 162 20 154Z" fill="#8B6E50" fillOpacity="0.1"/>
          <path d="M72 16 Q78 8 86 12 Q82 22 72 16Z" fill="#8B6E50" fillOpacity="0.12"/>
        </g>
        {/* Top-right (mirrored) */}
        <g stroke="#8B6E50" strokeWidth="1.1" strokeLinecap="round" transform="translate(390,0) scale(-1,1)">
          <path d="M28 55 Q38 35 52 44 Q43 62 28 55Z" fill="#8B6E50" fillOpacity="0.12"/>
          <path d="M52 44 Q68 28 76 48 Q58 57 52 44Z" fill="#8B6E50" fillOpacity="0.1"/>
          <path d="M40 72 Q48 56 62 64 Q54 80 40 72Z" fill="#8B6E50" fillOpacity="0.1"/>
          <line x1="40" y1="82" x2="36" y2="118"/>
          <path d="M38 92 Q30 88 26 80"/>
          <path d="M37 104 Q46 100 48 92"/>
          <circle cx="58" cy="136" r="2.2" fill="#8B6E50" fillOpacity="0.3"/>
          <path d="M94 38 Q104 22 116 32 Q108 48 94 38Z" fill="#8B6E50" fillOpacity="0.1"/>
        </g>
        {/* Bottom-left */}
        <g stroke="#8B6E50" strokeWidth="1" strokeLinecap="round" transform="translate(0,844) scale(1,-1)">
          <path d="M22 40 Q32 22 46 32 Q38 50 22 40Z" fill="#8B6E50" fillOpacity="0.1"/>
          <path d="M48 28 Q62 14 70 34 Q54 42 48 28Z" fill="#8B6E50" fillOpacity="0.08"/>
          <line x1="34" y1="58" x2="30" y2="90"/>
          <circle cx="52" cy="110" r="2" fill="#8B6E50" fillOpacity="0.25"/>
          <circle cx="28" cy="126" r="1.4" fill="#8B6E50" fillOpacity="0.2"/>
        </g>
        {/* Bottom-right */}
        <g stroke="#8B6E50" strokeWidth="1" strokeLinecap="round" transform="translate(390,844) scale(-1,-1)">
          <path d="M22 40 Q32 22 46 32 Q38 50 22 40Z" fill="#8B6E50" fillOpacity="0.1"/>
          <path d="M48 28 Q62 14 70 34 Q54 42 48 28Z" fill="#8B6E50" fillOpacity="0.08"/>
          <line x1="34" y1="58" x2="30" y2="90"/>
          <circle cx="52" cy="110" r="2" fill="#8B6E50" fillOpacity="0.25"/>
        </g>
        {/* Scattered small flowers */}
        {([
          [160, 60], [280, 90], [320, 170], [70, 280], [340, 350],
          [130, 680], [260, 720], [80, 760], [310, 800],
        ] as [number, number][]).map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <circle cx="0" cy="0" r="5" stroke="#8B6E50" strokeWidth="0.8" fill="none"/>
            <line x1="0" y1="-5" x2="0" y2="-10" stroke="#8B6E50" strokeWidth="0.7"/>
            <path d="M-4,-4 Q-6,-8 -3,-9 Q-1,-6 -4,-4Z" fill="#8B6E50" fillOpacity="0.15"/>
            <path d="M4,-4 Q6,-8 3,-9 Q1,-6 4,-4Z" fill="#8B6E50" fillOpacity="0.15"/>
          </g>
        ))}
      </svg>

      {/* ── ENVELOPE FOLD LINES (diamond shape) ── */}
      {/* The four triangles converge at exactly 50% 50% of viewport */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 390 844"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Left triangle fill */}
        <path d="M0,0 L0,844 L195,422 Z" fill="rgba(180,165,145,0.28)" />
        {/* Right triangle fill */}
        <path d="M390,0 L390,844 L195,422 Z" fill="rgba(150,135,118,0.22)" />
        {/* Bottom triangle fill */}
        <path d="M0,844 L390,844 L195,422 Z" fill="rgba(165,150,130,0.25)" />

        {/* Fold crease lines */}
        <line x1="0" y1="0"   x2="195" y2="422" stroke="rgba(120,100,75,0.18)" strokeWidth="0.8"/>
        <line x1="390" y1="0" x2="195" y2="422" stroke="rgba(120,100,75,0.18)" strokeWidth="0.8"/>
        <line x1="0" y1="844" x2="195" y2="422" stroke="rgba(120,100,75,0.15)" strokeWidth="0.8"/>
        <line x1="390" y1="844" x2="195" y2="422" stroke="rgba(120,100,75,0.15)" strokeWidth="0.8"/>

        {/* Top flap — animates open */}
        <motion.path
          d="M0,0 L390,0 L195,422 Z"
          fill="rgba(220,208,188,0.92)"
          style={{ transformOrigin: "195px 0px" }}
          animate={flapped
            ? { scaleY: -0.05, opacity: 0.4 }
            : { scaleY: 1,     opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Flap crease highlight */}
        {!flapped && (
          <line x1="0" y1="0" x2="390" y2="0" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        )}
      </svg>

      {/* ── WAX SEAL — exactly at center 50% / 50% ── */}
      <motion.div
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        animate={flapped
          ? { scale: 0.7, opacity: 0, y: 20 }
          : phase === "idle"
          ? {}
          : { scale: 0.9 }}
        transition={phase === "idle"
          ? {}
          : { duration: 0.45, ease: "easeOut" }}
      >
        {/* Idle pulse ring */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              className="absolute rounded-full"
              style={{ inset: -12, borderRadius: "50%" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(140,31,31,0.45)", "0 0 0 22px rgba(140,31,31,0)"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <svg viewBox="0 0 120 120" width="120" height="120" fill="none">
          {/* Wax drips / organic blob */}
          <path
            d="M60 6
               C72 4 85 10 93 21
               C101 32 104 44 102 56
               C100 68 93 79 83 87
               C73 95 60 99 48 97
               C36 95 25 87 18 76
               C11 65 9 52 12 40
               C15 28 23 17 34 11
               C45 5 55 7 60 6Z"
            fill="url(#waxGrad)"
            filter="url(#sealShadow)"
          />
          {/* Lighter highlight blob */}
          <path
            d="M60 14
               C70 12 80 18 87 27
               C94 36 96 48 93 58
               C90 68 83 77 73 82
               C63 87 52 86 43 80
               C34 74 28 63 27 52
               C26 41 30 30 37 23
               C44 16 52 15 60 14Z"
            fill="url(#waxHighlight)"
            opacity="0.35"
          />
          {/* Rose stem */}
          <line x1="60" y1="72" x2="60" y2="88" stroke="rgba(255,200,185,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M60 78 Q53 74 51 68" stroke="rgba(255,200,185,0.45)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M60 82 Q67 78 69 72" stroke="rgba(255,200,185,0.45)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          {/* Rose bloom */}
          <circle cx="60" cy="54" r="16" fill="none" stroke="rgba(255,195,180,0.3)" strokeWidth="0.8"/>
          <path d="M60,40 Q68,45 68,54 Q68,63 60,68 Q52,63 52,54 Q52,45 60,40Z" fill="rgba(255,195,180,0.25)" stroke="rgba(255,195,180,0.5)" strokeWidth="0.9"/>
          <path d="M44,54 Q49,46 60,46 Q60,54 54,58 Q46,57 44,54Z" fill="rgba(255,195,180,0.2)" stroke="rgba(255,195,180,0.4)" strokeWidth="0.8"/>
          <path d="M76,54 Q71,46 60,46 Q60,54 66,58 Q74,57 76,54Z" fill="rgba(255,195,180,0.2)" stroke="rgba(255,195,180,0.4)" strokeWidth="0.8"/>
          <path d="M50,43 Q54,38 60,40 Q58,46 54,47 Q49,45 50,43Z" fill="rgba(255,195,180,0.25)" stroke="rgba(255,195,180,0.4)" strokeWidth="0.8"/>
          <path d="M70,43 Q66,38 60,40 Q62,46 66,47 Q71,45 70,43Z" fill="rgba(255,195,180,0.25)" stroke="rgba(255,195,180,0.4)" strokeWidth="0.8"/>
          <circle cx="60" cy="54" r="5" fill="rgba(255,180,165,0.4)"/>
          <circle cx="60" cy="54" r="2.5" fill="rgba(255,165,150,0.5)"/>

          <defs>
            <radialGradient id="waxGrad" cx="38%" cy="32%">
              <stop offset="0%" stopColor="#B03535"/>
              <stop offset="50%" stopColor="#8C1F1F"/>
              <stop offset="100%" stopColor="#611010"/>
            </radialGradient>
            <radialGradient id="waxHighlight" cx="30%" cy="25%">
              <stop offset="0%" stopColor="#D04040" stopOpacity="1"/>
              <stop offset="100%" stopColor="#8C1F1F" stopOpacity="0"/>
            </radialGradient>
            <filter id="sealShadow" x="-15%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2A1010" floodOpacity="0.35"/>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* ── CARD SLIDING OUT ── */}
      <AnimatePresence>
        {cardOut && (
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            animate={{ y: -220, opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "72%", maxWidth: 288 }}
          >
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: "linear-gradient(160deg, #FDFAF3 0%, #F5EDD8 100%)",
                boxShadow: "0 20px 60px rgba(42,17,10,0.25)",
                border: "1px solid rgba(184,149,46,0.2)",
              }}
            >
              <p className="font-script mb-2" style={{ fontSize: "1.25rem", color: "#B8952E" }}>Save the Date</p>
              <p className="font-serif font-bold" style={{ fontSize: "1.35rem", color: "#2A2118", lineHeight: 1.2 }}>
                Անի & Արման
              </p>
              <div className="my-3 h-px" style={{ background: "rgba(184,149,46,0.25)" }} />
              <p className="caps-label" style={{ fontSize: "0.65rem" }}>20 Սեպտեմբերի 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM HINT ── */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3"
          >
            <p
              className="font-sans text-center"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(80,58,38,0.65)",
              }}
            >
              Սեղմեք հրավերը բացելու համար
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "rgba(80,58,38,0.45)", fontSize: "1.1rem" }}
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
