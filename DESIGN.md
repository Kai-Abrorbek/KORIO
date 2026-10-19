---
name: KORIO
description: The learner-facing visual system of KORIO's mobile app and Telegram Mini App, a squishy arcade for learning Korean.
colors:
  haneulmon-violet: "#776EE2"
  violet-deep: "#5B4DD4"
  violet-glow: "#9D8DFF"
  violet-mist: "#C4BEF0"
  blush-pink: "#E5379B"
  correct-green: "#58CC02"
  correct-green-depth: "#58A700"
  correct-wash: "#D7FFB8"
  wrong-red: "#FF4B4B"
  wrong-red-depth: "#D33B3B"
  wrong-wash: "#FFDFE0"
  hint-amber: "#F5A623"
  hint-wash: "#FFF1C7"
  social-sky: "#1CB0F6"
  social-sky-depth: "#1899D6"
  streak-orange: "#FF7A00"
  streak-orange-depth: "#D45F00"
  crown-gold: "#FFD900"
  crown-gold-depth: "#E5AE00"
  ink: "#1A1A2E"
  slate: "#55555F"
  lavender-line: "#ECEAF6"
  paper: "#FFFFFF"
  disabled-gray: "#D1D1D6"
  disabled-gray-depth: "#B5B5BA"
  night: "#15151D"
  night-surface: "#25252E"
  night-line: "#3A3A44"
  night-muted: "#A6A6B3"
typography:
  display:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.5px"
  headline:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 900
    lineHeight: 1.2
  title:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.4
  caption:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.4
  label:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 900
    lineHeight: 1.3
  tab-label:
    fontFamily: "-apple-system, Roboto, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
rounded:
  bar: "4px"
  chip: "12px"
  button: "14px"
  button-lg: "16px"
  card: "20px"
  pill: "999px"
spacing:
  xxs: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.correct-green}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    rounded: "{rounded.button}"
    padding: "16px 24px"
  button-primary-disabled:
    backgroundColor: "{colors.disabled-gray}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
  button-check:
    backgroundColor: "{colors.haneulmon-violet}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    rounded: "{rounded.button-lg}"
    height: "54px"
  button-check-success:
    backgroundColor: "{colors.correct-green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button-lg}"
    height: "54px"
  button-check-danger:
    backgroundColor: "{colors.wrong-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button-lg}"
    height: "54px"
  button-check-disabled:
    backgroundColor: "{colors.lavender-line}"
    textColor: "{colors.slate}"
    rounded: "{rounded.button-lg}"
    height: "54px"
  answer-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.chip}"
  answer-chip-correct:
    backgroundColor: "#D7F5E3"
    textColor: "#1CB454"
    rounded: "{rounded.chip}"
  answer-chip-wrong:
    backgroundColor: "#FFEBEB"
    textColor: "{colors.wrong-red}"
    rounded: "{rounded.chip}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  chip-goal:
    backgroundColor: "{colors.streak-orange}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "7px 12px"
  tab-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.haneulmon-violet}"
    typography: "{typography.tab-label}"
    height: "60px"
---

# Design System: KORIO

## Overview

**Creative North Star: "The Squishy Arcade"**

KORIO should feel like a small arcade machine you hold in your hand. Every tappable thing has a thick, darker slab underneath it. When you press it, the face drops into that slab and you hear a click. Correct answers burst green, wrong ones go red, and the purple, one-eyed mascot 하늘몬 (Haneulmon) cheers or sulks along with you. Learning Korean should feel like playing, not studying a textbook.

Screens are dense with small, heavy type, chunky pills and bright semantic color. They sit on a calm white (or near-black) ground, so the colour comes from rewards and states, not backgrounds. Haneulmon Violet is the brand: it lives in the mascot, the tab bar, the primary lesson actions and the hero gradients. The bright green/red/blue/gold game palette is borrowed from the genre, and it only works because the violet and the mascot keep saying "this is KORIO".

