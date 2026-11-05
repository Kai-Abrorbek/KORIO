/**
 * "Ingliz tilida nega gapira olmaymiz?" — 사용자가 고른 릴스의 흐름(공원 → 실수 3개와 해결 → 다시 공원)을
 * 우리 그림(사용자가 ChatGPT 로 그린 k01–k16)과 우리 대본으로 다시 만들고, 학원 부분을 KORIO 로 바꿨다.
 *
 * 천천히 간다 (reels-value-and-pacing): 실수마다 장면 → 왜 → 연구 숫자 → 따라 할 방법.
 * 영어 대사는 말풍선에 영어 + 우즈벡어 뜻 — 보는 사람이 길 묻고 답하는 말을 배워 간다.
 * KORIO 화면(레벨 고르기 · 외워 말하기 · AI 튜터 교정)은 앱 실제 문구로 그렸다 (녹화 클립이 한국어 수업뿐이라).
 * 숫자: EF EPI 2025 (123개국 중 104위) · Karpicke & Roediger 2008 (80% / 36%) · Kim & Webb 2022 (48개 연구).
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import WORDS from "./xato.words.json";
import SCREENS from "./screens.json";

const FPS = 30;
const W = 1080;
const H = 1920;
const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const BODY = '"Segoe UI", sans-serif';
const HAND = '"Segoe Print", "Ink Free", cursive';
const PURPLE = "#6A55F5";
const LILAC = "#9B7FE0";
const YELLOW = "#FFE14D";
const RED = "#E5484D";
const GREEN = "#1F9D55";
const INK = "#1C1A2E";
const PAPER = "#F4EBDD";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (f: number, at: number, d: number) => clamp01((f - at) / d);
const pop = (f: number, at: number, stiffness = 200, damping = 15) => spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.8 } });
const ease = Easing.bezier(0.45, 0, 0.25, 1);

// ───────────────────────────── 대사 시각
type Key = keyof typeof WORDS.lines;
/** 영어 대사 줄(관광객·Malika)에는 단어 시각이 없다 */
type Line = { len: number; voice: string; words?: { w: string; s: number; e: number }[] };
const LINES = WORDS.lines as unknown as Record<Key, Line>;
/** 줄 앞의 쉼(프레임) — 천천히: 장면이 바뀌는 곳은 길게 쉰다 */
const ORDER: [Key, number][] = [
  ["t01", 4],
  ["m01", 8],
  ["n01", 16],
  ["n02", 14],
  ["n03", 18],
  ["n04", 20],
  ["n05", 18],
  ["n06", 18],
  ["n07", 18],
  ["n08", 24],
  ["n09", 14],
  ["n10", 18],
  ["n11", 18],
  ["n12", 24],
  ["n13", 14],
  ["n14", 18],
  ["n15", 14],
  ["n16", 24],
  ["n17", 16],
  ["n18", 18],
  ["n19", 24],
  ["t02", 10],
  ["m02", 10],
  ["t03", 8],
  ["n20", 14],
  ["n21", 24],
];
const S = {} as Record<Key, number>;
let cursor = 0;
for (const [key, gap] of ORDER) {
  S[key] = cursor + gap;
  cursor = S[key] + Math.round(LINES[key].len * FPS);
}
const SPEECH_END = cursor;
const TAIL = 75;
export const XATO_TOTAL = SPEECH_END + TAIL;
const end = (key: Key) => S[key] + Math.round(LINES[key].len * FPS);
const norm = (t: string) => t.toLowerCase().replace(/[«»"“”.,:!?—ʻ‘'’]/g, "");
/** 줄 key 안에서 text 로 시작하는 단어의 시작 프레임 */
const wAt = (key: Key, text: string, after = 0) => {
  const ws = LINES[key].words ?? [];
  const i = ws.findIndex((x, k) => k >= after && norm(x.w).startsWith(norm(text)));
  return S[key] + Math.round((ws[Math.max(0, i)]?.s ?? 0) * FPS);
};

// ───────────────────────────── 그림 장면 (천천히 다가가는 Ken Burns, 장면 사이 겹쳐 녹이기)
type Shot = { img: string; from: number; zoom?: [number, number]; x?: [number, number]; y?: [number, number] };
const SHOTS: Shot[] = [
  { img: "k01", from: 0, zoom: [1.08, 1.0] },
  { img: "k02", from: end("m01") + 4, zoom: [1.0, 1.08], x: [0, -20] },
  { img: "paper", from: S.n03 - 8 },
  { img: "k03", from: S.n04 - 8, zoom: [1.0, 1.1], y: [0, -30] },
  { img: "k04", from: S.n05 - 8, zoom: [1.06, 1.0] },
  { img: "k05", from: S.n06 - 8, zoom: [1.0, 1.04] },
  { img: "k06", from: S.n07 - 8, zoom: [1.0, 1.08], x: [0, 20] },
  { img: "k07", from: S.n08 - 8, zoom: [1.0, 1.06] },
  { img: "k08", from: wAt("n09", "keyin") - 6, zoom: [1.08, 1.0] },
  { img: "k09", from: S.n10 - 8, zoom: [1.0, 1.08], y: [0, 20] },
  { img: "k10", from: S.n11 - 8, zoom: [1.08, 1.0] },
  { img: "k11", from: S.n12 - 8, zoom: [1.0, 1.08] },
  { img: "k12", from: S.n14 - 8, zoom: [1.0, 1.08], x: [0, -20] },
  { img: "k13", from: S.n15 - 8, zoom: [1.06, 1.0] },
  { img: "k14", from: S.n16 - 8, zoom: [1.0, 1.06] },
  { img: "k15", from: S.n17 - 8, zoom: [1.0, 1.06] },
  { img: "k14", from: S.n18 - 8, zoom: [1.06, 1.12] },
  { img: "k16", from: S.n19 - 8, zoom: [1.0, 1.08] },
  { img: "paper", from: S.n21 - 8 },
];
const FADE = 12;

function PaperBg() {
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 30% 20%, #FBF4E8 0%, ${PAPER} 55%, #E7D9C3 100%)` }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(120,90,50,0.08) 1.5px, transparent 1.6px)", backgroundSize: "9px 9px", opacity: 0.7 }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(120,80,30,0.18) 100%)" }} />
    </AbsoluteFill>
  );
}

function Shots() {
  const frame = useCurrentFrame();
  const i = SHOTS.reduce((acc, s, k) => (frame >= s.from ? k : acc), 0);
  const visible = [i - 1, i].filter((k) => k >= 0);
  return (
    <AbsoluteFill>
      {visible.map((k) => {
        const s = SHOTS[k];
        const next = SHOTS[k + 1];
        const to = next ? next.from + FADE : XATO_TOTAL;
        const t = clamp01((frame - s.from) / Math.max(1, to - s.from));
        const opacity = k === i ? ramp(frame, s.from, FADE) : 1;
        const z = interpolate(t, [0, 1], s.zoom ?? [1, 1.05], { easing: ease });
        const x = interpolate(t, [0, 1], s.x ?? [0, 0]);
        const y = interpolate(t, [0, 1], s.y ?? [0, 0]);
        return (
          <AbsoluteFill key={`${s.img}-${k}`} style={{ opacity }}>
            {s.img === "paper" ? (
              <PaperBg />
            ) : (
              <div style={{ position: "absolute", inset: 0, transform: `translate(${x}px, ${y}px) scale(${z})` }}>
                <Img src={staticFile(`ai/xato/${s.img}.webp`)} style={{ width: W, height: H }} />
                {s.img === "k14" || s.img === "k15" ? <PhoneInPicture img={s.img} /> : null}
              </div>
            )}
          </AbsoluteFill>
        );
      })}
      {/* 아래쪽 자막 자리를 살짝 어둡게 */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 62%, rgba(20,12,30,0.45) 100%)" }} />
    </AbsoluteFill>
  );
}

/** 초록 화면 자리에 앱 화면을 넣고, 그 위에 뚫린 그림을 덮는다 */
function PhoneInPicture({ img }: { img: "k14" | "k15" }) {
  const q = (SCREENS as Record<string, { quad: number[][] }>)[img].quad;
  const [x0, y0] = q[0];
  const w = q[1][0] - x0;
  const h = q[2][1] - y0;
  return (
    <>
      <div style={{ position: "absolute", left: x0 - 4, top: y0 - 4, width: w + 8, height: h + 8, overflow: "hidden", background: "#fff" }}>
        <div style={{ width: 360, height: 780, transform: `scale(${(w + 8) / 360}, ${(h + 8) / 780})`, transformOrigin: "0 0" }}>{img === "k14" ? <LevelScreen pick={4} /> : <RecallScreen state={2} />}</div>
      </div>
      <Img src={staticFile(`ai/xato/${img}-keyed.png`)} style={{ position: "absolute", inset: 0, width: W, height: H }} />
    </>
  );
}

// ───────────────────────────── 글자 카드들
function Card({ at, until, top, children, rot = -2, bg = "#fff", ink = INK, width = 900, style }: { at: number; until: number; top: number; children: ReactNode; rot?: number; bg?: string; ink?: string; width?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  const s = pop(frame, at, 170, 16);
  const out = ramp(frame, until - 8, 8);
  return (
    <div style={{ position: "absolute", left: (W - width) / 2, top, width, display: "flex", justifyContent: "center", opacity: Math.min(1, s * 1.4) * (1 - out), transform: `translateY(${(1 - s) * 40}px) rotate(${rot}deg)` }}>
      <div style={{ padding: "22px 34px", borderRadius: 18, background: bg, color: ink, boxShadow: "0 18px 40px rgba(0,0,0,0.35)", textAlign: "center", ...style }}>{children}</div>
    </div>
  );
}

/** "1-XATO" 빨간 꼬리표 + 손글씨 같은 인용 */
function Mistake({ n, quote, at, until }: { n: number; quote: string; at: number; until: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  const s = pop(frame, at, 200, 14);
  const out = ramp(frame, until - 8, 8);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 1 - out }}>
      <div style={{ padding: "10px 30px", borderRadius: 10, background: RED, color: "#fff", fontFamily: HEAVY, fontSize: 52, letterSpacing: 2, transform: `scale(${s}) rotate(-3deg)`, boxShadow: "0 12px 26px rgba(0,0,0,0.35)" }}>{n}-XATO</div>
      <div style={{ maxWidth: 920, padding: "18px 34px", borderRadius: 16, background: "rgba(255,252,245,0.96)", fontFamily: HEAVY, fontSize: 64, lineHeight: 1.12, color: INK, textAlign: "center", transform: `translateY(${(1 - pop(frame, at + 6, 170, 16)) * 60}px) rotate(1deg)`, opacity: ramp(frame, at + 6, 6), boxShadow: "0 16px 34px rgba(0,0,0,0.3)" }}>
        «{quote}»
      </div>
    </div>
  );
}

