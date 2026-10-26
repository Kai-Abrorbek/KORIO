/**
 * "Bitta tovush" 부품 — 실사 사진 컷(흔들림 · 밀어 들어가기 · 휙 넘기기) · 필름 결 · 대사 자막 · 쾅 글자.
 * 사진은 public/ai/ep1 (1024×1536) 을 1080×1920 에 꽉 채운다. 전부 프레임만 보고 그린다.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { C, FPS, H, KO, W, easeIn, rand, tween } from "../story/fx";

export { C, FPS, H, KO, W, easeIn, rand, tween };
export const UZ = '"Segoe UI", "Malgun Gothic", sans-serif';
export const BLACK = '"Segoe UI Black", "Segoe UI", "Malgun Gothic", sans-serif';
export const PURPLE = "#6A55F5";
export const GREEN = "#3DBE4E";

/** 1024×1536 사진을 화면에 꽉 채울 때의 배율과 잘리는 왼쪽 */
const COVER = Math.max(W / 1024, H / 1536);
const CROP_X = (1024 * COVER - W) / 2;
/** 사진 속 한 점(원본 px)을 화면 좌표로 */
export const onScreen = (x: number, y: number) => ({ x: x * COVER - CROP_X, y: y * COVER });

/** 손에 든 휴대폰처럼 흔들린다 */
export function shake(frame: number, amount = 1) {
  const x = (Math.sin(frame * 0.13) * 6 + Math.sin(frame * 0.37 + 1) * 3) * amount;
  const y = (Math.cos(frame * 0.11) * 5 + Math.sin(frame * 0.29 + 2) * 2.5) * amount;
  const r = Math.sin(frame * 0.07) * 0.35 * amount;
  return `translate(${x}px, ${y}px) rotate(${r}deg)`;
}

export function Photo({ src, scale, origin, extra = "", filter }: { src: string; scale: number; origin: { x: number; y: number }; extra?: string; filter?: string }) {
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          width: 1024 * COVER,
          height: 1536 * COVER,
          left: -CROP_X,
          top: 0,
          transformOrigin: `${origin.x + CROP_X}px ${origin.y}px`,
          transform: `${extra} scale(${scale})`,
          filter,
        }}
      />
    </AbsoluteFill>
  );
}

/**
 * 사진 한 컷 — 처음 whip 프레임 동안 옆에서 휙 들어오고(흐림), 내내 흔들리며 천천히 다가가고,
 * 끝 whip 프레임 동안 반대로 휙 나간다. frame 은 컷 안의 프레임.
 */
export function Shot({ src, frame, dur, focus, from = 1.06, to = 1.15, whipIn = 0, whipOut = 0, punch = 0 }: {
  src: string; frame: number; dur: number; focus: { x: number; y: number };
  from?: number; to?: number; whipIn?: number; whipOut?: number; punch?: number;
}) {
  const enter = whipIn ? 1 - tween(frame, 0, whipIn + 2) : 0;
  const leave = whipOut ? tween(frame, dur - whipOut, whipOut, 0, 1, easeIn) : 0;
  const motion = enter * 700 - leave * 700;
  const blur = Math.max(enter, leave);
  const scale = interpolate(frame, [0, dur], [from, to], { extrapolateRight: "clamp" }) + punch;
  return (
    <Photo
      extra={`${shake(frame)} translateX(${motion}px)`}
      filter={blur > 0.02 ? `blur(${blur * 26}px)` : undefined}
      origin={onScreen(focus.x, focus.y)}
      scale={scale}
      src={src}
    />
  );
}

/** 필름 결 + 가장자리 어둡게 — 휴대폰 영상 느낌 */
export function Grain({ opacity = 0.13 }: { opacity?: number }) {
  const frame = useCurrentFrame();
  const seed = Math.floor(rand(frame) * 1000);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg height={H} style={{ opacity, mixBlendMode: "overlay" }} width={W}>
        <filter id={`g${frame}`}>
          <feTurbulence baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" type="fractalNoise" />
        </filter>
        <rect filter={`url(#g${frame})`} height={H} width={W} />
      </svg>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
    </AbsoluteFill>
  );
}

/** 대사 자막 — 한국어 크게, 우즈벡어 뜻 작게. 릴스 아래쪽 UI 에 가리지 않는 높이 */
export function Subtitle({ ko, uz, start, end, top = 1230 }: { ko: string; uz: string; start: number; end: number; top?: number }) {
  const frame = useCurrentFrame();
  if (frame < start || frame > end) return null;
  const pop = spring({ frame: frame - start, fps: FPS, config: { damping: 14, stiffness: 220 } });
  const out = tween(frame, end - 5, 5, 1, 0, easeIn);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top,
        textAlign: "center",
        opacity: Math.min(pop, out),
        transform: `translateY(${(1 - pop) * 24}px) scale(${0.92 + pop * 0.08})`,
      }}
    >
      <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 76, color: "#fff", textShadow: "0 4px 18px rgba(0,0,0,0.85), 0 0 3px #000" }}>{ko}</div>
      <div style={{ fontFamily: UZ, fontWeight: 700, fontSize: 44, color: C.gold, marginTop: 10, textShadow: "0 3px 12px rgba(0,0,0,0.9), 0 0 2px #000" }}>{uz}</div>
    </div>
  );
}

/** 쾅 하고 들어오는 띠 글자 */
export function SlamText({ children, start, end = Infinity, top = 1180, bg = C.gold, color = C.night, size = 92, tilt = -2 }: {
  children: ReactNode; start: number; end?: number; top?: number; bg?: string; color?: string; size?: number; tilt?: number;
}) {
  const frame = useCurrentFrame();
  if (frame < start || frame > end) return null;
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 11, stiffness: 260, mass: 0.7 } });
  const bar = tween(frame, start + 2, 8);
  const out = Number.isFinite(end) ? tween(frame, end - 5, 5, 1, 0, easeIn) : 1;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", opacity: out }}>
      <div style={{ position: "relative", transform: `scale(${interpolate(s, [0, 1], [1.8, 1])}) rotate(${interpolate(s, [0, 1], [tilt * 3, tilt])}deg)`, opacity: Math.min(1, s * 2) }}>
        <div style={{ position: "absolute", inset: "-10px -28px", background: bg, transformOrigin: "left center", transform: `scaleX(${bar})` }} />
        <div style={{ position: "relative", fontFamily: BLACK, fontSize: size, color, letterSpacing: -1, padding: "0 8px", whiteSpace: "nowrap" }}>{children}</div>
      </div>
    </div>
  );
}

/** 시리즈 꼬리표 — "BITTA TOVUSH · 1-QISM" */
export function SeriesTag({ start, end, style }: { start: number; end: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  if (frame < start || frame > end) return null;
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 16, stiffness: 180 } });
  const out = tween(frame, end - 8, 8, 1, 0, easeIn);
  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 120,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 24px",
        borderRadius: 999,
        background: "rgba(10,8,20,0.62)",
        border: "2px solid rgba(255,255,255,0.18)",
        fontFamily: UZ,
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: 3,
        color: "#fff",
        opacity: Math.min(s, out),
        transform: `translateX(${(1 - s) * -60}px)`,
        ...style,
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: 7, background: C.reel }} />
      BITTA TOVUSH · 1-QISM
    </div>
  );
}
