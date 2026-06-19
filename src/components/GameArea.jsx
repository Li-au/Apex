import { useRef } from 'react'
import { getLevelData } from '../data/levels'
import { SKINS } from '../data/skins'
import { getEventAtLevel, isSpecialEventLevel } from '../data/specialEvents'
import { getHeroDamage } from '../data/heroes'

export default function GameArea({ level, bossHealth, maxHealth, onTap, floatingDamage, activeSkin, heroCount, prestigeMultiplier, ascensionMultiplier }) {
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

  // Calculate total damage
  let totalDamage = 1 * prestigeMultiplier
  if (heroCount) {
    Object.entries(heroCount).forEach(([heroId, count]) => {
      const heroDamage = getHeroDamage(parseInt(heroId))
      totalDamage += heroDamage * count * prestigeMultiplier * ascensionMultiplier
    })
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-3">
      {/* Boss Display */}
      <div className="text-6xl animate-bounce">
        {bossStyle.emoji}
      </div>

      {/* Boss Name and Level */}
      <div className="text-center">
        <div className="text-sm text-slate-400 uppercase tracking-wider">Level {level} Boss</div>
        <div className="text-2xl font-bold text-white">{bossStyle.name}</div>
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
            className={`h-full bg-gradient-to-r ${bossStyle.color} transition-all duration-100`}
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
              {activeSkinData.emoji}
            </div>
            <div className="text-white font-bold text-lg">TAP!</div>
            <div className="text-slate-300 text-sm mt-2">+{Math.floor(totalDamage)} Damage</div>
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