/** "TO‘G‘RI YO‘L" 초록 꼬리표 + 방법 */
function Fix({ at, until, title, steps }: { at: number; until: number; title: string; steps?: { at: number; text: string }[] }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  const s = pop(frame, at, 200, 14);
  const out = ramp(frame, until - 8, 8);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 1 - out }}>
      <div style={{ padding: "10px 30px", borderRadius: 10, background: GREEN, color: "#fff", fontFamily: HEAVY, fontSize: 46, letterSpacing: 2, transform: `scale(${s}) rotate(-3deg)`, boxShadow: "0 12px 26px rgba(0,0,0,0.35)" }}>TO‘G‘RI YO‘L</div>
      <div style={{ maxWidth: 940, padding: "18px 32px", borderRadius: 16, background: "rgba(255,252,245,0.97)", fontFamily: HEAVY, fontSize: 58, lineHeight: 1.12, color: INK, textAlign: "center", transform: `translateY(${(1 - pop(frame, at + 6, 170, 16)) * 60}px)`, opacity: ramp(frame, at + 6, 6), boxShadow: "0 16px 34px rgba(0,0,0,0.3)" }}>{title}</div>
      {steps?.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
          {steps.map((st, i) =>
            frame >= st.at ? (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 26px 12px 14px", borderRadius: 999, background: "rgba(20,14,40,0.82)", color: "#fff", fontFamily: HEAVY, fontSize: 42, transform: `translateX(${(1 - pop(frame, st.at, 220, 16)) * -300}px)`, opacity: ramp(frame, st.at, 6) }}>
                <span style={{ width: 56, height: 56, borderRadius: 28, background: YELLOW, color: INK, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{i + 1}</span>
                {st.text}
              </div>
            ) : null,
          )}
        </div>
      ) : null}
    </div>
  );
}

