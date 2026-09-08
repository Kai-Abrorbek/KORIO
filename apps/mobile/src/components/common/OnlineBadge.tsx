import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * "지금 접속 중" 알약.
 *
 * 점이 아주 천천히 숨 쉬듯 커졌다 작아진다 — 정지된 초록 점은 그냥
 * 장식처럼 보이는데, 미세하게 움직이면 "실시간" 이라는 게 읽힌다.
 * 주기를 2초로 길게 잡아서 시끄럽지 않다.
 */
export default function OnlineBadge({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.45, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, []);

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.55 - (pulse.value - 1) * 0.9,
  }));

  return (
    <View style={[styles.pill, compact && styles.pillCompact]}>
      <View style={styles.dotWrap}>
        <Animated.View style={[styles.halo, haloStyle]} />
        <View style={styles.dot} />
      </View>
      {!compact && <Text style={styles.text}>{t("friends.online")}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
  },
  pillCompact: { paddingHorizontal: 6 },
  dotWrap: { width: 9, height: 9, alignItems: "center", justifyContent: "center" },
  halo: {
    position: "absolute",
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#22C55E",
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#22C55E" },
  text: { color: "#fff", fontSize: 11.5, fontWeight: "800" },
});
