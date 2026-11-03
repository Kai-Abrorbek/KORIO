import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef } from "react";
import { AppState, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Pressable } from "@/components/ui/Pressables";
import type { StudyWord } from "@/types/word-study";
import { useSound } from "@/hooks/useSound";
import * as Haptics from "@/utils/haptics";
import { getWordLibraryPalette } from "../../../../../shared/word-library-theme";

type Palette = ReturnType<typeof getWordLibraryPalette>;
type ResultWord = Pick<StudyWord, "id" | "headword" | "meaning">;

function CompletionCard({
  index,
  count,
  word,
  progress,
  colors,
}: {
  index: number;
  count: number;
  word: ResultWord;
  progress: ReturnType<typeof useSharedValue<number>>;
  colors: Palette;
}) {
  const style = useAnimatedStyle(() => {
    const entrance = interpolate(progress.value, [0, 0.52], [0, 1], "clamp");
    const settle = interpolate(progress.value, [0.52, 0.76], [0, 1], "clamp");
    const side = index - (count - 1) / 2;
    return {
      opacity: interpolate(progress.value, [0, 0.12], [0, 1], "clamp"),
      transform: [
        { translateX: side * (100 * (1 - entrance) + 31) },
        { translateY: (1 - entrance) * 52 + Math.abs(side) * 8 - settle * 7 },
        { rotate: `${side * (26 - 12 * entrance)}deg` },
        { scale: 0.82 + entrance * 0.18 },
      ],
    };
  });
  const isFront = index === Math.floor((count - 1) / 2);
  const background = isFront
    ? colors.surface
    : index === 0
      ? colors.yellowWash
      : colors.pinkWash;
  const ink = isFront
    ? colors.text
    : index === 0
      ? colors.onYellow
      : colors.onPink;
  return (
    <Animated.View
      style={[
        styles.wordCard,
        { backgroundColor: background, zIndex: isFront ? 3 : 1 },
        style,
      ]}
    >
      <View style={[styles.cardTab, { backgroundColor: colors.action }]} />
      <Text numberOfLines={2} style={[styles.cardWord, { color: ink }]}>
        {word.headword}
      </Text>
      <Text numberOfLines={2} style={[styles.cardMeaning, { color: ink }]}>
        {word.meaning}
      </Text>
    </Animated.View>
  );
}

