import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  SlideInDown,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import { useSound } from "@/hooks/useSound";
import * as Haptics from "@/utils/haptics";
import { openCelebration } from "@/utils/streak-chest-route";
import { StoriesService } from "@/services/stories.service";
import { withAlpha, type ScenePalette } from "./scenes";
import type { StoriesCopy } from "./stories.copy";
import type { CompleteStoryResult, StoryDetail } from "./stories.types";

/**
 * 끝 시트: 세 문제 → 저장(XP) → 다음 이야기가 저절로 시작된다.
 *
 * 다음 이야기 버튼 자체가 카운트다운이다 — 보라색이 버튼을 채우면 넘어간다.
 * 틀어 놓고 보는 사람은 손을 안 대도 다음 이야기로 이어지고, 멈추고 싶으면
 * "다시 듣기"나 닫기를 누른다.
 */

const GREEN = "#58CC02";
const GREEN_DEPTH = "#58A700";
const RED = "#FF4B4B";
const RED_DEPTH = "#D33B3B";
const VIOLET = "#776EE2";
const VIOLET_DEEP = "#5B4DD4";
const GOLD = "#FFD900";
const GOLD_DEPTH = "#E5AE00";
const AUTOPLAY_MS = 8000;

type Step = "quiz" | "saving" | "result" | "error";

interface Props {
  story: StoryDetail;
  palette: ScenePalette;
  copy: StoriesCopy;
  bottomInset: number;
  /** 축하 화면이 위에 떠 있는 동안 카운트다운을 멈춘다 */
  focused: boolean;
  onListenAgain: () => void;
  onPlayNext: (code: string) => void;
  onClose: () => void;
}

