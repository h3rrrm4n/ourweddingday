"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EnvelopeAnimationProps {
  onOpen: () => void;
}

const W = 400;   // envelope width
const H = 280;   // envelope height
const cx = W / 2; // 200  — center x  (where all folds meet)
const cy = H / 2; // 140  — center y

export default function EnvelopeAnimation({ onOpen }: EnvelopeAnimationProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => setPhase("done"), 1300);
    setTimeout(() => onOpen(), 1700);
  };

  const flapOpen = phase === "opening" || phase === "done";

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
      {/* ── Envelope container ── */}
      <motion.div
        animate={{ y: flapOpen ? -14 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", width: W, height: H, perspective: 1400 }}
      >

        {/* ── LAYER 1 — Body SVG (no flap here) ── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            filter: [
              "drop-shadow(0 2px 4px rgba(60,50,30,0.10))",
              "drop-shadow(0 10px 28px rgba(60,50,30,0.16))",
              "drop-shadow(0 28px 56px rgba(60,50,30,0.10))",
            ].join(" "),
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient id="eBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FDFBF8" />
              <stop offset="100%" stopColor="#F0EAD8" />
            </linearGradient>
            <linearGradient id="eFoldL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#B8A878" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#B8A878" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="eFoldR" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%"   stopColor="#B8A878" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#B8A878" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="eFoldB" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#A09060" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#A09060" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Body */}
          <rect x="0" y="0" width={W} height={H} rx="2"
            fill="url(#eBody)"
            stroke="rgba(170,150,100,0.30)"
            strokeWidth="1"
          />

          {/* Inner fold triangles */}
          <path d={`M0,0 L0,${H} L${cx},${cy} Z`}     fill="url(#eFoldL)" />
          <path d={`M${W},0 L${W},${H} L${cx},${cy} Z`} fill="url(#eFoldR)" />
          <path d={`M0,${H} L${W},${H} L${cx},${cy} Z`} fill="url(#eFoldB)" />

          {/* Crease lines */}
          <line x1="0"  y1="0"  x2={cx} y2={cy} stroke="rgba(150,130,80,0.18)" strokeWidth="0.8"/>
          <line x1={W}  y1="0"  x2={cx} y2={cy} stroke="rgba(150,130,80,0.18)" strokeWidth="0.8"/>
          <line x1="0"  y1={H}  x2={cx} y2={cy} stroke="rgba(130,110,60,0.25)" strokeWidth="0.9"/>
          <line x1={W}  y1={H}  x2={cx} y2={cy} stroke="rgba(130,110,60,0.25)" strokeWidth="0.9"/>
          {/* Top edge highlight */}
          <line x1="0" y1="0" x2={W} y2="0" stroke="rgba(255,250,240,0.6)" strokeWidth="1"/>
        </svg>

        {/* ── LAYER 2 — 3D rotating flap ── */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: cy, // exactly the triangle height
            zIndex: 2,
            transformOrigin: "center top",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          animate={{ rotateX: flapOpen ? -180 : 0 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg
            viewBox={`0 0 ${W} ${cy}`}
            fill="none"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <defs>
              <linearGradient id="eFlapFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#EDE5CE" />
              </linearGradient>
              <linearGradient id="eFlapBorder" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="rgba(170,150,100,0.35)" />
                <stop offset="100%" stopColor="rgba(170,150,100,0.10)" />
              </linearGradient>
            </defs>

            {/* Top flap triangle (base at top, point at bottom-center) */}
            <polygon
              points={`0,0 ${W},0 ${cx},${cy}`}
              fill="url(#eFlapFront)"
              stroke="rgba(160,140,90,0.22)"
              strokeWidth="0.8"
            />
            {/* Subtle inner line parallel to fold */}
            <line x1="0" y1="0" x2={W} y2="0" stroke="rgba(255,250,240,0.7)" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* ── LAYER 3 — Wax seal (on top, exits before flap lifts past mid) ── */}
        <AnimatePresence>
          {!flapOpen && (
            <motion.div
              key="seal"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.55, transition: { duration: 0.28, ease: "easeIn" } }}
              style={{
                position: "absolute",
                // Center the seal at the envelope fold point
                top: cy - 44,
                left: cx - 44,
                width: 88,
                height: 88,
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <svg viewBox="0 0 88 88" fill="none" style={{ width: "100%", height: "100%" }}>
                <defs>
                  <radialGradient id="sWax" cx="36%" cy="28%" r="70%">
                    <stop offset="0%"   stopColor="#C03030" />
                    <stop offset="42%"  stopColor="#8E1818" />
                    <stop offset="76%"  stopColor="#6A0E0E" />
                    <stop offset="100%" stopColor="#480808" />
                  </radialGradient>
                  <radialGradient id="sGloss" cx="33%" cy="24%" r="38%">
                    <stop offset="0%"   stopColor="#fff" stopOpacity="0.48" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <filter id="sDrop" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1A0404" floodOpacity="0.42"/>
                  </filter>
                </defs>

                {/* Heart — centered at 44,44 */}
                <g transform="translate(44,44)" filter="url(#sDrop)">
                  <path fill="url(#sWax)"
                    d="M0,-14 C0,-24 -14,-31 -25,-23 C-37,-14 -37,4 -25,18 C-17,28 -7,34 0,38 C7,34 17,28 25,18 C37,4 37,-14 25,-23 C14,-31 0,-24 0,-14 Z"
                  />
                  <path fill="url(#sGloss)"
                    d="M0,-14 C0,-24 -14,-31 -25,-23 C-37,-14 -37,4 -25,18 C-17,28 -7,34 0,38 C7,34 17,28 25,18 C37,4 37,-14 25,-23 C14,-31 0,-24 0,-14 Z"
                  />
                  {/* botanical engraving — highlight */}
                  <g fill="none" stroke="#F0A878" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
                    <path d="M0,17 C-4,8 -12,1 -19,-2 C-12,5 -5,12 0,17 Z" />
                    <path d="M0,17 C4,8 12,1 19,-2 C12,5 5,12 0,17 Z" />
                    <path d="M-19,-2 C-24,-9 -21,-19 -14,-22" />
                    <path d="M19,-2 C24,-9 21,-19 14,-22" />
                    <path d="M-14,-22 C-9,-27 0,-28 0,-25" />
                    <path d="M14,-22 C9,-27 0,-28 0,-25" />
                    <circle cx="-24" cy="-6" r="1.8" fill="#F0A878"/>
                    <circle cx="24"  cy="-6" r="1.8" fill="#F0A878"/>
                    <circle cx="0"   cy="-27" r="1.8" fill="#F0A878"/>
                  </g>
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

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
          0%, 100% { opacity: 0.38; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
