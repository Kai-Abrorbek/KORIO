/**
 * 직접 찍은 "KORIO 만든 사람 소개" 시험 편집 (약 51초).
 * 원본 4개(세로 720×1280, 거울 모드) → 좌우를 바로잡고, 사람만 오려(ai/matte.py) 새 배경 "파운더 스튜디오" 위에 얹는다.
 *
 *  A1  "…o‘zbek tilida o‘rganmoqchimisiz? …ilova topolmayapsizmi?" → 언어 칩 → 검색창에 쳐 보면 "topilmadi"
 *  A2  "Biz bu muammoni hal qildik!" (당겨서) → 도장 HAL QILDIK
 *  A3  "Assalomu alaykum, do‘stlar!" → 이름표 · 9 YIL · KORIO 로고
 *  B1  배우는 것 → 오른쪽 휴대폰에 실제 앱 화면 (코스 → 한글 → 레슨 → TOPIK) · 칩 쌓기 · "100% O‘ZBEK TILIDA"
 *  C1  AI 선생님 → 튜터 화면,  C2  발음을 바로 → 95점 · DARHOL
 *  D1  안드로이드 → Google Play,  D2  아이폰 → App Store 아직 · 텔레그램 @KorioLoginBot
 *  끝  KORIO + 받는 곳 + 저장
 *
 * 자막은 음성 인식 단어 시각에 맞춰 한 단어씩 노랗게. 이름 · 나라처럼 확실하지 않은 구간은 자막을 비우고 그래픽으로 대신한다.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";

const FPS = 30;
const W = 1080;
const H = 1920;
const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const BODY = '"Segoe UI", sans-serif';
const PURPLE = "#7B5CFF";
const YELLOW = "#FFE14D";
const PINK = "#FF5FA2";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (f: number, at: number, d: number) => clamp01((f - at) / d);
const pop = (f: number, at: number, stiffness = 220, damping = 13) => spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const ease = Easing.bezier(0.65, 0, 0.35, 1);

// ───────────────────────────── 편집 순서 (원본 초)
type SegId = "A1" | "A2" | "A3" | "B1" | "C1" | "C2" | "D1" | "D2";
const RAW: { id: SegId; clip: number; in: number; out: number; layout: "center" | "left"; zoom: number }[] = [
  { id: "A1", clip: 1, in: 0.62, out: 7.5, layout: "center", zoom: 1 },
  { id: "A2", clip: 1, in: 7.84, out: 9.55, layout: "center", zoom: 1.2 },
  { id: "A3", clip: 1, in: 9.8, out: 18.15, layout: "center", zoom: 1 },
  // left: 휴대폰 자리를 내주려 조금 왼쪽으로 — 원본 화면 가장자리가 안 보이게 키워서 민다 (1.12배면 60px 까지)
  { id: "B1", clip: 2, in: 0.12, out: 10.1, layout: "left", zoom: 1.12 },
  { id: "C1", clip: 3, in: 0.02, out: 2.78, layout: "left", zoom: 1.12 },
  { id: "C2", clip: 3, in: 3.16, out: 6.55, layout: "left", zoom: 1.2 },
  { id: "D1", clip: 4, in: 0.68, out: 5.92, layout: "center", zoom: 1 },
  { id: "D2", clip: 4, in: 6.05, out: 16.05, layout: "center", zoom: 1.08 },
];
let cursor = 0;
const SEGS = RAW.map((s) => {
  const from = cursor;
  const dur = Math.round((s.out - s.in) * FPS);
  cursor += dur;
  return { ...s, from, dur };
});
const END = cursor;
export const FOUNDER_TOTAL = END + 84;
const seg = (id: SegId) => SEGS.find((s) => s.id === id)!;
/** 구간 id 의 원본 시각 t(초) → 영상 프레임 */
const at = (id: SegId, t: number) => seg(id).from + Math.round((t - seg(id).in) * FPS);

