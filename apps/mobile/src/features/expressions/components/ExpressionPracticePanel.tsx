import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useSpeakingPalette } from "@/features/speaking/palette";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import {
  type AssessResult,
  SttService,
  wordToneOf,
} from "@/services/stt.service";
import * as Haptics from "@/utils/haptics";
import type { ExpressionLearningQueueItem } from "../utils/expression-learning-queue";

type SpeechPhase = "idle" | "recording" | "analyzing" | "done";

const RECORDING_COLOR = "#E8505B";
const SHEET_HIDDEN_Y = 1200;
const EXPRESSION_END_SILENCE_MS = 1000;

interface Props {
  item: ExpressionLearningQueueItem;
  typingActive: boolean;
  ready: boolean;
  onTypePress: () => void;
  onOpenSpeaking: () => void;
  onPracticeComplete: () => void;
  onPracticeMiss: () => void;
  onSpeechPassed: () => void;
  onBusyChange: (busy: boolean) => void;
  onStopSpeech: () => void;
}

const WORD_TONES = {
  good: { background: "#E4F8DD", border: "#52A94A", text: "#2F7A2A" },
  warn: { background: "#FFF3CE", border: "#E9AC32", text: "#8A6518" },
  bad: { background: "#FFE2E2", border: "#E35A5A", text: "#A53636" },
} as const;

function RecordingWaveBar({
  height,
  index,
}: {
  height: number;
  index: number;
}) {
  const scaleY = useSharedValue(0.42);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.68 + scaleY.value * 0.32,
    transform: [{ scaleY: scaleY.value }],
  }));

  useEffect(() => {
    scaleY.value = withDelay(
      index * 75,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 280 }),
          withTiming(0.42, { duration: 320 }),
        ),
        -1,
        true,
      ),
    );
    return () => cancelAnimation(scaleY);
  }, [index, scaleY]);

  return <Animated.View style={[styles.waveBar, { height }, animatedStyle]} />;
}

