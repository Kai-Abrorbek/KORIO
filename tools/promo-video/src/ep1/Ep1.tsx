/**
 * "Bitta tovush" 1-qism — 자요 / 짜요 (약 33초)
 *
 *   A 식당   손님 "사장님, 너무 자요!" → 사장님 "네? 뭐가 자요?" → 정지 "U aslida nima dedi?"
 *   B 풀이   자요 = uxlaydi (잠든 손님) / 짜요 = sho‘r (소금) → ㅈ · ㅉ 실제 파형 비교
 *   C 앱     KORIO 발음 퀴즈 (실제 화면 녹화: public/clips/pronQuiz.mp4) — 쌀을 듣고 맞힌다
 *   D 식당   "사장님, 너무 짜요!" → 사장님이 웃으며 물을 붓는다
 *   E 끝     "Qaysi birini eshitdingiz?" 1 자요 / 2 짜요 — 댓글로 답하기 + KORIO
 *
 * 사람은 실사 사진(ai/image.mjs), 목소리는 ai/voice.mjs. 이모지 없음.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Audio, Freeze, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Wordmark } from "../Hook";
import { BLACK, C, FPS, GREEN, Grain, H, KO, PURPLE, Photo, SeriesTag, Shot, SlamText, Subtitle, UZ, W, easeIn, onScreen, tween } from "./kit";
import waves from "./waveforms.json";

const A = 0;
const B = 240;
const CC = 490;
const D = 640;
const E = 855;
export const EP1_TOTAL = 1000;

const SHOT2 = 90; // A: 사장님으로 넘어가는 프레임
const FREEZE = 185; // A: 정지

const img = (name: string) => `ai/ep1/${name}.png`;
const sound = (name: string) => staticFile(`ai/ep1/${name}.mp3`);

function Sfx({ at, src, volume = 0.6 }: { at: number; src: string; volume?: number }) {
  return (
    <Sequence from={at}>
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  );
}

// ───────────────────────────── A 식당 — 실수
function SceneMistake() {
  const frame = useCurrentFrame();
  const snap = spring({ frame: frame - 100, fps: FPS, config: { damping: 12, stiffness: 200 } }) * 0.07;
  const zoom = spring({ frame: frame - FREEZE, fps: FPS, config: { damping: 15, stiffness: 120 } });
  const frozen = frame >= FREEZE;
  const flash = frozen ? tween(frame, FREEZE, 6, 0.85, 0) : 0;
  const owner = { x: 430, y: 235 };
  return (
    <AbsoluteFill>
      {frame < SHOT2 ? (
        <Shot dur={SHOT2} focus={{ x: 380, y: 330 }} frame={frame} src={img("customer-gpt")} whipOut={6} />
      ) : frozen ? (
        <Photo
          filter={`grayscale(${zoom * 0.55}) contrast(${1 + zoom * 0.12})`}
          origin={onScreen(owner.x, owner.y)}
          scale={1.16 + snap + zoom * 0.75}
          src={img("owner-gpt")}
        />
      ) : (
        <Shot dur={FREEZE - SHOT2} focus={owner} frame={frame - SHOT2} from={1.08} punch={snap} src={img("owner-gpt")} to={1.16} whipIn={6} />
      )}
      <Grain />
      <SeriesTag end={80} start={4} />
      <Subtitle end={SHOT2 - 4} ko="사장님, 너무 자요!" start={16} uz="(“Opa, juda sho‘r!” demoqchi edi)" />
      <Subtitle end={FREEZE - 2} ko="네? 뭐가 자요?" start={103} uz="Nima? Nima uxlayapti?" />
      <SlamText start={FREEZE + 8}>U aslida nima dedi?</SlamText>
      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />

      <Audio
        src={sound("amb-restaurant")}
        volume={(f) => interpolate(f, [0, 8, FREEZE - 2, FREEZE + 4, B], [0, 0.4, 0.4, 0.08, 0], { extrapolateRight: "clamp" })}
      />
      <Sequence from={10}>
        <Audio src={sound("v-customer")} />
      </Sequence>
      <Sfx at={SHOT2 - 8} src="sfx/story-swipe.mp3" volume={0.45} />
      <Sequence from={98}>
        <Audio src={sound("v-owner-1")} />
      </Sequence>
      <Sequence from={135}>
        <Audio src={sound("v-owner-2")} />
      </Sequence>
      <Sfx at={FREEZE} src="sfx/story-impact.mp3" volume={0.8} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── B 풀이 — 자요 / 짜요
function MeaningCard({ photo, focusY, word, meaning, top, from, start, exit, speakAt }: {
  photo: string; focusY: string; word: string; meaning: string; top: number; from: -1 | 1; start: number; exit: number; speakAt: number;
}) {
  const frame = useCurrentFrame();
  if (frame < start) return null;
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 15, stiffness: 140 } });
  const out = tween(frame, exit, 12, 0, 1, easeIn);
  const speak = spring({ frame: frame - speakAt, fps: FPS, config: { damping: 9, stiffness: 260 } });
  const glow = frame >= speakAt ? Math.max(0, 1 - (frame - speakAt) / 30) : 0;
  const tag = spring({ frame: frame - speakAt - 6, fps: FPS, config: { damping: 12, stiffness: 220 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top,
        width: W - 120,
        height: 520,
        borderRadius: 44,
        overflow: "hidden",
        boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 ${4 + glow * 6}px rgba(255,196,61,${0.25 + glow * 0.6})`,
        transform: `translateX(${(1 - s) * from * 1100}px) translateY(${out * from * -900}px) rotate(${(1 - s) * from * 8}deg) scale(${1 + (speak > 0 ? Math.sin(speak * Math.PI) * 0.03 : 0)})`,
        opacity: 1 - out,
      }}
    >
      <Img src={staticFile(img(photo))} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `center ${focusY}`, transform: `scale(${1.04 + (frame - start) * 0.0009})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.78) 100%)" }} />
      <div style={{ position: "absolute", left: 48, bottom: 26, fontFamily: KO, fontWeight: 900, fontSize: 168, color: "#fff", lineHeight: 1, textShadow: "0 6px 24px rgba(0,0,0,0.6)" }}>{word}</div>
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 56,
          padding: "14px 34px",
          borderRadius: 999,
          background: C.gold,
          fontFamily: BLACK,
          fontSize: 64,
          color: C.night,
          transform: `scale(${tag})`,
          transformOrigin: "right center",
        }}
      >
        = {meaning}
      </div>
    </div>
  );
}

function Wave({ bars, reveal, color }: { bars: number[]; reveal: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, height: 170 }}>
      {bars.map((v, i) => {
        const on = clamp(reveal * bars.length - i);
        return <div key={i} style={{ width: 5, height: 8 + v * 160 * on, borderRadius: 3, background: color, opacity: 0.25 + on * 0.75 }} />;
      })}
    </div>
  );
}
const clamp = (v: number) => Math.min(1, Math.max(0, v));

function Jamo({ glyph, word, bars, speakAt, color, start }: { glyph: string; word: string; bars: number[]; speakAt: number; color: string; start: number }) {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 13, stiffness: 160 } });
  const pulse = spring({ frame: frame - speakAt, fps: FPS, config: { damping: 7, stiffness: 300 } });
  const bump = frame >= speakAt ? Math.sin(Math.min(1, pulse) * Math.PI) * 0.12 : 0;
  // 말소리는 파일 안에서 0.2초쯤 시작해 0.5초 남짓 — 그동안 파형을 그린다
  const reveal = tween(frame, speakAt + 6, 16, 0, 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: s, transform: `translateY(${(1 - s) * 120}px)` }}>
      <div style={{ fontFamily: KO, fontWeight: 900, fontSize: 300, lineHeight: 1, color, transform: `scale(${1 + bump})`, textShadow: `0 0 ${bump * 300}px ${color}` }}>{glyph}</div>
      <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 64, color: "#fff", marginTop: 6 }}>{word}</div>
      <div style={{ marginTop: 18 }}>
        <Wave bars={bars} color={color} reveal={reveal} />
      </div>
    </div>
  );
}

function SceneMeaning() {
  const frame = useCurrentFrame();
  const head1 = spring({ frame: frame - 4, fps: FPS, config: { damping: 14, stiffness: 200 } });
  const head2 = spring({ frame: frame - 10, fps: FPS, config: { damping: 14, stiffness: 200 } });
  const tip = spring({ frame: frame - 176, fps: FPS, config: { damping: 14, stiffness: 180 } });
  const note = spring({ frame: frame - 196, fps: FPS, config: { damping: 14, stiffness: 180 } });
  const leave = tween(frame, 238, 12, 0, 1, easeIn);
  return (
    <AbsoluteFill style={{ backgroundColor: C.night, transform: `translateX(${-leave * 300}px)`, opacity: 1 - leave * 0.6 }}>
      <Img src={staticFile(img("owner-gpt"))} style={{ position: "absolute", width: W * 1.2, left: -W * 0.1, top: -100, filter: "blur(36px) grayscale(0.5)", opacity: 0.35 }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(9,8,15,0.55), rgba(9,8,15,0.9))" }} />

      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontFamily: BLACK, fontSize: 78, lineHeight: 1.12 }}>
        <div style={{ color: "#fff", opacity: head1, transform: `translateY(${(1 - head1) * 40}px)` }}>Bitta tovush —</div>
        <div style={{ color: C.gold, opacity: head2, transform: `translateY(${(1 - head2) * 40}px)` }}>butunlay boshqa ma’no</div>
      </div>

      <MeaningCard exit={104} focusY="45%" from={-1} meaning="uxlaydi" photo="customer-asleep" speakAt={16} start={10} top={420} word="자요" />
      <MeaningCard exit={108} focusY="55%" from={1} meaning="sho‘r" photo="salt" speakAt={64} start={58} top={990} word="짜요" />

      {frame >= 112 ? (
        <div style={{ position: "absolute", top: 430, left: 0, right: 0, display: "flex", justifyContent: "space-evenly" }}>
          <Jamo bars={waves.jayo} color="#9FB4FF" glyph="ㅈ" speakAt={118} start={112} word="자요" />
          <Jamo bars={waves.jjayo} color={C.gold} glyph="ㅉ" speakAt={150} start={120} word="짜요" />
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1110,
          padding: "26px 36px",
          borderRadius: 32,
          background: "rgba(255,196,61,0.14)",
          border: `3px solid ${C.gold}`,
          fontFamily: UZ,
          fontWeight: 800,
          fontSize: 46,
          color: "#fff",
          textAlign: "center",
          opacity: tip,
          transform: `scale(${0.9 + tip * 0.1})`,
        }}
      >
        <span style={{ fontFamily: KO, color: C.gold }}>ㅉ</span> — tomoqni qisib, qattiq va qisqa ayting
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1290,
          fontFamily: UZ,
          fontWeight: 700,
          fontSize: 40,
          lineHeight: 1.3,
          color: "rgba(255,255,255,0.85)",
          textAlign: "center",
          opacity: note,
          transform: `translateY(${(1 - note) * 30}px)`,
        }}
      >
        O‘zbek tilida bu farq yo‘q — shuning uchun quloq uni ilg‘amaydi
      </div>
      <Grain opacity={0.08} />

      <Sfx at={8} src="sfx/story-pop.mp3" volume={0.5} />
      <Sequence from={16}>
        <Audio src={sound("w-jayo")} />
      </Sequence>
      <Sequence from={36}>
        <Audio src={sound("sfx-snore")} volume={0.7} />
      </Sequence>
      <Sfx at={56} src="sfx/story-pop.mp3" volume={0.5} />
      <Sequence from={64}>
        <Audio src={sound("w-jjayo")} />
      </Sequence>
      <Sfx at={108} src="sfx/story-swipe.mp3" volume={0.4} />
      <Sequence from={118}>
        <Audio src={sound("w-jayo")} />
      </Sequence>
      <Sequence from={150}>
        <Audio src={sound("w-jjayo")} />
      </Sequence>
    </AbsoluteFill>
  );
}

// ───────────────────────────── C 앱 — KORIO 발음 퀴즈 (실제 화면)
const SCREEN_W = 560;
const K = SCREEN_W / 390; // 앱 css px → 영상 px
const SCREEN_H = Math.round(844 * K);
const BEZEL = 12;
const PHONE_SCALE = 1.2; // 화면 위쪽(카드)이 가운데 오게 크게 — 아래는 화면 밖으로
const CLIP_AT = 10;
const CLIP_FRAMES = 126;
const TAP = 52; // 촬영에서 쌀을 누른 프레임 (1734ms)

function TapRipple({ at, x, y }: { at: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame > at + 22) return null;
  const t = (frame - at) / 22;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 70,
        top: y - 70,
        width: 140,
        height: 140,
        borderRadius: 70,
        border: `6px solid rgba(255,255,255,${1 - t})`,
        background: `rgba(106,85,245,${0.35 * (1 - t)})`,
        transform: `scale(${0.4 + t * 0.9})`,
      }}
    />
  );
}

function SceneApp() {
  const frame = useCurrentFrame();
  const enter = spring({ frame: frame - 2, fps: FPS, config: { damping: 16, stiffness: 90 } });
  const head = spring({ frame: frame - 6, fps: FPS, config: { damping: 14, stiffness: 200 } });
  const chips = spring({ frame: frame - 14, fps: FPS, config: { damping: 14, stiffness: 200 } });
  const leave = tween(frame, 140, 10, 0, 1, easeIn);
  const phoneW = SCREEN_W + BEZEL * 2;
  const float = Math.sin(frame / 18) * 8;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #8A78FA 0%, #5B3FE0 50%, #2C2290 100%)", transform: `translateX(${-leave * 900}px)`, filter: leave > 0.02 ? `blur(${leave * 20}px)` : undefined }}>
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: 450, left: 90 + Math.sin(frame / 30) * 80, top: 600, background: "radial-gradient(circle, rgba(255,255,255,0.22), transparent 65%)" }} />
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", opacity: head, transform: `translateY(${(1 - head) * 40}px)` }}>
        <div style={{ fontFamily: BLACK, fontSize: 76, color: "#fff" }}>KORIO quloqni o‘rgatadi</div>
        <div style={{ fontFamily: UZ, fontWeight: 700, fontSize: 40, color: "rgba(255,255,255,0.88)", marginTop: 10 }}>Shunday tovushlarni har kuni mashq qiling</div>
      </div>
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18, opacity: chips, transform: `translateY(${(1 - chips) * 30}px)` }}>
        {["ㅅ–ㅆ", "ㅂ–ㅃ", "ㄱ–ㄲ", "ㄷ–ㄸ"].map((pair) => (
          <div key={pair} style={{ padding: "10px 26px", borderRadius: 999, background: "rgba(255,255,255,0.16)", border: "2px solid rgba(255,255,255,0.35)", fontFamily: KO, fontWeight: 800, fontSize: 40, color: "#fff" }}>
            {pair}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: 420, height: H - 420, perspective: 1800, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position: "relative",
            width: phoneW,
            height: SCREEN_H + BEZEL * 2,
            borderRadius: 78,
            background: "#0E0D12",
            padding: BEZEL,
            boxShadow: "0 50px 120px rgba(10,6,30,0.55), inset 0 0 0 2px rgba(255,255,255,0.10)",
            transformOrigin: "top center",
            transform: `translateY(${(1 - enter) * 700 + float}px) rotateY(${(1 - enter) * 38}deg) rotateX(${(1 - enter) * 12}deg) scale(${PHONE_SCALE})`,
          }}
        >
          <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, borderRadius: 66, overflow: "hidden", background: "#CFE6F7" }}>
            <Sequence durationInFrames={CLIP_FRAMES} from={CLIP_AT} layout="none">
              <OffthreadVideo muted src={staticFile("clips/pronQuiz.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Sequence>
            {frame >= CLIP_AT + CLIP_FRAMES ? (
              <Freeze frame={CLIP_FRAMES - 1}>
                <OffthreadVideo muted src={staticFile("clips/pronQuiz.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Freeze>
            ) : null}
            {frame < CLIP_AT ? (
              <Freeze frame={0}>
                <OffthreadVideo muted src={staticFile("clips/pronQuiz.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Freeze>
            ) : null}
            {/* 쌀 카드 가운데 (앱 css px 102, 357) */}
            <TapRipple at={CLIP_AT + TAP} x={102 * K} y={357 * K} />
          </div>
        </div>
      </div>

      <Sfx at={0} src="sfx/story-riser.mp3" volume={0.35} />
      <Sequence from={CLIP_AT + 12}>
        <Audio src={sound("w-ssal")} />
      </Sequence>
      <Sfx at={CLIP_AT + TAP} src="sfx/click.wav" volume={0.7} />
      <Sfx at={CLIP_AT + TAP + 2} src="sfx/correct.wav" volume={0.7} />
      <Sfx at={138} src="sfx/story-swipe.mp3" volume={0.45} />
    </AbsoluteFill>
  );
}

