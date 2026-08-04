import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  isFollowing: boolean;
  isFollowedBy?: boolean;
  onPress?: () => void;
}

export default function FollowButton({
  isFollowing,
  isFollowedBy,
  onPress,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  // 3-state: 내가 팔로우중 / 내가 안했는데 상대가 나 팔로우(맞팔) / 아무 관계 없음
  const mode = isFollowing
    ? "following"
    : isFollowedBy
      ? "followBack"
      : "follow";

  const config = {
    following: {
      icon: "person-add" as const,
      iconColor: "#58CC02",
      btnStyle: styles.btnFollowing,
      textStyle: styles.textFollowing,
      label: t("friendProfile.following"),
    },
    followBack: {
      icon: "person-add" as const,
      iconColor: "#fff",
      btnStyle: styles.btnFollowBack,
      textStyle: styles.textOnColor,
      label: t("friendProfile.followBack"),
    },
    follow: {
      icon: "person-add-outline" as const,
      iconColor: "#fff",
      btnStyle: styles.btnFollow,
      textStyle: styles.textOnColor,
      label: t("friendProfile.follow"),
    },
  }[mode];

  return (
    <TouchableOpacity
      style={[styles.btn, config.btnStyle]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons name={config.icon} size={20} color={config.iconColor} />
      <Text style={[styles.text, config.textStyle]}>{config.label}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderRadius: 999,
      paddingVertical: 14,
      marginHorizontal: 20,
      marginBottom: 28,
    },
    btnFollowing: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
    },
    btnFollow: {
      backgroundColor: "#58CC02",
      borderBottomWidth: 4,
      borderBottomColor: "#58A700",
    },
    btnFollowBack: {
      backgroundColor: "#45B7D1",
      borderBottomWidth: 4,
      borderBottomColor: "#3499B1",
    },
    text: {
      fontSize: 15,
      fontWeight: "800",
    },
    textFollowing: {
      color: "#58CC02",
    },
    textOnColor: {
      color: "#fff",
    },
  });