export default function ExpressionPracticePanel({
  item,
  typingActive,
  ready,
  onTypePress,
  onOpenSpeaking,
  onPracticeComplete,
  onPracticeMiss,
  onSpeechPassed,
  onBusyChange,
  onStopSpeech,
}: Props) {
  const { t } = useTranslation();
  const palette = useSpeakingPalette();
  const insets = useSafeAreaInsets();
  const requiresAnswer = item.kind === "quiz" || item.kind === "retry";
  const [sheetVisible, setSheetVisible] = useState(false);
  const [phase, setPhase] = useState<SpeechPhase>("idle");
  const [result, setResult] = useState<AssessResult | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const assessmentRunRef = useRef(0);
  const recorderStartRef = useRef(0);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const sheetY = useSharedValue(SHEET_HIDDEN_Y);

  useEffect(() => {
    onBusyChange(false);
    return () => {
      assessmentRunRef.current += 1;
      recorderStartRef.current += 1;
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      onBusyChange(false);
    };
  }, [item.key, onBusyChange]);

  useEffect(() => {
    onBusyChange(phase === "recording" || phase === "analyzing");
  }, [onBusyChange, phase]);

  const handleWav = useCallback(
    async (wav: ArrayBuffer) => {
      const assessmentRun = assessmentRunRef.current + 1;
      assessmentRunRef.current = assessmentRun;
      setPhase("analyzing");
      setErrorKey(null);
      try {
        const assessment = await SttService.assessExpression(
          item.expression.id,
          wav,
        );
        if (assessmentRun !== assessmentRunRef.current) return;
        if (assessment.status !== "success") {
          setErrorKey("lesson.speaking.noSpeech");
          setPhase("idle");
          return;
        }

        setResult(assessment);
        setPhase("done");
        onPracticeComplete();
        if (assessment.passed) {
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          );
          autoAdvanceTimerRef.current = setTimeout(() => {
            setSheetVisible(false);
            onSpeechPassed();
          }, 380);
        } else {
          onPracticeMiss();
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning,
          );
        }
      } catch {
        if (assessmentRun !== assessmentRunRef.current) return;
        setErrorKey("lesson.speaking.checkFailed");
        setPhase("idle");
      }
    },
    [item.expression.id, onPracticeComplete, onPracticeMiss, onSpeechPassed],
  );

  const { start, stop, cancel } = useSpeechRecorder({
    maxSeconds: 15,
    // Voice must begin first; then one second of silence submits naturally.
    silenceStopMs: EXPRESSION_END_SILENCE_MS,
    onResult: handleWav,
    onError: (code) => {
      setPhase("idle");
      setErrorKey(
        code === "unsupported"
          ? "lesson.speaking.notSupportedHere"
          : code === "permission"
            ? "lesson.speaking.micDenied"
            : code === "too_short"
              ? "lesson.speaking.tooShort"
              : "lesson.speaking.micFailed",
      );
    },
  });

  const finishClose = useCallback(() => setSheetVisible(false), []);

  const closePractice = useCallback(() => {
    assessmentRunRef.current += 1;
    recorderStartRef.current += 1;
    cancel();
    setPhase("idle");
    setErrorKey(null);
    sheetY.value = withTiming(
      SHEET_HIDDEN_Y,
      { duration: 210, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(finishClose)();
      },
    );
    void Haptics.selectionAsync();
  }, [cancel, finishClose, sheetY]);

  const beginRecording = useCallback(async () => {
    const startAttempt = recorderStartRef.current + 1;
    recorderStartRef.current = startAttempt;
    setErrorKey(null);
    setResult(null);

    const started = await start();
    if (startAttempt !== recorderStartRef.current) {
      if (started) cancel();
      return;
    }
    if (started) setPhase("recording");
  }, [cancel, start]);

  const openPractice = useCallback(() => {
    onStopSpeech();
    onOpenSpeaking();
    cancel();
    setPhase("idle");
    setResult(null);
    setErrorKey(null);
    setSheetVisible(true);
    void beginRecording();
    void Haptics.selectionAsync();
  }, [beginRecording, cancel, onOpenSpeaking, onStopSpeech]);

  useEffect(() => {
    if (!sheetVisible) return;
    sheetY.value = SHEET_HIDDEN_Y;
    sheetY.value = withTiming(0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [sheetVisible, sheetY]);

  const handleMicPress = async () => {
    if (phase === "analyzing") return;
    if (phase === "recording") {
      stop();
      return;
    }

    onStopSpeech();
    await beginRecording();
  };

  const skipPractice = () => {
    onPracticeMiss();
    onPracticeComplete();
  };

  const stageLabel = t(`expressionLearning.practice.stage.${item.stage}`);
  const prompt = t(`expressionLearning.practice.speakPrompt.${item.stage}`);
  const speechHint =
    errorKey ??
    (phase === "recording"
      ? "lesson.speaking.listening"
      : phase === "analyzing"
        ? "lesson.speaking.analyzing"
        : phase === "idle"
          ? "lesson.speaking.tapToSpeak"
          : null);
  const scoreTone = result?.passed
    ? WORD_TONES.good
    : result && result.scores.pron >= result.threshold.pron - 15
      ? WORD_TONES.warn
      : WORD_TONES.bad;

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(0, sheetY.value) }],
  }));
  const sheetGesture = Gesture.Pan()
    .activeOffsetY(6)
    .failOffsetY(-8)
    .failOffsetX([-24, 24])
    .onUpdate((event) => {
      sheetY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      if (event.translationY > 92 || event.velocityY > 720) {
        runOnJS(closePractice)();
        return;
      }
      sheetY.value = withTiming(0, {
        duration: 170,
        easing: Easing.out(Easing.cubic),
      });
    });

  return (
    <>
      <View
        style={[
          styles.triggerGroup,
          { backgroundColor: palette.bg, borderColor: palette.border },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("expressionLearning.practice.speakMode")}
          accessibilityState={{ selected: sheetVisible }}
          onPress={openPractice}
          style={({ pressed }) => [
            styles.triggerButton,
            sheetVisible && { backgroundColor: palette.primary },
            { opacity: pressed ? 0.58 : 1 },
          ]}
        >
          <Ionicons
            name="mic-outline"
            size={22}
            color={sheetVisible ? "#FFFFFF" : palette.primary}
          />
        </Pressable>
        <View
          style={[styles.triggerDivider, { backgroundColor: palette.border }]}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("expressionLearning.practice.typeMode")}
          accessibilityState={{ selected: typingActive }}
          onPress={onTypePress}
          style={({ pressed }) => [
            styles.triggerButton,
            typingActive && { backgroundColor: palette.primary },
            { opacity: pressed ? 0.58 : 1 },
          ]}
        >
          <MaterialCommunityIcons
            name="keyboard-outline"
            size={24}
            color={typingActive ? "#FFFFFF" : palette.primary}
          />
        </Pressable>
      </View>

      <Modal
        visible={sheetVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closePractice}
      >
        <GestureHandlerRootView style={styles.sheetRoot}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("common.close")}
            onPress={closePractice}
            style={styles.transparentBackdrop}
          />

          <GestureDetector gesture={sheetGesture}>
            <Animated.View
              style={[
                styles.sheet,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                  paddingBottom: Math.max(insets.bottom, 14),
                },
                sheetAnimatedStyle,
              ]}
            >
              <Animated.View style={styles.sheetGrabArea}>
                <View
                  style={[
                    styles.sheetHandle,
                    { backgroundColor: palette.border },
                  ]}
                />
              </Animated.View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.sheetContent}
              >
                <View style={styles.panel}>
                  <View style={styles.panelHeader}>
                    <View style={styles.stageCopy}>
                      <Text
                        style={[styles.stageLabel, { color: palette.primary }]}
                      >
                        {stageLabel}
                      </Text>
                      <Text style={[styles.prompt, { color: palette.ink }]}>
                        {prompt}
                      </Text>
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={t("common.close")}
                      onPress={closePractice}
                      style={[
                        styles.closeButton,
                        { backgroundColor: palette.bg },
                      ]}
                    >
                      <Ionicons
                        name="chevron-down"
                        size={20}
                        color={palette.muted}
                      />
                    </Pressable>
                  </View>

                  <View style={styles.practiceBody}>
                    {result ? (
                      <View
                        style={[
                          styles.resultCard,
                          {
                            backgroundColor: scoreTone.background,
                            borderColor: scoreTone.border,
                          },
                        ]}
                      >
                        <View style={styles.resultTop}>
                          <Text
                            style={[styles.score, { color: scoreTone.text }]}
                          >
                            {result.scores.pron}
                          </Text>
                          <View style={styles.resultCopy}>
                            <Text
                              style={[
                                styles.resultTitle,
                                { color: scoreTone.text },
                              ]}
                            >
                              {t(
                                result.passed
                                  ? "expressionLearning.practice.passed"
                                  : "expressionLearning.practice.needsPractice",
                              )}
                            </Text>
                            <Text
                              style={[
                                styles.resultCaption,
                                { color: scoreTone.text },
                              ]}
                            >
                              {t("lesson.speaking.scoreLabel")}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.wordRow}>
                          {result.words.map((word, index) => {
                            const tone = WORD_TONES[wordToneOf(word)];
                            return (
                              <View
                                key={`${word.word}-${index}`}
                                style={[
                                  styles.wordChip,
                                  {
                                    backgroundColor: tone.background,
                                    borderBottomColor: tone.border,
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.wordText,
                                    { color: tone.text },
                                  ]}
                                >
                                  {word.word}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                        {result.transcript ? (
                          <Text
                            style={[
                              styles.heardText,
                              { color: scoreTone.text },
                            ]}
                          >
                            {t("lesson.speaking.heard")} · {result.transcript}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}

                    <View style={styles.micStage}>
                      <View
                        style={[
                          styles.micHalo,
                          {
                            borderColor:
                              phase === "recording"
                                ? `${RECORDING_COLOR}2E`
                                : palette.primarySoft,
                          },
                        ]}
                      >
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={t(
                            "expressionLearning.practice.speakMode",
                          )}
                          disabled={phase === "analyzing"}
                          onPress={() => void handleMicPress()}
                          style={({ pressed }) => [
                            styles.micButton,
                            {
                              backgroundColor:
                                phase === "recording"
                                  ? RECORDING_COLOR
                                  : phase === "analyzing"
                                    ? palette.muted
                                    : palette.primary,
                              opacity: pressed ? 0.82 : 1,
                              transform: [{ scale: pressed ? 0.94 : 1 }],
                            },
                          ]}
                        >
                          {phase === "analyzing" ? (
                            <ActivityIndicator color="#FFFFFF" />
                          ) : phase === "recording" ? (
                            <View style={styles.waveRow}>
                              {[16, 27, 21, 34, 25, 18].map((height, index) => (
                                <RecordingWaveBar
                                  key={index}
                                  height={height}
                                  index={index}
                                />
                              ))}
                            </View>
                          ) : (
                            <Ionicons name="mic" size={31} color="#FFFFFF" />
                          )}
                        </Pressable>
                      </View>
                      {speechHint ? (
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color: errorKey
                                ? "#D84B4B"
                                : phase === "recording"
                                  ? RECORDING_COLOR
                                  : palette.muted,
                            },
                          ]}
                        >
                          {t(speechHint)}
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  {requiresAnswer && !ready ? (
                    <Pressable
                      onPress={skipPractice}
                      style={styles.laterButton}
                    >
                      <Text
                        style={[styles.laterText, { color: palette.muted }]}
                      >
                        {t("expressionLearning.practice.later")}
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </ScrollView>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerGroup: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  triggerButton: {
    width: 42,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  triggerDivider: { width: 1, height: 21 },
  sheetRoot: { flex: 1, justifyContent: "flex-end" },
  transparentBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  sheet: {
    width: "100%",
    maxWidth: 680,
    maxHeight: "86%",
    minHeight: 430,
    alignSelf: "center",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderBottomWidth: 0,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
  },
  sheetGrabArea: {
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetHandle: { width: 42, height: 5, borderRadius: 99 },
  sheetContent: { flexGrow: 1 },
  panel: { flex: 1, paddingHorizontal: 20, paddingBottom: 8 },
  panelHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  stageCopy: { flex: 1, paddingTop: 2 },
  stageLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  prompt: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  practiceBody: { marginTop: 15 },
  micStage: {
    minHeight: 250,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 22,
  },
  micHalo: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 7,
    padding: 6,
  },
  statusText: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  micButton: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  waveRow: { height: 38, flexDirection: "row", alignItems: "center", gap: 4 },
  waveBar: { width: 4, borderRadius: 99, backgroundColor: "#FFFFFF" },
  resultCard: {
    marginBottom: 4,
    borderRadius: 18,
    borderWidth: 1,
    padding: 13,
  },
  resultTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  score: {
    fontSize: 31,
    lineHeight: 36,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  resultCopy: { flex: 1 },
  resultTitle: { fontSize: 13, lineHeight: 18, fontWeight: "800" },
  resultCaption: { marginTop: 1, fontSize: 10.5, fontWeight: "700" },
  wordRow: { marginTop: 9, flexDirection: "row", flexWrap: "wrap", gap: 5 },
  wordChip: {
    borderRadius: 8,
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  wordText: { fontSize: 12.5, fontWeight: "800" },
  heardText: {
    marginTop: 8,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "700",
  },
  laterButton: {
    alignSelf: "center",
    minHeight: 44,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  laterText: { fontSize: 11.5, fontWeight: "700" },
});
