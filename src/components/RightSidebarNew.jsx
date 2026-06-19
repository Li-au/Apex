// Right sidebar matching mockup
export default function RightSidebarNew({
  onSkins,
  onUpgrades,
  onMenu,
}) {
  return (
    <div className="h-full flex flex-col items-center justify-start pt-12 pb-40 px-3 gap-12">
      {/* Skins Button */}
      <button
        onClick={onSkins}
        className="flex flex-col items-center gap-3 group cursor-pointer relative"
      >
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-pink-400 rounded-full"></div>
        <div className="w-20 h-20 rounded-full border-2 border-pink-500/60 group-hover:border-pink-400 flex items-center justify-center text-3xl group-hover:bg-pink-500/5 transition-all duration-300">
          ✨
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-pink-400 text-center font-light">Skins</div>
      </button>

      {/* Upgrades Button */}
      <button
        onClick={onUpgrades}
        className="flex flex-col items-center gap-3 group cursor-pointer relative"
      >
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="w-20 h-20 rounded-full border-2 border-amber-500/60 group-hover:border-amber-400 flex items-center justify-center text-3xl group-hover:bg-amber-500/5 transition-all duration-300">
          ⚡
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-amber-400 text-center font-light">Upgrades</div>
      </button>

      {/* Menu Button */}
      <button
        onClick={onMenu}
        className="flex flex-col items-center gap-3 group cursor-pointer relative"
      >
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-slate-400 rounded-full"></div>
        <div className="w-20 h-20 rounded-full border-2 border-slate-500/60 group-hover:border-slate-400 flex items-center justify-center text-3xl group-hover:bg-slate-500/5 transition-all duration-300">
          ☰
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 group-hover:text-slate-300 text-center font-light">Menu</div>
      </button>
    </div>
  )
}
