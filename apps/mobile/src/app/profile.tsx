import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMeta from "@/components/profile/ProfileMeta";
import ProfileStatsRow from "@/components/profile/ProfileStatsRow";
import AddFriendButton from "@/components/profile/AddFriendButton";
import LearningStatusGrid from "@/components/profile/LearningStatusGrid";
import FriendStreakSection from "@/components/profile/FriendStreakSection";
import { t } from "i18next";
import { useAuthStore } from "@/store/auth.store";
import { toUserProfile } from "@/services/user.service";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { UserService } from "@/services/user.service";

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { logout, updateUser } = useAuthStore();
  const user = useAuthStore((st) => st.user);
  const profile = user ? toUserProfile(user) : null;
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      UserService.getMe()
        .then((me) => updateUser(me as any))
        .catch((e) => console.error("getMe 실패:", e));
    }, []),
  );

  if (!profile) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        name={profile.name}
        isSuper={profile.isSuper}
        avatar={user?.avatar}
        onShare={() => {
          router.push("/follow-link");
        }}
        onSettings={() => router.push("/settings")}
      />

      <ProfileMeta username={profile.name} joinedYear={profile.joinedYear} />

      <ProfileStatsRow
        primaryFlag={profile.coursePrimaryFlag}
        extraCount={profile.courseExtraCount}
        following={profile.following}
        followers={profile.followers}
      />

      <AddFriendButton onPress={() => router.push("/add-friends")} />

      <LearningStatusGrid
        streak={profile.streak}
        languageFlag={profile.coursePrimaryFlag}
        languageLevel={profile.languageLevel}
        league={profile.league}
        totalXp={profile.totalXp}
      />

      <FriendStreakSection
        streaks={profile.friendStreaks}
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
