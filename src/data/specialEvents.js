// Special events that trigger every 50 levels
export const SPECIAL_EVENTS = [
  {
    levelThreshold: 50,
    name: 'Dragon Clash',
    boss: '🐉',
    difficulty: 'EPIC',
    reward: { coins: 5000, gems: 50, essences: 25 },
    description: 'Face a mighty dragon for massive rewards!',
  },
  {
    levelThreshold: 100,
    name: 'Demon Invasion',
    boss: '👿',
    difficulty: 'LEGENDARY',
    reward: { coins: 15000, gems: 100, essences: 50 },
    description: 'A demonic force emerges from the void!',
  },
  {
    levelThreshold: 150,
    name: 'Celestial Guardian',
    boss: '⚡',
    difficulty: 'MYTHICAL',
    reward: { coins: 35000, gems: 200, essences: 100 },
    description: 'An ancient guardian of the cosmos awakens!',
  },
  {
    levelThreshold: 200,
    name: 'Ultimate Ascension',
    boss: '👑',
    difficulty: 'TRANSCENDENT',
    reward: { coins: 100000, gems: 500, essences: 250 },
    description: 'You face the pinnacle of power... before ascending!',
  },
]

export function getEventAtLevel(level) {
  return SPECIAL_EVENTS.find(e => e.levelThreshold === level) || null
}

export function isSpecialEventLevel(level) {
  return SPECIAL_EVENTS.some(e => e.levelThreshold === level)
}

export function calculateSpecialEventHealth(baseHealth) {
  return baseHealth * 3  // Special events are 3x harder
}
