import { useEffect, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { width: W, height: H } = Dimensions.get("window");

interface Particle {
  id: number;
  startX: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  travel: number;
}

const COLORS = ["#776ee2", "#A78BFA", "#FFD786", "#7FD8F7", "#FFAFCC"];

function generate(count: number): Particle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    startX: Math.random() * W,
    size: 4 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 4000,
    duration: 8000 + Math.random() * 6000,
    travel: 100 + Math.random() * 150,
  }));
}

function Particle({ p }: { p: Particle }) {
  const y = useSharedValue(H + 50);
  const opacity = useSharedValue(0);
  const drift = useSharedValue(0);

  useEffect(() => {
    y.value = withDelay(
      p.delay,
      withRepeat(
        withTiming(-50, { duration: p.duration, easing: Easing.linear }),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      p.delay,
      withRepeat(withTiming(0.6, { duration: p.duration / 2 }), -1, true),
    );
    drift.value = withDelay(
      p.delay,
      withRepeat(withTiming(p.travel, { duration: p.duration / 3 }), -1, true),
    );
  }, [p, y, opacity, drift]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: y.value }, { translateX: drift.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: p.startX,
          width: p.size,
          height: p.size,
          borderRadius: p.size / 2,
          backgroundColor: p.color,
        },
        animStyle,
      ]}
    />
  );
}

export default function AmbientParticles({ count = 15 }: { count?: number }) {
  const particles = useMemo(() => generate(count), [count]);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} p={p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    top: 0,
  },
});
