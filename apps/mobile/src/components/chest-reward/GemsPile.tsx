import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Polygon, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface GemConfig {
  x: number;
  y: number;
  size: number;
  delay: number;
  rotate: number;
}

const GEMS: GemConfig[] = [
  { x: 0, y: -45, size: 50, delay: 0, rotate: 0 },
  { x: -36, y: -10, size: 48, delay: 120, rotate: -8 },
  { x: 36, y: -8, size: 50, delay: 240, rotate: 6 },
  { x: -28, y: 28, size: 46, delay: 360, rotate: 4 },
  { x: 30, y: 32, size: 50, delay: 480, rotate: -10 },
];

function hexPoints(size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = ((60 * i - 90) * Math.PI) / 180;
    const x = 50 + (size / 2) * Math.cos(angle);
    const y = 50 + (size / 2) * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}

function Gem({ size }: { size: number }) {
  const points = hexPoints(90);
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 어두운 그림자 면 */}
      <Polygon points={points} fill="#3BB6E5" />
      {/* 메인 본체 */}
      <Polygon points="50,5 90,28 75,55 25,55 10,28" fill="#5CD0F0" />
      {/* 하이라이트 */}
      <Path d="M 30 18 L 40 12 L 45 22 L 35 28 Z" fill="#A8E5F7" />
    </Svg>
  );
}

function AnimatedGem({ config }: { config: GemConfig }) {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(-60);
  const rotation = useSharedValue(config.rotate - 30);

  useEffect(() => {
    scale.value = withDelay(
      config.delay,
      withSequence(
        withSpring(1.15, { damping: 6, stiffness: 260 }),
        withSpring(1, { damping: 9 }),
      ),
    );
    translateY.value = withDelay(
      config.delay,
      withSpring(0, { damping: 8, stiffness: 220 }),
    );
    rotation.value = withDelay(
      config.delay,
      withSpring(config.rotate, { damping: 10, stiffness: 180 }),
    );
  }, [config, scale, translateY, rotation]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.gem,
        {
          marginLeft: config.x - config.size / 2,
          marginTop: config.y - config.size / 2,
          width: config.size,
          height: config.size,
        },
        animStyle,
      ]}
    >
      <Gem size={config.size} />
    </Animated.View>
  );
}

export default function GemsPile() {
  const shadowScale = useSharedValue(0);

  useEffect(() => {
    shadowScale.value = withDelay(
      100,
      withSpring(1, { damping: 12, stiffness: 180 }),
    );
  }, [shadowScale]);

  const shadowStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: shadowScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.shadow, shadowStyle]} />
      {GEMS.map((config, i) => (
        <AnimatedGem key={i} config={config} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  gem: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  shadow: {
    position: "absolute",
    bottom: 30,
    width: 130,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E8E8EE",
    opacity: 0.7,
  },
});
