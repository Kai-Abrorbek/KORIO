/**
 * 전용 문제 풀이 페이지가 아직 없는 학습 모드용 자리 표시 화면.
 *
 * 표현·회화·듣기는 어휘와 다른 전용 페이지를 따로 만들 예정이라
 * 로드맵으로 보내면 안 된다. 페이지가 생기면 learnModePath 에서
 * 이 경로만 실제 경로로 바꾸면 된다.
 */
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { LearnMode } from "@/store/settings.store";

const LOOK: Record<string, { icon: string; color: string; bg: string }> = {
  expression: { icon: "chatbubble-ellipses", color: "#26A69A", bg: "#D6F2EF" },
  conversation: { icon: "chatbubbles", color: "#EC407A", bg: "#FCE0E9" },
  listening: { icon: "headset", color: "#42A5F5", bg: "#DCEDFD" },
};

const FALLBACK = { icon: "construct", color: "#776ee2", bg: "#E7E4FA" };

export default function ComingSoon() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const params = useLocalSearchParams<{ mode?: string }>();
  const mode = (
    Array.isArray(params.mode) ? params.mode[0] : params.mode
  ) as LearnMode;
  const look = LOOK[mode] ?? FALLBACK;

  // 모드 이름이 없는 값이 넘어와도 키가 그대로 노출되면 안 된다
  const modeName = LOOK[mode] ? t(`home.mode.${mode}`) : "";

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{modeName}</Text>
      </View>

      <Animated.View entering={FadeInDown.duration(320)} style={s.body}>
        <View style={[s.badge, { backgroundColor: look.bg }]}>
          <Ionicons name={look.icon as any} size={54} color={look.color} />
        </View>
        <View style={[s.chip, { backgroundColor: look.bg }]}>
          <Ionicons name="hammer" size={14} color={look.color} />
          <Text style={[s.chipText, { color: look.color }]}>
            {t("comingSoon.badge")}
          </Text>
        </View>
        <Text style={s.title}>{t("comingSoon.title")}</Text>
        <Text style={s.desc}>{t("comingSoon.desc")}</Text>
      </Animated.View>

      {/* 확인 계열 버튼은 항상 하단 고정 + SafeArea */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 14 }]}>
        <TouchableOpacity
          style={s.cta}
          activeOpacity={0.85}
          onPress={() => router.replace("/course-categories")}
        >
          <Text style={s.ctaText}>{t("comingSoon.pickOther")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 36,
      gap: 14,
    },
    badge: {
      width: 116,
      height: 116,
      borderRadius: 34,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 6,
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 99,
    },
    chipText: { fontSize: 12, fontWeight: "800" },
    title: {
      fontSize: 23,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
    },
    desc: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      fontWeight: "500",
    },
    footer: { paddingHorizontal: 20, paddingTop: 8 },
    cta: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      // 듀오링고식 입체감
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.22)",
    },
    ctaText: { fontSize: 16, fontWeight: "800", color: "#fff" },
  });
