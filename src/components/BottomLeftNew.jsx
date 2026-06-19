// Bottom left - Daily quests preview
export default function BottomLeftNew({ dailyQuests, onViewAll }) {
  const topQuests = dailyQuests.slice(0, 3)

  return (
    <div className="p-6 border border-purple-500/30 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent backdrop-blur-sm max-w-64">
      <div className="text-xs uppercase tracking-wider text-slate-400 mb-4">
        Daily Quests
      </div>

      <div className="space-y-3">
        {topQuests.map((quest, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-lg">{quest.icon}</div>
                <div className="text-xs font-semibold text-white">{quest.name}</div>
              </div>
              <div className="text-xs text-cyan-400 font-bold">{quest.reward}✨</div>
            </div>
            {/* Progress bar */}
            <div className="bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                style={{ width: `${(quest.current / quest.target) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 text-right">
              {quest.current} / {quest.target}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewAll}
        className="w-full mt-4 text-xs uppercase tracking-wider text-slate-400 hover:text-purple-400 transition-colors py-2 border-t border-purple-500/20"
      >
        View All Quests >
      </button>
    </div>
  )
}