// ───────────────────────────── 자막 (원본 초)
type Word = [string, number, number];
const PHRASES: { id: SegId; words: Word[] }[] = [
  { id: "A1", words: [["Koreys", 0.76, 1.11], ["tili", 1.12, 1.28], ["va", 1.29, 1.4], ["ingliz", 1.41, 1.73], ["tilini", 1.74, 2.17]] },
  { id: "A1", words: [["qulay", 2.23, 2.78], ["va", 2.82, 3.02], ["o‘zbek", 3.03, 3.3], ["tilida", 3.31, 3.57]] },
  { id: "A1", words: [["o‘rganmoqchimisiz?", 3.58, 4.38]] },
  { id: "A1", words: [["Lekin", 4.39, 4.78], ["o‘zbek", 4.79, 5.13], ["tilida", 5.14, 5.4], ["o‘rgatadigan", 5.41, 5.98]] },
  { id: "A1", words: [["ilova", 5.99, 6.26], ["topolmayapsizmi?", 6.27, 7.44]] },
  { id: "A2", words: [["Biz", 7.88, 8.16], ["bu", 8.17, 8.34], ["muammoni", 8.35, 8.82], ["hal", 8.83, 9.0], ["qildik!", 9.01, 9.48]] },
  { id: "A3", words: [["Assalomu", 9.85, 10.15], ["alaykum,", 10.15, 10.42], ["do‘stlar!", 10.43, 10.86]] },
  { id: "B1", words: [["Siz", 0.25, 0.55], ["bu", 0.56, 0.71], ["KORIO", 0.72, 1.1], ["ilovasi", 1.11, 1.49], ["orqali", 1.5, 2.04]] },
  { id: "B1", words: [["koreys", 2.4, 2.71], ["tili", 2.72, 3.04], ["va", 3.08, 3.21], ["ingliz", 3.22, 3.56], ["tili", 3.57, 3.73]] },
  { id: "B1", words: [["alifbosidan", 3.74, 4.35], ["tortib", 4.36, 4.83]] },
  { id: "B1", words: [["so‘zlar,", 5.02, 5.53], ["grammatika", 5.54, 6.34]] },
  { id: "B1", words: [["va", 6.46, 6.59], ["TOPIK", 6.6, 6.96], ["imtihonlarini", 6.97, 7.65]] },
  { id: "B1", words: [["mutlaqo", 7.66, 8.13], ["o‘zbek", 8.14, 8.45], ["tilida", 8.46, 8.75]] },
  { id: "B1", words: [["o‘rganishingiz", 8.76, 9.27], ["mumkin", 9.28, 9.59], ["bo‘ladi.", 9.6, 9.95]] },
  { id: "C1", words: [["Va", 0.06, 0.28], ["sun’iy", 0.29, 0.63], ["intellekt", 0.64, 0.97], ["ustoz", 0.98, 1.26], ["bilan", 1.27, 1.69]] },
  { id: "C1", words: [["jonli", 1.73, 2.14], ["suhbat.", 2.15, 2.72]] },
  { id: "C2", words: [["U", 3.21, 3.38], ["sizning", 3.39, 3.85], ["xatolaringiz", 3.89, 4.64]] },
  { id: "C2", words: [["va", 4.65, 4.76], ["talaffuzingizni", 4.77, 5.5]] },
  { id: "C2", words: [["darhol", 5.51, 5.81], ["to‘g‘rilaydi.", 5.82, 6.4]] },
  { id: "D1", words: [["KORIO", 0.81, 1.12], ["ilovasini", 1.13, 1.83]] },
  { id: "D1", words: [["Android", 2.0, 2.39], ["foydalanuvchilari", 2.4, 3.24]] },
  { id: "D1", words: [["Google", 3.44, 3.88], ["Play", 3.89, 4.11], ["Market", 4.12, 4.44], ["orqali", 4.45, 4.72]] },
  { id: "D1", words: [["yuklab", 4.73, 4.97], ["olishlari", 4.98, 5.32], ["mumkin.", 5.33, 5.79]] },
  { id: "D2", words: [["iPhone", 6.15, 6.76], ["foydalanuvchilari", 6.77, 7.38], ["esa", 7.39, 7.87]] },
  { id: "D2", words: [["Telegram’da", 10.31, 11.03]] },
  { id: "D2", words: [["foydalanish", 14.66, 15.29], ["mumkin", 15.3, 15.61], ["bo‘ladi.", 15.62, 15.93]] },
];

