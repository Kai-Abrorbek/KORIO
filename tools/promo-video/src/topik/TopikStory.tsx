/**
 * TOPIK 편 — "하루 10시간 일하는 사람은 TOPIK 을 어떻게 준비할까?" (약 70초).
 * 실제 장소 영상(Pexels: 공장 · 버스 · 길 · 직장 · 밤 책상 · 노을) 위에 실제 앱 녹화를 얹고, 내레이션이 하루를 따라간다.
 * 앱에 들어가는 길로 시작 → 버스: 기출 + 단계별 힌트 → 길: 듣기 → 쉬는 시간: 오답 → 저녁: 모의고사 · 유형 통계 → 쓰기(빠르게)
 * → 오늘 모은 시간 25 + 15 + 5 + 45 = 90분 → "Imtihon — 15-noyabrda".
 *
 * 재료: public/ai/topik/stock (장소 영상 · phone-key.webm = 휴대폰 화면 색을 뺀 것), public/ai/topik/sfx (현장음 · 음악),
 *       public/ai/tutorial/topik (내레이션 — audio/make-guide-audio.mjs), public/clips/topik*.mp4 (앱 녹화 — capture/)
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import corners from "./phone-corners.json";
import subs from "./topik.subs.json";
import voice from "./topik.voice.json";

const FPS = 30;
const W = 1080;
const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const BODY = '"Segoe UI Semibold", "Segoe UI", sans-serif';
const PURPLE = "#6A55F5";
const PINK = "#FF5FA2";
const GREEN = "#3DE07F";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (f: number, at: number, d: number) => clamp01((f - at) / d);
const pop = (f: number, at: number, stiffness = 240, damping = 14) => spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const sec = (s: number) => Math.round(s * FPS);

// ───────────────────────────── 시간표 — 내레이션 줄마다 길이 + 여유
type Line = keyof typeof voice;
const ORDER: Line[] = ["n01", "n02", "n03", "n04", "n05", "n06", "n07", "n08", "n09", "n10", "n11", "n12", "n13"];
const PAD: Record<Line, number> = { n01: 6, n02: 8, n03: 10, n04: 6, n05: 14, n06: 6, n07: 10, n08: 8, n09: 6, n10: 10, n11: 8, n12: 14, n13: 80 };
const START = {} as Record<Line, number>;
let cursor = 6;
for (const line of ORDER) {
  START[line] = cursor;
  cursor += sec(voice[line]) + PAD[line];
}
export const TOPIK_TOTAL = cursor;
const at = (line: Line, s = 0) => START[line] + sec(s);
/** 손에 든 휴대폰 (n02 "Javob — choʻntagida" 부터 n03 시작까지) */
const HAND = at("n02", 2.95);
/** 장소가 바뀔 때 크게 뜨는 시각 · 장소 (그동안은 휴대폰 없이 장소 영상만) */
const INTRO = 26;

// ───────────────────────────── 녹화 이어 붙이기: [a, b] = a..b 재생, [f, -n] = f 를 n 프레임 멈춤
type Op = [number, number];
const opLen = (op: Op) => (op[1] < 0 ? -op[1] : op[1] - op[0]);
function recFrame(ops: Op[], local: number) {
  let t = Math.max(0, local);
  for (const op of ops) {
    const len = opLen(op);
    if (t < len) return op[1] < 0 ? op[0] : op[0] + t;
    t -= len;
  }
  const last = ops[ops.length - 1];
  return last[1] < 0 ? last[0] : last[1] - 1;
}
/** 녹화 프레임 rec 가 처음 나오는 지점 */
function whenRec(ops: Op[], rec: number) {
  let t = 0;
  for (const op of ops) {
    if (op[1] >= 0 && rec >= op[0] && rec < op[1]) return t + rec - op[0];
    t += opLen(op);
  }
  return null;
}

