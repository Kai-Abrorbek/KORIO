/**
 * "Oʻzbekcha = koreyscha?" — 우즈벡어와 한국어는 어순 · 붙이는 말 · 높임말이 닮았다 (약 58초)
 *
 * 8블록 (reels 규칙): Hook → Lead(10초까지) → Body1 어순 → Open loop → Body2 붙이는 말 → Open loop → Body3 높임말
 *   → CTA (논쟁 질문 HA/YOʻQ + "koreys tili juda qiyin deydigan doʻstingizga yuboring" + 앱 문법 화면)
 * 화면 문법(이 편 것): 크림색 종이 + 흐르는 점 격자, 언어마다 색 하나 — 우즈벡어 청록 · 한국어 빨강 · 영어 회색 · 붙이는 말 노랑 키캡 타일.
 * 말하는 단어는 전부 아래 자막에 나오고, 지금 단어에 형광펜이 켜진다.
 *
 * 소리: 안내 Sarah(우즈벡어) s-*.mp3 · 한국어 문장 t-k*.mp3 — src/ozbek/make-timing.mjs 가 단어 시각을 ozbek.words.json 으로 만든다.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Icon, useIconFont } from "../theme";
import { HEAVY, KO as KO_FONT } from "../tutorial/kit";
import lines from "./ozbek.lines.json";
import timing from "./ozbek.words.json";

const FPS = 30;
const CREAM = "#F6F0E4";
const INK = "#1D1B33";
const YELLOW = "#FFD43B";
const COLORS = {
  uz: { bg: "#0A9EC0", edge: "#06718A", fg: "#FFFFFF" },
  ko: { bg: "#D62839", edge: "#981A28", fg: "#FFFFFF" },
  en: { bg: "#9AA0A6", edge: "#6B7076", fg: "#FFFFFF" },
  chip: { bg: YELLOW, edge: "#C99A06", fg: INK },
  ink: { bg: INK, edge: "#000000", fg: "#FFFFFF" },
} as const;
type Lang = keyof typeof COLORS;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const pop = (frame: number, at: number, stiffness = 260, damping = 12) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}ʻ']/gu, "");

// ── 타임라인: 대사 · 한국어 문장 · 말 없는 박자를 차례로 (gap = 앞과의 틈, 프레임) ──
type VoiceKey = keyof typeof timing.voice;
type AppKey = keyof typeof timing.app;
const ORDER: { key: string; gap: number; pause?: number }[] = [
  { key: "v01", gap: 2 }, // Hook
  { key: "k01", gap: 2 },
  { key: "v02", gap: 4 }, // Lead — 10초까지
  { key: "v03", gap: 6 }, // Body 1 어순
  { key: "k02", gap: 2 },
  { key: "eng", gap: 2, pause: 34 }, // 영어는 순서가 다르다 (말 없이 화면으로)
  { key: "v05", gap: 3 }, // Open loop 1
  { key: "v06", gap: 4 }, // Body 2 붙이는 말
  { key: "k03", gap: 2 },
  { key: "v07", gap: 4 }, // Open loop 2
  { key: "v08", gap: 4 }, // Body 3 높임말
  { key: "k04", gap: 2 },
  { key: "k05", gap: 4 },
  { key: "v09", gap: 3 },
  { key: "v10", gap: 6 }, // CTA — 논쟁 질문
  { key: "v11", gap: 4 }, // 콕 집은 보내기
  { key: "end", gap: 22, pause: 62 }, // 보내기 화면을 잠깐 더 두고 → 앱 화면 · 받는 곳 · 저장
];
const T: Record<string, { at: number; len: number }> = {};
{
  let cursor = 0;
  for (const step of ORDER) {
    const at = cursor + step.gap;
    const seconds = step.key.startsWith("v") ? timing.voice[step.key as VoiceKey].len : step.key.startsWith("k") ? timing.app[step.key as AppKey] : 0;
    const len = step.pause ?? Math.round(seconds * FPS);
    T[step.key] = { at, len };
    cursor = at + len;
  }
}
export const OZBEK_TOTAL = T.end.at + T.end.len;
const VOICES = ORDER.filter((s) => s.key.startsWith("v")).map((s) => s.key as VoiceKey);
const APPS = ORDER.filter((s) => s.key.startsWith("k")).map((s) => s.key as AppKey);

/** 대사 key 에서 그 단어가 시작하는 영상 프레임 */
function word(key: VoiceKey, text: string) {
  const w = timing.voice[key].words.find((x) => norm(x.w) === norm(text));
  if (!w) throw new Error(`${key}: no word "${text}"`);
  return T[key].at + Math.round(w.s * FPS);
}
/** 한국어 문장 key 의 i 번째(n 개 중) 단어 — 길이를 고르게 나눈다 */
const kAt = (key: AppKey, i: number, n: number) => T[key].at + Math.round((T[key].len * i) / n);

