/**
 * "Xat" — 한국에서 4년 10개월 일한 아빠가 아는 한국어는 세 마디. 식당 아주머니의 편지를 3년 뒤 딸이 읽어 준다 (약 86초)
 *
 * 8블록 (reels 규칙): Hook(4 yil 10 oy | 3 ta soʻz) → Lead(질문, 10초) → Body1 공장 → Open loop("1년 동안 한마디도") → Body2 편지
 *   → Open loop("읽어 준 사람은 나") → Body3 KORIO 로 배워 편지를 읽음 → CTA(어떤 말은 몇 년을 기다린다 + 앱 + 보내기)
 * 화면 문법(이 편 것): 사용자가 ChatGPT 로 그린 수채화풍 그림 19장(public/ai/xat/x01–x19.webp)에 천천히 다가가는 카메라,
 *   굵은 산세리프(Segoe UI Black) 큰 글자가 쾅 들어오고, 장면마다 움직이는 그래픽(숫자 카운터 · 시계 링 · 배터리 · 말풍선 ·
 *   물음표 · +guruch · 눈 · 먼지 · 날아오르는 한글 · 빛 번짐 · 섬광)을 얹는다. 편지는 궁서체 손글씨, 자막은 반투명 띠 위에.
 * 소리: audio/make-lines.mjs 가 만든 대사(xat.words.json) · ElevenLabs 음악 4토막(m1–m4) · 현장음.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, random, spring, staticFile, useCurrentFrame } from "remotion";
import timing from "./xat.words.json";

const FPS = 30;
const HEAVY = '"Segoe UI Black", "Segoe UI", "Malgun Gothic", sans-serif';
const BOLD = '"Segoe UI", "Malgun Gothic", sans-serif';
const BRUSH = '"Gungsuh", "궁서", "Batang", "Malgun Gothic", serif';
const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const YELLOW = "#FFD23F";
const WARM = "#FFB547";
const RED = "#FF5A4E";
const INK = "#1E1712";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.45, 0, 0.25, 1);
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}ʻʼ']/gu, "");
const img = (n: string) => staticFile(`ai/xat/${n}.webp`);
const pop = (frame: number, at: number, stiffness = 260, damping = 13) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
/** 큰 글자 테두리 — 그림 위에서도 또렷하게 */
const OUTLINE = "0 0 3px rgba(0,0,0,0.9), 0 4px 0 rgba(0,0,0,0.55), 0 8px 26px rgba(0,0,0,0.7)";

// ── 타임라인 ──
type Key = keyof typeof timing.lines;
const ORDER: { key: string; gap: number; pause?: number }[] = [
  { key: "n01", gap: 4 },
  { key: "n02", gap: 6 },
  { key: "d01", gap: 8 },
  { key: "d02", gap: 8 },
  { key: "d03", gap: 8 },
  { key: "n03", gap: 12 }, // 질문 — 10초 안에
  { key: "n04", gap: 18 }, // Body 1 공장
  { key: "f01", gap: 10 },
  { key: "d04", gap: 6 },
  { key: "n05", gap: 8 },
  { key: "n06", gap: 16 }, // 식당 아주머니
  { key: "n07", gap: 12 }, // Open loop 1
  { key: "n08", gap: 20 }, // Body 2 편지
  { key: "n09", gap: 10 },
  { key: "d05", gap: 6 },
  { key: "n10", gap: 14 },
  { key: "n11", gap: 14 }, // Open loop 2
  { key: "n12", gap: 18 }, // Body 3 딸
  { key: "n13", gap: 12 },
  { key: "r01", gap: 18 }, // 편지 읽기
  { key: "n14", gap: 14 },
  { key: "n15", gap: 14 },
  { key: "hug", gap: 4, pause: 54 }, // 말 없이 음악만
  { key: "n16", gap: 6 }, // CTA
  { key: "n17", gap: 26 },
  { key: "end", gap: 0, pause: 66 },
];
const T: Record<string, { at: number; len: number }> = {};
{
  let cursor = 0;
  for (const step of ORDER) {
    const at = cursor + step.gap;
    const len = step.pause ?? Math.round(timing.lines[step.key as Key].len * FPS);
    T[step.key] = { at, len };
    cursor = at + len;
  }
}
export const XAT_TOTAL = T.end.at + T.end.len;
const end = (k: string) => T[k].at + T[k].len;
const LINE_KEYS = ORDER.map((s) => s.key).filter((k) => k in timing.lines) as Key[];

function word(key: Key, text: string) {
  const w = (timing.lines[key] as { words?: { w: string; s: number }[] }).words?.find((x) => norm(x.w) === norm(text));
  if (!w) throw new Error(`${key}: no word "${text}"`);
  return T[key].at + Math.round(w.s * FPS);
}

