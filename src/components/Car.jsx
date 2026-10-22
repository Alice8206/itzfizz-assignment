// Inline SVG car (no external assets). Wheels are exposed via classes for GSAP.
function Wheel({ cx }) {
  return (
    <g className="wheel">
      <circle cx={cx} cy="175" r="30" fill="#111" stroke="#9ca3af" strokeWidth="4" />
      <circle cx={cx} cy="175" r="8" fill="#9ca3af" />
      {[0, 60, 120].map((a) => (
        <line key={a} x1={cx} y1="150" x2={cx} y2="200" stroke="#9ca3af" strokeWidth="4"
              transform={`rotate(${a} ${cx} 175)`} />
      ))}
    </g>
  );
}

export default function Car() {
  return (
    <svg viewBox="0 0 600 220" className="h-auto w-full" role="img" aria-label="Sports car">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="208" rx="260" ry="9" fill="#000" opacity=".5" />
      <path d="M30 170 L40 140 Q60 120 130 112 L200 70 Q230 55 300 55 L390 58 Q430 70 470 108 L550 118 Q575 125 575 150 L575 172 Z"
            fill="url(#body)" />
      <path d="M215 80 L270 66 L275 108 L160 110 Z" fill="#0f172a" opacity=".85" />
      <path d="M290 66 L380 68 L430 108 L290 108 Z" fill="#0f172a" opacity=".85" />
      <rect x="555" y="130" width="22" height="10" rx="3" fill="#fde68a" />
      <rect x="28" y="135" width="16" height="9" rx="3" fill="#ef4444" />
      <Wheel cx={135} />
      <Wheel cx={470} />
    </svg>
  );
}
