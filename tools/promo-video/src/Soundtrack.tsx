import { Audio, interpolate, Sequence, staticFile } from "remotion";
import cues from "./cues.generated.json";
import { SHEET_AT, TAP_AT } from "./TelegramScene";
import { FPS, SECTIONS, section, TOTAL } from "./timeline";

/**
 * 소리 — 배경음악(22초 루프 둘을 겹쳐 잇기) · 튜터 목소리 · 촬영 때 앱이 낸 효과음 · 편집 효과음.
 * 튜터가 말하는 동안 음악을 줄인다.
 */
const LOOP = 22 * FPS;
const FADE = 30;
const MUSIC = 0.42;
const tutor = section("tutor");
const VOICES = [
  { file: "audio/tutor-1.mp3", at: tutor.from + 33, frames: 147 },
  { file: "audio/tutor-2.mp3", at: tutor.from + 204, frames: 87 },
];

function duck(frame: number) {
  const talking = VOICES.some((v) => frame >= v.at - 6 && frame < v.at + v.frames + 6);
  return talking ? 0.32 : 1;
}

const MUSIC_PARTS = [
  { file: "audio/music-loop-a.mp3", from: 0, dur: LOOP },
  { file: "audio/music-loop-b.mp3", from: LOOP - FADE, dur: LOOP },
  { file: "audio/music-loop-a.mp3", from: 2 * (LOOP - FADE), dur: TOTAL - 2 * (LOOP - FADE) },
];

type Cue = { ms: number; file: string; rate: number };
const CUES = cues as Record<string, Cue[]>;

/** 편집에서 더 까는 효과음 */
const telegram = section("telegram");
const cta = section("cta");
const EXTRA: { at: number; file: string; volume: number }[] = [
  { at: 2, file: "sfx/chest/burst.mp3", volume: 0.5 },
  ...[0, 4].map((at) => ({ at, file: "sfx/select.wav", volume: 0.45 })),
  { at: tutor.from - 8, file: "sfx/lesson/stamp-whoosh.mp3", volume: 0.6 },
  ...SECTIONS.filter((s) => s.clip && s.from > tutor.from).map((s) => ({ at: s.from, file: "sfx/click.mp3", volume: 0.25 })),
  { at: telegram.from + 4, file: "sfx/select.wav", volume: 0.4 },
  { at: telegram.from + 14, file: "sfx/select.wav", volume: 0.4 },
  { at: telegram.from + TAP_AT, file: "sfx/click.wav", volume: 0.6 },
  { at: telegram.from + SHEET_AT, file: "sfx/lesson/stamp-whoosh.mp3", volume: 0.5 },
  { at: cta.from - 6, file: "sfx/lesson/stamp-whoosh.mp3", volume: 0.5 },
  { at: cta.from + 2, file: "sfx/chest/burst.mp3", volume: 0.55 },
  { at: cta.from + 12, file: "sfx/lesson/sparkle.mp3", volume: 0.5 },
  ...[26, 33, 40].map((at) => ({ at: cta.from + at, file: "sfx/chest/gem-ding.mp3", volume: 0.4 })),
];

export function Soundtrack() {
  const clipCues = SECTIONS.flatMap((s) => {
    if (!s.clip || s.id === "telegram") return [];
    return (CUES[s.clip.name] ?? [])
      .map((cue) => ({ ...cue, frame: Math.round((cue.ms / 1000) * FPS) - s.clip!.trim }))
      .filter((cue) => cue.frame >= 0 && cue.frame < s.dur - 2)
      .map((cue) => ({ ...cue, at: s.from + cue.frame, key: `${s.id}-${cue.ms}-${cue.file}` }));
  });

  return (
    <>
      {MUSIC_PARTS.map((part, i) => (
        <Sequence durationInFrames={part.dur} from={part.from} key={`music-${i}`} name={`music ${i}`}>
          <Audio
            src={staticFile(part.file)}
            volume={(f) =>
              MUSIC *
              duck(part.from + f) *
              interpolate(f, [0, i === 0 ? 1 : FADE, part.dur - FADE, part.dur], [i === 0 ? 1 : 0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            }
          />
        </Sequence>
      ))}
      {VOICES.map((voice) => (
        <Sequence from={voice.at} key={voice.file} name={voice.file}>
          <Audio src={staticFile(voice.file)} volume={1} />
        </Sequence>
      ))}
      {clipCues.map((cue) => (
        <Sequence from={cue.at} key={cue.key} name={cue.file}>
          <Audio playbackRate={cue.rate} src={staticFile(cue.file)} volume={0.75} />
        </Sequence>
      ))}
      {EXTRA.map((sfx, i) => (
        <Sequence from={sfx.at} key={`extra-${i}`} name={sfx.file}>
          <Audio src={staticFile(sfx.file)} volume={sfx.volume} />
        </Sequence>
      ))}
    </>
  );
}
