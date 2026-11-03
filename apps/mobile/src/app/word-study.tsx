import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Redirect,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Pressable, TouchableOpacity } from "@/components/ui/Pressables";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
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
import { ThemeColors, themes } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { WordService } from "@/services/word.service";
import { WordCollectionsService } from "@/services/word-collections.service";
import {
  getResumeWordIndex,
  type WordCollectionDetail,
  type WordCollectionPosition,
} from "../../../../shared/word-library";
import type { LearnCourse } from "@/constants/learnCourses";
import { useSettingsStore, useContentLang } from "@/store/settings.store";
import { useAvatarStudyStore } from "@/store/avatar-study.store";
import { useAuthStore } from "@/store/auth.store";
import type { StudyWord, WordSectionSummary } from "@/types/word-study";
import * as Haptics from "@/utils/haptics";
import { useSeenWords } from "@/hooks/useSeenWords";
import { StudyPathService } from "@/services/study-path.service";
import { lessonSlice } from "@/types/study-path";
import { isAnswerCorrect } from "@/utils/answer-check";
import { recallInputScrollOffset } from "@/utils/word-recall-layout";
import { DEFAULT_LEARNING_COURSES } from "@/constants/learnCourses";
import WordStudyCompletion from "@/components/words/WordStudyCompletion";
import { getWordLibraryPalette } from "../../../../shared/word-library-theme";
import {
  getWordBrowseAdvance,
  WORD_RECALL_ADVANCE_MS,
} from "../../../../shared/word-study-flow";
import {
  createRecallSaveAttempt,
  saveRecallProgress,
} from "../../../../shared/word-recall-progress";

const SWIPE_THRESHOLD = 88;
const SWIPE_VELOCITY = 720;

type RecallStatus = "idle" | "wrong" | "correct";
type StudyPhase = "browse" | "recall" | "complete";

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

