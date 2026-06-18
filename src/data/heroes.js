// Progressive hero system with increasing damage scaling
// Each hero provides more damage than the last in a triangular progression

export const HEROES = [
  // Tier 1: Basic Heroes (1-5 DPS)
  { id: 0, name: 'Archer', icon: '🏹', baseCost: 50, damage: 1 },
  { id: 1, name: 'Knight', icon: '⚔️', baseCost: 150, damage: 3 },
  { id: 2, name: 'Mage', icon: '🧙', baseCost: 400, damage: 6 },

  // Tier 2: Intermediate Heroes (10-20 DPS)
  { id: 3, name: 'Dragon', icon: '🐉', baseCost: 1000, damage: 10 },
  { id: 4, name: 'Phoenix', icon: '🔥', baseCost: 2500, damage: 15 },
  { id: 5, name: 'Titan', icon: '👹', baseCost: 6000, damage: 21 },

  // Tier 3: Advanced Heroes (28-36 DPS)
  { id: 6, name: 'God', icon: '⚡', baseCost: 15000, damage: 28 },
  { id: 7, name: 'Demon', icon: '😈', baseCost: 36000, damage: 36 },
  { id: 8, name: 'Angel', icon: '😇', baseCost: 80000, damage: 45 },

  // Tier 4: Legendary Heroes (55-100 DPS)
  { id: 9, name: 'Void Walker', icon: '👾', baseCost: 180000, damage: 55 },
  { id: 10, name: 'Cosmic Entity', icon: '🌌', baseCost: 400000, damage: 66 },
  { id: 11, name: 'Reality Bender', icon: '🌀', baseCost: 900000, damage: 78 },

  // Tier 5: Mythical Heroes (91-105 DPS)
  { id: 12, name: 'Void Lord', icon: '🕷️', baseCost: 2000000, damage: 91 },
  { id: 13, name: 'Infinite Being', icon: '♾️', baseCost: 4500000, damage: 105 },
  { id: 14, name: 'Time Keeper', icon: '⏳', baseCost: 10000000, damage: 120 },

  // Tier 6: Godlike Heroes (136-153 DPS)
  { id: 15, name: 'Chaos Lord', icon: '⚔️✨', baseCost: 22000000, damage: 136 },
  { id: 16, name: 'Dimension Master', icon: '🔮', baseCost: 50000000, damage: 153 },
  { id: 17, name: 'Eternal Sage', icon: '🧠✨', baseCost: 110000000, damage: 171 },

  // Tier 7: Supreme Heroes (190-210 DPS)
  { id: 18, name: 'Multiversal Guardian', icon: '🛡️✨', baseCost: 250000000, damage: 190 },
  { id: 19, name: 'Absolute Existence', icon: '👑', baseCost: 550000000, damage: 210 },
  { id: 20, name: 'Transcendent Being', icon: '🌟👑', baseCost: 1200000000, damage: 231 },

  // Tier 8: Beyond Reality (253-276 DPS)
  { id: 21, name: 'Omnipotent Force', icon: '⚛️', baseCost: 2600000000, damage: 253 },
  { id: 22, name: 'Creator of Worlds', icon: '🌍✨', baseCost: 5700000000, damage: 276 },
  { id: 23, name: 'Primordial Power', icon: '🌀👑', baseCost: 12500000000, damage: 300 },

  // Tier 9: Ultimate Heroes (325-351 DPS)
  { id: 24, name: 'Infinite Consciousness', icon: '🧬✨', baseCost: 27500000000, damage: 325 },
  { id: 25, name: 'Supreme Entity', icon: '💫', baseCost: 60000000000, damage: 351 },
  { id: 26, name: 'The One', icon: '🔱', baseCost: 130000000000, damage: 378 },
]

export function getHeroData(heroId) {
  return HEROES.find(hero => hero.id === heroId) || HEROES[0]
}

export function getHeroDamage(heroId) {
  const hero = getHeroData(heroId)
  return hero ? hero.damage : 0
}
