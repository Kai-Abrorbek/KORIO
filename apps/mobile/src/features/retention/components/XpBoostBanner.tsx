import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/** 복귀 보상의 XP 배수 — 끝날 때까지 남은 시간을 센다 */
export default function XpBoostBanner({
  until,
  multiplier,
  onEnd,
}: {
  until: string;
  multiplier: number;
  onEnd?: () => void;
}) {
  const { t } = useTranslation();
  const end = new Date(until).getTime();
  const [left, setLeft] = useState(Math.max(0, end - Date.now()));
  const sweep = useSharedValue(0);

  useEffect(() => {
    const id = setInterval(() => {
      const ms = Math.max(0, end - Date.now());
      setLeft(ms);
      if (ms <= 0) {
        clearInterval(id);
        onEnd?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [end]);

  useEffect(() => {
    sweep.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      -1,
    );
  }, []);

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -120 + sweep.value * 520 }, { rotate: "18deg" }],
  }));

  if (left <= 0) return null;
  const mm = Math.floor(left / 60000);
  const ss = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");

  return (
    <LinearGradient
      colors={["#FFB020", "#FF6B9A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.wrap}
    >
      <Animated.View pointerEvents="none" style={[styles.shine, shineStyle]} />
      <View style={styles.badge}>
        <Ionicons name="flash" size={16} color="#FF8A00" />
        <Text style={styles.badgeText}>×{multiplier}</Text>
      </View>
      <Text style={styles.text} numberOfLines={1}>
        {t("retention.boost.active", { n: multiplier })}
      </Text>
      <Text style={styles.time}>
        {mm}:{ss}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "hidden",
  },
  shine: {
    position: "absolute",
    top: -20,
    bottom: -20,
    width: 40,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 14, fontWeight: "900", color: "#FF8A00" },
  text: { flex: 1, fontSize: 14, fontWeight: "900", color: "#FFFFFF" },
  time: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
    fontVariant: ["tabular-nums"],
  },
});
