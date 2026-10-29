/**
 * 직접 찍은 소개 영상 편집 — "Ajoyib yangilik" (약 25초).
 * 보라 조명 스튜디오 배경(그림으로 그림) · 오려 낸 인물 · 원본 책상, 말에 맞춰 국기 · 큰 자막 · 앱 화면 휴대폰 · 기능 카드 ·
 * AI 선생님 고쳐 주기 카드 → 빠른 줌 → "Pastdagi havola orqali yuklab oling!".
 *
 * 재료: public/ai/edit2 — c.mp4 (30fps · 좌우 반전 · 1080×1920), c.webm (ai/matte.py 로 오린 인물),
 *       voice-mic.wav (ai/voice.mjs isolate 로 방 울림을 걷고 마이크 느낌으로 다듬은 목소리), raw.words.json (단어 시각)
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";

const FPS = 30;
const W = 1080;
const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const BODY = '"Segoe UI Semibold", "Segoe UI", sans-serif';
const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const GREEN = "#3DE07F";
const PURPLE = "#7B5CFF";
const PINK = "#FF5FA2";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (f: number, at: number, d: number) => clamp01((f - at) / d);
const pop = (f: number, at: number, stiffness = 260, damping = 13) => spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const ease = Easing.bezier(0.65, 0, 0.35, 1);

/** 원본 앞 1.17초(말 시작 전)는 자른다 — 원본 초 → 편집 프레임 */
const TRIM = 35;
const at = (raw: number) => Math.round(raw * FPS) - TRIM;
const DESK_Y = 1600;
const WHIP = at(22.71) - 12;
const CTA = at(22.71);
/** 말이 끝나고 손을 뻗어 녹화를 끄기 직전 — 여기서 화면을 멈추고 내려받기 안내만 조금 더 */
const LAST = at(26.13);
export const YANGILIK_TOTAL = LAST + 18;

// ───────────────────────────── 배경: 보라 조명 스튜디오 (사진 없이 그림)
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const CELLS = (() => {
  const r = rng(7);
  const out: { x: number; y: number; c: string }[] = [];
  for (let y = -40; y < DESK_Y; y += 146)
    for (let x = -60; x < W + 60; x += 146) {
      // 왼쪽 가운데에 따뜻한 조명이 몰려 있다
      const warm = Math.hypot(x - 260, y - 640) < 420 && r() < 0.55;
      const light = 22 + r() * 26;
      out.push({ x, y, c: warm ? `hsl(${14 + r() * 20}, 85%, ${48 + r() * 14}%)` : `hsl(${286 + r() * 22}, ${52 + r() * 18}%, ${light}%)` });
    }
  return out;
})();
const BOKEH = (() => {
  const r = rng(21);
  return Array.from({ length: 16 }, () => ({ x: r() * W, y: 120 + r() * 1300, rad: 18 + r() * 46, c: ["#FFB36B", "#FF7AC8", "#FFD38A", "#C58CFF"][Math.floor(r() * 4)], a: 0.25 + r() * 0.35, ph: r() * 6 }));
})();
const LEAVES = (() => {
  const r = rng(3);
  return Array.from({ length: 15 }, () => ({ ang: -70 + r() * 140, len: 150 + r() * 160, wid: 24 + r() * 18, dist: 60 + r() * 380, shade: r() }));
})();

