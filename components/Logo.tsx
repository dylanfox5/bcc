/**
 * Two overlapping circles — left has a rook silhouette (terracotta on dark),
 * right has a ceramic vase silhouette (dark on terracotta) — inspired by the
 * Ben's Custom Creations business card.
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
      {/* Left circle — terracotta */}
      <circle cx="22" cy="24" r="21" fill="#C4622D" />
      {/* Right circle — earth brown, drawn on top creates overlap */}
      <circle cx="52" cy="24" r="21" fill="#3D2B1F" />

      {/* ── Rook silhouette on left circle (earth brown) ── */}
      {/* Three battlements */}
      <rect x="10" y="11" width="5" height="6" fill="#3D2B1F" />
      <rect x="17" y="11" width="5" height="6" fill="#3D2B1F" />
      <rect x="24" y="11" width="5" height="6" fill="#3D2B1F" />
      {/* Body */}
      <rect x="11" y="17" width="17" height="11" fill="#3D2B1F" />
      {/* Base — slightly wider */}
      <rect x="9"  y="28" width="21" height="5"  fill="#3D2B1F" />

      {/* ── Vase silhouette on right circle (terracotta) ── */}
      {/* Rim */}
      <rect x="48" y="10" width="12" height="3" rx="1.5" fill="#C4622D" />
      {/* Neck */}
      <rect x="52" y="13" width="4"  height="5"           fill="#C4622D" />
      {/* Body */}
      <ellipse cx="54" cy="31" rx="10" ry="10"            fill="#C4622D" />
      {/* Foot */}
      <rect x="50" y="39" width="8"  height="3"  rx="1"  fill="#C4622D" />
    </svg>
  );
}
