import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
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
import {
  expressionPackThemeByCode,
  type ExpressionPackTheme,
} from "@/constants/expression-packs";
import type { ThemeColors } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { ExpressionService } from "@/services/expression.service";
import type {
  ExpressionPackInfo,
  StudyExpression,
} from "@/types/expression";
import * as Haptics from "@/utils/haptics";

const SWIPE_THRESHOLD = 82;
const SWIPE_VELOCITY = 700;

function ExpressionCard({
  item,
  pack,
  packTheme,
  theme,
  isSpeaking,
  saved,
  onSpeak,
  onToggleSaved,
}: {
  item: StudyExpression;
  pack: ExpressionPackInfo;
  packTheme: ExpressionPackTheme;
  theme: ThemeColors;
  isSpeaking: boolean;
  saved: boolean;
  onSpeak: () => void;
  onToggleSaved: () => void;
}) {
  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.text,
        },
      ]}
    >
      <LinearGradient
        colors={[packTheme.background, `${packTheme.accent}55`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardVisual}
      >
        <View style={styles.visualOrbLarge} />
        <View style={styles.visualOrbSmall} />

        <View style={styles.visualTopRow}>
          <View
            style={[styles.packChip, { backgroundColor: packTheme.accent }]}
          >
            <Ionicons name={packTheme.icon} size={13} color="#FFFFFF" />
            <Text style={styles.packChipText} numberOfLines={1}>
              {pack.title}
            </Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={
              saved
                ? t("expressionPack.removeSaved")
                : t("expressionPack.save")
            }
            onPress={onToggleSaved}
            activeOpacity={0.8}
            style={styles.saveButton}
          >
            <Ionicons
              name={saved ? "bookmark" : "bookmark-outline"}
              size={22}
              color={saved ? packTheme.accentDark : "#5D5A6A"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.emojiWrap}>
          {item.media.imageUrl && !imageFailed ? (
            <Image
              source={{ uri: item.media.imageUrl }}
              accessibilityLabel={item.media.imageAlt || item.korean}
              contentFit="contain"
              transition={220}
              onError={() => setImageFailed(true)}
              style={styles.cardImage}
            />
          ) : item.media.emoji ? (
            <Text style={styles.cardEmoji}>{item.media.emoji}</Text>
          ) : (
            <Text
              style={[styles.cardFallback, { color: packTheme.accentDark }]}
            >
              {item.korean.slice(0, 1)}
            </Text>
          )}
        </View>
      </LinearGradient>

      <View style={styles.cardBody}>
        <View style={styles.cardMetaRow}>
          <View
            style={[
              styles.levelChip,
              { backgroundColor: packTheme.background },
            ]}
          >
            <View
              style={[styles.levelDot, { backgroundColor: packTheme.accent }]}
            />
            <Text
              style={[styles.levelChipText, { color: packTheme.accentDark }]}
            >
              {t(`expressionPack.speechLevel.${item.speechLevel}`)}
            </Text>
          </View>
          <Text
            style={[
              styles.singleExpressionLabel,
              { color: theme.textSecondary },
            ]}
          >
            {t("expressionPack.singleExpression")}
          </Text>
        </View>

        <View style={styles.expressionRow}>
          <Text
            style={[styles.koreanExpression, { color: theme.text }]}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.78}
          >
            {item.korean}
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("expressionPack.listen")}
            activeOpacity={0.82}
            onPress={onSpeak}
            style={[
              styles.speakerButton,
              {
                backgroundColor: isSpeaking
                  ? packTheme.accent
                  : packTheme.background,
                borderColor: packTheme.accent,
              },
            ]}
          >
            <Ionicons
              name={isSpeaking ? "volume-high" : "volume-medium-outline"}
              size={25}
              color={isSpeaking ? "#FFFFFF" : packTheme.accentDark}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.meaningLabel, { color: packTheme.accentDark }]}
        >
          {t("expressionPack.meaning")}
        </Text>
        <Text style={[styles.meaningText, { color: theme.text }]}>
          {item.meaning}
        </Text>

        <View
          style={[
            styles.contextPanel,
            {
              backgroundColor: packTheme.background,
              borderColor: `${packTheme.accent}55`,
            },
          ]}
        >
          <View style={styles.contextTitleRow}>
            <View
              style={[styles.contextIcon, { backgroundColor: packTheme.accent }]}
            >
              <Ionicons name="location-outline" size={14} color="#FFFFFF" />
            </View>
            <Text
              style={[styles.contextLabel, { color: packTheme.accentDark }]}
            >
              {t("expressionPack.context")}
            </Text>
          </View>
          <Text
            style={[styles.contextText, { color: theme.textSecondary }]}
          >
            {item.context}
          </Text>
        </View>
      </View>
    </View>
  );
}

