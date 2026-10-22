import type { ReactNode } from "react";
import { Easing, Freeze, Img, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ClipTrack } from "../Phone";
import { Icon } from "../theme";
import {
  boxes,
  Caption,
  COLOR,
  easeInOut,
  H,
  inOut,
  K,
  Lift,
  lerp,
  MONO,
  Phone,
  Push,
  SANS,
  SERIF,
  StillView,
  Tap,
  toVideo,
  tween,
  W,
  type Box,
} from "./kit";
import { scene, type LaunchScene } from "./plan";

type Props = { s: LaunchScene & { from: number } };

function useScene(s: Props["s"]) {
  const f = useCurrentFrame();
  return { f, g: f + s.from };
}

function SceneCaption({ s, f }: { s: Props["s"]; f: number }) {
  if (!s.caption) return null;
  const c = s.caption;
  return <Caption accent={c.accent} accentInk={c.accentInk} at={c.at} color={c.ink} end={s.dur - 2} frame={f} text={c.text} />;
}

/** 휴대폰 화면 위에 까는 어둠 — 카드를 떼어 냈을 때 화면은 한 발 물러난다 */
function Dim({ amount }: { amount: number }) {
  return amount > 0 ? <div style={{ position: "absolute", inset: 0, background: `rgba(14,10,30,${amount})` }} /> : null;
}

const center = (b: Box, scroll: number, g: number) => {
  const v = toVideo(b, scroll, g);
  return { x: v.x + v.w / 2, y: v.y + v.h / 2 };
};

/** 학습 모드 카드를 3열 격자로 */
const GRID = { cellW: 300, gapX: 26, rowH: 272, top: 612 };
function gridSpot(i: number, count: number) {
  const row = Math.floor(i / 3);
  const inRow = Math.min(3, count - row * 3);
  const left = (W - (inRow * GRID.cellW + (inRow - 1) * GRID.gapX)) / 2;
  const col = i % 3;
  return { cx: left + GRID.cellW / 2 + col * (GRID.cellW + GRID.gapX), cy: GRID.top + GRID.rowH / 2 + row * GRID.rowH };
}

// ───────────────────────────── 0. 질문

export function HookScene({ s }: Props) {
  const { f } = useScene(s);
  const word = (at: number) => tween(f, at, 16);
  // 첫 프레임부터 질문이 보이게 (릴스 미리보기)
  const a = word(-8);
  const b = word(2);
  const pill = tween(f, 0, 18);
  const out = 1 - tween(f, 62, 12, 0, 1, easeInOut);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 760,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: 128,
        letterSpacing: -4,
        lineHeight: 1.1,
        color: COLOR.ink,
        opacity: out,
      }}
    >
      <div style={{ opacity: a, transform: `translateY(${(1 - a) * -60}px)`, filter: `blur(${(1 - a) * 14}px)` }}>Nimani</div>
      <div style={{ display: "inline-block", position: "relative", padding: "0 34px 14px", marginTop: 8 }}>
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 48,
            background: COLOR.purple,
            transform: `scaleX(${pill})`,
            transformOrigin: "0 50%",
          }}
        />
        <span
          style={{
            position: "relative",
            color: "#fff",
            display: "inline-block",
            opacity: b,
            transform: `translateY(${(1 - b) * -60}px)`,
            filter: `blur(${(1 - b) * 14}px)`,
          }}
        >
          o‘rganmoqchisiz?
        </span>
      </div>
    </div>
  );
}

// ───────────────────────────── 1. 홈

const HOME_SCROLL_END = 700;

export function HomeScene({ s }: Props) {
  const { f, g } = useScene(s);
  const enter = tween(f, 0, 28);
  const scroll = tween(f, 104, 42, 0, HOME_SCROLL_END, easeInOut);
  const [streak] = boxes("home", "streak");
  const [hero] = boxes("home", "hero");
  const p1 = inOut(f, 26, 84);
  const p2 = inOut(f, 38, 88);
  return (
    <>
      <Phone g={g} style={{ transform: `translateY(${(1 - enter) * 1150}px) rotate(${(1 - enter) * 6}deg)` }}>
        <StillView name="home" nav scroll={scroll} />
        <Dim amount={0.42 * Math.max(p1, p2)} />
      </Phone>
      <Lift b={streak} g={g} name="home" p={p1} scroll={0} to={{ cx: 500, cy: 690, scale: 1.12, rotate: -2.5 }} />
      <Lift b={hero} g={g} name="home" p={p2} scroll={0} to={{ cx: 585, cy: 1250, scale: 1.08, rotate: 2 }} />
      <SceneCaption f={f} s={s} />
    </>
  );
}

