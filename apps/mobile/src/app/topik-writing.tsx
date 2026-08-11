import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TopikExitModal,
  TopikNoticeModal,
  TopikSubmitModal,
  TopikWritingQuestionCard,
} from "@/components/topik";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import { TopikService } from "@/services/topik.service";
import type {
  TopikAttempt,
  TopikAttemptMode,
  TopikAttemptResult,
  TopikExamSession,
  TopikQuestionWithGroup,
  TopikSaveAnswer,
} from "@/types/topik";
import { flattenTopikQuestions, toTopikLanguage } from "@/types/topik";

type WritingResponses = Record<string, Record<string, string>>;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function responsesFromAttempt(attempt: TopikAttempt): WritingResponses {
  return Object.fromEntries(
    attempt.answers.map((answer) => [
      answer.questionId,
      Object.fromEntries(
        (answer.writtenResponses ?? []).map((response) => [
          response.fieldKey,
          response.text,
        ]),
      ),
    ]),
  );
}

function createSaveAnswer(
  question: TopikQuestionWithGroup,
  responses: Record<string, string>,
): TopikSaveAnswer | null {
  const fields = question.writingConfig?.fields ?? [];
  const writtenResponses = fields.map((field) => ({
    fieldKey: field.key,
    text: responses[field.key] ?? "",
  }));

  if (!writtenResponses.some((response) => response.text.trim().length > 0)) {
    return null;
  }

  return {
    questionId: question.id,
    writtenResponses,
    durationMs: 0,
    answeredAt: new Date().toISOString(),
  };
}

