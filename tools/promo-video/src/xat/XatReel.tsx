/**
 * "Xat" — 한국에서 4년 10개월 일한 아빠가 아는 한국어는 세 마디. 식당 아주머니의 편지를 3년 뒤 딸이 읽어 준다 (약 86초)
 *
 * 8블록 (reels 규칙): Hook(4 yil 10 oy | 3 ta so‘z) → Lead(질문, 10초) → Body1 공장 → Open loop("1년 동안 한마디도") → Body2 편지
 *   → Open loop("읽어 준 사람은 나") → Body3 KORIO 로 배워 편지를 읽음 → CTA(어떤 말은 몇 년을 기다린다 + 앱 + 보내기)
 * 화면 문법(이 편 것, 참고 계정의 느낌만): 사용자가 ChatGPT 로 그린 수채화풍 그림 19장(public/ai/xat/x01–x19.webp)에
 *   천천히 다가가는 카메라 · 부드러운 겹침 전환 · 세리프 자막 · 핵심 숫자만 크게 · 편지는 궁서체 손글씨.
 * 소리: audio/make-lines.mjs 가 만든 대사(xat.words.json) · ElevenLabs 음악 4토막(m1–m4) · 현장음.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import timing from "./xat.words.json";

const FPS = 30;
const SERIF = 'Georgia, "Times New Roman", "Malgun Gothic", serif';
const BRUSH = '"Gungsuh", "궁서", "Batang", "Malgun Gothic", serif';
const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const WARM = "#FFD98A";
const INK = "#1E1712";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.45, 0, 0.25, 1);
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}ʻʼ']/gu, "");
/** Georgia 에는 ‘(U+02BB)가 없어 간격이 틀어진다 — 화면에는 ‘ ’ 로 찍는다 */
const uz = (s: string) => s.replace(/ʻ/g, "‘").replace(/ʼ/g, "’");
const img =(n: string) => staticFile(`ai/xat/${n}.webp`);

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

// ── 장면(그림) 순서: [그림, 시작 프레임] — 다음 장면 시작까지 보이고, 12프레임 겹쳐 바뀐다 ──
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

/** 수채화 한 장 — 천천히 다가가며(Ken Burns) 들어오고 나갈 때 겹친다 */
function Still({ shot, next }: { shot: Shot; next: number }) {
  const frame = useCurrentFrame();
  if (frame < shot.at - 1 || frame >= next + 12) return null;
  const t = clamp01((frame - shot.at) / Math.max(1, next + 12 - shot.at));
  const [z0, z1] = shot.zoom ?? [1, 1.08];
  const [px, py] = shot.pan ?? [0, 0];
  const z = interpolate(ease(t), [0, 1], [z0, z1]);
  const fadeIn = shot.at === 0 ? 1 : clamp01((frame - shot.at) / 12);
  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <AbsoluteFill style={{ transform: `scale(${z}) translate(${px * t}px, ${py * t}px)` }}>
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

// ── 글자 부품 ──
function FadeText({ at, out, children, style, rise = 18 }: { at: number; out?: number; children: ReactNode; style?: CSSProperties; rise?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 10)) return null;
  const s = spring({ frame: frame - at, fps: FPS, config: { damping: 20, stiffness: 120 } });
  const o = out !== undefined ? 1 - clamp01((frame - out) / 10) : 1;
  return <div style={{ opacity: Math.min(1, s * 1.5) * o, transform: `translateY(${(1 - s) * rise}px)`, ...style }}>{children}</div>;
}

const shadow = "0 2px 18px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.7)";

/** 손글씨처럼 한 글자씩 써진다 */
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

