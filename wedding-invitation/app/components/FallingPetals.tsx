"use client";

const PETALS = [
  { id: 0,  left: 5,  delay: 0,    dur: 18, size: 13, color: "rgba(184,149,46,0.22)",  rot: 45  },
  { id: 1,  left: 12, delay: 3,    dur: 22, size: 9,  color: "rgba(212,176,90,0.28)",  rot: 120 },
  { id: 2,  left: 22, delay: 7,    dur: 16, size: 16, color: "rgba(245,237,216,0.45)", rot: 200 },
  { id: 3,  left: 31, delay: 1,    dur: 20, size: 11, color: "rgba(253,249,240,0.5)",  rot: 300 },
  { id: 4,  left: 42, delay: 9,    dur: 15, size: 15, color: "rgba(184,149,46,0.2)",   rot: 75  },
  { id: 5,  left: 50, delay: 5,    dur: 25, size: 8,  color: "rgba(212,176,90,0.25)",  rot: 155 },
  { id: 6,  left: 58, delay: 12,   dur: 17, size: 18, color: "rgba(245,237,216,0.4)",  rot: 220 },
  { id: 7,  left: 66, delay: 2,    dur: 19, size: 10, color: "rgba(253,249,240,0.5)",  rot: 330 },
  { id: 8,  left: 74, delay: 8,    dur: 23, size: 14, color: "rgba(184,149,46,0.22)",  rot: 10  },
  { id: 9,  left: 82, delay: 14,   dur: 14, size: 12, color: "rgba(212,176,90,0.28)",  rot: 95  },
  { id: 10, left: 90, delay: 4,    dur: 21, size: 16, color: "rgba(245,237,216,0.4)",  rot: 180 },
  { id: 11, left: 96, delay: 11,   dur: 16, size: 7,  color: "rgba(253,249,240,0.5)",  rot: 260 },
  { id: 12, left: 18, delay: 6,    dur: 24, size: 17, color: "rgba(184,149,46,0.2)",   rot: 315 },
  { id: 13, left: 36, delay: 15,   dur: 18, size: 11, color: "rgba(212,176,90,0.25)",  rot: 55  },
  { id: 14, left: 54, delay: 10,   dur: 20, size: 13, color: "rgba(245,237,216,0.4)",  rot: 140 },
  { id: 15, left: 70, delay: 13,   dur: 15, size: 15, color: "rgba(253,249,240,0.5)",  rot: 240 },
  { id: 16, left: 85, delay: 0.5,  dur: 22, size: 9,  color: "rgba(184,149,46,0.22)",  rot: 350 },
  { id: 17, left: 45, delay: 16,   dur: 17, size: 12, color: "rgba(212,176,90,0.28)",  rot: 80  },
];

export default function FallingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {PETALS.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-30px",
            width: p.size,
            height: p.size * 1.45,
            animationName: "petal-fall",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <svg viewBox="0 0 20 29" fill="none" style={{ transform: `rotate(${p.rot}deg)` }}>
            <path d="M10 2 Q18 8 16 18 Q12 27 10 27 Q8 27 4 18 Q2 8 10 2Z" fill={p.color}/>
          </svg>
        </div>
      ))}
    </div>
  );
}
