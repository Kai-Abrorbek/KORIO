import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, HIGHLIGHT, INK } from "./theme";

/**
 * 튜터 통화 위에 띄우는 큰 말풍선 — 휴대폰 안 글씨는 작아서 대화를 크게 다시 보여 준다.
 * 시각은 촬영 각본(capture/promo-stage TUTOR_SCRIPT)과 같다: 400ms · 1100ms · 6000ms · 6800ms.
 * 마지막 두 풍선은 장면 끝(둘째 내레이션)까지 남는다.
 */
const LINES = [
  { at: 12, until: 172, who: "Siz", side: "right", text: "Oishii!" },
  { at: 33, until: 172, who: "AI ustoz", side: "left", text: "OISHII?! Bu yaponcha-ku!\nKoreyschada — 맛있어요!", speak: 141 },
  { at: 180, until: 999, who: "Siz", side: "right", text: "맛있어요!" },
  { at: 204, until: 999, who: "AI ustoz", side: "left", text: "Ana! Zo‘r! 😄", speak: 48 },
] as const;

function Bubble({ line }: { line: (typeof LINES)[number] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - line.at, fps, config: { damping: 12, stiffness: 200, mass: 0.6 } });
  const out = interpolate(frame, [line.until - 6, line.until], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < line.at || frame > line.until) return null;
  const tutor = line.side === "left";
  const chars = Array.from(line.text);
  const shown = "speak" in line ? Math.ceil(chars.length * Math.min(1, (frame - line.at) / line.speak)) : chars.length;
  return (
    <div
      style={{
        alignSelf: tutor ? "flex-start" : "flex-end",
        maxWidth: 860,
        opacity: out,
        transform: `scale(${0.5 + pop * 0.5}) rotate(${(1 - pop) * (tutor ? -6 : 6)}deg)`,
        transformOrigin: tutor ? "0% 100%" : "100% 100%",
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 30,
          color: "white",
          margin: tutor ? "0 0 6px 26px" : "0 26px 6px 0",
          textAlign: tutor ? "left" : "right",
          textShadow: "0 3px 8px rgba(20,8,60,0.5)",
        }}
      >
        {line.who}
      </div>
      <div
        style={{
          position: "relative",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: tutor ? 56 : 62,
          lineHeight: 1.18,
          whiteSpace: "pre-line",
          color: tutor ? INK : "white",
          background: tutor ? HIGHLIGHT : "#5B3BE8",
          border: "5px solid white",
          borderRadius: 44,
          borderBottomLeftRadius: tutor ? 10 : 44,
          borderBottomRightRadius: tutor ? 44 : 10,
          padding: "22px 38px 28px",
          boxShadow: "0 14px 0 rgba(20,8,60,0.3), 0 24px 60px rgba(20,8,60,0.4)",
        }}
      >
        {/* 다 나온 글자 폭을 미리 잡아 두고 보이는 만큼만 칠한다 — 말풍선이 출렁이지 않게 */}
        <span>{chars.slice(0, shown).join("")}</span>
        <span style={{ visibility: "hidden" }}>{chars.slice(shown).join("")}</span>
      </div>
    </div>
  );
}

export function TutorDialogue() {
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 50px 90px", gap: 22, display: "flex", flexDirection: "column" }}>
      {LINES.map((line) => (
        <Bubble key={`${line.at}`} line={line} />
      ))}
    </AbsoluteFill>
  );
}
