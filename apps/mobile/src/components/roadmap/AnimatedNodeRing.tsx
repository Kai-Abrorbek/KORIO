import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";

export const RING_SIZE = 102;
const STROKE = 9;
const R = (RING_SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const TOTAL_STEPS = 4;
const GAP_DEG = 20;
const GAP = (GAP_DEG / 360) * C;
const ARC = (C - GAP * TOTAL_STEPS) / TOTAL_STEPS;

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
  const steps = Array.from({ length: totalSteps }, (_, i) => {
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
