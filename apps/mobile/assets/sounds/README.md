# KORIO interface sounds

The same WAV files are bundled here and in `apps/telegram-app/public/sounds`.
The user supplied 48 kHz stereo PCM files. Trailing silence was trimmed and
per-file gain was balanced for repeated UI playback; pitch and timing were preserved.
Original Korean-named files are preserved in the local `_incoming-sounds` import folder.

| Original                | App asset                            | Event                                       |
| ----------------------- | ------------------------------------ | ------------------------------------------- |
| 일반 버튼 탭            | click.wav                            | App-wide buttons, tabs, toggles and dialogs |
| 답 선택                 | select.wav                           | Answer choices and word chips               |
| 정답1 / 정답2           | correct.wav / correct-alt.wav        | Alternating correct answers                 |
| 오답                    | wrong.wav                            | Confirmed incorrect answer                  |
| 연속 정답 콤보1 / 콤보2 | combo.wav / combo-big.wav            | 3/5 and 7/10 consecutive correct answers    |
| 레슨 완료               | lesson-complete.wav                  | Lesson completion                           |
| 상자·보상 열림1 / 열림2 | chest-open.wav / chest-open-rare.wav | Wood and silver/gold chest opening          |
| 잠금 해제·레벨 상승     | level-up.wav                         | Score rise and passed jump/level exams      |

`uiSoundsEnabled` turns off all interface sounds without disabling learning speech.
Button/selection volume uses `keyVolume`; other effects use `sfxVolume`.
Session mute and start-muted preferences also apply. The explicit interface-sound
switch applies even to settings previews; global mute can still be bypassed for a
deliberate settings preview. Preferences are local to each app/device.

Playback is attached to confirmed events, not every animation render. Placement
tests keep their existing hidden grading behavior and do not reveal answers by sound.

Mobile controls import the React Native-compatible wrappers from
`@/components/ui/Pressables`; inline clickable text uses `PressableText`.
Explicit selection/answer sounds replace the default click for that interaction.
Use `useSoundAlert` for native alert buttons. Telegram installs its delegated
button listener once at the root, including login screens and modal portals.

Mobile playback always rewinds completed players (Android reports `isLoaded=false`
at the end). Tap and feedback requests are separate, so navigation clicks do not
cancel pending grading sounds. Recording and voice calls hold capture ownership:
UI sounds pause until release, and queued SFX cannot overwrite microphone mode.

Regression checks: `pnpm --filter mobile test:sfx`,
`pnpm --filter telegram-app test:sfx`, and `pnpm --filter telegram-app test:speech`.
