---
name: verify-korio-change
description: Validate Korio repository changes with focused, non-destructive checks and diff review. Use when the user asks to verify, test, review, sanity-check, or finish Korio changes, before a commit or handoff, or after editing seed data.
---

# Verify Korio Change

Validate only the affected scope, preserve the user's working tree, and return exact evidence.

## Workflow

1. Establish the baseline.
   - Work from the repository root.
   - Read the applicable `AGENTS.md` files.
   - Inspect `git status --short`, the changed-file list, and the relevant diff.
   - Record pre-existing changes and do not revert, reset, stash, or overwrite them.

2. Map files to checks.
   - `apps/api/**`: run affected Jest tests when identifiable, then `pnpm --filter api build`.
   - `apps/web/**`: run `pnpm --filter web lint` and `pnpm --filter web check-types`; run `pnpm --filter web build` for behavior, configuration, routing, or release-facing changes.
   - `apps/mobile/**`: obey `apps/mobile/AGENTS.md`, run `pnpm --filter mobile lint`, and use only Expo 56-compatible validation.
   - `packages/**`: validate the changed package and its affected consumers; use root `pnpm check-types` and `pnpm build` for cross-package changes.
   - Root workspace or shared configuration: run the smallest affected workspace checks, then broaden to root type and build checks when needed.

3. Validate seed data precisely.
   - `apps/api/src/seed/data/section1/**`: run `pnpm --filter api seed:validate-section1` and, for question-shape changes, `pnpm --filter api seed:validate-questions`.
   - `apps/api/src/seed/data/section2/**`: run `pnpm --filter api seed:validate-section2` and, for question-shape changes, `pnpm --filter api seed:validate-questions`.
   - Grammar seed changes: run `pnpm --filter api seed:validate-grammar`.
   - Recipe seed changes: run `pnpm --filter api seed:validate-recipe`.
   - Do not run database-writing `seed` commands unless the user explicitly requests them.

4. Keep checks non-destructive.
   - Prefer targeted commands and existing dependencies; do not install or update packages merely to validate.
   - Do not use root `pnpm lint` as a read-only check because the API lint script includes `--fix`.
   - If API lint is needed, invoke ESLint on the changed API files without `--fix`.
   - Do not start persistent development servers unless interactive behavior must be verified.
   - If a check needs credentials, a live service, a device, or network access, report that dependency instead of guessing.

5. Review after validation.
   - Re-read `git status --short` and the final diff to detect tool-generated or unrelated changes.
   - Check for behavior regressions, unsafe data operations, leaked secrets, debug artifacts, and missing tests.
   - Distinguish failures introduced by the current change from pre-existing failures when evidence allows.

## Report

Return four compact sections:

- **Scope:** files and packages reviewed.
- **Checks:** exact command, pass/fail status, and relevant result.
- **Diff review:** actionable findings, or state that none were found.
- **Residual risk:** skipped checks, environmental blockers, or unverified behavior.

Never claim a check passed unless it completed successfully.
