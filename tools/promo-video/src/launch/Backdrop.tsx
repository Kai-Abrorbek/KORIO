import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, easeInOut, tween } from "./kit";
import { LAUNCH, type LaunchScene } from "./plan";

/**
 * 장면 배경 — 새 장면 색이 원으로 퍼지며 앞 색을 덮는다.
 * 밝은 장면엔 기하 도형, 색 장면엔 은은한 빛 덩어리
 */
const SHAPES = [
  { kind: "circle", x: 960, y: 250, size: 460, color: COLOR.yellow, rotate: 0 },
  { kind: "square", x: -70, y: 1460, size: 400, color: COLOR.pink, rotate: -12 },
  { kind: "square", x: 880, y: 1640, size: 270, color: COLOR.blue, rotate: 18 },
  { kind: "circle", x: 850, y: 1480, size: 96, color: COLOR.coral, rotate: 0 },
  { kind: "pill", x: 120, y: 150, size: 230, color: COLOR.green, rotate: -20 },
  { kind: "ring", x: 170, y: 430, size: 120, color: COLOR.purple, rotate: 0 },
] as const;

function Decor({ scene, g }: { scene: LaunchScene & { from: number }; g: number }) {
  const { fps } = useVideoConfig();
  const local = g - scene.from;
  if (scene.color === COLOR.paper) {
    return (
      <>
        {SHAPES.map((shape, i) => {
          const pop = spring({ frame: local + 6 - i * 3, fps, config: { damping: 18, stiffness: 120 } });
          const drift = Math.sin((g + i * 40) / 60) * 10;
          const base = { position: "absolute" as const, left: shape.x - shape.size / 2, top: shape.y - shape.size / 2 + drift };
          const transform = `rotate(${shape.rotate + Math.sin((g + i * 30) / 90) * 4}deg) scale(${pop})`;
          if (shape.kind === "ring") {
            return (
              <div
                key={i}
                style={{ ...base, width: shape.size, height: shape.size, borderRadius: "50%", border: `18px solid ${shape.color}`, transform }}
              />
            );
          }
          return (
            <div
              key={i}
              style={{
                ...base,
                width: shape.size,
                height: shape.kind === "pill" ? shape.size * 0.4 : shape.size,
                borderRadius: shape.kind === "circle" ? "50%" : shape.kind === "pill" ? 999 : shape.size * 0.22,
                background: shape.color,
                transform,
              }}
            />
          );
        })}
      </>
    );
  }
  return (
    <>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 1400,
            height: 1400,
            left: (i ? 300 : -700) + Math.sin((g + i * 200) / 80) * 80,
            top: (i ? 900 : -500) + Math.cos((g + i * 120) / 95) * 70,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 62%)",
          }}
        />
      ))}
    </>
  );
}

export function Backdrop() {
  const g = useCurrentFrame();
  // 색 바꿈은 장면 시작 6프레임 전부터
  let index = 0;
  LAUNCH.forEach((s, i) => {
    if (s.from - 6 <= g) index = i;
  });
  const current = LAUNCH[index];
  const prev = LAUNCH[index - 1];
  const wipe = prev ? tween(g, current.from - 6, 20, 0, 1, easeInOut) : 1;
  const origin = current.wipeFrom ?? { x: 540, y: 960 };
  const radius = interpolate(wipe, [0, 1], [0, 2300]);
  return (
    <AbsoluteFill style={{ background: prev && wipe < 1 ? prev.color : current.color, overflow: "hidden" }}>
      {prev && wipe < 1 ? <Decor g={g} scene={prev} /> : null}
      <AbsoluteFill
        style={{
          background: current.color,
          clipPath: wipe < 1 ? `circle(${radius}px at ${origin.x}px ${origin.y}px)` : undefined,
          overflow: "hidden",
        }}
      >
        <Decor g={g} scene={current} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