function Captions() {
  const frame = useCurrentFrame();
  const phrase = PHRASES.find((p) => {
    const start = at(p.id, p.words[0][1]) - 2;
    const end = at(p.id, p.words[p.words.length - 1][2]) + 6;
    return frame >= start && frame < end;
  });
  if (!phrase) return null;
  const start = at(phrase.id, phrase.words[0][1]) - 2;
  const s = pop(frame, start, 300, 16);
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top: 1330, display: "flex", justifyContent: "center", transform: `translateY(${(1 - s) * 40}px) scale(${0.9 + s * 0.1})`, opacity: s }}>
      <div style={{ padding: "16px 30px", borderRadius: 26, background: "rgba(16,10,40,0.78)", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 18px 40px rgba(0,0,0,0.35)", textAlign: "center", maxWidth: 940 }}>
        {phrase.words.map(([text, ws, we], i) => {
          const on = frame >= at(phrase.id, ws) && frame < at(phrase.id, we) + 4;
          const done = frame >= at(phrase.id, we) + 4;
          const k = on ? pop(frame, at(phrase.id, ws), 400, 15) : 0;
          return (
            <span key={i} style={{ display: "inline-block", margin: "0 15px", fontFamily: HEAVY, fontSize: 64, lineHeight: 1.18, color: on ? YELLOW : done ? "#fff" : "rgba(255,255,255,0.55)", transform: `scale(${1 + k * 0.06}) translateY(${-k * 4}px)`, textShadow: on ? "0 0 24px rgba(255,225,77,0.55)" : "none" }}>
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────── 배경: 파운더 스튜디오
const GLYPHS = ["한", "A", "글", "ㄱ", "B", "가", "ㅎ", "C", "나", "ㅏ", "Z", "말"];
function Studio() {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const blob = (x: number, y: number, r: number, color: string, speed: number, phase: number) => (
    <div style={{ position: "absolute", left: x + Math.sin(t * speed + phase) * 80 - r, top: y + Math.cos(t * speed * 0.8 + phase) * 60 - r, width: r * 2, height: r * 2, borderRadius: r, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: "blur(10px)" }} />
  );
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #3A2A8C 0%, #1F1655 45%, #0E0A2A 100%)", overflow: "hidden" }}>
      {blob(220, 420, 420, "rgba(123,92,255,0.55)", 0.35, 0)}
      {blob(880, 760, 380, "rgba(255,95,162,0.35)", 0.28, 2)}
      {blob(560, 1500, 520, "rgba(56,189,248,0.22)", 0.22, 4)}
      {/* 원근 바닥 격자 */}
      <div style={{ position: "absolute", left: -400, right: -400, top: 1250, height: 900, transform: "perspective(700px) rotateX(62deg)", transformOrigin: "50% 0%", backgroundImage: "linear-gradient(rgba(170,150,255,0.18) 2px, transparent 2px), linear-gradient(90deg, rgba(170,150,255,0.18) 2px, transparent 2px)", backgroundSize: "90px 90px", backgroundPosition: `0 ${(t * 40) % 90}px`, maskImage: "linear-gradient(transparent, black 30%)" }} />
      {/* 떠다니는 글자 */}
      {GLYPHS.map((g, i) => {
        const x = (i * 97) % W;
        const speed = 18 + (i % 4) * 7;
        const y = H - ((t * speed + i * 260) % (H + 300));
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, fontFamily: /[A-Z]/.test(g) ? HEAVY : '"Malgun Gothic", sans-serif', fontWeight: 900, fontSize: 90 + (i % 3) * 40, color: "rgba(255,255,255,0.07)", transform: `rotate(${Math.sin(t + i) * 12}deg)` }}>
            {g}
          </div>
        );
      })}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 사람 (오려 낸 영상)
function Person() {
  const frame = useCurrentFrame();
  const current = [...SEGS].reverse().find((s) => frame >= s.from) ?? SEGS[0];
  if (frame >= END) return null;
  // 구간마다 툭 당기거나 밀며 들어오고, 그 안에서는 아주 천천히 다가간다
  const enter = pop(frame, current.from, 260, 18);
  const prev = SEGS[SEGS.indexOf(current) - 1];
  const fromZoom = prev ? prev.zoom : current.zoom * 1.08;
  const zoom = interpolate(enter, [0, 1], [fromZoom, current.zoom]) * (1 + (frame - current.from) * 0.0004);
  const layoutX = (s: (typeof SEGS)[number]) => (s.layout === "left" ? -60 : 0);
  const x = interpolate(enter, [0, 1], [prev ? layoutX(prev) : 0, layoutX(current)]);
  const glow = 0.55 + Math.sin(frame / 20) * 0.08;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: W / 2 - 420 + x, top: 380, width: 840, height: 840, borderRadius: 420, background: `radial-gradient(circle, rgba(170,150,255,${glow}) 0%, rgba(123,92,255,0.18) 45%, transparent 70%)`, transform: `scale(${zoom})` }} />
      {SEGS.map((s) => (
        <Sequence durationInFrames={s.dur} from={s.from} key={s.id} layout="none">
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${x}px) scale(${zoom})`, transformOrigin: "50% 100%" }}>
            <OffthreadVideo muted src={staticFile(`ai/edit/c${s.clip}.webm`)} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45)) contrast(1.04) saturate(1.06)" }} transparent trimBefore={Math.round(s.in * FPS)} />
          </div>
          <Audio src={staticFile(`ai/edit/c${s.clip}.wav`)} trimAfter={Math.round(s.out * FPS)} trimBefore={Math.round(s.in * FPS)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

// ───────────────────────────── 그래픽 부품
function Show({ from, to, children }: { from: number; to: number; children: (local: number, out: number) => ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return <>{children(frame - from, ramp(frame, to - 8, 8))}</>;
}

function Pill({ children, style, color = "rgba(255,255,255,0.14)" }: { children: ReactNode; style?: CSSProperties; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 30px", borderRadius: 999, background: color, border: "2px solid rgba(255,255,255,0.28)", backdropFilter: "blur(14px)", boxShadow: "0 14px 30px rgba(0,0,0,0.3)", fontFamily: HEAVY, fontSize: 44, color: "#fff", ...style }}>
      {children}
    </div>
  );
}

function SearchCard({ start }: { start: number }) {
  const frame = useCurrentFrame();
  const query = "o‘zbekcha koreys tili ilova";
  const typed = Math.floor(ramp(frame, start + 6, 36) * query.length);
  const fail = frame >= start + 56;
  const shake = fail ? Math.sin((frame - start - 56) * 2.2) * 10 * (1 - ramp(frame, start + 56, 14)) : 0;
  return (
    <div style={{ width: 860, padding: "26px 30px", borderRadius: 30, background: "#fff", boxShadow: "0 30px 60px rgba(0,0,0,0.4)", transform: `translateX(${shake}px)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 22px", borderRadius: 999, border: "3px solid #E5E1F5" }}>
        <svg height={40} viewBox="0 0 24 24" width={40}>
          <circle cx="10" cy="10" fill="none" r="6.5" stroke="#7B5CFF" strokeWidth="2.6" />
          <path d="M15 15l5.5 5.5" stroke="#7B5CFF" strokeLinecap="round" strokeWidth="2.6" />
        </svg>
        <span style={{ fontFamily: BODY, fontSize: 40, color: "#1C1A2E" }}>
          {query.slice(0, typed)}
          <span style={{ opacity: Math.floor(frame / 8) % 2 ? 0 : 1, color: PURPLE }}>|</span>
        </span>
      </div>
      {fail ? (
        <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 14, fontFamily: HEAVY, fontSize: 40, color: "#E5484D", transform: `scale(${pop(frame, start + 56, 300, 12)})`, transformOrigin: "left center" }}>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: "#E5484D", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>!</span>
          Mos ilova topilmadi
        </div>
      ) : null}
    </div>
  );
}

function Stamp({ start }: { start: number }) {
  const frame = useCurrentFrame();
  const t = ramp(frame, start, 5);
  const scale = interpolate(t, [0, 1], [2.6, 1], { easing: (v) => v * v });
  const burst = frame - start - 5;
  return (
    <div style={{ position: "relative", transform: `rotate(-8deg) scale(${scale})`, opacity: Math.min(1, t * 1.6) }}>
      {burst >= 0 && burst < 14
        ? Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 40, height: 8, borderRadius: 4, background: i % 2 ? YELLOW : "#3DDC84", opacity: 1 - burst / 14, transform: `translate(-50%, -50%) rotate(${(a * 180) / Math.PI}deg) translateX(${220 + burst * 18}px)` }} />;
          })
        : null}
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "18px 40px", border: "9px solid #3DDC84", borderRadius: 26, background: "rgba(14,10,42,0.55)", fontFamily: HEAVY, fontSize: 96, color: "#3DDC84", letterSpacing: 2 }}>
        <svg height={96} viewBox="0 0 24 24" width={96}>
          <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="#3DDC84" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
        </svg>
        HAL QILDIK
      </div>
    </div>
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

