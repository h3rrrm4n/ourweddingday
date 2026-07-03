"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeUnit {
  value: number;
  label: string;
}

const WEDDING_DATE = new Date("2026-09-20T14:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownCard({ value, label }: TimeUnit) {
  const prevRef = useRef<number>(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlip(true);
      setTimeout(() => setFlip(false), 300);
      prevRef.current = value;
    }
  }, [value]);

  return (
    <div
      className="flex flex-col items-center"
      style={{ minWidth: 70 }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "clamp(70px, 18vw, 96px)",
          height: "clamp(70px, 18vw, 96px)",
          background: "linear-gradient(135deg, rgba(253,249,240,0.95) 0%, rgba(245,230,200,0.85) 100%)",
          border: "1.5px solid rgba(123,131,99,0.45)",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(140,100,40,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Top fold line */}
        <div
          className="absolute w-full"
          style={{
            height: 1,
            background: "rgba(123,131,99,0.2)",
            top: "50%",
          }}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ rotateX: flip ? -90 : 0, opacity: flip ? 0 : 1 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              color: "#1E1B16",
              fontWeight: "700",
              lineHeight: 1,
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l" style={{ borderColor: "rgba(123,131,99,0.5)" }} />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r" style={{ borderColor: "rgba(123,131,99,0.5)" }} />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l" style={{ borderColor: "rgba(123,131,99,0.5)" }} />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r" style={{ borderColor: "rgba(123,131,99,0.5)" }} />
      </div>
      <span
        className="mt-3 uppercase tracking-widest"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)",
          color: "#5E6650",
          letterSpacing: "0.18em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units: TimeUnit[] = [
    { value: time.days, label: "Օրեր" },
    { value: time.hours, label: "Ժամեր" },
    { value: time.minutes, label: "Րոպեներ" },
    { value: time.seconds, label: "Վայրկյաններ" },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 px-4 flex flex-col items-center"
    >
      {/* Section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 50%, rgba(123,131,99,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-12"
      >
        {/* Ornamental top */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(123,131,99,0.6))" }} />
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20 L12 16 L7.5 20 L9.5 13.5 L4 9 L10.5 9 Z" fill="rgba(123,131,99,0.7)" />
          </svg>
          <div className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(123,131,99,0.6))" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            color: "#1E1B16",
            textAlign: "center",
          }}
        >
          Մեր մեծ օրվան մնացել է
        </h2>
        <div
          className="mt-3 h-px w-24"
          style={{ background: "linear-gradient(to right, transparent, rgba(123,131,99,0.7), transparent)" }}
        />
      </motion.div>

      {/* Timer cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-start gap-4 md:gap-8 flex-wrap justify-center"
      >
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-4 md:gap-8">
            <CountdownCard value={unit.value} label={unit.label} />
            {i < units.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  color: "rgba(123,131,99,0.7)",
                  fontFamily: "var(--font-playfair), serif",
                  lineHeight: "clamp(70px, 18vw, 96px)",
                  fontWeight: "bold",
                  display: "block",
                }}
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
