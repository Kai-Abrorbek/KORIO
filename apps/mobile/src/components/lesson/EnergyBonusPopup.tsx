import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

interface Props {
  visible: boolean;
  amount: number;
  onDone: () => void;
}

const PARTICLES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist = 90 + (i % 3) * 22;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 14 + (i % 3) * 8,
    light: i % 2 === 0,
    rot: (i % 2 === 0 ? 1 : -1) * (20 + i * 8),
  };
});

export default function EnergyBonusPopup({ visible, amount, onDone }: Props) {
  const [display, setDisplay] = useState(0);
  const fade = useSharedValue(0);

  useEffect(() => {
    if (!visible || amount <= 0) return;

    setDisplay(0);
    let cur = 0;
    const stepMs = Math.max(60, Math.floor(600 / amount));
    const counter = setInterval(() => {
      cur += 1;
      setDisplay(cur);
      if (cur >= amount) clearInterval(counter);
    }, stepMs);

    // 페이드인 → 유지 → 페이드아웃 을 하나의 시퀀스로
    fade.value = withSequence(
      withTiming(1, { duration: 200 }), // 나타남
      withDelay(
        1900,
        withTiming(0, { duration: 500 }, (fin) => {
          if (fin) runOnJS(onDone)();
        }),
      ), // 유지 후 사라짐
    );

    return () => clearInterval(counter);
  }, [visible, amount]);

  const fadeStyle = useAnimatedStyle(() => ({ opacity: fade.value }));

  if (!visible || amount <= 0) return null;

  return (
    <Animated.View pointerEvents="none" style={[s.container, fadeStyle]}>
      {/* 파티클 */}
      {PARTICLES.map((p, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: p.size * 0.3,
            backgroundColor: p.light ? "#FFE88A" : "#FFD93B",
            transform: [
              { translateX: p.x },
              { translateY: p.y },
              { rotate: `${p.rot}deg` },
            ],
          }}
        />
      ))}

      {/* 배터리 */}
      <View style={s.battery}>
        <View style={s.gloss} />
        <Text style={s.battText}>+{display}</Text>
      </View>
      {/* 양극 꼭지 (배터리 밖 오른쪽) */}
      <View style={s.cap} />
    </Animated.View>
  );
}

const BATT_W = 150;
const BATT_H = 96;

const s = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    elevation: 99999,
  },
  battery: {
    width: BATT_W,
    height: BATT_H,
    borderRadius: 24,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
  },
  gloss: {
    position: "absolute",
    left: 18,
    top: 22,
    width: 22,
    height: BATT_H - 44,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    opacity: 0.45,
  },
  battText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  cap: {
    position: "absolute",
    // 배터리 오른쪽 끝에 붙이기: 화면 중앙 + 배터리 절반 + 약간
    marginLeft: BATT_W + 8,
    width: 13,
    height: 36,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    backgroundColor: "#FFC107",
  },
});
