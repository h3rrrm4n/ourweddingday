"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: Props) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    if (open) return;
    setOpen(true);
    setTimeout(onOpen, 1600);
  }

  return (
    <div
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
      style={{ width: "100%", cursor: open ? "default" : "pointer", userSelect: "none" }}
    >
      {/* aspect-ratio box: 3×2 */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "66.666%" }}>

        {/* ── 1. Envelope body ── */}
        <svg
          viewBox="0 0 600 400"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#FEFCF6" />
              <stop offset="100%" stopColor="#EDE4CC" />
            </linearGradient>

            {/* inner shadow triangles */}
            <linearGradient id="sl" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#9E8A5C" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#9E8A5C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sr" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%"  stopColor="#9E8A5C" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#9E8A5C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sb" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"  stopColor="#7A6840" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#7A6840" stopOpacity="0" />
            </linearGradient>

            {/* drop shadow filter */}
            <filter id="envShadow" x="-10%" y="-10%" width="120%" height="135%">
              <feDropShadow dx="0" dy="8"  stdDeviation="12" floodColor="#5A4820" floodOpacity="0.18" />
              <feDropShadow dx="0" dy="24" stdDeviation="32" floodColor="#5A4820" floodOpacity="0.10" />
            </filter>

            {/* wax seal */}
            <radialGradient id="wax" cx="36%" cy="28%" r="72%">
              <stop offset="0%"   stopColor="#C23535" />
              <stop offset="45%"  stopColor="#8A1515" />
              <stop offset="80%"  stopColor="#640C0C" />
              <stop offset="100%" stopColor="#420808" />
            </radialGradient>
            <radialGradient id="waxhi" cx="34%" cy="26%" r="36%">
              <stop offset="0%"   stopColor="#fff" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1A0404" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* body */}
          <g filter="url(#envShadow)">
            <rect x="0" y="0" width="600" height="400" rx="3" fill="url(#bg)" />
          </g>
          <rect x="0" y="0" width="600" height="400" rx="3" fill="none"
            stroke="rgba(160,138,88,0.30)" strokeWidth="1.2" />

          {/* inner fold triangles */}
          <path d="M0,0   L0,400   L300,200 Z" fill="url(#sl)" />
          <path d="M600,0 L600,400 L300,200 Z" fill="url(#sr)" />
          <path d="M0,400 L600,400 L300,200 Z" fill="url(#sb)" />

          {/* crease lines */}
          <line x1="0"   y1="0"   x2="300" y2="200" stroke="rgba(140,118,72,0.18)" strokeWidth="1"/>
          <line x1="600" y1="0"   x2="300" y2="200" stroke="rgba(140,118,72,0.18)" strokeWidth="1"/>
          <line x1="0"   y1="400" x2="300" y2="200" stroke="rgba(120,98,52,0.24)"  strokeWidth="1.1"/>
          <line x1="600" y1="400" x2="300" y2="200" stroke="rgba(120,98,52,0.24)"  strokeWidth="1.1"/>

          {/* wax seal at center (300, 200) */}
          {!open && (
            <g transform="translate(300,200)" filter="url(#waxShadow)">
              <circle cx="0" cy="0" r="48" fill="url(#wax)" />
              <circle cx="0" cy="0" r="48" fill="url(#waxhi)" />
              {/* outer engraved ring */}
              <circle cx="0" cy="0" r="42" fill="none" stroke="rgba(255,200,150,0.22)" strokeWidth="1.4"/>
              <circle cx="0" cy="0" r="38" fill="none" stroke="rgba(20,5,5,0.28)"  strokeWidth="0.8"/>
              {/* rose — shadow */}
              <g fill="none" stroke="rgba(18,4,4,0.50)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.7,0.8)">
                <path d="M0,-20 C-6,-26 -16,-24 -18,-16 C-20,-8 -14,0 0,4 C14,0 20,-8 18,-16 C16,-24 6,-26 0,-20Z"/>
                <path d="M0,4  C-8,0  -16,4  -16,12 C-16,20 -8,26 0,28 C8,26 16,20 16,12 C16,4 8,0 0,4Z"/>
                <path d="M0,-8  C-4,-12 -10,-10 -10,-4 C-10,2 -4,6 0,8 C4,6 10,2 10,-4 C10,-10 4,-12 0,-8Z"/>
                <path d="M0,28 L0,40"/>
                <path d="M0,34 C-6,28 -14,30 -14,36 C-10,36 -5,34 0,34Z"/>
                <path d="M0,32 C6,26  14,28  14,34 C10,34 5,32 0,32Z"/>
              </g>
              {/* rose — highlight */}
              <g fill="none" stroke="rgba(240,185,135,0.65)" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round">
                <path d="M0,-20 C-6,-26 -16,-24 -18,-16 C-20,-8 -14,0 0,4 C14,0 20,-8 18,-16 C16,-24 6,-26 0,-20Z"/>
                <path d="M0,4  C-8,0  -16,4  -16,12 C-16,20 -8,26 0,28 C8,26 16,20 16,12 C16,4 8,0 0,4Z"/>
                <path d="M0,-8  C-4,-12 -10,-10 -10,-4 C-10,2 -4,6 0,8 C4,6 10,2 10,-4 C10,-10 4,-12 0,-8Z"/>
                <path d="M0,28 L0,40"/>
                <path d="M0,34 C-6,28 -14,30 -14,36 C-10,36 -5,34 0,34Z"/>
                <path d="M0,32 C6,26  14,28  14,34 C10,34 5,32 0,32Z"/>
              </g>
            </g>
          )}
        </svg>

        {/* ── 2. Flap (3-D fold, rotates around its top edge) ── */}
        <motion.div
          animate={{ rotateX: open ? -180 : 0 }}
          transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "50%",                  // flap height = 200 / 400 = 50 %
            transformOrigin: "center top",
            transformStyle: "preserve-3d",
            backfaceVisibility: "visible",
            WebkitBackfaceVisibility: "visible",
            zIndex: 20,
            overflow: "visible",
          }}
        >
          {/* front face */}
          <svg viewBox="0 0 600 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", backfaceVisibility: "visible" }}>
            <defs>
              <linearGradient id="ff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E8DFCA" />
              </linearGradient>
            </defs>
            <polygon points="0,0 600,0 300,200" fill="url(#ff)" stroke="rgba(150,128,78,0.22)" strokeWidth="1" strokeLinejoin="round"/>
            <line x1="0" y1="0.5" x2="600" y2="0.5" stroke="rgba(255,252,240,0.7)" strokeWidth="1.2"/>
          </svg>

          {/* back face (shows when fully open, slightly warmer inner tint) */}
          <svg viewBox="0 0 600 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", backfaceVisibility: "visible", transform: "rotateX(180deg)" }}>
            <defs>
              <linearGradient id="bf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#EDE4CC" />
                <stop offset="100%" stopColor="#E0D5BA" />
              </linearGradient>
            </defs>
            <polygon points="600,0 0,0 300,200" fill="url(#bf)" stroke="rgba(140,118,68,0.18)" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* ── 3. Seal AnimatePresence exit ── */}
        <AnimatePresence>
          {!open && (
            <motion.div
              key="seal-overlay"
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.22 } }}
              style={{
                position: "absolute",
                // center = (50% w, 50% h). seal = 16% w. h = 66.6% w → half-seal-as-%-of-h = (8%w)/(0.666w) = 12%h
                top:  "calc(50% - 12%)",
                left: "calc(50% - 8%)",
                width: "16%",
                paddingBottom: "16%",
                height: 0,
                zIndex: 30,
                pointerEvents: "none",
              }}
            >
              {/* This invisible div just carries the exit animation;
                  the actual seal is drawn in the SVG above.
                  We use a real SVG duplicate here so it can animate out properly. */}
              <svg viewBox="0 0 96 96" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <defs>
                  <radialGradient id="wax2" cx="36%" cy="28%" r="72%">
                    <stop offset="0%"   stopColor="#C23535" />
                    <stop offset="45%"  stopColor="#8A1515" />
                    <stop offset="80%"  stopColor="#640C0C" />
                    <stop offset="100%" stopColor="#420808" />
                  </radialGradient>
                  <radialGradient id="waxhi2" cx="34%" cy="26%" r="36%">
                    <stop offset="0%"   stopColor="#fff" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <filter id="ws2" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1A0404" floodOpacity="0.45"/>
                  </filter>
                </defs>
                <g transform="translate(48,48)" filter="url(#ws2)">
                  <circle cx="0" cy="0" r="46" fill="url(#wax2)" />
                  <circle cx="0" cy="0" r="46" fill="url(#waxhi2)" />
                  <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(255,200,150,0.22)" strokeWidth="1.4"/>
                  <circle cx="0" cy="0" r="36" fill="none" stroke="rgba(20,5,5,0.28)" strokeWidth="0.8"/>
                  <g fill="none" stroke="rgba(240,185,135,0.65)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M0,-19 C-5,-25 -15,-23 -17,-15 C-19,-7 -13,0 0,4 C13,0 19,-7 17,-15 C15,-23 5,-25 0,-19Z"/>
                    <path d="M0,4 C-8,0 -15,4 -15,11 C-15,19 -7,25 0,27 C7,25 15,19 15,11 C15,4 8,0 0,4Z"/>
                    <path d="M0,-8 C-4,-11 -9,-9 -9,-4 C-9,2 -4,5 0,7 C4,5 9,2 9,-4 C9,-9 4,-11 0,-8Z"/>
                    <path d="M0,27 L0,38"/>
                    <path d="M0,32 C-5,27 -13,29 -13,34 C-9,34 -4,32 0,32Z"/>
                    <path d="M0,31 C5,26 13,28 13,33 C9,33 4,31 0,31Z"/>
                  </g>
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* idle pulse */}
        {!open && (
          <motion.div
            style={{ position: "absolute", inset: 0, borderRadius: 3, pointerEvents: "none", zIndex: 5 }}
            animate={{ boxShadow: ["0 0 0 0px rgba(170,145,85,0.40)", "0 0 0 20px rgba(170,145,85,0)"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}
