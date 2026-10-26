/**
 * "Telefon lugʻati" — 참고 영상(Choʻntak lugʻati)의 형식 그대로, 내용은 KORIO (약 80초).
 *
 *  1 비교 칸   같은 행동, 화면에 따라 다른 번역 (REELS 회색 칸 | KORIO 노란 칸)
 *  2 사전      TELEFON LUGʻATI — tarjimasi ekranga qarab
 *  3 밤 11시   마당의 자수르, 담 너머 이웃 아주머니 "Bekorchi! Bunga kim ish beradi?"
 *  4 화면 속   "Shoshmang. Ekranga qarang." — 실제 KORIO 화면 6가지
 *  5 1년 뒤    또 밤 11시, 한국 회사와 영상 통화 → "Sekinroq!" → ISH TAKLIFI
 *  6 반전      Bir xil telefon — ekran boshqa / Hammamiz / ekraningizni koʻryapti
 *  7 그 이웃   "Men doim aytardim!" — Tarjima: Seuldan sovgʻa keldi
 *  8 끝        댓글 한 단어 + KORIO
 */
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { ReactNode } from "react";
import { Wordmark } from "../Hook";
import { AT, SCENES, TOTAL, w, type Line } from "./plan";
import {
  Backdrop, BookCover, Bubble, COND, CommentBox, GREEN, Headword, INK, KO, Label, Paper, PhoneSticker, RED, Stamp, Sticker, W, Window, YELLOW, useThud,
} from "./kit";

export const EP2_TOTAL = TOTAL;

const art = (name: string) => `ai/ep2/${name}.png`;
const COURTYARD = art("bg-courtyard");
const MAROON = "#6B1E2A";

function S({ at, src, v = 0.5 }: { at: number; src: string; v?: number }) {
  return (
    <Sequence from={at}>
      <Audio src={staticFile(src)} volume={v} />
    </Sequence>
  );
}
const POP = "sfx/story-pop.mp3";
const STAMP = "ai/ep2/sfx-stamp.mp3";
const PAPER_SFX = "ai/ep2/sfx-paper.mp3";
const WHOOSH = "sfx/story-swipe.mp3";

// ───────────────────────────── 1 비교 칸
const ROWS: { line: Line; title: string; right: string; left: string; right2: string; t: [number, number, number] }[] = [
  { line: "n01", title: "KECHASI TELEFONDA O‘TIRSA", left: "BEKORCHI", right: "jasur-night", right2: "TIRISHQOQ", t: [0.5, 0.58, 0.9] },
  { line: "n02", title: "TELEFONGA GAPIRSA", left: "G‘ALATI", right: "jasur-talk", right2: "AI USTOZ", t: [0.4, 0.46, 0.66] },
  { line: "n03", title: "O‘YIN O‘YNASA", left: "VAQT KETDI", right: "jasur-game", right2: "100 TA SO‘Z", t: [0.45, 0.55, 0.78] },
];