The same world runs in two shells. The Expo app (`apps/mobile`) is the source of truth. The Telegram Mini App (`apps/telegram-app`) mirrors its theme tokens in CSS. The admin console is a separate operations surface and is not covered here.

**Key Characteristics:**
- Pressable things have physical depth: a darker bottom slab (3–5px) and a face that sinks on press.
- Type is heavy: 800–900 weight is the default for anything that matters, at compact sizes (11–17px).
- White or night ground with colour carried by state, rewards and the violet brand.
- A 3D clay-rendered mascot (Haneulmon) and Hangul glyphs as recurring characters.
- Every press makes a sound; motion is quick (55–90ms press) and springy (damping 8–9 pops).

## Colors

A violet brand on a quiet ground, with a loud game palette reserved for meaning: success, error, hints, streaks, rewards.

### Primary
- **Haneulmon Violet**: the mascot's body colour and KORIO's identity. Tab bar active state, the lesson Check button, premium tier thumbs, links and brand accents. Used in both light and dark themes unchanged.
- **Violet Deep**: the shade under violet faces (pressed slabs) and the end stop of hero gradients. Also text on gold badges.
- **Violet Glow**: the light start of the violet gradient (`violet-glow → haneulmon-violet → violet-deep`) used on hero and premium surfaces.
- **Violet Mist**: inactive tab icons and labels, which keeps the navigation tinted rather than grey.

### Secondary
- **Blush Pink**: the pink of the logo's "O" and Haneulmon's cheeks. A small accent for notifications, energy and aura details; never a large fill.

### Tertiary (game semantics)
- **Correct Green / Depth / Wash**: right answers, the default "continue" CTA, success tone of the Check button. Wash is the feedback-bar background.
- **Wrong Red / Depth / Wash**: wrong answers, danger tone, notification count badges.
- **Hint Amber / Wash**: "almost" and guidance feedback, between right and wrong.
- **Social Sky / Depth**: friends, follow, invite and social actions.
- **Streak Orange / Depth**: daily goal and streak chips, the flame.
- **Crown Gold / Depth**: legendary lesson nodes, crowns, top league tiers and reward moments.

### Neutral
- **Ink**: primary text in light theme and the shadow colour of cards.
- **Slate**: secondary text in light theme.
- **Lavender Line**: hairlines, card borders, tab-bar top border and the disabled Check button face. Faintly violet, never pure grey.
- **Paper**: background and surface in light theme; also text on every coloured button.
- **Disabled Gray / Depth**: the disabled face and slab of the green Primary Button.
- **Night / Night Surface / Night Line / Night Muted**: dark theme background, card surface, borders and secondary text. Dark text is Paper.

### Named Rules
**The Violet Signature Rule.** Every screen shows Haneulmon Violet somewhere it matters (tab bar, primary action, header accent, or the mascot). The green/red/blue/gold palette is genre vocabulary; on its own it reads as someone else's app.

**The Meaning-Only Rule.** Green, red, amber, sky, orange and gold always mean something (correct, wrong, hint, social, streak, reward). Don't use them as decoration or to make a section "pop".

**The Slab Is Darker Rule.** A pressable colour's slab is the same hue, darker: the listed `-depth` token, or `darken(color, 40)` from `utils/color.ts` for unit colours. Never a grey or black slab under a coloured face.

## Typography

**Display / Body Font:** the platform system font (SF Pro on iOS, Roboto on Android). No custom font is loaded in the app. The Telegram Mini App puts Inter first, then the system stack.

**Character:** one family, pushed hard on weight. 900 and 800 are the most common weights in the codebase. Sizes stay small and dense, and hierarchy comes from weight and colour rather than big jumps in size.

