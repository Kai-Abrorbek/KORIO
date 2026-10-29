/**
 * "So'z kartalari" 편 — 단어 퀴즈 + 지하철 승강장 (약 31초).
 * 역 표지판에 한국어 단어 → 발음 → LED 3·2·1 → 뜻 공개, 열차가 지나가면 다음 단어. 다섯 역을 지나면 종점 KORIO —
 * 앱 녹화(카드 넘기기 · 떠올리기 · 써서 확인) 뒤 "몇 개 맞혔는지 댓글로".
 * 소리: public/ai/tutorial/sozlar (내레이션 · 단어 발음 — audio/make-guide-audio.mjs), public/ai/words (효과음 · 음악)
 */
import type { ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import voice from "./sozlar.voice.json";

const FPS = 30;
const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const BODY = '"Segoe UI Semibold", "Segoe UI", sans-serif';
const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const PURPLE = "#6A55F5";
const PINK = "#FF5FA2";
const AMBER = "#FFA51F";
const YELLOW = "#FFD21F";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (f: number, at: number, d: number) => clamp01((f - at) / d);
const pop = (f: number, at: number, stiffness = 220, damping = 13) => spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease } as const;
const sec = (s: number) => Math.round(s * FPS);

const WORDS = [
  { ko: "사랑해요", rom: "saranghaeyo", uz: "Sizni sevaman", color: "#22B14C" },
  { ko: "친구", rom: "chingu", uz: "Doʻst", color: "#F28C28" },
  { ko: "맛있어요", rom: "masisseoyo", uz: "Mazali", color: "#2F6FE0" },
  { ko: "괜찮아요", rom: "gwaenchanayo", uz: "Hechqisi yoʻq", color: "#8A4FD8" },
  { ko: "눈치", rom: "nunchi", uz: "Vaziyatni sezish", color: "#E2453C" },
];

// ───────────────────────────── 시간표 (프레임)
const HOOK = 106;
const WORD_LEN = 108;
const wordStart = (i: number) => HOOK + i * WORD_LEN;
/** 단어 안: 발음 → 3·2·1 → 뜻 */
const PRON = 10;
const COUNT = [27, 42, 57];
const REVEAL = 72;
const APP = wordStart(WORDS.length);
const PHONE = APP + 6;
const S02 = APP + 8;
const END = S02 + sec(voice.s02) + 6;
const S03 = END + 6;
export const WORDS_TOTAL = S03 + sec(voice.s03) + 36;
/** 표지판이 바뀌는 시각 — 첫 장(-1)은 훅, 마지막은 종점 KORIO */
const SIGN_STARTS = [0, ...WORDS.map((_, i) => wordStart(i)), APP];
/** 열차가 지나가는 시각 */
const TRAINS = [4, ...SIGN_STARTS.slice(1)];
/** 앱 녹화에서 쓰는 구간 — 카드 넘기기 · 떠올리기 제안 · 써서 확인 */
const OPS: [number, number][] = [
  [24, 100],
  [160, 186],
  [226, 300],
];

const wordAt = (frame: number) => {
  for (let i = WORDS.length - 1; i >= 0; i--) if (frame >= wordStart(i)) return i;
  return -1;
};
const color = (i: number) => (i >= 0 && i < WORDS.length ? WORDS[i].color : PURPLE);
/** 표지판 · 뜻 판이 함께 미끄러진다: 들어올 때 오른쪽에서, 나갈 때 왼쪽으로 */
const slideX = (frame: number, k: number) => {
  const s = SIGN_STARTS[k];
  const n = SIGN_STARTS[k + 1];
  const enter = k === 0 ? 0 : interpolate(frame, [s - 4, s + 8], [1200, 0], CLAMP);
  const exit = n === undefined ? 0 : interpolate(frame, [n - 4, n + 8], [0, -1200], CLAMP);
  return enter + exit;
};

