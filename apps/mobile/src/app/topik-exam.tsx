import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  TopikListeningQuestionCard,
  TopikNoticeModal,
  TopikQuestionCard,
  TopikSubmitModal,
} from "@/components/topik";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import {
  type TopikListeningPlaybackRequest,
  type TopikListeningSpeechSegment,
  useTopikListeningPlayback,
} from "@/hooks/useTopikListeningPlayback";
import { useTopikAttemptStore } from "@/store/topik-attempt.store";
import {
  flattenTopikQuestions,
  type TopikAttemptMode,
  type TopikAudio,
} from "@/types/topik";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const TOPIK_EXAM_TTS_RATE = 1;
const TOPIK_ANSWER_TIME_PER_QUESTION_MS = 10_000;

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
  const guidedStartedAttemptRef = useRef<string | null>(null);
  const mockStartedAttemptRef = useRef<string | null>(null);
  const guidedPlayCountsRef = useRef<Record<string, number>>({});
  const [now, setNow] = useState(Date.now());
  const [guidedPlayCounts, setGuidedPlayCounts] = useState<
    Record<string, number>
  >({});
  const [busy, setBusy] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [exitError, setExitError] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [supportErrorVisible, setSupportErrorVisible] = useState(false);
  const [supportQuestionId, setSupportQuestionId] = useState<string | null>(
    null,
  );

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
  const listeningPlayback = useTopikListeningPlayback();

  const questions = useMemo(() => flattenTopikQuestions(session), [session]);
  const question = questions[currentIndex];
  const isListening = session?.exam.section === "listening";
  const activeQuestions = useMemo(() => {
    if (!question) return [];
    if (!isListening) return [question];
    return question.group.questions.map((groupQuestion) => ({
      ...groupQuestion,
      group: question.group,
    }));
  }, [isListening, question]);
  const activeAudio =
    activeQuestions[0]?.audio ?? activeQuestions[0]?.group.sharedAudio ?? null;
  const activeAudioRepeatCount = activeAudio
    ? (activeAudio.guidedAutoRepeatCount ??
      ((activeQuestions[0]?.number ?? 0) >= 21 ? 2 : 1))
    : 1;
  const mockPlaybackRequest =
    useMemo<TopikListeningPlaybackRequest | null>(() => {
      if (!session || session.exam.section !== "listening") return null;

      const speechSegments =
        session.groups.flatMap<TopikListeningSpeechSegment>((group) => {
          const groupAudios = group.sharedAudio
            ? [group.sharedAudio]
            : group.questions.flatMap((item) =>
                item.audio ? [item.audio] : [],
              );
          const uniqueAudios = groupAudios.filter(
            (audio, index) =>
              groupAudios.findIndex(
                (candidate) => candidate.key === audio.key,
              ) === index,
          );

          return uniqueAudios.map((audio, audioIndex) => {
            const usesSharedAudio = Boolean(group.sharedAudio);
            const startNumber = usesSharedAudio
              ? group.startNumber
              : (group.questions[audioIndex]?.number ?? group.startNumber);
            const endNumber = usesSharedAudio ? group.endNumber : startNumber;
            const questionCount = endNumber - startNumber + 1;
            const announcement =
              startNumber === endNumber
                ? `${startNumber}번 문제입니다.`
                : `${startNumber}번과 ${endNumber}번 문제입니다.`;

            return {
              transcript: [
                { speaker: "안내", text: announcement },
                ...audio.transcript,
              ],
              pauseAfterMs: questionCount * TOPIK_ANSWER_TIME_PER_QUESTION_MS,
            };
          });
        });

      return {
        key: `topik-exam-${session.exam.id}`,
        audioUrl: session.exam.listeningAudioUrl,
        transcript: speechSegments.flatMap((segment) => segment.transcript),
        speechSegments,
        repeatCount: 1,
        speechRate: TOPIK_EXAM_TTS_RATE,
        volume: 1,
        respectSoundSettings: false,
        fallbackToSpeech: true,
      };
    }, [session]);
  const stepStartIndices = useMemo(() => {
    if (!isListening) return questions.map((_, index) => index);
    return questions.reduce<number[]>((indices, item, index) => {
      if (index === 0 || item.group.code !== questions[index - 1].group.code) {
        indices.push(index);
      }
      return indices;
    }, []);
  }, [isListening, questions]);
  const activeStepIndex = Math.max(
    0,
    stepStartIndices.findIndex((startIndex, index) => {
      const nextStart = stepStartIndices[index + 1] ?? questions.length;
      return currentIndex >= startIndex && currentIndex < nextStart;
    }),
  );
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
  const activeQuestionKey = activeQuestions.map((item) => item.id).join(",");
  const allActiveAnswered =
    activeQuestions.length > 0 &&
    activeQuestions.every((item) => Boolean(answers[item.id]));
  const showListeningTranscript =
    allActiveAnswered &&
    activeQuestions.some((item) => Boolean(revealedSolutions[item.id]));
  const progressEndNumber =
    activeQuestions[activeQuestions.length - 1]?.number ?? currentIndex + 1;
  const progressLabel =
    activeQuestions.length > 1
      ? `${activeQuestions[0].number}–${progressEndNumber} / ${questions.length}`
      : `${progressEndNumber} / ${questions.length}`;

  useEffect(() => {
    if (!examCode) return;
    void start(examCode, mode);
  }, [examCode, mode, start]);

  const playGuidedAudio = useCallback(
    (audio: TopikAudio, repeatCount: number) => {
      const currentCount = guidedPlayCountsRef.current[audio.key] ?? 0;
      if (currentCount >= audio.guidedPlaybackLimit) return;

      const started = listeningPlayback.play({
        key: audio.key,
        audioUrl: audio.audioUrl,
        transcript: audio.transcript,
        repeatCount,
        repeatPauseMs: repeatCount > 1 ? 900 : 0,
        fallbackToSpeech: audio.speechFallback,
      });
      if (!started) return;

      const nextCounts = {
        ...guidedPlayCountsRef.current,
        [audio.key]: currentCount + 1,
      };
      guidedPlayCountsRef.current = nextCounts;
      setGuidedPlayCounts(nextCounts);
    },
    [listeningPlayback.play],
  );

  useEffect(() => {
    if (
      isLoading ||
      !attempt ||
      !session ||
      !isListening ||
      !mockPlaybackRequest ||
      session.exam.code !== examCode ||
      attempt.examId !== session.exam.id ||
      attempt.mode !== mode
    ) {
      return;
    }

    if (attempt.mode === "mock_exam") {
      if (mockStartedAttemptRef.current === attempt.id) return;
      mockStartedAttemptRef.current = attempt.id;
      listeningPlayback.play(mockPlaybackRequest);
      return;
    }

    if (!activeAudio || guidedStartedAttemptRef.current === attempt.id) return;
    guidedStartedAttemptRef.current = attempt.id;
    guidedPlayCountsRef.current = {};
    setGuidedPlayCounts({});
    playGuidedAudio(activeAudio, activeAudioRepeatCount);
  }, [
    activeAudio,
    activeAudioRepeatCount,
    attempt,
    examCode,
    isListening,
    isLoading,
    listeningPlayback.play,
    mode,
    mockPlaybackRequest,
    playGuidedAudio,
    session,
  ]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (attempt?.mode === "guided" && activeQuestions.length > 0) {
      activeQuestions.forEach((item) => void loadLearningSupport(item.id));
    }
  }, [activeQuestionKey, activeQuestions, attempt?.mode, loadLearningSupport]);

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

  const moveByStep = async (direction: -1 | 1) => {
    const nextStep = Math.min(
      Math.max(activeStepIndex + direction, 0),
      stepStartIndices.length - 1,
    );
    const nextIndex = stepStartIndices[nextStep] ?? 0;
    await moveTo(nextIndex);

    if (direction !== 1 || attempt?.mode !== "guided" || !isListening) return;
    const nextQuestion = questions[nextIndex];
    const nextAudio = nextQuestion?.audio ?? nextQuestion?.group.sharedAudio;
    if (!nextQuestion || !nextAudio) return;
    const repeatCount =
      nextAudio.guidedAutoRepeatCount ?? (nextQuestion.number >= 21 ? 2 : 1);
    playGuidedAudio(nextAudio, repeatCount);
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
      listeningPlayback.stop();
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
      listeningPlayback.stop();
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

  const revealQuestionSolution = async (questionId: string) => {
    setSupportQuestionId(questionId);

    setSupportErrorVisible(false);
    setBusy(true);
    try {
      await saveProgress();
      await revealSolution(questionId);
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
                { width: `${(progressEndNumber / questions.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progressLabel}</Text>
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

        {isListening ? (
          <TopikListeningQuestionCard
            questions={activeQuestions}
            mode={attempt.mode}
            selectedChoiceKeys={Object.fromEntries(
              activeQuestions.map((item) => [
                item.id,
                answers[item.id]?.selectedChoiceKey,
              ]),
            )}
            correctChoiceKeys={Object.fromEntries(
              activeQuestions.map((item) => [
                item.id,
                revealedSolutions[item.id]?.correctChoiceKey,
              ]),
            )}
            showTranscript={showListeningTranscript}
            playbackStatus={listeningPlayback.status}
            activeAudioKey={listeningPlayback.activeKey}
            playCount={
              activeAudio ? (guidedPlayCounts[activeAudio.key] ?? 0) : 0
            }
            onPlayAudio={() => {
              if (activeAudio) {
                playGuidedAudio(activeAudio, activeAudioRepeatCount);
              }
            }}
            onStopAudio={listeningPlayback.stop}
            onSelect={(questionId, choiceKey) =>
              selectAnswer(questionId, choiceKey)
            }
            renderSupport={(item) =>
              attempt.mode === "guided" ? (
                <TopikHintPanel
                  support={learningSupport[item.id]}
                  solution={revealedSolutions[item.id]}
                  selected={allActiveAnswered}
                  busy={busy}
                  onRevealHint={async () => {
                    setBusy(true);
                    try {
                      await revealNextHint(item.id);
                    } finally {
                      setBusy(false);
                    }
                  }}
                  onRevealSolution={() => void revealQuestionSolution(item.id)}
                />
              ) : null
            }
          />
        ) : (
          <>
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
                onRevealSolution={() =>
                  void revealQuestionSolution(question.id)
                }
              />
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          disabled={activeStepIndex === 0 || busy}
          onPress={() => void moveByStep(-1)}
          style={[
            styles.secondaryButton,
            activeStepIndex === 0 && styles.disabled,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={21}
            color={palette.textSecondary}
          />
          <Text style={styles.secondaryText}>{t("topik.exam.previous")}</Text>
        </Pressable>
        {activeStepIndex === stepStartIndices.length - 1 ? (
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
            onPress={() => void moveByStep(1)}
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
        onPrimary={() =>
          void revealQuestionSolution(supportQuestionId ?? question.id)
        }
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
