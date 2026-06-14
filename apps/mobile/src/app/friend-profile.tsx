import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_FRIEND_PROFILE } from "@/mocks/friend-profile.mock";
import FriendProfileHeader from "@/components/friend-profile/FriendProfileHeader";
import ProfileMeta from "@/components/profile/ProfileMeta";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import FollowButton from "@/components/friend-profile/FollowButton";
import WeeklyProgressChart from "@/components/friend-profile/WeeklyProgressChart";
import LearningStatusGrid from "@/components/profile/LearningStatusGrid";
import AchievementSection from "@/components/friend-profile/AchievementSection";
import ReportBlockSection from "@/components/friend-profile/ReportBlockSection";

export default function FriendProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const user = MOCK_FRIEND_PROFILE;
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <FriendProfileHeader
        name={user.name}
        league={user.league}
        isSuper={user.isSuper}
        onBack={() => router.back()}
        onShare={() => console.log("share")}
      />

      <ProfileMeta username={user.username} joinedYear={user.joinedYear} />

      <ProfileStatsRow
        primaryFlag={user.coursePrimaryFlag}
        extraCount={user.courseExtraCount}
        following={user.following}
        followers={user.followers}
      />

      <FollowButton
        isFollowing={isFollowing}
        onPress={() => setIsFollowing((v) => !v)}
      />

      <WeeklyProgressChart
        points={user.weeklyXp}
        themName={user.themDisplayName}
        themXp={user.themTotalWeekXp}
        meXp={user.meTotalWeekXp}
      />

      <LearningStatusGrid
        streak={user.streak}
        languageFlag={user.coursePrimaryFlag}
        languageLevel={user.languageLevel}
        league={user.league}
        totalXp={user.totalXp}
      />

      <AchievementSection
        achievements={user.achievements}
        onSeeAll={() => console.log("see all achievements")}
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
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    content: {
      paddingBottom: 40,
    },
  });
