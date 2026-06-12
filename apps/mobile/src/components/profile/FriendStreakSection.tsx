import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { FriendStreak } from "@/types/profile";

interface Props {
  streaks: FriendStreak[];
  placeholderCount?: number;
  onAddFriend?: () => void;
}

export default function FriendStreakSection({
  streaks,
  placeholderCount = 5,
  onAddFriend,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const placeholdersNeeded = Math.max(0, placeholderCount - streaks.length);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{t("profile.friendStreak")}</Text>

      <View style={styles.row}>
        {/* 실제 친구 streak (있을 때) */}
        {streaks.map((s) => (
          <View key={s.id} style={styles.avatarFilled}>
            <Text style={styles.avatarInitial}>
              {s.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        ))}

        {/* placeholder + 버튼 */}
        {Array.from({ length: placeholdersNeeded }).map((_, i) => (
          <TouchableOpacity
            key={`ph-${i}`}
            style={styles.placeholder}
            onPress={onAddFriend}
            activeOpacity={0.6}
          >
            <Ionicons name="add" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      paddingHorizontal: 20,
      marginBottom: 40,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.textSecondary,
      marginBottom: 18,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    placeholder: {
      flex: 1,
      aspectRatio: 1,
      maxWidth: 56,
      borderRadius: 28,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarFilled: {
      flex: 1,
      aspectRatio: 1,
      maxWidth: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarInitial: {
      fontSize: 20,
      fontWeight: "800",
      color: "#fff",
    },
  });
