function Flower({
  cx,
  cy,
  scale = 1,
}: {
  cx: number;
  cy: number;
  scale?: number;
}) {
  const petal = "M0,2 C-4.2,-2 -4.2,-8.4 0,-12.6 C4.2,-8.4 4.2,-2 0,2 Z";
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <path key={deg} d={petal} transform={`rotate(${deg})`} />
      ))}
      <circle r="2.6" />
    </g>
  );
}

function Leaf({
  d,
}: {
  d: string;
}) {
  return <path d={d} />;
}

function Bouquet() {
  return (
    <>
      <Leaf d="M50,58 C40,64 33,74 34,86 C42,80 48,70 50,58 Z" />
      <Leaf d="M50,58 C60,64 67,74 66,86 C58,80 52,70 50,58 Z" />
      <Flower cx={50} cy={40} scale={1.05} />
      <Flower cx={33} cy={53} scale={0.62} />
      <Flower cx={67} cy={53} scale={0.62} />
    </>
  );
}

export default function WaxSeal() {
  const centerScale = "translate(50,50) scale(0.68) translate(-50,-50)";

  return (
    <div
      className="relative w-full h-full"
      style={{
        borderRadius: "48% 52% 51% 49% / 52% 48% 53% 47%",
        background:
          "radial-gradient(circle at 32% 26%, #D2B78E 0%, #C6A179 48%, #9A7850 100%)",
        boxShadow:
          "inset 0 2px 3px rgba(255,255,255,0.28), inset 0 -4px 7px rgba(70,45,20,0.35), 0 10px 20px -8px rgba(60,35,15,0.45)",
      }}
    >
      {/* fine wax texture */}
      <div
        className="paper-grain absolute inset-0"
        style={{ opacity: 0.18, mixBlendMode: "overlay", borderRadius: "inherit" }}
      />

      {/* pressed rim, as if stamped */}
      <div
        className="absolute inset-[9%]"
        style={{
          borderRadius: "inherit",
          boxShadow:
            "inset 0 1px 2px rgba(60,35,15,0.3), inset 0 -1px 1px rgba(255,255,255,0.15)",
        }}
      />

      {/* embossed floral bouquet — shadow / highlight / base for a hand-pressed relief */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <g opacity="0.45" fill="#5A3B1E" transform={`translate(2.2,3) ${centerScale}`}>
          <Bouquet />
        </g>
        <g opacity="0.35" fill="#F0DCB8" transform={`translate(-1.8,-2.4) ${centerScale}`}>
          <Bouquet />
        </g>
        <g fill="#8C6A42" transform={centerScale}>
          <Bouquet />
        </g>
      </svg>

      {/* soft glossy sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          background:
            "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 46%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