// ── Hook: 화면 반 갈라 — 공장의 아빠 | 빈 수첩에 써지는 세 단어 ──
function Hook() {
  const frame = useCurrentFrame();
  if (frame >= T.n04.at + 6) return null;
  const q = T.n03.at;
  const dim = interpolate(frame, [q - 4, q + 8], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const push = interpolate(frame, [0, q + 30], [1.06, 1.0], { extrapolateRight: "clamp" });
  const words = [
    { k: "d01", t: "네", m: "ha" },
    { k: "d02", t: "감사합니다", m: "rahmat" },
    { k: "d03", t: "죄송합니다", m: "kechirasiz" },
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: 1920, overflow: "hidden" }}>
        <Img src={img("x01")} style={{ position: "absolute", left: -270, top: 0, width: 1080, height: 1920, objectFit: "cover", transform: `scale(${push})` }} />
      </div>
      <div style={{ position: "absolute", left: 540, top: 0, width: 540, height: 1920, overflow: "hidden" }}>
        <Img src={img("x02")} style={{ position: "absolute", left: -270, top: 0, width: 1080, height: 1920, objectFit: "cover", transform: `scale(${push})` }} />
        {/* 수첩 왼쪽 면에 세 단어가 써진다 */}
        <div style={{ position: "absolute", left: 120, top: 940, width: 300, display: "flex", flexDirection: "column", gap: 26, transform: "rotate(-3deg)" }}>
          {words.map((w) => (
            <Written at={T[w.k].at - 2} key={w.k} speed={4} style={{ fontFamily: BRUSH, fontSize: 52, color: "#3A2A1C", lineHeight: 1 }} text={w.t} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 538, top: 0, width: 4, height: 1920, background: "rgba(255,240,215,0.85)" }} />
      {/* 숫자 두 개 — 참고 영상처럼 크게 */}
      <FadeText at={0} style={{ position: "absolute", left: 0, width: 540, top: 330, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 34, letterSpacing: 6, opacity: 0.85 }}>KOREYADA</div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>4 yil</div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>10 oy</div>
      </FadeText>
      <FadeText at={word("n02", "uchta") - 4} style={{ position: "absolute", left: 540, width: 540, top: 330, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 34, letterSpacing: 6, opacity: 0.85 }}>BILGAN SO‘ZI</div>
        <div style={{ fontSize: 150, fontWeight: 700, lineHeight: 1, color: WARM }}>3</div>
      </FadeText>
      <AbsoluteFill style={{ background: `rgba(8,5,3,${dim})` }} />
      <FadeText at={q} out={T.n04.at - 4} style={{ position: "absolute", left: 70, right: 70, top: 720, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.15 }}>
          Nega dadam 5 yilda <span style={{ color: WARM }}>3 ta so‘zdan</span> nariga o‘tmadi?
        </div>
      </FadeText>
    </AbsoluteFill>
  );
}

// ── 장면 위 글자 ──
function Overlays() {
  return (
    <>
      <FadeText at={word("n04", "Kuniga")} out={word("n04", "Kechasi") - 6} style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1 }}>12 soat</div>
        <div style={{ fontSize: 40, letterSpacing: 4, opacity: 0.85, marginTop: 8 }}>har kuni</div>
      </FadeText>
      <FadeText at={word("n07", "Bir")} out={end("n07") + 4} style={{ position: "absolute", left: 0, right: 0, top: 280, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1 }}>1 yil</div>
        <div style={{ fontSize: 44, marginTop: 10, opacity: 0.9 }}>bir og‘iz ham so‘z yo‘q</div>
      </FadeText>
      <FadeText at={word("n10", "uch")} out={end("n11") + 6} style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1 }}>3 yil</div>
        <div style={{ fontSize: 42, marginTop: 10, opacity: 0.9 }}>o‘qilmagan xat</div>
      </FadeText>
      <FadeText at={word("n12", "Korio")} out={word("n12", "har") - 4} style={{ position: "absolute", left: 60, top: 300, fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 44, letterSpacing: 3, opacity: 0.85 }}>har kuni</div>
        <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1 }}>10 daqiqa</div>
      </FadeText>
      {/* 편지 — 궁서체로 써지고, 우즈벡어 뜻이 아래에 */}
      <FadeText at={T.r01.at - 4} out={end("n15") + 8} style={{ position: "absolute", left: 90, right: 90, top: 300, textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(250,240,220,0.92)", borderRadius: 10, padding: "40px 54px", boxShadow: "0 18px 50px rgba(0,0,0,0.45)", transform: "rotate(-1.5deg)" }}>
          <div style={{ fontFamily: BRUSH, fontSize: 70, color: INK, lineHeight: 1.35 }}>
            <Written at={T.r01.at} speed={4} text="아들 같았어요." />
            <br />
            <Written at={T.r01.at + 34} speed={4} text="건강하세요." />
          </div>
          <FadeText at={T.n14.at} style={{ fontFamily: SERIF, fontSize: 42, color: "#5A4632", marginTop: 22, fontStyle: "italic" }}>
            O‘g‘limdek edingiz. Sog‘ bo‘ling.
          </FadeText>
        </div>
      </FadeText>
      {/* 마무리 문장 */}
      <FadeText at={T.n16.at} out={end("n16") + 20} style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.15 }}>Ba’zi so‘zlar yillab kutadi.</div>
        <FadeText at={word("n16", "Kutib")} style={{ fontSize: 78, fontWeight: 700, color: WARM, marginTop: 18 }}>
          Kutib qolmang.
        </FadeText>
      </FadeText>
    </>
  );
}