// ───────────────────────────── 2. 어떤 언어

export function LangsScene({ s }: Props) {
  const { f, g } = useScene(s);
  const scroll = tween(f, 0, 16, HOME_SCROLL_END, 0, easeInOut);
  const [lang] = boxes("home", "lang");
  const tap = center(lang, 0, g);
  const push = tween(f, 42, 18, 0, 1, easeInOut);
  const [ko, en] = boxes("courses", "card");
  const p1 = inOut(f, 66, 114);
  const p2 = inOut(f, 74, 118);
  return (
    <>
      <Phone g={g}>
        <Push from={<StillView name="home" nav scroll={scroll} />} p={push} to={<StillView name="courses" />} />
        <Dim amount={0.42 * Math.max(p1, p2)} />
      </Phone>
      <Tap at={36} frame={f} x={tap.x} y={tap.y} />
      <Lift b={ko} g={g} name="courses" p={p1} scroll={0} to={{ cx: 540, cy: 870, scale: 1.3, rotate: -2 }} />
      <Lift b={en} g={g} name="courses" p={p2} scroll={0} to={{ cx: 540, cy: 1230, scale: 1.3, rotate: 2 }} />
      <SceneCaption f={f} s={s} />
    </>
  );
}

// ───────────────────────────── 3·4. 학습 모드 (한국어 · 영어)

function ModeCards({ name, f, g, start, back }: { name: string; f: number; g: number; start: number; back: number }) {
  const cards = boxes(name, "card", 100);
  const scale = GRID.cellW / (cards[0].w * K);
  return (
    <>
      {cards.map((b, i) => {
        const p = Math.min(tween(f, start + i * 4, 22), 1 - tween(f, back + i * 1.5, 18, 0, 1, easeInOut));
        const spot = gridSpot(i, cards.length);
        return <Lift b={b} g={g} key={i} name={name} p={p} scroll={0} to={{ cx: spot.cx, cy: spot.cy, scale, rotate: 0 }} />;
      })}
    </>
  );
}

function modesDim(f: number, start: number, back: number) {
  return 0.55 * Math.min(tween(f, start, 20), 1 - tween(f, back, 24, 0, 1, easeInOut));
}

export function ModesKoScene({ s }: Props) {
  const { f, g } = useScene(s);
  const [ko] = boxes("courses", "card");
  const tap = center(ko, 0, g);
  const push = tween(f, 24, 18, 0, 1, easeInOut);
  return (
    <>
      <Phone g={g}>
        <Push from={<StillView name="courses" />} p={push} to={<StillView name="modes-ko" />} />
        <Dim amount={modesDim(f, 50, 152)} />
      </Phone>
      <Tap at={18} frame={f} x={tap.x} y={tap.y} />
      <ModeCards back={150} f={f} g={g} name="modes-ko" start={50} />
      <SceneCaption f={f} s={s} />
    </>
  );
}

export function ModesEnScene({ s }: Props) {
  const { f, g } = useScene(s);
  const push = tween(f, 4, 18, 0, 1, easeInOut);
  // 언어가 바뀐다는 표시 — KR → US 칩이 화면 위에서 뒤집힌다
  const chip = inOut(f, 4, 40, 12);
  const flip = tween(f, 10, 14, 0, 1, easeInOut);
  return (
    <>
      <Phone g={g}>
        <Push from={<StillView name="modes-ko" />} p={push} to={<StillView name="modes-en" />} />
        <Dim amount={modesDim(f, 26, 100)} />
      </Phone>
      <div
        style={{
          position: "absolute",
          left: W / 2 - 150,
          top: 470,
          width: 300,
          height: 86,
          borderRadius: 43,
          background: "#fff",
          boxShadow: "0 16px 40px rgba(10,6,30,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 36,
          color: COLOR.ink,
          opacity: chip,
          transform: `translateY(${(1 - chip) * 30}px) rotateX(${flip < 0.5 ? flip * 180 : (flip - 1) * 180}deg)`,
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 30, background: "#EEF2FF", borderRadius: 12, padding: "4px 12px" }}>
          {flip < 0.5 ? "KR" : "US"}
        </span>
        {flip < 0.5 ? "Koreys tili" : "Ingliz tili"}
      </div>
      <ModeCards back={100} f={f} g={g} name="modes-en" start={26} />
      <SceneCaption f={f} s={s} />
    </>
  );
}

// ───────────────────────────── 5. 통계

