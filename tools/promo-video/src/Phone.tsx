import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TelegramScene } from "./TelegramScene";
import { SECTIONS, section } from "./timeline";

/** 촬영 화면(390×844)을 담는 휴대폰 — 화면 680×1472 */
export const SCREEN = { width: 680, height: 1472 };
const BEZEL = 16;
const TOP = 392;

const IN = section("tutor").from - 8;
const OUT = section("cta").from - 6;

function Clip({ name, trim }: { name: string; trim: number }) {
  return (
    <OffthreadVideo
      muted
      src={staticFile(`clips/${name}.mp4`)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      trimBefore={trim}
    />
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
              <Clip name={s.clip!.name} trim={s.clip!.trim} />
            </AbsoluteFill>
          </Sequence>
        ))}
        <Sequence durationInFrames={section("telegram").dur + 30} from={section("telegram").from} name="telegram">
          <TelegramScene>
            <Clip name={section("telegram").clip!.name} trim={section("telegram").clip!.trim} />
          </TelegramScene>
        </Sequence>
      </div>
    </div>
  );
}
