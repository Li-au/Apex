import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'
import { getLevelData } from '../data/levels'
import { SKINS, getSkinTapBoost } from '../data/skins'
import { getHeroDamage } from '../data/heroes'
import { calculateTalentBonuses } from '../data/talents'
import { getEventAtLevel, isSpecialEventLevel } from '../data/specialEvents'
import ApexLogo from './ApexLogo'
import BossArt from './BossArt'
import HeroShop from './HeroShop'
import SkinShop from './SkinShop'
import HeroUpgrades from './HeroUpgrades'
import DailyQuests from './DailyQuests'
import TalentTree from './TalentTree'
import StatsPanel from './StatsPanel'
import SpecialEventModal from './SpecialEventModal'
import MenuModal from './MenuModal'
import BattlePass from './BattlePass'
import EventsLeaderboard from './EventsLeaderboard'
import DebugPanel from './DebugPanel'

// ---- Small presentational helpers -------------------------------------------

function StatBlock({ icon, iconColor, label, value, children }) {
  return (
    <div className="flex items-center gap-3 pl-5 pr-1 border-l border-purple-400/15 first:border-l-0 first:pl-1">
      <div className={`text-xl ${iconColor}`}>{icon}</div>
      <div className="leading-tight">
        <div className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">{label}</div>
        <div className="text-xl font-bold text-white">{value}</div>
        {children}
      </div>
    </div>
  )
}

function SideButton({ emoji, label, ring, dot, dotSide = 'right', onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group relative">
      <span
        className={`absolute top-0 ${dotSide === 'right' ? 'right-1' : 'left-1'} w-2 h-2 rounded-full ${dot}`}
      />
      <span
        className={`w-16 h-16 rounded-full border flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-105 ${ring}`}
      >
        {emoji}
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  )
}