### Hierarchy
- **Display**: level-up numbers, streak counts, result screens. Sizes of 32–48px appear only for the Hangul being studied (word study, pronunciation, Hangul games) and for celebration popups.
- **Headline**: feedback titles ("Correct!", "Not quite"), screen hero titles.
- **Title**: button labels, card titles, usernames.
- **Body**: answer chips, prompts, list rows. 14–15px at 700–900 is the working range.
- **Caption**: supporting lines, metadata, explanations under answers.
- **Label**: chips, badges, pills, counters. Tiny badge text goes down to 9.5–10px at 900.
- **Tab Label**: bottom-tab labels only.

### Named Rules
**The Heavy-By-Default Rule.** Anything the learner is meant to act on or read as a value is 800–900. Use 600–700 only for secondary lines. Regular weights (400–500) are essentially absent; don't introduce them for UI text.

**The Hangul Is the Hero Rule.** On study and game screens, the Korean being learned is the largest thing on screen (40–48px Hangul), with the learner's language underneath in a smaller size. Never show romanization in place of Hangul.

**The Long-String Rule.** Labels must survive Uzbek and Russian, which run 30–60% longer than English. Allow two lines on buttons and chips (`numberOfLines={2}`, `flexShrink: 1`) instead of shrinking the type.

## Layout

Single-column phone layout, portrait only. Screen gutter is 20px for headers and 16px for cards (`marginHorizontal: 16`). Inside, gaps step through 4 / 6 / 8 / 10 / 12 / 14px, with 8–12 the norm. Cards stack with 12px between them.

The bottom tab bar floats (`position: absolute`) at 60px plus the safe-area inset, so content scrolls under it. Any screen with a bottom-fixed button must add `TAB_BAR_HEIGHT` (from `constants/layout.ts`) so the button clears the bar. Lesson screens pin the Check button to the bottom with 8px clearance above the safe area, independent of content length.

The Telegram Mini App caps content at 560px wide and uses the `--korio-top` / `--korio-bottom` safe-area variables, which merge the device and Telegram insets.

## Elevation & Depth

Depth is mostly **physical slabs**, not shadows. Pressable elements get a darker bottom edge (`borderBottomWidth` 3–5px, 4px most common) or a separate darker layer that shows when the face moves down. Shadows are kept for two quieter jobs: lifting cards a hair off the ground, and glowing around the current lesson node.

### Shadow Vocabulary
- **Card lift** (`shadowColor: #1A1A2E, offset 0/2, opacity 0.05, radius 8, elevation 2`): standard cards, always paired with a 1px Lavender Line border.
- **Node ground** (`#000, offset 0/7, opacity 0.12, radius 8`): under roadmap lesson nodes.
- **Node glow** (`shadowColor = node colour, offset 0/0, opacity 0.7, radius 13`): the halo around the active node.

### Named Rules
**The Press-Sinks Rule.** The face moves down by exactly the slab depth on press-in (60ms) and springs back on release (90ms). Pressed buttons don't change colour or fade; they sink.

**The Quiet Card Rule.** Cards don't get slabs. Slabs mean "press me". A card that is not itself a button stays flat, with a hairline border and the barely-there card lift.

## Shapes

Soft and round. Pills (999px) for badges, counters, progress tracks and segmented controls. 12px for chips, 14–16px for buttons, 18–20px for cards, 21–22px for bottom sheets and the feedback bar. Lesson nodes on the roadmap are full circles. Progress bars use 3–4px radii. Nothing is sharp-cornered, and there are no hard 0px rectangles in the learner UI.

## Components

### Buttons
Thick and squishy. The button is the main character of this system.
- **Shape:** gently rounded (14px for the generic primary button, 16px for the lesson Check button).
- **Primary (continue):** Correct Green face, Correct Green Depth 4px bottom slab, white 16px/800 label with 0.3px tracking, 16px vertical padding, full width.
- **Check (lesson):** a 54px face on a 58px darker layer (4px depth). The default tone is Haneulmon Violet; after grading it switches to the success (green) or danger (red) tone. The darker layer is `darken(base, 40)`.
- **Disabled:** the Primary button turns Disabled Gray with a Disabled Gray Depth slab. The Check button turns Lavender Line with Slate text. These two disabled styles differ; match whichever component you are extending.
- **Sound:** every press plays the `click` sound via the `@/components/ui/Pressables` wrappers. Pass `sound={false}` or `silent` only where the sound would be wrong.

