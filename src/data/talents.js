// Talent tree system - permanent upgrades bought with essences
export const TALENTS = [
  // Tier 1: Basic Talents (10 essences each)
  {
    id: 0,
    name: 'Double Tap',
    icon: '👊',
    description: '+10% tap damage',
    cost: 10,
    effect: { tapDamageMultiplier: 0.1 },
    tier: 1,
  },
  {
    id: 1,
    name: 'Gold Rush',
    icon: '💰',
    description: '+10% coin earnings',
    cost: 10,
    effect: { earningsMultiplier: 0.1 },
    tier: 1,
  },
  {
    id: 2,
    name: 'Hero Training',
    icon: '🏋️',
    description: '+5% hero DPS',
    cost: 10,
    effect: { heroDpsMultiplier: 0.05 },
    tier: 1,
  },
  {
    id: 3,
    name: 'Gem Finder',
    icon: '💎',
    description: '+10% gem rewards',
    cost: 10,
    effect: { gemMultiplier: 0.1 },
    tier: 1,
  },

  // Tier 2: Advanced Talents (25 essences each)
  {
    id: 4,
    name: 'Mega Strike',
    icon: '⚡',
    description: '+15% tap damage',
    cost: 25,
    effect: { tapDamageMultiplier: 0.15 },
    tier: 2,
  },
  {
    id: 5,
    name: 'Treasure Hunt',
    icon: '🗺️',
    description: '+15% coin earnings',
    cost: 25,
    effect: { earningsMultiplier: 0.15 },
    tier: 2,
  },
  {
    id: 6,
    name: 'Elite Squad',
    icon: '👥',
    description: '+10% hero DPS',
    cost: 25,
    effect: { heroDpsMultiplier: 0.1 },
    tier: 2,
  },
  {
    id: 7,
    name: 'Shimmer Luck',
    icon: '✨',
    description: '+15% gem rewards',
    cost: 25,
    effect: { gemMultiplier: 0.15 },
    tier: 2,
  },

  // Tier 3: Legendary Talents (50 essences each)
  {
    id: 8,
    name: 'Legendary Strike',
    icon: '⚔️',
    description: '+25% tap damage',
    cost: 50,
    effect: { tapDamageMultiplier: 0.25 },
    tier: 3,
  },
  {
    id: 9,
    name: 'Fortune Smile',
    icon: '🍀',
    description: '+25% coin earnings',
    cost: 50,
    effect: { earningsMultiplier: 0.25 },
    tier: 3,
  },
  {
    id: 10,
    name: 'Army Commander',
    icon: '🎖️',
    description: '+20% hero DPS',
    cost: 50,
    effect: { heroDpsMultiplier: 0.2 },
    tier: 3,
  },
  {
    id: 11,
    name: 'Gem Master',
    icon: '👑',
    description: '+25% gem rewards',
    cost: 50,
    effect: { gemMultiplier: 0.25 },
    tier: 3,
  },
]

export function getTalentData(talentId) {
  return TALENTS.find(t => t.id === talentId) || null
}

export function calculateTalentBonuses(talentIds) {
  let bonuses = {
    tapDamageMultiplier: 0,
    earningsMultiplier: 0,
    heroDpsMultiplier: 0,
    gemMultiplier: 0,
  }

  talentIds.forEach(talentId => {
    const talent = getTalentData(talentId)
    if (talent) {
      Object.keys(talent.effect).forEach(key => {
        bonuses[key] = (bonuses[key] || 0) + talent.effect[key]
      })
    }
  })

  return bonuses
}