// ── 장면(그림) 순서 ──
type Shot = { src: string; at: number; zoom?: [number, number]; pan?: [number, number]; keyed?: boolean };
const SHOTS: Shot[] = [
  { src: "hook", at: 0 },
  { src: "x01", at: T.n04.at - 6, zoom: [1.12, 1.02], pan: [0, -20] },
  { src: "x04", at: word("n04", "Kechasi"), zoom: [1.0, 1.08], pan: [-20, 0] },
  { src: "x03", at: T.f01.at - 8, zoom: [1.02, 1.12], pan: [30, 0] },
  { src: "x05", at: T.n06.at - 8, zoom: [1.04, 1.12], pan: [0, 20] },
  { src: "x07", at: word("n06", "Har"), zoom: [1.0, 1.1], pan: [0, -30] },
  { src: "x06", at: T.n07.at - 6, zoom: [1.1, 1.02], pan: [20, 0] },
  { src: "x08", at: T.n08.at - 10, zoom: [1.0, 1.1], pan: [-20, 10] },
  { src: "x09", at: word("n08", "Va"), zoom: [1.04, 1.14], pan: [0, 0] },
  { src: "x10", at: T.n09.at - 6, zoom: [1.12, 1.0], pan: [0, 0] },
  { src: "x11", at: T.n10.at - 8, zoom: [1.0, 1.08], pan: [10, 0] },
  { src: "x12", at: word("n10", "uch"), zoom: [1.0, 1.16], pan: [0, 20] },
  { src: "x13", at: T.n12.at - 10, zoom: [1.02, 1.1], pan: [-10, 0], keyed: true },
  { src: "x14", at: word("n12", "har"), zoom: [1.0, 1.08], pan: [0, 0] },
  { src: "x15", at: T.n13.at - 8, zoom: [1.0, 1.1], pan: [0, 10] },
  { src: "x16", at: T.r01.at - 12, zoom: [1.02, 1.12], pan: [-10, 0] },
  { src: "x17", at: T.n14.at - 8, zoom: [1.0, 1.14], pan: [0, 0] },
  { src: "x18", at: T.hug.at - 4, zoom: [1.0, 1.08], pan: [0, 0] },
  { src: "x19", at: T.n16.at - 10, zoom: [1.0, 1.08], pan: [0, -20] },
  { src: "endcard", at: T.n17.at - 14 },
];

function Still({ shot, next }: { shot: Shot; next: number }) {
  const frame = useCurrentFrame();
  if (frame < shot.at - 1 || frame >= next + 10) return null;
  const t = clamp01((frame - shot.at) / Math.max(1, next + 10 - shot.at));
  const [z0, z1] = shot.zoom ?? [1, 1.08];
  const [px, py] = shot.pan ?? [0, 0];
  const z = interpolate(ease(t), [0, 1], [z0, z1]);
  // 들어올 때 살짝 더 크게서 내려앉는다 (밀어 들어오는 전환)
  const settle = shot.at === 0 ? 0 : 1 - pop(frame, shot.at, 180, 18);
  const fadeIn = shot.at === 0 ? 1 : clamp01((frame - shot.at) / 10);
  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <AbsoluteFill style={{ transform: `scale(${z + settle * 0.08}) translate(${px * t}px, ${py * t}px)` }}>
        {shot.keyed ? <PhoneScreen from={shot.at} /> : null}
        {/* 절대 위치여야 휴대폰 녹화(절대 위치) 위에 그려진다 */}
        <Img src={shot.keyed ? staticFile("ai/xat/x13-keyed.png") : img(shot.src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/** 버스 장면 휴대폰의 초록 화면 자리에 실제 앱 녹화를 깐다 (그림은 초록을 뚫어 위에 덮는다) */
function PhoneScreen({ from }: { from: number }) {
  // public/ai/xat/x13.webp 의 초록 화면에 맞춘 회전 사각형 (1080×1920 좌표, 중심 · 크기 · 각도)
  const cx = 879.8;
  const cy = 1000.8;
  const w = 133 * 1.12;
  const h = 378 * 1.06;
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, transform: "rotate(26deg)", overflow: "hidden", background: "#fff" }}>
      <Sequence from={from} layout="none">
        <OffthreadVideo muted src={staticFile("clips/hangul.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} />
      </Sequence>
    </div>
  );
}

function Vignette() {
  return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(10,6,4,0.55) 100%)", pointerEvents: "none" }} />;
}

// ── 모션 그래픽 부품 ──
/** 크게 쾅 — 1.7배에서 내려앉고, out 에 작아지며 사라진다 */
function Slam({ at, out, children, style, from = 1.7, rot = -2 }: { at: number; out?: number; children: ReactNode; style?: CSSProperties; from?: number; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 8)) return null;
  const s = pop(frame, at, 320, 14);
  const o = out !== undefined ? clamp01((frame - out) / 8) : 0;
  return (
    <div style={{ position: "absolute", ...style, transform: `${style?.transform ?? ""} scale(${interpolate(s, [0, 1], [from, 1]) * (1 - o * 0.3)}) rotate(${rot * s}deg)`, opacity: clamp01(s * 3) * (1 - o) }}>
      {children}
    </div>
  );
}

/** 숫자가 굴러 올라간다 */
function CountUp({ at, dur, from, to, suffix = "", pad = true }: { at: number; dur: number; from: number; to: number; suffix?: string; pad?: boolean }) {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [at, at + dur], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const txt = pad ? v.toLocaleString("en-US").replace(/,/g, " ") : String(v);
  return (
    <span>
      {txt}
      {suffix}
    </span>
  );
}

