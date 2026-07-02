"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeAnimation from "./components/EnvelopeAnimation";
import InvitationPage from "./components/InvitationPage";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--envelope-bg)" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <EnvelopeAnimation onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
