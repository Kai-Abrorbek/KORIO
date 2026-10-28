/**
 * 사용법 시리즈의 편 공통 부품 — 녹화 이어 붙이기 · 포스트잇 쾅 · 형광펜 자막 · 터치 물결 · 마커 동그라미.
 * 편 파일(예: LugatGuide.tsx)은 장면 순서와 좌표만 적는다.
 *
 * 녹화는 장면마다 [재생 a..b] · [정지 화면 f 를 n프레임] 을 이어 붙이고, 내레이션이 더 길면 마지막 화면을 더 멈춘다.
 * 좌표는 녹화 원본(780×1688) 기준 — 화면 px 로 바꿀 때 K 를 곱한다.
 */
import type { ReactNode } from "react";
import { Easing, Freeze, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { HighlightCaption, MarkerCircle, SCREEN_W } from "./kit";

export const FPS = 30;
export const K = SCREEN_W / 780;
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const ramp = (frame: number, at: number, dur: number) => clamp01((frame - at) / dur);
export const pop = (frame: number, at: number, stiffness = 220, damping = 12) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
export const ease = Easing.bezier(0.65, 0, 0.35, 1);

export type Op = { src: string; play?: [number, number]; hold?: [number, number] };
export type Seg = { ops: Op[]; starts: number[]; len: number; from: number };

/** 장면 하나 — minLen(내레이션 + 여유) 보다 녹화가 짧으면 마지막 화면을 멈춘다 */
export function segment(ops: Op[], from: number, minLen: number): Seg {
  const starts: number[] = [];
  let t = 0;
  for (const op of ops) {
    starts.push(t);
    t += op.play ? op.play[1] - op.play[0] : op.hold![1];
  }
  return { ops, starts, len: Math.max(t, minLen), from };
}

export function clipAt(seg: Seg, local: number): { src: string; frame: number } {
  for (let i = seg.ops.length - 1; i >= 0; i--) {
    if (local >= seg.starts[i] || i === 0) {
      const op = seg.ops[i];
      const d = local - seg.starts[i];
      if (op.play) return { src: op.src, frame: Math.min(op.play[0] + Math.max(0, d), op.play[1] - 1) };
      return { src: op.src, frame: op.hold![0] };
    }
  }
  return { src: seg.ops[0].src, frame: 0 };
}

/** 장면의 opIndex 번째 재생 구간에서 녹화 프레임 clipFrame 이 나오는 영상 프레임 */
export const when = (seg: Seg, opIndex: number, clipFrame = -1) =>
  seg.from + seg.starts[opIndex] + (clipFrame >= 0 && seg.ops[opIndex].play ? clipFrame - seg.ops[opIndex].play![0] : 0);

/** 지금 프레임이 속한 장면의 녹화 화면 */
export function Recording({ segs }: { segs: Seg[] }) {
  const frame = useCurrentFrame();
  const seg = [...segs].reverse().find((s) => frame >= s.from) ?? segs[0];
  const { src, frame: clipFrame } = clipAt(seg, frame - seg.from);
  return (
    <Freeze frame={clipFrame}>
      <OffthreadVideo muted src={staticFile(`clips/${src}.mp4`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    </Freeze>
  );
}

/** 크게 떨어져 쾅 붙는다 · out 에 위로 날아간다 */
export function Slap({ at, out, children, from = 1.5, rot = 0 }: { at: number; out?: number; children: ReactNode; from?: number; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 8)) return null;
  const s = pop(frame, at, 320, 14);
  const leave = out !== undefined ? ramp(frame, out, 8) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${(1 - s) * rot}deg) translateY(${leave * -1400}px)`, opacity: Math.min(1, s * 3), transformOrigin: "50% 50%" }}>
      {children}
    </div>
  );
}

export function Caption({ text, at, out, y = 1450 }: { text: string; at: number; out: number; y?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out) return null;
  const reveal = interpolate(frame, [at, at + 10], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const fade = ramp(frame, out - 6, 6);
  return (
    <div style={{ opacity: 1 - fade, transform: `translateY(${(1 - pop(frame, at, 260, 16)) * 30}px)` }}>
      <HighlightCaption reveal={reveal} size={56} y={y}>
        {text}
      </HighlightCaption>
    </div>
  );
}

/** 터치 물결 — 녹화 좌표 */
export function Tap({ at, x, y }: { at: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  const t = (frame - at) / 18;
  if (t < 0 || t > 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x * K - 60,
        top: y * K - 60,
        width: 120,
        height: 120,
        borderRadius: 60,
        border: `6px solid rgba(106,85,245,${1 - t})`,
        background: `rgba(106,85,245,${0.28 * (1 - t)})`,
        transform: `scale(${0.4 + t})`,
      }}
    />
  );
}

/** 마커 동그라미 — 녹화 좌표 · 크기(rx, ry 는 녹화 px). at 부터 9프레임에 걸쳐 그려지고 out 에 사라진다 */
export function Ring({ at, out, x, y, rx, ry, seed = 1 }: { at: number; out: number; x: number; y: number; rx: number; ry: number; seed?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out) return null;
  return <MarkerCircle cx={x * K} cy={y * K} draw={interpolate(frame, [at, at + 9], [0, 1], { extrapolateRight: "clamp", easing: ease })} rx={rx * K} ry={ry * K} seed={seed} />;
}
