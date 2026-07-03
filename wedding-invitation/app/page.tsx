"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Envelope from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";

export default function Page() {
  const [opened, setOpened] = useState(false);

  /* subtle mouse tilt on desktop */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { stiffness: 50, damping: 22 });
  const rx = useSpring(useTransform(my, [-1, 1], [2.5, -2.5]), { stiffness: 50, damping: 22 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  * 2 - 1);
    my.set((e.clientY - r.top)  / r.height * 2 - 1);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <div style={{ minHeight: "100svh", background: "#F0EBE0", overflow: "hidden" }}>
      <AnimatePresence mode="wait">

        {!opened ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
            transition={{ duration: 0.55 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
              minHeight: "100svh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(32px,5vw,64px) clamp(16px,4vw,32px) clamp(24px,4vw,48px)",
              position: "relative",
            }}
          >
            {/* soft vignette */}
            <div style={{
              position: "fixed", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(255,252,244,0.50) 0%, transparent 72%)",
            }} />

            {/* Names + date */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1,  y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,52px)", position: "relative", zIndex: 2 }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 22, height: 1, background: "rgba(138,112,68,0.5)" }} />
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.45rem,1.1vw,0.58rem)", color: "#8A7044", letterSpacing: "0.42em", textTransform: "uppercase" }}>
                  Wedding Invitation
                </span>
                <div style={{ width: 22, height: 1, background: "rgba(138,112,68,0.5)" }} />
              </div>

              <h1 style={{
                fontFamily: "var(--font-armenian), 'Noto Serif Armenian', serif",
                fontSize: "clamp(1.9rem,6.5vw,4.4rem)",
                color: "#7D6248",
                fontStyle: "italic",
                fontWeight: 700,
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                margin: 0,
              }}>
                Անի{" "}
                <motion.span
                  style={{ color: "#A08458", fontStyle: "normal", display: "inline-block" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >&amp;</motion.span>
                {" "}Արման
              </h1>

              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.55rem,1.3vw,0.65rem)", color: "#9A8260", letterSpacing: "0.24em", textTransform: "uppercase", marginTop: 12 }}>
                20 &middot; September &middot; 2026
              </p>
            </motion.div>

            {/* Envelope */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1,  y: 0,  scale: 1 }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "clamp(280px, 84vw, 580px)", position: "relative", zIndex: 2, perspective: 1400, overflow: "visible" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ overflow: "visible" }}
              >
                <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", overflow: "visible" }}>
                  <Envelope onOpen={() => setOpened(true)} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              style={{
                marginTop: "clamp(14px,2.5vw,24px)",
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.48rem,1.1vw,0.58rem)",
                color: "#9A8870",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                animation: "hint 3.5s ease-in-out infinite",
                position: "relative",
                zIndex: 2,
              }}
            >
              Open this
            </motion.p>

            <style>{`@keyframes hint { 0%,100%{opacity:.28} 50%{opacity:.88} }`}</style>
          </motion.div>

        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationPage />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
