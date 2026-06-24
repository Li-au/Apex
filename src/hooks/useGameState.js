import { useReducer, useEffect } from 'react'
import { resetDailyQuests } from '../data/quests'

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
  dailyQuests: resetDailyQuests(),
  questsCompletedToday: 0,
  lastQuestReset: new Date().toDateString(),
  // Quest tracking metrics
  tapsCount: 0,
  bossKills: 0,
  currencyEarned: 0,
  gemsEarned: 0,
  // Passive enhancements (compound over time)
  passiveEarningsMultiplier: 1.0,
  passiveDPSMultiplier: 1.0,
  // Talent tree system
  unlockedTalents: [],  // Array of talent IDs purchased
  // Battle pass
  claimedBattlePassTiers: [],
}

// Helper function to update quests based on their type
const updateQuests = (quests, questType, amount = 1) => {
  return quests.map(q => {
    if (!q.completed && q.type === questType) {
      const newCurrent = Math.min(q.current + amount, q.target)
      return { ...q, current: newCurrent, completed: newCurrent >= q.target }
    }
    return q
  })
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'TAP':
      const damage = action.payload
      const newHealth = Math.max(0, state.bossHealth - damage)
      const updatedQuests = updateQuests(
        updateQuests(state.dailyQuests, 'tap_damage', damage),
        'taps_count',
        1
      )
      return {
        ...state,
        bossHealth: newHealth,
        totalDamage: state.totalDamage + damage,
        tapsCount: state.tapsCount + 1,
        dailyQuests: updatedQuests,
      }

    case 'ADD_CURRENCY':
      const updatedQuestsForCurrency = updateQuests(
        updateQuests(state.dailyQuests, 'currency_earned', action.payload),
        'currency_owned',
        action.payload
      )
      return {
        ...state,
        currency: state.currency + action.payload,
        currencyEarned: state.currencyEarned + action.payload,
        dailyQuests: updatedQuestsForCurrency,
      }

    case 'NEXT_LEVEL':
      const nextLevel = Math.min(200, state.level + 1)
      const levelMultiplier = Math.pow(1.15, nextLevel - 1)
      const newMaxHealth = Math.floor(100 * levelMultiplier)
      const newProgress = Math.min(state.prestigeProgress + 1, state.prestigeRequirement)
      const updatedQuestsForLevel = updateQuests(
        updateQuests(
          updateQuests(state.dailyQuests, 'levels', 1),
          'level_milestone',
          1
        ),
        'boss_kills',
        1
      )
      return {
        ...state,
        level: nextLevel,
        bossHealth: newMaxHealth,
        maxHealth: newMaxHealth,
        prestigeProgress: newProgress,
        bossKills: state.bossKills + 1,
        dailyQuests: updatedQuestsForLevel,
      }

    case 'BUY_HERO': {
      const heroId = action.payload
      const count = state.heroCount[heroId] || 0
      const totalHeroes = Object.values(state.heroCount).reduce((a, b) => a + b, 0)
      const updatedQuestsForHeroes = updateQuests(
        updateQuests(state.dailyQuests, 'heroes_bought', 1),
        'heroes_owned',
        1
      )
      return {
        ...state,
        heroCount: { ...state.heroCount, [heroId]: count + 1 },
        currency: state.currency - action.heroCost,
        dailyQuests: updatedQuestsForHeroes,
      }
    }

    case 'PRESTIGE':
      if (state.prestigeProgress >= state.prestigeRequirement) {
        const newPrestige = state.prestige + 1
        const updatedQuestsForPrestige = updateQuests(state.dailyQuests, 'prestige_count', 1)
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
          prestigeRequirement: 20 + newPrestige * 5,
          tapsCount: 0,
          bossKills: 0,
          currencyEarned: 0,
          gemsEarned: 0,
          dailyQuests: updatedQuestsForPrestige,
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
      const updatedQuestsForGems = updateQuests(state.dailyQuests, 'gems_earned', action.payload)
      return {
        ...state,
        gems: state.gems + action.payload,
        gemsEarned: state.gemsEarned + action.payload,
        dailyQuests: updatedQuestsForGems,
      }

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
      if (quest && quest.completed && !quest.claimed) {
        const essenceReward = quest.reward
        const updatedQuests = state.dailyQuests.map(q =>
          q.id === questId ? { ...q, claimed: true } : q
        )
        return {
          ...state,
          essences: state.essences + essenceReward,
          questsCompletedToday: state.questsCompletedToday + 1,
          dailyQuests: updatedQuests,
        }
      }
      return state
    }

    case 'RESET_DAILY_QUESTS':
      const today = new Date().toDateString()
      if (state.lastQuestReset !== today) {
        return {
          ...state,
          dailyQuests: resetDailyQuests(),
          lastQuestReset: today,
        }
      }
      return state

    case 'SET_LEVEL': {
      const targetLevel = Math.min(action.payload, 200)
      const levelMultiplier = Math.pow(1.15, targetLevel - 1)
      const newMaxHealth = Math.floor(100 * levelMultiplier)
      return {
        ...state,
        level: targetLevel,
        bossHealth: newMaxHealth,
        maxHealth: newMaxHealth,
        // Also advance prestige progress so Prestige/Ascend become testable after a jump
        prestigeProgress: Math.min(targetLevel, state.prestigeRequirement),
      }
    }

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
        const updatedQuestsForUpgrade = updateQuests(state.dailyQuests, 'hero_upgrades', 1)
        return {
          ...state,
          gems: state.gems - cost,
          heroSpeed: {
            ...state.heroSpeed,
            [heroId]: (state.heroSpeed[heroId] || 1.0) + 0.1
          },
          dailyQuests: updatedQuestsForUpgrade,
        }
      }
      return state
    }

    case 'CLAIM_BATTLE_PASS_TIER': {
      const { tier, coins, skinId } = action.payload
      if (state.claimedBattlePassTiers.includes(tier)) return state
      let newState = {
        ...state,
        claimedBattlePassTiers: [...(state.claimedBattlePassTiers || []), tier],
      }
      if (coins) newState.currency = newState.currency + coins
      if (skinId !== undefined) {
        newState.unlockedSkins = newState.unlockedSkins.includes(skinId)
          ? newState.unlockedSkins
          : [...newState.unlockedSkins, skinId].sort((a, b) => a - b)
      }
      return newState
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