// 블록 경계 (장면)
const SCENES = {
  hook: [0, T.v02.at],
  lead: [T.v02.at, T.v03.at],
  body1: [T.v03.at, T.v05.at],
  loop1: [T.v05.at, T.v06.at],
  body2: [T.v06.at, T.v07.at],
  loop2: [T.v07.at, T.v08.at],
  body3: [T.v08.at, T.v10.at],
  ask: [T.v10.at, T.v11.at],
  send: [T.v11.at, T.end.at],
  end: [T.end.at, OZBEK_TOTAL],
} as const;

// ── 부품 ──
function Tile({ text, lang, size = 76, ko = false, style }: { text: string; lang: Lang; size?: number; ko?: boolean; style?: CSSProperties }) {
  const c = COLORS[lang];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${size * 0.2}px ${size * 0.34}px ${size * 0.24}px`,
        borderRadius: size * 0.28,
        background: c.bg,
        color: c.fg,
        fontFamily: ko ? KO_FONT : HEAVY,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: ko ? 0 : -1,
        whiteSpace: "nowrap",
        boxShadow: `0 ${size * 0.13}px 0 ${c.edge}, 0 ${size * 0.3}px ${size * 0.45}px rgba(40,25,70,0.18)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
}

/** 위에서 떨어져 통 튄다 */
function Drop({ at, children, dist = 240 }: { at: number; children: ReactNode; dist?: number }) {
  const frame = useCurrentFrame();
  if (frame < at) return <div style={{ opacity: 0 }}>{children}</div>;
  const s = pop(frame, at, 300, 11);
  return <div style={{ transform: `translateY(${(1 - s) * -dist}px) scale(${0.85 + 0.15 * s})`, opacity: clamp01(s * 4) }}>{children}</div>;
}

/** 아래에서 뒤집혀 올라온다 (한국어 줄) */
function FlipIn({ at, children }: { at: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < at) return <div style={{ opacity: 0 }}>{children}</div>;
  const s = pop(frame, at, 220, 13);
  return <div style={{ transform: `perspective(900px) rotateX(${(1 - s) * -100}deg)`, transformOrigin: "50% 0%", opacity: clamp01(s * 3) }}>{children}</div>;
}

