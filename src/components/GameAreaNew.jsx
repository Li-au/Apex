import { useRef } from 'react'
import { getLevelData } from '../data/levels'
import { SKINS } from '../data/skins'
import { getHeroDamage } from '../data/heroes'
import { getEventAtLevel, isSpecialEventLevel } from '../data/specialEvents'

export default function GameAreaNew({
  level,
  bossHealth,
  maxHealth,
  onTap,
  floatingDamage,
  activeSkin,
  heroCount,
  prestigeMultiplier,
  ascensionMultiplier,
}) {
  const tapZoneRef = useRef(null)
  const healthPercent = (bossHealth / maxHealth) * 100
  const levelData = getLevelData(level)

  const getBossStyle = () => {
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
  const activeSkinData = SKINS.find(s => s.id === activeSkin) || SKINS[0]

  let totalDamage = 1 * prestigeMultiplier
  if (heroCount) {
    Object.entries(heroCount).forEach(([heroId, count]) => {
      const heroDamage = getHeroDamage(parseInt(heroId))
      totalDamage += heroDamage * count * prestigeMultiplier * ascensionMultiplier
    })
  }

  const handleTap = (e) => {
    const rect = tapZoneRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    onTap(x, y)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-8">
      {/* Boss Name and Title */}
      <div className="text-center">
        <div className="text-3xl font-bold text-white uppercase tracking-widest mb-2">
          {bossStyle.name}
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Boss</div>
      </div>

      {/* Health Bar */}
      <div className="w-96">
        <div className="bg-red-600/20 border border-red-600 rounded-lg h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-100"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
        <div className="text-xs text-slate-400 text-center mt-2">
          {Math.floor(bossHealth).toLocaleString()} / {Math.floor(maxHealth).toLocaleString()} HP
        </div>
      </div>

      {/* Boss Display with Tap Zone */}
      <div className="relative h-80 flex items-center justify-center">
        {/* Boss Emoji */}
        <div className="text-8xl animate-bounce mb-12">
          {bossStyle.emoji}
        </div>

        {/* Tap Zone - Circular */}
        <button
          ref={tapZoneRef}
          onClick={handleTap}
          className="absolute w-64 h-64 rounded-full border-2 border-purple-400/50 hover:border-purple-300 transition-all transform hover:scale-105 active:scale-95 duration-100 cursor-pointer flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-2xl font-light text-purple-300 uppercase tracking-widest">TAP</div>
            <div className="text-xs text-purple-400 uppercase tracking-wider mt-2">TO ATTACK</div>
            <div className="text-2xl mt-3">▼</div>
          </div>

          {/* Floating Damage Numbers */}
          {floatingDamage.map(({ id, x, y, damage }) => (
            <div
              key={id}
              className="damage-number text-amber-400 font-bold pointer-events-none"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              +{damage.toFixed(0)}
            </div>
          ))}
        </button>
      </div>

      {/* Damage Info */}
      <div className="text-center text-sm text-slate-400">
        <div>+{Math.floor(totalDamage)} Damage per tap</div>
        {(prestigeMultiplier > 1 || ascensionMultiplier > 1) && (
          <div className="mt-2 space-y-1 text-xs">
            {prestigeMultiplier > 1 && (
              <div className="text-violet-400">×{prestigeMultiplier.toFixed(2)} Prestige</div>
            )}
            {ascensionMultiplier > 1 && (
              <div className="text-red-400">×{ascensionMultiplier.toFixed(2)} Ascension</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
