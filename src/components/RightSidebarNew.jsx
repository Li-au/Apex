// Right sidebar with Skins, Upgrades, Menu
export default function RightSidebarNew({
  onSkins,
  onUpgrades,
  onMenu,
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-12 px-4 pb-40">
      {/* Skins */}
      <button
        onClick={onSkins}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border-2 border-pink-500/50 group-hover:border-pink-400 flex items-center justify-center text-2xl group-hover:bg-pink-500/10 transition-all">
          ✨
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-pink-400 text-center">Skins</div>
      </button>

      {/* Upgrades */}
      <button
        onClick={onUpgrades}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 group-hover:border-amber-400 flex items-center justify-center text-2xl group-hover:bg-amber-500/10 transition-all">
          ⚡
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-amber-400 text-center">Upgrades</div>
      </button>

      {/* Menu */}
      <button
        onClick={onMenu}
        className="flex flex-col items-center gap-2 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border-2 border-slate-500/50 group-hover:border-slate-400 flex items-center justify-center text-2xl group-hover:bg-slate-500/10 transition-all">
          ☰
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-slate-300 text-center">Menu</div>
      </button>
    </div>
  )
}
