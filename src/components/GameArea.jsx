import { useRef } from 'react'
import { getLevelData } from '../data/levels'
import { SKINS } from '../data/skins'
import { getEventAtLevel, isSpecialEventLevel } from '../data/specialEvents'

export default function GameArea({ level, bossHealth, maxHealth, onTap, floatingDamage, activeSkin }) {
  const tapZoneRef = useRef(null)
  const healthPercent = (bossHealth / maxHealth) * 100
  const levelData = getLevelData(level)

  // Get boss color and emoji based on variant
  const getBossStyle = () => {
    // Check for special event boss
    if (isSpecialEventLevel(level)) {
      const event = getEventAtLevel(level)
      if (event) {
        const eventColors = {
          EPIC: 'from-blue-600 to-purple-600',
          LEGENDARY: 'from-purple-600 to-pink-600',
          MYTHICAL: 'from-pink-600 to-yellow-600',
          TRANSCENDENT: 'from-yellow-500 to-red-600',
        }
        return {
          color: eventColors[event.difficulty] || 'from-yellow-500 to-red-600',
          emoji: event.boss,
          name: event.name
        }
      }
    }

    const variants = {
      common: { color: 'from-orange-500 to-orange-600', emoji: '👹', name: 'Goblin' },
      rare: { color: 'from-blue-500 to-blue-600', emoji: '🧟', name: 'Zombie' },
      epic: { color: 'from-purple-600 to-purple-700', emoji: '🧛', name: 'Vampire' },
      legendary: { color: 'from-indigo-600 to-indigo-900', emoji: '👹', name: 'Demon' },
    }
    return variants[levelData?.variant || 'common']
  }

  const bossStyle = getBossStyle()

  const handleTap = (e) => {
    const rect = tapZoneRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    onTap(x, y)
  }

  const activeSkinData = SKINS.find(s => s.id === activeSkin) || SKINS[0]

  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 py-1 px-2">
      {/* Boss Display */}
      <div className="text-3xl animate-bounce">
        {bossStyle.emoji}
      </div>

      {/* Active Skin Display */}
      <div className="text-2xl">
        {activeSkinData.emoji}
      </div>

      {/* Boss Name and Level */}
      <div className="text-center text-xs">
        <div className="text-slate-400">Lvl {level} • {bossStyle.name}</div>
      </div>

      {/* Health Bar */}
      <div className="w-full max-w-xs px-2">
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner border border-slate-600">
          <div
            className={`h-full bg-gradient-to-r ${bossStyle.color} transition-all duration-100`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>
        <div className="text-center text-xs text-slate-400 mt-0.5">
          {Math.floor(bossHealth)} / {Math.floor(maxHealth)}
        </div>
      </div>

      {/* Tap Zone */}
      <button
        ref={tapZoneRef}
        onClick={handleTap}
        className="relative w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-3 border-slate-600 hover:border-amber-500 transition-all shadow-lg hover:shadow-amber-500/50 active:scale-95 transform duration-100 cursor-pointer group overflow-hidden mt-1"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
              👊
            </div>
            <div className="text-white font-bold text-xs">TAP!</div>
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

    </div>
  )
}
