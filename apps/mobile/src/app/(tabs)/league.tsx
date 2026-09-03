import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
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
import FriendAvatar from "@/components/friends/FriendAvatar";
import LeagueRankRow, {
  RANK_ANIM_TOTAL_MS,
} from "@/components/league/LeagueRankRow";

const MEDAL_COLORS = [
  { fill: "#FFC93C", ribbon: "#E5A700", text: "#8A5B00" }, // 1등 금
  { fill: "#C9D3DE", ribbon: "#A8B4C2", text: "#5C6875" }, // 2등 은
  { fill: "#D19A64", ribbon: "#B07C48", text: "#7A4E1E" }, // 3등 동
];

// ── 아바타 ──
function Avatar({
  member,
  size = 44,
}: {
  member: LeagueMember;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      <FriendAvatar
        name={member.nickname}
        avatar={member.isBot ? undefined : member.avatar}
        avatarUri={member.profileImage}
        size={size}
      />

      {member.online && (
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: size * 0.27,
            height: size * 0.27,
            borderRadius: size,
            backgroundColor: "#58CC02",
            borderWidth: 2.5,
            borderColor: "#FFFFFF",
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
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [checkedResult, setCheckedResult] = useState(false);

  useEffect(() => {
    if (checkedResult) return;
    setCheckedResult(true);
    LeagueService.getLeagueResult()
      .then((r) => {
        if (r) router.push("/league-result");
      })
      .catch(() => {});
  }, [checkedResult]);

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


  // ── 순위 상승 애니메이션 ──
  //
  // 리스트는 서버가 **이미 새 순위로 정렬**해서 준다. 그래서 각 행을 "옛 자리"
  // 에서 시작시켜 제자리로 돌아오게 하는 게 맞다.
  //   나        : 옛 순위 자리(아래)에서 새 자리로 올라온다
  //   밀린 사람 : 한 칸 위에서 시작해 한 칸 아래로 내려온다
  //
  // 거리는 rank 차 × 상수로 계산하지 않는다. 승급·강등 구분선이 행 사이에
  // 끼어 있어서 그 계산이 틀어진다. 실제 onLayout 좌표를 쓴다.
  const [animDone, setAnimDone] = useState(false);
  const rowY = useRef(new Map<number, number>());
  const [measuredCount, setMeasuredCount] = useState(0);

  const onRowLayout = useCallback((rank: number, y: number) => {
    if (rowY.current.get(rank) === y) return;
    rowY.current.set(rank, y);
    setMeasuredCount(rowY.current.size);
  }, []);

  /** rank → 시작 오프셋(px). 비어 있으면 애니 없음 */
  const startOffsets = useMemo(() => {
    const out = new Map<number, number>();
    if (!data || animDone) return out;
    const me = data.members.find((m) => m.isMe);
    if (!me) return out;

    const prev = data.previousRank ?? me.rank;
    if (prev <= me.rank) return out; // 안 올랐으면 애니 없음

    const yOf = (rank: number) => rowY.current.get(rank);
    const myOldY = yOf(prev);
    const myNewY = yOf(me.rank);
    // 옛 자리가 화면 목록 밖(리그를 옮겨 왔다 등)이면 애니를 접는다.
    // 억지로 계산하느니 안 하는 게 낫다
    if (myOldY == null || myNewY == null) return out;

    out.set(me.rank, myOldY - myNewY); // 양수: 나는 아래에 있었다

    // 내가 끼어들면서 한 칸씩 밀린 사람들 (새 순위 me.rank+1 … prev)
    for (let rank = me.rank + 1; rank <= prev; rank++) {
      const nowY = yOf(rank);
      const beforeY = yOf(rank - 1); // 이 사람의 옛 자리 = 한 칸 위 슬롯
      if (nowY == null || beforeY == null) continue;
      out.set(rank, beforeY - nowY); // 음수: 위에 있었다
    }
    return out;
    // measuredCount 가 바뀔 때마다 다시 계산한다 (rowY 는 ref 라 의존성에 못 넣는다)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, animDone, measuredCount]);

  const animReady = startOffsets.size > 0;

  useEffect(() => {
    if (!animReady || !data) return;
    const me = data.members.find((m) => m.isMe);
    if (!me) return;
    // 애니가 끝나면 순위를 확정 저장한다 (다음에 또 재생되지 않게)
    const tid = setTimeout(() => {
      LeagueService.ackRank(me.rank).catch(() => {});
      setAnimDone(true);
    }, RANK_ANIM_TOTAL_MS);
    return () => clearTimeout(tid);
  }, [animReady, data]);

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
          {data.members.map((m) => {
            const inPromote = promoteLine > 0 && m.rank <= promoteLine;
            const inDemote = data.demoteCount > 0 && m.rank > demoteLine;
            return (
              <View
                key={m.id}
                onLayout={(e) => onRowLayout(m.rank, e.nativeEvent.layout.y)}
              >
                <LeagueRankRow
                  startOffset={startOffsets.get(m.rank) ?? 0}
                  animate={animReady}
                  lifted={m.isMe}
                  style={[
                    s.row,
                    inPromote && s.rowPromote,
                    inDemote && s.rowDemote,
                    m.isMe && s.rowMe,
                  ]}
                >
                  <RankBadge rank={m.rank} isMe={m.isMe} theme={theme} />
                  <Avatar member={m} size={52} />
                  <View style={s.info}>
                    <Text
                      style={[s.name, m.isMe && s.nameMe]}
                      numberOfLines={1}
                    >
                      {m.nickname}
                    </Text>
                    <View style={s.subRow}>
                      {!!m.flag && <Text style={s.flag}>{m.flag}</Text>}
                      {m.streak != null && (
                        <Text style={s.streak}>{m.streak}</Text>
                      )}
                    </View>
                  </View>
                  <Text style={[s.xp, m.isMe && s.xpMe]}>{m.xp} XP</Text>
                </LeagueRankRow>

                {/* 승급존 경계선 */}
                {promoteLine > 0 && m.rank === promoteLine && (
                  <View style={s.zoneDivider}>
                    <View
                      style={[s.zoneLine, { backgroundColor: "#58CC02" }]}
                    />
                    <View style={[s.zoneChip, { backgroundColor: "#58CC02" }]}>
                      <Ionicons name="chevron-up" size={13} color="#fff" />
                      <Text style={s.zoneText}>{t("league.promoteZone")}</Text>
                    </View>
                    <View
                      style={[s.zoneLine, { backgroundColor: "#58CC02" }]}
                    />
                  </View>
                )}

                {/* 강등존 경계선 */}
                {data.demoteCount > 0 && m.rank === demoteLine && (
                  <View style={s.zoneDivider}>
                    <View
                      style={[s.zoneLine, { backgroundColor: "#FF4B4B" }]}
                    />
                    <View style={[s.zoneChip, { backgroundColor: "#FF4B4B" }]}>
                      <Ionicons name="chevron-down" size={13} color="#fff" />
                      <Text style={s.zoneText}>{t("league.demoteZone")}</Text>
                    </View>
                    <View
                      style={[s.zoneLine, { backgroundColor: "#FF4B4B" }]}
                    />
                  </View>
                )}
              </View>
            );
          })}
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
    container: { flex: 1, backgroundColor: theme.bg, paddingVertical: 30 },
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
      height: 84,
      paddingHorizontal: 16,
      gap: 14,
      backgroundColor: "transparent", // ✅ 보더/배경 없음
    },
    rowPromote: { backgroundColor: "rgba(88,204,2,0.10)" },
    rowDemote: { backgroundColor: "rgba(255,75,75,0.10)" },
    zoneDivider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginVertical: 8,
    },
    zoneLine: { flex: 1, height: 3, borderRadius: 99 },
    zoneChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingVertical: 4,
      paddingHorizontal: 11,
      borderRadius: 99,
    },
    zoneText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 0.3,
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
  });