/** 시계 링 — 바늘이 빠르게 돌고 테가 채워진다 */
function ClockRing({ at, dur, size = 150, color = YELLOW }: { at: number; dur: number; size?: number; color?: string }) {
  const frame = useCurrentFrame();
  const p = clamp01((frame - at) / dur);
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const hand = p * 360 * 12;
  return (
    <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
      <circle cx={size / 2} cy={size / 2} fill="rgba(0,0,0,0.45)" r={r} stroke="rgba(255,255,255,0.35)" strokeWidth={10} />
      <circle cx={size / 2} cy={size / 2} fill="none" r={r} stroke={color} strokeDasharray={c} strokeDashoffset={c * (1 - p)} strokeLinecap="round" strokeWidth={10} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <line stroke="#fff" strokeLinecap="round" strokeWidth={8} x1={size / 2} x2={size / 2} y1={size / 2} y2={size / 2 - r * 0.62} transform={`rotate(${hand} ${size / 2} ${size / 2})`} />
      <line stroke="#fff" strokeLinecap="round" strokeWidth={8} x1={size / 2} x2={size / 2 + r * 0.42} y1={size / 2} y2={size / 2} transform={`rotate(${hand / 12} ${size / 2} ${size / 2})`} />
      <circle cx={size / 2} cy={size / 2} fill="#fff" r={8} />
    </svg>
  );
}

/** 배터리 — 칸이 줄어들며 빨갛게 */
function Battery({ at, dur }: { at: number; dur: number }) {
  const frame = useCurrentFrame();
  const p = clamp01((frame - at) / dur);
  const level = interpolate(p, [0, 1], [0.95, 0.06]);
  const color = level < 0.25 ? RED : level < 0.5 ? WARM : "#7CE07C";
  const blink = level < 0.15 && Math.floor(frame / 6) % 2 === 0 ? 0.35 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: 170, height: 84, border: "8px solid #fff", borderRadius: 18, padding: 7, background: "rgba(0,0,0,0.45)" }}>
        <div style={{ width: `${level * 100}%`, height: "100%", background: color, borderRadius: 7, opacity: blink }} />
      </div>
      <div style={{ width: 14, height: 34, background: "#fff", borderRadius: "0 6px 6px 0" }} />
    </div>
  );
}

/** 말풍선 — 톡 튀어나오고 흔들린다 (꼬리 방향) */
function Bubble({ at, out, x, y, children, sub, tail = "left", shake = false, bg = "#fff", color = INK, size = 52 }: { at: number; out: number; x: number; y: number; children: ReactNode; sub?: string; tail?: "left" | "right"; shake?: boolean; bg?: string; color?: string; size?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out + 8) return null;
  const s = pop(frame, at, 380, 12);
  const o = clamp01((frame - out) / 8);
  const jitter = shake ? Math.sin(frame * 2.2) * 4 * Math.exp(-(frame - at) / 14) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(${jitter}px, 0) scale(${s * (1 - o * 0.4)})`, transformOrigin: tail === "left" ? "10% 100%" : "90% 100%", opacity: 1 - o }}>
      <div style={{ position: "relative", background: bg, color, borderRadius: 34, padding: "18px 30px", fontFamily: KO, fontWeight: 800, fontSize: size, whiteSpace: "nowrap", boxShadow: "0 12px 30px rgba(0,0,0,0.4)" }}>
        {children}
        {sub ? <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: size * 0.62, color: "#8A5A1E", marginTop: 4 }}>{sub}</div> : null}
        <div style={{ position: "absolute", bottom: -22, [tail === "left" ? "left" : "right"]: 40, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `26px solid ${bg}` } as CSSProperties} />
      </div>
    </div>
  );
}

/** 머리 위로 물음표 세 개 */
function Huh({ at, out, x, y }: { at: number; out: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out) return null;
  return (
    <>
      {[0, 1, 2].map((i) => {
        const s = pop(frame, at + i * 5, 400, 10);
        const bob = Math.sin((frame - at) / 5 + i) * 8;
        return (
          <div key={i} style={{ position: "absolute", left: x + i * 70 - 70, top: y - (i === 1 ? 40 : 0) + bob, fontFamily: HEAVY, fontSize: 110, color: YELLOW, textShadow: OUTLINE, transform: `scale(${s}) rotate(${(i - 1) * 14}deg)` }}>
            ?
          </div>
        );
      })}
    </>
  );
}

/** 아래에서 위로 떠오르는 작은 표시 (+guruch, ♥) */
function Float({ at, x, y, children, dur = 40 }: { at: number; x: number; y: number; children: ReactNode; dur?: number }) {
  const frame = useCurrentFrame();
  const t = (frame - at) / dur;
  if (t < 0 || t > 1) return null;
  const s = pop(frame, at, 360, 12);
  return <div style={{ position: "absolute", left: x, top: y - t * 160, opacity: t > 0.7 ? (1 - t) / 0.3 : 1, transform: `scale(${s})` }}>{children}</div>;
}

/** 눈 내리는 앞쪽 레이어 */
function Snow({ from, to }: { from: number; to: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const fade = Math.min(clamp01((frame - from) / 15), clamp01((to - frame) / 15));
  return (
    <AbsoluteFill style={{ opacity: fade, pointerEvents: "none" }}>
      {Array.from({ length: 70 }, (_, i) => {
        const size = 4 + random(`s${i}`) * 10;
        const speed = 1.2 + random(`v${i}`) * 2.4;
        const x = (random(`x${i}`) * 1180 + Math.sin((frame + i * 13) / 30) * 30) % 1180 - 50;
        const y = ((random(`y${i}`) * 2000 + frame * speed * 2) % 2000) - 40;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: "rgba(255,255,255,0.85)", filter: size > 10 ? "blur(1.5px)" : undefined }} />;
      })}
    </AbsoluteFill>
  );
}

/** 빛줄기 속 먼지 */
function Dust({ from, to }: { from: number; to: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const fade = Math.min(clamp01((frame - from) / 15), clamp01((to - frame) / 15));
  return (
    <AbsoluteFill style={{ opacity: fade, pointerEvents: "none" }}>
      {Array.from({ length: 45 }, (_, i) => {
        const x = random(`dx${i}`) * 1080 + Math.sin((frame + i * 20) / 40) * 40;
        const y = random(`dy${i}`) * 1500 + 200 - ((frame * (0.3 + random(`dv${i}`) * 0.6)) % 300);
        const a = 0.25 + 0.5 * Math.abs(Math.sin((frame + i * 9) / 25));
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 5, height: 5, borderRadius: "50%", background: `rgba(255,225,170,${a})`, boxShadow: "0 0 8px rgba(255,210,140,0.8)" }} />;
      })}
    </AbsoluteFill>
  );
}

/** 따뜻한 빛 번짐 — 감정 장면 */
function Leak({ from, to }: { from: number; to: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const t = (frame - from) / (to - from);
  const a = Math.sin(t * Math.PI) * 0.55;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(circle at ${20 + t * 60}% ${30 + Math.sin(t * 3) * 10}%, rgba(255,170,80,${a}) 0%, rgba(255,120,60,${a * 0.4}) 30%, transparent 60%)` }} />
  );
}

