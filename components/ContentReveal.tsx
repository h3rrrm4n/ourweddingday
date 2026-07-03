"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Minimal placeholder for the invitation content that emerges once the
 * envelope has finished its opening sequence. Intentionally restrained —
 * ready to be replaced with the real invitation page content.
 */
export default function ContentReveal({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: visible ? 0.15 : 0 }}
    >
      <motion.div
        className="h-px bg-[#DCD5C6]"
        initial={false}
        animate={{ width: visible ? 64 : 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: visible ? 0.45 : 0 }}
      />
    </motion.div>
  );
}
