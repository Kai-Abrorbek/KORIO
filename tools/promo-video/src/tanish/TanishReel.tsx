/**
 * "12 000 $ yoki 28 $?" — 한국 취업 '아는 사람' 사기 vs 응시료 28달러 EPS-TOPIK (약 90초)
 *
 * 8블록: Hook(반 갈라: 달러 봉투 12 000 $ | 휴대폰 28 $) → Lead(택시 판 자수르 · 직접 신청한 마디나 · "누가 갔을까?" 10초 안)
 *   → Body1 검찰 발표(1인 7천~1만 2천 $, 약 9천만 $) → Open loop("판 것은 아예 없다") → Body2 EPS-TOPIK 의 실체(한국어 시험 · 온라인 · 28 $ · 보장 없음)
 *   → Open loop("직접 풀어 보세요") → Body3 EPS 스타일 문제 3개(우리가 만든 namuna) → 반전(마디나는 한국 공장, 자수르는 이제 공부) → CTA(앱 + 보내기)
 * 숫자 출처: Bosh prokuratura 2026-05 (gazeta.uz), Migratsiya agentligi EPS-TOPIK 2026 공지 (gov.uz). 인물은 이야기용.
 * 그림: 사용자가 ChatGPT 로 그린 17장(public/ai/tanish/k01–k17). 초록 휴대폰(k02 · k16)은 초록을 뚫은 -keyed.png 아래에 화면을 깐다.
 * 소리: audio/make-lines.mjs (내레이터 James, '아는 사람' Callum, 안내 음성 Matilda, 한국 사장님 Manbo) · ElevenLabs 음악 4토막 · 효과음.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import screens from "./screens.json";
import timing from "./tanish.words.json";

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
const INK = "#16121F";
const OUTLINE = "0 0 3px rgba(0,0,0,0.9), 0 4px 0 rgba(0,0,0,0.55), 0 10px 28px rgba(0,0,0,0.7)";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.45, 0, 0.25, 1);
const pop = (frame: number, at: number, stiffness = 280, damping = 13) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}ʻʼ']/gu, "");
const usd = (v: number) => `${String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;

// ── 타임라인 ──
type Key = keyof typeof timing.lines;
const QUIZ = 92; // 3-2-1 (20프레임씩) + 정답을 1초쯤 보여 준다
const ORDER: { key: string; gap: number; pause?: number }[] = [
  { key: "n01", gap: 3 }, // Hook
  { key: "n02", gap: 8 }, // Lead
  { key: "t01", gap: 4 },
  { key: "n03", gap: 8 },
  { key: "n04", gap: 6 },
  { key: "n05", gap: 12 }, // Body 1
  { key: "n06", gap: 4 },
  { key: "n07", gap: 6 },
  { key: "n08", gap: 12 }, // Open loop 1
  { key: "n09", gap: 12 }, // Body 2
  { key: "n10", gap: 4 },
  { key: "n11", gap: 6 },
  { key: "op01", gap: 16 },
  { key: "n12", gap: 8 },
  { key: "n13", gap: 12 }, // Open loop 2
  { key: "n14", gap: 10 }, // Body 3 — 문제 1
  { key: "n15", gap: QUIZ }, // 문제 2
  { key: "n16", gap: QUIZ }, // 문제 3
  { key: "k01", gap: 6 },
  { key: "n17", gap: 6 },
  { key: "n18", gap: QUIZ }, // 반전
  { key: "n19", gap: 8 },
  { key: "n20", gap: 12 }, // CTA
  { key: "n21", gap: 6 },
  { key: "end", gap: 0, pause: 75 },
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
export const TANISH_TOTAL = T.end.at + T.end.len;
const end = (k: string) => T[k].at + T[k].len;
const LINE_KEYS = ORDER.map((s) => s.key).filter((k) => k in timing.lines) as Key[];
function word(key: Key, text: string) {
  const w = (timing.lines[key] as { words?: { w: string; s: number }[] }).words?.find((x) => norm(x.w) === norm(text));
  if (!w) throw new Error(`${key}: no word "${text}"`);
  return T[key].at + Math.round(w.s * FPS);
}
/** 문제마다: 카드가 뜨는 때 · 3-2-1 시작 · 정답 공개 · 사라지는 때 */
const quizAt = (ask: Key, next: string) => {
  const cd = end(ask) + 4;
  return { at: T[ask].at, cd, reveal: cd + 60, out: T[next].at - 2 };
};
const Q1 = quizAt("n14", "n15");
const Q2 = quizAt("n15", "n16");
const Q3 = quizAt("n17", "n18");

