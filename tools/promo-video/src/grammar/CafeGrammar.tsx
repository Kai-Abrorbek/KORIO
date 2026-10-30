import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";

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
const ease = Easing.bezier(0.22, 1, 0.36, 1);

const chapters = [
  { key: "hook", voice: "01-hook.mp3", voiceFrames: 114, label: "HOOK" },
  { key: "lead", voice: "02-lead.mp3", voiceFrames: 144, label: "LEAD" },
  { key: "body1", voice: "03-body1.mp3", voiceFrames: 206, label: "에" },
  { key: "loop1", voice: "04-loop1.mp3", voiceFrames: 73, label: "?" },
  { key: "body2", voice: "05-body2.mp3", voiceFrames: 189, label: "에서" },
  { key: "loop2", voice: "06-loop2.mp3", voiceFrames: 106, label: "?" },
  { key: "body3", voice: "07-body3.mp3", voiceFrames: 218, label: "정리" },
  { key: "cta", voice: "08-cta.mp3", voiceFrames: 125, label: "SEND" },
] as const;
type ChapterKey = (typeof chapters)[number]["key"];
const timeline = chapters.reduce<{ key: ChapterKey; voice: string; label: string; start: number; duration: number; voiceFrames: number }[]>((items, chapter) => {
  const start = items.at(-1) ? items.at(-1)!.start + items.at(-1)!.duration : 0;
  items.push({ ...chapter, start, duration: chapter.voiceFrames + 8 });
  return items;
}, []);
export const TOTAL_FRAMES = timeline.at(-1)!.start + timeline.at(-1)!.duration;

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
      <div style={{ position: "absolute", right: 66, top: 91, fontFamily: EN, fontWeight: 800, fontSize: 23, letterSpacing: 2, color: C.muted }}>KOREAN / 01</div>
      <div style={{ position: "absolute", left: 66, top: 160, display: "flex", gap: 8 }}>
        {timeline.map((chapter, i) => (
          <div key={chapter.key} style={{ width: 111, height: 9, borderRadius: 12, background: i <= index ? (i % 2 ? C.teal : C.coral) : C.line, transform: `scaleY(${i === index ? 1.5 : 1})`, transition: "none" }} />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 102, left: 66, fontFamily: FONT, fontSize: 23, fontWeight: 800, color: C.muted }}>쉬운 한국어 · 장소 조사</div>
      <div style={{ position: "absolute", bottom: 95, right: 68, fontFamily: EN, fontSize: 29, fontWeight: 900, color: C.ink }}>{String(Math.max(1, index + 1)).padStart(2, "0")} / 08</div>
    </>
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
  const slash = ramp(f, 44, 12);
  return (
    <>
      <M at={0} style={{ position: "absolute", left: 72, top: 286 }}><Badge background={C.coral} color={C.white}>잠깐! 이 문장 맞아요?</Badge></M>
      <M at={10} y={100} style={{ position: "absolute", left: 62, top: 460, width: 956 }}>
        <div style={{ background: C.white, border: `6px solid ${C.ink}`, borderRadius: 38, padding: "70px 45px 78px", boxShadow: "18px 22px 0 #171C2B", transform: "rotate(-2deg)" }}>
          <div style={{ fontFamily: FONT, fontWeight: 900, letterSpacing: -8, fontSize: 111, lineHeight: 1.28, color: C.ink }}>카페<span style={{ color: C.coral, position: "relative" }}>에<svg style={{ position: "absolute", left: -7, top: 8, width: 125, height: 120, overflow: "visible" }}><path d="M6 93L118 17" stroke={C.coral} strokeWidth="12" strokeLinecap="round" strokeDasharray="165" strokeDashoffset={165*(1-slash)} /></svg></span><br />공부해요?</div>
        </div>
      </M>
      <M at={53} style={{ position: "absolute", left: 152, top: 1190, transform: "rotate(5deg)" }}><span style={{ fontFamily: FONT, color: C.coral, fontWeight: 900, fontSize: 72 }}>어색하죠?</span></M>
      <div style={{ position: "absolute", right: 80, bottom: 335, width: 300, height: 300, borderRadius: "50%", border: `16px solid ${C.teal}`, transform: `rotate(${f*0.8}deg)`, opacity: .15 }} />
    </>
  );
}

