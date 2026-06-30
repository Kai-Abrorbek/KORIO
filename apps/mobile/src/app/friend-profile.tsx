import { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { StatsService } from "@/services/stats.service";
import FriendProfileHeader from "@/components/friend-profile/FriendProfileHeader";
import ProfileMeta from "@/components/profile/ProfileMeta";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import FollowButton from "@/components/friend-profile/FollowButton";
import WeeklyProgressChart from "@/components/friend-profile/WeeklyProgressChart";
import LearningStatusGrid from "@/components/profile/LearningStatusGrid";
import ReportBlockSection from "@/components/friend-profile/ReportBlockSection";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const langToFlag = (lang?: string) =>
  ({ ko: "🇰🇷", en: "🇺🇸", uz: "🇺🇿", ru: "🇷🇷" })[lang ?? ""] ?? "🇰🇷";

export default function FriendProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { id } = useLocalSearchParams<{ id: string }>();
  const me = useAuthStore((st) => st.user);
  console.log(id);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [points, setPoints] = useState<
    { label: string; themXp: number; meXp: number }[]
  >([]);
  const [themWeekXp, setThemWeekXp] = useState(0);
  const [meWeekXp, setMeWeekXp] = useState(0);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/profile");
  };

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      setLoading(true);

      Promise.all([
        UserService.getUserById(id),
        UserService.getUserWeekly(id),
        StatsService.getWeekly(), // 내 주간
      ])
        .then(([u, themW, meW]) => {
          setUser(u);
          setIsFollowing(!!u.isFollowing);

          const themDays = themW?.days ?? [];
          const meDays = meW?.days ?? [];

          // 날짜 기준으로 요일 라벨 + XP 매핑 (두 배열 같은 7일 범위)
          const merged = themDays.map((d: any, i: number) => {
            const label = DAY_LABELS[new Date(d.date).getDay()];
            const themXp = d.xpEarned ?? 0;
            const meXp = meDays[i]?.xpEarned ?? 0;
            return { label, themXp, meXp };
          });

          setPoints(merged);
          setThemWeekXp(merged.reduce((s, p) => s + p.themXp, 0));
          setMeWeekXp(merged.reduce((s, p) => s + p.meXp, 0));
        })
        .catch((e) => console.error("친구 프로필 로드 실패:", e))
        .finally(() => setLoading(false));
    }, [id]),
  );

  const toggleFollow = async () => {
    if (!id) return;
    const next = !isFollowing;
    setIsFollowing(next); // 낙관적 업데이트
    try {
      if (next) await UserService.follow(id);
      else await UserService.unfollow(id);
    } catch (e) {
      console.error("팔로우 토글 실패:", e);
      setIsFollowing(!next); // 실패 시 롤백
    }
  };

  if (loading || !user) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <FriendProfileHeader
        name={user.nickname}
        league={user.league}
        isSuper={user.isSuper}
        onBack={goBack}
        onShare={() => console.log("share")}
      />

      <ProfileMeta username={user.username} joinedYear={user.joinedYear} />

      <ProfileStatsRow
        primaryFlag={user.coursePrimaryFlag ?? langToFlag(user.targetLanguage)}
        extraCount={user.courseExtraCount ?? 0}
        following={user.followingCount ?? 0}
        followers={user.followersCount ?? 0}
      />

      <FollowButton isFollowing={isFollowing} onPress={toggleFollow} />

      <WeeklyProgressChart
        points={points}
        themName={user.nickname}
        themXp={themWeekXp}
        meXp={meWeekXp}
      />

      <LearningStatusGrid
        streak={user.streak}
        languageFlag={user.coursePrimaryFlag ?? langToFlag(user.targetLanguage)}
        languageLevel={user.languageLevel ?? 1}
        league={user.league}
        totalXp={user.totalXP}
      />

      <ReportBlockSection
        onReport={() => console.log("report")}
        onBlock={() => console.log("block")}
      />
    </ScrollView>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },
    content: { paddingBottom: 40 },
  });
