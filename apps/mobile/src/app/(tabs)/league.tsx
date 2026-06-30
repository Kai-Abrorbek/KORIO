import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { LeagueService } from "@/services/league.service";

const TIER_META: Record<
  string,
  { color: string; colorDark: string; emoji: string }
> = {
  bronze: { color: "#CD7F32", colorDark: "#A05A1E", emoji: "🥉" },
  silver: { color: "#B8C2CC", colorDark: "#8A97A3", emoji: "🥈" },
  gold: { color: "#FFD93D", colorDark: "#E0AC00", emoji: "🥇" },
  platinum: { color: "#5AC8E8", colorDark: "#2E9DC4", emoji: "💠" },
  diamond: { color: "#7B6BF0", colorDark: "#5B4DD4", emoji: "💎" },
};

const MEDAL = ["#FFD93D", "#C0C8D0", "#CD7F32"]; // 1,2,3등

export default function LeagueScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      LeagueService.getMyLeague()
        .then(setData)
        .catch((e) => console.error("리그 로드 실패:", e))
        .finally(() => setLoading(false));
    }, []),
  );

  // 카운트다운 1초 갱신
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (loading || !data) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const meta = TIER_META[data.tier] ?? TIER_META.bronze;
  const me = data.members.find((m: any) => m.isMe);
  const promoteLine = data.promoteCount; // 상위 N
  const demoteLine = data.members.length - data.demoteCount; // 이 이후 강등

  // 카운트다운
  const diff = Math.max(0, new Date(data.endsAt).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const countdown =
    days > 0 ? `${days}일 ${hours}시간` : `${hours}시간 ${mins}분`;

  // 승급까지 필요한 XP (내가 승급권 밖이면)
  let promoteMsg: string | null = null;
  if (me && data.promoteCount > 0 && me.rank > data.promoteCount) {
    const target = data.members[data.promoteCount - 1];
    const need = (target?.xp ?? 0) - me.xp + 1;
    if (need > 0) promoteMsg = t("league.needXp", { xp: need });
  } else if (me && me.rank <= data.promoteCount) {
    promoteMsg = t("league.inPromotion");
  }

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 티어 히어로 */}
      <LinearGradient colors={[meta.color, meta.colorDark]} style={s.hero}>
        <TierBadge emoji={meta.emoji} />
        <Text style={s.tierName}>{t(`league.tiers.${data.tier}`)}</Text>
        <Text style={s.tierSub}>{t("league.weeklyRanking")}</Text>

        {/* 카운트다운 */}
        <View style={s.countdown}>
          <Ionicons name="time" size={16} color="#fff" />
          <Text style={s.countdownText}>
            {t("league.endsIn", { time: countdown })}
          </Text>
        </View>
      </LinearGradient>

      {/* 동기부여 배너 */}
      {promoteMsg && (
        <View
          style={[
            s.banner,
            me && me.rank <= data.promoteCount ? s.bannerGreen : s.bannerBlue,
          ]}
        >
          <Ionicons
            name={me && me.rank <= data.promoteCount ? "trending-up" : "flame"}
            size={20}
            color="#fff"
          />
          <Text style={s.bannerText}>{promoteMsg}</Text>
        </View>
      )}

      {/* 승급권 라벨 */}
      {data.promoteCount > 0 && (
        <View style={s.zoneLabel}>
          <View style={[s.zoneDot, { backgroundColor: "#58CC02" }]} />
          <Text style={s.zoneText}>
            {t("league.promotionZone", { count: data.promoteCount })}
          </Text>
        </View>
      )}

      {/* 순위 리스트 */}
      <View style={s.list}>
        {data.members.map((m: any, i: number) => {
          const inPromote = i < promoteLine;
          const inDemote = data.demoteCount > 0 && i >= demoteLine;
          const showDemoteLine = data.demoteCount > 0 && i === demoteLine;
          return (
            <View key={m.id}>
              {/* 강등권 구분선 */}
              {showDemoteLine && (
                <View style={s.zoneLabel}>
                  <View style={[s.zoneDot, { backgroundColor: "#FF4B4B" }]} />
                  <Text style={s.zoneText}>
                    {t("league.demotionZone", { count: data.demoteCount })}
                  </Text>
                </View>
              )}
              <RankRow
                rank={m.rank}
                nickname={m.nickname}
                xp={m.xp}
                profileImage={m.profileImage}
                isMe={m.isMe}
                inPromote={inPromote}
                inDemote={inDemote}
                theme={theme}
                t={t}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

// 티어 뱃지 (둥실 + 빛)
function TierBadge({ emoji }: { emoji: string }) {
  const float = useSharedValue(0);
  const glow = useSharedValue(0.4);
  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    glow.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 }),
      ),
      -1,
      true,
    );
  }, []);
  const bStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));
  const gStyle = useAnimatedStyle(() => ({ opacity: glow.value }));
  return (
    <View style={badge.wrap}>
      <Animated.View style={[badge.glow, gStyle]} />
      <Animated.Text style={[badge.emoji, bStyle]}>{emoji}</Animated.Text>
    </View>
  );
}

