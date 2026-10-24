/**
 * 스토리 영상 장면들. 장면마다 자기 카메라(Cam)를 갖고, 장면 사이 전환은
 * 앞 장면의 끝 동작(줌인·당기기)과 뒤 장면의 첫 동작(줌아웃·밀기)이 맞물려 이어진다.
 */
import type { CSSProperties, ReactNode } from "react";
import { Freeze, Img, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "../theme";
import {
  C,
  DIN,
  Disintegrate,
  easeIn,
  easeInOut,
  easeOut,
  Glitch,
  H,
  HEAD,
  KO,
  lerp,
  Odometer,
  rand,
  Rise,
  scramble,
  tween,
  W,
} from "./fx";
import { BEAT, BEATS, type Beat } from "./plan";

// ───────────────────────────── 공용

/** 카메라 — 안에 든 세상을 통째로 민다·당긴다·돌린다 */
export function Cam({
  scale = 1,
  x = 0,
  y = 0,
  rotate = 0,
  rotateY = 0,
  rotateX = 0,
  blur = 0,
  origin = "50% 50%",
  children,
}: {
  scale?: number;
  x?: number;
  y?: number;
  rotate?: number;
  rotateY?: number;
  rotateX?: number;
  blur?: number;
  origin?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 1800, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: origin,
          transform: `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${rotate}deg) scale(${scale})`,
          filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** 손떨림 — 강도 0..1 */
export function shake(frame: number, amount: number) {
  return {
    x: (rand(frame * 3 + 1) - 0.5) * 26 * amount,
    y: (rand(frame * 7 + 2) - 0.5) * 26 * amount,
    r: (rand(frame * 11 + 3) - 0.5) * 1.6 * amount,
  };
}

function Glow({ x, y, r, color, opacity = 1 }: { x: number; y: number; r: number; color: string; opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        opacity,
      }}
    />
  );
}

const text = (size: number, extra?: CSSProperties): CSSProperties => ({
  fontFamily: HEAD,
  fontWeight: 700,
  fontSize: size,
  lineHeight: 1.08,
  color: C.ink,
  letterSpacing: -0.5,
  ...extra,
});

function Centered({ y, children }: { y: number; children: ReactNode }) {
  return <div style={{ position: "absolute", left: 60, right: 60, top: y, textAlign: "center" }}>{children}</div>;
}

/** 폰 테두리 */
function Handset({ x, y, w, h, children, style }: { x: number; y: number; w: number; h: number; children: ReactNode; style?: CSSProperties }) {
  const bezel = Math.max(8, w * 0.022);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        padding: bezel,
        borderRadius: w * 0.14,
        background: "#0E0D12",
        boxShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,255,255,0.12)",
        ...style,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: w * 0.12, overflow: "hidden", background: "#000" }}>
        {children}
      </div>
    </div>
  );
}

// ───────────────────────────── 릴스 피드 (실제 영상 대신 추상 카드 — 남의 콘텐츠를 쓰지 않는다)

const CARDS = [
  { a: "#FF5F6D", b: "#FFC371", e: "🐱", u: "@mushuk.tv" },
  { a: "#4776E6", b: "#8E54E9", e: "🍔", u: "@food.zone" },
  { a: "#11998E", b: "#38EF7D", e: "💃", u: "@dance_uz" },
  { a: "#F7971E", b: "#FFD200", e: "😂", u: "@memlar" },
  { a: "#C33764", b: "#1D2671", e: "🚗", u: "@cars.daily" },
  { a: "#00C6FF", b: "#0072FF", e: "🎮", u: "@gamer777" },
  { a: "#FC5C7D", b: "#6A82FB", e: "🐶", u: "@itcha" },
  { a: "#F953C6", b: "#B91D73", e: "🍕", u: "@pizza.lab" },
  { a: "#43CEA2", b: "#185A9D", e: "🎤", u: "@karaoke" },
  { a: "#FF512F", b: "#DD2476", e: "😱", u: "@prank.tv" },
  { a: "#DA4453", b: "#89216B", e: "🏀", u: "@sport.clips" },
  { a: "#FDC830", b: "#F37335", e: "🍜", u: "@mukbang" },
];

