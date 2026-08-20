import { useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
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
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
    reload,
  } = useExpressionLearning(node);
  const translateX = useSharedValue(0);
  const gestureLocked = useSharedValue(0);
  const packTheme = expressionPackThemeByCode(session?.topic.code);
  const autoSpeechText = current
    ? current.expression.pronunciation.ttsText || current.expression.korean
    : "";

  useEffect(() => {
    if (!autoSpeechText) return;
    speakAuto(autoSpeechText, "ko-KR");
    return stop;
  }, [autoSpeechText, current?.key, speakAuto, stop]);

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

  const canGoPrevious = index > 0 && !saving;
  const canGoNext = Boolean(current) && !saving;

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
    .enabled(!saving)
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
        <View
          style={[
            styles.completeGlow,
            { backgroundColor: packTheme.background },
          ]}
        />
        <View
          style={[
            styles.completeIcon,
            { backgroundColor: packTheme.accent },
          ]}
        >
          <Ionicons name="checkmark" size={48} color="#FFFFFF" />
        </View>
        <Text style={[styles.completeTitle, { color: theme.text }]}>{t("expressionLearning.doneTitle")}</Text>
        <Text
          style={[styles.completeDescription, { color: theme.textSecondary }]}
        >
          {t("expressionLearning.doneDescription", {
            node: session.node.title,
            count: session.items.length,
          })}
        </Text>
        <Pressable
          onPress={() => {
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            goBack();
          }}
          style={[styles.completeButton, { backgroundColor: packTheme.accent }]}
        >
          <Text style={styles.completeButtonText}>{t("expressionLearning.backToRoadmap")}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
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
            {t("expressionPack.swipeHint")}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={saving}
          onPress={() => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            animateCardOut(1);
          }}
          style={({ pressed }) => [
            styles.nextButton,
            { backgroundColor: packTheme.accent, opacity: saving ? 0.6 : pressed ? 0.88 : 1 },
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
  completedScreen: { alignItems: "center", justifyContent: "center", paddingHorizontal: 28, overflow: "hidden" },
  completeGlow: { position: "absolute", width: 330, height: 330, borderRadius: 165, opacity: 0.68 },
  completeIcon: { width: 92, height: 92, borderRadius: 31, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 16, elevation: 7 },
  completeTitle: { marginTop: 24, fontSize: 28, lineHeight: 35, fontWeight: "900", textAlign: "center" },
  completeDescription: { marginTop: 9, maxWidth: 310, fontSize: 14, lineHeight: 21, fontWeight: "600", textAlign: "center" },
  completeButton: { marginTop: 28, width: "100%", height: 58, borderRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  completeButtonText: { color: "#FFFFFF", fontSize: 15.5, fontWeight: "900" },
});
