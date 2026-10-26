/**
 * "lugʻat" 형식 부품 — 참고 영상(Choʻntak lugʻati)의 화면 문법:
 * 공책 종이 · 흰 테두리 스티커 인물 · 쾅 찍히는 도장 · 타자 친 종이 띠 · 말풍선 · 표제어 카드 · 사전 표지 · 댓글 칸.
 * 모든 움직임은 절대 프레임(at)만 보고 계산한다.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { FPS } from "./plan";

export const W = 1080;
export const H = 1920;
export const COND = '"Bahnschrift SemiBold Condensed", "Bahnschrift Condensed", "Bahnschrift", "Arial Narrow", sans-serif';
export const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
export const INK = "#1E1B18";
export const RED = "#D8382F";
export const GREEN = "#24995A";
export const YELLOW = "#F6C443";
export const PAPER = "#F4EEDF";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const ramp = (frame: number, at: number, dur: number) => clamp01((frame - at) / dur);
const pop = (frame: number, at: number, stiffness = 220, damping = 12) => spring({ frame: frame - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } });

/** 장면 창 — from..to 밖에서는 그리지 않는다 */
export function Window({ from, to, children }: { from: number; to: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return <>{children}</>;
}

/** 도장이 찍힐 때 화면이 툭 흔들린다 — 그 장면의 도장 시각들을 넘긴다 */
export function useThud(times: number[]) {
  const frame = useCurrentFrame();
  let x = 0;
  let y = 0;
  for (const t of times) {
    const d = frame - t;
    if (d >= 0 && d < 7) {
      const k = (1 - d / 7) * 7;
      x += Math.sin(d * 2.7) * k;
      y += Math.cos(d * 3.1) * k;
    }
  }
  return `translate(${x}px, ${y}px)`;
}

/** 공책 종이 — split 이면 왼쪽은 회색빛, 오른쪽은 노란빛 (비교 칸) */
export function Paper({ split = false, tint }: { split?: boolean; tint?: string }) {
  return (
    <AbsoluteFill style={{ backgroundColor: tint ?? PAPER }}>
      {split ? (
        <>
          <div style={{ position: "absolute", left: 0, top: 0, width: W / 2, height: H, background: "#E4E6E3" }} />
          <div style={{ position: "absolute", left: W / 2, top: 0, width: W / 2, height: H, background: "#F5E4B0" }} />
          <div style={{ position: "absolute", left: W / 2 - 3, top: 0, width: 6, height: H, background: "linear-gradient(90deg, rgba(0,0,0,0.08), rgba(255,255,255,0.4), rgba(0,0,0,0.08))" }} />
        </>
      ) : null}
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0 62px, rgba(90,130,170,0.22) 62px 64px)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(80,60,30,0.18) 100%)" }} />
      <Grain />
    </AbsoluteFill>
  );
}

/** 종이·그림 결 */
export function Grain({ opacity = 0.1 }: { opacity?: number }) {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity, mixBlendMode: "multiply" }}>
      <svg height={H} width={W}>
        <filter id="paper-grain">
          <feTurbulence baseFrequency="0.75" numOctaves={3} seed={7} type="fractalNoise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect filter="url(#paper-grain)" height={H} width={W} />
      </svg>
    </AbsoluteFill>
  );
}

/** 그림 배경 (1024×1536) 을 꽉 채우고 아주 천천히 다가간다 */
export function Backdrop({ src, from, to, filter }: { src: string; from: number; to: number; filter?: string }) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [from, to], [1.04, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0B1430" }}>
      <Img src={staticFile(src)} style={{ position: "absolute", width: 1280, height: 1920, left: -100, top: 0, transform: `scale(${scale})`, filter }} />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
}

/**
 * 스티커 인물·소품 — at 에 톡 튀어나와(살짝 돌며) 자리 잡고, 숨 쉬듯 위아래로 조금 움직인다.
 * x 는 가운데, y 는 아래 끝. out 이 있으면 그때 쏙 들어간다.
 */
export function Sticker({ src, x, y, height, at, out, rot = 0, flip = false, style }: {
  src: string; x: number; y: number; height: number; at: number; out?: number; rot?: number; flip?: boolean; style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out + 6)) return null;
  const s = pop(frame, at, 240, 11);
  const leave = out !== undefined ? ramp(frame, out, 6) : 0;
  const bob = Math.sin((frame - at) / 14) * 4;
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        height,
        left: x,
        top: y - height,
        transform: `translateX(-50%) translateY(${bob}px) scale(${s * (1 - leave)}) rotate(${rot + (1 - s) * -10}deg) ${flip ? "scaleX(-1)" : ""}`,
        transformOrigin: "50% 100%",
        filter: "drop-shadow(0 14px 16px rgba(30,20,10,0.28))",
        ...style,
      }}
    />
  );
}

