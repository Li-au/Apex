import { getPrestigeTier, getPrestigeMultiplier } from '../data/prestige'

export default function PrestigeTierDisplay({ prestige }) {
  const tier = getPrestigeTier(prestige)
  const multiplier = getPrestigeMultiplier(prestige)
  const nextTier = prestige + 1

  const tierColors = {
    gray: 'from-slate-500 to-slate-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    yellow: 'from-yellow-500 to-yellow-600',
  }

  const tierBgColors = {
    gray: 'bg-slate-900',
    green: 'bg-green-900',
    blue: 'bg-blue-900',
    purple: 'bg-purple-900',
    pink: 'bg-pink-900',
    yellow: 'bg-yellow-900',
  }

  return (
    <div className={`bg-gradient-to-r ${tierColors[tier.color]} p-4 rounded-lg border-2 border-white shadow-lg`}>
      <div className="text-center">
        <div className="text-xs text-white uppercase tracking-wide opacity-90">Current Tier</div>
        <div className="text-3xl font-bold text-white mt-1">{tier.name}</div>
        <div className="text-sm text-white opacity-90 mt-1">
          Prestige #{prestige}
        </div>
        <div className="mt-3 pt-3 border-t border-white border-opacity-30">
          <div className="text-xs text-white opacity-80">Earning Multiplier</div>
          <div className="text-2xl font-bold text-white">{multiplier.toFixed(2)}x</div>
        </div>
      </div>
    </div>
  )
}
