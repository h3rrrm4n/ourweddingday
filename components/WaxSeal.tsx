function FlowerPetals() {
  const petal = "M50,52 C38,40 38,14 50,2 C62,14 62,40 50,52 Z";
  return (
    <>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path key={deg} d={petal} transform={`rotate(${deg} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="7" />
    </>
  );
}

export default function WaxSeal() {
  const centerScale = "translate(50,50) scale(0.58) translate(-50,-50)";

  return (
    <div
      className="relative w-full h-full"
      style={{
        borderRadius: "48% 52% 51% 49% / 52% 48% 53% 47%",
        background:
          "radial-gradient(circle at 32% 26%, #7A2A33 0%, #5C1A22 48%, #3E0F16 100%)",
        boxShadow:
          "inset 0 2px 3px rgba(255,255,255,0.18), inset 0 -4px 7px rgba(0,0,0,0.45), 0 10px 20px -8px rgba(30,8,8,0.55)",
      }}
    >
      {/* fine wax texture */}
      <div
        className="paper-grain absolute inset-0"
        style={{ opacity: 0.2, mixBlendMode: "overlay", borderRadius: "inherit" }}
      />

      {/* pressed rim, as if stamped */}
      <div
        className="absolute inset-[9%]"
        style={{
          borderRadius: "inherit",
          boxShadow:
            "inset 0 1px 2px rgba(0,0,0,0.35), inset 0 -1px 1px rgba(255,255,255,0.08)",
        }}
      />

      {/* embossed floral emblem — shadow / highlight / base for a hand-pressed relief */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <g opacity="0.5" fill="#280810" transform={`translate(2.4,3.2) ${centerScale}`}>
          <FlowerPetals />
        </g>
        <g opacity="0.35" fill="#A65460" transform={`translate(-2,-2.6) ${centerScale}`}>
          <FlowerPetals />
        </g>
        <g fill="#5C1A22" transform={centerScale}>
          <FlowerPetals />
        </g>
      </svg>

      {/* soft glossy sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          background:
            "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 46%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
