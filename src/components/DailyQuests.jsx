export default function DailyQuests({ state, dispatch, onClose }) {
  const handleClaimReward = (questId) => {
    dispatch({ type: 'CLAIM_QUEST_REWARD', payload: questId })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-amber-500 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 border-b border-amber-500 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">📋 Daily Quests</h2>
            <div className="text-sm text-amber-100 mt-1">Complete objectives for rewards!</div>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-amber-100 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {state.dailyQuests.map((quest) => (
            <div
              key={quest.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                quest.completed
                  ? 'bg-green-900 border-green-500'
                  : 'bg-slate-700 border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{quest.name}</h3>
                <div className="text-right">
                  <div className="text-sm text-amber-300 font-bold">
                    +{quest.reward} coins
                  </div>
                  <div className="text-xs text-amber-200">
                    +{Math.floor(quest.reward / 2)} essence
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Progress</span>
                  <span>
                    {quest.current}/{quest.target}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      quest.completed
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500'
                    }`}
                    style={{ width: `${(quest.current / quest.target) * 100}%` }}
                  ></div>
                </div>
              </div>

              {quest.completed && !quest.claimed && (
                <button
                  onClick={() => handleClaimReward(quest.id)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  ✓ Claim Reward
                </button>
              )}
              {quest.completed && quest.claimed && (
                <div className="text-center text-green-400 font-bold py-2">
                  ✓ Claimed!
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 p-4 bg-amber-900 bg-opacity-30 rounded-lg border border-amber-600">
            <div className="text-sm text-amber-200">
              <div className="font-bold mb-1">💡 Tip:</div>
              <div>Daily quests reset every 24 hours. Complete them for bonus essences!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
