# Luxury Wedding Invitation — Envelope Landing

A fullscreen luxury envelope experience that serves as the entrance to a
premium digital wedding invitation. Built with Next.js, TailwindCSS, and
Framer Motion.

The landing page shows a single, realistic ivory envelope with a burgundy
wax seal — no names, no dates, no buttons, no text. Clicking the seal
triggers a cinematic opening sequence (flap lifts, card slides out,
envelope dissolves) before the invitation content emerges.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Structure

- `app/page.tsx` — page composition and open/close state machine
- `components/Envelope.tsx` — envelope geometry, folds, and opening animation
- `components/WaxSeal.tsx` — embossed burgundy wax seal graphic
- `components/ContentReveal.tsx` — placeholder for the invitation content that
  emerges once the envelope opens
