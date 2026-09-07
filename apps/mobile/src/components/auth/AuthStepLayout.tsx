import { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface Props {
  /** 헤더 원형 아이콘 */
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  /** 빈 문자열이면 안 그린다 */
  error?: string;
  cta: string;
  ctaDisabled?: boolean;
  onCta: () => void;
  onBack?: () => void;
  /** CTA 위에 들어가는 보조 액션 (재전송 링크 등) */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * 비밀번호 찾기 3단계가 공유하는 껍데기.
 *
 * 확인 버튼은 ScrollView 밖에 두고 화면 하단에 고정한다. 안에 넣으면 내용이
 * 짧을 때 화면 중간에 떠 있고, 키보드가 올라오면 가려진다.
 */
export default function AuthStepLayout({
  icon,
  title,
  subtitle,
  error,
  cta,
  ctaDisabled,
  onCta,
  onBack,
  footer,
  children,
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);

  const back = () => {
    if (onBack) return onBack();
    if (router.canGoBack()) router.back();
    else router.replace("/auth/login");
  };

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[s.scroll, { paddingTop: insets.top + 12 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={s.backBtn} onPress={back} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </Pressable>

        <View style={s.iconWrap}>
          <Ionicons name={icon} size={30} color={theme.primary} />
        </View>

        <Text style={s.title}>{title}</Text>
        <Text style={s.subtitle}>{subtitle}</Text>

        <View style={s.body}>{children}</View>

        {!!error && (
          <View style={s.errorRow}>
            <Ionicons name="alert-circle" size={16} color="#E24B4A" />
            <Text style={s.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>

      <View style={[s.ctaBar, { paddingBottom: insets.bottom + 14 }]}>
        {footer}
        <PrimaryButton
          label={cta}
          onPress={onCta}
          disabled={ctaDisabled}
          color={theme.primary}
          darkColor="#5b52c4"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 28,
    },
    iconWrap: {
      width: 60,
      height: 60,
      borderRadius: 20,
      backgroundColor: theme.primary + "1F",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
      letterSpacing: -0.4,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "500",
      color: theme.textSecondary,
    },
    body: { marginTop: 28, gap: 14 },
    errorRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 14,
    },
    errorText: { flex: 1, fontSize: 13, fontWeight: "600", color: "#E24B4A" },
    ctaBar: {
      paddingHorizontal: 24,
      paddingTop: 12,
      gap: 14,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
  });
