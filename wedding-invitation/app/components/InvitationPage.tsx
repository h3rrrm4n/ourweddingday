"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import Countdown from "./Countdown";
import VenueSection from "./VenueSection";
import GuestbookFeed from "./GuestbookFeed";
import MemoryNoteForm from "./MemoryNoteForm";
import Footer from "./Footer";
import FallingPetals from "./FallingPetals";

export default function InvitationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen relative"
      style={{ background: "var(--bg)" }}
    >
      <FallingPetals />
      <HeroSection />
      <Countdown />
      <VenueSection />
      <GuestbookFeed />
      <MemoryNoteForm />
      <Footer />
    </motion.div>
  );
}
