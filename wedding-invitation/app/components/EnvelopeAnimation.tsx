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
    setTimeout(() => setPhase("done"), 1300);
    setTimeout(() => onOpen(), 1800);
  };

  const flapOpen = phase !== "idle";

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Open the invitation"
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      style={{ position: "relative", cursor: phase === "idle" ? "pointer" : "default", userSelect: "none" }}
    >
      {/*
        The envelope sits inside a container whose width is set by the parent.
        All internal sizing uses percentages or SVG viewBox so it scales perfectly.
      */}
      <motion.div
        animate={{ y: flapOpen ? -10 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "75%", // 4:3 aspect ratio — envelope height = 75% of width
        }}
      >
        {/* ── Layer 1: Body + inner folds ── */}
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            filter: [
              "drop-shadow(0 2px 4px rgba(60,50,30,0.10))",
              "drop-shadow(0 12px 32px rgba(60,50,30,0.18))",
              "drop-shadow(0 32px 64px rgba(60,50,30,0.10))",
            ].join(" "),
            overflow: "visible",
          }}
        >
          <defs>
            {/* Envelope body — warm cream linen */}
            <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FDFAF4" />
              <stop offset="100%" stopColor="#EDE5CE" />
            </linearGradient>

            {/* Left inner fold shadow */}
            <linearGradient id="foldLG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#B0A070" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#B0A070" stopOpacity="0.01" />
            </linearGradient>

            {/* Right inner fold shadow */}
            <linearGradient id="foldRG" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%"   stopColor="#B0A070" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#B0A070" stopOpacity="0.01" />
            </linearGradient>

            {/* Bottom fold shadow */}
            <linearGradient id="foldBG" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#908050" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#908050" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Envelope body */}
          <rect x="0" y="0" width="400" height="300" rx="3"
            fill="url(#bodyG)"
            stroke="rgba(170,148,100,0.28)"
            strokeWidth="1"
          />

          {/* Inner folds — left, right, bottom */}
          <path d="M0,0 L0,300 L200,150 Z"   fill="url(#foldLG)" />
          <path d="M400,0 L400,300 L200,150 Z" fill="url(#foldRG)" />
          <path d="M0,300 L400,300 L200,150 Z" fill="url(#foldBG)" />

          {/* Crease lines */}
          <line x1="0"   y1="0"   x2="200" y2="150" stroke="rgba(150,128,80,0.18)" strokeWidth="0.9"/>
          <line x1="400" y1="0"   x2="200" y2="150" stroke="rgba(150,128,80,0.18)" strokeWidth="0.9"/>
          <line x1="0"   y1="300" x2="200" y2="150" stroke="rgba(130,108,60,0.24)" strokeWidth="1"/>
          <line x1="400" y1="300" x2="200" y2="150" stroke="rgba(130,108,60,0.24)" strokeWidth="1"/>
        </svg>

        {/* ── Layer 2: Flap that folds open (rotates around top edge) ── */}
        <motion.div
          animate={{ rotateX: flapOpen ? -180 : 0 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50%", // flap height = 150/300 = 50%
            transformOrigin: "center top",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            zIndex: 2,
          }}
        >
          <svg
            viewBox="0 0 400 150"
            fill="none"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <defs>
              <linearGradient id="flapG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#FAF8F0" />
                <stop offset="100%" stopColor="#E8DBBE" />
              </linearGradient>
            </defs>
            {/* Flap triangle: top edge → center point */}
            <polygon
              points="0,0 400,0 200,150"
              fill="url(#flapG)"
              stroke="rgba(155,132,82,0.22)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Top edge highlight */}
            <line x1="0" y1="0.5" x2="400" y2="0.5" stroke="rgba(255,252,240,0.7)" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* ── Layer 3: Wax seal — round with rose, on top of flap ── */}
        <AnimatePresence>
          {!flapOpen && (
            <motion.div
              key="seal"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25, ease: "easeIn" }}
              style={{
                position: "absolute",
                // Seal center at 50% width, 50% height (the fold point)
                top: "calc(50% - 12%)",
                left: "calc(50% - 12%)",
                width: "24%",
                paddingBottom: "24%",
                height: 0,
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                <defs>
                  <radialGradient id="sealR" cx="38%" cy="30%" r="68%">
                    <stop offset="0%"   stopColor="#C03535" />
                    <stop offset="40%"  stopColor="#8C1515" />
                    <stop offset="75%"  stopColor="#6A0C0C" />
                    <stop offset="100%" stopColor="#480808" />
                  </radialGradient>
                  <radialGradient id="sealGlow" cx="35%" cy="26%" r="36%">
                    <stop offset="0%"   stopColor="#fff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <filter id="sealSh" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1a0505" floodOpacity="0.45"/>
                  </filter>
                </defs>

                {/* Outer ring */}
                <circle cx="50" cy="50" r="48" fill="url(#sealR)" filter="url(#sealSh)" />
                <circle cx="50" cy="50" r="48" fill="url(#sealGlow)" />

                {/* Engraved ring */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,200,150,0.25)" strokeWidth="1.2"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(20,5,5,0.3)" strokeWidth="0.7"/>

                {/* Rose engraving — highlight layer */}
                <g fill="none" stroke="rgba(240,180,130,0.6)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                  {/* Rose petals */}
                  <path d="M50,28 C46,22 38,22 36,28 C34,34 38,40 50,42 C62,40 66,34 64,28 C62,22 54,22 50,28Z"/>
                  <path d="M50,42 C44,38 38,40 36,46 C34,52 38,58 50,60 C62,58 66,52 64,46 C62,40 56,38 50,42Z"/>
                  <path d="M50,35 C47,32 43,33 42,37 C41,41 44,44 50,45 C56,44 59,41 58,37 C57,33 53,32 50,35Z"/>
                  {/* Stem */}
                  <path d="M50,60 L50,72"/>
                  {/* Leaves */}
                  <path d="M50,66 C46,62 40,64 40,68 C44,68 48,66 50,66Z"/>
                  <path d="M50,64 C54,60 60,62 60,66 C56,66 52,64 50,64Z"/>
                  {/* Rose center */}
                  <circle cx="50" cy="38" r="3.5"/>
                </g>

                {/* Rose engraving — shadow layer (offset) */}
                <g fill="none" stroke="rgba(20,5,5,0.4)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.5,0.6)">
                  <path d="M50,28 C46,22 38,22 36,28 C34,34 38,40 50,42 C62,40 66,34 64,28 C62,22 54,22 50,28Z"/>
                  <path d="M50,42 C44,38 38,40 36,46 C34,52 38,58 50,60 C62,58 66,52 64,46 C62,40 56,38 50,42Z"/>
                  <path d="M50,35 C47,32 43,33 42,37 C41,41 44,44 50,45 C56,44 59,41 58,37 C57,33 53,32 50,35Z"/>
                  <path d="M50,60 L50,72"/>
                  <path d="M50,66 C46,62 40,64 40,68 C44,68 48,66 50,66Z"/>
                  <path d="M50,64 C54,60 60,62 60,66 C56,66 52,64 50,64Z"/>
                  <circle cx="50" cy="38" r="3.5"/>
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle pulse */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              style={{ position: "absolute", inset: 0, borderRadius: 3, pointerEvents: "none", zIndex: 20 }}
              animate={{ boxShadow: ["0 0 0 0px rgba(180,155,95,0.40)", "0 0 0 18px rgba(180,155,95,0)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
