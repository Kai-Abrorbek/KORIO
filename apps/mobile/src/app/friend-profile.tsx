import { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserService, type VersusWeek } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import FriendProfileHeader from "@/components/friend-profile/FriendProfileHeader";
import ProfileMeta from "@/components/profile/ProfileMeta";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import FollowButton from "@/components/friend-profile/FollowButton";
import WeeklyVersus from "@/components/friend-profile/WeeklyVersus";
import LearningStatusGrid from "@/components/profile/LearningStatusGrid";
import ReportBlockSection from "@/components/friend-profile/ReportBlockSection";
import FollowedBySection from "@/components/friend-profile/FollowedBySection";
import QuestBadgesRow from "@/features/retention/components/QuestBadgesRow";

const langToFlag = (lang?: string) =>
  ({ ko: "🇰🇷", en: "🇺🇸", uz: "🇺🇿", ru: "🇷🇷" })[lang ?? ""] ?? "🇰🇷";

export default function FriendProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowedBy, setIsFollowedBy] = useState(false);
  const me = useAuthStore((st) => st.user);
  // 이번 주 대결 — 못 불러와도 프로필은 보여 준다 (그 칸만 숨긴다)
  const [versus, setVersus] = useState<VersusWeek | null>(null);

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
        UserService.getVersusWeek(id).catch(() => null),
      ])
        .then(([u, week]) => {
          setUser(u);
          setIsFollowing(!!u.isFollowing);
          setIsFollowedBy(!!u.isFollowedBy);
          setVersus(week?.days?.length === 7 ? week : null);
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
        avatar={user.avatar}
        isSuper={user.isSuper}
        superTier={user.superTier}
        isOnline={user.isOnline}
        onBack={goBack}
        onShare={() => console.log("share")}
      />

      <ProfileMeta username={user.username} joinedYear={user.joinedYear} />

      <ProfileStatsRow
        primaryFlag={user.coursePrimaryFlag ?? langToFlag(user.targetLanguage)}
        extraCount={user.courseExtraCount ?? 0}
        following={user.followingCount ?? 0}
        followers={user.followersCount ?? 0}
        userId={id}
      />
      <FollowedBySection
        users={user.followedBy ?? []}
        count={user.followedByCount ?? 0}
        theme={theme}
      />
      <FollowButton
        isFollowing={isFollowing}
        isFollowedBy={isFollowedBy}
        onPress={toggleFollow}
      />

      <QuestBadgesRow badges={user.questBadges} />

      {versus && (
        <WeeklyVersus
          data={versus}
          name={user.nickname}
          themAvatar={user.avatar}
          themImage={user.profileImage}
          meName={me?.nickname ?? ""}
          meAvatar={me?.avatar}
          meImage={me?.profileImage}
        />
      )}

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
