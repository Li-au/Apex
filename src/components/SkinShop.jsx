import { SKINS } from '../data/skins'

export default function SkinShop({ state, dispatch, onClose }) {
  const handleSelectSkin = (skinId) => {
    dispatch({ type: 'SELECT_SKIN', payload: skinId })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-slate-600 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">✨ Cosmetics</h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKINS.map(skin => {
            const isUnlocked = state.unlockedSkins.includes(skin.id)
            const isActive = state.activeSkin === skin.id

            return (
              <button
                key={skin.id}
                onClick={() => isUnlocked && handleSelectSkin(skin.id)}
                disabled={!isUnlocked}
                className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  isUnlocked
                    ? isActive
                      ? 'bg-gradient-to-br from-pink-600 to-pink-700 border-pink-400 shadow-lg shadow-pink-500/50'
                      : 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-pink-400 cursor-pointer'
                    : 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-5xl">{skin.emoji}</div>
                  {isActive && (
                    <div className="text-xl text-pink-300">✓ Active</div>
                  )}
                  {!isUnlocked && (
                    <div className="text-xs text-slate-400">
                      Unlock at L{skin.unlockLevel}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">{skin.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{skin.description}</div>
                  <div className={`text-xs mt-2 ${
                    skin.rarity === 'common' ? 'text-gray-400' :
                    skin.rarity === 'rare' ? 'text-blue-400' :
                    skin.rarity === 'epic' ? 'text-purple-400' :
                    'text-yellow-400'
                  }`}>
                    {skin.rarity.toUpperCase()}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