function PreviewCard({
  item,
  packTheme,
  theme,
}: {
  item: StudyExpression;
  packTheme: ExpressionPackTheme;
  theme: ThemeColors;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View
      style={[
        styles.previewCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <LinearGradient
        colors={[packTheme.background, `${packTheme.accent}45`]}
        style={styles.previewVisual}
      >
        {item.media.imageUrl && !imageFailed ? (
          <Image
            source={{ uri: item.media.imageUrl }}
            accessibilityLabel={item.media.imageAlt || item.korean}
            contentFit="contain"
            transition={160}
            onError={() => setImageFailed(true)}
            style={styles.previewImage}
          />
        ) : item.media.emoji ? (
          <Text style={styles.previewEmoji}>{item.media.emoji}</Text>
        ) : (
          <Text
            style={[styles.previewFallback, { color: packTheme.accentDark }]}
          >
            {item.korean.slice(0, 1)}
          </Text>
        )}
      </LinearGradient>
      <Text style={[styles.previewExpression, { color: theme.text }]}>
        {item.korean}
      </Text>
    </View>
  );
}

export default function ExpressionPackScreen() {
  const params = useLocalSearchParams<{
    pack?: string;
    section?: string;
    unit?: string;
  }>();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const { speak, stop, isSpeaking } = useSpeech();
  const packCode = params.pack ?? "";
  const section = Math.max(1, Number(params.section) || 1);
  const unit = Math.max(1, Number(params.unit) || 1);
  const language = i18n.resolvedLanguage ?? i18n.language;
  const [pack, setPack] = useState<ExpressionPackInfo | null>(null);
  const [expressions, setExpressions] = useState<StudyExpression[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const recordedIds = useRef(new Set<string>());
  const translateX = useSharedValue(0);
  const gestureLocked = useSharedValue(0);

  const current = expressions[index];
  const previous = expressions[index - 1];
  const next = expressions[index + 1];
  const canGoPrevious = index > 0;
  const canGoNext = index < expressions.length - 1;
  const cardHeight = Math.min(520, Math.max(410, height - insets.top - 228));
  const progress = expressions.length
    ? (index + 1) / expressions.length
    : 0;
  const packTheme = expressionPackThemeByCode(pack?.code ?? packCode);

  const loadPack = useCallback(async () => {
    if (!packCode) {
      setLoading(false);
      setLoadFailed(true);
      return;
    }

    setLoading(true);
    setLoadFailed(false);
    try {
      const response = await ExpressionService.getPackExpressions(
        packCode,
        section,
        unit,
      );
      setPack(response.pack);
      setExpressions(response.items);
      recordedIds.current.clear();

      const resumeIndex = response.items.reduce((latest, item, itemIndex) => {
        const currentTime = item.progress.lastViewedAt
          ? new Date(item.progress.lastViewedAt).getTime()
          : 0;
        const latestViewedAt = response.items[latest]?.progress.lastViewedAt;
        const latestTime = latestViewedAt
          ? new Date(latestViewedAt).getTime()
          : 0;
        return currentTime > latestTime ? itemIndex : latest;
      }, 0);
      setIndex(resumeIndex);
    } catch {
      setPack(null);
      setExpressions([]);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [packCode, section, unit]);

  useEffect(() => {
    void loadPack();
  }, [language, loadPack]);

  useEffect(() => {
    stop();
    translateX.value = 0;
  }, [packCode, stop, translateX]);

  useEffect(() => {
    if (!current || recordedIds.current.has(current.id)) return;
    recordedIds.current.add(current.id);
    ExpressionService.recordView(current.id)
      .then(({ progress: savedProgress }) => {
        setExpressions((items) =>
          items.map((item) =>
            item.id === current.id
              ? { ...item, progress: savedProgress }
              : item,
          ),
        );
      })
      .catch(() => {
        recordedIds.current.delete(current.id);
      });
  }, [current]);

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      stop();
      setIndex((value) =>
        Math.min(expressions.length - 1, Math.max(0, value + direction)),
      );
      translateX.value = direction > 0 ? 42 : -42;
      translateX.value = withSpring(0, {
        damping: 19,
        stiffness: 210,
        mass: 0.75,
      });
      gestureLocked.value = 0;
      void Haptics.selectionAsync();
    },
    [expressions.length, gestureLocked, stop, translateX],
  );

  const animateCardOut = useCallback(
    (direction: -1 | 1) => {
      if (gestureLocked.value) return;
      if ((direction > 0 && !canGoNext) || (direction < 0 && !canGoPrevious)) {
        translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
        return;
      }

      gestureLocked.value = 1;
      const destination = direction > 0 ? -width * 1.18 : width * 1.18;
      translateX.value = withTiming(
        destination,
        { duration: 235 },
        (finished) => {
          if (finished) runOnJS(commitSwipe)(direction);
          else gestureLocked.value = 0;
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
    .activeOffsetX([-12, 12])
    .failOffsetY([-20, 20])
    .onUpdate((event) => {
      if (gestureLocked.value) return;
      const movingTowardNext = event.translationX < 0;
      const canMove = movingTowardNext ? canGoNext : canGoPrevious;
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

      if (!shouldMove) {
        translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
        return;
      }

      gestureLocked.value = 1;
      const destination = direction > 0 ? -width * 1.18 : width * 1.18;
      translateX.value = withTiming(
        destination,
        { duration: 235 },
        (finished) => {
          if (finished) runOnJS(commitSwipe)(direction);
          else gestureLocked.value = 0;
        },
      );
    });

  const currentCardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, width * 0.9],
      [1, 0.72],
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

  const nextPreviewStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -18, 0],
      [1, 0.42, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-SWIPE_THRESHOLD, 0],
          [1, 0.96],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const previousPreviewStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, 18, SWIPE_THRESHOLD],
      [0, 0.42, 1],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [0, SWIPE_THRESHOLD],
          [0.96, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const toggleSaved = async () => {
    if (!current) return;
    void Haptics.selectionAsync();
    const isSaved = !current.progress.isSaved;
    setExpressions((items) =>
      items.map((item) =>
        item.id === current.id
          ? {
              ...item,
              progress: {
                ...item.progress,
                isSaved,
                savedAt: isSaved ? new Date().toISOString() : null,
              },
            }
          : item,
      ),
    );

    try {
      const { progress: savedProgress } = await ExpressionService.setSaved(
        current.id,
        isSaved,
      );
      setExpressions((items) =>
        items.map((item) =>
          item.id === current.id
            ? { ...item, progress: savedProgress }
            : item,
        ),
      );
    } catch {
      setExpressions((items) =>
        items.map((item) =>
          item.id === current.id
            ? {
                ...item,
                progress: {
                  ...item.progress,
                  isSaved: !isSaved,
                  savedAt: current.progress.savedAt,
                },
              }
            : item,
        ),
      );
    }
  };

  const openPractice = () => {
    if (!pack) return;
    router.push({
      pathname: "/lesson",
      params: {
        mode: "expressionPractice",
        pack: pack.code,
        section: String(section),
        unit: String(unit),
        category: "expression",
      },
    });
  };

  if (loading || !pack || !current) {
    return (
      <View
        style={[
          styles.screen,
          styles.stateScreen,
          { backgroundColor: theme.bg, paddingTop: insets.top },
        ]}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/expressions")
          }
          style={[
            styles.stateBackButton,
            { backgroundColor: theme.surface },
          ]}
        >
          <Ionicons name="chevron-back" size={25} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.stateContent}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.primary} />
          ) : (
            <Ionicons
              name={loadFailed ? "cloud-offline-outline" : "albums-outline"}
              size={38}
              color={theme.textSecondary}
            />
          )}
          <Text style={[styles.stateTitle, { color: theme.text }]}>
            {loading
              ? t("expressionPack.loading")
              : loadFailed
                ? t("expressionPack.loadFailed")
                : t("expressionPack.empty")}
          </Text>
          {!loading ? (
            <TouchableOpacity
              onPress={() => void loadPack()}
              activeOpacity={0.84}
              style={[styles.retryButton, { backgroundColor: theme.primary }]}
            >
              <Ionicons name="refresh" size={18} color="#FFFFFF" />
              <Text style={styles.retryButtonText}>
                {t("expressionPack.retry")}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView
      style={[
        styles.screen,
        { backgroundColor: theme.bg, paddingTop: insets.top },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/expressions")
          }
          hitSlop={10}
          style={[styles.headerButton, { backgroundColor: theme.surface }]}
        >
          <Ionicons name="chevron-back" size={25} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text
            style={[styles.headerEyebrow, { color: packTheme.accentDark }]}
          >
            {t("expressionPack.learning")}
          </Text>
          <Text
            style={[styles.headerTitle, { color: theme.text }]}
            numberOfLines={1}
          >
            {pack.title}
          </Text>
        </View>
        <View
          style={[styles.counter, { backgroundColor: packTheme.background }]}
        >
          <Text
            style={[styles.counterText, { color: packTheme.accentDark }]}
          >
            {index + 1}
            <Text style={styles.counterTotal}>/{expressions.length}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.progressArea}>
        <View
          style={[styles.progressTrack, { backgroundColor: theme.border }]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: packTheme.accent,
              },
            ]}
          />
        </View>
        <Text style={[styles.swipeHint, { color: theme.textSecondary }]}>
          <Ionicons name="swap-horizontal" size={13} /> {" "}
          {t("expressionPack.swipeHint")}
        </Text>
      </View>

      <View style={[styles.cardStage, { height: cardHeight }]}>
        {previous ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.previewLayer, previousPreviewStyle]}
          >
            <PreviewCard
              key={previous.id}
              item={previous}
              packTheme={packTheme}
              theme={theme}
            />
          </Animated.View>
        ) : null}

        {next ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.previewLayer, nextPreviewStyle]}
          >
            <PreviewCard
              key={next.id}
              item={next}
              packTheme={packTheme}
              theme={theme}
            />
          </Animated.View>
        ) : null}

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.currentLayer, currentCardStyle]}>
            <ExpressionCard
              key={current.id}
              item={current}
              pack={pack}
              packTheme={packTheme}
              theme={theme}
              isSpeaking={isSpeaking}
              saved={current.progress.isSaved}
              onSpeak={() =>
                speak(current.pronunciation.ttsText || current.korean)
              }
              onToggleSaved={() => void toggleSaved()}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      <Animated.View
        entering={FadeIn.duration(220)}
        style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("expressionPack.previous")}
          disabled={!canGoPrevious}
          onPress={() => animateCardOut(-1)}
          activeOpacity={0.8}
          style={[
            styles.arrowButton,
            { backgroundColor: theme.surface, borderColor: theme.border },
            !canGoPrevious && styles.disabled,
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={canGoPrevious ? theme.text : theme.textSecondary}
          />
        </TouchableOpacity>

        {canGoNext ? (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => animateCardOut(1)}
            activeOpacity={0.86}
            style={[styles.nextButton, { backgroundColor: packTheme.accent }]}
          >
            <Text style={styles.nextButtonText}>
              {t("expressionPack.next")}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("expressionPack.startPractice")}
            onPress={openPractice}
            activeOpacity={0.86}
            style={[
              styles.practiceButton,
              { backgroundColor: packTheme.accent },
            ]}
          >
            <Ionicons name="school" size={20} color="#FFFFFF" />
            <Text style={styles.practiceButtonText}>
              {t("expressionPack.startPractice")}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  stateScreen: { paddingHorizontal: 16 },
  stateBackButton: {
    width: 42,
    height: 42,
    marginTop: 6,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  stateContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingBottom: 64,
  },
  stateTitle: {
    maxWidth: 280,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  retryButton: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  retryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1C1750",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  headerText: { flex: 1 },
  headerEyebrow: { fontSize: 10.5, fontWeight: "800" },
  headerTitle: { fontSize: 19, fontWeight: "900", marginTop: 1 },
  counter: {
    minWidth: 54,
    height: 38,
    paddingHorizontal: 10,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: { fontSize: 16, fontWeight: "900" },
  counterTotal: { fontSize: 11, fontWeight: "700", opacity: 0.68 },
  progressArea: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 10 },
  progressTrack: { height: 7, borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99 },
  swipeHint: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 7,
  },
  cardStage: { marginHorizontal: 18 },
  currentLayer: { width: "100%", height: "100%" },
  previewLayer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 28,
    overflow: "hidden",
    shadowOpacity: 0.14,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardVisual: { height: 156, padding: 15, overflow: "hidden" },
  visualOrbLarge: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.38)",
    right: -65,
    top: -73,
  },
  visualOrbSmall: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.32)",
    left: -31,
    bottom: -43,
  },
  visualTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  packChip: {
    maxWidth: "74%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 99,
  },
  packChipText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    fontWeight: "800",
    flexShrink: 1,
  },
  saveButton: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.72)",
  },
  emojiWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  cardEmoji: { fontSize: 70, marginTop: -4 },
  cardImage: { width: 126, height: 92 },
  cardFallback: { fontSize: 66, fontWeight: "900" },
  cardBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 18,
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 99,
  },
  levelDot: { width: 6, height: 6, borderRadius: 3 },
  levelChipText: { fontSize: 10.5, fontWeight: "800" },
  singleExpressionLabel: { fontSize: 10.5, fontWeight: "700" },
  expressionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 13,
  },
  koreanExpression: {
    flex: 1,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.65,
  },
  speakerButton: {
    width: 48,
    height: 48,
    borderRadius: 17,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  meaningLabel: { fontSize: 11, fontWeight: "900", marginTop: 15 },
  meaningText: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    marginTop: 4,
  },
  contextPanel: {
    marginTop: "auto",
    borderWidth: 1,
    borderRadius: 17,
    padding: 13,
  },
  contextTitleRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  contextIcon: {
    width: 25,
    height: 25,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  contextLabel: { fontSize: 11, fontWeight: "900" },
  contextText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  previewCard: {
    width: "96%",
    height: "96%",
    borderWidth: 1,
    borderRadius: 27,
    overflow: "hidden",
  },
  previewVisual: {
    height: "46%",
    alignItems: "center",
    justifyContent: "center",
  },
  previewEmoji: { fontSize: 66 },
  previewImage: { width: 132, height: 104 },
  previewFallback: { fontSize: 62, fontWeight: "900" },
  previewExpression: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 30,
    paddingHorizontal: 18,
  },
  footer: {
    flex: 1,
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  arrowButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    flex: 1,
    height: 54,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  practiceButton: {
    flex: 1,
    height: 54,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  practiceButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  disabled: { opacity: 0.36 },
});