function FeedCard({ i, w, h }: { i: number; w: number; h: number }) {
  const c = CARDS[((i % CARDS.length) + CARDS.length) % CARDS.length];
  const k = w / 920;
  return (
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${c.a}, ${c.b})`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.3, textAlign: "center", fontSize: 330 * k, lineHeight: 1 }}>{c.e}</div>
      {/* 오른쪽 아이콘 줄 */}
      {["❤", "💬", "➤"].map((g, j) => (
        <div
          key={g}
          style={{
            position: "absolute",
            right: 34 * k,
            top: h * 0.56 + j * 150 * k,
            width: 96 * k,
            height: 96 * k,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.18)",
            color: "#fff",
            fontSize: 48 * k,
            lineHeight: `${96 * k}px`,
            textAlign: "center",
          }}
        >
          {g}
        </div>
      ))}
      <div style={{ position: "absolute", left: 44 * k, bottom: 190 * k, fontFamily: HEAD, fontWeight: 700, fontSize: 46 * k, color: "#fff" }}>{c.u}</div>
      <div style={{ position: "absolute", left: 44 * k, bottom: 140 * k, width: 520 * k, height: 22 * k, borderRadius: 11 * k, background: "rgba(255,255,255,0.55)" }} />
      <div style={{ position: "absolute", left: 44 * k, bottom: 100 * k, width: 340 * k, height: 22 * k, borderRadius: 11 * k, background: "rgba(255,255,255,0.35)" }} />
    </div>
  );
}

/** 위로 넘어가는 릴스 — scroll 은 화면 높이 단위 (1 = 한 장) */
function Feed({ scroll, w, h, speed = 0 }: { scroll: number; w: number; h: number; speed?: number }) {
  const first = Math.floor(scroll) - 1;
  const stretch = 1 + Math.min(0.35, speed * 0.9);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scaleY(${stretch})`, filter: speed > 0.02 ? `blur(${Math.min(26, speed * 60)}px)` : undefined }}>
        {[0, 1, 2, 3].map((n) => {
          const i = first + n;
          return (
            <div key={i} style={{ position: "absolute", left: 0, top: (i - scroll) * h, width: w, height: h }}>
              <FeedCard h={h} i={i} w={w} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────── 1. 훅 — 이 영상의 시간을 센다

export function HookScene() {
  const f = useCurrentFrame();
  const sec = Math.floor(f / 30);
  const bump = 1 + 0.08 * (1 - tween(f % 30, 0, 9));
  const push = lerp(1, 1.07, tween(f, 0, 100, 0, 1, easeInOut));
  // 끝 20프레임 — 숫자 한가운데로 처박히는 크래시 줌
  const crash = tween(f, 100, 20, 0, 1, easeIn);
  return (
    <Cam blur={crash * 26} origin="50% 47%" scale={push * lerp(1, 9, crash)}>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Glow color="rgba(119,110,226,0.35)" r={700} x={540} y={900} opacity={tween(f, 0, 40)} />
      <Centered y={560}>
        <Rise p={tween(f, 4, 16)}>
          <div style={text(70, { color: C.dim })}>Bu video</div>
        </Rise>
      </Centered>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 660,
          textAlign: "center",
          fontFamily: DIN,
          fontSize: 340,
          lineHeight: 1,
          color: C.ink,
          transform: `scale(${bump})`,
          textShadow: "0 0 60px rgba(119,110,226,0.55)",
        }}
      >
        <span style={{ color: C.reel, fontSize: 120, verticalAlign: "middle", marginRight: 30, opacity: f % 30 < 15 ? 1 : 0.25 }}>●</span>
        0:{String(sec).padStart(2, "0")}
      </div>
      <Centered y={1080}>
        <Rise p={tween(f, 22, 18)}>
          <div style={text(86)}>
            <span style={{ color: C.violet }}>57 soniya</span> davom etadi.
          </div>
        </Rise>
      </Centered>
      <Centered y={1210}>
        <Rise p={tween(f, 56, 18)}>
          <div style={text(56, { color: C.dim })}>Keling, sanab ko‘ramiz.</div>
        </Rise>
      </Centered>
    </Cam>
  );
}

// ───────────────────────────── 2. 피드 — 넘기고 넘기고, 1년에 730시간

const SWIPES = [12, 36, 60];
/** 피드 스크롤(장) — 처음엔 한 장씩 넘기다가 점점 빨라져서 흐려진다, 끝에서 멈춘다 */
function feedScroll(f: number) {
  let s = 0;
  for (const at of SWIPES) s += tween(f, at, 10, 0, 1, easeInOut);
  let v = 0;
  for (let t = 72; t < Math.min(f, 200); t++) {
    const vt = t < 160 ? lerp(0.06, 0.55, ((t - 72) / 88) ** 1.6) : Math.max(0, lerp(0.55, 0, (t - 160) / 26));
    s += vt;
    v = vt;
  }
  return { s, v: f < 200 ? v : 0 };
}

const COUNTS = [
  { at: 50, value: 2, label: "bir kunda" },
  { at: 100, value: 60, label: "bir oyda" },
  { at: 140, value: 730, label: "bir yilda" },
];

export function FeedScene() {
  const f = useCurrentFrame();
  const { s, v } = feedScroll(f);
  // 들어올 때 — 훅의 크래시 줌에서 빠져나온다
  const enter = tween(f, 0, 22);
  // 빨라질수록 더치 앵글·흔들림
  const fast = Math.min(1, v / 0.55);
  const sh = shake(f, fast * 0.8);
  // 끝 — 카메라가 뒤로 빠지며 이게 폰 화면이었다는 게 보인다
  const pull = tween(f, 178, 28, 0, 1, easeInOut);
  const screenW = lerp(W, 420, pull);
  const screenH = lerp(H, 910, pull);
  const grey = tween(f, 170, 26);
  const value =
    f < COUNTS[1].at ? lerp(0, 2, tween(f, COUNTS[0].at, 14)) : f < COUNTS[2].at ? lerp(2, 60, tween(f, COUNTS[1].at, 22)) : lerp(60, 730, tween(f, COUNTS[2].at, 26));
  const label = [...COUNTS].reverse().find((c) => f >= c.at)?.label ?? COUNTS[0].label;
  const panel = tween(f, 44, 14) * (1 - tween(f, 176, 14));
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Cam blur={(1 - enter) * 20} rotate={lerp(-7, 0, enter) + fast * 3 + sh.r} scale={lerp(2.3, 1, enter)} x={sh.x} y={sh.y}>
        <div
          style={{
            position: "absolute",
            left: (W - screenW) / 2,
            top: (H - screenH) / 2 - pull * 40,
            width: screenW,
            height: screenH,
            borderRadius: pull * 52,
            overflow: "hidden",
            boxShadow: pull > 0 ? `0 0 0 ${pull * 12}px #0E0D12, 0 40px 120px rgba(0,0,0,${0.6 * pull})` : undefined,
            filter: `grayscale(${grey}) brightness(${1 - grey * 0.35})`,
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${screenW / W})`, transformOrigin: "0 0" }}>
            <Feed h={H} scroll={s} speed={v} w={W} />
          </div>
        </div>
      </Cam>
      {/* 글자는 카메라 밖 — 흔들려도 읽힌다 */}
      <Centered y={190}>
        <Rise p={tween(f, 18, 16) * (1 - tween(f, 170, 12))}>
          <div style={{ ...text(66), textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>Kuniga 2 soat reels…</div>
        </Rise>
      </Centered>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 1330,
          padding: "26px 0 34px",
          borderRadius: 40,
          background: "rgba(9,8,15,0.72)",
          border: "2px solid rgba(255,255,255,0.12)",
          textAlign: "center",
          opacity: panel,
          transform: `translateY(${(1 - panel) * 80}px) scale(${lerp(0.9, 1, panel)})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 22 }}>
          <Odometer digits={3} size={190} value={value} />
          <div style={{ fontFamily: DIN, fontSize: 90, color: C.reel }}>soat</div>
        </div>
        <div style={text(48, { color: C.dim, marginTop: 6 })}>{label}</div>
      </div>
      <Centered y={1520}>
        <Rise p={tween(f, 182, 16)}>
          <div style={text(64)}>Shulardan nechtasi</div>
          <div style={text(64, { color: C.reel })}>esingizda?</div>
        </Rise>
      </Centered>
    </>
  );
}

