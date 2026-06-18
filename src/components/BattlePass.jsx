const BATTLE_PASS_TIERS = [
  { tier: 1, reward: '100 coins', free: true },
  { tier: 2, reward: 'Fire Fist Skin', free: false },
  { tier: 3, reward: '500 coins', free: true },
  { tier: 4, reward: 'Battle Pass Token', free: false },
  { tier: 5, reward: '1K coins', free: true },
  { tier: 6, reward: 'Ice Punch Skin', free: false },
  { tier: 7, reward: '2.5K coins', free: true },
  { tier: 8, reward: 'Prestige Boost', free: false },
  { tier: 9, reward: '5K coins', free: true },
  { tier: 10, reward: 'Divine Fist Skin', free: false },
]

export default function BattlePass({ currentLevel, onClose }) {
  const progress = (currentLevel / 50) * 100

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-slate-600 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">⭐ Battle Pass</h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Battle Pass Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Season 1 Progress</h3>
              <div className="text-sm text-slate-400">{Math.floor(progress)}%</div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden border border-slate-600">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-2">Complete levels to earn battle pass XP</div>
          </div>

          {/* Tiers */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white mb-4">Rewards</h3>
            {BATTLE_PASS_TIERS.map((item) => {
              const isClaimed = currentLevel >= item.tier * 5

              return (
                <div
                  key={item.tier}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                    isClaimed
                      ? 'bg-slate-700 border-slate-600'
                      : item.free
                      ? 'bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600'
                      : 'bg-gradient-to-r from-purple-900 to-slate-800 border-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-amber-400">Tier {item.tier}</div>
                    <div className="text-sm text-slate-300">{item.reward}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!item.free && (
                      <div className="text-xs bg-purple-600 px-2 py-1 rounded text-white">
                        Premium
                      </div>
                    )}
                    {isClaimed && (
                      <div className="text-lg">✓</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Premium Button */}
          <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all">
            🔓 Unlock Premium ($9.99)
          </button>
        </div>
      </div>
    </div>
  )
}
