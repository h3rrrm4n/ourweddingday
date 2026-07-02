"use client";

import { motion } from "framer-motion";

function FadeUp({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <>
      {/* ── FULL-BLEED PHOTO HERO ── */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Photo bg */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, #2A201A 0%, #3E3028 40%, #5A4436 70%, #3A2C22 100%)",
        }}>
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 85% 75% at 50% 45%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.55) 100%)",
          }}/>
          {/* Fade bottom into page bg */}
          <div className="absolute bottom-0 inset-x-0 h-40" style={{
            background: "linear-gradient(to bottom, transparent 0%, #FAF6EE 100%)",
          }}/>
        </div>

        {/* Text */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-20">
          <motion.p className="f-script mb-2"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            style={{ fontSize: "clamp(1.8rem, 8vw, 3rem)", color: "rgba(255,255,255,0.92)" }}>
            Save the Date
          </motion.p>
          <motion.h1 className="f-serif font-bold"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.9 }}
            style={{ fontSize: "clamp(2.4rem, 10vw, 4.4rem)", color: "#FFF", lineHeight: 1.08 }}>
            Անի & Արման
          </motion.h1>
          <motion.div className="flex items-center gap-3 my-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.54, duration: 0.8 }}>
            <div className="h-px w-14" style={{ background: "rgba(255,255,255,0.4)" }}/>
            <span className="caps" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.26em" }}>Ամուսնանում ենք</span>
            <div className="h-px w-14" style={{ background: "rgba(255,255,255,0.4)" }}/>
          </motion.div>
          <motion.p className="f-serif"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.8 }}
            style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)", color: "rgba(255,255,255,0.88)", letterSpacing: "0.04em" }}>
            20 Սեպտեմբերի 2026
          </motion.p>
        </div>
      </section>

      {/* ── INVITATION CARD — warm golden champagne gradient ── */}
      <section
        className="w-full flex flex-col items-center px-6 py-16 text-center"
        style={{
          background: `
            radial-gradient(ellipse 140% 90% at 15% 55%, rgba(195,155,55,0.42) 0%, transparent 55%),
            radial-gradient(ellipse 140% 90% at 85% 45%, rgba(195,155,55,0.38) 0%, transparent 55%),
            linear-gradient(180deg, #FAF2D8 0%, #F0E2A8 28%, #E8D490 52%, #F0E2A8 76%, #FAF5E0 100%)
          `,
        }}
      >
        {/* Vertical line at top */}
        <FadeUp delay={0}>
          <div className="w-px h-10 mb-6 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(140,100,30,0.4))" }}/>
        </FadeUp>

        {/* Save the Date script */}
        <FadeUp delay={0.05}>
          <p className="f-script" style={{ fontSize: "clamp(2rem, 9vw, 3.2rem)", color: "#2C2318" }}>
            Save the Date
          </p>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.12}>
          <div className="flex items-center gap-2 mt-3 mb-1">
            <div className="w-6 h-px" style={{ background: "rgba(140,100,30,0.4)" }}/>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,100,30,0.5)" }}/>
            <p className="caps" style={{ color: "rgba(44,35,24,0.65)", letterSpacing: "0.26em" }}>
              Հրավիրված եք մեր հարսանիքին
            </p>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,100,30,0.5)" }}/>
            <div className="w-6 h-px" style={{ background: "rgba(140,100,30,0.4)" }}/>
          </div>
        </FadeUp>

        {/* Decorative dots */}
        <FadeUp delay={0.16}>
          <div className="flex gap-2 my-4">
            {[0.3, 0.5, 0.7, 0.5, 0.3].map((o, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(100,80,40,${o})` }}/>
            ))}
          </div>
        </FadeUp>

        {/* Names */}
        <FadeUp delay={0.2}>
          <h2 className="f-serif font-bold" style={{ fontSize: "clamp(2rem, 8.5vw, 3.2rem)", color: "#2C2318" }}>
            Անի & Արման
          </h2>
        </FadeUp>

        {/* Caps subtitle */}
        <FadeUp delay={0.27}>
          <p className="caps mt-2 mb-6" style={{ letterSpacing: "0.3em", color: "rgba(44,35,24,0.55)" }}>
            Ամուսնանում ենք
          </p>
        </FadeUp>

        {/* Date in thin frame */}
        <FadeUp delay={0.33}>
          <div
            className="f-serif mb-7 px-8 py-3 relative"
            style={{
              fontSize: "clamp(1rem, 4vw, 1.2rem)",
              color: "#2C2318",
              letterSpacing: "0.05em",
              border: "1px solid rgba(42,33,24,0.25)",
              borderRadius: 2,
            }}
          >
            {/* Corner ticks */}
            {[
              { top: -4, left: -4, borderTop: "1.5px solid rgba(42,33,24,0.3)", borderLeft: "1.5px solid rgba(42,33,24,0.3)" },
              { top: -4, right: -4, borderTop: "1.5px solid rgba(42,33,24,0.3)", borderRight: "1.5px solid rgba(42,33,24,0.3)" },
              { bottom: -4, left: -4, borderBottom: "1.5px solid rgba(42,33,24,0.3)", borderLeft: "1.5px solid rgba(42,33,24,0.3)" },
              { bottom: -4, right: -4, borderBottom: "1.5px solid rgba(42,33,24,0.3)", borderRight: "1.5px solid rgba(42,33,24,0.3)" },
            ].map((s, i) => (
              <div key={i} className="absolute w-2.5 h-2.5" style={s as React.CSSProperties}/>
            ))}
            20 Սեպտեմբերի 2026
          </div>
        </FadeUp>

        {/* Scroll arrow */}
        <FadeUp delay={0.42}>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(140,100,30,0.6)", fontSize: "1.25rem" }}
          >
            ↓
          </motion.div>
        </FadeUp>
      </section>
    </>
  );
}