/** 고무 도장 — 크게 떨어져 쾅. 잉크 결은 #stamp-ink 필터 (Ep2 맨 위에 한 번 둔다) */
export function Stamp({ text, at, x, y, color = RED, size = 70, rot = -8, out }: {
  text: string; at: number; x: number; y: number; color?: string; size?: number; rot?: number; out?: number;
}) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out)) return null;
  const t = ramp(frame, at, 5);
  const scale = interpolate(t, [0, 1], [2.6, 1], { easing: (v) => v * v });
  const burst = frame - at - 5;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`, opacity: Math.min(1, t * 1.6) }}>
      {burst >= 0 && burst < 9
        ? Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2;
            const r = 40 + burst * 14;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 34,
                  height: 6,
                  borderRadius: 3,
                  background: color,
                  opacity: 1 - burst / 9,
                  transform: `translate(-50%, -50%) rotate(${(a * 180) / Math.PI}deg) translateX(${r + size * 1.4}px)`,
                }}
              />
            );
          })
        : null}
      <div
        style={{
          position: "relative",
          padding: `${size * 0.12}px ${size * 0.34}px`,
          border: `${size * 0.09}px solid ${color}`,
          borderRadius: size * 0.16,
          boxShadow: `inset 0 0 0 ${size * 0.05}px rgba(255,255,255,0.0), inset 0 0 0 ${size * 0.1}px ${color}22`,
          background: "rgba(255,255,255,0.72)",
          color,
          fontFamily: COND,
          fontWeight: 700,
          fontSize: size,
          letterSpacing: size * 0.03,
          lineHeight: 1.05,
          whiteSpace: "nowrap",
          filter: "url(#stamp-ink)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

/** 타자 친 종이 띠 라벨 — 왼쪽부터 드러난다 */
export function Label({ children, at, x, y, size = 64, bg = "#FFFDF6", color = INK, rot = -1.5, out, align = "center", style }: {
  children: ReactNode; at: number; x: number; y: number; size?: number; bg?: string; color?: string; rot?: number; out?: number; align?: "center" | "left"; style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out)) return null;
  const reveal = ramp(frame, at, 7);
  const s = pop(frame, at, 260, 14);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${align === "center" ? "-50%" : "0"}, -50%) rotate(${rot}deg) scale(${0.85 + s * 0.15})`,
        clipPath: `inset(-20px ${(1 - reveal) * 100}% -20px -20px)`,
        padding: `${size * 0.14}px ${size * 0.32}px`,
        background: bg,
        color,
        fontFamily: COND,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: size * 0.01,
        lineHeight: 1.08,
        textAlign: "center",
        whiteSpace: "nowrap",
        boxShadow: "0 6px 0 rgba(40,30,20,0.16), 0 10px 22px rgba(40,30,20,0.18)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** 말풍선 — tail 은 꼬리가 향하는 쪽 */
