import type { ComponentType } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import media from "../media.generated.json";
import { useIconFont } from "../theme";
import { Backdrop } from "./Backdrop";
import { LAUNCH, LAUNCH_FPS, LAUNCH_TOTAL, scene, type LaunchScene } from "./plan";
import {
  EndScene,
  HomeScene,
  HookScene,
  LangsScene,
  ModesEnScene,
  ModesKoScene,
  MosaicScene,
  PunchScene,
  SpeakingScene,
  StatsScene,
  StormScene,
  TopikScene,
  TutorScene,
} from "./scenes";

const SCENES: Record<string, ComponentType<{ s: LaunchScene & { from: number } }>> = {
  hook: HookScene,
  home: HomeScene,
  langs: LangsScene,
  "modes-ko": ModesKoScene,
  "modes-en": ModesEnScene,
  stats: StatsScene,
  tutor: TutorScene,
  speaking: SpeakingScene,
  topik: TopikScene,
  storm: StormScene,
  punch: PunchScene,
  mosaic: MosaicScene,
  end: EndScene,
};

/** KORIO 런치 영상 (우즈벡어 · 9:16) — 학습 플랫폼으로서의 KORIO */
export function LaunchVideo() {
  useIconFont();
  return (
    <AbsoluteFill style={{ background: "#F4F1EA" }}>
      <Backdrop />
      {LAUNCH.map((s) => {
        const Scene = SCENES[s.id];
        return (
          <Sequence durationInFrames={s.dur} from={s.from} key={s.id} name={s.id}>
            <Scene s={s} />
          </Sequence>
        );
      })}
      <LaunchSound />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 소리

const VOICES = media.voices as Record<string, number>;
const LOOP = 22 * LAUNCH_FPS;
const FADE = 30;
const NARRATION = LAUNCH.filter((s) => s.voice).map((s) => ({
  file: `audio/launch-${s.voice!.name}.mp3`,
  at: s.from + s.voice!.at,
  frames: Math.ceil((VOICES[`launch-${s.voice!.name}`] ?? 2) * LAUNCH_FPS),
}));
const talking = (g: number) => NARRATION.some((v) => g >= v.at - 6 && g < v.at + v.frames + 6);

const MUSIC = Array.from({ length: Math.ceil((LAUNCH_TOTAL - FADE) / (LOOP - FADE)) }, (_, i) => {
  const from = i * (LOOP - FADE);
  return { file: `audio/launch-music-${i % 2 ? "b" : "a"}.mp3`, from, dur: Math.min(LOOP, LAUNCH_TOTAL - from) };
});

const at = (id: string, frame: number) => scene(id).from + frame;
const SFX: { at: number; file: string; volume: number }[] = [
  // 장면이 바뀔 때 (배경 원이 퍼진다)
  ...LAUNCH.slice(1).map((s) => ({ at: s.from - 6, file: "sfx/lesson/stamp-whoosh.mp3", volume: 0.22 })),
  // 손가락 탭
  { at: at("langs", 36), file: "sfx/click.mp3", volume: 0.5 },
  { at: at("modes-ko", 18), file: "sfx/click.mp3", volume: 0.5 },
  { at: at("end", 112), file: "sfx/click.mp3", volume: 0.5 },
  // 카드가 떠오를 때
  ...[at("home", 26), at("langs", 66), at("modes-ko", 50), at("modes-en", 26), at("stats", 26), at("stats", 108), at("stats", 190)].map(
    (frame) => ({ at: frame, file: "sfx/select.wav", volume: 0.28 }),
  ),
  { at: at("speaking", 50), file: "sfx/lesson/stat-pop.mp3", volume: 0.45 },
  { at: at("punch", 18), file: "sfx/lesson/stamp-thump.mp3", volume: 0.35 },
  { at: at("end", 4), file: "sfx/lesson/sparkle.mp3", volume: 0.35 },
];

function LaunchSound() {
  return (
    <>
      {MUSIC.map((part, i) => (
        <Sequence durationInFrames={part.dur} from={part.from} key={`music-${i}`} name={`music ${i}`}>
          <Audio
            src={staticFile(part.file)}
            volume={(f) => {
              const g = part.from + f;
              const fade = interpolate(f, [0, i === 0 ? 1 : FADE, part.dur - FADE, part.dur], [i === 0 ? 1 : 0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const ending = interpolate(g, [LAUNCH_TOTAL - 45, LAUNCH_TOTAL], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return 0.5 * fade * ending * (talking(g) ? 0.32 : 1);
            }}
          />
        </Sequence>
      ))}
      {NARRATION.map((voice) => (
        <Sequence from={voice.at} key={voice.file} name={voice.file}>
          <Audio src={staticFile(voice.file)} volume={1} />
        </Sequence>
      ))}
      {SFX.map((sfx, i) => (
        <Sequence from={sfx.at} key={`sfx-${i}`} name={sfx.file}>
          <Audio src={staticFile(sfx.file)} volume={sfx.volume} />
        </Sequence>
      ))}
    </>
  );
}
