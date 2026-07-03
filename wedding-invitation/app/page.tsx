"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import EnvelopeAnimation from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";
import Particles from "./components/Particles";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-7, 7]), { stiffness: 50, damping: 18 });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [5, -5]), { stiffness: 50, damping: 18 });

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
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#F8F6F2" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="landing"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative min-h-screen flex flex-col items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Particles />

            {/* Central radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  "radial-gradient(ellipse 65% 55% at 50% 52%, rgba(201,168,76,0.07) 0%, transparent 70%)",
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(123,131,99,0.05) 0%, transparent 65%)",
                ].join(", "),
              }}
            />

            {/* Paper grain texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="absolute top-10 flex items-center gap-5"
            >
              <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(123,131,99,0.55))" }} />
              <span style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.6rem",
                color: "#7B8363",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
              }}>
                Հարսանյաց Հրավեր
              </span>
              <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(123,131,99,0.55))" }} />
            </motion.div>

            {/* Names + date */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5 }}
              className="text-center mb-10"
              style={{ zIndex: 10 }}
            >
              <h1 style={{
                fontFamily: "var(--font-cormorant), var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 6vw, 3.4rem)",
                color: "#2A2520",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "0.03em",
                lineHeight: 1.1,
              }}>
                Անի{" "}
                <motion.span
                  style={{ color: "#7B8363", display: "inline-block", fontStyle: "normal" }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  &amp;
                </motion.span>
                {" "}Արման
              </h1>
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.65rem",
                color: "#7B8363",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginTop: 12,
              }}>
                20 Սեպտեմբերի 2026
              </p>
            </motion.div>

            {/* Envelope with floating + mouse parallax */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 10, perspective: 1400 }}
            >
              {/* Floating */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Parallax tilt */}
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                  {/* Glow behind envelope */}
                  <div style={{
                    position: "absolute",
                    inset: "-20px",
                    borderRadius: 20,
                    background: "radial-gradient(ellipse 85% 70% at 50% 60%, rgba(123,131,99,0.18) 0%, transparent 70%)",
                    filter: "blur(18px)",
                    pointerEvents: "none",
                    zIndex: -1,
                  }} />
                  <EnvelopeAnimation onOpen={() => setOpened(true)} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bottom line ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              className="absolute bottom-8 flex flex-col items-center gap-2"
            >
              <div style={{ height: 36, width: 1, background: "linear-gradient(to bottom, transparent, rgba(123,131,99,0.4))" }} />
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#7B8363", opacity: 0.45 }} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
