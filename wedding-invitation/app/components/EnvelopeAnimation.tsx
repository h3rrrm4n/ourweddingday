"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props { onOpen: () => void; }

/* Embossed floral SVG paths rendered as subtle raised texture */
const FloralEmboss = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 390 844"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {/* Top-left cluster */}
    <g opacity="0.18" stroke="#5A3E28" strokeWidth="1">
      <path d="M30 60 Q40 40 55 50 Q45 70 30 60Z" />
      <path d="M55 50 Q75 35 80 55 Q60 65 55 50Z" />
      <path d="M42 80 Q50 65 65 72 Q58 88 42 80Z" />
      <line x1="42" y1="90" x2="42" y2="120" />
      <path d="M42 100 Q35 95 32 88" />
      <path d="M42 110 Q50 105 53 98" />
      <circle cx="60" cy="140" r="2" />
      <circle cx="80" cy="160" r="1.5" />
      <path d="M90 40 Q100 25 112 35 Q105 50 90 40Z" />
      <path d="M25 150 Q32 135 45 142 Q38 158 25 150Z" />
    </g>
    {/* Top-right cluster */}
    <g opacity="0.18" stroke="#5A3E28" strokeWidth="1" transform="translate(390,0) scale(-1,1)">
      <path d="M30 60 Q40 40 55 50 Q45 70 30 60Z" />
      <path d="M55 50 Q75 35 80 55 Q60 65 55 50Z" />
      <path d="M42 80 Q50 65 65 72 Q58 88 42 80Z" />
      <line x1="42" y1="90" x2="42" y2="120" />
      <path d="M42 100 Q35 95 32 88" />
      <path d="M42 110 Q50 105 53 98" />
      <circle cx="60" cy="140" r="2" />
      <path d="M90 40 Q100 25 112 35 Q105 50 90 40Z" />
    </g>
    {/* Bottom-left */}
    <g opacity="0.14" stroke="#5A3E28" strokeWidth="1" transform="translate(0,844) scale(1,-1)">
      <path d="M20 30 Q30 15 45 25 Q38 42 20 30Z" />
      <path d="M50 20 Q65 8 72 28 Q55 36 50 20Z" />
      <line x1="35" y1="50" x2="35" y2="80" />
      <circle cx="55" cy="100" r="2" />
      <circle cx="30" cy="110" r="1.5" />
    </g>
    {/* Bottom-right */}
    <g opacity="0.14" stroke="#5A3E28" strokeWidth="1" transform="translate(390,844) scale(-1,-1)">
      <path d="M20 30 Q30 15 45 25 Q38 42 20 30Z" />
      <path d="M50 20 Q65 8 72 28 Q55 36 50 20Z" />
      <line x1="35" y1="50" x2="35" y2="80" />
      <circle cx="55" cy="100" r="2" />
    </g>
    {/* Scattered dots */}
    {[
      [150, 80], [280, 120], [60, 300], [330, 250],
      [180, 700], [80, 620], [300, 680], [350, 420],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill="#5A3E28" opacity="0.12" />
    ))}
  </svg>
);

