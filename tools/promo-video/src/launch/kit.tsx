/**
 * 런치 영상 부품 — 휴대폰 · 화면 사진(긴 화면을 스크롤) · 카드 떼어 내기 · 탭 표시 · 화면 넘김 · 자막.
 * 화면 사진과 카드 자리는 capture/stills-launch.sh 가 찍는다 (390px 폭 기준 좌표).
 */
import type { CSSProperties, ReactNode } from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import media from "../media.generated.json";

export const W = 1080;
export const H = 1920;
export const SCREEN_W = 560;
/** 앱 css px → 영상 px */
export const K = SCREEN_W / 390;
export const SCREEN_H = Math.round(844 * K);
const BEZEL = 12;
export const PHONE = { x: (W - SCREEN_W - BEZEL * 2) / 2, y: 560, w: SCREEN_W + BEZEL * 2, h: SCREEN_H + BEZEL * 2 };
export const SCREEN = { x: PHONE.x + BEZEL, y: PHONE.y + BEZEL };

export const COLOR = {
  ink: "#16132B",
  paper: "#F4F1EA",
  purple: "#6A55F5",
  yellow: "#FFC43D",
  coral: "#FF6B4A",
  blue: "#2F5BEA",
  green: "#12795D",
  navy: "#1D3F8F",
  indigo: "#2C2290",
  night: "#121021",
  pink: "#F4A7B4",
};
export const SANS = '"Segoe UI", Inter, "Malgun Gothic", sans-serif';
export const SERIF = 'Georgia, "Times New Roman", serif';
export const MONO = 'Consolas, "Cascadia Mono", monospace';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** start 부터 dur 프레임 동안 from → to (앞뒤는 고정) */
export function tween(frame: number, start: number, dur: number, from = 0, to = 1, easing = easeOut) {
  return interpolate(frame, [start, start + dur], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

/** 들어왔다(in) 머물다 나간다(out) — 0..1 */
export function inOut(frame: number, inAt: number, outAt: number, dur = 18) {
  return Math.min(tween(frame, inAt, dur), 1 - tween(frame, outAt, dur, 0, 1, easeInOut));
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type Box = { x: number; y: number; w: number; h: number; text: string };
type Still = { width: number; height: number; scale: number; boxes: Record<string, Box[]> };
const STILLS = media.stills as unknown as Record<string, Still>;

export function still(name: string) {
  const found = STILLS[name];
  if (!found) throw new Error(`no still ${name} — run capture/stills-launch.sh and prepare.mjs`);
  return found;
}
/** 화면 안에 보이는 카드 자리 (옆 탭에 숨은 것·작은 토글은 뺀다) */
export function boxes(name: string, key: string, minHeight = 0) {
  return still(name).boxes[key].filter((b) => b.x >= 0 && b.x < 390 && b.h >= minHeight);
}

/** 휴대폰이 둥실 떠 있는 높이 — 휴대폰과 떼어 낸 카드가 같이 쓴다 */
export const phoneFloat = (g: number) => Math.sin(g / 45) * 5;

/** 앱 좌표의 카드 → 영상 좌표 (scroll = 그 화면을 내린 css px) */
export function toVideo(b: Box, scroll: number, g: number) {
  return { x: SCREEN.x + b.x * K, y: SCREEN.y + (b.y - scroll) * K + phoneFloat(g), w: b.w * K, h: b.h * K };
}

export function Phone({ g, children, style }: { g: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        left: PHONE.x,
        top: PHONE.y + phoneFloat(g),
        width: PHONE.w,
        height: PHONE.h,
        borderRadius: 78,
        background: "#0E0D12",
        padding: BEZEL,
        boxShadow: "0 40px 110px rgba(10,6,30,0.42), inset 0 0 0 2px rgba(255,255,255,0.10)",
        ...style,
      }}
    >
      <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, borderRadius: 66, overflow: "hidden", background: "#fff" }}>
        {children}
      </div>
    </div>
  );
}

const NAV_H = 66;

/** 긴 화면 사진을 scroll 만큼 내려서 보여 준다. nav = 아래 탭바를 고정해서 덮는다 */
export function StillView({ name, scroll = 0, nav = false }: { name: string; scroll?: number; nav?: boolean }) {
  const s = still(name);
  const src = staticFile(`stills/${name}.png`);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#fff" }}>
      <Img src={src} style={{ position: "absolute", left: 0, top: -scroll * K, width: SCREEN_W }} />
      {nav ? (
        <div style={{ position: "absolute", left: 0, bottom: 0, width: SCREEN_W, height: NAV_H * K, overflow: "hidden" }}>
          <Img src={src} style={{ position: "absolute", left: 0, top: -(s.height - NAV_H) * K, width: SCREEN_W }} />
        </div>
      ) : null}
    </div>
  );
}

/** 화면 넘김 — 앞 화면은 왼쪽으로 조금 밀리며 어두워지고, 새 화면이 오른쪽(또는 아래)에서 들어온다 */
export function Push({ p, from, to, dir = "left" }: { p: number; from: ReactNode; to: ReactNode; dir?: "left" | "up" }) {
  if (p <= 0) return <>{from}</>;
  if (p >= 1) return <>{to}</>;
  const axis = dir === "left" ? "X" : "Y";
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate${axis}(${-p * 30}%)` }}>
        {from}
        <div style={{ position: "absolute", inset: 0, background: `rgba(10,8,20,${p * 0.35})` }} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate${axis}(${(1 - p) * 100}%)`,
          boxShadow: "-20px 0 60px rgba(0,0,0,0.25)",
        }}
      >
        {to}
      </div>
    </>
  );
}

