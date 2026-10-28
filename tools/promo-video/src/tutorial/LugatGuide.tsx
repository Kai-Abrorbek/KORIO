/**
 * 사용법 영상 — "Lug'at" 학습 카드 (약 70초). "외운 걸 연습 문제로 익히는 곳" 을 보여 준다.
 *
 *  훅     원고지에 적은 단어가 흐려진다 "So‘z yodladingiz — keyin-chi?" → 휴대폰 속 문제 유형이 휙휙 "LUG‘AT"
 *  1      홈 «Yo‘nalish» → «Lug‘at» (vocabTour)
 *  2      레슨 지도 — 단원 띠 · 노드 · 위아래로 훑기 · 노드 하나에 Dars 2/5 (vocabTour · vbJump)
 *  3      건너뛰기 — 다음 단원 첫 노드 "Shu yerga o‘tasizmi?" → «Testni boshlash» → 시험 화면 (vbJump)
 *  4      문제 유형 — 그림 고르기 · 단어 연결 · 듣고 문장 만들기 · 말하기(AI 점수) (lesson · vocabMatch · vocabBuilder · speaking)
 *  5      기록 — 레슨 완료 XP · 정확도 · 시간 (stamp)
 *  6      보상 — 상자 «Sandiqni ochish» → 보석, 끝낸 노드 «Takrorlash» · «Legend» (vbChest)
 *  꿀팁   아는 건 건너뛰고, 나머지는 Legend 까지
 *  끝     KORIO 받기 + 저장
 */
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import voice from "./lugat.voice.json";
import { Caption, FPS, Recording, Ring, Slap, Tap, pop, ramp, segment, when, type Seg } from "./episode";
import { CuttingMat, Guide, HAND, HEAVY, HIGHLIGHT, INK, Manuscript, MarkerArrow, PURPLE, StickyNote, Tape, TapedPhone, W } from "./kit";

type Line = keyof typeof voice;
const f = (line: Line) => Math.round(voice[line] * FPS);
const GUIDE = "ai/tutorial/guide-point.png";
const ease = Easing.bezier(0.65, 0, 0.35, 1);

// ───────────────────────────── 시간표
const HOOK = f("v01") + 34; // 훅 첫 장면 (휴대폰 없음)
const S0 = segment(
  [
    { src: "lesson", play: [20, 40] }, { src: "vocabMatch", play: [120, 140] }, { src: "vocabBuilder", play: [60, 80] }, { src: "speaking", play: [100, 120] },
    { src: "lesson", play: [45, 65] }, { src: "vocabMatch", play: [160, 180] }, { src: "vocabBuilder", play: [100, 120] }, { src: "speaking", play: [120, 140] },
  ],
  HOOK, f("v02") + 10,
);
const S1 = segment([{ src: "vocabTour", play: [0, 36] }, { src: "vocabTour", hold: [36, 20] }, { src: "vocabTour", play: [36, 100] }, { src: "vocabTour", hold: [100, 22] }, { src: "vocabTour", play: [100, 140] }], S0.from + S0.len, f("v03") + 8);
const S2 = segment([{ src: "vocabTour", play: [140, 236] }, { src: "vbJump", play: [30, 108] }], S1.from + S1.len, f("v04") + 8);
const S3 = segment([{ src: "vocabTour", play: [246, 318] }, { src: "vbJump", play: [178, 300] }], S2.from + S2.len, f("v05") + 8);
const TYPES = [
  { src: "lesson", play: [12, 70] as [number, number], name: "RASM TANLASH", color: "#FFE14D" },
  { src: "vocabMatch", play: [112, 182] as [number, number], name: "SO‘Z MOSLASH", color: "#B6E3FF" },
  { src: "vocabBuilder", play: [40, 112] as [number, number], name: "ESHITIB GAP TUZISH", color: "#FFB3C7" },
];
const S4 = segment(TYPES.map((t) => ({ src: t.src, play: t.play })), S3.from + S3.len, f("v06") + 8);
const S5 = segment([{ src: "speaking", play: [10, 140] }], S4.from + S4.len, f("v07") + 10);
const S6 = segment([{ src: "stamp", play: [0, 135] }], S5.from + S5.len, f("v08") + 8);
const S7 = segment([{ src: "vbChest", play: [176, 232] }, { src: "vbChest", play: [284, 392] }], S6.from + S6.len, f("v09") + 8);
const S8 = segment([{ src: "vbChest", play: [86, 156] }], S7.from + S7.len, f("v10") + 8);
const SEGS: Seg[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8];
const TIP = S8.from + S8.len;
const CTA = TIP + f("v11") + 18;
export const LUGAT_GUIDE_TOTAL = CTA + f("v12") + 45;

