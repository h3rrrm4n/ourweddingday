"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const VENUES = [
  {
    icon: "🏠",
    title: "Հարսնացուի տուն",
    time: "10:00",
    address: "[Հասցե]",
    desc: "Հարսնացուի օրհնության արարողություն",
  },
  {
    icon: "⛪",
    title: "Եկեղեցի",
    time: "14:00",
    address: "[Եկեղեցու հասցե]",
    desc: "Պսակադրության արարողություն",
  },
  {
    icon: "🍽️",
    title: "Ռեստորան",
    time: "18:00",
    address: "[Ռեստորանի հասցե]",
    desc: "Հարսանեկան հանդիսություն",
  },
];

export default function VenueSection() {
  const [openMap, setOpenMap] = useState<number | null>(null);

  return (
    <section
      className="py-14 px-5 flex flex-col items-center"
      style={{ background: "var(--bg-section)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        {/* Section header */}
        <div className="flex flex-col items-center mb-8">
          <p className="caps-label mb-3">Օրվա ծրագիրը</p>
          {/* Time row */}
          <div className="flex w-full justify-around py-4">
            {VENUES.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-serif font-bold" style={{ fontSize: "1.5rem", color: "#B8952E" }}>{v.time}</span>
                <span className="font-sans" style={{ fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "0.05em", textAlign: "center", maxWidth: 72 }}>
                  {v.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-px" style={{ background: "rgba(42,33,24,0.08)" }} />
        </div>

        {/* Venue cards */}
        {VENUES.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="card mb-4 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full text-lg"
                    style={{ width: 40, height: 40, background: "linear-gradient(135deg, #F5EDD8, #EDD8A8)" }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <p className="font-serif font-bold" style={{ fontSize: "1rem", color: "#2A2118" }}>{v.title}</p>
                    <p className="font-sans" style={{ fontSize: "0.78rem", color: "#B8952E", letterSpacing: "0.04em" }}>{v.time}</p>
                  </div>
                </div>
              </div>

              <p className="font-sans mb-1" style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "flex", alignItems: "center", gap: 5 }}>
                <span>📍</span>{v.address}
              </p>
              <p className="font-sans" style={{ fontSize: "0.83rem", color: "var(--text-mid)", fontStyle: "italic", lineHeight: 1.55 }}>
                {v.desc}
              </p>
            </div>

            {/* Map link */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderTop: "1px solid rgba(42,33,24,0.06)" }}
            >
              <span className="font-sans" style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
                Google Maps-ում դիտել →
              </span>
              <button
                onClick={() => setOpenMap(openMap === i ? null : i)}
                className="font-sans flex items-center gap-1.5"
                style={{
                  fontSize: "0.75rem",
                  color: "#B8952E",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {openMap === i ? "Փակել" : "Քարտեզ"}
                <span style={{ fontSize: "0.85rem" }}>{openMap === i ? "↑" : "↓"}</span>
              </button>
            </div>

            <motion.div
              animate={{ height: openMap === i ? 200 : 0, opacity: openMap === i ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="w-full flex flex-col items-center justify-center gap-2"
                style={{ height: 200, background: "#F5EDD8", fontSize: "0.82rem", color: "var(--text-light)" }}
              >
                <span style={{ fontSize: "1.8rem" }}>🗺️</span>
                Քարտեզը կավելացվի
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Directions button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn-gold mt-2"
        >
          🗺️ &nbsp;Ուղղություն ստանալ
        </motion.button>
      </motion.div>
    </section>
  );
}
