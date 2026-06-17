import { useRef } from 'react'

export default function GameArea({ level, bossHealth, maxHealth, onTap, floatingDamage }) {
  const tapZoneRef = useRef(null)
  const healthPercent = (bossHealth / maxHealth) * 100

  // Get boss color based on level
  const getBossColor = () => {
    if (level <= 10) return 'from-orange-500 to-orange-600'
    if (level <= 25) return 'from-red-500 to-red-600'
    if (level <= 40) return 'from-purple-600 to-purple-700'
    return 'from-indigo-600 to-indigo-900'
  }

  const handleTap = (e) => {
    const rect = tapZoneRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    onTap(x, y)
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-6">
      {/* Boss Display */}
      <div className="text-6xl animate-bounce">
        {level <= 10 ? '👹' : level <= 25 ? '👿' : level <= 40 ? '🧛' : '👹'}
      </div>

      {/* Boss Name and Level */}
      <div className="text-center">
        <div className="text-sm text-slate-400 uppercase tracking-wider">Boss</div>
        <div className="text-2xl font-bold text-white">Level {level} Boss</div>
      </div>

      {/* Health Bar */}
      <div className="w-full px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-slate-300">Health</div>
          <div className="text-sm text-slate-400">
            {Math.floor(bossHealth)} / {Math.floor(maxHealth)}
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-8 overflow-hidden shadow-inner border-2 border-slate-600">
          <div
            className={`h-full bg-gradient-to-r ${getBossColor()} transition-all duration-100`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>

      {/* Tap Zone */}
      <button
        ref={tapZoneRef}
        onClick={handleTap}
        className="relative w-full aspect-square max-w-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl border-4 border-slate-600 hover:border-amber-500 transition-all shadow-2xl hover:shadow-amber-500/50 active:scale-95 transform duration-100 cursor-pointer group overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
              👊
            </div>
            <div className="text-white font-bold text-lg">TAP!</div>
            <div className="text-slate-400 text-sm mt-2">+1 Damage</div>
          </div>
        </div>

        {/* Floating Damage Numbers */}
        {floatingDamage.map(({ id, x, y, damage }) => (
          <div
            key={id}
            className="damage-number text-orange-400 font-bold"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            +{damage.toFixed(1)}
          </div>
        ))}
      </button>

      {/* Info Text */}
      <div className="text-center text-slate-400 text-sm mt-4">
        <div>Tap to attack! Buy heroes to auto-attack.</div>
        <div>Reach level 50 to unlock Prestige.</div>
      </div>
    </div>
  )
}
