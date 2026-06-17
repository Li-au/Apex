# Implementation Plan - APEX Week 1

## Phase Overview
- **Phase 1 (Days 1-2):** Project setup + Core game mechanics
- **Phase 2 (Day 3):** Levels + Progression system
- **Phase 3 (Day 4):** Cosmetics + UI Polish
- **Phase 4 (Day 5):** Battle Pass + Prestige
- **Phase 5 (Day 6):** Events + Leaderboard + Time-gating
- **Phase 6 (Day 7):** Final Polish + Deployment

---

## PHASE 1: Project Setup & Core Game (Days 1-2)

### Day 1: Foundation & Core Tap Mechanic

- [x] Task: Initialize React project with Vite (77438d3)
  - [x] Create React app with Vite
  - [x] Install Tailwind CSS
  - [x] Setup folder structure (components, hooks, utils, styles)
  - [x] Create git repository (if not done)

- [x] Task: Create core game state & reducer (77438d3)
  - [x] Define game state interface (boss health, player damage, level, etc.)
  - [x] Create useGameState hook with reducer
  - [x] Implement localStorage persistence

- [x] Task: Build tap mechanic & feedback (77438d3)
  - [x] Create TapZone component (large tappable area)
  - [x] Calculate damage per tap
  - [x] Display damage numbers with animation
  - [x] Show boss health bar
  - [x] Add visual feedback (animations, color changes)

- [x] Task: Create basic UI layout (77438d3)
  - [x] Header: level, score, currency
  - [x] Main game area: boss visual, health bar
  - [x] Tap zone with clear affordance
  - [x] Bottom bar: heroes, upgrades buttons

- [ ] Task: Conductor - Manual verification of Phase 1 progress

### Day 2: Heroes & Upgrades System

- [x] Task: Design hero system (77438d3)
  - [x] Define hero data structure (name, cost, DPS, icon)
  - [x] Create 5-8 heroes with balanced costs/DPS
  - [x] Calculate costs (exponential growth)

- [x] Task: Implement hero purchase & DPS (77438d3)
  - [x] Create HeroShop component
  - [x] Hero purchase logic
  - [x] Apply DPS bonus to damage calculations
  - [x] Auto-attack system (heroes generate damage over time)
  - [x] Display hero count in UI

- [x] Task: Create currency system (77438d3)
  - [x] Earn currency from taps and hero DPS
  - [x] Display current currency
  - [x] Ensure balance (taps vs upgrades cost)

- [x] Task: Level completion logic (77438d3)
  - [x] When boss health = 0, advance to next level
  - [x] Reset boss health for new level
  - [x] Apply difficulty multiplier to next level
  - [x] Show level transition screen

- [~] Task: Polish core gameplay
  - [~] Smooth animations
  - [ ] Remove bugs (testing needed)
  - [ ] Test on mobile (responsive)
  - [ ] Ensure 60 FPS

- [ ] Task: Conductor - Manual verification of Phase 1 completion

---

## PHASE 2: Levels & Progression (Day 3)

- [ ] Task: Generate 50 level progression
  - [ ] Define level data (health, damage multiplier, visual variant)
  - [ ] Exponential scaling formula
  - [ ] Level milestones (every 10 levels: special boss, higher rewards)

- [ ] Task: Implement level system
  - [ ] Level selector/indicator
  - [ ] Boss visual changes per level (color, shape)
  - [ ] Difficulty ramping visually apparent
  - [ ] Save current level to localStorage

- [ ] Task: Add level completion rewards
  - [ ] Bonus currency on level clear
  - [ ] Prestige tokens (for future use)
  - [ ] Achievement/medal system (visual only)

- [ ] Task: Create level UI
  - [ ] Display current level (1/50)
  - [ ] Show next level preview
  - [ ] Option to restart/go back to level select

- [ ] Task: Test all 50 levels
  - [ ] Play through multiple levels
  - [ ] Verify difficulty scaling
  - [ ] Confirm no crashes

- [ ] Task: Conductor - Manual verification of Phase 2 completion

---

## PHASE 3: Cosmetics & UI Polish (Day 4)

- [ ] Task: Design cosmetics/skins system
  - [ ] Define 3-5 visual themes
  - [ ] Create skin data structure
  - [ ] Plan unlock conditions (prestige, IAP)

- [ ] Task: Implement cosmetics
  - [ ] Skin selector component
  - [ ] Apply selected skin to game visuals
  - [ ] Store active skin in localStorage
  - [ ] Visual preview of each skin

- [ ] Task: Create Settings/Shop UI
  - [ ] Settings modal (skins, sound toggle)
  - [ ] Shop modal (hero list, cosmetics)
  - [ ] Modal open/close animations