function Compare() {
  const stamps = ROWS.flatMap((r) => [w(r.line, r.t[0]), w(r.line, r.t[2])]);
  const thud = useThud(stamps);
  return (
    <AbsoluteFill style={{ transform: thud }}>
      <Paper split />
      <Label at={0} bg={MAROON} color="#E9C878" size={40} x={W / 2} y={78} rot={0}>
        TELEFON LUG‘ATI
      </Label>
      <Label at={2} bg="#59606A" color="#fff" size={50} x={270} y={190} rot={-2}>
        EKRANDA REELS
      </Label>
      <Label at={5} bg={YELLOW} size={50} x={810} y={190} rot={2}>
        EKRANDA KORIO
      </Label>
      {ROWS.map((r, i) => {
        const next = ROWS[i + 1] ? AT[ROWS[i + 1].line].from - 2 : undefined;
        return (
          <Rows key={r.line}>
            <Label at={AT[r.line].from} out={next} size={62} x={W / 2} y={330}>
              {r.title}
            </Label>
            <Sticker at={AT[r.line].from + 3} height={780} out={next} src={art("jasur-scroll")} x={270} y={1250} />
            <Stamp at={w(r.line, r.t[0])} out={next} size={68} text={r.left} x={270} y={1360} />
            <Sticker at={w(r.line, r.t[1])} height={780} out={next} src={art(r.right)} x={810} y={1250} />
            <Stamp at={w(r.line, r.t[2])} color={GREEN} out={next} rot={6} size={68} text={r.right2} x={810} y={1360} />
          </Rows>
        );
      })}
      {ROWS.map((r) => (
        <Rows key={`s-${r.line}`}>
          <S at={AT[r.line].from} src={PAPER_SFX} v={0.3} />
          <S at={AT[r.line].from + 3} src={POP} v={0.3} />
          <S at={w(r.line, r.t[0])} src={STAMP} v={0.7} />
          <S at={w(r.line, r.t[1])} src={POP} v={0.3} />
          <S at={w(r.line, r.t[2])} src={STAMP} v={0.7} />
        </Rows>
      ))}
    </AbsoluteFill>
  );
}
const Rows = ({ children }: { children: ReactNode }) => <>{children}</>;

