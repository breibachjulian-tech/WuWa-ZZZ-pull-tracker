# Pull Planner

Exact probability calculator and multi-banner planner for gacha games (Wuthering Waves, Zenless Zone Zero). Portfolio project. Build the engine first, UI last.

## Commands

Run from the repo root:

- `pnpm test` - run Vitest in all packages
- `pnpm typecheck` - run tsc in all packages
- `pnpm lint` - ESLint
- `pnpm format` - Prettier (write); `pnpm format:check` for CI

Before finishing any task, run format, lint, typecheck and test, and fix everything that fails.

## Structure

- `packages/engine` - pure TypeScript probability engine. Zero runtime dependencies. No DOM, no browser APIs, no Node-specific APIs.
- `apps/web` - UI (not created yet, starts at M4).

## Rules

- TypeScript strict. No `any`, no `@ts-ignore` without a comment explaining why.
- TypeScript is pinned to 6.x because typescript-eslint does not support TS 7 yet. Do not upgrade it.
- The engine is config-driven: banners are data (base rate, soft pity start and ramp, hard pity, featured chance, guarantee carry-over). Adding a banner or game must not require engine code changes.
- Never invent pull rates or pity rules. Rates come from a cited source, and each config file links to its source. If a rate is not known, ask instead of guessing.
- Write tests alongside every engine change. Required properties: probabilities sum to 1, the 5-star chance is 1 at hard pity, hand-worked cases match.
- The exact (dynamic programming) result is the reference. The Monte Carlo simulation (M2) must agree with it within tolerance, using a seeded PRNG.
- No backend. State lives in the browser.
- No game assets (art, icons, logos) in the repo.
- Use Conventional Commits (feat, fix, chore, docs, test, ci, style).

## Current status

Milestones live in the README roadmap. Currently on M1: exact engine for a single banner.``
