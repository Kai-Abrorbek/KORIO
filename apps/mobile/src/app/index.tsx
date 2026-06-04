import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/auth.store";
import KorioLogo from "../components/KorioLogo";

export default function SplashScreen() {
  const { isLoggedIn } = useAuthStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <KorioLogo dark={false} iconSize={80} />
        <Text style={styles.subtitle}>{t("splash.subtitle")}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/onboarding/survey")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F77DD",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 80,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#7F77DD",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    alignItems: "center",
    padding: 12,
  },
  secondaryButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
});