const SCREEN = { w: 300, h: 650 };
function PhoneScreens({ items }: { items: { from: number; to: number; src: string; trim: number }[] }) {
  return (
    <div style={{ position: "relative", width: SCREEN.w, height: SCREEN.h, borderRadius: 40, overflow: "hidden", background: "#fff" }}>
      {items.map((it) => (
        <Sequence durationInFrames={it.to - it.from} from={it.from} key={`${it.src}-${it.from}`} layout="none">
          <div style={{ position: "absolute", inset: 0 }}>
            <OffthreadVideo muted src={staticFile(`clips/${it.src}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={it.trim} />
          </div>
        </Sequence>
      ))}
    </div>
  );
}

function Phone({ from, to, items, ring }: { from: number; to: number; items: { from: number; to: number; src: string; trim: number }[]; ring?: { at: number; x: number; y: number; r: number } }) {
  const frame = useCurrentFrame();
  if (frame < from - 2 || frame >= to + 10) return null;
  const s = pop(frame, from, 170, 15);
  const leave = ramp(frame, to, 10);
  const bob = Math.sin(frame / 22) * 8;
  return (
    <div style={{ position: "absolute", left: 740, top: 640, transform: `translateY(${bob + (1 - s) * 900 + leave * 1200}px) rotate(${-5 + (1 - s) * 18}deg) scale(0.88)`, transformOrigin: "0 0" }}>
      <div style={{ padding: 12, borderRadius: 52, background: "linear-gradient(145deg, #2A2540, #0F0C1E)", boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.12), 0 0 60px rgba(123,92,255,0.45)` }}>
        <PhoneScreens items={items} />
      </div>
      {ring && frame >= ring.at ? (
        <svg height={SCREEN.h + 24} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={SCREEN.w + 24}>
          <ellipse cx={ring.x + 12} cy={ring.y + 12} fill="none" rx={ring.r} ry={ring.r * 0.6} stroke={YELLOW} strokeDasharray={600} strokeDashoffset={600 * (1 - ramp(frame, ring.at, 10))} strokeLinecap="round" strokeWidth={7} />
        </svg>
      ) : null}
    </div>
  );
}

function GooglePlay({ dim = false }: { dim?: boolean }) {
  return (
    <Pill color={dim ? "rgba(80,80,90,0.55)" : "#111"} style={{ fontSize: 46, padding: "18px 36px", opacity: dim ? 0.85 : 1 }}>
      <svg height={48} viewBox="0 0 24 24" width={48}>
        <path d="M4 2.5l10.5 9.5L4 21.5z" fill="#00D7FE" />
        <path d="M4 2.5l13.8 6.2-3.3 3.3z" fill="#32BBFF" opacity="0.9" />
        <path d="M14.5 12l3.3 3.3L4 21.5z" fill="#FF3A44" />
        <path d="M17.8 8.7l3.2 1.8c1.1.7 1.1 2.3 0 3l-3.2 1.8-3.3-3.3z" fill="#FFD109" />
      </svg>
      Google Play Market
    </Pill>
  );
}

function TelegramPill({ start }: { start: number }) {
  const frame = useCurrentFrame();
  const handle = "@KorioLoginBot";
  const typed = Math.floor(ramp(frame, start + 6, 26) * handle.length);
  return (
    <Pill color="#2AABEE" style={{ fontSize: 50, padding: "20px 40px" }}>
      <svg height={52} viewBox="0 0 24 24" width={52}>
        <path d="M21.5 3.5L2.8 10.8c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.4 4.6 3.4c.6.4 1.4.1 1.6-.6l3.2-15.6c.2-.9-.6-1.6-1.3-1.5z" fill="#fff" />
      </svg>
      {handle.slice(0, typed)}
      <span style={{ opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }}>|</span>
    </Pill>
  );
}

// ───────────────────────────── 장면별 그래픽
function Graphics() {
  const frame = useCurrentFrame();
  const chips = [
    { text: "ALIFBO", t: 3.74, c: "#7B5CFF" },
    { text: "SO‘ZLAR", t: 5.02, c: "#FF5FA2" },
    { text: "GRAMMATIKA", t: 5.54, c: "#22C55E" },
    { text: "TOPIK", t: 6.6, c: "#F59E0B" },
  ];
  return (
    <>
      {/* A1: 언어 칩 → 검색 실패 */}
      <Show from={at("A1", 0.76)} to={at("A1", 4.4)}>
        {(l, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center", gap: 18, opacity: 1 - out, transform: `translateY(${out * -80}px)` }}>
            {[
              { t: "KOREYS", at: 0 },
              { t: "INGLIZ", at: at("A1", 1.41) - at("A1", 0.76) },
              { t: "O‘ZBEK TILIDA", at: at("A1", 3.03) - at("A1", 0.76), hi: true },
            ].map((c) =>
              l >= c.at ? (
                <div key={c.t} style={{ transform: `scale(${pop(frame, at("A1", 0.76) + c.at, 300, 13)})` }}>
                  <Pill color={c.hi ? YELLOW : "rgba(255,255,255,0.14)"} style={c.hi ? { color: "#1C1A2E" } : undefined}>
                    {c.t}
                  </Pill>
                </div>
              ) : null,
            )}
          </div>
        )}
      </Show>
      <Show from={at("A1", 4.4)} to={at("A2", 7.9)}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 110, top: 210, transform: `translateY(${(1 - pop(frame, at("A1", 4.4), 200, 15)) * -500 + out * -600}px)` }}>
            <SearchCard start={at("A1", 4.4)} />
          </div>
        )}
      </Show>
      {/* A2: 도장 */}
      <Show from={at("A2", 8.83)} to={at("A3", 9.9)}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", opacity: 1 - out }}>
            <Stamp start={at("A2", 8.83)} />
          </div>
        )}
      </Show>
      {/* A3: 이름표 · 9 YIL · 로고 */}
      <Show from={at("A3", 10.9)} to={at("A3", 18.15)}>
        {(_, out) => {
          const s = pop(frame, at("A3", 10.9), 200, 16);
          return (
            <div style={{ position: "absolute", left: 60, top: 1130, transform: `translateX(${(1 - s) * -800 - out * 900}px)` }}>
              <div style={{ display: "flex", alignItems: "stretch", borderRadius: 22, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                <div style={{ width: 16, background: `linear-gradient(${PURPLE}, ${PINK})` }} />
                <div style={{ padding: "18px 30px", background: "rgba(255,255,255,0.95)" }}>
                  <div style={{ fontFamily: HEAVY, fontSize: 52, color: "#1C1A2E" }}>KORIO asoschisi</div>
                  <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: "#6B6585" }}>Koreys va ingliz tili — o‘zbek tilida</div>
                </div>
              </div>
            </div>
          );
        }}
      </Show>
      <Show from={at("A3", 12.0)} to={at("A3", 15.0)}>
        {(l, out) => {
          const n = Math.min(9, Math.floor(ramp(l, 0, 14) * 9 + (l > 0 ? 1 : 0)));
          return (
            <div style={{ position: "absolute", left: 70, top: 300, textAlign: "center", transform: `scale(${pop(frame, at("A3", 12.0), 260, 12)}) rotate(-6deg)`, opacity: 1 - out }}>
              <div style={{ fontFamily: HEAVY, fontSize: 180, lineHeight: 1, color: YELLOW, textShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>{n}</div>
              <div style={{ fontFamily: HEAVY, fontSize: 52, color: "#fff" }}>YIL</div>
              <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32, color: "rgba(255,255,255,0.8)" }}>o‘qish va ish</div>
            </div>
          );
        }}
      </Show>
      <Show from={at("A3", 15.0)} to={at("A3", 18.15)}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 140, display: "flex", justifyContent: "center", transform: `scale(${pop(frame, at("A3", 15.0), 240, 11)}) rotate(-3deg)`, opacity: 1 - out }}>
            <Logo size={110} />
          </div>
        )}
      </Show>
      {/* B1: 휴대폰 + 칩 + 100% */}
      <Phone
        from={seg("B1").from}
        items={[
          { from: seg("B1").from, to: at("B1", 3.74), src: "courses", trim: 0 },
          { from: at("B1", 3.74), to: at("B1", 5.02), src: "hangul", trim: 20 },
          { from: at("B1", 5.02), to: at("B1", 6.6), src: "lesson", trim: 10 },
          { from: at("B1", 6.6), to: seg("C1").from, src: "topik", trim: 6 },
          { from: seg("C1").from, to: seg("C2").from, src: "tutor", trim: 150 },
          { from: seg("C2").from, to: seg("D1").from, src: "speaking", trim: 30 },
        ]}
        ring={{ at: at("C2", 4.77), x: 70, y: 255, r: 60 }}
        to={seg("D1").from}
      />
      <Show from={at("B1", 3.74)} to={at("B1", 7.66)}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 50, top: 210, display: "flex", flexDirection: "column", gap: 16, opacity: 1 - out }}>
            {chips.map((c) =>
              frame >= at("B1", c.t) ? (
                <div key={c.text} style={{ transform: `translateX(${(1 - pop(frame, at("B1", c.t), 300, 14)) * -500}px)` }}>
                  <Pill color={c.c} style={{ fontSize: 46 }}>
                    {c.text}
                  </Pill>
                </div>
              ) : null,
            )}
          </div>
        )}
      </Show>
      <Show from={at("B1", 7.66)} to={seg("C1").from}>
        {(_, out) => {
          const s = pop(frame, at("B1", 7.66), 260, 12);
          return (
            <div style={{ position: "absolute", left: 30, top: 240, transform: `rotate(-4deg) scale(${interpolate(s, [0, 1], [1.8, 1])})`, opacity: Math.min(1, s * 2) * (1 - out) }}>
              <div style={{ padding: "16px 34px", background: YELLOW, borderRadius: 18, fontFamily: HEAVY, fontSize: 82, lineHeight: 1, color: "#1C1A2E", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}>100%</div>
              <div style={{ marginTop: 10, padding: "10px 28px", background: "#fff", borderRadius: 14, fontFamily: HEAVY, fontSize: 48, color: PURPLE }}>O‘ZBEK TILIDA</div>
            </div>
          );
        }}
      </Show>
      {/* C1 · C2 */}
      <Show from={seg("C1").from} to={seg("C2").from}>
        {() => (
          <div style={{ position: "absolute", left: 50, top: 230, transform: `scale(${pop(frame, seg("C1").from + 4, 300, 13)})`, transformOrigin: "left center" }}>
            <Pill color={PURPLE} style={{ fontSize: 52 }}>
              AI USTOZ
            </Pill>
            <div style={{ marginTop: 12, marginLeft: 8, fontFamily: HEAVY, fontSize: 42, color: "#fff" }}>jonli suhbat</div>
          </div>
        )}
      </Show>
      <Show from={at("C2", 5.5)} to={seg("D1").from}>
        {() => (
          <div style={{ position: "absolute", left: 60, top: 230, display: "flex", alignItems: "center", gap: 14, transform: `scale(${pop(frame, at("C2", 5.5), 320, 12)}) rotate(-4deg)`, transformOrigin: "left center" }}>
            <svg height={110} viewBox="0 0 24 24" width={110}>
              <path d="M13.5 2L4 13.5h6.5L9 22l11-12.5h-6.8z" fill={YELLOW} stroke="#1C1A2E" strokeLinejoin="round" strokeWidth="0.8" />
            </svg>
            <span style={{ fontFamily: HEAVY, fontSize: 92, color: YELLOW, textShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>DARHOL</span>
          </div>
        )}
      </Show>
      {/* D1 · D2: 받는 곳 */}
      <Show from={at("D1", 2.0)} to={seg("D2").from}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: 1 - out }}>
            <div style={{ transform: `scale(${pop(frame, at("D1", 2.0), 300, 13)})` }}>
              <Pill color="#3DDC84" style={{ color: "#0B2A17" }}>ANDROID</Pill>
            </div>
            {frame >= at("D1", 3.44) ? (
              <div style={{ transform: `translateY(${(1 - pop(frame, at("D1", 3.44), 260, 14)) * 300}px)` }}>
                <GooglePlay />
              </div>
            ) : null}
          </div>
        )}
      </Show>
      <Show from={at("D2", 6.15)} to={END}>
        {(_, out) => (
          <div style={{ position: "absolute", left: 0, right: 0, top: 240, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: 1 - out }}>
            <div style={{ transform: `scale(${pop(frame, at("D2", 6.15), 300, 13)})` }}>
              <Pill color="#fff" style={{ color: "#111" }}>iPHONE</Pill>
            </div>
            {frame >= at("D2", 7.96) && frame < at("D2", 10.3) ? (
              <div style={{ transform: `scale(${pop(frame, at("D2", 7.96), 260, 14)})` }}>
                <Pill color="rgba(80,80,90,0.6)" style={{ fontSize: 40 }}>
                  App Store — hozircha yo‘q
                </Pill>
              </div>
            ) : null}
            {frame >= at("D2", 10.3) ? (
              <div style={{ transform: `translateY(${(1 - pop(frame, at("D2", 10.3), 260, 14)) * 300}px)` }}>
                <TelegramPill start={at("D2", 10.3)} />
              </div>
            ) : null}
          </div>
        )}
      </Show>
    </>
  );
}

