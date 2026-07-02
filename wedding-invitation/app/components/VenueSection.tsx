"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EVENTS = [
  { label: "Հարսնացուի տուն", time: "10:00" },
  { label: "Պսակ", time: "14:00" },
  { label: "Ընթրիք", time: "18:00" },
];

export default function VenueSection() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section
      id="venue"
      className="py-14 px-6 flex flex-col items-center"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <p className="label-caps mb-4">Օրվա ծրագիրը</p>

        {/* Events grid */}
        <div className="w-full flex justify-around mb-8">
          {EVENTS.map((ev, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <span
                className="font-serif font-bold"
                style={{ fontSize: "clamp(1.3rem, 5vw, 1.7rem)", color: "var(--gold)", letterSpacing: "0.02em" }}
              >
                {ev.time}
              </span>
              <span
                className="font-sans"
                style={{ fontSize: "0.75rem", color: "var(--text-mid)", letterSpacing: "0.04em", maxWidth: 80, textAlign: "center" }}
              >
                {ev.label}
              </span>
              {i < EVENTS.length - 1 && (
                <div
                  className="absolute"
                  style={{
                    width: 1,
                    height: 40,
                    background: "rgba(44,37,32,0.15)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Divider lines between events */}
        <div className="w-full flex justify-center gap-0 mb-8">
          <div className="flex-1 h-px" style={{ background: "rgba(44,37,32,0.1)" }} />
        </div>

        {/* Venue cards */}
        {[
          {
            title: "Հարսնացուի տուն",
            address: "[Հարսնացուի հասցե]",
            time: "10:00",
            desc: "Հարսնացուի օրհնության արարողություն",
          },
          {
            title: "Եկեղեցի",
            address: "[Եկեղեցու հասցե]",
            time: "14:00",
            desc: "Պսակադրության արարողություն",
          },
          {
            title: "Ռեստորան",
            address: "[Ռեստորանի հասցե]",
            time: "18:00",
            desc: "Հարսանեկան հանդիսություն",
          },
        ].map((venue, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="card w-full mb-4 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-serif font-bold" style={{ fontSize: "1.05rem", color: "var(--text-dark)" }}>
                  {venue.title}
                </h3>
                <span className="font-sans font-medium" style={{ fontSize: "0.9rem", color: "var(--gold)" }}>
                  {venue.time}
                </span>
              </div>
              <p className="font-sans mb-1" style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>
                📍 {venue.address}
              </p>
              <p className="font-sans" style={{ fontSize: "0.85rem", color: "var(--text-mid)", fontStyle: "italic" }}>
                {venue.desc}
              </p>
            </div>

            {/* Map toggle */}
            <div style={{ borderTop: "1px solid rgba(44,37,32,0.07)", padding: "10px 20px" }}>
              <button
                onClick={() => setMapOpen(mapOpen ? false : true)}
                className="font-sans flex items-center gap-2"
                style={{ fontSize: "0.8rem", color: "var(--gold)", letterSpacing: "0.04em", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
                  <path d="M8 1C5.239 1 3 3.239 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.761-2.239-5-5-5Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(184,148,42,0.15)" />
                  <circle cx="8" cy="6" r="1.8" fill="currentColor" />
                </svg>
                Բացել քարտեզը →
              </button>
            </div>

            <motion.div
              animate={{ height: mapOpen && i === 0 ? 200 : 0, opacity: mapOpen && i === 0 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="w-full flex items-center justify-center"
                style={{ height: 200, background: "linear-gradient(135deg, #EDE0C8, #D8C9B5)", fontSize: "0.82rem", color: "var(--text-mid)" }}
              >
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
          className="gold-btn w-full mt-2"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
            <path d="M10 2L18 10 10 18 2 10 10 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.2)" />
            <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Ուղղություն ստանալ
        </motion.button>
      </motion.div>
    </section>
  );
}
