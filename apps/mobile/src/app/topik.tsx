import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TopikLevel } from "@/components/topik";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import { TopikService } from "@/services/topik.service";
import type {
  TopikAttemptMode,
  TopikCompletedExam,
  TopikExam,
} from "@/types/topik";
import { toTopikLanguage, topikText } from "@/types/topik";

const MODES: Array<{
  key: TopikAttemptMode;
  icon: keyof typeof Ionicons.glyphMap;
  titleKey: string;
  descriptionKey: string;
}> = [
  {
    key: "guided",
    icon: "bulb-outline",
    titleKey: "topik.modes.guided",
    descriptionKey: "topik.modes.guidedDescription",
  },
  {
    key: "mock_exam",
    icon: "timer-outline",
    titleKey: "topik.modes.mockExam",
    descriptionKey: "topik.modes.mockExamDescription",
  },
];

const WRITING_PRACTICE_TYPES: Array<{
  number: 51 | 52 | 53 | 54;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { number: 51, icon: "mail-outline" },
  { number: 52, icon: "git-compare-outline" },
  { number: 53, icon: "bar-chart-outline" },
  { number: 54, icon: "reader-outline" },
];

export default function TopikHomeScreen() {
  const { t, i18n } = useTranslation();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const params = useLocalSearchParams<{
    level?: TopikLevel;
    section?: "reading" | "listening" | "writing";
  }>();
  const levelParam = Array.isArray(params.level)
    ? params.level[0]
    : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const sectionParam = Array.isArray(params.section)
    ? params.section[0]
    : params.section;
  const section =
    sectionParam === "listening"
      ? "listening"
      : sectionParam === "writing"
        ? "writing"
        : "reading";
  const examType = level === "1" ? "topik_i" : "topik_ii";
  const roman = level === "1" ? "I" : "II";
  const [exams, setExams] = useState<TopikExam[]>([]);
  const [completedExams, setCompletedExams] = useState<TopikCompletedExam[]>(
    [],
  );
  const [selectedExamCode, setSelectedExamCode] = useState<string | null>(null);
  const [mode, setMode] = useState<TopikAttemptMode>("guided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadExams = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [data, completedIds] = await Promise.all([
        TopikService.listExams(),
        TopikService.getCompletedExams().catch(() => []),
      ]);
      const matchingExams = data.filter(
        (exam) => exam.examType === examType && exam.section === section,
      );
      setExams(matchingExams);
      setCompletedExams(completedIds);
      setSelectedExamCode((current) =>
        matchingExams.some((exam) => exam.code === current)
          ? current
          : (matchingExams[0]?.code ?? null),
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [examType, section]);

  useEffect(() => {
    void loadExams();
  }, [loadExams]);

  const selectedExam = exams.find((exam) => exam.code === selectedExamCode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel={t("topik.common.back")}
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="chevron-back" size={25} color={palette.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("topik.home.header", {
            level: roman,
            section: t(`topik.home.${section}`),
          })}
        </Text>
        <Pressable
          accessibilityLabel={t("topik.home.openStats")}
          onPress={() => router.push("/topik-stats")}
          style={styles.iconButton}
        >
          <Ionicons name="stats-chart" size={21} color={palette.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>
              TOPIK {roman} · {t(`topik.home.${section}`).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.heroTitle}>
            {t(
              section === "listening"
                ? "topik.home.listeningHeroTitle"
                : section === "writing"
                  ? "topik.home.writingHeroTitle"
                  : "topik.home.heroTitle",
            )}
          </Text>
          <Text style={styles.heroDescription}>
            {t(
              section === "listening"
                ? "topik.home.listeningHeroDescription"
                : section === "writing"
                  ? "topik.home.writingHeroDescription"
                  : "topik.home.heroDescription",
            )}
          </Text>
          <View style={styles.heroMetrics}>
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.totalQuestions ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>
                {t("topik.common.questions")}
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View>
              <Text style={styles.metricValue}>
                {mode === "mock_exam"
                  ? (selectedExam?.durationMinutes ?? "—")
                  : "∞"}
              </Text>
              <Text style={styles.metricLabel}>
                {mode === "mock_exam"
                  ? t("topik.common.minutes")
                  : t("topik.common.untimed")}
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.totalPoints ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>{t("topik.common.points")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("topik.home.examSelection")}
          </Text>
          <Text style={styles.sectionCaption}>
            {t(
              section === "listening"
                ? "topik.home.listeningTest"
                : section === "writing"
                  ? "topik.home.writingTest"
                  : "topik.home.readingTest",
            )}
          </Text>
        </View>

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color={palette.primary} />
            <Text style={styles.stateText}>{t("topik.home.loading")}</Text>
          </View>
        ) : error ? (
          <View style={styles.stateCard}>
            <Ionicons
              name="cloud-offline-outline"
              size={28}
              color={palette.danger}
            />
            <Text style={styles.stateTitle}>{t("topik.home.loadError")}</Text>
            <Pressable onPress={loadExams} style={styles.retryButton}>
              <Text style={styles.retryText}>{t("topik.common.retry")}</Text>
            </Pressable>
          </View>
        ) : exams.length === 0 ? (
          <View style={styles.stateCard}>
            <Ionicons
              name="documents-outline"
              size={29}
              color={palette.textMuted}
            />
            <Text style={styles.stateTitle}>
              {t("topik.home.emptyTitle", {
                level: roman,
                section: t(`topik.home.${section}`),
              })}
            </Text>
            <Text style={styles.stateText}>
              {t("topik.home.emptyDescription")}
            </Text>
          </View>
        ) : (
          <View style={styles.examList}>
            {exams.map((exam) => {
              const selected = exam.code === selectedExamCode;
              const completed = completedExams.find(
                (item) => item.examId === exam.id,
              );
              return (
                <View
                  key={exam.id}
                  style={[styles.examCard, selected && styles.examCardSelected]}
                >
                  <Pressable
                    onPress={() => setSelectedExamCode(exam.code)}
                    style={({ pressed }) => [
                      styles.examMain,
                      pressed && styles.examMainPressed,
                    ]}
                  >
                    <View style={styles.examNumber}>
                      <Text style={styles.examNumberText}>
                        {String(exam.round ?? 1).padStart(2, "0")}
                      </Text>
                    </View>
                    <View style={styles.examInfo}>
                      <Text style={styles.examTitle}>
                        {topikText(exam.title, language)}
                      </Text>
                      <Text style={styles.examMeta}>
                        {t(
                          mode === "mock_exam"
                            ? "topik.home.examMeta"
                            : "topik.home.examMetaUntimed",
                          {
                            questions: exam.totalQuestions,
                            minutes: exam.durationMinutes,
                            points: exam.totalPoints,
                          },
                        )}
                      </Text>
                    </View>
                    <Ionicons
                      name={selected ? "checkmark-circle" : "ellipse-outline"}
                      size={23}
                      color={selected ? palette.primary : palette.textMuted}
                    />
                  </Pressable>
                  {completed && (
                    <View style={styles.completedRow}>
                      <View style={styles.completedBadge}>
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color={palette.success}
                        />
                        <Text style={styles.completedBadgeText}>
                          {t("topik.home.completed")}
                        </Text>
                      </View>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() =>
                          section === "writing"
                            ? router.push({
                                pathname: "/topik-writing",
                                params: {
                                  examCode: exam.code,
                                  reviewAttemptId: completed.latestAttemptId,
                                },
                              })
                            : router.push({
                                pathname: "/topik-result",
                                params: {
                                  attemptId: completed.latestAttemptId,
                                },
                              })
                        }
                        style={({ pressed }) => [
                          styles.resultButton,
                          pressed && styles.buttonPressed,
                        ]}
                      >
                        <Text style={styles.resultButtonText}>
                          {t("topik.home.viewResult")}
                        </Text>
                        <Ionicons
                          name="arrow-forward"
                          size={15}
                          color={palette.primary}
                        />
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {section === "writing" && selectedExam && (
          <View style={styles.practiceSection}>
            <View style={styles.practiceHeading}>
              <View style={styles.practiceHeadingCopy}>
                <Text style={styles.sectionTitle}>
                  {t("topik.home.writingPracticeTitle")}
                </Text>
                <Text style={styles.practiceDescription}>
                  {t("topik.home.writingPracticeDescription")}
                </Text>
              </View>
              <View style={styles.practiceBadge}>
                <Text style={styles.practiceBadgeText}>
                  {t("topik.home.writingPracticeBadge")}
                </Text>
              </View>
            </View>

            <View style={styles.practiceGrid}>
              {WRITING_PRACTICE_TYPES.map((item) => (
                <Pressable
                  key={item.number}
                  onPress={() =>
                    router.push({
                      pathname: "/topik-writing",
                      params: {
                        examCode: selectedExam.code,
                        mode: "guided",
                        questionNumber: String(item.number),
                      },
                    })
                  }
                  style={({ pressed }) => [
                    styles.practiceCard,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <View style={styles.practiceCardTop}>
                    <View style={styles.practiceIcon}>
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={palette.purple}
                      />
                    </View>
                    <Text style={styles.practiceNumber}>{item.number}</Text>
                  </View>
                  <Text style={styles.practiceTitle}>
                    {t(`topik.home.writingPractice${item.number}Title`)}
                  </Text>
                  <Text style={styles.practiceText}>
                    {t(`topik.home.writingPractice${item.number}Description`)}
                  </Text>
                  <View style={styles.practiceAction}>
                    <Text style={styles.practiceActionText}>
                      {t("topik.home.practiceNow")}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={14}
                      color={palette.purple}
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("topik.home.studyMode")}</Text>
          <Text style={styles.sectionCaption}>{t("topik.home.mode")}</Text>
        </View>
        <View style={styles.modeList}>
          {MODES.map((item) => {
            const selected = item.key === mode;
            const color =
              item.key === "guided" ? palette.warning : palette.primary;
            return (
              <Pressable
                key={item.key}
                onPress={() => setMode(item.key)}
                style={[styles.modeCard, selected && styles.modeCardSelected]}
              >
                <View
                  style={[
                    styles.modeIcon,
                    {
                      backgroundColor: palette.isDark
                        ? palette.surfaceMuted
                        : `${color}18`,
                    },
                  ]}
                >
                  <Ionicons name={item.icon} size={25} color={color} />
                </View>
                <View style={styles.modeInfo}>
                  <Text style={styles.modeTitle}>{t(item.titleKey)}</Text>
                  <Text style={styles.modeDescription}>
                    {t(item.descriptionKey)}
                  </Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={!selectedExam}
          onPress={() =>
            selectedExam &&
            router.push({
              pathname:
                section === "writing" ? "/topik-writing" : "/topik-exam",
              params: { examCode: selectedExam.code, mode },
            })
          }
          style={({ pressed }) => [
            styles.startButton,
            !selectedExam && styles.buttonDisabled,
            pressed && selectedExam && styles.buttonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>
            {mode === "guided"
              ? t("topik.home.startGuided")
              : t("topik.home.startMock")}
          </Text>
          <Ionicons name="arrow-forward" size={21} color={palette.white} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: palette.bg },
    header: {
      height: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      backgroundColor: palette.bg,
      // marginTop: 30,
    },
    iconButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: { color: palette.text, fontSize: 16, fontWeight: "900" },
    content: { paddingHorizontal: 18, paddingBottom: 42, gap: 18 },
    hero: {
      overflow: "hidden",
      borderRadius: 22,
      backgroundColor: palette.hero,
      padding: 23,
    },
    heroBadge: {
      alignSelf: "flex-start",
      borderRadius: 20,
      backgroundColor: palette.heroBadge,
      paddingHorizontal: 11,
      paddingVertical: 6,
    },
    heroBadgeText: {
      color: palette.heroMuted,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    heroTitle: {
      color: palette.white,
      fontSize: 23,
      lineHeight: 32,
      fontWeight: "900",
      marginTop: 16,
      letterSpacing: -0.8,
    },
    heroDescription: {
      color: palette.heroMuted,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 10,
    },
    heroMetrics: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: 22,
      borderTopWidth: 1,
      borderTopColor: palette.heroDivider,
      paddingTop: 16,
    },
    metricValue: {
      color: palette.white,
      fontSize: 18,
      fontWeight: "900",
      textAlign: "center",
    },
    metricLabel: {
      color: palette.heroSubtle,
      fontSize: 10,
      marginTop: 2,
      textAlign: "center",
    },
    metricDivider: {
      width: 1,
      height: 29,
      backgroundColor: palette.heroDividerStrong,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginTop: 3,
    },
    sectionTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
    sectionCaption: {
      color: palette.textMuted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1,
    },
    examList: { gap: 10 },
    practiceSection: { gap: 12, marginTop: 4 },
    practiceHeading: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
    },
    practiceHeadingCopy: { flex: 1, gap: 4 },
    practiceDescription: {
      color: palette.textSecondary,
      fontSize: 11,
      lineHeight: 17,
    },
    practiceBadge: {
      borderRadius: 999,
      backgroundColor: palette.purpleSoft,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    practiceBadgeText: {
      color: palette.purple,
      fontSize: 9,
      fontWeight: "900",
    },
    practiceGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    practiceCard: {
      width: "48.5%",
      minHeight: 168,
      gap: 7,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 17,
      backgroundColor: palette.surfaceElevated,
      padding: 13,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.16 : 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    practiceCardTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    practiceIcon: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      backgroundColor: palette.purpleSoft,
    },
    practiceNumber: {
      color: palette.textSubtle,
      fontSize: 18,
      fontWeight: "900",
    },
    practiceTitle: { color: palette.text, fontSize: 13, fontWeight: "900" },
    practiceText: {
      flex: 1,
      color: palette.textSecondary,
      fontSize: 10,
      lineHeight: 15,
    },
    practiceAction: { flexDirection: "row", alignItems: "center", gap: 4 },
    practiceActionText: {
      color: palette.purple,
      fontSize: 10,
      fontWeight: "900",
    },
    examCard: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      backgroundColor: palette.surface,
    },
    examCardSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    examMain: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      padding: 14,
    },
    examMainPressed: { opacity: 0.78 },
    examNumber: {
      width: 44,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: palette.primaryStrong,
    },
    examNumberText: { color: palette.white, fontSize: 16, fontWeight: "900" },
    examInfo: { flex: 1, gap: 4 },
    examTitle: { color: palette.text, fontSize: 14, fontWeight: "900" },
    examMeta: { color: palette.textSecondary, fontSize: 11 },
    completedRow: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    completedBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 10,
      backgroundColor: palette.successSoft,
      paddingHorizontal: 7,
      paddingVertical: 4,
    },
    completedBadgeText: {
      color: palette.successText,
      fontSize: 9,
      fontWeight: "900",
    },
    resultButton: {
      minHeight: 30,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 9,
      backgroundColor: palette.primarySoft,
      paddingHorizontal: 10,
    },
    resultButtonText: {
      color: palette.primary,
      fontSize: 10,
      fontWeight: "900",
    },
    modeList: { gap: 10 },
    modeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      backgroundColor: palette.surface,
      padding: 14,
    },
    modeCardSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    modeIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    modeInfo: { flex: 1, gap: 3 },
    modeTitle: { color: palette.text, fontSize: 14, fontWeight: "900" },
    modeDescription: {
      color: palette.textSecondary,
      fontSize: 11,
      lineHeight: 17,
    },
    radio: {
      width: 21,
      height: 21,
      borderWidth: 2,
      borderColor: palette.borderStrong,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSelected: { borderColor: palette.primary },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: palette.primary,
    },
    startButton: {
      minHeight: 57,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderRadius: 16,
      backgroundColor: palette.primaryStrong,
      marginTop: 5,
      // marginBottom: 20,
    },
    startButtonText: { color: palette.white, fontSize: 14, fontWeight: "900" },
    buttonDisabled: { opacity: 0.45 },
    buttonPressed: { opacity: 0.82 },
    stateCard: {
      minHeight: 128,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 14,
      backgroundColor: palette.surface,
      padding: 20,
    },
    stateTitle: {
      color: palette.text,
      fontSize: 14,
      fontWeight: "800",
      textAlign: "center",
    },
    stateText: {
      color: palette.textSecondary,
      fontSize: 11,
      textAlign: "center",
    },
    retryButton: {
      borderRadius: 9,
      backgroundColor: palette.primaryStrong,
      paddingHorizontal: 17,
      paddingVertical: 9,
      marginTop: 4,
    },
    retryText: { color: palette.white, fontSize: 13, fontWeight: "800" },
  });
