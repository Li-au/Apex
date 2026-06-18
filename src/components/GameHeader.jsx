export default function GameHeader({ level, currency, gems, essences, prestige, ascensions, ascensionMultiplier, onMenuClick }) {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <button
          onClick={onMenuClick}
          className="text-2xl hover:scale-110 transition-transform absolute left-4"
          title="Menu"
        >
          ☰
        </button>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Level</div>
            <div className="text-4xl font-bold text-amber-400">{level}</div>
            <div className="text-xs text-slate-400">/200</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Currency</div>
            <div className="text-3xl font-bold text-yellow-300">
              {currency.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">coins</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Gems</div>
            <div className="text-3xl font-bold text-amber-400">
              {gems}
            </div>
            <div className="text-xs text-slate-500">💎</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Essence</div>
            <div className="text-3xl font-bold text-cyan-400">
              {essences}
            </div>
            <div className="text-xs text-slate-500">✨</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Prestige</div>
            <div className="text-4xl font-bold text-purple-400">{prestige}</div>
            <div className="text-xs text-slate-400">× {(1 + prestige * 0.5).toFixed(1)}x</div>
          </div>

          {ascensions > 0 && (
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Ascension</div>
              <div className="text-4xl font-bold text-red-400">🌟 {ascensions}</div>
              <div className="text-xs text-red-400">× {ascensionMultiplier.toFixed(2)}x</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
