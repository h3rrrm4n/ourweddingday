"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 flex flex-col items-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(123,131,99,0.05) 40%, rgba(245,230,200,0.15) 100%)",
      }}
    >
      {/* Top ornamental border */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg mb-10"
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(123,131,99,0.5), transparent)",
        }}
      />

      {/* Monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-8"
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, rgba(245,230,200,0.8), rgba(232,213,163,0.6))",
            border: "2px solid rgba(123,131,99,0.4)",
            boxShadow: "0 4px 24px rgba(140,100,40,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "1.8rem",
              color: "#5E6650",
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}
          >
            Ա&Ա
          </span>
        </div>
      </motion.div>

      {/* Main message */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-md mb-8"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(1rem, 2.8vw, 1.2rem)",
          color: "#6B5E4E",
          lineHeight: 1.75,
          fontStyle: "italic",
        }}
      >
        «Սիրով սպասում ենք Ձեզ մեր ամենաերջանիկ օրը միասին նշելու»
      </motion.p>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex items-center gap-4 w-full max-w-xs mb-6"
      >
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(123,131,99,0.4))" }} />
        <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
          <path
            d="M14 3 Q18 8 14 14 Q10 8 14 3Z"
            fill="rgba(123,131,99,0.5)"
          />
          <path
            d="M14 14 Q18 20 14 25 Q10 20 14 14Z"
            fill="rgba(123,131,99,0.35)"
          />
          <path
            d="M3 14 Q8 10 14 14 Q8 18 3 14Z"
            fill="rgba(123,131,99,0.35)"
          />
          <path
            d="M14 14 Q20 10 25 14 Q20 18 14 14Z"
            fill="rgba(123,131,99,0.5)"
          />
          <circle cx="14" cy="14" r="2.5" fill="#7B8363" />
        </svg>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(123,131,99,0.4))" }} />
      </motion.div>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.78rem",
          color: "#B09870",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        20 Սեպտեմբերի 2026
      </motion.p>
    </footer>
  );
}
