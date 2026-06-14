import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  onAuthCode?: () => void;
  onFriends?: () => void;
}

export default function SettingsQuickActions({ onAuthCode, onFriends }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.btn}
        onPress={onAuthCode}
        activeOpacity={0.7}
      >
        <Ionicons name="key" size={22} color="#45B7D1" />
        <Text style={styles.text}>{t("settings.quickActions.authCode")}</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.btn}
        onPress={onFriends}
        activeOpacity={0.7}
      >
        <Ionicons name="people" size={22} color="#45B7D1" />
        <Text style={styles.text}>{t("settings.quickActions.friends")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    btn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 6,
    },
    divider: {
      width: 1,
      backgroundColor: theme.border,
      marginVertical: 4,
    },
    text: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
    },
  });
