"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useCallback } from "react";

interface Props {
  onOpened: () => void;
}

type Phase = "idle" | "pressing" | "opening" | "sliding" | "done";

export default function LuxuryEnvelope({ onOpened }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  /* ── mouse tilt ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-5, 5]), { stiffness: 40, damping: 20 });
  const tiltX = useSpring(useTransform(my, [-1, 1], [3, -3]),  { stiffness: 40, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - el.left) / el.width  * 2 - 1);
    my.set((e.clientY - el.top)  / el.height * 2 - 1);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  /* ── seal click sequence ── */
  function handleSeal(e: React.MouseEvent | React.KeyboardEvent) {
    e.stopPropagation();
    if (phase !== "idle") return;
    setPhase("pressing");
    setTimeout(() => setPhase("opening"),  180);
    setTimeout(() => setPhase("sliding"),  900);
    setTimeout(() => setPhase("done"),    1900);
    setTimeout(() => onOpened(),          2200);
  }

  const flapOpen    = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding"  || phase === "done";
  const envelopeFading = phase === "done";

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ opacity: envelopeFading ? 0 : 1, y: envelopeFading ? 30 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", perspective: 1600, overflow: "visible" }}
    >
      {/* floating breath */}
      <motion.div
        animate={{ y: ["0%", "-1.2%", "0%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ overflow: "visible" }}
      >
        {/* tilt wrapper */}
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d", overflow: "visible" }}
        >
          {/* ── aspect-ratio box 7:5 ── */}
          <div style={{ position: "relative", width: "100%", paddingBottom: "71.4%", overflow: "visible" }}>

            {/* invitation card that slides out */}
            <AnimatePresence>
              {cardVisible && (
                <motion.div
                  initial={{ y: "60%", opacity: 0 }}
                  animate={{ y: "-45%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    width: "80%",
                    zIndex: 4,
                    pointerEvents: "none",
                  }}
                >
                  <div style={{
                    background: "#FDFAF5",
                    borderRadius: 2,
                    aspectRatio: "4/5",
                    boxShadow: "0 8px 32px rgba(60,40,10,0.14), 0 2px 8px rgba(60,40,10,0.08)",
                  }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── 1. ENVELOPE BODY SVG ── */}
            <svg
              viewBox="0 0 700 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                overflow: "visible",
                filter: [
                  "drop-shadow(0px 4px 6px rgba(40,30,10,0.07))",
                  "drop-shadow(0px 16px 40px rgba(40,30,10,0.13))",
                  "drop-shadow(0px 40px 80px rgba(40,30,10,0.08))",
                ].join(" "),
              }}
            >
              <defs>
                {/* paper grain */}
                <filter id="grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="5" stitchTiles="stitch" result="noise"/>
                  <feColorMatrix in="noise" type="matrix"
                    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0" result="alpha"/>
                  <feBlend in="SourceGraphic" in2="alpha" mode="multiply"/>
                </filter>

                {/* inner fold gradients — very subtle */}
                <linearGradient id="fL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#9E8A62" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="#9E8A62" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="fR" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%"   stopColor="#9E8A62" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="#9E8A62" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="fB" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%"   stopColor="#7A6640" stopOpacity="0.24"/>
                  <stop offset="100%" stopColor="#7A6640" stopOpacity="0"/>
                </linearGradient>

                {/* wax seal — deep burgundy */}
                <radialGradient id="wax" cx="38%" cy="30%" r="70%">
                  <stop offset="0%"   stopColor="#8C2020"/>
                  <stop offset="35%"  stopColor="#6B1414"/>
                  <stop offset="70%"  stopColor="#520D0D"/>
                  <stop offset="100%" stopColor="#380808"/>
                </radialGradient>
                <radialGradient id="waxGloss" cx="32%" cy="24%" r="38%">
                  <stop offset="0%"   stopColor="#fff" stopOpacity="0.38"/>
                  <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                </radialGradient>
                {/* organic blob displacement */}
                <filter id="waxBlob" x="-15%" y="-15%" width="130%" height="130%">
                  <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="3" seed="8" result="turb"/>
                  <feDisplacementMap in="SourceGraphic" in2="turb" scale="6" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#1a0404" floodOpacity="0.42"/>
                </filter>
              </defs>

              {/* Body */}
              <rect x="0" y="0" width="700" height="500" rx="2"
                fill="#F3EFE4"
                filter="url(#grain)"
              />
              <rect x="0" y="0" width="700" height="500" rx="2"
                fill="none"
                stroke="rgba(160,138,90,0.22)"
                strokeWidth="1"
              />

              {/* inner fold triangles */}
              <path d="M0,0   L0,500   L350,250 Z" fill="url(#fL)"/>
              <path d="M700,0 L700,500 L350,250 Z" fill="url(#fR)"/>
              <path d="M0,500 L700,500 L350,250 Z" fill="url(#fB)"/>

              {/* crease lines */}
              <line x1="0"   y1="0"   x2="350" y2="250" stroke="rgba(140,118,72,0.14)" strokeWidth="0.9"/>
              <line x1="700" y1="0"   x2="350" y2="250" stroke="rgba(140,118,72,0.14)" strokeWidth="0.9"/>
              <line x1="0"   y1="500" x2="350" y2="250" stroke="rgba(110,90,48,0.20)"  strokeWidth="1"/>
              <line x1="700" y1="500" x2="350" y2="250" stroke="rgba(110,90,48,0.20)"  strokeWidth="1"/>

              {/* wax seal — at fold point (350, 250), only when flap is not open */}
              {!flapOpen && (
                <g transform="translate(350,250)">
                  <g filter="url(#waxBlob)">
                    <circle cx="0" cy="0" r="56" fill="url(#wax)" filter="url(#waxShadow)"/>
                    <circle cx="0" cy="0" r="56" fill="url(#waxGloss)"/>
                  </g>
                  {/* engraved ring */}
                  <circle cx="0" cy="0" r="48" fill="none" stroke="rgba(255,190,130,0.20)" strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="43" fill="none" stroke="rgba(15,3,3,0.30)"  strokeWidth="0.8"/>

                  {/* rose — highlight pass */}
                  <g fill="none" stroke="rgba(230,165,110,0.60)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M0,-23 C-7,-31 -20,-28 -22,-18 C-24,-8 -16,0 0,5 C16,0 24,-8 22,-18 C20,-28 7,-31 0,-23Z"/>
                    <path d="M0,5  C-10,1 -20,5 -20,15 C-20,24 -10,30 0,33 C10,30 20,24 20,15 C20,5 10,1 0,5Z"/>
                    <path d="M0,-9  C-5,-15 -13,-12 -13,-5 C-13,2 -5,7 0,9 C5,7 13,2 13,-5 C13,-12 5,-15 0,-9Z"/>
                    <path d="M0,33 L0,47"/>
                    <path d="M0,40 C-7,33 -17,36 -17,42 C-12,42 -6,40 0,40Z"/>
                    <path d="M0,38 C7,31  17,34  17,40 C12,40 6,38 0,38Z"/>
                    <circle cx="0" cy="-2" r="3" fill="rgba(230,165,110,0.45)" stroke="none"/>
                  </g>
                  {/* rose — shadow pass */}
                  <g fill="none" stroke="rgba(12,2,2,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.6,0.8)">
                    <path d="M0,-23 C-7,-31 -20,-28 -22,-18 C-24,-8 -16,0 0,5 C16,0 24,-8 22,-18 C20,-28 7,-31 0,-23Z"/>
                    <path d="M0,5  C-10,1 -20,5 -20,15 C-20,24 -10,30 0,33 C10,30 20,24 20,15 C20,5 10,1 0,5Z"/>
                    <path d="M0,-9  C-5,-15 -13,-12 -13,-5 C-13,2 -5,7 0,9 C5,7 13,2 13,-5 C13,-12 5,-15 0,-9Z"/>
                    <path d="M0,33 L0,47"/>
                    <path d="M0,40 C-7,33 -17,36 -17,42 C-12,42 -6,40 0,40Z"/>
                    <path d="M0,38 C7,31  17,34  17,40 C12,40 6,38 0,38Z"/>
                  </g>
                </g>
              )}
            </svg>

            {/* ── 2. FLAP (3-D rotate, stays visible) ── */}
            <motion.div
              animate={{ rotateX: flapOpen ? -180 : 0 }}
              transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%",
                height: "50%",
                transformOrigin: "center top",
                transformStyle: "preserve-3d",
                backfaceVisibility: "visible",
                WebkitBackfaceVisibility: "visible",
                zIndex: 10,
                overflow: "visible",
              }}
            >
              {/* front face */}
              <svg viewBox="0 0 700 250"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                  backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                  filter: "drop-shadow(0 2px 4px rgba(40,28,8,0.06))" }}
              >
                <defs>
                  <filter id="grainFlap" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="3" stitchTiles="stitch" result="n"/>
                    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.03 0" result="a"/>
                    <feBlend in="SourceGraphic" in2="a" mode="multiply"/>
                  </filter>
                </defs>
                <polygon points="0,0 700,0 350,250"
                  fill="#F8F5EC"
                  stroke="rgba(150,128,78,0.20)"
                  strokeWidth="0.9"
                  strokeLinejoin="round"
                  filter="url(#grainFlap)"
                />
                {/* top edge highlight — subtle paper edge */}
                <line x1="1" y1="0.5" x2="699" y2="0.5"
                  stroke="rgba(255,252,242,0.80)"
                  strokeWidth="1.2"/>
              </svg>

              {/* back face — inside of flap */}
              <svg viewBox="0 0 700 250"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                  backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                  transform: "rotateX(180deg)" }}
              >
                <polygon points="700,0 0,0 350,250"
                  fill="#EDE7D5"
                  stroke="rgba(130,108,58,0.15)"
                  strokeWidth="0.9"/>
              </svg>
            </motion.div>

            {/* ── 3. SEAL CLICK TARGET (invisible, on top of seal drawing) ── */}
            <AnimatePresence>
              {!flapOpen && (
                <motion.button
                  key="seal-btn"
                  onClick={handleSeal}
                  onKeyDown={e => e.key === "Enter" && handleSeal(e)}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: phase === "pressing" ? 0.92 : 1 }}
                  exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.22 } }}
                  transition={{ duration: 0.12 }}
                  aria-label="Open invitation"
                  style={{
                    position: "absolute",
                    /* seal center is at (50% w, 50% h) */
                    top: "calc(50% - 11.2%)",  /* 50% - (r as % of h) */
                    left: "calc(50% - 8%)",     /* 50% - (r as % of w) */
                    width: "16%",
                    paddingBottom: "16%",
                    height: 0,
                    borderRadius: "50%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 30,
                    outline: "none",
                  }}
                />
              )}
            </AnimatePresence>

            {/* idle pulse on seal */}
            {phase === "idle" && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "calc(50% - 11.2%)",
                  left: "calc(50% - 8%)",
                  width: "16%",
                  paddingBottom: "16%",
                  height: 0,
                  borderRadius: "50%",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
                animate={{ boxShadow: [
                  "0 0 0 0px rgba(108,26,26,0.35)",
                  "0 0 0 22px rgba(108,26,26,0)",
                ]}}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
              />
            )}

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
