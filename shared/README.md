# Shared learning content

`english-phonics.ts` is platform-neutral, authored learning content used directly by
the mobile English letter sheet and Telegram `/alphabet`. It has no runtime or
native dependencies and does not write learning progress, XP or streak data.

## English reading guide

- Teach letter names separately from sounds in words.
- Give spelling clues, not unconditional pronunciation formulas. Keep frequent
  exceptions and the representative US-accent disclaimer visible.
- `focus` contains zero-based, half-open **spelling** ranges. For example, cape
  uses `[[1, 2], [3, 4]]` for the split a_e pattern; silent letters are highlighted
  on their own. `phonicsSegments` preserves the entire word.
- Keep meanings, conditions, feedback and UI copy complete in ko/en/uz/ru.
- TTS reads actual words or English letter names, never IPA or localized
  approximations. Avoid context-dependent heteronyms in isolated audio examples.
- Checks give local explanations and retries. They do not claim pronunciation
  mastery, award XP, or alter Korean Hangul progress.

Sources for pronunciation/pedagogy verification are linked in
`ENGLISH_PHONICS_SOURCES`; explanations are original Korio copy, not reproduced
lessons. IPA is a broad representative transcription, not a guarantee that every
voice or regional accent produces identical sounds.

## Checks

```powershell
pnpm --filter mobile test:alphabet
pnpm --filter mobile exec tsc --noEmit
pnpm --filter mobile lint
pnpm --filter telegram-app test:phonics
pnpm --filter telegram-app test:speech
pnpm --filter telegram-app lint
pnpm --filter telegram-app check-types
pnpm --filter telegram-app build
```

The Telegram phonics test script can also produce bounded SSR previews when
`KORIO_PHONICS_PREVIEW_DIR` points inside the OS temporary directory. Its localhost
server serves only generated fixtures; it does not bypass Telegram authentication
or exercise live TTS. Stop the server after visual QA.
