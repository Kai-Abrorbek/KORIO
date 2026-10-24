/**
 * 스토리 영상 효과 — 해독되는 글자 · 글리치 · 돌아가는 숫자 · 부서지는 조각 · 필름 결.
 * 전부 프레임만 보고 그린다 (같은 프레임이면 같은 그림 — 렌더가 몇 번 돌아도 같다).
 */
import type { CSSProperties, ReactNode } from "react";
import { Easing, interpolate } from "remotion";

export const W = 1080;
export const H = 1920;
export const FPS = 30;

/** 숫자·타이머는 좁고 단단한 Bahnschrift, 한글은 맑은 고딕 */
export const DIN = '"Bahnschrift SemiBold Condensed", "Bahnschrift", "Segoe UI", "Malgun Gothic", sans-serif';
export const HEAD = '"Bahnschrift", "Segoe UI", "Malgun Gothic", sans-serif';
export const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';

export const C = {
  night: "#09080F",
  ink: "#F5F3FF",
  dim: "#8C88A6",
  violet: "#776EE2",
  violetDeep: "#2A1F6B",
  green: "#58CC02",
  gold: "#FFC43D",
  reel: "#FF3D7F",
  grey: "#3A3846",
};

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

export function tween(frame: number, start: number, dur: number, from = 0, to = 1, easing = easeOut) {
  return interpolate(frame, [start, start + dur], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** 프레임마다 같은 값이 나오는 난수 */
export function rand(seed: number) {
  let t = (seed * 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** "0:07" */
export const clock = (frame: number) => {
  const s = Math.floor(frame / FPS);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const NOISE = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ#%&?!/<>*@$";

/**
 * 해독 — p 0..1 에 따라 왼쪽 글자부터 제자리를 찾는다. 아직 못 찾은 글자는 매 2프레임 바뀐다.
 * p 가 계속 0 이면 영영 못 읽는 글자 (A 쪽 세상).
 */
export function scramble(target: string, p: number, frame: number, seed = 1) {
  const chars = [...target];
  const solved = Math.floor(p * (chars.length + 0.999));
  const tick = Math.floor(frame / 2);
  return chars
    .map((ch, i) => {
      if (i < solved || ch === " " || ch === "\n") return ch;
      return NOISE[Math.floor(rand(seed * 977 + i * 131 + tick * 17) * NOISE.length)];
    })
    .join("");
}

/** 글리치 — 가로 띠 몇 개가 옆으로 밀리고 색이 갈라진다 (amount 0..1) */
export function Glitch({ amount, frame, children, seed = 3 }: { amount: number; frame: number; children: ReactNode; seed?: number }) {
  if (amount <= 0.001) return <>{children}</>;
  const bands = 7;
  const tick = Math.floor(frame / 2);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: bands }, (_, i) => {
        const top = (i / bands) * 100;
        const shift = (rand(seed + i * 31 + tick * 7) - 0.5) * 140 * amount;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(${top}% 0 ${100 - top - 100 / bands}% 0)`,
              transform: `translateX(${shift}px)`,
            }}
          >
            {children}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
          opacity: 0.55 * amount,
          transform: `translateX(${10 * amount}px)`,
          filter: "url(#story-red)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** 글리치가 쓰는 색 분리 필터 (한 번만 깐다) */
export function FxDefs() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <defs>
        <filter id="story-red">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <filter id="story-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence baseFrequency="0.85" numOctaves={2} seed={1} stitchTiles="stitch" type="fractalNoise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}

/** 필름 결 — 프레임마다 살짝 움직인다 */
export function Grain({ frame, opacity = 0.07 }: { frame: number; opacity?: number }) {
  const dx = Math.floor(rand(frame * 13) * 200);
  const dy = Math.floor(rand(frame * 29 + 5) * 200);
  return (
    <div style={{ position: "absolute", inset: -200, pointerEvents: "none", opacity, mixBlendMode: "overlay", transform: `translate(${-dx}px, ${-dy}px)` }}>
      <svg height={H + 400} width={W + 400}>
        <rect filter="url(#story-grain)" height="100%" width="100%" />
      </svg>
    </div>
  );
}

/** 가장자리 어둡게 */
export function Vignette({ strength = 0.75 }: { strength?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`,
      }}
    />
  );
}

/**
 * 돌아가는 숫자 — 자리마다 0~9 띠가 굴러간다. value 가 정수에 서면 딱 맞는다.
 * 큰 자리는 아래 자리가 9→0 으로 넘어갈 때만 따라 구른다 (진짜 계수기처럼).
 */
export function Odometer({ value, size, color = C.ink, digits }: { value: number; size: number; color?: string; digits: number }) {
  const lineH = size * 1.0;
  const cols = Array.from({ length: digits }, (_, i) => digits - 1 - i);
  const shown = Math.max(0, value);
  const leading = String(Math.floor(shown)).length;
  return (
    <div style={{ display: "inline-flex", fontFamily: DIN, fontSize: size, lineHeight: `${lineH}px`, color, fontVariantNumeric: "tabular-nums" }}>
      {cols.map((p) => {
        if (p >= leading && p > 0) return null;
        const below = shown % 10 ** p;
        const unit = 10 ** p;
        // 아래 자리가 마지막 한 칸을 넘어가는 동안만 이 자리가 구른다
        const carry = p === 0 ? 0 : clamp01((below - (unit - 1)) / 1);
        const pos = (Math.floor(shown / unit) % 10) + (p === 0 ? shown % 1 : carry);
        return (
          <div key={p} style={{ height: lineH, overflow: "hidden", width: size * 0.56 }}>
            <div style={{ transform: `translateY(${-pos * lineH}px)` }}>
              {Array.from({ length: 11 }, (_, d) => (
                <div key={d} style={{ height: lineH, textAlign: "center" }}>
                  {d % 10}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * 부서지는 조각 — 상자(x,y,w,h) 자리에서 작은 네모들이 바람에 날려 흩어진다 (p 0..1).
 * 원래 그림은 p>0 부터 부르는 쪽이 숨긴다.
 */
export function Disintegrate({
  p,
  box,
  color,
  cols = 16,
  rows = 6,
  seed = 7,
  wind = -1,
}: {
  p: number;
  box: { x: number; y: number; w: number; h: number };
  color: string;
  cols?: number;
  rows?: number;
  seed?: number;
  wind?: number;
}) {
  if (p <= 0 || p >= 1.2) return null;
  const cw = box.w / cols;
  const ch = box.h / rows;
  return (
    <>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        // 바람이 불어오는 쪽(오른쪽)부터 먼저 떨어진다
        const delay = ((wind < 0 ? cols - 1 - c : c) / cols) * 0.45 + rand(seed + i) * 0.15;
        const t = clamp01((p - delay) / 0.55);
        if (t >= 1) return null;
        const e = easeIn(t);
        const dx = wind * (220 + rand(seed + i * 3) * 380) * e;
        const dy = (-160 - rand(seed + i * 5) * 320) * e;
        const rot = (rand(seed + i * 7) - 0.5) * 540 * e;
        const s = 1 - 0.7 * e;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: box.x + c * cw,
              top: box.y + r * ch,
              width: cw + 0.6,
              height: ch + 0.6,
              background: color,
              opacity: 1 - t,
              transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${s})`,
              borderRadius: 3 * e,
            }}
          />
        );
      })}
    </>
  );
}

/** 글자 한 줄 — 아래에서 올라오며 흐림이 걷힌다 */
export function Rise({ p, children, style }: { p: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
        filter: p < 1 ? `blur(${(1 - p) * 14}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
