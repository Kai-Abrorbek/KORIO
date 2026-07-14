import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { getTier } from "@/constants/league-tiers";
import BoriMascot from "@/components/home/BoriMascot";

// 조정 가능
export const CHALLENGE_SEGMENTS = [5, 10, 20];
export const CHALLENGE_DURATION = 150; // 2:30

export default function ChallengeIntro() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const p = useLocalSearchParams<{ tier: string; xp: string; type: string }>();
  const tier = getTier(p.tier ?? "bronze");

  const [left, setLeft] = useState(CHALLENGE_DURATION);
  useEffect(() => {
    const id = setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = `${Math.floor(CHALLENGE_DURATION / 60)}:${String(
    CHALLENGE_DURATION % 60,
  ).padStart(2, "0")}`;

  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 800 }),
        withTiming(0, { duration: 800 }),
      ),
      -1,
    );
  }, []);
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  const total = CHALLENGE_SEGMENTS[CHALLENGE_SEGMENTS.length - 1];

  return (
    <View style={[s.c, { paddingTop: insets.top + 8 }]}>
      {/* 헤더: 구간 진행바 + 타이머 */}
      <View style={s.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="close" size={30} color="#B4BCC5" />
        </Pressable>
        <View style={s.barWrap}>
          <View style={s.track}>
            <View
              style={[s.fill, { width: "8%", backgroundColor: tier.color }]}
            />
            {CHALLENGE_SEGMENTS.map((seg, i) => (
              <View
                key={i}
                style={[s.dot, { left: `${(seg / total) * 100}%` }]}
              >
                <Text style={s.dotText}>{seg}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={s.timer}>
          <View style={[s.clock, { borderColor: tier.color }]}>
            <Ionicons name="time" size={16} color={tier.color} />
          </View>
          <Text style={[s.timeText, { color: tier.color }]}>{timeStr}</Text>
        </View>
      </View>

      {/* 마스코트 + 말풍선 */}
      <View style={s.body}>
        <Animated.View
          entering={FadeIn.duration(400)}
          style={[s.mascotRow, bobStyle]}
        >
          <BoriMascot size={140} />
          <View style={s.bubble}>
            <Text style={s.bubbleText}>
              <Text style={{ fontWeight: "900" }}>
                {t("challenge.readyTitle")}
              </Text>{" "}
              {t("challenge.readyDesc")}
            </Text>
            <View style={s.bubbleTail} />
          </View>
        </Animated.View>
      </View>

      {/* 계속 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/lesson",
              params: {
                mode: "challenge",
                tier: p.tier,
                xp: p.xp,
                type: p.type,
              },
            })
          }
        >
          {({ pressed }) => (
            <View
              style={[
                s.btn,
                { backgroundColor: tier.color },
                pressed && { transform: [{ translateY: 3 }] },
              ]}
            >
              <Text style={s.btnText}>{t("challenge.continue")}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  barWrap: { flex: 1 },
  track: {
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
  },
  fill: { position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: 9 },
  dot: {
    position: "absolute",
    marginLeft: -13,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#D7DBE0",
    alignItems: "center",
    justifyContent: "center",
  },
  dotText: { fontSize: 12, fontWeight: "900", color: "#fff" },
  timer: { flexDirection: "row", alignItems: "center", gap: 5 },
  clock: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: { fontSize: 17, fontWeight: "900" },
  body: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  mascotRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bubble: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 16,
  },
  bubbleText: { fontSize: 17, color: "#3C3C4C", lineHeight: 26 },
  bubbleTail: {
    position: "absolute",
    left: -9,
    top: 30,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 9,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#E5E7EB",
  },
  footer: { paddingHorizontal: 20 },
  btn: { borderRadius: 18, paddingVertical: 20, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 19, fontWeight: "900" },
});
