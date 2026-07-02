"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MemoryNoteForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFirstName(""); setLastName(""); setMessage("");
  };

  const inputStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(44,37,32,0.15)",
    borderRadius: 10,
    padding: "13px 16px",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "0.9rem",
    color: "var(--text-dark)",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="memory"
      className="py-14 px-6 flex flex-col items-center"
      style={{ background: "var(--bg-warm)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        <h2
          className="font-serif font-bold text-center mb-8"
          style={{ fontSize: "clamp(1.3rem, 5vw, 1.9rem)", color: "var(--text-dark)" }}
        >
          Հուշային նամակ թողնել
        </h2>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>💌</div>
            <p className="font-serif" style={{ fontSize: "1.1rem", color: "var(--text-dark)" }}>
              Շնորհակալություն։
            </p>
            <p className="font-sans mt-2" style={{ fontSize: "0.88rem", color: "var(--text-mid)" }}>
              Ձեր նամակը ուղարկված է
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name row */}
            <div className="flex gap-3">
              <input
                style={inputStyle}
                placeholder="Անուն"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <input
                style={inputStyle}
                placeholder="Ազգանուն"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            {/* Message */}
            <textarea
              style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
              placeholder="Ձեր հուշային նամակը..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />

            {/* Upload buttons */}
            <div className="flex gap-3">
              {[
                { icon: "📷", label: "Լուսանկար" },
                { icon: "🎥", label: "Վիդեո" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl font-sans"
                  style={{
                    border: "1.5px dashed rgba(44,37,32,0.2)",
                    background: "transparent",
                    color: "var(--text-mid)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{btn.icon}</span>
                  {btn.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-sans"
              style={{
                border: "1.5px dashed rgba(44,37,32,0.2)",
                background: "transparent",
                color: "var(--text-mid)",
                fontSize: "0.82rem",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🎙️</span>
              Ձայնագրություն ուղարկել
            </button>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="gold-btn w-full mt-1"
              style={{ justifyContent: "center", padding: "16px 28px" }}
            >
              Նամակ ուղարկել
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