export default function TopikWritingScreen() {
  const { t, i18n } = useTranslation();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const params = useLocalSearchParams<{
    examCode?: string;
    mode?: TopikAttemptMode;
    reviewAttemptId?: string;
  }>();
  const examCode = Array.isArray(params.examCode)
    ? params.examCode[0]
    : params.examCode;
  const mode =
    (Array.isArray(params.mode) ? params.mode[0] : params.mode) ?? "guided";
  const reviewAttemptId = Array.isArray(params.reviewAttemptId)
    ? params.reviewAttemptId[0]
    : params.reviewAttemptId;

  const [session, setSession] = useState<TopikExamSession | null>(null);
  const [attempt, setAttempt] = useState<TopikAttempt | null>(null);
  const [result, setResult] = useState<TopikAttemptResult | null>(null);
  const [responses, setResponses] = useState<WritingResponses>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startedAtMs, setStartedAtMs] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [exitVisible, setExitVisible] = useState(false);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const questions = useMemo(() => flattenTopikQuestions(session), [session]);
  const question = questions[currentIndex];
  const reviewMode = Boolean(result);
  const elapsedSeconds = result
    ? result.elapsedSeconds
    : Math.max(0, Math.floor((now - startedAtMs) / 1000));
  const answeredCount = questions.filter((item) => {
    const fieldResponses = responses[item.id] ?? {};
    return (item.writingConfig?.fields ?? []).every(
      (field) => (fieldResponses[field.key] ?? "").trim().length > 0,
    );
  }).length;
  const currentSolution = result?.questions.find(
    (item) => item.questionId === question?.id,
  )?.solution;

  const load = useCallback(async () => {
    if (!examCode) {
      setLoading(false);
      setErrorVisible(true);
      return;
    }

    setLoading(true);
    try {
      if (reviewAttemptId) {
        const [loadedSession, loadedAttempt, loadedResult] = await Promise.all([
          TopikService.getSession(examCode, 51, 54),
          TopikService.getAttempt(reviewAttemptId),
          TopikService.getResult(reviewAttemptId),
        ]);
        setSession(loadedSession);
        setAttempt(loadedAttempt);
        setResult(loadedResult);
        setResponses(responsesFromAttempt(loadedAttempt));
        setStartedAtMs(Date.now() - loadedAttempt.elapsedSeconds * 1000);
      } else {
        const [loadedSession, loadedAttempt] = await Promise.all([
          TopikService.getSession(examCode, 51, 54),
          TopikService.startAttempt(examCode, mode, mode !== "mock_exam"),
        ]);
        setSession(loadedSession);
        setAttempt(loadedAttempt);
        setResponses(responsesFromAttempt(loadedAttempt));
        setCurrentIndex(
          Math.max(0, Math.min(3, loadedAttempt.currentQuestionNumber - 51)),
        );
        setStartedAtMs(Date.now() - loadedAttempt.elapsedSeconds * 1000);
      }
    } catch {
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  }, [examCode, mode, reviewAttemptId]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (reviewMode) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [reviewMode]);

  const updateResponse = (fieldKey: string, text: string) => {
    if (!question || reviewMode) return;
    setResponses((current) => ({
      ...current,
      [question.id]: {
        ...(current[question.id] ?? {}),
        [fieldKey]: text,
      },
    }));
  };

  const save = useCallback(
    async (nextIndex = currentIndex) => {
      if (!attempt || reviewMode || questions.length === 0) return;
      const answers = questions
        .map((item) => createSaveAnswer(item, responses[item.id] ?? {}))
        .filter((item): item is TopikSaveAnswer => Boolean(item));
      if (answers.length === 0) return;

      setSaving(true);
      try {
        await TopikService.saveAnswers(
          attempt.id,
          answers,
          questions[nextIndex]?.number ?? 51,
          elapsedSeconds,
        );
      } finally {
        setSaving(false);
      }
    },
    [attempt, currentIndex, elapsedSeconds, questions, responses, reviewMode],
  );

  const moveTo = async (index: number) => {
    if (!reviewMode) {
      try {
        await save(index);
      } catch {
        setErrorVisible(true);
        return;
      }
    }
    setCurrentIndex(Math.max(0, Math.min(questions.length - 1, index)));
  };

  const leave = async () => {
    setLeaving(true);
    try {
      await save(currentIndex);
      router.back();
    } catch {
      setErrorVisible(true);
    } finally {
      setLeaving(false);
    }
  };

  const submit = async () => {
    if (!attempt) return;
    setSubmitting(true);
    try {
      await save(currentIndex);
      await TopikService.submitAttempt(attempt.id);
      const submittedResult = await TopikService.getResult(attempt.id);
      setResult(submittedResult);
      setSubmitVisible(false);
      setCurrentIndex(0);
    } catch {
      setSubmitVisible(false);
      setErrorVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={palette.purple} />
        <Text style={styles.loadingText}>{t("topik.exam.loading")}</Text>
      </SafeAreaView>
    );
  }

  if (!question || !attempt) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons
          name="document-text-outline"
          size={38}
          color={palette.danger}
        />
        <Text style={styles.errorTitle}>
          {t("topik.writingExam.loadFailed")}
        </Text>
        <Pressable onPress={load} style={styles.retryButton}>
          <Text style={styles.retryText}>{t("topik.common.retry")}</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel={t("topik.common.back")}
            hitSlop={10}
            onPress={() => (reviewMode ? router.back() : setExitVisible(true))}
            style={styles.headerButton}
          >
            <Ionicons name="chevron-back" size={24} color={palette.text} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerEyebrow}>
              {reviewMode
                ? t("topik.writingExam.reviewEyebrow")
                : t("topik.writingExam.eyebrow")}
            </Text>
            <Text style={styles.headerTitle}>{question.number} / 54</Text>
          </View>
          <View style={styles.timerPill}>
            <Ionicons name="time-outline" size={14} color={palette.purple} />
            <Text style={styles.timerText}>{formatTime(elapsedSeconds)}</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>

        {reviewMode && (
          <View style={styles.completeBanner}>
            <View style={styles.completeIcon}>
              <Ionicons name="checkmark" size={22} color={palette.white} />
            </View>
            <View style={styles.completeCopy}>
              <Text style={styles.completeTitle}>
                {t("topik.writingExam.submittedTitle")}
              </Text>
              <Text style={styles.completeText}>
                {t("topik.writingExam.submittedMessage")}
              </Text>
            </View>
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TopikWritingQuestionCard
            language={language}
            onChange={updateResponse}
            question={question}
            readOnly={reviewMode}
            responses={responses[question.id] ?? {}}
            solution={currentSolution}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            disabled={currentIndex === 0 || saving}
            onPress={() => void moveTo(currentIndex - 1)}
            style={({ pressed }) => [
              styles.secondaryButton,
              currentIndex === 0 && styles.disabledButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color={palette.textSecondary}
            />
            <Text style={styles.secondaryText}>{t("topik.exam.previous")}</Text>
          </Pressable>

          {currentIndex < questions.length - 1 ? (
            <Pressable
              disabled={saving}
              onPress={() => void moveTo(currentIndex + 1)}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryPressed,
              ]}
            >
              {saving ? (
                <ActivityIndicator size="small" color={palette.white} />
              ) : (
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={palette.white}
                />
              )}
              <Text style={styles.primaryText}>{t("topik.exam.next")}</Text>
            </Pressable>
          ) : reviewMode ? (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryPressed,
              ]}
            >
              <Ionicons name="albums-outline" size={18} color={palette.white} />
              <Text style={styles.primaryText}>
                {t("topik.writingExam.backToExams")}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              disabled={saving}
              onPress={() => setSubmitVisible(true)}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryPressed,
              ]}
            >
              <Ionicons name="send" size={17} color={palette.white} />
              <Text style={styles.primaryText}>
                {t("topik.exam.submitAnswers")}
              </Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>

      <TopikExitModal
        answeredCount={answeredCount}
        errorMessage={undefined}
        leaving={leaving}
        onContinue={() => setExitVisible(false)}
        onLeave={() => void leave()}
        totalCount={questions.length}
        visible={exitVisible}
      />
      <TopikSubmitModal
        answeredCount={answeredCount}
        onCancel={() => setSubmitVisible(false)}
        onSubmit={() => void submit()}
        submitting={submitting}
        totalCount={questions.length}
        visible={submitVisible}
      />
      <TopikNoticeModal
        icon="cloud-offline-outline"
        message={t("topik.exam.saveFailedMessage")}
        onClose={() => setErrorVisible(false)}
        onPrimary={() => {
          setErrorVisible(false);
          void load();
        }}
        primaryLabel={t("topik.common.retry")}
        title={t("topik.writingExam.loadFailed")}
        variant="error"
        visible={errorVisible}
      />
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    flex: { flex: 1 },
    safeArea: { flex: 1, backgroundColor: palette.bg },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      backgroundColor: palette.bg,
      padding: 28,
    },
    loadingText: { color: palette.textSecondary, fontSize: 13 },
    errorTitle: { color: palette.text, fontSize: 18, fontWeight: "900" },
    retryButton: {
      borderRadius: 14,
      backgroundColor: palette.purple,
      paddingHorizontal: 20,
      paddingVertical: 11,
    },
    retryText: { color: palette.white, fontWeight: "900" },
    header: {
      height: 62,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      backgroundColor: palette.bg,
    },
    headerButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    headerCenter: { flex: 1, alignItems: "center" },
    headerEyebrow: {
      color: palette.purple,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1.15,
    },
    headerTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
    timerPill: {
      minWidth: 74,
      height: 34,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      borderRadius: 12,
      backgroundColor: palette.purpleSoft,
      paddingHorizontal: 8,
    },
    timerText: { color: palette.purple, fontSize: 11, fontWeight: "900" },
    progressTrack: { height: 3, backgroundColor: palette.divider },
    progressFill: { height: 3, backgroundColor: palette.purple },
    completeBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
      backgroundColor: palette.successSoft,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    completeIcon: {
      width: 38,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 13,
      backgroundColor: palette.success,
    },
    completeCopy: { flex: 1, gap: 2 },
    completeTitle: {
      color: palette.successText,
      fontSize: 13,
      fontWeight: "900",
    },
    completeText: {
      color: palette.textSecondary,
      fontSize: 10,
      lineHeight: 15,
    },
    content: { padding: 14, paddingBottom: 28 },
    footer: {
      flexDirection: "row",
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: palette.border,
      backgroundColor: palette.surfaceElevated,
      paddingHorizontal: 14,
      paddingTop: 12,
      paddingBottom: Platform.OS === "android" ? 12 : 8,
    },
    secondaryButton: {
      minWidth: 104,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 16,
      backgroundColor: palette.surfaceMuted,
      paddingHorizontal: 14,
    },
    secondaryText: {
      color: palette.textSecondary,
      fontSize: 13,
      fontWeight: "900",
    },
    primaryButton: {
      flex: 1,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 16,
      backgroundColor: palette.purple,
      paddingHorizontal: 16,
    },
    primaryText: { color: palette.white, fontSize: 13, fontWeight: "900" },
    disabledButton: { opacity: 0.4 },
    pressedButton: { opacity: 0.72 },
    primaryPressed: { opacity: 0.84 },
  });