// 순위 행
function RankRow({
  rank,
  nickname,
  xp,
  profileImage,
  isMe,
  inPromote,
  inDemote,
  theme,
  t,
}: any) {
  const s = styles(theme);
  const pulse = useSharedValue(1);
  useEffect(() => {
    if (isMe) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 900 }),
          withTiming(1, { duration: 900 }),
        ),
        -1,
        true,
      );
    }
  }, [isMe]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isMe ? pulse.value : 1 }],
  }));

  const medalColor = rank <= 3 ? MEDAL[rank - 1] : null;

  return (
    <Animated.View style={[s.row, isMe && s.rowMe, pulseStyle]}>
      {/* 순위 */}
      <View style={[s.rankBox, medalColor && { backgroundColor: medalColor }]}>
        {rank <= 3 ? (
          <Ionicons name="trophy" size={18} color="#fff" />
        ) : (
          <Text
            style={[
              s.rankNum,
              inPromote && { color: "#58CC02" },
              inDemote && { color: "#FF4B4B" },
            ]}
          >
            {rank}
          </Text>
        )}
      </View>

      {/* 아바타 */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={s.avatar} />
      ) : (
        <View style={[s.avatar, s.avatarFallback]}>
          <Text style={s.avatarInitial}>{nickname?.[0] ?? "?"}</Text>
        </View>
      )}

      {/* 이름 */}
      <Text
        style={[s.name, isMe && { color: theme.primary, fontWeight: "900" }]}
        numberOfLines={1}
      >
        {nickname} {isMe && t("league.you")}
      </Text>

      {/* XP */}
      <Text style={s.xp}>{xp} XP</Text>
    </Animated.View>
  );
}

const badge = StyleSheet.create({
  wrap: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  glow: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  emoji: { fontSize: 64 },
});

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },

    hero: {
      paddingTop: 70,
      paddingBottom: 28,
      alignItems: "center",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },
    tierName: {
      fontSize: 30,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 0.5,
    },
    tierSub: {
      fontSize: 14,
      color: "rgba(255,255,255,0.85)",
      marginTop: 4,
      fontWeight: "600",
    },
    countdown: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 16,
      backgroundColor: "rgba(0,0,0,0.18)",
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
    },
    countdownText: { color: "#fff", fontSize: 14, fontWeight: "800" },

    banner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginHorizontal: 20,
      marginTop: 18,
      padding: 14,
      borderRadius: 16,
    },
    bannerGreen: { backgroundColor: "#58CC02" },
    bannerBlue: { backgroundColor: "#1CB0F6" },
    bannerText: { color: "#fff", fontSize: 15, fontWeight: "800", flex: 1 },

    zoneLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 24,
      marginTop: 18,
      marginBottom: 6,
    },
    zoneDot: { width: 8, height: 8, borderRadius: 4 },
    zoneText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    list: { paddingHorizontal: 16, paddingTop: 8 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginBottom: 4,
    },
    rowMe: {
      backgroundColor: theme.primary + "12",
      borderWidth: 2,
      borderColor: theme.primary + "44",
    },
    rankBox: {
      width: 34,
      height: 34,
      borderRadius: 12,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    rankNum: { fontSize: 16, fontWeight: "900", color: theme.textSecondary },
    avatar: { width: 44, height: 44, borderRadius: 22 },
    avatarFallback: {
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarInitial: { color: "#fff", fontSize: 18, fontWeight: "900" },
    name: { flex: 1, fontSize: 16, fontWeight: "700", color: theme.text },
    xp: { fontSize: 15, fontWeight: "900", color: theme.text },
  });
