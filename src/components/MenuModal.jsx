export default function MenuModal({ onSelectBattlePass, onSelectEvents, onClose }) {
  const menuItems = [
    {
      id: 'battlepass',
      title: '⭐ Battle Pass',
      description: 'Unlock rewards and track progress',
      onClick: onSelectBattlePass,
    },
    {
      id: 'events',
      title: '🏆 Leaderboard & Events',
      description: 'Compete with others and complete challenges',
      onClick: onSelectEvents,
    },
    {
      id: 'settings',
      title: '⚙️ Settings',
      description: 'Game settings and preferences',
      onClick: () => alert('Settings coming soon!'),
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-md w-full border-2 border-slate-600 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full text-left p-4 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 hover:border-amber-500 transition-all transform hover:scale-105"
            >
              <div className="font-bold text-white text-lg">{item.title}</div>
              <div className="text-sm text-slate-400 mt-1">{item.description}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-700 bg-opacity-50 px-6 py-4 border-t border-slate-600 text-center text-sm text-slate-400">
          APEX v1.0 • Made with React & Vite
        </div>
      </div>
    </div>
  )
}
