import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { ReadingListeningService } from "@/services/reading-listening.service";
import { useSettingsStore } from "@/store/settings.store";
import type {
  ReadingLanguage,
  ReadingLessonLevelSummary,
} from "@/types/reading-listening";
import * as Haptics from "@/utils/haptics";

interface LevelCopy {
  title: string;
  subtitle: string;
  back: string;
  bands: [string, string, string];
  texts: string;
  comingSoon: string;
  loading: string;
  error: string;
  retry: string;
  levelSuffix: string;
  descriptions: string[];
}

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

const COPY: Record<ReadingLanguage, LevelCopy> = {
  ko: {
    title: "읽기 · 듣기",
    subtitle: "급수를 선택하고 읽을 글을 골라 보세요.",
    back: "뒤로 가기",
    bands: ["초급", "중급", "고급"],
    texts: "개 지문",
    comingSoon: "준비 중",
    loading: "급수를 확인하고 있어요",
    error: "급수 정보를 불러오지 못했어요.",
    retry: "다시 불러오기",
    levelSuffix: "급",
    descriptions: [
      "짧고 친숙한 생활 글",
      "이어지는 일상 이야기",
      "실용적인 정보와 경험",
      "긴 글의 흐름과 핵심",
      "논리적인 설명과 관점",
      "복합적인 주제와 표현",
    ],
  },
  uz: {
    title: "O‘qish · tinglash",
    subtitle: "Darajani tanlang va matnni boshlang.",
    back: "Orqaga",
    bands: ["Boshlang‘ich", "O‘rta", "Yuqori"],
    texts: " ta matn",
    comingSoon: "Tayyorlanmoqda",
    loading: "Darajalar tekshirilmoqda",
    error: "Darajalar ma’lumotini yuklab bo‘lmadi.",
    retry: "Qayta yuklash",
    levelSuffix: "-daraja",
    descriptions: [
      "Qisqa va tanish kundalik matnlar",
      "Bog‘langan kundalik hikoyalar",
      "Amaliy ma’lumot va tajribalar",
      "Uzun matn oqimi va asosiy fikr",
      "Mantiqiy izoh va qarashlar",
      "Murakkab mavzu va ifodalar",
    ],
  },
  en: {
    title: "Reading · listening",
    subtitle: "Choose a level, then pick a text.",
    back: "Go back",
    bands: ["Beginner", "Intermediate", "Advanced"],
    texts: " texts",
    comingSoon: "Coming soon",
    loading: "Checking available levels",
    error: "Could not load the available levels.",
    retry: "Try again",
    levelSuffix: "Level ",
    descriptions: [
      "Short, familiar everyday texts",
      "Connected stories from daily life",
      "Practical information and experience",
      "Flow and key ideas in longer texts",
      "Logical explanations and viewpoints",
      "Complex topics and expressions",
    ],
  },
  ru: {
    title: "Чтение · аудирование",
    subtitle: "Выберите уровень, затем текст.",
    back: "Назад",
    bands: ["Начальный", "Средний", "Продвинутый"],
    texts: " текстов",
    comingSoon: "Готовится",
    loading: "Проверяем доступные уровни",
    error: "Не удалось загрузить уровни.",
    retry: "Повторить",
    levelSuffix: "Уровень ",
    descriptions: [
      "Короткие знакомые бытовые тексты",
      "Связные истории из повседневной жизни",
      "Практическая информация и опыт",
      "Структура и главное в длинных текстах",
      "Логичные объяснения и точки зрения",
      "Сложные темы и выражения",
    ],
  },
};

function levelTitle(language: ReadingLanguage, level: number, suffix: string) {
  return language === "ko" || language === "uz"
    ? `${level}${suffix}`
    : `${suffix}${level}`;
}

function textCount(total: number, suffix: string) {
  return `${total}${suffix}`;
}