/** 크게 나타나 쾅 */
function Pop({ at, children, from = 1.6, rot = 0, style }: { at: number; children: ReactNode; from?: number; rot?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const s = frame < at ? 0 : pop(frame, at, 320, 14);
  return <div style={{ transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${rot * s}deg)`, opacity: clamp01(s * 3), ...style }}>{children}</div>;
}

/** 소리 나는 순간 톡 커진다 */
function Bounce({ times, children }: { times: number[]; children: ReactNode }) {
  const frame = useCurrentFrame();
  const kick = times.reduce((m, t) => (frame >= t ? Math.max(m, Math.exp(-(frame - t) / 4)) : m), 0);
  return <div style={{ transform: `scale(${1 + 0.14 * kick})` }}>{children}</div>;
}

/** 붙이는 말 칩이 오른쪽에서 날아와 착 붙는다 */
function Snap({ at, children }: { at: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < at) return <div style={{ opacity: 0 }}>{children}</div>;
  const s = pop(frame, at, 340, 12);
  return <div style={{ transform: `translateX(${(1 - s) * 160}px) rotate(${(1 - s) * 18}deg)`, opacity: clamp01(s * 4) }}>{children}</div>;
}

/** 위아래 칸을 잇는 점선 (아래 칸 기준) */
function Link({ at, height = 58 }: { at: number; height?: number }) {
  const frame = useCurrentFrame();
  const d = clamp01((frame - at) / 8);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: -height - 8,
        width: 0,
        height,
        borderLeft: `6px dotted ${INK}`,
        opacity: 0.45 * d,
        transform: `translateX(-3px) scaleY(${d})`,
        transformOrigin: "50% 0%",
      }}
    />
  );
}

/** 굵은 마커 줄 — 그려진다 */
function Strike({ at, width, top, left, rot = -6, color = INK }: { at: number; width: number; top: number; left: number; rot?: number; color?: string }) {
  const frame = useCurrentFrame();
  const d = interpolate(frame, [at, at + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return <div style={{ position: "absolute", top, left, width: width * d, height: 20, borderRadius: 10, background: color, transform: `rotate(${rot}deg)`, transformOrigin: "0% 50%" }} />;
}

function Smallcaps({ children, color = INK, style }: { children: ReactNode; color?: string; style?: CSSProperties }) {
  return <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 30, letterSpacing: 6, color, opacity: 0.6, ...style }}>{children}</div>;
}

function Header({ n, text, at }: { n: number; text: string; at: number }) {
  const frame = useCurrentFrame();
  const s = frame < at ? 0 : pop(frame, at, 260, 14);
  return (
    <div style={{ position: "absolute", top: 130, left: 60, transform: `translateX(${(1 - s) * -500}px)`, display: "flex", alignItems: "center", gap: 18 }}>
      <Tile lang="chip" size={58} text={String(n)} />
      <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 58, color: INK, letterSpacing: -1 }}>{text}</div>
    </div>
  );
}

function Center({ top, children, gap = 26 }: { top: number; children: ReactNode; gap?: number }) {
  return <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap }}>{children}</div>;
}

/** 장면 — 오른쪽에서 휙 들어와 왼쪽으로 휙 나간다. 안에서 아주 천천히 다가간다 */
function Scene({ range, children }: { range: readonly [number, number]; children: ReactNode }) {
  const frame = useCurrentFrame();
  const [from, to] = range;
  if (frame < from - 1 || frame >= to + 7) return null;
  const enter = from === 0 ? 1 : ease(clamp01((frame - from) / 7));
  const exit = ease(clamp01((frame - to) / 7));
  const x = (1 - enter) * 1080 - exit * 1080;
  const blur = (1 - enter) * 16 + exit * 16;
  const push = 1 + 0.035 * clamp01((frame - from) / Math.max(1, to - from));
  return <AbsoluteFill style={{ transform: `translateX(${x}px) scale(${push})`, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>{children}</AbsoluteFill>;
}

function Background() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(29,27,51,0.16) 3px, transparent 3.5px)",
          backgroundSize: "54px 54px",
          backgroundPosition: `${frame * 0.6}px ${frame * 0.35}px`,
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(120,90,40,0.14) 100%)" }} />
    </AbsoluteFill>
  );
}

// ── 자막: 말하는 단어를 4개 안팎 묶음으로, 지금 단어에 형광펜 ──
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
      <div style={{ position: "absolute", top: 1360, left: 50, right: 50, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", transform: `translateY(${(1 - enter) * 40}px)` }}>
        {chunk.words.map((w) => (
          <span
            key={`${w.at}-${w.w}`}
            style={{
              fontFamily: HEAVY,
              fontWeight: 900,
              fontSize: 66,
              color: INK,
              opacity: frame >= w.at ? 1 : 0.28,
              padding: "2px 12px",
              borderRadius: 14,
              background: w === current ? YELLOW : "transparent",
              transform: w === current ? "rotate(-1.5deg)" : undefined,
            }}
          >
            {w.w}
          </span>
        ))}
      </div>
    );
  }
  const app = APPS.find((k) => frame >= T[k].at - 2 && frame < T[k].at + T[k].len + 6);
  if (app) {
    const s = pop(frame, T[app].at - 2, 300, 16);
    return (
      <div style={{ position: "absolute", top: 1340, left: 0, right: 0, textAlign: "center", transform: `scale(${0.8 + 0.2 * s})`, opacity: clamp01(s * 3) }}>
        <Smallcaps color={COLORS.ko.bg} style={{ opacity: 1, fontSize: 28 }}>
          KOREYSCHA
        </Smallcaps>
        <div style={{ fontFamily: KO_FONT, fontWeight: 900, fontSize: 80, color: COLORS.ko.bg, marginTop: 6 }}>{lines.app[app]}</div>
      </div>
    );
  }
  return null;
}

/** 오른쪽 위 — 이유 세 개 중 몇 번째인지 */
function ReasonCounter() {
  const frame = useCurrentFrame();
  if (frame < T.v03.at - 4 || frame >= T.v10.at) return null;
  const fills = [T.v03.at, T.v06.at, T.v08.at];
  const show = pop(frame, T.v03.at - 4, 240, 14);
  return (
    <div style={{ position: "absolute", top: 136, right: 60, display: "flex", alignItems: "center", gap: 12, transform: `translateX(${(1 - show) * 400}px)` }}>
      <Smallcaps style={{ fontSize: 26, marginRight: 4 }}>SABAB</Smallcaps>
      {fills.map((at, i) => {
        const on = frame >= at;
        const s = on ? pop(frame, at, 320, 10) : 0;
        return (
          <div
            key={at}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              border: `5px solid ${INK}`,
              background: on ? YELLOW : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: HEAVY,
              fontWeight: 900,
              fontSize: 30,
              color: INK,
              transform: `scale(${on ? 0.7 + 0.3 * s : 0.85})`,
              opacity: on ? 1 : 0.35,
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
  const flip = word("v01", "koreyschami?") - 4;
  const uz = ["Men", "kitobni", "oʻqiyman"];
  const ko = ["저는", "책을", "읽어요"];
  return (
    <>
      <div style={{ position: "absolute", top: 210, left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 900, letterSpacing: -2 }}>
        <Pop at={-6}>
          <span style={{ fontSize: 118, color: COLORS.uz.bg }}>OʻZBEKCHA</span>
        </Pop>
        <Pop at={flip} rot={-2}>
          <span style={{ fontSize: 118, color: INK }}>= </span>
          <span style={{ fontSize: 118, color: COLORS.ko.bg }}>KOREYSCHA?</span>
        </Pop>
      </div>
      <Center top={640}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", columnGap: 20, rowGap: 80, justifyItems: "center" }}>
          {uz.map((t, i) => (
            <Drop at={-8 + i * 3} key={t}>
              <Tile lang="uz" size={70} text={t} />
            </Drop>
          ))}
          {ko.map((t, i) => (
            <div key={t} style={{ position: "relative" }}>
              <Link at={flip + i * 4 + 6} height={66} />
              <FlipIn at={flip + i * 4}>
                <Bounce times={[kAt("k01", i, 3)]}>
                  <Tile ko lang="ko" size={70} text={t} />
                </Bounce>
              </FlipIn>
            </div>
          ))}
        </div>
      </Center>
    </>
  );
}

function Lead() {
  const frame = useCurrentFrame();
  const chatter = word("v02", "Hamma");
  const qiyin = word("v02", "qiyin");
  const uzbek = word("v02", "oʻzbek");
  const strike = word("v02", "unchalik");
  const mana = word("v02", "Mana");
  const bubbles = [
    { t: "Qiyin!", x: 90, y: 330, r: -8 },
    { t: "Juda qiyin…", x: 640, y: 300, r: 6 },
    { t: "Qiyin-ku!", x: 700, y: 760, r: -4 },
  ];
  const fade = clamp01((frame - uzbek) / 6);
  return (
    <>
      {bubbles.map((b, i) => (
        <div key={b.t} style={{ position: "absolute", left: b.x, top: b.y, opacity: 1 - fade }}>
          <Pop at={chatter + i * 4} from={0.3} rot={b.r}>
            <div style={{ background: "#fff", border: `5px solid ${INK}`, borderRadius: 30, padding: "16px 28px", fontFamily: HEAVY, fontWeight: 900, fontSize: 48, color: INK, boxShadow: `0 8px 0 ${INK}` }}>{b.t}</div>
          </Pop>
        </div>
      ))}
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative" }}>
          <Pop at={qiyin - 3} from={2.2} rot={-5}>
            <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 210, color: COLORS.ko.bg, letterSpacing: -6, lineHeight: 1 }}>QIYIN?</div>
          </Pop>
          <Strike at={strike} left={-30} top={118} width={700} rot={-8} />
        </div>
      </div>
      <Center top={830}>
        <Pop at={uzbek}>
          <Tile lang="uz" size={72} text="OʻZBEKLAR UCHUN" />
        </Pop>
      </Center>
      <Center top={990}>
        <Pop at={strike + 2}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 92, color: INK, letterSpacing: -2 }}>UNCHALIK EMAS</div>
        </Pop>
      </Center>
      <Center gap={30} top={1140}>
        {[1, 2, 3].map((n, i) => (
          <Pop at={mana + 4 + i * 4} from={0.2} key={n}>
            <Tile lang="chip" size={92} text={String(n)} />
          </Pop>
        ))}
        <Pop at={mana + 16}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 64, color: INK }}>SABAB</div>
        </Pop>
      </Center>
    </>
  );
}

function Body1() {
  const frame = useCurrentFrame();
  const uzAt = [word("v03", "Men,"), word("v03", "maktabga,"), word("v03", "boraman.")];
  const koAt = word("v03", "Koreyschada");
  const cols = [
    { label: "KIM?", uz: "Men", ko: "저는" },
    { label: "QAYERGA?", uz: "maktabga", ko: "학교에" },
    { label: "NIMA QILADI?", uz: "boraman", ko: "가요" },
  ];
  const eng = T.eng.at;
  const en = [
    { t: "I", n: 1 },
    { t: "go", n: 3 },
    { t: "to school", n: 2 },
  ];
  return (
    <>
      <Header at={T.v03.at} n={1} text="SOʻZ TARTIBI" />
      <Center top={330}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", columnGap: 28, rowGap: 26, justifyItems: "center" }}>
          {cols.map((c, i) => (
            <Pop at={uzAt[i]} from={0.4} key={c.label}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: INK, color: "#fff", fontFamily: HEAVY, fontWeight: 900, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                <Smallcaps style={{ fontSize: 26, letterSpacing: 3, opacity: 0.7 }}>{c.label}</Smallcaps>
              </div>
            </Pop>
          ))}
          {cols.map((c, i) => (
            <Drop at={uzAt[i]} key={c.uz}>
              <Tile lang="uz" size={72} text={c.uz} />
            </Drop>
          ))}
          {cols.map((c, i) => (
            <div key={c.ko} style={{ position: "relative", marginTop: 50 }}>
              <Link at={koAt + i * 4 + 6} height={52} />
              <FlipIn at={koAt + i * 4}>
                <Bounce times={[kAt("k02", i, 3)]}>
                  <Tile ko lang="ko" size={72} text={c.ko} />
                </Bounce>
              </FlipIn>
            </div>
          ))}
        </div>
      </Center>
      <Center top={830}>
        <Pop at={koAt + 14}>
          <div style={{ display: "flex", gap: 34, fontFamily: HEAVY, fontWeight: 900, fontSize: 34, color: INK, opacity: 0.75 }}>
            <span style={{ color: COLORS.uz.bg }}>OʻZBEKCHA</span>
            <span>=</span>
            <span style={{ color: COLORS.ko.bg }}>KOREYSCHA</span>
          </div>
        </Pop>
      </Center>
      {/* 영어는 순서가 다르다 */}
      <Center gap={28} top={950}>
        {en.map((e, i) => (
          <div key={e.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <Drop at={eng + i * 3}>
              <Tile lang="en" size={66} text={e.t} />
            </Drop>
            <Pop at={eng + 10 + i * 2} from={0.3}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: e.n === i + 1 ? INK : COLORS.ko.bg,
                  color: "#fff",
                  fontFamily: HEAVY,
                  fontWeight: 900,
                  fontSize: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {e.n}
              </div>
            </Pop>
          </div>
        ))}
      </Center>
      <Center top={1200}>
        <Pop at={eng + 14} rot={-3}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 54, color: "#fff", background: COLORS.ko.bg, padding: "10px 26px", borderRadius: 16, opacity: frame >= eng + 14 ? 1 : 0 }}>INGLIZCHA — TARTIB BOSHQA</div>
        </Pop>
      </Center>
    </>
  );
}

function Loop({ n, at, tease }: { n: number; at: number; tease: ReactNode }) {
  const frame = useCurrentFrame();
  const wobble = Math.sin((frame - at) / 6) * 7;
  return (
    <>
      <Center top={380}>
        <Pop at={at} from={0.2}>
          <div style={{ transform: `rotate(${wobble}deg)` }}>
            <Tile lang="chip" size={330} text={String(n)} />
          </div>
        </Pop>
      </Center>
      {tease}
    </>
  );
}

function Loop1() {
  return (
    <Loop
      at={T.v05.at}
      n={2}
      tease={
        <Center top={1010}>
          <Pop at={word("v05", "bundan")} rot={-2}>
            <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 72, color: INK, background: YELLOW, padding: "8px 28px", borderRadius: 18 }}>BUNDAN HAM QIZIQ…</div>
          </Pop>
        </Center>
      }
    />
  );
}

function Loop2() {
  const strike = word("v07", "umuman");
  return (
    <Loop
      at={T.v07.at}
      n={3}
      tease={
        <div style={{ position: "absolute", top: 1020, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <Pop at={word("v07", "ingliz")}>
              <Tile lang="en" size={90} text="INGLIZCHA" />
            </Pop>
            <Strike at={strike} color={COLORS.ko.bg} left={-20} top={20} width={560} rot={14} />
            <Strike at={strike + 4} color={COLORS.ko.bg} left={-20} top={110} width={560} rot={-14} />
          </div>
        </div>
      }
    />
  );
}

function Body2() {
  const stems = word("v06", "Biz");
  const chips = [word("v06", "kitobni,"), word("v06", "maktabga,"), word("v06", "uyda.")];
  const koStem = word("v06", "Koreyslar");
  const rows = [
    { uz: "kitob", uzc: "ni", ko: "책", koc: "을" },
    { uz: "maktab", uzc: "ga", ko: "학교", koc: "에" },
    { uz: "uy", uzc: "da", ko: "집", koc: "에서" },
  ];
  return (
    <>
      <Header at={T.v06.at} n={2} text="QOʻSHIMCHALAR" />
      <Center top={360}>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", columnGap: 30, rowGap: 78, alignItems: "center", justifyItems: "center" }}>
          <Smallcaps color={COLORS.uz.bg} style={{ opacity: 1 }}>
            OʻZBEKCHA
          </Smallcaps>
          <div />
          <Smallcaps color={COLORS.ko.bg} style={{ opacity: 1 }}>
            KOREYSCHA
          </Smallcaps>
          {rows.map((r, i) => {
            const koChip = kAt("k03", i, 3);
            return [
              <div key={`u${i}`} style={{ display: "flex", alignItems: "center" }}>
                <Drop at={stems + i * 4}>
                  <Tile lang="uz" size={84} text={r.uz} />
                </Drop>
                <div style={{ marginLeft: -10 }}>
                  <Snap at={chips[i]}>
                    <Tile lang="chip" size={84} text={`-${r.uzc}`} />
                  </Snap>
                </div>
              </div>,
              <Pop at={koChip} from={2} key={`e${i}`}>
                <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 70, color: INK }}>=</div>
              </Pop>,
              <div key={`k${i}`} style={{ display: "flex", alignItems: "center" }}>
                <FlipIn at={koStem + i * 4}>
                  <Tile ko lang="ko" size={84} text={r.ko} />
                </FlipIn>
                <div style={{ marginLeft: -10 }}>
                  <Snap at={koChip}>
                    <Tile ko lang="chip" size={84} text={r.koc} />
                  </Snap>
                </div>
              </div>,
            ];
          })}
        </div>
      </Center>
    </>
  );
}

function Card({ at, label, children }: { at: number; label: string; children: ReactNode }) {
  return (
    <Pop at={at} from={0.5}>
      <div style={{ width: 440, height: 600, background: "#fff", border: `6px solid ${INK}`, borderRadius: 40, boxShadow: `0 12px 0 ${INK}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 50, gap: 56 }}>
        <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 52, color: INK }}>{label}</div>
        {children}
      </div>
    </Pop>
  );
}

