"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export interface EventData {
  icon: React.ReactNode;
  title: string;
  time: string;
  address: string;
  description: string;
  mapSrc?: string;
}

interface EventCardProps {
  event: EventData;
  index: number;
  side: "left" | "right";
}

export default function EventCard({ event, index, side }: EventCardProps) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${side === "right" ? "md:flex-row-reverse" : "md:flex-row"} flex-col items-center md:items-start gap-6 w-full`}
    >
      {/* Timeline dot (desktop) */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className="flex items-center justify-center rounded-full z-10"
          style={{
            width: 52,
            height: 52,
            background: "linear-gradient(135deg, #F5E6C8, #C9A84C)",
            border: "2px solid rgba(201,168,76,0.6)",
            boxShadow: "0 4px 16px rgba(201,168,76,0.3)",
            flexShrink: 0,
          }}
        >
          {event.icon}
        </div>
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(140,100,40,0.18)" }}
        transition={{ duration: 0.25 }}
        className="flex-1 max-w-lg w-full rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(253,249,240,0.98) 0%, rgba(250,248,243,0.95) 100%)",
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 6px 32px rgba(140,100,40,0.1)",
        }}
      >
        {/* Card header */}
        <div
          className="px-6 py-5 flex items-center gap-4"
          style={{
            borderBottom: "1px solid rgba(201,168,76,0.15)",
            background: "linear-gradient(135deg, rgba(245,230,200,0.4) 0%, rgba(253,249,240,0.6) 100%)",
          }}
        >
          {/* Mobile icon */}
          <div
            className="md:hidden flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg, #F5E6C8, #C9A84C)",
              border: "1.5px solid rgba(201,168,76,0.5)",
            }}
          >
            {event.icon}
          </div>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
                color: "#3D3530",
                marginBottom: 2,
              }}
            >
              {event.title}
            </h3>
            <span
              className="inline-flex items-center gap-1"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.82rem",
                color: "#A07830",
                letterSpacing: "0.1em",
              }}
            >
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="#C9A84C" strokeWidth="1" />
                <path d="M8 5v3l2 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {event.time}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="px-6 py-5">
          {/* Address */}
          <div className="flex items-start gap-2 mb-4">
            <svg viewBox="0 0 16 20" width="13" height="16" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M8 1C4.686 1 2 3.686 2 7c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6Z" stroke="#C9A84C" strokeWidth="1.2" fill="rgba(201,168,76,0.15)" />
              <circle cx="8" cy="7" r="2" fill="#C9A84C" />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.88rem",
                color: "#6B5E4E",
                lineHeight: 1.5,
              }}
            >
              {event.address}
            </p>
          </div>

          {/* Description */}
          <p
            className="mb-5"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.9rem",
              color: "#8B7355",
              lineHeight: 1.65,
              fontStyle: "italic",
            }}
          >
            {event.description}
          </p>

          {/* Map toggle button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMapOpen(!mapOpen)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              background: mapOpen
                ? "linear-gradient(135deg, #A07830, #C9A84C)"
                : "transparent",
              color: mapOpen ? "#FDF9F0" : "#A07830",
              border: "1.5px solid rgba(201,168,76,0.5)",
              letterSpacing: "0.05em",
              fontSize: "0.82rem",
            }}
          >
            <svg viewBox="0 0 18 18" width="14" height="14" fill="none">
              <rect x="1" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 7h16M5 3v2M13 3v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M5 10l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {mapOpen ? "Փակել քարտեզը" : "Բացել քարտեզը"}
          </motion.button>

          {/* Map iframe */}
          <motion.div
            initial={false}
            animate={{ height: mapOpen ? 220 : 0, opacity: mapOpen ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-4 rounded-xl"
            style={{ border: mapOpen ? "1px solid rgba(201,168,76,0.25)" : "none" }}
          >
            {event.mapSrc ? (
              <iframe
                src={event.mapSrc}
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Քարտեզ - ${event.title}`}
              />
            ) : (
              <div
                className="w-full flex flex-col items-center justify-center"
                style={{
                  height: 220,
                  background: "linear-gradient(135deg, #F5E6C8 0%, #EDD9A8 100%)",
                  color: "#A07830",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.88rem",
                  gap: 8,
                }}
              >
                <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                  <circle cx="20" cy="18" r="10" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.15)" />
                  <path d="M14 36 Q20 28 26 36" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <circle cx="20" cy="18" r="3" fill="#C9A84C" />
                </svg>
                Քարտեզը կավելացվի
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