// ── 장면 ──
type Trans = "cut" | "whip" | "punch" | "flash";
type Shot = { key: string; src: string; at: number; trans: Trans; zoom?: [number, number]; pan?: [number, number] };
const SHOTS: Shot[] = [
  { key: "hook", src: "hook", at: 0, trans: "cut" },
  { key: "k03", src: "k03", at: T.n02.at - 3, trans: "whip", zoom: [1.04, 1.14], pan: [-20, 10] },
  { key: "k04a", src: "k04", at: word("n02", "pulni") - 3, trans: "punch", zoom: [1.1, 1.0] },
  { key: "k05a", src: "k05", at: T.n03.at - 3, trans: "whip", zoom: [1.0, 1.12], pan: [0, 20] },
  { key: "versus", src: "versus", at: T.n04.at - 3, trans: "flash" },
  { key: "k07", src: "k07", at: T.n05.at - 3, trans: "whip", zoom: [1.12, 1.02] },
  { key: "k06", src: "k06", at: T.n06.at - 3, trans: "punch", zoom: [1.0, 1.12], pan: [0, -20] },
  { key: "k04b", src: "k04", at: T.n08.at - 3, trans: "whip", zoom: [1.05, 1.4], pan: [-150, -270] }, // 봉투로 다가간다
  { key: "k10", src: "k10", at: T.n09.at - 3, trans: "flash", zoom: [1.02, 1.14] },
  { key: "k09", src: "k09", at: T.n11.at - 3, trans: "whip", zoom: [1.0, 1.1], pan: [-20, 0] },
  { key: "k08", src: "k08", at: T.op01.at - 14, trans: "punch", zoom: [1.12, 1.0] },
  { key: "board", src: "board", at: T.n13.at - 3, trans: "flash" },
  { key: "k11", src: "k11", at: Q1.at - 3, trans: "whip", zoom: [1.0, 1.06] },
  { key: "k12", src: "k12", at: Q2.at - 3, trans: "whip", zoom: [1.0, 1.06] },
  { key: "k13", src: "k13", at: T.n16.at - 3, trans: "whip", zoom: [1.0, 1.08] },
  { key: "k05b", src: "k05", at: T.n18.at - 3, trans: "flash", zoom: [1.1, 1.0] },
  { key: "k02", src: "k02", at: word("n18", "har") - 3, trans: "whip", zoom: [1.0, 1.08] },
  { key: "k14", src: "k14", at: T.n19.at - 3, trans: "whip", zoom: [1.06, 1.0] },
  { key: "k15", src: "k15", at: word("n19", "kaskani") - 3, trans: "punch", zoom: [1.0, 1.1] },
  { key: "k16", src: "k16", at: word("n19", "Jasur") - 3, trans: "whip", zoom: [1.0, 1.08] },
  { key: "endcard", src: "endcard", at: T.n20.at - 4, trans: "flash" },
];
/** 초록 휴대폰 화면에 깔 것 — 앱 녹화(public/clips) 또는 우리가 그린 화면 */
const SCREEN_CLIPS: Record<string, { src: string; trim: number }> = {
  k02: { src: "lesson", trim: 0 },
  k16: { src: "speaking", trim: 0 },
};

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

/** 그림 한 장 — 초록을 뚫은 것은 png */
function Pic({ name, style }: { name: string; style?: CSSProperties }) {
  return <Img src={staticFile(`ai/tanish/${name}.${name.endsWith("-keyed") ? "png" : "webp"}`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }} />;
}

/** 문제 3 의 시계(정답 8시)는 정답 공개 때까지 화면 위로 밀어 두었다가 내려 보여 준다 */
function clockTilt(frame: number) {
  const p = ease(clamp01((frame - Q3.reveal) / 20));
  return `translateY(${-420 * (1 - p)}px) scale(${1.5 - 0.5 * p})`;
}

/** 반전: 1번 문제의 안전모를 쓴 마디나 — 안전모에 노란 고리 */
function HelmetRing() {
  const frame = useCurrentFrame();
  const at = word("n19", "kaskani") + 4;
  if (frame < at) return null;
  const s = pop(frame, at, 300, 12);
  const pulse = 1 + 0.04 * Math.sin((frame - at) / 4);
  return <div style={{ position: "absolute", left: 316 - 230, top: 360 - 160, width: 460, height: 320, borderRadius: "50%", border: `12px solid ${YELLOW}`, boxShadow: "0 0 30px rgba(255,210,63,0.7)", transform: `scale(${s * pulse}) rotate(-8deg)`, opacity: clamp01(s * 2) }} />;
}

