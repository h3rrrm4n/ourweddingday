"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 flex flex-col items-center"
      style={{ background: "var(--dark-footer)" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-serif font-bold text-center mb-2"
        style={{ fontSize: "clamp(1.8rem, 7vw, 2.8rem)", color: "#FFFFFF" }}
      >
        Անի & Արման
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="font-sans mb-8"
        style={{ fontSize: "0.9rem", color: "var(--gold-light)", letterSpacing: "0.1em" }}
      >
        20 Սեպտեմբերի 2026
      </motion.p>

      {/* Instagram icon */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 44,
            height: 44,
            border: "1.5px solid rgba(255,255,255,0.2)",
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="w-full max-w-xs mb-8 h-px"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="font-sans text-center max-w-xs mb-6"
        style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}
      >
        Սիրով սպասում ենք Ձեզ մեր ամենաերջանիկ օրը միասին նշելու
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span>♥</span>
        <span className="font-sans" style={{ fontSize: "0.82rem", letterSpacing: "0.15em" }}>Սիրով</span>
        <span>♥</span>
      </motion.div>
    </footer>
  );
}
