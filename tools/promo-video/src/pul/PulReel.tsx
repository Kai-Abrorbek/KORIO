/**
 * "Kurslar sizdan pul oladi. KORIO esa sizga to‘laydi." — 앱에서 보석을 모아 카드로 받는 법 (약 59초).
 *
 * 훅(학원비 −  vs  KORIO +) → 1 gavhar = 1 so‘m → 길 1 공부(상자·과제·3일 상자·리그) → 길 2 선물(앱 평가)
 *   → 열린 고리 "제일 많이 주는 건 3번" → 길 3 친구(각자 +1000, 50명 = 82 000) → 열린 고리 "어떻게 받나"
 *   → 출금 화면(앱 문구 그대로 그린 것) → 친구에게 보내기 → 첫 장면으로 이어짐.
 * 숫자는 api 코드 기본값 (economy · retention · referral · gem-payout 상수).
 * 앱 화면: public/clips(앱 녹화) + public/ai/pul/quests·referral (사용자 폰 녹화에서 자른 것).
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import WORDS from "./pul.words.json";

const FPS = 30;
const W = 1080;
const H = 1920;
const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const BODY = '"Segoe UI", sans-serif';
const PURPLE = "#7B5CFF";
const PINK = "#FF5FA2";
const YELLOW = "#FFE14D";
const GOLD = "#FFC83D";
const GREEN = "#22C55E";
const RED = "#EF4444";
const INK = "#1C1A2E";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (f: number, at: number, d: number) => clamp01((f - at) / d);
const pop = (f: number, at: number, stiffness = 220, damping = 13) => spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const fmt = (n: number) => Math.round(n).toLocaleString("en-US").replace(/,/g, " ");

// ───────────────────────────── 대사 시각
type Key = "v01" | "v02" | "v03" | "v04" | "v05" | "v06" | "v07" | "v08" | "v09" | "v10" | "v11" | "v12" | "v13" | "v14";
type Line = { len: number; words: { w: string; s: number; e: number }[] };
const LINES = WORDS.lines as Record<Key, Line>;
/** 줄 앞의 쉼(프레임). 열린 고리 앞뒤는 조금 더 쉰다 */
const ORDER: [Key, number][] = [
  ["v01", 2],
  ["v02", 8],
  ["v03", 6],
  ["v04", 10],
  ["v05", 6],
  ["v06", 6],
  ["v07", 10],
  ["v08", 12],
  ["v09", 12],
  ["v10", 6],
  ["v11", 12],
  ["v12", 12],
  ["v13", 6],
  ["v14", 12],
];
const S = {} as Record<Key, number>;
let cursor = 0;
for (const [key, gap] of ORDER) {
  S[key] = cursor + gap;
  cursor = S[key] + Math.round(LINES[key].len * FPS);
}
const SPEECH_END = cursor;
const TAIL = 48;
export const PUL_TOTAL = SPEECH_END + TAIL;
const lineEnd = (key: Key) => S[key] + Math.round(LINES[key].len * FPS);
/** 줄 key 에서 text 로 시작하는 첫 단어(after 번째 이후)의 시작 프레임 */
const wAt = (key: Key, text: string, after = 0) => {
  const words = LINES[key].words;
  const i = words.findIndex((x, k) => k >= after && x.w.toLowerCase().replace(/[ʻ‘'’]/g, "").startsWith(text.toLowerCase().replace(/[ʻ‘'’]/g, "")));
  return S[key] + Math.round((words[i >= 0 ? i : 0].s ?? 0) * FPS);
};