export function StatsScene({ s }: Props) {
  const { f, g } = useScene(s);
  const push = tween(f, 2, 20, 0, 1, easeInOut);
  const scroll = f < 160 ? tween(f, 86, 24, 0, 300, easeInOut) : tween(f, 160, 26, 300, 760, easeInOut);
  const cards = boxes("stats", "card");
  const [today1, today2, , path, weekly, radar] = cards;
  const b1 = inOut(f, 26, 72);
  const b2 = inOut(f, 108, 152);
  const b3 = inOut(f, 190, 234);
  const b4 = inOut(f, 200, 238);
  return (
    <>
      <Phone g={g}>
        <Push dir="up" from={<StillView name="modes-en" />} p={push} to={<StillView name="stats" nav scroll={scroll} />} />
        <Dim amount={0.5 * Math.max(b1, b2, b3, b4)} />
      </Phone>
      <Lift b={today1} g={g} name="stats" p={b1} scroll={0} to={{ cx: 330, cy: 860, scale: 1.5, rotate: -3 }} />
      <Lift b={today2} g={g} name="stats" p={b1} scroll={0} to={{ cx: 750, cy: 860, scale: 1.5, rotate: 3 }} />
      <Lift b={path} g={g} name="stats" p={b2} reveal={tween(f, 108, 26)} scroll={300} to={{ cx: 540, cy: 1180, scale: 1.12 }} />
      <Lift b={weekly} g={g} name="stats" p={b3} reveal={tween(f, 194, 28)} scroll={760} to={{ cx: 540, cy: 790, scale: 1.32, rotate: -1.5 }} />
      <Lift b={radar} g={g} name="stats" p={b4} scroll={760} to={{ cx: 540, cy: 1410, scale: 0.9, rotate: 1.5 }} />
      <SceneCaption f={f} s={s} />
    </>
  );
}

// ───────────────────────────── 6~8. 핵심 기능 (실제 촬영 클립)

const FEATURE = {
  tutor: { name: "tutor", trim: 150 },
  speaking: { name: "speaking", trim: 15 },
  topik: { name: "topik", trim: 8 },
} as const;

