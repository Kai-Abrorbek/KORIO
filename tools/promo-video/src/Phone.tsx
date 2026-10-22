import { AbsoluteFill, Freeze, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TelegramScene, SHEET_AT } from "./TelegramScene";
import { CLIP_FRAMES, SECTIONS, section, type Clip as ClipSpec } from "./timeline";

/** 촬영 화면(390×844)을 담는 휴대폰 — 화면 680×1472 */
export const SCREEN = { width: 680, height: 1472 };
const BEZEL = 16;
const TOP = 392;

const IN = section("tutor").from - 8;
const OUT = section("cta").from - 6;

function Video({ name, trim }: { name: string; trim: number }) {
  return (
    <OffthreadVideo
      muted
      src={staticFile(`clips/${name}.mp4`)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      trimBefore={trim}
    />
  );
}

/**
 * 클립 한 토막 — lead 동안 첫 화면을 멈춰 두고, 재생하고, 장면이 클립보다 길면 마지막 화면을 멈춰 둔다
 * (내레이션 때문에 장면이 촬영분보다 길어질 수 있다)
 */
export function ClipTrack({ clip, dur }: { clip: ClipSpec; dur: number }) {
  const lead = clip.lead ?? 0;
  const available = (CLIP_FRAMES[clip.name] ?? dur) - clip.trim - 1;
  const play = Math.max(1, Math.min(dur - lead, available));
  const hold = dur - lead - play;
  return (
    <>
      {lead > 0 ? (
        <Sequence durationInFrames={lead} name="hold first">
          <Freeze frame={0}>
            <Video name={clip.name} trim={clip.trim} />
          </Freeze>
        </Sequence>
      ) : null}
      <Sequence durationInFrames={play} from={lead} name="play">
        <Video name={clip.name} trim={clip.trim} />
      </Sequence>
      {hold > 0 ? (
        <Sequence durationInFrames={hold} from={lead + play} name="hold last">
          <Freeze frame={play - 1}>
            <Video name={clip.name} trim={clip.trim} />
          </Freeze>
        </Sequence>
      ) : null}
    </>
  );
}

export function Phone() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < IN || frame > OUT + 30) return null;

  const enter = spring({ frame: frame - IN, fps, config: { damping: 15, stiffness: 120, mass: 0.9 } });
  const leave = spring({ frame: frame - OUT, fps, config: { damping: 20, stiffness: 140 } });
  // 장면이 바뀔 때 살짝 "툭" — 컷이 리듬을 탄다
  const cut = SECTIONS.filter((s) => s.clip && s.from > IN + 10 && s.from <= frame).at(-1);
  const punch = cut ? interpolate(frame - cut.from, [0, 3, 12], [0.965, 1.02, 1], { extrapolateRight: "clamp" }) : 1;
  const float = Math.sin(frame / 38) * 6;

  const y = (1 - enter) * 1500 + leave * 1700 + float;
  const rotate = (1 - enter) * -8 + leave * 6;
  const scale = punch * (1 - leave * 0.12);
  const telegram = section("telegram");

  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - SCREEN.width - BEZEL * 2) / 2,
        top: TOP,
        width: SCREEN.width + BEZEL * 2,
        height: SCREEN.height + BEZEL * 2,
        padding: BEZEL,
        borderRadius: 104,
        background: "linear-gradient(145deg, #2A2A35, #0B0B10)",
        boxShadow: "0 50px 120px rgba(20,8,60,0.55), inset 0 0 0 3px rgba(255,255,255,0.12)",
        transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: "50% 40%",
      }}
    >
      <div style={{ position: "relative", width: SCREEN.width, height: SCREEN.height, borderRadius: 88, overflow: "hidden", background: "white" }}>
        {SECTIONS.filter((s) => s.clip && s.id !== "telegram").map((s) => (
          <Sequence durationInFrames={s.dur} from={s.from} key={s.id} name={`clip ${s.id}`}>
            <AbsoluteFill>
              <ClipTrack clip={s.clip!} dur={s.dur} />
            </AbsoluteFill>
          </Sequence>
        ))}
        <Sequence durationInFrames={telegram.dur + 30} from={telegram.from} name="telegram">
          <TelegramScene>
            <ClipTrack clip={telegram.clip!} dur={telegram.dur + 30 - SHEET_AT} />
          </TelegramScene>
        </Sequence>
      </div>
    </div>
  );
}
