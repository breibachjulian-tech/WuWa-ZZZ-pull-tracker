# Pull Planner

An exact probability calculator and multi-banner planner for gacha games, starting with Wuthering Waves and Zenless Zone Zero.

## The problem

Most pity calculators answer one question: "what are my odds on this banner?" Real planning is harder. You have limited pulls, several banners coming up, free-pull income each version, and a guarantee state that carries over between banners. Pull Planner answers questions like:

- What is the exact chance of getting the featured 5-star within N pulls, given my current pity and guarantee status?
- If I am targeting several upcoming banners, what is the chance of getting all of them, and which spending order works best?

## What makes it different

- **Exact probabilities, not just simulations.** The engine computes the answer with dynamic programming, then cross-checks it against a seeded Monte Carlo simulation. The two must agree within tolerance, and the tests enforce that.
- **Config-driven engine.** A banner is described by data (base rate, soft pity ramp, hard pity, featured chance, guarantee behavior), not hardcoded logic. Adding a banner or game means adding a config, not changing engine code.
- **Multi-banner planning.** Compare fixed spending strategies across upcoming banners and see the probability of getting all your targets.
- **No backend, no account.** All state lives in your browser and can be shared through the URL.

## Tech stack

TypeScript (strict), pnpm workspace, Vitest, fast-check, GitHub Actions

| Package | Description |
| --- | --- |
| `packages/engine` | Pure TypeScript probability engine with zero runtime dependencies |
| `apps/web` | Web UI |

## Roadmap

- [x] M0: Repo, workspace, license
- [ ] M0: Strict TypeScript, lint, tests, CI
- [ ] M1: Exact engine for a single banner
- [ ] M2: Monte Carlo simulation and cross-validation against the exact result
- [ ] M3: Second banner config, with no engine changes
- [ ] M4: Single-banner UI with shareable URL state
- [ ] M5: Multi-banner planner
- [ ] M6: Polish: scenario comparison, import/export, mobile layout, accessibility, math explainer

## Rates and sources

Pull rates and pity rules live in the engine's config files, each with a link to its source.

## Development

Requires Node.js (LTS) and [pnpm](https://pnpm.io).

```bash
git clone https://github.com/breibachjulian-tech/WuWa-ZZZ-pull-tracker.git
cd WuWa-ZZZ-pull-tracker
pnpm install
```

## Disclaimer

This is an unofficial fan project. It is not affiliated with or endorsed by Kuro Games or HoYoverse. Wuthering Waves, Zenless Zone Zero and all related names are trademarks of their respective owners. This project contains no game assets. Probabilities are calculated from published rates and are estimates, not guarantees.

## License

[MIT](LICENSE)