export default function ReadingListeningLevelScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const isDark = theme.bg !== "#ffffff";
  const language = useSettingsStore((state) => state.language);
  const normalizedLanguage = (
    ["ko", "uz", "en", "ru"].includes(language) ? language : "uz"
  ) as ReadingLanguage;
  const copy = COPY[normalizedLanguage];
  const styles = useMemo(() => createStyles(theme, isDark), [isDark, theme]);

  const [levels, setLevels] = useState<ReadingLessonLevelSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadLevels = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await ReadingListeningService.listLevels();
      setLevels(response.levels);
    } catch {
      setLevels([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLevels();
  }, [loadLevels]);

  const totalsByLevel = useMemo(
    () => new Map(levels.map((item) => [item.level, item.total])),
    [levels],
  );
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/course-categories");
  };

  const openLevel = (level: number) => {
    if ((totalsByLevel.get(level) ?? 0) < 1) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/reading-listening?level=${level}` as Href);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 30 },
        ]}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.back}
            hitSlop={10}
            onPress={goBack}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={23} color={theme.text} />
          </Pressable>
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.subtitle}>{copy.subtitle}</Text>
        </View>

        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={theme.primary} />
            <Text style={styles.loadingText}>{copy.loading}</Text>
          </View>
        ) : null}

        {error ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadLevels()}
            style={({ pressed }) => [
              styles.errorCard,
              pressed && styles.errorPressed,
            ]}
          >
            <View style={styles.errorIcon}>
              <Ionicons
                name="cloud-offline-outline"
                size={19}
                color={isDark ? "#FF4B4B" : "#D33B3B"}
              />
            </View>
            <View style={styles.errorCopy}>
              <Text style={styles.errorTitle}>{copy.error}</Text>
              <Text style={styles.errorAction}>{copy.retry}</Text>
            </View>
            <Ionicons
              name="refresh"
              size={19}
              color={isDark ? "#FF4B4B" : "#D33B3B"}
            />
          </Pressable>
        ) : null}

        {!error ? (
          <View style={styles.groups}>
            {copy.bands.map((band, bandIndex) => (
              <View key={band} style={styles.group}>
                <View style={styles.groupHeading}>
                  <Text style={styles.groupTitle}>{band}</Text>
                  <View style={styles.groupRule} />
                </View>
                {LEVELS.slice(bandIndex * 2, bandIndex * 2 + 2).map((level) => {
                  const total = totalsByLevel.get(level) ?? 0;
                  const available = total > 0;
                  const disabled = !available || loading;

                  return (
                    <Pressable
                      key={level}
                      accessibilityRole="button"
                      accessibilityLabel={`${levelTitle(normalizedLanguage, level, copy.levelSuffix)}, ${copy.descriptions[level - 1]}, ${loading ? copy.loading : available ? textCount(total, copy.texts) : copy.comingSoon}`}
                      accessibilityState={{ disabled }}
                      disabled={disabled}
                      onPress={() => openLevel(level)}
                      style={({ pressed }) => [
                        styles.levelRow,
                        pressed && available && styles.pressed,
                      ]}
                    >
                      <View style={styles.levelCopy}>
                        <Text
                          style={[
                            styles.levelTitle,
                            !available && !loading && styles.unavailableTitle,
                          ]}
                        >
                          {levelTitle(
                            normalizedLanguage,
                            level,
                            copy.levelSuffix,
                          )}
                        </Text>
                        <Text
                          style={[
                            styles.levelDescription,
                            !available && !loading && styles.unavailableText,
                          ]}
                        >
                          {copy.descriptions[level - 1]}
                        </Text>
                      </View>
                      <View style={styles.levelEnd}>
                        <Text
                          style={[
                            styles.levelStatus,
                            !available && styles.unavailableText,
                          ]}
                        >
                          {loading
                            ? "—"
                            : available
                              ? textCount(total, copy.texts)
                              : copy.comingSoon}
                        </Text>
                        {!loading && available ? (
                          <Ionicons
                            name="arrow-forward"
                            size={17}
                            color={theme.primary}
                          />
                        ) : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.bg },
    content: { paddingHorizontal: 20 },
    topBar: {
      minHeight: 54,
      flexDirection: "row",
      alignItems: "center",
    },
    closeButton: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    pressed: { backgroundColor: isDark ? "#302B48" : "#F4F2FF" },
    intro: { paddingTop: 12, paddingBottom: 28 },
    title: {
      fontSize: 29,
      lineHeight: 36,
      letterSpacing: -0.5,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      marginTop: 6,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    loadingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
    },
    loadingText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    groups: { gap: 25 },
    group: { gap: 0 },
    groupHeading: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 3,
    },
    groupTitle: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "900",
      color: isDark ? "#C4BEF0" : "#5B4DD4",
    },
    groupRule: { flex: 1, height: 1, backgroundColor: theme.border },
    levelRow: {
      minHeight: 83,
      paddingHorizontal: 3,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    levelCopy: { flex: 1, minWidth: 0 },
    levelTitle: {
      fontSize: 23,
      lineHeight: 28,
      fontWeight: "900",
      color: theme.text,
    },
    unavailableTitle: { color: theme.textSecondary },
    levelDescription: {
      marginTop: 4,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    levelEnd: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 6,
      maxWidth: "42%",
    },
    levelStatus: {
      flexShrink: 1,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "800",
      color: isDark ? "#C4BEF0" : "#5B4DD4",
      textAlign: "right",
    },
    unavailableText: { color: theme.textSecondary },
    errorCard: {
      minHeight: 66,
      marginTop: 16,
      marginBottom: 4,
      borderRadius: 14,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      backgroundColor: isDark ? "#342725" : "#FFF0EC",
    },
    errorPressed: { opacity: 0.75 },
    errorIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#452F2C" : "#FFE2DC",
    },
    errorCopy: { flex: 1, gap: 2 },
    errorTitle: { fontSize: 12.5, fontWeight: "800", color: theme.text },
    errorAction: {
      fontSize: 11.5,
      fontWeight: "800",
      color: isDark ? "#FF4B4B" : "#D33B3B",
    },
  });