// ───────────────────────────── D 식당 — 이번엔 제대로
const D2 = 95; // 사장님으로 넘어가는 프레임
function SceneRedo() {
  const frame = useCurrentFrame();
  const DUR = E - D;
  return (
    <AbsoluteFill>
      {frame < D2 ? (
        <Shot dur={D2} focus={{ x: 352, y: 347 }} frame={frame} src={img("customer-correct")} whipIn={6} whipOut={6} />
      ) : (
        <Shot dur={DUR - D2} focus={{ x: 568, y: 240 }} frame={frame - D2} from={1.05} src={img("owner-laugh")} to={1.13} whipIn={6} />
      )}
      <Grain />
      <SlamText bg={GREEN} color="#fff" end={D2 - 4} size={70} start={46} tilt={2} top={1080}>
        To‘g‘ri talaffuz
      </SlamText>
      <Subtitle end={D2 - 4} ko="사장님, 너무 짜요!" start={12} uz="Opa, juda sho‘r!" />
      <Subtitle end={156} ko="아이고, 미안해요!" start={104} uz="Voy, kechirasiz!" />
      <Subtitle end={DUR - 2} ko="물 좀 더 넣어 줄게요." start={160} uz="Hozir ozgina suv qo‘shib beraman." />

      <Audio src={sound("amb-restaurant")} volume={(f) => interpolate(f, [0, 8, DUR - 10, DUR], [0, 0.35, 0.35, 0], { extrapolateRight: "clamp" })} />
      <Sequence from={8}>
        <Audio src={sound("v-customer-correct")} />
      </Sequence>
      <Sfx at={46} src="sfx/correct.wav" volume={0.5} />
      <Sfx at={D2 - 8} src="sfx/story-swipe.mp3" volume={0.45} />
      <Sequence from={101}>
        <Audio src={sound("v-owner-sorry")} trimAfter={62} />
      </Sequence>
      <Sequence from={150}>
        <Audio src={sound("sfx-pour")} volume={0.6} />
      </Sequence>
      <Sequence from={158}>
        <Audio src={sound("v-owner-sorry")} trimAfter={144} trimBefore={88} />
      </Sequence>
    </AbsoluteFill>
  );
}

