export default function GameHeader({ level, currency, gems, essences, prestige, ascensions, ascensionMultiplier, onMenuClick }) {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-3 py-2">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="text-xl hover:scale-110 transition-transform"
          title="Menu"
        >
          ☰
        </button>
        <div className="flex items-center gap-3 flex-1 justify-center">
          <div className="text-center">
            <div className="text-[10px] text-slate-400">LVL</div>
            <div className="text-xl font-bold text-amber-400">{level}/200</div>
          </div>

          <div className="text-center">
            <div className="text-[10px] text-slate-400">💰</div>
            <div className="text-sm font-bold text-yellow-300">
              {(currency / 1000000).toFixed(1)}M
            </div>
          </div>

          <div className="text-center">
            <div className="text-[10px] text-slate-400">💎</div>
            <div className="text-sm font-bold text-amber-400">
              {gems}
            </div>
          </div>

          <div className="text-center">
            <div className="text-[10px] text-slate-400">✨</div>
            <div className="text-sm font-bold text-cyan-400">
              {essences}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-center">
            <div className="text-[10px] text-purple-400">✨ #{prestige}</div>
          </div>

          {ascensions > 0 && (
            <div className="text-center">
              <div className="text-[10px] text-red-400">🌟 {ascensions}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
