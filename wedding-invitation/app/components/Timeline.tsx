"use client";

import { motion } from "framer-motion";
import EventCard, { EventData } from "./EventCard";

const HouseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M3 12L12 3l9 9" stroke="#FDF9F0" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 10v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10" stroke="#FDF9F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChurchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M12 2v4M10 4h4" stroke="#FDF9F0" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 20V10l6-4 6 4v10H6Z" stroke="#FDF9F0" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="10" y="14" width="4" height="6" rx="0.5" stroke="#FDF9F0" strokeWidth="1.2" />
    <path d="M9 13h6" stroke="#FDF9F0" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const RestaurantIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M3 11l1-7h16l1 7H3Z" stroke="#FDF9F0" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3 11v9h18v-9" stroke="#FDF9F0" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 11v9M15 11v9M9 16h6" stroke="#FDF9F0" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const events: EventData[] = [
  {
    icon: <HouseIcon />,
    title: "Հարսնացուի տուն",
    time: "10:00",
    address: "[Հասցե]",
    description: "Հարսնացուի օրհնության և հավաքի արարողություն",
    mapSrc: "",
  },
  {
    icon: <ChurchIcon />,
    title: "Եկեղեցական արարողություն",
    time: "14:00",
    address: "[Հասցե]",
    description: "Պսակադրության հանդիսավոր արարողություն",
    mapSrc: "",
  },
  {
    icon: <RestaurantIcon />,
    title: "Ռեստորան",
    time: "18:00",
    address: "[Հասցե]",
    description: "Հարսանեկան հանդիսություն",
    mapSrc: "",
  },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-20 px-4 max-w-3xl mx-auto w-full"
    >
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6))" }} />
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20 L12 16 L7.5 20 L9.5 13.5 L4 9 L10.5 9 Z" fill="rgba(201,168,76,0.7)" />
          </svg>
          <div className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.6))" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            color: "#3D3530",
            textAlign: "center",
          }}
        >
          Օրվա ծրագիրը
        </h2>
        <div
          className="mt-3 h-px w-24"
          style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.7), transparent)" }}
        />
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
          style={{
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.35) 10%, rgba(201,168,76,0.35) 90%, transparent)",
          }}
        />

        <div className="flex flex-col gap-12">
          {events.map((event, i) => (
            <div key={event.title} className="relative">
              {/* Timeline connector dot (desktop) */}
              <div
                className="hidden md:block absolute left-1/2 top-8 z-20"
                style={{
                  transform: "translateX(-50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E8D5A3, #C9A84C)",
                  border: "2px solid #FDF9F0",
                  boxShadow: "0 0 0 3px rgba(201,168,76,0.25)",
                }}
              />

              <div className={`md:grid md:grid-cols-2 md:gap-8 flex flex-col gap-0`}>
                {i % 2 === 0 ? (
                  <>
                    {/* Left side card */}
                    <div className="md:flex md:justify-end">
                      <EventCard event={event} index={i} side="left" />
                    </div>
                    {/* Right spacer */}
                    <div />
                  </>
                ) : (
                  <>
                    {/* Left spacer */}
                    <div />
                    {/* Right side card */}
                    <div className="md:flex md:justify-start">
                      <EventCard event={event} index={i} side="right" />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
