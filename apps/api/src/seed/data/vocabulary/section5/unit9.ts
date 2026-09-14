import { LessonCategory } from '../../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../../lessons/schemas/question.schema';
import { WordPartOfSpeech } from '../../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../../word-seed.types';

const L = (ko: string, uz: string, en: string, ru: string) => ({
  ko,
  uz,
  en,
  ru,
});

const I = {
  typeAnswer: L(
    '뜻에 맞는 한국어 표현을 입력하세요.',
    'Ma’noga mos koreyscha ifodani yozing.',
    'Type the Korean expression that matches the meaning.',
    'Введите корейское выражение, соответствующее значению.',
  ),
  arrange: L(
    '단어를 알맞은 순서로 배열하세요.',
    'So‘zlarni to‘g‘ri tartibda joylashtiring.',
    'Arrange the words in the correct order.',
    'Расположите слова в правильном порядке.',
  ),
  reading: L(
    '글을 읽고 알맞은 답을 고르세요.',
    'Matnni o‘qib, to‘g‘ri javobni tanlang.',
    'Read the text and choose the correct answer.',
    'Прочитайте текст и выберите правильный ответ.',
  ),
  error: L(
    '틀린 부분을 찾아 알맞게 고치세요.',
    'Xato qismini topib, to‘g‘rilang.',
    'Find the incorrect part and correct it.',
    'Найдите ошибку и исправьте её.',
  ),
  cloze: L(
    '문맥에 맞는 표현으로 빈칸을 채우세요.',
    'Bo‘sh joylarni mazmunga mos ifodalar bilan to‘ldiring.',
    'Fill in the blanks with expressions that fit the context.',
    'Заполните пропуски подходящими по смыслу выражениями.',
  ),
  fillBlank: L(
    '빈칸에 알맞은 표현을 고르세요.',
    'Bo‘sh joyga mos ifodani tanlang.',
    'Choose the expression for the blank.',
    'Выберите подходящее выражение для пропуска.',
  ),
};

const exactGrading = (expectedMeaning: string) => ({
  mode: 'exact' as const,
  expectedMeaning,
  acceptedAnswers: [],
  tolerance: {
    punctuation: true,
    spacing: false,
    minorTypos: false,
  },
});

const vocabTypeAnswer = (
  answer: string,
  meaning: ReturnType<typeof L>,
  expectedMeaning: string,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: meaning,
  grading: exactGrading(expectedMeaning),
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const translateBuilder = (
  instruction: ReturnType<typeof L>,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'translate_builder' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const wordArrange = (
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'word_arrange' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.arrange,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const fillBlank = (
  npcText: string,
  blankAnswers: string[],
  options: string[],
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'fill_in_blank' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.fillBlank,
  npcText,
  blankAnswers,
  options,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const readingQuiz = (
  npcText: string,
  instruction: string,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'reading_quiz' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  npcText,
  instruction: L(instruction, instruction, instruction, instruction),
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const errorHunt = (
  npcText: string,
  wrongWord: string,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'error_hunt' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.error,
  npcText,
  wrongWord,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const clozePassage = (
  npcText: string,
  blankAnswers: string[],
  options: string[],
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'cloze_passage' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.VOCABULARY,
  instruction: I.cloze,
  npcText,
  blankAnswers,
  options,
  hint,
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const targetExpressionGrading = (
  expectedMeaning: string,
  targetExpressions: string[],
  acceptedAnswers: string[] = [],
) => ({
  mode: 'targetExpression' as const,
  expectedMeaning,
  targetExpressions,
  acceptedAnswers,
  tolerance: {
    punctuation: true,
    spacing: true,
    minorTypos: true,
  },
});

const grammarTypeAnswer = (
  answer: string,
  meaning: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  difficulty = 5,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: meaning,
  grading: targetExpressionGrading(expectedMeaning, targetExpressions),
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const grammarTranslateBuilder = (
  ...args: Parameters<typeof translateBuilder>
) => ({
  ...translateBuilder(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarWordArrange = (...args: Parameters<typeof wordArrange>) => ({
  ...wordArrange(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarFillBlank = (...args: Parameters<typeof fillBlank>) => ({
  ...fillBlank(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarErrorHunt = (...args: Parameters<typeof errorHunt>) => ({
  ...errorHunt(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarClozePassage = (...args: Parameters<typeof clozePassage>) => ({
  ...clozePassage(...args),
  lessonCategory: LessonCategory.GRAMMAR,
});

const grammarReadingQuiz = (
  npcText: string,
  options: string[],
  answer: string,
  hint: ReturnType<typeof L>,
  tags: string[],
  difficulty = 5,
) => ({
  type: 'reading_quiz' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.reading,
  npcText,
  options,
  answer,
  hint,
  tags,
  difficulty,
  xpReward: 20,
  isActive: true,
});

const grammarQuestion = <T extends object>(question: T) => ({
  ...question,
  lessonCategory: LessonCategory.GRAMMAR,
});

const purposeSeoVariants = (answer: string) => {
  const tokens = answer.trim().split(/\s+/);
  const positions: number[] = [];

  for (let i = 1; i < tokens.length; i++) {
    if (tokens[i] === '위해' && /[을를기]$/.test(tokens[i - 1])) {
      positions.push(i);
    }
  }

  if (positions.length === 0) return [];

  const variants = new Set<string>();

  for (let mask = 1; mask < 1 << positions.length; mask++) {
    const copy = [...tokens];

    positions.forEach((position, bit) => {
      if (mask & (1 << bit)) {
        copy[position] = '위해서';
      }
    });

    variants.add(copy.join(' '));
  }

  return [...variants];
};

const purposeTypeAnswer = (
  answer: string,
  prompt: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  difficulty = 5,
  acceptedAnswers: string[] = [],
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: prompt,
  grading: {
    mode: 'targetExpression' as const,
    expectedMeaning,
    targetExpressions,
    acceptedAnswers,
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
  tags,
  difficulty,
  xpReward: 25,
  isActive: true,
});

const W = (
  code: string,
  korean: string,
  partOfSpeech: WordPartOfSpeech,
  ko: string,
  uz: string,
  en: string,
  ru: string,
  exampleKo: string,
  exampleUz: string,
  exampleEn: string,
  exampleRu: string,
  tags: string[],
  difficulty = 4,
): WordSeedEntry => ({
  code,
  korean,
  senseKey: code,
  partOfSpeech,
  meaning: L(ko, uz, en, ru),
  examples: [
    {
      korean: exampleKo,
      translations: L(exampleKo, exampleUz, exampleEn, exampleRu),
    },
  ],
  pronunciation: {
    ttsText: korean,
  },
  tags,
  difficulty,
  isCore: true,
});

const passiveTypeAnswer = (
  answer: string,
  prompt: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  difficulty = 5,
  acceptedAnswers: string[] = [],
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: prompt,
  grading: {
    mode: 'targetExpression' as const,
    expectedMeaning,
    targetExpressions,
    acceptedAnswers,
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

const contrastTypeAnswer = (
  answer: string,
  prompt: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  difficulty = 5,
  acceptedAnswers: string[] = [],
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: prompt,
  grading: {
    mode: 'targetExpression' as const,
    expectedMeaning,
    targetExpressions,
    acceptedAnswers,
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

const topicTypeAnswer = (
  answer: string,
  prompt: ReturnType<typeof L>,
  expectedMeaning: string,
  targetExpressions: string[],
  tags: string[],
  acceptedAnswers: string[] = [],
  difficulty = 5,
) => ({
  type: 'type_answer' as const,
  level: QuestionLevel.LEVEL_5,
  lessonCategory: LessonCategory.GRAMMAR,
  instruction: I.typeAnswer,
  answer,
  answerTranslation: prompt,
  grading: {
    mode: 'targetExpression' as const,
    expectedMeaning,
    targetExpressions,
    acceptedAnswers,
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
  difficulty,
  tags,
  xpReward: 25,
  isActive: true,
});

export const S5_UNIT9_WORDS: WordSeedEntry[] = [
  W(
    'childrens-day',
    '어린이날',
    WordPartOfSpeech.NOUN,
    '어린이를 소중히 여기고 어린이의 행복을 생각하는 날',
    'Bolalarni qadrlash va ularning baxtini o‘ylash kuni',
    "Children's Day",
    'День детей',
    '한국의 어린이날은 5월 5일이에요.',
    'Koreyada Bolalar kuni 5-may.',
    "Children's Day in Korea is May 5.",
    'День детей в Корее отмечается 5 мая.',
    ['commemorative-day', 'korea', 'may'],
  ),

  W(
    'parents-day',
    '어버이날',
    WordPartOfSpeech.NOUN,
    '부모님의 사랑과 은혜에 감사하는 날',
    'Ota-onaning mehriga minnatdorchilik bildirish kuni',
    "Parents' Day",
    'День родителей',
    '어버이날에는 부모님께 감사의 마음을 전해요.',
    'Ota-onalar kunida ota-onamizga minnatdorchilik bildiramiz.',
    "On Parents' Day, people express gratitude to their parents.",
    'В День родителей выражают благодарность родителям.',
    ['commemorative-day', 'family', 'may'],
  ),

  W(
    'teachers-day',
    '스승의 날',
    WordPartOfSpeech.PHRASE,
    '선생님의 가르침과 수고에 감사하는 날',
    'Ustozlarning ta’limi va mehnatiga minnatdorchilik bildirish kuni',
    "Teachers' Day",
    'День учителя',
    '스승의 날에는 선생님께 감사의 마음을 전해요.',
    'Ustozlar kunida o‘qituvchilarga minnatdorchilik bildiramiz.',
    "On Teachers' Day, people express gratitude to teachers.",
    'В День учителя выражают благодарность учителям.',
    ['commemorative-day', 'teacher', 'may'],
  ),

  W(
    'hangeul-day',
    '한글날',
    WordPartOfSpeech.NOUN,
    '한글의 창제와 반포를 기념하는 날',
    'Hangul yaratilishi va e’lon qilinishini nishonlaydigan kun',
    'Hangeul Day',
    'День хангыля',
    '한글날은 10월 9일이에요.',
    'Hangul kuni 9-oktabr.',
    'Hangeul Day is October 9.',
    'День хангыля отмечается 9 октября.',
    ['commemorative-day', 'hangeul', 'october'],
  ),

  W(
    'workers-day',
    '근로자의 날',
    WordPartOfSpeech.PHRASE,
    '근로자의 노력과 권리를 생각하는 날',
    'Mehnatkashlarning mehnati va huquqlarini yodga oladigan kun',
    "Workers' Day",
    'День труда',
    '근로자의 날은 5월 1일이에요.',
    'Mehnatkashlar kuni 1-may.',
    "Workers' Day is May 1.",
    'День труда отмечается 1 мая.',
    ['commemorative-day', 'worker', 'may'],
  ),

  W(
    'arbor-day',
    '식목일',
    WordPartOfSpeech.NOUN,
    '나무를 심고 자연을 가꾸는 의미를 생각하는 날',
    'Daraxt ekish va tabiatni asrashni eslatadigan kun',
    'Arbor Day',
    'День посадки деревьев',
    '식목일에는 나무를 심는 행사를 하기도 해요.',
    'Daraxt ekish kunida daraxt ekish tadbirlari o‘tkaziladi.',
    'People may hold tree-planting events on Arbor Day.',
    'В День посадки деревьев проводят мероприятия по посадке деревьев.',
    ['commemorative-day', 'nature', 'april'],
  ),

  W(
    'memorial-day-korea',
    '현충일',
    WordPartOfSpeech.NOUN,
    '나라를 위해 희생한 사람들을 기억하고 기리는 날',
    'Vatan uchun qurbon bo‘lganlarni xotirlash kuni',
    'Memorial Day',
    'День памяти',
    '현충일에는 나라를 위해 희생한 사람들을 기려요.',
    'Xotira kunida vatan uchun qurbon bo‘lganlar yodga olinadi.',
    'On Memorial Day, people honor those who sacrificed for the country.',
    'В День памяти чтят людей, пожертвовавших собой ради страны.',
    ['commemorative-day', 'history', 'june'],
  ),

  W(
    'liberation-day-korea',
    '광복절',
    WordPartOfSpeech.NOUN,
    '한국이 일본의 식민 지배에서 벗어난 것을 기념하는 날',
    'Koreyaning yapon mustamlakachiligidan ozod bo‘lganini nishonlaydigan kun',
    'Korean Liberation Day',
    'День освобождения Кореи',
    '광복절은 8월 15일이에요.',
    'Koreya Ozodlik kuni 15-avgust.',
    'Korean Liberation Day is August 15.',
    'День освобождения Кореи отмечается 15 августа.',
    ['commemorative-day', 'history', 'august'],
  ),

  W(
    'national-foundation-day-korea',
    '개천절',
    WordPartOfSpeech.NOUN,
    '한국의 건국을 기념하는 날',
    'Koreya davlati asos solinganini nishonlaydigan kun',
    'National Foundation Day',
    'День основания государства',
    '개천절은 10월 3일이에요.',
    'Koreya davlati tashkil topgan kun 3-oktabr.',
    'National Foundation Day is October 3.',
    'День основания государства отмечается 3 октября.',
    ['commemorative-day', 'history', 'october'],
  ),

  W(
    'march-first-movement-day',
    '삼일절',
    WordPartOfSpeech.NOUN,
    '3·1 독립운동을 기념하는 날',
    '1-mart mustaqillik harakatini xotirlash kuni',
    'March First Independence Movement Day',
    'День движения 1 марта',
    '삼일절은 3월 1일이에요.',
    '1-mart harakati kuni 1-martda.',
    'March First Movement Day is March 1.',
    'День движения 1 марта отмечается 1 марта.',
    ['commemorative-day', 'history', 'march'],
  ),

  W(
    'commemorate',
    '기념하다',
    WordPartOfSpeech.VERB,
    '뜻깊은 사건이나 사람을 기억하며 특별히 뜻을 나타내다',
    'Muhim voqea yoki insonni eslab nishonlamoq',
    'to commemorate',
    'отмечать; чтить память',
    '한글날에는 한글의 창제를 기념해요.',
    'Hangul kunida Hangul yaratilishi nishonlanadi.',
    'Hangeul Day commemorates the creation of Hangeul.',
    'В День хангыля отмечают создание хангыля.',
    ['commemorative-day', 'action'],
  ),

  W(
    'become-independent',
    '독립하다',
    WordPartOfSpeech.VERB,
    '다른 나라나 세력의 지배에서 벗어나 스스로 나라를 운영하다',
    'Boshqa davlat hukmronligidan chiqib mustaqil bo‘lmoq',
    'to become independent',
    'получить независимость',
    '많은 나라가 독립을 기념하는 날을 가지고 있어요.',
    'Ko‘p mamlakatlarda mustaqillikni nishonlaydigan kun bor.',
    'Many countries have a day commemorating independence.',
    'Во многих странах есть день, посвящённый независимости.',
    ['history', 'independence'],
  ),

  W(
    'unify',
    '통일하다',
    WordPartOfSpeech.VERB,
    '나뉘어 있는 것을 하나로 합치다',
    'Bo‘lingan narsalarni birlashtirmoq',
    'to unify',
    'объединить',
    '나뉜 지역이 하나로 통일되었어요.',
    'Bo‘lingan hududlar birlashdi.',
    'The divided regions were unified.',
    'Разделённые территории объединились.',
    ['history', 'society'],
  ),

  W(
    'found-country',
    '나라를 세우다',
    WordPartOfSpeech.PHRASE,
    '새로운 국가를 만들다',
    'Yangi davlat barpo etmoq',
    'to found a country',
    'основать государство',
    '나라를 세운 일을 기념하는 날도 있어요.',
    'Davlat tashkil topganini nishonlaydigan kunlar ham bor.',
    'Some commemorative days celebrate the founding of a country.',
    'Некоторые памятные дни посвящены основанию государства.',
    ['history', 'country'],
  ),

  W(
    'king-be-born',
    '왕이 태어나다',
    WordPartOfSpeech.PHRASE,
    '왕이 세상에 태어나다',
    'Qirol dunyoga kelmoq',
    'for a king to be born',
    'родиться королю',
    '왕이 태어난 날을 기념하는 나라도 있어요.',
    'Qirol tug‘ilgan kunni nishonlaydigan davlatlar ham bor.',
    "Some countries commemorate a king's birthday.",
    'В некоторых странах отмечают день рождения короля.',
    ['history', 'commemorative-day'],
  ),

  W(
    'hold-commemorative-ceremony',
    '기념식을 하다',
    WordPartOfSpeech.PHRASE,
    '어떤 날이나 사건을 기념하기 위한 공식 행사를 열다',
    'Bir kun yoki hodisani nishonlash uchun rasmiy marosim o‘tkazmoq',
    'to hold a commemorative ceremony',
    'проводить памятную церемонию',
    '기념일에는 기념식을 하기도 해요.',
    'Esdalik kunlarida marosim o‘tkaziladi.',
    'A commemorative ceremony may be held on a special day.',
    'В памятный день могут проводить торжественную церемонию.',
    ['commemorative-day', 'ceremony'],
  ),

  W(
    'have-fireworks',
    '불꽃놀이를 하다',
    WordPartOfSpeech.PHRASE,
    '축하 행사에서 불꽃을 하늘에 터뜨리며 구경하다',
    'Bayramda mushakbozlik qilmoq',
    'to have fireworks',
    'устраивать фейерверк',
    '큰 행사에서는 불꽃놀이를 하기도 해요.',
    'Katta bayramlarda mushakbozlik ham bo‘ladi.',
    'Large celebrations may include fireworks.',
    'На крупных праздниках могут устраивать фейерверки.',
    ['commemorative-day', 'celebration'],
  ),

  W(
    'plant-tree',
    '나무를 심다',
    WordPartOfSpeech.PHRASE,
    '땅에 나무가 자랄 수 있도록 심다',
    'Daraxtni yerga ekmoq',
    'to plant a tree',
    'сажать дерево',
    '식목일에 나무를 심었어요.',
    'Daraxt ekish kunida daraxt ekdik.',
    'We planted a tree on Arbor Day.',
    'В День посадки деревьев мы посадили дерево.',
    ['nature', 'commemorative-day'],
  ),

  W(
    'display-national-flag',
    '국기를 달다',
    WordPartOfSpeech.PHRASE,
    '국가의 중요한 날에 국기를 밖에 걸다',
    'Muhim davlat kunida davlat bayrog‘ini osmoq',
    'to display the national flag',
    'вывешивать государственный флаг',
    '광복절에는 집에 국기를 달기도 해요.',
    'Ozodlik kunida uyga davlat bayrog‘i osiladi.',
    'People may display the national flag on Liberation Day.',
    'В День освобождения могут вывешивать государственный флаг.',
    ['flag', 'commemorative-day'],
  ),

  W(
    'wear-flower',
    '꽃을 달다',
    WordPartOfSpeech.PHRASE,
    '옷이나 가슴에 꽃을 붙이거나 꽂다',
    'Kiyimga yoki ko‘krakka gul taqmoq',
    'to wear or pin on a flower',
    'прикреплять цветок',
    '감사의 뜻으로 가슴에 꽃을 달아 드렸어요.',
    'Minnatdorchilik belgisi sifatida ko‘kragiga gul taqdik.',
    'We pinned on a flower as a sign of gratitude.',
    'В знак благодарности прикрепили цветок.',
    ['commemorative-day', 'gratitude'],
  ),

  W(
    'march-in-procession',
    '행진을 하다',
    WordPartOfSpeech.PHRASE,
    '여러 사람이 줄을 맞추어 함께 앞으로 걸어가다',
    'Ko‘p odamlar saf bo‘lib birga yurmoq',
    'to march in a procession',
    'идти шествием',
    '기념 행사에서 사람들이 거리 행진을 했어요.',
    'Bayram tadbirida odamlar ko‘chada yurish qildilar.',
    'People marched through the streets during the commemorative event.',
    'Во время памятного мероприятия люди прошли шествием.',
    ['commemorative-day', 'ceremony'],
  ),

  W(
    'public-holiday',
    '공휴일',
    WordPartOfSpeech.NOUN,
    '국가에서 공식적으로 쉬도록 정한 날',
    'Davlat tomonidan rasmiy dam olish kuni deb belgilangan kun',
    'public holiday',
    'государственный выходной',
    '공휴일에는 학교나 회사가 쉬는 경우가 많아요.',
    'Davlat dam olish kunlarida maktab va kompaniyalar ko‘pincha ishlamaydi.',
    'Schools and companies are often closed on public holidays.',
    'В государственные праздники школы и компании часто не работают.',
    ['holiday', 'calendar'],
  ),

  W(
    'silent-tribute',
    '묵념',
    WordPartOfSpeech.NOUN,
    '죽은 사람을 생각하며 말없이 조용히 추모하는 일',
    'Vafot etganlarni jim turib xotirlash',
    'silent tribute',
    'минута молчания',
    '현충일 기념식에서 묵념을 했어요.',
    'Xotira kuni marosimida sukut saqlandi.',
    'A silent tribute was observed at the Memorial Day ceremony.',
    'На церемонии в День памяти почтили погибших минутой молчания.',
    ['commemorative-day', 'memorial'],
  ),

  W(
    'everywhere',
    '곳곳',
    WordPartOfSpeech.ADVERB,
    '여러 장소나 이곳저곳',
    'Turli joylarda; hamma yerda',
    'here and there; throughout',
    'повсюду; во многих местах',
    '기념일을 맞아 도시 곳곳에 국기가 걸렸어요.',
    'Bayram munosabati bilan shaharning turli joylariga bayroqlar osildi.',
    'National flags were displayed throughout the city for the commemorative day.',
    'К памятному дню во многих местах города вывесили флаги.',
    ['place', 'commemorative-day'],
  ),

  W(
    'sincerely',
    '진심으로',
    WordPartOfSpeech.ADVERB,
    '거짓 없이 마음에서 우러나오는 태도로',
    'Chin dildan, samimiy ravishda',
    'sincerely',
    'искренне',
    '선생님께 진심으로 감사드렸어요.',
    'Ustozga chin dildan minnatdorchilik bildirdim.',
    'I sincerely thanked my teacher.',
    'Я искренне поблагодарил учителя.',
    ['emotion', 'gratitude'],
  ),
  W(
    'be-made',
    '만들어지다',
    WordPartOfSpeech.VERB,
    '사람이나 어떤 힘에 의해 만들어진 상태가 되다',
    'Kimdir yoki biror kuch ta’sirida yaratilmoq',
    'to be made; to be created',
    'быть созданным',
    '한글은 세종대왕에 의해 만들어졌어요.',
    'Hangul qirol Sejong tomonidan yaratilgan.',
    'Hangeul was created by King Sejong.',
    'Хангыль был создан королём Седжоном.',
    ['passive', 'hangeul', 'grammar'],
    5,
  ),

  W(
    'become-known',
    '알려지다',
    WordPartOfSpeech.VERB,
    '어떤 사실이나 정보가 다른 사람들에게 전해져 알게 되다',
    'Ma’lumot boshqalarga yetib, ma’lum bo‘lmoq',
    'to become known; to be made known',
    'становиться известным',
    '한글의 우수성이 세계에 널리 알려졌어요.',
    'Hangulning afzalliklari dunyoga keng tanildi.',
    'The excellence of Hangeul became widely known around the world.',
    'Достоинства хангыля стали широко известны в мире.',
    ['passive', 'information', 'grammar'],
    5,
  ),

  W(
    'be-erected',
    '세워지다',
    WordPartOfSpeech.VERB,
    '건물이나 시설 등이 다른 사람의 행동에 의해 세워진 상태가 되다',
    'Bino yoki inshoot qurilmoq yoki o‘rnatilmoq',
    'to be erected; to be established',
    'быть возведённым; быть основанным',
    '기념관 앞에 새로운 기념비가 세워졌어요.',
    'Muzey oldida yangi yodgorlik o‘rnatildi.',
    'A new monument was erected in front of the memorial hall.',
    'Перед мемориальным залом установили новый памятник.',
    ['passive', 'memorial', 'grammar'],
    5,
  ),

  W(
    'be-built',
    '지어지다',
    WordPartOfSpeech.VERB,
    '건물 등이 사람에 의해 만들어지다',
    'Bino va shunga o‘xshash narsa qurilmoq',
    'to be built',
    'быть построенным',
    '이 기념관은 오래전에 지어졌어요.',
    'Bu memorial bino ancha oldin qurilgan.',
    'This memorial hall was built a long time ago.',
    'Этот мемориальный зал был построен давно.',
    ['passive', 'building', 'grammar'],
    5,
  ),

  W(
    'be-accomplished',
    '이루어지다',
    WordPartOfSpeech.VERB,
    '일이나 계획 등이 실제로 진행되거나 실현되다',
    'Ish yoki reja amalga oshmoq',
    'to be accomplished; to take place',
    'осуществляться; происходить',
    '기념 행사는 많은 사람의 도움으로 이루어졌어요.',
    'Tadbir ko‘p odamlarning yordami bilan amalga oshdi.',
    'The commemorative event was carried out with the help of many people.',
    'Памятное мероприятие состоялось благодаря помощи многих людей.',
    ['passive', 'event', 'grammar'],
    5,
  ),

  W(
    'be-decided',
    '정해지다',
    WordPartOfSpeech.VERB,
    '날짜, 방법, 규칙 등이 결정되다',
    'Sana, usul yoki qoida belgilanmoq',
    'to be decided; to be set',
    'быть определённым; быть установленным',
    '행사 날짜가 다음 주로 정해졌어요.',
    'Tadbir sanasi keyingi haftaga belgilandi.',
    'The event date was set for next week.',
    'Дата мероприятия была назначена на следующую неделю.',
    ['passive', 'decision', 'grammar'],
    5,
  ),

  W(
    'be-observed',
    '지켜지다',
    WordPartOfSpeech.VERB,
    '약속이나 규칙 등이 실제 행동으로 지켜지다',
    'Va’da yoki qoidaga amal qilinmoq',
    'to be observed; to be kept',
    'соблюдаться',
    '행사장에서는 안전 규칙이 잘 지켜졌어요.',
    'Tadbir joyida xavfsizlik qoidalariga yaxshi amal qilindi.',
    'The safety rules were well observed at the event.',
    'На мероприятии правила безопасности хорошо соблюдались.',
    ['passive', 'rule', 'grammar'],
    5,
  ),

  W(
    'be-believed',
    '믿어지다',
    WordPartOfSpeech.VERB,
    '어떤 사실이나 이야기를 사실이라고 받아들일 수 있게 되다',
    'Biror gap yoki faktga ishonish mumkin bo‘lmoq',
    'to be believed; to seem believable',
    'вериться',
    '그 이야기가 처음에는 쉽게 믿어지지 않았어요.',
    'Avvaliga bu gapga ishonish qiyin edi.',
    'At first, the story was hard to believe.',
    'Сначала в эту историю было трудно поверить.',
    ['passive', 'belief', 'grammar'],
    5,
  ),
  W(
    'king-sejong-great',
    '세종대왕',
    WordPartOfSpeech.NOUN,
    '조선 시대에 한글 창제를 이끈 왕',
    'Joseon davrida Hangul yaratilishiga boshchilik qilgan qirol',
    'King Sejong the Great',
    'Король Седжон Великий',
    '한글의 역사에 대해 이야기할 때 세종대왕을 빼놓을 수 없어요.',
    'Hangul tarixi haqida gapirganda qirol Sejongni chetlab bo‘lmaydi.',
    'King Sejong is central when discussing the history of Hangeul.',
    'При разговоре об истории хангыля невозможно обойти короля Седжона.',
    ['hangeul', 'history'],
    4,
  ),

  W(
    'chinese-characters',
    '한자',
    WordPartOfSpeech.NOUN,
    '중국에서 만들어져 한국에서도 오랫동안 사용된 문자',
    'Xitoyda yaratilgan va Koreyada ham uzoq vaqt ishlatilgan yozuv belgilari',
    'Chinese characters',
    'китайские иероглифы',
    '한글이 만들어지기 전에는 한자를 사용해 글을 쓰기도 했어요.',
    'Hangul yaratilishidan oldin yozishda xitoy ierogliflari ham ishlatilgan.',
    'Before Hangeul was created, Chinese characters were also used for writing.',
    'До создания хангыля для письма также использовались китайские иероглифы.',
    ['hangeul', 'history', 'writing'],
    5,
  ),

  W(
    'script-creation',
    '창제',
    WordPartOfSpeech.NOUN,
    '새로운 문자나 제도 등을 처음으로 만들어 냄',
    'Yangi yozuv yoki tizimni yaratish',
    'creation; invention',
    'создание; изобретение',
    '한글날은 한글의 창제를 기념하는 날이에요.',
    'Hangul kuni Hangul yaratilishini nishonlaydi.',
    'Hangeul Day commemorates the creation of Hangeul.',
    'День хангыля посвящён созданию хангыля.',
    ['hangeul', 'history'],
    5,
  ),

  W(
    'promulgation',
    '반포',
    WordPartOfSpeech.NOUN,
    '새로운 제도나 내용을 많은 사람에게 공식적으로 알림',
    'Yangi tizim yoki mazmunni odamlarga rasmiy ravishda e’lon qilish',
    'promulgation; official proclamation',
    'официальное обнародование',
    '한글날에는 한글의 창제와 반포를 함께 기념해요.',
    'Hangul kunida Hangulning yaratilishi va rasmiy e’lon qilinishi eslanadi.',
    'Hangeul Day commemorates the creation and promulgation of Hangeul.',
    'В День хангыля отмечают создание и официальное обнародование хангыля.',
    ['hangeul', 'history'],
    5,
  ),

  W(
    'excellent',
    '우수하다',
    WordPartOfSpeech.ADJECTIVE,
    '다른 것과 비교했을 때 매우 뛰어나다',
    'Boshqalarga nisbatan juda yaxshi va yuqori darajada bo‘lmoq',
    'to be excellent; outstanding',
    'быть превосходным',
    '학생들은 한글의 우수성에 대해 발표했어요.',
    'Talabalar Hangulning afzalliklari haqida taqdimot qildilar.',
    'The students gave a presentation about the strengths of Hangeul.',
    'Студенты выступили с презентацией о достоинствах хангыля.',
    ['hangeul', 'evaluation'],
    5,
  ),

  W(
    'oppose',
    '반대하다',
    WordPartOfSpeech.VERB,
    '어떤 의견이나 계획에 동의하지 않다',
    'Bir fikr yoki rejaga qo‘shilmaslik',
    'to oppose; to be against',
    'возражать; быть против',
    '새로운 제도에 반대하는 의견도 있을 수 있어요.',
    'Yangi tizimga qarshi fikrlar ham bo‘lishi mumkin.',
    'There can also be opinions opposing a new system.',
    'Могут быть и мнения против новой системы.',
    ['opinion', 'discussion'],
    5,
  ),

  W(
    'world',
    '세상',
    WordPartOfSpeech.NOUN,
    '사람들이 살아가는 사회나 세계 전체',
    'Odamlar yashaydigan jamiyat yoki butun dunyo',
    'world; society',
    'мир; общество',
    '한글의 가치가 세상에 점점 더 알려지고 있어요.',
    'Hangulning qadri dunyoda tobora ko‘proq tanilmoqda.',
    'The value of Hangeul is becoming increasingly known around the world.',
    'Ценность хангыля становится всё более известной в мире.',
    ['world', 'society'],
    4,
  ),

  W(
    'gradually',
    '점점',
    WordPartOfSpeech.ADVERB,
    '시간이 지나면서 조금씩 더',
    'Vaqt o‘tishi bilan tobora ko‘proq',
    'gradually; increasingly',
    'постепенно; всё больше',
    '한글에 관심을 가지는 사람이 점점 많아지고 있어요.',
    'Hangulga qiziqadigan odamlar tobora ko‘paymoqda.',
    'More and more people are becoming interested in Hangeul.',
    'Всё больше людей интересуются хангылем.',
    ['change', 'degree'],
    4,
  ),

  W(
    'coming-of-age-ceremony',
    '성년식',
    WordPartOfSpeech.NOUN,
    '성인이 된 것을 기념하는 의식이나 행사',
    'Voyaga yetganlikni nishonlaydigan marosim',
    'coming-of-age ceremony',
    'церемония совершеннолетия',
    '다른 나라의 성년식에 대해 조사했어요.',
    'Boshqa mamlakatlarning voyaga yetish marosimlari haqida tadqiqot qildik.',
    'We researched coming-of-age ceremonies in other countries.',
    'Мы исследовали церемонии совершеннолетия в других странах.',
    ['ceremony', 'culture'],
    5,
  ),

  W(
    'award-recipient',
    '수상자',
    WordPartOfSpeech.NOUN,
    '상이나 상품을 받은 사람',
    'Mukofot olgan shaxs',
    'award recipient; winner',
    'лауреат; победитель',
    '수상자에 대해 소개하는 글을 읽었어요.',
    'Mukofot olgan inson haqida tanishtiruvchi matnni o‘qidik.',
    'We read an introduction about the award recipient.',
    'Мы прочитали текст о лауреате.',
    ['award', 'person'],
    5,
  ),

  W(
    'award-acceptance-remarks',
    '수상 소감',
    WordPartOfSpeech.PHRASE,
    '상을 받은 사람이 느낀 점이나 감사의 마음을 말하는 내용',
    'Mukofot olgan odamning taassuroti va minnatdorchilik so‘zlari',
    'award acceptance remarks',
    'речь при получении награды',
    '수상자는 수상 소감에서 가족에게 감사했어요.',
    'G‘olib mukofot nutqida oilasiga minnatdorchilik bildirdi.',
    'The award recipient thanked their family in the acceptance remarks.',
    'Лауреат поблагодарил семью в своей речи.',
    ['award', 'speech'],
    5,
  ),

  W(
    'consolation',
    '위로',
    WordPartOfSpeech.NOUN,
    '힘든 일을 겪은 사람의 마음이 편해지도록 따뜻하게 말하거나 행동하는 것',
    'Qiynalgan odamga tasalli berish',
    'consolation; comfort',
    'утешение; поддержка',
    '힘든 일을 겪은 친구에게 위로의 말을 전했어요.',
    'Qiyin vaziyatdagi do‘stga tasalli so‘zlarini aytdim.',
    'I offered words of comfort to a friend going through a difficult time.',
    'Я сказал слова утешения другу, переживающему трудности.',
    ['emotion', 'support'],
    5,
  ),

  W(
    'encouragement',
    '격려',
    WordPartOfSpeech.NOUN,
    '상대방이 힘을 내거나 계속 노력하도록 용기를 주는 것',
    'Boshqa odamga kuch va jasorat berish',
    'encouragement',
    'ободрение; поддержка',
    '선생님은 학생들에게 격려의 말을 해 주셨어요.',
    'O‘qituvchi talabalarga dalda berdi.',
    'The teacher gave the students words of encouragement.',
    'Учитель сказал ученикам слова поддержки.',
    ['emotion', 'support'],
    5,
  ),
];

export const S5_UNIT9_QUESTIONS = {
  // ══════════════════════════════════════════════════════════
  // Node 1 · 기념일
  // 한국의 주요 기념일 → 역사적 의미 → 기념 행동 → 실제 설명
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 한국에는 어떤 기념일이 있어요?
  // 주요 기념일과 날짜
  // ──────────────────────────────────────────────────────────

  s5u9_001_reading_quiz: grammarReadingQuiz(
    '한국에서는 5월 5일에 어린이들이 즐겁게 지낼 수 있도록 여러 행사를 합니다. 이 날의 이름을 고르세요.',
    ['어린이날', '어버이날', '스승의 날', '근로자의 날'],
    '어린이날',
    L(
      '5월 5일은 어린이날이에요.',
      '5-may — Bolalar kuni.',
      'May 5 is Children’s Day.',
      '5 мая — День детей.',
    ),
    ['childrens-day', 'commemorative-day'],
  ),

  s5u9_002_type_answer: vocabTypeAnswer(
    '어린이날',
    L(
      '한국에서 5월 5일에 어린이를 위해 기념하는 날을 한국어로 쓰세요.',
      'Koreyada 5-may kuni bolalar uchun nishonlanadigan kunni koreyscha yozing.',
      'Write in Korean the day celebrated for children on May 5.',
      'Напишите по-корейски название дня, который отмечают для детей 5 мая.',
    ),
    'Children’s Day',
    ['childrens-day', 'type-answer'],
  ),

  s5u9_003_translate_builder: translateBuilder(
    L(
      '5월 5일은 어린이날입니다.',
      '5-may — Bolalar kuni.',
      'May 5 is Children’s Day.',
      '5 мая — День детей.',
    ),
    [
      '어버이날이에요',
      '5월 5일은',
      '어린이날이에요',
      '스승의 날이에요',
      '10월 9일은',
      '근로자의 날이에요',
    ],
    '5월 5일은 어린이날이에요',
    L(
      '어린이날은 5월 5일이에요.',
      'Bolalar kuni 5-may.',
      'Children’s Day is May 5.',
      'День детей отмечается 5 мая.',
    ),
    ['childrens-day', 'date'],
  ),

  s5u9_004_fill_in_blank: fillBlank(
    '5월 8일은 ___이에요.',
    ['어버이날'],
    ['어버이날', '어린이날', '스승의 날', '한글날', '식목일'],
    L(
      '5월 8일은 부모님께 감사하는 어버이날이에요.',
      '8-may ota-onaga minnatdorchilik bildiriladigan Ota-onalar kuni.',
      'May 8 is Parents’ Day.',
      '8 мая — День родителей.',
    ),
    ['parents-day', 'date'],
  ),

  s5u9_005_word_arrange: wordArrange(
    [
      '감사의 마음을 전해요',
      '어버이날에는',
      '부모님께',
      '선생님께',
      '나무를 심어요',
      '국기를 달아요',
    ],
    '어버이날에는 부모님께 감사의 마음을 전해요',
    L(
      '어버이날에는 부모님께 감사하는 마음을 표현해요.',
      'Ota-onalar kunida ota-onaga minnatdorchilik bildiriladi.',
      'On Parents’ Day, people express gratitude to their parents.',
      'В День родителей выражают благодарность родителям.',
    ),
    ['parents-day', 'gratitude'],
  ),

  s5u9_006_type_answer: vocabTypeAnswer(
    '어버이날',
    L(
      '5월 8일에 부모님께 감사하는 날을 한국어로 쓰세요.',
      '8-may kuni ota-onaga minnatdorchilik bildiriladigan kunni koreyscha yozing.',
      'Write in Korean the day for thanking parents on May 8.',
      'Напишите по-корейски название дня благодарности родителям 8 мая.',
    ),
    'Parents’ Day',
    ['parents-day', 'type-answer'],
  ),

  s5u9_007_reading_quiz: grammarReadingQuiz(
    '학생들이 선생님의 가르침과 수고에 감사하는 날은 5월 15일입니다.',
    ['스승의 날', '어버이날', '어린이날', '근로자의 날'],
    '스승의 날',
    L(
      '스승의 날에는 선생님께 감사하는 마음을 전해요.',
      'Ustozlar kunida o‘qituvchilarga minnatdorchilik bildiriladi.',
      'Teachers’ Day is a day to thank teachers.',
      'День учителя — день благодарности учителям.',
    ),
    ['teachers-day', 'commemorative-day'],
  ),

  s5u9_008_translate_builder: translateBuilder(
    L(
      '5월 15일은 스승의 날입니다.',
      '15-may — Ustozlar kuni.',
      'May 15 is Teachers’ Day.',
      '15 мая — День учителя.',
    ),
    [
      '스승의 날이에요',
      '5월 15일은',
      '어버이날이에요',
      '5월 1일은',
      '어린이날이에요',
      '식목일이에요',
    ],
    '5월 15일은 스승의 날이에요',
    L(
      '스승의 날은 5월 15일이에요.',
      'Ustozlar kuni 15-may.',
      'Teachers’ Day is May 15.',
      'День учителя отмечается 15 мая.',
    ),
    ['teachers-day', 'date'],
  ),

  s5u9_009_fill_in_blank: fillBlank(
    '10월 9일은 ___이에요.',
    ['한글날'],
    ['한글날', '개천절', '광복절', '현충일', '삼일절'],
    L(
      '10월 9일은 한글의 창제와 반포를 기념하는 한글날이에요.',
      '9-oktabr — Hangul kuni.',
      'October 9 is Hangeul Day.',
      '9 октября — День хангыля.',
    ),
    ['hangeul-day', 'date'],
  ),

  s5u9_010_type_answer: vocabTypeAnswer(
    '한글날',
    L(
      '10월 9일에 한글을 기념하는 날을 한국어로 쓰세요.',
      '9-oktabr kuni Hangulni nishonlaydigan kunni koreyscha yozing.',
      'Write in Korean the day commemorating Hangeul on October 9.',
      'Напишите по-корейски название дня хангыля 9 октября.',
    ),
    'Hangeul Day',
    ['hangeul-day', 'type-answer'],
  ),

  s5u9_011_translate_builder: translateBuilder(
    L(
      '한글날은 한글을 기념하는 날입니다.',
      'Hangul kuni — Hangulni nishonlaydigan kun.',
      'Hangeul Day commemorates Hangeul.',
      'День хангыля посвящён хангылю.',
    ),
    [
      '한글을',
      '나무를 심는 날이에요',
      '한글날은',
      '기념하는 날이에요',
      '근로자를',
      '부모님께 감사하는 날이에요',
    ],
    '한글날은 한글을 기념하는 날이에요',
    L(
      '기념하다는 뜻깊은 사건이나 대상을 기억하며 특별히 뜻을 나타내는 말이에요.',
      '기념하다 muhim voqea yoki narsani yodga olib nishonlashni bildiradi.',
      '기념하다 means to commemorate something meaningful.',
      '기념하다 означает отмечать или чтить что-либо значимое.',
    ),
    ['hangeul-day', 'commemorate'],
  ),

  s5u9_012_reading_quiz: grammarReadingQuiz(
    '5월 1일에는 근로자의 노력과 권리를 생각합니다. 이 날을 무엇이라고 해요?',
    ['근로자의 날', '스승의 날', '어버이날', '식목일'],
    '근로자의 날',
    L(
      '5월 1일은 근로자의 날이에요.',
      '1-may — Mehnatkashlar kuni.',
      'May 1 is Workers’ Day.',
      '1 мая — День труда.',
    ),
    ['workers-day', 'commemorative-day'],
  ),

  s5u9_013_cloze_passage: clozePassage(
    '5월 5일은 ___이고, 5월 8일은 ___이고, 5월 15일은 ___이에요.',
    ['어린이날', '어버이날', '스승의 날'],
    ['스승의 날', '어린이날', '어버이날', '한글날', '근로자의 날'],
    L(
      '5월의 대표적인 기념일 세 개를 구별해요.',
      'May oyidagi uchta asosiy esdalik kunini farqlaymiz.',
      'Distinguish three major commemorative days in May.',
      'Различаем три памятных дня в мае.',
    ),
    ['commemorative-day', 'date'],
  ),

  s5u9_014_word_arrange: wordArrange(
    [
      '진심으로',
      '스승의 날에는',
      '선생님께',
      '감사드려요',
      '부모님께',
      '나무를 심어요',
    ],
    '스승의 날에는 선생님께 진심으로 감사드려요',
    L(
      '스승의 날에는 선생님께 감사하는 마음을 표현할 수 있어요.',
      'Ustozlar kunida o‘qituvchiga chin dildan minnatdorchilik bildirish mumkin.',
      'On Teachers’ Day, you can sincerely thank your teacher.',
      'В День учителя можно искренне поблагодарить учителя.',
    ),
    ['teachers-day', 'sincerely'],
  ),

  s5u9_015_type_answer: vocabTypeAnswer(
    '근로자의 날',
    L(
      '5월 1일에 근로자를 기념하는 날을 한국어로 쓰세요.',
      '1-may kuni mehnatkashlarga bag‘ishlangan kunni koreyscha yozing.',
      'Write in Korean the day for workers on May 1.',
      'Напишите по-корейски название Дня труда 1 мая.',
    ),
    'Workers’ Day',
    ['workers-day', 'type-answer'],
  ),

  s5u9_016_translate_builder: translateBuilder(
    L(
      '어버이날에는 부모님께 진심으로 감사드립니다.',
      'Ota-onalar kunida ota-onamga chin dildan minnatdorchilik bildiraman.',
      'On Parents’ Day, I sincerely thank my parents.',
      'В День родителей я искренне благодарю родителей.',
    ),
    [
      '부모님께',
      '어버이날에는',
      '진심으로 감사드려요',
      '선생님께',
      '국기를 달아요',
      '나무를 심어요',
    ],
    '어버이날에는 부모님께 진심으로 감사드려요',
    L(
      '진심으로는 마음에서 우러나오는 태도를 나타내요.',
      '진심으로 chin dildan degan ma’noni bildiradi.',
      '진심으로 means sincerely.',
      '진심으로 означает искренне.',
    ),
    ['parents-day', 'sincerely'],
  ),

  s5u9_017_reading_quiz: grammarReadingQuiz(
    '다음 중 한글과 직접 관련된 기념일을 고르세요.',
    ['한글날', '식목일', '근로자의 날', '어버이날'],
    '한글날',
    L(
      '한글날은 한글을 기념하는 날이에요.',
      'Hangul kuni Hangulga bag‘ishlangan.',
      'Hangeul Day commemorates Hangeul.',
      'День хангыля посвящён хангылю.',
    ),
    ['hangeul-day', 'meaning'],
  ),

  s5u9_018_fill_in_blank: fillBlank(
    '5월 1일은 ___이고 5월 5일은 어린이날이에요.',
    ['근로자의 날'],
    ['근로자의 날', '스승의 날', '한글날', '현충일', '광복절'],
    L(
      '근로자의 날은 5월 1일이에요.',
      'Mehnatkashlar kuni 1-may.',
      'Workers’ Day is May 1.',
      'День труда — 1 мая.',
    ),
    ['workers-day', 'date'],
  ),

  s5u9_019_cloze_passage: clozePassage(
    '___에는 부모님께 감사하고, ___에는 선생님께 감사해요.',
    ['어버이날', '스승의 날'],
    ['스승의 날', '어버이날', '어린이날', '식목일', '한글날'],
    L(
      '감사하는 대상에 따라 기념일을 구별해요.',
      'Kimga minnatdorchilik bildirilishiga qarab bayramlarni farqlaymiz.',
      'Distinguish the days by who is being thanked.',
      'Различаем дни по тому, кого благодарят.',
    ),
    ['parents-day', 'teachers-day'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 왜 이 날을 기념해요?
  // 역사적 기념일과 의미
  // ──────────────────────────────────────────────────────────

  s5u9_021_reading_quiz: grammarReadingQuiz(
    '3월 1일에는 일제 강점기에 독립을 요구하며 일어난 3·1 운동을 기억합니다.',
    ['삼일절', '광복절', '개천절', '현충일'],
    '삼일절',
    L(
      '삼일절은 3·1 독립운동을 기념하는 날이에요.',
      '1-mart kuni mustaqillik harakati xotirlanadi.',
      'March First Movement Day commemorates the March 1st Independence Movement.',
      'День 1 марта посвящён движению за независимость 1 марта.',
    ),
    ['march-first-movement-day', 'history'],
  ),

  s5u9_022_type_answer: vocabTypeAnswer(
    '삼일절',
    L(
      '3·1 독립운동을 기념하는 3월 1일의 이름을 쓰세요.',
      '1-mart mustaqillik harakatini xotirlaydigan kun nomini koreyscha yozing.',
      'Write the Korean name for March 1st Independence Movement Day.',
      'Напишите по-корейски название дня движения за независимость 1 марта.',
    ),
    'March First Independence Movement Day',
    ['march-first-movement-day', 'type-answer'],
  ),

  s5u9_023_translate_builder: translateBuilder(
    L(
      '삼일절은 독립운동을 기념하는 날입니다.',
      '1-mart kuni mustaqillik harakati xotirlanadi.',
      'March First Movement Day commemorates the independence movement.',
      'День 1 марта посвящён движению за независимость.',
    ),
    [
      '삼일절은',
      '나무를 심는',
      '독립운동을',
      '기념하는 날이에요',
      '근로자를',
      '한글을',
    ],
    '삼일절은 독립운동을 기념하는 날이에요',
    L(
      '삼일절의 핵심 의미는 독립운동을 기억하는 것이에요.',
      '삼일절ning asosiy ma’nosi mustaqillik harakatini xotirlash.',
      'The key meaning of 삼일절 is commemorating the independence movement.',
      'Главный смысл 삼일절 — память о движении за независимость.',
    ),
    ['march-first-movement-day', 'commemorate'],
  ),

  s5u9_024_fill_in_blank: fillBlank(
    '6월 6일은 ___이에요.',
    ['현충일'],
    ['현충일', '광복절', '개천절', '삼일절', '한글날'],
    L(
      '6월 6일은 현충일이에요.',
      '6-iyun — Xotira kuni.',
      'June 6 is Memorial Day.',
      '6 июня — День памяти.',
    ),
    ['memorial-day-korea', 'date'],
  ),

  s5u9_025_word_arrange: wordArrange(
    [
      '사람들을',
      '나라를 위해',
      '현충일에는',
      '기려요',
      '희생한',
      '나무를 심어요',
    ],
    '현충일에는 나라를 위해 희생한 사람들을 기려요',
    L(
      '현충일에는 나라를 위해 희생한 사람들을 기억해요.',
      'Xotira kunida vatan uchun qurbon bo‘lganlar yodga olinadi.',
      'On Memorial Day, people honor those who sacrificed for the country.',
      'В День памяти чтят тех, кто пожертвовал собой ради страны.',
    ),
    ['memorial-day-korea', 'history'],
  ),

  s5u9_026_type_answer: vocabTypeAnswer(
    '현충일',
    L(
      '6월 6일에 나라를 위해 희생한 사람들을 기리는 날을 쓰세요.',
      '6-iyun kuni vatan uchun qurbon bo‘lganlarni xotirlash kuni nomini yozing.',
      'Write the Korean name of the day honoring those who sacrificed for the country on June 6.',
      'Напишите по-корейски название дня памяти погибших за страну 6 июня.',
    ),
    'Memorial Day',
    ['memorial-day-korea', 'type-answer'],
  ),

  s5u9_027_reading_quiz: grammarReadingQuiz(
    '8월 15일에는 한국이 일본의 식민 지배에서 벗어난 것을 기념합니다.',
    ['광복절', '삼일절', '현충일', '개천절'],
    '광복절',
    L(
      '8월 15일은 광복절이에요.',
      '15-avgust — Koreya Ozodlik kuni.',
      'August 15 is Korean Liberation Day.',
      '15 августа — День освобождения Кореи.',
    ),
    ['liberation-day-korea', 'history'],
  ),

  s5u9_028_translate_builder: translateBuilder(
    L(
      '광복절은 한국의 광복을 기념하는 날입니다.',
      'Ozodlik kuni Koreyaning ozod bo‘lganini nishonlaydi.',
      'Liberation Day commemorates Korea’s liberation.',
      'День освобождения посвящён освобождению Кореи.',
    ),
    [
      '기념하는 날이에요',
      '광복절은',
      '한국의 광복을',
      '나무를',
      '선생님께',
      '어린이를',
    ],
    '광복절은 한국의 광복을 기념하는 날이에요',
    L(
      '광복절은 한국 역사와 관련된 중요한 기념일이에요.',
      '광복절 Koreya tarixiga oid muhim kun.',
      'Liberation Day is an important Korean historical commemorative day.',
      'День освобождения — важная историческая дата Кореи.',
    ),
    ['liberation-day-korea', 'commemorate'],
  ),

  s5u9_029_fill_in_blank: fillBlank(
    '8월 15일은 ___이에요.',
    ['광복절'],
    ['광복절', '현충일', '삼일절', '개천절', '식목일'],
    L(
      '광복절은 8월 15일이에요.',
      'Koreya Ozodlik kuni 15-avgust.',
      'Liberation Day is August 15.',
      'День освобождения — 15 августа.',
    ),
    ['liberation-day-korea', 'date'],
  ),

  s5u9_030_type_answer: vocabTypeAnswer(
    '광복절',
    L(
      '8월 15일에 한국의 광복을 기념하는 날을 쓰세요.',
      '15-avgust kuni Koreya ozodligini nishonlaydigan kunni koreyscha yozing.',
      'Write the Korean name for the day commemorating Korea’s liberation on August 15.',
      'Напишите по-корейски название Дня освобождения Кореи 15 августа.',
    ),
    'Korean Liberation Day',
    ['liberation-day-korea', 'type-answer'],
  ),

  s5u9_031_translate_builder: translateBuilder(
    L(
      '개천절은 나라가 세워진 것을 기념하는 날입니다.',
      'Davlat tashkil topganini xotirlaydigan kun — 개천절.',
      'National Foundation Day commemorates the founding of the country.',
      'День основания государства посвящён основанию страны.',
    ),
    [
      '나라가 세워진 것을',
      '개천절은',
      '기념하는 날이에요',
      '한글을',
      '나무를 심는',
      '선생님께 감사하는',
    ],
    '개천절은 나라가 세워진 것을 기념하는 날이에요',
    L(
      '개천절은 나라의 건국과 관련된 기념일이에요.',
      '개천절 davlatning tashkil topishi bilan bog‘liq.',
      'National Foundation Day is connected with the founding of the country.',
      'День основания государства связан с основанием страны.',
    ),
    ['national-foundation-day-korea', 'found-country'],
  ),

  s5u9_032_reading_quiz: grammarReadingQuiz(
    '10월 3일이며 한국의 건국과 관련된 날을 고르세요.',
    ['개천절', '한글날', '광복절', '삼일절'],
    '개천절',
    L(
      '10월 3일은 개천절이에요.',
      '3-oktabr — Koreya davlati tashkil topgan kun.',
      'October 3 is National Foundation Day.',
      '3 октября — День основания государства.',
    ),
    ['national-foundation-day-korea', 'date'],
  ),

  s5u9_033_cloze_passage: clozePassage(
    '3월 1일은 ___, 6월 6일은 ___, 8월 15일은 ___이에요.',
    ['삼일절', '현충일', '광복절'],
    ['광복절', '삼일절', '현충일', '개천절', '한글날'],
    L(
      '한국의 대표적인 역사 기념일과 날짜를 구별해요.',
      'Koreyaning asosiy tarixiy kunlari va sanalarini farqlaymiz.',
      'Distinguish major Korean historical commemorative days and their dates.',
      'Различаем основные исторические памятные дни Кореи и их даты.',
    ),
    ['history', 'date'],
  ),

  s5u9_034_word_arrange: wordArrange(
    [
      '기념해요',
      '8월 15일에',
      '한국의 광복을',
      '나무를 심고',
      '부모님께 감사하고',
      '한글을 만들어요',
    ],
    '8월 15일에 한국의 광복을 기념해요',
    L(
      '8월 15일 광복절의 의미를 문장으로 연결해요.',
      '15-avgust Ozodlik kunining ma’nosi gapda ifodalanadi.',
      'Connect the date of Liberation Day with its meaning.',
      'Связываем дату Дня освобождения с его значением.',
    ),
    ['liberation-day-korea', 'commemorate'],
  ),

  s5u9_035_type_answer: vocabTypeAnswer(
    '개천절',
    L(
      '10월 3일에 한국의 건국을 기념하는 날을 쓰세요.',
      '3-oktabr kuni Koreya davlati asos solinganini nishonlaydigan kunni yozing.',
      'Write the Korean name for National Foundation Day on October 3.',
      'Напишите по-корейски название Дня основания государства 3 октября.',
    ),
    'National Foundation Day',
    ['national-foundation-day-korea', 'type-answer'],
  ),

  s5u9_036_reading_quiz: grammarReadingQuiz(
    '다음 중 나라가 다른 세력의 지배에서 벗어나 스스로 나라를 운영하게 되는 것을 뜻하는 동사는 무엇이에요?',
    ['독립하다', '통일하다', '기념하다', '행진을 하다'],
    '독립하다',
    L(
      '독립하다는 다른 나라나 세력의 지배에서 벗어나는 뜻이에요.',
      '독립하다 boshqa hukmronlikdan chiqib mustaqil bo‘lishni bildiradi.',
      '독립하다 means to become independent.',
      '독립하다 означает получить независимость.',
    ),
    ['become-independent', 'history'],
  ),

  s5u9_037_translate_builder: translateBuilder(
    L(
      '그 나라는 오랜 노력 끝에 독립했습니다.',
      'U davlat uzoq sa’y-harakatdan keyin mustaqillikka erishdi.',
      'The country became independent after a long struggle.',
      'Страна получила независимость после долгой борьбы.',
    ),
    [
      '독립했어요',
      '오랜 노력 끝에',
      '그 나라는',
      '통일했어요',
      '기념식을 했어요',
      '국기를 달았어요',
    ],
    '그 나라는 오랜 노력 끝에 독립했어요',
    L(
      '독립하다는 역사적 사건을 설명할 때 자주 쓰는 말이에요.',
      '독립하다 tarixiy hodisalarni tushuntirishda ishlatiladi.',
      '독립하다 is useful when describing historical events.',
      '독립하다 часто используется при описании исторических событий.',
    ),
    ['become-independent', 'history'],
  ),

  s5u9_038_fill_in_blank: fillBlank(
    '나뉘어 있던 지역을 하나로 합치는 것은 ___라고 해요.',
    ['통일하다'],
    ['통일하다', '독립하다', '기념하다', '나무를 심다', '묵념'],
    L(
      '통일하다는 나뉘어 있는 것을 하나로 합친다는 뜻이에요.',
      '통일하다 bo‘lingan narsalarni birlashtirishni bildiradi.',
      '통일하다 means to unify divided parts.',
      '통일하다 означает объединять разделённые части.',
    ),
    ['unify', 'meaning'],
  ),

  s5u9_039_cloze_passage: clozePassage(
    '다른 나라의 지배에서 벗어나는 것은 ___이고, 나뉜 것을 하나로 만드는 것은 ___이에요.',
    ['독립하다', '통일하다'],
    ['통일하다', '독립하다', '기념하다', '행진을 하다', '나라를 세우다'],
    L(
      '독립과 통일은 서로 다른 역사 개념이에요.',
      'Mustaqillik va birlashish turli tarixiy tushunchalar.',
      'Independence and unification are different historical concepts.',
      'Независимость и объединение — разные исторические понятия.',
    ),
    ['become-independent', 'unify'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 기념일에는 무엇을 해요?
  // 기념 행동
  // ──────────────────────────────────────────────────────────

  s5u9_041_reading_quiz: grammarReadingQuiz(
    '특별한 날을 기념하기 위해 사람들이 한곳에 모여 공식적인 행사를 열었습니다.',
    ['기념식을 하다', '나무를 심다', '꽃을 달다', '국기를 달다'],
    '기념식을 하다',
    L(
      '공식적인 기념 행사를 여는 것은 기념식을 하다라고 해요.',
      'Rasmiy esdalik marosimini o‘tkazish 기념식을 하다 deyiladi.',
      '기념식을 하다 means to hold a commemorative ceremony.',
      '기념식을 하다 означает проводить памятную церемонию.',
    ),
    ['hold-commemorative-ceremony', 'ceremony'],
  ),

  s5u9_042_type_answer: vocabTypeAnswer(
    '기념식을 하다',
    L(
      '특별한 날이나 사건을 기념하기 위한 공식 행사를 여는 표현을 쓰세요.',
      'Maxsus kun yoki hodisani nishonlash uchun rasmiy marosim o‘tkazish iborasini yozing.',
      'Write the Korean expression meaning “to hold a commemorative ceremony.”',
      'Напишите по-корейски «проводить памятную церемонию».',
    ),
    'to hold a commemorative ceremony',
    ['hold-commemorative-ceremony', 'type-answer'],
  ),

  s5u9_043_translate_builder: translateBuilder(
    L(
      '기념일에 공식적인 기념식을 했습니다.',
      'Esdalik kunida rasmiy marosim o‘tkazildi.',
      'A formal commemorative ceremony was held on the special day.',
      'В памятный день провели официальную церемонию.',
    ),
    [
      '공식적인',
      '기념일에',
      '기념식을 했어요',
      '나무를 심었어요',
      '꽃을 달았어요',
      '묵념만 했어요',
    ],
    '기념일에 공식적인 기념식을 했어요',
    L(
      '기념식은 기념일에 열리는 공식 행사예요.',
      '기념식 — esdalik kunidagi rasmiy marosim.',
      'A 기념식 is a formal ceremony held to commemorate something.',
      '기념식 — официальная памятная церемония.',
    ),
    ['hold-commemorative-ceremony', 'commemorative-day'],
  ),

  s5u9_044_fill_in_blank: fillBlank(
    '식목일에는 ___ 행사를 하기도 해요.',
    ['나무를 심는'],
    ['나무를 심는', '국기를 다는', '묵념을 하는', '꽃을 다는', '행진을 하는'],
    L(
      '식목일은 나무 심기와 관련된 날이에요.',
      'Daraxt ekish kuni daraxt ekish bilan bog‘liq.',
      'Arbor Day is associated with planting trees.',
      'День посадки деревьев связан с посадкой деревьев.',
    ),
    ['arbor-day', 'plant-tree'],
  ),

  s5u9_045_word_arrange: wordArrange(
    [
      '나무를 심어요',
      '식목일에는',
      '자연을 위해',
      '국기를 달아요',
      '묵념을 해요',
      '행진을 해요',
    ],
    '식목일에는 자연을 위해 나무를 심어요',
    L(
      '식목일과 나무 심기 행동을 연결해요.',
      'Daraxt ekish kuni va daraxt ekish harakati bog‘lanadi.',
      'Connect Arbor Day with planting trees.',
      'Связываем День посадки деревьев с посадкой деревьев.',
    ),
    ['arbor-day', 'plant-tree'],
  ),

  s5u9_046_type_answer: vocabTypeAnswer(
    '나무를 심다',
    L(
      '식목일에 대표적으로 하는 행동을 한국어로 쓰세요.',
      'Daraxt ekish kunida qilinadigan asosiy ishni koreyscha yozing.',
      'Write the Korean expression for the typical Arbor Day action: “to plant a tree.”',
      'Напишите по-корейски типичное действие в День посадки деревьев: «сажать дерево».',
    ),
    'to plant a tree',
    ['plant-tree', 'type-answer'],
  ),

  s5u9_047_reading_quiz: grammarReadingQuiz(
    '국가의 중요한 날에 집이나 건물 앞에 태극기를 걸었습니다. 이 행동을 무엇이라고 해요?',
    ['국기를 달다', '꽃을 달다', '행진을 하다', '기념식을 하다'],
    '국기를 달다',
    L(
      '국가의 중요한 날에 국기를 거는 행동이에요.',
      'Muhim davlat kunida bayroq osish.',
      'This means to display the national flag.',
      'Это означает вывешивать государственный флаг.',
    ),
    ['display-national-flag', 'flag'],
  ),

  s5u9_048_translate_builder: translateBuilder(
    L(
      '광복절에는 집에 국기를 달기도 합니다.',
      'Ozodlik kunida uyga davlat bayrog‘i osiladi.',
      'People may display the national flag at home on Liberation Day.',
      'В День освобождения дома могут вывешивать государственный флаг.',
    ),
    [
      '광복절에는',
      '집에',
      '국기를 달기도 해요',
      '나무를 심어요',
      '꽃만 달아요',
      '불꽃놀이만 해요',
    ],
    '광복절에는 집에 국기를 달기도 해요',
    L(
      '국기를 달다는 국가 기념일과 함께 자주 쓰는 표현이에요.',
      '국기를 달다 davlat bayramlari bilan tez-tez ishlatiladi.',
      '국기를 달다 is commonly used when talking about national commemorative days.',
      '국기를 달다 часто употребляется при разговоре о государственных памятных днях.',
    ),
    ['liberation-day-korea', 'display-national-flag'],
  ),

  s5u9_049_fill_in_blank: fillBlank(
    '감사의 뜻으로 가슴에 ___.',
    ['꽃을 달았어요'],
    [
      '꽃을 달았어요',
      '국기를 달았어요',
      '나무를 심었어요',
      '묵념했어요',
      '독립했어요',
    ],
    L(
      '꽃을 달다는 옷이나 가슴에 꽃을 붙이는 뜻이에요.',
      '꽃을 달다 kiyim yoki ko‘krakka gul taqishni bildiradi.',
      '꽃을 달다 means to pin or wear a flower.',
      '꽃을 달다 означает прикреплять цветок к одежде.',
    ),
    ['wear-flower', 'gratitude'],
  ),

  s5u9_050_type_answer: vocabTypeAnswer(
    '국기를 달다',
    L(
      '국가의 중요한 날에 집이나 건물에 국기를 거는 행동을 쓰세요.',
      'Muhim davlat kunida uy yoki binoga bayroq osish iborasini yozing.',
      'Write the Korean expression meaning “to display the national flag.”',
      'Напишите по-корейски «вывешивать государственный флаг».',
    ),
    'to display the national flag',
    ['display-national-flag', 'type-answer'],
  ),

  s5u9_051_translate_builder: translateBuilder(
    L(
      '기념 행사에서 사람들이 거리 행진을 했습니다.',
      'Bayram tadbirida odamlar ko‘chada yurish qildilar.',
      'People marched through the streets at the commemorative event.',
      'На памятном мероприятии люди прошли шествием по улицам.',
    ),
    [
      '거리 행진을 했어요',
      '기념 행사에서',
      '사람들이',
      '나무를 심었어요',
      '묵념만 했어요',
      '국기를 내렸어요',
    ],
    '기념 행사에서 사람들이 거리 행진을 했어요',
    L(
      '행진을 하다는 여러 사람이 줄을 맞추어 이동하는 행동이에요.',
      '행진을 하다 odamlarning saf bo‘lib yurishini bildiradi.',
      '행진을 하다 means to march in a procession.',
      '행진을 하다 означает идти шествием.',
    ),
    ['march-in-procession', 'ceremony'],
  ),

  s5u9_052_reading_quiz: grammarReadingQuiz(
    '여러 사람이 기념 행사에서 줄을 맞추어 거리를 걸었습니다.',
    ['행진을 하다', '묵념', '꽃을 달다', '국기를 달다'],
    '행진을 하다',
    L(
      '줄을 맞추어 함께 걸어가는 것은 행진을 하다예요.',
      'Saf bo‘lib birga yurish 행진을 하다 deyiladi.',
      'Walking together in formation is 행진을 하다.',
      'Организованно идти колонной — 행진을 하다.',
    ),
    ['march-in-procession', 'meaning'],
  ),

  s5u9_054_word_arrange: wordArrange(
    [
      '불꽃놀이를 하기도 해요',
      '큰 축하 행사에서는',
      '밤에',
      '묵념만 하고',
      '나무를 심고',
      '국기를 내려요',
    ],
    '큰 축하 행사에서는 밤에 불꽃놀이를 하기도 해요',
    L(
      '불꽃놀이는 축하 행사에서 볼 수 있는 활동이에요.',
      'Mushakbozlik bayram tadbirlarida uchraydi.',
      'Fireworks can be part of a large celebration.',
      'Фейерверк может быть частью большого праздника.',
    ),
    ['have-fireworks', 'celebration'],
  ),

  s5u9_055_type_answer: vocabTypeAnswer(
    '불꽃놀이를 하다',
    L(
      '축하 행사에서 하늘에 여러 불꽃을 터뜨리는 활동을 쓰세요.',
      'Bayramda osmonda mushaklar otish iborasini koreyscha yozing.',
      'Write the Korean expression meaning “to have fireworks.”',
      'Напишите по-корейски «устраивать фейерверк».',
    ),
    'to have fireworks',
    ['have-fireworks', 'type-answer'],
  ),

  s5u9_056_reading_quiz: grammarReadingQuiz(
    '죽은 사람들을 생각하면서 모두 조용히 서서 아무 말도 하지 않았습니다.',
    ['묵념', '행진', '불꽃놀이', '기념식'],
    '묵념',
    L(
      '말없이 조용히 추모하는 것은 묵념이에요.',
      'Jim turib xotirlash — 묵념.',
      'A silent tribute is 묵념.',
      'Молчаливое поминовение — 묵념.',
    ),
    ['silent-tribute', 'memorial'],
  ),

  s5u9_057_translate_builder: translateBuilder(
    L(
      '현충일 기념식에서 묵념을 했습니다.',
      'Xotira kuni marosimida sukut saqlandi.',
      'A silent tribute was observed at the Memorial Day ceremony.',
      'На церемонии в День памяти почтили погибших минутой молчания.',
    ),
    [
      '묵념을 했어요',
      '현충일',
      '기념식에서',
      '불꽃놀이를 했어요',
      '행진만 했어요',
      '나무를 심었어요',
    ],
    '현충일 기념식에서 묵념을 했어요',
    L(
      '현충일의 추모 의미와 묵념을 연결해요.',
      'Xotira kuni va sukut saqlash ma’nosi bog‘lanadi.',
      'Connect Memorial Day with a silent tribute.',
      'Связываем День памяти с минутой молчания.',
    ),
    ['memorial-day-korea', 'silent-tribute'],
  ),

  s5u9_058_fill_in_blank: fillBlank(
    '현충일에는 희생한 사람들을 기억하며 ___을 해요.',
    ['묵념'],
    ['묵념', '불꽃놀이', '행진', '나무 심기', '통일'],
    L(
      '추모 행사에서는 묵념을 할 수 있어요.',
      'Xotira tadbirida sukut saqlash mumkin.',
      'A silent tribute may be observed at a memorial event.',
      'На памятной церемонии может проводиться минута молчания.',
    ),
    ['silent-tribute', 'memorial-day-korea'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 기념일의 분위기와 의미
  // 공휴일·곳곳·진심으로 + 역사 행동
  // ──────────────────────────────────────────────────────────

  s5u9_061_reading_quiz: grammarReadingQuiz(
    '국가에서 공식적으로 쉬도록 정한 날이라서 학교와 회사가 쉬는 경우가 많습니다.',
    ['공휴일', '기념식', '묵념', '행진'],
    '공휴일',
    L(
      '국가가 공식적으로 정한 쉬는 날을 공휴일이라고 해요.',
      'Davlat tomonidan belgilangan dam olish kuni 공휴일 deyiladi.',
      'An officially designated holiday is a 공휴일.',
      'Официальный государственный выходной называется 공휴일.',
    ),
    ['public-holiday', 'calendar'],
  ),

  s5u9_062_type_answer: vocabTypeAnswer(
    '공휴일',
    L(
      '국가에서 공식적으로 쉬도록 정한 날을 한국어로 쓰세요.',
      'Davlat rasmiy dam olish kuni deb belgilagan kunni koreyscha yozing.',
      'Write the Korean word for an officially designated public holiday.',
      'Напишите по-корейски «государственный выходной».',
    ),
    'public holiday',
    ['public-holiday', 'type-answer'],
  ),

  s5u9_063_translate_builder: translateBuilder(
    L(
      '공휴일에는 학교와 회사가 쉬는 경우가 많습니다.',
      'Davlat dam olish kunlarida maktab va kompaniyalar ko‘pincha ishlamaydi.',
      'Schools and companies are often closed on public holidays.',
      'В государственные праздники школы и компании часто не работают.',
    ),
    [
      '쉬는 경우가 많아요',
      '공휴일에는',
      '학교와 회사가',
      '기념식을 하지 않아요',
      '항상 일해요',
      '나무만 심어요',
    ],
    '공휴일에는 학교와 회사가 쉬는 경우가 많아요',
    L(
      '공휴일은 공식적으로 쉬는 날을 뜻해요.',
      '공휴일 rasmiy dam olish kunini anglatadi.',
      '공휴일 means an officially designated day off.',
      '공휴일 означает официальный выходной день.',
    ),
    ['public-holiday', 'meaning'],
  ),

  s5u9_064_fill_in_blank: fillBlank(
    '기념일을 맞아 도시 ___에 국기가 걸렸어요.',
    ['곳곳'],
    ['곳곳', '진심으로', '공휴일', '묵념', '독립'],
    L(
      '곳곳은 여러 장소, 이곳저곳이라는 뜻이에요.',
      '곳곳 turli joylarda degan ma’noni bildiradi.',
      '곳곳 means throughout various places.',
      '곳곳 означает «в разных местах», «повсюду».',
    ),
    ['everywhere', 'meaning'],
  ),

  s5u9_065_word_arrange: wordArrange(
    [
      '국기가 걸렸어요',
      '도시 곳곳에',
      '기념일을 맞아',
      '나무만 심었어요',
      '부모님께 감사했어요',
      '학교가 하나 생겼어요',
    ],
    '기념일을 맞아 도시 곳곳에 국기가 걸렸어요',
    L(
      '곳곳을 실제 기념일 풍경에 사용해요.',
      '곳곳 so‘zi bayram manzarasida ishlatiladi.',
      'Use 곳곳 to describe a commemorative-day scene throughout a city.',
      'Используем 곳곳 для описания праздничного оформления по всему городу.',
    ),
    ['everywhere', 'display-national-flag'],
  ),

  s5u9_066_type_answer: vocabTypeAnswer(
    '곳곳',
    L(
      '여러 장소나 이곳저곳이라는 뜻의 단어를 쓰세요.',
      '“Turli joylarda, har yerda” ma’nosidagi koreyscha so‘zni yozing.',
      'Write the Korean word meaning “throughout various places.”',
      'Напишите корейское слово со значением «в разных местах; повсюду».',
    ),
    'throughout; here and there',
    ['everywhere', 'type-answer'],
  ),

  s5u9_067_reading_quiz: grammarReadingQuiz(
    '학생들이 선생님께 형식적으로 말한 것이 아니라 정말 마음에서 우러나오는 감사 인사를 했습니다.',
    ['진심으로', '곳곳', '공휴일', '묵념'],
    '진심으로',
    L(
      '마음에서 우러나오는 태도는 진심으로라고 표현할 수 있어요.',
      'Chin dildan bo‘lgan munosabat 진심으로 bilan ifodalanadi.',
      '진심으로 expresses sincerity.',
      '진심으로 означает «искренне».',
    ),
    ['sincerely', 'gratitude'],
  ),

  s5u9_068_translate_builder: translateBuilder(
    L(
      '선생님께 진심으로 감사드립니다.',
      'Ustozimga chin dildan minnatdorchilik bildiraman.',
      'I sincerely thank my teacher.',
      'Я искренне благодарю учителя.',
    ),
    ['선생님께', '진심으로', '감사드려요', '곳곳에', '행진해요', '독립해요'],
    '선생님께 진심으로 감사드려요',
    L(
      '스승의 날 같은 감사의 상황에서 자연스럽게 사용할 수 있어요.',
      'Ustozlar kuni kabi minnatdorchilik vaziyatida tabiiy ishlatiladi.',
      'This is natural in situations of gratitude such as Teachers’ Day.',
      'Так естественно говорить в ситуациях благодарности, например в День учителя.',
    ),
    ['teachers-day', 'sincerely'],
  ),

  s5u9_069_fill_in_blank: fillBlank(
    '새로운 국가를 만드는 것을 ___라고 표현할 수 있어요.',
    ['나라를 세우다'],
    ['나라를 세우다', '통일하다', '독립하다', '기념하다', '행진을 하다'],
    L(
      '나라를 세우다는 국가를 새로 만든다는 뜻이에요.',
      '나라를 세우다 yangi davlat barpo etishni bildiradi.',
      '나라를 세우다 means to found a country.',
      '나라를 세우다 означает основать государство.',
    ),
    ['found-country', 'history'],
  ),

  s5u9_070_type_answer: vocabTypeAnswer(
    '나라를 세우다',
    L(
      '새로운 국가를 만들다는 뜻의 표현을 쓰세요.',
      'Yangi davlat barpo etish ma’nosidagi iborani koreyscha yozing.',
      'Write the Korean expression meaning “to found a country.”',
      'Напишите по-корейски «основать государство».',
    ),
    'to found a country',
    ['found-country', 'type-answer'],
  ),

  s5u9_071_translate_builder: translateBuilder(
    L(
      '나라를 세운 일을 기념하는 날도 있습니다.',
      'Davlat tashkil topganini nishonlaydigan kunlar ham bor.',
      'Some commemorative days celebrate the founding of a country.',
      'Есть памятные дни, посвящённые основанию государства.',
    ),
    [
      '기념하는 날도 있어요',
      '나라를 세운 일을',
      '독립하는 날만 있어요',
      '나무를 심는 날만 있어요',
      '왕이 태어나고',
      '공휴일이 아니에요',
    ],
    '나라를 세운 일을 기념하는 날도 있어요',
    L(
      '기념일이 만들어지는 이유는 나라와 문화마다 다양해요.',
      'Esdalik kunlarining sababi mamlakat va madaniyatga qarab turlicha.',
      'Reasons for commemorative days vary by country and culture.',
      'Причины появления памятных дней различаются в разных странах и культурах.',
    ),
    ['found-country', 'commemorate'],
  ),

  s5u9_072_reading_quiz: grammarReadingQuiz(
    '어떤 나라에서는 왕이 태어난 날짜를 특별한 날로 정해 축하하기도 합니다.',
    ['왕이 태어나다', '나라를 세우다', '독립하다', '통일하다'],
    '왕이 태어나다',
    L(
      '왕의 탄생과 관련된 기념일도 있을 수 있어요.',
      'Qirol tug‘ilishi bilan bog‘liq bayramlar ham bo‘lishi mumkin.',
      'Some commemorative days can be connected with a king’s birth.',
      'Некоторые памятные дни могут быть связаны с рождением короля.',
    ),
    ['king-be-born', 'commemorative-day'],
  ),

  s5u9_073_cloze_passage: clozePassage(
    '새로운 국가를 만드는 것은 ___이고, 다른 지배에서 벗어나는 것은 ___이고, 나뉜 것을 하나로 만드는 것은 ___예요.',
    ['나라를 세우다', '독립하다', '통일하다'],
    ['통일하다', '나라를 세우다', '독립하다', '기념하다', '행진을 하다'],
    L(
      '서로 비슷해 보이는 역사 관련 동사를 구별해요.',
      'Tarixga oid o‘xshash fe’llarni farqlaymiz.',
      'Distinguish several related historical expressions.',
      'Различаем несколько исторических выражений.',
    ),
    ['history', 'vocabulary-contrast'],
  ),

  s5u9_075_type_answer: vocabTypeAnswer(
    '진심으로',
    L(
      '거짓 없이 마음에서 우러나오는 태도를 나타내는 말을 쓰세요.',
      '“Chin dildan, samimiy ravishda” ma’nosidagi koreyscha so‘zni yozing.',
      'Write the Korean word meaning “sincerely.”',
      'Напишите по-корейски «искренне».',
    ),
    'sincerely',
    ['sincerely', 'type-answer'],
  ),

  s5u9_076_reading_quiz: grammarReadingQuiz(
    '다음 중 뜻이 가장 다른 하나를 고르세요. “독립하다, 통일하다, 나라를 세우다”는 역사 변화와 관련되어 있습니다.',
    ['꽃을 달다', '독립하다', '통일하다', '나라를 세우다'],
    '꽃을 달다',
    L(
      '꽃을 달다는 감사나 기념 행동이고 나머지는 역사적 변화와 관련돼요.',
      '꽃을 달다 minnatdorchilik harakati, qolganlari tarixiy o‘zgarishga oid.',
      '꽃을 달다 is a commemorative action, while the others describe historical change.',
      '꽃을 달다 — памятное действие, а остальные выражения связаны с историческими изменениями.',
    ),
    ['vocabulary-contrast', 'history'],
  ),

  s5u9_077_translate_builder: translateBuilder(
    L(
      '기념일을 맞아 도시 곳곳에서 행사가 열렸습니다.',
      'Esdalik kuni munosabati bilan shaharning turli joylarida tadbirlar o‘tkazildi.',
      'Events were held throughout the city for the commemorative day.',
      'К памятному дню мероприятия прошли по всему городу.',
    ),
    [
      '도시 곳곳에서',
      '기념일을 맞아',
      '행사가 열렸어요',
      '모든 학교가 사라졌어요',
      '나무만 심었어요',
      '독립했다고요',
    ],
    '기념일을 맞아 도시 곳곳에서 행사가 열렸어요',
    L(
      '곳곳은 실제 행사 장소를 설명할 때 유용해요.',
      '곳곳 tadbir joylarini tasvirlashda foydali.',
      '곳곳 is useful when describing events occurring throughout an area.',
      '곳곳 удобно использовать для описания мероприятий в разных местах.',
    ),
    ['everywhere', 'commemorative-day'],
  ),

  s5u9_078_fill_in_blank: fillBlank(
    '특별한 날에 공식 행사를 여는 것은 ___예요.',
    ['기념식을 하다'],
    ['기념식을 하다', '통일하다', '독립하다', '왕이 태어나다', '공휴일'],
    L(
      '기념식을 하다는 공식적인 기념 행사를 여는 뜻이에요.',
      '기념식을 하다 rasmiy marosim o‘tkazishni bildiradi.',
      '기념식을 하다 means to hold a commemorative ceremony.',
      '기념식을 하다 означает проводить памятную церемонию.',
    ),
    ['hold-commemorative-ceremony', 'meaning'],
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 한글날에 대해 설명해요
  // Unit 9 핵심 주제 통합
  // ──────────────────────────────────────────────────────────

  s5u9_081_reading_quiz: grammarReadingQuiz(
    '10월 9일에 한국에서는 한글과 관련된 여러 행사를 합니다. 한글의 의미와 가치를 다시 생각하는 날입니다.',
    ['한글날', '개천절', '광복절', '스승의 날'],
    '한글날',
    L(
      '10월 9일 한글과 관련된 기념일은 한글날이에요.',
      '9-oktabrdagi Hangulga oid kun — 한글날.',
      'The commemorative day related to Hangeul on October 9 is Hangeul Day.',
      'Памятный день, посвящённый хангылю 9 октября, — 한글날.',
    ),
    ['hangeul-day', 'integration'],
  ),

  s5u9_082_type_answer: vocabTypeAnswer(
    '기념하다',
    L(
      '뜻깊은 사건이나 사람을 기억하며 특별히 뜻을 나타내다는 의미의 동사를 쓰세요.',
      'Muhim voqea yoki odamni eslab nishonlamoq ma’nosidagi fe’lni yozing.',
      'Write the Korean verb meaning “to commemorate.”',
      'Напишите корейский глагол со значением «отмечать; чтить память».',
    ),
    'to commemorate',
    ['commemorate', 'type-answer'],
  ),

  s5u9_083_translate_builder: translateBuilder(
    L(
      '한글날은 한글의 창제와 반포를 기념하는 날입니다.',
      'Hangul kuni Hangul yaratilishi va e’lon qilinishini nishonlaydi.',
      'Hangeul Day commemorates the creation and proclamation of Hangeul.',
      'День хангыля посвящён созданию и провозглашению хангыля.',
    ),
    [
      '한글날은',
      '기념하는 날이에요',
      '한글의 창제와 반포를',
      '나무를 심는',
      '근로자를',
      '부모님께 감사하는',
    ],
    '한글날은 한글의 창제와 반포를 기념하는 날이에요',
    L(
      '한글날의 핵심 의미를 설명하는 문장이에요.',
      'Bu gap Hangul kunining asosiy ma’nosini tushuntiradi.',
      'This sentence explains the central meaning of Hangeul Day.',
      'Это предложение объясняет основной смысл Дня хангыля.',
    ),
    ['hangeul-day', 'commemorate'],
  ),

  s5u9_084_fill_in_blank: fillBlank(
    '한글날은 10월 ___이에요.',
    ['9일'],
    ['9일', '3일', '1일', '5일', '15일'],
    L(
      '한글날은 10월 9일이에요.',
      'Hangul kuni 9-oktabr.',
      'Hangeul Day is October 9.',
      'День хангыля — 9 октября.',
    ),
    ['hangeul-day', 'date'],
  ),

  s5u9_085_word_arrange: wordArrange(
    [
      '한글의 의미를 생각해요',
      '한글날에는',
      '다시',
      '나무를 심어요',
      '근로자에게 감사해요',
      '부모님께 꽃을 달아요',
    ],
    '한글날에는 한글의 의미를 다시 생각해요',
    L(
      '한글날을 단순 날짜가 아니라 의미 있는 기념일로 이해해요.',
      'Hangul kunini faqat sana emas, mazmunli kun sifatida tushunamiz.',
      'Understand Hangeul Day as a meaningful commemorative day rather than just a date.',
      'Понимаем День хангыля как значимый памятный день, а не просто дату.',
    ),
    ['hangeul-day', 'learning-value'],
  ),

  s5u9_086_type_answer: vocabTypeAnswer(
    '한글날',
    L(
      '한글의 창제와 반포를 기념하는 10월 9일의 이름을 쓰세요.',
      'Hangul yaratilishi va e’lon qilinishini nishonlaydigan 9-oktabr kunining nomini yozing.',
      'Write the Korean name of October 9, which commemorates Hangeul.',
      'Напишите по-корейски название дня 9 октября, посвящённого хангылю.',
    ),
    'Hangeul Day',
    ['hangeul-day', 'type-answer'],
  ),

  s5u9_089_fill_in_blank: fillBlank(
    '한글날에는 한글을 ___ 여러 행사가 열려요.',
    ['기념하는'],
    ['기념하는', '독립하는', '통일하는', '행진하는', '심는'],
    L(
      '한글날에는 한글을 기념해요.',
      'Hangul kunida Hangul nishonlanadi.',
      'Hangeul is commemorated on Hangeul Day.',
      'В День хангыля чествуют хангыль.',
    ),
    ['hangeul-day', 'commemorate'],
  ),

  s5u9_090_type_answer: vocabTypeAnswer(
    '기념식을 하다',
    L(
      '기념일에 공식적인 행사를 연다는 뜻의 표현을 쓰세요.',
      'Esdalik kunida rasmiy marosim o‘tkazish ma’nosidagi iborani yozing.',
      'Write the Korean expression meaning “to hold a commemorative ceremony.”',
      'Напишите по-корейски «проводить памятную церемонию».',
    ),
    'to hold a commemorative ceremony',
    ['hold-commemorative-ceremony', 'type-answer'],
  ),

  s5u9_092_reading_quiz: grammarReadingQuiz(
    '한글날과 식목일은 모두 기념일이지만 하는 활동은 다릅니다. 한글날에는 한글의 의미를 생각하고, 식목일에는 자연과 나무의 중요성을 생각합니다.',
    [
      '기념일마다 기념하는 대상과 활동이 달라요.',
      '모든 기념일에는 반드시 나무를 심어요.',
      '모든 기념일은 한글을 기념해요.',
      '기념일의 의미는 모두 같아요.',
    ],
    '기념일마다 기념하는 대상과 활동이 달라요.',
    L(
      '기념일마다 목적과 행동이 다를 수 있어요.',
      'Har bir esdalik kunining maqsadi va faoliyati turlicha bo‘lishi mumkin.',
      'Different commemorative days can have different purposes and activities.',
      'У разных памятных дней могут быть разные цели и действия.',
    ),
    ['commemorative-day', 'integration'],
  ),

  s5u9_093_cloze_passage: clozePassage(
    '한글날에는 ___을 기념하고, 식목일에는 ___를 심고, 현충일에는 ___을 하기도 해요.',
    ['한글', '나무', '묵념'],
    ['묵념', '한글', '나무', '근로자', '선생님', '불꽃놀이'],
    L(
      '서로 다른 기념일의 대상과 행동을 구별해요.',
      'Turli esdalik kunlarining maqsad va harakatlarini farqlaymiz.',
      'Distinguish the subjects and activities of different commemorative days.',
      'Различаем объекты и действия разных памятных дней.',
    ),
    ['commemorative-day', 'integration'],
  ),

  s5u9_094_word_arrange: wordArrange(
    [
      '국기가 걸리기도 해요',
      '국가 기념일에는',
      '도시 곳곳에',
      '나무만 심고',
      '항상 불꽃놀이만 하고',
      '학교가 없어져요',
    ],
    '국가 기념일에는 도시 곳곳에 국기가 걸리기도 해요',
    L(
      '곳곳과 국기를 달다를 실제 기념일 풍경에 연결해요.',
      '곳곳 va davlat bayrog‘i ifodasi haqiqiy bayram manzarasida birlashtiriladi.',
      'Connect 곳곳 and national flags in a realistic commemorative-day scene.',
      'Связываем 곳곳 и государственные флаги в реальной праздничной обстановке.',
    ),
    ['everywhere', 'display-national-flag'],
  ),

  s5u9_095_type_answer: vocabTypeAnswer(
    '묵념',
    L(
      '죽은 사람들을 생각하며 말없이 조용히 추모하는 행동을 한 단어로 쓰세요.',
      'Vafot etganlarni jim turib xotirlashni bildiradigan koreyscha so‘zni yozing.',
      'Write the Korean word for a silent tribute to the dead.',
      'Напишите корейское слово, означающее минуту молчания в память об умерших.',
    ),
    'silent tribute',
    ['silent-tribute', 'type-answer'],
  ),

  s5u9_096_reading_quiz: grammarReadingQuiz(
    '한글날을 처음 듣는 외국인 친구에게 설명하려고 합니다. 가장 도움이 되는 설명은 무엇이에요?',
    [
      '10월 9일이고 한글을 기념하는 날이에요.',
      '5월 5일이고 어린이를 위한 날이에요.',
      '8월 15일이고 광복을 기념하는 날이에요.',
      '4월 5일이고 나무를 심는 날이에요.',
    ],
    '10월 9일이고 한글을 기념하는 날이에요.',
    L(
      '날짜와 기념 대상을 함께 말하면 한글날을 정확하게 설명할 수 있어요.',
      'Sana va nima nishonlanishini birga aytsak Hangul kunini aniq tushuntirish mumkin.',
      'Giving both the date and what it commemorates explains Hangeul Day clearly.',
      'Если назвать дату и то, чему посвящён день, День хангыля можно объяснить точно.',
    ),
    ['hangeul-day', 'communication'],
  ),

  s5u9_097_translate_builder: translateBuilder(
    L(
      '한글날은 10월 9일이고 한글을 기념하는 날입니다.',
      'Hangul kuni 9-oktabrda bo‘lib, Hangulga bag‘ishlangan.',
      'Hangeul Day is October 9 and commemorates Hangeul.',
      'День хангыля отмечается 9 октября и посвящён хангылю.',
    ),
    [
      '한글을 기념하는 날이에요',
      '10월 9일이고',
      '한글날은',
      '나무를 심는 날이에요',
      '8월 15일이고',
      '근로자의 날이에요',
    ],
    '한글날은 10월 9일이고 한글을 기념하는 날이에요',
    L(
      '날짜와 의미를 한 문장으로 설명하는 연습이에요.',
      'Sana va ma’noni bir gapda tushuntirish mashqi.',
      'Practise explaining both the date and meaning in one sentence.',
      'Тренируем объяснение даты и смысла в одном предложении.',
    ),
    ['hangeul-day', 'integration'],
  ),

  s5u9_098_fill_in_blank: fillBlank(
    '한글날은 한글을 ___ 날이에요.',
    ['기념하는'],
    ['기념하는', '독립하는', '통일하는', '심는', '행진하는'],
    L(
      '한글날의 핵심 동사는 기념하다예요.',
      'Hangul kunining asosiy fe’li 기념하다.',
      'The key verb for Hangeul Day is 기념하다.',
      'Ключевой глагол для Дня хангыля — 기념하다.',
    ),
    ['hangeul-day', 'commemorate'],
  ),

  // ══════════════════════════════════════════════════════════
  // Node 2 · N을/를 위해(서), V-기 위해(서)
  // 누구·무엇을 위한 행동인지 / 어떤 목적을 이루기 위한 행동인지
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 누구를 위해 준비했어요?
  // N을/를 위해(서)
  // ──────────────────────────────────────────────────────────

  s5u9_101_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '학교에서 어린이날 행사를 준비했습니다. 이 행사는 어른들을 위한 것이 아니라 어린이들이 즐겁게 지낼 수 있도록 준비한 행사입니다.',
      [
        '어린이를 위해 행사를 준비했어요.',
        '어린이에게 행사를 받았어요.',
        '어린이가 행사를 기념했어요.',
        '어린이를 따라 행사를 준비했어요.',
      ],
      '어린이를 위해 행사를 준비했어요.',
      L(
        '행사의 대상이 어린이이므로 N을/를 위해를 사용할 수 있어요.',
        'Tadbir bolalar uchun bo‘lgani sabab N을/를 위해 ishlatiladi.',
        'Because the event is for children, N을/를 위해 is appropriate.',
        'Поскольку мероприятие предназначено для детей, используется N을/를 위해.',
      ),
      ['n-eul-reul-wihae', 'childrens-day'],
    ),
  ),

  s5u9_102_type_answer: purposeTypeAnswer(
    '어린이를 위해 행사를 준비했어요',
    L(
      '어린이들이 즐겁게 지낼 수 있도록 행사를 준비했다는 뜻으로 쓰세요.',
      'Bolalar yaxshi vaqt o‘tkazishi uchun tadbir tayyorlanganini yozing.',
      'Write that the event was prepared for children.',
      'Напишите, что мероприятие подготовили для детей.',
    ),
    'The event was prepared for the benefit of children.',
    ['어린이를 위해'],
    ['n-eul-reul-wihae', 'childrens-day', 'type-answer'],
  ),

  s5u9_103_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '어린이들을 위해 특별한 행사를 준비했습니다.',
        'Bolalar uchun maxsus tadbir tayyorlandi.',
        'A special event was prepared for children.',
        'Для детей подготовили специальное мероприятие.',
      ),
      [
        '특별한 행사를 준비했어요',
        '어린이를 위해',
        '어린이날을 기념하고',
        '부모님을 위해',
        '선생님을 위해',
        '나무를 심었어요',
      ],
      '어린이를 위해 특별한 행사를 준비했어요',
      L(
        'N을/를 위해는 어떤 사람이나 대상을 위한 행동을 나타내요.',
        'N을/를 위해 biror inson yoki narsa uchun qilingan harakatni bildiradi.',
        'N을/를 위해 indicates an action done for a person or thing.',
        'N을/를 위해 обозначает действие ради кого-либо или чего-либо.',
      ),
      ['n-eul-reul-wihae', 'childrens-day'],
    ),
  ),

  s5u9_104_fill_in_blank: grammarQuestion(
    fillBlank(
      '학교에서 어린이___ 특별한 행사를 준비했어요.',
      ['를 위해'],
      ['를 위해', '를 따라서', '가 되어서', '에게서', '와 함께'],
      L(
        '어린이는 받침이 없으므로 어린이를 위해라고 해요.',
        '어린이 undoshsiz tugagani uchun 어린이를 위해 bo‘ladi.',
        '어린이 has no final consonant, so use 어린이를 위해.',
        'У 어린이 нет конечной согласной, поэтому используется 어린이를 위해.',
      ),
      ['n-eul-reul-wihae', 'form'],
    ),
  ),

  s5u9_105_word_arrange: grammarQuestion(
    wordArrange(
      [
        '부모님을 위해',
        '선물을 준비했어요',
        '어버이날에',
        '선생님을 위해',
        '국기를 달았어요',
        '묵념을 했어요',
      ],
      '어버이날에 부모님을 위해 선물을 준비했어요',
      L(
        '어버이날의 감사 행동과 목적 대상을 연결해요.',
        'Ota-onalar kunidagi minnatdorchilik harakati va maqsad bog‘lanadi.',
        'Connect the Parents’ Day action with the person it is for.',
        'Связываем действие в День родителей с тем, для кого оно делается.',
      ),
      ['n-eul-reul-wihae', 'parents-day'],
    ),
  ),

  s5u9_106_type_answer: purposeTypeAnswer(
    '부모님을 위해 선물을 준비했어요',
    L(
      '부모님께 드리기 위한 선물을 준비했다고 쓰세요.',
      'Ota-onaga berish uchun sovg‘a tayyorlanganini yozing.',
      'Write that you prepared a gift for your parents.',
      'Напишите, что вы подготовили подарок для родителей.',
    ),
    'The speaker prepared a gift for their parents.',
    ['부모님을 위해'],
    ['n-eul-reul-wihae', 'parents-day', 'type-answer'],
  ),

  s5u9_107_error_hunt: grammarQuestion(
    errorHunt(
      '어버이날에 부모님를 위해 선물을 준비했어요.',
      '부모님를',
      ['부모님을', '부모님이', '부모님께', '부모님과'],
      '부모님을',
      L(
        '부모님은 받침으로 끝나므로 을을 사용해 부모님을 위해라고 해요.',
        '부모님 undosh bilan tugagani uchun 부모님을 위해 ishlatiladi.',
        '부모님 ends in a consonant, so use 부모님을 위해.',
        '부모님 оканчивается на согласную, поэтому используется 부모님을 위해.',
      ),
      ['n-eul-reul-wihae', 'particle'],
    ),
  ),

  s5u9_108_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '어버이날에 부모님을 위해 선물을 준비했습니다.',
        'Ota-onalar kunida ota-onam uchun sovg‘a tayyorladim.',
        'I prepared a gift for my parents on Parents’ Day.',
        'В День родителей я подготовил подарок для родителей.',
      ),
      [
        '선물을 준비했어요',
        '어버이날에',
        '부모님을 위해',
        '부모님께서',
        '스승의 날에',
        '꽃을 심었어요',
      ],
      '어버이날에 부모님을 위해 선물을 준비했어요',
      L(
        '행동을 하는 사람이 아니라 혜택을 받는 대상을 위해로 표시해요.',
        '위해 harakat qiluvchini emas, foyda oluvchi tomonni bildiradi.',
        '위해 marks the beneficiary rather than the person performing the action.',
        '위해 обозначает того, ради кого совершается действие.',
      ),
      ['n-eul-reul-wihae', 'parents-day'],
    ),
  ),

  s5u9_109_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '학생들이 스승의 날에 감사 카드를 만들었습니다. 카드는 학생들이 가지려고 만든 것이 아니라 선생님께 드리려고 만든 것입니다.',
      [
        '선생님을 위해 감사 카드를 만들었어요.',
        '학생을 위해 선생님이 되었어요.',
        '선생님에게서 카드를 만들었어요.',
        '감사 카드를 위해 선생님이 왔어요.',
      ],
      '선생님을 위해 감사 카드를 만들었어요.',
      L(
        '카드가 누구를 위한 것인지 나타내는 문장이에요.',
        'Kartochka kim uchun ekanini bildiradi.',
        'The sentence identifies who the card is intended for.',
        'Предложение показывает, для кого предназначена открытка.',
      ),
      ['n-eul-reul-wihae', 'teachers-day'],
    ),
  ),

  s5u9_110_fill_in_blank: grammarQuestion(
    fillBlank(
      '스승의 날에 선생님___ 감사 카드를 만들었어요.',
      ['을 위해'],
      ['을 위해', '를 위해', '에게서', '와 같이', '부터'],
      L(
        '선생님은 받침으로 끝나므로 선생님을 위해라고 해요.',
        '선생님 undosh bilan tugagani uchun 선생님을 위해 ishlatiladi.',
        '선생님 ends in a consonant, so use 선생님을 위해.',
        '선생님 оканчивается на согласную, поэтому используется 선생님을 위해.',
      ),
      ['n-eul-reul-wihae', 'particle'],
    ),
  ),

  s5u9_111_type_answer: purposeTypeAnswer(
    '선생님을 위해 감사 카드를 만들었어요',
    L(
      '스승의 날에 선생님께 드릴 감사 카드를 만들었다고 쓰세요.',
      'Ustozlar kunida o‘qituvchiga berish uchun minnatdorchilik kartasi tayyorlanganini yozing.',
      'Write that you made a thank-you card for your teacher.',
      'Напишите, что вы сделали благодарственную открытку для учителя.',
    ),
    'The speaker made a thank-you card for the teacher.',
    ['선생님을 위해'],
    ['n-eul-reul-wihae', 'teachers-day', 'type-answer'],
  ),

  s5u9_112_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '선생님을 위해 감사 카드를 만들었습니다.',
        'O‘qituvchim uchun minnatdorchilik kartasi tayyorladim.',
        'I made a thank-you card for my teacher.',
        'Я сделал благодарственную открытку для учителя.',
      ),
      [
        '감사 카드를 만들었어요',
        '선생님을 위해',
        '부모님을 위해',
        '국기를 달았어요',
        '어린이를 위해',
        '묵념을 했어요',
      ],
      '선생님을 위해 감사 카드를 만들었어요',
      L(
        '사람을 위한 행동은 N을/를 위해로 자연스럽게 표현할 수 있어요.',
        'Inson uchun qilingan harakat N을/를 위해 bilan ifodalanadi.',
        'An action done for someone can naturally be expressed with N을/를 위해.',
        'Действие ради человека естественно выражается через N을/를 위해.',
      ),
      ['n-eul-reul-wihae', 'teachers-day'],
    ),
  ),

  s5u9_113_cloze_passage: grammarQuestion(
    clozePassage(
      '어린이날에는 ___를 위해 행사를 준비하고, 어버이날에는 ___을 위해 선물을 준비해요.',
      ['어린이', '부모님'],
      ['부모님', '어린이', '선생님', '한글날', '식목일'],
      L(
        '기념일마다 행동의 대상이 누구인지 구별해요.',
        'Har bir bayramda harakat kim uchun ekanini farqlaymiz.',
        'Distinguish who the action is for on each commemorative day.',
        'Различаем, для кого совершается действие в каждый памятный день.',
      ),
      ['n-eul-reul-wihae', 'commemorative-day'],
    ),
  ),

  s5u9_114_word_arrange: grammarQuestion(
    wordArrange(
      [
        '공원을 깨끗하게 관리해요',
        '사람들을 위해',
        '지역 주민들이',
        '나무를 베고',
        '국기를 내리고',
        '기념식을 취소해요',
      ],
      '지역 주민들이 사람들을 위해 공원을 깨끗하게 관리해요',
      L(
        '위해는 기념일뿐 아니라 일상적인 공익 행동에도 사용할 수 있어요.',
        '위해 bayramdan tashqari kundalik foydali ishlar uchun ham ishlatiladi.',
        '위해 can also describe ordinary actions done for other people.',
        '위해 можно использовать и для обычных действий на благо других.',
      ),
      ['n-eul-reul-wihae', 'beneficiary'],
    ),
  ),

  s5u9_115_type_answer: purposeTypeAnswer(
    '사람들을 위해 공원을 깨끗하게 관리해요',
    L(
      '많은 사람이 편하게 이용할 수 있도록 공원을 관리한다고 쓰세요.',
      'Ko‘p odamlar foydalanishi uchun bog‘ni toza saqlashlarini yozing.',
      'Write that the park is kept clean for people.',
      'Напишите, что парк содержат в чистоте для людей.',
    ),
    'The park is maintained clean for the benefit of people.',
    ['사람들을 위해'],
    ['n-eul-reul-wihae', 'beneficiary', 'type-answer'],
  ),

  s5u9_116_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '식목일에 사람들이 나무를 심었습니다. 단순히 행사 사진을 찍기 위해서가 아니라 자연과 다음 세대를 생각하며 한 행동입니다.',
      [
        '자연을 위해 나무를 심었어요.',
        '나무를 위해 자연을 만들었어요.',
        '사진을 위해 식목일이 생겼어요.',
        '나무에게 자연을 줬어요.',
      ],
      '자연을 위해 나무를 심었어요.',
      L(
        '자연이라는 대상을 위한 행동으로 설명할 수 있어요.',
        'Bu tabiat uchun qilingan harakat sifatida tushuntiriladi.',
        'It can be described as an action done for nature.',
        'Это можно описать как действие ради природы.',
      ),
      ['n-eul-reul-wihae', 'arbor-day'],
    ),
  ),

  s5u9_117_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '자연을 위해 나무를 심었습니다.',
        'Tabiat uchun daraxt ekdik.',
        'We planted trees for nature.',
        'Мы посадили деревья ради природы.',
      ),
      [
        '나무를 심었어요',
        '자연을 위해',
        '자연에게서',
        '국기를 달았어요',
        '묵념을 했어요',
        '나무를 위해서만',
      ],
      '자연을 위해 나무를 심었어요',
      L(
        '사람뿐 아니라 가치나 대상도 N을/를 위해와 함께 사용할 수 있어요.',
        'Faqat odam emas, qadriyat yoki narsa ham N을/를 위해 bilan kelishi mumkin.',
        'N을/를 위해 can also be used with values or causes, not only people.',
        'N을/를 위해 употребляется не только с людьми, но и с ценностями или целями.',
      ),
      ['n-eul-reul-wihae', 'arbor-day'],
    ),
  ),

  s5u9_118_fill_in_blank: grammarQuestion(
    fillBlank(
      '식목일에는 자연___ 나무를 심기도 해요.',
      ['을 위해'],
      ['을 위해', '를 위해', '에게서', '부터', '처럼'],
      L(
        '자연은 받침으로 끝나므로 자연을 위해라고 해요.',
        '자연 undosh bilan tugagani uchun 자연을 위해 deyiladi.',
        '자연 ends in a consonant, so use 자연을 위해.',
        '자연 оканчивается на согласную, поэтому используется 자연을 위해.',
      ),
      ['n-eul-reul-wihae', 'form'],
    ),
  ),

  s5u9_119_error_hunt: grammarQuestion(
    errorHunt(
      '식목일에는 자연를 위해 나무를 심어요.',
      '자연를',
      ['자연을', '자연이', '자연과', '자연에게'],
      '자연을',
      L(
        '자연은 받침 ㄴ으로 끝나기 때문에 을을 사용해요.',
        '자연 ㄴ undoshi bilan tugagani uchun 을 ishlatiladi.',
        'Because 자연 ends with ㄴ, it takes 을.',
        'Поскольку 자연 оканчивается на ㄴ, используется 을.',
      ),
      ['n-eul-reul-wihae', 'particle'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 무엇을 하기 위해 준비했어요?
  // V-기 위해(서)
  // ──────────────────────────────────────────────────────────

  s5u9_121_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날에 학교에서 특별한 행사를 열었습니다. 행사의 목적은 학생들에게 한글의 의미를 알리는 것이었습니다.',
      [
        '한글의 의미를 알리기 위해 행사를 열었어요.',
        '한글의 의미가 알려져서 행사를 열었어요.',
        '한글의 의미를 알리다가 행사를 열었어요.',
        '한글의 의미를 알렸는데도 행사를 열었어요.',
      ],
      '한글의 의미를 알리기 위해 행사를 열었어요.',
      L(
        '행사를 연 목적이 한글의 의미를 알리는 것이므로 V-기 위해를 사용해요.',
        'Tadbirning maqsadi Hangul ma’nosini tanitish bo‘lgani uchun V-기 위해 ishlatiladi.',
        'Because the purpose of the event is to explain Hangeul’s meaning, use V-기 위해.',
        'Поскольку цель мероприятия — рассказать о значении хангыля, используется V-기 위해.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_122_type_answer: purposeTypeAnswer(
    '한글의 의미를 알리기 위해 행사를 열었어요',
    L(
      '한글의 의미를 다른 사람들에게 알리는 것을 목적으로 행사를 열었다고 쓰세요.',
      'Hangul ma’nosini boshqalarga tanitish maqsadida tadbir o‘tkazilganini yozing.',
      'Write that an event was held in order to share the meaning of Hangeul.',
      'Напишите, что мероприятие провели, чтобы рассказать другим о значении хангыля.',
    ),
    'An event was held in order to share the meaning of Hangeul.',
    ['알리기 위해'],
    ['v-gi-wihae', 'hangeul-day', 'type-answer'],
  ),

  s5u9_123_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날을 기념하기 위해 기념식을 열었습니다.',
        'Hangul kunini nishonlash uchun marosim o‘tkazildi.',
        'A ceremony was held in order to commemorate Hangeul Day.',
        'Чтобы отметить День хангыля, провели памятную церемонию.',
      ),
      [
        '기념식을 열었어요',
        '한글날을',
        '기념하기 위해',
        '한글날 때문에',
        '기념하다가',
        '나무를 심기 위해',
      ],
      '한글날을 기념하기 위해 기념식을 열었어요',
      L(
        '동사의 목적을 표현할 때 기본형 뒤에 기 위해를 붙여요.',
        'Fe’l maqsadini ifodalashda asosiy shaklga 기 위해 qo‘shiladi.',
        'Attach 기 위해 to the verb stem construction to express purpose.',
        'Для выражения цели действия используется конструкция V-기 위해.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_124_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글날을 기념하___ 기념식을 열었어요.',
      ['기 위해'],
      ['기 위해', '다가', '면서', '지만', '다고'],
      L(
        '기념하다의 목적형은 기념하기 위해예요.',
        '기념하다ning maqsad shakli 기념하기 위해.',
        'The purpose form of 기념하다 is 기념하기 위해.',
        'Форма цели от 기념하다 — 기념하기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_125_word_arrange: grammarQuestion(
    wordArrange(
      [
        '기념식을 열었어요',
        '한글날을 기념하기 위해',
        '많은 사람들이',
        '광복절을 기념하고',
        '묵념만 하고',
        '나무를 심었어요',
      ],
      '많은 사람들이 한글날을 기념하기 위해 기념식을 열었어요',
      L(
        '행동의 목적과 실제 행동을 연결해요.',
        'Harakat maqsadi va amalga oshirilgan ish bog‘lanadi.',
        'Connect the purpose with the action taken.',
        'Связываем цель с выполненным действием.',
      ),
      ['v-gi-wihae', 'hold-commemorative-ceremony'],
    ),
  ),

  s5u9_126_type_answer: purposeTypeAnswer(
    '한글날을 기념하기 위해 기념식을 열었어요',
    L(
      '기념식을 연 목적이 한글날을 기념하는 것이었다고 쓰세요.',
      'Marosim o‘tkazish maqsadi Hangul kunini nishonlash bo‘lganini yozing.',
      'Write that the ceremony was held to commemorate Hangeul Day.',
      'Напишите, что церемонию провели, чтобы отметить День хангыля.',
    ),
    'The ceremony was held in order to commemorate Hangeul Day.',
    ['기념하기 위해'],
    ['v-gi-wihae', 'hangeul-day', 'type-answer'],
  ),

  s5u9_127_error_hunt: grammarQuestion(
    errorHunt(
      '한글날을 기념하기를 위해 기념식을 열었어요.',
      '기념하기를',
      ['기념하기', '기념해서', '기념하다가', '기념하면서'],
      '기념하기',
      L(
        'V-기 위해에서는 기 뒤에 목적격 조사 를을 붙이지 않아요.',
        'V-기 위해 shaklida 기 dan keyin 를 qo‘shilmaydi.',
        'Do not add 를 after 기 in V-기 위해.',
        'В конструкции V-기 위해 после 기 не добавляется 를.',
      ),
      ['v-gi-wihae', 'conjugation'],
    ),
  ),

  s5u9_128_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글의 중요성을 알리기 위해 여러 행사를 준비했습니다.',
        'Hangulning ahamiyatini tanitish uchun turli tadbirlar tayyorlandi.',
        'Various events were prepared in order to share the importance of Hangeul.',
        'Чтобы рассказать о важности хангыля, подготовили различные мероприятия.',
      ),
      [
        '여러 행사를 준비했어요',
        '한글의 중요성을',
        '알리기 위해',
        '알렸기 때문에',
        '기념식을 취소하고',
        '나무를 심기 위해',
      ],
      '한글의 중요성을 알리기 위해 여러 행사를 준비했어요',
      L(
        '앞부분은 행동의 목적, 뒷부분은 그 목적을 위해 한 행동이에요.',
        'Birinchi qism maqsad, ikkinchi qism shu maqsad uchun qilingan ish.',
        'The first clause gives the purpose; the second gives the action taken for that purpose.',
        'Первая часть указывает цель, вторая — действие ради этой цели.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_129_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '식목일에 학교 운동장에 나무를 심었습니다. 학생들이 나무를 심은 이유는 학교 주변의 자연환경을 더 좋게 만드는 것이었습니다.',
      [
        '환경을 좋게 만들기 위해 나무를 심었어요.',
        '환경이 좋아져서 나무를 심었어요.',
        '환경을 좋게 만들다가 나무를 심었어요.',
        '환경이 좋은데도 나무를 심었어요.',
      ],
      '환경을 좋게 만들기 위해 나무를 심었어요.',
      L(
        '나무를 심은 목적을 V-기 위해로 설명해요.',
        'Daraxt ekish maqsadi V-기 위해 bilan tushuntiriladi.',
        'The purpose of planting trees is expressed with V-기 위해.',
        'Цель посадки деревьев выражается через V-기 위해.',
      ),
      ['v-gi-wihae', 'arbor-day'],
    ),
  ),

  s5u9_130_fill_in_blank: grammarQuestion(
    fillBlank(
      '환경을 더 좋게 만들___ 나무를 심었어요.',
      ['기 위해'],
      ['기 위해', '다가', '면서', '지만', '다고'],
      L(
        '만들다의 목적형은 만들기 위해예요.',
        '만들다ning maqsad shakli 만들기 위해.',
        'The purpose form of 만들다 is 만들기 위해.',
        'Форма цели от 만들다 — 만들기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_131_type_answer: purposeTypeAnswer(
    '환경을 보호하기 위해 나무를 심었어요',
    L(
      '환경을 보호하는 것을 목적으로 나무를 심었다고 쓰세요.',
      'Atrof-muhitni asrash maqsadida daraxt ekilganini yozing.',
      'Write that trees were planted in order to protect the environment.',
      'Напишите, что деревья посадили, чтобы защищать окружающую среду.',
    ),
    'Trees were planted in order to protect the environment.',
    ['보호하기 위해'],
    ['v-gi-wihae', 'arbor-day', 'type-answer'],
  ),

  s5u9_132_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '환경을 보호하기 위해 나무를 심었습니다.',
        'Atrof-muhitni asrash uchun daraxt ekdik.',
        'We planted trees in order to protect the environment.',
        'Мы посадили деревья, чтобы защищать окружающую среду.',
      ),
      [
        '나무를 심었어요',
        '환경을 보호하기 위해',
        '환경이 좋아서',
        '국기를 달기 위해',
        '묵념을 했어요',
        '불꽃놀이를 했어요',
      ],
      '환경을 보호하기 위해 나무를 심었어요',
      L(
        '목적과 행동이 논리적으로 연결돼야 해요.',
        'Maqsad va harakat mantiqan bog‘lanishi kerak.',
        'The purpose and the action should form a logical relationship.',
        'Цель и действие должны быть логически связаны.',
      ),
      ['v-gi-wihae', 'arbor-day'],
    ),
  ),

  s5u9_133_cloze_passage: grammarQuestion(
    clozePassage(
      '한글날을 ___ 위해 기념식을 열고, 환경을 ___ 위해 나무를 심었어요.',
      ['기념하기', '보호하기'],
      [
        '보호하기',
        '기념하기',
        '기념해서',
        '보호하면서',
        '기념한다고',
        '보호했다고',
      ],
      L(
        '서로 다른 두 목적 표현에 V-기를 사용해요.',
        'Ikki turli maqsadda V-기 shakli ishlatiladi.',
        'Use V-기 in two different purpose expressions.',
        'В двух разных выражениях цели используется V-기.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_134_word_arrange: grammarQuestion(
    wordArrange(
      [
        '국기를 달았어요',
        '광복절을 기념하기 위해',
        '집 앞에',
        '한글날을 기념하고',
        '나무를 심기 위해',
        '묵념만 했어요',
      ],
      '광복절을 기념하기 위해 집 앞에 국기를 달았어요',
      L(
        '광복절의 의미와 대표 행동을 목적 표현으로 연결해요.',
        'Ozodlik kuni ma’nosi va bayroq osish harakati maqsad orqali bog‘lanadi.',
        'Connect Liberation Day with displaying the flag through a purpose expression.',
        'Связываем День освобождения и вывешивание флага через выражение цели.',
      ),
      ['v-gi-wihae', 'liberation-day-korea'],
    ),
  ),

  s5u9_135_type_answer: purposeTypeAnswer(
    '광복절을 기념하기 위해 국기를 달았어요',
    L(
      '국기를 단 목적이 광복절을 기념하는 것이었다고 쓰세요.',
      'Bayroq osish maqsadi Ozodlik kunini nishonlash bo‘lganini yozing.',
      'Write that the national flag was displayed in order to commemorate Liberation Day.',
      'Напишите, что государственный флаг вывесили, чтобы отметить День освобождения.',
    ),
    'The national flag was displayed in order to commemorate Liberation Day.',
    ['기념하기 위해'],
    ['v-gi-wihae', 'liberation-day-korea', 'type-answer'],
  ),

  s5u9_136_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '현충일 행사에서 모두 조용히 서서 묵념했습니다. 이 행동의 목적은 나라를 위해 희생한 사람들을 기억하고 기리는 것이었습니다.',
      [
        '희생한 사람들을 기리기 위해 묵념했어요.',
        '희생한 사람들 때문에 묵념했어요.',
        '희생한 사람들을 기리다가 묵념했어요.',
        '희생한 사람들을 기렸는데도 묵념했어요.',
      ],
      '희생한 사람들을 기리기 위해 묵념했어요.',
      L(
        '묵념을 한 목적을 V-기 위해로 나타내요.',
        'Sukut saqlash maqsadi V-기 위해 bilan ifodalanadi.',
        'The purpose of the silent tribute is expressed with V-기 위해.',
        'Цель минуты молчания выражается через V-기 위해.',
      ),
      ['v-gi-wihae', 'memorial-day-korea'],
    ),
  ),

  s5u9_137_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '희생한 사람들을 기리기 위해 묵념했습니다.',
        'Qurbon bo‘lganlarni xotirlash uchun sukut saqladik.',
        'We observed a silent tribute in order to honor those who sacrificed.',
        'Мы почтили погибших минутой молчания.',
      ),
      [
        '묵념을 했어요',
        '희생한 사람들을',
        '기리기 위해',
        '불꽃놀이를 하기 위해',
        '기념식 때문에',
        '국기를 내리고',
      ],
      '희생한 사람들을 기리기 위해 묵념을 했어요',
      L(
        '추모 행동도 목적 표현과 자연스럽게 결합할 수 있어요.',
        'Xotira harakati ham maqsad ifodasi bilan tabiiy birlashadi.',
        'Memorial actions can also naturally combine with purpose expressions.',
        'Поминальные действия также естественно сочетаются с выражением цели.',
      ),
      ['v-gi-wihae', 'silent-tribute'],
    ),
  ),

  s5u9_138_fill_in_blank: grammarQuestion(
    fillBlank(
      '희생한 사람들을 기리___ 묵념을 했어요.',
      ['기 위해'],
      ['기 위해', '다가', '지만', '면서', '다고'],
      L(
        '기리다의 목적형은 기리기 위해예요.',
        '기리다ning maqsad shakli 기리기 위해.',
        'The purpose form of 기리다 is 기리기 위해.',
        'Форма цели от 기리다 — 기리기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_139_error_hunt: grammarQuestion(
    errorHunt(
      '현충일에는 희생한 사람들을 기리려고 위해 묵념을 해요.',
      '기리려고',
      ['기리기', '기리기를', '기린', '기리는데'],
      '기리기',
      L(
        '목적을 나타낼 때는 V-기 위해를 사용하므로 기리기 위해가 맞아요.',
        'Maqsadni ifodalashda V-기 위해 ishlatiladi, shuning uchun 기리기 위해 to‘g‘ri.',
        'Use V-기 위해 for purpose, so 기리기 위해 is correct.',
        'Для выражения цели используется V-기 위해, поэтому правильно 기리기 위해.',
      ),
      ['v-gi-wihae', 'memorial-day-korea', 'error-hunt'],
    ),
  ),
  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 기념일에 왜 이런 행동을 해요?
  // 기념일 목적 설명
  // ──────────────────────────────────────────────────────────

  s5u9_141_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '어버이날에 자녀들이 부모님께 꽃과 선물을 드렸습니다. 이 행동은 부모님의 사랑과 수고에 감사하는 마음을 전하기 위한 것입니다.',
      [
        '감사의 마음을 전하기 위해 선물을 드렸어요.',
        '선물이 있어서 감사했어요.',
        '감사하다가 선물을 드렸어요.',
        '선물을 드렸는데도 감사했어요.',
      ],
      '감사의 마음을 전하기 위해 선물을 드렸어요.',
      L(
        '선물을 드린 목적을 설명하고 있어요.',
        'Sovg‘a berish maqsadi tushuntirilmoqda.',
        'The sentence explains the purpose of giving the gift.',
        'Предложение объясняет цель подарка.',
      ),
      ['v-gi-wihae', 'parents-day'],
    ),
  ),

  s5u9_142_type_answer: purposeTypeAnswer(
    '감사의 마음을 전하기 위해 부모님께 선물을 드렸어요',
    L(
      '부모님께 감사하는 마음을 표현하려고 선물을 드렸다고 쓰세요.',
      'Ota-onaga minnatdorchilik bildirish uchun sovg‘a berilganini yozing.',
      'Write that a gift was given to the parents in order to express gratitude.',
      'Напишите, что родителям подарили подарок, чтобы выразить благодарность.',
    ),
    'A gift was given to the parents in order to express gratitude.',
    ['전하기 위해'],
    ['v-gi-wihae', 'parents-day', 'type-answer'],
  ),

  s5u9_143_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '부모님께 감사의 마음을 전하기 위해 선물을 준비했습니다.',
        'Ota-onaga minnatdorchilik bildirish uchun sovg‘a tayyorladim.',
        'I prepared a gift in order to express gratitude to my parents.',
        'Я подготовил подарок, чтобы выразить благодарность родителям.',
      ),
      [
        '선물을 준비했어요',
        '부모님께',
        '감사의 마음을 전하기 위해',
        '부모님 때문에',
        '나무를 심기 위해',
        '선생님을 기념하고',
      ],
      '부모님께 감사의 마음을 전하기 위해 선물을 준비했어요',
      L(
        '어버이날의 대표 행동을 그 목적과 연결해요.',
        'Ota-onalar kunidagi odatiy harakat uning maqsadi bilan bog‘lanadi.',
        'Connect a typical Parents’ Day action with its purpose.',
        'Связываем типичное действие в День родителей с его целью.',
      ),
      ['v-gi-wihae', 'parents-day'],
    ),
  ),

  s5u9_144_fill_in_blank: grammarQuestion(
    fillBlank(
      '부모님께 감사의 마음을 전하___ 선물을 준비했어요.',
      ['기 위해'],
      ['기 위해', '다가', '면서', '지만', '다고'],
      L(
        '전하다의 목적형은 전하기 위해예요.',
        '전하다ning maqsad shakli 전하기 위해.',
        'The purpose form of 전하다 is 전하기 위해.',
        'Форма цели от 전하다 — 전하기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_145_word_arrange: grammarQuestion(
    wordArrange(
      [
        '감사 카드를 만들었어요',
        '선생님께 감사드리기 위해',
        '스승의 날에',
        '부모님을 위해',
        '국기를 달고',
        '묵념을 했어요',
      ],
      '스승의 날에 선생님께 감사드리기 위해 감사 카드를 만들었어요',
      L(
        '스승의 날 행동의 목적을 자연스럽게 설명해요.',
        'Ustozlar kunidagi harakat maqsadi tabiiy tushuntiriladi.',
        'Naturally explain the purpose of a Teachers’ Day action.',
        'Естественно объясняем цель действия в День учителя.',
      ),
      ['v-gi-wihae', 'teachers-day'],
    ),
  ),

  s5u9_146_type_answer: purposeTypeAnswer(
    '선생님께 감사드리기 위해 감사 카드를 만들었어요',
    L(
      '선생님께 감사하는 마음을 표현하려고 감사 카드를 만들었다고 쓰세요.',
      'O‘qituvchiga minnatdorchilik bildirish uchun karta tayyorlanganini yozing.',
      'Write that a thank-you card was made in order to thank the teacher.',
      'Напишите, что благодарственную открытку сделали, чтобы поблагодарить учителя.',
    ),
    'A thank-you card was made in order to thank the teacher.',
    ['감사드리기 위해'],
    ['v-gi-wihae', 'teachers-day', 'type-answer'],
  ),

  s5u9_147_error_hunt: grammarQuestion(
    errorHunt(
      '선생님께 감사드리기를 위해 카드를 만들었어요.',
      '감사드리기를',
      ['감사드리기', '감사드려서', '감사드리다가', '감사드리면서'],
      '감사드리기',
      L(
        'V-기 위해에서는 기 뒤에 를을 붙이지 않아요.',
        'V-기 위해da 기 dan keyin 를 kelmaydi.',
        'Do not attach 를 after 기 in V-기 위해.',
        'В конструкции V-기 위해 после 기 не ставится 를.',
      ),
      ['v-gi-wihae', 'conjugation'],
    ),
  ),

  s5u9_148_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '선생님께 진심으로 감사드리기 위해 카드를 준비했습니다.',
        'Ustozga chin dildan minnatdorchilik bildirish uchun karta tayyorladim.',
        'I prepared a card in order to sincerely thank my teacher.',
        'Я подготовил открытку, чтобы искренне поблагодарить учителя.',
      ),
      [
        '카드를 준비했어요',
        '진심으로 감사드리기 위해',
        '선생님께',
        '스승의 날 때문에',
        '행진하기 위해',
        '국기를 달았어요',
      ],
      '선생님께 진심으로 감사드리기 위해 카드를 준비했어요',
      L(
        '진심으로와 감사드리기를 함께 사용해 실제 감사 목적을 표현해요.',
        '진심으로 va 감사드리기 birga ishlatilib haqiqiy minnatdorchilik maqsadi ifodalanadi.',
        '진심으로 and 감사드리기 combine naturally to express sincere gratitude as a purpose.',
        '진심으로 и 감사드리기 естественно сочетаются для выражения искренней благодарности.',
      ),
      ['v-gi-wihae', 'sincerely'],
    ),
  ),

  s5u9_149_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '현충일 기념식에서 사람들은 조용히 묵념했습니다. 이 행동은 나라를 위해 희생한 사람들을 잊지 않고 기억하기 위한 것이었습니다.',
      [
        '희생한 사람들을 기억하기 위해 묵념했어요.',
        '희생한 사람들이 있어서 묵념했어요.',
        '희생한 사람들을 기억하다가 묵념했어요.',
        '묵념했는데도 기억하지 않았어요.',
      ],
      '희생한 사람들을 기억하기 위해 묵념했어요.',
      L(
        '묵념이라는 행동의 목적을 정확하게 설명해요.',
        'Sukut saqlash harakatining maqsadi aniq tushuntiriladi.',
        'It accurately explains the purpose of the silent tribute.',
        'Точно объясняется цель минуты молчания.',
      ),
      ['v-gi-wihae', 'memorial-day-korea'],
    ),
  ),

  s5u9_150_fill_in_blank: grammarQuestion(
    fillBlank(
      '희생한 사람들을 기억하___ 묵념했어요.',
      ['기 위해'],
      ['기 위해', '다가', '지만', '면서', '다고'],
      L(
        '기억하다의 목적형은 기억하기 위해예요.',
        '기억하다ning maqsad shakli 기억하기 위해.',
        'The purpose form of 기억하다 is 기억하기 위해.',
        'Форма цели от 기억하다 — 기억하기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_151_type_answer: purposeTypeAnswer(
    '희생한 사람들을 기억하기 위해 묵념했어요',
    L(
      '나라를 위해 희생한 사람들을 기억하는 것을 목적으로 묵념했다고 쓰세요.',
      'Vatan uchun qurbon bo‘lganlarni eslash maqsadida sukut saqlanganini yozing.',
      'Write that a silent tribute was observed in order to remember those who sacrificed.',
      'Напишите, что минутой молчания почтили память тех, кто пожертвовал собой.',
    ),
    'A silent tribute was observed in order to remember those who sacrificed.',
    ['기억하기 위해'],
    ['v-gi-wihae', 'memorial-day-korea', 'type-answer'],
  ),

  s5u9_152_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '희생한 사람들을 기억하기 위해 묵념했습니다.',
        'Qurbon bo‘lganlarni eslash uchun sukut saqladik.',
        'We observed a silent tribute in order to remember those who sacrificed.',
        'Мы почтили память погибших минутой молчания.',
      ),
      [
        '묵념을 했어요',
        '희생한 사람들을 기억하기 위해',
        '불꽃놀이를 했어요',
        '국기를 내리기 위해',
        '행진했다고요',
        '식목일을 위해',
      ],
      '희생한 사람들을 기억하기 위해 묵념을 했어요',
      L(
        '추모하는 날에는 목적과 행동의 관계가 특히 중요해요.',
        'Xotira kunida maqsad va harakat munosabati ayniqsa muhim.',
        'The relationship between purpose and action is especially important on memorial days.',
        'В памятные дни особенно важно понимать связь между целью и действием.',
      ),
      ['v-gi-wihae', 'silent-tribute'],
    ),
  ),

  s5u9_153_cloze_passage: grammarQuestion(
    clozePassage(
      '어버이날에는 감사의 마음을 ___ 위해 선물을 준비하고, 현충일에는 희생한 사람들을 ___ 위해 묵념해요.',
      ['전하기', '기억하기'],
      ['기억하기', '전하기', '전해서', '기억하면서', '심기', '달기'],
      L(
        '축하·감사의 목적과 추모의 목적을 구별해요.',
        'Minnatdorchilik va xotira maqsadlarini farqlaymiz.',
        'Distinguish a gratitude purpose from a memorial purpose.',
        'Различаем цель благодарности и цель поминовения.',
      ),
      ['v-gi-wihae', 'commemorative-day'],
    ),
  ),

  s5u9_154_word_arrange: grammarQuestion(
    wordArrange(
      [
        '국기를 달았어요',
        '광복의 의미를 기억하기 위해',
        '광복절에',
        '불꽃놀이만 하고',
        '나무를 심기 위해',
        '부모님께 감사했어요',
      ],
      '광복절에 광복의 의미를 기억하기 위해 국기를 달았어요',
      L(
        '광복절의 의미와 행동을 목적 관계로 연결해요.',
        'Ozodlik kunining ma’nosi va harakati maqsad orqali bog‘lanadi.',
        'Connect the meaning of Liberation Day with an action through purpose.',
        'Связываем смысл Дня освобождения с действием через цель.',
      ),
      ['v-gi-wihae', 'liberation-day-korea'],
    ),
  ),

  s5u9_155_type_answer: purposeTypeAnswer(
    '광복의 의미를 기억하기 위해 국기를 달았어요',
    L(
      '광복의 의미를 기억하려고 국기를 달았다고 쓰세요.',
      'Ozodlik ma’nosini eslash uchun bayroq osilganini yozing.',
      'Write that the national flag was displayed in order to remember the meaning of liberation.',
      'Напишите, что флаг вывесили, чтобы помнить смысл освобождения.',
    ),
    'The national flag was displayed in order to remember the meaning of liberation.',
    ['기억하기 위해'],
    ['v-gi-wihae', 'liberation-day-korea', 'type-answer'],
  ),

  s5u9_156_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '식목일에 나무를 심는 이유를 가장 잘 설명한 문장을 고르세요.',
      [
        '자연을 보호하기 위해 나무를 심어요.',
        '자연이 있어서 나무를 심어요.',
        '나무를 심다가 자연을 보호해요.',
        '나무를 심는데도 자연을 보호하지 않아요.',
      ],
      '자연을 보호하기 위해 나무를 심어요.',
      L(
        '기념일 행동의 목적을 직접 설명하는 문장이에요.',
        'Bayramdagi harakat maqsadini bevosita tushuntiradi.',
        'It directly explains the purpose of an Arbor Day action.',
        'Предложение прямо объясняет цель действия в День посадки деревьев.',
      ),
      ['v-gi-wihae', 'arbor-day'],
    ),
  ),

  s5u9_157_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '자연의 중요성을 알리기 위해 식목일 행사를 열었습니다.',
        'Tabiatning ahamiyatini tanitish uchun Daraxt ekish kuni tadbiri o‘tkazildi.',
        'An Arbor Day event was held in order to raise awareness of the importance of nature.',
        'Мероприятие ко Дню посадки деревьев провели, чтобы рассказать о важности природы.',
      ),
      [
        '식목일 행사를 열었어요',
        '자연의 중요성을',
        '알리기 위해',
        '자연 때문에',
        '국기를 달기 위해',
        '묵념했어요',
      ],
      '자연의 중요성을 알리기 위해 식목일 행사를 열었어요',
      L(
        '행사의 목적을 구체적으로 설명하는 연습이에요.',
        'Tadbir maqsadini aniq tushuntirish mashqi.',
        'This practises explaining the purpose of an event precisely.',
        'Это упражнение на точное объяснение цели мероприятия.',
      ),
      ['v-gi-wihae', 'arbor-day'],
    ),
  ),

  s5u9_158_fill_in_blank: grammarQuestion(
    fillBlank(
      '자연의 중요성을 알리___ 식목일 행사를 열었어요.',
      ['기 위해'],
      ['기 위해', '다가', '면서', '지만', '다고'],
      L(
        '알리다는 알리기 위해로 만들어요.',
        '알리다 → 알리기 위해.',
        '알리다 becomes 알리기 위해.',
        '알리다 превращается в 알리기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_159_error_hunt: grammarQuestion(
    errorHunt(
      '한글의 가치를 알리는 위해 기념식을 열었어요.',
      '알리는',
      ['알리기', '알리기를', '알린', '알리는데'],
      '알리기',
      L(
        '행동의 목적은 알리기 위해라고 표현해요.',
        'Harakat maqsadi 알리기 위해 shaklida ifodalanadi.',
        'Express the purpose as 알리기 위해.',
        'Цель действия выражается формой 알리기 위해.',
      ),
      ['v-gi-wihae', 'hangeul-day', 'error-hunt'],
    ),
  ),
  // ──────────────────────────────────────────────────────────
  // Lesson 4 · N을 위해 vs V-기 위해
  // 명사 목적과 행동 목적 구별
  // ──────────────────────────────────────────────────────────

  s5u9_161_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '두 문장이 있습니다. “어린이를 위해 행사를 준비했어요.”에서는 어린이가 행동의 혜택을 받는 대상입니다. “어린이날을 기념하기 위해 행사를 준비했어요.”에서는 기념하다라는 행동이 목적입니다.',
      [
        '명사는 N을/를 위해, 동사는 V-기 위해를 사용해요.',
        '명사와 동사 모두 반드시 V-기 위해만 사용해요.',
        '명사 뒤에는 항상 기 위해를 사용해요.',
        '동사 뒤에는 목적격 조사만 사용해요.',
      ],
      '명사는 N을/를 위해, 동사는 V-기 위해를 사용해요.',
      L(
        '앞말이 명사인지 동사인지에 따라 형태가 달라져요.',
        'Oldingi qism ot yoki fe’l ekaniga qarab shakl o‘zgaradi.',
        'The form changes depending on whether the preceding element is a noun or verb.',
        'Форма зависит от того, стоит перед ней существительное или глагол.',
      ),
      ['purpose-form-contrast'],
    ),
  ),

  s5u9_162_type_answer: purposeTypeAnswer(
    '어린이를 위해 행사를 준비했어요',
    L(
      '행사가 어린이들을 위한 것이라는 뜻으로 명사 목적 표현을 사용하세요.',
      'Tadbir bolalar uchun ekanini ot bilan maqsad shaklida yozing.',
      'Use the noun-purpose form to say that the event was prepared for children.',
      'Используйте форму цели после существительного: мероприятие подготовили для детей.',
    ),
    'The event was prepared for children.',
    ['어린이를 위해'],
    ['n-eul-reul-wihae', 'form-contrast', 'type-answer'],
  ),

  s5u9_163_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '어린이들을 위해 행사를 준비했습니다.',
        'Bolalar uchun tadbir tayyorlandi.',
        'An event was prepared for children.',
        'Для детей подготовили мероприятие.',
      ),
      [
        '행사를 준비했어요',
        '어린이를 위해',
        '어린이를 기 위해',
        '어린이 때문에',
        '기념하기 위해',
        '국기를 달았어요',
      ],
      '어린이를 위해 행사를 준비했어요',
      L(
        '어린이는 명사이므로 기를 추가하지 않아요.',
        '어린이 ot bo‘lgani uchun 기 qo‘shilmaydi.',
        '어린이 is a noun, so 기 is not added.',
        '어린이 — существительное, поэтому 기 не добавляется.',
      ),
      ['n-eul-reul-wihae', 'form-contrast'],
    ),
  ),

  s5u9_164_fill_in_blank: grammarQuestion(
    fillBlank(
      '어린이___ 행사를 준비했어요.',
      ['를 위해'],
      ['를 위해', '기 위해', '에게서', '다가', '면서'],
      L(
        '명사 어린이 뒤에는 를 위해를 사용해요.',
        '어린이 otidan keyin 를 위해 ishlatiladi.',
        'Use 를 위해 after the noun 어린이.',
        'После существительного 어린이 используется 를 위해.',
      ),
      ['n-eul-reul-wihae', 'form-contrast'],
    ),
  ),

  s5u9_165_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사를 준비했어요',
        '어린이날을 기념하기 위해',
        '학교에서',
        '어린이날을 위해서 기념하고',
        '어린이를 기 위해',
        '묵념을 했어요',
      ],
      '학교에서 어린이날을 기념하기 위해 행사를 준비했어요',
      L(
        '기념하다는 동사이므로 기 위해를 사용해요.',
        '기념하다 fe’l bo‘lgani uchun 기 위해 ishlatiladi.',
        'Because 기념하다 is a verb, use 기 위해.',
        'Поскольку 기념하다 — глагол, используется 기 위해.',
      ),
      ['v-gi-wihae', 'form-contrast'],
    ),
  ),

  s5u9_166_type_answer: purposeTypeAnswer(
    '어린이날을 기념하기 위해 행사를 준비했어요',
    L(
      '행사를 준비한 목적이 어린이날을 기념하는 것이었다고 동사 목적 표현으로 쓰세요.',
      'Tadbir tayyorlash maqsadi Bolalar kunini nishonlash bo‘lganini fe’l shaklida yozing.',
      'Use the verb-purpose form to say that the event was prepared to commemorate Children’s Day.',
      'Используйте форму цели после глагола: мероприятие подготовили, чтобы отметить День детей.',
    ),
    'The event was prepared in order to commemorate Children’s Day.',
    ['기념하기 위해'],
    ['v-gi-wihae', 'form-contrast', 'type-answer'],
  ),

  s5u9_167_error_hunt: grammarQuestion(
    errorHunt(
      '어린이기 위해 특별한 행사를 준비했어요.',
      '어린이기',
      ['어린이를', '어린이가', '어린이의', '어린이에게'],
      '어린이를',
      L(
        '행동의 대상이 어린이이므로 어린이를 위해라고 해요.',
        'Harakat bolalar uchun bo‘lgani uchun 어린이를 위해 ishlatiladi.',
        'Because the action is for children, use 어린이를 위해.',
        'Поскольку действие совершается ради детей, используется 어린이를 위해.',
      ),
      ['n-eul-reul-wihae', 'childrens-day', 'error-hunt'],
    ),
  ),
  s5u9_168_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날을 기념하기 위해 행사를 열었습니다.',
        'Hangul kunini nishonlash uchun tadbir o‘tkazildi.',
        'An event was held to commemorate Hangeul Day.',
        'Мероприятие провели, чтобы отметить День хангыля.',
      ),
      [
        '행사를 열었어요',
        '한글날을 기념하기 위해',
        '한글날을 위해서 기념하고',
        '한글날 때문에',
        '한글날에게',
        '나무를 심었어요',
      ],
      '한글날을 기념하기 위해 행사를 열었어요',
      L(
        '기념하다라는 동작 자체가 목적이므로 V-기 위해를 써요.',
        'Maqsad 기념하다 harakatining o‘zi bo‘lgani uchun V-기 위해 ishlatiladi.',
        'Because the action 기념하다 itself is the purpose, use V-기 위해.',
        'Поскольку целью является само действие 기념하다, используется V-기 위해.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_169_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '다음 두 표현을 비교하세요. “자연을 위해 나무를 심어요.”는 자연이라는 대상을 위한 행동이고, “자연을 보호하기 위해 나무를 심어요.”는 보호하다라는 목적 행동을 나타냅니다.',
      [
        '두 문장은 비슷하지만 앞부분의 문법 구조가 달라요.',
        '두 문장은 문법과 의미가 완전히 같아요.',
        '두 번째 문장에는 목적이 없어요.',
        '첫 번째 문장은 과거 사건만 나타내요.',
      ],
      '두 문장은 비슷하지만 앞부분의 문법 구조가 달라요.',
      L(
        '의미가 가까워도 N을 위해와 V-기 위해의 구조는 구별해야 해요.',
        'Ma’no yaqin bo‘lsa ham N을 위해 va V-기 위해 tuzilishi farq qiladi.',
        'Even when meanings are close, distinguish the structures N을 위해 and V-기 위해.',
        'Даже при близком значении нужно различать структуры N을 위해 и V-기 위해.',
      ),
      ['purpose-form-contrast'],
    ),
  ),

  s5u9_170_fill_in_blank: grammarQuestion(
    fillBlank(
      '자연을 보호하___ 나무를 심어요.',
      ['기 위해'],
      ['기 위해', '를 위해', '에게', '다가', '면서'],
      L(
        '보호하다는 동사이므로 보호하기 위해라고 해요.',
        '보호하다 fe’l, shuning uchun 보호하기 위해.',
        '보호하다 is a verb, so use 보호하기 위해.',
        '보호하다 — глагол, поэтому используется 보호하기 위해.',
      ),
      ['v-gi-wihae', 'form-contrast'],
    ),
  ),

  s5u9_171_type_answer: purposeTypeAnswer(
    '자연을 위해 나무를 심어요',
    L(
      '자연이라는 대상을 위한 행동이라는 뜻으로 N을/를 위해를 사용하세요.',
      'Harakat tabiat uchun ekanini N을/를 위해 bilan yozing.',
      'Use N을/를 위해 to say that trees are planted for nature.',
      'Используйте N을/를 위해, чтобы сказать, что деревья сажают ради природы.',
    ),
    'Trees are planted for nature.',
    ['자연을 위해'],
    ['n-eul-reul-wihae', 'form-contrast', 'type-answer'],
  ),

  s5u9_172_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '자연을 보호하기 위해 나무를 심습니다.',
        'Tabiatni himoya qilish uchun daraxt ekamiz.',
        'We plant trees in order to protect nature.',
        'Мы сажаем деревья, чтобы защищать природу.',
      ),
      [
        '자연을 보호하기 위해',
        '나무를 심어요',
        '자연을 위해서 보호하고',
        '나무 때문에',
        '국기를 달아요',
        '묵념을 해요',
      ],
      '자연을 보호하기 위해 나무를 심어요',
      L(
        '구체적인 목적 행동이 있으면 V-기 위해를 사용할 수 있어요.',
        'Aniq maqsad harakati bo‘lsa V-기 위해 ishlatiladi.',
        'Use V-기 위해 when a specific action is the purpose.',
        'Когда целью является конкретное действие, используется V-기 위해.',
      ),
      ['v-gi-wihae', 'form-contrast'],
    ),
  ),

  s5u9_173_cloze_passage: grammarQuestion(
    clozePassage(
      '___을 위해 나무를 심어요. 자연을 ___ 위해 나무를 심어요.',
      ['자연', '보호하기'],
      ['보호하기', '자연', '보호해서', '환경이', '기념', '묵념'],
      L(
        '첫 문장은 명사 목적, 두 번째 문장은 동사 목적이에요.',
        'Birinchi gapda ot maqsadi, ikkinchisida fe’l maqsadi.',
        'The first uses a noun purpose; the second uses a verb purpose.',
        'В первом предложении цель выражена существительным, во втором — глаголом.',
      ),
      ['purpose-form-contrast'],
    ),
  ),

  s5u9_174_word_arrange: grammarQuestion(
    wordArrange(
      [
        '감사 카드를 만들었어요',
        '선생님을 위해',
        '스승의 날에',
        '선생님께 감사드리기 위해',
        '국기를 달고',
        '묵념을 했어요',
      ],
      '스승의 날에 선생님을 위해 감사 카드를 만들었어요',
      L(
        '선생님이라는 대상 자체를 위한 행동이면 N을 위해를 사용할 수 있어요.',
        'Harakat o‘qituvchi uchun bo‘lsa N을 위해 ishlatiladi.',
        'When the action is for the teacher as the beneficiary, use N을 위해.',
        'Если действие делается ради учителя как получателя пользы, используется N을 위해.',
      ),
      ['n-eul-reul-wihae', 'teachers-day'],
    ),
  ),

  s5u9_175_type_answer: purposeTypeAnswer(
    '선생님께 감사드리기 위해 카드를 만들었어요',
    L(
      '카드를 만든 구체적인 목적이 선생님께 감사하는 것이었다고 쓰세요.',
      'Kartani yaratishning aniq maqsadi o‘qituvchiga minnatdorchilik bildirish bo‘lganini yozing.',
      'Write that the card was made specifically in order to thank the teacher.',
      'Напишите, что открытку сделали именно для того, чтобы поблагодарить учителя.',
    ),
    'The card was made in order to thank the teacher.',
    ['감사드리기 위해'],
    ['v-gi-wihae', 'teachers-day', 'type-answer'],
  ),

  s5u9_176_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '“부모님을 위해 선물을 샀어요.”와 “부모님께 감사하기 위해 선물을 샀어요.”의 차이를 가장 잘 설명한 것을 고르세요.',
      [
        '첫 문장은 대상을, 두 번째 문장은 구체적인 목적 행동을 강조해요.',
        '첫 문장만 목적이 있고 두 번째 문장에는 목적이 없어요.',
        '두 번째 문장은 반드시 과거 사실 전달이에요.',
        '두 표현은 사용할 수 없는 문장이에요.',
      ],
      '첫 문장은 대상을, 두 번째 문장은 구체적인 목적 행동을 강조해요.',
      L(
        '비슷한 상황에서도 무엇을 강조하는지에 따라 구조를 선택할 수 있어요.',
        'O‘xshash vaziyatda ham nimani ta’kidlashga qarab tuzilma tanlanadi.',
        'Even in similar situations, the structure depends on what is being emphasized.',
        'Даже в похожей ситуации структура зависит от того, что подчёркивается.',
      ),
      ['purpose-form-contrast'],
    ),
  ),

  s5u9_177_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '부모님께 감사하기 위해 선물을 샀습니다.',
        'Ota-onaga minnatdorchilik bildirish uchun sovg‘a sotib oldim.',
        'I bought a gift in order to thank my parents.',
        'Я купил подарок, чтобы поблагодарить родителей.',
      ),
      [
        '선물을 샀어요',
        '부모님께 감사하기 위해',
        '부모님을 위해서 감사하고',
        '부모님 때문에',
        '나무를 심었어요',
        '국기를 달았어요',
      ],
      '부모님께 감사하기 위해 선물을 샀어요',
      L(
        '감사하다라는 구체적인 목적을 강조하는 문장이에요.',
        'Bu minnatdorchilik bildirish maqsadini aniq ta’kidlaydi.',
        'This sentence emphasizes the specific purpose of thanking the parents.',
        'Это предложение подчёркивает конкретную цель — поблагодарить родителей.',
      ),
      ['v-gi-wihae', 'parents-day'],
    ),
  ),

  s5u9_178_fill_in_blank: grammarQuestion(
    fillBlank(
      '부모님___ 선물을 준비했어요.',
      ['을 위해'],
      ['을 위해', '기 위해', '에게서', '다가', '면서'],
      L(
        '부모님은 명사이므로 부모님을 위해라고 해요.',
        '부모님 ot bo‘lgani uchun 부모님을 위해 ishlatiladi.',
        '부모님 is a noun, so use 부모님을 위해.',
        '부모님 — существительное, поэтому используется 부모님을 위해.',
      ),
      ['n-eul-reul-wihae', 'form-contrast'],
    ),
  ),

  s5u9_179_error_hunt: grammarQuestion(
    errorHunt(
      '부모님께 감사하다 위해 편지를 썼어요.',
      '감사하다',
      ['감사하기', '감사하는', '감사했기', '감사하려고'],
      '감사하기',
      L(
        '목적을 나타낼 때는 감사하기 위해라고 해요.',
        'Maqsad uchun 감사하기 위해 ishlatiladi.',
        'For purpose, use 감사하기 위해.',
        'Для выражения цели используется 감사하기 위해.',
      ),
      ['v-gi-wihae', 'parents-day', 'error-hunt'],
    ),
  ),
  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 한글날을 왜 기념해요?
  // 목적 표현으로 기념일 설명하기
  // ──────────────────────────────────────────────────────────

  s5u9_181_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날에 여러 행사를 하는 이유는 단순히 쉬기 위해서가 아닙니다. 한글의 역사와 가치를 기억하고 더 많은 사람에게 알리기 위해 행사를 합니다.',
      [
        '한글의 가치와 의미를 알리기 위해 행사를 해요.',
        '한글을 잊기 위해 행사를 해요.',
        '공휴일이라서만 행사를 해요.',
        '행사를 하다가 한글이 생겼어요.',
      ],
      '한글의 가치와 의미를 알리기 위해 행사를 해요.',
      L(
        '한글날 행사의 실제 목적을 이해하는 문제예요.',
        'Hangul kuni tadbirining haqiqiy maqsadi tushuniladi.',
        'This checks understanding of the actual purpose of Hangeul Day events.',
        'Проверяется понимание реальной цели мероприятий ко Дню хангыля.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_182_type_answer: purposeTypeAnswer(
    '한글의 가치를 알리기 위해 여러 행사를 해요',
    L(
      '한글의 가치를 많은 사람에게 알리는 것을 목적으로 여러 행사를 한다고 쓰세요.',
      'Hangulning qadriyatini ko‘p odamlarga tanitish uchun turli tadbirlar o‘tkazilishini yozing.',
      'Write that various events are held in order to share the value of Hangeul.',
      'Напишите, что различные мероприятия проводят, чтобы рассказать людям о ценности хангыля.',
    ),
    'Various events are held in order to share the value of Hangeul.',
    ['알리기 위해'],
    ['v-gi-wihae', 'hangeul-day', 'type-answer'],
  ),

  s5u9_183_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글의 가치와 역사를 알리기 위해 여러 행사를 합니다.',
        'Hangulning qadri va tarixini tanitish uchun turli tadbirlar o‘tkaziladi.',
        'Various events are held in order to share the value and history of Hangeul.',
        'Различные мероприятия проводят, чтобы рассказать о ценности и истории хангыля.',
      ),
      [
        '여러 행사를 해요',
        '한글의 가치와 역사를',
        '알리기 위해',
        '한글을 잊기 위해',
        '공휴일 때문에',
        '나무를 심기 위해',
      ],
      '한글의 가치와 역사를 알리기 위해 여러 행사를 해요',
      L(
        '한글날을 실제로 설명할 수 있는 생산 문장이에요.',
        'Bu Hangul kunini haqiqiy tushuntirish uchun ishlatiladigan gap.',
        'This is a productive sentence for actually explaining Hangeul Day.',
        'Это продуктивное предложение для реального объяснения Дня хангыля.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_184_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글의 가치를 알리___ 여러 행사를 해요.',
      ['기 위해'],
      ['기 위해', '다가', '면서', '지만', '다고'],
      L(
        '목적 동사 알리다는 알리기 위해로 만들어요.',
        'Maqsad fe’li 알리다 → 알리기 위해.',
        'The purpose form of 알리다 is 알리기 위해.',
        'Форма цели от 알리다 — 알리기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_185_word_arrange: grammarQuestion(
    wordArrange(
      [
        '기념식을 열어요',
        '한글날을 기념하기 위해',
        '10월 9일에',
        '나무를 심기 위해',
        '부모님을 위해',
        '묵념을 하기 위해',
      ],
      '10월 9일에 한글날을 기념하기 위해 기념식을 열어요',
      L(
        '날짜, 목적, 행동을 한 문장에 연결해요.',
        'Sana, maqsad va harakat bir gapda bog‘lanadi.',
        'Connect the date, purpose, and action in one sentence.',
        'Соединяем дату, цель и действие в одном предложении.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_186_type_answer: purposeTypeAnswer(
    '한글날을 기념하기 위해 기념식을 열어요',
    L(
      '한글날을 기념하는 것을 목적으로 기념식을 연다고 쓰세요.',
      'Hangul kunini nishonlash maqsadida marosim o‘tkazilishini yozing.',
      'Write that a ceremony is held in order to commemorate Hangeul Day.',
      'Напишите, что церемонию проводят, чтобы отметить День хангыля.',
    ),
    'A ceremony is held in order to commemorate Hangeul Day.',
    ['기념하기 위해'],
    ['v-gi-wihae', 'hangeul-day', 'type-answer'],
  ),

  s5u9_187_error_hunt: grammarQuestion(
    errorHunt(
      '한글의 가치를 알리다 위해 행사를 준비했어요.',
      '알리다',
      ['알리기', '알리는', '알렸기', '알리려고'],
      '알리기',
      L(
        'V-기 위해를 사용하므로 알리기 위해가 맞아요.',
        'V-기 위해 ishlatilgani uchun 알리기 위해 to‘g‘ri.',
        'Because the target form is V-기 위해, 알리기 위해 is correct.',
        'Поскольку используется V-기 위해, правильно 알리기 위해.',
      ),
      ['v-gi-wihae', 'hangeul-day', 'error-hunt'],
    ),
  ),
  s5u9_188_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '많은 사람에게 한글의 의미를 알리기 위해 한글날 행사를 준비합니다.',
        'Ko‘p odamlarga Hangul ma’nosini tanitish uchun Hangul kuni tadbiri tayyorlanadi.',
        'A Hangeul Day event is prepared in order to share the meaning of Hangeul with many people.',
        'Мероприятие ко Дню хангыля готовят, чтобы рассказать многим людям о значении хангыля.',
      ),
      [
        '한글날 행사를 준비해요',
        '많은 사람에게',
        '한글의 의미를 알리기 위해',
        '한글 때문에',
        '식목일을 기념하기 위해',
        '국기를 내리기 위해',
      ],
      '많은 사람에게 한글의 의미를 알리기 위해 한글날 행사를 준비해요',
      L(
        '목적의 대상과 목적 행동을 한 문장 안에서 함께 표현할 수도 있어요.',
        'Maqsadning kimga qaratilgani va maqsad harakati bir gapda birga kelishi mumkin.',
        'The audience and the purpose action can both appear in the same sentence.',
        'В одном предложении можно указать и адресата, и действие-цель.',
      ),
      ['v-gi-wihae', 'hangeul-day'],
    ),
  ),

  s5u9_189_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '광복절에 사람들이 국기를 다는 이유를 설명하려고 합니다. 다음 중 목적 표현이 가장 자연스러운 문장을 고르세요.',
      [
        '광복의 의미를 기억하기 위해 국기를 달아요.',
        '광복의 의미가 기억돼서만 국기를 달아요.',
        '국기를 달다가 광복이 되었어요.',
        '국기를 달았는데도 광복을 기억하지 않아요.',
      ],
      '광복의 의미를 기억하기 위해 국기를 달아요.',
      L(
        '대표 행동의 이유를 목적 표현으로 설명해요.',
        'Odatiy harakatning sababi maqsad shaklida tushuntiriladi.',
        'The reason for a typical commemorative action is explained as a purpose.',
        'Причина типичного памятного действия объясняется через цель.',
      ),
      ['v-gi-wihae', 'liberation-day-korea'],
    ),
  ),

  s5u9_190_fill_in_blank: grammarQuestion(
    fillBlank(
      '광복의 의미를 기억하___ 국기를 달아요.',
      ['기 위해'],
      ['기 위해', '다가', '면서', '지만', '다고'],
      L(
        '기억하다의 목적형은 기억하기 위해예요.',
        '기억하다 → 기억하기 위해.',
        '기억하다 becomes 기억하기 위해.',
        '기억하다 превращается в 기억하기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_191_type_answer: purposeTypeAnswer(
    '광복의 의미를 기억하기 위해 국기를 달아요',
    L(
      '광복절에 국기를 다는 목적이 광복의 의미를 기억하는 것이라고 쓰세요.',
      'Ozodlik kunida bayroq osish maqsadi ozodlik ma’nosini eslash ekanini yozing.',
      'Write that the flag is displayed in order to remember the meaning of liberation.',
      'Напишите, что флаг вывешивают, чтобы помнить значение освобождения.',
    ),
    'The national flag is displayed in order to remember the meaning of liberation.',
    ['기억하기 위해'],
    ['v-gi-wihae', 'liberation-day-korea', 'type-answer'],
  ),

  s5u9_192_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '광복의 의미를 기억하기 위해 광복절에 국기를 답니다.',
        'Ozodlik ma’nosini eslash uchun Ozodlik kunida bayroq osiladi.',
        'The national flag is displayed on Liberation Day in order to remember the meaning of liberation.',
        'В День освобождения вывешивают флаг, чтобы помнить значение освобождения.',
      ),
      [
        '광복절에',
        '국기를 달아요',
        '광복의 의미를 기억하기 위해',
        '광복절 때문에만',
        '한글을 알리기 위해',
        '나무를 심어요',
      ],
      '광복의 의미를 기억하기 위해 광복절에 국기를 달아요',
      L(
        '기념일의 날짜나 이름뿐 아니라 행동의 목적까지 설명해요.',
        'Bayram nomi bilan birga harakat maqsadi ham tushuntiriladi.',
        'Explain not only the commemorative day but also the purpose of its action.',
        'Объясняется не только сам памятный день, но и цель действия.',
      ),
      ['v-gi-wihae', 'liberation-day-korea'],
    ),
  ),

  s5u9_193_cloze_passage: grammarQuestion(
    clozePassage(
      '한글의 가치를 ___ 위해 한글날 행사를 하고, 광복의 의미를 ___ 위해 국기를 달아요.',
      ['알리기', '기억하기'],
      ['기억하기', '알리기', '알려서', '기억하면서', '심기', '달기'],
      L(
        '서로 다른 기념일의 목적을 구체적인 동사로 표현해요.',
        'Turli bayramlarning maqsadi aniq fe’llar bilan ifodalanadi.',
        'Express the purposes of different commemorative days with specific verbs.',
        'Выражаем цели разных памятных дней конкретными глаголами.',
      ),
      ['v-gi-wihae', 'integration'],
    ),
  ),

  s5u9_194_word_arrange: grammarQuestion(
    wordArrange(
      [
        '묵념을 해요',
        '희생한 사람들을 기억하기 위해',
        '현충일에는',
        '불꽃놀이를 하기 위해',
        '국기를 내리고',
        '나무를 심어요',
      ],
      '현충일에는 희생한 사람들을 기억하기 위해 묵념을 해요',
      L(
        '현충일의 대표 행동과 목적을 정확하게 연결해요.',
        'Xotira kunidagi asosiy harakat va maqsad aniq bog‘lanadi.',
        'Accurately connect Memorial Day’s typical action with its purpose.',
        'Точно связываем типичное действие в День памяти с его целью.',
      ),
      ['v-gi-wihae', 'memorial-day-korea'],
    ),
  ),

  s5u9_195_type_answer: purposeTypeAnswer(
    '현충일에는 희생한 사람들을 기억하기 위해 묵념을 해요',
    L(
      '현충일에 묵념하는 목적이 희생한 사람들을 기억하는 것이라고 쓰세요.',
      'Xotira kunida sukut saqlash maqsadi qurbon bo‘lganlarni eslash ekanini yozing.',
      'Write that a silent tribute is observed on Memorial Day in order to remember those who sacrificed.',
      'Напишите, что в День памяти соблюдают минуту молчания, чтобы помнить погибших.',
    ),
    'A silent tribute is observed on Memorial Day in order to remember those who sacrificed.',
    ['기억하기 위해'],
    ['v-gi-wihae', 'memorial-day-korea', 'type-answer'],
  ),

  s5u9_196_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '외국인 친구에게 한국의 기념일을 설명할 때 “한글날에는 행사를 해요.”라고만 말하는 것보다 “한글의 가치를 알리기 위해 행사를 해요.”라고 말하면 어떤 점이 더 좋아요?',
      [
        '행동의 목적까지 알 수 있어 기념일의 의미를 더 잘 이해할 수 있어요.',
        '날짜를 전혀 말할 수 없게 돼요.',
        '기념일 이름을 사용하지 못하게 돼요.',
        '행동이 과거에만 일어난다는 뜻이 돼요.',
      ],
      '행동의 목적까지 알 수 있어 기념일의 의미를 더 잘 이해할 수 있어요.',
      L(
        '이번 문법의 학습 가치를 실제 설명 능력과 연결해요.',
        'Bu grammatikaning foydasi haqiqiy tushuntirish qobiliyati bilan bog‘lanadi.',
        'This connects the grammar to the ability to explain commemorative days meaningfully.',
        'Грамматика связывается с умением содержательно объяснять памятные дни.',
      ),
      ['purpose-expression', 'learning-value'],
    ),
  ),

  s5u9_197_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '현충일에는 나라를 위해 희생한 사람들을 기리기 위해 묵념합니다.',
        'Xotira kunida vatan uchun qurbon bo‘lganlarni yodga olish uchun sukut saqlanadi.',
        'On Memorial Day, people observe a silent tribute in order to honor those who sacrificed for the country.',
        'В День памяти соблюдают минуту молчания, чтобы почтить тех, кто пожертвовал собой ради страны.',
      ),
      [
        '묵념을 해요',
        '나라를 위해 희생한 사람들을',
        '기리기 위해',
        '현충일에는',
        '불꽃놀이를 하기 위해',
        '나무를 심어요',
      ],
      '현충일에는 나라를 위해 희생한 사람들을 기리기 위해 묵념을 해요',
      L(
        '한 문장 안에서 N을 위해와 V-기 위해를 함께 사용할 수도 있어요.',
        'Bir gapda N을 위해 va V-기 위해 birga ishlatilishi mumkin.',
        'N을 위해 and V-기 위해 can appear together in the same sentence.',
        'N을 위해 и V-기 위해 могут использоваться вместе в одном предложении.',
      ),
      ['n-eul-reul-wihae', 'v-gi-wihae', 'memorial-day-korea'],
    ),
  ),

  s5u9_198_fill_in_blank: grammarQuestion(
    fillBlank(
      '희생한 사람들을 기리___ 묵념을 해요.',
      ['기 위해'],
      ['기 위해', '를 위해', '다가', '면서', '지만'],
      L(
        '기리다는 동사이므로 V-기 위해를 사용해요.',
        '기리다 fe’l bo‘lgani uchun V-기 위해 ishlatiladi.',
        '기리다 is a verb, so use V-기 위해.',
        '기리다 — глагол, поэтому используется V-기 위해.',
      ),
      ['v-gi-wihae', 'form'],
    ),
  ),

  s5u9_199_error_hunt: grammarQuestion(
    errorHunt(
      '한글의 가치를 알리기를 위해 여러 행사를 해요.',
      '알리기를',
      ['알리기', '알려서', '알리면서', '알리다가'],
      '알리기',
      L(
        'V-기 위해에서는 기 뒤에 목적격 조사 를을 붙이지 않아요.',
        'V-기 위해da 기 dan keyin 를 qo‘shilmaydi.',
        'Do not add 를 after 기 in V-기 위해.',
        'В конструкции V-기 위해 после 기 не добавляется 를.',
      ),
      ['v-gi-wihae', 'conjugation'],
    ),
  ),

  // ══════════════════════════════════════════════════════════
  // Node 3 · V-아지다/어지다
  // 행위자가 아니라 행동을 받는 대상에 초점을 두는 피동 표현
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 한글은 만들어졌어요
  // 기본 피동 의미와 형태
  // ──────────────────────────────────────────────────────────

  s5u9_201_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '세종대왕이 한글을 만들었습니다. 같은 내용을 한글에 초점을 두어 표현하려고 합니다.',
      [
        '한글은 세종대왕에 의해 만들어졌어요.',
        '한글은 세종대왕을 만들었어요.',
        '한글은 세종대왕에게 만들었어요.',
        '한글은 세종대왕과 만들었어요.',
      ],
      '한글은 세종대왕에 의해 만들어졌어요.',
      L(
        '행동을 한 사람보다 만들어진 대상인 한글에 초점을 둔 피동 표현이에요.',
        'Gap harakatni qilgan odamdan ko‘ra yaratilgan Hangulga e’tibor qaratadi.',
        'The passive sentence focuses on Hangeul, the thing that was created.',
        'Пассивное предложение ставит в центр хангыль — объект создания.',
      ),
      ['v-a-eojida', 'be-made', 'passive'],
    ),
  ),

  s5u9_202_type_answer: passiveTypeAnswer(
    '한글은 세종대왕에 의해 만들어졌어요',
    L(
      '“세종대왕이 한글을 만들었어요”를 한글에 초점을 둔 피동문으로 바꾸세요.',
      '“Qirol Sejong Hangulni yaratdi” gapini Hangulga urg‘u berilgan majhul gapga aylantiring.',
      'Change “King Sejong created Hangeul” into a passive sentence focusing on Hangeul.',
      'Преобразуйте «Король Седжон создал хангыль» в пассивное предложение с акцентом на хангыль.',
    ),
    'Hangeul was created by King Sejong.',
    ['만들어졌어요'],
    ['v-a-eojida', 'be-made', 'type-answer'],
  ),

  s5u9_203_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글은 세종대왕에 의해 만들어졌습니다.',
        'Hangul qirol Sejong tomonidan yaratilgan.',
        'Hangeul was created by King Sejong.',
        'Хангыль был создан королём Седжоном.',
      ),
      [
        '세종대왕에 의해',
        '한글은',
        '만들어졌어요',
        '한글을 만들었어요',
        '세종대왕을 만들었어요',
        '알려졌어요',
      ],
      '한글은 세종대왕에 의해 만들어졌어요',
      L(
        '만들다는 피동 표현에서 만들어지다가 돼요.',
        '만들다 majhul shaklda 만들어지다 bo‘ladi.',
        '만들다 becomes 만들어지다 in this passive construction.',
        '만들다 в этой пассивной конструкции превращается в 만들어지다.',
      ),
      ['v-a-eojida', 'be-made'],
    ),
  ),

  s5u9_204_fill_in_blank: grammarQuestion(
    fillBlank(
      '이 책은 여러 사람의 도움으로 만들___어요.',
      ['어졌'],
      ['어졌', '아졌', '다가', '면서', '려고 했'],
      L(
        '만들다에 어지다가 결합하면 만들어지다가 돼요.',
        '만들다 + 어지다 → 만들어지다.',
        '만들다 + 어지다 becomes 만들어지다.',
        '만들다 + 어지다 превращается в 만들어지다.',
      ),
      ['v-a-eojida', 'be-made', 'form'],
    ),
  ),

  s5u9_205_word_arrange: grammarQuestion(
    wordArrange(
      [
        '여러 사람의 도움으로',
        '이 자료는',
        '만들어졌어요',
        '여러 사람이 만들었고',
        '자료를 알려졌어요',
        '세워졌어요',
      ],
      '이 자료는 여러 사람의 도움으로 만들어졌어요',
      L(
        '행동을 받은 대상인 자료가 문장의 중심이에요.',
        'Harakatni qabul qilgan material gapning markazida.',
        'The material receiving the action is the focus of the sentence.',
        'В центре предложения находится материал, над которым совершено действие.',
      ),
      ['v-a-eojida', 'be-made'],
    ),
  ),

  s5u9_206_type_answer: passiveTypeAnswer(
    '기념비가 광장에 세워졌어요',
    L(
      '누군가 광장에 기념비를 세웠다는 내용을 기념비에 초점을 두어 쓰세요.',
      'Kimdir maydonga yodgorlik o‘rnatganini yodgorlikka urg‘u berib yozing.',
      'Write that a monument was erected in the square, focusing on the monument.',
      'Напишите, что на площади установили памятник, с акцентом на памятник.',
    ),
    'A monument was erected in the square.',
    ['세워졌어요'],
    ['v-a-eojida', 'be-erected', 'type-answer'],
  ),

  s5u9_207_error_hunt: grammarQuestion(
    errorHunt(
      '한글은 세종대왕에 의해 만들아졌어요.',
      '만들아졌어요.',
      ['만들어졌어요.', '만들았어요.', '만들다가요.', '만들면서요.'],
      '만들어졌어요.',
      L(
        '만들다는 만들어지다로 활용해요.',
        '만들다 → 만들어지다.',
        '만들다 becomes 만들어지다.',
        '만들다 превращается в 만들어지다.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_208_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '광장에 새로운 기념비가 세워졌습니다.',
        'Maydonga yangi yodgorlik o‘rnatildi.',
        'A new monument was erected in the square.',
        'На площади установили новый памятник.',
      ),
      [
        '새로운 기념비가',
        '광장에',
        '세워졌어요',
        '기념비를 세웠어요',
        '지어졌어요',
        '알려졌어요',
      ],
      '광장에 새로운 기념비가 세워졌어요',
      L(
        '세우다의 피동형으로 세워지다를 사용할 수 있어요.',
        '세우다ning majhul shakli sifatida 세워지다 ishlatiladi.',
        '세워지다 can be used as the passive form of 세우다.',
        '세워지다 может использоваться как пассивная форма 세우다.',
      ),
      ['v-a-eojida', 'be-erected'],
    ),
  ),

  s5u9_209_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '오래전에 사람들이 한글과 관련된 자료를 보관하기 위한 건물을 지었습니다. 지금은 건물 자체에 초점을 두어 설명하려고 합니다.',
      [
        '그 건물은 오래전에 지어졌어요.',
        '그 건물은 오래전에 지었어요.',
        '그 건물이 사람들을 지었어요.',
        '그 건물에게 사람들이 지었어요.',
      ],
      '그 건물은 오래전에 지어졌어요.',
      L(
        '짓다의 피동 표현은 지어지다예요.',
        '짓다ning majhul shakli 지어지다.',
        'The passive construction of 짓다 is 지어지다.',
        'Пассивная конструкция от 짓다 — 지어지다.',
      ),
      ['v-a-eojida', 'be-built'],
    ),
  ),

  s5u9_210_fill_in_blank: grammarQuestion(
    fillBlank(
      '이 기념관은 오래전에 지___어요.',
      ['어졌'],
      ['어졌', '아졌', '다가', '으면서', '으려고 했'],
      L(
        '짓다는 지어지다로 바뀌어요.',
        '짓다 → 지어지다.',
        '짓다 becomes 지어지다.',
        '짓다 превращается в 지어지다.',
      ),
      ['v-a-eojida', 'be-built', 'form'],
    ),
  ),

  s5u9_211_type_answer: passiveTypeAnswer(
    '이 기념관은 오래전에 지어졌어요',
    L(
      '사람들이 오래전에 이 기념관을 지었다는 내용을 피동문으로 쓰세요.',
      'Odamlar bu memorial binoni ancha oldin qurganini majhul gapda yozing.',
      'Write in the passive that this memorial hall was built a long time ago.',
      'Напишите в пассиве, что этот мемориальный зал был построен давно.',
    ),
    'This memorial hall was built a long time ago.',
    ['지어졌어요'],
    ['v-a-eojida', 'be-built', 'type-answer'],
  ),

  s5u9_212_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '이 기념관은 오래전에 지어졌습니다.',
        'Bu memorial bino ancha oldin qurilgan.',
        'This memorial hall was built a long time ago.',
        'Этот мемориальный зал был построен давно.',
      ),
      [
        '오래전에',
        '이 기념관은',
        '지어졌어요',
        '기념관을 지었어요',
        '세워졌어요',
        '알려졌어요',
      ],
      '이 기념관은 오래전에 지어졌어요',
      L(
        '누가 지었는지가 중요하지 않을 때 피동문이 자연스러워요.',
        'Kim qurgani muhim bo‘lmasa, majhul gap tabiiy.',
        'A passive sentence is natural when the builder is not important.',
        'Пассив естественен, когда неважно, кто построил здание.',
      ),
      ['v-a-eojida', 'be-built'],
    ),
  ),

  s5u9_213_cloze_passage: grammarQuestion(
    clozePassage(
      '광장에는 기념비가 ___고, 그 옆에는 기념관이 ___.',
      ['세워졌', '지어졌어요'],
      ['지어졌어요', '세워졌', '세웠', '지었어요', '알려졌', '정해졌어요'],
      L(
        '세우다와 짓다의 피동형을 구별해요.',
        '세우다 va 짓다ning majhul shakllarini farqlaymiz.',
        'Distinguish the passive forms of 세우다 and 짓다.',
        'Различаем пассивные формы 세우다 и 짓다.',
      ),
      ['v-a-eojida', 'passive-form'],
    ),
  ),

  s5u9_214_word_arrange: grammarQuestion(
    wordArrange(
      [
        '기념관이 지어졌어요',
        '기념비가 세워지고',
        '광장에',
        '기념비를 세웠고',
        '기념관을 지었어요',
        '사실이 알려졌어요',
      ],
      '광장에 기념비가 세워지고 기념관이 지어졌어요',
      L(
        '두 피동 표현을 한 문장 안에서 자연스럽게 사용해요.',
        'Ikki majhul shakl bir gapda tabiiy ishlatiladi.',
        'Use two passive expressions naturally in one sentence.',
        'Используем две пассивные формы в одном предложении.',
      ),
      ['v-a-eojida', 'be-built', 'be-erected'],
    ),
  ),

  s5u9_215_type_answer: passiveTypeAnswer(
    '이 사실이 많은 사람에게 알려졌어요',
    L(
      '누군가 이 사실을 많은 사람에게 알렸다는 내용을 사실에 초점을 둔 피동문으로 쓰세요.',
      'Kimdir bu faktni ko‘p odamlarga yetkazganini faktga urg‘u berilgan majhul gapda yozing.',
      'Write in the passive that this fact became known to many people.',
      'Напишите в пассиве, что этот факт стал известен многим людям.',
    ),
    'This fact became known to many people.',
    ['알려졌어요'],
    ['v-a-eojida', 'become-known', 'type-answer'],
  ),

  s5u9_216_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '처음에는 아는 사람이 적었던 정보가 여러 책과 행사를 통해 많은 사람에게 전해졌습니다.',
      [
        '그 정보가 널리 알려졌어요.',
        '그 정보가 사람들을 알렸어요.',
        '그 정보에게 사람들이 알려 줬어요.',
        '그 정보가 널리 세워졌어요.',
      ],
      '그 정보가 널리 알려졌어요.',
      L(
        '알리다의 행동을 받은 정보에 초점을 두면 알려지다를 사용할 수 있어요.',
        '알리다 harakatini qabul qilgan ma’lumotga urg‘u berilsa 알려지다 ishlatiladi.',
        '알려지다 focuses on the information that becomes known.',
        '알려지다 фокусируется на информации, которая становится известной.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_217_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글의 가치가 세계에 널리 알려졌습니다.',
        'Hangulning qadri dunyoga keng tanildi.',
        'The value of Hangeul became widely known around the world.',
        'Ценность хангыля стала широко известна во всём мире.',
      ),
      [
        '세계에',
        '한글의 가치가',
        '널리 알려졌어요',
        '한글의 가치를 알렸어요',
        '기념비가 세워졌어요',
        '날짜가 정해졌어요',
      ],
      '한글의 가치가 세계에 널리 알려졌어요',
      L(
        '알려지다는 정보나 가치가 많은 사람에게 알려질 때 자주 사용할 수 있어요.',
        '알려지다 ma’lumot yoki qadriyat keng tanilganda ishlatiladi.',
        '알려지다 is useful when information or value becomes widely known.',
        '알려지다 употребляется, когда информация или ценность становятся широко известны.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_218_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글의 가치가 세계에 널리 알___어요.',
      ['려졌'],
      ['려졌', '리어졌', '라졌', '리다가', '리면서'],
      L(
        '알리다와 어지다가 결합하면 알려지다가 돼요.',
        '알리다 + 어지다 → 알려지다.',
        '알리다 + 어지다 becomes 알려지다.',
        '알리다 + 어지다 превращается в 알려지다.',
      ),
      ['v-a-eojida', 'become-known', 'form'],
    ),
  ),

  s5u9_219_error_hunt: grammarQuestion(
    errorHunt(
      '한글의 가치가 세계에 널리 알라졌어요.',
      '알라졌어요.',
      ['알려졌어요.', '알렸어요.', '알리다가요.', '알리면서요.'],
      '알려졌어요.',
      L(
        '알리다의 피동 표현은 알려지다예요.',
        '알리다ning majhul shakli 알려지다.',
        'The passive expression formed here is 알려지다.',
        'Пассивная форма здесь — 알려지다.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_220_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람에게 알려졌어요',
        '한글이 만들어진 뒤',
        '그 가치도',
        '기념비가 세워졌고',
        '건물이 지어져서',
        '날짜만 정해졌어요',
      ],
      '한글이 만들어진 뒤 그 가치도 많은 사람에게 알려졌어요',
      L(
        '만들어지다와 알려지다를 실제 내용 흐름 안에서 연결해요.',
        '만들어지다 va 알려지다 mazmuniy ketma-ketlikda bog‘lanadi.',
        'Connect 만들어지다 and 알려지다 in a meaningful sequence.',
        'Связываем 만들어지다 и 알려지다 в содержательной последовательности.',
      ),
      ['v-a-eojida', 'hangeul', 'integration'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 누가 했는지보다 결과가 중요해요
  // 피동문의 초점
  // ──────────────────────────────────────────────────────────

  s5u9_221_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글을 누가 만들었는지보다 한글이라는 문자가 만들어진 사실 자체를 중심으로 설명하고 싶습니다.',
      [
        '한글이 만들어졌어요.',
        '한글이 만들었어요.',
        '한글에게 만들었어요.',
        '한글을 만들어졌어요.',
      ],
      '한글이 만들어졌어요.',
      L(
        '피동문에서는 행동을 받은 대상이 주어가 될 수 있어요.',
        'Majhul gapda harakatni qabul qilgan narsa ega bo‘lishi mumkin.',
        'In a passive sentence, the receiver of the action can become the subject.',
        'В пассивном предложении объект действия может стать подлежащим.',
      ),
      ['v-a-eojida', 'passive-focus'],
    ),
  ),

  s5u9_222_type_answer: passiveTypeAnswer(
    '한글이 만들어졌어요',
    L(
      '“사람들이 한글을 만들었어요”에서 행동한 사람을 빼고 피동으로 쓰세요.',
      '“Odamlar Hangulni yaratdi” gapidan bajaruvchini olib tashlab majhul shaklda yozing.',
      'Rewrite “People created Hangeul” in the passive without mentioning the agent.',
      'Перепишите «Люди создали хангыль» в пассиве без указания деятеля.',
    ),
    'Hangeul was created.',
    ['만들어졌어요'],
    ['v-a-eojida', 'passive-focus', 'type-answer'],
  ),

  s5u9_223_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '새로운 문자가 만들어졌습니다.',
        'Yangi yozuv yaratildi.',
        'A new writing system was created.',
        'Была создана новая письменность.',
      ),
      [
        '새로운 문자가',
        '만들어졌어요',
        '새로운 문자를',
        '만들었어요',
        '널리 알려졌어요',
        '날짜가 정해졌어요',
      ],
      '새로운 문자가 만들어졌어요',
      L(
        '행위자를 말하지 않아도 피동문은 완전한 문장이 될 수 있어요.',
        'Bajaruvchini aytmasdan ham majhul gap to‘liq bo‘lishi mumkin.',
        'A passive sentence can be complete without naming the agent.',
        'Пассивное предложение может быть полным без указания деятеля.',
      ),
      ['v-a-eojida', 'passive-focus'],
    ),
  ),

  s5u9_224_fill_in_blank: grammarQuestion(
    fillBlank(
      '새로운 문자가 만들___어요.',
      ['어졌'],
      ['어졌', '았', '다가', '면서', '려고 했'],
      L(
        '만들다를 피동으로 만들면 만들어지다가 돼요.',
        '만들다 majhul shaklda 만들어지다 bo‘ladi.',
        'The passive construction is 만들어지다.',
        'Пассивная конструкция — 만들어지다.',
      ),
      ['v-a-eojida', 'form'],
    ),
  ),

  s5u9_225_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람에게 알려졌어요',
        '새로운 문자가',
        '시간이 지나면서',
        '사람들을 알렸어요',
        '기념비를 세웠어요',
        '건물을 지었어요',
      ],
      '새로운 문자가 시간이 지나면서 많은 사람에게 알려졌어요',
      L(
        '문자가 알려지는 결과에 초점을 둔 문장이에요.',
        'Gap yozuvning tanilish natijasiga e’tibor qaratadi.',
        'The sentence focuses on the result of the writing system becoming known.',
        'Предложение фокусируется на том, что письменность стала известна.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_226_type_answer: passiveTypeAnswer(
    '새로운 문자가 많은 사람에게 알려졌어요',
    L(
      '“사람들이 새로운 문자를 많은 사람에게 알렸어요”를 피동문으로 바꾸세요.',
      '“Odamlar yangi yozuvni ko‘p odamlarga tanitdi” gapini majhulga aylantiring.',
      'Change the sentence into a passive saying the new writing system became known to many people.',
      'Преобразуйте предложение в пассив: новая письменность стала известна многим людям.',
    ),
    'The new writing system became known to many people.',
    ['알려졌어요'],
    ['v-a-eojida', 'become-known', 'type-answer'],
  ),

  s5u9_227_error_hunt: grammarQuestion(
    errorHunt(
      '새로운 문자가 많은 사람을 알려졌어요.',
      '사람을',
      ['사람에게', '사람이', '사람과', '사람부터'],
      '사람에게',
      L(
        '알려지다에서 정보를 알게 되는 사람은 에게로 나타낼 수 있어요.',
        '알려지다 bilan ma’lumotni biladigan odam 에게 bilan kelishi mumkin.',
        'With 알려지다, the people to whom something becomes known can be marked with 에게.',
        'С 알려지다 адресат, которому что-то становится известно, может оформляться через 에게.',
      ),
      ['v-a-eojida', 'particle'],
    ),
  ),

  s5u9_228_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '그 사실은 여러 나라에 널리 알려졌습니다.',
        'Bu fakt ko‘plab davlatlarda keng tanildi.',
        'That fact became widely known in many countries.',
        'Этот факт стал широко известен во многих странах.',
      ),
      [
        '여러 나라에',
        '그 사실은',
        '널리 알려졌어요',
        '사실을 알렸어요',
        '행사가 이루어졌어요',
        '날짜가 정해졌어요',
      ],
      '그 사실은 여러 나라에 널리 알려졌어요',
      L(
        '정보의 전달 결과를 중심으로 표현해요.',
        'Ma’lumotning tarqalish natijasiga urg‘u beriladi.',
        'The sentence focuses on the result of information spreading.',
        'Предложение подчёркивает результат распространения информации.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_229_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '여러 사람이 오랫동안 준비한 끝에 큰 기념 행사가 성공적으로 진행되었습니다. 행사를 준비한 사람 한 명보다 전체 결과를 중심으로 말하려고 합니다.',
      [
        '기념 행사가 성공적으로 이루어졌어요.',
        '기념 행사가 사람들을 이루었어요.',
        '기념 행사를 성공적으로 이루어졌어요.',
        '기념 행사가 성공적으로 만들었어요.',
      ],
      '기념 행사가 성공적으로 이루어졌어요.',
      L(
        '계획이나 행사가 실제로 실현된 결과를 이루어지다로 표현할 수 있어요.',
        'Reja yoki tadbir amalga oshgan natija 이루어지다 bilan ifodalanadi.',
        '이루어지다 can describe a plan or event being successfully carried out.',
        '이루어지다 может описывать осуществление плана или мероприятия.',
      ),
      ['v-a-eojida', 'be-accomplished'],
    ),
  ),

  s5u9_230_fill_in_blank: grammarQuestion(
    fillBlank(
      '기념 행사가 성공적으로 이루___어요.',
      ['어졌'],
      ['어졌', '았', '다가', '면서', '려고 했'],
      L(
        '이루다는 이루어지다로 만들 수 있어요.',
        '이루다 → 이루어지다.',
        '이루다 can form 이루어지다.',
        '이루다 может образовать 이루어지다.',
      ),
      ['v-a-eojida', 'be-accomplished', 'form'],
    ),
  ),

  s5u9_231_type_answer: passiveTypeAnswer(
    '기념 행사가 성공적으로 이루어졌어요',
    L(
      '여러 사람이 준비한 기념 행사가 성공적으로 진행되었다는 결과에 초점을 두어 쓰세요.',
      'Ko‘p odamlar tayyorlagan tadbir muvaffaqiyatli amalga oshganiga urg‘u berib yozing.',
      'Write that the commemorative event was successfully carried out.',
      'Напишите, что памятное мероприятие было успешно проведено.',
    ),
    'The commemorative event was successfully carried out.',
    ['이루어졌어요'],
    ['v-a-eojida', 'be-accomplished', 'type-answer'],
  ),

  s5u9_232_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '많은 사람의 도움으로 기념 행사가 이루어졌습니다.',
        'Ko‘p odamlarning yordami bilan tadbir amalga oshdi.',
        'The commemorative event was carried out with the help of many people.',
        'Памятное мероприятие состоялось благодаря помощи многих людей.',
      ),
      [
        '기념 행사가',
        '많은 사람의 도움으로',
        '이루어졌어요',
        '행사를 이루었어요',
        '날짜를 정했어요',
        '기념비가 세워졌어요',
      ],
      '많은 사람의 도움으로 기념 행사가 이루어졌어요',
      L(
        '과정의 주체보다 행사가 이루어진 결과를 강조해요.',
        'Jarayonni bajarganlardan ko‘ra tadbirning amalga oshgan natijasi ta’kidlanadi.',
        'The result of the event taking place is emphasized over who carried it out.',
        'Подчёркивается сам факт проведения мероприятия, а не его исполнители.',
      ),
      ['v-a-eojida', 'be-accomplished'],
    ),
  ),

  s5u9_233_cloze_passage: grammarQuestion(
    clozePassage(
      '새로운 문자가 ___고, 그 가치가 많은 사람에게 ___고, 기념 행사도 성공적으로 ___.',
      ['만들어졌', '알려졌', '이루어졌어요'],
      ['이루어졌어요', '알려졌', '만들어졌', '만들었', '알렸', '이루었어요'],
      L(
        '만들어지다, 알려지다, 이루어지다를 순서대로 구별해요.',
        '만들어지다, 알려지다 va 이루어지다ni ketma-ket farqlaymiz.',
        'Distinguish 만들어지다, 알려지다, and 이루어지다.',
        'Различаем 만들어지다, 알려지다 и 이루어지다.',
      ),
      ['v-a-eojida', 'passive-form'],
    ),
  ),

  s5u9_234_word_arrange: grammarQuestion(
    wordArrange(
      [
        '여러 사람에게 알려졌어요',
        '행사가 끝난 뒤',
        '그 의미가',
        '사람들이 의미를 알렸고',
        '기념비가 지어졌어요',
        '날짜만 세워졌어요',
      ],
      '행사가 끝난 뒤 그 의미가 여러 사람에게 알려졌어요',
      L(
        '행사의 의미가 알려지는 결과를 표현해요.',
        'Tadbir ma’nosining tanilish natijasi ifodalanadi.',
        'Express the result of the event’s meaning becoming known.',
        'Выражаем результат того, что смысл мероприятия стал известен.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_235_type_answer: passiveTypeAnswer(
    '행사 날짜가 다음 주로 정해졌어요',
    L(
      '사람들이 행사 날짜를 다음 주로 정했다는 내용을 날짜에 초점을 두어 쓰세요.',
      'Odamlar tadbir sanasini keyingi haftaga belgilaganini sanaga urg‘u berib yozing.',
      'Write in the passive that the event date was set for next week.',
      'Напишите в пассиве, что дату мероприятия назначили на следующую неделю.',
    ),
    'The event date was set for next week.',
    ['정해졌어요'],
    ['v-a-eojida', 'be-decided', 'type-answer'],
  ),

  s5u9_236_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '위원회가 회의를 해서 행사 날짜를 10월 8일로 결정했습니다. 결정한 사람보다 확정된 날짜가 중요합니다.',
      [
        '행사 날짜가 10월 8일로 정해졌어요.',
        '행사 날짜가 위원회를 정했어요.',
        '행사 날짜를 10월 8일로 정해졌어요.',
        '행사 날짜가 10월 8일을 정했어요.',
      ],
      '행사 날짜가 10월 8일로 정해졌어요.',
      L(
        '정하다의 결과에 초점을 두면 정해지다를 사용할 수 있어요.',
        '정하다 natijasiga urg‘u berilsa 정해지다 ishlatiladi.',
        '정해지다 focuses on the result of something being decided.',
        '정해지다 подчёркивает результат принятого решения.',
      ),
      ['v-a-eojida', 'be-decided'],
    ),
  ),

  s5u9_237_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사 순서가 미리 정해졌습니다.',
        'Tadbir tartibi oldindan belgilandi.',
        'The order of the event was decided in advance.',
        'Порядок мероприятия был определён заранее.',
      ),
      [
        '미리',
        '행사 순서가',
        '정해졌어요',
        '행사 순서를 정했어요',
        '알려졌어요',
        '지켜졌어요',
      ],
      '행사 순서가 미리 정해졌어요',
      L(
        '정해지다는 날짜, 시간, 순서처럼 결정된 내용을 말할 때 유용해요.',
        '정해지다 sana, vaqt va tartib kabi belgilangan narsalarda foydali.',
        '정해지다 is useful for dates, times, and orders that have been decided.',
        '정해지다 удобно использовать для дат, времени и порядка, которые были определены.',
      ),
      ['v-a-eojida', 'be-decided'],
    ),
  ),

  s5u9_238_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사 시간이 오후 두 시로 정해___어요.',
      ['졌'],
      ['졌', '서', '다가', '면서', '려고 했'],
      L(
        '정하다가 정해지다가 되고 과거형은 정해졌어요예요.',
        '정하다 → 정해지다 → 정해졌어요.',
        '정하다 becomes 정해지다, whose past form is 정해졌어요.',
        '정하다 превращается в 정해지다, прошедшая форма — 정해졌어요.',
      ),
      ['v-a-eojida', 'be-decided', 'form'],
    ),
  ),

  s5u9_239_error_hunt: grammarQuestion(
    errorHunt(
      '행사 날짜가 다음 주를 정해졌어요.',
      '주를',
      ['주로', '주가', '주와', '주부터'],
      '주로',
      L(
        '어떤 날짜나 시점으로 결정되었다고 할 때 로를 사용해 정해졌다고 표현할 수 있어요.',
        'Qaysi vaqtga belgilanganini aytishda 로 bilan 정해졌다 ishlatiladi.',
        'Use 로 to mark what date or time something was set for.',
        'Для обозначения назначенной даты или времени можно использовать 로.',
      ),
      ['v-a-eojida', 'be-decided'],
    ),
  ),

  s5u9_240_word_arrange: grammarQuestion(
    wordArrange(
      [
        '오후 두 시로 정해졌어요',
        '여러 사람이 의견을 낸 뒤',
        '행사 시간이',
        '행사 시간을 정했고',
        '사람들이 알려졌어요',
        '기념비를 지었어요',
      ],
      '여러 사람이 의견을 낸 뒤 행사 시간이 오후 두 시로 정해졌어요',
      L(
        '결정 과정의 사람보다 결정된 결과를 중심으로 표현해요.',
        'Qaror qilgan odamlardan ko‘ra yakuniy natija markazga qo‘yiladi.',
        'The final decision is emphasized over the people who made it.',
        'Подчёркивается принятое решение, а не люди, которые его приняли.',
      ),
      ['v-a-eojida', 'passive-focus'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 규칙이 잘 지켜지고 있어요
  // 규칙·행사·정보의 피동 표현
  // ──────────────────────────────────────────────────────────

  s5u9_241_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '기념 행사장에는 안전을 위한 여러 규칙이 있습니다. 참가자들이 모두 규칙대로 행동해서 규칙이 실제로 잘 시행되고 있습니다.',
      [
        '안전 규칙이 잘 지켜지고 있어요.',
        '안전 규칙이 참가자들을 지키고 있어요.',
        '안전 규칙을 잘 지켜지고 있어요.',
        '안전 규칙에게 사람들이 지켜요.',
      ],
      '안전 규칙이 잘 지켜지고 있어요.',
      L(
        '사람들이 규칙을 지키는 행동을 규칙에 초점을 두어 표현해요.',
        'Odamlarning qoidaga amal qilishi qoidaning o‘ziga urg‘u bilan ifodalanadi.',
        'The sentence focuses on the rules being observed.',
        'Предложение фокусируется на том, что правила соблюдаются.',
      ),
      ['v-a-eojida', 'be-observed'],
    ),
  ),

  s5u9_242_type_answer: passiveTypeAnswer(
    '행사장에서 안전 규칙이 잘 지켜졌어요',
    L(
      '참가자들이 행사장에서 안전 규칙을 잘 지켰다는 내용을 피동문으로 쓰세요.',
      'Ishtirokchilar tadbir joyida xavfsizlik qoidalariga yaxshi amal qilganini majhul gapda yozing.',
      'Write in the passive that the safety rules were well observed at the event.',
      'Напишите в пассиве, что на мероприятии правила безопасности хорошо соблюдались.',
    ),
    'The safety rules were well observed at the event.',
    ['지켜졌어요'],
    ['v-a-eojida', 'be-observed', 'type-answer'],
  ),

  s5u9_243_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '기념식에서 정해진 규칙이 잘 지켜졌습니다.',
        'Marosimda belgilangan qoidalarga yaxshi amal qilindi.',
        'The established rules were well observed during the ceremony.',
        'На церемонии установленные правила хорошо соблюдались.',
      ),
      [
        '잘 지켜졌어요',
        '기념식에서',
        '정해진 규칙이',
        '규칙을 잘 지켰어요',
        '정해졌어요',
        '알려졌어요',
      ],
      '기념식에서 정해진 규칙이 잘 지켜졌어요',
      L(
        '정해지다와 지켜지다를 실제 행사 절차에 함께 사용할 수 있어요.',
        '정해지다 va 지켜지다 haqiqiy tadbir tartibida birga ishlatiladi.',
        '정해지다 and 지켜지다 can be used together when describing event procedures.',
        '정해지다 и 지켜지다 можно использовать вместе при описании порядка мероприятия.',
      ),
      ['v-a-eojida', 'be-observed', 'be-decided'],
    ),
  ),

  s5u9_244_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사장에서 안전 규칙이 잘 지켜___어요.',
      ['졌'],
      ['졌', '서', '다가', '면서', '려고 했'],
      L(
        '지키다는 지켜지다로 만들 수 있어요.',
        '지키다 → 지켜지다.',
        '지키다 can become 지켜지다.',
        '지키다 может образовать 지켜지다.',
      ),
      ['v-a-eojida', 'be-observed', 'form'],
    ),
  ),

  s5u9_245_word_arrange: grammarQuestion(
    wordArrange(
      [
        '잘 지켜졌어요',
        '참가자들 사이에서',
        '행사 규칙이',
        '규칙을 정했고',
        '행사가 알려졌어요',
        '기념비가 세워졌어요',
      ],
      '행사 규칙이 참가자들 사이에서 잘 지켜졌어요',
      L(
        '규칙을 지킨 사람보다 규칙이 실제로 지켜졌다는 결과를 강조해요.',
        'Qoidaga amal qilganlardan ko‘ra qoidaning bajarilgan natijasi ta’kidlanadi.',
        'The result of the rules being observed is emphasized.',
        'Подчёркивается результат соблюдения правил.',
      ),
      ['v-a-eojida', 'be-observed'],
    ),
  ),

  s5u9_246_type_answer: passiveTypeAnswer(
    '행사 순서가 미리 정해졌어요',
    L(
      '담당자들이 행사 순서를 미리 정했다는 내용을 행사 순서에 초점을 두어 쓰세요.',
      'Mas’ullar tadbir tartibini oldindan belgilaganini tartibga urg‘u bilan yozing.',
      'Write in the passive that the event order was decided in advance.',
      'Напишите в пассиве, что порядок мероприятия определили заранее.',
    ),
    'The event order was decided in advance.',
    ['정해졌어요'],
    ['v-a-eojida', 'be-decided', 'type-answer'],
  ),

  s5u9_247_error_hunt: grammarQuestion(
    errorHunt(
      '행사 규칙이 잘 지키어졌어요.',
      '지키어졌어요.',
      ['지켜졌어요.', '지켰어요.', '지키다가요.', '지키면서요.'],
      '지켜졌어요.',
      L(
        '지키다와 어지다가 결합하면 지켜지다로 줄어들어요.',
        '지키다 + 어지다 → 지켜지다.',
        '지키다 + 어지다 contracts to 지켜지다.',
        '지키다 + 어지다 сокращается до 지켜지다.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_248_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사 날짜와 장소가 미리 정해졌습니다.',
        'Tadbir sanasi va joyi oldindan belgilandi.',
        'The date and location of the event were decided in advance.',
        'Дата и место мероприятия были определены заранее.',
      ),
      [
        '미리 정해졌어요',
        '행사 날짜와 장소가',
        '행사 날짜를 정했어요',
        '규칙이 지켜졌어요',
        '사실이 알려졌어요',
        '기념관이 지어졌어요',
      ],
      '행사 날짜와 장소가 미리 정해졌어요',
      L(
        '여러 항목이 함께 결정된 경우에도 정해지다를 사용할 수 있어요.',
        'Bir nechta narsa birga belgilansa ham 정해지다 ishlatiladi.',
        '정해지다 can also be used when multiple details are decided together.',
        '정해지다 можно использовать и когда одновременно определено несколько деталей.',
      ),
      ['v-a-eojida', 'be-decided'],
    ),
  ),

  s5u9_249_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '기념 행사에 대한 정보가 홈페이지와 안내문을 통해 많은 사람에게 전달되었습니다.',
      [
        '행사 정보가 많은 사람에게 알려졌어요.',
        '행사 정보가 사람들을 알렸어요.',
        '행사 정보가 사람들에게 세워졌어요.',
        '행사 정보를 많은 사람이 알려졌어요.',
      ],
      '행사 정보가 많은 사람에게 알려졌어요.',
      L(
        '정보가 전달되어 사람들이 알게 된 결과를 알려지다로 표현해요.',
        'Ma’lumot yetkazilib odamlar bilgani 알려지다 bilan ifodalanadi.',
        '알려지다 expresses the result of information becoming known.',
        '알려지다 выражает результат распространения информации.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_250_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사 정보가 많은 사람에게 알___어요.',
      ['려졌'],
      ['려졌', '라졌', '렸', '리다가', '리면서'],
      L(
        '알리다의 피동 표현은 알려지다예요.',
        '알리다 → 알려지다.',
        '알리다 becomes 알려지다.',
        '알리다 превращается в 알려지다.',
      ),
      ['v-a-eojida', 'become-known', 'form'],
    ),
  ),

  s5u9_251_type_answer: passiveTypeAnswer(
    '행사 정보가 인터넷을 통해 널리 알려졌어요',
    L(
      '인터넷을 통해 많은 사람이 행사 정보를 알게 되었다는 내용을 정보에 초점을 두어 쓰세요.',
      'Internet orqali ko‘p odamlar tadbir haqida bilganini ma’lumotga urg‘u bilan yozing.',
      'Write that the event information became widely known through the internet.',
      'Напишите, что информация о мероприятии широко распространилась через интернет.',
    ),
    'The event information became widely known through the internet.',
    ['알려졌어요'],
    ['v-a-eojida', 'become-known', 'type-answer'],
  ),

  s5u9_252_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사 정보가 인터넷을 통해 널리 알려졌습니다.',
        'Tadbir haqidagi ma’lumot internet orqali keng tarqaldi.',
        'The event information became widely known through the internet.',
        'Информация о мероприятии широко распространилась через интернет.',
      ),
      [
        '인터넷을 통해',
        '행사 정보가',
        '널리 알려졌어요',
        '행사 정보를 알렸어요',
        '미리 정해졌어요',
        '잘 지켜졌어요',
      ],
      '행사 정보가 인터넷을 통해 널리 알려졌어요',
      L(
        '통해와 알려지다를 사용하면 정보가 퍼진 경로도 설명할 수 있어요.',
        '통해 va 알려지다 bilan ma’lumot tarqalgan yo‘l ham tushuntiriladi.',
        'Using 통해 with 알려지다 can also show how information spread.',
        'С 통해 и 알려지다 можно показать канал распространения информации.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_253_cloze_passage: grammarQuestion(
    clozePassage(
      '행사 날짜가 미리 ___고, 정보가 널리 ___고, 현장에서는 규칙이 잘 ___.',
      ['정해졌', '알려졌', '지켜졌어요'],
      ['지켜졌어요', '정해졌', '알려졌', '정했', '알렸', '지켰어요'],
      L(
        '행사 준비부터 진행까지 자주 쓰이는 세 피동형을 구별해요.',
        'Tadbir tayyorgarligidan o‘tkazilishigacha ishlatiladigan uch majhul shaklni farqlaymiz.',
        'Distinguish three useful passive forms across event preparation and operation.',
        'Различаем три пассивные формы, полезные от подготовки до проведения мероприятия.',
      ),
      ['v-a-eojida', 'integration'],
    ),
  ),

  s5u9_254_word_arrange: grammarQuestion(
    wordArrange(
      [
        '잘 지켜졌어요',
        '정해진 순서가',
        '기념식 동안',
        '순서를 정했고',
        '사람들이 알려졌어요',
        '건물이 만들어졌어요',
      ],
      '기념식 동안 정해진 순서가 잘 지켜졌어요',
      L(
        '정해진 절차가 실제로 지켜진 결과를 표현해요.',
        'Belgilangan tartib amalda bajarilgan natija ifodalanadi.',
        'Express that the established order was actually followed.',
        'Выражаем, что установленный порядок действительно соблюдался.',
      ),
      ['v-a-eojida', 'be-observed'],
    ),
  ),

  s5u9_255_type_answer: passiveTypeAnswer(
    '행사가 계획대로 이루어졌어요',
    L(
      '여러 사람이 준비한 행사가 계획대로 진행되었다는 결과에 초점을 두어 쓰세요.',
      'Ko‘p odamlar tayyorlagan tadbir reja bo‘yicha o‘tganiga urg‘u berib yozing.',
      'Write that the event was carried out according to plan.',
      'Напишите, что мероприятие прошло по плану.',
    ),
    'The event was carried out according to plan.',
    ['이루어졌어요'],
    ['v-a-eojida', 'be-accomplished', 'type-answer'],
  ),

  s5u9_256_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '많은 사람이 준비에 참여했고 예정된 프로그램이 모두 진행되었습니다. 전체적으로 계획한 대로 행사가 끝났습니다.',
      [
        '행사가 계획대로 이루어졌어요.',
        '행사가 계획을 이루었어요.',
        '행사를 계획대로 이루어졌어요.',
        '행사가 사람들을 정했어요.',
      ],
      '행사가 계획대로 이루어졌어요.',
      L(
        '행사가 실제로 진행되고 실현된 결과에 초점을 둬요.',
        'Tadbirning amalda amalga oshgan natijasiga urg‘u beriladi.',
        'The focus is on the event being successfully carried out.',
        'В центре внимания — факт проведения мероприятия.',
      ),
      ['v-a-eojida', 'be-accomplished'],
    ),
  ),

  s5u9_257_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '기념 행사가 계획대로 이루어졌습니다.',
        'Esdalik tadbiri reja bo‘yicha amalga oshdi.',
        'The commemorative event was carried out according to plan.',
        'Памятное мероприятие прошло по плану.',
      ),
      [
        '계획대로',
        '기념 행사가',
        '이루어졌어요',
        '행사를 이루었어요',
        '규칙이 정해졌어요',
        '정보가 알려졌어요',
      ],
      '기념 행사가 계획대로 이루어졌어요',
      L(
        '이루어지다는 행사나 계획의 실현 결과를 표현하는 데 유용해요.',
        '이루어지다 tadbir yoki rejaning amalga oshganini ifodalashda foydali.',
        '이루어지다 is useful for describing a plan or event being realized.',
        '이루어지다 удобно использовать для описания осуществлённого плана или мероприятия.',
      ),
      ['v-a-eojida', 'be-accomplished'],
    ),
  ),

  s5u9_258_fill_in_blank: grammarQuestion(
    fillBlank(
      '모든 준비가 끝난 뒤 행사가 계획대로 이루___어요.',
      ['어졌'],
      ['어졌', '았', '다가', '면서', '려고 했'],
      L(
        '이루다는 이루어지다로 활용해요.',
        '이루다 → 이루어지다.',
        '이루다 becomes 이루어지다.',
        '이루다 превращается в 이루어지다.',
      ),
      ['v-a-eojida', 'be-accomplished', 'form'],
    ),
  ),

  s5u9_259_error_hunt: grammarQuestion(
    errorHunt(
      '기념식에서 정해진 규칙이 잘 지켜었어요.',
      '지켜었어요.',
      ['지켜졌어요.', '지켰어요.', '지키다가요.', '지키면서요.'],
      '지켜졌어요.',
      L(
        '피동형 지켜지다의 과거형은 지켜졌어요예요.',
        '지켜지다ning o‘tgan shakli 지켜졌어요.',
        'The past form of 지켜지다 is 지켜졌어요.',
        'Прошедшая форма 지켜지다 — 지켜졌어요.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_260_word_arrange: grammarQuestion(
    wordArrange(
      [
        '계획대로 이루어졌어요',
        '정보가 널리 알려지고',
        '규칙도 잘 지켜져서',
        '기념 행사가',
        '사람들이 정보를 알리고',
        '날짜만 정했어요',
      ],
      '정보가 널리 알려지고 규칙도 잘 지켜져서 기념 행사가 계획대로 이루어졌어요',
      L(
        '정보 전달, 규칙 준수, 행사 진행을 하나의 실제 흐름으로 연결해요.',
        'Ma’lumot tarqalishi, qoidalarga amal qilish va tadbir o‘tishini bir jarayonda bog‘laymiz.',
        'Connect information sharing, rule observance, and event execution in one realistic flow.',
        'Связываем распространение информации, соблюдение правил и проведение мероприятия в один процесс.',
      ),
      ['v-a-eojida', 'integration'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 만들어졌어요 vs 좋아졌어요
  // V-아지다/어지다 피동과 상태 변화 구별
  // ──────────────────────────────────────────────────────────

  s5u9_261_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '두 문장을 비교하세요. “책이 만들어졌어요.”에서는 누군가 책을 만든 행동을 책이 받았습니다. “날씨가 따뜻해졌어요.”에서는 날씨의 상태 자체가 변했습니다.',
      [
        '첫 문장은 피동이고 두 번째 문장은 상태 변화예요.',
        '두 문장 모두 누군가가 직접 행동한 피동문이에요.',
        '첫 문장만 상태 변화이고 두 번째는 피동이에요.',
        '두 문장은 문법적으로 완전히 같은 기능이에요.',
      ],
      '첫 문장은 피동이고 두 번째 문장은 상태 변화예요.',
      L(
        'V-아지다/어지다 피동과 A-아지다/어지다 상태 변화를 구별해야 해요.',
        'V-아지다/어지다 majhul shakli va A-아지다/어지다 holat o‘zgarishini farqlash kerak.',
        'Distinguish passive V-아지다/어지다 from state-change A-아지다/어지다.',
        'Нужно различать пассивное V-아지다/어지다 и изменение состояния A-아지다/어지다.',
      ),
      ['v-a-eojida', 'grammar-contrast'],
    ),
  ),

  s5u9_262_type_answer: passiveTypeAnswer(
    '책이 여러 언어로 만들어졌어요',
    L(
      '사람들이 책을 여러 언어로 만들었다는 내용을 책에 초점을 둔 피동문으로 쓰세요.',
      'Odamlar kitobni bir necha tilda yaratganini kitobga urg‘u bilan majhul gapda yozing.',
      'Write in the passive that the book was made in several languages.',
      'Напишите в пассиве, что книга была создана на нескольких языках.',
    ),
    'The book was made in several languages.',
    ['만들어졌어요'],
    ['v-a-eojida', 'grammar-contrast', 'type-answer'],
  ),

  s5u9_263_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '이 자료는 여러 언어로 만들어졌습니다.',
        'Bu material bir necha tilda tayyorlangan.',
        'This material was made in several languages.',
        'Этот материал был подготовлен на нескольких языках.',
      ),
      [
        '여러 언어로',
        '이 자료는',
        '만들어졌어요',
        '더 쉬워졌어요',
        '자료를 만들었어요',
        '널리 알려졌어요',
      ],
      '이 자료는 여러 언어로 만들어졌어요',
      L(
        '만들어졌다는 누군가가 만든 행동의 결과예요.',
        '만들어졌다 kimdir yaratgan harakatning natijasi.',
        '만들어졌어요 describes the result of an action performed by someone.',
        '만들어졌어요 описывает результат действия, совершённого кем-то.',
      ),
      ['v-a-eojida', 'be-made'],
    ),
  ),

  s5u9_264_fill_in_blank: grammarQuestion(
    fillBlank(
      '사람들이 자료를 만들었어요. → 자료가 ___어요.',
      ['만들어졌'],
      ['만들어졌', '좋아졌', '많아졌', '짧아졌', '넓어졌'],
      L(
        '능동문 만들다를 피동으로 바꾸면 만들어지다가 돼요.',
        'Faol 만들다 majhulda 만들어지다 bo‘ladi.',
        'Active 만들다 becomes passive 만들어지다.',
        'Активное 만들다 превращается в пассивное 만들어지다.',
      ),
      ['v-a-eojida', 'active-passive'],
    ),
  ),

  s5u9_265_word_arrange: grammarQuestion(
    wordArrange(
      [
        '사람들이 만들었어요',
        '이 안내문을',
        '이 안내문은',
        '만들어졌어요',
        '더 길어졌어요',
        '날씨가 따뜻해졌어요',
      ],
      '사람들이 이 안내문을 만들었어요',
      L(
        '피동문과 비교하기 위해 먼저 자연스러운 능동문을 확인해요.',
        'Majhul bilan solishtirish uchun avval tabiiy faol gapni ko‘ramiz.',
        'First identify the natural active sentence before comparing it with the passive.',
        'Сначала определяем естественное активное предложение для сравнения с пассивом.',
      ),
      ['v-a-eojida', 'active-passive'],
    ),
  ),

  s5u9_266_type_answer: passiveTypeAnswer(
    '이 안내문은 여러 언어로 만들어졌어요',
    L(
      '“사람들이 이 안내문을 여러 언어로 만들었어요”를 피동문으로 바꾸세요.',
      '“Odamlar bu e’lonni bir necha tilda tayyorladi” gapini majhulga aylantiring.',
      'Change the sentence into the passive: “This notice was made in several languages.”',
      'Преобразуйте в пассив: «Это объявление было подготовлено на нескольких языках».',
    ),
    'This notice was made in several languages.',
    ['만들어졌어요'],
    ['v-a-eojida', 'active-passive', 'type-answer'],
  ),

  s5u9_267_error_hunt: grammarQuestion(
    errorHunt(
      '사람들이 이 안내문이 만들었어요.',
      '안내문이',
      ['안내문을', '안내문은', '안내문에게', '안내문과'],
      '안내문을',
      L(
        '능동문에서는 만들다의 대상에 목적격 조사 을/를을 사용해요.',
        'Faol gapda 만들다ning obyektiga 을/를 qo‘shiladi.',
        'In the active sentence, the object of 만들다 takes 을/를.',
        'В активном предложении объект 만들다 оформляется через 을/를.',
      ),
      ['active-passive', 'particle'],
    ),
  ),

  s5u9_268_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '사람들이 규칙을 지켰습니다. 규칙이 잘 지켜졌습니다.',
        'Odamlar qoidalarga amal qildi. Qoidalar yaxshi bajarildi.',
        'People followed the rules. The rules were well observed.',
        'Люди соблюдали правила. Правила хорошо соблюдались.',
      ),
      [
        '사람들이 규칙을 지켰어요',
        '규칙이 잘 지켜졌어요',
        '규칙이 좋아졌어요',
        '사람들이 알려졌어요',
        '규칙을 정해졌어요',
        '행사가 이루었어요',
      ],
      '사람들이 규칙을 지켰어요 규칙이 잘 지켜졌어요',
      L(
        '능동문에서는 사람이 중심이고 피동문에서는 규칙이 중심이에요.',
        'Faol gapda odam, majhul gapda qoida markazda.',
        'The active sentence focuses on people; the passive focuses on the rules.',
        'Активное предложение фокусируется на людях, пассивное — на правилах.',
      ),
      ['v-a-eojida', 'active-passive'],
    ),
  ),

  s5u9_269_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '다음 중 이번 Node의 V-아지다/어지다 피동 표현에 해당하는 문장을 고르세요.',
      [
        '새로운 규칙이 만들어졌어요.',
        '날씨가 따뜻해졌어요.',
        '사람이 많아졌어요.',
        '길이 넓어졌어요.',
      ],
      '새로운 규칙이 만들어졌어요.',
      L(
        '만들어지다는 만들다의 행동을 받는 피동 표현이고 나머지는 상태 변화예요.',
        '만들어지다 만들다 harakatini qabul qilgan majhul shakl, qolganlari holat o‘zgarishi.',
        '만들어지다 is passive, while the other examples describe state changes.',
        '만들어지다 — пассив, остальные примеры описывают изменение состояния.',
      ),
      ['v-a-eojida', 'grammar-contrast'],
    ),
  ),

  s5u9_270_fill_in_blank: grammarQuestion(
    fillBlank(
      '“사람들이 규칙을 지켰어요”를 피동으로 바꾸면 “규칙이 잘 ___어요”가 돼요.',
      ['지켜졌'],
      ['지켜졌', '좋아졌', '넓어졌', '많아졌', '짧아졌'],
      L(
        '지키다의 피동형은 지켜지다예요.',
        '지키다ning majhul shakli 지켜지다.',
        'The passive form here is 지켜지다.',
        'Пассивная форма здесь — 지켜지다.',
      ),
      ['v-a-eojida', 'active-passive'],
    ),
  ),

  s5u9_271_type_answer: passiveTypeAnswer(
    '규칙이 참가자들에 의해 잘 지켜졌어요',
    L(
      '“참가자들이 규칙을 잘 지켰어요”를 규칙에 초점을 둔 피동문으로 쓰세요.',
      '“Ishtirokchilar qoidalarga yaxshi amal qildi” gapini qoidalarga urg‘u berilgan majhul gapga aylantiring.',
      'Rewrite “The participants followed the rules well” as a passive sentence focusing on the rules.',
      'Перепишите «Участники хорошо соблюдали правила» в пассиве с акцентом на правила.',
    ),
    'The rules were well observed by the participants.',
    ['지켜졌어요'],
    ['v-a-eojida', 'active-passive', 'type-answer'],
  ),

  s5u9_272_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사 날짜가 위원회에서 정해졌습니다.',
        'Tadbir sanasi qo‘mita tomonidan belgilandi.',
        'The event date was decided by the committee.',
        'Дата мероприятия была определена комитетом.',
      ),
      [
        '위원회에서',
        '행사 날짜가',
        '정해졌어요',
        '위원회가 날짜를 정했고',
        '날짜가 좋아졌어요',
        '행사가 알려졌어요',
      ],
      '행사 날짜가 위원회에서 정해졌어요',
      L(
        '누가 결정했는지보다 결정된 날짜를 강조하는 피동문이에요.',
        'Kim qaror qilganidan ko‘ra belgilangan sana ta’kidlanadi.',
        'The passive sentence emphasizes the decided date.',
        'Пассивное предложение подчёркивает определённую дату.',
      ),
      ['v-a-eojida', 'be-decided'],
    ),
  ),

  s5u9_273_cloze_passage: grammarQuestion(
    clozePassage(
      '사람들이 새 규칙을 만들었어요. → 새 규칙이 ___. 사람들이 그 규칙을 지켰어요. → 그 규칙이 잘 ___.',
      ['만들어졌어요', '지켜졌어요'],
      [
        '지켜졌어요',
        '만들어졌어요',
        '좋아졌어요',
        '많아졌어요',
        '만들었어요',
        '지켰어요',
      ],
      L(
        '능동문을 피동문으로 바꾸는 흐름을 두 번 연습해요.',
        'Faol gapni majhulga aylantirish ikki marta mashq qilinadi.',
        'Practise converting active sentences to passive twice.',
        'Дважды тренируем преобразование активного предложения в пассивное.',
      ),
      ['v-a-eojida', 'active-passive'],
    ),
  ),

  s5u9_274_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람에게 알려졌어요',
        '사람들이 그 사실을 알린 뒤',
        '그 사실이',
        '날씨가 따뜻해졌어요',
        '사람들이 많아졌어요',
        '길이 넓어졌어요',
      ],
      '사람들이 그 사실을 알린 뒤 그 사실이 많은 사람에게 알려졌어요',
      L(
        '능동 행동과 피동 결과의 관계를 한 문장에서 확인해요.',
        'Faol harakat va majhul natija munosabati bir gapda ko‘rsatiladi.',
        'See the relationship between an active action and its passive result.',
        'Показываем связь между активным действием и пассивным результатом.',
      ),
      ['v-a-eojida', 'active-passive'],
    ),
  ),

  s5u9_275_type_answer: passiveTypeAnswer(
    '그 사실은 쉽게 믿어지지 않았어요',
    L(
      '그 사실을 쉽게 믿을 수 없었다는 뜻을 믿어지다를 사용해 쓰세요.',
      'Bu faktga osongina ishonib bo‘lmaganini 믿어지다 bilan yozing.',
      'Using 믿어지다, write that the fact was difficult to believe.',
      'Используя 믿어지다, напишите, что в этот факт было трудно поверить.',
    ),
    'The fact was difficult to believe.',
    ['믿어지지 않았어요'],
    ['v-a-eojida', 'be-believed', 'type-answer'],
  ),

  s5u9_276_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '처음 들었을 때 너무 놀라운 이야기라서 사실이라고 생각하기가 어려웠습니다.',
      [
        '그 이야기가 쉽게 믿어지지 않았어요.',
        '그 이야기가 사람들을 믿었어요.',
        '그 이야기를 쉽게 믿어졌어요.',
        '그 이야기가 쉽게 만들어졌어요.',
      ],
      '그 이야기가 쉽게 믿어지지 않았어요.',
      L(
        '믿어지지 않다는 자연스럽게 믿을 수 없다는 뜻으로 자주 사용돼요.',
        '믿어지지 않다 tabiiy ravishda ishonish qiyinligini bildiradi.',
        '믿어지지 않다 commonly means that something is hard to believe.',
        '믿어지지 않다 часто означает, что во что-то трудно поверить.',
      ),
      ['v-a-eojida', 'be-believed'],
    ),
  ),

  s5u9_277_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '그 이야기가 처음에는 쉽게 믿어지지 않았습니다.',
        'Avvaliga bu gapga osongina ishonib bo‘lmadi.',
        'At first, the story was hard to believe.',
        'Сначала в эту историю было трудно поверить.',
      ),
      [
        '처음에는',
        '그 이야기가',
        '쉽게 믿어지지 않았어요',
        '그 이야기를 믿었어요',
        '널리 알려졌어요',
        '미리 정해졌어요',
      ],
      '그 이야기가 처음에는 쉽게 믿어지지 않았어요',
      L(
        '믿다에 어지다가 결합한 믿어지다를 부정형으로 사용해요.',
        '믿다 + 어지다 shakli 믿어지다 inkor shaklda ishlatiladi.',
        'This uses the negative form of 믿어지다.',
        'Здесь используется отрицательная форма 믿어지다.',
      ),
      ['v-a-eojida', 'be-believed'],
    ),
  ),

  s5u9_278_fill_in_blank: grammarQuestion(
    fillBlank(
      '너무 놀라워서 그 이야기가 쉽게 믿___지 않았어요.',
      ['어지'],
      ['어지', '아지', '다가', '으면서', '으려고'],
      L(
        '믿다는 믿어지다로 활용할 수 있어요.',
        '믿다 → 믿어지다.',
        '믿다 can form 믿어지다.',
        '믿다 может образовать 믿어지다.',
      ),
      ['v-a-eojida', 'be-believed', 'form'],
    ),
  ),

  s5u9_279_error_hunt: grammarQuestion(
    errorHunt(
      '그 이야기가 쉽게 믿아지지 않았어요.',
      '믿아지지',
      ['믿어지지', '믿지', '믿다가', '믿으면서'],
      '믿어지지',
      L(
        '믿다에는 어지다가 결합해 믿어지다가 돼요.',
        '믿다 + 어지다 → 믿어지다.',
        '믿다 takes 어지다 here: 믿어지다.',
        'С 믿다 здесь используется 어지다: 믿어지다.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_280_word_arrange: grammarQuestion(
    wordArrange(
      [
        '쉽게 믿어지지 않았어요',
        '처음 그 이야기를 들었을 때는',
        '너무 놀라워서',
        '이야기가 좋아졌어요',
        '날짜가 많아졌어요',
        '건물이 넓어졌어요',
      ],
      '처음 그 이야기를 들었을 때는 너무 놀라워서 쉽게 믿어지지 않았어요',
      L(
        '피동형을 실제 감정·인지 상황에서도 사용할 수 있다는 것을 익혀요.',
        'Majhul shakl hissiy va idrok vaziyatida ham ishlatilishini o‘rganamiz.',
        'Learn that this construction also appears in perception and belief expressions.',
        'Учимся использовать эту конструкцию также в ситуациях восприятия и убеждения.',
      ),
      ['v-a-eojida', 'be-believed'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 한글날을 피동 표현으로 설명해요
  // Unit 9 문맥 통합
  // ──────────────────────────────────────────────────────────

  s5u9_281_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날을 소개하는 글에서 “세종대왕이 한글을 만들었다”라고만 쓰지 않고 한글 자체를 중심으로 역사적 사실을 설명하려고 합니다.',
      [
        '한글은 세종대왕에 의해 만들어졌어요.',
        '한글은 세종대왕을 만들었어요.',
        '세종대왕은 한글에게 만들어졌어요.',
        '한글이 세종대왕에게 만들었어요.',
      ],
      '한글은 세종대왕에 의해 만들어졌어요.',
      L(
        '한글을 중심으로 역사적 사실을 설명할 때 피동 표현이 자연스러워요.',
        'Hangulni markazga qo‘yib tarixiy faktni tushuntirishda majhul shakl tabiiy.',
        'The passive is natural when Hangeul itself is the focus of the historical explanation.',
        'Пассив естественен, когда в центре исторического объяснения находится сам хангыль.',
      ),
      ['v-a-eojida', 'hangeul-day', 'integration'],
    ),
  ),

  s5u9_282_type_answer: passiveTypeAnswer(
    '한글은 세종대왕에 의해 만들어졌어요',
    L(
      '한글날 소개 글에서 한글이 세종대왕에 의해 만들어졌다는 사실을 피동으로 쓰세요.',
      'Hangul kuni haqidagi matnda Hangul qirol Sejong tomonidan yaratilganini majhul gapda yozing.',
      'In an explanation of Hangeul Day, write that Hangeul was created by King Sejong.',
      'В тексте о Дне хангыля напишите, что хангыль был создан королём Седжоном.',
    ),
    'Hangeul was created by King Sejong.',
    ['만들어졌어요'],
    ['v-a-eojida', 'hangeul-day', 'type-answer'],
  ),

  s5u9_283_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글은 세종대왕에 의해 만들어졌습니다.',
        'Hangul qirol Sejong tomonidan yaratilgan.',
        'Hangeul was created by King Sejong.',
        'Хангыль был создан королём Седжоном.',
      ),
      [
        '만들어졌어요',
        '세종대왕에 의해',
        '한글은',
        '널리 알려졌어요',
        '기념비가 세워졌어요',
        '한글을 만들었어요',
      ],
      '한글은 세종대왕에 의해 만들어졌어요',
      L(
        '한글날 설명에 바로 사용할 수 있는 핵심 피동 문장이에요.',
        'Bu Hangul kunini tushuntirishda ishlatiladigan asosiy majhul gap.',
        'This is a core passive sentence for explaining Hangeul Day.',
        'Это ключевое пассивное предложение для рассказа о Дне хангыля.',
      ),
      ['v-a-eojida', 'hangeul-day'],
    ),
  ),

  s5u9_284_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글은 세종대왕에 의해 만들___어요.',
      ['어졌'],
      ['어졌', '아졌', '다가', '면서', '려고 했'],
      L(
        '만들다의 피동형은 만들어지다예요.',
        '만들다ning majhul shakli 만들어지다.',
        'The passive form here is 만들어지다.',
        'Пассивная форма здесь — 만들어지다.',
      ),
      ['v-a-eojida', 'hangeul-day', 'form'],
    ),
  ),

  s5u9_285_word_arrange: grammarQuestion(
    wordArrange(
      [
        '널리 알려졌어요',
        '한글이 만들어진 뒤',
        '그 가치가',
        '세계에',
        '기념비가 세워졌어요',
        '행사 날짜가 정해졌어요',
      ],
      '한글이 만들어진 뒤 그 가치가 세계에 널리 알려졌어요',
      L(
        '한글의 생성과 가치의 확산을 두 피동 표현으로 연결해요.',
        'Hangulning yaratilishi va qadriyatining tarqalishi ikki majhul shakl bilan bog‘lanadi.',
        'Connect the creation of Hangeul and the spread of its value using two passive expressions.',
        'Связываем создание хангыля и распространение его ценности двумя пассивными формами.',
      ),
      ['v-a-eojida', 'hangeul-day'],
    ),
  ),

  s5u9_286_type_answer: passiveTypeAnswer(
    '한글의 가치가 세계에 널리 알려졌어요',
    L(
      '많은 사람이 한글의 가치를 알게 되었다는 내용을 한글의 가치에 초점을 두어 쓰세요.',
      'Ko‘p odamlar Hangulning qadrini bilib olganini uning qadriga urg‘u bilan yozing.',
      'Write that the value of Hangeul became widely known around the world.',
      'Напишите, что ценность хангыля стала широко известна во всём мире.',
    ),
    'The value of Hangeul became widely known around the world.',
    ['알려졌어요'],
    ['v-a-eojida', 'hangeul-day', 'type-answer'],
  ),

  s5u9_287_error_hunt: grammarQuestion(
    errorHunt(
      '한글의 가치가 세계에 널리 알려었어요.',
      '알려었어요.',
      ['알려졌어요.', '알렸어요.', '알리다가요.', '알리면서요.'],
      '알려졌어요.',
      L(
        '알려지다의 과거형은 알려졌어요예요.',
        '알려지다ning o‘tgan shakli 알려졌어요.',
        'The past form of 알려지다 is 알려졌어요.',
        'Прошедшая форма 알려지다 — 알려졌어요.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_288_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글의 가치가 여러 나라에 알려졌습니다.',
        'Hangulning qadri ko‘plab mamlakatlarga tanildi.',
        'The value of Hangeul became known in many countries.',
        'Ценность хангыля стала известна во многих странах.',
      ),
      [
        '여러 나라에',
        '한글의 가치가',
        '알려졌어요',
        '한글의 가치를 알렸어요',
        '날짜가 정해졌어요',
        '기념관이 지어졌어요',
      ],
      '한글의 가치가 여러 나라에 알려졌어요',
      L(
        '정보나 가치가 알려진 범위를 에와 함께 표현할 수 있어요.',
        'Ma’lumot yoki qadriyat qayerda tanilganini 에 bilan ifodalash mumkin.',
        '에 can mark the area in which information or value becomes known.',
        '에 может обозначать область, где информация или ценность стала известна.',
      ),
      ['v-a-eojida', 'become-known'],
    ),
  ),

  s5u9_289_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날 행사를 준비하면서 날짜와 장소, 프로그램 순서를 미리 결정했습니다. 결정한 담당자보다 확정된 행사 정보가 중요합니다.',
      [
        '행사 날짜와 순서가 미리 정해졌어요.',
        '행사 날짜와 순서가 담당자를 정했어요.',
        '행사 날짜와 순서를 미리 정해졌어요.',
        '행사 정보가 담당자에게 만들었어요.',
      ],
      '행사 날짜와 순서가 미리 정해졌어요.',
      L(
        '확정된 행사 정보를 정해지다로 자연스럽게 설명할 수 있어요.',
        'Belgilangan tadbir ma’lumotini 정해지다 bilan tabiiy tushuntirish mumkin.',
        '정해지다 naturally describes event details that have been decided.',
        '정해지다 естественно описывает уже определённые детали мероприятия.',
      ),
      ['v-a-eojida', 'be-decided'],
    ),
  ),

  s5u9_290_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글날 행사 순서가 미리 정해___어요.',
      ['졌'],
      ['졌', '서', '다가', '면서', '려고 했'],
      L(
        '정해지다의 과거형은 정해졌어요예요.',
        '정해지다 → 정해졌어요.',
        'The past form of 정해지다 is 정해졌어요.',
        'Прошедшая форма 정해지다 — 정해졌어요.',
      ),
      ['v-a-eojida', 'be-decided', 'form'],
    ),
  ),

  s5u9_291_type_answer: passiveTypeAnswer(
    '한글날 행사 순서가 미리 정해졌어요',
    L(
      '담당자들이 한글날 행사 순서를 미리 결정했다는 내용을 순서에 초점을 두어 쓰세요.',
      'Mas’ullar Hangul kuni tadbir tartibini oldindan belgilaganini tartibga urg‘u bilan yozing.',
      'Write that the Hangeul Day event order was decided in advance.',
      'Напишите, что порядок мероприятия ко Дню хангыля определили заранее.',
    ),
    'The order of the Hangeul Day event was decided in advance.',
    ['정해졌어요'],
    ['v-a-eojida', 'hangeul-day', 'type-answer'],
  ),

  s5u9_292_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날 행사의 날짜와 순서가 미리 정해졌습니다.',
        'Hangul kuni tadbirining sanasi va tartibi oldindan belgilandi.',
        'The date and order of the Hangeul Day event were decided in advance.',
        'Дата и порядок мероприятия ко Дню хангыля были определены заранее.',
      ),
      [
        '미리 정해졌어요',
        '한글날 행사의',
        '날짜와 순서가',
        '행사 순서를 정했어요',
        '널리 알려졌어요',
        '잘 지켜졌어요',
      ],
      '한글날 행사의 날짜와 순서가 미리 정해졌어요',
      L(
        '한글날 소개뿐 아니라 실제 행사 준비도 피동 표현으로 설명할 수 있어요.',
        'Hangul kuni haqida emas, tadbir tayyorgarligini ham majhul shaklda tushuntirish mumkin.',
        'Passive expressions can also describe practical event preparation.',
        'Пассивные формы можно использовать и для описания подготовки мероприятия.',
      ),
      ['v-a-eojida', 'hangeul-day'],
    ),
  ),

  s5u9_293_cloze_passage: grammarQuestion(
    clozePassage(
      '한글은 세종대왕에 의해 ___고, 그 가치가 세계에 ___고, 한글날 행사 순서도 미리 ___.',
      ['만들어졌', '알려졌', '정해졌어요'],
      ['정해졌어요', '알려졌', '만들어졌', '만들었', '알렸', '정했어요'],
      L(
        '한글의 역사와 한글날 행사 정보를 세 가지 피동형으로 연결해요.',
        'Hangul tarixi va Hangul kuni tadbiri uch majhul shakl bilan bog‘lanadi.',
        'Connect Hangeul history and Hangeul Day event information with three passive forms.',
        'Связываем историю хангыля и сведения о мероприятии тремя пассивными формами.',
      ),
      ['v-a-eojida', 'hangeul-day', 'integration'],
    ),
  ),

  s5u9_294_word_arrange: grammarQuestion(
    wordArrange(
      [
        '잘 지켜졌어요',
        '정해진 순서가',
        '한글날 기념식에서',
        '사람들이 순서를 지켰고',
        '날짜가 알려졌어요',
        '기념관이 만들어졌어요',
      ],
      '한글날 기념식에서 정해진 순서가 잘 지켜졌어요',
      L(
        '행사 준비에서 정해진 내용이 실제 현장에서 지켜지는 흐름이에요.',
        'Tayyorgarlikda belgilangan tartib tadbirda bajarilganini ko‘rsatadi.',
        'This connects a decided procedure with it actually being followed.',
        'Связываем установленный порядок с его фактическим соблюдением.',
      ),
      ['v-a-eojida', 'hangeul-day', 'be-observed'],
    ),
  ),

  s5u9_295_type_answer: passiveTypeAnswer(
    '한글날 기념식에서 정해진 순서가 잘 지켜졌어요',
    L(
      '참가자들이 한글날 기념식의 정해진 순서를 잘 지켰다는 내용을 피동으로 쓰세요.',
      'Ishtirokchilar Hangul kuni marosimidagi belgilangan tartibga yaxshi amal qilganini majhul shaklda yozing.',
      'Write in the passive that the established order was well followed at the Hangeul Day ceremony.',
      'Напишите в пассиве, что на церемонии ко Дню хангыля установленный порядок хорошо соблюдался.',
    ),
    'The established order was well followed at the Hangeul Day ceremony.',
    ['지켜졌어요'],
    ['v-a-eojida', 'hangeul-day', 'type-answer'],
  ),

  s5u9_296_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날 설명문에서 “누가 무엇을 했다”만 반복하면 모든 문장이 행위자 중심이 됩니다. 만들어지다, 알려지다, 정해지다 같은 표현을 함께 사용하면 무엇이 달라져요?',
      [
        '한글이나 정보처럼 행동을 받은 대상과 결과에 초점을 둘 수 있어요.',
        '모든 문장을 명령문으로 만들 수 있어요.',
        '반드시 과거 사건만 설명할 수 있어요.',
        '행동의 목적만 표현할 수 있어요.',
      ],
      '한글이나 정보처럼 행동을 받은 대상과 결과에 초점을 둘 수 있어요.',
      L(
        '피동 표현은 글의 초점을 행위자에서 대상이나 결과로 바꾸는 데 도움이 돼요.',
        'Majhul shakl matn urg‘usini bajaruvchidan obyekt yoki natijaga o‘tkazadi.',
        'Passive expressions help shift focus from the agent to the affected object or result.',
        'Пассив помогает перенести фокус с деятеля на объект или результат.',
      ),
      ['v-a-eojida', 'learning-value'],
    ),
  ),

  s5u9_297_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글은 만들어진 뒤 많은 사람에게 알려졌습니다.',
        'Hangul yaratilgandan keyin ko‘p odamlarga tanildi.',
        'After Hangeul was created, it became known to many people.',
        'После создания хангыль стал известен многим людям.',
      ),
      [
        '많은 사람에게 알려졌어요',
        '한글은',
        '만들어진 뒤',
        '사람들이 한글을 만들고',
        '기념비가 세워진 뒤',
        '행사 날짜가 정해졌어요',
      ],
      '한글은 만들어진 뒤 많은 사람에게 알려졌어요',
      L(
        '두 피동형을 연결해 역사적 설명 문장을 만들어요.',
        'Ikki majhul shakl bog‘lanib tarixiy tushuntirish gapi tuziladi.',
        'Combine two passive forms in a historical explanation.',
        'Соединяем две пассивные формы в историческом объяснении.',
      ),
      ['v-a-eojida', 'hangeul-day'],
    ),
  ),

  s5u9_298_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글은 만들어진 뒤 많은 사람에게 알___어요.',
      ['려졌'],
      ['려졌', '라졌', '렸', '리다가', '리면서'],
      L(
        '알리다의 피동형은 알려지다예요.',
        '알리다 → 알려지다.',
        'The passive form is 알려지다.',
        'Пассивная форма — 알려지다.',
      ),
      ['v-a-eojida', 'hangeul-day', 'form'],
    ),
  ),

  s5u9_299_error_hunt: grammarQuestion(
    errorHunt(
      '한글날 행사 순서가 미리 정하어졌어요.',
      '정하어졌어요.',
      ['정해졌어요.', '정했어요.', '정하다가요.', '정하면서요.'],
      '정해졌어요.',
      L(
        '정하다와 어지다가 결합하면 정해지다가 되고 과거형은 정해졌어요예요.',
        '정하다 + 어지다 → 정해지다 → 정해졌어요.',
        '정하다 + 어지다 becomes 정해지다, with past form 정해졌어요.',
        '정하다 + 어지다 превращается в 정해지다, прошедшая форма — 정해졌어요.',
      ),
      ['v-a-eojida', 'conjugation'],
    ),
  ),

  s5u9_300_word_arrange: grammarQuestion(
    wordArrange(
      [
        '그 가치가 널리 알려졌고',
        '한글은 만들어졌고',
        '기념 행사도 계획대로 이루어졌어요',
        '행사 순서가 정해진 뒤',
        '사람들이 한글을 만들고',
        '모든 것이 좋아졌어요',
      ],
      '한글은 만들어졌고 그 가치가 널리 알려졌고 행사 순서가 정해진 뒤 기념 행사도 계획대로 이루어졌어요',
      L(
        'Node 마지막에는 만들어지다, 알려지다, 정해지다, 이루어지다를 한 흐름에서 실제로 사용할 수 있게 해요.',
        'Node oxirida 만들어지다, 알려지다, 정해지다 va 이루어지다 bir jarayonda ishlatiladi.',
        'The final task integrates 만들어지다, 알려지다, 정해지다, and 이루어지다 into one meaningful sequence.',
        'В финале объединяем 만들어지다, 알려지다, 정해지다 и 이루어지다 в одной содержательной последовательности.',
      ),
      ['v-a-eojida', 'hangeul-day', 'node-review'],
    ),
  ),
  // ══════════════════════════════════════════════════════════
  // Node 4
  // A-(으)ㄴ데도 불구하고 / V-는데도 불구하고 /
  // N인데도 불구하고
  // 예상과 다른 결과를 강하게 대조하기
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 비가 오는데도 불구하고
  // V-는데도 불구하고
  // ──────────────────────────────────────────────────────────

  s5u9_301_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '아침부터 비가 많이 왔습니다. 보통 이런 날에는 야외 행사를 취소하지만 오늘 기념 행사는 예정대로 계속되었습니다.',
      [
        '비가 오는데도 불구하고 행사가 계속됐어요.',
        '비가 오기 위해 행사가 계속됐어요.',
        '비가 오다가 행사가 계속됐어요.',
        '비가 와서 행사가 계속됐어요.',
      ],
      '비가 오는데도 불구하고 행사가 계속됐어요.',
      L(
        '비가 오면 보통 행사가 취소될 수 있지만 예상과 다르게 계속된 상황이에요.',
        'Yomg‘ir yog‘sa tadbir bekor qilinishi mumkin, ammo kutilmaganda davom etdi.',
        'Rain would normally cause cancellation, but the event continued contrary to that expectation.',
        'Из-за дождя мероприятие обычно могли бы отменить, но вопреки ожиданию оно продолжилось.',
      ),
      ['neundedo-bulguhago', 'contrast', 'event'],
    ),
  ),

  s5u9_302_type_answer: contrastTypeAnswer(
    '비가 오는데도 불구하고 행사가 계속됐어요',
    L(
      '비가 왔지만 행사가 취소되지 않고 계속되었다는 뜻을 강한 대조 표현으로 쓰세요.',
      'Yomg‘ir yog‘gan bo‘lsa ham tadbir davom etganini kuchli qarama-qarshilik bilan yozing.',
      'Write with the stronger contrast form that the event continued despite the rain.',
      'Напишите с усиленным противопоставлением, что мероприятие продолжилось несмотря на дождь.',
    ),
    'The event continued despite the rain.',
    ['오는데도 불구하고'],
    ['neundedo-bulguhago', 'type-answer'],
  ),

  s5u9_303_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '비가 많이 오는데도 불구하고 기념 행사는 계속되었습니다.',
        'Kuchli yomg‘irga qaramay, esdalik tadbiri davom etdi.',
        'Despite the heavy rain, the commemorative event continued.',
        'Несмотря на сильный дождь, памятное мероприятие продолжилось.',
      ),
      [
        '기념 행사는',
        '비가 많이 오는데도 불구하고',
        '계속됐어요',
        '비가 많이 와서',
        '취소됐어요',
        '비가 오기 위해',
      ],
      '비가 많이 오는데도 불구하고 기념 행사는 계속됐어요',
      L(
        'V-는데도 불구하고는 앞 상황에서 예상되는 결과와 실제 결과가 다를 때 사용해요.',
        'V-는데도 불구하고 kutilgan natija bilan haqiqiy natija farq qilganda ishlatiladi.',
        'V-는데도 불구하고 is used when the actual result differs from what the preceding situation would lead us to expect.',
        'V-는데도 불구하고 используется, когда реальный результат отличается от ожидаемого.',
      ),
      ['neundedo-bulguhago', 'event'],
    ),
  ),

  s5u9_304_fill_in_blank: grammarQuestion(
    fillBlank(
      '비가 오___ 불구하고 야외 행사가 계속됐어요.',
      ['는데도'],
      ['는데도', '기 위해', '다가', '면서', '기 때문에'],
      L(
        '동사 오다에는 -는데도 불구하고가 붙어요.',
        '오다 fe’liga -는데도 불구하고 qo‘shiladi.',
        'The verb 오다 takes -는데도 불구하고.',
        'С глаголом 오다 используется -는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'form'],
    ),
  ),

  s5u9_305_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행진이 계속됐어요',
        '비가 오는데도 불구하고',
        '광장에서',
        '비가 와서',
        '행진을 취소했고',
        '사람들이 집에 갔어요',
      ],
      '비가 오는데도 불구하고 광장에서 행진이 계속됐어요',
      L(
        '비 때문에 중단될 것으로 예상되는 행진이 계속된 상황이에요.',
        'Yomg‘ir sabab to‘xtashi kutilgan yurish davom etdi.',
        'The procession continued even though the rain would normally be expected to stop it.',
        'Шествие продолжилось, хотя из-за дождя ожидалась его остановка.',
      ),
      ['neundedo-bulguhago', 'march-in-procession'],
    ),
  ),

  s5u9_306_type_answer: contrastTypeAnswer(
    '사람들이 오래 기다리는데도 불구하고 문이 열리지 않았어요',
    L(
      '사람들이 오랫동안 기다렸지만 행사장 문이 열리지 않았다는 뜻으로 쓰세요.',
      'Odamlar uzoq kutgan bo‘lsa ham tadbir joyi eshigi ochilmaganini yozing.',
      'Write that the doors did not open despite people waiting for a long time.',
      'Напишите, что двери не открылись, несмотря на то что люди долго ждали.',
    ),
    'The doors did not open despite people waiting for a long time.',
    ['기다리는데도 불구하고'],
    ['neundedo-bulguhago', 'type-answer'],
  ),

  s5u9_307_error_hunt: grammarQuestion(
    errorHunt(
      '비가 오은데도 불구하고 사람들이 행진을 계속했어요.',
      '오은데도',
      ['오는데도', '오다가', '오면서', '오기 위해'],
      '오는데도',
      L(
        '동사 오다는 오는데도 불구하고로 활용해요.',
        '오다 → 오는데도 불구하고.',
        '오다 becomes 오는데도 불구하고.',
        '오다 принимает форму 오는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_308_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '비가 많이 오는데도 불구하고 거리 행진은 계속되었습니다.',
        'Kuchli yomg‘irga qaramay, ko‘cha yurishi davom etdi.',
        'Despite the heavy rain, the street procession continued.',
        'Несмотря на сильный дождь, уличное шествие продолжилось.',
      ),
      [
        '거리 행진은',
        '계속됐어요',
        '비가 많이 오는데도 불구하고',
        '비가 그쳐서',
        '행진을 준비하기 위해',
        '행진이 끝났어요',
      ],
      '비가 많이 오는데도 불구하고 거리 행진은 계속됐어요',
      L(
        '예상과 반대되는 실제 결과를 뒤 절에 둬요.',
        'Kutilgan holatga zid haqiqiy natija keyingi qismda keladi.',
        'The second clause gives the actual result that contrasts with the expectation.',
        'Во второй части указывается результат, противоположный ожидаемому.',
      ),
      ['neundedo-bulguhago', 'march-in-procession'],
    ),
  ),

  s5u9_309_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '행사 시작 시간이 지났습니다. 많은 사람들이 입구에서 계속 기다리고 있지만 아직 문이 열리지 않았습니다.',
      [
        '사람들이 기다리는데도 불구하고 문이 열리지 않았어요.',
        '사람들이 기다리기 위해 문이 열리지 않았어요.',
        '사람들이 기다려서 문이 열리지 않았어요.',
        '사람들이 기다리다가 문이 열렸어요.',
      ],
      '사람들이 기다리는데도 불구하고 문이 열리지 않았어요.',
      L(
        '오래 기다리면 문이 열릴 것이라는 기대와 실제 결과가 달라요.',
        'Uzoq kutgandan keyin eshik ochilishi kutiladi, ammo natija boshqacha.',
        'The expectation that the doors would open after people waited contrasts with the actual result.',
        'Ожидалось, что после ожидания двери откроются, но результат оказался другим.',
      ),
      ['neundedo-bulguhago', 'contrast'],
    ),
  ),

  s5u9_310_fill_in_blank: grammarQuestion(
    fillBlank(
      '사람들이 계속 기다리___ 불구하고 행사가 시작되지 않았어요.',
      ['는데도'],
      ['는데도', '기 위해', '다가', '면서', '기 때문에'],
      L(
        '기다리다는 동사이므로 기다리는데도 불구하고라고 해요.',
        '기다리다 fe’l bo‘lgani uchun 기다리는데도 불구하고 ishlatiladi.',
        'Because 기다리다 is a verb, use 기다리는데도 불구하고.',
        'Поскольку 기다리다 — глагол, используется 기다리는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'form'],
    ),
  ),

  s5u9_311_type_answer: contrastTypeAnswer(
    '사람들이 기다리는데도 불구하고 행사가 시작되지 않았어요',
    L(
      '사람들이 기다리고 있지만 행사가 아직 시작되지 않았다는 뜻으로 쓰세요.',
      'Odamlar kutayotgan bo‘lsa ham tadbir hali boshlanmaganini yozing.',
      'Write that the event had not started despite people waiting.',
      'Напишите, что мероприятие ещё не началось, несмотря на ожидание людей.',
    ),
    'The event had not started despite people waiting.',
    ['기다리는데도 불구하고'],
    ['neundedo-bulguhago', 'type-answer'],
  ),

  s5u9_312_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '많은 사람이 기다리는데도 불구하고 입구가 아직 열리지 않았습니다.',
        'Ko‘p odam kutayotganiga qaramay, kirish joyi hali ochilmadi.',
        'Despite many people waiting, the entrance had still not opened.',
        'Несмотря на то что многие ждали, вход всё ещё не открылся.',
      ),
      [
        '아직 열리지 않았어요',
        '많은 사람이',
        '기다리는데도 불구하고',
        '입구가',
        '기다리기 위해',
        '곧 열렸어요',
      ],
      '많은 사람이 기다리는데도 불구하고 입구가 아직 열리지 않았어요',
      L(
        '앞 절의 상황과 뒤 절의 결과 사이에 강한 대조가 있어요.',
        'Oldingi vaziyat va keyingi natija o‘rtasida kuchli qarama-qarshilik bor.',
        'There is a strong contrast between the situation in the first clause and the result in the second.',
        'Между ситуацией в первой части и результатом во второй есть сильное противопоставление.',
      ),
      ['neundedo-bulguhago', 'contrast'],
    ),
  ),

  s5u9_313_cloze_passage: grammarQuestion(
    clozePassage(
      '비가 ___ 불구하고 행진이 계속됐고, 사람들이 오래 ___ 불구하고 문은 열리지 않았어요.',
      ['오는데도', '기다리는데도'],
      [
        '기다리는데도',
        '오는데도',
        '오기 위해',
        '기다려서',
        '오다가',
        '기다리면서',
      ],
      L(
        '서로 다른 동사에 V-는데도 불구하고를 적용해요.',
        'Turli fe’llarga V-는데도 불구하고 qo‘llaymiz.',
        'Apply V-는데도 불구하고 to two different verbs.',
        'Применяем V-는데도 불구하고 к двум разным глаголам.',
      ),
      ['neundedo-bulguhago', 'form'],
    ),
  ),

  s5u9_314_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사가 예정대로 진행됐어요',
        '비가 계속 오는데도 불구하고',
        '야외에서',
        '비가 그친 뒤',
        '행사를 취소했고',
        '실내로 옮기기 위해',
      ],
      '비가 계속 오는데도 불구하고 야외에서 행사가 예정대로 진행됐어요',
      L(
        '좋지 않은 조건에도 예정된 행사가 그대로 진행된 대조 상황이에요.',
        'Noqulay sharoitga qaramay tadbir reja bo‘yicha o‘tdi.',
        'The event proceeded as planned despite unfavorable conditions.',
        'Мероприятие прошло по плану несмотря на неблагоприятные условия.',
      ),
      ['neundedo-bulguhago', 'event'],
    ),
  ),

  s5u9_315_type_answer: contrastTypeAnswer(
    '기념식이 끝났는데도 불구하고 많은 사람이 광장에 남아 있었어요',
    L(
      '기념식이 이미 끝났지만 많은 사람이 광장을 떠나지 않았다는 뜻으로 쓰세요.',
      'Marosim tugagan bo‘lsa ham ko‘p odam maydonda qolganini yozing.',
      'Write that many people remained in the square despite the ceremony having ended.',
      'Напишите, что многие остались на площади, несмотря на то что церемония уже закончилась.',
    ),
    'Many people remained in the square despite the ceremony having ended.',
    ['끝났는데도 불구하고'],
    ['neundedo-bulguhago', 'past', 'type-answer'],
  ),

  s5u9_316_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '기념식은 이미 끝났습니다. 보통 행사가 끝나면 사람들이 돌아가지만 오늘은 많은 사람이 광장에 계속 남아 있었습니다.',
      [
        '기념식이 끝났는데도 불구하고 사람들이 남아 있었어요.',
        '기념식을 끝내기 위해 사람들이 남았어요.',
        '기념식이 끝나서 사람들이 남았어요.',
        '기념식이 끝나다가 사람들이 돌아갔어요.',
      ],
      '기념식이 끝났는데도 불구하고 사람들이 남아 있었어요.',
      L(
        '끝난 뒤 떠날 것으로 예상했지만 사람들이 계속 남아 있었어요.',
        'Tugagandan keyin odamlar ketishi kutilgan, ammo ular qolgan.',
        'People would normally leave after the ceremony ended, but they stayed.',
        'После окончания церемонии люди обычно уходят, но они остались.',
      ),
      ['neundedo-bulguhago', 'past'],
    ),
  ),

  s5u9_317_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '기념식이 끝났는데도 불구하고 많은 사람이 자리를 떠나지 않았습니다.',
        'Marosim tugaganiga qaramay, ko‘p odam joyini tark etmadi.',
        'Despite the ceremony having ended, many people did not leave.',
        'Несмотря на окончание церемонии, многие не ушли.',
      ),
      [
        '기념식이 끝났는데도 불구하고',
        '자리를 떠나지 않았어요',
        '많은 사람이',
        '기념식이 끝나서',
        '모두 집에 갔어요',
        '기념식을 끝내기 위해',
      ],
      '기념식이 끝났는데도 불구하고 많은 사람이 자리를 떠나지 않았어요',
      L(
        '과거에 완료된 동작도 -았/었는데도 불구하고 형태로 표현할 수 있어요.',
        'Tugallangan o‘tgan harakat ham -았/었는데도 불구하고 bilan ifodalanadi.',
        'A completed past action can also appear as -았/었는데도 불구하고.',
        'Завершённое действие в прошлом также может оформляться как -았/었는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'past'],
    ),
  ),

  s5u9_318_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사가 끝났___ 불구하고 사람들이 광장에 남아 있었어요.',
      ['는데도'],
      ['는데도', '기 위해', '다가', '으면서', '기 때문에'],
      L(
        '끝났다는 과거형 뒤에도 -는데도 불구하고가 이어져 끝났는데도 불구하고가 돼요.',
        '끝났다 o‘tgan shaklidan keyin 끝났는데도 불구하고 keladi.',
        'After the past form 끝났다, use 끝났는데도 불구하고.',
        'После прошедшей формы 끝났다 используется 끝났는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'past', 'form'],
    ),
  ),

  s5u9_319_error_hunt: grammarQuestion(
    errorHunt(
      '기념식이 끝났은데도 불구하고 사람들이 남아 있었어요.',
      '끝났은데도',
      ['끝났는데도', '끝났다가', '끝났지만', '끝나면서'],
      '끝났는데도',
      L(
        '과거형 끝났다 뒤에는 끝났는데도라고 해요.',
        '끝났다 dan keyin 끝났는데도 ishlatiladi.',
        'The correct form after 끝났다 is 끝났는데도.',
        'После 끝났다 правильная форма — 끝났는데도.',
      ),
      ['neundedo-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_320_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사가 예정대로 진행됐어요',
        '비가 오는데도 불구하고',
        '많은 사람이 참석해서',
        '날씨가 좋아서',
        '행사를 취소했고',
        '비를 피하기 위해',
      ],
      '비가 오는데도 불구하고 행사가 예정대로 진행됐어요',
      L(
        '동사 뒤의 -는데도 불구하고를 실제 행사 상황에서 정리해요.',
        'Fe’ldan keyingi -는데도 불구하고 haqiqiy tadbir vaziyatida takrorlanadi.',
        'Review V-는데도 불구하고 in a realistic event context.',
        'Закрепляем V-는데도 불구하고 в реальной ситуации мероприятия.',
      ),
      ['neundedo-bulguhago', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 날씨가 추운데도 불구하고
  // A-(으)ㄴ데도 불구하고
  // ──────────────────────────────────────────────────────────

  s5u9_321_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '날씨가 매우 추웠습니다. 보통 이렇게 추우면 야외 행사에 오는 사람이 적지만 오늘은 많은 사람이 기념식에 참석했습니다.',
      [
        '날씨가 추운데도 불구하고 많은 사람이 참석했어요.',
        '날씨가 추워서 많은 사람이 참석했어요.',
        '날씨가 춥기 위해 많은 사람이 참석했어요.',
        '날씨가 춥다가 사람들이 참석했어요.',
      ],
      '날씨가 추운데도 불구하고 많은 사람이 참석했어요.',
      L(
        '추운 날씨라면 참석자가 적을 것으로 예상되지만 실제 결과는 달랐어요.',
        'Sovuq havoda odam kam kelishi kutiladi, lekin haqiqiy natija boshqacha.',
        'Cold weather would normally reduce attendance, but the actual result was different.',
        'В холодную погоду обычно ожидают меньше участников, но результат оказался другим.',
      ),
      ['eunde-bulguhago', 'adjective', 'contrast'],
    ),
  ),

  s5u9_322_type_answer: contrastTypeAnswer(
    '날씨가 추운데도 불구하고 많은 사람이 참석했어요',
    L(
      '날씨가 매우 추웠지만 많은 사람이 기념식에 참석했다는 뜻으로 쓰세요.',
      'Havo juda sovuq bo‘lsa ham ko‘p odam marosimga kelganini yozing.',
      'Write that many people attended despite the cold weather.',
      'Напишите, что многие пришли, несмотря на холодную погоду.',
    ),
    'Many people attended despite the cold weather.',
    ['추운데도 불구하고'],
    ['eunde-bulguhago', 'type-answer'],
  ),

  s5u9_323_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '날씨가 추운데도 불구하고 많은 사람이 기념식에 참석했습니다.',
        'Havo sovuq bo‘lishiga qaramay, ko‘p odam marosimda qatnashdi.',
        'Despite the cold weather, many people attended the ceremony.',
        'Несмотря на холодную погоду, многие посетили церемонию.',
      ),
      [
        '많은 사람이',
        '기념식에 참석했어요',
        '날씨가 추운데도 불구하고',
        '날씨가 따뜻해서',
        '참석자가 적었어요',
        '기념식을 준비하기 위해',
      ],
      '날씨가 추운데도 불구하고 많은 사람이 기념식에 참석했어요',
      L(
        '형용사에는 A-(으)ㄴ데도 불구하고를 사용해요.',
        'Sifat bilan A-(으)ㄴ데도 불구하고 ishlatiladi.',
        'Use A-(으)ㄴ데도 불구하고 with adjectives.',
        'С прилагательными используется A-(으)ㄴ데도 불구하고.',
      ),
      ['eunde-bulguhago', 'adjective'],
    ),
  ),

  s5u9_324_fill_in_blank: grammarQuestion(
    fillBlank(
      '날씨가 추___ 불구하고 많은 사람이 왔어요.',
      ['운데도'],
      ['운데도', '는데도', '기 위해', '다가', '으면서'],
      L(
        '춥다는 ㅂ 불규칙 활용으로 추운데도가 돼요.',
        '춥다 ㅂ istisnosi bilan 추운데도 bo‘ladi.',
        '춥다 becomes 추운데도 through the ㅂ-irregular conjugation.',
        '춥다 по нерегулярному типу ㅂ превращается в 추운데도.',
      ),
      ['eunde-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_325_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람이 왔어요',
        '날씨가 추운데도 불구하고',
        '광장에',
        '날씨가 따뜻해서',
        '사람이 적었고',
        '집에서 쉬었어요',
      ],
      '날씨가 추운데도 불구하고 광장에 많은 사람이 왔어요',
      L(
        '추운 조건과 실제 참석 인원의 대조를 표현해요.',
        'Sovuq sharoit va haqiqiy qatnashuvchilar soni qarama-qarshi qo‘yiladi.',
        'The cold conditions contrast with the high attendance.',
        'Холодная погода противопоставляется большому числу пришедших.',
      ),
      ['eunde-bulguhago', 'contrast'],
    ),
  ),

  s5u9_326_type_answer: contrastTypeAnswer(
    '장소가 먼데도 불구하고 많은 사람이 찾아왔어요',
    L(
      '행사 장소가 멀었지만 많은 사람이 찾아왔다는 뜻으로 쓰세요.',
      'Tadbir joyi uzoq bo‘lsa ham ko‘p odam kelganini yozing.',
      'Write that many people came despite the venue being far away.',
      'Напишите, что многие пришли, несмотря на то что место было далеко.',
    ),
    'Many people came despite the venue being far away.',
    ['먼데도 불구하고'],
    ['eunde-bulguhago', 'type-answer'],
  ),

  s5u9_327_error_hunt: grammarQuestion(
    errorHunt(
      '행사 장소가 멀은데도 불구하고 많은 사람이 찾아왔어요.',
      '멀은데도',
      ['먼데도', '멀지만', '멀어서', '멀다가'],
      '먼데도',
      L(
        '멀다는 ㄹ이 탈락해서 먼데도가 돼요.',
        '멀다 da ㄹ tushib, 먼데도 shakli hosil bo‘ladi.',
        '멀다 loses ㄹ before this ending, becoming 먼데도.',
        'В 멀다 перед этой формой ㄹ выпадает: 먼데도.',
      ),
      ['eunde-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_328_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사 장소가 먼데도 불구하고 많은 사람이 찾아왔습니다.',
        'Tadbir joyi uzoq bo‘lishiga qaramay, ko‘p odam keldi.',
        'Despite the venue being far away, many people came.',
        'Несмотря на то что место проведения было далеко, пришло много людей.',
      ),
      [
        '많은 사람이 찾아왔어요',
        '행사 장소가',
        '먼데도 불구하고',
        '가까워서',
        '참석하지 않았어요',
        '장소를 정하기 위해',
      ],
      '행사 장소가 먼데도 불구하고 많은 사람이 찾아왔어요',
      L(
        '멀다 같은 형용사도 예상과 실제 결과를 대조할 수 있어요.',
        '멀다 kabi sifatlar ham kutilgan va haqiqiy natijani qarama-qarshi qo‘yadi.',
        'Adjectives such as 멀다 can also set up a contrast between expectation and reality.',
        'Прилагательные вроде 멀다 также могут создавать контраст между ожиданием и результатом.',
      ),
      ['eunde-bulguhago', 'adjective'],
    ),
  ),

  s5u9_329_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '행사장이 아주 작았습니다. 많은 사람이 오면 불편할 수 있는 공간이었지만 실제로는 많은 참가자가 함께 행사를 즐겼습니다.',
      [
        '행사장이 작은데도 불구하고 많은 사람이 참여했어요.',
        '행사장이 작기 위해 많은 사람이 참여했어요.',
        '행사장이 작아서 사람이 많았어요.',
        '행사장이 작다가 넓어졌어요.',
      ],
      '행사장이 작은데도 불구하고 많은 사람이 참여했어요.',
      L(
        '작은 공간이라는 조건과 많은 참여자가 있다는 결과가 대조돼요.',
        'Kichik joy va ko‘p ishtirokchi o‘rtasida qarama-qarshilik bor.',
        'The small venue contrasts with the high number of participants.',
        'Маленькая площадка противопоставляется большому числу участников.',
      ),
      ['eunde-bulguhago', 'adjective'],
    ),
  ),

  s5u9_330_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사장이 작___ 불구하고 많은 사람이 참여했어요.',
      ['은데도'],
      ['은데도', '는데도', '기 위해', '다가', '으면서'],
      L(
        '작다는 받침이 있으므로 작은데도 불구하고라고 해요.',
        '작다 undosh bilan tugagani uchun 작은데도 불구하고 bo‘ladi.',
        '작다 has a final consonant, so use 작은데도 불구하고.',
        'У 작다 есть конечная согласная, поэтому используется 작은데도 불구하고.',
      ),
      ['eunde-bulguhago', 'form'],
    ),
  ),

  s5u9_331_type_answer: contrastTypeAnswer(
    '행사장이 작은데도 불구하고 많은 사람이 참여했어요',
    L(
      '행사장이 작았지만 많은 사람이 행사에 참여했다는 뜻으로 쓰세요.',
      'Tadbir joyi kichik bo‘lsa ham ko‘p odam qatnashganini yozing.',
      'Write that many people participated despite the venue being small.',
      'Напишите, что многие участвовали, несмотря на маленькое помещение.',
    ),
    'Many people participated despite the venue being small.',
    ['작은데도 불구하고'],
    ['eunde-bulguhago', 'type-answer'],
  ),

  s5u9_332_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사장이 작은데도 불구하고 참가자가 많았습니다.',
        'Tadbir joyi kichik bo‘lishiga qaramay, qatnashuvchilar ko‘p edi.',
        'Despite the venue being small, there were many participants.',
        'Несмотря на маленькую площадку, участников было много.',
      ),
      [
        '참가자가 많았어요',
        '행사장이',
        '작은데도 불구하고',
        '행사장이 넓어서',
        '참가자가 적었어요',
        '장소를 넓히기 위해',
      ],
      '행사장이 작은데도 불구하고 참가자가 많았어요',
      L(
        'A-(으)ㄴ데도 불구하고 뒤에는 예상과 다른 결과가 와요.',
        'A-(으)ㄴ데도 불구하고 dan keyin kutilmagan natija keladi.',
        'A result contrary to expectation follows A-(으)ㄴ데도 불구하고.',
        'После A-(으)ㄴ데도 불구하고 следует неожиданный результат.',
      ),
      ['eunde-bulguhago', 'contrast'],
    ),
  ),

  s5u9_333_cloze_passage: grammarQuestion(
    clozePassage(
      '날씨가 ___ 불구하고 사람이 많았고, 행사장이 ___ 불구하고 모두 질서 있게 움직였어요.',
      ['추운데도', '작은데도'],
      ['작은데도', '추운데도', '추워서', '작아서', '오는데도', '기 위해'],
      L(
        '서로 다른 형용사에 A-(으)ㄴ데도 불구하고를 적용해요.',
        'Turli sifatlarga A-(으)ㄴ데도 불구하고 qo‘llanadi.',
        'Apply A-(으)ㄴ데도 불구하고 to two different adjectives.',
        'Применяем A-(으)ㄴ데도 불구하고 к двум разным прилагательным.',
      ),
      ['eunde-bulguhago', 'form'],
    ),
  ),

  s5u9_334_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사가 질서 있게 진행됐어요',
        '행사장이 작은데도 불구하고',
        '참가자가 많았지만',
        '공간이 넓어서',
        '사람이 거의 없어서',
        '행사를 취소했어요',
      ],
      '행사장이 작은데도 불구하고 행사가 질서 있게 진행됐어요',
      L(
        '공간이 작으면 혼잡할 수 있지만 실제 행사는 질서 있게 진행됐어요.',
        'Joy kichik bo‘lsa tartibsizlik bo‘lishi mumkin, ammo tadbir tartibli o‘tdi.',
        'A small venue could lead to crowding, but the event proceeded in an orderly way.',
        'Маленькая площадка могла привести к тесноте, но мероприятие прошло организованно.',
      ),
      ['eunde-bulguhago', 'contrast'],
    ),
  ),

  s5u9_335_type_answer: contrastTypeAnswer(
    '사람이 많은데도 불구하고 행사가 질서 있게 진행됐어요',
    L(
      '참가자가 많았지만 행사가 혼잡하지 않고 질서 있게 진행되었다고 쓰세요.',
      'Qatnashuvchilar ko‘p bo‘lsa ham tadbir tartibli o‘tganini yozing.',
      'Write that the event proceeded in an orderly way despite the large crowd.',
      'Напишите, что мероприятие прошло организованно, несмотря на большое количество людей.',
    ),
    'The event proceeded in an orderly way despite the large crowd.',
    ['많은데도 불구하고'],
    ['eunde-bulguhago', 'type-answer'],
  ),

  s5u9_336_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '행사의 규모가 매우 컸습니다. 보통 큰 행사는 준비와 진행이 복잡하지만 이번 행사는 큰 문제 없이 끝났습니다.',
      [
        '행사 규모가 큰데도 불구하고 문제없이 끝났어요.',
        '행사 규모가 커서 반드시 문제가 생겼어요.',
        '행사 규모가 크기 위해 잘 끝났어요.',
        '행사 규모가 크다가 작아졌어요.',
      ],
      '행사 규모가 큰데도 불구하고 문제없이 끝났어요.',
      L(
        '큰 규모 때문에 어려움이 예상되지만 실제로는 문제없이 끝난 상황이에요.',
        'Katta miqyos sabab qiyinchilik kutilgan, ammo tadbir muammosiz tugadi.',
        'The large scale suggests potential difficulty, but the event ended without problems.',
        'Большой масштаб предполагал сложности, но мероприятие завершилось без проблем.',
      ),
      ['eunde-bulguhago', 'adjective'],
    ),
  ),

  s5u9_337_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '참가자가 많은데도 불구하고 행사는 질서 있게 진행되었습니다.',
        'Ishtirokchilar ko‘p bo‘lishiga qaramay, tadbir tartibli o‘tdi.',
        'Despite the large number of participants, the event proceeded in an orderly way.',
        'Несмотря на большое число участников, мероприятие прошло организованно.',
      ),
      [
        '행사는',
        '참가자가 많은데도 불구하고',
        '질서 있게 진행됐어요',
        '참가자가 적어서',
        '혼잡하게 끝났어요',
        '참가자를 모집하기 위해',
      ],
      '참가자가 많은데도 불구하고 행사는 질서 있게 진행됐어요',
      L(
        '많다는 많은데도 불구하고로 활용해요.',
        '많다 → 많은데도 불구하고.',
        '많다 becomes 많은데도 불구하고.',
        '많다 принимает форму 많은데도 불구하고.',
      ),
      ['eunde-bulguhago', 'adjective'],
    ),
  ),

  s5u9_338_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사 규모가 ___ 불구하고 큰 문제 없이 끝났어요.',
      ['큰데도'],
      ['큰데도', '크는데도', '크기 위해', '커서', '크다가'],
      L(
        '크다는 큰데도 불구하고라고 활용해요.',
        '크다 → 큰데도 불구하고.',
        '크다 becomes 큰데도 불구하고.',
        '크다 принимает форму 큰데도 불구하고.',
      ),
      ['eunde-bulguhago', 'form'],
    ),
  ),

  s5u9_339_error_hunt: grammarQuestion(
    errorHunt(
      '날씨가 좋는데도 불구하고 행사가 취소됐어요.',
      '좋는데도',
      ['좋은데도', '좋지만', '좋아서', '좋다가'],
      '좋은데도',
      L(
        '형용사 좋다는 좋은데도 불구하고라고 해요.',
        '좋다 sifati 좋은데도 불구하고 shaklida keladi.',
        'The adjective 좋다 becomes 좋은데도 불구하고.',
        'Прилагательное 좋다 принимает форму 좋은데도 불구하고.',
      ),
      ['eunde-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_340_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람이 참여했어요',
        '장소가 먼데도 불구하고',
        '기념 행사에',
        '장소가 가까워서',
        '사람이 적었고',
        '행사를 취소했어요',
      ],
      '장소가 먼데도 불구하고 기념 행사에 많은 사람이 참여했어요',
      L(
        '형용사가 나타내는 불리한 조건과 실제 결과를 연결해요.',
        'Sifat bildirgan noqulay sharoit va haqiqiy natija bog‘lanadi.',
        'Connect an unfavorable adjectival condition with the actual result.',
        'Связываем неблагоприятное условие, выраженное прилагательным, с реальным результатом.',
      ),
      ['eunde-bulguhago', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 공휴일인데도 불구하고
  // N인데도 불구하고
  // ──────────────────────────────────────────────────────────

  s5u9_341_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '오늘은 공식적으로 쉬는 공휴일입니다. 하지만 기념 행사를 준비해야 해서 몇몇 직원은 회사에 출근했습니다.',
      [
        '공휴일인데도 불구하고 직원들이 출근했어요.',
        '공휴일이기 위해 직원들이 출근했어요.',
        '공휴일이라서 모두 출근했어요.',
        '공휴일을 위해 직원들이 출근했어요.',
      ],
      '공휴일인데도 불구하고 직원들이 출근했어요.',
      L(
        '공휴일에는 보통 쉬지만 실제로는 출근한 상황이에요.',
        'Davlat dam olish kunida odatda dam olinadi, ammo bu safar ishga chiqishgan.',
        'People normally rest on a public holiday, but some went to work.',
        'В государственный выходной обычно отдыхают, но сотрудники вышли на работу.',
      ),
      ['indedo-bulguhago', 'noun', 'public-holiday'],
    ),
  ),

  s5u9_342_type_answer: contrastTypeAnswer(
    '공휴일인데도 불구하고 직원들이 출근했어요',
    L(
      '공휴일이지만 몇몇 직원이 회사에 출근했다는 뜻으로 쓰세요.',
      'Dam olish kuni bo‘lsa ham ayrim xodimlar ishga kelganini yozing.',
      'Write that employees went to work despite it being a public holiday.',
      'Напишите, что сотрудники вышли на работу, несмотря на государственный выходной.',
    ),
    'Employees went to work despite it being a public holiday.',
    ['공휴일인데도 불구하고'],
    ['indedo-bulguhago', 'type-answer'],
  ),

  s5u9_343_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '공휴일인데도 불구하고 행사 준비를 위해 직원들이 출근했습니다.',
        'Dam olish kuni bo‘lishiga qaramay, tadbirga tayyorgarlik uchun xodimlar ishga chiqdi.',
        'Despite it being a public holiday, employees came to work to prepare for the event.',
        'Несмотря на государственный выходной, сотрудники вышли на работу для подготовки мероприятия.',
      ),
      [
        '직원들이 출근했어요',
        '공휴일인데도 불구하고',
        '행사 준비를 위해',
        '평일이라서',
        '모두 쉬었어요',
        '휴일을 정하기 위해',
      ],
      '공휴일인데도 불구하고 행사 준비를 위해 직원들이 출근했어요',
      L(
        '명사 뒤에는 N인데도 불구하고를 사용해요.',
        'Otdan keyin N인데도 불구하고 ishlatiladi.',
        'Use N인데도 불구하고 after a noun.',
        'После существительного используется N인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'public-holiday'],
    ),
  ),

  s5u9_344_fill_in_blank: grammarQuestion(
    fillBlank(
      '오늘은 공휴일___ 불구하고 회사에 사람이 많아요.',
      ['인데도'],
      ['인데도', '는데도', '은데도', '기 위해', '이어서'],
      L(
        '공휴일은 명사이므로 공휴일인데도 불구하고라고 해요.',
        '공휴일 ot bo‘lgani uchun 공휴일인데도 불구하고 ishlatiladi.',
        'Because 공휴일 is a noun, use 공휴일인데도 불구하고.',
        'Поскольку 공휴일 — существительное, используется 공휴일인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_345_word_arrange: grammarQuestion(
    wordArrange(
      [
        '직원들이 출근했어요',
        '공휴일인데도 불구하고',
        '행사 준비 때문에',
        '모두 집에서 쉬었고',
        '평일이라서',
        '회사가 문을 닫았어요',
      ],
      '공휴일인데도 불구하고 행사 준비 때문에 직원들이 출근했어요',
      L(
        '쉬는 날이라는 예상과 실제 출근 상황을 대조해요.',
        'Dam olish kuni haqidagi kutish va haqiqiy ishga chiqish holati qarama-qarshi.',
        'The expectation of rest contrasts with employees actually going to work.',
        'Ожидание отдыха противопоставляется фактическому выходу сотрудников на работу.',
      ),
      ['indedo-bulguhago', 'public-holiday'],
    ),
  ),

  s5u9_346_type_answer: contrastTypeAnswer(
    '한글날인데도 불구하고 한글날의 의미를 모르는 사람도 있어요',
    L(
      '한글날 당일인데도 그날의 의미를 모르는 사람이 있다는 뜻으로 쓰세요.',
      'Hangul kuni bo‘lsa ham bu kunning ma’nosini bilmaydigan odamlar borligini yozing.',
      'Write that some people do not know the meaning of Hangeul Day despite it being Hangeul Day.',
      'Напишите, что некоторые не знают смысла Дня хангыля, несмотря на то что сегодня День хангыля.',
    ),
    'Some people do not know the meaning of Hangeul Day despite it being Hangeul Day.',
    ['한글날인데도 불구하고'],
    ['indedo-bulguhago', 'hangeul-day', 'type-answer'],
  ),

  s5u9_347_error_hunt: grammarQuestion(
    errorHunt(
      '오늘은 한글날이데도 불구하고 평소처럼 수업이 있어요.',
      '한글날이데도',
      ['한글날인데도', '한글날이라서', '한글날이지만', '한글날부터'],
      '한글날인데도',
      L(
        '명사 뒤에는 인데도가 붙어서 한글날인데도가 돼요.',
        'Otdan keyin 인데도 keladi: 한글날인데도.',
        'A noun takes 인데도: 한글날인데도.',
        'После существительного используется 인데도: 한글날인데도.',
      ),
      ['indedo-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_348_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날인데도 불구하고 그날의 의미를 잘 모르는 사람도 있습니다.',
        'Hangul kuni bo‘lishiga qaramay, uning ma’nosini yaxshi bilmaydigan odamlar ham bor.',
        'Despite it being Hangeul Day, some people do not know its meaning well.',
        'Несмотря на День хангыля, некоторые плохо знают его смысл.',
      ),
      [
        '그날의 의미를',
        '한글날인데도 불구하고',
        '잘 모르는 사람도 있어요',
        '한글날을 기념하기 위해',
        '모두 잘 알고 있어요',
        '공휴일이어서',
      ],
      '한글날인데도 불구하고 그날의 의미를 잘 모르는 사람도 있어요',
      L(
        '명사와 실제 상황 사이의 예상 밖 대조를 표현해요.',
        'Ot bildirgan holat va haqiqiy vaziyat o‘rtasidagi kutilmagan farq ifodalanadi.',
        'It expresses an unexpected contrast between the noun-based situation and reality.',
        'Выражается неожиданный контраст между ситуацией, обозначенной существительным, и реальностью.',
      ),
      ['indedo-bulguhago', 'hangeul-day'],
    ),
  ),

  s5u9_349_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '오늘은 중요한 기념일입니다. 보통 이런 날에는 특별한 행사가 열리지만 올해는 별도의 행사가 준비되지 않았습니다.',
      [
        '기념일인데도 불구하고 특별한 행사가 없었어요.',
        '기념일이기 위해 행사가 없었어요.',
        '기념일이라서 행사가 없었어요.',
        '기념일을 위해 행사가 없었어요.',
      ],
      '기념일인데도 불구하고 특별한 행사가 없었어요.',
      L(
        '기념일이면 행사를 예상할 수 있지만 실제로는 행사가 없었어요.',
        'Esdalik kuni bo‘lsa tadbir kutiladi, lekin aslida tadbir bo‘lmagan.',
        'A commemorative day would normally suggest a special event, but there was none.',
        'В памятный день обычно ожидается мероприятие, но его не было.',
      ),
      ['indedo-bulguhago', 'commemorative-day'],
    ),
  ),

  s5u9_350_fill_in_blank: grammarQuestion(
    fillBlank(
      '오늘은 중요한 기념일___ 불구하고 특별한 행사가 없어요.',
      ['인데도'],
      ['인데도', '는데도', '은데도', '기 위해', '이라서'],
      L(
        '기념일은 명사라서 기념일인데도 불구하고라고 해요.',
        '기념일 ot, shuning uchun 기념일인데도 불구하고.',
        '기념일 is a noun, so use 기념일인데도 불구하고.',
        '기념일 — существительное, поэтому используется 기념일인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_351_type_answer: contrastTypeAnswer(
    '기념일인데도 불구하고 특별한 행사가 없었어요',
    L(
      '중요한 기념일이지만 특별한 행사가 열리지 않았다고 쓰세요.',
      'Muhim esdalik kuni bo‘lsa ham maxsus tadbir bo‘lmaganini yozing.',
      'Write that there was no special event despite it being an important commemorative day.',
      'Напишите, что специального мероприятия не было, несмотря на важный памятный день.',
    ),
    'There was no special event despite it being an important commemorative day.',
    ['기념일인데도 불구하고'],
    ['indedo-bulguhago', 'type-answer'],
  ),

  s5u9_352_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '중요한 기념일인데도 불구하고 별도의 행사가 열리지 않았습니다.',
        'Muhim esdalik kuni bo‘lishiga qaramay, alohida tadbir o‘tkazilmadi.',
        'Despite it being an important commemorative day, no separate event was held.',
        'Несмотря на важный памятный день, отдельного мероприятия не проводилось.',
      ),
      [
        '별도의 행사가 열리지 않았어요',
        '중요한 기념일인데도 불구하고',
        '행사를 열기 위해',
        '기념일이어서',
        '큰 기념식이 열렸어요',
        '공휴일인데',
      ],
      '중요한 기념일인데도 불구하고 별도의 행사가 열리지 않았어요',
      L(
        'N인데도 불구하고 뒤에 예상과 반대되는 실제 상황을 말해요.',
        'N인데도 불구하고 dan keyin kutilganiga zid haqiqiy holat aytiladi.',
        'The actual situation contrary to expectation follows N인데도 불구하고.',
        'После N인데도 불구하고 указывается реальная ситуация, противоположная ожидаемой.',
      ),
      ['indedo-bulguhago', 'commemorative-day'],
    ),
  ),

  s5u9_353_cloze_passage: grammarQuestion(
    clozePassage(
      '오늘은 ___ 불구하고 직원들이 출근했고, 중요한 ___ 불구하고 특별한 행사가 없었어요.',
      ['공휴일인데도', '기념일인데도'],
      [
        '기념일인데도',
        '공휴일인데도',
        '공휴일이라서',
        '기념일이어서',
        '비가 오는데도',
        '날씨가 추운데도',
      ],
      L(
        '두 명사에 N인데도 불구하고를 적용해요.',
        'Ikki otga N인데도 불구하고 qo‘llanadi.',
        'Apply N인데도 불구하고 to two different nouns.',
        'Применяем N인데도 불구하고 к двум разным существительным.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_354_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사가 없었어요',
        '중요한 기념일인데도 불구하고',
        '올해는',
        '큰 행사가 열렸고',
        '공휴일이어서',
        '사람이 많이 왔어요',
      ],
      '중요한 기념일인데도 불구하고 올해는 행사가 없었어요',
      L(
        '기념일이라는 사실에서 예상되는 상황과 실제 상황을 대조해요.',
        'Esdalik kuni ekanidan kutilgan vaziyat va haqiqiy holat qarama-qarshi.',
        'The expected situation based on it being a commemorative day contrasts with reality.',
        'Ожидаемая ситуация, исходящая из того, что это памятный день, противопоставляется реальности.',
      ),
      ['indedo-bulguhago', 'contrast'],
    ),
  ),

  s5u9_355_type_answer: contrastTypeAnswer(
    '학생인데도 불구하고 한국의 기념일에 대해 아주 잘 알아요',
    L(
      '전문가가 아니라 학생이지만 한국의 기념일에 대해 매우 잘 안다는 뜻으로 쓰세요.',
      'Mutaxassis emas, talaba bo‘lsa ham Koreya esdalik kunlarini juda yaxshi bilishini yozing.',
      'Write that the person knows Korean commemorative days very well despite being a student rather than an expert.',
      'Напишите, что человек очень хорошо знает памятные дни Кореи, несмотря на то что он студент, а не специалист.',
    ),
    'The person knows Korean commemorative days very well despite being a student.',
    ['학생인데도 불구하고'],
    ['indedo-bulguhago', 'type-answer'],
  ),

  s5u9_356_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '오늘은 평일입니다. 보통 평일에는 국가 기념일처럼 거리에 많은 국기가 걸려 있지 않지만 오늘은 특별 행사를 위해 도시 곳곳에 국기가 걸려 있습니다.',
      [
        '평일인데도 불구하고 도시 곳곳에 국기가 걸려 있어요.',
        '평일이기 위해 국기가 걸려 있어요.',
        '평일이라서 국기가 많이 걸려 있어요.',
        '평일을 위해 국기를 달았어요.',
      ],
      '평일인데도 불구하고 도시 곳곳에 국기가 걸려 있어요.',
      L(
        '평일의 일반적인 모습과 실제 거리 풍경이 달라요.',
        'Oddiy ish kunidagi odatiy holat va haqiqiy ko‘cha manzarasi boshqacha.',
        'The usual appearance of a weekday contrasts with the actual street scene.',
        'Обычная картина буднего дня отличается от реального вида улиц.',
      ),
      ['indedo-bulguhago', 'display-national-flag'],
    ),
  ),

  s5u9_357_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '평일인데도 불구하고 도시 곳곳에 국기가 걸려 있었습니다.',
        'Oddiy ish kuni bo‘lishiga qaramay, shaharning turli joylarida bayroqlar osilgan edi.',
        'Despite it being a weekday, national flags were displayed throughout the city.',
        'Несмотря на будний день, по всему городу были вывешены государственные флаги.',
      ),
      [
        '도시 곳곳에',
        '평일인데도 불구하고',
        '국기가 걸려 있었어요',
        '공휴일이라서',
        '국기를 내렸어요',
        '나무를 심기 위해',
      ],
      '평일인데도 불구하고 도시 곳곳에 국기가 걸려 있었어요',
      L(
        '명사 평일 뒤에도 인데도 불구하고를 사용해요.',
        '평일 otidan keyin ham 인데도 불구하고 ishlatiladi.',
        'Use 인데도 불구하고 after the noun 평일 as well.',
        'После существительного 평일 также используется 인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'noun'],
    ),
  ),

  s5u9_358_fill_in_blank: grammarQuestion(
    fillBlank(
      '그 사람은 학생___ 불구하고 한국 역사에 대해 아주 잘 알아요.',
      ['인데도'],
      ['인데도', '는데도', '은데도', '기 위해', '이어서'],
      L(
        '학생은 명사이므로 학생인데도 불구하고라고 해요.',
        '학생 ot bo‘lgani uchun 학생인데도 불구하고.',
        '학생 is a noun, so use 학생인데도 불구하고.',
        '학생 — существительное, поэтому используется 학생인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_359_error_hunt: grammarQuestion(
    errorHunt(
      '그 사람은 학생은데도 불구하고 한국 역사에 대해 많이 알아요.',
      '학생은데도',
      ['학생인데도', '학생이지만', '학생이라서', '학생부터'],
      '학생인데도',
      L(
        '명사 학생 뒤에는 은데도가 아니라 인데도가 와요.',
        '학생 otidan keyin 은데도 emas, 인데도 keladi.',
        'After the noun 학생, use 인데도 rather than 은데도.',
        'После существительного 학생 используется 인데도, а не 은데도.',
      ),
      ['indedo-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_360_word_arrange: grammarQuestion(
    wordArrange(
      [
        '직원들이 출근했어요',
        '공휴일인데도 불구하고',
        '기념 행사 준비 때문에',
        '모두 쉬었고',
        '평일이어서',
        '행사가 취소됐어요',
      ],
      '공휴일인데도 불구하고 기념 행사 준비 때문에 직원들이 출근했어요',
      L(
        '명사 뒤의 N인데도 불구하고를 실제 기념 행사 상황에 적용해요.',
        'Otdan keyingi N인데도 불구하고 haqiqiy tadbir vaziyatiga qo‘llanadi.',
        'Apply N인데도 불구하고 in a realistic commemorative-event context.',
        'Применяем N인데도 불구하고 в реальной ситуации подготовки памятного мероприятия.',
      ),
      ['indedo-bulguhago', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · -는데도 vs -는데도 불구하고
  // 대조 강도와 문체 구별
  // ──────────────────────────────────────────────────────────

  s5u9_361_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '“비가 오는데도 행사는 계속됐어요.”와 “비가 오는데도 불구하고 행사는 계속됐어요.”는 기본적인 대조 의미가 비슷합니다. 두 번째 표현은 대조를 좀 더 분명하고 강하게 드러낼 수 있습니다.',
      [
        '-는데도 불구하고는 대조를 더 강조할 수 있어요.',
        '-는데도 불구하고는 목적만 나타내요.',
        '-는데도 불구하고는 과거 사실에만 사용해요.',
        '-는데도와 불구하고는 함께 사용할 수 없어요.',
      ],
      '-는데도 불구하고는 대조를 더 강조할 수 있어요.',
      L(
        '두 표현의 기본 의미는 가깝지만 불구하고가 붙으면 대조가 더 분명하게 드러날 수 있어요.',
        'Ikki shakl ma’nosi yaqin, lekin 불구하고 bilan qarama-qarshilik kuchliroq ko‘rinadi.',
        'The meanings are similar, but adding 불구하고 can make the contrast more explicit and emphatic.',
        'Значения близки, но 불구하고 может сделать противопоставление более явным и сильным.',
      ),
      ['neundedo-bulguhago', 'grammar-contrast'],
    ),
  ),

  s5u9_362_type_answer: contrastTypeAnswer(
    '비가 오는데도 불구하고 기념식이 계속됐어요',
    L(
      '“비가 오는데도 기념식이 계속됐어요”보다 대조를 조금 더 강하게 표현하세요.',
      '“Yomg‘ir yog‘sa ham marosim davom etdi” gapidagi qarama-qarshilikni kuchliroq ifodalang.',
      'Express more strongly than plain -는데도 that the ceremony continued despite the rain.',
      'Выразите сильнее, чем с обычным -는데도, что церемония продолжилась несмотря на дождь.',
    ),
    'The ceremony continued despite the rain, with an emphasized contrast.',
    ['오는데도 불구하고'],
    ['neundedo-bulguhago', 'grammar-contrast', 'type-answer'],
  ),

  s5u9_363_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '비가 오는데도 불구하고 한글날 기념식은 계속되었습니다.',
        'Yomg‘irga qaramay, Hangul kuni marosimi davom etdi.',
        'Despite the rain, the Hangeul Day ceremony continued.',
        'Несмотря на дождь, церемония ко Дню хангыля продолжилась.',
      ),
      [
        '계속됐어요',
        '한글날 기념식은',
        '비가 오는데도 불구하고',
        '비가 오는데도',
        '비가 와서',
        '기념식을 취소했어요',
      ],
      '비가 오는데도 불구하고 한글날 기념식은 계속됐어요',
      L(
        '불구하고를 포함해 대조를 더 뚜렷하게 만들어요.',
        '불구하고 qarama-qarshilikni yanada aniqroq qiladi.',
        'Including 불구하고 makes the contrast more explicit.',
        '불구하고 делает противопоставление более явным.',
      ),
      ['neundedo-bulguhago', 'hangeul-day'],
    ),
  ),

  s5u9_364_fill_in_blank: grammarQuestion(
    fillBlank(
      '비가 오___ 행사가 계속됐어요.',
      ['는데도 불구하고'],
      ['는데도 불구하고', '기 위해서', '기 때문에', '다가', '면서'],
      L(
        '예상과 다른 결과를 강하게 대조하려면 -는데도 불구하고를 사용할 수 있어요.',
        'Kutilmagan natijani kuchli qarama-qarshi qo‘yish uchun -는데도 불구하고 ishlatiladi.',
        'Use -는데도 불구하고 when you want to emphasize an unexpected contrast.',
        'Для усиленного неожиданного противопоставления можно использовать -는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'grammar-contrast'],
    ),
  ),

  s5u9_365_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람이 참석했어요',
        '날씨가 추운데도 불구하고',
        '기념식에',
        '날씨가 추운데도',
        '날씨가 좋아서',
        '참석자가 적었어요',
      ],
      '날씨가 추운데도 불구하고 기념식에 많은 사람이 참석했어요',
      L(
        '불구하고를 넣어 추운 날씨와 높은 참석률의 대조를 강조해요.',
        '불구하고 sovuq havo va ko‘p qatnashuvchilar o‘rtasidagi qarama-qarshilikni kuchaytiradi.',
        '불구하고 emphasizes the contrast between the cold weather and high attendance.',
        '불구하고 усиливает контраст между холодной погодой и высокой посещаемостью.',
      ),
      ['eunde-bulguhago', 'grammar-contrast'],
    ),
  ),

  s5u9_366_type_answer: contrastTypeAnswer(
    '날씨가 추운데도 불구하고 많은 사람이 참석했어요',
    L(
      '추운 날씨와 많은 참석자 사이의 대조를 강조해서 쓰세요.',
      'Sovuq havo va ko‘p qatnashuvchi o‘rtasidagi qarama-qarshilikni kuchli ifodalang.',
      'Emphasize the contrast between the cold weather and the large attendance.',
      'Подчеркните контраст между холодной погодой и большим числом участников.',
    ),
    'Many people attended despite the cold weather.',
    ['추운데도 불구하고'],
    ['eunde-bulguhago', 'grammar-contrast', 'type-answer'],
  ),

  s5u9_367_error_hunt: grammarQuestion(
    errorHunt(
      '날씨가 추운데 불구하고 많은 사람이 참석했어요.',
      '추운데',
      ['추운데도', '추워서', '추우면서', '추우려고'],
      '추운데도',
      L(
        '불구하고 앞에서는 데도까지 필요해서 추운데도 불구하고라고 해요.',
        '불구하고 oldidan 데도 to‘liq kerak: 추운데도 불구하고.',
        'Before 불구하고, the full form includes 데도: 추운데도 불구하고.',
        'Перед 불구하고 нужна полная форма с 데도: 추운데도 불구하고.',
      ),
      ['eunde-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_368_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '날씨가 추운데도 불구하고 기념식에는 많은 사람이 왔습니다.',
        'Havo sovuq bo‘lishiga qaramay, marosimga ko‘p odam keldi.',
        'Despite the cold weather, many people came to the ceremony.',
        'Несмотря на холодную погоду, на церемонию пришло много людей.',
      ),
      [
        '많은 사람이 왔어요',
        '기념식에는',
        '날씨가 추운데도 불구하고',
        '날씨가 좋아서',
        '참석하지 않았어요',
        '기념식을 열기 위해',
      ],
      '날씨가 추운데도 불구하고 기념식에는 많은 사람이 왔어요',
      L(
        '구어에서도 가능하지만 불구하고가 붙으면 좀 더 분명한 대조를 만들 수 있어요.',
        'Og‘zaki nutqda ham mumkin, ammo 불구하고 qarama-qarshilikni aniqroq qiladi.',
        'The form can be used in speech as well, while 불구하고 makes the contrast more explicit.',
        'Форма возможна и в разговорной речи, а 불구하고 делает контраст более явным.',
      ),
      ['eunde-bulguhago', 'grammar-contrast'],
    ),
  ),

  s5u9_369_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '두 문장 모두 자연스럽습니다. “비가 오는데도 행사는 계속됐어요.”는 간결한 대조이고, “비가 오는데도 불구하고 행사는 계속됐어요.”는 대조를 더 분명하게 드러냅니다.',
      [
        '두 표현 모두 대조를 나타낼 수 있어요.',
        '-는데도는 목적을 나타내고 불구하고는 원인을 나타내요.',
        '불구하고가 있으면 문장이 항상 과거가 돼요.',
        '-는데도 뒤에는 불구하고를 절대 붙일 수 없어요.',
      ],
      '두 표현 모두 대조를 나타낼 수 있어요.',
      L(
        '불구하고가 없는 -는데도 역시 자연스러운 대조 표현이에요.',
        '불구하고 siz -는데도 ham tabiiy qarama-qarshilik ifodasidir.',
        'Plain -는데도 is also a natural contrast expression.',
        'Обычное -는데도 также является естественным выражением противопоставления.',
      ),
      ['neundedo-bulguhago', 'grammar-contrast'],
    ),
  ),

  s5u9_370_fill_in_blank: grammarQuestion(
    fillBlank(
      '공휴일___ 불구하고 직원들이 출근했어요.',
      ['인데도'],
      ['인데도', '인데', '이라서', '이기 위해', '부터'],
      L(
        '불구하고를 사용할 때 명사 뒤에는 인데도가 필요해요.',
        '불구하고 bilan ot ortidan 인데도 kerak.',
        'When using 불구하고 after a noun, use 인데도.',
        'При 불구하고 после существительного требуется 인데도.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_371_type_answer: contrastTypeAnswer(
    '공휴일인데도 불구하고 회사에 출근했어요',
    L(
      '공휴일이지만 회사에 출근했다는 대조를 불구하고까지 사용해 강조하세요.',
      'Dam olish kuni bo‘lsa ham ishga chiqqanlik qarama-qarshiligini 불구하고 bilan kuchaytiring.',
      'Emphasize with 불구하고 that you went to work despite it being a public holiday.',
      'С помощью 불구하고 подчеркните, что вы вышли на работу несмотря на выходной.',
    ),
    'The speaker went to work despite it being a public holiday.',
    ['공휴일인데도 불구하고'],
    ['indedo-bulguhago', 'grammar-contrast', 'type-answer'],
  ),

  s5u9_372_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '공휴일인데도 불구하고 행사 준비를 위해 회사에 갔습니다.',
        'Dam olish kuni bo‘lishiga qaramay, tadbir tayyorlash uchun ishxonaga bordim.',
        'Despite it being a public holiday, I went to work to prepare for the event.',
        'Несмотря на выходной, я пошёл на работу готовить мероприятие.',
      ),
      [
        '회사에 갔어요',
        '공휴일인데도 불구하고',
        '행사 준비를 위해',
        '공휴일이라서',
        '집에서 쉬었어요',
        '회사를 위해',
      ],
      '공휴일인데도 불구하고 행사 준비를 위해 회사에 갔어요',
      L(
        '한 문장에서 대조 표현과 목적 표현을 함께 사용할 수도 있어요.',
        'Bir gapda qarama-qarshilik va maqsad shakllari birga ishlatilishi mumkin.',
        'A contrast expression and a purpose expression can appear together in one sentence.',
        'В одном предложении можно совместить выражение противопоставления и цели.',
      ),
      ['indedo-bulguhago', 'gi-wihae'],
    ),
  ),

  s5u9_373_cloze_passage: grammarQuestion(
    clozePassage(
      '비가 ___ 불구하고 행사가 계속됐고, 날씨가 ___ 불구하고 사람이 많았고, ___ 불구하고 직원들이 출근했어요.',
      ['오는데도', '추운데도', '공휴일인데도'],
      [
        '공휴일인데도',
        '추운데도',
        '오는데도',
        '비가 와서',
        '날씨가 좋아서',
        '공휴일이라서',
      ],
      L(
        '동사, 형용사, 명사 뒤의 세 형태를 한 번에 구별해요.',
        'Fe’l, sifat va otdan keyingi uch shakl birga farqlanadi.',
        'Distinguish the verb, adjective, and noun forms together.',
        'Одновременно различаем формы после глагола, прилагательного и существительного.',
      ),
      ['neundedo-bulguhago', 'eunde-bulguhago', 'indedo-bulguhago'],
    ),
  ),

  s5u9_374_word_arrange: grammarQuestion(
    wordArrange(
      [
        '기념식이 계속됐어요',
        '비가 오는데도 불구하고',
        '예정된 시간까지',
        '비가 와서',
        '기념식을 취소했고',
        '실내로 가기 위해',
      ],
      '비가 오는데도 불구하고 기념식이 예정된 시간까지 계속됐어요',
      L(
        '단순 -는데도보다 불구하고까지 사용해 대조를 분명하게 만들어요.',
        'Oddiy -는데도 ga qaraganda 불구하고 bilan qarama-qarshilik aniqroq.',
        'Using 불구하고 makes the contrast more explicit than plain -는데도.',
        '불구하고 делает противопоставление более явным, чем простое -는데도.',
      ),
      ['neundedo-bulguhago', 'grammar-contrast'],
    ),
  ),

  s5u9_375_type_answer: contrastTypeAnswer(
    '행사가 끝났는데도 불구하고 사람들이 자리를 떠나지 않았어요',
    L(
      '행사가 이미 끝났지만 사람들이 계속 남아 있었다는 대조를 강하게 표현하세요.',
      'Tadbir tugagan bo‘lsa ham odamlar qolganini kuchli qarama-qarshilik bilan yozing.',
      'Strongly express that people did not leave despite the event having ended.',
      'С усиленным противопоставлением напишите, что люди не ушли, несмотря на окончание мероприятия.',
    ),
    'People did not leave despite the event having ended.',
    ['끝났는데도 불구하고'],
    ['neundedo-bulguhago', 'grammar-contrast', 'type-answer'],
  ),

  s5u9_376_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '행사가 끝났는데도 불구하고 사람들이 자리를 떠나지 않았습니다. 이 문장에서 대조되는 두 내용은 무엇이에요?',
      [
        '행사는 끝났지만 사람들은 계속 남아 있었어요.',
        '행사가 끝나기 위해 사람들이 남았어요.',
        '행사가 끝났기 때문에 모두 바로 떠났어요.',
        '사람들이 남아서 행사가 시작됐어요.',
      ],
      '행사는 끝났지만 사람들은 계속 남아 있었어요.',
      L(
        '앞 절에서 예상되는 결과는 사람들이 떠나는 것이지만 실제로는 남아 있었어요.',
        'Oldingi qismdan odamlar ketishi kutiladi, ammo ular qolgan.',
        'The expected result is that people leave, but they actually stayed.',
        'Ожидаемый результат — люди уходят, но на самом деле они остались.',
      ),
      ['neundedo-bulguhago', 'meaning'],
    ),
  ),

  s5u9_377_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사가 끝났는데도 불구하고 많은 사람이 광장에 남아 있었습니다.',
        'Tadbir tugaganiga qaramay, ko‘p odam maydonda qoldi.',
        'Despite the event having ended, many people remained in the square.',
        'Несмотря на окончание мероприятия, многие остались на площади.',
      ),
      [
        '광장에 남아 있었어요',
        '많은 사람이',
        '행사가 끝났는데도 불구하고',
        '행사가 끝나서',
        '모두 떠났어요',
        '광장을 정리하기 위해',
      ],
      '행사가 끝났는데도 불구하고 많은 사람이 광장에 남아 있었어요',
      L(
        '완료된 과거 사건에도 불구하고를 붙여 강한 대조를 표현할 수 있어요.',
        'Tugallangan o‘tgan voqea bilan ham 불구하고 orqali kuchli qarama-qarshilik ifodalanadi.',
        '불구하고 can emphasize contrast even after a completed past event.',
        '불구하고 может усиливать контраст и после завершённого события в прошлом.',
      ),
      ['neundedo-bulguhago', 'past'],
    ),
  ),

  s5u9_378_fill_in_blank: grammarQuestion(
    fillBlank(
      '날씨가 ___ 불구하고 야외 행사가 갑자기 취소됐어요.',
      ['좋은데도'],
      ['좋은데도', '좋는데도', '좋아서', '좋기 위해', '좋다가'],
      L(
        '좋다는 형용사이므로 좋은데도 불구하고라고 해요.',
        '좋다 sifat bo‘lgani uchun 좋은데도 불구하고.',
        '좋다 is an adjective, so use 좋은데도 불구하고.',
        '좋다 — прилагательное, поэтому используется 좋은데도 불구하고.',
      ),
      ['eunde-bulguhago', 'form'],
    ),
  ),

  s5u9_379_error_hunt: grammarQuestion(
    errorHunt(
      '오늘은 공휴일인데 불구하고 회사에 갔어요.',
      '공휴일인데',
      ['공휴일인데도', '공휴일이라서', '공휴일이지만', '공휴일부터'],
      '공휴일인데도',
      L(
        '불구하고 앞에는 공휴일인데도가 와야 해요.',
        '불구하고 oldidan 공휴일인데도 kelishi kerak.',
        'Before 불구하고, use 공휴일인데도.',
        'Перед 불구하고 нужно 공휴일인데도.',
      ),
      ['indedo-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_380_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람이 참석했어요',
        '날씨가 추운데도 불구하고',
        '한글날 기념식에',
        '날씨가 추운데도',
        '날씨가 좋아서',
        '행사가 취소됐어요',
      ],
      '날씨가 추운데도 불구하고 한글날 기념식에 많은 사람이 참석했어요',
      L(
        '-는데도와 -는데도 불구하고의 의미 차이를 실제 문장 안에서 정리해요.',
        '-는데도 va -는데도 불구하고 farqini haqiqiy gapda takrorlaymiz.',
        'Review the nuance between -는데도 and -는데도 불구하고 in a real sentence.',
        'Закрепляем оттенок различия между -는데도 и -는데도 불구하고 в реальном предложении.',
      ),
      ['grammar-contrast', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 예상과 다른 기념일 이야기
  // Unit 9 통합
  // ──────────────────────────────────────────────────────────

  s5u9_381_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '어떤 기념일은 오래전부터 이어져 왔습니다. 하지만 외국인에게는 아직 그 기념일의 의미가 널리 알려지지 않았습니다.',
      [
        '오래된 기념일인데도 불구하고 외국인에게는 잘 알려지지 않았어요.',
        '오래된 기념일이기 위해 잘 알려지지 않았어요.',
        '오래된 기념일이라서 아무도 몰라요.',
        '기념일을 위해 외국인이 몰라요.',
      ],
      '오래된 기념일인데도 불구하고 외국인에게는 잘 알려지지 않았어요.',
      L(
        '역사가 오래되었다면 잘 알려져 있을 것이라는 기대와 실제 상황이 달라요.',
        'Tarixi uzoq bo‘lsa yaxshi tanilgan bo‘lishi kutiladi, ammo vaziyat boshqacha.',
        'A long-established commemorative day might be expected to be well known, but it is not.',
        'От давно существующего памятного дня ожидают известности, но реальная ситуация иная.',
      ),
      ['indedo-bulguhago', 'commemorative-day'],
    ),
  ),

  s5u9_382_type_answer: contrastTypeAnswer(
    '오래된 기념일인데도 불구하고 아직 잘 알려지지 않았어요',
    L(
      '역사가 오래된 기념일이지만 아직 널리 알려지지 않았다는 뜻으로 쓰세요.',
      'Tarixi uzoq bayram bo‘lsa ham hali keng tanilmaganini yozing.',
      'Write that the commemorative day is still not well known despite being old.',
      'Напишите, что памятный день всё ещё мало известен, несмотря на долгую историю.',
    ),
    'The commemorative day is still not well known despite its long history.',
    ['기념일인데도 불구하고'],
    ['indedo-bulguhago', 'type-answer'],
  ),

  s5u9_383_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '역사가 오래된 기념일인데도 불구하고 외국인에게는 아직 잘 알려지지 않았습니다.',
        'Tarixi uzoq esdalik kuni bo‘lishiga qaramay, u hali xorijliklarga yaxshi tanish emas.',
        'Despite being a long-established commemorative day, it is still not well known among foreigners.',
        'Несмотря на долгую историю, этот памятный день пока мало известен иностранцам.',
      ),
      [
        '외국인에게는',
        '아직 잘 알려지지 않았어요',
        '역사가 오래된 기념일인데도 불구하고',
        '오래된 기념일이라서',
        '모두 잘 알고 있어요',
        '널리 알리기 위해',
      ],
      '역사가 오래된 기념일인데도 불구하고 외국인에게는 아직 잘 알려지지 않았어요',
      L(
        '기념일의 특징과 실제 인지도를 대조해요.',
        'Bayram xususiyati va haqiqiy tanilish darajasi qarama-qarshi qo‘yiladi.',
        'The characteristics of the commemorative day contrast with its actual recognition.',
        'Характеристика памятного дня противопоставляется его реальной известности.',
      ),
      ['indedo-bulguhago', 'become-known'],
    ),
  ),

  s5u9_384_fill_in_blank: grammarQuestion(
    fillBlank(
      '오래된 기념일___ 불구하고 아직 모르는 사람이 많아요.',
      ['인데도'],
      ['인데도', '는데도', '은데도', '이라서', '이기 위해'],
      L(
        '기념일은 명사이므로 기념일인데도 불구하고라고 해요.',
        '기념일 ot bo‘lgani uchun 기념일인데도 불구하고.',
        'Because 기념일 is a noun, use 기념일인데도 불구하고.',
        'Поскольку 기념일 — существительное, используется 기념일인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_385_word_arrange: grammarQuestion(
    wordArrange(
      [
        '잘 알려지지 않았어요',
        '오래된 기념일인데도 불구하고',
        '아직 외국인에게는',
        '널리 알려져서',
        '모두 알고 있고',
        '기념하기 위해',
      ],
      '오래된 기념일인데도 불구하고 아직 외국인에게는 잘 알려지지 않았어요',
      L(
        '오래된 역사와 낮은 인지도 사이의 대조를 실제 설명 문장으로 만들어요.',
        'Uzoq tarix va past tanilish o‘rtasidagi qarama-qarshilikni haqiqiy gapda ifodalaymiz.',
        'Express the contrast between a long history and low recognition in a realistic explanation.',
        'Выражаем реальный контраст между долгой историей и низкой известностью.',
      ),
      ['indedo-bulguhago', 'commemorative-day'],
    ),
  ),

  s5u9_386_type_answer: contrastTypeAnswer(
    '비가 오는데도 불구하고 한글날 행사가 예정대로 진행됐어요',
    L(
      '비가 왔지만 한글날 행사가 계획대로 진행되었다고 쓰세요.',
      'Yomg‘ir yog‘gan bo‘lsa ham Hangul kuni tadbiri reja bo‘yicha o‘tganini yozing.',
      'Write that the Hangeul Day event proceeded as planned despite the rain.',
      'Напишите, что мероприятие ко Дню хангыля прошло по плану несмотря на дождь.',
    ),
    'The Hangeul Day event proceeded as planned despite the rain.',
    ['오는데도 불구하고'],
    ['neundedo-bulguhago', 'hangeul-day', 'type-answer'],
  ),

  s5u9_387_error_hunt: grammarQuestion(
    errorHunt(
      '참가자가 많은데 불구하고 행사 규칙이 잘 지켜졌어요.',
      '많은데',
      ['많은데도', '많아서', '많지만', '많으면서'],
      '많은데도',
      L(
        '불구하고 앞에서는 많은데도까지 사용해야 해요.',
        '불구하고 oldidan 많은데도 to‘liq shakli kerak.',
        'Use the full form 많은데도 before 불구하고.',
        'Перед 불구하고 нужна полная форма 많은데도.',
      ),
      ['eunde-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_388_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '비가 오는데도 불구하고 한글날 행사는 예정대로 진행되었습니다.',
        'Yomg‘irga qaramay, Hangul kuni tadbiri reja bo‘yicha o‘tdi.',
        'Despite the rain, the Hangeul Day event proceeded as planned.',
        'Несмотря на дождь, мероприятие ко Дню хангыля прошло по плану.',
      ),
      [
        '한글날 행사는',
        '예정대로 진행됐어요',
        '비가 오는데도 불구하고',
        '비가 그쳐서',
        '행사를 취소했고',
        '한글날을 알리기 위해',
      ],
      '비가 오는데도 불구하고 한글날 행사는 예정대로 진행됐어요',
      L(
        'Unit 9의 기념일 내용에 동사 대조 표현을 적용해요.',
        'Unit 9 esdalik kuni mavzusiga fe’lli qarama-qarshilik shakli qo‘llanadi.',
        'Apply the verb contrast form to the Unit 9 commemorative-day context.',
        'Применяем глагольную форму противопоставления к теме памятных дней Unit 9.',
      ),
      ['neundedo-bulguhago', 'hangeul-day'],
    ),
  ),

  s5u9_389_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날은 공휴일입니다. 하지만 큰 기념 행사를 준비해야 해서 행사 담당자들은 아침 일찍부터 일을 했습니다.',
      [
        '공휴일인데도 불구하고 담당자들이 일찍 출근했어요.',
        '공휴일이라서 담당자들이 모두 쉬었어요.',
        '공휴일이기 위해 담당자들이 출근했어요.',
        '공휴일을 위해 행사가 취소됐어요.',
      ],
      '공휴일인데도 불구하고 담당자들이 일찍 출근했어요.',
      L(
        '쉬는 날이라는 조건과 실제 업무 상황이 대조돼요.',
        'Dam olish kuni va haqiqiy ish holati qarama-qarshi.',
        'The public-holiday condition contrasts with the actual work situation.',
        'Выходной день противопоставляется фактической работе сотрудников.',
      ),
      ['indedo-bulguhago', 'hangeul-day'],
    ),
  ),

  s5u9_390_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글날은 공휴일___ 불구하고 담당자들이 일찍 출근했어요.',
      ['인데도'],
      ['인데도', '는데도', '은데도', '이라서', '이기 위해'],
      L(
        '공휴일은 명사이므로 공휴일인데도 불구하고가 맞아요.',
        '공휴일 ot bo‘lgani uchun 공휴일인데도 불구하고 to‘g‘ri.',
        'Because 공휴일 is a noun, 공휴일인데도 불구하고 is correct.',
        'Поскольку 공휴일 — существительное, правильно 공휴일인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'form'],
    ),
  ),

  s5u9_391_type_answer: contrastTypeAnswer(
    '참가자가 많은데도 불구하고 행사 규칙이 잘 지켜졌어요',
    L(
      '참가자가 많아서 혼잡할 수 있었지만 규칙이 잘 지켜졌다는 뜻으로 쓰세요.',
      'Qatnashuvchilar ko‘p bo‘lib tartibsizlik bo‘lishi mumkin edi, ammo qoidalarga yaxshi amal qilinganini yozing.',
      'Write that the rules were well observed despite the large number of participants.',
      'Напишите, что правила хорошо соблюдались, несмотря на большое количество участников.',
    ),
    'The rules were well observed despite the large number of participants.',
    ['많은데도 불구하고'],
    ['eunde-bulguhago', 'be-observed', 'type-answer'],
  ),

  s5u9_392_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '참가자가 많은데도 불구하고 행사 규칙이 잘 지켜졌습니다.',
        'Qatnashuvchilar ko‘p bo‘lishiga qaramay, tadbir qoidalariga yaxshi amal qilindi.',
        'Despite the large number of participants, the event rules were well observed.',
        'Несмотря на большое число участников, правила мероприятия хорошо соблюдались.',
      ),
      [
        '행사 규칙이',
        '잘 지켜졌어요',
        '참가자가 많은데도 불구하고',
        '참가자가 적어서',
        '규칙이 정해졌어요',
        '사람들이 규칙을 만들기 위해',
      ],
      '참가자가 많은데도 불구하고 행사 규칙이 잘 지켜졌어요',
      L(
        '앞 Node의 피동 표현 지켜지다와 이번 대조 문법을 함께 사용해요.',
        'Oldingi Node’dagi 지켜지다 majhul shakli va yangi qarama-qarshilik grammatikasi birga ishlatiladi.',
        'Combine the previous node’s passive 지켜지다 with the current contrast grammar.',
        'Совмещаем пассив 지켜지다 из прошлого Node с новой грамматикой противопоставления.',
      ),
      ['eunde-bulguhago', 'be-observed', 'integration'],
    ),
  ),

  s5u9_393_cloze_passage: grammarQuestion(
    clozePassage(
      '비가 ___ 불구하고 행사가 진행됐고, 참가자가 ___ 불구하고 규칙이 잘 지켜졌고, ___ 불구하고 담당자들은 출근했어요.',
      ['오는데도', '많은데도', '공휴일인데도'],
      [
        '공휴일인데도',
        '많은데도',
        '오는데도',
        '비가 와서',
        '참가자가 적어서',
        '공휴일이라서',
      ],
      L(
        '동사·형용사·명사 형태를 실제 한글날 행사 흐름에서 통합해요.',
        'Fe’l, sifat va ot shakllari Hangul kuni tadbiri jarayonida birlashtiriladi.',
        'Integrate the verb, adjective, and noun forms in one Hangeul Day event flow.',
        'Объединяем формы после глагола, прилагательного и существительного в ситуации Дня хангыля.',
      ),
      ['neundedo-bulguhago', 'eunde-bulguhago', 'indedo-bulguhago'],
    ),
  ),

  s5u9_394_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사가 계획대로 이루어졌어요',
        '비가 오는데도 불구하고',
        '많은 사람이 도와서',
        '비가 와서',
        '행사를 취소했고',
        '규칙을 정하기 위해',
      ],
      '비가 오는데도 불구하고 많은 사람이 도와서 행사가 계획대로 이루어졌어요',
      L(
        '대조 표현과 앞 Node의 이루어지다를 하나의 실제 결과 문장으로 연결해요.',
        'Qarama-qarshilik shakli va oldingi Node’dagi 이루어지다 bitta haqiqiy natija gapida birlashadi.',
        'Combine the contrast expression with 이루어지다 from the previous node.',
        'Соединяем выражение противопоставления с 이루어지다 из предыдущего Node.',
      ),
      ['neundedo-bulguhago', 'be-accomplished', 'integration'],
    ),
  ),

  s5u9_395_type_answer: contrastTypeAnswer(
    '행사가 끝났는데도 불구하고 한글날에 대한 이야기가 계속됐어요',
    L(
      '공식 행사는 끝났지만 사람들이 한글날에 대해 계속 이야기했다는 뜻으로 쓰세요.',
      'Rasmiy tadbir tugagan bo‘lsa ham odamlar Hangul kuni haqida gaplashishda davom etganini yozing.',
      'Write that discussion about Hangeul Day continued despite the official event having ended.',
      'Напишите, что разговор о Дне хангыля продолжился, несмотря на окончание официального мероприятия.',
    ),
    'Discussion about Hangeul Day continued despite the event having ended.',
    ['끝났는데도 불구하고'],
    ['neundedo-bulguhago', 'hangeul-day', 'type-answer'],
  ),

  s5u9_396_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '“참가자가 많은데도 불구하고 규칙이 잘 지켜졌어요”에서 불구하고가 필요한 이유를 가장 잘 설명한 것을 고르세요.',
      [
        '사람이 많으면 혼잡할 수 있다는 예상과 실제 결과가 다르기 때문이에요.',
        '참가자가 많은 것이 규칙을 만든 목적이기 때문이에요.',
        '참가자가 많아서 반드시 규칙이 지켜졌기 때문이에요.',
        '두 행동이 동시에 일어났다는 뜻이기 때문이에요.',
      ],
      '사람이 많으면 혼잡할 수 있다는 예상과 실제 결과가 다르기 때문이에요.',
      L(
        '형태만 외우지 않고 왜 대조가 성립하는지를 판단해야 해요.',
        'Faqat shaklni emas, nima uchun qarama-qarshilik mavjudligini tushunish kerak.',
        'Learners should identify why the contrast makes sense rather than only memorizing the form.',
        'Нужно понимать, почему возникает противопоставление, а не просто запоминать форму.',
      ),
      ['bulguhago', 'meaning'],
    ),
  ),

  s5u9_397_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '행사가 끝났는데도 불구하고 사람들은 한글날의 의미에 대해 계속 이야기했습니다.',
        'Tadbir tugaganiga qaramay, odamlar Hangul kunining ma’nosi haqida gaplashishda davom etdi.',
        'Despite the event having ended, people continued talking about the meaning of Hangeul Day.',
        'Несмотря на окончание мероприятия, люди продолжали говорить о смысле Дня хангыля.',
      ),
      [
        '계속 이야기했어요',
        '사람들은',
        '한글날의 의미에 대해',
        '행사가 끝났는데도 불구하고',
        '행사가 시작되기 위해',
        '모두 바로 떠났어요',
      ],
      '행사가 끝났는데도 불구하고 사람들은 한글날의 의미에 대해 계속 이야기했어요',
      L(
        '이번 문법과 다음 Node의 N에 대해(서)로 자연스럽게 이어질 수 있는 문장이에요.',
        'Bu gap yangi grammatika va keyingi Node’dagi N에 대해(서) o‘rtasida tabiiy ko‘prik bo‘ladi.',
        'This sentence naturally bridges the current grammar into the next node’s N에 대해(서).',
        'Это предложение естественно подводит к грамматике N에 대해(서) следующего Node.',
      ),
      ['neundedo-bulguhago', 'daehaeseo', 'hangeul-day'],
    ),
  ),

  s5u9_398_fill_in_blank: grammarQuestion(
    fillBlank(
      '행사가 끝났___ 불구하고 사람들은 계속 이야기했어요.',
      ['는데도'],
      ['는데도', '기 위해', '다가', '으면서', '기 때문에'],
      L(
        '끝났다는 과거 동사형이므로 끝났는데도 불구하고라고 해요.',
        '끝났다 o‘tgan fe’l shakli bo‘lgani uchun 끝났는데도 불구하고.',
        'Because 끝났다 is a past verb form, use 끝났는데도 불구하고.',
        'Поскольку 끝났다 — прошедшая форма глагола, используется 끝났는데도 불구하고.',
      ),
      ['neundedo-bulguhago', 'past', 'form'],
    ),
  ),

  s5u9_399_error_hunt: grammarQuestion(
    errorHunt(
      '오래된 기념일이데도 불구하고 아직 잘 알려지지 않았어요.',
      '기념일이데도',
      ['기념일인데도', '기념일이라서', '기념일이지만', '기념일부터'],
      '기념일인데도',
      L(
        '명사 뒤의 형태는 N인데도 불구하고예요.',
        'Otdan keyingi shakl N인데도 불구하고.',
        'The noun form is N인데도 불구하고.',
        'Форма после существительного — N인데도 불구하고.',
      ),
      ['indedo-bulguhago', 'conjugation'],
    ),
  ),

  s5u9_400_word_arrange: grammarQuestion(
    wordArrange(
      [
        '많은 사람이 참석했어요',
        '비가 오는데도 불구하고',
        '한글날 기념식에',
        '한글날의 의미를 배우기 위해',
        '비가 와서 모두 돌아가고',
        '행사가 취소됐어요',
      ],
      '비가 오는데도 불구하고 한글날의 의미를 배우기 위해 많은 사람이 한글날 기념식에 참석했어요',
      L(
        'Node 마지막에는 대조와 목적 표현을 함께 사용해 실제 한글날 상황을 설명해요.',
        'Node oxirida qarama-qarshilik va maqsad shakllari birga ishlatilib haqiqiy Hangul kuni vaziyati tushuntiriladi.',
        'The final task combines contrast and purpose to describe a realistic Hangeul Day situation.',
        'В финале объединяем противопоставление и цель для описания реальной ситуации Дня хангыля.',
      ),
      ['bulguhago', 'gi-wihae', 'hangeul-day', 'node-review'],
    ),
  ),
  // ══════════════════════════════════════════════════════════
  // Node 5 · N에 대해(서)
  // 어떤 주제에 관한 정보·생각·조사·설명을 표현하기
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 한글날에 대해 알아봤어요
  // N에 대해(서) 기본 의미
  // ──────────────────────────────────────────────────────────

  s5u9_401_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한국의 여러 기념일을 공부하고 있습니다. 오늘은 그중에서 한글날의 날짜, 의미와 대표 행사에 관한 정보를 찾아봤습니다.',
      [
        '한글날에 대해 알아봤어요.',
        '한글날을 위해 알아봤어요.',
        '한글날에서 알아봤어요.',
        '한글날에게 알아봤어요.',
      ],
      '한글날에 대해 알아봤어요.',
      L(
        '알아본 정보의 주제가 한글날이므로 N에 대해를 사용해요.',
        'O‘rganilgan ma’lumot mavzusi Hangul kuni bo‘lgani uchun N에 대해 ishlatiladi.',
        'Because Hangeul Day is the topic being researched, use N에 대해.',
        'Поскольку темой изучения является День хангыля, используется N에 대해.',
      ),
      ['n-e-daehae', 'hangeul-day'],
    ),
  ),

  s5u9_402_type_answer: topicTypeAnswer(
    '한글날에 대해 알아봤어요',
    L(
      '한글날의 날짜와 의미 같은 정보를 찾아봤다고 N에 대해를 사용해서 쓰세요.',
      'Hangul kunining sanasi va ma’nosi haqida ma’lumot izlaganingizni N에 대해 bilan yozing.',
      'Using N에 대해, write that you learned about Hangeul Day.',
      'Используя N에 대해, напишите, что вы узнали о Дне хангыля.',
    ),
    'The speaker learned about Hangeul Day.',
    ['한글날에 대해'],
    ['n-e-daehae', 'hangeul-day', 'type-answer'],
    ['한글날에 대해서 알아봤어요'],
  ),

  s5u9_403_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날에 대해 자세히 알아봤습니다.',
        'Hangul kuni haqida batafsil ma’lumot oldim.',
        'I learned about Hangeul Day in detail.',
        'Я подробно узнал о Дне хангыля.',
      ),
      [
        '자세히 알아봤어요',
        '한글날에 대해',
        '한글날을 위해',
        '한글날에서',
        '기념식을 열었어요',
        '한글날 때문에',
      ],
      '한글날에 대해 자세히 알아봤어요',
      L(
        'N에 대해는 어떤 주제를 조사하거나 설명할 때 자주 사용해요.',
        'N에 대해 biror mavzuni o‘rganish yoki tushuntirishda ko‘p ishlatiladi.',
        'N에 대해 is commonly used when researching or explaining a topic.',
        'N에 대해 часто используется при изучении или объяснении темы.',
      ),
      ['n-e-daehae', 'hangeul-day'],
    ),
  ),

  s5u9_404_fill_in_blank: grammarQuestion(
    fillBlank(
      '수업에서 한글날___ 이야기했어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에서', '에게', '때문에'],
      L(
        '이야기의 주제를 나타낼 때 N에 대해를 사용할 수 있어요.',
        'Suhbat mavzusini ko‘rsatishda N에 대해 ishlatiladi.',
        'N에 대해 can mark the topic being discussed.',
        'N에 대해 может обозначать тему разговора.',
      ),
      ['n-e-daehae', 'form'],
    ),
  ),

  s5u9_405_word_arrange: grammarQuestion(
    wordArrange(
      [
        '발표했어요',
        '한글날에 대해',
        '학생들이',
        '한글날을 위해',
        '기념식을 열었어요',
        '국기를 달았어요',
      ],
      '학생들이 한글날에 대해 발표했어요',
      L(
        '발표의 주제가 한글날이라는 뜻이에요.',
        'Taqdimot mavzusi Hangul kuni ekanini bildiradi.',
        'This means that Hangeul Day was the topic of the presentation.',
        'Это означает, что темой презентации был День хангыля.',
      ),
      ['n-e-daehae', 'presentation'],
    ),
  ),

  s5u9_406_type_answer: topicTypeAnswer(
    '학생들이 한글날에 대해 발표했어요',
    L(
      '학생들의 발표 주제가 한글날이었다고 N에 대해를 사용해서 쓰세요.',
      'Talabalarning taqdimot mavzusi Hangul kuni bo‘lganini N에 대해 bilan yozing.',
      'Using N에 대해, write that the students gave a presentation about Hangeul Day.',
      'Используя N에 대해, напишите, что ученики сделали презентацию о Дне хангыля.',
    ),
    'The students gave a presentation about Hangeul Day.',
    ['한글날에 대해'],
    ['n-e-daehae', 'hangeul-day', 'type-answer'],
    ['학생들이 한글날에 대해서 발표했어요'],
  ),

  s5u9_407_error_hunt: grammarQuestion(
    errorHunt(
      '수업에서 한글날을 대해 이야기했어요.',
      '한글날을',
      ['한글날에', '한글날이', '한글날과', '한글날부터'],
      '한글날에',
      L(
        '대해 앞에서는 을/를이 아니라 에를 사용해 N에 대해라고 해요.',
        '대해 oldidan 을/를 emas, 에 ishlatiladi: N에 대해.',
        'Use 에 rather than 을/를 before 대해: N에 대해.',
        'Перед 대해 используется 에, а не 을/를: N에 대해.',
      ),
      ['n-e-daehae', 'particle'],
    ),
  ),

  s5u9_408_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '친구와 한국의 기념일에 대해 이야기했습니다.',
        'Do‘stim bilan Koreyaning esdalik kunlari haqida gaplashdim.',
        'I talked with my friend about Korean commemorative days.',
        'Я поговорил с другом о памятных днях Кореи.',
      ),
      [
        '이야기했어요',
        '친구와',
        '한국의 기념일에 대해',
        '한국의 기념일을 위해',
        '기념식을 준비했어요',
        '기념일에서',
      ],
      '친구와 한국의 기념일에 대해 이야기했어요',
      L(
        '여러 기념일 전체를 하나의 이야기 주제로 삼을 수도 있어요.',
        'Bir nechta bayramni bitta umumiy mavzu sifatida olish mumkin.',
        'A group of commemorative days can also be treated as one discussion topic.',
        'Несколько памятных дней можно объединить в одну тему разговора.',
      ),
      ['n-e-daehae', 'commemorative-day'],
    ),
  ),

  s5u9_409_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '선생님이 학생들에게 “오늘 조사한 기념일의 날짜만 말하지 말고 그 기념일이 왜 만들어졌는지와 사람들이 무엇을 하는지도 설명하세요.”라고 했습니다.',
      [
        '기념일에 대해 설명해야 해요.',
        '기념일을 위해 설명해야 해요.',
        '기념일에게 설명해야 해요.',
        '기념일에서 설명해야 해요.',
      ],
      '기념일에 대해 설명해야 해요.',
      L(
        '기념일 자체가 설명의 주제예요.',
        'Esdalik kunining o‘zi tushuntirish mavzusi.',
        'The commemorative day itself is the topic being explained.',
        'Сам памятный день является темой объяснения.',
      ),
      ['n-e-daehae', 'commemorative-day'],
    ),
  ),

  s5u9_410_fill_in_blank: grammarQuestion(
    fillBlank(
      '한국의 기념일___ 조사해서 발표하세요.',
      ['에 대해서'],
      ['에 대해서', '을 위해서', '에서부터', '에게서', '때문에'],
      L(
        'N에 대해와 N에 대해서는 모두 주제를 나타낼 수 있어요.',
        'N에 대해 va N에 대해서 ikkalasi ham mavzuni bildiradi.',
        'Both N에 대해 and N에 대해서 can indicate a topic.',
        'И N에 대해, и N에 대해서 могут обозначать тему.',
      ),
      ['n-e-daehaeseo', 'form'],
    ),
  ),

  s5u9_411_type_answer: topicTypeAnswer(
    '한국의 기념일에 대해서 조사했어요',
    L(
      '한국의 여러 기념일을 주제로 조사했다고 N에 대해서를 사용해서 쓰세요.',
      'Koreyaning turli esdalik kunlarini mavzu qilib o‘rganganingizni N에 대해서 bilan yozing.',
      'Using N에 대해서, write that you researched Korean commemorative days.',
      'Используя N에 대해서, напишите, что вы исследовали памятные дни Кореи.',
    ),
    'The speaker researched Korean commemorative days.',
    ['기념일에 대해서'],
    ['n-e-daehaeseo', 'commemorative-day', 'type-answer'],
    ['한국의 기념일에 대해 조사했어요'],
  ),

  s5u9_412_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한국의 주요 기념일에 대해서 조사했습니다.',
        'Koreyaning asosiy esdalik kunlari haqida tadqiqot qildim.',
        'I researched major Korean commemorative days.',
        'Я исследовал основные памятные дни Кореи.',
      ),
      [
        '조사했어요',
        '한국의 주요 기념일에 대해서',
        '한국의 주요 기념일을 위해',
        '국기를 달았어요',
        '기념일에서',
        '행사를 열기 위해',
      ],
      '한국의 주요 기념일에 대해서 조사했어요',
      L(
        '조사하다와 N에 대해서는 자주 함께 사용할 수 있어요.',
        '조사하다 va N에 대해서 ko‘pincha birga ishlatiladi.',
        '조사하다 commonly combines with N에 대해서.',
        '조사하다 часто употребляется с N에 대해서.',
      ),
      ['n-e-daehaeseo', 'research'],
    ),
  ),

  s5u9_413_cloze_passage: grammarQuestion(
    clozePassage(
      '수업에서 ___에 대해 알아보고, 친구들과 ___에 대해서 이야기했어요.',
      ['한글날', '한국의 기념일'],
      ['한국의 기념일', '한글날', '한글날을 위해', '식목일에서', '선생님에게'],
      L(
        '에 대해와 에 대해서를 같은 주제 표현으로 연습해요.',
        '에 대해 va 에 대해서 mavzu shakllari sifatida mashq qilinadi.',
        'Practise both 에 대해 and 에 대해서 as topic expressions.',
        'Практикуем 에 대해 и 에 대해서 как выражения темы.',
      ),
      ['n-e-daehae', 'n-e-daehaeseo'],
    ),
  ),

  s5u9_414_word_arrange: grammarQuestion(
    wordArrange(
      [
        '조사했어요',
        '한글날의 역사에 대해',
        '도서관에서',
        '한글날을 위해',
        '국기를 달고',
        '묵념을 했어요',
      ],
      '도서관에서 한글날의 역사에 대해 조사했어요',
      L(
        '장소는 도서관이고 조사의 주제는 한글날의 역사예요.',
        'Joy kutubxona, tadqiqot mavzusi esa Hangul kuni tarixi.',
        'The library is the location, while the history of Hangeul Day is the research topic.',
        'Библиотека — место, а история Дня хангыля — тема исследования.',
      ),
      ['n-e-daehae', 'history'],
    ),
  ),

  s5u9_415_type_answer: topicTypeAnswer(
    '한글날의 역사에 대해 조사했어요',
    L(
      '한글날이 어떻게 생겼는지를 주제로 조사했다고 쓰세요.',
      'Hangul kuni qanday paydo bo‘lgani haqida tadqiqot qilganingizni yozing.',
      'Write that you researched the history of Hangeul Day.',
      'Напишите, что вы исследовали историю Дня хангыля.',
    ),
    'The speaker researched the history of Hangeul Day.',
    ['한글날의 역사에 대해'],
    ['n-e-daehae', 'hangeul-day', 'type-answer'],
    ['한글날의 역사에 대해서 조사했어요'],
  ),

  s5u9_416_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날에 관한 발표를 준비하려고 합니다. 먼저 날짜를 찾고, 한글이 어떻게 만들어졌는지와 한글날에 어떤 행사가 열리는지도 조사했습니다.',
      [
        '한글날에 대해 여러 정보를 조사했어요.',
        '한글날을 위해 날짜만 외웠어요.',
        '한글날에서만 행사를 했어요.',
        '한글날에게 정보를 물었어요.',
      ],
      '한글날에 대해 여러 정보를 조사했어요.',
      L(
        '하나의 주제에 대해 날짜, 역사, 행사처럼 여러 종류의 정보를 조사할 수 있어요.',
        'Bitta mavzu bo‘yicha sana, tarix va tadbir kabi turli ma’lumotlarni o‘rganish mumkin.',
        'A single topic can be researched from several angles, such as its date, history, and events.',
        'Одну тему можно изучать с разных сторон: дата, история, мероприятия.',
      ),
      ['n-e-daehae', 'hangeul-day'],
    ),
  ),

  s5u9_417_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날의 날짜와 의미에 대해 조사했습니다.',
        'Hangul kunining sanasi va ma’nosi haqida ma’lumot to‘pladim.',
        'I researched the date and meaning of Hangeul Day.',
        'Я исследовал дату и значение Дня хангыля.',
      ),
      [
        '조사했어요',
        '한글날의 날짜와 의미에 대해',
        '한글날을 위해',
        '날짜와 의미를 기념하고',
        '한글날에서',
        '행사를 준비했어요',
      ],
      '한글날의 날짜와 의미에 대해 조사했어요',
      L(
        '한 주제 안에서 두 가지 이상의 세부 내용을 함께 다룰 수도 있어요.',
        'Bir mavzu ichida bir nechta tafsilotni birga ko‘rib chiqish mumkin.',
        'Multiple details within one topic can be discussed together.',
        'В рамках одной темы можно одновременно рассматривать несколько деталей.',
      ),
      ['n-e-daehae', 'hangeul-day'],
    ),
  ),

  s5u9_418_fill_in_blank: grammarQuestion(
    fillBlank(
      '친구가 한글날의 의미___ 물어봤어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에서', '에게', '부터'],
      L(
        '질문하거나 묻는 내용의 주제도 N에 대해로 나타낼 수 있어요.',
        'Savol mavzusi ham N에 대해 bilan ifodalanishi mumkin.',
        'N에 대해 can also identify the subject being asked about.',
        'N에 대해 также может обозначать тему вопроса.',
      ),
      ['n-e-daehae', 'form'],
    ),
  ),

  s5u9_419_error_hunt: grammarQuestion(
    errorHunt(
      '한국의 기념일에 대해서를 조사했어요.',
      '대해서를',
      ['대해서', '위해서', '대하면', '대하고'],
      '대해서',
      L(
        'N에 대해서 자체가 주제를 나타내므로 뒤에 목적격 조사 를을 다시 붙이지 않아요.',
        'N에 대해서ning o‘zi mavzuni bildiradi, undan keyin 를 qo‘shilmaydi.',
        'N에 대해서 already marks the topic, so do not add 를 after it.',
        'N에 대해서 уже обозначает тему, поэтому 를 после него не добавляется.',
      ),
      ['n-e-daehaeseo', 'conjugation'],
    ),
  ),

  s5u9_420_word_arrange: grammarQuestion(
    wordArrange(
      [
        '발표를 준비했어요',
        '한글날에 대해',
        '여러 자료를 조사해서',
        '한글날을 위해',
        '국기를 달아서',
        '행진을 해서',
      ],
      '한글날에 대해 여러 자료를 조사해서 발표를 준비했어요',
      L(
        '주제를 정하고 정보를 조사한 뒤 실제 발표까지 이어지는 흐름이에요.',
        'Mavzuni tanlab, ma’lumot yig‘ib, so‘ng taqdimot tayyorlash jarayoni.',
        'This follows a realistic flow from choosing a topic to researching and preparing a presentation.',
        'Это реальный процесс: выбрать тему, изучить материалы и подготовить презентацию.',
      ),
      ['n-e-daehae', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 한글의 역사에 대해 알아봐요
  // 한글 관련 실제 정보 + Unit 9 어휘
  // ──────────────────────────────────────────────────────────

  s5u9_421_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글의 역사를 공부하려고 합니다. 누가 한글을 만들었는지, 한글이 만들어지기 전에는 어떤 문자를 사용했는지, 한글이 어떻게 사람들에게 알려졌는지를 조사했습니다.',
      [
        '한글의 역사에 대해 조사했어요.',
        '한글의 역사를 위해 조사했어요.',
        '한글의 역사에서 조사했어요.',
        '한글의 역사에게 조사했어요.',
      ],
      '한글의 역사에 대해 조사했어요.',
      L(
        '조사의 전체 주제가 한글의 역사예요.',
        'Tadqiqotning umumiy mavzusi Hangul tarixi.',
        'The overall research topic is the history of Hangeul.',
        'Общая тема исследования — история хангыля.',
      ),
      ['n-e-daehae', 'hangeul', 'history'],
    ),
  ),

  s5u9_422_type_answer: topicTypeAnswer(
    '한글의 역사에 대해 공부했어요',
    L(
      '한글이 만들어진 과정과 역사적인 배경을 공부했다고 N에 대해를 사용해서 쓰세요.',
      'Hangulning yaratilish jarayoni va tarixi haqida o‘rganganingizni N에 대해 bilan yozing.',
      'Using N에 대해, write that you studied the history of Hangeul.',
      'Используя N에 대해, напишите, что вы изучали историю хангыля.',
    ),
    'The speaker studied the history of Hangeul.',
    ['한글의 역사에 대해'],
    ['n-e-daehae', 'hangeul', 'type-answer'],
    ['한글의 역사에 대해서 공부했어요'],
  ),

  s5u9_423_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글의 역사에 대해 공부했습니다.',
        'Hangul tarixi haqida o‘rgandim.',
        'I studied the history of Hangeul.',
        'Я изучал историю хангыля.',
      ),
      [
        '공부했어요',
        '한글의 역사에 대해',
        '한글의 역사를 위해',
        '한글에서',
        '기념식을 열었어요',
        '역사를 만들기 위해',
      ],
      '한글의 역사에 대해 공부했어요',
      L(
        '공부하다와 함께 사용하면 무엇을 주제로 공부했는지 나타낼 수 있어요.',
        '공부하다 bilan nimani mavzu qilib o‘rganganlik ko‘rsatiladi.',
        'With 공부하다, the expression identifies the subject of study.',
        'С 공부하다 выражение указывает предмет изучения.',
      ),
      ['n-e-daehae', 'hangeul'],
    ),
  ),

  s5u9_424_fill_in_blank: grammarQuestion(
    fillBlank(
      '수업에서 세종대왕___ 배웠어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에게서', '에서', '부터'],
      L(
        '배우는 내용의 주제가 세종대왕이므로 세종대왕에 대해라고 해요.',
        'O‘rganish mavzusi qirol Sejong bo‘lgani uchun 세종대왕에 대해 ishlatiladi.',
        'Because King Sejong is the subject being learned about, use 세종대왕에 대해.',
        'Поскольку предмет изучения — король Седжон, используется 세종대왕에 대해.',
      ),
      ['n-e-daehae', 'king-sejong-great'],
    ),
  ),

  s5u9_425_word_arrange: grammarQuestion(
    wordArrange(
      [
        '조사했어요',
        '세종대왕에 대해',
        '학생들이',
        '세종대왕을 위해',
        '한자를 사용했고',
        '기념식을 열었어요',
      ],
      '학생들이 세종대왕에 대해 조사했어요',
      L(
        '세종대왕이 조사의 대상이 아니라 조사 주제라는 뜻이에요.',
        'Qirol Sejong harakat obyekti emas, tadqiqot mavzusi.',
        'King Sejong is the research topic.',
        'Король Седжон является темой исследования.',
      ),
      ['n-e-daehae', 'king-sejong-great'],
    ),
  ),

  s5u9_426_type_answer: topicTypeAnswer(
    '세종대왕에 대해 조사했어요',
    L(
      '세종대왕의 업적과 한글과의 관계를 주제로 조사했다고 쓰세요.',
      'Qirol Sejongning faoliyati va Hangul bilan aloqasi haqida tadqiqot qilganingizni yozing.',
      'Write that you researched King Sejong.',
      'Напишите, что вы исследовали сведения о короле Седжоне.',
    ),
    'The speaker researched King Sejong.',
    ['세종대왕에 대해'],
    ['n-e-daehae', 'king-sejong-great', 'type-answer'],
    ['세종대왕에 대해서 조사했어요'],
  ),

  s5u9_427_error_hunt: grammarQuestion(
    errorHunt(
      '학생들이 세종대왕을 대해 자료를 찾았어요.',
      '세종대왕을',
      ['세종대왕에', '세종대왕이', '세종대왕과', '세종대왕부터'],
      '세종대왕에',
      L(
        '주제를 나타내는 대해 앞에는 에가 필요해요.',
        '대해 oldidan mavzu uchun 에 kerak.',
        'The topic expression 대해 requires 에 before it.',
        'Перед 대해 для обозначения темы требуется 에.',
      ),
      ['n-e-daehae', 'particle'],
    ),
  ),

  s5u9_428_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '세종대왕과 한글의 창제에 대해 조사했습니다.',
        'Qirol Sejong va Hangulning yaratilishi haqida tadqiqot qildim.',
        'I researched King Sejong and the creation of Hangeul.',
        'Я исследовал короля Седжона и создание хангыля.',
      ),
      [
        '조사했어요',
        '세종대왕과 한글의 창제에 대해',
        '세종대왕을 위해',
        '창제를 기념하기 위해',
        '한글날에서',
        '국기를 달았어요',
      ],
      '세종대왕과 한글의 창제에 대해 조사했어요',
      L(
        '둘 이상의 관련 내용을 하나의 주제로 묶을 수도 있어요.',
        'Bir nechta bog‘liq ma’lumotni bitta mavzu qilib birlashtirish mumkin.',
        'Multiple related subjects can be grouped into one topic.',
        'Несколько связанных аспектов можно объединить в одну тему.',
      ),
      ['n-e-daehae', 'script-creation'],
    ),
  ),

  s5u9_429_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글이 만들어지기 전의 문자 생활을 알아보기 위해 자료를 읽었습니다. 자료에는 한자가 오랫동안 사용되었다는 내용이 있었습니다.',
      [
        '한글과 한자에 대해 배웠어요.',
        '한글과 한자를 위해 배웠어요.',
        '한글과 한자에서 배웠어요.',
        '한글과 한자에게 배웠어요.',
      ],
      '한글과 한자에 대해 배웠어요.',
      L(
        '한글과 한자가 함께 학습 주제가 된 상황이에요.',
        'Hangul va xitoy ierogliflari birga o‘rganish mavzusi bo‘lgan.',
        'Hangeul and Chinese characters are both topics of study.',
        'Хангыль и китайские иероглифы вместе являются темой изучения.',
      ),
      ['n-e-daehae', 'chinese-characters'],
    ),
  ),

  s5u9_430_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글이 만들어지기 전의 한자 사용___ 알아봤어요.',
      ['에 대해서'],
      ['에 대해서', '을 위해서', '에서부터', '에게서', '때문에'],
      L(
        '한자 사용이라는 주제를 조사하므로 에 대해서를 사용해요.',
        '한자 사용 mavzu bo‘lgani uchun 에 대해서 ishlatiladi.',
        'Because the use of Chinese characters is the topic, use 에 대해서.',
        'Поскольку использование китайских иероглифов является темой, используется 에 대해서.',
      ),
      ['n-e-daehaeseo', 'chinese-characters'],
    ),
  ),

  s5u9_431_type_answer: topicTypeAnswer(
    '한자 사용에 대해서 알아봤어요',
    L(
      '한글이 만들어지기 전 한자가 어떻게 사용되었는지를 알아봤다고 쓰세요.',
      'Hanguldan oldin xitoy ierogliflari qanday ishlatilganini o‘rganganingizni yozing.',
      'Write that you learned about the use of Chinese characters.',
      'Напишите, что вы узнали об использовании китайских иероглифов.',
    ),
    'The speaker learned about the use of Chinese characters.',
    ['한자 사용에 대해서'],
    ['n-e-daehaeseo', 'chinese-characters', 'type-answer'],
    ['한자 사용에 대해 알아봤어요'],
  ),

  s5u9_432_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글의 창제와 반포에 대해서 배웠습니다.',
        'Hangulning yaratilishi va rasmiy e’lon qilinishi haqida o‘rgandim.',
        'I learned about the creation and promulgation of Hangeul.',
        'Я узнал о создании и официальном обнародовании хангыля.',
      ),
      [
        '배웠어요',
        '한글의 창제와 반포에 대해서',
        '창제와 반포를 위해',
        '한자를 사용해서',
        '한글날에서',
        '기념식을 열었어요',
      ],
      '한글의 창제와 반포에 대해서 배웠어요',
      L(
        '한글날의 의미를 이해하려면 창제와 반포 같은 역사 내용도 함께 알아야 해요.',
        'Hangul kunining ma’nosini tushunish uchun yaratilish va e’lon qilish tarixini ham bilish kerak.',
        'Understanding Hangeul Day also requires historical context such as its creation and promulgation.',
        'Для понимания Дня хангыля полезно знать историю создания и обнародования письменности.',
      ),
      ['n-e-daehaeseo', 'script-creation', 'promulgation'],
    ),
  ),

  s5u9_433_cloze_passage: grammarQuestion(
    clozePassage(
      '수업에서는 ___에 대해 배우고, 한글이 만들어지기 전의 ___ 사용에 대해서도 알아봤어요.',
      ['한글의 창제', '한자'],
      ['한자', '한글의 창제', '식목일', '공휴일', '묵념'],
      L(
        '한글의 역사와 관련된 두 주제를 연결해요.',
        'Hangul tarixiga oid ikki mavzu bog‘lanadi.',
        'Connect two topics related to the history of Hangeul.',
        'Связываем две темы, относящиеся к истории хангыля.',
      ),
      ['n-e-daehae', 'hangeul-history'],
    ),
  ),

  s5u9_434_word_arrange: grammarQuestion(
    wordArrange(
      [
        '배웠어요',
        '한글의 창제와 반포에 대해',
        '오늘 수업에서',
        '한글날을 위해',
        '기념식을 열고',
        '국기를 달았어요',
      ],
      '오늘 수업에서 한글의 창제와 반포에 대해 배웠어요',
      L(
        '수업 장소가 아니라 배운 내용의 주제를 대해로 표시해요.',
        '대해 dars joyini emas, o‘rganilgan mavzuni bildiradi.',
        '대해 marks the subject learned about, not the class location.',
        '대해 обозначает тему изучения, а не место занятия.',
      ),
      ['n-e-daehae', 'script-creation'],
    ),
  ),

  s5u9_435_type_answer: topicTypeAnswer(
    '한글의 창제와 반포에 대해 배웠어요',
    L(
      '한글이 만들어지고 사람들에게 공식적으로 알려진 역사에 관해 배웠다고 쓰세요.',
      'Hangul yaratilishi va rasman e’lon qilinishi tarixi haqida o‘rganganingizni yozing.',
      'Write that you learned about the creation and promulgation of Hangeul.',
      'Напишите, что вы изучали создание и обнародование хангыля.',
    ),
    'The speaker learned about the creation and promulgation of Hangeul.',
    ['창제와 반포에 대해'],
    ['n-e-daehae', 'hangeul-history', 'type-answer'],
    ['한글의 창제와 반포에 대해서 배웠어요'],
  ),

  s5u9_436_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글의 가치를 소개하는 발표를 준비했습니다. 발표에서는 한글의 역사만 말하지 않고 사람들이 한글을 어떻게 평가하는지도 다뤘습니다.',
      [
        '한글의 우수성에 대해 발표했어요.',
        '한글의 우수성을 위해 발표했어요.',
        '한글의 우수성에서 발표했어요.',
        '한글의 우수성에게 발표했어요.',
      ],
      '한글의 우수성에 대해 발표했어요.',
      L(
        '한글의 장점이나 뛰어난 점이 발표 주제예요.',
        'Hangulning afzalliklari taqdimot mavzusi.',
        'The strengths of Hangeul are the topic of the presentation.',
        'Достоинства хангыля являются темой презентации.',
      ),
      ['n-e-daehae', 'excellent'],
    ),
  ),

  s5u9_437_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '학생들이 한글의 우수성에 대해 발표했습니다.',
        'Talabalar Hangulning afzalliklari haqida taqdimot qildilar.',
        'The students gave a presentation about the strengths of Hangeul.',
        'Ученики сделали презентацию о достоинствах хангыля.',
      ),
      [
        '발표했어요',
        '학생들이',
        '한글의 우수성에 대해',
        '한글을 위해',
        '우수해서',
        '기념식을 열었어요',
      ],
      '학생들이 한글의 우수성에 대해 발표했어요',
      L(
        '추상적인 특징이나 가치도 N에 대해의 주제가 될 수 있어요.',
        'Mavhum xususiyat yoki qadriyat ham N에 대해 bilan mavzu bo‘lishi mumkin.',
        'Abstract qualities and values can also be topics with N에 대해.',
        'Абстрактные качества и ценности также могут быть темой с N에 대해.',
      ),
      ['n-e-daehae', 'excellent'],
    ),
  ),

  s5u9_438_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글의 우수성___ 여러 자료를 찾아봤어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에서', '에게', '까지'],
      L(
        '찾아본 자료의 주제가 한글의 우수성이에요.',
        'Topilgan materiallarning mavzusi Hangulning afzalliklari.',
        'The materials concern the strengths of Hangeul.',
        'Материалы посвящены достоинствам хангыля.',
      ),
      ['n-e-daehae', 'form'],
    ),
  ),

  s5u9_439_error_hunt: grammarQuestion(
    errorHunt(
      '한글의 우수성에 대한서 발표했어요.',
      '대한서',
      ['대해서', '위해서', '대하고', '대하면'],
      '대해서',
      L(
        'N에 대해서라고 해야 하므로 대한서가 아니라 대해서가 맞아요.',
        'To‘g‘ri shakl N에 대해서, 대한서 emas.',
        'The correct form is N에 대해서, not 대한서.',
        'Правильная форма — N에 대해서, а не 대한서.',
      ),
      ['n-e-daehaeseo', 'conjugation'],
    ),
  ),

  s5u9_440_word_arrange: grammarQuestion(
    wordArrange(
      [
        '점점 많아지고 있어요',
        '한글의 가치에 대해',
        '관심을 가지는 사람이',
        '한글을 위해',
        '관심이 줄어들고 있어요',
        '모두 같은 생각을 해요',
      ],
      '한글의 가치에 대해 관심을 가지는 사람이 점점 많아지고 있어요',
      L(
        '한글의 가치가 실제 관심의 주제가 되는 문장이에요.',
        'Hangulning qadri haqiqiy qiziqish mavzusi bo‘lgan gap.',
        'The value of Hangeul is the actual topic of people’s growing interest.',
        'Ценность хангыля является реальной темой растущего интереса людей.',
      ),
      ['n-e-daehae', 'gradually', 'hangeul'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 다른 기념일에 대해서도 설명해요
  // 기념일 간 비교·설명
  // ──────────────────────────────────────────────────────────

  s5u9_441_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '외국인 친구가 8월 15일에 많은 집에 국기가 걸린 이유를 궁금해했습니다. 그래서 광복절의 날짜와 역사적 의미를 설명해 주었습니다.',
      [
        '광복절에 대해 설명했어요.',
        '광복절을 위해 설명했어요.',
        '광복절에서 설명했어요.',
        '광복절에게 설명했어요.',
      ],
      '광복절에 대해 설명했어요.',
      L(
        '설명의 주제가 광복절이에요.',
        'Tushuntirish mavzusi Ozodlik kuni.',
        'Liberation Day is the topic being explained.',
        'Темой объяснения является День освобождения.',
      ),
      ['n-e-daehae', 'liberation-day-korea'],
    ),
  ),

  s5u9_442_type_answer: topicTypeAnswer(
    '광복절에 대해 설명했어요',
    L(
      '외국인 친구에게 광복절의 날짜와 의미를 설명했다고 쓰세요.',
      'Xorijlik do‘stingizga Ozodlik kunining sanasi va ma’nosini tushuntirganingizni yozing.',
      'Write that you explained Liberation Day.',
      'Напишите, что вы рассказали о Дне освобождения.',
    ),
    'The speaker explained Liberation Day.',
    ['광복절에 대해'],
    ['n-e-daehae', 'liberation-day-korea', 'type-answer'],
    ['광복절에 대해서 설명했어요'],
  ),

  s5u9_443_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '친구에게 광복절의 의미에 대해 설명했습니다.',
        'Do‘stimga Ozodlik kunining ma’nosi haqida tushuntirdim.',
        'I explained the meaning of Liberation Day to my friend.',
        'Я объяснил другу значение Дня освобождения.',
      ),
      [
        '설명했어요',
        '친구에게',
        '광복절의 의미에 대해',
        '광복절을 위해',
        '국기를 달았어요',
        '광복절에서',
      ],
      '친구에게 광복절의 의미에 대해 설명했어요',
      L(
        '에게는 설명을 듣는 사람이고 에 대해는 설명 주제예요.',
        '에게 tinglovchini, 에 대해 esa mavzuni bildiradi.',
        '에게 marks the listener, while 에 대해 marks the topic.',
        '에게 обозначает слушателя, а 에 대해 — тему объяснения.',
      ),
      ['n-e-daehae', 'liberation-day-korea'],
    ),
  ),

  s5u9_444_fill_in_blank: grammarQuestion(
    fillBlank(
      '수업에서 현충일의 의미___ 이야기했어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에게', '에서', '때문에'],
      L(
        '이야기의 주제가 현충일의 의미예요.',
        'Suhbat mavzusi Xotira kunining ma’nosi.',
        'The topic of discussion is the meaning of Memorial Day.',
        'Тема разговора — значение Дня памяти.',
      ),
      ['n-e-daehae', 'memorial-day-korea'],
    ),
  ),

  s5u9_445_word_arrange: grammarQuestion(
    wordArrange(
      [
        '이야기했어요',
        '현충일에 대해',
        '수업에서',
        '현충일을 위해',
        '불꽃놀이를 하고',
        '나무를 심었어요',
      ],
      '수업에서 현충일에 대해 이야기했어요',
      L(
        '현충일에는 무엇을 기념하고 어떤 행동을 하는지 설명할 수 있어야 해요.',
        'Xotira kunida nima xotirlanishi va qanday harakatlar qilinishini tushuntira olish kerak.',
        'Learners should be able to explain what Memorial Day commemorates and what people do.',
        'Ученик должен уметь объяснить смысл Дня памяти и связанные с ним действия.',
      ),
      ['n-e-daehae', 'memorial-day-korea'],
    ),
  ),

  s5u9_446_type_answer: topicTypeAnswer(
    '현충일에 대해 이야기했어요',
    L(
      '현충일의 의미와 묵념 같은 기념 행동을 주제로 이야기했다고 쓰세요.',
      'Xotira kunining ma’nosi va sukut saqlash kabi odatlar haqida gaplashganingizni yozing.',
      'Write that you talked about Memorial Day.',
      'Напишите, что вы говорили о Дне памяти.',
    ),
    'The speaker talked about Memorial Day.',
    ['현충일에 대해'],
    ['n-e-daehae', 'memorial-day-korea', 'type-answer'],
    ['현충일에 대해서 이야기했어요'],
  ),

  s5u9_447_error_hunt: grammarQuestion(
    errorHunt(
      '현충일을 대해 발표 자료를 만들었어요.',
      '현충일을',
      ['현충일에', '현충일이', '현충일과', '현충일부터'],
      '현충일에',
      L(
        '발표 주제를 나타낼 때는 현충일에 대해라고 해요.',
        'Taqdimot mavzusi uchun 현충일에 대해 ishlatiladi.',
        'For a presentation topic, use 현충일에 대해.',
        'Для темы презентации используется 현충일에 대해.',
      ),
      ['n-e-daehae', 'particle'],
    ),
  ),

  s5u9_448_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '현충일에 대해 조사하고 묵념의 의미도 배웠습니다.',
        'Xotira kuni haqida o‘rganib, sukut saqlash ma’nosini ham bildim.',
        'I researched Memorial Day and also learned the meaning of a silent tribute.',
        'Я исследовал День памяти и также узнал значение минуты молчания.',
      ),
      [
        '묵념의 의미도 배웠어요',
        '현충일에 대해 조사하고',
        '현충일을 위해',
        '불꽃놀이를 하고',
        '광복절에서',
        '국기를 내렸어요',
      ],
      '현충일에 대해 조사하고 묵념의 의미도 배웠어요',
      L(
        '기념일 이름뿐 아니라 그날 하는 행동의 의미까지 연결해요.',
        'Faqat bayram nomi emas, undagi harakat ma’nosi ham bog‘lanadi.',
        'Connect the commemorative day with the meaning of its associated actions.',
        'Связываем памятный день со смыслом связанных с ним действий.',
      ),
      ['n-e-daehae', 'silent-tribute'],
    ),
  ),

  s5u9_449_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '식목일을 소개하는 자료를 읽었습니다. 자료에는 왜 나무를 심는지와 자연을 보호하는 것이 왜 중요한지 설명되어 있었습니다.',
      [
        '식목일과 환경 보호에 대해 읽었어요.',
        '식목일과 환경 보호를 위해 읽었어요.',
        '식목일과 환경 보호에서 읽었어요.',
        '식목일과 환경 보호에게 읽었어요.',
      ],
      '식목일과 환경 보호에 대해 읽었어요.',
      L(
        '글의 주제가 식목일과 환경 보호예요.',
        'Matn mavzusi Daraxt ekish kuni va atrof-muhitni asrash.',
        'The reading concerns Arbor Day and environmental protection.',
        'Текст посвящён Дню посадки деревьев и защите природы.',
      ),
      ['n-e-daehae', 'arbor-day'],
    ),
  ),

  s5u9_450_fill_in_blank: grammarQuestion(
    fillBlank(
      '식목일과 나무 심기의 의미___ 자료를 읽었어요.',
      ['에 대해서'],
      ['에 대해서', '을 위해서', '에서', '에게서', '때문에'],
      L(
        '읽은 자료가 어떤 내용인지 N에 대해서로 나타낼 수 있어요.',
        'O‘qilgan material nimaga oid ekanini N에 대해서 bilan ko‘rsatish mumkin.',
        'N에 대해서 can indicate what a text is about.',
        'N에 대해서 может показать, чему посвящён текст.',
      ),
      ['n-e-daehaeseo', 'arbor-day'],
    ),
  ),

  s5u9_451_type_answer: topicTypeAnswer(
    '식목일에 대해서 읽었어요',
    L(
      '식목일의 의미와 나무 심기에 관한 글을 읽었다고 N에 대해서를 사용해서 쓰세요.',
      'Daraxt ekish kunining ma’nosi haqida matn o‘qiganingizni N에 대해서 bilan yozing.',
      'Using N에 대해서, write that you read about Arbor Day.',
      'Используя N에 대해서, напишите, что вы читали о Дне посадки деревьев.',
    ),
    'The speaker read about Arbor Day.',
    ['식목일에 대해서'],
    ['n-e-daehaeseo', 'arbor-day', 'type-answer'],
    ['식목일에 대해 읽었어요'],
  ),

  s5u9_452_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '식목일의 의미와 나무 심기에 대해 읽었습니다.',
        'Daraxt ekish kunining ma’nosi va daraxt ekish haqida o‘qidim.',
        'I read about the meaning of Arbor Day and planting trees.',
        'Я читал о значении Дня посадки деревьев и посадке деревьев.',
      ),
      [
        '읽었어요',
        '식목일의 의미와 나무 심기에 대해',
        '식목일을 위해',
        '나무를 심기 위해',
        '광복절에서',
        '국기를 달았어요',
      ],
      '식목일의 의미와 나무 심기에 대해 읽었어요',
      L(
        '하나의 기념일과 그 대표 행동을 하나의 주제로 연결해요.',
        'Bitta bayram va uning asosiy harakati bitta mavzuga birlashtiriladi.',
        'Connect a commemorative day and its typical action as one topic.',
        'Объединяем памятный день и характерное действие в одну тему.',
      ),
      ['n-e-daehae', 'arbor-day'],
    ),
  ),

  s5u9_453_cloze_passage: grammarQuestion(
    clozePassage(
      '광복절의 역사적 의미___ 발표하고, 현충일의 묵념___ 친구들과 이야기했어요.',
      ['에 대해', '에 대해서'],
      ['에 대해서', '에 대해', '을 위해', '에서', '때문에'],
      L(
        '서로 다른 기념일을 에 대해와 에 대해서로 설명해요.',
        'Turli bayramlar 에 대해 va 에 대해서 bilan tushuntiriladi.',
        'Discuss different commemorative days using both 에 대해 and 에 대해서.',
        'Обсуждаем разные памятные дни с помощью 에 대해 и 에 대해서.',
      ),
      ['n-e-daehae', 'commemorative-day'],
    ),
  ),

  s5u9_454_word_arrange: grammarQuestion(
    wordArrange(
      [
        '비교해 봤어요',
        '어버이날과 스승의 날에 대해',
        '감사하는 대상과 방법을',
        '현충일을 위해',
        '묵념을 하고',
        '국기를 달았어요',
      ],
      '어버이날과 스승의 날에 대해 감사하는 대상과 방법을 비교해 봤어요',
      L(
        '둘 다 감사와 관련 있지만 누구에게 감사하는지는 달라요.',
        'Ikkalasi ham minnatdorchilikka oid, lekin kimga minnatdorchilik bildirilishi farq qiladi.',
        'Both involve gratitude, but the person being thanked differs.',
        'Оба дня связаны с благодарностью, но отличаются тем, кого благодарят.',
      ),
      ['n-e-daehae', 'parents-day', 'teachers-day'],
    ),
  ),

  s5u9_455_type_answer: topicTypeAnswer(
    '어버이날과 스승의 날에 대해 비교해 봤어요',
    L(
      '어버이날과 스승의 날의 공통점과 차이점을 비교했다고 쓰세요.',
      'Ota-onalar kuni va Ustozlar kunining o‘xshash va farqli tomonlarini solishtirganingizni yozing.',
      'Write that you compared Parents’ Day and Teachers’ Day.',
      'Напишите, что вы сравнили День родителей и День учителя.',
    ),
    'The speaker compared Parents’ Day and Teachers’ Day.',
    ['어버이날과 스승의 날에 대해'],
    ['n-e-daehae', 'commemorative-day', 'type-answer'],
    ['어버이날과 스승의 날에 대해서 비교해 봤어요'],
  ),

  s5u9_456_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '어버이날과 스승의 날은 모두 감사와 관련이 있지만 대상은 다릅니다. 한 날에는 부모님께, 다른 날에는 선생님께 감사의 마음을 전합니다.',
      [
        '두 기념일의 공통점과 차이에 대해 설명하고 있어요.',
        '두 기념일을 위해 행사를 준비하고 있어요.',
        '두 기념일에서 나무를 심고 있어요.',
        '두 기념일 때문에 묵념하고 있어요.',
      ],
      '두 기념일의 공통점과 차이에 대해 설명하고 있어요.',
      L(
        '두 대상을 비교할 때 공통점과 차이도 설명 주제가 될 수 있어요.',
        'Ikki narsani solishtirganda o‘xshashlik va farqlar ham mavzu bo‘lishi mumkin.',
        'Similarities and differences can themselves become a discussion topic.',
        'Сходства и различия также могут быть темой объяснения.',
      ),
      ['n-e-daehae', 'comparison'],
    ),
  ),

  s5u9_457_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '어버이날과 스승의 날의 차이에 대해 이야기했습니다.',
        'Ota-onalar kuni va Ustozlar kuni o‘rtasidagi farq haqida gaplashdik.',
        'We talked about the differences between Parents’ Day and Teachers’ Day.',
        'Мы поговорили о различиях между Днём родителей и Днём учителя.',
      ),
      [
        '이야기했어요',
        '어버이날과 스승의 날의 차이에 대해',
        '부모님을 위해',
        '선생님을 위해',
        '식목일에서',
        '나무를 심었어요',
      ],
      '어버이날과 스승의 날의 차이에 대해 이야기했어요',
      L(
        '기념일 이름을 외우는 데서 끝나지 않고 서로 비교해 설명해요.',
        'Faqat bayram nomlarini yodlash emas, ularni taqqoslab tushuntirish kerak.',
        'The learner moves beyond memorizing names to comparing and explaining them.',
        'Ученик не просто запоминает названия, а сравнивает и объясняет памятные дни.',
      ),
      ['n-e-daehae', 'comparison'],
    ),
  ),

  s5u9_458_fill_in_blank: grammarQuestion(
    fillBlank(
      '광복절과 삼일절의 차이___ 친구와 이야기했어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에게', '에서', '때문에'],
      L(
        '두 역사 기념일의 차이가 대화 주제예요.',
        'Ikki tarixiy kunning farqi suhbat mavzusi.',
        'The difference between the two historical commemorative days is the topic.',
        'Различие между двумя историческими памятными днями является темой разговора.',
      ),
      ['n-e-daehae', 'comparison'],
    ),
  ),

  s5u9_459_error_hunt: grammarQuestion(
    errorHunt(
      '광복절과 삼일절의 차이를 대해 이야기했어요.',
      '차이를',
      ['차이에', '차이가', '차이와', '차이부터'],
      '차이에',
      L(
        'N에 대해에서는 주제 명사 뒤에 에를 사용해요.',
        'N에 대해 shaklida mavzu otidan keyin 에 keladi.',
        'In N에 대해, the topic noun takes 에.',
        'В конструкции N에 대해 после существительного-темы используется 에.',
      ),
      ['n-e-daehae', 'particle'],
    ),
  ),

  s5u9_460_word_arrange: grammarQuestion(
    wordArrange(
      [
        '설명했어요',
        '외국인 친구에게',
        '한국의 기념일에 대해',
        '날짜와 의미를 함께',
        '기념일을 위해',
        '국기를 달았어요',
      ],
      '외국인 친구에게 한국의 기념일에 대해 날짜와 의미를 함께 설명했어요',
      L(
        '기념일을 실제로 소개할 때 날짜와 의미를 함께 전달하는 단계예요.',
        'Bayramni haqiqiy tanishtirishda sana va ma’no birga tushuntiriladi.',
        'This practises giving both the date and meaning when introducing a commemorative day.',
        'Практикуем одновременное объяснение даты и смысла памятного дня.',
      ),
      ['n-e-daehae', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 성년식과 수상 소감에 대해 이야기해요
  // Unit 9 뒤쪽 교재 어휘 확장
  // ──────────────────────────────────────────────────────────

  s5u9_461_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '나라와 문화에 따라 성인이 된 것을 축하하는 방법이 다릅니다. 어떤 곳에서는 특별한 옷을 입고 행사를 하고, 어떤 곳에서는 가족과 함께 시간을 보냅니다.',
      [
        '여러 나라의 성년식에 대해 설명하고 있어요.',
        '여러 나라의 성년식을 위해 설명하고 있어요.',
        '성년식에서만 한글날을 기념하고 있어요.',
        '성년식 때문에 묵념하고 있어요.',
      ],
      '여러 나라의 성년식에 대해 설명하고 있어요.',
      L(
        '성년식이라는 문화 행사가 글의 주제예요.',
        '성년식 madaniy marosimi matn mavzusi.',
        'Coming-of-age ceremonies are the topic of the passage.',
        'Темой текста являются церемонии совершеннолетия.',
      ),
      ['n-e-daehae', 'coming-of-age-ceremony'],
    ),
  ),

  s5u9_462_type_answer: topicTypeAnswer(
    '다른 나라의 성년식에 대해 조사했어요',
    L(
      '다른 나라에서는 성인이 된 것을 어떻게 기념하는지 조사했다고 쓰세요.',
      'Boshqa davlatlarda voyaga yetish qanday nishonlanishini o‘rganganingizni yozing.',
      'Write that you researched coming-of-age ceremonies in other countries.',
      'Напишите, что вы исследовали церемонии совершеннолетия в других странах.',
    ),
    'The speaker researched coming-of-age ceremonies in other countries.',
    ['성년식에 대해'],
    ['n-e-daehae', 'coming-of-age-ceremony', 'type-answer'],
    ['다른 나라의 성년식에 대해서 조사했어요'],
  ),

  s5u9_463_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '다른 나라의 성년식에 대해 조사했습니다.',
        'Boshqa davlatlarning voyaga yetish marosimlari haqida tadqiqot qildim.',
        'I researched coming-of-age ceremonies in other countries.',
        'Я исследовал церемонии совершеннолетия в других странах.',
      ),
      [
        '조사했어요',
        '다른 나라의 성년식에 대해',
        '성년식을 위해',
        '성년식에서만',
        '한글날을 기념했어요',
        '국기를 달았어요',
      ],
      '다른 나라의 성년식에 대해 조사했어요',
      L(
        '기념일뿐 아니라 문화 행사도 N에 대해의 주제가 될 수 있어요.',
        'Faqat bayram emas, madaniy marosim ham N에 대해 mavzusi bo‘la oladi.',
        'Cultural ceremonies, not only commemorative days, can be topics with N에 대해.',
        'Темами с N에 대해 могут быть не только памятные дни, но и культурные церемонии.',
      ),
      ['n-e-daehae', 'coming-of-age-ceremony'],
    ),
  ),

  s5u9_464_fill_in_blank: grammarQuestion(
    fillBlank(
      '수업에서 여러 나라의 성년식___ 발표했어요.',
      ['에 대해서'],
      ['에 대해서', '을 위해서', '에서', '에게', '때문에'],
      L(
        '발표 주제가 성년식이므로 성년식에 대해서라고 해요.',
        'Taqdimot mavzusi 성년식 bo‘lgani uchun 성년식에 대해서 ishlatiladi.',
        'Because the presentation topic is coming-of-age ceremonies, use 성년식에 대해서.',
        'Поскольку тема презентации — церемонии совершеннолетия, используется 성년식에 대해서.',
      ),
      ['n-e-daehaeseo', 'coming-of-age-ceremony'],
    ),
  ),

  s5u9_465_word_arrange: grammarQuestion(
    wordArrange(
      [
        '발표했어요',
        '한국과 다른 나라의 성년식에 대해',
        '학생들이',
        '성년식을 위해',
        '수상 소감을 말하고',
        '묵념을 했어요',
      ],
      '학생들이 한국과 다른 나라의 성년식에 대해 발표했어요',
      L(
        '두 문화의 성년식을 하나의 비교 주제로 다뤄요.',
        'Ikki madaniyatdagi voyaga yetish marosimlari taqqoslash mavzusi bo‘ladi.',
        'The coming-of-age ceremonies of two cultures are treated as a comparative topic.',
        'Церемонии совершеннолетия двух культур рассматриваются как тема сравнения.',
      ),
      ['n-e-daehae', 'coming-of-age-ceremony'],
    ),
  ),

  s5u9_466_type_answer: topicTypeAnswer(
    '한국과 다른 나라의 성년식에 대해 발표했어요',
    L(
      '한국과 다른 나라의 성년식을 비교해서 발표했다고 쓰세요.',
      'Koreya va boshqa davlatlardagi voyaga yetish marosimlarini taqqoslab taqdimot qilganingizni yozing.',
      'Write that you gave a presentation about coming-of-age ceremonies in Korea and other countries.',
      'Напишите, что вы выступили с презентацией о церемониях совершеннолетия в Корее и других странах.',
    ),
    'The speaker presented on coming-of-age ceremonies in Korea and other countries.',
    ['성년식에 대해'],
    ['n-e-daehae', 'coming-of-age-ceremony', 'type-answer'],
    ['한국과 다른 나라의 성년식에 대해서 발표했어요'],
  ),

  s5u9_467_error_hunt: grammarQuestion(
    errorHunt(
      '한국의 성년식을 대해 자료를 찾았어요.',
      '성년식을',
      ['성년식에', '성년식이', '성년식과', '성년식부터'],
      '성년식에',
      L(
        '자료의 주제를 나타낼 때는 성년식에 대해라고 해요.',
        'Material mavzusini ko‘rsatishda 성년식에 대해 ishlatiladi.',
        'Use 성년식에 대해 when it is the topic of the material.',
        'Когда 성년식 является темой материала, используется 성년식에 대해.',
      ),
      ['n-e-daehae', 'particle'],
    ),
  ),

  s5u9_468_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '성년식의 의미와 문화적 차이에 대해 이야기했습니다.',
        'Voyaga yetish marosimining ma’nosi va madaniy farqlari haqida gaplashdik.',
        'We talked about the meaning of coming-of-age ceremonies and cultural differences.',
        'Мы поговорили о значении церемонии совершеннолетия и культурных различиях.',
      ),
      [
        '이야기했어요',
        '성년식의 의미와 문화적 차이에 대해',
        '성년식을 위해',
        '한국에서만',
        '수상자를 축하하고',
        '격려했어요',
      ],
      '성년식의 의미와 문화적 차이에 대해 이야기했어요',
      L(
        '문화 행사의 형태뿐 아니라 그 의미까지 설명해요.',
        'Madaniy marosimning shakli bilan birga uning ma’nosi ham tushuntiriladi.',
        'Discuss not only the form of a cultural ceremony but also its meaning.',
        'Обсуждаем не только форму культурной церемонии, но и её значение.',
      ),
      ['n-e-daehae', 'coming-of-age-ceremony'],
    ),
  ),

  s5u9_469_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한 사람이 큰 대회에서 상을 받았습니다. 기사에는 그 사람이 어떤 사람인지, 어떤 일을 했는지와 상을 받은 뒤 무엇이라고 말했는지가 소개되어 있습니다.',
      [
        '수상자와 수상 소감에 대해 소개하고 있어요.',
        '수상자를 위해 한글날을 설명하고 있어요.',
        '수상자에게서 식목일을 배우고 있어요.',
        '수상 소감 때문에 기념식이 취소됐어요.',
      ],
      '수상자와 수상 소감에 대해 소개하고 있어요.',
      L(
        '기사의 두 주요 주제는 수상자와 수상 소감이에요.',
        'Maqolaning ikki asosiy mavzusi mukofot oluvchi va uning nutqi.',
        'The two main topics are the award recipient and the acceptance remarks.',
        'Две основные темы — лауреат и его речь при получении награды.',
      ),
      ['n-e-daehae', 'award-recipient', 'award-acceptance-remarks'],
    ),
  ),

  s5u9_470_fill_in_blank: grammarQuestion(
    fillBlank(
      '기사에서 수상자와 수상 소감___ 읽었어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에서', '에게', '때문에'],
      L(
        '읽은 기사의 주제를 N에 대해로 나타내요.',
        'O‘qilgan maqola mavzusi N에 대해 bilan ifodalanadi.',
        'N에 대해 identifies the subject of the article.',
        'N에 대해 обозначает тему статьи.',
      ),
      ['n-e-daehae', 'award-recipient'],
    ),
  ),

  s5u9_471_type_answer: topicTypeAnswer(
    '수상자와 수상 소감에 대해 읽었어요',
    L(
      '상을 받은 사람과 그 사람의 수상 소감을 다룬 글을 읽었다고 쓰세요.',
      'Mukofot olgan odam va uning nutqi haqida matn o‘qiganingizni yozing.',
      'Write that you read about an award recipient and their acceptance remarks.',
      'Напишите, что вы читали о лауреате и его речи.',
    ),
    'The speaker read about the award recipient and the acceptance remarks.',
    ['수상자와 수상 소감에 대해'],
    ['n-e-daehae', 'award-recipient', 'type-answer'],
    ['수상자와 수상 소감에 대해서 읽었어요'],
  ),

  s5u9_472_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '수상자의 수상 소감에 대해 친구와 이야기했습니다.',
        'G‘olibning mukofot nutqi haqida do‘stim bilan gaplashdim.',
        'I talked with my friend about the award recipient’s acceptance remarks.',
        'Я поговорил с другом о речи лауреата.',
      ),
      [
        '친구와 이야기했어요',
        '수상자의 수상 소감에 대해',
        '수상자를 위해',
        '상을 받기 위해',
        '성년식에서',
        '기념식을 했어요',
      ],
      '수상자의 수상 소감에 대해 친구와 이야기했어요',
      L(
        '사람 자체가 아니라 그 사람이 한 말도 하나의 주제가 될 수 있어요.',
        'Faqat odam emas, uning aytgan so‘zlari ham mavzu bo‘lishi mumkin.',
        'Not only a person but also what that person said can become a topic.',
        'Темами могут быть не только люди, но и сказанное ими.',
      ),
      ['n-e-daehae', 'award-acceptance-remarks'],
    ),
  ),

  s5u9_473_cloze_passage: grammarQuestion(
    clozePassage(
      '학생들은 다른 나라의 ___에 대해 조사하고, 기사에서는 ___와 수상 소감에 대해서 읽었어요.',
      ['성년식', '수상자'],
      ['수상자', '성년식', '한자', '공휴일', '묵념'],
      L(
        '문화 행사와 사람에 관한 서로 다른 주제를 에 대해로 연결해요.',
        'Madaniy marosim va shaxs haqidagi turli mavzular 에 대해 bilan bog‘lanadi.',
        'Connect two different kinds of topics using 에 대해.',
        'Связываем две разные темы с помощью 에 대해.',
      ),
      ['n-e-daehae', 'unit-vocabulary'],
    ),
  ),

  s5u9_474_word_arrange: grammarQuestion(
    wordArrange(
      [
        '이야기했어요',
        '수상 소감에 대해',
        '친구들과',
        '수상자를 위해',
        '상을 받기 위해',
        '국기를 달았어요',
      ],
      '친구들과 수상 소감에 대해 이야기했어요',
      L(
        '수상 소감의 내용과 느낌이 대화 주제가 돼요.',
        'Mukofot nutqining mazmuni va hissiyoti suhbat mavzusi bo‘ladi.',
        'The content and impression of the acceptance remarks become the discussion topic.',
        'Содержание и впечатление от речи лауреата становятся темой разговора.',
      ),
      ['n-e-daehae', 'award-acceptance-remarks'],
    ),
  ),

  s5u9_475_type_answer: topicTypeAnswer(
    '수상 소감에 대해 이야기했어요',
    L(
      '상을 받은 사람이 한 말과 감사 표현을 주제로 이야기했다고 쓰세요.',
      'G‘olibning aytgan so‘zlari va minnatdorchiligi haqida gaplashganingizni yozing.',
      'Write that you talked about the award acceptance remarks.',
      'Напишите, что вы говорили о речи при получении награды.',
    ),
    'The speaker talked about the award acceptance remarks.',
    ['수상 소감에 대해'],
    ['n-e-daehae', 'award-acceptance-remarks', 'type-answer'],
    ['수상 소감에 대해서 이야기했어요'],
  ),

  s5u9_476_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '친구가 시험에서 떨어져 많이 속상해합니다. 수업에서는 이런 사람에게 어떤 말을 하면 좋은지, 위로와 격려가 어떻게 다른지 생각해 봤습니다.',
      [
        '위로와 격려에 대해 이야기했어요.',
        '위로와 격려를 위해 시험을 봤어요.',
        '위로와 격려에서 상을 받았어요.',
        '위로와 격려 때문에 기념식을 했어요.',
      ],
      '위로와 격려에 대해 이야기했어요.',
      L(
        '위로와 격려 자체가 토론 주제예요.',
        'Tasalli va dalda mavzuning o‘zi.',
        'Consolation and encouragement themselves are the discussion topic.',
        'Утешение и поддержка сами являются темой обсуждения.',
      ),
      ['n-e-daehae', 'consolation', 'encouragement'],
    ),
  ),

  s5u9_477_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '위로와 격려의 차이에 대해 이야기했습니다.',
        'Tasalli va dalda o‘rtasidagi farq haqida gaplashdik.',
        'We talked about the difference between consolation and encouragement.',
        'Мы поговорили о разнице между утешением и поддержкой.',
      ),
      [
        '이야기했어요',
        '위로와 격려의 차이에 대해',
        '친구를 위해',
        '위로하기 위해',
        '수상 소감에서',
        '성년식을 열었어요',
      ],
      '위로와 격려의 차이에 대해 이야기했어요',
      L(
        '비슷한 어휘의 차이를 설명하는 데도 N에 대해를 사용할 수 있어요.',
        'O‘xshash so‘zlar farqini tushuntirishda ham N에 대해 ishlatiladi.',
        'N에 대해 can also be used when discussing differences between similar concepts.',
        'N에 대해 можно использовать и при обсуждении различий между близкими понятиями.',
      ),
      ['n-e-daehae', 'consolation', 'encouragement'],
    ),
  ),

  s5u9_478_fill_in_blank: grammarQuestion(
    fillBlank(
      '수업에서 위로와 격려의 차이___ 토론했어요.',
      ['에 대해서'],
      ['에 대해서', '을 위해서', '에게서', '에서', '때문에'],
      L(
        '토론의 주제를 N에 대해서로 표현해요.',
        'Munozara mavzusi N에 대해서 bilan ifodalanadi.',
        'Use N에 대해서 for the topic of a discussion.',
        'N에 대해서 используется для обозначения темы обсуждения.',
      ),
      ['n-e-daehaeseo', 'discussion'],
    ),
  ),

  s5u9_479_error_hunt: grammarQuestion(
    errorHunt(
      '수상 소감을 대해서 친구와 이야기했어요.',
      '소감을',
      ['소감에', '소감이', '소감과', '소감부터'],
      '소감에',
      L(
        '대해서 앞의 주제 명사에는 에가 필요해요.',
        '대해서 oldidan mavzu otiga 에 kerak.',
        'The topic noun before 대해서 requires 에.',
        'Перед 대해서 существительное-тема требует 에.',
      ),
      ['n-e-daehaeseo', 'particle'],
    ),
  ),

  s5u9_480_word_arrange: grammarQuestion(
    wordArrange(
      [
        '비교해 봤어요',
        '성년식과 기념일에 대해',
        '문화마다 어떻게 다른지',
        '수상자를 위해',
        '상을 받기 위해',
        '한글날에서',
      ],
      '성년식과 기념일에 대해 문화마다 어떻게 다른지 비교해 봤어요',
      L(
        'Node 1에서 배운 기념일과 새로 배운 문화 행사를 함께 비교해요.',
        'Node 1dagi bayramlar va yangi madaniy marosimlar birga taqqoslanadi.',
        'Compare earlier commemorative-day vocabulary with newly learned cultural ceremonies.',
        'Сравниваем памятные дни из предыдущих уроков с новой лексикой культурных церемоний.',
      ),
      ['n-e-daehae', 'lesson-review'],
    ),
  ),

  // ──────────────────────────────────────────────────────────
  // Lesson 5 · 한글날에 대해 설명할 수 있어요
  // Unit 9 전체 통합
  // ──────────────────────────────────────────────────────────

  s5u9_481_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날은 10월 9일입니다. 한글의 창제와 반포를 기념하는 날입니다. 한글은 세종대왕에 의해 만들어졌고, 오늘날에는 한글의 역사와 가치에 관심을 가지는 사람도 점점 많아지고 있습니다.',
      [
        '한글날과 한글의 역사에 대해 설명하는 글이에요.',
        '식목일에 나무를 심는 방법만 설명하는 글이에요.',
        '교통사고의 원인을 설명하는 글이에요.',
        '수리 센터 이용 방법을 설명하는 글이에요.',
      ],
      '한글날과 한글의 역사에 대해 설명하는 글이에요.',
      L(
        '날짜, 기념 이유, 역사와 현재의 관심을 함께 담은 한글날 설명이에요.',
        'Matnda sana, sabab, tarix va bugungi qiziqish birga berilgan.',
        'The passage combines the date, reason for commemoration, history, and current interest in Hangeul.',
        'Текст объединяет дату, причину празднования, историю и современный интерес к хангылю.',
      ),
      ['n-e-daehae', 'hangeul-day', 'unit-review'],
    ),
  ),

  s5u9_484_fill_in_blank: grammarQuestion(
    fillBlank(
      '외국인 친구에게 한글날의 의미___ 설명했어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에게', '에서', '때문에'],
      L(
        '친구에게는 듣는 사람이고 한글날의 의미에 대해서는 설명 주제예요.',
        '친구에게 tinglovchini, 한글날의 의미에 대해 esa mavzuni bildiradi.',
        '친구에게 marks the listener, while 한글날의 의미에 대해 marks the topic.',
        '친구에게 обозначает слушателя, а 한글날의 의미에 대해 — тему объяснения.',
      ),
      ['n-e-daehae', 'form'],
    ),
  ),

  s5u9_485_word_arrange: grammarQuestion(
    wordArrange(
      [
        '외국인 친구에게',
        '한글날에 대해',
        '10월 9일이라는 날짜와',
        '의미를',
        '설명했어요',
        '한글날을 위해',
        '국기를 달았어요',
      ],
      '외국인 친구에게 한글날에 대해 10월 9일이라는 날짜와 의미를 설명했어요',
      L(
        '실제 소개 상황처럼 듣는 사람, 주제, 날짜와 의미를 한 문장에 연결해요.',
        'Haqiqiy tanishtirish kabi tinglovchi, mavzu, sana va ma’noni bir gapda bog‘laymiz.',
        'Connect the listener, topic, date, and meaning in one realistic explanation.',
        'Соединяем слушателя, тему, дату и значение в одном естественном объяснении.',
      ),
      ['n-e-daehae', 'hangeul-day'],
    ),
  ),

  s5u9_486_type_answer: topicTypeAnswer(
    '친구에게 한글의 역사에 대해 설명했어요',
    L(
      '친구에게 한글이 어떻게 만들어졌는지 설명했다고 쓰세요.',
      'Do‘stingizga Hangul qanday yaratilganini tushuntirganingizni yozing.',
      'Write that you explained the history of Hangeul to your friend.',
      'Напишите, что вы объяснили другу историю хангыля.',
    ),
    'The speaker explained the history of Hangeul to a friend.',
    ['한글의 역사에 대해'],
    ['n-e-daehae', 'hangeul', 'type-answer'],
    ['친구에게 한글의 역사에 대해서 설명했어요'],
  ),

  s5u9_487_error_hunt: grammarQuestion(
    errorHunt(
      '친구에게 한글의 역사를 대해 설명했어요.',
      '역사를',
      ['역사에', '역사가', '역사와', '역사부터'],
      '역사에',
      L(
        '설명 주제는 한글의 역사에 대해라고 표현해요.',
        'Tushuntirish mavzusi 한글의 역사에 대해 shaklida keladi.',
        'The topic should be expressed as 한글의 역사에 대해.',
        'Тема должна оформляться как 한글의 역사에 대해.',
      ),
      ['n-e-daehae', 'particle'],
    ),
  ),

  s5u9_488_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글은 세종대왕에 의해 만들어졌다고 한글의 역사에 대해 설명했습니다.',
        'Hangul qirol Sejong tomonidan yaratilganini Hangul tarixi haqida tushuntirdim.',
        'While explaining the history of Hangeul, I said that Hangeul was created by King Sejong.',
        'Рассказывая об истории хангыля, я объяснил, что хангыль был создан королём Седжоном.',
      ),
      [
        '설명했어요',
        '한글의 역사에 대해',
        '한글은 세종대왕에 의해 만들어졌다고',
        '한글을 만들기 위해',
        '세종대왕을 위해',
        '기념식이 이루어졌어요',
      ],
      '한글의 역사에 대해 한글은 세종대왕에 의해 만들어졌다고 설명했어요',
      L(
        'Node 3의 피동 표현과 이번 N에 대해를 함께 회수해요.',
        'Node 3dagi majhul shakl va N에 대해 birga takrorlanadi.',
        'This retrieves both the passive grammar from Node 3 and N에 대해.',
        'Здесь вместе повторяются пассив из Node 3 и N에 대해.',
      ),
      ['n-e-daehae', 'v-a-eojida', 'integration'],
    ),
  ),

  s5u9_489_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '학생들이 한글날 발표를 준비했습니다. 한글의 가치를 알리기 위해 자료를 조사했고, 비가 오는데도 불구하고 많은 사람이 행사에 참석했습니다.',
      [
        '한글날에 대한 목적과 행사 상황을 여러 문법으로 설명하고 있어요.',
        '한글날의 날짜만 외우는 내용이에요.',
        '한글과 관계없는 교통사고 이야기예요.',
        '수리 방법만 설명하는 글이에요.',
      ],
      '한글날에 대한 목적과 행사 상황을 여러 문법으로 설명하고 있어요.',
      L(
        'Node 2의 목적 표현과 Node 4의 대조 표현이 실제 한글날 상황 안에서 함께 사용됐어요.',
        'Node 2dagi maqsad va Node 4dagi qarama-qarshilik Hangul kuni vaziyatida birga ishlatilgan.',
        'The purpose grammar from Node 2 and contrast grammar from Node 4 are combined in a Hangeul Day context.',
        'Выражение цели из Node 2 и противопоставление из Node 4 объединены в ситуации Дня хангыля.',
      ),
      ['unit-9', 'integration'],
    ),
  ),

  s5u9_490_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글의 가치를 알리기 위해 어떤 행사를 하는지 한글날___ 조사했어요.',
      ['에 대해서'],
      ['에 대해서', '을 위해서', '에서부터', '에게서', '때문에'],
      L(
        '조사 전체의 주제가 한글날이므로 한글날에 대해서라고 해요.',
        'Tadqiqotning umumiy mavzusi Hangul kuni bo‘lgani uchun 한글날에 대해서 ishlatiladi.',
        'Because the overall research topic is Hangeul Day, use 한글날에 대해서.',
        'Поскольку общей темой исследования является День хангыля, используется 한글날에 대해서.',
      ),
      ['n-e-daehaeseo', 'hangeul-day'],
    ),
  ),

  s5u9_491_type_answer: topicTypeAnswer(
    '한글날에 대해서 조사해서 발표했어요',
    L(
      '한글날을 조사한 뒤 그 내용을 발표했다고 N에 대해서를 사용해서 쓰세요.',
      'Hangul kuni haqida tadqiqot qilib, keyin taqdimot qilganingizni N에 대해서 bilan yozing.',
      'Using N에 대해서, write that you researched Hangeul Day and gave a presentation.',
      'Используя N에 대해서, напишите, что вы исследовали День хангыля и сделали презентацию.',
    ),
    'The speaker researched Hangeul Day and then gave a presentation.',
    ['한글날에 대해서'],
    ['n-e-daehaeseo', 'hangeul-day', 'type-answer'],
    ['한글날에 대해 조사해서 발표했어요'],
  ),

  s5u9_492_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날에 대해서 조사한 뒤 친구들에게 발표했습니다.',
        'Hangul kuni haqida tadqiqot qilgandan keyin do‘stlarimga taqdimot qildim.',
        'After researching Hangeul Day, I presented it to my friends.',
        'После исследования Дня хангыля я рассказал о нём друзьям.',
      ),
      [
        '친구들에게 발표했어요',
        '한글날에 대해서 조사한 뒤',
        '한글날을 위해',
        '기념식을 열기 위해',
        '공휴일인데도',
        '나무를 심었어요',
      ],
      '한글날에 대해서 조사한 뒤 친구들에게 발표했어요',
      L(
        '정보를 찾아보는 단계에서 다른 사람에게 설명하는 단계까지 연결해요.',
        'Ma’lumot topishdan boshqalarga tushuntirishgacha bo‘lgan jarayon bog‘lanadi.',
        'Connect research with the later step of presenting information to others.',
        'Связываем исследование с последующим объяснением информации другим.',
      ),
      ['n-e-daehaeseo', 'hangeul-day'],
    ),
  ),

  s5u9_493_cloze_passage: grammarQuestion(
    clozePassage(
      '한글날___ 조사하면서 한글의 창제와 반포___ 배웠고, 한글의 가치___ 친구들과 이야기했어요.',
      ['에 대해', '에 대해서', '에 대해'],
      ['에 대해', '에 대해서', '에 대해', '을 위해', '에서', '때문에'],
      L(
        '한글날이라는 큰 주제 안에서 역사와 가치라는 세부 주제를 이어서 다뤄요.',
        'Hangul kuni umumiy mavzusi ichida tarix va qadriyat kabi kichik mavzular bog‘lanadi.',
        'Within Hangeul Day as a broad topic, connect subtopics such as history and value.',
        'В рамках общей темы Дня хангыля связываем подтемы истории и ценности.',
      ),
      ['n-e-daehae', 'integration'],
    ),
  ),

  s5u9_494_word_arrange: grammarQuestion(
    wordArrange(
      [
        '설명했어요',
        '한글날에 대해',
        '한글의 창제와 반포를 기념하기 위한 날이라고',
        '한글날을 위해서만',
        '공휴일인데도',
        '국기를 달았다고',
      ],
      '한글날에 대해 한글의 창제와 반포를 기념하기 위한 날이라고 설명했어요',
      L(
        'Node 2의 목적 표현을 사용해 한글날이 무엇을 위한 날인지 설명해요.',
        'Node 2dagi maqsad shakli bilan Hangul kuni nimani nishonlash uchun ekanini tushuntiramiz.',
        'Use the purpose grammar from Node 2 to explain what Hangeul Day commemorates.',
        'Используем грамматику цели из Node 2, чтобы объяснить назначение Дня хангыля.',
      ),
      ['n-e-daehae', 'gi-wihae', 'integration'],
    ),
  ),

  s5u9_495_type_answer: topicTypeAnswer(
    '한글날에 대해 한글의 창제와 반포를 기념하는 날이라고 설명했어요',
    L(
      '한글날을 소개하면서 한글의 창제와 반포를 기념하는 날이라고 설명하세요.',
      'Hangul kunini tanishtirib, Hangulning yaratilishi va e’lon qilinishini nishonlaydigan kun ekanini yozing.',
      'Explain that Hangeul Day commemorates the creation and promulgation of Hangeul.',
      'Объясните, что День хангыля посвящён созданию и обнародованию хангыля.',
    ),
    'The speaker explains that Hangeul Day commemorates the creation and promulgation of Hangeul.',
    ['한글날에 대해'],
    ['n-e-daehae', 'hangeul-day', 'type-answer'],
    ['한글날에 대해서 한글의 창제와 반포를 기념하는 날이라고 설명했어요'],
  ),

  s5u9_497_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날에 대해 조사하면서 한글은 세종대왕에 의해 만들어졌다는 것도 배웠습니다.',
        'Hangul kuni haqida o‘rganar ekanman, Hangul qirol Sejong tomonidan yaratilganini ham bildim.',
        'While researching Hangeul Day, I also learned that Hangeul was created by King Sejong.',
        'Исследуя День хангыля, я также узнал, что хангыль был создан королём Седжоном.',
      ),
      [
        '배웠어요',
        '한글은 세종대왕에 의해 만들어졌다는 것도',
        '한글날에 대해 조사하면서',
        '한글날을 위해',
        '세종대왕이 공휴일인데도',
        '기념식을 열기 위해',
      ],
      '한글날에 대해 조사하면서 한글은 세종대왕에 의해 만들어졌다는 것도 배웠어요',
      L(
        '주제 표현과 피동 표현을 실제 학습 문맥 안에서 통합해요.',
        'Mavzu va majhul shakl haqiqiy o‘rganish vaziyatida birlashtiriladi.',
        'Integrate the topic expression and passive grammar in a realistic learning context.',
        'Объединяем выражение темы и пассив в реальном учебном контексте.',
      ),
      ['n-e-daehae', 'v-a-eojida', 'integration'],
    ),
  ),

  s5u9_498_fill_in_blank: grammarQuestion(
    fillBlank(
      '한글날___ 조사하면서 한글의 역사와 의미를 함께 배웠어요.',
      ['에 대해'],
      ['에 대해', '을 위해', '에서', '에게', '때문에'],
      L(
        '조사하는 주제는 한글날이므로 한글날에 대해라고 해요.',
        'Tadqiqot mavzusi Hangul kuni bo‘lgani uchun 한글날에 대해 ishlatiladi.',
        'The research topic is Hangeul Day, so use 한글날에 대해.',
        'Темой исследования является День хангыля, поэтому используется 한글날에 대해.',
      ),
      ['n-e-daehae', 'form'],
    ),
  ),

  s5u9_499_error_hunt: grammarQuestion(
    errorHunt(
      '한글날을 대해 조사한 뒤 발표했어요.',
      '한글날을',
      ['한글날에', '한글날이', '한글날과', '한글날부터'],
      '한글날에',
      L(
        'Node 마지막까지 N에 대해에서 사용하는 조사는 에라는 점을 확인해요.',
        'Node oxirida ham N에 대해 bilan 에 ishlatilishini tekshiramiz.',
        'Confirm that N에 대해 uses the particle 에.',
        'В конце Node ещё раз закрепляем, что в N에 대해 используется частица 에.',
      ),
      ['n-e-daehae', 'conjugation'],
    ),
  ),
  s5u9_020_word_arrange: wordArrange(
    [
      '부모님께 감사하고',
      '어버이날에는',
      '선생님께 감사해요',
      '스승의 날에는',
      '국기를 달아요',
      '나무를 심어요',
    ],
    '어버이날에는 부모님께 감사하고 스승의 날에는 선생님께 감사해요',
    L(
      '두 기념일은 모두 감사와 관련 있지만 감사하는 대상이 달라요.',
      'Ikkala kun ham minnatdorchilik bilan bog‘liq, lekin kimga minnatdorchilik bildirilishi farq qiladi.',
      'Both days involve gratitude, but the person being thanked is different.',
      'Оба дня связаны с благодарностью, но благодарят разных людей.',
    ),
    ['parents-day', 'teachers-day'],
  ),
  s5u9_040_word_arrange: wordArrange(
    [
      '독립운동을 기억하고',
      '삼일절에는',
      '광복을 기념해요',
      '광복절에는',
      '나무를 심고',
      '선생님께 감사해요',
    ],
    '삼일절에는 독립운동을 기억하고 광복절에는 광복을 기념해요',
    L(
      '삼일절과 광복절이 각각 어떤 역사적 의미를 가진 날인지 구별해요.',
      '1-mart kuni va Ozodlik kunining tarixiy ma’nosini farqlaymiz.',
      'Distinguish what March First Movement Day and Liberation Day commemorate.',
      'Различаем историческое значение Дня движения 1 марта и Дня освобождения.',
    ),
    ['march-first-movement-day', 'liberation-day-korea'],
  ),

  s5u9_060_word_arrange: wordArrange(
    [
      '나무를 심고',
      '식목일에는',
      '묵념을 하기도 해요',
      '현충일에는',
      '불꽃놀이만 하고',
      '꽃을 달아요',
    ],
    '식목일에는 나무를 심고 현충일에는 묵념을 하기도 해요',
    L(
      '기념일의 의미에 따라 대표 행동도 달라져요.',
      'Esdalik kunining ma’nosiga qarab odatiy harakat ham farq qiladi.',
      'Typical activities differ depending on the meaning of the commemorative day.',
      'Характерные действия различаются в зависимости от смысла памятного дня.',
    ),
    ['arbor-day', 'memorial-day-korea'],
  ),

  s5u9_074_word_arrange: wordArrange(
    [
      '국기를 달기도 하고',
      '광복절에는',
      '묵념을 해요',
      '현충일에는',
      '나무를 심어요',
      '부모님께 꽃을 드려요',
    ],
    '광복절에는 국기를 달기도 하고 현충일에는 묵념을 해요',
    L(
      '광복절과 현충일의 대표적인 기념 행동을 구별해요.',
      'Ozodlik kuni va Xotira kunidagi odatiy harakatlarni farqlaymiz.',
      'Distinguish typical activities on Liberation Day and Memorial Day.',
      'Различаем характерные действия в День освобождения и День памяти.',
    ),
    ['liberation-day-korea', 'memorial-day-korea'],
  ),

  s5u9_080_word_arrange: wordArrange(
    [
      '국기를 달아요',
      '광복절에는',
      '나라를 위해 희생한 사람들을 기억하며',
      '현충일에는',
      '나무를 심어요',
      '어린이에게 선물을 줘요',
    ],
    '광복절에는 국기를 달고 현충일에는 나라를 위해 희생한 사람들을 기억해요',
    L(
      '두 국가 기념일의 의미와 대표 행동을 함께 확인해요.',
      'Ikki davlat esdalik kunining ma’nosi va odatiy harakatlarini birga ko‘ramiz.',
      'Review the meanings and representative activities of two national commemorative days.',
      'Повторяем значение и характерные действия двух государственных памятных дней.',
    ),
    ['liberation-day-korea', 'memorial-day-korea'],
  ),
  s5u9_053_cloze_passage: clozePassage(
    '식목일에는 ___, 광복절에는 집이나 거리에 ___.',
    ['나무를 심어요', '국기를 달아요'],
    [
      '나무를 심어요',
      '국기를 달아요',
      '묵념을 해요',
      '꽃을 달아요',
      '행진을 해요',
    ],
    L(
      '각 기념일의 대표 행동을 완성된 표현으로 익혀요.',
      'Har bir esdalik kunining odatiy harakatini to‘liq ibora bilan o‘rganamiz.',
      'Learn the representative activities as complete expressions.',
      'Учимся характерным действиям каждого памятного дня в полной форме.',
    ),
    ['arbor-day', 'liberation-day-korea'],
  ),

  s5u9_059_cloze_passage: clozePassage(
    '기념일에는 공식적인 ___을 하거나, 집에 ___, 거리에서 ___을 하기도 해요.',
    ['기념식', '국기를 달거나', '행진'],
    ['기념식', '국기를 달거나', '행진', '묵념', '나무', '공휴일'],
    L(
      '기념일에 볼 수 있는 여러 행동을 실제 문장 안에서 연결해요.',
      'Esdalik kunlaridagi turli harakatlarni haqiqiy gapda bog‘laymiz.',
      'Connect several activities associated with commemorative days in a real sentence.',
      'Связываем разные действия, связанные с памятными днями, в естественном предложении.',
    ),
    ['commemorative-day', 'activities'],
  ),

  s5u9_079_cloze_passage: clozePassage(
    '사람들은 행사에 참여하고 ___ 감사의 마음을 전했어요.',
    ['진심으로'],
    ['진심으로', '곳곳에', '공휴일에', '기념식으로', '행진으로'],
    L(
      '진심으로는 마음에서 우러난 태도로 행동한다는 뜻이에요.',
      '진심으로 chin dildan, samimiy tarzda degan ma’noni bildiradi.',
      '진심으로 means sincerely or from the heart.',
      '진심으로 означает искренне, от всего сердца.',
    ),
    ['sincerely'],
  ),
  s5u9_087_reading_quiz: grammarReadingQuiz(
    '외국인 친구에게 한글날을 처음 소개하려고 합니다.',
    [
      '언제이고 무엇을 기념하는 날인지 먼저 설명해요.',
      '공휴일인지 아닌지만 말해요.',
      '기념식이 몇 시에 끝나는지만 말해요.',
      '행사가 어느 건물에서 열리는지만 말해요.',
    ],
    '언제이고 무엇을 기념하는 날인지 먼저 설명해요.',
    L(
      '기념일을 소개할 때 날짜와 기념 의미는 가장 기본적인 정보예요.',
      'Esdalik kunini tanishtirishda sana va ma’no asosiy ma’lumotdir.',
      'The date and what the day commemorates are basic information when introducing a commemorative day.',
      'При знакомстве с памятным днём основная информация — дата и то, чему он посвящён.',
    ),
    ['hangeul-day', 'reading'],
  ),

  s5u9_088_translate_builder: translateBuilder(
    L(
      '한글날은 10월 9일입니다.',
      'Hangul kuni 9-oktabr.',
      'Hangeul Day is October 9.',
      'День хангыля — 9 октября.',
    ),
    [
      '10월 9일이에요',
      '한글날은',
      '10월 3일이에요',
      '8월 15일이에요',
      '3월 1일이에요',
    ],
    '한글날은 10월 9일이에요',
    L(
      '한글날의 날짜는 10월 9일이에요.',
      'Hangul kuni 9-oktabrda.',
      'Hangeul Day is on October 9.',
      'День хангыля отмечается 9 октября.',
    ),
    ['hangeul-day', 'date'],
  ),

  s5u9_091_translate_builder: translateBuilder(
    L(
      '한글날에 공식적인 기념식을 열었습니다.',
      'Hangul kunida rasmiy marosim o‘tkazildi.',
      'An official commemorative ceremony was held on Hangeul Day.',
      'В День хангыля провели официальную памятную церемонию.',
    ),
    [
      '공식적인 기념식을 열었어요',
      '한글날에',
      '국기를 달았어요',
      '거리 행진을 했어요',
      '한글 관련 행사를 열었어요',
    ],
    '한글날에 공식적인 기념식을 열었어요',
    L(
      '한글날에는 한글과 관련된 기념 행사가 열리기도 해요.',
      'Hangul kunida Hangulga oid esdalik tadbirlari o‘tkazilishi mumkin.',
      'Commemorative events related to Hangeul may be held on Hangeul Day.',
      'В День хангыля могут проводиться памятные мероприятия, связанные с хангылем.',
    ),
    ['hangeul-day', 'hold-commemorative-ceremony'],
  ),

  s5u9_094_reading_quiz: grammarReadingQuiz(
    '한글날에는 한글의 의미와 가치를 알리는 여러 행사가 열리기도 합니다.',
    [
      '한글과 관련된 기념 행사가 열리기도 해요.',
      '사람들이 기념식에 참여하기도 해요.',
      '한글 관련 전시나 행사가 열리기도 해요.',
      '모든 가정에서 반드시 나무를 심어요.',
    ],
    '한글과 관련된 기념 행사가 열리기도 해요.',
    L(
      '본문은 한글날에 열리는 한글 관련 행사를 설명하고 있어요.',
      'Matnda Hangul kunidagi Hangulga oid tadbirlar tushuntirilgan.',
      'The passage describes Hangeul-related events held on Hangeul Day.',
      'В тексте говорится о мероприятиях, связанных с хангылем, в День хангыля.',
    ),
    ['hangeul-day', 'reading'],
  ),
  s5u9_099_cloze_passage: clozePassage(
    '한글날은 ___이고, 한글의 창제와 반포를 ___ 날이에요.',
    ['10월 9일', '기념하는'],
    ['10월 9일', '10월 3일', '기념하는', '심는', '묵념하는'],
    L(
      '한글날의 날짜와 핵심 의미를 함께 확인해요.',
      'Hangul kunining sanasi va asosiy ma’nosini birga tekshiramiz.',
      'Review both the date and core meaning of Hangeul Day.',
      'Повторяем дату и основное значение Дня хангыля.',
    ),
    ['hangeul-day', 'review'],
  ),

  s5u9_100_word_arrange: wordArrange(
    [
      '10월 9일이고',
      '한글날은',
      '한글의 창제와 반포를 기념하는 날이에요',
      '나무를 심는 날이고',
      '광복을 기념하는 날이에요',
      '3월 1일이에요',
    ],
    '한글날은 10월 9일이고 한글의 창제와 반포를 기념하는 날이에요',
    L(
      'Node 1 마지막에는 한글날의 날짜와 의미를 실제 문장으로 설명해요.',
      'Node 1 oxirida Hangul kunining sanasi va ma’nosini haqiqiy gapda tushuntiramiz.',
      'End Node 1 by giving the actual date and meaning of Hangeul Day.',
      'В конце Node 1 объясняем реальную дату и значение Дня хангыля.',
    ),
    ['hangeul-day', 'node-review'],
  ),
  s5u9_120_word_arrange: grammarQuestion(
    wordArrange(
      [
        '행사를 준비했어요',
        '지역 주민들을 위해',
        '공원에서',
        '지역 주민들에게서',
        '행사를 취소했어요',
        '국기를 내렸어요',
      ],
      '공원에서 지역 주민들을 위해 행사를 준비했어요',
      L(
        '행동의 혜택을 받는 사람을 N을/를 위해로 표현해요.',
        'Harakat foydasini oladigan odam N을/를 위해 bilan ifodalanadi.',
        'Use N을/를 위해 for the people who benefit from the action.',
        'Используем N을/를 위해 для тех, ради кого совершается действие.',
      ),
      ['n-eul-reul-wihae', 'beneficiary'],
    ),
  ),

  s5u9_140_word_arrange: grammarQuestion(
    wordArrange(
      [
        '묵념을 했어요',
        '희생한 사람들을 기억하기 위해',
        '현충일에',
        '불꽃놀이를 하기 위해',
        '나무를 심었어요',
        '선물을 준비했어요',
      ],
      '현충일에 희생한 사람들을 기억하기 위해 묵념을 했어요',
      L(
        '현충일의 대표 행동과 그 목적을 연결해요.',
        'Xotira kunidagi odatiy harakat va uning maqsadini bog‘laymiz.',
        'Connect a typical Memorial Day action with its purpose.',
        'Связываем характерное действие в День памяти с его целью.',
      ),
      ['v-gi-wihae', 'memorial-day-korea'],
    ),
  ),

  s5u9_160_word_arrange: grammarQuestion(
    wordArrange(
      [
        '식목일 행사를 열었어요',
        '자연의 중요성을 알리기 위해',
        '학교에서',
        '국기를 달기 위해',
        '묵념을 했어요',
        '선물을 준비했어요',
      ],
      '학교에서 자연의 중요성을 알리기 위해 식목일 행사를 열었어요',
      L(
        '식목일 행사를 연 구체적인 목적을 표현해요.',
        'Daraxt ekish kuni tadbirining aniq maqsadini ifodalaymiz.',
        'Express the specific purpose of holding an Arbor Day event.',
        'Выражаем конкретную цель проведения мероприятия ко Дню посадки деревьев.',
      ),
      ['v-gi-wihae', 'arbor-day'],
    ),
  ),

  s5u9_180_word_arrange: grammarQuestion(
    wordArrange(
      [
        '선물을 준비했어요',
        '부모님을 위해',
        '어버이날에',
        '부모님께 감사하기 위해',
        '나무를 심었어요',
        '국기를 달았어요',
      ],
      '어버이날에 부모님을 위해 선물을 준비했어요',
      L(
        '어버이날에는 부모님이라는 대상을 위해 행동할 수 있어요.',
        'Ota-onalar kunida harakat ota-onalar uchun qilinadi.',
        'On Parents’ Day, an action can be done for the parents as the beneficiary.',
        'В День родителей действие может совершаться ради родителей.',
      ),
      ['n-eul-reul-wihae', 'parents-day'],
    ),
  ),

  s5u9_200_word_arrange: grammarQuestion(
    wordArrange(
      [
        '기념식을 열었어요',
        '한글의 가치를 알리기 위해',
        '한글날에',
        '한글을 잊기 위해',
        '행사를 취소했어요',
        '나무를 심었어요',
      ],
      '한글날에 한글의 가치를 알리기 위해 기념식을 열었어요',
      L(
        'Node 마지막에는 한글날의 실제 목적과 행동을 한 문장으로 연결해요.',
        'Node oxirida Hangul kunidagi haqiqiy maqsad va harakatni bir gapda bog‘laymiz.',
        'End the node by connecting a real Hangeul Day purpose with an action.',
        'В конце Node связываем реальную цель Дня хангыля с действием.',
      ),
      ['v-gi-wihae', 'hangeul-day', 'node-review'],
    ),
  ),
  s5u9_482_type_answer: topicTypeAnswer(
    '친구에게 한글날의 역사와 의미에 대해 설명했어요',
    L(
      '친구에게 한글날의 역사와 의미를 설명했다고 N에 대해를 사용해서 쓰세요.',
      'Do‘stingizga Hangul kunining tarixi va ma’nosini tushuntirganingizni N에 대해 bilan yozing.',
      'Using N에 대해, write that you explained the history and meaning of Hangeul Day to a friend.',
      'Используя N에 대해, напишите, что вы объяснили другу историю и значение Дня хангыля.',
    ),
    'The speaker explained the history and meaning of Hangeul Day to a friend.',
    ['한글날의 역사와 의미에 대해'],
    ['n-e-daehae', 'hangeul-day', 'type-answer'],
    ['친구에게 한글날의 역사와 의미에 대해서 설명했어요'],
  ),

  s5u9_483_translate_builder: grammarQuestion(
    translateBuilder(
      L(
        '한글날은 한글의 창제와 반포를 기념하는 날입니다.',
        'Hangul kuni Hangulning yaratilishi va rasmiy e’lon qilinishini nishonlaydigan kundir.',
        'Hangeul Day commemorates the creation and promulgation of Hangeul.',
        'День хангыля посвящён созданию и официальному обнародованию хангыля.',
      ),
      [
        '기념하는 날이에요',
        '한글날은',
        '한글의 창제와 반포를',
        '나무를 심는 날이에요',
        '광복을 기념해요',
        '묵념을 하는 날이에요',
      ],
      '한글날은 한글의 창제와 반포를 기념하는 날이에요',
      L(
        '한글날의 핵심 의미를 실제 소개 문장으로 완성해요.',
        'Hangul kunining asosiy ma’nosini haqiqiy tanishtirish gapi bilan ifodalaymiz.',
        'Complete a real introductory sentence about the meaning of Hangeul Day.',
        'Составляем естественное предложение о значении Дня хангыля.',
      ),
      ['hangeul-day', 'script-creation', 'promulgation'],
    ),
  ),

  s5u9_496_reading_quiz: grammarQuestion(
    grammarReadingQuiz(
      '한글날은 10월 9일입니다. 한글의 창제와 반포를 기념하는 날이며, 한글의 역사와 가치를 알리는 여러 행사도 열립니다.',
      [
        '한글날은 한글의 창제와 반포를 기념하는 날이에요.',
        '한글날은 독립운동을 기념하는 날이에요.',
        '한글날에는 주로 나무를 심어요.',
        '한글날은 8월 15일이에요.',
      ],
      '한글날은 한글의 창제와 반포를 기념하는 날이에요.',
      L(
        '글의 핵심은 한글날의 날짜와 기념 의미예요.',
        'Matnning asosiy mazmuni Hangul kunining sanasi va ma’nosi.',
        'The key information is the date and commemorative meaning of Hangeul Day.',
        'Главная информация — дата и значение Дня хангыля.',
      ),
      ['hangeul-day', 'reading', 'unit-review'],
    ),
  ),

  s5u9_500_word_arrange: grammarQuestion(
    wordArrange(
      [
        '세계에 널리 알려지고 있어요',
        '한글은 세종대왕에 의해 만들어졌고',
        '그 가치가',
        '한글날에는',
        '창제와 반포를 기념해요',
        '나무를 심어요',
      ],
      '한글은 세종대왕에 의해 만들어졌고 그 가치가 세계에 널리 알려지고 있어요',
      L(
        'Unit 마지막에는 한글의 역사와 현재의 가치를 실제 정보로 연결해요.',
        'Unit oxirida Hangul tarixi va uning bugungi qadri haqiqiy ma’lumot bilan bog‘lanadi.',
        'End the unit by connecting Hangeul’s history with its present-day recognition.',
        'В конце Unit связываем историю хангыля с его современной известностью.',
      ),
      ['hangeul', 'v-a-eojida', 'unit-review'],
    ),
  ),
};

export const S5_UNIT9_NODES = [
  {
    title: L(
      '한국에는 어떤 기념일이 있어요?',
      'Koreyada qanday esdalik kunlari bor?',
      'What Commemorative Days Are There in Korea?',
      'Какие памятные дни есть в Корее?',
    ),
    description: L(
      '한국의 주요 기념일과 날짜, 역사적 의미, 기념 행동을 배우고 한글날을 포함한 기념일을 직접 설명한다',
      'Koreyaning asosiy esdalik kunlari, sanalari, tarixiy ma’nosi va odatlarini o‘rganib ularni tushuntiramiz',
      'Learn major Korean commemorative days, dates, historical meanings, and activities, and explain them in Korean',
      'Изучаем основные памятные дни Кореи, их даты, исторический смысл и традиции и учимся их объяснять',
    ),
    section: 5,
    unit: 9,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: L(
          '한국에는 어떤 기념일이 있어요?',
          'Koreyada qanday esdalik kunlari bor?',
          'What Commemorative Days Are There in Korea?',
          'Какие памятные дни есть в Корее?',
        ),
        description: L(
          '어린이날, 어버이날, 스승의 날, 한글날, 근로자의 날의 날짜와 의미를 구별한다',
          'Bolalar kuni, Ota-onalar kuni, Ustozlar kuni, Hangul kuni va Mehnatkashlar kunini farqlaymiz',
          'Distinguish the dates and meanings of Children’s Day, Parents’ Day, Teachers’ Day, Hangeul Day, and Workers’ Day',
          'Различаем даты и значения Дня детей, Дня родителей, Дня учителя, Дня хангыля и Дня труда',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u9_001_reading_quiz',
          's5u9_002_type_answer',
          's5u9_003_translate_builder',
          's5u9_004_fill_in_blank',
          's5u9_005_word_arrange',
          's5u9_006_type_answer',
          's5u9_007_reading_quiz',
          's5u9_008_translate_builder',
          's5u9_009_fill_in_blank',
          's5u9_010_type_answer',
          's5u9_011_translate_builder',
          's5u9_012_reading_quiz',
          's5u9_013_cloze_passage',
          's5u9_014_word_arrange',
          's5u9_015_type_answer',
          's5u9_016_translate_builder',
          's5u9_017_reading_quiz',
          's5u9_018_fill_in_blank',
          's5u9_019_cloze_passage',
          's5u9_020_word_arrange',
        ],
      },
      {
        title: L(
          '왜 이 날을 기념해요?',
          'Nega bu kun nishonlanadi?',
          'Why Is This Day Commemorated?',
          'Почему отмечают этот день?',
        ),
        description: L(
          '삼일절, 현충일, 광복절, 개천절과 독립·통일·건국의 역사적 의미를 연결한다',
          'Tarixiy kunlarni mustaqillik, birlashish va davlat tashkil topishi bilan bog‘laymiz',
          'Connect major historical days with independence, unification, national foundation, and remembrance',
          'Связываем исторические памятные дни с независимостью, объединением, основанием государства и памятью',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u9_021_reading_quiz',
          's5u9_022_type_answer',
          's5u9_023_translate_builder',
          's5u9_024_fill_in_blank',
          's5u9_025_word_arrange',
          's5u9_026_type_answer',
          's5u9_027_reading_quiz',
          's5u9_028_translate_builder',
          's5u9_029_fill_in_blank',
          's5u9_030_type_answer',
          's5u9_031_translate_builder',
          's5u9_032_reading_quiz',
          's5u9_033_cloze_passage',
          's5u9_034_word_arrange',
          's5u9_035_type_answer',
          's5u9_036_reading_quiz',
          's5u9_037_translate_builder',
          's5u9_038_fill_in_blank',
          's5u9_039_cloze_passage',
          's5u9_040_word_arrange',
        ],
      },
      {
        title: L(
          '기념일에는 무엇을 해요?',
          'Esdalik kunida nima qilinadi?',
          'What Do People Do on Commemorative Days?',
          'Что делают в памятные дни?',
        ),
        description: L(
          '기념식, 나무 심기, 국기 달기, 꽃 달기, 행진, 불꽃놀이와 묵념 같은 기념 행동을 상황에 맞게 사용한다',
          'Marosim, daraxt ekish, bayroq osish, gul taqish, yurish, mushakbozlik va sukut saqlashni o‘rganamiz',
          'Use vocabulary for ceremonies, planting trees, displaying flags, flowers, marches, fireworks, and silent tributes',
          'Используем лексику церемоний, посадки деревьев, флагов, цветов, шествий, фейерверков и минуты молчания',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u9_041_reading_quiz',
          's5u9_042_type_answer',
          's5u9_043_translate_builder',
          's5u9_044_fill_in_blank',
          's5u9_045_word_arrange',
          's5u9_046_type_answer',
          's5u9_047_reading_quiz',
          's5u9_048_translate_builder',
          's5u9_049_fill_in_blank',
          's5u9_050_type_answer',
          's5u9_051_translate_builder',
          's5u9_052_reading_quiz',
          's5u9_053_cloze_passage',
          's5u9_054_word_arrange',
          's5u9_055_type_answer',
          's5u9_056_reading_quiz',
          's5u9_057_translate_builder',
          's5u9_058_fill_in_blank',
          's5u9_059_cloze_passage',
          's5u9_060_word_arrange',
        ],
      },
      {
        title: L(
          '기념일의 의미를 설명해요',
          'Esdalik kunining ma’nosini tushuntiramiz',
          'Explain the Meaning of a Commemorative Day',
          'Объясняем смысл памятного дня',
        ),
        description: L(
          '공휴일, 곳곳, 진심으로와 역사 관련 표현을 사용해 기념일의 이유와 분위기를 더 구체적으로 설명한다',
          'Davlat dam olish kuni, turli joylar, samimiylik va tarixiy iboralar orqali kunning ma’nosini aniq tushuntiramiz',
          'Use supporting vocabulary to explain the reason, atmosphere, and historical meaning of commemorative days',
          'Используем дополнительную лексику для объяснения причины, атмосферы и исторического смысла памятных дней',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u9_061_reading_quiz',
          's5u9_062_type_answer',
          's5u9_063_translate_builder',
          's5u9_064_fill_in_blank',
          's5u9_065_word_arrange',
          's5u9_066_type_answer',
          's5u9_067_reading_quiz',
          's5u9_068_translate_builder',
          's5u9_069_fill_in_blank',
          's5u9_070_type_answer',
          's5u9_071_translate_builder',
          's5u9_072_reading_quiz',
          's5u9_073_cloze_passage',
          's5u9_074_word_arrange',
          's5u9_075_type_answer',
          's5u9_076_reading_quiz',
          's5u9_077_translate_builder',
          's5u9_078_fill_in_blank',
          's5u9_079_cloze_passage',
          's5u9_080_word_arrange',
        ],
      },
      {
        title: L(
          '한글날에 대해 설명해요',
          'Hangul kuni haqida tushuntiramiz',
          'Explain Hangeul Day',
          'Рассказываем о Дне хангыля',
        ),
        description: L(
          '날짜, 기념 이유와 대표 행사를 연결해 한글날과 다른 기념일을 실제로 소개할 수 있게 한다',
          'Sana, sabab va tadbirlarni bog‘lab Hangul kuni va boshqa kunlarni tushuntirishni mashq qilamiz',
          'Combine dates, reasons, and activities to explain Hangeul Day and other commemorative days',
          'Объединяем даты, причины и мероприятия, чтобы рассказывать о Дне хангыля и других памятных днях',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u9_081_reading_quiz',
          's5u9_082_type_answer',
          's5u9_083_translate_builder',
          's5u9_084_fill_in_blank',
          's5u9_085_word_arrange',
          's5u9_086_type_answer',
          's5u9_087_reading_quiz',
          's5u9_088_translate_builder',
          's5u9_089_fill_in_blank',
          's5u9_090_type_answer',
          's5u9_091_translate_builder',
          's5u9_092_reading_quiz',
          's5u9_093_cloze_passage',
          's5u9_094_word_arrange',
          's5u9_095_type_answer',
          's5u9_096_reading_quiz',
          's5u9_097_translate_builder',
          's5u9_098_fill_in_blank',
          's5u9_099_cloze_passage',
          's5u9_100_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '한글날을 기념하기 위해 행사를 해요',
      'Hangul kunini nishonlash uchun tadbir o‘tkazamiz',
      'We Hold Events to Commemorate Hangeul Day',
      'Мы проводим мероприятия, чтобы отметить День хангыля',
    ),
    description: L(
      'N을/를 위해(서)와 V-기 위해(서)를 사용해 누구나 무엇을 위한 행동인지, 어떤 목적을 이루기 위한 행동인지 설명한다',
      'N을/를 위해(서) va V-기 위해(서) orqali harakat kim yoki nima uchun va qaysi maqsadda qilinishini tushuntiramiz',
      'Use N을/를 위해(서) and V-기 위해(서) to explain who or what an action is for and what purpose it serves',
      'Используем N을/를 위해(서) и V-기 위해(서), чтобы объяснять, ради кого или чего и с какой целью совершается действие',
    ),
    section: 5,
    unit: 9,
    order: 2,
    isActive: true,
    lessons: [
      {
        title: L(
          '누구를 위해 준비했어요?',
          'Kim uchun tayyorladingiz?',
          'Who Did You Prepare It For?',
          'Для кого это подготовили?',
        ),
        description: L(
          '어린이, 부모님, 선생님, 자연처럼 행동의 혜택을 받는 사람이나 대상을 N을/를 위해로 표현한다',
          'Bolalar, ota-ona, ustoz va tabiat kabi harakat kim yoki nima uchun ekanini N을/를 위해 bilan ifodalaymiz',
          'Use N을/를 위해 to identify the person, group, or cause an action is for',
          'Используем N을/를 위해 для обозначения человека, группы или цели, ради которой совершается действие',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u9_101_reading_quiz',
          's5u9_102_type_answer',
          's5u9_103_translate_builder',
          's5u9_104_fill_in_blank',
          's5u9_105_word_arrange',
          's5u9_106_type_answer',
          's5u9_107_error_hunt',
          's5u9_108_translate_builder',
          's5u9_109_reading_quiz',
          's5u9_110_fill_in_blank',
          's5u9_111_type_answer',
          's5u9_112_translate_builder',
          's5u9_113_cloze_passage',
          's5u9_114_word_arrange',
          's5u9_115_type_answer',
          's5u9_116_reading_quiz',
          's5u9_117_translate_builder',
          's5u9_118_fill_in_blank',
          's5u9_119_error_hunt',
          's5u9_120_word_arrange',
        ],
      },
      {
        title: L(
          '무엇을 하기 위해 준비했어요?',
          'Nima qilish uchun tayyorladingiz?',
          'What Did You Prepare It to Do?',
          'Для чего это подготовили?',
        ),
        description: L(
          '기념하다, 알리다, 보호하다, 기억하다 같은 행동을 목적로 삼아 V-기 위해로 표현한다',
          'Nishonlash, tanitish, himoya qilish va eslash kabi maqsadlarni V-기 위해 bilan ifodalaymiz',
          'Use V-기 위해 to express actions such as commemorating, informing, protecting, and remembering as purposes',
          'Используем V-기 위해 для целей: отметить, рассказать, защитить, помнить и т. д.',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u9_121_reading_quiz',
          's5u9_122_type_answer',
          's5u9_123_translate_builder',
          's5u9_124_fill_in_blank',
          's5u9_125_word_arrange',
          's5u9_126_type_answer',
          's5u9_127_error_hunt',
          's5u9_128_translate_builder',
          's5u9_129_reading_quiz',
          's5u9_130_fill_in_blank',
          's5u9_131_type_answer',
          's5u9_132_translate_builder',
          's5u9_133_cloze_passage',
          's5u9_134_word_arrange',
          's5u9_135_type_answer',
          's5u9_136_reading_quiz',
          's5u9_137_translate_builder',
          's5u9_138_fill_in_blank',
          's5u9_139_error_hunt',
          's5u9_140_word_arrange',
        ],
      },
      {
        title: L(
          '기념일에 왜 이런 행동을 해요?',
          'Nega esdalik kunida bunday qilamiz?',
          'Why Do People Do This on Commemorative Days?',
          'Зачем это делают в памятные дни?',
        ),
        description: L(
          '어버이날, 스승의 날, 현충일, 광복절과 식목일의 대표 행동을 그 행동의 실제 목적과 연결한다',
          'Ota-onalar kuni, Ustozlar kuni, Xotira kuni, Ozodlik kuni va Daraxt ekish kunidagi harakatlarni maqsadi bilan bog‘laymiz',
          'Connect typical actions on major commemorative days with their actual purposes',
          'Связываем типичные действия в памятные дни с их реальными целями',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u9_141_reading_quiz',
          's5u9_142_type_answer',
          's5u9_143_translate_builder',
          's5u9_144_fill_in_blank',
          's5u9_145_word_arrange',
          's5u9_146_type_answer',
          's5u9_147_error_hunt',
          's5u9_148_translate_builder',
          's5u9_149_reading_quiz',
          's5u9_150_fill_in_blank',
          's5u9_151_type_answer',
          's5u9_152_translate_builder',
          's5u9_153_cloze_passage',
          's5u9_154_word_arrange',
          's5u9_155_type_answer',
          's5u9_156_reading_quiz',
          's5u9_157_translate_builder',
          's5u9_158_fill_in_blank',
          's5u9_159_error_hunt',
          's5u9_160_word_arrange',
        ],
      },
      {
        title: L(
          'N을 위해와 V-기 위해를 구별해요',
          'N을 위해 va V-기 위해ni farqlaymiz',
          'Distinguish N을 위해 and V-기 위해',
          'Различаем N을 위해 и V-기 위해',
        ),
        description: L(
          '사람이나 대상을 위한 행동과 구체적인 동작을 목적으로 하는 행동을 구별해 알맞은 형태를 선택한다',
          'Kimdir yoki nimadir uchun qilingan harakat bilan aniq fe’l maqsadini farqlab to‘g‘ri shaklni tanlaymiz',
          'Distinguish actions for a beneficiary from actions performed for a specific verb-based purpose',
          'Различаем действия ради получателя пользы и действия ради конкретной глагольной цели',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u9_161_reading_quiz',
          's5u9_162_type_answer',
          's5u9_163_translate_builder',
          's5u9_164_fill_in_blank',
          's5u9_165_word_arrange',
          's5u9_166_type_answer',
          's5u9_167_error_hunt',
          's5u9_168_translate_builder',
          's5u9_169_reading_quiz',
          's5u9_170_fill_in_blank',
          's5u9_171_type_answer',
          's5u9_172_translate_builder',
          's5u9_173_cloze_passage',
          's5u9_174_word_arrange',
          's5u9_175_type_answer',
          's5u9_176_reading_quiz',
          's5u9_177_translate_builder',
          's5u9_178_fill_in_blank',
          's5u9_179_error_hunt',
          's5u9_180_word_arrange',
        ],
      },
      {
        title: L(
          '한글날을 왜 기념해요?',
          'Hangul kuni nega nishonlanadi?',
          'Why Do We Commemorate Hangeul Day?',
          'Зачем отмечают День хангыля?',
        ),
        description: L(
          '한글날, 광복절, 현충일의 날짜와 대표 행동에 목적 표현을 결합해 기념일의 의미를 실제로 설명한다',
          'Hangul kuni, Ozodlik kuni va Xotira kunidagi harakatlarni maqsad ifodasi bilan bog‘lab tushuntiramiz',
          'Use purpose expressions with Hangeul Day, Liberation Day, and Memorial Day to explain why commemorative actions are performed',
          'Используем выражения цели, чтобы объяснять смысл действий в День хангыля, День освобождения и День памяти',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u9_181_reading_quiz',
          's5u9_182_type_answer',
          's5u9_183_translate_builder',
          's5u9_184_fill_in_blank',
          's5u9_185_word_arrange',
          's5u9_186_type_answer',
          's5u9_187_error_hunt',
          's5u9_188_translate_builder',
          's5u9_189_reading_quiz',
          's5u9_190_fill_in_blank',
          's5u9_191_type_answer',
          's5u9_192_translate_builder',
          's5u9_193_cloze_passage',
          's5u9_194_word_arrange',
          's5u9_195_type_answer',
          's5u9_196_reading_quiz',
          's5u9_197_translate_builder',
          's5u9_198_fill_in_blank',
          's5u9_199_error_hunt',
          's5u9_200_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '한글은 만들어졌어요',
      'Hangul yaratildi',
      'Hangeul Was Created',
      'Хангыль был создан',
    ),
    description: L(
      'V-아지다/어지다를 사용해 행동을 한 사람보다 만들어진 것, 알려진 정보, 정해진 규칙처럼 행동을 받은 대상과 결과에 초점을 두어 표현한다',
      'V-아지다/어지다 orqali bajaruvchidan ko‘ra harakatni qabul qilgan narsa va natijaga e’tibor qaratamiz',
      'Use V-아지다/어지다 to focus on the affected object or result rather than the person performing the action',
      'Используем V-아지다/어지다, чтобы фокусироваться на объекте действия или результате, а не на деятеле',
    ),
    section: 5,
    unit: 9,
    order: 3,
    isActive: true,
    lessons: [
      {
        title: L(
          '한글은 만들어졌어요',
          'Hangul yaratildi',
          'Hangeul Was Created',
          'Хангыль был создан',
        ),
        description: L(
          '만들어지다, 세워지다, 지어지다, 알려지다를 통해 V-아지다/어지다의 기본 피동 의미와 형태를 익힌다',
          '만들어지다, 세워지다, 지어지다 va 알려지다 orqali asosiy majhul ma’no va shaklni o‘rganamiz',
          'Learn the basic passive meaning and forms through 만들어지다, 세워지다, 지어지다, and 알려지다',
          'Изучаем основное значение пассива через 만들어지다, 세워지다, 지어지다 и 알려지다',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u9_201_reading_quiz',
          's5u9_202_type_answer',
          's5u9_203_translate_builder',
          's5u9_204_fill_in_blank',
          's5u9_205_word_arrange',
          's5u9_206_type_answer',
          's5u9_207_error_hunt',
          's5u9_208_translate_builder',
          's5u9_209_reading_quiz',
          's5u9_210_fill_in_blank',
          's5u9_211_type_answer',
          's5u9_212_translate_builder',
          's5u9_213_cloze_passage',
          's5u9_214_word_arrange',
          's5u9_215_type_answer',
          's5u9_216_reading_quiz',
          's5u9_217_translate_builder',
          's5u9_218_fill_in_blank',
          's5u9_219_error_hunt',
          's5u9_220_word_arrange',
        ],
      },
      {
        title: L(
          '결과에 초점을 맞춰요',
          'Natijaga e’tibor qaratamiz',
          'Focus on the Result',
          'Фокусируемся на результате',
        ),
        description: L(
          '행위자가 중요하지 않거나 이미 알려져 있을 때 만들어지다, 알려지다, 이루어지다, 정해지다로 대상과 결과를 중심으로 설명한다',
          'Bajaruvchi muhim bo‘lmaganda 만들어지다, 알려지다, 이루어지다 va 정해지다 bilan natijani markazga qo‘yamiz',
          'Use passive forms to focus on an affected object or result when the agent is unimportant',
          'Используем пассивные формы, когда важнее объект или результат, а не деятель',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u9_221_reading_quiz',
          's5u9_222_type_answer',
          's5u9_223_translate_builder',
          's5u9_224_fill_in_blank',
          's5u9_225_word_arrange',
          's5u9_226_type_answer',
          's5u9_227_error_hunt',
          's5u9_228_translate_builder',
          's5u9_229_reading_quiz',
          's5u9_230_fill_in_blank',
          's5u9_231_type_answer',
          's5u9_232_translate_builder',
          's5u9_233_cloze_passage',
          's5u9_234_word_arrange',
          's5u9_235_type_answer',
          's5u9_236_reading_quiz',
          's5u9_237_translate_builder',
          's5u9_238_fill_in_blank',
          's5u9_239_error_hunt',
          's5u9_240_word_arrange',
        ],
      },
      {
        title: L(
          '규칙이 잘 지켜지고 있어요',
          'Qoidalarga yaxshi amal qilinmoqda',
          'The Rules Are Being Observed',
          'Правила хорошо соблюдаются',
        ),
        description: L(
          '기념 행사 준비와 진행 상황에서 정해지다, 알려지다, 지켜지다, 이루어지다를 사용해 실제 절차와 결과를 설명한다',
          'Tadbir tayyorgarligi va o‘tkazilishida 정해지다, 알려지다, 지켜지다 va 이루어지다ni ishlatamiz',
          'Use passive forms to describe event decisions, information sharing, rule observance, and execution',
          'Используем пассивные формы для описания решений, распространения информации, соблюдения правил и проведения мероприятий',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u9_241_reading_quiz',
          's5u9_242_type_answer',
          's5u9_243_translate_builder',
          's5u9_244_fill_in_blank',
          's5u9_245_word_arrange',
          's5u9_246_type_answer',
          's5u9_247_error_hunt',
          's5u9_248_translate_builder',
          's5u9_249_reading_quiz',
          's5u9_250_fill_in_blank',
          's5u9_251_type_answer',
          's5u9_252_translate_builder',
          's5u9_253_cloze_passage',
          's5u9_254_word_arrange',
          's5u9_255_type_answer',
          's5u9_256_reading_quiz',
          's5u9_257_translate_builder',
          's5u9_258_fill_in_blank',
          's5u9_259_error_hunt',
          's5u9_260_word_arrange',
        ],
      },
      {
        title: L(
          '만들어졌어요와 좋아졌어요는 달라요',
          '만들어졌어요 va 좋아졌어요 bir xil emas',
          '만들어졌어요 and 좋아졌어요 Are Different',
          '만들어졌어요 и 좋아졌어요 — разные конструкции',
        ),
        description: L(
          'V-아지다/어지다의 피동과 A-아지다/어지다의 상태 변화를 구별하고 능동문과 피동문의 초점 차이를 익힌다',
          'V-아지다/어지다 majhuli va A-아지다/어지다 holat o‘zgarishini, shuningdek faol va majhul gap urg‘usini farqlaymiz',
          'Distinguish passive V-아지다/어지다 from state-change A-아지다/어지다 and compare active and passive focus',
          'Различаем пассивное V-아지다/어지다 и изменение состояния A-아지다/어지다, а также актив и пассив',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u9_261_reading_quiz',
          's5u9_262_type_answer',
          's5u9_263_translate_builder',
          's5u9_264_fill_in_blank',
          's5u9_265_word_arrange',
          's5u9_266_type_answer',
          's5u9_267_error_hunt',
          's5u9_268_translate_builder',
          's5u9_269_reading_quiz',
          's5u9_270_fill_in_blank',
          's5u9_271_type_answer',
          's5u9_272_translate_builder',
          's5u9_273_cloze_passage',
          's5u9_274_word_arrange',
          's5u9_275_type_answer',
          's5u9_276_reading_quiz',
          's5u9_277_translate_builder',
          's5u9_278_fill_in_blank',
          's5u9_279_error_hunt',
          's5u9_280_word_arrange',
        ],
      },
      {
        title: L(
          '한글날을 피동 표현으로 설명해요',
          'Hangul kunini majhul shaklda tushuntiramiz',
          'Explain Hangeul Day with Passive Expressions',
          'Рассказываем о Дне хангыля с помощью пассива',
        ),
        description: L(
          '한글의 생성, 가치의 확산, 행사 준비와 진행을 만들어지다, 알려지다, 정해지다, 지켜지다, 이루어지다로 통합해 설명한다',
          'Hangul yaratilishi, qadri tarqalishi va tadbir jarayonini majhul shakllar bilan birlashtirib tushuntiramiz',
          'Integrate passive forms to explain Hangeul’s creation, spreading recognition, and Hangeul Day event preparation and operation',
          'Объединяем пассивные формы для описания создания хангыля, распространения его ценности и проведения мероприятий',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u9_281_reading_quiz',
          's5u9_282_type_answer',
          's5u9_283_translate_builder',
          's5u9_284_fill_in_blank',
          's5u9_285_word_arrange',
          's5u9_286_type_answer',
          's5u9_287_error_hunt',
          's5u9_288_translate_builder',
          's5u9_289_reading_quiz',
          's5u9_290_fill_in_blank',
          's5u9_291_type_answer',
          's5u9_292_translate_builder',
          's5u9_293_cloze_passage',
          's5u9_294_word_arrange',
          's5u9_295_type_answer',
          's5u9_296_reading_quiz',
          's5u9_297_translate_builder',
          's5u9_298_fill_in_blank',
          's5u9_299_error_hunt',
          's5u9_300_word_arrange',
        ],
      },
    ],
  },
  {
    title: L(
      '비가 오는데도 불구하고 행사가 계속됐어요',
      'Yomg‘irga qaramay tadbir davom etdi',
      'The Event Continued Despite the Rain',
      'Мероприятие продолжилось несмотря на дождь',
    ),
    description: L(
      'A-(으)ㄴ데도 불구하고, V-는데도 불구하고, N인데도 불구하고를 사용해 일반적인 예상과 실제 결과가 다른 상황을 강하게 대조한다',
      'A-(으)ㄴ데도 불구하고, V-는데도 불구하고 va N인데도 불구하고 orqali kutilgan holat va haqiqiy natijani kuchli qarama-qarshi qo‘yamiz',
      'Use A-(으)ㄴ데도 불구하고, V-는데도 불구하고, and N인데도 불구하고 to emphasize a contrast between expectation and actual result',
      'Используем A-(으)ㄴ데도 불구하고, V-는데도 불구하고 и N인데도 불구하고 для усиленного противопоставления ожидания и реального результата',
    ),
    section: 5,
    unit: 9,
    order: 4,
    isActive: true,
    lessons: [
      {
        title: L(
          '비가 오는데도 불구하고',
          'Yomg‘ir yog‘ishiga qaramay',
          'Despite the Rain',
          'Несмотря на дождь',
        ),
        description: L(
          'V-는데도 불구하고를 사용해 진행 중인 행동이나 이미 일어난 사건과 예상 밖 결과를 대조한다',
          'V-는데도 불구하고 orqali harakat yoki voqea bilan kutilmagan natijani qarama-qarshi qo‘yamiz',
          'Use V-는데도 불구하고 to contrast an action or event with an unexpected result',
          'Используем V-는데도 불구하고 для противопоставления действия или события неожиданному результату',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u9_301_reading_quiz',
          's5u9_302_type_answer',
          's5u9_303_translate_builder',
          's5u9_304_fill_in_blank',
          's5u9_305_word_arrange',
          's5u9_306_type_answer',
          's5u9_307_error_hunt',
          's5u9_308_translate_builder',
          's5u9_309_reading_quiz',
          's5u9_310_fill_in_blank',
          's5u9_311_type_answer',
          's5u9_312_translate_builder',
          's5u9_313_cloze_passage',
          's5u9_314_word_arrange',
          's5u9_315_type_answer',
          's5u9_316_reading_quiz',
          's5u9_317_translate_builder',
          's5u9_318_fill_in_blank',
          's5u9_319_error_hunt',
          's5u9_320_word_arrange',
        ],
      },
      {
        title: L(
          '날씨가 추운데도 불구하고',
          'Havo sovuq bo‘lishiga qaramay',
          'Despite the Cold Weather',
          'Несмотря на холодную погоду',
        ),
        description: L(
          'A-(으)ㄴ데도 불구하고의 활용을 익히고 불리한 상태와 예상 밖 결과를 대조한다',
          'A-(으)ㄴ데도 불구하고 shaklini o‘rganib, noqulay holat va kutilmagan natijani qarama-qarshi qo‘yamiz',
          'Learn A-(으)ㄴ데도 불구하고 and contrast an unfavorable state with an unexpected result',
          'Изучаем A-(으)ㄴ데도 불구하고 и противопоставляем неблагоприятное состояние неожиданному результату',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u9_321_reading_quiz',
          's5u9_322_type_answer',
          's5u9_323_translate_builder',
          's5u9_324_fill_in_blank',
          's5u9_325_word_arrange',
          's5u9_326_type_answer',
          's5u9_327_error_hunt',
          's5u9_328_translate_builder',
          's5u9_329_reading_quiz',
          's5u9_330_fill_in_blank',
          's5u9_331_type_answer',
          's5u9_332_translate_builder',
          's5u9_333_cloze_passage',
          's5u9_334_word_arrange',
          's5u9_335_type_answer',
          's5u9_336_reading_quiz',
          's5u9_337_translate_builder',
          's5u9_338_fill_in_blank',
          's5u9_339_error_hunt',
          's5u9_340_word_arrange',
        ],
      },
      {
        title: L(
          '공휴일인데도 불구하고',
          'Dam olish kuni bo‘lishiga qaramay',
          'Despite It Being a Public Holiday',
          'Несмотря на государственный выходной',
        ),
        description: L(
          'N인데도 불구하고를 사용해 공휴일, 기념일, 학생 같은 명사 조건과 실제 결과를 대조한다',
          'N인데도 불구하고 orqali 공휴일, 기념일, 학생 kabi otlar bilan haqiqiy natijani qarama-qarshi qo‘yamiz',
          'Use N인데도 불구하고 to contrast noun-based conditions such as a public holiday or commemorative day with reality',
          'Используем N인데도 불구하고 для противопоставления условий, выраженных существительными, реальной ситуации',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u9_341_reading_quiz',
          's5u9_342_type_answer',
          's5u9_343_translate_builder',
          's5u9_344_fill_in_blank',
          's5u9_345_word_arrange',
          's5u9_346_type_answer',
          's5u9_347_error_hunt',
          's5u9_348_translate_builder',
          's5u9_349_reading_quiz',
          's5u9_350_fill_in_blank',
          's5u9_351_type_answer',
          's5u9_352_translate_builder',
          's5u9_353_cloze_passage',
          's5u9_354_word_arrange',
          's5u9_355_type_answer',
          's5u9_356_reading_quiz',
          's5u9_357_translate_builder',
          's5u9_358_fill_in_blank',
          's5u9_359_error_hunt',
          's5u9_360_word_arrange',
        ],
      },
      {
        title: L(
          '-는데도와 -는데도 불구하고',
          '-는데도 va -는데도 불구하고',
          '-는데도 vs -는데도 불구하고',
          '-는데도 и -는데도 불구하고',
        ),
        description: L(
          '두 표현의 공통된 대조 의미를 이해하고 불구하고가 대조를 더 명시적으로 강조하는 상황을 구별한다',
          'Ikki shaklning umumiy qarama-qarshilik ma’nosini va 불구하고 kuchliroq urg‘u beradigan holatlarni farqlaymiz',
          'Understand the shared contrast meaning and recognize when 불구하고 makes the contrast more explicit',
          'Понимаем общее значение противопоставления и различаем случаи, когда 불구하고 делает его более явным',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u9_361_reading_quiz',
          's5u9_362_type_answer',
          's5u9_363_translate_builder',
          's5u9_364_fill_in_blank',
          's5u9_365_word_arrange',
          's5u9_366_type_answer',
          's5u9_367_error_hunt',
          's5u9_368_translate_builder',
          's5u9_369_reading_quiz',
          's5u9_370_fill_in_blank',
          's5u9_371_type_answer',
          's5u9_372_translate_builder',
          's5u9_373_cloze_passage',
          's5u9_374_word_arrange',
          's5u9_375_type_answer',
          's5u9_376_reading_quiz',
          's5u9_377_translate_builder',
          's5u9_378_fill_in_blank',
          's5u9_379_error_hunt',
          's5u9_380_word_arrange',
        ],
      },
      {
        title: L(
          '예상과 다른 기념일 이야기',
          'Kutilmagan esdalik kuni voqealari',
          'Unexpected Commemorative-Day Situations',
          'Неожиданные ситуации в памятные дни',
        ),
        description: L(
          'Unit 9의 기념일, 목적 표현과 피동 표현을 이번 대조 문법과 결합해 실제 한글날 행사와 기념일 상황을 설명한다',
          'Unit 9dagi bayram, maqsad va majhul shakllarni yangi qarama-qarshilik grammatikasi bilan birlashtiramiz',
          'Combine Unit 9 commemorative-day vocabulary, purpose expressions, and passives with the new contrast grammar',
          'Объединяем лексику памятных дней, выражение цели и пассив с новой грамматикой противопоставления',
        ),
        category: LessonCategory.GRAMMAR,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u9_381_reading_quiz',
          's5u9_382_type_answer',
          's5u9_383_translate_builder',
          's5u9_384_fill_in_blank',
          's5u9_385_word_arrange',
          's5u9_386_type_answer',
          's5u9_387_error_hunt',
          's5u9_388_translate_builder',
          's5u9_389_reading_quiz',
          's5u9_390_fill_in_blank',
          's5u9_391_type_answer',
          's5u9_392_translate_builder',
          's5u9_393_cloze_passage',
          's5u9_394_word_arrange',
          's5u9_395_type_answer',
          's5u9_396_reading_quiz',
          's5u9_397_translate_builder',
          's5u9_398_fill_in_blank',
          's5u9_399_error_hunt',
          's5u9_400_word_arrange',
        ],
      },
    ],
  },
];
