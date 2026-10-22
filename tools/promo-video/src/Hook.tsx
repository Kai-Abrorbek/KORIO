import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, Rich } from "./theme";

/** 0~3초 — 마스코트가 튀어나오고 "Koreys tilini o‘yin kabi o‘rganing!" */
export const HOOK_LINES = ["Koreys tilini", "*o‘yin kabi*", "o‘rganing!"];

export function Wordmark({ size }: { size: number }) {
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: size * 0.02,
        color: "white",
        WebkitTextStroke: `${size * 0.05}px #4B22C9`,
        paintOrder: "stroke fill",
        textShadow: `0 ${size * 0.08}px 0 #2E1585`,
      }}
    >
      KORI<span style={{ color: "#FF5FA2" }}>O</span>
    </div>
  );
}

export function Hook({ exitAt }: { exitAt: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mascot = spring({ frame: frame + 4, fps, config: { damping: 9, stiffness: 140, mass: 0.8 } });
  const leave = interpolate(frame, [exitAt, exitAt + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brand = spring({ frame: frame - 30, fps, config: { damping: 11, stiffness: 160 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", opacity: 1 - leave, transform: `translateY(${-leave * 160}px)` }}>
      <div style={{ marginTop: 190, textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: 120, lineHeight: 1.08, color: "white" }}>
        {HOOK_LINES.map((line, i) => {
          // 첫 줄은 0프레임부터 거의 다 보인다 — 릴스 미리보기·첫 화면이 비지 않게
          const pop = spring({ frame: frame + 6 - i * 5, fps, config: { damping: 11, stiffness: 200, mass: 0.6 } });
          return (
            <div
              key={line}
              style={{
                transform: `scale(${pop}) rotate(${(1 - pop) * (i % 2 ? 8 : -8)}deg)`,
                textShadow: "0 8px 0 rgba(20,8,60,0.3), 0 20px 50px rgba(20,8,60,0.35)",
                marginBottom: 6,
              }}
            >
              <Rich text={line} />
            </div>
          );
        })}
      </div>
      <Img
        src={staticFile("brand/hangulmon_celebrating.png")}
        style={{
          position: "absolute",
          width: 820,
          top: 760,
          transform: `translateY(${(1 - mascot) * 900 + Math.sin(frame / 6) * 12}px) rotate(${Math.sin(frame / 9) * 3}deg)`,
        }}
      />
      <div style={{ position: "absolute", top: 1640, transform: `scale(${brand})` }}>
        <Wordmark size={130} />
      </div>
    </AbsoluteFill>
  );
}
