"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useCallback } from "react";

interface Props {
  onOpened: () => void;
}

type Phase = "idle" | "pressing" | "opening" | "sliding" | "done";

/*
  Coordinate system: viewBox 0 0 700 500  (7:5)
  Fold point (where all triangles meet) = (350, 250)
  Flap occupies the top half (0..250)
*/

export default function LuxuryEnvelope({ onOpened }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  /* subtle mouse tilt (desktop) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-4.5, 4.5]), { stiffness: 40, damping: 20 });
  const tiltX = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 40, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width * 2 - 1);
    my.set((e.clientY - r.top) / r.height * 2 - 1);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  function openSeal(e: React.MouseEvent | React.KeyboardEvent) {
    e.stopPropagation();
    if (phase !== "idle") return;
    setPhase("pressing");
    setTimeout(() => setPhase("opening"), 200);
    setTimeout(() => setPhase("sliding"), 1000);
    setTimeout(() => setPhase("done"), 2050);
    setTimeout(onOpened, 2400);
  }

  const flapOpen = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding" || phase === "done";
  const fading = phase === "done";

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ opacity: fading ? 0 : 1, y: fading ? 24 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", perspective: 1800, overflow: "visible" }}
    >
      {/* breathing float */}
      <motion.div
        animate={{ y: ["0%", "-1%", "0%"] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ overflow: "visible" }}
      >
        {/* tilt */}
        <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d", overflow: "visible" }}>

          {/* aspect box */}
          <div style={{ position: "relative", width: "100%", paddingBottom: "71.4%", overflow: "visible" }}>

            {/* Contact shadow beneath the envelope on the surface */}
            <div style={{
              position: "absolute",
              left: "6%", right: "6%",
              bottom: "-6%",
              height: "14%",
              background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(60,45,20,0.20) 0%, transparent 72%)",
              filter: "blur(10px)",
              zIndex: 0,
            }} />

            {/* invitation card sliding out */}
            <AnimatePresence>
              {cardVisible && (
                <motion.div
                  initial={{ y: "55%", opacity: 0 }}
                  animate={{ y: "-46%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "absolute", bottom: 0, left: "11%", width: "78%", zIndex: 3, pointerEvents: "none" }}
                >
                  <div style={{
                    background: "linear-gradient(#FEFCF8, #FBF7EF)",
                    borderRadius: 2,
                    aspectRatio: "4/5",
                    boxShadow: "0 10px 34px rgba(60,42,14,0.16), 0 3px 10px rgba(60,42,14,0.08)",
                  }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── ENVELOPE BODY ── */}
            <svg
              viewBox="0 0 700 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", zIndex: 1,
                filter: [
                  "drop-shadow(0px 3px 5px rgba(45,32,12,0.06))",
                  "drop-shadow(0px 14px 34px rgba(45,32,12,0.12))",
                  "drop-shadow(0px 38px 70px rgba(45,32,12,0.07))",
                ].join(" "),
              }}
            >
              <defs>
                {/* soft top-down light on the body */}
                <linearGradient id="bodyLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#F7F3E9" />
                  <stop offset="45%"  stopColor="#F3EFE4" />
                  <stop offset="100%" stopColor="#EAE3D2" />
                </linearGradient>

                {/* pocket triangles (the two side flaps + bottom flap) */}
                <linearGradient id="pocketL" x1="0" y1="0" x2="1" y2="0.4">
                  <stop offset="0%"   stopColor="#E6DDC8" />
                  <stop offset="100%" stopColor="#F1ECDF" />
                </linearGradient>
                <linearGradient id="pocketR" x1="1" y1="0" x2="0" y2="0.4">
                  <stop offset="0%"   stopColor="#E6DDC8" />
                  <stop offset="100%" stopColor="#F1ECDF" />
                </linearGradient>
                <linearGradient id="pocketB" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%"   stopColor="#DED4BB" />
                  <stop offset="100%" stopColor="#EFEADC" />
                </linearGradient>

                {/* shadow the (closed) flap casts onto the pocket below its lower edge */}
                <linearGradient id="flapCast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#000" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </linearGradient>

                {/* paper grain */}
                <filter id="grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="7" stitchTiles="stitch" result="n"/>
                  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.028 0" result="a"/>
                  <feBlend in="SourceGraphic" in2="a" mode="multiply"/>
                </filter>
              </defs>

              {/* body base */}
              <g filter="url(#grain)">
                <rect x="0" y="0" width="700" height="500" rx="2.5" fill="url(#bodyLight)" />
              </g>

              {/* pocket triangles */}
              <path d="M0,0   L0,500   L350,250 Z" fill="url(#pocketL)" />
              <path d="M700,0 L700,500 L350,250 Z" fill="url(#pocketR)" />
              <path d="M0,500 L700,500 L350,250 Z" fill="url(#pocketB)" />

              {/* soft cast shadow just under the diagonal flap edges */}
              <path d="M0,0 L350,250 L700,0 L700,18 L350,268 L0,18 Z" fill="url(#flapCast)" opacity="0.9" />

              {/* crease lines (paper folds) */}
              <line x1="0"   y1="0"   x2="350" y2="250" stroke="rgba(120,100,60,0.16)" strokeWidth="1"/>
              <line x1="700" y1="0"   x2="350" y2="250" stroke="rgba(120,100,60,0.16)" strokeWidth="1"/>
              <line x1="0"   y1="500" x2="350" y2="250" stroke="rgba(96,78,42,0.22)"   strokeWidth="1.1"/>
              <line x1="700" y1="500" x2="350" y2="250" stroke="rgba(96,78,42,0.22)"   strokeWidth="1.1"/>

              {/* outer edge */}
              <rect x="0.5" y="0.5" width="699" height="499" rx="2.5" fill="none" stroke="rgba(150,128,84,0.22)" strokeWidth="1"/>
            </svg>

            {/* ── WAX SEAL (its own layer so it sits above flap fold-line and animates out) ── */}
            <AnimatePresence>
              {!flapOpen && (
                <motion.div
                  key="seal"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ scale: phase === "pressing" ? 0.9 : 1 }}
                  exit={{ opacity: 0, scale: 0.45, transition: { duration: 0.24, ease: "easeIn" } }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    // seal centered at fold point (50% w, 50% h)
                    top: "calc(50% - 11.2%)",
                    left: "calc(50% - 8%)",
                    width: "16%",
                    paddingBottom: "16%",
                    height: 0,
                    zIndex: 25,
                  }}
                >
                  <svg viewBox="0 0 120 120" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                    <defs>
                      <radialGradient id="waxFill" cx="38%" cy="30%" r="72%">
                        <stop offset="0%"   stopColor="#8E2222" />
                        <stop offset="34%"  stopColor="#6E1616" />
                        <stop offset="70%"  stopColor="#520F0F" />
                        <stop offset="100%" stopColor="#360707" />
                      </radialGradient>
                      <radialGradient id="waxSpec" cx="34%" cy="24%" r="34%">
                        <stop offset="0%"   stopColor="#fff" stopOpacity="0.42" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                      </radialGradient>
                      {/* organic wax edge */}
                      <filter id="waxEdge" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.045" numOctaves="3" seed="11" result="t"/>
                        <feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G"/>
                      </filter>
                      <filter id="waxDrop" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#180303" floodOpacity="0.45"/>
                      </filter>
                    </defs>

                    <g transform="translate(60,60)">
                      {/* wax body with irregular edge */}
                      <g filter="url(#waxDrop)">
                        <circle cx="0" cy="0" r="52" fill="url(#waxFill)" filter="url(#waxEdge)" />
                      </g>
                      {/* specular gloss */}
                      <circle cx="0" cy="0" r="52" fill="url(#waxSpec)" filter="url(#waxEdge)" />
                      {/* pressed rims */}
                      <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(255,180,120,0.18)" strokeWidth="1.6"/>
                      <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(12,2,2,0.32)" strokeWidth="0.9"/>

                      {/* embossed rose — highlight pass */}
                      <g fill="none" stroke="rgba(225,155,105,0.62)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M0,-22 C-7,-30 -19,-27 -21,-17 C-23,-8 -15,0 0,5 C15,0 23,-8 21,-17 C19,-27 7,-30 0,-22Z"/>
                        <path d="M0,5 C-9,1 -19,5 -19,14 C-19,23 -9,29 0,32 C9,29 19,23 19,14 C19,5 9,1 0,5Z"/>
                        <path d="M0,-9 C-5,-14 -12,-11 -12,-5 C-12,2 -5,6 0,8 C5,6 12,2 12,-5 C12,-11 5,-14 0,-9Z"/>
                        <path d="M0,32 L0,46"/>
                        <path d="M0,39 C-7,32 -16,35 -16,41 C-11,41 -5,39 0,39Z"/>
                        <path d="M0,37 C7,30 16,33 16,39 C11,39 5,37 0,37Z"/>
                        <circle cx="0" cy="-2" r="2.6" fill="rgba(225,155,105,0.4)" stroke="none"/>
                      </g>
                      {/* embossed rose — shadow pass */}
                      <g fill="none" stroke="rgba(10,2,2,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.7,0.9)">
                        <path d="M0,-22 C-7,-30 -19,-27 -21,-17 C-23,-8 -15,0 0,5 C15,0 23,-8 21,-17 C19,-27 7,-30 0,-22Z"/>
                        <path d="M0,5 C-9,1 -19,5 -19,14 C-19,23 -9,29 0,32 C9,29 19,23 19,14 C19,5 9,1 0,5Z"/>
                        <path d="M0,-9 C-5,-14 -12,-11 -12,-5 C-12,2 -5,6 0,8 C5,6 12,2 12,-5 C12,-11 5,-14 0,-9Z"/>
                        <path d="M0,32 L0,46"/>
                        <path d="M0,39 C-7,32 -16,35 -16,41 C-11,41 -5,39 0,39Z"/>
                        <path d="M0,37 C7,30 16,33 16,39 C11,39 5,37 0,37Z"/>
                      </g>
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FLAP (3-D fold) ── */}
            <motion.div
              animate={{ rotateX: flapOpen ? -180 : 0 }}
              transition={{ duration: 1.2, ease: [0.6, 0, 0.35, 1], delay: 0.06 }}
              style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "50%",
                transformOrigin: "center top", transformStyle: "preserve-3d",
                backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                zIndex: 15, overflow: "visible",
              }}
            >
              {/* FRONT of flap */}
              <svg viewBox="0 0 700 250"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                  backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                  filter: "drop-shadow(0 3px 6px rgba(45,30,10,0.10))" }}
              >
                <defs>
                  {/* flap catches slightly more light at the top */}
                  <linearGradient id="flapLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#F9F5EC" />
                    <stop offset="100%" stopColor="#EFE9DA" />
                  </linearGradient>
                  <filter id="grainF" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="4" stitchTiles="stitch" result="n"/>
                    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.026 0" result="a"/>
                    <feBlend in="SourceGraphic" in2="a" mode="multiply"/>
                  </filter>
                </defs>
                <polygon points="0,0 700,0 350,250"
                  fill="url(#flapLight)" filter="url(#grainF)"
                  stroke="rgba(140,118,74,0.22)" strokeWidth="1" strokeLinejoin="round"/>
                {/* inner shading near the point for subtle depth */}
                <path d="M120,86 L580,86 L350,250 Z" fill="#000" opacity="0.025"/>
                <line x1="1" y1="0.6" x2="699" y2="0.6" stroke="rgba(255,252,244,0.85)" strokeWidth="1.2"/>
              </svg>

              {/* BACK of flap (inside) */}
              <svg viewBox="0 0 700 250"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                  backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                  transform: "rotateX(180deg)" }}
              >
                <defs>
                  <linearGradient id="flapInner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#E9E1CE" />
                    <stop offset="100%" stopColor="#F0EADB" />
                  </linearGradient>
                </defs>
                <polygon points="700,0 0,0 350,250"
                  fill="url(#flapInner)"
                  stroke="rgba(120,98,54,0.16)" strokeWidth="1"/>
              </svg>
            </motion.div>

            {/* ── CLICK TARGET over the seal ── */}
            <AnimatePresence>
              {!flapOpen && (
                <motion.button
                  key="seal-hit"
                  onClick={openSeal}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openSeal(e); }}
                  exit={{ opacity: 0 }}
                  aria-label="Open the invitation"
                  style={{
                    position: "absolute",
                    top: "calc(50% - 11.2%)",
                    left: "calc(50% - 8%)",
                    width: "16%",
                    paddingBottom: "16%",
                    height: 0,
                    borderRadius: "50%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 40,
                    outline: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                />
              )}
            </AnimatePresence>

            {/* idle pulse */}
            {phase === "idle" && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "calc(50% - 11.2%)", left: "calc(50% - 8%)",
                  width: "16%", paddingBottom: "16%", height: 0,
                  borderRadius: "50%", pointerEvents: "none", zIndex: 5,
                }}
                animate={{ boxShadow: ["0 0 0 0px rgba(94,20,20,0.30)", "0 0 0 24px rgba(94,20,20,0)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2 }}
              />
            )}

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