function Lead() {
  return (
    <>
      <M at={0}><Header eyebrow="THE SIMPLE RULE" title={<>딱 두 질문이면<br /><span style={{ color: C.teal }}>끝나요.</span></>} sub="장소 뒤에 붙는 에 / 에서" /></M>
      <M at={18} x={-130} style={{ position: "absolute", left: 115, top: 775 }}><div style={{ width: 363, height: 432, borderRadius: 36, background: C.mint, border: `6px solid ${C.ink}`, boxShadow: "14px 18px 0 #171C2B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(-4deg)" }}><span style={{ fontFamily: FONT, fontSize: 150, fontWeight: 900, color: C.teal }}>에</span><span style={{ fontFamily: FONT, fontSize: 39, fontWeight: 800, color: C.ink }}>어디에?</span></div></M>
      <M at={30} x={130} style={{ position: "absolute", right: 115, top: 775 }}><div style={{ width: 363, height: 432, borderRadius: 36, background: C.peach, border: `6px solid ${C.ink}`, boxShadow: "14px 18px 0 #171C2B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(4deg)" }}><span style={{ fontFamily: FONT, fontSize: 139, fontWeight: 900, color: C.coral }}>에서</span><span style={{ fontFamily: FONT, fontSize: 39, fontWeight: 800, color: C.ink }}>어디에서?</span></div></M>
      <M at={74} style={{ position: "absolute", left: 206, top: 1380 }}><Badge background={C.yellow} style={{ fontSize: 37, padding: "21px 36px" }}>문장으로 바로 볼게요 ↓</Badge></M>
    </>
  );
}

function Body1() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0}><Header eyebrow="01 / DESTINATION · LOCATION" accent={C.teal} title={<>가는 곳 · 있는 곳<span style={{ color: C.teal }}> 에</span></>} sub="어디에 가요? 어디에 있어요?" /></M>
      <M at={12} style={{ position: "absolute", left: 118, top: 590 }}><Cafe progress={ramp(f, 22, 72)} /></M>
      <M at={73} style={{ position: "absolute", left: 93, top: 1290 }}><div style={exampleCard}><Sentence prefix="카페" particle="에" suffix=" 가요" color={C.teal} /></div></M>
      <M at={135} style={{ position: "absolute", left: 93, top: 1438 }}><div style={exampleCard}><Sentence prefix="카페" particle="에" suffix=" 있어요" color={C.teal} /></div></M>
    </>
  );
}

const exampleCard: CSSProperties = { background: C.white, border: `4px solid ${C.ink}`, borderRadius: 25, padding: "18px 36px 26px", boxShadow: "9px 11px 0 #171C2B", minWidth: 780 };

function Loop1() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0} style={{ position: "absolute", left: 66, top: 342 }}><Badge background={C.yellow} style={{ fontSize: 32 }}>잠깐, 하나 더!</Badge></M>
      <M at={7} style={{ position: "absolute", left: 75, top: 520, width: 930 }}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 95, lineHeight: 1.28, letterSpacing: -6, color: C.ink }}>그럼 카페에서<br /><span style={{ color: C.coral }}>공부할 때는?</span></div></M>
      <M at={14} style={{ position: "absolute", left: 120, top: 930, transform: `scale(${1 + ramp(f,20,60)*0.12})` }}><StudyDesk frame={f} /></M>
      <div style={{ position: "absolute", left: 456, bottom: 266, fontFamily: EN, fontSize: 88, fontWeight: 900, color: C.coral, transform: `rotate(${Math.sin(f*.15)*8}deg)` }}>?</div>
    </>
  );
}

function Body2() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0}><Header eyebrow="02 / ACTION" accent={C.coral} title={<>행동하는 곳<span style={{ color: C.coral }}> 에서</span></>} sub="어디에서 공부해요?" /></M>
      <M at={10} style={{ position: "absolute", left: 110, top: 635 }}><StudyDesk frame={f} /></M>
      <M at={74} style={{ position: "absolute", left: 93, top: 1370 }}><div style={exampleCard}><Sentence prefix="카페" particle="에서" suffix=" 공부해요" color={C.coral} size={60} /></div></M>
      <M at={123} style={{ position: "absolute", left: 120, top: 1570 }}><Badge background={C.peach} color={C.coral}>공부하다 = 행동</Badge></M>
    </>
  );
}

function Loop2() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0}><Header eyebrow="ONE PLACE, TWO PARTICLES" title={<>같은 카페인데<br /><span style={{ color: C.purple }}>둘 다 될까요?</span></>} /></M>
      <M at={19} style={{ position: "absolute", left: 84, top: 735 }}><div style={{ width: 910, height: 640, borderRadius: 55, background: C.white, border: `6px solid ${C.ink}`, boxShadow: "17px 20px 0 #171C2B", display: "flex", alignItems: "center", justifyContent: "center", gap: 70 }}><span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 230, color: C.teal, transform: `rotate(${-8 + Math.sin(f*.08)*5}deg)` }}>에</span><span style={{ fontFamily: EN, fontWeight: 900, fontSize: 100, color: C.line }}>+</span><span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 205, color: C.coral, transform: `rotate(${8 - Math.sin(f*.08)*5}deg)` }}>에서</span></div></M>
      <M at={55} style={{ position: "absolute", left: 300, top: 1490 }}><Badge background={C.yellow} style={{ fontSize: 38 }}>정답은 다음 장면에 →</Badge></M>
    </>
  );
}

