---
version: 1
slug: "c-features-retention-ui-quests-screen-tsx-595a283e"
primary_target: "apps/telegram-app/src/features/retention/ui/quests-screen.tsx"
related_targets: ["apps/mobile/src/features/retention/screens/QuestsScreen.tsx"]
---

# Quests page (Vazifalar / 퀘스트)

Scope: the learner's daily quests and monthly challenge, moved off the home screen into their own page, opened from the home quick-access "Vazifalar" button. Mode: Operate. Same page in the Telegram Mini App and the Expo app.

Audience and task: Uzbek/Russian-speaking Korean learners on budget phones. Several times a day they check what is left for today, claim gems for finished quests, swap one quest, open the chest when all three are done, and glance at the month's count toward the month badge.

Constraints: data and claim/reroll/action endpoints are unchanged (`/retention/summary`, claim, reroll, monthly claim). Long Uzbek/Russian quest titles wrap to two lines. Light and dark themes. No new dependency.

Home: the two cards leave the home screen; the quick-access button shows today's count (e.g. 1/3) and a dot when something can be claimed.

## Direction contract

THESIS: Today is a dial. The three daily quests are arcs of one ring around the chest, so how much of today is done and what it unlocks reads in one glance; it refuses the stacked icon-tile list card the home used.

OWN-WORLD: KORIO Squishy Arcade unchanged: white/night ground, Haneulmon violet arcs and progress, green only for done, gold chest on a darker slab, 800–900 system type, 20px cards with a lavender hairline, slab buttons only on claim/open/actions.

STORY: The learner sees today's progress and time left, spots the next quest, claims gems for finished ones, opens the chest at 3/3, and sees the month moving toward its badge.

FIRST VIEWPORT: Header (back, "Vazifalar"). A 216px ring centred: three violet arcs (done arcs turn green) around the chest, "1/3" and the reset countdown inside. Below: "Bugun" with swaps left, three quest rows (mini progress arc, title, tier · count, reward or claim), the SUPER bonus row; the month card starts at the fold.

FORM: Day ring, position 6 of 7 on my ranked list; seed:bcecddd494cfe9ba. Raise from the ticket wallet: finished quests stay in the list with a "Bajarildi" stamp instead of fading out.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
