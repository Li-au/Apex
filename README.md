# 🎮 APEX - Clicker Game

A long-term, progressively improvable clicker game designed for daily engagement and endless grinding.

## Features
- 200 Levels with exponential scaling
- 27 Progressive Heroes (1→378 damage)
- Prestige System with 6 tiers
- 15 Daily Quest Types (5 random per day)
- 12 Permanent Talents across 3 tiers
- 4 Special Boss Events (levels 50, 100, 150, 200)
- Ascension System (+50% permanent multiplier at level 200)
- 5 Cosmetic Skins
- Full LocalStorage persistence

## 🚀 Quick Test

### Play Online (GitHub Pages)
**Demo coming soon!** Will be deployed to GitHub Pages for instant play.

### Play Locally
```bash
# Clone the repo
git clone https://github.com/Li-au/Apex.git
cd Apex

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:5173` in your browser and start clicking! 🎮

### Build for Production
```bash
npm run build
# Output in dist/ folder - ready to deploy
```

## How to Play
1. Tap the boss to deal damage
2. Buy heroes for passive income
3. Upgrade heroes to boost their speed
4. Complete daily quests for essences
5. Unlock talents to boost all earnings
6. Prestige for permanent multipliers
7. Reach level 200 and ascend!

## Tech Stack
- React 18 + Vite
- useReducer + Context API
- Tailwind CSS
- LocalStorage
- 58 KB gzipped

## Game Mechanics
- **Damage:** HeroDamage × Count × Speed × Prestige × Ascension
- **Hero Scaling:** 1→3→6→10→...→378 (triangular)
- **Levels:** Health = 100 × 1.15^(level-1)

---

Made with ❤️ | Click, grind, prestige, repeat! 🚀
