import PrestigeTierDisplay from './PrestigeTierDisplay'
import { getPrestigeMultiplier } from '../data/prestige'

export default function StatsPanel({ state, onClose }) {
  const totalHeroes = Object.values(state.heroCount).reduce((a, b) => a + b, 0)
  const totalUpgrades = Object.values(state.heroSpeed).filter(v => v > 1).length
  const prestigeMultiplier = getPrestigeMultiplier(state.prestige)
  const totalMultiplier = prestigeMultiplier * state.ascensionMultiplier

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-purple-500 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 border-b border-purple-500 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">📊 Player Statistics</h2>
          <button
            onClick={onClose}
            className="text-2xl text-purple-100 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Tier */}
          <PrestigeTierDisplay prestige={state.prestige} />

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 uppercase">Level</div>
              <div className="text-3xl font-bold text-amber-400">{state.level}/200</div>
              <div className="text-xs text-slate-500 mt-1">{Math.round((state.level/200)*100)}% complete</div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 uppercase">Currency</div>
              <div className="text-3xl font-bold text-yellow-300">{Math.floor(state.currency).toLocaleString()}</div>
              <div className="text-xs text-slate-500 mt-1">coins</div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 uppercase">Gems</div>
              <div className="text-3xl font-bold text-amber-400">{state.gems}</div>
              <div className="text-xs text-slate-500 mt-1">upgrades</div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 uppercase">Essences</div>
              <div className="text-3xl font-bold text-cyan-400">{state.essences}</div>
              <div className="text-xs text-slate-500 mt-1">talents</div>
            </div>
          </div>

          {/* Progression Stats */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-lg border border-slate-600">
            <h3 className="font-bold text-lg text-white mb-3">📈 Progression</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Total Heroes Owned:</span>
                <span className="font-bold text-white">{totalHeroes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Hero Upgrades:</span>
                <span className="font-bold text-white">{totalUpgrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Talents Unlocked:</span>
                <span className="font-bold text-white">{state.unlockedTalents.length}/12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Skins Unlocked:</span>
                <span className="font-bold text-white">{state.unlockedSkins.length}/5</span>
              </div>
            </div>
          </div>

          {/* Multiplier Breakdown */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-800 p-4 rounded-lg border border-purple-600">
            <h3 className="font-bold text-lg text-white mb-3">⚡ Multiplier Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-200">Prestige Multiplier:</span>
                <span className="font-bold text-cyan-300">{prestigeMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Ascension Multiplier:</span>
                <span className="font-bold text-cyan-300">{state.ascensionMultiplier.toFixed(2)}x</span>
              </div>
              <div className="border-t border-purple-500 mt-2 pt-2 flex justify-between">
                <span className="text-purple-100 font-bold">TOTAL MULTIPLIER:</span>
                <span className="font-bold text-green-400 text-lg">{totalMultiplier.toFixed(2)}x</span>
              </div>
            </div>
          </div>

          {/* Ascension Stats */}
          {state.ascensions > 0 && (
            <div className="bg-gradient-to-r from-red-700 to-red-800 p-4 rounded-lg border border-red-600">
              <h3 className="font-bold text-lg text-white mb-3">🌟 Ascension Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-200">Total Ascensions:</span>
                  <span className="font-bold text-red-100">{state.ascensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Permanent Bonus Per Ascension:</span>
                  <span className="font-bold text-red-100">+50%</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-4 bg-slate-700 border border-slate-600 rounded-lg">
            <div className="text-xs text-slate-400">
              <div className="font-bold mb-1">💡 Tips:</div>
              <ul className="space-y-1">
                <li>• Complete daily quests for essences</li>
                <li>• Unlock talents to boost all earnings</li>
                <li>• Prestige more to unlock higher tiers</li>
                <li>• Ascend to get permanent multipliers!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
