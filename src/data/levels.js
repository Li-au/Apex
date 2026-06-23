// Generate 200 levels with exponential difficulty scaling - VERY LONG GAME
export function generateLevels() {
  const levels = []

  for (let i = 1; i <= 200; i++) {
    // Exponential health scaling - VERY HARD
    const baseHealth = 200
    const healthMultiplier = Math.pow(1.18, i - 1)  // Increased from 1.25 - STEEPER
    const health = Math.floor(baseHealth * healthMultiplier)

    // Determine boss visual variant based on level
    let variant = 'common'
    if (i >= 25 && i < 75) variant = 'rare'
    if (i >= 75 && i < 150) variant = 'epic'
    if (i >= 150) variant = 'legendary'

    // Special boss variant for milestone levels
    let isSpecialBoss = i % 25 === 0  // Every 25 levels is a special "BOSS RUSH"

    // Boss reward (coins for beating this level)
    const reward = Math.floor(40 * Math.pow(1.06, i))

    // Gem reward increases at milestones
    const gemsReward = isSpecialBoss ? 25 : 10

    levels.push({
      level: i,
      health,
      variant,
      reward,
      gemsReward,
      isSpecialBoss,
      milestone: i % 25 === 0, // Every 25 levels is special
    })
  }

  return levels
}

export const LEVELS = generateLevels()

// Helper to get level data
export function getLevelData(level) {
  if (level < 1 || level > 200) return null
  return LEVELS[level - 1]
}
