"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryEnvelope from "./components/LuxuryEnvelope";
import InvitationPage from "./components/InvitationPage";

export default function Page() {
  const [stage, setStage] = useState<"envelope" | "invitation">("envelope");

  return (
    <div style={{ minHeight: "100svh", background: "#F8F6F2", overflow: "hidden" }}>
      <AnimatePresence mode="wait">

        {stage === "envelope" ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              minHeight: "100svh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(24px, 4vw, 48px)",
              position: "relative",
            }}
          >
            {/* very subtle center glow */}
            <div style={{
              position: "fixed", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,253,246,0.60) 0%, transparent 70%)",
            }} />

            {/* envelope — 75vw, max 740px */}
            <div style={{
              width: "clamp(300px, 75vw, 740px)",
              position: "relative",
              zIndex: 1,
            }}>
              <LuxuryEnvelope onOpened={() => setStage("invitation")} />
            </div>
          </motion.div>

        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <InvitationPage />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