// ───────────────────────────── 끝 카드
function EndCard() {
  const frame = useCurrentFrame();
  if (frame < END - 4) return null;
  const wipe = interpolate(frame, [END - 4, END + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #4B36B8, #1A1250 70%)", clipPath: `circle(${wipe * 140}% at 50% 55%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div style={{ transform: `scale(${pop(frame, END + 6, 220, 11)}) rotate(-3deg)` }}>
          <Logo size={170} />
        </div>
        <div style={{ fontFamily: HEAVY, fontSize: 48, color: "#fff", opacity: ramp(frame, END + 14, 8) }}>Koreys va ingliz tili — o‘zbek tilida</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, marginTop: 20 }}>
          <div style={{ transform: `translateX(${(1 - pop(frame, END + 20, 240, 14)) * -900}px)` }}>
            <GooglePlay />
          </div>
          <div style={{ transform: `translateX(${(1 - pop(frame, END + 26, 240, 14)) * 900}px)` }}>
            <Pill color="#2AABEE" style={{ fontSize: 46 }}>iPhone: Telegram @KorioLoginBot</Pill>
          </div>
        </div>
        <div style={{ marginTop: 30, padding: "14px 34px", background: YELLOW, borderRadius: 16, fontFamily: HEAVY, fontSize: 46, color: "#1C1A2E", transform: `rotate(-3deg) scale(${pop(frame, END + 40, 300, 12)})` }}>Saqlab qo‘ying!</div>
      </div>
    </AbsoluteFill>
  );
}

