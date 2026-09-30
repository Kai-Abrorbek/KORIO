import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";

export const RING_SIZE = 102;
const STROKE = 9;
const R = (RING_SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const GAP_DEG = 20;
const GAP = (GAP_DEG / 360) * C;

interface Props {
  color: string;
  completedSteps?: number;
  totalSteps?: number;
}

export default function AnimatedNodeRing({
  color,
  completedSteps = 0,
  totalSteps = 4,
}: Props) {
  // 칸 길이는 레슨 수로 나눠야 한다. 4 로 고정해 두면 레슨 5개 노드(섹션 4~)에서
  // 5번째 칸이 한 바퀴를 넘어 첫 칸 위에 겹친다.
  const count = Math.max(1, totalSteps);
  const ARC = (C - GAP * count) / count;
  const steps = Array.from({ length: count }, (_, i) => {
    const isDone = i < completedSteps;
    const offset = i * (ARC + GAP);
    return { isDone, offset };
  });

  return (
    <Svg width={RING_SIZE} height={RING_SIZE}>
      {steps.map((step, i) => {
        const opacity = step.isDone ? 1 : 0.5;
        return (
          <Circle
            key={i}
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={R}
            stroke={color}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${ARC} ${C - ARC}`}
            strokeDashoffset={-step.offset}
            strokeLinecap="round"
            opacity={opacity}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        );
      })}
    </Svg>
  );
}