/* Envelope fold lines */
const EnvelopeFolds = ({ flapped }: { flapped: boolean }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 390 844"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {/* Left diagonal fold */}
    <line x1="0" y1="844" x2="195" y2="500" stroke="rgba(90,62,40,0.15)" strokeWidth="1" />
    {/* Right diagonal fold */}
    <line x1="390" y1="844" x2="195" y2="500" stroke="rgba(90,62,40,0.15)" strokeWidth="1" />
    {/* Top flap fold line */}
    <line x1="0" y1="330" x2="390" y2="330" stroke="rgba(90,62,40,0.12)" strokeWidth="0.8" />

    {/* Top flap — opens upward */}
    <motion.path
      d={flapped ? "M0,330 L195,0 L390,330" : "M0,330 L195,530 L390,330"}
      fill={flapped ? "rgba(200,185,165,0.6)" : "rgba(212,196,175,0.9)"}
      stroke="rgba(90,62,40,0.2)"
      strokeWidth="0.8"
      animate={{ d: flapped ? "M0,330 L195,0 L390,330" : "M0,330 L195,530 L390,330" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  </svg>
);

export default function EnvelopeAnimation({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "lifting" | "flapping" | "sliding" | "done">("idle");

  const handleTap = () => {
    if (phase !== "idle") return;
    setPhase("lifting");
    setTimeout(() => setPhase("flapping"), 350);
    setTimeout(() => setPhase("sliding"), 900);
    setTimeout(() => setPhase("done"), 1600);
    setTimeout(() => onOpen(), 1900);
  };

  const isFlapped = phase === "flapping" || phase === "sliding" || phase === "done";
  const cardVisible = phase === "sliding" || phase === "done";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end cursor-pointer select-none envelope-texture"
      onClick={handleTap}
      role="button"
      aria-label="Բացել ծրարը"
      animate={{
        y: phase === "lifting" ? -20 : 0,
        scale: phase === "lifting" ? 1.01 : 1,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
    >
      {/* Embossed floral texture */}
      <FloralEmboss />

      {/* Envelope fold lines & animated flap */}
      <EnvelopeFolds flapped={isFlapped} />

      {/* Invitation card sliding out */}
      <AnimatePresence>
        {cardVisible && (
          <motion.div
            initial={{ y: 0, opacity: 0, scale: 0.92 }}
            animate={{ y: -280, opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ bottom: "30%", width: "75%", maxWidth: 300 }}
          >
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: "linear-gradient(160deg, #FDFAF4 0%, #F5ECD8 100%)",
                boxShadow: "0 16px 48px rgba(44,37,32,0.22)",
                border: "1px solid rgba(184,148,42,0.25)",
              }}
            >
              <p className="font-script text-sm mb-2" style={{ color: "#B8942A", fontSize: "1.1rem" }}>Save the Date</p>
              <p className="font-serif text-xl font-bold" style={{ color: "#2C2520" }}>
                Անի <span style={{ color: "#B8942A" }}>♥</span> Արման
              </p>
              <div className="my-3 h-px" style={{ background: "rgba(184,148,42,0.3)" }} />
              <p className="font-sans text-xs uppercase tracking-widest" style={{ color: "#9C8E82", letterSpacing: "0.2em" }}>
                20 Սեպտեմբերի 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wax seal */}
      <motion.div
        className="absolute z-30"
        style={{ top: "calc(50% - 60px)", left: "50%", transform: "translateX(-50%)" }}
        animate={
          isFlapped
            ? { scale: 0.85, opacity: 0.6, y: -30 }
            : phase === "idle"
            ? { scale: [1, 1.03, 1] }
            : {}
        }
        transition={
          phase === "idle"
            ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        <svg viewBox="0 0 110 110" width="110" height="110" fill="none">
          {/* Wax blob */}
          <path
            d="M55 5 C70 5 88 14 95 28 C102 42 100 60 92 72 C84 84 68 95 55 95 C42 95 26 84 18 72 C10 60 8 42 15 28 C22 14 40 5 55 5Z"
            fill="url(#sealWax)"
          />
          <path
            d="M55 10 C68 10 84 18 91 31 C98 44 96 60 89 71 C82 82 67 92 55 92 C43 92 28 82 21 71 C14 60 12 44 19 31 C26 18 42 10 55 10Z"
            fill="url(#sealWaxInner)"
            opacity="0.7"
          />
          {/* Rose emboss */}
          <g transform="translate(55,55)" opacity="0.9">
            <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(255,200,180,0.3)" strokeWidth="1" />
            {/* Petals */}
            <path d="M0,-14 Q6,-9 6,0 Q6,9 0,14 Q-6,9 -6,0 Q-6,-9 0,-14Z" fill="rgba(255,200,180,0.2)" stroke="rgba(255,200,180,0.5)" strokeWidth="0.8" />
            <path d="M14,0 Q9,6 0,6 Q-9,6 -14,0 Q-9,-6 0,-6 Q9,-6 14,0Z" fill="rgba(255,200,180,0.2)" stroke="rgba(255,200,180,0.5)" strokeWidth="0.8" />
            <path d="M-10,-10 Q-4,-12 0,-8 Q-4,-4 -10,-10Z" fill="rgba(255,200,180,0.3)" />
            <path d="M10,-10 Q16,-4 12,0 Q8,-4 10,-10Z" fill="rgba(255,200,180,0.3)" />
            {/* Stem + leaves */}
            <line x1="0" y1="14" x2="0" y2="24" stroke="rgba(255,200,180,0.5)" strokeWidth="1" />
            <path d="M0 18 Q-6 15 -7 10" stroke="rgba(255,200,180,0.4)" strokeWidth="0.8" fill="none" />
            <path d="M0 21 Q6 18 7 13" stroke="rgba(255,200,180,0.4)" strokeWidth="0.8" fill="none" />
            {/* Center */}
            <circle cx="0" cy="0" r="4" fill="rgba(255,180,160,0.4)" />
            <circle cx="0" cy="0" r="2" fill="rgba(255,160,140,0.5)" />
          </g>

          <defs>
            <radialGradient id="sealWax" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#B03030" />
              <stop offset="60%" stopColor="#8B2020" />
              <stop offset="100%" stopColor="#6A1515" />
            </radialGradient>
            <radialGradient id="sealWaxInner" cx="35%" cy="30%">
              <stop offset="0%" stopColor="#C04040" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7A1818" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Bottom hint text */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute bottom-12 flex flex-col items-center gap-3 z-30"
          >
            <p
              className="font-sans text-center px-8"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(90,62,40,0.7)",
              }}
            >
              Սեղմեք հրավերը բացելու համար
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "rgba(90,62,40,0.5)", fontSize: "1.2rem" }}
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle pulse effect on seal */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: "calc(50% - 60px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: 110,
              height: 110,
            }}
            animate={{ boxShadow: ["0 0 0 0 rgba(139,32,32,0.4)", "0 0 0 20px rgba(139,32,32,0)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
