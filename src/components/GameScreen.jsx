import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'
import { getLevelData, LEVELS } from '../data/levels'
import { SKINS } from '../data/skins'
import GameHeader from './GameHeader'
import GameArea from './GameArea'
import HeroShop from './HeroShop'
import SkinShop from './SkinShop'
import MenuModal from './MenuModal'
import BattlePass from './BattlePass'
import EventsLeaderboard from './EventsLeaderboard'

export default function GameScreen() {
  const [state, dispatch] = useGameState()
  const [showShop, setShowShop] = useState(false)
  const [showSkins, setShowSkins] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showBattlePass, setShowBattlePass] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
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

  // Calculate DPS from heroes - Each hero gives +1 DPS
  const calculateDPS = () => {
    let totalDPS = 0
    Object.entries(state.heroCount).forEach(([heroId, count]) => {
      // Simple: each hero = +1 DPS (× prestige multiplier)
      totalDPS += count * state.prestigeMultiplier
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
  }, [state.heroCount, state.prestigeMultiplier])

  // Check for level completion
  useEffect(() => {
    if (state.bossHealth === 0 && state.level < 50) {
      const levelData = getLevelData(state.level)
      const reward = levelData.reward
      dispatch({ type: 'ADD_CURRENCY', payload: reward })
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
        prestige={state.prestige}
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
      <div className="bg-slate-900 bg-opacity-50 backdrop-blur p-4 border-t border-slate-700 grid grid-cols-3 gap-3">
        <button
          onClick={() => setShowShop(!showShop)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-2 rounded-lg transition-all transform hover:scale-105 text-sm"
        >
          🛍️ Heroes
        </button>
        <button
          onClick={() => setShowSkins(!showSkins)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-2 rounded-lg transition-all transform hover:scale-105 text-sm"
        >
          ✨ Skins ({state.unlockedSkins.length})
        </button>
        <button
          onClick={() => {
            if (window.confirm('Reset all progress? You get a 2x multiplier!')) {
              dispatch({ type: 'PRESTIGE' })
            }
          }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-2 rounded-lg transition-all transform hover:scale-105 text-sm"
        >
          Prestige x{state.prestige}
        </button>
      </div>

      {/* Shop Modal */}
      {showShop && <HeroShop state={state} dispatch={dispatch} onClose={() => setShowShop(false)} />}

      {/* Skins Modal */}
      {showSkins && <SkinShop state={state} dispatch={dispatch} onClose={() => setShowSkins(false)} />}

      {/* Menu Modal */}
      {showMenu && (
        <MenuModal
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