// ───────────────────────────── 3. 갈림길 — 같은 사람, 같은 폰

const LANE_PHONE = { w: 400, h: 866, top: 350 };
/** 갈래 가운데 — B 는 인스타 오른쪽 버튼 줄을 피해 조금 안쪽으로 */
const LANE_X = { a: 270, b: 790 };

export function SplitScene() {
  const f = useCurrentFrame();
  const glitch = tween(f, 14, 4) * (1 - tween(f, 22, 10));
  const apart = tween(f, 20, 24, 0, 1, easeOut);
  const punch = 1 + 0.08 * (1 - tween(f, 20, 18));
  const sh = shake(f, glitch);
  const centerX = (W - 420) / 2;
  const leftX = lerp(centerX, LANE_X.a - LANE_PHONE.w / 2, apart);
  const rightX = lerp(centerX, LANE_X.b - LANE_PHONE.w / 2, apart);
  const phoneW = lerp(420, LANE_PHONE.w, apart);
  const phoneH = lerp(910, LANE_PHONE.h, apart);
  const top = lerp((H - 910) / 2 - 40, LANE_PHONE.top, apart);
  const violet = tween(f, 22, 20);
  const world = (
    <>
      <Lanes reveal={apart} />
      <Handset h={phoneH} w={phoneW} x={leftX} y={top}>
        <div style={{ position: "absolute", inset: 0, filter: "grayscale(1) brightness(0.65)" }}>
          <Feed h={phoneH} scroll={9.4 + f * 0.05} w={phoneW} />
        </div>
      </Handset>
      <Handset h={phoneH} w={phoneW} x={rightX} y={top} style={{ opacity: apart > 0.02 ? 1 : 0 }}>
        <div style={{ position: "absolute", inset: 0, filter: `grayscale(${1 - violet}) brightness(${0.65 + violet * 0.35})` }}>
          <Feed h={phoneH} scroll={9.4 + f * 0.05} w={phoneW} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(170deg, #8F86F0, ${C.violet} 60%, #4B3FC0)`, opacity: violet }}>
          <Img src={staticFile("story/korio-icon.png")} style={{ position: "absolute", left: "50%", top: "40%", width: 150, transform: "translate(-50%,-50%)", borderRadius: 34 }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "56%", textAlign: "center", fontFamily: DIN, fontSize: 64, color: "#fff", letterSpacing: 4 }}>KORIO</div>
        </div>
      </Handset>
    </>
  );
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Cam rotate={sh.r} scale={punch} x={sh.x} y={sh.y}>
        <Glitch amount={glitch} frame={f}>
          {world}
        </Glitch>
      </Cam>
      <Centered y={150}>
        <Rise p={tween(f, 0, 10) * (1 - tween(f, 16, 8))}>
          <div style={text(66)}>Endi tasavvur qiling:</div>
        </Rise>
      </Centered>
      <LaneLabels p={tween(f, 40, 16)} />
      <Centered y={1300}>
        <Rise p={tween(f, 50, 16)} style={{ display: "inline-block", padding: "26px 54px", borderRadius: 36, background: "rgba(9,8,15,0.86)", border: "2px solid rgba(255,255,255,0.1)" }}>
          <div style={text(60)}>Bir xil odam.</div>
          <div style={text(60, { color: C.dim })}>Bir xil telefon.</div>
        </Rise>
      </Centered>
    </>
  );
}

