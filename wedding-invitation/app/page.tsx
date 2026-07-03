"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import EnvelopeAnimation from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";

export default function Home() {
  const [opened, setOpened] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-5, 5]), { stiffness: 45, damping: 20 });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [3, -3]), { stiffness: 45, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div style={{ minHeight: "100svh", overflow: "hidden", background: "#F5F0E8" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              minHeight: "100svh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(32px, 5vw, 60px) 24px clamp(28px, 4vw, 48px)",
              position: "relative",
              gap: 0,
            }}
          >
            {/* Soft vignette */}
            <div style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              background: [
                "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(200,185,155,0.18) 100%)",
                "radial-gradient(ellipse 60% 50% at 50% 48%, rgba(255,252,245,0.5) 0%, transparent 70%)",
              ].join(", "),
            }} />

            {/* ── Top: label + names + date ── */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: "center",
                marginBottom: "clamp(36px, 6vw, 72px)",
                zIndex: 10,
                position: "relative",
              }}
            >
              {/* Label */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                marginBottom: "clamp(16px, 3vw, 28px)",
              }}>
                <div style={{ width: 28, height: 1, background: "linear-gradient(to right, transparent, rgba(140,120,80,0.5))" }} />
                <span style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.5rem, 1.2vw, 0.62rem)",
                  color: "#8A7A60",
                  letterSpacing: "0.44em",
                  textTransform: "uppercase",
                }}>
                  Հարսանյաց Հրավեր
                </span>
                <div style={{ width: 28, height: 1, background: "linear-gradient(to left, transparent, rgba(140,120,80,0.5))" }} />
              </div>

              {/* Names */}
              <h1 style={{
                fontFamily: "var(--font-armenian), var(--font-cormorant), serif",
                fontSize: "clamp(2.2rem, 7vw, 5rem)",
                color: "#7D6248",
                fontStyle: "italic",
                fontWeight: 700,
                letterSpacing: "0.04em",
                lineHeight: 1.1,
                margin: 0,
              }}>
                Անի{" "}
                <motion.span
                  style={{ color: "#A08060", fontStyle: "normal", display: "inline-block" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >&amp;</motion.span>
                {" "}Արման
              </h1>

              {/* Date */}
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)",
                color: "#8A7A60",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginTop: "clamp(10px, 1.5vw, 16px)",
              }}>
                20 · Սեptembepi · 2026
              </p>
            </motion.div>

            {/* ── Envelope ── */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                zIndex: 10,
                perspective: 1600,
                position: "relative",
                // Mobile: nearly full width. Desktop: large but contained.
                width: "clamp(300px, 88vw, 720px)",
              }}
            >
              {/* Floating */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Parallax tilt (desktop only — on touch it stays flat) */}
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                  <EnvelopeAnimation onOpen={() => setOpened(true)} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hint below envelope */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              style={{
                marginTop: "clamp(18px, 3vw, 32px)",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.52rem, 1.2vw, 0.62rem)",
                color: "#9A8E7A",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                animation: "hintPulse 3.5s ease-in-out infinite",
                zIndex: 10,
              }}
            >
              Հппvեք ծrarը bacelu hamar
            </motion.p>

            <style>{`
              @keyframes hintPulse {
                0%, 100% { opacity: 0.35; }
                50%       { opacity: 0.9; }
              }
            `}</style>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
