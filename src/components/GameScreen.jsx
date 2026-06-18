import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'
import { getLevelData, LEVELS } from '../data/levels'
import { SKINS } from '../data/skins'
import { getHeroDamage } from '../data/heroes'
import { getEventAtLevel, isSpecialEventLevel } from '../data/specialEvents'
import GameHeader from './GameHeader'
import GameArea from './GameArea'
import HeroShop from './HeroShop'
import SkinShop from './SkinShop'
import HeroUpgrades from './HeroUpgrades'
import MenuModal from './MenuModal'
import BattlePass from './BattlePass'
import EventsLeaderboard from './EventsLeaderboard'
import DailyQuests from './DailyQuests'
import TalentTree from './TalentTree'
import StatsPanel from './StatsPanel'
import SpecialEventModal from './SpecialEventModal'
import SidebarButtons from './SidebarButtons'
import PrestigePanel from './PrestigePanel'
import DebugPanel from './DebugPanel'

export default function GameScreen() {
  const [state, dispatch] = useGameState()
  const [showShop, setShowShop] = useState(false)
  const [showSkins, setShowSkins] = useState(false)
  const [showUpgrades, setShowUpgrades] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showBattlePass, setShowBattlePass] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showQuests, setShowQuests] = useState(false)
  const [showTalents, setShowTalents] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [floatingDamage, setFloatingDamage] = useState([])

  // Auto-unlock skins based on level
  useEffect(() => {
    SKINS.forEach(skin => {
      if (!state.unlockedSkins.includes(skin.id) && state.level >= (skin.unlockLevel || 999)) {
        dispatch({ type: 'UNLOCK_SKIN', payload: skin.id })
      }
    })
  }, [state.level])

  // Check for special events when reaching milestone levels
  useEffect(() => {
    if (isSpecialEventLevel(state.level) && state.bossHealth === getLevelData(state.level).health) {
      const event = getEventAtLevel(state.level)
      if (event) {
        setCurrentEvent(event)
      }
    }
  }, [state.level])

  // Get current level data and ensure boss health is correct
  const currentLevelData = getLevelData(state.level)

  // Sync boss health with level data on level change
  useEffect(() => {
    if (currentLevelData && state.bossHealth > currentLevelData.health) {
      dispatch({
        type: 'TAP',
        payload: -(state.bossHealth - currentLevelData.health)
      })
    }
  }, [state.level])



  // Check for level completion
  useEffect(() => {
    if (state.bossHealth === 0 && state.level < 200) {
      const levelData = getLevelData(state.level)
      const reward = Math.floor(levelData.reward * state.ascensionMultiplier)
      const gems = levelData.gemsReward
      dispatch({ type: 'ADD_CURRENCY', payload: reward })
      dispatch({ type: 'ADD_GEMS', payload: gems })
      setTimeout(() => {
        dispatch({ type: 'NEXT_LEVEL' })
      }, 1000)
    }
  }, [state.bossHealth, state.level])

  const handleTap = (x, y) => {
    // Base tap damage
    let totalDamage = 1 * state.prestigeMultiplier

    // Add hero damage on tap
    Object.entries(state.heroCount).forEach(([heroId, count]) => {
      const heroDamage = getHeroDamage(parseInt(heroId))
      const speedMultiplier = state.heroSpeed[heroId] || 1.0
      totalDamage += heroDamage * count * speedMultiplier * state.prestigeMultiplier * state.ascensionMultiplier
    })

    dispatch({ type: 'TAP', payload: totalDamage })
    dispatch({ type: 'ADD_CURRENCY', payload: totalDamage })

    // Add floating damage number
    const id = Date.now() + Math.random()
    setFloatingDamage(prev => [...prev, { id, x, y, damage: totalDamage }])
    setTimeout(() => {
      setFloatingDamage(prev => prev.filter(d => d.id !== id))
    }, 1000)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <GameHeader
        level={state.level}
        currency={Math.floor(state.currency)}
        gems={state.gems}
        essences={state.essences}
        prestige={state.prestige}
        ascensions={state.ascensions}
        ascensionMultiplier={state.ascensionMultiplier}
        onMenuClick={() => setShowMenu(true)}
      />

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <GameArea
          level={state.level}
          bossHealth={state.bossHealth}
          maxHealth={state.maxHealth}
          onTap={handleTap}
          floatingDamage={floatingDamage}
          activeSkin={state.activeSkin}
        />
      </div>

      {/* Sidebar Buttons */}
      <SidebarButtons
        showShop={showShop}
        showSkins={showSkins}
        showUpgrades={showUpgrades}
        showQuests={showQuests}
        showTalents={showTalents}
        showMenu={showMenu}
        questsCompleted={state.dailyQuests.some(q => q.completed && !q.claimed) ? 1 : 0}
        onToggleShop={() => setShowShop(!showShop)}
        onToggleSkins={() => setShowSkins(!showSkins)}
        onToggleUpgrades={() => setShowUpgrades(!showUpgrades)}
        onToggleQuests={() => setShowQuests(!showQuests)}
        onToggleTalents={() => setShowTalents(!showTalents)}
        onToggleMenu={() => setShowMenu(!showMenu)}
      />

      {/* Prestige Panel (Right Side) */}
      <PrestigePanel state={state} dispatch={dispatch} />

      {/* Ascend Button (Top Right) */}
      {state.level >= 200 && (
        <button
          onClick={() => {
            if (window.confirm('Ascend? Reset everything but gain permanent +50% multiplier!')) {
              dispatch({ type: 'ASCEND' })
            }
          }}
          className="fixed top-24 right-4 z-40 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 animate-pulse shadow-lg"
        >
          🌟 ASCEND!
        </button>
      )}

      {/* Debug Button (Top Left) */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed top-4 left-20 z-40 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg transition-all text-sm opacity-75 hover:opacity-100"
        title="Debug/Cheat Mode"
      >
        🔧
      </button>

      {/* Shop Modal */}
      {showShop && <HeroShop state={state} dispatch={dispatch} onClose={() => setShowShop(false)} />}

      {/* Hero Upgrades Modal */}
      {showUpgrades && <HeroUpgrades state={state} dispatch={dispatch} onClose={() => setShowUpgrades(false)} />}

      {/* Skins Modal */}
      {showSkins && <SkinShop state={state} dispatch={dispatch} onClose={() => setShowSkins(false)} />}

      {/* Daily Quests Modal */}
      {showQuests && <DailyQuests state={state} dispatch={dispatch} onClose={() => setShowQuests(false)} />}

      {/* Talent Tree Modal */}
      {showTalents && <TalentTree state={state} dispatch={dispatch} onClose={() => setShowTalents(false)} />}

      {/* Stats Panel Modal */}
      {showStats && <StatsPanel state={state} onClose={() => setShowStats(false)} />}

      {/* Special Event Modal */}
      {currentEvent && (
        <SpecialEventModal
          event={currentEvent}
          onClose={() => setCurrentEvent(null)}
        />
      )}

      {/* Debug Panel Modal */}
      {showDebug && (
        <DebugPanel
          state={state}
          dispatch={dispatch}
          onClose={() => setShowDebug(false)}
        />
      )}

      {/* Menu Modal */}
      {showMenu && (
        <MenuModal
          onSelectStats={() => { setShowMenu(false); setShowStats(true); }}
          onSelectBattlePass={() => { setShowMenu(false); setShowBattlePass(true); }}
          onSelectEvents={() => { setShowMenu(false); setShowEvents(true); }}
          onClose={() => setShowMenu(false)}
        />
      )}

      {/* Battle Pass Modal */}
      {showBattlePass && (
        <BattlePass currentLevel={state.level} onClose={() => setShowBattlePass(false)} />
      )}

      {/* Events Leaderboard Modal */}
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
