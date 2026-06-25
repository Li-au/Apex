export const SKINS = [
  {
    id: 0,
    name: 'Default',
    emoji: '👊',
    description: 'Standard warrior',
    unlocked: true,
    rarity: 'common',
    tapDamageBoost: 0, // 0% boost
  },
  {
    id: 1,
    name: 'Fire Fist',
    emoji: '🔥',
    description: 'Blazing attacks',
    unlocked: false,
    rarity: 'rare',
    tapDamageBoost: 0.15,
  },
  {
    id: 2,
    name: 'Ice Punch',
    emoji: '❄️',
    description: 'Frozen power',
    unlocked: false,
    rarity: 'rare',
    tapDamageBoost: 0.15,
  },
  {
    id: 3,
    name: 'Lightning Strike',
    emoji: '⚡',
    description: 'Electric force',
    unlocked: false,
    rarity: 'epic',
    unlockLevel: 100,
    tapDamageBoost: 0.30, // +30% tap damage
  },
  {
    id: 4,
    name: 'Divine Fist',
    emoji: '✨',
    description: 'Godly power',
    unlocked: false,
    rarity: 'legendary',
    tapDamageBoost: 0.50,
  },
]

export function getSkinData(skinId) {
  return SKINS.find(skin => skin.id === skinId) || SKINS[0]
}

export function getSkinTapBoost(skinId) {
  const skin = getSkinData(skinId)
  return skin ? skin.tapDamageBoost : 0
}
