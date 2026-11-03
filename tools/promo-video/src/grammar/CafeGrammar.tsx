import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Sequence, spring, staticFile, useCurrentFrame } from "remotion";
import lines from "./voice-lines.json";
import timing from "./voice-timing.json";

const FPS = 30;
const W = 1080;
const H = 1920;
const C = {
  paper: "#F7F4EC",
  ink: "#171C2B",
  muted: "#717583",
  line: "#D9D7D0",
  teal: "#008F8B",
  mint: "#C5EAE3",
  coral: "#F2634B",
  peach: "#F8D8C9",
  yellow: "#F8D75C",
  purple: "#6258D6",
  white: "#FFFFFF",
};
const FONT = '"Malgun Gothic", "Noto Sans KR", sans-serif';
const EN = '"Segoe UI Black", "Segoe UI", sans-serif';
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ramp = (f: number, at: number, len: number) => clamp((f - at) / len);

type ChapterKey = "hook" | "lead" | "body1" | "loop1" | "body2" | "loop2" | "body3" | "cta";
type Clip = { id: string; voice: string; subtitle: string; start: number; duration: number };
type Chapter = { key: ChapterKey; start: number; duration: number; clips: Clip[] };
const timeline: Chapter[] = [];
for (const chapter of lines.chapters) {
  const start = timeline.at(-1) ? timeline.at(-1)!.start + timeline.at(-1)!.duration : 0;
  let cursor = 4;
  const clips = chapter.clips.map((clip) => {
    const duration = (timing as Record<string, number>)[clip.id];
    if (!duration) throw new Error(`Missing timing for ${clip.id}`);
    const item = { id: clip.id, voice: clip.voice, subtitle: clip.subtitle, start: start + cursor, duration };
    cursor += duration + 6;
    return item;
  });
  timeline.push({ key: chapter.key as ChapterKey, start, duration: cursor + 10, clips });
}
export const TOTAL_FRAMES = timeline.at(-1)!.start + timeline.at(-1)!.duration;
const scene = (key: ChapterKey) => timeline.find((item) => item.key === key)!;
const clipAt = (key: ChapterKey, id: string) => scene(key).clips.find((item) => item.id === id)!.start - scene(key).start;

function M({ at = 0, y = 50, x = 0, scale = 0.94, children, style }: { at?: number; y?: number; x?: number; scale?: number; children: ReactNode; style?: CSSProperties }) {
  const f = useCurrentFrame();
  const t = f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { damping: 17, stiffness: 145, mass: 0.8 } });
  return (
    <div style={{ opacity: clamp(t * 1.9), transform: `translate(${(1 - t) * x}px, ${(1 - t) * y}px) scale(${scale + (1 - scale) * t})`, ...style }}>
      {children}
    </div>
  );
}

function Frame({ children, duration }: { children: ReactNode; duration: number }) {
  const f = useCurrentFrame();
  const enter = ramp(f, 0, 7);
  const leave = 1 - ramp(f, duration - 7, 7);
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, leave), transform: `translateY(${(1 - enter) * 34 - (1 - leave) * 22}px)` }}>
      {children}
    </AbsoluteFill>
  );
}

