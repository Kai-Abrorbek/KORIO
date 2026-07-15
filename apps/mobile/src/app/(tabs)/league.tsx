import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  LeagueService,
  LeagueData,
  LeagueMember,
} from "@/services/league.service";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { TIERS, getTier, getTierIndex } from "@/constants/league-tiers";
import TierCrystal from "@/components/league/TierCrystal";
import { withDelay, withSpring, Easing } from "react-native-reanimated";

const MEDAL_COLORS = [
  { fill: "#FFC93C", ribbon: "#E5A700", text: "#8A5B00" }, // 1등 금
  { fill: "#C9D3DE", ribbon: "#A8B4C2", text: "#5C6875" }, // 2등 은
  { fill: "#D19A64", ribbon: "#B07C48", text: "#7A4E1E" }, // 3등 동
];
// 티어 메타 (그라데이션용 light/color/dark)
const TIER_META: Record<
  string,
  { light: string; color: string; dark: string }
> = {
  bronze: { light: "#E8A867", color: "#CD7F32", dark: "#A05A1E" },
  silver: { light: "#DDE3E9", color: "#B8C2CC", dark: "#8A97A3" },
  gold: { light: "#FFE896", color: "#FFD93D", dark: "#E0AC00" },
  platinum: { light: "#A6E6F5", color: "#5AC8E8", dark: "#2E9DC4" },
  diamond: { light: "#B9AFFF", color: "#7B6BF0", dark: "#5B4DD4" },
};
const TIER_ORDER = ["bronze", "silver", "gold", "platinum", "diamond"];
const MEDAL = ["#FFC93C", "#C3CCD6", "#D68A4E"]; // 1,2,3등
const AVATAR_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#6C7BFF",
  "#FF8FB1",
  "#5AC8E8",
  "#9B8CFF",
  "#FF9F5A",
];

function avatarColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

// ── 아바타 ──
function Avatar({
  member,
  size = 44,
}: {
  member: LeagueMember;
  size?: number;
}) {
  return (
    <View style={{ width: size, height: size }}>
      {member.profileImage ? (
        <Image
          source={{ uri: member.profileImage }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: avatarColor(member.id),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: size * 0.42, fontWeight: "800" }}
          >
            {member.nickname.trim().charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      {member.online && (
        <View
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: size * 0.26,
            height: size * 0.26,
            borderRadius: size * 0.13,
            backgroundColor: "#58CC02",
            borderWidth: 3,
            borderColor: "#fff",
          }}
        />
      )}
    </View>
  );
}

