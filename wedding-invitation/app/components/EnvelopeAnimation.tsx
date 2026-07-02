"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props { onOpen: () => void; }

/* ── Botanical corner SVG ── */
function Corner({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 160"
      width="130"
      height="130"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g stroke="#B8952E" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.55">
        {/* Main branch */}
        <path d="M8 152 Q30 110 55 80 Q80 50 110 20"/>
        {/* Side branches */}
        <path d="M32 118 Q18 105 10 96"/>
        <path d="M55 80 Q44 65 40 52"/>
        <path d="M78 55 Q90 44 100 46"/>
        {/* Leaves */}
        <path d="M55 80 Q48 68 53 58 Q60 68 55 80Z" fill="#B8952E" fillOpacity="0.18"/>
        <path d="M78 55 Q70 44 75 36 Q82 44 78 55Z" fill="#B8952E" fillOpacity="0.15"/>
        <path d="M32 118 Q22 108 26 98 Q34 106 32 118Z" fill="#B8952E" fillOpacity="0.15"/>
        {/* Rose bud 1 */}
        <circle cx="110" cy="20" r="9" fill="#B8952E" fillOpacity="0.12" stroke="#B8952E" strokeWidth="0.8"/>
        <path d="M110,12 Q116,15 116,20 Q116,25 110,28 Q104,25 104,20 Q104,15 110,12Z" fill="#B8952E" fillOpacity="0.2"/>
        <circle cx="110" cy="20" r="3.5" fill="#B8952E" fillOpacity="0.35"/>
        {/* Rose bud 2 */}
        <circle cx="40" cy="52" r="7" fill="#B8952E" fillOpacity="0.1" stroke="#B8952E" strokeWidth="0.7"/>
        <circle cx="40" cy="52" r="2.8" fill="#B8952E" fillOpacity="0.3"/>
        {/* Small dots */}
        <circle cx="90" cy="42" r="1.8" fill="#B8952E" fillOpacity="0.4"/>
        <circle cx="20" cy="102" r="1.5" fill="#B8952E" fillOpacity="0.35"/>
        <circle cx="66" cy="72" r="1.4" fill="#B8952E" fillOpacity="0.3"/>
        <circle cx="48" cy="90" r="1.2" fill="#B8952E" fillOpacity="0.3"/>
      </g>
    </svg>
  );
}

/* ── Sparkle particle (static positions, no Math.random) ── */
const SPARKS = [
  { x: 15, y: 20, s: 5, d: 0 }, { x: 82, y: 8,  s: 4, d: 0.8 },
  { x: 35, y: 78, s: 3, d: 1.5 }, { x: 68, y: 55, s: 4.5, d: 2.2 },
  { x: 90, y: 35, s: 3.5, d: 0.4 }, { x: 10, y: 60, s: 3, d: 1.8 },
  { x: 55, y: 90, s: 4, d: 0.9 }, { x: 78, y: 80, s: 3, d: 2.6 },
];

