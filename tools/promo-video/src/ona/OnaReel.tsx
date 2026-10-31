/**
 * "Oʻzbek ona = koreys ona" — 우즈벡 엄마와 한국 엄마의 잔소리는 똑같다 (약 55초)
 *
 * 8블록 (reels 규칙): Hook → Lead(10초까지) → Body1 밥 먹었어? → Open loop → Body2 엄친아 → Open loop → Body3 결혼 언제 해?
 *   → CTA (누구 엄마가 더 셀까 OʻZBEK/KOREYS + "toʻy qachon deb soʻraydigan doʻstingizga yuboring" + 앱 표현 화면)
 * 화면 문법(이 편 것): 밤 11시 47분 휴대폰 잠금화면 — 엄마 알림이 위에서 툭 떨어져 쌓이고, 열린 고리는 "입력 중…" 말풍선.
 *   우즈벡 엄마 "Oyijon" = 청록 아이콘, 한국 엄마 "엄마" = 빨강 아이콘, 뜻은 노란 칩. 말하는 단어는 아래 자막에 형광펜.
 *
 * 소리: src/ona/make-ona-audio.mjs — 안내 Sarah · 우즈벡 엄마 Matilda · 한국 엄마 Azure SoonBok · 한국어 SunHi, 단어 시각 ona.words.json
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Icon, useIconFont } from "../theme";
import { HEAVY, KO as KO_FONT } from "../tutorial/kit";
import lines from "./ona.lines.json";
import timing from "./ona.words.json";

const FPS = 30;
export const INK = "#1B1830";
export const YELLOW = "#FFD43B";
export const UZ = "#12A8C4";
export const UZ_DARK = "#0A7A90";
export const KO = "#E2384D";
export const KO_DARK = "#A61F31";
const GLASS = "rgba(255,255,255,0.92)";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const pop = (frame: number, at: number, stiffness = 260, damping = 12) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}ʻʼ']/gu, "");

// ── 타임라인 ──
type VoiceKey = keyof typeof timing.voice;
type ClipKey = keyof typeof timing.clips;
const ORDER: { key: string; gap: number; pause?: number }[] = [
  { key: "v01", gap: 2 }, // Hook
  { key: "m01", gap: 2 },
  { key: "k01", gap: 3 },
  { key: "v02", gap: 4 }, // Lead — 10초까지
  { key: "v03", gap: 6 }, // Body 1 밥
  { key: "k02", gap: 2 },
  { key: "v04", gap: 5 }, // Open loop 1
  { key: "v05", gap: 4 }, // Body 2 옆집 아들
  { key: "m02", gap: 2 },
  { key: "k03", gap: 3 },
  { key: "v06", gap: 3 },
  { key: "k04", gap: 2 },
  { key: "v07", gap: 3 },
  { key: "v08", gap: 5 }, // Open loop 2
  { key: "v09", gap: 4 }, // Body 3 결혼
  { key: "m03", gap: 2 },
  { key: "k05", gap: 3 },
  { key: "v10", gap: 3 },
  { key: "v11", gap: 6 }, // CTA — 누구 엄마가 더 셀까
  { key: "v12", gap: 4 }, // 콕 집은 보내기
  { key: "end", gap: 22, pause: 62 }, // 보내기 화면을 잠깐 더 두고 → 앱 화면 · 받는 곳 · 저장
];
const T: Record<string, { at: number; len: number }> = {};
{
  let cursor = 0;
  for (const step of ORDER) {
    const at = cursor + step.gap;
    const seconds = step.key.startsWith("v") ? timing.voice[step.key as VoiceKey].len : step.key in timing.clips ? timing.clips[step.key as ClipKey] : 0;
    const len = step.pause ?? Math.round(seconds * FPS);
    T[step.key] = { at, len };
    cursor = at + len;
  }
}
export const ONA_TOTAL = T.end.at + T.end.len;
const VOICES = ORDER.filter((s) => s.key.startsWith("v")).map((s) => s.key as VoiceKey);
const CLIPS = ORDER.filter((s) => s.key in timing.clips).map((s) => s.key as ClipKey);
const CLIP_TEXT: Record<string, { text: string; lang: "uz" | "ko" }> = {
  ...Object.fromEntries(Object.entries(lines.uzMom).map(([k, t]) => [k, { text: t, lang: "uz" as const }])),
  ...Object.fromEntries(Object.entries(lines.koMom).map(([k, t]) => [k, { text: t, lang: "ko" as const }])),
  ...Object.fromEntries(Object.entries(lines.ko).map(([k, t]) => [k, { text: t, lang: "ko" as const }])),
};

function word(key: VoiceKey, text: string) {
  const w = timing.voice[key].words.find((x) => norm(x.w) === norm(text));
  if (!w) throw new Error(`${key}: no word "${text}"`);
  return T[key].at + Math.round(w.s * FPS);
}

const SCENES = {
  hook: [0, T.v02.at],
  lead: [T.v02.at, T.v03.at],
  body1: [T.v03.at, T.v04.at],
  loop1: [T.v04.at, T.v05.at],
  body2: [T.v05.at, T.v08.at],
  loop2: [T.v08.at, T.v09.at],
  body3: [T.v09.at, T.v11.at],
  ask: [T.v11.at, T.v12.at],
  send: [T.v12.at, T.end.at],
  end: [T.end.at, ONA_TOTAL],
} as const;

// ── 부품 ──
/** 엄마 알림 — 위에서 툭 떨어지고 부르르 떤다 */
export function Note({ at, from, text, lang, sub, size = 54, kick = [], solid = false }: { at: number; from: string; text: string; lang: "uz" | "ko"; sub?: string; size?: number; kick?: number[]; solid?: boolean }) {
  const frame = useCurrentFrame();
  if (frame < at) return <div style={{ opacity: 0, height: 0 }} />;
  const s = pop(frame, at, 280, 13);
  const buzz = frame - at < 10 ? Math.sin((frame - at) * 2.6) * (1 - (frame - at) / 10) * 2.2 : 0;
  const bump = kick.reduce((m, t) => (frame >= t ? Math.max(m, Math.exp(-(frame - t) / 4)) : m), 0);
  const color = lang === "uz" ? [UZ, UZ_DARK] : [KO, KO_DARK];
  return (
    <div style={{ transform: `translateY(${(1 - s) * -260}px) rotate(${buzz}deg) scale(${1 + 0.05 * bump})`, opacity: clamp01(s * 3) }}>
      <div style={{ width: 930, background: solid ? "#F1F0F6" : GLASS, borderRadius: 42, padding: "26px 30px 28px", display: "flex", gap: 26, boxShadow: "0 22px 60px rgba(0,0,0,0.35)" }}>
        <div style={{ width: 96, height: 96, flex: "0 0 96px", borderRadius: 26, background: `linear-gradient(160deg, ${color[0]}, ${color[1]})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon color="#fff" name="chat" size={54} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: lang === "ko" ? KO_FONT : HEAVY, fontWeight: 900, fontSize: 38, color: INK }}>{from}</span>
            <span style={{ fontFamily: HEAVY, fontSize: 30, color: "#6E6A80" }}>{lang === "ko" ? "지금" : "hozir"}</span>
          </div>
          <div style={{ fontFamily: lang === "ko" ? KO_FONT : HEAVY, fontWeight: 900, fontSize: size, color: INK, marginTop: 6, lineHeight: 1.15 }}>{text}</div>
          {sub ? (
            <div style={{ display: "inline-block", marginTop: 14, background: YELLOW, borderRadius: 14, padding: "6px 16px", fontFamily: HEAVY, fontWeight: 900, fontSize: 34, color: INK }}>{sub}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Pop({ at, children, from = 1.6, rot = 0, style }: { at: number; children: ReactNode; from?: number; rot?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const s = frame < at ? 0 : pop(frame, at, 320, 14);
  return <div style={{ transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${rot * s}deg)`, opacity: clamp01(s * 3), ...style }}>{children}</div>;
}

export function Chip({ children, bg = YELLOW, fg = INK, size = 56, style }: { children: ReactNode; bg?: string; fg?: string; size?: number; style?: CSSProperties }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: bg, color: fg, borderRadius: size * 0.32, padding: `${size * 0.16}px ${size * 0.34}px`, fontFamily: HEAVY, fontWeight: 900, fontSize: size, lineHeight: 1.1, whiteSpace: "nowrap", ...style }}>
      {children}
    </div>
  );
}

