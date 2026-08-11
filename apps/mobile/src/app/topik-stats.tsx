import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  TopikTypePerformance,
} from "@/types/topik";
import { toTopikLanguage } from "@/types/topik";

type StatsExamType = "topik_i" | "topik_ii";
type StatsSection = "all" | "listening" | "reading" | "writing";
type ApiSection = Exclude<StatsSection, "all">;

const MODE_KEYS = {
  guided: "topik.modes.guided",
  practice: "topik.modes.practice",
  mock_exam: "topik.modes.mockExam",
} as const;

const SECTION_ICONS = {
  all: "apps-outline",
  listening: "headset-outline",
  reading: "book-outline",
  writing: "create-outline",
} as const;

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizedExamType(level?: string): StatsExamType {
  return level === "1" || level === "topik_i" ? "topik_i" : "topik_ii";
}

function normalizedSection(value?: string): StatsSection {
  return value === "listening" || value === "reading" || value === "writing"
    ? value
    : "all";
}

export default function TopikStatsScreen() {
  const { t, i18n } = useTranslation();
  const params = useLocalSearchParams<{ level?: string; section?: string }>();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const [examType, setExamType] = useState<StatsExamType>(() =>
    normalizedExamType(firstParam(params.level)),
  );
  const [section, setSection] = useState<StatsSection>(() =>
    normalizedSection(firstParam(params.section)),
  );
  const [summary, setSummary] = useState<TopikStatsSummary | null>(null);
  const [weakQuestions, setWeakQuestions] = useState<
    TopikQuestionPerformance[]
  >([]);
  const [history, setHistory] = useState<TopikHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const activeSection = section === "all" ? undefined : section;
  const levelRoman = examType === "topik_i" ? "I" : "II";
  const heroColors =
    examType === "topik_i" ? palette.levelOneHero : palette.levelTwoHero;
  const sectionOptions: StatsSection[] =
    examType === "topik_i"
      ? ["all", "listening", "reading"]
      : ["all", "listening", "reading", "writing"];

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [summaryData, weakData, historyData] = await Promise.all([
        TopikService.getStatsSummary(examType, activeSection),
        TopikService.getWeakQuestions(examType, activeSection, 6),
        TopikService.getHistory(examType, activeSection, 6),
      ]);
      setSummary(summaryData);
      setWeakQuestions(weakData);
      setHistory(historyData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [activeSection, examType]);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  const selectExamType = (nextType: StatsExamType) => {
    setExamType(nextType);
    if (nextType === "topik_i" && section === "writing") {
      setSection("all");
    }
  };

  const sortedTypes = useMemo(
    () =>
      [...(summary?.questionTypes ?? [])].sort(
        (left, right) =>
          left.accuracy - right.accuracy || right.attempted - left.attempted,
      ),
    [summary?.questionTypes],
  );
  const weakestType = sortedTypes[0];
  const totalAttempts = summary
    ? summary.mockExamCount + summary.guidedCount + summary.practiceCount
    : 0;
  const independentRate = summary?.totalQuestions
    ? Math.round(
        (summary.correctWithoutHintCount / summary.totalQuestions) * 1000,
      ) / 10
    : 0;
  const scoredHistory = useMemo(
    () => history.filter((item) => item.section !== "writing"),
    [history],
  );
  const trend = useMemo(() => [...scoredHistory].reverse(), [scoredHistory]);

  const insight = getInsight(
    summary,
    weakestType,
    totalAttempts,
    section === "writing",
  );
  const insightTypeName = weakestType
    ? t(`topik.questionTypes.${weakestType.questionType}`)
    : "";

  const openHistory = (item: TopikHistoryItem) => {
    if (item.section === "writing") {
      router.push({
        pathname: "/topik-writing",
        params: {
          examCode: item.examCode,
          reviewAttemptId: item.attemptId,
        },
      });
      return;
    }

    router.push({
      pathname: "/topik-result",
      params: { attemptId: item.attemptId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={heroColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerShell}
      >
        <View style={styles.headerOrbLarge} />
        <View style={styles.headerOrbSmall} />
        <View style={styles.header}>
          <Pressable
            accessibilityLabel={t("topik.common.back")}
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="chevron-back" size={24} color={palette.white} />
          </Pressable>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerEyebrow}>
              {t("topik.stats.reportEyebrow").toUpperCase()}
            </Text>
            <Text style={styles.headerTitle}>{t("topik.stats.header")}</Text>
          </View>
          <Pressable
            accessibilityLabel={t("topik.common.refresh")}
            onPress={loadStats}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="refresh" size={20} color={palette.white} />
          </Pressable>
        </View>

        <View style={styles.levelTabs}>
          {(["topik_i", "topik_ii"] as const).map((type) => {
            const active = type === examType;
            return (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                key={type}
                onPress={() => selectExamType(type)}
                style={({ pressed }) => [
                  styles.levelTab,
                  active && styles.levelTabActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.levelTabText,
                    active && styles.levelTabTextActive,
                  ]}
                >
                  TOPIK {type === "topik_i" ? "I" : "II"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {!loading && !error && summary && (
          <View style={styles.hero}>
            <View style={styles.heroMain}>
              <View style={styles.accuracyBlock}>
                <Text style={styles.heroLabel}>
                  {t("topik.stats.overallAccuracy")}
                </Text>
                <View style={styles.accuracyLine}>
                  <Text style={styles.accuracy}>{summary.accuracy}</Text>
                  <Text style={styles.accuracyUnit}>%</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, insight.badgeStyle(styles)]}>
                <View style={[styles.statusDot, insight.dotStyle(styles)]} />
                <Text style={styles.statusText}>
                  {t(`topik.stats.${insight.statusKey}`)}
                </Text>
              </View>
            </View>
            <View style={styles.scoreStrip}>
              <HeroScore
                label={t("topik.stats.latestScore")}
                value={summary.lastScore}
                styles={styles}
              />
              <View style={styles.scoreDivider} />
              <HeroScore
                label={t("topik.stats.best")}
                value={summary.bestScore}
                styles={styles}
              />
              <View style={styles.scoreDivider} />
              <HeroScore
                label={t("topik.stats.average")}
                value={summary.averageScore}
                styles={styles}
              />
            </View>
          </View>
        )}
      </LinearGradient>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.stateText}>{t("topik.stats.loading")}</Text>
        </View>
      ) : error || !summary ? (
        <View style={styles.centered}>
          <Ionicons
            name="cloud-offline-outline"
            size={36}
            color={palette.danger}
          />
          <Text style={styles.errorTitle}>{t("topik.stats.loadFailed")}</Text>
          <Pressable onPress={loadStats} style={styles.retryButton}>
            <Text style={styles.retryText}>{t("topik.common.retry")}</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal
            contentContainerStyle={styles.sectionFilters}
            showsHorizontalScrollIndicator={false}
          >
            {sectionOptions.map((option) => {
              const active = option === section;
              return (
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  key={option}
                  onPress={() => setSection(option)}
                  style={({ pressed }) => [
                    styles.sectionFilter,
                    active && styles.sectionFilterActive,
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons
                    name={SECTION_ICONS[option]}
                    size={15}
                    color={active ? palette.white : palette.textSecondary}
                  />
                  <Text
                    style={[
                      styles.sectionFilterText,
                      active && styles.sectionFilterTextActive,
                    ]}
                  >
                    {option === "all"
                      ? t("topik.stats.allSections")
                      : t(`topik.home.${option}`)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={[styles.insightCard, insight.cardStyle(styles)]}>
            <View style={[styles.insightIcon, insight.iconStyle(styles)]}>
              <Ionicons
                name={insight.icon}
                size={21}
                color={insight.iconColor(palette)}
              />
            </View>
            <View style={styles.insightCopy}>
              <Text style={styles.insightEyebrow}>
                {t("topik.stats.insightTitle")}
              </Text>
              <Text style={styles.insightTitle}>
                {t(`topik.stats.${insight.messageKey}`, {
                  type: insightTypeName,
                  accuracy: weakestType?.accuracy ?? 0,
                })}
              </Text>
            </View>
          </View>

          <View style={styles.metricGrid}>
            <MetricCard
              icon="checkmark-done-outline"
              color={palette.success}
              softColor={palette.successSoft}
              label={t("topik.stats.completedTests")}
              value={String(totalAttempts)}
              styles={styles}
            />
            <MetricCard
              icon="layers-outline"
              color={palette.primary}
              softColor={palette.primarySoft}
              label={t("topik.stats.solvedQuestions")}
              value={String(summary.totalQuestions)}
              styles={styles}
            />
            <MetricCard
              icon="time-outline"
              color={palette.warning}
              softColor={palette.warningSoft}
              label={t("topik.stats.studyTime")}
              value={formatStudyTime(summary.totalStudySeconds, t)}
              styles={styles}
            />
            <MetricCard
              icon="flash-outline"
              color={palette.purple}
              softColor={palette.purpleSoft}
              label={t("topik.stats.independentRate")}
              value={`${independentRate}%`}
              styles={styles}
            />
          </View>

          <SectionHeading
            caption={t("topik.stats.latestSix")}
            title={t("topik.stats.scoreTrend")}
            styles={styles}
          />
          <View style={styles.trendCard}>
            {trend.length === 0 ? (
              <EmptyState
                icon="analytics-outline"
                text={t(
                  section === "writing"
                    ? "topik.stats.writingTrendUnavailable"
                    : "topik.stats.trendEmpty",
                )}
                palette={palette}
                styles={styles}
              />
            ) : (
              <>
                <View style={styles.trendTopRow}>
                  <View>
                    <Text style={styles.trendMainValue}>
                      {scoredHistory[0]?.score ?? 0}
                    </Text>
                    <Text style={styles.trendMainLabel}>
                      {t("topik.stats.latestResult")}
                    </Text>
                  </View>
                  <View style={styles.trendLegend}>
                    <View style={styles.trendLegendDot} />
                    <Text style={styles.trendLegendText}>
                      {t("topik.stats.scoreOutOf")}
                    </Text>
                  </View>
                </View>
                <View style={styles.chart}>
                  {trend.map((item, index) => (
                    <View key={item.attemptId} style={styles.chartColumn}>
                      <Text style={styles.chartScore}>{item.score}</Text>
                      <View style={styles.chartTrack}>
                        <LinearGradient
                          colors={
                            examType === "topik_i"
                              ? palette.levelOneGradient
                              : palette.levelTwoGradient
                          }
                          style={[
                            styles.chartBar,
                            {
                              height: `${Math.max(6, Math.min(100, item.score))}%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.chartLabel}>{index + 1}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>

          <SectionHeading
            caption={t("topik.stats.weakFirst")}
            title={t("topik.stats.typePerformance")}
            styles={styles}
          />
          <View style={styles.card}>
            {sortedTypes.length === 0 ? (
              <EmptyState
                icon="grid-outline"
                text={t(
                  section === "writing"
                    ? "topik.stats.writingTypeUnavailable"
                    : "topik.stats.typeEmpty",
                )}
                palette={palette}
                styles={styles}
              />
            ) : (
              sortedTypes.map((type, index) => {
                const tone = getAccuracyTone(type.accuracy, palette);
                return (
                  <View key={type.questionType} style={styles.typeRow}>
                    <View style={styles.typeTop}>
                      <View style={styles.typeRank}>
                        <Text style={styles.typeRankText}>
                          {String(index + 1).padStart(2, "0")}
                        </Text>
                      </View>
                      <View style={styles.typeNameWrap}>
                        <Text style={styles.typeName}>
                          {t(`topik.questionTypes.${type.questionType}`)}
                        </Text>
                        {language !== "ko" && (
                          <Text style={styles.typeNameKo}>
                            {topikKo.questionTypes[type.questionType]}
                          </Text>
                        )}
                      </View>
                      <View
                        style={[
                          styles.skillBadge,
                          { backgroundColor: tone.softColor },
                        ]}
                      >
                        <Text
                          style={[styles.skillBadgeText, { color: tone.color }]}
                        >
                          {type.accuracy}%
                        </Text>
                      </View>
                    </View>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${Math.min(100, type.accuracy)}%`,
                            backgroundColor: tone.color,
                          },
                        ]}
                      />
                    </View>
                    <View style={styles.typeMetaRow}>
                      <Text style={styles.typeMeta}>
                        {t("topik.stats.typeMeta", {
                          correct: type.correct,
                          attempted: type.attempted,
                          seconds: Math.round(type.averageDurationMs / 1000),
                        })}
                      </Text>
                      <Text style={[styles.typeLevel, { color: tone.color }]}>
                        {t(`topik.stats.${tone.labelKey}`)}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <SectionHeading
            caption={t("topik.stats.repeatedMistakes")}
            title={t("topik.stats.reviewPriority")}
            styles={styles}
          />
          <View style={styles.card}>
            {weakQuestions.length === 0 ? (
              <EmptyState
                icon="sparkles-outline"
                text={t("topik.stats.weakEmpty")}
                palette={palette}
                styles={styles}
              />
            ) : (
              weakQuestions.map((question, index) => (
                <View
                  key={`${question.questionId}-${question.questionVersion}`}
                  style={[
                    styles.weakRow,
                    index < weakQuestions.length - 1 && styles.rowDivider,
                  ]}
                >
                  <View style={styles.weakNumber}>
                    <Text style={styles.weakNumberText}>
                      {question.questionNumber}
                    </Text>
                  </View>
                  <View style={styles.weakInfo}>
                    <Text style={styles.weakTitle}>
                      {t(`topik.questionTypes.${question.questionType}`)}
                    </Text>
                    {language !== "ko" && (
                      <Text style={styles.weakTitleKo}>
                        {topikKo.questionTypes[question.questionType]}
                      </Text>
                    )}
                    <Text style={styles.weakMeta}>
                      {examLabel(question.examRound, levelRoman, t)} ·{" "}
                      {t(`topik.home.${question.section}`)}
                    </Text>
                  </View>
                  <View style={styles.weakResult}>
                    <Text style={styles.weakAccuracy}>
                      {question.accuracy}%
                    </Text>
                    <Text style={styles.weakStreak}>
                      {t("topik.stats.wrongStreak", {
                        count: question.consecutiveWrong,
                      })}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          <SectionHeading
            caption={t("topik.stats.tapForResult")}
            title={t("topik.stats.recentAttempts")}
            styles={styles}
          />
          <View style={styles.historyCard}>
            {history.length === 0 ? (
              <EmptyState
                icon="document-text-outline"
                text={t("topik.stats.historyEmpty")}
                palette={palette}
                styles={styles}
              />
            ) : (
              history.map((item, index) => (
                <Pressable
                  key={item.attemptId}
                  onPress={() => openHistory(item)}
                  style={({ pressed }) => [
                    styles.historyRow,
                    index < history.length - 1 && styles.rowDivider,
                    pressed && styles.historyRowPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.historyIcon,
                      {
                        backgroundColor: sectionColor(item.section, palette)
                          .soft,
                      },
                    ]}
                  >
                    <Ionicons
                      name={SECTION_ICONS[item.section]}
                      size={19}
                      color={sectionColor(item.section, palette).color}
                    />
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>
                      {examLabel(item.examRound, levelRoman, t)} ·{" "}
                      {t(`topik.home.${item.section}`)}
                    </Text>
                    <Text style={styles.historyMeta}>
                      {t(MODE_KEYS[item.mode])} ·{" "}
                      {new Date(item.submittedAt).toLocaleDateString(
                        i18n.resolvedLanguage ?? i18n.language,
                        { month: "short", day: "numeric" },
                      )}
                    </Text>
                  </View>
                  {item.section === "writing" ? (
                    <View style={styles.historyScoreWrap}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={palette.success}
                      />
                      <Text style={styles.historyCompleted}>
                        {t("topik.stats.completedStatus")}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.historyScoreWrap}>
                      <Text style={styles.historyScore}>{item.score}</Text>
                      <Text style={styles.historyAccuracy}>
                        {item.accuracy}%
                      </Text>
                    </View>
                  )}
                  <Ionicons
                    name="chevron-forward"
                    size={17}
                    color={palette.textSubtle}
                  />
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

type Styles = ReturnType<typeof getStyles>;

function HeroScore({
  label,
  value,
  styles,
}: {
  label: string;
  value: number;
  styles: Styles;
}) {
  return (
    <View style={styles.heroScore}>
      <Text style={styles.heroScoreValue}>{value}</Text>
      <Text style={styles.heroScoreLabel}>{label}</Text>
    </View>
  );
}

function MetricCard({
  icon,
  color,
  softColor,
  label,
  value,
  styles,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  softColor: string;
  label: string;
  value: string;
  styles: Styles;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: softColor }]}>
        <Ionicons name={icon} size={19} color={color} />
      </View>
      <View style={styles.metricCopy}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
}

function SectionHeading({
  caption,
  title,
  styles,
}: {
  caption: string;
  title: string;
  styles: Styles;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCaption}>{caption}</Text>
    </View>
  );
}

function EmptyState({
  icon,
  text,
  palette,
  styles,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  palette: TopikPalette;
  styles: Styles;
}) {
  return (
    <View style={styles.emptyRow}>
      <View style={styles.emptyIcon}>
        <Ionicons name={icon} size={22} color={palette.primary} />
      </View>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

function getInsight(
  summary: TopikStatsSummary | null,
  weakestType?: TopikTypePerformance,
  totalAttempts = 0,
  writingOnly = false,
) {
  if (writingOnly) {
    return {
      statusKey: "statusWriting",
      messageKey: totalAttempts > 0 ? "insightWriting" : "insightWritingEmpty",
      icon: "create-outline" as const,
      badgeStyle: (styles: Styles) => styles.statusBadgeWriting,
      dotStyle: (styles: Styles) => styles.statusDotWriting,
      cardStyle: (styles: Styles) => styles.insightCardWriting,
      iconStyle: (styles: Styles) => styles.insightIconWriting,
      iconColor: (palette: TopikPalette) => palette.purple,
    };
  }

  if (!summary || summary.totalQuestions === 0) {
    return {
      statusKey: "statusReady",
      messageKey: totalAttempts > 0 ? "insightNoScored" : "insightEmpty",
      icon: "flag-outline" as const,
      badgeStyle: (styles: Styles) => styles.statusBadgeReady,
      dotStyle: (styles: Styles) => styles.statusDotReady,
      cardStyle: (styles: Styles) => styles.insightCardReady,
      iconStyle: (styles: Styles) => styles.insightIconReady,
      iconColor: (palette: TopikPalette) => palette.primary,
    };
  }

  if (summary.accuracy >= 80) {
    return {
      statusKey: "statusStrong",
      messageKey: weakestType ? "insightStrong" : "insightStrongNoType",
      icon: "trophy-outline" as const,
      badgeStyle: (styles: Styles) => styles.statusBadgeStrong,
      dotStyle: (styles: Styles) => styles.statusDotStrong,
      cardStyle: (styles: Styles) => styles.insightCardStrong,
      iconStyle: (styles: Styles) => styles.insightIconStrong,
      iconColor: (palette: TopikPalette) => palette.success,
    };
  }

  if (summary.accuracy >= 60) {
    return {
      statusKey: "statusGrowing",
      messageKey: weakestType ? "insightGrowing" : "insightGrowingNoType",
      icon: "trending-up-outline" as const,
      badgeStyle: (styles: Styles) => styles.statusBadgeGrowing,
      dotStyle: (styles: Styles) => styles.statusDotGrowing,
      cardStyle: (styles: Styles) => styles.insightCardGrowing,
      iconStyle: (styles: Styles) => styles.insightIconGrowing,
      iconColor: (palette: TopikPalette) => palette.warning,
    };
  }

  return {
    statusKey: "statusNeedsReview",
    messageKey: weakestType ? "insightNeedsReview" : "insightReviewNoType",
    icon: "compass-outline" as const,
    badgeStyle: (styles: Styles) => styles.statusBadgeReview,
    dotStyle: (styles: Styles) => styles.statusDotReview,
    cardStyle: (styles: Styles) => styles.insightCardReview,
    iconStyle: (styles: Styles) => styles.insightIconReview,
    iconColor: (palette: TopikPalette) => palette.danger,
  };
}

function getAccuracyTone(accuracy: number, palette: TopikPalette) {
  if (accuracy >= 80) {
    return {
      color: palette.success,
      softColor: palette.successSoft,
      labelKey: "skillStrong",
    };
  }
  if (accuracy >= 60) {
    return {
      color: palette.warning,
      softColor: palette.warningSoft,
      labelKey: "skillGrowing",
    };
  }
  return {
    color: palette.danger,
    softColor: palette.dangerSoft,
    labelKey: "skillNeedsReview",
  };
}

function formatStudyTime(
  seconds: number,
  t: (key: string, options?: Record<string, unknown>) => string,
) {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return t("topik.stats.minutesShort", { count: minutes });
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0
    ? t("topik.stats.hoursShort", { count: hours })
    : t("topik.stats.hoursMinutesShort", {
        hours,
        minutes: remainder,
      });
}

function examLabel(
  round: number | null,
  fallbackLevel: string,
  t: (key: string, options?: Record<string, unknown>) => string,
) {
  return round
    ? t("topik.stats.examRound", { round })
    : `TOPIK ${fallbackLevel}`;
}

function sectionColor(section: ApiSection, palette: TopikPalette) {
  if (section === "listening") {
    return { color: palette.warning, soft: palette.warningSoft };
  }
  if (section === "writing") {
    return { color: palette.purple, soft: palette.purpleSoft };
  }
  return { color: palette.primary, soft: palette.primarySoft };
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: palette.bg },
    pressed: { opacity: 0.72 },
    headerShell: {
      overflow: "hidden",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      paddingBottom: 21,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.28 : 0.2,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 8,
    },
    headerOrbLarge: {
      position: "absolute",
      top: -118,
      right: -65,
      width: 250,
      height: 250,
      borderWidth: 38,
      borderColor: palette.heroGlowSoft,
      borderRadius: 125,
    },
    headerOrbSmall: {
      position: "absolute",
      left: -52,
      bottom: -62,
      width: 152,
      height: 152,
      borderRadius: 76,
      backgroundColor: palette.heroGlowSoft,
    },
    header: {
      minHeight: 59,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
    },
    iconButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: palette.heroDivider,
      borderRadius: 14,
      backgroundColor: palette.heroBadge,
    },
    headerTitleWrap: { flex: 1, alignItems: "center", gap: 2 },
    headerEyebrow: {
      color: palette.heroSubtle,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    headerTitle: { color: palette.white, fontSize: 16, fontWeight: "900" },
    levelTabs: {
      flexDirection: "row",
      gap: 4,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: palette.heroDivider,
      borderRadius: 14,
      backgroundColor: palette.heroGlassDark,
      marginTop: 4,
      padding: 4,
    },
    levelTab: {
      minWidth: 112,
      alignItems: "center",
      borderRadius: 10,
      paddingHorizontal: 17,
      paddingVertical: 9,
    },
    levelTabActive: { backgroundColor: palette.white },
    levelTabText: {
      color: palette.heroMuted,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 0.25,
    },
    levelTabTextActive: { color: palette.primaryStrong },
    hero: { paddingHorizontal: 21, paddingTop: 19 },
    heroMain: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    accuracyBlock: { gap: 1 },
    heroLabel: {
      color: palette.heroMuted,
      fontSize: 11,
      fontWeight: "800",
    },
    accuracyLine: { flexDirection: "row", alignItems: "flex-end" },
    accuracy: {
      color: palette.white,
      fontSize: 50,
      lineHeight: 58,
      fontWeight: "900",
      letterSpacing: -2.4,
    },
    accuracyUnit: {
      color: palette.heroMuted,
      fontSize: 20,
      fontWeight: "900",
      marginBottom: 8,
      marginLeft: 2,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    statusBadgeReady: {
      borderColor: palette.heroDividerStrong,
      backgroundColor: palette.heroGlass,
    },
    statusBadgeStrong: {
      borderColor: "rgba(107,211,155,0.42)",
      backgroundColor: "rgba(32,115,75,0.30)",
    },
    statusBadgeGrowing: {
      borderColor: "rgba(232,198,110,0.42)",
      backgroundColor: "rgba(128,99,30,0.28)",
    },
    statusBadgeReview: {
      borderColor: "rgba(240,138,138,0.42)",
      backgroundColor: "rgba(135,51,51,0.28)",
    },
    statusBadgeWriting: {
      borderColor: "rgba(184,166,244,0.44)",
      backgroundColor: "rgba(90,71,164,0.28)",
    },
    statusDot: { width: 7, height: 7, borderRadius: 4 },
    statusDotReady: { backgroundColor: palette.white },
    statusDotStrong: { backgroundColor: palette.success },
    statusDotGrowing: { backgroundColor: palette.warning },
    statusDotReview: { backgroundColor: palette.danger },
    statusDotWriting: { backgroundColor: palette.purple },
    statusText: { color: palette.white, fontSize: 10, fontWeight: "900" },
    scoreStrip: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: palette.heroDivider,
      marginTop: 14,
      paddingTop: 14,
    },
    heroScore: { flex: 1, alignItems: "center", gap: 3 },
    heroScoreValue: { color: palette.white, fontSize: 18, fontWeight: "900" },
    heroScoreLabel: {
      color: palette.heroSubtle,
      fontSize: 9,
      fontWeight: "700",
    },
    scoreDivider: {
      width: 1,
      height: 25,
      backgroundColor: palette.heroDivider,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 11,
      padding: 24,
    },
    stateText: { color: palette.textSecondary, fontSize: 13 },
    errorTitle: { color: palette.text, fontSize: 15, fontWeight: "800" },
    retryButton: {
      borderRadius: 11,
      backgroundColor: palette.primaryStrong,
      paddingHorizontal: 19,
      paddingVertical: 11,
    },
    retryText: { color: palette.white, fontWeight: "800" },
    content: {
      gap: 14,
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 42,
    },
    sectionFilters: { gap: 8, paddingRight: 6 },
    sectionFilter: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 20,
      backgroundColor: palette.surface,
      paddingHorizontal: 13,
      paddingVertical: 9,
    },
    sectionFilterActive: {
      borderColor: palette.primaryStrong,
      backgroundColor: palette.primaryStrong,
    },
    sectionFilterText: {
      color: palette.textSecondary,
      fontSize: 11,
      fontWeight: "800",
    },
    sectionFilterTextActive: { color: palette.white },
    insightCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderRadius: 18,
      padding: 14,
    },
    insightCardReady: {
      borderColor: palette.border,
      backgroundColor: palette.surface,
    },
    insightCardStrong: {
      borderColor: palette.successBorder,
      backgroundColor: palette.successSoft,
    },
    insightCardGrowing: {
      borderColor: palette.warning,
      backgroundColor: palette.warningSoft,
    },
    insightCardReview: {
      borderColor: palette.danger,
      backgroundColor: palette.dangerSoft,
    },
    insightCardWriting: {
      borderColor: palette.purple,
      backgroundColor: palette.purpleSoft,
    },
    insightIcon: {
      width: 43,
      height: 43,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
    },
    insightIconReady: { backgroundColor: palette.primarySoft },
    insightIconStrong: { backgroundColor: palette.surface },
    insightIconGrowing: { backgroundColor: palette.surface },
    insightIconReview: { backgroundColor: palette.surface },
    insightIconWriting: { backgroundColor: palette.surface },
    insightCopy: { flex: 1, gap: 3 },
    insightEyebrow: {
      color: palette.textSecondary,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    insightTitle: {
      color: palette.text,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "800",
    },
    metricGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 9,
    },
    metricCard: {
      width: "48.5%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 17,
      backgroundColor: palette.surface,
      padding: 13,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.12 : 0.04,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 4 },
      elevation: 1,
    },
    metricIcon: {
      width: 38,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    },
    metricCopy: { flex: 1, gap: 1 },
    metricValue: { color: palette.text, fontSize: 17, fontWeight: "900" },
    metricLabel: { color: palette.textMuted, fontSize: 9, fontWeight: "700" },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 5,
    },
    sectionTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
    sectionCaption: {
      color: palette.textMuted,
      fontSize: 9,
      fontWeight: "700",
    },
    card: {
      gap: 17,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 18,
      backgroundColor: palette.surface,
      padding: 15,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.1 : 0.035,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 1,
    },
    trendCard: {
      minHeight: 174,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 18,
      backgroundColor: palette.surface,
      padding: 16,
    },
    trendTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    trendMainValue: {
      color: palette.text,
      fontSize: 28,
      lineHeight: 31,
      fontWeight: "900",
      letterSpacing: -1,
    },
    trendMainLabel: {
      color: palette.textMuted,
      fontSize: 9,
      fontWeight: "700",
    },
    trendLegend: { flexDirection: "row", alignItems: "center", gap: 5 },
    trendLegendDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: palette.primary,
    },
    trendLegendText: { color: palette.textMuted, fontSize: 9 },
    chart: {
      height: 104,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
      borderBottomWidth: 1,
      borderBottomColor: palette.divider,
      marginTop: 9,
    },
    chartColumn: { flex: 1, height: 101, alignItems: "center" },
    chartScore: {
      height: 15,
      color: palette.textSecondary,
      fontSize: 8,
      fontWeight: "800",
    },
    chartTrack: {
      flex: 1,
      width: "68%",
      overflow: "hidden",
      justifyContent: "flex-end",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      backgroundColor: palette.surfaceMuted,
    },
    chartBar: {
      width: "100%",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    chartLabel: {
      height: 16,
      color: palette.textSubtle,
      fontSize: 8,
      marginTop: 3,
    },
    typeRow: { gap: 8 },
    typeTop: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    typeRank: {
      width: 29,
      height: 29,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
      backgroundColor: palette.surfaceMuted,
    },
    typeRankText: { color: palette.textMuted, fontSize: 9, fontWeight: "900" },
    typeNameWrap: { flex: 1, gap: 2 },
    typeName: { color: palette.text, fontSize: 12, fontWeight: "900" },
    typeNameKo: { color: palette.textMuted, fontSize: 10, fontWeight: "700" },
    skillBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5 },
    skillBadgeText: { fontSize: 10, fontWeight: "900" },
    barTrack: {
      height: 8,
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: palette.surfaceMuted,
    },
    barFill: { height: "100%", borderRadius: 4 },
    typeMetaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    typeMeta: { flex: 1, color: palette.textMuted, fontSize: 9 },
    typeLevel: { fontSize: 9, fontWeight: "900" },
    emptyRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    emptyIcon: {
      width: 43,
      height: 43,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
      backgroundColor: palette.primarySoft,
    },
    emptyText: {
      flex: 1,
      color: palette.textSecondary,
      fontSize: 12,
      lineHeight: 18,
    },
    weakRow: { flexDirection: "row", alignItems: "center", gap: 11 },
    rowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: palette.divider,
      paddingBottom: 14,
    },
    weakNumber: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 13,
      backgroundColor: palette.dangerSoft,
    },
    weakNumberText: {
      color: palette.dangerText,
      fontSize: 13,
      fontWeight: "900",
    },
    weakInfo: { flex: 1, gap: 2 },
    weakTitle: { color: palette.text, fontSize: 12, fontWeight: "900" },
    weakTitleKo: { color: palette.textMuted, fontSize: 10, fontWeight: "700" },
    weakMeta: { color: palette.textMuted, fontSize: 9 },
    weakResult: { alignItems: "flex-end", gap: 2 },
    weakAccuracy: {
      color: palette.dangerText,
      fontSize: 13,
      fontWeight: "900",
    },
    weakStreak: { color: palette.textMuted, fontSize: 8, fontWeight: "700" },
    historyCard: {
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 18,
      backgroundColor: palette.surface,
      paddingHorizontal: 14,
      paddingVertical: 5,
      overflow: "hidden",
    },
    historyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      paddingVertical: 13,
    },
    historyRowPressed: { opacity: 0.58 },
    historyIcon: {
      width: 41,
      height: 41,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 13,
    },
    historyInfo: { flex: 1, gap: 3 },
    historyTitle: { color: palette.text, fontSize: 12, fontWeight: "900" },
    historyMeta: { color: palette.textMuted, fontSize: 9 },
    historyScoreWrap: { alignItems: "flex-end", gap: 1 },
    historyScore: { color: palette.text, fontSize: 16, fontWeight: "900" },
    historyAccuracy: { color: palette.primary, fontSize: 9, fontWeight: "800" },
    historyCompleted: {
      color: palette.successText,
      fontSize: 8,
      fontWeight: "800",
    },
  });