function Source({ at, until, text }: { at: number; until: number; text: string }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1262, display: "flex", justifyContent: "center", opacity: ramp(frame, at, 10) * (1 - ramp(frame, until - 8, 8)) }}>
      <div style={{ padding: "6px 18px", borderRadius: 8, background: "rgba(255,252,245,0.9)", fontFamily: BODY, fontWeight: 700, fontSize: 26, color: "#5B5470" }}>Manba: {text}</div>
    </div>
  );
}

/** 영어 말풍선 + 우즈벡어 뜻 */
function Bubble({ at, until, en, uz, x, y, tail = "left", width = 640 }: { at: number; until: number; en: string; uz: string; x: number; y: number; tail?: "left" | "right"; width?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  const s = pop(frame, at, 240, 15);
  const out = ramp(frame, until - 6, 6);
  return (
    <div style={{ position: "absolute", left: x, top: y, width, transform: `scale(${s})`, transformOrigin: tail === "left" ? "10% 100%" : "90% 100%", opacity: 1 - out }}>
      <div style={{ position: "relative", padding: "20px 28px", borderRadius: 28, background: "#fff", boxShadow: "0 16px 36px rgba(0,0,0,0.35)" }}>
        <div style={{ fontFamily: HEAVY, fontSize: 46, lineHeight: 1.15, color: INK }}>{en}</div>
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "2px dashed #DDD6EE", fontFamily: BODY, fontWeight: 700, fontSize: 32, lineHeight: 1.2, color: PURPLE }}>{uz}</div>
        <div style={{ position: "absolute", bottom: -22, [tail]: 60, width: 0, height: 0, borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderTop: "26px solid #fff" }} />
      </div>
    </div>
  );
}

