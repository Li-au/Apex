import { useState } from 'react'

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'ShadowKing', score: 999999, level: 50 },
  { rank: 2, name: 'FireMaster', score: 875000, level: 48 },
  { rank: 3, name: 'IceQueen', score: 750000, level: 46 },
  { rank: 4, name: 'ThunderLord', score: 625000, level: 44 },
  { rank: 5, name: 'VoidWalker', score: 500000, level: 42 },
  { rank: 6, name: 'Starlight', score: 375000, level: 40 },
  { rank: 7, name: 'NightBlade', score: 250000, level: 35 },
  { rank: 8, name: 'Vortex', score: 125000, level: 30 },
  { rank: 9, name: 'Phoenix', score: 99999, level: 25 },
  { rank: 10, name: 'Sentinel', score: 50000, level: 20 },
]

const CURRENT_EVENT = {
  name: 'Inferno Boss',
  emoji: '🔥',
  timeLeft: '2d 14h',
  reward: '10K Coins',
  difficulty: 'Epic',
}

export default function EventsLeaderboard({ playerLevel, playerScore, onClose }) {
  const [activeTab, setActiveTab] = useState('leaderboard')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999] p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-slate-600 shadow-2xl">
        <div className="sticky top-0 z-[1000] bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">🏆 Compete</h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="bg-slate-700 px-6 py-3 flex gap-4 border-b border-slate-600">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`font-bold py-2 px-4 rounded transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`font-bold py-2 px-4 rounded transition-colors ${
              activeTab === 'events'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Events
          </button>
        </div>

        <div className="p-6">
          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-2">
              {MOCK_LEADERBOARD.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700 border border-slate-600 hover:border-amber-500 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`text-lg font-bold w-8 text-center ${
                      player.rank === 1 ? 'text-yellow-400' :
                      player.rank === 2 ? 'text-gray-400' :
                      player.rank === 3 ? 'text-amber-600' :
                      'text-slate-400'
                    }`}>
                      #{player.rank}
                    </div>
                    <div>
                      <div className="font-bold text-white">{player.name}</div>
                      <div className="text-xs text-slate-400">Level {player.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-300">{player.score.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">points</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-red-900 to-orange-900 border-2 border-red-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{CURRENT_EVENT.emoji}</div>
                    <div>
                      <div className="font-bold text-white text-lg">{CURRENT_EVENT.name}</div>
                      <div className="text-xs text-red-200">Event in Progress</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-red-200">Time Left</div>
                    <div className="font-bold text-red-300">{CURRENT_EVENT.timeLeft}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black bg-opacity-30 p-2 rounded text-center">
                    <div className="text-xs text-slate-400">Difficulty</div>
                    <div className="font-bold text-white">{CURRENT_EVENT.difficulty}</div>
                  </div>
                  <div className="bg-black bg-opacity-30 p-2 rounded text-center">
                    <div className="text-xs text-slate-400">Reward</div>
                    <div className="font-bold text-yellow-300">{CURRENT_EVENT.reward}</div>
                  </div>
                </div>

                <button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all">
                  Challenge Event Boss
                </button>
              </div>

              <div className="text-center text-slate-400 text-sm p-4 bg-slate-700 rounded-lg">
                <div>New events unlock every week!</div>
                <div className="text-xs mt-2">Earn exclusive rewards by competing.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
