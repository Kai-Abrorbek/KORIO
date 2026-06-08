import { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const RING_SIZE = 104;
const STROKE = 6;
const R = (RING_SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

// 4개 호 (각 70°) + 4개 갭 (각 20°)
const ARC = (70 / 360) * C;
const GAP = (20 / 360) * C;

interface Props {
  color: string;
}

export default function AnimatedNodeRing({ color }: Props) {
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.95, {
        duration: 950,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true, // reverse - 사라지다 나타나다 효과
    );
  }, [opacity]);

  const animatedProps = useAnimatedProps(() => ({
    opacity: opacity.value,
  }));

  return (
    <Svg width={RING_SIZE} height={RING_SIZE}>
      <AnimatedCircle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={R}
        stroke={color}
        strokeWidth={STROKE}
        fill="none"
        strokeDasharray={`${ARC} ${GAP}`}
        strokeLinecap="round"
        transform={`rotate(-80 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}