/** 앞 장면 마지막 화면을 멈춘 채로 */
function FrozenClip({ name, frame }: { name: string; frame: number }) {
  return (
    <Freeze frame={0}>
      <OffthreadVideo muted src={staticFile(`clips/${name}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={frame} />
    </Freeze>
  );
}

function FeatureScene({ s, clip, from, children }: Props & { clip: { name: string; trim: number }; from: ReactNode; children?: ReactNode }) {
  const { f, g } = useScene(s);
  const push = tween(f, 0, 20, 0, 1, easeInOut);
  return (
    <>
      <Phone g={g}>
        <Push dir="up" from={from} p={push} to={<ClipTrack clip={clip} dur={s.dur} />} />
      </Phone>
      {children}
      <SceneCaption f={f} s={s} />
    </>
  );
}

export function TutorScene({ s }: Props) {
  return <FeatureScene clip={FEATURE.tutor} from={<StillView name="stats" nav scroll={760} />} s={s} />;
}

export function SpeakingScene({ s }: Props) {
  const f = useCurrentFrame();
  const tutor = scene("tutor");
  // 점수 고리 — 촬영본에서 점수가 뜨는 때(63프레임)에 맞춰 0 → 95
  const ring = tween(f, 50, 36, 0, 0.95);
  const show = tween(f, 46, 14);
  const r = 112;
  return (
    <FeatureScene clip={FEATURE.speaking} from={<FrozenClip frame={FEATURE.tutor.trim + tutor.dur} name="tutor" />} s={s}>
      <div
        style={{
          position: "absolute",
          left: 860 - 150,
          top: 1180 - 150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 24px 60px rgba(10,6,30,0.35)",
          opacity: show,
          transform: `scale(${0.6 + show * 0.4})`,
        }}
      >
        <svg height={300} style={{ position: "absolute", inset: 0 }} width={300}>
          <circle cx={150} cy={150} fill="none" r={r} stroke="#F1EEF8" strokeWidth={22} />
          <circle
            cx={150}
            cy={150}
            fill="none"
            r={r}
            stroke={COLOR.green}
            strokeDasharray={`${2 * Math.PI * r * ring} ${2 * Math.PI * r}`}
            strokeLinecap="round"
            strokeWidth={22}
            transform="rotate(-90 150 150)"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 96, color: COLOR.ink, lineHeight: 1 }}>{Math.round((ring / 0.95) * 95)}</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 28, color: "#6B6880", marginTop: 6 }}>Talaffuz</div>
        </div>
      </div>
    </FeatureScene>
  );
}

export function TopikScene({ s }: Props) {
  const speaking = scene("speaking");
  return <FeatureScene clip={FEATURE.topik} from={<FrozenClip frame={FEATURE.speaking.trim + speaking.dur} name="speaking" />} s={s} />;
}

// ───────────────────────────── 9. 단어 폭풍

const STORM = [
  ["Lug‘at", SANS], ["Grammatika", SERIF], ["Hangul", MONO], ["TOPIK", SANS], ["Talaffuz", SERIF], ["Tinglash", SANS],
  ["Gapirish", MONO], ["Iboralar", SERIF], ["Jonli suhbat", SANS], ["So‘z kartalari", SERIF], ["Statistika", MONO],
  ["AI ustoz", SANS], ["O‘quv yo‘li", SERIF], ["Imtihon", MONO],
] as const;
const STORM_COLORS = [COLOR.yellow, "#fff", COLOR.pink, "#8FE3C5", "#AFC3FF", COLOR.coral];

export function StormScene({ s }: Props) {
  const { f, g } = useScene(s);
  const topik = scene("topik");
  const drop = tween(f, 0, 18, 0, 1, Easing.in(Easing.cubic));
  return (
    <>
      {drop < 1 ? (
        <Phone g={g} style={{ transform: `translateY(${drop * 1500}px) scale(${1 - drop * 0.15})` }}>
          <FrozenClip frame={FEATURE.topik.trim + topik.dur} name="topik" />
        </Phone>
      ) : null}
      {[...STORM, ...STORM].map(([word, font], i) => {
        const start = 2 + i * 1.6;
        const q = tween(f, start, 28, 0, 1, Easing.in(Easing.quad));
        if (q <= 0 || q >= 1) return null;
        const angle = (i * 137.5 * Math.PI) / 180;
        const dist = lerp(40, 900, q);
        const x = W / 2 + Math.cos(angle) * dist;
        const y = H / 2 + Math.sin(angle) * dist * 1.2;
        const scale = lerp(0.35, 3.2, q);
        const opacity = q < 0.2 ? q / 0.2 : q > 0.8 ? (1 - q) / 0.2 : 1;
        return (
          <div
            key={`${word}-${i}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              fontFamily: font,
              fontStyle: font === SERIF ? "italic" : "normal",
              fontWeight: font === SANS ? 700 : 400,
              fontSize: 62,
              whiteSpace: "nowrap",
              color: STORM_COLORS[i % STORM_COLORS.length],
              opacity,
              filter: q > 0.6 ? `blur(${(q - 0.6) * 8}px)` : undefined,
            }}
          >
            {word}
          </div>
        );
      })}
    </>
  );
}

// ───────────────────────────── 10. 한 줄

