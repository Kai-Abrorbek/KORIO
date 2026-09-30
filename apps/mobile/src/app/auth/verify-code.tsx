import { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { authService } from "@/services/auth.service";
import { usePasswordResetStore } from "@/store/password-reset.store";
import { useAuthStore } from "@/store/auth.store";
import AuthStepLayout from "@/components/auth/AuthStepLayout";
import CodeInput, { CODE_LENGTH } from "@/components/auth/CodeInput";

const LENGTH = CODE_LENGTH;
/** 재전송을 다시 누를 수 있을 때까지 */
const RESEND_COOLDOWN_SEC = 60;

export default function VerifyCodeScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const inputRef = useRef<TextInput>(null);

  const email = usePasswordResetStore((st) => st.email);
  /** reset / setPassword 는 코드 → 새 비밀번호, signup 은 코드 → 계정 생성 */
  const purpose = usePasswordResetStore((st) => st.purpose);
  const clearFlow = usePasswordResetStore((st) => st.clear);
  const setUser = useAuthStore((st) => st.setUser);
  const signup = purpose === "signup";
  const sentAt = usePasswordResetStore((st) => st.sentAt);
  const markResent = usePasswordResetStore((st) => st.markResent);
  const setToken = usePasswordResetStore((st) => st.setToken);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [left, setLeft] = useState(RESEND_COOLDOWN_SEC);

  /** 가입 완료로 흐름을 비운 것과 애초에 이메일 없이 들어온 것을 구분한다 */
  const finished = useRef(false);

  // 이메일 없이 이 화면에 직접 들어온 경우 (딥링크·새로고침) 앞 단계로 돌린다
  useEffect(() => {
    if (!email && !finished.current) {
      router.replace(signup ? "/auth/register" : "/auth/forgot-password");
    }
  }, [email, signup]);

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
      if (signup) {
        // 코드가 맞으면 서버가 이때 계정을 만들고 바로 토큰을 준다
        const res: any = await authService.registerVerify({ email, code: value });
        finished.current = true;
        setUser(res.user, res.accessToken);
        clearFlow();
        router.replace(
          res.user?.isOnboardingCompleted ? "/(tabs)" : "/onboarding/survey",
        );
        return;
      }
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
      const lang = i18n.language?.slice(0, 2);
      if (signup) await authService.registerResend({ email, lang });
      else await authService.forgotPassword({ email, lang });
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
      title={signup ? t("auth.verify.signupTitle") : t("auth.verify.title")}
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
      <CodeInput
        ref={inputRef}
        value={code}
        onChange={onChange}
        error={!!error}
        theme={theme}
      />

      {!!notice && <Text style={s.notice}>{notice}</Text>}
      <Text style={s.hint}>{t("auth.verify.spam")}</Text>
    </AuthStepLayout>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
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
