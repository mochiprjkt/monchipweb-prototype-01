// Decorative chip illustration used on product cards. Drawn with SVG so it
// scales crisply and inherits the theme-aware drop-shadow from .chip-svg.
const PALETTES = {
  singkong: { base: '#F4C842', edge: '#E0A818', spots: '#C58A0E' },
  ungu: { base: '#7E22CE', edge: '#5B1A9E', spots: '#3F1170' },
  orange: { base: '#F4721E', edge: '#D4520A', spots: '#A23C06' },
  pisang: { base: '#E8B923', edge: '#C99A10', spots: '#9E7A0A' },
  // Ubi Mix combines purple & orange yam — a hard 50/50 split reads as "two in one".
  mix: { base: '#7E22CE', edge: '#F4721E', spots: '#5B1A9E', stroke: '#5B1A9E', split: true },
};

export default function ChipIllustration({ variant = 'singkong', className = '' }) {
  const p = PALETTES[variant] || PALETTES.singkong;
  const id = `chip-${variant}`;

  return (
    <svg viewBox="0 0 220 180" className={`chip-svg chip-illustration w-full ${className}`} aria-hidden="true">
      <defs>
        {p.split ? (
          <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={p.base} />
            <stop offset="50%" stopColor={p.base} />
            <stop offset="50%" stopColor={p.edge} />
            <stop offset="100%" stopColor={p.edge} />
          </linearGradient>
        ) : (
          <radialGradient id={`${id}-fill`} cx="38%" cy="30%" r="75%">
            <stop offset="0%" stopColor={p.base} />
            <stop offset="100%" stopColor={p.edge} />
          </radialGradient>
        )}
        <radialGradient id={`${id}-glaze`} cx="35%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Chip body — irregular organic blob */}
      <path
        d="M40 92
           C 30 60, 70 30, 110 34
           C 150 38, 190 55, 188 92
           C 186 128, 150 150, 110 146
           C 70 142, 50 124, 40 92 Z"
        fill={`url(#${id}-fill)`}
        stroke={p.stroke || p.edge}
        strokeWidth="2.5"
      />

      {/* Texture spots */}
      <g fill={p.spots} opacity="0.55">
        <circle cx="70" cy="70" r="4" />
        <circle cx="120" cy="60" r="5" />
        <circle cx="150" cy="90" r="3.5" />
        <circle cx="95" cy="110" r="4.5" />
        <circle cx="135" cy="120" r="3" />
        <circle cx="60" cy="100" r="3" />
      </g>

      {/* Glaze highlight */}
      <ellipse cx="80" cy="62" rx="34" ry="18" fill={`url(#${id}-glaze)`} transform="rotate(-25 80 62)" />
    </svg>
  );
}
