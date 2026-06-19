import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'
import { getLevelData } from '../data/levels'
import { getSkinTapBoost } from '../data/skins'
import { getHeroDamage } from '../data/heroes'
import GameHeaderNew from './GameHeaderNew'
import GameAreaNew from './GameAreaNew'
import LeftSidebarNew from './LeftSidebarNew'
import RightSidebarNew from './RightSidebarNew'
import BottomLeftNew from './BottomLeftNew'
import BottomCenterNew from './BottomCenterNew'
import BottomRightNew from './BottomRightNew'
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

export default function GameScreenNew() {
  const [state, dispatch] = useGameState()
  const [floatingDamage, setFloatingDamage] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null)

  // Modal states
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

  // Check for special events
  useEffect(() => {
    const levelData = getLevelData(state.level)
    if (levelData?.specialEvent) {
      setCurrentEvent(levelData.specialEvent)
    }
  }, [state.level])

  // Handle tap
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
    setFloatingDamage(prev => [...prev, { id, x, y, damage: totalDamage }])
    setTimeout(() => {
      setFloatingDamage(prev => prev.filter(d => d.id !== id))
    }, 1000)
  }

  // Calculate prestige progress
  const prestigeData = state.prestige > 0 ? {
    currentReq: 20 + (state.prestige - 1) * 5,
    nextReq: 20 + state.prestige * 5,
  } : { currentReq: 20, nextReq: 20 }
  const prestigeProgress = Math.max(0, Math.min(100, ((state.level - prestigeData.currentReq) / (prestigeData.nextReq - prestigeData.currentReq)) * 100))

  // Daily quests preview
  const dailyQuestsPreview = state.dailyQuests.slice(0, 3).map(q => ({
    icon: q.icon,
    name: q.name,
    reward: q.reward,
    current: q.current || 0,
    target: q.target,
  }))

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <GameHeaderNew
        level={state.level}
        currency={Math.floor(state.currency)}
        gems={state.gems}
        essences={state.essences}
        prestige={state.prestige}
        ascensions={state.ascensions}
        ascensionMultiplier={state.ascensionMultiplier}
        onMenuClick={() => {
          if (state.level >= 200) {
            if (window.confirm('Ascend? Reset everything but gain permanent +50% multiplier!')) {
              dispatch({ type: 'ASCEND' })
            }
          }
        }}
      />

      {/* Main Layout */}
      <div className="flex-1 flex relative">
        {/* Left Sidebar */}
        <div className="w-40 border-r border-purple-500/30 overflow-y-auto">
          <LeftSidebarNew
            onShop={() => setShowShop(true)}
            onQuests={() => setShowQuests(true)}
            onTalents={() => setShowTalents(true)}
            dailyQuestsPreview={dailyQuestsPreview}
          />
        </div>

        {/* Center Game Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center">
          <GameAreaNew
            level={state.level}
            bossHealth={state.bossHealth}
            maxHealth={state.maxHealth}
            onTap={handleTap}
            floatingDamage={floatingDamage}
            activeSkin={state.activeSkin}
            heroCount={state.heroCount}
            prestigeMultiplier={state.prestigeMultiplier}
            ascensionMultiplier={state.ascensionMultiplier}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-40 border-l border-purple-500/30 overflow-y-auto">
          <RightSidebarNew
            onSkins={() => setShowSkins(true)}
            onUpgrades={() => setShowUpgrades(true)}
            onMenu={() => setShowMenu(true)}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-48 border-t border-purple-500/30 px-4 py-6 flex justify-between items-end gap-8 bg-gradient-to-t from-purple-900/20 to-transparent">
        {/* Bottom Left - Daily Quests */}
        <BottomLeftNew
          dailyQuests={state.dailyQuests}
          onViewAll={() => setShowQuests(true)}
        />

        {/* Bottom Center - Active Bonuses */}
        <BottomCenterNew
          coinBonus={0.45}
          gemBonus={0.80}
          essenceBonus={2.20}
          critBonus={0.157}
        />

        {/* Bottom Right - Prestige Progress */}
        <BottomRightNew
          prestige={state.prestige}
          prestigeProgress={prestigeProgress}
          onPrestige={() => {
            if (state.level >= prestigeData.nextReq) {
              dispatch({ type: 'PRESTIGE' })
            }
          }}
        />
      </div>

      {/* Debug Button */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed top-28 left-4 z-40 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg transition-all text-sm opacity-75 hover:opacity-100"
        title="Debug/Cheat Mode"
      >
        🔧
      </button>

      {/* Modals */}
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
