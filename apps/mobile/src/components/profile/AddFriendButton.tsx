import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  onPress?: () => void;
}

export default function AddFriendButton({ onPress }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name="person-add" size={20} color={theme.textSecondary} />
      <Text style={styles.text}>{t("profile.addFriend")}</Text>
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
