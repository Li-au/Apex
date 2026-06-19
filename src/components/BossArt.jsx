import { useState, useEffect } from 'react'

// Displays a real boss image with object-contain, light opacity and purple glow.
// Falls back to the boss emoji if the image is missing or fails to load.
export default function BossArt({ src, emoji, size = 220 }) {
  const [errored, setErrored] = useState(false)

  // Reset the error flag whenever the target image changes (e.g. new boss).
  useEffect(() => {
    setErrored(false)
  }, [src])

  const showImage = src && !errored

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={src}
          alt={emoji}
          onError={() => setErrored(true)}
          className="w-full h-full object-contain opacity-90 drop-shadow-[0_0_35px_rgba(168,85,247,0.6)] animate-bounce"
        />
      ) : (
        <div className="text-[120px] leading-none drop-shadow-[0_0_35px_rgba(168,85,247,0.55)] animate-bounce">
          {emoji}
        </div>
      )}
    </div>
  )
}
