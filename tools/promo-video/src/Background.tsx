import { AbsoluteFill, interpolate, interpolateColors, random, useCurrentFrame } from "remotion";
import { SECTIONS } from "./timeline";
import { FONT } from "./theme";

/** 장면마다 바뀌는 그라디언트 + 천천히 떠오르는 한글 자모 */
const LETTERS = ["가", "ㅎ", "한", "ㄱ", "나", "ㅏ", "글", "ㅇ", "다", "ㄹ", "요", "ㅁ", "사", "ㅗ"];
const BLEND = 10;

function colorsAt(frame: number): [string, string] {
  const index = Math.max(0, SECTIONS.findIndex((s) => frame < s.from + s.dur));
  const current = SECTIONS[index];
  const prev = SECTIONS[index - 1];
  if (!prev || frame >= current.from + BLEND) return current.colors;
  const t = [current.from - BLEND, current.from + BLEND];
  return [0, 1].map((i) => interpolateColors(frame, t, [prev.colors[i], current.colors[i]])) as [string, string];
}

export function Background() {
  const frame = useCurrentFrame();
  const [a, b] = colorsAt(frame);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${a} 0%, ${b} 100%)`, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          left: -420 + Math.sin(frame / 70) * 60,
          top: -520 + Math.cos(frame / 90) * 50,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)",
        }}
      />
      {LETTERS.map((letter, i) => {
        const size = 110 + random(`s${i}`) * 140;
        const speed = 0.6 + random(`v${i}`) * 0.9;
        const y = ((random(`y${i}`) * 2200 - frame * speed) % 2300 + 2300) % 2300 - 250;
        const x = random(`x${i}`) * 1080 - size / 2;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin((frame + i * 40) / 50) * 20,
              top: y,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: size,
              color: "white",
              opacity: interpolate(random(`o${i}`), [0, 1], [0.06, 0.13]),
              transform: `rotate(${(random(`r${i}`) - 0.5) * 30}deg)`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </AbsoluteFill>
  );
}
