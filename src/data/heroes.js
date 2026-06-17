export const HEROES = [
  { id: 0, name: 'Archer', icon: '🏹', baseCost: 25 },
  { id: 1, name: 'Knight', icon: '⚔️', baseCost: 150 },
  { id: 2, name: 'Mage', icon: '🧙', baseCost: 750 },
  { id: 3, name: 'Dragon', icon: '🐉', baseCost: 5000 },
  { id: 4, name: 'Phoenix', icon: '🔥', baseCost: 35000 },
  { id: 5, name: 'Titan', icon: '👹', baseCost: 250000 },
  { id: 6, name: 'God', icon: '⚡', baseCost: 2000000 },
  { id: 7, name: 'Ultimate', icon: '🌟', baseCost: 20000000 },
]

export function getHeroData(heroId) {
  return HEROES.find(hero => hero.id === heroId) || HEROES[0]
}
