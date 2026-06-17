export const SKINS = [
  {
    id: 0,
    name: 'Default',
    emoji: '👊',
    description: 'Standard warrior',
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 1,
    name: 'Fire Fist',
    emoji: '🔥',
    description: 'Blazing attacks',
    unlocked: false,
    rarity: 'rare',
    unlockLevel: 10
  },
  {
    id: 2,
    name: 'Ice Punch',
    emoji: '❄️',
    description: 'Frozen power',
    unlocked: false,
    rarity: 'rare',
    unlockLevel: 20
  },
  {
    id: 3,
    name: 'Lightning Strike',
    emoji: '⚡',
    description: 'Electric force',
    unlocked: false,
    rarity: 'epic',
    unlockLevel: 30
  },
  {
    id: 4,
    name: 'Divine Fist',
    emoji: '✨',
    description: 'Godly power',
    unlocked: false,
    rarity: 'legendary',
    unlockLevel: 40
  },
]

export function getSkinData(skinId) {
  return SKINS.find(skin => skin.id === skinId) || SKINS[0]
}
