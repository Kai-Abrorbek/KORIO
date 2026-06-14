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
import { authService } from "@/services/auth.service";
import KorioLogo from "@/components/KorioLogo";
import KakaoIcon from "../../../assets/icons/kakaotalk.svg";
import NaverIcon from "../../../assets/icons/naver.svg";
import TelegramIcon from "../../../assets/icons/telegram.svg";

export default function LoginScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    try {
      const res = (await authService.login({ email, password })) as any;
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

        <Text style={styles.title}>{t("auth.login")}</Text>

        <View style={styles.form}>
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
              (!email || !password || loading) && styles.primaryButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!email || !password || loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? t("common.loading") : t("auth.login")}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>또는</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={22} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <KakaoIcon width={22} height={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <NaverIcon width={22} height={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <TelegramIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.registerLinkText}>
            {t("auth.noAccount")}{" "}
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              {t("auth.register")}
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
    divider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border,
    },
    dividerText: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    socialButtons: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 16,
    },
    socialButton: {
      width: 52,
      height: 52,
      borderRadius: 999,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    registerLink: {
      alignItems: "center",
      marginTop: 32,
    },
    registerLinkText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
  });
