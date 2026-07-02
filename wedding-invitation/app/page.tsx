"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeAnimation from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";
import Particles from "./components/Particles";
import FloralDecoration from "./components/FloralDecoration";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#F8F6F2" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ── Landing / Envelope Screen ── */
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative min-h-screen flex flex-col items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 50%, #FAF8F3 0%, #F5E6C8 40%, #F8F6F2 100%)",
            }}
          >
            {/* Particle canvas */}
            <Particles />

            {/* Floral corner decorations */}
            <FloralDecoration position="top-left" opacity={0.22} size={300} />
            <FloralDecoration position="top-right" opacity={0.22} size={300} />
            <FloralDecoration position="bottom-left" opacity={0.18} size={260} />
            <FloralDecoration position="bottom-right" opacity={0.18} size={260} />

            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Top elegant tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-10 left-0 right-0 flex flex-col items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5))" }} />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.68rem",
                    color: "#C9A84C",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                  }}
                >
                  Հարսանյաց Հրավեր
                </span>
                <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.5))" }} />
              </div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-4 text-center"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.6rem, 5vw, 3rem)",
                  color: "#3D3530",
                  letterSpacing: "0.04em",
                }}
              >
                Անի{" "}
                <motion.span
                  style={{ color: "#C9A84C" }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  ♥
                </motion.span>{" "}
                Արման
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                  color: "#A07830",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                20 Սեպտեմբերի 2026
              </motion.p>
            </motion.div>

            {/* Envelope */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <EnvelopeAnimation onOpen={() => setOpened(true)} />
            </motion.div>

            {/* Bottom decorative text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <div
                className="h-8 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.5))" }}
              />
              <div className="flex items-center gap-3">
                <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                  <circle cx="8" cy="8" r="3" fill="rgba(201,168,76,0.6)" />
                  <path d="M8 2v1M8 13v1M2 8h1M13 8h1M4 4l.7.7M11.3 11.3l.7.7M11.3 4.7l-.7.7M4.7 11.3l-.7.7" stroke="rgba(201,168,76,0.5)" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <div className="w-8 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Invitation Page ── */
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