- [ ] Task: Polish all visual elements
  - [ ] Consistent color scheme (energetic: oranges, pinks, golds)
  - [ ] Modern typography
  - [ ] Smooth transitions and animations
  - [ ] Responsive design (mobile-first)
  - [ ] Dark mode option (optional)

- [ ] Task: Optimize performance
  - [ ] Check bundle size
  - [ ] Minimize re-renders
  - [ ] Ensure 60 FPS on all scenes

- [ ] Task: Conductor - Manual verification of Phase 3 completion

---

## PHASE 4: Battle Pass & Prestige System (Day 5)

- [ ] Task: Design Battle Pass structure
  - [ ] Define 15 battle pass tasks/tiers
  - [ ] Plan free vs premium rewards
  - [ ] Create task completion logic

- [ ] Task: Implement Battle Pass UI
  - [ ] Battle Pass screen showing all tiers
  - [ ] Progress bar per tier
  - [ ] Free vs Premium tier visual distinction
  - [ ] Claim reward button (visual only for now)

- [ ] Task: Implement Prestige System
  - [ ] Reset button with confirmation modal
  - [ ] Prestige counter increases on reset
  - [ ] Prestige multiplier (2x earnings per prestige level)
  - [ ] Visual indicator of prestige level
  - [ ] Store prestige data in game state

- [ ] Task: Connect prestige to gameplay
  - [ ] Increase earning multiplier based on prestige
  - [ ] Show multiplier indicator in UI
  - [ ] Balance: make prestige worth doing but not mandatory

- [ ] Task: Conductor - Manual verification of Phase 4 completion

---

## PHASE 5: Events, Leaderboard & Time-Gating (Day 6)

- [ ] Task: Design event system
  - [ ] Define special boss for events
  - [ ] Event timer (e.g., 7-day event)
  - [ ] Event-specific mechanics or rewards

- [ ] Task: Implement Events UI
  - [ ] Event modal/screen
  - [ ] Countdown timer
  - [ ] Event boss display
  - [ ] Event rewards shown

- [ ] Task: Create mock leaderboard
  - [ ] Leaderboard screen
  - [ ] Display top 10 players (mock data)
  - [ ] Show player's rank and score
  - [ ] Refresh button (randomizes mock data)

- [ ] Task: Implement energy system (optional, can skip if timeline tight)
  - [ ] Energy counter
  - [ ] Energy depletes per tap or time
  - [ ] Energy regeneration timer
  - [ ] Buy more energy (IAP placeholder)

- [ ] Task: Create premium currency system
  - [ ] Display premium currency (gems/crystals)
  - [ ] Placeholder for IAP purchase button
  - [ ] Use premium currency in shop

- [ ] Task: Polish all new features
  - [ ] Smooth transitions
  - [ ] No glitches
  - [ ] Responsive on all screen sizes

- [ ] Task: Conductor - Manual verification of Phase 5 completion

---

## PHASE 6: Final Polish & Deployment (Day 7)

- [ ] Task: Comprehensive bug testing
  - [ ] Play through full game (multiple prestige cycles)
  - [ ] Test on multiple devices/browsers
  - [ ] Log and fix any crashes or UI glitches
  - [ ] Performance check (60 FPS, < 2s load time)

- [ ] Task: Optimize and finalize
  - [ ] Remove console errors/warnings
  - [ ] Optimize images and assets
  - [ ] Minify and bundle
  - [ ] Verify localStorage works
  - [ ] Test offline functionality

- [ ] Task: Setup GitHub/Vercel deployment
  - [ ] Create GitHub repository
  - [ ] Push code to main branch
  - [ ] Configure GitHub Pages or Vercel for auto-deploy
  - [ ] Verify deployment works

- [ ] Task: Create README & documentation
  - [ ] Game description
  - [ ] How to play
  - [ ] Tech stack
  - [ ] Future features/roadmap

- [ ] Task: Setup analytics & monitoring (optional)
  - [ ] Google Analytics 4 snippet added (not activated)
  - [ ] Console logging for debugging
  - [ ] Performance metrics setup

- [ ] Task: Final review & sign-off
  - [ ] Play game one more time
  - [ ] Verify all features work
  - [ ] Check monetization hooks are in place
  - [ ] Take screenshots for portfolio

- [ ] Task: Conductor - Manual verification of Phase 6 completion

---

## Notes
- Each day should be iterative: code → test → polish → commit
- Commit after each task completion
- If running behind, prioritize: Core Game → Levels → UI Polish → Advanced Features
- Cosmetics and Events can be simplified if needed
- Focus on making the game **fun and addictive** first, features second
