import { Ionicons } from "@expo/vector-icons";
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
  const canReviewQuestions = result.mode === "guided";
  const topikLevel = result.examType === "topik_i" ? "I" : "II";

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
        <View style={styles.hero}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={35} color={palette.white} />
          </View>
          <Text style={styles.heroEyebrow}>
            TOPIK {topikLevel} ·{" "}
            {t(`topik.home.${result.section}`).toUpperCase()}
          </Text>
          <Text style={styles.heroTitle}>{t("topik.result.complete")}</Text>
          <Text style={styles.score}>{result.score}</Text>
          <Text style={styles.scoreUnit}>
            {t("topik.result.scoreTotal", { score: 100 })}
          </Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{result.correctCount}</Text>
              <Text style={styles.summaryLabel}>
                {t("topik.result.correct")}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{accuracy}%</Text>
              <Text style={styles.summaryLabel}>
                {t("topik.result.accuracy")}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
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
        </View>

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
              router.replace("/topik");
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
      alignItems: "center",
      borderRadius: 23,
      backgroundColor: palette.hero,
      paddingHorizontal: 18,
      paddingVertical: 25,
    },
    checkCircle: {
      width: 58,
      height: 58,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 29,
      backgroundColor: palette.success,
      marginBottom: 13,
    },
    heroEyebrow: {
      color: palette.heroSubtle,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    heroTitle: {
      color: palette.white,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 5,
    },
    score: {
      color: palette.white,
      fontSize: 56,
      lineHeight: 64,
      fontWeight: "900",
      marginTop: 9,
    },
    scoreUnit: { color: palette.heroMuted, fontSize: 12, fontWeight: "700" },
    summaryRow: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderTopWidth: 1,
      borderTopColor: palette.heroDivider,
      marginTop: 20,
      paddingTop: 17,
    },
    summaryItem: { flex: 1, alignItems: "center", gap: 3 },
    summaryValue: {
      color: palette.white,
      fontSize: 14,
      fontWeight: "900",
      textAlign: "center",
    },
    summaryLabel: { color: palette.heroSubtle, fontSize: 10 },
    summaryDivider: {
      width: 1,
      height: 29,
      backgroundColor: palette.heroDividerStrong,
    },
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
