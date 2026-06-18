export default function PrestigeButton({ state, dispatch }) {
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
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 mb-4 w-80">
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg p-4 border-2 border-purple-500 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white font-bold">Prestige #{state.prestige}</div>
          <div className="text-sm text-purple-200">
            {state.prestigeProgress}/{state.prestigeRequirement} levels
          </div>
        </div>

        <div className="w-full bg-purple-900 rounded-full h-3 mb-3 overflow-hidden border border-purple-500">
          <div
            className={`h-full transition-all ${
              canPrestige
                ? 'bg-gradient-to-r from-green-400 to-green-500'
                : 'bg-gradient-to-r from-purple-400 to-purple-500'
            }`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>

        <div className="text-xs text-purple-200 mb-3">
          Multiplier: {(1 + state.prestige * 0.5).toFixed(1)}x
          {canPrestige && (
            <span className="text-green-400 font-bold ml-2">
              → {(1 + (state.prestige + 1) * 0.5).toFixed(1)}x
            </span>
          )}
        </div>

        <button
          onClick={handlePrestige}
          disabled={!canPrestige}
          className={`w-full font-bold py-2 px-4 rounded-lg transition-all transform ${
            canPrestige
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 cursor-pointer'
              : 'bg-slate-600 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          {canPrestige ? '✨ PRESTIGE NOW!' : '🔒 UNLOCK AT LEVEL ' + state.prestigeRequirement}
        </button>
      </div>
    </div>
  )
}
