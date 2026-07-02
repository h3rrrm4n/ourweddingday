"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEDDING_DATE = new Date("2026-09-20T14:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function NumberCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="card flex items-center justify-center"
        style={{
          width: "clamp(68px, 18vw, 82px)",
          height: "clamp(68px, 18vw, 82px)",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(44,37,32,0.1)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="font-serif font-bold"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "var(--text-dark)", lineHeight: 1 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="label-caps" style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}>
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
      id="countdown"
      className="py-16 px-6 flex flex-col items-center"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center mb-10"
      >
        <p className="label-caps mb-3">Մեր մեծ օրվան մնացել է</p>
        <h2
          className="font-serif font-bold text-center"
          style={{ fontSize: "clamp(1.6rem, 6vw, 2.4rem)", color: "var(--text-dark)" }}
        >
          20 Սեպտեմբերի 2026
        </h2>
        <p className="font-sans mt-1" style={{ fontSize: "0.9rem", color: "var(--gold)", letterSpacing: "0.06em" }}>
          Կիրակի, ժամը 14:00
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="flex items-start gap-3 flex-wrap justify-center"
      >
        <NumberCard value={time.days} label="Օրեր" />
        <span className="font-serif font-bold" style={{ fontSize: "2rem", color: "var(--text-light)", paddingTop: "clamp(14px,4vw,20px)" }}>:</span>
        <NumberCard value={time.hours} label="Ժամեր" />
        <span className="font-serif font-bold" style={{ fontSize: "2rem", color: "var(--text-light)", paddingTop: "clamp(14px,4vw,20px)" }}>:</span>
        <NumberCard value={time.minutes} label="Րոպեներ" />
        <span className="font-serif font-bold" style={{ fontSize: "2rem", color: "var(--text-light)", paddingTop: "clamp(14px,4vw,20px)" }}>:</span>
        <NumberCard value={time.seconds} label="Վայրկյաններ" />
      </motion.div>

      {/* Gold heart divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mt-12"
      >
        <div className="h-px w-16" style={{ background: "var(--gold-light)" }} />
        <span style={{ color: "var(--gold)", fontSize: "1.1rem" }}>♥</span>
        <div className="h-px w-16" style={{ background: "var(--gold-light)" }} />
      </motion.div>
    </section>
  );
}