function StoryFinishSheetBase({
  story,
  palette,
  copy,
  bottomInset,
  focused,
  onListenAgain,
  onPlayNext,
  onClose,
}: Props) {
  const { play } = useSound();
  const hasQuiz = story.questions.length > 0;
  const [step, setStep] = useState<Step>(hasQuiz ? "quiz" : "saving");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<CompleteStoryResult | null>(null);
  const answersRef = useRef<{ questionId: string; choiceIndex: number }[]>([]);
  const submittedRef = useRef(false);

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setStep("saving");
    try {
      const saved = await StoriesService.complete(story.code, answersRef.current);
      setResult(saved);
      setStep("result");
      if (saved.xpEarned > 0) play("lessonComplete");
      // 오늘 첫 완료면 연속 도장, 3·6·9일째면 상자 — 닫으면 이 시트로 돌아온다
      openCelebration(saved.celebration, "back");
    } catch {
      submittedRef.current = false;
      setStep("error");
    }
  }, [play, story.code]);

  useEffect(() => {
    if (!hasQuiz) void submit();
  }, [hasQuiz, submit]);

  const question = story.questions[questionIndex];

  const pick = (choice: number) => {
    if (picked !== null || !question) return;
    setPicked(choice);
    answersRef.current.push({ questionId: question.id, choiceIndex: choice });
    const right = choice === question.answerIndex;
    play(right ? "correct" : "wrong");
    void Haptics.notificationAsync(
      right
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    );
    setTimeout(() => {
      if (questionIndex + 1 < story.questions.length) {
        setQuestionIndex((index) => index + 1);
        setPicked(null);
      } else {
        void submit();
      }
    }, right ? 750 : 1300);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        entering={FadeIn.duration(220)}
        style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.5)" }]}
      />
      <Animated.View
        entering={SlideInDown.duration(320).easing(Easing.out(Easing.cubic))}
        style={[
          styles.sheet,
          {
            backgroundColor: palette.groundDeep,
            borderColor: withAlpha(palette.ink, 0.1),
            paddingBottom: bottomInset + 20,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: palette.ink }]}>
            {copy.finishedTitle}
          </Text>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={copy.close}
            hitSlop={10}
            style={[styles.close, { backgroundColor: withAlpha(palette.ink, 0.1) }]}
          >
            <Ionicons name="close" size={20} color={palette.ink} />
          </Pressable>
        </View>

        {step === "quiz" && question && (
          <Animated.View key={question.id} entering={FadeInDown.duration(240)}>
            <View style={styles.quizMeta}>
              <Text style={[styles.quizLabel, { color: withAlpha(palette.ink, 0.6) }]}>
                {copy.quizTitle}
              </Text>
              <View style={styles.dots}>
                {story.questions.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          index <= questionIndex
                            ? palette.glow
                            : withAlpha(palette.ink, 0.18),
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
            <Text style={[styles.prompt, { color: palette.ink }]}>
              {question.prompt}
            </Text>
            <View style={styles.options}>
              {question.options.map((option, index) => (
                <AnswerChip
                  key={option}
                  label={option}
                  palette={palette}
                  state={
                    picked === null
                      ? "idle"
                      : index === question.answerIndex
                        ? "correct"
                        : index === picked
                          ? "wrong"
                          : "muted"
                  }
                  onPress={() => pick(index)}
                />
              ))}
            </View>
            <Pressable
              onPress={() => void submit()}
              accessibilityRole="button"
              hitSlop={8}
              style={styles.skip}
            >
              <Text style={[styles.skipText, { color: withAlpha(palette.ink, 0.6) }]}>
                {copy.skipQuiz}
              </Text>
            </Pressable>
          </Animated.View>
        )}

        {step === "saving" && (
          <View style={styles.center}>
            <ActivityIndicator color={palette.glow} />
            <Text style={[styles.note, { color: withAlpha(palette.ink, 0.7) }]}>
              {copy.saving}
            </Text>
          </View>
        )}

        {step === "error" && (
          <View style={styles.center}>
            <Text style={[styles.note, { color: palette.ink }]}>{copy.saveFailed}</Text>
            <SlabButton
              label={copy.retry}
              face={VIOLET}
              depth={VIOLET_DEEP}
              onPress={() => void submit()}
            />
          </View>
        )}

        {step === "result" && result && (
          <Animated.View entering={FadeInDown.duration(260)}>
            <View style={styles.resultRow}>
              {result.xpEarned > 0 && (
                <View style={[styles.xp, { backgroundColor: GOLD, borderBottomColor: GOLD_DEPTH }]}>
                  <Text style={styles.xpText}>{copy.xp(result.xpEarned)}</Text>
                </View>
              )}
              {result.quizTotal > 0 && (
                <Text style={[styles.score, { color: withAlpha(palette.ink, 0.75) }]}>
                  {copy.quizScore(result.quizCorrect, result.quizTotal)}
                </Text>
              )}
            </View>

            {result.nextCode ? (
              <CountdownButton
                label={copy.playNext}
                countdown={copy.nextIn}
                running={focused}
                onDone={() => onPlayNext(result.nextCode as string)}
              />
            ) : (
              <Text style={[styles.note, { color: withAlpha(palette.ink, 0.75) }]}>
                {copy.allDone}
              </Text>
            )}
            <Pressable
              onPress={onListenAgain}
              accessibilityRole="button"
              style={[styles.secondary, { backgroundColor: withAlpha(palette.ink, 0.1) }]}
            >
              <Ionicons name="refresh" size={18} color={palette.ink} />
              <Text style={[styles.secondaryText, { color: palette.ink }]}>
                {copy.listenAgain}
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

export const StoryFinishSheet = memo(StoryFinishSheetBase);

/* ───────────────────────── 조각 ───────────────────────── */

function AnswerChip({
  label,
  palette,
  state,
  onPress,
}: {
  label: string;
  palette: ScenePalette;
  state: "idle" | "correct" | "wrong" | "muted";
  onPress: () => void;
}) {
  const face =
    state === "correct"
      ? GREEN
      : state === "wrong"
        ? RED
        : withAlpha(palette.ink, state === "muted" ? 0.05 : 0.1);
  const slab =
    state === "correct"
      ? GREEN_DEPTH
      : state === "wrong"
        ? RED_DEPTH
        : withAlpha("#000000", 0.35);
  const text = state === "correct" || state === "wrong" ? "#FFFFFF" : palette.ink;
  return (
    <Pressable
      onPress={onPress}
      disabled={state !== "idle"}
      sound={false}
      accessibilityRole="button"
      style={[
        styles.answer,
        { backgroundColor: face, borderBottomColor: slab },
        state === "muted" && { opacity: 0.55 },
      ]}
    >
      <Text style={[styles.answerText, { color: text }]}>{label}</Text>
      {state === "correct" && <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />}
      {state === "wrong" && <Ionicons name="close-circle" size={20} color="#FFFFFF" />}
    </Pressable>
  );
}

function SlabButton({
  label,
  face,
  depth,
  onPress,
}: {
  label: string;
  face: string;
  depth: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.slabButton, { backgroundColor: face, borderBottomColor: depth }]}
    >
      <Text style={styles.slabText}>{label}</Text>
    </Pressable>
  );
}

/** 보라색이 버튼을 채우면 다음 이야기로. 누르면 바로 */
function CountdownButton({
  label,
  countdown,
  running,
  onDone,
}: {
  label: string;
  countdown: (seconds: number) => string;
  running: boolean;
  onDone: () => void;
}) {
  const fill = useSharedValue(0);
  const [seconds, setSeconds] = useState(Math.round(AUTOPLAY_MS / 1000));
  const doneRef = useRef(false);
  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (!running) {
      cancelAnimation(fill);
      return;
    }
    const remaining = AUTOPLAY_MS * (1 - fill.value);
    fill.value = withTiming(1, { duration: remaining, easing: Easing.linear }, (done) => {
      if (done) runOnJS(finish)();
    });
    const timer = setInterval(() => {
      setSeconds(Math.max(1, Math.ceil((AUTOPLAY_MS * (1 - fill.value)) / 1000)));
    }, 250);
    return () => {
      clearInterval(timer);
      cancelAnimation(fill);
    };
  }, [fill, finish, running]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value * 100}%` }));

  return (
    <Pressable
      onPress={finish}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.countdown, { borderBottomColor: VIOLET_DEEP }]}
    >
      <Animated.View style={[styles.countdownFill, fillStyle]} />
      <Ionicons name="play" size={18} color="#FFFFFF" />
      <View>
        <Text style={styles.slabText}>{label}</Text>
        <Text style={styles.countdownHint}>{countdown(seconds)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  title: { flex: 1, fontSize: 26, lineHeight: 31, fontWeight: "900", letterSpacing: -0.4 },
  close: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  quizMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  quizLabel: { flexShrink: 1, fontSize: 13, fontWeight: "800" },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 18, height: 6, borderRadius: 3 },
  prompt: { marginTop: 10, fontSize: 20, lineHeight: 27, fontWeight: "900" },
  options: { marginTop: 14, gap: 10 },
  answer: {
    minHeight: 50,
    borderRadius: 14,
    borderBottomWidth: 3,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  answerText: { flex: 1, fontSize: 16, lineHeight: 21, fontWeight: "800" },
  skip: { alignSelf: "center", paddingVertical: 14 },
  skipText: { fontSize: 14, fontWeight: "800" },
  center: { alignItems: "center", gap: 14, paddingVertical: 28 },
  note: { fontSize: 15, lineHeight: 21, fontWeight: "800", textAlign: "center", marginVertical: 10 },
  resultRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 18 },
  xp: { borderRadius: 12, borderBottomWidth: 3, paddingHorizontal: 12, paddingVertical: 6 },
  xpText: { fontSize: 16, fontWeight: "900", color: "#5B4DD4" },
  score: { fontSize: 15, fontWeight: "800" },
  slabButton: {
    minWidth: 160,
    height: 54,
    borderRadius: 16,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  slabText: { color: "#FFFFFF", fontSize: 17, fontWeight: "900" },
  countdown: {
    height: 62,
    borderRadius: 16,
    borderBottomWidth: 4,
    backgroundColor: VIOLET_DEEP,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  countdownFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: VIOLET,
  },
  countdownHint: { color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: "800" },
  secondary: {
    marginTop: 12,
    height: 50,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryText: { fontSize: 15, fontWeight: "900" },
});
