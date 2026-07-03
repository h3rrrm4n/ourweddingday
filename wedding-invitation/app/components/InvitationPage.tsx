"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";
import VenueSection from "./VenueSection";
import Timeline from "./Timeline";
import Footer from "./Footer";
import FallingPetals from "./FallingPetals";

function OliveDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2 w-full max-w-sm mx-auto px-6">
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(123,131,99,0.4))" }} />
      <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
        <path d="M10 1 C10 1 4 6 4 10 C4 14 7 18 10 19 C13 18 16 14 16 10 C16 6 10 1 10 1Z"
          fill="rgba(123,131,99,0.5)" />
        <path d="M10 4 L10 19" stroke="rgba(123,131,99,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M7 8 Q10 6 13 8" stroke="rgba(123,131,99,0.5)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      </svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(123,131,99,0.4))" }} />
    </div>
  );
}

export default function InvitationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="relative min-h-screen"
      style={{ background: "#F8F6F2" }}
    >
      <FallingPetals />

      {/* Subtle radial overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: [
          "radial-gradient(ellipse 60% 40% at 20% 10%, rgba(123,131,99,0.05) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 40% at 80% 90%, rgba(123,131,99,0.04) 0%, transparent 60%)",
        ].join(", "),
      }} />

      {/* Top header band */}
      <div className="w-full flex items-center justify-center py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(123,131,99,0.15)" }}>
        <div className="flex items-center gap-5">
          <div style={{ width: 28, height: 1, background: "linear-gradient(to right, transparent, rgba(123,131,99,0.5))" }} />
          <span style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.58rem",
            color: "#7B8363",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}>
            Հարսանյաց Հրավեր
          </span>
          <div style={{ width: 28, height: 1, background: "linear-gradient(to left, transparent, rgba(123,131,99,0.5))" }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <HeroSection />
        <OliveDivider />
        <Countdown />
        <OliveDivider />
        <VenueSection />
        <OliveDivider />
        <Timeline />
        <Footer />
      </div>
    </motion.div>
  );
}
