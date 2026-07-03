"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";
import Timeline from "./Timeline";
import VenueSection from "./VenueSection";
import Footer from "./Footer";
import Divider from "./Divider";
import FallingPetals from "./FallingPetals";

export default function InvitationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #F8F6F2 0%, #FAF8F3 40%, #F8F6F2 100%)" }}
    >
      <FallingPetals />

      {/* Background texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(201,168,76,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Top ornamental header band */}
      <div
        className="w-full flex items-center justify-center py-4 relative z-10"
        style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-20 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5))" }} />
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.68rem",
              color: "#C9A84C",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Wedding Invitation
          </span>
          <div className="w-20 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.5))" }} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <HeroSection />
        <Divider />
        <Countdown />
        <Divider />
        <VenueSection />
        <Divider />
        <Timeline />
        <Footer />
      </div>
    </motion.div>
  );
}