/** 두 갈래 바탕 — 왼쪽 잿빛, 오른쪽 보랏빛 (가운데 빛나는 금) */
function Lanes({ reveal, scene }: { reveal: number; scene?: string | null }) {
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: H, background: "#121118", opacity: reveal }} />
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 0,
          width: 540,
          height: H,
          background: `linear-gradient(180deg, #1B1440, ${C.violetDeep} 55%, #140F33)`,
          opacity: reveal,
          overflow: "hidden",
        }}
      >
        {scene ? <Img src={staticFile(`story/${scene}.webp`)} style={{ position: "absolute", left: -560, top: 0, height: H, opacity: 0.55, filter: "blur(3px) saturate(1.15)" }} /> : null}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(27,20,64,0.55), rgba(20,15,51,0.85))" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 538,
          top: 0,
          width: 4,
          height: H * reveal,
          background: "linear-gradient(180deg, rgba(255,255,255,0), #fff 20%, #B9B3FF 80%, rgba(255,255,255,0))",
          boxShadow: "0 0 30px #776EE2",
        }}
      />
    </>
  );
}

function LaneLabels({ p }: { p: number }) {
  const chip = (letter: string, label: string, bg: string, fg: string): ReactNode => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
      <div style={{ width: 62, height: 62, borderRadius: 18, background: bg, color: fg, fontFamily: DIN, fontSize: 46, lineHeight: "62px", textAlign: "center" }}>{letter}</div>
      <div style={text(38, { color: fg === "#fff" ? C.ink : C.dim })}>{label}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 268, display: "flex", opacity: p, transform: `translateY(${(1 - p) * -30}px)` }}>
      <div style={{ width: 540 }}>{chip("A", "Faqat reels", C.grey, C.dim)}</div>
      <div style={{ width: 540 }}>{chip("B", "+ 10 daqiqa KORIO", C.violet, "#fff")}</div>
    </div>
  );
}

// ───────────────────────────── 4. 1·7·30·90일 — 한쪽 세상만 읽히기 시작한다

const WHIP = 9;

export function DaysScene() {
  const f = useCurrentFrame();
  const idx = Math.min(BEATS.length - 1, Math.floor(f / BEAT));
  const local = f - idx * BEAT;
  // 날이 바뀔 때 — 화면이 위로 휙 넘어간다 (휩 팬)
  const outP = idx < BEATS.length - 1 ? tween(local, BEAT - WHIP, WHIP, 0, 1, easeIn) : 0;
  const inP = idx > 0 ? 1 - tween(local, 0, WHIP, 0, 1, easeOut) : 0;
  const whipY = -outP * 320 + inP * 320;
  const whipBlur = (outP + inP) * 26;
  // 마지막 — B 의 폰 화면 속으로 빨려 들어간다
  const dive = tween(f, 612, 48, 0, 1, easeIn);
  const drift = tween(local, 0, BEAT, 0, 1, easeInOut);
  const beat = BEATS[idx];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Cam
        blur={whipBlur + dive * 30}
        origin={`${LANE_X.b}px ${LANE_PHONE.top + LANE_PHONE.h / 2}px`}
        scale={lerp(1, 1.035, drift) * lerp(1, 8, dive)}
        x={lerp(0, -10, drift)}
        y={whipY}
      >
        <Lanes reveal={1} scene={beat.scene} />
        <LaneA beat={beat} f={f} idx={idx} local={local} />
        <LaneB beat={beat} idx={idx} local={local} />
      </Cam>
      <LaneLabels p={1 - dive} />
      <DayCounter f={f} />
    </>
  );
}

