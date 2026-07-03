export default function MapButton({
  address,
  mapUrl,
}: {
  address: string;
  mapUrl: string;
}) {
  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3 text-[10px] font-medium tracking-[0.22em] uppercase text-ink/80 transition-colors hover:bg-ink/5 active:bg-ink/10"
      aria-label={`View ${address} on the map`}
    >
      View address on map
    </a>
  );
}
