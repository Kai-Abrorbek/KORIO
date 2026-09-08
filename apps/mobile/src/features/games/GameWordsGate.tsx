import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

/**
 * 단어를 받아오는 동안 / 못 받았을 때 게임 화면을 대신 채운다.
 *
 * 게임마다 같은 로딩·에러 UI 를 복사하지 않으려고 한 겹으로 묶었다.
 */
export function GameWordsGate({
  loading,
  failed,
  onRetry,
  children,
}: {
  loading: boolean;
  failed: boolean;
  onRetry: () => void;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  if (failed) {
    return (
      <View style={s.center}>
        <Text style={s.text}>{t("common.loadFailed")}</Text>
        <Pressable style={s.retry} onPress={onRetry} hitSlop={8}>
          <Text style={s.retryText}>{t("common.retry")}</Text>
        </Pressable>
      </View>
    );
  }
  return <>{children}</>;
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: 32,
    },
    text: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
    },
    retry: {
      paddingHorizontal: 22,
      paddingVertical: 11,
      borderRadius: 999,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
    },
    retryText: { fontSize: 15, fontWeight: "800", color: theme.primary },
  });