function ShotLayer({ shot, next }: { shot: Shot; next?: Shot }) {
  const frame = useCurrentFrame();
  const stop = next ? next.at + 9 : TANISH_TOTAL;
  if (frame < shot.at - 1 || frame >= stop) return null;
  const local = frame - shot.at;
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
  if (next && next.trans === "whip" && frame >= next.at) {
    const q = ease(clamp01((frame - next.at) / 8));
    tx -= q * W * 0.45;
    blur += q * 28;
  }
  const t = clamp01(local / Math.max(1, stop - shot.at));
  const [z0, z1] = shot.zoom ?? [1, 1.08];
  const [px, py] = shot.pan ?? [0, 0];
  const z = interpolate(ease(t), [0, 1], [z0, z1]);
  const special: Record<string, ReactNode> = { hook: <Hook />, versus: <Versus />, board: <Board />, endcard: <EndCard /> };
  return (
    <AbsoluteFill style={{ opacity: op, transform: `translateX(${tx}px) scale(${sc})`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
      {special[shot.src] ?? (
        <AbsoluteFill style={{ transform: shot.src === "k13" ? clockTilt(frame) : `scale(${z}) translate(${px * t}px, ${py * t}px)` }}>
          {SCREEN_CLIPS[shot.src] ? <PhoneScreen from={shot.at} name={shot.src as keyof typeof screens} /> : null}
          <Pic name={SCREEN_CLIPS[shot.src] ? `${shot.src}-keyed` : shot.src} />
          {shot.src === "k12" ? <SignText /> : null}
          {shot.src === "k15" ? <HelmetRing /> : null}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/** 초록 화면 자리 — 그림(초록을 뚫은 것)이 위에 덮여 손가락은 앞에 남는다 */
function PhoneScreen({ name, from, children }: { name: keyof typeof screens; from: number; children?: ReactNode }) {
  const quad = screens[name].quad;
  const [tl, tr, , bl] = quad;
  const cx = quad.reduce((s, p) => s + p[0], 0) / 4;
  const cy = quad.reduce((s, p) => s + p[1], 0) / 4;
  const w = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]) * 1.14;
  const h = Math.hypot(bl[0] - tl[0], bl[1] - tl[1]) * 1.06;
  const angle = (Math.atan2(tr[1] - tl[1], tr[0] - tl[0]) * 180) / Math.PI;
  const clip = SCREEN_CLIPS[name];
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, transform: `rotate(${angle}deg)`, overflow: "hidden", background: "#fff" }}>
      {children ?? (
        <Sequence from={from} layout="none">
          <OffthreadVideo muted src={staticFile(`clips/${clip.src}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} trimBefore={clip.trim} />
        </Sequence>
      )}
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

function CountUp({ at, dur, to }: { at: number; dur: number; to: number }) {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [at, at + dur], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return <span>{usd(v)}</span>;
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

function Bubble({ at, out, x, y, children, tail = "left", bg = "#fff", color = INK, size = 52 }: { at: number; out: number; x: number; y: number; children: ReactNode; tail?: "left" | "right"; bg?: string; color?: string; size?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out + 8) return null;
  const s = pop(frame, at, 420, 12);
  const o = clamp01((frame - out) / 8);
  const wob = Math.sin((frame - at) * 1.9) * 3 * Math.exp(-(frame - at) / 12);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${wob}deg) scale(${s * (1 - o * 0.4)})`, transformOrigin: tail === "left" ? "12% 100%" : "88% 100%", opacity: 1 - o }}>
      <div style={{ position: "relative", background: bg, color, borderRadius: 36, padding: "18px 32px", fontFamily: HEAVY, fontSize: size, whiteSpace: "nowrap", boxShadow: "0 14px 34px rgba(0,0,0,0.45)", textAlign: "center" }}>
        {children}
        <div style={{ position: "absolute", bottom: -24, [tail === "left" ? "left" : "right"]: 46, width: 0, height: 0, borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderTop: `28px solid ${bg}` } as CSSProperties} />
      </div>
    </div>
  );
}

function Stamp({ at, out, text, x, y, color = RED, size = 120, rot = -12 }: { at: number; out?: number; text: string; x: number; y: number; color?: string; size?: number; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 8)) return null;
  const s = pop(frame, at, 520, 16);
  const o = out !== undefined ? clamp01((frame - out) / 8) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${interpolate(s, [0, 1], [2.6, 1])})`, opacity: clamp01(s * 4) * (1 - o) }}>
      <div style={{ border: `${size * 0.08}px solid ${color}`, borderRadius: size * 0.16, padding: `${size * 0.06}px ${size * 0.22}px`, fontFamily: HEAVY, fontSize: size, color, lineHeight: 1, letterSpacing: 2, whiteSpace: "nowrap", background: "rgba(255,255,255,0.12)", textShadow: "0 2px 0 rgba(0,0,0,0.25)" }}>{text}</div>
    </div>
  );
}

/** 출처 배지 — 숫자가 나오는 장면마다 */
function Source({ at, out, text }: { at: number; out: number; text: string }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out + 6) return null;
  const s = pop(frame, at, 300, 18);
  return (
    <div style={{ position: "absolute", left: 60, top: 1270, opacity: clamp01(s * 2) * (1 - clamp01((frame - out) / 6)), transform: `translateX(${(1 - s) * -80}px)` }}>
      <Chip bg="rgba(10,8,14,0.78)" fg="#E6E1F0" size={28} style={{ border: "2px solid rgba(255,255,255,0.3)", fontFamily: BOLD, fontWeight: 800 }}>
        Manba: {text}
      </Chip>
    </div>
  );
}

// ── Hook: 반 갈라 (12 000 $ | 28 $) ──
function ReceiptScreen() {
  const frame = useCurrentFrame();
  const s = pop(frame, 6, 260, 16);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #F4F1FF, #FFFFFF)", alignItems: "center", justifyContent: "center", gap: 18, fontFamily: HEAVY, color: INK, padding: 24, textAlign: "center" }}>
      <div style={{ fontFamily: BOLD, fontWeight: 800, fontSize: 30, color: "#5B5470" }}>Imtihon toʻlovi</div>
      <div style={{ fontSize: 120, color: PURPLE, transform: `scale(${0.6 + 0.4 * s})` }}>28 $</div>
      <div style={{ background: GREEN, color: INK, borderRadius: 999, padding: "8px 26px", fontSize: 30, opacity: clamp01((frame - 16) / 6) }}>Toʻlandi</div>
    </AbsoluteFill>
  );
}

function Hook() {
  const frame = useCurrentFrame();
  const draw = ease(clamp01(frame / 10));
  const push = interpolate(frame, [0, T.n02.at], [1.08, 1.0]);
  return (
    <AbsoluteFill style={{ background: "#0E0906" }}>
      <AbsoluteFill style={{ clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }}>
        <AbsoluteFill style={{ left: -160, transform: `scale(${push})` }}>
          <Pic name="k01" />
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }}>
        <AbsoluteFill style={{ left: 180, transform: `scale(${push})` }}>
          <PhoneScreen from={0} name="k02">
            <ReceiptScreen />
          </PhoneScreen>
          <Pic name="k02-keyed" />
        </AbsoluteFill>
      </AbsoluteFill>
      <svg height={H} style={{ position: "absolute", inset: 0 }} viewBox={`0 0 ${W} ${H}`} width={W}>
        <line stroke={YELLOW} strokeLinecap="round" strokeWidth={12} x1={W * 0.62} x2={W * 0.62 - W * 0.24 * draw} y1={0} y2={H * draw} />
      </svg>
      <Slam at={2} rot={-4} style={{ left: 50, top: 230 }}>
        <div style={{ ...label(34, "#fff") }}>TANISH ORQALI</div>
        <div style={{ ...big(150, RED), marginTop: 6 }}>12 000 $</div>
      </Slam>
      <Slam at={word("n01", "yigirma") - 2} rot={4} style={{ right: 50, top: 1150, textAlign: "right" }}>
        <div style={{ ...label(34, "#fff") }}>IMTIHON</div>
        <div style={{ ...big(150, GREEN), marginTop: 6 }}>28 $</div>
      </Slam>
    </AbsoluteFill>
  );
}

// ── "Qaysi biri?" 위아래 반 갈라 ──
function Versus() {
  const frame = useCurrentFrame();
  const at = T.n04.at;
  const split = ease(clamp01((frame - at + 3) / 10));
  const q = pop(frame, word("n04", "Qaysi"), 360, 10);
  return (
    <AbsoluteFill style={{ background: "#0E0906" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: H / 2 - 6, overflow: "hidden", transform: `translateX(${(1 - split) * -W}px)` }}>
        <Pic name="k04" style={{ height: H, top: -200 }} />
        <div style={{ position: "absolute", left: 50, top: 200 }}>
          <Chip bg={RED} size={56}>12 000 $</Chip>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: H / 2 - 6, overflow: "hidden", transform: `translateX(${(1 - split) * W}px)` }}>
        <Pic name="k05" style={{ height: H, top: -250 }} />
        <div style={{ position: "absolute", right: 50, top: 40 }}>
          <Chip bg={GREEN} fg={INK} size={56}>28 $</Chip>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: H / 2 - 6, height: 12, background: YELLOW }} />
      {frame >= word("n04", "Qaysi") ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: H / 2 - 110, textAlign: "center", transform: `scale(${q}) rotate(${(1 - q) * -8}deg)` }}>
          <span style={{ ...big(150, YELLOW), background: INK, padding: "8px 40px", borderRadius: 30, textShadow: "none", border: `8px solid ${YELLOW}` }}>QAYSI BIRI?</span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
}

// ── 문제판 (Open loop 2) ──
function Board() {
  const frame = useCurrentFrame();
  const at = T.n13.at;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #4B3BC9 0%, ${PURPLE_DEEP} 50%, #120D2A 100%)` }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2.5px)", backgroundSize: "56px 56px", transform: `translate(${(frame % 56) * 0.5}px, ${(frame % 56) * 0.3}px)` }} />
      <Slam at={at + 2} from={2} rot={-3} style={{ left: 0, right: 0, top: 360, textAlign: "center" }}>
        <div style={big(180, YELLOW)}>3 TA SAVOL</div>
      </Slam>
      <div style={{ position: "absolute", left: 0, right: 0, top: 620, display: "flex", justifyContent: "center", gap: 36 }}>
        {[1, 2, 3].map((n, i) => (
          <div key={n} style={{ width: 200, height: 200, borderRadius: 40, background: "rgba(255,255,255,0.1)", border: "5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(frame, at + 12 + i * 6, 380, 12)})`, ...big(110) }}>
            {n}
          </div>
        ))}
      </div>
      <Slam at={word("n13", "Oʻzingiz")} rot={2} style={{ left: 0, right: 0, top: 920, textAlign: "center" }}>
        <Chip bg="#fff" fg={INK} size={64}>Oʻzingiz sinab koʻring</Chip>
      </Slam>
      <Slam at={word("n13", "Oʻzingiz") + 10} style={{ left: 0, right: 0, top: 1090, textAlign: "center" }} rot={0}>
        <div style={{ ...label(32, "#D9D2EA"), letterSpacing: 2 }}>EPS-TOPIK uslubidagi namuna savollar</div>
      </Slam>
    </AbsoluteFill>
  );
}

