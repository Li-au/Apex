const HEROES = [
  { id: 0, name: 'Archer', icon: '🏹', baseCost: 25 },  // Increased from 10
  { id: 1, name: 'Knight', icon: '⚔️', baseCost: 150 },  // Increased from 50
  { id: 2, name: 'Mage', icon: '🧙', baseCost: 750 },  // Increased from 200
  { id: 3, name: 'Dragon', icon: '🐉', baseCost: 5000 },  // Increased from 1000
  { id: 4, name: 'Phoenix', icon: '🔥', baseCost: 35000 },  // Increased from 5000
  { id: 5, name: 'Titan', icon: '👹', baseCost: 250000 },  // Increased from 25000
  { id: 6, name: 'God', icon: '⚡', baseCost: 2000000 },  // Increased from 100000
  { id: 7, name: 'Ultimate', icon: '🌟', baseCost: 20000000 },  // Increased from 500000
]

export default function HeroShop({ state, dispatch, onClose }) {
  const calculateHeroCost = (heroId) => {
    const base = HEROES[heroId].baseCost
    const count = state.heroCount[heroId] || 0
    return Math.floor(base * Math.pow(1.15, count))
  }

  const handleBuyHero = (heroId) => {
    const cost = calculateHeroCost(heroId)
    if (state.currency >= cost) {
      dispatch({
        type: 'BUY_HERO',
        payload: heroId,
        heroCost: cost,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-slate-600 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">🛍️ Hero Shop</h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {HEROES.map(hero => {
            const cost = calculateHeroCost(hero.id)
            const count = state.heroCount[hero.id] || 0
            const canAfford = state.currency >= cost

            return (
              <button
                key={hero.id}
                onClick={() => handleBuyHero(hero.id)}
                disabled={!canAfford}
                className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  canAfford
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-amber-500 cursor-pointer'
                    : 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl">{hero.icon}</div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-300">{cost}</div>
                    <div className="text-xs text-slate-400">coins</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">{hero.name}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Owned: <span className="text-amber-400">{count}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    +{(hero.baseCost * 0.15).toFixed(1)} DPS each
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
