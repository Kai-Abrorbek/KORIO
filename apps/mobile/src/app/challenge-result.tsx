import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { getTier } from "@/constants/league-tiers";

function useCountUp(target: number, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (target <= 0) return;
    const steps = 40;
    const inc = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) {
        setV(target);
        clearInterval(id);
      } else setV(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(id);
  }, [target]);
  return v;
}

export default function ChallengeResult() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const p = useLocalSearchParams<{
    tier: string;
    xp: string;
    level: string;
    leveledUp: string;
    matched: string;
    combo: string;
    isRecord: string;
    rankUp: string;
    /** 아케이드 종목은 '맞춘 짝' 대신 점수를 보낸다 */
    score: string;
    /** "0" 이면 쿨다운·하루 한도에 걸려 XP 가 안 나갔다 */
    counted: string;
  }>();

  const tier = getTier(p.tier ?? "bronze");
  const xp = Number(p.xp ?? 0);
  // 짝 맞추기는 matched, 나머지 종목은 score 를 보낸다
  const matched = Number(p.matched ?? p.score ?? 0);
  const counted = p.counted !== "0";
  const combo = Number(p.combo ?? 0);
  const leveledUp = p.leveledUp === "1";
  const isRecord = p.isRecord === "1";

  const xpCount = useCountUp(xp, 1000);
  const matchedCount = useCountUp(matched, 800);
  const comboCount = useCountUp(combo, 800);

  const scale = useSharedValue(0.3);
  useEffect(() => {
    scale.value = withSpring(1, { damping: 8 });
  }, []);
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const next = () => {
    if (p.rankUp === "1") {
      router.replace({
        pathname: "/league-rankup",
        params: { tier: p.tier, xp: p.xp },
      });
    } else {
      router.replace("/(tabs)/league");
    }
  };

  return (
    <View style={[s.c, { backgroundColor: tier.color }]}>
      <View style={s.body}>
        <Animated.View style={[s.circle, circleStyle]}>
          <Text style={[s.circleNum, { color: tier.color }]}>{xpCount}</Text>
        </Animated.View>

        <Text style={s.headline}>
          <Text style={s.xpHighlight}>{xp} XP</Text>
          {leveledUp
            ? t("challenge.resultLevelUp", { level: p.level })
            : t("challenge.resultEarned")}
        </Text>

        {/* 쿨다운·하루 한도에 걸려 XP 가 0 인 경우. 왜 0 인지 안 알려주면
            "버그" 로 읽힌다 */}
        {counted ? null : (
          <Text style={s.notCounted}>{t("challenge.notCounted")}</Text>
        )}

        <View style={s.stats}>
          <Animated.View entering={FadeInDown.delay(200)} style={s.statRow}>
            <Text style={s.statLabel}>
              {p.matched != null
                ? t("challenge.matched")
                : t("challenge.scoreLabel")}
            </Text>
            <View style={s.statRight}>
              <Ionicons name="albums" size={22} color="#fff" />
              <Text style={s.statValue}>{matchedCount}</Text>
            </View>
          </Animated.View>

          {p.combo == null ? null : (
          <Animated.View entering={FadeInDown.delay(400)} style={s.statWrap}>
            {isRecord && (
              <View style={s.recordBadge}>
                <Text style={s.recordText}>{t("challenge.newRecord")}</Text>
              </View>
            )}
            <View style={s.statRow}>
              <Text style={s.statLabel}>{t("challenge.maxCombo")}</Text>
              <View style={s.statRight}>
                <Ionicons name="flame" size={22} color="#fff" />
                <Text style={s.statValue}>{comboCount}</Text>
              </View>
            </View>
          </Animated.View>
          )}
        </View>
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable onPress={next}>
          {({ pressed }) => (
            <View
              style={[s.btn, pressed && { transform: [{ translateY: 3 }] }]}
            >
              <Text style={[s.btnText, { color: tier.color }]}>
                {t("challenge.continue")}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1 },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  circle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#FFF8E1",
    alignItems: "center",
    justifyContent: "center",
  },
  circleNum: { fontSize: 76, fontWeight: "900" },
  headline: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 36,
    lineHeight: 36,
  },
  notCounted: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 28,
    marginTop: -6,
    marginBottom: 6,
  },
  xpHighlight: { color: "#FFE082" },
  stats: { width: "100%", marginTop: 40, gap: 14 },
  statWrap: { position: "relative" },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.12)",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  statLabel: { color: "#fff", fontSize: 18, fontWeight: "900" },
  statRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  statValue: { color: "#fff", fontSize: 22, fontWeight: "900" },
  recordBadge: {
    position: "absolute",
    top: -16,
    right: 12,
    backgroundColor: "#FFC107",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 5,
    borderWidth: 2,
    borderColor: "#FFE082",
  },
  recordText: { color: "#B26A00", fontSize: 13, fontWeight: "900" },
  footer: { paddingHorizontal: 20 },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
  },
  btnText: { fontSize: 19, fontWeight: "900" },
});
