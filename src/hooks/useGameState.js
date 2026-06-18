import { useReducer, useEffect } from 'react'

const INITIAL_STATE = {
  level: 1,
  bossHealth: 100,
  maxHealth: 100,
  totalDamage: 0,
  currency: 0,
  gems: 0,
  essences: 0,  // Secondary currency from quests/events
  heroes: [],
  heroCount: {},
  heroSpeed: {},
  prestige: 0,
  prestigeMultiplier: 1,
  prestigeProgress: 0,  // Levels reached towards next prestige
  prestigeRequirement: 20,  // Must reach X levels to prestige
  ascensions: 0,
  ascensionMultiplier: 1,
  activeSkin: 0,
  unlockedSkins: [0],
  achievements: [],
  // Daily quests system
  dailyQuests: [
    { id: 0, name: 'Level Up', target: 5, current: 0, reward: 100, completed: false },
    { id: 1, name: 'Total Tap Damage', target: 50000, current: 0, reward: 150, completed: false },
    { id: 2, name: 'Buy Heroes', target: 10, current: 0, reward: 200, completed: false },
  ],
  questsCompletedToday: 0,
  lastQuestReset: new Date().toDateString(),
  // Passive enhancements (compound over time)
  passiveEarningsMultiplier: 1.0,
  passiveDPSMultiplier: 1.0,
  // Talent tree system
  unlockedTalents: [],  // Array of talent IDs purchased
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
      const nextLevel = Math.min(200, state.level + 1)
      const levelMultiplier = Math.pow(1.15, nextLevel - 1)
      const newMaxHealth = Math.floor(100 * levelMultiplier)
      const newProgress = Math.min(state.prestigeProgress + 1, state.prestigeRequirement)
      return {
        ...state,
        level: nextLevel,
        bossHealth: newMaxHealth,
        maxHealth: newMaxHealth,
        prestigeProgress: newProgress,
      }

    case 'BUY_HERO': {
      const heroId = action.payload
      const count = state.heroCount[heroId] || 0
      return {
        ...state,
        heroCount: { ...state.heroCount, [heroId]: count + 1 },
        currency: state.currency - action.heroCost,
      }
    }

    case 'PRESTIGE':
      if (state.prestigeProgress >= state.prestigeRequirement) {
        const newPrestige = state.prestige + 1
        return {
          ...state,
          level: 1,
          bossHealth: 100,
          maxHealth: 100,
          totalDamage: 0,
          currency: 0,
          gems: 0,
          heroCount: {},
          heroSpeed: {},
          prestige: newPrestige,
          prestigeMultiplier: 1 + newPrestige * 0.5,
          prestigeProgress: 0,
          prestigeRequirement: 20 + newPrestige * 5,  // Increases requirement each prestige
        }
      }
      return state

    case 'ASCEND':
      // Ultimate reset with PERMANENT bonuses
      return {
        ...state,
        level: 1,
        bossHealth: 100,
        maxHealth: 100,
        totalDamage: 0,
        currency: 0,
        gems: 0,
        heroCount: {},
        heroSpeed: {},
        prestige: 0,
        prestigeMultiplier: 1,
        ascensions: state.ascensions + 1,
        ascensionMultiplier: state.ascensionMultiplier * 1.5,  // +50% permanent bonus
      }

    case 'SELECT_SKIN':
      return { ...state, activeSkin: action.payload }

    case 'UNLOCK_SKIN':
      const skinId = action.payload
      const unlockedSkins = state.unlockedSkins.includes(skinId)
        ? state.unlockedSkins
        : [...state.unlockedSkins, skinId]
      return { ...state, unlockedSkins: unlockedSkins.sort((a, b) => a - b) }

    case 'ADD_GEMS':
      return { ...state, gems: state.gems + action.payload }

    case 'ADD_ESSENCES':
      return { ...state, essences: state.essences + action.payload }

    case 'UPDATE_QUEST_PROGRESS': {
      const questId = action.payload.questId
      const progress = action.payload.progress
      const updatedQuests = state.dailyQuests.map(q => {
        if (q.id === questId && !q.completed) {
          const newProgress = Math.min(q.current + progress, q.target)
          const completed = newProgress >= q.target
          return { ...q, current: newProgress, completed }
        }
        return q
      })
      return { ...state, dailyQuests: updatedQuests }
    }

    case 'CLAIM_QUEST_REWARD': {
      const questId = action.payload
      const quest = state.dailyQuests.find(q => q.id === questId)
      if (quest && quest.completed) {
        const reward = quest.reward
        const essenceReward = Math.floor(reward / 2)
        return {
          ...state,
          currency: state.currency + reward,
          essences: state.essences + essenceReward,
          questsCompletedToday: state.questsCompletedToday + 1,
        }
      }
      return state
    }

    case 'RESET_DAILY_QUESTS':
      const today = new Date().toDateString()
      if (state.lastQuestReset !== today) {
        return {
          ...state,
          dailyQuests: [
            { id: 0, name: 'Level Up', target: 5, current: 0, reward: 100, completed: false },
            { id: 1, name: 'Total Tap Damage', target: 50000, current: 0, reward: 150, completed: false },
            { id: 2, name: 'Buy Heroes', target: 10, current: 0, reward: 200, completed: false },
          ],
          lastQuestReset: today,
        }
      }
      return state

    case 'UNLOCK_TALENT': {
      const talentId = action.payload
      const cost = action.cost
      if (state.essences >= cost && !state.unlockedTalents.includes(talentId)) {
        return {
          ...state,
          essences: state.essences - cost,
          unlockedTalents: [...state.unlockedTalents, talentId],
        }
      }
      return state
    }

    case 'UPGRADE_HERO_SPEED': {
      const heroId = action.payload
      const cost = action.cost
      if (state.gems >= cost) {
        return {
          ...state,
          gems: state.gems - cost,
          heroSpeed: {
            ...state.heroSpeed,
            [heroId]: (state.heroSpeed[heroId] || 1.0) + 0.1
          }
        }
      }
      return state
    }

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
