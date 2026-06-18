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
  {
    id: 4,
    name: 'Quick Fingers',
    icon: '⚡',
    description: '+5% tap speed',
    cost: 10,
    effect: { tapSpeedMultiplier: 0.05 },
    tier: 1,
  },
  {
    id: 5,
    name: 'Luck Charm',
    icon: '🍀',
    description: '+8% critical chance',
    cost: 10,
    effect: { criticalMultiplier: 0.08 },
    tier: 1,
  },

  // Tier 2: Advanced Talents (25 essences each)
  {
    id: 6,
    name: 'Mega Strike',
    icon: '⚡',
    description: '+15% tap damage',
    cost: 25,
    effect: { tapDamageMultiplier: 0.15 },
    tier: 2,
  },
  {
    id: 7,
    name: 'Treasure Hunt',
    icon: '🗺️',
    description: '+15% coin earnings',
    cost: 25,
    effect: { earningsMultiplier: 0.15 },
    tier: 2,
  },
  {
    id: 8,
    name: 'Elite Squad',
    icon: '🎖️',
    description: '+10% hero DPS',
    cost: 25,
    effect: { heroDpsMultiplier: 0.1 },
    tier: 2,
  },
  {
    id: 9,
    name: 'Shimmer Luck',
    icon: '✨',
    description: '+15% gem rewards',
    cost: 25,
    effect: { gemMultiplier: 0.15 },
    tier: 2,
  },
  {
    id: 10,
    name: 'Storm Hands',
    icon: '⛈️',
    description: '+10% tap speed',
    cost: 25,
    effect: { tapSpeedMultiplier: 0.1 },
    tier: 2,
  },
  {
    id: 11,
    name: 'Lucky Break',
    icon: '🎲',
    description: '+15% critical chance',
    cost: 25,
    effect: { criticalMultiplier: 0.15 },
    tier: 2,
  },

  // Tier 3: Legendary Talents (50 essences each)
  {
    id: 12,
    name: 'Legendary Strike',
    icon: '⭐',
    description: '+25% tap damage',
    cost: 50,
    effect: { tapDamageMultiplier: 0.25 },
    tier: 3,
  },
  {
    id: 13,
    name: 'Fortune Smile',
    icon: '😊',
    description: '+25% coin earnings',
    cost: 50,
    effect: { earningsMultiplier: 0.25 },
    tier: 3,
  },
  {
    id: 14,
    name: 'Army Commander',
    icon: '🎖️',
    description: '+20% hero DPS',
    cost: 50,
    effect: { heroDpsMultiplier: 0.2 },
    tier: 3,
  },
  {
    id: 15,
    name: 'Gem Master',
    icon: '👑',
    description: '+25% gem rewards',
    cost: 50,
    effect: { gemMultiplier: 0.25 },
    tier: 3,
  },
  {
    id: 16,
    name: 'Sonic Hands',
    icon: '💨',
    description: '+20% tap speed',
    cost: 50,
    effect: { tapSpeedMultiplier: 0.2 },
    tier: 3,
  },
  {
    id: 17,
    name: 'Destiny Caller',
    icon: '🔮',
    description: '+30% critical chance',
    cost: 50,
    effect: { criticalMultiplier: 0.3 },
    tier: 3,
  },

  // Tier 4: Mythical Talents (75 essences each)
  {
    id: 18,
    name: 'Supreme Power',
    icon: '💥',
    description: '+35% tap damage',
    cost: 75,
    effect: { tapDamageMultiplier: 0.35 },
    tier: 4,
  },
  {
    id: 19,
    name: 'Infinite Wealth',
    icon: '💸',
    description: '+35% coin earnings',
    cost: 75,
    effect: { earningsMultiplier: 0.35 },
    tier: 4,
  },
  {
    id: 20,
    name: 'Legion Master',
    icon: '🏰',
    description: '+30% hero DPS',
    cost: 75,
    effect: { heroDpsMultiplier: 0.3 },
    tier: 4,
  },
  {
    id: 21,
    name: 'Gem Infinity',
    icon: '♾️',
    description: '+35% gem rewards',
    cost: 75,
    effect: { gemMultiplier: 0.35 },
    tier: 4,
  },
  {
    id: 22,
    name: 'Light Speed',
    icon: '⚡💨',
    description: '+30% tap speed',
    cost: 75,
    effect: { tapSpeedMultiplier: 0.3 },
    tier: 4,
  },
  {
    id: 23,
    name: 'Fate Master',
    icon: '🌙',
    description: '+50% critical chance',
    cost: 75,
    effect: { criticalMultiplier: 0.5 },
    tier: 4,
  },

  // Tier 5: Transcendent Talents (100+ essences)
  {
    id: 24,
    name: 'Godly Punch',
    icon: '🔨',
    description: '+50% tap damage',
    cost: 100,
    effect: { tapDamageMultiplier: 0.5 },
    tier: 5,
  },
  {
    id: 25,
    name: 'Treasure Emperor',
    icon: '👑💰',
    description: '+50% coin earnings',
    cost: 100,
    effect: { earningsMultiplier: 0.5 },
    tier: 5,
  },
  {
    id: 26,
    name: 'Hero Ascendant',
    icon: '🌟👥',
    description: '+40% hero DPS',
    cost: 100,
    effect: { heroDpsMultiplier: 0.4 },
    tier: 5,
  },
  {
    id: 27,
    name: 'Gem Transcendent',
    icon: '🌈💎',
    description: '+50% gem rewards',
    cost: 100,
    effect: { gemMultiplier: 0.5 },
    tier: 5,
  },
  {
    id: 28,
    name: 'Hypersonic',
    icon: '🚀',
    description: '+40% tap speed',
    cost: 100,
    effect: { tapSpeedMultiplier: 0.4 },
    tier: 5,
  },
  {
    id: 29,
    name: 'Probability God',
    icon: '🎰',
    description: '+75% critical chance',
    cost: 100,
    effect: { criticalMultiplier: 0.75 },
    tier: 5,
  },

  // Tier 6: Ultimate Talents (150+ essences)
  {
    id: 30,
    name: 'Reality Breaker',
    icon: '💫',
    description: '+60% tap damage',
    cost: 150,
    effect: { tapDamageMultiplier: 0.6 },
    tier: 6,
  },
  {
    id: 31,
    name: 'Infinite Gold',
    icon: '🏆',
    description: '+60% coin earnings',
    cost: 150,
    effect: { earningsMultiplier: 0.6 },
    tier: 6,
  },
  {
    id: 32,
    name: 'Eternal Army',
    icon: '⚔️👥',
    description: '+50% hero DPS',
    cost: 150,
    effect: { heroDpsMultiplier: 0.5 },
    tier: 6,
  },
]

export function calculateTalentBonuses(talentIds) {
  const bonuses = {
    tapDamageMultiplier: 0,
    earningsMultiplier: 0,
    heroDpsMultiplier: 0,
    gemMultiplier: 0,
    tapSpeedMultiplier: 0,
    criticalMultiplier: 0,
  }

  talentIds.forEach(id => {
    const talent = TALENTS.find(t => t.id === id)
    if (talent) {
      Object.entries(talent.effect).forEach(([key, value]) => {
        bonuses[key] += value
      })
    }
  })

  return bonuses
}

export function getHeroDamage(talentId) {
  const talent = TALENTS.find(t => t.id === talentId)
  return talent?.effect?.heroDpsMultiplier || 0
}
