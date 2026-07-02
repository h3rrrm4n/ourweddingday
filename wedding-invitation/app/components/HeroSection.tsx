"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function HeroSection() {
  return (
    <>
      {/* ── PHOTO HERO ── */}
      <section
        className="relative w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Background photo (dark overlay) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #2E2520 0%, #4A3C32 35%, #6A5648 65%, #3A2E28 100%)",
          }}
        >
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.52) 100%)",
            }}
          />
          {/* Bottom fade to cream */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 160,
              background: "linear-gradient(to bottom, transparent 0%, #F5F0E8 100%)",
            }}
          />
        </div>

        {/* Text overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <motion.p {...fadeUp(0.2)} className="font-script mb-2"
            style={{ fontSize: "clamp(1.8rem, 8vw, 3rem)", color: "rgba(255,255,255,0.93)" }}>
            Save the Date
          </motion.p>

          <motion.h1 {...fadeUp(0.4)} className="font-serif font-bold"
            style={{ fontSize: "clamp(2.4rem, 10vw, 4.2rem)", color: "#FFFFFF", letterSpacing: "0.01em", lineHeight: 1.1 }}>
            Անի & Արման
          </motion.h1>

          <motion.div {...fadeUp(0.55)} className="flex items-center gap-3 my-4">
            <div className="h-px w-14" style={{ background: "rgba(255,255,255,0.45)" }} />
            <span className="caps-label" style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.28em" }}>
              Ամուսնանում ենք
            </span>
            <div className="h-px w-14" style={{ background: "rgba(255,255,255,0.45)" }} />
          </motion.div>

          <motion.p {...fadeUp(0.68)} className="font-serif"
            style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)", color: "rgba(255,255,255,0.88)", letterSpacing: "0.04em" }}>
            20 Սեպտեմբերի 2026
          </motion.p>
        </div>
      </section>

      {/* ── INVITATION CARD (below photo hero) ── */}
      <section
        className="relative w-full flex flex-col items-center px-6 py-16 text-center"
        style={{
          background: "linear-gradient(180deg, #F5F0E8 0%, #EDE5D4 40%, #E8DEC8 80%, #F0E8D4 100%)",
        }}
      >
        {/* Top dot */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-px h-10 mb-5"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(184,149,46,0.5))" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-script mb-3"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "#2A2118" }}
        >
          Save the Date
        </motion.p>

        {/* Dots row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-px" style={{ background: "rgba(184,149,46,0.4)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(184,149,46,0.5)" }} />
          <p className="caps-label" style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}>
            Հրավիրված եք մեր հարսանիքին
          </p>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(184,149,46,0.5)" }} />
          <div className="w-8 h-px" style={{ background: "rgba(184,149,46,0.4)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(107,94,80,0.3)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(107,94,80,0.5)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(107,94,80,0.3)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-serif font-bold mb-2"
          style={{ fontSize: "clamp(1.9rem, 8vw, 3rem)", color: "#2A2118", letterSpacing: "0.01em" }}
        >
          Անի & Արման
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="caps-label mb-6"
          style={{ letterSpacing: "0.3em" }}
        >
          Ամուսնանում ենք
        </motion.p>

        {/* Date box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38, duration: 0.6 }}
          className="mb-8 px-8 py-3 font-serif text-center"
          style={{
            border: "1px solid rgba(42,33,24,0.22)",
            borderRadius: 3,
            fontSize: "clamp(1rem, 4vw, 1.2rem)",
            color: "#2A2118",
            letterSpacing: "0.04em",
            position: "relative",
          }}
        >
          {/* Corner marks */}
          {[
            { top: -4, left: -4 }, { top: -4, right: -4 },
            { bottom: -4, left: -4 }, { bottom: -4, right: -4 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2"
              style={{
                ...pos,
                borderTop: pos.top !== undefined ? "1.5px solid rgba(42,33,24,0.3)" : undefined,
                borderBottom: pos.bottom !== undefined ? "1.5px solid rgba(42,33,24,0.3)" : undefined,
                borderLeft: pos.left !== undefined ? "1.5px solid rgba(42,33,24,0.3)" : undefined,
                borderRight: pos.right !== undefined ? "1.5px solid rgba(42,33,24,0.3)" : undefined,
              }}
            />
          ))}
          20 Սեպտեմբերի 2026
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(184,149,46,0.7)", fontSize: "1.2rem" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
