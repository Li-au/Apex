// Header matching mockup design exactly
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
    <div className="h-20 bg-gradient-to-b from-slate-900/80 via-purple-900/40 to-transparent border-b-2 border-purple-500/50 px-8 py-3 flex items-center justify-between">
      {/* Stats Group */}
      <div className="flex gap-12 items-center flex-1">
        {/* Level with Progress Bar */}
        <div className="flex items-center gap-4 border-l-2 border-purple-500/30 pl-6">
          <div className="text-amber-400 text-2xl">▲</div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-light">Level</div>
            <div className="text-3xl font-bold text-white">{level}</div>
            <div className="w-24 h-1.5 bg-slate-700/50 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: '42%' }} />
            </div>
          </div>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-3 border-l-2 border-purple-500/30 pl-6">
          <div className="text-amber-400 text-2xl">$</div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-light">Coins</div>
            <div className="text-2xl font-bold text-white">{(currency / 1e9).toFixed(2)}B</div>
          </div>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-3 border-l-2 border-purple-500/30 pl-6">
          <div className="text-indigo-400 text-2xl">◆</div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-light">Gems</div>
            <div className="text-2xl font-bold text-white">{gems}</div>
          </div>
        </div>

        {/* Essences */}
        <div className="flex items-center gap-3 border-l-2 border-purple-500/30 pl-6">
          <div className="text-cyan-400 text-2xl">💧</div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-light">Essences</div>
            <div className="text-2xl font-bold text-white">{(essences / 1e3).toFixed(1)}K</div>
          </div>
        </div>

        {/* Prestige */}
        <div className="flex items-center gap-3 border-l-2 border-purple-500/30 pl-6">
          <div className="text-purple-400 text-2xl">◉</div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-light">Prestige</div>
            <div className="text-2xl font-bold text-white">{prestige}</div>
          </div>
        </div>
      </div>

      {/* Ascend Button */}
      {level >= 200 && (
        <button
          onClick={onMenuClick}
          className="px-6 py-2 bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-600 hover:to-red-700 border-2 border-red-500/50 text-white font-bold rounded-xl transition-all text-sm ml-auto"
        >
          🔒 ASCEND
          <div className="text-xs text-red-300 mt-0.5">Unlocks at Lv. 200</div>
        </button>
      )}
    </div>
  )
}
