/**
 * "Men toʻlayman!" — 남에게는 다 내 주면서 나를 위한 59 000 so'm 은 "비싸다"는 산자르 (약 93초)
 *
 * 8블록: Hook(대각선 반 갈라: 계산서 싸움 210 000 | 휴대폰 59 000) → Lead(하루 410 000, 질문 10초 안) → Body1 심리적 회계(Thaler)
 *   → Open loop("계산해 보자") → Body2 점심 70 000 > SUPER 59 000 · 1년권 하루 1 230 = 버스비 절반 · 하루 인심 ≈ 1년치
 *   → Open loop("이 돈으로 뭘?") → Body3 앱에서 할 수 있는 것(숫자는 시드에서 센 값을 내림) + MAX vs 버스 한 달 카드
 *   → 반전(몇 달 뒤 "제가 살게요!") → CTA(요금표 + 실제 요금제 화면 + 보내기)
 * 화면 문법(이 편 것, 참고 계정 @birfoiz_ 의 느낌만): 사용자가 ChatGPT 로 그린 수채화 18장(public/ai/tolayman/t01–t18)에
 *   손에 든 듯 흔들리는 카메라 · 박자마다 툭 다가가는 줌 · 휙 넘기기 / 쾅 들어오기 / 섬광 전환 · 필름 결 · 빛 번짐,
 *   그리고 장면마다 움직이는 그래픽(영수증, 하루 지출 계기판, 가격 막대, 찢어지는 버스표, 저울, 쌓이는 기능 카드, 요금표).
 *   초록 휴대폰 화면 4장은 초록을 뚫고(t02/t07/t12/t13-keyed.png) 아래에 실제 앱 녹화를 깐다(screens.json 의 사각형).
 * 소리: audio/make-lines.mjs(내레이터 = 우즈벡 원어민 "SARHAD-SIZ Narrator", 반음 낮게) · ElevenLabs 음악 4토막 · 효과음.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, random, spring, staticFile, useCurrentFrame } from "remotion";
import screens from "./screens.json";
import timing from "./tolayman.words.json";

const FPS = 30;
const W = 1080;
const H = 1920;
const HEAVY = '"Segoe UI Black", "Segoe UI", "Malgun Gothic", sans-serif';
const BOLD = '"Segoe UI", "Malgun Gothic", sans-serif';
const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const YELLOW = "#FFD23F";
const PURPLE = "#6A55F5";
const PURPLE_DEEP = "#3A2A9C";
const GREEN = "#3DDC84";
const RED = "#FF4B4B";
const ORANGE = "#FF9F1C";
const INK = "#16121F";
const OUTLINE = "0 0 3px rgba(0,0,0,0.9), 0 4px 0 rgba(0,0,0,0.55), 0 10px 28px rgba(0,0,0,0.7)";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.45, 0, 0.25, 1);
const pop = (frame: number, at: number, stiffness = 280, damping = 13) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}ʻʼ']/gu, "");
const img = (n: string) => staticFile(`ai/tolayman/${n}.webp`);
const som = (v: number) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// ── 타임라인 ──
type Key = keyof typeof timing.lines;
const ORDER: { key: string; gap: number; pause?: number }[] = [
  { key: "c01", gap: 4 }, // Hook — 계산서 싸움
  { key: "c02", gap: 2 },
  { key: "c03", gap: 2 },
  { key: "n01", gap: 6 },
  { key: "n02", gap: 6 },
  { key: "c04", gap: 2 }, // "Qimmat-ku!"
  { key: "n03", gap: 12 }, // Lead — 하루
  { key: "n04", gap: 6 },
  { key: "n05", gap: 10 }, // 질문
  { key: "n06", gap: 12 }, // Body 1 — Thaler
  { key: "n07", gap: 8 },
  { key: "c05", gap: 10 }, // Open loop 1
  { key: "n08", gap: 4 }, // Body 2 — 가격
  { key: "n09", gap: 6 },
  { key: "n10", gap: 8 },
  { key: "n11", gap: 8 },
  { key: "c06", gap: 10 }, // Open loop 2
  { key: "n12", gap: 6 }, // Body 3 — 앱 기능
  { key: "n13", gap: 4 },
  { key: "n14", gap: 8 }, // MAX
  { key: "n15", gap: 10 }, // 첫 지폐
  { key: "n16", gap: 10 }, // 반전
  { key: "c07", gap: 4 },
  { key: "c08", gap: 3 },
  { key: "c09", gap: 6 },
  { key: "n17", gap: 4 },
  { key: "n18", gap: 10 }, // CTA
  { key: "end", gap: 0, pause: 84 },
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
export const TOLAYMAN_TOTAL = T.end.at + T.end.len;
const end = (k: string) => T[k].at + T[k].len;
const LINE_KEYS = ORDER.map((s) => s.key).filter((k) => k in timing.lines) as Key[];
function word(key: Key, text: string) {
  const w = (timing.lines[key] as { words?: { w: string; s: number }[] }).words?.find((x) => norm(x.w) === norm(text));
  if (!w) throw new Error(`${key}: no word "${text}"`);
  return T[key].at + Math.round(w.s * FPS);
}

// ── 장면 ──
const MONTAGE_AT = word("n12", "ikki") - 3;
type Trans = "cut" | "whip" | "punch" | "flash";
type Shot = { key: string; src: string; at: number; trans: Trans; zoom?: [number, number]; pan?: [number, number] };
const SHOTS: Shot[] = [
  { key: "hook", src: "hook", at: 0, trans: "cut" },
  { key: "t04a", src: "t04", at: T.n01.at - 2, trans: "punch", zoom: [1.12, 1.02], pan: [0, 20] },
  { key: "t02", src: "t02", at: T.n02.at - 3, trans: "whip", zoom: [1.0, 1.16], pan: [-60, 30] },
  { key: "t03", src: "t03", at: T.n03.at - 4, trans: "whip", zoom: [1.04, 1.12], pan: [0, 20] },
  { key: "t05", src: "t05", at: word("n03", "kechqurun") - 4, trans: "whip", zoom: [1.0, 1.1], pan: [-20, 0] },
  { key: "t06", src: "t06", at: word("n03", "ikki") - 3, trans: "punch", zoom: [1.06, 1.16], pan: [0, -20] },
  { key: "t07", src: "t07", at: T.n05.at - 4, trans: "whip", zoom: [1.02, 1.14], pan: [-40, 10] },
  { key: "thaler", src: "thaler", at: T.n06.at - 4, trans: "flash" },
  { key: "t08a", src: "t08", at: T.n07.at - 4, trans: "whip", zoom: [1.1, 1.0], pan: [0, 0] },
  { key: "t10", src: "t10", at: T.c05.at - 4, trans: "whip", zoom: [1.0, 1.08], pan: [0, 0] },
  { key: "t11", src: "t11", at: T.n10.at - 4, trans: "whip", zoom: [1.02, 1.12], pan: [-30, 0] },
  { key: "t04b", src: "t04", at: T.n11.at - 4, trans: "punch", zoom: [1.0, 1.1], pan: [0, 0] },
  { key: "t09", src: "t09", at: T.c06.at - 4, trans: "whip", zoom: [1.04, 1.14], pan: [0, 20] },
  { key: "t12", src: "t12", at: T.n12.at - 4, trans: "whip", zoom: [1.0, 1.06], pan: [-20, 0] },
  { key: "montage", src: "montage", at: MONTAGE_AT, trans: "punch" },
  { key: "t13", src: "t13", at: T.n14.at - 4, trans: "whip", zoom: [1.0, 1.08], pan: [-30, 0] },
  { key: "t14", src: "t14", at: T.n15.at - 4, trans: "flash", zoom: [1.12, 1.02], pan: [0, 0] },
  { key: "t15", src: "t15", at: T.n16.at - 4, trans: "whip", zoom: [1.0, 1.1], pan: [0, 10] },
  { key: "t16", src: "t16", at: T.c09.at - 2, trans: "punch", zoom: [1.06, 1.14], pan: [0, 0] },
  { key: "t17", src: "t17", at: T.n17.at - 2, trans: "punch", zoom: [1.0, 1.08], pan: [0, 0] },
  { key: "endcard", src: "endcard", at: T.n18.at - 6, trans: "flash" },
];
const SCREEN_CLIPS: Record<string, { src: string; trim: number }[]> = {
  t02: [{ src: "premium", trim: 120 }],
  t07: [{ src: "premium", trim: 130 }],
  t12: [{ src: "hangul", trim: 0 }],
  t13: [{ src: "tutor", trim: 60 }],
};

/** 박자마다 툭 다가가는 줌, 쾅 소리 때 흔들림 */
const KICKS: number[] = [];
const SHAKES: number[] = [];

