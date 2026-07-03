"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/**
 * The main wedding page — what the guest sees once the envelope has
 * finished opening. Kept in the same restrained, editorial palette as
 * the envelope (milk / ivory / burgundy), ready to be extended with
 * further sections (schedule, RSVP, etc.).
 */
export default function WeddingHero() {
  return (
    <motion.div
      className="flex flex-col items-center text-center px-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={item}
        className="text-[11px] font-medium tracking-[0.3em] uppercase text-burgundy mb-6"
      >
        Together with their families
      </motion.p>

      <motion.h1
        variants={item}
        className="font-serif leading-[0.95] text-[#2E2A26]"
      >
        <span className="block italic text-[15vw] sm:text-6xl">Sarah</span>
        <span className="block italic text-burgundy text-[9vw] sm:text-4xl my-1">
          &amp;
        </span>
        <span className="block italic text-[15vw] sm:text-6xl">James</span>
      </motion.h1>

      <motion.div variants={item} className="w-12 h-px bg-[#D9CBB0] my-8" />

      <motion.p
        variants={item}
        className="font-serif text-lg sm:text-xl text-[#6B6459] tracking-wide"
      >
        Saturday, the Twelfth of September, 2026
      </motion.p>

      <motion.p
        variants={item}
        className="text-[11px] tracking-[0.2em] uppercase text-[#8C8278] mt-3"
      >
        Villa Rosé · Tuscany, Italy
      </motion.p>
    </motion.div>
  );
}
