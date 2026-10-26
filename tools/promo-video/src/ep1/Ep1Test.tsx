/**
 * "Bitta tovush" 1편 시험 클립 — 식당 장면만 (손님 "너무 자요!" → 사장님 "네? 뭐가 자요?" → 정지).
 * 사람은 실사 사진(public/ai/ep1), 움직임은 핸드헬드 흔들림 · 밀어 들어가기 · 휙 넘기기 · 정지 줌으로 만든다.
 * 이모지 없음. 자막은 한국어 대사 + 우즈벡어 뜻.
 */
import type { ReactNode } from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, H, HEAD, KO, W, easeIn, rand, tween } from "../story/fx";

export const EP1_TEST_TOTAL = 255;

const SHOT2 = 90; // 사장님으로 넘어가는 프레임
const FREEZE = 185; // 정지 + 얼굴 줌
const WHIP = 6; // 휙 넘기는 길이

/** 1024×1536 사진을 1080×1920 에 꽉 채울 때의 배율과 잘리는 왼쪽 */
const COVER = Math.max(W / 1024, H / 1536);
const CROP_X = (1024 * COVER - W) / 2;
/** 사진 속 한 점을 화면 좌표로 */
const onScreen = (x: number, y: number) => ({ x: x * COVER - CROP_X, y: y * COVER });

/** 손에 든 휴대폰처럼 흔들린다 — 프레임만 보고 계산 */
function shake(frame: number, amount = 1) {
  const x = (Math.sin(frame * 0.13) * 6 + Math.sin(frame * 0.37 + 1) * 3) * amount;
  const y = (Math.cos(frame * 0.11) * 5 + Math.sin(frame * 0.29 + 2) * 2.5) * amount;
  const r = Math.sin(frame * 0.07) * 0.35 * amount;
  return `translate(${x}px, ${y}px) rotate(${r}deg)`;
}

function Photo({ src, scale, origin, extra = "", filter }: { src: string; scale: number; origin: { x: number; y: number }; extra?: string; filter?: string }) {
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          width: 1024 * COVER,
          height: 1536 * COVER,
          left: -CROP_X,
          top: 0,
          transformOrigin: `${origin.x + CROP_X}px ${origin.y}px`,
          transform: `${extra} scale(${scale})`,
          filter,
        }}
      />
    </AbsoluteFill>
  );
}

/** 필름 결 + 가장자리 어둡게 — 휴대폰 영상 느낌 */
function Grain() {
  const frame = useCurrentFrame();
  const seed = Math.floor(rand(frame) * 1000);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg height={H} style={{ opacity: 0.13, mixBlendMode: "overlay" }} width={W}>
        <filter id={`g${frame}`}>
          <feTurbulence baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" type="fractalNoise" />
        </filter>
        <rect filter={`url(#g${frame})`} height={H} width={W} />
      </svg>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
    </AbsoluteFill>
  );
}

/** 대사 자막 — 한국어 크게, 우즈벡어 뜻 작게. 릴스 아래쪽 UI 에 가리지 않는 높이 */
function Subtitle({ ko, uz, start, end }: { ko: string; uz: string; start: number; end: number }) {
  const frame = useCurrentFrame();
  if (frame < start || frame > end) return null;
  const pop = spring({ frame: frame - start, fps: FPS, config: { damping: 14, stiffness: 220 } });
  const out = tween(frame, end - 5, 5, 1, 0, easeIn);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 1230,
        textAlign: "center",
        opacity: Math.min(pop, out),
        transform: `translateY(${(1 - pop) * 24}px) scale(${0.92 + pop * 0.08})`,
      }}
    >
      <div style={{ fontFamily: KO, fontWeight: 800, fontSize: 76, color: "#fff", textShadow: "0 4px 18px rgba(0,0,0,0.85), 0 0 3px #000" }}>{ko}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 44, color: C.gold, marginTop: 10, textShadow: "0 3px 12px rgba(0,0,0,0.9), 0 0 2px #000" }}>{uz}</div>
    </div>
  );
}