type Shot = {
  from: number;
  to: number;
  clip: string;
  ops: Op[];
  bg: string;
  bgStart: number;
  /** 누르는 곳 — 녹화 프레임, 앱 css px (390×844) */
  taps?: [number, number, number][];
};
const SHOTS: Shot[] = [
  {
    // 홈 → Yoʻnalish → TOPIK → TOPIK II → Oʻqish
    from: START.n03,
    to: START.n04,
    clip: "topikTour",
    ops: [[10, -52], [10, 28], [28, 70], [70, 100], [100, -12], [100, 112], [112, 160], [160, -10]],
    bg: "phone",
    bgStart: 120,
    taps: [[28, 338, 405], [70, 104, 625], [112, 195, 697], [157, 195, 400]],
  },
  {
    // 버스: 회차 목록(실제 기출) 열기 · 넘겨 보기
    from: START.n04 + INTRO,
    to: START.n05,
    clip: "topikTour",
    ops: [[178, 295]],
    bg: "bus",
    bgStart: 0,
    taps: [[199, 300, 196]],
  },
  {
    // 버스: 해설 학습 — 1 · 2단계 힌트 → 답 → 풀이
    from: START.n05,
    to: START.n06,
    clip: "topikTour",
    ops: [[295, 322], [345, 352], [352, -29], [352, 385], [385, 439], [439, 499], [499, 550]],
    bg: "bus",
    bgStart: 45,
    taps: [[321, 195, 803]],
  },
  {
    // 길: 듣기 — 재생 중 (1/3 marta)
    from: START.n06 + INTRO,
    to: START.n07,
    clip: "topikListen",
    ops: [[0, 70], [70, -65]],
    bg: "walk",
    bgStart: 0,
  },
  {
    // 길: 답 → 정답 · 전체 대본
    from: START.n07,
    to: START.n08,
    clip: "topikListen",
    ops: [[70, -45], [70, 140], [140, 186]],
    bg: "walk",
    bgStart: 160,
    taps: [[78, 117, 727]],
  },
  {
    // 쉬는 시간: 결과 → 틀린 것만
    from: START.n08 + INTRO,
    to: START.n09,
    clip: "topikResult",
    ops: [[30, 127]],
    bg: "worker",
    bgStart: 120,
    taps: [[48, 267, 411]],
  },
  {
    // 저녁: 모의고사 (시간이 흐른다)
    from: START.n09 + INTRO,
    to: START.n10,
    clip: "topikMock",
    ops: [[0, 114]],
    bg: "desk",
    bgStart: 0,
  },
  { from: START.n10, to: START.n11, clip: "topikStats", ops: [[10, 152]], bg: "desk", bgStart: 120 },
  { from: START.n11, to: START.n12, clip: "topikWriting", ops: [[20, 154]], bg: "desk", bgStart: 220 },
];

/** 장소가 바뀌는 순간 — 시각 · 장소 · 오늘 쓴 시간 */
const PLACES = [
  { at: START.n04, bg: "bus", time: "07:40", place: "Avtobusda", minutes: 25 },
  { at: START.n06, bg: "walk", time: "12:40", place: "Yoʻlda", minutes: 15 },
  { at: START.n08, bg: "worker", time: "15:00", place: "Tanaffusda", minutes: 5 },
  { at: START.n09, bg: "desk", time: "21:00", place: "Uyda", minutes: 45 },
];