### Chips
- **Answer chip:** a white face with a 1.5px border and a 3px bottom slab, 12px radius, 15px/700 text. On grading it animates to green wash/border/text or red wash/border/text, interpolated rather than switched instantly.
- **Goal / streak chips:** a filled Streak Orange chip with a 3px Streak Orange Depth slab and 12.5px/900 white text. The freeze chip is a tinted (10% alpha) Social Sky pill with dark-sky text.
- **Notification badge:** a red pill, at least 19px, with a 2px border in the page background colour so it cuts out of the icon underneath.

### Cards / Containers
- **Corner Style:** generously rounded (20px).
- **Background:** Paper (light) / Night Surface (dark).
- **Shadow Strategy:** Card lift (see Elevation), never a slab.
- **Border:** 1px Lavender Line / Night Line.
- **Internal Padding:** 16px, with 16px side margins on the screen.

### Feedback Bar
The bottom sheet that rises after an answer. A 21px-radius panel in Correct Wash, Wrong Wash or Hint Wash, with a 24px/900 headline in the matching accent. It has a slab button of its own (green, red or amber face over its depth tone) and a burst of shards above it. This is where the arcade feeling peaks; keep it loud and quick.

### Navigation
A floating bottom tab bar on Paper / Night Surface with a 1px top hairline, Ionicons glyphs, and 11px/600 labels. Active is Haneulmon Violet, inactive is Violet Mist. Tabs: Home, Stats, League, Premium. Tab presses play the click sound. There is no top navigation chrome on tab screens; each screen draws its own header (20px gutter, 56px top padding).

### Lesson Node (signature)
Roadmap lessons are circular buttons with a darker depth disc underneath, a ground-shadow ellipse and, when the lesson is current, an animated ring and glow in the unit colour. Locked nodes use Lavender Line with Slate icons. Legendary nodes go Crown Gold with a dark-gold icon. Icons are white on unlocked nodes.

### Haneulmon (signature)
The mascot is a 3D clay-style render (PNG mood sheets in `assets/images/characters`): purple body, one big eye, pink cheeks, striped antennae. It reacts to the learner's state (cheer, oops, thinking, dancing). Use the existing renders. Don't redraw it in flat vector or swap its colour.

## Do's and Don'ts

### Do:
- **Do** give every pressable element a same-hue darker slab (3–5px, usually 4px) and sink the face by that depth on press.
- **Do** route every touchable through `@/components/ui/Pressables` so it gets the click sound.
- **Do** take surface, text and border colours from `useTheme()` (`bg`, `surface`, `text`, `textSecondary`, `border`) so dark mode keeps working. Use the semantic tokens above for state colours.
- **Do** keep Haneulmon Violet visible on every screen, and let the mascot carry emotion at moments of success, failure and celebration.
- **Do** set UI text at 800–900 weight and let long Uzbek/Russian labels wrap to two lines.
- **Do** keep motion short: 55–90ms for presses, springs with damping 8–9 for pop-ins, 200ms for fades.

### Don't:
- **Don't** let a screen look like a Duolingo clone. The green CTA and game palette are shared genre language, so violet, Haneulmon and Hangul must make each screen recognisably KORIO.
- **Don't** put a slab under a card or any element that isn't pressable.
- **Don't** use green, red, amber, sky, orange or gold as decoration; each one carries a meaning.
- **Don't** introduce a custom web font or a light (400) UI weight in the app.
- **Don't** hard-code `#FFFFFF` / `#1A1A2E` for surfaces and text in new code; they break in dark theme.
