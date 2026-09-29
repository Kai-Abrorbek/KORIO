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
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useOnboardingStore } from "@/store/onboarding.store";
import { usePasswordResetStore } from "@/store/password-reset.store";
import { authService } from "@/services/auth.service";
import KorioLogo from "@/components/home/KorioLogo";
import TrialBanner from "@/components/auth/TrialBanner";
import PrimaryButton from "@/components/ui/PrimaryButton";

/** 서버 DTO 의 @MinLength(6) 과 같다 */
const MIN_PASSWORD = 6;
/** 서버와 같은 E.164 규칙. 공백·하이픈은 빼고 본다 */
const toE164 = (raw: string) => raw.replace(/[^\d+]/g, "");
const E164 = /^\+[1-9]\d{7,14}$/;

/**
 * 회원가입 — 1단계 (입력). 계정은 여기서 안 만든다.
 *
 * 코드 메일을 보내고 verify-code 화면으로 간다. 코드가 맞아야 계정이 생긴다
 * (예전엔 바로 만들어서 없는 주소·남의 주소로도 가입이 됐다).
 */
export default function RegisterScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);
  const startFlow = usePasswordResetStore((st) => st.startFlow);
  const { sessionId } = useOnboardingStore();
  const { trial } = useLocalSearchParams<{ trial?: string | string[] }>();
  const fromTrial = (Array.isArray(trial) ? trial[0] : trial) === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const phoneE164 = toE164(phone);
  const phoneBad = phone.trim().length > 0 && !E164.test(phoneE164);
  const tooShort = password.length > 0 && password.length < MIN_PASSWORD;
  const mismatch = passwordAgain.length > 0 && password !== passwordAgain;
  const ready =
    !!email.trim() &&
    !!nickname.trim() &&
    password.length >= MIN_PASSWORD &&
    password === passwordAgain &&
    !phoneBad &&
    !loading;

  const handleRegister = async () => {
    if (!ready) return;
    setLoading(true);
    setError("");
    try {
      const res = await authService.registerStart({
        email: email.trim(),
        password,
        nickname: nickname.trim(),
        sessionId,
        ...(phone.trim() ? { phone: phoneE164 } : {}),
        lang: i18n.language?.slice(0, 2),
      });
      startFlow(res.email ?? email.trim(), "signup");
      router.push("/auth/verify-code");
    } catch (err: any) {
      const code = err.message ?? "UNKNOWN_ERROR";
      setError(t(`auth.errors.${code}`, { defaultValue: t("auth.errors.UNKNOWN_ERROR") }));
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
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12 }]}
        keyboardShouldPersistTaps="handled"
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

        {fromTrial && <TrialBanner />}

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

          <View style={[styles.inputContainer, phoneBad && styles.inputError]}>
            <Ionicons
              name="call-outline"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t("auth.phoneOptional")}
              placeholderTextColor={theme.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </View>
          {phoneBad ? <Text style={styles.fieldHint}>{t("auth.phoneHint")}</Text> : null}

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
          {tooShort ? <Text style={styles.fieldError}>{t("auth.reset.tooShort")}</Text> : null}

          <View style={[styles.inputContainer, mismatch && styles.inputError]}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t("auth.passwordConfirm")}
              placeholderTextColor={theme.textSecondary}
              value={passwordAgain}
              onChangeText={setPasswordAgain}
              secureTextEntry={!showPassword}
            />
            {passwordAgain.length > 0 && !mismatch ? (
              <Ionicons name="checkmark-circle" size={20} color="#1DBB7F" />
            ) : null}
          </View>
          {mismatch ? <Text style={styles.fieldError}>{t("auth.reset.mismatch")}</Text> : null}

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={16} color="#E24B4A" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* 확인 버튼은 ScrollView 밖 — 하단 고정 + 네비바 위 (AuthStepLayout 과 같은 규칙) */}
      <View style={[styles.ctaBar, { paddingBottom: insets.bottom + 10 }]}>
        <PrimaryButton
          label={loading ? t("common.loading") : t("auth.register")}
          onPress={() => void handleRegister()}
          disabled={!ready}
          color={theme.primary}
          darkColor="#5b52c4"
        />
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push("/auth/login")}
          hitSlop={8}
        >
          <Text style={styles.loginLinkText}>
            {t("auth.hasAccount")}{" "}
            <Text style={{ color: theme.primary, fontWeight: "700" }}>
              {t("auth.login")}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
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
      paddingHorizontal: 24,
      paddingBottom: 24,
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
    inputError: {
      borderColor: "#E24B4A",
    },
    fieldError: {
      fontSize: 12.5,
      color: "#E24B4A",
      marginTop: -8,
      marginLeft: 4,
    },
    fieldHint: {
      fontSize: 12.5,
      color: theme.textSecondary,
      marginTop: -8,
      marginLeft: 4,
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
    ctaBar: {
      paddingHorizontal: 24,
      paddingTop: 12,
      gap: 12,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    loginLink: {
      alignItems: "center",
      paddingVertical: 2,
    },
    loginLinkText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
  });
