/**
 * 사용법 영상 부품 — "작업 책상" 화면 문법 (참고 영상의 느낌만: 빠르고 손으로 만진 듯한 콜라주)
 *   초록 커팅 매트 · 원고지 종이 · 마스킹 테이프로 붙인 휴대폰 · 포스트잇 단계 번호
 *   · 빨간 마커 동그라미/화살표 (그려지는 애니메이션) · 형광펜 자막
 * 손글씨는 Ink Free, 제목은 Segoe UI Black, 한글은 맑은 고딕.
 * draw(0..1) 값을 받는 부품은 그리는 정도 — 스틸에선 1.
 */
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const W = 1080;
export const H = 1920;
export const HAND = '"Ink Free", "Segoe Print", cursive';
export const HEAVY = '"Segoe UI Black", "Segoe UI", "Malgun Gothic", sans-serif';
export const KO = '"Malgun Gothic", "Noto Sans KR", sans-serif';
export const INK = "#1C1A2E";
export const PURPLE = "#6A55F5";
export const MARKER = "#E8452C";
export const HIGHLIGHT = "#FFE14D";

/** 초록 커팅 매트 — 가는 격자, 굵은 격자, 가장자리 눈금, 45° 보조선 */
export function CuttingMat({ hue = "#2F6E55" }: { hue?: string }) {
  const ticks = Array.from({ length: 40 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 40% 35%, ${hue} 0%, #24563F 100%)` }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.10) 2px, transparent 2px)," +
            "linear-gradient(rgba(255,255,255,0.22) 3px, transparent 3px), linear-gradient(90deg, rgba(255,255,255,0.22) 3px, transparent 3px)",
          backgroundSize: "54px 54px, 54px 54px, 270px 270px, 270px 270px",
          backgroundPosition: "-1px -1px, -1px -1px, -2px -2px, -2px -2px",
        }}
      />
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 380px, rgba(255,255,255,0.08) 380px 382px)" }} />
      {ticks.map((i) => (
        <div key={i} style={{ position: "absolute", left: i * 54, top: 0, width: 2, height: i % 5 === 0 ? 34 : 18, background: "rgba(255,255,255,0.55)" }} />
      ))}
      {ticks.slice(0, 36).map((i) => (
        <div key={`l${i}`} style={{ position: "absolute", top: i * 54, left: 0, height: 2, width: i % 5 === 0 ? 34 : 18, background: "rgba(255,255,255,0.55)" }} />
      ))}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.35) 100%)" }} />
      <AbsoluteFill style={{ opacity: 0.12, mixBlendMode: "overlay" }}>
        <svg height={H} width={W}>
          <filter id="mat-grain">
            <feTurbulence baseFrequency="0.8" numOctaves={3} seed={11} type="fractalNoise" />
          </filter>
          <rect filter="url(#mat-grain)" height={H} width={W} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/** 원고지 — 네모 칸 줄, 줄 사이 틈. chars 는 첫 줄부터 칸마다 한 글자 */
export function Manuscript({ x, y, w, h, rot = -3, cell = 120, chars = [], style }: {
  x: number; y: number; w: number; h: number; rot?: number; cell?: number; chars?: string[]; style?: CSSProperties;
}) {
  const gap = cell * 0.28;
  const cols = Math.floor((w - 80) / cell);
  const rows = Math.floor((h - 80) / (cell + gap));
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        background: "#FBF6EA",
        transform: `rotate(${rot}deg)`,
        boxShadow: "0 30px 50px rgba(0,0,0,0.35), 0 2px 0 rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const ch = chars[r * cols + c];
          return (
            <div
              key={`${r}-${c}`}
              style={{
                position: "absolute",
                left: 40 + c * cell,
                top: 40 + r * (cell + gap),
                width: cell,
                height: cell,
                border: "2px solid rgba(214,104,74,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: KO,
                fontWeight: 800,
                fontSize: cell * 0.72,
                color: INK,
              }}
            >
              {ch}
            </div>
          );
        }),
      )}
    </div>
  );
}

/** 마스킹 테이프 — 반투명 줄무늬, 끝은 찢긴 톱니 */
export function Tape({ x, y, w = 230, rot = -20, color = "rgba(255,214,120,0.72)" }: { x: number; y: number; w?: number; rot?: number; color?: string }) {
  const teeth = 7;
  const edge = (side: "l" | "r") =>
    Array.from({ length: teeth + 1 }, (_, i) => {
      const yy = (i / teeth) * 100;
      const xx = i % 2 ? 3 : 0;
      return side === "l" ? `${xx}% ${yy}%` : `${100 - xx}% ${100 - yy}%`;
    }).join(", ");
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: 62,
        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
        background: `repeating-linear-gradient(135deg, ${color} 0 14px, rgba(255,255,255,0.35) 14px 18px)`,
        clipPath: `polygon(${edge("l")}, ${edge("r")})`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    />
  );
}

/** 포스트잇 — 큰 단계 숫자 + 손글씨 한두 줄 */
export function StickyNote({ x, y, size = 330, rot = -4, color = HIGHLIGHT, step, children }: {
  x: number; y: number; size?: number; rot?: number; color?: string; step?: string; children?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        minHeight: size,
        padding: "26px 28px",
        background: `linear-gradient(160deg, ${color} 0%, ${color} 70%, rgba(0,0,0,0.06) 100%)`,
        transform: `rotate(${rot}deg)`,
        boxShadow: "0 18px 26px rgba(0,0,0,0.3), inset 0 -10px 18px rgba(0,0,0,0.05)",
        fontFamily: HAND,
        color: INK,
        borderBottomRightRadius: "28px 12px",
      }}
    >
      {step ? <div style={{ fontFamily: HEAVY, fontSize: size * 0.42, lineHeight: 0.9, color: PURPLE }}>{step}</div> : null}
      <div style={{ fontSize: size * 0.15, lineHeight: 1.15, fontWeight: 700, marginTop: step ? 6 : 0 }}>{children}</div>
    </div>
  );
}

