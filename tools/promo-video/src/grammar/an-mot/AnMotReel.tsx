/** 안 vs 못 — voiced Uzbek grammar reel with a visual change on every teaching beat. */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Sequence, spring, staticFile, useCurrentFrame } from "remotion";
import lines from "./lines.json";
import timing from "./timing.json";

const FPS = 30;
const C = {
  bg: "#11182B",
  panel: "#1B2740",
  white: "#F8F7F2",
  muted: "#AAB7C8",
  line: "#40516B",
  lime: "#D8F64B",
  teal: "#47D6C2",
  red: "#FF6C73",
  yellow: "#FFD85A",
} as const;
const LATIN = '"Segoe UI Black", "Segoe UI", sans-serif';
const KOREAN = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => 1 - Math.pow(1 - clamp(n), 3);
const active = (f: number, at: number, duration = 12) => ease((f - at) / duration);
const bounce = (f: number, at: number) => f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { stiffness: 210, damping: 17, mass: 0.75 } });

type Key = "hook" | "lead" | "body1" | "loop1" | "body2" | "loop2" | "body3" | "cta";
type Clip = { id: string; voice: string; subtitle: string; start: number; duration: number };
type Chapter = { key: Key; start: number; duration: number; clips: Clip[] };
const chapters: Chapter[] = [];
for (const entry of lines.chapters) {
  const start = chapters.at(-1) ? chapters.at(-1)!.start + chapters.at(-1)!.duration : 0;
  let cursor = 2;
  const clips = entry.clips.map((clip) => {
    const duration = (timing as Record<string, number>)[clip.id];
    if (!duration) throw new Error(`Missing audio timing for ${clip.id}`);
    const result = { id: clip.id, voice: clip.voice, subtitle: clip.subtitle, start: start + cursor, duration };
    cursor += duration + 4;
    return result;
  });
  chapters.push({ key: entry.key as Key, start, duration: cursor + 5, clips });
}
export const AN_MOT_FRAMES = chapters.at(-1)!.start + chapters.at(-1)!.duration;
const chapter = (key: Key) => chapters.find((c) => c.key === key)!;
const at = (key: Key, id: string) => chapter(key).clips.find((c) => c.id === id)!.start - chapter(key).start;

function In({ children, atFrame = 0, x = 0, y = 40, style }: { children: ReactNode; atFrame?: number; x?: number; y?: number; style?: CSSProperties }) {
  const f = useCurrentFrame();
  const p = bounce(f, atFrame);
  return <div style={{ opacity: clamp(p * 2), transform: `translate(${x * (1 - p)}px, ${y * (1 - p)}px) scale(${0.94 + p * 0.06})`, ...style }}>{children}</div>;
}

function Scene({ duration, children, isFirst = false }: { duration: number; children: ReactNode; isFirst?: boolean }) {
  const f = useCurrentFrame();
  const opacity = Math.min(isFirst ? 1 : active(f, 0, 5), 1 - active(f, duration - 6, 6));
  return <AbsoluteFill style={{ opacity, overflow: "hidden" }}>{children}</AbsoluteFill>;
}

