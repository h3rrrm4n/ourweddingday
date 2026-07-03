"use client";

import { motion } from "framer-motion";
import Countdown from "./Countdown";
import MapButton from "./MapButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const WEDDING_DATE = new Date("2026-09-12T16:00:00");
const VENUE_ADDRESS = "Villa Rosé, Tuscany, Italy";
const VENUE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(VENUE_ADDRESS);

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
 * finished opening. Kept in the same dusty-rose ("pudra") palette as
 * the envelope, ready to be extended with further sections (schedule,
 * RSVP, etc.).
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
        className="text-[11px] font-medium tracking-[0.3em] uppercase text-ink/70 mb-6"
      >
        Together with their families
      </motion.p>

      <motion.h1 variants={item} className="font-serif leading-[0.95] text-ink">
        <span className="block italic text-[15vw] sm:text-6xl">Sarah</span>
        <span className="block italic text-[#9A7850] text-[9vw] sm:text-4xl my-1">
          &amp;
        </span>
        <span className="block italic text-[15vw] sm:text-6xl">James</span>
      </motion.h1>

      <motion.div variants={item} className="w-12 h-px bg-ink/25 my-8" />

      <motion.p
        variants={item}
        className="font-serif text-lg sm:text-xl text-ink/70 tracking-wide"
      >
        Saturday, the Twelfth of September, 2026
      </motion.p>

      <motion.p
        variants={item}
        className="text-[11px] tracking-[0.2em] uppercase text-ink/55 mt-3"
      >
        {VENUE_ADDRESS}
      </motion.p>

      <motion.div variants={item} className="mt-6">
        <MapButton address={VENUE_ADDRESS} mapUrl={VENUE_MAP_URL} />
      </motion.div>

      <motion.div variants={item} className="w-12 h-px bg-ink/25 my-10" />

      <motion.div variants={item}>
        <Countdown target={WEDDING_DATE} />
      </motion.div>
    </motion.div>
  );
}