// ── 문제 카드 (보기 4개 · 3-2-1 · 정답) ──
function Quiz({ n, q, ask, opts, correct, ko = false }: { n: number; q: { at: number; cd: number; reveal: number; out: number }; ask: string; opts: string[]; correct: number; ko?: boolean }) {
  const frame = useCurrentFrame();
  if (frame < q.at || frame >= q.out + 8) return null;
  const o = clamp01((frame - q.out) / 8);
  const head = pop(frame, q.at, 300, 16);
  const left = frame >= q.cd && frame < q.reveal ? 3 - Math.floor((frame - q.cd) / 20) : null;
  const ring = frame >= q.cd ? clamp01((frame - q.cd) / 60) : 0;
  const shown = frame >= q.reveal;
  return (
    <AbsoluteFill style={{ opacity: 1 - o }}>
      <div style={{ position: "absolute", left: 50, top: 150, transform: `translateY(${(1 - head) * -160}px)` }}>
        <Chip bg={YELLOW} fg={INK} size={44}>{n} / 3</Chip>
      </div>
      <div style={{ position: "absolute", left: 50, right: 200, top: 240, transform: `translateY(${(1 - head) * -160}px)`, opacity: 1 - clamp01((frame - q.reveal - 4) / 8), ...big(72), letterSpacing: -1, lineHeight: 1.1 }}>{ask}</div>
      {frame >= q.cd ? (
        <div style={{ position: "absolute", right: 50, top: 150, width: 130, height: 130 }}>
          <svg height={130} viewBox="0 0 130 130" width={130}>
            <circle cx={65} cy={65} fill="rgba(14,10,22,0.8)" r={60} />
            <circle cx={65} cy={65} fill="none" r={52} stroke={shown ? GREEN : YELLOW} strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={`${2 * Math.PI * 52 * ring}`} strokeLinecap="round" strokeWidth={10} transform="rotate(-90 65 65)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...big(64, shown ? GREEN : "#fff"), textShadow: "none" }}>
            {left ?? (shown ? "✓" : "")}
          </div>
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 50, right: 50, top: 1120, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {opts.map((t, i) => {
          const s = pop(frame, q.at + 10 + i * 4, 380, 14);
          const right = shown && i === correct;
          const dim = shown && i !== correct;
          return (
            <div key={t} style={{ transform: `scale(${s * (right ? 1 + 0.06 * pop(frame, q.reveal, 400, 10) : 1)})`, opacity: dim ? 0.35 : 1, background: right ? GREEN : "rgba(255,255,255,0.94)", color: INK, borderRadius: 28, padding: "22px 26px", display: "flex", alignItems: "center", gap: 18, boxShadow: "0 12px 30px rgba(0,0,0,0.45)", border: right ? "6px solid #fff" : "6px solid transparent" }}>
              <span style={{ width: 58, height: 58, borderRadius: 999, background: right ? "#fff" : PURPLE, color: right ? INK : "#fff", fontFamily: HEAVY, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{i + 1}</span>
              <span style={{ fontFamily: ko ? KO : HEAVY, fontWeight: 900, fontSize: ko ? 56 : 48, whiteSpace: "nowrap" }}>{t}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/** 문제 2 의 표지판 글자 — 그림(k12)의 빈 흰 판 자리 */
const SIGN = { x: 558, y: 641, w: 470, h: 214 };
function SignText() {
  const frame = useCurrentFrame();
  if (frame < Q2.at - 3 || frame >= Q2.out + 8) return null;
  return (
    <div style={{ position: "absolute", left: SIGN.x - SIGN.w / 2, top: SIGN.y - SIGN.h / 2, width: SIGN.w, height: SIGN.h, display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F7F2", border: `10px solid ${RED}`, borderRadius: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
      <span style={{ fontFamily: KO, fontWeight: 900, fontSize: 88, color: RED, letterSpacing: 4, whiteSpace: "nowrap" }}>출입 금지</span>
    </div>
  );
}

/** 문제 3: 한국어 음성이 나오는 동안 소리 막대, 정답 뒤 문장과 뜻 */
function Listen() {
  const frame = useCurrentFrame();
  const from = T.n16.at;
  if (frame < from || frame >= Q3.out + 8) return null;
  const talking = frame >= T.k01.at && frame < end("k01");
  const shown = frame >= Q3.reveal;
  return (
    <>
      {!shown ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 520, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, height: 260 }}>
          {Array.from({ length: 15 }, (_, i) => {
            const v = talking ? 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.55 + i * 1.7) * Math.cos(frame * 0.23 + i)) : 0.12;
            return <div key={i} style={{ width: 30, height: 40 + 220 * v, borderRadius: 15, background: YELLOW, boxShadow: "0 0 24px rgba(255,210,63,0.5)" }} />;
          })}
        </div>
      ) : (
        <Slam at={Q3.reveal} from={1.4} rot={0} style={{ left: 50, right: 50, top: 780 }}>
          <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 30, padding: "26px 30px", boxShadow: "0 14px 34px rgba(0,0,0,0.45)" }}>
            <div style={{ fontFamily: KO, fontWeight: 900, fontSize: 54, color: INK, lineHeight: 1.3 }}>
              내일 아침 <span style={{ background: YELLOW, borderRadius: 10, padding: "0 8px" }}>8시</span>까지 공장에 오세요.
            </div>
            <div style={{ fontFamily: BOLD, fontWeight: 800, fontSize: 38, color: "#4A4458", marginTop: 10 }}>Ertaga ertalab soat 8 gacha zavodga keling.</div>
          </div>
        </Slam>
      )}
    </>
  );
}

// ── 장면 위 그래픽 ──
function Overlays() {
  const frame = useCurrentFrame();
  return (
    <>
      {/* Lead 내내 떠 있는 질문 — 10초를 넘기게 */}
      <LeadQuestion />
      {/* Lead: 택시를 팔다 */}
      <Slam at={word("n02", "taksisini")} out={word("n02", "pulni") - 4} rot={-3} style={{ left: 60, top: 260 }}>
        <Chip bg={YELLOW} fg={INK} size={60}>Taksi sotildi</Chip>
      </Slam>
      <Slam at={word("n02", "tanishga")} out={end("t01")} rot={3} style={{ left: 470, top: 1010 }}>
        <Chip bg={RED} size={70}>12 000 $</Chip>
      </Slam>
      <Bubble at={T.t01.at} out={end("t01") + 4} tail="right" x={470} y={300}>
        Tanishim bor!
      </Bubble>
      <Slam at={word("n03", "imtihonga")} out={end("n03") + 2} rot={-3} style={{ left: 60, top: 260 }}>
        <Chip bg="#fff" fg={INK} size={52}>Oʻzi yozildi</Chip>
      </Slam>
      <Slam at={word("n03", "Yigirma") - 2} out={end("n03") + 2} rot={4} style={{ right: 60, top: 400 }}>
        <Chip bg={GREEN} fg={INK} size={84}>28 $</Chip>
      </Slam>

      {/* Body 1: 피해자 줄 · 검찰 숫자 */}
      <Slam at={T.n05.at + 6} out={end("n05") + 4} rot={-2} style={{ left: 60, top: 230 }}>
        <div style={big(96, YELLOW)}>800+</div>
        <div style={{ ...label(36), marginTop: 8 }}>SHIKOYAT</div>
      </Slam>
      <Source at={T.n05.at + 6} out={end("n07") + 4} text="Bosh prokuratura · 2026-yil may" />
      <Slam at={word("n06", "kishidan")} out={end("n06") + 2} rot={-3} style={{ left: 60, top: 230 }}>
        <div style={{ ...label(36) }}>1 KISHIDAN</div>
      </Slam>
      <Slam at={word("n06", "yetti")} out={end("n06") + 2} rot={-3} style={{ left: 60, top: 300 }}>
        <div style={big(120, YELLOW)}>7 000 –</div>
      </Slam>
      <Slam at={word("n06", "oʻn")} out={end("n06") + 2} rot={2} style={{ left: 140, top: 440 }}>
        <div style={big(150, RED)}>12 000 $</div>
      </Slam>
      {frame >= word("n07", "toʻqson") - 6 && frame < end("n07") + 14 ? (
        <Slam at={word("n07", "toʻqson") - 6} out={end("n07") + 6} rot={-2} style={{ left: 0, right: 0, top: 380, textAlign: "center" }}>
          <div style={{ ...label(40, "#fff") }}>JAMI QARIYB</div>
          <div style={{ ...big(150, YELLOW), marginTop: 10, letterSpacing: -4 }}>
            <CountUp at={word("n07", "toʻqson") - 6} dur={22} to={90_000_000} />
          </div>
          <div style={{ marginTop: 24 }}>
            <Chip bg="rgba(10,8,14,0.82)" size={34} style={{ border: `3px solid ${RED}` }}>Ichida sobiq Migratsiya agentligi xodimlari ham</Chip>
          </div>
        </Slam>
      ) : null}

      {/* Open loop 1: 보장은 없다 */}
      <Slam at={word("n08", "ular") - 2} out={end("n08") + 8} rot={-2} style={{ left: 0, right: 0, top: 300, textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "16px 44px", border: "8px dashed #fff", borderRadius: 30, ...big(120), opacity: frame >= word("n08", "mavjud") ? 0.35 : 1 }}>KAFOLAT</div>
      </Slam>
      <Stamp at={word("n08", "mavjud")} out={end("n08") + 8} rot={-10} size={110} text="MAVJUD EMAS" x={540} y={520} />

      {/* Body 2: EPS-TOPIK 의 실체 */}
      <Slam at={T.n09.at + 2} out={end("n10") + 4} rot={-2} style={{ left: 60, top: 220 }}>
        <div style={big(110, YELLOW)}>EPS-TOPIK</div>
        <div style={{ ...label(40), marginTop: 10, letterSpacing: 1 }}>koreys tilidan imtihon</div>
        <div style={{ ...label(32, "#E6E1F0"), marginTop: 8, letterSpacing: 1 }}>oʻqish + tinglash</div>
      </Slam>
      <div style={{ position: "absolute", left: 60, top: 1010, display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { at: word("n10", "onlayn,"), t: "Onlayn roʻyxat" },
          { at: word("n10", "Migratsiya"), t: "Migratsiya agentligi orqali" },
          { at: word("n10", "Narxi"), t: "Toʻlov: 28 $" },
        ].map((r) =>
          frame >= r.at && frame < end("n10") + 12 ? (
            <div key={r.t} style={{ transform: `translateX(${(1 - pop(frame, r.at, 380, 14)) * -500}px)`, opacity: 1 - clamp01((frame - end("n10") - 4) / 8) }}>
              <Chip bg="rgba(255,255,255,0.95)" fg={INK} size={46}>
                <span style={{ color: "#1E9E5A" }}>✓</span> {r.t}
              </Chip>
            </div>
          ) : null,
        )}
      </div>
      <Source at={T.n09.at + 2} out={end("n11") + 4} text="Migratsiya agentligi · EPS-TOPIK 2026" />
      <Slam at={word("n11", "kafolatlamaydi.") - 4} out={end("n11") + 4} rot={-3} style={{ left: 0, right: 0, top: 760, textAlign: "center" }}>
        <div style={big(120, RED)}>KAFOLAT YOʻQ</div>
        <div style={{ ...label(32, "#fff"), marginTop: 16, letterSpacing: 1 }}>Oʻtganlar 2 yil ish beruvchilar roʻyxatida turadi</div>
      </Slam>
      <Slam at={word("n11", "Hatto")} out={end("n11") + 4} rot={2} style={{ left: 0, right: 0, top: 1010, textAlign: "center" }}>
        <Chip bg="#fff" fg={INK} size={44}>Hatto agentlik ham</Chip>
      </Slam>

      {/* 전화는 안 받는다 */}
      <CallCard />
      <Stamp at={word("n12", "havo")} out={end("n12") + 8} rot={-8} size={150} text="HAVO" x={540} y={1010} />

      {/* Body 3: 문제 3개 */}
      <Quiz ask="Bu nima?" correct={1} ko n={1} opts={["장갑", "안전모", "우산", "신발"]} q={Q1} />
      <Slam at={Q1.reveal + 4} out={Q1.out} rot={-3} style={{ left: 0, right: 0, top: 380, textAlign: "center" }}>
        <Chip bg={INK} size={58} style={{ border: `5px solid ${GREEN}` }}>
          <span style={{ fontFamily: KO }}>안전모</span> = kaska
        </Chip>
      </Slam>
      <Quiz ask="Bu yozuv nima degani?" correct={2} n={2} opts={["Kirish", "Chiqish", "Kirish taqiqlangan", "Navbat"]} q={Q2} />
      <Listen />
      <Quiz ask={frame < T.n17.at ? "Tinglang" : "Qachon kelish kerak?"} correct={1} n={3} opts={["7:00", "8:00", "9:00", "18:00"]} q={{ ...Q3, at: T.n16.at }} />

      {/* 반전 */}
      <Stamp at={word("n18", "uchalasini")} out={word("n18", "har") - 2} rot={-8} size={170} text="3 / 3" color={GREEN} x={540} y={1090} />
      <Slam at={word("n18", "har")} out={end("n18") + 4} rot={-3} style={{ left: 60, top: 230 }}>
        <Chip bg={YELLOW} fg={INK} size={56}>Har kuni · telefonda</Chip>
      </Slam>
      <Slam at={T.n19.at + 2} out={word("n19", "kaskani") - 4} rot={3} style={{ right: 60, top: 240 }}>
        <Chip bg="#fff" fg={INK} size={56}>✈ Koreyaga</Chip>
      </Slam>
      <Slam at={word("n19", "kaskani") + 4} out={word("n19", "Jasur") - 4} rot={-3} style={{ left: 60, top: 1060 }}>
        <Chip bg={INK} size={52} style={{ border: `5px solid ${YELLOW}` }}>
          <span style={{ fontFamily: KO }}>안전모</span> · 1-savoldagi kaska
        </Chip>
      </Slam>
      <Slam at={word("n19", "endi")} out={end("n19") + 6} rot={-3} style={{ left: 60, top: 240 }}>
        <Chip bg={GREEN} fg={INK} size={56}>Endi oʻzi oʻqiyapti</Chip>
      </Slam>
    </>
  );
}

function LeadQuestion() {
  const frame = useCurrentFrame();
  const from = end("n01") - 4;
  const to = T.n04.at - 4;
  if (frame < from || frame >= to + 8) return null;
  const s = pop(frame, from, 260, 16);
  const o = clamp01((frame - to) / 8);
  const pulse = 1 + 0.03 * Math.sin(frame / 5);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", transform: `translateY(${(1 - s) * -200}px) scale(${pulse})`, opacity: 1 - o }}>
      <Chip bg={INK} fg="#fff" size={46} style={{ border: `5px solid ${YELLOW}` }}>
        Qaysi biri Koreyaga ketdi<span style={{ color: YELLOW }}>?</span>
      </Chip>
    </div>
  );
}

/** '아는 사람'에게 거는 전화 — 신호만 가다가 안내 음성 */
function CallCard() {
  const frame = useCurrentFrame();
  const from = T.op01.at - 12;
  const to = end("n12") + 6;
  if (frame < from || frame >= to + 8) return null;
  const s = pop(frame, from, 260, 16);
  const o = clamp01((frame - to) / 8);
  const ended = frame >= end("op01");
  return (
    <div style={{ position: "absolute", left: 140, right: 140, top: 800, transform: `translateY(${(1 - s) * 300}px)`, opacity: 1 - o }}>
      <div style={{ background: "rgba(20,18,26,0.92)", borderRadius: 40, padding: "28px 34px", boxShadow: "0 20px 50px rgba(0,0,0,0.55)", textAlign: "center" }}>
        <div style={{ width: 110, height: 110, borderRadius: 999, background: "#3A3546", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", ...big(54), textShadow: "none" }}>T</div>
        <div style={{ fontFamily: HEAVY, fontSize: 52, color: "#fff", marginTop: 14 }}>Tanish aka</div>
        <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: 32, color: ended ? RED : "#B9B3C9", marginTop: 6 }}>{ended ? "Aloqa uzildi" : `Qoʻngʻiroq${".".repeat(1 + (Math.floor(frame / 8) % 3))}`}</div>
        {frame >= T.op01.at ? <div style={{ fontFamily: BOLD, fontWeight: 700, fontSize: 30, color: "#E6E1F0", marginTop: 18, fontStyle: "italic" }}>“Abonent vaqtincha aloqadan tashqarida”</div> : null}
      </div>
    </div>
  );
}

// ── CTA ──
function EndCard() {
  const frame = useCurrentFrame();
  const at = T.n20.at - 4;
  const phone = pop(frame, at + 2, 160, 16);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 25%, #4B3BC9 0%, ${PURPLE_DEEP} 45%, #120D2A 100%)` }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2.5px)", backgroundSize: "56px 56px", transform: `translate(${(frame % 56) * 0.5}px, ${(frame % 56) * 0.3}px)` }} />
      <Slam at={at + 2} from={1.5} rot={-2} style={{ left: 0, right: 0, top: 140, textAlign: "center" }}>
        <div style={{ ...big(74, "#fff"), letterSpacing: 0 }}>
          Tanishga emas — <span style={{ color: YELLOW }}>tilga</span>
        </div>
      </Slam>
      <div style={{ position: "absolute", left: 60, top: 290 + (1 - phone) * 600, width: 380, height: 822, borderRadius: 52, background: "#0B0A12", padding: 13, boxShadow: "0 0 60px rgba(255,210,63,0.25), 0 30px 70px rgba(0,0,0,0.55)", transform: `rotate(${(1 - phone) * -10 - 3}deg)` }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 40, overflow: "hidden", background: "#fff" }}>
          <Sequence from={at} layout="none">
            <OffthreadVideo muted src={staticFile("clips/tutor.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={45} />
          </Sequence>
        </div>
      </div>
      <Slam at={word("n20", "Koreys")} from={1.6} rot={2} style={{ left: 500, top: 420 }}>
        <div style={big(120, YELLOW)}>KORIO</div>
        <div style={{ ...big(48), marginTop: 12, letterSpacing: 0, lineHeight: 1.15 }}>
          Koreys tili —<br />oʻzbek tilida
        </div>
      </Slam>
      <div style={{ position: "absolute", left: 500, top: 720, display: "flex", flexDirection: "column", gap: 14 }}>
        {["Soʻz va rasm", "Talaffuz", "AI ustoz"].map((t, i) => (
          <div key={t} style={{ transform: `translateX(${(1 - pop(frame, word("n20", "Korio.") + i * 5, 380, 14)) * 500}px)`, opacity: frame >= word("n20", "Korio.") + i * 5 ? 1 : 0 }}>
            <Chip bg="rgba(255,255,255,0.12)" size={40} style={{ border: "3px solid rgba(255,255,255,0.3)" }}>{t}</Chip>
          </div>
        ))}
      </div>
      <Slam at={word("n21", "tanish") - 4} rot={-1} style={{ left: 50, right: 50, top: 1150, textAlign: "center" }}>
        <div style={{ ...big(50), letterSpacing: 0, lineHeight: 1.2 }}>
          Buni Koreyaga “tanish orqali” ketmoqchi boʻlgan <span style={{ color: YELLOW }}>doʻstingizga yuboring</span>
        </div>
      </Slam>
      <Slam at={end("n21") + 2} rot={0} style={{ left: 0, right: 0, top: 1330, textAlign: "center" }}>
        <Chip bg="#fff" fg={INK} size={38}>Nechta savolni topdingiz? Izohga: 0 · 1 · 2 · 3</Chip>
      </Slam>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center", gap: 18 }}>
        {["Android · Google Play", "iPhone · Telegram"].map((b, i) => (
          <div key={b} style={{ transform: `scale(${pop(frame, end("n21") + 10 + i * 5, 380, 12)})`, background: YELLOW, color: INK, fontFamily: HEAVY, fontSize: 34, padding: "14px 24px", borderRadius: 18, boxShadow: "0 10px 24px rgba(0,0,0,0.4)" }}>
            {b}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

// ── 자막: 내레이터만 (등장인물은 말풍선 · 안내 음성은 전화 카드) ──
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
  if (frame >= T.n20.at - 6) return null;
  // 문제를 읽는 줄은 문제 카드에 이미 크게 나온다
  const key = LINE_KEYS.find((k) => CHUNKS[k] && !["n14", "n15", "n16", "n17"].includes(k) && frame >= T[k].at - 2 && frame < T[k].at + T[k].len + 6);
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
  const leak = 0.16 + 0.1 * Math.sin(frame / 40);
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
 * volume 은 파일 평균 음량에서 정했다: 말소리(약 −22.5 dB)보다 약 17 dB 아래.
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
const A = (n: string) => `ai/tanish/${n}.mp3`;
const HITS: { at: number; src: string; volume?: number }[] = [];
function Sounds() {
  return (
    <>
      <Bed from={0} src={A("m1-tense")} to={T.n11.at + 6} volume={0.09} />
      <Bed from={T.n11.at - 6} src={A("m2-sneaky")} to={T.n13.at} volume={0.3} />
      <Bed from={T.n13.at - 10} src={A("m3-quiz")} to={T.n18.at + 6} volume={0.08} />
      <Bed from={T.n18.at - 6} src={A("m4-hope")} to={TANISH_TOTAL} volume={0.09} />
      <Bed fade={10} from={T.n19.at - 4} src={A("airport")} to={word("n19", "kaskani")} volume={0.08} />
      {HITS.map((h, i) => (
        <Hit key={`${h.src}-${h.at}-${i}`} {...h} />
      ))}
      {LINE_KEYS.map((k) => (
        <Sequence from={T[k].at} key={k} layout="none">
          <Audio src={staticFile(A(k === "op01" ? "op01-phone" : k))} volume={k === "op01" ? 1.2 : 1.0} />
        </Sequence>
      ))}
    </>
  );
}

// 박자 · 흔들림 · 효과음 자리 (한곳에서 정한다)
{
  const kick = (t: number) => KICKS.push(t);
  const shake = (t: number) => SHAKES.push(t);
  const hit = (at: number, src: string, volume = 0.5) => HITS.push({ at, src: src.includes("/") ? src : A(src), volume });
  hit(0, "impact", 0.28);
  shake(2);
  kick(2);
  hit(4, "cash", 0.45);
  hit(word("n01", "yigirma") - 2, "impact", 0.25);
  kick(word("n01", "yigirma") - 2);
  hit(word("n02", "taksisini"), "stamp", 0.4);
  hit(word("n02", "tanishga"), "cash", 0.45);
  hit(word("n03", "Yigirma") - 2, "sfx/correct.wav", 0.35);
  hit(word("n04", "Qaysi"), "impact", 0.28);
  shake(word("n04", "Qaysi"));
  hit(word("n06", "yetti"), "stamp", 0.35);
  hit(word("n06", "oʻn"), "impact", 0.25);
  kick(word("n06", "oʻn"));
  hit(word("n07", "toʻqson") - 6, "counter", 0.4);
  hit(word("n07", "dollar.") + 4, "impact", 0.3);
  shake(word("n07", "dollar.") + 4);
  hit(T.n08.at - 10, "riser", 0.35);
  hit(word("n08", "mavjud"), "stamp", 0.5);
  shake(word("n08", "mavjud"));
  [word("n10", "onlayn,"), word("n10", "Migratsiya"), word("n10", "Narxi")].forEach((t) => hit(t, "sfx/click.wav", 0.4));
  hit(word("n11", "kafolatlamaydi.") - 4, "impact", 0.25);
  hit(T.op01.at - 14, "buzz", 0.08);
  hit(end("op01"), "beeps", 0.12);
  hit(word("n12", "havo"), "stamp", 0.5);
  kick(word("n12", "havo"));
  hit(T.n13.at - 10, "riser", 0.35);
  for (const q of [Q1, Q2, Q3]) {
    [0, 20, 40].forEach((d) => hit(q.cd + d, "sfx/click.wav", 0.5));
    hit(q.reveal, "sfx/correct.wav", 0.45);
    kick(q.reveal);
  }
  hit(word("n18", "uchalasini"), "stamp", 0.5);
  shake(word("n18", "uchalasini"));
  hit(T.n20.at - 4, "impact", 0.25);
  SHOTS.filter((s) => s.trans === "whip").forEach((s) => hit(s.at - 1, "whoosh", 0.25));
  SHOTS.filter((s) => s.trans === "punch").forEach((s) => kick(s.at));
}

export function TanishReel() {
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
