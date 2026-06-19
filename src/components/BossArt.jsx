import { useState, useEffect } from 'react'

// Displays the boss art with light opacity and a soft purple glow.
// The PNG is pre-trimmed so its bottom edge is the boss's lower arc, which lets
// the parent seat it precisely against the TAP button. Falls back to the emoji.
export default function BossArt({ src, emoji, width = 400 }) {
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setErrored(false)
  }, [src])

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={emoji}
        onError={() => setErrored(true)}
        style={{ opacity: 0.88, width }}
        className="object-contain pointer-events-none drop-shadow-[0_0_30px_rgba(168,85,247,0.55)]"
      />
    )
  }

  return (
    <div className="text-[120px] leading-none drop-shadow-[0_0_30px_rgba(168,85,247,0.55)]">
      {emoji}
    </div>
  )
}
