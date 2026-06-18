export default function PrestigePanel({ state, dispatch }) {
  const canPrestige = state.prestigeProgress >= state.prestigeRequirement
  const progressPercent = (state.prestigeProgress / state.prestigeRequirement) * 100

  const handlePrestige = () => {
    if (canPrestige) {
      if (window.confirm(`Prestige? Reset everything but get ${(1 + (state.prestige + 1) * 0.5).toFixed(1)}x multiplier!`)) {
        dispatch({ type: 'PRESTIGE' })
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-gradient-to-l from-purple-800 to-purple-700 rounded-xl p-3 border-2 border-purple-500 shadow-lg w-56">
        {/* Rotating Arrow Icon */}
        <div className="flex justify-center mb-2">
          <div className={`text-3xl transition-transform ${canPrestige ? 'animate-spin' : ''}`}>
            🔄
          </div>
        </div>

        {/* Prestige Level */}
        <div className="text-center mb-2">
          <div className="text-xs text-purple-200 uppercase tracking-wide">Prestige</div>
          <div className="text-2xl font-bold text-purple-300">#{state.prestige}</div>
          <div className="text-xs text-purple-400">
            ×{(1 + state.prestige * 0.5).toFixed(1)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="text-xs text-purple-300 mb-1 flex justify-between">
            <span>Progress</span>
            <span className="font-bold text-xs">{state.prestigeProgress}/{state.prestigeRequirement}</span>
          </div>
          <div className="w-full bg-purple-950 rounded-full h-2 overflow-hidden border border-purple-600">
            <div
              className={`h-full transition-all ${
                canPrestige
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600'
              }`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Prestige Button */}
        <button
          onClick={handlePrestige}
          disabled={!canPrestige}
          className={`w-full font-bold py-2 px-3 rounded-lg transition-all transform text-xs ${
            canPrestige
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 cursor-pointer'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          {canPrestige ? '✨ PRESTIGE!' : `🔒 ${state.prestigeRequirement - state.prestigeProgress} left`}
        </button>
      </div>
    </div>
  )
}
