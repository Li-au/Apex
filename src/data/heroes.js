// Progressive hero system with increasing damage scaling
// Each hero provides more damage than the last in a triangular progression

export const HEROES = [
  // Tier 1: Basic Heroes (3-15 DPS)
  { id: 0, name: 'Archer', icon: '🏹', baseCost: 50, damage: 3 },
  { id: 1, name: 'Knight', icon: '⚔️', baseCost: 150, damage: 8 },
  { id: 2, name: 'Mage', icon: '🧙', baseCost: 400, damage: 15 },

  // Tier 2: Intermediate Heroes (25-52 DPS)
  { id: 3, name: 'Dragon', icon: '🐉', baseCost: 1000, damage: 25 },
  { id: 4, name: 'Phoenix', icon: '🔥', baseCost: 2500, damage: 38 },
  { id: 5, name: 'Titan', icon: '👹', baseCost: 6000, damage: 52 },

  // Tier 3: Advanced Heroes (70-113 DPS)
  { id: 6, name: 'God', icon: '⚡', baseCost: 15000, damage: 70 },
  { id: 7, name: 'Demon', icon: '😈', baseCost: 36000, damage: 90 },
  { id: 8, name: 'Angel', icon: '😇', baseCost: 80000, damage: 113 },

  // Tier 4: Legendary Heroes (138-195 DPS)
  { id: 9, name: 'Void Walker', icon: '👾', baseCost: 180000, damage: 138 },
  { id: 10, name: 'Cosmic Entity', icon: '🌌', baseCost: 400000, damage: 165 },
  { id: 11, name: 'Reality Bender', icon: '🌀', baseCost: 900000, damage: 195 },

  // Tier 5: Mythical Heroes (228-263 DPS)
  { id: 12, name: 'Void Lord', icon: '🕷️', baseCost: 2000000, damage: 228 },
  { id: 13, name: 'Infinite Being', icon: '♾️', baseCost: 4500000, damage: 263 },
  { id: 14, name: 'Time Keeper', icon: '⏳', baseCost: 10000000, damage: 300 },

  // Tier 6: Godlike Heroes (340-382 DPS)
  { id: 15, name: 'Chaos Lord', icon: '⚔️✨', baseCost: 22000000, damage: 340 },
  { id: 16, name: 'Dimension Master', icon: '🔮', baseCost: 50000000, damage: 382 },
  { id: 17, name: 'Eternal Sage', icon: '🧠✨', baseCost: 110000000, damage: 428 },

  // Tier 7: Supreme Heroes (475-525 DPS)
  { id: 18, name: 'Multiversal Guardian', icon: '🛡️✨', baseCost: 250000000, damage: 475 },
  { id: 19, name: 'Absolute Existence', icon: '👑', baseCost: 550000000, damage: 525 },
  { id: 20, name: 'Transcendent Being', icon: '🌟👑', baseCost: 1200000000, damage: 578 },

  // Tier 8: Beyond Reality (632-690 DPS)
  { id: 21, name: 'Omnipotent Force', icon: '⚛️', baseCost: 2600000000, damage: 632 },
  { id: 22, name: 'Creator of Worlds', icon: '🌍✨', baseCost: 5700000000, damage: 690 },
  { id: 23, name: 'Primordial Power', icon: '🌀👑', baseCost: 12500000000, damage: 750 },

  // Tier 9: Ultimate Heroes (812-878 DPS)
  { id: 24, name: 'Infinite Consciousness', icon: '🧬✨', baseCost: 27500000000, damage: 812 },
  { id: 25, name: 'Supreme Entity', icon: '💫', baseCost: 60000000000, damage: 878 },
  { id: 26, name: 'The One', icon: '🔱', baseCost: 130000000000, damage: 945 },
]

export function getHeroData(heroId) {
  return HEROES.find(hero => hero.id === heroId) || HEROES[0]
}

export function getHeroDamage(heroId) {
  const hero = getHeroData(heroId)
  return hero ? hero.damage : 0
}
