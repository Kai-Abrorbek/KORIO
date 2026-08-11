import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
import TopikSuccessConfetti from "@/components/topik/TopikSuccessConfetti";
import { TopikService } from "@/services/topik.service";
import { useTopikAttemptStore } from "@/store/topik-attempt.store";
import type { TopikAttemptResult } from "@/types/topik";
import { toTopikLanguage, topikText } from "@/types/topik";

export default function TopikResultScreen() {
  const { t, i18n } = useTranslation();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const params = useLocalSearchParams<{ attemptId?: string }>();
  const attemptId = Array.isArray(params.attemptId)
    ? params.attemptId[0]
    : params.attemptId;
  const storedResult = useTopikAttemptStore((state) => state.result);
  const reset = useTopikAttemptStore((state) => state.reset);
  const [result, setResult] = useState<TopikAttemptResult | null>(
    storedResult?.attemptId === attemptId ? storedResult : null,
  );
  const [wrongOnly, setWrongOnly] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!attemptId || result) return;
    TopikService.getResult(attemptId)
      .then(setResult)
      .catch(() => setError(true));
  }, [attemptId, result]);

  const visibleQuestions = useMemo(
    () =>
      result?.questions.filter(
        (question) => !wrongOnly || !question.isCorrect,
      ) ?? [],
    [result, wrongOnly],
  );

  if (!result) {
    return (
      <SafeAreaView style={styles.centered}>
        {error ? (
          <>
            <Ionicons
              name="alert-circle-outline"
              size={35}
              color={palette.danger}
            />
            <Text style={styles.errorTitle}>
              {t("topik.result.loadFailed")}
            </Text>
            <Pressable
              onPress={() => router.replace("/topik")}
              style={styles.homeButtonSmall}
            >
              <Text style={styles.homeButtonText}>
                {t("topik.result.backToSelection")}
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color={palette.primary} />
            <Text style={styles.loadingText}>{t("topik.result.loading")}</Text>
          </>
        )}
      </SafeAreaView>
    );
  }

  const accuracy = Math.round(
    (result.correctCount / result.totalQuestions) * 100,
  );
  const wrongCount = Math.max(0, result.totalQuestions - result.correctCount);
  const canReviewQuestions = result.mode === "guided";
  const topikLevel = result.examType === "topik_i" ? "I" : "II";
  const heroColors =
    result.examType === "topik_i" ? palette.levelOneHero : palette.levelTwoHero;

  const openQuestionReview = (questionNumber: number) => {
    if (!canReviewQuestions) return;
    router.push({
      pathname: "/topik-exam",
      params: {
        examCode: result.examCode,
        mode: "guided",
        reviewAttemptId: result.attemptId,
        questionNumber: String(questionNumber),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={heroColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroOrbLarge} />
          <View style={styles.heroOrbSmall} />
          <View style={styles.heroTopRow}>
            <View style={styles.heroHeading}>
              <View style={styles.heroBadge}>
                <Ionicons
                  name={
                    result.section === "listening"
                      ? "headset-outline"
                      : "book-outline"
                  }
                  size={13}
                  color={palette.white}
                />
                <Text style={styles.heroEyebrow}>
                  TOPIK {topikLevel} ·{" "}
                  {t(`topik.home.${result.section}`).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.heroTitle}>{t("topik.result.complete")}</Text>
            </View>
            <View pointerEvents="none" style={styles.successArtwork}>
              <TopikSuccessConfetti
                dom={{
                  scrollEnabled: false,
                  showsHorizontalScrollIndicator: false,
                  showsVerticalScrollIndicator: false,
                  style: styles.successArtworkFill,
                }}
              />
            </View>
          </View>

          <View style={styles.scoreBlock}>
            <Text style={styles.score}>{result.score}</Text>
            <Text style={styles.scoreUnit}>
              {t("topik.result.scoreTotal", { score: 100 })}
            </Text>
          </View>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconSuccess}>
                <Ionicons name="checkmark" size={14} color={palette.white} />
              </View>
              <View style={styles.summaryText}>
                <Text style={styles.summaryValue}>{result.correctCount}</Text>
                <Text style={styles.summaryLabel}>
                  {t("topik.result.correct")}
                </Text>
              </View>
            </View>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconDanger}>
                <Ionicons name="close" size={14} color={palette.white} />
              </View>
              <View style={styles.summaryText}>
                <Text style={styles.summaryValue}>{wrongCount}</Text>
                <Text style={styles.summaryLabel}>
                  {t("topik.result.wrong")}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.summaryCard,
                result.mode !== "mock_exam" && styles.summaryCardFull,
              ]}
            >
              <View style={styles.summaryIconNeutral}>
                <Ionicons
                  name="analytics-outline"
                  size={14}
                  color={palette.white}
                />
              </View>
              <View style={styles.summaryText}>
                <Text style={styles.summaryValue}>{accuracy}%</Text>
                <Text style={styles.summaryLabel}>
                  {t("topik.result.accuracy")}
                </Text>
              </View>
            </View>
            {result.mode === "mock_exam" && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryIconNeutral}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={palette.white}
                  />
                </View>
                <View style={styles.summaryText}>
                  <Text style={styles.summaryValueSmall}>
                    {t("topik.result.duration", {
                      minutes: Math.floor(result.elapsedSeconds / 60),
                      seconds: result.elapsedSeconds % 60,
                    })}
                  </Text>
                  <Text style={styles.summaryLabel}>
                    {t("topik.result.durationLabel")}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </LinearGradient>

        <View style={styles.reviewHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {t("topik.result.questionResults")}
            </Text>
            <Text style={styles.sectionCaption}>
              {t("topik.result.questionResultsDescription")}
            </Text>
          </View>
          <Pressable
            onPress={() => setWrongOnly((value) => !value)}
            style={[
              styles.filterButton,
              wrongOnly && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[styles.filterText, wrongOnly && styles.filterTextActive]}
            >
              {t("topik.result.wrongOnly")}
            </Text>
          </Pressable>
        </View>

        <View style={styles.resultList}>
          {visibleQuestions.map((question) => (
            <Pressable
              key={question.questionId}
              accessibilityRole={canReviewQuestions ? "button" : undefined}
              accessibilityLabel={
                canReviewQuestions
                  ? t("topik.result.reviewQuestion", {
                      number: question.number,
                    })
                  : undefined
              }
              disabled={!canReviewQuestions}
              onPress={() => openQuestionReview(question.number)}
              style={({ pressed }) => [
                styles.resultCard,
                canReviewQuestions && styles.reviewableCard,
                pressed && styles.resultCardPressed,
              ]}
            >
              <View style={styles.resultTop}>
                <View
                  style={[
                    styles.numberBadge,
                    question.isCorrect
                      ? styles.correctBadge
                      : styles.wrongBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.numberText,
                      question.isCorrect
                        ? styles.correctText
                        : styles.wrongText,
                    ]}
                  >
                    {String(question.number).padStart(2, "0")}
                  </Text>
                </View>
                <View style={styles.answerInfo}>
                  <Text style={styles.answerLine}>
                    {t("topik.result.myAnswer", {
                      answer: question.selectedChoiceKey
                        ? t("topik.common.answerNumber", {
                            number: question.selectedChoiceKey,
                          })
                        : t("topik.common.unanswered"),
                    })}
                  </Text>
                  <Text style={styles.correctLine}>
                    {t("topik.result.correctAnswer", {
                      answer: t("topik.common.answerNumber", {
                        number: question.correctChoiceKey,
                      }),
                    })}
                  </Text>
                </View>
                <Ionicons
                  name={
                    question.isCorrect ? "checkmark-circle" : "close-circle"
                  }
                  size={25}
                  color={question.isCorrect ? palette.success : palette.danger}
                />
              </View>
              <View style={styles.explanation}>
                <Text style={styles.explanationLabel}>
                  {t("topik.result.explanation")}
                </Text>
                <Text style={styles.explanationText}>
                  {topikText(question.solution.explanation, language)}
                </Text>
              </View>
              {canReviewQuestions && (
                <View style={styles.reviewLink}>
                  <Ionicons
                    name={
                      result.section === "listening"
                        ? "headset-outline"
                        : "book-outline"
                    }
                    size={16}
                    color={palette.primary}
                  />
                  <Text style={styles.reviewLinkText}>
                    {t("topik.result.reviewQuestion", {
                      number: question.number,
                    })}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={palette.primary}
                  />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => router.push("/topik-stats")}
            style={styles.statsButton}
          >
            <Ionicons name="stats-chart" size={19} color={palette.primary} />
            <Text style={styles.statsButtonText}>
              {t("topik.result.viewStats")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              reset();
              router.replace({
                pathname: "/topik",
                params: {
                  level: result.examType === "topik_i" ? "1" : "2",
                  section:
                    result.section === "listening" ? "listening" : "reading",
                },
              });
            }}
            style={styles.homeButton}
          >
            <Text style={styles.homeButtonText}>
              {t("topik.result.tryAnother")}
            </Text>
            <Ionicons name="arrow-forward" size={19} color={palette.white} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: palette.bg },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      backgroundColor: palette.bg,
      padding: 24,
    },
    loadingText: { color: palette.textSecondary, fontSize: 13 },
    errorTitle: { color: palette.text, fontSize: 15, fontWeight: "800" },
    content: { padding: 16, paddingBottom: 40, gap: 19 },
    hero: {
      overflow: "hidden",
      borderRadius: 23,
      padding: 20,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.26 : 0.18,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 7,
    },
    heroOrbLarge: {
      position: "absolute",
      top: -88,
      right: -62,
      width: 220,
      height: 220,
      borderWidth: 34,
      borderColor: palette.heroGlowSoft,
      borderRadius: 110,
    },
    heroOrbSmall: {
      position: "absolute",
      left: -35,
      bottom: 55,
      width: 112,
      height: 112,
      borderRadius: 56,
      backgroundColor: palette.heroGlowSoft,
    },
    heroTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
    },
    heroHeading: { flex: 1, gap: 9 },
    heroBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderWidth: 1,
      borderColor: palette.heroDivider,
      borderRadius: 14,
      backgroundColor: palette.heroBadge,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    heroEyebrow: {
      color: palette.white,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    heroTitle: {
      color: palette.white,
      fontSize: 21,
      lineHeight: 28,
      fontWeight: "900",
      letterSpacing: -0.6,
    },
    successArtwork: {
      width: 92,
      height: 92,
      marginRight: -7,
      marginTop: -7,
      overflow: "hidden",
    },
    successArtworkFill: { width: "100%", height: "100%" },
    scoreBlock: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 7,
      marginTop: 22,
    },
    score: {
      color: palette.white,
      fontSize: 64,
      lineHeight: 70,
      fontWeight: "900",
      letterSpacing: -3,
    },
    scoreUnit: { color: palette.heroMuted, fontSize: 13, fontWeight: "800" },
    summaryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 9,
      borderTopWidth: 1,
      borderTopColor: palette.heroDivider,
      marginTop: 16,
      paddingTop: 14,
    },
    summaryCard: {
      width: "48.5%",
      minHeight: 60,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      borderWidth: 1,
      borderColor: palette.heroDivider,
      borderRadius: 13,
      backgroundColor: palette.heroGlassDark,
      paddingHorizontal: 11,
      paddingVertical: 10,
    },
    summaryCardFull: { width: "100%" },
    summaryText: { flex: 1, gap: 1 },
    summaryIconSuccess: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
      backgroundColor: palette.success,
    },
    summaryIconDanger: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
      backgroundColor: palette.danger,
    },
    summaryIconNeutral: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
      backgroundColor: palette.translucentWhite,
    },
    summaryValue: {
      color: palette.white,
      fontSize: 17,
      fontWeight: "900",
    },
    summaryValueSmall: {
      color: palette.white,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "900",
    },
    summaryLabel: { color: palette.heroMuted, fontSize: 9 },
    reviewHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    sectionTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
    sectionCaption: {
      color: palette.textSecondary,
      fontSize: 10,
      marginTop: 4,
    },
    filterButton: {
      borderWidth: 1,
      borderColor: palette.borderStrong,
      borderRadius: 18,
      backgroundColor: palette.surface,
      paddingHorizontal: 13,
      paddingVertical: 8,
    },
    filterButtonActive: {
      borderColor: palette.primaryStrong,
      backgroundColor: palette.primaryStrong,
    },
    filterText: {
      color: palette.textSecondary,
      fontSize: 12,
      fontWeight: "800",
    },
    filterTextActive: { color: palette.white },
    resultList: { gap: 10 },
    resultCard: {
      gap: 12,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      backgroundColor: palette.surface,
      padding: 14,
    },
    reviewableCard: { borderColor: palette.primarySoft },
    resultCardPressed: { opacity: 0.82, transform: [{ scale: 0.992 }] },
    resultTop: { flexDirection: "row", alignItems: "center", gap: 11 },
    numberBadge: {
      width: 47,
      height: 43,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
    },
    correctBadge: { backgroundColor: palette.successSoft },
    wrongBadge: { backgroundColor: palette.dangerSoft },
    numberText: { fontSize: 15, fontWeight: "900" },
    correctText: { color: palette.successText },
    wrongText: { color: palette.dangerText },
    answerInfo: { flex: 1, gap: 2 },
    answerLine: { color: palette.text, fontSize: 13, fontWeight: "800" },
    correctLine: { color: palette.textSecondary, fontSize: 11 },
    explanation: {
      gap: 5,
      borderRadius: 9,
      backgroundColor: palette.surfaceMuted,
      padding: 11,
    },
    explanationLabel: {
      color: palette.primary,
      fontSize: 11,
      fontWeight: "900",
    },
    explanationText: {
      color: palette.textSecondary,
      fontSize: 12,
      lineHeight: 18,
    },
    reviewLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      paddingTop: 11,
    },
    reviewLinkText: {
      flex: 1,
      color: palette.primary,
      fontSize: 12,
      fontWeight: "900",
    },
    actions: { gap: 10, marginTop: 4 },
    statsButton: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: palette.primary,
      borderRadius: 14,
      backgroundColor: palette.surface,
    },
    statsButtonText: {
      color: palette.primary,
      fontSize: 14,
      fontWeight: "900",
    },
    homeButton: {
      minHeight: 54,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 14,
      backgroundColor: palette.primaryStrong,
    },
    homeButtonSmall: {
      borderRadius: 10,
      backgroundColor: palette.primaryStrong,
      paddingHorizontal: 18,
      paddingVertical: 11,
    },
    homeButtonText: { color: palette.white, fontSize: 14, fontWeight: "900" },
  });
