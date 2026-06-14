import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";
import { authService } from "@/services/auth.service";
import KorioLogo from "@/components/home/KorioLogo";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { setUser } = useAuthStore();
  const { sessionId } = useOnboardingStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !nickname) return;
    setLoading(true);
    setError("");
    try {
      const res = (await authService.register({
        email,
        password,
        nickname,
        sessionId,
      })) as any;
      setUser(res.user, res.accessToken);
      router.replace("/(tabs)");
    } catch (err: any) {
      const code = err.message ?? "UNKNOWN_ERROR";
      setError(t(`auth.errors.${code}`) ?? code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <KorioLogo dark={true} iconSize={48} />
        </View>

        <Text style={styles.title}>{t("auth.register")}</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t("auth.nickname")}
              placeholderTextColor={theme.textSecondary}
              value={nickname}
              onChangeText={setNickname}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t("auth.email")}
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t("auth.password")}
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={16} color="#E24B4A" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!email || !password || !nickname || loading) &&
                styles.primaryButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={!email || !password || !nickname || loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? t("common.loading") : t("auth.register")}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.loginLinkText}>
            {t("auth.hasAccount")}{" "}
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              {t("auth.login")}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    scroll: {
      flexGrow: 1,
      padding: 24,
      paddingTop: 60,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 32,
    },
    form: {
      gap: 16,
    },
    inputContainer: {
      backgroundColor: theme.surface,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 52,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    errorText: {
      fontSize: 13,
      color: "#E24B4A",
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
      marginTop: 8,
    },
    primaryButtonDisabled: {
      backgroundColor: theme.border,
      shadowOpacity: 0,
      elevation: 0,
    },
    primaryButtonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
    },
    loginLink: {
      alignItems: "center",
      marginTop: 32,
    },
    loginLinkText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
  });
