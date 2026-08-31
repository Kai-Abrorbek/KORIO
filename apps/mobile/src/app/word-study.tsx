/* eslint-disable react-hooks/set-state-in-effect -- route and remote data synchronize screen state. */
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  FadeInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { WordService } from "@/services/word.service";
import { useSettingsStore } from "@/store/settings.store";
import type {
  StudyWord,
  WordSectionSummary,
  WordUnitSummary,
} from "@/types/word-study";
import * as Haptics from "@/utils/haptics";
import { useSeenWords } from "@/hooks/useSeenWords";
import { StudyPathService } from "@/services/study-path.service";
import { lessonSlice } from "@/types/study-path";
import { isAnswerCorrect } from "@/utils/answer-check";

const SECTIONS = [1, 2, 3];
const SWIPE_THRESHOLD = 88;
const SWIPE_VELOCITY = 720;
const INITIAL_RECALL_INTERVAL = 5;
const FOLLOW_UP_RECALL_INTERVAL = 1;

type RecallStatus = "idle" | "wrong" | "correct";

function pickRecallWordId(
  pendingIds: string[],
  currentWordId?: string,
  lastRecalledWordId?: string | null,
) {
  const spacedCandidates = pendingIds.filter(
    (id) => id !== currentWordId && id !== lastRecalledWordId,
  );
  const freshCandidates = pendingIds.filter((id) => id !== lastRecalledWordId);
  const candidates =
    spacedCandidates.length > 0
      ? spacedCandidates
      : freshCandidates.length > 0
        ? freshCandidates
        : pendingIds;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

interface CardPalette {
  gradient: readonly [string, string];
  accent: string;
  accentDark: string;
  tint: string;
}

const CARD_PALETTES: CardPalette[] = [
  {
    gradient: ["#DCD8FF", "#F0EEFF"],
    accent: "#776EE2",
    accentDark: "#5F56C8",
    tint: "#F3F1FF",
  },
  {
    gradient: ["#BFEFFF", "#E8F9FF"],
    accent: "#1CA7D8",
    accentDark: "#1286B0",
    tint: "#ECFAFF",
  },
  {
    gradient: ["#FFE0B5", "#FFF4DC"],
    accent: "#E78A20",
    accentDark: "#C56B0C",
    tint: "#FFF7E8",
  },
  {
    gradient: ["#CBEFDC", "#EEFAF3"],
    accent: "#2BA875",
    accentDark: "#1D865C",
    tint: "#EFFBF5",
  },
  {
    gradient: ["#FFD7E2", "#FFF0F4"],
    accent: "#E95D84",
    accentDark: "#C84269",
    tint: "#FFF1F5",
  },
];

function paletteFor(word: StudyWord, index: number) {
  const seed = [...word.headword].reduce(
    (sum, character) => sum + (character.codePointAt(0) ?? 0),
    index,
  );
  return CARD_PALETTES[seed % CARD_PALETTES.length] ?? CARD_PALETTES[0]!;
}

function WordVisual({
  word,
  palette,
  theme,
  concealHeadword = false,
}: {
  word: StudyWord;
  palette: CardPalette;
  theme: ThemeColors;
  concealHeadword?: boolean;
}) {
  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(word.media.imageUrl) && !imageFailed;

  return (
    <LinearGradient colors={palette.gradient} style={styles.visualArea}>
      <View style={[styles.visualOrb, styles.visualOrbTop]} />
      <View style={[styles.visualOrb, styles.visualOrbBottom]} />

      <View style={styles.visualBadges}>
        <View style={[styles.posChip, { backgroundColor: palette.accent }]}>
          <View style={styles.posDot} />
          <Text style={styles.posChipText}>
            {t(`wordStudy.partOfSpeech.${word.partOfSpeech}`)}
          </Text>
        </View>
        {word.placement?.isCore ? (
          <View style={styles.coreChip}>
            <Ionicons name="sparkles" size={13} color={palette.accentDark} />
            <Text style={[styles.coreChipText, { color: palette.accentDark }]}>
              {t("wordStudy.core")}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.visualContent}>
        {showImage ? (
          <Image
            source={{ uri: word.media.imageUrl }}
            accessibilityLabel={
              concealHeadword
                ? t("wordStudy.recallPrompt")
                : word.media.imageAlt || word.headword
            }
            contentFit="contain"
            transition={220}
            onError={() => setImageFailed(true)}
            style={styles.wordImage}
          />
        ) : word.media.emoji ? (
          <Text style={styles.emoji}>{word.media.emoji}</Text>
        ) : (
          <View
            style={[
              styles.letterFallback,
              { backgroundColor: theme.surface + "D9" },
            ]}
          >
            <Text
              style={[styles.letterFallbackText, { color: palette.accent }]}
            >
              {concealHeadword ? "?" : word.headword.slice(0, 1)}
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

function WordCard({
  word,
  index,
  theme,
  isSpeaking,
  onSpeak,
}: {
  word: StudyWord;
  index: number;
  theme: ThemeColors;
  isSpeaking: boolean;
  onSpeak: () => void;
}) {
  const { t } = useTranslation();
  const palette = paletteFor(word, index);
  const example = word.examples[0];

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
      <WordVisual word={word} palette={palette} theme={theme} />

      <View style={styles.cardBody}>
        <View style={styles.wordRow}>
          <View style={styles.wordHeading}>
            <Text style={[styles.headword, { color: theme.text }]}>
              {word.headword}
            </Text>
            {word.pronunciation.romanization ? (
              <Text
                style={[styles.romanization, { color: theme.textSecondary }]}
              >
                {word.pronunciation.romanization}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("wordStudy.listenWord")}
            onPress={onSpeak}
            activeOpacity={0.82}
            style={[
              styles.speakerButton,
              {
                backgroundColor: isSpeaking ? palette.accent : palette.tint,
                borderColor: isSpeaking ? palette.accent : palette.gradient[0],
              },
            ]}
          >
            <Ionicons
              name={isSpeaking ? "volume-high" : "volume-medium-outline"}
              size={25}
              color={isSpeaking ? "#FFFFFF" : palette.accentDark}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.meaningLabel, { color: palette.accentDark }]}>
          {t("wordStudy.meaning")}
        </Text>
        <Text style={[styles.meaning, { color: theme.text }]}>
          {word.meaning}
        </Text>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.exampleTitleRow}>
          <View style={[styles.quoteIcon, { backgroundColor: palette.tint }]}>
            <Ionicons
              name="chatbubble-ellipses"
              size={16}
              color={palette.accent}
            />
          </View>
          <Text style={[styles.exampleLabel, { color: theme.textSecondary }]}>
            {t("wordStudy.example")}
          </Text>
        </View>

        {example ? (
          <View
            style={[
              styles.examplePanel,
              {
                backgroundColor: palette.tint,
                borderColor: palette.gradient[0],
              },
            ]}
          >
            <Text style={[styles.exampleKorean, { color: theme.text }]}>
              {example.korean}
            </Text>
            <Text
              style={[
                styles.exampleTranslation,
                { color: theme.textSecondary },
              ]}
            >
              {example.translation}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.examplePanel,
              styles.exampleEmpty,
              {
                backgroundColor: palette.tint,
                borderColor: palette.gradient[0],
              },
            ]}
          >
            <Ionicons name="create-outline" size={18} color={palette.accent} />
            <Text
              style={[styles.exampleEmptyText, { color: theme.textSecondary }]}
            >
              {t("wordStudy.examplePending")}
            </Text>
          </View>
        )}

        {word.usageNote ? (
          <View style={styles.noteRow}>
            <Ionicons
              name="bulb-outline"
              size={17}
              color={palette.accentDark}
            />
            <Text style={[styles.noteText, { color: theme.textSecondary }]}>
              {word.usageNote}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function RecallCard({
  word,
  index,
  theme,
  answer,
  status,
  hintVisible,
  compact,
  isSpeaking,
  onChangeAnswer,
  onSubmit,
  onShowHint,
  onSpeak,
}: {
  word: StudyWord;
  index: number;
  theme: ThemeColors;
  answer: string;
  status: RecallStatus;
  hintVisible: boolean;
  compact: boolean;
  isSpeaking: boolean;
  onChangeAnswer: (value: string) => void;
  onSubmit: () => void;
  onShowHint: () => void;
  onSpeak: () => void;
}) {
  const { t } = useTranslation();
  const palette = paletteFor(word, index);
  const isCorrect = status === "correct";
  const isWrong = status === "wrong";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: isCorrect
            ? "#37B97A"
            : isWrong
              ? "#F06D7A"
              : palette.gradient[0],
          shadowColor: theme.text,
        },
      ]}
    >
      <WordVisual word={word} palette={palette} theme={theme} concealHeadword />

      <View style={[styles.cardBody, compact && styles.recallBodyCompact]}>
        <View style={styles.recallBadgeRow}>
          <View
            style={[styles.recallBadge, { backgroundColor: palette.accent }]}
          >
            <Ionicons name="sparkles" size={14} color="#FFFFFF" />
            <Text style={styles.recallBadgeText}>
              {t("wordStudy.recallBadge")}
            </Text>
          </View>
          {!compact ? (
            <Text
              style={[styles.recallCountHint, { color: palette.accentDark }]}
            >
              {t("wordStudy.recallCountHint")}
            </Text>
          ) : null}
        </View>
        <Text
          style={[
            styles.recallInputLabel,
            compact && styles.recallInputLabelCompact,
            { color: theme.textSecondary },
          ]}
        >
          {t("wordStudy.recallInputLabel")}
        </Text>
        <View
          style={[
            styles.recallInputShell,
            compact && styles.recallInputShellCompact,
            {
              backgroundColor: palette.tint,
              borderColor: isCorrect
                ? "#37B97A"
                : isWrong
                  ? "#F06D7A"
                  : palette.gradient[0],
            },
          ]}
        >
          <TextInput
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isCorrect}
            returnKeyType="done"
            value={answer}
            onChangeText={onChangeAnswer}
            onSubmitEditing={onSubmit}
            placeholder={word.meaning}
            placeholderTextColor={theme.textSecondary + "88"}
            selectionColor={palette.accent}
            style={[
              styles.recallInput,
              compact && styles.recallInputCompact,
              { color: theme.text },
            ]}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("wordStudy.recallCheck")}
            disabled={!answer.trim() || isCorrect}
            onPress={onSubmit}
            activeOpacity={0.84}
            style={[
              styles.recallCheckButton,
              {
                backgroundColor: isCorrect
                  ? "#37B97A"
                  : answer.trim()
                    ? palette.accent
                    : theme.border,
              },
            ]}
          >
            <Ionicons
              name={isCorrect ? "checkmark" : "arrow-forward"}
              size={21}
              color={
                isCorrect || answer.trim() ? "#FFFFFF" : theme.textSecondary
              }
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.meaningLabel, { color: palette.accentDark }]}>
          {t("wordStudy.meaning")}
        </Text>
        <Text
          style={[
            styles.meaning,
            compact && styles.recallMeaningCompact,
            { color: theme.text },
          ]}
        >
          {word.meaning}
        </Text>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View
          style={[
            styles.recallFeedback,
            compact && styles.recallFeedbackCompact,
            {
              backgroundColor: isCorrect
                ? "#EAF9F1"
                : isWrong
                  ? "#FFF0F2"
                  : theme.bg,
              borderColor: isCorrect
                ? "#BCEBD4"
                : isWrong
                  ? "#FFD0D6"
                  : theme.border,
            },
          ]}
        >
          <View
            style={[
              styles.recallFeedbackIcon,
              {
                backgroundColor: isCorrect
                  ? "#37B97A"
                  : isWrong
                    ? "#F06D7A"
                    : palette.accent,
              },
            ]}
          >
            <Ionicons
              name={
                isCorrect ? "checkmark" : isWrong ? "refresh" : "bulb-outline"
              }
              size={18}
              color="#FFFFFF"
            />
          </View>
          <View style={styles.recallFeedbackTextGroup}>
            <Text
              style={[
                styles.recallFeedbackTitle,
                {
                  color: isCorrect
                    ? "#168658"
                    : isWrong
                      ? "#C74355"
                      : theme.text,
                },
              ]}
            >
              {hintVisible && !isCorrect
                ? `${t("wordStudy.recallAnswer")}: ${word.headword}`
                : t(
                    isCorrect
                      ? "wordStudy.recallCorrect"
                      : isWrong
                        ? "wordStudy.recallWrong"
                        : "wordStudy.recallGuide",
                  )}
            </Text>
            {!compact ? (
              <Text
                style={[
                  styles.recallFeedbackDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {hintVisible && !isCorrect
                  ? t("wordStudy.recallHintInstruction")
                  : t(
                      isCorrect
                        ? "wordStudy.recallCorrectSub"
                        : isWrong
                          ? "wordStudy.recallWrongSub"
                          : "wordStudy.recallGuideSub",
                    )}
              </Text>
            ) : null}
          </View>
          {isCorrect ? (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("wordStudy.listenWord")}
              onPress={onSpeak}
              style={[
                styles.recallSpeaker,
                {
                  backgroundColor: isSpeaking ? palette.accent : theme.surface,
                },
              ]}
            >
              <Ionicons
                name={isSpeaking ? "volume-high" : "volume-medium-outline"}
                size={21}
                color={isSpeaking ? "#FFFFFF" : palette.accentDark}
              />
            </TouchableOpacity>
          ) : !hintVisible ? (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("wordStudy.recallHint")}
              onPress={onShowHint}
              activeOpacity={0.82}
              style={[
                styles.recallHintButton,
                {
                  backgroundColor: palette.tint,
                  borderColor: palette.gradient[0],
                },
              ]}
            >
              <Ionicons
                name="bulb-outline"
                size={16}
                color={palette.accentDark}
              />
              <Text
                style={[
                  styles.recallHintButtonText,
                  { color: palette.accentDark },
                ]}
              >
                {t("wordStudy.recallHint")}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

function PreviewCard({
  word,
  index,
  theme,
}: {
  word: StudyWord;
  index: number;
  theme: ThemeColors;
}) {
  const palette = paletteFor(word, index);
  return (
    <View
      style={[
        styles.previewCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <LinearGradient colors={palette.gradient} style={styles.previewVisual}>
        <Text style={styles.previewEmoji}>{word.media.emoji || "가"}</Text>
      </LinearGradient>
      <View style={styles.previewBody}>
        <Text style={[styles.previewWord, { color: theme.text }]}>
          {word.headword}
        </Text>
        <Text style={[styles.previewMeaning, { color: theme.textSecondary }]}>
          {word.meaning}
        </Text>
      </View>
    </View>
  );
}

function ScopePicker({
  visible,
  summaries,
  initialSection,
  initialUnit,
  initialAutoPlay,
  theme,
  bottomInset,
  onClose,
  onApply,
}: {
  visible: boolean;
  summaries: WordSectionSummary[];
  initialSection: number;
  initialUnit: number;
  initialAutoPlay: boolean;
  theme: ThemeColors;
  bottomInset: number;
  onClose: () => void;
  onApply: (section: number, unit: number, autoPlay: boolean) => void;
}) {
  const { t } = useTranslation();
  const { height: screenHeight } = useWindowDimensions();
  const available = summaries.filter((summary) => summary.words > 0);
  const [section, setSection] = useState(initialSection);
  const [unit, setUnit] = useState(initialUnit);
  const [autoPlay, setAutoPlay] = useState(initialAutoPlay);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;
    setSection(initialSection);
    setUnit(initialUnit);
    setAutoPlay(initialAutoPlay);
    translateY.value = 0;
  }, [initialAutoPlay, initialSection, initialUnit, translateY, visible]);

  const selectedSummary =
    available.find((summary) => summary.section === section) ?? available[0];

  const selectSection = (nextSection: number) => {
    const nextSummary = available.find(
      (summary) => summary.section === nextSection,
    );
    if (!nextSummary) return;
    setSection(nextSection);
    setUnit(nextSummary.units[0]?.unit ?? 1);
    void Haptics.selectionAsync();
  };

  const selectPlaybackMode = (enabled: boolean) => {
    if (enabled === autoPlay) return;
    setAutoPlay(enabled);
    void Haptics.selectionAsync();
  };

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const dismissGesture = Gesture.Pan()
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldClose = event.translationY > 100 || event.velocityY > 900;

      if (shouldClose) {
        translateY.value = withTiming(
          screenHeight,
          { duration: 200, easing: Easing.in(Easing.cubic) },
          (finished) => {
            if (finished) runOnJS(onClose)();
          },
        );
        return;
      }

      translateY.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.cubic),
      });
    });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.modalRoot}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <Animated.View
          style={[
            styles.scopeSheet,
            {
              backgroundColor: theme.surface,
              paddingBottom: Math.max(20, bottomInset + 12),
            },
            sheetStyle,
          ]}
        >
          <GestureDetector gesture={dismissGesture}>
            <View style={styles.sheetDragArea}>
              <View
                style={[styles.sheetHandle, { backgroundColor: theme.border }]}
              />
              <View style={styles.sheetHeadingRow}>
                <View>
                  <Text style={[styles.sheetEyebrow, { color: theme.primary }]}>
                    {t("wordStudy.chooseRangeEyebrow")}
                  </Text>
                  <Text style={[styles.sheetTitle, { color: theme.text }]}>
                    {t("wordStudy.chooseRange")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.sheetClose, { backgroundColor: theme.border }]}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </GestureDetector>

          <ScrollView
            style={styles.pickerScroll}
            contentContainerStyle={styles.pickerScrollContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <Text style={[styles.pickerLabel, { color: theme.textSecondary }]}>
              {t("wordStudy.section")}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sectionChips}
            >
              {available.map((summary) => {
                const selected = summary.section === selectedSummary?.section;
                return (
                  <TouchableOpacity
                    key={summary.section}
                    onPress={() => selectSection(summary.section)}
                    style={[
                      styles.sectionChip,
                      {
                        backgroundColor: selected ? theme.primary : theme.bg,
                        borderColor: selected ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sectionChipText,
                        { color: selected ? "#FFFFFF" : theme.text },
                      ]}
                    >
                      {t("wordStudy.sectionNumber", { n: summary.section })}
                    </Text>
                    <Text
                      style={[
                        styles.sectionChipCount,
                        { color: selected ? "#FFFFFFCC" : theme.textSecondary },
                      ]}
                    >
                      {t("wordStudy.wordsCount", { count: summary.words })}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={[styles.pickerLabel, { color: theme.textSecondary }]}>
              {t("wordStudy.unit")}
            </Text>
            <View style={styles.unitGrid}>
              {(selectedSummary?.units ?? []).map((item: WordUnitSummary) => {
                const selected = item.unit === unit;
                return (
                  <TouchableOpacity
                    key={item.unit}
                    onPress={() => {
                      setUnit(item.unit);
                      void Haptics.selectionAsync();
                    }}
                    style={[
                      styles.unitChip,
                      {
                        backgroundColor: selected
                          ? theme.primary + "16"
                          : theme.bg,
                        borderColor: selected ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.unitNumber,
                        {
                          backgroundColor: selected
                            ? theme.primary
                            : theme.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.unitNumberText,
                          { color: selected ? "#FFFFFF" : theme.textSecondary },
                        ]}
                      >
                        {item.unit}
                      </Text>
                    </View>
                    <View style={styles.unitTextGroup}>
                      <Text style={[styles.unitTitle, { color: theme.text }]}>
                        {t("wordStudy.unitNumber", { n: item.unit })}
                      </Text>
                      <Text
                        style={[
                          styles.unitCount,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {t("wordStudy.wordsCount", { count: item.words })}
                      </Text>
                    </View>
                    {selected ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={theme.primary}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text
              style={[
                styles.pickerLabel,
                styles.playbackLabel,
                { color: theme.textSecondary },
              ]}
            >
              {t("wordStudy.playback")}
            </Text>
            <View style={styles.playbackOptions}>
              <TouchableOpacity
                accessibilityRole="radio"
                accessibilityState={{ checked: autoPlay }}
                onPress={() => selectPlaybackMode(true)}
                activeOpacity={0.82}
                style={[
                  styles.playbackOption,
                  {
                    backgroundColor: autoPlay ? theme.primary + "14" : theme.bg,
                    borderColor: autoPlay ? theme.primary : theme.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.playbackIcon,
                    {
                      backgroundColor: autoPlay ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="volume-high-outline"
                    size={20}
                    color={autoPlay ? "#FFFFFF" : theme.textSecondary}
                  />
                </View>
                <View style={styles.playbackTextGroup}>
                  <Text style={[styles.playbackTitle, { color: theme.text }]}>
                    {t("wordStudy.playbackAuto")}
                  </Text>
                  <Text
                    style={[
                      styles.playbackDescription,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {t("wordStudy.playbackAutoSub")}
                  </Text>
                </View>
                {autoPlay ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={21}
                    color={theme.primary}
                  />
                ) : null}
              </TouchableOpacity>

              <TouchableOpacity
                accessibilityRole="radio"
                accessibilityState={{ checked: !autoPlay }}
                onPress={() => selectPlaybackMode(false)}
                activeOpacity={0.82}
                style={[
                  styles.playbackOption,
                  {
                    backgroundColor: !autoPlay
                      ? theme.primary + "14"
                      : theme.bg,
                    borderColor: !autoPlay ? theme.primary : theme.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.playbackIcon,
                    {
                      backgroundColor: !autoPlay ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="finger-print-outline"
                    size={20}
                    color={!autoPlay ? "#FFFFFF" : theme.textSecondary}
                  />
                </View>
                <View style={styles.playbackTextGroup}>
                  <Text style={[styles.playbackTitle, { color: theme.text }]}>
                    {t("wordStudy.playbackManual")}
                  </Text>
                  <Text
                    style={[
                      styles.playbackDescription,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {t("wordStudy.playbackManualSub")}
                  </Text>
                </View>
                {!autoPlay ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={21}
                    color={theme.primary}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity
            disabled={!selectedSummary || !unit}
            onPress={() => {
              if (selectedSummary && unit) {
                onApply(selectedSummary.section, unit, autoPlay);
              }
            }}
            activeOpacity={0.88}
            style={[
              styles.applyButton,
              { backgroundColor: theme.primary },
              (!selectedSummary || !unit) && styles.disabled,
            ]}
          >
            <Text style={styles.applyButtonText}>
              {t("wordStudy.studyThisRange")}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

export default function WordStudyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    section?: string;
    unit?: string;
    /** "studyPath" 면 마지막 카드에서 하루치 완료로 표시하고 로드맵으로 */
    from?: string;
    /** 학습 로드 모드: 단어 노드의 몇 번째 레슨인지 (1-based) */
    lesson?: string;
    lessonCount?: string;
  }>();
  // loadWords 의 의존성 배열이 즉시 평가되므로 그보다 위에서 선언해야 한다
  const studyLesson = Math.max(1, Number(params.lesson) || 1);
  const studyLessonCount = Math.max(1, Number(params.lessonCount) || 1);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { speak, stop, isSpeaking } = useSpeech();
  // 카드를 넘겨 본 단어는 "학습 중"으로 올라간다. 학습 로드 모드의 단어 노드가
  // 이걸로 완료 여부를 판단한다.
  const { markSeen, flush: flushSeen } = useSeenWords();
  const wordStudyAutoPlay = useSettingsStore(
    (state) => state.wordStudyAutoPlay,
  );
  const setWordStudyAutoPlay = useSettingsStore(
    (state) => state.setWordStudyAutoPlay,
  );
  const wordStudyLast = useSettingsStore((state) => state.wordStudyLast);
  const setWordStudyLast = useSettingsStore((state) => state.setWordStudyLast);
  // 첫 진입에 한 번만 이어보기를 적용한다. 이후 범위를 직접 바꾸면 0번부터.
  const resumeIndexRef = useRef<number | null>(null);
  const resumeConsumedRef = useRef(false);
  const screenStyles = useMemo(() => createScreenStyles(theme), [theme]);

  const [summaries, setSummaries] = useState<WordSectionSummary[]>([]);
  const [section, setSection] = useState(3);
  const [unit, setUnit] = useState(1);
  const [words, setWords] = useState<StudyWord[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [scopeLoading, setScopeLoading] = useState(true);
  const [wordsLoading, setWordsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [recallWord, setRecallWord] = useState<StudyWord | null>(null);
  const [recallAnswer, setRecallAnswer] = useState("");
  const [recallStatus, setRecallStatus] = useState<RecallStatus>("idle");
  const [recallHintVisible, setRecallHintVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [pendingRecallWordIds, setPendingRecallWordIds] = useState<string[]>(
    [],
  );
  const seenWordIdsRef = useRef<string[]>([]);
  const countedForwardWordIdsRef = useRef<Set<string>>(new Set());
  const normalCardsSinceRecallRef = useRef(0);
  const nextRecallIntervalRef = useRef(INITIAL_RECALL_INTERVAL);
  const lastRecalledWordIdRef = useRef<string | null>(null);
  const recallResultReportedRef = useRef(false);
  const recallHadWrongAttemptRef = useRef(false);
  const extraRecallTotalRef = useRef(0);
  const extraRecallWindowRef = useRef(0);
  const normalCardsAfterInitialRecallRef = useRef(0);
  const scheduledExtraRecallsRef = useRef(0);
  const activeRecallIsScheduledExtraRef = useRef(false);

  const translateX = useSharedValue(0);
  const gestureLocked = useSharedValue(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSubscription = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true),
    );
    const hideSubscription = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const loadSummaries = useCallback(async () => {
    setScopeLoading(true);
    setLoadFailed(false);
    try {
      const result = await Promise.all(
        SECTIONS.map((value) => WordService.getSectionSummary(value)),
      );
      const available = result.filter((summary) => summary.words > 0);
      setSummaries(result);

      // 1순위: 라우트 파라미터(로드맵에서 특정 유닛으로 들어온 경우)
      // 2순위: 마지막으로 보던 위치 — 멈춘 곳부터 이어간다
      // 둘 다 없으면 아직 시작한 적 없는 유저 → 범위 선택 모달부터 띄운다
      const saved = wordStudyLast;
      const requestedSection = Number(params.section) || saved?.section;
      const requestedUnit = Number(params.unit) || saved?.unit;

      const matchedSummary = available.find(
        (item) => item.section === requestedSection,
      );
      const matchedUnit = matchedSummary?.units.find(
        (item) => item.unit === requestedUnit,
      )?.unit;

      if (matchedSummary && matchedUnit) {
        setSection(matchedSummary.section);
        setUnit(matchedUnit);
        // 저장된 위치로 돌아온 경우에만 카드 번호까지 복원한다
        if (
          !Number(params.section) &&
          saved &&
          saved.section === matchedSummary.section &&
          saved.unit === matchedUnit
        ) {
          resumeIndexRef.current = saved.cardIndex;
        }
      } else {
        // 이어갈 데이터가 없다 → 어디서부터 할지 직접 고르게 한다
        const fallback = available[0];
        if (fallback?.units[0]) {
          setSection(fallback.section);
          setUnit(fallback.units[0].unit);
        }
        if (!Number(params.section)) setPickerVisible(true);
      }
    } catch {
      setLoadFailed(true);
    } finally {
      setScopeLoading(false);
    }
    // wordStudyLast 는 첫 계산에만 쓰고 이후 변화로 다시 돌지 않게 의존성에서 뺀다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.section, params.unit]);

  useEffect(() => {
    void loadSummaries();
  }, [loadSummaries]);

  const activeLanguage = i18n.resolvedLanguage ?? i18n.language;
  const loadWords = useCallback(async () => {
    if (scopeLoading || summaries.length === 0 || !section || !unit) return;
    setWordsLoading(true);
    setLoadFailed(false);
    // 범위를 바꾸기 전에 지금까지 본 것을 넘긴다
    flushSeen();
    setRecallWord(null);
    setRecallAnswer("");
    setRecallStatus("idle");
    setRecallHintVisible(false);
    setKeyboardVisible(false);
    setPendingRecallWordIds([]);
    seenWordIdsRef.current = [];
    countedForwardWordIdsRef.current = new Set();
    normalCardsSinceRecallRef.current = 0;
    nextRecallIntervalRef.current = INITIAL_RECALL_INTERVAL;
    lastRecalledWordIdRef.current = null;
    recallResultReportedRef.current = false;
    recallHadWrongAttemptRef.current = false;
    extraRecallTotalRef.current = 0;
    extraRecallWindowRef.current = 0;
    normalCardsAfterInitialRecallRef.current = 0;
    scheduledExtraRecallsRef.current = 0;
    activeRecallIsScheduledExtraRef.current = false;
    setWords([]);
    setCardIndex(0);
    stop();
    translateX.value = 0;

    try {
      const all = await WordService.getUnitWords(section, unit);
      // 학습 로드 모드는 유닛 단어를 여러 레슨으로 나눠서 전부 훑는다.
      // 서버(lessonSlice)와 같은 규칙으로 잘라야 조각이 어긋나지 않는다.
      const result =
        studyLessonCount > 1
          ? (() => {
              const { start, end } = lessonSlice(
                all.length,
                studyLessonCount,
                studyLesson - 1,
              );
              return all.slice(start, end);
            })()
          : all;
      setWords(result);

      // 이어보기: 저장된 카드 번호로 복원 (단어가 줄었으면 마지막 카드로)
      const resumeAt = resumeIndexRef.current;
      resumeIndexRef.current = null;
      if (!resumeConsumedRef.current && resumeAt != null && result.length > 0) {
        resumeConsumedRef.current = true;
        const restoredIndex = Math.min(
          Math.max(0, resumeAt),
          result.length - 1,
        );
        const restoredWordIds = result
          .slice(0, restoredIndex + 1)
          .map((word) => word.id);
        seenWordIdsRef.current = restoredWordIds;
        setPendingRecallWordIds(restoredWordIds);
        setCardIndex(restoredIndex);
      }
    } catch {
      setLoadFailed(true);
    } finally {
      setWordsLoading(false);
    }
  }, [
    activeLanguage,
    flushSeen,
    studyLesson,
    studyLessonCount,
    scopeLoading,
    section,
    stop,
    summaries.length,
    translateX,
    unit,
  ]);

  useEffect(() => {
    void loadWords();
  }, [loadWords]);

  const currentWord = words[cardIndex];
  const previousWord = cardIndex > 0 ? words[cardIndex - 1] : undefined;
  const nextWord =
    cardIndex < words.length - 1 ? words[cardIndex + 1] : undefined;
  const hasPendingRecalls = pendingRecallWordIds.length > 0;
  const canGoPrevious = recallWord
    ? Boolean(currentWord)
    : Boolean(previousWord);
  const canGoNext = recallWord
    ? recallStatus === "correct" && (Boolean(nextWord) || hasPendingRecalls)
    : Boolean(nextWord) || hasPendingRecalls;
  const nextPreviewWord = recallWord
    ? recallStatus === "correct"
      ? nextWord
      : undefined
    : nextWord;
  const previousPreviewWord = recallWord ? currentWord : previousWord;
  const hasFinishedDeck =
    Boolean(currentWord) &&
    !nextWord &&
    !hasPendingRecalls &&
    (!recallWord || recallStatus === "correct");
  const currentWordId = currentWord?.id ?? "";
  const currentSpeechText = currentWord
    ? currentWord.pronunciation.ttsText ||
      currentWord.pronunciation.hangul ||
      currentWord.headword
    : "";

  useEffect(() => {
    markSeen(currentWordId);
    if (currentWordId && !seenWordIdsRef.current.includes(currentWordId)) {
      seenWordIdsRef.current.push(currentWordId);
      setPendingRecallWordIds((current) => [...current, currentWordId]);
    }
  }, [currentWordId, markSeen]);

  useEffect(() => {
    if (
      recallWord ||
      !currentWordId ||
      !currentSpeechText ||
      !wordStudyAutoPlay
    ) {
      return;
    }
    speak(currentSpeechText, "ko-KR");
    return stop;
  }, [
    currentSpeechText,
    currentWordId,
    recallWord,
    speak,
    stop,
    wordStudyAutoPlay,
  ]);

  const fromStudyPath = params.from === "studyPath";

  /**
   * 그날 단어를 끝까지 봤다는 사실을 남긴다. 단어 상태(new→learning)만으로
   * 판정하면 카드를 다 넘겨도 마지막 한 장이 유실됐을 때 다음 노드가 안 열린다.
   */
  const finishStudyPathUnit = useCallback(() => {
    flushSeen();
    if (section > 0 && unit > 0) {
      StudyPathService.completeNode(
        section,
        unit,
        "words",
        1,
        studyLesson,
      ).catch(() => {});
    }
    router.replace("/study-path");
  }, [flushSeen, router, section, studyLesson, unit]);

  const clearRecall = useCallback(
    (requeue = false) => {
      Keyboard.dismiss();
      setKeyboardVisible(false);
      if (requeue && recallWord) {
        setPendingRecallWordIds((current) =>
          current.includes(recallWord.id)
            ? current
            : [...current, recallWord.id],
        );
        if (activeRecallIsScheduledExtraRef.current) {
          scheduledExtraRecallsRef.current += 1;
        }
      }
      setRecallWord(null);
      setRecallAnswer("");
      setRecallStatus("idle");
      setRecallHintVisible(false);
      recallResultReportedRef.current = false;
      recallHadWrongAttemptRef.current = false;
      activeRecallIsScheduledExtraRef.current = false;
    },
    [recallWord],
  );

  const submitRecall = useCallback(() => {
    if (!recallWord || recallStatus === "correct" || !recallAnswer.trim()) {
      return;
    }

    const correct = isAnswerCorrect(recallAnswer, recallWord.headword);
    if (!recallResultReportedRef.current) {
      recallResultReportedRef.current = true;
      const learnedWithoutHelp = correct && !recallHadWrongAttemptRef.current;
      WordService.reviewWord(
        recallWord.id,
        learnedWithoutHelp ? "good" : "again",
      ).catch(() => {});
    }

    if (correct) {
      Keyboard.dismiss();
      if (recallHadWrongAttemptRef.current) {
        setPendingRecallWordIds((current) =>
          current.includes(recallWord.id)
            ? current
            : [...current, recallWord.id],
        );
      }
      setRecallStatus("correct");
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }

    recallHadWrongAttemptRef.current = true;
    setRecallStatus("wrong");
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [recallAnswer, recallStatus, recallWord]);

  const changeRecallAnswer = useCallback(
    (value: string) => {
      setRecallAnswer(value);
      if (recallStatus === "wrong") setRecallStatus("idle");
    },
    [recallStatus],
  );

  const showRecallHint = useCallback(() => {
    if (!recallWord || recallStatus === "correct") return;
    recallHadWrongAttemptRef.current = true;
    setRecallHintVisible(true);
    setRecallStatus("idle");
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [recallStatus, recallWord]);

  const showRecall = useCallback(
    (candidateId?: string, isScheduledExtra = false) => {
      if (!candidateId) return false;
      const candidate = words.find((word) => word.id === candidateId);
      if (!candidate) return false;

      setPendingRecallWordIds((current) =>
        current.filter((id) => id !== candidate.id),
      );
      normalCardsSinceRecallRef.current = 0;
      nextRecallIntervalRef.current = FOLLOW_UP_RECALL_INTERVAL;
      lastRecalledWordIdRef.current = candidate.id;
      recallResultReportedRef.current = false;
      recallHadWrongAttemptRef.current = false;
      activeRecallIsScheduledExtraRef.current = isScheduledExtra;
      setRecallAnswer("");
      setRecallStatus("idle");
      setRecallHintVisible(false);
      setRecallWord(candidate);
      translateX.value = 42;
      translateX.value = withSpring(0, {
        damping: 19,
        stiffness: 210,
        mass: 0.75,
      });
      gestureLocked.value = 0;
      void Haptics.selectionAsync();
      return true;
    },
    [gestureLocked, translateX, words],
  );

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      stop();

      if (recallWord) {
        if (direction < 0) {
          // 복습 카드는 앞으로 진행할 때만 존재한다. 뒤로 가면 방금 보던
          // 일반 단어로 돌아간다. 풀지 않은 문제는 큐 끝으로 다시 보낸다.
          clearRecall(true);
        } else if (recallStatus === "correct") {
          if (
            scheduledExtraRecallsRef.current > 0 &&
            pendingRecallWordIds.length > 0
          ) {
            const candidateId = pickRecallWordId(
              pendingRecallWordIds,
              currentWord?.id,
              lastRecalledWordIdRef.current,
            );
            scheduledExtraRecallsRef.current -= 1;
            if (showRecall(candidateId, true)) return;
            scheduledExtraRecallsRef.current += 1;
          }

          if (nextWord) {
            clearRecall();
            setCardIndex((current) => Math.min(words.length - 1, current + 1));
          } else {
            const candidateId = pickRecallWordId(
              pendingRecallWordIds,
              currentWord?.id,
              lastRecalledWordIdRef.current,
            );
            if (showRecall(candidateId)) return;
          }
        }
      } else if (direction > 0 && currentWord) {
        const alreadyCounted = countedForwardWordIdsRef.current.has(
          currentWord.id,
        );

        if (!alreadyCounted) {
          countedForwardWordIdsRef.current.add(currentWord.id);
          normalCardsSinceRecallRef.current += 1;

          if (
            nextRecallIntervalRef.current === FOLLOW_UP_RECALL_INTERVAL &&
            extraRecallWindowRef.current > 0
          ) {
            const previousStep = normalCardsAfterInitialRecallRef.current;
            const currentStep = Math.min(
              previousStep + 1,
              extraRecallWindowRef.current,
            );
            const previouslyDistributed = Math.floor(
              (previousStep * extraRecallTotalRef.current) /
                extraRecallWindowRef.current,
            );
            const distributedNow = Math.floor(
              (currentStep * extraRecallTotalRef.current) /
                extraRecallWindowRef.current,
            );
            scheduledExtraRecallsRef.current += Math.max(
              0,
              distributedNow - previouslyDistributed,
            );
            normalCardsAfterInitialRecallRef.current = currentStep;
          }
        }

        const intervalReached =
          !alreadyCounted &&
          normalCardsSinceRecallRef.current >= nextRecallIntervalRef.current;
        const shouldRecall =
          pendingRecallWordIds.length > 0 && (!nextWord || intervalReached);

        if (shouldRecall) {
          if (nextRecallIntervalRef.current === INITIAL_RECALL_INTERVAL) {
            // 첫 5장 뒤 큐에 남는 복습은 마지막에 몰지 않는다. 남은 일반
            // 카드 구간에 균등 분배해 연속 문제 묶음의 최대 길이를 줄인다.
            extraRecallTotalRef.current = Math.max(
              0,
              pendingRecallWordIds.length - 1,
            );
            extraRecallWindowRef.current = Math.max(
              0,
              words.length - cardIndex - 1,
            );
            normalCardsAfterInitialRecallRef.current = 0;
            scheduledExtraRecallsRef.current = 0;
          }
          const candidateId = pickRecallWordId(
            pendingRecallWordIds,
            currentWord.id,
            lastRecalledWordIdRef.current,
          );
          if (showRecall(candidateId)) return;
        }

        setCardIndex((current) => Math.min(words.length - 1, current + 1));
      } else {
        setCardIndex((current) =>
          Math.min(words.length - 1, Math.max(0, current + direction)),
        );
      }
      translateX.value = direction > 0 ? 42 : -42;
      translateX.value = withSpring(0, {
        damping: 19,
        stiffness: 210,
        mass: 0.75,
      });
      gestureLocked.value = 0;
      void Haptics.selectionAsync();
    },
    [
      cardIndex,
      clearRecall,
      currentWord,
      gestureLocked,
      nextWord,
      pendingRecallWordIds,
      recallStatus,
      recallWord,
      showRecall,
      stop,
      translateX,
      words,
    ],
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
        { duration: 245 },
        (finished) => {
          if (finished) {
            runOnJS(commitSwipe)(direction);
          } else {
            gestureLocked.value = 0;
          }
        },
      );
    },
    [canGoNext, canGoPrevious, commitSwipe, gestureLocked, translateX, width],
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
        : event.translationX * 0.18;
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
        const destination = direction > 0 ? -width * 1.18 : width * 1.18;
        translateX.value = withTiming(
          destination,
          { duration: 245 },
          (finished) => {
            if (finished) {
              runOnJS(commitSwipe)(direction);
            } else {
              gestureLocked.value = 0;
            }
          },
        );
      } else {
        translateX.value = withSpring(0, {
          damping: 18,
          stiffness: 220,
        });
      }
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
          [-8, 0, 8],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  const nextPreviewStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -18, 0],
      [1, 0.45, 0],
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
      [0, 0.45, 1],
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

  const goBack = () => {
    stop();
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const openScopePicker = () => {
    stop();
    setPickerVisible(true);
  };

  const applyScope = (
    nextSection: number,
    nextUnit: number,
    nextAutoPlay: boolean,
  ) => {
    setPickerVisible(false);
    setWordStudyAutoPlay(nextAutoPlay);
    if (nextSection === section && nextUnit === unit) return;
    // 직접 고른 범위는 처음부터 본다
    resumeIndexRef.current = null;
    resumeConsumedRef.current = true;
    setSection(nextSection);
    setUnit(nextUnit);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // 보던 지점을 저장한다. 다음 진입 때 여기서 이어간다.
  useEffect(() => {
    if (wordsLoading || words.length === 0) return;
    setWordStudyLast({ section, unit, cardIndex });
  }, [cardIndex, section, unit, words.length, wordsLoading, setWordStudyLast]);

  const progress = words.length > 0 ? (cardIndex + 1) / words.length : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled={Platform.OS === "ios" && Boolean(recallWord)}
      style={screenStyles.container}
    >
      <LinearGradient
        colors={screenStyles.backgroundGradient}
        style={StyleSheet.absoluteFill}
      />
      <View style={screenStyles.backgroundOrbOne} pointerEvents="none" />
      <View style={screenStyles.backgroundOrbTwo} pointerEvents="none" />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={10}
          style={[styles.headerButton, { backgroundColor: theme.surface }]}
        >
          <Ionicons name="close" size={23} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleGroup}>
          <Text style={[styles.headerEyebrow, { color: theme.primary }]}>
            {t("wordStudy.eyebrow")}
          </Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t("wordStudy.title")}
          </Text>
        </View>
        <View
          style={[
            styles.counterPill,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          {recallWord ? (
            <>
              <Ionicons name="sparkles" size={14} color={theme.primary} />
              <Text style={[styles.counterRecall, { color: theme.primary }]}>
                {t("wordStudy.recallShort")}
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.counterCurrent, { color: theme.text }]}>
                {words.length ? cardIndex + 1 : 0}
              </Text>
              <Text
                style={[styles.counterTotal, { color: theme.textSecondary }]}
              >
                / {words.length}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.progressWrap}>
        <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width:
                  `${Math.max(0, Math.min(1, progress)) * 100}%` as `${number}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* 스크롤 없이 한 화면에 담는다. 카드가 남은 높이를 flex 로 채우고
          하단 네비 버튼은 항상 보이게 고정된다. */}
      <View
        style={[
          styles.screenScroll,
          styles.screenContent,
          { paddingBottom: Math.max(insets.bottom, 14) + 10 },
        ]}
      >
        {!keyboardVisible ? (
          <Animated.View entering={FadeInDown.duration(320)}>
            <TouchableOpacity
              onPress={openScopePicker}
              disabled={scopeLoading || summaries.every((item) => !item.words)}
              activeOpacity={0.86}
              style={[
                styles.scopeButton,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <View
                style={[styles.scopeIcon, { backgroundColor: theme.primary }]}
              >
                <Ionicons name="layers" size={19} color="#FFFFFF" />
              </View>
              <View style={styles.scopeTextGroup}>
                <Text
                  style={[styles.scopeLabel, { color: theme.textSecondary }]}
                >
                  {t("wordStudy.currentRange")}
                </Text>
                <Text style={[styles.scopeValue, { color: theme.text }]}>
                  {t("wordStudy.range", { section, unit })}
                </Text>
              </View>
              <View style={[styles.changeChip, { backgroundColor: theme.bg }]}>
                <Text style={[styles.changeChipText, { color: theme.primary }]}>
                  {t("wordStudy.change")}
                </Text>
                <Ionicons name="chevron-down" size={15} color={theme.primary} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ) : null}

        {scopeLoading || wordsLoading ? (
          <View style={styles.centerState}>
            <View
              style={[
                styles.loadingCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={[styles.stateTitle, { color: theme.text }]}>
                {t("wordStudy.loading")}
              </Text>
              <Text style={[styles.stateText, { color: theme.textSecondary }]}>
                {t("wordStudy.loadingSub")}
              </Text>
            </View>
          </View>
        ) : loadFailed ? (
          <View style={styles.centerState}>
            <View
              style={[
                styles.loadingCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <View style={styles.stateIconError}>
                <Ionicons
                  name="cloud-offline-outline"
                  size={30}
                  color="#E95D84"
                />
              </View>
              <Text style={[styles.stateTitle, { color: theme.text }]}>
                {t("wordStudy.loadFailed")}
              </Text>
              <Text style={[styles.stateText, { color: theme.textSecondary }]}>
                {t("wordStudy.loadFailedSub")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (summaries.length) void loadWords();
                  else void loadSummaries();
                }}
                style={[styles.retryButton, { backgroundColor: theme.primary }]}
              >
                <Text style={styles.retryText}>{t("wordStudy.retry")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : !currentWord ? (
          <View style={styles.centerState}>
            <View
              style={[
                styles.loadingCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Text style={styles.emptyEmoji}>🗂️</Text>
              <Text style={[styles.stateTitle, { color: theme.text }]}>
                {t("wordStudy.empty")}
              </Text>
              <Text style={[styles.stateText, { color: theme.textSecondary }]}>
                {t("wordStudy.emptySub")}
              </Text>
            </View>
          </View>
        ) : (
          <Animated.View
            entering={FadeIn.duration(260)}
            style={styles.cardArea}
          >
            <View style={styles.deck}>
              {nextPreviewWord ? (
                <Animated.View
                  pointerEvents="none"
                  style={[styles.previewLayer, nextPreviewStyle]}
                >
                  <PreviewCard
                    word={nextPreviewWord}
                    index={cardIndex + 1}
                    theme={theme}
                  />
                </Animated.View>
              ) : null}
              {previousPreviewWord ? (
                <Animated.View
                  pointerEvents="none"
                  style={[styles.previewLayer, previousPreviewStyle]}
                >
                  <PreviewCard
                    word={previousPreviewWord}
                    index={recallWord ? cardIndex : cardIndex - 1}
                    theme={theme}
                  />
                </Animated.View>
              ) : null}

              <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.cardFill, currentCardStyle]}>
                  {recallWord ? (
                    <RecallCard
                      key={`recall-${recallWord.id}`}
                      word={recallWord}
                      index={cardIndex}
                      theme={theme}
                      answer={recallAnswer}
                      status={recallStatus}
                      hintVisible={recallHintVisible}
                      compact={keyboardVisible}
                      isSpeaking={isSpeaking}
                      onChangeAnswer={changeRecallAnswer}
                      onSubmit={submitRecall}
                      onShowHint={showRecallHint}
                      onSpeak={() =>
                        speak(
                          recallWord.pronunciation.ttsText ||
                            recallWord.pronunciation.hangul ||
                            recallWord.headword,
                          "ko-KR",
                        )
                      }
                    />
                  ) : (
                    <WordCard
                      key={currentWord.id}
                      word={currentWord}
                      index={cardIndex}
                      theme={theme}
                      isSpeaking={isSpeaking}
                      onSpeak={() =>
                        speak(
                          currentWord.pronunciation.ttsText ||
                            currentWord.pronunciation.hangul ||
                            currentWord.headword,
                          "ko-KR",
                        )
                      }
                    />
                  )}
                </Animated.View>
              </GestureDetector>
            </View>

            {fromStudyPath && hasFinishedDeck && words.length > 0 ? (
              <TouchableOpacity
                onPress={finishStudyPathUnit}
                style={[
                  styles.finishButton,
                  { backgroundColor: theme.primary },
                ]}
                activeOpacity={0.88}
              >
                <Text style={styles.finishText}>
                  {t("wordStudy.finishDay")}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            ) : null}

            <View
              pointerEvents={keyboardVisible ? "none" : "auto"}
              style={[
                styles.navigationRow,
                keyboardVisible && styles.navigationRowHidden,
              ]}
            >
              <TouchableOpacity
                accessibilityLabel={t("wordStudy.previous")}
                disabled={!canGoPrevious}
                onPress={() => animateCardOut(-1)}
                style={[
                  styles.navButton,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                  !canGoPrevious && styles.disabled,
                ]}
              >
                <Ionicons name="arrow-back" size={21} color={theme.text} />
              </TouchableOpacity>

              <View style={styles.swipeHint}>
                <Ionicons
                  name={
                    recallWord
                      ? recallStatus === "correct"
                        ? "arrow-forward"
                        : "create-outline"
                      : "swap-horizontal"
                  }
                  size={18}
                  color={theme.textSecondary}
                />
                <Text
                  style={[styles.swipeHintText, { color: theme.textSecondary }]}
                >
                  {t(
                    recallWord
                      ? recallStatus === "correct"
                        ? "wordStudy.recallContinue"
                        : "wordStudy.recallAnswerFirst"
                      : "wordStudy.swipeHint",
                  )}
                </Text>
              </View>

              <TouchableOpacity
                accessibilityLabel={t("wordStudy.next")}
                disabled={!canGoNext}
                onPress={() => animateCardOut(1)}
                style={[
                  styles.navButton,
                  styles.navButtonPrimary,
                  {
                    backgroundColor: canGoNext ? theme.primary : theme.surface,
                    borderColor: canGoNext ? theme.primary : theme.border,
                  },
                  !canGoNext && styles.disabled,
                ]}
              >
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color={canGoNext ? "#FFFFFF" : theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>

      <ScopePicker
        visible={pickerVisible}
        summaries={summaries}
        initialSection={section}
        initialUnit={unit}
        initialAutoPlay={wordStudyAutoPlay}
        theme={theme}
        bottomInset={insets.bottom}
        onClose={() => setPickerVisible(false)}
        onApply={applyScope}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 18,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  headerTitleGroup: { flex: 1, alignItems: "center" },
  headerEyebrow: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  headerTitle: { fontSize: 21, lineHeight: 27, fontWeight: "900" },
  counterPill: {
    minWidth: 54,
    height: 38,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  counterCurrent: { fontSize: 14, fontWeight: "900" },
  counterTotal: { fontSize: 12, fontWeight: "700" },
  counterRecall: { fontSize: 12, fontWeight: "900" },
  progressWrap: { paddingHorizontal: 22, paddingBottom: 10 },
  progressTrack: { height: 5, borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99 },
  screenScroll: { flex: 1 },
  screenContent: { paddingHorizontal: 18, paddingTop: 6 },
  scopeButton: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    borderRadius: 19,
    borderWidth: 1.5,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  scopeIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  scopeTextGroup: { flex: 1, paddingHorizontal: 12 },
  scopeLabel: { fontSize: 11, fontWeight: "700", marginBottom: 2 },
  scopeValue: { fontSize: 16, fontWeight: "900" },
  changeChip: {
    height: 34,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  changeChipText: { fontSize: 12, fontWeight: "900" },
  centerState: { paddingTop: 34, alignItems: "center" },
  loadingCard: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 28,
    borderWidth: 1.5,
    paddingHorizontal: 30,
    paddingVertical: 46,
    alignItems: "center",
  },
  stateIconError: {
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: "#FFF0F4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  stateTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 16,
    textAlign: "center",
  },
  stateText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    marginTop: 7,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  retryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  emptyEmoji: { fontSize: 48 },
  cardArea: { flex: 1 },
  cardFill: { flex: 1 },
  deck: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    flex: 1,
    marginTop: 12,
  },
  previewLayer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
  card: {
    flex: 1,
    zIndex: 2,
    borderRadius: 30,
    borderWidth: 1.5,
    overflow: "hidden",
    shadowOpacity: 0.13,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  recallBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  recallBadge: {
    height: 30,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 6,
  },
  recallBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  recallCountHint: { flexShrink: 1, fontSize: 11, fontWeight: "800" },
  recallMeaningCompact: { fontSize: 18, lineHeight: 25, marginTop: 2 },
  recallBodyCompact: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  recallInputLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  recallInputLabelCompact: { marginBottom: 4 },
  recallInputShell: {
    minHeight: 64,
    borderRadius: 18,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 17,
    paddingRight: 7,
  },
  recallInputShellCompact: { minHeight: 56 },
  recallInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "900",
    paddingVertical: 0,
  },
  recallInputCompact: { fontSize: 27, lineHeight: 34 },
  recallCheckButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  recallFeedback: {
    minHeight: 76,
    borderRadius: 18,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginTop: 14,
  },
  recallFeedbackCompact: {
    minHeight: 54,
    paddingVertical: 8,
    marginTop: 8,
  },
  recallFeedbackIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  recallFeedbackTextGroup: { flex: 1, paddingHorizontal: 11 },
  recallFeedbackTitle: { fontSize: 14, lineHeight: 19, fontWeight: "900" },
  recallFeedbackDescription: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  recallSpeaker: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recallHintButton: {
    minHeight: 38,
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 5,
  },
  recallHintButtonText: { fontSize: 11, lineHeight: 15, fontWeight: "900" },
  visualArea: {
    // 고정 높이였다가 카드가 화면을 넘겼다. 남는 만큼만 차지하고 줄어든다.
    minHeight: 148,
    flexShrink: 1,
    padding: 18,
    overflow: "hidden",
  },
  visualOrb: {
    position: "absolute",
    borderWidth: 22,
    borderColor: "#FFFFFF45",
    borderRadius: 999,
  },
  visualOrbTop: { width: 150, height: 150, right: -42, top: -56 },
  visualOrbBottom: { width: 112, height: 112, left: -44, bottom: -45 },
  visualBadges: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  posChip: {
    height: 30,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 7,
  },
  posDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF" },
  posChipText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  coreChip: {
    height: 30,
    borderRadius: 99,
    backgroundColor: "#FFFFFFB8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    gap: 5,
  },
  coreChipText: { fontSize: 11, fontWeight: "900" },
  visualContent: {
    flex: 1,
    minHeight: 92,
    alignItems: "center",
    justifyContent: "center",
  },
  wordImage: { width: "82%", flex: 1, maxHeight: 148 },
  emoji: {
    fontSize: 76,
    lineHeight: 96,
    textAlign: "center",
    textShadowColor: "#FFFFFFA0",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 14,
  },
  letterFallback: {
    width: 112,
    height: 112,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  letterFallbackText: { fontSize: 58, lineHeight: 68, fontWeight: "900" },
  cardBody: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 18,
  },
  wordRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  wordHeading: { flex: 1 },
  headword: { fontSize: 31, lineHeight: 39, fontWeight: "900" },
  romanization: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 1,
    letterSpacing: 0.2,
  },
  speakerButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  meaningLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 15,
    textTransform: "uppercase",
  },
  meaning: { fontSize: 20, lineHeight: 29, fontWeight: "800", marginTop: 3 },
  divider: { height: 1.5, marginVertical: 12 },
  exampleTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  quoteIcon: {
    width: 29,
    height: 29,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  exampleLabel: { fontSize: 12, fontWeight: "900", letterSpacing: 0.3 },
  examplePanel: {
    marginTop: 10,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  exampleKorean: { fontSize: 16, lineHeight: 24, fontWeight: "800" },
  exampleTranslation: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    marginTop: 5,
  },
  exampleEmpty: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderStyle: "dashed",
  },
  exampleEmptyText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 14,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, fontWeight: "600" },
  previewCard: {
    flex: 1,
    borderRadius: 30,
    borderWidth: 1.5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  previewVisual: {
    minHeight: 148,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewEmoji: { fontSize: 80 },
  previewBody: { padding: 22 },
  previewWord: { fontSize: 28, fontWeight: "900" },
  previewMeaning: { fontSize: 17, fontWeight: "700", marginTop: 7 },
  finishButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 54,
    borderRadius: 16,
    marginBottom: 10,
  },
  finishText: { color: "#FFFFFF", fontSize: 16.5, fontWeight: "900" },
  navigationRow: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  navigationRowHidden: { display: "none" },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonPrimary: {
    shadowColor: "#776EE2",
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  disabled: { opacity: 0.38 },
  swipeHint: { flexDirection: "row", alignItems: "center", gap: 6 },
  swipeHintText: { fontSize: 12, fontWeight: "800" },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#11121A99",
  },
  scopeSheet: {
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 10,
    paddingHorizontal: 20,
    maxHeight: "90%",
  },
  sheetDragArea: { marginHorizontal: -2 },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 99,
    alignSelf: "center",
    marginBottom: 19,
  },
  sheetHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sheetEyebrow: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 3,
  },
  sheetTitle: { fontSize: 24, lineHeight: 31, fontWeight: "900" },
  sheetClose: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerScroll: { flexShrink: 1 },
  pickerScrollContent: { paddingBottom: 4 },
  pickerLabel: { fontSize: 12, fontWeight: "900", marginBottom: 10 },
  sectionChips: { gap: 10, paddingBottom: 20 },
  sectionChip: {
    minWidth: 126,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionChipText: { fontSize: 15, fontWeight: "900" },
  sectionChipCount: { fontSize: 11, fontWeight: "700", marginTop: 3 },
  unitGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  unitChip: {
    flexBasis: "48%",
    flexGrow: 1,
    minHeight: 62,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  unitNumber: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  unitNumberText: { fontSize: 14, fontWeight: "900" },
  unitTextGroup: { flex: 1, paddingHorizontal: 12 },
  unitTitle: { fontSize: 15, fontWeight: "900" },
  unitCount: { fontSize: 11, fontWeight: "700", marginTop: 2 },
  playbackLabel: { marginTop: 20 },
  playbackOptions: { gap: 9 },
  playbackOption: {
    minHeight: 72,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  playbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  playbackTextGroup: { flex: 1 },
  playbackTitle: { fontSize: 14, lineHeight: 19, fontWeight: "900" },
  playbackDescription: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  applyButton: {
    height: 56,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  applyButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
});

const createScreenStyles = (theme: ThemeColors) => {
  const isDark = theme.bg === "#15151D";
  return {
    container: { flex: 1, backgroundColor: theme.bg },
    backgroundGradient: (isDark
      ? ["#171522", "#15151D", "#1C1A27"]
      : ["#F7F5FF", "#FFFFFF", "#F3FAFF"]) as readonly [string, string, string],
    backgroundOrbOne: {
      position: "absolute" as const,
      width: 220,
      height: 220,
      borderRadius: 999,
      backgroundColor: isDark ? "#776EE21C" : "#BEB7FF2B",
      right: -100,
      top: 84,
    },
    backgroundOrbTwo: {
      position: "absolute" as const,
      width: 180,
      height: 180,
      borderRadius: 999,
      backgroundColor: isDark ? "#45B7D114" : "#BFEFFF38",
      left: -100,
      bottom: 80,
    },
  };
};
