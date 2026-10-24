/**
 * KORIO 스토리 영상 "Ayni shu 57 soniya" — 장면 묶음 · 화면 위 고정(시계·진행 막대·필름 결) · 소리.
 */
import type { ComponentType } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { useIconFont } from "../theme";
import { C, FxDefs, Grain, tween, Vignette, W } from "./fx";
import { BEAT, BEATS, STORY, STORY_TOTAL } from "./plan";
import { DaysScene, EndScene, FeedScene, FLIP_AT, GainsScene, HookScene, MeetScene, PILL_CORNER, SplitScene, TimerPill } from "./scenes";

const SCENES: { id: keyof typeof STORY; Comp: ComponentType }[] = [
  { id: "hook", Comp: HookScene },
  { id: "feed", Comp: FeedScene },
  { id: "split", Comp: SplitScene },
  { id: "days", Comp: DaysScene },
  { id: "meet", Comp: MeetScene },
  { id: "gains", Comp: GainsScene },
  { id: "end", Comp: EndScene },
];

const at = (id: keyof typeof STORY, local = 0) => STORY[id].from + local;

/** 장면이 바뀌는 순간의 번쩍임 (카메라가 화면 속으로 뚫고 들어간 자리) */
const FLASHES = [
  { at: at("feed"), color: "255,255,255", dur: 10, peak: 0.85 },
  { at: at("split", 20), color: "185,179,255", dur: 8, peak: 0.5 },
  { at: at("meet"), color: "255,255,255", dur: 14, peak: 0.95 },
  { at: at("end", FLIP_AT), color: "185,179,255", dur: 12, peak: 0.7 },
];

function Hud() {
  const f = useCurrentFrame();
  const show = tween(f, 116, 10) * (f < at("end") ? 1 : 0);
  const progress = f / STORY_TOTAL;
  return (
    <>
      {/* 릴스 진행 막대 — 이 영상이 얼마나 남았는지 */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 8, background: "rgba(255,255,255,0.12)", opacity: tween(f, 116, 10) }}>
        <div style={{ width: `${progress * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.violet}, #B9B3FF)` }} />
      </div>
      {show > 0 ? (
        <div style={{ position: "absolute", inset: 0, opacity: show }}>
          <TimerPill frame={f} scale={PILL_CORNER.scale * (0.6 + 0.4 * show)} x={PILL_CORNER.x} y={PILL_CORNER.y} />
        </div>
      ) : null}
      {FLASHES.map((fl) => {
        const o = interpolate(f, [fl.at - 2, fl.at, fl.at + fl.dur], [0, fl.peak, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return o > 0 ? <div key={fl.at} style={{ position: "absolute", inset: 0, background: `rgba(${fl.color},${o})` }} /> : null;
      })}
    </>
  );
}

export function StoryVideo() {
  useIconFont();
  return (
    <AbsoluteFill style={{ background: C.night, overflow: "hidden" }}>
      <FxDefs />
      {SCENES.map(({ id, Comp }) => (
        <Sequence durationInFrames={STORY[id].dur} from={STORY[id].from} key={id} name={id}>
          <Comp />
        </Sequence>
      ))}
      <Hud />
      <GrainLayer />
      <Vignette strength={0.55} />
      <Soundtrack />
    </AbsoluteFill>
  );
}

function GrainLayer() {
  const f = useCurrentFrame();
  return <Grain frame={f} opacity={0.08} />;
}

// ───────────────────────────── 소리

const MUSIC: { file: string; from: number; dur: number; volume: number; fadeIn: number; fadeOut: number }[] = [
  { file: "audio/story-tick.mp3", from: 0, dur: at("split") + 6, volume: 0.55, fadeIn: 1, fadeOut: 24 },
  { file: "audio/story-pulse.mp3", from: at("split") - 6, dur: at("days", BEAT * 2) - at("split") + 6, volume: 0.5, fadeIn: 12, fadeOut: 14 },
  { file: "audio/story-build.mp3", from: at("days", BEAT * 2) - 8, dur: at("meet") - at("days", BEAT * 2) + 8, volume: 0.55, fadeIn: 10, fadeOut: 8 },
  { file: "audio/story-lift.mp3", from: at("meet") - 2, dur: STORY_TOTAL - at("meet") + 2, volume: 0.6, fadeIn: 20, fadeOut: 30 },
];

const SFX: { at: number; file: string; volume: number }[] = [
  ...[0, 30, 60, 90].map((t) => ({ at: t, file: "sfx/story-tick-big.mp3", volume: 0.55 })),
  { at: 96, file: "sfx/story-riser.mp3", volume: 0.5 },
  { at: at("feed"), file: "sfx/story-impact.mp3", volume: 0.35 },
  ...[12, 36, 60].map((t) => ({ at: at("feed", t), file: "sfx/story-swipe.mp3", volume: 0.5 })),
  { at: at("feed", 182), file: "sfx/story-pop.mp3", volume: 0.3 },
  { at: at("split", 14), file: "sfx/story-glitch.mp3", volume: 0.6 },
  { at: at("split", 20), file: "sfx/story-impact.mp3", volume: 0.4 },
  ...BEATS.flatMap((_, i) => [
    ...(i > 0 ? [{ at: at("days", i * BEAT - 8), file: "sfx/story-swipe.mp3", volume: 0.55 }] : []),
    { at: at("days", i * BEAT), file: "sfx/story-tick-big.mp3", volume: 0.45 },
    { at: at("days", i * BEAT + 8), file: "sfx/story-pop.mp3", volume: 0.35 },
    { at: at("days", i * BEAT + 40), file: "sfx/story-scramble.mp3", volume: 0.42 },
  ]),
  { at: at("days", 600), file: "sfx/story-riser.mp3", volume: 0.5 },
  { at: at("meet"), file: "sfx/story-impact.mp3", volume: 0.4 },
  { at: at("meet", 46), file: "sfx/story-pop.mp3", volume: 0.45 },
  { at: at("meet", 94), file: "sfx/story-pop.mp3", volume: 0.3 },
  { at: at("meet", 104), file: "sfx/story-glitch.mp3", volume: 0.25 },
  { at: at("meet", 122), file: "sfx/story-pop.mp3", volume: 0.45 },
  { at: at("meet", 126), file: "sfx/story-scramble.mp3", volume: 0.45 },
  { at: at("meet", 150), file: "sfx/story-crumble.mp3", volume: 0.55 },
  { at: at("meet", 240), file: "sfx/story-impact.mp3", volume: 0.45 },
  ...[30, 52, 74, 96].map((t) => ({ at: at("gains", t), file: "sfx/story-pop.mp3", volume: 0.42 })),
  { at: at("end", 2), file: "sfx/story-riser.mp3", volume: 0.45 },
  { at: at("end", FLIP_AT), file: "sfx/story-impact.mp3", volume: 0.5 },
  { at: at("end", FLIP_AT + 1), file: "sfx/lesson/sparkle.mp3", volume: 0.4 },
];

function Soundtrack() {
  return (
    <>
      {MUSIC.map((m) => (
        <Sequence durationInFrames={m.dur} from={m.from} key={m.file} name={m.file}>
          <Audio
            src={staticFile(m.file)}
            volume={(fr) =>
              m.volume *
              interpolate(fr, [0, m.fadeIn, m.dur - m.fadeOut, m.dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            }
          />
        </Sequence>
      ))}
      {SFX.map((s, i) => (
        <Sequence from={s.at} key={`sfx-${i}`} name={s.file}>
          <Audio src={staticFile(s.file)} volume={s.volume} />
        </Sequence>
      ))}
    </>
  );
}
