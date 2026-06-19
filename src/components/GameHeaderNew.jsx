// New header design matching mockup
export default function GameHeaderNew({
  level,
  currency,
  gems,
  essences,
  prestige,
  ascensions,
  ascensionMultiplier,
  onMenuClick,
}) {
  return (
    <div className="h-24 bg-gradient-to-b from-slate-900 via-purple-900/50 to-transparent border-b border-purple-500/30 px-8 py-4 flex items-center justify-between">
      {/* Left Stats Group */}
      <div className="flex gap-8 items-center flex-1">
        {/* Level */}
        <div className="flex items-center gap-3">
          <div className="text-amber-400 text-xl">▲</div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Level</div>
            <div className="text-2xl font-bold text-white">{level}</div>
            <div className="text-xs text-amber-400 mt-1">42%</div>
          </div>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-2">
          <div className="text-amber-400 text-lg">$</div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Coins</div>
            <div className="text-lg font-bold text-white">{(currency / 1e9).toFixed(2)}B</div>
          </div>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-2">
          <div className="text-blue-400 text-lg">◆</div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Gems</div>
            <div className="text-lg font-bold text-white">{gems}</div>
          </div>
        </div>

        {/* Essences */}
        <div className="flex items-center gap-2">
          <div className="text-cyan-400 text-lg">💧</div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Essences</div>
            <div className="text-lg font-bold text-white">{(essences / 1e3).toFixed(1)}K</div>
          </div>
        </div>

        {/* Prestige */}
        <div className="flex items-center gap-2">
          <div className="text-purple-400 text-lg">◉</div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Prestige</div>
            <div className="text-lg font-bold text-white">{prestige}</div>
          </div>
        </div>
      </div>

      {/* Right - Ascend Button */}
      {level >= 200 && (
        <button
          onClick={onMenuClick}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all transform hover:scale-105 animate-pulse text-sm"
        >
          🔒 ASCEND
          <div className="text-xs text-red-200 mt-1">Unlocks at Lv. 200</div>
        </button>
      )}
    </div>
  )
}
