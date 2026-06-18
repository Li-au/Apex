export default function SpecialEventModal({ event, onClose }) {
  const difficultyColors = {
    EPIC: 'from-blue-600 to-purple-600',
    LEGENDARY: 'from-purple-600 to-pink-600',
    MYTHICAL: 'from-pink-600 to-yellow-600',
    TRANSCENDENT: 'from-yellow-500 to-red-600',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[999] p-4">
      <div className="animate-bounce">
        <div className={`bg-gradient-to-br ${difficultyColors[event.difficulty]} rounded-2xl max-w-md w-full border-4 border-white shadow-2xl overflow-hidden`}>
          <div className="bg-black bg-opacity-60 px-6 py-8 text-center">
            <div className="text-6xl mb-4 animate-pulse">{event.boss}</div>
            <h2 className="text-4xl font-bold text-white mb-2">{event.name}</h2>
            <div className="text-2xl font-bold text-yellow-300 mb-4">
              {event.difficulty} BOSS
            </div>
            <p className="text-white text-lg mb-6">{event.description}</p>

            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-lg mb-6 border border-white border-opacity-20">
              <div className="text-yellow-300 font-bold text-sm uppercase tracking-wide mb-3">
                Event Rewards
              </div>
              <div className="space-y-2 text-white">
                <div className="flex justify-between items-center">
                  <span>Coins:</span>
                  <span className="font-bold text-yellow-300">
                    +{event.reward.coins.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Gems:</span>
                  <span className="font-bold text-amber-300">
                    +{event.reward.gems}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Essences:</span>
                  <span className="font-bold text-cyan-300">
                    +{event.reward.essences}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all transform hover:scale-105 text-lg"
            >
              READY TO FIGHT! ⚔️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
