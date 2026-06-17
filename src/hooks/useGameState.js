import { useReducer, useEffect } from 'react'

const INITIAL_STATE = {
  level: 1,
  bossHealth: 100,
  maxHealth: 100,
  totalDamage: 0,
  currency: 0,
  heroes: [],
  heroCount: {},
  prestige: 0,
  prestigeMultiplier: 1,
  activeSkin: 0,
  unlockedSkins: [0],
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'TAP':
      const damage = action.payload
      const newHealth = Math.max(0, state.bossHealth - damage)
      return { ...state, bossHealth: newHealth, totalDamage: state.totalDamage + damage }

    case 'ADD_CURRENCY':
      return { ...state, currency: state.currency + action.payload }

    case 'NEXT_LEVEL':
      const nextLevel = Math.min(50, state.level + 1)
      const levelMultiplier = Math.pow(1.15, nextLevel - 1)
      const newMaxHealth = Math.floor(100 * levelMultiplier)
      return {
        ...state,
        level: nextLevel,
        bossHealth: newMaxHealth,
        maxHealth: newMaxHealth,
      }

    case 'BUY_HERO':
      const heroId = action.payload
      const count = state.heroCount[heroId] || 0
      return {
        ...state,
        heroCount: { ...state.heroCount, [heroId]: count + 1 },
        currency: state.currency - action.heroCost,
      }

    case 'PRESTIGE':
      return {
        ...state,
        level: 1,
        bossHealth: 100,
        maxHealth: 100,
        totalDamage: 0,
        currency: 0,
        heroCount: {},
        prestige: state.prestige + 1,
        prestigeMultiplier: 1 + state.prestige * 0.5,
      }

    case 'SELECT_SKIN':
      return { ...state, activeSkin: action.payload }

    case 'UNLOCK_SKIN':
      const skinId = action.payload
      const unlockedSkins = state.unlockedSkins.includes(skinId)
        ? state.unlockedSkins
        : [...state.unlockedSkins, skinId]
      return { ...state, unlockedSkins: unlockedSkins.sort((a, b) => a - b) }

    case 'LOAD_GAME':
      return action.payload

    default:
      return state
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  // Load game state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apex-game-state')
    if (saved) {
      dispatch({ type: 'LOAD_GAME', payload: JSON.parse(saved) })
    }
  }, [])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('apex-game-state', JSON.stringify(state))
  }, [state])

  return [state, dispatch]
}
