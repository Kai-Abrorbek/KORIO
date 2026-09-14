import { LessonCategory } from '../../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../../lessons/schemas/question.schema';
import { WordPartOfSpeech } from '../../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../../word-seed.types';

/**
 * Section 5 · Unit 1
 * 서울대 한국어 3A 1과 — 신입생 환영회를 한다고 해요
 *
 * Node 1
 * 학교 행사와 게시판
 *
 * 학습 범위
 * - 입학식 / 오리엔테이션 / 신입생 / 환영회 / 신입생 환영회
 * - 동아리 / 축제 / 졸업식
 * - 게시판 / 강당 / 일시 / 장소 / 주차장
 * - 글쓰기 대회 / 노래자랑 / 음악회 / 상금
 * - 기회 / 선배 / 참석하다 / 제공하다 / 도움이 되다
 *
 * Section 5 규칙
 * - 5 lessons × 20 questions = 100 questions
 * - dialog_complete 사용하지 않음
 * - 긴 문맥 판단 적극 사용
 * - chip 문제는 조사까지 한 어절로 유지
 * - 동사·형용사는 활용형 전체를 한 chip으로 유지
 * - 한 chip은 가능한 6자 이하
 * - 정답 chip 외에 의미 있는 오답 chip 2~3개 추가
 * - typing 4종은 grading 필수
 */

type S5U1WordText = {
  ko: string;
  uz: string;
  en: string;
  ru: string;
};

type S5U1WordInput = {
  code: string;
  korean: string;
  senseKey: string;
  partOfSpeech: WordPartOfSpeech;
  meaning: S5U1WordText;
  example: string;
  exampleTranslations: S5U1WordText;
  romanization: string;
  emoji: string;
  tags: string[];
  difficulty?: number;
  usageNote?: S5U1WordText;
  isCore?: boolean;
};

const S5U1T = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): S5U1WordText => ({
  ko,
  uz,
  en,
  ru,
});

const makeS5U1Word = ({
  code,
  korean,
  senseKey,
  partOfSpeech,
  meaning,
  example,
  exampleTranslations,
  romanization,
  emoji,
  tags,
  difficulty = 4,
  usageNote,
  isCore = false,
}: S5U1WordInput): WordSeedEntry => ({
  code,
  korean,
  senseKey,
  partOfSpeech,
  meaning,
  examples: [
    {
      korean: example,
      translations: exampleTranslations,
    },
  ],
  pronunciation: {
    hangul: korean,
    romanization,
    ttsText: korean,
  },
  media: {
    emoji,
    imageUrl: '',
    imageAlt: {
      ko: `${korean}의 의미를 나타내는 이미지`,
      uz: `${korean} ma’nosini ifodalovchi rasm`,
      en: `an image representing ${meaning.en}`,
      ru: `изображение со значением «${meaning.ru}»`,
    },
  },
  tags: ['s5-unit1', ...tags],
  difficulty,
  usageNote:
    usageNote ??
    S5U1T(
      '서울대 한국어 3A 1과에서 학습하는 어휘예요.',
      'Seul milliy universiteti koreys tili 3A 1-darsida o‘rganiladigan so‘z yoki ifoda.',
      'A vocabulary item taught in Seoul National University Korean 3A Unit 1.',
      'Слово или выражение из урока 1 учебника Seoul National University Korean 3A.',
    ),
  isCore,
});

type S5I18nText = {
  ko: string;
  uz: string;
  en: string;
  ru: string;
};

type S5I18nOptions = {
  ko: string[];
  uz: string[];
  en: string[];
  ru: string[];
};

const L = (ko: string, uz: string, en: string, ru: string): S5I18nText => ({
  ko,
  uz,
  en,
  ru,
});

const EMPTY_I18N = L('', '', '', '');

const I = {
  reading: L(
    '글을 읽고 알맞은 답을 고르세요.',
    'Matnni o‘qing va mos javobni tanlang.',
    'Read the passage and choose the best answer.',
    'Прочитайте текст и выберите правильный ответ.',
  ),
  match: L(
    '한국어 단어와 뜻을 연결하세요.',
    'Koreyscha so‘zlarni ma’nolari bilan moslang.',
    'Match each Korean word with its meaning.',
    'Соедините корейские слова с их значениями.',
  ),
  audioMatch: L(
    '들리는 단어와 뜻을 연결하세요.',
    'Eshitilgan so‘zlarni ma’nolari bilan moslang.',
    'Match each word you hear with its meaning.',
    'Соедините услышанные слова с их значениями.',
  ),
  listenNative: L(
    '한국어 문장을 듣고 뜻을 알맞은 순서로 배열하세요.',
    'Koreyscha gapni tinglab, ma’nosini to‘g‘ri tartibda tuzing.',
    'Listen to the Korean sentence and arrange its meaning.',
    'Прослушайте корейское предложение и соберите его значение.',
  ),
  arrange: L(
    '한국어 어절을 알맞은 순서로 배열하세요.',
    'Koreyscha bo‘laklarni to‘g‘ri tartibda joylashtiring.',
    'Arrange the Korean chunks in the correct order.',
    'Расположите корейские части в правильном порядке.',
  ),
  reply: L(
    '상대의 말을 듣고 자연스러운 대답을 만드세요.',
    'Suhbatdoshning gapini tinglab, tabiiy javob tuzing.',
    'Listen and build a natural reply.',
    'Прослушайте собеседника и составьте естественный ответ.',
  ),
  fill: L(
    '문맥에 맞게 빈칸을 모두 채우세요.',
    'Kontekstga mos ravishda barcha bo‘sh joylarni to‘ldiring.',
    'Fill in all blanks according to the context.',
    'Заполните все пропуски по смыслу.',
  ),
  cloze: L(
    '전체 글의 흐름을 생각하며 빈칸을 채우세요.',
    'Butun matn mazmunini hisobga olib bo‘sh joylarni to‘ldiring.',
    'Fill in the blanks while considering the whole passage.',
    'Заполните пропуски, учитывая смысл всего текста.',
  ),
  error: L(
    '문장에서 잘못된 어절을 찾아 알맞게 고치세요.',
    'Gapdagi noto‘g‘ri bo‘lakni topib, to‘g‘rilang.',
    'Find the incorrect word chunk and correct it.',
    'Найдите ошибочную часть предложения и исправьте её.',
  ),
  dialogOrder: L(
    '대화의 흐름이 자연스럽도록 순서를 맞추세요.',
    'Dialog tabiiy davom etishi uchun gaplarni tartiblang.',
    'Arrange the lines so the conversation flows naturally.',
    'Расположите реплики так, чтобы диалог звучал естественно.',
  ),
  transform: L(
    '주어진 말을 상황에 맞는 형태로 바꾸세요.',
    'Berilgan so‘zni vaziyatga mos shaklga o‘zgartiring.',
    'Change the given word into the required form.',
    'Преобразуйте данное слово в нужную форму.',
  ),
  listenType: L(
    '문장을 듣고 정확하게 입력하세요.',
    'Gapni tinglab, aniq yozing.',
    'Listen and type the sentence accurately.',
    'Прослушайте и точно введите предложение.',
  ),
  listenFill: L(
    '문장을 듣고 빠진 부분을 정확하게 입력하세요.',
    'Gapni tinglab, tushirib qoldirilgan qismlarni aniq yozing.',
    'Listen and type the missing parts accurately.',
    'Прослушайте и точно введите пропущенные части.',
  ),
  speak: L(
    '상황을 생각하며 자연스럽게 말해 보세요.',
    'Vaziyatni hisobga olib, tabiiy ayting.',
    'Say the sentence naturally for the situation.',
    'Произнесите фразу естественно с учётом ситуации.',
  ),
  image: L(
    '단어와 가장 잘 맞는 그림을 고르세요.',
    'So‘zga eng mos rasmni tanlang.',
    'Choose the picture that best matches the word.',
    'Выберите изображение, которое лучше всего соответствует слову.',
  ),
} as const;

const H = {
  context: L(
    '한 단어만 보지 말고 앞뒤 상황과 행사의 목적을 함께 확인하세요.',
    'Faqat bitta so‘zga emas, vaziyat va tadbir maqsadiga ham e’tibor bering.',
    'Do not focus on one word only. Check the context and the purpose of the event.',
    'Смотрите не только на одно слово, но и на ситуацию и цель мероприятия.',
  ),
  chips: L(
    '조사까지 붙은 어절 단위로 보고 문장의 의미가 자연스럽게 이어지는지 확인하세요.',
    'Qo‘shimchasi bilan birga har bir bo‘lakni ko‘rib, gap ma’nosi tabiiy ulanayotganini tekshiring.',
    'Treat each particle-attached eojeol as one chunk and check whether the meaning flows naturally.',
    'Считайте слово с частицей одним блоком и проверяйте естественность смысла.',
  ),
  listen: L(
    '행사 이름뿐 아니라 날짜, 장소, 행동을 나타내는 말도 함께 들으세요.',
    'Faqat tadbir nomini emas, sana, joy va harakatni bildiradigan so‘zlarni ham tinglang.',
    'Listen for the event name as well as the date, place, and action.',
    'Слушайте не только название мероприятия, но и дату, место и действие.',
  ),
  form: L(
    '기본형의 뜻을 유지하면서 필요한 시제와 높임 정도만 바꾸세요.',
    'Asosiy ma’noni saqlab, faqat kerakli zamon va uslubni o‘zgartiring.',
    'Keep the base meaning and change only the required tense and speech level.',
    'Сохраните основное значение и измените только время и стиль речи.',
  ),
  reply: L(
    '상대가 무엇을 알려 주었는지 먼저 파악한 뒤 그 정보에 직접 반응하세요.',
    'Avval suhbatdosh qanday ma’lumot berganini aniqlang, keyin bevosita javob bering.',
    'First identify what information the speaker gave you, then respond directly to it.',
    'Сначала определите, какую информацию сообщил собеседник, затем ответьте на неё.',
  ),
  typing: L(
    '핵심 어휘가 빠지지 않았는지 확인한 뒤 문장을 입력하세요.',
    'Asosiy so‘zlar tushib qolmaganini tekshirib, keyin gapni yozing.',
    'Make sure the key vocabulary is present before submitting your sentence.',
    'Перед ответом проверьте, что ключевая лексика не пропущена.',
  ),
};

const normalize = (value: string) =>
  value
    .replace(/[.!?,:;“”"'()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * sentence_builder / word_arrange / translate_builder / reply_builder
 *
 * - 조사: 앞말에 붙인 채 한 chip
 * - 동사/형용사: 활용형 전체를 한 chip
 * - 같은 어절이 두 번 나오면 chip도 두 번 유지
 * - 정답 순서 그대로 options에 넣지 않음
 */
const koreanChipOptions = (answer: string, distractors: string[]): string[] => {
  const answerChunks = normalize(answer).split(' ').filter(Boolean);

  const extras = distractors
    .filter((item) => !answerChunks.includes(item))
    .slice(0, answerChunks.length >= 6 ? 3 : 2);

  const all = [...answerChunks, ...extras];

  return [
    ...all.filter((_, index) => index % 2 === 1),
    ...all.filter((_, index) => index % 2 === 0),
  ];
};

const localizedBuilderAnswer = (value: S5I18nText): S5I18nText => ({
  // 한국어 UI에서는 한국어 정답 노출 방지를 위해 영어 의미를 사용
  ko: normalize(value.en),
  uz: normalize(value.uz),
  en: normalize(value.en),
  ru: normalize(value.ru),
});

const S5_NATIVE_DISTRACTORS: S5I18nOptions = {
  ko: ['already', 'tomorrow', 'alone', 'outside'],
  uz: ['allaqachon', 'ertaga', 'yolg‘iz', 'tashqarida'],
  en: ['already', 'tomorrow', 'alone', 'outside'],
  ru: ['уже', 'завтра', 'один', 'снаружи'],
};

const localizedBuilderOptions = (answer: S5I18nText): S5I18nOptions => ({
  ko: koreanChipOptions(answer.ko, S5_NATIVE_DISTRACTORS.ko),
  uz: koreanChipOptions(answer.uz, S5_NATIVE_DISTRACTORS.uz),
  en: koreanChipOptions(answer.en, S5_NATIVE_DISTRACTORS.en),
  ru: koreanChipOptions(answer.ru, S5_NATIVE_DISTRACTORS.ru),
});

const base = (
  lessonCategory: LessonCategory,
  difficulty: number,
  tags: string[],
  answerTranslation: S5I18nText,
  hint: S5I18nText = H.context,
  xpReward = 25,
) => ({
  level: QuestionLevel.LEVEL_5,
  lessonCategory,
  acceptedAnswers: [],
  answerTranslation,
  hint,
  difficulty,
  tags,
  xpReward,
  isActive: true,
});

const readingQuiz = ({
  instruction,
  passageTitle,
  passage,
  options,
  answer,
  answerTranslation,
  hint = H.context,
  tags,
  difficulty = 4,
}: {
  instruction: S5I18nText;
  passageTitle?: string;
  passage: string;
  options: string[];
  answer: string;
  answerTranslation: S5I18nText;
  hint?: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'reading_quiz',
  instruction,
  passageTitle: passageTitle ?? '',
  passage,
  options,
  answer,
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['reading-quiz', ...tags],
    answerTranslation,
    hint,
    30,
  ),
});

const sentenceBuilder = ({
  answer,
  translation,
  distractors,
  tags,
  difficulty = 4,
}: {
  answer: string;
  translation: S5I18nText;
  distractors: string[];
  tags: string[];
  difficulty?: number;
}) => {
  const answerI18n = localizedBuilderAnswer(translation);

  return {
    type: 'sentence_builder',
    instruction: I.listenNative,
    audioText: answer,
    options: koreanChipOptions(answer, distractors),
    optionsI18n: localizedBuilderOptions(answerI18n),
    answer,
    answerI18n,
    ...base(
      LessonCategory.LISTENING,
      difficulty,
      ['sentence-builder', ...tags],
      translation,
      H.listen,
      25,
    ),
  };
};

const wordArrange = ({
  answer,
  translation,
  distractors,
  tags,
  difficulty = 4,
}: {
  answer: string;
  translation: S5I18nText;
  distractors: string[];
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'word_arrange',
  instruction: I.arrange,
  audioText: answer,
  options: koreanChipOptions(answer, distractors),
  answer,
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['word-arrange', ...tags],
    translation,
    H.chips,
    25,
  ),
});

const translateBuilder = ({
  instruction,
  answer,
  translation,
  distractors,
  tags,
  difficulty = 4,
}: {
  instruction: S5I18nText;
  answer: string;
  translation: S5I18nText;
  distractors: string[];
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'translate_builder',
  instruction,
  options: koreanChipOptions(answer, distractors),
  answer,
  ...base(
    LessonCategory.CONVERSATION,
    difficulty,
    ['translate-builder', ...tags],
    translation,
    H.chips,
    30,
  ),
});

const replyBuilder = ({
  npcText,
  answer,
  translation,
  distractors,
  tags,
  difficulty = 5,
}: {
  npcText: string;
  answer: string;
  translation: S5I18nText;
  distractors: string[];
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'reply_builder',
  instruction: I.reply,
  npcText,
  options: koreanChipOptions(answer, distractors),
  answer,
  ...base(
    LessonCategory.CONVERSATION,
    difficulty,
    ['reply-builder', ...tags],
    translation,
    H.reply,
    35,
  ),
});

const shuffledBlankOptions = (
  answers: string[],
  distractors: string[],
): string[] => {
  const extras = distractors.filter((item) => !answers.includes(item));

  const all = [...answers, ...extras];

  return [
    ...all.filter((_, index) => index % 2 === 1),
    ...all.filter((_, index) => index % 2 === 0),
  ];
};

const multiBlank = ({
  sentenceTemplate,
  blankAnswers,
  distractors,
  translation,
  tags,
  difficulty = 4,
}: {
  sentenceTemplate: string;
  blankAnswers: string[];
  distractors: string[];
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'fill_in_blank',
  instruction: I.fill,
  sentenceTemplate,
  blankAnswers,
  options: shuffledBlankOptions(blankAnswers, distractors),
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['multi-blank', ...tags],
    translation,
    H.context,
    25,
  ),
});

const clozePassage = ({
  passage,
  blankAnswers,
  distractors,
  translation,
  tags,
  difficulty = 5,
}: {
  passage: string;
  blankAnswers: string[];
  distractors: string[];
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'cloze_passage',
  instruction: I.cloze,
  passage,
  blankAnswers,
  options: koreanChipOptions(blankAnswers.join(' '), distractors),
  answer: blankAnswers.join('|'),
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['cloze-passage', ...tags],
    translation,
    H.context,
    35,
  ),
});

const errorHunt = ({
  npcText,
  wrongWord,
  options,
  answer,
  translation,
  hint,
  tags,
  difficulty = 4,
}: {
  npcText: string;
  wrongWord: string;
  options: string[];
  answer: string;
  translation: S5I18nText;
  hint: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'error_hunt',
  instruction: I.error,
  npcText,
  wrongWord,
  options,
  answer,
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['error-hunt', ...tags],
    translation,
    hint,
    30,
  ),
});

const dialogOrder = ({
  dialogLines,
  translation,
  tags,
  difficulty = 5,
}: {
  dialogLines: {
    speaker: 'npc' | 'user';
    text: string;
  }[];
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'dialog_order',
  instruction: I.dialogOrder,
  dialogLines,
  answer: 'all_correct',
  ...base(
    LessonCategory.CONVERSATION,
    difficulty,
    ['dialog-order', ...tags],
    translation,
    H.context,
    40,
  ),
});

const verbTransform = ({
  baseWord,
  targetForm,
  answer,
  options,
  translation,
  tags,
  difficulty = 4,
}: {
  baseWord: string;
  targetForm: string;
  answer: string;
  options: string[];
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'verb_transform',
  instruction: I.transform,
  baseWord,
  targetForm,
  answer,
  options,
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['verb-transform', ...tags],
    translation,
    H.form,
    25,
  ),
});

const listenType = ({
  audioText,
  translation,
  tags,
  difficulty = 5,
}: {
  audioText: string;
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'listen_type',
  instruction: I.listenType,
  audioText,
  answer: audioText,
  grading: {
    mode: 'exact' as const,
    expectedMeaning: translation.en,
    acceptedAnswers: [],
    notes: [
      'This is a Korean dictation exercise. Preserve the wording and the target vocabulary.',
    ],
    tolerance: {
      punctuation: true,
      spacing: false,
      minorTypos: false,
    },
  },
  ...base(
    LessonCategory.LISTENING,
    difficulty,
    ['listen-type', ...tags],
    translation,
    H.listen,
    40,
  ),
});

const listenFill = ({
  audioText,
  sentenceTemplate,
  blankAnswers,
  translation,
  tags,
  difficulty = 5,
}: {
  audioText: string;
  sentenceTemplate: string;
  blankAnswers: string[];
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'listen_fill',
  instruction: I.listenFill,
  audioText,
  sentenceTemplate,
  blankAnswers,
  answer: audioText,
  grading: {
    mode: 'exact' as const,
    expectedMeaning: translation.en,
    acceptedAnswers: [],
    notes: ['Require the dictated vocabulary in every blank.'],
    tolerance: {
      punctuation: true,
      spacing: false,
      minorTypos: false,
    },
  },
  ...base(
    LessonCategory.LISTENING,
    difficulty,
    ['listen-fill', ...tags],
    translation,
    H.listen,
    40,
  ),
});

const typeAnswer = ({
  instruction,
  answer,
  translation,
  tags,
  difficulty = 4,
}: {
  instruction: S5I18nText;
  answer: string;
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'type_answer',
  instruction,
  answer,
  grading: {
    mode: 'exact' as const,
    expectedMeaning: translation.en,
    targetExpressions: [answer],
    acceptedAnswers: [],
    notes: [
      'This is a vocabulary recall item. Require the target Korean word.',
    ],
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
  ...base(
    LessonCategory.VOCABULARY,
    difficulty,
    ['type-answer', ...tags],
    translation,
    H.typing,
    35,
  ),
});

const translateType = ({
  instruction,
  answer,
  translation,
  targetExpressions,
  tags,
  difficulty = 5,
}: {
  instruction: S5I18nText;
  answer: string;
  translation: S5I18nText;
  targetExpressions: string[];
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'translate_type',
  instruction,
  answer,
  grading: {
    mode: 'targetExpression' as const,
    expectedMeaning: translation.en,
    targetExpressions,
    requiredRegister: '해요체',
    acceptedAnswers: [],
    notes: [
      'The meaning may be phrased naturally, but every listed target vocabulary item must be used correctly.',
    ],
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
  ...base(
    LessonCategory.CONVERSATION,
    difficulty,
    ['translate-type', ...tags],
    translation,
    H.typing,
    50,
  ),
});

const speaking = ({
  instruction = I.speak,
  npcText,
  answer,
  translation,
  tags,
  difficulty = 4,
}: {
  instruction?: S5I18nText;
  npcText: string;
  answer: string;
  translation: S5I18nText;
  tags: string[];
  difficulty?: number;
}) => ({
  type: 'speaking',
  instruction,
  npcText,
  audioText: answer,
  answer,
  ...base(
    LessonCategory.CONVERSATION,
    difficulty,
    ['speaking', ...tags],
    translation,
    H.context,
    30,
  ),
});

const wordMatching = ({
  pairs,
  tags,
}: {
  pairs: { korean: string; native: string }[];
  tags: string[];
}) => ({
  type: 'word_matching',
  instruction: I.match,
  answer: '',
  pairs,
  ...base(
    LessonCategory.VOCABULARY,
    4,
    ['word-matching', ...tags],
    EMPTY_I18N,
    H.context,
    20,
  ),
});

const audioMatch = ({
  pairs,
  tags,
}: {
  pairs: { korean: string; native: string }[];
  tags: string[];
}) => ({
  type: 'audio_match',
  instruction: I.audioMatch,
  answer: '',
  pairs,
  ...base(
    LessonCategory.LISTENING,
    4,
    ['audio-match', ...tags],
    EMPTY_I18N,
    H.listen,
    25,
  ),
});

const imageChoice = ({
  answer,
  choices,
  translation,
  hint,
  tags,
}: {
  answer: string;
  choices: {
    text: string;
    label: string;
    emoji: string;
  }[];
  translation: S5I18nText;
  hint: S5I18nText;
  tags: string[];
}) => ({
  type: 'image_choice',
  instruction: I.image,
  answer,
  choices,
  ...base(
    LessonCategory.VOCABULARY,
    4,
    ['image-choice', ...tags],
    translation,
    hint,
    20,
  ),
});

// ═══════════════════════════════════════════════════════════════
// WORDS · NODE 1
// ═══════════════════════════════════════════════════════════════

const S5_UNIT1_NODE1_WORDS = [
  {
    code: 'university-entrance-ceremony',
    korean: '입학식',
    senseKey: 'school-entrance-ceremony',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학교에 새로 들어가는 것을 기념하는 공식 행사',
      uz: 'o‘qishga kirishni nishonlaydigan rasmiy marosim',
      en: 'entrance ceremony',
      ru: 'церемония поступления',
    },
    examples: [
      {
        korean: '신입생들은 오전에 입학식에 참석했습니다.',
        translations: {
          ko: '새로 입학한 학생들은 오전에 입학식에 참석했습니다.',
          uz: 'Yangi talabalar ertalab kirish marosimida qatnashdilar.',
          en: 'The new students attended the entrance ceremony in the morning.',
          ru: 'Новые студенты утром присутствовали на церемонии поступления.',
        },
      },
    ],
    pronunciation: {
      hangul: '입학식',
      romanization: 'iphaksik',
      ttsText: '입학식',
    },
    media: {
      emoji: '🎓',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 입학식',
        uz: 'universitetga kirish marosimi',
        en: 'university entrance ceremony',
        ru: 'церемония поступления в университет',
      },
    },
    tags: ['university-life', 'campus-event'],
    difficulty: 4,
    usageNote: {
      ko: '대학교뿐 아니라 초·중·고등학교에서도 사용해요.',
      uz: 'Bu so‘z universitet bilan birga maktab marosimlari uchun ham ishlatiladi.',
      en: 'It is used for school entrance ceremonies as well as university ceremonies.',
      ru: 'Слово используется и для школьных, и для университетских церемоний.',
    },
    isCore: true,
  },
  {
    code: 'university-orientation',
    korean: '오리엔테이션',
    senseKey: 'new-student-orientation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '새 구성원에게 학교나 기관의 생활과 제도를 안내하는 행사',
      uz: 'yangi a’zolarga muassasa va uning tartiblarini tanishtiradigan tadbir',
      en: 'orientation',
      ru: 'ориентационная встреча',
    },
    examples: [
      {
        korean: '오리엔테이션에서 수강 신청 방법을 안내받았어요.',
        translations: {
          ko: '오리엔테이션에서 수강 신청 방법에 대한 설명을 들었어요.',
          uz: 'Orientatsiyada fanlarga yozilish usulini tushuntirishdi.',
          en: 'I learned how to register for classes at orientation.',
          ru: 'На ориентации мне объяснили, как записываться на занятия.',
        },
      },
    ],
    pronunciation: {
      hangul: '오리엔테이션',
      romanization: 'orienteisyeon',
      ttsText: '오리엔테이션',
    },
    media: {
      emoji: '🧭',
      imageUrl: '',
      imageAlt: {
        ko: '신입생 오리엔테이션',
        uz: 'yangi talabalar orientatsiyasi',
        en: 'new student orientation',
        ru: 'ориентация для новых студентов',
      },
    },
    tags: ['university-life', 'campus-event'],
    difficulty: 4,
    usageNote: {
      ko: '학교나 회사에 새로 들어간 사람을 위한 안내 행사에 자주 써요.',
      uz: 'Ko‘pincha yangi talaba yoki xodimlar uchun tanishtiruv tadbiriga aytiladi.',
      en: 'Commonly used for introductory programs for new students or employees.',
      ru: 'Часто употребляется для вводных мероприятий новых студентов или сотрудников.',
    },
    isCore: true,
  },
  {
    code: 'university-new-student',
    korean: '신입생',
    senseKey: 'newly-enrolled-student',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학교에 새로 입학한 학생',
      uz: 'o‘qishga yangi kirgan talaba',
      en: 'new student; freshman',
      ru: 'новый студент; первокурсник',
    },
    examples: [
      {
        korean: '학생회에서 신입생들에게 학교생활을 안내해 줬어요.',
        translations: {
          ko: '학생회가 새로 들어온 학생들에게 학교생활을 설명해 줬어요.',
          uz: 'Talabalar kengashi yangi talabalarga universitet hayotini tushuntirdi.',
          en: 'The student council explained campus life to the new students.',
          ru: 'Студенческий совет рассказал новым студентам о жизни в университете.',
        },
      },
    ],
    pronunciation: {
      hangul: '신입생',
      romanization: 'sinipsaeng',
      ttsText: '신입생',
    },
    media: {
      emoji: '🧑‍🎓',
      imageUrl: '',
      imageAlt: {
        ko: '대학교에 처음 온 신입생',
        uz: 'universitetga yangi kelgan talaba',
        en: 'new university student',
        ru: 'новый студент университета',
      },
    },
    tags: ['university-life', 'student'],
    difficulty: 4,
    usageNote: {
      ko: '반대말로는 보통 재학생이나 졸업생을 상황에 따라 사용해요.',
      uz: 'Kontekstga qarab unga qarama-qarshi ma’noda hozirgi talaba yoki bitiruvchi ishlatiladi.',
      en: 'Depending on context, it contrasts with a current student or graduate.',
      ru: 'В зависимости от контекста противопоставляется учащемуся старших курсов или выпускнику.',
    },
    isCore: true,
  },
  {
    code: 'event-welcome-party',
    korean: '환영회',
    senseKey: 'welcome-gathering',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '새로 온 사람을 환영하기 위해 여는 모임',
      uz: 'yangi kelgan odamni kutib olish uchun o‘tkaziladigan yig‘in',
      en: 'welcome party',
      ru: 'приветственная встреча',
    },
    examples: [
      {
        korean: '새 교환학생들을 위한 환영회가 열렸어요.',
        translations: {
          ko: '새 교환학생들을 반갑게 맞이하기 위한 모임이 열렸어요.',
          uz: 'Yangi almashinuv talabalari uchun kutib olish kechasi bo‘ldi.',
          en: 'A welcome party was held for the new exchange students.',
          ru: 'Для новых студентов по обмену устроили приветственную встречу.',
        },
      },
    ],
    pronunciation: {
      hangul: '환영회',
      romanization: 'hwanyeonghoe',
      ttsText: '환영회',
    },
    media: {
      emoji: '🎉',
      imageUrl: '',
      imageAlt: {
        ko: '사람들이 함께하는 환영회',
        uz: 'odamlar qatnashayotgan kutib olish kechasi',
        en: 'welcome party with a group of people',
        ru: 'приветственная встреча с группой людей',
      },
    },
    tags: ['campus-event', 'social-event'],
    difficulty: 4,
    usageNote: {
      ko: '신입생 환영회, 신입 사원 환영회처럼 누구를 환영하는지 앞에 붙여 말해요.',
      uz: 'Kim kutib olinayotganini oldidan qo‘shib aytish mumkin.',
      en: 'The person or group being welcomed is often placed before 환영회.',
      ru: 'Перед 환영회 часто указывают, кого именно приветствуют.',
    },
    isCore: true,
  },
  {
    code: 'university-new-student-welcome-party',
    korean: '신입생 환영회',
    senseKey: 'new-student-welcome-event',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '새로 입학한 학생들을 환영하기 위한 학교 행사',
      uz: 'yangi talabalarni kutib olish uchun universitet tadbiri',
      en: 'welcome party for new students',
      ru: 'приветственная встреча для новых студентов',
    },
    examples: [
      {
        korean: '금요일 저녁에 신입생 환영회에 가려고 해요.',
        translations: {
          ko: '금요일 저녁에 새 학생들을 위한 환영회에 갈 계획이에요.',
          uz: 'Juma kuni kechqurun yangi talabalar kutib olish kechasiga bormoqchiman.',
          en: 'I am planning to go to the new student welcome party on Friday evening.',
          ru: 'В пятницу вечером я собираюсь пойти на встречу для новых студентов.',
        },
      },
    ],
    pronunciation: {
      hangul: '신입생 환영회',
      romanization: 'sinipsaeng hwanyeonghoe',
      ttsText: '신입생 환영회',
    },
    media: {
      emoji: '🥳',
      imageUrl: '',
      imageAlt: {
        ko: '신입생들을 위한 환영 행사',
        uz: 'yangi talabalar uchun kutib olish tadbiri',
        en: 'welcome event for new students',
        ru: 'приветственное мероприятие для новых студентов',
      },
    },
    tags: ['university-life', 'campus-event', 'new-student'],
    difficulty: 4,
    usageNote: {
      ko: '대학교 새 학기 초에 자주 볼 수 있는 표현이에요.',
      uz: 'Universitetning yangi semestri boshida tez-tez uchraydigan ibora.',
      en: 'A common expression at the beginning of a university semester.',
      ru: 'Частое выражение в начале университетского семестра.',
    },
    isCore: true,
  },
  {
    code: 'university-club',
    korean: '동아리',
    senseKey: 'student-club',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '같은 관심이나 취미를 가진 사람들이 함께 활동하는 모임',
      uz: 'bir xil qiziqish yoki hobbi bilan shug‘ullanadigan to‘garak',
      en: 'club',
      ru: 'кружок; клуб',
    },
    examples: [
      {
        korean: '사진 동아리에 가입해서 주말마다 같이 사진을 찍어요.',
        translations: {
          ko: '사진을 좋아하는 동아리에 들어가 주말마다 함께 사진을 찍어요.',
          uz: 'Fotosurat klubiga qo‘shilib, har hafta oxirida birga suratga olamiz.',
          en: 'I joined a photography club and take pictures together every weekend.',
          ru: 'Я вступил в фотоклуб, и по выходным мы вместе фотографируем.',
        },
      },
    ],
    pronunciation: {
      hangul: '동아리',
      romanization: 'dongari',
      ttsText: '동아리',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: {
        ko: '동아리 활동을 하는 학생들',
        uz: 'to‘garakda faoliyat qilayotgan talabalar',
        en: 'students participating in a club',
        ru: 'студенты на клубном занятии',
      },
    },
    tags: ['university-life', 'club'],
    difficulty: 4,
    usageNote: {
      ko: '학교 안의 취미·학술·운동 모임에 폭넓게 사용해요.',
      uz: 'Maktab yoki universitetdagi hobbi, ilmiy va sport guruhlariga keng qo‘llanadi.',
      en: 'Used broadly for hobby, academic, and sports clubs at school.',
      ru: 'Широко употребляется для учебных, спортивных и хобби-клубов.',
    },
    isCore: true,
  },
  {
    code: 'event-festival',
    korean: '축제',
    senseKey: 'festival-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '여러 사람이 함께 즐기기 위해 여는 큰 행사',
      uz: 'ko‘p odamlar birga zavqlanadigan katta bayram tadbiri',
      en: 'festival',
      ru: 'фестиваль',
    },
    examples: [
      {
        korean: '학교 축제 기간에는 공연과 여러 행사가 열려요.',
        translations: {
          ko: '학교 축제 때는 공연과 다양한 행사가 열려요.',
          uz: 'Universitet festivali paytida konsertlar va turli tadbirlar o‘tkaziladi.',
          en: 'Performances and many events are held during the school festival.',
          ru: 'Во время университетского фестиваля проходят выступления и разные мероприятия.',
        },
      },
    ],
    pronunciation: {
      hangul: '축제',
      romanization: 'chukje',
      ttsText: '축제',
    },
    media: {
      emoji: '🎪',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 축제',
        uz: 'universitet festivali',
        en: 'university festival',
        ru: 'университетский фестиваль',
      },
    },
    tags: ['campus-event', 'festival'],
    difficulty: 4,
    usageNote: {
      ko: '학교 축제뿐 아니라 지역·문화·음식 축제에도 사용해요.',
      uz: 'Universitet, shahar, madaniyat va taom festivallariga ham ishlatiladi.',
      en: 'Also used for regional, cultural, and food festivals.',
      ru: 'Также используется для городских, культурных и гастрономических фестивалей.',
    },
    isCore: true,
  },
  {
    code: 'university-graduation-ceremony',
    korean: '졸업식',
    senseKey: 'school-graduation-ceremony',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학교 과정을 마친 것을 기념하는 공식 행사',
      uz: 'o‘qishni tugatishni nishonlaydigan rasmiy marosim',
      en: 'graduation ceremony',
      ru: 'выпускная церемония',
    },
    examples: [
      {
        korean: '졸업식이 끝난 뒤에 가족과 사진을 찍었어요.',
        translations: {
          ko: '졸업식이 끝난 후 가족과 기념사진을 찍었어요.',
          uz: 'Bitiruv marosimidan keyin oilam bilan suratga tushdim.',
          en: 'After the graduation ceremony, I took pictures with my family.',
          ru: 'После выпускной церемонии я сфотографировался с семьёй.',
        },
      },
    ],
    pronunciation: {
      hangul: '졸업식',
      romanization: 'joreopsik',
      ttsText: '졸업식',
    },
    media: {
      emoji: '🎓',
      imageUrl: '',
      imageAlt: {
        ko: '학사모를 쓴 졸업생들',
        uz: 'bitiruv qalpog‘ini kiygan talabalar',
        en: 'graduates wearing graduation caps',
        ru: 'выпускники в академических шапочках',
      },
    },
    tags: ['university-life', 'campus-event'],
    difficulty: 4,
    usageNote: {
      ko: '입학식과 반대되는 학교생활의 마지막 공식 행사예요.',
      uz: 'Bu o‘qish hayotining yakuniy rasmiy marosimidir.',
      en: 'It is the formal ceremony marking the end of a course of study.',
      ru: 'Это официальная церемония, завершающая период обучения.',
    },
    isCore: true,
  },
  {
    code: 'campus-bulletin-board',
    korean: '게시판',
    senseKey: 'notice-board',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '공지나 정보를 붙이거나 올려 놓는 곳',
      uz: 'e’lon va ma’lumotlar joylashtiriladigan doska yoki sahifa',
      en: 'bulletin board; notice board',
      ru: 'доска объявлений',
    },
    examples: [
      {
        korean: '게시판에서 이번 주 행사 일정을 확인했어요.',
        translations: {
          ko: '게시판을 보고 이번 주 행사 일정을 확인했어요.',
          uz: 'E’lonlar doskasidan shu haftadagi tadbirlar jadvalini tekshirdim.',
          en: 'I checked this week’s event schedule on the bulletin board.',
          ru: 'Я посмотрел расписание мероприятий на этой неделе на доске объявлений.',
        },
      },
    ],
    pronunciation: {
      hangul: '게시판',
      romanization: 'gesipan',
      ttsText: '게시판',
    },
    media: {
      emoji: '📌',
      imageUrl: '',
      imageAlt: {
        ko: '학교 게시판에 붙은 공지',
        uz: 'universitet e’lonlar doskasidagi xabarlar',
        en: 'notices on a campus bulletin board',
        ru: 'объявления на университетской доске',
      },
    },
    tags: ['campus', 'notice'],
    difficulty: 4,
    usageNote: {
      ko: '실제 벽 게시판과 인터넷 게시판 모두에 사용할 수 있어요.',
      uz: 'Jismoniy doska va internet forumiga ham ishlatilishi mumkin.',
      en: 'It can refer to both a physical notice board and an online board.',
      ru: 'Может обозначать как обычную, так и электронную доску объявлений.',
    },
    isCore: true,
  },
  {
    code: 'campus-auditorium',
    korean: '강당',
    senseKey: 'auditorium',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '많은 사람이 모여 행사나 강연을 할 수 있는 큰 공간',
      uz: 'ko‘p odam yig‘ilib tadbir yoki ma’ruza o‘tkazadigan katta zal',
      en: 'auditorium',
      ru: 'актовый зал; аудитория',
    },
    examples: [
      {
        korean: '오리엔테이션은 학생회관 강당에서 열립니다.',
        translations: {
          ko: '오리엔테이션 장소는 학생회관 안의 강당입니다.',
          uz: 'Orientatsiya talabalar markazining katta zalida bo‘ladi.',
          en: 'The orientation will be held in the student center auditorium.',
          ru: 'Ориентация пройдёт в актовом зале студенческого центра.',
        },
      },
    ],
    pronunciation: {
      hangul: '강당',
      romanization: 'gangdang',
      ttsText: '강당',
    },
    media: {
      emoji: '🏛️',
      imageUrl: '',
      imageAlt: {
        ko: '많은 좌석이 있는 강당',
        uz: 'ko‘p o‘rindiqli katta zal',
        en: 'auditorium with many seats',
        ru: 'актовый зал с множеством мест',
      },
    },
    tags: ['campus', 'place'],
    difficulty: 4,
    usageNote: {
      ko: '공연·설명회·입학식 같은 큰 행사의 장소로 자주 나와요.',
      uz: 'Ko‘pincha marosim, taqdimot va katta tadbirlar joyi sifatida uchraydi.',
      en: 'Often appears as the venue for ceremonies, presentations, and large events.',
      ru: 'Часто служит местом проведения церемоний и крупных мероприятий.',
    },
    isCore: true,
  },
  {
    code: 'event-date-time',
    korean: '일시',
    senseKey: 'event-date-and-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '어떤 일이 열리는 날짜와 시간',
      uz: 'tadbir o‘tkaziladigan sana va vaqt',
      en: 'date and time',
      ru: 'дата и время',
    },
    examples: [
      {
        korean: '신청하기 전에 행사 일시를 다시 확인하세요.',
        translations: {
          ko: '신청 전에 행사의 날짜와 시간을 다시 확인하세요.',
          uz: 'Ro‘yxatdan o‘tishdan oldin tadbir sanasi va vaqtini yana tekshiring.',
          en: 'Check the event date and time again before registering.',
          ru: 'Перед регистрацией ещё раз проверьте дату и время мероприятия.',
        },
      },
    ],
    pronunciation: {
      hangul: '일시',
      romanization: 'ilsi',
      ttsText: '일시',
    },
    media: {
      emoji: '🗓️',
      imageUrl: '',
      imageAlt: {
        ko: '날짜와 시간이 표시된 일정표',
        uz: 'sana va vaqt ko‘rsatilgan jadval',
        en: 'schedule showing a date and time',
        ru: 'расписание с датой и временем',
      },
    },
    tags: ['event-info', 'schedule'],
    difficulty: 4,
    usageNote: {
      ko: '공지문이나 행사 안내에서 매우 자주 쓰는 공식적인 표현이에요.',
      uz: 'E’lon va tadbir ma’lumotlarida juda ko‘p ishlatiladigan rasmiy so‘z.',
      en: 'A formal word commonly used in notices and event information.',
      ru: 'Официальное слово, часто встречающееся в объявлениях.',
    },
    isCore: true,
  },
  {
    code: 'event-place',
    korean: '장소',
    senseKey: 'event-location',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '일이나 행사가 이루어지는 곳',
      uz: 'ish yoki tadbir bo‘ladigan joy',
      en: 'place; venue',
      ru: 'место проведения',
    },
    examples: [
      {
        korean: '비가 오면 행사 장소가 강당으로 바뀝니다.',
        translations: {
          ko: '비가 올 경우 행사를 하는 곳이 강당으로 변경됩니다.',
          uz: 'Yomg‘ir yog‘sa, tadbir joyi katta zalga o‘zgaradi.',
          en: 'If it rains, the event venue will change to the auditorium.',
          ru: 'Если пойдёт дождь, место проведения перенесут в актовый зал.',
        },
      },
    ],
    pronunciation: {
      hangul: '장소',
      romanization: 'jangso',
      ttsText: '장소',
    },
    media: {
      emoji: '📍',
      imageUrl: '',
      imageAlt: {
        ko: '지도에 표시된 행사 장소',
        uz: 'xaritada belgilangan tadbir joyi',
        en: 'event location marked on a map',
        ru: 'место мероприятия на карте',
      },
    },
    tags: ['event-info', 'place'],
    difficulty: 4,
    usageNote: {
      ko: '행사 안내에서는 일시와 장소가 함께 나오는 경우가 많아요.',
      uz: 'Tadbir e’lonlarida ko‘pincha sana-vaqt bilan birga keladi.',
      en: 'In event notices it often appears together with the date and time.',
      ru: 'В объявлениях часто указывается вместе с датой и временем.',
    },
    isCore: true,
  },
  {
    code: 'event-writing-contest',
    korean: '글쓰기 대회',
    senseKey: 'writing-contest',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '글을 써서 실력을 겨루는 대회',
      uz: 'yozish mahoratini sinaydigan tanlov',
      en: 'writing contest',
      ru: 'конкурс письменных работ',
    },
    examples: [
      {
        korean: '외국인 학생을 위한 글쓰기 대회에 참가했어요.',
        translations: {
          ko: '외국인 학생 대상 글쓰기 대회에 참가했어요.',
          uz: 'Xorijiy talabalar uchun yozuv tanlovida qatnashdim.',
          en: 'I took part in a writing contest for international students.',
          ru: 'Я участвовал в конкурсе письменных работ для иностранных студентов.',
        },
      },
    ],
    pronunciation: {
      hangul: '글쓰기 대회',
      romanization: 'geulsseugi daehoe',
      ttsText: '글쓰기 대회',
    },
    media: {
      emoji: '✍️',
      imageUrl: '',
      imageAlt: {
        ko: '글쓰기 대회에서 글을 쓰는 참가자',
        uz: 'yozuv tanlovida yozayotgan ishtirokchi',
        en: 'participant writing in a writing contest',
        ru: 'участник конкурса письменных работ',
      },
    },
    tags: ['campus-event', 'contest'],
    difficulty: 4,
    usageNote: {
      ko: '대회 앞에 한국어, 외국인, 대학생 같은 참가 대상을 붙일 수 있어요.',
      uz: 'Oldiga koreys tili, xorijiy talaba yoki talaba kabi aniqlovchilar qo‘shilishi mumkin.',
      en: 'The target group or subject can be placed before 대회.',
      ru: 'Перед 대회 можно указывать тему или группу участников.',
    },
    isCore: true,
  },
  {
    code: 'event-singing-contest',
    korean: '노래자랑',
    senseKey: 'singing-contest',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '여러 사람이 노래 실력을 보여 주고 즐기는 행사',
      uz: 'odamlar qo‘shiq aytish mahoratini ko‘rsatadigan tanlov',
      en: 'singing contest',
      ru: 'конкурс песни',
    },
    examples: [
      {
        korean: '학교 축제에서 학생 노래자랑이 열립니다.',
        translations: {
          ko: '학교 축제 때 학생들이 참여하는 노래 대회가 열립니다.',
          uz: 'Universitet festivalida talabalar qo‘shiq tanlovi bo‘ladi.',
          en: 'A student singing contest will be held during the school festival.',
          ru: 'На университетском фестивале пройдёт студенческий конкурс песни.',
        },
      },
    ],
    pronunciation: {
      hangul: '노래자랑',
      romanization: 'noraejarang',
      ttsText: '노래자랑',
    },
    media: {
      emoji: '🎤',
      imageUrl: '',
      imageAlt: {
        ko: '무대에서 노래하는 참가자',
        uz: 'sahnada qo‘shiq aytayotgan ishtirokchi',
        en: 'contestant singing on stage',
        ru: 'участник, поющий на сцене',
      },
    },
    tags: ['campus-event', 'contest'],
    difficulty: 4,
    usageNote: {
      ko: '일반적인 가창 경연보다 친근하고 축제 분위기의 행사에 많이 써요.',
      uz: 'Rasmiy vokal musobaqasidan ko‘ra bayramona va norasmiy tanlovlarda ko‘proq ishlatiladi.',
      en: 'Often refers to a friendly festival-style singing competition.',
      ru: 'Обычно обозначает дружеский конкурс песни в праздничной атмосфере.',
    },
    isCore: true,
  },
  {
    code: 'event-concert',
    korean: '음악회',
    senseKey: 'music-concert',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '음악을 연주하거나 노래하는 공연',
      uz: 'musiqa ijro etiladigan konsert',
      en: 'concert',
      ru: 'концерт',
    },
    examples: [
      {
        korean: '저녁 음악회는 학생회관 앞에서 시작합니다.',
        translations: {
          ko: '저녁에 하는 음악 공연은 학생회관 앞에서 시작합니다.',
          uz: 'Kechki konsert talabalar markazi oldida boshlanadi.',
          en: 'The evening concert begins in front of the student center.',
          ru: 'Вечерний концерт начнётся перед студенческим центром.',
        },
      },
    ],
    pronunciation: {
      hangul: '음악회',
      romanization: 'eumakhoe',
      ttsText: '음악회',
    },
    media: {
      emoji: '🎼',
      imageUrl: '',
      imageAlt: {
        ko: '무대에서 열리는 음악회',
        uz: 'sahnadagi konsert',
        en: 'concert on a stage',
        ru: 'концерт на сцене',
      },
    },
    tags: ['campus-event', 'performance'],
    difficulty: 4,
    usageNote: {
      ko: '노래자랑은 참가자 중심의 대회이고 음악회는 공연 자체가 중심이에요.',
      uz: '노래자랑 tanlovga, 음악회 esa musiqa ijrosining o‘ziga ko‘proq urg‘u beradi.',
      en: '노래자랑 is a contest, while 음악회 focuses on the musical performance itself.',
      ru: '노래자랑 — конкурс, а 음악회 — музыкальное выступление.',
    },
    isCore: true,
  },
  {
    code: 'event-prize-money',
    korean: '상금',
    senseKey: 'contest-prize-money',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '대회나 경기에서 잘한 사람에게 주는 돈',
      uz: 'tanlov yoki musobaqada g‘olibga beriladigan pul mukofoti',
      en: 'prize money',
      ru: 'денежный приз',
    },
    examples: [
      {
        korean: '글쓰기 대회 우승자에게 상금이 지급됩니다.',
        translations: {
          ko: '글쓰기 대회에서 1등을 한 사람에게 돈으로 된 상을 줍니다.',
          uz: 'Yozuv tanlovi g‘olibiga pul mukofoti beriladi.',
          en: 'Prize money is awarded to the winner of the writing contest.',
          ru: 'Победителю конкурса письменных работ вручается денежный приз.',
        },
      },
    ],
    pronunciation: {
      hangul: '상금',
      romanization: 'sanggeum',
      ttsText: '상금',
    },
    media: {
      emoji: '🏆',
      imageUrl: '',
      imageAlt: {
        ko: '대회 상금과 트로피',
        uz: 'tanlov mukofoti va kubogi',
        en: 'contest prize money and trophy',
        ru: 'денежный приз и кубок',
      },
    },
    tags: ['contest', 'prize'],
    difficulty: 4,
    usageNote: {
      ko: '상품은 물건으로 된 상이고 상금은 돈으로 된 상이에요.',
      uz: '상품 buyum ko‘rinishidagi mukofot, 상금 esa pul mukofotidir.',
      en: '상품 is a prize item, while 상금 specifically means prize money.',
      ru: '상품 — приз-вещь, а 상금 — именно денежный приз.',
    },
    isCore: false,
  },
  {
    code: 'event-opportunity',
    korean: '기회',
    senseKey: 'chance-opportunity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '어떤 일을 해 볼 수 있는 좋은 때나 가능성',
      uz: 'biror ishni qilish uchun qulay imkoniyat',
      en: 'opportunity; chance',
      ru: 'возможность; шанс',
    },
    examples: [
      {
        korean: '환영회는 다른 학과 학생을 만날 좋은 기회예요.',
        translations: {
          ko: '환영회에서는 다른 학과 학생을 만날 가능성이 많아요.',
          uz: 'Kutib olish kechasi boshqa fakultet talabalarini uchratish uchun yaxshi imkoniyat.',
          en: 'The welcome party is a good opportunity to meet students from other departments.',
          ru: 'Приветственная встреча — хорошая возможность познакомиться со студентами других факультетов.',
        },
      },
    ],
    pronunciation: {
      hangul: '기회',
      romanization: 'gihoe',
      ttsText: '기회',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: {
        ko: '새로운 기회를 나타내는 열린 문',
        uz: 'yangi imkoniyatni bildiradigan ochiq eshik',
        en: 'open door representing an opportunity',
        ru: 'открытая дверь как символ возможности',
      },
    },
    tags: ['abstract', 'opportunity'],
    difficulty: 4,
    usageNote: {
      ko: '`좋은 기회`, `기회가 있다`, `기회를 얻다`처럼 많이 사용해요.',
      uz: '`yaxshi imkoniyat`, `imkoniyat bor`, `imkoniyatga ega bo‘lmoq` kabi ishlatiladi.',
      en: 'Common combinations include 좋은 기회, 기회가 있다, and 기회를 얻다.',
      ru: 'Часто употребляется в сочетаниях 좋은 기회, 기회가 있다, 기회를 얻다.',
    },
    isCore: true,
  },
  {
    code: 'campus-parking-lot',
    korean: '주차장',
    senseKey: 'parking-area',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '자동차를 세워 두는 장소',
      uz: 'avtomobillar qo‘yiladigan joy',
      en: 'parking lot',
      ru: 'парковка',
    },
    examples: [
      {
        korean: '행사 당일에는 운동장 옆 주차장을 이용할 수 있어요.',
        translations: {
          ko: '행사가 있는 날에는 운동장 옆에 차를 세울 수 있어요.',
          uz: 'Tadbir kuni stadion yonidagi avtoturargohdan foydalanish mumkin.',
          en: 'You can use the parking lot beside the field on the day of the event.',
          ru: 'В день мероприятия можно пользоваться парковкой рядом со спортивной площадкой.',
        },
      },
    ],
    pronunciation: {
      hangul: '주차장',
      romanization: 'juchajang',
      ttsText: '주차장',
    },
    media: {
      emoji: '🅿️',
      imageUrl: '',
      imageAlt: {
        ko: '자동차가 세워진 주차장',
        uz: 'mashinalar turgan avtoturargoh',
        en: 'parking lot with cars',
        ru: 'парковка с автомобилями',
      },
    },
    tags: ['campus', 'place'],
    difficulty: 4,
    usageNote: {
      ko: '공지문에서 `주차장 이용`, `주차 금지` 같은 표현과 자주 나와요.',
      uz: 'E’lonlarda avtoturargohdan foydalanish yoki to‘xtash taqiqi bilan tez-tez uchraydi.',
      en: 'Often appears in notices about parking availability or restrictions.',
      ru: 'Часто встречается в объявлениях о парковке и её ограничениях.',
    },
    isCore: false,
  },
  {
    code: 'service-provide',
    korean: '제공하다',
    senseKey: 'provide-give-service',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '필요한 물건이나 서비스, 정보를 사용할 수 있게 주다',
      uz: 'kerakli narsa, xizmat yoki ma’lumotni taqdim etmoq',
      en: 'to provide',
      ru: 'предоставлять',
    },
    examples: [
      {
        korean: '행사 참가자에게 점심과 음료를 제공합니다.',
        translations: {
          ko: '행사에 참가한 사람들에게 점심과 음료를 줍니다.',
          uz: 'Tadbir ishtirokchilariga tushlik va ichimlik taqdim etiladi.',
          en: 'Lunch and drinks are provided to event participants.',
          ru: 'Участникам мероприятия предоставляют обед и напитки.',
        },
      },
    ],
    pronunciation: {
      hangul: '제공하다',
      romanization: 'jegonghada',
      ttsText: '제공하다',
    },
    media: {
      emoji: '🎁',
      imageUrl: '',
      imageAlt: {
        ko: '참가자에게 필요한 물품을 제공하는 모습',
        uz: 'ishtirokchiga kerakli narsalar berilayotgan holat',
        en: 'providing supplies to a participant',
        ru: 'выдача необходимых материалов участнику',
      },
    },
    tags: ['event-info', 'service'],
    difficulty: 4,
    usageNote: {
      ko: '음식, 정보, 서비스, 기회 등 다양한 명사와 함께 사용해요.',
      uz: 'Ovqat, ma’lumot, xizmat va imkoniyat kabi ko‘plab so‘zlar bilan ishlatiladi.',
      en: 'Used with food, information, services, opportunities, and many other nouns.',
      ru: 'Употребляется с едой, информацией, услугами, возможностями и другими существительными.',
    },
    isCore: false,
  },
  {
    code: 'event-attend',
    korean: '참석하다',
    senseKey: 'attend-event-meeting',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '모임이나 행사에 가서 그 자리에 함께하다',
      uz: 'yig‘ilish yoki tadbirga borib qatnashmoq',
      en: 'to attend',
      ru: 'присутствовать; посещать',
    },
    examples: [
      {
        korean: '시간이 맞으면 신입생 환영회에 참석하려고 해요.',
        translations: {
          ko: '시간이 가능하면 신입생 환영회에 갈 생각이에요.',
          uz: 'Vaqtim mos kelsa, yangi talabalar kutib olish kechasida qatnashmoqchiman.',
          en: 'If the time works, I plan to attend the new student welcome party.',
          ru: 'Если время подойдёт, я собираюсь посетить встречу новых студентов.',
        },
      },
    ],
    pronunciation: {
      hangul: '참석하다',
      romanization: 'chamseokhada',
      ttsText: '참석하다',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: {
        ko: '행사에 참석한 사람들',
        uz: 'tadbirda qatnashayotgan odamlar',
        en: 'people attending an event',
        ru: 'люди, присутствующие на мероприятии',
      },
    },
    tags: ['event', 'participation'],
    difficulty: 4,
    usageNote: {
      ko: '회의·수업·행사처럼 정해진 자리에 가는 상황에서 자주 사용해요.',
      uz: 'Yig‘ilish, dars yoki tadbirga borish haqida ko‘p ishlatiladi.',
      en: 'Commonly used for meetings, classes, ceremonies, and organized events.',
      ru: 'Часто употребляется с собраниями, занятиями и официальными мероприятиями.',
    },
    isCore: true,
  },
  {
    code: 'university-senior-student',
    korean: '선배',
    senseKey: 'senior-in-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '같은 학교나 조직에 자신보다 먼저 들어온 사람',
      uz: 'bir xil maktab yoki tashkilotga sizdan oldin kirgan odam',
      en: 'senior; more experienced member',
      ru: 'старший товарищ; старшекурсник',
    },
    examples: [
      {
        korean: '선배에게 어떤 동아리가 좋은지 물어봤어요.',
        translations: {
          ko: '학교에 먼저 들어온 선배에게 좋은 동아리를 추천해 달라고 했어요.',
          uz: 'Yuqori kursdagi talabadan qaysi klub yaxshi ekanini so‘radim.',
          en: 'I asked a senior which club was good.',
          ru: 'Я спросил старшекурсника, какой клуб хороший.',
        },
      },
    ],
    pronunciation: {
      hangul: '선배',
      romanization: 'seonbae',
      ttsText: '선배',
    },
    media: {
      emoji: '🧑‍🏫',
      imageUrl: '',
      imageAlt: {
        ko: '신입생에게 학교생활을 알려 주는 선배',
        uz: 'yangi talabaga universitet hayotini tushuntirayotgan yuqori kurs talabasi',
        en: 'senior student helping a new student',
        ru: 'старшекурсник, помогающий новому студенту',
      },
    },
    tags: ['university-life', 'relationship'],
    difficulty: 4,
    usageNote: {
      ko: '나이보다 같은 학교·직장 등에 먼저 들어왔는지가 중요해요.',
      uz: 'Bu so‘zda yoshdan ko‘ra maktab yoki ishga kim oldin kirgani muhim.',
      en: 'It is based on joining the same school or organization earlier, not simply on age.',
      ru: 'Значение связано не с возрастом, а с тем, кто раньше пришёл в школу или организацию.',
    },
    isCore: true,
  },
  {
    code: 'expression-be-helpful',
    korean: '도움이 되다',
    senseKey: 'be-helpful-useful',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '어떤 사람이나 일에 좋은 영향을 주거나 유용하다',
      uz: 'biror kishiga yoki ishga foydali bo‘lmoq',
      en: 'to be helpful; to be useful',
      ru: 'быть полезным',
    },
    examples: [
      {
        korean: '오리엔테이션은 신입생이 학교를 이해하는 데 도움이 돼요.',
        translations: {
          ko: '오리엔테이션을 들으면 신입생이 학교를 이해하기 쉬워져요.',
          uz: 'Orientatsiya yangi talabalarga universitetni tushunishda yordam beradi.',
          en: 'Orientation helps new students understand the university.',
          ru: 'Ориентация помогает новым студентам лучше понять университет.',
        },
      },
    ],
    pronunciation: {
      hangul: '도움이 되다',
      romanization: 'doumi doeda',
      ttsText: '도움이 되다',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: {
        ko: '한 사람이 다른 사람을 돕는 모습',
        uz: 'bir odam boshqasiga yordam berayotgan holat',
        en: 'one person helping another',
        ru: 'один человек помогает другому',
      },
    },
    tags: ['expression', 'help'],
    difficulty: 4,
    usageNote: {
      ko: '`N에 도움이 되다`, `V-는 데 도움이 되다` 형태로 자주 사용해요.',
      uz: 'Ko‘pincha `N에 도움이 되다` yoki `V-는 데 도움이 되다` shaklida ishlatiladi.',
      en: 'Commonly used as `N에 도움이 되다` or `V-는 데 도움이 되다`.',
      ru: 'Часто употребляется в формах `N에 도움이 되다` и `V-는 데 도움이 되다`.',
    },
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

// ═══════════════════════════════════════════════════════════════
// QUESTIONS · NODE 1
// ═══════════════════════════════════════════════════════════════

const S5_UNIT1_BASE_QUESTIONS = {
  // ─────────────────────────────────────────────────────────────
  // Lesson 1 · 새 학기에는 어떤 행사가 있어요?
  // 001 ~ 020
  // ─────────────────────────────────────────────────────────────

  s5u1_001_reading_quiz: readingQuiz({
    instruction: L(
      '민지가 새로 입학한 학생이라면 월요일에 가장 먼저 가야 할 행사를 고르세요.',
      'Minji yangi talaba bo‘lsa, dushanba kuni birinchi borishi kerak bo‘lgan tadbirni tanlang.',
      'If Minji is a newly enrolled student, choose the event she should attend first on Monday.',
      'Если Минджи — новая студентка, выберите мероприятие, на которое ей прежде всего нужно пойти в понедельник.',
    ),
    passageTitle: '민지의 첫 주 일정',
    passage:
      '민지는 이번 학기에 대학교에 처음 들어왔습니다. 월요일 오전에는 새 학생들이 학교생활을 시작하는 공식 행사가 있고, 오후에는 학교 시설과 수강 방법을 설명하는 행사가 있습니다. 금요일 저녁에는 새 학생들과 선배들이 함께 만나는 모임도 열립니다.',
    options: ['입학식', '졸업식', '축제', '음악회'],
    answer: '입학식',
    answerTranslation: L(
      '입학식',
      'o‘qishga kirish marosimi',
      'entrance ceremony',
      'церемония поступления',
    ),
    hint: L(
      '학교에 처음 들어가는 것을 공식적으로 기념하는 행사를 찾으세요.',
      'Universitetga yangi kirishni rasmiy nishonlaydigan tadbirni toping.',
      'Look for the formal event marking the beginning of school.',
      'Найдите официальное мероприятие, отмечающее поступление.',
    ),
    tags: ['entrance-ceremony', 'campus-event'],
  }),

  s5u1_002_word_matching: wordMatching({
    pairs: [
      { korean: '입학식', native: 'kirish marosimi' },
      { korean: '동아리', native: 'to‘garak' },
      { korean: '축제', native: 'festival' },
      { korean: '졸업식', native: 'bitiruv marosimi' },
      { korean: '강당', native: 'katta zal' },
    ],
    tags: ['campus-event', 'core-vocabulary'],
  }),

  s5u1_003_sentence_builder: sentenceBuilder({
    answer: '이번 주 금요일에는 신입생 환영회가 열려요',
    translation: L(
      '이번 주 금요일에는 신입생 환영회가 열려요.',
      'Shu hafta juma kuni yangi talabalar kutib olish kechasi bo‘ladi.',
      'The new student welcome party will be held this Friday.',
      'В эту пятницу состоится приветственная встреча для новых студентов.',
    ),
    distractors: ['졸업식이', '끝났어요', '수업만'],
    tags: ['welcome-party', 'event-schedule'],
  }),

  s5u1_004_error_hunt: errorHunt({
    npcText: '학생회에서 신입생 환영회을 준비하고 있어요.',
    wrongWord: '환영회을',
    options: ['환영회를', '환영회가', '환영회에', '환영회은'],
    answer: '환영회를',
    translation: L(
      '학생회에서 신입생 환영회를 준비하고 있어요.',
      'Talabalar kengashi yangi talabalar kutib olish kechasini tayyorlamoqda.',
      'The student council is preparing the new student welcome party.',
      'Студенческий совет готовит приветственную встречу для новых студентов.',
    ),
    hint: L(
      '`준비하다`의 대상이므로 목적격 조사가 필요해요. `환영회`는 모음으로 끝나요.',
      '`준비하다` harakatining obyekti bo‘lgani uchun tushum qo‘shimchasi kerak. `환영회` unli bilan tugaydi.',
      '환영회 is the object of 준비하다, and it ends in a vowel.',
      '환영회 — объект глагола 준비하다 и оканчивается на гласную.',
    ),
    tags: ['welcome-party', 'particle'],
  }),

  s5u1_005_fill_in_blank: multiBlank({
    sentenceTemplate:
      '대학교에 새로 들어온 학생을 ___이라고 하고, 그 학생들을 반갑게 맞이하기 위해 여는 모임을 ___라고 해요.',
    blankAnswers: ['신입생', '신입생 환영회'],
    distractors: ['졸업생', '졸업식', '강당'],
    translation: L(
      '대학교에 새로 들어온 학생을 신입생이라고 하고, 그 학생들을 위한 모임은 신입생 환영회예요.',
      'Universitetga yangi kirgan talaba 신입생, ular uchun kutib olish tadbiri esa 신입생 환영회 deyiladi.',
      'A newly enrolled university student is a 신입생, and the welcome event for them is a 신입생 환영회.',
      'Новый студент — 신입생, а приветственное мероприятие для него — 신입생 환영회.',
    ),
    tags: ['new-student', 'welcome-party'],
  }),

  s5u1_006_audio_match: audioMatch({
    pairs: [
      { korean: '입학식', native: 'kirish marosimi' },
      { korean: '축제', native: 'festival' },
      { korean: '동아리', native: 'to‘garak' },
      { korean: '졸업식', native: 'bitiruv marosimi' },
      { korean: '신입생', native: 'yangi talaba' },
    ],
    tags: ['campus-event', 'listening'],
  }),

  s5u1_007_translate_builder: translateBuilder({
    instruction: L(
      '학교 축제에도 가고 졸업식에도 참석하고 싶다는 뜻으로 말하세요.',
      'Universitet festivaliga ham, bitiruv marosimiga ham qatnashmoqchi ekaningizni ayting.',
      'Say that you want to go to the school festival and also attend the graduation ceremony.',
      'Скажите, что хотите пойти на университетский фестиваль и посетить выпускную церемонию.',
    ),
    answer: '저는 축제에도 가고 졸업식에도 참석하고 싶어요',
    translation: L(
      '저는 축제에도 가고 졸업식에도 참석하고 싶어요.',
      'Men festivalga ham borib, bitiruv marosimida ham qatnashmoqchiman.',
      'I want to go to the festival and attend the graduation ceremony as well.',
      'Я хочу пойти на фестиваль и посетить выпускную церемонию.',
    ),
    distractors: ['수업만', '졸업식에서', '싫어요'],
    tags: ['festival', 'graduation', 'attend'],
    difficulty: 5,
  }),

  s5u1_008_speaking: speaking({
    npcText: '친구에게 이번 주에 가장 기대하는 학교 행사를 이야기하고 있어요.',
    answer: '저는 신입생 환영회가 가장 기대돼요.',
    translation: L(
      '저는 신입생 환영회가 가장 기대돼요.',
      'Men eng ko‘p yangi talabalar kutib olish kechasini kutyapman.',
      'I am looking forward to the new student welcome party the most.',
      'Больше всего я жду приветственную встречу для новых студентов.',
    ),
    tags: ['welcome-party', 'preference'],
  }),

  s5u1_009_cloze_passage: clozePassage({
    passage:
      '대학교에 처음 들어오면 보통 ___으로 학교생활을 시작합니다. 학교와 수업에 대한 자세한 안내는 ___에서 받을 수 있습니다. 며칠 뒤에는 새로운 학생들과 선배들이 만나는 ___가 열리기도 합니다.',
    blankAnswers: ['입학식', '오리엔테이션', '신입생 환영회'],
    distractors: ['졸업식', '주차장', '상금'],
    translation: L(
      '신입생의 첫 학교 행사 흐름은 입학식, 오리엔테이션, 신입생 환영회로 이어질 수 있어요.',
      'Yangi talabaning ilk tadbirlari kirish marosimi, orientatsiya va kutib olish kechasidan iborat bo‘lishi mumkin.',
      'A new student’s first events may progress from the entrance ceremony to orientation and a welcome party.',
      'Первые мероприятия нового студента могут включать церемонию поступления, ориентацию и приветственную встречу.',
    ),
    tags: ['event-sequence', 'new-student'],
  }),

  s5u1_010_word_arrange: wordArrange({
    answer: '오리엔테이션은 신입생에게 학교생활을 이해하는 데 도움이 돼요',
    translation: L(
      '오리엔테이션은 신입생에게 학교생활을 이해하는 데 도움이 돼요.',
      'Orientatsiya yangi talabaga universitet hayotini tushunishda yordam beradi.',
      'Orientation helps new students understand university life.',
      'Ориентация помогает новым студентам понять университетскую жизнь.',
    ),
    distractors: ['졸업생만', '방해가', '끝나요'],
    tags: ['orientation', 'helpful'],
    difficulty: 5,
  }),

  s5u1_011_reply_builder: replyBuilder({
    npcText: '이번 금요일에 신입생 환영회가 있대요. 선배들도 많이 온다고 해요.',
    answer: '그럼 저도 꼭 참석하고 싶어요',
    translation: L(
      '그럼 저도 꼭 참석하고 싶어요.',
      'Unda men ham albatta qatnashmoqchiman.',
      'Then I definitely want to attend too.',
      'Тогда я тоже обязательно хочу пойти.',
    ),
    distractors: ['졸업했어요', '게시판을', '안 열려요'],
    tags: ['welcome-party', 'attend', 'reply'],
  }),

  s5u1_012_verb_transform: verbTransform({
    baseWord: '참석하다',
    targetForm: '과거 · 해요체',
    answer: '참석했어요',
    options: ['참', '석', '했', '어', '요', '합', '가'],
    translation: L('참석했어요', 'qatnashdim', 'attended', 'присутствовал'),
    tags: ['attend', 'past-tense'],
  }),

  s5u1_013_reading_quiz: readingQuiz({
    instruction: L(
      '다음 학생에게 가장 필요한 행사를 고르세요.',
      'Quyidagi talabaga eng kerakli tadbirni tanlang.',
      'Choose the event that would be most useful for this student.',
      'Выберите мероприятие, которое больше всего нужно этому студенту.',
    ),
    passage:
      '하산은 이번 주에 한국 대학교에 처음 왔습니다. 건물 위치를 잘 모르고, 수강 신청 방법도 아직 모릅니다. 사람들을 만나는 것도 좋지만 우선 학교 시설과 기본 절차에 대한 자세한 설명을 듣고 싶습니다.',
    options: ['오리엔테이션', '졸업식', '노래자랑', '음악회'],
    answer: '오리엔테이션',
    answerTranslation: L(
      '오리엔테이션',
      'orientatsiya',
      'orientation',
      'ориентация',
    ),
    hint: L(
      '새 학생에게 학교 시설과 이용 방법을 설명하는 행사를 찾으세요.',
      'Yangi talabaga universitet joylari va tartiblarini tushuntiradigan tadbirni toping.',
      'Look for the event that explains campus facilities and procedures to new students.',
      'Найдите мероприятие, где новым студентам объясняют устройство университета и основные процедуры.',
    ),
    tags: ['orientation', 'judgment'],
    difficulty: 5,
  }),

  s5u1_014_listen_type: listenType({
    audioText: '신입생 환영회는 새로운 사람을 만날 좋은 기회예요.',
    translation: L(
      '신입생 환영회는 새로운 사람을 만날 좋은 기회예요.',
      'Yangi talabalar kutib olish kechasi yangi odamlar bilan tanishish uchun yaxshi imkoniyat.',
      'The new student welcome party is a good opportunity to meet new people.',
      'Приветственная встреча новых студентов — хорошая возможность познакомиться с новыми людьми.',
    ),
    tags: ['welcome-party', 'opportunity'],
  }),

  s5u1_015_sentence_builder: sentenceBuilder({
    answer: '입학식이 끝난 뒤에 신입생들은 오리엔테이션에 갔어요',
    translation: L(
      '입학식이 끝난 뒤에 신입생들은 오리엔테이션에 갔어요.',
      'Kirish marosimidan keyin yangi talabalar orientatsiyaga bordilar.',
      'After the entrance ceremony, the new students went to orientation.',
      'После церемонии поступления новые студенты пошли на ориентацию.',
    ),
    distractors: ['졸업생들은', '상금을', '돌아갔어요'],
    tags: ['entrance-ceremony', 'orientation'],
    difficulty: 5,
  }),

  s5u1_016_listen_fill: listenFill({
    audioText: '이번 주에는 입학식과 오리엔테이션이 모두 있어요.',
    sentenceTemplate: '이번 주에는 ___과 ___이 모두 있어요.',
    blankAnswers: ['입학식', '오리엔테이션'],
    translation: L(
      '이번 주에는 입학식과 오리엔테이션이 모두 있어요.',
      'Shu hafta kirish marosimi ham, orientatsiya ham bor.',
      'Both the entrance ceremony and orientation are taking place this week.',
      'На этой неделе будут и церемония поступления, и ориентация.',
    ),
    tags: ['entrance-ceremony', 'orientation', 'dictation'],
  }),

  s5u1_017_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '이번 주 학교 행사 일정 봤어요?',
      },
      {
        speaker: 'user',
        text: '네. 금요일에 신입생 환영회가 있더라고요.',
      },
      {
        speaker: 'npc',
        text: '갈 생각이에요?',
      },
      {
        speaker: 'user',
        text: '네. 선배들도 만날 수 있을 것 같아서 참석하려고 해요.',
      },
      {
        speaker: 'npc',
        text: '그럼 저도 같이 갈게요.',
      },
    ],
    translation: L(
      '두 학생이 신입생 환영회 일정을 확인하고 함께 참석하기로 해요.',
      'Ikki talaba kutib olish kechasi jadvalini tekshirib, birga borishga qaror qiladi.',
      'Two students check the welcome party schedule and decide to attend together.',
      'Два студента уточняют расписание встречи и решают пойти вместе.',
    ),
    tags: ['welcome-party', 'event-plan'],
  }),

  s5u1_018_translate_type: translateType({
    instruction: L(
      '오늘 오리엔테이션에 참석했고 금요일에는 신입생 환영회에도 갈 계획이라는 내용을 한국어로 입력하세요.',
      'Bugun orientatsiyada qatnashganingizni va juma kuni yangi talabalar kutib olish kechasiga ham borishni rejalashtirayotganingizni koreyscha yozing.',
      'Write in Korean that you attended orientation today and plan to go to the new student welcome party on Friday.',
      'Напишите по-корейски, что сегодня вы были на ориентации и планируете пойти на встречу новых студентов в пятницу.',
    ),
    answer:
      '오늘 오리엔테이션에 참석했고 금요일에는 신입생 환영회에도 갈 계획이에요.',
    translation: L(
      '오늘 오리엔테이션에 참석했고 금요일에는 신입생 환영회에도 갈 계획이에요.',
      'Bugun orientatsiyada qatnashdim va juma kuni yangi talabalar kutib olish kechasiga ham bormoqchiman.',
      'I attended orientation today and plan to go to the new student welcome party on Friday.',
      'Сегодня я был на ориентации и в пятницу планирую пойти на приветственную встречу новых студентов.',
    ),
    targetExpressions: ['오리엔테이션', '참석', '신입생 환영회'],
    tags: ['orientation', 'welcome-party', 'productive'],
  }),

  s5u1_019_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학교생활을 시작하는 공식 행사는 ___이고, 학교를 자세히 안내받는 행사는 ___이며, 새 학생들과 친해질 수 있는 모임은 ___예요.',
    blankAnswers: ['입학식', '오리엔테이션', '신입생 환영회'],
    distractors: ['졸업식', '주차장', '상금'],
    translation: L(
      '입학식, 오리엔테이션, 신입생 환영회의 역할을 구별하는 문장이에요.',
      'Bu gap kirish marosimi, orientatsiya va yangi talabalar kutib olish kechasining vazifalarini ajratadi.',
      'The sentence distinguishes the roles of the entrance ceremony, orientation, and welcome party.',
      'Предложение различает назначение церемонии поступления, ориентации и приветственной встречи.',
    ),
    tags: ['event-purpose', 'new-student'],
    difficulty: 5,
  }),

  s5u1_020_reply_builder: replyBuilder({
    npcText: '저는 사람이 많은 행사는 별로인데 오리엔테이션은 꼭 가야 할까요?',
    answer: '학교 정보를 얻는 데 도움이 돼서 가는 게 좋아요',
    translation: L(
      '학교 정보를 얻는 데 도움이 돼서 가는 게 좋아요.',
      'Universitet haqida ma’lumot olishga yordam beradi, shuning uchun borganingiz yaxshi.',
      'It is useful for getting school information, so it is a good idea to go.',
      'Ориентация помогает получить информацию об университете, поэтому лучше сходить.',
    ),
    distractors: ['상금만', '졸업식이라서', '필요 없어요'],
    tags: ['orientation', 'helpful', 'reply'],
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 2 · 게시판에서 일시와 장소를 확인해요
  // 021 ~ 040
  // ─────────────────────────────────────────────────────────────

  s5u1_021_reading_quiz: readingQuiz({
    instruction: L(
      '수업이 오후 5시에 끝나는 학생이 참가할 수 있는 행사를 고르세요.',
      'Darsi soat 17:00 da tugaydigan talaba qatnasha oladigan tadbirni tanlang.',
      'Choose the event a student whose class ends at 5 p.m. can attend.',
      'Выберите мероприятие, на которое сможет пойти студент, чьи занятия заканчиваются в 17:00.',
    ),
    passageTitle: '이번 주 게시판',
    passage:
      '① 글쓰기 대회: 수요일 14:00, 중앙 강당\n② 신입생 환영회: 금요일 18:30, 학생회관\n③ 오리엔테이션: 목요일 15:00, 국제관\n학생은 평일마다 오후 5시까지 수업이 있고 금요일 저녁에는 다른 약속이 없습니다.',
    options: ['신입생 환영회', '글쓰기 대회', '오리엔테이션', '세 행사 모두'],
    answer: '신입생 환영회',
    answerTranslation: L(
      '신입생 환영회',
      'yangi talabalar kutib olish kechasi',
      'new student welcome party',
      'приветственная встреча новых студентов',
    ),
    hint: L(
      '행사 이름보다 먼저 각각의 일시를 수업 종료 시간과 비교하세요.',
      'Avval har bir tadbir vaqtini dars tugash vaqti bilan solishtiring.',
      'Compare each event time with the class end time before choosing.',
      'Сначала сравните время каждого мероприятия со временем окончания занятий.',
    ),
    tags: ['bulletin-board', 'date-time', 'judgment'],
    difficulty: 5,
  }),

  s5u1_022_audio_match: audioMatch({
    pairs: [
      { korean: '게시판', native: 'e’lonlar doskasi' },
      { korean: '강당', native: 'katta zal' },
      { korean: '일시', native: 'sana va vaqt' },
      { korean: '장소', native: 'joy' },
      { korean: '주차장', native: 'avtoturargoh' },
    ],
    tags: ['event-information', 'campus-place'],
  }),

  s5u1_023_sentence_builder: sentenceBuilder({
    answer: '게시판에서 행사 일시와 장소를 먼저 확인하세요',
    translation: L(
      '게시판에서 행사 일시와 장소를 먼저 확인하세요.',
      'E’lonlar doskasidan tadbir sanasi, vaqti va joyini avval tekshiring.',
      'First check the event date, time, and location on the bulletin board.',
      'Сначала проверьте дату, время и место мероприятия на доске объявлений.',
    ),
    distractors: ['상금부터', '주차장을', '잊으세요'],
    tags: ['bulletin-board', 'event-information'],
  }),

  s5u1_024_error_hunt: errorHunt({
    npcText: '음악회는 중앙 강당을 저녁 일곱 시에 열려요.',
    wrongWord: '강당을',
    options: ['강당에서', '강당으로', '강당을', '강당까지'],
    answer: '강당에서',
    translation: L(
      '음악회는 중앙 강당에서 저녁 일곱 시에 열려요.',
      'Konsert markaziy zalda kechki soat yettida bo‘ladi.',
      'The concert is held in the main auditorium at 7 p.m.',
      'Концерт состоится в главном зале в семь вечера.',
    ),
    hint: L(
      '`열리다`는 행사가 이루어지는 장소 뒤에 `에서`를 자주 사용해요.',
      '`열리다` bilan tadbir bo‘ladigan joydan keyin odatda `에서` ishlatiladi.',
      'A venue where an event takes place is commonly marked with 에서.',
      'Место, где проводится мероприятие, обычно оформляется частицей 에서.',
    ),
    tags: ['auditorium', 'place-particle'],
  }),

  s5u1_025_fill_in_blank: multiBlank({
    sentenceTemplate:
      '행사 안내에서 날짜와 시간을 뜻하는 말은 ___이고, 행사가 열리는 곳은 ___예요.',
    blankAnswers: ['일시', '장소'],
    distractors: ['상금', '기회', '선배'],
    translation: L(
      '행사 안내에서 일시는 날짜와 시간, 장소는 행사가 열리는 곳을 뜻해요.',
      'Tadbir e’lonida 일시 sana va vaqtni, 장소 esa tadbir joyini bildiradi.',
      'In an event notice, 일시 means the date and time, while 장소 means the venue.',
      'В объявлении 일시 означает дату и время, а 장소 — место проведения.',
    ),
    tags: ['date-time', 'venue'],
  }),

  s5u1_026_word_matching: wordMatching({
    pairs: [
      { korean: '게시판', native: 'e’lon doskasi' },
      { korean: '강당', native: 'katta zal' },
      { korean: '일시', native: 'sana va vaqt' },
      { korean: '장소', native: 'joy' },
      { korean: '주차장', native: 'avtoturargoh' },
    ],
    tags: ['event-information', 'campus-place'],
  }),

  s5u1_027_translate_builder: translateBuilder({
    instruction: L(
      '행사 장소는 강당이고 주차장은 학생회관 뒤에 있다는 정보를 전달하세요.',
      'Tadbir joyi katta zal ekanini va avtoturargoh talabalar markazi orqasida ekanini ayting.',
      'Say that the event is in the auditorium and the parking lot is behind the student center.',
      'Скажите, что мероприятие проходит в актовом зале, а парковка находится за студенческим центром.',
    ),
    answer: '행사 장소는 강당이고 주차장은 학생회관 뒤에 있어요',
    translation: L(
      '행사 장소는 강당이고 주차장은 학생회관 뒤에 있어요.',
      'Tadbir joyi katta zal, avtoturargoh esa talabalar markazi orqasida.',
      'The event venue is the auditorium, and the parking lot is behind the student center.',
      'Место мероприятия — актовый зал, а парковка находится за студенческим центром.',
    ),
    distractors: ['상금은', '졸업식만', '없어요'],
    tags: ['venue', 'parking-lot'],
    difficulty: 5,
  }),

  s5u1_028_listen_type: listenType({
    audioText: '게시판에 행사 일시와 장소가 자세히 나와 있어요.',
    translation: L(
      '게시판에 행사 일시와 장소가 자세히 나와 있어요.',
      'E’lonlar doskasida tadbirning sana-vaqti va joyi batafsil ko‘rsatilgan.',
      'The bulletin board lists the event date, time, and location in detail.',
      'На доске объявлений подробно указаны дата, время и место мероприятия.',
    ),
    tags: ['bulletin-board', 'event-information'],
  }),

  s5u1_029_cloze_passage: clozePassage({
    passage:
      '학교 ___을 보니 토요일 음악회 안내가 있었습니다. ___는 토요일 오후 6시이고, ___는 중앙 ___입니다. 자동차를 가져오는 사람은 운동장 옆 ___을 이용할 수 있습니다.',
    blankAnswers: ['게시판', '일시', '장소', '강당', '주차장'],
    distractors: ['상금', '선배', '입학식'],
    translation: L(
      '게시판에서 음악회의 날짜, 시간, 장소와 주차 정보를 확인하는 내용이에요.',
      'Matnda e’lonlar doskasidan konsertning vaqti, joyi va avtoturargoh ma’lumoti tekshiriladi.',
      'The passage describes checking the concert time, venue, and parking information on a bulletin board.',
      'В тексте проверяются время, место концерта и информация о парковке на доске объявлений.',
    ),
    tags: ['bulletin-board', 'notice-reading'],
  }),

  s5u1_030_word_arrange: wordArrange({
    answer: '행사에 가기 전에 일시와 장소가 바뀌었는지 확인해야 해요',
    translation: L(
      '행사에 가기 전에 일시와 장소가 바뀌었는지 확인해야 해요.',
      'Tadbirga borishdan oldin sana-vaqt yoki joy o‘zgargan-o‘zgarmaganini tekshirish kerak.',
      'Before going to an event, you should check whether the time or venue has changed.',
      'Перед мероприятием нужно проверить, не изменились ли время или место.',
    ),
    distractors: ['상금만', '졸업하고', '버려야'],
    tags: ['event-information', 'checking'],
    difficulty: 5,
  }),

  s5u1_031_reply_builder: replyBuilder({
    npcText:
      '게시판에는 음악회가 중앙 강당이라고 쓰여 있는데 어디로 가야 하죠?',
    answer: '중앙 강당으로 가면 돼요',
    translation: L(
      '중앙 강당으로 가면 돼요.',
      'Markaziy katta zalga borsangiz bo‘ladi.',
      'You should go to the main auditorium.',
      'Вам нужно идти в главный актовый зал.',
    ),
    distractors: ['주차장만', '상금을', '졸업했어요'],
    tags: ['auditorium', 'reply'],
  }),

  s5u1_032_verb_transform: verbTransform({
    baseWord: '제공하다',
    targetForm: '현재 · 해요체',
    answer: '제공해요',
    options: ['제', '공', '해', '요', '하', '지'],
    translation: L('제공해요', 'taqdim etadi', 'provides', 'предоставляет'),
    tags: ['provide', 'present-tense'],
  }),

  s5u1_033_reading_quiz: readingQuiz({
    instruction: L(
      '자동차를 가져갈 학생이 추가로 확인해야 할 정보를 고르세요.',
      'Mashina olib boradigan talaba yana qaysi ma’lumotni tekshirishi kerakligini tanlang.',
      'Choose the additional information a student driving to the event should check.',
      'Выберите дополнительную информацию, которую нужно проверить студенту, едущему на машине.',
    ),
    passage:
      '국제학생 음악회는 토요일 오후 7시에 중앙 강당에서 열립니다. 참가자는 오후 6시 30분까지 입장해 주세요. 행사장 주변의 차량 통행이 제한될 수 있으니 자동차를 이용하는 사람은 별도 안내를 확인해야 합니다.',
    options: [
      '주차장 이용 정보',
      '졸업식 날짜',
      '글쓰기 대회 상금',
      '동아리 가입 방법',
    ],
    answer: '주차장 이용 정보',
    answerTranslation: L(
      '주차장 이용 정보',
      'avtoturargohdan foydalanish ma’lumoti',
      'parking information',
      'информация о парковке',
    ),
    hint: L(
      '마지막 문장에서 자동차를 이용하는 사람에게 필요한 정보를 찾으세요.',
      'Oxirgi gapda mashina bilan keladigan odamga kerakli ma’lumotni toping.',
      'Focus on the final sentence about people arriving by car.',
      'Обратите внимание на последнее предложение о тех, кто приезжает на машине.',
    ),
    tags: ['parking-lot', 'notice-reading'],
    difficulty: 5,
  }),

  s5u1_034_image_choice: imageChoice({
    answer: '게시판',
    choices: [
      {
        text: '강당',
        label: 'katta zal',
        emoji: '🏛️',
      },
      {
        text: '게시판',
        label: 'e’lonlar doskasi',
        emoji: '📌',
      },
      {
        text: '주차장',
        label: 'avtoturargoh',
        emoji: '🅿️',
      },
      {
        text: '음악회',
        label: 'konsert',
        emoji: '🎼',
      },
    ],
    translation: L(
      '게시판',
      'e’lonlar doskasi',
      'bulletin board',
      'доска объявлений',
    ),
    hint: L(
      '행사 공지와 안내문을 붙여 놓는 곳을 찾으세요.',
      'Tadbir e’lonlari osib qo‘yiladigan joyni toping.',
      'Find the place where event notices are posted.',
      'Найдите место, где размещают объявления.',
    ),
    tags: ['bulletin-board'],
  }),

  s5u1_035_sentence_builder: sentenceBuilder({
    answer: '장소가 바뀌면 게시판에 새 안내를 올려요',
    translation: L(
      '장소가 바뀌면 게시판에 새 안내를 올려요.',
      'Joy o‘zgarsa, e’lonlar doskasiga yangi xabar joylanadi.',
      'If the venue changes, a new notice is posted on the bulletin board.',
      'Если место изменится, на доске объявлений разместят новое сообщение.',
    ),
    distractors: ['상금을', '졸업식에', '지워요'],
    tags: ['bulletin-board', 'venue-change'],
  }),

  s5u1_036_speaking: speaking({
    npcText: '친구가 행사 장소를 몰라서 게시판을 함께 확인하고 있어요.',
    answer: '여기 보니까 장소는 중앙 강당이에요.',
    translation: L(
      '여기 보니까 장소는 중앙 강당이에요.',
      'Bu yerga qarasam, tadbir joyi markaziy katta zal ekan.',
      'According to this, the venue is the main auditorium.',
      'Судя по объявлению, место проведения — главный актовый зал.',
    ),
    tags: ['venue', 'bulletin-board'],
  }),

  s5u1_037_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '음악회 장소가 어디인지 알아요?',
      },
      {
        speaker: 'user',
        text: '잠깐만요. 게시판에서 확인해 볼게요.',
      },
      {
        speaker: 'user',
        text: '여기 있네요. 중앙 강당이라고 쓰여 있어요.',
      },
      {
        speaker: 'npc',
        text: '시작 시간도 나와 있어요?',
      },
      {
        speaker: 'user',
        text: '네. 저녁 일곱 시에 시작해요.',
      },
    ],
    translation: L(
      '게시판에서 음악회의 장소와 시작 시간을 확인하는 대화예요.',
      'Bu dialogda e’lonlar doskasidan konsert joyi va boshlanish vaqti tekshiriladi.',
      'The speakers check the concert venue and start time on the bulletin board.',
      'Собеседники уточняют по доске объявлений место и время начала концерта.',
    ),
    tags: ['bulletin-board', 'date-time', 'venue'],
  }),

  s5u1_038_translate_type: translateType({
    instruction: L(
      '게시판을 확인해 보니 음악회 일시는 토요일 오후 7시이고 장소는 중앙 강당이라고 한국어로 입력하세요.',
      'E’lonlar doskasiga qaraganda konsert shanba kuni soat 19:00 da, joyi esa markaziy zal ekanini koreyscha yozing.',
      'Write in Korean that according to the bulletin board, the concert is at 7 p.m. Saturday in the main auditorium.',
      'Напишите по-корейски, что согласно объявлению концерт состоится в субботу в 19:00 в главном актовом зале.',
    ),
    answer:
      '게시판을 확인해 보니 음악회 일시는 토요일 오후 7시이고 장소는 중앙 강당이에요.',
    translation: L(
      '게시판을 확인해 보니 음악회 일시는 토요일 오후 7시이고 장소는 중앙 강당이에요.',
      'E’lonlar doskasiga qarasam, konsert shanba kuni soat 19:00 da va markaziy zalda ekan.',
      'According to the bulletin board, the concert is at 7 p.m. Saturday in the main auditorium.',
      'Согласно доске объявлений, концерт состоится в субботу в 19:00 в главном актовом зале.',
    ),
    targetExpressions: ['게시판', '일시', '장소', '강당'],
    tags: ['event-information', 'productive'],
  }),

  s5u1_039_fill_in_blank: multiBlank({
    sentenceTemplate:
      '공지에서 ___는 토요일 오후 7시, ___는 중앙 강당이라고 되어 있고 자동차 이용자는 ___을 확인해야 해요.',
    blankAnswers: ['일시', '장소', '주차장'],
    distractors: ['상금', '기회', '선배'],
    translation: L(
      '공지에서 일시, 장소, 주차장 정보를 구별하는 문장이에요.',
      'Gapda e’londagi sana-vaqt, joy va avtoturargoh ma’lumotlari ajratiladi.',
      'The sentence distinguishes the date/time, venue, and parking information in a notice.',
      'Предложение различает информацию о времени, месте и парковке.',
    ),
    tags: ['notice', 'event-information'],
    difficulty: 5,
  }),

  s5u1_040_reply_builder: replyBuilder({
    npcText:
      '행사 장소가 학생회관인 줄 알았는데 게시판에는 중앙 강당이라고 나와 있어요.',
    answer: '그럼 새 안내대로 중앙 강당으로 가야겠어요',
    translation: L(
      '그럼 새 안내대로 중앙 강당으로 가야겠어요.',
      'Unda yangi e’longa ko‘ra markaziy katta zalga borishimiz kerak.',
      'Then we should follow the new notice and go to the main auditorium.',
      'Тогда нужно следовать новому объявлению и идти в главный актовый зал.',
    ),
    distractors: ['옛날 장소로', '상금을', '졸업했어요'],
    tags: ['venue-change', 'reply'],
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 3 · 대회와 공연 안내를 읽어요
  // 041 ~ 060
  // ─────────────────────────────────────────────────────────────

  s5u1_041_reading_quiz: readingQuiz({
    instruction: L(
      '글을 쓰는 활동을 좋아하고 상금도 받고 싶은 학생에게 가장 알맞은 행사를 고르세요.',
      'Yozishni yoqtiradigan va pul mukofoti yutmoqchi bo‘lgan talaba uchun eng mos tadbirni tanlang.',
      'Choose the best event for a student who enjoys writing and wants a chance to win prize money.',
      'Выберите мероприятие для студента, который любит писать и хочет получить денежный приз.',
    ),
    passageTitle: '이번 달 특별 행사',
    passage:
      '이번 달에는 세 가지 행사가 열립니다. 외국인 글쓰기 대회에서는 정해진 주제로 글을 쓰고 우수한 참가자에게 상금을 줍니다. 노래자랑에서는 학생들이 직접 무대에서 노래합니다. 음악회에서는 전문 연주자와 학생 동아리의 공연을 감상할 수 있습니다.',
    options: ['글쓰기 대회', '노래자랑', '음악회', '졸업식'],
    answer: '글쓰기 대회',
    answerTranslation: L(
      '글쓰기 대회',
      'yozuv tanlovi',
      'writing contest',
      'конкурс письменных работ',
    ),
    hint: L(
      '`글을 쓰다`와 `상금`이라는 두 조건을 모두 만족하는 행사를 찾으세요.',
      '`yozish` va `pul mukofoti` shartlarining ikkalasiga ham mos tadbirni toping.',
      'Find the event matching both writing and prize money.',
      'Найдите мероприятие, где есть и письменное задание, и денежный приз.',
    ),
    tags: ['writing-contest', 'prize-money'],
    difficulty: 5,
  }),

  s5u1_042_word_matching: wordMatching({
    pairs: [
      { korean: '노래자랑', native: 'qo‘shiq tanlovi' },
      { korean: '음악회', native: 'konsert' },
      { korean: '상금', native: 'pul mukofoti' },
      { korean: '강당', native: 'katta zal' },
      { korean: '주차장', native: 'avtoturargoh' },
    ],
    tags: ['contest', 'performance'],
  }),

  s5u1_043_sentence_builder: sentenceBuilder({
    answer: '글쓰기 대회 우승자에게는 상금도 제공해요',
    translation: L(
      '글쓰기 대회 우승자에게는 상금도 제공해요.',
      'Yozuv tanlovi g‘olibiga pul mukofoti ham beriladi.',
      'Prize money is also provided to the winner of the writing contest.',
      'Победителю конкурса письменных работ также предоставляют денежный приз.',
    ),
    distractors: ['주차장을', '졸업식이', '반납해요'],
    tags: ['writing-contest', 'prize-money', 'provide'],
  }),

  s5u1_044_error_hunt: errorHunt({
    npcText: '글쓰기 대회에서 일등을 하면 상금에 받을 수 있어요.',
    wrongWord: '상금에',
    options: ['상금을', '상금이', '상금에', '상금으로'],
    answer: '상금을',
    translation: L(
      '글쓰기 대회에서 일등을 하면 상금을 받을 수 있어요.',
      'Yozuv tanlovida birinchi bo‘lsangiz, pul mukofoti olishingiz mumkin.',
      'If you win first place in the writing contest, you can receive prize money.',
      'Если занять первое место в конкурсе письменных работ, можно получить денежный приз.',
    ),
    hint: L(
      '`받다`의 대상이므로 `상금` 뒤에는 목적격 조사 `을`이 필요해요.',
      '`받다` fe’lining obyekti bo‘lgani uchun `상금`dan keyin `을` kerak.',
      '상금 is the object of 받다, so it needs the object particle 을.',
      '상금 — объект глагола 받다, поэтому нужна частица 을.',
    ),
    tags: ['prize-money', 'particle'],
  }),

  s5u1_045_fill_in_blank: multiBlank({
    sentenceTemplate:
      '직접 글을 써서 실력을 겨루는 행사는 ___이고, 노래 실력을 보여 주는 행사는 ___이며, 연주를 감상하는 행사는 ___예요.',
    blankAnswers: ['글쓰기 대회', '노래자랑', '음악회'],
    distractors: ['졸업식', '입학식', '주차장'],
    translation: L(
      '글쓰기 대회, 노래자랑, 음악회의 활동 차이를 구별하는 문장이에요.',
      'Bu gap yozuv tanlovi, qo‘shiq tanlovi va konsert faoliyatlarini farqlaydi.',
      'The sentence distinguishes a writing contest, a singing contest, and a concert.',
      'Предложение различает конкурс письменных работ, конкурс песни и концерт.',
    ),
    tags: ['contest', 'performance'],
  }),

  s5u1_046_audio_match: audioMatch({
    pairs: [
      { korean: '노래자랑', native: 'qo‘shiq tanlovi' },
      { korean: '음악회', native: 'konsert' },
      { korean: '상금', native: 'pul mukofoti' },
      { korean: '강당', native: 'katta zal' },
      { korean: '게시판', native: 'e’lonlar doskasi' },
    ],
    tags: ['contest', 'performance', 'listening'],
  }),

  s5u1_047_translate_builder: translateBuilder({
    instruction: L(
      '글쓰기 대회에 참가하면 우수한 글을 쓴 사람에게 상금이 제공된다는 뜻으로 말하세요.',
      'Yozuv tanlovida yaxshi yozgan odamga pul mukofoti berilishini ayting.',
      'Say that prize money is provided to participants who write an excellent entry in the writing contest.',
      'Скажите, что участнику, написавшему отличную работу, предоставляется денежный приз.',
    ),
    answer: '글쓰기 대회에서는 우수한 참가자에게 상금을 제공해요',
    translation: L(
      '글쓰기 대회에서는 우수한 참가자에게 상금을 제공해요.',
      'Yozuv tanlovida yaxshi ishtirokchilarga pul mukofoti beriladi.',
      'The writing contest provides prize money to outstanding participants.',
      'На конкурсе письменных работ лучшим участникам предоставляют денежный приз.',
    ),
    distractors: ['주차장을', '졸업생에게', '버려요'],
    tags: ['writing-contest', 'prize-money', 'provide'],
    difficulty: 5,
  }),

  s5u1_048_speaking: speaking({
    npcText:
      '친구에게 노래자랑과 음악회 중 어떤 행사에 가고 싶은지 이유와 함께 말해요.',
    answer: '저는 직접 노래하는 것보다 음악회에서 공연을 보고 싶어요.',
    translation: L(
      '저는 직접 노래하는 것보다 음악회에서 공연을 보고 싶어요.',
      'Men o‘zim qo‘shiq aytishdan ko‘ra konsertda chiqishni tomosha qilmoqchiman.',
      'Rather than singing myself, I want to watch a performance at the concert.',
      'Я предпочитаю не петь самому, а посмотреть выступление на концерте.',
    ),
    tags: ['singing-contest', 'concert', 'preference'],
    difficulty: 5,
  }),

  s5u1_049_cloze_passage: clozePassage({
    passage:
      '학교 축제 기간에는 여러 행사가 있습니다. 글쓰기를 좋아하는 학생은 ___에 참가할 수 있고, 무대에서 직접 노래하고 싶은 학생은 ___에 나갈 수 있습니다. 공연을 편하게 감상하고 싶다면 저녁 ___에 가면 됩니다. 일부 대회에서는 우수한 참가자에게 ___도 줍니다.',
    blankAnswers: ['글쓰기 대회', '노래자랑', '음악회', '상금'],
    distractors: ['입학식', '졸업식', '주차장'],
    translation: L(
      '축제 기간의 글쓰기 대회, 노래자랑, 음악회와 상금 정보를 설명하는 글이에요.',
      'Matn festival davridagi yozuv tanlovi, qo‘shiq tanlovi, konsert va mukofot haqida.',
      'The passage explains the writing contest, singing contest, concert, and prize money during the festival.',
      'Текст рассказывает о конкурсе письменных работ, конкурсе песни, концерте и призах во время фестиваля.',
    ),
    tags: ['festival', 'contest', 'concert'],
  }),

  s5u1_050_word_arrange: wordArrange({
    answer: '노래자랑은 직접 참가하지만 음악회는 공연을 감상하는 행사예요',
    translation: L(
      '노래자랑은 직접 참가하지만 음악회는 공연을 감상하는 행사예요.',
      'Qo‘shiq tanlovida o‘zingiz qatnashasiz, konsertda esa chiqishni tomosha qilasiz.',
      'You participate directly in a singing contest, while a concert is an event you watch.',
      'В конкурсе песни участвуют непосредственно, а на концерте смотрят выступление.',
    ),
    distractors: ['같은 뜻이고', '주차장을', '졸업해요'],
    tags: ['singing-contest', 'concert', 'contrast'],
    difficulty: 5,
  }),

  s5u1_051_reply_builder: replyBuilder({
    npcText:
      '저는 노래를 잘 못하는데 학교 축제에서 음악 관련 행사를 보고 싶어요.',
    answer: '그럼 노래자랑보다 음악회에 가는 게 좋겠어요',
    translation: L(
      '그럼 노래자랑보다 음악회에 가는 게 좋겠어요.',
      'Unda qo‘shiq tanlovidan ko‘ra konsertga borganingiz yaxshi.',
      'Then it would be better to go to the concert rather than the singing contest.',
      'Тогда лучше пойти на концерт, а не на конкурс песни.',
    ),
    distractors: ['상금만', '입학식에', '노래하세요'],
    tags: ['concert', 'singing-contest', 'recommendation'],
  }),

  s5u1_052_verb_transform: verbTransform({
    baseWord: '제공하다',
    targetForm: '과거 · 해요체',
    answer: '제공했어요',
    options: ['제', '공', '했', '어', '요', '됐', '받'],
    translation: L('제공했어요', 'taqdim etdi', 'provided', 'предоставил'),
    tags: ['provide', 'past-tense'],
  }),

  s5u1_053_reading_quiz: readingQuiz({
    instruction: L(
      '두 사람이 함께 즐길 수 있는 행사로 가장 알맞은 것을 고르세요.',
      'Ikki kishi birga tomosha qilib zavqlanishi uchun eng mos tadbirni tanlang.',
      'Choose the event best suited for two friends who simply want to watch and enjoy a performance together.',
      'Выберите мероприятие для двух друзей, которые хотят просто посмотреть выступление.',
    ),
    passage:
      '수진은 무대에 직접 올라가는 것을 부담스러워합니다. 친구 안나도 글쓰기 대회 준비를 할 시간이 없습니다. 두 사람은 토요일 저녁에 만나 편하게 공연을 보면서 학교 축제를 즐기고 싶습니다.',
    options: ['음악회', '노래자랑 참가', '글쓰기 대회', '입학식'],
    answer: '음악회',
    answerTranslation: L('음악회', 'konsert', 'concert', 'концерт'),
    hint: L(
      '직접 경쟁하거나 발표하지 않고 공연을 볼 수 있는 행사를 찾으세요.',
      'Bevosita musobaqada qatnashmasdan chiqishni tomosha qilish mumkin bo‘lgan tadbirni toping.',
      'Look for an event where they can watch rather than compete.',
      'Найдите мероприятие, где можно смотреть, а не соревноваться.',
    ),
    tags: ['concert', 'judgment'],
    difficulty: 5,
  }),

  s5u1_054_listen_fill: listenFill({
    audioText: '글쓰기 대회 우승자에게 상금과 기념품을 제공해요.',
    sentenceTemplate: '글쓰기 대회 우승자에게 ___과 기념품을 ___해요.',
    blankAnswers: ['상금', '제공'],
    translation: L(
      '글쓰기 대회 우승자에게 상금과 기념품을 제공해요.',
      'Yozuv tanlovi g‘olibiga pul mukofoti va esdalik sovg‘asi beriladi.',
      'Prize money and a souvenir are provided to the writing contest winner.',
      'Победителю конкурса письменных работ предоставляют денежный приз и памятный подарок.',
    ),
    tags: ['writing-contest', 'prize-money', 'provide'],
  }),

  s5u1_055_sentence_builder: sentenceBuilder({
    answer: '학교 축제에서는 노래자랑과 음악회가 모두 열려요',
    translation: L(
      '학교 축제에서는 노래자랑과 음악회가 모두 열려요.',
      'Universitet festivalida qo‘shiq tanlovi ham, konsert ham bo‘ladi.',
      'Both a singing contest and a concert are held during the school festival.',
      'На университетском фестивале проходят и конкурс песни, и концерт.',
    ),
    distractors: ['졸업식만', '주차장에서', '없어져요'],
    tags: ['festival', 'singing-contest', 'concert'],
  }),

  s5u1_056_type_answer: typeAnswer({
    instruction: L(
      '대회에서 우수한 사람에게 돈으로 주는 상을 한국어로 입력하세요.',
      'Tanlovda yaxshi qatnashganga pul ko‘rinishida beriladigan mukofotni koreyscha yozing.',
      'Type the Korean word for money awarded to a winner in a contest.',
      'Введите по-корейски слово, обозначающее денежный приз победителю конкурса.',
    ),
    answer: '상금',
    translation: L('상금', 'pul mukofoti', 'prize money', 'денежный приз'),
    tags: ['prize-money', 'recall'],
  }),

  s5u1_057_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '이번 축제에서 어떤 행사에 참가할 거예요?',
      },
      {
        speaker: 'user',
        text: '저는 글쓰기 대회에 나가려고 해요.',
      },
      {
        speaker: 'npc',
        text: '글쓰기를 좋아하나 봐요.',
      },
      {
        speaker: 'user',
        text: '네. 게다가 우수한 참가자에게 상금도 준대요.',
      },
      {
        speaker: 'npc',
        text: '좋은 결과가 있으면 좋겠네요.',
      },
    ],
    translation: L(
      '한 학생이 글쓰기 대회 참가 계획과 상금에 대해 이야기해요.',
      'Talaba yozuv tanlovida qatnashish rejasi va pul mukofoti haqida gapiradi.',
      'A student talks about entering the writing contest and its prize money.',
      'Студент рассказывает о планах участвовать в конкурсе письменных работ и денежном призе.',
    ),
    tags: ['writing-contest', 'prize-money'],
  }),

  s5u1_058_translate_type: translateType({
    instruction: L(
      '학교 축제에는 노래자랑과 음악회가 있고 글쓰기 대회 우승자에게는 상금도 제공된다고 한국어로 입력하세요.',
      'Universitet festivalida qo‘shiq tanlovi va konsert borligi, yozuv tanlovi g‘olibiga esa pul mukofoti berilishini koreyscha yozing.',
      'Write in Korean that the school festival has a singing contest and concert, and that the writing contest winner receives prize money.',
      'Напишите по-корейски, что на фестивале есть конкурс песни и концерт, а победителю конкурса письменных работ дают денежный приз.',
    ),
    answer:
      '학교 축제에는 노래자랑과 음악회가 있고 글쓰기 대회 우승자에게는 상금도 제공돼요.',
    translation: L(
      '학교 축제에는 노래자랑과 음악회가 있고 글쓰기 대회 우승자에게는 상금도 제공돼요.',
      'Universitet festivalida qo‘shiq tanlovi va konsert bor, yozuv tanlovi g‘olibiga pul mukofoti ham beriladi.',
      'The school festival has a singing contest and concert, and prize money is also provided to the writing contest winner.',
      'На университетском фестивале есть конкурс песни и концерт, а победителю конкурса письменных работ предоставляют денежный приз.',
    ),
    targetExpressions: ['노래자랑', '음악회', '글쓰기 대회', '상금'],
    tags: ['festival', 'contest', 'productive'],
  }),

  s5u1_059_fill_in_blank: multiBlank({
    sentenceTemplate:
      '직접 노래하고 싶으면 ___에 참가하고, 공연을 보고 싶으면 ___에 가고, 글을 잘 써서 상을 받고 싶으면 ___에 도전할 수 있어요.',
    blankAnswers: ['노래자랑', '음악회', '글쓰기 대회'],
    distractors: ['입학식', '졸업식', '주차장'],
    translation: L(
      '활동 목적에 따라 노래자랑, 음악회, 글쓰기 대회를 구별하는 문장이에요.',
      'Maqsadga qarab qo‘shiq tanlovi, konsert va yozuv tanlovini farqlaydigan gap.',
      'The sentence distinguishes a singing contest, concert, and writing contest according to the learner’s goal.',
      'Предложение различает конкурс песни, концерт и письменный конкурс в зависимости от цели.',
    ),
    tags: ['contest', 'event-purpose'],
    difficulty: 5,
  }),

  s5u1_060_reply_builder: replyBuilder({
    npcText:
      '글쓰기 대회에 관심은 있는데 준비하는 데 시간이 많이 필요할까 봐 걱정돼요.',
    answer: '먼저 게시판에서 참가 조건과 일시를 확인해 보세요',
    translation: L(
      '먼저 게시판에서 참가 조건과 일시를 확인해 보세요.',
      'Avval e’lonlar doskasidan qatnashish shartlari va vaqtini tekshirib ko‘ring.',
      'First check the participation requirements and schedule on the bulletin board.',
      'Сначала проверьте на доске объявлений условия участия и время.',
    ),
    distractors: ['상금만', '졸업하고', '노래하세요'],
    tags: ['writing-contest', 'bulletin-board', 'advice'],
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 4 · 동아리와 선배를 만나 좋은 기회를 만들어요
  // 061 ~ 080
  // ─────────────────────────────────────────────────────────────

  s5u1_061_reading_quiz: readingQuiz({
    instruction: L(
      '새로운 사람을 만나고 학교생활 정보도 얻고 싶은 신입생에게 가장 적절한 선택을 고르세요.',
      'Yangi odamlar bilan tanishib, universitet hayoti haqida ham ma’lumot olmoqchi bo‘lgan yangi talaba uchun eng mos tanlovni belgilang.',
      'Choose the best option for a new student who wants to meet people and learn more about campus life.',
      'Выберите лучший вариант для нового студента, который хочет познакомиться с людьми и узнать больше о жизни в университете.',
    ),
    passage:
      '카밀라는 한국에 온 지 얼마 되지 않은 신입생입니다. 같은 과 친구 외에는 아는 사람이 거의 없고 어떤 동아리가 있는지도 모릅니다. 이번 주 환영회에는 여러 선배와 동아리 학생들이 와서 학교생활과 활동을 소개할 예정입니다.',
    options: [
      '신입생 환영회에 참석한다',
      '졸업식만 기다린다',
      '게시판을 보지 않는다',
      '혼자 집에 간다',
    ],
    answer: '신입생 환영회에 참석한다',
    answerTranslation: L(
      '신입생 환영회에 참석한다',
      'yangi talabalar kutib olish kechasida qatnashadi',
      'attend the new student welcome party',
      'посетить приветственную встречу новых студентов',
    ),
    hint: L(
      '사람을 만나고 학교 정보를 얻는 두 목표를 모두 만족하는 선택을 찾으세요.',
      'Odamlar bilan tanishish va universitet haqida ma’lumot olishning ikkala maqsadiga ham mos javobni toping.',
      'Find the option that satisfies both meeting people and getting campus information.',
      'Найдите вариант, который одновременно позволяет познакомиться с людьми и получить информацию.',
    ),
    tags: ['welcome-party', 'senior', 'opportunity'],
    difficulty: 5,
  }),

  s5u1_062_audio_match: audioMatch({
    pairs: [
      { korean: '동아리', native: 'to‘garak' },
      { korean: '신입생', native: 'yangi talaba' },
      { korean: '선배', native: 'yuqori kurs talaba' },
      { korean: '기회', native: 'imkoniyat' },
      { korean: '축제', native: 'festival' },
    ],
    tags: ['student-relationship', 'club'],
  }),

  s5u1_063_sentence_builder: sentenceBuilder({
    answer: '환영회는 선배와 다른 신입생을 만날 좋은 기회예요',
    translation: L(
      '환영회는 선배와 다른 신입생을 만날 좋은 기회예요.',
      'Kutib olish kechasi yuqori kurs va boshqa yangi talabalar bilan tanishish uchun yaxshi imkoniyat.',
      'The welcome party is a good opportunity to meet seniors and other new students.',
      'Приветственная встреча — хорошая возможность познакомиться со старшекурсниками и другими новыми студентами.',
    ),
    distractors: ['졸업생만', '상금이', '주차해요'],
    tags: ['welcome-party', 'senior', 'opportunity'],
    difficulty: 5,
  }),

  s5u1_064_error_hunt: errorHunt({
    npcText: '선배를 동아리 활동에 대해 자세히 설명해 줬어요.',
    wrongWord: '선배를',
    options: ['선배가', '선배를', '선배에', '선배로'],
    answer: '선배가',
    translation: L(
      '선배가 동아리 활동에 대해 자세히 설명해 줬어요.',
      'Yuqori kurs talabasi klub faoliyati haqida batafsil tushuntirdi.',
      'A senior explained the club activities in detail.',
      'Старшекурсник подробно рассказал о деятельности клуба.',
    ),
    hint: L(
      '설명해 준 사람이 누구인지 확인하세요. 행동을 한 사람은 주어예요.',
      'Kim tushuntirganini aniqlang. Harakatni qilgan odam ega bo‘ladi.',
      'Identify who did the explaining. That person is the subject.',
      'Определите, кто объяснял. Этот человек является подлежащим.',
    ),
    tags: ['senior', 'particle'],
  }),

  s5u1_065_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학교에 먼저 들어온 사람을 ___라고 하고, 관심사가 같은 사람들이 함께 활동하는 모임을 ___라고 해요.',
    blankAnswers: ['선배', '동아리'],
    distractors: ['신입생', '강당', '상금'],
    translation: L(
      '같은 조직에 먼저 들어온 사람은 선배이고 관심사가 같은 사람들의 모임은 동아리예요.',
      'Bir tashkilotga sizdan oldin kirgan odam 선배, bir xil qiziqishdagi guruh esa 동아리 deyiladi.',
      'A more experienced member is a 선배, while a group built around a shared interest is a 동아리.',
      'Тот, кто раньше пришёл в организацию, — 선배, а группа по общему интересу — 동아리.',
    ),
    tags: ['senior', 'club'],
  }),

  s5u1_066_word_matching: wordMatching({
    pairs: [
      { korean: '동아리', native: 'to‘garak' },
      { korean: '신입생', native: 'yangi talaba' },
      { korean: '선배', native: 'yuqori kurs talaba' },
      { korean: '기회', native: 'imkoniyat' },
      { korean: '환영회', native: 'kutib olish kechasi' },
    ],
    tags: ['relationship', 'social-event'],
  }),

  s5u1_067_translate_builder: translateBuilder({
    instruction: L(
      '환영회에서 선배를 만나 동아리 정보를 얻을 좋은 기회였다고 말하세요.',
      'Kutib olish kechasida yuqori kurs talabasi bilan tanishib, klub haqida ma’lumot olish uchun yaxshi imkoniyat bo‘lganini ayting.',
      'Say that the welcome party was a good opportunity to meet seniors and get information about clubs.',
      'Скажите, что встреча была хорошей возможностью познакомиться со старшекурсниками и узнать о клубах.',
    ),
    answer: '환영회는 선배를 만나 동아리 정보를 얻을 좋은 기회였어요',
    translation: L(
      '환영회는 선배를 만나 동아리 정보를 얻을 좋은 기회였어요.',
      'Kutib olish kechasi yuqori kurs talabalarini uchratib, klublar haqida ma’lumot olish uchun yaxshi imkoniyat edi.',
      'The welcome party was a good opportunity to meet seniors and get information about clubs.',
      'Приветственная встреча была хорошей возможностью познакомиться со старшекурсниками и узнать о клубах.',
    ),
    distractors: ['상금만', '졸업식이', '주차했어요'],
    tags: ['welcome-party', 'club', 'opportunity'],
    difficulty: 5,
  }),

  s5u1_068_listen_type: listenType({
    audioText: '선배가 추천해 준 동아리에 가입해 볼 생각이에요.',
    translation: L(
      '선배가 추천해 준 동아리에 가입해 볼 생각이에요.',
      'Yuqori kurs talabasi tavsiya qilgan klubga qo‘shilib ko‘rmoqchiman.',
      'I am thinking about joining the club that a senior recommended.',
      'Я думаю вступить в клуб, который порекомендовал старшекурсник.',
    ),
    tags: ['senior', 'club'],
  }),

  s5u1_069_cloze_passage: clozePassage({
    passage:
      '저는 이번 학기에 들어온 ___입니다. 아직 아는 사람이 많지 않아서 ___에 참석했습니다. 거기에서 같은 과 ___를 만나 학교생활 이야기를 들었고, 관심 있는 ___도 소개받았습니다. 새로운 사람을 만날 수 있어서 좋은 ___가 되었습니다.',
    blankAnswers: ['신입생', '환영회', '선배', '동아리', '기회'],
    distractors: ['상금', '주차장', '졸업식'],
    translation: L(
      '신입생이 환영회에서 선배를 만나고 동아리를 소개받은 경험이에요.',
      'Yangi talaba kutib olish kechasida yuqori kurs talabasi bilan tanishib, klub haqida bilib olgan tajriba.',
      'A new student describes meeting a senior and learning about a club at a welcome party.',
      'Новый студент рассказывает, как на приветственной встрече познакомился со старшекурсником и узнал о клубе.',
    ),
    tags: ['new-student', 'welcome-party', 'club'],
  }),

  s5u1_070_word_arrange: wordArrange({
    answer: '동아리 활동은 다른 학과 학생을 만나는 데도 도움이 돼요',
    translation: L(
      '동아리 활동은 다른 학과 학생을 만나는 데도 도움이 돼요.',
      'Klub faoliyati boshqa fakultet talabalarini uchratishga ham yordam beradi.',
      'Club activities also help you meet students from other departments.',
      'Клубная деятельность также помогает знакомиться со студентами других факультетов.',
    ),
    distractors: ['상금만', '졸업식을', '방해해요'],
    tags: ['club', 'helpful'],
    difficulty: 5,
  }),

  s5u1_071_reply_builder: replyBuilder({
    npcText:
      '아직 아는 선배가 없어서 어떤 동아리가 좋은지 물어볼 사람이 없어요.',
    answer: '환영회에 가면 선배들을 만날 기회가 있을 거예요',
    translation: L(
      '환영회에 가면 선배들을 만날 기회가 있을 거예요.',
      'Kutib olish kechasiga borsangiz, yuqori kurs talabalari bilan uchrashish imkoniyati bo‘ladi.',
      'If you go to the welcome party, you will have a chance to meet seniors.',
      'Если пойдёте на приветственную встречу, будет возможность познакомиться со старшекурсниками.',
    ),
    distractors: ['졸업하면', '주차장만', '상금을'],
    tags: ['welcome-party', 'senior', 'opportunity'],
  }),

  s5u1_072_verb_transform: verbTransform({
    baseWord: '참석하다',
    targetForm: '의지 · 해요체',
    answer: '참석할게요',
    options: ['참', '석', '할', '게', '요', '했', '는'],
    translation: L(
      '참석할게요',
      'qatnashaman',
      'I will attend',
      'я приду; я буду присутствовать',
    ),
    tags: ['attend', 'intention'],
  }),

  s5u1_073_reading_quiz: readingQuiz({
    instruction: L(
      '동아리 선택에 가장 도움이 되는 사람을 고르세요.',
      'Klub tanlashga eng ko‘p yordam bera oladigan odamni tanlang.',
      'Choose the person most likely to help with choosing a club.',
      'Выберите человека, который лучше всего поможет с выбором клуба.',
    ),
    passage:
      '아지즈는 사진과 등산에 관심이 있지만 어떤 동아리가 실제로 활동을 많이 하는지 모릅니다. 같은 전공의 한 학생은 작년부터 여러 동아리 행사에 참여했고 학교생활 경험도 많아서 신입생들에게 자주 조언을 해 줍니다.',
    options: [
      '경험 많은 선배',
      '처음 온 신입생',
      '주차장 관리자',
      '음악회 관객',
    ],
    answer: '경험 많은 선배',
    answerTranslation: L(
      '경험 많은 선배',
      'tajribali yuqori kurs talabasi',
      'an experienced senior',
      'опытный старшекурсник',
    ),
    hint: L(
      '동아리 경험과 학교생활 경험이 모두 많은 사람을 찾으세요.',
      'Klub va universitet hayoti tajribasi ko‘p bo‘lgan odamni toping.',
      'Look for the person with both club and campus experience.',
      'Найдите человека с опытом и клубной, и университетской жизни.',
    ),
    tags: ['senior', 'club', 'judgment'],
    difficulty: 5,
  }),

  s5u1_074_type_answer: typeAnswer({
    instruction: L(
      '같은 학교나 조직에 자신보다 먼저 들어온 사람을 뜻하는 한국어 단어를 입력하세요.',
      'Bir xil maktab yoki tashkilotga sizdan oldin kirgan odamni bildiradigan koreyscha so‘zni yozing.',
      'Type the Korean word for someone who entered the same school or organization before you.',
      'Введите корейское слово для человека, который пришёл в ту же школу или организацию раньше вас.',
    ),
    answer: '선배',
    translation: L(
      '선배',
      'yuqori kurs yoki tajribaliroq a’zo',
      'senior',
      'старший товарищ',
    ),
    tags: ['senior', 'recall'],
  }),

  s5u1_075_sentence_builder: sentenceBuilder({
    answer: '선배에게 동아리 활동에 대해 자세히 물어봤어요',
    translation: L(
      '선배에게 동아리 활동에 대해 자세히 물어봤어요.',
      'Yuqori kurs talabasidan klub faoliyati haqida batafsil so‘radim.',
      'I asked a senior for details about the club activities.',
      'Я подробно расспросил старшекурсника о деятельности клуба.',
    ),
    distractors: ['상금을', '졸업식에서', '숨겼어요'],
    tags: ['senior', 'club'],
  }),

  s5u1_076_speaking: speaking({
    npcText:
      '환영회에서 처음 만난 선배에게 관심 있는 동아리에 대해 물어보고 싶어요.',
    answer: '선배님은 어떤 동아리에서 활동하세요?',
    translation: L(
      '선배님은 어떤 동아리에서 활동하세요?',
      'Siz qaysi klubda faoliyat qilasiz?',
      'Which club are you active in?',
      'В каком клубе вы занимаетесь?',
    ),
    tags: ['senior', 'club', 'question'],
    difficulty: 5,
  }),

  s5u1_077_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '학교생활은 좀 익숙해졌어요?',
      },
      {
        speaker: 'user',
        text: '아직은 잘 모르겠어요. 동아리에도 들어가고 싶고요.',
      },
      {
        speaker: 'npc',
        text: '그럼 이번 환영회에 와 보세요. 여러 동아리 선배들도 와요.',
      },
      {
        speaker: 'user',
        text: '정말요? 좋은 정보를 얻을 기회가 되겠네요.',
      },
      {
        speaker: 'npc',
        text: '네. 저도 거기에서 기다릴게요.',
      },
    ],
    translation: L(
      '선배가 신입생에게 환영회에서 동아리 정보를 얻어 보라고 권하는 대화예요.',
      'Yuqori kurs talabasi yangi talabaga kutib olish kechasida klub ma’lumotlarini olishni tavsiya qiladi.',
      'A senior recommends that a new student use the welcome party to learn about clubs.',
      'Старшекурсник советует новому студенту узнать о клубах на приветственной встрече.',
    ),
    tags: ['senior', 'welcome-party', 'club'],
  }),

  s5u1_078_translate_type: translateType({
    instruction: L(
      '신입생 환영회에서 선배를 만나 관심 있는 동아리 정보를 얻었고 학교생활에 도움이 되었다고 한국어로 입력하세요.',
      'Yangi talabalar kutib olish kechasida yuqori kurs talabasi bilan tanishib, qiziqqan klub haqida ma’lumot olganingiz va bu universitet hayotiga yordam berganini koreyscha yozing.',
      'Write in Korean that you met a senior at the new student welcome party, learned about a club you were interested in, and found it helpful for campus life.',
      'Напишите по-корейски, что на встрече новых студентов вы познакомились со старшекурсником, узнали об интересующем клубе и это помогло в университетской жизни.',
    ),
    answer:
      '신입생 환영회에서 선배를 만나 관심 있는 동아리 정보를 얻었고 학교생활에 도움이 됐어요.',
    translation: L(
      '신입생 환영회에서 선배를 만나 관심 있는 동아리 정보를 얻었고 학교생활에 도움이 됐어요.',
      'Kutib olish kechasida yuqori kurs talabasi bilan tanishib, qiziqqan klubim haqida ma’lumot oldim va bu universitet hayotimga yordam berdi.',
      'At the welcome party I met a senior, got information about a club I was interested in, and it helped me with campus life.',
      'На приветственной встрече я познакомился со старшекурсником, узнал об интересующем клубе, и это помогло мне освоиться в университете.',
    ),
    targetExpressions: ['신입생 환영회', '선배', '동아리', '도움이'],
    tags: ['welcome-party', 'senior', 'club', 'productive'],
  }),

  s5u1_079_fill_in_blank: multiBlank({
    sentenceTemplate:
      '새 학생은 ___이고, 먼저 학교생활을 경험한 사람은 ___이며, 같은 관심사를 가진 사람들이 활동하는 모임은 ___예요.',
    blankAnswers: ['신입생', '선배', '동아리'],
    distractors: ['졸업식', '상금', '강당'],
    translation: L(
      '신입생, 선배, 동아리의 의미를 관계 속에서 구별하는 문장이에요.',
      'Gap yangi talaba, yuqori kurs talaba va klub tushunchalarini farqlaydi.',
      'The sentence distinguishes a new student, a senior, and a club.',
      'Предложение различает понятия нового студента, старшекурсника и клуба.',
    ),
    tags: ['new-student', 'senior', 'club'],
    difficulty: 5,
  }),

  s5u1_080_reply_builder: replyBuilder({
    npcText:
      '환영회에 갔는데 모르는 사람이 많아서 그냥 일찍 나올까 고민 중이에요.',
    answer: '선배나 다른 신입생에게 먼저 인사해 보는 게 어때요',
    translation: L(
      '선배나 다른 신입생에게 먼저 인사해 보는 게 어때요?',
      'Avval yuqori kurs yoki boshqa yangi talabaga salom berib ko‘rsangiz qanday?',
      'Why not introduce yourself to a senior or another new student first?',
      'Почему бы сначала не поздороваться со старшекурсником или другим новым студентом?',
    ),
    distractors: ['상금부터', '졸업하고', '주차하세요'],
    tags: ['welcome-party', 'social', 'reply'],
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 5 · 학교 행사 정보를 종합해서 판단해요
  // 081 ~ 100
  // ─────────────────────────────────────────────────────────────

  s5u1_081_reading_quiz: readingQuiz({
    instruction: L(
      '아래 조건을 모두 만족하는 행사를 고르세요.',
      'Quyidagi barcha shartlarga mos keladigan tadbirni tanlang.',
      'Choose the event that satisfies all of the conditions below.',
      'Выберите мероприятие, которое соответствует всем условиям.',
    ),
    passageTitle: '지나의 토요일 계획',
    passage:
      '지나는 토요일 오후 5시까지 아르바이트를 합니다. 사람들 앞에서 직접 노래하거나 글을 쓰는 대회에는 부담을 느끼지만 친구와 함께 공연을 보는 것은 좋아합니다. 학교 게시판에는 글쓰기 대회가 오후 2시, 노래자랑이 오후 4시, 음악회가 오후 7시에 열린다고 적혀 있습니다.',
    options: ['음악회', '노래자랑', '글쓰기 대회', '오리엔테이션'],
    answer: '음악회',
    answerTranslation: L('음악회', 'konsert', 'concert', 'концерт'),
    hint: L(
      '시간 조건과 `직접 참가하지 않고 공연을 보고 싶다`는 조건을 동시에 확인하세요.',
      'Vaqt sharti va bevosita qatnashmasdan tomosha qilish istagini birga tekshiring.',
      'Check both the time constraint and the preference to watch rather than perform.',
      'Учитывайте и время, и желание смотреть выступление, а не участвовать.',
    ),
    tags: ['integrated', 'event-choice'],
    difficulty: 5,
  }),

  s5u1_082_word_matching: wordMatching({
    pairs: [
      { korean: '입학식', native: 'kirish marosimi' },
      { korean: '선배', native: 'yuqori kurs talaba' },
      { korean: '상금', native: 'pul mukofoti' },
      { korean: '게시판', native: 'e’lon doskasi' },
      { korean: '음악회', native: 'konsert' },
    ],
    tags: ['unit-review', 'mixed-vocabulary'],
  }),

  s5u1_083_sentence_builder: sentenceBuilder({
    answer: '게시판을 확인한 뒤에 참석할 행사를 결정하는 게 좋아요',
    translation: L(
      '게시판을 확인한 뒤에 참석할 행사를 결정하는 게 좋아요.',
      'E’lonlar doskasini tekshirgandan keyin qaysi tadbirga borishni hal qilgan yaxshi.',
      'It is a good idea to check the bulletin board before deciding which event to attend.',
      'Лучше сначала проверить доску объявлений, а потом решать, какое мероприятие посещать.',
    ),
    distractors: ['상금만', '졸업식부터', '잊어요'],
    tags: ['bulletin-board', 'event-choice'],
    difficulty: 5,
  }),

  s5u1_084_error_hunt: errorHunt({
    npcText: '이번 음악회 일시는 토요일 오후 일곱 시를 되어 있어요.',
    wrongWord: '시를',
    options: ['시로', '시에', '시를', '시가'],
    answer: '시로',
    translation: L(
      '이번 음악회 일시는 토요일 오후 일곱 시로 되어 있어요.',
      'Bu konsert vaqti shanba kuni soat yetti deb belgilangan.',
      'The concert is scheduled for 7 p.m. Saturday.',
      'Время концерта указано как суббота, 19:00.',
    ),
    hint: L(
      '`-로 되어 있다`는 정해진 내용이나 설정을 말할 때 사용할 수 있어요.',
      '`-로 되어 있다` belgilangan holat yoki ma’lumotni ifodalashi mumkin.',
      'The pattern `-로 되어 있다` can describe information that has been set or specified.',
      'Конструкция `-로 되어 있다` может обозначать установленное или указанное значение.',
    ),
    tags: ['date-time', 'particle'],
    difficulty: 5,
  }),

  s5u1_085_fill_in_blank: multiBlank({
    sentenceTemplate:
      '행사에 가기 전에는 ___에서 안내를 읽고 ___와 ___를 확인한 다음 필요한 경우 ___ 정보도 확인하는 것이 좋아요.',
    blankAnswers: ['게시판', '일시', '장소', '주차장'],
    distractors: ['상금', '선배', '졸업식'],
    translation: L(
      '행사 전에 게시판에서 일시, 장소, 주차장 정보를 확인하는 것이 좋아요.',
      'Tadbirdan oldin e’lonlar doskasidan vaqt, joy va avtoturargoh ma’lumotlarini tekshirish yaxshi.',
      'Before an event, it is useful to check the date/time, venue, and parking information on the bulletin board.',
      'Перед мероприятием полезно проверить на доске объявлений время, место и парковку.',
    ),
    tags: ['integrated', 'event-information'],
    difficulty: 5,
  }),

  s5u1_086_audio_match: audioMatch({
    pairs: [
      { korean: '환영회', native: 'kutib olish kechasi' },
      { korean: '기회', native: 'imkoniyat' },
      { korean: '장소', native: 'joy' },
      { korean: '상금', native: 'pul mukofoti' },
      { korean: '선배', native: 'yuqori kurs talaba' },
    ],
    tags: ['unit-review', 'listening'],
  }),

  s5u1_087_translate_builder: translateBuilder({
    instruction: L(
      '게시판을 보니 환영회 장소가 강당으로 바뀌었기 때문에 새 장소로 가야 한다고 말하세요.',
      'E’lonlar doskasida kutib olish kechasi joyi katta zalga o‘zgargani uchun yangi joyga borish kerakligini ayting.',
      'Say that the bulletin board shows the welcome party venue changed to the auditorium, so you need to go to the new location.',
      'Скажите, что по объявлению место приветственной встречи изменилось на актовый зал, поэтому нужно идти туда.',
    ),
    answer: '게시판을 보니 환영회 장소가 강당으로 바뀌어서 그쪽으로 가야 해요',
    translation: L(
      '게시판을 보니 환영회 장소가 강당으로 바뀌어서 그쪽으로 가야 해요.',
      'E’lonlar doskasiga qarasam, kutib olish kechasi joyi katta zalga o‘zgaribdi, shuning uchun o‘sha yerga borish kerak.',
      'The bulletin board says the welcome party venue changed to the auditorium, so we need to go there.',
      'По объявлению место приветственной встречи перенесли в актовый зал, поэтому нужно идти туда.',
    ),
    distractors: ['상금을', '졸업식이', '집으로만'],
    tags: ['bulletin-board', 'venue-change'],
    difficulty: 5,
  }),

  s5u1_088_listen_type: listenType({
    audioText: '환영회에서 만난 선배가 동아리 활동에 대해 자세히 알려 줬어요.',
    translation: L(
      '환영회에서 만난 선배가 동아리 활동에 대해 자세히 알려 줬어요.',
      'Kutib olish kechasida tanishgan yuqori kurs talabasi klub faoliyati haqida batafsil tushuntirdi.',
      'A senior I met at the welcome party explained the club activities in detail.',
      'Старшекурсник, которого я встретил на приветственной встрече, подробно рассказал о клубе.',
    ),
    tags: ['welcome-party', 'senior', 'club'],
  }),

  s5u1_089_cloze_passage: clozePassage({
    passage:
      '저는 이번 학기에 입학한 ___입니다. 학교 ___에서 여러 행사 안내를 보고 금요일 ___에 참석했습니다. 그곳에서 같은 과 ___를 만나 관심 있던 ___ 정보를 들었습니다. 새로운 사람도 만나고 학교생활 정보도 얻을 수 있어서 좋은 ___가 되었습니다.',
    blankAnswers: ['신입생', '게시판', '환영회', '선배', '동아리', '기회'],
    distractors: ['상금', '주차장', '졸업식'],
    translation: L(
      '신입생이 게시판을 보고 환영회에 참석해 선배와 동아리 정보를 얻은 경험이에요.',
      'Yangi talaba e’lonni ko‘rib, kutib olish kechasiga borib, yuqori kurs va klub haqida ma’lumot olgan tajribasini aytadi.',
      'A new student describes using the bulletin board, attending a welcome party, and learning about a club from a senior.',
      'Новый студент рассказывает, как посмотрел объявления, посетил встречу и узнал о клубе от старшекурсника.',
    ),
    tags: ['integrated', 'new-student', 'campus-life'],
    difficulty: 5,
  }),

  s5u1_090_word_arrange: wordArrange({
    answer: '행사의 목적과 일정을 비교해서 자신에게 필요한 것을 선택해야 해요',
    translation: L(
      '행사의 목적과 일정을 비교해서 자신에게 필요한 것을 선택해야 해요.',
      'Tadbir maqsadi va jadvalini solishtirib, o‘zingizga keraklisini tanlash kerak.',
      'You should compare each event’s purpose and schedule and choose what you need.',
      'Нужно сравнить цель и расписание мероприятий и выбрать подходящее.',
    ),
    distractors: ['상금만', '무조건', '졸업해요'],
    tags: ['event-choice', 'judgment'],
    difficulty: 5,
  }),

  s5u1_091_reply_builder: replyBuilder({
    npcText:
      '글쓰기 대회와 환영회 시간이 겹쳐서 둘 다 갈 수는 없어요. 저는 사람을 많이 만나고 싶어요.',
    answer: '그 목적이라면 환영회에 가는 게 더 좋겠어요',
    translation: L(
      '그 목적이라면 환영회에 가는 게 더 좋겠어요.',
      'Agar maqsadingiz shu bo‘lsa, kutib olish kechasiga borganingiz yaxshiroq.',
      'For that goal, the welcome party would be the better choice.',
      'Для такой цели лучше пойти на приветственную встречу.',
    ),
    distractors: ['상금 때문에', '주차장으로', '졸업하세요'],
    tags: ['welcome-party', 'judgment', 'reply'],
  }),

  s5u1_092_verb_transform: verbTransform({
    baseWord: '참석하다',
    targetForm: '명령 · 해요체',
    answer: '참석하세요',
    options: ['참', '석', '하', '세', '요', '했', '게'],
    translation: L(
      '참석하세요',
      'qatnashing',
      'please attend',
      'пожалуйста, посетите',
    ),
    tags: ['attend', 'polite-command'],
  }),

  s5u1_093_reading_quiz: readingQuiz({
    instruction: L(
      '두 행사 중 나탈리아에게 더 적합한 것을 고르세요.',
      'Ikki tadbirdan Natalyaga ko‘proq mos keladiganini tanlang.',
      'Choose which of the two events is better for Natalia.',
      'Выберите, какое из двух мероприятий больше подходит Наталье.',
    ),
    passage:
      '나탈리아는 한국어 글쓰기를 좋아하지만 이번 주에는 과제가 많아 대회를 준비할 시간이 없습니다. 대신 새로 입학한 학생들과 선배를 만나 학교생활에 대한 이야기를 듣고 싶습니다. 글쓰기 대회와 신입생 환영회가 같은 시간에 열립니다.',
    options: [
      '신입생 환영회',
      '글쓰기 대회',
      '둘 다 똑같이 적합하다',
      '졸업식',
    ],
    answer: '신입생 환영회',
    answerTranslation: L(
      '신입생 환영회',
      'yangi talabalar kutib olish kechasi',
      'new student welcome party',
      'приветственная встреча новых студентов',
    ),
    hint: L(
      '좋아하는 활동보다 이번 주의 실제 목적과 시간 제약을 우선해서 판단하세요.',
      'Yoqtirgan mashg‘ulotdan ko‘ra bu haftadagi haqiqiy maqsad va vaqt chekloviga qarang.',
      'Prioritize her current goal and time constraints rather than her general interests.',
      'Учитывайте её текущую цель и нехватку времени, а не только общие интересы.',
    ),
    tags: ['welcome-party', 'judgment'],
    difficulty: 5,
  }),

  s5u1_094_listen_fill: listenFill({
    audioText: '게시판에서 일시와 장소를 확인하고 환영회에 참석했어요.',
    sentenceTemplate: '게시판에서 ___와 ___를 확인하고 환영회에 ___했어요.',
    blankAnswers: ['일시', '장소', '참석'],
    translation: L(
      '게시판에서 일시와 장소를 확인하고 환영회에 참석했어요.',
      'E’lonlar doskasidan sana-vaqt va joyni tekshirib, kutib olish kechasida qatnashdim.',
      'I checked the date, time, and location on the bulletin board and attended the welcome party.',
      'Я проверил дату, время и место на доске объявлений и посетил приветственную встречу.',
    ),
    tags: ['bulletin-board', 'attend', 'dictation'],
  }),

  s5u1_095_sentence_builder: sentenceBuilder({
    answer: '학교 행사는 목적에 따라 필요한 정보와 준비가 달라요',
    translation: L(
      '학교 행사는 목적에 따라 필요한 정보와 준비가 달라요.',
      'Universitet tadbirlarida maqsadga qarab kerakli ma’lumot va tayyorgarlik farq qiladi.',
      'Different campus events require different information and preparation depending on their purpose.',
      'Для разных университетских мероприятий нужны разные сведения и подготовка в зависимости от цели.',
    ),
    distractors: ['모두 같고', '상금만', '필요 없어요'],
    tags: ['integrated', 'event-purpose'],
    difficulty: 5,
  }),

  s5u1_096_speaking: speaking({
    npcText:
      '친구에게 새 학기 학교 행사 중 하나를 추천하면서 이유까지 설명해요.',
    answer:
      '신입생이라면 오리엔테이션에 가는 게 학교생활을 이해하는 데 도움이 돼요.',
    translation: L(
      '신입생이라면 오리엔테이션에 가는 게 학교생활을 이해하는 데 도움이 돼요.',
      'Agar yangi talaba bo‘lsangiz, orientatsiyaga borish universitet hayotini tushunishga yordam beradi.',
      'If you are a new student, going to orientation helps you understand campus life.',
      'Если вы новый студент, ориентация поможет лучше понять университетскую жизнь.',
    ),
    tags: ['orientation', 'helpful', 'recommendation'],
    difficulty: 5,
  }),

  s5u1_097_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '토요일에 학교에 갈 거예요?',
      },
      {
        speaker: 'user',
        text: '네. 음악회를 보러 가려고 하는데 아직 장소를 못 확인했어요.',
      },
      {
        speaker: 'npc',
        text: '게시판에 새 공지가 올라왔어요. 중앙 강당에서 한대요.',
      },
      {
        speaker: 'user',
        text: '잘됐네요. 시작 시간과 주차장 정보도 같이 확인해 볼게요.',
      },
      {
        speaker: 'npc',
        text: '그럼 행사장에서 만나요.',
      },
    ],
    translation: L(
      '두 학생이 음악회 장소와 추가 행사 정보를 게시판에서 확인하는 대화예요.',
      'Ikki talaba konsert joyi va qo‘shimcha tadbir ma’lumotlarini e’lonlar doskasidan tekshiradi.',
      'Two students discuss checking the concert venue and other event information on the bulletin board.',
      'Два студента обсуждают место концерта и проверяют дополнительную информацию на доске объявлений.',
    ),
    tags: ['concert', 'bulletin-board', 'event-information'],
  }),

  s5u1_098_translate_type: translateType({
    instruction: L(
      '게시판에서 신입생 환영회의 일시와 장소를 확인한 뒤 참석했고, 그곳에서 선배를 만나 동아리 정보를 얻어서 학교생활에 도움이 되었다는 내용을 한국어로 입력하세요.',
      'E’lonlar doskasidan kutib olish kechasining vaqt va joyini tekshirib qatnashganingizni, u yerda yuqori kurs talabasi bilan tanishib klub ma’lumotini olganingiz va bu universitet hayotiga yordam berganini koreyscha yozing.',
      'Write in Korean that you checked the welcome party time and venue on the bulletin board, attended it, met a senior there, learned about a club, and found the experience helpful for campus life.',
      'Напишите по-корейски, что вы проверили на доске время и место встречи, посетили её, познакомились со старшекурсником, узнали о клубе и это помогло в университетской жизни.',
    ),
    answer:
      '게시판에서 신입생 환영회 일시와 장소를 확인한 뒤 참석했어요. 거기에서 선배를 만나 동아리 정보를 얻었고 학교생활에 도움이 됐어요.',
    translation: L(
      '게시판에서 신입생 환영회 일시와 장소를 확인한 뒤 참석했어요. 거기에서 선배를 만나 동아리 정보를 얻었고 학교생활에 도움이 됐어요.',
      'E’lonlar doskasidan kutib olish kechasining vaqt va joyini tekshirib qatnashdim. U yerda yuqori kurs talabasini uchratib, klub haqida ma’lumot oldim va bu universitet hayotimga yordam berdi.',
      'I checked the new student welcome party time and venue on the bulletin board and attended it. I met a senior there, learned about a club, and it helped me with campus life.',
      'Я проверил время и место приветственной встречи на доске объявлений и посетил её. Там я познакомился со старшекурсником, узнал о клубе, и это помогло мне в университетской жизни.',
    ),
    targetExpressions: [
      '게시판',
      '신입생 환영회',
      '일시',
      '장소',
      '참석',
      '선배',
      '동아리',
      '도움이',
    ],
    tags: ['unit-review', 'productive', 'integrated'],
  }),

  s5u1_099_fill_in_blank: multiBlank({
    sentenceTemplate:
      '새 학기에 학교생활을 잘 시작하려면 ___에서 행사 정보를 확인하고, 필요한 행사에 ___하며, ___나 다른 학생을 만날 ___도 적극적으로 활용하는 것이 좋아요.',
    blankAnswers: ['게시판', '참석', '선배', '기회'],
    distractors: ['상금', '주차장', '졸업식'],
    translation: L(
      '게시판에서 정보를 확인하고 필요한 행사에 참석하며 사람을 만날 기회를 활용하는 것이 좋아요.',
      'E’lonni tekshirib, kerakli tadbirda qatnashib va odamlar bilan tanishish imkoniyatidan foydalanish yaxshi.',
      'It is useful to check notices, attend relevant events, and use opportunities to meet people.',
      'Полезно читать объявления, посещать нужные мероприятия и использовать возможности для знакомств.',
    ),
    tags: ['unit-review', 'campus-life'],
    difficulty: 5,
  }),

  s5u1_100_reply_builder: replyBuilder({
    npcText:
      '이번 주에 행사가 너무 많아서 뭘 먼저 해야 할지 모르겠어요. 저는 신입생이고 학교 정보도 아직 부족해요.',
    answer: '먼저 오리엔테이션에 가고 게시판에서 다른 일정을 확인해 보세요',
    translation: L(
      '먼저 오리엔테이션에 가고 게시판에서 다른 일정을 확인해 보세요.',
      'Avval orientatsiyaga boring, keyin e’lonlar doskasidan boshqa tadbirlar jadvalini tekshiring.',
      'Go to orientation first, then check the bulletin board for the other event schedules.',
      'Сначала сходите на ориентацию, а затем проверьте расписание остальных мероприятий на доске объявлений.',
    ),
    distractors: ['상금부터', '졸업식을', '모두 포기해요'],
    tags: ['orientation', 'bulletin-board', 'advice', 'unit-review'],
  }),

  // ═══════════════════════════════════════════════════════════
  // NODE 2 · 대학 수업과 학업 생활
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────
  // Lesson 1 · 강의와 전공을 이야기해요
  // 101 ~ 120
  // ─────────────────────────────────────────────────────────────

  s5u1_101_reading_quiz: readingQuiz({
    instruction: L(
      '학생의 전공과 이번 학기에 듣는 과목을 올바르게 설명한 것을 고르세요.',
      'Talabaning mutaxassisligi va bu semestrdagi fanlarini to‘g‘ri tasvirlagan javobni tanlang.',
      'Choose the statement that correctly describes the student’s major and courses this semester.',
      'Выберите вариант, правильно описывающий специальность студента и его предметы в этом семестре.',
    ),
    passageTitle: '다니엘의 이번 학기',
    passage:
      '다니엘은 국제관계학을 중심으로 공부하고 있습니다. 이번 학기에는 전공 수업 세 개와 한국 사회에 대한 교양 수업 하나를 신청했습니다. 특히 한국 사회 강의는 전공과 직접 관계는 없지만 한국 생활을 이해하는 데 도움이 될 것 같아서 선택했습니다.',
    options: [
      '전공은 국제관계학이고 한국 사회 강의도 듣는다',
      '전공은 한국 사회이고 전공 과목은 하나뿐이다',
      '전공 없이 외국어 과목만 듣는다',
      '이번 학기에는 강의를 신청하지 않았다',
    ],
    answer: '전공은 국제관계학이고 한국 사회 강의도 듣는다',
    answerTranslation: L(
      '전공은 국제관계학이고 한국 사회 강의도 들어요.',
      'Mutaxassisligi xalqaro munosabatlar va Koreya jamiyati kursini ham o‘qiydi.',
      'His major is international relations, and he also takes a Korean society lecture.',
      'Его специальность — международные отношения, и он также посещает курс по корейскому обществу.',
    ),
    hint: L(
      '`전공`과 실제로 신청한 `과목`을 따로 확인하세요.',
      '`Mutaxassislik` va ro‘yxatdan o‘tgan `fanlarni` alohida tekshiring.',
      'Distinguish the student’s major from the individual courses he registered for.',
      'Отделите специальность студента от отдельных выбранных предметов.',
    ),
    tags: ['major', 'course', 'lecture'],
    difficulty: 5,
  }),

  s5u1_102_word_matching: wordMatching({
    pairs: [
      { korean: '강의', native: 'ma’ruza / dars' },
      { korean: '과목', native: 'fan' },
      { korean: '전공', native: 'mutaxassislik' },
      { korean: '성적', native: 'baho / natija' },
      { korean: '학점', native: 'kredit' },
    ],
    tags: ['academic-vocabulary', 'core'],
  }),

  s5u1_103_sentence_builder: sentenceBuilder({
    answer: '제 전공은 경영학이고 이번 학기에는 다섯 과목을 들어요',
    translation: L(
      '제 전공은 경영학이고 이번 학기에는 다섯 과목을 들어요.',
      'Mening mutaxassisligim biznes boshqaruvi va bu semestrda beshta fan o‘qiyman.',
      'My major is business administration, and I am taking five courses this semester.',
      'Моя специальность — управление бизнесом, и в этом семестре я изучаю пять предметов.',
    ),
    distractors: ['성적만', '장학금에서', '졸업했어요'],
    tags: ['major', 'course'],
    difficulty: 5,
  }),

  s5u1_104_error_hunt: errorHunt({
    npcText: '제 전공을 경제학이고 이번 학기에 전공 과목을 세 개 들어요.',
    wrongWord: '전공을',
    options: ['전공은', '전공을', '전공에', '전공으로'],
    answer: '전공은',
    translation: L(
      '제 전공은 경제학이고 이번 학기에 전공 과목을 세 개 들어요.',
      'Mening mutaxassisligim iqtisodiyot va bu semestrda uchta mutaxassislik fanini o‘qiyman.',
      'My major is economics, and I am taking three major courses this semester.',
      'Моя специальность — экономика, и в этом семестре я изучаю три профильных предмета.',
    ),
    hint: L(
      '경제학이 무엇인지 소개하는 문장이므로 `제 전공은 경제학이고`가 자연스러워요.',
      'Iqtisodiyot mutaxassislik ekanini tanishtiryapti, shuning uchun `제 전공은 경제학이고` tabiiy.',
      'The sentence is identifying the student’s major, so `제 전공은 경제학이고` is natural.',
      'Предложение называет специальность, поэтому естественно `제 전공은 경제학이고`.',
    ),
    tags: ['major', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_105_fill_in_blank: multiBlank({
    sentenceTemplate:
      '대학교에서 중심적으로 공부하는 분야는 ___이고, 한 학기에 각각 선택해서 듣는 수업은 ___이며, 교수가 내용을 설명하는 수업 자체는 ___라고 할 수 있어요.',
    blankAnswers: ['전공', '과목', '강의'],
    distractors: ['성적', '학점', '장학금'],
    translation: L(
      '전공, 과목, 강의의 의미 차이를 구별하는 문장이에요.',
      'Gap mutaxassislik, fan va ma’ruza tushunchalarini farqlaydi.',
      'The sentence distinguishes a major, a course, and a lecture.',
      'Предложение различает специальность, предмет и лекцию.',
    ),
    tags: ['major', 'course', 'lecture'],
    difficulty: 5,
  }),

  s5u1_106_audio_match: audioMatch({
    pairs: [
      { korean: '강의', native: 'ma’ruza' },
      { korean: '과목', native: 'fan' },
      { korean: '전공', native: 'mutaxassislik' },
      { korean: '철학', native: 'falsafa' },
      { korean: '사회', native: 'jamiyat' },
    ],
    tags: ['academic-vocabulary', 'listening'],
  }),

  s5u1_107_translate_builder: translateBuilder({
    instruction: L(
      '전공은 경제학이지만 한국 사회를 이해하고 싶어서 한국 문화 강의도 듣는다고 말하세요.',
      'Mutaxassisligingiz iqtisodiyot bo‘lsa ham, Koreya jamiyatini tushunish uchun Koreya madaniyati kursini ham o‘qishingizni ayting.',
      'Say that your major is economics, but you also take a Korean culture lecture because you want to understand Korean society.',
      'Скажите, что ваша специальность — экономика, но вы также посещаете курс корейской культуры, потому что хотите лучше понимать корейское общество.',
    ),
    answer:
      '전공은 경제학이지만 한국 사회를 이해하려고 한국 문화 강의도 들어요',
    translation: L(
      '전공은 경제학이지만 한국 사회를 이해하려고 한국 문화 강의도 들어요.',
      'Mutaxassisligim iqtisodiyot, lekin Koreya jamiyatini tushunish uchun Koreya madaniyati kursini ham o‘qiyman.',
      'My major is economics, but I also take a Korean culture lecture to understand Korean society.',
      'Моя специальность — экономика, но я также посещаю курс корейской культуры, чтобы лучше понимать корейское общество.',
    ),
    distractors: ['성적만', '장학금을', '졸업하려고'],
    tags: ['major', 'society', 'lecture'],
    difficulty: 5,
  }),

  s5u1_108_speaking: speaking({
    npcText:
      '처음 만난 다른 학과 학생과 서로 전공과 이번 학기 수업에 대해 이야기하고 있어요.',
    answer:
      '제 전공은 컴퓨터공학이고 이번 학기에는 전공 과목을 네 개 듣고 있어요.',
    translation: L(
      '제 전공은 컴퓨터공학이고 이번 학기에는 전공 과목을 네 개 듣고 있어요.',
      'Mening mutaxassisligim kompyuter muhandisligi va bu semestrda to‘rtta mutaxassislik fanini o‘qiyapman.',
      'My major is computer engineering, and I am taking four major courses this semester.',
      'Моя специальность — компьютерная инженерия, и в этом семестре я изучаю четыре профильных предмета.',
    ),
    tags: ['major', 'course', 'speaking'],
    difficulty: 5,
  }),

  s5u1_109_cloze_passage: clozePassage({
    passage:
      '저는 심리학을 ___하고 있습니다. 이번 학기에는 전공 ___ 세 개와 교양 수업 두 개를 신청했습니다. 그중에서 가장 기대되는 ___는 `한국 사회의 이해`입니다. 제 ___과 직접 관련되지는 않지만 한국 생활에도 도움이 될 것 같습니다.',
    blankAnswers: ['전공', '과목', '강의', '전공'],
    distractors: ['성적', '장학금', '학점'],
    translation: L(
      '학생의 전공과 이번 학기 과목 및 관심 강의를 설명하는 글이에요.',
      'Matn talabaning mutaxassisligi, fanlari va qiziqqan ma’ruzasini tushuntiradi.',
      'The passage describes the student’s major, semester courses, and a lecture of interest.',
      'Текст описывает специальность студента, предметы семестра и интересующую лекцию.',
    ),
    tags: ['major', 'course', 'lecture'],
    difficulty: 5,
  }),

  s5u1_110_word_arrange: wordArrange({
    answer: '같은 전공이라도 학생마다 선택하는 과목은 다를 수 있어요',
    translation: L(
      '같은 전공이라도 학생마다 선택하는 과목은 다를 수 있어요.',
      'Mutaxassislik bir xil bo‘lsa ham, har bir talaba tanlaydigan fanlar boshqacha bo‘lishi mumkin.',
      'Even students with the same major may choose different courses.',
      'Даже студенты одной специальности могут выбирать разные предметы.',
    ),
    distractors: ['모두 같아요', '장학금만', '졸업식이에요'],
    tags: ['major', 'course', 'comparison'],
    difficulty: 5,
  }),

  s5u1_111_reply_builder: replyBuilder({
    npcText: '전공 과목만 듣고 싶은데 교양 강의도 하나 들어야 할지 고민돼요.',
    answer: '관심 있는 분야라면 교양 강의도 하나 들어 보는 게 좋겠어요',
    translation: L(
      '관심 있는 분야라면 교양 강의도 하나 들어 보는 게 좋겠어요.',
      'Agar qiziqqan sohangiz bo‘lsa, bitta umumiy kursni ham o‘qib ko‘rganingiz yaxshi.',
      'If it is a field you are interested in, it would be good to try one general-education lecture too.',
      'Если тема вам интересна, стоит попробовать взять один общеобразовательный курс.',
    ),
    distractors: ['성적을 버리고', '졸업식에', '신청하지 마요'],
    tags: ['lecture', 'course-choice', 'reply'],
    difficulty: 5,
  }),

  s5u1_112_verb_transform: verbTransform({
    baseWord: '수강하다',
    targetForm: '현재 · 해요체',
    answer: '수강해요',
    options: ['수', '강', '해', '요', '했', '할'],
    translation: L(
      '수강해요',
      'kursni o‘qiyman',
      'take a course',
      'посещаю курс',
    ),
    tags: ['course', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_113_reading_quiz: readingQuiz({
    instruction: L(
      '학생이 `과목`이 아니라 `전공`에 대해 말한 문장을 고르세요.',
      'Talaba `fan` emas, `mutaxassislik` haqida gapirgan jumlani tanlang.',
      'Choose the sentence in which the student is talking about a major rather than an individual course.',
      'Выберите предложение, где студент говорит о специальности, а не об отдельном предмете.',
    ),
    passage:
      '① 이번 학기에는 한국 경제라는 수업을 들어요.\n② 저는 대학에서 경제학을 중심으로 공부하고 있어요.\n③ 철학의 이해는 월요일 오후에 있어요.\n④ 외국어 과목은 세 학점이에요.',
    options: ['②', '①', '③', '④'],
    answer: '②',
    answerTranslation: L(
      '경제학을 중심으로 공부하는 것이 전공에 대한 설명이에요.',
      'Iqtisodiyotni asosiy soha sifatida o‘qish mutaxassislikni bildiradi.',
      'Studying economics as the primary field describes the student’s major.',
      'Изучение экономики как основного направления описывает специальность.',
    ),
    hint: L(
      '한 학기에 듣는 개별 수업이 아니라 대학에서 중심적으로 공부하는 분야를 찾으세요.',
      'Bir semestrdagi alohida fanni emas, universitetdagi asosiy o‘qish sohasini toping.',
      'Find the main field of university study, not an individual semester class.',
      'Найдите основное направление обучения, а не отдельный курс.',
    ),
    tags: ['major', 'course-distinction'],
    difficulty: 5,
  }),

  s5u1_114_listen_type: listenType({
    audioText: '제 전공은 경영학이지만 철학 강의에도 관심이 많아요.',
    translation: L(
      '제 전공은 경영학이지만 철학 강의에도 관심이 많아요.',
      'Mutaxassisligim biznes boshqaruvi, lekin falsafa kurslariga ham juda qiziqaman.',
      'My major is business administration, but I am also very interested in philosophy lectures.',
      'Моя специальность — управление бизнесом, но я также очень интересуюсь лекциями по философии.',
    ),
    tags: ['major', 'philosophy', 'dictation'],
  }),

  s5u1_115_sentence_builder: sentenceBuilder({
    answer: '한국 사회를 이해하는 데 도움이 되는 강의를 찾고 있어요',
    translation: L(
      '한국 사회를 이해하는 데 도움이 되는 강의를 찾고 있어요.',
      'Koreya jamiyatini tushunishga yordam beradigan kurs izlayapman.',
      'I am looking for a lecture that will help me understand Korean society.',
      'Я ищу курс, который поможет мне лучше понять корейское общество.',
    ),
    distractors: ['성적을', '장학금만', '졸업했어요'],
    tags: ['society', 'understanding', 'lecture'],
    difficulty: 5,
  }),

  s5u1_116_listen_fill: listenFill({
    audioText: '이번 학기 전공 과목은 세 개이고 교양 강의는 두 개예요.',
    sentenceTemplate: '이번 학기 ___ 과목은 세 개이고 교양 ___는 두 개예요.',
    blankAnswers: ['전공', '강의'],
    translation: L(
      '이번 학기 전공 과목은 세 개이고 교양 강의는 두 개예요.',
      'Bu semestrda uchta mutaxassislik fani va ikkita umumiy kurs bor.',
      'There are three major courses and two general-education lectures this semester.',
      'В этом семестре три профильных предмета и две общеобразовательные лекции.',
    ),
    tags: ['major', 'lecture', 'dictation'],
  }),

  s5u1_117_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '민수 씨 전공이 뭐예요?',
      },
      {
        speaker: 'user',
        text: '경제학이에요. 수진 씨는요?',
      },
      {
        speaker: 'npc',
        text: '저는 사회학을 전공하고 있어요.',
      },
      {
        speaker: 'user',
        text: '이번 학기에는 어떤 과목을 들어요?',
      },
      {
        speaker: 'npc',
        text: '전공 강의 세 개하고 한국 문화 수업을 들어요.',
      },
    ],
    translation: L(
      '두 학생이 서로의 전공과 이번 학기 과목에 대해 이야기해요.',
      'Ikki talaba o‘z mutaxassisligi va bu semestrdagi fanlari haqida gaplashadi.',
      'Two students talk about their majors and courses this semester.',
      'Два студента обсуждают свои специальности и предметы этого семестра.',
    ),
    tags: ['major', 'course', 'dialog'],
  }),

  s5u1_118_translate_type: translateType({
    instruction: L(
      '전공은 사회학이고 이번 학기에는 전공 과목 세 개와 한국 문화를 이해하는 데 도움이 되는 강의 하나를 듣고 있다고 한국어로 입력하세요.',
      'Mutaxassisligingiz sotsiologiya ekanini va bu semestrda uchta mutaxassislik fani hamda Koreya madaniyatini tushunishga yordam beradigan bitta kursni o‘qiyotganingizni koreyscha yozing.',
      'Write in Korean that your major is sociology and this semester you are taking three major courses plus one lecture that helps you understand Korean culture.',
      'Напишите по-корейски, что ваша специальность — социология, а в этом семестре вы изучаете три профильных предмета и один курс, помогающий понять корейскую культуру.',
    ),
    answer:
      '제 전공은 사회학이고 이번 학기에는 전공 과목 세 개와 한국 문화를 이해하는 데 도움이 되는 강의 하나를 듣고 있어요.',
    translation: L(
      '제 전공은 사회학이고 이번 학기에는 전공 과목 세 개와 한국 문화를 이해하는 데 도움이 되는 강의 하나를 듣고 있어요.',
      'Mutaxassisligim sotsiologiya va bu semestrda uchta mutaxassislik fani hamda Koreya madaniyatini tushunishga yordam beradigan bitta kursni o‘qiyapman.',
      'My major is sociology, and this semester I am taking three major courses and one lecture that helps me understand Korean culture.',
      'Моя специальность — социология, и в этом семестре я изучаю три профильных предмета и один курс, помогающий понять корейскую культуру.',
    ),
    targetExpressions: ['전공', '과목', '강의', '이해'],
    tags: ['major', 'course', 'productive'],
    difficulty: 5,
  }),

  s5u1_119_fill_in_blank: multiBlank({
    sentenceTemplate:
      '어떤 분야를 중심적으로 공부하는지는 ___으로 말하고, 실제로 한 학기에 듣는 각각의 수업은 ___이라고 하며, 수업에서 받은 평가는 ___이라고 해요.',
    blankAnswers: ['전공', '과목', '성적'],
    distractors: ['학점', '장학금', '강당'],
    translation: L(
      '전공, 과목, 성적을 구별하는 문장이에요.',
      'Gap mutaxassislik, fan va bahoni farqlaydi.',
      'The sentence distinguishes a major, a course, and academic grades.',
      'Предложение различает специальность, предмет и оценки.',
    ),
    tags: ['major', 'course', 'grade'],
    difficulty: 5,
  }),

  s5u1_120_reply_builder: replyBuilder({
    npcText:
      '한국 생활을 더 잘 이해하고 싶은데 제 전공에는 관련 과목이 없어요.',
    answer: '그럼 한국 사회나 문화에 관한 교양 강의를 찾아보세요',
    translation: L(
      '그럼 한국 사회나 문화에 관한 교양 강의를 찾아보세요.',
      'Unda Koreya jamiyati yoki madaniyatiga oid umumiy kursni qidirib ko‘ring.',
      'Then look for a general-education lecture about Korean society or culture.',
      'Тогда поищите общеобразовательный курс о корейском обществе или культуре.',
    ),
    distractors: ['전공을 버리고', '장학금만', '시험을 보세요'],
    tags: ['society', 'lecture', 'advice'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 2 · 수강 신청을 해요
  // 121 ~ 140
  // ─────────────────────────────────────────────────────────────

  s5u1_121_reading_quiz: readingQuiz({
    instruction: L(
      '학생이 가장 먼저 해야 할 일을 고르세요.',
      'Talaba eng avval nima qilishi kerakligini tanlang.',
      'Choose what the student should do first.',
      'Выберите, что студенту нужно сделать в первую очередь.',
    ),
    passage:
      '유나는 다음 학기에 `한국 문화의 이해`를 꼭 듣고 싶습니다. 이 강의는 학생들에게 인기가 아주 많고 정원이 30명뿐입니다. 수강 신청은 내일 오전 9시에 시작하며 선착순으로 자리가 정해집니다. 유나는 내일 오전에는 다른 약속이 없습니다.',
    options: [
      '수강 신청이 시작할 때 바로 신청한다',
      '학기가 시작된 뒤에 천천히 신청한다',
      '성적이 나온 뒤에 강의를 찾는다',
      '장학금 결과를 기다린다',
    ],
    answer: '수강 신청이 시작할 때 바로 신청한다',
    answerTranslation: L(
      '수강 신청이 시작할 때 바로 신청하는 것이 좋아요.',
      'Ro‘yxatdan o‘tish boshlanishi bilan darhol yozilish yaxshi.',
      'It is best to register as soon as course registration opens.',
      'Лучше зарегистрироваться сразу после открытия записи.',
    ),
    hint: L(
      '`인기가 많다`, `30명`, `선착순`이라는 정보를 함께 보세요.',
      '`Mashhur`, `30 kishi` va `birinchi kelgan` ma’lumotlarini birga ko‘ring.',
      'Use the facts that the course is popular, has only 30 seats, and is first-come-first-served.',
      'Учтите, что курс популярный, мест только 30 и запись идёт в порядке очереди.',
    ),
    tags: ['course-registration', 'popular-course'],
    difficulty: 5,
  }),

  s5u1_122_word_matching: wordMatching({
    pairs: [
      { korean: '수강', native: 'kursni o‘qish' },
      { korean: '신청하다', native: 'ariza bermoq' },
      { korean: '인기', native: 'mashhurlik' },
      { korean: '철학', native: 'falsafa' },
      { korean: '이해', native: 'tushunish' },
    ],
    tags: ['course-registration', 'academic'],
  }),

  s5u1_123_sentence_builder: sentenceBuilder({
    answer: '인기 있는 강의라서 수강 신청이 빨리 끝날 수 있어요',
    translation: L(
      '인기 있는 강의라서 수강 신청이 빨리 끝날 수 있어요.',
      'Mashhur kurs bo‘lgani uchun ro‘yxatdan o‘tish tez tugashi mumkin.',
      'Because it is a popular lecture, course registration may close quickly.',
      'Поскольку курс популярный, регистрация может быстро закрыться.',
    ),
    distractors: ['아무도', '성적 때문에', '신청하지 않아요'],
    tags: ['course-registration', 'popular-course'],
    difficulty: 5,
  }),

  s5u1_124_error_hunt: errorHunt({
    npcText: '저는 다음 학기에 철학의 이해 강의를 수강에서 싶어요.',
    wrongWord: '수강에서',
    options: ['수강하고', '수강에서', '수강으로', '수강에게'],
    answer: '수강하고',
    translation: L(
      '저는 다음 학기에 철학의 이해 강의를 수강하고 싶어요.',
      'Keyingi semestrda “Falsafani tushunish” kursini o‘qimoqchiman.',
      'I want to take the Understanding Philosophy lecture next semester.',
      'В следующем семестре я хочу пройти курс «Введение в философию».',
    ),
    hint: L(
      '`싶어요` 앞에는 하고 싶은 행동인 `수강하고`가 와야 해요.',
      '`싶어요` oldidan bajarishni istagan harakat `수강하고` keladi.',
      '`싶어요` needs the action form `수강하고` before it.',
      'Перед `싶어요` нужна форма действия `수강하고`.',
    ),
    tags: ['course', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_125_fill_in_blank: multiBlank({
    sentenceTemplate:
      '다음 학기에 들을 수업을 시스템에서 등록하는 것은 ___이고, 등록한 수업을 실제로 듣는 것은 ___이라고 해요.',
    blankAnswers: ['수강 신청', '수강'],
    distractors: ['전공', '성적', '합격'],
    translation: L(
      '수강 신청과 수강의 차이를 설명하는 문장이에요.',
      'Gap kursga ro‘yxatdan o‘tish bilan kursni o‘qish farqini tushuntiradi.',
      'The sentence distinguishes course registration from actually taking a course.',
      'Предложение различает регистрацию на курс и само прохождение курса.',
    ),
    tags: ['course-registration', 'course'],
    difficulty: 5,
  }),

  s5u1_126_audio_match: audioMatch({
    pairs: [
      { korean: '수강', native: 'kursni o‘qish' },
      { korean: '신청하다', native: 'ariza bermoq' },
      { korean: '철학', native: 'falsafa' },
      { korean: '독일어', native: 'nemis tili' },
      { korean: '아랍어', native: 'arab tili' },
    ],
    tags: ['course-registration', 'foreign-language'],
  }),

  s5u1_127_translate_builder: translateBuilder({
    instruction: L(
      '철학 강의가 인기가 많아서 수강 신청을 서둘러야 한다고 말하세요.',
      'Falsafa kursi mashhur bo‘lgani uchun ro‘yxatdan o‘tishga shoshilish kerakligini ayting.',
      'Say that the philosophy lecture is popular, so you need to hurry with course registration.',
      'Скажите, что курс философии популярен, поэтому нужно поторопиться с регистрацией.',
    ),
    answer: '철학 강의는 인기가 많아서 수강 신청을 서둘러야 해요',
    translation: L(
      '철학 강의는 인기가 많아서 수강 신청을 서둘러야 해요.',
      'Falsafa kursi mashhur bo‘lgani uchun ro‘yxatdan o‘tishga shoshilish kerak.',
      'The philosophy lecture is popular, so I need to hurry with course registration.',
      'Курс философии популярен, поэтому нужно поторопиться с регистрацией.',
    ),
    distractors: ['성적을', '졸업식을', '포기해야'],
    tags: ['philosophy', 'popular-course', 'registration'],
    difficulty: 5,
  }),

  s5u1_128_type_answer: typeAnswer({
    instruction: L(
      '다음 학기에 들을 과목을 학교 시스템에 등록하는 것을 한국어로 입력하세요.',
      'Keyingi semestr fanlarini universitet tizimida ro‘yxatdan o‘tkazishni koreyscha yozing.',
      'Type the Korean expression for registering the courses you will take next semester.',
      'Введите по-корейски выражение «регистрация на курсы следующего семестра».',
    ),
    answer: '수강 신청',
    translation: L(
      '수강 신청',
      'kurslarga ro‘yxatdan o‘tish',
      'course registration',
      'регистрация на курсы',
    ),
    tags: ['course-registration', 'recall'],
    difficulty: 5,
  }),

  s5u1_129_cloze_passage: clozePassage({
    passage:
      '다음 학기 ___ 기간이 내일부터 시작됩니다. 저는 친구에게서 `철학의 이해`가 재미있다는 이야기를 들었습니다. 그런데 그 강의는 학생들에게 ___가 많아서 신청하기가 어렵다고 합니다. 그래서 신청 시간이 시작되면 바로 ___하려고 합니다.',
    blankAnswers: ['수강 신청', '인기', '신청'],
    distractors: ['성적', '학점', '장학금'],
    translation: L(
      '인기 강의를 신청하려는 학생의 수강 신청 계획이에요.',
      'Bu mashhur kursga ro‘yxatdan o‘tmoqchi bo‘lgan talabaning rejasi.',
      'The passage describes a student’s plan to register for a popular lecture.',
      'Текст описывает план студента записаться на популярную лекцию.',
    ),
    tags: ['course-registration', 'popular-course'],
    difficulty: 5,
  }),

  s5u1_130_word_arrange: wordArrange({
    answer: '인기 강의는 수강 신청 경쟁이 심해서 자리를 잡기 어려워요',
    translation: L(
      '인기 강의는 수강 신청 경쟁이 심해서 자리를 잡기 어려워요.',
      'Mashhur kurslarda ro‘yxatdan o‘tish raqobati kuchli bo‘lgani uchun joy olish qiyin.',
      'Popular lectures are difficult to get into because course-registration competition is intense.',
      'На популярные лекции трудно попасть из-за высокой конкуренции при регистрации.',
    ),
    distractors: ['항상 비어', '장학금이', '필요 없어요'],
    tags: ['course-registration', 'popular-course'],
    difficulty: 5,
  }),

  s5u1_131_reply_builder: replyBuilder({
    npcText:
      '제가 듣고 싶은 강의가 인기가 많다고 하는데 수강 신청을 천천히 해도 될까요?',
    answer: '자리가 빨리 없어질 수 있으니까 시작하자마자 신청하세요',
    translation: L(
      '자리가 빨리 없어질 수 있으니까 시작하자마자 신청하세요.',
      'Joylar tez tugashi mumkin, shuning uchun boshlanishi bilan yoziling.',
      'Seats may disappear quickly, so register as soon as it opens.',
      'Места могут быстро закончиться, поэтому регистрируйтесь сразу после открытия.',
    ),
    distractors: ['학기 말에', '성적부터', '신청하지 마세요'],
    tags: ['course-registration', 'advice'],
    difficulty: 5,
  }),

  s5u1_132_verb_transform: verbTransform({
    baseWord: '신청하다',
    targetForm: '현재 · 해요체',
    answer: '신청해요',
    options: ['신', '청', '해', '요', '했', '할'],
    translation: L(
      '신청해요',
      'ariza beraman',
      'apply / register',
      'подаю заявку',
    ),
    tags: ['application', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_133_reading_quiz: readingQuiz({
    instruction: L(
      '두 외국어 강의 중 학생의 조건에 맞는 것을 고르세요.',
      'Ikki xorijiy til kursidan talabaning shartlariga mosini tanlang.',
      'Choose the foreign-language course that matches the student’s conditions.',
      'Выберите курс иностранного языка, который соответствует условиям студента.',
    ),
    passage:
      '민수는 화요일과 목요일 오후에는 전공 수업이 있습니다. 외국어 과목을 하나 더 듣고 싶은데 독일어는 월요일과 수요일 오후, 아랍어는 화요일과 목요일 오후에 수업이 있습니다. 시간표가 겹치는 과목은 신청할 수 없습니다.',
    options: [
      '독일어',
      '아랍어',
      '두 과목 모두',
      '두 과목 모두 신청할 수 없다',
    ],
    answer: '독일어',
    answerTranslation: L('독일어', 'nemis tili', 'German', 'немецкий язык'),
    hint: L(
      '기존 전공 수업 시간과 외국어 수업 시간이 겹치는지 확인하세요.',
      'Mutaxassislik darslari bilan xorijiy til darsi vaqti to‘qnashishini tekshiring.',
      'Check whether each foreign-language class overlaps with the existing major courses.',
      'Проверьте, пересекается ли время иностранного языка с профильными занятиями.',
    ),
    tags: ['foreign-language', 'course-choice'],
    difficulty: 5,
  }),

  s5u1_134_listen_type: listenType({
    audioText: '수강 신청이 시작되자마자 철학 강의를 신청했어요.',
    translation: L(
      '수강 신청이 시작되자마자 철학 강의를 신청했어요.',
      'Kursga ro‘yxatdan o‘tish boshlanishi bilan falsafa kursiga yozildim.',
      'I registered for the philosophy lecture as soon as course registration opened.',
      'Я записался на курс философии сразу после открытия регистрации.',
    ),
    tags: ['course-registration', 'philosophy'],
  }),

  s5u1_135_sentence_builder: sentenceBuilder({
    answer: '독일어와 아랍어 중에서 시간표에 맞는 과목을 선택해야 해요',
    translation: L(
      '독일어와 아랍어 중에서 시간표에 맞는 과목을 선택해야 해요.',
      'Nemis va arab tillaridan jadvalga mos keladigan fanni tanlash kerak.',
      'You need to choose between German and Arabic based on your schedule.',
      'Нужно выбрать немецкий или арабский в зависимости от расписания.',
    ),
    distractors: ['둘 다 무조건', '성적으로', '졸업해요'],
    tags: ['foreign-language', 'course-choice'],
    difficulty: 5,
  }),

  s5u1_136_listen_fill: listenFill({
    audioText: '인기가 많은 과목은 수강 신청을 빨리 해야 해요.',
    sentenceTemplate: '___가 많은 과목은 ___ 신청을 빨리 해야 해요.',
    blankAnswers: ['인기', '수강'],
    translation: L(
      '인기가 많은 과목은 수강 신청을 빨리 해야 해요.',
      'Mashhur fanlarga tez ro‘yxatdan o‘tish kerak.',
      'You need to register quickly for popular courses.',
      'На популярные предметы нужно регистрироваться быстро.',
    ),
    tags: ['popular-course', 'registration'],
  }),

  s5u1_137_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '다음 학기에 무슨 강의 들을 거예요?',
      },
      {
        speaker: 'user',
        text: '철학의 이해를 듣고 싶어요.',
      },
      {
        speaker: 'npc',
        text: '그 강의는 인기가 많다고 들었어요.',
      },
      {
        speaker: 'user',
        text: '그래서 수강 신청이 시작하자마자 신청하려고 해요.',
      },
      {
        speaker: 'npc',
        text: '꼭 신청할 수 있으면 좋겠네요.',
      },
    ],
    translation: L(
      '학생들이 인기 철학 강의의 수강 신청에 대해 이야기해요.',
      'Talabalar mashhur falsafa kursiga yozilish haqida gaplashadi.',
      'The students talk about registering for a popular philosophy lecture.',
      'Студенты обсуждают регистрацию на популярный курс философии.',
    ),
    tags: ['philosophy', 'course-registration', 'dialog'],
  }),

  s5u1_138_translate_type: translateType({
    instruction: L(
      '철학의 이해 강의가 재미있고 인기가 많다고 들어서 수강 신청이 시작되자마자 신청할 계획이라고 한국어로 입력하세요.',
      '“Falsafani tushunish” kursi qiziq va mashhur ekanini eshitganingiz uchun ro‘yxatdan o‘tish boshlanishi bilan yozilishni rejalashtirayotganingizni koreyscha yozing.',
      'Write in Korean that you heard the Understanding Philosophy lecture is interesting and popular, so you plan to register as soon as course registration opens.',
      'Напишите по-корейски, что вы слышали, что курс «Введение в философию» интересный и популярный, поэтому собираетесь записаться сразу после открытия регистрации.',
    ),
    answer:
      '철학의 이해 강의가 재미있고 인기가 많다고 들어서 수강 신청이 시작되자마자 신청할 계획이에요.',
    translation: L(
      '철학의 이해 강의가 재미있고 인기가 많다고 들어서 수강 신청이 시작되자마자 신청할 계획이에요.',
      '“Falsafani tushunish” kursi qiziq va mashhur deb eshitdim, shuning uchun ro‘yxatdan o‘tish boshlanishi bilan yozilmoqchiman.',
      'I heard the Understanding Philosophy lecture is interesting and popular, so I plan to register as soon as course registration opens.',
      'Я слышал, что курс «Введение в философию» интересный и популярный, поэтому собираюсь зарегистрироваться сразу после открытия записи.',
    ),
    targetExpressions: ['철학', '인기가 많', '수강 신청', '신청'],
    tags: ['course-registration', 'philosophy', 'productive'],
    difficulty: 5,
  }),

  s5u1_139_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학생들이 많이 듣고 싶어 하는 강의는 ___가 많다고 하고, 그런 강의에 들어가기 위해서는 ___ 신청을 빨리 해야 해요.',
    blankAnswers: ['인기', '수강'],
    distractors: ['성적', '학점', '장학금'],
    translation: L(
      '인기 강의와 수강 신청의 관계를 설명하는 문장이에요.',
      'Gap mashhur kurs va ro‘yxatdan o‘tish o‘rtasidagi munosabatni tushuntiradi.',
      'The sentence explains the relationship between popular lectures and course registration.',
      'Предложение объясняет связь между популярным курсом и регистрацией.',
    ),
    tags: ['popular-course', 'registration'],
    difficulty: 5,
  }),

  s5u1_140_reply_builder: replyBuilder({
    npcText:
      '독일어하고 아랍어 둘 다 관심이 있는데 이번 학기에는 한 과목만 신청할 수 있어요.',
    answer: '시간표와 관심도를 비교해서 더 잘 맞는 과목을 선택하세요',
    translation: L(
      '시간표와 관심도를 비교해서 더 잘 맞는 과목을 선택하세요.',
      'Jadval va qiziqishingizni solishtirib, sizga yaxshiroq mos keladigan fanni tanlang.',
      'Compare your schedule and interests and choose the course that fits you better.',
      'Сравните расписание и свои интересы и выберите более подходящий предмет.',
    ),
    distractors: ['둘 다 포기하고', '성적만 보고', '졸업하세요'],
    tags: ['foreign-language', 'course-choice', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 3 · 성적과 학점을 관리해요
  // 141 ~ 160
  // ─────────────────────────────────────────────────────────────

  s5u1_141_reading_quiz: readingQuiz({
    instruction: L(
      '학생이 졸업하기 위해 가장 먼저 확인해야 할 것을 고르세요.',
      'Talaba bitirish uchun birinchi navbatda nimani tekshirishi kerakligini tanlang.',
      'Choose what the student should check first in order to graduate.',
      'Выберите, что студенту прежде всего нужно проверить для выпуска.',
    ),
    passage:
      '알렉스는 내년에 졸업하고 싶습니다. 지금까지 대부분의 전공 과목을 들었고 성적도 나쁘지 않습니다. 그런데 졸업에 필요한 총 학점이 몇 점인지, 자신이 지금까지 몇 학점을 받았는지는 정확히 확인하지 않았습니다.',
    options: [
      '필요한 학점과 현재 학점을 확인한다',
      '신입생 환영회에 다시 참가한다',
      '새 동아리에 가입한다',
      '외국어 강의만 추가한다',
    ],
    answer: '필요한 학점과 현재 학점을 확인한다',
    answerTranslation: L(
      '졸업에 필요한 학점과 지금까지 받은 학점을 확인해야 해요.',
      'Bitirish uchun kerakli va hozirgacha olingan kreditlarni tekshirish kerak.',
      'The student needs to check the credits required for graduation and the credits already earned.',
      'Нужно проверить количество кредитов для выпуска и уже набранные кредиты.',
    ),
    hint: L(
      '`성적이 좋다`와 `졸업에 필요한 학점이 충분하다`는 같은 뜻이 아니에요.',
      '`Baho yaxshi` va `bitirish uchun kredit yetarli` bir xil emas.',
      'Good grades and having enough graduation credits are not the same thing.',
      'Хорошие оценки и достаточное количество кредитов для выпуска — не одно и то же.',
    ),
    tags: ['grade', 'credit', 'graduation'],
    difficulty: 5,
  }),

  s5u1_142_word_matching: wordMatching({
    pairs: [
      { korean: '성적', native: 'baho / natija' },
      { korean: '학점', native: 'kredit' },
      { korean: '시험', native: 'imtihon' },
      { korean: '합격하다', native: 'imtihondan o‘tmoq' },
      { korean: '과목', native: 'fan' },
    ],
    tags: ['grade', 'credit', 'exam'],
  }),

  s5u1_143_sentence_builder: sentenceBuilder({
    answer: '시험 성적이 좋아도 졸업에 필요한 학점은 따로 확인해야 해요',
    translation: L(
      '시험 성적이 좋아도 졸업에 필요한 학점은 따로 확인해야 해요.',
      'Imtihon baholari yaxshi bo‘lsa ham, bitirish uchun kerakli kreditlarni alohida tekshirish kerak.',
      'Even if your exam grades are good, you still need to check the credits required for graduation separately.',
      'Даже при хороших оценках нужно отдельно проверить количество кредитов для выпуска.',
    ),
    distractors: ['같은 뜻이라서', '장학금만', '확인하지 마요'],
    tags: ['grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_144_error_hunt: errorHunt({
    npcText: '이번 시험을 열심히 준비해서 좋은 학점을 받았어요.',
    wrongWord: '학점을',
    options: ['성적을', '학점을', '장학금을', '전공을'],
    answer: '성적을',
    translation: L(
      '이번 시험을 열심히 준비해서 좋은 성적을 받았어요.',
      'Bu imtihonga yaxshi tayyorlanib, yaxshi baho oldim.',
      'I studied hard for this exam and received a good grade.',
      'Я хорошо подготовился к экзамену и получил хорошую оценку.',
    ),
    hint: L(
      '한 번의 시험 결과를 말할 때는 `학점`보다 `성적`이 자연스러워요.',
      'Bitta imtihon natijasi haqida gapirganda `학점` emas, `성적` tabiiy.',
      'For the result of an individual exam, `성적` is more natural than `학점`.',
      'Для результата отдельного экзамена естественнее использовать `성적`, а не `학점`.',
    ),
    tags: ['grade', 'credit', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_145_fill_in_blank: multiBlank({
    sentenceTemplate:
      '시험이나 과제 결과로 받는 평가는 ___이고, 과목을 이수해서 졸업 요건에 쌓이는 단위는 ___이에요.',
    blankAnswers: ['성적', '학점'],
    distractors: ['전공', '강의', '장학금'],
    translation: L(
      '성적과 학점의 차이를 설명하는 문장이에요.',
      'Gap baho va kredit farqini tushuntiradi.',
      'The sentence distinguishes grades from academic credits.',
      'Предложение различает оценки и учебные кредиты.',
    ),
    tags: ['grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_146_audio_match: audioMatch({
    pairs: [
      { korean: '성적', native: 'baho' },
      { korean: '학점', native: 'kredit' },
      { korean: '합격하다', native: 'o‘tmoq' },
      { korean: '시험', native: 'imtihon' },
      { korean: '장학금', native: 'stipendiya' },
    ],
    tags: ['grade', 'exam', 'credit'],
  }),

  s5u1_147_translate_builder: translateBuilder({
    instruction: L(
      '이번 시험 성적은 좋았지만 졸업에 필요한 학점이 아직 부족하다고 말하세요.',
      'Bu imtihon bahosi yaxshi bo‘lsa ham, bitirish uchun kerakli kreditlar hali yetishmasligini ayting.',
      'Say that your exam grade was good, but you still do not have enough credits to graduate.',
      'Скажите, что оценка за экзамен хорошая, но кредитов для выпуска пока недостаточно.',
    ),
    answer: '이번 시험 성적은 좋았지만 졸업에 필요한 학점이 아직 부족해요',
    translation: L(
      '이번 시험 성적은 좋았지만 졸업에 필요한 학점이 아직 부족해요.',
      'Bu imtihon bahom yaxshi edi, lekin bitirish uchun kreditlarim hali yetarli emas.',
      'My grade on this exam was good, but I still do not have enough credits to graduate.',
      'Оценка за этот экзамен хорошая, но кредитов для выпуска пока недостаточно.',
    ),
    distractors: ['신입생이라서', '장학금을', '모두 충분해요'],
    tags: ['grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_148_type_answer: typeAnswer({
    instruction: L(
      '대학교에서 과목을 이수했을 때 인정되는 공부의 단위를 한국어로 입력하세요.',
      'Universitetda fanni tugatganda beriladigan o‘quv birligini koreyscha yozing.',
      'Type the Korean word for the academic units earned by completing university courses.',
      'Введите по-корейски слово для учебных единиц, получаемых за завершённые университетские курсы.',
    ),
    answer: '학점',
    translation: L('학점', 'kredit', 'academic credit', 'учебный кредит'),
    tags: ['credit', 'recall'],
    difficulty: 5,
  }),

  s5u1_149_cloze_passage: clozePassage({
    passage:
      '이번 학기에는 전공 ___을 네 개 듣고 있습니다. 다음 주부터 기말 ___을 보기 때문에 요즘 공부를 많이 하고 있습니다. 시험이 끝난 뒤 ___이 나오면 장학금 기준을 넘었는지도 확인할 생각입니다. 졸업까지 남은 ___도 계산해야 합니다.',
    blankAnswers: ['과목', '시험', '성적', '학점'],
    distractors: ['강당', '환영회', '동아리'],
    translation: L(
      '과목, 시험, 성적, 학점을 연결한 학기 말 학업 상황이에요.',
      'Matn semestr oxiridagi fan, imtihon, baho va kredit holatini bog‘laydi.',
      'The passage connects courses, exams, grades, and credits at the end of the semester.',
      'Текст связывает предметы, экзамены, оценки и кредиты в конце семестра.',
    ),
    tags: ['course', 'exam', 'grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_150_word_arrange: wordArrange({
    answer: '졸업하려면 성적뿐 아니라 필요한 학점도 모두 채워야 해요',
    translation: L(
      '졸업하려면 성적뿐 아니라 필요한 학점도 모두 채워야 해요.',
      'Bitirish uchun nafaqat baholar, balki barcha kerakli kreditlarni ham yig‘ish kerak.',
      'To graduate, you need not only grades but also all required credits.',
      'Для выпуска нужны не только оценки, но и все необходимые кредиты.',
    ),
    distractors: ['장학금만', '전공 없이', '필요 없어요'],
    tags: ['credit', 'graduation'],
    difficulty: 5,
  }),

  s5u1_151_reply_builder: replyBuilder({
    npcText: '이번 시험에서 좋은 점수를 받았으니까 졸업 조건도 다 충족한 거죠?',
    answer: '성적과 학점은 다르니까 졸업에 필요한 학점을 따로 확인하세요',
    translation: L(
      '성적과 학점은 다르니까 졸업에 필요한 학점을 따로 확인하세요.',
      'Baho va kredit boshqa tushunchalar, shuning uchun bitirish kreditlarini alohida tekshiring.',
      'Grades and credits are different, so check your graduation-credit requirements separately.',
      'Оценки и кредиты — разные вещи, поэтому отдельно проверьте требования по кредитам.',
    ),
    distractors: ['네 똑같아요', '환영회부터', '전공을 바꾸세요'],
    tags: ['grade', 'credit', 'reply'],
    difficulty: 5,
  }),

  s5u1_152_verb_transform: verbTransform({
    baseWord: '합격하다',
    targetForm: '과거 · 해요체',
    answer: '합격했어요',
    options: ['합', '격', '했', '어', '요', '해', '할'],
    translation: L(
      '합격했어요',
      'imtihondan o‘tdim',
      'passed / was accepted',
      'сдал / был принят',
    ),
    tags: ['exam', 'pass'],
    difficulty: 5,
  }),

  s5u1_153_reading_quiz: readingQuiz({
    instruction: L(
      '학생의 상황을 가장 정확하게 설명한 것을 고르세요.',
      'Talabaning holatini eng aniq tushuntirgan javobni tanlang.',
      'Choose the statement that most accurately describes the student’s situation.',
      'Выберите вариант, наиболее точно описывающий ситуацию студента.',
    ),
    passage:
      '소피아는 이번 학기 모든 과목에서 B 이상을 받았습니다. 그래서 성적은 좋은 편입니다. 하지만 전공 변경 때문에 이전에 들은 일부 과목이 졸업 학점으로 인정되지 않아서 졸업까지 여섯 학점이 더 필요합니다.',
    options: [
      '성적은 좋지만 졸업 학점이 부족하다',
      '성적도 나쁘고 학점도 하나도 없다',
      '이미 모든 졸업 조건을 충족했다',
      '시험에 모두 불합격했다',
    ],
    answer: '성적은 좋지만 졸업 학점이 부족하다',
    answerTranslation: L(
      '성적은 좋지만 졸업 학점이 부족해요.',
      'Baholari yaxshi, lekin bitirish kreditlari yetishmaydi.',
      'Her grades are good, but she lacks enough credits for graduation.',
      'У неё хорошие оценки, но не хватает кредитов для выпуска.',
    ),
    hint: L(
      '좋은 평가 결과와 졸업 학점 충족 여부를 따로 판단하세요.',
      'Yaxshi baholar bilan bitirish kreditlari yetarliligini alohida baholang.',
      'Evaluate her grades separately from whether she has fulfilled the required credits.',
      'Отдельно оцените её оценки и выполнение требований по кредитам.',
    ),
    tags: ['grade', 'credit', 'judgment'],
    difficulty: 5,
  }),

  s5u1_154_listen_type: listenType({
    audioText: '성적은 괜찮지만 졸업하려면 학점을 여섯 점 더 받아야 해요.',
    translation: L(
      '성적은 괜찮지만 졸업하려면 학점을 여섯 점 더 받아야 해요.',
      'Baholarim yaxshi, lekin bitirish uchun yana olti kredit olishim kerak.',
      'My grades are fine, but I need six more credits to graduate.',
      'Оценки нормальные, но для выпуска мне нужно ещё шесть кредитов.',
    ),
    tags: ['grade', 'credit', 'graduation'],
  }),

  s5u1_155_sentence_builder: sentenceBuilder({
    answer: '시험을 보기 전에 중요한 내용을 다시 정리하고 있어요',
    translation: L(
      '시험을 보기 전에 중요한 내용을 다시 정리하고 있어요.',
      'Imtihon topshirishdan oldin muhim mavzularni yana tartiblayapman.',
      'I am reviewing the important material before taking the exam.',
      'Перед экзаменом я ещё раз повторяю важный материал.',
    ),
    distractors: ['장학금을', '동아리만', '잊고 있어요'],
    tags: ['exam', 'study'],
    difficulty: 5,
  }),

  s5u1_156_listen_fill: listenFill({
    audioText: '시험 성적이 나오면 이번 학기 학점도 확인할 거예요.',
    sentenceTemplate: '시험 ___이 나오면 이번 학기 ___도 확인할 거예요.',
    blankAnswers: ['성적', '학점'],
    translation: L(
      '시험 성적이 나오면 이번 학기 학점도 확인할 거예요.',
      'Imtihon bahosi chiqqach, bu semestr kreditlarini ham tekshiraman.',
      'When the exam results come out, I will also check this semester’s credits.',
      'Когда появятся результаты экзамена, я также проверю кредиты за этот семестр.',
    ),
    tags: ['grade', 'credit', 'dictation'],
  }),

  s5u1_157_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '이번 학기 성적 어땠어요?',
      },
      {
        speaker: 'user',
        text: '생각보다 잘 나왔어요.',
      },
      {
        speaker: 'npc',
        text: '그럼 이제 졸업할 수 있겠네요?',
      },
      {
        speaker: 'user',
        text: '아직 아니에요. 졸업하려면 여섯 학점이 더 필요해요.',
      },
      {
        speaker: 'npc',
        text: '그럼 다음 학기에 두 과목 정도 더 들어야겠네요.',
      },
    ],
    translation: L(
      '성적은 좋지만 졸업 학점이 부족한 학생의 대화예요.',
      'Bahosi yaxshi, lekin bitirish kreditlari yetishmaydigan talaba haqida dialog.',
      'The dialogue is about a student with good grades who still lacks graduation credits.',
      'Диалог о студенте с хорошими оценками, которому всё ещё не хватает кредитов.',
    ),
    tags: ['grade', 'credit', 'dialog'],
  }),

  s5u1_158_translate_type: translateType({
    instruction: L(
      '이번 학기 시험 성적은 좋았지만 졸업하려면 아직 여섯 학점이 더 필요해서 다음 학기에 두 과목을 추가로 들을 계획이라고 한국어로 입력하세요.',
      'Bu semestr imtihon baholari yaxshi bo‘lsa ham, bitirish uchun yana olti kredit kerakligi va keyingi semestrda yana ikki fan o‘qishni rejalashtirayotganingizni koreyscha yozing.',
      'Write in Korean that your exam grades were good this semester, but you still need six more credits to graduate, so you plan to take two additional courses next semester.',
      'Напишите по-корейски, что оценки в этом семестре хорошие, но для выпуска нужно ещё шесть кредитов, поэтому в следующем семестре вы планируете взять ещё два предмета.',
    ),
    answer:
      '이번 학기 시험 성적은 좋았지만 졸업하려면 아직 여섯 학점이 더 필요해서 다음 학기에 두 과목을 추가로 들을 계획이에요.',
    translation: L(
      '이번 학기 시험 성적은 좋았지만 졸업하려면 아직 여섯 학점이 더 필요해서 다음 학기에 두 과목을 추가로 들을 계획이에요.',
      'Bu semestr imtihon baholarim yaxshi, lekin bitirish uchun yana olti kredit kerak, shuning uchun keyingi semestrda yana ikki fan o‘qimoqchiman.',
      'My exam grades were good this semester, but I still need six more credits to graduate, so I plan to take two additional courses next semester.',
      'В этом семестре у меня хорошие оценки, но для выпуска нужно ещё шесть кредитов, поэтому в следующем семестре я планирую взять ещё два предмета.',
    ),
    targetExpressions: ['성적', '학점', '과목', '졸업'],
    tags: ['grade', 'credit', 'productive'],
    difficulty: 5,
  }),

  s5u1_159_fill_in_blank: multiBlank({
    sentenceTemplate:
      '시험의 결과는 ___으로 확인하고, 졸업까지 얼마나 공부해야 하는지는 남은 ___을 확인하면 돼요.',
    blankAnswers: ['성적', '학점'],
    distractors: ['강의', '장학금', '전공'],
    translation: L(
      '시험 결과와 졸업 요건을 성적과 학점으로 구별하는 문장이에요.',
      'Gap imtihon natijasi va bitirish talabini baho va kredit bilan farqlaydi.',
      'The sentence distinguishes exam results from graduation requirements using grades and credits.',
      'Предложение различает результаты экзамена и требования для выпуска через оценки и кредиты.',
    ),
    tags: ['grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_160_reply_builder: replyBuilder({
    npcText:
      '성적표를 봤는데 점수는 괜찮아요. 그런데 졸업할 수 있는지는 어떻게 확인해요?',
    answer: '졸업 기준에 필요한 총 학점과 지금까지 받은 학점을 비교해 보세요',
    translation: L(
      '졸업 기준에 필요한 총 학점과 지금까지 받은 학점을 비교해 보세요.',
      'Bitirish uchun kerakli jami kredit bilan hozirgacha olgan kreditlaringizni solishtiring.',
      'Compare the total credits required for graduation with the credits you have earned so far.',
      'Сравните общее количество кредитов для выпуска с тем, сколько вы уже набрали.',
    ),
    distractors: ['성적만 다시', '동아리에', '가입하세요'],
    tags: ['credit', 'graduation', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 4 · 장학금에 지원해요
  // 161 ~ 180
  // ─────────────────────────────────────────────────────────────

  s5u1_161_reading_quiz: readingQuiz({
    instruction: L(
      '학생이 장학금을 신청할 수 있는지 판단하세요.',
      'Talaba stipendiyaga ariza bera olishini aniqlang.',
      'Determine whether the student can apply for the scholarship.',
      'Определите, может ли студент подать заявление на стипендию.',
    ),
    passage:
      '글로벌 장학금은 이번 학기에 15학점 이상을 수강했고 평균 성적이 B 이상인 학생이 신청할 수 있습니다. 신청 마감은 금요일 오후 5시입니다. 소피아는 이번 학기에 18학점을 들었고 평균 성적은 A-이며 오늘은 목요일입니다.',
    options: [
      '조건을 충족해서 신청할 수 있다',
      '학점이 부족해서 신청할 수 없다',
      '성적이 부족해서 신청할 수 없다',
      '이미 신청 기간이 끝났다',
    ],
    answer: '조건을 충족해서 신청할 수 있다',
    answerTranslation: L(
      '학점과 성적 조건을 모두 충족해서 장학금을 신청할 수 있어요.',
      'Kredit va baho shartlarining ikkalasiga ham mos kelgani uchun stipendiyaga ariza bera oladi.',
      'She meets both the credit and grade requirements, so she can apply for the scholarship.',
      'Она соответствует требованиям по кредитам и оценкам, поэтому может подать заявление на стипендию.',
    ),
    hint: L(
      '학점, 평균 성적, 신청 마감일 세 가지를 모두 비교하세요.',
      'Kredit, o‘rtacha baho va ariza muddati uchalasini solishtiring.',
      'Compare all three conditions: credits, average grade, and deadline.',
      'Сравните все три условия: кредиты, среднюю оценку и срок подачи.',
    ),
    tags: ['scholarship', 'grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_162_word_matching: wordMatching({
    pairs: [
      { korean: '장학금', native: 'stipendiya' },
      { korean: '지원하다', native: 'ariza bermoq' },
      { korean: '신청하다', native: 'ro‘yxatdan o‘tmoq' },
      { korean: '합격하다', native: 'o‘tmoq / qabul bo‘lmoq' },
      { korean: '참가하다', native: 'qatnashmoq' },
    ],
    tags: ['application', 'scholarship'],
  }),

  s5u1_163_sentence_builder: sentenceBuilder({
    answer: '성적이 장학금 기준을 넘어서 이번 학기에 신청해 보려고 해요',
    translation: L(
      '성적이 장학금 기준을 넘어서 이번 학기에 신청해 보려고 해요.',
      'Baholarim stipendiya talabidan yuqori bo‘lgani uchun bu semestrda ariza bermoqchiman.',
      'My grades meet the scholarship requirement, so I plan to apply this semester.',
      'Мои оценки соответствуют требованиям стипендии, поэтому я собираюсь подать заявление в этом семестре.',
    ),
    distractors: ['성적이 없어서', '졸업식만', '포기했어요'],
    tags: ['scholarship', 'grade', 'application'],
    difficulty: 5,
  }),

  s5u1_164_error_hunt: errorHunt({
    npcText: '저는 다음 학기 장학금에 신청하려고 해요.',
    wrongWord: '장학금에',
    options: ['장학금을', '장학금에', '장학금이', '장학금으로'],
    answer: '장학금을',
    translation: L(
      '저는 다음 학기 장학금을 신청하려고 해요.',
      'Keyingi semestr stipendiyasiga ariza bermoqchiman.',
      'I plan to apply for a scholarship next semester.',
      'Я собираюсь подать заявление на стипендию на следующий семестр.',
    ),
    hint: L(
      '`신청하다`의 대상이 장학금이므로 여기서는 `장학금을 신청하다`라고 해요.',
      'Ariza beriladigan narsa stipendiya bo‘lgani uchun `장학금을 신청하다` ishlatiladi.',
      'The scholarship is the thing being applied for, so use `장학금을 신청하다`.',
      'Стипендия — объект заявки, поэтому используется `장학금을 신청하다`.',
    ),
    tags: ['scholarship', 'particle'],
    difficulty: 5,
  }),

  s5u1_165_fill_in_blank: multiBlank({
    sentenceTemplate:
      '대학교나 프로그램에 들어가기 위해 원서를 내는 것은 ___이고, 심사 기준을 통과하는 것은 ___이며, 장학금을 받고 싶어서 절차에 따라 요청하는 것은 ___이에요.',
    blankAnswers: ['지원', '합격', '신청'],
    distractors: ['수강', '성적', '학점'],
    translation: L(
      '지원, 합격, 신청의 의미 차이를 구별하는 문장이에요.',
      'Gap ariza topshirish, qabul bo‘lish va rasmiy so‘rov qilish tushunchalarini farqlaydi.',
      'The sentence distinguishes applying, passing/being accepted, and making an application for something.',
      'Предложение различает подачу заявления, успешный отбор и оформление заявки.',
    ),
    tags: ['apply', 'pass', 'application'],
    difficulty: 5,
  }),

  s5u1_166_audio_match: audioMatch({
    pairs: [
      { korean: '장학금', native: 'stipendiya' },
      { korean: '지원하다', native: 'hujjat topshirmoq' },
      { korean: '합격하다', native: 'o‘tmoq' },
      { korean: '신청하다', native: 'ariza bermoq' },
      { korean: '참가하다', native: 'qatnashmoq' },
    ],
    tags: ['application', 'listening'],
  }),

  s5u1_167_translate_builder: translateBuilder({
    instruction: L(
      '성적과 학점 조건을 모두 충족해서 장학금을 신청할 수 있다고 말하세요.',
      'Baho va kredit shartlarining ikkalasiga ham mos kelganingiz uchun stipendiyaga ariza bera olishingizni ayting.',
      'Say that you meet both the grade and credit requirements, so you can apply for the scholarship.',
      'Скажите, что вы соответствуете требованиям по оценкам и кредитам и поэтому можете подать заявление на стипендию.',
    ),
    answer: '성적과 학점 조건을 모두 충족해서 장학금을 신청할 수 있어요',
    translation: L(
      '성적과 학점 조건을 모두 충족해서 장학금을 신청할 수 있어요.',
      'Baho va kredit shartlarining ikkalasiga ham mos kelganim uchun stipendiyaga ariza bera olaman.',
      'I meet both the grade and credit requirements, so I can apply for the scholarship.',
      'Я соответствую требованиям по оценкам и кредитам, поэтому могу подать заявление на стипендию.',
    ),
    distractors: ['전공을', '환영회만', '신청할 수 없어요'],
    tags: ['scholarship', 'grade', 'credit'],
    difficulty: 5,
  }),

  s5u1_168_type_answer: typeAnswer({
    instruction: L(
      '시험이나 입학 심사에서 정해진 기준을 통과하는 것을 뜻하는 한국어 동사를 입력하세요.',
      'Imtihon yoki qabul tanlovida belgilangan talabdan muvaffaqiyatli o‘tishni bildiradigan koreyscha fe’lni yozing.',
      'Type the Korean verb meaning to pass an exam or be accepted through a selection process.',
      'Введите корейский глагол со значением «сдать экзамен / пройти отбор».',
    ),
    answer: '합격하다',
    translation: L(
      '합격하다',
      'o‘tmoq / qabul qilinmoq',
      'to pass; to be accepted',
      'сдать; пройти отбор',
    ),
    tags: ['pass', 'recall'],
    difficulty: 5,
  }),

  s5u1_169_cloze_passage: clozePassage({
    passage:
      '저는 한국 대학원에 ___하려고 준비하고 있습니다. 먼저 필요한 한국어 시험에 ___해야 하고, 입학 후에는 생활비 부담을 줄이기 위해 ___도 신청하고 싶습니다. 학교 홈페이지에서 지원 조건과 ___ 기간을 확인하고 있습니다.',
    blankAnswers: ['지원', '합격', '장학금', '신청'],
    distractors: ['강의', '동아리', '축제'],
    translation: L(
      '대학원 지원, 시험 합격, 장학금 신청 과정을 설명하는 글이에요.',
      'Matn magistraturaga hujjat topshirish, imtihondan o‘tish va stipendiyaga ariza berish jarayonini tushuntiradi.',
      'The passage describes applying to graduate school, passing an exam, and applying for a scholarship.',
      'Текст описывает поступление в магистратуру, сдачу экзамена и подачу заявления на стипендию.',
    ),
    tags: ['apply', 'pass', 'scholarship'],
    difficulty: 5,
  }),

  s5u1_170_word_arrange: wordArrange({
    answer: '장학금은 조건을 확인한 뒤 신청 기간 안에 서류를 내야 해요',
    translation: L(
      '장학금은 조건을 확인한 뒤 신청 기간 안에 서류를 내야 해요.',
      'Stipendiya uchun shartlarni tekshirib, ariza davrida hujjat topshirish kerak.',
      'For a scholarship, you need to check the requirements and submit your documents during the application period.',
      'Для стипендии нужно проверить условия и подать документы в период приёма заявлений.',
    ),
    distractors: ['아무 때나', '성적 없이', '졸업 후에만'],
    tags: ['scholarship', 'application'],
    difficulty: 5,
  }),

  s5u1_171_reply_builder: replyBuilder({
    npcText: '성적이 괜찮은데 장학금을 받을 수 있는지는 아직 모르겠어요.',
    answer: '학점 조건과 신청 기간도 함께 확인해 보는 게 좋겠어요',
    translation: L(
      '학점 조건과 신청 기간도 함께 확인해 보는 게 좋겠어요.',
      'Kredit sharti va ariza davrini ham birga tekshirganingiz yaxshi.',
      'You should also check the credit requirement and application period.',
      'Стоит также проверить требования по кредитам и срок подачи заявления.',
    ),
    distractors: ['성적만 보면', '동아리에', '가입하세요'],
    tags: ['scholarship', 'credit', 'reply'],
    difficulty: 5,
  }),

  s5u1_172_verb_transform: verbTransform({
    baseWord: '지원하다',
    targetForm: '현재 · 해요체',
    answer: '지원해요',
    options: ['지', '원', '해', '요', '했', '할'],
    translation: L(
      '지원해요',
      'hujjat topshiraman',
      'apply',
      'подаю заявление',
    ),
    tags: ['apply', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_173_reading_quiz: readingQuiz({
    instruction: L(
      '두 학생 중 장학금 신청 조건을 충족하는 학생을 고르세요.',
      'Ikki talabadan stipendiya talablariga mos keladiganini tanlang.',
      'Choose the student who meets the scholarship application requirements.',
      'Выберите студента, который соответствует требованиям стипендии.',
    ),
    passage:
      '장학금 조건은 평균 B+ 이상, 이번 학기 15학점 이상 이수입니다.\n민수: 평균 A-, 12학점\n안나: 평균 B+, 18학점\n두 학생 모두 신청 기간 안에 있습니다.',
    options: ['안나', '민수', '두 학생 모두', '두 학생 모두 신청할 수 없다'],
    answer: '안나',
    answerTranslation: L(
      '안나는 성적과 학점 조건을 모두 충족해요.',
      'Anna baho va kredit talablarining ikkalasiga ham mos keladi.',
      'Anna meets both the grade and credit requirements.',
      'Анна соответствует требованиям и по оценкам, и по кредитам.',
    ),
    hint: L(
      '한 가지 조건만 맞는 것이 아니라 두 조건을 모두 만족해야 해요.',
      'Faqat bitta emas, ikkala shart ham bajarilishi kerak.',
      'Both requirements must be satisfied, not just one.',
      'Нужно выполнить оба условия, а не только одно.',
    ),
    tags: ['scholarship', 'grade', 'credit', 'judgment'],
    difficulty: 5,
  }),

  s5u1_174_listen_type: listenType({
    audioText: '장학금을 신청하기 전에 성적과 학점 조건을 확인했어요.',
    translation: L(
      '장학금을 신청하기 전에 성적과 학점 조건을 확인했어요.',
      'Stipendiyaga ariza berishdan oldin baho va kredit shartlarini tekshirdim.',
      'I checked the grade and credit requirements before applying for the scholarship.',
      'Перед подачей заявления на стипендию я проверил требования по оценкам и кредитам.',
    ),
    tags: ['scholarship', 'grade', 'credit'],
  }),

  s5u1_175_sentence_builder: sentenceBuilder({
    answer: '대학원에 지원하려면 필요한 시험에 먼저 합격해야 해요',
    translation: L(
      '대학원에 지원하려면 필요한 시험에 먼저 합격해야 해요.',
      'Magistraturaga ariza topshirish uchun avval kerakli imtihondan o‘tish kerak.',
      'To apply to graduate school, you first need to pass the required exam.',
      'Чтобы поступать в магистратуру, сначала нужно сдать необходимый экзамен.',
    ),
    distractors: ['동아리에', '장학금을', '참가해야'],
    tags: ['apply', 'pass', 'exam'],
    difficulty: 5,
  }),

  s5u1_176_listen_fill: listenFill({
    audioText: '시험에 합격하면 다음 달에 대학교에 지원할 거예요.',
    sentenceTemplate: '시험에 ___하면 다음 달에 대학교에 ___할 거예요.',
    blankAnswers: ['합격', '지원'],
    translation: L(
      '시험에 합격하면 다음 달에 대학교에 지원할 거예요.',
      'Imtihondan o‘tsam, keyingi oy universitetga hujjat topshiraman.',
      'If I pass the exam, I will apply to the university next month.',
      'Если я сдам экзамен, в следующем месяце подам заявление в университет.',
    ),
    tags: ['pass', 'apply', 'dictation'],
  }),

  s5u1_177_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '다음 학기 장학금 신청할 거예요?',
      },
      {
        speaker: 'user',
        text: '네. 성적 기준은 넘었어요.',
      },
      {
        speaker: 'npc',
        text: '학점 조건도 확인했어요?',
      },
      {
        speaker: 'user',
        text: '네. 이번 학기에 18학점을 들어서 조건을 충족해요.',
      },
      {
        speaker: 'npc',
        text: '그럼 신청 기간만 놓치지 않으면 되겠네요.',
      },
    ],
    translation: L(
      '장학금의 성적, 학점, 신청 기간 조건을 확인하는 대화예요.',
      'Dialog stipendiyaning baho, kredit va ariza muddatlarini tekshiradi.',
      'The dialogue checks scholarship requirements involving grades, credits, and the application period.',
      'Диалог проверяет условия стипендии: оценки, кредиты и сроки подачи.',
    ),
    tags: ['scholarship', 'grade', 'credit'],
  }),

  s5u1_178_translate_type: translateType({
    instruction: L(
      '대학원에 지원하기 위해 한국어 시험을 준비하고 있으며 시험에 합격하면 학교와 장학금에 필요한 신청 절차를 확인할 계획이라고 한국어로 입력하세요.',
      'Magistraturaga ariza berish uchun koreys tili imtihoniga tayyorlanayotganingizni, imtihondan o‘tsangiz universitet va stipendiya uchun ariza jarayonini tekshirishingizni koreyscha yozing.',
      'Write in Korean that you are preparing for a Korean exam to apply to graduate school, and if you pass, you plan to check the application procedures for the school and scholarship.',
      'Напишите по-корейски, что готовитесь к экзамену по корейскому для поступления в магистратуру и после успешной сдачи планируете уточнить процедуры подачи документов в университет и на стипендию.',
    ),
    answer:
      '대학원에 지원하려고 한국어 시험을 준비하고 있어요. 시험에 합격하면 학교 지원과 장학금 신청에 필요한 절차를 확인할 계획이에요.',
    translation: L(
      '대학원에 지원하려고 한국어 시험을 준비하고 있어요. 시험에 합격하면 학교 지원과 장학금 신청에 필요한 절차를 확인할 계획이에요.',
      'Magistraturaga ariza berish uchun koreys tili imtihoniga tayyorlanyapman. Imtihondan o‘tsam, universitet va stipendiya arizasi uchun kerakli jarayonlarni tekshiraman.',
      'I am preparing for a Korean exam to apply to graduate school. If I pass, I plan to check the procedures required for the school application and scholarship application.',
      'Я готовлюсь к экзамену по корейскому для поступления в магистратуру. Если сдам его, проверю процедуры подачи документов в университет и на стипендию.',
    ),
    targetExpressions: ['지원', '시험', '합격', '장학금', '신청'],
    tags: ['apply', 'pass', 'scholarship', 'productive'],
    difficulty: 5,
  }),

  s5u1_179_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학교에 들어가기 위해 원서를 내는 것은 ___이고, 시험 기준을 통과하면 ___했다고 하며, 생활비 지원을 받고 싶으면 ___을 신청할 수 있어요.',
    blankAnswers: ['지원', '합격', '장학금'],
    distractors: ['전공', '성적', '강의'],
    translation: L(
      '지원, 합격, 장학금의 관계를 설명하는 문장이에요.',
      'Gap ariza, muvaffaqiyatli o‘tish va stipendiya munosabatini tushuntiradi.',
      'The sentence connects applying, passing, and scholarships.',
      'Предложение связывает подачу заявления, успешный отбор и стипендию.',
    ),
    tags: ['apply', 'pass', 'scholarship'],
    difficulty: 5,
  }),

  s5u1_180_reply_builder: replyBuilder({
    npcText: '장학금에 관심은 있는데 제가 신청 조건에 맞는지 잘 모르겠어요.',
    answer: '공지에서 성적과 학점 기준을 확인하고 신청 기간도 같이 보세요',
    translation: L(
      '공지에서 성적과 학점 기준을 확인하고 신청 기간도 같이 보세요.',
      'E’londan baho va kredit talablarini tekshirib, ariza muddatini ham ko‘ring.',
      'Check the grade and credit requirements in the notice, and check the application period too.',
      'Проверьте в объявлении требования по оценкам и кредитам, а также сроки подачи.',
    ),
    distractors: ['동아리부터', '시험 없이', '그냥 신청하세요'],
    tags: ['scholarship', 'application', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 5 · 한 학기 학업 계획을 세워요
  // 181 ~ 200
  // ─────────────────────────────────────────────────────────────

  s5u1_181_reading_quiz: readingQuiz({
    instruction: L(
      '민수에게 가장 현실적인 다음 학기 계획을 고르세요.',
      'Minsu uchun keyingi semestrdagi eng real rejani tanlang.',
      'Choose the most realistic plan for Minsu next semester.',
      'Выберите наиболее реалистичный план Минсу на следующий семестр.',
    ),
    passageTitle: '민수의 다음 학기',
    passage:
      '민수는 졸업까지 12학점이 더 필요합니다. 장학금을 계속 받으려면 한 학기에 최소 15학점을 들어야 합니다. 전공 필수 과목 세 개가 각각 3학점이고, 독일어와 철학의 이해도 각각 3학점입니다. 민수는 전공 필수 과목을 먼저 끝내고 싶지만 장학금 조건도 유지하고 싶습니다.',
    options: [
      '전공 필수 세 과목과 교양 두 과목을 신청한다',
      '전공 필수 세 과목만 신청한다',
      '철학 한 과목만 신청한다',
      '이번 학기에는 아무 과목도 신청하지 않는다',
    ],
    answer: '전공 필수 세 과목과 교양 두 과목을 신청한다',
    answerTranslation: L(
      '전공 필수 세 과목과 교양 두 과목을 들으면 15학점을 채울 수 있어요.',
      'Uchta majburiy mutaxassislik va ikkita umumiy fan 15 kredit beradi.',
      'Three required major courses plus two general courses provide the 15 credits needed.',
      'Три обязательных профильных предмета и два общих курса дают необходимые 15 кредитов.',
    ),
    hint: L(
      '졸업 준비뿐 아니라 장학금을 위한 최소 15학점 조건도 만족해야 해요.',
      'Faqat bitirish emas, stipendiya uchun kamida 15 kredit shartini ham bajarish kerak.',
      'The plan must also satisfy the scholarship minimum of 15 credits.',
      'План должен также удовлетворять требованию стипендии — минимум 15 кредитов.',
    ),
    tags: ['credit', 'scholarship', 'course-plan'],
    difficulty: 5,
  }),

  s5u1_182_word_matching: wordMatching({
    pairs: [
      { korean: '전공', native: 'mutaxassislik' },
      { korean: '학점', native: 'kredit' },
      { korean: '장학금', native: 'stipendiya' },
      { korean: '수강', native: 'kursni o‘qish' },
      { korean: '합격하다', native: 'o‘tmoq' },
    ],
    tags: ['unit-review', 'academic'],
  }),

  s5u1_183_sentence_builder: sentenceBuilder({
    answer: '전공 과목과 장학금 조건을 함께 생각해서 시간표를 짜야 해요',
    translation: L(
      '전공 과목과 장학금 조건을 함께 생각해서 시간표를 짜야 해요.',
      'Mutaxassislik fanlari va stipendiya shartlarini birga hisobga olib jadval tuzish kerak.',
      'You need to plan your timetable while considering both major courses and scholarship requirements.',
      'Нужно составлять расписание с учётом профильных предметов и требований стипендии.',
    ),
    distractors: ['성적 없이', '무조건 인기만', '졸업식으로'],
    tags: ['major', 'scholarship', 'planning'],
    difficulty: 5,
  }),

  s5u1_184_error_hunt: errorHunt({
    npcText:
      '장학금을 계속 받으려면 이번 학기에 최소 열다섯 성적을 들어야 해요.',
    wrongWord: '성적을',
    options: ['학점을', '성적을', '전공을', '장학금을'],
    answer: '학점을',
    translation: L(
      '장학금을 계속 받으려면 이번 학기에 최소 열다섯 학점을 들어야 해요.',
      'Stipendiyani davom ettirish uchun bu semestrda kamida 15 kredit olish kerak.',
      'To keep the scholarship, you need to take at least 15 credits this semester.',
      'Чтобы сохранить стипендию, в этом семестре нужно набрать минимум 15 кредитов.',
    ),
    hint: L(
      '수업의 양을 숫자로 계산하는 단위는 `성적`이 아니라 `학점`이에요.',
      'Dars miqdorini son bilan hisoblaydigan birlik `성적` emas, `학점`.',
      'The numerical unit measuring course load is `학점`, not `성적`.',
      'Количество учебной нагрузки измеряется `학점`, а не `성적`.',
    ),
    tags: ['credit', 'scholarship', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_185_fill_in_blank: multiBlank({
    sentenceTemplate:
      '시간표를 만들 때 먼저 필요한 ___ 과목을 넣고, 졸업에 필요한 ___과 장학금 조건을 확인한 뒤, 관심 있는 ___를 추가하면 좋아요.',
    blankAnswers: ['전공', '학점', '강의'],
    distractors: ['성적', '합격', '환영회'],
    translation: L(
      '전공, 학점, 관심 강의를 함께 고려해 시간표를 만드는 내용이에요.',
      'Gap jadval tuzishda mutaxassislik, kredit va qiziqqan kurslarni birga hisobga olish haqida.',
      'The sentence describes planning a timetable around major requirements, credits, and lectures of interest.',
      'Предложение описывает составление расписания с учётом специальности, кредитов и интересующих лекций.',
    ),
    tags: ['major', 'credit', 'course-plan'],
    difficulty: 5,
  }),

  s5u1_186_audio_match: audioMatch({
    pairs: [
      { korean: '과목', native: 'fan' },
      { korean: '학점', native: 'kredit' },
      { korean: '수강 신청', native: 'kursga yozilish' },
      { korean: '장학금', native: 'stipendiya' },
      { korean: '성적', native: 'baho' },
    ],
    tags: ['unit-review', 'listening'],
  }),

  s5u1_187_translate_builder: translateBuilder({
    instruction: L(
      '전공 필수 과목을 먼저 신청하고 남는 시간에는 관심 있는 철학 강의를 들을 계획이라고 말하세요.',
      'Avval majburiy mutaxassislik fanlariga yozilib, bo‘sh vaqtda qiziqqan falsafa kursini o‘qishni rejalashtirayotganingizni ayting.',
      'Say that you will register for required major courses first and take a philosophy lecture you are interested in if your schedule allows.',
      'Скажите, что сначала зарегистрируетесь на обязательные профильные предметы, а в свободное время возьмёте интересующий курс философии.',
    ),
    answer:
      '전공 필수 과목을 먼저 신청하고 시간이 남으면 철학 강의도 들을 계획이에요',
    translation: L(
      '전공 필수 과목을 먼저 신청하고 시간이 남으면 철학 강의도 들을 계획이에요.',
      'Avval majburiy mutaxassislik fanlariga yozilib, vaqt qolsa falsafa kursini ham o‘qimoqchiman.',
      'I plan to register for required major courses first and also take a philosophy lecture if I have room in my schedule.',
      'Я планирую сначала записаться на обязательные профильные предметы, а если останется время — взять курс философии.',
    ),
    distractors: ['전공을 포기하고', '성적 없이', '졸업식만'],
    tags: ['major', 'philosophy', 'course-plan'],
    difficulty: 5,
  }),

  s5u1_188_listen_type: listenType({
    audioText: '수강 신청 전에 전공 과목과 필요한 학점을 먼저 확인했어요.',
    translation: L(
      '수강 신청 전에 전공 과목과 필요한 학점을 먼저 확인했어요.',
      'Kursga yozilishdan oldin mutaxassislik fanlari va kerakli kreditlarni tekshirdim.',
      'Before course registration, I first checked my major courses and required credits.',
      'Перед регистрацией на курсы я сначала проверил профильные предметы и необходимые кредиты.',
    ),
    tags: ['course-registration', 'major', 'credit'],
  }),

  s5u1_189_cloze_passage: clozePassage({
    passage:
      '다음 학기 ___ 신청을 준비하면서 먼저 졸업에 필요한 ___을 확인했습니다. 전공 필수 ___ 세 개를 먼저 넣고, 시간이 겹치지 않으면 철학 ___도 신청하려고 합니다. 장학금을 계속 받으려면 평균 ___도 일정 기준 이상을 유지해야 합니다.',
    blankAnswers: ['수강', '학점', '과목', '강의', '성적'],
    distractors: ['강당', '환영회', '선배'],
    translation: L(
      '수강 신청, 학점, 전공 과목, 강의, 성적을 모두 고려하는 학업 계획이에요.',
      'Matn kursga yozilish, kredit, mutaxassislik fanlari, kurs va baholarni birga hisobga oladi.',
      'The passage integrates course registration, credits, major courses, lectures, and grades.',
      'Текст объединяет регистрацию на курсы, кредиты, профильные предметы, лекции и оценки.',
    ),
    tags: ['unit-review', 'course-plan'],
    difficulty: 5,
  }),

  s5u1_190_word_arrange: wordArrange({
    answer:
      '인기만 보고 과목을 고르면 졸업 학점이나 전공 조건을 놓칠 수 있어요',
    translation: L(
      '인기만 보고 과목을 고르면 졸업 학점이나 전공 조건을 놓칠 수 있어요.',
      'Faqat mashhurlikka qarab fan tanlasangiz, bitirish krediti yoki mutaxassislik talablarini o‘tkazib yuborishingiz mumkin.',
      'If you choose courses based only on popularity, you may miss graduation-credit or major requirements.',
      'Если выбирать предметы только по популярности, можно упустить требования по кредитам или специальности.',
    ),
    distractors: ['항상 가장 좋아요', '장학금만', '상관없어요'],
    tags: ['popular-course', 'credit', 'major'],
    difficulty: 5,
  }),

  s5u1_191_reply_builder: replyBuilder({
    npcText:
      '친구들이 철학의 이해가 재미있다고 해서 저도 듣고 싶은데 전공 필수 과목이랑 시간이 겹쳐요.',
    answer:
      '이번에는 전공 필수 과목을 먼저 듣고 철학 강의는 다음 학기에 들어도 될 것 같아요',
    translation: L(
      '이번에는 전공 필수 과목을 먼저 듣고 철학 강의는 다음 학기에 들어도 될 것 같아요.',
      'Bu safar majburiy mutaxassislik fanini birinchi o‘qib, falsafani keyingi semestrga qoldirsangiz bo‘ladi.',
      'It would be better to take the required major course first and leave the philosophy lecture for next semester.',
      'Лучше сначала взять обязательный профильный предмет, а философию оставить на следующий семестр.',
    ),
    distractors: ['둘 다 포기하고', '성적을 지우고', '학점을 버리세요'],
    tags: ['major', 'course-choice', 'reply'],
    difficulty: 5,
  }),

  s5u1_192_verb_transform: verbTransform({
    baseWord: '가입하다',
    targetForm: '현재 · 해요체',
    answer: '가입해요',
    options: ['가', '입', '해', '요', '했', '할'],
    translation: L('가입해요', 'a’zo bo‘laman', 'join', 'вступаю'),
    tags: ['membership', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_193_reading_quiz: readingQuiz({
    instruction: L(
      '학생에게 가장 적절한 조언을 고르세요.',
      'Talabaga eng mos maslahatni tanlang.',
      'Choose the most appropriate advice for the student.',
      'Выберите наиболее подходящий совет студенту.',
    ),
    passage:
      '안나는 다음 학기에 장학금을 계속 받고 싶습니다. 장학금 조건은 15학점 이상 수강과 평균 B+ 이상입니다. 안나는 어려운 전공 과목 네 개를 모두 신청하면 총 12학점이고, 여기에 관심 있는 독일어를 추가하면 15학점이 됩니다. 하지만 공부 시간을 충분히 확보하지 않으면 성적이 떨어질까 봐 걱정하고 있습니다.',
    options: [
      '학점 조건과 성적 유지 가능성을 함께 고려해야 한다',
      '무조건 가장 많은 과목을 신청해야 한다',
      '성적은 장학금과 관계없다',
      '전공 과목을 하나도 들으면 안 된다',
    ],
    answer: '학점 조건과 성적 유지 가능성을 함께 고려해야 한다',
    answerTranslation: L(
      '장학금은 학점뿐 아니라 성적 조건도 있으므로 두 가지를 함께 생각해야 해요.',
      'Stipendiyada kredit bilan birga baho sharti ham bor, shuning uchun ikkalasini hisobga olish kerak.',
      'The scholarship has both credit and grade requirements, so both should be considered.',
      'У стипендии есть требования и по кредитам, и по оценкам, поэтому нужно учитывать оба.',
    ),
    hint: L(
      '많이 듣는 것 자체가 목표가 아니라 `15학점 이상`과 `B+ 이상`을 동시에 유지하는 것이 목표예요.',
      'Maqsad shunchaki ko‘p fan emas, 15 kredit va B+ bahoni birga saqlash.',
      'The goal is not maximum course load; it is satisfying both the 15-credit and B+ requirements.',
      'Цель не в максимальном числе предметов, а в одновременном выполнении требований 15 кредитов и B+.',
    ),
    tags: ['scholarship', 'credit', 'grade', 'judgment'],
    difficulty: 5,
  }),

  s5u1_194_listen_fill: listenFill({
    audioText: '장학금 조건을 유지하려면 학점과 성적을 모두 관리해야 해요.',
    sentenceTemplate:
      '장학금 조건을 유지하려면 ___과 ___을 모두 관리해야 해요.',
    blankAnswers: ['학점', '성적'],
    translation: L(
      '장학금 조건을 유지하려면 학점과 성적을 모두 관리해야 해요.',
      'Stipendiya shartini saqlash uchun kredit va baholarni birga boshqarish kerak.',
      'To maintain scholarship eligibility, you need to manage both credits and grades.',
      'Чтобы сохранить право на стипендию, нужно следить и за кредитами, и за оценками.',
    ),
    tags: ['scholarship', 'grade', 'credit'],
  }),

  s5u1_195_sentence_builder: sentenceBuilder({
    answer: '수강 신청은 재미뿐 아니라 전공과 졸업 조건까지 생각해서 해야 해요',
    translation: L(
      '수강 신청은 재미뿐 아니라 전공과 졸업 조건까지 생각해서 해야 해요.',
      'Kurs tanlashda faqat qiziqarlilik emas, mutaxassislik va bitirish shartlarini ham hisobga olish kerak.',
      'Course registration should consider not only interest but also major and graduation requirements.',
      'При регистрации на курсы нужно учитывать не только интерес, но и требования специальности и выпуска.',
    ),
    distractors: ['인기만', '장학금 없이', '생각하지 마요'],
    tags: ['course-registration', 'major', 'graduation'],
    difficulty: 5,
  }),

  s5u1_196_speaking: speaking({
    npcText:
      '친구에게 다음 학기 수강 계획을 전공, 학점, 관심 과목을 포함해서 설명하고 있어요.',
    answer:
      '전공 필수 과목 세 개를 먼저 신청하고 졸업 학점을 확인한 다음 독일어도 들을 생각이에요.',
    translation: L(
      '전공 필수 과목 세 개를 먼저 신청하고 졸업 학점을 확인한 다음 독일어도 들을 생각이에요.',
      'Avval uchta majburiy mutaxassislik faniga yozilib, bitirish kreditlarini tekshiraman va keyin nemis tilini ham o‘qimoqchiman.',
      'I plan to register for three required major courses first, check my graduation credits, and then take German too.',
      'Сначала я запишусь на три обязательных профильных предмета, проверю кредиты для выпуска, а затем возьму немецкий.',
    ),
    tags: ['course-plan', 'major', 'credit'],
    difficulty: 5,
  }),

  s5u1_197_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '수강 신청 계획 다 세웠어요?',
      },
      {
        speaker: 'user',
        text: '전공 필수 과목은 정했는데 교양은 아직 못 정했어요.',
      },
      {
        speaker: 'npc',
        text: '철학의 이해가 재미있다고 하던데요.',
      },
      {
        speaker: 'user',
        text: '듣고 싶지만 전공 수업이랑 시간이 겹쳐서 다음 학기에 신청하려고 해요.',
      },
      {
        speaker: 'npc',
        text: '그럼 이번에는 전공 과목을 먼저 듣는 게 좋겠네요.',
      },
    ],
    translation: L(
      '전공 필수 과목과 관심 강의의 시간이 겹쳐 우선순위를 정하는 대화예요.',
      'Dialog majburiy fan va qiziqqan kurs vaqti to‘qnashganda ustuvorlikni tanlash haqida.',
      'The dialogue is about prioritizing a required major course when it conflicts with a lecture of interest.',
      'Диалог о выборе приоритета, когда обязательный профильный предмет совпадает по времени с интересующей лекцией.',
    ),
    tags: ['course-registration', 'major', 'course-choice'],
    difficulty: 5,
  }),

  s5u1_198_translate_type: translateType({
    instruction: L(
      '다음 학기 수강 신청에서는 졸업에 필요한 전공 과목과 학점을 먼저 확인하고, 장학금을 유지할 수 있도록 성적 관리가 가능한 범위에서 관심 있는 외국어 강의도 추가할 계획이라고 한국어로 입력하세요.',
      'Keyingi semestrda avval bitirish uchun kerakli mutaxassislik fanlari va kreditlarni tekshirishingizni, stipendiyani saqlash uchun baholarni boshqara oladigan darajada qiziqqan xorijiy til kursini ham qo‘shishingizni koreyscha yozing.',
      'Write in Korean that during next semester’s course registration you will first check required major courses and graduation credits, then add a foreign-language lecture you are interested in only if you can maintain the grades needed for your scholarship.',
      'Напишите по-корейски, что при регистрации на следующий семестр сначала проверите обязательные профильные предметы и кредиты для выпуска, а затем добавите интересующий иностранный язык, если сможете сохранить оценки для стипендии.',
    ),
    answer:
      '다음 학기 수강 신청에서는 졸업에 필요한 전공 과목과 학점을 먼저 확인할 거예요. 그리고 장학금을 유지할 수 있도록 성적을 관리할 수 있는 범위에서 관심 있는 외국어 강의도 추가할 계획이에요.',
    translation: L(
      '다음 학기 수강 신청에서는 졸업에 필요한 전공 과목과 학점을 먼저 확인할 거예요. 그리고 장학금을 유지할 수 있도록 성적을 관리할 수 있는 범위에서 관심 있는 외국어 강의도 추가할 계획이에요.',
      'Keyingi semestrda avval bitirishga kerakli mutaxassislik fanlari va kreditlarni tekshiraman. Keyin stipendiyani saqlash uchun baholarimni boshqara oladigan darajada qiziqqan xorijiy til kursini ham qo‘shaman.',
      'During next semester’s registration, I will first check the major courses and credits needed for graduation. Then I plan to add a foreign-language lecture I am interested in, as long as I can maintain the grades required for my scholarship.',
      'При регистрации на следующий семестр я сначала проверю профильные предметы и кредиты, необходимые для выпуска. Затем добавлю интересующий курс иностранного языка, если смогу сохранить оценки, необходимые для стипендии.',
    ),
    targetExpressions: [
      '수강 신청',
      '전공 과목',
      '학점',
      '장학금',
      '성적',
      '외국어 강의',
    ],
    tags: ['unit-review', 'course-plan', 'productive'],
    difficulty: 5,
  }),

  s5u1_199_fill_in_blank: multiBlank({
    sentenceTemplate:
      '대학생은 ___ 신청을 할 때 자신의 ___, 졸업에 필요한 ___, 장학금에 필요한 ___을 함께 확인하면 더 현실적인 시간표를 만들 수 있어요.',
    blankAnswers: ['수강', '전공', '학점', '성적'],
    distractors: ['강당', '환영회', '주차장'],
    translation: L(
      '수강 신청에서 전공, 학점, 성적을 함께 고려해야 한다는 문장이에요.',
      'Gap kursga yozilishda mutaxassislik, kredit va baholarni birga hisobga olish kerakligini aytadi.',
      'The sentence explains that major requirements, credits, and grades should all be considered during course registration.',
      'Предложение объясняет, что при регистрации на курсы нужно учитывать специальность, кредиты и оценки.',
    ),
    tags: ['unit-review', 'course-registration'],
    difficulty: 5,
  }),

  s5u1_200_reply_builder: replyBuilder({
    npcText:
      '재미있고 인기 있는 강의만 골라서 신청하려고 하는데 그렇게 해도 괜찮겠죠?',
    answer:
      '전공 필수 과목과 졸업 학점도 먼저 확인한 뒤에 관심 강의를 선택하는 게 좋아요',
    translation: L(
      '전공 필수 과목과 졸업 학점도 먼저 확인한 뒤에 관심 강의를 선택하는 게 좋아요.',
      'Avval majburiy mutaxassislik fanlari va bitirish kreditlarini tekshirib, keyin qiziqqan kurslarni tanlaganingiz yaxshi.',
      'It is better to check your required major courses and graduation credits first, then choose lectures you are interested in.',
      'Лучше сначала проверить обязательные профильные предметы и кредиты для выпуска, а потом выбирать интересные лекции.',
    ),
    distractors: ['인기만 보면', '성적은 필요 없고', '모두 신청하세요'],
    tags: ['course-registration', 'major', 'credit', 'reply'],
    difficulty: 5,
  }),
  // ═══════════════════════════════════════════════════════════
  // NODE 3 · 한국 유학 생활 안내
  // 201 ~ 300
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────
  // Lesson 1 · 입국 후 필요한 일을 확인해요
  // 201 ~ 220
  // ─────────────────────────────────────────────────────────────

  s5u1_201_reading_quiz: readingQuiz({
    instruction: L(
      '한국에 막 도착한 유학생이 가장 먼저 확인해야 할 행정 정보를 고르세요.',
      'Koreyaga endigina kelgan talaba birinchi navbatda tekshirishi kerak bo‘lgan ma’muriy ma’lumotni tanlang.',
      'Choose the administrative information a newly arrived international student should check first.',
      'Выберите административную информацию, которую прежде всего нужно проверить недавно прибывшему иностранному студенту.',
    ),
    passageTitle: '처음 시작하는 한국 생활',
    passage:
      '아지즈는 이번 학기에 한국 대학교에 입학해서 어제 한국에 입국했습니다. 학교 수업과 동아리에도 관심이 많지만 먼저 한국에서 생활하기 위해 필요한 외국인 등록 절차와 준비할 서류를 확인해야 합니다.',
    options: [
      '외국인 등록 절차',
      '노래자랑 참가 방법',
      '졸업식 좌석',
      '축제 공연 시간',
    ],
    answer: '외국인 등록 절차',
    answerTranslation: L(
      '외국인 등록 절차',
      'xorijlikni ro‘yxatdan o‘tkazish jarayoni',
      'foreigner registration procedure',
      'процедура регистрации иностранца',
    ),
    tags: ['immigration', 'foreigner-registration'],
    difficulty: 5,
  }),

  s5u1_202_word_matching: wordMatching({
    pairs: [
      { korean: '유학생', native: 'xorijiy talaba' },
      { korean: '입국', native: 'mamlakatga kirish' },
      { korean: '숙소', native: 'turar joy' },
      { korean: '환승', native: 'transport almashtirish' },
      { korean: '할인', native: 'chegirma' },
    ],
    tags: ['study-abroad', 'core-vocabulary'],
  }),

  s5u1_203_sentence_builder: sentenceBuilder({
    answer: '한국에 입국한 뒤에는 필요한 등록 절차를 먼저 확인해야 해요',
    translation: L(
      '한국에 입국한 뒤에는 필요한 등록 절차를 먼저 확인해야 해요.',
      'Koreyaga kirgandan keyin kerakli ro‘yxatdan o‘tish jarayonini avval tekshirish kerak.',
      'After entering Korea, you should first check the required registration procedures.',
      'После въезда в Корею сначала нужно проверить необходимые процедуры регистрации.',
    ),
    distractors: ['축제부터', '상금만', '잊어버려요'],
    tags: ['immigration', 'registration'],
    difficulty: 5,
  }),

  s5u1_204_error_hunt: errorHunt({
    npcText: '유학생은 필요한 경우 외국인 등록증을 해야 해요.',
    wrongWord: '등록증을',
    options: ['등록을', '등록증을', '등록에', '등록으로'],
    answer: '등록을',
    translation: L(
      '유학생은 필요한 경우 외국인 등록을 해야 해요.',
      'Xorijiy talaba kerak bo‘lsa xorijlik sifatida ro‘yxatdan o‘tishi kerak.',
      'An international student must complete foreigner registration when required.',
      'Иностранному студенту при необходимости нужно пройти регистрацию.',
    ),
    hint: L(
      '`등록증`은 문서이고, 여기서는 행정 절차를 `하다`라고 말하고 있어요.',
      '`등록증` hujjat, bu yerda esa ma’muriy jarayonni bajarish haqida gap ketyapti.',
      '`등록증` is the document; this sentence is about completing the registration procedure.',
      '`등록증` — документ, а здесь речь идёт о прохождении процедуры регистрации.',
    ),
    tags: ['foreigner-registration', 'meaning-contrast'],
    difficulty: 5,
  }),

  s5u1_205_fill_in_blank: multiBlank({
    sentenceTemplate:
      '다른 나라에 들어오는 것은 ___이고, 한국에서 외국인으로 필요한 정보를 공식적으로 등록하는 절차는 ___이며, 그 절차와 관련된 신분 확인 문서는 ___이에요.',
    blankAnswers: ['입국', '외국인 등록', '외국인등록증'],
    distractors: ['환승', '기숙사', '교통카드'],
    translation: L(
      '입국, 외국인 등록, 외국인등록증의 의미 차이를 구별하는 문장이에요.',
      'Gap mamlakatga kirish, xorijlikni ro‘yxatdan o‘tkazish va ro‘yxat kartasini farqlaydi.',
      'The sentence distinguishes entry into a country, foreigner registration, and the registration card.',
      'Предложение различает въезд в страну, регистрацию иностранца и регистрационную карту.',
    ),
    tags: ['immigration', 'registration'],
    difficulty: 5,
  }),

  s5u1_206_audio_match: audioMatch({
    pairs: [
      { korean: '유학생', native: 'xorijiy talaba' },
      { korean: '입국', native: 'kirish' },
      { korean: '숙소', native: 'turar joy' },
      { korean: '환승', native: 'пересадка' },
      { korean: '할인', native: 'chegirma' },
    ],
    tags: ['study-abroad', 'listening'],
  }),

  s5u1_207_translate_builder: translateBuilder({
    instruction: L(
      '한국에 입국한 뒤 외국인 등록에 필요한 정보를 확인했다고 말하세요.',
      'Koreyaga kirgandan keyin xorijlik ro‘yxatidan o‘tish uchun kerakli ma’lumotlarni tekshirganingizni ayting.',
      'Say that you checked the information required for foreigner registration after entering Korea.',
      'Скажите, что после въезда в Корею вы проверили информацию, необходимую для регистрации иностранца.',
    ),
    answer: '한국에 입국한 뒤 외국인 등록에 필요한 정보를 확인했어요',
    translation: L(
      '한국에 입국한 뒤 외국인 등록에 필요한 정보를 확인했어요.',
      'Koreyaga kirgandan keyin xorijlikni ro‘yxatdan o‘tkazish uchun kerakli ma’lumotlarni tekshirdim.',
      'After entering Korea, I checked the information required for foreigner registration.',
      'После въезда в Корею я проверил информацию, необходимую для регистрации иностранца.',
    ),
    distractors: ['축제에', '상금을', '버렸어요'],
    tags: ['immigration', 'registration'],
    difficulty: 5,
  }),

  s5u1_208_speaking: speaking({
    npcText:
      '새로 온 유학생 친구에게 한국에서 생활을 시작하기 전에 확인해야 할 일을 알려 주고 있어요.',
    answer: '입국 후 필요한 외국인 등록 절차부터 확인해 보는 게 좋아요.',
    translation: L(
      '입국 후 필요한 외국인 등록 절차부터 확인해 보는 게 좋아요.',
      'Kirgandan keyin avval xorijlikni ro‘yxatdan o‘tkazish jarayonini tekshirganingiz yaxshi.',
      'It is a good idea to check the required foreigner registration procedure first.',
      'Лучше сначала проверить необходимые процедуры регистрации иностранца.',
    ),
    tags: ['immigration', 'advice'],
    difficulty: 5,
  }),

  s5u1_209_cloze_passage: clozePassage({
    passage:
      '저는 이번 학기에 한국으로 ___했습니다. 처음에는 수업 일정만 생각했지만 유학생에게 필요한 행정 절차도 있다는 것을 알게 되었습니다. 그래서 ___ 등록에 필요한 내용을 확인하고 관련 업무를 처리하는 ___에 대해서도 알아봤습니다.',
    blankAnswers: ['입국', '외국인', '출입국관리사무소'],
    distractors: ['기숙사', '환승', '부동산'],
    translation: L(
      '한국에 입국한 유학생이 외국인 등록과 관련 기관을 확인하는 내용이에요.',
      'Koreyaga kelgan xorijiy talabaning ro‘yxatdan o‘tish va tegishli idorani tekshirishi haqida.',
      'The passage describes an international student checking foreigner registration and the relevant office after entering Korea.',
      'Текст рассказывает об иностранном студенте, который после въезда проверяет процедуру регистрации и соответствующее учреждение.',
    ),
    tags: ['immigration', 'registration'],
    difficulty: 5,
  }),

  s5u1_210_word_arrange: wordArrange({
    answer: '행정 절차는 필요한 기관과 준비물을 미리 확인하면 훨씬 편해요',
    translation: L(
      '행정 절차는 필요한 기관과 준비물을 미리 확인하면 훨씬 편해요.',
      'Ma’muriy jarayon uchun kerakli idora va hujjatlarni oldindan tekshirish ancha qulay.',
      'Administrative procedures are much easier if you check the required office and materials in advance.',
      'Административные процедуры намного проще, если заранее проверить нужное учреждение и необходимые документы.',
    ),
    distractors: ['아무 준비 없이', '축제만', '확인하지 마요'],
    tags: ['immigration', 'practical-life'],
    difficulty: 5,
  }),

  s5u1_211_reply_builder: replyBuilder({
    npcText: '한국에 어제 도착했는데 수업 준비만 하면 되는 줄 알았어요.',
    answer: '유학생에게 필요한 등록 절차도 있는지 먼저 확인해 보세요',
    translation: L(
      '유학생에게 필요한 등록 절차도 있는지 먼저 확인해 보세요.',
      'Xorijiy talabaga kerakli ro‘yxatdan o‘tish jarayoni bor-yo‘qligini ham tekshiring.',
      'First check whether there are registration procedures required for international students.',
      'Сначала проверьте, есть ли процедуры регистрации, необходимые иностранным студентам.',
    ),
    distractors: ['노래자랑부터', '학점만', '필요 없어요'],
    tags: ['immigration', 'reply'],
    difficulty: 5,
  }),

  s5u1_212_verb_transform: verbTransform({
    baseWord: '입국하다',
    targetForm: '과거 · 해요체',
    answer: '입국했어요',
    options: ['입', '국', '했', '어', '요', '하', '갈'],
    translation: L(
      '입국했어요',
      'mamlakatga kirdim',
      'entered the country',
      'въехал в страну',
    ),
    tags: ['immigration', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_213_reading_quiz: readingQuiz({
    instruction: L(
      '다음 설명 중 `외국인등록증`에 대한 것을 고르세요.',
      '`외국인등록증` haqida to‘g‘ri izohni tanlang.',
      'Choose the description of `외국인등록증`.',
      'Выберите описание `외국인등록증`.',
    ),
    passage:
      '① 한국에 들어오는 행동\n② 외국인이 정보를 공식적으로 등록하는 절차\n③ 등록을 마친 외국인의 신분을 확인할 때 사용하는 문서\n④ 학생들이 생활하는 학교 시설',
    options: ['③', '①', '②', '④'],
    answer: '③',
    answerTranslation: L(
      '외국인등록증은 외국인의 신분 확인과 관련된 증명서예요.',
      '외국인등록증 xorijlikning shaxsini tasdiqlovchi hujjat.',
      'A foreigner registration card is identification related to a registered foreign resident.',
      'Регистрационная карта иностранца является документом для подтверждения личности.',
    ),
    tags: ['registration-card', 'meaning'],
    difficulty: 5,
  }),

  s5u1_214_listen_type: listenType({
    audioText: '한국에 입국한 뒤 필요한 외국인 등록 절차를 알아봤어요.',
    translation: L(
      '한국에 입국한 뒤 필요한 외국인 등록 절차를 알아봤어요.',
      'Koreyaga kirgandan keyin kerakli xorijlik ro‘yxati jarayonini o‘rgandim.',
      'After entering Korea, I looked into the required foreigner registration procedure.',
      'После въезда в Корею я узнал о необходимых процедурах регистрации иностранца.',
    ),
    tags: ['immigration', 'dictation'],
  }),

  s5u1_215_sentence_builder: sentenceBuilder({
    answer: '외국인 등록과 외국인등록증은 서로 다른 의미라서 구별해야 해요',
    translation: L(
      '외국인 등록과 외국인등록증은 서로 다른 의미라서 구별해야 해요.',
      'Xorijlikni ro‘yxatdan o‘tkazish bilan ro‘yxat kartasi boshqa tushuncha, ularni farqlash kerak.',
      'Foreigner registration and the registration card have different meanings and should be distinguished.',
      'Регистрация иностранца и регистрационная карта имеют разные значения, поэтому их нужно различать.',
    ),
    distractors: ['완전히 같아서', '환승과', '구별하지 마요'],
    tags: ['registration', 'meaning-contrast'],
    difficulty: 5,
  }),

  s5u1_216_listen_fill: listenFill({
    audioText: '유학생은 입국 후 필요한 등록 정보를 확인해야 해요.',
    sentenceTemplate: '유학생은 ___ 후 필요한 ___ 정보를 확인해야 해요.',
    blankAnswers: ['입국', '등록'],
    translation: L(
      '유학생은 입국 후 필요한 등록 정보를 확인해야 해요.',
      'Xorijiy talaba kirgandan keyin kerakli ro‘yxat ma’lumotini tekshirishi kerak.',
      'International students should check required registration information after entering the country.',
      'Иностранному студенту после въезда нужно проверить информацию о регистрации.',
    ),
    tags: ['immigration', 'registration'],
  }),

  s5u1_217_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국에는 언제 입국했어요?',
      },
      {
        speaker: 'user',
        text: '어제 도착했어요.',
      },
      {
        speaker: 'npc',
        text: '외국인 등록에 필요한 정보는 확인했어요?',
      },
      {
        speaker: 'user',
        text: '아직이요. 어디에서 알아볼 수 있어요?',
      },
      {
        speaker: 'npc',
        text: '학교 안내와 출입국 관련 기관 정보를 먼저 확인해 보세요.',
      },
    ],
    translation: L(
      '새 유학생이 입국 후 등록 정보를 확인하는 대화예요.',
      'Yangi xorijiy talaba kirgandan keyin ro‘yxat ma’lumotini tekshirayotgan dialog.',
      'The dialogue is about a new international student checking registration information after arrival.',
      'Диалог о новом иностранном студенте, который после приезда уточняет информацию о регистрации.',
    ),
    tags: ['immigration', 'registration'],
    difficulty: 5,
  }),

  s5u1_218_translate_type: translateType({
    instruction: L(
      '이번 학기에 한국에 입국한 유학생이며, 외국인 등록에 필요한 절차와 관련 기관을 미리 확인하고 있다고 한국어로 입력하세요.',
      'Bu semestr Koreyaga kelgan xorijiy talaba ekaningizni va xorijlik ro‘yxatiga kerakli jarayon hamda tegishli idorani oldindan tekshirayotganingizni koreyscha yozing.',
      'Write in Korean that you are an international student who entered Korea this semester and are checking the required foreigner registration procedure and relevant office in advance.',
      'Напишите по-корейски, что вы иностранный студент, приехавший в Корею в этом семестре, и заранее проверяете процедуру регистрации и соответствующее учреждение.',
    ),
    answer:
      '저는 이번 학기에 한국에 입국한 유학생이에요. 외국인 등록에 필요한 절차와 관련 기관을 미리 확인하고 있어요.',
    translation: L(
      '저는 이번 학기에 한국에 입국한 유학생이에요. 외국인 등록에 필요한 절차와 관련 기관을 미리 확인하고 있어요.',
      'Men bu semestr Koreyaga kelgan xorijiy talabaman. Xorijlik ro‘yxatiga kerakli jarayon va idorani oldindan tekshiryapman.',
      'I am an international student who entered Korea this semester. I am checking the required foreigner registration procedure and relevant office in advance.',
      'Я иностранный студент, приехавший в Корею в этом семестре. Я заранее проверяю процедуру регистрации и соответствующее учреждение.',
    ),
    targetExpressions: ['입국', '유학생', '외국인 등록'],
    tags: ['immigration', 'productive'],
    difficulty: 5,
  }),

  s5u1_219_fill_in_blank: multiBlank({
    sentenceTemplate:
      '처음 한국에 온 ___은 수업 준비뿐 아니라 ___ 후 필요한 행정 절차와 외국인 ___ 정보도 확인하는 것이 좋아요.',
    blankAnswers: ['유학생', '입국', '등록'],
    distractors: ['선배', '환승', '할인'],
    translation: L(
      '유학생이 입국 후 등록 정보를 확인해야 한다는 내용이에요.',
      'Xorijiy talaba kirgandan keyin ro‘yxat ma’lumotini tekshirishi kerakligi haqida.',
      'The sentence explains that international students should check registration information after arrival.',
      'Предложение объясняет, что иностранному студенту после приезда нужно проверить информацию о регистрации.',
    ),
    tags: ['immigration', 'review'],
    difficulty: 5,
  }),

  s5u1_220_reply_builder: replyBuilder({
    npcText: '외국인 등록하고 외국인등록증이 같은 말인 줄 알았어요.',
    answer: '등록은 절차이고 등록증은 신분을 확인하는 문서예요',
    translation: L(
      '등록은 절차이고 등록증은 신분을 확인하는 문서예요.',
      'Ro‘yxatdan o‘tish — jarayon, ro‘yxat kartasi esa shaxsni tasdiqlovchi hujjat.',
      'Registration is a procedure, while the registration card is an identification document.',
      'Регистрация — это процедура, а регистрационная карта — документ, удостоверяющий личность.',
    ),
    distractors: ['둘 다 숙소예요', '둘 다 환승이에요', '차이가 없어요'],
    tags: ['registration', 'meaning-contrast'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 2 · 살 곳을 준비해요
  // 221 ~ 240
  // ─────────────────────────────────────────────────────────────

  s5u1_221_reading_quiz: readingQuiz({
    instruction: L(
      '학생의 상황에 가장 맞는 행동을 고르세요.',
      'Talabaning holatiga eng mos harakatni tanlang.',
      'Choose the action that best fits the student’s situation.',
      'Выберите действие, которое лучше всего подходит ситуации студента.',
    ),
    passage:
      '나탈리아는 다음 학기에 한국으로 유학을 갑니다. 학교 기숙사에서 살고 싶지만 아직 신청 일정과 조건을 확인하지 않았습니다. 한국에 도착한 뒤 숙소가 없어서 급하게 방을 찾는 상황은 피하고 싶습니다.',
    options: [
      '한국에 가기 전에 기숙사 신청 정보를 확인한다',
      '도착할 때까지 숙소를 전혀 알아보지 않는다',
      '졸업식 장소부터 찾는다',
      '노래자랑 신청만 한다',
    ],
    answer: '한국에 가기 전에 기숙사 신청 정보를 확인한다',
    answerTranslation: L(
      '한국에 가기 전에 기숙사 신청 정보를 확인하는 것이 좋아요.',
      'Koreyaga borishdan oldin yotoqxona ariza ma’lumotini tekshirish yaxshi.',
      'It is best to check dormitory application information before going to Korea.',
      'Лучше проверить информацию о подаче заявления в общежитие до приезда в Корею.',
    ),
    tags: ['housing', 'dormitory'],
    difficulty: 5,
  }),

  s5u1_222_word_matching: wordMatching({
    pairs: [
      { korean: '숙소', native: 'turar joy' },
      { korean: '기숙사', native: 'yotoqxona' },
      { korean: '부동산', native: 'rieltorlik' },
      { korean: '유학생', native: 'xorijiy talaba' },
      { korean: '할인', native: 'chegirma' },
    ],
    tags: ['housing', 'study-abroad'],
  }),

  s5u1_223_sentence_builder: sentenceBuilder({
    answer: '한국에 오기 전에 기숙사 신청 기간과 조건을 확인했어요',
    translation: L(
      '한국에 오기 전에 기숙사 신청 기간과 조건을 확인했어요.',
      'Koreyaga kelishdan oldin yotoqxona ariza muddati va shartlarini tekshirdim.',
      'Before coming to Korea, I checked the dormitory application period and requirements.',
      'Перед приездом в Корею я проверил сроки и условия подачи заявления в общежитие.',
    ),
    distractors: ['숙소 없이', '축제 조건을', '버렸어요'],
    tags: ['dormitory', 'housing'],
    difficulty: 5,
  }),

  s5u1_224_error_hunt: errorHunt({
    npcText: '학교 밖에서 방을 찾으려고 근처 기숙사에 가서 집을 알아봤어요.',
    wrongWord: '기숙사에',
    options: ['부동산에', '기숙사에', '강당에', '게시판에'],
    answer: '부동산에',
    translation: L(
      '학교 밖에서 방을 찾으려고 근처 부동산에 가서 집을 알아봤어요.',
      'Universitet tashqarisidan xona topish uchun yaqin rieltorlik idorasiga bordim.',
      'I went to a nearby real estate agency to look for an off-campus room.',
      'Я пошёл в ближайшее агентство недвижимости искать комнату вне кампуса.',
    ),
    hint: L(
      '학교 밖의 방을 중개해서 찾아 주는 곳을 생각하세요.',
      'Universitet tashqarisidagi xonalarni topishga yordam beradigan joyni o‘ylang.',
      'Think of the place that helps people find rental housing off campus.',
      'Подумайте о месте, где помогают найти съёмное жильё вне кампуса.',
    ),
    tags: ['housing', 'real-estate'],
    difficulty: 5,
  }),

  s5u1_225_fill_in_blank: multiBlank({
    sentenceTemplate:
      '유학생이 머물면서 생활하는 곳을 넓게 ___라고 하고, 학교에서 운영하는 학생용 주거 시설은 ___이며, 학교 밖에서 방을 알아볼 때 이용할 수 있는 곳은 ___이에요.',
    blankAnswers: ['숙소', '기숙사', '부동산'],
    distractors: ['강당', '주차장', '게시판'],
    translation: L(
      '숙소, 기숙사, 부동산의 차이를 구별하는 문장이에요.',
      'Gap turar joy, yotoqxona va rieltorlik idorasini farqlaydi.',
      'The sentence distinguishes accommodation, a dormitory, and a real estate agency.',
      'Предложение различает жильё, общежитие и агентство недвижимости.',
    ),
    tags: ['housing', 'meaning-contrast'],
    difficulty: 5,
  }),

  s5u1_226_audio_match: audioMatch({
    pairs: [
      { korean: '숙소', native: 'turar joy' },
      { korean: '기숙사', native: 'yotoqxona' },
      { korean: '부동산', native: 'rieltorlik' },
      { korean: '입국', native: 'mamlakatga kirish' },
      { korean: '환승', native: 'пересадка' },
    ],
    tags: ['housing', 'listening'],
  }),

  s5u1_227_translate_builder: translateBuilder({
    instruction: L(
      '기숙사에 들어가지 못하면 학교 근처 부동산에서 다른 숙소를 알아볼 계획이라고 말하세요.',
      'Yotoqxonaga kira olmasangiz, universitet yaqinidagi rieltorlikdan boshqa turar joy qidirishingizni ayting.',
      'Say that if you cannot get into the dormitory, you plan to look for other accommodation through a real estate agency near school.',
      'Скажите, что если не получится жить в общежитии, вы планируете искать другое жильё через агентство недвижимости рядом с университетом.',
    ),
    answer:
      '기숙사에 들어가지 못하면 학교 근처 부동산에서 다른 숙소를 알아볼 계획이에요',
    translation: L(
      '기숙사에 들어가지 못하면 학교 근처 부동산에서 다른 숙소를 알아볼 계획이에요.',
      'Yotoqxonaga kira olmasam, universitet yaqinidagi rieltorlikdan boshqa turar joy qidiraman.',
      'If I cannot get into the dormitory, I plan to look for other accommodation through a real estate agency near school.',
      'Если я не смогу попасть в общежитие, то буду искать другое жильё через агентство недвижимости рядом с университетом.',
    ),
    distractors: ['졸업식에서', '강당만', '버릴 거예요'],
    tags: ['dormitory', 'real-estate', 'housing'],
    difficulty: 5,
  }),

  s5u1_228_speaking: speaking({
    npcText:
      '친구에게 한국에 오기 전에 숙소를 어떻게 준비할 건지 설명하고 있어요.',
    answer: '먼저 기숙사에 신청하고 안 되면 학교 근처에서 방을 알아볼 거예요.',
    translation: L(
      '먼저 기숙사에 신청하고 안 되면 학교 근처에서 방을 알아볼 거예요.',
      'Avval yotoqxonaga ariza beraman, bo‘lmasa universitet yaqinidan xona qidiraman.',
      'I will apply for the dormitory first, and if that does not work, I will look for a room near school.',
      'Сначала я подам заявление в общежитие, а если не получится, буду искать комнату рядом с университетом.',
    ),
    tags: ['housing', 'planning'],
    difficulty: 5,
  }),

  s5u1_229_cloze_passage: clozePassage({
    passage:
      '한국으로 유학을 오기 전에 ___를 정하는 것이 중요합니다. 저는 먼저 학교 ___를 신청했습니다. 결과가 좋지 않으면 학교 밖에서 방을 구해야 해서 근처 ___ 정보도 미리 찾아봤습니다.',
    blankAnswers: ['숙소', '기숙사', '부동산'],
    distractors: ['환승', '상금', '강당'],
    translation: L(
      '기숙사와 부동산을 이용해 숙소를 준비하는 내용이에요.',
      'Matnda yotoqxona va rieltorlik orqali turar joy tayyorlash haqida.',
      'The passage describes preparing accommodation using a dormitory or real estate agency.',
      'Текст рассказывает о подготовке жилья через общежитие или агентство недвижимости.',
    ),
    tags: ['housing', 'study-abroad'],
    difficulty: 5,
  }),

  s5u1_230_word_arrange: wordArrange({
    answer: '유학을 준비할 때는 수업뿐 아니라 살 곳도 미리 준비해야 해요',
    translation: L(
      '유학을 준비할 때는 수업뿐 아니라 살 곳도 미리 준비해야 해요.',
      'Chet elda o‘qishga tayyorlanayotganda nafaqat darslarni, balki yashash joyini ham oldindan tayyorlash kerak.',
      'When preparing to study abroad, you need to prepare not only for classes but also for where you will live.',
      'При подготовке к учёбе за границей нужно заранее продумать не только занятия, но и жильё.',
    ),
    distractors: ['숙소는 필요 없고', '축제만', '나중에 생각해요'],
    tags: ['housing', 'study-abroad'],
    difficulty: 5,
  }),

  s5u1_231_reply_builder: replyBuilder({
    npcText: '기숙사 신청을 못 했는데 다음 달에 한국에 가야 해요.',
    answer: '학교 근처 부동산에서 미리 숙소를 알아보는 게 좋겠어요',
    translation: L(
      '학교 근처 부동산에서 미리 숙소를 알아보는 게 좋겠어요.',
      'Universitet yaqinidagi rieltorlikdan oldindan turar joy qidirganingiz yaxshi.',
      'It would be good to look for accommodation through a real estate agency near school in advance.',
      'Лучше заранее поискать жильё через агентство недвижимости рядом с университетом.',
    ),
    distractors: ['아무 준비 없이', '환승만', '졸업하세요'],
    tags: ['housing', 'reply'],
    difficulty: 5,
  }),

  s5u1_232_verb_transform: verbTransform({
    baseWord: '버리다',
    targetForm: '현재 · 해요체',
    answer: '버려요',
    options: ['버', '려', '요', '리', '렸', '릴'],
    translation: L('버려요', 'tashlayman', 'throw away', 'выбрасываю'),
    tags: ['trash', 'verb-transform'],
    difficulty: 4,
  }),

  s5u1_233_reading_quiz: readingQuiz({
    instruction: L(
      '다음 중 `숙소`에 포함될 수 있는 것을 모두 설명한 답을 고르세요.',
      '`숙소` tushunchasiga kirishi mumkin bo‘lgan narsalarni to‘g‘ri tushuntirgan javobni tanlang.',
      'Choose the statement that correctly describes what can count as accommodation.',
      'Выберите вариант, правильно описывающий, что может считаться жильём.',
    ),
    passage:
      '숙소는 일정 기간 머물며 생활하는 곳을 넓게 말합니다. 학교 기숙사에서 살 수도 있고 학교 밖에서 구한 방에서 생활할 수도 있습니다.',
    options: [
      '기숙사와 학교 밖에서 구한 방 모두 숙소가 될 수 있다',
      '숙소는 항상 기숙사만 뜻한다',
      '숙소는 강의실을 뜻한다',
      '숙소는 교통카드를 뜻한다',
    ],
    answer: '기숙사와 학교 밖에서 구한 방 모두 숙소가 될 수 있다',
    answerTranslation: L(
      '숙소는 기숙사뿐 아니라 다른 형태의 살 곳도 포함할 수 있어요.',
      'Turar joy yotoqxona bilan birga boshqa yashash joylarini ham anglatishi mumkin.',
      'Accommodation can include a dormitory as well as other places to live.',
      'Понятие жилья может включать как общежитие, так и другие места проживания.',
    ),
    tags: ['housing', 'meaning'],
    difficulty: 5,
  }),

  s5u1_234_listen_type: listenType({
    audioText: '기숙사에 들어가지 못해서 학교 근처 부동산에서 방을 구했어요.',
    translation: L(
      '기숙사에 들어가지 못해서 학교 근처 부동산에서 방을 구했어요.',
      'Yotoqxonaga kira olmaganim uchun universitet yaqinidagi rieltorlikdan xona topdim.',
      'I could not get into the dormitory, so I found a room through a real estate agency near school.',
      'Я не смог поселиться в общежитии, поэтому нашёл комнату через агентство недвижимости рядом с университетом.',
    ),
    tags: ['housing', 'dictation'],
  }),

  s5u1_235_sentence_builder: sentenceBuilder({
    answer: '숙소를 구할 때는 위치와 생활 조건도 함께 확인하는 게 좋아요',
    translation: L(
      '숙소를 구할 때는 위치와 생활 조건도 함께 확인하는 게 좋아요.',
      'Turar joy izlaganda joylashuv va yashash sharoitlarini ham tekshirish yaxshi.',
      'When looking for accommodation, it is good to check the location and living conditions too.',
      'При поиске жилья полезно также проверять расположение и условия проживания.',
    ),
    distractors: ['위치는 중요하지 않고', '상금만', '확인하지 마요'],
    tags: ['housing', 'judgment'],
    difficulty: 5,
  }),

  s5u1_236_listen_fill: listenFill({
    audioText: '기숙사를 신청하지 못해서 다른 숙소를 알아보고 있어요.',
    sentenceTemplate: '___를 신청하지 못해서 다른 ___를 알아보고 있어요.',
    blankAnswers: ['기숙사', '숙소'],
    translation: L(
      '기숙사를 신청하지 못해서 다른 숙소를 알아보고 있어요.',
      'Yotoqxonaga ariza bera olmaganim uchun boshqa turar joy qidiryapman.',
      'I could not apply for the dormitory, so I am looking for other accommodation.',
      'Я не смог подать заявление в общежитие, поэтому ищу другое жильё.',
    ),
    tags: ['housing', 'dictation'],
  }),

  s5u1_237_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국에서 어디에서 살 거예요?',
      },
      {
        speaker: 'user',
        text: '학교 기숙사에 신청했어요.',
      },
      {
        speaker: 'npc',
        text: '기숙사에 못 들어가면 어떻게 할 거예요?',
      },
      {
        speaker: 'user',
        text: '학교 근처 부동산에서 다른 숙소를 알아볼 거예요.',
      },
      {
        speaker: 'npc',
        text: '미리 알아보면 훨씬 편하겠네요.',
      },
    ],
    translation: L(
      '기숙사와 다른 숙소 계획을 이야기하는 대화예요.',
      'Yotoqxona va boshqa turar joy rejasi haqida dialog.',
      'The dialogue discusses dormitory and alternative accommodation plans.',
      'Диалог о плане проживания в общежитии или другом жилье.',
    ),
    tags: ['housing', 'planning'],
    difficulty: 5,
  }),

  s5u1_238_translate_type: translateType({
    instruction: L(
      '한국에 오기 전에 기숙사를 신청했으며, 기숙사에 들어가지 못할 경우 학교 근처 부동산을 이용해서 다른 숙소를 구할 계획이라고 한국어로 입력하세요.',
      'Koreyaga kelishdan oldin yotoqxonaga ariza berganingizni va kira olmasangiz universitet yaqinidagi rieltorlik orqali boshqa turar joy topishingizni koreyscha yozing.',
      'Write in Korean that you applied for a dormitory before coming to Korea and plan to find other accommodation through a nearby real estate agency if you cannot get a dormitory room.',
      'Напишите по-корейски, что до приезда в Корею вы подали заявление в общежитие, а если не сможете туда попасть, найдёте другое жильё через агентство недвижимости рядом с университетом.',
    ),
    answer:
      '한국에 오기 전에 기숙사를 신청했어요. 기숙사에 들어가지 못하면 학교 근처 부동산을 이용해서 다른 숙소를 구할 계획이에요.',
    translation: L(
      '한국에 오기 전에 기숙사를 신청했어요. 기숙사에 들어가지 못하면 학교 근처 부동산을 이용해서 다른 숙소를 구할 계획이에요.',
      'Koreyaga kelishdan oldin yotoqxonaga ariza berdim. Kira olmasam, universitet yaqinidagi rieltorlik orqali boshqa turar joy topaman.',
      'I applied for a dormitory before coming to Korea. If I cannot get in, I plan to find other accommodation through a real estate agency near school.',
      'До приезда в Корею я подал заявление в общежитие. Если не получится туда попасть, я найду другое жильё через агентство недвижимости рядом с университетом.',
    ),
    targetExpressions: ['기숙사', '부동산', '숙소'],
    tags: ['housing', 'productive'],
    difficulty: 5,
  }),

  s5u1_239_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학교 안에서 학생들이 생활하는 곳은 ___이고, 더 넓은 의미의 살 곳은 ___이며, 학교 밖의 방을 찾을 때 도움을 받을 수 있는 곳은 ___이에요.',
    blankAnswers: ['기숙사', '숙소', '부동산'],
    distractors: ['강당', '교통카드', '쓰레기봉투'],
    translation: L(
      '기숙사, 숙소, 부동산을 종합해서 구별하는 문장이에요.',
      'Gap yotoqxona, turar joy va rieltorlikni umumlashtirib farqlaydi.',
      'The sentence reviews the differences among dormitory, accommodation, and real estate agency.',
      'Предложение повторяет различия между общежитием, жильём и агентством недвижимости.',
    ),
    tags: ['housing', 'review'],
    difficulty: 5,
  }),

  s5u1_240_reply_builder: replyBuilder({
    npcText:
      '유학 준비는 수강 신청만 잘하면 되는 줄 알았는데 숙소도 아직 못 정했어요.',
    answer: '한국에 오기 전에 살 곳도 미리 알아보는 게 좋아요',
    translation: L(
      '한국에 오기 전에 살 곳도 미리 알아보는 게 좋아요.',
      'Koreyaga kelishdan oldin yashash joyini ham oldindan topib qo‘yganingiz yaxshi.',
      'It is a good idea to arrange where you will live before coming to Korea.',
      'До приезда в Корею лучше заранее продумать, где вы будете жить.',
    ),
    distractors: [
      '숙소는 필요 없어요',
      '수업만 보면 돼요',
      '쓰레기를 버리세요',
    ],
    tags: ['housing', 'study-abroad', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 3 · 교통카드로 편하게 다녀요
  // 241 ~ 260
  // ─────────────────────────────────────────────────────────────

  s5u1_241_reading_quiz: readingQuiz({
    instruction: L(
      '민수에게 가장 실용적인 교통 방법을 고르세요.',
      'Minsu uchun eng amaliy transport usulini tanlang.',
      'Choose the most practical transportation method for Minsu.',
      'Выберите наиболее практичный способ передвижения для Минсу.',
    ),
    passage:
      '민수는 기숙사에서 학교까지 매일 버스를 타고, 주말에는 버스에서 지하철로 갈아타서 시내에 갑니다. 대중교통을 자주 이용하고 환승도 자주 하기 때문에 매번 다른 방법으로 요금을 내는 것보다 편리한 방법을 찾고 있습니다.',
    options: [
      '교통카드를 이용한다',
      '매일 걸어서만 다닌다',
      '쓰레기봉투를 이용한다',
      '외국인등록증으로 요금을 낸다',
    ],
    answer: '교통카드를 이용한다',
    answerTranslation: L(
      '대중교통을 자주 이용하고 환승한다면 교통카드가 편리해요.',
      'Jamoat transportidan ko‘p foydalanib, transport almashtirsangiz, transport kartasi qulay.',
      'A transportation card is convenient when you frequently use and transfer between public transportation.',
      'Транспортная карта удобна, если часто пользоваться общественным транспортом и делать пересадки.',
    ),
    tags: ['transportation-card', 'transfer'],
    difficulty: 5,
  }),

  s5u1_242_word_matching: wordMatching({
    pairs: [
      { korean: '교통카드', native: 'transport kartasi' },
      { korean: '환승', native: 'пересадка' },
      { korean: '할인', native: 'chegirma' },
      { korean: '기숙사', native: 'yotoqxona' },
      { korean: '숙소', native: 'turar joy' },
    ],
    tags: ['transportation', 'study-abroad'],
  }),

  s5u1_243_sentence_builder: sentenceBuilder({
    answer: '버스와 지하철을 자주 타면 교통카드를 사용하는 게 편해요',
    translation: L(
      '버스와 지하철을 자주 타면 교통카드를 사용하는 게 편해요.',
      'Avtobus va metrodan ko‘p foydalansangiz transport kartasidan foydalanish qulay.',
      'If you often take buses and the subway, using a transportation card is convenient.',
      'Если часто ездить на автобусе и метро, удобно пользоваться транспортной картой.',
    ),
    distractors: ['쓰레기봉투를', '외국인등록증만', '버리는 게'],
    tags: ['transportation-card', 'daily-life'],
    difficulty: 5,
  }),

  s5u1_244_error_hunt: errorHunt({
    npcText: '버스에서 지하철로 할인해서 학교에 가요.',
    wrongWord: '할인해서',
    options: ['환승해서', '할인해서', '입국해서', '등록해서'],
    answer: '환승해서',
    translation: L(
      '버스에서 지하철로 환승해서 학교에 가요.',
      'Avtobusdan metroga o‘tib universitetga boraman.',
      'I transfer from the bus to the subway to get to school.',
      'Я пересаживаюсь с автобуса на метро по дороге в университет.',
    ),
    hint: L(
      '교통수단을 다른 교통수단으로 갈아타는 행동을 뜻하는 단어를 찾으세요.',
      'Bir transportdan boshqasiga o‘tishni bildiradigan so‘zni toping.',
      'Choose the word meaning to change from one mode of transportation to another.',
      'Найдите слово со значением «пересесть с одного транспорта на другой».',
    ),
    tags: ['transfer', 'meaning'],
    difficulty: 5,
  }),

  s5u1_245_fill_in_blank: multiBlank({
    sentenceTemplate:
      '버스와 지하철 요금을 편리하게 낼 때 사용하는 것은 ___이고, 한 교통수단에서 다른 교통수단으로 갈아타는 것은 ___이며, 원래 요금보다 적게 내는 것은 ___이에요.',
    blankAnswers: ['교통카드', '환승', '할인'],
    distractors: ['숙소', '입국', '기숙사'],
    translation: L(
      '교통카드, 환승, 할인의 의미를 구별하는 문장이에요.',
      'Gap transport kartasi, transport almashtirish va chegirmani farqlaydi.',
      'The sentence distinguishes a transportation card, transfer, and discount.',
      'Предложение различает транспортную карту, пересадку и скидку.',
    ),
    tags: ['transportation', 'meaning-contrast'],
    difficulty: 5,
  }),

  s5u1_246_audio_match: audioMatch({
    pairs: [
      { korean: '환승', native: 'transport almashtirish' },
      { korean: '할인', native: 'chegirma' },
      { korean: '숙소', native: 'turar joy' },
      { korean: '유학생', native: 'xorijiy talaba' },
      { korean: '입국', native: 'kirish' },
    ],
    tags: ['transportation', 'listening'],
  }),

  s5u1_247_translate_builder: translateBuilder({
    instruction: L(
      '버스에서 지하철로 자주 환승하기 때문에 교통카드를 사용한다고 말하세요.',
      'Avtobusdan metroga tez-tez o‘tganingiz uchun transport kartasidan foydalanishingizni ayting.',
      'Say that you use a transportation card because you frequently transfer from buses to the subway.',
      'Скажите, что пользуетесь транспортной картой, потому что часто пересаживаетесь с автобуса на метро.',
    ),
    answer: '버스에서 지하철로 자주 환승해서 교통카드를 사용해요',
    translation: L(
      '버스에서 지하철로 자주 환승해서 교통카드를 사용해요.',
      'Avtobusdan metroga ko‘p o‘tganim uchun transport kartasidan foydalanaman.',
      'I use a transportation card because I often transfer from the bus to the subway.',
      'Я пользуюсь транспортной картой, потому что часто пересаживаюсь с автобуса на метро.',
    ),
    distractors: ['쓰레기봉투를', '입국해서', '버려요'],
    tags: ['transportation-card', 'transfer'],
    difficulty: 5,
  }),

  s5u1_248_speaking: speaking({
    npcText:
      '새로 한국에 온 친구에게 학교에 다닐 때 교통카드가 왜 편한지 설명하고 있어요.',
    answer: '버스와 지하철을 탈 때 편하고 환승할 때도 사용할 수 있어요.',
    translation: L(
      '버스와 지하철을 탈 때 편하고 환승할 때도 사용할 수 있어요.',
      'Avtobus va metroda qulay, transport almashtirganda ham ishlatish mumkin.',
      'It is convenient on buses and the subway and can also be used when transferring.',
      'Ею удобно пользоваться в автобусе и метро, в том числе при пересадках.',
    ),
    tags: ['transportation-card', 'speaking'],
    difficulty: 5,
  }),

  s5u1_249_cloze_passage: clozePassage({
    passage:
      '저는 학교에 갈 때 버스와 지하철을 모두 이용합니다. 버스에서 지하철로 자주 ___하기 때문에 ___를 사용하고 있습니다. 이렇게 이용하면 교통수단을 갈아탈 때 ___을 받을 수 있는 경우도 있어서 편리합니다.',
    blankAnswers: ['환승', '교통카드', '할인'],
    distractors: ['입국', '숙소', '쓰레기봉투'],
    translation: L(
      '교통카드, 환승, 할인을 연결해 설명하는 글이에요.',
      'Matnda transport kartasi, transfer va chegirma bog‘langan.',
      'The passage connects transportation cards, transfers, and discounts.',
      'Текст связывает транспортную карту, пересадки и скидки.',
    ),
    tags: ['transportation-card', 'transfer', 'discount'],
    difficulty: 5,
  }),

  s5u1_250_word_arrange: wordArrange({
    answer:
      '대중교통을 자주 이용하면 교통카드와 환승 방법을 알아두는 게 좋아요',
    translation: L(
      '대중교통을 자주 이용하면 교통카드와 환승 방법을 알아두는 게 좋아요.',
      'Jamoat transportidan ko‘p foydalansangiz, transport kartasi va transfer usulini bilib olish yaxshi.',
      'If you often use public transportation, it is useful to understand transportation cards and transfers.',
      'Если часто пользоваться общественным транспортом, полезно знать, как работает транспортная карта и пересадки.',
    ),
    distractors: ['숙소만', '쓰레기를', '모를수록 좋아요'],
    tags: ['transportation', 'practical-life'],
    difficulty: 5,
  }),

  s5u1_251_reply_builder: replyBuilder({
    npcText:
      '매일 버스도 타고 지하철도 타는데 갈아탈 때마다 어떻게 해야 할지 헷갈려요.',
    answer: '교통카드와 환승 방법을 먼저 알아두면 훨씬 편할 거예요',
    translation: L(
      '교통카드와 환승 방법을 먼저 알아두면 훨씬 편할 거예요.',
      'Transport kartasi va transfer usulini bilib olsangiz ancha qulay bo‘ladi.',
      'It will be much easier if you learn how the transportation card and transfers work.',
      'Будет намного удобнее, если заранее разобраться с транспортной картой и пересадками.',
    ),
    distractors: ['걸어만 다니세요', '외국인등록증을', '버리세요'],
    tags: ['transportation', 'reply'],
    difficulty: 5,
  }),

  s5u1_252_verb_transform: verbTransform({
    baseWord: '입국하다',
    targetForm: '현재 · 해요체',
    answer: '입국해요',
    options: ['입', '국', '해', '요', '했', '할'],
    translation: L(
      '입국해요',
      'mamlakatga kiradi',
      'enters the country',
      'въезжает в страну',
    ),
    tags: ['immigration', 'verb-transform'],
    difficulty: 4,
  }),

  s5u1_253_reading_quiz: readingQuiz({
    instruction: L(
      '`환승`과 `할인`의 관계를 가장 정확하게 이해한 학생을 고르세요.',
      '`환승` va `할인` munosabatini to‘g‘ri tushungan talabani tanlang.',
      'Choose the student who best understands the relationship between `환승` and `할인`.',
      'Выберите студента, который правильно понимает связь между `환승` и `할인`.',
    ),
    passage:
      '유진: 환승은 교통수단을 갈아타는 행동이고 할인은 가격이나 요금이 줄어드는 거야.\n마이클: 환승하고 할인은 완전히 같은 뜻이야.\n안나: 할인은 버스에서 지하철로 갈아타는 행동이야.',
    options: ['유진', '마이클', '안나', '세 사람 모두'],
    answer: '유진',
    answerTranslation: L(
      '환승은 갈아타기이고 할인은 가격이 줄어드는 것이에요.',
      '환승 transport almashtirish, 할인 esa narxning kamayishi.',
      '환승 means transferring, while 할인 means a reduction in price.',
      '환승 означает пересадку, а 할인 — снижение цены.',
    ),
    tags: ['transfer', 'discount', 'meaning'],
    difficulty: 5,
  }),

  s5u1_254_listen_type: listenType({
    audioText: '교통카드를 사용해서 버스에서 지하철로 환승했어요.',
    translation: L(
      '교통카드를 사용해서 버스에서 지하철로 환승했어요.',
      'Transport kartasidan foydalanib avtobusdan metroga o‘tdim.',
      'I used a transportation card and transferred from the bus to the subway.',
      'Я использовал транспортную карту и пересел с автобуса на метро.',
    ),
    tags: ['transportation', 'dictation'],
  }),

  s5u1_255_sentence_builder: sentenceBuilder({
    answer: '환승은 교통수단을 바꾸는 것이고 할인은 요금이 줄어드는 거예요',
    translation: L(
      '환승은 교통수단을 바꾸는 것이고 할인은 요금이 줄어드는 거예요.',
      '환승 — transportni almashtirish, 할인 — yo‘l haqining kamayishi.',
      'A transfer means changing transportation, while a discount means paying a reduced fare.',
      'Пересадка означает смену транспорта, а скидка — уменьшение стоимости проезда.',
    ),
    distractors: ['같은 뜻이고', '숙소를', '버리는 거예요'],
    tags: ['transfer', 'discount'],
    difficulty: 5,
  }),

  s5u1_256_listen_fill: listenFill({
    audioText: '교통카드로 환승하면 할인을 받을 수 있어요.',
    sentenceTemplate: '___로 ___하면 ___을 받을 수 있어요.',
    blankAnswers: ['교통카드', '환승', '할인'],
    translation: L(
      '교통카드로 환승하면 할인을 받을 수 있어요.',
      'Transport kartasi bilan transfer qilsangiz chegirma olishingiz mumkin.',
      'You may receive a discount when transferring with a transportation card.',
      'При пересадке с транспортной картой можно получить скидку.',
    ),
    tags: ['transportation-card', 'transfer', 'discount'],
  }),

  s5u1_257_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '학교까지 한 번에 가는 버스가 있어요?',
      },
      {
        speaker: 'user',
        text: '아니요. 버스를 타고 가다가 지하철로 갈아타야 해요.',
      },
      {
        speaker: 'npc',
        text: '그럼 환승해야 하는군요.',
      },
      {
        speaker: 'user',
        text: '네. 그래서 교통카드를 사용하고 있어요.',
      },
      {
        speaker: 'npc',
        text: '매일 이용한다면 그게 훨씬 편하겠네요.',
      },
    ],
    translation: L(
      '통학하면서 버스와 지하철을 환승하는 대화예요.',
      'Universitetga qatnashda avtobus va metro o‘rtasida transfer qilish haqidagi dialog.',
      'The dialogue is about transferring between a bus and subway during a commute.',
      'Диалог о пересадке с автобуса на метро по дороге в университет.',
    ),
    tags: ['transportation', 'dialog'],
    difficulty: 5,
  }),

  s5u1_258_translate_type: translateType({
    instruction: L(
      '학교에 갈 때 버스와 지하철을 모두 이용하며 자주 환승하기 때문에 교통카드를 사용하고 있고 환승 할인도 받을 수 있어서 편리하다고 한국어로 입력하세요.',
      'Universitetga borishda avtobus va metrodan foydalanishingizni, tez-tez transfer qilganingiz uchun transport kartasi ishlatishingizni va transfer chegirmasi qulayligini koreyscha yozing.',
      'Write in Korean that you use both buses and the subway to get to school, use a transportation card because you transfer often, and find the transfer discount convenient.',
      'Напишите по-корейски, что по дороге в университет пользуетесь автобусом и метро, часто делаете пересадки, поэтому используете транспортную карту и получаете скидку.',
    ),
    answer:
      '학교에 갈 때 버스와 지하철을 모두 이용해요. 자주 환승해서 교통카드를 사용하고 있고 환승 할인도 받을 수 있어서 편리해요.',
    translation: L(
      '학교에 갈 때 버스와 지하철을 모두 이용해요. 자주 환승해서 교통카드를 사용하고 있고 환승 할인도 받을 수 있어서 편리해요.',
      'Universitetga borishda avtobus va metrodan foydalanaman. Tez-tez transfer qilganim uchun transport kartasi ishlataman va transfer chegirmasi ham qulay.',
      'I use both buses and the subway to get to school. I transfer often, so I use a transportation card, and the transfer discount is convenient.',
      'По дороге в университет я пользуюсь автобусом и метро. Я часто делаю пересадки, поэтому использую транспортную карту, а скидка при пересадке очень удобна.',
    ),
    targetExpressions: ['환승', '교통카드', '할인'],
    tags: ['transportation', 'productive'],
    difficulty: 5,
  }),

  s5u1_259_fill_in_blank: multiBlank({
    sentenceTemplate:
      '대중교통 요금을 낼 때 ___를 사용할 수 있고, 다른 교통수단으로 갈아타면 ___이라고 하며, 조건에 따라 요금 ___을 받을 수도 있어요.',
    blankAnswers: ['교통카드', '환승', '할인'],
    distractors: ['기숙사', '부동산', '등록'],
    translation: L(
      '교통카드, 환승, 할인을 종합해서 복습하는 문장이에요.',
      'Gap transport kartasi, transfer va chegirmani umumiy takrorlaydi.',
      'The sentence reviews transportation cards, transfers, and discounts.',
      'Предложение повторяет транспортную карту, пересадку и скидку.',
    ),
    tags: ['transportation', 'review'],
    difficulty: 5,
  }),

  s5u1_260_reply_builder: replyBuilder({
    npcText:
      '한국에서는 버스에서 지하철로 갈아타는 일이 자주 있는데 `환승`이 무슨 뜻이에요?',
    answer: '한 교통수단에서 다른 교통수단으로 갈아타는 것을 환승이라고 해요',
    translation: L(
      '한 교통수단에서 다른 교통수단으로 갈아타는 것을 환승이라고 해요.',
      'Bir transportdan boshqasiga o‘tish `환승` deyiladi.',
      'Changing from one mode of transportation to another is called 환승.',
      'Переход с одного вида транспорта на другой называется 환승.',
    ),
    distractors: ['요금을 버리는 것', '숙소를 구하는 것', '입국하는 것'],
    tags: ['transfer', 'meaning', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 4 · 쓰레기를 나누어 버려요
  // 261 ~ 280
  // ─────────────────────────────────────────────────────────────

  s5u1_261_reading_quiz: readingQuiz({
    instruction: L(
      '학생이 쓰레기를 가장 적절하게 처리한 것을 고르세요.',
      'Talaba chiqindini eng to‘g‘ri tashlagan javobni tanlang.',
      'Choose the student who disposed of the waste most appropriately.',
      'Выберите студента, который правильно выбросил мусор.',
    ),
    passage:
      '기숙사에서 쓰레기를 버리려고 합니다. 빈 캔과 병, 먹고 남은 음식, 재활용하기 어려운 일반 쓰레기가 함께 있습니다. 관리 안내에는 쓰레기를 종류에 따라 나누어 버리라고 적혀 있습니다.',
    options: [
      '캔과 병, 음식물, 일반 쓰레기를 종류별로 나누어 버린다',
      '모든 쓰레기를 한 봉투에 함께 넣는다',
      '캔만 방 안에 계속 둔다',
      '일반 쓰레기를 재활용품과 모두 섞는다',
    ],
    answer: '캔과 병, 음식물, 일반 쓰레기를 종류별로 나누어 버린다',
    answerTranslation: L(
      '쓰레기는 종류에 맞게 나누어 버리는 것이 좋아요.',
      'Chiqindini turiga qarab ajratib tashlash kerak.',
      'Waste should be separated according to its type.',
      'Мусор нужно разделять по видам.',
    ),
    tags: ['trash', 'recycling'],
    difficulty: 5,
  }),

  s5u1_262_word_matching: wordMatching({
    pairs: [
      { korean: '캔', native: 'metall banka' },
      { korean: '리터', native: 'litr' },
      { korean: '할인', native: 'chegirma' },
      { korean: '환승', native: 'пересадка' },
      { korean: '숙소', native: 'turar joy' },
    ],
    tags: ['trash', 'measurement'],
  }),

  s5u1_263_sentence_builder: sentenceBuilder({
    answer: '캔과 병은 일반 쓰레기와 섞지 말고 따로 분리해서 버려요',
    translation: L(
      '캔과 병은 일반 쓰레기와 섞지 말고 따로 분리해서 버려요.',
      'Banka va butilkalarni oddiy chiqindiga aralashtirmasdan alohida tashlaymiz.',
      'Do not mix cans and bottles with general waste; separate them for disposal.',
      'Банки и бутылки не смешивают с обычным мусором, а выбрасывают отдельно.',
    ),
    distractors: ['모두 함께', '교통카드에', '입국해요'],
    tags: ['recycling', 'trash'],
    difficulty: 5,
  }),

  s5u1_264_error_hunt: errorHunt({
    npcText: '빈 캔은 일반 쓰레기로 분리해서 버렸어요.',
    wrongWord: '일반',
    options: ['재활용', '일반', '음식물', '외국인'],
    answer: '재활용',
    translation: L(
      '빈 캔은 재활용 쓰레기로 분리해서 버렸어요.',
      'Bo‘sh bankani qayta ishlanadigan chiqindiga ajratib tashladim.',
      'I separated the empty can as recyclable waste.',
      'Я выбросил пустую банку как перерабатываемый мусор.',
    ),
    hint: L(
      '캔은 다시 자원으로 사용할 수 있는 대표적인 물건이에요.',
      'Metall banka qayta ishlanishi mumkin bo‘lgan odatiy buyum.',
      'A can is a common recyclable item.',
      'Жестяная банка — типичный перерабатываемый предмет.',
    ),
    tags: ['recycling', 'can'],
    difficulty: 5,
  }),

  s5u1_265_fill_in_blank: multiBlank({
    sentenceTemplate:
      '캔이나 병처럼 다시 사용할 수 있는 것은 ___ 쓰레기이고, 먹고 남은 것은 ___ 쓰레기이며, 그 밖의 보통 쓰레기는 ___ 쓰레기라고 해요.',
    blankAnswers: ['재활용', '음식물', '일반'],
    distractors: ['외국인', '환승', '숙소'],
    translation: L(
      '재활용 쓰레기, 음식물 쓰레기, 일반 쓰레기를 구별하는 문장이에요.',
      'Gap qayta ishlanadigan, oziq-ovqat va oddiy chiqindini farqlaydi.',
      'The sentence distinguishes recyclable, food, and general waste.',
      'Предложение различает перерабатываемый, пищевой и обычный мусор.',
    ),
    tags: ['trash', 'classification'],
    difficulty: 5,
  }),

  s5u1_266_audio_match: audioMatch({
    pairs: [
      { korean: '캔', native: 'metall banka' },
      { korean: '리터', native: 'litr' },
      { korean: '유학생', native: 'xorijiy talaba' },
      { korean: '환승', native: 'пересадка' },
      { korean: '할인', native: 'chegirma' },
    ],
    tags: ['trash', 'listening'],
  }),

  s5u1_267_translate_builder: translateBuilder({
    instruction: L(
      '빈 캔은 재활용 쓰레기로, 먹고 남은 음식은 음식물 쓰레기로 따로 버려야 한다고 말하세요.',
      'Bo‘sh bankani qayta ishlanadigan chiqindiga, qolgan ovqatni esa oziq-ovqat chiqindisiga alohida tashlash kerakligini ayting.',
      'Say that empty cans should be disposed of as recyclable waste and leftover food as food waste.',
      'Скажите, что пустые банки нужно выбрасывать как перерабатываемый мусор, а остатки еды — как пищевые отходы.',
    ),
    answer:
      '빈 캔은 재활용 쓰레기로 남은 음식은 음식물 쓰레기로 따로 버려야 해요',
    translation: L(
      '빈 캔은 재활용 쓰레기로, 남은 음식은 음식물 쓰레기로 따로 버려야 해요.',
      'Bo‘sh bankani qayta ishlanadigan chiqindiga, qolgan ovqatni esa oziq-ovqat chiqindisiga alohida tashlash kerak.',
      'Empty cans should be disposed of as recyclable waste and leftover food as food waste.',
      'Пустые банки нужно выбрасывать как перерабатываемый мусор, а остатки еды — как пищевые отходы.',
    ),
    distractors: ['모두 일반으로', '교통카드와', '섞어야 해요'],
    tags: ['trash', 'recycling', 'food-waste'],
    difficulty: 5,
  }),

  s5u1_268_speaking: speaking({
    npcText:
      '처음 기숙사에 들어온 친구가 쓰레기를 어떻게 버리는지 몰라서 물어봤어요.',
    answer:
      '쓰레기는 종류를 확인하고 재활용, 음식물, 일반 쓰레기로 나누어 버려야 해요.',
    translation: L(
      '쓰레기는 종류를 확인하고 재활용, 음식물, 일반 쓰레기로 나누어 버려야 해요.',
      'Chiqindini turiga qarab qayta ishlanadigan, oziq-ovqat va oddiy chiqindiga ajratish kerak.',
      'You should check the type of waste and separate it into recyclable, food, and general waste.',
      'Нужно определить тип мусора и разделить его на перерабатываемый, пищевой и обычный.',
    ),
    tags: ['trash', 'speaking'],
    difficulty: 5,
  }),

  s5u1_269_cloze_passage: clozePassage({
    passage:
      '기숙사에서는 쓰레기를 종류에 따라 나누어 버립니다. 빈 ___은 다시 사용할 수 있기 때문에 ___ 쓰레기로 분리합니다. 먹고 남은 것은 ___ 쓰레기로 버리고, 나머지 ___ 쓰레기는 필요한 봉투에 넣어서 처리합니다.',
    blankAnswers: ['캔', '재활용', '음식물', '일반'],
    distractors: ['환승', '숙소', '입국'],
    translation: L(
      '기숙사에서 쓰레기를 종류별로 분리하는 내용이에요.',
      'Matnda yotoqxonada chiqindini turlar bo‘yicha ajratish haqida.',
      'The passage explains sorting waste by type in a dormitory.',
      'Текст объясняет сортировку мусора по видам в общежитии.',
    ),
    tags: ['trash', 'recycling'],
    difficulty: 5,
  }),

  s5u1_270_word_arrange: wordArrange({
    answer:
      '쓰레기를 버리기 전에 재활용할 수 있는지 먼저 확인하는 습관이 필요해요',
    translation: L(
      '쓰레기를 버리기 전에 재활용할 수 있는지 먼저 확인하는 습관이 필요해요.',
      'Chiqindini tashlashdan oldin qayta ishlash mumkinligini tekshirish odati kerak.',
      'It is useful to develop the habit of checking whether something can be recycled before throwing it away.',
      'Полезно выработать привычку проверять возможность переработки перед тем, как выбрасывать мусор.',
    ),
    distractors: ['모든 것을 섞는', '환승하는', '필요 없어요'],
    tags: ['recycling', 'judgment'],
    difficulty: 5,
  }),

  s5u1_271_reply_builder: replyBuilder({
    npcText: '빈 음료 캔이 있는데 그냥 일반 쓰레기랑 같이 버려도 돼요?',
    answer: '캔은 재활용 쓰레기로 따로 분리해서 버리는 게 좋아요',
    translation: L(
      '캔은 재활용 쓰레기로 따로 분리해서 버리는 게 좋아요.',
      'Bankani qayta ishlanadigan chiqindi sifatida alohida tashlaganingiz yaxshi.',
      'It is better to separate the can as recyclable waste.',
      'Банку лучше выбросить отдельно как перерабатываемый мусор.',
    ),
    distractors: [
      '그냥 섞어 버리세요',
      '음식물에 넣으세요',
      '교통카드로 버리세요',
    ],
    tags: ['recycling', 'reply'],
    difficulty: 5,
  }),

  s5u1_272_verb_transform: verbTransform({
    baseWord: '버리다',
    targetForm: '과거 · 해요체',
    answer: '버렸어요',
    options: ['버', '렸', '어', '요', '리', '려'],
    translation: L('버렸어요', 'tashladim', 'threw away', 'выбросил'),
    tags: ['trash', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_273_reading_quiz: readingQuiz({
    instruction: L(
      '다음 학생이 잘못 분류한 쓰레기를 고르세요.',
      'Talaba noto‘g‘ri ajratgan chiqindini tanlang.',
      'Choose the waste item the student sorted incorrectly.',
      'Выберите мусор, который студент отсортировал неправильно.',
    ),
    passage:
      '마리아는 빈 캔을 재활용 쓰레기에 넣었습니다. 먹고 남은 밥은 음식물 쓰레기로 버렸습니다. 그런데 재활용하기 어려운 일반 쓰레기도 재활용 쓰레기와 같은 곳에 넣었습니다.',
    options: ['일반 쓰레기', '빈 캔', '남은 밥', '모두 올바르게 분류했다'],
    answer: '일반 쓰레기',
    answerTranslation: L(
      '일반 쓰레기를 재활용 쓰레기와 섞은 것이 잘못이에요.',
      'Oddiy chiqindini qayta ishlanadigan chiqindiga aralashtirish noto‘g‘ri.',
      'The mistake was mixing general waste with recyclable waste.',
      'Ошибка заключалась в том, что обычный мусор смешали с перерабатываемым.',
    ),
    tags: ['trash', 'classification'],
    difficulty: 5,
  }),

  s5u1_274_listen_type: listenType({
    audioText: '일반 쓰레기는 쓰레기봉투에 넣어서 버렸어요.',
    translation: L(
      '일반 쓰레기는 쓰레기봉투에 넣어서 버렸어요.',
      'Oddiy chiqindini chiqindi paketiga solib tashladim.',
      'I put the general waste in a trash bag and threw it away.',
      'Я положил обычный мусор в мусорный пакет и выбросил его.',
    ),
    tags: ['general-waste', 'trash-bag'],
  }),

  s5u1_275_sentence_builder: sentenceBuilder({
    answer: '쓰레기봉투를 살 때는 필요한 크기와 용량을 확인하면 돼요',
    translation: L(
      '쓰레기봉투를 살 때는 필요한 크기와 용량을 확인하면 돼요.',
      'Chiqindi paketini sotib olayotganda kerakli o‘lcham va hajmni tekshirish kerak.',
      'When buying a trash bag, check the size and capacity you need.',
      'При покупке мусорного пакета нужно проверить необходимый размер и объём.',
    ),
    distractors: ['환승 횟수만', '전공을', '확인하지 마요'],
    tags: ['trash-bag', 'liter'],
    difficulty: 5,
  }),

  s5u1_276_listen_fill: listenFill({
    audioText: '일반 쓰레기는 쓰레기봉투에 넣고 캔은 재활용으로 분리해요.',
    sentenceTemplate:
      '___ 쓰레기는 쓰레기봉투에 넣고 ___은 재활용으로 분리해요.',
    blankAnswers: ['일반', '캔'],
    translation: L(
      '일반 쓰레기는 쓰레기봉투에 넣고 캔은 재활용으로 분리해요.',
      'Oddiy chiqindini paketga solib, bankani qayta ishlash uchun ajratamiz.',
      'General waste goes in a trash bag, while cans are separated for recycling.',
      'Обычный мусор кладут в мусорный пакет, а банки отделяют для переработки.',
    ),
    tags: ['trash', 'recycling'],
  }),

  s5u1_277_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '이 빈 캔은 어디에 버리면 돼요?',
      },
      {
        speaker: 'user',
        text: '재활용 쓰레기로 따로 버리면 돼요.',
      },
      {
        speaker: 'npc',
        text: '먹고 남은 음식은요?',
      },
      {
        speaker: 'user',
        text: '그건 음식물 쓰레기로 분리해야 해요.',
      },
      {
        speaker: 'npc',
        text: '일반 쓰레기하고 다 따로 버리는군요.',
      },
    ],
    translation: L(
      '캔, 음식물, 일반 쓰레기를 구별하는 대화예요.',
      'Dialog banka, oziq-ovqat va oddiy chiqindini farqlaydi.',
      'The dialogue distinguishes cans, food waste, and general waste.',
      'Диалог различает банки, пищевые отходы и обычный мусор.',
    ),
    tags: ['trash', 'classification'],
    difficulty: 5,
  }),

  s5u1_278_translate_type: translateType({
    instruction: L(
      '기숙사에서 쓰레기를 버릴 때 빈 캔은 재활용 쓰레기로, 먹고 남은 음식은 음식물 쓰레기로 나누고 일반 쓰레기는 쓰레기봉투에 넣어 버린다고 한국어로 입력하세요.',
      'Yotoqxonada chiqindi tashlaganda bo‘sh bankani qayta ishlanadigan, qolgan ovqatni oziq-ovqat chiqindisiga ajratib, oddiy chiqindini paketga solishingizni koreyscha yozing.',
      'Write in Korean that in the dormitory you separate empty cans as recyclable waste, leftovers as food waste, and put general waste in a trash bag.',
      'Напишите по-корейски, что в общежитии пустые банки выбрасываете как перерабатываемый мусор, остатки еды — как пищевые отходы, а обычный мусор кладёте в мусорный пакет.',
    ),
    answer:
      '기숙사에서 쓰레기를 버릴 때 빈 캔은 재활용 쓰레기로 분리하고 남은 음식은 음식물 쓰레기로 버려요. 일반 쓰레기는 쓰레기봉투에 넣어서 버려요.',
    translation: L(
      '기숙사에서 쓰레기를 버릴 때 빈 캔은 재활용 쓰레기로 분리하고 남은 음식은 음식물 쓰레기로 버려요. 일반 쓰레기는 쓰레기봉투에 넣어서 버려요.',
      'Yotoqxonada bankani qayta ishlanadigan chiqindiga, qolgan ovqatni oziq-ovqat chiqindisiga ajrataman. Oddiy chiqindini paketga solib tashlayman.',
      'At the dormitory, I separate empty cans as recyclable waste and leftovers as food waste. I put general waste in a trash bag.',
      'В общежитии я отделяю пустые банки как перерабатываемый мусор, остатки еды — как пищевые отходы, а обычный мусор кладу в мусорный пакет.',
    ),
    targetExpressions: [
      '캔',
      '재활용 쓰레기',
      '음식물 쓰레기',
      '일반 쓰레기',
      '쓰레기봉투',
    ],
    tags: ['trash', 'productive'],
    difficulty: 5,
  }),

  s5u1_279_fill_in_blank: multiBlank({
    sentenceTemplate:
      '빈 ___은 재활용 쓰레기로, 먹고 남은 음식은 ___ 쓰레기로, 나머지 보통 쓰레기는 ___ 쓰레기로 구별해서 ___야 해요.',
    blankAnswers: ['캔', '음식물', '일반', '버려'],
    distractors: ['환승', '숙소', '입국'],
    translation: L(
      '쓰레기를 종류에 맞게 구별해서 버려야 한다는 문장이에요.',
      'Chiqindini turiga qarab ajratib tashlash kerakligi haqida.',
      'The sentence reviews separating and disposing of different kinds of waste.',
      'Предложение повторяет правила сортировки и выбрасывания разных видов мусора.',
    ),
    tags: ['trash', 'review'],
    difficulty: 5,
  }),

  s5u1_280_reply_builder: replyBuilder({
    npcText: '한국에 온 지 얼마 안 돼서 쓰레기 분류가 너무 헷갈려요.',
    answer: '재활용 음식물 일반 쓰레기를 먼저 구별해서 기억하면 좋아요',
    translation: L(
      '재활용, 음식물, 일반 쓰레기를 먼저 구별해서 기억하면 좋아요.',
      'Avval qayta ishlanadigan, oziq-ovqat va oddiy chiqindini farqlab yodda tuting.',
      'Start by remembering the difference between recyclable, food, and general waste.',
      'Сначала запомните различия между перерабатываемым, пищевым и обычным мусором.',
    ),
    distractors: [
      '전부 같이 버려요',
      '교통카드로 나눠요',
      '구별할 필요 없어요',
    ],
    tags: ['trash', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 5 · 유학 생활 정보를 종합해요
  // 281 ~ 300
  // ─────────────────────────────────────────────────────────────

  s5u1_281_reading_quiz: readingQuiz({
    instruction: L(
      '다음 유학생에게 지금 가장 시급한 일을 고르세요.',
      'Quyidagi xorijiy talabaga hozir eng zarur ishni tanlang.',
      'Choose the most urgent task for the international student.',
      'Выберите наиболее срочную задачу для иностранного студента.',
    ),
    passageTitle: '사라의 첫 주',
    passage:
      '사라는 어제 한국에 입국했습니다. 수업은 다음 주에 시작하고 기숙사 방은 이미 정해졌습니다. 교통카드도 준비했습니다. 하지만 한국에서 체류하면서 필요한 외국인 등록 관련 정보는 아직 한 번도 확인하지 않았습니다.',
    options: [
      '외국인 등록 정보를 확인한다',
      '다른 숙소를 다시 찾는다',
      '교통카드를 하나 더 산다',
      '재활용 캔을 모은다',
    ],
    answer: '외국인 등록 정보를 확인한다',
    answerTranslation: L(
      '현재 가장 부족한 것은 외국인 등록 정보예요.',
      'Hozir eng yetishmayotgan narsa xorijlik ro‘yxati haqidagi ma’lumot.',
      'The missing priority is information about foreigner registration.',
      'Главный недостающий пункт — информация о регистрации иностранца.',
    ),
    tags: ['study-abroad', 'judgment'],
    difficulty: 5,
  }),

  s5u1_282_word_matching: wordMatching({
    pairs: [
      { korean: '유학생', native: 'xorijiy talaba' },
      { korean: '숙소', native: 'turar joy' },
      { korean: '환승', native: 'пересадка' },
      { korean: '할인', native: 'chegirma' },
      { korean: '캔', native: 'banka' },
    ],
    tags: ['study-abroad', 'unit-review'],
  }),

  s5u1_283_sentence_builder: sentenceBuilder({
    answer:
      '유학 생활에서는 공부뿐 아니라 행정 주거 교통 생활 규칙도 알아야 해요',
    translation: L(
      '유학 생활에서는 공부뿐 아니라 행정, 주거, 교통, 생활 규칙도 알아야 해요.',
      'Chet elda o‘qishda nafaqat dars, balki ma’muriy, uy-joy, transport va kundalik qoidalarni ham bilish kerak.',
      'Study-abroad life requires knowledge not only about studying but also administration, housing, transportation, and daily rules.',
      'Во время учёбы за границей нужно знать не только об учёбе, но и об административных процедурах, жилье, транспорте и бытовых правилах.',
    ),
    distractors: ['수업만 알면', '다 필요 없고', '축제만 보면'],
    tags: ['study-abroad', 'integrated'],
    difficulty: 5,
  }),

  s5u1_284_error_hunt: errorHunt({
    npcText:
      '학교 밖에서 방을 구하려면 교통카드에 가서 숙소를 알아볼 수 있어요.',
    wrongWord: '교통카드에',
    options: ['부동산에', '교통카드에', '기숙사에', '쓰레기봉투에'],
    answer: '부동산에',
    translation: L(
      '학교 밖에서 방을 구하려면 부동산에 가서 숙소를 알아볼 수 있어요.',
      'Universitet tashqarisidan xona qidirsangiz rieltorlik idorasiga borishingiz mumkin.',
      'To find an off-campus room, you can visit a real estate agency.',
      'Чтобы найти комнату вне кампуса, можно обратиться в агентство недвижимости.',
    ),
    hint: L(
      '집이나 방을 중개해 주는 장소가 무엇인지 생각하세요.',
      'Uy yoki xonani topishga yordam beradigan joyni o‘ylang.',
      'Think of the place that helps arrange rental housing.',
      'Подумайте о месте, которое помогает найти съёмное жильё.',
    ),
    tags: ['housing', 'integrated'],
    difficulty: 5,
  }),

  s5u1_285_fill_in_blank: multiBlank({
    sentenceTemplate:
      '한국에 ___한 뒤에는 필요한 등록을 확인하고, ___를 정한 다음, 대중교통을 많이 이용하면 ___를 준비하고, 생활하면서 나오는 쓰레기는 종류별로 ___야 해요.',
    blankAnswers: ['입국', '숙소', '교통카드', '버려'],
    distractors: ['환영회', '상금', '강의'],
    translation: L(
      '입국부터 숙소, 교통, 쓰레기 처리까지 유학 생활 흐름을 복습해요.',
      'Gap kirish, turar joy, transport va chiqindigacha bo‘lgan jarayonni takrorlaydi.',
      'The sentence reviews the study-abroad flow from arrival to housing, transportation, and waste disposal.',
      'Предложение повторяет путь от въезда и жилья до транспорта и утилизации мусора.',
    ),
    tags: ['study-abroad', 'integrated'],
    difficulty: 5,
  }),

  s5u1_286_audio_match: audioMatch({
    pairs: [
      { korean: '기숙사', native: 'yotoqxona' },
      { korean: '부동산', native: 'rieltorlik' },
      { korean: '환승', native: 'пересадка' },
      { korean: '할인', native: 'chegirma' },
      { korean: '리터', native: 'litr' },
    ],
    tags: ['study-abroad', 'review'],
  }),

  s5u1_287_translate_builder: translateBuilder({
    instruction: L(
      '한국 생활을 시작하기 전에 숙소와 외국인 등록 정보를 확인하고 교통카드도 준비했다고 말하세요.',
      'Koreyadagi hayotni boshlashdan oldin turar joy va xorijlik ro‘yxati ma’lumotini tekshirib, transport kartasini ham tayyorlaganingizni ayting.',
      'Say that before starting life in Korea, you checked accommodation and foreigner registration information and also prepared a transportation card.',
      'Скажите, что до начала жизни в Корее вы проверили информацию о жилье и регистрации иностранца и подготовили транспортную карту.',
    ),
    answer:
      '한국 생활을 시작하기 전에 숙소와 외국인 등록 정보를 확인하고 교통카드도 준비했어요',
    translation: L(
      '한국 생활을 시작하기 전에 숙소와 외국인 등록 정보를 확인하고 교통카드도 준비했어요.',
      'Koreyadagi hayotni boshlashdan oldin turar joy va xorijlik ro‘yxati ma’lumotlarini tekshirib, transport kartasini ham tayyorladim.',
      'Before starting life in Korea, I checked accommodation and foreigner registration information and prepared a transportation card.',
      'Перед началом жизни в Корее я проверил информацию о жилье и регистрации иностранца и подготовил транспортную карту.',
    ),
    distractors: ['쓰레기만', '축제를', '졸업했어요'],
    tags: ['study-abroad', 'integrated'],
    difficulty: 5,
  }),

  s5u1_288_listen_type: listenType({
    audioText:
      '유학 생활에 필요한 정보를 미리 알아두면 새로운 환경에 적응하기가 더 편해요.',
    translation: L(
      '유학 생활에 필요한 정보를 미리 알아두면 새로운 환경에 적응하기가 더 편해요.',
      'Chet eldagi o‘qish hayoti uchun kerakli ma’lumotni oldindan bilsangiz yangi muhitga moslashish osonroq.',
      'Learning practical study-abroad information in advance makes it easier to adapt to a new environment.',
      'Если заранее узнать необходимую для учёбы за границей информацию, адаптироваться к новой среде будет легче.',
    ),
    tags: ['study-abroad', 'dictation'],
  }),

  s5u1_289_cloze_passage: clozePassage({
    passage:
      '저는 한국에 처음 온 ___입니다. 한국에 ___한 뒤 필요한 등록 절차를 확인했고 학교 ___에도 입주했습니다. 매일 버스와 지하철을 이용해서 ___를 준비했고, 기숙사에서는 쓰레기를 재활용과 일반 쓰레기로 나누어 ___고 있습니다.',
    blankAnswers: ['유학생', '입국', '기숙사', '교통카드', '버리'],
    distractors: ['상금', '전공', '강의'],
    translation: L(
      '유학생의 입국, 기숙사, 교통, 쓰레기 처리 생활을 종합한 글이에요.',
      'Matnda xorijiy talabaning kirish, yotoqxona, transport va chiqindi hayoti umumlashtiriladi.',
      'The passage integrates an international student’s arrival, dormitory, transportation, and waste disposal.',
      'Текст объединяет въезд иностранного студента, общежитие, транспорт и сортировку мусора.',
    ),
    tags: ['study-abroad', 'integrated'],
    difficulty: 5,
  }),

  s5u1_290_word_arrange: wordArrange({
    answer:
      '처음에는 복잡해 보여도 생활 규칙을 하나씩 익히면 점점 익숙해질 수 있어요',
    translation: L(
      '처음에는 복잡해 보여도 생활 규칙을 하나씩 익히면 점점 익숙해질 수 있어요.',
      'Avval murakkab ko‘rinsa ham, kundalik qoidalarni bittadan o‘rgansangiz asta-sekin ko‘nikasiz.',
      'Even if things seem complicated at first, learning daily rules one by one makes them gradually familiar.',
      'Даже если сначала всё кажется сложным, постепенно можно привыкнуть, изучая бытовые правила одно за другим.',
    ),
    distractors: ['아무것도 배우지 않으면', '모두 버리면', '더 편해요'],
    tags: ['study-abroad', 'adaptation'],
    difficulty: 5,
  }),

  s5u1_291_reply_builder: replyBuilder({
    npcText:
      '다음 달부터 한국에서 공부하는데 행정이랑 숙소랑 교통까지 생각하니까 너무 복잡해요.',
    answer: '입국 등록 숙소 교통 순서로 필요한 정보를 하나씩 정리해 보세요',
    translation: L(
      '입국, 등록, 숙소, 교통 순서로 필요한 정보를 하나씩 정리해 보세요.',
      'Kirish, ro‘yxat, turar joy va transport tartibida ma’lumotni bittadan tartiblang.',
      'Organize the information one step at a time: arrival, registration, accommodation, then transportation.',
      'Разберите информацию по порядку: въезд, регистрация, жильё, затем транспорт.',
    ),
    distractors: [
      '전부 한꺼번에 외우세요',
      '숙소는 생각하지 마세요',
      '축제부터 준비하세요',
    ],
    tags: ['study-abroad', 'reply'],
    difficulty: 5,
  }),

  s5u1_292_verb_transform: verbTransform({
    baseWord: '버리다',
    targetForm: '의무 · 해요체',
    answer: '버려야해요',
    options: ['버', '려', '야', '해', '요', '렸', '릴'],
    translation: L(
      '버려야 해요',
      'tashlash kerak',
      'have to throw away',
      'нужно выбросить',
    ),
    tags: ['trash', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_293_reading_quiz: readingQuiz({
    instruction: L(
      '유학생이 잘못 이해한 내용을 고르세요.',
      'Xorijiy talaba noto‘g‘ri tushungan fikrni tanlang.',
      'Choose the statement the international student has misunderstood.',
      'Выберите утверждение, которое иностранный студент понял неправильно.',
    ),
    passage:
      '하산은 한국 생활 안내를 읽고 이렇게 정리했습니다.\n① 입국 뒤에는 필요한 등록 정보를 확인한다.\n② 기숙사에 못 들어가면 다른 숙소를 알아볼 수 있다.\n③ 환승은 다른 교통수단으로 갈아타는 것이다.\n④ 재활용 쓰레기와 일반 쓰레기는 구별할 필요 없이 모두 같은 곳에 버린다.',
    options: ['④', '①', '②', '③'],
    answer: '④',
    answerTranslation: L(
      '재활용 쓰레기와 일반 쓰레기는 구별해서 버려야 해요.',
      'Qayta ishlanadigan va oddiy chiqindini ajratish kerak.',
      'Recyclable and general waste need to be separated.',
      'Перерабатываемый и обычный мусор нужно разделять.',
    ),
    tags: ['study-abroad', 'trash', 'judgment'],
    difficulty: 5,
  }),

  s5u1_294_listen_fill: listenFill({
    audioText: '입국 후에는 등록 정보를 확인하고 숙소와 교통도 준비해야 해요.',
    sentenceTemplate:
      '___ 후에는 등록 정보를 확인하고 ___와 ___도 준비해야 해요.',
    blankAnswers: ['입국', '숙소', '교통'],
    translation: L(
      '입국 후에는 등록 정보를 확인하고 숙소와 교통도 준비해야 해요.',
      'Kirgandan keyin ro‘yxat ma’lumotini, turar joy va transportni ham tayyorlash kerak.',
      'After arrival, you need to check registration information and prepare accommodation and transportation.',
      'После въезда нужно проверить регистрацию и подготовить жильё и транспорт.',
    ),
    tags: ['study-abroad', 'integrated'],
  }),

  s5u1_295_sentence_builder: sentenceBuilder({
    answer:
      '유학생에게는 학교 공부와 일상생활 정보를 모두 이해하는 것이 중요해요',
    translation: L(
      '유학생에게는 학교 공부와 일상생활 정보를 모두 이해하는 것이 중요해요.',
      'Xorijiy talaba uchun o‘qish va kundalik hayot ma’lumotlarini ikkalasini ham tushunish muhim.',
      'For international students, understanding both academic and everyday-life information is important.',
      'Иностранному студенту важно понимать информацию и об учёбе, и о повседневной жизни.',
    ),
    distractors: ['공부만 알면', '생활 정보는', '필요 없어요'],
    tags: ['study-abroad', 'integrated'],
    difficulty: 5,
  }),

  s5u1_296_speaking: speaking({
    npcText:
      '다음 학기에 한국으로 오는 친구에게 가장 중요한 유학 생활 조언 세 가지를 해 주세요.',
    answer:
      '입국 후 등록 정보를 확인하고 숙소를 미리 준비하고 생활 규칙도 알아두는 게 좋아요.',
    translation: L(
      '입국 후 등록 정보를 확인하고 숙소를 미리 준비하고 생활 규칙도 알아두는 게 좋아요.',
      'Kirgandan keyin ro‘yxat ma’lumotini tekshirib, turar joyni oldindan tayyorlab va kundalik qoidalarni bilib olish yaxshi.',
      'Check registration information after arrival, arrange accommodation in advance, and learn the basic daily-life rules.',
      'После въезда проверьте регистрацию, заранее подготовьте жильё и изучите основные бытовые правила.',
    ),
    tags: ['study-abroad', 'advice'],
    difficulty: 5,
  }),

  s5u1_297_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국 유학 준비는 거의 끝났어요?',
      },
      {
        speaker: 'user',
        text: '수업하고 기숙사는 준비했는데 생활 정보가 아직 부족해요.',
      },
      {
        speaker: 'npc',
        text: '입국 후 등록 절차하고 교통카드 사용법도 확인해 봤어요?',
      },
      {
        speaker: 'user',
        text: '등록은 확인했지만 쓰레기 분리 방법은 아직 잘 몰라요.',
      },
      {
        speaker: 'npc',
        text: '그런 생활 규칙도 미리 알아두면 한국에 와서 훨씬 편할 거예요.',
      },
    ],
    translation: L(
      '한국 유학 준비에서 행정, 숙소, 교통, 생활 규칙을 확인하는 대화예요.',
      'Dialog Koreyada o‘qishga tayyorgarlikda ma’muriy, turar joy, transport va kundalik qoidalarni tekshiradi.',
      'The dialogue reviews administration, housing, transportation, and daily rules before studying in Korea.',
      'Диалог повторяет административные вопросы, жильё, транспорт и бытовые правила перед учёбой в Корее.',
    ),
    tags: ['study-abroad', 'integrated'],
    difficulty: 5,
  }),

  s5u1_298_translate_type: translateType({
    instruction: L(
      '한국에서 유학 생활을 시작하기 전에 숙소를 정했고, 입국 후에는 외국인 등록 정보를 확인했으며, 교통카드를 준비하고 쓰레기 분리 방법도 배웠기 때문에 생활이 훨씬 편해졌다고 한국어로 입력하세요.',
      'Koreyada o‘qishni boshlashdan oldin turar joyni tanlaganingizni, kirgandan keyin xorijlik ro‘yxati ma’lumotini tekshirganingizni, transport kartasi tayyorlab chiqindi ajratishni ham o‘rganganingiz uchun hayot qulaylashganini koreyscha yozing.',
      'Write in Korean that you arranged accommodation before starting your study-abroad life, checked foreigner registration information after arrival, prepared a transportation card, and learned waste sorting, which made life much easier.',
      'Напишите по-корейски, что до начала учёбы вы подготовили жильё, после въезда проверили регистрацию иностранца, приобрели транспортную карту и научились сортировать мусор, поэтому жить стало намного проще.',
    ),
    answer:
      '한국에서 유학 생활을 시작하기 전에 숙소를 정했어요. 입국 후에는 외국인 등록 정보를 확인했고 교통카드도 준비했어요. 쓰레기 분리 방법도 배워서 생활이 훨씬 편해졌어요.',
    translation: L(
      '한국에서 유학 생활을 시작하기 전에 숙소를 정했어요. 입국 후에는 외국인 등록 정보를 확인했고 교통카드도 준비했어요. 쓰레기 분리 방법도 배워서 생활이 훨씬 편해졌어요.',
      'Koreyada o‘qishni boshlashdan oldin turar joyni tanladim. Kirgandan keyin xorijlik ro‘yxati ma’lumotini tekshirib, transport kartasi tayyorladim. Chiqindini ajratishni ham o‘rgandim va hayotim ancha qulaylashdi.',
      'Before starting my study-abroad life in Korea, I arranged accommodation. After arrival, I checked foreigner registration information and prepared a transportation card. I also learned how to sort waste, so life became much easier.',
      'Перед началом учёбы в Корее я подготовил жильё. После въезда проверил информацию о регистрации иностранца и приобрёл транспортную карту. Я также научился сортировать мусор, поэтому жить стало намного проще.',
    ),
    targetExpressions: [
      '유학 생활',
      '숙소',
      '입국',
      '외국인 등록',
      '교통카드',
      '쓰레기',
    ],
    tags: ['study-abroad', 'productive', 'integrated'],
    difficulty: 5,
  }),

  s5u1_299_fill_in_blank: multiBlank({
    sentenceTemplate:
      '유학 생활을 시작할 때는 ___ 후 행정 절차, 살 곳인 ___, 이동할 때 필요한 ___, 그리고 쓰레기를 제대로 ___는 방법까지 알아두면 좋아요.',
    blankAnswers: ['입국', '숙소', '교통카드', '버리'],
    distractors: ['상금', '강의', '졸업식'],
    translation: L(
      '입국, 숙소, 교통카드, 쓰레기 처리까지 유학 생활 핵심을 복습해요.',
      'Gap kirish, turar joy, transport kartasi va chiqindi tashlashni takrorlaydi.',
      'The sentence reviews arrival, accommodation, transportation cards, and waste disposal.',
      'Предложение повторяет въезд, жильё, транспортную карту и утилизацию мусора.',
    ),
    tags: ['study-abroad', 'review'],
    difficulty: 5,
  }),

  s5u1_300_reply_builder: replyBuilder({
    npcText:
      '한국어 공부만 열심히 하면 유학 생활 준비는 다 된 줄 알았는데 생각보다 알아야 할 게 많네요.',
    answer:
      '맞아요 공부와 함께 행정 숙소 교통 생활 규칙도 하나씩 익히면 좋아요',
    translation: L(
      '맞아요. 공부와 함께 행정, 숙소, 교통, 생활 규칙도 하나씩 익히면 좋아요.',
      'To‘g‘ri. O‘qish bilan birga ma’muriy ishlar, turar joy, transport va kundalik qoidalarni ham bittadan o‘rganish yaxshi.',
      'Right. Along with studying, it helps to learn administration, housing, transportation, and daily-life rules one by one.',
      'Да. Вместе с учёбой полезно постепенно освоить административные вопросы, жильё, транспорт и бытовые правила.',
    ),
    distractors: [
      '생활 정보는 필요 없어요',
      '수업만 보면 돼요',
      '모두 잊어버리세요',
    ],
    tags: ['study-abroad', 'reply', 'unit-review'],
    difficulty: 5,
  }),
  // ═══════════════════════════════════════════════════════════
  // NODE 4 · 학교생활과 대학 축제
  // 301 ~ 400
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────
  // Lesson 1 · 학교생활에서 무엇이 중요해요?
  // 301 ~ 320
  // ─────────────────────────────────────────────────────────────

  s5u1_301_reading_quiz: readingQuiz({
    instruction: L(
      '수진이 학교생활에서 가장 중요하게 생각하는 것을 고르세요.',
      'Sujin universitet hayotida eng muhim deb biladigan narsani tanlang.',
      'Choose what Sujin considers most important in her campus life.',
      'Выберите, что Суджин считает самым важным в университетской жизни.',
    ),
    passageTitle: '수진의 학교생활',
    passage:
      '수진은 이번 학기에 전공 공부가 많아서 평일에는 대부분 도서관에서 시간을 보냅니다. 그래도 공부만 하면 스트레스를 많이 받기 때문에 일주일에 한 번은 동아리 친구들과 만나 운동을 합니다. 아르바이트와 여행도 하고 싶지만 이번 학기에는 공부와 건강을 가장 먼저 생각하기로 했습니다.',
    options: [
      '공부와 건강',
      '아르바이트와 여행',
      '축제와 상금',
      '이성 친구 만나기만',
    ],
    answer: '공부와 건강',
    answerTranslation: L(
      '수진은 이번 학기에 공부와 건강을 가장 중요하게 생각해요.',
      'Sujin bu semestrda o‘qish va sog‘liqni eng muhim deb biladi.',
      'Sujin considers studying and her health most important this semester.',
      'В этом семестре Суджин считает учёбу и здоровье самыми важными.',
    ),
    tags: ['school-life', 'priority'],
    difficulty: 5,
  }),

  s5u1_302_word_matching: wordMatching({
    pairs: [
      { korean: '학교생활', native: 'universitet hayoti' },
      { korean: '아르바이트', native: 'yarim kunlik ish' },
      { korean: '자원봉사', native: 'ko‘ngilli ish' },
      { korean: '만족하다', native: 'mamnun bo‘lmoq' },
      { korean: '동아리', native: 'to‘garak' },
    ],
    tags: ['school-life', 'activities'],
  }),

  s5u1_303_sentence_builder: sentenceBuilder({
    answer: '학생마다 학교생활에서 중요하게 생각하는 활동은 다를 수 있어요',
    translation: L(
      '학생마다 학교생활에서 중요하게 생각하는 활동은 다를 수 있어요.',
      'Har bir talaba universitet hayotida turli faoliyatlarni muhim deb bilishi mumkin.',
      'Different students may value different activities in campus life.',
      'Разные студенты могут считать важными разные виды деятельности.',
    ),
    distractors: ['똑같아요', '상금만', '없어져요'],
    tags: ['school-life', 'priority'],
    difficulty: 5,
  }),

  s5u1_304_error_hunt: errorHunt({
    npcText:
      '학생마다 목표와 시간이 다르기 때문에 중요하게 생각하는 학교생활 활동은 같을 수 있어요.',
    wrongWord: '같을',
    options: ['다를', '같을', '적을', '없을'],
    answer: '다를',
    translation: L(
      '학생마다 목표와 시간이 다르기 때문에 중요하게 생각하는 학교생활 활동은 다를 수 있어요.',
      'Har bir talabaning maqsadi va vaqti boshqa bo‘lgani uchun muhim faoliyatlari ham farq qilishi mumkin.',
      'Because students have different goals and schedules, the campus activities they prioritize may differ.',
      'Поскольку цели и расписание у студентов разные, их приоритетные занятия тоже могут различаться.',
    ),
    hint: L(
      '앞에서 목표와 시간이 `다르다`고 했으므로 뒤의 결과도 그 의미와 연결해야 해요.',
      'Oldinda maqsad va vaqt `boshqa` deyilgani uchun keyingi ma’no ham shunga mos bo‘lishi kerak.',
      'The first clause says their goals and schedules differ, so the result should reflect that.',
      'В первой части сказано, что цели и расписание различаются, поэтому и результат должен это отражать.',
    ),
    tags: ['school-life', 'context'],
    difficulty: 5,
  }),

  s5u1_305_fill_in_blank: multiBlank({
    sentenceTemplate:
      '돈을 벌기 위해 일정 시간 일하는 것은 ___이고, 다른 사람을 돕기 위해 하는 활동은 ___이며, 관심사가 같은 사람들과 함께하는 것은 ___이에요.',
    blankAnswers: ['아르바이트', '자원봉사', '동아리 활동'],
    distractors: ['졸업식', '장학금', '입학식'],
    translation: L(
      '아르바이트, 자원봉사, 동아리 활동의 목적을 구별하는 문장이에요.',
      'Gap yarim kunlik ish, ko‘ngillilik va klub faoliyatining maqsadini farqlaydi.',
      'The sentence distinguishes the purposes of part-time work, volunteering, and club activities.',
      'Предложение различает цели подработки, волонтёрства и клубной деятельности.',
    ),
    tags: ['part-time-job', 'volunteer', 'club'],
    difficulty: 5,
  }),

  s5u1_306_audio_match: audioMatch({
    pairs: [
      { korean: '학교생활', native: 'universitet hayoti' },
      { korean: '자원봉사', native: 'ko‘ngilli ish' },
      { korean: '만족하다', native: 'mamnun bo‘lmoq' },
      { korean: '동아리', native: 'to‘garak' },
      { korean: '여행', native: 'sayohat' },
    ],
    tags: ['school-life', 'listening'],
  }),

  s5u1_307_translate_builder: translateBuilder({
    instruction: L(
      '이번 학기에는 여행보다 공부와 동아리 활동을 더 중요하게 생각한다고 말하세요.',
      'Bu semestrda sayohatdan ko‘ra o‘qish va klub faoliyatini muhimroq deb bilishingizni ayting.',
      'Say that this semester you consider studying and club activities more important than traveling.',
      'Скажите, что в этом семестре считаете учёбу и клубную деятельность важнее путешествий.',
    ),
    answer: '이번 학기에는 여행보다 공부와 동아리 활동을 더 중요하게 생각해요',
    translation: L(
      '이번 학기에는 여행보다 공부와 동아리 활동을 더 중요하게 생각해요.',
      'Bu semestrda sayohatdan ko‘ra o‘qish va klub faoliyatini muhimroq deb bilaman.',
      'This semester, I consider studying and club activities more important than traveling.',
      'В этом семестре я считаю учёбу и клубную деятельность важнее путешествий.',
    ),
    distractors: ['상금만', '졸업식은', '포기해요'],
    tags: ['school-life', 'priority'],
    difficulty: 5,
  }),

  s5u1_308_speaking: speaking({
    npcText:
      '친구와 학교생활에서 가장 중요하게 생각하는 활동에 대해 이야기하고 있어요.',
    answer:
      '저는 공부도 중요하지만 친구를 만나고 동아리 활동을 하는 것도 중요해요.',
    translation: L(
      '저는 공부도 중요하지만 친구를 만나고 동아리 활동을 하는 것도 중요해요.',
      'Men uchun o‘qish muhim, lekin do‘stlar bilan uchrashish va klub faoliyati ham muhim.',
      'Studying is important to me, but meeting friends and doing club activities are important too.',
      'Для меня важна учёба, но также важно встречаться с друзьями и участвовать в клубной деятельности.',
    ),
    tags: ['school-life', 'speaking'],
    difficulty: 5,
  }),

  s5u1_309_cloze_passage: clozePassage({
    passage:
      '대학생들이 중요하게 생각하는 활동은 사람마다 다릅니다. 어떤 학생은 ___를 가장 중요하게 생각하고, 생활비가 필요한 학생은 ___를 우선할 수 있습니다. 새로운 사람을 만나고 싶다면 ___을 할 수도 있고, 사회에 도움이 되는 일을 원한다면 ___를 선택할 수도 있습니다.',
    blankAnswers: ['공부', '아르바이트', '동아리 활동', '자원봉사'],
    distractors: ['졸업식', '상금', '주차장'],
    translation: L(
      '학생의 상황과 목표에 따라 학교생활의 우선순위가 달라질 수 있다는 내용이에요.',
      'Talabaning holati va maqsadiga qarab universitet hayotidagi ustuvorliklar farq qilishi mumkin.',
      'The passage explains that campus-life priorities can differ according to each student’s goals and situation.',
      'Текст объясняет, что приоритеты в университетской жизни зависят от целей и ситуации студента.',
    ),
    tags: ['school-life', 'priority'],
    difficulty: 5,
  }),

  s5u1_310_word_arrange: wordArrange({
    answer: '시간이 부족하면 하고 싶은 활동의 우선순위를 정하는 것이 필요해요',
    translation: L(
      '시간이 부족하면 하고 싶은 활동의 우선순위를 정하는 것이 필요해요.',
      'Vaqt yetmasa, qilmoqchi bo‘lgan faoliyatlar ustuvorligini belgilash kerak.',
      'When time is limited, you need to set priorities among the activities you want to do.',
      'Если времени мало, нужно расставить приоритеты среди желаемых занятий.',
    ),
    distractors: ['전부하고', '무조건', '필요없어요'],
    tags: ['school-life', 'priority'],
    difficulty: 5,
  }),

  s5u1_311_reply_builder: replyBuilder({
    npcText:
      '공부도 해야 하고 아르바이트도 하고 싶은데 동아리까지 시작하면 너무 바쁠 것 같아요.',
    answer: '이번 학기에 가장 중요한 활동부터 정하는 게 좋겠어요',
    translation: L(
      '이번 학기에 가장 중요한 활동부터 정하는 게 좋겠어요.',
      'Bu semestrda eng muhim faoliyatni avval belgilaganingiz yaxshi.',
      'It would be better to decide which activity is most important this semester first.',
      'Сначала лучше решить, какое занятие самое важное в этом семестре.',
    ),
    distractors: ['전부해야해요', '수업을버려요', '졸업하세요'],
    tags: ['school-life', 'reply'],
    difficulty: 5,
  }),

  s5u1_312_verb_transform: verbTransform({
    baseWord: '만족하다',
    targetForm: '현재 · 해요체',
    answer: '만족해요',
    options: ['만', '족', '해', '요', '했', '할'],
    translation: L('만족해요', 'mamnunman', 'am satisfied', 'доволен'),
    tags: ['satisfaction', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_313_reading_quiz: readingQuiz({
    instruction: L(
      '아지즈의 현재 목표에 가장 맞는 활동을 고르세요.',
      'Azizning hozirgi maqsadiga eng mos faoliyatni tanlang.',
      'Choose the activity that best fits Aziz’s current goal.',
      'Выберите занятие, которое лучше всего соответствует текущей цели Азиза.',
    ),
    passage:
      '아지즈는 한국에 온 지 한 달밖에 안 됐습니다. 수업은 잘 따라가고 있지만 같은 반 학생 외에는 아는 사람이 거의 없습니다. 돈을 벌 필요는 없고 이번 학기에는 다양한 한국 학생을 만나 학교생활에 빨리 적응하고 싶습니다.',
    options: [
      '동아리 활동을 시작한다',
      '아르바이트 시간을 늘린다',
      '혼자 공부만 한다',
      '졸업식을 준비한다',
    ],
    answer: '동아리 활동을 시작한다',
    answerTranslation: L(
      '새로운 학생을 만나고 학교생활에 적응하려면 동아리 활동이 잘 맞아요.',
      'Yangi talabalar bilan tanishish va universitetga moslashish uchun klub faoliyati mos keladi.',
      'Club activities fit his goal of meeting people and adapting to campus life.',
      'Клубная деятельность хорошо подходит для знакомства с людьми и адаптации к университетской жизни.',
    ),
    tags: ['club', 'school-life', 'judgment'],
    difficulty: 5,
  }),

  s5u1_314_listen_type: listenType({
    audioText: '이번 학기에는 공부와 동아리 활동의 균형을 잘 맞추고 싶어요.',
    translation: L(
      '이번 학기에는 공부와 동아리 활동의 균형을 잘 맞추고 싶어요.',
      'Bu semestrda o‘qish va klub faoliyati o‘rtasidagi muvozanatni yaxshi saqlamoqchiman.',
      'This semester, I want to balance studying and club activities well.',
      'В этом семестре я хочу хорошо сбалансировать учёбу и клубную деятельность.',
    ),
    tags: ['school-life', 'balance'],
  }),

  s5u1_315_sentence_builder: sentenceBuilder({
    answer: '학교생활에 만족하려면 자신에게 맞는 활동을 선택하는 것도 중요해요',
    translation: L(
      '학교생활에 만족하려면 자신에게 맞는 활동을 선택하는 것도 중요해요.',
      'Universitet hayotidan mamnun bo‘lish uchun o‘zingizga mos faoliyatni tanlash ham muhim.',
      'Choosing activities that suit you is also important for being satisfied with campus life.',
      'Чтобы быть довольным университетской жизнью, важно выбирать подходящие себе занятия.',
    ),
    distractors: ['남들만', '무조건', '따라가요'],
    tags: ['school-life', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_316_listen_fill: listenFill({
    audioText: '저는 공부와 자원봉사를 학교생활에서 중요하게 생각해요.',
    sentenceTemplate: '저는 ___와 ___를 학교생활에서 중요하게 생각해요.',
    blankAnswers: ['공부', '자원봉사'],
    translation: L(
      '저는 공부와 자원봉사를 학교생활에서 중요하게 생각해요.',
      'Men universitet hayotida o‘qish va ko‘ngilli ishni muhim deb bilaman.',
      'I consider studying and volunteer work important in campus life.',
      'Я считаю учёбу и волонтёрство важными в университетской жизни.',
    ),
    tags: ['school-life', 'volunteer'],
  }),

  s5u1_317_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '학교생활에서 뭐가 제일 중요하다고 생각해요?',
      },
      {
        speaker: 'user',
        text: '저는 일단 공부가 가장 중요해요.',
      },
      {
        speaker: 'npc',
        text: '공부 외에는 어떤 활동을 하고 싶어요?',
      },
      {
        speaker: 'user',
        text: '시간이 되면 동아리 활동하고 자원봉사도 해 보고 싶어요.',
      },
      {
        speaker: 'npc',
        text: '공부하고 다른 활동의 균형을 잘 맞추면 좋겠네요.',
      },
    ],
    translation: L(
      '학교생활에서 공부와 다른 활동의 우선순위를 이야기하는 대화예요.',
      'Dialog universitet hayotida o‘qish va boshqa faoliyatlarning ustuvorligi haqida.',
      'The dialogue discusses priorities between studying and other campus activities.',
      'Диалог о приоритетах между учёбой и другими видами университетской деятельности.',
    ),
    tags: ['school-life', 'priority'],
    difficulty: 5,
  }),

  s5u1_318_translate_type: translateType({
    instruction: L(
      '이번 학기에는 공부를 가장 중요하게 생각하지만 학교생활에 더 잘 적응하기 위해 동아리 활동과 자원봉사에도 시간을 쓰고 싶다고 한국어로 입력하세요.',
      'Bu semestrda o‘qishni eng muhim deb bilishingizni, lekin universitetga yaxshiroq moslashish uchun klub va ko‘ngilli faoliyatga ham vaqt ajratmoqchi ekaningizni koreyscha yozing.',
      'Write in Korean that studying is your top priority this semester, but you also want to spend time on club activities and volunteering to adapt better to campus life.',
      'Напишите по-корейски, что в этом семестре учёба для вас важнее всего, но для лучшей адаптации вы также хотите уделять время клубной деятельности и волонтёрству.',
    ),
    answer:
      '이번 학기에는 공부를 가장 중요하게 생각해요. 하지만 학교생활에 더 잘 적응하려고 동아리 활동과 자원봉사에도 시간을 쓰고 싶어요.',
    translation: L(
      '이번 학기에는 공부를 가장 중요하게 생각해요. 하지만 학교생활에 더 잘 적응하려고 동아리 활동과 자원봉사에도 시간을 쓰고 싶어요.',
      'Bu semestrda o‘qishni eng muhim deb bilaman. Lekin universitet hayotiga yaxshiroq moslashish uchun klub va ko‘ngilli faoliyatga ham vaqt ajratmoqchiman.',
      'Studying is my top priority this semester. However, I also want to spend time on club activities and volunteering to adapt better to campus life.',
      'В этом семестре учёба для меня важнее всего. Но для лучшей адаптации я также хочу уделять время клубной деятельности и волонтёрству.',
    ),
    targetExpressions: ['학교생활', '동아리 활동', '자원봉사'],
    tags: ['school-life', 'productive'],
    difficulty: 5,
  }),

  s5u1_319_fill_in_blank: multiBlank({
    sentenceTemplate:
      '생활비가 필요한 학생은 ___를 중요하게 생각할 수 있고, 사람을 많이 만나고 싶은 학생은 ___을, 사회에 도움이 되고 싶은 학생은 ___를 선택할 수 있어요.',
    blankAnswers: ['아르바이트', '동아리 활동', '자원봉사'],
    distractors: ['졸업식', '상금', '학점'],
    translation: L(
      '학생의 목적에 따라 학교생활에서 선택하는 활동이 달라질 수 있어요.',
      'Talabaning maqsadiga qarab universitetdagi faoliyat tanlovi farq qilishi mumkin.',
      'Different goals can lead students to choose different campus activities.',
      'В зависимости от цели студент может выбирать разные виды деятельности.',
    ),
    tags: ['school-life', 'judgment'],
    difficulty: 5,
  }),

  s5u1_320_reply_builder: replyBuilder({
    npcText:
      '친구들은 다 아르바이트를 하는데 저는 공부와 동아리에 시간을 더 쓰고 싶어요.',
    answer: '사람마다 중요한 활동이 다르니까 자신에게 맞게 선택하면 돼요',
    translation: L(
      '사람마다 중요한 활동이 다르니까 자신에게 맞게 선택하면 돼요.',
      'Har kim uchun muhim faoliyat boshqacha, shuning uchun o‘zingizga mosini tanlang.',
      'Different activities matter to different people, so choose what fits you.',
      'У всех разные приоритеты, поэтому выбирайте то, что подходит именно вам.',
    ),
    distractors: ['친구들대로', '무조건해야해요', '공부를포기해요'],
    tags: ['school-life', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 2 · 아르바이트와 자원봉사는 달라요
  // 321 ~ 340
  // ─────────────────────────────────────────────────────────────

  s5u1_321_reading_quiz: readingQuiz({
    instruction: L(
      '다음 학생이 하고 있는 활동을 가장 정확하게 고르세요.',
      'Talaba qilayotgan faoliyatni eng aniq tanlang.',
      'Choose the activity that most accurately describes what the student is doing.',
      'Выберите вид деятельности, который точнее всего описывает занятие студента.',
    ),
    passage:
      '마리아는 토요일마다 지역 복지관에서 아이들에게 무료로 영어를 가르칩니다. 돈을 받지는 않지만 다른 사람에게 도움이 될 수 있어서 계속하고 싶다고 합니다.',
    options: ['자원봉사', '아르바이트', '수강 신청', '장학금'],
    answer: '자원봉사',
    answerTranslation: L(
      '돈을 받지 않고 다른 사람을 돕고 있으므로 자원봉사예요.',
      'Pul olmay boshqalarga yordam berayotgani uchun bu ko‘ngilli ish.',
      'Because she helps others without being paid, it is volunteer work.',
      'Поскольку она помогает другим бесплатно, это волонтёрская работа.',
    ),
    tags: ['volunteer', 'part-time-job'],
    difficulty: 5,
  }),

  s5u1_322_audio_match: audioMatch({
    pairs: [
      { korean: '자원봉사', native: 'ko‘ngilli ish' },
      { korean: '아르바이트', native: 'yarim kunlik ish' },
      { korean: '학교생활', native: 'universitet hayoti' },
      { korean: '참가하다', native: 'qatnashmoq' },
      { korean: '만족하다', native: 'mamnun bo‘lmoq' },
    ],
    tags: ['volunteer', 'part-time-job'],
  }),

  s5u1_323_sentence_builder: sentenceBuilder({
    answer:
      '아르바이트는 돈을 벌기 위한 일이고 자원봉사는 도움을 주는 활동이에요',
    translation: L(
      '아르바이트는 돈을 벌기 위한 일이고 자원봉사는 도움을 주는 활동이에요.',
      'Yarim kunlik ish pul topish uchun, ko‘ngillilik esa boshqalarga yordam berish faoliyati.',
      'A part-time job is paid work, while volunteering is an activity done to help others.',
      'Подработка делается ради заработка, а волонтёрство — чтобы помогать другим.',
    ),
    distractors: ['같은뜻이고', '상금이고', '졸업식이에요'],
    tags: ['volunteer', 'part-time-job', 'contrast'],
    difficulty: 5,
  }),

  s5u1_324_error_hunt: errorHunt({
    npcText: '돈을 받지 않고 다른 사람을 돕는 활동을 아르바이트라고 해요.',
    wrongWord: '아르바이트라고',
    options: ['자원봉사라고', '아르바이트라고', '장학금이라고', '수강이라고'],
    answer: '자원봉사라고',
    translation: L(
      '돈을 받지 않고 다른 사람을 돕는 활동을 자원봉사라고 해요.',
      'Pul olmasdan boshqalarga yordam berish ko‘ngilli ish deyiladi.',
      'Helping other people without being paid is called volunteer work.',
      'Помощь другим без оплаты называется волонтёрской деятельностью.',
    ),
    hint: L(
      '돈을 받는 일이 아니라 다른 사람을 돕는 활동이라는 점을 보세요.',
      'Bu haq to‘lanadigan ish emas, boshqalarga yordam berish ekaniga e’tibor bering.',
      'Focus on the fact that the activity is unpaid and intended to help others.',
      'Обратите внимание: работа не оплачивается и направлена на помощь другим.',
    ),
    tags: ['volunteer', 'meaning-contrast'],
    difficulty: 5,
  }),

  s5u1_325_fill_in_blank: multiBlank({
    sentenceTemplate:
      '카페에서 시간당 돈을 받고 일하면 ___이고, 복지관에서 무료로 아이들을 도우면 ___예요.',
    blankAnswers: ['아르바이트', '자원봉사'],
    distractors: ['동아리 활동', '졸업식', '수강 신청'],
    translation: L(
      '돈을 받는 아르바이트와 무료로 돕는 자원봉사를 구별해요.',
      'Haq to‘lanadigan yarim kunlik ish va bepul ko‘ngilli ishni farqlaydi.',
      'The sentence distinguishes paid part-time work from unpaid volunteering.',
      'Предложение различает оплачиваемую подработку и бесплатное волонтёрство.',
    ),
    tags: ['volunteer', 'part-time-job'],
    difficulty: 5,
  }),

  s5u1_326_word_matching: wordMatching({
    pairs: [
      { korean: '아르바이트', native: 'yarim kunlik ish' },
      { korean: '자원봉사', native: 'ko‘ngilli ish' },
      { korean: '참가하다', native: 'qatnashmoq' },
      { korean: '도움', native: 'yordam' },
      { korean: '생활비', native: 'yashash xarajati' },
    ],
    tags: ['volunteer', 'part-time-job'],
  }),

  s5u1_327_translate_builder: translateBuilder({
    instruction: L(
      '생활비를 벌기 위해 주중에는 아르바이트를 하고 주말에는 자원봉사를 한다고 말하세요.',
      'Yashash xarajatlarini topish uchun hafta davomida yarim kunlik ishlab, dam olish kunlari ko‘ngilli ish qilishingizni ayting.',
      'Say that you work part-time during the week to earn living expenses and volunteer on weekends.',
      'Скажите, что по будням подрабатываете ради расходов на жизнь, а по выходным занимаетесь волонтёрством.',
    ),
    answer:
      '생활비를 벌려고 주중에는 아르바이트를 하고 주말에는 자원봉사를 해요',
    translation: L(
      '생활비를 벌려고 주중에는 아르바이트를 하고 주말에는 자원봉사를 해요.',
      'Yashash xarajatlarini topish uchun hafta kunlari yarim kunlik ishlayman, dam olish kunlari esa ko‘ngilli ish qilaman.',
      'I work part-time during the week to earn living expenses and volunteer on weekends.',
      'По будням я подрабатываю ради расходов на жизнь, а по выходным занимаюсь волонтёрством.',
    ),
    distractors: ['상금으로', '졸업식에', '공부만해요'],
    tags: ['part-time-job', 'volunteer'],
    difficulty: 5,
  }),

  s5u1_328_type_answer: typeAnswer({
    instruction: L(
      '돈을 받지 않고 다른 사람이나 사회를 돕는 활동을 뜻하는 한국어 단어를 입력하세요.',
      'Pul olmasdan boshqa odam yoki jamiyatga yordam berish faoliyatini bildiradigan koreyscha so‘zni yozing.',
      'Type the Korean word for unpaid work done to help other people or the community.',
      'Введите по-корейски слово для неоплачиваемой деятельности ради помощи людям или обществу.',
    ),
    answer: '자원봉사',
    translation: L(
      '자원봉사',
      'ko‘ngilli ish',
      'volunteer work',
      'волонтёрская деятельность',
    ),
    tags: ['volunteer', 'recall'],
    difficulty: 5,
  }),

  s5u1_329_cloze_passage: clozePassage({
    passage:
      '저는 한 달 생활비가 부족해서 학교 근처 카페에서 ___를 시작했습니다. 일한 시간에 따라 돈을 받습니다. 그런데 일요일에는 지역 센터에서 무료로 외국인 아이들의 숙제를 도와주는 ___도 하고 있습니다. 두 활동의 목적은 다르지만 둘 다 제 ___에 중요한 경험이 되고 있습니다.',
    blankAnswers: ['아르바이트', '자원봉사', '학교생활'],
    distractors: ['졸업식', '상금', '주차장'],
    translation: L(
      '아르바이트와 자원봉사를 함께 하는 학생의 학교생활 이야기예요.',
      'Yarim kunlik ish va ko‘ngillilikni birga qilayotgan talaba haqida.',
      'The passage describes a student combining part-time work and volunteering.',
      'Текст рассказывает о студенте, который совмещает подработку и волонтёрство.',
    ),
    tags: ['part-time-job', 'volunteer'],
    difficulty: 5,
  }),

  s5u1_330_word_arrange: wordArrange({
    answer:
      '아르바이트와 자원봉사는 목적이 다르기 때문에 상황에 맞게 구별해야 해요',
    translation: L(
      '아르바이트와 자원봉사는 목적이 다르기 때문에 상황에 맞게 구별해야 해요.',
      'Yarim kunlik ish va ko‘ngillilikning maqsadi boshqa, shuning uchun vaziyatga qarab farqlash kerak.',
      'Part-time work and volunteering have different purposes, so they should be distinguished by context.',
      'У подработки и волонтёрства разные цели, поэтому их нужно различать по ситуации.',
    ),
    distractors: ['완전히같아서', '구별없이', '사용해요'],
    tags: ['part-time-job', 'volunteer', 'contrast'],
    difficulty: 5,
  }),

  s5u1_331_reply_builder: replyBuilder({
    npcText:
      '돈을 벌 필요는 없는데 한국 사람들과 함께 지역사회에 도움이 되는 일을 해 보고 싶어요.',
    answer: '그 목적이라면 자원봉사에 참가해 보는 게 좋겠어요',
    translation: L(
      '그 목적이라면 자원봉사에 참가해 보는 게 좋겠어요.',
      'Bu maqsad uchun ko‘ngilli faoliyatda qatnashib ko‘rganingiz yaxshi.',
      'For that goal, volunteering would be a good option.',
      'Для такой цели стоит попробовать волонтёрскую деятельность.',
    ),
    distractors: ['아르바이트만', '상금부터', '졸업하세요'],
    tags: ['volunteer', 'reply'],
    difficulty: 5,
  }),

  s5u1_332_verb_transform: verbTransform({
    baseWord: '참가하다',
    targetForm: '현재 · 해요체',
    answer: '참가해요',
    options: ['참', '가', '해', '요', '했', '할'],
    translation: L('참가해요', 'qatnashaman', 'participate', 'участвую'),
    tags: ['participation', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_333_reading_quiz: readingQuiz({
    instruction: L(
      '학생에게 더 적합한 활동을 고르세요.',
      'Talabaga ko‘proq mos faoliyatni tanlang.',
      'Choose the activity that better fits the student.',
      'Выберите занятие, которое больше подходит студенту.',
    ),
    passage:
      '이고르는 이번 학기 생활비가 부족해서 매달 일정한 수입이 필요합니다. 주말에 시간이 있지만 지금은 사회 경험보다 경제적인 문제가 더 중요합니다.',
    options: ['아르바이트', '자원봉사', '졸업식 참석', '노래자랑 관람'],
    answer: '아르바이트',
    answerTranslation: L(
      '현재 가장 필요한 것은 일정한 수입이므로 아르바이트가 더 맞아요.',
      'Hozir eng kerakli narsa daromad bo‘lgani uchun yarim kunlik ish mosroq.',
      'Because the immediate need is income, a part-time job fits better.',
      'Поскольку сейчас важнее всего доход, подработка подходит больше.',
    ),
    tags: ['part-time-job', 'judgment'],
    difficulty: 5,
  }),

  s5u1_334_listen_type: listenType({
    audioText:
      '아르바이트는 돈을 받지만 자원봉사는 보통 도움을 주는 것이 목적이에요.',
    translation: L(
      '아르바이트는 돈을 받지만 자원봉사는 보통 도움을 주는 것이 목적이에요.',
      'Yarim kunlik ishda haq olinadi, ko‘ngillilikning asosiy maqsadi esa yordam berish.',
      'Part-time work is paid, while volunteering generally aims to help others.',
      'Подработка оплачивается, а основная цель волонтёрства — помощь другим.',
    ),
    tags: ['part-time-job', 'volunteer'],
  }),

  s5u1_335_sentence_builder: sentenceBuilder({
    answer:
      '자원봉사는 새로운 사람을 만나면서 다른 사람에게 도움도 줄 수 있어요',
    translation: L(
      '자원봉사는 새로운 사람을 만나면서 다른 사람에게 도움도 줄 수 있어요.',
      'Ko‘ngilli ishda yangi odamlar bilan tanishib, boshqalarga ham yordam berish mumkin.',
      'Volunteering lets you meet new people while also helping others.',
      'Волонтёрство позволяет знакомиться с новыми людьми и одновременно помогать другим.',
    ),
    distractors: ['돈만벌고', '상금을', '받아야해요'],
    tags: ['volunteer', 'school-life'],
    difficulty: 5,
  }),

  s5u1_336_listen_fill: listenFill({
    audioText:
      '생활비가 필요해서 아르바이트를 시작했고 주말에는 자원봉사도 해요.',
    sentenceTemplate: '생활비가 필요해서 ___를 시작했고 주말에는 ___도 해요.',
    blankAnswers: ['아르바이트', '자원봉사'],
    translation: L(
      '생활비가 필요해서 아르바이트를 시작했고 주말에는 자원봉사도 해요.',
      'Yashash xarajatlari uchun yarim kunlik ish boshladim, dam olish kunlari ko‘ngilli ish ham qilaman.',
      'I started a part-time job because I need living expenses, and I also volunteer on weekends.',
      'Я начал подрабатывать из-за расходов на жизнь, а по выходным ещё занимаюсь волонтёрством.',
    ),
    tags: ['part-time-job', 'volunteer'],
  }),

  s5u1_337_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '주말에 아르바이트해요?',
      },
      {
        speaker: 'user',
        text: '아니요. 주말에는 지역 센터에서 자원봉사를 해요.',
      },
      {
        speaker: 'npc',
        text: '돈을 받는 일은 아니군요.',
      },
      {
        speaker: 'user',
        text: '네. 아이들을 도와주고 싶어서 시작했어요.',
      },
      {
        speaker: 'npc',
        text: '좋은 경험이 되겠네요.',
      },
    ],
    translation: L(
      '아르바이트와 자원봉사의 차이를 실제 대화에서 확인해요.',
      'Dialogda yarim kunlik ish va ko‘ngillilik farqi ko‘rsatiladi.',
      'The dialogue distinguishes part-time work and volunteering in a real situation.',
      'Диалог показывает разницу между подработкой и волонтёрством.',
    ),
    tags: ['part-time-job', 'volunteer'],
    difficulty: 5,
  }),

  s5u1_338_translate_type: translateType({
    instruction: L(
      '생활비를 마련하기 위해 카페에서 아르바이트를 하고 있지만 돈을 받지 않고 지역사회에 도움이 되는 경험도 하고 싶어서 주말에는 자원봉사에 참가한다고 한국어로 입력하세요.',
      'Yashash xarajatlari uchun kafeda ishlashingizni, lekin pul olmasdan jamiyatga yordam berishni ham xohlaganingiz uchun dam olish kunlari ko‘ngillilikda qatnashishingizni koreyscha yozing.',
      'Write in Korean that you work part-time at a café for living expenses, but also volunteer on weekends because you want unpaid experience helping the community.',
      'Напишите по-корейски, что ради расходов на жизнь подрабатываете в кафе, но по выходным также занимаетесь волонтёрством, потому что хотите помогать обществу без оплаты.',
    ),
    answer:
      '생활비를 마련하려고 카페에서 아르바이트를 하고 있어요. 하지만 돈을 받지 않고 지역사회에 도움이 되는 경험도 하고 싶어서 주말에는 자원봉사에 참가해요.',
    translation: L(
      '생활비를 마련하려고 카페에서 아르바이트를 하고 있어요. 하지만 돈을 받지 않고 지역사회에 도움이 되는 경험도 하고 싶어서 주말에는 자원봉사에 참가해요.',
      'Yashash xarajatlari uchun kafeda ishlayman. Lekin jamiyatga bepul yordam berish tajribasini ham xohlaganim uchun dam olish kunlari ko‘ngilli faoliyatda qatnashaman.',
      'I work part-time at a café for living expenses. However, I also volunteer on weekends because I want experience helping the community without being paid.',
      'Я подрабатываю в кафе ради расходов на жизнь. Но по выходным также занимаюсь волонтёрством, потому что хочу получить опыт помощи обществу без оплаты.',
    ),
    targetExpressions: ['아르바이트', '자원봉사', '참가'],
    tags: ['part-time-job', 'volunteer', 'productive'],
    difficulty: 5,
  }),

  s5u1_339_fill_in_blank: multiBlank({
    sentenceTemplate:
      '일한 시간에 따라 돈을 받는 활동은 ___이고, 보수를 목적으로 하지 않고 다른 사람을 돕는 활동은 ___예요.',
    blankAnswers: ['아르바이트', '자원봉사'],
    distractors: ['동아리 활동', '수강 신청', '신입생 환영회'],
    translation: L(
      '아르바이트와 자원봉사의 핵심적인 의미 차이를 다시 확인해요.',
      'Yarim kunlik ish va ko‘ngillilikning asosiy ma’no farqini takrorlaydi.',
      'The sentence reviews the core difference between part-time work and volunteering.',
      'Предложение повторяет ключевое различие между подработкой и волонтёрством.',
    ),
    tags: ['part-time-job', 'volunteer', 'review'],
    difficulty: 5,
  }),

  s5u1_340_reply_builder: replyBuilder({
    npcText: '자원봉사도 아르바이트처럼 일을 하니까 돈을 받는 거죠?',
    answer: '보통 자원봉사는 돈보다 다른 사람을 돕는 것이 목적이에요',
    translation: L(
      '보통 자원봉사는 돈보다 다른 사람을 돕는 것이 목적이에요.',
      'Odatda ko‘ngillilikda puldan ko‘ra boshqalarga yordam berish maqsad qilinadi.',
      'Volunteer work is generally intended to help others rather than earn money.',
      'Обычно цель волонтёрства — помощь другим, а не заработок.',
    ),
    distractors: ['항상돈을받아요', '둘은같아요', '상금이에요'],
    tags: ['volunteer', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 3 · 동아리에서 사람들을 만나요
  // 341 ~ 360
  // ─────────────────────────────────────────────────────────────

  s5u1_341_reading_quiz: readingQuiz({
    instruction: L(
      '학생의 목표에 가장 맞는 선택을 고르세요.',
      'Talabaning maqsadiga eng mos tanlovni belgilang.',
      'Choose the option that best fits the student’s goal.',
      'Выберите вариант, который лучше всего соответствует цели студента.',
    ),
    passage:
      '알리나는 한국에 온 뒤 공부는 잘하고 있지만 한국 학생과 이야기할 기회가 거의 없었습니다. 사진 찍기를 좋아하고 같은 취미를 가진 학생들과 정기적으로 만나고 싶습니다.',
    options: [
      '사진 동아리에 가입한다',
      '혼자 공부만 한다',
      '아르바이트 시간을 늘린다',
      '졸업식을 기다린다',
    ],
    answer: '사진 동아리에 가입한다',
    answerTranslation: L(
      '같은 취미를 가진 사람을 만나려면 사진 동아리가 잘 맞아요.',
      'Bir xil hobbi bilan qiziqqanlarni uchratish uchun foto klubi mos.',
      'A photography club suits her goal of meeting students with the same interest.',
      'Фотоклуб подходит для знакомства со студентами с тем же увлечением.',
    ),
    tags: ['club', 'school-life'],
    difficulty: 5,
  }),

  s5u1_342_word_matching: wordMatching({
    pairs: [
      { korean: '동아리', native: 'to‘garak' },
      { korean: '가입하다', native: 'a’zo bo‘lmoq' },
      { korean: '선배', native: 'yuqori kurs' },
      { korean: '신입생', native: 'yangi talaba' },
      { korean: '학교생활', native: 'universitet hayoti' },
    ],
    tags: ['club', 'relationship'],
  }),

  s5u1_343_sentence_builder: sentenceBuilder({
    answer: '동아리 활동을 하면 같은 관심사를 가진 학생을 만날 수 있어요',
    translation: L(
      '동아리 활동을 하면 같은 관심사를 가진 학생을 만날 수 있어요.',
      'Klub faoliyatida bir xil qiziqishdagi talabalarni uchratish mumkin.',
      'Club activities can help you meet students with the same interests.',
      'Клубная деятельность помогает знакомиться со студентами с похожими интересами.',
    ),
    distractors: ['상금만', '혼자서', '받을수있어요'],
    tags: ['club', 'school-life'],
    difficulty: 5,
  }),

  s5u1_344_error_hunt: errorHunt({
    npcText:
      '같은 관심사를 가진 학생들이 정기적으로 함께하는 모임을 장학금이라고 해요.',
    wrongWord: '장학금이라고',
    options: ['동아리라고', '장학금이라고', '학점이라고', '성적이라고'],
    answer: '동아리라고',
    translation: L(
      '같은 관심사를 가진 학생들이 정기적으로 함께하는 모임을 동아리라고 해요.',
      'Bir xil qiziqishdagi talabalar muntazam uchrashadigan guruh klub deyiladi.',
      'A group where students with shared interests meet regularly is called a club.',
      'Группа, где регулярно встречаются студенты с общими интересами, называется клубом.',
    ),
    hint: L(
      '같은 취미나 관심사를 가진 학생들의 모임을 뜻하는 단어를 찾으세요.',
      'Bir xil hobbi yoki qiziqishdagi talabalar guruhini bildiradigan so‘zni toping.',
      'Find the word for a group of students who share an interest or hobby.',
      'Найдите слово для объединения студентов с общими интересами или увлечениями.',
    ),
    tags: ['club', 'meaning'],
    difficulty: 5,
  }),

  s5u1_345_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학교 모임의 회원이 되는 것은 동아리에 ___하는 것이고, 가입한 뒤 실제로 모임에 참여하는 것은 ___을 하는 거예요.',
    blankAnswers: ['가입', '동아리 활동'],
    distractors: ['합격', '수강 신청', '아르바이트'],
    translation: L(
      '동아리에 가입하는 것과 실제 동아리 활동을 하는 것을 구별해요.',
      'Klubga a’zo bo‘lish va klubda amalda faoliyat qilish farqlanadi.',
      'The sentence distinguishes joining a club from actually doing club activities.',
      'Предложение различает вступление в клуб и участие в его деятельности.',
    ),
    tags: ['club', 'membership'],
    difficulty: 5,
  }),

  s5u1_346_audio_match: audioMatch({
    pairs: [
      { korean: '동아리', native: 'to‘garak' },
      { korean: '가입하다', native: 'a’zo bo‘lmoq' },
      { korean: '선배', native: 'yuqori kurs' },
      { korean: '신입생', native: 'yangi talaba' },
      { korean: '자원봉사', native: 'ko‘ngilli ish' },
    ],
    tags: ['club', 'listening'],
  }),

  s5u1_347_translate_builder: translateBuilder({
    instruction: L(
      '한국 학생을 많이 만나고 싶어서 사진 동아리에 가입했다고 말하세요.',
      'Ko‘p koreys talabalar bilan tanishmoqchi bo‘lib foto klubiga qo‘shilganingizni ayting.',
      'Say that you joined a photography club because you wanted to meet more Korean students.',
      'Скажите, что вступили в фотоклуб, потому что хотели познакомиться с большим числом корейских студентов.',
    ),
    answer: '한국 학생을 많이 만나고 싶어서 사진 동아리에 가입했어요',
    translation: L(
      '한국 학생을 많이 만나고 싶어서 사진 동아리에 가입했어요.',
      'Ko‘p koreys talabalar bilan tanishmoqchi bo‘lib foto klubiga qo‘shildim.',
      'I joined a photography club because I wanted to meet more Korean students.',
      'Я вступил в фотоклуб, потому что хотел познакомиться с большим числом корейских студентов.',
    ),
    distractors: ['장학금에', '졸업식을', '신청했어요'],
    tags: ['club', 'membership'],
    difficulty: 5,
  }),

  s5u1_348_speaking: speaking({
    npcText:
      '새 친구에게 어떤 동아리 활동을 하고 싶은지 이유와 함께 설명하고 있어요.',
    answer:
      '저는 사진을 좋아해서 사진 동아리에 들어가 다른 학생들과 같이 활동하고 싶어요.',
    translation: L(
      '저는 사진을 좋아해서 사진 동아리에 들어가 다른 학생들과 같이 활동하고 싶어요.',
      'Men suratga olishni yoqtiraman, shuning uchun foto klubiga kirib boshqa talabalar bilan faoliyat qilmoqchiman.',
      'I like photography, so I want to join a photography club and participate with other students.',
      'Я люблю фотографию, поэтому хочу вступить в фотоклуб и заниматься вместе с другими студентами.',
    ),
    tags: ['club', 'speaking'],
    difficulty: 5,
  }),

  s5u1_349_cloze_passage: clozePassage({
    passage:
      '한국에 온 뒤 새로운 친구를 만들고 싶어서 학교 ___을 찾아봤습니다. 저는 사진을 좋아해서 사진 동아리에 ___했습니다. 매주 선배와 다른 학생들을 만나서 ___을 하고 있는데, 덕분에 ___에도 더 빨리 적응하고 있습니다.',
    blankAnswers: ['동아리', '가입', '동아리 활동', '학교생활'],
    distractors: ['학점', '장학금', '아르바이트'],
    translation: L(
      '동아리에 가입하고 활동하면서 학교생활에 적응하는 학생의 이야기예요.',
      'Klubga qo‘shilib faoliyat orqali universitet hayotiga moslashayotgan talaba haqida.',
      'The passage describes a student adapting to campus life through club membership and activities.',
      'Текст рассказывает о студенте, который адаптируется к университетской жизни через клуб.',
    ),
    tags: ['club', 'school-life'],
    difficulty: 5,
  }),

  s5u1_350_word_arrange: wordArrange({
    answer:
      '동아리는 가입하는 것보다 꾸준히 활동하는 것이 더 중요할 수도 있어요',
    translation: L(
      '동아리는 가입하는 것보다 꾸준히 활동하는 것이 더 중요할 수도 있어요.',
      'Klubga shunchaki a’zo bo‘lishdan ko‘ra muntazam qatnashish muhimroq bo‘lishi mumkin.',
      'Regularly participating in a club may be more important than simply joining it.',
      'Регулярно участвовать в клубе может быть важнее, чем просто вступить в него.',
    ),
    distractors: ['가입만하면', '아무활동도', '필요없어요'],
    tags: ['club', 'participation'],
    difficulty: 5,
  }),

  s5u1_351_reply_builder: replyBuilder({
    npcText:
      '동아리에 가입은 했는데 모임에 한 번도 안 나가서 아직 아는 사람이 없어요.',
    answer:
      '정기적으로 동아리 활동에 참여해 보면 사람을 더 많이 만날 수 있어요',
    translation: L(
      '정기적으로 동아리 활동에 참여해 보면 사람을 더 많이 만날 수 있어요.',
      'Klub faoliyatida muntazam qatnashsangiz ko‘proq odam bilan tanishishingiz mumkin.',
      'If you participate in club activities regularly, you can meet more people.',
      'Если регулярно участвовать в клубной деятельности, можно познакомиться с большим числом людей.',
    ),
    distractors: ['가입만하고', '혼자있으면', '더좋아요'],
    tags: ['club', 'reply'],
    difficulty: 5,
  }),

  s5u1_352_verb_transform: verbTransform({
    baseWord: '가입하다',
    targetForm: '현재 · 해요체',
    answer: '가입해요',
    options: ['가', '입', '해', '요', '했', '할'],
    translation: L('가입해요', 'a’zo bo‘laman', 'join', 'вступаю'),
    tags: ['membership', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_353_reading_quiz: readingQuiz({
    instruction: L(
      '아래 두 학생 중 동아리 활동이 더 직접적으로 필요한 학생을 고르세요.',
      'Ikki talabadan klub faoliyati ko‘proq kerak bo‘lganini tanlang.',
      'Choose the student who would benefit more directly from club activities.',
      'Выберите студента, которому клубная деятельность принесёт более непосредственную пользу.',
    ),
    passage:
      '① 민수는 같은 취미를 가진 학생들을 만나고 싶지만 학교에서 아는 사람이 거의 없습니다.\n② 안나는 친구가 많고 이번 학기에는 생활비가 부족해서 일정한 수입이 가장 필요합니다.',
    options: [
      '민수',
      '안나',
      '두 사람 모두 같은 이유',
      '두 사람 모두 필요 없다',
    ],
    answer: '민수',
    answerTranslation: L(
      '민수의 목표는 같은 취미를 가진 사람을 만나는 것이므로 동아리 활동이 직접적으로 도움이 돼요.',
      'Minsuning maqsadi bir xil hobbi bilan qiziqqanlarni uchratish bo‘lgani uchun klub to‘g‘ridan-to‘g‘ri yordam beradi.',
      'Minsu wants to meet people with similar interests, so club activities directly fit his goal.',
      'Минсу хочет знакомиться с людьми со схожими интересами, поэтому клуб подходит его цели напрямую.',
    ),
    tags: ['club', 'judgment'],
    difficulty: 5,
  }),

  s5u1_354_listen_type: listenType({
    audioText: '동아리 활동을 시작한 뒤에 다른 학과 친구도 많이 생겼어요.',
    translation: L(
      '동아리 활동을 시작한 뒤에 다른 학과 친구도 많이 생겼어요.',
      'Klub faoliyatini boshlaganimdan keyin boshqa fakultetlardan ham ko‘p do‘stlar topdim.',
      'After starting club activities, I made many friends from other departments.',
      'После начала клубной деятельности у меня появилось много друзей с других факультетов.',
    ),
    tags: ['club', 'school-life'],
  }),

  s5u1_355_sentence_builder: sentenceBuilder({
    answer: '같은 동아리에서도 사람마다 활동에 참여하는 정도는 다를 수 있어요',
    translation: L(
      '같은 동아리에서도 사람마다 활동에 참여하는 정도는 다를 수 있어요.',
      'Bir klubning o‘zida ham har kimning qatnashish darajasi farq qilishi mumkin.',
      'Even within the same club, students may participate to different degrees.',
      'Даже в одном клубе степень участия у студентов может различаться.',
    ),
    distractors: ['모두똑같이', '가입만', '해야해요'],
    tags: ['club', 'participation'],
    difficulty: 5,
  }),

  s5u1_356_listen_fill: listenFill({
    audioText: '새로운 친구를 만나고 싶어서 동아리에 가입했어요.',
    sentenceTemplate: '새로운 친구를 만나고 싶어서 ___에 ___했어요.',
    blankAnswers: ['동아리', '가입'],
    translation: L(
      '새로운 친구를 만나고 싶어서 동아리에 가입했어요.',
      'Yangi do‘stlar bilan tanishmoqchi bo‘lib klubga qo‘shildim.',
      'I joined a club because I wanted to meet new friends.',
      'Я вступил в клуб, потому что хотел познакомиться с новыми друзьями.',
    ),
    tags: ['club', 'membership'],
  }),

  s5u1_357_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '요즘 학교생활은 어때요?',
      },
      {
        speaker: 'user',
        text: '처음보다 훨씬 재미있어요. 동아리에 가입했거든요.',
      },
      {
        speaker: 'npc',
        text: '어떤 동아리예요?',
      },
      {
        speaker: 'user',
        text: '사진 동아리인데 매주 같이 사진을 찍으러 가요.',
      },
      {
        speaker: 'npc',
        text: '새로운 친구도 많이 만날 수 있겠네요.',
      },
    ],
    translation: L(
      '동아리 활동 덕분에 학교생활이 좋아진 학생의 대화예요.',
      'Klub faoliyati tufayli universitet hayoti yaxshilangan talaba haqida dialog.',
      'The dialogue is about campus life improving through club activities.',
      'Диалог о том, как клубная деятельность сделала университетскую жизнь интереснее.',
    ),
    tags: ['club', 'school-life'],
    difficulty: 5,
  }),

  s5u1_358_translate_type: translateType({
    instruction: L(
      '처음에는 학교에 아는 사람이 거의 없었지만 같은 관심사를 가진 학생을 만나기 위해 동아리에 가입했고 꾸준히 활동하면서 다른 학과 친구도 많이 생겼다고 한국어로 입력하세요.',
      'Avval universitetda deyarli hech kimni tanimagansiz, lekin bir xil qiziqishdagi talabalarni uchratish uchun klubga qo‘shilib muntazam qatnashganingizdan keyin boshqa fakultetlardan ham ko‘p do‘stlar orttirganingizni koreyscha yozing.',
      'Write in Korean that you initially knew almost no one at school, joined a club to meet students with similar interests, and made many friends from other departments by participating regularly.',
      'Напишите по-корейски, что сначала почти никого не знали в университете, вступили в клуб ради знакомства с людьми со схожими интересами и благодаря регулярному участию нашли много друзей с других факультетов.',
    ),
    answer:
      '처음에는 학교에 아는 사람이 거의 없었어요. 같은 관심사를 가진 학생을 만나려고 동아리에 가입했고 꾸준히 활동하면서 다른 학과 친구도 많이 생겼어요.',
    translation: L(
      '처음에는 학교에 아는 사람이 거의 없었어요. 같은 관심사를 가진 학생을 만나려고 동아리에 가입했고 꾸준히 활동하면서 다른 학과 친구도 많이 생겼어요.',
      'Avval universitetda deyarli hech kimni tanimasdim. Bir xil qiziqishdagi talabalarni uchratish uchun klubga qo‘shildim va muntazam qatnashib boshqa fakultetlardan ham ko‘p do‘stlar orttirdim.',
      'At first I knew almost no one at school. I joined a club to meet students with similar interests, and through regular participation I made many friends from other departments.',
      'Сначала я почти никого не знал в университете. Я вступил в клуб, чтобы познакомиться с людьми со схожими интересами, и благодаря регулярному участию нашёл много друзей с других факультетов.',
    ),
    targetExpressions: ['동아리', '가입', '활동'],
    tags: ['club', 'productive'],
    difficulty: 5,
  }),

  s5u1_359_fill_in_blank: multiBlank({
    sentenceTemplate:
      '동아리의 회원이 되려면 ___하고, 그 뒤 모임이나 행사에 꾸준히 참여하면 ___을 하게 돼요.',
    blankAnswers: ['가입', '동아리 활동'],
    distractors: ['합격', '장학금', '수강 신청'],
    translation: L(
      '동아리 가입과 동아리 활동의 순서를 복습해요.',
      'Klubga a’zo bo‘lish va klub faoliyatini takrorlaydi.',
      'The sentence reviews joining a club and then participating in club activities.',
      'Предложение повторяет вступление в клуб и последующее участие в деятельности.',
    ),
    tags: ['club', 'review'],
    difficulty: 5,
  }),

  s5u1_360_reply_builder: replyBuilder({
    npcText:
      '학교생활은 괜찮은데 수업 외에는 아는 사람이 별로 없어서 조금 심심해요.',
    answer: '관심 있는 동아리에 가입해서 활동해 보는 것도 좋겠어요',
    translation: L(
      '관심 있는 동아리에 가입해서 활동해 보는 것도 좋겠어요.',
      'Qiziqqan klubga qo‘shilib faoliyat qilib ko‘rishingiz ham yaxshi.',
      'You could try joining a club you are interested in and participating in its activities.',
      'Можно попробовать вступить в интересующий клуб и участвовать в его деятельности.',
    ),
    distractors: ['혼자만있어요', '공부를그만둬요', '장학금을버려요'],
    tags: ['club', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 4 · 대학 축제를 즐겨요
  // 361 ~ 380
  // ─────────────────────────────────────────────────────────────

  s5u1_361_reading_quiz: readingQuiz({
    instruction: L(
      '지호에게 가장 잘 맞는 축제 활동을 고르세요.',
      'Jiho uchun eng mos festival faoliyatini tanlang.',
      'Choose the festival activity that best fits Jiho.',
      'Выберите фестивальное занятие, которое лучше всего подходит Чихо.',
    ),
    passage:
      '지호는 사람들 앞에서 직접 노래하는 것을 좋아하고 친구들과 경쟁하는 것도 재미있어합니다. 공연을 조용히 감상하는 것보다 직접 무대에 올라가는 활동을 더 좋아합니다.',
    options: [
      '노래자랑에 참가한다',
      '음악회만 관람한다',
      '강당 밖에서 기다린다',
      '축제에 가지 않는다',
    ],
    answer: '노래자랑에 참가한다',
    answerTranslation: L(
      '직접 무대에서 노래하고 경쟁하고 싶으므로 노래자랑이 잘 맞아요.',
      'Sahnada o‘zi kuylab musobaqalashmoqchi bo‘lgani uchun qo‘shiq tanlovi mos.',
      'Because he wants to sing and compete on stage, the singing contest suits him.',
      'Поскольку он хочет петь и соревноваться на сцене, ему подходит конкурс песни.',
    ),
    tags: ['festival', 'singing-contest'],
    difficulty: 5,
  }),

  s5u1_362_word_matching: wordMatching({
    pairs: [
      { korean: '축제', native: 'festival' },
      { korean: '참가하다', native: 'qatnashmoq' },
      { korean: '음악회', native: 'konsert' },
      { korean: '노래자랑', native: 'qo‘shiq tanlovi' },
      { korean: '강당', native: 'katta zal' },
    ],
    tags: ['festival', 'campus-event'],
  }),

  s5u1_363_sentence_builder: sentenceBuilder({
    answer:
      '학교 축제에서는 공연을 보는 것뿐 아니라 직접 행사에 참가할 수도 있어요',
    translation: L(
      '학교 축제에서는 공연을 보는 것뿐 아니라 직접 행사에 참가할 수도 있어요.',
      'Universitet festivalida nafaqat chiqishlarni ko‘rish, balki tadbirlarda bevosita qatnashish ham mumkin.',
      'At a school festival, you can not only watch performances but also participate directly in events.',
      'На университетском фестивале можно не только смотреть выступления, но и самому участвовать в мероприятиях.',
    ),
    distractors: ['관람만하고', '아무활동도', '할수없어요'],
    tags: ['festival', 'participation'],
    difficulty: 5,
  }),

  s5u1_364_error_hunt: errorHunt({
    npcText:
      '학교 축제에서 직접 무대에 올라 노래 실력을 겨루는 행사는 음악회라고 해요.',
    wrongWord: '음악회라고',
    options: ['노래자랑이라고', '음악회라고', '졸업식이라고', '입학식이라고'],
    answer: '노래자랑이라고',
    translation: L(
      '학교 축제에서 직접 무대에 올라 노래 실력을 겨루는 행사는 노래자랑이라고 해요.',
      'Festivalda sahnaga chiqib qo‘shiq aytib bellashadigan tadbir qo‘shiq tanlovi deyiladi.',
      'An event where students sing on stage and compete is a singing contest.',
      'Мероприятие, где участники поют на сцене и соревнуются, называется конкурсом песни.',
    ),
    hint: L(
      '공연을 감상하는 행사가 아니라 참가자들이 직접 노래 실력을 보여 주는 행사예요.',
      'Bu tomosha qilish emas, ishtirokchilar o‘zlari kuylaydigan tanlov.',
      'This is a competition where participants sing themselves, not simply a concert to watch.',
      'Это конкурс, где участники сами поют, а не просто концерт для зрителей.',
    ),
    tags: ['festival', 'singing-contest'],
    difficulty: 5,
  }),

  s5u1_365_fill_in_blank: multiBlank({
    sentenceTemplate:
      '학생들이 직접 노래 실력을 겨루면 ___이고, 무대에서 음악 공연을 감상하면 ___이며, 이런 여러 행사가 함께 열리는 큰 학교 행사는 ___예요.',
    blankAnswers: ['노래자랑', '음악회', '축제'],
    distractors: ['입학식', '졸업식', '오리엔테이션'],
    translation: L(
      '노래자랑, 음악회, 축제의 관계를 구별해요.',
      'Qo‘shiq tanlovi, konsert va festival munosabatini farqlaydi.',
      'The sentence distinguishes a singing contest, concert, and the larger festival.',
      'Предложение различает конкурс песни, концерт и сам фестиваль.',
    ),
    tags: ['festival', 'event'],
    difficulty: 5,
  }),

  s5u1_366_audio_match: audioMatch({
    pairs: [
      { korean: '축제', native: 'festival' },
      { korean: '노래자랑', native: 'qo‘shiq tanlovi' },
      { korean: '음악회', native: 'konsert' },
      { korean: '참가하다', native: 'qatnashmoq' },
      { korean: '강당', native: 'katta zal' },
    ],
    tags: ['festival', 'listening'],
  }),

  s5u1_367_translate_builder: translateBuilder({
    instruction: L(
      '작년 축제에서는 음악회를 봤지만 올해는 노래자랑에 직접 참가하고 싶다고 말하세요.',
      'O‘tgan yil festivalda konsert ko‘rganingizni, lekin bu yil qo‘shiq tanlovida o‘zingiz qatnashmoqchi ekaningizni ayting.',
      'Say that you watched a concert at last year’s festival, but this year you want to participate in the singing contest yourself.',
      'Скажите, что на прошлогоднем фестивале смотрели концерт, а в этом году хотите сами участвовать в конкурсе песни.',
    ),
    answer:
      '작년 축제에서는 음악회를 봤지만 올해는 노래자랑에 직접 참가하고 싶어요',
    translation: L(
      '작년 축제에서는 음악회를 봤지만 올해는 노래자랑에 직접 참가하고 싶어요.',
      'O‘tgan yil festivalda konsert ko‘rdim, lekin bu yil qo‘shiq tanlovida o‘zim qatnashmoqchiman.',
      'I watched a concert at last year’s festival, but this year I want to participate in the singing contest myself.',
      'На прошлогоднем фестивале я смотрел концерт, а в этом году хочу сам участвовать в конкурсе песни.',
    ),
    distractors: ['졸업식에', '상금만', '관람할게요'],
    tags: ['festival', 'participation'],
    difficulty: 5,
  }),

  s5u1_368_speaking: speaking({
    npcText:
      '친구에게 예전에 갔던 학교 축제에서 가장 재미있었던 일을 설명하고 있어요.',
    answer:
      '작년 축제에서 친구들과 공연도 보고 노래자랑에도 참가해서 정말 재미있었어요.',
    translation: L(
      '작년 축제에서 친구들과 공연도 보고 노래자랑에도 참가해서 정말 재미있었어요.',
      'O‘tgan yil festivalda do‘stlarim bilan chiqishlarni ko‘rib, qo‘shiq tanlovida ham qatnashdim va juda qiziqarli bo‘ldi.',
      'Last year I watched performances with friends and also joined the singing contest, so the festival was really fun.',
      'В прошлом году я смотрел выступления с друзьями и участвовал в конкурсе песни, поэтому фестиваль был очень весёлым.',
    ),
    tags: ['festival', 'experience'],
    difficulty: 5,
  }),

  s5u1_369_cloze_passage: clozePassage({
    passage:
      '우리 학교에서는 매년 큰 ___가 열립니다. 작년에는 친구들과 저녁 ___를 봤고, 올해는 직접 ___에 참가해 볼 생각입니다. 보기만 하는 것보다 직접 ___하면 더 기억에 남을 것 같습니다.',
    blankAnswers: ['축제', '음악회', '노래자랑', '참가'],
    distractors: ['졸업식', '장학금', '수강'],
    translation: L(
      '학교 축제에서 관람과 직접 참가를 비교하는 글이에요.',
      'Matnda festivalda tomosha qilish va bevosita qatnashish solishtiriladi.',
      'The passage compares watching events and participating directly at a school festival.',
      'Текст сравнивает просмотр мероприятий и непосредственное участие в университетском фестивале.',
    ),
    tags: ['festival', 'participation'],
    difficulty: 5,
  }),

  s5u1_370_word_arrange: wordArrange({
    answer: '축제에서는 자신이 좋아하는 방식으로 여러 행사에 참여할 수 있어요',
    translation: L(
      '축제에서는 자신이 좋아하는 방식으로 여러 행사에 참여할 수 있어요.',
      'Festivalda o‘zingiz yoqtirgan usulda turli tadbirlarda qatnashishingiz mumkin.',
      'At a festival, you can take part in different events in whatever way you enjoy.',
      'На фестивале можно участвовать в разных мероприятиях так, как вам нравится.',
    ),
    distractors: ['한가지만', '무조건', '봐야해요'],
    tags: ['festival', 'participation'],
    difficulty: 5,
  }),

  s5u1_371_reply_builder: replyBuilder({
    npcText: '축제에 가고 싶은데 저는 무대에 올라가는 건 별로 안 좋아해요.',
    answer: '그럼 직접 참가하지 않고 음악회나 공연을 보는 것도 좋아요',
    translation: L(
      '그럼 직접 참가하지 않고 음악회나 공연을 보는 것도 좋아요.',
      'Unda bevosita qatnashmasdan konsert yoki chiqishlarni tomosha qilishingiz mumkin.',
      'Then you can enjoy a concert or performance without participating on stage yourself.',
      'Тогда можно просто посмотреть концерт или выступления, не выходя на сцену.',
    ),
    distractors: ['무조건노래해요', '축제에가지마요', '상금만받아요'],
    tags: ['festival', 'reply'],
    difficulty: 5,
  }),

  s5u1_372_verb_transform: verbTransform({
    baseWord: '참가하다',
    targetForm: '과거 · 해요체',
    answer: '참가했어요',
    options: ['참', '가', '했', '어', '요', '해', '할'],
    translation: L('참가했어요', 'qatnashdim', 'participated', 'участвовал'),
    tags: ['festival', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_373_reading_quiz: readingQuiz({
    instruction: L(
      '올해 축제에서 유진에게 가장 적합한 계획을 고르세요.',
      'Bu yilgi festivalda Yujinga eng mos reja qaysi ekanini tanlang.',
      'Choose the plan that best fits Yujin for this year’s festival.',
      'Выберите план, который лучше всего подходит Юджин на фестивале в этом году.',
    ),
    passage:
      '유진은 작년 축제에서 친구들과 음악회를 봤는데 재미있었습니다. 하지만 올해는 새로운 경험을 하고 싶고 사람들 앞에서 노래하는 것도 자신 있습니다. 학교에서는 올해 학생 노래자랑 참가자를 모집하고 있습니다.',
    options: [
      '노래자랑에 참가한다',
      '작년과 똑같이 음악회만 본다',
      '축제에 가지 않는다',
      '졸업식에 참가한다',
    ],
    answer: '노래자랑에 참가한다',
    answerTranslation: L(
      '새로운 경험과 노래라는 두 조건을 모두 만족하는 것은 노래자랑이에요.',
      'Yangi tajriba va qo‘shiq aytishning ikkala shartiga ham qo‘shiq tanlovi mos.',
      'The singing contest satisfies both her desire for a new experience and her confidence in singing.',
      'Конкурс песни соответствует и желанию нового опыта, и уверенности в пении.',
    ),
    tags: ['festival', 'judgment'],
    difficulty: 5,
  }),

  s5u1_374_listen_type: listenType({
    audioText:
      '작년에는 축제를 구경만 했지만 올해는 직접 행사에 참가할 거예요.',
    translation: L(
      '작년에는 축제를 구경만 했지만 올해는 직접 행사에 참가할 거예요.',
      'O‘tgan yil festivalni faqat tomosha qildim, bu yil esa tadbirda bevosita qatnashaman.',
      'Last year I only watched the festival, but this year I will participate in an event myself.',
      'В прошлом году я только смотрел фестиваль, а в этом году сам приму участие в мероприятии.',
    ),
    tags: ['festival', 'participation'],
  }),

  s5u1_375_sentence_builder: sentenceBuilder({
    answer: '같은 축제라도 보는 사람과 참가하는 사람의 경험은 다를 수 있어요',
    translation: L(
      '같은 축제라도 보는 사람과 참가하는 사람의 경험은 다를 수 있어요.',
      'Bir xil festivalda ham tomoshabin va ishtirokchining tajribasi farq qilishi mumkin.',
      'Even at the same festival, spectators and participants can have different experiences.',
      'Даже на одном фестивале опыт зрителя и участника может отличаться.',
    ),
    distractors: ['항상같고', '차이가', '없어요'],
    tags: ['festival', 'experience'],
    difficulty: 5,
  }),

  s5u1_376_listen_fill: listenFill({
    audioText: '작년에는 음악회를 봤고 올해는 노래자랑에 참가할 거예요.',
    sentenceTemplate: '작년에는 ___를 봤고 올해는 ___에 참가할 거예요.',
    blankAnswers: ['음악회', '노래자랑'],
    translation: L(
      '작년에는 음악회를 봤고 올해는 노래자랑에 참가할 거예요.',
      'O‘tgan yil konsert ko‘rdim, bu yil qo‘shiq tanlovida qatnashaman.',
      'Last year I watched the concert, and this year I will enter the singing contest.',
      'В прошлом году я смотрел концерт, а в этом году приму участие в конкурсе песни.',
    ),
    tags: ['festival', 'dictation'],
  }),

  s5u1_377_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '작년 학교 축제 재미있었어요?',
      },
      {
        speaker: 'user',
        text: '네. 친구들과 음악회를 봤는데 정말 재미있었어요.',
      },
      {
        speaker: 'npc',
        text: '올해도 음악회를 볼 거예요?',
      },
      {
        speaker: 'user',
        text: '올해는 노래자랑에 직접 참가해 보고 싶어요.',
      },
      {
        speaker: 'npc',
        text: '작년과는 다른 경험이 되겠네요.',
      },
    ],
    translation: L(
      '과거 축제 경험과 올해 하고 싶은 활동을 비교하는 대화예요.',
      'Dialog oldingi festival tajribasi va bu yilgi reja haqida.',
      'The dialogue compares a past festival experience with a new plan for this year.',
      'Диалог сравнивает прошлый опыт фестиваля и планы на этот год.',
    ),
    tags: ['festival', 'experience'],
    difficulty: 5,
  }),

  s5u1_378_translate_type: translateType({
    instruction: L(
      '작년 대학 축제에서는 친구들과 음악회를 보고 여러 행사를 구경했지만 올해는 새로운 경험을 위해 노래자랑에 직접 참가할 계획이라고 한국어로 입력하세요.',
      'O‘tgan yil universitet festivalida do‘stlar bilan konsert va boshqa tadbirlarni tomosha qilganingizni, bu yil esa yangi tajriba uchun qo‘shiq tanlovida bevosita qatnashishingizni koreyscha yozing.',
      'Write in Korean that last year you watched a concert and several events with friends at the university festival, but this year you plan to enter the singing contest for a new experience.',
      'Напишите по-корейски, что в прошлом году на университетском фестивале вы смотрели концерт и другие мероприятия с друзьями, а в этом году ради нового опыта собираетесь участвовать в конкурсе песни.',
    ),
    answer:
      '작년 대학 축제에서는 친구들과 음악회를 보고 여러 행사를 구경했어요. 하지만 올해는 새로운 경험을 위해 노래자랑에 직접 참가할 계획이에요.',
    translation: L(
      '작년 대학 축제에서는 친구들과 음악회를 보고 여러 행사를 구경했어요. 하지만 올해는 새로운 경험을 위해 노래자랑에 직접 참가할 계획이에요.',
      'O‘tgan yil universitet festivalida do‘stlar bilan konsert va turli tadbirlarni ko‘rdim. Bu yil esa yangi tajriba uchun qo‘shiq tanlovida o‘zim qatnashmoqchiman.',
      'Last year I watched a concert and several events with friends at the university festival. This year, however, I plan to enter the singing contest for a new experience.',
      'В прошлом году на университетском фестивале я смотрел концерт и разные мероприятия с друзьями. Но в этом году ради нового опыта собираюсь участвовать в конкурсе песни.',
    ),
    targetExpressions: ['축제', '음악회', '노래자랑', '참가'],
    tags: ['festival', 'productive'],
    difficulty: 5,
  }),

  s5u1_379_fill_in_blank: multiBlank({
    sentenceTemplate:
      '공연을 보기만 하면 ___이고, 행사에 직접 들어가 함께하면 ___하는 것이며, 여러 공연과 행사가 함께 열리는 학교 행사는 ___예요.',
    blankAnswers: ['관람', '참가', '축제'],
    distractors: ['졸업', '합격', '수강'],
    translation: L(
      '축제를 관람하는 것과 직접 참가하는 것을 구별하는 문장이에요.',
      'Festivalni tomosha qilish va bevosita qatnashish farqlanadi.',
      'The sentence distinguishes watching a festival event from participating in it.',
      'Предложение различает просмотр мероприятия и непосредственное участие.',
    ),
    tags: ['festival', 'participation'],
    difficulty: 5,
  }),

  s5u1_380_reply_builder: replyBuilder({
    npcText:
      '작년 축제는 공연만 봐서 재미있었지만 조금 아쉬웠어요. 올해는 다른 걸 해 보고 싶어요.',
    answer: '올해는 관심 있는 행사에 직접 참가해 보면 더 기억에 남을 거예요',
    translation: L(
      '올해는 관심 있는 행사에 직접 참가해 보면 더 기억에 남을 거예요.',
      'Bu yil qiziqqan tadbirda o‘zingiz qatnashsangiz ko‘proq esda qoladi.',
      'This year, participating directly in an event you like may make the festival more memorable.',
      'В этом году непосредственное участие в интересном мероприятии может сделать фестиваль более запоминающимся.',
    ),
    distractors: ['아무것도하지마요', '축제에가지마요', '공연만봐요'],
    tags: ['festival', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 5 · 만족스러운 학교생활을 만들어요
  // 381 ~ 400
  // ─────────────────────────────────────────────────────────────

  s5u1_381_reading_quiz: readingQuiz({
    instruction: L(
      '나탈리아가 학교생활에 만족하지 못하는 가장 큰 이유를 고르세요.',
      'Nataliyaning universitet hayotidan mamnun emasligining asosiy sababini tanlang.',
      'Choose the main reason Natalia is not satisfied with her campus life.',
      'Выберите главную причину, по которой Наталья недовольна университетской жизнью.',
    ),
    passageTitle: '바쁜 한 학기',
    passage:
      '나탈리아는 성적도 좋고 장학금도 받고 있습니다. 하지만 수업이 끝난 뒤 매일 늦게까지 아르바이트를 해서 친구들과 만날 시간이 거의 없습니다. 관심 있던 동아리에도 가입하지 못했고 요즘에는 학교와 일만 반복하고 있어서 학교생활이 재미없다고 느낍니다.',
    options: [
      '공부와 일 외의 활동과 사람을 만날 시간이 부족해서',
      '성적이 너무 낮아서',
      '장학금을 받지 못해서',
      '학교에 수업이 없어서',
    ],
    answer: '공부와 일 외의 활동과 사람을 만날 시간이 부족해서',
    answerTranslation: L(
      '나탈리아는 공부와 아르바이트 외에 사람을 만나거나 다른 활동을 할 시간이 부족해요.',
      'Nataliyada o‘qish va ishdan tashqari do‘stlar va boshqa faoliyatlarga vaqt yetishmaydi.',
      'Natalia lacks time for people and activities outside studying and work.',
      'Наталье не хватает времени на людей и занятия вне учёбы и работы.',
    ),
    tags: ['school-life', 'satisfaction', 'balance'],
    difficulty: 5,
  }),

  s5u1_382_word_matching: wordMatching({
    pairs: [
      { korean: '학교생활', native: 'universitet hayoti' },
      { korean: '성적', native: 'baho' },
      { korean: '학점', native: 'kredit' },
      { korean: '장학금', native: 'stipendiya' },
      { korean: '만족하다', native: 'mamnun bo‘lmoq' },
    ],
    tags: ['school-life', 'satisfaction'],
  }),

  s5u1_383_sentence_builder: sentenceBuilder({
    answer: '좋은 학교생활은 성적만으로 결정되는 것이 아니에요',
    translation: L(
      '좋은 학교생활은 성적만으로 결정되는 것이 아니에요.',
      'Yaxshi universitet hayoti faqat baholar bilan belgilanmaydi.',
      'A good campus life is not determined by grades alone.',
      'Хорошая университетская жизнь определяется не только оценками.',
    ),
    distractors: ['성적만으로', '전부결정돼요', '친구는필요없어요'],
    tags: ['school-life', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_384_error_hunt: errorHunt({
    npcText:
      '수업과 친구 관계에 만족하고 학교 활동도 즐기고 있다면 학교생활에 불만족하다고 말하는 것이 자연스러워요.',
    wrongWord: '불만족하다고',
    options: ['만족한다고', '불만족하다고', '합격한다고', '지원한다고'],
    answer: '만족한다고',
    translation: L(
      '수업과 친구 관계에 만족하고 학교 활동도 즐기고 있다면 학교생활에 만족한다고 말하는 것이 자연스러워요.',
      'Dars va do‘stlikdan mamnun bo‘lib faoliyatlardan ham zavqlansa, universitet hayotidan mamnun deyish tabiiy.',
      'If someone is happy with classes, friendships, and school activities, it is natural to say they are satisfied with campus life.',
      'Если человек доволен занятиями, отношениями и активностями, естественно сказать, что он доволен университетской жизнью.',
    ),
    hint: L(
      '앞부분의 `만족하고`, `즐기고 있다`와 의미가 이어지는 말을 고르세요.',
      'Oldingi `mamnun` va `zavqlanmoqda` ma’nosiga mos so‘zni tanlang.',
      'Choose the word that matches the earlier ideas of being satisfied and enjoying the activities.',
      'Выберите слово, которое соответствует предыдущим словам «доволен» и «наслаждается».',
    ),
    tags: ['satisfaction', 'context'],
    difficulty: 5,
  }),

  s5u1_385_fill_in_blank: multiBlank({
    sentenceTemplate:
      '공부 결과를 보여 주는 것은 ___이고, 학교에서 사람을 만나거나 여러 경험을 하는 전체 생활은 ___이며, 그 생활이 마음에 들면 ___한다고 말할 수 있어요.',
    blankAnswers: ['성적', '학교생활', '만족'],
    distractors: ['학점', '수강', '지원'],
    translation: L(
      '성적과 학교생활 전체, 만족의 관계를 구별하는 문장이에요.',
      'Gap baho, umumiy universitet hayoti va mamnunlikni farqlaydi.',
      'The sentence distinguishes grades, campus life as a whole, and satisfaction.',
      'Предложение различает оценки, университетскую жизнь в целом и удовлетворённость.',
    ),
    tags: ['school-life', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_386_audio_match: audioMatch({
    pairs: [
      { korean: '학교생활', native: 'universitet hayoti' },
      { korean: '만족하다', native: 'mamnun bo‘lmoq' },
      { korean: '자원봉사', native: 'ko‘ngilli ish' },
      { korean: '아르바이트', native: 'yarim kunlik ish' },
      { korean: '동아리', native: 'to‘garak' },
    ],
    tags: ['school-life', 'review'],
  }),

  s5u1_387_translate_builder: translateBuilder({
    instruction: L(
      '성적도 중요하지만 친구와 활동할 시간이 있어서 지금 학교생활에 만족한다고 말하세요.',
      'Baholar ham muhim, lekin do‘stlar bilan faoliyat qilishga vaqt borligi uchun universitet hayotingizdan mamnun ekaningizni ayting.',
      'Say that grades are important, but you are satisfied with campus life because you also have time for friends and activities.',
      'Скажите, что оценки важны, но вы довольны университетской жизнью, потому что у вас есть время на друзей и другие занятия.',
    ),
    answer:
      '성적도 중요하지만 친구와 활동할 시간이 있어서 지금 학교생활에 만족해요',
    translation: L(
      '성적도 중요하지만 친구와 활동할 시간이 있어서 지금 학교생활에 만족해요.',
      'Baholar ham muhim, lekin do‘stlar va faoliyat uchun vaqtim borligi sabab universitet hayotimdan mamnunman.',
      'Grades are important, but I am satisfied with my campus life because I also have time for friends and activities.',
      'Оценки важны, но я доволен университетской жизнью, потому что у меня есть время на друзей и другие занятия.',
    ),
    distractors: ['성적만', '친구없이', '불만족해요'],
    tags: ['school-life', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_388_speaking: speaking({
    npcText:
      '친구에게 지금 학교생활에 얼마나 만족하는지 이유와 함께 이야기해요.',
    answer:
      '수업도 재미있고 친구들과 동아리 활동도 할 수 있어서 학교생활에 만족해요.',
    translation: L(
      '수업도 재미있고 친구들과 동아리 활동도 할 수 있어서 학교생활에 만족해요.',
      'Darslar qiziq va do‘stlar bilan klub faoliyati ham qila olganim uchun universitet hayotimdan mamnunman.',
      'I am satisfied with campus life because my classes are interesting and I can do club activities with friends.',
      'Я доволен университетской жизнью, потому что занятия интересные и я могу участвовать в клубной деятельности с друзьями.',
    ),
    tags: ['school-life', 'satisfaction', 'speaking'],
    difficulty: 5,
  }),

  s5u1_389_cloze_passage: clozePassage({
    passage:
      '지난 학기에는 공부와 ___만 하느라 다른 활동을 거의 못 했습니다. 이번 학기에는 시간을 줄여서 ___에도 가입하고 주말에는 ___에도 참여하고 있습니다. 여러 경험을 할 수 있게 되면서 지금은 ___에 훨씬 더 만족합니다.',
    blankAnswers: ['아르바이트', '동아리', '자원봉사', '학교생활'],
    distractors: ['졸업식', '학점', '상금'],
    translation: L(
      '활동의 균형을 바꾼 뒤 학교생활 만족도가 높아진 학생의 이야기예요.',
      'Faoliyat muvozanatini o‘zgartirgandan keyin universitet hayotidan ko‘proq mamnun bo‘lgan talaba haqida.',
      'The passage describes a student whose campus-life satisfaction improved after changing the balance of activities.',
      'Текст рассказывает о студенте, который стал больше доволен университетской жизнью после изменения баланса занятий.',
    ),
    tags: ['school-life', 'balance', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_390_word_arrange: wordArrange({
    answer:
      '학교생활에 만족하려면 자신에게 중요한 것들의 균형을 찾는 것도 필요해요',
    translation: L(
      '학교생활에 만족하려면 자신에게 중요한 것들의 균형을 찾는 것도 필요해요.',
      'Universitet hayotidan mamnun bo‘lish uchun o‘zingizga muhim narsalar o‘rtasida muvozanat topish kerak.',
      'To be satisfied with campus life, you also need to find a balance among the things that matter to you.',
      'Чтобы быть довольным университетской жизнью, нужно найти баланс между важными для себя вещами.',
    ),
    distractors: ['한가지만', '무조건하면', '충분해요'],
    tags: ['school-life', 'balance'],
    difficulty: 5,
  }),

  s5u1_391_reply_builder: replyBuilder({
    npcText:
      '성적은 좋은데 학교와 아르바이트만 반복하니까 대학생활이 별로 재미없어요.',
    answer: '시간이 된다면 친구나 동아리 활동에도 조금 시간을 써 보세요',
    translation: L(
      '시간이 된다면 친구나 동아리 활동에도 조금 시간을 써 보세요.',
      'Vaqt bo‘lsa, do‘stlar yoki klub faoliyatiga ham ozroq vaqt ajratib ko‘ring.',
      'If possible, try spending some time with friends or on club activities too.',
      'Если есть возможность, попробуйте уделять немного времени друзьям или клубной деятельности.',
    ),
    distractors: ['성적을포기해요', '더일만해요', '친구를피해요'],
    tags: ['school-life', 'reply'],
    difficulty: 5,
  }),

  s5u1_392_verb_transform: verbTransform({
    baseWord: '만족하다',
    targetForm: '과거 · 해요체',
    answer: '만족했어요',
    options: ['만', '족', '했', '어', '요', '해', '할'],
    translation: L(
      '만족했어요',
      'mamnun bo‘ldim',
      'was satisfied',
      'был доволен',
    ),
    tags: ['satisfaction', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_393_reading_quiz: readingQuiz({
    instruction: L(
      '두 학생 중 학교생활 만족도가 더 높을 가능성이 큰 학생을 고르고 이유를 판단하세요.',
      'Ikki talabadan universitet hayotidan mamnunlik darajasi yuqoriroq bo‘lishi mumkin bo‘lganini tanlang.',
      'Choose the student who is more likely to be satisfied with campus life.',
      'Выберите студента, который с большей вероятностью доволен университетской жизнью.',
    ),
    passage:
      '민수는 성적은 좋지만 매일 수업과 아르바이트만 하고 친구를 만날 시간이 없어 계속 피곤하다고 합니다. 유진은 성적도 안정적이고 일주일에 한 번 동아리 활동을 하며 친구들과도 정기적으로 만납니다. 두 사람 모두 현재 경제적인 문제는 없습니다.',
    options: [
      '유진',
      '민수',
      '두 사람의 상황이 완전히 같다',
      '정보만으로 민수라고 해야 한다',
    ],
    answer: '유진',
    answerTranslation: L(
      '유진은 공부와 다른 활동의 균형이 상대적으로 잘 맞아요.',
      'Yujinda o‘qish va boshqa faoliyatlar o‘rtasidagi muvozanat yaxshiroq.',
      'Yujin has a more balanced combination of studying, activities, and relationships.',
      'У Юджин лучше сбалансированы учёба, активность и отношения.',
    ),
    hint: L(
      '성적 하나만 보지 말고 피로, 친구 관계, 활동의 균형까지 함께 보세요.',
      'Faqat bahoga emas, charchoq, do‘stlik va faoliyat muvozanatiga ham qarang.',
      'Do not consider grades alone; include fatigue, friendships, and activity balance.',
      'Учитывайте не только оценки, но и усталость, отношения и баланс занятий.',
    ),
    tags: ['school-life', 'satisfaction', 'judgment'],
    difficulty: 5,
  }),

  s5u1_394_listen_type: listenType({
    audioText:
      '공부와 다른 활동의 균형이 좋아져서 학교생활에 더 만족하게 됐어요.',
    translation: L(
      '공부와 다른 활동의 균형이 좋아져서 학교생활에 더 만족하게 됐어요.',
      'O‘qish va boshqa faoliyatlar muvozanati yaxshilangani uchun universitet hayotimdan ko‘proq mamnun bo‘ldim.',
      'I became more satisfied with campus life after finding a better balance between studying and other activities.',
      'Я стал больше доволен университетской жизнью после того, как улучшил баланс между учёбой и другими занятиями.',
    ),
    tags: ['school-life', 'satisfaction'],
  }),

  s5u1_395_sentence_builder: sentenceBuilder({
    answer: '학교생활의 만족도는 공부 친구 활동 같은 여러 요소와 관련이 있어요',
    translation: L(
      '학교생활의 만족도는 공부, 친구, 활동 같은 여러 요소와 관련이 있어요.',
      'Universitet hayotidan mamnunlik o‘qish, do‘stlar va faoliyat kabi ko‘p omillar bilan bog‘liq.',
      'Satisfaction with campus life is related to several factors, including study, friendships, and activities.',
      'Удовлетворённость университетской жизнью связана с разными факторами: учёбой, друзьями и занятиями.',
    ),
    distractors: ['성적하나와', '완전히', '같아요'],
    tags: ['school-life', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_396_listen_fill: listenFill({
    audioText: '동아리 활동을 시작한 뒤 학교생활에 더 만족하게 됐어요.',
    sentenceTemplate: '___ 활동을 시작한 뒤 ___에 더 만족하게 됐어요.',
    blankAnswers: ['동아리', '학교생활'],
    translation: L(
      '동아리 활동을 시작한 뒤 학교생활에 더 만족하게 됐어요.',
      'Klub faoliyatini boshlaganimdan keyin universitet hayotimdan ko‘proq mamnun bo‘ldim.',
      'After starting club activities, I became more satisfied with campus life.',
      'После начала клубной деятельности я стал больше доволен университетской жизнью.',
    ),
    tags: ['club', 'school-life', 'satisfaction'],
  }),

  s5u1_397_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '요즘 학교생활에는 만족해요?',
      },
      {
        speaker: 'user',
        text: '네. 지난 학기보다 훨씬 좋아졌어요.',
      },
      {
        speaker: 'npc',
        text: '뭐가 달라졌어요?',
      },
      {
        speaker: 'user',
        text: '아르바이트 시간을 줄이고 동아리 활동을 시작했어요.',
      },
      {
        speaker: 'npc',
        text: '공부하고 다른 활동의 균형이 더 좋아졌군요.',
      },
    ],
    translation: L(
      '생활의 균형을 바꾼 뒤 학교생활 만족도가 좋아진 대화예요.',
      'Hayot muvozanatini o‘zgartirgandan keyin mamnunlik oshgani haqidagi dialog.',
      'The dialogue describes improved campus-life satisfaction after changing the balance of activities.',
      'Диалог о том, как удовлетворённость университетской жизнью выросла после изменения баланса занятий.',
    ),
    tags: ['school-life', 'satisfaction'],
    difficulty: 5,
  }),

  s5u1_398_translate_type: translateType({
    instruction: L(
      '지난 학기에는 공부와 아르바이트 때문에 다른 활동을 거의 하지 못해서 학교생활에 만족하지 못했지만 이번 학기에는 아르바이트 시간을 줄이고 동아리 활동과 자원봉사를 시작해서 훨씬 만족한다고 한국어로 입력하세요.',
      'O‘tgan semestrda o‘qish va ish sabab boshqa faoliyatlarga vaqt bo‘lmagani uchun universitet hayotidan mamnun bo‘lmaganingizni, bu semestrda ish vaqtini kamaytirib klub va ko‘ngilli faoliyatni boshlaganingiz uchun ancha mamnun ekaningizni koreyscha yozing.',
      'Write in Korean that last semester you were not satisfied with campus life because studying and part-time work left no time for other activities, but this semester you reduced work hours and started club activities and volunteering, so you are much more satisfied.',
      'Напишите по-корейски, что в прошлом семестре из-за учёбы и подработки почти не было времени на другие занятия и вы были недовольны университетской жизнью, но в этом семестре сократили рабочие часы, начали клубную и волонтёрскую деятельность и стали намного более довольны.',
    ),
    answer:
      '지난 학기에는 공부와 아르바이트 때문에 다른 활동을 거의 하지 못해서 학교생활에 만족하지 못했어요. 이번 학기에는 아르바이트 시간을 줄이고 동아리 활동과 자원봉사를 시작해서 훨씬 만족해요.',
    translation: L(
      '지난 학기에는 공부와 아르바이트 때문에 다른 활동을 거의 하지 못해서 학교생활에 만족하지 못했어요. 이번 학기에는 아르바이트 시간을 줄이고 동아리 활동과 자원봉사를 시작해서 훨씬 만족해요.',
      'O‘tgan semestrda o‘qish va ish sabab boshqa faoliyatlar qila olmadim va universitet hayotidan mamnun emasdim. Bu semestrda ish vaqtini kamaytirib klub va ko‘ngillilikni boshlaganim uchun ancha mamnunman.',
      'Last semester I could barely do other activities because of studying and part-time work, so I was not satisfied with campus life. This semester I reduced my work hours and started club activities and volunteering, so I am much more satisfied.',
      'В прошлом семестре из-за учёбы и подработки я почти не занимался ничем другим и был недоволен университетской жизнью. В этом семестре я сократил рабочие часы, начал клубную и волонтёрскую деятельность и стал намного более доволен.',
    ),
    targetExpressions: [
      '아르바이트',
      '학교생활',
      '동아리 활동',
      '자원봉사',
      '만족',
    ],
    tags: ['school-life', 'satisfaction', 'productive'],
    difficulty: 5,
  }),

  s5u1_399_fill_in_blank: multiBlank({
    sentenceTemplate:
      '좋은 ___만 있다고 반드시 학교생활에 만족하는 것은 아니고, 친구 관계와 ___, 공부와 ___의 균형도 함께 생각할 수 있어요.',
    blankAnswers: ['성적', '동아리 활동', '아르바이트'],
    distractors: ['졸업식', '주차장', '강당'],
    translation: L(
      '학교생활 만족은 성적뿐 아니라 인간관계와 여러 활동의 균형에도 영향을 받을 수 있어요.',
      'Universitet hayotidan mamnunlik faqat bahoga emas, munosabat va faoliyat muvozanatiga ham bog‘liq.',
      'Campus-life satisfaction can depend on more than grades, including relationships and activity balance.',
      'Удовлетворённость университетской жизнью зависит не только от оценок, но и от отношений и баланса занятий.',
    ),
    tags: ['school-life', 'satisfaction', 'review'],
    difficulty: 5,
  }),

  s5u1_400_reply_builder: replyBuilder({
    npcText:
      '좋은 성적을 받으려고 공부만 했는데 요즘 학교생활이 너무 단조롭게 느껴져요.',
    answer:
      '공부에 지장이 없는 범위에서 친구나 관심 있는 활동에도 시간을 써 보세요',
    translation: L(
      '공부에 지장이 없는 범위에서 친구나 관심 있는 활동에도 시간을 써 보세요.',
      'O‘qishga xalaqit bermaydigan darajada do‘stlar yoki qiziqqan faoliyatlarga ham vaqt ajrating.',
      'As long as it does not interfere with your studies, try spending some time with friends or on activities you enjoy.',
      'Если это не мешает учёбе, попробуйте уделять время друзьям и интересующим занятиям.',
    ),
    distractors: ['공부를그만둬요', '아무활동도하지마요', '성적을버려요'],
    tags: ['school-life', 'balance', 'reply'],
    difficulty: 5,
  }),
  // ═══════════════════════════════════════════════════════════
  // NODE 5 · 인터뷰 · 친구 소개 · 한국의 호칭
  // 401 ~ 500
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────
  // Lesson 1 · 친구를 인터뷰해요
  // 401 ~ 420
  // ─────────────────────────────────────────────────────────────

  s5u1_401_reading_quiz: readingQuiz({
    instruction: L(
      '인터뷰를 하는 학생이 다음에 해야 할 행동으로 가장 알맞은 것을 고르세요.',
      'Intervyu qilayotgan talabaning keyingi qilishi kerak bo‘lgan ishini tanlang.',
      'Choose the most appropriate next step for the student conducting the interview.',
      'Выберите наиболее подходящее следующее действие студента, проводящего интервью.',
    ),
    passage:
      '지민은 같은 반 친구를 소개하는 발표를 준비하고 있습니다. 친구의 전공과 학교생활에 대해서는 이미 알고 있지만 왜 그 전공을 선택했는지, 어떤 동아리 활동을 하는지, 앞으로 무엇을 해 보고 싶은지는 아직 모릅니다. 지민은 자신의 생각으로 내용을 채우지 않고 친구에게 직접 확인하려고 합니다.',
    options: [
      '모르는 내용을 친구에게 질문한다',
      '친구의 대답을 예상해서 쓴다',
      '확인하지 않은 정보를 발표에 넣는다',
      '이미 아는 내용만 반복해서 발표한다',
    ],
    answer: '모르는 내용을 친구에게 질문한다',
    answerTranslation: L(
      '모르는 정보는 인터뷰에서 직접 질문해서 확인해야 해요.',
      'Bilmagan maʼlumotni intervyuda bevosita savol berib aniqlash kerak.',
      'Unknown information should be confirmed by asking the friend directly.',
      'Неизвестную информацию нужно уточнить, задав вопрос самому другу.',
    ),
    tags: ['interview', 'question', 'information'],
    difficulty: 5,
  }),

  s5u1_402_word_matching: wordMatching({
    pairs: [
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '질문', native: 'savol' },
      { korean: '대답', native: 'javob' },
      { korean: '전공', native: 'mutaxassislik' },
      { korean: '관심', native: 'qiziqish' },
    ],
    tags: ['interview', 'information'],
  }),

  s5u1_403_sentence_builder: sentenceBuilder({
    answer: '친구를 정확하게 소개하려면 먼저 필요한 정보를 직접 물어봐야 해요',
    translation: L(
      '친구를 정확하게 소개하려면 먼저 필요한 정보를 직접 물어봐야 해요.',
      'Do‘stni aniq tanishtirish uchun avval kerakli maʼlumotni bevosita so‘rash kerak.',
      'To introduce a friend accurately, you should first ask for the necessary information directly.',
      'Чтобы точно представить друга, сначала нужно напрямую спросить необходимую информацию.',
    ),
    distractors: ['추측하면', '숨기면', '대충'],
    tags: ['interview', 'friend-introduction'],
    difficulty: 5,
  }),

  s5u1_404_error_hunt: errorHunt({
    npcText:
      '친구의 정보를 정확하게 소개하려면 인터뷰에서 들은 내용을 마음대로 바꾸는 것이 좋아요.',
    wrongWord: '바꾸는',
    options: ['정리하는', '바꾸는', '지우는', '숨기는'],
    answer: '정리하는',
    translation: L(
      '친구의 정보를 정확하게 소개하려면 인터뷰에서 들은 내용을 잘 정리하는 것이 좋아요.',
      'Do‘st haqidagi maʼlumotni aniq tanishtirish uchun intervyuda eshitganlarni yaxshi tartibga solish kerak.',
      'To introduce a friend accurately, it is good to organize what you heard in the interview.',
      'Чтобы точно представить друга, полезно хорошо упорядочить информацию из интервью.',
    ),
    hint: L(
      '소개할 정보는 사실과 다르게 고치는 것이 아니라 핵심을 정리해야 해요.',
      'Maʼlumotni o‘zgartirish emas, asosiy fikrlarni tartibga solish kerak.',
      'You should organize the key information rather than change the facts.',
      'Нужно упорядочить ключевую информацию, а не менять факты.',
    ),
    tags: ['interview', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_405_fill_in_blank: multiBlank({
    sentenceTemplate:
      '인터뷰를 할 때는 먼저 알고 싶은 내용을 ___으로 준비하고, 상대의 ___을 잘 들은 뒤 중요한 정보를 메모해요.',
    blankAnswers: ['질문', '대답'],
    distractors: ['호칭', '축제', '학점'],
    translation: L(
      '인터뷰에서는 질문을 준비하고 상대의 대답을 잘 들어야 해요.',
      'Intervyuda savollarni tayyorlab, suhbatdoshning javoblarini yaxshi tinglash kerak.',
      'In an interview, prepare questions and listen carefully to the answers.',
      'На интервью нужно подготовить вопросы и внимательно слушать ответы.',
    ),
    tags: ['interview', 'question', 'answer'],
    difficulty: 5,
  }),

  s5u1_406_audio_match: audioMatch({
    pairs: [
      { korean: '질문', native: 'savol' },
      { korean: '대답', native: 'javob' },
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '소개', native: 'tanishtirish' },
      { korean: '전공', native: 'mutaxassislik' },
    ],
    tags: ['interview', 'listening'],
  }),

  s5u1_407_translate_builder: translateBuilder({
    instruction: L(
      '친구의 전공과 학교생활에 대해 몇 가지 질문하고 싶다고 말하세요.',
      'Do‘stingizning mutaxassisligi va universitet hayoti haqida bir nechta savol bermoqchi ekaningizni ayting.',
      'Say that you would like to ask a few questions about your friend’s major and campus life.',
      'Скажите, что хотите задать несколько вопросов о специальности и университетской жизни друга.',
    ),
    answer: '친구의 전공과 학교생활에 대해 몇 가지 질문하고 싶어요',
    translation: L(
      '친구의 전공과 학교생활에 대해 몇 가지 질문하고 싶어요.',
      'Do‘stimning mutaxassisligi va universitet hayoti haqida bir nechta savol bermoqchiman.',
      'I would like to ask a few questions about my friend’s major and campus life.',
      'Я хочу задать несколько вопросов о специальности и университетской жизни моего друга.',
    ),
    distractors: ['대신', '아무거나', '추측해요'],
    tags: ['interview', 'question'],
    difficulty: 5,
  }),

  s5u1_408_speaking: speaking({
    npcText:
      '친구 소개 발표를 준비하기 위해 상대에게 인터뷰를 시작하려고 해요.',
    answer:
      '친구 소개를 준비하고 있는데 전공과 학교생활에 대해 몇 가지 질문해도 될까요?',
    translation: L(
      '친구 소개를 준비하고 있는데 전공과 학교생활에 대해 몇 가지 질문해도 될까요?',
      'Do‘stni tanishtirishga tayyorlanyapman. Mutaxassislik va universitet hayoti haqida bir nechta savol bersam bo‘ladimi?',
      'I am preparing an introduction about you. May I ask a few questions about your major and campus life?',
      'Я готовлю рассказ о тебе. Можно задать несколько вопросов о специальности и университетской жизни?',
    ),
    tags: ['interview', 'speaking'],
    difficulty: 5,
  }),

  s5u1_409_cloze_passage: clozePassage({
    passage:
      '친구 소개 발표를 준비하면서 먼저 친구와 ___를 했습니다. 미리 준비한 ___을 하나씩 물어보고 친구의 ___을 메모했습니다. 발표할 때는 제가 생각한 내용을 추가하지 않고 인터뷰에서 확인한 ___만 사용했습니다.',
    blankAnswers: ['인터뷰', '질문', '대답', '정보'],
    distractors: ['호칭', '상금', '학점'],
    translation: L(
      '인터뷰에서 질문하고 대답을 기록한 뒤 확인된 정보로 친구를 소개하는 과정이에요.',
      'Intervyuda savol berib, javoblarni yozib, tasdiqlangan maʼlumot bilan do‘stni tanishtirish jarayoni.',
      'The passage describes asking questions, recording answers, and using confirmed information to introduce a friend.',
      'Текст описывает интервью, запись ответов и использование подтверждённой информации для представления друга.',
    ),
    tags: ['interview', 'information'],
    difficulty: 5,
  }),

  s5u1_410_word_arrange: wordArrange({
    answer:
      '좋은 인터뷰를 하려면 질문하는 것만큼 상대의 대답을 잘 듣는 것도 중요해요',
    translation: L(
      '좋은 인터뷰를 하려면 질문하는 것만큼 상대의 대답을 잘 듣는 것도 중요해요.',
      'Yaxshi intervyu uchun savol berish qanchalik muhim bo‘lsa, javobni yaxshi tinglash ham shunchalik muhim.',
      'A good interview requires listening to the answers just as much as asking good questions.',
      'Для хорошего интервью важно не только задавать вопросы, но и внимательно слушать ответы.',
    ),
    distractors: ['무시하고', '혼자', '말해요'],
    tags: ['interview', 'listening'],
    difficulty: 5,
  }),

  s5u1_411_reply_builder: replyBuilder({
    npcText:
      '친구를 소개해야 하는데 전공밖에 몰라서 무슨 말을 해야 할지 모르겠어요.',
    answer: '학교생활이나 관심 있는 활동도 직접 인터뷰해서 물어보세요',
    translation: L(
      '학교생활이나 관심 있는 활동도 직접 인터뷰해서 물어보세요.',
      'Universitet hayoti va qiziqadigan faoliyatlari haqida ham intervyuda so‘rab ko‘ring.',
      'Interview your friend about campus life and activities they are interested in as well.',
      'Спросите друга на интервью также об университетской жизни и интересующих его занятиях.',
    ),
    distractors: ['그냥추측해요', '전공만말해요', '아무말해요'],
    tags: ['interview', 'reply'],
    difficulty: 5,
  }),

  s5u1_412_verb_transform: verbTransform({
    baseWord: '소개하다',
    targetForm: '현재 · 해요체',
    answer: '소개해요',
    options: ['소', '개', '해', '요', '했', '할'],
    translation: L('소개해요', 'tanishtiraman', 'introduce', 'представляю'),
    tags: ['friend-introduction', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_413_reading_quiz: readingQuiz({
    instruction: L(
      '인터뷰 내용 중 발표에 사용하면 안 되는 정보를 고르세요.',
      'Intervyu asosida taqdimotda ishlatmaslik kerak bo‘lgan maʼlumotni tanlang.',
      'Choose the information that should not be used in the presentation.',
      'Выберите информацию, которую не следует использовать в презентации.',
    ),
    passage:
      '마리나는 친구에게 “왜 한국어를 공부해요?”라고 물었습니다. 친구는 한국 회사에 취직하고 싶어서 공부한다고 대답했습니다. 마리나는 친구가 일본 문화도 좋아할 것 같다고 생각했지만 그 내용은 직접 묻지 않았습니다.',
    options: [
      '친구가 일본 문화를 좋아한다',
      '친구가 한국어를 공부한다',
      '친구가 한국 회사에 취직하고 싶어 한다',
      '취업이 한국어 공부의 한 이유이다',
    ],
    answer: '친구가 일본 문화를 좋아한다',
    answerTranslation: L(
      '직접 질문해서 확인하지 않은 내용은 사실처럼 소개하면 안 돼요.',
      'Bevosita so‘rab tasdiqlanmagan maʼlumotni fakt sifatida aytmaslik kerak.',
      'Information that was never confirmed should not be presented as fact.',
      'Непроверенную информацию нельзя представлять как факт.',
    ),
    tags: ['interview', 'information-accuracy'],
    difficulty: 5,
  }),

  s5u1_414_listen_type: listenType({
    audioText:
      '인터뷰에서 친구의 대답을 들으면서 중요한 내용을 간단하게 메모했어요.',
    translation: L(
      '인터뷰에서 친구의 대답을 들으면서 중요한 내용을 간단하게 메모했어요.',
      'Intervyuda do‘stimning javoblarini tinglab, muhim maʼlumotlarni qisqacha yozdim.',
      'During the interview, I briefly noted the important points while listening to my friend.',
      'Во время интервью я кратко записывал важные моменты, слушая ответы друга.',
    ),
    tags: ['interview', 'listening'],
  }),

  s5u1_415_sentence_builder: sentenceBuilder({
    answer:
      '확인하지 않은 내용을 사실처럼 소개하면 친구의 정보를 잘못 전달할 수 있어요',
    translation: L(
      '확인하지 않은 내용을 사실처럼 소개하면 친구의 정보를 잘못 전달할 수 있어요.',
      'Tasdiqlanmagan maʼlumotni fakt kabi aytsangiz, do‘st haqidagi maʼlumotni noto‘g‘ri yetkazishingiz mumkin.',
      'If you present unconfirmed information as fact, you may misrepresent your friend.',
      'Если представить непроверенную информацию как факт, можно неверно рассказать о друге.',
    ),
    distractors: ['정확하게', '확인해서', '전달해요'],
    tags: ['interview', 'accuracy'],
    difficulty: 5,
  }),

  s5u1_416_listen_fill: listenFill({
    audioText: '친구에게 질문하고 대답을 들으면서 중요한 정보를 메모했어요.',
    sentenceTemplate:
      '친구에게 ___하고 ___을 들으면서 중요한 정보를 메모했어요.',
    blankAnswers: ['질문', '대답'],
    translation: L(
      '친구에게 질문하고 대답을 들으면서 중요한 정보를 메모했어요.',
      'Do‘stimga savol berib, javobini tinglab muhim maʼlumotlarni yozdim.',
      'I asked my friend questions and noted important information while listening to the answers.',
      'Я задавал другу вопросы и записывал важную информацию, слушая ответы.',
    ),
    tags: ['interview', 'dictation'],
  }),

  s5u1_417_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '친구 소개 발표 때문에 인터뷰해도 괜찮아요?',
      },
      {
        speaker: 'user',
        text: '네, 괜찮아요. 어떤 게 궁금해요?',
      },
      {
        speaker: 'npc',
        text: '먼저 지금 전공을 선택한 이유가 궁금해요.',
      },
      {
        speaker: 'user',
        text: '경제 문제에 관심이 많아서 경제학을 선택했어요.',
      },
      {
        speaker: 'npc',
        text: '알겠어요. 그 내용도 소개할 때 넣을게요.',
      },
    ],
    translation: L(
      '인터뷰 허락을 받고 질문한 뒤 대답을 확인하는 순서예요.',
      'Intervyuga ruxsat olish, savol berish va javobni tasdiqlash ketma-ketligi.',
      'The dialogue moves from requesting permission to asking a question and confirming the answer.',
      'Диалог идёт от просьбы об интервью к вопросу и подтверждению ответа.',
    ),
    tags: ['interview', 'dialog-order'],
    difficulty: 5,
  }),

  s5u1_418_translate_type: translateType({
    instruction: L(
      '친구 소개 발표를 준비하기 위해 먼저 친구를 인터뷰했고, 전공을 선택한 이유와 학교생활에서 중요하게 생각하는 활동을 질문한 뒤 대답을 메모했다고 한국어로 입력하세요.',
      'Do‘stingizni tanishtirish uchun avval intervyu qilganingizni, mutaxassislik tanlash sababi va universitet hayotida muhim faoliyatlar haqida so‘rab javoblarni yozganingizni koreyscha yozing.',
      'Write in Korean that you interviewed your friend for an introduction presentation, asked why they chose their major and which campus activities they value, and noted the answers.',
      'Напишите по-корейски, что для представления друга вы провели интервью, спросили о причине выбора специальности и важных занятиях в университете и записали ответы.',
    ),
    answer:
      '친구 소개 발표를 준비하려고 먼저 친구를 인터뷰했어요. 전공을 선택한 이유와 학교생활에서 중요하게 생각하는 활동을 질문하고 대답을 메모했어요.',
    translation: L(
      '친구 소개 발표를 준비하려고 먼저 친구를 인터뷰했어요. 전공을 선택한 이유와 학교생활에서 중요하게 생각하는 활동을 질문하고 대답을 메모했어요.',
      'Do‘stni tanishtirish taqdimoti uchun avval intervyu qildim. Mutaxassislikni tanlash sababi va universitetdagi muhim faoliyatlar haqida so‘rab, javoblarni yozdim.',
      'I first interviewed my friend to prepare an introduction presentation. I asked why they chose their major and which campus activities they considered important, and I noted the answers.',
      'Сначала я провёл интервью с другом для презентации. Я спросил о причине выбора специальности и важных университетских занятиях и записал ответы.',
    ),
    targetExpressions: ['인터뷰', '질문', '대답'],
    tags: ['interview', 'productive'],
    difficulty: 5,
  }),

  s5u1_419_fill_in_blank: multiBlank({
    sentenceTemplate:
      '친구에게 직접 물어보는 말은 ___이고, 그 질문에 친구가 하는 말은 ___이며, 이런 과정을 통해 정보를 얻는 활동을 ___라고 할 수 있어요.',
    blankAnswers: ['질문', '대답', '인터뷰'],
    distractors: ['호칭', '학점', '축제'],
    translation: L(
      '질문, 대답, 인터뷰의 관계를 구별해요.',
      'Savol, javob va intervyu o‘rtasidagi farqni aniqlaydi.',
      'This distinguishes a question, an answer, and the overall interview.',
      'Задание различает вопрос, ответ и интервью в целом.',
    ),
    tags: ['interview', 'review'],
    difficulty: 5,
  }),

  s5u1_420_reply_builder: replyBuilder({
    npcText:
      '인터뷰하면서 대답을 다 기억할 수 있을 것 같아서 아무것도 안 적었는데 벌써 몇 가지가 헷갈려요.',
    answer: '중요한 대답은 짧게라도 메모해 두는 게 좋겠어요',
    translation: L(
      '중요한 대답은 짧게라도 메모해 두는 게 좋겠어요.',
      'Muhim javoblarni hech bo‘lmasa qisqacha yozib qo‘ygan yaxshi.',
      'It would be better to make at least brief notes of the important answers.',
      'Лучше хотя бы кратко записывать важные ответы.',
    ),
    distractors: ['그냥추측해요', '전부잊어요', '질문을없애요'],
    tags: ['interview', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 2 · 인터뷰 정보를 정리해요
  // 421 ~ 440
  // ─────────────────────────────────────────────────────────────

  s5u1_421_reading_quiz: readingQuiz({
    instruction: L(
      '친구 소개에서 가장 먼저 고쳐야 할 문제를 고르세요.',
      'Do‘stni tanishtirish matnida birinchi navbatda tuzatilishi kerak bo‘lgan muammoni tanlang.',
      'Choose the problem that should be corrected first in the introduction.',
      'Выберите проблему, которую прежде всего нужно исправить в представлении друга.',
    ),
    passage:
      '인터뷰에서 사라는 “환경 문제에 관심이 많아서 환경공학을 전공해요. 주말에는 자원봉사를 해요.”라고 대답했습니다. 그런데 친구가 발표문에 “사라는 취업이 잘 될 것 같아서 환경공학을 전공하고 주말마다 아르바이트를 합니다.”라고 썼습니다.',
    options: [
      '인터뷰와 다른 내용을 사실처럼 썼다',
      '친구의 이름을 한 번 사용했다',
      '두 문장으로 내용을 정리했다',
      '전공과 활동을 함께 소개했다',
    ],
    answer: '인터뷰와 다른 내용을 사실처럼 썼다',
    answerTranslation: L(
      '소개 내용은 인터뷰에서 확인한 정보와 일치해야 해요.',
      'Tanishtirishdagi maʼlumot intervyuda tasdiqlangan maʼlumot bilan mos bo‘lishi kerak.',
      'The introduction should match the information confirmed in the interview.',
      'Информация в представлении должна соответствовать тому, что было подтверждено на интервью.',
    ),
    tags: ['interview', 'information-accuracy'],
    difficulty: 5,
  }),

  s5u1_422_word_matching: wordMatching({
    pairs: [
      { korean: '질문', native: 'savol' },
      { korean: '대답', native: 'javob' },
      { korean: '소개', native: 'tanishtirish' },
      { korean: '정보', native: 'maʼlumot' },
      { korean: '관심', native: 'qiziqish' },
    ],
    tags: ['information', 'interview'],
  }),

  s5u1_423_sentence_builder: sentenceBuilder({
    answer:
      '인터뷰 내용을 정리할 때는 사실과 자신의 추측을 분명하게 구별해야 해요',
    translation: L(
      '인터뷰 내용을 정리할 때는 사실과 자신의 추측을 분명하게 구별해야 해요.',
      'Intervyu maʼlumotini tartibga solganda fakt va o‘z taxminingizni aniq farqlash kerak.',
      'When organizing interview information, clearly distinguish facts from your own assumptions.',
      'При обработке интервью нужно чётко отделять факты от собственных предположений.',
    ),
    distractors: ['섞어서', '마음대로', '바꿔요'],
    tags: ['interview', 'accuracy'],
    difficulty: 5,
  }),

  s5u1_424_error_hunt: errorHunt({
    npcText:
      '인터뷰에서 확인하지 않은 정보를 친구의 실제 대답이라고 소개해도 정확해요.',
    wrongWord: '정확해요.',
    options: ['부정확해요.', '정확해요.', '간단해요.', '유명해요.'],
    answer: '부정확해요.',
    translation: L(
      '인터뷰에서 확인하지 않은 정보를 친구의 실제 대답이라고 소개하면 부정확해요.',
      'Intervyuda tasdiqlanmagan maʼlumotni do‘stning haqiqiy javobi sifatida aytish noto‘g‘ri.',
      'Presenting unconfirmed information as the friend’s actual answer is inaccurate.',
      'Представлять непроверенную информацию как настоящий ответ друга — неточно.',
    ),
    hint: L(
      '`wrongWord`에는 문장부호까지 포함된 한 어절 전체가 들어가야 해요. 의미도 앞 문장과 맞는지 보세요.',
      'Tasdiqlanmagan maʼlumot aniq bo‘lishi mumkin emas.',
      'Unconfirmed information cannot be described as accurate.',
      'Непроверенную информацию нельзя считать точной.',
    ),
    tags: ['interview', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_425_fill_in_blank: multiBlank({
    sentenceTemplate:
      '친구가 실제로 말한 내용은 ___로 정리하고, 내가 예상했을 뿐 확인하지 않은 내용은 ___에서 빼는 것이 좋아요.',
    blankAnswers: ['정보', '소개'],
    distractors: ['호칭', '축제', '장학금'],
    translation: L(
      '확인된 정보와 추측을 구별해서 소개해야 해요.',
      'Tasdiqlangan maʼlumot va taxminni farqlab tanishtirish kerak.',
      'Confirmed information should be separated from assumptions.',
      'Подтверждённую информацию нужно отделять от предположений.',
    ),
    tags: ['information', 'friend-introduction'],
    difficulty: 5,
  }),

  s5u1_426_audio_match: audioMatch({
    pairs: [
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '질문', native: 'savol' },
      { korean: '대답', native: 'javob' },
      { korean: '정보', native: 'maʼlumot' },
      { korean: '소개', native: 'tanishtirish' },
    ],
    tags: ['interview', 'listening'],
  }),

  s5u1_427_translate_builder: translateBuilder({
    instruction: L(
      '친구가 직접 말한 내용과 내가 추측한 내용을 구별해서 정리해야 한다고 말하세요.',
      'Do‘stning o‘zi aytgan maʼlumot bilan o‘z taxminingizni ajratib tartibga solish kerakligini ayting.',
      'Say that you need to separate what your friend actually said from what you merely assumed.',
      'Скажите, что нужно отделить то, что друг действительно сказал, от собственных предположений.',
    ),
    answer: '친구가 직접 말한 내용과 제가 추측한 내용을 구별해서 정리해야 해요',
    translation: L(
      '친구가 직접 말한 내용과 제가 추측한 내용을 구별해서 정리해야 해요.',
      'Do‘stimning o‘zi aytgan gap bilan men taxmin qilgan narsani ajratib tartibga solishim kerak.',
      'I need to organize the information by distinguishing what my friend actually said from what I assumed.',
      'Мне нужно отделить то, что друг действительно сказал, от того, что я предположил.',
    ),
    distractors: ['섞어서', '마음대로', '바꿔야해요'],
    tags: ['information', 'interview'],
    difficulty: 5,
  }),

  s5u1_428_speaking: speaking({
    npcText: '인터뷰 메모를 보면서 어떤 내용을 발표에 넣을지 설명하고 있어요.',
    answer:
      '친구가 직접 대답한 내용 중에서 전공과 학교생활에 관련된 정보를 중심으로 정리할 거예요.',
    translation: L(
      '친구가 직접 대답한 내용 중에서 전공과 학교생활에 관련된 정보를 중심으로 정리할 거예요.',
      'Do‘stimning bevosita javoblaridan mutaxassislik va universitet hayotiga oid maʼlumotlarni asosiy qilib tartibga solaman.',
      'I will organize the presentation around the information my friend gave about their major and campus life.',
      'Я построю рассказ вокруг информации о специальности и университетской жизни, которую друг сообщил сам.',
    ),
    tags: ['interview', 'speaking'],
    difficulty: 5,
  }),

  s5u1_429_cloze_passage: clozePassage({
    passage:
      '인터뷰가 끝난 뒤 메모를 다시 읽었습니다. 친구가 한 ___과 그에 대한 ___을 연결해서 정리하고, 비슷한 내용은 한곳에 모았습니다. 그리고 직접 확인하지 않은 ___는 발표문에서 제외했습니다. 이렇게 정리하니 친구를 더 ___하게 소개할 수 있었습니다.',
    blankAnswers: ['질문', '대답', '정보', '정확'],
    distractors: ['호칭', '축제', '대충'],
    translation: L(
      '질문과 대답을 연결하고 확인되지 않은 정보를 제외해 정확한 소개를 만드는 과정이에요.',
      'Savol va javoblarni bog‘lab, tasdiqlanmagan maʼlumotni olib tashlab aniq tanishtirish tayyorlanadi.',
      'The passage describes linking questions to answers and removing unconfirmed information.',
      'Текст описывает сопоставление вопросов с ответами и удаление непроверенной информации.',
    ),
    tags: ['interview', 'organizing-information'],
    difficulty: 5,
  }),

  s5u1_430_word_arrange: wordArrange({
    answer:
      '인터뷰 메모는 질문과 대답의 관계가 보이도록 정리하면 다시 확인하기 쉬워요',
    translation: L(
      '인터뷰 메모는 질문과 대답의 관계가 보이도록 정리하면 다시 확인하기 쉬워요.',
      'Intervyu yozuvlarini savol va javob bog‘lanishi ko‘rinadigan qilib tartiblash qayta tekshirishni osonlashtiradi.',
      'Interview notes are easier to review when the relationship between each question and answer is clear.',
      'Заметки интервью легче проверять, если видно, какой ответ относится к какому вопросу.',
    ),
    distractors: ['섞어두면', '전부', '지워요'],
    tags: ['interview', 'notes'],
    difficulty: 5,
  }),

  s5u1_431_reply_builder: replyBuilder({
    npcText:
      '인터뷰 메모가 너무 길어서 발표할 때 전부 말하면 시간이 부족할 것 같아요.',
    answer: '발표 목적에 필요한 핵심 정보부터 골라서 정리하는 게 좋겠어요',
    translation: L(
      '발표 목적에 필요한 핵심 정보부터 골라서 정리하는 게 좋겠어요.',
      'Taqdimot maqsadiga kerak bo‘lgan asosiy maʼlumotlarni avval tanlab tartiblash yaxshi.',
      'Choose and organize the key information that is relevant to the purpose of the presentation.',
      'Лучше выбрать и упорядочить прежде всего ключевую информацию, нужную для презентации.',
    ),
    distractors: ['전부읽어요', '대답을지워요', '새로만들어요'],
    tags: ['interview', 'reply'],
    difficulty: 5,
  }),

  s5u1_432_verb_transform: verbTransform({
    baseWord: '소개하다',
    targetForm: '과거 · 해요체',
    answer: '소개했어요',
    options: ['소', '개', '했', '어', '요', '해', '할'],
    translation: L('소개했어요', 'tanishtirdim', 'introduced', 'представил'),
    tags: ['friend-introduction', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_433_reading_quiz: readingQuiz({
    instruction: L(
      '발표에 넣을 내용으로 가장 적절한 것을 고르세요.',
      'Taqdimotga kiritish uchun eng mos maʼlumotni tanlang.',
      'Choose the information that is most appropriate for the presentation.',
      'Выберите информацию, наиболее подходящую для презентации.',
    ),
    passage:
      '친구 소개의 주제는 “학교생활”입니다. 인터뷰 메모에는 ① 전공은 경영학이다. ② 사진 동아리에서 활동한다. ③ 학교 근처에서 가장 좋아하는 음식은 김치찌개다. ④ 이번 학기에는 전공 공부와 동아리 활동의 균형을 중요하게 생각한다는 내용이 있습니다.',
    options: [
      '전공과 동아리 활동, 이번 학기의 학교생활 목표',
      '좋아하는 음식 하나만',
      '인터뷰와 관계없는 자신의 취미',
      '친구가 말하지 않은 미래 계획',
    ],
    answer: '전공과 동아리 활동, 이번 학기의 학교생활 목표',
    answerTranslation: L(
      '발표 주제인 학교생활과 직접 관련된 핵심 정보를 선택해야 해요.',
      'Universitet hayoti mavzusiga bevosita tegishli asosiy maʼlumotlarni tanlash kerak.',
      'Choose information directly related to the presentation topic of campus life.',
      'Нужно выбрать ключевую информацию, непосредственно связанную с темой университетской жизни.',
    ),
    tags: ['interview', 'information-selection'],
    difficulty: 5,
  }),

  s5u1_434_listen_type: listenType({
    audioText:
      '인터뷰 내용이 많아서 발표 주제와 직접 관련된 정보만 골라서 정리했어요.',
    translation: L(
      '인터뷰 내용이 많아서 발표 주제와 직접 관련된 정보만 골라서 정리했어요.',
      'Intervyu maʼlumoti ko‘p bo‘lgani uchun faqat taqdimot mavzusiga bevosita tegishli maʼlumotlarni tanladim.',
      'There was a lot of interview information, so I selected only what directly related to the presentation topic.',
      'Информации было много, поэтому я выбрал только то, что напрямую относится к теме презентации.',
    ),
    tags: ['interview', 'information'],
  }),

  s5u1_435_sentence_builder: sentenceBuilder({
    answer:
      '모든 대답을 그대로 나열하기보다 관련 있는 내용을 묶어서 소개하는 것이 자연스러워요',
    translation: L(
      '모든 대답을 그대로 나열하기보다 관련 있는 내용을 묶어서 소개하는 것이 자연스러워요.',
      'Barcha javoblarni ketma-ket sanashdan ko‘ra, bog‘liq maʼlumotlarni birga tanishtirish tabiiyroq.',
      'It is more natural to group related information than to list every answer one by one.',
      'Естественнее объединять связанную информацию, чем перечислять все ответы подряд.',
    ),
    distractors: ['무작위로', '섞어서', '말해요'],
    tags: ['friend-introduction', 'organization'],
    difficulty: 5,
  }),

  s5u1_436_listen_fill: listenFill({
    audioText:
      '인터뷰에서 확인한 정보를 주제별로 나누어 발표 내용을 정리했어요.',
    sentenceTemplate:
      '___에서 확인한 ___를 주제별로 나누어 발표 내용을 정리했어요.',
    blankAnswers: ['인터뷰', '정보'],
    translation: L(
      '인터뷰에서 확인한 정보를 주제별로 나누어 발표 내용을 정리했어요.',
      'Intervyuda tasdiqlangan maʼlumotlarni mavzu bo‘yicha ajratib taqdimotni tayyorladim.',
      'I organized the presentation by grouping confirmed interview information by topic.',
      'Я организовал презентацию, распределив подтверждённую информацию интервью по темам.',
    ),
    tags: ['interview', 'information'],
  }),

  s5u1_437_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '인터뷰 메모 정리 다 했어요?',
      },
      {
        speaker: 'user',
        text: '아직이요. 내용이 너무 많아서 뭘 넣어야 할지 모르겠어요.',
      },
      {
        speaker: 'npc',
        text: '발표 주제가 학교생활이면 관련된 정보부터 골라 보세요.',
      },
      {
        speaker: 'user',
        text: '그럼 전공, 동아리 활동, 이번 학기 목표를 중심으로 정리할게요.',
      },
      {
        speaker: 'npc',
        text: '좋아요. 그러면 소개 내용도 훨씬 자연스럽게 연결될 거예요.',
      },
    ],
    translation: L(
      '많은 인터뷰 정보에서 발표 주제에 맞는 핵심을 고르는 대화예요.',
      'Ko‘p intervyu maʼlumotidan taqdimot mavzusiga mos asosiy maʼlumotni tanlash haqida dialog.',
      'The dialogue is about selecting relevant information from a large set of interview notes.',
      'Диалог о выборе нужной информации из большого объёма заметок интервью.',
    ),
    tags: ['interview', 'dialog-order'],
    difficulty: 5,
  }),

  s5u1_438_translate_type: translateType({
    instruction: L(
      '인터뷰에서 들은 내용을 전부 나열하지 않고 발표 주제와 관련된 대답을 골라 전공, 학교 활동, 앞으로의 계획 순서로 정리했다고 한국어로 입력하세요.',
      'Intervyudagi barcha javobni sanamasdan, mavzuga mos maʼlumotlarni tanlab mutaxassislik, universitet faoliyati va kelajak rejalari tartibida joylashtirganingizni koreyscha yozing.',
      'Write in Korean that instead of listing every interview answer, you selected relevant responses and organized them by major, campus activities, and future plans.',
      'Напишите по-корейски, что вы не перечисляли все ответы, а выбрали относящиеся к теме и организовали их по специальности, университетской деятельности и будущим планам.',
    ),
    answer:
      '인터뷰에서 들은 내용을 전부 나열하지 않고 발표 주제와 관련된 대답을 골랐어요. 그리고 전공, 학교 활동, 앞으로의 계획 순서로 정리했어요.',
    translation: L(
      '인터뷰에서 들은 내용을 전부 나열하지 않고 발표 주제와 관련된 대답을 골랐어요. 그리고 전공, 학교 활동, 앞으로의 계획 순서로 정리했어요.',
      'Intervyudagi barcha gaplarni sanamadim. Taqdimot mavzusiga mos javoblarni tanlab, mutaxassislik, universitet faoliyati va kelajak rejasi tartibida joylashtirdim.',
      'I did not list everything from the interview. I selected answers related to the presentation topic and organized them by major, campus activities, and future plans.',
      'Я не перечислял всё интервью, а выбрал ответы по теме и расположил их в порядке: специальность, университетская деятельность и будущие планы.',
    ),
    targetExpressions: ['인터뷰', '대답', '정리'],
    tags: ['interview', 'productive'],
    difficulty: 5,
  }),

  s5u1_439_fill_in_blank: multiBlank({
    sentenceTemplate:
      '인터뷰에서 얻은 내용이 많을 때는 발표의 ___에 맞는 ___를 먼저 고르고, 서로 관련 있는 내용을 함께 ___하면 이해하기 쉬워요.',
    blankAnswers: ['주제', '정보', '정리'],
    distractors: ['호칭', '상금', '추측'],
    translation: L(
      '발표 주제에 맞는 정보를 골라 관련 내용끼리 정리해야 해요.',
      'Taqdimot mavzusiga mos maʼlumot tanlanib, o‘zaro bog‘liq maʼlumotlar birga tartiblanadi.',
      'Select information relevant to the topic and group related points together.',
      'Нужно выбрать информацию по теме и сгруппировать связанные пункты.',
    ),
    tags: ['interview', 'organization'],
    difficulty: 5,
  }),

  s5u1_440_reply_builder: replyBuilder({
    npcText:
      '친구가 인터뷰에서 열 가지 넘게 대답했는데 발표 시간은 1분밖에 없어요.',
    answer: '발표 주제와 가장 관련 있는 대답만 골라 핵심을 소개하세요',
    translation: L(
      '발표 주제와 가장 관련 있는 대답만 골라 핵심을 소개하세요.',
      'Taqdimot mavzusiga eng mos javoblarni tanlab, asosiy maʼlumotni tanishtiring.',
      'Choose only the answers most relevant to the topic and present the key points.',
      'Выберите только ответы, наиболее связанные с темой, и представьте главное.',
    ),
    distractors: ['전부읽으세요', '새로만드세요', '아무거나말하세요'],
    tags: ['interview', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 3 · 인터뷰한 친구를 소개해요
  // 441 ~ 460
  // ─────────────────────────────────────────────────────────────

  s5u1_441_reading_quiz: readingQuiz({
    instruction: L(
      '인터뷰 내용을 가장 정확하고 자연스럽게 소개한 문장을 고르세요.',
      'Intervyu maʼlumotini eng aniq va tabiiy tanishtirgan gapni tanlang.',
      'Choose the introduction that most accurately and naturally reflects the interview.',
      'Выберите вариант, который наиболее точно и естественно передаёт интервью.',
    ),
    passage:
      '인터뷰 메모: 이름은 아지즈. 국제관계학 전공. 여러 나라의 문화에 관심이 많음. 이번 학기에 국제교류 동아리에 가입함. 졸업 후 국제기구에서 일해 보고 싶음.',
    options: [
      '아지즈 씨는 국제관계학을 전공하고 여러 나라의 문화에 관심이 많아요. 이번 학기에는 국제교류 동아리에 가입했고 앞으로 국제기구에서 일해 보고 싶다고 했어요.',
      '아지즈 씨는 국제관계학이 싫어서 동아리에도 가입하지 않았어요.',
      '아지즈 씨는 졸업 후 반드시 교수가 될 거예요.',
      '아지즈 씨는 문화에는 관심이 없고 아르바이트만 중요하게 생각해요.',
    ],
    answer:
      '아지즈 씨는 국제관계학을 전공하고 여러 나라의 문화에 관심이 많아요. 이번 학기에는 국제교류 동아리에 가입했고 앞으로 국제기구에서 일해 보고 싶다고 했어요.',
    answerTranslation: L(
      '인터뷰에서 확인한 정보를 빠뜨리거나 바꾸지 않고 자연스럽게 연결했어요.',
      'Intervyuda tasdiqlangan maʼlumotlar o‘zgartirilmay tabiiy bog‘langan.',
      'It accurately connects the information confirmed in the interview.',
      'Этот вариант точно и естественно связывает подтверждённую на интервью информацию.',
    ),
    tags: ['friend-introduction', 'reading'],
    difficulty: 5,
  }),

  s5u1_442_word_matching: wordMatching({
    pairs: [
      { korean: '소개하다', native: 'tanishtirmoq' },
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '정보', native: 'maʼlumot' },
      { korean: '전공', native: 'mutaxassislik' },
      { korean: '관심', native: 'qiziqish' },
    ],
    tags: ['friend-introduction', 'information'],
  }),

  s5u1_443_sentence_builder: sentenceBuilder({
    answer:
      '친구를 소개할 때는 서로 관련 있는 정보를 자연스럽게 연결해서 말하는 것이 좋아요',
    translation: L(
      '친구를 소개할 때는 서로 관련 있는 정보를 자연스럽게 연결해서 말하는 것이 좋아요.',
      'Do‘stni tanishtirganda o‘zaro bog‘liq maʼlumotlarni tabiiy ulab aytish yaxshi.',
      'When introducing a friend, it is better to connect related information naturally.',
      'Представляя друга, лучше естественно связывать связанную информацию.',
    ),
    distractors: ['무작위로', '따로따로', '섞어요'],
    tags: ['friend-introduction', 'organization'],
    difficulty: 5,
  }),

  s5u1_444_error_hunt: errorHunt({
    npcText:
      '친구를 소개할 때 인터뷰에서 확인한 사실보다 내 추측을 더 정확한 정보라고 말해요.',
    wrongWord: '추측을',
    options: ['사실을', '추측을', '소문을', '실수를'],
    answer: '사실을',
    translation: L(
      '친구를 소개할 때 인터뷰에서 확인한 사실을 정확한 정보라고 말해요.',
      'Do‘stni tanishtirganda intervyuda tasdiqlangan faktni aniq maʼlumot sifatida aytamiz.',
      'When introducing a friend, use facts confirmed in the interview as accurate information.',
      'Представляя друга, точной информацией следует считать факты, подтверждённые на интервью.',
    ),
    hint: L(
      '친구가 직접 말한 내용과 내가 예상한 내용을 구별하세요.',
      'Do‘stning o‘zi aytgan fakt bilan taxminni farqlang.',
      'Distinguish what the friend actually said from your assumptions.',
      'Отличайте то, что друг действительно сказал, от собственных предположений.',
    ),
    tags: ['friend-introduction', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_445_fill_in_blank: multiBlank({
    sentenceTemplate:
      '친구를 소개할 때는 먼저 기본적인 ___를 말하고, 그다음 전공이나 관심 있는 ___처럼 서로 관련된 내용을 연결하면 자연스러워요.',
    blankAnswers: ['정보', '활동'],
    distractors: ['호칭', '상금', '주차장'],
    translation: L(
      '친구의 기본 정보와 학교생활 정보를 자연스럽게 연결해 소개해요.',
      'Do‘stning asosiy maʼlumoti va universitet faoliyatini tabiiy bog‘lab tanishtiramiz.',
      'Connect basic information with relevant campus-life information naturally.',
      'Естественно связывайте основную информацию о друге с его университетской жизнью.',
    ),
    tags: ['friend-introduction', 'information'],
    difficulty: 5,
  }),

  s5u1_446_audio_match: audioMatch({
    pairs: [
      { korean: '소개하다', native: 'tanishtirmoq' },
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '대답', native: 'javob' },
      { korean: '관심', native: 'qiziqish' },
      { korean: '활동', native: 'faoliyat' },
    ],
    tags: ['friend-introduction', 'listening'],
  }),

  s5u1_447_translate_builder: translateBuilder({
    instruction: L(
      '제 친구는 경제학을 전공하고 있고 이번 학기에는 봉사 동아리에서 활동하고 있다고 소개하세요.',
      'Do‘stingiz iqtisodiyot yo‘nalishida o‘qishini va bu semestrda ko‘ngillilar klubida faoliyat qilishini tanishtiring.',
      'Introduce your friend by saying that they major in economics and are active in a volunteer club this semester.',
      'Представьте друга, сказав, что он изучает экономику и в этом семестре участвует в волонтёрском клубе.',
    ),
    answer:
      '제 친구는 경제학을 전공하고 있고 이번 학기에는 봉사 동아리에서 활동하고 있어요',
    translation: L(
      '제 친구는 경제학을 전공하고 있고 이번 학기에는 봉사 동아리에서 활동하고 있어요.',
      'Do‘stim iqtisodiyot yo‘nalishida o‘qiydi va bu semestrda ko‘ngillilar klubida faol.',
      'My friend majors in economics and is active in a volunteer club this semester.',
      'Мой друг изучает экономику и в этом семестре участвует в волонтёрском клубе.',
    ),
    distractors: ['졸업식만', '모르고', '없어요'],
    tags: ['friend-introduction', 'productive'],
    difficulty: 5,
  }),

  s5u1_448_speaking: speaking({
    npcText: '인터뷰한 친구를 반 사람들에게 소개하고 있어요.',
    answer:
      '제가 소개할 친구는 마리나예요. 마리나는 언어학을 전공하고 있고 한국 문화에도 관심이 많아요.',
    translation: L(
      '제가 소개할 친구는 마리나예요. 마리나는 언어학을 전공하고 있고 한국 문화에도 관심이 많아요.',
      'Men tanishtiradigan do‘stim Marina. U tilshunoslik yo‘nalishida o‘qiydi va Koreya madaniyatiga ham qiziqadi.',
      'The friend I would like to introduce is Marina. She majors in linguistics and is also very interested in Korean culture.',
      'Я хочу представить Марину. Она изучает лингвистику и очень интересуется корейской культурой.',
    ),
    tags: ['friend-introduction', 'speaking'],
    difficulty: 5,
  }),

  s5u1_449_cloze_passage: clozePassage({
    passage:
      '제가 ___할 친구는 파루크입니다. 파루크는 컴퓨터공학을 ___하고 있습니다. 인터뷰에서 새로운 기술에 ___이 많다고 했고, 이번 학기에는 프로그래밍 동아리에서 ___하고 있다고 했습니다.',
    blankAnswers: ['소개', '전공', '관심', '활동'],
    distractors: ['호칭', '대답', '축제'],
    translation: L(
      '친구의 전공과 관심사, 학교 활동을 연결해서 소개하는 글이에요.',
      'Do‘stning mutaxassisligi, qiziqishi va universitet faoliyatini bog‘lab tanishtirish matni.',
      'The passage introduces a friend through their major, interests, and campus activities.',
      'Текст представляет друга через его специальность, интересы и университетскую деятельность.',
    ),
    tags: ['friend-introduction', 'cloze'],
    difficulty: 5,
  }),

  s5u1_450_word_arrange: wordArrange({
    answer:
      '친구 소개는 정보만 나열하기보다 그 사람의 특징이 잘 보이도록 연결해야 해요',
    translation: L(
      '친구 소개는 정보만 나열하기보다 그 사람의 특징이 잘 보이도록 연결해야 해요.',
      'Do‘stni tanishtirishda maʼlumotlarni shunchaki sanash emas, uning xususiyatlari ko‘rinadigan qilib bog‘lash kerak.',
      'A good introduction should connect information so the person’s characteristics become clear rather than merely listing facts.',
      'В представлении друга лучше связывать информацию так, чтобы были видны особенности человека, а не просто перечислять факты.',
    ),
    distractors: ['무작위로', '전부', '읽어요'],
    tags: ['friend-introduction', 'organization'],
    difficulty: 5,
  }),

  s5u1_451_reply_builder: replyBuilder({
    npcText:
      '친구 소개를 썼는데 “전공은 경제학이에요. 동아리는 사진 동아리예요. 취미는 여행이에요.”처럼 정보만 계속 나열돼요.',
    answer: '관련 있는 내용을 연결해서 친구의 특징이 보이게 소개해 보세요',
    translation: L(
      '관련 있는 내용을 연결해서 친구의 특징이 보이게 소개해 보세요.',
      'Bog‘liq maʼlumotlarni ulab, do‘stingizning xususiyatlari ko‘rinadigan qilib tanishtiring.',
      'Connect related information so the introduction shows what your friend is like.',
      'Свяжите связанную информацию так, чтобы из рассказа было понятно, что это за человек.',
    ),
    distractors: ['더나열하세요', '전부지워요', '추측을넣어요'],
    tags: ['friend-introduction', 'reply'],
    difficulty: 5,
  }),

  s5u1_452_verb_transform: verbTransform({
    baseWord: '소개하다',
    targetForm: '미래 계획 · -(으)ㄹ 거예요',
    answer: '소개할거예요',
    options: ['소', '개', '할', '거', '예', '요', '했'],
    translation: L(
      '소개할 거예요',
      'tanishtiraman',
      'will introduce',
      'представлю',
    ),
    tags: ['friend-introduction', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_453_reading_quiz: readingQuiz({
    instruction: L(
      '소개를 들은 사람이 친구에 대해 확실히 알 수 없는 내용을 고르세요.',
      'Tanishtirishni eshitgan odam do‘st haqida aniq bila olmaydigan maʼlumotni tanlang.',
      'Choose the information that cannot be known for certain from the introduction.',
      'Выберите информацию, которую нельзя точно узнать из представления.',
    ),
    passage:
      '제 친구 수빈이는 생명과학을 전공해요. 동물을 좋아해서 주말마다 동물 보호소에서 자원봉사를 하고 있어요. 졸업 후의 진로는 아직 정하지 않았지만 생명과학과 관련된 일을 하고 싶다고 했어요.',
    options: [
      '수빈이가 졸업 후 반드시 수의사가 된다',
      '수빈이는 생명과학을 전공한다',
      '수빈이는 동물을 좋아한다',
      '수빈이는 동물 보호소에서 자원봉사를 한다',
    ],
    answer: '수빈이가 졸업 후 반드시 수의사가 된다',
    answerTranslation: L(
      '진로를 아직 정하지 않았으므로 수의사가 된다고 단정할 수 없어요.',
      'Kelajak kasbi hali aniqlanmagan, shuning uchun albatta veterinar bo‘ladi deb bo‘lmaydi.',
      'Her career is not decided, so we cannot conclude that she will definitely become a veterinarian.',
      'Профессия ещё не выбрана, поэтому нельзя утверждать, что она обязательно станет ветеринаром.',
    ),
    tags: ['friend-introduction', 'reading'],
    difficulty: 5,
  }),

  s5u1_454_listen_type: listenType({
    audioText:
      '인터뷰에서 확인한 전공과 관심사, 학교 활동을 연결해서 친구를 소개했어요.',
    translation: L(
      '인터뷰에서 확인한 전공과 관심사, 학교 활동을 연결해서 친구를 소개했어요.',
      'Intervyuda tasdiqlangan mutaxassislik, qiziqish va universitet faoliyatini bog‘lab do‘stimni tanishtirdim.',
      'I introduced my friend by connecting the major, interests, and campus activities confirmed in the interview.',
      'Я представил друга, связав его специальность, интересы и университетскую деятельность, подтверждённые на интервью.',
    ),
    tags: ['friend-introduction', 'listening'],
  }),

  s5u1_455_sentence_builder: sentenceBuilder({
    answer:
      '좋은 친구 소개는 인터뷰에서 확인한 정보를 정확하면서도 자연스럽게 전달해야 해요',
    translation: L(
      '좋은 친구 소개는 인터뷰에서 확인한 정보를 정확하면서도 자연스럽게 전달해야 해요.',
      'Yaxshi tanishtirish intervyuda tasdiqlangan maʼlumotni aniq va tabiiy yetkazishi kerak.',
      'A good introduction should convey confirmed interview information both accurately and naturally.',
      'Хорошее представление должно точно и естественно передавать подтверждённую на интервью информацию.',
    ),
    distractors: ['추측으로', '바꾸어서', '전달해요'],
    tags: ['friend-introduction', 'accuracy'],
    difficulty: 5,
  }),

  s5u1_456_listen_fill: listenFill({
    audioText: '인터뷰한 내용을 바탕으로 친구의 전공과 관심사를 소개했어요.',
    sentenceTemplate: '___한 내용을 바탕으로 친구의 ___과 관심사를 소개했어요.',
    blankAnswers: ['인터뷰', '전공'],
    translation: L(
      '인터뷰한 내용을 바탕으로 친구의 전공과 관심사를 소개했어요.',
      'Intervyu maʼlumotiga asoslanib do‘stimning mutaxassisligi va qiziqishlarini tanishtirdim.',
      'I introduced my friend’s major and interests based on the interview.',
      'На основе интервью я рассказал о специальности и интересах друга.',
    ),
    tags: ['friend-introduction', 'dictation'],
  }),

  s5u1_457_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '오늘 누구를 소개할 거예요?',
      },
      {
        speaker: 'user',
        text: '같은 반 친구인 알리나를 소개할 거예요.',
      },
      {
        speaker: 'npc',
        text: '알리나 씨에 대해 어떤 걸 알게 됐어요?',
      },
      {
        speaker: 'user',
        text: '심리학을 전공하고 상담 동아리에서 활동한다고 했어요.',
      },
      {
        speaker: 'npc',
        text: '전공하고 동아리 활동이 서로 잘 연결되는 친구네요.',
      },
    ],
    translation: L(
      '소개할 사람을 밝히고 인터뷰에서 확인한 특징을 이야기하는 순서예요.',
      'Tanishtiriladigan odamni aytib, intervyuda tasdiqlangan xususiyatlarini tushuntirish ketma-ketligi.',
      'The dialogue identifies the friend and then explains characteristics confirmed in the interview.',
      'Сначала называется друг, затем сообщаются особенности, подтверждённые на интервью.',
    ),
    tags: ['friend-introduction', 'dialog-order'],
    difficulty: 5,
  }),

  s5u1_458_translate_type: translateType({
    instruction: L(
      '친구를 인터뷰해 보니 건축학을 전공하고 도시 문제에 관심이 많으며, 같은 관심사를 가진 사람을 만나기 위해 관련 동아리에도 가입했다는 것을 알게 되었다고 한국어로 입력하세요.',
      'Do‘stingizdan intervyu olgach, u arxitektura yo‘nalishida o‘qishini, shahar muammolariga qiziqishini va shu qiziqishdagi odamlar bilan tanishish uchun klubga qo‘shilganini bilganingizni koreyscha yozing.',
      'Write in Korean that the interview revealed your friend majors in architecture, is interested in urban issues, and joined a related club to meet people with similar interests.',
      'Напишите по-корейски, что из интервью вы узнали: друг изучает архитектуру, интересуется городскими проблемами и вступил в тематический клуб, чтобы встречаться с людьми со схожими интересами.',
    ),
    answer:
      '친구를 인터뷰해 보니 건축학을 전공하고 도시 문제에 관심이 많았어요. 또 같은 관심사를 가진 사람을 만나려고 관련 동아리에도 가입했다는 것을 알게 됐어요.',
    translation: L(
      '친구를 인터뷰해 보니 건축학을 전공하고 도시 문제에 관심이 많았어요. 또 같은 관심사를 가진 사람을 만나려고 관련 동아리에도 가입했다는 것을 알게 됐어요.',
      'Intervyudan do‘stim arxitektura yo‘nalishida o‘qishi va shahar muammolariga qiziqishini bildim. U bir xil qiziqishdagi odamlarni uchratish uchun tegishli klubga ham qo‘shilgan ekan.',
      'From the interview, I learned that my friend majors in architecture and is interested in urban issues. I also learned that they joined a related club to meet people with similar interests.',
      'Из интервью я узнал, что друг изучает архитектуру и интересуется городскими проблемами. Он также вступил в соответствующий клуб, чтобы встречаться с людьми со схожими интересами.',
    ),
    targetExpressions: ['인터뷰', '전공', '관심', '동아리', '가입'],
    tags: ['friend-introduction', 'productive'],
    difficulty: 5,
  }),

  s5u1_459_fill_in_blank: multiBlank({
    sentenceTemplate:
      '다른 사람에게 친구에 대해 알려 주는 것은 친구를 ___하는 것이고, 그 전에 친구에게 직접 여러 가지를 물어 정보를 얻는 것은 ___를 하는 것이에요.',
    blankAnswers: ['소개', '인터뷰'],
    distractors: ['호칭', '지원', '등록'],
    translation: L(
      '소개와 인터뷰의 기능 차이를 복습해요.',
      'Tanishtirish va intervyu vazifasini farqlaydi.',
      'This reviews the difference between introducing someone and interviewing them.',
      'Задание повторяет различие между представлением человека и интервью.',
    ),
    tags: ['friend-introduction', 'interview'],
    difficulty: 5,
  }),

  s5u1_460_reply_builder: replyBuilder({
    npcText:
      '친구 소개에 제가 생각한 친구의 성격도 넣고 싶은데 인터뷰에서는 성격에 대해 묻지 않았어요.',
    answer: '사실처럼 말하려면 먼저 친구에게 직접 확인하는 게 좋겠어요',
    translation: L(
      '사실처럼 말하려면 먼저 친구에게 직접 확인하는 게 좋겠어요.',
      'Uni fakt sifatida aytmoqchi bo‘lsangiz, avval do‘stingizdan bevosita aniqlagan yaxshi.',
      'If you want to present it as fact, you should confirm it directly with your friend first.',
      'Если хотите подать это как факт, лучше сначала уточнить у самого друга.',
    ),
    distractors: ['그냥넣어요', '마음대로써요', '질문하지마요'],
    tags: ['friend-introduction', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 4 · 누구를 어떻게 불러요?
  // 461 ~ 480
  // ─────────────────────────────────────────────────────────────

  s5u1_461_reading_quiz: readingQuiz({
    instruction: L(
      '두 학생의 관계를 가장 정확하게 고르세요.',
      'Ikki talabaning munosabatini eng aniq tanlang.',
      'Choose the most accurate description of the relationship between the two students.',
      'Выберите наиболее точное описание отношений двух студентов.',
    ),
    passage:
      '지호는 2025년에 사진 동아리에 가입했습니다. 민수는 같은 사진 동아리에 2024년에 먼저 가입했습니다. 두 사람은 나이가 같지만 지호는 동아리 활동을 시작한 뒤 민수에게 사진 촬영과 학교 행사에 대해 자주 물어봅니다.',
    options: [
      '민수는 지호의 선배이다',
      '민수는 지호의 후배이다',
      '나이가 같으므로 선후배 관계가 될 수 없다',
      '지호가 먼저 가입했으므로 민수가 후배이다',
    ],
    answer: '민수는 지호의 선배이다',
    answerTranslation: L(
      '같은 동아리에 먼저 가입한 민수가 지호의 선배예요.',
      'Bir xil klubga oldin qo‘shilgan Minsu Jihoning 선배si.',
      'Minsu joined the same club earlier, so he is Jiho’s senior.',
      'Минсу раньше вступил в тот же клуб, поэтому он старший товарищ Чихо.',
    ),
    tags: ['senior', 'junior', 'relationship'],
    difficulty: 5,
  }),

  s5u1_462_word_matching: wordMatching({
    pairs: [
      { korean: '호칭', native: 'murojaat shakli' },
      { korean: '선배', native: 'yuqori kursdosh' },
      { korean: '후배', native: 'kichik kursdosh' },
      { korean: '부르다', native: 'chaqirmoq' },
      { korean: '관계', native: 'munosabat' },
    ],
    tags: ['form-of-address', 'relationship'],
  }),

  s5u1_463_sentence_builder: sentenceBuilder({
    answer:
      '한국어의 호칭은 단순히 나이만 보고 정하기보다 상대와의 관계도 확인해야 해요',
    translation: L(
      '한국어의 호칭은 단순히 나이만 보고 정하기보다 상대와의 관계도 확인해야 해요.',
      'Koreyscha murojaat shaklini faqat yoshga qarab emas, munosabatni ham hisobga olib tanlash kerak.',
      'Korean forms of address should be chosen by considering the relationship, not age alone.',
      'Корейское обращение выбирают не только по возрасту, но и с учётом отношений.',
    ),
    distractors: ['나이만', '무조건', '사용해요'],
    tags: ['form-of-address', 'culture'],
    difficulty: 5,
  }),

  s5u1_464_error_hunt: errorHunt({
    npcText: '같은 학교나 조직에 나보다 먼저 들어온 사람을 후배라고 불러요.',
    wrongWord: '후배라고',
    options: ['선배라고', '후배라고', '학생이라고', '친구라고'],
    answer: '선배라고',
    translation: L(
      '같은 학교나 조직에 나보다 먼저 들어온 사람을 선배라고 불러요.',
      'Bir xil universitet yoki tashkilotga sizdan oldin kirgan kishini 선배 deb atashadi.',
      'A person who entered the same school or organization before you is called a senior, `선배`.',
      'Человека, который раньше вас поступил в ту же организацию или учебное заведение, называют `선배`.',
    ),
    hint: L(
      '`먼저 들어온 사람`인지 `나중에 들어온 사람`인지 확인하세요.',
      'U odam oldin kirganmi yoki keyin kirganmi — shuni tekshiring.',
      'Check whether the person joined before or after you.',
      'Проверьте, человек вступил раньше вас или позже.',
    ),
    tags: ['senior', 'junior', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_465_fill_in_blank: multiBlank({
    sentenceTemplate:
      '같은 학교나 조직에 나보다 먼저 들어온 사람은 ___이고, 나보다 나중에 들어온 사람은 ___예요. 이런 관계에 따라 상대를 ___ 방법도 달라질 수 있어요.',
    blankAnswers: ['선배', '후배', '부르는'],
    distractors: ['인터뷰', '질문', '대답'],
    translation: L(
      '선배와 후배의 관계와 사람을 부르는 방법을 연결해요.',
      '선배 va 후배 munosabati bilan odamga murojaat qilish usulini bog‘laydi.',
      'The sentence connects senior-junior relationships with forms of address.',
      'Предложение связывает отношения старшего и младшего с формой обращения.',
    ),
    tags: ['senior', 'junior', 'form-of-address'],
    difficulty: 5,
  }),

  s5u1_466_audio_match: audioMatch({
    pairs: [
      { korean: '호칭', native: 'murojaat' },
      { korean: '선배', native: 'yuqori kursdosh' },
      { korean: '후배', native: 'kichik kursdosh' },
      { korean: '부르다', native: 'chaqirmoq' },
      { korean: '관계', native: 'munosabat' },
    ],
    tags: ['form-of-address', 'listening'],
  }),

  s5u1_467_translate_builder: translateBuilder({
    instruction: L(
      '같은 동아리에 저보다 먼저 들어온 사람이어서 선배라고 부른다고 말하세요.',
      'U bir xil klubga sizdan oldin kirgani uchun uni 선배 deb chaqirishingizni ayting.',
      'Say that you call the person `선배` because they joined the same club before you.',
      'Скажите, что называете этого человека `선배`, потому что он раньше вас вступил в тот же клуб.',
    ),
    answer: '같은 동아리에 저보다 먼저 들어온 사람이라서 선배라고 불러요',
    translation: L(
      '같은 동아리에 저보다 먼저 들어온 사람이라서 선배라고 불러요.',
      'U bir xil klubga mendan oldin kirgan odam, shuning uchun uni 선배 deb chaqiraman.',
      'I call the person `선배` because they joined the same club before me.',
      'Я обращаюсь к этому человеку `선배`, потому что он раньше меня вступил в тот же клуб.',
    ),
    distractors: ['후배라고', '나중에', '가입했어요'],
    tags: ['senior', 'form-of-address'],
    difficulty: 5,
  }),

  s5u1_468_speaking: speaking({
    npcText:
      '새 동아리에서 먼저 활동해 온 학생에게 학교생활에 대해 조언을 부탁하고 있어요.',
    answer:
      '선배, 제가 이번 학기에 처음 들어왔는데 동아리 활동에 대해 조금 알려 주실 수 있어요?',
    translation: L(
      '선배, 제가 이번 학기에 처음 들어왔는데 동아리 활동에 대해 조금 알려 주실 수 있어요?',
      '선배, men bu semestrda endi qo‘shildim. Klub faoliyati haqida biroz tushuntirib bera olasizmi?',
      'Senior, I just joined this semester. Could you tell me a little about the club activities?',
      'Сонбэ, я только вступил в этом семестре. Не могли бы вы немного рассказать о деятельности клуба?',
    ),
    tags: ['senior', 'speaking', 'form-of-address'],
    difficulty: 5,
  }),

  s5u1_469_cloze_passage: clozePassage({
    passage:
      '한국에서 사람을 부를 때는 상황과 ___를 함께 보는 것이 중요합니다. 같은 동아리에 나보다 먼저 들어온 사람은 ___이고, 나중에 들어온 사람은 ___입니다. 어떤 말을 사용해야 할지 확실하지 않다면 상대와의 관계를 먼저 확인한 뒤 적절한 ___을 선택하는 것이 좋습니다.',
    blankAnswers: ['관계', '선배', '후배', '호칭'],
    distractors: ['인터뷰', '학점', '축제'],
    translation: L(
      '관계와 상황에 따라 호칭을 판단하는 내용이에요.',
      'Munosabat va vaziyatga qarab murojaat shaklini tanlash haqida.',
      'The passage explains choosing forms of address according to relationship and context.',
      'Текст объясняет выбор обращения в зависимости от отношений и ситуации.',
    ),
    tags: ['form-of-address', 'culture'],
    difficulty: 5,
  }),

  s5u1_470_word_arrange: wordArrange({
    answer:
      '상대와의 관계를 모르면서 호칭을 마음대로 정하면 어색한 상황이 생길 수 있어요',
    translation: L(
      '상대와의 관계를 모르면서 호칭을 마음대로 정하면 어색한 상황이 생길 수 있어요.',
      'Munosabatni bilmay turib murojaat shaklini o‘zboshimchalik bilan tanlasangiz noqulay vaziyat bo‘lishi mumkin.',
      'Choosing a form of address without knowing the relationship can create an awkward situation.',
      'Если выбрать обращение, не зная отношений с человеком, может возникнуть неловкая ситуация.',
    ),
    distractors: ['항상', '정확하고', '괜찮아요'],
    tags: ['form-of-address', 'culture'],
    difficulty: 5,
  }),

  s5u1_471_reply_builder: replyBuilder({
    npcText:
      '저 사람은 저보다 나이가 한 살 많지만 같은 동아리에 저보다 나중에 들어왔어요. 선배예요?',
    answer: '동아리 기준으로는 나중에 들어왔으니까 후배예요',
    translation: L(
      '동아리 기준으로는 나중에 들어왔으니까 후배예요.',
      'Klubga sizdan keyin kirgani uchun klub munosabatida u 후배.',
      'In the club relationship, that person is your junior because they joined after you.',
      'В рамках клуба этот человек — ваш младший товарищ, потому что вступил позже вас.',
    ),
    distractors: ['나이가많아서선배예요', '무조건선배예요', '관계가없어요'],
    tags: ['senior', 'junior', 'reply'],
    difficulty: 5,
  }),

  s5u1_472_verb_transform: verbTransform({
    baseWord: '부르다',
    targetForm: '현재 · 해요체',
    answer: '불러요',
    options: ['불', '러', '요', '부', '르', '면'],
    translation: L(
      '불러요',
      'chaqiraman / murojaat qilaman',
      'call / address',
      'называю / обращаюсь',
    ),
    tags: ['form-of-address', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_473_reading_quiz: readingQuiz({
    instruction: L(
      '두 사람의 관계에 대한 설명으로 맞는 것을 고르세요.',
      'Ikki kishining munosabati haqida to‘g‘ri tushuntirishni tanlang.',
      'Choose the correct description of the relationship.',
      'Выберите правильное описание отношений.',
    ),
    passage:
      '아나는 지난해 3월 한국대학교에 입학했고, 보리스는 올해 3월 같은 학과에 입학했습니다. 보리스가 아나보다 두 살 더 많지만 두 사람은 같은 학과에서 학교에 들어온 시기가 다릅니다.',
    options: [
      '같은 학과 기준으로 아나는 보리스의 선배이다',
      '보리스가 나이가 많으므로 반드시 아나의 선배이다',
      '두 사람이 나이가 다르므로 선후배 관계가 없다',
      '아나가 더 어리므로 반드시 보리스의 후배이다',
    ],
    answer: '같은 학과 기준으로 아나는 보리스의 선배이다',
    answerTranslation: L(
      '아나는 같은 학과에 먼저 입학했으므로 이 관계에서는 선배예요.',
      'Ana bir xil yo‘nalishga oldin kirgan, shuning uchun bu munosabatda 선배.',
      'Ana entered the same department earlier, so she is the senior in this relationship.',
      'Ана раньше поступила на ту же специальность, поэтому в этих отношениях она `선배`.',
    ),
    tags: ['senior', 'junior', 'judgment'],
    difficulty: 5,
  }),

  s5u1_474_listen_type: listenType({
    audioText:
      '같은 동아리에 저보다 먼저 들어온 사람이라서 보통 선배라고 불러요.',
    translation: L(
      '같은 동아리에 저보다 먼저 들어온 사람이라서 보통 선배라고 불러요.',
      'U bir xil klubga mendan oldin kirgan, shuning uchun odatda 선배 deb chaqiraman.',
      'Because the person joined the same club before me, I usually address them as `선배`.',
      'Поскольку этот человек вступил в тот же клуб раньше меня, я обычно обращаюсь к нему `선배`.',
    ),
    tags: ['senior', 'form-of-address'],
  }),

  s5u1_475_sentence_builder: sentenceBuilder({
    answer:
      '선배와 후배는 단순한 나이 차이가 아니라 같은 집단에 들어온 순서와 관련이 있어요',
    translation: L(
      '선배와 후배는 단순한 나이 차이가 아니라 같은 집단에 들어온 순서와 관련이 있어요.',
      '선배 va 후배 faqat yosh farqi emas, bir guruhga qachon kirganingiz bilan bog‘liq.',
      '`선배` and `후배` are related to the order of joining the same group, not simply an age difference.',
      '`선배` и `후배` связаны с порядком вступления в одну группу, а не просто с разницей в возрасте.',
    ),
    distractors: ['나이만', '보고', '정해요'],
    tags: ['senior', 'junior'],
    difficulty: 5,
  }),

  s5u1_476_listen_fill: listenFill({
    audioText:
      '저보다 먼저 학교에 들어온 사람은 선배이고 나중에 들어온 사람은 후배예요.',
    sentenceTemplate:
      '저보다 먼저 학교에 들어온 사람은 ___이고 나중에 들어온 사람은 ___예요.',
    blankAnswers: ['선배', '후배'],
    translation: L(
      '저보다 먼저 학교에 들어온 사람은 선배이고 나중에 들어온 사람은 후배예요.',
      'Mendan oldin o‘qishga kirgan kishi 선배, keyin kirgan kishi 후배.',
      'Someone who entered school before me is a senior, and someone who entered later is a junior.',
      'Тот, кто поступил раньше меня, — `선배`, а тот, кто позже, — `후배`.',
    ),
    tags: ['senior', 'junior'],
  }),

  s5u1_477_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '민수 씨를 왜 선배라고 불러요?',
      },
      {
        speaker: 'user',
        text: '저보다 사진 동아리에 1년 먼저 가입했거든요.',
      },
      {
        speaker: 'npc',
        text: '민수 씨가 나이도 더 많아요?',
      },
      {
        speaker: 'user',
        text: '아니요. 나이는 같은데 동아리에 먼저 들어왔어요.',
      },
      {
        speaker: 'npc',
        text: '아, 나이보다 동아리에 들어온 순서가 기준이군요.',
      },
    ],
    translation: L(
      '나이가 아니라 같은 집단에 들어온 순서로 선후배 관계를 판단하는 대화예요.',
      '선배 va 후배 munosabatini yosh emas, guruhga kirgan vaqt bilan aniqlash haqida dialog.',
      'The dialogue shows that the senior-junior relationship is based on joining order rather than age.',
      'Диалог показывает, что отношения `선배–후배` определяются порядком вступления, а не возрастом.',
    ),
    tags: ['senior', 'junior', 'dialog-order'],
    difficulty: 5,
  }),

  s5u1_478_translate_type: translateType({
    instruction: L(
      '한국에서는 사람을 부를 때 나이만 보는 것이 아니라 학교나 동아리 같은 집단에서의 관계도 중요하며, 같은 동아리에 먼저 들어온 사람을 선배라고 부를 수 있다고 한국어로 입력하세요.',
      'Koreyada odamga murojaat qilishda faqat yosh emas, universitet yoki klubdagi munosabat ham muhimligini va klubga oldin kirgan kishini 선배 deb atash mumkinligini koreyscha yozing.',
      'Write in Korean that in Korea forms of address depend not only on age but also on relationships within groups such as schools and clubs, and that someone who joined the same club earlier can be called `선배`.',
      'Напишите по-корейски, что в Корее обращение зависит не только от возраста, но и от отношений в школе или клубе, а человека, раньше вступившего в тот же клуб, можно называть `선배`.',
    ),
    answer:
      '한국에서는 사람을 부를 때 나이만 보는 것이 아니라 학교나 동아리에서의 관계도 중요해요. 같은 동아리에 저보다 먼저 들어온 사람은 선배라고 부를 수 있어요.',
    translation: L(
      '한국에서는 사람을 부를 때 나이만 보는 것이 아니라 학교나 동아리에서의 관계도 중요해요. 같은 동아리에 저보다 먼저 들어온 사람은 선배라고 부를 수 있어요.',
      'Koreyada odamga murojaat qilishda faqat yosh emas, universitet yoki klubdagi munosabat ham muhim. Bir xil klubga mendan oldin kirgan kishini 선배 deb atash mumkin.',
      'In Korea, when addressing someone, relationships within a school or club matter as well as age. A person who joined the same club before me can be addressed as `선배`.',
      'В Корее при обращении важны не только возраст, но и отношения в школе или клубе. Человека, раньше меня вступившего в тот же клуб, можно называть `선배`.',
    ),
    targetExpressions: ['부를', '관계', '선배'],
    tags: ['form-of-address', 'productive'],
    difficulty: 5,
  }),

  s5u1_479_fill_in_blank: multiBlank({
    sentenceTemplate:
      '사람을 부르는 이름이나 표현을 ___이라고 하고, 같은 집단에 먼저 들어온 사람은 ___, 나중에 들어온 사람은 ___라고 해요.',
    blankAnswers: ['호칭', '선배', '후배'],
    distractors: ['인터뷰', '질문', '대답'],
    translation: L(
      '호칭, 선배, 후배의 의미를 한 문장에서 복습해요.',
      '호칭, 선배 va 후배 maʼnolarini bir gapda takrorlaydi.',
      'This reviews the meanings of `호칭`, `선배`, and `후배`.',
      'Задание повторяет значения `호칭`, `선배` и `후배`.',
    ),
    tags: ['form-of-address', 'review'],
    difficulty: 5,
  }),

  s5u1_480_reply_builder: replyBuilder({
    npcText: '처음 만난 사람인데 어떤 호칭을 사용해야 하는지 확실하지 않아요.',
    answer: '상대와의 관계와 상황을 먼저 확인한 뒤 알맞게 부르는 게 좋아요',
    translation: L(
      '상대와의 관계와 상황을 먼저 확인한 뒤 알맞게 부르는 게 좋아요.',
      'Avval munosabat va vaziyatni aniqlab, keyin mos tarzda murojaat qilgan yaxshi.',
      'First check the relationship and situation, then choose an appropriate way to address the person.',
      'Сначала лучше уточнить отношения и ситуацию, а затем выбрать подходящее обращение.',
    ),
    distractors: ['아무렇게나불러요', '나이만봐요', '항상같게불러요'],
    tags: ['form-of-address', 'reply'],
    difficulty: 5,
  }),

  // ─────────────────────────────────────────────────────────────
  // Lesson 5 · 인터뷰부터 소개까지
  // 481 ~ 500
  // ─────────────────────────────────────────────────────────────

  s5u1_481_reading_quiz: readingQuiz({
    instruction: L(
      '다음 상황에서 학생이 가장 먼저 해야 할 일을 고르세요.',
      'Vaziyatda talaba birinchi navbatda nima qilishi kerakligini tanlang.',
      'Choose what the student should do first.',
      'Выберите, что студент должен сделать в первую очередь.',
    ),
    passage:
      '수업 과제로 같은 반 친구 한 명을 인터뷰한 뒤 다른 학생들에게 소개해야 합니다. 소개에는 친구의 전공, 학교생활, 관심 있는 활동이 들어가야 합니다. 하지만 아직 누구를 소개할지 정하지 않았고 인터뷰도 시작하지 않았습니다.',
    options: [
      '소개할 친구를 정하고 필요한 질문을 준비한다',
      '친구의 대답을 상상해서 발표문부터 쓴다',
      '호칭만 외우고 발표를 끝낸다',
      '확인하지 않은 정보를 인터넷에서 찾는다',
    ],
    answer: '소개할 친구를 정하고 필요한 질문을 준비한다',
    answerTranslation: L(
      '먼저 사람을 정하고 발표에 필요한 정보를 얻을 질문을 준비해야 해요.',
      'Avval do‘stni tanlab, kerakli maʼlumotni olish uchun savollar tayyorlash kerak.',
      'First choose the friend and prepare questions needed to gather presentation information.',
      'Сначала нужно выбрать друга и подготовить вопросы для получения нужной информации.',
    ),
    tags: ['interview', 'friend-introduction', 'review'],
    difficulty: 5,
  }),

  s5u1_482_word_matching: wordMatching({
    pairs: [
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '소개하다', native: 'tanishtirmoq' },
      { korean: '호칭', native: 'murojaat' },
      { korean: '선배', native: 'yuqori kursdosh' },
      { korean: '후배', native: 'kichik kursdosh' },
    ],
    tags: ['unit-review', 'communication'],
  }),

  s5u1_483_sentence_builder: sentenceBuilder({
    answer:
      '인터뷰에서 정보를 정확하게 확인하고 관계에 맞는 호칭을 사용하면 소개가 더 자연스러워요',
    translation: L(
      '인터뷰에서 정보를 정확하게 확인하고 관계에 맞는 호칭을 사용하면 소개가 더 자연스러워요.',
      'Intervyuda maʼlumotni aniq tekshirib, munosabatga mos murojaat ishlatilsa tanishtirish tabiiyroq bo‘ladi.',
      'An introduction sounds more natural when information is confirmed accurately and forms of address fit the relationship.',
      'Представление звучит естественнее, если информация проверена, а обращение соответствует отношениям.',
    ),
    distractors: ['추측하고', '아무호칭을', '사용해요'],
    tags: ['unit-review', 'friend-introduction'],
    difficulty: 5,
  }),

  s5u1_484_error_hunt: errorHunt({
    npcText:
      '친구를 인터뷰한 뒤에는 확인한 정보를 버리고 추측한 내용을 중심으로 소개해야 해요.',
    wrongWord: '버리고',
    options: ['정리하고', '버리고', '숨기고', '바꾸고'],
    answer: '정리하고',
    translation: L(
      '친구를 인터뷰한 뒤에는 확인한 정보를 정리하고 그 내용을 중심으로 소개해야 해요.',
      'Do‘stni intervyu qilgandan keyin tasdiqlangan maʼlumotni tartibga solib, shu asosda tanishtirish kerak.',
      'After interviewing a friend, organize the confirmed information and base the introduction on it.',
      'После интервью нужно упорядочить подтверждённую информацию и строить представление на её основе.',
    ),
    hint: L(
      '인터뷰를 하는 목적은 확인한 정보를 얻기 위한 것이에요.',
      'Intervyuning maqsadi tasdiqlangan maʼlumot olish.',
      'The purpose of the interview is to obtain confirmed information.',
      'Цель интервью — получить подтверждённую информацию.',
    ),
    tags: ['unit-review', 'error-hunt'],
    difficulty: 5,
  }),

  s5u1_485_fill_in_blank: multiBlank({
    sentenceTemplate:
      '친구에게 필요한 내용을 물어보는 것은 ___이고, 친구가 말한 내용을 듣는 것은 ___을 확인하는 과정이며, 그 내용을 다른 사람에게 알려 주는 것은 친구를 ___하는 것이에요.',
    blankAnswers: ['인터뷰', '대답', '소개'],
    distractors: ['호칭', '후배', '축제'],
    translation: L(
      '인터뷰, 대답, 소개가 실제 과제에서 어떻게 연결되는지 복습해요.',
      'Intervyu, javob va tanishtirishning topshiriqda qanday bog‘lanishini takrorlaydi.',
      'This reviews how the interview, answers, and introduction connect in the task.',
      'Задание повторяет связь интервью, ответов и представления друга.',
    ),
    tags: ['unit-review', 'interview'],
    difficulty: 5,
  }),

  s5u1_486_audio_match: audioMatch({
    pairs: [
      { korean: '인터뷰', native: 'intervyu' },
      { korean: '질문', native: 'savol' },
      { korean: '대답', native: 'javob' },
      { korean: '호칭', native: 'murojaat' },
      { korean: '선배', native: 'yuqori kursdosh' },
    ],
    tags: ['unit-review', 'listening'],
  }),

  s5u1_487_translate_builder: translateBuilder({
    instruction: L(
      '선배를 인터뷰해서 전공과 동아리 활동에 대해 물어본 뒤 다른 친구들에게 소개했다고 말하세요.',
      '선배dan intervyu olib mutaxassisligi va klub faoliyati haqida so‘raganingizdan keyin uni boshqa do‘stlarga tanishtirganingizni ayting.',
      'Say that you interviewed a senior about their major and club activities and then introduced them to other friends.',
      'Скажите, что вы взяли интервью у старшего товарища о специальности и клубной деятельности, а затем представили его другим друзьям.',
    ),
    answer:
      '선배를 인터뷰해서 전공과 동아리 활동에 대해 물어본 뒤 다른 친구들에게 소개했어요',
    translation: L(
      '선배를 인터뷰해서 전공과 동아리 활동에 대해 물어본 뒤 다른 친구들에게 소개했어요.',
      '선배dan intervyu olib mutaxassisligi va klub faoliyati haqida so‘radim, keyin uni boshqa do‘stlarga tanishtirdim.',
      'I interviewed a senior about their major and club activities and then introduced them to other friends.',
      'Я взял интервью у старшего товарища о специальности и клубной деятельности, а затем представил его другим друзьям.',
    ),
    distractors: ['후배만', '추측해서', '숨겼어요'],
    tags: ['unit-review', 'productive'],
    difficulty: 5,
  }),

  s5u1_488_speaking: speaking({
    npcText: '반 친구들에게 인터뷰한 사람을 소개하고 있어요.',
    answer:
      '제가 인터뷰한 사람은 같은 동아리 선배예요. 환경공학을 전공하고 있고 주말에는 자원봉사도 하고 있어요.',
    translation: L(
      '제가 인터뷰한 사람은 같은 동아리 선배예요. 환경공학을 전공하고 있고 주말에는 자원봉사도 하고 있어요.',
      'Men intervyu qilgan odam bir klubdagi 선배. U ekologik muhandislik yo‘nalishida o‘qiydi va dam olish kunlari ko‘ngilli ish ham qiladi.',
      'The person I interviewed is a senior from my club. They major in environmental engineering and also volunteer on weekends.',
      'Я интервьюировал старшего товарища из своего клуба. Он изучает экологическую инженерию и по выходным занимается волонтёрством.',
    ),
    tags: ['unit-review', 'speaking'],
    difficulty: 5,
  }),

  s5u1_489_cloze_passage: clozePassage({
    passage:
      '수업 과제로 같은 동아리 ___를 인터뷰했습니다. 먼저 전공과 학교생활에 대해 여러 가지 ___을 했고, 선배의 ___을 메모했습니다. 그 내용을 주제별로 정리해서 친구들에게 선배를 ___했습니다.',
    blankAnswers: ['선배', '질문', '대답', '소개'],
    distractors: ['후배', '호칭', '상금'],
    translation: L(
      '인터뷰부터 친구 소개까지의 전체 과정을 연결한 글이에요.',
      'Intervyudan tanishtirishgacha bo‘lgan butun jarayonni bog‘laydi.',
      'The passage connects the full process from interviewing to introducing the person.',
      'Текст связывает весь процесс от интервью до представления человека.',
    ),
    tags: ['unit-review', 'cloze'],
    difficulty: 5,
  }),

  s5u1_490_word_arrange: wordArrange({
    answer:
      '상대에게 직접 확인한 정보를 관계와 상황에 맞게 전달하는 것이 정확한 소개의 기본이에요',
    translation: L(
      '상대에게 직접 확인한 정보를 관계와 상황에 맞게 전달하는 것이 정확한 소개의 기본이에요.',
      'Odamning o‘zidan tasdiqlangan maʼlumotni munosabat va vaziyatga mos tarzda yetkazish aniq tanishtirishning asosidir.',
      'An accurate introduction is based on information confirmed directly with the person and conveyed appropriately for the relationship and context.',
      'Основа точного представления — информация, подтверждённая самим человеком и переданная с учётом отношений и ситуации.',
    ),
    distractors: ['추측한', '마음대로', '바꾸는'],
    tags: ['unit-review', 'accuracy'],
    difficulty: 5,
  }),

  s5u1_491_reply_builder: replyBuilder({
    npcText:
      '선배를 다른 친구에게 소개하려고 하는데 제가 정확히 모르는 내용까지 넣으면 더 풍부해 보이지 않을까요?',
    answer:
      '모르는 내용은 넣지 말고 인터뷰에서 확인한 정보만 정확하게 전달하세요',
    translation: L(
      '모르는 내용은 넣지 말고 인터뷰에서 확인한 정보만 정확하게 전달하세요.',
      'Bilmagan maʼlumotni qo‘shmang, intervyuda tasdiqlangan maʼlumotnigina aniq yetkazing.',
      'Do not add information you do not know; accurately convey only what was confirmed in the interview.',
      'Не добавляйте неизвестную информацию — точно передавайте только то, что было подтверждено на интервью.',
    ),
    distractors: ['상상해서넣어요', '소문도넣어요', '아무거나말해요'],
    tags: ['unit-review', 'reply'],
    difficulty: 5,
  }),

  s5u1_492_verb_transform: verbTransform({
    baseWord: '부르다',
    targetForm: '과거 · 해요체',
    answer: '불렀어요',
    options: ['불', '렀', '어', '요', '러', '부'],
    translation: L(
      '불렀어요',
      'chaqirdim / murojaat qildim',
      'called / addressed',
      'назвал / обратился',
    ),
    tags: ['form-of-address', 'verb-transform'],
    difficulty: 5,
  }),

  s5u1_493_reading_quiz: readingQuiz({
    instruction: L(
      '소개 내용과 호칭을 모두 올바르게 판단한 것을 고르세요.',
      'Tanishtirish maʼlumoti va murojaatni ikkalasini ham to‘g‘ri baholagan variantni tanlang.',
      'Choose the option that correctly handles both the introduction information and the form of address.',
      'Выберите вариант, в котором правильно учтены и информация для представления, и форма обращения.',
    ),
    passage:
      '유진은 지난해 경제 동아리에 가입했고 마리나는 올해 같은 동아리에 가입했습니다. 마리나는 유진을 인터뷰했고, 유진은 경제학을 전공하며 졸업 후 금융 분야에서 일해 보고 싶다고 대답했습니다.',
    options: [
      '마리나는 유진을 동아리 선배로 소개하고 인터뷰에서 확인한 전공과 계획을 전달할 수 있다',
      '마리나는 먼저 가입했으므로 유진의 선배이다',
      '유진이 금융 분야에 반드시 취업한다고 소개해야 한다',
      '인터뷰 내용과 관계없이 새로운 정보를 추가해야 한다',
    ],
    answer:
      '마리나는 유진을 동아리 선배로 소개하고 인터뷰에서 확인한 전공과 계획을 전달할 수 있다',
    answerTranslation: L(
      '유진이 먼저 가입했으므로 선배이고, 전공과 희망은 인터뷰에서 직접 확인했어요.',
      'Yujin klubga oldin qo‘shilgani uchun 선배, mutaxassisligi va istagi esa intervyuda tasdiqlangan.',
      'Yujin is the senior because they joined earlier, and the major and career hope were directly confirmed.',
      'Юджин — старший товарищ, поскольку вступил раньше, а специальность и планы подтверждены на интервью.',
    ),
    tags: ['unit-review', 'judgment'],
    difficulty: 5,
  }),

  s5u1_494_listen_type: listenType({
    audioText:
      '동아리 선배를 인터뷰한 뒤 확인한 정보를 정리해서 반 친구들에게 소개했어요.',
    translation: L(
      '동아리 선배를 인터뷰한 뒤 확인한 정보를 정리해서 반 친구들에게 소개했어요.',
      'Klubdagi 선배dan intervyu olib, tasdiqlangan maʼlumotni tartibga solib guruhdoshlarimga tanishtirdim.',
      'After interviewing a senior from my club, I organized the confirmed information and introduced them to my classmates.',
      'После интервью со старшим товарищем из клуба я упорядочил подтверждённую информацию и представил его одногруппникам.',
    ),
    tags: ['unit-review', 'listening'],
  }),

  s5u1_495_sentence_builder: sentenceBuilder({
    answer:
      '사람을 잘 소개하려면 정확한 정보뿐 아니라 상대와의 관계를 이해하는 것도 중요해요',
    translation: L(
      '사람을 잘 소개하려면 정확한 정보뿐 아니라 상대와의 관계를 이해하는 것도 중요해요.',
      'Odamni yaxshi tanishtirish uchun aniq maʼlumot bilan birga munosabatni ham tushunish muhim.',
      'To introduce someone well, it is important to understand both accurate information and the relationship with that person.',
      'Чтобы хорошо представить человека, важно понимать не только точную информацию, но и отношения с ним.',
    ),
    distractors: ['관계없이', '추측만', '필요해요'],
    tags: ['unit-review', 'relationship'],
    difficulty: 5,
  }),

  s5u1_496_listen_fill: listenFill({
    audioText:
      '선배에게 질문하고 대답을 들은 뒤 친구들에게 정확하게 소개했어요.',
    sentenceTemplate:
      '___에게 질문하고 ___을 들은 뒤 친구들에게 정확하게 소개했어요.',
    blankAnswers: ['선배', '대답'],
    translation: L(
      '선배에게 질문하고 대답을 들은 뒤 친구들에게 정확하게 소개했어요.',
      '선배ga savol berib javobini tinglagach, uni do‘stlarimga aniq tanishtirdim.',
      'After asking the senior questions and hearing the answers, I introduced them accurately to my friends.',
      'Задав старшему товарищу вопросы и выслушав ответы, я точно представил его друзьям.',
    ),
    tags: ['unit-review', 'dictation'],
  }),

  s5u1_497_dialog_order: dialogOrder({
    dialogLines: [
      {
        speaker: 'npc',
        text: '오늘 소개할 사람은 누구예요?',
      },
      {
        speaker: 'user',
        text: '제가 활동하는 동아리의 선배예요.',
      },
      {
        speaker: 'npc',
        text: '선배에 대해서 어떻게 그렇게 많이 알게 됐어요?',
      },
      {
        speaker: 'user',
        text: '어제 인터뷰하면서 전공과 학교생활에 대해 여러 가지 질문했어요.',
      },
      {
        speaker: 'npc',
        text: '그럼 직접 확인한 정보를 바탕으로 소개하는 거군요.',
      },
    ],
    translation: L(
      '관계를 밝히고 인터뷰 방법과 정보의 출처를 확인하는 종합 대화예요.',
      'Munosabat, intervyu va maʼlumot manbasini birga tekshiradigan yakuniy dialog.',
      'This review dialogue identifies the relationship, interview method, and source of the information.',
      'Итоговый диалог объединяет отношения, интервью и источник информации.',
    ),
    tags: ['unit-review', 'dialog-order'],
    difficulty: 5,
  }),

  s5u1_498_translate_type: translateType({
    instruction: L(
      '같은 동아리 선배를 소개하기 위해 먼저 인터뷰했고, 전공과 학교생활에 대한 질문을 한 뒤 확인한 대답만 정리했으며, 발표에서는 그 정보를 바꾸지 않고 정확하게 전달했다고 한국어로 입력하세요.',
      'Bir klubdagi 선배ni tanishtirish uchun avval intervyu qilganingizni, mutaxassislik va universitet hayoti haqida savollar berganingizni, faqat tasdiqlangan javoblarni tartiblab taqdimotda o‘zgartirmay yetkazganingizni koreyscha yozing.',
      'Write in Korean that you first interviewed a senior from your club, asked about their major and campus life, organized only confirmed answers, and conveyed that information accurately without changing it.',
      'Напишите по-корейски, что для представления старшего товарища из клуба вы сначала провели интервью, задали вопросы о специальности и университетской жизни, упорядочили только подтверждённые ответы и точно передали их без изменений.',
    ),
    answer:
      '같은 동아리 선배를 소개하려고 먼저 인터뷰했어요. 전공과 학교생활에 대해 질문한 뒤 확인한 대답만 정리했고, 발표에서는 그 정보를 바꾸지 않고 정확하게 전달했어요.',
    translation: L(
      '같은 동아리 선배를 소개하려고 먼저 인터뷰했어요. 전공과 학교생활에 대해 질문한 뒤 확인한 대답만 정리했고, 발표에서는 그 정보를 바꾸지 않고 정확하게 전달했어요.',
      'Bir klubdagi 선배ni tanishtirish uchun avval intervyu qildim. Mutaxassislik va universitet hayoti haqida savol berib, tasdiqlangan javoblargina tartibga solindi va taqdimotda o‘zgartirmay aniq yetkazildi.',
      'I first interviewed a senior from my club. After asking about their major and campus life, I organized only the confirmed answers and conveyed the information accurately without changing it.',
      'Сначала я провёл интервью со старшим товарищем из клуба. Я задал вопросы о специальности и университетской жизни, упорядочил только подтверждённые ответы и точно передал информацию без изменений.',
    ),
    targetExpressions: ['선배', '인터뷰', '질문', '대답', '소개'],
    tags: ['unit-review', 'productive'],
    difficulty: 5,
  }),

  s5u1_499_fill_in_blank: multiBlank({
    sentenceTemplate:
      '소개할 사람에게 직접 ___해서 사실을 확인하고, 중요한 ___을 정리한 뒤, 상대와의 관계에 맞는 ___을 사용하면 더 정확하고 자연스럽게 사람을 소개할 수 있어요.',
    blankAnswers: ['인터뷰', '대답', '호칭'],
    distractors: ['추측', '상금', '학점'],
    translation: L(
      '인터뷰, 대답 정리, 호칭 선택까지 이번 노드의 핵심을 한 번에 복습해요.',
      'Intervyu, javobni tartiblash va murojaat tanlash — bu nodning asosiy mavzularini birga takrorlaydi.',
      'This reviews the node’s core skills: interviewing, organizing answers, and choosing an appropriate form of address.',
      'Задание повторяет основные навыки узла: интервью, обработку ответов и выбор подходящего обращения.',
    ),
    tags: ['unit-review', 'interview', 'form-of-address'],
    difficulty: 5,
  }),

  s5u1_500_reply_builder: replyBuilder({
    npcText:
      '친구 소개 과제를 다 썼는데 인터뷰에서 확인하지 않은 내용도 있고 선배를 그냥 이름으로만 써 놓은 부분도 있어요.',
    answer:
      '확인하지 않은 내용은 빼고 관계에 맞는 호칭도 다시 확인해서 고치세요',
    translation: L(
      '확인하지 않은 내용은 빼고 관계에 맞는 호칭도 다시 확인해서 고치세요.',
      'Tasdiqlanmagan maʼlumotni olib tashlab, munosabatga mos murojaatni ham qayta tekshirib tuzating.',
      'Remove unconfirmed information and check the form of address again so it matches the relationship.',
      'Уберите непроверенную информацию и ещё раз проверьте обращение, чтобы оно соответствовало отношениям.',
    ),
    distractors: ['그대로제출해요', '추측을더넣어요', '호칭을지워요'],
    tags: ['unit-review', 'reply'],
    difficulty: 5,
  }),
};

export const S5_UNIT1_QUESTIONS = S5_UNIT1_BASE_QUESTIONS;

// ═══════════════════════════════════════════════════════════════
// NODE 1
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// WORDS · NODE 2
// 대학 수업 · 전공 · 성적 · 수강 신청 · 장학금
// ═══════════════════════════════════════════════════════════════

const S5_UNIT1_NODE2_WORDS = [
  {
    code: 'university-lecture',
    korean: '강의',
    senseKey: 'university-lecture-class',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '대학교에서 교수가 학생들에게 내용을 설명하고 가르치는 수업',
      uz: 'universitetda professor o‘tkazadigan ma’ruza yoki dars',
      en: 'university lecture; class',
      ru: 'лекция; университетское занятие',
    },
    examples: [
      {
        korean: '이번 학기에는 한국 문화 강의를 듣고 있어요.',
        translations: {
          ko: '이번 학기에 한국 문화에 대한 수업을 듣고 있어요.',
          uz: 'Bu semestrda Koreya madaniyati bo‘yicha ma’ruza tinglayapman.',
          en: 'I am taking a Korean culture lecture this semester.',
          ru: 'В этом семестре я посещаю лекцию по корейской культуре.',
        },
      },
    ],
    pronunciation: {
      hangul: '강의',
      romanization: 'gangui',
      ttsText: '강의',
    },
    media: {
      emoji: '👨‍🏫',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 강의실에서 진행되는 강의',
        uz: 'universitet auditoriyasidagi ma’ruza',
        en: 'a lecture in a university classroom',
        ru: 'лекция в университетской аудитории',
      },
    },
    tags: ['university-life', 'class', 'study'],
    difficulty: 4,
    usageNote: {
      ko: '`강의를 듣다`, `강의를 신청하다`처럼 많이 사용해요.',
      uz: 'Ko‘pincha `강의를 듣다` va `강의를 신청하다` shaklida ishlatiladi.',
      en: 'Common combinations include `강의를 듣다` and `강의를 신청하다`.',
      ru: 'Часто употребляется в сочетаниях `강의를 듣다` и `강의를 신청하다`.',
    },
    isCore: true,
  },
  {
    code: 'university-course-subject',
    korean: '과목',
    senseKey: 'academic-subject-course',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학교에서 배우는 각각의 공부 분야나 수업',
      uz: 'maktab yoki universitetda o‘qiladigan fan',
      en: 'subject; course',
      ru: 'предмет; учебный курс',
    },
    examples: [
      {
        korean: '이번 학기에는 다섯 과목을 신청했어요.',
        translations: {
          ko: '이번 학기에 다섯 개의 수업을 신청했어요.',
          uz: 'Bu semestrda beshta fanga yozildim.',
          en: 'I registered for five courses this semester.',
          ru: 'В этом семестре я записался на пять предметов.',
        },
      },
    ],
    pronunciation: {
      hangul: '과목',
      romanization: 'gwamok',
      ttsText: '과목',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: {
        ko: '여러 대학 과목이 적힌 시간표',
        uz: 'turli universitet fanlari yozilgan jadval',
        en: 'a timetable with several university courses',
        ru: 'расписание с несколькими университетскими предметами',
      },
    },
    tags: ['university-life', 'study', 'course'],
    difficulty: 4,
    usageNote: {
      ko: '`전공 과목`, `교양 과목`, `과목을 신청하다`처럼 사용해요.',
      uz: '`mutaxassislik fani`, `umumiy fan`, `fanga yozilmoq` kabi ishlatiladi.',
      en: 'Used in expressions such as major course, elective course, and register for a course.',
      ru: 'Употребляется в выражениях «профильный предмет», «общеобразовательный предмет», «записаться на курс».',
    },
    isCore: true,
  },
  {
    code: 'university-major',
    korean: '전공',
    senseKey: 'university-major-field',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '대학교에서 중심적으로 공부하는 전문 분야',
      uz: 'universitetda asosiy o‘rganiladigan mutaxassislik',
      en: 'major; field of study',
      ru: 'специальность; основное направление обучения',
    },
    examples: [
      {
        korean: '제 전공은 국제경영이고 한국어도 함께 공부하고 있어요.',
        translations: {
          ko: '저는 국제경영을 중심으로 공부하고 한국어도 배우고 있어요.',
          uz: 'Mening mutaxassisligim xalqaro biznes, koreys tilini ham o‘rganyapman.',
          en: 'My major is international business, and I am also studying Korean.',
          ru: 'Моя специальность — международный бизнес, и я также изучаю корейский язык.',
        },
      },
    ],
    pronunciation: {
      hangul: '전공',
      romanization: 'jeongong',
      ttsText: '전공',
    },
    media: {
      emoji: '🎯',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 전공을 선택하는 학생',
        uz: 'universitet mutaxassisligini tanlayotgan talaba',
        en: 'a student choosing a university major',
        ru: 'студент выбирает специальность',
      },
    },
    tags: ['university-life', 'major', 'study'],
    difficulty: 4,
    usageNote: {
      ko: '`전공이 뭐예요?`, `전공 과목`, `전공하다` 같은 표현으로 사용해요.',
      uz: '`Mutaxassisligingiz nima?`, `mutaxassislik fani` kabi ishlatiladi.',
      en: 'Common in expressions such as `What is your major?` and `major course`.',
      ru: 'Часто встречается в вопросе «Какая у вас специальность?» и выражении «профильный предмет».',
    },
    isCore: true,
  },
  {
    code: 'university-grade-result',
    korean: '성적',
    senseKey: 'academic-grade-result',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '시험이나 과제 등의 결과로 받은 평가',
      uz: 'imtihon yoki topshiriq natijasidagi baho',
      en: 'grade; academic result',
      ru: 'оценка; успеваемость',
    },
    examples: [
      {
        korean: '이번 학기에는 공부를 열심히 해서 성적이 많이 올랐어요.',
        translations: {
          ko: '이번 학기에 열심히 공부해서 평가 결과가 좋아졌어요.',
          uz: 'Bu semestrda ko‘p o‘qiganim uchun baholarim ancha yaxshilandi.',
          en: 'My grades improved a lot because I studied hard this semester.',
          ru: 'В этом семестре мои оценки значительно улучшились благодаря усердной учёбе.',
        },
      },
    ],
    pronunciation: {
      hangul: '성적',
      romanization: 'seongjeok',
      ttsText: '성적',
    },
    media: {
      emoji: '📈',
      imageUrl: '',
      imageAlt: {
        ko: '좋은 성적이 표시된 성적표',
        uz: 'yaxshi baholar ko‘rsatilgan natijalar varaqasi',
        en: 'a report showing good grades',
        ru: 'ведомость с хорошими оценками',
      },
    },
    tags: ['university-life', 'grade', 'study'],
    difficulty: 4,
    usageNote: {
      ko: '`성적이 좋다`, `성적이 오르다`, `성적을 받다`와 같이 사용해요.',
      uz: '`bahosi yaxshi`, `bahosi ko‘tarildi`, `baho olmoq` kabi ishlatiladi.',
      en: 'Common combinations include good grades, grades improve, and receive a grade.',
      ru: 'Часто употребляется со значениями «хорошие оценки», «оценки повысились», «получить оценку».',
    },
    isCore: true,
  },
  {
    code: 'university-credit',
    korean: '학점',
    senseKey: 'academic-credit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '대학교에서 과목을 이수했을 때 인정받는 공부의 단위',
      uz: 'universitetda fanni tugatganda olinadigan kredit birligi',
      en: 'academic credit',
      ru: 'учебный кредит; зачётная единица',
    },
    examples: [
      {
        korean: '졸업하려면 필요한 학점을 모두 받아야 해요.',
        translations: {
          ko: '졸업하기 위해서는 정해진 수의 학점을 채워야 해요.',
          uz: 'Bitirish uchun kerakli barcha kreditlarni olish kerak.',
          en: 'You must earn all required credits to graduate.',
          ru: 'Для выпуска нужно набрать все необходимые зачётные единицы.',
        },
      },
    ],
    pronunciation: {
      hangul: '학점',
      romanization: 'hakjeom',
      ttsText: '학점',
    },
    media: {
      emoji: '🔢',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 학점 현황표',
        uz: 'universitet kreditlari jadvali',
        en: 'university credit record',
        ru: 'таблица университетских кредитов',
      },
    },
    tags: ['university-life', 'credit', 'study'],
    difficulty: 5,
    usageNote: {
      ko: '`3학점짜리 과목`, `학점을 받다`, `학점을 채우다`라고 말해요.',
      uz: '`3 kreditli fan`, `kredit olmoq`, `kreditlarni to‘ldirmoq` kabi ishlatiladi.',
      en: 'Used in expressions such as a three-credit course, earn credits, and fulfill credits.',
      ru: 'Употребляется в выражениях «предмет на три кредита», «получить кредиты», «набрать нужные кредиты».',
    },
    isCore: true,
  },
  {
    code: 'university-scholarship',
    korean: '장학금',
    senseKey: 'student-scholarship-money',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학생의 공부를 돕기 위해 학교나 기관에서 주는 돈',
      uz: 'talabaning o‘qishiga yordam berish uchun beriladigan stipendiya',
      en: 'scholarship',
      ru: 'стипендия; грант на обучение',
    },
    examples: [
      {
        korean: '성적이 좋아서 다음 학기 장학금을 신청하려고 해요.',
        translations: {
          ko: '성적이 좋아서 다음 학기 공부 지원금을 신청할 계획이에요.',
          uz: 'Baholarim yaxshi bo‘lgani uchun keyingi semestr stipendiyasiga ariza bermoqchiman.',
          en: 'My grades are good, so I plan to apply for a scholarship next semester.',
          ru: 'У меня хорошие оценки, поэтому я собираюсь подать заявление на стипендию на следующий семестр.',
        },
      },
    ],
    pronunciation: {
      hangul: '장학금',
      romanization: 'janghakgeum',
      ttsText: '장학금',
    },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: {
        ko: '학생에게 지급되는 장학금',
        uz: 'talabaga berilayotgan stipendiya',
        en: 'a scholarship awarded to a student',
        ru: 'стипендия, предоставленная студенту',
      },
    },
    tags: ['university-life', 'scholarship', 'study'],
    difficulty: 4,
    usageNote: {
      ko: '`장학금을 받다`, `장학금을 신청하다`가 가장 자주 쓰여요.',
      uz: '`stipendiya olmoq` va `stipendiyaga ariza bermoq` juda ko‘p ishlatiladi.',
      en: 'The most common combinations are receive a scholarship and apply for a scholarship.',
      ru: 'Самые частые сочетания — «получить стипендию» и «подать заявление на стипендию».',
    },
    isCore: true,
  },
  {
    code: 'application-apply',
    korean: '지원하다',
    senseKey: 'apply-candidate',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '학교나 회사, 프로그램 등에 들어가기 위해 신청하다',
      uz: 'universitet, ish yoki dasturga kirish uchun ariza bermoq',
      en: 'to apply',
      ru: 'подавать заявление; поступать',
    },
    examples: [
      {
        korean: '졸업 후에 한국 대학원에 지원할 생각이에요.',
        translations: {
          ko: '졸업한 후 한국 대학원에 들어가기 위해 원서를 낼 생각이에요.',
          uz: 'Bitirgandan keyin Koreyadagi magistraturaga hujjat topshirmoqchiman.',
          en: 'I plan to apply to a graduate school in Korea after graduation.',
          ru: 'После выпуска я собираюсь поступать в корейскую магистратуру.',
        },
      },
    ],
    pronunciation: {
      hangul: '지원하다',
      romanization: 'jiwonhada',
      ttsText: '지원하다',
    },
    media: {
      emoji: '📨',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 지원서를 제출하는 학생',
        uz: 'universitetga ariza topshirayotgan talaba',
        en: 'a student submitting a university application',
        ru: 'студент подаёт заявление в университет',
      },
    },
    tags: ['application', 'university-life'],
    difficulty: 5,
    usageNote: {
      ko: '`대학교에 지원하다`, `회사에 지원하다`처럼 지원하는 기관 뒤에 `에`를 써요.',
      uz: '`universitetga ariza bermoq`, `kompaniyaga ariza bermoq` shaklida ishlatiladi.',
      en: 'The institution being applied to is commonly marked with `에`.',
      ru: 'Учреждение, куда подают заявление, обычно оформляется частицей `에`.',
    },
    isCore: true,
  },
  {
    code: 'exam-pass',
    korean: '합격하다',
    senseKey: 'pass-exam-selection',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '시험이나 심사에서 정해진 기준을 통과하다',
      uz: 'imtihon yoki tanlovdan muvaffaqiyatli o‘tmoq',
      en: 'to pass; to be accepted',
      ru: 'сдать; пройти отбор; быть принятым',
    },
    examples: [
      {
        korean: '한국어 능력 시험에 합격해서 정말 기뻤어요.',
        translations: {
          ko: '한국어 시험의 기준을 통과해서 정말 기뻤어요.',
          uz: 'Koreys tili imtihonidan o‘tganim uchun juda xursand bo‘ldim.',
          en: 'I was very happy to pass the Korean proficiency exam.',
          ru: 'Я очень обрадовался, когда сдал экзамен по корейскому языку.',
        },
      },
    ],
    pronunciation: {
      hangul: '합격하다',
      romanization: 'hapgyeokhada',
      ttsText: '합격하다',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: {
        ko: '시험 합격 결과를 확인하는 학생',
        uz: 'imtihondan o‘tganini tekshirayotgan talaba',
        en: 'a student checking a passing exam result',
        ru: 'студент смотрит результат успешно сданного экзамена',
      },
    },
    tags: ['exam', 'result', 'university-life'],
    difficulty: 4,
    usageNote: {
      ko: '`시험에 합격하다`, `대학교에 합격하다`처럼 사용해요.',
      uz: '`imtihondan o‘tmoq`, `universitetga qabul qilinmoq` kabi ishlatiladi.',
      en: 'Used for passing an exam or being accepted to a school.',
      ru: 'Используется при сдаче экзамена или поступлении в учебное заведение.',
    },
    isCore: true,
  },
  {
    code: 'application-submit-request',
    korean: '신청하다',
    senseKey: 'formally-request-register',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '어떤 것을 받거나 이용하기 위해 정해진 절차에 따라 요청하다',
      uz: 'biror narsani olish yoki foydalanish uchun rasmiy ravishda ariza bermoq',
      en: 'to apply for; to register for',
      ru: 'подавать заявку; регистрироваться',
    },
    examples: [
      {
        korean: '장학금은 이번 주 금요일까지 신청해야 해요.',
        translations: {
          ko: '장학금을 받고 싶으면 이번 주 금요일까지 신청서를 내야 해요.',
          uz: 'Stipendiyaga shu hafta juma kunigacha ariza berish kerak.',
          en: 'You have to apply for the scholarship by this Friday.',
          ru: 'Подать заявление на стипендию нужно до этой пятницы.',
        },
      },
    ],
    pronunciation: {
      hangul: '신청하다',
      romanization: 'sincheonghada',
      ttsText: '신청하다',
    },
    media: {
      emoji: '📝',
      imageUrl: '',
      imageAlt: {
        ko: '신청서를 작성하는 학생',
        uz: 'ariza to‘ldirayotgan talaba',
        en: 'a student filling out an application',
        ru: 'студент заполняет заявление',
      },
    },
    tags: ['application', 'registration'],
    difficulty: 4,
    usageNote: {
      ko: '`수강을 신청하다`, `장학금을 신청하다`, `참가를 신청하다`처럼 폭넓게 사용해요.',
      uz: 'Fan, stipendiya yoki tadbirga ariza berishda ishlatiladi.',
      en: 'Used broadly for course registration, scholarships, and event applications.',
      ru: 'Широко используется при регистрации на курсы, стипендии и мероприятия.',
    },
    isCore: true,
  },
  {
    code: 'membership-join',
    korean: '가입하다',
    senseKey: 'join-membership-group',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '단체나 모임의 구성원이 되다',
      uz: 'guruh yoki tashkilotga a’zo bo‘lmoq',
      en: 'to join; to become a member',
      ru: 'вступать; становиться членом',
    },
    examples: [
      {
        korean: '사진 동아리에 가입해서 선배들과 자주 만나고 있어요.',
        translations: {
          ko: '사진 동아리의 회원이 되어 선배들과 자주 만나고 있어요.',
          uz: 'Fotosurat klubiga qo‘shilib, yuqori kurs talabalari bilan tez-tez uchrashyapman.',
          en: 'I joined the photography club and often meet the senior members.',
          ru: 'Я вступил в фотоклуб и часто встречаюсь со старшими участниками.',
        },
      },
    ],
    pronunciation: {
      hangul: '가입하다',
      romanization: 'gaiphada',
      ttsText: '가입하다',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: {
        ko: '학생 동아리에 새로 가입하는 학생',
        uz: 'talabalar klubiga yangi qo‘shilayotgan talaba',
        en: 'a student joining a campus club',
        ru: 'студент вступает в университетский клуб',
      },
    },
    tags: ['club', 'membership'],
    difficulty: 4,
    usageNote: {
      ko: '`동아리에 가입하다`처럼 가입하는 단체 뒤에 `에`를 써요.',
      uz: 'A’zo bo‘linadigan guruhdan keyin `에` ishlatiladi.',
      en: 'The group being joined is commonly marked with `에`.',
      ru: 'Группа, в которую вступают, обычно оформляется частицей `에`.',
    },
    isCore: true,
  },
  {
    code: 'event-participate',
    korean: '참가하다',
    senseKey: 'participate-competition-event',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '대회나 행사 등의 활동에 직접 들어가 함께하다',
      uz: 'tanlov yoki tadbirda bevosita qatnashmoq',
      en: 'to participate',
      ru: 'участвовать',
    },
    examples: [
      {
        korean: '친구들과 학교 체육 대회에 참가하기로 했어요.',
        translations: {
          ko: '친구들과 함께 학교 체육 대회에 직접 참여하기로 했어요.',
          uz: 'Do‘stlarim bilan universitet sport musobaqasida qatnashishga qaror qildik.',
          en: 'My friends and I decided to participate in the school sports competition.',
          ru: 'Мы с друзьями решили участвовать в университетских спортивных соревнованиях.',
        },
      },
    ],
    pronunciation: {
      hangul: '참가하다',
      romanization: 'chamgahada',
      ttsText: '참가하다',
    },
    media: {
      emoji: '🏃',
      imageUrl: '',
      imageAlt: {
        ko: '학교 대회에 참가하는 학생들',
        uz: 'universitet musobaqasida qatnashayotgan talabalar',
        en: 'students participating in a school competition',
        ru: 'студенты участвуют в университетском соревновании',
      },
    },
    tags: ['event', 'competition', 'participation'],
    difficulty: 4,
    usageNote: {
      ko: '`대회에 참가하다`, `행사에 참가하다`와 같이 사용해요.',
      uz: '`musobaqada qatnashmoq`, `tadbirda qatnashmoq` kabi ishlatiladi.',
      en: 'Common with competitions and participatory events.',
      ru: 'Часто употребляется с конкурсами, соревнованиями и мероприятиями.',
    },
    isCore: true,
  },
  {
    code: 'exam-take',
    korean: '시험을 보다',
    senseKey: 'take-an-exam',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '시험 문제를 풀어 평가를 받다',
      uz: 'imtihon topshirmoq',
      en: 'to take an exam',
      ru: 'сдавать экзамен',
    },
    examples: [
      {
        korean: '다음 주에 전공 시험을 두 개나 봐야 해요.',
        translations: {
          ko: '다음 주에 전공 과목 시험을 두 번 치러야 해요.',
          uz: 'Keyingi hafta ikkita mutaxassislik imtihonini topshirishim kerak.',
          en: 'I have to take two major exams next week.',
          ru: 'На следующей неделе мне нужно сдавать два экзамена по специальности.',
        },
      },
    ],
    pronunciation: {
      hangul: '시험을 보다',
      romanization: 'siheomeul boda',
      ttsText: '시험을 보다',
    },
    media: {
      emoji: '🧑‍💻',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 시험을 보는 학생',
        uz: 'universitet imtihonini topshirayotgan talaba',
        en: 'a student taking a university exam',
        ru: 'студент сдаёт университетский экзамен',
      },
    },
    tags: ['exam', 'study'],
    difficulty: 4,
    usageNote: {
      ko: '한국어에서는 시험을 `하다`보다 `시험을 보다`라고 자주 말해요.',
      uz: 'Koreys tilida imtihon topshirish uchun ko‘pincha `시험을 보다` ishlatiladi.',
      en: 'Korean commonly uses `시험을 보다` for “take an exam.”',
      ru: 'В корейском для «сдавать экзамен» часто используется `시험을 보다`.',
    },
    isCore: true,
  },
  {
    code: 'university-course-taking',
    korean: '수강',
    senseKey: 'taking-academic-course',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학교나 기관의 강의를 신청해서 듣는 것',
      uz: 'kurs yoki darsga yozilib uni o‘qish',
      en: 'course enrollment; taking a course',
      ru: 'посещение курса; обучение на курсе',
    },
    examples: [
      {
        korean: '학생들이 많이 신청한 과목은 수강 인원을 늘렸어요.',
        translations: {
          ko: '신청자가 많은 과목은 수업을 들을 수 있는 학생 수를 늘렸어요.',
          uz: 'Ko‘p talabalar yozilgan fan uchun tinglovchilar soni oshirildi.',
          en: 'The enrollment limit was increased for the course with many applicants.',
          ru: 'Для популярного предмета увеличили количество мест.',
        },
      },
    ],
    pronunciation: {
      hangul: '수강',
      romanization: 'sugang',
      ttsText: '수강',
    },
    media: {
      emoji: '🏫',
      imageUrl: '',
      imageAlt: {
        ko: '대학교 수업을 듣는 학생들',
        uz: 'universitet darsini tinglayotgan talabalar',
        en: 'students taking a university course',
        ru: 'студенты на университетском курсе',
      },
    },
    tags: ['course', 'registration', 'study'],
    difficulty: 5,
    usageNote: {
      ko: '`수강 신청`, `수강 인원`, `수강 과목` 같은 표현에서 자주 사용해요.',
      uz: '`kursga yozilish`, `tinglovchilar soni`, `olingan fan` kabi birikmalarda ishlatiladi.',
      en: 'Common in expressions such as course registration and enrollment capacity.',
      ru: 'Часто встречается в выражениях «регистрация на курс» и «число слушателей».',
    },
    isCore: true,
  },
  {
    code: 'university-take-course',
    korean: '수강하다',
    senseKey: 'take-enrolled-course',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '신청한 강의나 과목의 수업을 듣다',
      uz: 'yozilgan kurs yoki fanni o‘qimoq',
      en: 'to take a course',
      ru: 'проходить курс; посещать занятия',
    },
    examples: [
      {
        korean: '친구가 추천한 철학 강의를 이번 학기에 수강하고 있어요.',
        translations: {
          ko: '친구가 추천한 철학 수업을 이번 학기에 듣고 있어요.',
          uz: 'Bu semestrda do‘stim tavsiya qilgan falsafa kursini o‘qiyapman.',
          en: 'I am taking the philosophy lecture my friend recommended this semester.',
          ru: 'В этом семестре я посещаю курс философии, который посоветовал друг.',
        },
      },
    ],
    pronunciation: {
      hangul: '수강하다',
      romanization: 'suganghada',
      ttsText: '수강하다',
    },
    media: {
      emoji: '🧑‍🏫',
      imageUrl: '',
      imageAlt: {
        ko: '신청한 대학 강의를 수강하는 학생',
        uz: 'yozilgan universitet kursida o‘qiyotgan talaba',
        en: 'a student taking an enrolled university course',
        ru: 'студент посещает выбранный университетский курс',
      },
    },
    tags: ['course', 'study'],
    difficulty: 5,
    usageNote: {
      ko: '`강의를 듣다`보다 조금 더 공식적인 표현이에요.',
      uz: '`강의를 듣다`ga qaraganda rasmiyroq ifoda.',
      en: 'It is somewhat more formal than simply saying `강의를 듣다`.',
      ru: 'Это немного более официальное выражение, чем `강의를 듣다`.',
    },
    isCore: false,
  },
  {
    code: 'university-course-registration',
    korean: '수강 신청',
    senseKey: 'course-registration',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '다음 학기에 들을 과목을 정해서 학교 시스템에 등록하는 것',
      uz: 'keyingi semestrda o‘qiladigan fanlarni tizim orqali tanlab ro‘yxatdan o‘tkazish',
      en: 'course registration',
      ru: 'регистрация на учебные курсы',
    },
    examples: [
      {
        korean: '인기 있는 강의는 수강 신청이 빨리 끝나는 경우가 많아요.',
        translations: {
          ko: '학생들이 좋아하는 강의는 신청 가능한 자리가 빨리 없어져요.',
          uz: 'Mashhur kurslarda ro‘yxatdan o‘tish joylari tez tugaydi.',
          en: 'Registration often closes quickly for popular classes.',
          ru: 'На популярные курсы места при регистрации часто заканчиваются очень быстро.',
        },
      },
    ],
    pronunciation: {
      hangul: '수강 신청',
      romanization: 'sugang sincheong',
      ttsText: '수강 신청',
    },
    media: {
      emoji: '💻',
      imageUrl: '',
      imageAlt: {
        ko: '컴퓨터로 수강 신청을 하는 학생',
        uz: 'kompyuterda kurslarga yozilayotgan talaba',
        en: 'a student registering for classes on a computer',
        ru: 'студент регистрируется на курсы через компьютер',
      },
    },
    tags: ['course', 'registration'],
    difficulty: 5,
    usageNote: {
      ko: '`수강 신청을 하다`, `수강 신청 기간`이라고 많이 말해요.',
      uz: '`kursga yozilmoq`, `kursga yozilish davri` kabi ishlatiladi.',
      en: 'Common expressions include register for courses and registration period.',
      ru: 'Часто употребляется в выражениях «зарегистрироваться на курсы» и «период регистрации».',
    },
    isCore: true,
  },
  {
    code: 'popularity-be-high',
    korean: '인기가 많다',
    senseKey: 'be-popular',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '많은 사람이 좋아하거나 관심을 가지다',
      uz: 'ko‘p odamlar orasida mashhur va talabgir bo‘lmoq',
      en: 'to be popular',
      ru: 'пользоваться популярностью',
    },
    examples: [
      {
        korean: '그 교수님의 한국 문화 강의는 학생들에게 인기가 많아요.',
        translations: {
          ko: '그 교수님의 수업을 좋아하고 듣고 싶어 하는 학생이 많아요.',
          uz: 'O‘sha professorning Koreya madaniyati kursi talabalar orasida juda mashhur.',
          en: 'That professor’s Korean culture lecture is very popular among students.',
          ru: 'Лекция этого профессора по корейской культуре очень популярна среди студентов.',
        },
      },
    ],
    pronunciation: {
      hangul: '인기가 많다',
      romanization: 'ingiga manta',
      ttsText: '인기가 많다',
    },
    media: {
      emoji: '🔥',
      imageUrl: '',
      imageAlt: {
        ko: '많은 학생이 신청하는 인기 강의',
        uz: 'ko‘p talabalar yozilayotgan mashhur kurs',
        en: 'a popular course with many students registering',
        ru: 'популярный курс с большим количеством желающих',
      },
    },
    tags: ['course', 'popularity'],
    difficulty: 5,
    usageNote: {
      ko: '사람, 상품, 장소, 강의 등 매우 다양한 대상에 사용할 수 있어요.',
      uz: 'Odam, mahsulot, joy yoki kurs kabi turli narsalarga ishlatiladi.',
      en: 'It can describe people, products, places, courses, and many other things.',
      ru: 'Можно употреблять по отношению к людям, товарам, местам, курсам и многому другому.',
    },
    isCore: false,
  },
  {
    code: 'academic-philosophy',
    korean: '철학',
    senseKey: 'academic-philosophy',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '인간과 세계, 지식과 가치 등에 대해 깊이 생각하는 학문',
      uz: 'inson, dunyo, bilim va qadriyatlar haqida o‘rganuvchi falsafa fani',
      en: 'philosophy',
      ru: 'философия',
    },
    examples: [
      {
        korean: '친구가 철학의 이해라는 강의가 재미있다고 했어요.',
        translations: {
          ko: '친구가 `철학의 이해` 수업이 재미있다고 말했어요.',
          uz: 'Do‘stim “Falsafani tushunish” kursi qiziq ekanini aytdi.',
          en: 'My friend said the Understanding Philosophy course was interesting.',
          ru: 'Друг сказал, что курс «Введение в философию» интересный.',
        },
      },
    ],
    pronunciation: {
      hangul: '철학',
      romanization: 'cheolhak',
      ttsText: '철학',
    },
    media: {
      emoji: '🤔',
      imageUrl: '',
      imageAlt: {
        ko: '철학 책과 생각하는 학생',
        uz: 'falsafa kitobi va o‘ylanayotgan talaba',
        en: 'a philosophy book and a student thinking',
        ru: 'книга по философии и размышляющий студент',
      },
    },
    tags: ['academic-subject', 'course'],
    difficulty: 5,
    usageNote: {
      ko: '대학교 교양 과목 이름에도 자주 들어가요.',
      uz: 'Universitetdagi umumiy fan nomlarida ham tez-tez uchraydi.',
      en: 'It frequently appears in the names of university liberal-arts courses.',
      ru: 'Часто встречается в названиях университетских общеобразовательных курсов.',
    },
    isCore: false,
  },
  {
    code: 'academic-understanding',
    korean: '이해',
    senseKey: 'understanding-comprehension',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '내용이나 의미를 알고 파악하는 것',
      uz: 'mazmun yoki ma’noni tushunish',
      en: 'understanding; comprehension',
      ru: 'понимание',
    },
    examples: [
      {
        korean: '한국 사회에 대한 이해를 높이고 싶어서 이 강의를 신청했어요.',
        translations: {
          ko: '한국 사회를 더 잘 알고 싶어서 이 수업을 신청했어요.',
          uz: 'Koreya jamiyatini yaxshiroq tushunish uchun bu kursga yozildim.',
          en: 'I registered for this course to improve my understanding of Korean society.',
          ru: 'Я записался на этот курс, чтобы лучше понимать корейское общество.',
        },
      },
    ],
    pronunciation: {
      hangul: '이해',
      romanization: 'ihae',
      ttsText: '이해',
    },
    media: {
      emoji: '💡',
      imageUrl: '',
      imageAlt: {
        ko: '내용을 이해한 학생',
        uz: 'mavzuni tushungan talaba',
        en: 'a student understanding a concept',
        ru: 'студент понял материал',
      },
    },
    tags: ['academic', 'understanding'],
    difficulty: 5,
    usageNote: {
      ko: '`이해하다`, `이해가 되다`, `이해를 높이다`처럼 사용할 수 있어요.',
      uz: '`tushunmoq`, `tushunarli bo‘lmoq`, `tushunishni oshirmoq` kabi ishlatiladi.',
      en: 'Related expressions include understand, make sense, and improve understanding.',
      ru: 'Связанные выражения: «понимать», «быть понятным», «углублять понимание».',
    },
    isCore: false,
  },
  {
    code: 'academic-society',
    korean: '사회',
    senseKey: 'society-community-academic',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '사람들이 함께 살아가며 관계를 이루는 공동체',
      uz: 'odamlar birga yashab, munosabatlar o‘rnatadigan jamiyat',
      en: 'society',
      ru: 'общество',
    },
    examples: [
      {
        korean: '외국인 학생을 위한 한국 사회와 문화 강의가 있어요.',
        translations: {
          ko: '외국인 학생이 한국 사회와 문화를 배울 수 있는 강의가 있어요.',
          uz: 'Xorijiy talabalar uchun Koreya jamiyati va madaniyati kursi bor.',
          en: 'There is a Korean society and culture course for international students.',
          ru: 'Есть курс по корейскому обществу и культуре для иностранных студентов.',
        },
      },
    ],
    pronunciation: {
      hangul: '사회',
      romanization: 'sahoe',
      ttsText: '사회',
    },
    media: {
      emoji: '🌐',
      imageUrl: '',
      imageAlt: {
        ko: '다양한 사람들이 함께 살아가는 사회',
        uz: 'turli odamlar birga yashayotgan jamiyat',
        en: 'a society made up of many people',
        ru: 'общество, состоящее из разных людей',
      },
    },
    tags: ['academic-subject', 'society'],
    difficulty: 5,
    usageNote: {
      ko: '`한국 사회`, `현대 사회`, `사회 문제`처럼 많이 사용해요.',
      uz: '`Koreya jamiyati`, `zamonaviy jamiyat`, `ijtimoiy muammo` kabi ishlatiladi.',
      en: 'Common combinations include Korean society, modern society, and social issues.',
      ru: 'Частые сочетания: «корейское общество», «современное общество», «социальная проблема».',
    },
    isCore: false,
  },
  {
    code: 'idiom-stars-in-sky',
    korean: '하늘의 별 따기',
    senseKey: 'extremely-difficult-task',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '어떤 일이 성공하기 매우 어렵다는 뜻의 비유적인 표현',
      uz: 'biror ishni bajarish nihoyatda qiyinligini bildiradigan ibora',
      en: 'an almost impossible task',
      ru: 'чрезвычайно трудное дело; почти невозможно',
    },
    examples: [
      {
        korean: '인기 강의에 자리를 잡는 것은 하늘의 별 따기예요.',
        translations: {
          ko: '인기 강의를 신청하는 것은 정말 어려워요.',
          uz: 'Mashhur kursdan joy olish nihoyatda qiyin.',
          en: 'Getting a seat in a popular course is almost impossible.',
          ru: 'Получить место на популярном курсе почти невозможно.',
        },
      },
    ],
    pronunciation: {
      hangul: '하늘의 별 따기',
      romanization: 'haneurui byeol ttagi',
      ttsText: '하늘의 별 따기',
    },
    media: {
      emoji: '⭐',
      imageUrl: '',
      imageAlt: {
        ko: '하늘의 별을 잡으려고 하는 모습',
        uz: 'osmondagi yulduzni olishga urinayotgan odam',
        en: 'someone trying to reach a star in the sky',
        ru: 'человек пытается достать звезду с неба',
      },
    },
    tags: ['idiom', 'difficulty', 'course-registration'],
    difficulty: 5,
    usageNote: {
      ko: '실제로 별을 딴다는 뜻이 아니라 `매우 어렵다`는 뜻이에요.',
      uz: 'Bu haqiqatan yulduz olish emas, `juda qiyin` degan ko‘chma ma’no.',
      en: 'It is figurative and means that something is extremely difficult.',
      ru: 'Это образное выражение со значением «очень трудно».',
    },
    isCore: false,
  },
  {
    code: 'language-german',
    korean: '독일어',
    senseKey: 'german-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '독일 등에서 사용하는 언어',
      uz: 'nemis tili',
      en: 'German language',
      ru: 'немецкий язык',
    },
    examples: [
      {
        korean: '이번 학기에는 외국어 과목으로 독일어를 신청했어요.',
        translations: {
          ko: '이번 학기에 외국어 수업으로 독일어를 선택했어요.',
          uz: 'Bu semestrda xorijiy til fani sifatida nemis tiliga yozildim.',
          en: 'I registered for German as my foreign-language course this semester.',
          ru: 'В этом семестре я выбрал немецкий язык как иностранный.',
        },
      },
    ],
    pronunciation: {
      hangul: '독일어',
      romanization: 'dogireo',
      ttsText: '독일어',
    },
    media: {
      emoji: '🇩🇪',
      imageUrl: '',
      imageAlt: {
        ko: '독일어 수업',
        uz: 'nemis tili darsi',
        en: 'German language class',
        ru: 'занятие немецкого языка',
      },
    },
    tags: ['foreign-language', 'course'],
    difficulty: 4,
    usageNote: {
      ko: '대학교 외국어 과목의 예로 사용할 수 있어요.',
      uz: 'Universitetdagi xorijiy til faniga misol sifatida ishlatiladi.',
      en: 'It can be used as an example of a university foreign-language course.',
      ru: 'Может выступать примером университетского курса иностранного языка.',
    },
    isCore: false,
  },
  {
    code: 'language-arabic',
    korean: '아랍어',
    senseKey: 'arabic-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '여러 아랍 국가에서 사용하는 언어',
      uz: 'arab tili',
      en: 'Arabic language',
      ru: 'арабский язык',
    },
    examples: [
      {
        korean: '아랍어 수업도 있지만 저는 독일어를 들어 볼 생각이에요.',
        translations: {
          ko: '아랍어 강의도 있지만 저는 독일어 강의를 선택하려고 해요.',
          uz: 'Arab tili kursi ham bor, lekin men nemis tilini tanlamoqchiman.',
          en: 'There is also an Arabic course, but I plan to take German.',
          ru: 'Есть также курс арабского, но я собираюсь выбрать немецкий.',
        },
      },
    ],
    pronunciation: {
      hangul: '아랍어',
      romanization: 'arabeo',
      ttsText: '아랍어',
    },
    media: {
      emoji: '🗣️',
      imageUrl: '',
      imageAlt: {
        ko: '아랍어 수업',
        uz: 'arab tili darsi',
        en: 'Arabic language class',
        ru: 'занятие арабского языка',
      },
    },
    tags: ['foreign-language', 'course'],
    difficulty: 4,
    usageNote: {
      ko: '교재에서는 외국어 수업 선택의 예로 나와요.',
      uz: 'Darslikda xorijiy til kursini tanlash misolida ishlatiladi.',
      en: 'It appears in the textbook as an example of a foreign-language course.',
      ru: 'В учебнике встречается как пример курса иностранного языка.',
    },
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

// ═══════════════════════════════════════════════════════════════
// WORDS · NODE 3
// 한국 유학 생활 안내
// ═══════════════════════════════════════════════════════════════

const S5_UNIT1_NODE3_WORDS = [
  {
    code: 'study-abroad-life',
    korean: '유학 생활',
    senseKey: 'life-while-studying-abroad',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '외국에서 공부하면서 하는 생활',
      uz: 'chet elda o‘qish davridagi hayot',
      en: 'life while studying abroad',
      ru: 'жизнь во время учёбы за границей',
    },
    examples: [
      {
        korean: '한국 유학 생활을 시작하기 전에 필요한 정보를 미리 알아봤어요.',
        translations: {
          ko: '한국에서 공부하며 생활하기 전에 필요한 정보를 미리 확인했어요.',
          uz: 'Koreyada o‘qish hayotini boshlashdan oldin kerakli ma’lumotlarni tekshirdim.',
          en: 'I checked the necessary information before starting my study-abroad life in Korea.',
          ru: 'Перед началом учёбы в Корее я заранее проверил необходимую информацию.',
        },
      },
    ],
    pronunciation: {
      hangul: '유학 생활',
      romanization: 'yuhak saenghwal',
      ttsText: '유학 생활',
    },
    media: {
      emoji: '🌏',
      imageUrl: '',
      imageAlt: {
        ko: '외국에서 대학생활을 하는 유학생',
        uz: 'chet elda universitetda o‘qiyotgan talaba',
        en: 'an international student studying abroad',
        ru: 'иностранный студент, учащийся за границей',
      },
    },
    tags: ['study-abroad', 'daily-life'],
    difficulty: 4,
    usageNote: {
      ko: '`한국 유학 생활`, `유학 생활에 적응하다`처럼 사용해요.',
      uz: '`Koreyada o‘qish hayoti`, `chet eldagi hayotga moslashmoq` kabi ishlatiladi.',
      en: 'Common expressions include Korean study-abroad life and adapting to life abroad.',
      ru: 'Часто употребляется в выражениях о жизни и адаптации во время учёбы за границей.',
    },
    isCore: true,
  },
  {
    code: 'international-student',
    korean: '유학생',
    senseKey: 'student-studying-abroad',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '자기 나라를 떠나 외국에서 공부하는 학생',
      uz: 'chet davlatda o‘qiyotgan talaba',
      en: 'international student',
      ru: 'иностранный студент',
    },
    examples: [
      {
        korean:
          '처음 한국에 온 유학생들은 생활 정보를 미리 확인하는 것이 좋아요.',
        translations: {
          ko: '한국에 처음 온 외국 학생은 생활 정보를 알아두는 것이 좋아요.',
          uz: 'Koreyaga yangi kelgan xorijiy talabalar kundalik ma’lumotlarni oldindan bilib olishlari yaxshi.',
          en: 'International students new to Korea should check practical information in advance.',
          ru: 'Иностранным студентам, впервые приехавшим в Корею, полезно заранее узнать бытовую информацию.',
        },
      },
    ],
    pronunciation: {
      hangul: '유학생',
      romanization: 'yuhaksaeng',
      ttsText: '유학생',
    },
    media: {
      emoji: '🧑‍🎓',
      imageUrl: '',
      imageAlt: {
        ko: '외국 대학에서 공부하는 유학생',
        uz: 'xorijiy universitetda o‘qiyotgan talaba',
        en: 'international student at a university',
        ru: 'иностранный студент в университете',
      },
    },
    tags: ['study-abroad', 'student'],
    difficulty: 4,
    usageNote: {
      ko: '`외국인 유학생`이라고 더 구체적으로 말하기도 해요.',
      uz: 'Aniqroq aytganda `외국인 유학생` ham ishlatiladi.',
      en: '`외국인 유학생` is also used when explicitly emphasizing foreign students.',
      ru: 'Для уточнения также употребляется выражение `외국인 유학생`.',
    },
    isCore: true,
  },
  {
    code: 'immigration-enter-country',
    korean: '입국하다',
    senseKey: 'enter-country',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '다른 나라 안으로 들어오다',
      uz: 'boshqa davlat hududiga kirib kelmoq',
      en: 'to enter a country',
      ru: 'въезжать в страну',
    },
    examples: [
      {
        korean: '한국에 입국한 뒤 필요한 행정 절차를 확인했어요.',
        translations: {
          ko: '한국에 들어온 후 필요한 행정 절차를 알아봤어요.',
          uz: 'Koreyaga kirganimdan keyin kerakli ma’muriy jarayonlarni tekshirdim.',
          en: 'After entering Korea, I checked the required administrative procedures.',
          ru: 'После въезда в Корею я проверил необходимые административные процедуры.',
        },
      },
    ],
    pronunciation: {
      hangul: '입국하다',
      romanization: 'ipgukhada',
      ttsText: '입국하다',
    },
    media: {
      emoji: '🛬',
      imageUrl: '',
      imageAlt: {
        ko: '비행기에서 내려 다른 나라에 입국하는 사람',
        uz: 'samolyotdan tushib boshqa davlatga kirayotgan odam',
        en: 'a traveler entering another country',
        ru: 'путешественник въезжает в другую страну',
      },
    },
    tags: ['immigration', 'study-abroad'],
    difficulty: 5,
    usageNote: {
      ko: '반대말은 나라 밖으로 나가는 `출국하다`예요.',
      uz: 'Qarama-qarshi ma’nosi mamlakatdan chiqish — `출국하다`.',
      en: 'The opposite is `출국하다`, meaning to leave a country.',
      ru: 'Противоположное слово — `출국하다`, выезжать из страны.',
    },
    isCore: true,
  },
  {
    code: 'foreigner-registration',
    korean: '외국인 등록',
    senseKey: 'foreigner-administrative-registration',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '외국인이 한국에서 체류하기 위해 필요한 정보를 공식적으로 등록하는 절차',
      uz: 'xorijlikning Koreyada yashashi uchun rasmiy ro‘yxatdan o‘tish jarayoni',
      en: 'foreigner registration',
      ru: 'регистрация иностранца',
    },
    examples: [
      {
        korean: '입국한 뒤에는 외국인 등록이 필요한지 확인해야 해요.',
        translations: {
          ko: '한국에 들어온 후 외국인 등록 절차가 필요한지 확인해야 해요.',
          uz: 'Koreyaga kirgandan keyin xorijlik sifatida ro‘yxatdan o‘tish kerakligini tekshirish kerak.',
          en: 'After entering Korea, you should check whether foreigner registration is required.',
          ru: 'После въезда в Корею нужно проверить необходимость регистрации иностранца.',
        },
      },
    ],
    pronunciation: {
      hangul: '외국인 등록',
      romanization: 'oegugin deungnok',
      ttsText: '외국인 등록',
    },
    media: {
      emoji: '🪪',
      imageUrl: '',
      imageAlt: {
        ko: '외국인 등록 절차를 진행하는 모습',
        uz: 'xorijlikni ro‘yxatdan o‘tkazish jarayoni',
        en: 'foreigner registration procedure',
        ru: 'процедура регистрации иностранца',
      },
    },
    tags: ['immigration', 'registration'],
    difficulty: 5,
    usageNote: {
      ko: '행정 절차를 말할 때 `외국인 등록을 하다`라고 많이 표현해요.',
      uz: 'Jarayon haqida gapirganda ko‘pincha `외국인 등록을 하다` ishlatiladi.',
      en: 'The common verb phrase is `외국인 등록을 하다`.',
      ru: 'Обычно употребляется выражение `외국인 등록을 하다`.',
    },
    isCore: true,
  },
  {
    code: 'foreigner-registration-card',
    korean: '외국인등록증',
    senseKey: 'foreigner-registration-card',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '외국인 등록을 한 사람에게 발급되는 신분 확인용 증명서',
      uz: 'xorijlik ro‘yxatdan o‘tgandan keyin beriladigan shaxsni tasdiqlovchi hujjat',
      en: 'foreigner registration card',
      ru: 'регистрационная карта иностранца',
    },
    examples: [
      {
        korean:
          '외국인등록증은 중요한 신분증이므로 잃어버리지 않도록 주의해야 해요.',
        translations: {
          ko: '외국인등록증은 중요한 신분 확인 서류라서 잘 보관해야 해요.',
          uz: 'Xorijlik kartasi muhim hujjat bo‘lgani uchun uni ehtiyot qilish kerak.',
          en: 'A foreigner registration card is important identification, so it should be kept safely.',
          ru: 'Регистрационная карта иностранца — важный документ, поэтому её нужно хранить бережно.',
        },
      },
    ],
    pronunciation: {
      hangul: '외국인등록증',
      romanization: 'oegugin deungnokjeung',
      ttsText: '외국인등록증',
    },
    media: {
      emoji: '🪪',
      imageUrl: '',
      imageAlt: {
        ko: '외국인등록증 형태의 신분증',
        uz: 'xorijlik ro‘yxat kartasi',
        en: 'foreigner registration identification card',
        ru: 'регистрационная карта иностранца',
      },
    },
    tags: ['immigration', 'identification'],
    difficulty: 5,
    usageNote: {
      ko: '`외국인 등록`은 절차이고 `외국인등록증`은 그와 관련된 증명서를 말해요.',
      uz: '`외국인 등록` — jarayon, `외국인등록증` esa hujjat.',
      en: '`외국인 등록` is the process; `외국인등록증` refers to the identification document.',
      ru: '`외국인 등록` — процедура, а `외국인등록증` — документ.',
    },
    isCore: true,
  },
  {
    code: 'immigration-office',
    korean: '출입국관리사무소',
    senseKey: 'immigration-office',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '외국인의 출입국과 체류 관련 업무를 처리하는 기관',
      uz: 'chet elliklarning kirish-chiqishi va yashash masalalarini ko‘radigan idora',
      en: 'immigration office',
      ru: 'иммиграционная служба',
    },
    examples: [
      {
        korean: '필요한 서류를 준비한 뒤 출입국관리사무소에 갔어요.',
        translations: {
          ko: '필요한 문서를 준비해서 출입국 관련 기관에 갔어요.',
          uz: 'Kerakli hujjatlarni tayyorlab immigratsiya idorasiga bordim.',
          en: 'I prepared the required documents and went to the immigration office.',
          ru: 'Я подготовил необходимые документы и пошёл в иммиграционную службу.',
        },
      },
    ],
    pronunciation: {
      hangul: '출입국관리사무소',
      romanization: 'churipguk gwalli samuso',
      ttsText: '출입국관리사무소',
    },
    media: {
      emoji: '🏢',
      imageUrl: '',
      imageAlt: {
        ko: '출입국 관련 업무를 처리하는 공공기관',
        uz: 'immigratsiya xizmatlari ko‘rsatiladigan davlat idorasi',
        en: 'government immigration office',
        ru: 'государственная иммиграционная служба',
      },
    },
    tags: ['immigration', 'public-service'],
    difficulty: 5,
    usageNote: {
      ko: '긴 단어이므로 `출입국`, `관리`, `사무소`의 의미를 나누어 이해하면 쉬워요.',
      uz: 'Uzun so‘z bo‘lgani uchun uni `출입국`, `관리`, `사무소` qismlariga bo‘lib tushunish osonroq.',
      en: 'It is easier to understand when broken into 출입국, 관리, and 사무소.',
      ru: 'Длинное слово легче понять, разделив его на 출입국, 관리 и 사무소.',
    },
    isCore: true,
  },
  {
    code: 'housing-accommodation',
    korean: '숙소',
    senseKey: 'temporary-or-student-accommodation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '일정 기간 머물면서 생활하는 곳',
      uz: 'ma’lum vaqt yashab turiladigan joy',
      en: 'accommodation; lodging',
      ru: 'жильё; место проживания',
    },
    examples: [
      {
        korean: '한국에 오기 전에 학교 근처 숙소를 미리 알아봤어요.',
        translations: {
          ko: '한국에 오기 전 학교 주변에 살 곳을 미리 찾아봤어요.',
          uz: 'Koreyaga kelishdan oldin universitet yaqinidagi turar joyni qidirdim.',
          en: 'I looked for accommodation near the university before coming to Korea.',
          ru: 'Перед приездом в Корею я заранее искал жильё рядом с университетом.',
        },
      },
    ],
    pronunciation: {
      hangul: '숙소',
      romanization: 'sukso',
      ttsText: '숙소',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: {
        ko: '유학생이 머무는 숙소',
        uz: 'xorijiy talaba yashaydigan turar joy',
        en: 'accommodation for an international student',
        ru: 'жильё иностранного студента',
      },
    },
    tags: ['housing', 'study-abroad'],
    difficulty: 4,
    usageNote: {
      ko: '기숙사, 하숙집, 원룸 등 여러 형태의 머무는 곳을 넓게 말할 수 있어요.',
      uz: 'Yotoqxona, ijara xonasi va boshqa turar joylarni umumiy ifodalashi mumkin.',
      en: 'It broadly covers dormitories, rented rooms, and other places to stay.',
      ru: 'Общее слово для общежития, съёмной комнаты и других видов проживания.',
    },
    isCore: true,
  },
  {
    code: 'university-dormitory',
    korean: '기숙사',
    senseKey: 'student-dormitory',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학생들이 학교 안이나 근처에서 함께 생활하는 주거 시설',
      uz: 'talabalar birga yashaydigan yotoqxona',
      en: 'dormitory',
      ru: 'общежитие',
    },
    examples: [
      {
        korean: '학교 기숙사에 살고 싶어서 신청 기간을 확인했어요.',
        translations: {
          ko: '학교에서 운영하는 기숙사에 들어가려고 신청 일정을 확인했어요.',
          uz: 'Universitet yotoqxonasida yashamoqchi bo‘lib, ariza muddatini tekshirdim.',
          en: 'I checked the application period because I wanted to live in the university dormitory.',
          ru: 'Я проверил сроки подачи заявления, потому что хотел жить в университетском общежитии.',
        },
      },
    ],
    pronunciation: {
      hangul: '기숙사',
      romanization: 'gisuksa',
      ttsText: '기숙사',
    },
    media: {
      emoji: '🏫',
      imageUrl: '',
      imageAlt: {
        ko: '대학 기숙사 건물',
        uz: 'universitet yotoqxonasi binosi',
        en: 'university dormitory building',
        ru: 'здание университетского общежития',
      },
    },
    tags: ['housing', 'campus'],
    difficulty: 4,
    usageNote: {
      ko: '`기숙사에 살다`, `기숙사를 신청하다`라고 많이 말해요.',
      uz: '`yotoqxonada yashamoq`, `yotoqxonaga ariza bermoq` kabi ishlatiladi.',
      en: 'Common expressions include living in a dormitory and applying for a dormitory.',
      ru: 'Частые выражения: «жить в общежитии», «подать заявление на общежитие».',
    },
    isCore: true,
  },
  {
    code: 'real-estate-agency',
    korean: '부동산',
    senseKey: 'real-estate-agency-colloquial',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '집이나 방을 사고팔거나 빌리는 일을 중개하는 곳',
      uz: 'uy yoki xonani sotish va ijaraga olishga yordam beradigan rieltorlik idorasi',
      en: 'real estate agency',
      ru: 'агентство недвижимости',
    },
    examples: [
      {
        korean: '학교 밖에서 방을 구하려고 근처 부동산에 갔어요.',
        translations: {
          ko: '학교 밖에 살 방을 찾기 위해 부동산 중개업소에 갔어요.',
          uz: 'Universitet tashqarisidan xona topish uchun yaqin rieltorlik idorasiga bordim.',
          en: 'I went to a nearby real estate agency to find a room off campus.',
          ru: 'Я пошёл в ближайшее агентство недвижимости искать жильё вне кампуса.',
        },
      },
    ],
    pronunciation: {
      hangul: '부동산',
      romanization: 'budongsan',
      ttsText: '부동산',
    },
    media: {
      emoji: '🏘️',
      imageUrl: '',
      imageAlt: {
        ko: '방을 알아보는 부동산 중개업소',
        uz: 'ijara uyini qidiradigan rieltorlik idorasi',
        en: 'real estate agency for finding housing',
        ru: 'агентство недвижимости для поиска жилья',
      },
    },
    tags: ['housing', 'real-estate'],
    difficulty: 5,
    usageNote: {
      ko: '일상에서는 `부동산`만 말해도 부동산 중개업소를 뜻하는 경우가 많아요.',
      uz: 'Kundalik nutqda `부동산` ko‘pincha rieltorlik idorasini bildiradi.',
      en: 'In everyday Korean, 부동산 often refers directly to a real estate agency.',
      ru: 'В разговорной речи 부동산 часто означает непосредственно агентство недвижимости.',
    },
    isCore: true,
  },
  {
    code: 'transportation-card',
    korean: '교통카드',
    senseKey: 'public-transport-card',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '버스나 지하철 등의 대중교통 요금을 내는 데 사용하는 카드',
      uz: 'avtobus va metro haqini to‘lash uchun ishlatiladigan transport kartasi',
      en: 'transportation card',
      ru: 'транспортная карта',
    },
    examples: [
      {
        korean: '버스와 지하철을 자주 이용해서 교통카드를 샀어요.',
        translations: {
          ko: '대중교통을 자주 타기 때문에 교통카드를 구입했어요.',
          uz: 'Avtobus va metrodan ko‘p foydalanganim uchun transport kartasi sotib oldim.',
          en: 'I bought a transportation card because I often use buses and the subway.',
          ru: 'Я купил транспортную карту, потому что часто пользуюсь автобусом и метро.',
        },
      },
    ],
    pronunciation: {
      hangul: '교통카드',
      romanization: 'gyotong kadeu',
      ttsText: '교통카드',
    },
    media: {
      emoji: '💳',
      imageUrl: '',
      imageAlt: {
        ko: '대중교통용 교통카드',
        uz: 'jamoat transporti kartasi',
        en: 'public transportation card',
        ru: 'карта для общественного транспорта',
      },
    },
    tags: ['transportation', 'daily-life'],
    difficulty: 4,
    usageNote: {
      ko: '`교통카드를 찍다`, `교통카드를 충전하다` 같은 표현도 자주 사용해요.',
      uz: '`transport kartasini tekkizmoq`, `kartani to‘ldirmoq` kabi iboralar ham ko‘p ishlatiladi.',
      en: 'Common related expressions include tapping and recharging a transportation card.',
      ru: 'Часто употребляются выражения «приложить транспортную карту» и «пополнить карту».',
    },
    isCore: true,
  },
  {
    code: 'transport-transfer',
    korean: '환승',
    senseKey: 'public-transport-transfer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '이용하던 교통수단에서 내려 다른 교통수단으로 갈아타는 것',
      uz: 'bir transportdan boshqasiga o‘tib minish',
      en: 'transfer between public transportation',
      ru: 'пересадка',
    },
    examples: [
      {
        korean: '버스에서 지하철로 환승해서 학교에 가요.',
        translations: {
          ko: '버스를 탄 뒤 지하철로 갈아타서 학교에 가요.',
          uz: 'Avtobusdan metroga o‘tib universitetga boraman.',
          en: 'I transfer from the bus to the subway to get to school.',
          ru: 'Я пересаживаюсь с автобуса на метро по дороге в университет.',
        },
      },
    ],
    pronunciation: {
      hangul: '환승',
      romanization: 'hwanseung',
      ttsText: '환승',
    },
    media: {
      emoji: '🔄',
      imageUrl: '',
      imageAlt: {
        ko: '버스에서 지하철로 환승하는 모습',
        uz: 'avtobusdan metroga o‘tayotgan odam',
        en: 'transferring from a bus to the subway',
        ru: 'пересадка с автобуса на метро',
      },
    },
    tags: ['transportation', 'transfer'],
    difficulty: 5,
    usageNote: {
      ko: '`환승하다`, `환승 할인` 같은 표현으로도 많이 사용해요.',
      uz: '`transport almashtirmoq`, `transfer chegirmasi` kabi ishlatiladi.',
      en: 'Common related forms include `환승하다` and `환승 할인`.',
      ru: 'Часто встречается в формах `환승하다` и `환승 할인`.',
    },
    isCore: true,
  },
  {
    code: 'price-discount',
    korean: '할인',
    senseKey: 'price-discount',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '원래 가격보다 돈을 적게 받는 것',
      uz: 'asl narxdan arzonroq qilish',
      en: 'discount',
      ru: 'скидка',
    },
    examples: [
      {
        korean: '교통카드를 사용하면 환승할 때 할인을 받을 수 있어요.',
        translations: {
          ko: '교통카드를 이용하면 갈아탈 때 요금이 줄어들 수 있어요.',
          uz: 'Transport kartasidan foydalansangiz, transport almashtirganda chegirma olishingiz mumkin.',
          en: 'Using a transportation card may give you a discount when transferring.',
          ru: 'При использовании транспортной карты при пересадке можно получить скидку.',
        },
      },
    ],
    pronunciation: {
      hangul: '할인',
      romanization: 'harin',
      ttsText: '할인',
    },
    media: {
      emoji: '🏷️',
      imageUrl: '',
      imageAlt: {
        ko: '가격 할인 표시',
        uz: 'narx chegirmasi belgisi',
        en: 'discount sign',
        ru: 'значок скидки',
      },
    },
    tags: ['discount', 'transportation'],
    difficulty: 4,
    usageNote: {
      ko: '`할인을 받다`, `할인하다`, `할인 가격`처럼 사용해요.',
      uz: '`chegirma olmoq`, `chegirma qilmoq` kabi ishlatiladi.',
      en: 'Common expressions include receive a discount and discounted price.',
      ru: 'Частые выражения: «получить скидку», «цена со скидкой».',
    },
    isCore: true,
  },
  {
    code: 'trash-recyclable',
    korean: '재활용 쓰레기',
    senseKey: 'recyclable-waste',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '다시 자원으로 사용할 수 있어서 따로 모아 버리는 쓰레기',
      uz: 'qayta ishlanishi mumkin bo‘lgan chiqindi',
      en: 'recyclable waste',
      ru: 'перерабатываемый мусор',
    },
    examples: [
      {
        korean: '캔과 병은 재활용 쓰레기로 따로 버렸어요.',
        translations: {
          ko: '캔과 병을 다시 사용할 수 있는 쓰레기로 분리해서 버렸어요.',
          uz: 'Banka va butilkalarni qayta ishlanadigan chiqindi sifatida alohida tashladim.',
          en: 'I separated cans and bottles as recyclable waste.',
          ru: 'Я отдельно выбросил банки и бутылки как перерабатываемый мусор.',
        },
      },
    ],
    pronunciation: {
      hangul: '재활용 쓰레기',
      romanization: 'jaehwaryong sseuregi',
      ttsText: '재활용 쓰레기',
    },
    media: {
      emoji: '♻️',
      imageUrl: '',
      imageAlt: {
        ko: '분리된 재활용 쓰레기',
        uz: 'alohida ajratilgan qayta ishlanadigan chiqindi',
        en: 'sorted recyclable waste',
        ru: 'отсортированный перерабатываемый мусор',
      },
    },
    tags: ['trash', 'recycling'],
    difficulty: 5,
    usageNote: {
      ko: '일반 쓰레기와 섞지 않고 종류에 따라 따로 버리는 것이 중요해요.',
      uz: 'Uni oddiy chiqindiga aralashtirmasdan alohida tashlash muhim.',
      en: 'It should be separated from regular waste.',
      ru: 'Его важно отделять от обычного мусора.',
    },
    isCore: true,
  },
  {
    code: 'trash-general',
    korean: '일반 쓰레기',
    senseKey: 'general-nonrecyclable-waste',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '재활용이나 음식물 쓰레기로 따로 분류되지 않는 일반적인 쓰레기',
      uz: 'qayta ishlanadigan yoki oziq-ovqat chiqindisiga kirmaydigan oddiy chiqindi',
      en: 'general waste; regular trash',
      ru: 'обычный мусор',
    },
    examples: [
      {
        korean: '일반 쓰레기는 정해진 쓰레기봉투에 넣어서 버렸어요.',
        translations: {
          ko: '일반 쓰레기를 지정된 봉투에 넣어 버렸어요.',
          uz: 'Oddiy chiqindini belgilangan chiqindi paketiga solib tashladim.',
          en: 'I put the general waste in the designated trash bag before throwing it away.',
          ru: 'Я положил обычный мусор в специальный пакет и выбросил его.',
        },
      },
    ],
    pronunciation: {
      hangul: '일반 쓰레기',
      romanization: 'ilban sseuregi',
      ttsText: '일반 쓰레기',
    },
    media: {
      emoji: '🗑️',
      imageUrl: '',
      imageAlt: {
        ko: '일반 쓰레기를 담은 쓰레기통',
        uz: 'oddiy chiqindi solingan axlat qutisi',
        en: 'bin containing regular waste',
        ru: 'контейнер с обычным мусором',
      },
    },
    tags: ['trash', 'daily-life'],
    difficulty: 4,
    usageNote: {
      ko: '`재활용 쓰레기`와 대비해서 자주 사용해요.',
      uz: 'Ko‘pincha `재활용 쓰레기` bilan qarama-qarshi qo‘llanadi.',
      en: 'It is commonly contrasted with recyclable waste.',
      ru: 'Часто противопоставляется перерабатываемому мусору.',
    },
    isCore: true,
  },
  {
    code: 'trash-food-waste',
    korean: '음식물 쓰레기',
    senseKey: 'food-waste',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '먹고 남은 음식 등 음식에서 나온 쓰레기',
      uz: 'ovqatdan qolgan oziq-ovqat chiqindisi',
      en: 'food waste',
      ru: 'пищевые отходы',
    },
    examples: [
      {
        korean: '먹고 남은 음식은 음식물 쓰레기로 따로 버려요.',
        translations: {
          ko: '남은 음식은 다른 쓰레기와 섞지 않고 따로 버려요.',
          uz: 'Qolgan ovqatni boshqa chiqindidan alohida tashlaymiz.',
          en: 'Leftover food is disposed of separately as food waste.',
          ru: 'Остатки еды выбрасывают отдельно как пищевые отходы.',
        },
      },
    ],
    pronunciation: {
      hangul: '음식물 쓰레기',
      romanization: 'eumsikmul sseuregi',
      ttsText: '음식물 쓰레기',
    },
    media: {
      emoji: '🍌',
      imageUrl: '',
      imageAlt: {
        ko: '음식물 쓰레기를 따로 모으는 통',
        uz: 'oziq-ovqat chiqindisi uchun alohida idish',
        en: 'separate container for food waste',
        ru: 'отдельный контейнер для пищевых отходов',
      },
    },
    tags: ['trash', 'food-waste'],
    difficulty: 5,
    usageNote: {
      ko: '일반 쓰레기와 구분해서 말하고 버려요.',
      uz: 'Oddiy chiqindidan alohida ajratiladi.',
      en: 'It is separated from general waste.',
      ru: 'Пищевые отходы отделяются от обычного мусора.',
    },
    isCore: true,
  },
  {
    code: 'trash-bag',
    korean: '쓰레기봉투',
    senseKey: 'garbage-disposal-bag',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '쓰레기를 담아 버리는 데 사용하는 봉투',
      uz: 'chiqindini solib tashlash uchun ishlatiladigan paket',
      en: 'trash bag',
      ru: 'мусорный пакет',
    },
    examples: [
      {
        korean: '일반 쓰레기를 버리려고 쓰레기봉투를 샀어요.',
        translations: {
          ko: '일반 쓰레기를 담기 위해 쓰레기봉투를 구입했어요.',
          uz: 'Oddiy chiqindini tashlash uchun chiqindi paketi sotib oldim.',
          en: 'I bought a trash bag to dispose of general waste.',
          ru: 'Я купил мусорный пакет, чтобы выбросить обычный мусор.',
        },
      },
    ],
    pronunciation: {
      hangul: '쓰레기봉투',
      romanization: 'sseuregi bongtu',
      ttsText: '쓰레기봉투',
    },
    media: {
      emoji: '🗑️',
      imageUrl: '',
      imageAlt: {
        ko: '쓰레기를 담는 봉투',
        uz: 'chiqindi solinadigan paket',
        en: 'bag used for garbage',
        ru: 'пакет для мусора',
      },
    },
    tags: ['trash', 'daily-life'],
    difficulty: 4,
    usageNote: {
      ko: '`쓰레기봉투에 넣다`, `쓰레기봉투를 사다`처럼 사용해요.',
      uz: '`chiqindi paketiga solmoq`, `chiqindi paketi sotib olmoq` kabi ishlatiladi.',
      en: 'Common expressions include putting waste in a trash bag and buying a trash bag.',
      ru: 'Частые выражения: «положить в мусорный пакет», «купить мусорный пакет».',
    },
    isCore: true,
  },
  {
    code: 'trash-dispose',
    korean: '버리다',
    senseKey: 'throw-away-dispose',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '필요 없는 것을 없애거나 쓰레기로 내놓다',
      uz: 'keraksiz narsani tashlamoq',
      en: 'to throw away; to dispose of',
      ru: 'выбрасывать',
    },
    examples: [
      {
        korean: '쓰레기는 종류에 맞게 분리해서 버려야 해요.',
        translations: {
          ko: '쓰레기의 종류를 나눈 뒤 각각 알맞게 버려야 해요.',
          uz: 'Chiqindini turiga qarab ajratib tashlash kerak.',
          en: 'Waste should be separated by type before being disposed of.',
          ru: 'Мусор нужно сортировать по видам перед тем, как выбрасывать.',
        },
      },
    ],
    pronunciation: {
      hangul: '버리다',
      romanization: 'beorida',
      ttsText: '버리다',
    },
    media: {
      emoji: '🚮',
      imageUrl: '',
      imageAlt: {
        ko: '쓰레기를 알맞은 통에 버리는 사람',
        uz: 'chiqindini to‘g‘ri qutiga tashlayotgan odam',
        en: 'person disposing of waste in the correct bin',
        ru: 'человек выбрасывает мусор в правильный контейнер',
      },
    },
    tags: ['trash', 'action'],
    difficulty: 4,
    usageNote: {
      ko: '물건뿐 아니라 `시간을 버리다`처럼 비유적으로도 사용할 수 있지만 여기서는 쓰레기 처리 의미예요.',
      uz: 'Boshqa ko‘chma ma’nolari ham bor, lekin bu yerda chiqindini tashlash ma’nosida.',
      en: 'It has figurative uses too, but here it means disposing of waste.',
      ru: 'У слова есть и переносные значения, но здесь оно означает выбрасывать мусор.',
    },
    isCore: true,
  },
  {
    code: 'container-can',
    korean: '캔',
    senseKey: 'metal-can-container',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '음료나 음식 등을 담는 금속 용기',
      uz: 'ichimlik yoki oziq-ovqat uchun metall banka',
      en: 'can',
      ru: 'жестяная банка',
    },
    examples: [
      {
        korean: '빈 캔은 재활용 쓰레기와 함께 분리했어요.',
        translations: {
          ko: '다 쓴 금속 캔을 재활용할 수 있도록 따로 모았어요.',
          uz: 'Bo‘sh metall bankani qayta ishlash uchun alohida ajratdim.',
          en: 'I separated the empty can for recycling.',
          ru: 'Я отдельно положил пустую банку для переработки.',
        },
      },
    ],
    pronunciation: {
      hangul: '캔',
      romanization: 'kaen',
      ttsText: '캔',
    },
    media: {
      emoji: '🥫',
      imageUrl: '',
      imageAlt: {
        ko: '빈 금속 캔',
        uz: 'bo‘sh metall banka',
        en: 'empty metal can',
        ru: 'пустая металлическая банка',
      },
    },
    tags: ['trash', 'recycling'],
    difficulty: 3,
    usageNote: {
      ko: '쓰레기 분리배출 상황에서 재활용 가능한 물건의 대표적인 예예요.',
      uz: 'Chiqindini ajratishda qayta ishlanadigan narsaning odatiy misoli.',
      en: 'It is a common example of an item sorted for recycling.',
      ru: 'Типичный пример предмета, который сортируют для переработки.',
    },
    isCore: false,
  },
  {
    code: 'measurement-liter',
    korean: '리터',
    senseKey: 'liter-volume-unit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '액체나 용기의 부피를 나타내는 단위',
      uz: 'hajm o‘lchov birligi — litr',
      en: 'liter',
      ru: 'литр',
    },
    examples: [
      {
        korean: '쓰레기봉투는 필요한 크기에 따라 리터를 확인해서 사면 돼요.',
        translations: {
          ko: '필요한 봉투 크기에 맞는 리터 수를 보고 구입하면 돼요.',
          uz: 'Chiqindi paketini kerakli hajmiga qarab litrini tekshirib sotib olish mumkin.',
          en: 'You can choose a trash bag by checking its liter capacity.',
          ru: 'Мусорный пакет можно выбрать по его объёму в литрах.',
        },
      },
    ],
    pronunciation: {
      hangul: '리터',
      romanization: 'riteo',
      ttsText: '리터',
    },
    media: {
      emoji: '📏',
      imageUrl: '',
      imageAlt: {
        ko: '리터 단위가 표시된 용량',
        uz: 'litrda ko‘rsatilgan hajm',
        en: 'volume marked in liters',
        ru: 'объём, указанный в литрах',
      },
    },
    tags: ['measurement', 'trash'],
    difficulty: 4,
    usageNote: {
      ko: '숫자 뒤에 `10리터`, `20리터`처럼 사용해요.',
      uz: 'Son bilan `10 litr`, `20 litr` kabi ishlatiladi.',
      en: 'It follows numbers, such as 10리터 or 20리터.',
      ru: 'Употребляется после числа: например, 10리터 или 20리터.',
    },
    isCore: false,
  },
  {
    code: 'approximation-about',
    korean: '약',
    senseKey: 'approximately-about',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: {
      ko: '정확한 수가 아니라 대략적인 수임을 나타내는 말',
      uz: 'taxminan, qariyb',
      en: 'approximately; about',
      ru: 'примерно; около',
    },
    examples: [
      {
        korean: '학교까지 지하철로 약 삼십 분 정도 걸려요.',
        translations: {
          ko: '학교까지 지하철로 대략 삼십 분이 걸려요.',
          uz: 'Universitetgacha metroda taxminan 30 daqiqa ketadi.',
          en: 'It takes about thirty minutes to get to school by subway.',
          ru: 'До университета на метро ехать примерно тридцать минут.',
        },
      },
    ],
    pronunciation: {
      hangul: '약',
      romanization: 'yak',
      ttsText: '약',
    },
    media: {
      emoji: '≈',
      imageUrl: '',
      imageAlt: {
        ko: '정확하지 않은 대략적인 수량',
        uz: 'taxminiy miqdor',
        en: 'approximate amount',
        ru: 'примерное количество',
      },
    },
    tags: ['quantity', 'approximation'],
    difficulty: 4,
    usageNote: {
      ko: '숫자나 수량 앞에서 `약 30분`, `약 10리터`처럼 사용해요.',
      uz: 'Son oldidan `taxminan 30 daqiqa`, `taxminan 10 litr` kabi ishlatiladi.',
      en: 'It usually comes before a number or quantity.',
      ru: 'Обычно ставится перед числом или количеством.',
    },
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

// ═══════════════════════════════════════════════════════════════
// WORDS · NODE 4
// 학교생활 · 활동 · 대학 축제
// ═══════════════════════════════════════════════════════════════

const S5_UNIT1_NODE4_WORDS = [
  {
    code: 'university-school-life',
    korean: '학교생활',
    senseKey: 'daily-life-at-school',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '학교에서 공부하고 사람을 만나며 여러 활동을 하는 생활',
      uz: 'maktab yoki universitetdagi o‘qish va kundalik faoliyat hayoti',
      en: 'school life; campus life',
      ru: 'школьная или университетская жизнь',
    },
    examples: [
      {
        korean: '동아리에 가입한 뒤 학교생활이 훨씬 즐거워졌어요.',
        translations: {
          ko: '동아리 활동을 시작한 뒤 학교에서의 생활이 훨씬 즐거워졌어요.',
          uz: 'Klubga qo‘shilgandan keyin universitet hayotim ancha qiziqarli bo‘ldi.',
          en: 'My campus life became much more enjoyable after I joined a club.',
          ru: 'После вступления в клуб моя университетская жизнь стала намного интереснее.',
        },
      },
    ],
    pronunciation: {
      hangul: '학교생활',
      romanization: 'hakgyosaenghwal',
      ttsText: '학교생활',
    },
    media: {
      emoji: '🏫',
      imageUrl: '',
      imageAlt: {
        ko: '수업과 동아리 활동을 하는 대학생들',
        uz: 'dars va klub faoliyatida qatnashayotgan talabalar',
        en: 'university students attending classes and club activities',
        ru: 'студенты на занятиях и клубных мероприятиях',
      },
    },
    tags: ['university-life', 'campus-life'],
    difficulty: 4,
    usageNote: {
      ko: '`학교생활에 만족하다`, `학교생활에 적응하다`처럼 자주 사용해요.',
      uz: '`universitet hayotidan mamnun bo‘lmoq`, `universitet hayotiga moslashmoq` kabi ishlatiladi.',
      en: 'Common expressions include being satisfied with campus life and adapting to campus life.',
      ru: 'Часто употребляется в выражениях «быть довольным университетской жизнью» и «адаптироваться к ней».',
    },
    isCore: true,
  },
  {
    code: 'student-part-time-job',
    korean: '아르바이트',
    senseKey: 'part-time-job',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '정규 직업이 아니라 일정 시간 동안 돈을 받고 하는 일',
      uz: 'ma’lum vaqt davomida haq evaziga qilinadigan qo‘shimcha ish',
      en: 'part-time job',
      ru: 'подработка; работа неполный день',
    },
    examples: [
      {
        korean: '수업이 없는 저녁에는 카페에서 아르바이트를 해요.',
        translations: {
          ko: '수업이 없는 저녁 시간에는 카페에서 돈을 받고 일해요.',
          uz: 'Dars bo‘lmagan kechqurun kafeda yarim kunlik ishlayman.',
          en: 'I work part-time at a café on evenings when I do not have classes.',
          ru: 'По вечерам, когда нет занятий, я подрабатываю в кафе.',
        },
      },
    ],
    pronunciation: {
      hangul: '아르바이트',
      romanization: 'areubaiteu',
      ttsText: '아르바이트',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: {
        ko: '카페에서 아르바이트를 하는 학생',
        uz: 'kafeda yarim kunlik ishlayotgan talaba',
        en: 'student working part-time at a café',
        ru: 'студент подрабатывает в кафе',
      },
    },
    tags: ['university-life', 'part-time-job'],
    difficulty: 4,
    usageNote: {
      ko: '`아르바이트를 하다`, 줄여서 일상 대화에서는 `알바를 하다`라고도 하지만 학습 시드에서는 기본형을 사용해요.',
      uz: '`아르바이트를 하다` — yarim kunlik ishlamoq. So‘zlashuvda qisqartma ham bor, lekin asosiy shaklni o‘rganamiz.',
      en: 'The standard expression is `아르바이트를 하다`. A shortened colloquial form also exists, but the full form is taught here.',
      ru: 'Основное выражение — `아르바이트를 하다`. В разговорной речи есть сокращение, но здесь изучается полная форма.',
    },
    isCore: true,
  },
  {
    code: 'community-volunteer-work',
    korean: '자원봉사',
    senseKey: 'volunteer-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '돈을 받는 것을 목적으로 하지 않고 다른 사람이나 사회를 돕는 활동',
      uz: 'pul olish maqsadisiz boshqalarga yoki jamiyatga yordam berish faoliyati',
      en: 'volunteer work',
      ru: 'волонтёрская деятельность',
    },
    examples: [
      {
        korean: '주말마다 지역 아동 센터에서 자원봉사를 하고 있어요.',
        translations: {
          ko: '주말마다 돈을 받지 않고 지역 아동 센터에서 아이들을 돕고 있어요.',
          uz: 'Har hafta oxirida mahalliy bolalar markazida ko‘ngilli bo‘lib ishlayman.',
          en: 'I volunteer at a local children’s center every weekend.',
          ru: 'Каждые выходные я занимаюсь волонтёрской работой в местном детском центре.',
        },
      },
    ],
    pronunciation: {
      hangul: '자원봉사',
      romanization: 'jawonbongsa',
      ttsText: '자원봉사',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: {
        ko: '지역사회에서 자원봉사를 하는 학생들',
        uz: 'jamiyatda ko‘ngilli faoliyat qilayotgan talabalar',
        en: 'students doing volunteer work in the community',
        ru: 'студенты занимаются волонтёрской деятельностью',
      },
    },
    tags: ['university-life', 'volunteer'],
    difficulty: 5,
    usageNote: {
      ko: '`자원봉사를 하다`, `자원봉사에 참여하다`처럼 사용해요. 돈을 받는 아르바이트와 의미가 달라요.',
      uz: '`ko‘ngilli ish qilmoq`, `ko‘ngilli faoliyatda qatnashmoq` kabi ishlatiladi. Bu haq to‘lanadigan ishdan farq qiladi.',
      en: 'Used in expressions such as do volunteer work or participate in volunteering. It differs from paid part-time work.',
      ru: 'Употребляется в выражениях «заниматься волонтёрством», «участвовать в волонтёрской работе» и отличается от оплачиваемой подработки.',
    },
    isCore: true,
  },
  {
    code: 'university-club-activity',
    korean: '동아리 활동',
    senseKey: 'student-club-activities',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '학교 동아리에 들어가 구성원들과 함께 하는 여러 활동',
      uz: 'universitet klubida boshqa a’zolar bilan birga bajariladigan faoliyat',
      en: 'club activities',
      ru: 'деятельность студенческого клуба',
    },
    examples: [
      {
        korean: '동아리 활동을 하면서 다른 학과 친구도 많이 만났어요.',
        translations: {
          ko: '학교 동아리에서 활동하면서 다른 전공 학생들과도 많이 알게 됐어요.',
          uz: 'Klub faoliyati davomida boshqa fakultetlardan ko‘p do‘stlar orttirdim.',
          en: 'Through club activities, I met many students from other departments.',
          ru: 'Благодаря клубной деятельности я познакомился со многими студентами других факультетов.',
        },
      },
    ],
    pronunciation: {
      hangul: '동아리 활동',
      romanization: 'dongari hwaldong',
      ttsText: '동아리 활동',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: {
        ko: '함께 동아리 활동을 하는 대학생들',
        uz: 'birga klub faoliyati qilayotgan talabalar',
        en: 'university students doing club activities together',
        ru: 'студенты вместе занимаются в клубе',
      },
    },
    tags: ['university-life', 'club'],
    difficulty: 4,
    usageNote: {
      ko: '`동아리에 가입하다`는 회원이 되는 것이고 `동아리 활동을 하다`는 가입 후 실제 활동을 하는 것이에요.',
      uz: '`동아리에 가입하다` klubga a’zo bo‘lish, `동아리 활동을 하다` esa klubda amalda faoliyat qilish.',
      en: '`동아리에 가입하다` means joining a club; `동아리 활동을 하다` means actually participating in its activities.',
      ru: '`동아리에 가입하다` означает вступить в клуб, а `동아리 활동을 하다` — участвовать в его деятельности.',
    },
    isCore: true,
  },
  {
    code: 'relationship-opposite-sex-friend',
    korean: '이성 친구',
    senseKey: 'friend-of-opposite-sex',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '자신과 성별이 다른 친구',
      uz: 'o‘zidan boshqa jinsdagi do‘st',
      en: 'friend of the opposite sex',
      ru: 'друг противоположного пола',
    },
    examples: [
      {
        korean:
          '대학생활에서 이성 친구를 만나는 것을 중요하게 생각하는 사람도 있어요.',
        translations: {
          ko: '대학생활에서 다른 성별의 친구를 만나는 것을 중요하게 보는 사람도 있어요.',
          uz: 'Universitet hayotida boshqa jinsdagi do‘stlar bilan tanishishni muhim deb biladiganlar ham bor.',
          en: 'Some people consider meeting friends of the opposite sex important in university life.',
          ru: 'Некоторые считают знакомство с друзьями противоположного пола важной частью университетской жизни.',
        },
      },
    ],
    pronunciation: {
      hangul: '이성 친구',
      romanization: 'iseong chingu',
      ttsText: '이성 친구',
    },
    media: {
      emoji: '🧑‍🤝‍🧑',
      imageUrl: '',
      imageAlt: {
        ko: '대학교에서 함께 이야기하는 두 친구',
        uz: 'universitetda suhbatlashayotgan ikki do‘st',
        en: 'two friends talking at university',
        ru: 'двое друзей разговаривают в университете',
      },
    },
    tags: ['university-life', 'relationship'],
    difficulty: 5,
    usageNote: {
      ko: '교재에서는 학교생활에서 중요하게 생각하는 활동을 비교하는 항목으로 제시돼요.',
      uz: 'Darslikda universitet hayotidagi muhim faoliyatlarni solishtirish uchun berilgan.',
      en: 'The textbook presents it as one item when comparing priorities in university life.',
      ru: 'В учебнике выражение используется как один из вариантов при сравнении приоритетов университетской жизни.',
    },
    isCore: false,
  },
  {
    code: 'satisfaction-be-satisfied',
    korean: '만족하다',
    senseKey: 'be-satisfied-with-result-or-life',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '어떤 상태나 결과가 마음에 들어 충분하다고 느끼다',
      uz: 'holat yoki natijadan mamnun bo‘lmoq',
      en: 'to be satisfied',
      ru: 'быть довольным',
    },
    examples: [
      {
        korean: '수업과 친구 관계가 좋아서 지금 학교생활에 만족하고 있어요.',
        translations: {
          ko: '수업과 친구 관계가 마음에 들어 현재 학교생활을 좋게 생각하고 있어요.',
          uz: 'Darslar va do‘stlar bilan munosabatlar yaxshi bo‘lgani uchun universitet hayotimdan mamnunman.',
          en: 'I am satisfied with my campus life because my classes and friendships are going well.',
          ru: 'Я доволен университетской жизнью, потому что занятия и отношения с друзьями складываются хорошо.',
        },
      },
    ],
    pronunciation: {
      hangul: '만족하다',
      romanization: 'manjokhada',
      ttsText: '만족하다',
    },
    media: {
      emoji: '😊',
      imageUrl: '',
      imageAlt: {
        ko: '학교생활에 만족하는 학생',
        uz: 'universitet hayotidan mamnun talaba',
        en: 'student satisfied with campus life',
        ru: 'студент доволен университетской жизнью',
      },
    },
    tags: ['university-life', 'satisfaction'],
    difficulty: 5,
    usageNote: {
      ko: '`학교생활에 만족하다`, `결과에 만족하다`처럼 만족하는 대상 뒤에 `에`를 사용해요.',
      uz: '`universitet hayotidan mamnun bo‘lmoq`, `natijadan mamnun bo‘lmoq` kabi ishlatiladi.',
      en: 'The thing one is satisfied with is commonly marked with `에`.',
      ru: 'Объект удовлетворённости обычно оформляется частицей `에`.',
    },
    isCore: true,
  },
] satisfies readonly WordSeedEntry[];

// ═══════════════════════════════════════════════════════════════
// WORDS · NODE 5
// 인터뷰 · 친구 소개 · 한국의 호칭
// ═══════════════════════════════════════════════════════════════

const S5_UNIT1_NODE5_WORDS = [
  {
    code: 'communication-interview',
    korean: '인터뷰',
    senseKey: 'ask-person-for-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '어떤 사람에게 질문을 하여 생각이나 경험, 정보를 알아보는 일',
      uz: 'biror kishiga savol berib uning fikri, tajribasi yoki maʼlumotini bilib olish suhbati',
      en: 'interview; a conversation used to obtain information from someone',
      ru: 'интервью; беседа для получения информации от человека',
    },
    examples: [
      {
        korean: '친구를 소개하기 전에 학교생활에 대해 인터뷰했어요.',
        translations: {
          ko: '친구를 소개하기 전에 친구의 학교생활에 대해 질문해서 정보를 알아봤어요.',
          uz: 'Do‘stimni tanishtirishdan oldin undan universitet hayoti haqida intervyu oldim.',
          en: 'Before introducing my friend, I interviewed them about their campus life.',
          ru: 'Перед тем как представить друга, я расспросил его об университетской жизни.',
        },
      },
    ],
    pronunciation: {
      hangul: '인터뷰',
      romanization: 'inteobyu',
      ttsText: '인터뷰',
    },
    media: {
      emoji: '🎤',
      imageUrl: '',
      imageAlt: {
        ko: '친구에게 질문하며 인터뷰하는 학생',
        uz: 'do‘stidan savol olib intervyu qilayotgan talaba',
        en: 'a student interviewing a friend',
        ru: 'студент берёт интервью у друга',
      },
    },
    tags: ['interview', 'communication', 'friend-introduction'],
    difficulty: 4,
    usageNote: {
      ko: '`인터뷰를 하다`, `인터뷰하다`처럼 사용할 수 있어요.',
      uz: '`인터뷰를 하다` yoki `인터뷰하다` shaklida ishlatiladi.',
      en: 'Commonly used as `인터뷰를 하다` or as the verb `인터뷰하다`.',
      ru: 'Обычно употребляется как `인터뷰를 하다` или глагол `인터뷰하다`.',
    },
    isCore: true,
  },
  {
    code: 'communication-question-noun',
    korean: '질문',
    senseKey: 'question-asking-information',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '모르는 것이나 알고 싶은 것을 묻는 말',
      uz: 'bilmagan yoki bilmoqchi bo‘lgan narsani so‘rash',
      en: 'question',
      ru: 'вопрос',
    },
    examples: [
      {
        korean: '인터뷰를 시작하기 전에 중요한 질문을 미리 준비했어요.',
        translations: {
          ko: '인터뷰 전에 꼭 물어볼 내용을 미리 준비했어요.',
          uz: 'Intervyuni boshlashdan oldin muhim savollarni oldindan tayyorladim.',
          en: 'I prepared the important questions before starting the interview.',
          ru: 'Перед интервью я заранее подготовил важные вопросы.',
        },
      },
    ],
    pronunciation: {
      hangul: '질문',
      romanization: 'jilmun',
      ttsText: '질문',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: {
        ko: '질문 목록을 확인하는 학생',
        uz: 'savollar ro‘yxatini ko‘rayotgan talaba',
        en: 'a student checking a list of questions',
        ru: 'студент просматривает список вопросов',
      },
    },
    tags: ['interview', 'question', 'communication'],
    difficulty: 4,
    usageNote: {
      ko: '`질문을 하다`, `질문에 대답하다`처럼 많이 사용해요.',
      uz: '`savol bermoq`, `savolga javob bermoq` maʼnolarida ko‘p ishlatiladi.',
      en: 'Frequently appears in `질문을 하다` and `질문에 대답하다`.',
      ru: 'Часто употребляется в сочетаниях `질문을 하다` и `질문에 대답하다`.',
    },
    isCore: true,
  },
  {
    code: 'communication-answer-noun',
    korean: '대답',
    senseKey: 'answer-to-question',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '질문이나 말에 대해 하는 말',
      uz: 'savol yoki gapga berilgan javob',
      en: 'answer; response',
      ru: 'ответ',
    },
    examples: [
      {
        korean: '친구의 대답을 잘 듣고 중요한 내용을 메모했어요.',
        translations: {
          ko: '친구가 질문에 답한 내용을 잘 듣고 중요한 부분을 적었어요.',
          uz: 'Do‘stimning javobini diqqat bilan tinglab, muhim joylarini yozib oldim.',
          en: 'I listened carefully to my friend’s answers and noted the important points.',
          ru: 'Я внимательно слушал ответы друга и записывал важные моменты.',
        },
      },
    ],
    pronunciation: {
      hangul: '대답',
      romanization: 'daedap',
      ttsText: '대답',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: {
        ko: '인터뷰 질문에 대답하는 학생',
        uz: 'intervyu savoliga javob berayotgan talaba',
        en: 'a student answering an interview question',
        ru: 'студент отвечает на вопрос интервью',
      },
    },
    tags: ['interview', 'answer', 'communication'],
    difficulty: 4,
    usageNote: {
      ko: '`질문에 대답하다`처럼 대답하는 대상에는 보통 `에`를 사용해요.',
      uz: '`질문에 대답하다` shaklida javob beriladigan savol bilan `에` ishlatiladi.',
      en: 'In `질문에 대답하다`, the question being answered is normally marked with `에`.',
      ru: 'В выражении `질문에 대답하다` вопрос, на который отвечают, обычно оформляется частицей `에`.',
    },
    isCore: true,
  },
  {
    code: 'communication-introduce-person',
    korean: '소개하다',
    senseKey: 'introduce-person-to-others',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '모르는 사람에게 다른 사람이나 대상을 알려 주다',
      uz: 'biror kishini yoki narsani boshqalarga tanishtirmoq',
      en: 'to introduce',
      ru: 'представлять; знакомить',
    },
    examples: [
      {
        korean:
          '인터뷰에서 들은 내용을 바탕으로 친구를 반 사람들에게 소개했어요.',
        translations: {
          ko: '인터뷰로 알게 된 정보를 이용해 친구에 대해 다른 사람들에게 이야기했어요.',
          uz: 'Intervyuda bilgan maʼlumotlarim asosida do‘stimni guruhdagilarga tanishtirdim.',
          en: 'I introduced my friend to the class using information from the interview.',
          ru: 'Я представил друга группе, используя информацию из интервью.',
        },
      },
    ],
    pronunciation: {
      hangul: '소개하다',
      romanization: 'sogaehada',
      ttsText: '소개하다',
    },
    media: {
      emoji: '🙋',
      imageUrl: '',
      imageAlt: {
        ko: '친구를 다른 학생들에게 소개하는 모습',
        uz: 'do‘stini boshqa talabalarga tanishtirayotgan kishi',
        en: 'a person introducing a friend to other students',
        ru: 'человек представляет друга другим студентам',
      },
    },
    tags: ['friend-introduction', 'communication'],
    difficulty: 4,
    usageNote: {
      ko: '`친구를 소개하다`, `친구에게 사람을 소개하다`처럼 사용해요.',
      uz: '`do‘stni tanishtirmoq`, `do‘stga boshqa kishini tanishtirmoq` kabi ishlatiladi.',
      en: 'Used in expressions such as `친구를 소개하다` and `친구에게 사람을 소개하다`.',
      ru: 'Употребляется, например, в `친구를 소개하다` и `친구에게 사람을 소개하다`.',
    },
    isCore: true,
  },
  {
    code: 'communication-form-of-address',
    korean: '호칭',
    senseKey: 'term-used-to-address-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '사람을 부를 때 사용하는 이름이나 말',
      uz: 'odamga murojaat qilishda ishlatiladigan nom yoki atama',
      en: 'form of address; term used to call or address someone',
      ru: 'форма обращения; слово, которым называют или к кому-либо обращаются',
    },
    examples: [
      {
        korean:
          '한국에서는 상대와의 관계에 따라 사용하는 호칭이 달라질 수 있어요.',
        translations: {
          ko: '한국에서는 상대방과 어떤 관계인지에 따라 부르는 말이 달라질 수 있어요.',
          uz: 'Koreyada suhbatdosh bilan munosabatga qarab murojaat shakli o‘zgarishi mumkin.',
          en: 'In Korea, the form of address can vary depending on your relationship with the person.',
          ru: 'В Корее форма обращения может меняться в зависимости от отношений с человеком.',
        },
      },
    ],
    pronunciation: {
      hangul: '호칭',
      romanization: 'hoching',
      ttsText: '호칭',
    },
    media: {
      emoji: '🗣️',
      imageUrl: '',
      imageAlt: {
        ko: '상대에게 알맞은 호칭으로 이야기하는 사람들',
        uz: 'bir-biriga mos murojaat shaklida gapirayotgan odamlar',
        en: 'people using appropriate forms of address',
        ru: 'люди используют подходящие формы обращения',
      },
    },
    tags: ['culture', 'form-of-address', 'relationship'],
    difficulty: 5,
    usageNote: {
      ko: '이름만 외우는 것보다 상대와의 관계와 상황을 함께 보고 어떤 호칭을 쓸지 판단하는 것이 중요해요.',
      uz: 'Faqat nomni yodlash emas, munosabat va vaziyatga qarab qaysi murojaat shaklini ishlatishni bilish muhim.',
      en: 'The important skill is choosing a form of address according to the relationship and situation, not merely memorizing labels.',
      ru: 'Важно не просто запоминать обращения, а выбирать их с учётом отношений и ситуации.',
    },
    isCore: true,
  },
  {
    code: 'communication-call-address-person',
    korean: '부르다',
    senseKey: 'call-or-address-person',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '사람의 이름이나 호칭을 말하여 그 사람을 가리키거나 말을 걸다',
      uz: 'odamni ism yoki murojaat shakli bilan chaqirmoq',
      en: 'to call; to address someone',
      ru: 'называть; обращаться к кому-либо',
    },
    examples: [
      {
        korean:
          '처음 만난 사람을 어떻게 불러야 할지 모르면 먼저 관계를 확인하는 것이 좋아요.',
        translations: {
          ko: '처음 만난 사람에게 어떤 호칭을 써야 할지 모르면 상대와의 관계를 먼저 확인하는 것이 좋아요.',
          uz: 'Yangi tanishgan kishini qanday chaqirishni bilmasangiz, avval munosabatni aniqlagan yaxshi.',
          en: 'If you are unsure how to address someone you have just met, it is better to check the relationship first.',
          ru: 'Если вы не знаете, как обратиться к человеку при первой встрече, лучше сначала уточнить отношения.',
        },
      },
    ],
    pronunciation: {
      hangul: '부르다',
      romanization: 'bureuda',
      ttsText: '부르다',
    },
    media: {
      emoji: '📣',
      imageUrl: '',
      imageAlt: {
        ko: '상대방을 불러 말을 거는 사람',
        uz: 'boshqa kishiga murojaat qilayotgan odam',
        en: 'a person calling out to someone',
        ru: 'человек обращается к другому человеку',
      },
    },
    tags: ['form-of-address', 'communication'],
    difficulty: 5,
    usageNote: {
      ko: '이 단어는 노래를 `부르다`라는 뜻도 있지만 여기서는 사람을 이름이나 호칭으로 부르는 뜻이에요.',
      uz: 'Bu so‘z “qo‘shiq kuylamoq” maʼnosiga ham ega, lekin bu yerda odamni ism yoki murojaat bilan chaqirish maʼnosida.',
      en: '`부르다` can also mean “to sing,” but here it means to call or address a person.',
      ru: '`부르다` также может означать «петь», но здесь оно означает «называть или обращаться к человеку».',
    },
    isCore: true,
  },
  {
    code: 'university-senior-student',
    korean: '선배',
    senseKey: 'senior-in-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '같은 학교나 조직에서 자신보다 먼저 들어온 사람',
      uz: 'bir xil universitet yoki tashkilotga sizdan oldin kirgan kishi',
      en: 'senior; a person who entered the same school or organization earlier',
      ru: 'старший товарищ; человек, который раньше вас поступил в ту же организацию или учебное заведение',
    },
    examples: [
      {
        korean: '동아리 선배에게 학교생활에 대해 여러 가지 조언을 들었어요.',
        translations: {
          ko: '동아리에 먼저 들어온 사람에게 학교생활에 관한 조언을 들었어요.',
          uz: 'Klubdagi yuqori kursdoshimdan universitet hayoti haqida turli maslahatlar oldim.',
          en: 'I received various tips about campus life from a senior in my club.',
          ru: 'Я получил разные советы об университетской жизни от старшего товарища из клуба.',
        },
      },
    ],
    pronunciation: {
      hangul: '선배',
      romanization: 'seonbae',
      ttsText: '선배',
    },
    media: {
      emoji: '🧑‍🎓',
      imageUrl: '',
      imageAlt: {
        ko: '후배에게 학교생활을 알려 주는 선배',
        uz: 'kichik kursdoshiga universitet hayotini tushuntirayotgan yuqori kursdosh',
        en: 'a senior student advising a junior',
        ru: 'старший студент даёт совет младшему',
      },
    },
    tags: ['university-life', 'relationship', 'form-of-address'],
    difficulty: 4,
    usageNote: {
      ko: '나이가 아니라 같은 학교나 조직에 언제 들어왔는지가 중요해요. 자신보다 먼저 들어온 사람이 선배예요.',
      uz: 'Bu yerda yosh emas, bir xil universitet yoki tashkilotga kim oldin kirgani muhim.',
      en: 'The distinction is primarily based on entering the same school or organization earlier, not simply on age.',
      ru: 'Главное — кто раньше поступил в ту же организацию или учебное заведение, а не просто возраст.',
    },
    isCore: true,
  },
  {
    code: 'university-junior-student',
    korean: '후배',
    senseKey: 'junior-in-school-or-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '같은 학교나 조직에서 자신보다 나중에 들어온 사람',
      uz: 'bir xil universitet yoki tashkilotga sizdan keyin kirgan kishi',
      en: 'junior; a person who entered the same school or organization later',
      ru: 'младший товарищ; человек, который позже вас поступил в ту же организацию или учебное заведение',
    },
    examples: [
      {
        korean: '새로 들어온 후배에게 수강 신청 방법을 설명해 줬어요.',
        translations: {
          ko: '나보다 나중에 학교에 들어온 학생에게 수강 신청 방법을 알려 줬어요.',
          uz: 'Mendan keyin o‘qishga kirgan talabaga kursga yozilish usulini tushuntirdim.',
          en: 'I explained course registration to a junior who entered the university after me.',
          ru: 'Я объяснил младшему студенту, поступившему позже меня, как записываться на курсы.',
        },
      },
    ],
    pronunciation: {
      hangul: '후배',
      romanization: 'hubae',
      ttsText: '후배',
    },
    media: {
      emoji: '🎒',
      imageUrl: '',
      imageAlt: {
        ko: '선배에게 학교생활을 묻는 후배',
        uz: 'yuqori kursdoshidan universitet hayoti haqida so‘rayotgan kichik kursdosh',
        en: 'a junior student asking a senior about campus life',
        ru: 'младший студент спрашивает старшего об университетской жизни',
      },
    },
    tags: ['university-life', 'relationship', 'form-of-address'],
    difficulty: 4,
    usageNote: {
      ko: '`선배`와 반대되는 관계예요. 같은 집단에 자신보다 나중에 들어온 사람을 말해요.',
      uz: '`선배`ning qarama-qarshi munosabati bo‘lib, bir guruhga sizdan keyin kirgan kishini bildiradi.',
      en: 'It is the counterpart of `선배`: someone who joined the same group after you.',
      ru: 'Это противоположное `선배` отношение: человек, вступивший в ту же группу позже вас.',
    },
    isCore: true,
  },
] satisfies readonly WordSeedEntry[];

const S5_UNIT1_TOPIC_WORDS = [
  makeS5U1Word({
    code: 'word_university_entrance_ceremony_noun',
    korean: '입학식',
    senseKey: 'university-entrance-ceremony',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학교에 새로 입학하는 학생을 위한 공식 행사',
      'yangi o‘quvchi yoki talabalar uchun kirish marosimi',
      'entrance ceremony',
      'церемония поступления',
    ),
    example: '신입생들은 입학식에 참석했어요.',
    exampleTranslations: S5U1T(
      '새로 들어온 학생들이 입학식에 참석했어요.',
      'Yangi talabalar kirish marosimida qatnashdi.',
      'The new students attended the entrance ceremony.',
      'Новые студенты присутствовали на церемонии поступления.',
    ),
    romanization: 'iphaksik',
    emoji: '🎓',
    tags: ['university', 'school-event'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_university_lecture_noun',
    korean: '강의',
    senseKey: 'university-lecture',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '대학교 등에서 선생님이 학생들에게 내용을 설명하며 가르치는 수업',
      'universitetdagi ma’ruza yoki dars',
      'lecture; university class',
      'лекция; университетское занятие',
    ),
    example: '오늘 오후에 한국 역사 강의가 있어요.',
    exampleTranslations: S5U1T(
      '오늘 오후에 한국 역사 수업이 있어요.',
      'Bugun tushdan keyin Koreya tarixi bo‘yicha ma’ruza bor.',
      'I have a Korean history lecture this afternoon.',
      'Сегодня днём у меня лекция по истории Кореи.',
    ),
    romanization: 'gangui',
    emoji: '👨‍🏫',
    tags: ['university', 'class'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_apply_program_verb',
    korean: '지원하다',
    senseKey: 'apply-to-school-job-program',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '학교, 회사, 프로그램 등에 들어가기 위해 신청하다',
      'o‘qish, ish yoki dasturga kirish uchun ariza topshirmoq',
      'to apply',
      'подавать заявление; подавать заявку',
    ),
    example: '저는 교환학생 프로그램에 지원했어요.',
    exampleTranslations: S5U1T(
      '저는 교환학생이 되기 위해 프로그램에 신청했어요.',
      'Men almashinuv dasturiga ariza topshirdim.',
      'I applied for the exchange student program.',
      'Я подал заявку на программу обмена.',
    ),
    romanization: 'jiwonhada',
    emoji: '📝',
    tags: ['university', 'application'],
    isCore: true,
    usageNote: S5U1T(
      '지원하다는 학교·회사·장학금처럼 선발을 거치는 곳에 신청할 때 많이 써요.',
      '지원하다 tanlov bo‘ladigan universitet, ish yoki stipendiyaga ariza berishda ko‘p ishlatiladi.',
      '지원하다 is commonly used when applying to something selective, such as a school, job, or scholarship.',
      '지원하다 часто употребляется при подаче заявления туда, где есть отбор: в вуз, на работу или на стипендию.',
    ),
  }),

  makeS5U1Word({
    code: 'word_orientation_noun',
    korean: '오리엔테이션',
    senseKey: 'orientation-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '새로운 학교나 조직에 대해 안내하는 모임',
      'yangi maktab yoki tashkilot bilan tanishtiruv yig‘ilishi',
      'orientation',
      'ориентационная встреча',
    ),
    example: '개강 전에 신입생 오리엔테이션이 있어요.',
    exampleTranslations: S5U1T(
      '수업이 시작되기 전에 신입생을 위한 안내 모임이 있어요.',
      'Darslar boshlanishidan oldin yangi talabalar uchun orientatsiya bo‘ladi.',
      'There is an orientation for new students before classes begin.',
      'Перед началом занятий проводится ориентация для новых студентов.',
    ),
    romanization: 'orienteisyeon',
    emoji: '🧭',
    tags: ['university', 'school-event'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_school_subject_noun',
    korean: '과목',
    senseKey: 'academic-subject',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학교에서 배우는 각각의 학문이나 수업 분야',
      'maktab yoki universitetda o‘qiladigan fan',
      'subject; course',
      'учебный предмет; курс',
    ),
    example: '이번 학기에 다섯 과목을 신청했어요.',
    exampleTranslations: S5U1T(
      '이번 학기에 수업 다섯 개를 신청했어요.',
      'Bu semestrda beshta fanga yozildim.',
      'I registered for five courses this semester.',
      'В этом семестре я записался на пять предметов.',
    ),
    romanization: 'gwamok',
    emoji: '📚',
    tags: ['university', 'class'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_pass_selection_verb',
    korean: '합격하다',
    senseKey: 'pass-exam-selection',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '시험이나 선발의 기준을 통과하다',
      'imtihon yoki tanlovdan muvaffaqiyatli o‘tmoq',
      'to pass; to be accepted',
      'сдать; пройти отбор; быть принятым',
    ),
    example: '친구가 대학원 시험에 합격했어요.',
    exampleTranslations: S5U1T(
      '친구가 대학원 시험을 통과했어요.',
      'Do‘stim magistratura imtihonidan muvaffaqiyatli o‘tdi.',
      'My friend passed the graduate school entrance exam.',
      'Мой друг успешно сдал вступительный экзамен в магистратуру.',
    ),
    romanization: 'hapgyeokhada',
    emoji: '✅',
    tags: ['university', 'exam'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_new_student_welcome_party_phrase',
    korean: '신입생 환영회',
    senseKey: 'new-student-welcome-party',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '새로 들어온 학생들을 환영하기 위해 여는 모임',
      'yangi talabalarni kutib olish kechasi',
      'welcome party for new students',
      'вечеринка в честь новых студентов',
    ),
    example: '금요일 저녁에 신입생 환영회가 열려요.',
    exampleTranslations: S5U1T(
      '금요일 저녁에 새 학생들을 위한 환영 모임이 열려요.',
      'Juma kuni kechqurun yangi talabalar uchun kutib olish kechasi bo‘ladi.',
      'A welcome party for new students will be held Friday evening.',
      'В пятницу вечером состоится вечеринка для новых студентов.',
    ),
    romanization: 'sinipsaeng hwanyeonghoe',
    emoji: '🎉',
    tags: ['university', 'school-event'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_academic_major_noun',
    korean: '전공',
    senseKey: 'academic-major',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '대학교에서 중심적으로 공부하는 학문 분야',
      'universitetdagi asosiy mutaxassislik',
      'major; field of study',
      'специальность; основное направление обучения',
    ),
    example: '제 전공은 컴퓨터 공학이에요.',
    exampleTranslations: S5U1T(
      '대학교에서 저는 컴퓨터 공학을 중심으로 공부해요.',
      'Mening mutaxassisligim kompyuter muhandisligi.',
      'My major is computer engineering.',
      'Моя специальность — компьютерная инженерия.',
    ),
    romanization: 'jeongong',
    emoji: '🎯',
    tags: ['university', 'major'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_attend_event_verb',
    korean: '참석하다',
    senseKey: 'attend-meeting-event',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '모임이나 행사에 가서 자리를 함께하다',
      'yig‘ilish yoki tadbirda qatnashmoq',
      'to attend',
      'присутствовать; посещать мероприятие',
    ),
    example: '신입생 환영회에 꼭 참석하세요.',
    exampleTranslations: S5U1T(
      '신입생 환영회에 꼭 와서 함께하세요.',
      'Yangi talabalar kechasida albatta qatnashing.',
      'Please be sure to attend the new student welcome party.',
      'Обязательно приходите на встречу новых студентов.',
    ),
    romanization: 'chamseokhada',
    emoji: '🙋',
    tags: ['university', 'event'],
    isCore: true,
    usageNote: S5U1T(
      '참석하다는 회의·수업·행사처럼 자리에 가는 것에 초점이 있어요.',
      '참석하다 yig‘ilish, dars yoki tadbirda hozir bo‘lishga urg‘u beradi.',
      '참석하다 focuses on being present at a meeting, class, ceremony, or event.',
      '참석하다 подчёркивает присутствие на собрании, занятии или мероприятии.',
    ),
  }),

  makeS5U1Word({
    code: 'word_student_club_noun',
    korean: '동아리',
    senseKey: 'school-student-club',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '같은 관심이나 취미를 가진 학생들이 만든 모임',
      'bir xil qiziqishdagi talabalar klubi yoki to‘garagi',
      'student club',
      'студенческий клуб; кружок',
    ),
    example: '저는 사진 동아리에 가입했어요.',
    exampleTranslations: S5U1T(
      '저는 사진을 좋아하는 학생들의 모임에 들어갔어요.',
      'Men fotografiya klubiga a’zo bo‘ldim.',
      'I joined the photography club.',
      'Я вступил в фотоклуб.',
    ),
    romanization: 'dongari',
    emoji: '👥',
    tags: ['university', 'club'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_academic_grade_noun',
    korean: '성적',
    senseKey: 'academic-grade-result',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '시험이나 공부의 결과를 나타내는 점수나 평가',
      'o‘qish yoki imtihon natijasi, baho',
      'grade; academic result',
      'оценка; успеваемость',
    ),
    example: '이번 학기에는 성적이 많이 올랐어요.',
    exampleTranslations: S5U1T(
      '이번 학기에는 공부 결과가 전보다 좋아졌어요.',
      'Bu semestrda baholarim ancha yaxshilandi.',
      'My grades improved a lot this semester.',
      'В этом семестре мои оценки заметно улучшились.',
    ),
    romanization: 'seongjeok',
    emoji: '📊',
    tags: ['university', 'grades'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_apply_request_verb',
    korean: '신청하다',
    senseKey: 'register-request-service',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '수업, 행사, 서비스 등을 이용하거나 참여하기 위해 등록하다',
      'kurs, tadbir yoki xizmat uchun ro‘yxatdan o‘tmoq',
      'to register for; to apply for',
      'подавать заявку; записываться',
    ),
    example: '인터넷으로 수강 신청을 했어요.',
    exampleTranslations: S5U1T(
      '인터넷으로 들을 수업을 신청했어요.',
      'Internet orqali kurslarga ro‘yxatdan o‘tdim.',
      'I registered for my classes online.',
      'Я записался на занятия через интернет.',
    ),
    romanization: 'sincheonghada',
    emoji: '📋',
    tags: ['university', 'registration'],
    isCore: true,
    usageNote: S5U1T(
      '신청하다는 수업·행사·서비스 등을 이용하기 위해 이름을 올리거나 요청할 때 많이 써요.',
      '신청하다 kurs, tadbir yoki xizmatga ro‘yxatdan o‘tish va so‘rov berishda ishlatiladi.',
      '신청하다 is commonly used for registering for a class, event, or service.',
      '신청하다 часто употребляется при записи на курс, мероприятие или услугу.',
    ),
  }),

  makeS5U1Word({
    code: 'word_festival_noun',
    korean: '축제',
    senseKey: 'festival-event',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '많은 사람이 함께 즐기는 큰 행사',
      'ko‘p odamlar birga nishonlaydigan festival',
      'festival',
      'фестиваль',
    ),
    example: '학교 축제에서 여러 동아리가 공연해요.',
    exampleTranslations: S5U1T(
      '학교 축제에서 여러 학생 모임이 공연해요.',
      'Universitet festivalida turli klublar chiqish qiladi.',
      'Many student clubs perform at the university festival.',
      'На университетском фестивале выступают разные студенческие клубы.',
    ),
    romanization: 'chukje',
    emoji: '🎪',
    tags: ['university', 'festival'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_academic_credit_noun',
    korean: '학점',
    senseKey: 'university-academic-credit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '대학교에서 과목을 이수한 정도를 나타내는 단위',
      'universitetdagi akademik kredit',
      'academic credit',
      'академический кредит',
    ),
    example: '졸업하려면 필요한 학점을 채워야 해요.',
    exampleTranslations: S5U1T(
      '졸업하려면 정해진 수만큼의 학점을 받아야 해요.',
      'Bitirish uchun kerakli miqdordagi kreditlarni to‘plash kerak.',
      'You need to complete the required credits to graduate.',
      'Для выпуска нужно набрать необходимое количество кредитов.',
    ),
    romanization: 'hakjeom',
    emoji: '🔢',
    tags: ['university', 'credit'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_join_organization_verb',
    korean: '가입하다',
    senseKey: 'join-membership-organization',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '단체나 모임의 구성원이 되다',
      'tashkilot yoki klubga a’zo bo‘lmoq',
      'to join; to become a member',
      'вступать; становиться членом',
    ),
    example: '저는 이번 학기에 봉사 동아리에 가입했어요.',
    exampleTranslations: S5U1T(
      '저는 이번 학기에 봉사 동아리의 회원이 되었어요.',
      'Bu semestrda ko‘ngillilar klubiga a’zo bo‘ldim.',
      'I joined a volunteer club this semester.',
      'В этом семестре я вступил в волонтёрский клуб.',
    ),
    romanization: 'gaiphada',
    emoji: '➕',
    tags: ['university', 'club', 'membership'],
    isCore: true,
    usageNote: S5U1T(
      '가입하다는 동아리·사이트·보험처럼 회원이나 이용자가 되는 경우에 써요.',
      '가입하다 klub, sayt yoki xizmatga a’zo bo‘lishda ishlatiladi.',
      '가입하다 is used when becoming a member of a club, website, service, or organization.',
      '가입하다 употребляется при вступлении в клуб, организацию или сервис.',
    ),
  }),

  makeS5U1Word({
    code: 'word_graduation_ceremony_noun',
    korean: '졸업식',
    senseKey: 'school-graduation-ceremony',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학교 과정을 마친 학생들의 졸업을 축하하는 공식 행사',
      'o‘qishni tugatganlar uchun bitiruv marosimi',
      'graduation ceremony',
      'церемония выпуска',
    ),
    example: '언니의 졸업식에 가족들이 모두 갔어요.',
    exampleTranslations: S5U1T(
      '언니의 졸업을 축하하는 행사에 가족들이 모두 갔어요.',
      'Opamning bitiruv marosimiga butun oilamiz bordi.',
      'The whole family went to my older sister’s graduation ceremony.',
      'Вся семья пошла на выпускную церемонию моей старшей сестры.',
    ),
    romanization: 'joreopsik',
    emoji: '🎓',
    tags: ['university', 'school-event'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_scholarship_noun',
    korean: '장학금',
    senseKey: 'education-scholarship',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학생의 공부를 돕기 위해 주는 돈',
      'talabaning o‘qishini qo‘llab-quvvatlash uchun beriladigan stipendiya',
      'scholarship',
      'стипендия',
    ),
    example: '성적이 좋아서 장학금을 받았어요.',
    exampleTranslations: S5U1T(
      '성적이 좋아서 학교에서 공부를 위한 돈을 받았어요.',
      'Baholarim yaxshi bo‘lgani uchun stipendiya oldim.',
      'I received a scholarship because my grades were good.',
      'Я получил стипендию благодаря хорошим оценкам.',
    ),
    romanization: 'janghakgeum',
    emoji: '💰',
    tags: ['university', 'scholarship'],
    isCore: true,
  }),

  makeS5U1Word({
    code: 'word_participate_event_verb',
    korean: '참가하다',
    senseKey: 'participate-activity-event',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '행사, 대회, 활동 등에 직접 참여하다',
      'tadbir, musobaqa yoki faoliyatda ishtirok etmoq',
      'to participate; to take part',
      'участвовать',
    ),
    example: '학교 노래자랑에 참가해 볼 거예요.',
    exampleTranslations: S5U1T(
      '학교 노래 대회에 직접 나가 볼 거예요.',
      'Universitet qo‘shiq tanlovida qatnashib ko‘raman.',
      'I’m going to participate in the school singing contest.',
      'Я собираюсь принять участие в школьном конкурсе песни.',
    ),
    romanization: 'chamgahada',
    emoji: '🏃',
    tags: ['university', 'event', 'participation'],
    isCore: true,
    usageNote: S5U1T(
      '참가하다는 대회·행사·활동에 직접 들어가 함께 하는 것에 초점이 있어요.',
      '참가하다 musobaqa, tadbir yoki faoliyatda bevosita ishtirok etishga urg‘u beradi.',
      '참가하다 emphasizes taking part in an activity, contest, or event.',
      '참가하다 подчёркивает непосредственное участие в мероприятии, конкурсе или деятельности.',
    ),
  }),
] satisfies readonly WordSeedEntry[];

const S5_UNIT1_SB_WORDS = [
  makeS5U1Word({
    code: 'word_bulletin_board_noun',
    korean: '게시판',
    senseKey: 'notice-bulletin-board',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '공지나 글을 여러 사람이 볼 수 있도록 올리는 곳',
      'e’lon va yozuvlar joylashtiriladigan doska yoki onlayn bo‘lim',
      'bulletin board; message board',
      'доска объявлений; форум',
    ),
    example: '학교 게시판에서 축제 공지를 봤어요.',
    exampleTranslations: S5U1T(
      '학교 게시판에 올라온 축제 안내를 봤어요.',
      'Universitet e’lonlar taxtasida festival haqidagi e’lonni ko‘rdim.',
      'I saw the festival notice on the school bulletin board.',
      'Я увидел объявление о фестивале на школьной доске объявлений.',
    ),
    romanization: 'gesipan',
    emoji: '📌',
    tags: ['school', 'notice'],
  }),

  makeS5U1Word({
    code: 'word_whisper_noun',
    korean: '귓속말',
    senseKey: 'whisper-private-speech',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '다른 사람이 듣지 못하게 귀 가까이에서 작게 하는 말',
      'boshqalar eshitmasligi uchun quloqqa sekin aytiladigan gap',
      'whisper',
      'шёпот',
    ),
    example: '수업 시간에는 친구와 귓속말을 하지 마세요.',
    exampleTranslations: S5U1T(
      '수업 중에는 친구에게 작은 목소리로 몰래 말하지 마세요.',
      'Dars vaqtida do‘stingiz bilan pichirlashmang.',
      'Do not whisper to your friend during class.',
      'Не шепчитесь с другом во время занятия.',
    ),
    romanization: 'gwitsongmal',
    emoji: '🤫',
    tags: ['communication'],
  }),

  makeS5U1Word({
    code: 'word_can_container_noun',
    korean: '캔',
    senseKey: 'beverage-metal-can',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '음료나 음식 등을 담는 금속으로 된 통',
      'ichimlik yoki ovqat solinadigan metall banka',
      'can; tin',
      'банка; жестяная банка',
    ),
    example: '빈 캔은 재활용 쓰레기에 버리세요.',
    exampleTranslations: S5U1T(
      '다 마신 캔은 재활용 쓰레기로 분리해서 버리세요.',
      'Bo‘sh bankani qayta ishlanadigan chiqindiga tashlang.',
      'Put empty cans in the recycling.',
      'Пустые банки выбрасывайте в перерабатываемый мусор.',
    ),
    romanization: 'kaen',
    emoji: '🥫',
    tags: ['recycling', 'container'],
  }),

  makeS5U1Word({
    code: 'word_high_school_student_noun',
    korean: '고등학생',
    senseKey: 'high-school-student',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '고등학교에 다니는 학생',
      'yuqori sinf maktab o‘quvchisi',
      'high school student',
      'старшеклассник',
    ),
    example: '저는 작년까지 고등학생이었어요.',
    exampleTranslations: S5U1T(
      '저는 작년까지 고등학교에 다녔어요.',
      'Men o‘tgan yilgacha yuqori sinf o‘quvchisi edim.',
      'I was a high school student until last year.',
      'До прошлого года я был старшеклассником.',
    ),
    romanization: 'godeunghaksaeng',
    emoji: '🎒',
    tags: ['school', 'person'],
  }),

  makeS5U1Word({
    code: 'word_be_popular_phrase',
    korean: '인기가 많다',
    senseKey: 'be-very-popular',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '많은 사람이 좋아하거나 관심을 가지다',
      'ko‘p odamlar orasida mashhur bo‘lmoq',
      'to be popular',
      'быть популярным',
    ),
    example: '그 동아리는 신입생들에게 인기가 많아요.',
    exampleTranslations: S5U1T(
      '그 동아리를 좋아하는 신입생이 많아요.',
      'Bu klub yangi talabalar orasida juda mashhur.',
      'That club is popular among new students.',
      'Этот клуб популярен среди новых студентов.',
    ),
    romanization: 'ingiga manta',
    emoji: '⭐',
    tags: ['popularity', 'expression'],
    difficulty: 5,
  }),

  makeS5U1Word({
    code: 'word_recyclable_waste_phrase',
    korean: '재활용 쓰레기',
    senseKey: 'recyclable-waste',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '다시 사용하거나 새로운 제품으로 만들 수 있는 쓰레기',
      'qayta ishlash mumkin bo‘lgan chiqindi',
      'recyclable waste',
      'перерабатываемые отходы',
    ),
    example: '캔과 병은 재활용 쓰레기로 분리해요.',
    exampleTranslations: S5U1T(
      '캔과 병은 다시 사용할 수 있도록 따로 버려요.',
      'Banka va butilkalarni qayta ishlash uchun alohida tashlaymiz.',
      'Cans and bottles are separated as recyclable waste.',
      'Банки и бутылки сортируют как перерабатываемые отходы.',
    ),
    romanization: 'jaehwaryong sseuregi',
    emoji: '♻️',
    tags: ['recycling', 'waste'],
  }),

  makeS5U1Word({
    code: 'word_be_a_mess_adjective',
    korean: '엉망이다',
    senseKey: 'be-a-complete-mess',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: S5U1T(
      '정리되지 않거나 상태가 아주 나쁘다',
      'juda tartibsiz yoki yomon holatda bo‘lmoq',
      'to be a mess; to be in terrible condition',
      'быть в полном беспорядке; быть в ужасном состоянии',
    ),
    example: '축제가 끝난 뒤 운동장이 엉망이었어요.',
    exampleTranslations: S5U1T(
      '축제가 끝난 뒤 운동장이 아주 지저분하고 정리되지 않았어요.',
      'Festivaldan keyin sport maydoni juda tartibsiz edi.',
      'The field was a complete mess after the festival.',
      'После фестиваля площадка была в полном беспорядке.',
    ),
    romanization: 'eongmangida',
    emoji: '😵',
    tags: ['condition', 'adjective'],
  }),

  makeS5U1Word({
    code: 'word_course_taking_noun',
    korean: '수강',
    senseKey: 'taking-academic-course',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '강의나 수업을 신청하여 듣는 것',
      'kurs yoki darsni o‘qish',
      'taking a course',
      'посещение учебного курса',
    ),
    example: '이번 학기 수강 과목을 확인했어요.',
    exampleTranslations: S5U1T(
      '이번 학기에 들을 과목을 확인했어요.',
      'Bu semestrda o‘qiydigan fanlarimni tekshirdim.',
      'I checked the courses I am taking this semester.',
      'Я проверил предметы, которые изучаю в этом семестре.',
    ),
    romanization: 'sugang',
    emoji: '📖',
    tags: ['university', 'course'],
  }),

  makeS5U1Word({
    code: 'word_general_waste_phrase',
    korean: '일반 쓰레기',
    senseKey: 'general-nonrecyclable-waste',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '재활용하지 않고 일반적으로 버리는 쓰레기',
      'qayta ishlanmaydigan oddiy chiqindi',
      'general waste; non-recyclable trash',
      'обычный неперерабатываемый мусор',
    ),
    example: '재활용이 안 되는 것은 일반 쓰레기로 버려요.',
    exampleTranslations: S5U1T(
      '다시 쓸 수 없는 쓰레기는 일반 쓰레기로 버려요.',
      'Qayta ishlanmaydigan narsalarni oddiy chiqindiga tashlaymiz.',
      'Things that cannot be recycled go in general waste.',
      'То, что нельзя переработать, выбрасывают в обычный мусор.',
    ),
    romanization: 'ilban sseuregi',
    emoji: '🗑️',
    tags: ['recycling', 'waste'],
  }),

  makeS5U1Word({
    code: 'word_opportunity_noun',
    korean: '기회',
    senseKey: 'opportunity-chance',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '어떤 일을 할 수 있는 좋은 때나 가능성',
      'biror ishni qilish uchun imkoniyat',
      'opportunity; chance',
      'возможность; шанс',
    ),
    example: '이번 행사는 새로운 친구를 만날 좋은 기회예요.',
    exampleTranslations: S5U1T(
      '이번 행사를 통해 새로운 친구를 만날 수 있어요.',
      'Bu tadbir yangi do‘stlar orttirish uchun yaxshi imkoniyat.',
      'This event is a good opportunity to meet new friends.',
      'Это мероприятие — хорошая возможность познакомиться с новыми друзьями.',
    ),
    romanization: 'gihoe',
    emoji: '🌟',
    tags: ['opportunity'],
  }),

  makeS5U1Word({
    code: 'word_extremely_difficult_idiom',
    korean: '하늘의 별 따기',
    senseKey: 'extremely-difficult-impossible-task',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '어떤 일을 이루기가 매우 어렵다는 뜻의 표현',
      'biror ishni amalga oshirish nihoyatda qiyinligini bildiradigan ibora',
      'an extremely difficult task; like reaching for a star in the sky',
      'крайне трудное, почти невозможное дело',
    ),
    example: '요즘 그 장학금을 받는 것은 하늘의 별 따기예요.',
    exampleTranslations: S5U1T(
      '요즘 그 장학금을 받기는 정말 어려워요.',
      'Hozir bu stipendiyani olish nihoyatda qiyin.',
      'Getting that scholarship these days is extremely difficult.',
      'Получить эту стипендию сейчас чрезвычайно трудно.',
    ),
    romanization: 'haneurui byeol ttagi',
    emoji: '🌠',
    tags: ['idiom', 'difficulty'],
    difficulty: 5,
    usageNote: S5U1T(
      '실제로 별을 딴다는 뜻이 아니라, 거의 불가능할 만큼 어렵다는 비유적인 표현이에요.',
      'Bu yulduzni haqiqatan uzish emas, juda qiyin ishni bildiruvchi ko‘chma ibora.',
      'This is figurative: it means something is extremely difficult, not literally picking a star.',
      'Это образное выражение: речь не о звезде буквально, а об исключительно трудном деле.',
    ),
  }),

  makeS5U1Word({
    code: 'word_garbage_bag_phrase',
    korean: '쓰레기 봉투',
    senseKey: 'garbage-trash-bag',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '쓰레기를 담아 버리는 봉투',
      'chiqindi solib tashlanadigan paket',
      'garbage bag; trash bag',
      'мусорный пакет',
    ),
    example: '일반 쓰레기는 쓰레기 봉투에 넣으세요.',
    exampleTranslations: S5U1T(
      '일반 쓰레기를 봉투에 담아서 버리세요.',
      'Oddiy chiqindini chiqindi paketiga soling.',
      'Put general waste in a garbage bag.',
      'Кладите обычный мусор в мусорный пакет.',
    ),
    romanization: 'sseuregi bongtu',
    emoji: '🗑️',
    tags: ['waste', 'daily-life'],
  }),

  makeS5U1Word({
    code: 'word_prize_money_noun',
    korean: '상금',
    senseKey: 'prize-money',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '대회나 경기에서 상으로 주는 돈',
      'tanlov yoki musobaqada sovrin sifatida beriladigan pul',
      'prize money',
      'денежный приз',
    ),
    example: '노래자랑에서 일등을 하면 상금을 받을 수 있어요.',
    exampleTranslations: S5U1T(
      '노래 대회에서 일등을 하면 상으로 돈을 받을 수 있어요.',
      'Qo‘shiq tanlovida birinchi o‘rinni olsangiz pul mukofoti olishingiz mumkin.',
      'If you win first place in the singing contest, you can receive prize money.',
      'Если занять первое место в конкурсе песни, можно получить денежный приз.',
    ),
    romanization: 'sanggeum',
    emoji: '🏆',
    tags: ['contest', 'money'],
  }),

  makeS5U1Word({
    code: 'word_german_language_noun',
    korean: '독일어',
    senseKey: 'german-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '독일에서 주로 사용하는 언어',
      'nemis tili',
      'German language',
      'немецкий язык',
    ),
    example: '저는 이번 학기에 독일어를 배워요.',
    exampleTranslations: S5U1T(
      '저는 이번 학기에 독일어 수업을 들어요.',
      'Bu semestrda nemis tilini o‘rganaman.',
      'I am studying German this semester.',
      'В этом семестре я изучаю немецкий язык.',
    ),
    romanization: 'dogireo',
    emoji: '🇩🇪',
    tags: ['language', 'class'],
  }),

  makeS5U1Word({
    code: 'word_liter_unit_noun',
    korean: '리터',
    senseKey: 'liter-volume-unit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '액체의 양을 재는 단위',
      'suyuqlik hajmini o‘lchaydigan litr birligi',
      'liter; litre',
      'литр',
    ),
    example: '쓰레기 봉투는 20리터짜리를 샀어요.',
    exampleTranslations: S5U1T(
      '20리터 크기의 쓰레기 봉투를 샀어요.',
      '20 litrlik chiqindi paketini sotib oldim.',
      'I bought a 20-liter garbage bag.',
      'Я купил мусорный пакет объёмом 20 литров.',
    ),
    romanization: 'riteo',
    emoji: '💧',
    tags: ['measurement', 'unit'],
  }),

  makeS5U1Word({
    code: 'word_information_session_noun',
    korean: '설명회',
    senseKey: 'information-explanatory-session',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '어떤 제도나 행사 등에 대해 자세히 설명하기 위해 여는 모임',
      'biror dastur yoki tizimni tushuntirish uchun o‘tkaziladigan yig‘ilish',
      'information session; briefing',
      'информационная встреча; презентация',
    ),
    example: '교환학생 설명회에 참석했어요.',
    exampleTranslations: S5U1T(
      '교환학생 제도에 대한 안내를 듣기 위해 설명회에 갔어요.',
      'Almashinuv dasturi haqidagi axborot yig‘ilishida qatnashdim.',
      'I attended the exchange student information session.',
      'Я посетил информационную встречу по программе обмена.',
    ),
    romanization: 'seolmyeonghoe',
    emoji: '📢',
    tags: ['university', 'information'],
  }),

  makeS5U1Word({
    code: 'word_philosophy_noun',
    korean: '철학',
    senseKey: 'academic-philosophy',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '인간, 세계, 지식과 가치 등에 대해 근본적으로 연구하는 학문',
      'inson, dunyo, bilim va qadriyatlarni o‘rganadigan falsafa fani',
      'philosophy',
      'философия',
    ),
    example: '철학 수업에서는 여러 생각을 토론해요.',
    exampleTranslations: S5U1T(
      '철학 수업에서 다양한 생각에 대해 이야기해요.',
      'Falsafa darsida turli fikrlarni muhokama qilamiz.',
      'We discuss different ideas in philosophy class.',
      'На занятиях по философии мы обсуждаем разные идеи.',
    ),
    romanization: 'cheolhak',
    emoji: '🤔',
    tags: ['university', 'academic-field'],
  }),

  makeS5U1Word({
    code: 'word_approximately_adverb',
    korean: '약',
    senseKey: 'approximately-about-number',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: S5U1T(
      '수나 양이 정확하지 않고 대략 그 정도임을 나타내는 말',
      'son yoki miqdorning taxminan ekanini bildiradigan so‘z',
      'about; approximately',
      'около; приблизительно',
    ),
    example: '설명회에는 약 100명이 참석했어요.',
    exampleTranslations: S5U1T(
      '설명회에는 대략 100명 정도가 참석했어요.',
      'Axborot yig‘ilishida taxminan 100 kishi qatnashdi.',
      'About 100 people attended the information session.',
      'На информационной встрече присутствовало около 100 человек.',
    ),
    romanization: 'yak',
    emoji: '≈',
    tags: ['quantity', 'adverb'],
    usageNote: S5U1T(
      '숫자 앞에서 사용해서 정확한 수가 아니라 대략적인 수임을 나타내요.',
      'Raqam oldidan kelib, miqdor taxminiy ekanini bildiradi.',
      'Placed before a number to show that the amount is approximate.',
      'Ставится перед числом и показывает приблизительное количество.',
    ),
  }),

  makeS5U1Word({
    code: 'word_be_helpful_phrase',
    korean: '도움이 되다',
    senseKey: 'be-helpful-useful',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '어떤 사람이나 일을 더 잘할 수 있게 좋은 영향을 주다',
      'biror kishiga yoki ishga foyda keltirmoq',
      'to be helpful; to be useful',
      'быть полезным; помогать',
    ),
    example: '선배의 조언이 학교생활에 많이 도움이 됐어요.',
    exampleTranslations: S5U1T(
      '선배의 조언 덕분에 학교생활을 하는 데 도움이 많이 됐어요.',
      'Yuqori kurs talabasining maslahati universitet hayotimga juda foydali bo‘ldi.',
      'The senior student’s advice was very helpful for university life.',
      'Совет старшекурсника очень помог мне в университетской жизни.',
    ),
    romanization: 'doumi doeda',
    emoji: '🤝',
    tags: ['help', 'expression'],
    difficulty: 5,
  }),

  makeS5U1Word({
    code: 'word_understanding_noun',
    korean: '이해',
    senseKey: 'understanding-comprehension',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '내용이나 의미를 알아서 받아들이는 것',
      'mazmun yoki ma’noni tushunish',
      'understanding; comprehension',
      'понимание',
    ),
    example: '강의를 이해하는 데 시간이 조금 걸렸어요.',
    exampleTranslations: S5U1T(
      '강의 내용을 알아듣는 데 시간이 조금 필요했어요.',
      'Ma’ruzani tushunishimga biroz vaqt kerak bo‘ldi.',
      'It took me a little time to understand the lecture.',
      'Мне понадобилось немного времени, чтобы понять лекцию.',
    ),
    romanization: 'ihae',
    emoji: '💡',
    tags: ['learning', 'understanding'],
  }),

  makeS5U1Word({
    code: 'word_imitate_follow_phrase',
    korean: '따라 하다',
    senseKey: 'imitate-copy-action',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '다른 사람이 하는 말이나 행동을 그대로 해 보다',
      'boshqa odamning gapi yoki harakatini takrorlamoq',
      'to imitate; to follow along',
      'повторять за кем-либо; подражать',
    ),
    example: '선생님의 발음을 듣고 따라 해 보세요.',
    exampleTranslations: S5U1T(
      '선생님의 발음을 듣고 똑같이 말해 보세요.',
      'O‘qituvchining talaffuzini tinglab, ortidan takrorlang.',
      'Listen to the teacher’s pronunciation and repeat after them.',
      'Послушайте произношение преподавателя и повторите.',
    ),
    romanization: 'ttara hada',
    emoji: '🗣️',
    tags: ['learning', 'action'],
  }),

  makeS5U1Word({
    code: 'word_date_time_noun',
    korean: '일시',
    senseKey: 'event-date-and-time',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '어떤 일이 열리는 날짜와 시간',
      'tadbir o‘tkaziladigan sana va vaqt',
      'date and time',
      'дата и время',
    ),
    example: '게시판에서 행사의 일시와 장소를 확인하세요.',
    exampleTranslations: S5U1T(
      '게시판에서 행사가 열리는 날짜, 시간, 장소를 확인하세요.',
      'E’lonlar taxtasidan tadbir sanasi, vaqti va joyini tekshiring.',
      'Check the event date, time, and location on the bulletin board.',
      'Проверьте дату, время и место мероприятия на доске объявлений.',
    ),
    romanization: 'ilsi',
    emoji: '🗓️',
    tags: ['event', 'schedule'],
  }),

  makeS5U1Word({
    code: 'word_society_noun',
    korean: '사회',
    senseKey: 'society-community',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '사람들이 함께 관계를 맺으며 살아가는 공동체',
      'odamlar birga yashaydigan va munosabat qiladigan jamiyat',
      'society',
      'общество',
    ),
    example: '대학교에서도 다양한 사회 문제를 공부해요.',
    exampleTranslations: S5U1T(
      '대학교에서도 여러 사회 문제에 대해 공부해요.',
      'Universitetda ham turli ijtimoiy muammolarni o‘rganamiz.',
      'We also study various social issues at university.',
      'В университете мы также изучаем разные общественные проблемы.',
    ),
    romanization: 'sahoe',
    emoji: '🌐',
    tags: ['society'],
  }),

  makeS5U1Word({
    code: 'word_same_cohort_peer_noun',
    korean: '동기',
    senseKey: 'same-cohort-peer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '같은 시기에 학교나 회사 등에 들어간 사람',
      'bir vaqtda universitet yoki ishga kirgan tengdosh',
      'peer from the same cohort',
      'однокурсник или коллега одного набора',
    ),
    example: '대학 동기들과 신입생 환영회에서 처음 만났어요.',
    exampleTranslations: S5U1T(
      '같은 해에 입학한 친구들을 신입생 환영회에서 처음 만났어요.',
      'Bir yilda universitetga kirgan kursdoshlarim bilan kutib olish kechasida ilk bor uchrashdim.',
      'I first met my university cohort at the new student welcome party.',
      'Я впервые встретил однокурсников своего набора на вечере новых студентов.',
    ),
    romanization: 'donggi',
    emoji: '👬',
    tags: ['university', 'relationship'],
    difficulty: 5,
    usageNote: S5U1T(
      '여기서는 ‘어떤 일을 하게 하는 이유’라는 뜻의 동기가 아니라 같은 시기에 들어간 사람이라는 뜻이에요.',
      'Bu yerda 동기 “motivatsiya” emas, bir vaqtda o‘qish yoki ishni boshlagan odamni anglatadi.',
      'Here 동기 means a peer from the same cohort, not “motivation.”',
      'Здесь 동기 означает человека того же набора, а не «мотивацию».',
    ),
  }),

  makeS5U1Word({
    code: 'word_provide_verb',
    korean: '제공하다',
    senseKey: 'provide-supply-service',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '필요한 물건, 정보, 서비스 등을 주다',
      'kerakli narsa, ma’lumot yoki xizmatni taqdim etmoq',
      'to provide; to offer',
      'предоставлять',
    ),
    example: '학교에서 참가자들에게 점심을 제공해요.',
    exampleTranslations: S5U1T(
      '학교에서 참가자들에게 점심을 줘요.',
      'Universitet ishtirokchilarga tushlik taqdim etadi.',
      'The school provides lunch to participants.',
      'Университет предоставляет участникам обед.',
    ),
    romanization: 'jegonghada',
    emoji: '🎁',
    tags: ['service', 'event'],
  }),

  makeS5U1Word({
    code: 'word_arabic_language_noun',
    korean: '아랍어',
    senseKey: 'arabic-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '아랍 여러 나라에서 사용하는 언어',
      'arab tili',
      'Arabic language',
      'арабский язык',
    ),
    example: '친구는 대학교에서 아랍어를 전공해요.',
    exampleTranslations: S5U1T(
      '친구의 대학 전공은 아랍어예요.',
      'Do‘stim universitetda arab tilini mutaxassislik sifatida o‘qiydi.',
      'My friend majors in Arabic at university.',
      'Мой друг изучает арабский язык как основную специальность.',
    ),
    romanization: 'arabeo',
    emoji: '🗣️',
    tags: ['language', 'university'],
  }),

  makeS5U1Word({
    code: 'word_cousin_noun',
    korean: '사촌',
    senseKey: 'cousin-family',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '부모의 형제자매의 자녀',
      'amakivachcha, tog‘avachcha, xolavachcha yoki ammavachcha',
      'cousin',
      'двоюродный брат; двоюродная сестра',
    ),
    example: '제 사촌도 올해 같은 대학교에 입학했어요.',
    exampleTranslations: S5U1T(
      '제 사촌도 올해 저와 같은 대학교의 신입생이 됐어요.',
      'Mening amakivachcham ham bu yil shu universitetga kirdi.',
      'My cousin also entered the same university this year.',
      'Мой двоюродный брат тоже поступил в тот же университет в этом году.',
    ),
    romanization: 'sachon',
    emoji: '👨‍👩‍👧‍👦',
    tags: ['family'],
  }),

  makeS5U1Word({
    code: 'word_singing_contest_noun',
    korean: '노래자랑',
    senseKey: 'singing-contest',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '사람들이 노래 실력을 겨루는 행사',
      'qo‘shiq kuylash tanlovi',
      'singing contest',
      'конкурс песни',
    ),
    example: '학교 축제에서 노래자랑이 열려요.',
    exampleTranslations: S5U1T(
      '학교 축제에서 노래 대회가 열려요.',
      'Universitet festivalida qo‘shiq tanlovi bo‘ladi.',
      'A singing contest will be held at the school festival.',
      'На университетском фестивале пройдёт конкурс песни.',
    ),
    romanization: 'noraejarang',
    emoji: '🎤',
    tags: ['festival', 'contest'],
  }),

  makeS5U1Word({
    code: 'word_volunteer_work_noun',
    korean: '자원봉사',
    senseKey: 'volunteer-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '돈을 받지 않고 다른 사람이나 사회를 위해 스스로 하는 활동',
      'haq olmay boshqalarga yoki jamiyatga yordam beradigan ko‘ngilli faoliyat',
      'volunteer work',
      'волонтёрская деятельность',
    ),
    example: '주말에 친구들과 자원봉사를 했어요.',
    exampleTranslations: S5U1T(
      '주말에 돈을 받지 않고 다른 사람을 돕는 활동을 했어요.',
      'Dam olish kunlari do‘stlarim bilan ko‘ngilli ish qildim.',
      'I did volunteer work with my friends over the weekend.',
      'На выходных я занимался волонтёрством с друзьями.',
    ),
    romanization: 'jawonbongsa',
    emoji: '🤲',
    tags: ['volunteering', 'activity'],
  }),

  makeS5U1Word({
    code: 'word_startled_suddenly_adverb',
    korean: '깜짝',
    senseKey: 'suddenly-startled',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: S5U1T(
      '갑자기 놀라는 모양을 나타내는 말',
      'to‘satdan hayrat yoki qo‘rquvni bildiradigan so‘z',
      'suddenly; with a start',
      'внезапно; от неожиданности',
    ),
    example: '친구들이 준비한 환영 행사에 깜짝 놀랐어요.',
    exampleTranslations: S5U1T(
      '친구들이 준비한 환영 행사 때문에 갑자기 많이 놀랐어요.',
      'Do‘stlar tayyorlagan kutib olish tadbiridan juda hayron qoldim.',
      'I was surprised by the welcome event my friends had prepared.',
      'Я был очень удивлён приветственным мероприятием, которое подготовили друзья.',
    ),
    romanization: 'kkamjjak',
    emoji: '😲',
    tags: ['reaction', 'adverb'],
  }),

  makeS5U1Word({
    code: 'word_auditorium_noun',
    korean: '강당',
    senseKey: 'school-auditorium',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학교나 기관에서 많은 사람이 모여 행사나 강연을 하는 큰 공간',
      'maktab yoki tashkilotdagi katta majlis zali',
      'auditorium; assembly hall',
      'актовый зал; аудитория',
    ),
    example: '신입생 설명회는 중앙 강당에서 열려요.',
    exampleTranslations: S5U1T(
      '신입생 설명회는 학교의 큰 행사장에서 열려요.',
      'Yangi talabalar yig‘ilishi markaziy akt zalida bo‘ladi.',
      'The new student information session is held in the main auditorium.',
      'Информационная встреча для новых студентов проходит в главном актовом зале.',
    ),
    romanization: 'gangdang',
    emoji: '🏛️',
    tags: ['school', 'place'],
  }),

  makeS5U1Word({
    code: 'word_ssireum_noun',
    korean: '씨름',
    senseKey: 'traditional-korean-wrestling',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '두 사람이 샅바를 잡고 상대를 넘어뜨리는 한국의 전통 운동',
      'ikki kishi belbog‘dan ushlab kurashadigan koreys an’anaviy kurashi',
      'ssireum; traditional Korean wrestling',
      'ссирым; традиционная корейская борьба',
    ),
    example: '축제에서 씨름 경기도 볼 수 있어요.',
    exampleTranslations: S5U1T(
      '축제에서 한국 전통 씨름 경기도 볼 수 있어요.',
      'Festivalda koreys an’anaviy kurashi musobaqasini ham ko‘rish mumkin.',
      'You can also watch a ssireum match at the festival.',
      'На фестивале можно посмотреть соревнование по традиционной борьбе ссирым.',
    ),
    romanization: 'ssireum',
    emoji: '🤼',
    tags: ['culture', 'sport'],
  }),

  makeS5U1Word({
    code: 'word_social_life_noun',
    korean: '사회생활',
    senseKey: 'social-work-life',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학교나 직장 등에서 다른 사람들과 관계를 맺으며 하는 생활',
      'o‘qish yoki ishda boshqa odamlar bilan munosabat qilib yashash',
      'social life; life in society or the workplace',
      'общественная и рабочая жизнь',
    ),
    example: '동아리 활동은 대학 사회생활에도 도움이 돼요.',
    exampleTranslations: S5U1T(
      '동아리 활동은 대학에서 다른 사람들과 관계를 만드는 데도 도움이 돼요.',
      'Klub faoliyati universitetdagi ijtimoiy hayotga ham yordam beradi.',
      'Club activities are also helpful for social life at university.',
      'Клубная деятельность помогает и в социальной жизни университета.',
    ),
    romanization: 'sahoesaenghwal',
    emoji: '🤝',
    tags: ['society', 'life'],
  }),

  makeS5U1Word({
    code: 'word_parking_lot_noun',
    korean: '주차장',
    senseKey: 'vehicle-parking-lot',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '자동차를 세워 두는 장소',
      'avtomobil qo‘yiladigan joy',
      'parking lot; car park',
      'парковка',
    ),
    example: '학교 주차장은 강당 뒤에 있어요.',
    exampleTranslations: S5U1T(
      '자동차를 세우는 곳은 강당 뒤에 있어요.',
      'Universitet avtoturargohi akt zalining orqasida.',
      'The school parking lot is behind the auditorium.',
      'Университетская парковка находится за актовым залом.',
    ),
    romanization: 'juchajang',
    emoji: '🅿️',
    tags: ['place', 'transportation'],
  }),

  makeS5U1Word({
    code: 'word_entry_into_country_noun',
    korean: '입국',
    senseKey: 'enter-country-immigration',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '다른 나라의 국경 안으로 들어가는 것',
      'boshqa mamlakatga kirish',
      'entry into a country',
      'въезд в страну',
    ),
    example: '한국에 입국한 뒤 외국인 등록을 했어요.',
    exampleTranslations: S5U1T(
      '한국에 들어온 뒤 외국인 등록을 했어요.',
      'Koreyaga kirganimdan keyin chet ellik sifatida ro‘yxatdan o‘tdim.',
      'After entering Korea, I completed foreign resident registration.',
      'После въезда в Корею я зарегистрировался как иностранный резидент.',
    ),
    romanization: 'ipguk',
    emoji: '🛬',
    tags: ['travel', 'immigration'],
  }),

  makeS5U1Word({
    code: 'word_friendly_familiar_adjective',
    korean: '친근하다',
    senseKey: 'feel-friendly-familiar',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: S5U1T(
      '가깝고 편안하게 느껴지다',
      'yaqin va samimiy tuyulmoq',
      'to feel friendly; to feel familiar',
      'быть дружелюбным; казаться близким и знакомым',
    ),
    example: '선배가 친근하게 말해 줘서 긴장이 풀렸어요.',
    exampleTranslations: S5U1T(
      '선배가 편하고 다정하게 말해 줘서 긴장이 풀렸어요.',
      'Yuqori kurs talabasi samimiy gapirgani uchun hayajonim bosildi.',
      'The senior spoke in a friendly way, so I relaxed.',
      'Старшекурсник говорил дружелюбно, и я расслабился.',
    ),
    romanization: 'chingeunhada',
    emoji: '😊',
    tags: ['personality', 'relationship'],
  }),

  makeS5U1Word({
    code: 'word_academic_semester_noun',
    korean: '학기',
    senseKey: 'academic-semester',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '학교의 한 학년을 나눈 수업 기간',
      'o‘quv yilining semestr davri',
      'semester; school term',
      'семестр; учебный семестр',
    ),
    example: '이번 학기는 3월에 시작했어요.',
    exampleTranslations: S5U1T(
      '이번 수업 기간은 3월에 시작했어요.',
      'Bu semestr mart oyida boshlandi.',
      'This semester started in March.',
      'Этот семестр начался в марте.',
    ),
    romanization: 'hakgi',
    emoji: '📆',
    tags: ['university', 'semester'],
  }),

  makeS5U1Word({
    code: 'word_throw_away_verb',
    korean: '버리다',
    senseKey: 'throw-away-discard',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: S5U1T(
      '필요하지 않은 물건을 없애거나 쓰레기로 내놓다',
      'keraksiz narsani tashlamoq',
      'to throw away; to discard',
      'выбрасывать',
    ),
    example: '캔은 일반 쓰레기와 함께 버리면 안 돼요.',
    exampleTranslations: S5U1T(
      '캔은 일반 쓰레기와 섞어서 버리면 안 돼요.',
      'Bankani oddiy chiqindi bilan birga tashlash mumkin emas.',
      'You should not throw cans away with general waste.',
      'Банки нельзя выбрасывать вместе с обычным мусором.',
    ),
    romanization: 'beorida',
    emoji: '🗑️',
    tags: ['waste', 'daily-life'],
  }),

  makeS5U1Word({
    code: 'word_you_pronoun',
    korean: '당신',
    senseKey: 'second-person-you-pronoun',
    partOfSpeech: WordPartOfSpeech.PRONOUN,
    meaning: S5U1T(
      '상대방을 가리키는 이인칭 대명사',
      'suhbatdoshni bildiradigan “siz/sen” olmoshi',
      'you',
      'вы; ты',
    ),
    example: '한국어에서 당신은 아무 상황에서나 쓰는 말이 아니에요.',
    exampleTranslations: S5U1T(
      '한국어에서는 상대를 부를 때 당신을 항상 쓰지는 않아요.',
      'Koreys tilida suhbatdoshga murojaat qilganda 당신 har doim ishlatilmaydi.',
      'In Korean, 당신 is not used as a general-purpose “you” in every situation.',
      'В корейском 당신 не является универсальным обращением «вы/ты».',
    ),
    romanization: 'dangsin',
    emoji: '👉',
    tags: ['pronoun', 'address-term'],
    difficulty: 5,
    usageNote: S5U1T(
      '한국어에서는 상대방 이름이나 직함을 쓰는 경우가 많아서 당신을 영어의 you처럼 아무 때나 쓰면 어색하거나 강하게 들릴 수 있어요.',
      'Koreys tilida ko‘pincha ism yoki unvon ishlatiladi; 당신ni inglizchadagi “you” kabi har joyda ishlatish g‘alati yoki keskin eshitilishi mumkin.',
      'Korean often uses names or titles instead, so 당신 can sound awkward or confrontational if used like the English “you.”',
      'В корейском чаще используют имя или должность, поэтому 당신 может звучать неестественно или резко, если употреблять его как английское “you”.',
    ),
  }),

  makeS5U1Word({
    code: 'word_hangeul_day_noun',
    korean: '한글날',
    senseKey: 'korean-hangeul-day',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '한글의 창제와 가치를 기념하는 한국의 기념일',
      'Hangul yaratilishini nishonlaydigan Koreya bayrami',
      'Hangeul Day',
      'День хангыля',
    ),
    example: '한글날에는 한글과 관련된 행사가 많이 열려요.',
    exampleTranslations: S5U1T(
      '한글날에는 한글을 기념하는 행사가 많이 있어요.',
      'Hangul kunida koreys yozuviga bag‘ishlangan ko‘plab tadbirlar bo‘ladi.',
      'Many Hangeul-related events are held on Hangeul Day.',
      'В День хангыля проводится много мероприятий, посвящённых корейской письменности.',
    ),
    romanization: 'hangeullal',
    emoji: '🇰🇷',
    tags: ['culture', 'holiday'],
  }),

  makeS5U1Word({
    code: 'word_public_transit_transfer_noun',
    korean: '환승',
    senseKey: 'public-transport-transfer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '버스, 지하철 등에서 다른 교통수단이나 노선으로 갈아타는 것',
      'avtobus yoki metrodan boshqa yo‘nalish yoki transportga o‘tish',
      'transfer between public transportation services',
      'пересадка на общественном транспорте',
    ),
    example: '이 역에서 지하철 2호선으로 환승하세요.',
    exampleTranslations: S5U1T(
      '이 역에서 지하철 2호선으로 갈아타세요.',
      'Bu bekatda metroning 2-yo‘nalishiga o‘ting.',
      'Transfer to subway Line 2 at this station.',
      'На этой станции пересядьте на вторую линию метро.',
    ),
    romanization: 'hwanseung',
    emoji: '🔄',
    tags: ['transportation', 'transfer'],
  }),

  makeS5U1Word({
    code: 'word_discount_noun',
    korean: '할인',
    senseKey: 'price-discount',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '원래 가격이나 요금보다 싸게 해 주는 것',
      'asl narx yoki tarifni arzonlashtirish',
      'discount',
      'скидка',
    ),
    example: '교통카드로 환승하면 할인을 받을 수 있어요.',
    exampleTranslations: S5U1T(
      '교통카드로 갈아타면 요금을 더 적게 낼 수 있어요.',
      'Transport kartasi bilan almashib minsangiz chegirma olishingiz mumkin.',
      'You can receive a discount when transferring with a transportation card.',
      'При пересадке с транспортной картой можно получить скидку.',
    ),
    romanization: 'harin',
    emoji: '🏷️',
    tags: ['money', 'transportation'],
  }),
] satisfies readonly WordSeedEntry[];

const S5_UNIT1_WB_WORDS = [
  makeS5U1Word({
    code: 'word_schedule_table_noun',
    korean: '일정표',
    senseKey: 'schedule-timetable-list',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '해야 할 일이나 행사와 시간을 정리해서 적은 표',
      'ishlar va vaqtlar yozilgan jadval',
      'schedule; timetable',
      'расписание; график',
    ),
    example: '이번 학기 일정표를 게시판에서 확인했어요.',
    exampleTranslations: S5U1T(
      '이번 학기의 중요한 날짜와 행사를 정리한 표를 확인했어요.',
      'Bu semestr jadvalini e’lonlar taxtasidan tekshirdim.',
      'I checked this semester’s schedule on the bulletin board.',
      'Я проверил расписание семестра на доске объявлений.',
    ),
    romanization: 'iljeongpyo',
    emoji: '🗓️',
    tags: ['schedule', 'university'],
  }),

  makeS5U1Word({
    code: 'word_marathon_noun',
    korean: '마라톤',
    senseKey: 'marathon-race',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '아주 긴 거리를 달리는 경기',
      'uzoq masofaga yugurish musobaqasi',
      'marathon',
      'марафон',
    ),
    example: '학교 마라톤 대회에 참가했어요.',
    exampleTranslations: S5U1T(
      '학교에서 열린 장거리 달리기 대회에 참가했어요.',
      'Universitet marafon musobaqasida qatnashdim.',
      'I participated in the school marathon.',
      'Я участвовал в университетском марафоне.',
    ),
    romanization: 'maraton',
    emoji: '🏃',
    tags: ['sports', 'event'],
  }),

  makeS5U1Word({
    code: 'word_vitamin_noun',
    korean: '비타민',
    senseKey: 'vitamin-nutrient',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '몸이 건강하게 기능하는 데 필요한 영양 성분',
      'organizm uchun zarur bo‘lgan vitamin',
      'vitamin',
      'витамин',
    ),
    example: '아침마다 비타민을 챙겨 먹어요.',
    exampleTranslations: S5U1T(
      '저는 매일 아침 비타민을 먹어요.',
      'Har kuni ertalab vitamin ichaman.',
      'I take vitamins every morning.',
      'Каждое утро я принимаю витамины.',
    ),
    romanization: 'bitamin',
    emoji: '💊',
    tags: ['health', 'nutrition'],
  }),

  makeS5U1Word({
    code: 'word_economics_noun',
    korean: '경제학',
    senseKey: 'academic-economics',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: S5U1T(
      '재화, 서비스, 생산, 소비와 경제 활동을 연구하는 학문',
      'iqtisodiy faoliyat, ishlab chiqarish va iste’molni o‘rganadigan fan',
      'economics',
      'экономика как наука',
    ),
    example: '제 친구는 경제학을 전공하고 있어요.',
    exampleTranslations: S5U1T(
      '제 친구의 대학 전공은 경제학이에요.',
      'Do‘stim universitetda iqtisodiyot yo‘nalishida o‘qiydi.',
      'My friend majors in economics.',
      'Мой друг изучает экономику как основную специальность.',
    ),
    romanization: 'gyeongjehak',
    emoji: '📈',
    tags: ['university', 'academic-field'],
  }),

  makeS5U1Word({
    code: 'word_computer_engineering_phrase',
    korean: '컴퓨터 공학',
    senseKey: 'academic-computer-engineering',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: S5U1T(
      '컴퓨터의 하드웨어와 소프트웨어, 시스템을 연구하는 공학 분야',
      'kompyuter apparati, dasturi va tizimlarini o‘rganadigan muhandislik sohasi',
      'computer engineering',
      'компьютерная инженерия',
    ),
    example: '저는 컴퓨터 공학을 전공하고 있어요.',
    exampleTranslations: S5U1T(
      '제 대학 전공은 컴퓨터 공학이에요.',
      'Men universitetda kompyuter muhandisligi yo‘nalishida o‘qiyman.',
      'I major in computer engineering.',
      'Моя специальность — компьютерная инженерия.',
    ),
    romanization: 'keompyuteo gonghak',
    emoji: '💻',
    tags: ['university', 'academic-field', 'engineering'],
  }),
] satisfies readonly WordSeedEntry[];

export const S5_UNIT1_WORDS = [
  ...S5_UNIT1_NODE1_WORDS,
  ...S5_UNIT1_NODE2_WORDS,
  ...S5_UNIT1_NODE3_WORDS,
  ...S5_UNIT1_NODE4_WORDS,
  ...S5_UNIT1_NODE5_WORDS,
  ...S5_UNIT1_TOPIC_WORDS,
  ...S5_UNIT1_SB_WORDS,
  ...S5_UNIT1_WB_WORDS,
] satisfies readonly WordSeedEntry[];

export const S5_UNIT1_NODES = [
  {
    title: {
      ko: '새 학기 학교 행사를 알아봐요',
      uz: 'Yangi semestrdagi universitet tadbirlarini o‘rganamiz',
      en: 'Explore New-Semester Campus Events',
      ru: 'Знакомимся с мероприятиями нового семестра',
    },
    section: 5,
    unit: 1,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '새 학기에는 어떤 행사가 있어요?',
          uz: 'Yangi semestrda qanday tadbirlar bor?',
          en: 'What Events Happen at the Start of a Semester?',
          ru: 'Какие мероприятия проходят в начале семестра?',
        },
        description: {
          ko: '입학식, 오리엔테이션, 신입생 환영회, 축제, 졸업식의 목적을 긴 상황 속에서 구별하고 신입생에게 어떤 행사가 필요한지 판단한다',
          uz: 'Kirish marosimi, orientatsiya, yangi talabalar kutib olish kechasi, festival va bitiruv marosimining maqsadini vaziyat ichida farqlash',
          en: 'Distinguish the purposes of entrance ceremonies, orientations, welcome parties, festivals, and graduation ceremonies and decide which events a new student needs',
          ru: 'Различать назначение церемонии поступления, ориентации, встречи новых студентов, фестиваля и выпускной церемонии',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u1_001_reading_quiz',
          's5u1_002_word_matching',
          's5u1_003_sentence_builder',
          's5u1_004_error_hunt',
          's5u1_005_fill_in_blank',
          's5u1_006_audio_match',
          's5u1_007_translate_builder',
          's5u1_008_speaking',
          's5u1_009_cloze_passage',
          's5u1_010_word_arrange',
          's5u1_011_reply_builder',
          's5u1_012_verb_transform',
          's5u1_013_reading_quiz',
          's5u1_014_listen_type',
          's5u1_015_sentence_builder',
          's5u1_016_listen_fill',
          's5u1_017_dialog_order',
          's5u1_018_translate_type',
          's5u1_019_fill_in_blank',
          's5u1_020_reply_builder',
        ],
      },
      {
        title: {
          ko: '게시판에서 일시와 장소를 확인해요',
          uz: 'E’lonlardan sana-vaqt va joyni tekshiramiz',
          en: 'Check the Date, Time, and Venue',
          ru: 'Проверяем дату, время и место',
        },
        description: {
          ko: '게시판의 행사 공지에서 일시, 장소, 강당, 주차장 정보를 찾아 실제 일정과 이동 조건에 맞는 행사를 선택한다',
          uz: 'E’lonlardan sana-vaqt, joy, katta zal va avtoturargoh ma’lumotlarini topib, o‘z jadvaliga mos tadbirni tanlash',
          en: 'Extract dates, times, venues, auditorium locations, and parking information from campus notices and use them to make practical decisions',
          ru: 'Находить в объявлениях дату, время, место, актовый зал и парковку и использовать эту информацию при выборе мероприятия',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u1_021_reading_quiz',
          's5u1_022_audio_match',
          's5u1_023_sentence_builder',
          's5u1_024_error_hunt',
          's5u1_025_fill_in_blank',
          's5u1_026_word_matching',
          's5u1_027_translate_builder',
          's5u1_028_listen_type',
          's5u1_029_cloze_passage',
          's5u1_030_word_arrange',
          's5u1_031_reply_builder',
          's5u1_032_verb_transform',
          's5u1_033_reading_quiz',
          's5u1_034_image_choice',
          's5u1_035_sentence_builder',
          's5u1_036_speaking',
          's5u1_037_dialog_order',
          's5u1_038_translate_type',
          's5u1_039_fill_in_blank',
          's5u1_040_reply_builder',
        ],
      },
      {
        title: {
          ko: '대회와 공연 안내를 읽어요',
          uz: 'Tanlov va konsert e’lonlarini o‘qiymiz',
          en: 'Read Contest and Performance Notices',
          ru: 'Читаем объявления о конкурсах и выступлениях',
        },
        description: {
          ko: '글쓰기 대회, 노래자랑, 음악회, 상금, 제공하다를 중심으로 참가하는 행사와 관람하는 행사를 구별하고 자신의 목적에 맞게 선택한다',
          uz: 'Yozuv tanlovi, qo‘shiq tanlovi, konsert, mukofot va taqdim etish so‘zlarini o‘rganib, qatnashiladigan va tomosha qilinadigan tadbirlarni farqlash',
          en: 'Use vocabulary for writing contests, singing contests, concerts, prize money, and provided benefits to distinguish participation from spectating',
          ru: 'Различать мероприятия, в которых участвуют, и мероприятия, которые смотрят, используя лексику конкурсов, концертов и призов',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u1_041_reading_quiz',
          's5u1_042_word_matching',
          's5u1_043_sentence_builder',
          's5u1_044_error_hunt',
          's5u1_045_fill_in_blank',
          's5u1_046_audio_match',
          's5u1_047_translate_builder',
          's5u1_048_speaking',
          's5u1_049_cloze_passage',
          's5u1_050_word_arrange',
          's5u1_051_reply_builder',
          's5u1_052_verb_transform',
          's5u1_053_reading_quiz',
          's5u1_054_listen_fill',
          's5u1_055_sentence_builder',
          's5u1_056_type_answer',
          's5u1_057_dialog_order',
          's5u1_058_translate_type',
          's5u1_059_fill_in_blank',
          's5u1_060_reply_builder',
        ],
      },
      {
        title: {
          ko: '동아리와 선배를 만나 봐요',
          uz: 'Klub va yuqori kurs talabalari bilan tanishamiz',
          en: 'Meet Seniors and Learn About Clubs',
          ru: 'Знакомимся со старшекурсниками и клубами',
        },
        description: {
          ko: '신입생, 선배, 동아리, 환영회, 기회, 도움이 되다를 연결해 새 학교에서 사람을 만나고 필요한 정보를 얻는 실제 상황을 연습한다',
          uz: 'Yangi talaba, yuqori kurs, klub, kutib olish kechasi va imkoniyat so‘zlarini bog‘lab, universitetda yangi odamlar bilan tanishish vaziyatlarini mashq qilish',
          en: 'Connect vocabulary for new students, seniors, clubs, welcome parties, opportunities, and helpful experiences in realistic campus interactions',
          ru: 'Связывать лексику новых студентов, старшекурсников, клубов, встреч и возможностей в реальных университетских ситуациях',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u1_061_reading_quiz',
          's5u1_062_audio_match',
          's5u1_063_sentence_builder',
          's5u1_064_error_hunt',
          's5u1_065_fill_in_blank',
          's5u1_066_word_matching',
          's5u1_067_translate_builder',
          's5u1_068_listen_type',
          's5u1_069_cloze_passage',
          's5u1_070_word_arrange',
          's5u1_071_reply_builder',
          's5u1_072_verb_transform',
          's5u1_073_reading_quiz',
          's5u1_074_type_answer',
          's5u1_075_sentence_builder',
          's5u1_076_speaking',
          's5u1_077_dialog_order',
          's5u1_078_translate_type',
          's5u1_079_fill_in_blank',
          's5u1_080_reply_builder',
        ],
      },
      {
        title: {
          ko: '나에게 필요한 학교 행사를 선택해요',
          uz: 'O‘zimga kerakli universitet tadbirini tanlayman',
          en: 'Choose the Campus Event You Need',
          ru: 'Выбираем нужное университетское мероприятие',
        },
        description: {
          ko: '앞에서 배운 행사·게시판·대회·동아리 어휘를 종합해 여러 공지와 개인 조건을 비교하고 실제로 어떤 행사에 참석할지 판단하고 설명한다',
          uz: 'Oldingi barcha tadbir, e’lon, tanlov va klub lug‘atini birlashtirib, turli e’lon va shaxsiy shartlar asosida tadbir tanlash',
          en: 'Integrate event, notice, contest, and club vocabulary to compare multiple announcements with personal constraints and justify a practical choice',
          ru: 'Объединить лексику мероприятий, объявлений, конкурсов и клубов, чтобы сравнивать варианты и обосновывать выбор',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u1_081_reading_quiz',
          's5u1_082_word_matching',
          's5u1_083_sentence_builder',
          's5u1_084_error_hunt',
          's5u1_085_fill_in_blank',
          's5u1_086_audio_match',
          's5u1_087_translate_builder',
          's5u1_088_listen_type',
          's5u1_089_cloze_passage',
          's5u1_090_word_arrange',
          's5u1_091_reply_builder',
          's5u1_092_verb_transform',
          's5u1_093_reading_quiz',
          's5u1_094_listen_fill',
          's5u1_095_sentence_builder',
          's5u1_096_speaking',
          's5u1_097_dialog_order',
          's5u1_098_translate_type',
          's5u1_099_fill_in_blank',
          's5u1_100_reply_builder',
        ],
      },
    ],
  },
  {
    title: {
      ko: '대학 수업을 계획해요',
      uz: 'Universitetdagi o‘qish rejasini tuzamiz',
      en: 'Plan Your University Studies',
      ru: 'Планируем университетскую учёбу',
    },
    section: 5,
    unit: 1,
    order: 2,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '강의와 전공을 이야기해요',
          uz: 'Darslar va mutaxassislik haqida gaplashamiz',
          en: 'Talk About Lectures and Your Major',
          ru: 'Говорим о лекциях и специальности',
        },
        description: {
          ko: '강의, 과목, 전공을 구별하고 자신의 전공과 이번 학기에 듣는 수업을 구체적으로 설명한다',
          uz: 'Ma’ruza, fan va mutaxassislikni farqlab, o‘z mutaxassisligi va bu semestrdagi kurslarini tushuntirish',
          en: 'Distinguish lectures, courses, and majors and explain your own field of study and semester classes',
          ru: 'Различать лекцию, предмет и специальность и подробно рассказывать о своей учёбе в этом семестре',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u1_101_reading_quiz',
          's5u1_102_word_matching',
          's5u1_103_sentence_builder',
          's5u1_104_error_hunt',
          's5u1_105_fill_in_blank',
          's5u1_106_audio_match',
          's5u1_107_translate_builder',
          's5u1_108_speaking',
          's5u1_109_cloze_passage',
          's5u1_110_word_arrange',
          's5u1_111_reply_builder',
          's5u1_112_verb_transform',
          's5u1_113_reading_quiz',
          's5u1_114_listen_type',
          's5u1_115_sentence_builder',
          's5u1_116_listen_fill',
          's5u1_117_dialog_order',
          's5u1_118_translate_type',
          's5u1_119_fill_in_blank',
          's5u1_120_reply_builder',
        ],
      },
      {
        title: {
          ko: '수강 신청을 해요',
          uz: 'Kurslarga ro‘yxatdan o‘tamiz',
          en: 'Register for Courses',
          ru: 'Регистрируемся на курсы',
        },
        description: {
          ko: '수강, 수강 신청, 신청하다, 인기가 많다를 익히고 철학과 외국어 강의의 시간·관심도·인기 정도를 비교해서 과목을 선택한다',
          uz: 'Kurs, ro‘yxatdan o‘tish, ariza va mashhurlik so‘zlarini o‘rganib, falsafa va xorijiy til darslarini jadval va qiziqish bo‘yicha tanlash',
          en: 'Use course-registration vocabulary to compare popular philosophy and foreign-language lectures by schedule and interest',
          ru: 'Использовать лексику регистрации на курсы и выбирать философские и языковые занятия с учётом расписания и интересов',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u1_121_reading_quiz',
          's5u1_122_word_matching',
          's5u1_123_sentence_builder',
          's5u1_124_error_hunt',
          's5u1_125_fill_in_blank',
          's5u1_126_audio_match',
          's5u1_127_translate_builder',
          's5u1_128_type_answer',
          's5u1_129_cloze_passage',
          's5u1_130_word_arrange',
          's5u1_131_reply_builder',
          's5u1_132_verb_transform',
          's5u1_133_reading_quiz',
          's5u1_134_listen_type',
          's5u1_135_sentence_builder',
          's5u1_136_listen_fill',
          's5u1_137_dialog_order',
          's5u1_138_translate_type',
          's5u1_139_fill_in_blank',
          's5u1_140_reply_builder',
        ],
      },
      {
        title: {
          ko: '성적과 학점을 관리해요',
          uz: 'Baho va kreditlarni boshqaramiz',
          en: 'Manage Grades and Credits',
          ru: 'Следим за оценками и кредитами',
        },
        description: {
          ko: '시험 결과인 성적과 졸업에 필요한 학점을 정확히 구별하고 시험, 과목, 졸업 조건을 함께 판단한다',
          uz: 'Imtihon bahosi bilan bitirish kreditlarini aniq farqlab, fan va bitirish talablarini birga baholash',
          en: 'Distinguish exam grades from academic credits and evaluate exams, courses, and graduation requirements together',
          ru: 'Различать оценки за экзамены и академические кредиты и одновременно учитывать предметы и требования для выпуска',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u1_141_reading_quiz',
          's5u1_142_word_matching',
          's5u1_143_sentence_builder',
          's5u1_144_error_hunt',
          's5u1_145_fill_in_blank',
          's5u1_146_audio_match',
          's5u1_147_translate_builder',
          's5u1_148_type_answer',
          's5u1_149_cloze_passage',
          's5u1_150_word_arrange',
          's5u1_151_reply_builder',
          's5u1_152_verb_transform',
          's5u1_153_reading_quiz',
          's5u1_154_listen_type',
          's5u1_155_sentence_builder',
          's5u1_156_listen_fill',
          's5u1_157_dialog_order',
          's5u1_158_translate_type',
          's5u1_159_fill_in_blank',
          's5u1_160_reply_builder',
        ],
      },
      {
        title: {
          ko: '장학금에 지원해요',
          uz: 'Stipendiyaga ariza beramiz',
          en: 'Apply for a Scholarship',
          ru: 'Подаём заявление на стипендию',
        },
        description: {
          ko: '지원하다, 신청하다, 합격하다, 장학금을 실제 대학 지원 과정과 연결하고 성적·학점·신청 기간 조건을 읽어 판단한다',
          uz: 'Ariza berish, ro‘yxatdan o‘tish, muvaffaqiyatli o‘tish va stipendiyani universitet jarayonlari bilan bog‘lash',
          en: 'Connect applying, registering, passing, and scholarships with realistic university application requirements',
          ru: 'Связать подачу заявления, регистрацию, успешный отбор и стипендию с реальными университетскими требованиями',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u1_161_reading_quiz',
          's5u1_162_word_matching',
          's5u1_163_sentence_builder',
          's5u1_164_error_hunt',
          's5u1_165_fill_in_blank',
          's5u1_166_audio_match',
          's5u1_167_translate_builder',
          's5u1_168_type_answer',
          's5u1_169_cloze_passage',
          's5u1_170_word_arrange',
          's5u1_171_reply_builder',
          's5u1_172_verb_transform',
          's5u1_173_reading_quiz',
          's5u1_174_listen_type',
          's5u1_175_sentence_builder',
          's5u1_176_listen_fill',
          's5u1_177_dialog_order',
          's5u1_178_translate_type',
          's5u1_179_fill_in_blank',
          's5u1_180_reply_builder',
        ],
      },
      {
        title: {
          ko: '한 학기 학업 계획을 세워요',
          uz: 'Bir semestrlik o‘qish rejasini tuzamiz',
          en: 'Build a Semester Study Plan',
          ru: 'Составляем учебный план на семестр',
        },
        description: {
          ko: '전공 과목, 수강 신청, 성적, 학점, 장학금과 관심 강의를 종합해 실제 대학생처럼 한 학기 시간표와 우선순위를 결정한다',
          uz: 'Mutaxassislik fanlari, kursga yozilish, baho, kredit, stipendiya va qiziqishlarni birlashtirib real semestr rejasini tuzish',
          en: 'Integrate major requirements, course registration, grades, credits, scholarships, and personal interests to build a realistic semester plan',
          ru: 'Объединить требования специальности, регистрацию, оценки, кредиты, стипендию и личные интересы для реального учебного плана',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u1_181_reading_quiz',
          's5u1_182_word_matching',
          's5u1_183_sentence_builder',
          's5u1_184_error_hunt',
          's5u1_185_fill_in_blank',
          's5u1_186_audio_match',
          's5u1_187_translate_builder',
          's5u1_188_listen_type',
          's5u1_189_cloze_passage',
          's5u1_190_word_arrange',
          's5u1_191_reply_builder',
          's5u1_192_verb_transform',
          's5u1_193_reading_quiz',
          's5u1_194_listen_fill',
          's5u1_195_sentence_builder',
          's5u1_196_speaking',
          's5u1_197_dialog_order',
          's5u1_198_translate_type',
          's5u1_199_fill_in_blank',
          's5u1_200_reply_builder',
        ],
      },
    ],
  },
  {
    title: {
      ko: '한국 유학 생활을 준비해요',
      uz: 'Koreyadagi talabalik hayotiga tayyorlanamiz',
      en: 'Prepare for Study-Abroad Life in Korea',
      ru: 'Готовимся к студенческой жизни в Корее',
    },
    section: 5,
    unit: 1,
    order: 3,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '입국 후 필요한 일을 확인해요',
          uz: 'Kirgandan keyingi kerakli ishlarni tekshiramiz',
          en: 'Handle Important Tasks After Arrival',
          ru: 'Что нужно сделать после въезда',
        },
        description: {
          ko: '유학생, 입국, 외국인 등록, 외국인등록증, 출입국 관련 기관을 구별하고 한국 생활을 시작할 때 필요한 행정 정보를 실제 상황에서 판단한다',
          uz: 'Xorijiy talaba, kirish, ro‘yxatdan o‘tish, ro‘yxat kartasi va immigratsiya idorasini real vaziyatlarda farqlash',
          en: 'Distinguish international-student, entry, foreigner-registration, identification-card, and immigration-office vocabulary in practical situations',
          ru: 'Различать лексику въезда, регистрации иностранца, регистрационной карты и иммиграционной службы в реальных ситуациях',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u1_201_reading_quiz',
          's5u1_202_word_matching',
          's5u1_203_sentence_builder',
          's5u1_204_error_hunt',
          's5u1_205_fill_in_blank',
          's5u1_206_audio_match',
          's5u1_207_translate_builder',
          's5u1_208_speaking',
          's5u1_209_cloze_passage',
          's5u1_210_word_arrange',
          's5u1_211_reply_builder',
          's5u1_212_verb_transform',
          's5u1_213_reading_quiz',
          's5u1_214_listen_type',
          's5u1_215_sentence_builder',
          's5u1_216_listen_fill',
          's5u1_217_dialog_order',
          's5u1_218_translate_type',
          's5u1_219_fill_in_blank',
          's5u1_220_reply_builder',
        ],
      },
      {
        title: {
          ko: '살 곳을 준비해요',
          uz: 'Yashash joyini tayyorlaymiz',
          en: 'Arrange a Place to Live',
          ru: 'Готовим жильё',
        },
        description: {
          ko: '숙소, 기숙사, 부동산의 의미를 정확하게 구별하고 한국에 오기 전과 도착 후의 실제 주거 계획을 세운다',
          uz: 'Turar joy, yotoqxona va rieltorlikni farqlab, Koreyaga kelishdan oldin real uy-joy rejasini tuzish',
          en: 'Distinguish accommodation, dormitory, and real estate agency vocabulary and build a practical housing plan',
          ru: 'Различать жильё, общежитие и агентство недвижимости и составлять реальный план проживания',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u1_221_reading_quiz',
          's5u1_222_word_matching',
          's5u1_223_sentence_builder',
          's5u1_224_error_hunt',
          's5u1_225_fill_in_blank',
          's5u1_226_audio_match',
          's5u1_227_translate_builder',
          's5u1_228_speaking',
          's5u1_229_cloze_passage',
          's5u1_230_word_arrange',
          's5u1_231_reply_builder',
          's5u1_232_verb_transform',
          's5u1_233_reading_quiz',
          's5u1_234_listen_type',
          's5u1_235_sentence_builder',
          's5u1_236_listen_fill',
          's5u1_237_dialog_order',
          's5u1_238_translate_type',
          's5u1_239_fill_in_blank',
          's5u1_240_reply_builder',
        ],
      },
      {
        title: {
          ko: '교통카드로 편하게 다녀요',
          uz: 'Transport kartasi bilan qulay yuramiz',
          en: 'Use Public Transportation Efficiently',
          ru: 'Удобно пользуемся общественным транспортом',
        },
        description: {
          ko: '교통카드, 환승, 할인의 차이를 실제 통학 상황에서 판단하고 버스와 지하철을 자연스럽게 연결해 이용한다',
          uz: 'Transport kartasi, transfer va chegirmani real qatnov vaziyatlarida farqlash',
          en: 'Use transportation-card, transfer, and discount vocabulary in realistic bus and subway commuting situations',
          ru: 'Использовать лексику транспортной карты, пересадки и скидки в реальных поездках на автобусе и метро',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u1_241_reading_quiz',
          's5u1_242_word_matching',
          's5u1_243_sentence_builder',
          's5u1_244_error_hunt',
          's5u1_245_fill_in_blank',
          's5u1_246_audio_match',
          's5u1_247_translate_builder',
          's5u1_248_speaking',
          's5u1_249_cloze_passage',
          's5u1_250_word_arrange',
          's5u1_251_reply_builder',
          's5u1_252_verb_transform',
          's5u1_253_reading_quiz',
          's5u1_254_listen_type',
          's5u1_255_sentence_builder',
          's5u1_256_listen_fill',
          's5u1_257_dialog_order',
          's5u1_258_translate_type',
          's5u1_259_fill_in_blank',
          's5u1_260_reply_builder',
        ],
      },
      {
        title: {
          ko: '쓰레기를 나누어 버려요',
          uz: 'Chiqindini ajratib tashlaymiz',
          en: 'Sort and Dispose of Waste',
          ru: 'Сортируем и выбрасываем мусор',
        },
        description: {
          ko: '재활용 쓰레기, 음식물 쓰레기, 일반 쓰레기, 캔, 쓰레기봉투를 실제 생활 상황에서 구별하고 올바르게 분리해서 버린다',
          uz: 'Qayta ishlanadigan, oziq-ovqat va oddiy chiqindi, banka va chiqindi paketini real vaziyatlarda farqlash',
          en: 'Distinguish recyclable, food, and general waste and correctly use can and trash-bag vocabulary in practical disposal situations',
          ru: 'Различать перерабатываемый, пищевой и обычный мусор и правильно использовать соответствующую лексику',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u1_261_reading_quiz',
          's5u1_262_word_matching',
          's5u1_263_sentence_builder',
          's5u1_264_error_hunt',
          's5u1_265_fill_in_blank',
          's5u1_266_audio_match',
          's5u1_267_translate_builder',
          's5u1_268_speaking',
          's5u1_269_cloze_passage',
          's5u1_270_word_arrange',
          's5u1_271_reply_builder',
          's5u1_272_verb_transform',
          's5u1_273_reading_quiz',
          's5u1_274_listen_type',
          's5u1_275_sentence_builder',
          's5u1_276_listen_fill',
          's5u1_277_dialog_order',
          's5u1_278_translate_type',
          's5u1_279_fill_in_blank',
          's5u1_280_reply_builder',
        ],
      },
      {
        title: {
          ko: '유학 생활 정보를 종합해요',
          uz: 'Chet eldagi talabalik ma’lumotlarini birlashtiramiz',
          en: 'Put Study-Abroad Life Skills Together',
          ru: 'Объединяем навыки жизни иностранного студента',
        },
        description: {
          ko: '입국과 등록, 숙소, 교통카드와 환승, 쓰레기 분리까지 교재의 유학 생활 안내를 통합해 실제 새 유학생이 필요한 정보를 판단하고 조언한다',
          uz: 'Kirish va ro‘yxat, turar joy, transport va chiqindi qoidalarini birlashtirib real yangi talaba vaziyatlarini hal qilish',
          en: 'Integrate arrival, registration, housing, transportation, and waste-sorting information to solve realistic study-abroad situations',
          ru: 'Объединить информацию о въезде, регистрации, жилье, транспорте и сортировке мусора для реальных ситуаций иностранного студента',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u1_281_reading_quiz',
          's5u1_282_word_matching',
          's5u1_283_sentence_builder',
          's5u1_284_error_hunt',
          's5u1_285_fill_in_blank',
          's5u1_286_audio_match',
          's5u1_287_translate_builder',
          's5u1_288_listen_type',
          's5u1_289_cloze_passage',
          's5u1_290_word_arrange',
          's5u1_291_reply_builder',
          's5u1_292_verb_transform',
          's5u1_293_reading_quiz',
          's5u1_294_listen_fill',
          's5u1_295_sentence_builder',
          's5u1_296_speaking',
          's5u1_297_dialog_order',
          's5u1_298_translate_type',
          's5u1_299_fill_in_blank',
          's5u1_300_reply_builder',
        ],
      },
    ],
  },
  {
    title: {
      ko: '학교생활을 더 즐겁게 만들어요',
      uz: 'Universitet hayotini yanada mazmunli qilamiz',
      en: 'Make Campus Life More Fulfilling',
      ru: 'Делаем университетскую жизнь насыщеннее',
    },
    section: 5,
    unit: 1,
    order: 4,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '학교생활에서 무엇이 중요해요?',
          uz: 'Universitet hayotida nima muhim?',
          en: 'What Matters Most in Campus Life?',
          ru: 'Что важно в университетской жизни?',
        },
        description: {
          ko: '교재의 공부, 여행, 아르바이트, 동아리 활동, 자원봉사, 사람 만나기 항목을 활용해 학생마다 다른 학교생활의 우선순위를 상황에 맞게 판단한다',
          uz: 'O‘qish, sayohat, yarim kunlik ish, klub, ko‘ngillilik va odamlar bilan tanishish orasida shaxsiy ustuvorliklarni aniqlash',
          en: 'Use the textbook activities of studying, travel, part-time work, clubs, volunteering, and social relationships to evaluate different campus-life priorities',
          ru: 'Определять личные приоритеты между учёбой, путешествиями, подработкой, клубами, волонтёрством и общением',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u1_301_reading_quiz',
          's5u1_302_word_matching',
          's5u1_303_sentence_builder',
          's5u1_304_error_hunt',
          's5u1_305_fill_in_blank',
          's5u1_306_audio_match',
          's5u1_307_translate_builder',
          's5u1_308_speaking',
          's5u1_309_cloze_passage',
          's5u1_310_word_arrange',
          's5u1_311_reply_builder',
          's5u1_312_verb_transform',
          's5u1_313_reading_quiz',
          's5u1_314_listen_type',
          's5u1_315_sentence_builder',
          's5u1_316_listen_fill',
          's5u1_317_dialog_order',
          's5u1_318_translate_type',
          's5u1_319_fill_in_blank',
          's5u1_320_reply_builder',
        ],
      },
      {
        title: {
          ko: '아르바이트와 자원봉사는 달라요',
          uz: 'Yarim kunlik ish va ko‘ngillilik farq qiladi',
          en: 'Part-Time Work and Volunteering Are Different',
          ru: 'Подработка и волонтёрство — не одно и то же',
        },
        description: {
          ko: '돈을 벌기 위한 아르바이트와 다른 사람을 돕기 위한 자원봉사를 목적, 보수, 상황을 기준으로 정확히 구별한다',
          uz: 'Haq to‘lanadigan ish va boshqalarga yordam berishga qaratilgan ko‘ngillilikni maqsad va vaziyat bo‘yicha farqlash',
          en: 'Distinguish paid part-time work from volunteer work by purpose, compensation, and context',
          ru: 'Различать оплачиваемую подработку и волонтёрство по цели, оплате и ситуации',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u1_321_reading_quiz',
          's5u1_322_audio_match',
          's5u1_323_sentence_builder',
          's5u1_324_error_hunt',
          's5u1_325_fill_in_blank',
          's5u1_326_word_matching',
          's5u1_327_translate_builder',
          's5u1_328_type_answer',
          's5u1_329_cloze_passage',
          's5u1_330_word_arrange',
          's5u1_331_reply_builder',
          's5u1_332_verb_transform',
          's5u1_333_reading_quiz',
          's5u1_334_listen_type',
          's5u1_335_sentence_builder',
          's5u1_336_listen_fill',
          's5u1_337_dialog_order',
          's5u1_338_translate_type',
          's5u1_339_fill_in_blank',
          's5u1_340_reply_builder',
        ],
      },
      {
        title: {
          ko: '동아리에서 사람들을 만나요',
          uz: 'Klubda yangi odamlar bilan tanishamiz',
          en: 'Meet People Through Club Activities',
          ru: 'Знакомимся с людьми через клубы',
        },
        description: {
          ko: '동아리 가입과 동아리 활동을 구별하고 같은 관심사를 가진 사람을 만나 학교생활에 적응하는 실제 상황을 연습한다',
          uz: 'Klubga a’zo bo‘lish va faol qatnashishni farqlab, bir xil qiziqishdagi talabalar bilan tanishish',
          en: 'Distinguish joining a club from participating in club activities and use clubs to build relationships and adapt to campus life',
          ru: 'Различать вступление в клуб и участие в его деятельности и использовать клубы для знакомств и адаптации',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u1_341_reading_quiz',
          's5u1_342_word_matching',
          's5u1_343_sentence_builder',
          's5u1_344_error_hunt',
          's5u1_345_fill_in_blank',
          's5u1_346_audio_match',
          's5u1_347_translate_builder',
          's5u1_348_speaking',
          's5u1_349_cloze_passage',
          's5u1_350_word_arrange',
          's5u1_351_reply_builder',
          's5u1_352_verb_transform',
          's5u1_353_reading_quiz',
          's5u1_354_listen_type',
          's5u1_355_sentence_builder',
          's5u1_356_listen_fill',
          's5u1_357_dialog_order',
          's5u1_358_translate_type',
          's5u1_359_fill_in_blank',
          's5u1_360_reply_builder',
        ],
      },
      {
        title: {
          ko: '대학 축제를 즐겨요',
          uz: 'Universitet festivalidan zavqlanamiz',
          en: 'Enjoy the University Festival',
          ru: 'Наслаждаемся университетским фестивалем',
        },
        description: {
          ko: '교재의 대학 축제 듣기와 말하기를 확장해 공연 관람과 직접 참가를 구별하고 과거 경험과 앞으로 하고 싶은 활동을 이야기한다',
          uz: 'Festivalni tomosha qilish va unda bevosita qatnashishni farqlab, oldingi tajriba va yangi reja haqida gapirish',
          en: 'Extend the textbook university-festival tasks by distinguishing watching from participating and comparing past experiences with future plans',
          ru: 'Различать просмотр и непосредственное участие в университетском фестивале и обсуждать прошлый опыт и будущие планы',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u1_361_reading_quiz',
          's5u1_362_word_matching',
          's5u1_363_sentence_builder',
          's5u1_364_error_hunt',
          's5u1_365_fill_in_blank',
          's5u1_366_audio_match',
          's5u1_367_translate_builder',
          's5u1_368_speaking',
          's5u1_369_cloze_passage',
          's5u1_370_word_arrange',
          's5u1_371_reply_builder',
          's5u1_372_verb_transform',
          's5u1_373_reading_quiz',
          's5u1_374_listen_type',
          's5u1_375_sentence_builder',
          's5u1_376_listen_fill',
          's5u1_377_dialog_order',
          's5u1_378_translate_type',
          's5u1_379_fill_in_blank',
          's5u1_380_reply_builder',
        ],
      },
      {
        title: {
          ko: '만족스러운 학교생활을 만들어요',
          uz: 'Universitet hayotidan mamnun bo‘lish yo‘lini topamiz',
          en: 'Build a Satisfying Campus Life',
          ru: 'Создаём удовлетворяющую университетскую жизнь',
        },
        description: {
          ko: '성적 하나가 아니라 공부, 아르바이트, 친구 관계, 동아리 활동, 자원봉사의 균형을 종합해 자신의 학교생활 만족도를 판단하고 개선 방법을 제안한다',
          uz: 'Faqat baho emas, o‘qish, ish, do‘stlar, klub va ko‘ngillilik muvozanatini baholab universitet hayotini yaxshilash',
          en: 'Evaluate campus-life satisfaction through the balance of study, part-time work, friendships, clubs, and volunteering and suggest practical improvements',
          ru: 'Оценивать удовлетворённость университетской жизнью через баланс учёбы, работы, друзей, клубов и волонтёрства и предлагать улучшения',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u1_381_reading_quiz',
          's5u1_382_word_matching',
          's5u1_383_sentence_builder',
          's5u1_384_error_hunt',
          's5u1_385_fill_in_blank',
          's5u1_386_audio_match',
          's5u1_387_translate_builder',
          's5u1_388_speaking',
          's5u1_389_cloze_passage',
          's5u1_390_word_arrange',
          's5u1_391_reply_builder',
          's5u1_392_verb_transform',
          's5u1_393_reading_quiz',
          's5u1_394_listen_type',
          's5u1_395_sentence_builder',
          's5u1_396_listen_fill',
          's5u1_397_dialog_order',
          's5u1_398_translate_type',
          's5u1_399_fill_in_blank',
          's5u1_400_reply_builder',
        ],
      },
    ],
  },
  {
    title: {
      ko: '인터뷰해서 친구를 소개해요',
      uz: 'Intervyu qilib do‘stimizni tanishtiramiz',
      en: 'Interview and Introduce a Friend',
      ru: 'Берём интервью и представляем друга',
    },
    section: 5,
    unit: 1,
    order: 5,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '친구를 인터뷰해요',
          uz: 'Do‘stimizdan intervyu olamiz',
          en: 'Interview a Friend',
          ru: 'Берём интервью у друга',
        },
        description: {
          ko: '친구 소개에 필요한 정보를 얻기 위해 질문을 준비하고 상대의 대답을 정확하게 듣고 확인한다',
          uz: 'Do‘stni tanishtirish uchun kerakli savollarni tayyorlab, javoblarni aniq tinglash va tekshirish',
          en: 'Prepare questions and accurately gather the information needed to introduce a friend',
          ru: 'Готовить вопросы и точно получать информацию, необходимую для представления друга',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 1,
        questions: [
          's5u1_401_reading_quiz',
          's5u1_402_word_matching',
          's5u1_403_sentence_builder',
          's5u1_404_error_hunt',
          's5u1_405_fill_in_blank',
          's5u1_406_audio_match',
          's5u1_407_translate_builder',
          's5u1_408_speaking',
          's5u1_409_cloze_passage',
          's5u1_410_word_arrange',
          's5u1_411_reply_builder',
          's5u1_412_verb_transform',
          's5u1_413_reading_quiz',
          's5u1_414_listen_type',
          's5u1_415_sentence_builder',
          's5u1_416_listen_fill',
          's5u1_417_dialog_order',
          's5u1_418_translate_type',
          's5u1_419_fill_in_blank',
          's5u1_420_reply_builder',
        ],
      },
      {
        title: {
          ko: '인터뷰 정보를 정리해요',
          uz: 'Intervyu maʼlumotlarini tartibga solamiz',
          en: 'Organize Interview Information',
          ru: 'Организуем информацию интервью',
        },
        description: {
          ko: '인터뷰에서 확인한 사실과 추측을 구별하고 발표 목적에 필요한 정보를 골라 주제별로 정리한다',
          uz: 'Tasdiqlangan fakt va taxminni ajratib, taqdimotga kerakli maʼlumotni mavzu bo‘yicha tartiblash',
          en: 'Distinguish confirmed facts from assumptions and organize relevant information by topic',
          ru: 'Отделять подтверждённые факты от предположений и организовывать нужную информацию по темам',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 2,
        questions: [
          's5u1_421_reading_quiz',
          's5u1_422_word_matching',
          's5u1_423_sentence_builder',
          's5u1_424_error_hunt',
          's5u1_425_fill_in_blank',
          's5u1_426_audio_match',
          's5u1_427_translate_builder',
          's5u1_428_speaking',
          's5u1_429_cloze_passage',
          's5u1_430_word_arrange',
          's5u1_431_reply_builder',
          's5u1_432_verb_transform',
          's5u1_433_reading_quiz',
          's5u1_434_listen_type',
          's5u1_435_sentence_builder',
          's5u1_436_listen_fill',
          's5u1_437_dialog_order',
          's5u1_438_translate_type',
          's5u1_439_fill_in_blank',
          's5u1_440_reply_builder',
        ],
      },
      {
        title: {
          ko: '인터뷰한 친구를 소개해요',
          uz: 'Intervyu qilgan do‘stimizni tanishtiramiz',
          en: 'Introduce the Friend You Interviewed',
          ru: 'Представляем друга после интервью',
        },
        description: {
          ko: '전공, 관심사, 학교 활동처럼 인터뷰에서 확인한 정보를 서로 연결해 한 사람의 특징이 잘 드러나도록 소개한다',
          uz: 'Mutaxassislik, qiziqish va universitet faoliyatini bog‘lab, do‘stni tabiiy tanishtirish',
          en: 'Connect confirmed information such as major, interests, and campus activities into a natural introduction',
          ru: 'Связывать специальность, интересы и университетскую деятельность в естественное представление человека',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 3,
        questions: [
          's5u1_441_reading_quiz',
          's5u1_442_word_matching',
          's5u1_443_sentence_builder',
          's5u1_444_error_hunt',
          's5u1_445_fill_in_blank',
          's5u1_446_audio_match',
          's5u1_447_translate_builder',
          's5u1_448_speaking',
          's5u1_449_cloze_passage',
          's5u1_450_word_arrange',
          's5u1_451_reply_builder',
          's5u1_452_verb_transform',
          's5u1_453_reading_quiz',
          's5u1_454_listen_type',
          's5u1_455_sentence_builder',
          's5u1_456_listen_fill',
          's5u1_457_dialog_order',
          's5u1_458_translate_type',
          's5u1_459_fill_in_blank',
          's5u1_460_reply_builder',
        ],
      },
      {
        title: {
          ko: '누구를 어떻게 불러요?',
          uz: 'Kimga qanday murojaat qilamiz?',
          en: 'How Do You Address People?',
          ru: 'Как обращаться к людям?',
        },
        description: {
          ko: '한국의 호칭 문화를 학교생활 상황에 적용해 선배와 후배의 관계를 구별하고 관계와 상황에 맞게 사람을 부른다',
          uz: 'Koreys murojaat madaniyatini universitet vaziyatiga qo‘llab, 선배 va 후배 munosabatini ajratish',
          en: 'Apply Korean forms of address to campus situations and distinguish senior and junior relationships',
          ru: 'Применять корейские формы обращения в университетских ситуациях и различать старших и младших',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 4,
        questions: [
          's5u1_461_reading_quiz',
          's5u1_462_word_matching',
          's5u1_463_sentence_builder',
          's5u1_464_error_hunt',
          's5u1_465_fill_in_blank',
          's5u1_466_audio_match',
          's5u1_467_translate_builder',
          's5u1_468_speaking',
          's5u1_469_cloze_passage',
          's5u1_470_word_arrange',
          's5u1_471_reply_builder',
          's5u1_472_verb_transform',
          's5u1_473_reading_quiz',
          's5u1_474_listen_type',
          's5u1_475_sentence_builder',
          's5u1_476_listen_fill',
          's5u1_477_dialog_order',
          's5u1_478_translate_type',
          's5u1_479_fill_in_blank',
          's5u1_480_reply_builder',
        ],
      },
      {
        title: {
          ko: '인터뷰부터 소개까지',
          uz: 'Intervyudan tanishtirishgacha',
          en: 'From Interview to Introduction',
          ru: 'От интервью до представления',
        },
        description: {
          ko: '질문, 대답, 정보 정리, 친구 소개, 호칭 선택을 하나의 실제 과제로 연결해 1과의 대학생활 어휘를 종합적으로 사용한다',
          uz: 'Savol, javob, maʼlumotni tartiblash, tanishtirish va murojaatni bitta amaliy topshiriqda birlashtirish',
          en: 'Combine questioning, answers, information organization, introductions, and forms of address into one practical task',
          ru: 'Объединить вопросы, ответы, обработку информации, представление человека и формы обращения в одной практической задаче',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_5,
        order: 5,
        questions: [
          's5u1_481_reading_quiz',
          's5u1_482_word_matching',
          's5u1_483_sentence_builder',
          's5u1_484_error_hunt',
          's5u1_485_fill_in_blank',
          's5u1_486_audio_match',
          's5u1_487_translate_builder',
          's5u1_488_speaking',
          's5u1_489_cloze_passage',
          's5u1_490_word_arrange',
          's5u1_491_reply_builder',
          's5u1_492_verb_transform',
          's5u1_493_reading_quiz',
          's5u1_494_listen_type',
          's5u1_495_sentence_builder',
          's5u1_496_listen_fill',
          's5u1_497_dialog_order',
          's5u1_498_translate_type',
          's5u1_499_fill_in_blank',
          's5u1_500_reply_builder',
        ],
      },
    ],
  },
];
