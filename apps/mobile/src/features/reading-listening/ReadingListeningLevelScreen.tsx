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
  eyebrow: string;
  title: string;
  subtitle: string;
  available: string;
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
    eyebrow: "문화 읽기 · 듣기",
    title: "어떤 급수로 읽어 볼까요?",
    subtitle:
      "내 수준에 맞는 글을 골라 읽고, 듣고, 어휘와 생각까지 차근차근 익혀 보세요.",
    available: "학습 가능",
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
    eyebrow: "Madaniy o‘qish · tinglash",
    title: "Qaysi darajadan boshlaymiz?",
    subtitle:
      "Darajangizga mos matnni o‘qing, tinglang va yangi so‘zlarni bosqichma-bosqich o‘rganing.",
    available: "O‘rganish mumkin",
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
    eyebrow: "Culture reading · listening",
    title: "Which level will you read?",
    subtitle:
      "Choose a text that fits you, then read, listen, and build vocabulary one calm step at a time.",
    available: "Available",
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
    eyebrow: "Культурное чтение · аудирование",
    title: "Какой уровень выберем?",
    subtitle:
      "Выберите подходящий текст, читайте, слушайте и постепенно пополняйте словарный запас.",
    available: "Доступно",
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
  const availableCount = LEVELS.filter(
    (level) => (totalsByLevel.get(level) ?? 0) > 0,
  ).length;

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
            accessibilityLabel="Close"
            hitSlop={10}
            onPress={goBack}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>

          <Text style={styles.topBarTitleText}>{copy.eyebrow}</Text>

          <View style={styles.topBarSpacer} />
        </View>

        <View style={styles.intro}>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.subtitle}>{copy.subtitle}</Text>
        </View>

        <View style={styles.listHeading}>
          <Text style={styles.listHeadingText}>
            {loading ? copy.loading : copy.available}
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Text style={styles.availableCount}>
              {availableCount} / {LEVELS.length}
            </Text>
          )}
        </View>

        {error ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadLevels()}
            style={({ pressed }) => [
              styles.errorCard,
              pressed && styles.pressed,
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

        <View style={styles.levelList}>
          {LEVELS.map((level, index) => {
            const total = totalsByLevel.get(level) ?? 0;
            const available = total > 0;

            return (
              <Pressable
                key={level}
                accessibilityRole="button"
                accessibilityLabel={`${levelTitle(normalizedLanguage, level, copy.levelSuffix)}, ${available ? textCount(total, copy.texts) : copy.comingSoon}`}
                accessibilityState={{ disabled: !available || loading }}
                disabled={!available || loading}
                onPress={() => openLevel(level)}
                style={({ pressed }) => [
                  styles.levelRow,
                  !available && styles.unavailableRow,
                  index < LEVELS.length - 1 && styles.levelDivider,
                  pressed && available && styles.pressed,
                ]}
              >
                <Text
                  style={[styles.levelNumber, !available && styles.mutedText]}
                >
                  {String(level).padStart(2, "0")}
                </Text>
                <View style={styles.levelCopy}>
                  <Text
                    style={[
                      styles.levelTitle,
                      !available && styles.unavailableTitle,
                    ]}
                  >
                    {levelTitle(normalizedLanguage, level, copy.levelSuffix)}
                  </Text>
                  {available ? (
                    <Text style={styles.levelDescription}>
                      {copy.descriptions[level - 1]}
                    </Text>
                  ) : null}
                  <Text
                    style={[
                      styles.levelStatus,
                      !available && styles.unavailableStatus,
                    ]}
                  >
                    {available ? textCount(total, copy.texts) : copy.comingSoon}
                  </Text>
                </View>
                <Ionicons
                  name={available ? "chevron-forward" : "lock-closed-outline"}
                  size={18}
                  color={
                    available
                      ? isDark
                        ? "#C4BEF0"
                        : theme.primary
                      : theme.textSecondary
                  }
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: isDark ? theme.bg : "#FAFAFC" },
    content: { paddingHorizontal: 20 },
    topBar: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    topBarTitleText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 19,
      fontWeight: "800",
      textAlign: "center",
      color: theme.text,
    },
    topBarSpacer: { width: 40 },
    pressed: { opacity: 0.7 },
    intro: { paddingTop: 26, paddingBottom: 6 },
    title: {
      fontSize: 27,
      lineHeight: 35,
      letterSpacing: -0.6,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      marginTop: 10,
      maxWidth: 360,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    listHeading: {
      marginTop: 31,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    listHeadingText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 21,
      fontWeight: "800",
      color: theme.text,
    },
    availableCount: {
      fontSize: 11.5,
      lineHeight: 17,
      fontWeight: "800",
      color: isDark ? "#C4BEF0" : theme.primary,
      textAlign: "right",
    },
    levelList: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      overflow: "hidden",
    },
    levelRow: {
      minHeight: 112,
      paddingHorizontal: 16,
      paddingVertical: 17,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    unavailableRow: { minHeight: 72, paddingVertical: 11 },
    levelDivider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    levelNumber: {
      width: 34,
      alignSelf: "flex-start",
      paddingTop: 1,
      fontSize: 21,
      lineHeight: 26,
      fontWeight: "900",
      color: isDark ? "#C4BEF0" : theme.primary,
    },
    levelCopy: { flex: 1, minWidth: 0 },
    levelTitle: {
      fontSize: 17,
      lineHeight: 23,
      fontWeight: "800",
      color: theme.text,
    },
    unavailableTitle: { fontSize: 15, color: theme.textSecondary },
    levelDescription: {
      marginTop: 3,
      fontSize: 12.5,
      lineHeight: 18,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    levelStatus: {
      marginTop: 8,
      fontSize: 11.5,
      lineHeight: 17,
      fontWeight: "800",
      color: isDark ? "#C4BEF0" : theme.primary,
    },
    unavailableStatus: {
      marginTop: 1,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    mutedText: { color: theme.textSecondary },
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
