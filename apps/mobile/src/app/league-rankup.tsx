import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  Easing,
  FadeIn,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getTier } from "@/constants/league-tiers";
import TierCrystal from "@/components/league/TierCrystal";
import { LeagueService } from "@/services/league.service";

const ROW_H = 78;

export default function LeagueRankUp() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const p = useLocalSearchParams<{ tier: string }>();
  const tier = getTier(p.tier ?? "bronze");

  const [rows, setRows] = useState<any[]>([]);
  const [oldRank, setOldRank] = useState(0);
  const [newRank, setNewRank] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    LeagueService.getMyLeague()
      .then((d: any) => {
        setRows(d.members ?? []);
        const me = (d.members ?? []).find((m: any) => m.isMe);
        setNewRank(me?.rank ?? 0);
        setOldRank(d.previousRank ?? (me?.rank ?? 0) + 3); // 백엔드가 이전 순위 주면 사용
        setDaysLeft(d.daysLeft ?? 0);
      })
      .catch(() => {});
  }, []);

  // 드래그앤드롭식 이동: 들어올림 → 위로 슬라이드 → 내려놓기
  const lift = useSharedValue(0); // 살짝 뜸(scale/shadow)
  const move = useSharedValue(0); // 위로 이동 거리
  const settle = useSharedValue(1);

  useEffect(() => {
    if (!rows.length || oldRank === newRank) return;
    const dist = (oldRank - newRank) * ROW_H; // 올라간 칸 수 × 행 높이

    // 1) 집어 올리기
    lift.value = withDelay(
      700,
      withTiming(1, { duration: 260, easing: Easing.out(Easing.quad) }),
    );
    // 2) 위로 쭉 드래그
    move.value = withDelay(
      1000,
      withTiming(-dist, { duration: 900, easing: Easing.inOut(Easing.cubic) }),
    );
    // 3) 툭 내려놓기 (바운스)
    settle.value = withDelay(
      1900,
      withSequence(
        withTiming(1.06, { duration: 120 }),
        withSpring(1, { damping: 6, stiffness: 220 }),
      ),
    );
    lift.value = withDelay(1900, withTiming(0, { duration: 220 }));
  }, [rows, oldRank, newRank]);

  const meStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: move.value },
      { scale: settle.value * (1 + lift.value * 0.05) },
    ],
    zIndex: 20,
    shadowOpacity: 0.1 + lift.value * 0.35,
    shadowRadius: 4 + lift.value * 12,
    elevation: 3 + lift.value * 10,
  }));

  // 내가 지나간 자리의 행들은 아래로 한 칸씩 밀림
  const othersStyle = (idx: number) =>
    useAnimatedStyle(() => {
      const meIdx = newRank - 1;
      const oldIdx = oldRank - 1;
      const shifted = idx >= meIdx && idx < oldIdx;
      return {
        transform: [
          {
            translateY: shifted
              ? move.value === 0
                ? 0
                : ROW_H * (move.value / -((oldRank - newRank) * ROW_H))
              : 0,
          },
        ],
      };
    });

  return (
    <View style={[s.c, { paddingTop: insets.top + 20 }]}>
      <View style={s.top}>
        <TierCrystal tier={tier} size={130} />
        <Text style={s.title}>
          {t("challenge.rankUpTitle", {
            tier: t(`league.tiers.${tier.key}`),
            rank: newRank,
          })}
        </Text>
        <View style={s.daysRow}>
          <Ionicons name="time" size={20} color="#FF9800" />
          <Text style={s.days}>
            {t("league.daysLeft", { count: daysLeft })}
          </Text>
        </View>
      </View>

      {/* 순위 리스트 */}
      <View style={s.list}>
        {rows
          .slice(Math.max(0, newRank - 3), newRank + 3)
          .map((m: any, i: number) => {
            const realIdx = Math.max(0, newRank - 3) + i;
            const isMe = m.isMe;
            return (
              <Animated.View
                key={m.id ?? i}
                style={[
                  s.row,
                  isMe && [s.rowMe, meStyle],
                  !isMe && othersStyle(realIdx),
                ]}
              >
                <Text style={[s.rank, isMe && { color: "#58CC02" }]}>
                  {m.rank}
                </Text>
                <View style={s.avatar}>
                  <Text style={s.avatarText}>{(m.nickname ?? "?")[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[s.name, isMe && { color: "#3C7A00" }]}
                    numberOfLines={1}
                  >
                    {m.nickname}
                  </Text>
                  <View style={s.sub}>
                    <Text style={s.flag}>{m.flag ?? "🇰🇷"}</Text>
                    <Text style={s.streak}>{m.streak ?? 0}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    s.xp,
                    isMe && { color: "#58CC02", fontWeight: "900" },
                  ]}
                >
                  {m.xp} XP
                </Text>
              </Animated.View>
            );
          })}
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable onPress={() => router.replace("/(tabs)/league")}>
          {({ pressed }) => (
            <View
              style={[
                s.btn,
                { backgroundColor: "#1CB0F6" },
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
  top: { alignItems: "center", paddingHorizontal: 24 },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#3C3C4C",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 34,
  },
  daysRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  days: { fontSize: 18, fontWeight: "800", color: "#FF9800" },
  list: {
    flex: 1,
    marginTop: 28,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    paddingVertical: 6,
    overflow: "hidden",
  },
  row: {
    height: ROW_H,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 12,
    backgroundColor: "#fff",
  },
  rowMe: {
    backgroundColor: "#E7F9DC",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
  },
  rank: { width: 24, fontSize: 17, fontWeight: "800", color: "#8A94A3" },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DDE3EA",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 20, fontWeight: "900", color: "#fff" },
  name: { fontSize: 17, fontWeight: "800", color: "#3C3C4C" },
  sub: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  flag: { fontSize: 14 },
  streak: { fontSize: 14, fontWeight: "700", color: "#8A94A3" },
  xp: { fontSize: 16, fontWeight: "700", color: "#8A94A3" },
  footer: { paddingHorizontal: 20, paddingTop: 12 },
  btn: { borderRadius: 18, paddingVertical: 20, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 19, fontWeight: "900" },
});
