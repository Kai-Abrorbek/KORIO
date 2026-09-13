import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { expressionPackThemeByCode } from "@/constants/expression-packs";
import { useSpeakingPalette } from "@/features/speaking/palette";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import * as Haptics from "@/utils/haptics";
import ExpressionLearningPage from "../components/ExpressionLearningPage";
import { useExpressionLearning } from "../hooks/useExpressionLearning";

const SWIPE_THRESHOLD = 78;
const SWIPE_VELOCITY = 680;

function ExpressionRecallOfferModal({
  visible,
  expressionCount,
  busy,
  saveFailed,
  theme,
  accent,
  accentDark,
  background,
  onClose,
  onStart,
  onSkip,
}: {
  visible: boolean;
  expressionCount: number;
  busy: boolean;
  saveFailed: boolean;
  theme: ReturnType<typeof useTheme>;
  accent: string;
  accentDark: string;
  background: string;
  onClose: () => void;
  onStart: () => void;
  onSkip: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.recallOfferRoot}>
        <Pressable
          disabled={busy}
          style={styles.recallOfferBackdrop}
          onPress={onClose}
        />
        <View
          style={[
            styles.recallOfferCard,
            {
              backgroundColor: theme.surface,
              borderColor: `${accent}36`,
              shadowColor: theme.text,
            },
          ]}
        >
          <View
            style={[styles.recallOfferIcon, { backgroundColor: background }]}
          >
            <Ionicons name="chatbubbles-outline" size={29} color={accentDark} />
          </View>
          <Text style={[styles.recallOfferEyebrow, { color: accentDark }]}>
            {t("expressionLearning.practiceOfferEyebrow")}
          </Text>
          <Text style={[styles.recallOfferTitle, { color: theme.text }]}>
            {t("expressionLearning.practiceOfferTitle")}
          </Text>
          <Text
            style={[
              styles.recallOfferDescription,
              { color: theme.textSecondary },
            ]}
          >
            {t("expressionLearning.practiceOfferDescription", {
              count: expressionCount,
            })}
          </Text>

          {saveFailed ? (
            <Text style={styles.recallOfferError}>
              {t("expressionLearning.saveFailed")}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={onStart}
            style={({ pressed }) => [
              styles.recallOfferStartButton,
              {
                backgroundColor: accent,
                opacity: busy ? 0.6 : pressed ? 0.88 : 1,
              },
            ]}
          >
            {busy ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="school-outline" size={20} color="#FFFFFF" />
                <Text style={styles.recallOfferStartText}>
                  {t("expressionLearning.practiceOfferStart")}
                </Text>
              </>
            )}
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={onSkip}
            style={({ pressed }) => [
              styles.recallOfferSkipButton,
              { opacity: busy ? 0.45 : pressed ? 0.7 : 1 },
            ]}
          >
            <Text
              style={[
                styles.recallOfferSkipText,
                { color: theme.textSecondary },
              ]}
            >
              {t("expressionLearning.practiceOfferLater")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function ExpressionLearningScreen() {
  const { node = "" } = useLocalSearchParams<{ node?: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const practicePalette = useSpeakingPalette();
  const {
    speak,
    speakAuto,
    prewarm,
    stop,
    isSpeaking,
    isSpeechPlaying,
    speechProgress,
  } = useSpeech();
  const {
    session,
    queue,
    current,
    index,
    loading,
    loadFailed,
    saving,
    saveFailed,
    completed,
    readyForRecall,
    progress,
    advance,
    retreat,
    beginRecall,
    skipRecall,
    scheduleRetry,
    reload,
  } = useExpressionLearning(node);
  const [practiceReady, setPracticeReady] = useState(true);
  const [practiceBusy, setPracticeBusy] = useState(false);
  const [recallOfferVisible, setRecallOfferVisible] = useState(false);
  const [recallOfferBusy, setRecallOfferBusy] = useState(false);
  const recallOfferShownRef = useRef(false);
  const translateX = useSharedValue(0);
  const gestureLocked = useSharedValue(0);
  const packTheme = expressionPackThemeByCode(session?.topic.code);
  const autoSpeechText =
    current && current.stage !== "recall"
      ? current.expression.pronunciation.ttsText || current.expression.korean
      : "";

  useEffect(() => {
    recallOfferShownRef.current = false;
    setRecallOfferVisible(false);
    setRecallOfferBusy(false);
  }, [node]);

  useEffect(() => {
    setPracticeReady(current?.kind === "exposure");
    setPracticeBusy(false);
  }, [current?.key, current?.kind]);

  useEffect(() => {
    if (!autoSpeechText) return;
    speakAuto(autoSpeechText, "ko-KR");
    return stop;
  }, [autoSpeechText, current?.key, speakAuto, stop]);

  useEffect(() => {
    const upcoming = queue
      .slice(index + 1, index + 4)
      .filter((item) => item.stage !== "recall")
      .map(
        (item) =>
          item.expression.pronunciation.ttsText || item.expression.korean,
      )
      .filter(Boolean);
    if (upcoming.length > 0) prewarm(upcoming, "ko-KR");
  }, [index, prewarm, queue]);

  const settleCard = useCallback(
    (direction: -1 | 1, moved: boolean) => {
      if (!moved) {
        translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
        gestureLocked.value = 0;
        return;
      }

      translateX.value = direction > 0 ? 44 : -44;
      translateX.value = withSpring(0, {
        damping: 19,
        stiffness: 210,
        mass: 0.75,
      });
      gestureLocked.value = 0;
      void Haptics.selectionAsync();
    },
    [gestureLocked, translateX],
  );

  const openRecallOffer = useCallback(() => {
    recallOfferShownRef.current = true;
    stop();
    setRecallOfferVisible(true);
  }, [stop]);

  useEffect(() => {
    if (
      !readyForRecall ||
      saving ||
      practiceBusy ||
      recallOfferShownRef.current
    ) {
      return;
    }

    const timeout = setTimeout(() => {
      openRecallOffer();
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 550);

    return () => clearTimeout(timeout);
  }, [openRecallOffer, practiceBusy, readyForRecall, saving]);

  const startRecallPractice = useCallback(async () => {
    if (recallOfferBusy) return;
    setRecallOfferBusy(true);
    const started = await beginRecall();
    if (started) setRecallOfferVisible(false);
    setRecallOfferBusy(false);
  }, [beginRecall, recallOfferBusy]);

  const finishWithoutRecall = useCallback(async () => {
    if (recallOfferBusy) return;
    setRecallOfferBusy(true);
    const skipped = await skipRecall();
    if (skipped) setRecallOfferVisible(false);
    setRecallOfferBusy(false);
  }, [recallOfferBusy, skipRecall]);

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      stop();
      if (direction > 0 && readyForRecall) {
        openRecallOffer();
        settleCard(direction, true);
        return;
      }
      const navigation = direction > 0 ? advance() : Promise.resolve(retreat());
      void navigation.then((moved) => settleCard(direction, moved));
    },
    [advance, openRecallOffer, readyForRecall, retreat, settleCard, stop],
  );

  const canGoPrevious = index > 0 && !saving && !practiceBusy;
  const canGoNext =
    Boolean(current) && !saving && !practiceBusy && practiceReady;
  const nextActionLabel = readyForRecall
    ? t("expressionLearning.practiceOfferStart")
    : index >= queue.length - 1
      ? t("expressionLearning.finish")
      : t("expressionLearning.next");

  const animateCardOut = useCallback(
    (direction: -1 | 1, forceForward = false) => {
      if (gestureLocked.value) return;
      const canMove =
        direction > 0
          ? forceForward
            ? Boolean(current) && !saving
            : canGoNext
          : canGoPrevious;
      if (!canMove) {
        translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
        return;
      }

      gestureLocked.value = 1;
      translateX.value = withTiming(
        direction > 0 ? -width * 1.12 : width * 1.12,
        { duration: 230 },
        (finished) => {
          if (finished) {
            runOnJS(commitSwipe)(direction);
          } else {
            gestureLocked.value = 0;
          }
        },
      );
    },
    [
      canGoNext,
      canGoPrevious,
      commitSwipe,
      current,
      gestureLocked,
      saving,
      translateX,
      width,
    ],
  );

  const panGesture = Gesture.Pan()
    .enabled(!saving && !practiceBusy)
    .activeOffsetX([-13, 13])
    .failOffsetY([-22, 22])
    .onUpdate((event) => {
      if (gestureLocked.value) return;
      const movingToNext = event.translationX < 0;
      const canMove = movingToNext ? canGoNext : canGoPrevious;
      translateX.value = canMove
        ? event.translationX
        : event.translationX * 0.16;
    })
    .onEnd((event) => {
      const direction: -1 | 1 = event.translationX < 0 ? 1 : -1;
      const canMove = direction > 0 ? canGoNext : canGoPrevious;
      const shouldMove =
        canMove &&
        (Math.abs(event.translationX) >= SWIPE_THRESHOLD ||
          Math.abs(event.velocityX) >= SWIPE_VELOCITY);

      if (shouldMove) {
        gestureLocked.value = 1;
        translateX.value = withTiming(
          direction > 0 ? -width * 1.12 : width * 1.12,
          { duration: 230 },
          (finished) => {
            if (finished) {
              runOnJS(commitSwipe)(direction);
            } else {
              gestureLocked.value = 0;
            }
          },
        );
        return;
      }

      translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
    });

  const cardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, width * 0.85],
      [1, 0.7],
      Extrapolation.CLAMP,
    ),
    transform: [
      { translateX: translateX.value },
      {
        rotate: `${interpolate(
          translateX.value,
          [-width, 0, width],
          [-7, 0, 7],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/expressions");

  if (loading || loadFailed || !session || !current) {
    return (
      <View
        style={[
          styles.screen,
          { backgroundColor: theme.bg, paddingTop: insets.top },
        ]}
      >
        <View style={styles.simpleHeader}>
          <TouchableOpacity
            onPress={goBack}
            style={[
              styles.headerButton,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Ionicons name="chevron-back" size={25} color={theme.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.state}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.primary} />
          ) : (
            <>
              <Ionicons
                name="alert-circle-outline"
                size={42}
                color={theme.primary}
              />
              <Text style={[styles.stateTitle, { color: theme.text }]}>
                {t("expressionLearning.loadFailed")}
              </Text>
              <Pressable
                onPress={() => void reload()}
                style={[styles.retryButton, { backgroundColor: theme.primary }]}
              >
                <Text style={styles.retryText}>
                  {t("expressionLearning.retry")}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    );
  }

  if (completed) {
    return (
      <Animated.View
        entering={FadeIn.duration(260)}
        style={[
          styles.screen,
          styles.completedScreen,
          {
            backgroundColor: theme.bg,
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 18,
          },
        ]}
      >
        <LinearGradient
          colors={[packTheme.background, theme.bg, theme.bg]}
          locations={[0, 0.46, 1]}
          style={styles.completeBackground}
        />
        <View
          pointerEvents="none"
          style={[
            styles.completeOrb,
            styles.completeOrbTop,
            { backgroundColor: `${packTheme.accent}18` },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.completeOrb,
            styles.completeOrbBottom,
            { backgroundColor: `${packTheme.accent}10` },
          ]}
        />

        <ScrollView
          style={styles.completeScroll}
          contentContainerStyle={styles.completeBody}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInDown.delay(80).duration(420)}
            style={[
              styles.completeTopicChip,
              {
                backgroundColor: `${packTheme.accent}14`,
                borderColor: `${packTheme.accent}2E`,
              },
            ]}
          >
            <Ionicons
              name={packTheme.icon}
              size={16}
              color={packTheme.accentDark}
            />
            <Text
              style={[
                styles.completeTopicChipText,
                { color: packTheme.accentDark },
              ]}
              numberOfLines={1}
            >
              {session.topic.title}
            </Text>
          </Animated.View>

          <Animated.View
            entering={ZoomIn.delay(150).springify().damping(14)}
            style={styles.completeMedalStage}
          >
            <View
              style={[
                styles.completeMedalBack,
                { backgroundColor: `${packTheme.accent}18` },
              ]}
            />
            <View
              style={[
                styles.completeMedalBack,
                styles.completeMedalBackSmall,
                { backgroundColor: `${packTheme.accent}24` },
              ]}
            />
            <LinearGradient
              colors={[packTheme.accent, packTheme.accentDark]}
              start={{ x: 0.15, y: 0 }}
              end={{ x: 0.85, y: 1 }}
              style={styles.completeIcon}
            >
              <Ionicons name="checkmark" size={51} color="#FFFFFF" />
            </LinearGradient>
            <Ionicons
              name="sparkles"
              size={22}
              color={packTheme.accent}
              style={styles.completeSparkTop}
            />
            <Ionicons
              name="star"
              size={16}
              color={packTheme.accentDark}
              style={styles.completeSparkBottom}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(220).duration(430)}>
            <Text style={[styles.completeTitle, { color: theme.text }]}>
              {t("expressionLearning.doneTitle")}
            </Text>
            <Text
              style={[
                styles.completeDescription,
                { color: theme.textSecondary },
              ]}
            >
              {t("expressionLearning.doneDescription", {
                node: session.node.title,
                count: session.items.length,
              })}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300).duration(430)}
            style={[
              styles.completeSummaryCard,
              {
                backgroundColor: theme.surface,
                borderColor: `${packTheme.accent}26`,
                shadowColor: theme.text,
              },
            ]}
          >
            <View
              style={[
                styles.completeSummaryIcon,
                { backgroundColor: packTheme.background },
              ]}
            >
              <Ionicons
                name="chatbubble-ellipses"
                size={25}
                color={packTheme.accentDark}
              />
            </View>
            <View style={styles.completeSummaryCopy}>
              <Text
                style={[
                  styles.completeSummaryEyebrow,
                  { color: packTheme.accentDark },
                ]}
                numberOfLines={1}
              >
                {session.topic.title}
              </Text>
              <Text
                style={[styles.completeSummaryTitle, { color: theme.text }]}
                numberOfLines={2}
              >
                {session.node.title}
              </Text>
            </View>
            <View
              style={[
                styles.completeCountChip,
                { backgroundColor: `${packTheme.accent}12` },
              ]}
            >
              <Text
                style={[
                  styles.completeCountText,
                  { color: packTheme.accentDark },
                ]}
              >
                {t("expressionRoadmap.nodeExpressions", {
                  count: session.items.length,
                })}
              </Text>
            </View>
          </Animated.View>
        </ScrollView>

        <Animated.View
          entering={FadeInDown.delay(360).duration(430)}
          style={styles.completeFooter}
        >
          <Pressable
            onPress={() => {
              void Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
              goBack();
            }}
            style={({ pressed }) => [
              styles.completeButton,
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <LinearGradient
              colors={[packTheme.accent, packTheme.accentDark]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.completeButtonGradient}
            >
              <Text style={styles.completeButtonText}>
                {t("expressionLearning.backToRoadmap")}
              </Text>
              <View style={styles.completeButtonIcon}>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: practicePalette.bg, paddingTop: insets.top },
      ]}
    >
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("common.back")}
            onPress={goBack}
            style={[
              styles.headerButton,
              {
                backgroundColor: practicePalette.surface,
                borderColor: practicePalette.border,
              },
            ]}
          >
            <Ionicons name="close" size={24} color={practicePalette.ink} />
          </TouchableOpacity>
          <View style={styles.headerCopy}>
            <Text
              style={[styles.topicLabel, { color: practicePalette.muted }]}
              numberOfLines={1}
            >
              {session.topic.title}
            </Text>
            <Text
              style={[styles.nodeTitle, { color: practicePalette.ink }]}
              numberOfLines={1}
            >
              {session.node.title}
            </Text>
          </View>
          <View
            style={[
              styles.counter,
              { backgroundColor: practicePalette.primarySoft },
            ]}
          >
            <Text
              style={[styles.counterText, { color: practicePalette.primary }]}
            >
              {index + 1}/{queue.length}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.progressTrack,
            { backgroundColor: practicePalette.border },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: practicePalette.primary,
              },
            ]}
          />
        </View>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.content, cardStyle]}>
          <ExpressionLearningPage
            key={current.key}
            item={current}
            speaking={isSpeaking}
            speechPlaying={isSpeechPlaying}
            speechProgress={speechProgress}
            onSpeak={() =>
              speak(
                current.expression.pronunciation.ttsText ||
                  current.expression.korean,
                "ko-KR",
              )
            }
            onStopSpeech={stop}
            onPracticeReadyChange={setPracticeReady}
            onPracticeBusyChange={setPracticeBusy}
            onScheduleRetry={scheduleRetry}
            onSpeechPassed={() => animateCardOut(1, true)}
          />
        </Animated.View>
      </GestureDetector>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom, 10) + 10,
            backgroundColor: practicePalette.bg,
            borderTopColor: practicePalette.border,
          },
        ]}
      >
        {saveFailed ? (
          <Text style={styles.saveError}>
            {t("expressionLearning.saveFailed")}
          </Text>
        ) : null}
        <View style={styles.navigationRow}>
          <View style={styles.navigationControl}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("common.back")}
              disabled={!canGoPrevious}
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                animateCardOut(-1);
              }}
              style={({ pressed }) => [
                styles.previousButton,
                {
                  backgroundColor: practicePalette.surface,
                  borderColor: practicePalette.border,
                  opacity: !canGoPrevious ? 0.35 : pressed ? 0.68 : 1,
                },
              ]}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={practicePalette.muted}
              />
            </Pressable>
            <Text
              style={[styles.navigationLabel, { color: practicePalette.muted }]}
              numberOfLines={1}
            >
              {t("common.back")}
            </Text>
          </View>

          <View style={styles.swipeHint}>
            <Ionicons
              name="swap-horizontal"
              size={17}
              color={practicePalette.muted}
            />
            <Text
              style={[styles.swipeHintText, { color: practicePalette.muted }]}
              numberOfLines={2}
            >
              {practiceReady
                ? t("expressionPack.swipeHint")
                : t("expressionLearning.practice.completeToContinue")}
            </Text>
          </View>

          <View style={styles.navigationControl}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={nextActionLabel}
              disabled={!canGoNext}
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                animateCardOut(1);
              }}
              style={({ pressed }) => [
                styles.nextButton,
                {
                  backgroundColor: practicePalette.primary,
                  opacity: !canGoNext ? 0.45 : pressed ? 0.84 : 1,
                },
              ]}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Ionicons
                  name={
                    readyForRecall
                      ? "school-outline"
                      : index >= queue.length - 1
                        ? "checkmark"
                        : "arrow-forward"
                  }
                  size={21}
                  color="#FFFFFF"
                />
              )}
            </Pressable>
            <Text
              style={[
                styles.navigationLabel,
                { color: practicePalette.primary },
              ]}
              numberOfLines={1}
            >
              {nextActionLabel}
            </Text>
          </View>
        </View>
      </View>

      <ExpressionRecallOfferModal
        visible={recallOfferVisible}
        expressionCount={session.items.length}
        busy={recallOfferBusy || saving}
        saveFailed={saveFailed}
        theme={theme}
        accent={packTheme.accent}
        accentDark={packTheme.accentDark}
        background={packTheme.background}
        onClose={() => {
          if (!recallOfferBusy && !saving) setRecallOfferVisible(false);
        }}
        onStart={() => void startRecallPractice()}
        onSkip={() => void finishWithoutRecall()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  recallOfferRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  recallOfferBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#11121A99",
  },
  recallOfferCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 28,
    borderWidth: 1.5,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 16,
    alignItems: "center",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 12,
  },
  recallOfferIcon: {
    width: 62,
    height: 62,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  recallOfferEyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  recallOfferTitle: {
    marginTop: 5,
    fontSize: 25,
    lineHeight: 33,
    fontWeight: "900",
    textAlign: "center",
  },
  recallOfferDescription: {
    marginTop: 9,
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    textAlign: "center",
  },
  recallOfferError: {
    marginTop: -10,
    marginBottom: 12,
    color: "#E84B4B",
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  recallOfferStartButton: {
    width: "100%",
    minHeight: 54,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  recallOfferStartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  recallOfferSkipButton: {
    minHeight: 46,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  recallOfferSkipText: { fontSize: 13, fontWeight: "800" },
  headerWrap: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingBottom: 18,
  },
  simpleHeader: { height: 70, paddingHorizontal: 16, justifyContent: "center" },
  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCopy: { flex: 1 },
  topicLabel: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    letterSpacing: 1.25,
  },
  nodeTitle: { marginTop: 3, fontSize: 16, lineHeight: 21, fontWeight: "700" },
  counter: {
    minWidth: 58,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  counterText: {
    fontSize: 12,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  progressTrack: { height: 4, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99 },
  content: { flex: 1 },
  footer: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 13,
    borderTopWidth: 1,
  },
  navigationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },
  navigationControl: {
    width: 74,
    alignItems: "center",
    gap: 6,
  },
  navigationLabel: {
    width: 82,
    fontSize: 9.5,
    lineHeight: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  previousButton: {
    width: 54,
    height: 54,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeHint: {
    flex: 1,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 5,
  },
  swipeHintText: {
    flexShrink: 1,
    fontSize: 10.5,
    lineHeight: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  nextButton: {
    width: 58,
    height: 58,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 9,
    elevation: 4,
  },
  saveError: {
    color: "#E84B4B",
    textAlign: "center",
    marginBottom: 7,
    fontSize: 11.5,
    fontWeight: "700",
  },
  state: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    gap: 14,
  },
  stateTitle: { fontSize: 18, fontWeight: "900", textAlign: "center" },
  retryButton: {
    minHeight: 46,
    borderRadius: 15,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  retryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  completedScreen: { overflow: "hidden" },
  completeBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  completeOrb: { position: "absolute", borderRadius: 999 },
  completeOrbTop: { width: 290, height: 290, top: -130, right: -98 },
  completeOrbBottom: { width: 230, height: 230, bottom: 34, left: -145 },
  completeScroll: { flex: 1, width: "100%" },
  completeBody: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingTop: 18,
  },
  completeTopicChip: {
    maxWidth: "88%",
    minHeight: 34,
    borderRadius: 99,
    borderWidth: 1,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  completeTopicChipText: {
    flexShrink: 1,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: "900",
  },
  completeMedalStage: {
    width: 152,
    height: 152,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  completeMedalBack: {
    position: "absolute",
    width: 138,
    height: 138,
    borderRadius: 45,
    transform: [{ rotate: "11deg" }],
  },
  completeMedalBackSmall: {
    width: 118,
    height: 118,
    borderRadius: 39,
    transform: [{ rotate: "-8deg" }],
  },
  completeIcon: {
    width: 92,
    height: 92,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.17,
    shadowRadius: 17,
    elevation: 8,
  },
  completeSparkTop: { position: "absolute", top: 4, right: 4 },
  completeSparkBottom: { position: "absolute", bottom: 12, left: 3 },
  completeTitle: {
    marginTop: 11,
    paddingHorizontal: 8,
    fontSize: 29,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -0.55,
    textAlign: "center",
  },
  completeDescription: {
    alignSelf: "center",
    marginTop: 8,
    maxWidth: 330,
    paddingHorizontal: 8,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    textAlign: "center",
  },
  completeSummaryCard: {
    width: "100%",
    maxWidth: 410,
    minHeight: 88,
    marginTop: 23,
    borderRadius: 23,
    borderWidth: 1,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
  },
  completeSummaryIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  completeSummaryCopy: { flex: 1, minWidth: 0 },
  completeSummaryEyebrow: {
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: "900",
  },
  completeSummaryTitle: {
    marginTop: 3,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  completeCountChip: {
    minHeight: 31,
    borderRadius: 99,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  completeCountText: { fontSize: 10.5, fontWeight: "900" },
  completeFooter: { width: "100%", paddingHorizontal: 22, paddingTop: 12 },
  completeButton: {
    width: "100%",
    maxWidth: 410,
    height: 60,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 11,
    elevation: 5,
  },
  completeButtonGradient: {
    flex: 1,
    paddingLeft: 21,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: { color: "#FFFFFF", fontSize: 15.5, fontWeight: "900" },
  completeButtonIcon: {
    position: "absolute",
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.17)",
  },
});
