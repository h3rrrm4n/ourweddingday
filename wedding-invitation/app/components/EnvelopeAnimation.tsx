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

  const envelopeY = phase === "idle" ? 0 : phase === "lifting" ? -24 : -30;
  const flapOpen = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding" || phase === "done";

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      aria-label="Բացել հրավերը"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
    >
      {/* Hint text */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute text-center uppercase tracking-widest"
            style={{
              top: -56,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.72rem",
              color: "#A07830",
              letterSpacing: "0.18em",
              animation: "subtlePulse 2.8s ease-in-out infinite",
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
        {/* Card sliding out */}
        <AnimatePresence>
          {cardVisible && (
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: -120, opacity: 1, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ width: 290, bottom: 0 }}
            >
              <div
                style={{
                  background: "linear-gradient(160deg, #FDF9F0 0%, #FAF5E8 60%, #F5E6C8 100%)",
                  border: "1px solid rgba(201,168,76,0.45)",
                  borderRadius: 14,
                  boxShadow: "0 12px 40px rgba(140,100,40,0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
                  padding: "22px 24px 20px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#C9A84C", fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 10 }}>
                  Հարսանյաց Հրավեր
                </div>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", color: "#3D3530", lineHeight: 1.3 }}>
                  Անի{" "}
                  <motion.span
                    style={{ color: "#C9A84C" }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    ♥
                  </motion.span>{" "}
                  Արման
                </div>
                <div style={{ color: "#A07830", fontSize: "12px", marginTop: 8, fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.12em" }}>
                  20 Սեպտեմբերի 2026
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Envelope SVG body ── */}
        <svg
          viewBox="0 0 340 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 22px 52px rgba(120,88,30,0.26))", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDF9F0" />
              <stop offset="60%" stopColor="#FAF4E6" />
              <stop offset="100%" stopColor="#F0DFC0" />
            </linearGradient>
            <linearGradient id="envInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF8F3" />
              <stop offset="100%" stopColor="#EDD9A8" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8F0DC" />
              <stop offset="100%" stopColor="#E8D090" />
            </linearGradient>
            <linearGradient id="foldL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E0C888" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F0DDB8" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="foldR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F0DDB8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E0C888" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="50%" stopColor="#E8D5A3" />
              <stop offset="100%" stopColor="#A07830" />
            </linearGradient>
            <radialGradient id="waxBody" cx="38%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#a83a3a" />
              <stop offset="45%" stopColor="#832525" />
              <stop offset="78%" stopColor="#6b1c1c" />
              <stop offset="100%" stopColor="#4a1212" />
            </radialGradient>
            <radialGradient id="waxSheen" cx="32%" cy="24%" r="40%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3a0f0f" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Envelope body */}
          <rect x="2" y="40" width="336" height="196" rx="10" fill="url(#envBody)" stroke="url(#goldBorder)" strokeWidth="1.2" />
          <rect x="6" y="44" width="328" height="188" rx="8" fill="url(#envInner)" />

          {/* Botanical corner patterns — top-left */}
          <g stroke="#c9ab7a" strokeWidth="0.55" fill="none" opacity="0.38">
            <path d="M18 58 Q28 44 42 54 Q46 62 36 66 Q22 68 18 58Z" />
            <path d="M16 55 Q10 48 6 38" />
            <path d="M315 58 Q305 44 291 54 Q287 62 297 66 Q311 68 315 58Z" />
            <path d="M317 55 Q323 48 327 38" />
            <path d="M18 218 Q28 230 42 222 Q46 214 36 210 Q22 208 18 218Z" />
            <path d="M16 221 Q10 228 6 236" />
            <path d="M315 218 Q305 230 291 222 Q287 214 297 210 Q311 208 315 218Z" />
            <path d="M317 221 Q323 228 327 236" />
          </g>

          {/* Bottom inner fold triangles */}
          <path d="M2 50 L170 148 L2 236" fill="url(#foldL)" stroke="url(#goldBorder)" strokeWidth="0.6" />
          <path d="M338 50 L170 148 L338 236" fill="url(#foldR)" stroke="url(#goldBorder)" strokeWidth="0.6" />

          {/* Wax seal — rendered conditionally based on flapOpen */}
          {!flapOpen && (
            <g transform="translate(122, 98)">
              {/* Irregular wax blob */}
              <path
                filter="url(#waxShadow)"
                fill="url(#waxBody)"
                d="M48 6c5 0 8 5 12 6s10-2 14 1s0 10 3 13s7 7 5 12s-7 6-9 9s1 11-4 13s-10-2-14 0s-6 8-11 8s-7-6-11-8s-10 2-14 0s-1-9-4-13s-9-5-9-9s5-8 5-12s-3-10 0-13s10-2 14-1s7-6 12-6z"
              />
              {/* Glossy highlight */}
              <ellipse cx="34" cy="27" rx="21" ry="14" fill="url(#waxSheen)" />
              {/* Rim */}
              <circle cx="48" cy="48" r="33" fill="none" stroke="#3a0f0f" strokeWidth="0.8" opacity="0.5" />
              <circle cx="48" cy="48" r="29" fill="none" stroke="#c98a5c" strokeWidth="0.5" opacity="0.3" />
              {/* Rose emblem — shadow pass */}
              <g fill="none" stroke="#3a0f0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" transform="translate(1 1)">
                <path d="M48 28c-10 2-12 13-5 18c-8 1-12 10-5 17c2 2 6 3 9 1c1 6 6 9 11 6c4 7 13 6 14-2" />
                <path d="M48 28c3-4 10-4 11 0c2 3 0 7-4 8" />
                <path d="M37 40c-4 2-5 7-1 10" />
                <path d="M48 28v36" />
                <path d="M40 60c2-3 6-3 8-1c2-2 6-2 8 1" />
              </g>
              {/* Rose emblem — highlight pass */}
              <g fill="none" stroke="#e6b98f" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                <path d="M48 28c-10 2-12 13-5 18c-8 1-12 10-5 17c2 2 6 3 9 1c1 6 6 9 11 6c4 7 13 6 14-2" />
                <path d="M48 28c3-4 10-4 11 0c2 3 0 7-4 8" />
                <path d="M37 40c-4 2-5 7-1 10" />
                <path d="M48 28v36" />
                <path d="M40 60c2-3 6-3 8-1c2-2 6-2 8 1" />
              </g>
            </g>
          )}

          {/* Envelope flap — static when closed, disappears when open */}
          {!flapOpen && (
            <path
              d="M2 40 L170 148 L338 40 L338 44 L170 152 L2 44 Z"
              fill="url(#flapGrad)"
              stroke="url(#goldBorder)"
              strokeWidth="1"
            />
          )}

          {/* Gold decorative line on flap crease */}
          {!flapOpen && (
            <line x1="2" y1="40" x2="338" y2="40" stroke="rgba(201,168,76,0.35)" strokeWidth="0.8" />
          )}
        </svg>

        {/* 3-D flap that opens (separate layer for animation) */}
        <motion.div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: 0,
            height: "65%",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            perspective: 1600,
          }}
          animate={{ rotateX: flapOpen ? 180 : 0 }}
          transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg
            viewBox="0 0 340 156"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="flapFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F8F0DC" />
                <stop offset="100%" stopColor="#EBD498" />
              </linearGradient>
              <linearGradient id="gbFlap" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C9A84C" />
                <stop offset="50%" stopColor="#E8D5A3" />
                <stop offset="100%" stopColor="#A07830" />
              </linearGradient>
            </defs>
            {/* Flap triangle */}
            <polygon points="0,0 340,0 170,156" fill="url(#flapFront)" />
            <polygon points="0,0 340,0 170,156" fill="none" stroke="url(#gbFlap)" strokeWidth="1.2" />
            {/* Subtle botanical on flap */}
            <g stroke="#c9ab7a" strokeWidth="0.55" fill="none" opacity="0.35">
              <path d="M50 18 Q60 6 74 14 Q77 21 67 24 Q52 26 50 18Z" />
              <path d="M266 18 Q256 6 242 14 Q239 21 249 24 Q264 26 266 18Z" />
              <path d="M160 8 Q168 0 178 6" />
            </g>
          </svg>
        </motion.div>

        {/* Idle pulse ring */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ borderRadius: 10 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(201,168,76,0.45)", "0 0 0 20px rgba(201,168,76,0)"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