/** 손으로 그린 동그라미 — 살짝 찌그러지고 끝이 겹친다. draw 0..1 */
export function MarkerCircle({ cx, cy, rx, ry, draw = 1, color = MARKER, width = 11, seed = 1 }: {
  cx: number; cy: number; rx: number; ry: number; draw?: number; color?: string; width?: number; seed?: number;
}) {
  const points: string[] = [];
  const turns = 1.12;
  for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * Math.PI * 2 * turns - 0.6;
    const wobble = 1 + Math.sin(t * 3 + seed) * 0.035 + Math.cos(t * 5 + seed * 2) * 0.02;
    points.push(`${(cx + Math.cos(t) * rx * wobble).toFixed(1)},${(cy + Math.sin(t) * ry * wobble).toFixed(1)}`);
  }
  const length = Math.PI * (rx + ry) * turns * 1.05;
  return (
    <svg height={H} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible" }} width={W}>
      <polyline
        fill="none"
        points={points.join(" ")}
        stroke={color}
        strokeDasharray={length}
        strokeDashoffset={length * (1 - draw)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={width}
        style={{ filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.15))" }}
      />
    </svg>
  );
}

/** 손으로 그린 휜 화살표 (from → to), 끝에 화살촉. draw 0..1 */
export function MarkerArrow({ from, to, bend = 0.25, draw = 1, color = MARKER, width = 10 }: {
  from: [number, number]; to: [number, number]; bend?: number; draw?: number; color?: string; width?: number;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
  const my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const length = Math.hypot(x2 - x1, y2 - y1) * 1.25;
  const angle = Math.atan2(y2 - my, x2 - mx);
  const head = 34;
  const h1 = [x2 - head * Math.cos(angle - 0.5), y2 - head * Math.sin(angle - 0.5)];
  const h2 = [x2 - head * Math.cos(angle + 0.5), y2 - head * Math.sin(angle + 0.5)];
  return (
    <svg height={H} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible" }} width={W}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={color} strokeDasharray={length} strokeDashoffset={length * (1 - draw)} strokeLinecap="round" strokeWidth={width} />
      {draw > 0.92 ? <path d={`M ${h1[0]} ${h1[1]} L ${x2} ${y2} L ${h2[0]} ${h2[1]}`} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={width} /> : null}
    </svg>
  );
}

/** 형광펜 자막 — 굵은 글자 뒤로 노란 형광 줄이 쓱 칠해진다. reveal 0..1 */
export function HighlightCaption({ children, y, reveal = 1, size = 58, color = HIGHLIGHT, left = 60, right = 60 }: {
  children: ReactNode; y: number; reveal?: number; size?: number; color?: string; left?: number; right?: number;
}) {
  return (
    <div style={{ position: "absolute", left, right, top: y, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "6px 20px", fontFamily: HEAVY, fontSize: size, lineHeight: 1.18, color: INK, textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "14%",
            bottom: "8%",
            width: `${reveal * 100}%`,
            background: color,
            opacity: 0.92,
            transform: "skewX(-8deg) rotate(-1deg)",
            borderRadius: "6px 18px 8px 14px",
          }}
        />
        <span style={{ position: "relative" }}>{children}</span>
      </div>
    </div>
  );
}

/** 테이프로 붙인 휴대폰 — 앱 화면(390px 폭 기준) 을 그대로 담는다. children 은 화면 위 덧그림 */
export const SCREEN_W = 540;
export const SCREEN_H = Math.round((SCREEN_W * 844) / 390);
export function TapedPhone({ x, y, rot = 3, screen, scale = 1, children, overlay }: {
  x: number; y: number; rot?: number; screen: ReactNode; scale?: number; children?: ReactNode;
  /** 화면 밖으로 넘쳐도 되는 덧그림 (마커 동그라미 등) — 좌표는 화면 왼쪽 위 기준 */
  overlay?: ReactNode;
}) {
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, 0) rotate(${rot}deg) scale(${scale})`, transformOrigin: "50% 0%" }}>
      <div style={{ padding: 16, borderRadius: 74, background: "#141318", boxShadow: "0 40px 60px rgba(0,0,0,0.45), inset 0 0 0 3px rgba(255,255,255,0.08)" }}>
        <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, borderRadius: 58, overflow: "hidden", background: "#fff" }}>
          {screen}
          {children}
        </div>
      </div>
      {overlay ? <div style={{ position: "absolute", left: 16, top: 16, width: SCREEN_W, height: SCREEN_H }}>{overlay}</div> : null}
      <Tape rot={-28} w={250} x={70} y={70} />
      <Tape color="rgba(170,200,255,0.7)" rot={24} w={250} x={SCREEN_W + 2} y={SCREEN_H - 10} />
    </div>
  );
}

/** 앱 화면 사진 한 장 */
export function ScreenImage({ src }: { src: string }) {
  return <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />;
}

/** 스티커 인물 (흰 테두리 그림) — x 가운데, y 아래 끝 */
export function Guide({ src, x, y, height, flip = false, rot = 0 }: { src: string; x: number; y: number; height: number; flip?: boolean; rot?: number }) {
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        height,
        left: x,
        top: y - height,
        transform: `translateX(-50%) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
        filter: "drop-shadow(0 18px 20px rgba(0,0,0,0.35))",
      }}
    />
  );
}
