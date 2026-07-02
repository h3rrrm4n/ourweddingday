"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 flex flex-col items-center"
      style={{ background: "#1A1510" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-serif font-bold text-center mb-2"
        style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "#FFFFFF" }}
      >
        Անի & Արման
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.7 }}
        className="font-sans mb-8"
        style={{ fontSize: "0.88rem", color: "#D4B05A", letterSpacing: "0.12em" }}
      >
        20 Սեպտեմբերի 2026
      </motion.p>

      {/* Instagram */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex items-center justify-center rounded-full"
        style={{ width: 46, height: 46, border: "1.5px solid rgba(255,255,255,0.18)", cursor: "pointer" }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4"/>
          <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,0.55)"/>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="w-full max-w-xs mb-8 h-px"
        style={{ background: "rgba(255,255,255,0.1)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="font-sans text-center max-w-xs mb-6"
        style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}
      >
        Սիրով սպասում ենք Ձեզ մեր ամենաերջանիկ օրը միասին նշելու
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2.5"
      >
        <span style={{ color: "#B8952E", fontSize: "0.95rem" }}>♥</span>
        <span className="font-sans" style={{ fontSize: "0.78rem", color: "#B8952E", letterSpacing: "0.2em" }}>Սիրով</span>
        <span style={{ color: "#B8952E", fontSize: "0.95rem" }}>♥</span>
      </motion.div>
    </footer>
  );
}