function Stack({ top, children, gap = 26 }: { top: number; children: ReactNode; gap?: number }) {
  return <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap }}>{children}</div>;
}

function Header({ n, text, at }: { n: number; text: string; at: number }) {
  const frame = useCurrentFrame();
  const s = frame < at ? 0 : pop(frame, at, 260, 14);
  return (
    <div style={{ position: "absolute", top: 120, left: 64, transform: `translateX(${(1 - s) * -500}px)`, display: "flex", alignItems: "center", gap: 18 }}>
      <Chip size={50}>{n}</Chip>
      <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 48, color: "#fff", letterSpacing: -1 }}>{text}</div>
    </div>
  );
}

/** 열린 고리 — "입력 중…" 말풍선, 점 세 개가 통통 */
function Typing({ at, who, lang }: { at: number; who: string; lang: "uz" | "ko" }) {
  const frame = useCurrentFrame();
  const s = frame < at ? 0 : pop(frame, at, 240, 12);
  const color = lang === "uz" ? UZ : KO;
  return (
    <div style={{ transform: `scale(${0.6 + 0.4 * s})`, opacity: clamp01(s * 3), display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <div style={{ fontFamily: lang === "ko" ? KO_FONT : HEAVY, fontWeight: 900, fontSize: 46, color: "#fff", opacity: 0.85 }}>{lang === "ko" ? "엄마 · 입력 중…" : `${who} yozmoqda…`}</div>
      <div style={{ background: GLASS, borderRadius: 60, padding: "40px 56px", display: "flex", gap: 26, boxShadow: `0 0 0 8px ${color}55, 0 22px 60px rgba(0,0,0,0.35)` }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 44, height: 44, borderRadius: 22, background: color, transform: `translateY(${Math.sin((frame - at) / 4 - i * 0.9) * -16}px)` }} />
        ))}
      </div>
    </div>
  );
}

