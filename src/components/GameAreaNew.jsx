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
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Boss Name and Title */}
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-white uppercase tracking-[0.3em] mb-1">
          {bossStyle.name}
        </div>
        <div className="text-xs text-slate-500 uppercase tracking-widest font-light">Boss</div>
      </div>

      {/* Health Bar */}
      <div className="w-96 mb-12">
        <div className="bg-red-900/30 border-2 border-red-600/60 rounded-lg h-4 overflow-hidden shadow-lg shadow-red-600/20">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-100 shadow-inner"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
        <div className="text-xs text-slate-500 text-center mt-3 font-light">
          {Math.floor(bossHealth).toLocaleString()} / {Math.floor(maxHealth).toLocaleString()} HP
        </div>
      </div>

      {/* Boss Display Container */}
      <div className="relative w-full h-96 flex items-center justify-center mb-8">
        {/* Background Gradient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-80 bg-gradient-to-b from-purple-600/40 via-purple-500/20 to-purple-600/40 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Boss Emoji */}
        <div className="text-9xl animate-bounce relative z-10 drop-shadow-2xl">
          {bossStyle.emoji}
        </div>

        {/* Tap Zone - Circular */}
        <button
          ref={tapZoneRef}
          onClick={handleTap}
          className="absolute w-72 h-72 rounded-full border-2 border-purple-400/60 hover:border-purple-300/80 transition-all transform hover:scale-110 active:scale-95 duration-150 cursor-pointer flex items-center justify-center bg-gradient-to-b from-purple-500/5 to-transparent"
        >
          <div className="text-center z-20">
            <div className="text-2xl font-light text-purple-300 uppercase tracking-widest">TAP</div>
            <div className="text-xs text-purple-400 uppercase tracking-wider mt-3 font-light">TO ATTACK</div>
            <div className="text-3xl text-purple-400 mt-4 animate-bounce" style={{ animationDelay: '0.2s' }}>▼</div>
          </div>

          {/* Floating Damage Numbers */}
          {floatingDamage.map(({ id, x, y, damage }) => {
            const random = Math.random();
            const labels = ['CRITICAL!', 'GODLIKE!', '+'];
            const label = random > 0.8 ? labels[0] : random > 0.6 ? labels[1] : labels[2];
            const colors = random > 0.8 ? 'text-cyan-400' : random > 0.6 ? 'text-rose-400' : 'text-amber-400';

            return (
              <div
                key={id}
                className={`damage-number ${colors} font-bold pointer-events-none text-lg drop-shadow-lg`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div>{label}</div>
                <div className="text-sm">{damage.toFixed(0)}</div>
              </div>
            );
          })}
        </button>
      </div>

      {/* Damage Info */}
      <div className="text-center text-sm text-slate-400 font-light">
        <div className="text-lg text-white">+{Math.floor(totalDamage)} Damage</div>
        {(prestigeMultiplier > 1 || ascensionMultiplier > 1) && (
          <div className="mt-3 space-y-1 text-xs">
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