/** 위 가운데 날짜 — 슬롯처럼 아래에서 올라온다 */
function DayCounter({ f }: { f: number }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 118, height: 130, overflow: "hidden", textAlign: "center" }}>
      {BEATS.map((b, i) => {
        const start = i * BEAT;
        const inP = i === 0 ? tween(f, 0, 12) : tween(f, start - 4, 12);
        const outP = i < BEATS.length - 1 ? tween(f, start + BEAT - 4, 12) : tween(f, 612, 20);
        const y = (1 - inP) * 130 - outP * 130;
        if (inP <= 0 || outP >= 1) return null;
        return (
          <div key={b.day} style={{ position: "absolute", left: 0, right: 0, top: 0, transform: `translateY(${y}px)`, fontFamily: DIN, fontSize: 118, lineHeight: "130px", color: C.ink, letterSpacing: 2 }}>
            {b.day.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
}

function LaneA({ beat, f, idx, local }: { beat: Beat; f: number; idx: number; local: number }) {
  const x = LANE_X.a - LANE_PHONE.w / 2;
  const prev = idx === 0 ? 0 : BEATS[idx - 1].reels;
  const count = lerp(prev, beat.reels, tween(local, 6, 40));
  const dull = 0.55 - idx * 0.08;
  return (
    <>
      <Handset h={LANE_PHONE.h} w={LANE_PHONE.w} x={x} y={LANE_PHONE.top}>
        <div style={{ position: "absolute", inset: 0, filter: `grayscale(${0.5 + idx * 0.15}) brightness(${dull + 0.25})` }}>
          <Feed h={LANE_PHONE.h} scroll={f * 0.26} speed={0.07} w={LANE_PHONE.w} />
        </div>
      </Handset>
      <div style={{ position: "absolute", left: LANE_X.a - 240, width: 480, top: 1238, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 26px", borderRadius: 30, background: "rgba(255,61,127,0.14)", border: `2px solid ${C.reel}55` }}>
          <span style={{ color: C.reel, fontSize: 34 }}>▶</span>
          <Odometer color={C.ink} digits={5} size={52} value={Math.round(count)} />
          <span style={text(38, { color: C.dim })}>ta reel</span>
        </div>
      </div>
      <SignCard box={{ x: LANE_X.a - 210, y: 1362, w: 420, h: 200 }} f={f} line={scramble(beat.sign, 0, f, 3 + idx)} sub="???" tone="a" />
    </>
  );
}

function LaneB({ beat, idx, local }: { beat: Beat; idx: number; local: number }) {
  const x = LANE_X.b - LANE_PHONE.w / 2;
  const decode = tween(local, 40, 34, 0, 1, (t) => t);
  const meaning = tween(local, 78, 16);
  const gain = tween(local, 96, 16);
  const streakPop = spring({ frame: local - 8, fps: 30, config: { damping: 9, stiffness: 160 } });
  return (
    <>
      <Handset h={LANE_PHONE.h} w={LANE_PHONE.w} x={x} y={LANE_PHONE.top} style={{ boxShadow: "0 40px 110px rgba(0,0,0,0.6), 0 0 80px rgba(119,110,226,0.45), inset 0 0 0 2px rgba(255,255,255,0.14)" }}>
        <ClipView beat={beat} idx={idx} local={local} />
      </Handset>
      {/* 연속 학습일 */}
      <div
        style={{
          position: "absolute",
          left: x + LANE_PHONE.w - 96,
          top: LANE_PHONE.top + 18,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 18px 8px 12px",
          borderRadius: 30,
          background: "#FF8A1F",
          boxShadow: "0 10px 30px rgba(255,138,31,0.5)",
          transform: `scale(${Math.max(0, streakPop)})`,
        }}
      >
        <Img src={staticFile("story/streak-flame.svg")} style={{ width: 40, height: 40 }} />
        <span style={{ fontFamily: DIN, fontSize: 46, color: "#fff" }}>{beat.streak}</span>
      </div>
      <div style={{ position: "absolute", left: LANE_X.b - 240, width: 480, top: 1232, textAlign: "center" }}>
        <Rise p={gain} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 24px", borderRadius: 30, background: "rgba(88,204,2,0.16)", border: `2px solid ${C.green}88` }}>
          <Icon color={C.green} name="done" size={38} />
          <span style={text(31, { lineHeight: 1.12, textAlign: "left" })}>{beat.gain}</span>
        </Rise>
      </div>
      <SignCard box={{ x: LANE_X.b - 210, y: 1362, w: 420, h: 200 }} f={local} line={scramble(beat.sign, decode, local, 3 + idx)} meaning={meaning} sub={beat.meaning} tone="b" />
    </>
  );
}

/** 세상의 글자 — A 는 영영 기호, B 는 한국어로 풀리고 뜻이 붙는다 */
function SignCard({
  box,
  line,
  sub,
  tone,
  meaning = 0,
}: {
  box: { x: number; y: number; w: number; h: number };
  f: number;
  line: string;
  sub: string;
  tone: "a" | "b";
  meaning?: number;
}) {
  const a = tone === "a";
  const len = [...line].length;
  const size = len <= 3 ? 96 : len <= 5 ? 70 : 48;
  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        borderRadius: 34,
        background: a ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.96)",
        border: a ? "2px dashed rgba(255,255,255,0.18)" : "none",
        boxShadow: a ? "none" : "0 24px 60px rgba(0,0,0,0.45), 0 0 50px rgba(119,110,226,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <div style={{ fontFamily: KO, fontWeight: 800, fontSize: size, lineHeight: 1.05, color: a ? "rgba(245,243,255,0.35)" : "#16132B", letterSpacing: a ? 6 : 0 }}>{line}</div>
      <div
        style={{
          fontFamily: HEAD,
          fontWeight: 700,
          fontSize: 32,
          color: a ? "rgba(140,136,166,0.55)" : C.violet,
          opacity: a ? 1 : meaning,
          transform: `translateY(${a ? 0 : (1 - meaning) * 16}px)`,
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

/** B 폰 속 실제 앱 화면 — 그 날이 시작할 때 처음부터 틀고, 끝나면 마지막 프레임에 멈춘다 */
function ClipView({ beat, idx, local }: { beat: Beat; idx: number; local: number }) {
  const src = staticFile(`clips/${beat.clip}.mp4`);
  const style: CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
  if (local < beat.clipLen) {
    return (
      <Sequence from={idx * BEAT} layout="none">
        <OffthreadVideo muted src={src} style={style} />
      </Sequence>
    );
  }
  return (
    <Freeze frame={beat.clipLen - 1}>
      <OffthreadVideo muted src={src} style={style} />
    </Freeze>
  );
}

// ───────────────────────────── 5. 90일째, 서울 — 같은 질문, 다른 대답

const A_BOX = { x: 60, y: 1180, w: 640, h: 170 };

export function MeetScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 폰 화면 속에서 빠져나온다 → 아주 천천히 밀고 들어간다
  const enter = tween(f, 0, 26);
  const push = lerp(1.02, 1.1, tween(f, 20, 200, 0, 1, easeInOut));
  const tilt = tween(f, 90, 30, 0, 1, easeInOut);
  const crumble = tween(f, 150, 50, 0, 1, (t) => t);
  const sh = shake(f, f > 148 && f < 172 ? 0.5 : 0);
  // 마무리 문장 — 배경 초점이 나간다 (랙 포커스)
  const rack = tween(f, 212, 26, 0, 1, easeInOut);
  const hara = spring({ frame: f - 18, fps, config: { damping: 14, stiffness: 120 } });
  const cheer = f >= 176;
  const cheerPop = cheer ? spring({ frame: f - 176, fps, config: { damping: 8, stiffness: 200 } }) : 1;
  const bubble = spring({ frame: f - 46, fps, config: { damping: 12, stiffness: 170 } });
  const aIn = spring({ frame: f - 94, fps, config: { damping: 13, stiffness: 160 } });
  const bIn = spring({ frame: f - 122, fps, config: { damping: 13, stiffness: 160 } });
  const bDecode = tween(f, 126, 24, 0, 1, (t) => t);
  const aText = scramble("네… 어… 저는…", 0, f, 41);
  const bText = scramble("네! 조금 할 줄 알아요", bDecode, f, 43);
  const aShake = f > 104 && f < 150 ? Math.sin(f * 1.7) * 6 : 0;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Cam blur={(1 - enter) * 24 + rack * 12} origin="34% 36%" rotate={sh.r} scale={lerp(1.7, 1, enter) * push} x={sh.x} y={sh.y - tilt * 110}>
        <Img src={staticFile("story/scene_gyeongbokgung.webp")} style={{ position: "absolute", left: (W - 2304) / 2, top: 0, height: H, width: 2304 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(9,8,15,0.2) 0%, rgba(9,8,15,0) 40%, rgba(9,8,15,0.75) 100%)" }} />
        <Img
          src={staticFile(cheer ? "story/hara_cheer.png" : "story/hara_love.png")}
          style={{
            position: "absolute",
            left: 520,
            top: 560,
            width: 520,
            transform: `translateX(${(1 - hara) * 600}px) scale(${cheer ? lerp(0.9, 1, cheerPop) : 1})`,
            transformOrigin: "50% 100%",
          }}
        />
        {/* 하라의 질문 */}
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 470,
            width: 600,
            padding: "28px 32px",
            borderRadius: 40,
            background: "#fff",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            transform: `scale(${bubble})`,
            transformOrigin: "100% 100%",
          }}
        >
          <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 46, lineHeight: 1.22, color: "#16132B" }}>
            안녕하세요!
            <br />
            한국어 할 줄 알아요?
          </div>
          <div style={text(32, { color: "#6B6785", marginTop: 12 })}>Koreyscha gapira olasizmi?</div>
          <div style={{ position: "absolute", right: -18, bottom: 40, width: 0, height: 0, borderTop: "18px solid transparent", borderBottom: "18px solid transparent", borderLeft: "26px solid #fff" }} />
        </div>
      </Cam>
      {/* 대답 — 내 쪽(POV) 말풍선 둘 */}
      {crumble <= 0 ? (
        <Reply box={A_BOX} letter="A" p={aIn} shiftX={aShake} tone="a">
          <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 54, color: "rgba(245,243,255,0.4)", letterSpacing: 4 }}>{aText}</div>
        </Reply>
      ) : null}
      <Disintegrate box={A_BOX} color="#4A4858" cols={18} p={crumble} rows={6} />
      <Reply box={{ x: 330, y: 1385, w: 640, h: 200 }} letter="B" p={bIn} tone="b">
        <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 56, color: "#fff" }}>{bText}</div>
        <div style={text(32, { color: "rgba(255,255,255,0.8)", marginTop: 8, opacity: tween(f, 152, 14) })}>Ha, biroz gapira olaman!</div>
      </Reply>
      {/* 마무리 문장 */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(9,8,15,0.72)", opacity: rack }} />
      <Centered y={700}>
        <Rise p={tween(f, 222, 16)}>
          <div style={text(70, { color: C.dim })}>Vaqt bir xil edi.</div>
        </Rise>
        <Rise p={tween(f, 240, 16)} style={{ marginTop: 40 }}>
          <div style={text(84)}>Farqi — kuniga atigi</div>
          <div style={{ ...text(170, { color: C.green, letterSpacing: -2 }), fontFamily: DIN, marginTop: 10, textShadow: "0 0 60px rgba(88,204,2,0.45)" }}>10 daqiqa.</div>
        </Rise>
      </Centered>
    </>
  );
}

