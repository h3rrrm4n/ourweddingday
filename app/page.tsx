"use client";

import { useCallback, useState } from "react";
import Envelope, { type Stage } from "@/components/Envelope";
import ContentReveal from "@/components/ContentReveal";

// Matches the envelope's own pocket fade-out delay (see Envelope.tsx
// TIMING.pocketFadeDelay), so the content begins revealing exactly as the
// envelope starts dissolving — one continuous motion rather than two
// separate steps.
const OPEN_SEQUENCE_MS = 1500;

export default function Home() {
  const [stage, setStage] = useState<Stage>("idle");

  const handleSealClick = useCallback(() => {
    setStage((current) => {
      if (current !== "idle") return current;
      window.setTimeout(() => setStage("opened"), OPEN_SEQUENCE_MS);
      return "opening";
    });
  }, []);

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-pudra flex items-center justify-center">
      <div className="grain-overlay" />
      <Envelope stage={stage} onSealClick={handleSealClick} />
      <ContentReveal visible={stage === "opened"} />
    </main>
  );
}
