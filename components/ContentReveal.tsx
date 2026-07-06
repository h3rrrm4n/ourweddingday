"use client";

import { motion } from "framer-motion";
import WeddingHero from "./WeddingHero";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Mounts and fades in the main wedding page once the envelope has
 * finished its opening sequence.
 */
export default function ContentReveal({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1, ease: EASE, delay: visible ? 0.2 : 0 }}
    >
      {visible && <WeddingHero />}
    </motion.div>
  );
}
