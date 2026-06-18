// Prestige tiers system - more power as you prestige more times
export const PRESTIGE_TIERS = [
  { tier: 0, name: 'Novice', minPrestige: 0, multiplier: 1.0, color: 'gray' },
  { tier: 1, name: 'Veteran', minPrestige: 1, multiplier: 1.5, color: 'green' },
  { tier: 2, name: 'Master', minPrestige: 3, multiplier: 2.0, color: 'blue' },
  { tier: 3, name: 'Legendary', minPrestige: 6, multiplier: 2.75, color: 'purple' },
  { tier: 4, name: 'Mythical', minPrestige: 10, multiplier: 3.75, color: 'pink' },
  { tier: 5, name: 'Eternal', minPrestige: 15, multiplier: 5.0, color: 'yellow' },
]

export function getPrestigeTier(prestigeCount) {
  for (let i = PRESTIGE_TIERS.length - 1; i >= 0; i--) {
    if (prestigeCount >= PRESTIGE_TIERS[i].minPrestige) {
      return PRESTIGE_TIERS[i]
    }
  }
  return PRESTIGE_TIERS[0]
}

export function getPrestigeMultiplier(prestigeCount) {
  const tier = getPrestigeTier(prestigeCount)
  return tier.multiplier + (prestigeCount - tier.minPrestige) * 0.1
}