/**
 * 카드 떼어 내기 — 화면 속 카드 자리(b)에서 to 로 떠오른다 (p 0..1).
 * reveal = 아래에서 위로 드러나는 정도 (막대가 자라는 느낌), 없으면 통째로
 */
export function Lift({
  name,
  b,
  scroll,
  g,
  p,
  to,
  reveal = 1,
  radius = 18,
}: {
  name: string;
  b: Box;
  scroll: number;
  g: number;
  p: number;
  to: { cx: number; cy: number; scale: number; rotate?: number };
  reveal?: number;
  radius?: number;
}) {
  if (p <= 0.001) return null;
  const from = toVideo(b, scroll, g);
  const cx = lerp(from.x + from.w / 2, to.cx, p);
  const cy = lerp(from.y + from.h / 2, to.cy, p);
  const scale = lerp(1, to.scale, p);
  const rotate = lerp(0, to.rotate ?? 0, p);
  return (
    <div
      style={{
        position: "absolute",
        left: cx - from.w / 2,
        top: cy - from.h / 2,
        width: from.w,
        height: from.h,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        borderRadius: radius * K,
        overflow: "hidden",
        background: "#fff",
        boxShadow: `0 ${34 * p}px ${90 * p}px rgba(10,6,30,${0.38 * p})`,
        clipPath: reveal < 1 ? `inset(${(1 - reveal) * 100}% 0 0 0 round ${radius * K}px)` : undefined,
      }}
    >
      <Img src={staticFile(`stills/${name}.png`)} style={{ position: "absolute", left: -b.x * K, top: -b.y * K, width: SCREEN_W }} />
    </div>
  );
}

/** 손가락 탭 — at 에 누른다 (앞 16프레임 동안 다가온다) */
export function Tap({ frame, at, x, y }: { frame: number; at: number; x: number; y: number }) {
  const t = frame - at;
  if (t < -18 || t > 24) return null;
  const come = tween(frame, at - 18, 14);
  const leave = tween(frame, at + 10, 12);
  const px = lerp(x + 150, x, come);
  const py = lerp(y + 240, y, come);
  const press = t >= 0 && t < 7 ? 0.8 : 1;
  const ripple = t >= 0 ? tween(frame, at, 18) : 0;
  return (
    <>
      {t >= 0 ? (
        <div
          style={{
            position: "absolute",
            left: x - 30 - ripple * 70,
            top: y - 30 - ripple * 70,
            width: 60 + ripple * 140,
            height: 60 + ripple * 140,
            borderRadius: "50%",
            border: "4px solid rgba(255,255,255,0.9)",
            opacity: (1 - ripple) * 0.8,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: px - 34,
          top: py - 34,
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.88)",
          border: "3px solid rgba(22,19,43,0.18)",
          boxShadow: "0 10px 30px rgba(10,6,30,0.35)",
          transform: `scale(${press})`,
          opacity: come * (1 - leave),
        }}
      />
    </>
  );
}

/**
 * 자막 — 단어가 흐릿하게 떨어지며 하나씩 선다. *별표* 안은 강조 띠.
 * at 에 들어오고 end 에 빠진다 (장면 안 프레임)
 */
export function Caption({
  frame,
  text,
  at,
  end,
  color,
  accent,
  accentInk,
  top = 170,
  size = 84,
}: {
  frame: number;
  text: string;
  at: number;
  end: number;
  color: string;
  accent: string;
  accentInk: string;
  top?: number;
  size?: number;
}) {
  const out = 1 - tween(frame, end - 10, 10, 0, 1, easeInOut);
  if (frame < at || out <= 0) return null;
  let index = 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.14,
        letterSpacing: -2,
        color,
        opacity: out,
        filter: out < 1 ? `blur(${(1 - out) * 10}px)` : undefined,
      }}
    >
      {text.split("\n").map((line, li) => (
        <div key={li}>
          {line.split(/(\*[^*]+\*)/).filter(Boolean).map((part, pi) => {
            const strong = part.startsWith("*");
            const words = (strong ? part.slice(1, -1) : part).split(/(\s+)/).filter((w) => w.length);
            const pillAt = at + index * 3;
            const pill = tween(frame, pillAt, 16);
            const rendered = words.map((word, wi) => {
              if (!word.trim()) return <span key={wi}>{word}</span>;
              const o = tween(frame, at + index++ * 3, 15);
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    opacity: o,
                    transform: `translateY(${(1 - o) * 30}px)`,
                    filter: o < 1 ? `blur(${(1 - o) * 12}px)` : undefined,
                  }}
                >
                  {word}
                </span>
              );
            });
            return strong ? (
              <span
                key={pi}
                style={{
                  display: "inline-block",
                  position: "relative",
                  color: accentInk,
                  padding: `0 ${size * 0.24}px ${size * 0.08}px`,
                  margin: `0 ${size * 0.04}px`,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: size * 0.3,
                    background: accent,
                    transform: `scaleX(${pill})`,
                    transformOrigin: "0 50%",
                  }}
                />
                <span style={{ position: "relative" }}>{rendered}</span>
              </span>
            ) : (
              <span key={pi}>{rendered}</span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