// ───────────────────────────── KORIO 화면 (앱 문구 그대로)
const LEVELS = [
  ["A1", "1-daraja · A1 Boshlang‘ich"],
  ["A2", "2-daraja · A2 Kundalik ingliz tili"],
  ["B1", "3-daraja · B1 Hayotiy ingliz tili"],
  ["B2", "4-daraja · B2 Erkin suhbat"],
  ["C1", "5-daraja · C1 Yuqori daraja"],
  ["C2", "6-daraja · C2 Mukammal"],
];
function LevelScreen({ pick }: { pick: number }) {
  return (
    <div style={{ width: 360, height: 780, background: "#F6F4FF", fontFamily: BODY, padding: "46px 18px 0", boxSizing: "border-box" }}>
      <div style={{ fontFamily: HEAVY, fontSize: 24, color: INK }}>Darajangizni tanlang</div>
      <div style={{ marginTop: 4, fontSize: 14, color: "#6B6880" }}>Ingliz tili · keyin istalgan payt o‘zgartirasiz</div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {LEVELS.map(([code, name], i) => (
          <div key={code} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px", borderRadius: 16, background: i + 1 === pick ? PURPLE : "#fff", color: i + 1 === pick ? "#fff" : INK, boxShadow: "0 3px 10px rgba(40,30,90,0.08)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: i + 1 === pick ? "rgba(255,255,255,0.2)" : "#EEEAFE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontSize: 18, color: i + 1 === pick ? "#fff" : PURPLE }}>{code}</div>
            <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 외워서 말하기: state 0 질문, 1 듣는 중, 2 맞음 */
function RecallScreen({ state }: { state: number }) {
  return (
    <div style={{ width: 360, height: 780, background: "#fff", fontFamily: BODY, padding: "46px 20px 0", boxSizing: "border-box", position: "relative" }}>
      <div style={{ height: 10, borderRadius: 5, background: "#EEEAFE" }}>
        <div style={{ width: "60%", height: "100%", borderRadius: 5, background: PURPLE }} />
      </div>
      <div style={{ marginTop: 22, fontSize: 14, fontWeight: 800, color: PURPLE }}>YODDAN AYTING</div>
      <div style={{ marginTop: 6, fontFamily: HEAVY, fontSize: 24, color: INK }}>Inglizcha qanday bo‘ladi?</div>
      <div style={{ marginTop: 26, padding: "26px 0", borderRadius: 20, background: "#F6F4FF", textAlign: "center", fontFamily: HEAVY, fontSize: 40, color: INK }}>kecha</div>
      <div style={{ marginTop: 24, textAlign: "center", fontSize: 15, color: "#8B86A0" }}>{state === 0 ? "Javobni ko‘rmasdan ayting" : state === 1 ? "Eshityapman…" : ""}</div>
      {state === 2 ? (
        <div style={{ marginTop: 8, padding: "16px 0", borderRadius: 18, background: "#E9FBEF", textAlign: "center" }}>
          <div style={{ fontFamily: HEAVY, fontSize: 34, color: GREEN }}>yesterday ✓</div>
          <div style={{ marginTop: 4, fontWeight: 800, fontSize: 16, color: GREEN }}>To‘g‘ri! Yoddan esladingiz</div>
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: state === 1 ? RED : PURPLE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(106,85,245,0.4)" }}>
          <svg height={40} viewBox="0 0 24 24" width={40}>
            <rect fill="#fff" height="12" rx="4" width="8" x="8" y="2" />
            <path d="M5 11a7 7 0 0014 0M12 18v4" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** AI 튜터 — 말한 문장을 고쳐 주는 장면 */
function TutorScreen({ step }: { step: number }) {
  return (
    <div style={{ width: 360, height: 780, background: "linear-gradient(180deg, #EFE9FF 0%, #F8F6FF 40%, #fff 100%)", fontFamily: BODY, position: "relative", padding: "40px 16px 0", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: HEAVY, fontSize: 20, color: INK }}>Ovozli AI ustoz</div>
          <div style={{ fontSize: 12, color: "#6B6880" }}>Ingliz tili · Erkin suhbat</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 999, background: "#fff", fontSize: 12, fontWeight: 800, color: PURPLE }}>09:12</div>
      </div>
      {/* 로봇 얼굴 */}
      <div style={{ margin: "18px auto 0", width: 120, height: 96, borderRadius: 34, background: "linear-gradient(160deg, #fff, #E4DCFF)", boxShadow: "0 10px 24px rgba(106,85,245,0.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ width: 20, height: step >= 2 ? 10 : 22, borderRadius: 10, background: "#3B2F7A", marginTop: step >= 2 ? 8 : 0 }} />
        ))}
      </div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ alignSelf: "flex-start", maxWidth: "86%", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: "#fff", fontSize: 15, fontWeight: 700, color: INK, boxShadow: "0 3px 10px rgba(40,30,90,0.08)" }}>What did you do yesterday?</div>
        {step >= 1 ? (
          <div style={{ alignSelf: "flex-end", maxWidth: "86%", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", background: PURPLE, fontSize: 15, fontWeight: 700, color: "#fff" }}>
            Yesterday I <span style={{ textDecoration: step >= 2 ? `line-through ${YELLOW} 3px` : "none" }}>go</span> to the park.
          </div>
        ) : null}
        {step >= 2 ? (
          <div style={{ alignSelf: "flex-start", maxWidth: "92%", padding: "12px 14px", borderRadius: "16px 16px 16px 4px", background: "#fff", boxShadow: "0 3px 10px rgba(40,30,90,0.1)", border: `2px solid ${GREEN}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: HEAVY, fontSize: 18 }}>
              <span style={{ color: RED, textDecoration: "line-through" }}>go</span>
              <span style={{ color: "#8B86A0" }}>→</span>
              <span style={{ color: GREEN }}>went</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 15, fontWeight: 700, color: INK }}>Yesterday I went to the park.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: "#6B6880" }}>“Yesterday” — o‘tgan zamon. Endi o‘zingiz ayting!</div>
          </div>
        ) : null}
        {step >= 3 ? (
          <div style={{ alignSelf: "flex-end", maxWidth: "86%", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", background: PURPLE, fontSize: 15, fontWeight: 700, color: "#fff" }}>Yesterday I went to the park.</div>
        ) : null}
        {step >= 4 ? (
          <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: "#E9FBEF", fontSize: 15, fontWeight: 800, color: GREEN }}>Perfect! Zo‘r!</div>
        ) : null}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, background: "#fff", boxShadow: "0 4px 12px rgba(40,30,90,0.12)" }} />
        <div style={{ width: 74, height: 74, borderRadius: 37, background: RED, boxShadow: "0 8px 20px rgba(229,72,77,0.4)" }} />
        <div style={{ width: 52, height: 52, borderRadius: 26, background: "#fff", boxShadow: "0 4px 12px rgba(40,30,90,0.12)" }} />
      </div>
    </div>
  );
}

/** 오른쪽에 크게 떠오르는 폰 */
function BigPhone({ at, until, children, x = 560, y = 330, rot = 4, k = 1.2 }: { at: number; until: number; children: ReactNode; x?: number; y?: number; rot?: number; k?: number }) {
  const frame = useCurrentFrame();
  if (frame < at - 2 || frame >= until + 12) return null;
  const s = pop(frame, at, 150, 17);
  const out = ramp(frame, until, 12);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translateY(${(1 - s) * 1200 + out * 1400}px) rotate(${rot}deg)` }}>
      <div style={{ padding: 12, borderRadius: 52, background: "linear-gradient(145deg, #2A2540, #0F0C1E)", boxShadow: "0 40px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.15)" }}>
        <div style={{ width: 360 * k, height: 780 * k, borderRadius: 42, overflow: "hidden", background: "#fff" }}>
          <div style={{ width: 360, height: 780, transform: `scale(${k})`, transformOrigin: "0 0" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── 장면별 그래픽
function Graphics() {
  const frame = useCurrentFrame();
  return (
    <>
      {/* 훅: 관광객이 묻고, Malika 는 말이 막힌다 */}
      <Bubble at={S.t01} en="Excuse me! How can I get to Amir Temur Square?" tail="right" until={end("m01") + 4} uz="Kechirasiz! Amir Temur xiyoboniga qanday borsam bo‘ladi?" width={680} x={330} y={640} />
      <Bubble at={S.m01} en="Ehh… I… ehm…" tail="left" until={end("m01") + 6} uz="(javob topa olmadi)" width={440} x={40} y={1000} />

      {/* 104-o‘rin */}
      <Card at={wAt("n02", "ingliz")} top={700} until={end("n02") + 6}>
        <div style={{ fontFamily: HEAVY, fontSize: 132, lineHeight: 1, color: RED }}>104-o‘rin</div>
        <div style={{ marginTop: 10, fontFamily: HEAVY, fontSize: 40, color: INK }}>123 davlat ichida</div>
        <div style={{ marginTop: 6, fontFamily: BODY, fontWeight: 700, fontSize: 26, color: "#6B6880" }}>EF English Proficiency Index, 2025</div>
      </Card>

      {/* 3 ta xato */}
      <Show from={S.n03 - 4} to={S.n04 - 4}>
        {(l, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, opacity: 1 - out }}>
            <div style={{ fontFamily: HAND, fontSize: 56, color: "#5B4A3A", opacity: ramp(l, 2, 10) }}>Ko‘pincha gap qobiliyatda emas.</div>
            {frame >= wAt("n03", "gap", 3) ? (
              <div style={{ fontFamily: HEAVY, fontSize: 120, lineHeight: 1, color: INK, transform: `scale(${pop(frame, wAt("n03", "gap", 3), 200, 13)})` }}>
                <span style={{ color: RED }}>3</span> TA XATO
              </div>
            ) : null}
          </div>
        )}
      </Show>

      {/* 1-xato */}
      <Mistake at={S.n04 + 4} n={1} quote="Ko‘rdim — demak bilaman" until={S.n05 + 30} />
      <Show from={wAt("n05", "tanish")} to={end("n05") + 8}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center", opacity: 1 - out }}>
            <div style={{ padding: "16px 36px", borderRadius: 16, background: "rgba(255,252,245,0.96)", fontFamily: HEAVY, fontSize: 66, color: INK, boxShadow: "0 16px 34px rgba(0,0,0,0.3)", transform: `scale(${pop(frame, wAt("n05", "tanish"), 220, 13)})` }}>
              Tanish <span style={{ color: RED }}>≠</span> eslash
            </div>
          </div>
        )}
      </Show>
      {/* 유리병 두 개 */}
      <Show from={S.n06} to={end("n06") + 10}>
        {(_, out) => {
          const left = frame >= wAt("n06", "eslaganlar");
          const right = frame >= wAt("n06", "oqiganlar");
          const n80 = Math.round(ramp(frame, wAt("n06", "eslaganlar"), 18) * 80);
          const n36 = Math.round(ramp(frame, wAt("n06", "oqiganlar"), 18) * 36);
          return (
            <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 210, display: "flex", justifyContent: "center", opacity: ramp(frame, wAt("n06", "bir", 4), 8) }}>
                <div style={{ padding: "10px 28px", borderRadius: 10, background: "rgba(255,252,245,0.95)", fontFamily: HAND, fontSize: 46, color: "#5B4A3A" }}>1 haftadan keyin</div>
              </div>
              {right ? (
                <div style={{ position: "absolute", left: 600, top: 470, width: 380, textAlign: "center", transform: `scale(${pop(frame, wAt("n06", "oqiganlar"), 220, 13)})` }}>
                  <div style={{ display: "inline-block", padding: "6px 22px", borderRadius: 12, background: "#fff", fontFamily: HEAVY, fontSize: 92, color: RED, boxShadow: "0 12px 26px rgba(0,0,0,0.3)" }}>{n36}%</div>
                </div>
              ) : null}
              {left ? (
                <div style={{ position: "absolute", left: 90, top: 470, width: 380, textAlign: "center", transform: `scale(${pop(frame, wAt("n06", "eslaganlar"), 220, 13)})` }}>
                  <div style={{ display: "inline-block", padding: "6px 22px", borderRadius: 12, background: "#fff", fontFamily: HEAVY, fontSize: 92, color: GREEN, boxShadow: "0 12px 26px rgba(0,0,0,0.3)" }}>{n80}%</div>
                </div>
              ) : null}
              <div style={{ position: "absolute", left: 90, top: 1160, width: 380, textAlign: "center", opacity: ramp(frame, wAt("n06", "ikkinchisi"), 8) }}>
                <span style={{ padding: "8px 18px", borderRadius: 10, background: "rgba(255,252,245,0.95)", fontFamily: HEAVY, fontSize: 34, color: INK }}>Yoddan esladi</span>
              </div>
              <div style={{ position: "absolute", left: 600, top: 1160, width: 380, textAlign: "center", opacity: ramp(frame, wAt("n06", "qayta"), 8) }}>
                <span style={{ padding: "8px 18px", borderRadius: 10, background: "rgba(255,252,245,0.95)", fontFamily: HEAVY, fontSize: 34, color: INK }}>Qayta o‘qidi</span>
              </div>
            </div>
          );
        }}
      </Show>
      <Source at={S.n06 + 10} text="Karpicke & Roediger, Science, 2008" until={end("n06") + 10} />
      <Fix
        at={S.n07}
        steps={[
          { at: wAt("n07", "kitobni"), text: "Kitobni yoping" },
          { at: wAt("n07", "yoddan"), text: "So‘zni yoddan ayting" },
          { at: wAt("n07", "keyin"), text: "Keyin tekshiring" },
        ]}
        title="Yoddan eslang"
        until={end("n07") + 14}
      />

      {/* 2-xato */}
      <Card at={S.n08 + 6} bg="rgba(20,14,40,0.85)" ink="#fff" top={280} until={end("n08") + 4}>
        <div style={{ fontFamily: HEAVY, fontSize: 56 }}>Ikkinchi xato…</div>
      </Card>
      <Mistake at={S.n09} n={2} quote="Dushanbadan boshlayman" until={end("n09") + 8} />
      <Show from={wAt("n09", "dushanba", 2)} to={end("n09") + 8}>
        {(_, out) => {
          const start = wAt("n09", "dushanba", 2);
          const later = wAt("n09", "keyin");
          return (
            <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 1 - out }}>
              <div style={{ display: "flex", gap: 10 }}>
                {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d, i) => {
                  const on = frame >= (i === 0 ? start : later + (i - 1) * 4);
                  const studied = i === 0;
                  return (
                    <div key={d} style={{ width: 120, height: 120, borderRadius: 16, background: studied ? GREEN : "rgba(255,252,245,0.94)", color: studied ? "#fff" : "#9B93AE", fontFamily: HEAVY, fontSize: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : 24}px)` }}>
                      {d}
                      <span style={{ fontSize: 26 }}>{studied ? "5 soat" : "0"}</span>
                    </div>
                  );
                })}
              </div>
              {frame >= later ? <div style={{ padding: "8px 22px", borderRadius: 10, background: "rgba(255,252,245,0.95)", fontFamily: HEAVY, fontSize: 38, color: RED, opacity: ramp(frame, later + 10, 8) }}>keyin 2 hafta — hech narsa</div> : null}
            </div>
          );
        }}
      </Show>
      <Fix
        at={S.n11}
        steps={[{ at: wAt("n11", "kuniga"), text: "Kuniga 15 daqiqa — har kuni" }]}
        title="Har kuni oz-ozdan"
        until={end("n11") + 14}
      />
      <Show from={wAt("n11", "kuniga")} to={end("n11") + 14}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", justifyContent: "center", gap: 10, opacity: 1 - out }}>
            {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d, i) => {
              const on = frame >= wAt("n11", "kuniga") + 6 + i * 4;
              return (
                <div key={d} style={{ width: 120, height: 120, borderRadius: 16, background: on ? GREEN : "rgba(255,252,245,0.92)", color: on ? "#fff" : "#9B93AE", fontFamily: HEAVY, fontSize: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${on ? pop(frame, wAt("n11", "kuniga") + 6 + i * 4, 260, 12) : 0.9})` }}>
                  {d}
                  <span style={{ fontSize: 24 }}>15 daq</span>
                </div>
              );
            })}
          </div>
        )}
      </Show>
      <Source at={wAt("n11", "qirq")} text="Kim & Webb, Language Learning, 2022 — 48 ta tadqiqot" until={end("n11") + 14} />

      {/* 3-xato */}
      <Card at={S.n12 + 4} bg="rgba(20,14,40,0.85)" ink="#fff" top={280} until={end("n12") + 4}>
        <div style={{ fontFamily: HEAVY, fontSize: 56 }}>Uchinchisi — eng yomoni</div>
      </Card>
      <Mistake at={S.n13} n={3} quote="Avval mukammal bilay, keyin gapiraman" until={wAt("n13", "mehmonda") + 4} />
      <Bubble at={wAt("n13", "qani") - 4} en="Qani, inglizcha bir narsa de-chi!" tail="right" until={end("n13") + 10} uz="(tog‘asi)" width={600} x={420} y={250} />
      <Card at={wAt("n13", "malika", 6)} bg="rgba(20,14,40,0.82)" ink="#fff" top={1110} until={end("n13") + 10} width={500}>
        <div style={{ fontFamily: HEAVY, fontSize: 48 }}>Malika — jim.</div>
      </Card>
      <Card at={S.n14 + 10} top={250} until={end("n14") + 8}>
        <div style={{ fontFamily: HAND, fontSize: 52, color: "#5B4A3A" }}>Suzishni kitobdan o‘rganib bo‘lmaydi</div>
      </Card>
      <Fix at={S.n15} title="Xato qilsangiz ham — bugunoq gapiring" until={end("n15") + 14} />

      {/* KORIO */}
      <Show from={S.n16} to={end("n17") + 6}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 50, top: 230, opacity: 1 - out, transform: `scale(${pop(frame, S.n16 + 6, 220, 13)}) rotate(-3deg)`, transformOrigin: "left center" }}>
            <div style={{ display: "inline-block", padding: "6px 24px", borderRadius: 20, background: "#fff", boxShadow: "0 14px 30px rgba(0,0,0,0.35)" }}>
              <span style={{ fontFamily: HEAVY, fontSize: 76, color: PURPLE }}>KORI</span>
              <span style={{ fontFamily: HEAVY, fontSize: 76, color: "#FF5FA2" }}>O</span>
            </div>
          </div>
        )}
      </Show>
      <BigPhone at={wAt("n16", "darajasini")} until={S.n17 - 4} x={570} y={420}>
        <LevelScreen pick={frame >= wAt("n16", "va") ? 4 : 0} />
      </BigPhone>
      <BigPhone at={S.n17 + 4} until={end("n17") + 6} x={570} y={420}>
        <RecallScreen state={frame >= wAt("n17", "yoddan") + 20 ? 2 : frame >= wAt("n17", "yoddan") ? 1 : 0} />
      </BigPhone>
      <Show from={S.n18} to={end("n18") + 10}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 30, top: 260, width: 470, opacity: 1 - out }}>
            <div style={{ padding: "12px 22px", borderRadius: 14, background: "rgba(255,252,245,0.96)", fontFamily: HEAVY, fontSize: 46, color: INK, boxShadow: "0 14px 30px rgba(0,0,0,0.3)", transform: `scale(${pop(frame, S.n18, 220, 13)}) rotate(-2deg)` }}>
              Gapiring — ustoz
              <br />
              <span style={{ color: GREEN }}>xatoni to‘g‘rilaydi</span>
            </div>
          </div>
        )}
      </Show>
      <BigPhone at={S.n18 + 6} k={1.38} rot={2} until={end("n18") + 6} x={520} y={250}>
        <TutorScreen step={frame >= wAt("n18", "hech") ? 4 : frame >= wAt("n18", "darhol") ? 2 : frame >= wAt("n18", "xato") ? 1 : 0} />
      </BigPhone>

      {/* 다시 공원 */}
      <Bubble at={S.t02} en="Excuse me, how can I get to Amir Temur Square?" tail="right" until={end("t02") + 10} uz="Amir Temur xiyoboniga qanday borsam bo‘ladi?" width={660} x={360} y={660} />
      <Bubble at={S.m02} en="Go straight… then turn left. Five minutes!" tail="left" until={end("t03") + 30} uz="To‘g‘riga yuring, keyin chapga buriling. Besh daqiqa!" width={640} x={40} y={960} />
      <Bubble at={S.t03} en="Thank you so much!" tail="right" until={end("t03") + 30} uz="Katta rahmat!" width={420} x={600} y={660} />
      <Show from={S.n20} to={S.n21 - 2}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 1 - out }}>
            <div style={{ fontFamily: HAND, fontSize: 60, color: "#fff", textShadow: "0 4px 18px rgba(0,0,0,0.6)", opacity: ramp(frame, S.n20, 8) }}>Mukammal emas.</div>
            {frame >= wAt("n20", "lekin") ? (
              <div style={{ fontFamily: HEAVY, fontSize: 104, color: YELLOW, textShadow: "0 6px 0 rgba(0,0,0,0.5)", transform: `scale(${pop(frame, wAt("n20", "lekin"), 220, 12)})` }}>Lekin gapirdi.</div>
            ) : null}
          </div>
        )}
      </Show>

      {/* 끝: 번호 댓글 */}
      <Show from={S.n21 - 4} to={XATO_TOTAL}>
        {() => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            <div style={{ fontFamily: HEAVY, fontSize: 64, lineHeight: 1.1, color: INK, textAlign: "center", opacity: ramp(frame, S.n21, 8) }}>
              Qaysi biri
              <br />
              sizga tanish?
            </div>
            {[
              ["1", "Ko‘rdim — demak bilaman"],
              ["2", "Dushanbadan boshlayman"],
              ["3", "Avval mukammal bilay"],
            ].map(([n, t], i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 20, width: 860, padding: "16px 22px", borderRadius: 18, background: "#fff", boxShadow: "0 12px 26px rgba(90,60,20,0.18)", transform: `translateX(${(1 - pop(frame, S.n21 + 10 + i * 8, 200, 15)) * -900}px)` }}>
                <div style={{ width: 84, height: 84, borderRadius: 16, background: RED, color: "#fff", fontFamily: HEAVY, fontSize: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
                <div style={{ fontFamily: HEAVY, fontSize: 44, color: INK }}>«{t}»</div>
              </div>
            ))}
            {frame >= wAt("n21", "izohga") ? (
              <div style={{ padding: "14px 34px", borderRadius: 999, background: YELLOW, fontFamily: HEAVY, fontSize: 48, color: INK, transform: `scale(${pop(frame, wAt("n21", "izohga"), 260, 12)}) rotate(-2deg)`, boxShadow: "0 12px 26px rgba(0,0,0,0.25)" }}>Izohga raqamini yozing</div>
            ) : null}
            {frame >= SPEECH_END ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: ramp(frame, SPEECH_END, 10) }}>
                <div style={{ display: "inline-block", padding: "4px 22px", borderRadius: 18, background: "#fff", boxShadow: "0 10px 22px rgba(0,0,0,0.2)" }}>
                  <span style={{ fontFamily: HEAVY, fontSize: 64, color: PURPLE }}>KORI</span>
                  <span style={{ fontFamily: HEAVY, fontSize: 64, color: "#FF5FA2" }}>O</span>
                </div>
                <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, color: "#5B4A3A" }}>Android: Google Play · iPhone: Telegram @KorioLoginBot</div>
              </div>
            ) : null}
          </div>
        )}
      </Show>
    </>
  );
}