function Body3() {
  return (
    <>
      <M at={0}><Header eyebrow="THE TAKEAWAY" title={<>장소보다 <span style={{ color: C.purple }}>동사</span>를<br />보세요.</>} sub="같은 카페라도 동작이 달라지면 조사가 달라요" /></M>
      <M at={19} x={-100} style={{ position: "absolute", left: 65, top: 730 }}><div style={{ ...compareCard, background: C.mint, transform: "rotate(-2deg)" }}><div style={compareLabel}>GO / BE</div><div style={{ fontFamily: FONT, fontSize: 54, fontWeight: 800, color: C.ink, marginTop: 47 }}>가요 · 있어요</div><div style={{ marginTop: 48 }}><Sentence prefix="카페" particle="에" suffix=" 가요" color={C.teal} size={67} /></div></div></M>
      <M at={100} x={100} style={{ position: "absolute", right: 65, top: 1052 }}><div style={{ ...compareCard, background: C.peach, transform: "rotate(2deg)" }}><div style={compareLabel}>DO / ACTION</div><div style={{ fontFamily: FONT, fontSize: 54, fontWeight: 800, color: C.ink, marginTop: 47 }}>공부해요</div><div style={{ marginTop: 48 }}><Sentence prefix="카페" particle="에서" suffix=" 공부해요" color={C.coral} size={59} /></div></div></M>
      <M at={154} style={{ position: "absolute", left: 145, bottom: 280 }}><Badge background={C.yellow} style={{ fontSize: 36 }}>같은 장소, 다른 동사 ✓</Badge></M>
    </>
  );
}

const compareCard: CSSProperties = { width: 825, minHeight: 295, border: `5px solid ${C.ink}`, borderRadius: 34, padding: "35px 48px 48px", boxShadow: "12px 16px 0 #171C2B" };
const compareLabel: CSSProperties = { fontFamily: EN, fontWeight: 900, fontSize: 27, letterSpacing: 3, color: C.muted };

function SendIcon({ progress }: { progress: number }) {
  return <svg width="214" height="176" viewBox="0 0 214 176" style={{ transform: `translate(${progress*45}px, ${-progress*24}px) rotate(${-progress*12}deg)` }}><path d="M12 82L198 13l-55 148-42-54-51 33 15-54z" fill={C.yellow} stroke={C.ink} strokeWidth="8" strokeLinejoin="round"/><path d="M65 86l133-73-97 94" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function CTA() {
  const f = useCurrentFrame();
  return (
    <>
      <M at={0} style={{ position: "absolute", left: 74, top: 304 }}><Badge background={C.yellow}>오늘의 한 줄 정리</Badge></M>
      <M at={15} style={{ position: "absolute", left: 78, top: 463 }}><div style={{ fontFamily: FONT, fontSize: 79, fontWeight: 900, lineHeight: 1.4, letterSpacing: -5, color: C.ink }}>가요 · 있어요 <span style={{ color: C.teal }}>→ 에</span><br />공부해요 <span style={{ color: C.coral }}>→ 에서</span></div></M>
      <M at={25} style={{ position: "absolute", left: 83, top: 863 }}><div style={{ width: 910, background: C.ink, borderRadius: 44, padding: "72px 50px 74px", boxShadow: `18px 20px 0 ${C.purple}` }}><div style={{ fontFamily: FONT, fontSize: 67, fontWeight: 900, lineHeight: 1.35, letterSpacing: -4, color: C.white }}>에 / 에서 헷갈리는<br /><span style={{ color: C.yellow }}>한국어 공부 친구에게</span><br />보내주세요!</div></div></M>
      <M at={70} style={{ position: "absolute", right: 74, bottom: 260 }}><SendIcon progress={ramp(f, 72, 27)} /></M>
      <M at={84} style={{ position: "absolute", left: 82, bottom: 330 }}><div style={{ fontFamily: EN, fontWeight: 900, fontSize: 44, color: C.teal }}>KORIO · SAVE & SHARE</div></M>
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
      {timeline.map((chapter) => <Sequence key={`${chapter.key}-voice`} from={chapter.start + 3} durationInFrames={chapter.voiceFrames}><Audio src={staticFile(`grammar/${chapter.voice}`)} volume={1} /></Sequence>)}
      <Audio src={staticFile("grammar/music-bed.mp3")} volume={0.10} />
      {[0, 122, 274, 488, 569, 766, 880, 1106].map((at, i) => <Sequence key={`tick-${i}`} from={at} durationInFrames={22}><Audio src={staticFile(i === 0 ? "grammar/sfx-pop.mp3" : "grammar/sfx-whoosh.mp3")} volume={i === 0 ? 0.35 : 0.16} /></Sequence>)}
    </AbsoluteFill>
  );
}
