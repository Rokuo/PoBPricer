# PoE Build Pricer ("Build Ledger")

Estimates what a Path of Exile 1 or 2 build costs. The user pastes a Path of Building code or a pobb.in link, picks a game and league, sees every gear item priced, tweaks mod rolls, and watches the total update.

Roadmap and decisions: https://claude.ai/artifact/9WjMMJvPdd5hkUnHNKbTjM (private doc; ask the user if you need something from it).

## How we work

- This is a learning project. Use the Mentor output style: the user writes the core logic and the tests; you explain, scaffold, and review.
- Strict TDD in `packages/core` and `apps/api`: no implementation without a failing test first.
- Current phase: **0 - Foundations** (the user updates this line when a phase gate passes).

## Roadmap phases

0. Foundations: monorepo, strict TS, Vitest, CI, Panda tokens
1. Decode builds: PoB code or pobb.in link -> typed `Build` model in `core`
2. Price data: worker pulls poe.ninja into Postgres as snapshots
3. Pricing engine v1: uniques, gems, flasks by name; currency rates; confidence
4. Front-end MVP: import and gear screens on desktop, deployed preview
5. Tweak the gear: roll sliders, drop mods, life and resist caps, trade link
6. Motion and phone: GSAP, reduced motion, phone layouts
7. Accounts and sharing: sign-in, saved builds, share links, price index
8. Later, only if allowed: trade lookups, character import

Phases 1 and 2 are independent. Do not start work from a later phase unless the user asks.

## Stack

- pnpm workspaces, TypeScript `strict` everywhere
- `apps/web`: Vite, React, TanStack Router, TanStack Query, Panda CSS, GSAP + `@gsap/react`
- `apps/api`: Hono on Node, Drizzle + Postgres, Zod; the worker is a second entry point in this app
- `packages/core`: PoB decode, item model, matching, pricing, stat totals
- `packages/fixtures`: real PoB codes and recorded poe.ninja JSON
- Tests: Vitest, Testing Library, MSW, Playwright

```
apps/web           React, Router, Query, Panda, GSAP
apps/api           Hono routes + worker entry
packages/core      domain logic, no I/O
packages/fixtures  PoB codes + recorded API responses
docs/LEARNING.md   the user's learning log
```

## Commands

Planned; confirm against `package.json` once phase 0 is done.

- `pnpm install`
- `pnpm -r test`
- `pnpm -r typecheck`

## Architecture rules

- `core` is pure: no `fetch`, no `Date.now()`, no database. The clock, price data and user edits are passed in.
- The browser never calls poe.ninja, pobb.in or GGG. Only the API and the worker do.
- Validate every external payload with Zod at the boundary. Keep unknown fields raw instead of dropping them.
- TanStack Query holds server state only. Slider values and other UI state live in components or the URL.
- Prices are snapshots written by the worker, never a live upstream call per request.
- Currency: the base unit is chaos in PoE1 and exalted in PoE2. Also store the divine value at the snapshot's rate.
- Every price carries a source and a confidence (`firm`, `estimate`, `unpriced`). Never fold unpriced items into a total silently.

## Data source rules (do not break these)

- poe.ninja: only the documented economy endpoints (`/poe1/api/economy/...`, `/poe2/api/economy/...`). Send a descriptive User-Agent with contact info, honour ETag with `If-None-Match`, and do not poll more often than about every 15 minutes (PoE1) or every hour (PoE2). The builds and profile API is internal: never call it.
- pobb.in: `GET /:id/raw`, with a User-Agent that includes contact info.
- Official trade site: link-out only (build a search URL for the user to open). No automated calls to its API.
- GGG account and character import: not available to new apps; do not build it unless the user asks.
- The site footer shows: "This product isn't affiliated with or endorsed by Grinding Gear Games in any way."

## Testing rules

- Unit tests never touch the network: fixtures in, results out. MSW mocks HTTP in UI tests.
- A bug gets a failing test before its fix.
- UI tests run with reduced motion; test outcomes, not GSAP tweens.
- A few Playwright flows, at 390 px and 1440 px wide.

## Design tokens

From the "PoE Build Pricer" design canvas:

- Ground `#121110`, surface `#1B1917`, border `#332E27`, text `#ECE6DA`, muted text `#A89F90`, gold accent `#D4A35A`
- Rarity: rare `#E8E07A`, magic `#9C9CFF`, unique `#D98A45`
- Fonts: Cinzel (display), IBM Plex Sans (body), IBM Plex Mono (codes and numbers)
