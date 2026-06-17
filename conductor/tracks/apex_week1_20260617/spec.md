# Specification - APEX Week 1: MVP Monétisable

## Overview
Build a complete, playable clicker game MVP in React with core mechanics, progression system, cosmetics, and basic monetization setup. The game should be polished, addictive, and ready for ads/IAP integration.

## Functional Requirements

### Core Gameplay
- [ ] One-tap attack mechanic (tap screen to damage boss)
- [ ] Damage counter displays in real-time
- [ ] Boss health bar shows progress
- [ ] Damage numbers appear on screen with animations
- [ ] Satisfying visual feedback (animations, particles, sounds)

### Progression System
- [ ] 50 levels with increasing difficulty
- [ ] Boss changes visual appearance per level
- [ ] Health/damage scales exponentially
- [ ] Level completion unlocks next level
- [ ] Current level indicator visible

### Hero & Upgrade System
- [ ] 5-10 heroes to purchase with in-game currency
- [ ] Each hero increases damage per second (DPS)
- [ ] Cost increases exponentially per purchase
- [ ] Visual representation of heroes
- [ ] Hero count displays in UI

### Cosmetics (Skins)
- [ ] 3-5 visual themes/skins for the player character
- [ ] Skins unlock through prestige or IAP
- [ ] Visual difference clear when skin is active
- [ ] Skin selection screen in settings

### Battle Pass (Visual Only for Week 1)
- [ ] Battle Pass UI showing free + premium tiers
- [ ] 10-15 tasks/milestones visible
- [ ] Progress bar shows completion
- [ ] Premium tier clearly marked (locked)
- [ ] Rewards display (cosmetics, currency)

### Prestige System
- [ ] Reset button that resets progress
- [ ] Prestige multiplier applies to earnings
- [ ] Prestige counter displayed
- [ ] Confirmation before reset

### Energy/Time-Gating System
- [ ] Energy system: limited taps per session (optional for Week 1)
- [ ] Energy regenerates over time
- [ ] Can buy more energy with premium currency
- [ ] Energy UI shows current/max

### Leaderboard (Mock)
- [ ] Display of top players with scores
- [ ] Player rank shown
- [ ] Refresh button (updates randomly for testing)

### Monetization Setup
- [ ] Google AdSense integration (code ready, not activated)
- [ ] IAP system architecture (ready for implementation)
- [ ] Premium currency visible in UI
- [ ] Currency can be earned through gameplay + purchased

### Events (Mock)
- [ ] Limited-time event interface
- [ ] Boss with special mechanics
- [ ] Event countdown timer
- [ ] Event rewards display

## Non-Functional Requirements
- Performance: 60 FPS minimum on mobile browsers
- Bundle size: < 500KB (gzipped)
- Load time: < 2 seconds on 4G
- Responsive: Works on 320px to 2560px screens
- No console errors or warnings
- Saves game state to localStorage
- Offline playable (fully client-side)

## Acceptance Criteria
1. ✅ Game is fully playable from Level 1 to Level 50
2. ✅ All UI elements are responsive and polished
3. ✅ Game is addictive and engaging to play
4. ✅ No crashes or bugs during 15-minute gameplay session
5. ✅ Performance is smooth (no stuttering)
6. ✅ Game state persists across page refreshes
7. ✅ Ads and IAP system are architected but not activated
8. ✅ Deployed to GitHub Pages or Vercel

## Out of Scope
- Actual Google AdSense implementation (just placeholder)
- Real IAP transactions
- Multiplayer features
- Cloud saves (local storage only)
- Sound effects and music (can be added later)
- Backend/server infrastructure
- Marketing or distribution
