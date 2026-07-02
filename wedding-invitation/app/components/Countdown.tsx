"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEDDING_DATE = new Date("2026-09-20T14:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Tile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="relative flex items-center justify-center"
        style={{
          width:  "clamp(72px, 19vw, 88px)",
          height: "clamp(72px, 19vw, 88px)",
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(42,33,24,0.09), 0 1px 3px rgba(42,33,24,0.05)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{ y: 14,     opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-serif font-bold"
            style={{ fontSize: "clamp(1.7rem, 5.5vw, 2.3rem)", color: "#2A2118", lineHeight: 1 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="caps-label" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="py-16 px-6 flex flex-col items-center"
      style={{ background: "linear-gradient(180deg, #EDE5D4 0%, #F0E8D8 50%, #EDE5D4 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center mb-10"
      >
        <p className="caps-label mb-4">Մեր մեծ օրվան մնացել է</p>
        <h2
          className="font-serif font-bold text-center"
          style={{ fontSize: "clamp(1.7rem, 7vw, 2.6rem)", color: "#2A2118" }}
        >
          20 Սեպտեմբերի 2026
        </h2>
        <p className="font-sans mt-1.5" style={{ fontSize: "0.9rem", color: "#B8952E", letterSpacing: "0.06em" }}>
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
        {[
          { value: time.days,    label: "Օրեր" },
          { value: time.hours,   label: "Ժամեր" },
          { value: time.minutes, label: "Րոպեներ" },
          { value: time.seconds, label: "Վայրկյաններ" },
        ].map((unit, i, arr) => (
          <div key={unit.label} className="flex items-start gap-3">
            <Tile value={unit.value} label={unit.label} />
            {i < arr.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-serif font-bold"
                style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", color: "#C8B090", lineHeight: "clamp(72px,19vw,88px)" }}
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Gold heart divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mt-12"
      >
        <div className="h-px w-16" style={{ background: "rgba(184,149,46,0.35)" }} />
        <span style={{ color: "#B8952E", fontSize: "1rem" }}>♥</span>
        <div className="h-px w-16" style={{ background: "rgba(184,149,46,0.35)" }} />
      </motion.div>
    </section>
  );
}
