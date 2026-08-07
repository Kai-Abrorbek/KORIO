import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  TopikExitModal,
  TopikHintPanel,
  TopikNoticeModal,
  TopikQuestionCard,
  TopikSubmitModal,
} from "@/components/topik";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import { useTopikAttemptStore } from "@/store/topik-attempt.store";
import { flattenTopikQuestions, type TopikAttemptMode } from "@/types/topik";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TopikExamScreen() {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const params = useLocalSearchParams<{
    examCode?: string;
    mode?: TopikAttemptMode;
  }>();
  const examCode = Array.isArray(params.examCode)
    ? params.examCode[0]
    : params.examCode;
  const mode =
    (Array.isArray(params.mode) ? params.mode[0] : params.mode) ?? "guided";
  const scrollRef = useRef<ScrollView>(null);
  const [now, setNow] = useState(Date.now());
  const [busy, setBusy] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [exitError, setExitError] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [supportErrorVisible, setSupportErrorVisible] = useState(false);

  const session = useTopikAttemptStore((state) => state.session);
  const attempt = useTopikAttemptStore((state) => state.attempt);
  const answers = useTopikAttemptStore((state) => state.answers);
  const learningSupport = useTopikAttemptStore(
    (state) => state.learningSupport,
  );
  const revealedSolutions = useTopikAttemptStore(
    (state) => state.revealedSolutions,
  );
  const currentIndex = useTopikAttemptStore((state) => state.currentIndex);
  const sessionStartedAtMs = useTopikAttemptStore(
    (state) => state.sessionStartedAtMs,
  );
  const isLoading = useTopikAttemptStore((state) => state.isLoading);
  const errorCode = useTopikAttemptStore((state) => state.errorCode);
  const start = useTopikAttemptStore((state) => state.start);
  const selectAnswer = useTopikAttemptStore((state) => state.selectAnswer);
  const setCurrentIndex = useTopikAttemptStore(
    (state) => state.setCurrentIndex,
  );
  const saveProgress = useTopikAttemptStore((state) => state.saveProgress);
  const loadLearningSupport = useTopikAttemptStore(
    (state) => state.loadLearningSupport,
  );
  const revealNextHint = useTopikAttemptStore((state) => state.revealNextHint);
  const revealSolution = useTopikAttemptStore((state) => state.revealSolution);
  const submit = useTopikAttemptStore((state) => state.submit);

  const questions = useMemo(() => flattenTopikQuestions(session), [session]);
  const question = questions[currentIndex];
  const selectedAnswer = question ? answers[question.id] : undefined;
  const support = question ? learningSupport[question.id] : undefined;
  const solution = question ? revealedSolutions[question.id] : undefined;
  const highlightedKeys = useMemo(() => {
    const keys = new Set<string>();
    support?.revealedHints.forEach((hint) =>
      hint.targetSegmentKeys.forEach((key) => keys.add(key)),
    );
    solution?.solution.keyClues.forEach((clue) =>
      clue.targetSegmentKeys.forEach((key) => keys.add(key)),
    );
    return keys;
  }, [solution, support]);

  useEffect(() => {
    if (!examCode) return;
    void start(examCode, mode);
  }, [examCode, mode, start]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (attempt?.mode === "guided" && question) {
      void loadLearningSupport(question.id);
    }
  }, [attempt?.mode, loadLearningSupport, question]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentIndex]);

  const elapsedSeconds = sessionStartedAtMs
    ? Math.max(0, Math.floor((now - sessionStartedAtMs) / 1000))
    : 0;
  const remainingSeconds = Math.max(
    0,
    (session?.exam.durationMinutes ?? 70) * 60 - elapsedSeconds,
  );
  const answeredCount = Object.keys(answers).length;

  const moveTo = async (nextIndex: number) => {
    setBusy(true);
    try {
      await saveProgress();
      setCurrentIndex(Math.min(Math.max(nextIndex, 0), questions.length - 1));
    } finally {
      setBusy(false);
    }
  };

  const confirmExit = () => {
    setExitError(false);
    setExitModalVisible(true);
  };

  const leaveExam = async () => {
    setLeaving(true);
    setExitError(false);
    try {
      await saveProgress();
      setExitModalVisible(false);
      router.back();
    } catch {
      setExitError(true);
    } finally {
      setLeaving(false);
    }
  };

  const confirmSubmit = () => {
    setSubmitError(false);
    setSubmitModalVisible(true);
  };

  const submitExam = async () => {
    setSubmitting(true);
    setBusy(true);
    setSubmitError(false);
    try {
      const result = await submit();
      setSubmitModalVisible(false);
      router.replace({
        pathname: "/topik-result",
        params: { attemptId: result.attemptId },
      });
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
      setBusy(false);
    }
  };

  const revealCurrentSolution = async () => {
    if (!question) return;

    setSupportErrorVisible(false);
    setBusy(true);
    try {
      await revealSolution(question.id);
    } catch {
      setSupportErrorVisible(true);
    } finally {
      setBusy(false);
    }
  };

  if (!examCode) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorTitle}>{t("topik.exam.missingExam")}</Text>
        <Pressable
          onPress={() => router.replace("/topik")}
          style={styles.errorButton}
        >
          <Text style={styles.errorButtonText}>
            {t("topik.exam.backToSelection")}
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (isLoading || !question || !attempt) {
    return (
      <SafeAreaView style={styles.centered}>
        {errorCode ? (
          <>
            <Ionicons
              name="alert-circle-outline"
              size={34}
              color={palette.danger}
            />
            <Text style={styles.errorTitle}>{t("topik.exam.startFailed")}</Text>
            <Pressable
              onPress={() => void start(examCode, mode)}
              style={styles.errorButton}
            >
              <Text style={styles.errorButtonText}>
                {t("topik.common.retry")}
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color={palette.primary} />
            <Text style={styles.loadingText}>{t("topik.exam.loading")}</Text>
          </>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel={t("topik.common.close")}
          onPress={confirmExit}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={25} color={palette.text} />
        </Pressable>
        <View style={styles.progressArea}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {questions.length}
          </Text>
        </View>
        <View style={styles.timer}>
          <Ionicons name="time-outline" size={16} color={palette.primary} />
          <Text style={styles.timerText}>{formatTime(remainingSeconds)}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusRow}>
          <Text style={styles.modeLabel}>
            {attempt.mode === "guided"
              ? t("topik.modes.guided")
              : t("topik.modes.mockExam")}
          </Text>
          <Text style={styles.answerCount}>
            {t("topik.exam.answerProgress", {
              answered: answeredCount,
              total: questions.length,
            })}
          </Text>
        </View>

        <TopikQuestionCard
          question={question}
          selectedChoiceKey={selectedAnswer?.selectedChoiceKey}
          correctChoiceKey={solution?.correctChoiceKey}
          highlightedKeys={highlightedKeys}
          disabled={Boolean(solution)}
          onSelect={(choiceKey) => selectAnswer(question.id, choiceKey)}
        />

        {attempt.mode === "guided" && (
          <TopikHintPanel
            support={support}
            solution={solution}
            selected={Boolean(selectedAnswer)}
            busy={busy}
            onRevealHint={async () => {
              setBusy(true);
              try {
                await revealNextHint(question.id);
              } finally {
                setBusy(false);
              }
            }}
            onRevealSolution={() => void revealCurrentSolution()}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          disabled={currentIndex === 0 || busy}
          onPress={() => void moveTo(currentIndex - 1)}
          style={[
            styles.secondaryButton,
            currentIndex === 0 && styles.disabled,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={21}
            color={palette.textSecondary}
          />
          <Text style={styles.secondaryText}>{t("topik.exam.previous")}</Text>
        </Pressable>
        {currentIndex === questions.length - 1 ? (
          <Pressable
            disabled={busy}
            onPress={confirmSubmit}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>
              {t("topik.exam.submitAnswers")}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            disabled={busy}
            onPress={() => void moveTo(currentIndex + 1)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>{t("topik.exam.next")}</Text>
            <Ionicons name="chevron-forward" size={21} color={palette.white} />
          </Pressable>
        )}
      </View>

      <TopikExitModal
        visible={exitModalVisible}
        answeredCount={answeredCount}
        totalCount={questions.length}
        leaving={leaving}
        errorTitle={exitError ? t("topik.exam.saveFailedTitle") : undefined}
        errorMessage={exitError ? t("topik.exam.saveFailedMessage") : undefined}
        onContinue={() => {
          setExitError(false);
          setExitModalVisible(false);
        }}
        onLeave={() => void leaveExam()}
      />

      <TopikSubmitModal
        visible={submitModalVisible}
        answeredCount={answeredCount}
        totalCount={questions.length}
        submitting={submitting}
        errorTitle={submitError ? t("topik.exam.submitFailedTitle") : undefined}
        errorMessage={
          submitError ? t("topik.exam.submitFailedMessage") : undefined
        }
        onCancel={() => {
          setSubmitError(false);
          setSubmitModalVisible(false);
        }}
        onSubmit={() => void submitExam()}
      />

      <TopikNoticeModal
        visible={supportErrorVisible}
        variant="error"
        icon="bulb-outline"
        title={t("topik.exam.supportFailedTitle")}
        message={t("topik.exam.supportFailedMessage")}
        primaryLabel={t("topik.common.retry")}
        secondaryLabel={t("topik.common.cancel")}
        busy={busy}
        onClose={() => setSupportErrorVisible(false)}
        onPrimary={() => void revealCurrentSolution()}
      />
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.bg,
      // paddingBottom: 40,
      // paddingTop: 40,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 13,
      backgroundColor: palette.bg,
      padding: 24,
    },
    loadingText: { color: palette.textSecondary, fontSize: 13 },
    errorTitle: {
      color: palette.text,
      fontSize: 15,
      fontWeight: "800",
      textAlign: "center",
    },
    errorButton: {
      borderRadius: 10,
      backgroundColor: palette.primaryStrong,
      paddingHorizontal: 18,
      paddingVertical: 11,
    },
    errorButtonText: { color: palette.white, fontWeight: "800" },
    header: {
      minHeight: 61,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      borderBottomWidth: 1,
      borderBottomColor: palette.divider,
      backgroundColor: palette.paper,
      paddingHorizontal: 12,
    },
    headerButton: {
      width: 38,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
    },
    progressArea: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    progressTrack: {
      flex: 1,
      height: 7,
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: palette.surfaceMuted,
    },
    progressFill: {
      height: "100%",
      borderRadius: 4,
      backgroundColor: palette.primary,
    },
    progressText: {
      color: palette.textSecondary,
      fontSize: 11,
      fontWeight: "800",
    },
    timer: {
      minWidth: 69,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 4,
    },
    timerText: {
      color: palette.primary,
      fontSize: 12,
      fontWeight: "900",
      fontVariant: ["tabular-nums"],
    },
    scroll: { flex: 1 },
    content: {
      gap: 14,
      paddingHorizontal: 14,
      paddingTop: 13,
      paddingBottom: 28,
    },
    statusRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modeLabel: {
      color: palette.primary,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 0.3,
    },
    answerCount: { color: palette.textMuted, fontSize: 11, fontWeight: "700" },
    footer: {
      minHeight: 76,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      backgroundColor: palette.paper,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    secondaryButton: {
      width: 105,
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: palette.borderStrong,
      borderRadius: 13,
      backgroundColor: palette.surface,
    },
    secondaryText: {
      color: palette.textSecondary,
      fontSize: 14,
      fontWeight: "800",
    },
    primaryButton: {
      flex: 1,
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      borderRadius: 13,
      backgroundColor: palette.primaryStrong,
    },
    primaryText: { color: palette.white, fontSize: 14, fontWeight: "900" },
    disabled: { opacity: 0.36 },
  });