function Camera({ children }: { children: ReactNode }) {
  const frame = useCurrentFrame();
  const kick = KICKS.reduce((m, t) => (frame >= t ? Math.max(m, Math.exp(-(frame - t) / 6)) : m), 0);
  const shake = SHAKES.reduce((m, t) => (frame >= t && frame < t + 14 ? Math.max(m, 1 - (frame - t) / 14) : m), 0);
  const sx = Math.sin(frame / 37) * 6 + Math.sin(frame * 2.7) * 14 * shake;
  const sy = Math.cos(frame / 53) * 5 + Math.cos(frame * 3.1) * 12 * shake;
  const rot = Math.sin(frame / 71) * 0.35 + Math.sin(frame * 2.3) * 0.8 * shake;
  return <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px) rotate(${rot}deg) scale(${1.03 + 0.05 * kick})` }}>{children}</AbsoluteFill>;
}

function ShotLayer({ shot, next }: { shot: Shot; next?: Shot }) {
  const frame = useCurrentFrame();
  const stop = next ? next.at + 9 : TOLAYMAN_TOTAL;
  if (frame < shot.at - 1 || frame >= stop) return null;
  const local = frame - shot.at;
  // 들어오기
  let tx = 0;
  let sc = 1;
  let blur = 0;
  let op = 1;
  if (shot.trans === "whip") {
    const p = ease(clamp01(local / 8));
    tx = (1 - p) * W * 0.7;
    blur = (1 - p) * 34;
  } else if (shot.trans === "punch") {
    const p = ease(clamp01(local / 7));
    sc = 1 + (1 - p) * 0.35;
    op = clamp01(local / 2);
  } else if (shot.trans === "flash") {
    op = clamp01(local / 3);
  }
  // 나가기 (다음이 휙이면 왼쪽으로 쓸려 나간다)
  if (next && next.trans === "whip" && frame >= next.at) {
    const q = ease(clamp01((frame - next.at) / 8));
    tx -= q * W * 0.45;
    blur += q * 28;
  }
  const t = clamp01(local / Math.max(1, stop - shot.at));
  const [z0, z1] = shot.zoom ?? [1, 1.08];
  const [px, py] = shot.pan ?? [0, 0];
  const z = interpolate(ease(t), [0, 1], [z0, z1]);
  return (
    <AbsoluteFill style={{ opacity: op, transform: `translateX(${tx}px) scale(${sc})`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
      {shot.src === "hook" ? (
        <Hook />
      ) : shot.src === "thaler" ? (
        <ThalerScene />
      ) : shot.src === "montage" ? (
        <Montage />
      ) : shot.src === "endcard" ? (
        <EndCard />
      ) : (
        <AbsoluteFill style={{ transform: `scale(${z}) translate(${px * t}px, ${py * t}px)` }}>
          {SCREEN_CLIPS[shot.src] ? <PhoneScreen clips={SCREEN_CLIPS[shot.src]} from={shot.at} name={shot.src as keyof typeof screens} /> : null}
          <Img src={SCREEN_CLIPS[shot.src] ? staticFile(`ai/tolayman/${shot.src}-keyed.png`) : img(shot.src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/** 초록 화면 자리에 앱 녹화 — 그림(초록을 뚫음)이 위에 덮여 손가락은 앞에 남는다 */
function PhoneScreen({ name, clips, from }: { name: keyof typeof screens; clips: { src: string; trim: number }[]; from: number }) {
  const [tl, tr, , bl] = screens[name].quad;
  const cx = (screens[name].quad.reduce((s, p) => s + p[0], 0) / 4);
  const cy = (screens[name].quad.reduce((s, p) => s + p[1], 0) / 4);
  const w = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]) * 1.14;
  const h = Math.hypot(bl[0] - tl[0], bl[1] - tl[1]) * 1.06;
  const angle = (Math.atan2(tr[1] - tl[1], tr[0] - tl[0]) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, transform: `rotate(${angle}deg)`, overflow: "hidden", background: "#fff" }}>
      <Sequence from={from} layout="none">
        <OffthreadVideo muted src={staticFile(`clips/${clips[0].src}.mp4`)} trimBefore={clips[0].trim} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%" }} />
      </Sequence>
    </div>
  );
}

// ── 공용 그래픽 부품 ──
function Slam({ at, out, children, style, from = 1.8, rot = -2 }: { at: number; out?: number; children: ReactNode; style?: CSSProperties; from?: number; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 8)) return null;
  const s = pop(frame, at, 340, 14);
  const o = out !== undefined ? clamp01((frame - out) / 8) : 0;
  return (
    <div style={{ position: "absolute", ...style, transform: `${style?.transform ?? ""} scale(${interpolate(s, [0, 1], [from, 1]) * (1 - o * 0.3)}) rotate(${rot * s}deg)`, opacity: clamp01(s * 3) * (1 - o) }}>
      {children}
    </div>
  );
}

function CountUp({ at, dur, from, to, suffix = "" }: { at: number; dur: number; from: number; to: number; suffix?: string }) {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [at, at + dur], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <span>
      {som(v)}
      {suffix}
    </span>
  );
}

const big = (size: number, color = "#fff"): CSSProperties => ({ fontFamily: HEAVY, fontSize: size, lineHeight: 1, color, textShadow: OUTLINE, letterSpacing: -2 });
const label = (size = 36, color = "#fff"): CSSProperties => ({ fontFamily: HEAVY, fontSize: size, letterSpacing: 4, color, textShadow: OUTLINE });

function Chip({ children, bg, fg = "#fff", size = 44, style }: { children: ReactNode; bg: string; fg?: string; size?: number; style?: CSSProperties }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: bg, color: fg, fontFamily: HEAVY, fontSize: size, lineHeight: 1.1, padding: `${size * 0.22}px ${size * 0.42}px`, borderRadius: size * 0.34, boxShadow: "0 10px 26px rgba(0,0,0,0.4)", whiteSpace: "nowrap", ...style }}>
      {children}
    </div>
  );
}

/** 말풍선 — 톡 튀어나오고 흔들린다 */
function Bubble({ at, out, x, y, children, sub, tail = "left", bg = "#fff", color = INK, size = 52, font = HEAVY }: { at: number; out: number; x: number; y: number; children: ReactNode; sub?: string; tail?: "left" | "right"; bg?: string; color?: string; size?: number; font?: string }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out + 8) return null;
  const s = pop(frame, at, 420, 12);
  const o = clamp01((frame - out) / 8);
  const wob = Math.sin((frame - at) * 1.9) * 3 * Math.exp(-(frame - at) / 12);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${wob}deg) scale(${s * (1 - o * 0.4)})`, transformOrigin: tail === "left" ? "12% 100%" : "88% 100%", opacity: 1 - o }}>
      <div style={{ position: "relative", background: bg, color, borderRadius: 36, padding: "18px 32px", fontFamily: font, fontWeight: 900, fontSize: size, whiteSpace: "nowrap", boxShadow: "0 14px 34px rgba(0,0,0,0.45)", textAlign: "center" }}>
        {children}
        {sub ? <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: size * 0.5, color: "#7A5A12", marginTop: 4 }}>{sub}</div> : null}
        <div style={{ position: "absolute", bottom: -24, [tail === "left" ? "left" : "right"]: 46, width: 0, height: 0, borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderTop: `28px solid ${bg}` } as CSSProperties} />
      </div>
    </div>
  );
}

