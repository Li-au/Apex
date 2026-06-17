export default function GameHeader({ level, currency, prestige }) {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Level</div>
            <div className="text-4xl font-bold text-amber-400">{level}</div>
            <div className="text-xs text-slate-400">/50</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wide">Currency</div>
            <div className="text-3xl font-bold text-yellow-300">
              {currency.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">coins</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-slate-400 uppercase tracking-wide">Prestige</div>
          <div className="text-4xl font-bold text-purple-400">{prestige}</div>
          <div className="text-xs text-slate-400">× {(1 + prestige * 0.5).toFixed(1)}x</div>
        </div>
      </div>
    </div>
  )
}
