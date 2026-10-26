/**
 * 사용법 영상 — "Hangul" 학습 카드 (약 55초). 작업 책상 화면 문법 (src/tutorial/kit.tsx).
 *
 *  훅     원고지에 안녕하세요가 써지고 HANGUL · "KORIOda qanday o‘rganiladi?"
 *  1      홈 «Yo‘nalish» → 학습 카드 «Hangul» (실제 앱 녹화 public/clips/hangulTour.mp4)
 *  2      Hangul ustasi — 진행률, 19 undosh · 21 unli
 *  3      글자 ㄱ → 이름 · 읽기 · Tinglash(기역) · 예시 단어(가족)   ← 휴대폰을 당겨서 크게
 *  4      «O‘yin orqali mashq» → 기억 게임
 *  5      게임 버튼 → 다섯 가지 게임 (hgMenu · hgDraw · hgSlot · hgSpeed · hgSyllable)
 *  꿀팁   하루 5글자 → 8일에 40글자
 *  끝     KORIO 받기 + 저장
 *
 * 녹화는 장면마다 [재생 a..b] · [정지 화면 f 를 n프레임] 순서로 이어 붙이고, 내레이션이 더 길면 마지막 화면을 더 멈춘다.
 */
import type { ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import voice from "./voice.generated.json";
import {
  CuttingMat, Guide, HAND, HEAVY, HIGHLIGHT, HighlightCaption, INK, KO, MARKER, Manuscript, MarkerArrow, MarkerCircle, PURPLE, SCREEN_W, StickyNote, Tape, TapedPhone, W,
} from "./kit";

const FPS = 30;
type Line = keyof typeof voice;
const f = (line: Line) => Math.round(voice[line] * FPS);
const art = (name: string) => `ai/tutorial/${name}`;
const K = SCREEN_W / 780; // 녹화(780px 폭) → 화면 px

// ───────────────────────────── 녹화 이어 붙이기
type Op = { src: string; play?: [number, number]; hold?: [number, number] };
type Seg = { line: Line; ops: Op[]; starts: number[]; len: number; from: number };

function segment(line: Line, ops: Op[], from: number, extra = 8): Seg {
  const starts: number[] = [];
  let t = 0;
  for (const op of ops) {
    starts.push(t);
    t += op.play ? op.play[1] - op.play[0] : op.hold![1];
  }
  return { line, ops, starts, len: Math.max(t, f(line) + extra), from };
}
/** 장면 안 프레임 → (영상, 영상 프레임). 마지막 너머는 마지막 화면을 멈춘다 */
function clipAt(seg: Seg, local: number): { src: string; frame: number } {
  for (let i = seg.ops.length - 1; i >= 0; i--) {
    if (local >= seg.starts[i] || i === 0) {
      const op = seg.ops[i];
      const d = local - seg.starts[i];
      if (op.play) return { src: op.src, frame: Math.min(op.play[0] + Math.max(0, d), op.play[1] - 1) };
      return { src: op.src, frame: op.hold![0] };
    }
  }
  return { src: seg.ops[0].src, frame: 0 };
}

const TOUR = "hangulTour";
const HOOK_END = 10 + f("g01") + 10;
const S2 = segment("g02", [{ src: TOUR, play: [0, 38] }, { src: TOUR, hold: [38, 24] }, { src: TOUR, play: [38, 105] }, { src: TOUR, hold: [105, 30] }, { src: TOUR, play: [105, 150] }], HOOK_END + 6);
const S3 = segment("g03", [{ src: TOUR, play: [150, 205] }], S2.from + S2.len);
const S4 = segment("g04", [{ src: TOUR, play: [205, 280] }], S3.from + S3.len);
const S5 = segment("g05", [{ src: TOUR, play: [280, 318] }, { src: TOUR, hold: [318, 20] }, { src: TOUR, play: [318, 336] }], S4.from + S4.len);
const S6 = segment("g06", [{ src: TOUR, play: [336, 378] }], S5.from + S5.len);
const S7 = segment("g07", [{ src: TOUR, play: [378, 400] }, { src: TOUR, hold: [400, 20] }, { src: TOUR, play: [400, 470] }], S6.from + S6.len);
const S8 = segment("g08", [{ src: "hgMenu", play: [0, 90] }], S7.from + S7.len);
const GAMES = [
  { src: TOUR, play: [470, 497] as [number, number], name: "XOTIRA", color: "#FFE14D" },
  // 게임 녹화는 1.5초에 메뉴를 누른다 — 카운트다운이 끝나고 판이 깔린 뒤(3.7초~)를 쓴다
  { src: "hgDraw", play: [110, 137] as [number, number], name: "CHIZISH", color: "#FFB3C7" },
  { src: "hgSlot", play: [110, 137] as [number, number], name: "SLOT", color: "#B6E3FF" },
  { src: "hgSpeed", play: [120, 147] as [number, number], name: "TEZLIK", color: "#C6F5B8" },
  { src: "hgSyllable", play: [110, 137] as [number, number], name: "BO‘G‘IN YOZISH", color: "#FFD3A3" },
];
const S9 = segment("g09", GAMES.map((g) => ({ src: g.src, play: g.play })), S8.from + S8.len, 14);
const TOUR_SEGS = [S2, S3, S4, S5, S6, S7, S8, S9];
const TIP = S9.from + S9.len;
const TIP_LEN = f("g10") + 16;
const CTA = TIP + TIP_LEN;
export const HANGUL_GUIDE_TOTAL = CTA + f("g11") + 45;

/** 대사 시작 = 장면 시작 + 4 (훅은 10) */
const LINE_AT: Record<Line, number> = {
  g01: 10, g02: S2.from + 4, g03: S3.from + 4, g04: S4.from + 4, g05: S5.from + 4, g06: S6.from + 4, g07: S7.from + 4,
  g08: S8.from + 4, g09: S9.from + 4, g10: TIP + 6, g11: CTA + 8,
};

// ───────────────────────────── 움직임 도우미
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (frame: number, at: number, dur: number) => clamp01((frame - at) / dur);
const pop = (frame: number, at: number, stiffness = 220, damping = 12) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });
const ease = Easing.bezier(0.65, 0, 0.35, 1);

