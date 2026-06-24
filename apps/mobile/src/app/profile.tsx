import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_PROFILE } from "@/mocks/profile.mock";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMeta from "@/components/profile/ProfileMeta";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import AddFriendButton from "@/components/profile/AddFriendButton";
import LearningStatusGrid from "@/components/profile/LearningStatusGrid";
import FriendStreakSection from "@/components/profile/FriendStreakSection";
import { t } from "i18next";
import { useAuthStore } from "@/store/auth.store";

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { logout, user } = useAuthStore();
  const user_mock = MOCK_PROFILE; //TODO 나중에 실제 유저랑 교체

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        name={user?.nickname ?? ""}
        isSuper={user_mock.isSuper}
        onShare={() => console.log("share")}
        onSettings={() => console.log("settings")}
      />

      <ProfileMeta
        username={user_mock.username}
        joinedYear={user_mock.joinedYear}
      />

      <ProfileStatsRow
        primaryFlag={user_mock.coursePrimaryFlag}
        extraCount={user_mock.courseExtraCount}
        following={user_mock.following}
        followers={user_mock.followers}
      />

      <AddFriendButton onPress={() => console.log("add friend")} />

      <LearningStatusGrid
        streak={user_mock.streak}
        languageFlag={user_mock.coursePrimaryFlag}
        languageLevel={user_mock.languageLevel}
        league={user_mock.league}
        totalXp={user_mock.totalXp}
      />

      <FriendStreakSection
        streaks={user_mock.friendStreaks}
        onAddFriend={() => console.log("add friend streak")}
      />

      <TouchableOpacity style={styles.logout} onPress={() => logout()}>
        <Text style={styles.text}>{t("profile.logout")}</Text>
      </TouchableOpacity>
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
    logout: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 14,
      paddingVertical: 14,
      marginHorizontal: 20,
      marginBottom: 28,
    },
    text: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.textSecondary,
    },
  });
