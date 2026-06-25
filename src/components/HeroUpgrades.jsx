import { HEROES, getHeroDamage } from '../data/heroes'

export default function HeroUpgrades({ state, dispatch, onClose }) {
  const calculateUpgradeCost = (heroId) => {
    const baseSpeed = state.heroSpeed[heroId] || 1.0
    const level = Math.floor((baseSpeed - 1.0) * 10) // How many times upgraded
    return 25 * Math.pow(1.2, level)  // Cost increases exponentially
  }

  const handleUpgrade = (heroId) => {
    const cost = Math.floor(calculateUpgradeCost(heroId))
    if (state.gems >= cost) {
      dispatch({
        type: 'UPGRADE_HERO_SPEED',
        payload: heroId,
        cost: cost
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-slate-600 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">💎 Hero Upgrades</h2>
            <div className="text-sm text-slate-400 mt-1">Speed up your heroes with gems!</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl">💎</div>
              <div className="text-2xl font-bold text-amber-400">{state.gems}</div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {HEROES.map(hero => {
            const count = state.heroCount[hero.id] || 0
            if (count === 0) return null  // Hide heroes you don't own

            const speed = state.heroSpeed[hero.id] || 1.0
            const cost = Math.floor(calculateUpgradeCost(hero.id))
            const canAfford = state.gems >= cost

            return (
              <div
                key={hero.id}
                className="p-4 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{hero.icon}</div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-cyan-400">x{speed.toFixed(1)} Speed</div>
                    <div className="text-xs text-slate-400">Owned: {count}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-bold text-white">{hero.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Current: {(getHeroDamage(hero.id) * count * speed).toFixed(1)} DPS
                  </div>
                </div>

                <button
                  onClick={() => handleUpgrade(hero.id)}
                  disabled={!canAfford}
                  className={`w-full py-2 px-3 rounded font-bold transition-all ${
                    canAfford
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white cursor-pointer'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>⚡ Upgrade Speed</span>
                    <span>💎 {cost}</span>
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {Object.values(state.heroCount).every(count => count === 0) && (
          <div className="p-6 text-center text-slate-400">
            <div className="text-lg">Buy heroes first to upgrade them!</div>
          </div>
        )}
      </div>
    </div>
  )
}
