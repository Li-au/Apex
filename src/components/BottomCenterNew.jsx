// Active bonuses display
export default function BottomCenterNew({ coinBonus, gemBonus, essenceBonus, critBonus }) {
  return (
    <div className="p-8 border border-purple-500/30 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent backdrop-blur-sm">
      <div className="text-xs uppercase tracking-wider text-slate-400 mb-4 text-center">
        Active Bonuses
      </div>

      <div className="flex gap-8">
        {/* Coins Bonus */}
        <div className="text-center">
          <div className="text-2xl mb-2">$</div>
          <div className="text-amber-400 font-bold text-lg">+{(coinBonus * 100).toFixed(0)}%</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Coins</div>
        </div>

        {/* Gems Bonus */}
        <div className="text-center">
          <div className="text-2xl mb-2">◆</div>
          <div className="text-blue-400 font-bold text-lg">+{(gemBonus * 100).toFixed(0)}%</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Gems</div>
        </div>

        {/* Essences Bonus */}
        <div className="text-center">
          <div className="text-2xl mb-2">💧</div>
          <div className="text-cyan-400 font-bold text-lg">+{(essenceBonus * 100).toFixed(0)}%</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Essences</div>
        </div>

        {/* Crit Bonus */}
        <div className="text-center">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-purple-400 font-bold text-lg">+{(critBonus * 100).toFixed(1)}%</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Crit Chance</div>
        </div>
      </div>
    </div>
  )
}