export default function EnvelopeAnimation({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "lift" | "open" | "slide" | "done">("idle");

  const tap = () => {
    if (phase !== "idle") return;
    setPhase("lift");
    setTimeout(() => setPhase("open"),  360);
    setTimeout(() => setPhase("slide"), 920);
    setTimeout(() => setPhase("done"),  1650);
    setTimeout(() => onOpen(),          1950);
  };

  const flapped = phase === "open"  || phase === "slide" || phase === "done";
  const cardOut  = phase === "slide" || phase === "done";

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 120% 100% at 50% 40%, #FEFAF0 0%, #F8F0DC 30%, #F2E4C0 60%, #F8EDD4 85%, #FEFAF2 100%)",
      }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(184,149,46,0.09) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Botanical corners */}
      <div className="absolute top-0 left-0 pointer-events-none"><Corner /></div>
      <div className="absolute top-0 right-0 pointer-events-none"><Corner flip /></div>
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ transform: "scaleY(-1)" }}><Corner /></div>
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: "scale(-1,-1)" }}><Corner /></div>

      {/* Sparkle dots */}
      {SPARKS.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5 + sp.d, repeat: Infinity, ease: "easeInOut", delay: sp.d }}
        >
          <svg viewBox="0 0 12 12" width={sp.s} height={sp.s} fill="none">
            <path d="M6 0 L6.8 5 L12 6 L6.8 7 L6 12 L5.2 7 L0 6 L5.2 5 Z" fill="#B8952E" opacity="0.6"/>
          </svg>
        </motion.div>
      ))}

      {/* ── Names above envelope ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="relative z-10 flex flex-col items-center mb-8"
      >
        <p className="f-script" style={{ fontSize: "clamp(1.1rem, 4vw, 1.5rem)", color: "var(--gold)", letterSpacing: "0.02em" }}>
          Save the Date
        </p>
        <h1 className="f-serif font-bold" style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)", color: "var(--text)", letterSpacing: "0.01em" }}>
          Անի & Արման
        </h1>
        <p className="caps mt-1" style={{ letterSpacing: "0.22em" }}>20 Սեպտեմբերի 2026</p>
      </motion.div>

      {/* ── THE ENVELOPE CARD ── */}
      <motion.div
        className="relative z-10 cursor-pointer"
        onClick={tap}
        role="button"
        aria-label="Բացել ծրարը"
        /* lift on tap */
        animate={{ y: phase === "lift" ? -16 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: "min(82vw, 320px)",
          aspectRatio: "320 / 420",
          position: "relative",
          filter: "drop-shadow(0 20px 40px rgba(42,33,24,0.22)) drop-shadow(0 6px 12px rgba(42,33,24,0.14))",
        }}
      >
        {/* ── ENVELOPE SVG ── */}
        <svg
          viewBox="0 0 320 420"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Paper background */}
          <rect x="0" y="0" width="320" height="420" rx="4" fill="url(#paperGrad)" />

          {/* Embossed floral texture on paper */}
          <g opacity="0.13" stroke="#7A5A38" strokeWidth="1" strokeLinecap="round">
            {/* Top-left flower */}
            <circle cx="40" cy="48" r="12" />
            <path d="M40,36 Q46,40 46,48 Q46,56 40,60 Q34,56 34,48 Q34,40 40,36Z" />
            <path d="M40 60 L40 78" /><path d="M40 66 Q34 63 32 57"/><path d="M40 72 Q46 69 48 63"/>
            <circle cx="68" cy="30" r="8" />
            <path d="M28 90 Q35 75 48 82 Q42 95 28 90Z" />
            <circle cx="55" cy="105" r="2" fill="#7A5A38"/>
            <circle cx="72" cy="118" r="1.5" fill="#7A5A38"/>
            {/* Top-right flower */}
            <circle cx="280" cy="48" r="10" />
            <path d="M280,38 Q286,42 286,48 Q286,54 280,58 Q274,54 274,48 Q274,42 280,38Z" />
            <path d="M280 58 L280 75" /><path d="M280 64 Q274 61 272 55"/>
            <circle cx="256" cy="32" r="7" />
            <circle cx="255" cy="108" r="1.5" fill="#7A5A38"/>
            {/* Bottom-left */}
            <circle cx="38" cy="372" r="9" />
            <path d="M22 392 Q30 378 42 385 Q36 398 22 392Z" />
            <circle cx="60" cy="400" r="1.5" fill="#7A5A38"/>
            {/* Bottom-right */}
            <circle cx="282" cy="375" r="8" />
            <circle cx="265" cy="398" r="1.5" fill="#7A5A38"/>
            <circle cx="300" cy="400" r="1.2" fill="#7A5A38"/>
            {/* Scattered small dots */}
            {([
              [150, 30], [175, 22], [130, 15], [200, 380], [160, 395], [120, 385],
            ] as [number,number][]).map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="1.5" fill="#7A5A38"/>
            ))}
          </g>

          {/* ── FOLD TRIANGLES (diamond) ── */}
          {/* Center of envelope: (160, 210) */}
          {/* Left triangle */}
          <path d="M0,0 L0,420 L160,210 Z" fill="rgba(160,135,105,0.18)" />
          {/* Right triangle */}
          <path d="M320,0 L320,420 L160,210 Z" fill="rgba(140,115,88,0.14)" />
          {/* Bottom triangle */}
          <path d="M0,420 L320,420 L160,210 Z" fill="rgba(155,128,98,0.16)" />

          {/* Fold crease lines */}
          <line x1="0"   y1="0"   x2="160" y2="210" stroke="rgba(100,75,50,0.16)" strokeWidth="0.7"/>
          <line x1="320" y1="0"   x2="160" y2="210" stroke="rgba(100,75,50,0.16)" strokeWidth="0.7"/>
          <line x1="0"   y1="420" x2="160" y2="210" stroke="rgba(100,75,50,0.13)" strokeWidth="0.7"/>
          <line x1="320" y1="420" x2="160" y2="210" stroke="rgba(100,75,50,0.13)" strokeWidth="0.7"/>

          {/* ── TOP FLAP (animates open) ── */}
          <motion.path
            d="M0,0 L320,0 L160,210 Z"
            fill="url(#flapGrad)"
            style={{ transformOrigin: "160px 0px" }}
            animate={flapped ? { scaleY: -0.04, opacity: 0.3 } : { scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Flap edge line */}
          {!flapped && (
            <line x1="0" y1="0" x2="320" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
          )}

          {/* Thin gold border */}
          <rect x="0.8" y="0.8" width="318.4" height="418.4" rx="3.5"
            fill="none" stroke="rgba(184,149,46,0.35)" strokeWidth="1.5"/>

          <defs>
            <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#DDD0B8"/>
              <stop offset="45%"  stopColor="#D4C4A8"/>
              <stop offset="100%" stopColor="#C8B898"/>
            </linearGradient>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#E0D4BC"/>
              <stop offset="100%" stopColor="#CEC0A0"/>
            </linearGradient>
          </defs>
        </svg>

        {/* ── WAX SEAL — at exact center of envelope ── */}
        <motion.div
          className="absolute"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
          animate={flapped ? { scale: 0.65, opacity: 0, y: 15 } : {}}
          transition={{ duration: 0.42, ease: "easeOut" }}
        >
          {/* Pulse ring */}
          <AnimatePresence>
            {phase === "idle" && (
              <motion.div
                className="absolute rounded-full"
                style={{ inset: -10, borderRadius: "50%" }}
                animate={{ boxShadow: ["0 0 0 0 rgba(140,31,31,0.5)", "0 0 0 20px rgba(140,31,31,0)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          <svg viewBox="0 0 110 110" width="110" height="110" fill="none">
            {/* Organic wax blob */}
            <path d="M55 7 C68 5 82 12 90 24 C98 36 100 52 96 64 C92 76 82 86 70 91 C58 96 45 94 35 87 C25 80 18 68 16 55 C14 42 18 28 27 18 C36 8 48 8 55 7Z"
              fill="url(#wax)" filter="url(#shadow)"/>
            {/* Highlight */}
            <path d="M55 14 C66 12 77 18 84 29 C91 40 92 54 88 65 C84 76 74 84 63 87 C52 90 40 86 32 78 C24 70 21 58 24 47 C27 36 36 26 46 20 C50 17 53 15 55 14Z"
              fill="url(#waxHi)" opacity="0.3"/>
            {/* Stem */}
            <line x1="55" y1="70" x2="55" y2="84" stroke="rgba(255,210,195,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M55 75 Q48 71 46 65" stroke="rgba(255,210,195,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <path d="M55 79 Q62 75 64 69" stroke="rgba(255,210,195,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            {/* Petals */}
            <path d="M55,42 Q63,47 63,55 Q63,63 55,68 Q47,63 47,55 Q47,47 55,42Z"
              fill="rgba(255,210,195,0.28)" stroke="rgba(255,210,195,0.55)" strokeWidth="0.9"/>
            <path d="M40,55 Q45,47 55,47 Q55,55 49,59 Q41,58 40,55Z"
              fill="rgba(255,210,195,0.22)" stroke="rgba(255,210,195,0.45)" strokeWidth="0.8"/>
            <path d="M70,55 Q65,47 55,47 Q55,55 61,59 Q69,58 70,55Z"
              fill="rgba(255,210,195,0.22)" stroke="rgba(255,210,195,0.45)" strokeWidth="0.8"/>
            <path d="M46,44 Q49,38 55,41 Q53,47 49,48 Q44,46 46,44Z"
              fill="rgba(255,210,195,0.28)" stroke="rgba(255,210,195,0.45)" strokeWidth="0.8"/>
            <path d="M64,44 Q61,38 55,41 Q57,47 61,48 Q66,46 64,44Z"
              fill="rgba(255,210,195,0.28)" stroke="rgba(255,210,195,0.45)" strokeWidth="0.8"/>
            <circle cx="55" cy="55" r="5"   fill="rgba(255,195,180,0.4)"/>
            <circle cx="55" cy="55" r="2.5" fill="rgba(255,175,160,0.55)"/>
            <defs>
              <radialGradient id="wax" cx="36%" cy="30%">
                <stop offset="0%"   stopColor="#B83535"/>
                <stop offset="55%"  stopColor="#8C1F1F"/>
                <stop offset="100%" stopColor="#5E0E0E"/>
              </radialGradient>
              <radialGradient id="waxHi" cx="28%" cy="22%">
                <stop offset="0%"  stopColor="#C84040" stopOpacity="1"/>
                <stop offset="100%" stopColor="#8C1F1F" stopOpacity="0"/>
              </radialGradient>
              <filter id="shadow" x="-20%" y="-15%" width="140%" height="140%">
                <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#2A1010" floodOpacity="0.4"/>
              </filter>
            </defs>
          </svg>
        </motion.div>

        {/* ── CARD SLIDING OUT ── */}
        <AnimatePresence>
          {cardOut && (
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: -190, opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "82%", zIndex: 20 }}
            >
              <div className="rounded-2xl p-5 text-center"
                style={{
                  background: "linear-gradient(160deg, #FDFAF3 0%, #F5EDD6 100%)",
                  boxShadow: "0 18px 50px rgba(42,17,10,0.28)",
                  border: "1px solid rgba(184,149,46,0.22)",
                }}>
                <p className="f-script mb-1.5" style={{ fontSize: "1.2rem", color: "var(--gold)" }}>Save the Date</p>
                <p className="f-serif font-bold" style={{ fontSize: "1.3rem", color: "var(--text)", lineHeight: 1.2 }}>Անի & Արման</p>
                <div className="my-2.5 h-px" style={{ background: "rgba(184,149,46,0.22)" }} />
                <p className="caps" style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}>20 Սեպտեմբերի 2026</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── HINT TEXT ── */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="relative z-10 flex flex-col items-center gap-2.5 mt-8"
          >
            <p className="caps" style={{ letterSpacing: "0.24em", color: "rgba(100,75,50,0.6)" }}>
              Սեղմեք հրավերը բացելու համար
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "rgba(184,149,46,0.55)", fontSize: "1.1rem" }}
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