function Reply({
  box,
  letter,
  tone,
  p,
  shiftX = 0,
  children,
}: {
  box: { x: number; y: number; w: number; h: number };
  letter: string;
  tone: "a" | "b";
  p: number;
  shiftX?: number;
  children: ReactNode;
}) {
  const a = tone === "a";
  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        borderRadius: 40,
        padding: "0 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: a ? "#2A2933" : `linear-gradient(135deg, #8F86F0, ${C.violet})`,
        border: a ? "2px solid rgba(255,255,255,0.12)" : "none",
        boxShadow: a ? "0 20px 50px rgba(0,0,0,0.4)" : "0 24px 70px rgba(119,110,226,0.55)",
        transform: `translateX(${shiftX}px) scale(${p})`,
        transformOrigin: a ? "0% 100%" : "100% 100%",
        opacity: Math.min(1, p * 1.5),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -26,
          [a ? "left" : "right"]: 30,
          width: 56,
          height: 56,
          borderRadius: 16,
          background: a ? C.grey : C.violet,
          border: "3px solid #09080F",
          fontFamily: DIN,
          fontSize: 40,
          lineHeight: "50px",
          textAlign: "center",
          color: a ? C.dim : "#fff",
        }}
      >
        {letter}
      </div>
      {children}
    </div>
  );
}