function Slap({ at, out, children, from = 1.5, rot = 0 }: { at: number; out?: number; children: ReactNode; from?: number; rot?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 8)) return null;
  const s = pop(frame, at, 320, 14);
  const leave = out !== undefined ? ramp(frame, out, 8) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${(1 - s) * rot}deg) translateY(${leave * -1400}px)`, opacity: Math.min(1, s * 3), transformOrigin: "50% 50%" }}>
      {children}
    </div>
  );
}

function Caption({ text, at, out, y = 1450 }: { text: string; at: number; out: number; y?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out) return null;
  const reveal = interpolate(frame, [at, at + 10], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const fade = ramp(frame, out - 6, 6);
  return (
    <div style={{ opacity: 1 - fade, transform: `translateY(${(1 - pop(frame, at, 260, 16)) * 30}px)` }}>
      <HighlightCaption reveal={reveal} size={58} y={y}>
        {text}
      </HighlightCaption>
    </div>
  );
}

function Tap({ at, x, y }: { at: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  const t = (frame - at) / 18;
  if (t < 0 || t > 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 60,
        top: y - 60,
        width: 120,
        height: 120,
        borderRadius: 60,
        border: `6px solid rgba(106,85,245,${1 - t})`,
        background: `rgba(106,85,245,${0.28 * (1 - t)})`,
        transform: `scale(${0.4 + t})`,
      }}
    />
  );
}

/** 화면 안 동그라미 — at 부터 9프레임에 걸쳐 그려지고 out 에 사라진다 */
function Ring({ at, out, cx, cy, rx, ry, seed = 1 }: { at: number; out: number; cx: number; cy: number; rx: number; ry: number; seed?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame >= out) return null;
  return <MarkerCircle cx={cx} cy={cy} draw={interpolate(frame, [at, at + 9], [0, 1], { extrapolateRight: "clamp", easing: ease })} rx={rx} ry={ry} seed={seed} />;
}

// ───────────────────────────── 휴대폰 (녹화 재생 · 당기기 · 들어오고 나가기)
function Recording() {
  const frame = useCurrentFrame();
  const seg = [...TOUR_SEGS].reverse().find((s) => frame >= s.from) ?? S2;
  const { src, frame: clipFrame } = clipAt(seg, frame - seg.from);
  return (
    <Freeze frame={clipFrame}>
      <OffthreadVideo muted src={staticFile(`clips/${src}.mp4`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    </Freeze>
  );
}

/** 장면 안 프레임 l 이 녹화의 clip 프레임에 닿는 순간 (ops 의 첫 재생 구간 기준) */
const when = (seg: Seg, opIndex: number, clipFrame: number) => seg.from + seg.starts[opIndex] + (seg.ops[opIndex].play ? clipFrame - seg.ops[opIndex].play![0] : 0);

function Phone() {
  const frame = useCurrentFrame();
  const enter = pop(frame, HOOK_END - 6, 120, 15);
  const leave = interpolate(frame, [TIP - 6, TIP + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  if (frame < HOOK_END - 6 || frame >= TIP + 8) return null;
  // 3·4단계는 휴대폰을 당겨서 글자 창을 크게
  const zoomIn = interpolate(frame, [S5.from + 2, S5.from + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const zoomOut = interpolate(frame, [S8.from - 4, S8.from + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const z = zoomIn * (1 - zoomOut);
  const scale = interpolate(z, [0, 1], [0.84, 1.08]);
  const top = interpolate(z, [0, 1], [300, -120]) + (1 - enter) * 1500 + leave * 1700;
  const rot = interpolate(z, [0, 1], [3, 0]) + (1 - enter) * 14 + leave * -18;
  // 게임 몽타주: 바뀔 때마다 휙 돈다
  const gameIndex = Math.floor((frame - S9.from) / 27);
  const inGame = frame >= S9.from && gameIndex >= 1 && gameIndex < GAMES.length;
  const flip = inGame ? interpolate((frame - S9.from) % 27, [0, 6], [1, 0], { extrapolateRight: "clamp" }) : 0;

  const s2 = S2;
  const overlay = (
    <>
      {/* 1단계: «Yo‘nalish» 버튼, Hangul 카드 */}
      <Ring at={s2.from + s2.starts[1] + 2} cx={676 * K} cy={808 * K} out={when(s2, 2, 46)} rx={64} ry={60} />
      <Ring at={s2.from + s2.starts[3] + 2} cx={208 * K} cy={657 * K} out={when(s2, 4, 112)} rx={140} ry={105} seed={3} />
      {/* 2단계: 진행률 · 탭 */}
      <Ring at={S3.from + 26} cx={390 * K} cy={355 * K} out={S3.from + S3.len - 2} rx={282} ry={124} seed={2} />
      <Ring at={S4.from + 4} cx={390 * K} cy={588 * K} out={S4.from + S4.len - 2} rx={286} ry={52} seed={4} />
      {/* 3단계: 글자 ㄱ, Tinglash, 예시 단어 */}
      <Ring at={S5.from + 2} cx={117 * K} cy={765 * K} out={when(S5, 0, 284)} rx={70} ry={70} seed={5} />
      <Ring at={S5.from + S5.starts[1] + 2} cx={390 * K} cy={1235 * K} out={S5.from + S5.len - 2} rx={262} ry={44} seed={6} />
      <Ring at={S6.from + 8} cx={262 * K} cy={1437 * K} out={S6.from + S6.len - 2} rx={150} ry={46} seed={7} />
      {/* 4단계: O‘yin orqali mashq */}
      <Ring at={S7.from + S7.starts[1] + 2} cx={390 * K} cy={1586 * K} out={when(S7, 2, 426)} rx={270} ry={48} seed={8} />
      {/* 5단계: 게임 메뉴 */}
      <Ring at={S8.from + 30} cx={648 * K} cy={1210 * K} out={S8.from + S8.len - 2} rx={96} ry={230} seed={9} />
    </>
  );
  return (
    <div style={{ position: "absolute", inset: 0, transform: `perspective(1600px) rotateY(${flip * 70}deg)` }}>
      <TapedPhone overlay={overlay} rot={rot} scale={scale} screen={<Recording />} x={560} y={top}>
        <Tap at={when(s2, 2, 43)} x={676 * K} y={808 * K} />
        <Tap at={when(s2, 4, 110)} x={208 * K} y={657 * K} />
        <Tap at={when(S4, 0, 208)} x={565 * K} y={588 * K} />
        <Tap at={when(S4, 0, 245)} x={215 * K} y={588 * K} />
        <Tap at={when(S5, 0, 281)} x={117 * K} y={765 * K} />
        <Tap at={when(S5, 2, 330)} x={390 * K} y={1235 * K} />
        <Tap at={when(S6, 0, 373)} x={160 * K} y={1437 * K} />
        <Tap at={when(S7, 2, 422)} x={390 * K} y={1586 * K} />
      </TapedPhone>
    </div>
  );
}

// ───────────────────────────── 훅
function Hook() {
  const frame = useCurrentFrame();
  if (frame >= HOOK_END + 10) return null;
  const sheet = pop(frame, 0, 140, 15);
  const typed = Math.floor(clamp01((frame - 10) / 30) * 5);
  const leave = interpolate(frame, [HOOK_END - 8, HOOK_END + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const title = pop(frame, 46, 260, 11);
  return (
    <AbsoluteFill style={{ transform: `translateX(${leave * -1200}px) rotate(${leave * -8}deg)` }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - sheet) * -900}px)` }}>
        <Manuscript cell={160} chars={["안", "녕", "하", "세", "요"].slice(0, typed)} h={300} rot={-2} w={900} x={90} y={230} />
        <Tape rot={-16} x={150} y={250} />
        <Tape color="rgba(170,200,255,0.7)" rot={14} x={940} y={500} />
      </div>
      {frame >= 46 ? (
        <div style={{ position: "absolute", left: 340, top: 640, transform: `rotate(-4deg) scale(${interpolate(title, [0, 1], [2.2, 1])})`, opacity: Math.min(1, title * 2), fontFamily: HEAVY, fontSize: 150, lineHeight: 1, color: "#fff", textShadow: `8px 9px 0 ${PURPLE}, 0 18px 30px rgba(0,0,0,0.35)` }}>
          HANGUL
        </div>
      ) : null}
      <Slap at={70} rot={-8}>
        <StickyNote rot={5} size={410} x={520} y={860}>
          KORIOda qanday o‘rganiladi?
        </StickyNote>
      </Slap>
      {frame >= 16 ? (
        <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - pop(frame, 16, 200, 13)) * 900}px)` }}>
          <Guide height={1060} src={art("guide-point.png")} x={250} y={1930} />
        </div>
      ) : null}
      {frame >= 96 ? <MarkerArrow bend={-0.3} draw={ramp(frame, 96, 10)} from={[500, 1040]} to={[590, 950]} /> : null}
    </AbsoluteFill>
  );
}

// ───────────────────────────── 단계 포스트잇 · 자막 · 게임 이름
function Steps() {
  const notes: { at: number; out: number; step: string; text: string; x: number; rot: number; color?: string }[] = [
    { at: S2.from + 2, out: S3.from, step: "1", text: "«Yo‘nalish» → «Hangul»", x: 24, rot: -6 },
    { at: S3.from + 2, out: S5.from, step: "2", text: "Hangul ustasi", x: 24, rot: 4, color: "#FFB3C7" },
    { at: S5.from + 2, out: S7.from, step: "3", text: "Harfni bosing", x: 726, rot: 5, color: "#B6E3FF" },
    { at: S7.from + 2, out: S8.from, step: "4", text: "O‘yin orqali mashq", x: 726, rot: -5, color: "#C6F5B8" },
    { at: S8.from + 2, out: S9.from, step: "5", text: "O‘yinlar tugmasi", x: 24, rot: -4, color: "#FFD3A3" },
  ];
  return (
    <>
      {notes.map((n) => (
        <Slap at={n.at} key={n.step} out={n.out} rot={n.rot * 3}>
          <StickyNote color={n.color} rot={n.rot} size={320} step={n.step} x={n.x} y={70}>
            {n.text}
          </StickyNote>
        </Slap>
      ))}
      {GAMES.map((g, i) => {
        const at = S9.from + i * 27;
        return (
          <Slap at={at} key={g.name} out={i === GAMES.length - 1 ? S9.from + S9.len - 6 : at + 27} rot={i % 2 ? 10 : -10}>
            <div style={{ position: "absolute", left: i % 2 ? 640 : 40, top: 1380, padding: "18px 30px", background: g.color, transform: `rotate(${i % 2 ? 4 : -4}deg)`, boxShadow: "0 14px 22px rgba(0,0,0,0.3)", fontFamily: HEAVY, fontSize: 64, color: INK }}>
              {g.name}
            </div>
          </Slap>
        );
      })}
      <Caption at={LINE_AT.g01} out={HOOK_END} text="Koreys harflarini noldan o‘rganmoqchimisiz?" y={1590} />
      <Caption at={LINE_AT.g02} out={S3.from} text="«Yo‘nalish» → «Hangul»" />
      <Caption at={LINE_AT.g03} out={S4.from} text="Tepada — qancha harf o‘rgandingiz" />
      <Caption at={LINE_AT.g04} out={S5.from} text="19 undosh · 21 unli" />
      <Caption at={LINE_AT.g05} out={S6.from} text="Harf — nomi, o‘qilishi, talaffuzi" />
      <Caption at={LINE_AT.g06} out={S7.from} text="Misol so‘zlarni ham eshiting" />
      <Caption at={LINE_AT.g07} out={S8.from} text="Harfni o‘yinda mustahkamlang" />
      <Caption at={LINE_AT.g08} out={S9.from} text="O‘yin tugmasi — 5 ta o‘yin" />
    </>
  );
}

// ───────────────────────────── 꿀팁: 하루 5글자 → 8일
function Tip() {
  const frame = useCurrentFrame();
  if (frame < TIP || frame >= CTA + 8) return null;
  const leave = interpolate(frame, [CTA - 8, CTA + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const days = Array.from({ length: 8 }, (_, i) => i);
  const tickAt = (i: number) => TIP + 34 + i * 7;
  const count = Math.min(40, Math.max(0, Math.floor((frame - TIP - 34) / 7 + 1) * 5));
  return (
    <AbsoluteFill style={{ transform: `translateY(${leave * -1900}px)` }}>
      <Slap at={TIP + 2} rot={-10}>
        <StickyNote color={HIGHLIGHT} rot={-5} size={460} x={70} y={150}>
          <span style={{ fontFamily: HEAVY, fontSize: 64, color: PURPLE }}>MASLAHAT</span>
          <br />
          Kuniga 5 ta harf
        </StickyNote>
      </Slap>
      <div style={{ position: "absolute", left: 560, top: 240, transform: `rotate(4deg) scale(${pop(frame, TIP + 10, 200, 12)})`, fontFamily: HEAVY, fontSize: 210, lineHeight: 1, color: "#fff", textShadow: `8px 9px 0 ${PURPLE}` }}>
        {count}
        <div style={{ fontFamily: HAND, fontSize: 56, fontWeight: 700, textShadow: "0 3px 10px rgba(0,0,0,0.4)" }}>/ 40 harf</div>
      </div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 760, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
        {days.map((i) => {
          const s = pop(frame, TIP + 20 + i * 2, 260, 14);
          return (
            <div key={i} style={{ position: "relative", height: 190, background: "#FBF6EA", transform: `scale(${s}) rotate(${(i % 3) - 1}deg)`, boxShadow: "0 12px 20px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: HAND, fontWeight: 700, color: INK }}>
              <div style={{ fontSize: 40 }}>{i + 1}-kun</div>
              <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 34, color: "#8A8377", marginTop: 6 }}>+5</div>
              {frame >= tickAt(i) ? (
                <svg height={120} style={{ position: "absolute", left: 60, top: 30, overflow: "visible" }} width={120}>
                  <path d="M 10 60 L 45 95 L 110 15" fill="none" stroke={MARKER} strokeDasharray={170} strokeDashoffset={170 * (1 - ramp(frame, tickAt(i), 5))} strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                </svg>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - pop(frame, TIP + 6, 200, 13)) * 900}px)` }}>
        <Guide flip height={720} src={art("guide-point.png")} x={930} y={1960} />
      </div>
      <Caption at={LINE_AT.g10} out={CTA} text="8 kunda — 40 ta harf" y={1250} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 끝: KORIO
