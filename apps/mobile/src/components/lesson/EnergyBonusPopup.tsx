import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  cancelAnimation,
  runOnJS,
  type SharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  amount: number;
  onDone: () => void;
}

// 파티클 12개 (터지듯 사방으로)
const PARTICLES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist = 70 + (i % 3) * 26;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 12 + (i % 3) * 6,
    light: i % 2 === 0,
    rot: (i % 2 === 0 ? 1 : -1) * (20 + i * 8),
  };
});

function Particle({
  p,
  progress,
}: {
  p: (typeof PARTICLES)[0];
  progress: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateX: p.x * progress.value },
      { translateY: p.y * progress.value },
      { rotate: `${p.rot * progress.value}deg` },
      { scale: 0.4 + progress.value * 0.6 },
    ],
  }));
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: p.size,
          height: p.size,
          borderRadius: p.size * 0.3,
          backgroundColor: p.light ? "#FFE88A" : "#FFD93B",
        },
        style,
      ]}
    />
  );
}

export default function EnergyBonusPopup({ visible, amount, onDone }: Props) {
  // console.log("BONUS POPUP", { visible, amount }); // ← 찍히나?
  const pop = useSharedValue(0); // 배터리 등장
  const burst = useSharedValue(0); // 파티클 터짐
  const wrap = useSharedValue(0); // 전체 fade

  useEffect(() => {
    if (!visible || amount <= 0) return;
    cancelAnimation(pop);
    pop.value = 0;
    burst.value = 0;
    wrap.value = 0;

    wrap.value = withTiming(1, { duration: 200 });
    pop.value = withSpring(1, { damping: 10, stiffness: 180 });
    burst.value = withSequence(
      withTiming(1, { duration: 450 }),
      withDelay(400, withTiming(0, { duration: 500 })),
    );

    // 1.8초 유지 후 페이드아웃
    wrap.value = withDelay(
      2400,
      withTiming(0, { duration: 400 }, (fin) => {
        if (fin) runOnJS(onDone)();
      }),
    );
  }, [visible, amount]);

  const wrapStyle = useAnimatedStyle(() => ({ opacity: wrap.value }));
  const battStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }],
  }));

  if (amount <= 0) return null;

  return (
    <Animated.View pointerEvents="none" style={[s.container, wrapStyle]}>
      {/* 파티클 */}
      <View style={s.particleAnchor}>
        {PARTICLES.map((p, i) => (
          <Particle key={i} p={p} progress={burst} />
        ))}
      </View>

      {/* 배터리 */}
      <Animated.View style={[s.battery, battStyle]}>
        {/* 광택 */}
        <View style={s.gloss} />
        <Text style={s.battText}>+{amount}</Text>
        {/* 양극 꼭지 */}
        <View style={s.cap} />
      </Animated.View>
    </Animated.View>
  );
}

const BATT_W = 150;
const BATT_H = 96;

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    elevation: 99999,
  },
  particleAnchor: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  battery: {
    width: BATT_W,
    height: BATT_H,
    borderRadius: 22,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  gloss: {
    position: "absolute",
    left: 16,
    top: 12,
    width: 20,
    height: BATT_H - 40,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    opacity: 0.4,
  },
  battText: {
    fontSize: 46,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  cap: {
    position: "absolute",
    right: -12,
    width: 12,
    height: 34,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "#FFC107",
  },
});