function Plant({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  return (
    <svg height={1000} style={{ position: "absolute", left: x - 500, top: y - 900, filter: "blur(10px)", transform: flip ? "scaleX(-1)" : undefined, opacity: 0.92 }} viewBox="-500 -900 1000 1000" width={1000}>
      {LEAVES.map((l, i) => {
        const rad = ((l.ang - 90) * Math.PI) / 180;
        const cx = Math.cos(rad) * l.dist * 0.6;
        const cy = Math.sin(rad) * l.dist;
        return <ellipse cx={cx} cy={cy} fill={l.shade > 0.5 ? "#1F4A2A" : "#16331E"} key={i} rx={l.wid} ry={l.len / 2} transform={`rotate(${l.ang} ${cx} ${cy})`} />;
      })}
    </svg>
  );
}

function Room() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#2A0E3C" }}>
      <div style={{ position: "absolute", inset: -60, filter: "blur(20px)" }}>
        {CELLS.map((c, i) => (
          <div key={i} style={{ position: "absolute", left: c.x, top: c.y, width: 128, height: 128, borderRadius: 10, background: c.c }} />
        ))}
      </div>
      {/* 머리 뒤 은은한 역광 */}
      <div style={{ position: "absolute", left: 140, top: 200, width: 800, height: 900, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,140,220,0.45), rgba(170,60,200,0.15) 60%, transparent)" }} />
      {BOKEH.map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x + Math.sin(frame / 50 + b.ph) * 14 - b.rad, top: b.y + Math.cos(frame / 60 + b.ph) * 10 - b.rad, width: b.rad * 2, height: b.rad * 2, borderRadius: "50%", background: `radial-gradient(circle, ${b.c} 0%, ${b.c} 45%, transparent 72%)`, opacity: b.a, filter: "blur(5px)" }} />
      ))}
      <Plant x={60} y={1660} />
      <Plant flip x={1030} y={1640} />
      {/* 책상 뒤 그림자 · 가장자리 어둡게 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: DESK_Y - 140, height: 140, background: "linear-gradient(transparent, rgba(10,0,20,0.55))" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, transparent 50%, rgba(8,0,18,0.55) 100%)" }} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 인물 · 책상 (빠른 줌 포함)
function Footage() {
  const frame = useCurrentFrame();
  // 빠른 줌: 가슴으로 확 들어갔다가 CTA 에서 제자리
  const zin = interpolate(frame, [WHIP, CTA], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const back = frame >= CTA ? 1 - pop(frame, CTA, 200, 16) : 0;
  const scale = frame < CTA ? 1 + zin * 2.2 : 1 + back * 0.12;
  const blur = frame < CTA ? zin * 22 : back * 8;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 62%", filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
      <Room />
      <Freeze frame={Math.min(frame, LAST)}>
        <OffthreadVideo muted src={staticFile("ai/edit2/c.mp4")} style={{ position: "absolute", inset: 0, width: W, height: 1920, clipPath: `inset(${DESK_Y}px 0 0 0)`, filter: "contrast(1.04) saturate(1.05)" }} trimBefore={TRIM} />
        <OffthreadVideo muted src={staticFile("ai/edit2/c.webm")} style={{ position: "absolute", inset: 0, width: W, height: 1920, filter: "drop-shadow(0 0 26px rgba(255,120,230,0.35)) contrast(1.04) saturate(1.05)" }} transparent trimBefore={TRIM} />
      </Freeze>
    </AbsoluteFill>
  );
}

// ───────────────────────────── 국기 스티커 (이모지 대신 그림)
function FlagFrame({ children, rot }: { children: ReactNode; rot: number }) {
  return <div style={{ width: 150, height: 100, borderRadius: 14, overflow: "hidden", border: "6px solid #fff", boxShadow: "0 14px 30px rgba(0,0,0,0.45)", transform: `rotate(${rot}deg)`, background: "#fff" }}>{children}</div>;
}
function FlagKR() {
  const bars = (x: number, y: number, a: number, pattern: number[]) => (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      {[0, 1, 2].map((i) =>
        pattern[i] ? <rect fill="#111" height={3} key={i} width={16} x={-8} y={-7 + i * 5} /> : (
          <g key={i}>
            <rect fill="#111" height={3} width={7} x={-8} y={-7 + i * 5} />
            <rect fill="#111" height={3} width={7} x={1} y={-7 + i * 5} />
          </g>
        ),
      )}
    </g>
  );
  return (
    <svg height="100%" viewBox="0 0 90 60" width="100%">
      <rect fill="#fff" height={60} width={90} />
      <g transform="translate(45 30) rotate(33.7)">
        <circle fill="#0047A0" r={15} />
        <path d="M-15 0a15 15 0 0 1 30 0a7.5 7.5 0 0 1 -15 0a7.5 7.5 0 0 0 -15 0" fill="#CD2E3A" />
      </g>
      {bars(17, 12, -56.3, [1, 1, 1])}
      {bars(73, 48, -56.3, [0, 0, 0])}
      {bars(73, 12, 56.3, [1, 0, 1])}
      {bars(17, 48, 56.3, [0, 1, 0])}
    </svg>
  );
}
function FlagGB() {
  return (
    <svg height="100%" preserveAspectRatio="none" viewBox="0 0 60 40" width="100%">
      <rect fill="#012169" height={40} width={60} />
      <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth={8} />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth={3} />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth={12} />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth={7} />
    </svg>
  );
}
function FlagUZ() {
  const stars: [number, number][] = [];
  [5, 4, 3].forEach((n, row) => {
    for (let i = 0; i < n; i++) stars.push([44 - i * 5.2, 4.5 + row * 4.6]);
  });
  return (
    <svg height="100%" preserveAspectRatio="none" viewBox="0 0 60 40" width="100%">
      <rect fill="#0099B5" height={13.3} width={60} />
      <rect fill="#fff" height={13.3} width={60} y={13.3} />
      <rect fill="#1EB53A" height={13.4} width={60} y={26.6} />
      <rect fill="#CE1126" height={0.8} width={60} y={12.9} />
      <rect fill="#CE1126" height={0.8} width={60} y={26.3} />
      <circle cx={10} cy={6.8} fill="#fff" r={4.6} />
      <circle cx={11.8} cy={6.8} fill="#0099B5" r={4.1} />
      {stars.map(([x, y], i) => (
        <circle cx={x - 18} cy={y} fill="#fff" key={i} r={1.1} />
      ))}
    </svg>
  );
}

function Sticker({ from, to, x, y, rot = -6, children }: { from: number; to: number; x: number; y: number; rot?: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < from || frame > to + 8) return null;
  const p = pop(frame, from, 320, 11);
  const out = ramp(frame, to, 8);
  return <div style={{ position: "absolute", left: x, top: y, transform: `scale(${p * (1 - out)}) rotate(${(1 - p) * 30}deg)` }}>{children ? <FlagFrame rot={rot}>{children}</FlagFrame> : null}</div>;
}

// ───────────────────────────── 큰 자막
function Word({ from, to, y, text, color = "#fff", size = 120, delay = 0 }: { from: number; to: number; y: number; text: string; color?: string; size?: number; delay?: number }) {
  const frame = useCurrentFrame();
  const start = from + delay;
  if (frame < start || frame > to + 8) return null;
  const p = pop(frame, start, 300, 12);
  const out = ramp(frame, to, 8);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", fontFamily: HEAVY, fontSize: size, lineHeight: 1, color, letterSpacing: 1, textShadow: "0 6px 0 rgba(0,0,0,0.25), 0 10px 40px rgba(0,0,0,0.55)", WebkitTextStroke: "2px rgba(0,0,0,0.15)", transform: `translateY(${(1 - p) * 60 - out * 40}px) scale(${interpolate(p, [0, 1], [1.35, 1])})`, opacity: Math.min(1, p * 2) * (1 - out), filter: p < 0.6 ? `blur(${(0.6 - p) * 14}px)` : undefined }}>
      {text}
    </div>
  );
}

function Sparks({ at: start, y }: { at: number; y: number }) {
  const frame = useCurrentFrame();
  const d = frame - start;
  if (d < 0 || d > 16) return null;
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <div key={i} style={{ position: "absolute", left: W / 2, top: y, width: 36, height: 8, borderRadius: 4, background: i % 2 ? GREEN : "#FFE14D", opacity: 1 - d / 16, transform: `translate(-50%, -50%) rotate(${(a * 180) / Math.PI}deg) translateX(${260 + d * 22}px)` }} />;
      })}
    </>
  );
}

// ───────────────────────────── 휴대폰 (앱 화면)
const SCREEN = { w: 400, h: Math.round((400 * 1688) / 780) };
type Shot = { from: number; to: number; src: string; trim?: number };
function Phone({ from, to, shots }: { from: number; to: number; shots: Shot[] }) {
  const frame = useCurrentFrame();
  if (frame < from - 2 || frame > to + 12) return null;
  const p = pop(frame, from, 170, 16);
  const out = ramp(frame, to, 12);
  return (
    <div style={{ position: "absolute", left: 46, top: 880, transform: `translateY(${(1 - p) * 1100 + out * 1100}px) rotate(${-4 + (1 - p) * -10}deg)` }}>
      <div style={{ padding: 12, borderRadius: 64, background: "linear-gradient(145deg, #FFFFFF, #D9DCE6)", boxShadow: "0 40px 80px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(0,0,0,0.08)" }}>
        <div style={{ position: "relative", width: SCREEN.w, height: SCREEN.h, borderRadius: 52, overflow: "hidden", background: "#fff", border: "3px solid #111" }}>
          {shots.map((s) => {
            if (frame < s.from || frame >= s.to + 8) return null;
            const slide = s.from === from ? 0 : 1 - ease(ramp(frame, s.from, 8));
            return (
              <Sequence from={s.from} key={s.from} layout="none">
                <div style={{ position: "absolute", inset: 0, transform: `translateX(${slide * 100}%)`, background: "#fff" }}>
                  <OffthreadVideo muted src={staticFile(`clips/${s.src}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={s.trim ?? 0} />
                </div>
              </Sequence>
            );
          })}
          <div style={{ position: "absolute", left: "50%", top: 12, width: 110, height: 30, borderRadius: 15, background: "#111", transform: "translateX(-50%)" }} />
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── 기능 카드
function Card({ from, to, y, icon, label, sub, color, iconStyle }: { from: number; to: number; y: number; icon: ReactNode; label: string; sub?: string; color: string; iconStyle?: CSSProperties }) {
  const frame = useCurrentFrame();
  if (frame < from || frame > to + 10) return null;
  const p = pop(frame, from, 300, 13);
  const out = ramp(frame, to, 10);
  return (
    <div style={{ position: "absolute", left: 520, top: y, display: "flex", alignItems: "center", gap: 18, whiteSpace: "nowrap", padding: "16px 20px", borderRadius: 28, background: "rgba(255,255,255,0.93)", boxShadow: "0 18px 40px rgba(20,0,40,0.45)", transform: `translateX(${(1 - p) * 520 + out * 600}px) rotate(${(1 - p) * 8 + 2}deg)` }}>
      <div style={{ width: 84, height: 84, flex: "none", borderRadius: 22, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: KO, fontWeight: 700, fontSize: 40, ...iconStyle }}>{icon}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: HEAVY, fontSize: 42, lineHeight: 1.05, color: "#17122B" }}>{label}</span>
        {sub ? <span style={{ fontFamily: BODY, fontSize: 26, color: "#6B6683", marginTop: 4 }}>{sub}</span> : null}
      </div>
    </div>
  );
}

/** AI 선생님이 고쳐 준다: Oishii → 맛있어요 */
function FixCard({ from, to }: { from: number; to: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame > to + 10) return null;
  const p = pop(frame, from, 280, 13);
  const strike = ramp(frame, from + 10, 8);
  const fix = pop(frame, from + 20, 300, 12);
  const out = ramp(frame, to, 10);
  return (
    <div style={{ position: "absolute", left: 520, top: 1230, width: 400, padding: "20px 24px", borderRadius: 28, background: "rgba(255,255,255,0.95)", boxShadow: "0 18px 40px rgba(20,0,40,0.45)", transform: `translateX(${(1 - p) * 520 + out * 600}px) rotate(2deg)` }}>
      <div style={{ fontFamily: HEAVY, fontSize: 26, letterSpacing: 2, color: "#8A84A3" }}>DARHOL TUZATADI</div>
      <div style={{ position: "relative", display: "inline-block", marginTop: 8, fontFamily: HEAVY, fontSize: 46, color: "#E5484D" }}>
        Oishii
        <div style={{ position: "absolute", left: -4, top: "52%", height: 6, borderRadius: 3, width: `${strike * 108}%`, background: "#E5484D" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6, transform: `scale(${fix})`, transformOrigin: "0 50%" }}>
        <div style={{ width: 46, height: 46, borderRadius: 23, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg height={30} viewBox="0 0 24 24" width={30}>
            <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.4} />
          </svg>
        </div>
        <span style={{ fontFamily: KO, fontWeight: 700, fontSize: 56, color: "#17122B" }}>맛있어요</span>
      </div>
    </div>
  );
}

// ───────────────────────────── 끝: 내려받기
function Logo({ size }: { size: number }) {
  return (
    <div style={{ display: "inline-block", padding: `${size * 0.08}px ${size * 0.32}px`, borderRadius: size * 0.32, background: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
      <span style={{ fontFamily: HEAVY, fontSize: size, letterSpacing: size * 0.03, color: PURPLE }}>KORI</span>
      <span style={{ fontFamily: HEAVY, fontSize: size, letterSpacing: size * 0.03, color: PINK }}>O</span>
    </div>
  );
}
function Pill({ bg, children }: { bg: string; children: ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 34px", borderRadius: 60, background: bg, fontFamily: HEAVY, fontSize: 40, color: "#fff", boxShadow: "0 16px 32px rgba(0,0,0,0.45)" }}>{children}</div>;
}
function Cta() {
  const frame = useCurrentFrame();
  if (frame < CTA) return null;
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center", transform: `scale(${pop(frame, CTA + 4, 260, 11)}) rotate(-3deg)` }}>
        <Logo size={96} />
      </div>
      <Word from={at(23.79)} size={64} text="Pastdagi havola orqali" to={YANGILIK_TOTAL + 20} y={1010} />
      <Word color={GREEN} from={at(24.79)} size={104} text="YUKLAB OLING!" to={YANGILIK_TOTAL + 20} y={1090} />
      {frame >= at(24.79) + 6
        ? [0, 1, 2].map((i) => {
            const t = (frame - at(24.79) + i * 6) % 30;
            return (
              <svg height={60} key={i} style={{ position: "absolute", left: W / 2 - 40, top: 1240 + i * 34, opacity: interpolate(t, [0, 10, 30], [0.2, 1, 0.2]) }} viewBox="0 0 24 12" width={80}>
                <path d="M2 2l10 8 10-8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
              </svg>
            );
          })
        : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1380, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ transform: `translateX(${(1 - pop(frame, at(25.2), 240, 14)) * -1000}px)` }}>
          <Pill bg="#111">
            <svg height={44} viewBox="0 0 24 24" width={44}>
              <path d="M4 2.5l10.5 9.5L4 21.5z" fill="#00D7FE" />
              <path d="M4 2.5l13.8 6.2-3.3 3.3z" fill="#32BBFF" opacity="0.9" />
              <path d="M14.5 12l3.3 3.3L4 21.5z" fill="#FF3A44" />
              <path d="M17.8 8.7l3.2 1.8c1.1.7 1.1 2.3 0 3l-3.2 1.8-3.3-3.3z" fill="#FFD109" />
            </svg>
            Android: Google Play
          </Pill>
        </div>
        <div style={{ transform: `translateX(${(1 - pop(frame, at(25.2) + 6, 240, 14)) * 1000}px)` }}>
          <Pill bg="#2AABEE">
            <svg height={46} viewBox="0 0 24 24" width={46}>
              <path d="M21.5 3.5L2.8 10.8c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.4 4.6 3.4c.6.4 1.4.1 1.6-.6l3.2-15.6c.2-.9-.6-1.6-1.3-1.5z" fill="#fff" />
            </svg>
            iPhone: Telegram @KorioLoginBot
          </Pill>
        </div>
      </div>
    </>
  );
}

function Flash() {
  const frame = useCurrentFrame();
  const d = frame - CTA;
  return d >= 0 && d < 8 ? <AbsoluteFill style={{ background: "#fff", opacity: (1 - d / 8) * 0.7 }} /> : null;
}

// ───────────────────────────── 소리
function Sound() {
  const s = (frame: number, src: string, v = 0.3) => (
    <Sequence from={Math.max(0, Math.round(frame))} key={`${src}-${frame}`}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
  const fx = (n: string) => `ai/edit/sfx-${n}.mp3`;
  return (
    <>
      <Audio src={staticFile("ai/edit2/voice-mic.wav")} trimBefore={TRIM} volume={(f) => interpolate(f, [LAST - 3, LAST + 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {[at(1.39), at(1.91)].map((f) => s(f, fx("pop"), 0.3))}
      {s(at(3.73), fx("whoosh"), 0.25)}
      {s(at(4.09), fx("boom"), 0.35)}
      {s(at(5.47) - 4, fx("whoosh"), 0.3)}
      {[at(8.3), at(9.29), at(9.86), at(10.75)].map((f) => s(f, fx("pop"), 0.28))}
      {s(at(12.21) - 4, fx("whoosh"), 0.25)}
      {[at(12.69), at(13.53)].map((f) => s(f, fx("pop"), 0.3))}
      {s(at(16.17) - 4, fx("whoosh"), 0.3)}
      {[at(17.69), at(18.97)].map((f) => s(f, fx("pop"), 0.28))}
      {s(at(20.49), fx("error"), 0.25)}
      {s(at(20.49) + 20, "sfx/correct.wav", 0.3)}
      {s(WHIP, fx("whoosh"), 0.45)}
      {s(CTA, fx("boom"), 0.3)}
      {s(at(24.79), fx("pop"), 0.3)}
      <Audio
        src={staticFile("ai/edit/music.mp3")}
        volume={(f) => 0.07 * interpolate(f, [0, 10, YANGILIK_TOTAL - 25, YANGILIK_TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </>
  );
}

export function YangilikEdit() {
  const phone1 = { from: at(5.47), to: at(12.21) - 2 };
  const phone2 = { from: at(16.17), to: WHIP };
  return (
    <AbsoluteFill style={{ background: "#2A0E3C", overflow: "hidden" }}>
      <Footage />
      {/* 훅: 두 나라 말 → 놀라운 소식 */}
      <Sticker from={at(1.39)} to={at(4.71)} x={70} y={250}>
        <FlagKR />
      </Sticker>
      <Sticker from={at(1.91)} rot={6} to={at(4.71)} x={860} y={250}>
        <FlagGB />
      </Sticker>
      <Word from={at(1.39)} text="KOREYS" to={at(3.73) - 2} y={1010} />
      <Word from={at(1.91)} text="+ INGLIZ" to={at(3.73) - 2} y={1140} />
      <Word from={at(3.73)} size={130} text="AJOYIB" to={at(4.71)} y={1000} />
      <Word color={GREEN} from={at(4.09)} size={130} text="YANGILIK" to={at(4.71)} y={1140} />
      <Sparks at={at(4.09)} y={1200} />
      {/* 앱 화면 + 배울 수 있는 것 */}
      <Phone
        from={phone1.from}
        shots={[
          { from: phone1.from, to: at(8.3), src: "courses" },
          { from: at(8.3), to: at(9.29), src: "hangul" },
          { from: at(9.29), to: at(10.75), src: "lesson" },
          { from: at(10.75), to: phone1.to, src: "topik", trim: 20 },
        ]}
        to={phone1.to}
      />
      <Card color="#7B5CFF" from={at(8.3)} icon="ㄱㄴ" label="Harflar" sub="Hangul alifbosi" to={phone1.to} y={960} />
      <Card color="#FF8A3D" from={at(9.29)} icon="가" label="So‘zlar" sub="Rasm va ovoz bilan" to={phone1.to} y={1090} />
      <Card color="#22B573" from={at(9.86)} icon="은/는" iconStyle={{ fontSize: 28 }} label="Grammatika" sub="Qoidalar va mashq" to={phone1.to} y={1220} />
      <Card color="#2F6FE0" from={at(10.75)} icon="TOPIK" iconStyle={{ fontFamily: HEAVY, fontSize: 22 }} label="TOPIK" sub="Imtihonga tayyorlov" to={phone1.to} y={1350} />
      {/* 우즈베크어로 · 온라인 */}
      <Sticker from={at(12.69)} rot={-8} to={at(15.7)} x={70} y={250}>
        <FlagUZ />
      </Sticker>
      <Word from={at(12.21)} size={70} text="MUTLAQO" to={at(15.7)} y={960} />
      <Word color={GREEN} from={at(12.69)} size={96} text="O‘ZBEK TILIDA" to={at(15.7)} y={1040} />
      <Word from={at(13.53)} size={96} text="VA ONLAYN" to={at(15.7)} y={1170} />
      {/* AI 선생님 */}
      <Phone from={phone2.from} shots={[{ from: phone2.from, to: phone2.to, src: "tutor", trim: 105 }]} to={phone2.to} />
      <Card color="#6A55F5" from={at(17.69)} icon="AI" iconStyle={{ fontFamily: HEAVY, fontSize: 36 }} label="AI ustoz" sub="Sun’iy intellekt" to={WHIP - 4} y={960} />
      <Card color="#FF5FA2" from={at(18.97)} icon={<svg height={44} viewBox="0 0 24 24" width={44}><rect fill="#fff" height={12} rx={4} width={8} x={8} y={2} /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={2.4} /></svg>} label="Jonli suhbat" sub="Ovozli dars" to={WHIP - 4} y={1090} />
      <FixCard from={at(20.49)} to={WHIP - 4} />
      <Cta />
      <Flash />
      <Sound />
    </AbsoluteFill>
  );
}