function paletteFor(word: StudyWord, index: number, theme: ThemeColors) {
  const seed = [...word.headword].reduce(
    (sum, character) => sum + (character.codePointAt(0) ?? 0),
    index,
  );
  const palette =
    CARD_PALETTES[seed % CARD_PALETTES.length] ?? CARD_PALETTES[0]!;
  if (theme.bg !== getWordLibraryPalette(true).bg) return palette;
  return {
    ...palette,
    gradient: ["#28364C", "#222C3D"] as const,
    tint: "#27354A",
    accent: "#336AC1",
    accentDark: "#B8D3FF",
  };
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
  const palette = paletteFor(word, index, theme);
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
      <ScrollView
        style={styles.cardScroll}
        contentContainerStyle={styles.cardScrollContent}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        indicatorStyle={
          theme.bg === getWordLibraryPalette(true).bg ? "white" : "black"
        }
      >
        <WordVisual word={word} palette={palette} theme={theme} />

        <View style={styles.cardBody}>
          <View style={styles.wordRow}>
            <View style={styles.wordHeading}>
              <Text style={[styles.headword, { color: theme.text }]}>
                {word.headword}
              </Text>
              {word.pronunciation.ipa || word.pronunciation.romanization ? (
                <Text
                  style={[styles.romanization, { color: theme.textSecondary }]}
                >
                  {word.pronunciation.ipa || word.pronunciation.romanization}
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
                  borderColor: isSpeaking
                    ? palette.accent
                    : palette.gradient[0],
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
                {example.text ?? example.korean}
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
              <Ionicons
                name="create-outline"
                size={18}
                color={palette.accent}
              />
              <Text
                style={[
                  styles.exampleEmptyText,
                  { color: theme.textSecondary },
                ]}
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
      </ScrollView>
    </View>
  );
}

function RecallCard({
  word,
  index,
  theme,
  answer,
  status,
  saving,
  saveFailed,
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
  saving: boolean;
  saveFailed: boolean;
  hintVisible: boolean;
  compact: boolean;
  isSpeaking: boolean;
  onChangeAnswer: (value: string) => void;
  onSubmit: () => void;
  onShowHint: () => void;
  onSpeak: () => void;
}) {
  const { t } = useTranslation();
  const palette = paletteFor(word, index, theme);
  const isCorrect = status === "correct";
  const isWrong = status === "wrong";
  const colors = getWordLibraryPalette(
    theme.bg === getWordLibraryPalette(true).bg,
  );
  const [inputFocused, setInputFocused] = useState(false);
  const inputFocusedRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const revealFrameRef = useRef<number | null>(null);
  const inputLayoutRef = useRef({ top: 0, height: 0 });
  const scrollLayoutRef = useRef({ viewport: 0, content: 0, offset: 0 });
  const compactLayout = compact || inputFocused;
  const keepInputVisible = useCallback(() => {
    if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
    revealFrameRef.current = requestAnimationFrame(() => {
      revealFrameRef.current = null;
      if (!inputFocusedRef.current) return;
      const layout = scrollLayoutRef.current;
      const target = recallInputScrollOffset({
        inputTop: inputLayoutRef.current.top,
        inputHeight: inputLayoutRef.current.height,
        viewportHeight: layout.viewport,
        contentHeight: layout.content,
        scrollOffset: layout.offset,
      });
      if (Math.abs(target - layout.offset) < 1) return;
      layout.offset = target;
      scrollRef.current?.scrollTo({ y: target, animated: false });
    });
  }, []);
  useEffect(() => {
    if (compactLayout) keepInputVisible();
  }, [compactLayout, keepInputVisible]);
  useEffect(() => () => {
    if (revealFrameRef.current !== null) cancelAnimationFrame(revealFrameRef.current);
  }, []);

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
      <ScrollView
        ref={scrollRef}
        style={styles.cardScroll}
        contentContainerStyle={styles.cardScrollContent}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        onLayout={(event) => {
          scrollLayoutRef.current.viewport = event.nativeEvent.layout.height;
          keepInputVisible();
        }}
        onContentSizeChange={(_, height) => {
          scrollLayoutRef.current.content = height;
          keepInputVisible();
        }}
        onScroll={(event) => {
          scrollLayoutRef.current.offset = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {!compactLayout && <WordVisual
          word={word}
          palette={palette}
          theme={theme}
          concealHeadword
        />}

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
            {t("wordStudy.recallTargetLabel", {
              language: t(
                word.targetLanguage === "en"
                  ? "courses.languages.english"
                  : "courses.languages.korean",
              ),
            })}
          </Text>
          <View
            onLayout={(event) => {
              inputLayoutRef.current = { top: event.nativeEvent.layout.y, height: event.nativeEvent.layout.height };
              keepInputVisible();
            }}
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
              editable={!isCorrect && !saving}
              returnKeyType="done"
              submitBehavior="submit"
              onFocus={() => {
                inputFocusedRef.current = true;
                setInputFocused(true);
                keepInputVisible();
              }}
              onBlur={() => {
                inputFocusedRef.current = false;
                setInputFocused(false);
              }}
              value={answer}
              onChangeText={onChangeAnswer}
              onSubmitEditing={onSubmit}
              placeholder={word.meaning}
              placeholderTextColor={theme.textSecondary}
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
              disabled={!answer.trim() || isCorrect || saving}
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
              {saving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons
                  name={isCorrect ? "checkmark" : "arrow-forward"}
                  size={21}
                  color={
                    isCorrect || answer.trim() ? "#FFFFFF" : theme.textSecondary
                  }
                />
              )}
            </TouchableOpacity>
          </View>

          {saving || saveFailed ? (
            <Text
              accessibilityLiveRegion="polite"
              style={[
                styles.recallSaveMessage,
                { color: saveFailed ? colors.error : theme.textSecondary },
              ]}
            >
              {t(saving ? "wordStudy.savePending" : "wordStudy.saveFailed")}
            </Text>
          ) : null}

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
                backgroundColor: theme.bg,
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
                      ? colors.success
                      : isWrong
                        ? colors.error
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
                          : "wordStudy.recallTargetGuide",
                      {
                        language: t(
                          word.targetLanguage === "en"
                            ? "courses.languages.english"
                            : "courses.languages.korean",
                        ),
                      },
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
                    backgroundColor: isSpeaking
                      ? palette.accent
                      : theme.surface,
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
                disabled={saving}
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
      </ScrollView>
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
  const palette = paletteFor(word, index, theme);
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

function RecallOfferModal({
  visible,
  wordCount,
  theme,
  onClose,
  onStart,
  onSkip,
}: {
  visible: boolean;
  wordCount: number;
  theme: ThemeColors;
  onClose: () => void;
  onStart: () => void;
  onSkip: () => void;
}) {
  const { t } = useTranslation();
  const colors = getWordLibraryPalette(
    theme.bg === getWordLibraryPalette(true).bg,
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.recallOfferRoot}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.recallOfferContent}
          style={[styles.recallOfferCard, { backgroundColor: colors.surface }]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("wordStudy.finish.close")}
            onPress={onClose}
            style={styles.offerClose}
          >
            <Ionicons name="close" size={22} color={colors.textSecondary} />
          </Pressable>
          <View
            style={styles.offerIllustration}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <View
              style={[
                styles.offerMiniCard,
                styles.offerMiniCardBack,
                { backgroundColor: colors.yellow },
              ]}
            />
            <View
              style={[styles.offerMiniCard, { backgroundColor: colors.wash }]}
            >
              <Ionicons
                name="create-outline"
                size={30}
                color={colors.primary}
              />
            </View>
            <View style={[styles.offerDot, { backgroundColor: colors.pink }]} />
          </View>
          <Text style={[styles.recallOfferTitle, { color: theme.text }]}>
            {t("wordStudy.recallOfferTitle")}
          </Text>
          <Text
            style={[
              styles.recallOfferDescription,
              { color: theme.textSecondary },
            ]}
          >
            {t("wordStudy.recallOfferDescription", { count: wordCount })}
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={onStart}
            activeOpacity={0.88}
            style={[
              styles.recallOfferStartButton,
              { backgroundColor: colors.action },
            ]}
          >
            <Ionicons name="school-outline" size={20} color="#FFFFFF" />
            <Text style={styles.recallOfferStartText}>
              {t("wordStudy.recallOfferStart")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onSkip}
            activeOpacity={0.76}
            style={styles.recallOfferSkipButton}
          >
            <Text
              style={[
                styles.recallOfferSkipText,
                { color: theme.textSecondary },
              ]}
            >
              {t("wordStudy.recallOfferLater")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function WordStudyRoute() {
  const params = useLocalSearchParams<{
    section?: string;
    unit?: string;
    collectionId?: string;
    groupId?: string;
  }>();
  const section = Number(params.section);
  const unit = Number(params.unit);
  if (
    !(params.collectionId && params.groupId) &&
    (!Number.isInteger(section) ||
      section < 1 ||
      !Number.isInteger(unit) ||
      unit < 1)
  ) {
    return <Redirect href="/word-library" />;
  }
  return <WordStudyScreen />;
}

function WordStudyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    section?: string;
    unit?: string;
    /** "studyPath" 면 마지막 카드에서 하루치 완료로 표시하고 로드맵으로 */
    from?: string;
    /** 학습 로드 모드: 단어 노드의 몇 번째 레슨인지 (1-based) */
    lesson?: string;
    lessonCount?: string;
    resume?: string;
    collectionId?: string;
    groupId?: string;
  }>();
  // loadWords 의 의존성 배열이 즉시 평가되므로 그보다 위에서 선언해야 한다
  const studyLesson = Math.max(1, Number(params.lesson) || 1);
  const studyLessonCount = Math.max(1, Number(params.lessonCount) || 1);
  const { t } = useTranslation();
  const contentLang = useContentLang();
  const learnCourse = useSettingsStore((state) => state.learnCourse);
  const speechLocale = DEFAULT_LEARNING_COURSES[learnCourse].speechLocale;
  const uiLanguage = useSettingsStore((state) => state.language);
  const userId = useAuthStore((state) => state.user?.id);
  const collectionScope = Boolean(params.collectionId && params.groupId);
  const activeWordScope = `${userId || ""}:${learnCourse}:${collectionScope ? `${params.collectionId}:${params.groupId}` : `${params.section}:${params.unit}`}:${contentLang}:${params.from ?? ""}:${studyLesson}:${studyLessonCount}`;
  const appTheme = useTheme();
  const isDark = appTheme.bg === themes.dark.bg;
  const colors = getWordLibraryPalette(isDark);
  const theme: ThemeColors = { ...appTheme, ...colors };
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { speak, stop, isSpeaking, prewarm } = useSpeech();
  const [screenFocused, setScreenFocused] = useState(true);
  const screenFocusedRef = useRef(true);
  // 카드를 넘겨 본 단어는 "학습 중"으로 올라간다. 학습 로드 모드의 단어 노드가
  // 이걸로 완료 여부를 판단한다.
  const { markSeen, flush: flushSeen } = useSeenWords();
  useFocusEffect(
    useCallback(() => {
      screenFocusedRef.current = true;
      setScreenFocused(true);
      return () => {
        screenFocusedRef.current = false;
        setScreenFocused(false);
        stop();
        flushSeen();
      };
    }, [flushSeen, stop]),
  );
  const wordStudyAutoPlay = useSettingsStore(
    (state) => state.wordStudyAutoPlay,
  );
  const storedWordStudyLast = useSettingsStore((state) => state.wordStudyLast);
  const wordStudyLast =
    userId && storedWordStudyLast?.ownerId === userId
      ? storedWordStudyLast
      : null;
  const setWordStudyLast = useSettingsStore((state) => state.setWordStudyLast);
  // 첫 진입에 한 번만 이어보기를 적용한다. 이후 범위를 직접 바꾸면 0번부터.
  const resumeIndexRef = useRef<number | null>(null);
  const resumeConsumedRef = useRef(false);
  const resumeWordIdRef = useRef<string | null>(null);
  const scopeRequestRef = useRef(0);
  const wordRequestRef = useRef(0);
  const cancelScopeRequest = useCallback(() => {
    scopeRequestRef.current++;
  }, []);
  const cancelWordRequest = useCallback(() => {
    wordRequestRef.current++;
  }, []);
  const [collection, setCollection] = useState<WordCollectionDetail | null>(
    null,
  );
  const [positionFailed, setPositionFailed] = useState(false);
  const [loadedWordScope, setLoadedWordScope] = useState("");
  const positionWriteRef = useRef<Promise<void>>(Promise.resolve());
  const pendingPositionRef = useRef<{
    id: string;
    position: WordCollectionPosition;
    course: LearnCourse;
    userId: string | undefined;
  } | null>(null);
  const flushCollectionPosition = useCallback((): Promise<void> => {
    const pending = pendingPositionRef.current;
    if (!pending) return positionWriteRef.current;
    pendingPositionRef.current = null;
    // Serialize writes so a slow older request cannot replace the latest reading position.
    positionWriteRef.current = positionWriteRef.current.then(async () => {
      try {
        await WordCollectionsService.savePosition(
          pending.id,
          pending.position,
          pending.course,
          pending.userId,
        );
        setPositionFailed(false);
      } catch {
        if (
          useAuthStore.getState().user?.id === pending.userId &&
          useSettingsStore.getState().learnCourse === pending.course
        )
          setPositionFailed(true);
      }
    });
    return positionWriteRef.current;
  }, []);
  useFocusEffect(
    useCallback(
      () => () => {
        void flushCollectionPosition();
      },
      [flushCollectionPosition],
    ),
  );

  const [summaries, setSummaries] = useState<WordSectionSummary[]>([]);
  const [section, setSection] = useState(Number(params.section));
  const [unit, setUnit] = useState(Number(params.unit));
  const [words, setWords] = useState<StudyWord[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [scopeLoading, setScopeLoading] = useState(true);
  const [wordsLoading, setWordsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [studyPhase, setStudyPhase] = useState<StudyPhase>("browse");
  const [recallOfferVisible, setRecallOfferVisible] = useState(false);
  const [recallWord, setRecallWord] = useState<StudyWord | null>(null);
  const [recallAnswer, setRecallAnswer] = useState("");
  const [recallStatus, setRecallStatus] = useState<RecallStatus>("idle");
  const [recallSaving, setRecallSaving] = useState(false);
  const [recallSaveFailed, setRecallSaveFailed] = useState(false);
  const [recallHintVisible, setRecallHintVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [viewedWordIds, setViewedWordIds] = useState<string[]>([]);
  const [practicedWordIds, setPracticedWordIds] = useState<string[]>([]);
  const [completedRecall, setCompletedRecall] = useState(false);
  const [pendingRecallWordIds, setPendingRecallWordIds] = useState<string[]>(
    [],
  );
  const lastRecalledWordIdRef = useRef<string | null>(null);
  const recallSaveAttemptRef = useRef(createRecallSaveAttempt());
  const recallHadWrongAttemptRef = useRef(false);
  const recallSolvedRef = useRef(false);
  const sessionExitingRef = useRef(false);
  const activeWordScopeRef = useRef(activeWordScope);
  activeWordScopeRef.current = activeWordScope;
  const recallWordIdRef = useRef<string | null>(null);
  recallWordIdRef.current = recallWord?.id ?? null;

  const translateX = useSharedValue(0);
  const gestureLocked = useSharedValue(0);
  useFocusEffect(
    useCallback(
      () => () => {
        cancelAnimation(translateX);
        translateX.value = 0;
        gestureLocked.value = 0;
      },
      [gestureLocked, translateX],
    ),
  );

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
    const request = ++scopeRequestRef.current;
    setScopeLoading(true);
    setLoadFailed(false);
    setCollection(null);
    setSummaries([]);
    stop();
    try {
      if (collectionScope && params.collectionId && params.groupId) {
        const result = await WordCollectionsService.get(params.collectionId);
        if (scopeRequestRef.current !== request) return;
        const group = result.groups.find(
          (item) => item.id === params.groupId && item.words > 0,
        );
        if (!group) {
          router.replace({
            pathname: "/word-library",
            params: { collectionId: result.id },
          });
          return;
        }
        setCollection(result);
        setSection(group.section || 0);
        setUnit(group.unit || 0);
        if (params.resume === "1") {
          const saved =
            result.lastPosition?.groupId === group.id
              ? result.lastPosition
              : null;
          if (saved) {
            resumeIndexRef.current = saved.cardIndex;
            resumeWordIdRef.current = saved.lastWordId;
          } else if (
            result.id.startsWith("course-") &&
            wordStudyLast &&
            group.section === wordStudyLast.section &&
            group.unit === wordStudyLast.unit
          ) {
            resumeIndexRef.current = wordStudyLast.cardIndex;
          }
        }
        return;
      }
      const result = await WordService.getSectionSummaries();
      if (scopeRequestRef.current !== request) return;
      const available = result.filter((summary) => summary.words > 0);
      const matchedSummary = available.find(
        (item) => item.section === Number(params.section),
      );
      const matchedUnit = matchedSummary?.units.find(
        (item) => item.unit === Number(params.unit) && item.words > 0,
      );
      if (!matchedSummary || !matchedUnit) {
        router.replace("/word-library");
        return;
      }
      setSummaries(result);
      setSection(matchedSummary.section);
      setUnit(matchedUnit.unit);
      if (
        params.resume === "1" &&
        params.from !== "studyPath" &&
        wordStudyLast &&
        wordStudyLast.section === matchedSummary.section &&
        wordStudyLast.unit === matchedUnit.unit
      ) {
        resumeIndexRef.current = wordStudyLast.cardIndex;
      }
    } catch {
      if (scopeRequestRef.current === request) setLoadFailed(true);
    } finally {
      if (scopeRequestRef.current === request) setScopeLoading(false);
    }
    // Saved positions are applied once per route, not on every card-position update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.section,
    params.unit,
    params.resume,
    params.from,
    params.collectionId,
    params.groupId,
    collectionScope,
    learnCourse,
    userId,
    uiLanguage,
    router,
    stop,
  ]);

  useEffect(() => {
    resumeConsumedRef.current = false;
    resumeIndexRef.current = null;
    resumeWordIdRef.current = null;
    void loadSummaries();
    return cancelScopeRequest;
  }, [loadSummaries, cancelScopeRequest]);

  const activeLanguage = contentLang;
  const loadWords = useCallback(async () => {
    if (
      scopeLoading ||
      (collectionScope
        ? !collection
        : summaries.length === 0 || !section || !unit)
    )
      return;
    const request = ++wordRequestRef.current;
    setLoadedWordScope("");
    // 서비스가 설명 언어로 요청하므로 언어가 바뀌면 이 콜백을 새로 만든다.
    void activeLanguage;
    void learnCourse;
    setWordsLoading(true);
    setLoadFailed(false);
    // 범위를 바꾸기 전에 지금까지 본 것을 넘긴다
    flushSeen();
    setStudyPhase("browse");
    setRecallOfferVisible(false);
    setRecallWord(null);
    setRecallAnswer("");
    setRecallStatus("idle");
    setRecallHintVisible(false);
    setKeyboardVisible(false);
    setPendingRecallWordIds([]);
    setViewedWordIds([]);
    setPracticedWordIds([]);
    setCompletedRecall(false);
    sessionExitingRef.current = false;
    lastRecalledWordIdRef.current = null;
    recallSaveAttemptRef.current = createRecallSaveAttempt();
    setRecallSaving(false);
    setRecallSaveFailed(false);
    recallHadWrongAttemptRef.current = false;
    recallSolvedRef.current = false;
    setWords([]);
    setCardIndex(0);
    stop();
    translateX.value = 0;
    gestureLocked.value = 0;

    try {
      const all =
        collectionScope && params.collectionId && params.groupId
          ? await WordCollectionsService.getWords(
              params.collectionId,
              params.groupId,
            )
          : await WordService.getUnitWords(section, unit);
      if (request !== wordRequestRef.current) return;
      // 학습 로드 모드는 유닛 단어를 여러 레슨으로 나눠서 전부 훑는다.
      // 서버(lessonSlice)와 같은 규칙으로 잘라야 조각이 어긋나지 않는다.
      const result =
        !collectionScope && studyLessonCount > 1
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
      setLoadedWordScope(activeWordScope);

      // 이어보기: 저장된 카드 번호로 복원 (단어가 줄었으면 마지막 카드로)
      const resumeAt = resumeIndexRef.current;
      resumeIndexRef.current = null;
      if (!resumeConsumedRef.current && resumeAt != null && result.length > 0) {
        resumeConsumedRef.current = true;
        const restoredIndex = getResumeWordIndex(result, {
          cardIndex: resumeAt,
          lastWordId: resumeWordIdRef.current,
        });
        resumeWordIdRef.current = null;
        setCardIndex(restoredIndex);
      }
    } catch {
      if (request === wordRequestRef.current) setLoadFailed(true);
    } finally {
      if (request === wordRequestRef.current) setWordsLoading(false);
    }
  }, [
    activeLanguage,
    activeWordScope,
    learnCourse,
    flushSeen,
    studyLesson,
    studyLessonCount,
    scopeLoading,
    section,
    stop,
    summaries.length,
    collectionScope,
    collection,
    params.collectionId,
    params.groupId,
    translateX,
    gestureLocked,
    unit,
  ]);

  useEffect(() => {
    void loadWords();
    return cancelWordRequest;
  }, [loadWords, cancelWordRequest]);

  const loadedWords = loadedWordScope === activeWordScope ? words : [];
  const currentWord = loadedWords[cardIndex];
  const previousWord = cardIndex > 0 ? loadedWords[cardIndex - 1] : undefined;
  const nextWord =
    cardIndex < loadedWords.length - 1 ? loadedWords[cardIndex + 1] : undefined;
  const hasPendingRecalls = pendingRecallWordIds.length > 0;
  const canGoPrevious =
    !recallSaving && (recallWord ? Boolean(currentWord) : Boolean(previousWord));
  const canGoNext =
    !recallSaving &&
    Boolean(currentWord) &&
    (recallWord
      ? recallStatus === "correct"
      : Boolean(nextWord) ||
        studyPhase === "browse" ||
        (studyPhase === "recall" && hasPendingRecalls));
  const nextPreviewWord = recallWord
    ? recallStatus === "correct"
      ? nextWord
      : undefined
    : nextWord;
  const previousPreviewWord = recallWord ? currentWord : previousWord;
  const currentWordId = currentWord?.id ?? "";
  const currentSpeechText = currentWord
    ? currentWord.pronunciation.ttsText ||
      currentWord.pronunciation.hangul ||
      currentWord.headword
    : "";

  useEffect(() => {
    markSeen(currentWordId);
    if (currentWordId)
      setViewedWordIds((current) =>
        current.includes(currentWordId) ? current : [...current, currentWordId],
      );
    const userId = useAuthStore.getState().user?.id;
    if (userId && currentWord) {
      useAvatarStudyStore.getState().rememberWord({
        userId,
        word: currentWord.headword,
        meaning: currentWord.meaning,
        language: contentLang,
      });
    }
  }, [currentWord, currentWordId, contentLang, markSeen]);

  /**
   * 다음 카드들 음성을 미리 받아 둔다.
   *
   * speak() 한 번에 왕복이 두 번 든다 — /tts/speech 로 audioId 를 받고, 그 URL 을
   * 다시 받아 디코딩한다(useSpeech 주석). 카드를 넘긴 **뒤에** 그게 돌면 한 박자
   * 늦게 읽어주는 것처럼 들린다. 단어 카드는 다음에 나올 말을 이미 알고 있으니
   * 미리 받아 두면 넘기는 즉시 소리가 난다.
   */
  useEffect(() => {
    if (loadedWordScope !== activeWordScope) return;
    const upcoming = words
      .slice(cardIndex, cardIndex + 4)
      .map(
        (w) => w.pronunciation.ttsText || w.pronunciation.hangul || w.headword,
      )
      .filter(Boolean);
    if (upcoming.length)
      prewarm(upcoming, words[cardIndex]?.speechLocale ?? speechLocale);
  }, [
    cardIndex,
    words,
    prewarm,
    speechLocale,
    loadedWordScope,
    activeWordScope,
  ]);

  useEffect(() => {
    if (
      recallWord ||
      !currentWordId ||
      !currentSpeechText ||
      !wordStudyAutoPlay
    ) {
      return;
    }
    speak(currentSpeechText, currentWord?.speechLocale ?? speechLocale);
    return stop;
  }, [
    currentSpeechText,
    currentWordId,
    currentWord?.speechLocale,
    speechLocale,
    recallWord,
    speak,
    stop,
    wordStudyAutoPlay,
  ]);

  const fromStudyPath = !collectionScope && params.from === "studyPath";

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
      }
      setRecallWord(null);
      setRecallAnswer("");
      setRecallStatus("idle");
      setRecallHintVisible(false);
      recallSaveAttemptRef.current = createRecallSaveAttempt();
      setRecallSaving(false);
      setRecallSaveFailed(false);
      recallHadWrongAttemptRef.current = false;
      recallSolvedRef.current = false;
    },
    [recallWord],
  );

  const submitRecall = useCallback(async () => {
    if (
      !recallWord ||
      recallSolvedRef.current ||
      recallSaveAttemptRef.current.pending ||
      recallStatus === "correct" ||
      !recallAnswer.trim()
    ) {
      return;
    }

    const correct = isAnswerCorrect(recallAnswer, recallWord.headword);
    const attempt = recallSaveAttemptRef.current;
    const isActive = () =>
      recallSaveAttemptRef.current === attempt &&
      activeWordScopeRef.current === activeWordScope &&
      recallWordIdRef.current === recallWord.id &&
      screenFocusedRef.current &&
      !sessionExitingRef.current;
    if (!isActive()) return;
    if (!correct) recallHadWrongAttemptRef.current = true;
    setRecallSaving(true);
    setRecallSaveFailed(false);
    try {
      const saved = await saveRecallProgress({
        attempt,
        wordId: recallWord.id,
        correct,
        hadHelp: recallHadWrongAttemptRef.current,
        review: (id, result) => WordService.reviewWord(id, result, learnCourse),
        master: (id) => WordService.masterWord(id, learnCourse),
        isActive,
      });
      if (!saved || !isActive()) return;
    } catch {
      if (isActive()) setRecallSaveFailed(true);
      return;
    } finally {
      if (recallSaveAttemptRef.current === attempt) setRecallSaving(false);
    }

    if (correct) {
      recallSolvedRef.current = true;
      setPracticedWordIds((current) =>
        current.includes(recallWord.id) ? current : [...current, recallWord.id],
      );
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

    setRecallStatus("wrong");
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [activeWordScope, learnCourse, recallAnswer, recallStatus, recallWord]);

  const changeRecallAnswer = useCallback(
    (value: string) => {
      setRecallAnswer(value);
      setRecallSaveFailed(false);
      if (recallStatus === "wrong") setRecallStatus("idle");
    },
    [recallStatus],
  );

  const showRecallHint = useCallback(() => {
    if (!recallWord || recallStatus === "correct" || recallSaveAttemptRef.current.pending)
      return;
    recallHadWrongAttemptRef.current = true;
    setRecallHintVisible(true);
    setRecallStatus("idle");
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [recallStatus, recallWord]);

  const showRecall = useCallback(
    (candidateId?: string) => {
      if (!candidateId) return false;
      const candidate = words.find((word) => word.id === candidateId);
      if (!candidate) return false;

      setPendingRecallWordIds((current) =>
        current.filter((id) => id !== candidate.id),
      );
      lastRecalledWordIdRef.current = candidate.id;
      recallSaveAttemptRef.current = createRecallSaveAttempt();
      setRecallSaving(false);
      setRecallSaveFailed(false);
      recallHadWrongAttemptRef.current = false;
      recallSolvedRef.current = false;
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

  const startRecallPractice = useCallback(() => {
    const wordIds = words.map((word) => word.id);
    const candidateId = pickRecallWordId(
      wordIds,
      currentWord?.id,
      lastRecalledWordIdRef.current,
    );
    if (!candidateId) return;

    setRecallOfferVisible(false);
    setStudyPhase("recall");
    setPendingRecallWordIds(wordIds);
    showRecall(candidateId);
  }, [currentWord?.id, showRecall, words]);

  const skipRecallPractice = useCallback(async () => {
    setRecallOfferVisible(false);
    stop();
    Keyboard.dismiss();
    setCompletedRecall(false);
    setStudyPhase("complete");
    flushSeen();
    await flushCollectionPosition();
  }, [flushCollectionPosition, flushSeen, stop]);

  const commitSwipe = useCallback(
    (direction: -1 | 1) => {
      if (
        !screenFocusedRef.current ||
        sessionExitingRef.current ||
        activeWordScopeRef.current !== activeWordScope
      ) {
        gestureLocked.value = 0;
        return;
      }
      stop();

      if (recallWord) {
        if (direction < 0) {
          // 복습 카드는 앞으로 진행할 때만 보여준다. 뒤로 가면 마지막
          // 일반 카드로 돌아가고, 풀지 않은 문제는 큐에 다시 넣는다.
          clearRecall(true);
        } else if (recallStatus === "correct") {
          const candidateId = pickRecallWordId(
            pendingRecallWordIds,
            currentWord?.id,
            lastRecalledWordIdRef.current,
          );
          if (showRecall(candidateId)) return;

          clearRecall();
          setCompletedRecall(true);
          setStudyPhase("complete");
        }
      } else if (direction > 0 && currentWord) {
        if (studyPhase === "browse") {
          const advance = getWordBrowseAdvance(cardIndex, loadedWords.length);
          if (advance.type === "next") setCardIndex(advance.index);
          else if (advance.type === "offer") {
            setRecallOfferVisible(true);
          }
        } else if (nextWord) {
          setCardIndex((current) => Math.min(words.length - 1, current + 1));
        } else if (studyPhase === "recall") {
          const candidateId = pickRecallWordId(
            pendingRecallWordIds,
            currentWord.id,
            lastRecalledWordIdRef.current,
          );
          if (showRecall(candidateId)) return;
          setCompletedRecall(true);
          setStudyPhase("complete");
        }
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
      clearRecall,
      activeWordScope,
      cardIndex,
      loadedWords.length,
      currentWord,
      gestureLocked,
      nextWord,
      pendingRecallWordIds,
      recallStatus,
      recallWord,
      showRecall,
      stop,
      studyPhase,
      translateX,
      words,
    ],
  );

  const animateCardOut = useCallback(
    (direction: -1 | 1) => {
      if (
        !screenFocusedRef.current ||
        sessionExitingRef.current ||
        gestureLocked.value
      )
        return;
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

  useEffect(() => {
    if (
      !screenFocused ||
      !recallWord ||
      recallStatus !== "correct" ||
      studyPhase !== "recall"
    )
      return;
    const expectedScope = activeWordScope;
    const expectedWordId = recallWord.id;
    const timeout = setTimeout(() => {
      if (
        activeWordScopeRef.current === expectedScope &&
        recallWordIdRef.current === expectedWordId
      )
        animateCardOut(1);
    }, WORD_RECALL_ADVANCE_MS);
    return () => clearTimeout(timeout);
  }, [
    activeWordScope,
    animateCardOut,
    recallStatus,
    recallWord,
    screenFocused,
    studyPhase,
  ]);

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

  const goBack = async () => {
    if (sessionExitingRef.current) return;
    sessionExitingRef.current = true;
    cancelAnimation(translateX);
    stop();
    flushSeen();
    await flushCollectionPosition();
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const finishSession = async () => {
    if (sessionExitingRef.current) return;
    sessionExitingRef.current = true;
    stop();
    flushSeen();
    await flushCollectionPosition();
    if (fromStudyPath) finishStudyPathUnit();
    else if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const openWordLibrary = async () => {
    if (sessionExitingRef.current) return;
    sessionExitingRef.current = true;
    cancelAnimation(translateX);
    stop();
    flushSeen();
    await flushCollectionPosition();
    router.dismissTo({
      pathname: "/word-library",
      params:
        params.collectionId && params.groupId
          ? { collectionId: params.collectionId, groupId: params.groupId }
          : { section: String(section), unit: String(unit) },
    });
  };

  // 보던 지점을 저장한다. 다음 진입 때 여기서 이어간다.
  useEffect(() => {
    if (
      loadedWordScope !== activeWordScope ||
      wordsLoading ||
      words.length === 0 ||
      scopeLoading ||
      params.from === "studyPath" ||
      !section ||
      !unit ||
      (collectionScope && !collection?.id.startsWith("course-"))
    )
      return;
    if (
      (words[0]?.targetLanguage ?? "ko") !==
      useSettingsStore.getState().learnCourse
    )
      return;
    setWordStudyLast({ section, unit, cardIndex, ownerId: userId });
  }, [
    cardIndex,
    section,
    unit,
    words,
    wordsLoading,
    scopeLoading,
    params.from,
    collectionScope,
    collection,
    loadedWordScope,
    activeWordScope,
    userId,
    setWordStudyLast,
  ]);

  useEffect(() => {
    if (
      loadedWordScope !== activeWordScope ||
      !collectionScope ||
      !collection ||
      !params.groupId ||
      wordsLoading ||
      scopeLoading ||
      !words[cardIndex]
    )
      return;
    pendingPositionRef.current = {
      id: collection.id,
      course: learnCourse,
      userId,
      position: {
        groupId: params.groupId,
        cardIndex,
        lastWordId: words[cardIndex]!.id,
      },
    };
    const timeout = setTimeout(() => {
      void flushCollectionPosition();
    }, 400);
    return () => clearTimeout(timeout);
  }, [
    collectionScope,
    collection,
    params.groupId,
    wordsLoading,
    scopeLoading,
    words,
    cardIndex,
    learnCourse,
    userId,
    loadedWordScope,
    activeWordScope,
    flushCollectionPosition,
  ]);

  const progress = words.length > 0 ? (cardIndex + 1) / words.length : 0;
  const rangeLabel = collection
    ? `${collection.title} · ${collection.groups.find((group) => group.id === params.groupId)?.title || ""}`
    : t("wordStudy.range", { section, unit });

  if (studyPhase === "complete" && loadedWords.length > 0) {
    return (
      <WordStudyCompletion
        isDark={isDark}
        completedRecall={completedRecall}
        viewedCount={viewedWordIds.length}
        practicedCount={practicedWordIds.length}
        words={loadedWords.slice(-3)}
        rangeLabel={rangeLabel}
        onContinue={() => {
          void finishSession();
        }}
        onReviewAgain={() => {
          if (!sessionExitingRef.current) startRecallPractice();
        }}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Boolean(recallWord)}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={10}
          style={[styles.headerButton, { backgroundColor: theme.surface }]}
        >
          <Ionicons name="close" size={23} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleGroup}>
          <Text
            style={[styles.scopeLabel, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            {t("wordStudy.currentRange")}
          </Text>
          <Text
            accessibilityLabel={rangeLabel}
            numberOfLines={2}
            style={[styles.headerTitle, { color: theme.text }]}
          >
            {rangeLabel}
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("wordStudy.change")}
          disabled={scopeLoading}
          onPress={() => {
            void openWordLibrary();
          }}
          style={[styles.changeChip, { backgroundColor: colors.wash }]}
        >
          <Text style={[styles.changeChipText, { color: colors.primary }]}>
            {t("wordStudy.change")}
          </Text>
          <Ionicons name="chevron-down" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {positionFailed && (
        <Text
          accessibilityRole="alert"
          style={[styles.positionWarning, { color: theme.textSecondary }]}
        >
          {t("wordLibrary.positionFailed")}
        </Text>
      )}
      <View style={styles.progressWrap}>
        <View style={styles.progressMeta}>
          <Text style={[styles.counterTotal, { color: theme.textSecondary }]}>
            {recallWord ? t("wordStudy.recallShort") : ""}
          </Text>
          <Text style={[styles.counterTotal, { color: theme.textSecondary }]}>
            {recallWord
              ? practicedWordIds.length
              : loadedWords.length
                ? cardIndex + 1
                : 0}{" "}
            / {loadedWords.length}
          </Text>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.action,
                width:
                  `${Math.max(0, Math.min(1, progress)) * 100}%` as `${number}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Card contents scroll vertically; navigation remains above the safe area. */}
      <View
        style={[
          styles.screenScroll,
          styles.screenContent,
          { paddingBottom: Math.max(insets.bottom, 14) + 10 },
        ]}
      >
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
                  if (summaries.length || collection) void loadWords();
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
                      saving={recallSaving}
                      saveFailed={recallSaveFailed}
                      hintVisible={recallHintVisible}
                      compact={keyboardVisible}
                      isSpeaking={isSpeaking}
                      onChangeAnswer={changeRecallAnswer}
                      onSubmit={() => { void submitRecall(); }}
                      onShowHint={showRecallHint}
                      onSpeak={() =>
                        speak(
                          recallWord.pronunciation.ttsText ||
                            recallWord.pronunciation.hangul ||
                            recallWord.headword,
                          recallWord.speechLocale ?? speechLocale,
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
                          currentWord.speechLocale ?? speechLocale,
                        )
                      }
                    />
                  )}
                </Animated.View>
              </GestureDetector>
            </View>

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
                    backgroundColor: canGoNext ? colors.action : theme.surface,
                    borderColor: canGoNext ? colors.action : theme.border,
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

      <RecallOfferModal
        visible={recallOfferVisible}
        wordCount={words.length}
        theme={theme}
        onClose={() => setRecallOfferVisible(false)}
        onStart={startRecallPractice}
        onSkip={skipRecallPractice}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 0 },
  positionWarning: {
    fontSize: 11,
    lineHeight: 16,
    paddingHorizontal: 18,
    marginBottom: 5,
  },
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
  headerTitleGroup: { flex: 1, minWidth: 0, paddingHorizontal: 12 },
  headerTitle: { fontSize: 13, lineHeight: 18, fontWeight: "800" },
  counterTotal: { fontSize: 12, fontWeight: "700" },
  progressWrap: { paddingHorizontal: 22, paddingBottom: 6 },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
    gap: 10,
  },
  progressTrack: { height: 5, borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 99 },
  screenScroll: { flex: 1, minHeight: 0 },
  screenContent: { paddingHorizontal: 18, paddingTop: 6 },
  scopeLabel: { fontSize: 11, fontWeight: "700", marginBottom: 2 },
  changeChip: {
    minHeight: 44,
    maxWidth: 112,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  changeChipText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    flexShrink: 1,
  },
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
  cardArea: { flex: 1, minHeight: 0 },
  cardFill: { flex: 1, minHeight: 0 },
  cardScroll: { flex: 1, minHeight: 0 },
  cardScrollContent: { flexGrow: 1 },
  deck: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    flex: 1,
    minHeight: 0,
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
  recallSaveMessage: { fontSize: 12, lineHeight: 18, marginTop: 8 },
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
    flexShrink: 0,
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
    flexGrow: 1,
    flexShrink: 0,
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
  swipeHint: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 8,
  },
  swipeHintText: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  recallOfferRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  recallOfferCard: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "90%",
    flexGrow: 0,
    borderRadius: 28,
  },
  recallOfferContent: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 16,
    alignItems: "center",
  },
  recallOfferTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 5,
  },
  recallOfferDescription: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 9,
    marginBottom: 22,
  },
  recallOfferStartButton: {
    width: "100%",
    minHeight: 54,
    borderRadius: 28,
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
  offerClose: {
    width: 44,
    height: 44,
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  offerIllustration: {
    width: 140,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  offerMiniCard: {
    width: 64,
    height: 83,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "8deg" }],
  },
  offerMiniCardBack: {
    position: "absolute",
    transform: [{ translateX: -27 }, { rotate: "-16deg" }],
  },
  offerDot: {
    position: "absolute",
    right: 23,
    bottom: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#11121A99",
  },
});
