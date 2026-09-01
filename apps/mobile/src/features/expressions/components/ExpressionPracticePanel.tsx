import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { expressionPackThemeByCode } from "@/constants/expression-packs";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import { useTheme } from "@/hooks/useTheme";
import {
  type AssessResult,
  SttService,
  wordToneOf,
} from "@/services/stt.service";
import * as Haptics from "@/utils/haptics";
import type { ExpressionLearningQueueItem } from "../utils/expression-learning-queue";
import {
  buildExpressionTypingPlan,
  isExpressionTypingCorrect,
} from "../utils/expression-practice";

type PracticeMode = "speak" | "type";
type SpeechPhase = "idle" | "recording" | "analyzing" | "done";
type TypeState = "idle" | "wrong" | "correct";

interface Props {
  item: ExpressionLearningQueueItem;
  onReadyChange: (ready: boolean) => void;
  onBusyChange: (busy: boolean) => void;
  onReferenceVisibilityChange: (visible: boolean) => void;
  onScheduleRetry: () => void;
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
  onReadyChange,
  onBusyChange,
  onReferenceVisibilityChange,
  onScheduleRetry,
  onStopSpeech,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const packTheme = expressionPackThemeByCode(item.expression.pack.code);
  const requiresAnswer = item.kind === "quiz" || item.kind === "retry";
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [phase, setPhase] = useState<SpeechPhase>("idle");
  const [result, setResult] = useState<AssessResult | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typeState, setTypeState] = useState<TypeState>("idle");
  const [hintVisible, setHintVisible] = useState(false);
  const [ready, setReady] = useState(!requiresAnswer);
  const retryScheduledRef = useRef(false);

  const typingPlan = useMemo(
    () =>
      buildExpressionTypingPlan(
        item.expression.korean,
        item.expression.id,
        item.stage,
        item.exposure,
      ),
    [item.exposure, item.expression.id, item.expression.korean, item.stage],
  );

  useEffect(() => {
    const initiallyReady = !requiresAnswer;
    setReady(initiallyReady);
    onReadyChange(initiallyReady);
    onBusyChange(false);
    return () => onBusyChange(false);
  }, [item.key, onBusyChange, onReadyChange, requiresAnswer]);

  useEffect(() => {
    onBusyChange(phase === "recording" || phase === "analyzing");
  }, [onBusyChange, phase]);

  useEffect(() => {
    onReferenceVisibilityChange(
      (!requiresAnswer &&
        (mode === null || item.stage === "learn" || mode === "speak")) ||
        hintVisible ||
        ready,
    );
  }, [
    hintVisible,
    item.stage,
    mode,
    onReferenceVisibilityChange,
    ready,
    requiresAnswer,
  ]);

  const scheduleRetryOnce = useCallback(() => {
    if (retryScheduledRef.current) return;
    retryScheduledRef.current = true;
    onScheduleRetry();
  }, [onScheduleRetry]);

  const completePractice = useCallback(() => {
    setReady(true);
    onReadyChange(true);
  }, [onReadyChange]);

  const handleWav = useCallback(
    async (wav: ArrayBuffer) => {
      setPhase("analyzing");
      setErrorKey(null);
      try {
        const assessment = await SttService.assessExpression(
          item.expression.id,
          wav,
        );
        if (assessment.status !== "success") {
          setErrorKey("lesson.speaking.noSpeech");
          setPhase("idle");
          return;
        }

        setResult(assessment);
        setPhase("done");
        completePractice();
        if (assessment.passed) {
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          );
        } else {
          scheduleRetryOnce();
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning,
          );
        }
      } catch {
        setErrorKey("lesson.speaking.checkFailed");
        setPhase("idle");
      }
    },
    [completePractice, item.expression.id, scheduleRetryOnce],
  );

  const { start, stop, cancel } = useSpeechRecorder({
    maxSeconds: 15,
    silenceStopMs: 1300,
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

  const changeMode = (nextMode: PracticeMode) => {
    if (nextMode === mode) return;
    cancel();
    setPhase("idle");
    setResult(null);
    setErrorKey(null);
    setTypedAnswer("");
    setTypeState("idle");
    setHintVisible(false);
    setMode(nextMode);
    void Haptics.selectionAsync();
  };

  const handleMicPress = async () => {
    if (phase === "analyzing") return;
    if (phase === "recording") {
      stop();
      return;
    }

    onStopSpeech();
    setErrorKey(null);
    setResult(null);
    const started = await start();
    if (started) setPhase("recording");
  };

  const checkTypedAnswer = () => {
    if (isExpressionTypingCorrect(typedAnswer, typingPlan)) {
      setTypeState("correct");
      completePractice();
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }

    setTypeState("wrong");
    scheduleRetryOnce();
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const revealHint = () => {
    setHintVisible(true);
    scheduleRetryOnce();
    void Haptics.selectionAsync();
  };

  const skipPractice = () => {
    scheduleRetryOnce();
    completePractice();
    setHintVisible(true);
  };

  const stageLabel = t(`expressionLearning.practice.stage.${item.stage}`);
  const prompt =
    mode === null
      ? ""
      : t(
          mode === "speak"
            ? `expressionLearning.practice.speakPrompt.${item.stage}`
            : "expressionLearning.practice.typePrompt",
        );

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

  return (
    <View
      style={[
        styles.panel,
        mode === null && styles.collapsedPanel,
        {
          backgroundColor: `${theme.surface}F2`,
          borderColor: `${packTheme.accent}38`,
        },
      ]}
    >
      <View
        style={[
          styles.panelHeader,
          mode === null && styles.collapsedPanelHeader,
        ]}
      >
        {mode !== null ? (
          <View style={styles.stageCopy}>
            <Text style={[styles.stageLabel, { color: packTheme.accentDark }]}>
              {stageLabel}
            </Text>
            <Text style={[styles.prompt, { color: theme.text }]}>{prompt}</Text>
          </View>
        ) : null}

        <View
          style={[
            styles.modeSwitch,
            mode === null && styles.collapsedModeSwitch,
            { backgroundColor: theme.bg, borderColor: theme.border },
          ]}
        >
          {(
            [
              ["speak", "mic-outline", "expressionLearning.practice.speakMode"],
              [
                "type",
                "keypad-outline",
                "expressionLearning.practice.typeMode",
              ],
            ] as const
          ).map(([value, icon, label]) => {
            const active = mode === value;
            return (
              <Pressable
                key={value}
                accessibilityRole="button"
                accessibilityLabel={t(label)}
                accessibilityState={{ selected: active }}
                onPress={() => changeMode(value)}
                style={[
                  styles.modeButton,
                  mode === null && styles.collapsedModeButton,
                  active && { backgroundColor: packTheme.accent },
                ]}
              >
                <Ionicons
                  name={icon}
                  size={mode === null ? 25 : 20}
                  color={active ? "#FFFFFF" : theme.textSecondary}
                />
              </Pressable>
            );
          })}
        </View>
      </View>

      {mode === "speak" ? (
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
                <Text style={[styles.score, { color: scoreTone.text }]}>
                  {result.scores.pron}
                </Text>
                <View style={styles.resultCopy}>
                  <Text style={[styles.resultTitle, { color: scoreTone.text }]}>
                    {t(
                      result.passed
                        ? "expressionLearning.practice.passed"
                        : "expressionLearning.practice.needsPractice",
                    )}
                  </Text>
                  <Text
                    style={[styles.resultCaption, { color: scoreTone.text }]}
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
                      <Text style={[styles.wordText, { color: tone.text }]}>
                        {word.word}
                      </Text>
                    </View>
                  );
                })}
              </View>
              {result.transcript ? (
                <Text style={[styles.heardText, { color: scoreTone.text }]}>
                  {t("lesson.speaking.heard")} · {result.transcript}
                </Text>
              ) : null}
            </View>
          ) : null}

          {speechHint ? (
            <Text
              style={[
                styles.statusText,
                { color: errorKey ? "#D84B4B" : theme.textSecondary },
              ]}
            >
              {t(speechHint)}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("expressionLearning.practice.speakMode")}
            disabled={phase === "analyzing"}
            onPress={() => void handleMicPress()}
            style={({ pressed }) => [
              styles.micButton,
              {
                backgroundColor: packTheme.accent,
                borderBottomColor: packTheme.accentDark,
                opacity: phase === "analyzing" ? 0.6 : pressed ? 0.88 : 1,
              },
            ]}
          >
            {phase === "analyzing" ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : phase === "recording" ? (
              <View style={styles.waveRow}>
                {[16, 27, 21, 34, 25, 18].map((height, index) => (
                  <RecordingWaveBar key={index} height={height} index={index} />
                ))}
              </View>
            ) : (
              <Ionicons name="mic" size={29} color="#FFFFFF" />
            )}
          </Pressable>
        </View>
      ) : mode === "type" ? (
        <View style={styles.practiceBody}>
          {typingPlan.kind === "full" ? (
            <TextInput
              value={typedAnswer}
              onChangeText={(value) => {
                setTypedAnswer(value);
                setTypeState("idle");
              }}
              onSubmitEditing={checkTypedAnswer}
              editable={typeState !== "correct"}
              placeholder={t("expressionLearning.practice.typePlaceholder")}
              placeholderTextColor={theme.textSecondary}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
              style={[
                styles.fullInput,
                {
                  color: theme.text,
                  borderBottomColor:
                    typeState === "correct"
                      ? "#52A94A"
                      : typeState === "wrong"
                        ? "#E35A5A"
                        : packTheme.accent,
                },
              ]}
            />
          ) : (
            <View style={styles.clozeRow}>
              {typingPlan.tokens.map((token, tokenIndex) => {
                if (tokenIndex === typingPlan.blankStart) {
                  return (
                    <TextInput
                      key="expression-blank"
                      value={typedAnswer}
                      onChangeText={(value) => {
                        setTypedAnswer(value);
                        setTypeState("idle");
                      }}
                      onSubmitEditing={checkTypedAnswer}
                      editable={typeState !== "correct"}
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="done"
                      style={[
                        styles.inlineInput,
                        {
                          width: Math.min(
                            190,
                            Math.max(82, typingPlan.answer.length * 17),
                          ),
                          color: theme.text,
                          borderBottomColor:
                            typeState === "correct"
                              ? "#52A94A"
                              : typeState === "wrong"
                                ? "#E35A5A"
                                : packTheme.accent,
                        },
                      ]}
                    />
                  );
                }
                if (
                  tokenIndex > typingPlan.blankStart &&
                  tokenIndex < typingPlan.blankStart + typingPlan.blankCount
                ) {
                  return null;
                }
                return (
                  <Text
                    key={`${token}-${tokenIndex}`}
                    style={[styles.clozeToken, { color: theme.text }]}
                  >
                    {token}
                  </Text>
                );
              })}
            </View>
          )}

          {hintVisible ? (
            <View
              style={[
                styles.hintAnswer,
                { backgroundColor: packTheme.background },
              ]}
            >
              <Ionicons
                name="bulb-outline"
                size={16}
                color={packTheme.accentDark}
              />
              <Text style={[styles.hintAnswerText, { color: theme.text }]}>
                {typingPlan.answer}
              </Text>
            </View>
          ) : null}

          {typeState === "wrong" ? (
            <Text style={styles.wrongText}>
              {t("expressionLearning.practice.tryAgain")}
            </Text>
          ) : typeState === "correct" ? (
            <Text style={styles.correctText}>
              {t("expressionLearning.practice.correct")}
            </Text>
          ) : null}

          <View style={styles.typeActions}>
            {!hintVisible && typeState !== "correct" ? (
              <Pressable
                accessibilityRole="button"
                onPress={revealHint}
                style={[styles.hintButton, { borderColor: theme.border }]}
              >
                <Ionicons
                  name="bulb-outline"
                  size={17}
                  color={packTheme.accentDark}
                />
                <Text
                  style={[
                    styles.hintButtonText,
                    { color: packTheme.accentDark },
                  ]}
                >
                  {t("expressionLearning.practice.hint")}
                </Text>
              </Pressable>
            ) : null}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("expressionLearning.practice.check")}
              disabled={!typedAnswer.trim() || typeState === "correct"}
              onPress={checkTypedAnswer}
              style={[
                styles.checkButton,
                {
                  backgroundColor: packTheme.accent,
                  opacity:
                    !typedAnswer.trim() || typeState === "correct" ? 0.45 : 1,
                },
              ]}
            >
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      ) : null}

      {mode !== null && requiresAnswer && !ready ? (
        <Pressable onPress={skipPractice} style={styles.laterButton}>
          <Text style={[styles.laterText, { color: theme.textSecondary }]}>
            {t("expressionLearning.practice.later")}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 16,
    borderRadius: 21,
    borderWidth: 1.5,
    padding: 14,
  },
  collapsedPanel: {
    alignSelf: "center",
    padding: 7,
    borderRadius: 18,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  collapsedPanelHeader: { justifyContent: "center" },
  stageCopy: { flex: 1 },
  stageLabel: {
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.35,
  },
  prompt: { marginTop: 3, fontSize: 14, lineHeight: 20, fontWeight: "800" },
  modeSwitch: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    padding: 3,
  },
  collapsedModeSwitch: { padding: 4, borderRadius: 15 },
  modeButton: {
    width: 36,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  collapsedModeButton: { width: 52, height: 48, borderRadius: 13 },
  practiceBody: { marginTop: 14 },
  statusText: {
    marginBottom: 9,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  micButton: {
    width: 78,
    height: 54,
    alignSelf: "center",
    borderRadius: 18,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  waveRow: { height: 34, flexDirection: "row", alignItems: "center", gap: 4 },
  waveBar: { width: 4, borderRadius: 99, backgroundColor: "#FFFFFF" },
  resultCard: {
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    padding: 11,
  },
  resultTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  score: { fontSize: 31, lineHeight: 36, fontWeight: "900" },
  resultCopy: { flex: 1 },
  resultTitle: { fontSize: 13, lineHeight: 18, fontWeight: "900" },
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
  fullInput: {
    minHeight: 48,
    borderBottomWidth: 2.5,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
  },
  clozeRow: {
    minHeight: 48,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    gap: 6,
  },
  clozeToken: { fontSize: 17, lineHeight: 34, fontWeight: "800" },
  inlineInput: {
    height: 38,
    borderBottomWidth: 2.5,
    paddingHorizontal: 3,
    paddingVertical: 2,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  hintAnswer: {
    marginTop: 11,
    minHeight: 38,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  hintAnswerText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: "800" },
  wrongText: {
    marginTop: 8,
    color: "#D84B4B",
    fontSize: 12,
    fontWeight: "800",
  },
  correctText: {
    marginTop: 8,
    color: "#398E3D",
    fontSize: 12,
    fontWeight: "800",
  },
  typeActions: {
    marginTop: 12,
    minHeight: 42,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  hintButton: {
    minHeight: 40,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  hintButtonText: { fontSize: 12.5, fontWeight: "900" },
  checkButton: {
    width: 45,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  laterButton: { alignSelf: "center", paddingHorizontal: 12, paddingTop: 12 },
  laterText: { fontSize: 11.5, fontWeight: "800" },
});