function Cta() {
  const frame = useCurrentFrame();
  if (frame < CTA - 6) return null;
  const wipe = interpolate(frame, [CTA - 6, CTA + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const logo = pop(frame, CTA + 6, 220, 11);
  return (
    <AbsoluteFill>
      {/* 형광펜 한 획이 화면을 쓸고 지나간다 */}
      <div style={{ position: "absolute", left: -200, top: 760, width: (W + 400) * wipe, height: 420, background: HIGHLIGHT, opacity: wipe < 1 ? 0.95 : 0, transform: "rotate(-8deg)", borderRadius: 120 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", transform: `scale(${logo}) rotate(-3deg)` }}>
        <div style={{ display: "inline-block", padding: "10px 46px", background: "#fff", borderRadius: 40, boxShadow: "0 22px 40px rgba(0,0,0,0.35)" }}>
          <span style={{ fontFamily: HEAVY, fontSize: 180, letterSpacing: 6, color: PURPLE }}>KORI</span>
          <span style={{ fontFamily: HEAVY, fontSize: 180, letterSpacing: 6, color: "#FF5FA2" }}>O</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {["App Store", "Google Play", "Telegram: @KorioLoginBot"].map((store, i) => {
          const s = pop(frame, CTA + 16 + i * 5, 240, 13);
          return (
            <div key={store} style={{ transform: `translateX(${(1 - s) * (i % 2 ? 900 : -900)}px) rotate(${i % 2 ? 2 : -2}deg)`, padding: "18px 44px", background: i === 2 ? "#2AABEE" : INK, color: "#fff", borderRadius: 999, fontFamily: HEAVY, fontSize: 50, boxShadow: "0 14px 24px rgba(0,0,0,0.3)" }}>
              {store}
            </div>
          );
        })}
      </div>
      <Slap at={CTA + 40} rot={-10}>
        <StickyNote color="#FFB3C7" rot={-6} size={360} x={80} y={1060}>
          Saqlab qo‘ying — kerak bo‘ladi!
        </StickyNote>
      </Slap>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - pop(frame, CTA + 24, 200, 13)) * 900}px)` }}>
        <Guide height={860} src={art("guide-point.png")} x={720} y={1930} />
      </div>
    </AbsoluteFill>
  );
}

// ───────────────────────────── 소리
function Sound() {
  const s = (at: number, src: string, v = 0.5) => (
    <Sequence from={Math.round(at)} key={`${src}-${Math.round(at)}`}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
  const sfx = (name: string) => `ai/tutorial/sfx-${name}.mp3`;
  const rings = [S2.from + S2.starts[1] + 2, S2.from + S2.starts[3] + 2, S3.from + 26, S4.from + 4, S5.from + 2, S5.from + S5.starts[1] + 2, S6.from + 8, S7.from + S7.starts[1] + 2, S8.from + 30];
  const taps = [when(S2, 2, 43), when(S2, 4, 110), when(S4, 0, 208), when(S4, 0, 245), when(S5, 0, 281), when(S5, 2, 330), when(S6, 0, 373), when(S7, 2, 422)];
  const slaps = [70, S2.from + 2, S3.from + 2, S5.from + 2, S7.from + 2, S8.from + 2, ...GAMES.map((_, i) => S9.from + i * 27), TIP + 2, CTA + 40];
  return (
    <>
      {(Object.keys(LINE_AT) as Line[]).map((line) => s(LINE_AT[line], `ai/tutorial/v-${line}.mp3`, 1))}
      {s(when(S5, 2, 331), "ai/tutorial/app-giyeok.mp3", 0.9)}
      {s(when(S6, 0, 374), "ai/tutorial/app-gajok.mp3", 0.9)}
      {rings.map((at) => s(at, sfx("marker"), 0.35))}
      {taps.map((at) => s(at, "sfx/click.wav", 0.6))}
      {slaps.map((at) => s(at, sfx("slap"), 0.45))}
      {s(HOOK_END - 6, sfx("tape"), 0.5)}
      {[HOOK_END - 10, S8.from - 4, TIP - 6, CTA - 6].map((at) => s(at, sfx("whoosh"), 0.4))}
      {s(S7.from + S7.starts[2] + 30, "sfx/correct.wav", 0.4)}
      {/* 음악 — 22초 고리 */}
      {Array.from({ length: Math.ceil(HANGUL_GUIDE_TOTAL / 660) }, (_, i) => (
        <Sequence durationInFrames={660} from={i * 660} key={`m${i}`}>
          <Audio src={staticFile("ai/tutorial/music.mp3")} volume={(fr) => 0.1 * interpolate(i * 660 + fr, [HANGUL_GUIDE_TOTAL - 40, HANGUL_GUIDE_TOTAL], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        </Sequence>
      ))}
    </>
  );
}

export function HangulGuide() {
  return (
    <AbsoluteFill>
      <CuttingMat />
      <Hook />
      <Phone />
      <Steps />
      <Tip />
      <Cta />
      <Sound />
    </AbsoluteFill>
  );
}

/** 릴스 표지 — 격자 안(y 240~1680)에 다 들어오게 */
export function HangulGuideCover() {
  return (
    <AbsoluteFill>
      <CuttingMat />
      <Manuscript cell={160} chars={["안", "녕", "하", "세", "요"]} h={300} rot={-2} w={900} x={90} y={300} />
      <Tape rot={-16} x={150} y={320} />
      <div style={{ position: "absolute", left: 300, top: 690, transform: "rotate(-4deg)", fontFamily: HEAVY, fontSize: 160, lineHeight: 1, color: "#fff", textShadow: `8px 9px 0 ${PURPLE}, 0 18px 30px rgba(0,0,0,0.35)` }}>HANGUL</div>
      <StickyNote rot={5} size={430} x={500} y={900}>
        KORIOda qanday o‘rganiladi?
      </StickyNote>
      <Guide height={1000} src={art("guide-point.png")} x={250} y={1700} />
    </AbsoluteFill>
  );
}
