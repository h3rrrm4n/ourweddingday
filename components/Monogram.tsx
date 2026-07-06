function BotanicalStem() {
  return (
    <svg
      width="28"
      height="104"
      viewBox="0 0 28 104"
      fill="none"
      className="shrink-0 text-ink"
    >
      <line x1="14" y1="6" x2="14" y2="100" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M14 26 C8 22 3 25 1 32 C8 32 12 30 14 26 Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M14 26 C20 22 25 25 27 32 C20 32 16 30 14 26 Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M14 48 C9 45 5 48 4 54 C9 54 12 52 14 48 Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M14 48 C19 45 23 48 24 54 C19 54 16 52 14 48 Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <circle cx="14" cy="8" r="2.6" stroke="currentColor" strokeWidth="0.7" />
      <path d="M14 5.5 C12.5 3.5 12.5 1.5 14 0" stroke="currentColor" strokeWidth="0.6" />
      <path d="M14 5.5 C15.5 3.5 15.5 1.5 14 0" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export default function Monogram({
  initials = ["S", "J"] as [string, string],
}: {
  initials?: [string, string];
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 text-ink">
      <span
        className="font-serif leading-none"
        style={{ fontSize: "clamp(40px, 11vw, 72px)" }}
      >
        {initials[0]}
      </span>
      <BotanicalStem />
      <span
        className="font-serif leading-none"
        style={{ fontSize: "clamp(40px, 11vw, 72px)" }}
      >
        {initials[1]}
      </span>
    </div>
  );
}
