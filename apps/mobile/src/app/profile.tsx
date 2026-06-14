import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_PROFILE } from "@/mocks/profile.mock";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMeta from "@/components/profile/ProfileMeta";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import AddFriendButton from "@/components/profile/AddFriendButton";
import LearningStatusGrid from "@/components/profile/LearningStatusGrid";
import FriendStreakSection from "@/components/profile/FriendStreakSection";

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const user = MOCK_PROFILE; //TODO 나중에 실제 유저랑 교체

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        name={user.name}
        isSuper={user.isSuper}
        onShare={() => console.log("share")}
        onSettings={() => console.log("settings")}
      />

      <ProfileMeta username={user.username} joinedYear={user.joinedYear} />

      <ProfileStatsRow
        primaryFlag={user.coursePrimaryFlag}
        extraCount={user.courseExtraCount}
        following={user.following}
        followers={user.followers}
      />

      <AddFriendButton onPress={() => console.log("add friend")} />

      <LearningStatusGrid
        streak={user.streak}
        languageFlag={user.coursePrimaryFlag}
        languageLevel={user.languageLevel}
        league={user.league}
        totalXp={user.totalXp}
      />

      <FriendStreakSection
        streaks={user.friendStreaks}
        onAddFriend={() => console.log("add friend streak")}
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
      paddingBottom: 120,
    },
  });
