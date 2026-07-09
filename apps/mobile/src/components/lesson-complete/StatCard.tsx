import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface Props {
  label: string;
  value: string; // 최종 표시값 (예: "32", "62%", "4:12")
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  index: number;
  active: boolean; // 내 차례인가
  onDone?: () => void; // 카운트업 끝났을 때
}

// "62%" → {num:62, suffix:"%"}, "4:12"(시간)은 카운트 안 함
function parseValue(value: string) {
  if (value.includes(":")) return { isTime: true, num: 0, suffix: "" };
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { isTime: true, num: 0, suffix: "" }; // 숫자 아니면 그냥 표시
  return { isTime: false, num: parseInt(m[1], 10), suffix: m[2] };
}

export default function StatCard({
  label,
  value,
  iconName,
  color,
  index,
  active,
  onDone,
}: Props) {
  const scale = useSharedValue(0);
  const [display, setDisplay] = useState("0");
  const parsed = parseValue(value);

  useEffect(() => {
    if (!active) return;

    // 도장 찍듯: 크게 왔다가 탁 박힘
    scale.value = withSequence(
      withTiming(1.25, { duration: 130, easing: Easing.out(Easing.quad) }),
      withSpring(1, { damping: 100, stiffness: 320 }, (finished) => {
        if (finished) runOnJS(triggerHaptic)();
      }),
    );

    // 시간/비숫자는 바로 표시하고 끝
    if (parsed.isTime) {
      setDisplay(value);
      const t = setTimeout(() => onDone?.(), 350);
      return () => clearTimeout(t);
    }

    // 숫자 카운트업 (0 → num)
    const target = parsed.num;
    const dur = 600; // 카운트 시간
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      const cur = Math.round(target * p);
      setDisplay(`${cur}${parsed.suffix}`);
      if (p >= 1) {
        clearInterval(id);
        onDone?.();
      }
    }, 30);
    return () => clearInterval(id);
  }, [active]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: scale.value > 0 ? 1 : 0,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, animStyle]}>
      <View style={[styles.card, { borderColor: color }]}>
        <View style={[styles.top, { backgroundColor: color }]}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.bottom}>
          <Ionicons name={iconName} size={22} color={color} />
          <Text style={[styles.value, { color }]}>{display}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

function triggerHaptic() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: {
    borderWidth: 2,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  top: { paddingVertical: 6, alignItems: "center" },
  label: { fontSize: 13, fontWeight: "800", color: "#fff" },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 6,
  },
  value: { fontSize: 22, fontWeight: "900" },
});
