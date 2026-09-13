import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSpeakingPalette } from "@/features/speaking/palette";
import * as Haptics from "@/utils/haptics";
import type { ExpressionLearningQueueItem } from "../utils/expression-learning-queue";
import {
  buildExpressionTypingPlan,
  isExpressionTypingCorrect,
} from "../utils/expression-practice";
import ExpressionPracticePanel from "./ExpressionPracticePanel";
import SpokenText from "./SpokenText";

type TypeState = "idle" | "wrong" | "correct";

interface Props {
  item: ExpressionLearningQueueItem;
  speaking: boolean;
  speechPlaying: boolean;
  speechProgress: number;
  onSpeak: () => void;
  onStopSpeech: () => void;
  onPracticeReadyChange: (ready: boolean) => void;
  onPracticeBusyChange: (busy: boolean) => void;
  onScheduleRetry: () => void;
  onSpeechPassed: () => void;
}

const TYPE_TONES = {
  correct: "#52A94A",
  wrong: "#E35A5A",
} as const;

const DETAILS_LAYOUT_TRANSITION = LinearTransition.duration(220).easing(
  Easing.out(Easing.cubic),
);

export default function ExpressionLearningPage({
  item,
  speaking,
  speechPlaying,
  speechProgress,
  onSpeak,
  onStopSpeech,
  onPracticeReadyChange,
  onPracticeBusyChange,
  onScheduleRetry,
  onSpeechPassed,
}: Props) {
  const { t } = useTranslation();
  const palette = useSpeakingPalette();
  const expression = item.expression;
  const requiresAnswer = item.kind === "quiz" || item.kind === "retry";
  const inputRef = useRef<TextInput>(null);
  const retryScheduledRef = useRef(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [typingActive, setTypingActive] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typeState, setTypeState] = useState<TypeState>("idle");
  const [hintVisible, setHintVisible] = useState(false);
  const [ready, setReady] = useState(!requiresAnswer);

  const typingPlan = useMemo(
    () =>
      buildExpressionTypingPlan(
        expression.korean,
        expression.id,
        item.stage,
        item.exposure,
      ),
    [expression.id, expression.korean, item.exposure, item.stage],
  );

  useEffect(() => {
    const initiallyReady = !requiresAnswer;
    retryScheduledRef.current = false;
    setReady(initiallyReady);
    setTypingActive(false);
    setTypedAnswer("");
    setTypeState("idle");
    setHintVisible(false);
    onPracticeReadyChange(initiallyReady);

    return () => Keyboard.dismiss();
  }, [item.key, onPracticeReadyChange, requiresAnswer]);

  const scheduleRetryOnce = useCallback(() => {
    if (retryScheduledRef.current) return;
    retryScheduledRef.current = true;
    onScheduleRetry();
  }, [onScheduleRetry]);

  const completePractice = useCallback(() => {
    setReady(true);
    onPracticeReadyChange(true);
  }, [onPracticeReadyChange]);

  const openTyping = useCallback(() => {
    onStopSpeech();
    if (typingActive) {
      inputRef.current?.focus();
      return;
    }

    setTypedAnswer("");
    setTypeState("idle");
    setHintVisible(false);
    setTypingActive(true);
    void Haptics.selectionAsync();
  }, [onStopSpeech, typingActive]);

  const openSpeaking = useCallback(() => {
    Keyboard.dismiss();
    setTypingActive(false);
  }, []);

  const checkTypedAnswer = useCallback(() => {
    if (isExpressionTypingCorrect(typedAnswer, typingPlan)) {
      setTypeState("correct");
      completePractice();
      Keyboard.dismiss();
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }

    setTypeState("wrong");
    scheduleRetryOnce();
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [completePractice, scheduleRetryOnce, typedAnswer, typingPlan]);

  const revealHint = useCallback(() => {
    setHintVisible(true);
    scheduleRetryOnce();
    void Haptics.selectionAsync();
  }, [scheduleRetryOnce]);

  const skipTyping = useCallback(() => {
    scheduleRetryOnce();
    completePractice();
    setHintVisible(true);
    Keyboard.dismiss();
  }, [completePractice, scheduleRetryOnce]);

  const referenceVisible =
    !typingActive && (item.stage !== "recall" || hintVisible || ready);
  const inputBorderColor =
    typeState === "correct"
      ? TYPE_TONES.correct
      : typeState === "wrong"
        ? TYPE_TONES.wrong
        : palette.primary;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.scrollContent}
    >
      <Animated.View
        layout={DETAILS_LAYOUT_TRANSITION}
        style={[
          styles.expressionCard,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            shadowColor: palette.ink,
          },
        ]}
      >
        <View style={styles.cardTopRow}>
          <View
            style={[
              styles.speechChip,
              { backgroundColor: palette.primarySoft },
            ]}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={15}
              color={palette.primary}
            />
            <Text style={[styles.speechChipText, { color: palette.primary }]}>
              {t(`expressionPack.speechLevel.${expression.speechLevel}`)}
            </Text>
          </View>
        </View>

        <View style={styles.sentenceArea}>
          {typingActive ? (
            <View style={styles.inlinePractice}>
              <Text
                style={[styles.typingMeaningLabel, { color: palette.muted }]}
              >
                {t("expressionLearning.meaning")}
              </Text>
              <Text style={[styles.typingMeaningText, { color: palette.ink }]}>
                {expression.meaning}
              </Text>

              <View style={styles.inlinePracticeHeading}>
                <MaterialCommunityIcons
                  name="keyboard-outline"
                  size={18}
                  color={palette.primary}
                />
                <Text
                  style={[
                    styles.inlinePracticeLabel,
                    { color: palette.primary },
                  ]}
                >
                  {t("expressionLearning.practice.typePrompt")}
                </Text>
              </View>

              <View
                style={[
                  styles.typingField,
                  {
                    backgroundColor: palette.bg,
                    borderColor: inputBorderColor,
                  },
                ]}
              >
                {typingPlan.kind === "full" ? (
                  <TextInput
                    ref={inputRef}
                    autoFocus
                    value={typedAnswer}
                    onChangeText={(value) => {
                      setTypedAnswer(value);
                      setTypeState("idle");
                    }}
                    onSubmitEditing={checkTypedAnswer}
                    editable={typeState !== "correct"}
                    placeholder={t(
                      "expressionLearning.practice.typePlaceholder",
                    )}
                    placeholderTextColor={palette.muted}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="done"
                    style={[styles.fullInput, { color: palette.ink }]}
                  />
                ) : (
                  <View style={styles.clozeRow}>
                    {typingPlan.tokens.map((token, tokenIndex) => {
                      if (tokenIndex === typingPlan.blankStart) {
                        return (
                          <TextInput
                            ref={inputRef}
                            autoFocus
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
                                color: palette.ink,
                                borderBottomColor: inputBorderColor,
                              },
                            ]}
                          />
                        );
                      }
                      if (
                        tokenIndex > typingPlan.blankStart &&
                        tokenIndex <
                          typingPlan.blankStart + typingPlan.blankCount
                      ) {
                        return null;
                      }
                      return (
                        <Text
                          key={`${token}-${tokenIndex}`}
                          style={[styles.clozeToken, { color: palette.ink }]}
                        >
                          {token}
                        </Text>
                      );
                    })}
                  </View>
                )}
              </View>

              {hintVisible ? (
                <View
                  style={[
                    styles.hintAnswer,
                    { backgroundColor: palette.primarySoft },
                  ]}
                >
                  <Ionicons
                    name="bulb-outline"
                    size={16}
                    color={palette.primary}
                  />
                  <Text style={[styles.hintAnswerText, { color: palette.ink }]}>
                    {typingPlan.answer}
                  </Text>
                </View>
              ) : null}

              <View style={styles.typeFeedbackRow}>
                <Text
                  style={[
                    styles.typeFeedback,
                    {
                      color:
                        typeState === "correct"
                          ? TYPE_TONES.correct
                          : typeState === "wrong"
                            ? TYPE_TONES.wrong
                            : palette.muted,
                    },
                  ]}
                >
                  {typeState === "correct"
                    ? t("expressionLearning.practice.correct")
                    : typeState === "wrong"
                      ? t("expressionLearning.practice.tryAgain")
                      : ""}
                </Text>

                {!hintVisible && typeState !== "correct" ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("expressionLearning.practice.hint")}
                    onPress={revealHint}
                    style={[styles.hintButton, { borderColor: palette.border }]}
                  >
                    <Ionicons
                      name="bulb-outline"
                      size={17}
                      color={palette.primary}
                    />
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
                      backgroundColor: palette.primary,
                      opacity:
                        !typedAnswer.trim() || typeState === "correct"
                          ? 0.42
                          : 1,
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      typeState === "correct" ? "checkmark" : "arrow-forward"
                    }
                    size={20}
                    color="#FFFFFF"
                  />
                </Pressable>
              </View>

              {requiresAnswer && !ready ? (
                <Pressable onPress={skipTyping} style={styles.laterButton}>
                  <Text style={[styles.laterText, { color: palette.muted }]}>
                    {t("expressionLearning.practice.later")}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : referenceVisible ? (
            <>
              <SpokenText
                text={expression.korean}
                progress={speechProgress}
                playing={speechPlaying}
                baseColor={palette.ink}
                accentColor={palette.primary}
                style={[styles.korean, { color: palette.ink }]}
              />
              {expression.pronunciation.romanization ? (
                <Text style={[styles.romanization, { color: palette.muted }]}>
                  {expression.pronunciation.romanization}
                </Text>
              ) : null}
            </>
          ) : (
            <View style={styles.recallPromptWrap}>
              <View
                style={[
                  styles.recallIcon,
                  { backgroundColor: palette.primarySoft },
                ]}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={21}
                  color={palette.primary}
                />
              </View>
              <Text style={[styles.recallPrompt, { color: palette.ink }]}>
                {t("expressionLearning.practice.recallPrompt")}
              </Text>
            </View>
          )}

          <View style={styles.practiceActions}>
            {referenceVisible ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("expressionLearning.listen")}
                onPress={onSpeak}
                style={[
                  styles.speakerButton,
                  {
                    backgroundColor: speaking ? palette.primary : palette.bg,
                    borderColor: speaking ? palette.primary : palette.border,
                  },
                ]}
              >
                <Ionicons
                  name={speaking ? "volume-high" : "volume-medium-outline"}
                  size={23}
                  color={speaking ? "#FFFFFF" : palette.primary}
                />
              </Pressable>
            ) : null}
            <ExpressionPracticePanel
              key={item.key}
              item={item}
              typingActive={typingActive}
              ready={ready}
              onTypePress={openTyping}
              onOpenSpeaking={openSpeaking}
              onPracticeComplete={completePractice}
              onPracticeMiss={scheduleRetryOnce}
              onSpeechPassed={onSpeechPassed}
              onBusyChange={onPracticeBusyChange}
              onStopSpeech={onStopSpeech}
            />
          </View>
        </View>

        {!typingActive ? (
          <View
            style={[styles.meaningArea, { borderTopColor: palette.border }]}
          >
            <Text style={[styles.sectionLabel, { color: palette.muted }]}>
              {t("expressionLearning.meaning")}
            </Text>
            <Text style={[styles.meaning, { color: palette.ink }]}>
              {expression.meaning}
            </Text>
          </View>
        ) : null}

        {/* Keep this timing-based: never use spring or bounce for card resizing. */}
        {detailsVisible ? (
          <View style={styles.details}>
            <View style={styles.infoGrid}>
              <View
                style={[
                  styles.infoPanel,
                  {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View style={styles.infoTitleRow}>
                  <Ionicons
                    name="person-outline"
                    size={16}
                    color={palette.primary}
                  />
                  <Text style={[styles.infoLabel, { color: palette.primary }]}>
                    {t("expressionLearning.speaker")}
                  </Text>
                </View>
                <Text style={[styles.infoText, { color: palette.ink }]}>
                  {expression.speaker || t("expressionLearning.anySpeaker")}
                </Text>
              </View>

              <View
                style={[
                  styles.infoPanel,
                  {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View style={styles.infoTitleRow}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={palette.primary}
                  />
                  <Text style={[styles.infoLabel, { color: palette.primary }]}>
                    {t("expressionLearning.context")}
                  </Text>
                </View>
                <Text style={[styles.infoText, { color: palette.ink }]}>
                  {expression.context}
                </Text>
              </View>
            </View>

            {expression.usageNote ? (
              <View
                style={[
                  styles.notePanel,
                  {
                    backgroundColor: palette.primarySoft,
                    borderColor: palette.border,
                  },
                ]}
              >
                <Ionicons
                  name="sparkles-outline"
                  size={18}
                  color={palette.primary}
                />
                <View style={styles.noteCopy}>
                  <Text style={[styles.noteLabel, { color: palette.primary }]}>
                    {t("expressionLearning.usageNote")}
                  </Text>
                  <Text style={[styles.noteText, { color: palette.muted }]}>
                    {expression.usageNote}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: detailsVisible }}
          onPress={() => setDetailsVisible((visible) => !visible)}
          style={({ pressed }) => [
            styles.detailsButton,
            {
              borderTopColor: palette.border,
              opacity: pressed ? 0.65 : 1,
            },
          ]}
        >
          <Text style={[styles.detailsButtonText, { color: palette.muted }]}>
            {t(
              detailsVisible
                ? "expressionLearning.detailsClose"
                : "expressionLearning.detailsOpen",
            )}
          </Text>
          <Ionicons
            name={detailsVisible ? "chevron-up" : "chevron-down"}
            size={17}
            color={palette.primary}
          />
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18,
  },
  expressionCard: {
    minHeight: 420,
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
    paddingBottom: 8,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.045,
    shadowRadius: 20,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  speechChip: {
    minHeight: 29,
    borderRadius: 99,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  speechChipText: { fontSize: 10.5, lineHeight: 15, fontWeight: "800" },
  sentenceArea: {
    flex: 1,
    minHeight: 208,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 20,
  },
  recallPromptWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  recallIcon: {
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  recallPrompt: {
    maxWidth: 300,
    fontSize: 20,
    lineHeight: 29,
    fontWeight: "800",
    textAlign: "center",
  },
  korean: {
    width: "100%",
    fontSize: 29,
    lineHeight: 43,
    fontWeight: "800",
    letterSpacing: -0.7,
    textAlign: "center",
  },
  romanization: {
    marginTop: 7,
    fontSize: 12.5,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "center",
  },
  inlinePractice: { width: "100%", alignItems: "stretch" },
  typingMeaningLabel: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
  },
  typingMeaningText: {
    marginTop: 4,
    marginBottom: 13,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "600",
    textAlign: "center",
  },
  inlinePracticeHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 11,
  },
  inlinePracticeLabel: {
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  typingField: {
    minHeight: 72,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: "center",
  },
  fullInput: {
    minHeight: 48,
    paddingHorizontal: 2,
    paddingVertical: 6,
    fontSize: 21,
    lineHeight: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  clozeRow: {
    minHeight: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 6,
  },
  clozeToken: { fontSize: 18, lineHeight: 38, fontWeight: "700" },
  inlineInput: {
    height: 42,
    borderBottomWidth: 2.5,
    paddingHorizontal: 3,
    paddingVertical: 2,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  hintAnswer: {
    marginTop: 9,
    minHeight: 40,
    borderRadius: 14,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  hintAnswerText: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: "700" },
  typeFeedbackRow: {
    minHeight: 44,
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  typeFeedback: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "800",
  },
  hintButton: {
    width: 44,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkButton: {
    width: 48,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  laterButton: {
    minHeight: 36,
    alignSelf: "center",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  laterText: { fontSize: 11.5, fontWeight: "700" },
  practiceActions: {
    minHeight: 46,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  speakerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  meaningArea: {
    borderTopWidth: 1,
    paddingTop: 15,
    alignItems: "center",
    gap: 7,
  },
  sectionLabel: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  meaning: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "600",
    textAlign: "center",
  },
  details: { paddingTop: 4 },
  infoGrid: { marginTop: 17, flexDirection: "row", gap: 9 },
  infoPanel: {
    flex: 1,
    minWidth: 0,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
  },
  infoTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoLabel: { fontSize: 10.5, lineHeight: 15, fontWeight: "800" },
  infoText: {
    marginTop: 6,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "600",
  },
  notePanel: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
  },
  noteCopy: { flex: 1 },
  noteLabel: { fontSize: 10.5, lineHeight: 15, fontWeight: "800" },
  noteText: { marginTop: 4, fontSize: 12, lineHeight: 18, fontWeight: "600" },
  detailsButton: {
    minHeight: 47,
    marginTop: 13,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  detailsButtonText: { fontSize: 11.5, lineHeight: 17, fontWeight: "700" },
});