function Panel({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-purple-400/20 bg-[#140e26]/70 backdrop-blur-md shadow-xl shadow-black/40 ${className}`}
    >
      {children}
    </div>
  )
}

// ---- Main screen ------------------------------------------------------------

export default function GameScreenMockup() {
  const [state, dispatch] = useGameState()
  const [floaters, setFloaters] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null)
  const [now, setNow] = useState(Date.now())

  const [showShop, setShowShop] = useState(false)
  const [showSkins, setShowSkins] = useState(false)
  const [showUpgrades, setShowUpgrades] = useState(false)
  const [showQuests, setShowQuests] = useState(false)
  const [showTalents, setShowTalents] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showBattlePass, setShowBattlePass] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  // Tick clock for the daily-quest countdown (display only)
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])

  // Skin auto-unlock based on level
  useEffect(() => {
    SKINS.forEach(skin => {
      if (skin.unlockLevel && state.level >= skin.unlockLevel && !state.unlockedSkins.includes(skin.id)) {
        dispatch({ type: 'UNLOCK_SKIN', payload: skin.id })
      }
    })
  }, [state.level])

  // Special event detection
  useEffect(() => {
    if (isSpecialEventLevel(state.level)) {
      const event = getEventAtLevel(state.level)
      if (event) setCurrentEvent(event)
    }
  }, [state.level])

  // Boss completion -> next level (unchanged mechanic, wired here)
  useEffect(() => {
    if (state.bossHealth === 0 && state.level < 200) {
      const levelData = getLevelData(state.level)
      const reward = Math.floor((levelData?.reward || 0) * state.ascensionMultiplier)
      const gems = levelData?.gemsReward || 0
      dispatch({ type: 'ADD_CURRENCY', payload: reward })
      dispatch({ type: 'ADD_GEMS', payload: gems })
      const tid = setTimeout(() => dispatch({ type: 'NEXT_LEVEL' }), 600)
      return () => clearTimeout(tid)
    }
  }, [state.bossHealth, state.level])

  // ---- Derived values ----
  const getBossStyle = () => {
    if (isSpecialEventLevel(state.level)) {
      const event = getEventAtLevel(state.level)
      if (event) return { emoji: event.boss, name: 'Void Titan', img: 'titan' }
    }
    const variants = {
      common: { emoji: '👹', name: 'Void Titan', img: 'titan' },
      rare: { emoji: '🧟', name: 'Void Titan', img: 'titan' },
      epic: { emoji: '🧛', name: 'Void Titan', img: 'titan' },
      legendary: { emoji: '👹', name: 'Void Titan', img: 'titan' },
    }
    const levelData = getLevelData(state.level)
    return variants[levelData?.variant || 'common']
  }
  const boss = getBossStyle()
  // Real boss image (served from /public/bosses/). Falls back to emoji on error.
  const bossImgUrl = boss.img ? `${import.meta.env.BASE_URL}bosses/${boss.img}.png` : null
  const healthPercent = (state.bossHealth / state.maxHealth) * 100
  const levelProgress = Math.max(0, Math.min(100, (1 - state.bossHealth / state.maxHealth) * 100))

  const damagePerTap = (() => {
    let total = 1 * state.prestigeMultiplier
    Object.entries(state.heroCount).forEach(([heroId, count]) => {
      const dmg = getHeroDamage(parseInt(heroId))
      const spd = state.heroSpeed[heroId] || 1.0
      total += dmg * count * spd * state.prestigeMultiplier * state.ascensionMultiplier
    })
    return total * (1 + getSkinTapBoost(state.activeSkin))
  })()

  const prestigePercent = Math.max(
    0,
    Math.min(100, (state.prestigeProgress / state.prestigeRequirement) * 100)
  )
  const nextPrestigeRemaining = Math.max(0, 100 - prestigePercent)
  const canPrestige = state.prestigeProgress >= state.prestigeRequirement

  const talentBonuses = calculateTalentBonuses(state.unlockedTalents)
  const activeBonuses = [
    { icon: '$', color: 'text-amber-400', value: talentBonuses.earningsMultiplier, label: 'Coins' },
    { icon: '◆', color: 'text-indigo-400', value: talentBonuses.gemMultiplier, label: 'Gems' },
    { icon: '💧', color: 'text-cyan-400', value: talentBonuses.tapDamageMultiplier, label: 'Essences' },
    { icon: '◉', color: 'text-purple-400', value: talentBonuses.criticalMultiplier, label: 'Crit Chance' },
  ]

  // Daily quest countdown to next local midnight
  const msToMidnight = (() => {
    const d = new Date(now)
    const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0)
    return next - d
  })()
  const hrs = Math.floor(msToMidnight / 3600000)
  const mins = Math.floor((msToMidnight % 3600000) / 60000)

  const fmt = (n) => {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B'
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M'
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
    return Math.floor(n).toString()
  }

  // ---- Tap handling ----
  const handleTap = () => {
    const dmg = damagePerTap
    dispatch({ type: 'TAP', payload: dmg })
    dispatch({ type: 'ADD_CURRENCY', payload: dmg })

    const roll = Math.random()
    const tier = roll > 0.94 ? 'godlike' : roll > 0.8 ? 'critical' : 'normal'
    const id = Date.now() + Math.random()
    const top = 20 + Math.random() * 150
    const left = Math.random() * 40
    setFloaters((prev) => [...prev, { id, dmg, tier, top, left }])
    setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== id)), 1000)
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-[#0c0717] via-[#150b2e] to-[#0a0612] text-white flex flex-col select-none">
      {/* ===================== HEADER ===================== */}
      <div className="px-5 pt-4 pb-2 flex items-stretch gap-4">
        {/* Main stats pill */}
        <Panel className="flex-1 px-5 py-3 flex items-center gap-1">
          {/* Logo */}
          <div className="pr-5 border-r border-purple-400/15">
            <ApexLogo size={38} />
          </div>
          {/* Level with progress */}
          <div className="flex items-center gap-3 pl-5 pr-1">
            <div className="leading-tight">
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">Level</div>
              <div className="text-2xl font-bold text-white">{state.level}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-1 bg-slate-700/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-amber-400">{Math.floor(levelProgress)}%</span>
              </div>
            </div>
          </div>
          <StatBlock icon="$" iconColor="text-amber-400" label="Coins" value={fmt(state.currency)} />
          <StatBlock icon="◆" iconColor="text-indigo-400" label="Gems" value={fmt(state.gems)} />
          <StatBlock icon="💧" iconColor="text-cyan-400" label="Essences" value={fmt(state.essences)} />
          <StatBlock icon="◉" iconColor="text-purple-400" label="Prestige" value={state.prestige} />
        </Panel>

        {/* Ascend pill */}
        <Panel
          className={`px-6 flex items-center gap-3 ${state.level >= 200 ? 'cursor-pointer hover:border-red-400/50' : 'opacity-80'}`}
        >
          <button
            disabled={state.level < 200}
            onClick={() => {
              if (state.level >= 200 && window.confirm('Ascend? Reset everything but gain a permanent +50% multiplier!')) {
                dispatch({ type: 'ASCEND' })
              }
            }}
            className="flex items-center gap-3 disabled:cursor-not-allowed"
          >
            <span className="text-xl text-red-400/70">{state.level >= 200 ? '🔓' : '🔒'}</span>
            <div className="text-left leading-tight">
              <div className="text-sm font-bold tracking-[0.18em] text-red-400">ASCEND</div>
              <div className="text-[10px] text-slate-500">Unlocks at Lv. 200</div>
            </div>
          </button>
        </Panel>
      </div>

      {/* ===================== MAIN STAGE ===================== */}
      <div className="relative flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="absolute left-6 top-6 flex flex-col gap-9 z-20">
          <SideButton emoji="🛍️" label="Shop" ring="border-amber-400/50 group-hover:border-amber-300 group-hover:bg-amber-500/10" dot="bg-amber-400" onClick={() => setShowShop(true)} />
          <SideButton emoji="📋" label="Quests" ring="border-cyan-400/50 group-hover:border-cyan-300 group-hover:bg-cyan-500/10" dot="bg-cyan-400" onClick={() => setShowQuests(true)} />
          <SideButton emoji="🌐" label="Talents" ring="border-purple-400/50 group-hover:border-purple-300 group-hover:bg-purple-500/10" dot="bg-purple-400" onClick={() => setShowTalents(true)} />
        </div>

        {/* Right sidebar */}
        <div className="absolute right-6 top-6 flex flex-col gap-9 z-20 items-center">
          <SideButton emoji="🎭" label="Skins" ring="border-rose-400/50 group-hover:border-rose-300 group-hover:bg-rose-500/10" dot="bg-rose-400" dotSide="left" onClick={() => setShowSkins(true)} />
          <SideButton emoji="⏫" label="Upgrades" ring="border-amber-400/50 group-hover:border-amber-300 group-hover:bg-amber-500/10" dot="bg-amber-400" dotSide="left" onClick={() => setShowUpgrades(true)} />
          <SideButton emoji="☰" label="Menu" ring="border-cyan-400/50 group-hover:border-cyan-300 group-hover:bg-cyan-500/10" dot="bg-cyan-400" dotSide="left" onClick={() => setShowMenu(true)} />
        </div>

        {/* ===== Boss composition: one centered unit so orbit/glow/titan/tap stay concentric ===== */}
        <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] max-w-[88vw] z-0">
          {/* Glow (inset so the pulse animation can't shift it off-center) */}
          <div className="absolute inset-[16px] rounded-full bg-purple-600/30 blur-3xl animate-glow-pulse pointer-events-none" />

          {/* Orbital ring (inset so the spin animation can't shift it off-center) */}
          <div className="absolute inset-0 rounded-full border border-purple-400/15 animate-spin-slow pointer-events-none">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300/60" />
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-300/50" />
          </div>

          {/* Titan (behind the UI), bottom arc seated on the TAP button */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[70px] pointer-events-none">
            <BossArt src={bossImgUrl} emoji={boss.emoji} width={900} />
          </div>

          {/* Tap button (above the titan, at the bottom of the ring) */}
          <button
            onClick={handleTap}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-56 h-56 rounded-full border border-purple-300/50 bg-slate-900 flex items-center justify-center transition-transform duration-100 hover:scale-105 active:scale-95 hover:border-purple-200/70 z-10"
          >
            <div className="text-center">
              <div className="text-2xl font-light tracking-[0.3em] text-white">TAP</div>
              <div className="text-[11px] tracking-[0.25em] text-purple-300/80 mt-1">TO ATTACK</div>
              <div className="text-purple-300/70 mt-2 animate-bounce">⌄</div>
            </div>
          </button>
        </div>

        {/* Title + health bar (overlay, always on top of the boss) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-purple-400/40 text-sm">◇ ──────</span>
            <h2 className="text-3xl font-bold tracking-[0.35em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">{boss.name}</h2>
            <span className="text-purple-400/40 text-sm">────── ◇</span>
          </div>
          <div className="w-[420px] max-w-[60vw]">
            <div className="h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-red-500/20 shadow-lg shadow-black/40">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-100"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
            <div className="text-center text-sm text-rose-300/90 mt-2 tracking-wide drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <span className="text-rose-400 font-semibold">{fmt(state.bossHealth)}</span>
              <span className="text-slate-500"> / {fmt(state.maxHealth)} HP</span>
            </div>
          </div>
        </div>

        {/* Floating damage (overlay) */}
        <div className="absolute left-[57%] top-[26%] w-48 h-72 pointer-events-none z-20">
          {floaters.map((f) => {
            const styles = {
              normal: 'text-cyan-300 text-xl',
              critical: 'text-amber-300 text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]',
              godlike: 'text-fuchsia-400 text-3xl drop-shadow-[0_0_12px_rgba(232,121,249,0.7)]',
            }
            return (
              <div
                key={f.id}
                className={`damage-number font-bold ${styles[f.tier]}`}
                style={{ top: `${f.top}px`, left: `${f.left}px` }}
              >
                {f.tier !== 'normal' && (
                  <div className="text-sm tracking-widest uppercase">
                    {f.tier === 'godlike' ? 'Godlike!' : 'Critical!'}
                  </div>
                )}
                <div>+{Math.floor(f.dmg).toLocaleString()}</div>
              </div>
            )
          })}
        </div>

        {/* ===== Bottom-left: Active Bonuses ===== */}
        <Panel className="absolute left-6 bottom-5 px-8 py-4 z-20">
          <div className="text-center text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-3">Active Bonuses</div>
          <div className="flex gap-8">
            {activeBonuses.map((b, i) => (
              <div key={i} className="text-center">
                <div className={`text-xl ${b.color}`}>{b.icon}</div>
                <div className={`text-lg font-bold ${b.color} mt-1`}>
                  +{(b.value * 100).toFixed(b.label === 'Crit Chance' ? 1 : 0)}%
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">{b.label}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* ===== Bottom-right: Prestige Progress ===== */}
        <Panel className="absolute right-6 bottom-5 px-6 py-4 z-20 flex items-center gap-5">
          {/* Ring */}
          <div className="relative w-28 h-28 shrink-0">
            <svg width="112" height="112" className="-rotate-90">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#241640" strokeWidth="6" />
              <circle
                cx="56"
                cy="56"
                r="48"
                fill="none"
                stroke="url(#prestigeGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={2 * Math.PI * 48 * (1 - prestigePercent / 100)}
                style={{ transition: 'stroke-dashoffset 0.5s ease', filter: 'drop-shadow(0 0 6px rgba(192,38,211,0.6))' }}
              />
              <defs>
                <linearGradient id="prestigeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ApexLogo size={30} color="#c084fc" />
            </div>
          </div>

          {/* Text + button */}
          <div className="leading-tight">
            <div className="text-[11px] uppercase tracking-[0.2em] text-purple-300/80">Prestige Progress</div>
            <div className="text-3xl font-bold text-white">{prestigePercent.toFixed(1)}%</div>
            <div className="text-[11px] text-purple-300/70 mt-1">
              +{nextPrestigeRemaining.toFixed(1)}% Next Prestige
            </div>
            <button
              onClick={() => canPrestige && dispatch({ type: 'PRESTIGE' })}
              disabled={!canPrestige}
              className={`mt-3 px-5 py-2 rounded-lg text-sm font-semibold tracking-wider flex items-center gap-2 transition-all ${
                canPrestige
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white'
                  : 'bg-purple-900/40 border border-purple-400/20 text-slate-500 cursor-not-allowed'
              }`}
            >
              PRESTIGE <span>↻</span>
            </button>
          </div>
        </Panel>

        {/* Debug toggle */}
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-60 hover:opacity-100 transition"
          title="Debug"
        >
          🔧
        </button>
      </div>

      {/* ===================== MODALS ===================== */}
      {showShop && <HeroShop state={state} dispatch={dispatch} onClose={() => setShowShop(false)} />}
      {showUpgrades && <HeroUpgrades state={state} dispatch={dispatch} onClose={() => setShowUpgrades(false)} />}
      {showSkins && <SkinShop state={state} dispatch={dispatch} onClose={() => setShowSkins(false)} />}
      {showQuests && <DailyQuests state={state} dispatch={dispatch} onClose={() => setShowQuests(false)} />}
      {showTalents && <TalentTree state={state} dispatch={dispatch} onClose={() => setShowTalents(false)} />}
      {showStats && <StatsPanel state={state} onClose={() => setShowStats(false)} />}
      {currentEvent && <SpecialEventModal event={currentEvent} onClose={() => setCurrentEvent(null)} />}
      {showDebug && <DebugPanel state={state} dispatch={dispatch} onClose={() => setShowDebug(false)} />}
      {showMenu && (
        <MenuModal
          onSelectStats={() => { setShowMenu(false); setShowStats(true) }}
          onSelectBattlePass={() => { setShowMenu(false); setShowBattlePass(true) }}
          onSelectEvents={() => { setShowMenu(false); setShowEvents(true) }}
          onClose={() => setShowMenu(false)}
        />
      )}
      {showBattlePass && <BattlePass currentLevel={state.level} onClose={() => setShowBattlePass(false)} />}
      {showEvents && (
        <EventsLeaderboard
          playerLevel={state.level}
          playerScore={Math.floor(state.totalDamage)}
          onClose={() => setShowEvents(false)}
        />
      )}
    </div>
  )
}