/** 정지 순간 쾅 하고 들어오는 질문 */
function SlamText({ children, start }: { children: ReactNode; start: number }) {
  const frame = useCurrentFrame();
  if (frame < start) return null;
  const s = spring({ frame: frame - start, fps: FPS, config: { damping: 11, stiffness: 260, mass: 0.7 } });
  const bar = tween(frame, start + 2, 8);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1180, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", transform: `scale(${interpolate(s, [0, 1], [1.8, 1])}) rotate(${interpolate(s, [0, 1], [-6, -2])}deg)`, opacity: Math.min(1, s * 2) }}>
        <div style={{ position: "absolute", inset: "-10px -28px", background: C.gold, transformOrigin: "left center", transform: `scaleX(${bar})` }} />
        <div style={{ position: "relative", fontFamily: HEAD, fontWeight: 800, fontSize: 92, color: C.night, letterSpacing: -1, padding: "0 8px" }}>{children}</div>
      </div>
    </div>
  );
}

export function Ep1Test() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ── 1컷: 손님 — 천천히 밀어 들어가다가 끝에서 오른쪽으로 휙
  const customerFace = onScreen(380, 330);
  const push1 = interpolate(frame, [0, SHOT2], [1.06, 1.15]);
  const whipOut = tween(frame, SHOT2 - WHIP, WHIP, 0, 1, easeIn);

  // ── 2컷: 사장님 — 휙 들어와서 "네?"에 툭, "뭐가 자요?"에 천천히, 정지에서 얼굴로 확
  const ownerFace = onScreen(430, 235);
  const whipIn = 1 - tween(frame, SHOT2, WHIP + 2);
  const snap = spring({ frame: frame - 100, fps: FPS, config: { damping: 12, stiffness: 200 } }) * 0.07;
  const push2 = interpolate(frame, [SHOT2, FREEZE], [1.08, 1.16], { extrapolateRight: "clamp" });
  const zoom = spring({ frame: frame - FREEZE, fps: FPS, config: { damping: 15, stiffness: 120 } });
  const frozen = frame >= FREEZE;
  const flash = frozen ? tween(frame, FREEZE, 6, 0.85, 0) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {frame < SHOT2 ? (
        <Photo
          extra={`${shake(frame)} translateX(${-whipOut * 700}px)`}
          filter={whipOut ? `blur(${whipOut * 26}px)` : undefined}
          origin={customerFace}
          scale={push1}
          src="ai/ep1/customer-gpt.png"
        />
      ) : (
        <Photo
          extra={frozen ? "" : `${shake(frame, 0.9)} translateX(${whipIn * 700}px)`}
          filter={frozen ? `grayscale(${zoom * 0.55}) contrast(${1 + zoom * 0.12})` : whipIn > 0.02 ? `blur(${whipIn * 26}px)` : undefined}
          origin={ownerFace}
          scale={frozen ? push2 + snap + zoom * 0.75 : push2 + snap}
          src="ai/ep1/owner-gpt.png"
        />
      )}

      <Grain />

      <Subtitle end={SHOT2 - 4} ko="사장님, 너무 자요!" start={16} uz="(“Opa, juda sho‘r!” demoqchi edi)" />
      <Subtitle end={FREEZE - 2} ko="네? 뭐가 자요?" start={103} uz="Nima? Nima uxlayapti?" />
      <SlamText start={FREEZE + 8}>U aslida nima dedi?</SlamText>

      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash, pointerEvents: "none" }} />

      {/* 소리 — 식당 소음은 정지 순간 확 줄인다 */}
      <Audio
        src={staticFile("ai/ep1/amb-restaurant.mp3")}
        volume={(f) => interpolate(f, [0, 8, FREEZE - 2, FREEZE + 4, durationInFrames], [0, 0.4, 0.4, 0.08, 0.08], { extrapolateRight: "clamp" })}
      />
      <Sequence from={10}>
        <Audio src={staticFile("ai/ep1/v-customer.mp3")} volume={1} />
      </Sequence>
      <Sequence from={SHOT2 - WHIP - 2}>
        <Audio src={staticFile("sfx/story-swipe.mp3")} volume={0.45} />
      </Sequence>
      <Sequence from={98}>
        <Audio src={staticFile("ai/ep1/v-owner-1.mp3")} volume={1} />
      </Sequence>
      <Sequence from={135}>
        <Audio src={staticFile("ai/ep1/v-owner-2.mp3")} volume={1} />
      </Sequence>
      <Sequence from={FREEZE}>
        <Audio src={staticFile("sfx/story-impact.mp3")} volume={0.8} />
      </Sequence>
    </AbsoluteFill>
  );
}
