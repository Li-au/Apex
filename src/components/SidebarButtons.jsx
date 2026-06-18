export default function SidebarButtons({
  showShop,
  showSkins,
  showUpgrades,
  showQuests,
  showTalents,
  showMenu,
  questsCompleted,
  onToggleShop,
  onToggleSkins,
  onToggleUpgrades,
  onToggleQuests,
  onToggleTalents,
  onToggleMenu,
}) {
  return (
    <>
      {/* Left Sidebar */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4 p-4">
        <button
          onClick={onToggleShop}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl font-bold transition-all transform hover:scale-110 shadow-lg ${
            showShop
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
          }`}
          title="Buy Heroes"
        >
          🛍️
        </button>

        <button
          onClick={onToggleSkins}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl font-bold transition-all transform hover:scale-110 shadow-lg ${
            showSkins
              ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
              : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white'
          }`}
          title="Skins"
        >
          ✨
        </button>

        <button
          onClick={onToggleUpgrades}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl font-bold transition-all transform hover:scale-110 shadow-lg relative ${
            showUpgrades
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white'
          }`}
          title="Upgrade Heroes"
        >
          ⚡
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4 p-4">
        <button
          onClick={onToggleQuests}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl font-bold transition-all transform hover:scale-110 shadow-lg relative ${
            showQuests
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
              : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white'
          }`}
          title="Daily Quests"
        >
          📋
          {questsCompleted > 0 && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              ✓
            </div>
          )}
        </button>

        <button
          onClick={onToggleTalents}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl font-bold transition-all transform hover:scale-110 shadow-lg ${
            showTalents
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white'
          }`}
          title="Talent Tree"
        >
          🌳
        </button>

        <button
          onClick={onToggleMenu}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl font-bold transition-all transform hover:scale-110 shadow-lg ${
            showMenu
              ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
              : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white'
          }`}
          title="Menu"
        >
          ☰
        </button>
      </div>
    </>
  )
}