function Body3() {
  const frame = useCurrentFrame();
  const kel = word("v08", "kel,");
  const keling = word("v08", "keling.");
  const koreys = word("v08", "Koreys");
  const come = word("v09", "hammaga");
  const draw = interpolate(frame, [come + 4, come + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <>
      <Header at={T.v08.at} n={3} text="HURMAT" />
      <Center gap={40} top={300}>
        <Card at={word("v08", "Doʻstga")} label="DOʻSTGA">
          <Drop at={kel}>
            <Tile lang="uz" size={84} text="Kel" />
          </Drop>
          <FlipIn at={koreys}>
            <Bounce times={[T.k04.at]}>
              <Tile ko lang="ko" size={84} text="와" />
            </Bounce>
          </FlipIn>
        </Card>
        <Card at={word("v08", "kattaga")} label="KATTAGA">
          <Drop at={keling}>
            <Tile lang="uz" size={84} text="Keling" />
          </Drop>
          <FlipIn at={koreys + 5}>
            <Bounce times={[T.k05.at]}>
              <Tile ko lang="ko" size={84} text="오세요" />
            </Bounce>
          </FlipIn>
        </Card>
      </Center>
      <svg height={1920} style={{ position: "absolute", inset: 0 }} viewBox="0 0 1080 1920" width={1080}>
        {[300, 780].map((x) => (
          <line key={x} stroke={INK} strokeDasharray="4 16" strokeLinecap="round" strokeWidth={8} x1={540} x2={540 + (x - 540) * draw} y1={1060} y2={1060 - 140 * draw} opacity={0.5 * draw} />
        ))}
      </svg>
      <Center top={1060}>
        <Drop at={come}>
          <Tile lang="en" size={84} text="Come" />
        </Drop>
      </Center>
      <Center top={1200}>
        <Pop at={come + 10}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 44, color: INK, opacity: 0.75 }}>INGLIZCHA — HAMMAGA BITTA SOʻZ</div>
        </Pop>
      </Center>
    </>
  );
}

