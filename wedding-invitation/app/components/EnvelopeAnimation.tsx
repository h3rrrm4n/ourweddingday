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

  const envelopeY = phase === "idle" ? 0 : phase === "lifting" ? -24 : phase === "opening" ? -30 : -30;
  const flap = phase === "opening" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding" || phase === "done";

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      aria-label="Բացել հրավերը"
    >
      {/* Hint text */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -top-16 text-center text-sm md:text-base tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "#A07830",
              letterSpacing: "0.15em",
            }}
          >
            «Սեղմեք հրավերը բացելու համար»
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
              animate={{ y: -110, opacity: 1, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ width: 280, bottom: 0 }}
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FDF9F0 0%, #FAF8F3 50%, #F5E6C8 100%)",
                  border: "1px solid rgba(201, 168, 76, 0.5)",
                  boxShadow: "0 8px 32px rgba(140, 100, 40, 0.25)",
                  padding: "24px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ color: "#C9A84C", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 10 }}
                >
                  WEDDING INVITATION
                </div>
                <div
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", color: "#3D3530", lineHeight: 1.3 }}
                >
                  Անի <span style={{ color: "#C9A84C" }}>♥</span> Արման
                </div>
                <div
                  style={{ color: "#A07830", fontSize: "12px", marginTop: 8, fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.1em" }}
                >
                  20 Սեպտեմբերի 2026
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope SVG */}
        <svg
          viewBox="0 0 340 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 20px 48px rgba(140,100,40,0.22))" }}
        >
          {/* Envelope body */}
          <rect
            x="4" y="80" width="332" height="156"
            rx="12"
            fill="url(#envelopeGrad)"
            stroke="url(#goldBorder)"
            strokeWidth="1.5"
          />

          {/* Inner envelope texture */}
          <rect
            x="8" y="84" width="324" height="148"
            rx="10"
            fill="url(#innerGrad)"
          />

          {/* Bottom fold triangle left */}
          <path
            d="M4 92 L170 170 L4 236"
            fill="url(#foldLeft)"
            stroke="url(#goldBorder)"
            strokeWidth="0.8"
          />
          {/* Bottom fold triangle right */}
          <path
            d="M336 92 L170 170 L336 236"
            fill="url(#foldRight)"
            stroke="url(#goldBorder)"
            strokeWidth="0.8"
          />

          {/* Gold wax seal */}
          <circle cx="170" cy="170" r="22" fill="url(#sealGrad)" />
          <circle cx="170" cy="170" r="18" fill="url(#sealInner)" />
          <text
            x="170" y="175"
            textAnchor="middle"
            fontSize="14"
            fontFamily="Georgia, serif"
            fill="#FDF9F0"
            fontWeight="bold"
          >
            ♥
          </text>
          <circle cx="170" cy="170" r="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

          {/* Envelope flap (animated) */}
          <motion.path
            d={flap
              ? "M4 80 L170 80 L336 80"
              : "M4 80 L170 160 L336 80"
            }
            fill={flap ? "transparent" : "url(#flapGrad)"}
            stroke="url(#goldBorder)"
            strokeWidth="1.5"
            animate={{
              d: flap
                ? "M4 80 L170 80 L336 80"
                : "M4 80 L170 160 L336 80",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Flap as a proper fold - rotates open */}
          {!flap && (
            <path
              d="M4 80 L170 160 L336 80 L336 84 L170 164 L4 84 Z"
              fill="url(#flapGrad)"
              stroke="url(#goldBorder)"
              strokeWidth="1.2"
            />
          )}

          {/* Gold decorative lines on flap */}
          {!flap && (
            <>
              <line x1="60" y1="100" x2="170" y2="148" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
              <line x1="280" y1="100" x2="170" y2="148" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
            </>
          )}

          {/* Corner ornaments */}
          <g opacity="0.6">
            <path d="M14 90 Q20 86 26 90" stroke="#C9A84C" strokeWidth="1" fill="none" />
            <path d="M314 90 Q320 86 326 90" stroke="#C9A84C" strokeWidth="1" fill="none" />
            <path d="M14 226 Q20 230 26 226" stroke="#C9A84C" strokeWidth="1" fill="none" />
            <path d="M314 226 Q320 230 326 226" stroke="#C9A84C" strokeWidth="1" fill="none" />
          </g>

          <defs>
            <linearGradient id="envelopeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDF9F0" />
              <stop offset="100%" stopColor="#F5E6C8" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF8F3" />
              <stop offset="100%" stopColor="#EDD9A8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8F2E0" />
              <stop offset="100%" stopColor="#EDD9A8" />
            </linearGradient>
            <linearGradient id="foldLeft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EDD9A8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F5E6C8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="foldRight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EDD9A8" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="50%" stopColor="#E8D5A3" />
              <stop offset="100%" stopColor="#A07830" />
            </linearGradient>
            <radialGradient id="sealGrad" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#E8D5A3" />
              <stop offset="100%" stopColor="#A07830" />
            </radialGradient>
            <radialGradient id="sealInner" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#8A5C20" />
            </radialGradient>
          </defs>
        </svg>

        {/* Pulse ring on idle */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{ boxShadow: ["0 0 0 0 rgba(201,168,76,0.5)", "0 0 0 18px rgba(201,168,76,0)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
