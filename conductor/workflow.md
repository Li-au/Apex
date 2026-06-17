# Development Workflow - APEX

## Overview
This workflow balances speed with quality. For a game development project, we focus on iterative feature development with daily improvements.

## Phase Structure
Each track is divided into **Phases**. Each phase focuses on a specific area and includes:
1. **Core Implementation** - Write features and code
2. **Testing** - Verify functionality
3. **Polish** - UI/UX refinements
4. **Phase Completion** - Manual verification and checkpointing

## Task Format
Each task follows this structure:
```
- [ ] Task: <Task Name>
  *Phase: <Phase Name>*
  - [ ] Sub-task 1
  - [ ] Sub-task 2
```

## Code Quality Standards
- **Commits:** One commit per completed task (descriptive message)
- **Testing:** Manual testing for game features (automated tests optional)
- **Code Review:** Self-review before committing
- **Refactoring:** Only if it improves readability or performance

## Commit Message Convention
```
<type>(<scope>): <description>

<optional body>

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

Types: feat, fix, refactor, style, docs, chore

## Daily Workflow (for game development)
1. **Planning** - Review today's task in the plan
2. **Implementation** - Code the feature
3. **Testing** - Play the game, verify the feature works
4. **Polish** - Fix bugs, improve UX
5. **Commit** - Stage changes and commit
6. **Demo** - Show what was built

## Phase Completion Protocol
At the end of each phase, execute:
1. Play the full game from start to finish
2. Verify all features in the phase work together
3. Check for visual bugs or UX issues
4. Performance check (no lag, smooth gameplay)
5. Checkpoint: commit with message `conductor(checkpoint): Checkpoint end of Phase <N>`
6. Update plan: mark phase as complete

## Success Criteria per Phase
- **Phase 1 (Core Game):** Tapping works, upgrades work, levels load
- **Phase 2 (Progression):** All 50 levels exist, progression smooth, difficulty scaling
- **Phase 3 (Cosmetics):** Skins selectable, UI polished, animations smooth
- **Phase 4 (Battle Pass):** Battle pass shows, tasks work, progression tracks
- **Phase 5 (Prestige):** Reset mechanics work, bonuses apply correctly
- **Phase 6 (Événements):** Events spawn, timer works, rewards awarded
- **Phase 7 (Polish):** No bugs, optimized, ready for ads/monetization
