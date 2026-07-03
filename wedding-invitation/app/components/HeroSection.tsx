"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.14, duration: 0.9, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(123,131,99,0.06) 0%, transparent 70%)",
      }} />

      {/* Eyebrow */}
      <motion.div
        custom={0} initial="hidden" animate="visible" variants={fadeUp}
        className="flex items-center gap-4 mb-8"
      >
        <div style={{ width: 36, height: 1, background: "linear-gradient(to right, transparent, rgba(123,131,99,0.5))" }} />
        <span style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.6rem",
          color: "#7B8363",
          letterSpacing: "0.42em",
          textTransform: "uppercase",
        }}>
          Հարսանյաց Հրավեր
        </span>
        <div style={{ width: 36, height: 1, background: "linear-gradient(to left, transparent, rgba(123,131,99,0.5))" }} />
      </motion.div>

      {/* Photo circle */}
      <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
        <div style={{
          position: "relative",
          width: 188,
          height: 188,
        }}>
          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              border: "1px dashed rgba(123,131,99,0.3)",
            }}
          />
          {/* Photo */}
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            background: "linear-gradient(135deg, #EDF0E8 0%, #D8DDD0 100%)",
            border: "2.5px solid rgba(123,131,99,0.28)",
            boxShadow: "0 0 0 8px rgba(123,131,99,0.06), 0 12px 40px rgba(40,50,30,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Placeholder — replace with <img src="..." /> */}
            <svg viewBox="0 0 80 80" width="54" height="54" fill="none">
              <circle cx="40" cy="28" r="16" fill="rgba(123,131,99,0.35)" />
              <path d="M8 74 Q8 52 40 52 Q72 52 72 74" fill="rgba(123,131,99,0.22)" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Names */}
      <motion.h1
        custom={2} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center mb-3"
        style={{
          fontFamily: "var(--font-cormorant), var(--font-playfair), serif",
          fontSize: "clamp(2.6rem, 8vw, 4.8rem)",
          color: "#7D6248",
          fontStyle: "italic",
          fontWeight: 400,
          letterSpacing: "0.02em",
          lineHeight: 1.1,
        }}
      >
        Անի{" "}
        <motion.span
          style={{ color: "#9A8060", fontStyle: "normal", display: "inline-block" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          &amp;
        </motion.span>
        {" "}Արման
      </motion.h1>

      {/* Tagline */}
      <motion.p
        custom={3} initial="hidden" animate="visible" variants={fadeUp}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
          color: "#7A6E64",
          fontStyle: "italic",
          letterSpacing: "0.06em",
          maxWidth: 360,
          textAlign: "center",
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        Սիրով հրավիրում ենք Ձեզ բաժանել մեր ամենաերջանիկ օրը
      </motion.p>

      {/* Date block */}
      <motion.div
        custom={4} initial="hidden" animate="visible" variants={fadeUp}
        className="flex flex-col items-center gap-1"
      >
        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.8rem, 2.2vw, 1rem)",
          color: "#7B8363",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}>
          20 Սեպտեմբերի · 2026
        </p>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(0.85rem, 2vw, 1rem)",
          color: "#7A6E64",
          letterSpacing: "0.12em",
          fontStyle: "italic",
        }}>
          Շաբաթ
        </p>
      </motion.div>
    </section>
  );
}
