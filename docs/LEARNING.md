# Learning log

## 2026-11-10 to 2026-11-12: Phase 0, Foundations

**Built**

- mise pins Node 26.13.0 and pnpm 12.18.0.
- A pnpm workspace with four packages (`core`, `fixtures`, `api`, `web`) and a shared strict `tsconfig.base.json`.
- Vitest in `core`, plus a warm-up `sum` test that took the first red to green cycle.
- ESLint (type-aware, via typescript-eslint) and Prettier. TypeScript is pinned to 6.0.3 because typescript-eslint doesn't support TS 7 yet.
- GitHub Actions CI on PRs into `dev` and `master` and on pushes to `dev`. It runs format, lint, typecheck and tests, in that order.
- Panda CSS v2 in `web`: a raw palette (`ink`, `parchment`, `gold`, ...) and semantic tokens (`bg`, `fg`, `border`, `accent`, `rarity`).

**Concepts learned**

- How pnpm runs `tsc` with no local `node_modules`: it puts `node_modules/.bin` on `PATH` while a script runs.
- pnpm is strict: a package can only import what it declares itself.
- Anatomy of a Vitest test: `describe`, `it` and `expect`, all imported explicitly.
- "Red for the right reason": a missing import fails, but not because of the behaviour being tested.
- Vitest strips types without checking them, so run `tsc` alongside the tests.
- `.gitignore` doesn't affect files git already tracks. Use `git rm --cached` to stop tracking one.
- Peer dependencies, and how they caused the conflict between TS 7 and typescript-eslint.
- In a `pull_request` trigger, `branches:` filters on the PR's target branch, not its source.
- Raw tokens versus semantic tokens. With `extend`, a raw token that reuses a preset name gets merged into that preset's scale (`stone`, `amber`).

**What was hard**

- Writing a first TypeScript test from scratch.
- Choosing how to group the semantic tokens.
- Telling the colour steps apart (`ink.900` and `ink.700` got swapped).

**Open questions**

- Should `rarity.normal` be pure white on `#121110`, or a softer off-white? Revisit with the UI.
- Add branch protection on `dev` and `master` so the `check` job is required to merge?
- Delete the `sum` warm-up once the first decoder tests exist.

**Next step**

Commit the Panda work on a branch, open a PR into `dev`, and watch CI run on it. Then update the phase line in CLAUDE.md and start Phase 1 (decoding a PoB code) or Phase 2 (pulling poe.ninja data).
