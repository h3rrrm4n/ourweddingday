"use client";

import { motion } from "framer-motion";
import WaxSeal from "./WaxSeal";

export type Stage = "idle" | "opening" | "opened";

const EASE = [0.22, 1, 0.36, 1] as const;

const TIMING = {
  flapDelay: 0.05,
  flapDuration: 1.0,
  cardDelay: 0.45,
  cardDuration: 0.85,
  envelopeFadeDelay: 1.25,
  envelopeFadeDuration: 0.55,
};

export default function Envelope({
  stage,
  onSealClick,
}: {
  stage: Stage;
  onSealClick: () => void;
}) {
  const isIdle = stage === "idle";

  return (
    <motion.div
      className="relative w-[78vw] sm:w-[68vw] max-w-[560px] min-w-[280px] aspect-[3/2]"
      style={{
        perspective: 1800,
        pointerEvents: isIdle ? "auto" : "none",
      }}
      animate={
        isIdle
          ? { y: [0, -7, 0], rotate: [0, 0.35, 0], opacity: 1 }
          : { opacity: 0, y: 22 }
      }
      transition={
        isIdle
          ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
          : {
              delay: TIMING.envelopeFadeDelay,
              duration: TIMING.envelopeFadeDuration,
              ease: EASE,
            }
      }
    >
      {/* Envelope body / pocket */}
      <div
        className="paper-grain absolute inset-0 overflow-hidden rounded-[3px]"
        style={{
          background: "#F3EFE4",
          boxShadow:
            "0 34px 70px -28px rgba(35,25,15,0.38), 0 12px 26px -16px rgba(35,25,15,0.22)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            clipPath: "polygon(0 0, 46% 50%, 0 100%)",
            background: "linear-gradient(120deg, rgba(25,17,10,0.05), rgba(25,17,10,0) 72%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            clipPath: "polygon(100% 0, 54% 50%, 100% 100%)",
            background: "linear-gradient(240deg, rgba(25,17,10,0.05), rgba(25,17,10,0) 72%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            clipPath: "polygon(0 100%, 50% 40%, 100% 100%)",
            background: "linear-gradient(0deg, rgba(25,17,10,0.055), rgba(25,17,10,0) 62%)",
          }}
        />
      </div>

      {/* Invitation card, tucked inside, slides upward on open */}
      <motion.div
        className="paper-grain absolute left-[8%] right-[8%] top-[12%] bottom-[7%] rounded-[2px]"
        style={{
          background: "#FBFAF6",
          boxShadow: "0 20px 44px -22px rgba(35,25,15,0.3)",
          zIndex: 10,
        }}
        animate={{ y: isIdle ? 0 : "-64%" }}
        transition={{
          delay: TIMING.cardDelay,
          duration: TIMING.cardDuration,
          ease: EASE,
        }}
      />

      {/* Triangular flap, rotates open like a door on its top hinge */}
      <motion.div
        className="paper-grain absolute top-0 left-0 w-full h-[58%] origin-top"
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          background: "linear-gradient(200deg, #F6F2E8 0%, #F1ECDF 100%)",
          backfaceVisibility: "hidden",
          filter: "drop-shadow(0 10px 16px rgba(35,25,15,0.14))",
          zIndex: 20,
        }}
        animate={{ rotateX: isIdle ? 0 : -172 }}
        transition={{
          delay: TIMING.flapDelay,
          duration: TIMING.flapDuration,
          ease: EASE,
        }}
      />

      {/* Wax seal — the sole interactive element */}
      <motion.button
        type="button"
        aria-label="Open invitation"
        onClick={onSealClick}
        disabled={!isIdle}
        className="absolute appearance-none border-0 bg-transparent p-0"
        style={{
          left: "50%",
          top: "54%",
          width: "15%",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          zIndex: 30,
          cursor: isIdle ? "pointer" : "default",
        }}
        whileTap={isIdle ? { scale: 0.86 } : undefined}
        animate={isIdle ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <WaxSeal />
      </motion.button>
    </motion.div>
  );
}