const LINE_AT: Record<Line, number> = {
  v01: 14, v02: S0.from + 4, v03: S1.from + 4, v04: S2.from + 4, v05: S3.from + 4, v06: S4.from + 4,
  v07: S5.from + 4, v08: S6.from + 4, v09: S7.from + 4, v10: S8.from + 4, v11: TIP + 6, v12: CTA + 8,
};

// ───────────────────────────── 훅: 흐려지는 단어장
function Hook() {
  const frame = useCurrentFrame();
  if (frame >= HOOK + 10) return null;
  const sheet = pop(frame, 0, 140, 15);
  const chars = ["학", "생", "", "선", "생", "님", "", "의", "사", "", "친", "구"];
  const typed = Math.floor(ramp(frame, 6, 30) * chars.length);
  const fade = interpolate(frame, [LINE_AT.v01 + f("v01") * 0.55, LINE_AT.v01 + f("v01") * 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const leave = interpolate(frame, [HOOK - 8, HOOK + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ transform: `translateX(${leave * -1200}px) rotate(${leave * -8}deg)` }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - sheet) * -900}px)` }}>
        <div style={{ position: "absolute", inset: 0, filter: `blur(${fade * 7}px)`, opacity: 1 - fade * 0.75 }}>
          {/* 한 줄 6칸: 학생 선생님 / 의사 친구 — 단어가 줄을 넘지 않게 */}
          <Manuscript cell={120} chars={chars.slice(0, typed)} h={400} rot={-2} w={840} x={120} y={300} />
        </div>
        <Tape rot={-16} x={170} y={280} />
        <Tape color="rgba(170,200,255,0.7)" rot={14} x={930} y={760} />
        {fade > 0.3 ? (
          <div style={{ position: "absolute", left: 600, top: 700, fontFamily: HAND, fontWeight: 700, fontSize: 74, color: "#fff", transform: `rotate(-6deg) scale(${pop(frame, LINE_AT.v01 + Math.round(f("v01") * 0.7), 260, 12)})`, textShadow: "0 4px 12px rgba(0,0,0,0.45)" }}>
            ...unutildi?
          </div>
        ) : null}
      </div>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - pop(frame, 16, 200, 13)) * 900}px)` }}>
        <Guide height={1000} src={GUIDE} x={250} y={1930} />
      </div>
      <Caption at={LINE_AT.v01} out={HOOK} text="So‘z yodladingiz — keyin-chi?" y={1560} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── 휴대폰
