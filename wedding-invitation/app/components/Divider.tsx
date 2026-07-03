"use client";

import { motion } from "framer-motion";

export default function Divider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-4 my-4 px-8 max-w-2xl mx-auto w-full"
    >
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(123,131,99,0.45))",
        }}
      />
      <svg viewBox="0 0 60 20" width="60" height="20" fill="none">
        <path d="M5 10 Q15 2 30 10 Q45 18 55 10" stroke="rgba(123,131,99,0.6)" strokeWidth="0.8" fill="none" />
        <circle cx="30" cy="10" r="3" fill="rgba(123,131,99,0.5)" />
        <circle cx="10" cy="9" r="1.5" fill="rgba(123,131,99,0.35)" />
        <circle cx="50" cy="9" r="1.5" fill="rgba(123,131,99,0.35)" />
      </svg>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to left, transparent, rgba(123,131,99,0.45))",
        }}
      />
    </motion.div>
  );
}