export function Bubble({ children, at, x, y, size = 50, tail = "left", out, maxWidth = 640 }: {
  children: ReactNode; at: number; x: number; y: number; size?: number; tail?: "left" | "right"; out?: number; maxWidth?: number;
}) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out)) return null;
  const s = pop(frame, at, 300, 12);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -100%) scale(${s})`, transformOrigin: tail === "left" ? "15% 110%" : "85% 110%" }}>
      <div
        style={{
          position: "relative",
          maxWidth,
          padding: `${size * 0.36}px ${size * 0.5}px`,
          background: "#fff",
          border: `5px solid ${INK}`,
          borderRadius: size * 0.6,
          fontFamily: COND,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.12,
          color: INK,
          textAlign: "center",
          boxShadow: "0 8px 0 rgba(30,20,10,0.18)",
        }}
      >
        {children}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            [tail === "left" ? "left" : "right"]: 60,
            width: 0,
            height: 0,
            borderLeft: "18px solid transparent",
            borderRight: "18px solid transparent",
            borderTop: `32px solid ${INK}`,
            transform: `skewX(${tail === "left" ? -20 : 20}deg)`,
          }}
        />
      </div>
    </div>
  );
}

/** 표제어 카드 — «KECHASI TELEFONDA OʻTIRISH» (feʼl) + 나중에 "TARJIMA: …" 줄 */
export function Headword({ word, at, tarjima, tarjimaAt, color = RED, out }: { word: string; at: number; tarjima?: string; tarjimaAt?: number; color?: string; out?: number }) {
  const frame = useCurrentFrame();
  if (frame < at || (out !== undefined && frame >= out)) return null;
  const s = pop(frame, at, 220, 15);
  const typed = Math.round(clamp01((frame - at) / 14) * word.length);
  const showT = tarjima && tarjimaAt !== undefined && frame >= tarjimaAt;
  const tT = tarjimaAt !== undefined ? pop(frame, tarjimaAt, 260, 13) : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 110,
        padding: "22px 30px 20px",
        background: "#FFFDF6",
        boxShadow: "0 8px 0 rgba(30,20,10,0.15), 0 16px 30px rgba(0,0,0,0.25)",
        transform: `translateY(${(1 - s) * -160}px) rotate(-0.8deg)`,
        fontFamily: COND,
        fontWeight: 700,
        color: INK,
      }}
    >
      <div style={{ fontSize: 60, letterSpacing: 0.5 }}>
        «{word.slice(0, typed)}»<span style={{ fontSize: 30, fontWeight: 400, color: "#8A8377", marginLeft: 12, fontStyle: "italic" }}>(feʼl)</span>
      </div>
      {showT ? (
        <div style={{ fontSize: 44, marginTop: 6, transform: `scale(${0.9 + tT * 0.1})`, transformOrigin: "left center" }}>
          TARJIMA: <span style={{ color }}>{tarjima}</span>
        </div>
      ) : null}
    </div>
  );
}

/** 사전 표지 — 위에서 툭 떨어진다 */
export function BookCover({ at, title, subtitle }: { at: number; title: [string, string]; subtitle: string }) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const s = pop(frame, at, 160, 13);
  return (
    <div
      style={{
        position: "absolute",
        left: W / 2 - 280,
        top: 380,
        width: 560,
        height: 760,
        borderRadius: "10px 22px 22px 10px",
        background: "linear-gradient(135deg, #7A2232 0%, #571421 60%, #3E0D17 100%)",
        boxShadow: "inset 18px 0 0 rgba(0,0,0,0.25), 0 30px 60px rgba(40,10,10,0.45)",
        transform: `translateY(${(1 - s) * -900}px) rotate(${(1 - s) * 18 - 2}deg)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#E9C878",
        fontFamily: COND,
        fontWeight: 700,
      }}
    >
      <div style={{ position: "absolute", inset: 34, border: "3px solid rgba(233,200,120,0.6)", borderRadius: 8 }} />
      <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: 2 }}>{title[0]}</div>
      <div style={{ fontSize: 96, lineHeight: 1.05, letterSpacing: 2 }}>{title[1]}</div>
      <div style={{ width: 300, height: 3, background: "rgba(233,200,120,0.7)", margin: "26px 0" }} />
      <div style={{ fontSize: 34, letterSpacing: 3 }}>{subtitle}</div>
    </div>
  );
}

/** 휴대폰 (흰 스티커 테두리) 안에 앱 화면 */
export const SCREEN = { w: 560, h: Math.round((560 * 844) / 390) };
export function PhoneSticker({ x, y, at, rot = -3, scale = 1, children }: { x: number; y: number; at: number; rot?: number; scale?: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const s = pop(frame, at, 170, 14);
  const bob = Math.sin((frame - at) / 18) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, 0) translateY(${bob + (1 - s) * 400}px) rotate(${rot + (1 - s) * 12}deg) scale(${scale * (0.7 + s * 0.3)})`,
        transformOrigin: "50% 0%",
        padding: 14,
        borderRadius: 82,
        background: "#fff",
        boxShadow: "0 24px 40px rgba(30,20,10,0.32)",
      }}
    >
      <div style={{ padding: 14, borderRadius: 70, background: "#111" }}>
        <div style={{ position: "relative", width: SCREEN.w, height: SCREEN.h, borderRadius: 58, overflow: "hidden", background: "#fff" }}>{children}</div>
      </div>
    </div>
  );
}

/** 댓글 칸 — 낱말을 하나씩 쳤다 지운다 */
export function CommentBox({ at, words, x, y }: { at: number; words: string[]; x: number; y: number }) {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const s = pop(frame, at, 220, 14);
  let t = frame - at - 8;
  let text = "";
  for (const word of words) {
    const typing = word.length * 2;
    const span = typing + 16 + word.length;
    if (t < span) {
      text = t < typing ? word.slice(0, Math.max(0, Math.floor(t / 2))) : t < typing + 16 ? word : word.slice(0, word.length - (t - typing - 16));
      break;
    }
    t -= span;
    text = word;
  }
  const caret = Math.floor(frame / 8) % 2 === 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${s})`,
        width: 880,
        height: 116,
        borderRadius: 58,
        background: "#fff",
        border: "4px solid #D8D2C4",
        boxShadow: "0 10px 24px rgba(30,20,10,0.18)",
        display: "flex",
        alignItems: "center",
        padding: "0 34px",
        gap: 24,
        fontFamily: '"Segoe UI", sans-serif',
      }}
    >
      <div style={{ width: 60, height: 60, borderRadius: 30, background: "linear-gradient(135deg, #3B6FE0, #1F45B5)" }} />
      <div style={{ flex: 1, fontSize: 48, color: INK }}>
        {text}
        <span style={{ opacity: caret ? 1 : 0, color: "#3B6FE0" }}>|</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#3B6FE0" }}>Yuborish</div>
    </div>
  );
}
