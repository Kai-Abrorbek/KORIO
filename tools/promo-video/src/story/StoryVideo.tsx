/**
 * KORIO 스토리 영상 "Ayni shu N soniya" — 장면 묶음 · 화면 위 고정(시계·진행 막대·필름 결) · 소리.
 */
import type { ComponentType } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { useIconFont } from "../theme";
import { C, FxDefs, Grain, tween, Vignette, W } from "./fx";
import { BEAT, BEATS, DAY_T, DAYS_DUR, STORY, STORY_TOTAL, T, VOICE } from "./plan";
import { DaysScene, EndScene, FeedScene, FLIP_AT, GainsScene, HookScene, MeetScene, PILL_CORNER, SplitScene, TimerPill } from "./scenes";
import voiceLen from "./voice.generated.json";

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
  { at: at("split", T.split.tear + 6), color: "185,179,255", dur: 8, peak: 0.5 },
  { at: at("meet"), color: "255,255,255", dur: 14, peak: 0.95 },
  { at: at("end", FLIP_AT), color: "185,179,255", dur: 12, peak: 0.7 },
];

function Hud() {
  const f = useCurrentFrame();
  const show = tween(f, T.hook.dur - 4, 10) * (f < at("end") ? 1 : 0);
  const progress = f / STORY_TOTAL;
  return (
    <>
      {/* 릴스 진행 막대 — 이 영상이 얼마나 남았는지 */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 8, background: "rgba(255,255,255,0.12)", opacity: tween(f, T.hook.dur - 4, 10) }}>
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

const LEN = voiceLen as Record<string, number>;

/** 내레이션이 나오는 동안은 음악을 낮춘다 (앞뒤 8프레임에 걸쳐) */
function duck(frame: number) {
  let d = 0;
  for (const v of VOICE) {
    const len = LEN[v.name] ?? 60;
    d = Math.max(d, interpolate(frame, [v.at - 8, v.at, v.at + len - 6, v.at + len + 6], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  }
  return 1 - 0.58 * d;
}

const MUSIC: { file: string; from: number; dur: number; volume: number; fadeIn: number; fadeOut: number }[] = [
  { file: "audio/story-tick.mp3", from: 0, dur: at("split") + 6, volume: 0.55, fadeIn: 1, fadeOut: 24 },
  { file: "audio/story-pulse.mp3", from: at("split") - 6, dur: at("days", BEAT * 2) - at("split") + 6, volume: 0.5, fadeIn: 12, fadeOut: 14 },
  { file: "audio/story-build.mp3", from: at("days", BEAT * 2) - 8, dur: at("meet") - at("days", BEAT * 2) + 8, volume: 0.55, fadeIn: 10, fadeOut: 8 },
  { file: "audio/story-lift.mp3", from: at("meet") - 2, dur: at("gains") - at("meet") + 14, volume: 0.6, fadeIn: 20, fadeOut: 16 },
  { file: "audio/story-finale.mp3", from: at("gains"), dur: STORY_TOTAL - at("gains"), volume: 0.6, fadeIn: 14, fadeOut: 30 },
];

const SFX: { at: number; file: string; volume: number }[] = [
  ...[0, 30, 60, 90, 120].map((t) => ({ at: t, file: "sfx/story-tick-big.mp3", volume: 0.5 })),
  { at: T.hook.dur - 26, file: "sfx/story-riser.mp3", volume: 0.5 },
  { at: at("feed"), file: "sfx/story-impact.mp3", volume: 0.35 },
  ...T.feed.swipes.map((t) => ({ at: at("feed", t), file: "sfx/story-swipe.mp3", volume: 0.5 })),
  { at: at("split", T.split.tear), file: "sfx/story-glitch.mp3", volume: 0.6 },
  { at: at("split", T.split.tear + 6), file: "sfx/story-impact.mp3", volume: 0.4 },
  ...BEATS.flatMap((_, i) => [
    ...(i > 0 ? [{ at: at("days", i * BEAT - 8), file: "sfx/story-swipe.mp3", volume: 0.55 }] : []),
    { at: at("days", i * BEAT), file: "sfx/story-tick-big.mp3", volume: 0.45 },
    { at: at("days", i * BEAT + DAY_T.streak), file: "sfx/story-pop.mp3", volume: 0.35 },
    { at: at("days", i * BEAT + DAY_T.decode), file: "sfx/story-scramble.mp3", volume: 0.38 },
  ]),
  { at: at("days", DAYS_DUR - 30), file: "sfx/story-riser.mp3", volume: 0.5 },
  { at: at("meet"), file: "sfx/story-impact.mp3", volume: 0.4 },
  { at: at("meet", T.meet.bubble), file: "sfx/story-pop.mp3", volume: 0.45 },
  { at: at("meet", T.meet.replyA), file: "sfx/story-pop.mp3", volume: 0.3 },
  { at: at("meet", T.meet.replyA + 10), file: "sfx/story-glitch.mp3", volume: 0.22 },
  { at: at("meet", T.meet.replyB), file: "sfx/story-pop.mp3", volume: 0.45 },
  { at: at("meet", T.meet.crumble), file: "sfx/story-crumble.mp3", volume: 0.55 },
  { at: at("meet", T.meet.voiceD), file: "sfx/story-impact.mp3", volume: 0.4 },
  ...T.gains.chips.map((t) => ({ at: at("gains", t), file: "sfx/story-pop.mp3", volume: 0.4 })),
  { at: at("end", FLIP_AT - 24), file: "sfx/story-riser.mp3", volume: 0.42 },
  { at: at("end", FLIP_AT), file: "sfx/story-impact.mp3", volume: 0.5 },
  { at: at("end", FLIP_AT + 1), file: "sfx/lesson/sparkle.mp3", volume: 0.4 },
];

function Soundtrack() {
  return (
    <>
      {MUSIC.map((m) => (
        <Sequence durationInFrames={m.dur} from={m.from} key={m.file} name={m.file}>
          <Audio
            loop
            src={staticFile(m.file)}
            volume={(fr) =>
              m.volume *
              duck(m.from + fr) *
              interpolate(fr, [0, m.fadeIn, m.dur - m.fadeOut, m.dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            }
          />
        </Sequence>
      ))}
      {VOICE.map((v) => (
        <Sequence from={v.at} key={v.name} name={`voice ${v.name}`}>
          <Audio src={staticFile(`audio/story-v-${v.name}.mp3`)} volume={1} />
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