/** 하얀 섬광 — 장면이 바뀌는 큰 순간 */
function Flash({ at }: { at: number }) {
  const frame = useCurrentFrame();
  const t = (frame - at) / 10;
  if (t < 0 || t > 1) return null;
  return <AbsoluteFill style={{ background: `rgba(255,248,235,${(1 - t) * 0.7})`, pointerEvents: "none" }} />;
}

/** 휴대폰에서 한글이 날아오른다 */
function HangulFloat({ from, to, x, y }: { from: number; to: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const letters = ["ㄱ", "ㄴ", "아", "ㄷ", "들", "ㅁ", "가", "ㅎ"];
  return (
    <>
      {letters.map((l, i) => {
        const start = from + i * 9;
        const t = (frame - start) / 50;
        if (t < 0 || t > 1) return null;
        const dx = (random(`hx${i}`) - 0.5) * 260;
        return (
          <div key={i} style={{ position: "absolute", left: x + dx * t, top: y - t * 420, fontFamily: KO, fontWeight: 900, fontSize: 64 + random(`hs${i}`) * 30, color: i % 2 ? YELLOW : "#fff", textShadow: OUTLINE, opacity: t > 0.75 ? (1 - t) / 0.25 : Math.min(1, t * 5), transform: `rotate(${(random(`hr${i}`) - 0.5) * 30}deg)` }}>
            {l}
          </div>
        );
      })}
    </>
  );
}

/** 형광펜이 쓱 지나간다 */
function Sweep({ at, children, color = YELLOW, ink = INK }: { at: number; children: ReactNode; color?: string; ink?: string }) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 14px", color: p > 0.5 ? ink : "inherit", textShadow: p > 0.5 ? "none" : undefined }}>
      <span style={{ position: "absolute", left: 0, top: "8%", bottom: "4%", width: `${p * 100}%`, background: color, borderRadius: 12, zIndex: -1, transform: "rotate(-1.5deg)" }} />
      {children}
    </span>
  );
}

function Written({ text, at, speed = 3, style }: { text: string; at: number; speed?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const chars = Array.from(text);
  const n = Math.min(chars.length, Math.floor((frame - at) / speed) + 1);
  return (
    <span style={style}>
      {chars.map((c, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0 }}>
          {c}
        </span>
      ))}
    </span>
  );
}

const big = (size: number, color = "#fff"): CSSProperties => ({ fontFamily: HEAVY, fontSize: size, lineHeight: 1, color, textShadow: OUTLINE, letterSpacing: -2 });
const label = (size = 38): CSSProperties => ({ fontFamily: HEAVY, fontSize: size, letterSpacing: 5, color: "#fff", textShadow: OUTLINE, opacity: 0.95 });