// ───────────────────────────── 2 사전
function Dictionary() {
  return (
    <AbsoluteFill>
      <Paper />
      <BookCover at={AT.n04.from} subtitle="O‘ZBEKCHA — O‘ZBEKCHA" title={["TELEFON", "LUG‘ATI"]} />
      <Label at={w("n04", 0.5)} size={66} x={W / 2} y={1270}>
        TELEFON BIR XIL
      </Label>
      <Label at={w("n04", 0.72)} bg={YELLOW} rot={1.5} size={60} x={W / 2} y={1390}>
        TARJIMASI — <span style={{ color: RED }}>EKRANGA</span> QARAB
      </Label>
      <S at={AT.n04.from} src={WHOOSH} v={0.4} />
      <S at={w("n04", 0.5)} src={PAPER_SFX} v={0.3} />
      <S at={w("n04", 0.72)} src={PAPER_SFX} v={0.3} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 3 밤 11시
function Night() {
  const [from, to] = SCENES.night;
  const bekorchi = w("a01", 0.82);
  const thud = useThud([bekorchi]);
  return (
    <AbsoluteFill style={{ transform: thud }}>
      <Backdrop from={from} src={COURTYARD} to={to} />
      <Headword at={from + 2} tarjima="BEKORCHI" tarjimaAt={bekorchi} word="KECHASI TELEFONDA O‘TIRISH" />
      <Sticker at={AT.n05.from + 2} height={860} src={art("jasur-night")} x={660} y={1640} />
      <Sticker at={w("n05", 0.42)} height={250} rot={6} src={art("prop-clock")} x={900} y={640} />
      <Label at={w("n05", 0.5)} bg={INK} color="#fff" size={44} x={900} y={690} rot={3}>
        SOAT 23:00
      </Label>
      <Sticker at={AT.a01.from - 4} height={540} src={art("auntie-peek")} x={250} y={1090} />
      <Bubble at={AT.a01.from} out={w("a01", 0.45)} x={330} y={560}>
        Voy, yarim tun-ku!
      </Bubble>
      <Bubble at={w("a01", 0.45)} out={AT.a02.from} x={330} y={560}>
        Yana telefonda!
      </Bubble>
      <Stamp at={bekorchi} size={84} text="BEKORCHI!" x={680} y={1180} />
      <Bubble at={AT.a02.from} x={330} y={560}>
        Bunga kim ish beradi?
      </Bubble>
      <S at={from} src={WHOOSH} v={0.35} />
      <S at={AT.n05.from + 2} src={POP} v={0.35} />
      <S at={w("n05", 0.42)} src={POP} v={0.3} />
      <S at={AT.a01.from - 4} src={POP} v={0.35} />
      <S at={bekorchi} src={STAMP} v={0.8} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 4 화면 속 KORIO
type Feature = { line: Line; title: string; stamp: string; clips: { name: string; trim: number }[] };
const FEATURES: Feature[] = [
  { line: "n07", title: "HANGUL ALIFBOSI", stamp: "O‘YIN ORQALI", clips: [{ name: "hangul", trim: 0 }] },
  { line: "n08", title: "HAR BIR SO‘Z", stamp: "O‘ZBEKCHA", clips: [{ name: "lesson", trim: 0 }] },
  { line: "n09", title: "AI USTOZ", stamp: "JONLI SUHBAT", clips: [{ name: "tutor", trim: 180 }] },
  { line: "n10", title: "TALAFFUZ", stamp: "QULOQ O‘RGANADI", clips: [{ name: "pronQuiz", trim: 30 }] },
  { line: "n11", title: "TOPIK", stamp: "SAVOLLAR BILAN", clips: [{ name: "topik", trim: 9 }] },
  {
    line: "n12",
    title: "SERIYA · LIGA · SOVG‘ALAR",
    stamp: "TASHLAB KETOLMAYSIZ",
    clips: [
      { name: "streak", trim: 30 },
      { name: "league", trim: 15 },
      { name: "jackpot", trim: 24 },
    ],
  },
];

function Clip({ name, trim }: { name: string; trim: number }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <OffthreadVideo muted src={staticFile(`clips/${name}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} trimBefore={trim} />
    </div>
  );
}

function Screen() {
  const [from, to] = SCENES.screen;
  const segs = FEATURES.map((f, i) => {
    const start = AT[f.line].from - 3;
    const end = FEATURES[i + 1] ? AT[FEATURES[i + 1].line].from - 3 : to;
    return { ...f, start, end };
  });
  const phoneAt = w("n06", 0.45);
  const thud = useThud(segs.map((s) => w(s.line, 0.55)));
  return (
    <AbsoluteFill style={{ transform: thud }}>
      <Paper />
      <Label at={from + 2} bg={RED} color="#fff" out={segs[0].start} size={84} x={W / 2} y={250}>
        SHOSHMANG!
      </Label>
      <Label at={w("n06", 0.5)} out={segs[0].start} size={50} x={W / 2} y={360} rot={1.5}>
        EKRANGA QARANG
      </Label>
      <PhoneSticker at={phoneAt} scale={0.92} x={W / 2} y={430}>
        {/* 처음엔 홈 화면, 그다음 기능마다 실제 녹화 */}
        <Img src={staticFile("stills/home.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        {segs.map((s) => {
          const part = Math.floor((s.end - s.start) / s.clips.length);
          return s.clips.map((c, k) => (
            <Sequence durationInFrames={k === s.clips.length - 1 ? s.end - s.start - part * k : part} from={s.start + part * k} key={`${s.line}-${c.name}`} layout="none">
              <Clip name={c.name} trim={c.trim} />
            </Sequence>
          ));
        })}
      </PhoneSticker>
      {segs.map((s) => (
        <Rows key={s.line}>
          <Label at={s.start} bg={INK} color="#fff" out={s.end} size={66} x={W / 2} y={300} rot={-1.5}>
            {s.title}
          </Label>
          <Stamp at={w(s.line, 0.55)} color={GREEN} out={s.end} rot={-7} size={s.stamp.length > 14 ? 50 : 60} text={s.stamp} x={790} y={1520} />
          <S at={s.start} src={WHOOSH} v={0.3} />
          <S at={w(s.line, 0.55)} src={STAMP} v={0.6} />
        </Rows>
      ))}
      <S at={from + 2} src={PAPER_SFX} v={0.3} />
      <S at={phoneAt} src={POP} v={0.4} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 5 1년 뒤
function Later() {
  const [from, to] = SCENES.later;
  const offer = w("a03", 0.72);
  const thud = useThud([offer]);
  return (
    <AbsoluteFill style={{ transform: thud }}>
      <Backdrop from={from} src={COURTYARD} to={to} />
      <Headword at={from + 2} color={GREEN} tarjima="KOREYADAN ISH TAKLIFI" tarjimaAt={offer} word="KECHASI TELEFONDA O‘TIRISH" />
      <Label at={AT.n13.from} bg={YELLOW} rot={-6} size={72} x={300} y={420}>
        1 YILDAN KEYIN
      </Label>
      <Sticker at={w("n13", 0.55)} height={220} rot={-5} src={art("prop-clock")} x={890} y={580} />
      <Sticker at={AT.n13.from + 6} height={820} src={art("jasur-call")} x={650} y={1630} />
      <Label at={AT.n14.from} bg={INK} color="#fff" out={AT.k01.from} size={46} x={W / 2} y={560}>
        KOREYADAGI KOMPANIYA BILAN SUHBAT
      </Label>
      <Bubble at={AT.k01.from} out={AT.a03.from + 4} size={44} tail="right" x={600} y={780}>
        <span style={{ fontFamily: KO, fontWeight: 800 }}>네, 한국어로 말할 수 있습니다!</span>
        <div style={{ fontSize: 30, color: "#6E675C", marginTop: 6 }}>(Ha, koreyscha gapira olaman!)</div>
      </Bubble>
      <Sticker at={AT.a03.from - 4} height={480} src={art("auntie-shush")} x={230} y={1200} />
      <Bubble at={AT.a03.from} x={300} y={700}>
        Sekinroq!
      </Bubble>
      <Stamp at={offer} color={GREEN} rot={-6} size={62} text="ISH TAKLIFI" x={620} y={1330} />
      <S at={from} src={WHOOSH} v={0.35} />
      <S at={AT.n13.from} src={PAPER_SFX} v={0.3} />
      <S at={AT.n13.from + 6} src={POP} v={0.35} />
      <S at={AT.a03.from - 4} src={POP} v={0.35} />
      <S at={offer} src={STAMP} v={0.8} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 6 반전 — 같은 전화, 다른 화면 / 정지 / 모두 / 파란 방
function Same({ grey = false }: { grey?: boolean }) {
  const start = SCENES.same[0];
  return (
    <AbsoluteFill style={{ filter: grey ? "grayscale(1) contrast(1.15) brightness(0.92)" : undefined }}>
      <Paper split />
      <Label at={AT.n15.from} size={70} x={W / 2} y={230}>
        BIR XIL TELEFON
      </Label>
      <Sticker at={start + 2} height={640} src={art("jasur-night")} x={270} y={1200} />
      <Stamp at={start + 6} size={54} text="BEKORCHI" x={270} y={1300} />
      <Sticker at={start + 4} height={640} src={art("jasur-call")} x={810} y={1200} />
      <Stamp at={start + 10} color={GREEN} rot={6} size={54} text="ISH TAKLIFI" x={810} y={1300} />
      <Label at={w("n15", 0.55)} bg={YELLOW} rot={1.5} size={78} x={W / 2} y={1470}>
        EKRAN <span style={{ color: RED }}>BOSHQA</span>
      </Label>
    </AbsoluteFill>
  );
}

function Freeze() {
  const frame = useCurrentFrame();
  const [from] = SCENES.freeze;
  const burst = frame - from;
  return (
    <AbsoluteFill>
      <Same grey />
      <AbsoluteFill style={{ background: `rgba(255,255,255,${Math.max(0, 0.6 - burst * 0.12)})` }} />
      <Stamp at={from + 1} rot={-4} size={86} text="SHOSHMANG!" x={W / 2} y={820} />
      <S at={from} src="ai/ep2/sfx-scratch.mp3" v={0.7} />
      <S at={from + 1} src={STAMP} v={0.8} />
    </AbsoluteFill>
  );
}

function Why() {
  const yoq = w("n16", 0.45);
  const all = w("n16", 0.62);
  const thud = useThud([all]);
  return (
    <AbsoluteFill style={{ transform: thud }}>
      <Paper />
      <Label at={AT.n16.from} bg={RED} color="#fff" size={70} x={W / 2} y={250}>
        QO‘SHNI YOMON ODAMMI?
      </Label>
      <Sticker at={AT.n16.from + 3} height={600} src={art("auntie-peek")} x={W / 2} y={1080} />
      <Label at={yoq} bg={INK} color="#fff" rot={4} size={64} x={830} y={420}>
        YO‘Q
      </Label>
      <Stamp at={all} color={INK} rot={-3} size={120} text="HAMMAMIZ" x={W / 2} y={1250} />
      <Label at={w("n16", 0.82)} bg={YELLOW} rot={-2} size={56} x={760} y={1400}>
        SIZ HAM
      </Label>
      <S at={AT.n16.from} src={PAPER_SFX} v={0.3} />
      <S at={AT.n16.from + 3} src={POP} v={0.3} />
      <S at={all} src={STAMP} v={0.7} />
    </AbsoluteFill>
  );
}

function Blue() {
  const [from] = SCENES.blue;
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [w("n18", 0.75), w("n18", 0.95)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, #22407A 0%, #13265A 45%, #0A1433 100%)" }}>
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 26px)" }} />
      <div style={{ position: "absolute", left: W / 2 - 330, top: 760, width: 660, height: 660, borderRadius: 330, background: `radial-gradient(circle, rgba(255,214,110,${0.45 * glow}), transparent 70%)` }} />
      <Label at={from + 4} bg="#2B3A63" color="#C9D3EE" rot={-3} size={38} x={300} y={460}>
        BUGUN
      </Label>
      <Label at={from + 6} bg={RED} color="#fff" rot={-3} size={62} x={300} y={560}>
        «BEKORCHI!»
      </Label>
      <Sticker at={from + 2} height={760} src={art("jasur-night")} x={W / 2} y={1460} />
      <Label at={w("n18", 0.32)} bg="#E9ECF5" out={w("n18", 0.74)} size={64} x={W / 2} y={1560}>
        XAFA BO‘LMANG
      </Label>
      <Label at={w("n18", 0.6)} bg="#E9ECF5" size={64} x={W / 2} y={300} style={{ textDecoration: frame > w("n18", 0.7) ? "line-through" : undefined, textDecorationColor: RED, textDecorationThickness: 6 }}>
        SIZNI EMAS
      </Label>
      <Label at={w("n18", 0.74)} bg={YELLOW} size={64} x={W / 2} y={1560}>
        EKRANINGIZNI KO‘RYAPTI
      </Label>
      <S at={from} src={WHOOSH} v={0.35} />
      <S at={w("n18", 0.32)} src={PAPER_SFX} v={0.3} />
      <S at={w("n18", 0.74)} src={PAPER_SFX} v={0.3} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 7 그 이웃
function Payoff() {
  const [from, to] = SCENES.payoff;
  return (
    <AbsoluteFill>
      <Backdrop from={from} src={COURTYARD} to={to} />
      <Label at={AT.n19.from} bg={INK} color="#fff" size={70} x={W / 2} y={200}>
        O‘SHA QO‘SHNI
      </Label>
      <Label at={w("n19", 0.5)} bg={YELLOW} rot={1.5} size={44} x={W / 2} y={300}>
        HOZIR HAMMAGA AYTADI:
      </Label>
      <Sticker at={AT.n19.from + 4} height={580} src={art("auntie-brag")} x={360} y={1260} />
      <Bubble at={AT.a04.from} out={w("a04", 0.48)} x={640} y={680}>
        Men doim aytardim!
      </Bubble>
      <Bubble at={w("a04", 0.48)} x={640} y={680}>
        Bu boladan odam chiqadi!
      </Bubble>
      <Sticker at={AT.n20.from} height={300} rot={8} src={art("prop-gift")} x={840} y={1430} />
      <Label at={AT.n20.from + 4} size={54} x={W / 2} y={1520}>
        TARJIMA: <span style={{ color: RED }}>SEULDAN SOVG‘A KELDI</span>
      </Label>
      <S at={from} src={WHOOSH} v={0.35} />
      <S at={AT.n19.from + 4} src={POP} v={0.35} />
      <S at={AT.n20.from} src={POP} v={0.35} />
      <S at={AT.n20.from + 4} src={PAPER_SFX} v={0.3} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 8 끝 — 댓글 + KORIO
function Cta() {
  const frame = useCurrentFrame();
  const [from] = SCENES.cta;
  const brandAt = AT.n22.from;
  const typingAt = w("n21", 0.4);
  return (
    <AbsoluteFill>
      <Paper />
      <Label at={AT.n21.from} out={brandAt} size={48} x={W / 2} y={230}>
        KOREYS TILINI O‘RGANAMAN DESANGIZ —
      </Label>
      <Label at={w("n21", 0.3)} bg={YELLOW} out={brandAt} rot={1.5} size={74} x={W / 2} y={345}>
        SIZGA <span style={{ color: RED }}>NIMA</span> DEYISHGAN?
      </Label>
      {frame < brandAt ? (
        <PhoneSticker at={from + 2} rot={4} scale={0.42} x={W / 2} y={440}>
          <Img src={staticFile("stills/home.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </PhoneSticker>
      ) : null}
      <CommentBox at={typingAt} words={["kech", "qiyin", "behuda"]} x={W / 2} y={1090} />
      <Label at={w("n21", 0.78)} bg={RED} color="#fff" size={60} x={W / 2} y={1240}>
        IZOHDA — BITTA SO‘Z
      </Label>
      {frame >= w("n21", 0.78) ? (
        <div style={{ position: "absolute", left: W / 2 - 22, top: 1300 + Math.sin(frame / 4) * 8, width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: `30px solid ${RED}` }} />
      ) : null}

      <Label at={brandAt} bg={INK} color="#fff" size={54} x={W / 2} y={230}>
        EKRANINGIZNI ALMASHTIRING
      </Label>
      {frame >= brandAt + 4 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, transform: `scale(${interpolate(frame, [brandAt + 4, brandAt + 12], [0.6, 1], { extrapolateRight: "clamp" })})` }}>
          <Wordmark size={150} />
          <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
            {["App Store", "Google Play"].map((store) => (
              <div key={store} style={{ padding: "14px 30px", borderRadius: 999, background: "#111", color: "#fff", fontFamily: COND, fontWeight: 700, fontSize: 44 }}>
                {store}
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 30px", borderRadius: 999, background: "#2AABEE", color: "#fff", fontFamily: COND, fontWeight: 700, fontSize: 44 }}>Telegram: @KorioLoginBot</div>
        </div>
      ) : null}
      <Label at={w("n22", 0.72)} bg="#2F5BEA" color="#fff" rot={-1} size={56} x={W / 2} y={1400}>
        ISHONMAGANLARGA YUBORING
      </Label>
      <S at={AT.n21.from} src={PAPER_SFX} v={0.3} />
      <S at={typingAt + 8} src="ai/ep2/sfx-typing.mp3" v={0.4} />
      <S at={typingAt + 40} src="ai/ep2/sfx-typing.mp3" v={0.4} />
      <S at={w("n21", 0.78)} src={STAMP} v={0.5} />
      <S at={brandAt + 4} src={POP} v={0.5} />
    </AbsoluteFill>
  );
}

/** 릴스 표지 — 프로필 격자(가운데 3:4, y 240~1680)에 다 들어오게. 모든 것이 이미 자리 잡은 상태(at 음수) */
export function Ep2Cover() {
  const done = -100;
  return (
    <AbsoluteFill>
      <svg height={0} style={{ position: "absolute" }} width={0}>
        <filter id="stamp-ink">
          <feTurbulence baseFrequency="0.9" numOctaves={2} result="noise" seed={3} type="fractalNoise" />
          <feColorMatrix in="noise" result="mask" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.45" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </svg>
      <Paper split />
      <Label at={done} bg={MAROON} color="#E9C878" rot={0} size={46} x={W / 2} y={330}>
        TELEFON LUG‘ATI
      </Label>
      <Label at={done} size={84} x={W / 2} y={460}>
        BIR XIL TELEFON
      </Label>
      <Sticker at={done} height={660} src={art("jasur-scroll")} x={270} y={1200} />
      <Sticker at={done} height={660} src={art("jasur-call")} x={810} y={1200} />
      <Stamp at={done} size={62} text="BEKORCHI" x={270} y={1300} />
      <Stamp at={done} color={GREEN} rot={6} size={58} text="ISH TAKLIFI" x={810} y={1300} />
      <Label at={done} bg={YELLOW} rot={1.5} size={96} x={W / 2} y={1470}>
        EKRAN <span style={{ color: RED }}>BOSHQA</span>
      </Label>
    </AbsoluteFill>
  );
}

export function Ep2() {
  const [fz0, fz1] = SCENES.freeze;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* 도장 잉크 결 */}
      <svg height={0} style={{ position: "absolute" }} width={0}>
        <filter id="stamp-ink">
          <feTurbulence baseFrequency="0.9" numOctaves={2} result="noise" seed={3} type="fractalNoise" />
          <feColorMatrix in="noise" result="mask" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.45" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </svg>
      <Window from={SCENES.compare[0]} to={SCENES.compare[1]}><Compare /></Window>
      <Window from={SCENES.dictionary[0]} to={SCENES.dictionary[1]}><Dictionary /></Window>
      <Window from={SCENES.night[0]} to={SCENES.night[1]}><Night /></Window>
      <Window from={SCENES.screen[0]} to={SCENES.screen[1]}><Screen /></Window>
      <Window from={SCENES.later[0]} to={SCENES.later[1]}><Later /></Window>
      <Window from={SCENES.same[0]} to={SCENES.same[1]}><Same /></Window>
      <Window from={fz0} to={fz1}><Freeze /></Window>
      <Window from={SCENES.why[0]} to={SCENES.why[1]}><Why /></Window>
      <Window from={SCENES.blue[0]} to={SCENES.blue[1]}><Blue /></Window>
      <Window from={SCENES.payoff[0]} to={SCENES.payoff[1]}><Payoff /></Window>
      <Window from={SCENES.cta[0]} to={SCENES.cta[1]}><Cta /></Window>

      {/* 목소리 */}
      {(Object.keys(AT) as Line[]).map((line) => (
        <Sequence from={AT[line].from} key={line}>
          <Audio src={staticFile(`ai/ep2/v-${line}.mp3`)} />
        </Sequence>
      ))}
      {/* 배경 음악 — 22초 고리 두 개를 번갈아, 정지 순간엔 끊는다 */}
      {Array.from({ length: Math.ceil(TOTAL / 660) }, (_, i) => (
        <Sequence durationInFrames={660} from={i * 660} key={i}>
          <Audio
            src={staticFile(`ai/ep2/music-${i % 2 ? "b" : "a"}.mp3`)}
            volume={(f) => {
              const g = i * 660 + f;
              if (g >= fz0 && g < fz1 + 6) return 0;
              const fadeOut = interpolate(g, [TOTAL - 40, TOTAL], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return 0.12 * fadeOut;
            }}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
