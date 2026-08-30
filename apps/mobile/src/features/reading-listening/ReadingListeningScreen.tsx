import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  ActivityIndicator,
  Pressable,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { buildSpokenTimeline } from "@/features/expressions/utils/speech-timing";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { ReadingListeningService } from "@/services/reading-listening.service";
import type {
  LocalizedReadingText,
  ReadingLessonSummary,
  ReadingListeningLesson,
} from "@/types/reading-listening";
import { useSettingsStore } from "@/store/settings.store";
import * as Haptics from "@/utils/haptics";
import { READING_LISTENING_IMAGE_ASSETS } from "./reading-listening.assets";
import {
  localizedReadingText,
  READING_LISTENING_PREVIEW,
  type ReadingLanguage,
  type ReadingPassageParagraph,
  type ReadingVocabularyItem,
} from "./reading-listening.mock";

type StepKey = "read" | "check" | "write" | "vocabulary";
type SpeechTarget = "passage" | "vocabulary" | null;
type IconName = keyof typeof Ionicons.glyphMap;

interface StepDefinition {
  key: StepKey;
  icon: IconName;
}

interface ReadingPalette {
  bg: string;
  surface: string;
  ink: string;
  sub: string;
  line: string;
  sage: string;
  sageDark: string;
  sageSoft: string;
  sageGlow: string;
  cream: string;
  peach: string;
  peachDark: string;
  blueSoft: string;
  blue: string;
  dangerSoft: string;
  danger: string;
}

const STEPS: StepDefinition[] = [
  { key: "read", icon: "book-outline" },
  { key: "check", icon: "checkmark-circle-outline" },
  { key: "write", icon: "create-outline" },
  { key: "vocabulary", icon: "sparkles-outline" },
];

const UI_COPY: Record<
  ReadingLanguage,
  {
    screenTitle: string;
    lesson: string;
    level: string;
    unit: string;
    minutes: string;
    steps: Record<StepKey, string>;
    readEyebrow: string;
    readLead: string;
    listenAll: string;
    stopListening: string;
    fontSize: string;
    highlightedWord: string;
    tapWord: string;
    checkEyebrow: string;
    checkTitle: string;
    checkLead: string;
    explanation: string;
    writeEyebrow: string;
    writeTitle: string;
    writeGuide: string;
    exampleAnswer: string;
    hideExample: string;
    vocabularyEyebrow: string;
    vocabularyTitle: string;
    vocabularyLead: string;
    tapToReveal: string;
    listen: string;
    chooseLesson: string;
    emptyCatalog: string;
    next: string;
    finish: string;
    answered: string;
    showTranslation: string;
    hideTranslation: string;
  }
> = {
  ko: {
    screenTitle: "읽기 · 듣기",
    lesson: "문화 읽기",
    level: "급",
    unit: "과",
    minutes: "분",
    steps: {
      read: "읽어 봅시다",
      check: "읽고 확인해 봅시다",
      write: "써 봅시다",
      vocabulary: "새 어휘를 배워 봅시다",
    },
    readEyebrow: "오늘의 문화 읽기",
    readLead: "서두르지 말고 문장의 흐름을 느끼며 읽어 보세요.",
    listenAll: "전체 지문 듣기",
    stopListening: "듣기 멈추기",
    fontSize: "글자 크기",
    highlightedWord: "선택한 어휘",
    tapWord: "색이 있는 단어를 누르면 뜻을 바로 볼 수 있어요.",
    checkEyebrow: "내용 이해",
    checkTitle: "읽은 내용을 차분히 떠올려 보세요",
    checkLead: "정답을 고르면 바로 근거를 확인할 수 있어요.",
    explanation: "본문에서 찾은 근거",
    writeEyebrow: "나의 문장",
    writeTitle: "읽은 표현으로 내 이야기를 써 보세요",
    writeGuide: "생각을 여는 질문",
    exampleAnswer: "예시 답안 보기",
    hideExample: "예시 답안 닫기",
    vocabularyEyebrow: "핵심 어휘",
    vocabularyTitle: "지문에서 만난 단어를 정리해요",
    vocabularyLead: "카드를 눌러 뜻과 예문을 확인해 보세요.",
    tapToReveal: "눌러서 뜻 보기",
    chooseLesson: "읽을 글 선택",
    emptyCatalog: "아직 불러올 수 있는 읽기 글이 없어요.",
    listen: "발음 듣기",
    next: "다음 단계",
    finish: "학습 마치기",
    answered: "문제 완료",
    showTranslation: "번역 보기",
    hideTranslation: "번역 닫기",
  },
  uz: {
    screenTitle: "O‘qish · tinglash",
    lesson: "Madaniy o‘qish",
    level: "-daraja",
    unit: "-dars",
    minutes: "daq.",
    steps: {
      read: "O‘qib ko‘ramiz",
      check: "Tekshiramiz",
      write: "Yozib ko‘ramiz",
      vocabulary: "Yangi so‘zlar",
    },
    readEyebrow: "Bugungi madaniy matn",
    readLead: "Shoshilmang, gaplar oqimini his qilib o‘qing.",
    listenAll: "Matnni to‘liq tinglash",
    stopListening: "Tinglashni to‘xtatish",
    fontSize: "Matn o‘lchami",
    highlightedWord: "Tanlangan so‘z",
    tapWord: "Rangli so‘zga tegib, ma’nosini darhol ko‘ring.",
    checkEyebrow: "Mazmunni tushunish",
    checkTitle: "O‘qiganlaringizni xotirjam eslang",
    checkLead: "Javobni tanlasangiz, matndagi asosni ko‘rasiz.",
    explanation: "Matndagi asos",
    writeEyebrow: "Mening gaplarim",
    writeTitle: "O‘qigan iboralaringiz bilan o‘z hikoyangizni yozing",
    writeGuide: "Fikrni ochuvchi savollar",
    exampleAnswer: "Namuna javobni ko‘rish",
    hideExample: "Namunani yopish",
    vocabularyEyebrow: "Asosiy so‘zlar",
    vocabularyTitle: "Matnda uchragan so‘zlarni jamlaymiz",
    vocabularyLead: "Ma’no va misolni ko‘rish uchun kartani bosing.",
    tapToReveal: "Ma’nosini ko‘rish",
    chooseLesson: "Matnni tanlash",
    emptyCatalog: "Hozircha o‘qish matnlari mavjud emas.",
    listen: "Talaffuzni tinglash",
    next: "Keyingi bosqich",
    finish: "Darsni tugatish",
    answered: "Bajarildi",
    showTranslation: "Tarjimani ko‘rish",
    hideTranslation: "Tarjimani yopish",
  },
  en: {
    screenTitle: "Reading · listening",
    lesson: "Culture reading",
    level: "Level",
    unit: "Unit",
    minutes: "min",
    steps: {
      read: "Read",
      check: "Check",
      write: "Write",
      vocabulary: "New words",
    },
    readEyebrow: "Today’s culture reading",
    readLead: "Take your time and follow the flow of each sentence.",
    listenAll: "Listen to the full text",
    stopListening: "Stop listening",
    fontSize: "Text size",
    highlightedWord: "Selected word",
    tapWord: "Tap a colored word to see its meaning right away.",
    checkEyebrow: "Comprehension",
    checkTitle: "Gently recall what you just read",
    checkLead: "Choose an answer to see the evidence from the passage.",
    explanation: "Evidence from the passage",
    writeEyebrow: "My sentences",
    writeTitle: "Use the expressions you read to tell your story",
    writeGuide: "Questions to get you started",
    exampleAnswer: "Show an example",
    hideExample: "Hide the example",
    vocabularyEyebrow: "Key vocabulary",
    vocabularyTitle: "Review the words you met in the passage",
    vocabularyLead: "Tap a card to reveal its meaning and example.",
    tapToReveal: "Tap to reveal",
    chooseLesson: "Choose a reading",
    emptyCatalog: "No reading texts are available yet.",
    listen: "Listen",
    next: "Next step",
    finish: "Finish lesson",
    answered: "Complete",
    showTranslation: "Show translation",
    hideTranslation: "Hide translation",
  },
  ru: {
    screenTitle: "Чтение · аудирование",
    lesson: "Культура через чтение",
    level: "уровень",
    unit: "урок",
    minutes: "мин.",
    steps: {
      read: "Читаем",
      check: "Проверяем",
      write: "Пишем",
      vocabulary: "Новые слова",
    },
    readEyebrow: "Сегодняшний текст о культуре",
    readLead: "Не спешите и почувствуйте ход каждой фразы.",
    listenAll: "Прослушать весь текст",
    stopListening: "Остановить",
    fontSize: "Размер текста",
    highlightedWord: "Выбранное слово",
    tapWord: "Нажмите на цветное слово, чтобы увидеть значение.",
    checkEyebrow: "Понимание текста",
    checkTitle: "Спокойно вспомните прочитанное",
    checkLead: "Выберите ответ и сразу увидите основание в тексте.",
    explanation: "Основание в тексте",
    writeEyebrow: "Мои предложения",
    writeTitle: "Расскажите свою историю с выражениями из текста",
    writeGuide: "Вопросы для начала",
    exampleAnswer: "Показать пример",
    hideExample: "Скрыть пример",
    vocabularyEyebrow: "Ключевые слова",
    vocabularyTitle: "Повторим слова из текста",
    vocabularyLead: "Нажмите на карточку, чтобы увидеть значение и пример.",
    tapToReveal: "Показать значение",
    chooseLesson: "Выбрать текст",
    emptyCatalog: "Тексты для чтения пока недоступны.",
    listen: "Слушать",
    next: "Следующий этап",
    finish: "Завершить урок",
    answered: "Готово",
    showTranslation: "Показать перевод",
    hideTranslation: "Скрыть перевод",
  },
};

