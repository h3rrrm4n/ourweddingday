"use client";

const PETALS = [
  { id: 0, left: 5, delay: 0, duration: 18, size: 14, color: "rgba(201,168,76,0.35)", rotation: 45 },
  { id: 1, left: 12, delay: 3, duration: 22, size: 10, color: "rgba(232,213,163,0.45)", rotation: 120 },
  { id: 2, left: 22, delay: 7, duration: 16, size: 18, color: "rgba(245,230,200,0.5)", rotation: 200 },
  { id: 3, left: 31, delay: 1, duration: 20, size: 12, color: "rgba(253,249,240,0.6)", rotation: 300 },
  { id: 4, left: 42, delay: 9, duration: 15, size: 16, color: "rgba(201,168,76,0.35)", rotation: 75 },
  { id: 5, left: 50, delay: 5, duration: 25, size: 9, color: "rgba(232,213,163,0.45)", rotation: 155 },
  { id: 6, left: 58, delay: 12, duration: 17, size: 20, color: "rgba(245,230,200,0.5)", rotation: 220 },
  { id: 7, left: 66, delay: 2, duration: 19, size: 11, color: "rgba(253,249,240,0.6)", rotation: 330 },
  { id: 8, left: 74, delay: 8, duration: 23, size: 15, color: "rgba(201,168,76,0.35)", rotation: 10 },
  { id: 9, left: 82, delay: 14, duration: 14, size: 13, color: "rgba(232,213,163,0.45)", rotation: 95 },
  { id: 10, left: 90, delay: 4, duration: 21, size: 17, color: "rgba(245,230,200,0.5)", rotation: 180 },
  { id: 11, left: 96, delay: 11, duration: 16, size: 8, color: "rgba(253,249,240,0.6)", rotation: 260 },
  { id: 12, left: 18, delay: 6, duration: 24, size: 19, color: "rgba(201,168,76,0.35)", rotation: 315 },
  { id: 13, left: 36, delay: 15, duration: 18, size: 12, color: "rgba(232,213,163,0.45)", rotation: 55 },
  { id: 14, left: 54, delay: 10, duration: 20, size: 14, color: "rgba(245,230,200,0.5)", rotation: 140 },
  { id: 15, left: 70, delay: 13, duration: 15, size: 16, color: "rgba(253,249,240,0.6)", rotation: 240 },
  { id: 16, left: 85, delay: 0.5, duration: 22, size: 10, color: "rgba(201,168,76,0.35)", rotation: 350 },
  { id: 17, left: 45, delay: 16, duration: 17, size: 13, color: "rgba(232,213,163,0.45)", rotation: 80 },
];

export default function FallingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {PETALS.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: "-30px",
            width: petal.size,
            height: petal.size * 1.4,
            animationName: "petal-fall",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <svg
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M10 2 Q18 8 16 18 Q12 26 10 26 Q8 26 4 18 Q2 8 10 2Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
