import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import type {
  ReadingLanguage,
  ReadingVocabularyExercise,
  ReadingVocabularyExerciseBlank,
  ReadingVocabularyExerciseResponse,
} from '@/types/reading-listening';
import * as Haptics from '@/utils/haptics';

export interface ReadingVocabularyPracticePalette {
  surface: string;
  ink: string;
  sub: string;
  line: string;
  sageDark: string;
  sageSoft: string;
  cream: string;
  blueSoft: string;
  blue: string;
  dangerSoft: string;
  danger: string;
}

interface ReadingVocabularyPracticeProps {
  exercises: ReadingVocabularyExercise[];
  language: ReadingLanguage;
  palette: ReadingVocabularyPracticePalette;
  responses: Record<string, ReadingVocabularyExerciseResponse>;
  onChange: (
    exerciseId: string,
    blankId: string,
    value: ReadingVocabularyExerciseResponse,
  ) => void;
  onClear: (exerciseId: string, blankId: string) => void;
}

const COPY: Record<
  ReadingLanguage,
  {
    eyebrow: string;
    title: string;
    lead: string;
    wordBank: string;
    tapBlank: string;
    conjugate: string;
    inputHint: string;
    clear: string;
    check: string;
    checkAgain: string;
    answer: string;
    perfect: string;
    score: (correct: number, total: number) => string;
  }
> = {
  ko: {
    eyebrow: '어휘를 연습해 봅시다',
    title: '읽은 단어를 문장 속에서 써 봐요',
    lead: '빈칸을 누른 뒤 알맞은 단어를 골라 보세요.',
    wordBank: '단어 상자',
    tapBlank: '빈칸 선택',
    conjugate: '문장에 맞게 바꾸어 쓰기',
    inputHint: '활용형을 직접 입력하세요',
    clear: '선택 취소',
    check: '채점하기',
    checkAgain: '다시 채점하기',
    answer: '알맞은 답',
    perfect: '모두 정확해요! 본문 속 쓰임까지 잘 이해했어요.',
    score: (correct, total) => `${total}개 중 ${correct}개를 맞혔어요`,
  },
  uz: {
    eyebrow: 'Lug‘at mashqi',
    title: 'O‘qigan so‘zlaringizni gapda ishlating',
    lead: 'Bo‘sh joyni bosing, keyin mos so‘zni tanlang.',
    wordBank: 'So‘zlar qutisi',
    tapBlank: 'Bo‘sh joyni tanlang',
    conjugate: 'Gapga moslab o‘zgartiring',
    inputHint: 'Mos shaklni koreyscha yozing',
    clear: 'Tanlovni bekor qilish',
    check: 'Tekshirish',
    checkAgain: 'Qayta tekshirish',
    answer: 'To‘g‘ri javob',
    perfect: 'Hammasi to‘g‘ri! So‘zlarning matndagi qo‘llanishini tushundingiz.',
    score: (correct, total) => `${total} tadan ${correct} tasi to‘g‘ri`,
  },
  en: {
    eyebrow: 'Vocabulary practice',
    title: 'Use the words you read in context',
    lead: 'Tap a blank, then choose the word that fits.',
    wordBank: 'Word bank',
    tapBlank: 'Choose a blank',
    conjugate: 'Change it to fit the sentence',
    inputHint: 'Type the conjugated form in Korean',
    clear: 'Clear selection',
    check: 'Check answers',
    checkAgain: 'Check again',
    answer: 'Correct answer',
    perfect: 'Perfect! You understand how the words work in context.',
    score: (correct, total) => `${correct} of ${total} correct`,
  },
  ru: {
    eyebrow: 'Практика слов',
    title: 'Используйте слова в контексте',
    lead: 'Нажмите на пропуск, затем выберите подходящее слово.',
    wordBank: 'Слова',
    tapBlank: 'Выберите пропуск',
    conjugate: 'Измените слово по смыслу',
    inputHint: 'Введите нужную форму по-корейски',
    clear: 'Снять выбор',
    check: 'Проверить',
    checkAgain: 'Проверить снова',
    answer: 'Правильный ответ',
    perfect: 'Всё верно! Вы понимаете употребление слов в тексте.',
    score: (correct, total) => `Верно: ${correct} из ${total}`,
  },
};