function Scene({ range, children }: { range: readonly [number, number]; children: ReactNode }) {
  const frame = useCurrentFrame();
  const [from, to] = range;
  if (frame < from - 1 || frame >= to + 7) return null;
  const enter = from === 0 ? 1 : ease(clamp01((frame - from) / 7));
  const exit = ease(clamp01((frame - to) / 7));
  const y = (1 - enter) * 1920 * 0.35 - exit * 1920 * 0.35;
  const blur = (1 - enter) * 16 + exit * 16;
  const push = 1 + 0.03 * clamp01((frame - from) / Math.max(1, to - from));
  return <AbsoluteFill style={{ transform: `translateY(${-y}px) scale(${push})`, opacity: Math.min(enter, 1 - exit), filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>{children}</AbsoluteFill>;
}

/** 밤의 잠금화면 — 천천히 떠다니는 빛망울 */
function LockScreen() {
  const frame = useCurrentFrame();
  const wake = interpolate(frame, [0, 6], [0.25, 1], { extrapolateRight: "clamp" });
  const blobs = [
    { x: 200, y: 420, r: 520, c: "rgba(120,90,255,0.35)", sp: 90 },
    { x: 860, y: 900, r: 600, c: "rgba(255,90,140,0.25)", sp: 120 },
    { x: 300, y: 1500, r: 560, c: "rgba(40,190,210,0.22)", sp: 100 },
  ];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(170deg, #12142F 0%, #251F55 50%, #4A2A5C 100%)", opacity: wake }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x - b.r / 2 + Math.sin(frame / b.sp + i) * 60,
            top: b.y - b.r / 2 + Math.cos(frame / b.sp + i * 2) * 50,
            width: b.r,
            height: b.r,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

// ── 자막 ──
type Chunk = { words: { w: string; at: number }[] };
const CHUNKS: Record<string, Chunk[]> = {};
for (const key of VOICES) {
  const out: Chunk[] = [];
  let cur: Chunk = { words: [] };
  for (const w of timing.voice[key].words) {
    cur.words.push({ w: w.w, at: T[key].at + Math.round(w.s * FPS) });
    if (/[,.:?…—]$/.test(w.w) || cur.words.length >= 4) {
      out.push(cur);
      cur = { words: [] };
    }
  }
  if (cur.words.length) out.push(cur);
  CHUNKS[key] = out;
}

function Captions() {
  const frame = useCurrentFrame();
  const voice = VOICES.find((k) => frame >= T[k].at - 2 && frame < T[k].at + T[k].len + 4);
  if (voice) {
    const chunks = CHUNKS[voice];
    const chunk = [...chunks].reverse().find((c) => frame >= c.words[0].at - 2) ?? chunks[0];
    const enter = pop(frame, chunk.words[0].at - 2, 300, 16);
    const current = [...chunk.words].reverse().find((w) => frame >= w.at);
    return (
      <div style={{ position: "absolute", top: 1370, left: 50, right: 50, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", transform: `translateY(${(1 - enter) * 40}px)` }}>
        {chunk.words.map((w) => (
          <span
            key={`${w.at}-${w.w}`}
            style={{
              fontFamily: HEAVY,
              fontWeight: 900,
              fontSize: 64,
              color: w === current ? INK : "#fff",
              opacity: frame >= w.at ? 1 : 0.35,
              padding: "2px 12px",
              borderRadius: 14,
              background: w === current ? YELLOW : "transparent",
              transform: w === current ? "rotate(-1.5deg)" : undefined,
              textShadow: w === current ? undefined : "0 3px 12px rgba(0,0,0,0.4)",
            }}
          >
            {w.w}
          </span>
        ))}
      </div>
    );
  }
  const clip = CLIPS.find((k) => frame >= T[k].at - 2 && frame < T[k].at + T[k].len + 6);
  if (clip) {
    const { text, lang } = CLIP_TEXT[clip];
    const s = pop(frame, T[clip].at - 2, 300, 16);
    const label = clip.startsWith("m") ? "OʻZBEK ONA" : clip.startsWith("k0") && clip in lines.koMom ? "KOREYS ONA" : "KOREYSCHA";
    return (
      <div style={{ position: "absolute", top: 1350, left: 0, right: 0, textAlign: "center", transform: `scale(${0.8 + 0.2 * s})`, opacity: clamp01(s * 3) }}>
        <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 28, letterSpacing: 6, color: lang === "uz" ? UZ : KO }}>{label}</div>
        <div style={{ fontFamily: lang === "ko" ? KO_FONT : HEAVY, fontWeight: 900, fontSize: 76, color: "#fff", marginTop: 4, textShadow: "0 3px 14px rgba(0,0,0,0.45)" }}>{text}</div>
      </div>
    );
  }
  return null;
}

function ReasonCounter() {
  const frame = useCurrentFrame();
  if (frame < T.v03.at - 4 || frame >= T.v11.at) return null;
  const fills = [T.v03.at, T.v05.at, T.v09.at];
  const show = pop(frame, T.v03.at - 4, 240, 14);
  return (
    <div style={{ position: "absolute", top: 128, right: 64, display: "flex", alignItems: "center", gap: 12, transform: `translateX(${(1 - show) * 400}px)` }}>
      {fills.map((at, i) => {
        const on = frame >= at;
        const s = on ? pop(frame, at, 320, 10) : 0;
        return (
          <div
            key={at}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              border: "5px solid #fff",
              background: on ? YELLOW : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: HEAVY,
              fontWeight: 900,
              fontSize: 28,
              color: on ? INK : "#fff",
              transform: `scale(${on ? 0.7 + 0.3 * s : 0.85})`,
              opacity: on ? 1 : 0.4,
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
}

// ── 장면들 ──
function Hook() {
  const frame = useCurrentFrame();
  const colon = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.35;
  return (
    <>
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", color: "#fff", fontFamily: '"Segoe UI", sans-serif' }}>
        <div style={{ fontSize: 210, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          23<span style={{ opacity: colon }}>:</span>47
        </div>
      </div>
      <Stack gap={30} top={520}>
        <Note at={2} from="Oyijon" kick={[T.m01.at]} lang="uz" size={66} text="Ovqat yedingmi?" />
        <Note at={T.k01.at - 3} from="엄마" kick={[T.k01.at]} lang="ko" size={66} sub="= Ovqat yedingmi?" text="밥 먹었어?" />
      </Stack>
    </>
  );
}

function Lead() {
  const calls = T.v02.at + 2;
  const title = word("v02", "Koreyadagi");
  const proof = word("v02", "uchta");
  const worst = word("v02", "Uchinchisi");
  const frame = useCurrentFrame();
  const shake = frame >= worst ? Math.sin((frame - worst) * 1.8) * Math.exp(-(frame - worst) / 10) * 10 : 0;
  return (
    <>
      <Stack top={170}>
        <Note at={calls} from="Oyijon" lang="uz" size={50} text="12 ta oʻtkazib yuborilgan qoʻngʻiroq" />
      </Stack>
      <Stack gap={8} top={470}>
        <Pop at={title}>
          <Chip bg={UZ} fg="#fff" size={96}>
            OʻZBEK ONA
          </Chip>
        </Pop>
        <Pop at={title + 8} from={2.5}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 110, color: "#fff", lineHeight: 1 }}>=</div>
        </Pop>
        <Pop at={word("v02", "onalaridek")} rot={-2}>
          <Chip bg={KO} fg="#fff" size={96}>
            KOREYS ONA
          </Chip>
        </Pop>
      </Stack>
      <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 26 }}>
        {[1, 2, 3].map((n, i) => (
          <Pop at={proof + i * 4} from={0.2} key={n}>
            <div style={{ transform: n === 3 ? `rotate(${shake}deg)` : undefined }}>
              <Chip bg={n === 3 && frame >= worst ? KO : YELLOW} fg={n === 3 && frame >= worst ? "#fff" : INK} size={80}>
                {n}
              </Chip>
            </div>
          </Pop>
        ))}
        <Pop at={proof + 14}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 64, color: "#fff", marginTop: 14 }}>TA GAP</div>
        </Pop>
      </div>
    </>
  );
}

function Body1() {
  const salom = word("v03", "salom");
  return (
    <>
      <Header at={T.v03.at} n={1} text="OVQAT" />
      <Stack gap={26} top={290}>
        <Note at={T.v03.at + 2} from="Oyijon" lang="uz" size={56} text="Ovqat yedingmi?" />
        <Note at={T.v03.at + 8} from="엄마" lang="ko" size={56} text="밥 먹었어?" />
      </Stack>
      <Stack gap={22} top={760}>
        <Pop at={salom} rot={-3}>
          <Chip bg="#fff" size={58}>
            Koreyada bu — <span style={{ background: YELLOW, padding: "0 12px", borderRadius: 12 }}>SALOM</span>
          </Chip>
        </Pop>
        <Note at={T.k02.at - 3} from="Hamkasb" kick={[T.k02.at]} lang="ko" size={60} sub="= Assalomu alaykum!" text="식사하셨어요?" />
      </Stack>
    </>
  );
}

function Loop({ at, n, who, lang, tease }: { at: number; n: number; who: string; lang: "uz" | "ko"; tease: string }) {
  const frame = useCurrentFrame();
  const wobble = Math.sin((frame - at) / 6) * 6;
  return (
    <>
      <Stack top={330}>
        <Pop at={at} from={0.2}>
          <div style={{ transform: `rotate(${wobble}deg)` }}>
            <Chip size={240} style={{ borderRadius: 70, padding: "10px 90px", boxShadow: "0 30px 0 #C99A06" }}>
              {n}
            </Chip>
          </div>
        </Pop>
      </Stack>
      <Stack top={800}>
        <Typing at={at + 6} lang={lang} who={who} />
      </Stack>
      <Stack top={1180}>
        <Pop at={at + 16} rot={-2}>
          <Chip size={56}>{tease}</Chip>
        </Pop>
      </Stack>
    </>
  );
}

function Loop1() {
  return <Loop at={T.v04.at} lang="uz" n={2} tease="KULIB YUBORASIZ…" who="Oyijon" />;
}
function Loop2() {
  return <Loop at={T.v08.at} lang="ko" n={3} tease="HAR BIR TOʻYDA…" who="엄마" />;
}

function Body2() {
  const frame = useCurrentFrame();
  const word3 = word("v06", "maxsus");
  const merge = T.k04.at - 6;
  const parts = [
    { full: "엄마", head: "엄" },
    { full: "친구", head: "친" },
    { full: "아들", head: "아" },
  ];
  const m = ease(clamp01((frame - merge) / 10));
  const stamp = word("v07", "onamning");
  const cardsOut = clamp01((frame - word3) / 8);
  return (
    <>
      <Header at={T.v05.at} n={2} text="QOʻSHNINING BOLASI" />
      <div style={{ opacity: 1 - cardsOut * 0.85, transform: `translateY(${-cardsOut * 40}px)` }}>
        <Stack gap={26} top={280}>
          <Note at={T.m02.at - 3} from="Oyijon" kick={[T.m02.at]} lang="uz" size={56} text="Qoʻshnining oʻgʻliga qara!" />
          <Note at={T.k03.at - 3} from="엄마" kick={[T.k03.at]} lang="ko" size={52} sub="= Dugonamning oʻgʻli 1-oʻrin olibdi!" text="엄마 친구 아들은 1등 했대!" />
        </Stack>
      </div>
      {/* 엄마 · 친구 · 아들 → 엄친아 */}
      <div style={{ position: "absolute", top: 800, left: 0, right: 0, display: "flex", justifyContent: "center", gap: interpolate(m, [0, 1], [40, 0]) }}>
        {parts.map((p, i) => (
          <Pop at={word3 + i * 4} from={0.3} key={p.full}>
            <div style={{ display: "flex", alignItems: "center", background: KO, borderRadius: 30, padding: "18px 26px", boxShadow: `0 12px 0 ${KO_DARK}`, fontFamily: KO_FONT, fontWeight: 900, fontSize: 96, color: "#fff", lineHeight: 1.05 }}>
              <span style={{ background: frame >= merge - 10 ? YELLOW : "transparent", color: frame >= merge - 10 ? INK : "#fff", borderRadius: 14, padding: "0 8px" }}>{p.head}</span>
              <span style={{ display: "inline-block", maxWidth: interpolate(m, [0, 1], [120, 0]), overflow: "hidden", opacity: 1 - m }}>{p.full.slice(1)}</span>
            </div>
          </Pop>
        ))}
      </div>
      <Stack gap={18} top={1010}>
        <Pop at={merge + 10} from={2}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 40, color: "#fff", opacity: 0.75, letterSpacing: 4 }}>[ omchina ]</div>
        </Pop>
        <Pop at={stamp} rot={-4}>
          <Chip size={50}>onamning dugonasining oʻgʻli</Chip>
        </Pop>
        <Pop at={stamp + 14} rot={3}>
          <Chip bg="#fff" size={44}>
            hamma narsada 1-oʻrin
          </Chip>
        </Pop>
      </Stack>
    </>
  );
}

function Body3() {
  const frame = useCurrentFrame();
  const holiday = word("v10", "Sollal");
  const chusok = word("v10", "Chusokda.");
  const repeats = [word("v10", "har"), word("v10", "soʻrashadi"), chusok + 6];
  return (
    <>
      <Header at={T.v09.at} n={3} text="TOʻY" />
      <Stack gap={26} top={280}>
        <Note at={T.m03.at - 3} from="Oyijon" kick={[T.m03.at]} lang="uz" size={66} text="Toʻy qachon?" />
        <Note at={T.k05.at - 3} from="엄마" kick={[T.k05.at]} lang="ko" size={66} sub="= Toʻy qachon?" text="결혼 언제 해?" />
      </Stack>
      {/* 명절마다 또 — 같은 알림이 겹겹이 */}
      <div style={{ position: "absolute", top: 800, left: 0, right: 0, height: 360 }}>
        {repeats.map((at, i) => (
          <div key={at} style={{ position: "absolute", left: 75 + i * 22, top: i * 72, transform: `rotate(${(i - 1) * 2}deg)` }}>
            <Note at={at} from="엄마" lang="ko" size={48} solid text="결혼 언제 해?" />
          </div>
        ))}
        {frame >= repeats[0] ? (
          <div style={{ position: "absolute", right: 60, top: -30, transform: `scale(${pop(frame, repeats.findLast((t) => frame >= t) ?? repeats[0], 360, 10)})` }}>
            <div style={{ width: 92, height: 92, borderRadius: 46, background: KO, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontWeight: 900, fontSize: 48, border: "6px solid #fff" }}>
              {repeats.filter((t) => frame >= t).length}
            </div>
          </div>
        ) : null}
      </div>
      <div style={{ position: "absolute", top: 1180, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24 }}>
        <Pop at={holiday} rot={-3}>
          <Chip bg="#fff" size={50}>
            설날 · Sollal
          </Chip>
        </Pop>
        <Pop at={chusok} rot={3}>
          <Chip bg="#fff" size={50}>
            추석 · Chusok
          </Chip>
        </Pop>
      </div>
    </>
  );
}

function Ask() {
  const frame = useCurrentFrame();
  const uzAt = word("v11", "oʻzbek");
  const koAt = word("v11", "koreys");
  const write = word("v11", "Izohga");
  const kick = (t: number) => (frame >= t ? Math.exp(-(frame - t) / 5) : 0);
  return (
    <>
      <Stack top={300}>
        <Pop at={T.v11.at} from={0.6}>
          <div style={{ width: 900, background: GLASS, borderRadius: 44, padding: "50px 56px", textAlign: "center", fontFamily: HEAVY, fontWeight: 900, fontSize: 86, lineHeight: 1.1, color: INK, boxShadow: "0 22px 60px rgba(0,0,0,0.35)" }}>
            Kimning onasi <span style={{ background: YELLOW, padding: "0 14px", borderRadius: 14 }}>kuchliroq?</span>
          </div>
        </Pop>
      </Stack>
      <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 36 }}>
        <Pop at={uzAt} from={0.3}>
          <div style={{ transform: `scale(${1 + 0.15 * kick(uzAt)})` }}>
            <Chip bg={UZ} fg="#fff" size={84} style={{ boxShadow: `0 14px 0 ${UZ_DARK}` }}>
              OʻZBEK ONA
            </Chip>
          </div>
        </Pop>
      </div>
      <div style={{ position: "absolute", top: 930, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Pop at={koAt} from={0.3}>
          <div style={{ transform: `scale(${1 + 0.15 * kick(koAt)})` }}>
            <Chip bg={KO} fg="#fff" size={84} style={{ boxShadow: `0 14px 0 ${KO_DARK}` }}>
              KOREYS ONA
            </Chip>
          </div>
        </Pop>
      </div>
      <Stack top={1130}>
        <Pop at={write}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: HEAVY, fontWeight: 900, fontSize: 50, color: "#fff" }}>
            <Icon color="#fff" name="chat" size={56} />
            IZOHGA YOZING
          </div>
        </Pop>
      </Stack>
    </>
  );
}

function Send() {
  const frame = useCurrentFrame();
  const quote = word("v12", "toʻy");
  const friend = word("v12", "doʻstingizga");
  const go = word("v12", "yuboring.");
  const fly = interpolate(frame, [go, go + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const press = frame >= go ? Math.exp(-(frame - go) / 5) : 0;
  return (
    <>
      <Stack gap={22} top={210}>
        <Pop at={T.v12.at}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 58, color: "#fff", opacity: 0.85 }}>Buni onasi hali ham</div>
        </Pop>
        <Note at={quote - 4} from="Oyijon" lang="uz" size={64} text="Toʻy qachon?" />
        <Pop at={quote + 12}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 58, color: "#fff", opacity: 0.85 }}>deb soʻraydigan</div>
        </Pop>
      </Stack>
      <div style={{ position: "absolute", top: 760, left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 900, fontSize: 124, lineHeight: 1.04, color: "#fff", letterSpacing: -4 }}>
        <Pop at={friend} from={2}>
          <span style={{ background: YELLOW, color: INK, padding: "0 22px", borderRadius: 20 }}>DOʻSTINGIZGA</span>
        </Pop>
        <Pop at={go} from={2}>
          <span>YUBORING</span>
        </Pop>
      </div>
      <Stack top={1080}>
        <Pop at={friend + 4} from={0.3}>
          <div style={{ width: 200, height: 200, borderRadius: 100, background: UZ, boxShadow: `0 14px 0 ${UZ_DARK}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - 0.12 * press})` }}>
            <div style={{ transform: `translate(${fly * 700}px, ${fly * -900}px) rotate(${fly * -20}deg) scale(${1 + fly * 0.6})` }}>
              <Icon color="#fff" name="plane" size={112} />
            </div>
          </div>
        </Pop>
      </Stack>
    </>
  );
}

