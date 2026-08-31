import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { type Href, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
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

type IconName = keyof typeof Ionicons.glyphMap;

interface LevelMeta {
  level: number;
  icon: IconName;
  colors: [string, string];
}

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
  footer: string;
  levelSuffix: string;
  descriptions: string[];
}

const LEVELS: LevelMeta[] = [
  { level: 1, icon: "leaf-outline", colors: ["#5FAE8F", "#3C8069"] },
  { level: 2, icon: "chatbubbles-outline", colors: ["#62A8D8", "#3F7FAD"] },
  { level: 3, icon: "compass-outline", colors: ["#8178E6", "#6257C4"] },
  { level: 4, icon: "newspaper-outline", colors: ["#E7A85A", "#C57C36"] },
  { level: 5, icon: "analytics-outline", colors: ["#DE7F72", "#B85B50"] },
  { level: 6, icon: "library-outline", colors: ["#5967B7", "#3E498D"] },
];

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
    footer: "새 급수 데이터가 준비되면 이곳에 자동으로 열려요.",
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
    footer: "Yangi daraja ma’lumotlari qo‘shilsa, bu yerda avtomatik ochiladi.",
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
    footer: "New levels will unlock here automatically when their data is added.",
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
    footer: "Новые уровни откроются здесь автоматически после добавления данных.",
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
    (item) => (totalsByLevel.get(item.level) ?? 0) > 0,
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

          <View style={styles.topBarTitle}>
            <Ionicons name="headset-outline" size={16} color="#4F8A74" />
            <Text style={styles.topBarTitleText}>{copy.eyebrow}</Text>
          </View>

          <View style={styles.topBarSpacer} />
        </View>

        <Animated.View entering={FadeInDown.duration(420)}>
          <LinearGradient
            colors={isDark ? ["#253B35", "#1D2B28"] : ["#E6F4ED", "#F7F1E6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroGlow} pointerEvents="none" />
            <View style={styles.heroCopy}>
              <View style={styles.heroBadge}>
                <Ionicons name="book-outline" size={15} color="#427862" />
                <Text style={styles.heroBadgeText}>{copy.eyebrow}</Text>
              </View>
              <Text style={styles.title}>{copy.title}</Text>
              <Text style={styles.subtitle}>{copy.subtitle}</Text>

              <View style={styles.readyPill}>
                {loading ? (
                  <>
                    <ActivityIndicator size="small" color="#427862" />
                    <Text style={styles.readyPillText}>{copy.loading}</Text>
                  </>
                ) : (
                  <>
                    <View style={styles.readyDot} />
                    <Text style={styles.readyPillText}>
                      {copy.available} {availableCount} / {LEVELS.length}
                    </Text>
                  </>
                )}
              </View>
            </View>

            <View style={styles.heroImageFrame}>
              <Image
                source={require("../../../assets/images/reading-listening/library-reading-preview.png")}
                contentFit="cover"
                transition={180}
                style={styles.heroImage}
              />
            </View>
          </LinearGradient>
        </Animated.View>

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
              <Ionicons name="cloud-offline-outline" size={19} color="#B46155" />
            </View>
            <View style={styles.errorCopy}>
              <Text style={styles.errorTitle}>{copy.error}</Text>
              <Text style={styles.errorAction}>{copy.retry}</Text>
            </View>
            <Ionicons name="refresh" size={19} color="#B46155" />
          </Pressable>
        ) : null}

        <View style={styles.levelGrid}>
          {LEVELS.map((item, index) => {
            const total = totalsByLevel.get(item.level) ?? 0;
            const available = total > 0;
            const cardColors: [string, string] = available
              ? item.colors
              : isDark
                ? ["#292D32", "#24272C"]
                : ["#F1F3EF", "#E7EBE6"];

            return (
              <Animated.View
                key={item.level}
                entering={FadeInDown.delay(70 + index * 55).duration(360)}
                style={styles.levelCell}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={levelTitle(
                    normalizedLanguage,
                    item.level,
                    copy.levelSuffix,
                  )}
                  accessibilityState={{ disabled: !available }}
                  disabled={!available || loading}
                  onPress={() => openLevel(item.level)}
                  style={({ pressed }) => [
                    styles.levelPressable,
                    pressed && available && styles.cardPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.cardDepth,
                      {
                        backgroundColor: available
                          ? `${item.colors[1]}88`
                          : isDark
                            ? "#191B1E"
                            : "#D9DED8",
                      },
                    ]}
                  />
                  <LinearGradient colors={cardColors} style={styles.levelCard}>
                    <View style={styles.cardGlow} pointerEvents="none" />
                    <View style={styles.levelCardTop}>
                      <View
                        style={[
                          styles.levelIcon,
                          !available && styles.lockedLevelIcon,
                        ]}
                      >
                        <Ionicons
                          name={available ? item.icon : "lock-closed-outline"}
                          size={20}
                          color={available ? "#FFFFFF" : theme.textSecondary}
                        />
                      </View>
                      <Text
                        style={[
                          styles.levelNumber,
                          !available && { color: theme.textSecondary },
                        ]}
                      >
                        {String(item.level).padStart(2, "0")}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.levelTitle,
                        !available && { color: theme.textSecondary },
                      ]}
                    >
                      {levelTitle(
                        normalizedLanguage,
                        item.level,
                        copy.levelSuffix,
                      )}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.levelDescription,
                        !available && { color: theme.textSecondary },
                      ]}
                    >
                      {copy.descriptions[item.level - 1]}
                    </Text>

                    <View style={styles.levelCardFooter}>
                      <Text
                        style={[
                          styles.levelStatus,
                          !available && { color: theme.textSecondary },
                        ]}
                      >
                        {available
                          ? textCount(total, copy.texts)
                          : copy.comingSoon}
                      </Text>
                      {available ? (
                        <View style={styles.arrowButton}>
                          <Ionicons
                            name="arrow-forward"
                            size={16}
                            color={item.colors[1]}
                          />
                        </View>
                      ) : null}
                    </View>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.footerNote}>
          <Ionicons name="sparkles-outline" size={16} color="#5B8F7B" />
          <Text style={styles.footerText}>{copy.footer}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: isDark ? "#171A19" : "#FAF9F5" },
    content: { paddingHorizontal: 17 },
    topBar: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    topBarTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    topBarTitleText: { fontSize: 12.5, fontWeight: "800", color: theme.text },
    topBarSpacer: { width: 40 },
    pressed: { opacity: 0.72 },
    hero: {
      minHeight: 226,
      borderRadius: 29,
      padding: 21,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: isDark ? "rgba(124,177,155,0.18)" : "#D7E9DF",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    heroGlow: {
      position: "absolute",
      width: 190,
      height: 190,
      borderRadius: 999,
      right: -66,
      top: -82,
      backgroundColor: isDark
        ? "rgba(126,184,159,0.10)"
        : "rgba(255,255,255,0.72)",
    },
    heroCopy: { flex: 1, zIndex: 2, paddingRight: 78 },
    heroBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
      backgroundColor: isDark ? "rgba(91,151,125,0.18)" : "#FFFFFFB8",
    },
    heroBadgeText: { fontSize: 10.5, fontWeight: "900", color: "#427862" },
    title: {
      maxWidth: 220,
      marginTop: 14,
      fontSize: 25,
      lineHeight: 31,
      letterSpacing: -0.7,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      maxWidth: 235,
      marginTop: 8,
      fontSize: 12.5,
      lineHeight: 18,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    readyPill: {
      alignSelf: "flex-start",
      minHeight: 29,
      marginTop: 14,
      paddingHorizontal: 10,
      borderRadius: 999,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#FFFFFFC9",
    },
    readyDot: { width: 7, height: 7, borderRadius: 999, backgroundColor: "#4F9A78" },
    readyPillText: { fontSize: 11, fontWeight: "800", color: "#427862" },
    heroImageFrame: {
      position: "absolute",
      right: 16,
      bottom: 17,
      width: 88,
      height: 112,
      borderRadius: 23,
      overflow: "hidden",
      transform: [{ rotate: "3deg" }],
      borderWidth: 4,
      borderColor: isDark ? "#31463F" : "rgba(255,255,255,0.88)",
      shadowColor: "#315B4C",
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    heroImage: { width: "100%", height: "100%" },
    errorCard: {
      minHeight: 66,
      marginTop: 14,
      borderRadius: 19,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      backgroundColor: isDark ? "#342725" : "#FFF0EC",
      borderWidth: 1,
      borderColor: isDark ? "#573B37" : "#F5D4CD",
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
    errorAction: { fontSize: 11.5, fontWeight: "800", color: "#B46155" },
    levelGrid: {
      marginTop: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    levelCell: { width: "48.3%", marginBottom: 14 },
    levelPressable: { position: "relative" },
    cardPressed: { transform: [{ translateY: 3 }] },
    cardDepth: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 5,
      bottom: -4,
      borderRadius: 23,
    },
    levelCard: {
      minHeight: 174,
      borderRadius: 23,
      padding: 15,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.42)",
    },
    cardGlow: {
      position: "absolute",
      width: 92,
      height: 92,
      borderRadius: 999,
      right: -34,
      top: -41,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    levelCardTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    levelIcon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.22)",
    },
    lockedLevelIcon: {
      backgroundColor: isDark ? "#34383D" : "#DFE4DE",
      borderColor: "transparent",
    },
    levelNumber: {
      fontSize: 12,
      fontWeight: "900",
      color: "rgba(255,255,255,0.72)",
      letterSpacing: 1,
    },
    levelTitle: {
      marginTop: 14,
      fontSize: 20,
      lineHeight: 24,
      fontWeight: "900",
      letterSpacing: -0.5,
      color: "#FFFFFF",
    },
    levelDescription: {
      minHeight: 34,
      marginTop: 4,
      fontSize: 11.5,
      lineHeight: 16,
      fontWeight: "600",
      color: "rgba(255,255,255,0.84)",
    },
    levelCardFooter: {
      marginTop: "auto",
      paddingTop: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    levelStatus: { fontSize: 11.5, fontWeight: "900", color: "#FFFFFF" },
    arrowButton: {
      width: 29,
      height: 29,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
    },
    footerNote: {
      marginTop: 3,
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      backgroundColor: isDark ? "#202824" : "#EEF4F0",
    },
    footerText: {
      flex: 1,
      fontSize: 11.5,
      lineHeight: 16,
      fontWeight: "600",
      color: theme.textSecondary,
    },
  });