function Particle({
  index,
  progress,
  color,
}: {
  index: number;
  progress: ReturnType<typeof useSharedValue<number>>;
  color: string;
}) {
  const style = useAnimatedStyle(() => {
    const burst = interpolate(progress.value, [0.55, 1], [0, 1], "clamp");
    const angle = ((index * 360) / 12) * (Math.PI / 180);
    return {
      opacity: interpolate(burst, [0, 0.1, 0.72, 1], [0, 1, 0.8, 0]),
      transform: [
        { translateX: Math.cos(angle) * (38 + burst * 115) },
        {
          translateY: Math.sin(angle) * (38 + burst * 95) + burst * burst * 40,
        },
        { rotate: `${index * 32 + burst * 100}deg` },
        { scale: 1 - burst * 0.35 },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles.particle,
        { backgroundColor: color, borderRadius: index % 3 ? 2 : 5 },
        style,
      ]}
    />
  );
}

export default function WordStudyCompletion({
  isDark,
  completedRecall,
  viewedCount,
  practicedCount,
  words,
  rangeLabel,
  onContinue,
  onReviewAgain,
}: {
  isDark: boolean;
  completedRecall: boolean;
  viewedCount: number;
  practicedCount: number;
  words: ResultWord[];
  rangeLabel: string;
  onContinue: () => void;
  onReviewAgain: () => void;
}) {
  const { t } = useTranslation();
  const colors = getWordLibraryPalette(isDark);
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const { play } = useSound();
  const cueStartedRef = useRef(false);
  const progress = useSharedValue(reducedMotion ? 1 : 0);
  useEffect(() => {
    progress.value = reducedMotion
      ? 1
      : withTiming(1, { duration: 1650, easing: Easing.out(Easing.cubic) });
  }, [progress, reducedMotion]);
  useFocusEffect(
    useCallback(() => {
      if (cueStartedRef.current) return;
      cueStartedRef.current = true;
      const cue = setTimeout(
        () => {
          if (AppState.currentState !== "active") return;
          play("lessonComplete");
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          );
        },
        reducedMotion ? 0 : 480,
      );
      const subscription = AppState.addEventListener("change", (state) => {
        if (state !== "active") clearTimeout(cue);
      });
      return () => {
        clearTimeout(cue);
        subscription.remove();
      };
    }, [play, reducedMotion]),
  );
  const sealStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.45, 0.6], [0, 1], "clamp"),
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0.45, 0.62, 0.76, 1],
          [1.6, 0.9, 1.06, 1],
          "clamp",
        ),
      },
      {
        rotate: `${interpolate(progress.value, [0.45, 0.76], [-16, 0], "clamp")}deg`,
      },
    ],
  }));
  const resultStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.65, 0.88], [0, 1], "clamp"),
    transform: [
      {
        translateY: interpolate(progress.value, [0.65, 0.88], [12, 0], "clamp"),
      },
    ],
  }));
  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.bg, paddingTop: insets.top + 8 },
      ]}
    >
      <View style={styles.topbar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("wordStudy.finish.close")}
          onPress={onContinue}
          style={[styles.close, { backgroundColor: colors.surface }]}
        >
          <Ionicons name="close" size={23} color={colors.text} />
        </Pressable>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.stage}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {!reducedMotion &&
            Array.from({ length: 12 }, (_, index) => (
              <Particle
                key={index}
                index={index}
                progress={progress}
                color={[colors.action, colors.yellow, colors.pink][index % 3]!}
              />
            ))}
          {words.map((word, index) => (
            <CompletionCard
              key={word.id}
              index={index}
              count={words.length}
              word={word}
              colors={colors}
              progress={progress}
            />
          ))}
          <Animated.View
            style={[styles.seal, { backgroundColor: colors.action }, sealStyle]}
          >
            <Ionicons name="checkmark" size={43} color={colors.onAction} />
          </Animated.View>
        </View>
        <Animated.View style={[styles.results, resultStyle]}>
          <Text
            accessibilityRole="header"
            style={[styles.title, { color: colors.text }]}
          >
            {t(`wordStudy.finish.${completedRecall ? "title" : "browseTitle"}`)}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t(
              `wordStudy.finish.${completedRecall ? "subtitle" : "browseSubtitle"}`,
            )}
          </Text>
          <Text style={[styles.range, { color: colors.textSecondary }]}>
            {rangeLabel}
          </Text>
          <View style={[styles.stats, { borderColor: colors.border }]}>
            {[
              {
                icon: "layers-outline" as const,
                label: "viewed",
                count: viewedCount,
                color: colors.primary,
              },
              {
                icon: "checkmark-circle-outline" as const,
                label: "practiced",
                count: practicedCount,
                color: colors.onPink,
              },
            ]
              .filter((item) => item.label !== "practiced" || completedRecall)
              .map((item) => (
                <View key={item.label} style={styles.stat}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                  <Text style={[styles.statCount, { color: colors.text }]}>
                    {item.count}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    {t(`wordStudy.finish.${item.label}`)}
                  </Text>
                </View>
              ))}
          </View>
        </Animated.View>
      </ScrollView>
      <View
        style={[styles.actions, { paddingBottom: Math.max(insets.bottom, 16) }]}
      >
        <Pressable
          accessibilityRole="button"
          onPress={onContinue}
          style={({ pressed }) => [
            styles.primary,
            { backgroundColor: pressed ? colors.depth : colors.action },
          ]}
        >
          <Text style={styles.primaryText}>
            {t("wordStudy.finish.continue")}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.onAction} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onReviewAgain}
          style={styles.secondary}
        >
          <Text style={[styles.secondaryText, { color: colors.primary }]}>
            {t("wordStudy.finish.reviewAgain")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topbar: { paddingHorizontal: 20, height: 48, justifyContent: "center" },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  stage: {
    width: 280,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  wordCard: {
    position: "absolute",
    width: 108,
    height: 144,
    borderRadius: 17,
    padding: 16,
    shadowColor: "#182D54",
    shadowOffset: { width: 0, height: 9 },
    shadowRadius: 18,
    shadowOpacity: 0.14,
    elevation: 3,
  },
  cardTab: {
    width: 19,
    height: 26,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    position: "absolute",
    top: 0,
    right: 15,
  },
  cardWord: { marginTop: 28, fontSize: 16, lineHeight: 20, fontWeight: "800" },
  cardMeaning: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
  },
  seal: {
    position: "absolute",
    right: 57,
    bottom: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  particle: { position: "absolute", width: 8, height: 11 },
  results: { width: "100%", maxWidth: 450, alignItems: "center" },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    marginTop: 11,
    textAlign: "center",
  },
  range: { fontSize: 12, lineHeight: 19, marginTop: 20, textAlign: "center" },
  stats: {
    width: "100%",
    flexDirection: "row",
    marginTop: 22,
    borderTopWidth: 1,
    paddingTop: 20,
    gap: 12,
  },
  stat: { flex: 1, alignItems: "center", gap: 7 },
  statCount: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  statLabel: { fontSize: 12, lineHeight: 17, textAlign: "center" },
  actions: {
    paddingHorizontal: 24,
    paddingTop: 12,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  primary: {
    minHeight: 54,
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "800",
  },
  secondary: {
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  secondaryText: { fontSize: 14, lineHeight: 20, fontWeight: "700" },
});
