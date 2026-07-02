"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Full-bleed couple photo background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #3A3028 0%, #5A4838 35%, #7A6050 65%, #4A3828 100%)",
        }}
      >
        {/* Photo placeholder — replace with <Image> when photo is ready */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.4 }}
        >
          <svg viewBox="0 0 200 240" width="160" height="200" fill="none" opacity="0.5">
            <circle cx="100" cy="70" r="40" fill="rgba(255,255,255,0.2)" />
            <path d="M20 200 Q20 140 100 140 Q180 140 180 200" fill="rgba(255,255,255,0.15)" />
          </svg>
        </div>
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Bottom gradient fade into content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
          }}
        />
      </div>

      {/* Overlay text */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="font-script mb-3"
          style={{ fontSize: "clamp(1.8rem, 7vw, 2.8rem)", color: "rgba(255,255,255,0.92)" }}
        >
          Save the Date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="font-serif font-bold"
          style={{
            fontSize: "clamp(2.2rem, 9vw, 4rem)",
            color: "#FFFFFF",
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
        >
          Անի & Արման
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center gap-3 my-4"
        >
          <div className="h-px w-14" style={{ background: "rgba(255,255,255,0.5)" }} />
          <span
            className="font-sans"
            style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}
          >
            Ամուսնանում ենք
          </span>
          <div className="h-px w-14" style={{ background: "rgba(255,255,255,0.5)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="font-serif"
          style={{
            fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.05em",
          }}
        >
          20 Սեպտեմբերի 2026
        </motion.p>
      </div>

      {/* Scroll down invitation card section */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-6 pb-12 pt-6 text-center"
        style={{ background: "var(--bg)" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-script mb-1"
          style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)", color: "var(--text-dark)" }}
        >
          Save the Date
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="label-caps mb-5"
        >
          • • • Հրավիրված եք մեր հարսանիքին • • •
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-1"
        >
          <h2
            className="font-serif font-bold"
            style={{ fontSize: "clamp(1.8rem, 7vw, 2.8rem)", color: "var(--text-dark)" }}
          >
            Անի & Արման
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="label-caps mb-5"
        >
          Ամուսնանում ենք
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-7 px-10 py-3 font-serif text-center"
          style={{
            border: "1px solid rgba(44,37,32,0.25)",
            borderRadius: 4,
            fontSize: "clamp(1rem, 4vw, 1.2rem)",
            color: "var(--text-dark)",
            letterSpacing: "0.05em",
          }}
        >
          20 Սեպտեմբերի 2026
        </motion.div>

        {/* Gold heart divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <div className="h-px w-16" style={{ background: "var(--gold-light)" }} />
          <span style={{ fontSize: "1rem" }}>♥</span>
          <div className="h-px w-16" style={{ background: "var(--gold-light)" }} />
        </motion.div>
      </div>
    </section>
  );
}
