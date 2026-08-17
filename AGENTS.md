# Korio Agent Guide

## Repository map

- This is a pnpm 9 + Turborepo TypeScript monorepo. Use `pnpm`; do not use npm or Yarn.
- `apps/api`: NestJS API backed by Mongoose.
- `apps/web`: Next.js web app.
- `apps/mobile`: Expo / React Native app. Also follow its closer `AGENTS.md`.
- `packages/ui`: shared UI code.
- `packages/eslint-config` and `packages/typescript-config`: shared tooling.

## Working agreement

- Read the nearest `AGENTS.md`, relevant `README.md`, and package scripts before editing.
- Preserve unrelated working-tree changes. Never revert, overwrite, or broadly reformat user work.
- Keep changes focused on the requested outcome and reuse existing patterns before adding abstractions.
- Ask before adding a production dependency, changing a public contract or database schema, or running destructive seed/data operations.
- Never commit secrets or expose values from `.env*` files, tokens, credentials, or private keys.
- For ambiguous or cross-cutting work, establish a short plan and explicit success criteria before implementation.
- For large tasks with genuinely independent workstreams, use subagents in parallel for bounded exploration, review, or validation. Keep file ownership separate and synthesize their evidence in the main task.

## Validation

- Run the smallest relevant checks first, then broaden only when the change crosses package boundaries.
- API: `pnpm --filter api test -- --runInBand` and `pnpm --filter api build` when applicable.
- Web: `pnpm --filter web lint`, `pnpm --filter web check-types`, and `pnpm --filter web build` when applicable.
- Mobile: `pnpm --filter mobile lint`; use Expo 56-compatible validation for native changes.
- Seed data: run the matching `seed:validate-*` script before considering the change complete.
- Cross-package changes: run root `pnpm check-types` and `pnpm build` as appropriate.
- Root `pnpm lint` can modify API files because the API lint script uses `--fix`; inspect the diff immediately if it is run.
- Do not claim a check passed unless it was run successfully. Report skipped or failing checks and distinguish pre-existing failures from regressions.

## Done means

- The requested behavior is implemented with a focused diff.
- Relevant tests, lint, types, builds, or seed validators pass, or any limitation is clearly reported.
- No debug artifacts, generated junk, secrets, or unrelated edits are left behind.
