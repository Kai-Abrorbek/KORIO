import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  isFollowing: boolean;
  onPress?: () => void;
}

export default function FollowButton({ isFollowing, onPress }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.btn, isFollowing ? styles.btnFollowing : styles.btnFollow]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons
        name={isFollowing ? "person-add" : "person-add-outline"}
        size={20}
        color={isFollowing ? "#58CC02" : "#fff"}
      />
      <Text
        style={[
          styles.text,
          isFollowing ? styles.textFollowing : styles.textFollow,
        ]}
      >
        {isFollowing ? t("friendProfile.following") : t("friendProfile.follow")}
      </Text>
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
    text: {
      fontSize: 15,
      fontWeight: "800",
    },
    textFollowing: {
      color: "#58CC02",
    },
    textFollow: {
      color: "#fff",
    },
  });
