import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useEnergyStore } from "@/store/energy.store";

// 레전드 보상 XP (수정 가능)
const LEGEND_XP = 40;

const GOLD = "#FFC800",
  GOLD_DK = "#E5A800",
  GOLD_LT = "#FFE066";

export default function LegendIntro() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { nodeId, energy } = useLocalSearchParams<{
    nodeId?: string;
    energy?: string;
  }>();
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const float = useSharedValue(0);
  const glow = useSharedValue(0.4);
  const tw = useSharedValue(0);

  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
    glow.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1200 }),
        withTiming(0.4, { duration: 1200 }),
      ),
      -1,
    );
    tw.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 700 }),
        withTiming(0, { duration: 700 }),
      ),
      -1,
    );
  }, []);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 1 + glow.value * 0.15 }],
  }));
  const twStyle = (d: number) =>
    useAnimatedStyle(() => ({ opacity: 0.3 + tw.value * 0.7 }));

  const start = () => {
    guardLessonStart(Number(energy), () => {
      router.replace({
        pathname: "/lesson",
        params: { mode: "legend", nodeId },
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.body, { paddingTop: insets.top }]}>
        {/* 골드 마스코트 / 트로피 */}
        <View style={styles.hero}>
          <Animated.View style={[styles.glow, glowStyle]} />

          {/* 반짝이 */}
          <Animated.Text
            style={[
              styles.spark,
              { top: "8%", right: "22%", fontSize: 30 },
              twStyle(0),
            ]}
          >
            ✦
          </Animated.Text>
          <Animated.Text
            style={[
              styles.spark,
              { bottom: "24%", left: "20%", fontSize: 24 },
              twStyle(1),
            ]}
          >
            ✦
          </Animated.Text>
          <Animated.Text
            style={[
              styles.spark,
              { bottom: "20%", right: "18%", fontSize: 22 },
              twStyle(2),
            ]}
          >
            ✦
          </Animated.Text>

          <Animated.View style={[styles.mascotWrap, mascotStyle]}>
            {/* 실제 골드 마스코트 에셋 있으면 여기 <Image>로 교체 */}
            <Ionicons name="trophy" size={130} color={GOLD} />
            <View style={styles.podium}>
              <Ionicons name="checkmark" size={40} color={GOLD_DK} />
            </View>
          </Animated.View>
        </View>

        {/* 타이틀 */}
        <Text style={styles.title}>{t("legend.introTitle")}</Text>
      </View>

      {/* 하단 버튼 */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable onPress={start}>
          {({ pressed }) => (
            <View
              style={[
                styles.startBtn,
                pressed && { transform: [{ translateY: 3 }] },
              ]}
            >
              <LinearGradient
                colors={[GOLD_LT, GOLD]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.startInner}
              >
                <Text style={styles.startText}>
                  {t("legend.start", { xp: LEGEND_XP })}
                </Text>
              </LinearGradient>
            </View>
          )}
        </Pressable>

        <Pressable style={styles.laterBtn} onPress={() => router.back()}>
          <Text style={styles.laterText}>{t("legend.later")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0d" },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  hero: {
    width: 300,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  glow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: GOLD,
    opacity: 0.4,
  },
  spark: { position: "absolute", color: "#fff", fontWeight: "900" },
  mascotWrap: { alignItems: "center" },
  podium: {
    width: 150,
    height: 44,
    borderRadius: 22,
    backgroundColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -6,
    borderBottomWidth: 5,
    borderBottomColor: GOLD_DK,
  },
  title: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 38,
  },
  footer: { paddingHorizontal: 20 },
  startBtn: { borderRadius: 18, backgroundColor: GOLD_DK, paddingBottom: 4 },
  startInner: { borderRadius: 16, paddingVertical: 20, alignItems: "center" },
  startText: { color: "#7a5c00", fontSize: 19, fontWeight: "900" },
  laterBtn: { paddingVertical: 18, alignItems: "center" },
  laterText: { color: "#c9a84a", fontSize: 17, fontWeight: "900" },
});
