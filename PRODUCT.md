# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Korean learners in Uzbekistan and the wider CIS who speak Uzbek or Russian. They study on their phones, often on budget Android devices and slow or metered connections. Common goals are work, study, or life in Korea and passing TOPIK.

## Product Purpose

KORIO teaches Korean from Hangul up to TOPIK level through short, gamified daily lessons. Success means learners come back every day, move up through levels, and can actually speak and use Korean in real situations.

## Positioning

KORIO is built for Uzbek- and Russian-speaking learners instead of being translated for them afterwards. Explanations are written in the learner's native language. An AI voice tutor lets them practise speaking out loud with a character. Courses lead to TOPIK and teach the everyday expressions needed in Korea, including emergencies.

## Operating Context

- `apps/mobile`: the main product, an Expo / React Native app for iOS and Android. It has tabs for home/path, league, stats and premium. Its features include a study path, Hangul writing and games, grammar, expression packs, reading and listening, speaking, the AI voice tutor, TOPIK, friends, shop, level-up moments and retention mechanics.
- `apps/telegram-app`: a separate KORIO client that runs inside Telegram as a Mini App on iOS, Android and Desktop. It does not share routing or styles with `apps/web`.
- `apps/web`: the public Korean-language web presence and the account-deletion page.
- `apps/admin`: the internal operations console for analytics, users, subscriptions and content.
- `apps/api`: the NestJS API behind all of these.

## Capabilities and Constraints

- Platform `web` above means one cross-platform KORIO brand language shared by iOS, Android and Telegram. The design does not follow native HIG or Material conventions per OS.
- Performance budget: screens and motion must stay light on low-end Android and slow networks, and should save data.
- The UI is localized in four languages: Uzbek, Russian, English and Korean. Layouts must hold up with long Uzbek and Russian strings.
- Korean learning content is always shown in Hangul, never romanized in place of Hangul.
- Revenue comes from a free tier plus a premium subscription (in-app purchase). The game economy includes energy, gems, a shop and leagues.

## Brand Commitments

- Name: KORIO (written in caps in product copy).
- Web tagline in use: “KORIO | 한국어를 즐겁게 배우다” (“learn Korean the fun way”).
- Level-up celebrations use a Hangul rocket motif on both the mobile app and Telegram.

## Evidence on Hand

No testimonials, user counts, ratings, press or outcome metrics have been supplied. Do not invent them.

## Product Principles

1. Explain in the learner's own language: Uzbek or Russian first, never English as the default go-between.
2. Speaking is the goal, not just recognizing words. Every path should lead toward producing real Korean.
3. Build a daily habit. Progress, streaks and celebrations exist to bring learners back, without punishing them.
4. Budget phones are the baseline. If something does not work on a low-end Android over a slow network, it is not done.
5. Teach what is useful in real life in Korea: TOPIK, work, and everyday or emergency situations.
