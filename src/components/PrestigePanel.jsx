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
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 mr-4">
      <div className="bg-gradient-to-l from-purple-800 to-purple-700 rounded-2xl p-6 border-2 border-purple-500 shadow-2xl w-64">
        {/* Rotating Arrow Icon */}
        <div className="flex justify-center mb-4">
          <div className={`text-5xl transition-transform ${canPrestige ? 'animate-spin' : ''}`}>
            🔄
          </div>
        </div>

        {/* Prestige Level */}
        <div className="text-center mb-4">
          <div className="text-sm text-purple-200 uppercase tracking-wide">Prestige Level</div>
          <div className="text-4xl font-bold text-purple-300">#{state.prestige}</div>
          <div className="text-xs text-purple-400 mt-1">
            ×{(1 + state.prestige * 0.5).toFixed(1)} multiplier
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="text-xs text-purple-300 mb-2 flex justify-between">
            <span>Progress</span>
            <span className="font-bold">{state.prestigeProgress}/{state.prestigeRequirement}</span>
          </div>
          <div className="w-full bg-purple-950 rounded-full h-4 overflow-hidden border-2 border-purple-600">
            <div
              className={`h-full transition-all ${
                canPrestige
                  ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600'
              }`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Next Multiplier Preview */}
        {canPrestige && (
          <div className="mb-4 p-3 bg-green-900 bg-opacity-40 rounded-lg border border-green-500">
            <div className="text-xs text-green-200 text-center">
              <div className="font-bold">Ready to Prestige!</div>
              <div className="text-sm mt-1">
                {(1 + state.prestige * 0.5).toFixed(1)}x → {(1 + (state.prestige + 1) * 0.5).toFixed(1)}x
              </div>
            </div>
          </div>
        )}

        {/* Prestige Button */}
        <button
          onClick={handlePrestige}
          disabled={!canPrestige}
          className={`w-full font-bold py-3 px-4 rounded-xl transition-all transform text-sm ${
            canPrestige
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 cursor-pointer shadow-lg shadow-green-500/50'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          {canPrestige ? '✨ PRESTIGE NOW!' : `🔒 ${state.prestigeRequirement - state.prestigeProgress} levels left`}
        </button>

        {/* Info */}
        <div className="mt-4 p-3 bg-purple-900 bg-opacity-40 rounded-lg border border-purple-600 text-xs text-purple-200">
          <div className="font-bold mb-1">💡 Prestige resets:</div>
          <ul className="text-xs space-y-1">
            <li>✓ Your level</li>
            <li>✓ Currency</li>
            <li>✓ Heroes</li>
            <li>✗ Talents & Ascensions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
