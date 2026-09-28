# Voice Tutor pose sprites

The female and male tutors each use 17 user-supplied transparent PNGs. Every
pose is on the same 941×1672 canvas, so the body anchor stays consistent when
the app swaps frames.

- `pose_idle`, `pose_mouth_small`, `pose_mouth_medium` (female only), and
  `pose_mouth_open` drive speech.
- `pose_blink_*` and `pose_look_*` drive blinks and gaze changes.
- `pose_hand_raise_*`, `pose_both_explain_*`, and `pose_both_compare*`
  drive the lesson reaction gestures.
- The female `pose_laugh_open` is selected for laughter. The male pack has a
  closed-eye smile and a second wide speaking explanation pose instead.

`src/features/voice-tutor/character/character-manifest.ts` is the explicit
asset map. Do not infer pose names from file order or mix the old placeholder
sprites with this pack.