// ── 자막: 세리프 한 줄, 지금 단어만 따뜻한 색 / 한국어 대사는 한국어 + 뜻 ──
const KO_MEANING: Record<string, string> = {
  d01: "Ha.",
  d02: "Rahmat.",
  d03: "Kechirasiz.",
  f01: "Bu emas! Qaytadan qil!",
  d04: "Ha… kechirasiz.",
  d05: "Rahmat…",
  r01: "O‘g‘limdek edingiz. Sog‘ bo‘ling.",
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
    if (/[,.:?…—]$/.test(w.w) || cur.words.length >= 5) {
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
  if (!key || ["d01", "d02", "d03", "r01", "n14", "n16"].includes(key)) return null;
  const box: CSSProperties = { position: "absolute", left: 60, right: 60, top: 1370, textAlign: "center", textShadow: shadow };
  if (CHUNKS[key]) {
    const chunks = CHUNKS[key];
    const chunk = [...chunks].reverse().find((c) => frame >= c.words[0].at - 3) ?? chunks[0];
    const current = [...chunk.words].reverse().find((w) => frame >= w.at);
    return (
      <div style={{ ...box, fontFamily: SERIF, fontSize: 54, lineHeight: 1.3, color: "#fff" }}>
        {chunk.words.map((w, i) => (
          <span key={`${w.at}-${i}`} style={{ color: w === current ? WARM : "#fff", opacity: frame >= w.at ? 1 : 0.45 }}>
            {uz(w.w)}
            {i < chunk.words.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    );
  }
  const text = (timing.lines[key] as { text: string }).text;
  return (
    <div style={box}>
      <div style={{ fontFamily: KO, fontWeight: 700, fontSize: 56, color: "#fff" }}>{text}</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 40, color: WARM, marginTop: 6 }}>{KO_MEANING[key]}</div>
    </div>
  );
}

// ── 끝 화면: 앱 · 받는 곳 · 보내기 ──
function EndCard() {
  const frame = useCurrentFrame();
  const at = T.n17.at - 14;
  if (frame < at) return null;
  const fade = clamp01((frame - at) / 14);
  return (
    <AbsoluteFill style={{ opacity: fade, background: "radial-gradient(ellipse at 50% 30%, #4A3424 0%, #1C130D 70%)" }}>
      <FadeText at={at + 4} style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", fontFamily: SERIF, color: "#fff" }}>
        <div style={{ fontSize: 40, letterSpacing: 8, opacity: 0.8 }}>KORIO</div>
        <div style={{ fontSize: 50, fontWeight: 700, marginTop: 8 }}>Koreys tili — o‘zbek tilida</div>
      </FadeText>
      <div style={{ position: "absolute", left: (1080 - 400) / 2, top: 330, width: 400, height: 866, borderRadius: 52, background: "#0B0A10", padding: 14, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 40, overflow: "hidden" }}>
          <Sequence from={at} layout="none">
            <OffthreadVideo muted src={staticFile("clips/hangul.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        </div>
      </div>
      <FadeText at={T.n17.at} style={{ position: "absolute", left: 60, right: 60, top: 1240, textAlign: "center", fontFamily: SERIF, color: "#fff" }}>
        <div style={{ fontSize: 50, lineHeight: 1.25 }}>
          Buni Koreyada ishlayotgan <span style={{ color: WARM, fontWeight: 700 }}>yaqiningizga yuboring</span>
        </div>
      </FadeText>
      <FadeText at={T.n17.at + 30} style={{ position: "absolute", left: 0, right: 0, top: 1420, textAlign: "center", fontFamily: SERIF, color: "#fff" }}>
        <div style={{ fontSize: 38 }}>
          Android: <b>Google Play</b> · iPhone: <b>Telegram @KorioLoginBot</b>
        </div>
      </FadeText>
    </AbsoluteFill>
  );
}

// ── 소리 ──
function Bed({ src, from, to, volume, fade = 45 }: { src: string; from: number; to: number; volume: number; fade?: number }) {
  return (
    <Sequence durationInFrames={to - from} from={from} layout="none">
      <Audio
        loop
        src={staticFile(src)}
        volume={(f) => volume * Math.min(clamp01(f / fade), clamp01((to - from - f) / fade))}
      />
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
  return (
    <>
      {music.map((m) => (
        <Bed fade={45} from={m.from} key={m.src} src={m.src} to={m.to} volume={m.v} />
      ))}
      {/* 포옹 장면에서 음악을 잠깐 올린다 */}
      <Bed fade={20} from={T.hug.at} src="ai/xat/m3.mp3" to={T.hug.at + T.hug.len + 10} volume={0.12} />
      <Bed from={0} src="ai/xat/sfx-factory.mp3" to={T.n06.at} volume={0.1} />
      <Bed from={T.n06.at - 8} src="ai/xat/sfx-canteen.mp3" to={T.n08.at} volume={0.12} />
      <Bed from={T.n08.at - 10} src="ai/xat/sfx-snow.mp3" to={T.n10.at} volume={0.16} />
      <Bed from={T.n12.at - 10} src="ai/xat/sfx-bus.mp3" to={word("n12", "har")} volume={0.1} />
      <Sequence from={word("n13", "ochdim.") - 6} layout="none">
        <Audio src={staticFile("ai/xat/sfx-paper.mp3")} volume={0.7} />
      </Sequence>
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
      <Hook />
      <Vignette />
      <Overlays />
      <Subtitles />
      <EndCard />
      <Sounds />
    </AbsoluteFill>
  );
}