function End() {
  const at = T.end.at;
  return (
    <>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
        <Pop at={at}>
          <Chip size={52}>KORIO</Chip>
        </Pop>
        <Pop at={at + 4}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 48, color: "#fff" }}>Iboralar oʻzbek tilida</div>
        </Pop>
      </div>
      <Stack top={220}>
        <Pop at={at + 2} from={0.7}>
          <div style={{ width: 460, height: 1027, borderRadius: 58, background: "#0B0A16", padding: 16, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 46, overflow: "hidden" }}>
              <Sequence from={at} layout="none">
                <OffthreadVideo muted src={staticFile("clips/expressionLearn.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Sequence>
            </div>
          </div>
        </Pop>
      </Stack>
      <div style={{ position: "absolute", top: 1285, left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 900, color: "#fff" }}>
        <Pop at={at + 8}>
          <div style={{ fontSize: 48 }}>
            Android: <span style={{ color: YELLOW }}>Google Play</span>
          </div>
        </Pop>
        <Pop at={at + 12}>
          <div style={{ fontSize: 48, marginTop: 10 }}>
            iPhone: <span style={{ color: YELLOW }}>Telegram @KorioLoginBot</span>
          </div>
        </Pop>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
          <Pop at={at + 20} rot={-2}>
            <Chip size={58}>Saqlab qoʻying</Chip>
          </Pop>
        </div>
      </div>
    </>
  );
}

