import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { usePasswordResetStore } from "@/store/password-reset.store";
import AuthStepLayout from "@/components/auth/AuthStepLayout";

/** 서버 DTO 의 @MinLength(6) 과 같아야 한다 */
const MIN_LENGTH = 6;

const LEVELS = ["weak", "fair", "strong"] as const;
const LEVEL_COLOR = ["#E24B4A", "#E2A83A", "#1DBB7F"];

/**
 * 대충의 강도. 서버는 길이만 본다 — 이건 "이 정도면 괜찮다" 를 눈으로
 * 보여주려는 것이지 통과 조건이 아니다.
 */
function strengthOf(pw: string): 0 | 1 | 2 {
  if (pw.length < MIN_LENGTH) return 0;
  let pts = 0;
  if (pw.length >= 8) pts++;
  if (pw.length >= 12) pts++;
  if (/[a-zA-Z]/.test(pw) && /\d/.test(pw)) pts++;
  if (/[^a-zA-Z0-9]/.test(pw)) pts++;
  return pts <= 1 ? 0 : pts === 2 ? 1 : 2;
}

function StrengthBar({ level, theme }: { level: 0 | 1 | 2; theme: ThemeColors }) {
  const s = getStyles(theme);
  const { t } = useTranslation();
  const grow = useSharedValue(0);

  useEffect(() => {
    grow.value = withTiming((level + 1) / 3, { duration: 260 });
  }, [level, grow]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${grow.value * 100}%`,
    backgroundColor: LEVEL_COLOR[level],
  }));

  return (
    <View style={s.strengthRow}>
      <View style={s.strengthTrack}>
        <Animated.View style={[s.strengthFill, fillStyle]} />
      </View>
      <Text style={[s.strengthLabel, { color: LEVEL_COLOR[level] }]}>
        {t(`auth.reset.strength.${LEVELS[level]}`)}
      </Text>
    </View>
  );
}

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const { setUser } = useAuthStore();

  const resetToken = usePasswordResetStore((st) => st.resetToken);
  const clear = usePasswordResetStore((st) => st.clear);

  const [pw, setPw] = useState("");
  const [again, setAgain] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * 성공해서 토큰을 지운 것과, 애초에 토큰 없이 들어온 것을 구분하는 표시.
   * 이게 없으면 clear() 직후 아래 훅이 다시 돌면서 방금 보낸 홈 화면을
   * 비밀번호 찾기 첫 화면으로 덮어쓴다.
   */
  const finished = useRef(false);

  // 토큰 없이 들어온 경우 (앱 재시작 등) — 토큰은 메모리에만 있어서 사라진다
  useEffect(() => {
    if (!resetToken && !finished.current) {
      router.replace("/auth/forgot-password");
    }
  }, [resetToken]);

  const level = useMemo(() => strengthOf(pw), [pw]);
  const tooShort = pw.length > 0 && pw.length < MIN_LENGTH;
  const mismatch = again.length > 0 && pw !== again;
  const ready = pw.length >= MIN_LENGTH && pw === again && !loading;

  const submit = async () => {
    if (!ready) return;
    setLoading(true);
    setError("");
    try {
      const res: any = await authService.resetPassword({
        resetToken,
        newPassword: pw,
      });
      // 서버가 바로 토큰을 준다 — 메일함을 열고 새 비밀번호까지 정한 사람이면
      // 본인이 맞다. 여기서 다시 로그인 화면으로 보내면 방금 정한 걸 또 친다
      setUser(res.user, res.accessToken);
      finished.current = true;
      clear();
      router.replace(
        res.user?.isOnboardingCompleted ? "/(tabs)" : "/onboarding/survey",
      );
    } catch (e: any) {
      const code = e?.message ?? "UNKNOWN_ERROR";
      setError(
        t(`auth.errors.${code}`, { defaultValue: t("auth.errors.UNKNOWN_ERROR") }),
      );
    } finally {
      setLoading(false);
    }
  };

  const inlineError = tooShort
    ? t("auth.reset.tooShort")
    : mismatch
      ? t("auth.reset.mismatch")
      : "";

  return (
    <AuthStepLayout
      icon="key"
      title={t("auth.reset.title")}
      subtitle={t("auth.reset.subtitle")}
      error={error || inlineError}
      cta={loading ? t("common.loading") : t("auth.reset.cta")}
      ctaDisabled={!ready}
      onCta={submit}
      onBack={() => router.replace("/auth/login")}
    >
      <View style={[s.inputWrap, tooShort && s.inputBad]}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={theme.textSecondary}
          style={s.icon}
        />
        <TextInput
          style={s.input}
          placeholder={t("auth.reset.newPassword")}
          placeholderTextColor={theme.textSecondary}
          value={pw}
          onChangeText={setPw}
          secureTextEntry={!show}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          autoFocus
        />
        <Pressable onPress={() => setShow((v) => !v)} hitSlop={8}>
          <Ionicons
            name={show ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={theme.textSecondary}
          />
        </Pressable>
      </View>

      {pw.length >= MIN_LENGTH && <StrengthBar level={level} theme={theme} />}

      <View style={[s.inputWrap, mismatch && s.inputBad]}>
        <Ionicons
          name="checkmark-circle-outline"
          size={20}
          color={
            again.length > 0 && !mismatch ? "#1DBB7F" : theme.textSecondary
          }
          style={s.icon}
        />
        <TextInput
          style={s.input}
          placeholder={t("auth.reset.confirm")}
          placeholderTextColor={theme.textSecondary}
          value={again}
          onChangeText={setAgain}
          secureTextEntry={!show}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          returnKeyType="done"
          onSubmitEditing={submit}
        />
      </View>

      <Text style={s.hint}>{t("auth.reset.logoutNote")}</Text>
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
    inputBad: { borderColor: "#E24B4A" },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 15, color: theme.text },
    strengthRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: -4,
    },
    strengthTrack: {
      flex: 1,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    strengthFill: { height: "100%", borderRadius: 3 },
    strengthLabel: { fontSize: 12, fontWeight: "800", width: 52 },
    hint: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "500",
      color: theme.textSecondary,
    },
  });
