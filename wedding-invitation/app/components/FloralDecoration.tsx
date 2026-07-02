"use client";

interface FloralDecorationProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  opacity?: number;
  size?: number;
}

export default function FloralDecoration({
  position,
  opacity = 0.18,
  size = 280,
}: FloralDecorationProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-[-1]",
  };

  return (
    <div
      className={`fixed pointer-events-none z-0 ${positionClasses[position]}`}
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main branch */}
        <path
          d="M10 270 Q40 220 60 180 Q80 140 100 100 Q120 60 140 30"
          stroke="#C9A84C"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Sub-branches */}
        <path
          d="M60 180 Q30 160 10 150"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M80 140 Q55 110 45 95"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 100 Q130 80 145 70"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Rose 1 */}
        <g transform="translate(15, 140)">
          <circle cx="0" cy="0" r="14" fill="#E8D5A3" fillOpacity="0.6" />
          <path d="M0,-10 Q8,-8 10,0 Q8,8 0,10 Q-8,8 -10,0 Q-8,-8 0,-10Z" fill="#C9A84C" fillOpacity="0.5" />
          <path d="M0,-6 Q5,-4 6,0 Q5,4 0,6 Q-5,4 -6,0 Q-5,-4 0,-6Z" fill="#A07830" fillOpacity="0.4" />
          <circle cx="0" cy="0" r="2.5" fill="#C9A84C" />
        </g>
        {/* Rose 2 */}
        <g transform="translate(48, 90)">
          <circle cx="0" cy="0" r="11" fill="#E8D5A3" fillOpacity="0.5" />
          <path d="M0,-8 Q6,-6 8,0 Q6,6 0,8 Q-6,6 -8,0 Q-6,-6 0,-8Z" fill="#C9A84C" fillOpacity="0.45" />
          <circle cx="0" cy="0" r="2" fill="#C9A84C" />
        </g>
        {/* Rose 3 */}
        <g transform="translate(145, 65)">
          <circle cx="0" cy="0" r="13" fill="#E8D5A3" fillOpacity="0.55" />
          <path d="M0,-9 Q7,-7 9,0 Q7,7 0,9 Q-7,7 -9,0 Q-7,-7 0,-9Z" fill="#C9A84C" fillOpacity="0.5" />
          <circle cx="0" cy="0" r="2.5" fill="#A07830" />
        </g>
        {/* Small buds */}
        <g transform="translate(110, 100)">
          <ellipse cx="0" cy="0" rx="5" ry="8" fill="#C9A84C" fillOpacity="0.4" transform="rotate(-20)" />
        </g>
        <g transform="translate(75, 108)">
          <ellipse cx="0" cy="0" rx="4" ry="7" fill="#E8D5A3" fillOpacity="0.5" transform="rotate(15)" />
        </g>
        {/* Leaves */}
        <path
          d="M60 180 Q50 165 55 150 Q65 160 60 180Z"
          fill="#C9A84C"
          fillOpacity="0.25"
        />
        <path
          d="M80 140 Q65 125 72 110 Q82 122 80 140Z"
          fill="#C9A84C"
          fillOpacity="0.2"
        />
        <path
          d="M100 100 Q115 88 125 90 Q115 105 100 100Z"
          fill="#C9A84C"
          fillOpacity="0.2"
        />
        {/* Tiny dots / pollen */}
        {[
          [30, 120], [70, 170], [90, 125], [130, 80], [115, 115],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="#C9A84C" fillOpacity="0.5" />
        ))}
      </svg>
    </div>
  );
}