// ── 소리 ──
function Sfx({ at, src, volume = 0.5 }: { at: number; src: string; volume?: number }) {
  return (
    <Sequence from={Math.max(0, at)} layout="none">
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  );
}

function Sounds() {
  const ding = "ai/tutorial/ona/sfx-ding.mp3";
  const buzz = "ai/tutorial/ona/sfx-buzz.mp3";
  const tick = "sfx/select.wav";
  const whoosh = "ai/tutorial/sfx-whoosh.mp3";
  const repeats = [word("v10", "har"), word("v10", "soʻrashadi"), word("v10", "Chusokda.") + 6];
  const hits: { at: number; src: string; volume?: number }[] = [
    { at: 2, src: ding, volume: 0.7 },
    { at: 2, src: buzz, volume: 0.5 },
    { at: T.k01.at - 3, src: ding, volume: 0.7 },
    { at: T.v02.at + 2, src: buzz, volume: 0.6 },
    { at: word("v02", "Koreyadagi"), src: tick, volume: 0.35 },
    { at: word("v02", "onalaridek"), src: tick, volume: 0.35 },
    ...[0, 4, 8].map((d) => ({ at: word("v02", "uchta") + d, src: tick, volume: 0.35 })),
    { at: word("v02", "Uchinchisi"), src: "sfx/wrong.wav", volume: 0.35 },
    { at: T.v03.at + 2, src: ding, volume: 0.5 },
    { at: T.v03.at + 8, src: ding, volume: 0.5 },
    { at: word("v03", "salom"), src: "ai/tutorial/sfx-slap.mp3", volume: 0.6 },
    { at: T.k02.at - 3, src: ding, volume: 0.6 },
    { at: T.m02.at - 3, src: ding, volume: 0.6 },
    { at: T.k03.at - 3, src: ding, volume: 0.6 },
    ...[0, 4, 8].map((d) => ({ at: word("v06", "maxsus") + d, src: tick, volume: 0.35 })),
    { at: T.k04.at - 6, src: "sfx/combo.wav", volume: 0.4 },
    { at: word("v07", "onamning"), src: "ai/tutorial/sfx-slap.mp3", volume: 0.5 },
    { at: T.m03.at - 3, src: ding, volume: 0.6 },
    { at: T.k05.at - 3, src: ding, volume: 0.6 },
    ...repeats.flatMap((at) => [
      { at, src: ding, volume: 0.6 },
      { at, src: buzz, volume: 0.4 },
    ]),
    { at: word("v11", "oʻzbek"), src: tick, volume: 0.4 },
    { at: word("v11", "koreys"), src: tick, volume: 0.4 },
    { at: word("v12", "toʻy") - 4, src: ding, volume: 0.55 },
    { at: word("v12", "yuboring."), src: whoosh, volume: 0.6 },
    { at: T.end.at + 2, src: "sfx/correct.wav", volume: 0.35 },
    ...Object.values(SCENES)
      .map(([from]) => from)
      .filter((from) => from > 0)
      .map((at) => ({ at: at - 2, src: whoosh, volume: 0.3 })),
  ];
  return (
    <>
      <Audio loop src={staticFile("ai/tutorial/music.mp3")} volume={(f) => interpolate(f, [0, 10, ONA_TOTAL - 30, ONA_TOTAL], [0, 0.09, 0.09, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {[...VOICES, ...CLIPS].map((k) => (
        <Sequence from={T[k].at} key={k} layout="none">
          <Audio src={staticFile(`ai/tutorial/ona/${k}.mp3`)} />
        </Sequence>
      ))}
      {hits.map((h, i) => (
        <Sfx key={`${h.src}-${h.at}-${i}`} {...h} />
      ))}
    </>
  );
}

export function OnaReel() {
  useIconFont();
  return (
    <AbsoluteFill style={{ background: "#12142F", overflow: "hidden" }}>
      <LockScreen />
      <Scene range={SCENES.hook}>
        <Hook />
      </Scene>
      <Scene range={SCENES.lead}>
        <Lead />
      </Scene>
      <Scene range={SCENES.body1}>
        <Body1 />
      </Scene>
      <Scene range={SCENES.loop1}>
        <Loop1 />
      </Scene>
      <Scene range={SCENES.body2}>
        <Body2 />
      </Scene>
      <Scene range={SCENES.loop2}>
        <Loop2 />
      </Scene>
      <Scene range={SCENES.body3}>
        <Body3 />
      </Scene>
      <Scene range={SCENES.ask}>
        <Ask />
      </Scene>
      <Scene range={SCENES.send}>
        <Send />
      </Scene>
      <Scene range={SCENES.end}>
        <End />
      </Scene>
      <ReasonCounter />
      <Captions />
      <Sounds />
    </AbsoluteFill>
  );
}
