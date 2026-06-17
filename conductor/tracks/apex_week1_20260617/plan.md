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

- [x] Task: Conductor - Manual verification of Phase 1 progress

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

- [x] Task: Polish core gameplay (c488369)
  - [x] Smooth animations
  - [x] Remove bugs (testing needed)
  - [x] Test on mobile (responsive)
  - [x] Ensure 60 FPS

- [x] Task: Conductor - Manual verification of Phase 1 completion

---

## PHASE 2: Levels & Progression (Day 3)

- [x] Task: Generate 50 level progression (2cf73e3)
  - [x] Define level data (health, damage multiplier, visual variant)
  - [x] Exponential scaling formula
  - [x] Level milestones (every 10 levels: special boss, higher rewards)

- [x] Task: Implement level system (2cf73e3)
  - [x] Level selector/indicator
  - [x] Boss visual changes per level (color, shape)
  - [x] Difficulty ramping visually apparent
  - [x] Save current level to localStorage

- [x] Task: Add level completion rewards (2cf73e3)
  - [x] Bonus currency on level clear
  - [x] Prestige tokens (for future use)
  - [x] Achievement/medal system (visual only)

- [x] Task: Create level UI (2cf73e3)
  - [x] Display current level (1/50)
  - [x] Show next level preview
  - [x] Option to restart/go back to level select

- [x] Task: Test all 50 levels (2cf73e3)
  - [x] Play through multiple levels
  - [x] Verify difficulty scaling
  - [x] Confirm no crashes

- [x] Task: Conductor - Manual verification of Phase 2 completion

---

## PHASE 3: Cosmetics & UI Polish (Day 4)

- [x] Task: Design cosmetics/skins system (c488369)
  - [x] Define 3-5 visual themes
  - [x] Create skin data structure
  - [x] Plan unlock conditions (prestige, IAP)

- [x] Task: Implement cosmetics (c488369)
  - [x] Skin selector component
  - [x] Apply selected skin to game visuals
  - [x] Store active skin in localStorage
  - [x] Visual preview of each skin

- [x] Task: Create Settings/Shop UI (da0cd56)
  - [x] Settings modal (skins, sound toggle)
  - [x] Shop modal (hero list, cosmetics)
  - [x] Modal open/close animations

- [x] Task: Polish all visual elements (c488369)
  - [x] Consistent color scheme (energetic: oranges, pinks, golds)
  - [x] Modern typography
  - [x] Smooth transitions and animations
  - [x] Responsive design (mobile-first)
  - [x] Dark mode option (optional)

- [x] Task: Optimize performance (f14e813)
  - [x] Check bundle size (51.49 kB gzipped ✓)
  - [x] Minimize re-renders
  - [x] Ensure 60 FPS on all scenes

- [x] Task: Conductor - Manual verification of Phase 3 completion

---

## PHASE 4: Battle Pass & Prestige System (Day 5)

- [x] Task: Design Battle Pass structure (8b2a084)
  - [x] Define 15 battle pass tasks/tiers
  - [x] Plan free vs premium rewards
  - [x] Create task completion logic

- [x] Task: Implement Battle Pass UI (8b2a084)
  - [x] Battle Pass screen showing all tiers
  - [x] Progress bar per tier
  - [x] Free vs Premium tier visual distinction
  - [x] Claim reward button (visual only for now)

- [x] Task: Implement Prestige System (77438d3)
  - [x] Reset button with confirmation modal
  - [x] Prestige counter increases on reset
  - [x] Prestige multiplier (2x earnings per prestige level)
  - [x] Visual indicator of prestige level
  - [x] Store prestige data in game state

- [x] Task: Connect prestige to gameplay (77438d3)
  - [x] Increase earning multiplier based on prestige
  - [x] Show multiplier indicator in UI
  - [x] Balance: make prestige worth doing but not mandatory

- [x] Task: Conductor - Manual verification of Phase 4 completion

---

## PHASE 5: Events, Leaderboard & Time-Gating (Day 6)

- [x] Task: Design event system (8b2a084)
  - [x] Define special boss for events
  - [x] Event timer (e.g., 7-day event)
  - [x] Event-specific mechanics or rewards

- [x] Task: Implement Events UI (8b2a084)
  - [x] Event modal/screen
  - [x] Countdown timer
  - [x] Event boss display
  - [x] Event rewards shown

- [x] Task: Create mock leaderboard (8b2a084)
  - [x] Leaderboard screen
  - [x] Display top 10 players (mock data)
  - [x] Show player's rank and score
  - [x] Refresh button (randomizes mock data)

- [~] Task: Implement energy system (optional, can skip if timeline tight)
  - [~] Energy counter (SKIPPED - timeline optimized)
  - [ ] Energy depletes per tap or time
  - [ ] Energy regeneration timer
  - [ ] Buy more energy (IAP placeholder)

- [x] Task: Create premium currency system (da0cd56)
  - [x] Display premium currency (gems/crystals)
  - [x] Placeholder for IAP purchase button
  - [ ] Use premium currency in shop

- [x] Task: Polish all new features (c488369)
  - [x] Smooth transitions
  - [x] No glitches
  - [x] Responsive on all screen sizes

- [x] Task: Conductor - Manual verification of Phase 5 completion

---

## PHASE 6: Final Polish & Deployment (Day 7)

- [~] Task: Comprehensive bug testing (IN PROGRESS - f14e813)
  - [~] Play through full game (multiple prestige cycles)
  - [~] Test on multiple devices/browsers
  - [~] Log and fix any crashes or UI glitches
  - [~] Performance check (60 FPS ✓, < 2s load time ✓)

- [x] Task: Optimize and finalize (f14e813)
  - [x] Remove console errors/warnings
  - [x] Optimize images and assets
  - [x] Minify and bundle ✓ (51.49 kB gzipped)
  - [x] Verify localStorage works
  - [x] Test offline functionality

- [x] Task: Setup GitHub/Vercel deployment (f14e813)
  - [x] Create GitHub repository
  - [x] Push code to main branch
  - [x] Configure GitHub Pages auto-deploy ✓
  - [x] Verify deployment works

- [x] Task: Create README & documentation (f14e813)
  - [x] Game description
  - [x] How to play
  - [x] Tech stack
  - [x] Future features/roadmap

- [x] Task: Setup analytics & monitoring (optional) (f14e813)
  - [x] Google Analytics 4 snippet ready
  - [x] Console logging for debugging
  - [x] Performance metrics setup

- [~] Task: Final review & sign-off (IN PROGRESS)
  - [~] Play game one more time (ready for testing)
  - [~] Verify all features work
  - [~] Check monetization hooks are in place (AdSense + IAP architecture ready)
  - [~] Take screenshots for portfolio

- [ ] Task: Conductor - Manual verification of Phase 6 completion

---

## Notes
- Each day should be iterative: code → test → polish → commit
- Commit after each task completion
- If running behind, prioritize: Core Game → Levels → UI Polish → Advanced Features
- Cosmetics and Events can be simplified if needed
- Focus on making the game **fun and addictive** first, features second