/** 형광펜이 쓱 */
function Sweep({ at, children, color = YELLOW, ink = INK }: { at: number; children: ReactNode; color?: string; ink?: string }) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 14px", color: p > 0.5 ? ink : "inherit", textShadow: p > 0.5 ? "none" : undefined }}>
      <span style={{ position: "absolute", left: 0, top: "6%", bottom: "2%", width: `${p * 100}%`, background: color, borderRadius: 12, zIndex: -1, transform: "rotate(-1.5deg)" }} />
      {children}
    </span>
  );
}

/** 빨간 고무도장 */
function Stamp({ at, text, x, y, color = RED, size = 120, rot = -12 }: { at: number; text: string; x: number; y: number; color?: string; size?: number; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const s = pop(frame, at, 520, 16);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${interpolate(s, [0, 1], [2.6, 1])})`, opacity: clamp01(s * 4) }}>
      <div style={{ border: `${size * 0.08}px solid ${color}`, borderRadius: size * 0.16, padding: `${size * 0.06}px ${size * 0.22}px`, fontFamily: HEAVY, fontSize: size, color, lineHeight: 1, letterSpacing: 2, whiteSpace: "nowrap", background: "rgba(255,255,255,0.12)", textShadow: "0 2px 0 rgba(0,0,0,0.25)", boxShadow: `0 0 0 4px rgba(0,0,0,0.12)` }}>
        {text}
      </div>
    </div>
  );
}

/** 위에서 인쇄되어 내려오는 영수증 */
function Receipt({ at, out, x, y, title, rows, total }: { at: number; out: number; x: number; y: number; title: string; rows: [string, string][]; total: string }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out + 8) return null;
  const p = ease(clamp01((frame - at) / 18));
  const o = clamp01((frame - out) / 8);
  const h = 120 + rows.length * 62 + 110;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 460, height: h * p, overflow: "hidden", opacity: 1 - o, transform: `rotate(-3deg)`, filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.5))" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: h, background: "#FBF7EE", padding: "26px 30px", fontFamily: '"Consolas", "Courier New", monospace', color: "#222", boxSizing: "border-box", clipPath: "polygon(0 0,100% 0,100% calc(100% - 14px),95% 100%,90% calc(100% - 14px),85% 100%,80% calc(100% - 14px),75% 100%,70% calc(100% - 14px),65% 100%,60% calc(100% - 14px),55% 100%,50% calc(100% - 14px),45% 100%,40% calc(100% - 14px),35% 100%,30% calc(100% - 14px),25% 100%,20% calc(100% - 14px),15% 100%,10% calc(100% - 14px),5% 100%,0 calc(100% - 14px))" }}>
        <div style={{ fontWeight: 900, fontSize: 34, textAlign: "center", letterSpacing: 2 }}>{title}</div>
        <div style={{ borderTop: "3px dashed #999", margin: "16px 0" }} />
        {rows.map(([a, b]) => (
          <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 32, lineHeight: "62px" }}>
            <span>{a}</span>
            <span>{b}</span>
          </div>
        ))}
        <div style={{ borderTop: "3px dashed #999", margin: "10px 0 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 42, fontWeight: 900 }}>
          <span>JAMI</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
}

/** 가격 막대 — 왼쪽에서 자라며 숫자가 오른다 */
function Bar({ at, label: text, value, max, color, y, sub }: { at: number; label: string; value: number; max: number; color: string; y: number; sub?: string }) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const p = ease(clamp01((frame - at) / 16));
  const width = 860 * (value / max) * p;
  return (
    <div style={{ position: "absolute", left: 110, top: y, width: 860 }}>
      <div style={{ ...label(34), marginBottom: 12 }}>{text}</div>
      <div style={{ height: 96, width: Math.max(96, width), background: color, borderRadius: 24, boxShadow: "0 12px 30px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 26, boxSizing: "border-box" }}>
        <span style={{ fontFamily: HEAVY, fontSize: 56, color: "#fff", textShadow: "0 3px 0 rgba(0,0,0,0.25)" }}>
          <CountUp at={at} dur={16} from={0} to={value} />
        </span>
      </div>
      {sub ? <div style={{ ...label(28), opacity: 0.85, marginTop: 10, letterSpacing: 1 }}>{sub}</div> : null}
    </div>
  );
}

/** 화면 위 하루 지출 계기판 (Lead 내내) */
function SpendHud() {
  const frame = useCurrentFrame();
  const from = word("n03", "tushlik") - 4;
  const to = end("n04") + 6;
  if (frame < from || frame >= to + 8) return null;
  const s = pop(frame, from, 240, 16);
  const o = clamp01((frame - to) / 8);
  const steps = [
    { at: word("n03", "tushlik"), add: 210_000, name: "Tushlik · 3 kishi" },
    { at: word("n03", "soldi."), add: 200_000, name: "Toʻyga" },
  ];
  let total = 0;
  for (const st of steps) if (frame >= st.at) total += st.add;
  const lastAt = [...steps].reverse().find((st) => frame >= st.at)?.at ?? from;
  const prev = steps.filter((st) => st.at < lastAt).reduce((a, st) => a + st.add, 0);
  const shown = interpolate(frame, [lastAt, lastAt + 14], [prev, total], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bump = frame >= lastAt ? Math.exp(-(frame - lastAt) / 6) : 0;
  return (
    <div style={{ position: "absolute", left: 60, top: 150, transform: `translateY(${(1 - s) * -200}px) scale(${1 + 0.06 * bump})`, opacity: 1 - o, transformOrigin: "0 0" }}>
      <div style={{ background: "rgba(14,10,22,0.82)", border: `4px solid ${YELLOW}`, borderRadius: 26, padding: "18px 28px", minWidth: 520 }}>
        <div style={{ ...label(28, YELLOW), letterSpacing: 3, textShadow: "none" }}>BUGUN SARFLADI</div>
        <div style={{ fontFamily: HEAVY, fontSize: 76, color: "#fff", lineHeight: 1.05 }}>{som(shown)} soʻm</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
          {steps
            .filter((st) => frame >= st.at)
            .map((st) => (
              <div key={st.name} style={{ fontFamily: BOLD, fontWeight: 700, fontSize: 30, color: "#D9D2EA", opacity: clamp01((frame - st.at) / 6) }}>
                + {som(st.add)} · {st.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Hook: 대각선 반 갈라 ──
function Hook() {
  const frame = useCurrentFrame();
  const draw = ease(clamp01(frame / 10));
  const shouts = [
    { at: T.c01.at, text: "MEN TOʻLAYMAN!", x: 70, y: 210, rot: -6, size: 92 },
    { at: T.c02.at + 4, text: "YOʻQ, MEN!", x: 150, y: 330, rot: 5, size: 84 },
    { at: word("c03", "men"), text: "MEN TOʻLAYMAN!", x: 40, y: 450, rot: -3, size: 104 },
  ];
  const push = interpolate(frame, [0, T.n01.at], [1.08, 1.0]);
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <AbsoluteFill style={{ clipPath: "polygon(0 0, 66% 0, 34% 100%, 0 100%)" }}>
        <Img src={img("t01")} style={{ position: "absolute", left: -150, top: 0, width: W, height: H, objectFit: "cover", transform: `scale(${push})` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: "polygon(66% 0, 100% 0, 100% 100%, 34% 100%)" }}>
        <AbsoluteFill style={{ left: 170, transform: `scale(${push})` }}>
          <PhoneScreen clips={[{ src: "premium", trim: 120 }]} from={0} name="t02" />
          <Img src={staticFile("ai/tolayman/t02-keyed.png")} style={{ position: "absolute", inset: 0, width: W, height: H, objectFit: "cover" }} />
        </AbsoluteFill>
      </AbsoluteFill>
      {/* 갈라진 선 — 위에서 아래로 그어진다 */}
      <svg height={H} style={{ position: "absolute", inset: 0 }} viewBox={`0 0 ${W} ${H}`} width={W}>
        <line stroke={YELLOW} strokeLinecap="round" strokeWidth={12} x1={W * 0.66} x2={W * 0.66 - W * 0.32 * draw} y1={0} y2={H * draw} />
      </svg>
      {/* 가격 두 개 — 0초부터 */}
      <Slam at={2} style={{ left: 60, top: 1180 }} rot={-4}>
        <Chip bg={GREEN} fg={INK} size={58}>
          210 000 soʻm
        </Chip>
        <div style={{ ...label(30), marginTop: 10 }}>DOʻSTLAR UCHUN</div>
      </Slam>
      <Slam at={8} style={{ left: 600, top: 1180 }} rot={4}>
        <Chip bg={RED} size={58}>
          59 000 soʻm
        </Chip>
        <div style={{ ...label(30), marginTop: 10 }}>OʻZI UCHUN</div>
      </Slam>
      {shouts.map((s) =>
        frame >= s.at ? (
          <Slam at={s.at} from={2.2} key={`${s.at}`} rot={s.rot} style={{ left: s.x, top: s.y }}>
            <div style={big(s.size, YELLOW)}>{s.text}</div>
          </Slam>
        ) : null,
      )}
    </AbsoluteFill>
  );
}

// ── Thaler: 정보 카드 장면 ──
function ThalerScene() {
  const frame = useCurrentFrame();
  const at = T.n06.at;
  const card = pop(frame, at + 2, 200, 16);
  const nobel = word("n06", "Nobel");
  const term = word("n06", "mental");
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #2B2150 0%, #120D24 75%)" }}>
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)", backgroundSize: "60px 60px", transform: `translateY(${(frame % 60)}px)` }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 330, transform: `translateY(${(1 - card) * 300}px) rotate(${(1 - card) * -8 - 1.5}deg)`, opacity: clamp01(card * 2) }}>
        <div style={{ background: "#FBF6EA", borderRadius: 18, padding: "44px 50px", boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
          <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: 30, color: "#7A6A55", letterSpacing: 4 }}>IQTISODCHI</div>
          <div style={{ fontFamily: HEAVY, fontSize: 92, color: INK, lineHeight: 1.05, marginTop: 6 }}>Richard Thaler</div>
          <div style={{ height: 6, width: 160, background: PURPLE, borderRadius: 3, margin: "22px 0" }} />
          {frame >= term ? (
            <div style={{ fontFamily: HEAVY, fontSize: 64, color: INK, position: "relative", zIndex: 0 }}>
              <Sweep at={term}>“Mental hisob”</Sweep>
            </div>
          ) : null}
          {frame >= term + 8 ? <div style={{ fontFamily: BOLD, fontWeight: 600, fontSize: 34, color: "#5A4C3A", marginTop: 14, opacity: clamp01((frame - term - 8) / 8) }}>(mental accounting)</div> : null}
        </div>
      </div>
      <Stamp at={nobel} color={ORANGE} rot={-10} size={84} text="NOBEL · 2017" x={720} y={340} />
      {/* 머릿속 상자 두 개 미리 보기 */}
      {frame >= word("n06", "shu") ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", gap: 60 }}>
          {[
            ["Hurmat", GREEN],
            ["Oʻzim uchun", "#8E89A0"],
          ].map(([t, c], i) => {
            const s = pop(frame, word("n06", "shu") + i * 5, 320, 12);
            return (
              <div key={t} style={{ transform: `scale(${s})`, textAlign: "center" }}>
                <div style={{ width: 300, height: 220, borderRadius: 26, border: `8px solid ${c}`, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ ...label(38, c), marginTop: 14 }}>{t.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}

// ── 몽타주: 앱에서 할 수 있는 것 ──
const FEATURES = [
  { at: () => word("n12", "ikki"), clip: "wordFamily", n: 2000, plus: true, title: "SOʻZ", sub: "rasm, talaffuz, misol" },
  { at: () => word("n12", "grammatika"), clip: "grammarStudy", n: 200, plus: true, title: "GRAMMATIKA", sub: "oʻzbekcha tushuntirish" },
  { at: () => word("n13", "jonli"), clip: "expressionLearn", n: 900, plus: true, title: "JONLI IBORA", sub: "22 ta hayotiy mavzu" },
  { at: () => word("n13", "yigirma"), clip: "topik", n: 23, plus: false, title: "TOPIK VARIANT", sub: "haqiqiy imtihon savollari" },
];
function Montage() {
  const frame = useCurrentFrame();
  const items = FEATURES.map((f) => ({ ...f, t: f.at() }));
  const cur = [...items].reverse().find((f) => frame >= f.t) ?? items[0];
  const flip = pop(frame, cur.t, 260, 16);
  return (
    <AbsoluteFill>
      <Img src={img("t12")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(18px) brightness(0.45) saturate(1.2)", transform: "scale(1.15)" }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(106,85,245,0.35) 0%, transparent 60%)` }} />
      {/* 큰 휴대폰 — 기능이 바뀔 때마다 휙 뒤집힌다 */}
      <div style={{ position: "absolute", left: 565, top: 560, width: 460, height: 990, borderRadius: 64, background: "#0B0A12", padding: 16, boxShadow: "0 0 80px rgba(106,85,245,0.6), 0 40px 90px rgba(0,0,0,0.6)", transform: `perspective(1400px) rotateY(${(1 - flip) * 80 - 8}deg) rotate(3deg)` }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 50, overflow: "hidden", background: "#fff" }}>
          {items.map((f, i) => {
            const next = items[i + 1]?.t ?? Infinity;
            const start = i === 0 ? Math.min(f.t, MONTAGE_AT) : f.t;
            if (frame < start || frame >= next) return null;
            return (
              <Sequence from={start} key={f.clip} layout="none">
                <OffthreadVideo muted src={staticFile(`clips/${f.clip}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Sequence>
            );
          })}
        </div>
      </div>
      {/* 쌓이는 기능 카드 */}
      <div style={{ position: "absolute", left: 56, top: 230, display: "flex", flexDirection: "column", gap: 18 }}>
        <Slam at={T.n12.at} from={1.4} rot={-2} style={{ position: "relative" }}>
          <Chip bg={YELLOW} fg={INK} size={44}>
            HANGUL · 40 harf
          </Chip>
        </Slam>
      </div>
      <div style={{ position: "absolute", left: 56, top: 330, display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((f) => {
          if (frame < f.t) return null;
          const s = pop(frame, f.t, 360, 14);
          const active = f === cur;
          return (
            <div key={f.title} style={{ transform: `translateX(${(1 - s) * -500}px) scale(${active ? 1 : 0.86})`, transformOrigin: "0 50%", opacity: active ? 1 : 0.8 }}>
              <div style={{ display: "inline-block", background: active ? "rgba(20,14,34,0.92)" : "rgba(20,14,34,0.7)", border: `4px solid ${active ? YELLOW : "rgba(255,255,255,0.25)"}`, borderRadius: 24, padding: "14px 24px" }}>
                <div style={{ fontFamily: HEAVY, fontSize: 64, color: "#fff", lineHeight: 1 }}>
                  <CountUp at={f.t} dur={18} from={0} to={f.n} />
                  {f.plus ? "+" : ""} <span style={{ color: YELLOW, fontSize: 46 }}>{f.title}</span>
                </div>
                <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: 28, color: "#CFC8E2", marginTop: 4 }}>{f.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      {frame >= word("n13", "Topik") ? (
        <Slam at={word("n13", "Topik") + 6} from={2} rot={-4} style={{ left: 60, top: 1500 }}>
          <Chip bg={PURPLE} size={46}>
            Cheksiz energiya · Reklamasiz
          </Chip>
        </Slam>
      ) : null}
    </AbsoluteFill>
  );
}

// ── 장면마다 움직이는 그래픽 ──
function Overlays() {
  const frame = useCurrentFrame();
  return (
    <>
      {/* n01: 영수증 210 000 */}
      <Receipt at={T.n01.at + 2} out={end("n01") + 2} rows={[["Osh × 3", "135 000"], ["Choy, non", "45 000"], ["Salat", "30 000"]]} title="CHOYXONA" total="210 000" x={540} y={180} />
      <Slam at={word("n01", "oʻylamasdan.")} out={end("n01") + 2} rot={-6} style={{ left: 70, top: 1120 }}>
        <Chip bg={YELLOW} fg={INK} size={56}>
          oʻylamasdan!
        </Chip>
      </Slam>
      {/* n02 → c04: 휴대폰 가격, "QIMMAT-KU!" 도장 */}
      <Slam at={word("n02", "kelganda…")} out={end("c04") + 6} from={1.4} rot={-3} style={{ left: 70, top: 240 }}>
        <div style={big(80)}>Oʻziga kelganda…</div>
      </Slam>
      <Slam at={word("c04", "Ellik")} out={end("c04") + 6} rot={4} style={{ left: 470, top: 1090 }}>
        <Chip bg="#fff" fg={INK} size={64}>
          59 000 soʻm
        </Chip>
      </Slam>
      {frame >= word("c04", "Qimmat-ku!") && frame < end("c04") + 6 ? <Stamp at={word("c04", "Qimmat-ku!")} size={112} text="QIMMAT-KU!" x={540} y={1330} /> : null}
      {/* n03: 이름표 */}
      <Slam at={word("n03", "Sanjar.")} out={word("n03", "kechqurun") - 6} rot={-3} style={{ left: 50, top: 1060 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div>
            <div style={big(78, YELLOW)}>SANJAR</div>
            <div style={{ ...label(28), letterSpacing: 2 }}>saxiy · 26 yosh</div>
          </div>
          <svg height="150" viewBox="0 0 150 150" width="150">
            <path d="M14 136 C 40 90, 80 50, 136 14" fill="none" stroke={YELLOW} strokeLinecap="round" strokeWidth="11" />
            <path d="M136 14 L 100 18 M136 14 L 128 50" fill="none" stroke={YELLOW} strokeLinecap="round" strokeWidth="11" />
          </svg>
        </div>
      </Slam>
      <SpendHud />
      {/* n04: 410 000 */}
      <Slam at={word("n04", "toʻrt")} out={end("n04") + 4} from={2.4} rot={-3} style={{ left: 0, right: 0, top: 760, textAlign: "center" }}>
        <div style={big(150, YELLOW)}>410 000</div>
        <div style={{ ...label(40), marginTop: 12 }}>BIR KUNDA</div>
      </Slam>
      <Slam at={word("n04", "Boshqalar")} out={end("n04") + 4} rot={3} style={{ left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center" }}>
        <Chip bg={GREEN} fg={INK} size={56}>
          HAMMASI BOSHQALAR UCHUN
        </Chip>
      </Slam>
      {/* n05: 질문 — 단어가 하나씩 쾅 */}
      <Question />
      {/* n07: 머릿속 상자 이름표 · 채움 */}
      <BoxLabels />
      {/* c05: 딜쇼드 말풍선 */}
      <Bubble at={T.c05.at} out={end("c05") + 4} size={54} tail="left" x={60} y={560}>
        Qani, hisoblab koʻramiz!
      </Bubble>
      {/* n08: 점심 영수증 */}
      <Receipt at={T.n08.at} out={end("n08") + 2} rows={[["Osh", "45 000"], ["Choy, non, salat", "25 000"]]} title="1 KISHI · TUSHLIK" total="≈ 70 000" x={560} y={190} />
      {/* n09: 가격 막대 */}
      <PriceBars />
      {/* n10: 버스표 반으로 */}
      <BusTicket />
      {/* n11: 저울 */}
      <Scale />
      {/* c06: 산자르 질문 */}
      <Slam at={T.c06.at} out={end("c06") + 6} rot={-3} style={{ left: 60, top: 1120 }}>
        <div style={big(84, YELLOW)}>Bu pulga</div>
        <div style={big(84)}>nima olaman?</div>
      </Slam>
      {/* n14: MAX */}
      <MaxPanel />
      {/* n15: 첫 지폐 — 빈 상자가 채워진다 */}
      <FirstCoin />
      {/* n16: 몇 달 뒤 */}
      <Slam at={T.n16.at} out={end("n16") + 4} from={1.2} rot={0} style={{ left: 0, right: 0, top: 820, textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(10,8,16,0.82)", padding: "26px 48px", borderRadius: 24, ...big(80, "#fff"), textShadow: "none" }}>Bir necha oydan keyin…</div>
      </Slam>
      {/* c07 · c08 · c09: 말풍선 */}
      <Bubble at={T.c07.at} out={end("c07") + 8} size={50} tail="left" x={40} y={560}>
        Men toʻlayman!
      </Bubble>
      <Bubble at={T.c08.at - 1} bg={YELLOW} font={KO} out={end("c08") + 6} size={80} sub="“Men toʻlayman” — koreyscha" tail="left" x={430} y={40}>
        제가 살게요!
      </Bubble>
      <Bubble at={T.c09.at} out={end("c09") + 10} size={56} tail="right" x={560} y={360}>
        Nima dedi?!
      </Bubble>
      {frame >= T.c09.at + 4 && frame < end("c09") + 10 ? <Huh at={T.c09.at + 4} x={300} y={420} /> : null}
      <Slam at={word("n17", "koreys")} out={end("n17") + 6} rot={-3} style={{ left: 0, right: 0, top: 1060, textAlign: "center" }}>
        <div style={big(84)}>Endi hatto</div>
        <div style={{ ...big(96), position: "relative", zIndex: 0, marginTop: 8 }}>
          <Sweep at={word("n17", "koreys") + 6}>koreyschada!</Sweep>
        </div>
      </Slam>
    </>
  );
}

function Question() {
  const frame = useCurrentFrame();
  const at = T.n05.at;
  if (frame < at || frame >= end("n05") + 10) return null;
  const o = clamp01((frame - end("n05")) / 10);
  const first = ["Boshqalarga", "—", "hech", "narsa", "ayamaymiz,"];
  return (
    <div style={{ position: "absolute", left: 50, right: 380, top: 230, opacity: 1 - o }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px" }}>
        {first.map((w, i) => {
          const s = pop(frame, at + i * 4, 380, 14);
          return (
            <span key={`${w}${i}`} style={{ ...big(74), display: "inline-block", transform: `scale(${interpolate(s, [0, 1], [1.8, 1])})`, opacity: clamp01(s * 3) }}>
              {w}
            </span>
          );
        })}
      </div>
      {frame >= word("n05", "oʻzimizga") ? (
        <div style={{ marginTop: 18, ...big(74), transform: `scale(${interpolate(pop(frame, word("n05", "oʻzimizga"), 380, 14), [0, 1], [1.6, 1])})`, transformOrigin: "0 50%" }}>oʻzimizga esa</div>
      ) : null}
      {frame >= word("n05", "ellik") ? (
        <div style={{ marginTop: 14, ...big(96), position: "relative", zIndex: 0 }}>
          <Sweep at={word("n05", "qimmat")} color={RED} ink="#fff">
            59 000 — qimmat?
          </Sweep>
        </div>
      ) : null}
    </div>
  );
}

function BoxLabels() {
  const frame = useCurrentFrame();
  const at = T.n07.at;
  if (frame < at || frame >= end("n07") + 8) return null;
  const hurmat = word("n07", "Hurmat");
  const ozim = word("n07", "Oʻzim");
  const o = clamp01((frame - end("n07")) / 8);
  const meter = (start: number, to: number, color: string) => {
    const p = ease(clamp01((frame - start) / 18)) * to;
    return (
      <div style={{ width: 320, height: 34, borderRadius: 17, background: "rgba(0,0,0,0.55)", border: "4px solid rgba(255,255,255,0.8)", overflow: "hidden", marginTop: 12 }}>
        <div style={{ width: `${p * 100}%`, height: "100%", background: color }} />
      </div>
    );
  };
  return (
    <div style={{ opacity: 1 - o }}>
      {frame >= hurmat ? (
        <Slam at={hurmat} rot={-3} style={{ left: 70, top: 470 }}>
          <Chip bg={GREEN} fg={INK} size={52}>
            HURMAT
          </Chip>
          {meter(hurmat + 4, 1, GREEN)}
          <div style={{ ...label(34, GREEN), marginTop: 8 }}>
            <CountUp at={hurmat + 4} dur={18} from={0} suffix="%" to={100} />
          </div>
        </Slam>
      ) : null}
      {frame >= ozim ? (
        <Slam at={ozim} rot={3} style={{ left: 600, top: 470 }}>
          <Chip bg="#8E89A0" size={52}>
            OʻZIM UCHUN
          </Chip>
          {meter(ozim + 4, 0.02, RED)}
          <div style={{ ...label(34, RED), marginTop: 8 }}>0%</div>
        </Slam>
      ) : null}
    </div>
  );
}

function PriceBars() {
  const frame = useCurrentFrame();
  const at = T.n09.at - 2;
  if (frame < at || frame >= end("n09") + 8) return null;
  const o = clamp01((frame - end("n09")) / 8);
  return (
    <AbsoluteFill style={{ opacity: 1 - o, background: "rgba(10,7,18,0.6)" }}>
      <Slam at={at} from={1.3} rot={0} style={{ left: 110, top: 300 }}>
        <div style={big(68)}>1 oylik narx</div>
      </Slam>
      <Bar at={at + 4} color={ORANGE} label="CHOYXONADA BITTA TUSHLIK" max={70_000} sub="taxminan · Toshkent, 2026" value={70_000} y={470} />
      <Bar at={word("n09", "Korio")} color={PURPLE} label="KORIO SUPER · 30 KUN" max={70_000} value={59_000} y={760} />
      {frame >= word("n09", "arzon.") - 4 ? <Stamp at={word("n09", "arzon.") - 4} color={GREEN} rot={-8} size={110} text="ARZON!" x={720} y={1180} /> : null}
    </AbsoluteFill>
  );
}

function BusTicket() {
  const frame = useCurrentFrame();
  const at = T.n10.at;
  if (frame < at || frame >= end("n10") + 8) return null;
  const o = clamp01((frame - end("n10")) / 8);
  const perDay = word("n10", "kuniga");
  const bus = word("n10", "Avtobus");
  const tear = ease(clamp01((frame - word("n10", "yarmi.")) / 10));
  return (
    <div style={{ opacity: 1 - o }}>
      <Slam at={at + 2} rot={-3} style={{ left: 60, top: 640 }}>
        <Chip bg={PURPLE} size={48}>
          1 YIL · 449 000 soʻm
        </Chip>
      </Slam>
      {frame >= perDay ? (
        <Slam at={perDay} rot={-2} style={{ left: 60, top: 750 }}>
          <div style={big(56)}>kuniga</div>
          <div style={big(140, YELLOW)}>
            <CountUp at={perDay} dur={20} from={0} to={1230} /> <span style={{ fontSize: 60 }}>soʻm</span>
          </div>
        </Slam>
      ) : null}
      {frame >= bus ? (
        <div style={{ position: "absolute", left: 120, top: 1010, transform: `scale(${pop(frame, bus, 320, 14)}) rotate(-4deg)` }}>
          {[0, 1].map((half) => (
            <div key={half} style={{ position: "absolute", left: half * 400, top: 0, width: 400, height: 230, overflow: "hidden", transform: `translate(${half * tear * 90}px, ${half * tear * 40}px) rotate(${half * tear * 12}deg)` }}>
              <div style={{ position: "absolute", left: -half * 400, width: 800, height: 230, background: "#FFE9A8", borderRadius: 22, boxShadow: "0 16px 30px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "space-around", fontFamily: HEAVY, color: INK }}>
                <div style={{ fontSize: 40, letterSpacing: 2 }}>AVTOBUS</div>
                <div style={{ fontSize: 86 }}>2 500</div>
              </div>
            </div>
          ))}
          {tear > 0.4 ? (
            <div style={{ position: "absolute", left: 0, top: 250, opacity: clamp01((tear - 0.4) * 3) }}>
              <Chip bg={GREEN} fg={INK} size={46}>
                ½ chipta = 1 kunlik KORIO
              </Chip>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Scale() {
  const frame = useCurrentFrame();
  const at = T.n11.at;
  if (frame < at || frame >= end("n11") + 8) return null;
  const o = clamp01((frame - end("n11")) / 8);
  const settle = word("n11", "deyarli");
  const tilt = interpolate(frame, [at, settle, settle + 20], [-16, -16, -2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const wob = frame > settle ? Math.sin((frame - settle) / 3) * 3 * Math.exp(-(frame - settle) / 14) : 0;
  const ang = tilt + wob;
  const rad = (ang * Math.PI) / 180;
  const cx = 540;
  const cy = 820;
  const L = 330;
  const lx = cx - Math.cos(rad) * L;
  const ly = cy - Math.sin(rad) * L;
  const rx = cx + Math.cos(rad) * L;
  const ry = cy + Math.sin(rad) * L;
  const pan = (x: number, y: number, top: string, bottom: string, color: string) => (
    <div style={{ position: "absolute", left: x - 180, top: y, width: 360, textAlign: "center" }}>
      <div style={{ height: 120, borderLeft: "4px solid #EED9A8", borderRight: "4px solid #EED9A8", margin: "0 60px" }} />
      <div style={{ background: color, borderRadius: "0 0 180px 180px", padding: "20px 10px 34px", boxShadow: "0 16px 30px rgba(0,0,0,0.45)" }}>
        <div style={{ fontFamily: HEAVY, fontSize: 54, color: "#fff" }}>{top}</div>
        <div style={{ fontFamily: BOLD, fontWeight: 800, fontSize: 28, color: "rgba(255,255,255,0.9)" }}>{bottom}</div>
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity: 1 - o, background: "rgba(10,7,18,0.55)" }}>
      <svg height={H} style={{ position: "absolute", inset: 0 }} viewBox={`0 0 ${W} ${H}`} width={W}>
        <rect fill="#EED9A8" height={560} rx={12} width={24} x={cx - 12} y={cy} />
        <rect fill="#EED9A8" height={30} rx={15} width={300} x={cx - 150} y={cy + 540} />
        <line stroke="#EED9A8" strokeLinecap="round" strokeWidth={22} x1={lx} x2={rx} y1={ly} y2={ry} />
        <circle cx={cx} cy={cy} fill={YELLOW} r={26} />
      </svg>
      {pan(lx, ly, "410 000", "1 kunlik saxovat", "#2E9F62")}
      {pan(rx, ry, "449 000", "1 yillik KORIO", PURPLE)}
      <Slam at={at + 2} from={1.3} rot={-2} style={{ left: 0, right: 0, top: 260, textAlign: "center" }}>
        <div style={big(70)}>1 kun = deyarli 1 yil</div>
      </Slam>
    </AbsoluteFill>
  );
}

function MaxPanel() {
  const frame = useCurrentFrame();
  const at = T.n14.at;
  if (frame < at || frame >= end("n14") + 8) return null;
  const o = clamp01((frame - end("n14")) / 8);
  const cmp = word("n14", "Oylik");
  return (
    <div style={{ opacity: 1 - o }}>
      <Slam at={at} from={2.4} out={cmp - 4} rot={-6} style={{ left: 60, top: 960 }}>
        <div style={{ display: "inline-block", background: `linear-gradient(135deg, ${YELLOW}, ${ORANGE})`, borderRadius: 26, padding: "10px 34px", fontFamily: HEAVY, fontSize: 110, color: INK, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>MAX</div>
      </Slam>
      <Slam at={word("n14", "ustoz")} out={cmp - 4} rot={-2} style={{ left: 60, top: 1110 }}>
        <div style={big(60)}>AI ustoz bilan suhbat</div>
        <div style={{ marginTop: 12 }}>
          <Chip bg={PURPLE} size={44}>
            har kuni 1 soatgacha
          </Chip>
        </div>
      </Slam>
      {frame >= cmp ? (
        <AbsoluteFill style={{ background: `rgba(10,7,18,${0.55 * clamp01((frame - cmp) / 8)})` }}>
          <Bar at={cmp} color="#4A90D9" label="OYLIK AVTOBUS KARTASI" max={250_000} value={250_000} y={760} />
          <Bar at={word("n14", "ikki")} color={ORANGE} label="KORIO MAX · 1 OY" max={250_000} sub="yillik olsangiz — oyiga 95 000" value={129_000} y={1010} />
          {frame >= word("n14", "arzon.") - 4 ? <Stamp at={word("n14", "arzon.") - 4} color={GREEN} rot={-8} size={92} text="2× ARZON" x={700} y={1250} /> : null}
        </AbsoluteFill>
      ) : null}
    </div>
  );
}

function FirstCoin() {
  const frame = useCurrentFrame();
  const at = T.n15.at;
  if (frame < at || frame >= end("n15") + 8) return null;
  const o = clamp01((frame - end("n15")) / 8);
  const drop = word("n15", "pul");
  return (
    <div style={{ opacity: 1 - o }}>
      <Slam at={word("n15", "oʻzim")} rot={-3} style={{ left: 40, top: 800 }}>
        <Chip bg="#8E89A0" size={50}>
          OʻZIM UCHUN
        </Chip>
        <div style={{ width: 330, height: 34, borderRadius: 17, background: "rgba(0,0,0,0.55)", border: "4px solid rgba(255,255,255,0.8)", overflow: "hidden", marginTop: 12 }}>
          <div style={{ width: `${ease(clamp01((frame - drop) / 24)) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${YELLOW}, ${GREEN})` }} />
        </div>
      </Slam>
      {/* 반짝이 */}
      {frame >= drop
        ? Array.from({ length: 26 }, (_, i) => {
            const t = (frame - drop - i * 0.6) / 30;
            if (t < 0 || t > 1) return null;
            const ang = random(`a${i}`) * Math.PI - Math.PI;
            const dist = 120 + random(`d${i}`) * 360;
            return <div key={i} style={{ position: "absolute", left: 760 + Math.cos(ang) * dist * t, top: 1150 + Math.sin(ang) * dist * t, width: 14, height: 14, borderRadius: 7, background: i % 2 ? YELLOW : "#fff", boxShadow: "0 0 16px rgba(255,220,120,0.9)", opacity: 1 - t }} />;
          })
        : null}
    </div>
  );
}

function Huh({ at, x, y }: { at: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const s = pop(frame, at + i * 5, 420, 10);
        return (
          <div key={i} style={{ position: "absolute", left: x + i * 76, top: y - (i === 1 ? 44 : 0) + Math.sin((frame - at) / 5 + i) * 8, ...big(120, YELLOW), transform: `scale(${s}) rotate(${(i - 1) * 14}deg)` }}>
            ?
          </div>
        );
      })}
    </>
  );
}

// ── 끝 화면: 요금표 + 실제 요금제 화면 + 보내기 ──
function EndCard() {
  const frame = useCurrentFrame();
  const at = T.n18.at - 6;
  const rows = [
    { t: "1 oy", p: "59 000", d: "" },
    { t: "3 oy", p: "155 000", d: "−12%" },
    { t: "6 oy", p: "279 000", d: "−21%" },
    { t: "1 yil", p: "449 000", d: "kuniga 1 230", best: true },
  ];
  const phone = pop(frame, at + 2, 160, 16);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 25%, #4B3BC9 0%, ${PURPLE_DEEP} 45%, #120D2A 100%)` }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2.5px)", backgroundSize: "56px 56px", transform: `translate(${(frame % 56) * 0.5}px, ${(frame % 56) * 0.3}px)` }} />
      <Slam at={at + 2} from={1.5} rot={0} style={{ left: 0, right: 0, top: 150, textAlign: "center" }}>
        <div style={big(96, YELLOW)}>KORIO</div>
        <div style={{ ...big(44), marginTop: 10, letterSpacing: 0 }}>Koreys tili — oʻzbek tilida</div>
      </Slam>
      <div style={{ position: "absolute", left: 60, top: 400 + (1 - phone) * 600, width: 380, height: 822, borderRadius: 50, background: "#0B0A12", padding: 13, boxShadow: "0 0 60px rgba(255,210,63,0.25), 0 30px 70px rgba(0,0,0,0.55)", transform: `rotate(${(1 - phone) * -10 - 3}deg)` }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 38, overflow: "hidden" }}>
          <Sequence from={at} layout="none">
            <OffthreadVideo muted src={staticFile("clips/premium.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={60} />
          </Sequence>
        </div>
      </div>
      <div style={{ position: "absolute", left: 480, top: 420, width: 560, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ ...label(34, YELLOW), textShadow: "none" }}>SUPER</div>
        {rows.map((r, i) => {
          const s = pop(frame, at + 8 + i * 5, 380, 14);
          return (
            <div key={r.t} style={{ transform: `translateX(${(1 - s) * 400}px)`, opacity: clamp01(s * 2), background: r.best ? YELLOW : "rgba(255,255,255,0.1)", border: r.best ? "none" : "3px solid rgba(255,255,255,0.25)", borderRadius: 22, padding: "14px 22px", color: r.best ? INK : "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: HEAVY, fontSize: 40 }}>{r.t}</span>
                <span style={{ fontFamily: HEAVY, fontSize: 48 }}>{r.p}</span>
              </div>
              {r.d ? <div style={{ fontFamily: BOLD, fontWeight: 800, fontSize: 26, opacity: 0.85, textAlign: "right" }}>{r.d}</div> : null}
            </div>
          );
        })}
        <div style={{ ...label(34, YELLOW), textShadow: "none", marginTop: 12 }}>MAX</div>
        <div style={{ transform: `translateX(${(1 - pop(frame, at + 34, 380, 14)) * 400}px)`, background: `linear-gradient(135deg, ${YELLOW}, ${ORANGE})`, borderRadius: 22, padding: "14px 22px", color: INK }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: HEAVY, fontSize: 40 }}>1 oy</span>
            <span style={{ fontFamily: HEAVY, fontSize: 48 }}>129 000</span>
          </div>
          <div style={{ fontFamily: BOLD, fontWeight: 800, fontSize: 26, textAlign: "right" }}>+ AI ustoz har kuni</div>
        </div>
      </div>
      <Slam at={word("n18", "doʻstingizga")} rot={-2} style={{ left: 50, right: 50, top: 1290, textAlign: "center" }}>
        <div style={{ ...big(52), letterSpacing: 0, lineHeight: 1.2 }}>
          Buni hammaga toʻlab, oʻziga “qimmat” deydigan <span style={{ color: YELLOW }}>doʻstingizga yuboring</span>
        </div>
      </Slam>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1490, display: "flex", justifyContent: "center", gap: 18 }}>
        {["Android · Google Play", "iPhone · Telegram"].map((b, i) => (
          <div key={b} style={{ transform: `scale(${pop(frame, end("n18") + 4 + i * 5, 380, 12)})`, background: "#fff", color: INK, fontFamily: HEAVY, fontSize: 34, padding: "14px 24px", borderRadius: 18, boxShadow: "0 10px 24px rgba(0,0,0,0.4)" }}>
            {b}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

// ── 자막: 내레이터만 (등장인물은 말풍선) ──
type Chunk = { words: { w: string; at: number }[] };
const CHUNKS: Record<string, Chunk[]> = {};
for (const key of LINE_KEYS) {
  const line = timing.lines[key] as { voice: string; words?: { w: string; s: number }[] };
  if (line.voice !== "nar" || !line.words) continue;
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
  if (frame >= T.n18.at - 6) return null;
  const key = LINE_KEYS.find((k) => CHUNKS[k] && frame >= T[k].at - 2 && frame < T[k].at + T[k].len + 6);
  if (!key) return null;
  const chunks = CHUNKS[key];
  const chunk = [...chunks].reverse().find((c) => frame >= c.words[0].at - 3) ?? chunks[0];
  const current = [...chunk.words].reverse().find((w) => frame >= w.at);
  const s = pop(frame, chunk.words[0].at - 3, 420, 18);
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1380, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(12,8,5,0.66)", borderRadius: 22, padding: "14px 30px", maxWidth: 980, textAlign: "center", fontFamily: BOLD, fontWeight: 800, fontSize: 62, lineHeight: 1.2, color: "#fff", transform: `scale(${0.92 + 0.08 * s})` }}>
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

// ── 필름 결 · 빛 번짐 · 비네트 · 섬광 ──
function Finish() {
  const frame = useCurrentFrame();
  const flashes = SHOTS.filter((s) => s.trans === "flash").map((s) => s.at);
  const fl = flashes.reduce((m, t) => (frame >= t && frame < t + 10 ? Math.max(m, 1 - (frame - t) / 10) : m), 0);
  const leak = 0.18 + 0.12 * Math.sin(frame / 40);
  return (
    <>
      <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(circle at ${30 + Math.sin(frame / 90) * 25}% ${20 + Math.cos(frame / 70) * 10}%, rgba(255,170,80,${leak}) 0%, transparent 45%)` }} />
      <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(8,5,3,0.5) 100%)" }} />
      <AbsoluteFill style={{ pointerEvents: "none", opacity: 0.07, mixBlendMode: "overlay" }}>
        <svg height="100%" width="100%">
          <filter id="grain">
            <feTurbulence baseFrequency="0.9" numOctaves="2" seed={frame % 9} type="fractalNoise" />
          </filter>
          <rect filter="url(#grain)" height="100%" width="100%" />
        </svg>
      </AbsoluteFill>
      {fl > 0 ? <AbsoluteFill style={{ background: `rgba(255,248,235,${fl * 0.85})`, pointerEvents: "none" }} /> : null}
    </>
  );
}

// ── 소리 ──
/** 대사가 나오는 동안 1, 쉬는 동안 0 — 가장자리는 6프레임에 걸쳐 */
function speaking(g: number) {
  let v = 0;
  for (const k of LINE_KEYS) {
    const a = T[k].at - 4;
    const b = end(k) + 4;
    v = Math.max(v, Math.min(clamp01((g - a + 6) / 6), clamp01((b + 6 - g) / 6)));
  }
  return v;
}
/**
 * 배경(음악·현장음) — volume 은 말소리 밑의 크기. 대사가 없을 때만 두 배로 올라온다 (자동 덕킹).
 * 음악 파일마다 크기가 달라 volume 은 파일 평균 음량에 맞춰 정했다 (말소리 평균보다 약 17dB 아래).
 */
function Bed({ src, from, to, volume, fade = 30 }: { src: string; from: number; to: number; volume: number; fade?: number }) {
  return (
    <Sequence durationInFrames={Math.max(1, to - from)} from={Math.max(0, from)} layout="none">
      <Audio loop src={staticFile(src)} volume={(f) => volume * (2 - speaking(from + f)) * Math.min(clamp01(f / fade), clamp01((to - from - f) / fade))} />
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
const A = (n: string) => `ai/tolayman/${n}.mp3`;
const HITS: { at: number; src: string; volume?: number }[] = [];
function Sounds() {
  return (
    <>
      <Bed from={0} src={A("m1")} to={T.n05.at + 10} volume={0.11} />
      <Bed from={T.n05.at - 10} src={A("m2")} to={T.c05.at + 10} volume={0.055} />
      <Bed from={T.c05.at - 10} src={A("m3")} to={T.n15.at + 10} volume={0.06} />
      <Bed from={T.n15.at - 10} src={A("m4")} to={TOLAYMAN_TOTAL} volume={0.055} />
      <Bed from={0} src={A("sfx-choyxona")} to={T.n02.at} volume={0.07} />
      <Bed from={T.n03.at - 6} src={A("sfx-choyxona")} to={word("n03", "kechqurun")} volume={0.05} />
      <Bed from={word("n03", "kechqurun") - 4} src={A("sfx-toy")} to={end("n04") + 6} volume={0.05} />
      <Bed from={T.c05.at - 4} src={A("sfx-choyxona")} to={T.n10.at} volume={0.04} />
      <Bed from={T.n16.at - 4} src={A("sfx-choyxona")} to={end("n17")} volume={0.06} />
      {HITS.map((h, i) => (
        <Hit key={`${h.src}-${h.at}-${i}`} {...h} />
      ))}
      {LINE_KEYS.map((k) => (
        <Sequence from={T[k].at} key={k} layout="none">
          <Audio src={staticFile(`ai/tolayman/${k}.mp3`)} volume={1.0} />
        </Sequence>
      ))}
    </>
  );
}

// 박자 · 흔들림 · 효과음 자리 (한곳에서 정한다)
{
  const kick = (t: number) => KICKS.push(t);
  const shake = (t: number) => SHAKES.push(t);
  const hit = (at: number, src: string, volume = 0.5) => HITS.push({ at, src: A(src), volume });
  [T.c01.at, T.c02.at + 4, word("c03", "men")].forEach((t) => {
    kick(t);
    shake(t);
    hit(t, "sfx-impact", 0.35);
  });
  hit(2, "sfx-cash", 0.5);
  hit(T.n01.at + 2, "sfx-receipt", 0.5);
  hit(word("n01", "oʻylamasdan."), "sfx-kaching", 0.55);
  kick(word("n01", "oʻylamasdan."));
  hit(word("n02", "kelganda…") + 12, "sfx-scratch", 0.5);
  hit(word("c04", "Ellik"), "sfx-boing", 0.4);
  hit(word("c04", "Qimmat-ku!"), "sfx-impact", 0.35);
  shake(word("c04", "Qimmat-ku!"));
  kick(word("c04", "Qimmat-ku!"));
  hit(word("n03", "tushlik"), "sfx-kaching", 0.4);
  hit(word("n03", "soldi."), "sfx-kaching", 0.4);
  kick(word("n04", "toʻrt"));
  hit(word("n04", "toʻrt"), "sfx-impact", 0.35);
  shake(word("n04", "toʻrt"));
  hit(word("n05", "qimmat"), "sfx-boing", 0.35);
  hit(word("n06", "Nobel"), "sfx-impact", 0.4);
  hit(word("n07", "Hurmat"), "sfx-coin", 0.35);
  hit(word("n07", "boʻm-boʻsh."), "sfx-boing", 0.35);
  hit(T.n08.at, "sfx-receipt", 0.45);
  hit(word("n09", "Korio"), "sfx-coin", 0.35);
  hit(word("n09", "arzon.") - 4, "sfx-impact", 0.35);
  shake(word("n09", "arzon.") - 4);
  hit(T.n10.at - 4, "sfx-bus", 0.35);
  hit(word("n10", "yarmi."), "sfx-receipt", 0.4);
  hit(word("n11", "deyarli"), "sfx-coin", 0.4);
  [word("n12", "ikki"), word("n12", "grammatika"), word("n13", "jonli"), word("n13", "yigirma")].forEach((t) => {
    kick(t);
    hit(t, "sfx-whip", 0.4);
  });
  hit(T.n14.at, "sfx-impact", 0.35);
  shake(T.n14.at);
  hit(word("n14", "arzon.") - 4, "sfx-impact", 0.35);
  hit(word("n15", "pul"), "sfx-coin", 0.6);
  hit(T.c08.at - 1, "sfx-impact", 0.35);
  kick(T.c08.at - 1);
  shake(T.c08.at - 1);
  hit(T.c09.at, "sfx-gasp", 0.45);
  hit(T.n18.at - 6, "sfx-kaching", 0.45);
  // 장면이 휙 넘어갈 때
  SHOTS.filter((s) => s.trans === "whip").forEach((s) => hit(s.at - 1, "sfx-whip", 0.2));
  SHOTS.filter((s) => s.trans === "punch").forEach((s) => kick(s.at));
}

export function TolaymanReel() {
  return (
    <AbsoluteFill style={{ background: "#0E0906", overflow: "hidden" }}>
      <Camera>
        {SHOTS.map((s, i) => (
          <ShotLayer key={s.key} next={SHOTS[i + 1]} shot={s} />
        ))}
      </Camera>
      <Overlays />
      <Subtitles />
      <Finish />
      <Sounds />
    </AbsoluteFill>
  );
}