// ───────────────────────────── 장소 영상
function Stock({ name, from, to, start = 0, blur = 0, dim = 0, push = 0 }: { name: string; from: number; to: number; start?: number; blur?: number; dim?: number; push?: number }) {
  return (
    <Sequence durationInFrames={to - from} from={from} layout="none">
      <AbsoluteFill style={{ transform: `scale(${1.02 + push})`, filter: `${blur ? `blur(${blur}px) ` : ""}brightness(${1 - dim})` }}>
        <OffthreadVideo muted src={staticFile(`ai/topik/stock/${name}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={start} />
      </AbsoluteFill>
    </Sequence>
  );
}

/** 장소 영상 · 휴대폰이 올라오면 흐려진다 */
function Backgrounds() {
  const frame = useCurrentFrame();
  const blurFor = (shotFrom: number) => interpolate(frame, [shotFrom - 2, shotFrom + 10], [0, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Stock from={0} name="factory" push={ramp(frame, 0, START.n02) * 0.06} start={60} to={START.n02} />
      <Stock from={START.n02} name="worker" push={ramp(frame, START.n02, 90) * 0.05} start={20} to={HAND} />
      <Stock blur={24} dim={0.45} from={START.n03} name="phone" start={120} to={START.n04} />
      {PLACES.map((p, i) => {
        const shot = SHOTS.find((s) => s.from >= p.at) ?? SHOTS[0];
        const end = PLACES[i + 1]?.at ?? START.n12;
        const k = blurFor(shot.from) / 24;
        return (
          <Sequence durationInFrames={end - p.at} from={p.at} key={p.at} layout="none">
            <AbsoluteFill style={{ filter: `blur(${24 * k}px) brightness(${0.9 - 0.35 * k})` }}>
              <OffthreadVideo muted src={staticFile(`ai/topik/stock/${p.bg}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.04)" }} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Stock dim={0.15} from={START.n12} name="dusk" push={ramp(frame, START.n12, 200) * 0.06} start={30} to={TOPIK_TOTAL} />
    </>
  );
}

// ───────────────────────────── 손에 든 휴대폰 — 화면 색을 뺀 영상 뒤에 앱 홈 화면을 원근에 맞춰 붙인다
const CORNERS = corners as Record<string, { tl: number[]; tr: number[]; br: number[]; bl: number[] }>;
function quadTransform(w: number, h: number, q: number[][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${x0},${y0},0,1)`;
}
function HandPhone() {
  const frame = useCurrentFrame();
  if (frame < HAND - 1 || frame >= START.n03 + 12) return null;
  const span = START.n03 - HAND;
  const pf = Math.min(120, Math.max(0, Math.round(((frame - HAND) * 120) / span)));
  const c = CORNERS[String(pf)];
  const centre = [(c.tl[0] + c.br[0]) / 2, (c.tl[1] + c.br[1]) / 2];
  const grow = (p: number[]) => [centre[0] + (p[0] - centre[0]) * 1.03, centre[1] + (p[1] - centre[1]) * 1.03];
  // 다음 장면으로: 휴대폰 화면 속으로 들어간다
  const zoom = interpolate(frame, [START.n03 - 2, START.n03 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ transform: `scale(${1 + zoom * 2.6})`, transformOrigin: `${centre[0]}px ${centre[1]}px`, opacity: 1 - ramp(frame, START.n03 + 6, 6) }}>
      <Freeze frame={pf}>
        <OffthreadVideo muted src={staticFile("ai/topik/stock/phone.mp4")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </Freeze>
      <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: 844, transformOrigin: "0 0", transform: quadTransform(390, 844, [grow(c.tl), grow(c.tr), grow(c.br), grow(c.bl)]) }}>
        <Freeze frame={8}>
          <OffthreadVideo muted src={staticFile("clips/topikTour.mp4")} style={{ width: 390, height: 844 }} />
        </Freeze>
      </div>
      <Freeze frame={pf}>
        <OffthreadVideo muted src={staticFile("ai/topik/stock/phone-key.webm")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} transparent />
      </Freeze>
    </AbsoluteFill>
  );
}

// ───────────────────────────── 앱 화면 (휴대폰 테두리)
const SCREEN = { w: 606, h: Math.round((606 * 1688) / 780) };
const PHONE = { x: (W - SCREEN.w - 28) / 2, y: 330 };
const K = SCREEN.w / 390;
function AppPhone() {
  const frame = useCurrentFrame();
  const shot = SHOTS.find((s) => frame >= s.from - 1 && frame < s.to + 1);
  if (!shot) return null;
  const local = frame - shot.from;
  const prev = SHOTS.find((s) => s.to === shot.from);
  const next = SHOTS.find((s) => s.from === shot.to);
  // 같은 장소 안에서 이어지면 그대로, 새로 나타나면 아래에서 올라온다
  const rise = prev ? 1 : pop(frame, shot.from, 170, 18);
  const leave = next ? 0 : ramp(frame, shot.to - 6, 7);
  const zoomIn = shot.from === START.n03 ? 1 - ease(ramp(frame, shot.from, 10)) : 0;
  const rec = recFrame(shot.ops, local);
  return (
    <div style={{ position: "absolute", left: PHONE.x, top: PHONE.y, transform: `translateY(${(1 - rise) * 1300 + leave * 1300}px) scale(${1 + zoomIn * 0.35})`, opacity: shot.from === START.n03 ? ramp(frame, shot.from, 6) : 1, transformOrigin: "50% 40%" }}>
      <div style={{ padding: 14, borderRadius: 64, background: "linear-gradient(145deg, #2B2B33, #0C0C10)", boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.12)" }}>
        <div style={{ position: "relative", width: SCREEN.w, height: SCREEN.h, borderRadius: 52, overflow: "hidden", background: "#fff" }}>
          <Freeze frame={rec}>
            <OffthreadVideo muted src={staticFile(`clips/${shot.clip}.mp4`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </Freeze>
          {(shot.taps ?? []).map(([recTap, x, y]) => {
            const t = whenRec(shot.ops, recTap);
            if (t === null) return null;
            const d = local - (t - 3);
            if (d < 0 || d > 18) return null;
            return <div key={recTap} style={{ position: "absolute", left: x * K - 34, top: y * K - 34, width: 68, height: 68, borderRadius: 34, background: "rgba(255,255,255,0.55)", border: "3px solid rgba(40,40,60,0.35)", transform: `scale(${interpolate(d, [0, 4, 18], [1.3, 1, 1.5])})`, opacity: 1 - ramp(d, 8, 10) }} />;
          })}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── 글자
const textShadow = "0 3px 0 rgba(0,0,0,0.35), 0 6px 26px rgba(0,0,0,0.65)";
function Subtitles() {
  const frame = useCurrentFrame();
  const line = [...ORDER].reverse().find((l) => frame >= START[l]);
  if (!line || frame >= START[line] + sec(voice[line]) + (line === "n13" ? 2 : Math.min(PAD[line], 12))) return null;
  const local = (frame - START[line]) / FPS;
  const chunks = subs[line];
  const i = [...chunks.keys()].reverse().find((k) => local >= chunks[k].t) ?? 0;
  const chunkStart = START[line] + sec(chunks[i].t);
  const p = pop(frame, chunkStart, 320, 18);
  const inPhoneScene = SHOTS.some((s) => frame >= s.from && frame < s.to);
  const top = inPhoneScene ? 196 : 1180;
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top, textAlign: "center", fontFamily: HEAVY, fontSize: inPhoneScene ? 50 : 66, lineHeight: 1.18, color: "#fff", textShadow, WebkitTextStroke: "1.5px rgba(0,0,0,0.35)", transform: `translateY(${(1 - p) * 14}px)`, opacity: Math.min(1, p * 1.6) }}>
      {chunks[i].text}
    </div>
  );
}

function Chip({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 24px", borderRadius: 40, background: "rgba(12,12,20,0.62)", border: "2px solid rgba(255,255,255,0.18)", fontFamily: HEAVY, fontSize: 34, color: "#fff", ...style }}>{children}</div>;
}

/** 오프닝 — 시험 날짜 */
function ExamChip() {
  const frame = useCurrentFrame();
  if (frame >= HAND) return null;
  const p = pop(frame, 4, 240, 15);
  return (
    <div style={{ position: "absolute", left: 40, top: 120, transform: `translateX(${(1 - p) * -400}px)`, opacity: 1 - ramp(frame, HAND - 6, 6) }}>
      <Chip>
        <span style={{ width: 14, height: 14, borderRadius: 7, background: "#FF4D4F", boxShadow: "0 0 12px #FF4D4F" }} />
        TOPIK · 15-noyabr
      </Chip>
    </div>
  );
}

/** 장소가 바뀔 때 크게 · 그 뒤 왼쪽 위 작게 */
function PlaceMarks() {
  const frame = useCurrentFrame();
  return (
    <>
      {PLACES.map((p, i) => {
        const end = PLACES[i + 1]?.at ?? START.n12;
        if (frame < p.at || frame >= end) return null;
        const big = frame < p.at + INTRO + 2;
        const s = pop(frame, p.at, 260, 15);
        if (big)
          return (
            <div key={p.at} style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center", color: "#fff", textShadow, transform: `scale(${0.7 + 0.3 * s})`, opacity: Math.min(1, s * 1.5) * (1 - ramp(frame, p.at + INTRO - 4, 6)) }}>
              <div style={{ fontFamily: HEAVY, fontSize: 170, lineHeight: 1, letterSpacing: 4 }}>{p.time}</div>
              <div style={{ fontFamily: HEAVY, fontSize: 60, marginTop: 14 }}>
                {p.place} · <span style={{ color: GREEN }}>{p.minutes} daqiqa</span>
              </div>
            </div>
          );
        return (
          <div key={p.at} style={{ position: "absolute", left: 40, top: 120, opacity: ramp(frame, p.at + INTRO, 6) }}>
            <Chip>
              {p.time} · {p.place}
            </Chip>
          </div>
        );
      })}
    </>
  );
}

/** 오늘 모은 시간 — "Kun oxirida hisoblab koʻring" 부터 오른쪽 위 */
function Counter() {
  const frame = useCurrentFrame();
  const show = at("n02", 4.57);
  if (frame < show || frame >= START.n12) return null;
  let value = 0;
  let last = -999;
  for (const p of PLACES) {
    const t = p.at + 8;
    if (frame >= t) {
      value = interpolate(frame, [t, t + 12], [value, value + p.minutes], { extrapolateRight: "clamp" });
      last = t;
    }
  }
  const bump = frame - last < 10 ? 1 + 0.18 * (1 - (frame - last) / 10) : 1;
  return (
    <div style={{ position: "absolute", right: 40, top: 120, transform: `scale(${pop(frame, show, 260, 14) * bump})`, transformOrigin: "100% 50%" }}>
      <Chip style={{ background: "rgba(20,70,45,0.72)", border: `2px solid ${GREEN}` }}>
        Bugun: <span style={{ color: GREEN, minWidth: 54, textAlign: "right" }}>{Math.round(value)}</span> daq
      </Chip>
    </div>
  );
}

/** 하루 끝 — 모은 시간 */
function Tally() {
  const frame = useCurrentFrame();
  if (frame < START.n12 - 2 || frame >= START.n13 + 4) return null;
  const totalAt = at("n12", 1.0);
  const out = ramp(frame, START.n13 - 4, 8);
  return (
    <div style={{ position: "absolute", left: 120, right: 120, top: 420, opacity: 1 - out }}>
      {PLACES.map((p, i) => {
        const s = pop(frame, START.n12 + i * 5, 300, 16);
        return (
          <div key={p.at} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 8px", borderBottom: "2px solid rgba(255,255,255,0.22)", fontFamily: HEAVY, fontSize: 52, color: "#fff", textShadow, transform: `translateX(${(1 - s) * -500}px)`, opacity: Math.min(1, s * 2) }}>
            <span>
              <span style={{ fontFamily: BODY, fontSize: 40, opacity: 0.75, marginRight: 18 }}>{p.time}</span>
              {p.place}
            </span>
            <span style={{ color: GREEN }}>{p.minutes} daq</span>
          </div>
        );
      })}
      <div style={{ marginTop: 40, textAlign: "center", color: "#fff", textShadow, transform: `scale(${pop(frame, totalAt, 280, 11)})` }}>
        <div style={{ fontFamily: HEAVY, fontSize: 64 }}>= 90 daqiqa</div>
        <div style={{ fontFamily: HEAVY, fontSize: 150, lineHeight: 1.05, color: GREEN }}>1,5 soat</div>
      </div>
    </div>
  );
}

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
/** 마지막 — 시험일 · 내려받기 */
function Finale() {
  const frame = useCurrentFrame();
  if (frame < START.n13) return null;
  const cta = at("n13", voice.n13) + 4;
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 460, textAlign: "center", color: "#fff", textShadow, transform: `scale(${pop(frame, at("n13", 0.8), 260, 12)})` }}>
        <div style={{ fontFamily: BODY, fontSize: 52, opacity: 0.85 }}>TOPIK</div>
        <div style={{ fontFamily: HEAVY, fontSize: 150, lineHeight: 1 }}>15-noyabr</div>
        <div style={{ fontFamily: HEAVY, fontSize: 64, color: GREEN, marginTop: 18, opacity: ramp(frame, at("n13", 2.15), 6) }}>Hali kech emas.</div>
      </div>
      {frame >= cta ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 930, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ transform: `scale(${pop(frame, cta, 240, 12)}) rotate(-2deg)` }}>
            <Logo size={92} />
          </div>
          <div style={{ transform: `translateX(${(1 - pop(frame, cta + 8, 240, 14)) * -1000}px)` }}>
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
          <div style={{ transform: `translateX(${(1 - pop(frame, cta + 14, 240, 14)) * 1000}px)` }}>
            <Pill bg="#2AABEE">
              <svg height={46} viewBox="0 0 24 24" width={46}>
                <path d="M21.5 3.5L2.8 10.8c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.4 4.6 3.4c.6.4 1.4.1 1.6-.6l3.2-15.6c.2-.9-.6-1.6-1.3-1.5z" fill="#fff" />
              </svg>
              iPhone: Telegram @KorioLoginBot
            </Pill>
          </div>
        </div>
      ) : null}
    </>
  );
}

// ───────────────────────────── 소리
function Sound() {
  const s = (frame: number, src: string, v = 0.3) => (
    <Sequence from={Math.max(0, Math.round(frame))} key={`${src}-${frame}`}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
  const bed = (src: string, from: number, to: number, v: number) => (
    <Sequence durationInFrames={to - from} from={from} key={`${src}-${from}`}>
      <Audio loop src={staticFile(src)} volume={(f) => v * interpolate(f, [0, 12, to - from - 12, to - from], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
    </Sequence>
  );
  const fx = (n: string) => `ai/edit/sfx-${n}.mp3`;
  const taps = SHOTS.flatMap((shot) => (shot.taps ?? []).map(([rec]) => whenRec(shot.ops, rec)).filter((t): t is number => t !== null).map((t) => shot.from + t));
  const extraTaps = [whenRec(SHOTS[2].ops, 385), whenRec(SHOTS[2].ops, 439), whenRec(SHOTS[2].ops, 499), whenRec(SHOTS[2].ops, 535)].filter((t): t is number => t !== null).map((t) => SHOTS[2].from + t);
  return (
    <>
      {ORDER.map((line) => s(START[line], `ai/tutorial/topik/v-${line}.mp3`, 1))}
      {bed("ai/topik/sfx/amb-factory.mp3", 0, HAND, 0.32)}
      {bed("ai/topik/sfx/amb-bus.mp3", START.n04, START.n06, 0.28)}
      {bed("ai/topik/sfx/amb-street.mp3", START.n06, START.n08, 0.26)}
      {bed("ai/topik/sfx/amb-factory.mp3", START.n08, START.n09, 0.18)}
      {bed("ai/topik/sfx/amb-room.mp3", START.n09, START.n12, 0.22)}
      {PLACES.map((p) => s(p.at - 4, fx("whoosh"), 0.22))}
      {PLACES.map((p) => s(p.at + 8, fx("pop"), 0.22))}
      {[...taps, ...extraTaps].map((t) => s(t, "sfx/click.wav", 0.35))}
      {s(START.n11 + 19, fx("type"), 0.25)}
      {PLACES.map((_, i) => s(START.n12 + i * 5, fx("pop"), 0.2))}
      {s(at("n12", 1.0), fx("boom"), 0.3)}
      {s(at("n13", voice.n13) + 4, fx("whoosh"), 0.3)}
      <Audio
        src={staticFile("ai/topik/sfx/music-long.mp3")}
        volume={(f) => 0.09 * interpolate(f, [0, 20, TOPIK_TOTAL - 40, TOPIK_TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </>
  );
}

/** 표지 — 피드 격자(3:4, 위아래 240px 잘림) 안에 질문이 다 들어가게 */
export function TopikCover() {
  return (
    <AbsoluteFill style={{ background: "#0E0E14" }}>
      <Freeze frame={70}>
        <OffthreadVideo muted src={staticFile("ai/topik/stock/worker.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.62)" }} />
      </Freeze>
      <AbsoluteFill style={{ background: "linear-gradient(rgba(0,0,0,0.55), transparent 45%, rgba(0,0,0,0.6))" }} />
      <div style={{ position: "absolute", left: 60, top: 300 }}>
        <Chip style={{ fontSize: 40 }}>
          <span style={{ width: 16, height: 16, borderRadius: 8, background: "#FF4D4F", boxShadow: "0 0 12px #FF4D4F" }} />
          TOPIK · 15-noyabr
        </Chip>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1080, color: "#fff", textShadow, fontFamily: HEAVY, lineHeight: 1.08 }}>
        <div style={{ fontSize: 92 }}>Kuniga 10 soat ishlab,</div>
        <div style={{ fontSize: 92, color: GREEN }}>TOPIKka qanday tayyorlanadi?</div>
      </div>
    </AbsoluteFill>
  );
}

export function TopikStory() {
  return (
    <AbsoluteFill style={{ background: "#0E0E14", overflow: "hidden" }}>
      <Backgrounds />
      <HandPhone />
      <AppPhone />
      <ExamChip />
      <PlaceMarks />
      <Counter />
      <Tally />
      <Finale />
      <Subtitles />
      <Sound />
    </AbsoluteFill>
  );
}