/** 다른 원본으로 넘어갈 때 번쩍 */
function Flashes() {
  const frame = useCurrentFrame();
  const cuts = SEGS.filter((s, i) => i > 0 && SEGS[i - 1].clip !== s.clip).map((s) => s.from);
  const d = Math.min(...cuts.map((c) => (frame >= c ? frame - c : 99)));
  return d < 6 ? <AbsoluteFill style={{ background: "#fff", opacity: (1 - d / 6) * 0.55 }} /> : null;
}

function Sound() {
  const s = (frame: number, src: string, v = 0.5) => (
    <Sequence from={Math.max(0, Math.round(frame))} key={`${src}-${frame}`}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
  const e = (n: string) => `ai/edit/sfx-${n}.mp3`;
  const cuts = SEGS.filter((x, i) => i > 0 && SEGS[i - 1].clip !== x.clip).map((x) => x.from);
  return (
    <>
      {cuts.map((c) => s(c - 3, e("whoosh"), 0.35))}
      {[at("A1", 0.76), at("A1", 1.41), at("A1", 3.03)].map((f) => s(f, e("pop"), 0.35))}
      {s(at("A1", 4.6), e("type"), 0.35)}
      {s(at("A1", 6.27), e("error"), 0.4)}
      {s(at("A2", 8.8), e("boom"), 0.55)}
      {s(at("A3", 10.9), e("whoosh"), 0.3)}
      {s(at("A3", 12.0), e("pop"), 0.35)}
      {s(at("A3", 15.0), e("pop"), 0.4)}
      {[3.74, 5.02, 5.54, 6.6].map((t) => s(at("B1", t), e("pop"), 0.3))}
      {s(at("B1", 7.66), e("boom"), 0.4)}
      {s(at("C2", 4.8), "sfx/correct.wav", 0.35)}
      {s(at("C2", 5.5), e("pop"), 0.4)}
      {[at("D1", 2.0), at("D1", 3.44), at("D2", 6.15), at("D2", 7.96)].map((f) => s(f, e("pop"), 0.35))}
      {s(at("D2", 10.4), e("type"), 0.3)}
      {s(END, e("whoosh"), 0.4)}
      {Array.from({ length: Math.ceil(FOUNDER_TOTAL / 660) }, (_, i) => (
        <Sequence durationInFrames={660} from={i * 660} key={`m${i}`}>
          <Audio
            src={staticFile("ai/edit/music.mp3")}
            volume={(fr) => {
              const g = i * 660 + fr;
              const base = g >= END ? 0.22 : 0.07;
              return base * interpolate(g, [0, 12, FOUNDER_TOTAL - 30, FOUNDER_TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            }}
          />
        </Sequence>
      ))}
    </>
  );
}

export function FounderIntro() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0E0A2A" }}>
      <Studio />
      <Person />
      <Graphics />
      <Captions />
      <Flashes />
      <EndCard />
      <Sound />
    </AbsoluteFill>
  );
}