function Show({ from, to, children }: { from: number; to: number; children: (local: number, out: number) => ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return <>{children(frame - from, ramp(frame, to - 8, 8))}</>;
}

// ───────────────────────────── 자막 (우즈벡어 내레이션만, 한 단어씩)
const PHRASES = ORDER.filter(([key]) => LINES[key].voice === "nar").flatMap(([key]) => {
  const out: { key: Key; words: { w: string; s: number; e: number }[] }[] = [];
  let cur: { w: string; s: number; e: number }[] = [];
  for (const word of LINES[key].words ?? []) {
    cur.push(word);
    if (cur.length >= 4 || /[.,?!:—»]$/.test(word.w)) {
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
  const p = PHRASES.find((x) => frame >= f(x.key, x.words[0].s) - 2 && frame < f(x.key, x.words[x.words.length - 1].e) + 5);
  if (!p) return null;
  const s = pop(frame, f(p.key, p.words[0].s) - 2, 300, 18);
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1380, display: "flex", justifyContent: "center", opacity: s }}>
      <div style={{ padding: "14px 26px", borderRadius: 22, background: "rgba(18,12,32,0.78)", textAlign: "center", maxWidth: 1000 }}>
        {p.words.map((word, i) => {
          const on = frame >= f(p.key, word.s) && frame < f(p.key, word.e) + 3;
          const done = frame >= f(p.key, word.e) + 3;
          return (
            <span key={i} style={{ display: "inline-block", margin: "0 10px", fontFamily: HEAVY, fontSize: 58, lineHeight: 1.2, color: on ? YELLOW : done ? "#fff" : "rgba(255,255,255,0.55)" }}>
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
  const s = (frame: number, src: string, v = 0.3) => (
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
          <Audio src={staticFile(`ai/xato/${key}.mp3`)} />
        </Sequence>
      ))}
      {SHOTS.slice(1).map((sh) => s(sh.from - 2, whoosh, 0.12))}
      {[S.n04 + 4, S.n09, S.n13].map((f) => s(f, "ai/edit/sfx-boom.mp3", 0.22))}
      {[S.n07, S.n11, S.n15].map((f) => s(f, "sfx/correct.wav", 0.25))}
      {[wAt("n02", "ingliz"), wAt("n06", "oqiganlar"), wAt("n06", "eslaganlar"), wAt("n05", "tanish")].map((f) => s(f, popS, 0.28))}
      {s(wAt("n18", "darhol"), "sfx/correct.wav", 0.25)}
      {s(wAt("n20", "lekin"), "sfx/level-up.wav", 0.25)}
      {Array.from({ length: Math.ceil(XATO_TOTAL / 660) }, (_, i) => (
        <Sequence durationInFrames={660} from={i * 660} key={`m${i}`}>
          <Audio
            src={staticFile("ai/tutorial/music.mp3")}
            volume={(fr) => {
              const g = i * 660 + fr;
              const base = g >= SPEECH_END ? 0.16 : 0.045;
              return base * interpolate(g, [0, 15, XATO_TOTAL - 30, XATO_TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            }}
          />
        </Sequence>
      ))}
    </>
  );
}

export function XatoReel() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1426" }}>
      <Shots />
      <Graphics />
      <Captions />
      <Sound />
    </AbsoluteFill>
  );
}
