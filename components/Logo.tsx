/**
 * Two overlapping circles matching the Ben's Custom Creations business card:
 * - Left circle: orange/terracotta with dark rook silhouette
 * - Right circle: deep red, overlapping left, with dark vase silhouette
 */
export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * (48 / 80)}
      viewBox="0 0 80 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ben's Custom Creations logo"
    >
      <defs>
        <clipPath id="bcc-left-clip">
          <circle cx="22" cy="24" r="21" />
        </clipPath>
        <clipPath id="bcc-right-clip">
          <circle cx="52" cy="24" r="21" />
        </clipPath>
      </defs>

      {/* Left circle — orange/terracotta */}
      <circle cx="22" cy="24" r="21" fill="#C4622D" />
      {/* Right circle — deep red, drawn on top so it overlaps left */}
      <circle cx="52" cy="24" r="21" fill="#8B1010" />

      {/* ── Rook — centered on cx=22, clipped to left circle ── */}
      <g fill="#111111" clipPath="url(#bcc-left-clip)">
        {/*
          Three merlons sit on a wide collar.
          The collar protrudes wider than the body below it.
          The body tapers gradually from a wide base up to the narrow body-top,
          then the collar steps outward before the merlons begin.
        */}
        {/* Merlons — 6px wide, 2px gaps, span x=11–33 matching the collar */}
        <rect x="11" y="10" width="6" height="6" />
        <rect x="19" y="10" width="6" height="6" />
        <rect x="27" y="10" width="6" height="6" />
        {/* Body + collar: wide base tapers inward going up, then collar shelves outward */}
        <path d="
          M 10 52
          L 34 52
          L 29 20
          L 33 20
          L 33 16
          L 11 16
          L 11 20
          L 15 20
          Z
        " />
      </g>

      {/* ── Vase — classic pottery silhouette, centered on cx=52, clipped to right circle ── */}
      <g fill="#111111" clipPath="url(#bcc-right-clip)">
        {/*
          Narrow foot → curves out to wide round belly →
          pinches to a narrow neck → lip flares outward at the mouth.
        */}
        <path d="
          M 48 52
          C 44 40 41 30 42 24
          C 43 18 48 14 49 13
          L 46 10
          L 58 10
          L 55 13
          C 56 14 61 18 62 24
          C 63 30 60 40 56 52
          Z
        " />
      </g>
    </svg>
  );
}
