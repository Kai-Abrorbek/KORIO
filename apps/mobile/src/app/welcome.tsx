import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import BoriMascot from "../components/BoriMascot";
import { ThemeColors } from "../constants/theme";
import { useTheme } from "@/hooks/useTheme";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.mascotContainer}>
        <BoriMascot size={220} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Learn Korean,{"\n"}gently.</Text>
        <Text style={styles.subtitle}>
          Five minutes a day. Real conversations.{"\n"}
          Built for Uzbek and international learners.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.primaryButtonText}>{t("common.start")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.secondaryButtonText}>
            {t("splash.hasAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 60,
      paddingHorizontal: 24,
    },
    mascotContainer: {
      flex: 1,
      justifyContent: "center",
    },
    textContainer: {
      alignItems: "center",
      gap: 12,
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
    },
    buttonContainer: {
      width: "100%",
      gap: 12,
    },
    primaryButton: {
      backgroundColor: theme.primary,
      borderRadius: 999,
      padding: 18,
      alignItems: "center",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 24,
      elevation: 8,
    },
    primaryButtonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
    },
    secondaryButton: {
      alignItems: "center",
      padding: 12,
    },
    secondaryButtonText: {
      color: theme.primary,
      fontSize: 15,
      fontWeight: "600",
    },
  });