// ───────────────────────────── 승강장
function Platform() {
  const frame = useCurrentFrame();
  const i = wordAt(frame);
  return (
    <AbsoluteFill style={{ background: "#141D36" }}>
      {/* 타일 벽 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          height: 1000,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.045) 2px, transparent 2px), radial-gradient(ellipse at 50% 20%, #22305A, #141D36 70%)",
          backgroundSize: "90px 60px, 90px 60px, 100% 100%",
        }}
      />
      {/* 천장 형광등 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "linear-gradient(#0A0F1E, #121A33)" }} />
      {[
        { top: 34, h: 16, l: 60, r: 60 },
        { top: 92, h: 10, l: 160, r: 160 },
      ].map((b) => (
        <div key={b.top} style={{ position: "absolute", top: b.top, left: b.l, right: b.r, height: b.h, borderRadius: b.h, background: "#F4FAFF", boxShadow: "0 0 30px 6px rgba(190,225,255,0.55)" }} />
      ))}
      {/* 벽 줄무늬 — 지금 노선 색 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 912, height: 20, background: color(i) }} />
      {/* 스크린도어 위 머리판 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 940, height: 194, background: "linear-gradient(#262E40, #1A2030)", borderTop: "4px solid #3A4458", borderBottom: "6px solid #0C0F17" }} />
      {/* 바닥 · 점자 블록 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1540, bottom: 0, background: "linear-gradient(#323845, #191C24)" }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1560,
          height: 52,
          background: "#F4C20D",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.2) 0 6px, transparent 7px)",
          backgroundSize: "26px 26px",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.25)",
        }}
      />
    </AbsoluteFill>
  );
}

function Train({ at, line }: { at: number; line: string }) {
  const frame = useCurrentFrame();
  const f = frame - (at - 10);
  if (f < 0 || f > 22) return null;
  const x = interpolate(f, [0, 22], [1150, -2750]);
  return (
    <div style={{ position: "absolute", left: x, top: 50, width: 2600, height: 420, borderRadius: "90px 0 0 30px", background: "linear-gradient(#F4F7FA, #C2CBD5 80%, #8F9AA7)", filter: "blur(3px)" }}>
      <div style={{ position: "absolute", left: 60, right: 0, top: 70, height: 150, backgroundImage: "repeating-linear-gradient(90deg, #1A2535 0 190px, transparent 190px 250px)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, height: 36, background: line }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 306, height: 10, background: line }} />
    </div>
  );
}

/** 스크린도어 — 유리 너머 터널로 열차가 지나간다 */
function ScreenDoors() {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1134, height: 406, overflow: "hidden", background: "#0A0F19" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 6, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,214,140,0.85) 0 34px, transparent 34px 240px)", filter: "blur(1px)", boxShadow: "0 0 18px rgba(255,200,120,0.4)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, bottom: 0, background: "#06090F" }} />
      {TRAINS.map((t, k) => (
        <Train at={t} key={t} line={k === 0 ? PURPLE : color(k - 1)} />
      ))}
      {/* 유리 · 틀 */}
      {[0, 1, 2, 3].map((d) => (
        <div key={d} style={{ position: "absolute", left: d * 270, top: 0, width: 270, height: 406 }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(150,190,230,0.10) 0 28%, rgba(255,255,255,0.13) 34%, rgba(150,190,230,0.08) 42%)" }} />
          <div style={{ position: "absolute", left: 133, top: 0, bottom: 0, width: 4, background: "rgba(10,14,22,0.7)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: "linear-gradient(90deg, #8C98A7, #5B6676)" }} />
          <div style={{ position: "absolute", left: 18, top: 20, padding: "4px 12px", borderRadius: 8, background: "rgba(255,255,255,0.85)", fontFamily: HEAVY, fontSize: 24, color: "#1D2433" }}>{`${3 + Math.floor(d / 2)}-${(d % 2) + 1}`}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: "linear-gradient(#8C98A7, #4E5867)" }} />
    </div>
  );
}

// ───────────────────────────── 역 표지판
function Speaker({ on, line }: { on: number; line: string }) {
  const frame = useCurrentFrame();
  const live = frame >= on && frame < on + 45;
  return (
    <div style={{ width: 92, height: 92, borderRadius: 46, background: line, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${live ? 1 + Math.abs(Math.sin((frame - on) / 3)) * 0.08 : 1})` }}>
      <svg height={54} viewBox="0 0 24 24" width={54}>
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="#fff" />
        {[0, 1].map((r) => (
          <path d={r ? "M17.2 6.2a8 8 0 0 1 0 11.6" : "M15 8.6a4.6 4.6 0 0 1 0 6.8"} fill="none" key={r} opacity={live ? 0.4 + 0.6 * Math.abs(Math.sin((frame - on) / 4 + r)) : 0.55} stroke="#fff" strokeLinecap="round" strokeWidth={2.2} />
        ))}
      </svg>
    </div>
  );
}

function SignFace({ k }: { k: number }) {
  const frame = useCurrentFrame();
  const hook = k < 0;
  const end = k >= WORDS.length;
  const line = color(k);
  const start = SIGN_STARTS[k + 1];
  const prev = hook || k === 0 ? "Boshlanish" : WORDS[k - 1].ko;
  const next = hook || k === WORDS.length - 1 ? "KORIO" : end ? "Oxirgi bekat" : "?";
  const label = hook ? "KOREYS TILI" : end ? "OXIRGI BEKAT" : `BEKAT ${k + 1} / ${WORDS.length}`;
  return (
    <div style={{ position: "relative", width: 940, height: 470, borderRadius: 28, background: "linear-gradient(#FFFFFF, #E9EDF2)", boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 30, top: 28, width: 92, height: 92, borderRadius: 46, background: line, color: "#fff", fontFamily: HEAVY, fontSize: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>{hook || end ? "K" : k + 1}</div>
      <div style={{ position: "absolute", left: 140, top: 56, fontFamily: HEAVY, fontSize: 30, letterSpacing: 3, color: "#7D8696" }}>{label}</div>
      {!hook && !end ? (
        <div style={{ position: "absolute", right: 30, top: 28 }}>
          <Speaker line={line} on={start + PRON + 5} />
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 118, height: 272, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {hook ? (
          <>
            <div style={{ fontFamily: HEAVY, fontSize: 150, lineHeight: 1, color: "#121826" }}>5 TA SOʻZ</div>
            <div style={{ fontFamily: BODY, fontSize: 46, color: "#6B7383", marginTop: 14 }}>koreyscha · 5 bekat</div>
          </>
        ) : end ? (
          <>
            <div style={{ fontFamily: HEAVY, fontSize: 150, lineHeight: 1, letterSpacing: 4 }}>
              <span style={{ color: PURPLE }}>KORI</span>
              <span style={{ color: PINK }}>O</span>
            </div>
            <div style={{ fontFamily: BODY, fontSize: 46, color: "#6B7383", marginTop: 14 }}>Soʻz kartalari</div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: KO, fontWeight: 700, fontSize: 176, lineHeight: 1, color: "#111722" }}>{WORDS[k].ko}</div>
            <div style={{ fontFamily: BODY, fontSize: 48, color: "#6B7383", marginTop: 12 }}>{WORDS[k].rom}</div>
          </>
        )}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 80, background: line, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px", fontFamily: k > 0 && !end ? KO : HEAVY, fontWeight: 700, fontSize: 36, color: "#fff" }}>
        <span style={{ fontFamily: k > 0 ? KO : HEAVY }}>‹ {prev}</span>
        <span style={{ fontFamily: HEAVY }}>{next} ›</span>
      </div>
      {k === WORDS.length - 1 ? (
        <div style={{ position: "absolute", right: 150, top: 34, transform: `rotate(${-6 + Math.sin((frame - start) / 3) * 3 * (1 - ramp(frame, start + 6, 24))}deg) scale(${pop(frame, start + 6, 300, 11)})`, padding: "8px 20px", borderRadius: 14, background: "#E2453C", fontFamily: HEAVY, fontSize: 32, color: "#fff" }}>ENG QIYINI</div>
      ) : null}
    </div>
  );
}

function Signs() {
  const frame = useCurrentFrame();
  return (
    <>
      {SIGN_STARTS.map((s, k) => {
        const n = SIGN_STARTS[k + 1];
        if (frame < s - 4 || (n !== undefined && frame > n + 8)) return null;
        const x = slideX(frame, k);
        const speed = Math.abs(slideX(frame + 1, k) - x);
        const slam = k === 0 ? 1 + 0.16 * (1 - pop(frame, 0, 260, 13)) : 1;
        // 종점 표지판은 앱 화면이 올라오는 동안 작게 위로
        const compact = k === SIGN_STARTS.length - 1 ? interpolate(frame, [PHONE, PHONE + 12], [0, 1], CLAMP) - interpolate(frame, [END, END + 12], [0, 1], CLAMP) : 0;
        return (
          <div key={s} style={{ position: "absolute", left: 70, top: 170, transform: `translateX(${x}px) scale(${slam * (1 - 0.2 * compact)})`, transformOrigin: "50% 0%", filter: speed > 2 ? `blur(${Math.min(12, speed * 0.05)}px)` : undefined }}>
            {[200, 720].map((rx) => (
              <div key={rx} style={{ position: "absolute", left: rx, top: -170, width: 16, height: 172, background: "linear-gradient(90deg, #6F7A8A, #C9D1DB, #6F7A8A)" }} />
            ))}
            <SignFace k={k - 1} />
          </div>
        );
      })}
    </>
  );
}

// ───────────────────────────── LED 카운트다운 · 뜻 판
function Led({ children, size }: { children: ReactNode; size: number }) {
  const dots = { WebkitMaskImage: "radial-gradient(circle, #000 0 3.4px, transparent 3.9px)", WebkitMaskSize: "10px 10px" } as const;
  const text = { fontFamily: HEAVY, fontSize: size, lineHeight: 1, color: AMBER, whiteSpace: "nowrap" } as const;
  return (
    <div style={{ position: "relative" }}>
      <div style={{ ...text, position: "absolute", inset: 0, filter: "blur(14px)", opacity: 0.75 }}>{children}</div>
      <div style={{ ...text, ...dots, position: "relative" }}>{children}</div>
    </div>
  );
}

function LedPanel({ children, flip, x = 0 }: { children: ReactNode; flip: number; x?: number }) {
  return (
    <div style={{ position: "absolute", left: 240, top: 672, width: 600, height: 220, transform: `translateX(${x}px) perspective(900px) rotateX(${flip * 90}deg)`, borderRadius: 24, background: "#07080C", backgroundImage: "radial-gradient(circle, #2A1A08 0 3px, transparent 3.6px)", backgroundSize: "10px 10px", boxShadow: "0 0 0 8px #2B3242, 0 24px 50px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
      {children}
    </div>
  );
}

function YellowPanel({ label, children, flip, x = 0, height = 230 }: { label: string; children: ReactNode; flip: number; x?: number; height?: number }) {
  return (
    <div style={{ position: "absolute", left: 110, top: 668, width: 860, height, transform: `translateX(${x}px) perspective(900px) rotateX(${flip * -90}deg)`, borderRadius: 24, background: YELLOW, boxShadow: "0 0 0 8px #2B3242, 0 24px 50px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: HEAVY, fontSize: 32, letterSpacing: 4, color: "rgba(17,23,34,0.55)" }}>{label}</div>
      {children}
    </div>
  );
}

function Slot() {
  const frame = useCurrentFrame();
  const panels: ReactNode[] = [];
  // 훅: LED "? / 5" → 질문으로 뒤집힘
  const HOOK_FLIP = 58;
  if (frame < SIGN_STARTS[1] + 8) {
    const x = slideX(frame, 0);
    if (frame < HOOK_FLIP)
      panels.push(
        <LedPanel flip={ramp(frame, HOOK_FLIP - 4, 4)} key="hook-led" x={(1 - pop(frame, 6, 200, 14)) * 1200}>
          <Led size={130}>{Math.floor(frame / 8) % 2 ? "? / 5" : "  / 5"}</Led>
        </LedPanel>,
      );
    else
      panels.push(
        <YellowPanel flip={1 - pop(frame, HOOK_FLIP, 260, 12)} key="hook-q" label="SAVOL" x={x}>
          <div style={{ fontFamily: HEAVY, fontSize: 84, color: "#111722" }}>Nechtasini bilasiz?</div>
        </YellowPanel>,
      );
  }
  WORDS.forEach((w, i) => {
    const s = wordStart(i);
    const local = frame - s;
    if (local < 18 || frame > wordStart(i + 1) + 8) return;
    if (local < REVEAL) {
      const n = COUNT.filter((c) => local >= c).length;
      const digit = n === 0 ? "" : String(4 - n);
      const sinceTick = n === 0 ? 0 : local - COUNT[n - 1];
      panels.push(
        <LedPanel flip={ramp(local, REVEAL - 4, 4)} key={`led${i}`} x={(1 - pop(local, 18, 220, 15)) * 900}>
          <Led size={150}>{n === 0 ? "• • •" : digit}</Led>
          <div style={{ display: "flex", gap: 10, transform: `scale(${n === 0 ? 1 : 1 + 0.25 * (1 - ramp(sinceTick, 0, 6))})` }}>
            {[0, 1, 2].map((d) => (
              <div key={d} style={{ width: 26, height: 26, borderRadius: 13, background: d < 4 - n ? AMBER : "#2A1A08", boxShadow: d < 4 - n ? `0 0 14px ${AMBER}` : undefined }} />
            ))}
          </div>
        </LedPanel>,
      );
    } else {
      const size = Math.min(100, Math.floor(1250 / w.uz.length));
      panels.push(
        <YellowPanel flip={1 - pop(local, REVEAL, 260, 12)} key={`uz${i}`} label="MAʼNOSI" x={slideX(frame, i + 1)}>
          <div style={{ fontFamily: HEAVY, fontSize: size, color: "#111722", lineHeight: 1.1 }}>{w.uz}</div>
        </YellowPanel>,
      );
    }
  });
  return <>{panels}</>;
}

// ───────────────────────────── 노선도 (스크린도어 머리판)
const NODE_X = (n: number) => 120 + n * 168;
function LineMap() {
  const frame = useCurrentFrame();
  const fade = ramp(frame, APP, 8);
  if (fade >= 1) return null;
  const cur = wordAt(frame);
  const revealed = (i: number) => frame >= wordStart(i) + REVEAL;
  // 작은 열차 표시가 역에서 역으로
  let markX = 54;
  for (let i = 0; i < WORDS.length; i++) markX = interpolate(frame, [wordStart(i) - 4, wordStart(i) + 8], [markX, NODE_X(i)], CLAMP);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 940, height: 194, opacity: 1 - fade }}>
      <div style={{ position: "absolute", left: 54, width: NODE_X(5) - 54, top: 66, height: 14, borderRadius: 7, background: "#3A4356" }} />
      {WORDS.map((w, i) => (
        <div key={`seg${i}`} style={{ position: "absolute", left: i === 0 ? 54 : NODE_X(i - 1), width: (NODE_X(i) - (i === 0 ? 54 : NODE_X(i - 1))) * ramp(frame, wordStart(i) - 4, 12), top: 66, height: 14, background: w.color }} />
      ))}
      {[...WORDS.map((w) => w.color), PURPLE].map((c, i) => {
        const appear = pop(frame, 6 + i * 5, 300, 12);
        const end = i === WORDS.length;
        const on = !end && cur === i;
        const done = !end && revealed(i);
        const r = end ? 34 : 24;
        return (
          <div key={`node${i}`} style={{ position: "absolute", left: NODE_X(i) - r, top: 73 - r, width: r * 2, height: r * 2, transform: `scale(${appear})` }}>
            {on ? <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: `5px solid ${c}`, opacity: 1 - ((frame - wordStart(i)) % 24) / 24, transform: `scale(${1 + ((frame - wordStart(i)) % 24) / 40})` }} /> : null}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: done || end ? c : "#141A28", border: `7px solid ${done || on || end ? c : "#5A6478"}`, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {end ? <span style={{ fontFamily: HEAVY, fontSize: 32, color: "#fff" }}>K</span> : null}
            </div>
            <div style={{ position: "absolute", left: "50%", top: r * 2 + 12, transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: end ? HEAVY : KO, fontWeight: 700, fontSize: end ? 30 : 32, color: end ? "#B9AEFF" : done ? "#fff" : "#6E7890" }}>
              {end ? "KORIO" : done ? WORDS[i].ko : "?"}
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: markX - 30, top: 18, width: 60, height: 26, borderRadius: "14px 14px 6px 6px", background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", left: 8, right: 8, top: 6, height: 8, borderRadius: 3, background: color(cur) }} />
      </div>
    </div>
  );
}

// ───────────────────────────── 앱 화면
const SCREEN = { w: 440, h: Math.round((440 * 1688) / 780) };
function clipFrame(local: number) {
  let t = Math.max(0, local);
  for (const [a, b] of OPS) {
    if (t < b - a) return a + t;
    t -= b - a;
  }
  return OPS[OPS.length - 1][1] - 1;
}
/** 녹화 프레임 → 영상 프레임 (op 번째 구간) */
const clipAt = (op: number, f: number) => PHONE + OPS.slice(0, op).reduce((sum, [a, b]) => sum + b - a, 0) + f - OPS[op][0];

function AppPhone() {
  const frame = useCurrentFrame();
  if (frame < PHONE - 2 || frame > END + 12) return null;
  const s = pop(frame, PHONE, 170, 15);
  const leave = ramp(frame, END, 12);
  return (
    <div style={{ position: "absolute", left: (1080 - SCREEN.w - 28) / 2, top: 580, transform: `translateY(${(1 - s) * 1300 + leave * 1400}px) rotate(${(1 - s) * -8}deg)` }}>
      <div style={{ padding: 14, borderRadius: 58, background: "linear-gradient(145deg, #2A2540, #0F0C1E)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.14), 0 0 70px rgba(106,85,245,0.5)" }}>
        <div style={{ position: "relative", width: SCREEN.w, height: SCREEN.h, borderRadius: 44, overflow: "hidden", background: "#fff" }}>
          <Freeze frame={clipFrame(frame - PHONE)}>
            <OffthreadVideo muted src={staticFile("clips/wordCards.mp4")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </Freeze>
        </div>
      </div>
    </div>
  );
}

function Steps() {
  const frame = useCurrentFrame();
  if (frame < PHONE || frame > END + 10) return null;
  const leave = ramp(frame, END, 10);
  const steps = [
    { n: 1, text: "Suring", at: PHONE + 6, left: 36, top: 740 },
    { n: 2, text: "Eslang", at: clipAt(1, 160), left: 700, top: 1010 },
    { n: 3, text: "Yozib tekshiring", at: clipAt(2, 226), left: 36, top: 1280 },
  ];
  return (
    <>
      {steps.map((st, i) => {
        if (frame < st.at) return null;
        const active = frame < (steps[i + 1]?.at ?? END);
        const p = pop(frame, st.at, 300, 13);
        return (
          <div key={st.n} style={{ position: "absolute", left: st.left, top: st.top, transform: `translateX(${(1 - p) * (st.left < 500 ? -500 : 500) + leave * (st.left < 500 ? -900 : 900)}px) rotate(${st.left < 500 ? -4 : 4}deg) scale(${active ? 1.06 : 0.94})`, display: "flex", alignItems: "center", gap: 16, padding: "16px 30px 16px 16px", borderRadius: 40, background: active ? YELLOW : "#fff", boxShadow: "0 18px 36px rgba(0,0,0,0.45)" }}>
            <div style={{ width: 62, height: 62, borderRadius: 31, background: PURPLE, color: "#fff", fontFamily: HEAVY, fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>{st.n}</div>
            <span style={{ fontFamily: HEAVY, fontSize: 50, color: "#111722" }}>{st.text}</span>
          </div>
        );
      })}
    </>
  );
}

// ───────────────────────────── 끝: 댓글 · 내려받기
function Pill({ bg, children }: { bg: string; children: ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 36px", borderRadius: 60, background: bg, fontFamily: HEAVY, fontSize: 44, color: "#fff", boxShadow: "0 16px 32px rgba(0,0,0,0.45)" }}>{children}</div>;
}

function EndCard() {
  const frame = useCurrentFrame();
  if (frame < END + 4) return null;
  return (
    <>
      <YellowPanel flip={1 - pop(frame, END + 4, 240, 12)} height={270} label="IZOHDA YOZING">
        <div style={{ fontFamily: HEAVY, fontSize: 64, color: "#111722", lineHeight: 1.15 }}>Nechtasini topdingiz?</div>
        <div style={{ fontFamily: HEAVY, fontSize: 84, color: "#111722", lineHeight: 1.1 }}>
          <span style={{ opacity: Math.floor(frame / 9) % 2 ? 0.25 : 1 }}>_</span> / 5
        </div>
      </YellowPanel>
      <div style={{ position: "absolute", left: 0, right: 0, top: 990, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ transform: `translateX(${(1 - pop(frame, END + 14, 240, 14)) * -1000}px)` }}>
          <Pill bg="#111">
            <svg height={48} viewBox="0 0 24 24" width={48}>
              <path d="M4 2.5l10.5 9.5L4 21.5z" fill="#00D7FE" />
              <path d="M4 2.5l13.8 6.2-3.3 3.3z" fill="#32BBFF" opacity="0.9" />
              <path d="M14.5 12l3.3 3.3L4 21.5z" fill="#FF3A44" />
              <path d="M17.8 8.7l3.2 1.8c1.1.7 1.1 2.3 0 3l-3.2 1.8-3.3-3.3z" fill="#FFD109" />
            </svg>
            Android: Google Play
          </Pill>
        </div>
        <div style={{ transform: `translateX(${(1 - pop(frame, END + 20, 240, 14)) * 1000}px)` }}>
          <Pill bg="#2AABEE">
            <svg height={50} viewBox="0 0 24 24" width={50}>
              <path d="M21.5 3.5L2.8 10.8c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.4 4.6 3.4c.6.4 1.4.1 1.6-.6l3.2-15.6c.2-.9-.6-1.6-1.3-1.5z" fill="#fff" />
            </svg>
            iPhone: Telegram @KorioLoginBot
          </Pill>
        </div>
      </div>
    </>
  );
}

// ───────────────────────────── 소리
function Sound() {
  const s = (frame: number, src: string, v = 0.5) => (
    <Sequence from={Math.max(0, Math.round(frame))} key={`${src}-${frame}`}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
  const fx = (n: string) => `ai/words/sfx-${n}.mp3`;
  const talk: [number, number][] = [
    [8, 8 + sec(voice.s01)],
    ...WORDS.map((_, i): [number, number] => [wordStart(i) + PRON + 4, wordStart(i) + PRON + 52]),
    [S02, S02 + sec(voice.s02)],
    [S03, S03 + sec(voice.s03)],
  ];
  return (
    <>
      {s(0, fx("train"), 0.2)}
      {s(4, fx("chime"), 0.2)}
      {s(8, "ai/tutorial/sozlar/v-s01.mp3", 1)}
      {WORDS.map((_, i) => {
        const st = wordStart(i);
        return [
          s(st - 10, fx("train"), 0.35),
          s(st + PRON, `ai/tutorial/sozlar/app-w${i + 1}.mp3`, 1),
          ...COUNT.map((c) => s(st + c, fx("tick"), 0.28)),
          s(st + REVEAL, fx("ding"), 0.45),
        ];
      })}
      {s(APP - 10, fx("train"), 0.35)}
      {s(APP + 2, fx("chime"), 0.3)}
      {s(S02, "ai/tutorial/sozlar/v-s02.mp3", 1)}
      {[34, 55, 77, 98].map((f) => s(clipAt(0, f), "sfx/click.wav", 0.4))}
      {s(clipAt(1, 184), "sfx/click.wav", 0.4)}
      {s(clipAt(2, 276), "sfx/correct.wav", 0.4)}
      {s(END, fx("chime"), 0.3)}
      {s(S03, "ai/tutorial/sozlar/v-s03.mp3", 1)}
      <Audio
        src={staticFile("ai/words/music-long.mp3")}
        volume={(f) => {
          const duck = talk.some(([a, b]) => f >= a - 3 && f < b + 3) ? 0.07 : 0.16;
          return duck * interpolate(f, [0, 6, WORDS_TOTAL - 30, WORDS_TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        }}
      />
    </>
  );
}

export function WordsQuiz() {
  const frame = useCurrentFrame();
  // 열차가 지나갈 때 살짝 흔들림 · 천천히 다가가기
  const near = TRAINS.some((t) => frame >= t - 6 && frame < t + 8);
  const shake = near ? Math.sin(frame * 2.7) * 4 : 0;
  return (
    <AbsoluteFill style={{ background: "#141D36", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${shake}px, ${shake * 0.4}px) scale(${1.01 + 0.015 * Math.sin(frame / 60)})` }}>
        <Platform />
        <ScreenDoors />
        <LineMap />
        <Slot />
        <Signs />
        <AppPhone />
        <Steps />
        <EndCard />
      </AbsoluteFill>
      <Sound />
    </AbsoluteFill>
  );
}

/** 표지 — 피드 격자(3:4, 위아래 240px 잘림) 안에 표지판 · 질문 · LED 가 다 들어가게 아래로 내린다 */
export function WordsCover() {
  return (
    <AbsoluteFill style={{ background: "#141D36", overflow: "hidden" }}>
      <Platform />
      <ScreenDoors />
      <div style={{ position: "absolute", left: 70, top: 300 }}>
        {[200, 720].map((rx) => (
          <div key={rx} style={{ position: "absolute", left: rx, top: -300, width: 16, height: 302, background: "linear-gradient(90deg, #6F7A8A, #C9D1DB, #6F7A8A)" }} />
        ))}
        <SignFace k={-1} />
      </div>
      <AbsoluteFill style={{ transform: "translateY(140px)" }}>
        <YellowPanel flip={0} label="SAVOL">
          <div style={{ fontFamily: HEAVY, fontSize: 84, color: "#111722" }}>Nechtasini bilasiz?</div>
        </YellowPanel>
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: "translateY(420px)" }}>
        <LedPanel flip={0}>
          <Led size={130}>? / 5</Led>
        </LedPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
