"use client";

import { motion } from "framer-motion";

const VENUES = [
  {
    kind: "Պսակադրություն",
    title: "Սուրբ Գրիգոր Լուսավորիչ Մայր Տաճար",
    address: "Երևան, Այգեստանի 6-րդ փողոց",
    time: "16:00",
    mapsUrl: "https://maps.google.com/?q=Սուրբ+Գրիգոր+Լուսավորիչ+Մայր+Տաճար+Երևան",
    icon: (
      <svg viewBox="0 0 48 48" width="36" height="36">
        <g fill="none" stroke="#b9925f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6v10" /><path d="M19 11h10" />
          <path d="M14 44V24l10-8 10 8v20" />
          <path d="M14 44h20" />
          <path d="M20 44V32h8v12" />
          <path d="M10 44h28" />
        </g>
      </svg>
    ),
  },
  {
    kind: "Հարսանյաց ընթրիք",
    title: "«Այվազովսկի» Ռեստորան",
    address: "Երևան, Բաղրամյան պողոտա 24",
    time: "19:00",
    mapsUrl: "https://maps.google.com/?q=Այվազովսկի+Ռեստորան+Երևան",
    icon: (
      <svg viewBox="0 0 48 48" width="36" height="36">
        <g fill="none" stroke="#b9925f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 6v16a4 4 0 0 0 4 4v18" />
          <path d="M14 6v10" /><path d="M18 6v10" />
          <path d="M34 6c-4 0-6 4-6 9s2 8 6 8" />
          <path d="M34 6v38" />
        </g>
      </svg>
    ),
  },
];

export default function VenueSection() {
  return (
    <section className="py-14 px-5 flex flex-col items-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6))" }} />
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20 L12 16 L7.5 20 L9.5 13.5 L4 9 L10.5 9 Z" fill="rgba(201,168,76,0.7)" />
          </svg>
          <div className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.6))" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
            color: "#3D3530",
            textAlign: "center",
          }}
        >
          Արարողությունների վայրերը
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-5 max-w-2xl w-full">
        {VENUES.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            style={{
              flex: "1 1 260px",
              maxWidth: 300,
              background: "linear-gradient(160deg, #FDF9F0 0%, #FAF5E8 100%)",
              border: "1px solid rgba(185,146,95,0.28)",
              borderRadius: 14,
              padding: "28px 24px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 6,
              boxShadow: "0 10px 32px -14px rgba(60,40,20,0.35)",
            }}
          >
            <div style={{ marginBottom: 6 }}>{v.icon}</div>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              {v.kind}
            </span>
            <h3
              style={{
                margin: "4px 0 0",
                fontFamily: "var(--font-playfair), serif",
                fontSize: "17px",
                fontWeight: 500,
                lineHeight: 1.35,
                color: "#3D3530",
              }}
            >
              {v.title}
            </h3>
            <p
              style={{
                margin: "2px 0 0",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                color: "#8B7355",
                lineHeight: 1.5,
              }}
            >
              {v.address}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                letterSpacing: "0.04em",
                color: "#3D3530",
              }}
            >
              20 Սեպտեմբերի &middot; {v.time}
            </p>
            <a
              href={v.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 12,
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                letterSpacing: "0.05em",
                color: "#832525",
                textDecoration: "none",
                borderBottom: "1px solid rgba(131,37,37,0.32)",
                paddingBottom: 1,
              }}
            >
              Տեսնել քարտեզի վրա →
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          marginTop: 40,
          maxWidth: 380,
          textAlign: "center",
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(0.85rem, 2vw, 0.98rem)",
          fontStyle: "italic",
          color: "#8B7355",
          lineHeight: 1.65,
        }}
      >
        Ձեր ներկայությունը մեզ համար կլինի լավագույն նվերը
      </motion.p>
    </section>
  );
}
