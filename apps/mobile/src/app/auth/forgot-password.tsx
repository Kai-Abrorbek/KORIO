import { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { authService } from "@/services/auth.service";
import { usePasswordResetStore } from "@/store/password-reset.store";
import AuthStepLayout from "@/components/auth/AuthStepLayout";

/** 서버 DTO 의 @IsEmail 과 대충 맞춰둔 것. 진짜 검증은 서버가 한다 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ForgotPasswordScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const startFlow = usePasswordResetStore((st) => st.startFlow);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const value = email.trim();
  const valid = EMAIL_RE.test(value);

  const submit = async () => {
    if (!valid || loading) return;
    setLoading(true);
    setError("");
    try {
      await authService.forgotPassword({
        email: value,
        lang: i18n.language?.slice(0, 2),
      });
      // 계정이 없어도 서버는 성공을 준다. 앱도 똑같이 다음 화면으로 넘어간다 —
      // 여기서 갈라지면 "이 메일은 가입돼 있다" 를 화면이 대신 알려주는 꼴이다
      startFlow(value);
      router.push("/auth/verify-code");
    } catch (e: any) {
      const code = e?.message ?? "UNKNOWN_ERROR";
      setError(
        t(`auth.errors.${code}`, { defaultValue: t("auth.errors.UNKNOWN_ERROR") }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthStepLayout
      icon="lock-closed"
      title={t("auth.forgot.title")}
      subtitle={t("auth.forgot.subtitle")}
      error={error}
      cta={loading ? t("common.loading") : t("auth.forgot.cta")}
      ctaDisabled={!valid || loading}
      onCta={submit}
    >
      <View style={s.inputWrap}>
        <Ionicons
          name="mail-outline"
          size={20}
          color={theme.textSecondary}
          style={s.icon}
        />
        <TextInput
          style={s.input}
          placeholder={t("auth.email")}
          placeholderTextColor={theme.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="send"
          onSubmitEditing={submit}
          autoFocus
        />
      </View>
      <Text style={s.hint}>{t("auth.forgot.hint")}</Text>
    </AuthStepLayout>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    inputWrap: {
      backgroundColor: theme.surface,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 54,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 15, color: theme.text },
    hint: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "500",
      color: theme.textSecondary,
    },
  });