// ───────────────────────────── 6. 얻는 것 — 폰 둘레를 카메라가 돈다

const GAINS: { at: number; side: "l" | "r"; y: number; icon: ReactNode; color: string; label: string }[] = [
  { at: 30, side: "l", y: 560, icon: <span style={{ fontFamily: KO, fontWeight: 800, fontSize: 44 }}>ㄱ</span>, color: C.violet, label: "Hangul — noldan" },
  { at: 52, side: "r", y: 790, icon: <Icon name="school" size={44} />, color: "#F2A40B", label: "Qisqa kunlik darslar" },
  { at: 74, side: "l", y: 1020, icon: <Icon name="mic" size={44} />, color: "#2DB55D", label: "AI ustoz bilan jonli suhbat" },
  { at: 96, side: "r", y: 1250, icon: <Icon name="sparkles" size={44} />, color: "#F0548E", label: "TOPIK va ingliz tili" },
];

const FLOATERS = ["ㄱ", "한", "ㅎ", "국", "어", "ㅏ", "A", "ㄴ", "B", "말", "ㅗ", "TOPIK"];

export function GainsScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = tween(f, 0, 24);
  const orbit = Math.sin(f / 34) * 16;
  const leave = tween(f, 150, 30, 0, 1, easeIn);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Cam blur={(1 - enter) * 18 + leave * 16} rotateY={lerp(-45, 0, enter)} scale={lerp(1.25, 1, enter) * lerp(1, 0.55, leave)}>
        <Glow color="rgba(119,110,226,0.55)" r={760} x={540} y={900} />
        {FLOATERS.map((g, i) => {
          const depth = 0.4 + rand(i * 5) * 0.8;
          const gx = rand(i * 13) * W;
          const gy = ((rand(i * 17) * H - f * 2.2 * depth) % H + H) % H;
          return (
            <div key={i} style={{ position: "absolute", left: gx, top: gy, fontFamily: KO, fontWeight: 800, fontSize: 60 + depth * 70, color: "rgba(185,179,255,0.16)", transform: `translateX(${orbit * depth * 3}px)` }}>
              {g}
            </div>
          );
        })}
        <div style={{ position: "absolute", inset: 0, perspective: 1600 }}>
          <div style={{ position: "absolute", left: 340, top: 470, width: 400, height: 866, transform: `rotateY(${orbit}deg) rotateX(6deg)`, transformStyle: "preserve-3d" }}>
            <Handset h={866} w={400} x={0} y={0} style={{ boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 90px rgba(119,110,226,0.5)" }}>
              <Img src={staticFile("stills/home.png")} style={{ position: "absolute", left: 0, top: 0, width: "100%" }} />
            </Handset>
          </div>
        </div>
        {GAINS.map((g) => {
          const p = spring({ frame: f - g.at, fps, config: { damping: 12, stiffness: 150 } });
          const from = g.side === "l" ? -380 : 380;
          return (
            <div
              key={g.label}
              style={{
                position: "absolute",
                top: g.y,
                [g.side === "l" ? "left" : "right"]: g.side === "l" ? 40 : 110,
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "18px 28px 18px 18px",
                borderRadius: 34,
                background: "rgba(255,255,255,0.97)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                transform: `translateX(${(1 - p) * from}px) rotate(${(1 - p) * (g.side === "l" ? -8 : 8)}deg) translateX(${orbit * (g.side === "l" ? 0.6 : -0.6)}px)`,
                opacity: Math.min(1, p * 2),
              }}
            >
              <div style={{ width: 76, height: 76, borderRadius: 24, background: g.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{g.icon}</div>
              <div style={text(38, { color: "#16132B", whiteSpace: "nowrap" })}>{g.label}</div>
            </div>
          );
        })}
      </Cam>
      <Centered y={190}>
        <Rise p={tween(f, 6, 16) * (1 - leave)}>
          <div style={text(72)}>KORIO’da sizni</div>
          <div style={text(72, { color: C.violet })}>nima kutadi?</div>
        </Rise>
      </Centered>
    </>
  );
}

// ───────────────────────────── 7. 끝 — 타이머가 앱 아이콘으로 뒤집힌다

export const PILL_CORNER = { x: 900, y: 92, scale: 1 };
export const PILL_END = { x: 540, y: 760, scale: 2.6 };
export const FLIP_AT = 52;

export function EndScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flipOut = tween(f, FLIP_AT - 10, 10, 0, 1, easeIn);
  const flipIn = tween(f, FLIP_AT, 14, 0, 1, easeOut);
  const iconPop = spring({ frame: f - FLIP_AT, fps, config: { damping: 9, stiffness: 140 } });
  const crash = 1 + 0.12 * (1 - tween(f, FLIP_AT, 20));
  const rings = tween(f, FLIP_AT, 40, 0, 1, (t) => t);
  const fly = tween(f, 0, 26, 0, 1, easeInOut);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.night }} />
      <Cam scale={crash}>
        <Glow color="rgba(119,110,226,0.6)" opacity={flipIn} r={720} x={540} y={760} />
        {[0, 1, 2].map((i) => {
          const t = Math.max(0, rings - i * 0.18);
          if (t <= 0 || t >= 1) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 540 - 180 - t * 420,
                top: 760 - 180 - t * 420,
                width: 360 + t * 840,
                height: 360 + t * 840,
                borderRadius: "50%",
                border: `${6 * (1 - t)}px solid rgba(185,179,255,${1 - t})`,
              }}
            />
          );
        })}
        {/* 타이머(앞면) → 아이콘(뒷면) */}
        {f < FLIP_AT ? (
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `perspective(1400px) rotateY(${flipOut * 90}deg)`, transformOrigin: `${PILL_END.x}px ${PILL_END.y}px` }}>
            <TimerPill
              frame={f + 1560}
              scale={lerp(PILL_CORNER.scale, PILL_END.scale, fly)}
              x={lerp(PILL_CORNER.x, PILL_END.x, fly)}
              y={lerp(PILL_CORNER.y, PILL_END.y, fly) - Math.sin(fly * Math.PI) * 120}
            />
          </div>
        ) : (
          <Img
            src={staticFile("story/korio-icon.png")}
            style={{
              position: "absolute",
              left: 540 - 170,
              top: 760 - 170,
              width: 340,
              height: 340,
              borderRadius: 78,
              boxShadow: "0 30px 90px rgba(119,110,226,0.6)",
              transform: `perspective(1400px) rotateY(${(1 - flipIn) * -90}deg) scale(${lerp(0.7, 1, iconPop)})`,
            }}
          />
        )}
      </Cam>
      <Centered y={420}>
        <Rise p={tween(f, 6, 14) * (1 - tween(f, FLIP_AT - 6, 10))}>
          <div style={text(70, { color: C.dim })}>Bu video tugayapti.</div>
        </Rise>
      </Centered>
      <Centered y={1010}>
        <Rise p={tween(f, FLIP_AT + 8, 16)}>
          <div style={text(66, { color: C.dim })}>Keyingi 50 soniyangiz</div>
        </Rise>
        <Rise p={tween(f, FLIP_AT + 18, 16)}>
          <div style={text(104)}>
            KORIO’da <span style={{ color: C.violet }}>o‘tsin.</span>
          </div>
        </Rise>
      </Centered>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1330, textAlign: "center", opacity: tween(f, FLIP_AT + 34, 14) }}>
        <div style={text(36, { color: C.dim, marginBottom: 26 })}>Yuklab olish — bepul</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 26 }}>
          <StoreButton bg="#000" icon="play" big="Google Play" small="Yuklab oling" p={spring({ frame: f - FLIP_AT - 36, fps, config: { damping: 12 } })} />
          <StoreButton bg="#2AABEE" icon="plane" big="@KorioLoginBot" small="Telegram mini ilova" p={spring({ frame: f - FLIP_AT - 42, fps, config: { damping: 12 } })} />
        </div>
      </div>
    </>
  );
}

