// APEX angular hexagon arrow logo from the mockup
export default function ApexLogo({ size = 36, color = '#f59e0b' }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      {/* Hexagon frame */}
      <polygon
        points="20,2 35.5,11 35.5,29 20,38 4.5,29 4.5,11"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.45"
      />
      {/* Upward arrowhead */}
      <path
        d="M20 9 L29 27 L20 22.5 L11 27 Z"
        fill={color}
      />
      <path
        d="M20 16 L24.5 25.5 L20 23.2 L15.5 25.5 Z"
        fill="#0f0a1e"
        opacity="0.55"
      />
    </svg>
  )
}
