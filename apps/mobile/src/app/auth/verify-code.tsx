import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { authService } from "@/services/auth.service";
import { usePasswordResetStore } from "@/store/password-reset.store";
import AuthStepLayout from "@/components/auth/AuthStepLayout";

const LENGTH = 6;
/** 재전송을 다시 누를 수 있을 때까지 */
const RESEND_COOLDOWN_SEC = 60;

/** 한 칸. 채워지면 살짝 튀고, 지금 칠 자리는 테두리가 살아난다 */
function CodeBox({
  char,
  active,
  error,
  theme,
}: {
  char: string;
  active: boolean;
  error: boolean;
  theme: ThemeColors;
}) {
  const s = getStyles(theme);
  const pop = useSharedValue(0);
  const caret = useSharedValue(0);

  useEffect(() => {
    if (char) {
      pop.value = withSequence(
        withTiming(1, { duration: 90, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 130 }),
      );
    }
  }, [char, pop]);

  useEffect(() => {
    if (active && !char) {
      caret.value = withRepeat(
        withSequence(withTiming(1, { duration: 420 }), withTiming(0.15, { duration: 420 })),
        -1,
        true,
      );
    } else {
      caret.value = withTiming(0, { duration: 120 });
    }
  }, [active, char, caret]);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pop.value * 0.07 }],
  }));
  const caretStyle = useAnimatedStyle(() => ({ opacity: caret.value }));

  return (
    <Animated.View
      style={[
        s.box,
        boxStyle,
        active && { borderColor: theme.primary, borderWidth: 2 },
        !!char && { borderColor: theme.primary },
        error && { borderColor: "#E24B4A" },
      ]}
    >
      {char ? (
        <Text style={s.boxText}>{char}</Text>
      ) : (
        <Animated.View style={[s.caret, caretStyle]} />
      )}
    </Animated.View>
  );
}

export default function VerifyCodeScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const inputRef = useRef<TextInput>(null);

  const email = usePasswordResetStore((st) => st.email);
  const sentAt = usePasswordResetStore((st) => st.sentAt);
  const markResent = usePasswordResetStore((st) => st.markResent);
  const setToken = usePasswordResetStore((st) => st.setToken);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [left, setLeft] = useState(RESEND_COOLDOWN_SEC);

  // 이메일 없이 이 화면에 직접 들어온 경우 (딥링크·새로고침) 앞 단계로 돌린다
  useEffect(() => {
    if (!email) router.replace("/auth/forgot-password");
  }, [email]);

  // 남은 대기 시간은 "언제 보냈는지" 에서 매초 다시 계산한다.
  // 카운터를 그냥 1씩 빼면 화면이 잠들었다 깨어났을 때 시간이 밀린다
  useEffect(() => {
    const tick = () => {
      const passed = Math.floor((Date.now() - sentAt) / 1000);
      setLeft(Math.max(0, RESEND_COOLDOWN_SEC - passed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sentAt]);

  const onChange = (raw: string) => {
    const next = raw.replace(/\D/g, "").slice(0, LENGTH);
    setCode(next);
    if (error) setError("");
    if (next.length === LENGTH) void submit(next);
  };

  const submit = async (value = code) => {
    if (value.length !== LENGTH || loading) return;
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const res = await authService.verifyResetCode({ email, code: value });
      setToken(res.resetToken);
      router.push("/auth/reset-password");
    } catch (e: any) {
      const err = e?.message ?? "UNKNOWN_ERROR";
      setError(
        t(`auth.errors.${err}`, { defaultValue: t("auth.errors.UNKNOWN_ERROR") }),
      );
      setCode("");
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (left > 0 || loading) return;
    setLoading(true);
    setError("");
    try {
      await authService.forgotPassword({
        email,
        lang: i18n.language?.slice(0, 2),
      });
      markResent();
      setCode("");
      setNotice(t("auth.verify.resent"));
    } catch (e: any) {
      const err = e?.message ?? "UNKNOWN_ERROR";
      setError(
        t(`auth.errors.${err}`, { defaultValue: t("auth.errors.UNKNOWN_ERROR") }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthStepLayout
      icon="mail-open"
      title={t("auth.verify.title")}
      subtitle={t("auth.verify.subtitle", { email })}
      error={error}
      cta={loading ? t("common.loading") : t("auth.verify.cta")}
      ctaDisabled={code.length !== LENGTH || loading}
      onCta={() => void submit()}
      footer={
        <Pressable
          onPress={() => void resend()}
          disabled={left > 0 || loading}
          hitSlop={8}
          style={s.resendWrap}
        >
          <Text style={[s.resend, left > 0 && s.resendOff]}>
            {left > 0
              ? t("auth.verify.resendIn", { count: left })
              : t("auth.verify.resend")}
          </Text>
        </Pressable>
      }
    >
      <Pressable style={s.boxRow} onPress={() => inputRef.current?.focus()}>
        {Array.from({ length: LENGTH }).map((_, i) => (
          <CodeBox
            key={i}
            char={code[i] ?? ""}
            active={i === code.length}
            error={!!error}
            theme={theme}
          />
        ))}
      </Pressable>

      {/*
        칸은 6개로 보이지만 실제 입력은 이 하나가 다 받는다.
        칸마다 TextInput 을 두면 붙여넣기·지우기·SMS 자동완성이 전부 깨진다.
      */}
      <TextInput
        ref={inputRef}
        style={s.hiddenInput}
        value={code}
        onChangeText={onChange}
        keyboardType="number-pad"
        maxLength={LENGTH}
        autoFocus
        caretHidden
        textContentType="oneTimeCode"
        autoComplete={Platform.OS === "android" ? "sms-otp" : "one-time-code"}
      />

      {!!notice && <Text style={s.notice}>{notice}</Text>}
      <Text style={s.hint}>{t("auth.verify.spam")}</Text>
    </AuthStepLayout>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    boxRow: { flexDirection: "row", gap: 9, justifyContent: "space-between" },
    box: {
      flex: 1,
      aspectRatio: 0.82,
      maxHeight: 62,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    boxText: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
    },
    caret: {
      width: 2,
      height: 24,
      borderRadius: 1,
      backgroundColor: theme.primary,
    },
    // 화면 밖으로 밀어둔다. opacity:0 만 주면 안드로이드에서 포커스를 못 받는다
    hiddenInput: {
      position: "absolute",
      width: 1,
      height: 1,
      opacity: 0,
      top: -100,
    },
    notice: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.primary,
    },
    hint: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "500",
      color: theme.textSecondary,
    },
    resendWrap: { alignSelf: "center", paddingVertical: 4 },
    resend: { fontSize: 14, fontWeight: "700", color: theme.primary },
    resendOff: { color: theme.textSecondary, fontWeight: "600" },
  });