function Backdrop() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(${C.line}35 1px, transparent 1px), linear-gradient(90deg, ${C.line}35 1px, transparent 1px)`, backgroundSize: "86px 86px", opacity: 0.23, transform: `translateY(${(f * 0.11) % 86}px)` }} />
      <div style={{ position: "absolute", width: 780, height: 780, left: -350, top: -310, borderRadius: "50%", background: C.teal, opacity: 0.14, filter: "blur(110px)" }} />
      <div style={{ position: "absolute", width: 820, height: 820, right: -400, bottom: 160, borderRadius: "50%", background: C.red, opacity: 0.12, filter: "blur(120px)" }} />
    </AbsoluteFill>
  );
}

function TopBar() {
  const f = useCurrentFrame();
  const current = Math.max(0, chapters.findIndex((c) => f < c.start + c.duration));
  return (
    <>
      <div style={{ position: "absolute", left: 72, top: 74, fontFamily: LATIN, fontWeight: 900, fontSize: 43, letterSpacing: -2, color: C.white }}>KORIO<span style={{ color: C.lime }}>.</span></div>
      <div style={{ position: "absolute", right: 72, top: 91, fontFamily: LATIN, fontSize: 24, letterSpacing: 3, fontWeight: 900, color: C.muted }}>KOREYS TILI / 02</div>
      <div style={{ position: "absolute", left: 72, right: 72, top: 157, display: "flex", gap: 9 }}>
        {chapters.map((c, i) => {
          const amount = clamp((f - c.start) / c.duration);
          return <div key={c.key} style={{ flex: 1, height: 9, background: C.line, borderRadius: 8, overflow: "hidden" }}><div style={{ width: `${i < current ? 100 : i === current ? amount * 100 : 0}%`, height: "100%", borderRadius: 8, background: i % 2 ? C.teal : C.lime }} /></div>;
        })}
      </div>
      <div style={{ position: "absolute", bottom: 97, left: 72, fontFamily: LATIN, fontWeight: 900, fontSize: 25, color: C.muted, letterSpacing: 1 }}>KOREYS GRAMMATIKASI · 안 / 못</div>
    </>
  );
}

function Subtitles() {
  const f = useCurrentFrame();
  const clip = chapters.flatMap((c) => c.clips).find((c) => f >= c.start && f < c.start + c.duration + 3);
  if (!clip) return null;
  const progress = (f - clip.start) / clip.duration;
  const subtitle = clip.id === "uz-rule" ? (progress < 0.45 ? "Ikkalasi ham feʼldan oldin" : "안: qilmayman · 못: qila olmayman")
    : clip.id === "uz-an-ex" ? (progress < 0.48 ? "Bu gapda: bugun mashq qilmayman" : "Qila olishim aytilmagan → 안")
    : clip.id === "uz-mot-ex" ? (progress < 0.5 ? "Oyogʻim ogʻriyapti" : "Mashq qila olmayman → 못")
    : clip.id === "uz-compare" ? (progress < 0.32 ? "안 가요 — bormayman" : progress < 0.68 ? "못 가요 — bora olmayman" : "Feʼl bir xil, maʼno boshqacha")
    : clip.subtitle;
  return (
    <div style={{ position: "absolute", left: 68, right: 68, bottom: 285, minHeight: 126, borderRadius: 26, background: C.white, boxShadow: "0 18px 48px #0007", padding: "24px 32px", display: "flex", gap: 19, alignItems: "center" }}>
      <span style={{ flex: "none", alignSelf: "flex-start", borderRadius: 11, background: clip.voice === "ko" ? C.red : C.teal, padding: "8px 11px", fontFamily: LATIN, fontWeight: 900, fontSize: 23, color: C.bg }}>{clip.voice.toUpperCase()}</span>
      <span style={{ fontFamily: KOREAN, fontSize: subtitle.length > 44 ? 34 : 39, fontWeight: 900, color: C.bg, lineHeight: 1.23, letterSpacing: -0.7 }}>{subtitle}</span>
    </div>
  );
}

function Eyebrow({ children, color = C.lime }: { children: ReactNode; color?: string }) {
  return <div style={{ fontFamily: LATIN, fontSize: 29, fontWeight: 900, letterSpacing: 3, color }}>{children}</div>;
}

function Korean({ children, color = C.white, size = 84 }: { children: ReactNode; color?: string; size?: number }) {
  return <span style={{ fontFamily: KOREAN, fontWeight: 900, fontSize: size, letterSpacing: -5, color, whiteSpace: "nowrap" }}>{children}</span>;
}

function KeyWord({ value, color, size = 230 }: { value: string; color: string; size?: number }) {
  return <span style={{ fontFamily: KOREAN, fontWeight: 900, fontSize: size, lineHeight: 1, color, textShadow: "0 14px 0 #0002" }}>{value}</span>;
}

function Dumbbell({ color = C.teal, tilt = 0 }: { color?: string; tilt?: number }) {
  return <svg width="500" height="370" viewBox="0 0 500 370" style={{ transform: `rotate(${tilt}deg)`, filter: "drop-shadow(0 22px 18px #0005)" }} aria-hidden="true">
    <circle cx="250" cy="185" r="175" fill={color} opacity=".12" />
    <g transform="rotate(-18 250 185)" stroke={C.bg} strokeWidth="9" strokeLinejoin="round">
      <rect x="119" y="167" width="262" height="36" rx="18" fill={C.white} />
      <rect x="95" y="125" width="46" height="120" rx="12" fill={color} />
      <rect x="44" y="104" width="58" height="162" rx="16" fill={color} />
      <rect x="359" y="125" width="46" height="120" rx="12" fill={color} />
      <rect x="398" y="104" width="58" height="162" rx="16" fill={color} />
    </g>
  </svg>;
}

function Hook() {
  const f = useCurrentFrame();
  const slide = active(f, 4, 15);
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 290 }}><Eyebrow>BUGUNGI GRAMMATIKA</Eyebrow></In>
      <In atFrame={2} x={-140} style={{ position: "absolute", left: 56, top: 445, width: 475, height: 475, borderRadius: 50, background: C.teal, border: `7px solid ${C.white}`, display: "grid", placeItems: "center", boxShadow: "0 27px 0 #07101F" }}><KeyWord value="안" color={C.bg} size={310} /></In>
      <In atFrame={8} x={140} style={{ position: "absolute", right: 56, top: 445, width: 475, height: 475, borderRadius: 50, background: C.red, border: `7px solid ${C.white}`, display: "grid", placeItems: "center", boxShadow: "0 27px 0 #07101F" }}><KeyWord value="못" color={C.bg} size={310} /></In>
      <div style={{ position: "absolute", top: 648, left: 492, width: 96, height: 96, borderRadius: 48, display: "grid", placeItems: "center", background: C.lime, color: C.bg, fontFamily: LATIN, fontSize: 34, fontWeight: 900, transform: `rotate(${(1 - slide) * -25}deg) scale(${slide})` }}>VS</div>
      <In atFrame={19} style={{ position: "absolute", left: 70, top: 995, width: 940, textAlign: "center" }}><div style={{ fontFamily: LATIN, fontSize: 65, fontWeight: 900, lineHeight: 1.18, letterSpacing: -2, color: C.white }}>QILMAYMAN <span style={{ color: C.lime }}>≠</span><br />QILA OLMAYMAN</div></In>
      <In atFrame={48} style={{ position: "absolute", left: 210, top: 1220, textAlign: "center" }}><div style={{ padding: "16px 34px", border: `2px solid ${C.line}`, borderRadius: 100, fontFamily: LATIN, fontSize: 31, fontWeight: 800, color: C.muted }}>1 TA FARQ · 2 TA MAʼNO</div></In>
    </>
  );
}

function Lead() {
  const f = useCurrentFrame();
  const switchAt = Math.round(chapter("lead").duration * 0.47);
  const isMot = f >= switchAt;
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 260 }}><Eyebrow>QOIDA / 01</Eyebrow><div style={{ fontFamily: LATIN, fontSize: 76, fontWeight: 900, color: C.white, lineHeight: 1.12, marginTop: 24 }}>Feʼldan <span style={{ color: C.lime }}>oldin.</span></div></In>
      <div style={{ position: "absolute", left: 75, top: 610, width: 930, height: 370, borderRadius: 45, background: C.white, boxShadow: "0 25px 0 #070C17", display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ width: 205, height: 210, borderRadius: 33, background: isMot ? C.red : C.teal, display: "grid", placeItems: "center", transform: `scale(${1 + 0.06 * Math.sin(f / 8)})` }}><KeyWord value={isMot ? "못" : "안"} color={C.bg} size={155} /></div>
        <Korean color={C.bg} size={153}>가요</Korean>
      </div>
      <In atFrame={6} style={{ position: "absolute", left: 77, top: 1080, width: 925, height: 145, borderRadius: 25, padding: "24px 35px", background: isMot ? C.red : C.teal, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Korean color={C.bg} size={70}>{isMot ? "못" : "안"}</Korean><span style={{ fontFamily: LATIN, color: C.bg, fontSize: 51, fontWeight: 900 }}>{isMot ? "QILA OLMAYMAN" : "QILMAYMAN"}</span></In>
      <div style={{ position: "absolute", left: 89, top: 1280, width: 900, height: 8, borderRadius: 8, background: C.line }}><div style={{ width: `${clamp(f / chapter("lead").duration) * 100}%`, height: "100%", borderRadius: 8, background: C.lime }} /></div>
    </>
  );
}

function Body1() {
  const f = useCurrentFrame();
  const choose = active(f, at("body1", "uz-an-ex") + 15, 13);
  const pulse = (f % 80) / 80;
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 270 }}><Eyebrow color={C.teal}>01 / 안</Eyebrow><div style={{ fontFamily: LATIN, fontSize: 82, fontWeight: 900, color: C.white, marginTop: 12 }}>ISH BAJARILMAYDI</div></In>
      <In atFrame={8} style={{ position: "absolute", left: 69, top: 515, width: 942, height: 605, borderRadius: 52, background: C.panel, border: `3px solid ${C.line}`, boxShadow: "0 30px 60px #0005" }}>
        <div style={{ position: "absolute", left: 45, top: 38, fontFamily: LATIN, fontSize: 31, fontWeight: 900, color: C.muted }}>BUGUN / 운동</div>
        <div style={{ position: "absolute", left: 278, top: 54, width: 390, height: 390, borderRadius: "50%", border: `4px solid ${C.teal}`, opacity: (1 - pulse) * 0.52, transform: `scale(${0.77 + pulse * 0.63})` }} />
        <div style={{ position: "absolute", left: 207, top: 85 }}><Dumbbell tilt={Math.sin(f / 13) * 4} /></div>
        <div style={{ position: "absolute", left: 55, right: 55, bottom: 40, borderRadius: 26, height: 108, border: `3px solid ${C.teal}`, background: choose ? C.teal : "transparent", display: "grid", placeItems: "center", transform: `scale(${1 - choose * 0.03})` }}><span style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 48, color: choose ? C.bg : C.teal }}>BUGUN MASHQ QILMAYMAN</span></div>
      </In>
      <In atFrame={at("body1", "ko-an-ex") - 1} x={-80} style={{ position: "absolute", left: 80, top: 1190, width: 920, textAlign: "center" }}><Korean size={83}>오늘 운동 <span style={{ color: C.teal }}>안</span> 해요</Korean></In>
      <div style={{ position: "absolute", left: 323, top: 1330, width: 430, height: 5, borderRadius: 10, background: C.teal, transform: `scaleX(${active(f, 20, 16)})` }} />
      <In atFrame={at("body1", "uz-an-ex") + 90} x={80} style={{ position: "absolute", right: 91, top: 455, padding: "13px 24px", borderRadius: 18, background: C.lime, color: C.bg, fontFamily: LATIN, fontSize: 30, fontWeight: 900, transform: "rotate(6deg)" }}>SODDA INKOR</In>
    </>
  );
}

function Loop1() {
  const f = useCurrentFrame();
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 320 }}><Eyebrow color={C.red}>LEKIN...</Eyebrow><div style={{ fontFamily: LATIN, color: C.white, fontSize: 88, fontWeight: 900, lineHeight: 1.16, marginTop: 35 }}>OYOGʻIM<br /><span style={{ color: C.red }}>OGʻRIYAPTI.</span></div></In>
      <div style={{ position: "absolute", left: 275, top: 890, width: 550, height: 280, borderRadius: 140, background: C.red, transform: `rotate(${-13 + 2 * Math.sin(f / 5)}deg) scale(${0.7 + bounce(f, 5) * 0.3})`, boxShadow: "0 24px 0 #0004", display: "grid", placeItems: "center" }}><span style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 190, color: C.bg }}>!</span></div>
      <In atFrame={14} style={{ position: "absolute", left: 232, top: 1240, color: C.lime, fontFamily: LATIN, fontSize: 47, fontWeight: 900 }}>UNDA QAYSI SOʻZ?</In>
    </>
  );
}

function Body2() {
  const f = useCurrentFrame();
  const strike = active(f, at("body2", "uz-mot-ex") + 10, 15);
  const pulse = (f % 75) / 75;
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 265 }}><Eyebrow color={C.red}>02 / 못</Eyebrow><div style={{ fontFamily: LATIN, fontSize: 78, fontWeight: 900, color: C.white, marginTop: 12 }}>QILA OLMAYMAN</div></In>
      <In atFrame={8} style={{ position: "absolute", left: 69, top: 515, width: 942, height: 605, borderRadius: 52, background: C.panel, border: `3px solid ${C.red}`, boxShadow: "0 30px 60px #0005", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 45, top: 38, fontFamily: LATIN, fontSize: 31, fontWeight: 900, color: C.muted }}>OYOGʻIM OGʻRIYDI</div>
        <div style={{ position: "absolute", left: 278, top: 54, width: 390, height: 390, borderRadius: "50%", border: `4px solid ${C.red}`, opacity: (1 - pulse) * 0.55, transform: `scale(${0.77 + pulse * 0.63})` }} />
        <div style={{ position: "absolute", left: 207, top: 80, opacity: 1 - strike * 0.35 }}><Dumbbell color={C.red} tilt={-8} /></div>
        <div style={{ position: "absolute", left: 210, top: 180, width: 530, height: 42, borderRadius: 22, background: C.red, transform: `rotate(-25deg) scaleX(${strike})`, boxShadow: "0 8px 0 #0003" }} />
        <div style={{ position: "absolute", left: 55, right: 55, bottom: 40, borderRadius: 26, height: 108, background: C.red, display: "grid", placeItems: "center" }}><span style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 49, color: C.bg }}>MASHQ QILA OLMAYMAN</span></div>
      </In>
      <In atFrame={at("body2", "ko-mot-ex") - 1} x={80} style={{ position: "absolute", left: 68, top: 1190, width: 950, textAlign: "center" }}><Korean size={69}>다리가 아파서 운동 <span style={{ color: C.red }}>못</span> 해요</Korean></In>
      <In atFrame={at("body2", "uz-mot-ex") + 70} x={-80} style={{ position: "absolute", right: 91, top: 455, padding: "13px 24px", borderRadius: 18, background: C.lime, color: C.bg, fontFamily: LATIN, fontSize: 30, fontWeight: 900 }}>IMKON YOʻQ</In>
    </>
  );
}

function Loop2() {
  const f = useCurrentFrame();
  const p = active(f, 13, 20);
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 325 }}><Eyebrow color={C.lime}>QULOGʻINGIZGA QANDAY?</Eyebrow><div style={{ fontFamily: LATIN, fontSize: 82, fontWeight: 900, color: C.white, marginTop: 30, lineHeight: 1.2 }}>BITTA FEʼL.<br /><span style={{ color: C.lime }}>IKKI MAʼNO.</span></div></In>
      <div style={{ position: "absolute", left: 120, top: 770, width: 840, height: 420, borderRadius: 46, border: `4px solid ${C.line}`, background: C.panel, transform: `rotate(${(1 - p) * -7}deg) scale(${0.85 + p * 0.15})`, display: "grid", placeItems: "center" }}><Korean size={170}>가요</Korean></div>
      <In atFrame={28} style={{ position: "absolute", left: 281, top: 1260, padding: "18px 39px", borderRadius: 50, background: C.lime, color: C.bg, fontFamily: LATIN, fontSize: 38, fontWeight: 900 }}>QAYSINISI?</In>
    </>
  );
}

function CompareCard({ title, keyword, suffix, translation, color, atFrame, x }: { title: string; keyword: string; suffix: string; translation: string; color: string; atFrame: number; x: number }) {
  return <In atFrame={atFrame} x={x} style={{ width: 946, height: 350, borderRadius: 41, background: C.white, borderLeft: `27px solid ${color}`, boxShadow: "0 18px 0 #0005", padding: "26px 36px" }}><div style={{ fontFamily: LATIN, fontSize: 29, fontWeight: 900, color: C.bg, opacity: 0.6 }}>{title}</div><div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 20 }}><Korean color={color} size={108}>{keyword}</Korean><Korean color={C.bg} size={103}>{suffix}</Korean></div><div style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 46, color: C.bg, marginTop: 8 }}>{translation}</div></In>;
}

function Body3() {
  const f = useCurrentFrame();
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 275 }}><Eyebrow color={C.lime}>TAQQOSLANG</Eyebrow><div style={{ fontFamily: LATIN, fontSize: 77, fontWeight: 900, color: C.white, marginTop: 17 }}>BIR FEʼL, IKKI MAʼNO</div></In>
      <div style={{ position: "absolute", left: 67, top: 590 }}><CompareCard title="01 / SODDA INKOR" keyword="안" suffix="가요" translation="Bormayman" color={C.teal} atFrame={at("body3", "ko-an-go") - 1} x={-170} /></div>
      <div style={{ position: "absolute", left: 67, top: 995 }}><CompareCard title="02 / IMKON YOʻQ" keyword="못" suffix="가요" translation="Bora olmayman" color={C.red} atFrame={at("body3", "ko-mot-go") - 1} x={170} /></div>
      <div style={{ position: "absolute", left: 485, top: 941, width: 112, height: 112, borderRadius: 56, display: "grid", placeItems: "center", background: C.lime, color: C.bg, fontFamily: LATIN, fontSize: 61, fontWeight: 900, transform: `scale(${bounce(f, at("body3", "ko-mot-go"))})` }}>≠</div>
    </>
  );
}

function PaperPlane({ progress }: { progress: number }) {
  return <svg width="210" height="190" viewBox="0 0 210 190" style={{ transform: `translate(${progress * 135}px, ${-progress * 100}px) rotate(${-progress * 18}deg)` }} aria-hidden="true"><path d="M15 77L193 18L139 169L98 112L48 144L65 92Z" fill={C.lime} stroke={C.bg} strokeWidth="7" strokeLinejoin="round" /><path d="M65 92L193 18L98 112" fill="none" stroke={C.bg} strokeWidth="6" strokeLinejoin="round" /></svg>;
}

function CTA() {
  const f = useCurrentFrame();
  return (
    <>
      <In atFrame={0} style={{ position: "absolute", left: 72, top: 295 }}><Eyebrow color={C.lime}>ESLAB QOLING</Eyebrow></In>
      <In atFrame={8} style={{ position: "absolute", left: 72, top: 475, width: 936, padding: "42px 46px", borderRadius: 42, background: C.teal, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Korean color={C.bg} size={115}>안</Korean><span style={{ fontFamily: LATIN, fontSize: 66, fontWeight: 900, color: C.bg }}>QILMAYMAN</span></In>
      <In atFrame={17} style={{ position: "absolute", left: 72, top: 740, width: 936, padding: "42px 46px", borderRadius: 42, background: C.red, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Korean color={C.bg} size={115}>못</Korean><span style={{ fontFamily: LATIN, fontSize: 57, fontWeight: 900, color: C.bg }}>QILA OLMAYMAN</span></In>
      <In atFrame={31} style={{ position: "absolute", left: 72, top: 1080, width: 650, fontFamily: LATIN, fontSize: 55, lineHeight: 1.15, color: C.white, fontWeight: 900 }}>DOʻSTINGIZGA<br /><span style={{ color: C.lime }}>YUBORING!</span></In>
      <div style={{ position: "absolute", left: 735, top: 1100 }}><PaperPlane progress={active(f, 42, 24)} /></div>
    </>
  );
}

const components: Record<Key, () => ReactNode> = { hook: Hook, lead: Lead, body1: Body1, loop1: Loop1, body2: Body2, loop2: Loop2, body3: Body3, cta: CTA };

export function AnMotReel() {
  return (
    <AbsoluteFill style={{ width: 1080, height: 1920, overflow: "hidden" }}>
      <Backdrop />
      {chapters.map((c, i) => {
        const Component = components[c.key];
        return <Sequence key={c.key} from={c.start} durationInFrames={c.duration}><Scene duration={c.duration} isFirst={i === 0}><Component /></Scene></Sequence>;
      })}
      <TopBar />
      <Subtitles />
      {chapters.flatMap((c) => c.clips.map((clip) => <Sequence key={`${c.key}-${clip.id}`} from={clip.start} durationInFrames={clip.duration}><Audio src={staticFile(`grammar-an-mot/${clip.id}.mp3`)} volume={1} /></Sequence>))}
      <Audio src={staticFile("grammar/music-bed.mp3")} volume={0.065} />
      {chapters.map((c, i) => <Sequence key={`sfx-${c.key}`} from={c.start} durationInFrames={25}><Audio src={staticFile(i === 0 ? "grammar/sfx-pop.mp3" : "grammar/sfx-whoosh.mp3")} volume={i === 0 ? 0.25 : 0.095} /></Sequence>)}
    </AbsoluteFill>
  );
}
