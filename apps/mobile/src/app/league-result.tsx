import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  ZoomIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import TierCrystal from "@/components/league/TierCrystal";
import { getTier } from "@/constants/league-tiers";
import { LeagueService, LeagueResult } from "@/services/league.service";

export default function LeagueResultScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [result, setResult] = useState<LeagueResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LeagueService.getLeagueResult()
      .then((r) => {
        setResult(r);
        setLoading(false);
        if (r) {
          Haptics.notificationAsync(
            r.change === "demote"
              ? Haptics.NotificationFeedbackType.Warning
              : Haptics.NotificationFeedbackType.Success,
          );
        } else {
          router.back();
        }
      })
      .catch(() => router.back());
  }, []);

  // 광선 회전/펄스
  const glow = useSharedValue(1);
  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 1100 }),
        withTiming(1, { duration: 1100 }),
      ),
      -1,
    );
  }, []);
  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
  }));

  if (loading || !result)
    return <View style={{ flex: 1, backgroundColor: "#15131F" }} />;

  const meta = getTier(result.toTier);
  const isPromote = result.change === "promote";
  const isDemote = result.change === "demote";

  const title = isPromote
    ? t("league.result.promoteTitle")
    : isDemote
      ? t("league.result.demoteTitle")
      : t("league.result.stayTitle");
  const sub = t(
    isPromote
      ? "league.result.promoteSub"
      : isDemote
        ? "league.result.demoteSub"
        : "league.result.staySub",
    { tier: t(`league.tiers.${result.toTier}`) },
  );

  const finish = async () => {
    try {
      await LeagueService.ackLeagueResult();
    } catch {}
    router.back();
  };

  return (
    <View style={[s.container, { backgroundColor: meta.colorDark }]}>
      <View style={[s.center, { paddingTop: insets.top }]}>
        {/* 뒤 광선 */}
        <Animated.View
          style={[s.glow, { backgroundColor: meta.color }, glowStyle]}
        />
        <Animated.View entering={ZoomIn.springify().damping(11).mass(0.9)}>
          <TierCrystal tier={meta} size={170} />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(250).duration(400)}
          style={s.title}
        >
          {title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(350).duration(400)}
          style={s.sub}
        >
          {sub}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(450).duration(400)}
          style={s.rankChip}
        >
          <Ionicons name="podium" size={16} color="#fff" />
          <Text style={s.rankText}>
            {t("league.result.rank", { rank: result.finalRank })}
          </Text>
        </Animated.View>

        {result.gems > 0 && (
          <Animated.View
            entering={ZoomIn.delay(650).springify().damping(10)}
            style={s.gemChip}
          >
            <Ionicons name="diamond" size={20} color="#15131F" />
            <Text style={s.gemText}>
              {t("league.result.gems", { gems: result.gems })}
            </Text>
          </Animated.View>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          s.btn,
          { marginBottom: insets.bottom + 16 },
          pressed && s.btnPressed,
        ]}
        onPress={finish}
      >
        <Text style={[s.btnT, { color: meta.colorDark }]}>
          {t("league.result.continue")}
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  glow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.28,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    marginTop: 32,
    textAlign: "center",
  },
  sub: {
    fontSize: 17,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    marginTop: 8,
    textAlign: "center",
  },
  rankChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    marginTop: 22,
  },
  rankText: { color: "#fff", fontSize: 15, fontWeight: "800" },
  gemChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#FFD84D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginTop: 16,
  },
  gemText: { color: "#15131F", fontSize: 17, fontWeight: "900" },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "rgba(0,0,0,0.18)",
  },
  btnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  btnT: { fontSize: 17, fontWeight: "900" },
});
