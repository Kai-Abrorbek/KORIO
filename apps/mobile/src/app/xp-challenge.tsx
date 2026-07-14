import { View, Text, StyleSheet, Pressable } from "react-native";
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
import { getTier } from "@/constants/league-tiers";
import { useAuthStore } from "@/store/auth.store";
import { LeagueService } from "@/services/league.service";

// 조정 가능
const ENERGY_COST = 15;
const CHALLENGE_LEVELS = 9;

export default function XpChallenge() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const p = useLocalSearchParams<{ tier: string; xp: string; type?: string }>();

  const tier = getTier(p.tier ?? "bronze");
  const maxXp = Number(p.xp ?? 210);
  const questionType = p.type ?? "match"; // 문제 타입 (수정 가능)
  const user = useAuthStore((s) => s.user);
  const energy = user?.energy ?? 0;

  const float = useSharedValue(0);
  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, []);
  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  const start = async () => {
    try {
      await LeagueService.snapshotRank();
    } catch {}
    router.replace({
      pathname: "/challenge-intro",
      params: {
        tier: p.tier ?? "bronze",
        xp: String(maxXp),
        type: questionType,
      },
    });
  };

  return (
    <View style={[s.c, { backgroundColor: tier.color }]}>
      {/* 헤더 */}
      <View style={[s.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="close" size={32} color="#fff" />
        </Pressable>
        <Text style={s.title}>{t(`challenge.types.${questionType}`)}</Text>
        <View style={s.energyChip}>
          <Ionicons name="flash" size={18} color="#fff" />
          <Text style={s.energyText}>{energy}</Text>
        </View>
      </View>

      <View style={s.body}>
        {/* 카드 아이콘 */}
        <Animated.View style={[s.cards, floatStyle]}>
          <View
            style={[
              s.card,
              { transform: [{ rotate: "-8deg" }], marginRight: -30 },
            ]}
          >
            <Ionicons name="flash" size={54} color={tier.color} />
          </View>
          <View style={[s.card, { transform: [{ rotate: "6deg" }] }]}>
            <Ionicons name="flash" size={54} color={tier.color} />
          </View>
        </Animated.View>

        <Text style={s.headline}>
          {t("challenge.headlinePre")}
          <Text style={s.headlineXp}> {maxXp} XP</Text>
          {t("challenge.headlinePost")}
        </Text>

        {/* 레벨 / 획득 박스 */}
        <View style={s.infoBox}>
          <View style={s.infoCol}>
            <Text style={s.infoLabel}>{t("challenge.level")}</Text>
            <Text style={s.infoValue}>1/{CHALLENGE_LEVELS}</Text>
          </View>
          <View style={s.infoDivider} />
          <View style={s.infoCol}>
            <Text style={s.infoLabel}>{t("challenge.earn")}</Text>
            <Text style={s.infoValue}>
              {Math.round(maxXp / CHALLENGE_LEVELS)} XP
            </Text>
          </View>
        </View>
      </View>

      {/* 시작 버튼 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable onPress={start}>
          {({ pressed }) => (
            <View
              style={[
                s.startBtn,
                pressed && { transform: [{ translateY: 3 }] },
              ]}
            >
              <Text style={[s.startText, { color: tier.color }]}>
                {t("challenge.start")}
              </Text>
              <View style={[s.costChip, { backgroundColor: tier.color }]}>
                <Ionicons name="flash" size={16} color="#fff" />
                <Text style={s.costText}>{ENERGY_COST}</Text>
              </View>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "900" },
  energyChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  energyText: { color: "#fff", fontSize: 16, fontWeight: "900" },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  cards: { flexDirection: "row", marginBottom: 50 },
  card: {
    width: 120,
    height: 150,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 38,
  },
  headlineXp: { color: "#FFE082" },
  infoBox: {
    flexDirection: "row",
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    marginTop: 40,
    width: "100%",
  },
  infoCol: { flex: 1, alignItems: "center", paddingVertical: 16 },
  infoDivider: { width: 2.5, backgroundColor: "rgba(255,255,255,0.6)" },
  infoLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontWeight: "700",
  },
  infoValue: { color: "#fff", fontSize: 24, fontWeight: "900", marginTop: 4 },
  footer: { paddingHorizontal: 20 },
  startBtn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  startText: { fontSize: 20, fontWeight: "900" },
  costChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  costText: { color: "#fff", fontSize: 15, fontWeight: "900" },
});
