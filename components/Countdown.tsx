"use client";

import { Fragment, useEffect, useState } from "react";

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target }: { target: Date }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const update = () => setTime(getTimeLeft(target));
    // Deferred via a macrotask (rather than called synchronously in the
    // effect body) so the server-rendered placeholder never has to match
    // a real, moment-in-time countdown value — no hydration mismatch.
    const immediate = setTimeout(update, 0);
    const id = setInterval(update, 1000);
    return () => {
      clearTimeout(immediate);
      clearInterval(id);
    };
  }, [target]);

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[10px] tracking-[0.3em] uppercase text-ink/50">
        Counting down to our day
      </p>
      <div className="flex items-start gap-3 sm:gap-5">
        {units.map((u, i) => (
          <Fragment key={u.label}>
            <div className="flex flex-col items-center min-w-[2.4em]">
              <span
                className="font-serif text-ink tabular-nums leading-none"
                style={{ fontSize: "clamp(26px, 6.5vw, 38px)" }}
              >
                {u.value !== undefined ? String(u.value).padStart(2, "0") : "00"}
              </span>
              <span className="text-[9px] tracking-[0.18em] uppercase text-ink/45 mt-2">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                className="font-serif text-ink/25 leading-none"
                style={{ fontSize: "clamp(20px, 5vw, 28px)", marginTop: "0.05em" }}
              >
                ·
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
