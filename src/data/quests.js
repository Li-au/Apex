// Daily quests data - these rotate/show 5 random quests per day
export const ALL_QUESTS = [
  // Progression Quests
  {
    id: 0,
    name: 'Level Up!',
    icon: '📈',
    description: 'Reach new levels',
    type: 'levels',
    target: 5,
    reward: 100,
  },
  {
    id: 1,
    name: 'Boss Slayer',
    icon: '⚔️',
    description: 'Complete boss fights',
    type: 'boss_kills',
    target: 15,
    reward: 120,
  },
  {
    id: 2,
    name: 'Long Climb',
    icon: '🏔️',
    description: 'Reach level 50+',
    type: 'level_milestone',
    target: 50,
    reward: 250,
  },

  // Tapping Quests
  {
    id: 3,
    name: 'Tap Master',
    icon: '👊',
    description: 'Deal damage by tapping',
    type: 'tap_damage',
    target: 100000,
    reward: 150,
  },
  {
    id: 4,
    name: 'Rapid Clicks',
    icon: '⚡',
    description: 'Perform fast taps',
    type: 'taps_count',
    target: 500,
    reward: 140,
  },
  {
    id: 5,
    name: 'Damage Dealer',
    icon: '💥',
    description: 'Deal massive damage',
    type: 'tap_damage',
    target: 250000,
    reward: 200,
  },

  // Hero Quests
  {
    id: 6,
    name: 'Recruit Army',
    icon: '👥',
    description: 'Buy heroes',
    type: 'heroes_bought',
    target: 10,
    reward: 120,
  },
  {
    id: 7,
    name: 'Legendary Squad',
    icon: '👑',
    description: 'Own 50 total heroes',
    type: 'heroes_owned',
    target: 50,
    reward: 180,
  },
  {
    id: 8,
    name: 'Speed Training',
    icon: '🏃',
    description: 'Upgrade hero speeds',
    type: 'hero_upgrades',
    target: 5,
    reward: 130,
  },
  {
    id: 9,
    name: 'Elite Force',
    icon: '⭐',
    description: 'Unlock 20+ hero upgrades',
    type: 'hero_upgrades',
    target: 20,
    reward: 160,
  },

  // Currency Quests
  {
    id: 10,
    name: 'Gold Rush',
    icon: '💰',
    description: 'Earn coins',
    type: 'currency_earned',
    target: 50000,
    reward: 140,
  },
  {
    id: 11,
    name: 'Gem Collector',
    icon: '💎',
    description: 'Earn gems',
    type: 'gems_earned',
    target: 100,
    reward: 150,
  },
  {
    id: 12,
    name: 'Rich Player',
    icon: '🏦',
    description: 'Accumulate 500k coins',
    type: 'currency_owned',
    target: 500000,
    reward: 200,
  },

  // Prestige Quests
  {
    id: 13,
    name: 'First Prestige',
    icon: '✨',
    description: 'Reach prestige 1',
    type: 'prestige_count',
    target: 1,
    reward: 250,
  },
  {
    id: 14,
    name: 'Prestige Master',
    icon: '🌟',
    description: 'Reach prestige 5',
    type: 'prestige_count',
    target: 5,
    reward: 300,
  },
]

export function getRandomQuests(count = 5) {
  const shuffled = [...ALL_QUESTS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, ALL_QUESTS.length)).map((q, i) => ({
    ...q,
    current: 0,
    completed: false,
    claimed: false,
  }))
}

export function resetDailyQuests() {
  return getRandomQuests(5)
}