function Ask() {
  const frame = useCurrentFrame();
  const btn = word("v10", "Izohga");
  const ha = word("v10", "ha");
  const yoq = word("v10", "yoʻq.");
  const kick = (t: number) => (frame >= t ? Math.exp(-(frame - t) / 5) : 0);
  return (
    <>
      <Center top={300}>
        <Pop at={T.v10.at} from={0.6}>
          <div style={{ width: 900, background: "#fff", border: `6px solid ${INK}`, borderRadius: 44, boxShadow: `0 14px 0 ${INK}`, padding: "60px 56px", textAlign: "center", fontFamily: HEAVY, fontWeight: 900, fontSize: 82, lineHeight: 1.12, color: INK, letterSpacing: -1 }}>
            Koreys tili <span style={{ color: COLORS.uz.bg }}>oʻzbeklar</span> uchun <span style={{ color: COLORS.en.edge }}>ingliz tilidan</span>{" "}
            <span style={{ background: YELLOW, padding: "0 14px", borderRadius: 14 }}>osonmi?</span>
          </div>
        </Pop>
      </Center>
      <Center top={890}>
        <Pop at={btn}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: HEAVY, fontWeight: 900, fontSize: 46, color: INK }}>
            <Icon color={INK} name="chat" size={54} />
            IZOHGA YOZING
          </div>
        </Pop>
      </Center>
      <Center gap={44} top={1000}>
        <Pop at={btn + 3} from={0.3}>
          <div style={{ transform: `scale(${1 + 0.18 * kick(ha)})` }}>
            <Tile lang="uz" size={120} text="HA" />
          </div>
        </Pop>
        <Pop at={btn + 6} from={0.3}>
          <div style={{ transform: `scale(${1 + 0.18 * kick(yoq)})` }}>
            <Tile lang="ko" size={120} text="YOʻQ" />
          </div>
        </Pop>
      </Center>
    </>
  );
}