function Background() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${C.ink}18 1.5px, transparent 1.5px)`, backgroundSize: "38px 38px", opacity: 0.5, transform: `translateY(${(f * 0.12) % 38}px)` }} />
      <div style={{ position: "absolute", top: -260, right: -250, width: 730, height: 730, borderRadius: "50%", background: C.mint, opacity: 0.45, filter: "blur(110px)" }} />
      <div style={{ position: "absolute", bottom: 0, left: -310, width: 750, height: 750, borderRadius: "50%", background: C.peach, opacity: 0.45, filter: "blur(115px)" }} />
      <div style={{ position: "absolute", left: 62, top: 220, width: 956, height: 1, background: C.line }} />
      <div style={{ position: "absolute", left: 62, bottom: 210, width: 956, height: 1, background: C.line }} />
    </AbsoluteFill>
  );
}

function Chrome() {
  const f = useCurrentFrame();
  const index = timeline.findIndex((scene) => f >= scene.start && f < scene.start + scene.duration);
  return (
    <>
      <div style={{ position: "absolute", left: 66, top: 75, fontFamily: EN, fontWeight: 900, fontSize: 42, letterSpacing: -2, color: C.ink }}>KORIO<span style={{ color: C.coral }}>.</span></div>
      <div style={{ position: "absolute", right: 66, top: 91, fontFamily: EN, fontWeight: 800, fontSize: 23, letterSpacing: 2, color: C.muted }}>KOREYS TILI / 01</div>
      <div style={{ position: "absolute", left: 66, top: 160, display: "flex", gap: 8 }}>
        {timeline.map((chapter, i) => (
          <div key={chapter.key} style={{ width: 111, height: 9, borderRadius: 12, background: i <= index ? (i % 2 ? C.teal : C.coral) : C.line, transform: `scaleY(${i === index ? 1.5 : 1})`, transition: "none" }} />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 102, left: 66, fontFamily: EN, fontSize: 23, fontWeight: 800, color: C.muted }}>JOY QOʻSHIMCHALARI · 에 / 에서</div>
      <div style={{ position: "absolute", bottom: 95, right: 68, fontFamily: EN, fontSize: 29, fontWeight: 900, color: C.ink }}>{String(Math.max(1, index + 1)).padStart(2, "0")} / 08</div>
    </>
  );
}

function Subtitles() {
  const frame = useCurrentFrame();
  const clip = timeline.flatMap((chapter) => chapter.clips).find((item) => frame >= item.start && frame < item.start + item.duration + 4);
  if (!clip) return null;
  return (
    <div style={{ position: "absolute", left: 78, right: 78, bottom: 234, minHeight: 104, borderRadius: 24, padding: "19px 27px 22px", background: C.ink, color: C.white, boxShadow: `9px 10px 0 ${C.purple}`, display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ flex: "none", fontFamily: EN, fontWeight: 900, fontSize: 22, color: clip.voice === "ko" ? C.yellow : C.mint }}>{clip.voice === "ko" ? "KO" : "UZ"}</div>
      <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 38, lineHeight: 1.3, letterSpacing: -1 }}>{clip.subtitle}</div>
    </div>
  );
}

function Badge({ children, color = C.ink, background = C.yellow, style }: { children: ReactNode; color?: string; background?: string; style?: CSSProperties }) {
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "13px 23px 17px", borderRadius: 99, background, color, fontFamily: FONT, fontWeight: 900, fontSize: 28, lineHeight: 1, ...style }}>{children}</span>;
}

function Header({ eyebrow, title, accent = C.teal, sub }: { eyebrow: string; title: ReactNode; accent?: string; sub?: string }) {
  return (
    <div style={{ position: "absolute", left: 72, top: 270, width: 936 }}>
      <div style={{ fontFamily: EN, fontSize: 27, fontWeight: 900, color: accent, letterSpacing: 2 }}>{eyebrow}</div>
      <div style={{ fontFamily: FONT, fontSize: 82, lineHeight: 1.18, fontWeight: 900, letterSpacing: -5, color: C.ink, marginTop: 18 }}>{title}</div>
      {sub ? <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 600, color: C.muted, marginTop: 22 }}>{sub}</div> : null}
    </div>
  );
}

function Sentence({ prefix, particle, suffix, color, size = 68 }: { prefix: string; particle: string; suffix: string; color: string; size?: number }) {
  return <span style={{ fontFamily: FONT, fontSize: size, fontWeight: 900, letterSpacing: -3, whiteSpace: "nowrap", color: C.ink }}>{prefix}<span style={{ color }}>{particle}</span>{suffix}</span>;
}

function Cafe({ progress = 1, inside = false }: { progress?: number; inside?: boolean }) {
  const p = clamp(progress);
  return (
    <svg width="840" height="690" viewBox="0 0 840 690" aria-label="카페 그림" style={{ overflow: "visible" }}>
      <defs>
        <filter id="cafeShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="24" stdDeviation="22" floodColor="#171C2B" floodOpacity="0.17" /></filter>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#E5F7F4"/><stop offset="1" stopColor="#92D8D0"/></linearGradient>
      </defs>
      <ellipse cx="430" cy="649" rx="340" ry="25" fill="#1B4B49" opacity=".13" />
      <g filter="url(#cafeShadow)">
        <rect x="88" y="125" width="664" height="510" rx="28" fill="#FFFDF7" stroke="#171C2B" strokeWidth="8" />
        <rect x="140" y="280" width="215" height="275" rx="15" fill="url(#glass)" stroke="#171C2B" strokeWidth="7" />
        <rect x="378" y="280" width="156" height="355" rx="14" fill={inside ? "#BDE4DD" : "#263A47"} stroke="#171C2B" strokeWidth="7" />
        <circle cx="505" cy="470" r="9" fill="#F8D75C" />
        <rect x="557" y="280" width="145" height="275" rx="15" fill="url(#glass)" stroke="#171C2B" strokeWidth="7" />
        <rect x="114" y="141" width="612" height="123" rx="8" fill="#F2634B" stroke="#171C2B" strokeWidth="7" />
        {[0,1,2,3,4,5].map((i) => <path key={i} d={`M${114+i*102} 143h102v87q-5 35-51 35t-51-35z`} fill={i%2 ? "#FFF8EC" : "#F2634B"} stroke="#171C2B" strokeWidth="4" />)}
        <rect x="272" y="38" width="296" height="89" rx="22" fill="#171C2B" />
        <text x="420" y="99" textAnchor="middle" fontFamily={EN} fontWeight="900" fontSize="46" letterSpacing="5" fill="#FFFDF7">CAFE</text>
        <path d="M146 348h200M629 348h58" stroke="#FFF" strokeWidth="13" opacity=".65" strokeLinecap="round" />
      </g>
      <path d="M-10 610C105 560 182 580 310 618" fill="none" stroke="#008F8B" strokeWidth="12" strokeLinecap="round" strokeDasharray="18 20" strokeDashoffset={-p*150} opacity=".75" />
      <circle cx={-10 + p*320} cy={610 - Math.sin(p*Math.PI)*35} r="29" fill="#F2634B" stroke="#171C2B" strokeWidth="7" />
      <circle cx={-10 + p*320} cy={610 - Math.sin(p*Math.PI)*35} r="8" fill="#FFF" />
    </svg>
  );
}

function StudyDesk({ frame }: { frame: number }) {
  const pen = Math.sin(frame * 0.28) * 8;
  const steam = Math.sin(frame * 0.09) * 9;
  return (
    <svg width="850" height="700" viewBox="0 0 850 700" aria-label="카페에서 공부하는 그림" style={{ overflow: "visible" }}>
      <defs><filter id="studyShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#171C2B" floodOpacity="0.16" /></filter></defs>
      <rect x="84" y="30" width="682" height="505" rx="130" fill="#D6EEE8" stroke="#171C2B" strokeWidth="8" />
      <path d="M425 34v497M89 240h672" stroke="#171C2B" strokeWidth="7" />
      <path d="M115 492c62-69 139-76 210-37 92-58 163-56 244 1 65-42 122-31 174 15v58H115z" fill="#91C6B4" />
      <path d="M0 554h850" stroke="#171C2B" strokeWidth="15" strokeLinecap="round" />
      <g filter="url(#studyShadow)">
        <rect x="115" y="552" width="620" height="48" rx="22" fill="#F8D75C" stroke="#171C2B" strokeWidth="7" />
        <path d="M188 600v80M665 600v80" stroke="#171C2B" strokeWidth="20" strokeLinecap="round" />
        <path d="M255 490l150-25 135 29-148 56z" fill="#FFFDF7" stroke="#171C2B" strokeWidth="7" />
        <path d="M395 468v73M285 496l90-16M420 486l85 17" stroke="#B9C2C7" strokeWidth="5" strokeLinecap="round" />
        <path d={`M445 ${444+pen}l110-105`} stroke="#6258D6" strokeWidth="16" strokeLinecap="round" />
        <path d="M555 339l22-22-11 29z" fill="#171C2B" />
        <rect x="606" y="466" width="72" height="82" rx="10" fill="#F2634B" stroke="#171C2B" strokeWidth="6" />
        <path d="M674 478q50-5 35 40-6 23-37 16" fill="none" stroke="#171C2B" strokeWidth="7" />
        <path d={`M625 ${446+steam}q-18-20 0-40M650 ${452-steam}q19-18 2-44`} fill="none" stroke="#717583" strokeWidth="5" strokeLinecap="round" opacity=".8" />
      </g>
    </svg>
  );
}

function Hook() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0} style={{ position: "absolute", left: 72, top: 290 }}><Badge background={C.yellow} style={{ fontFamily: EN, fontSize: 34 }}>BUGUNGI GRAMMATIKA</Badge></M>
      <M at={8} y={85} style={{ position: "absolute", left: 70, top: 460, width: 940 }}>
        <div style={{ background: C.white, border: `6px solid ${C.ink}`, borderRadius: 42, padding: "64px 54px 70px", boxShadow: "18px 22px 0 #171C2B", transform: "rotate(-2deg)" }}>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 192, lineHeight: 1.05, color: C.ink }}><span style={{ color: C.teal }}>에</span><span style={{ color: C.line, fontSize: 98, margin: "0 34px" }}>/</span><span style={{ color: C.coral }}>에서</span></div>
          <div style={{ fontFamily: EN, fontWeight: 900, fontSize: 44, color: C.ink, marginTop: 32 }}>QAYSI BIRINI ISHLATAMIZ?</div>
        </div>
      </M>
      <M at={125} style={{ position: "absolute", left: 98, top: 1130 }}><div style={{ fontFamily: EN, fontWeight: 900, fontSize: 53, lineHeight: 1.25, color: C.ink }}>Bir xil joy.<br /><span style={{ color: C.purple }}>Ikki xil qoʻshimcha.</span></div></M>
      <div style={{ position: "absolute", right: 110, top: 1230, width: 270, height: 270, borderRadius: "50%", border: `16px solid ${C.teal}`, transform: `rotate(${f*0.8}deg)`, opacity: .15 }} />
    </>
  );
}

function Lead() {
  return (
    <>
      <M at={0}><Header eyebrow="QOIDANI ESLAB QOLING" title={<>Feʼlga qarab<br /><span style={{ color: C.teal }}>tanlang.</span></>} sub="Joy nomidan keyingi qoʻshimcha" /></M>
      <M at={22} x={-130} style={{ position: "absolute", left: 105, top: 790 }}><div style={{ width: 370, height: 464, borderRadius: 36, background: C.mint, border: `6px solid ${C.ink}`, boxShadow: "14px 18px 0 #171C2B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(-4deg)" }}><span style={{ fontFamily: FONT, fontSize: 150, fontWeight: 900, color: C.teal }}>에</span><span style={{ fontFamily: EN, fontSize: 31, fontWeight: 900, color: C.ink, textAlign: "center", marginTop: 18 }}>BORISH<br />BOR BOʻLISH</span></div></M>
      <M at={82} x={130} style={{ position: "absolute", right: 105, top: 790 }}><div style={{ width: 370, height: 464, borderRadius: 36, background: C.peach, border: `6px solid ${C.ink}`, boxShadow: "14px 18px 0 #171C2B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(4deg)" }}><span style={{ fontFamily: FONT, fontSize: 132, fontWeight: 900, color: C.coral }}>에서</span><span style={{ fontFamily: EN, fontSize: 32, fontWeight: 900, color: C.ink, textAlign: "center", marginTop: 23 }}>ISH QILISH</span></div></M>
      <M at={150} style={{ position: "absolute", left: 236, top: 1390 }}><Badge background={C.yellow} style={{ fontFamily: EN, fontSize: 32, padding: "20px 32px" }}>MISOLLARNI KOʻRAMIZ ↓</Badge></M>
    </>
  );
}

function Body1() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0}><Header eyebrow="01 / 에" accent={C.teal} title={<>Manzil yoki<br /><span style={{ color: C.teal }}>qayerda ekansiz</span></>} sub="Boradigan joy · turgan joy" /></M>
      <M at={12} style={{ position: "absolute", left: 118, top: 600 }}><Cafe progress={ramp(f, 20, 75)} /></M>
      <M at={clipAt("body1", "ko-cafe-go")} style={{ position: "absolute", left: 93, top: 1280 }}><div style={exampleCard}><Sentence prefix="카페" particle="에" suffix=" 가요" color={C.teal} size={64} /><span style={translation}>Kafega boraman</span></div></M>
      <M at={clipAt("body1", "ko-cafe-be")} style={{ position: "absolute", left: 93, top: 1425 }}><div style={exampleCard}><Sentence prefix="카페" particle="에" suffix=" 있어요" color={C.teal} size={64} /><span style={translation}>Kafedaman</span></div></M>
    </>
  );
}

const exampleCard: CSSProperties = { background: C.white, border: `4px solid ${C.ink}`, borderRadius: 25, padding: "13px 32px 17px", boxShadow: "9px 11px 0 #171C2B", minWidth: 780, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 15 };
const translation: CSSProperties = { fontFamily: EN, fontWeight: 800, fontSize: 29, color: C.muted, maxWidth: 240, textAlign: "right" };

function Loop1() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0} style={{ position: "absolute", left: 72, top: 324 }}><Badge background={C.yellow} style={{ fontFamily: EN, fontSize: 31 }}>LEKIN...</Badge></M>
      <M at={7} style={{ position: "absolute", left: 72, top: 500, width: 940 }}><div style={{ fontFamily: EN, fontWeight: 900, fontSize: 83, lineHeight: 1.26, letterSpacing: -3, color: C.ink }}>Kafeda <span style={{ color: C.coral }}>dars qilsam</span><br />qaysi qoʻshimcha?</div></M>
      <M at={14} style={{ position: "absolute", left: 120, top: 850 }}><StudyDesk frame={f} /></M>
    </>
  );
}

function Body2() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0}><Header eyebrow="02 / 에서" accent={C.coral} title={<>Shu joyda<br /><span style={{ color: C.coral }}>ish qilasiz</span></>} sub="Oʻqish, ishlash, ovqat yeyish..." /></M>
      <M at={10} style={{ position: "absolute", left: 110, top: 630 }}><StudyDesk frame={f} /></M>
      <M at={clipAt("body2", "ko-cafe-study")} style={{ position: "absolute", left: 93, top: 1370 }}><div style={exampleCard}><Sentence prefix="카페" particle="에서" suffix=" 공부해요" color={C.coral} size={56} /></div></M>
      <M at={clipAt("body2", "uz-study-explain") + 60} style={{ position: "absolute", left: 220, top: 560 }}><Badge background={C.peach} color={C.coral} style={{ fontFamily: EN, fontSize: 30 }}>DARS QILISH = HARAKAT</Badge></M>
    </>
  );
}

function Loop2() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0}><Header eyebrow="BIR XIL JOY" title={<>Bir joyda<br /><span style={{ color: C.purple }}>ikkalasi ham?</span></>} sub="Kafe bir xil. Feʼl-chi?" /></M>
      <M at={19} style={{ position: "absolute", left: 84, top: 735 }}><div style={{ width: 910, height: 640, borderRadius: 55, background: C.white, border: `6px solid ${C.ink}`, boxShadow: "17px 20px 0 #171C2B", display: "flex", alignItems: "center", justifyContent: "center", gap: 70 }}><span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 230, color: C.teal, transform: `rotate(${-8 + Math.sin(f*.08)*5}deg)` }}>에</span><span style={{ fontFamily: EN, fontWeight: 900, fontSize: 100, color: C.line }}>+</span><span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 205, color: C.coral, transform: `rotate(${8 - Math.sin(f*.08)*5}deg)` }}>에서</span></div></M>
      <M at={60} style={{ position: "absolute", left: 290, top: 1410 }}><Badge background={C.yellow} style={{ fontFamily: EN, fontSize: 31 }}>JAVOBI HOZIR →</Badge></M>
    </>
  );
}

function Body3() {
  return (
    <>
      <M at={0}><Header eyebrow="XULOSA" title={<>Joy bir xil.<br /><span style={{ color: C.purple }}>Feʼl boshqacha.</span></>} sub="Qaysi ishni aytayotganingizga qarang" /></M>
      <M at={clipAt("body3", "ko-cafe-go") - 8} x={-100} style={{ position: "absolute", left: 65, top: 730 }}><div style={{ ...compareCard, background: C.mint, transform: "rotate(-2deg)" }}><div style={compareLabel}>BORAMAN → 에</div><div style={{ marginTop: 54 }}><Sentence prefix="카페" particle="에" suffix=" 가요" color={C.teal} size={67} /></div><div style={{ fontFamily: EN, fontWeight: 800, color: C.ink, fontSize: 35, marginTop: 18 }}>Kafega boraman</div></div></M>
      <M at={clipAt("body3", "ko-cafe-study") - 8} x={100} style={{ position: "absolute", right: 65, top: 1070 }}><div style={{ ...compareCard, background: C.peach, transform: "rotate(2deg)" }}><div style={compareLabel}>DARS QILAMAN → 에서</div><div style={{ marginTop: 54 }}><Sentence prefix="카페" particle="에서" suffix=" 공부해요" color={C.coral} size={58} /></div><div style={{ fontFamily: EN, fontWeight: 800, color: C.ink, fontSize: 35, marginTop: 18 }}>Kafeda dars qilaman</div></div></M>
    </>
  );
}

const compareCard: CSSProperties = { width: 825, minHeight: 286, border: `5px solid ${C.ink}`, borderRadius: 34, padding: "28px 45px 35px", boxShadow: "12px 16px 0 #171C2B" };
const compareLabel: CSSProperties = { fontFamily: EN, fontWeight: 900, fontSize: 27, letterSpacing: 3, color: C.muted };

function SendIcon({ progress }: { progress: number }) {
  return <svg width="214" height="176" viewBox="0 0 214 176" style={{ transform: `translate(${progress*45}px, ${-progress*24}px) rotate(${-progress*12}deg)` }}><path d="M12 82L198 13l-55 148-42-54-51 33 15-54z" fill={C.yellow} stroke={C.ink} strokeWidth="8" strokeLinejoin="round"/><path d="M65 86l133-73-97 94" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function CTA() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0} style={{ position: "absolute", left: 74, top: 304 }}><Badge background={C.yellow} style={{ fontFamily: EN, fontSize: 34 }}>TEZKOR XULOSA</Badge></M>
      <M at={8} style={{ position: "absolute", left: 78, top: 460 }}><div style={{ fontFamily: FONT, fontSize: 79, fontWeight: 900, lineHeight: 1.4, letterSpacing: -5, color: C.ink }}>가요 · 있어요 <span style={{ color: C.teal }}>→ 에</span><br />공부해요 <span style={{ color: C.coral }}>→ 에서</span></div></M>
      <M at={18} style={{ position: "absolute", left: 83, top: 860 }}><div style={{ width: 910, background: C.ink, borderRadius: 44, padding: "72px 50px 74px", boxShadow: `18px 20px 0 ${C.purple}` }}><div style={{ fontFamily: EN, fontSize: 62, fontWeight: 900, lineHeight: 1.26, letterSpacing: -2, color: C.white }}>Adashtiradigan<br /><span style={{ color: C.yellow }}>doʻstingizga</span><br />yuboring!</div></div></M>
      <M at={67} style={{ position: "absolute", right: 74, bottom: 270 }}><SendIcon progress={ramp(f, 69, 27)} /></M>
    </>
  );
}

const components: Record<ChapterKey, () => ReactNode> = { hook: Hook, lead: Lead, body1: Body1, loop1: Loop1, body2: Body2, loop2: Loop2, body3: Body3, cta: CTA };

export function CafeGrammar() {
  return (
    <AbsoluteFill style={{ width: W, height: H, fontFamily: FONT, overflow: "hidden" }}>
      <Background />
      {timeline.map((chapter) => {
        const Component = components[chapter.key];
        return (
          <Sequence key={chapter.key} from={chapter.start} durationInFrames={chapter.duration}>
            <Frame duration={chapter.duration}><Component /></Frame>
          </Sequence>
        );
      })}
      <Chrome />
      <Subtitles />
      {timeline.flatMap((chapter) => chapter.clips.map((clip, i) => <Sequence key={`${chapter.key}-${clip.id}-${i}`} from={clip.start} durationInFrames={clip.duration}><Audio src={staticFile(`grammar/${clip.id}.mp3`)} volume={1} /></Sequence>))}
      <Audio src={staticFile("grammar/music-bed.mp3")} volume={0.08} />
      {timeline.map((chapter, i) => <Sequence key={`tick-${i}`} from={chapter.start} durationInFrames={22}><Audio src={staticFile(i === 0 ? "grammar/sfx-pop.mp3" : "grammar/sfx-whoosh.mp3")} volume={i === 0 ? 0.3 : 0.12} /></Sequence>)}
    </AbsoluteFill>
  );
}
