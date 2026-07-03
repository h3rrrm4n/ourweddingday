"use client";

import { motion } from "framer-motion";
import WaxSeal from "./WaxSeal";

export type Stage = "idle" | "opening" | "opened";

const EASE = [0.22, 1, 0.36, 1] as const;

const TIMING = {
  sealDuration: 0.6,
  flapDelay: 0.08,
  flapDuration: 0.75,
  pocketFadeDelay: 1.3,
  pocketFadeDuration: 0.6,
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
      className="relative w-screen h-dvh sm:w-[68vw] sm:h-auto sm:aspect-[3/2] sm:max-w-[560px] sm:min-w-[280px]"
      style={{ pointerEvents: isIdle ? "auto" : "none" }}
      animate={
        isIdle
          ? { scale: [1, 1.012, 1], rotate: [0, 0.25, 0], opacity: 1 }
          : { opacity: 0 }
      }
      transition={
        isIdle
          ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
          : {
              delay: TIMING.pocketFadeDelay,
              duration: TIMING.pocketFadeDuration,
              ease: EASE,
            }
      }
    >
      {/* Envelope body / pocket — remains after the flap and seal leave */}
      <div
        className="paper-grain absolute inset-0 overflow-hidden sm:rounded-[3px]"
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

      {/* Triangular flap — lifts straight up and away, the folded part opening */}
      <motion.div
        className="paper-grain absolute top-0 left-0 w-full h-[58%] origin-top"
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          background: "linear-gradient(200deg, #F6F2E8 0%, #F1ECDF 100%)",
          filter: "drop-shadow(0 10px 16px rgba(35,25,15,0.14))",
          zIndex: 20,
        }}
        animate={isIdle ? { y: 0, opacity: 1 } : { y: "-72%", opacity: 0 }}
        transition={{
          delay: TIMING.flapDelay,
          duration: TIMING.flapDuration,
          ease: EASE,
        }}
      />

      {/* Wax seal — the sole interactive element, drops down and away on open */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "54%",
          width: "15%",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          zIndex: 30,
        }}
      >
        <motion.button
          type="button"
          aria-label="Open invitation"
          onClick={onSealClick}
          disabled={!isIdle}
          className="absolute inset-0 appearance-none border-0 bg-transparent p-0"
          style={{ cursor: isIdle ? "pointer" : "default" }}
          whileTap={isIdle ? { scale: 0.86 } : undefined}
          animate={isIdle ? { y: 0, opacity: 1, scale: 1 } : { y: "220%", opacity: 0, scale: 0.85 }}
          transition={{ duration: TIMING.sealDuration, ease: EASE }}
        >
          <WaxSeal />
        </motion.button>
      </div>
    </motion.div>
  );
}
