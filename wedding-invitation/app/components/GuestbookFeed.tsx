"use client";

import { motion } from "framer-motion";

const NOTES = [
  {
    name: "Մարիամ Հ.",
    message: "Ի՜նչ գեղեցիկ արարողություն էր։ Ցանկանում ենք ձեզ հավերժական երջանկություն ❤️",
    photo: true,
    photoGrad: "linear-gradient(160deg, #D8C8A8 0%, #C0A880 100%)",
  },
  { name: "Արամ Ս.", message: "Շատ ուրախ ենք ձեր մեծ օրվա կապակցությամբ։ Բախտ ու երջանկություն! 🎉" },
  {
    name: "Նարինե Ա.",
    message: "Հարսնացուն ու փեսան ամենասիրուն զույգն էին 🥂",
    photo: true,
    photoGrad: "linear-gradient(160deg, #C8B898 0%, #B09870 100%)",
  },
  { name: "Վարդան Մ.", message: "Ամեն ամ ավելի ու ավելի երջանիկ լինեք ✨" },
];

export default function GuestbookFeed() {
  return (
    <section
      className="py-14 px-5 flex flex-col items-center"
      style={{ background: "linear-gradient(180deg, var(--bg-section) 0%, #EDE5D4 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        <p className="caps-label text-center mb-2">Հյուրերի նամակներ</p>
        <h2 className="font-serif font-bold text-center mb-8"
          style={{ fontSize: "clamp(1.3rem, 5.5vw, 1.9rem)", color: "#2A2118" }}>
          Հուշային Նամակներ
        </h2>

        <div className="flex flex-col gap-4">
          {NOTES.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="card overflow-hidden"
            >
              {note.photo && (
                <div style={{ height: 190, background: note.photoGrad, borderRadius: "18px 18px 0 0" }} />
              )}
              <div className="p-4 pb-5">
                <p className="font-serif font-bold mb-1.5"
                  style={{ fontSize: "1rem", color: "#2A2118" }}>{note.name}</p>
                <p className="font-sans"
                  style={{ fontSize: "0.88rem", color: "var(--text-mid)", lineHeight: 1.65 }}>{note.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