function StoreButton({ bg, icon, small, big, p }: { bg: string; icon: "play" | "plane"; small: string; big: string; p: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 30px",
        borderRadius: 28,
        background: bg,
        border: "2px solid rgba(255,255,255,0.18)",
        transform: `scale(${p})`,
      }}
    >
      <Icon color="#fff" name={icon} size={56} />
      <div style={{ textAlign: "left" }}>
        <div style={text(24, { color: "rgba(255,255,255,0.75)" })}>{small}</div>
        <div style={text(40)}>{big}</div>
      </div>
    </div>
  );
}

// ───────────────────────────── 화면 위 고정 (카메라 밖)

/** 이 영상 자신의 시계 — 오른쪽 위 알약. 끝에서 가운데로 와서 커진다 */
export function TimerPill({ frame, x, y, scale }: { frame: number; x: number; y: number; scale: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 26,
        background: "rgba(9,8,15,0.78)",
        border: "2px solid rgba(255,255,255,0.16)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: 7, background: C.reel, opacity: frame % 30 < 15 ? 1 : 0.3 }} />
      <span style={{ fontFamily: DIN, fontSize: 38, color: C.ink }}>{`0:${String(Math.floor(frame / 30)).padStart(2, "0")}`}</span>
      <span style={{ fontFamily: DIN, fontSize: 30, color: C.dim }}>/ 0:57</span>
    </div>
  );
}

export { easeInOut };
