import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

interface SparklePos {
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

const SPARKLES: SparklePos[] = [
  { x: -110, y: -70, size: 14, delay: 0, color: "#FFE9B0" },
  { x: 115, y: -50, size: 18, delay: 400, color: "#FFD786" },
  { x: -130, y: 30, size: 16, delay: 800, color: "#FFE9B0" },
  { x: 130, y: 50, size: 14, delay: 200, color: "#FFE9B0" },
  { x: -90, y: 80, size: 12, delay: 600, color: "#FFD786" },
  { x: 105, y: -100, size: 10, delay: 1000, color: "#FFE9B0" },
];

function Sparkle({ pos }: { pos: SparklePos }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      pos.delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.in(Easing.ease) }),
        ),
        -1,
        false,
      ),
    );
    scale.value = withDelay(
      pos.delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.5, { duration: 600 }),
        ),
        -1,
        false,
      ),
    );
    rotate.value = withDelay(
      pos.delay,
      withRepeat(
        withTiming(360, { duration: 4000, easing: Easing.linear }),
        -1,
        false,
      ),
    );
  }, [opacity, scale, rotate, pos.delay]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        styles.sparkle,
        {
          left: "50%",
          top: "50%",
          marginLeft: pos.x - pos.size / 2,
          marginTop: pos.y - pos.size / 2,
          width: pos.size,
          height: pos.size,
          backgroundColor: pos.color,
        },
        animStyle,
      ]}
    />
  );
}

export default function Sparkles() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {SPARKLES.map((pos, i) => (
        <Sparkle key={i} pos={pos} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sparkle: {
    position: "absolute",
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
  },
});
