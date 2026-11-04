---
version: 1
slug: "rc-features-stories-storyplayerscreen-tsx-6bb2cfbe"
primary_target: "apps/mobile/src/features/stories/StoryPlayerScreen.tsx"
related_targets: ["apps/mobile/src/features/stories/StoryLibraryScreen.tsx"]
---

## Scope

English course "Stories": a story library and an immersive story player in the Expo app (`apps/mobile`). Visitor mode: Experience (player), Operate (library). Users are Uzbek/Russian speakers learning English on budget Android phones, mostly with earphones, often in the evening, who want to put a story on and watch the words go by.

## Direction contract

THESIS: A story you watch, not a lesson you open. The scene is a living picture whose own light reads the words to you: the sun or moon crosses the sky as the story advances, and each spoken word lights up in that same light. It refuses the category default of a lesson card, a play button and a static text block.

OWN-WORLD: Every story is drenched in its own scene palette: a sky gradient falling into a deep ground of the same hue family, layered code-drawn silhouettes of Uzbek places (mahalla rooftops, a market dome, chinar trees, Tian Shan ridges) with slow ambient particles. Heavy system type (800-900) sits straight on the ground, no cards. The scene's glow colour fills spoken words. KORIO violet owns the slabbed play button, the timeline head and the active level pill. Pressables keep their same-hue darker slab.

STORY: Pick a picture, press play, watch the words light up, tap a sentence to hear it again, flip the translation on or off, repeat a sentence into the mic, answer three quick questions, and the next story starts by itself.

FIRST VIEWPORT: Top 42% is the animated scene with the sun at the start of its arc, a back chip top-left and the level pill top-right. The English title (28/900) sits on the fade into the ground with the translated title under it. The first sentences start right below. A floating dock at the bottom holds the timeline with sentence ticks and, centred, the 64px violet play slab between previous and next, with speed and translation chips at the ends.

FORM: Living picture book (first of five considered: picture book, music player with lyrics, subtitle cinema, postcard stack, radio). seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
