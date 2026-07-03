"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import EnvelopeAnimation from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";

export default function Home() {
  const [opened, setOpened] = useState(false);

  // Subtle parallax on desktop (mouse move)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-4, 4]), { stiffness: 50, damping: 22 });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [2.5, -2.5]), { stiffness: 50, damping: 22 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width * 2 - 1);
    rawY.set((e.clientY - r.top) / r.height * 2 - 1);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <div style={{ minHeight: "100svh", background: "#F2EDE2", overflow: "hidden" }}>
      <AnimatePresence mode="wait">

        {!opened ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              minHeight: "100svh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px 32px",
              position: "relative",
            }}
          >
            {/* Soft center glow */}
            <div style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,252,240,0.55) 0%, transparent 70%)",
            }} />

            {/* ── Names & date ── */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ textAlign: "center", marginBottom: "clamp(28px, 5vw, 56px)", zIndex: 2 }}
            >
              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ width: 24, height: 1, background: "rgba(140,118,78,0.45)" }} />
                <span style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.48rem, 1.3vw, 0.6rem)",
                  color: "#8C7650",
                  letterSpacing: "0.44em",
                  textTransform: "uppercase",
                }}>Հарсанйац Hравер</span>
                <div style={{ width: 24, height: 1, background: "rgba(140,118,78,0.45)" }} />
              </div>

              {/* Names */}
              <h1 style={{
                fontFamily: "var(--font-armenian), 'Noto Serif Armenian', serif",
                fontSize: "clamp(2rem, 6.5vw, 4.5rem)",
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

              {/* Date */}
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.58rem, 1.4vw, 0.68rem)",
                color: "#9A8260",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                marginTop: 14,
              }}>20 · Сепtемbер · 2026</p>
            </motion.div>

            {/* ── Envelope ── */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "clamp(280px, 82vw, 540px)",
                zIndex: 2,
                perspective: 1400,
              }}
            >
              {/* Float */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Parallax tilt */}
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                  <EnvelopeAnimation onOpen={() => setOpened(true)} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              style={{
                marginTop: "clamp(16px, 3vw, 28px)",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.5rem, 1.2vw, 0.6rem)",
                color: "#9A8870",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                animation: "hintPulse 3.5s ease-in-out infinite",
                zIndex: 2,
              }}
            >
              Open this
            </motion.p>

            <style>{`
              @keyframes hintPulse {
                0%, 100% { opacity: 0.3; }
                50%       { opacity: 0.85; }
              }
            `}</style>
          </motion.div>

        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationPage />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