function readingPalette(isDark: boolean): ReadingPalette {
  return {
    bg: isDark ? "#151B18" : "#F6F5EF",
    surface: isDark ? "#222A26" : "#FFFFFF",
    ink: isDark ? "#F4F7F5" : "#21342C",
    sub: isDark ? "#A7B5AD" : "#6F7E76",
    line: isDark ? "#36433C" : "#E3E7E1",
    sage: "#70A487",
    sageDark: isDark ? "#9CC8AE" : "#37694F",
    sageSoft: isDark ? "#263B31" : "#E8F2EB",
    sageGlow: isDark ? "#385746" : "#CFE4D5",
    cream: isDark ? "#2B2B25" : "#FBF8EE",
    peach: isDark ? "#4A3629" : "#F6E3D2",
    peachDark: isDark ? "#F1C19B" : "#9A5E34",
    blueSoft: isDark ? "#25383E" : "#E9F3F5",
    blue: isDark ? "#9BC8D2" : "#397D8B",
    dangerSoft: isDark ? "#482E30" : "#FBEAEC",
    danger: isDark ? "#F1A9AE" : "#B95660",
  };
}

interface SpokenWordRange {
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
}

interface PositionedPassageSegment {
  key: string;
  text: string;
  vocabularyId?: string;
  startIndex: number;
}

