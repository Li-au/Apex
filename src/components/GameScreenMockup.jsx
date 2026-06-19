import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'
import { getLevelData } from '../data/levels'
import { getSkinTapBoost } from '../data/skins'
import { getHeroDamage } from '../data/heroes'
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
import { SKINS } from '../data/skins'
import { getEventAtLevel, isSpecialEventLevel } from '../data/specialEvents'

export default function GameScreenMockup() {
  const [state, dispatch] = useGameState()
  const [floatingDamage, setFloatingDamage] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null)
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

  useEffect(() => {
    const levelData = getLevelData(state.level)
    if (levelData?.specialEvent) {
      setCurrentEvent(levelData.specialEvent)
    }
  }, [state.level])

  const getLevelData_alt = (level) => {
    return getLevelData(level)
  }

  const getBossStyle = () => {
    if (isSpecialEventLevel(state.level)) {
      const event = getEventAtLevel(state.level)
      if (event) {
        const eventColors = {
          EPIC: 'from-blue-600 to-purple-600',
          LEGENDARY: 'from-purple-600 to-pink-600',
          MYTHICAL: 'from-pink-600 to-yellow-600',
          TRANSCENDENT: 'from-yellow-500 to-red-600',
        }
        return { color: eventColors[event.difficulty] || 'from-yellow-500 to-red-600', emoji: event.boss, name: event.name }
      }
    }
    const levelData = getLevelData_alt(state.level)
    const variants = {
      common: { color: 'from-orange-500 to-orange-600', emoji: '👹', name: 'Goblin' },
      rare: { color: 'from-blue-500 to-blue-600', emoji: '🧟', name: 'Zombie' },
      epic: { color: 'from-purple-600 to-purple-700', emoji: '🧛', name: 'Vampire' },
      legendary: { color: 'from-indigo-600 to-indigo-900', emoji: '👹', name: 'Demon' },
    }
    return variants[levelData?.variant || 'common']
  }

  const bossStyle = getBossStyle()
  const levelData = getLevelData_alt(state.level)
  const maxHealth = state.maxHealth
  const healthPercent = (state.bossHealth / maxHealth) * 100

  const handleTap = (x, y) => {
    let totalDamage = 1 * state.prestigeMultiplier
    Object.entries(state.heroCount).forEach(([heroId, count]) => {
      const heroDamage = getHeroDamage(parseInt(heroId))
      const speedMultiplier = state.heroSpeed[heroId] || 1.0
      totalDamage += heroDamage * count * speedMultiplier * state.prestigeMultiplier * state.ascensionMultiplier
    })
    const skinBoost = getSkinTapBoost(state.activeSkin)
    totalDamage *= (1 + skinBoost)

    dispatch({ type: 'TAP', payload: totalDamage })
    dispatch({ type: 'ADD_CURRENCY', payload: totalDamage })

    const id = Date.now() + Math.random()
    const random = Math.random()
    let label = '+' + Math.floor(totalDamage).toLocaleString()
    if (random > 0.9) label = '+' + Math.floor(totalDamage).toLocaleString() + '\nGODLIKE!'
    else if (random > 0.7) label = '+' + Math.floor(totalDamage).toLocaleString() + '\nCRITICAL!'

    setFloatingDamage(prev => [...prev, { id, x, y, damage: totalDamage, label, random }])
    setTimeout(() => {
      setFloatingDamage(prev => prev.filter(d => d.id !== id))
    }, 1000)
  }

  const prestigeData = state.prestige > 0 ? {
    currentReq: 20 + (state.prestige - 1) * 5,
    nextReq: 20 + state.prestige * 5,
  } : { currentReq: 20, nextReq: 20 }
  const prestigeProgress = Math.max(0, Math.min(100, ((state.level - prestigeData.currentReq) / (prestigeData.nextReq - prestigeData.currentReq)) * 100))

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="h-20 bg-gradient-to-b from-slate-900/90 via-purple-900/30 to-transparent border-b border-purple-500/40 px-8 py-4 flex items-center justify-between gap-12">
        {/* Stats */}
        <div className="flex items-center gap-12 flex-1">
          {/* Level */}
          <div className="flex items-center gap-4 border-l border-purple-500/30 pl-4">
            <div className="text-amber-400 text-2xl">▲</div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Level</div>
              <div className="text-3xl font-bold text-white">{state.level}</div>
              <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-amber-500" style={{ width: '42%' }} />
              </div>
            </div>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-3 border-l border-purple-500/30 pl-4">
            <div className="text-amber-400 text-2xl">$</div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Coins</div>
              <div className="text-2xl font-bold text-white">{(state.currency / 1e9).toFixed(2)}B</div>
            </div>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-3 border-l border-purple-500/30 pl-4">
            <div className="text-indigo-400 text-2xl">◆</div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Gems</div>
              <div className="text-2xl font-bold text-white">{state.gems}</div>
            </div>
          </div>

          {/* Essences */}
          <div className="flex items-center gap-3 border-l border-purple-500/30 pl-4">
            <div className="text-cyan-400 text-2xl">💧</div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Essences</div>
              <div className="text-2xl font-bold text-white">{(state.essences / 1e3).toFixed(1)}K</div>
            </div>
          </div>

          {/* Prestige */}
          <div className="flex items-center gap-3 border-l border-purple-500/30 pl-4">
            <div className="text-purple-400 text-2xl">◉</div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Prestige</div>
              <div className="text-2xl font-bold text-white">{state.prestige}</div>
            </div>
          </div>
        </div>

        {/* Ascend Button */}
        {state.level >= 200 && (
          <button
            onClick={() => {
              if (window.confirm('Ascend? Reset everything but gain permanent +50% multiplier!')) {
                dispatch({ type: 'ASCEND' })
              }
            }}
            className="px-6 py-2 bg-gradient-to-r from-red-600/70 to-red-700/70 border border-red-500/50 rounded-lg font-bold text-sm text-white hover:from-red-600 hover:to-red-700 transition"
          >
            🔒 ASCEND
            <div className="text-xs text-red-300 mt-0.5">Unlocks at Lv. 200</div>
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex relative">
        {/* LEFT SIDEBAR */}
        <div className="w-40 border-r border-purple-500/30 flex flex-col items-center pt-12 gap-12 pb-48 px-4 overflow-y-auto">
          {/* Shop */}
          <button onClick={() => setShowShop(true)} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute -top-2 -right-2 w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
            <div className="w-20 h-20 rounded-full border-2 border-amber-500/60 flex items-center justify-center text-3xl group-hover:bg-amber-500/10 transition">🛍️</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Shop</div>
          </button>

          {/* Quests */}
          <button onClick={() => setShowQuests(true)} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute -top-2 -right-2 w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
            <div className="w-20 h-20 rounded-full border-2 border-cyan-500/60 flex items-center justify-center text-3xl group-hover:bg-cyan-500/10 transition">📋</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Quests</div>
          </button>

          {/* Talents */}
          <button onClick={() => setShowTalents(true)} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute -top-2 -right-2 w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
            <div className="w-20 h-20 rounded-full border-2 border-purple-500/60 flex items-center justify-center text-3xl group-hover:bg-purple-500/10 transition">🌳</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Talents</div>
          </button>

          {/* Daily Quests */}
          <div className="mt-auto border-t border-purple-500/30 pt-8 w-full">
            <div className="text-xs uppercase tracking-widest text-slate-600 mb-6">Daily Quests</div>
            {state.dailyQuests.slice(0, 3).map((q, i) => (
              <div key={i} className="mb-4 text-xs">
                <div className="flex justify-between mb-1">
                  <div className="text-slate-400">{q.icon} {q.name}</div>
                  <div className="text-cyan-400 font-bold">{q.reward}✨</div>
                </div>
                <div className="bg-slate-700/40 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500" style={{ width: `${Math.min((q.current / q.target) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
            <button className="w-full text-xs uppercase tracking-widest text-slate-600 hover:text-purple-400 mt-4 py-2 border-t border-purple-500/20">View All ></button>
          </div>
        </div>

        {/* CENTER - BOSS AND TAP ZONE */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Boss Title */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-white uppercase tracking-[0.15em]">VOID TITAN</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mt-2">BOSS</div>
          </div>

          {/* Health Bar */}
          <div className="w-96 mb-12">
            <div className="h-4 bg-red-900/40 border border-red-600/60 rounded-lg overflow-hidden shadow-lg shadow-red-600/20">
              <div className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all" style={{ width: `${healthPercent}%` }} />
            </div>
            <div className="text-xs text-slate-500 text-center mt-2">{Math.floor(state.bossHealth).toLocaleString()} / {Math.floor(maxHealth).toLocaleString()} HP</div>
          </div>

          {/* Boss Display */}
          <div className="relative w-full h-80 flex items-center justify-center mb-8">
            {/* Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-gradient-to-b from-purple-600/50 via-purple-500/20 to-purple-600/30 rounded-full blur-3xl opacity-60" />
            </div>

            {/* Boss Emoji */}
            <div className="text-9xl animate-bounce relative z-10">{bossStyle.emoji}</div>

            {/* TAP ZONE */}
            <button
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                handleTap(e.clientX - rect.left, e.clientY - rect.top)
              }}
              className="absolute w-80 h-80 rounded-full border-2 border-purple-400/70 hover:border-purple-300 bg-gradient-to-b from-purple-500/10 to-transparent flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform active:scale-95"
            >
              <div className="text-center z-20">
                <div className="text-2xl text-purple-300 uppercase tracking-[0.2em] font-light">TAP</div>
                <div className="text-xs text-purple-400 uppercase tracking-[0.1em] mt-3 font-light">TO ATTACK</div>
                <div className="text-3xl text-purple-400 mt-4 animate-bounce">▼</div>
              </div>

              {/* Floating Damage */}
              {floatingDamage.map(({ id, x, y, label, random }) => (
                <div
                  key={id}
                  className={`absolute pointer-events-none font-bold text-lg drop-shadow-lg ${random > 0.9 ? 'text-rose-400' : random > 0.7 ? 'text-cyan-400' : 'text-amber-400'}`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {label}
                </div>
              ))}
            </button>
          </div>

          {/* Damage Info */}
          <div className="text-center">
            <div className="text-xl text-white">+{Math.floor(
              1 * state.prestigeMultiplier +
              Object.entries(state.heroCount).reduce((sum, [heroId, count]) => {
                const heroDamage = getHeroDamage(parseInt(heroId))
                return sum + heroDamage * count * (state.heroSpeed[heroId] || 1.0) * state.prestigeMultiplier * state.ascensionMultiplier
              }, 0) * (1 + getSkinTapBoost(state.activeSkin))
            )} Damage</div>
            {(state.prestigeMultiplier > 1 || state.ascensionMultiplier > 1) && (
              <div className="text-xs text-slate-400 mt-3 space-y-1">
                {state.prestigeMultiplier > 1 && <div className="text-purple-400">×{state.prestigeMultiplier.toFixed(2)} Prestige</div>}
                {state.ascensionMultiplier > 1 && <div className="text-red-400">×{state.ascensionMultiplier.toFixed(2)} Ascension</div>}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-40 border-l border-purple-500/30 flex flex-col items-center pt-12 gap-12 pb-48 px-4 overflow-y-auto">
          {/* Skins */}
          <button onClick={() => setShowSkins(true)} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute -top-2 -left-2 w-2.5 h-2.5 bg-pink-400 rounded-full"></div>
            <div className="w-20 h-20 rounded-full border-2 border-pink-500/60 flex items-center justify-center text-3xl group-hover:bg-pink-500/10 transition">✨</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Skins</div>
          </button>

          {/* Upgrades */}
          <button onClick={() => setShowUpgrades(true)} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute -top-2 -left-2 w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
            <div className="w-20 h-20 rounded-full border-2 border-amber-500/60 flex items-center justify-center text-3xl group-hover:bg-amber-500/10 transition">⚡</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Upgrades</div>
          </button>

          {/* Menu */}
          <button onClick={() => setShowMenu(true)} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute -top-2 -left-2 w-2.5 h-2.5 bg-slate-400 rounded-full"></div>
            <div className="w-20 h-20 rounded-full border-2 border-slate-500/60 flex items-center justify-center text-3xl group-hover:bg-slate-500/10 transition">☰</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Menu</div>
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="h-48 border-t border-purple-500/30 px-8 py-6 flex justify-between items-end gap-8 bg-gradient-to-t from-purple-900/20 to-transparent">
        {/* Active Bonuses */}
        <div className="border border-purple-500/40 rounded-2xl p-6 bg-gradient-to-br from-purple-900/40 to-transparent">
          <div className="text-xs uppercase tracking-widest text-slate-600 mb-4">Active Bonuses</div>
          <div className="flex gap-8">
            <div className="text-center"><div className="text-2xl mb-2">$</div><div className="text-amber-400 font-bold">+245%</div><div className="text-xs text-slate-600">Coins</div></div>
            <div className="text-center"><div className="text-2xl mb-2">◆</div><div className="text-indigo-400 font-bold">+180%</div><div className="text-xs text-slate-600">Gems</div></div>
            <div className="text-center"><div className="text-2xl mb-2">💧</div><div className="text-cyan-400 font-bold">+320%</div><div className="text-xs text-slate-600">Essences</div></div>
            <div className="text-center"><div className="text-2xl mb-2">⚡</div><div className="text-purple-400 font-bold">+15.7%</div><div className="text-xs text-slate-600">Crit</div></div>
          </div>
        </div>

        {/* Prestige Progress */}
        <div className="border border-purple-500/40 rounded-2xl p-8 bg-gradient-to-br from-purple-900/40 to-transparent min-w-64">
          <svg width="140" height="140" className="mx-auto mb-4">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#1e293b" strokeWidth="3" opacity="0.5" />
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="4"
              strokeDasharray={377}
              strokeDashoffset={377 - (prestigeProgress / 100) * 377}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px', transition: 'stroke-dashoffset 0.5s' }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <text x="70" y="78" textAnchor="middle" fill="#a855f7" fontSize="28" fontWeight="bold">◉</text>
          </svg>
          <div className="text-3xl font-bold text-white text-center">{prestigeProgress.toFixed(1)}%</div>
          <div className="text-xs uppercase tracking-widest text-slate-500 text-center mt-2">Prestige Progress</div>
          <div className="text-xs text-purple-300 text-center mt-3 mb-4">+37.8% Next Prestige</div>
          <button
            onClick={() => {
              if (state.level >= prestigeData.nextReq) {
                dispatch({ type: 'PRESTIGE' })
              }
            }}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600/80 to-purple-700/80 border border-purple-500/50 rounded-lg font-bold text-sm hover:from-purple-600 hover:to-purple-700 transition"
          >
            Prestige ◉
          </button>
        </div>
      </div>

      {/* Debug Button */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed top-24 left-4 z-40 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-sm opacity-75 hover:opacity-100"
      >
        🔧
      </button>

      {/* MODALS */}
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
          onSelectStats={() => { setShowMenu(false); setShowStats(true); }}
          onSelectBattlePass={() => { setShowMenu(false); setShowBattlePass(true); }}
          onSelectEvents={() => { setShowMenu(false); setShowEvents(true); }}
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
