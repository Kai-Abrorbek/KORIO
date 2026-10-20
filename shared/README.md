# Shared learning content

## Word games

`word-games.ts` adapts scoped server words to the existing game engines. English
matching uses the same five-pair board, 60-second clock, feedback animations and
reward rules as Korean. Memory uses the existing five levels (5/7/10/12/15 pairs),
preview times, flip cards and star rules. Its word list is stable during a level,
and it checks for 15 distinct pairs before starting. The legacy API field `ko`
still holds the headword, even in an explicitly English game pool; `meaningKo`
holds its Korean meaning.

Use learned words first, then fill from that course's server pool. Freeze the
target and explanation languages at game entry, deduplicate ambiguous labels and
never substitute Korean mock words after an English request fails. Games not yet
ported stay unavailable in English until their own implementation and commit.

Deploy the API before the Telegram release or mobile OTA. No seed write, database
migration, production dependency or native build is required.

```powershell
pnpm --filter mobile test:match-game
pnpm --filter mobile test:memory-game
pnpm --filter telegram-app test:word-games
pnpm --filter telegram-app test:memory-game
pnpm --filter api exec jest --runInBand words-game-pool.spec.ts game-words.util.spec.ts words-course.spec.ts
```

## Pronunciation and phonics

`english-phonics.ts` is platform-neutral, authored learning content used directly by
the mobile English letter sheet and Telegram `/alphabet`. It has no runtime or
native dependencies and does not write learning progress, XP or streak data.

`pronunciation.ts` contains the platform-neutral listening-card contracts and the
existing EASY/HARD rules. `english-pronunciation.ts` supplies the English data to
the same card flow: 4 levels, 16 stages, 111 real-word minimal pairs, and meanings
and guidance in ko/en/uz/ru. English examples use representative US pronunciation;
they are sound-discrimination practice, not a speech-recognition assessment.

## Pronunciation card data

- Preserve the Korean curriculum and saved keys (`lv1:1:easy`). English scores
  use the separate `en:lv1:1:easy` namespace in the existing score map.
- `createPronunciationCurriculum` issues each pair twice, once for each correct
  side, then shuffles. EASY unlocks HARD at 80; stages are cleared at 60. Progress
  preserves the existing attempted-mode counting.
- `a` and `b` are card labels with IPA slashes; an option's `jamo` is its phoneme
  without slashes. Speak the actual English `word` using a US English voice, not
  the IPA label or a translated meaning.
- `pos: "middle"` identifies the vowel contrast. `front` and `back` refer to the
  position of the contrasted sound, not the position of a spelling character.
- Keep pairs phonemically minimal and suitable for isolated TTS. Do not pad
  stages with invented words, homophones or context-dependent heteronyms. The
  /uː/–/ʊ/ stage deliberately contains only three well-defined US contrasts.
- Bubble text is an English example with exactly one `{0}` placeholder. Word
  meanings are localized separately; locale variants fall back to their base
  language, and unsupported locales fall back to English.

Pronunciation references are linked in `ENGLISH_PRONUNCIATION_SOURCES`. Content is
original Korio copy; dictionary definitions and audio are not reproduced.

Deploy the pronunciation-score API change before the Telegram release or mobile
OTA. An older API does not understand `targetLanguage` and would save an English
result using a legacy Korean key. No database migration or native build is needed
for this change.

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
pnpm --filter mobile test:pronunciation
pnpm --filter mobile test:alphabet
pnpm --filter mobile exec tsc --noEmit
pnpm --filter mobile lint
pnpm --filter telegram-app test:phonics
pnpm --filter telegram-app test:pronunciation
pnpm --filter telegram-app test:speech
pnpm --filter telegram-app lint
pnpm --filter telegram-app check-types
pnpm --filter telegram-app build
```

The Telegram phonics test script can also produce bounded SSR previews when
`KORIO_PHONICS_PREVIEW_DIR` points inside the OS temporary directory. Its localhost
server serves only generated fixtures; it does not bypass Telegram authentication
or exercise live TTS. Stop the server after visual QA.
