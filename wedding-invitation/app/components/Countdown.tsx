"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEDDING = new Date("2026-09-20T14:00:00");
function getLeft() {
  const d = WEDDING.getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

function Tile({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          width: "clamp(74px, 20vw, 90px)",
          height: "clamp(74px, 20vw, 90px)",
          background: "#FFFFFF",
          borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 16px rgba(42,33,24,0.09), 0 1px 3px rgba(42,33,24,0.04)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={n}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="f-serif font-bold"
            style={{ fontSize: "clamp(1.8rem, 5.5vw, 2.4rem)", color: "#2C2318", lineHeight: 1 }}
          >
            {String(n).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="caps" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(getLeft());
  useEffect(() => { const i = setInterval(() => setT(getLeft()), 1000); return () => clearInterval(i); }, []);

  return (
    <section
      className="py-16 px-6 flex flex-col items-center"
      style={{ background: "#F8F3E8" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center mb-10"
      >
        <p className="caps mb-4" style={{ letterSpacing: "0.25em" }}>Մեր մեծ օրվան մնացել է</p>
        <h2 className="f-serif font-bold text-center"
          style={{ fontSize: "clamp(1.8rem, 7vw, 2.8rem)", color: "#2C2318" }}>
          20 Սեպտեմբերի 2026
        </h2>
        <p className="f-sans mt-1.5" style={{ fontSize: "0.9rem", color: "var(--gold)", letterSpacing: "0.06em" }}>
          Կիրակի, ժամը 14:00
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="flex items-start gap-3 flex-wrap justify-center"
      >
        {([
          { n: t.days,    label: "Օրեր" },
          { n: t.hours,   label: "Ժամեր" },
          { n: t.minutes, label: "Րոպեներ" },
          { n: t.seconds, label: "Վայրկյաններ" },
        ] as { n: number; label: string }[]).map((u, i, arr) => (
          <div key={u.label} className="flex items-start gap-3">
            <Tile n={u.n} label={u.label} />
            {i < arr.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="f-serif font-bold"
                style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", color: "rgba(184,149,46,0.5)", lineHeight: "clamp(74px,20vw,90px)" }}
              >:
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Heart divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mt-12"
      >
        <div className="h-px w-16" style={{ background: "rgba(184,149,46,0.3)" }}/>
        <span style={{ color: "var(--gold)", fontSize: "1rem" }}>♥</span>
        <div className="h-px w-16" style={{ background: "rgba(184,149,46,0.3)" }}/>
      </motion.div>
    </section>
  );
}
