"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import EnvelopeAnimation from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";

export default function Home() {
  const [opened, setOpened] = useState(false);

  // Subtle mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-5, 5]), { stiffness: 45, damping: 20 });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [3.5, -3.5]), { stiffness: 45, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawY.set((e.clientY - rect.top)  / rect.height * 2 - 1);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden", background: "#F8F6F2" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            transition={{ duration: 0.65 }}
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: "48px 24px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Very soft radial glow behind envelope */}
            <div style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(ellipse 70% 60% at 50% 56%, rgba(201,180,120,0.08) 0%, transparent 68%)",
            }} />

            {/* ── Names + date ── */}
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              style={{ textAlign: "center", marginBottom: 52, zIndex: 10 }}
            >
              {/* Label */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: "linear-gradient(to right, transparent, rgba(123,131,99,0.55))" }} />
                <span style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.58rem",
                  color: "#7B8363",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                }}>
                  Հարսանյաց Հրավեր
                </span>
                <div style={{ width: 32, height: 1, background: "linear-gradient(to left, transparent, rgba(123,131,99,0.55))" }} />
              </div>

              {/* Names */}
              <h1 style={{
                fontFamily: "var(--font-armenian), var(--font-cormorant), serif",
                fontSize: "clamp(2.4rem, 7vw, 3.8rem)",
                color: "#7D6248",
                fontStyle: "italic",
                fontWeight: 700,
                letterSpacing: "0.04em",
                lineHeight: 1.15,
                margin: 0,
              }}>
                Անի{" "}
                <motion.span
                  style={{ color: "#9A8060", fontStyle: "normal", display: "inline-block" }}
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  &amp;
                </motion.span>
                {" "}Արման
              </h1>

              {/* Date */}
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.68rem",
                color: "#7B8363",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginTop: 14,
              }}>
                20 Սեպտեմբերի · 2026
              </p>
            </motion.div>

            {/* ── Envelope ── */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 10, perspective: 1400 }}
            >
              {/* Breathing float */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Parallax tilt */}
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                  <EnvelopeAnimation onOpen={() => setOpened(true)} />
                </motion.div>
              </motion.div>
            </motion.div>
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
