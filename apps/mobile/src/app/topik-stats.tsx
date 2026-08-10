import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import topikKo from "@/locales/topik/ko";
import { TopikService } from "@/services/topik.service";
import type {
  TopikHistoryItem,
  TopikQuestionPerformance,
  TopikStatsSummary,
} from "@/types/topik";
import { toTopikLanguage } from "@/types/topik";

const MODE_KEYS = {
  guided: "topik.modes.guided",
  practice: "topik.modes.practice",
  mock_exam: "topik.modes.mockExam",
} as const;

export default function TopikStatsScreen() {
  const { t, i18n } = useTranslation();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const [summary, setSummary] = useState<TopikStatsSummary | null>(null);
  const [weakQuestions, setWeakQuestions] = useState<TopikQuestionPerformance[]>([]);
  const [history, setHistory] = useState<TopikHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [summaryData, weakData, historyData] = await Promise.all([
        TopikService.getStatsSummary(),
        TopikService.getWeakQuestions(6),
        TopikService.getHistory(6),
      ]);
      setSummary(summaryData);
      setWeakQuestions(weakData);
      setHistory(historyData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable accessibilityLabel={t("topik.common.back")} onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={25} color={palette.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>{t("topik.stats.header")}</Text>
        <Pressable
          accessibilityLabel={t("topik.common.refresh")}
          onPress={loadStats}
          style={styles.iconButton}
        >
          <Ionicons name="refresh" size={21} color={palette.primary} />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.stateText}>{t("topik.stats.loading")}</Text>
        </View>
      ) : error || !summary ? (
        <View style={styles.centered}>
          <Ionicons name="cloud-offline-outline" size={34} color={palette.danger} />
          <Text style={styles.errorTitle}>{t("topik.stats.loadFailed")}</Text>
          <Pressable onPress={loadStats} style={styles.retryButton}>
            <Text style={styles.retryText}>{t("topik.common.retry")}</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>{t("topik.stats.reportEyebrow").toUpperCase()}</Text>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>{t("topik.stats.overallAccuracy")}</Text>
                <Text style={styles.accuracy}>{summary.accuracy}%</Text>
              </View>
              <View style={styles.ring}>
                <Text style={styles.ringValue}>{summary.totalQuestions}</Text>
                <Text style={styles.ringLabel}>{t("topik.stats.solvedQuestions")}</Text>
              </View>
            </View>
            <View style={styles.heroBottom}>
              <Text style={styles.heroStat}>{t("topik.stats.bestScore", { score: summary.bestScore })}</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroStat}>{t("topik.stats.averageScore", { score: summary.averageScore })}</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroStat}>{t("topik.stats.studyMinutes", { minutes: Math.round(summary.totalStudySeconds / 60) })}</Text>
            </View>
          </View>

          <View style={styles.quickGrid}>
            <View style={styles.quickCard}>
              <Ionicons name="school-outline" size={21} color={palette.warning} />
              <Text style={styles.quickValue}>{summary.guidedCount}</Text>
              <Text style={styles.quickLabel}>{t("topik.stats.guided")}</Text>
            </View>
            <View style={styles.quickCard}>
              <Ionicons name="timer-outline" size={21} color={palette.primary} />
              <Text style={styles.quickValue}>{summary.mockExamCount}</Text>
              <Text style={styles.quickLabel}>{t("topik.stats.mockExam")}</Text>
            </View>
            <View style={styles.quickCard}>
              <Ionicons name="bulb-outline" size={21} color={palette.purple} />
              <Text style={styles.quickValue}>{summary.hintViewCount}</Text>
              <Text style={styles.quickLabel}>{t("topik.stats.hintsUsed")}</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("topik.stats.typePerformance")}</Text>
            <Text style={styles.sectionCaption}>{t("topik.stats.recentCumulative")}</Text>
          </View>
          <View style={styles.card}>
            {summary.questionTypes.length === 0 ? (
              <Text style={styles.emptyText}>{t("topik.stats.typeEmpty")}</Text>
            ) : (
              summary.questionTypes.map((type) => (
                <View key={type.questionType} style={styles.typeRow}>
                  <View style={styles.typeTop}>
                    <Text style={styles.typeName}>{t(`topik.questionTypes.${type.questionType}`)}</Text>
                    <Text style={styles.typeAccuracy}>{type.accuracy}%</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${type.accuracy}%` }]} />
                  </View>
                  <Text style={styles.typeMeta}>
                    {t("topik.stats.typeMeta", {
                      correct: type.correct,
                      attempted: type.attempted,
                      seconds: Math.round(type.averageDurationMs / 1000),
                    })}
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("topik.stats.focusedReview")}</Text>
            <Text style={styles.sectionCaption}>{t("topik.stats.repeatedMistakes")}</Text>
          </View>
          <View style={styles.card}>
            {weakQuestions.length === 0 ? (
              <View style={styles.emptyRow}>
                <Ionicons name="sparkles-outline" size={22} color={palette.success} />
                <Text style={styles.emptyText}>{t("topik.stats.weakEmpty")}</Text>
              </View>
            ) : (
              weakQuestions.map((question) => (
                <View key={`${question.questionId}-${question.questionVersion}`} style={styles.weakRow}>
                  <View style={styles.weakNumber}>
                    <Text style={styles.weakNumberText}>{question.questionNumber}</Text>
                  </View>
                  <View style={styles.weakInfo}>
                    <Text style={styles.weakTitle}>{t(`topik.questionTypes.${question.questionType}`)}</Text>
                    <Text style={styles.weakMeta}>
                      {t("topik.stats.weakMeta", {
                        wrong: question.wrongCount,
                        streak: question.consecutiveWrong,
                      })}
                    </Text>
                  </View>
                  <Text style={styles.weakAccuracy}>{question.accuracy}%</Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("topik.stats.recentStudy")}</Text>
            <Text style={styles.sectionCaption}>{t("topik.stats.submittedExams")}</Text>
          </View>
          <View style={styles.card}>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>{t("topik.stats.historyEmpty")}</Text>
            ) : (
              history.map((item) => (
                <View key={item.attemptId} style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyMode}>{t(MODE_KEYS[item.mode])}</Text>
                    <Text style={styles.historyDate}>
                      {new Date(item.submittedAt).toLocaleDateString(
                        i18n.resolvedLanguage ?? i18n.language,
                      )}
                    </Text>
                  </View>
                  <View style={styles.historyScoreWrap}>
                    <Text style={styles.historyScore}>{t("topik.stats.historyScore", { score: item.score })}</Text>
                    <Text style={styles.historyAccuracy}>{t("topik.stats.historyAccuracy", { accuracy: item.accuracy })}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.bg },
  header: { minHeight: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 13 },
  iconButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: palette.text, fontSize: 16, fontWeight: "900" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: 11, padding: 24 },
  stateText: { color: palette.textSecondary, fontSize: 13 },
  errorTitle: { color: palette.text, fontSize: 15, fontWeight: "800" },
  retryButton: { borderRadius: 10, backgroundColor: palette.primaryStrong, paddingHorizontal: 18, paddingVertical: 10 },
  retryText: { color: palette.white, fontWeight: "800" },
  content: { gap: 17, paddingHorizontal: 16, paddingBottom: 40 },
  hero: { borderRadius: 22, backgroundColor: palette.hero, padding: 21 },
  heroEyebrow: { color: palette.heroSubtle, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  heroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14 },
  heroLabel: { color: palette.heroMuted, fontSize: 12, fontWeight: "700" },
  accuracy: { color: palette.white, fontSize: 42, lineHeight: 52, fontWeight: "900" },
  ring: { width: 84, height: 84, alignItems: "center", justifyContent: "center", borderWidth: 7, borderColor: palette.primary, borderRadius: 42, backgroundColor: palette.primaryStrong },
  ringValue: { color: palette.white, fontSize: 18, fontWeight: "900" },
  ringLabel: { color: palette.heroMuted, fontSize: 10 },
  heroBottom: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 7, borderTopWidth: 1, borderTopColor: palette.heroDivider, marginTop: 17, paddingTop: 14 },
  heroStat: { color: palette.heroMuted, fontSize: 11, fontWeight: "700" },
  heroDot: { color: palette.heroSubtle, fontSize: 10 },
  quickGrid: { flexDirection: "row", gap: 9 },
  quickCard: { flex: 1, alignItems: "center", gap: 4, borderWidth: 1, borderColor: palette.border, borderRadius: 14, backgroundColor: palette.surface, paddingVertical: 14 },
  quickValue: { color: palette.text, fontSize: 18, fontWeight: "900" },
  quickLabel: { color: palette.textSecondary, fontSize: 10 },
  sectionHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: 2 },
  sectionTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
  sectionCaption: { color: palette.textMuted, fontSize: 10, fontWeight: "700" },
  card: { gap: 15, borderWidth: 1, borderColor: palette.border, borderRadius: 15, backgroundColor: palette.surface, padding: 15 },
  typeRow: { gap: 6 },
  typeTop: { flexDirection: "row", justifyContent: "space-between" },
  typeName: { color: palette.text, fontSize: 12, fontWeight: "800" },
  typeAccuracy: { color: palette.primary, fontSize: 12, fontWeight: "900" },
  barTrack: { height: 7, overflow: "hidden", borderRadius: 4, backgroundColor: palette.surfaceMuted },
  barFill: { height: "100%", borderRadius: 4, backgroundColor: palette.primary },
  typeMeta: { color: palette.textMuted, fontSize: 10 },
  emptyRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  emptyText: { flex: 1, color: palette.textSecondary, fontSize: 12, lineHeight: 19 },
  weakRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  weakNumber: { width: 39, height: 39, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: palette.dangerSoft },
  weakNumberText: { color: palette.dangerText, fontSize: 13, fontWeight: "900" },
  weakInfo: { flex: 1, gap: 2 },
  weakTitle: { color: palette.text, fontSize: 12, fontWeight: "800" },
  weakMeta: { color: palette.textMuted, fontSize: 10 },
  weakAccuracy: { color: palette.dangerText, fontSize: 12, fontWeight: "900" },
  historyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: palette.divider, paddingBottom: 11 },
  historyMode: { color: palette.text, fontSize: 12, fontWeight: "900" },
  historyDate: { color: palette.textMuted, fontSize: 10, marginTop: 3 },
  historyScoreWrap: { alignItems: "flex-end", gap: 2 },
  historyScore: { color: palette.primary, fontSize: 14, fontWeight: "900" },
  historyAccuracy: { color: palette.textSecondary, fontSize: 10 },
});