// ── Hook: 화면 반 갈라 ──
function Hook() {
  const frame = useCurrentFrame();
  if (frame >= T.n04.at + 6) return null;
  const q = T.n03.at;
  const dim = interpolate(frame, [q - 4, q + 8], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const push = interpolate(frame, [0, q + 30], [1.08, 1.0], { extrapolateRight: "clamp" });
  const three = word("n02", "uchta") - 4;
  const words = [
    { k: "d01", t: "네" },
    { k: "d02", t: "감사합니다" },
    { k: "d03", t: "죄송합니다" },
  ];
  const qWords = ["Nega", "dadam", "5", "yilda"];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: 1920, overflow: "hidden" }}>
        <Img src={img("x01")} style={{ position: "absolute", left: -270, top: 0, width: 1080, height: 1920, objectFit: "cover", transform: `scale(${push})` }} />
      </div>
      <div style={{ position: "absolute", left: 540, top: 0, width: 540, height: 1920, overflow: "hidden" }}>
        <Img src={img("x02")} style={{ position: "absolute", left: -270, top: 0, width: 1080, height: 1920, objectFit: "cover", transform: `scale(${push})` }} />
        <div style={{ position: "absolute", left: 120, top: 940, width: 300, display: "flex", flexDirection: "column", gap: 26, transform: "rotate(-3deg)" }}>
          {words.map((w) => (
            <Written at={T[w.k].at - 2} key={w.k} speed={4} style={{ fontFamily: BRUSH, fontSize: 54, color: "#3A2A1C", lineHeight: 1 }} text={w.t} />
          ))}
        </div>
      </div>
      {/* 가운데 선이 위에서 아래로 그어진다 */}
      <div style={{ position: "absolute", left: 536, top: 0, width: 8, height: 1920 * pop(frame, 0, 120, 20), background: YELLOW, boxShadow: "0 0 20px rgba(255,210,63,0.8)" }} />
      <Slam at={0} style={{ left: 0, width: 540, top: 300, textAlign: "center" }}>
        <div style={label(36)}>KOREYADA</div>
        <div style={{ ...big(116), marginTop: 10 }}>4 yil</div>
        <div style={big(116)}>10 oy</div>
        <div style={{ ...big(48, YELLOW), marginTop: 18, letterSpacing: 0 }}>
          <CountUp at={6} dur={70} from={0} suffix=" kun" to={1765} />
        </div>
      </Slam>
      <Slam at={three} from={2.6} rot={4} style={{ left: 540, width: 540, top: 300, textAlign: "center" }}>
        <div style={label(36)}>BILGAN SOʻZI</div>
        <div style={{ ...big(250, YELLOW), marginTop: 4 }}>3</div>
      </Slam>
      {/* "3" 둘레에 퍼지는 링 */}
      {frame >= three && frame < three + 24 ? (
        <div style={{ position: "absolute", left: 810 - 160 * (1 + (frame - three) / 12), top: 560 - 160 * (1 + (frame - three) / 12), width: 320 * (1 + (frame - three) / 12), height: 320 * (1 + (frame - three) / 12), borderRadius: "50%", border: `10px solid rgba(255,210,63,${1 - (frame - three) / 24})` }} />
      ) : null}
      <AbsoluteFill style={{ background: `rgba(8,5,3,${dim})` }} />
      <Flash at={q} />
      {/* 질문 — 단어가 하나씩 쾅 */}
      {frame >= q && frame < T.n04.at + 6 ? (
        <div style={{ position: "absolute", left: 50, right: 50, top: 640, textAlign: "center", opacity: 1 - clamp01((frame - T.n04.at + 4) / 8) }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 26px" }}>
            {qWords.map((w, i) => {
              const s = pop(frame, q + i * 4, 380, 14);
              return (
                <span key={w} style={{ ...big(104), display: "inline-block", transform: `scale(${interpolate(s, [0, 1], [1.8, 1])})`, opacity: clamp01(s * 3) }}>
                  {w}
                </span>
              );
            })}
          </div>
          <div style={{ marginTop: 18, ...big(110), position: "relative", zIndex: 0 }}>
            <Sweep at={word("n03", "uch")}>3 ta soʻzdan</Sweep>
          </div>
          <div style={{ marginTop: 14, ...big(96) }}>nariga oʻtmadi?</div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
}

// ── 장면마다 움직이는 그래픽 ──
function Motion() {
  const frame = useCurrentFrame();
  const kech = word("n04", "Kechasi");
  const tel = word("n04", "telefon");
  return (
    <>
      {/* 공장: 12 soat + 시계 */}
      <Slam at={word("n04", "Kuniga")} out={kech - 6} style={{ left: 0, right: 0, top: 250, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <ClockRing at={word("n04", "Kuniga")} dur={50} size={170} />
        <div style={big(150)}>12 soat</div>
        <div style={label(40)}>HAR KUNI</div>
      </Slam>
      {/* 기숙사: 배터리가 닳는다 */}
      <Slam at={kech + 4} out={end("n04") + 6} style={{ left: 0, right: 0, top: 260, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <Battery at={kech + 4} dur={end("n04") - kech} />
        <div style={big(84)}>{frame >= tel + 10 ? "charchoq" : "yotoqxona"}</div>
      </Slam>
      {/* 반장: 말풍선 쾅, 아빠 머리 위 물음표 */}
      <Bubble at={T.f01.at} out={end("d04")} shake size={56} sub="Bu emas! Qaytadan qil!" tail="left" x={70} y={240}>
        이거 아니야! 다시 해!
      </Bubble>
      <Huh at={T.f01.at + 14} out={end("n05")} x={790} y={300} />
      <Bubble at={T.d04.at} bg={YELLOW} out={end("n05") - 10} size={48} tail="right" x={560} y={1040}>
        네… 네…
      </Bubble>
      {/* 식당: +guruch, 하트 */}
      <Float at={word("n06", "koʻproq")} x={620} y={1060}>
        <div style={{ ...big(72, YELLOW), letterSpacing: 0 }}>+ guruch</div>
      </Float>
      <Float at={word("n06", "guruch") + 6} x={520} y={980}>
        <div style={{ fontSize: 90, color: RED, textShadow: OUTLINE }}>♥</div>
      </Float>
      <Float at={T.n07.at + 4} x={600} y={1080}>
        <div style={{ ...big(64, YELLOW), letterSpacing: 0 }}>+ tuxum</div>
      </Float>
      {/* 1년, 한마디도 */}
      <Slam at={word("n07", "Bir")} out={end("n07") + 4} style={{ left: 0, right: 0, top: 250, textAlign: "center" }}>
        <div style={big(150)}>
          <CountUp at={word("n07", "Bir")} dur={45} from={1} suffix=" kun" to={365} />
        </div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 18, background: "rgba(0,0,0,0.5)", padding: "12px 28px", borderRadius: 20 }}>
          <NoTalk />
          <span style={{ ...big(56), letterSpacing: 0 }}>0 ta gap</span>
        </div>
      </Slam>
      {/* 편지 건네는 순간 */}
      <Slam at={word("n08", "xat")} out={T.n09.at - 6} from={2} rot={3} style={{ left: 0, right: 0, top: 270, textAlign: "center" }}>
        <div style={big(160, YELLOW)}>XAT</div>
      </Slam>
      <Bubble at={T.d05.at} out={T.n10.at - 14} bg="#fff" size={52} sub="Rahmat…" tail="right" x={600} y={540}>
        감사합니다…
      </Bubble>
      {/* 서랍: 해가 넘어간다 */}
      <Slam at={word("n10", "uch")} out={end("n11") + 6} style={{ left: 0, right: 0, top: 250, textAlign: "center" }}>
        <div style={big(170)}>
          <CountUp at={word("n10", "uch")} dur={36} from={1} pad={false} suffix=" yil" to={3} />
        </div>
        <div style={{ ...label(42), marginTop: 12 }}>OʻQILMAGAN XAT</div>
      </Slam>
      {/* 버스: 타이머 링 + 한글이 날아오른다 */}
      <Slam at={word("n12", "Korio") - 4} out={word("n12", "har") - 4} style={{ left: 60, top: 260, display: "flex", alignItems: "center", gap: 20 }}>
        <ClockRing at={word("n12", "Korio")} color={YELLOW} dur={70} size={140} />
        <div>
          <div style={label(36)}>HAR KUNI</div>
          <div style={big(108)}>10 daqiqa</div>
        </div>
      </Slam>
      <HangulFloat from={word("n12", "Korio")} to={word("n12", "har")} x={820} y={820} />
    </>
  );
}

/** 말풍선에 빗금 — "말이 없다" (이모지 대신 그린다) */
function NoTalk() {
  return (
    <div style={{ position: "relative", width: 76, height: 62 }}>
      <div style={{ position: "absolute", inset: "0 0 12px 0", border: "7px solid #fff", borderRadius: 20 }} />
      <div style={{ position: "absolute", left: 14, bottom: 0, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "16px solid #fff" }} />
      <div style={{ position: "absolute", left: -6, top: 22, width: 92, height: 8, background: RED, borderRadius: 4, transform: "rotate(-35deg)" }} />
    </div>
  );
}

// ── 편지 · 마무리 ──
function Letter() {
  const frame = useCurrentFrame();
  const at = T.r01.at - 4;
  const out = end("n15") + 8;
  if (frame < at || frame >= out + 10) return null;
  const s = pop(frame, at, 160, 16);
  const o = clamp01((frame - out) / 10);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 250, textAlign: "center", opacity: (1 - o) * clamp01(s * 2), transform: `translateY(${(1 - s) * 60}px) rotate(-1.5deg)` }}>
      <div style={{ display: "inline-block", background: "rgba(252,243,224,0.96)", borderRadius: 12, padding: "44px 58px", boxShadow: "0 0 60px rgba(255,190,90,0.55), 0 20px 50px rgba(0,0,0,0.5)" }}>
        <div style={{ fontFamily: BRUSH, fontSize: 84, color: INK, lineHeight: 1.35 }}>
          <Written at={T.r01.at} speed={4} text="아들 같았어요." />
          <br />
          <Written at={T.r01.at + 34} speed={4} text="건강하세요." />
        </div>
        {frame >= T.n14.at ? (
          <div style={{ marginTop: 22, fontFamily: HEAVY, fontSize: 50, color: "#6B3F12", opacity: clamp01((frame - T.n14.at) / 10) }}>
            Oʻgʻlimdek edingiz. Sogʻ boʻling.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Closing() {
  const frame = useCurrentFrame();
  const at = T.n16.at;
  const out = end("n16") + 20;
  if (frame < at || frame >= out + 10) return null;
  const words = ["Baʼzi", "soʻzlar", "yillab", "kutadi."];
  const kutib = word("n16", "Kutib");
  const o = clamp01((frame - out) / 10);
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top: 260, textAlign: "center", opacity: 1 - o }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 24px" }}>
        {words.map((w, i) => {
          const s = pop(frame, at + i * 5, 380, 14);
          return (
            <span key={w} style={{ ...big(104), display: "inline-block", transform: `scale(${interpolate(s, [0, 1], [1.8, 1])})`, opacity: clamp01(s * 3) }}>
              {w}
            </span>
          );
        })}
      </div>
      {frame >= kutib ? (
        <div style={{ marginTop: 26, ...big(118), position: "relative", zIndex: 0, transform: `scale(${interpolate(pop(frame, kutib, 380, 14), [0, 1], [1.8, 1])})` }}>
          <Sweep at={kutib + 4}>Kutib qolmang.</Sweep>
        </div>
      ) : null}
    </div>
  );
}

// ── 자막: 굵은 산세리프, 반투명 띠, 지금 단어는 노랑 ──
const KO_MEANING: Record<string, string> = {
  d01: "Ha.",
  d02: "Rahmat.",
  d03: "Kechirasiz.",
  f01: "Bu emas! Qaytadan qil!",
  d04: "Ha… kechirasiz.",
  d05: "Rahmat…",
  r01: "Oʻgʻlimdek edingiz. Sogʻ boʻling.",
};
type Chunk = { words: { w: string; at: number }[] };
const CHUNKS: Record<string, Chunk[]> = {};
for (const key of LINE_KEYS) {
  const line = timing.lines[key] as { words?: { w: string; s: number }[] };
  if (!line.words) continue;
  const out: Chunk[] = [];
  let cur: Chunk = { words: [] };
  for (const w of line.words) {
    cur.words.push({ w: w.w, at: T[key].at + Math.round(w.s * FPS) });
    if (/[,.:?…—]$/.test(w.w) || cur.words.length >= 4) {
      out.push(cur);
      cur = { words: [] };
    }
  }
  if (cur.words.length) out.push(cur);
  CHUNKS[key] = out;
}

function Subtitles() {
  const frame = useCurrentFrame();
  if (frame >= T.n17.at - 14) return null;
  const key = LINE_KEYS.find((k) => frame >= T[k].at - 2 && frame < T[k].at + T[k].len + 6);
  // 세 단어 · 편지 · 편지 뜻 · 마무리 문장은 화면에 크게 따로 나온다
  if (!key || ["d01", "d02", "d03", "f01", "d05", "r01", "n14", "n16"].includes(key)) return null;
  const wrap: CSSProperties = { position: "absolute", left: 40, right: 40, top: 1360, display: "flex", justifyContent: "center" };
  const band: CSSProperties = { background: "rgba(12,8,5,0.62)", borderRadius: 22, padding: "14px 30px", maxWidth: 980, textAlign: "center" };
  if (CHUNKS[key]) {
    const chunks = CHUNKS[key];
    const chunk = [...chunks].reverse().find((c) => frame >= c.words[0].at - 3) ?? chunks[0];
    const current = [...chunk.words].reverse().find((w) => frame >= w.at);
    const s = pop(frame, chunk.words[0].at - 3, 400, 18);
    return (
      <div style={wrap}>
        <div style={{ ...band, fontFamily: BOLD, fontWeight: 800, fontSize: 64, lineHeight: 1.2, color: "#fff", transform: `scale(${0.92 + 0.08 * s})` }}>
          {chunk.words.map((w, i) => (
            <span key={`${w.at}-${i}`} style={{ color: w === current ? YELLOW : "#fff", opacity: frame >= w.at ? 1 : 0.4 }}>
              {w.w}
              {i < chunk.words.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      </div>
    );
  }
  const text = (timing.lines[key] as { text: string }).text;
  return (
    <div style={wrap}>
      <div style={band}>
        <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 62, color: "#fff" }}>{text}</div>
        <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: 44, color: YELLOW, marginTop: 4 }}>{KO_MEANING[key]}</div>
      </div>
    </div>
  );
}

// ── 끝 화면 ──
function EndCard() {
  const frame = useCurrentFrame();
  const at = T.n17.at - 14;
  if (frame < at) return null;
  const fade = clamp01((frame - at) / 12);
  const phone = pop(frame, at + 4, 160, 16);
  const badge = (d: number) => pop(frame, T.n17.at + 26 + d, 360, 12);
  return (
    <AbsoluteFill style={{ opacity: fade, background: "radial-gradient(ellipse at 50% 30%, #5A3B22 0%, #1C120B 70%)" }}>
      <Dust from={at} to={XAT_TOTAL} />
      <Slam at={at + 2} style={{ left: 0, right: 0, top: 130, textAlign: "center" }}>
        <div style={big(84, YELLOW)}>KORIO</div>
        <div style={{ ...big(48), marginTop: 10, letterSpacing: 0 }}>Koreys tili — oʻzbek tilida</div>
      </Slam>
      <div style={{ position: "absolute", left: (1080 - 400) / 2, top: 330 + (1 - phone) * 700, width: 400, height: 866, borderRadius: 52, background: "#0B0A10", padding: 14, boxShadow: "0 0 70px rgba(255,190,90,0.35), 0 30px 80px rgba(0,0,0,0.6)", transform: `rotate(${(1 - phone) * -8}deg)` }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 40, overflow: "hidden" }}>
          <Sequence from={at} layout="none">
            {/* 앱의 실제 단어 카드 — 편지의 첫 단어 아들(o‘g‘il)에서 딸로 넘어간다 */}
            <OffthreadVideo muted src={staticFile("clips/wordFamily.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        </div>
      </div>
      <Slam at={at + 16} from={2} rot={-4} style={{ left: 640, top: 600 }}>
        <div style={{ background: YELLOW, color: INK, fontFamily: HEAVY, fontSize: 40, lineHeight: 1.15, padding: "14px 22px", borderRadius: 18, boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}>
          Xatdagi soʻz
          <br />
          <span style={{ fontFamily: KO, fontWeight: 900, fontSize: 52 }}>아들</span> = oʻgʻil
        </div>
      </Slam>
      <Slam at={T.n17.at} style={{ left: 50, right: 50, top: 1230, textAlign: "center" }}>
        <div style={{ ...big(54), letterSpacing: 0, lineHeight: 1.2 }}>
          Buni Koreyada ishlayotgan <span style={{ color: YELLOW }}>yaqiningizga yuboring</span>
        </div>
      </Slam>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center", gap: 20 }}>
        {[
          { t: "Android · Google Play", d: 0 },
          { t: "iPhone · Telegram", d: 6 },
        ].map((b) => (
          <div key={b.t} style={{ transform: `scale(${badge(b.d)})`, background: "#fff", color: INK, fontFamily: HEAVY, fontSize: 36, padding: "14px 24px", borderRadius: 18, boxShadow: "0 10px 24px rgba(0,0,0,0.4)" }}>
            {b.t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

// ── 소리 ──
function Bed({ src, from, to, volume, fade = 45 }: { src: string; from: number; to: number; volume: number; fade?: number }) {
  return (
    <Sequence durationInFrames={to - from} from={from} layout="none">
      <Audio loop src={staticFile(src)} volume={(f) => volume * Math.min(clamp01(f / fade), clamp01((to - from - f) / fade))} />
    </Sequence>
  );
}

function Hit({ at, src, volume = 0.5 }: { at: number; src: string; volume?: number }) {
  return (
    <Sequence from={Math.max(0, at)} layout="none">
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  );
}

function Sounds() {
  const music = [
    { src: "ai/xat/m1.mp3", from: 0, to: T.n08.at + 30, v: 0.32 },
    { src: "ai/xat/m2.mp3", from: T.n08.at - 15, to: T.n12.at + 30, v: 0.2 },
    { src: "ai/xat/m3.mp3", from: T.n12.at - 15, to: T.n16.at + 30, v: 0.18 },
    { src: "ai/xat/m4.mp3", from: T.n16.at - 15, to: XAT_TOTAL, v: 0.22 },
  ];
  const whoosh = "ai/tutorial/sfx-whoosh.mp3";
  const tick = "sfx/select.wav";
  return (
    <>
      {music.map((m) => (
        <Bed fade={45} from={m.from} key={m.src} src={m.src} to={m.to} volume={m.v} />
      ))}
      <Bed fade={20} from={T.hug.at} src="ai/xat/m3.mp3" to={T.hug.at + T.hug.len + 10} volume={0.12} />
      <Bed from={0} src="ai/xat/sfx-factory.mp3" to={T.n06.at} volume={0.1} />
      <Bed from={T.n06.at - 8} src="ai/xat/sfx-canteen.mp3" to={T.n08.at} volume={0.12} />
      <Bed from={T.n08.at - 10} src="ai/xat/sfx-snow.mp3" to={T.n10.at} volume={0.16} />
      <Bed from={T.n12.at - 10} src="ai/xat/sfx-bus.mp3" to={word("n12", "har")} volume={0.1} />
      <Hit at={word("n13", "ochdim.") - 6} src="ai/xat/sfx-paper.mp3" volume={0.7} />
      {/* 그래픽이 들어오는 순간의 작은 소리 */}
      <Hit at={0} src="ai/tutorial/sfx-slap.mp3" volume={0.45} />
      <Hit at={word("n02", "uchta") - 4} src="ai/tutorial/sfx-slap.mp3" volume={0.55} />
      <Hit at={T.n03.at} src={whoosh} volume={0.45} />
      <Hit at={word("n04", "Kuniga")} src={tick} volume={0.35} />
      <Hit at={T.f01.at} src="sfx/wrong.wav" volume={0.3} />
      <Hit at={word("n06", "koʻproq")} src={tick} volume={0.35} />
      <Hit at={word("n07", "Bir")} src={tick} volume={0.35} />
      <Hit at={word("n08", "xat")} src="ai/tutorial/sfx-slap.mp3" volume={0.4} />
      <Hit at={word("n10", "uch")} src={tick} volume={0.35} />
      <Hit at={word("n12", "Korio")} src="sfx/correct.wav" volume={0.3} />
      <Hit at={T.n17.at - 14} src={whoosh} volume={0.4} />
      {LINE_KEYS.map((k) => (
        <Sequence from={T[k].at} key={k} layout="none">
          <Audio src={staticFile(`ai/xat/${k}.mp3`)} />
        </Sequence>
      ))}
    </>
  );
}

export function XatReel() {
  return (
    <AbsoluteFill style={{ background: "#0E0906", overflow: "hidden" }}>
      {SHOTS.map((s, i) => {
        const next = SHOTS[i + 1]?.at ?? XAT_TOTAL;
        if (s.src === "hook" || s.src === "endcard") return null;
        return <Still key={s.src} next={next} shot={s} />;
      })}
      <Snow from={T.n07.at - 6} to={T.n10.at - 8} />
      <Dust from={T.n10.at - 8} to={T.n12.at - 10} />
      <Leak from={T.r01.at} to={T.n16.at} />
      <Hook />
      <Vignette />
      <Motion />
      <Flash at={T.r01.at - 4} />
      <Letter />
      <Closing />
      <Subtitles />
      <EndCard />
      <Sounds />
    </AbsoluteFill>
  );
}