// ───────────────────────────── E 끝 — 맞혀 보세요 + KORIO
function ChoiceCard({ n, word, meaning, start }: { n: number; word: string; meaning: string; start: number }) {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 12, stiffness: 190 } });
  return (
    <div
      style={{
        position: "relative",
        width: 430,
        height: 400,
        borderRadius: 44,
        background: "#fff",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${s}) rotate(${(1 - s) * (n === 1 ? -10 : 10)}deg)`,
      }}
    >
      <div style={{ position: "absolute", left: -16, top: -16, width: 84, height: 84, borderRadius: 42, background: PURPLE, color: "#fff", fontFamily: BLACK, fontSize: 50, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>{n}</div>
      <div style={{ fontFamily: KO, fontWeight: 900, fontSize: 150, color: C.night, lineHeight: 1 }}>{word}</div>
      <div style={{ fontFamily: UZ, fontWeight: 700, fontSize: 46, color: "#8C88A6", marginTop: 18 }}>{meaning}</div>
    </div>
  );
}

function Speaker({ at }: { at: number }) {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - (at - 10), fps: FPS, config: { damping: 12, stiffness: 200 } });
  const rings = [0, 8, 16].map((d) => {
    const t = (frame - at - d) / 26;
    return t > 0 && t < 1 ? t : null;
  });
  return (
    <div style={{ position: "relative", width: 150, height: 150, transform: `scale(${s})` }}>
      {rings.map((t, i) =>
        t === null ? null : <div key={i} style={{ position: "absolute", inset: 0, borderRadius: 75, border: `5px solid rgba(255,196,61,${1 - t})`, transform: `scale(${1 + t * 1.2})` }} />,
      )}
      <div style={{ position: "absolute", inset: 0, borderRadius: 75, background: PURPLE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
        <svg height={76} viewBox="0 0 24 24" width={76}>
          <path d="M3 9v6h4l5 4V5L7 9H3z" fill="#fff" />
          <path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth={2} />
        </svg>
      </div>
    </div>
  );
}

function Line({ start, children, top, style }: { start: number; children: ReactNode; top: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 14, stiffness: 190 } });
  return <div style={{ position: "absolute", left: 50, right: 50, top, textAlign: "center", opacity: s, transform: `translateY(${(1 - s) * 34}px)`, ...style }}>{children}</div>;
}

function SceneQuiz() {
  const frame = useCurrentFrame();
  const enter = tween(frame, 0, 10);
  const brand = spring({ frame: frame - 78, fps: FPS, config: { damping: 11, stiffness: 160 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.night }}>
      <Img src={staticFile(img("owner-laugh"))} style={{ position: "absolute", width: W * 1.2, left: -W * 0.1, top: -40, filter: "blur(30px)", opacity: 0.5 * enter }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(9,8,15,0.5), rgba(9,8,15,0.88))" }} />
      <SeriesTag end={200} start={2} />
      <Line start={2} style={{ fontFamily: BLACK, fontSize: 76, color: "#fff" }} top={270}>
        Qaysi birini eshitdingiz?
      </Line>
      <div style={{ position: "absolute", top: 430, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 56 }}>
        <ChoiceCard meaning="uxlaydi" n={1} start={8} word="자요" />
        <ChoiceCard meaning="sho‘r" n={2} start={14} word="짜요" />
      </div>
      <div style={{ position: "absolute", top: 870, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Speaker at={34} />
      </div>
      <Line start={60} style={{ fontFamily: BLACK, fontSize: 56, color: C.gold }} top={1070}>
        Javobni izohda yozing: 1 yoki 2?
      </Line>
      <div style={{ position: "absolute", top: 1220, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", opacity: brand, transform: `scale(${0.8 + brand * 0.2})` }}>
        <Wordmark size={110} />
        <div style={{ fontFamily: UZ, fontWeight: 800, fontSize: 38, color: "#fff", marginTop: 14 }}>Koreys va ingliz tili — o‘zbek tilida</div>
        <div style={{ fontFamily: UZ, fontWeight: 700, fontSize: 32, color: "rgba(255,255,255,0.75)", marginTop: 10 }}>App Store · Google Play · Telegram @KorioLoginBot</div>
      </div>
      <Grain opacity={0.08} />

      <Sfx at={8} src="sfx/story-pop.mp3" volume={0.5} />
      <Sfx at={14} src="sfx/story-pop.mp3" volume={0.5} />
      <Sequence from={34}>
        <Audio src={sound("w-jjayo")} />
      </Sequence>
      <Sfx at={78} src="sfx/story-impact.mp3" volume={0.4} />
    </AbsoluteFill>
  );
}

/** 릴스 표지 — 프로필 격자(가운데 3:4)에 잘려도 글자가 다 보이게 */
export function Ep1Cover() {
  const owner = { x: 430, y: 235 };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Photo filter="grayscale(0.35) contrast(1.1)" origin={onScreen(owner.x, owner.y)} scale={1.55} src={img("owner-gpt")} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1000, textAlign: "center" }}>
        <div style={{ fontFamily: KO, fontWeight: 900, fontSize: 190, color: "#fff", lineHeight: 1, textShadow: "0 8px 30px rgba(0,0,0,0.7)" }}>
          자요? <span style={{ color: C.gold }}>짜요?</span>
        </div>
        <div style={{ display: "inline-block", marginTop: 34, padding: "10px 30px", background: C.gold, fontFamily: BLACK, fontSize: 64, color: C.night, transform: "rotate(-2deg)" }}>
          Bitta tovush — boshqa ma’no
        </div>
      </div>
      <Grain />
      <SeriesTag end={10} start={-20} style={{ top: 900, left: "50%", transform: "translateX(-50%)" }} />
    </AbsoluteFill>
  );
}

export function Ep1() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={B - A} from={A}>
        <SceneMistake />
      </Sequence>
      <Sequence durationInFrames={CC - B} from={B}>
        <SceneMeaning />
      </Sequence>
      <Sequence durationInFrames={D - CC} from={CC}>
        <SceneApp />
      </Sequence>
      <Sequence durationInFrames={E - D} from={D}>
        <SceneRedo />
      </Sequence>
      <Sequence durationInFrames={EP1_TOTAL - E} from={E}>
        <SceneQuiz />
      </Sequence>
      {/* 배경 음악 — 앱 장면부터, 식당 대화 동안은 낮게 */}
      <Sequence from={CC}>
        <Audio
          src={sound("music-bed")}
          volume={(f) =>
            interpolate(f, [0, 12, D - CC - 6, D - CC + 6, E - CC - 6, E - CC + 6, EP1_TOTAL - CC - 20, EP1_TOTAL - CC], [0, 0.2, 0.2, 0.06, 0.06, 0.2, 0.2, 0], {
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
}
