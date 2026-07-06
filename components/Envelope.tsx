"use client";

import { motion } from "framer-motion";
import WaxSeal from "./WaxSeal";
import Monogram from "./Monogram";

export type Stage = "idle" | "opening" | "opened";

// A smooth, symmetric ease-in-out — motion stays visible and legible
// throughout its full duration rather than front-loading into the first
// few frames (which is what a curve like cubic-bezier(.22,1,.36,1) does,
// making the motion look like it barely animates at all).
const OPEN_EASE = [0.65, 0, 0.35, 1] as const;
const SEAM = "rgba(90,60,40,0.16)";

const TIMING = {
  sealDuration: 0.75,
  flapDelay: 0.12,
  flapDuration: 0.95,
  pocketFadeDelay: 1.5,
  pocketFadeDuration: 0.7,
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
              ease: "easeInOut",
            }
      }
    >
      {/* Envelope body / pocket — remains after the flap and seal leave */}
      <div
        className="paper-grain absolute inset-0 overflow-hidden sm:rounded-[3px]"
        style={{
          background: "#D9C4BB",
          boxShadow:
            "0 34px 70px -28px rgba(60,35,25,0.32), 0 12px 26px -16px rgba(60,35,25,0.18), inset 0 0 0 1px rgba(90,60,40,0.08)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            clipPath: "polygon(0 0, 46% 50%, 0 100%)",
            background: "linear-gradient(120deg, rgba(60,35,25,0.06), rgba(60,35,25,0) 72%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            clipPath: "polygon(100% 0, 54% 50%, 100% 100%)",
            background: "linear-gradient(240deg, rgba(60,35,25,0.06), rgba(60,35,25,0) 72%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            clipPath: "polygon(0 100%, 50% 40%, 100% 100%)",
            background: "linear-gradient(0deg, rgba(60,35,25,0.06), rgba(60,35,25,0) 62%)",
          }}
        />
      </div>

      {/* Triangular flap — lifts straight up and away, the folded part opening */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[58%] origin-top"
        style={{ zIndex: 20 }}
        animate={isIdle ? { y: 0, opacity: 1 } : { y: "-72%", opacity: 0 }}
        transition={{
          delay: TIMING.flapDelay,
          duration: TIMING.flapDuration,
          ease: OPEN_EASE,
        }}
      >
        <div
          className="paper-grain absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background: "linear-gradient(200deg, #DEC9C0 0%, #D3BDB3 100%)",
            filter: "drop-shadow(0 10px 16px rgba(60,35,25,0.14))",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 50,100" fill="none" stroke={SEAM} strokeWidth="0.4" />
        </svg>

        {/* Monogram + invitation to open, centered in the upper portion of the flap */}
        <div className="absolute inset-x-0 top-[10%] sm:top-[8%] flex flex-col items-center gap-5 sm:gap-6">
          <Monogram initials={["S", "J"]} />
          <p
            className="font-serif italic text-ink/80"
            style={{ fontSize: "clamp(15px, 3.4vw, 20px)", letterSpacing: "0.02em" }}
          >
            open this
          </p>
        </div>
      </motion.div>

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
        {/* tap-hint ripple, inviting interaction */}
        {isIdle && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(90,60,40,0.35)" }}
            animate={{ scale: [1, 1.55, 1.55], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6 }}
          />
        )}

        <motion.button
          type="button"
          aria-label="Open invitation"
          onClick={onSealClick}
          disabled={!isIdle}
          className="absolute inset-0 appearance-none border-0 bg-transparent p-0"
          style={{ cursor: isIdle ? "pointer" : "default" }}
          whileTap={isIdle ? { scale: 0.86 } : undefined}
          animate={isIdle ? { y: 0, opacity: 1, scale: 1 } : { y: "220%", opacity: 0, scale: 0.85 }}
          transition={{ duration: TIMING.sealDuration, ease: OPEN_EASE }}
        >
          <WaxSeal />
        </motion.button>
      </div>
    </motion.div>
  );
}