const SPOKEN_WORD_SPLIT = /(\s+|[.!?…,·~;:“”"'‘’()[\]{}]+)/u;

function buildSpokenWordRanges(text: string): SpokenWordRange[] {
  const timeline = buildSpokenTimeline(text);
  if (!timeline.length) return [];

  let charIndex = 0;
  return text
    .split(SPOKEN_WORD_SPLIT)
    .filter(Boolean)
    .map((part) => {
      const length = Array.from(part).length;
      const first = timeline[charIndex];
      const last = timeline[charIndex + length - 1];
      const range = {
        start: first?.start ?? 0,
        end: last?.end ?? first?.end ?? 0,
        startIndex: charIndex,
        endIndex: charIndex + length,
        voiced: timeline
          .slice(charIndex, charIndex + length)
          .some((segment) => segment.voiced),
      };
      charIndex += length;
      return range;
    })
    .filter((range) => range.voiced)
    .map((range) => ({
      start: range.start,
      end: range.end,
      startIndex: range.startIndex,
      endIndex: range.endIndex,
    }));
}

function splitPassageSegment(
  segment: PositionedPassageSegment,
  activeRange: SpokenWordRange | null,
) {
  if (!activeRange) return [{ text: segment.text, active: false }];

  const chars = Array.from(segment.text);
  const segmentEnd = segment.startIndex + chars.length;
  const overlapStart = Math.max(segment.startIndex, activeRange.startIndex);
  const overlapEnd = Math.min(segmentEnd, activeRange.endIndex);
  if (overlapStart >= overlapEnd) {
    return [{ text: segment.text, active: false }];
  }

  const localStart = overlapStart - segment.startIndex;
  const localEnd = overlapEnd - segment.startIndex;
  return [
    { text: chars.slice(0, localStart).join(""), active: false },
    { text: chars.slice(localStart, localEnd).join(""), active: true },
    { text: chars.slice(localEnd).join(""), active: false },
  ].filter((part) => part.text.length > 0);
}

function Passage({
  paragraphs,
  passageText,
  activeWordId,
  onWordPress,
  fontSize,
  palette,
  speechPlaying,
  speechProgress,
}: {
  paragraphs: ReadingPassageParagraph[];
  passageText: string;
  activeWordId: string | null;
  onWordPress: (id: string) => void;
  fontSize: number;
  palette: ReadingPalette;
  speechPlaying: boolean;
  speechProgress: number;
}) {
  const positionedParagraphs = useMemo(() => {
    let charIndex = 0;
    return paragraphs.map((paragraph, paragraphIndex) => {
      const segments = paragraph.segments.map((segment, segmentIndex) => {
        const positioned: PositionedPassageSegment = {
          key: `${paragraph.id}-${segmentIndex}`,
          text: segment.text,
          vocabularyId: segment.vocabularyId,
          startIndex: charIndex,
        };
        charIndex += Array.from(segment.text).length;
        return positioned;
      });
      if (paragraphIndex < paragraphs.length - 1) charIndex += 2;
      return { id: paragraph.id, segments };
    });
  }, [paragraphs]);
  const wordRanges = useMemo(
    () => buildSpokenWordRanges(passageText),
    [passageText],
  );
  const activeSpeechRange = useMemo(() => {
    if (!speechPlaying || !wordRanges.length) return null;
    const lead = 0.32 / wordRanges.length;
    const progress = Math.min(1, speechProgress + lead);
    return (
      wordRanges.find(
        (range) => progress >= range.start && progress < range.end,
      ) ?? null
    );
  }, [speechPlaying, speechProgress, wordRanges]);

  return (
    <View style={styles.passageBody}>
      {positionedParagraphs.map((paragraph, paragraphIndex) => (
        <Text
          key={paragraph.id}
          style={[
            styles.paragraph,
            {
              color: palette.ink,
              fontSize,
              lineHeight: Math.round(fontSize * 1.78),
              marginTop: paragraphIndex === 0 ? 0 : 23,
            },
          ]}
        >
          {paragraph.segments.map((segment) => {
            const content = splitPassageSegment(
              segment,
              activeSpeechRange,
            ).map((part, partIndex) => (
              <Text
                key={`${segment.key}-part-${partIndex}`}
                style={
                  part.active
                    ? { color: palette.peachDark, fontWeight: "900" }
                    : undefined
                }
              >
                {part.text}
              </Text>
            ));

            return segment.vocabularyId ? (
              <Text
                key={segment.key}
                accessibilityRole="button"
                onPress={() => onWordPress(segment.vocabularyId!)}
                style={[
                  styles.vocabularyHighlight,
                  {
                    color: palette.sageDark,
                    fontWeight:
                      activeWordId === segment.vocabularyId ? "900" : "700",
                  },
                ]}
              >
                {content}
              </Text>
            ) : (
              <Text key={segment.key}>{content}</Text>
            );
          })}
        </Text>
      ))}
    </View>
  );
}

function Eyebrow({
  icon,
  children,
  palette,
}: {
  icon: IconName;
  children: string;
  palette: ReadingPalette;
}) {
  return (
    <View style={styles.eyebrowRow}>
      <View style={[styles.eyebrowIcon, { backgroundColor: palette.sageSoft }]}>
        <Ionicons name={icon} size={14} color={palette.sageDark} />
      </View>
      <Text style={[styles.eyebrow, { color: palette.sageDark }]}>
        {children}
      </Text>
    </View>
  );
}

function hasReadingTranslation(
  value: LocalizedReadingText,
  language: ReadingLanguage,
) {
  if (language === "ko") return false;
  const translated = value[language]?.trim();
  return Boolean(translated && translated !== value.ko.trim());
}

export default function ReadingListeningScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const language = useSettingsStore((state) => state.language);
  const normalizedLanguage = (
    ["ko", "uz", "en", "ru"].includes(language) ? language : "uz"
  ) as ReadingLanguage;
  const copy = UI_COPY[normalizedLanguage];
  const isDark = theme.bg !== "#ffffff";
  const palette = useMemo(() => readingPalette(isDark), [isDark]);
  const localStyles = useMemo(() => createLocalStyles(palette), [palette]);
  const [lesson, setLesson] = useState<ReadingListeningLesson>(
    READING_LISTENING_PREVIEW,
  );
  const scrollRef = useRef<ScrollView>(null);
  const { speak, stop, isSpeaking, isSpeechPlaying, speechProgress } =
    useSpeech();
  const [speechTarget, setSpeechTarget] = useState<SpeechTarget>(null);
  const isPassageSpeaking = isSpeaking && speechTarget === "passage";
  const isPassageSpeechPlaying =
    isSpeechPlaying && speechTarget === "passage";

  const [stepIndex, setStepIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(1);
  const [activeVocabularyId, setActiveVocabularyId] = useState<string | null>(
    null,
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [writing, setWriting] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [revealedVocabulary, setRevealedVocabulary] = useState<string[]>([]);
  const [translatedQuestionIds, setTranslatedQuestionIds] = useState<string[]>(
    [],
  );
  const [showWritingTranslation, setShowWritingTranslation] = useState(false);
  const [lessonOptions, setLessonOptions] = useState<ReadingLessonSummary[]>([]);
  const [isLessonPickerOpen, setIsLessonPickerOpen] = useState(false);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [isLessonLoading, setIsLessonLoading] = useState(false);


  const passageText = useMemo(
    () =>
      lesson.passage
        .map((paragraph) =>
          paragraph.segments.map((segment) => segment.text).join(""),
        )
        .join("\n\n"),
    [lesson.passage],
  );
  const activeVocabulary = lesson.vocabulary.find(
    (item) => item.id === activeVocabularyId,
  );
  const answeredCount = Object.keys(answers).length;
  const fontSize = [14, 15.5, 17][fontIndex] ?? 15.5;
  const lessonImageSource = lesson.media.imageUrl?.trim()
    ? { uri: lesson.media.imageUrl.trim() }
    : lesson.media.imageAssetKey
      ? READING_LISTENING_IMAGE_ASSETS[lesson.media.imageAssetKey]
      : READING_LISTENING_IMAGE_ASSETS["library-reading-preview"];
  const canShowWritingTranslation = hasReadingTranslation(
    lesson.writing.prompt,
    normalizedLanguage,
  );

  useEffect(() => stop, [stop]);

  useEffect(() => {
    let mounted = true;

    const loadCatalog = async () => {
      try {
        const catalog = await ReadingListeningService.list(1);
        if (!mounted) return;
        setLessonOptions(catalog.items);

        const firstLesson = catalog.items[0];
        if (!firstLesson) return;

        const detail = await ReadingListeningService.get(firstLesson.code);
        if (mounted) setLesson(detail);
      } catch {
        if (mounted) setLesson(READING_LISTENING_PREVIEW);
      } finally {
        if (mounted) setIsCatalogLoading(false);
      }
    };

    void loadCatalog();
    return () => {
      mounted = false;
    };
  }, []);

  const resetLessonState = () => {
    stop();
    setStepIndex(0);
    setActiveVocabularyId(null);
    setAnswers({});
    setWriting("");
    setShowExample(false);
    setRevealedVocabulary([]);
    setTranslatedQuestionIds([]);
    setShowWritingTranslation(false);
  };

  const chooseLesson = async (item: ReadingLessonSummary) => {
    setIsLessonPickerOpen(false);
    if (item.code === lesson.code || isLessonLoading) return;

    setIsLessonLoading(true);
    resetLessonState();
    try {
      const detail = await ReadingListeningService.get(item.code);
      setLesson(detail);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      void Haptics.selectionAsync();
    } catch {
      setIsLessonPickerOpen(true);
    } finally {
      setIsLessonLoading(false);
    }
  };

  const goBack = () => {
    stop();
    if (router.canGoBack()) router.back();
    else router.replace("/course-categories");
  };

  const selectStep = (index: number) => {
    if (index === stepIndex) return;
    stop();
    setStepIndex(index);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    void Haptics.selectionAsync();
  };

  const continueLesson = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (stepIndex < STEPS.length - 1) {
      selectStep(stepIndex + 1);
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    goBack();
  };

  const togglePassageSpeech = () => {
    if (isPassageSpeaking) {
      stop();
      setSpeechTarget(null);
      return;
    }
    speak(passageText, "ko-KR", {
      onDone: () => setSpeechTarget(null),
      onError: () => setSpeechTarget(null),
      onStopped: () => setSpeechTarget(null),
    });
    setSpeechTarget("passage");
  };

  const speakVocabulary = (word: string) => {
    speak(word, "ko-KR", {
      onDone: () => setSpeechTarget(null),
      onError: () => setSpeechTarget(null),
      onStopped: () => setSpeechTarget(null),
    });
    setSpeechTarget("vocabulary");
  };

  const selectVocabulary = (item: ReadingVocabularyItem) => {
    setActiveVocabularyId(item.id);
    void Haptics.selectionAsync();
  };

  return (
    <View
      style={[
        localStyles.screen,
        { paddingTop: insets.top, backgroundColor: palette.bg },
      ]}
    >
      <View style={localStyles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={goBack}
          activeOpacity={0.78}
          style={localStyles.closeButton}
        >
          <Ionicons name="close" size={23} color={palette.ink} />
        </TouchableOpacity>

        <View style={styles.headerCopy}>
          <Text style={[styles.headerEyebrow, { color: palette.sageDark }]}>
            {copy.lesson} · {lesson.level}
            {copy.level}
          </Text>
          <Text style={[styles.headerTitle, { color: palette.ink }]}>
            {copy.screenTitle}
          </Text>
        </View>

        <View
          style={[styles.stepCounter, { backgroundColor: palette.sageSoft }]}
        >
          <Text style={[styles.stepCounterText, { color: palette.sageDark }]}>
            {stepIndex + 1}
            <Text style={styles.stepCounterSmall}> / {STEPS.length}</Text>
          </Text>
        </View>
      </View>

      <View style={[styles.progressTrack, { backgroundColor: palette.line }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: palette.sage,
              width: `${((stepIndex + 1) / STEPS.length) * 100}%`,
            },
          ]}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stepRail}
        style={styles.stepRailScroll}
      >
        {STEPS.map((step, index) => {
          const selected = index === stepIndex;
          const completed = index < stepIndex;
          return (
            <Pressable
              key={step.key}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => selectStep(index)}
              style={[
                localStyles.stepPill,
                selected && {
                  backgroundColor: palette.sageDark,
                  borderColor: palette.sageDark,
                },
              ]}
            >
              <Ionicons
                name={completed ? "checkmark" : step.icon}
                size={15}
                color={selected ? "#FFFFFF" : palette.sageDark}
              />
              <Text
                style={[
                  styles.stepPillText,
                  { color: selected ? "#FFFFFF" : palette.ink },
                ]}
              >
                {copy.steps[step.key]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 14) + 28 },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.chooseLesson}
          onPress={() => setIsLessonPickerOpen(true)}
          style={({ pressed }) => [
            styles.lessonSelector,
            {
              backgroundColor: palette.surface,
              borderColor: palette.line,
              opacity: pressed ? 0.88 : 1,
            },
          ]}
        >
          <View
            style={[
              styles.lessonSelectorIcon,
              { backgroundColor: palette.sageSoft },
            ]}
          >
            <Ionicons name="library-outline" size={21} color={palette.sageDark} />
          </View>
          <View style={styles.lessonSelectorCopy}>
            <Text
              style={[styles.lessonSelectorLabel, { color: palette.sageDark }]}
            >
              {copy.chooseLesson}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.lessonSelectorTitle, { color: palette.ink }]}
            >
              {String(lesson.unit).padStart(2, "0")}. {lesson.title}
            </Text>
          </View>
          {isCatalogLoading || isLessonLoading ? (
            <ActivityIndicator size="small" color={palette.sageDark} />
          ) : (
            <View
              style={[
                styles.lessonSelectorChevron,
                { backgroundColor: palette.sageSoft },
              ]}
            >
              <Ionicons name="chevron-down" size={18} color={palette.sageDark} />
            </View>
          )}
        </Pressable>

        {stepIndex === 0 ? (
          <Animated.View key="read" entering={FadeIn.duration(260)}>
            <View
              style={[
                styles.hero,
                {
                  backgroundColor: isDark ? "#203229" : "#E8F1E8",
                },
              ]}
            >
              {lessonImageSource ? (
                <View style={styles.heroImageWrap}>
                  <Image
                    source={lessonImageSource}
                    contentFit="cover"
                    transition={180}
                    accessibilityLabel={localizedReadingText(
                      lesson.media.imageAlt,
                      normalizedLanguage,
                    )}
                    style={styles.heroImage}
                  />
                  <LinearGradient
                    colors={[
                      "rgba(15, 34, 25, 0.04)",
                      "rgba(15, 34, 25, 0.62)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.heroImageShade}
                  />
                  <View style={styles.heroMetaOverlay}>
                    <View style={styles.heroBadge}>
                      <Text style={styles.heroBadgeText}>
                        {String(lesson.unit).padStart(2, "0")} {copy.unit}
                      </Text>
                    </View>
                    <View style={styles.heroTime}>
                      <Ionicons name="time-outline" size={15} color="#244234" />
                      <Text style={styles.heroTimeText}>
                        {lesson.estimatedMinutes} {copy.minutes}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}

              <LinearGradient
                colors={
                  isDark ? ["#233A30", "#1E3029"] : ["#E6F1E5", "#F5F6EC"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroCopy}
              >
                <Text style={[styles.heroEyebrow, { color: palette.sageDark }]}>
                  {copy.readEyebrow}
                </Text>
                <Text style={[styles.heroTitle, { color: palette.ink }]}>
                  {lesson.title}
                </Text>
                <Text style={[styles.heroTopic, { color: palette.sub }]}>
                  {localizedReadingText(lesson.topic, normalizedLanguage)}
                </Text>
                <Text style={[styles.heroLead, { color: palette.sageDark }]}>
                  {copy.readLead}
                </Text>
              </LinearGradient>
            </View>

            <Animated.View
              entering={FadeInDown.delay(80).duration(360)}
              style={localStyles.readingCard}
            >
              <View style={styles.readingToolbar}>
                <Pressable
                  accessibilityRole="button"
                  onPress={togglePassageSpeech}
                  style={[
                    styles.audioButton,
                    {
                      backgroundColor: isPassageSpeaking
                        ? palette.sageDark
                        : palette.sageSoft,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.audioIcon,
                      {
                        backgroundColor: isPassageSpeaking
                          ? "rgba(255,255,255,0.18)"
                          : palette.surface,
                      },
                    ]}
                  >
                    <Ionicons
                      name={
                        isPassageSpeaking ? "stop" : "volume-high-outline"
                      }
                      size={21}
                      color={
                        isPassageSpeaking ? "#FFFFFF" : palette.sageDark
                      }
                    />
                  </View>
                  <View style={styles.audioCopy}>
                    <Text
                      style={[
                        styles.audioTitle,
                        {
                          color: isPassageSpeaking ? "#FFFFFF" : palette.ink,
                        },
                      ]}
                    >
                      {isPassageSpeaking ? copy.stopListening : copy.listenAll}
                    </Text>
                    <View
                      style={[
                        styles.audioTrack,
                        {
                          backgroundColor: isPassageSpeaking
                            ? "rgba(255,255,255,0.24)"
                            : palette.line,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.audioProgress,
                          {
                            width: `${
                              isPassageSpeechPlaying ? speechProgress * 100 : 0
                            }%`,
                            backgroundColor: isPassageSpeaking
                              ? "#FFFFFF"
                              : palette.sage,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </Pressable>

                <View
                  style={[styles.fontControl, { borderColor: palette.line }]}
                >
                  <Text style={[styles.fontLabel, { color: palette.sub }]}>
                    Aa
                  </Text>
                  <View style={styles.fontSizeButtons}>
                    {[0, 1, 2].map((sizeIndex) => {
                      const selected = sizeIndex === fontIndex;
                      const dotSize = 7 + sizeIndex * 2;

                      return (
                        <Pressable
                          key={sizeIndex}
                          accessibilityRole="button"
                          accessibilityLabel={`${copy.fontSize} ${sizeIndex + 1}`}
                          accessibilityState={{ selected }}
                          hitSlop={5}
                          onPress={() => {
                            setFontIndex(sizeIndex);
                            void Haptics.selectionAsync();
                          }}
                          style={({ pressed }) => [
                            styles.fontSizeButton,
                            {
                              backgroundColor: selected
                                ? palette.sageSoft
                                : pressed
                                  ? palette.cream
                                  : "transparent",
                              opacity: pressed ? 0.72 : 1,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.fontDot,
                              {
                                backgroundColor: selected
                                  ? palette.sageDark
                                  : palette.line,
                                width: dotSize,
                                height: dotSize,
                                borderRadius: dotSize / 2,
                              },
                            ]}
                          />
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.readingDivider,
                  { backgroundColor: palette.line },
                ]}
              />
              <Passage
                paragraphs={lesson.passage}
                passageText={passageText}
                speechPlaying={isPassageSpeechPlaying}
                speechProgress={speechProgress}
                activeWordId={activeVocabularyId}
                onWordPress={(id) => {
                  const vocabulary = lesson.vocabulary.find(
                    (item) => item.id === id,
                  );
                  if (vocabulary) selectVocabulary(vocabulary);
                }}
                fontSize={fontSize}
                palette={palette}
              />

              <View
                style={[styles.wordHint, { backgroundColor: palette.cream }]}
              >
                <Ionicons
                  name="hand-left-outline"
                  size={18}
                  color={palette.peachDark}
                />
                <Text style={[styles.wordHintText, { color: palette.sub }]}>
                  {copy.tapWord}
                </Text>
              </View>

              {activeVocabulary ? (
                <Animated.View
                  key={activeVocabulary.id}
                  entering={FadeInDown.duration(220)}
                  style={[
                    styles.selectedWordCard,
                    {
                      backgroundColor: palette.sageSoft,
                      borderColor: palette.sageGlow,
                    },
                  ]}
                >
                  <View style={styles.selectedWordTop}>
                    <View style={styles.selectedWordCopy}>
                      <Text
                        style={[
                          styles.selectedWordLabel,
                          { color: palette.sageDark },
                        ]}
                      >
                        {copy.highlightedWord}
                      </Text>
                      <View style={styles.selectedWordTitleRow}>
                        <Text
                          style={[
                            styles.selectedWordTitle,
                            { color: palette.ink },
                          ]}
                        >
                          {activeVocabulary.word}
                        </Text>
                        {activeVocabulary.pronunciation ? (
                          <Text
                            style={[
                              styles.selectedWordPronunciation,
                              { color: palette.sub },
                            ]}
                          >
                            {activeVocabulary.pronunciation}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={copy.listen}
                      onPress={() => speakVocabulary(activeVocabulary.word)}
                      style={[
                        styles.smallSpeaker,
                        { backgroundColor: palette.surface },
                      ]}
                    >
                      <Ionicons
                        name="volume-medium"
                        size={20}
                        color={palette.sageDark}
                      />
                    </Pressable>
                  </View>
                  <Text
                    style={[styles.selectedWordMeaning, { color: palette.ink }]}
                  >
                    {localizedReadingText(
                      activeVocabulary.meaning,
                      normalizedLanguage,
                    )}
                  </Text>
                </Animated.View>
              ) : null}
            </Animated.View>
          </Animated.View>
        ) : null}

        {stepIndex === 1 ? (
          <Animated.View key="check" entering={FadeIn.duration(260)}>
            <View style={styles.sectionIntro}>
              <Eyebrow icon="checkmark-done-outline" palette={palette}>
                {copy.checkEyebrow}
              </Eyebrow>
              <Text style={[styles.sectionTitle, { color: palette.ink }]}>
                {copy.checkTitle}
              </Text>
              <Text style={[styles.sectionLead, { color: palette.sub }]}>
                {copy.checkLead}
              </Text>
              <View
                style={[
                  styles.completionChip,
                  { backgroundColor: palette.sageSoft },
                ]}
              >
                <Ionicons
                  name="leaf-outline"
                  size={15}
                  color={palette.sageDark}
                />
                <Text
                  style={[styles.completionText, { color: palette.sageDark }]}
                >
                  {answeredCount} / {lesson.questions.length} {copy.answered}
                </Text>
              </View>
            </View>

            {lesson.questions.map((question, questionIndex) => {
              const selectedAnswer = answers[question.id];
              const canShowQuestionTranslation = hasReadingTranslation(
                question.prompt,
                normalizedLanguage,
              );
              const translationVisible =
                canShowQuestionTranslation &&
                translatedQuestionIds.includes(question.id);
              return (
                <Animated.View
                  key={question.id}
                  entering={FadeInDown.delay(questionIndex * 80).duration(320)}
                  style={localStyles.questionCard}
                >
                  <View style={styles.questionHeader}>
                    <View
                      style={[
                        styles.questionNumber,
                        { backgroundColor: palette.sageDark },
                      ]}
                    >
                      <Text style={styles.questionNumberText}>
                        {questionIndex + 1}
                      </Text>
                    </View>
                    <Text
                      style={[styles.questionPrompt, { color: palette.ink }]}
                    >
                      {question.prompt.ko}
                    </Text>
                  </View>

                  {canShowQuestionTranslation ? (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ expanded: translationVisible }}
                      onPress={() => {
                        setTranslatedQuestionIds((current) =>
                          current.includes(question.id)
                            ? current.filter((id) => id !== question.id)
                            : [...current, question.id],
                        );
                        void Haptics.selectionAsync();
                      }}
                      style={[
                        styles.translationButton,
                        styles.questionTranslationButton,
                      ]}
                    >
                      <Ionicons
                        name="language-outline"
                        size={15}
                        color={palette.sageDark}
                      />
                      <Text
                        style={[
                          styles.translationButtonText,
                          { color: palette.sageDark },
                        ]}
                      >
                        {translationVisible
                          ? copy.hideTranslation
                          : copy.showTranslation}
                      </Text>
                      <Ionicons
                        name={
                          translationVisible ? "chevron-up" : "chevron-down"
                        }
                        size={14}
                        color={palette.sub}
                      />
                    </Pressable>
                  ) : null}

                  {translationVisible ? (
                    <Animated.View
                      entering={FadeInDown.duration(180)}
                      style={[
                        styles.translationPanel,
                        { backgroundColor: palette.blueSoft },
                      ]}
                    >
                      <Text
                        style={[
                          styles.translationPrompt,
                          { color: palette.ink },
                        ]}
                      >
                        {localizedReadingText(
                          question.prompt,
                          normalizedLanguage,
                        )}
                      </Text>
                    </Animated.View>
                  ) : null}

                  <View style={styles.optionList}>
                    {question.options.map((option, optionIndex) => {
                      const selected = selectedAnswer === optionIndex;
                      const correct = optionIndex === question.answerIndex;
                      const answered = selectedAnswer !== undefined;
                      const stateColor =
                        answered && correct
                          ? palette.sageDark
                          : selected && !correct
                            ? palette.danger
                            : palette.line;
                      const stateBg =
                        answered && correct
                          ? palette.sageSoft
                          : selected && !correct
                            ? palette.dangerSoft
                            : palette.surface;
                      return (
                        <Pressable
                          key={`${question.id}-${optionIndex}`}
                          onPress={() => {
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: optionIndex,
                            }));
                            void Haptics.selectionAsync();
                          }}
                          style={[
                            styles.option,
                            {
                              borderColor: stateColor,
                              backgroundColor: stateBg,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.optionMarker,
                              { borderColor: stateColor },
                            ]}
                          >
                            {answered && correct ? (
                              <Ionicons
                                name="checkmark"
                                size={15}
                                color={palette.sageDark}
                              />
                            ) : selected ? (
                              <View
                                style={[
                                  styles.optionMarkerDot,
                                  { backgroundColor: stateColor },
                                ]}
                              />
                            ) : null}
                          </View>
                          <View style={styles.optionCopy}>
                            <Text
                              style={[
                                styles.optionText,
                                { color: palette.ink },
                              ]}
                            >
                              {option.ko}
                            </Text>
                            {translationVisible ? (
                              <Text
                                style={[
                                  styles.optionTranslation,
                                  { color: palette.sub },
                                ]}
                              >
                                {localizedReadingText(
                                  option,
                                  normalizedLanguage,
                                )}
                              </Text>
                            ) : null}
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>

                  {selectedAnswer !== undefined ? (
                    <Animated.View
                      entering={FadeInDown.duration(220)}
                      style={[
                        styles.explanationBox,
                        { backgroundColor: palette.cream },
                      ]}
                    >
                      <View style={styles.explanationTitleRow}>
                        <Ionicons
                          name="search-outline"
                          size={16}
                          color={palette.peachDark}
                        />
                        <Text
                          style={[
                            styles.explanationTitle,
                            { color: palette.peachDark },
                          ]}
                        >
                          {copy.explanation}
                        </Text>
                      </View>
                      <Text
                        style={[styles.explanationText, { color: palette.ink }]}
                      >
                        {question.explanation.ko}
                      </Text>
                      {translationVisible &&
                      hasReadingTranslation(
                        question.explanation,
                        normalizedLanguage,
                      ) ? (
                        <Text
                          style={[
                            styles.explanationTranslation,
                            { color: palette.sub },
                          ]}
                        >
                          {localizedReadingText(
                            question.explanation,
                            normalizedLanguage,
                          )}
                        </Text>
                      ) : null}
                    </Animated.View>
                  ) : null}
                </Animated.View>
              );
            })}
          </Animated.View>
        ) : null}

        {stepIndex === 2 ? (
          <Animated.View key="write" entering={FadeIn.duration(260)}>
            <View style={styles.sectionIntro}>
              <Eyebrow icon="pencil-outline" palette={palette}>
                {copy.writeEyebrow}
              </Eyebrow>
              <Text style={[styles.sectionTitle, { color: palette.ink }]}>
                {copy.writeTitle}
              </Text>
            </View>

            <View style={localStyles.writingCard}>
              <LinearGradient
                colors={
                  isDark ? ["#3F3026", "#312A24"] : ["#F8E7D8", "#FBF3E8"]
                }
                style={styles.writingPrompt}
              >
                <View
                  style={[
                    styles.writingPromptIcon,
                    { backgroundColor: palette.surface },
                  ]}
                >
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={22}
                    color={palette.peachDark}
                  />
                </View>
                <Text
                  style={[styles.writingPromptText, { color: palette.ink }]}
                >
                  {lesson.writing.prompt.ko}
                </Text>
              </LinearGradient>

              {canShowWritingTranslation ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: showWritingTranslation }}
                  onPress={() => {
                    setShowWritingTranslation((current) => !current);
                    void Haptics.selectionAsync();
                  }}
                  style={styles.translationButton}
                >
                  <Ionicons
                    name="language-outline"
                    size={15}
                    color={palette.sageDark}
                  />
                  <Text
                    style={[
                      styles.translationButtonText,
                      { color: palette.sageDark },
                    ]}
                  >
                    {showWritingTranslation
                      ? copy.hideTranslation
                      : copy.showTranslation}
                  </Text>
                  <Ionicons
                    name={
                      showWritingTranslation ? "chevron-up" : "chevron-down"
                    }
                    size={14}
                    color={palette.sub}
                  />
                </Pressable>
              ) : null}

              {canShowWritingTranslation && showWritingTranslation ? (
                <Animated.View
                  entering={FadeInDown.duration(180)}
                  style={[
                    styles.writingTranslationPanel,
                    { backgroundColor: palette.blueSoft },
                  ]}
                >
                  <Text
                    style={[styles.translationPrompt, { color: palette.ink }]}
                  >
                    {localizedReadingText(
                      lesson.writing.prompt,
                      normalizedLanguage,
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.writingTranslationHelper,
                      { color: palette.sub },
                    ]}
                  >
                    {localizedReadingText(
                      lesson.writing.helper,
                      normalizedLanguage,
                    )}
                  </Text>
                </Animated.View>
              ) : null}

              <View
                style={[styles.guideBox, { backgroundColor: palette.blueSoft }]}
              >
                <Text style={[styles.guideLabel, { color: palette.blue }]}>
                  {copy.writeGuide}
                </Text>
                <Text style={[styles.guideText, { color: palette.ink }]}>
                  {lesson.writing.helper.ko}
                </Text>
              </View>

              <View style={styles.keywordRow}>
                {lesson.writing.keywords.map((keyword) => (
                  <Pressable
                    key={keyword}
                    onPress={() =>
                      setWriting((current) =>
                        current ? `${current} ${keyword}` : keyword,
                      )
                    }
                    style={[
                      styles.keywordChip,
                      { backgroundColor: palette.sageSoft },
                    ]}
                  >
                    <Text
                      style={[styles.keywordText, { color: palette.sageDark }]}
                    >
                      + {keyword}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View
                style={[
                  styles.inputShell,
                  { borderColor: palette.line, backgroundColor: palette.bg },
                ]}
              >
                <TextInput
                  multiline
                  value={writing}
                  onChangeText={setWriting}
                  placeholder={lesson.writing.placeholder.ko}
                  placeholderTextColor={palette.sub}
                  textAlignVertical="top"
                  style={[styles.writingInput, { color: palette.ink }]}
                />
                <Text style={[styles.characterCount, { color: palette.sub }]}>
                  {writing.length}
                </Text>
              </View>

              <Pressable
                onPress={() => setShowExample((current) => !current)}
                style={[styles.exampleToggle, { borderColor: palette.line }]}
              >
                <Ionicons
                  name={showExample ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={palette.sageDark}
                />
                <Text
                  style={[
                    styles.exampleToggleText,
                    { color: palette.sageDark },
                  ]}
                >
                  {showExample ? copy.hideExample : copy.exampleAnswer}
                </Text>
                <Ionicons
                  name={showExample ? "chevron-up" : "chevron-down"}
                  size={17}
                  color={palette.sub}
                />
              </Pressable>

              {showExample ? (
                <Animated.View
                  entering={FadeInDown.duration(220)}
                  style={[
                    styles.exampleAnswer,
                    { backgroundColor: palette.cream },
                  ]}
                >
                  <Text
                    style={[styles.exampleAnswerText, { color: palette.ink }]}
                  >
                    {lesson.writing.exampleAnswer}
                  </Text>
                </Animated.View>
              ) : null}
            </View>
          </Animated.View>
        ) : null}

        {stepIndex === 3 ? (
          <Animated.View key="vocabulary" entering={FadeIn.duration(260)}>
            <View style={styles.sectionIntro}>
              <Eyebrow icon="sparkles-outline" palette={palette}>
                {copy.vocabularyEyebrow}
              </Eyebrow>
              <Text style={[styles.sectionTitle, { color: palette.ink }]}>
                {copy.vocabularyTitle}
              </Text>
              <Text style={[styles.sectionLead, { color: palette.sub }]}>
                {copy.vocabularyLead}
              </Text>
            </View>

            <View style={styles.vocabularyList}>
              {lesson.vocabulary.map((item, index) => {
                const revealed = revealedVocabulary.includes(item.id);
                return (
                  <Animated.View
                    key={item.id}
                    entering={FadeInDown.delay(index * 65).duration(320)}
                  >
                    <Pressable
                      onPress={() => {
                        setRevealedVocabulary((current) =>
                          current.includes(item.id)
                            ? current.filter((id) => id !== item.id)
                            : [...current, item.id],
                        );
                        void Haptics.selectionAsync();
                      }}
                      style={localStyles.vocabularyCard}
                    >
                      <View style={styles.vocabularyNumber}>
                        <Text
                          style={[
                            styles.vocabularyNumberText,
                            { color: palette.sageDark },
                          ]}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Text>
                      </View>
                      <View style={styles.vocabularyContent}>
                        <View style={styles.vocabularyHeadingRow}>
                          <View style={styles.vocabularyHeading}>
                            <Text
                              style={[
                                styles.vocabularyWord,
                                { color: palette.ink },
                              ]}
                            >
                              {item.word}
                            </Text>
                            <Text
                              style={[
                                styles.vocabularyPronunciation,
                                { color: palette.sub },
                              ]}
                            >
                              {item.pronunciation}
                            </Text>
                          </View>
                          {localizedReadingText(
                            item.note,
                            normalizedLanguage,
                          ) ? (
                            <View
                              style={[
                                styles.partChip,
                                { backgroundColor: palette.sageSoft },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.partChipText,
                                  { color: palette.sageDark },
                                ]}
                              >
                                {localizedReadingText(
                                  item.note,
                                  normalizedLanguage,
                                )}
                              </Text>
                            </View>
                          ) : null}
                        </View>

                        {revealed ? (
                          <Animated.View entering={FadeInDown.duration(190)}>
                            <Text
                              style={[
                                styles.vocabularyMeaning,
                                { color: palette.ink },
                              ]}
                            >
                              {localizedReadingText(
                                item.meaning,
                                normalizedLanguage,
                              )}
                            </Text>
                            {item.example.trim() ? (
                              <View
                                style={[
                                  styles.vocabularyExample,
                                  { backgroundColor: palette.cream },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.vocabularyExampleText,
                                    { color: palette.sub },
                                  ]}
                                >
                                  {item.example}
                                </Text>
                              </View>
                            ) : null}
                          </Animated.View>
                        ) : (
                          <View style={styles.revealHint}>
                            <Text
                              style={[
                                styles.revealHintText,
                                { color: palette.sub },
                              ]}
                            >
                              {copy.tapToReveal}
                            </Text>
                            <Ionicons
                              name="chevron-down"
                              size={16}
                              color={palette.sub}
                            />
                          </View>
                        )}
                      </View>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={copy.listen}
                        onPress={(event) => {
                          event.stopPropagation();
                          speakVocabulary(item.word);
                        }}
                        style={[
                          styles.vocabularySpeaker,
                          { backgroundColor: palette.sageSoft },
                        ]}
                      >
                        <Ionicons
                          name="volume-medium-outline"
                          size={20}
                          color={palette.sageDark}
                        />
                      </Pressable>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={continueLesson}
          style={({ pressed }) => [
            styles.continueButton,
            {
              backgroundColor: palette.sageDark,
              opacity: pressed ? 0.88 : 1,
            },
          ]}
        >
          <Text style={styles.continueText}>
            {stepIndex === STEPS.length - 1 ? copy.finish : copy.next}
          </Text>
          <View style={styles.continueIcon}>
            <Ionicons
              name={
                stepIndex === STEPS.length - 1 ? "checkmark" : "arrow-forward"
              }
              size={19}
              color={palette.sageDark}
            />
          </View>
        </Pressable>
      </ScrollView>
      <Modal
        visible={isLessonPickerOpen}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setIsLessonPickerOpen(false)}
      >
        <View style={styles.lessonPickerRoot}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={() => setIsLessonPickerOpen(false)}
            style={styles.lessonPickerBackdrop}
          />
          <View
            style={[
              styles.lessonPickerSheet,
              {
                backgroundColor: palette.surface,
                paddingBottom: Math.max(insets.bottom, 18),
              },
            ]}
          >
            <View
              style={[
                styles.lessonPickerHandle,
                { backgroundColor: palette.line },
              ]}
            />
            <View style={styles.lessonPickerHeader}>
              <View style={styles.lessonPickerHeaderCopy}>
                <Text
                  style={[
                    styles.lessonPickerEyebrow,
                    { color: palette.sageDark },
                  ]}
                >
                  {copy.lesson} · 1{copy.level}
                </Text>
                <Text
                  style={[styles.lessonPickerTitle, { color: palette.ink }]}
                >
                  {copy.chooseLesson}
                </Text>
                <Text
                  style={[styles.lessonPickerCount, { color: palette.sub }]}
                >
                  {lessonOptions.length}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={() => setIsLessonPickerOpen(false)}
                style={[
                  styles.lessonPickerClose,
                  { backgroundColor: palette.sageSoft },
                ]}
              >
                <Ionicons name="close" size={21} color={palette.sageDark} />
              </Pressable>
            </View>

            {isCatalogLoading ? (
              <View style={styles.lessonPickerLoading}>
                <ActivityIndicator size="small" color={palette.sageDark} />
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.lessonPickerList}
              >
                {lessonOptions.length === 0 ? (
                  <View style={styles.lessonPickerEmpty}>
                    <View
                      style={[
                        styles.lessonPickerEmptyIcon,
                        { backgroundColor: palette.sageSoft },
                      ]}
                    >
                      <Ionicons
                        name="book-outline"
                        size={24}
                        color={palette.sageDark}
                      />
                    </View>
                    <Text style={[styles.lessonPickerEmptyText, { color: palette.sub }]}>
                      {copy.emptyCatalog}
                    </Text>
                  </View>
                ) : (
                  lessonOptions.map((item) => {
                  const selected = item.code === lesson.code;
                  return (
                    <Pressable
                      key={item.code}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      disabled={isLessonLoading}
                      onPress={() => void chooseLesson(item)}
                      style={({ pressed }) => [
                        styles.lessonPickerItem,
                        {
                          backgroundColor: selected
                            ? palette.sageSoft
                            : palette.bg,
                          borderColor: selected
                            ? palette.sageGlow
                            : palette.line,
                          opacity: pressed ? 0.84 : 1,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.lessonPickerNumber,
                          {
                            backgroundColor: selected
                              ? palette.sageDark
                              : palette.surface,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.lessonPickerNumberText,
                            { color: selected ? "#FFFFFF" : palette.sageDark },
                          ]}
                        >
                          {String(item.unit).padStart(2, "0")}
                        </Text>
                      </View>
                      <View style={styles.lessonPickerItemCopy}>
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.lessonPickerItemTitle,
                            { color: palette.ink },
                          ]}
                        >
                          {item.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.lessonPickerItemTopic,
                            { color: palette.sub },
                          ]}
                        >
                          {localizedReadingText(
                            item.topic,
                            normalizedLanguage,
                          )}
                        </Text>
                      </View>
                      <Ionicons
                        name={selected ? "checkmark-circle" : "chevron-forward"}
                        size={22}
                        color={selected ? palette.sageDark : palette.sub}
                      />
                    </Pressable>
                  );
                  })
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  headerCopy: { flex: 1, minWidth: 0 },
  headerEyebrow: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  headerTitle: {
    marginTop: 2,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
  },
  stepCounter: {
    minWidth: 54,
    height: 38,
    borderRadius: 19,
    paddingHorizontal: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCounterText: { fontSize: 15, fontWeight: "900" },
  stepCounterSmall: { fontSize: 10, fontWeight: "800" },
  progressTrack: {
    height: 3,
    marginHorizontal: 18,
    overflow: "hidden",
    borderRadius: 2,
  },
  progressFill: { height: "100%", borderRadius: 2 },
  stepRailScroll: { flexGrow: 0 },
  stepRail: { gap: 8, paddingHorizontal: 18, paddingVertical: 12 },
  stepPillText: { fontSize: 12, lineHeight: 16, fontWeight: "800" },
  scrollContent: { paddingHorizontal: 18, paddingTop: 4 },
  lessonSelector: {
    minHeight: 76,
    marginBottom: 14,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lessonSelectorIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonSelectorCopy: { flex: 1, minWidth: 0 },
  lessonSelectorLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  lessonSelectorTitle: {
    marginTop: 3,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
  },
  lessonSelectorChevron: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonPickerRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  lessonPickerBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(11, 22, 17, 0.48)",
  },
  lessonPickerSheet: {
    maxHeight: "82%",
    minHeight: 360,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 20,
  },
  lessonPickerHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  lessonPickerHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 2,
    paddingBottom: 15,
  },
  lessonPickerHeaderCopy: { flex: 1, minWidth: 0 },
  lessonPickerEyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  lessonPickerTitle: {
    marginTop: 4,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  lessonPickerCount: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },
  lessonPickerClose: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonPickerLoading: {
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonPickerEmpty: {
    minHeight: 230,
    paddingHorizontal: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonPickerEmptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonPickerEmptyText: {
    marginTop: 13,
    maxWidth: 260,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
  },
  lessonPickerList: {
    gap: 9,
    paddingBottom: 12,
  },
  lessonPickerItem: {
    minHeight: 76,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lessonPickerNumber: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonPickerNumberText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  lessonPickerItemCopy: { flex: 1, minWidth: 0 },
  lessonPickerItemTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
  },
  lessonPickerItemTopic: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
  },

  hero: { borderRadius: 28, overflow: "hidden" },
  heroImageWrap: { height: 188, position: "relative" },
  heroImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  heroImageShade: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  heroMetaOverlay: {
    position: "absolute",
    top: 15,
    right: 15,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroBadge: {
    borderRadius: 99,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  heroBadgeText: { color: "#244234", fontSize: 11, fontWeight: "900" },
  heroTime: {
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "rgba(255,255,255,0.92)",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  heroTimeText: { color: "#244234", fontSize: 11, fontWeight: "800" },
  heroCopy: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 },
  heroEyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  heroTitle: {
    marginTop: 7,
    maxWidth: "100%",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  heroTopic: {
    marginTop: 7,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "700",
  },
  heroLead: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    maxWidth: "100%",
  },
  readingToolbar: { flexDirection: "row", alignItems: "center", gap: 10 },
  audioButton: {
    flex: 1,
    minHeight: 64,
    borderRadius: 19,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  audioIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  audioCopy: { flex: 1 },
  audioTitle: { fontSize: 13, lineHeight: 17, fontWeight: "900" },
  audioTrack: { height: 4, marginTop: 8, borderRadius: 2, overflow: "hidden" },
  audioProgress: { height: 4, borderRadius: 2 },
  fontControl: {
    width: 112,
    minHeight: 64,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    paddingHorizontal: 5,
  },
  fontLabel: { fontSize: 14, fontWeight: "900" },
  fontSizeButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fontSizeButton: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  fontDot: {},
  readingDivider: { height: 1, marginVertical: 24 },
  passageBody: { paddingHorizontal: 2 },
  paragraph: {
    fontFamily: Platform.select({
      ios: "Apple SD Gothic Neo",
      android: "sans-serif-light",
      default: "System",
    }),
    fontWeight: "400",
    letterSpacing: 0,
  },
  vocabularyHighlight: { fontWeight: "700" },
  wordHint: {
    marginTop: 25,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  wordHintText: { flex: 1, fontSize: 12, lineHeight: 18, fontWeight: "700" },
  selectedWordCard: {
    marginTop: 12,
    padding: 17,
    borderRadius: 19,
    borderWidth: 1,
  },
  selectedWordTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  selectedWordCopy: { flex: 1 },
  selectedWordLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  selectedWordTitleRow: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 7,
  },
  selectedWordTitle: { fontSize: 21, lineHeight: 28, fontWeight: "900" },
  selectedWordPronunciation: { fontSize: 12, fontWeight: "700" },
  selectedWordMeaning: {
    marginTop: 11,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
  },
  smallSpeaker: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrowRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  eyebrowIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  sectionIntro: { paddingHorizontal: 4, paddingTop: 14, paddingBottom: 22 },
  sectionTitle: {
    marginTop: 14,
    maxWidth: 330,
    fontSize: 25,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.55,
  },
  sectionLead: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
  },
  completionChip: {
    marginTop: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  completionText: { fontSize: 11, fontWeight: "900" },
  questionHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  questionNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  questionNumberText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },
  questionPrompt: {
    flex: 1,
    paddingTop: 3,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "900",
  },
  translationButton: {
    marginTop: 12,
    minHeight: 36,
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  questionTranslationButton: { marginLeft: 46 },
  translationButtonText: { fontSize: 11.5, fontWeight: "900" },
  translationPanel: {
    marginTop: 8,
    marginLeft: 46,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  translationPrompt: { fontSize: 12.5, lineHeight: 19, fontWeight: "700" },
  optionList: { marginTop: 19, gap: 10 },
  option: {
    minHeight: 56,
    borderRadius: 17,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  optionMarker: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  optionMarkerDot: { width: 9, height: 9, borderRadius: 5 },
  optionCopy: { flex: 1 },
  optionText: { fontSize: 13.5, lineHeight: 20, fontWeight: "700" },
  optionTranslation: { marginTop: 3, fontSize: 11.5, lineHeight: 17 },
  explanationBox: { marginTop: 14, padding: 15, borderRadius: 16 },
  explanationTitleRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  explanationTitle: { fontSize: 11, fontWeight: "900" },
  explanationText: {
    marginTop: 8,
    fontSize: 12.5,
    lineHeight: 19,
    fontWeight: "600",
  },
  explanationTranslation: {
    marginTop: 7,
    fontSize: 11.5,
    lineHeight: 18,
    fontWeight: "500",
  },
  writingPrompt: {
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  writingPromptIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  writingPromptText: {
    flex: 1,
    paddingTop: 2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "900",
  },
  writingTranslationPanel: {
    marginTop: 8,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  writingTranslationHelper: {
    marginTop: 7,
    fontSize: 11.5,
    lineHeight: 18,
    fontWeight: "500",
  },
  guideBox: { marginTop: 14, borderRadius: 17, padding: 15 },
  guideLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
  guideText: { marginTop: 7, fontSize: 13, lineHeight: 20, fontWeight: "700" },
  keywordRow: { marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  keywordChip: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 99 },
  keywordText: { fontSize: 11, fontWeight: "900" },
  inputShell: {
    marginTop: 15,
    minHeight: 210,
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: "hidden",
  },
  writingInput: {
    minHeight: 178,
    paddingHorizontal: 17,
    paddingTop: 16,
    paddingBottom: 10,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "600",
  },
  characterCount: {
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 11,
    fontSize: 11,
    fontWeight: "700",
  },
  exampleToggle: {
    marginTop: 14,
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  exampleToggleText: { flex: 1, fontSize: 13, fontWeight: "900" },
  exampleAnswer: { marginTop: 10, borderRadius: 16, padding: 16 },
  exampleAnswerText: { fontSize: 14, lineHeight: 23, fontWeight: "600" },
  vocabularyList: { gap: 12 },
  vocabularyNumber: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "rgba(112,164,135,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  vocabularyNumberText: { fontSize: 11, fontWeight: "900" },
  vocabularyContent: { flex: 1, minWidth: 0 },
  vocabularyHeadingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  vocabularyHeading: { flex: 1 },
  vocabularyWord: { fontSize: 19, lineHeight: 25, fontWeight: "900" },
  vocabularyPronunciation: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },
  partChip: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 99 },
  partChipText: { fontSize: 9.5, fontWeight: "900" },
  vocabularyMeaning: {
    marginTop: 13,
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: "800",
  },
  vocabularyExample: { marginTop: 10, borderRadius: 13, padding: 12 },
  vocabularyExampleText: { fontSize: 12.5, lineHeight: 19, fontWeight: "600" },
  revealHint: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  revealHintText: { fontSize: 11, fontWeight: "700" },
  vocabularySpeaker: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    marginTop: 22,
    minHeight: 58,
    borderRadius: 19,
    paddingLeft: 20,
    paddingRight: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  continueIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

const createLocalStyles = (palette: ReadingPalette) =>
  StyleSheet.create({
    screen: { flex: 1 },
    header: {
      height: 63,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
    },
    closeButton: {
      width: 42,
      height: 42,
      borderRadius: 15,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: "center",
      justifyContent: "center",
    },
    stepPill: {
      minHeight: 38,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.surface,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    readingCard: {
      marginTop: 14,
      borderRadius: 27,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.surface,
      padding: 18,
      shadowColor: "#10261B",
      shadowOpacity: 0.06,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 2,
    },
    questionCard: {
      marginBottom: 13,
      borderRadius: 23,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.surface,
      padding: 18,
    },
    writingCard: {
      borderRadius: 25,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.surface,
      padding: 16,
    },
    vocabularyCard: {
      borderRadius: 22,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.surface,
      padding: 15,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
    },
  });