// ───────────────────────────── 부품
function Show({ from, to, children }: { from: number; to: number; children: (local: number, out: number) => ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return <>{children(frame - from, ramp(frame, to - 7, 7))}</>;
}

function Gem({ size = 60, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <svg height={size} style={{ filter: glow ? "drop-shadow(0 0 12px rgba(120,220,255,0.7))" : "none", flex: "none" }} viewBox="0 0 24 24" width={size}>
      <path d="M6 3h12l4 6-10 12L2 9z" fill="#5BD6FF" />
      <path d="M6 3l3 6-7 0zM18 3l-3 6 7 0z" fill="#9BE8FF" />
      <path d="M9 9h6l-3 12z" fill="#2FB4F0" />
      <path d="M6 3h12l-3 6H9z" fill="#C9F4FF" />
    </svg>
  );
}

function Logo({ size = 120 }: { size?: number }) {
  return (
    <div style={{ display: "inline-block", padding: `${size * 0.06}px ${size * 0.3}px`, borderRadius: size * 0.3, background: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}>
      <span style={{ fontFamily: HEAVY, fontSize: size, letterSpacing: size * 0.03, color: PURPLE }}>KORI</span>
      <span style={{ fontFamily: HEAVY, fontSize: size, letterSpacing: size * 0.03, color: PINK }}>O</span>
    </div>
  );
}

function Pill({ children, style, color = "rgba(255,255,255,0.14)" }: { children: ReactNode; style?: CSSProperties; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 26px", borderRadius: 999, background: color, border: "2px solid rgba(255,255,255,0.25)", boxShadow: "0 14px 30px rgba(0,0,0,0.3)", fontFamily: HEAVY, fontSize: 40, color: "#fff", whiteSpace: "nowrap", ...style }}>
      {children}
    </div>
  );
}

/** 훅·끝에서 쓰는 큰 도장 글자 */
function Slam({ at, children, size = 120, color = "#fff", rot = -4 }: { at: number; children: ReactNode; size?: number; color?: string; rot?: number }) {
  const frame = useCurrentFrame();
  const t = ramp(frame, at, 6);
  const s = interpolate(t, [0, 1], [2.2, 1], { easing: (v) => v * v });
  return (
    <div style={{ fontFamily: HEAVY, fontSize: size, lineHeight: 1, color, textAlign: "center", transform: `rotate(${rot}deg) scale(${s})`, opacity: Math.min(1, t * 1.8), textShadow: "0 8px 0 rgba(0,0,0,0.55), 0 20px 40px rgba(0,0,0,0.4)" }}>{children}</div>
  );
}

// ───────────────────────────── 배경
const GLYPHS = ["한", "A", "글", "ㄱ", "B", "가", "ㅎ", "C", "나", "ㅏ", "Z", "말"];
function Studio() {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const blob = (x: number, y: number, r: number, color: string, speed: number, phase: number) => (
    <div style={{ position: "absolute", left: x + Math.sin(t * speed + phase) * 80 - r, top: y + Math.cos(t * speed * 0.8 + phase) * 60 - r, width: r * 2, height: r * 2, borderRadius: r, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: "blur(10px)" }} />
  );
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #3A2A8C 0%, #1F1655 45%, #0E0A2A 100%)", overflow: "hidden" }}>
      {blob(200, 520, 420, "rgba(123,92,255,0.55)", 0.35, 0)}
      {blob(900, 900, 380, "rgba(255,200,61,0.22)", 0.28, 2)}
      {blob(540, 1580, 520, "rgba(56,189,248,0.2)", 0.22, 4)}
      {GLYPHS.map((g, i) => {
        const x = (i * 97) % W;
        const y = H - ((t * (18 + (i % 4) * 7) + i * 260) % (H + 300));
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, fontFamily: /[A-Z]/.test(g) ? HEAVY : '"Malgun Gothic", sans-serif', fontWeight: 900, fontSize: 90 + (i % 3) * 40, color: "rgba(255,255,255,0.06)", transform: `rotate(${Math.sin(t + i) * 12}deg)` }}>
            {g}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/** 보석이 쏟아진다 (start 부터 n 개, 위에서 아래로) */
function GemRain({ start, n = 18, until }: { start: number; n?: number; until: number }) {
  const frame = useCurrentFrame();
  if (frame < start || frame >= until) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const delay = (i * 7) % 24;
        const l = frame - start - delay;
        if (l < 0) return null;
        const x = 80 + ((i * 263) % 920);
        const y = -80 + l * (26 + (i % 5) * 4);
        if (y > H) return null;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transform: `rotate(${(l * (i % 2 ? 7 : -6)) % 360}deg)` }}>
            <Gem glow={false} size={48 + (i % 3) * 16} />
          </div>
        );
      })}
    </>
  );
}

/** 위쪽 길 제목 */
function Header() {
  const frame = useCurrentFrame();
  const items = [
    { from: S.v04, to: S.v07, n: "1", t: "O‘QISH", c: PURPLE },
    { from: S.v07, to: S.v08, n: "2", t: "SOVG‘ALAR", c: PINK },
    { from: S.v09, to: S.v11, n: "3", t: "DO‘STLAR", c: GREEN },
    { from: S.v12, to: S.v14, n: "", t: "PULNI YECHISH", c: GOLD },
  ];
  const it = items.find((x) => frame >= x.from && frame < x.to);
  if (!it) return null;
  const s = pop(frame, it.from, 260, 15);
  const out = ramp(frame, it.to - 6, 6);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", justifyContent: "center", opacity: s * (1 - out), transform: `translateY(${(1 - s) * -120}px)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 32px 10px 12px", borderRadius: 999, background: "#fff", boxShadow: "0 16px 34px rgba(0,0,0,0.35)" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: it.c, color: "#fff", fontFamily: HEAVY, fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>{it.n || <Gem glow={false} size={40} />}</div>
        <div style={{ fontFamily: HEAVY, fontSize: 48, color: INK }}>{it.n ? `${it.n}-YO‘L · ` : ""}{it.t}</div>
      </div>
    </div>
  );
}

