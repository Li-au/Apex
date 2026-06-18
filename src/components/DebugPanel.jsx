export default function DebugPanel({ state, dispatch, onClose }) {
  const addCoins = (amount) => dispatch({ type: 'ADD_CURRENCY', payload: amount })
  const addGems = (amount) => dispatch({ type: 'ADD_GEMS', payload: amount })
  const addEssences = (amount) => dispatch({ type: 'ADD_ESSENCES', payload: amount })

  const unlockAllHeroes = () => {
    for (let i = 0; i < 27; i++) {
      for (let j = 0; j < 10; j++) {
        dispatch({ type: 'BUY_HERO', payload: i, heroCost: 1 })
      }
    }
  }

  const unlockAllTalents = () => {
    for (let i = 0; i < 33; i++) {
      dispatch({ type: 'UNLOCK_TALENT', payload: i })
    }
  }

  const setLevel = (level) => {
    while (state.level < level && state.level < 200) {
      dispatch({ type: 'NEXT_LEVEL' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto border-4 border-red-600 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-red-800 to-red-700 px-6 py-4 border-b border-red-600 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">🔧 DEBUG MODE</h2>
          <button
            onClick={onClose}
            className="text-2xl text-red-200 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Currency Section */}
          <div className="bg-red-800 bg-opacity-50 p-4 rounded-lg border border-red-600">
            <div className="font-bold text-white mb-3">💰 CURRENCY</div>
            <div className="space-y-2">
              <button
                onClick={() => addCoins(100000)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-all"
              >
                + 100k Coins
              </button>
              <button
                onClick={() => addCoins(1000000)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-all"
              >
                + 1M Coins
              </button>
              <button
                onClick={() => addGems(100)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-all"
              >
                + 100 Gems
              </button>
              <button
                onClick={() => addGems(500)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-all"
              >
                + 500 Gems
              </button>
              <button
                onClick={() => addEssences(100)}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-all"
              >
                + 100 Essences
              </button>
              <button
                onClick={() => addEssences(500)}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-all"
              >
                + 500 Essences
              </button>
            </div>
          </div>

          {/* Progression Section */}
          <div className="bg-red-800 bg-opacity-50 p-4 rounded-lg border border-red-600">
            <div className="font-bold text-white mb-3">📈 PROGRESSION</div>
            <div className="space-y-2">
              <button
                onClick={() => setLevel(50)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
              >
                Jump to Level 50
              </button>
              <button
                onClick={() => setLevel(100)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
              >
                Jump to Level 100
              </button>
              <button
                onClick={() => setLevel(150)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
              >
                Jump to Level 150
              </button>
              <button
                onClick={() => setLevel(200)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
              >
                Jump to Level 200
              </button>
            </div>
          </div>

          {/* Unlocks Section */}
          <div className="bg-red-800 bg-opacity-50 p-4 rounded-lg border border-red-600">
            <div className="font-bold text-white mb-3">🔓 UNLOCKS</div>
            <div className="space-y-2">
              <button
                onClick={unlockAllHeroes}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
              >
                Unlock All Heroes (10x each)
              </button>
              <button
                onClick={unlockAllTalents}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all text-sm"
              >
                Unlock All Talents
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="text-xs text-red-200 bg-red-900 bg-opacity-50 p-3 rounded border border-red-700">
            ⚠️ Debug mode - use to test game content and balance
          </div>
        </div>
      </div>
    </div>
  )
}
