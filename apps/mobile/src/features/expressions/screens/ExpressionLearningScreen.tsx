import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
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
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import * as Haptics from "@/utils/haptics";
import ExpressionLearningPage from "../components/ExpressionLearningPage";
import { useExpressionLearning } from "../hooks/useExpressionLearning";

const SWIPE_THRESHOLD = 78;
const SWIPE_VELOCITY = 680;

export default function ExpressionLearningScreen() {
  const { node = "" } = useLocalSearchParams<{ node?: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();
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
    progress,
    advance,
    retreat,
    scheduleRetry,
    reload,
  } = useExpressionLearning(node);
  const [practiceReady, setPracticeReady] = useState(true);
  const [practiceBusy, setPracticeBusy] = useState(false);
  const translateX = useSharedValue(0);
  const gestureLocked = useSharedValue(0);
  const packTheme = expressionPackThemeByCode(session?.topic.code);
  const autoSpeechText =
    current && current.stage !== "recall"
      ? current.expression.pronunciation.ttsText || current.expression.korean
      : "";

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

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      stop();
      const navigation =
        direction > 0 ? advance() : Promise.resolve(retreat());
      void navigation.then((moved) => settleCard(direction, moved));
    },
    [advance, retreat, settleCard, stop],
  );

  const canGoPrevious = index > 0 && !saving && !practiceBusy;
  const canGoNext =
    Boolean(current) && !saving && !practiceBusy && practiceReady;

  const animateCardOut = useCallback(
    (direction: -1 | 1) => {
      if (gestureLocked.value) return;
      const canMove = direction > 0 ? canGoNext : canGoPrevious;
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
      gestureLocked,
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
              <Ionicons name="alert-circle-outline" size={42} color={theme.primary} />
              <Text style={[styles.stateTitle, { color: theme.text }]}>{t("expressionLearning.loadFailed")}</Text>
              <Pressable
                onPress={() => void reload()}
                style={[styles.retryButton, { backgroundColor: theme.primary }]}
              >
                <Text style={styles.retryText}>{t("expressionLearning.retry")}</Text>
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
        { backgroundColor: theme.bg, paddingTop: insets.top },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
          onPress={goBack}
          style={[styles.headerButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={[styles.topicLabel, { color: packTheme.accentDark }]} numberOfLines={1}>{session.topic.title}</Text>
          <Text style={[styles.nodeTitle, { color: theme.text }]} numberOfLines={1}>{session.node.title}</Text>
        </View>
        <View
          style={[styles.counter, { backgroundColor: packTheme.background }]}
        >
          <Text style={[styles.counterText, { color: packTheme.accentDark }]}>{index + 1}/{queue.length}</Text>
        </View>
      </View>

      <View style={styles.progressWrap}>
        <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: packTheme.accent }]} />
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
          />
        </Animated.View>
      </GestureDetector>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + 10, backgroundColor: theme.bg },
        ]}
      >
        {saveFailed ? (
          <Text style={styles.saveError}>{t("expressionLearning.saveFailed")}</Text>
        ) : null}
        <View style={styles.swipeHint}>
          <Ionicons
            name="swap-horizontal"
            size={17}
            color={theme.textSecondary}
          />
          <Text style={[styles.swipeHintText, { color: theme.textSecondary }]}>
            {practiceReady
              ? t("expressionPack.swipeHint")
              : t("expressionLearning.practice.completeToContinue")}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={!canGoNext}
          onPress={() => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            animateCardOut(1);
          }}
          style={({ pressed }) => [
            styles.nextButton,
            { backgroundColor: packTheme.accent, opacity: !canGoNext ? 0.45 : pressed ? 0.88 : 1 },
          ]}
        >
          {saving ? <ActivityIndicator color="#FFFFFF" /> : (
            <>
              <Text style={styles.nextButtonText}>
                {index >= queue.length - 1 ? t("expressionLearning.finish") : t("expressionLearning.next")}
              </Text>
              <Ionicons name={index >= queue.length - 1 ? "checkmark" : "arrow-forward"} size={21} color="#FFFFFF" />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { height: 70, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 11 },
  simpleHeader: { height: 70, paddingHorizontal: 16, justifyContent: "center" },
  headerButton: { width: 44, height: 44, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1 },
  topicLabel: { fontSize: 10.5, lineHeight: 14, fontWeight: "900", letterSpacing: 0.5 },
  nodeTitle: { marginTop: 2, fontSize: 17, lineHeight: 22, fontWeight: "900" },
  counter: { minWidth: 52, height: 34, borderRadius: 13, alignItems: "center", justifyContent: "center", paddingHorizontal: 8 },
  counterText: { fontSize: 12, fontWeight: "900" },
  progressWrap: { paddingHorizontal: 18, paddingBottom: 12 },
  progressTrack: { height: 9, borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99 },
  content: { flex: 1 },
  footer: { paddingHorizontal: 18, paddingTop: 9 },
  swipeHint: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 },
  swipeHintText: { fontSize: 11.5, fontWeight: "800" },
  nextButton: { height: 58, borderRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 9, elevation: 4 },
  nextButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  saveError: { color: "#E84B4B", textAlign: "center", marginBottom: 7, fontSize: 11.5, fontWeight: "700" },
  state: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28, gap: 14 },
  stateTitle: { fontSize: 18, fontWeight: "900", textAlign: "center" },
  retryButton: { minHeight: 46, borderRadius: 15, paddingHorizontal: 24, alignItems: "center", justifyContent: "center" },
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
