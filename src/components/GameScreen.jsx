import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'
import { getLevelData, LEVELS } from '../data/levels'
import { SKINS } from '../data/skins'
import { getHeroDamage } from '../data/heroes'
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
  const [floatingDamage, setFloatingDamage] = useState([])

  // Auto-unlock skins based on level
  useEffect(() => {
    SKINS.forEach(skin => {
      if (!state.unlockedSkins.includes(skin.id) && state.level >= (skin.unlockLevel || 999)) {
        dispatch({ type: 'UNLOCK_SKIN', payload: skin.id })
      }
    })
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

  // Calculate DPS from heroes - Each hero has progressive damage
  const calculateDPS = () => {
    let totalDPS = 0
    Object.entries(state.heroCount).forEach(([heroId, count]) => {
      const heroDamage = getHeroDamage(parseInt(heroId))
      const speedMultiplier = state.heroSpeed[heroId] || 1.0
      // DPS = hero base damage × count × speed × prestige × ascension multipliers
      totalDPS += heroDamage * count * speedMultiplier * state.prestigeMultiplier * state.ascensionMultiplier
    })
    return totalDPS
  }

  // Apply DPS over time
  useEffect(() => {
    const interval = setInterval(() => {
      const dps = calculateDPS()
      if (dps > 0) {
        dispatch({ type: 'TAP', payload: dps / 10 })
        dispatch({ type: 'ADD_CURRENCY', payload: dps / 10 })
      }
    }, 100)
    return () => clearInterval(interval)
  }, [state.heroCount, state.heroSpeed, state.prestigeMultiplier, state.ascensionMultiplier])

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
    const baseDamage = 1 * state.prestigeMultiplier
    dispatch({ type: 'TAP', payload: baseDamage })
    dispatch({ type: 'ADD_CURRENCY', payload: baseDamage })

    // Add floating damage number
    const id = Date.now() + Math.random()
    setFloatingDamage(prev => [...prev, { id, x, y, damage: baseDamage }])
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

      {/* Bottom Controls */}
      <div className={`bg-slate-900 bg-opacity-50 backdrop-blur p-4 border-t border-slate-700 grid ${
        state.level >= 200 ? 'grid-cols-7' : 'grid-cols-6'
      } gap-2`}>
        <button
          onClick={() => setShowShop(!showShop)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs"
        >
          🛍️ Buy
        </button>
        <button
          onClick={() => setShowUpgrades(!showUpgrades)}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs relative"
        >
          ⚡ Upgrade
          {state.gems > 0 && (
            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              💎
            </div>
          )}
        </button>
        <button
          onClick={() => setShowSkins(!showSkins)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs"
        >
          ✨ Skins
        </button>
        <button
          onClick={() => setShowQuests(!showQuests)}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs relative"
        >
          📋 Quests
          {state.dailyQuests.some(q => q.completed && !q.claimed) && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              ✓
            </div>
          )}
        </button>

        <button
          onClick={() => setShowTalents(!showTalents)}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs"
        >
          🌳 Talents
        </button>

        {state.level >= 200 && (
          <button
            onClick={() => {
              if (window.confirm('Ascend? Reset everything but gain permanent +50% multiplier!')) {
                dispatch({ type: 'ASCEND' })
              }
            }}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs animate-pulse"
          >
            🌟 ASCEND!
          </button>
        )}
        <button
          onClick={() => {
            if (window.confirm('Reset all progress? You get a 2x multiplier!')) {
              dispatch({ type: 'PRESTIGE' })
            }
          }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-2 px-2 rounded-lg transition-all transform hover:scale-105 text-xs"
        >
          {state.prestige > 0 ? `Prestige x${state.prestige}` : 'Prestige'}
        </button>
      </div>

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
