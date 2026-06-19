// Left sidebar matching mockup
export default function LeftSidebarNew({
  onShop,
  onQuests,
  onTalents,
  dailyQuestsPreview,
}) {
  return (
    <div className="h-full flex flex-col items-center pt-12 pb-40 px-3 gap-12">
      {/* Shop Button */}
      <button
        onClick={onShop}
        className="flex flex-col items-center gap-3 group cursor-pointer relative"
      >
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="w-20 h-20 rounded-full border-2 border-amber-500/60 group-hover:border-amber-400 flex items-center justify-center text-3xl group-hover:bg-amber-500/5 transition-all duration-300">
          🛍️
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-amber-400 text-center font-light">Shop</div>
      </button>

      {/* Quests Button */}
      <button
        onClick={onQuests}
        className="flex flex-col items-center gap-3 group cursor-pointer relative"
      >
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full"></div>
        <div className="w-20 h-20 rounded-full border-2 border-cyan-500/60 group-hover:border-cyan-400 flex items-center justify-center text-3xl group-hover:bg-cyan-500/5 transition-all duration-300">
          📋
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-cyan-400 text-center font-light">Quests</div>
      </button>

      {/* Talents Button */}
      <button
        onClick={onTalents}
        className="flex flex-col items-center gap-3 group cursor-pointer relative"
      >
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="w-20 h-20 rounded-full border-2 border-purple-500/60 group-hover:border-purple-400 flex items-center justify-center text-3xl group-hover:bg-purple-500/5 transition-all duration-300">
          🌳
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-purple-400 text-center font-light">Talents</div>
      </button>

      {/* Daily Quests Section */}
      <div className="mt-auto w-full border-t-2 border-purple-500/30 pt-8 px-2">
        <div className="text-xs uppercase tracking-widest text-slate-600 mb-6 text-center font-light">Daily Quests</div>
        <div className="space-y-4 text-xs">
          {dailyQuestsPreview && dailyQuestsPreview.slice(0, 3).map((quest, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="text-lg flex-shrink-0">{quest.icon}</div>
                  <div className="truncate text-slate-400 font-light">{quest.name}</div>
                </div>
                <div className="text-cyan-400 whitespace-nowrap flex-shrink-0 font-bold">{quest.reward}✨</div>
              </div>
              <div className="bg-slate-700/40 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                  style={{ width: `${Math.min((quest.current / quest.target) * 100, 100)}%` }}
                />
              </div>
              <div className="text-xs text-slate-600 text-right font-light">{quest.current} / {quest.target}</div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 text-xs uppercase tracking-widest text-slate-600 hover:text-purple-400 transition-colors py-2 font-light">
          View All Quests >
        </button>
      </div>
    </div>
  )
}