export function PunchScene({ s }: Props) {
  const { f } = useScene(s);
  const { fps } = useVideoConfig();
  const words = ["Bugun", "boshlang"];
  const dot = spring({ frame: f - 18, fps, config: { damping: 12, stiffness: 180 } });
  const out = 1 - tween(f, s.dur - 10, 10, 0, 1, easeInOut);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 800,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: 150,
        letterSpacing: -5,
        lineHeight: 1.05,
        color: COLOR.ink,
        opacity: out,
      }}
    >
      {words.map((word, i) => {
        const o = tween(f, 2 + i * 6, 16);
        return (
          <div key={word} style={{ opacity: o, transform: `translateY(${(1 - o) * 50}px)`, filter: `blur(${(1 - o) * 14}px)` }}>
            {word}
            {i === words.length - 1 ? (
              <span
                style={{
                  display: "inline-block",
                  width: 34,
                  height: 34,
                  marginLeft: 10,
                  borderRadius: "50%",
                  background: COLOR.purple,
                  transform: `scale(${dot})`,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────────── 11. 모아 보기

const TILES: { label: string; color: string; ink: string; still?: string; clip?: { name: string; frame: number } }[] = [
  { label: "Bosh sahifa", color: COLOR.purple, ink: "#fff", still: "home" },
  { label: "Ikki til", color: COLOR.yellow, ink: COLOR.ink, still: "courses" },
  { label: "Koreys tili", color: COLOR.green, ink: "#fff", still: "modes-ko" },
  { label: "Ingliz tili", color: COLOR.blue, ink: "#fff", still: "modes-en" },
  { label: "Statistika", color: "#2A2640", ink: "#fff", still: "stats" },
  { label: "AI ustoz", color: COLOR.indigo, ink: "#fff", clip: { name: "tutor", frame: 270 } },
  { label: "Talaffuz", color: COLOR.coral, ink: "#fff", clip: { name: "speaking", frame: 110 } },
  { label: "TOPIK", color: COLOR.navy, ink: "#fff", clip: { name: "topik", frame: 100 } },
];

export function MosaicScene({ s }: Props) {
  const { f } = useScene(s);
  const zoom = lerp(1.14, 1, tween(f, 0, s.dur, 0, 1, easeInOut));
  const tileW = 440;
  const tileH = 370;
  const left = (W - (tileW * 2 + 30)) / 2;
  const top = (H - (tileH * 4 + 30 * 3)) / 2;
  const shot = 210;
  const k = shot / 390;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})` }}>
      {TILES.map((tile, i) => {
        const o = tween(f, i * 3, 18);
        const x = left + (i % 2) * (tileW + 30);
        const y = top + Math.floor(i / 2) * (tileH + 30);
        return (
          <div
            key={tile.label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: tileW,
              height: tileH,
              borderRadius: 40,
              background: tile.color,
              overflow: "hidden",
              opacity: o,
              transform: `translateY(${(1 - o) * 70}px) scale(${0.85 + o * 0.15})`,
            }}
          >
            <div style={{ position: "absolute", left: 32, top: 28, fontFamily: SANS, fontWeight: 700, fontSize: 38, color: tile.ink }}>{tile.label}</div>
            <div
              style={{
                position: "absolute",
                left: tileW - shot - 26,
                top: 96,
                width: shot,
                height: 844 * k,
                borderRadius: 26,
                overflow: "hidden",
                background: "#fff",
                border: "6px solid #0E0D12",
                transform: "rotate(-5deg)",
                boxShadow: "0 18px 40px rgba(10,6,30,0.35)",
              }}
            >
              {tile.still ? (
                <Img src={staticFile(`stills/${tile.still}.png`)} style={{ width: shot }} />
              ) : tile.clip ? (
                <FrozenClip frame={tile.clip.frame} name={tile.clip.name} />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────────── 12. 마무리

export const TELEGRAM_BOT = "@KorioLoginBot";
const STORES = [
  { icon: "apple", small: "Yuklab oling", big: "App Store", bg: COLOR.ink },
  { icon: "play", small: "Yuklab oling", big: "Google Play", bg: COLOR.ink },
  { icon: "plane", small: "Telegram mini ilova", big: TELEGRAM_BOT, bg: "#2AABEE" },
] as const;

export function EndScene({ s }: Props) {
  const { f } = useScene(s);
  const letters = "KORIO".split("");
  const sub = tween(f, 18, 18);
  const head = tween(f, 32, 18);
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 210, letterSpacing: -6, color: COLOR.purple, lineHeight: 1 }}>
          {letters.map((letter, i) => {
            const o = tween(f, 2 + i * 3, 18);
            return (
              <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${(1 - o) * 70}px)`, filter: `blur(${(1 - o) * 12}px)` }}>
                {letter}
              </span>
            );
          })}
        </div>
        <div style={{ marginTop: 22, fontFamily: SANS, fontWeight: 600, fontSize: 42, color: "#57536B", opacity: sub }}>
          Koreys va ingliz tili — bitta ilovada
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1010,
          textAlign: "center",
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 70,
          letterSpacing: -2,
          color: COLOR.ink,
          opacity: head,
          transform: `translateY(${(1 - head) * 30}px)`,
        }}
      >
        Hoziroq yuklab oling
      </div>
      {STORES.map((store, i) => {
        const o = tween(f, 44 + i * 6, 20);
        const pressed = i === 0 && f >= 112 && f < 119 ? 0.96 : 1;
        return (
          <div
            key={store.big}
            style={{
              position: "absolute",
              left: (W - 720) / 2,
              top: 1150 + i * 150,
              width: 720,
              height: 124,
              borderRadius: 62,
              background: store.bg,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 30,
              padding: "0 54px",
              boxShadow: "0 16px 40px rgba(10,6,30,0.22)",
              opacity: o,
              transform: `translateY(${(1 - o) * 40}px) scale(${pressed})`,
            }}
          >
            <Icon name={store.icon} size={64} />
            <div style={{ fontFamily: SANS, lineHeight: 1.05 }}>
              <div style={{ fontWeight: 600, fontSize: 26, opacity: 0.8 }}>{store.small}</div>
              <div style={{ fontWeight: 700, fontSize: 48 }}>{store.big}</div>
            </div>
          </div>
        );
      })}
      <Tap at={112} frame={f} x={W / 2 + 200} y={1212} />
    </>
  );
}
