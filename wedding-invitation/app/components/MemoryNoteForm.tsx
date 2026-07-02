"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MemoryNoteForm() {
  const [first, setFirst] = useState("");
  const [last,  setLast]  = useState("");
  const [msg,   setMsg]   = useState("");
  const [sent,  setSent]  = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!first || !msg) return;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setFirst(""); setLast(""); setMsg("");
  };

  const inp: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1.5px solid rgba(42,33,24,0.12)",
    borderRadius: 12,
    padding: "13px 15px",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "0.9rem",
    color: "#2A2118",
    width: "100%",
    outline: "none",
  };

  return (
    <section
      className="py-14 px-5 flex flex-col items-center"
      style={{ background: "#EDE5D4" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        <h2 className="font-serif font-bold text-center mb-8"
          style={{ fontSize: "clamp(1.3rem, 5.5vw, 1.9rem)", color: "#2A2118" }}>
          Հուշային Նամակ Թողնել
        </h2>

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="card p-10 text-center">
            <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>💌</div>
            <p className="font-serif" style={{ fontSize: "1.1rem", color: "#2A2118" }}>Շնորհակալություն</p>
            <p className="font-sans mt-2" style={{ fontSize: "0.88rem", color: "var(--text-mid)" }}>Ձեր նամակն ուղարկվեց</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input style={inp} placeholder="Անուն" value={first} onChange={e => setFirst(e.target.value)} required />
              <input style={inp} placeholder="Ազգանուն" value={last} onChange={e => setLast(e.target.value)} />
            </div>
            <textarea
              style={{ ...inp, minHeight: 124, resize: "vertical" }}
              placeholder="Ձեր հուշային նամակը..."
              value={msg}
              onChange={e => setMsg(e.target.value)}
              required
            />

            <div className="flex gap-3">
              {[{ e: "📷", l: "Լուսանկար" }, { e: "🎥", l: "Վիդեո" }].map(b => (
                <button key={b.l} type="button"
                  className="flex-1 flex flex-col items-center gap-2 py-5 rounded-2xl font-sans"
                  style={{ border: "1.5px dashed rgba(42,33,24,0.18)", background: "rgba(255,255,255,0.6)", color: "var(--text-mid)", fontSize: "0.78rem", cursor: "pointer" }}>
                  <span style={{ fontSize: "1.4rem" }}>{b.e}</span>
                  {b.l}
                </button>
              ))}
            </div>

            <button type="button"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-sans"
              style={{ border: "1.5px dashed rgba(42,33,24,0.18)", background: "rgba(255,255,255,0.6)", color: "var(--text-mid)", fontSize: "0.82rem", cursor: "pointer", letterSpacing: "0.04em" }}>
              <span style={{ fontSize: "1.3rem" }}>🎙️</span>
              Ձայնագրություն ուղարկել
            </button>

            <motion.button type="submit"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="btn-gold mt-1" style={{ padding: "16px 28px" }}>
              Նամակ ուղարկել
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
