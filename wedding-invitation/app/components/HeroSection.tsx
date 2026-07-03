"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Photo placeholder */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative mb-10"
      >
        <div
          className="rounded-full overflow-hidden"
          style={{
            width: 200,
            height: 200,
            border: "3px solid rgba(201,168,76,0.5)",
            boxShadow: "0 8px 48px rgba(140,100,40,0.2), 0 0 0 8px rgba(201,168,76,0.08)",
          }}
        >
          {/* Placeholder image */}
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F5E6C8 0%, #EDD9A8 50%, #C9A84C22 100%)" }}
          >
            <svg viewBox="0 0 80 80" width="60" height="60" fill="none">
              <circle cx="40" cy="28" r="16" fill="rgba(201,168,76,0.35)" />
              <path d="M10 72 Q10 50 40 50 Q70 50 70 72" fill="rgba(201,168,76,0.25)" />
            </svg>
            <span style={{ fontSize: 11, color: "#A07830", marginTop: 4, fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
              Ձեր լուսանկարը
            </span>
          </div>
        </div>

        {/* Gold ring ornament */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-full pointer-events-none"
          style={{
            border: "1px dashed rgba(201,168,76,0.3)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Names */}
      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center mb-4"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
          color: "#3D3530",
          letterSpacing: "0.02em",
          lineHeight: 1.1,
        }}
      >
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
      </motion.h1>

      {/* Date */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col items-center gap-2 mb-8"
      >
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
            color: "#A07830",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          20 Սեպտեմբերի 2026
        </p>
      </motion.div>

      {/* Decorative divider */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex items-center gap-4 w-full max-w-sm"
      >
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5))" }} />
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
          <path d="M20 4 L22 16 L34 16 L24 24 L28 36 L20 28 L12 36 L16 24 L6 16 L18 16 Z" fill="rgba(201,168,76,0.4)" />
          <circle cx="20" cy="20" r="3" fill="#C9A84C" />
        </svg>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.5))" }} />
      </motion.div>

      {/* Sub-tagline */}
      <motion.p
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-6 text-center"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.85rem, 2vw, 1rem)",
          color: "#8B7355",
          letterSpacing: "0.08em",
          fontStyle: "italic",
          maxWidth: 400,
        }}
      >
        Սիրով հրավիրում ենք Ձեզ բաժանել մեր երջանկությունը
      </motion.p>
    </section>
  );
}
