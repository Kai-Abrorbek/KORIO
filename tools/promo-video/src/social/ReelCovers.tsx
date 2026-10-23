/**
 * 릴스 표지 (1080×1920). 프로필 격자는 가운데 3:4 (y 240~1680) 만 보여 주니 제목과 핵심 그림은 그 안에.
 *   remotion still src/index.ts IgCover social/covers/launch.png --props='{"variant":"launch"}'
 */
import type { ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { boxes, COLOR, SANS, type Box } from "../launch/kit";

const APP_W = 390;
const APP_H = 844;

function Glows() {
  return (
    <>
      <div style={{ position: "absolute", width: 1300, height: 1300, left: -520, top: -480, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 62%)" }} />
      <div style={{ position: "absolute", width: 1200, height: 1200, left: 420, top: 1050, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 62%)" }} />
    </>
  );
}

/** 제목 — *별표* 안은 노란 띠 */
function Title({ text, top, size = 124 }: { text: string; top: number; size?: number }) {
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: size, lineHeight: 1.08, letterSpacing: -4, color: "#fff", textShadow: "0 8px 30px rgba(10,6,40,0.25)" }}>
      {text.split("\n").map((line, i) => (
        <div key={i}>
          {line.split(/(\*[^*]+\*)/).filter(Boolean).map((part, j) =>
            part.startsWith("*") ? (
              <span key={j} style={{ display: "inline-block", background: COLOR.yellow, color: COLOR.ink, borderRadius: size * 0.3, padding: `0 ${size * 0.22}px ${size * 0.08}px`, margin: "6px 0", textShadow: "none" }}>
                {part.slice(1, -1)}
              </span>
            ) : (
              <span key={j}>{part}</span>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

/** 휴대폰 — 안에 앱 화면 그림 (390 폭 기준 그림을 width 에 맞춘다) */
function PhoneShot({ src, cx, top, width, rotate = 0 }: { src: string; cx: number; top: number; width: number; rotate?: number }) {
  const bezel = width * 0.022;
  const screenH = (width * APP_H) / APP_W;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - width / 2 - bezel,
        top,
        width: width + bezel * 2,
        height: screenH + bezel * 2,
        padding: bezel,
        borderRadius: width * 0.14,
        background: "#0E0D12",
        boxShadow: "0 50px 120px rgba(10,6,40,0.45)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div style={{ width, height: screenH, borderRadius: width * 0.12, overflow: "hidden", background: "#fff", position: "relative" }}>
        <Img src={src} style={{ position: "absolute", left: 0, top: 0, width }} />
      </div>
    </div>
  );
}

/** 앱 화면 속 카드 한 장을 떼어 크게 */
function CardShot({ still, b, cx, cy, width, rotate = 0 }: { still: string; b: Box; cx: number; cy: number; width: number; rotate?: number }) {
  const k = width / b.w;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - width / 2,
        top: cy - (b.h * k) / 2,
        width,
        height: b.h * k,
        borderRadius: 18 * k,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 30px 80px rgba(10,6,40,0.4)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <Img src={staticFile(`stills/${still}.png`)} style={{ position: "absolute", left: -b.x * k, top: -b.y * k, width: APP_W * k }} />
    </div>
  );
}

function Wordmark({ top, color = "#fff" }: { top: number; color?: string }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 44, letterSpacing: 10, color, opacity: 0.85 }}>
      KORIO
    </div>
  );
}

function Frame({ background, children }: { background: string; children: ReactNode }) {
  return <AbsoluteFill style={{ background, overflow: "hidden" }}>{children}</AbsoluteFill>;
}

/** 런치 영상 — 두 언어, 한 앱 */
function LaunchCover() {
  const [ko, en] = boxes("courses", "card");
  return (
    <Frame background={COLOR.purple}>
      <Glows />
      <div style={{ position: "absolute", width: 420, height: 420, right: -120, top: 120, borderRadius: "50%", background: COLOR.yellow }} />
      <Wordmark top={268} />
      <Title text={"Koreys va\ningliz tili\n*bitta ilovada*"} top={360} />
      <PhoneShot cx={540} rotate={-4} src={staticFile("stills/home.png")} top={1000} width={500} />
      <CardShot b={ko} cx={500} cy={1230} rotate={-3} still="courses" width={640} />
      <CardShot b={en} cx={590} cy={1440} rotate={2.5} still="courses" width={640} />
    </Frame>
  );
}

/** 소개 영상 — 놀이처럼, AI 튜터 */
function IntroCover() {
  return (
    <Frame background={`linear-gradient(165deg, ${COLOR.purple} 0%, ${COLOR.indigo} 100%)`}>
      <Glows />
      <Wordmark top={268} />
      <Title text={"Koreys tilini\n*o‘yin kabi*\no‘rganing!"} top={360} />
      <PhoneShot cx={420} rotate={-6} src={staticFile("stills/tutor-frame.png")} top={1000} width={500} />
      <Img src={staticFile("brand/hangulmon_celebrating.png")} style={{ position: "absolute", left: 520, top: 1080, width: 600 }} />
    </Frame>
  );
}

export type CoverProps = { variant: "launch" | "intro" };

export function IgCover({ variant }: CoverProps) {
  return variant === "launch" ? <LaunchCover /> : <IntroCover />;
}
