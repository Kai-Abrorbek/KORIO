import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  onLogin?: () => void;
  onSignup?: () => void;
}

export default function GuestWarningCard({ onLogin, onSignup }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrap}>
      <View style={styles.warningBox}>
        <View style={styles.titleRow}>
          <Ionicons name="warning" size={20} color={theme.textSecondary} />
          <Text style={styles.title}>{t("settings.guest.title")}</Text>
        </View>
        <Text style={styles.desc}>{t("settings.guest.description")}</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={onLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.loginText}>{t("settings.guest.login")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={onSignup}
          activeOpacity={0.85}
        >
          <Text style={styles.signupText}>{t("settings.guest.signup")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      backgroundColor: theme.surface,
      paddingHorizontal: 20,
      paddingVertical: 18,
      gap: 14,
    },
    warningBox: {
      backgroundColor: theme.bg,
      padding: 14,
      borderRadius: 12,
      gap: 6,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    title: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
    },
    desc: {
      fontSize: 13,
      lineHeight: 20,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    btnRow: {
      flexDirection: "row",
      gap: 10,
    },
    loginBtn: {
      flex: 1,
      backgroundColor: "#776ee2",
      borderBottomWidth: 4,
      borderBottomColor: "#5C56B8",
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    loginText: {
      fontSize: 14,
      fontWeight: "800",
      color: "#fff",
      textAlign: "center",
    },
    signupBtn: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: "#776ee2",
      borderBottomWidth: 4,
      borderBottomColor: "#776ee2",
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
    },
    signupText: {
      fontSize: 14,
      fontWeight: "800",
      color: "#776ee2",
    },
  });