const responseKey = (exerciseId: string, blankId: string) =>
  `${exerciseId}:${blankId}`;

const normalize = (value: string) =>
  value.normalize('NFC').trim().replace(/\s+/g, ' ');

const localized = (
  value: Record<ReadingLanguage, string>,
  language: ReadingLanguage,
) => value[language]?.trim() || value.ko.trim();

const answerIsCorrect = (
  blank: ReadingVocabularyExerciseBlank,
  response?: ReadingVocabularyExerciseResponse,
) => {
  if (!response || normalize(response.baseWord) !== normalize(blank.baseWord)) {
    return false;
  }
  const accepted = new Set(
    [blank.answer, ...(blank.acceptedAnswers ?? [])].map(normalize),
  );
  return accepted.has(normalize(response.response));
};

interface TemplateProps {
  exercise: ReadingVocabularyExercise;
  palette: ReadingVocabularyPracticePalette;
  responses: Record<string, ReadingVocabularyExerciseResponse>;
  activeBlankId: string | null;
  graded: boolean;
  onBlankPress: (blankId: string) => void;
}

function ExerciseTemplate({
  exercise,
  palette,
  responses,
  activeBlankId,
  graded,
  onBlankPress,
}: TemplateProps) {
  const blankById = useMemo(
    () => new Map(exercise.blanks.map((blank) => [blank.id, blank])),
    [exercise.blanks],
  );
  const pieces = exercise.template.split(/(\{\{[^}]+\}\})/g).filter(Boolean);

  return (
    <Text style={[styles.templateText, { color: palette.ink }]}>
      {pieces.map((piece, index) => {
        const match = /^\{\{(.+)\}\}$/.exec(piece);
        if (!match) return <Text key={`text-${index}`}>{piece}</Text>;

        const blank = blankById.get(match[1]);
        if (!blank) return null;
        const response = responses[responseKey(exercise.id, blank.id)];
        const correct = graded && answerIsCorrect(blank, response);
        const wrong = graded && !correct;
        const active = activeBlankId === blank.id;
        const shown = response?.response.trim() || '　　　　';

        return (
          <Text
            key={blank.id}
            accessibilityRole="button"
            onPress={() => onBlankPress(blank.id)}
            style={[
              styles.inlineBlank,
              {
                color: wrong
                  ? palette.danger
                  : correct
                    ? palette.sageDark
                    : active
                      ? palette.blue
                      : palette.ink,
                backgroundColor: wrong
                  ? palette.dangerSoft
                  : correct
                    ? palette.sageSoft
                    : active
                      ? palette.blueSoft
                      : palette.cream,
                textDecorationColor: active ? palette.blue : palette.line,
              },
            ]}
          >
            {shown}
          </Text>
        );
      })}
    </Text>
  );
}