// ── 순위 뱃지 ──
function RankBadge({
  rank,
  isMe,
  theme,
}: {
  rank: number;
  isMe?: boolean;
  theme: ThemeColors;
}) {
  if (rank <= 3) {
    const c = MEDAL_COLORS[rank - 1];
    return (
      <View style={rb.wrap}>
        {/* 리본 꼬리 */}
        <View style={[rb.tail, { borderTopColor: c.ribbon }]} />
        {/* 원형 메달 */}
        <View style={[rb.circle, { backgroundColor: c.fill }]}>
          <Text style={[rb.num, { color: c.text }]}>{rank}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={rb.wrap}>
      <Text
        style={[rb.plain, { color: isMe ? "#58A700" : theme.textSecondary }]}
      >
        {rank}
      </Text>
    </View>
  );
}

export default function LeagueScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const [data, setData] = useState<LeagueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // ✅ pulse 는 여기 한 번만
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 900 }),
        withTiming(1, { duration: 900 }),
      ),
      -1,
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const ROW_H = 84; // 리스트 행 높이 (실제 스타일과 맞춰야 함)

  // 순위 상승 애니메이션
  const lift = useSharedValue(0);
  const move = useSharedValue(0);
  const settle = useSharedValue(1);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (!data || animDone) return;
    const me = data.members.find((m) => m.isMe);
    if (!me) return;

    const prev = data.previousRank ?? me.rank;
    if (prev <= me.rank) {
      setAnimDone(true);
      return; // 안 올랐으면 애니 없음
    }

    const dist = (prev - me.rank) * ROW_H;

    // 들어올림 → 위로 쭉 → 툭 내려놓기
    lift.value = withDelay(500, withTiming(1, { duration: 240 }));
    move.value = withDelay(
      760,
      withTiming(-dist, { duration: 850, easing: Easing.inOut(Easing.cubic) }),
    );
    lift.value = withDelay(1610, withTiming(0, { duration: 200 }));
    settle.value = withDelay(
      1610,
      withSequence(
        withTiming(1.05, { duration: 110 }),
        withSpring(1, { damping: 6, stiffness: 220 }),
      ),
    );

    // 애니 끝나면 순위 저장 (다시 안 나오게)
    const tid = setTimeout(() => {
      LeagueService.ackRank(me.rank).catch(() => {});
      setAnimDone(true);
    }, 2000);

    return () => clearTimeout(tid);
  }, [data, animDone]);

  const meRowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: move.value },
      { scale: settle.value * (1 + lift.value * 0.04) },
    ],
    zIndex: lift.value > 0 ? 20 : 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: lift.value * 0.3, // 평소 0 → 안 보임
    shadowRadius: lift.value * 12,
    elevation: lift.value * 12,
  }));

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      LeagueService.getMyLeague()
        .then(setData)
        .catch((e) => console.error("리그 로드 실패:", e))
        .finally(() => setLoading(false));
    }, []),
  );

  // 카운트다운 갱신
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  if (loading || !data) {
    return (
      <View
        style={[
          s.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const tierMeta = getTier(data.tier);
  const myTierIdx = getTierIndex(data.tier);
  const CHALLENGE_XP = data.boostXp ?? 210;

  // 카운트다운 라벨
  const remaining = new Date(data.endsAt).getTime() - now;
  const days = Math.ceil(remaining / 86400000);
  const hours = Math.floor(remaining / 3600000);
  const timeLabel =
    days > 1
      ? t("league.daysLeft", { count: days })
      : `${Math.max(0, hours)}:${String(Math.max(0, Math.floor((remaining % 3600000) / 60000))).padStart(2, "0")}`;

  const promoteLine = data.promoteCount;
  const demoteLine = data.members.length - data.demoteCount;

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <Text style={s.title}>{t(`league.tiers.${data.tier}`)}</Text>
        <View style={s.timeRow}>
          <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
          <Text style={s.timeText}>{timeLabel}</Text>
        </View>
      </View>
      {/* 티어 10개 가로 스크롤 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 10,
          alignItems: "center",
        }}
        style={{ marginBottom: 20 }}
      >
        {TIERS.map((tr, i) => (
          <TierCrystal
            key={tr.key}
            tier={tr}
            locked={i > myTierIdx}
            size={i === myTierIdx ? 120 : 92}
            active={i === myTierIdx}
          />
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 리더보드 */}
        <View style={s.board}>
          {data.members.map((m) => (
            <Animated.View
              key={m.id}
              style={[s.row, m.isMe && s.rowMe, m.isMe && meRowStyle]}
            >
              <RankBadge rank={m.rank} isMe={m.isMe} theme={theme} />
              <Avatar member={m} size={52} />
              <View style={s.info}>
                <Text style={[s.name, m.isMe && s.nameMe]} numberOfLines={1}>
                  {m.nickname}
                </Text>
                <View style={s.subRow}>
                  {!!m.flag && <Text style={s.flag}>{m.flag}</Text>}
                  {m.streak != null && <Text style={s.streak}>{m.streak}</Text>}
                </View>
              </View>
              <Text style={[s.xp, m.isMe && s.xpMe]}>{m.xp} XP</Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <Animated.View
        style={[fab.wrap, { bottom: insets.bottom + 120 }, pulseStyle]}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/xp-challenge",
              params: { tier: data.tier, xp: String(CHALLENGE_XP) },
            })
          }
        >
          {({ pressed }) => (
            <View
              style={[
                { alignItems: "center" },
                pressed && { transform: [{ scale: 0.95 }] },
              ]}
            >
              <LinearGradient
                colors={[tierMeta.colorLight, tierMeta.color]}
                style={[fab.circle, { shadowColor: tierMeta.colorDark }]}
              >
                <Ionicons name="flash" size={30} color="#fff" />
              </LinearGradient>
              <View style={[fab.badge, { backgroundColor: tierMeta.color }]}>
                <Text style={fab.badgeText}>+{CHALLENGE_XP} XP</Text>
              </View>
            </View>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}

const fab = StyleSheet.create({
  wrap: { position: "absolute", right: 20, alignItems: "center" },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  badge: {
    marginTop: -12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: "#fff",
  },
  badgeText: { color: "#fff", fontSize: 13, fontWeight: "900" },
});

const rb = StyleSheet.create({
  wrap: { width: 34, alignItems: "center", justifyContent: "center" },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  tail: {
    position: "absolute",
    bottom: -2,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  num: { fontSize: 13, fontWeight: "900" },
  plain: { fontSize: 17, fontWeight: "800" },
});

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: { paddingHorizontal: 20, marginBottom: 8, marginTop: 20 },
    title: { fontSize: 30, fontWeight: "900", color: theme.text },
    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 4,
    },
    timeText: { fontSize: 15, fontWeight: "600", color: theme.textSecondary },
    tierRow: {
      paddingHorizontal: 16,
      alignItems: "center",
      gap: 4,
      paddingVertical: 14,
      minHeight: 130,
    },
    boostWrap: {
      position: "absolute",
      right: 18,
      shadowColor: "#6A5EE0",
      shadowOpacity: 0.5,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 10,
    },
    boostBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: 30,
    },
    boostIcons: { alignItems: "center" },
    boostText: { color: "#fff", fontSize: 17, fontWeight: "900" },
    board: { paddingHorizontal: 4, marginTop: 8 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      height: 84, // ROW_H 와 일치시킬 것
      paddingHorizontal: 16,
      gap: 14,
      backgroundColor: "transparent", // ✅ 보더/배경 없음
    },
    rowMe: {
      borderRadius: 10,
      backgroundColor: "#D7F5B1", // ✅ 사진의 연초록 (풀블리드)
    },
    info: { flex: 1 },
    name: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
    },
    nameMe: { color: "#3D3D3D", fontWeight: "800" }, // 사진처럼 이름은 진회색 유지
    subRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 3,
    },
    flag: { fontSize: 17 },
    streak: { fontSize: 16, fontWeight: "700", color: "#AFAFAF" },

    xp: { fontSize: 19, fontWeight: "700", color: "#AFAFAF" },
    xpMe: { color: "#58A700", fontWeight: "800" }, // ✅ 내 XP만 초록

    // 승급/강등 라인 (사진엔 없지만 필요하면 얇게)
    zoneWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      marginVertical: 10,
    },
    zoneLine: { flex: 1, height: 2, borderRadius: 1 },
    zoneText: { fontSize: 12, fontWeight: "800" },
  });
