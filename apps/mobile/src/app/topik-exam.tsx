import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopikHintPanel, TopikQuestionCard } from "@/components/topik";
import { useTopikAttemptStore } from "@/store/topik-attempt.store";
import { flattenTopikQuestions, type TopikAttemptMode } from "@/types/topik";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TopikExamScreen() {
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
    Alert.alert("시험을 나갈까요?", "지금까지 선택한 답은 자동 저장됩니다.", [
      { text: "계속 풀기", style: "cancel" },
      {
        text: "나가기",
        onPress: () => {
          void saveProgress();
          router.back();
        },
      },
    ]);
  };

  const confirmSubmit = () => {
    const unanswered = questions.length - answeredCount;
    Alert.alert(
      "답안을 제출할까요?",
      unanswered > 0
        ? `아직 풀지 않은 문제가 ${unanswered}개 있어요.`
        : "제출 후에는 답을 바꿀 수 없어요.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "제출",
          onPress: async () => {
            setBusy(true);
            try {
              const result = await submit();
              router.replace({
                pathname: "/topik-result",
                params: { attemptId: result.attemptId },
              });
            } catch {
              Alert.alert("제출 실패", "잠시 후 다시 시도해 주세요.");
            } finally {
              setBusy(false);
            }
          },
        },
      ],
    );
  };

  if (!examCode) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorTitle}>시험 정보가 없습니다.</Text>
        <Pressable
          onPress={() => router.replace("/topik")}
          style={styles.errorButton}
        >
          <Text style={styles.errorButtonText}>시험 선택으로</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (isLoading || !question || !attempt) {
    return (
      <SafeAreaView style={styles.centered}>
        {errorCode ? (
          <>
            <Ionicons name="alert-circle-outline" size={34} color="#A3463B" />
            <Text style={styles.errorTitle}>시험을 시작하지 못했어요.</Text>
            <Pressable
              onPress={() => void start(examCode, mode)}
              style={styles.errorButton}
            >
              <Text style={styles.errorButtonText}>다시 시도</Text>
            </Pressable>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#173B67" />
            <Text style={styles.loadingText}>시험지를 준비하고 있어요.</Text>
          </>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={confirmExit} style={styles.headerButton}>
          <Ionicons name="close" size={25} color="#25384E" />
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
          <Ionicons name="time-outline" size={16} color="#173B67" />
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
            {attempt.mode === "guided" ? "해설 학습" : "실전 모의고사"}
          </Text>
          <Text style={styles.answerCount}>
            답안 {answeredCount}/{questions.length}
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
            onRevealSolution={async () => {
              setBusy(true);
              try {
                await revealSolution(question.id);
              } catch {
                Alert.alert(
                  "풀이를 열지 못했어요.",
                  "답을 저장한 뒤 다시 시도해 주세요.",
                );
              } finally {
                setBusy(false);
              }
            }}
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
          <Ionicons name="chevron-back" size={21} color="#435266" />
          <Text style={styles.secondaryText}>이전</Text>
        </Pressable>
        {currentIndex === questions.length - 1 ? (
          <Pressable
            disabled={busy}
            onPress={confirmSubmit}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>제출하기</Text>
          </Pressable>
        ) : (
          <Pressable
            disabled={busy}
            onPress={() => void moveTo(currentIndex + 1)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>다음</Text>
            <Ionicons name="chevron-forward" size={21} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F0EA",
    paddingBottom: 40,
    paddingTop: 40,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    backgroundColor: "#F2F0EA",
    padding: 24,
  },
  loadingText: { color: "#66717D", fontSize: 13 },
  errorTitle: {
    color: "#3D4650",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  errorButton: {
    borderRadius: 10,
    backgroundColor: "#173B67",
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  errorButtonText: { color: "#FFFFFF", fontWeight: "800" },
  header: {
    minHeight: 61,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#DEDCD6",
    backgroundColor: "#FFFEFB",
    paddingHorizontal: 12,
  },
  headerButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  progressArea: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  progressTrack: {
    flex: 1,
    height: 7,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#E4E6E8",
  },
  progressFill: { height: "100%", borderRadius: 4, backgroundColor: "#1D5D98" },
  progressText: { color: "#66717B", fontSize: 11, fontWeight: "800" },
  timer: {
    minWidth: 69,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  timerText: {
    color: "#173B67",
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
    color: "#173B67",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  answerCount: { color: "#777D84", fontSize: 11, fontWeight: "700" },
  footer: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#DFDDD7",
    backgroundColor: "#FFFEFB",
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
    borderColor: "#CBD0D5",
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  secondaryText: { color: "#435266", fontSize: 14, fontWeight: "800" },
  primaryButton: {
    flex: 1,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 13,
    backgroundColor: "#173B67",
  },
  primaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  disabled: { opacity: 0.36 },
});