function Send() {
  const frame = useCurrentFrame();
  const quote = word("v11", "koreys");
  const friend = word("v11", "doʻstingizga");
  const go = word("v11", "yuboring.");
  const fly = interpolate(frame, [go, go + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const press = frame >= go ? Math.exp(-(frame - go) / 5) : 0;
  return (
    <>
      <Center top={250}>
        <Pop at={T.v11.at}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 64, color: INK, opacity: 0.8 }}>Buni</div>
        </Pop>
      </Center>
      <Center top={380}>
        <Pop at={quote} rot={-2}>
          <Tile lang="ink" size={78} text="„Koreys tili juda qiyin“" />
        </Pop>
      </Center>
      <Center top={560}>
        <Pop at={quote + 10}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 64, color: INK, opacity: 0.8 }}>deydigan</div>
        </Pop>
      </Center>
      <div style={{ position: "absolute", top: 690, left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 900, fontSize: 132, lineHeight: 1.02, color: INK, letterSpacing: -4 }}>
        <Pop at={friend} from={2}>
          <span style={{ background: YELLOW, padding: "0 22px", borderRadius: 20 }}>DOʻSTINGIZGA</span>
        </Pop>
        <Pop at={go} from={2}>
          <span>YUBORING</span>
        </Pop>
      </div>
      {/* 보내기 버튼 → 종이비행기가 날아간다 */}
      <Center top={1010}>
        <Pop at={friend + 4} from={0.3}>
          <div style={{ width: 210, height: 210, borderRadius: 105, background: COLORS.uz.bg, boxShadow: `0 14px 0 ${COLORS.uz.edge}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - 0.12 * press})` }}>
            <div style={{ transform: `translate(${fly * 700}px, ${fly * -900}px) rotate(${fly * -20}deg) scale(${1 + fly * 0.6})` }}>
              <Icon color="#fff" name="plane" size={120} />
            </div>
          </div>
        </Pop>
      </Center>
    </>
  );
}