// ───────────────────────────── 보석 계산기 (오른쪽 위에서 쌓인다)
function Counter() {
  const frame = useCurrentFrame();
  if (frame < S.v04 || frame >= S.v14) return null;
  const steps = [
    { f: wAt("v04", "sandiq") + 8, add: 25 },
    { f: wAt("v05", "kunlik") + 10, add: 75 },
    { f: wAt("v05", "ikki") + 4, add: 200 },
    { f: wAt("v06", "bonus"), add: 30 },
    { f: wAt("v07", "besh"), add: 500 },
    { f: wAt("v09", "ming") + 2, add: 1000 },
    { f: wAt("v10", "ellik"), set: 82000 },
    { f: wAt("v13", "sorov") + 8, add: -50000 },
  ];
  let from = 0;
  let to = 0;
  let at = -99;
  for (const st of steps) {
    if (frame < st.f) break;
    from = to;
    to = st.set ?? to + (st.add ?? 0);
    at = st.f;
  }
  const v = interpolate(frame, [at, at + 16], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const bump = frame - at < 14 ? 1 - (frame - at) / 14 : 0;
  const s = pop(frame, S.v04, 260, 16);
  const hidden = frame >= S.v08 && frame < S.v09 ? 1 - ramp(frame, S.v09 - 6, 6) : 0;
  return (
    <div style={{ position: "absolute", right: 30, top: 270, transform: `translateX(${(1 - s) * 400}px) scale(${1 + bump * 0.12})`, transformOrigin: "right center", opacity: 1 - hidden * 0.7 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 22px 10px 14px", borderRadius: 999, background: "rgba(14,10,42,0.85)", border: `3px solid ${bump > 0 ? GOLD : "rgba(255,255,255,0.18)"}`, boxShadow: "0 14px 30px rgba(0,0,0,0.4)" }}>
        <Gem size={44} />
        <span style={{ fontFamily: HEAVY, fontSize: 46, color: "#fff", minWidth: 150, textAlign: "right" }}>{fmt(v)}</span>
      </div>
      <div style={{ marginTop: 6, textAlign: "right", fontFamily: BODY, fontWeight: 700, fontSize: 24, color: "rgba(255,255,255,0.75)" }}>= {fmt(v)} so‘m</div>
    </div>
  );
}

// ───────────────────────────── 폰
const SCR_H = 880;
const SCR_W = Math.round((SCR_H * 780) / 1688);
const PAD = 12;
const PHONE_X = Math.round((W - SCR_W - PAD * 2) / 2);
const PHONE_Y = 380;
type Shot = { from: number; to: number; src: string; trim?: number; rate?: number; node?: ReactNode };

function Phone({ shots, from, to }: { shots: Shot[]; from: number; to: number }) {
  const frame = useCurrentFrame();
  if (frame < from - 2 || frame >= to + 10) return null;
  const s = pop(frame, from, 180, 16);
  const leave = ramp(frame, to, 10);
  const bob = Math.sin(frame / 24) * 5;
  return (
    <div style={{ position: "absolute", left: PHONE_X, top: PHONE_Y, transform: `translateY(${(1 - s) * 1400 + leave * 1500 + bob}px) rotate(${(1 - s) * 10 - 2}deg)` }}>
      <div style={{ padding: PAD, borderRadius: 50, background: "linear-gradient(145deg, #2A2540, #0F0C1E)", boxShadow: "0 40px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.14), 0 0 70px rgba(123,92,255,0.5)" }}>
        <div style={{ position: "relative", width: SCR_W, height: SCR_H, borderRadius: 40, overflow: "hidden", background: "#fff" }}>
          {shots.map((sh) => (
            <Sequence durationInFrames={sh.to - sh.from} from={sh.from} key={`${sh.src}-${sh.from}`} layout="none">
              {sh.node ?? <OffthreadVideo muted playbackRate={sh.rate ?? 1} src={staticFile(sh.src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} trimBefore={Math.round((sh.trim ?? 0) * FPS)} />}
            </Sequence>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 폰 옆에 튀어나오는 보상 표 */
function Tag({ at, until, side, top, children, color = GOLD, ink = INK, rot = -5 }: { at: number; until: number; side: "left" | "right"; top: number; children: ReactNode; color?: string; ink?: string; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  const s = pop(frame, at, 300, 12);
  const out = ramp(frame, until - 6, 6);
  return (
    <div style={{ position: "absolute", top, [side]: 24, transform: `scale(${s}) rotate(${rot}deg)`, opacity: 1 - out }}>
      <div style={{ padding: "14px 22px", borderRadius: 24, background: color, color: ink, fontFamily: HEAVY, fontSize: 46, lineHeight: 1.05, textAlign: "center", boxShadow: "0 16px 34px rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>{children}</div>
    </div>
  );
}

/** 레슨 끝 상자 — 열리며 보석이 튄다 */
function Chest({ at, until }: { at: number; until: number }) {
  const frame = useCurrentFrame();
  const l = frame - at;
  if (l < 0 || frame >= until) return null;
  const s = pop(frame, at, 240, 12);
  const open = ramp(frame, at + 10, 6);
  const shake = l < 10 ? Math.sin(l * 2.4) * 6 : 0;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", transform: `scale(${s}) translateX(${shake}px)` }}>
      <div style={{ position: "relative", width: 300, height: 240 }}>
        {open > 0
          ? Array.from({ length: 9 }, (_, i) => {
              const a = -Math.PI / 2 + (i - 4) * 0.32;
              const d = (l - 10) * 16;
              return (
                <div key={i} style={{ position: "absolute", left: 120 + Math.cos(a) * d, top: 40 + Math.sin(a) * d + Math.max(0, l - 16) ** 2 * 0.6, opacity: 1 - ramp(frame, at + 28, 10) }}>
                  <Gem size={56} />
                </div>
              );
            })
          : null}
        <div style={{ position: "absolute", left: 20, top: 100, width: 260, height: 140, borderRadius: 18, background: "linear-gradient(#B7742B, #8A4F17)", border: "8px solid #5A3210", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: 104, top: 20, width: 36, height: 48, borderRadius: 8, background: GOLD, border: "4px solid #8A5A00" }} />
        </div>
        <div style={{ position: "absolute", left: 14, top: 40, width: 272, height: 80, borderRadius: "40px 40px 10px 10px", background: "linear-gradient(#D08A3A, #A1601F)", border: "8px solid #5A3210", transformOrigin: "50% 100%", transform: `rotate(${-open * 28}deg) translateY(${-open * 30}px)` }} />
        {open > 0 ? <div style={{ position: "absolute", left: 40, top: 70, width: 220, height: 60, borderRadius: 30, background: "radial-gradient(rgba(255,230,120,0.9), transparent 70%)", filter: "blur(6px)", opacity: open }} /> : null}
      </div>
    </div>
  );
}

// ───────────────────────────── 출금 화면 (앱 문구 그대로 그린 것)
function WithdrawScreen() {
  // 폰의 Sequence 안에서 그려져서 프레임이 S.v12 부터 0 으로 센다 — 영상 시각으로 되돌린다
  const g = useCurrentFrame() + S.v12;
  const tSection = wAt("v12", "gavharni");
  const tCard = wAt("v12", "karta");
  const tAmount = wAt("v13", "ellik");
  const tSend = wAt("v13", "sorov");
  const tDone = wAt("v13", "pul");
  const brandOn = g >= tCard;
  const num = "9860 •••• •••• 4821";
  const typedNum = num.slice(0, Math.floor(ramp(g, tCard + 4, 16) * num.length));
  const name = "ALISHER KARIMOV";
  const typedName = name.slice(0, Math.floor(ramp(g, tCard + 22, 14) * name.length));
  const amount = g >= tAmount ? fmt(Math.round(ramp(g, tAmount, 10) * 50000)) : "";
  const sent = g >= tSend + 10;
  const card = (children: ReactNode, style?: CSSProperties) => <div style={{ margin: "0 18px 14px", padding: "16px 18px", borderRadius: 18, background: "#fff", boxShadow: "0 4px 14px rgba(40,30,90,0.08)", ...style }}>{children}</div>;
  const label = (t: string) => <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 20, color: "#6B6880", marginBottom: 6 }}>{t}</div>;
  const field = (v: string, ph: string, on: boolean) => (
    <div style={{ padding: "12px 14px", borderRadius: 12, border: `2px solid ${on ? PURPLE : "#E5E1F5"}`, fontFamily: BODY, fontWeight: 700, fontSize: 25, color: v ? INK : "#B8B4C8", minHeight: 26 }}>
      {v || ph}
      {on && Math.floor(g / 8) % 2 ? <span style={{ color: PURPLE }}>|</span> : null}
    </div>
  );
  const scroll = interpolate(g, [tSection, tSection + 12, tAmount - 6, tAmount + 6], [0, 140, 140, 330], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div style={{ position: "absolute", inset: 0, background: "#F5F3FF", fontFamily: BODY }}>
      <div style={{ position: "relative", zIndex: 2, padding: "52px 22px 14px", display: "flex", alignItems: "center", gap: 14, background: "#F5F3FF", boxShadow: "0 6px 14px rgba(40,30,90,0.06)" }}>
        <span style={{ fontSize: 33, color: INK }}>‹</span>
        <span style={{ fontFamily: HEAVY, fontSize: 33, color: INK }}>Do‘kon</span>
      </div>
      <div style={{ position: "relative", zIndex: 1, transform: `translateY(${-scroll}px)` }}>
        {card(
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 21, color: "#6B6880" }}>Gavharlarim</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: HEAVY, fontSize: 34, color: INK, whiteSpace: "nowrap" }}>
                <Gem glow={false} size={36} />
                {sent ? "32 000" : "82 000"}
              </div>
            </div>
            <div style={{ padding: "8px 14px", borderRadius: 999, background: "#EDE9FF", fontWeight: 800, fontSize: 20, color: PURPLE }}>1 gavhar = 1 so‘m</div>
          </div>,
          { background: "linear-gradient(135deg, #fff, #F0ECFF)" },
        )}
        <div style={{ margin: "8px 22px 8px", fontFamily: HEAVY, fontSize: 24, color: "#6B6880", letterSpacing: 1 }}>GAVHARNI YECHISH</div>
        {card(
          <>
            <div style={{ fontFamily: HEAVY, fontSize: 28, color: INK }}>Kartaga o‘tkazish</div>
            <div style={{ marginTop: 4, fontSize: 19, color: "#6B6880", lineHeight: 1.3 }}>To‘plagan gavharlaringizni kartaga qaytarib oling.</div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["Uzcard", "Humo", "Visa", "Mastercard"].map((b) => {
                const on = brandOn && b === "Humo";
                return (
                  <div key={b} style={{ flex: 1, padding: "10px 0", borderRadius: 12, textAlign: "center", fontWeight: 800, fontSize: 18, color: on ? "#fff" : INK, background: on ? PURPLE : "#F1EFF8", transform: `scale(${on ? 1 + 0.08 * (1 - ramp(g, tCard, 8)) : 1})` }}>
                    {b}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14 }}>
              {label("Karta raqami")}
              {field(typedNum, "0000 0000 0000 0000", g >= tCard && g < tCard + 22)}
            </div>
            <div style={{ marginTop: 12 }}>
              {label("Karta egasining ismi")}
              {field(typedName, "ALISHER KARIMOV", g >= tCard + 22 && g < tAmount)}
            </div>
            <div style={{ marginTop: 12 }}>
              {label("Gavhar miqdori")}
              {field(amount, "Eng kami 50 000 gavhardan boshlanadi", g >= tAmount && g < tSend)}
              {amount ? <div style={{ marginTop: 6, fontWeight: 800, fontSize: 21, color: GREEN }}>{amount} so‘m olasiz</div> : null}
            </div>
            <div style={{ marginTop: 16, padding: "16px 0", borderRadius: 16, textAlign: "center", fontFamily: HEAVY, fontSize: 26, color: "#fff", background: g >= tAmount ? PURPLE : "#C9C2F2", transform: `scale(${g >= tSend && g < tSend + 8 ? 0.95 : 1})` }}>So‘rov yuborish</div>
          </>,
        )}
      </div>
      {/* 요청 뒤: 진행 단계 */}
      {sent ? (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 22px 40px", borderRadius: "28px 28px 0 0", background: "#fff", boxShadow: "0 -10px 40px rgba(40,30,90,0.2)", transform: `translateY(${(1 - pop(g, tSend + 10, 200, 18)) * 500}px)` }}>
          <div style={{ fontFamily: HEAVY, fontSize: 26, color: INK }}>Yechish so‘rovingiz ko‘rib chiqilmoqda</div>
          <div style={{ marginTop: 6, fontSize: 18, color: "#6B6880", lineHeight: 1.3 }}>Jamoamiz tekshirib, pulni kartangizga o‘tkazadi.</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 18 }}>
            {["So‘rov", "O‘tkazish", "Tayyor"].map((stp, i) => {
              const on = g >= tSend + 14 + (tDone - tSend) * (i / 2) * 1.0;
              return (
                <div key={stp} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: on ? GREEN : "#E5E1F5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontSize: 26, transform: `scale(${on ? 1 : 0.9})` }}>{on ? "✓" : i + 1}</div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: on ? INK : "#9E9AB0" }}>{stp}</div>
                  </div>
                  {i < 2 ? <div style={{ flex: 1, height: 5, margin: "0 6px 24px", borderRadius: 3, background: on ? GREEN : "#E5E1F5" }} /> : null}
                </div>
              );
            })}
          </div>
          {g >= tDone + 6 ? <div style={{ marginTop: 16, padding: "10px 0", borderRadius: 12, textAlign: "center", fontFamily: HEAVY, fontSize: 26, color: GREEN, background: "#E9FBEF", transform: `scale(${pop(g, tDone + 6, 300, 12)})` }}>Yuborildi · 50 000 so‘m</div> : null}
        </div>
      ) : null}
    </div>
  );
}

// ───────────────────────────── 장면 그래픽
function Graphics() {
  const frame = useCurrentFrame();
  const korio = wAt("v01", "korio");
  return (
    <>
      {/* 훅: 학원비 − vs KORIO + (첫 프레임부터 보인다) */}
      <Show from={0} to={S.v02}>
        {(_, out) => {
          // 첫 프레임이 곧 훅 — 두 쪽 다 이미 서 있다
          const debt = 500000;
          const right = 1;
          const hit = frame >= korio - 4 ? pop(frame, korio - 4, 300, 10) : 0;
          return (
            <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: W / 2, height: H, background: "linear-gradient(180deg, rgba(120,20,30,0.9), rgba(60,8,16,0.95))" }} />
              <div style={{ position: "absolute", left: W / 2, top: 0, width: W / 2, height: H, background: "linear-gradient(180deg, rgba(10,90,50,0.92), rgba(4,40,24,0.95))", clipPath: `inset(0 0 ${(1 - right) * 100}% 0)` }} />
              <div style={{ position: "absolute", left: 0, width: W / 2, top: 560, textAlign: "center" }}>
                <Slam at={-8} size={124}>
                  KURS
                </Slam>
                <div style={{ marginTop: 44, fontFamily: HEAVY, fontSize: 100, color: "#FF8A8A", textShadow: "0 6px 0 #3A0008" }}>−{fmt(debt)}</div>
                <div style={{ fontFamily: HEAVY, fontSize: 52, color: "#fff" }}>so‘m / oy</div>
                <div style={{ marginTop: 34, fontFamily: HEAVY, fontSize: 54, color: "#FFB4B4" }}>sizdan oladi</div>
              </div>
              {right > 0.01 ? (
                <div style={{ position: "absolute", left: W / 2, width: W / 2, top: 530, display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${1 + hit * 0.08 - (frame >= korio - 4 ? 0.08 : 0)})` }}>
                  <div style={{ transform: `scale(${right}) rotate(4deg)` }}>
                    <Logo size={96} />
                  </div>
                  <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 10, fontFamily: HEAVY, fontSize: 84, color: "#8CFFB5", textShadow: "0 6px 0 #00290F", transform: `scale(${right})` }}>
                    +<Gem size={76} />
                  </div>
                  <div style={{ fontFamily: HEAVY, fontSize: 52, color: "#fff" }}>= so‘m</div>
                  <div style={{ marginTop: 34, fontFamily: HEAVY, fontSize: 54, color: "#BFFFD6" }}>sizga to‘laydi</div>
                </div>
              ) : null}
              <div style={{ position: "absolute", left: W / 2 - 3, top: 0, width: 6, height: H, background: "rgba(255,255,255,0.6)" }} />
            </div>
          );
        }}
      </Show>
      <GemRain n={14} start={korio} until={S.v02 + 20} />

      {/* v02: 1 gavhar = 1 so‘m */}
      <Show from={S.v02} to={S.v03 + 4}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, opacity: 1 - out }}>
            <div style={{ display: "flex", alignItems: "center", gap: 30, transform: `scale(${pop(frame, S.v02, 260, 13)})` }}>
              <Pill color="#fff" style={{ color: INK, fontSize: 56 }}>Dars</Pill>
              <span style={{ fontFamily: HEAVY, fontSize: 80, color: "#fff" }}>→</span>
              {frame >= wAt("v02", "gavhar") ? (
                <div style={{ transform: `scale(${pop(frame, wAt("v02", "gavhar"), 300, 11)})` }}>
                  <Gem size={130} />
                </div>
              ) : null}
            </div>
            {frame >= wAt("v02", "bir", 3) ? (
              <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 44px", borderRadius: 30, background: YELLOW, boxShadow: "0 20px 40px rgba(0,0,0,0.4)", transform: `scale(${pop(frame, wAt("v02", "bir", 3), 280, 12)}) rotate(-3deg)` }}>
                <span style={{ fontFamily: HEAVY, fontSize: 110, color: INK }}>1</span>
                <Gem glow={false} size={100} />
                <span style={{ fontFamily: HEAVY, fontSize: 110, color: INK }}>= 1 so‘m</span>
              </div>
            ) : null}
          </div>
        )}
      </Show>

      {/* v03: 카드로 → 길이 셋, 셋째가 제일 많이 */}
      <Show from={S.v03} to={S.v04}>
        {(l, out) => {
          const three = wAt("v03", "uchta");
          return (
            <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
              {frame < three ? (
                <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center" }}>
                  <div style={{ position: "relative", width: 620, height: 380, borderRadius: 34, background: "linear-gradient(135deg, #1E3A8A, #0EA5E9)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", transform: `scale(${pop(frame, S.v03, 220, 14)}) rotate(-4deg)`, padding: 40, color: "#fff", fontFamily: HEAVY }}>
                    <div style={{ width: 90, height: 66, borderRadius: 12, background: "linear-gradient(135deg, #FDE68A, #D97706)" }} />
                    <div style={{ marginTop: 70, fontSize: 52, letterSpacing: 4 }}>•••• •••• •••• 4821</div>
                    <div style={{ marginTop: 18, fontSize: 30, opacity: 0.85 }}>UZCARD · HUMO · VISA</div>
                    {Array.from({ length: 6 }, (_, i) => {
                      const d = l - 8 - i * 4;
                      if (d < 0 || d > 14) return null;
                      return (
                        <div key={i} style={{ position: "absolute", left: -160 + i * 30 + d * 30, top: -260 + d * 26, opacity: 1 - d / 14 }}>
                          <Gem size={70} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div style={{ position: "absolute", left: 0, right: 0, top: 600, display: "flex", justifyContent: "center", gap: 30 }}>
                  {[1, 2, 3].map((n, i) => {
                    const s = pop(frame, three + i * 5, 300, 12);
                    const best = n === 3 && frame >= wAt("v03", "uchinchisi");
                    return (
                      <div key={n} style={{ width: 260, height: 340, borderRadius: 30, background: best ? `linear-gradient(160deg, ${YELLOW}, ${GOLD})` : "rgba(255,255,255,0.12)", border: `4px solid ${best ? "#fff" : "rgba(255,255,255,0.3)"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${s * (best ? 1.12 : 1)}) rotate(${(i - 1) * 4}deg)`, boxShadow: best ? "0 0 60px rgba(255,200,61,0.7)" : "none" }}>
                        <div style={{ fontFamily: HEAVY, fontSize: 150, lineHeight: 1, color: best ? INK : "#fff" }}>{best ? "?" : n}</div>
                        <div style={{ fontFamily: HEAVY, fontSize: 34, color: best ? INK : "rgba(255,255,255,0.8)" }}>{best ? "ENG KO‘P" : "YO‘L"}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }}
      </Show>

      {/* 길 1·2 폰 */}
      <Phone
        from={S.v04}
        shots={[
          { from: S.v04, to: S.v05, src: "clips/stamp.mp4", trim: 1.2 },
          { from: S.v05, to: wAt("v05", "uch"), src: "ai/pul/quests.mp4", trim: 2.0 },
          { from: wAt("v05", "uch"), to: S.v06, src: "clips/streak.mp4", trim: 0.6 },
          { from: S.v06, to: S.v07, src: "clips/leagueResult.mp4", trim: 0.2 },
        ]}
        to={S.v07}
      />
      <Chest at={wAt("v04", "sandiq") - 4} until={S.v05} />
      <Tag at={wAt("v04", "sandiq") + 8} side="left" top={900} until={S.v05}>
        <Gem glow={false} size={50} />
        +10…40
      </Tag>
      <Tag at={wAt("v05", "kunlik") + 6} side="right" top={760} until={wAt("v05", "uch")}>
        +20
        <br />
        +35
        <br />
        +20
      </Tag>
      <Tag at={wAt("v05", "ikki")} color={PINK} ink="#fff" side="left" top={700} until={S.v06}>
        3 KUN
        <span style={{ fontSize: 64 }}>+200</span>
      </Tag>
      <Tag at={wAt("v06", "ligada")} color={PURPLE} ink="#fff" rot={5} side="right" top={700} until={S.v07}>
        TOP-3
        <span style={{ fontSize: 40 }}>+10…130</span>
      </Tag>

      {/* v07: 선물 — 앱 평가 별 다섯 개 */}
      <Show from={S.v07} to={S.v08}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, opacity: 1 - out }}>
            <div style={{ display: "flex", gap: 14 }}>
              {[0, 1, 2, 3, 4].map((i) => {
                const on = frame >= wAt("v07", "ilovani") + i * 4;
                return (
                  <svg height={130} key={i} style={{ transform: `scale(${on ? pop(frame, wAt("v07", "ilovani") + i * 4, 320, 10) : 0.8})` }} viewBox="0 0 24 24" width={130}>
                    <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.1l1.5-7L2 9.3l7-.8z" fill={on ? GOLD : "rgba(255,255,255,0.18)"} stroke={on ? "#B7791F" : "transparent"} strokeWidth="0.8" />
                  </svg>
                );
              })}
            </div>
            {frame >= wAt("v07", "besh") ? (
              <div style={{ display: "flex", alignItems: "center", gap: 16, transform: `scale(${pop(frame, wAt("v07", "besh"), 300, 11)}) rotate(-3deg)` }}>
                <span style={{ fontFamily: HEAVY, fontSize: 150, color: YELLOW, textShadow: "0 8px 0 #000" }}>+500</span>
                <Gem size={120} />
              </div>
            ) : null}
            {frame >= wAt("v07", "besh") + 12 ? (
              <div style={{ transform: `scale(${pop(frame, wAt("v07", "besh") + 12, 300, 13)})` }}>
                <Pill color={PINK}>Birinchi hafta har kuni: +310</Pill>
              </div>
            ) : null}
          </div>
        )}
      </Show>

      {/* v08: 열린 고리 1 */}
      <Show from={S.v08 - 4} to={S.v09}>
        {(l, out) => (
          <div style={{ position: "absolute", inset: 0, background: `rgba(6,4,20,${0.75 * ramp(l, 0, 6)})`, opacity: 1 - out }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <Slam at={S.v08} size={86}>
                ENG KO‘P
                <br />
                BERADIGANI…
              </Slam>
              {frame >= wAt("v08", "uchinchisi") ? (
                <div style={{ fontFamily: HEAVY, fontSize: 260, lineHeight: 1, color: YELLOW, textShadow: "0 0 60px rgba(255,200,61,0.8), 0 10px 0 #000", transform: `scale(${pop(frame, wAt("v08", "uchinchisi"), 260, 9)})` }}>3</div>
              ) : null}
            </div>
          </div>
        )}
      </Show>

      {/* 길 3: 친구 */}
      <Phone
        from={S.v09}
        shots={[{ from: S.v09, to: S.v10, src: "ai/pul/referral.mp4", trim: 0.6, rate: Math.max(0.35, (2.25 * FPS) / (S.v10 - S.v09)) }]}
        to={S.v10}
      />
      <Tag at={wAt("v09", "sizga")} side="left" top={760} until={S.v10}>
        SIZGA
        <span style={{ fontSize: 60 }}>+1000</span>
      </Tag>
      <Tag at={wAt("v09", "unga")} color={GREEN} ink="#fff" rot={5} side="right" top={760} until={S.v10}>
        DO‘STGA
        <span style={{ fontSize: 60 }}>+1000</span>
      </Tag>
      <Show from={S.v10} to={S.v11}>
        {(_, out) => {
          const bars = [
            { n: 10, gems: 14000, f: wAt("v10", "on") },
            { n: 25, gems: 37000, f: wAt("v10", "on") + 18 },
            { n: 50, gems: 82000, f: wAt("v10", "ellik") },
          ];
          return (
            <div style={{ position: "absolute", left: 90, right: 90, top: 560, height: 700, display: "flex", alignItems: "flex-end", justifyContent: "space-between", opacity: 1 - out }}>
              {bars.map((b, i) => {
                const g = pop(frame, b.f, 160, 16);
                const h = 160 + i * 210;
                const big = i === 2;
                return (
                  <div key={b.n} style={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: frame >= b.f ? 1 : 0.15 }}>
                    <div style={{ fontFamily: HEAVY, fontSize: big ? 64 : 48, color: big ? YELLOW : "#fff", textShadow: "0 6px 0 #000" }}>{fmt(b.gems * Math.min(1, g))}</div>
                    {big && frame >= b.f + 10 ? <Pill color={PURPLE} style={{ fontSize: 30, padding: "8px 18px" }}>+ 2 oy SUPER</Pill> : null}
                    <div style={{ width: "100%", height: h * g, borderRadius: "22px 22px 0 0", background: big ? `linear-gradient(${YELLOW}, ${GOLD})` : "linear-gradient(#8B7BFF, #5B45E0)", boxShadow: big ? "0 0 50px rgba(255,200,61,0.6)" : "none" }} />
                    <div style={{ fontFamily: HEAVY, fontSize: 40, color: "#fff" }}>{b.n} do‘st</div>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Show>
      <GemRain n={16} start={wAt("v10", "ellik") + 6} until={S.v11} />

      {/* v11: 열린 고리 2 */}
      <Show from={S.v11 - 4} to={S.v12}>
        {(l, out) => (
          <div style={{ position: "absolute", inset: 0, background: `rgba(6,4,20,${0.7 * ramp(l, 0, 6)})`, opacity: 1 - out }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <Slam at={S.v11} size={88}>
                PULNI QANDAY
              </Slam>
              {frame >= wAt("v11", "yechib") ? (
                <Slam at={wAt("v11", "yechib")} color={YELLOW} rot={3} size={110}>
                  YECHASIZ?
                </Slam>
              ) : null}
            </div>
          </div>
        )}
      </Show>

      {/* 출금 */}
      <Phone from={S.v12} shots={[{ from: S.v12, to: S.v14, src: "withdraw", node: <WithdrawScreen /> }]} to={S.v14} />

      {/* v14: 친구에게 보내기 */}
      <Show from={S.v14} to={SPEECH_END + 6}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 34, opacity: 1 - out }}>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              {["SIZ", "DO‘STINGIZ"].map((who, i) => (
                <div key={who} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transform: `scale(${pop(frame, S.v14 + i * 6, 260, 13)})` }}>
                  <div style={{ width: 200, height: 200, borderRadius: 100, background: i ? `linear-gradient(135deg, ${GREEN}, #15803D)` : `linear-gradient(135deg, ${PURPLE}, ${PINK})`, border: "8px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg height={110} viewBox="0 0 24 24" width={110}>
                      <circle cx="12" cy="8" fill="#fff" r="4.2" />
                      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="#fff" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: HEAVY, fontSize: 36, color: "#fff" }}>{who}</div>
                  {frame >= wAt("v14", "ikkalangizga") ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: HEAVY, fontSize: 56, color: YELLOW, transform: `scale(${pop(frame, wAt("v14", "ikkalangizga") + i * 4, 300, 11)})` }}>
                      +1000 <Gem size={50} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 40px", borderRadius: 999, background: YELLOW, boxShadow: "0 20px 40px rgba(0,0,0,0.4)", transform: `scale(${pop(frame, wAt("v14", "yuboring"), 280, 12)}) rotate(-2deg)` }}>
              <svg height={56} viewBox="0 0 24 24" width={56}>
                <path d="M3 11.5L21 3l-6.5 18-3.2-7.3z" fill={INK} />
              </svg>
              <span style={{ fontFamily: HEAVY, fontSize: 54, color: INK }}>Do‘stingizga yuboring</span>
            </div>
          </div>
        )}
      </Show>

      {/* 끝: 로고 · 받는 곳 → 첫 장면으로 이어진다 */}
      <Show from={SPEECH_END} to={PUL_TOTAL}>
        {(l) => (
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 45%, #4B36B8, #1A1250 70%)`, opacity: ramp(l, 0, 8) * (1 - ramp(l, TAIL - 10, 10)) }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
              <div style={{ transform: `scale(${pop(frame, SPEECH_END + 2, 220, 11)}) rotate(-3deg)` }}>
                <Logo size={150} />
              </div>
              <Pill color="#111">Android: Google Play</Pill>
              <Pill color="#2AABEE">iPhone: Telegram @KorioLoginBot</Pill>
            </div>
          </div>
        )}
      </Show>
    </>
  );
}

// ───────────────────────────── 자막 (한 단어씩)
const PHRASES = ORDER.flatMap(([key]) => {
  const out: { key: Key; words: { w: string; s: number; e: number }[] }[] = [];
  let cur: { w: string; s: number; e: number }[] = [];
  for (const word of LINES[key].words) {
    cur.push(word);
    if (cur.length >= 4 || /[.,?!—]$/.test(word.w)) {
      out.push({ key, words: cur });
      cur = [];
    }
  }
  if (cur.length) out.push({ key, words: cur });
  return out;
});
function Captions() {
  const frame = useCurrentFrame();
  const f = (key: Key, t: number) => S[key] + Math.round(t * FPS);
  const p = PHRASES.find((x) => frame >= f(x.key, x.words[0].s) - 2 && frame < f(x.key, x.words[x.words.length - 1].e) + 4);
  if (!p) return null;
  const s = pop(frame, f(p.key, p.words[0].s) - 2, 320, 17);
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1350, display: "flex", justifyContent: "center", opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>
      <div style={{ padding: "14px 26px", borderRadius: 24, background: "rgba(16,10,40,0.82)", border: "2px solid rgba(255,255,255,0.12)", textAlign: "center", maxWidth: 1000 }}>
        {p.words.map((word, i) => {
          const on = frame >= f(p.key, word.s) && frame < f(p.key, word.e) + 3;
          const done = frame >= f(p.key, word.e) + 3;
          const k = on ? pop(frame, f(p.key, word.s), 400, 15) : 0;
          return (
            <span key={i} style={{ display: "inline-block", margin: "0 11px", fontFamily: HEAVY, fontSize: 60, lineHeight: 1.18, color: on ? YELLOW : done ? "#fff" : "rgba(255,255,255,0.55)", transform: `scale(${1 + k * 0.06}) translateY(${-k * 4}px)` }}>
              {word.w.replace(/ʻ/g, "‘")}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────── 소리
function Sound() {
  const s = (frame: number, src: string, v = 0.4) => (
    <Sequence from={Math.max(0, Math.round(frame))} key={`${src}-${Math.round(frame)}`}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
  const popS = "ai/edit/sfx-pop.mp3";
  const whoosh = "ai/edit/sfx-whoosh.mp3";
  return (
    <>
      {ORDER.map(([key]) => (
        <Sequence from={S[key]} key={key}>
          <Audio src={staticFile(`ai/pul/${key}.mp3`)} />
        </Sequence>
      ))}
      {s(0, "ai/edit/sfx-boom.mp3", 0.4)}
      {s(wAt("v01", "korio") - 4, "sfx/combo.wav", 0.35)}
      {s(wAt("v02", "gavhar"), popS, 0.4)}
      {s(wAt("v02", "bir", 3), "sfx/correct.wav", 0.3)}
      {[0, 5, 10].map((d) => s(wAt("v03", "uchta") + d, popS, 0.3))}
      {[S.v04, S.v07, S.v09, S.v12].map((f) => s(f - 4, whoosh, 0.35))}
      {s(wAt("v04", "sandiq") + 6, "sfx/chest-open.wav", 0.4)}
      {[wAt("v05", "kunlik") + 6, wAt("v05", "ikki"), wAt("v06", "ligada"), wAt("v07", "besh"), wAt("v09", "sizga"), wAt("v09", "unga")].map((f) => s(f, popS, 0.3))}
      {[0, 4, 8, 12, 16].map((d) => s(wAt("v07", "ilovani") + d, "sfx/select.wav", 0.18))}
      {s(S.v08, "ai/edit/sfx-boom.mp3", 0.35)}
      {s(wAt("v10", "ellik"), "sfx/level-up.wav", 0.35)}
      {s(S.v11, "ai/edit/sfx-boom.mp3", 0.3)}
      {s(wAt("v12", "gavharni") - 2, "sfx/click.wav", 0.4)}
      {s(wAt("v12", "karta"), "sfx/click.wav", 0.35)}
      {s(wAt("v13", "sorov"), "sfx/click.wav", 0.4)}
      {s(wAt("v13", "pul") + 6, "sfx/correct.wav", 0.35)}
      {s(wAt("v14", "ikkalangizga"), "sfx/combo.wav", 0.3)}
      {Array.from({ length: Math.ceil(PUL_TOTAL / 660) }, (_, i) => (
        <Sequence durationInFrames={660} from={i * 660} key={`m${i}`}>
          <Audio
            src={staticFile("ai/edit/music.mp3")}
            volume={(fr) => {
              const g = i * 660 + fr;
              const base = g >= SPEECH_END ? 0.2 : 0.06;
              return base * interpolate(g, [0, 10, PUL_TOTAL - 20, PUL_TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            }}
          />
        </Sequence>
      ))}
    </>
  );
}

export function PulReel() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0E0A2A" }}>
      <Studio />
      <Graphics />
      <Header />
      <Counter />
      <Captions />
      <Sound />
    </AbsoluteFill>
  );
}
