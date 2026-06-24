import { TALENTS } from '../data/talents'

export default function TalentTree({ state, dispatch, onClose }) {
  const handleUnlockTalent = (talent) => {
    if (state.essences >= talent.cost && !state.unlockedTalents.includes(talent.id)) {
      dispatch({ type: 'UNLOCK_TALENT', payload: talent.id, cost: talent.cost })
    }
  }

  const groupedTalents = {
    1: TALENTS.filter(t => t.tier === 1),
    2: TALENTS.filter(t => t.tier === 2),
    3: TALENTS.filter(t => t.tier === 3),
    4: TALENTS.filter(t => t.tier === 4),
    5: TALENTS.filter(t => t.tier === 5),
    6: TALENTS.filter(t => t.tier === 6),
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-cyan-500 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4 border-b border-cyan-500 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">🌳 Talent Tree</h2>
            <div className="text-sm text-cyan-100 mt-1">Permanent upgrades - Persist across prestige & ascension!</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center bg-black bg-opacity-30 px-3 py-2 rounded">
              <div className="text-xs text-cyan-200">Essences</div>
              <div className="text-xl font-bold text-cyan-300">{state.essences}</div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl text-cyan-100 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {[1, 2, 3, 4, 5, 6].map(tier => (
            <div key={tier}>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xl">{'⭐'.repeat(tier)}</div>
                <h3 className="text-lg font-bold text-cyan-300">
                  Tier {tier} Talents
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {groupedTalents[tier].map(talent => {
                  const isUnlocked = state.unlockedTalents.includes(talent.id)
                  const canAfford = state.essences >= talent.cost && !isUnlocked

                  return (
                    <div
                      key={talent.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        isUnlocked
                          ? 'bg-green-900 border-green-500'
                          : canAfford
                          ? 'bg-slate-700 border-cyan-500 hover:border-cyan-300'
                          : 'bg-slate-800 border-slate-600 opacity-60'
                      }`}
                      onClick={() => handleUnlockTalent(talent)}
                    >
                      <div className="text-3xl mb-2">{talent.icon}</div>
                      <h4 className="font-bold text-sm text-white mb-1">{talent.name}</h4>
                      <p className="text-xs text-slate-300 mb-2">{talent.description}</p>
                      {isUnlocked ? (
                        <div className="text-xs text-green-400 font-bold">✓ Unlocked</div>
                      ) : (
                        <div className={`text-xs font-bold ${canAfford ? 'text-cyan-300' : 'text-slate-500'}`}>
                          {talent.cost} essence
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-cyan-900 bg-opacity-30 rounded-lg border border-cyan-600">
            <div className="text-sm text-cyan-200">
              <div className="font-bold mb-2">💡 How it works:</div>
              <ul className="text-xs space-y-1">
                <li>• Talents are PERMANENT upgrades - they don't reset on prestige or ascension!</li>
                <li>• Each talent gives a small bonus to different mechanics</li>
                <li>• Bonuses stack! Multiple talents compound together</li>
                <li>• Build your custom playstyle with different talent combinations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