function Phone() {
  const frame = useCurrentFrame();
  const enter = pop(frame, HOOK - 6, 120, 15);
  const leave = interpolate(frame, [TIP - 6, TIP + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  if (frame < HOOK - 6 || frame >= TIP + 8) return null;
  // 문제 유형 · 기록 · 보상은 휴대폰을 조금 당겨서 크게
  const zIn = interpolate(frame, [S4.from - 2, S4.from + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const z = zIn;
  const scale = interpolate(z, [0, 1], [0.84, 0.96]);
  const top = interpolate(z, [0, 1], [300, 210]) + (1 - enter) * 1500 + leave * 1700;
  const rot = interpolate(z, [0, 1], [3, -1]) + (1 - enter) * 14 + leave * -18;
  // 장면이 바뀔 때 · 훅 몽타주는 조각마다 휙 돈다
  const cut = [S0, S4].flatMap((s) => s.starts.slice(1).map((t) => s.from + t));
  const last = cut.filter((t) => t <= frame).pop() ?? -100;
  const flip = interpolate(frame - last, [0, 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const overlay = (
    <>
      {/* 1: «Yo‘nalish», «Lug‘at» */}
      <Ring at={S1.from + S1.starts[1] + 2} out={when(S1, 2, 44)} x={676} y={808} rx={92} ry={88} />
      <Ring at={S1.from + S1.starts[3] + 2} out={when(S1, 4, 110)} x={572} y={657} rx={180} ry={138} seed={3} />
      {/* 2: 단원 띠, Dars 2/5 */}
      <Ring at={S2.from + 8} out={S2.from + 60} x={390} y={195} rx={380} ry={88} seed={2} />
      <Ring at={when(S2, 1, 50)} out={S2.from + S2.len - 2} x={160} y={1199} rx={150} ry={50} seed={4} />
      {/* 3: 건너뛰기 «Testni boshlash» */}
      <Ring at={when(S3, 1, 200)} out={when(S3, 1, 248)} x={390} y={1570} rx={360} ry={62} seed={5} />
      {/* 5: 말하기 점수 */}
      <Ring at={S5.from + 96} out={S5.from + S5.len - 2} x={190} y={762} rx={170} ry={72} seed={6} />
      {/* 6: 기록 */}
      <Ring at={S6.from + 100} out={S6.from + S6.len - 2} x={390} y={1424} rx={380} ry={86} seed={7} />
      {/* 7: «Sandiqni ochish», 보석 */}
      <Ring at={when(S7, 0, 200)} out={when(S7, 0, 224)} x={390} y={591} rx={330} ry={58} seed={8} />
      <Ring at={when(S7, 1, 360)} out={S7.from + S7.len - 2} x={390} y={270} rx={260} ry={80} seed={9} />
      {/* 8: «Takrorlash», «Legend» */}
      <Ring at={S8.from + 22} out={S8.from + 70} x={390} y={955} rx={330} ry={56} seed={10} />
      <Ring at={S8.from + 70} out={S8.from + S8.len - 2} x={390} y={1082} rx={330} ry={56} seed={11} />
    </>
  );
  return (
    <div style={{ position: "absolute", inset: 0, transform: `perspective(1600px) rotateY(${flip * 60}deg)` }}>
      <TapedPhone overlay={overlay} rot={rot} scale={scale} screen={<Recording segs={SEGS} />} x={560} y={top}>
        <Tap at={when(S1, 2, 42)} x={676} y={808} />
        <Tap at={when(S1, 4, 108)} x={572} y={657} />
        <Tap at={when(S2, 1, 36)} x={292} y={976} />
        <Tap at={when(S3, 1, 180)} x={500} y={1222} />
        <Tap at={when(S3, 1, 246)} x={390} y={1570} />
        <Tap at={when(S7, 0, 222)} x={390} y={591} />
        {[288, 309, 330].map((t) => (
          <Tap at={when(S7, 1, t)} key={t} x={390} y={800} />
        ))}
        <Tap at={when(S8, 0, 90)} x={500} y={604} />
      </TapedPhone>
    </div>
  );
}

// ───────────────────────────── 제목 · 단계 포스트잇 · 문제 유형 이름 · 자막
function Overlays() {
  const frame = useCurrentFrame();
  const notes = [
    { at: S1.from + 2, out: S2.from, step: "1", text: "«Yo‘nalish» → «Lug‘at»", x: 24, rot: -6 },
    { at: S2.from + 2, out: S3.from, step: "2", text: "Darslar xaritasi", x: 24, rot: 4, color: "#FFB3C7" },
    { at: S3.from + 2, out: S4.from, step: "3", text: "Bilganingizni sakrab o‘ting", x: 726, rot: 5, color: "#B6E3FF" },
    { at: S4.from + 2, out: S6.from, step: "4", text: "Mashq turlari", x: 726, rot: -5, color: "#C6F5B8" },
    { at: S6.from + 2, out: S7.from, step: "5", text: "Natija yoziladi", x: 24, rot: -4, color: "#FFD3A3" },
    { at: S7.from + 2, out: TIP, step: "6", text: "Mukofot", x: 24, rot: 5 },
  ];
  const title = pop(frame, S0.from + 4, 260, 11);
  return (
    <>
      {/* 훅 둘째: 휴대폰 위에 LUG‘AT */}
      {frame >= S0.from + 4 && frame < S1.from + 6 ? (
        <>
          <div style={{ position: "absolute", left: 40, top: 150, transform: `rotate(-5deg) scale(${interpolate(title, [0, 1], [2.2, 1])})`, opacity: Math.min(1, title * 2) * (1 - ramp(frame, S1.from - 4, 8)), fontFamily: HEAVY, fontSize: 150, lineHeight: 1, color: "#fff", textShadow: `8px 9px 0 ${PURPLE}, 0 18px 30px rgba(0,0,0,0.35)` }}>
            LUG‘AT
          </div>
        </>
      ) : null}
      <Slap at={S0.from + 18} out={S1.from - 2} rot={-10}>
        <StickyNote rot={5} size={360} x={670} y={1180}>
          <span style={{ fontSize: 44 }}>Yodlaganingizni mashq qiling</span>
        </StickyNote>
      </Slap>
      {notes.map((n) => (
        <Slap at={n.at} key={n.step} out={n.out} rot={n.rot * 3}>
          <StickyNote color={n.color} rot={n.rot} size={320} step={n.step} x={n.x} y={70}>
            {n.text}
          </StickyNote>
        </Slap>
      ))}
      {[...TYPES.map((t, i) => ({ ...t, at: S4.from + S4.starts[i], out: i < TYPES.length - 1 ? S4.from + S4.starts[i + 1] : S5.from })), { name: "GAPIRISH + AI BAHO", color: "#FFD3A3", at: S5.from, out: S6.from }].map((t, i) => (
        <Slap at={t.at} key={t.name} out={t.out - 6} rot={i % 2 ? 10 : -10}>
          <div style={{ position: "absolute", left: i % 2 ? 470 : 40, top: 1450, padding: "18px 30px", background: t.color, transform: `rotate(${i % 2 ? 4 : -4}deg)`, boxShadow: "0 14px 22px rgba(0,0,0,0.3)", fontFamily: HEAVY, fontSize: 58, color: INK }}>
            {t.name}
          </div>
        </Slap>
      ))}
      <Caption at={LINE_AT.v03} out={S2.from} text="«Yo‘nalish» → «Lug‘at»" />
      <Caption at={LINE_AT.v04} out={S3.from} text="Bo‘lim → birlik → tugun → darslar" />
      <Caption at={LINE_AT.v05} out={S4.from} text="Bilganingizni test bilan sakrab o‘ting" />
      <Caption at={LINE_AT.v08} out={S7.from} text="XP · aniqlik · vaqt — har dars yoziladi" y={1560} />
      <Caption at={LINE_AT.v09} out={S8.from} text="Tugun tugadi — sandiq va olmos" y={1560} />
      <Caption at={LINE_AT.v10} out={TIP} text="«Takrorlash» yoki «Legend»" y={1560} />
    </>
  );
}

// ───────────────────────────── 꿀팁
function Tip() {
  const frame = useCurrentFrame();
  if (frame < TIP || frame >= CTA + 8) return null;
  const leave = interpolate(frame, [CTA - 8, CTA + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const half = LINE_AT.v11 + Math.round(f("v11") * 0.45);
  return (
    <AbsoluteFill style={{ transform: `translateY(${leave * -1900}px)` }}>
      <Slap at={TIP + 2} rot={-10}>
        <StickyNote color={HIGHLIGHT} rot={-5} size={430} x={60} y={150}>
          <span style={{ fontFamily: HEAVY, fontSize: 60, color: PURPLE }}>MASLAHAT</span>
          <br />
          Bilganingizni — sakrab o‘ting
        </StickyNote>
      </Slap>
      {/* 건너뛰기 표시: 겹친 화살 세 개 */}
      <div style={{ position: "absolute", left: 560, top: 260, display: "flex", gap: 6, transform: `scale(${pop(frame, TIP + 12, 220, 12)})` }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 0, height: 0, borderTop: "70px solid transparent", borderBottom: "70px solid transparent", borderLeft: `90px solid ${i === 2 ? "#FFC43D" : "rgba(255,255,255,0.85)"}`, opacity: ramp(frame, TIP + 12 + i * 4, 6) }} />
        ))}
      </div>
      <Slap at={half} rot={10}>
        <StickyNote color="#FFD873" rot={4} size={460} x={520} y={700}>
          <span style={{ fontFamily: HEAVY, fontSize: 58, color: "#B7791F" }}>LEGEND</span>
          <br />
          Qolganini — oltin darajagacha mashq qiling
        </StickyNote>
      </Slap>
      {frame >= half + 8 ? <MarkerArrow bend={0.3} draw={ramp(frame, half + 8, 10)} from={[400, 620]} to={[560, 760]} /> : null}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - pop(frame, TIP + 6, 200, 13)) * 900}px)` }}>
        <Guide height={760} src={GUIDE} x={200} y={1960} />
      </div>
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
        <Guide height={860} src={GUIDE} x={720} y={1930} />
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
  const rings = [S1.from + S1.starts[1] + 2, S1.from + S1.starts[3] + 2, S2.from + 8, when(S2, 1, 50), when(S3, 1, 200), S5.from + 96, S6.from + 100, when(S7, 0, 200), when(S7, 1, 360), S8.from + 22, S8.from + 70];
  const taps = [when(S1, 2, 42), when(S1, 4, 108), when(S2, 1, 36), when(S3, 1, 180), when(S3, 1, 246), when(S7, 0, 222), when(S8, 0, 90)];
  const slaps = [S0.from + 18, S1.from + 2, S2.from + 2, S3.from + 2, S4.from + 2, S6.from + 2, S7.from + 2, ...S4.starts.map((t) => S4.from + t), S5.from, TIP + 2, CTA + 40];
  return (
    <>
      {(Object.keys(LINE_AT) as Line[]).map((line) => s(LINE_AT[line], `ai/tutorial/lugat/v-${line}.mp3`, 1))}
      {rings.map((at) => s(at, sfx("marker"), 0.35))}
      {taps.map((at) => s(at, "sfx/click.wav", 0.6))}
      {slaps.map((at) => s(at, sfx("slap"), 0.45))}
      {S0.starts.slice(1).map((t) => s(S0.from + t, sfx("whoosh"), 0.25))}
      {s(HOOK - 6, sfx("tape"), 0.5)}
      {[HOOK - 10, TIP - 6, CTA - 6].map((at) => s(at, sfx("whoosh"), 0.4))}
      {/* 앱 소리: 정답 · 상자 탭 · 상자 열림 */}
      {[when(S4, 0, 47), when(S4, 1, 170), when(S4, 2, 100)].map((at) => s(at, "sfx/correct.wav", 0.4))}
      {[288, 309, 330].map((t) => s(when(S7, 1, t), "sfx/click.wav", 0.5))}
      {s(when(S7, 1, 338), "sfx/chest-open-rare.wav", 0.55)}
      {s(S6.from + 30, "sfx/lesson-complete.wav", 0.45)}
      {Array.from({ length: Math.ceil(LUGAT_GUIDE_TOTAL / 660) }, (_, i) => (
        <Sequence durationInFrames={660} from={i * 660} key={`m${i}`}>
          <Audio src={staticFile("ai/tutorial/music.mp3")} volume={(fr) => 0.1 * interpolate(i * 660 + fr, [LUGAT_GUIDE_TOTAL - 40, LUGAT_GUIDE_TOTAL], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        </Sequence>
      ))}
    </>
  );
}

export function LugatGuide() {
  return (
    <AbsoluteFill>
      <CuttingMat />
      <Hook />
      <Phone />
      <Overlays />
      <Tip />
      <Cta />
      <Sound />
    </AbsoluteFill>
  );
}

/** 릴스 표지 — 격자 안(y 240~1680) */
export function LugatGuideCover() {
  return (
    <AbsoluteFill>
      <CuttingMat />
      <div style={{ position: "absolute", left: 120, top: 300, fontFamily: HEAVY, fontSize: 170, lineHeight: 1, color: "#fff", transform: "rotate(-5deg)", textShadow: `8px 9px 0 ${PURPLE}, 0 18px 30px rgba(0,0,0,0.35)` }}>LUG‘AT</div>
      <StickyNote rot={5} size={380} x={480} y={500}>
        <span style={{ fontSize: 46 }}>Yodlaganingizni mashq qiling</span>
      </StickyNote>
      {[
        { t: "RASM TANLASH", c: "#FFE14D", x: 60, y: 980, r: -4 },
        { t: "SO‘Z MOSLASH", c: "#B6E3FF", x: 110, y: 1090, r: 3 },
        { t: "GAPIRISH", c: "#FFB3C7", x: 60, y: 1200, r: 2 },
        { t: "SANDIQ · LEGEND", c: "#C6F5B8", x: 100, y: 1310, r: -3 },
      ].map((n) => (
        <div key={n.t} style={{ position: "absolute", left: n.x, top: n.y, padding: "16px 28px", background: n.c, transform: `rotate(${n.r}deg)`, boxShadow: "0 14px 22px rgba(0,0,0,0.3)", fontFamily: HEAVY, fontSize: 52, color: INK }}>
          {n.t}
        </div>
      ))}
      <Guide height={760} src={GUIDE} x={890} y={1720} />
    </AbsoluteFill>
  );
}