export function ReadingVocabularyPractice({
  exercises,
  language,
  palette,
  responses,
  onChange,
  onClear,
}: ReadingVocabularyPracticeProps) {
  const copy = COPY[language];
  const [activeByExercise, setActiveByExercise] = useState<
    Record<string, string | null>
  >({});
  const [gradedByExercise, setGradedByExercise] = useState<
    Record<string, boolean>
  >({});

  if (!exercises.length) return null;

  const chooseBlank = (exerciseId: string, blankId: string) => {
    setActiveByExercise((current) => ({ ...current, [exerciseId]: blankId }));
    void Haptics.selectionAsync();
  };

  const chooseWord = (exercise: ReadingVocabularyExercise, word: string) => {
    const activeBlankId = activeByExercise[exercise.id];
    const target =
      exercise.blanks.find((blank) => blank.id === activeBlankId) ??
      exercise.blanks.find(
        (blank) => !responses[responseKey(exercise.id, blank.id)]?.response,
      ) ??
      exercise.blanks[0];
    if (!target) return;

    for (const blank of exercise.blanks) {
      if (blank.id === target.id) continue;
      const used = responses[responseKey(exercise.id, blank.id)];
      if (
        exercise.type === 'sentence_word_bank' &&
        used?.baseWord === word
      ) {
        onClear(exercise.id, blank.id);
      }
    }

    onChange(exercise.id, target.id, {
      baseWord: word,
      response: exercise.type === 'sentence_word_bank' ? word : '',
    });
    setGradedByExercise((current) => ({
      ...current,
      [exercise.id]: false,
    }));

    if (exercise.type === 'sentence_word_bank') {
      const targetIndex = exercise.blanks.findIndex(
        (blank) => blank.id === target.id,
      );
      const next = exercise.blanks
        .slice(targetIndex + 1)
        .find(
          (blank) => !responses[responseKey(exercise.id, blank.id)]?.response,
        );
      setActiveByExercise((current) => ({
        ...current,
        [exercise.id]: next?.id ?? target.id,
      }));
    } else {
      setActiveByExercise((current) => ({
        ...current,
        [exercise.id]: target.id,
      }));
    }
    void Haptics.selectionAsync();
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <View
          style={[styles.sectionIcon, { backgroundColor: palette.blueSoft }]}
        >
          <Ionicons name="pencil" size={19} color={palette.blue} />
        </View>
        <View style={styles.sectionHeadingText}>
          <Text style={[styles.eyebrow, { color: palette.blue }]}>
            {copy.eyebrow}
          </Text>
          <Text style={[styles.sectionTitle, { color: palette.ink }]}>
            {copy.title}
          </Text>
          <Text style={[styles.sectionLead, { color: palette.sub }]}>
            {copy.lead}
          </Text>
        </View>
      </View>

      {exercises.map((exercise, exerciseIndex) => {
        const activeBlankId = activeByExercise[exercise.id] ?? null;
        const activeBlank = exercise.blanks.find(
          (blank) => blank.id === activeBlankId,
        );
        const activeResponse = activeBlank
          ? responses[responseKey(exercise.id, activeBlank.id)]
          : undefined;
        const graded = !!gradedByExercise[exercise.id];
        const complete = exercise.blanks.every((blank) => {
          const response = responses[responseKey(exercise.id, blank.id)];
          return response?.baseWord.trim() && response.response.trim();
        });
        const correctCount = exercise.blanks.filter((blank) =>
          answerIsCorrect(
            blank,
            responses[responseKey(exercise.id, blank.id)],
          ),
        ).length;

        return (
          <Animated.View
            key={exercise.id}
            entering={FadeInDown.delay(exerciseIndex * 90).duration(330)}
            style={[
              styles.exerciseCard,
              { backgroundColor: palette.surface, borderColor: palette.line },
            ]}
          >
            <View style={styles.exerciseHeader}>
              <View
                style={[
                  styles.exerciseNumber,
                  { backgroundColor: palette.sageSoft },
                ]}
              >
                <Text
                  style={[styles.exerciseNumberText, { color: palette.sageDark }]}
                >
                  {String(exerciseIndex + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={styles.exerciseHeaderText}>
                <Text style={[styles.exerciseTitle, { color: palette.ink }]}>
                  {localized(exercise.title, language)}
                </Text>
                <Text style={[styles.exerciseInstruction, { color: palette.sub }]}>
                  {localized(exercise.instruction, language)}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.wordBank,
                { backgroundColor: palette.cream, borderColor: palette.line },
              ]}
            >
              <View style={styles.wordBankLabelRow}>
                <Ionicons name="albums-outline" size={15} color={palette.sub} />
                <Text style={[styles.wordBankLabel, { color: palette.sub }]}>
                  {copy.wordBank}
                </Text>
              </View>
              <View style={styles.wordChips}>
                {exercise.wordBank.map((word) => {
                  const selected = exercise.blanks.some(
                    (blank) =>
                      responses[responseKey(exercise.id, blank.id)]?.baseWord ===
                      word,
                  );
                  return (
                    <Pressable
                      key={word}
                      onPress={() => chooseWord(exercise, word)}
                      style={({ pressed }) => [
                        styles.wordChip,
                        {
                          backgroundColor: selected
                            ? palette.sageSoft
                            : palette.surface,
                          borderColor: selected
                            ? palette.sageDark
                            : palette.line,
                          opacity: pressed ? 0.72 : 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.wordChipText,
                          {
                            color: selected ? palette.sageDark : palette.ink,
                          },
                        ]}
                      >
                        {word}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View
              style={[
                styles.templateCard,
                { backgroundColor: palette.surface, borderColor: palette.line },
              ]}
            >
              <View style={styles.templateHint}>
                <Ionicons name="hand-left-outline" size={15} color={palette.blue} />
                <Text style={[styles.templateHintText, { color: palette.blue }]}>
                  {copy.tapBlank}
                </Text>
              </View>
              <ExerciseTemplate
                exercise={exercise}
                palette={palette}
                responses={responses}
                activeBlankId={activeBlankId}
                graded={graded}
                onBlankPress={(blankId) => chooseBlank(exercise.id, blankId)}
              />
            </View>

            {exercise.type === 'paragraph_conjugation' && activeBlank ? (
              <Animated.View
                entering={FadeIn.duration(180)}
                style={[
                  styles.conjugationEditor,
                  { backgroundColor: palette.blueSoft },
                ]}
              >
                <View style={styles.editorLabelRow}>
                  <Text style={[styles.editorLabel, { color: palette.blue }]}>
                    {copy.conjugate}
                  </Text>
                  <Pressable
                    onPress={() => {
                      onClear(exercise.id, activeBlank.id);
                      setGradedByExercise((current) => ({
                        ...current,
                        [exercise.id]: false,
                      }));
                    }}
                  >
                    <Text style={[styles.clearText, { color: palette.sub }]}>
                      {copy.clear}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.editorRow}>
                  <View
                    style={[
                      styles.baseWordPill,
                      { backgroundColor: palette.surface },
                    ]}
                  >
                    <Text style={[styles.baseWordText, { color: palette.ink }]}>
                      {activeResponse?.baseWord || '—'}
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward" size={17} color={palette.blue} />
                  <TextInput
                    value={activeResponse?.response ?? ''}
                    onChangeText={(response) => {
                      onChange(exercise.id, activeBlank.id, {
                        baseWord: activeResponse?.baseWord ?? '',
                        response,
                      });
                      setGradedByExercise((current) => ({
                        ...current,
                        [exercise.id]: false,
                      }));
                    }}
                    placeholder={copy.inputHint}
                    placeholderTextColor={palette.sub}
                    autoCorrect={false}
                    style={[
                      styles.conjugationInput,
                      {
                        color: palette.ink,
                        backgroundColor: palette.surface,
                        borderColor: palette.blue,
                      },
                    ]}
                  />
                </View>
              </Animated.View>
            ) : null}

            {graded ? (
              <Animated.View entering={FadeInDown.duration(200)}>
                <View
                  style={[
                    styles.scoreBanner,
                    {
                      backgroundColor:
                        correctCount === exercise.blanks.length
                          ? palette.sageSoft
                          : palette.dangerSoft,
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      correctCount === exercise.blanks.length
                        ? 'checkmark-circle'
                        : 'refresh-circle'
                    }
                    size={21}
                    color={
                      correctCount === exercise.blanks.length
                        ? palette.sageDark
                        : palette.danger
                    }
                  />
                  <Text
                    style={[
                      styles.scoreText,
                      {
                        color:
                          correctCount === exercise.blanks.length
                            ? palette.sageDark
                            : palette.danger,
                      },
                    ]}
                  >
                    {correctCount === exercise.blanks.length
                      ? copy.perfect
                      : copy.score(correctCount, exercise.blanks.length)}
                  </Text>
                </View>

                {exercise.blanks
                  .filter(
                    (blank) =>
                      !answerIsCorrect(
                        blank,
                        responses[responseKey(exercise.id, blank.id)],
                      ),
                  )
                  .map((blank) => (
                    <View
                      key={`feedback-${blank.id}`}
                      style={[
                        styles.feedback,
                        { borderColor: palette.dangerSoft },
                      ]}
                    >
                      <Text style={[styles.feedbackAnswer, { color: palette.danger }]}>
                        {copy.answer}: {blank.answer}
                      </Text>
                      <Text style={[styles.feedbackText, { color: palette.sub }]}>
                        {localized(blank.explanation, language)}
                      </Text>
                    </View>
                  ))}
              </Animated.View>
            ) : null}

            <Pressable
              disabled={!complete}
              onPress={() => {
                setGradedByExercise((current) => ({
                  ...current,
                  [exercise.id]: true,
                }));
                void Haptics.notificationAsync(
                  correctCount === exercise.blanks.length
                    ? Haptics.NotificationFeedbackType.Success
                    : Haptics.NotificationFeedbackType.Warning,
                );
              }}
              style={({ pressed }) => [
                styles.checkButton,
                {
                  backgroundColor: complete ? palette.sageDark : palette.sageSoft,
                  opacity: pressed ? 0.86 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.checkButtonText,
                  { color: complete ? '#ffffff' : palette.sub },
                ]}
              >
                {graded ? copy.checkAgain : copy.check}
              </Text>
              <Ionicons
                name="arrow-forward-circle"
                size={20}
                color={complete ? '#ffffff' : palette.sub}
              />
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 34, gap: 16 },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-start', gap: 13 },
  sectionIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeadingText: { flex: 1, gap: 4 },
  eyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionTitle: { fontSize: 22, lineHeight: 29, fontWeight: '900' },
  sectionLead: { fontSize: 13, lineHeight: 20, fontWeight: '600' },
  exerciseCard: {
    borderWidth: 1,
    borderRadius: 27,
    padding: 17,
    gap: 15,
    shadowColor: '#13251e',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  exerciseHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  exerciseNumber: {
    minWidth: 38,
    height: 38,
    borderRadius: 13,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseNumberText: { fontSize: 11, fontWeight: '900' },
  exerciseHeaderText: { flex: 1, gap: 4 },
  exerciseTitle: { fontSize: 17, lineHeight: 23, fontWeight: '900' },
  exerciseInstruction: { fontSize: 12.5, lineHeight: 19, fontWeight: '600' },
  wordBank: { borderWidth: 1, borderRadius: 19, padding: 13, gap: 10 },
  wordBankLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  wordBankLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  wordChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  wordChip: {
    minHeight: 39,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordChipText: { fontSize: 14, lineHeight: 19, fontWeight: '800' },
  templateCard: { borderWidth: 1, borderRadius: 19, padding: 15, gap: 11 },
  templateHint: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  templateHintText: { fontSize: 11, lineHeight: 15, fontWeight: '800' },
  templateText: { fontSize: 15, lineHeight: 32, fontWeight: '600' },
  inlineBlank: {
    minWidth: 62,
    fontWeight: '900',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  conjugationEditor: { borderRadius: 18, padding: 13, gap: 10 },
  editorLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  editorLabel: { fontSize: 11.5, lineHeight: 16, fontWeight: '900' },
  clearText: { fontSize: 11, lineHeight: 15, fontWeight: '700' },
  editorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  baseWordPill: {
    minHeight: 43,
    borderRadius: 13,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseWordText: { fontSize: 14, fontWeight: '900' },
  conjugationInput: {
    flex: 1,
    minWidth: 0,
    height: 45,
    borderWidth: 1.5,
    borderRadius: 13,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '800',
  },
  scoreBanner: {
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  scoreText: { flex: 1, fontSize: 12.5, lineHeight: 18, fontWeight: '800' },
  feedback: { borderBottomWidth: 1, paddingVertical: 11, gap: 3 },
  feedbackAnswer: { fontSize: 13, lineHeight: 18, fontWeight: '900' },
  feedbackText: { fontSize: 12, lineHeight: 18, fontWeight: '600' },
  checkButton: {
    minHeight: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkButtonText: { fontSize: 14, lineHeight: 19, fontWeight: '900' },
});
