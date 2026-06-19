// Left sidebar with Shop, Quests, Talents, Daily Quests
export default function LeftSidebarNew({
  onShop,
  onQuests,
  onTalents,
  dailyQuestsPreview,
}) {
  return (
    <div className="h-full flex flex-col items-center pt-8 pb-40 px-4 gap-8">
      {/* Shop */}
      <button
        onClick={onShop}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 group-hover:border-amber-400 flex items-center justify-center text-2xl group-hover:bg-amber-500/10 transition-all">
          🛍️
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-amber-400 text-center">Shop</div>
      </button>

      {/* Quests */}
      <button
        onClick={onQuests}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border-2 border-cyan-500/50 group-hover:border-cyan-400 flex items-center justify-center text-2xl group-hover:bg-cyan-500/10 transition-all">
          📋
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-cyan-400 text-center">Quests</div>
      </button>

      {/* Talents */}
      <button
        onClick={onTalents}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border-2 border-purple-500/50 group-hover:border-purple-400 flex items-center justify-center text-2xl group-hover:bg-purple-500/10 transition-all">
          🌳
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-purple-400 text-center">Talents</div>
      </button>

      {/* Daily Quests Preview */}
      <div className="mt-auto w-full border-t border-purple-500/20 pt-6">
        <div className="text-xs uppercase tracking-wider text-slate-400 mb-4 text-center">Daily Quests</div>
        <div className="space-y-2 text-xs">
          {dailyQuestsPreview && dailyQuestsPreview.map((quest, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2">
              <div className="flex-1 truncate text-slate-400">{quest.name}</div>
              <div className="text-cyan-400 whitespace-nowrap">{quest.reward}✨</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-center text-slate-500">
          VIEW ALL QUESTS >
        </div>
      </div>
    </div>
  )
}
