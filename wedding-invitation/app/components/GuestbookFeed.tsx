"use client";

import { motion } from "framer-motion";

interface GuestNote {
  name: string;
  message: string;
  hasPhoto?: boolean;
  photoColor?: string;
}

const SAMPLE_NOTES: GuestNote[] = [
  {
    name: "Մարիամ Հ.",
    message: "Ի՜նչ գեղեցիկ արարողություն էր։ Ցանկանում ենք ձեզ հավերժական երջանկություն ❤️",
    hasPhoto: true,
    photoColor: "linear-gradient(135deg, #D4C5B0, #C0A888)",
  },
  {
    name: "Արամ Ս.",
    message: "Շատ ուրախ ենք ձեր մեծ օրվա կապակցությամբ։ Բախտ ու երջանկություն! 🎉",
  },
  {
    name: "Նարինե Ա.",
    message: "Հարսնացուն ու փեսան ամենասիրուն զույգն էին։ Կեցցե՜ 🥂",
    hasPhoto: true,
    photoColor: "linear-gradient(135deg, #C8B89A, #B09070)",
  },
  {
    name: "Վարդան Մ.",
    message: "Ամեն ամ ավելի ու ավելի երջանիկ լինեք ✨",
  },
];

export default function GuestbookFeed() {
  return (
    <section
      id="guestbook"
      className="py-14 px-4 flex flex-col items-center"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm"
      >
        <p className="label-caps text-center mb-2">Հյուրերի ցանկ</p>
        <h2
          className="font-serif font-bold text-center mb-8"
          style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)", color: "var(--text-dark)" }}
        >
          Հուշային նամակներ
        </h2>

        <div className="flex flex-col gap-4">
          {SAMPLE_NOTES.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card overflow-hidden"
            >
              {note.hasPhoto && (
                <div
                  className="w-full"
                  style={{
                    height: 180,
                    background: note.photoColor,
                    borderRadius: "16px 16px 0 0",
                  }}
                />
              )}
              <div className="p-4">
                <p className="font-serif font-bold mb-1" style={{ fontSize: "1rem", color: "var(--text-dark)" }}>
                  {note.name}
                </p>
                <p className="font-sans" style={{ fontSize: "0.88rem", color: "var(--text-mid)", lineHeight: 1.6 }}>
                  {note.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