function End() {
  const at = T.end.at;
  return (
    <>
      <Center gap={20} top={120}>
        <Pop at={at}>
          <Tile lang="chip" size={56} text="KORIO" />
        </Pop>
        <Pop at={at + 4}>
          <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 52, color: INK }}>Grammatika oʻzbek tilida</div>
        </Pop>
      </Center>
      <Center top={225}>
        <Pop at={at + 2} from={0.7}>
          <div style={{ width: 460, height: 1027, borderRadius: 58, background: INK, padding: 16, boxShadow: "0 30px 60px rgba(40,25,70,0.3)" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 50, overflow: "hidden", position: "relative" }}>
              <Sequence from={at} layout="none">
                <OffthreadVideo muted src={staticFile("clips/grammarStudy.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Sequence>
            </div>
          </div>
        </Pop>
      </Center>
      <div style={{ position: "absolute", top: 1285, left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 900, color: INK }}>
        <Pop at={at + 8}>
          <div style={{ fontSize: 50 }}>
            Android: <span style={{ color: COLORS.uz.bg }}>Google Play</span>
          </div>
        </Pop>
        <Pop at={at + 12}>
          <div style={{ fontSize: 50, marginTop: 10 }}>
            iPhone: <span style={{ color: COLORS.uz.bg }}>Telegram @KorioLoginBot</span>
          </div>
        </Pop>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
          <Pop at={at + 20} rot={-2}>
            <Tile lang="chip" size={62} text="Saqlab qoʻying" />
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
  const tick = "sfx/select.wav";
  const whoosh = "ai/tutorial/sfx-whoosh.mp3";
  const hits: { at: number; src: string; volume?: number }[] = [
    ...[0, 3, 6].map((at) => ({ at, src: tick, volume: 0.35 })),
    { at: word("v01", "koreyschami?") - 4, src: "sfx/click.wav", volume: 0.5 },
    { at: word("v02", "qiyin") - 3, src: "ai/tutorial/sfx-slap.mp3", volume: 0.7 },
    { at: word("v02", "unchalik"), src: "ai/tutorial/sfx-marker.mp3", volume: 0.6 },
    ...[0, 4, 8].map((d) => ({ at: word("v02", "Mana") + 4 + d, src: tick, volume: 0.35 })),
    ...["Men,", "maktabga,", "boraman."].map((w) => ({ at: word("v03", w), src: tick, volume: 0.35 })),
    { at: word("v03", "Koreyschada"), src: "sfx/click.wav", volume: 0.45 },
    { at: T.eng.at + 12, src: "sfx/wrong.wav", volume: 0.45 },
    ...["kitobni,", "maktabga,", "uyda."].map((w) => ({ at: word("v06", w), src: "sfx/click.wav", volume: 0.45 })),
    ...[0, 1, 2].map((i) => ({ at: kAt("k03", i, 3), src: "sfx/click.wav", volume: 0.45 })),
    { at: kAt("k03", 2, 3) + 6, src: "sfx/correct.wav", volume: 0.4 },
    { at: word("v07", "umuman"), src: "ai/tutorial/sfx-marker.mp3", volume: 0.6 },
    { at: word("v08", "kel,"), src: tick, volume: 0.35 },
    { at: word("v08", "keling."), src: tick, volume: 0.35 },
    { at: word("v09", "hammaga"), src: tick, volume: 0.4 },
    { at: word("v10", "Izohga") + 3, src: tick, volume: 0.35 },
    { at: word("v11", "yuboring."), src: whoosh, volume: 0.6 },
    { at: T.end.at + 2, src: "sfx/combo.wav", volume: 0.35 },
    // 장면이 바뀔 때마다 휙
    ...Object.values(SCENES)
      .map(([from]) => from)
      .filter((from) => from > 0)
      .map((at) => ({ at: at - 2, src: whoosh, volume: 0.35 })),
  ];
  return (
    <>
      <Audio loop src={staticFile("ai/tutorial/music.mp3")} volume={(f) => interpolate(f, [0, 10, OZBEK_TOTAL - 30, OZBEK_TOTAL], [0, 0.1, 0.1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {VOICES.map((k) => (
        <Sequence from={T[k].at} key={k} layout="none">
          <Audio src={staticFile(`ai/tutorial/ozbek/s-${k}.mp3`)} />
        </Sequence>
      ))}
      {APPS.map((k) => (
        <Sequence from={T[k].at} key={k} layout="none">
          <Audio src={staticFile(`ai/tutorial/ozbek/t-${k}.mp3`)} />
        </Sequence>
      ))}
      {hits.map((h, i) => (
        <Sfx key={`${h.src}-${h.at}-${i}`} {...h} />
      ))}
    </>
  );
}

export function OzbekKoreys() {
  useIconFont();
  return (
    <AbsoluteFill style={{ background: CREAM, overflow: "hidden" }}>
      <Background />
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
