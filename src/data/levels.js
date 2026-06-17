// Generate 50 levels with exponential difficulty scaling
export function generateLevels() {
  const levels = []

  for (let i = 1; i <= 50; i++) {
    // Exponential health scaling
    const baseHealth = 100
    const healthMultiplier = Math.pow(1.15, i - 1)
    const health = Math.floor(baseHealth * healthMultiplier)

    // Determine boss visual variant based on level
    let variant = 'common'
    if (i >= 10 && i < 25) variant = 'rare'
    if (i >= 25 && i < 40) variant = 'epic'
    if (i >= 40) variant = 'legendary'

    // Boss reward (coins for beating this level)
    const reward = Math.floor(100 * Math.pow(1.1, i))

    levels.push({
      level: i,
      health,
      variant,
      reward,
      milestone: i % 10 === 0, // Every 10 levels is special
    })
  }

  return levels
}

export const LEVELS = generateLevels()

// Helper to get level data
export function getLevelData(level) {
  if (level < 1 || level > 50) return null
  return LEVELS[level - 1]
}
