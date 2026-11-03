import { LessonCategory } from '../../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../../lessons/schemas/question.schema';
import { WordPartOfSpeech } from '../../../../words/schemas/word.schema';

type I18nText = {
  ko: string;
  uz: string;
  en: string;
  ru: string;
};

const L = (ko: string, uz: string, en: string, ru: string): I18nText => ({
  ko,
  uz,
  en,
  ru,
});

// Section 1–2 = placement level 1 band
const LV = QuestionLevel.LEVEL_1;

const SPEAK_INSTRUCTION = L(
  '영어를 듣고 따라 말하세요.',
  'Inglizcha gapni tinglang va takrorlang.',
  'Listen and repeat.',
  'Послушайте и повторите.',
);

const FILL_INSTRUCTION = L(
  '빈칸에 알맞은 말을 고르세요.',
  'Bo‘sh joyga mos so‘zni tanlang.',
  'Choose the correct word for the blank.',
  'Выберите правильное слово для пропуска.',
);

const SENTENCE_BUILDER_INSTRUCTION = L(
  '단어를 올바른 순서로 배열해 영어 문장을 만드세요.',
  'So‘zlarni to‘g‘ri tartibda joylashtirib inglizcha gap tuzing.',
  'Put the words in the correct order to make an English sentence.',
  'Расположите слова в правильном порядке, чтобы составить предложение на английском языке.',
);

const TRANSLATE_INSTRUCTION = L(
  '뜻을 보고 영어 문장을 만드세요.',
  'Ma’noga qarab inglizcha gap tuzing.',
  'Build the sentence in English.',
  'Составьте предложение на английском языке.',
);

const TYPE_INSTRUCTION = L(
  '영어로 정답을 입력하세요.',
  'Javobni ingliz tilida yozing.',
  'Type the answer in English.',
  'Введите ответ на английском языке.',
);

const ARRANGE_INSTRUCTION = L(
  '영어를 듣고 단어를 올바른 순서로 배열하세요.',
  'Inglizcha gapni tinglab, so‘zlarni to‘g‘ri tartibda joylashtiring.',
  'Listen and put the English words in the correct order.',
  'Прослушайте и расположите английские слова в правильном порядке.',
);

const DIALOG_INSTRUCTION = L(
  '대화에 가장 알맞은 대답을 고르세요.',
  'Dialog uchun eng mos javobni tanlang.',
  'Choose the best response.',
  'Выберите наиболее подходящий ответ.',
);

const REPLY_INSTRUCTION = L(
  '상대의 말을 듣고 알맞은 대답을 만드세요.',
  'Suhbatdoshning gapini tinglab, mos javob tuzing.',
  'Listen and build the correct reply.',
  'Послушайте собеседника и составьте подходящий ответ.',
);

const MATCH_INSTRUCTION = L(
  '영어와 뜻을 연결하세요.',
  'Inglizcha so‘zlarni ma’nolari bilan moslang.',
  'Match the English words with their meanings.',
  'Соедините английские слова с их значениями.',
);

const AUDIO_MATCH_INSTRUCTION = L(
  '영어를 듣고 뜻과 연결하세요.',
  'Inglizcha so‘zlarni tinglang va ma’nolari bilan moslang.',
  'Listen and match the English words with their meanings.',
  'Прослушайте английские слова и сопоставьте их со значениями.',
);

const IMAGE_INSTRUCTION = L(
  '영어 단어에 알맞은 이미지를 고르세요.',
  'Inglizcha so‘zga mos rasmni tanlang.',
  'Choose the correct image for the English word.',
  'Выберите подходящее изображение для английского слова.',
);

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 1 · Node 1
// 1.1 Multicultural cities
//
// Coverage
// - countries
// - nationalities
// - main languages
// - word stress through listening/speaking
// - present simple: be
// - am / is / are
// - contractions
// - negative be
// - yes/no questions with be
// - short answers
// - Where are you from?
// - What's your nationality?
// - multicultural city context
//
// IMPORTANT
// *_WORDS에는 실제 단어만 등록.
// 문장, 회화 표현, 긴 구문은 WORDS에 넣지 않는다.
// 기존 Section 1에 있는 동일 단어는 code + senseKey를 그대로 재사용한다.
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE1_WORDS = [
  // ─────────────────────────────────────
  // Countries
  // ─────────────────────────────────────

  {
    code: 'en-country-usa',
    headword: 'the USA',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('미국', 'AQSh', 'the United States of America', 'США'),
    pronunciation: {
      ttsText: 'the USA',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-mexico',
    headword: 'Mexico',
    senseKey: 'country-mexico',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('멕시코', 'Meksika', 'Mexico', 'Мексика'),
    pronunciation: {
      ttsText: 'Mexico',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-uk',
    headword: 'the UK',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영국',
      'Buyuk Britaniya',
      'the United Kingdom',
      'Великобритания',
    ),
    pronunciation: {
      ttsText: 'the UK',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-france',
    headword: 'France',
    senseKey: 'country-france',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('프랑스', 'Fransiya', 'France', 'Франция'),
    pronunciation: {
      ttsText: 'France',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-italy',
    headword: 'Italy',
    senseKey: 'country-italy',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('이탈리아', 'Italiya', 'Italy', 'Италия'),
    pronunciation: {
      ttsText: 'Italy',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-greece',
    headword: 'Greece',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('그리스', 'Gretsiya', 'Greece', 'Греция'),
    pronunciation: {
      ttsText: 'Greece',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-turkey',
    headword: 'Turkey',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('튀르키예', 'Turkiya', 'Turkey', 'Турция'),
    pronunciation: {
      ttsText: 'Turkey',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-poland',
    headword: 'Poland',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('폴란드', 'Polsha', 'Poland', 'Польша'),
    pronunciation: {
      ttsText: 'Poland',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-pakistan',
    headword: 'Pakistan',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('파키스탄', 'Pokiston', 'Pakistan', 'Пакистан'),
    pronunciation: {
      ttsText: 'Pakistan',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-china',
    headword: 'China',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('중국', 'Xitoy', 'China', 'Китай'),
    pronunciation: {
      ttsText: 'China',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-vietnam',
    headword: 'Vietnam',
    senseKey: 'country-vietnam',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('베트남', 'Vyetnam', 'Vietnam', 'Вьетнам'),
    pronunciation: {
      ttsText: 'Vietnam',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-country-uae',
    headword: 'the UAE',
    senseKey: 'country',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '아랍에미리트',
      'Birlashgan Arab Amirliklari',
      'the United Arab Emirates',
      'Объединённые Арабские Эмираты',
    ),
    pronunciation: {
      ttsText: 'the UAE',
    },
    tags: ['countries', 'nationality'],
    difficulty: 2,
    isCore: true,
  },

  // ─────────────────────────────────────
  // Nationalities
  // ─────────────────────────────────────

  {
    code: 'en-adjective-american',
    headword: 'American',
    senseKey: 'relating-to-usa',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '미국인; 미국의',
      'amerikalik; Amerikaga oid',
      'from or relating to the USA',
      'американец; американский',
    ),
    pronunciation: {
      ttsText: 'American',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-mexican',
    headword: 'Mexican',
    senseKey: 'relating-to-mexico',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '멕시코인; 멕시코의',
      'meksikalik; Meksikaga oid',
      'from or relating to Mexico',
      'мексиканец; мексиканский',
    ),
    pronunciation: {
      ttsText: 'Mexican',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-british',
    headword: 'British',
    senseKey: 'relating-to-uk',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '영국인; 영국의',
      'britaniyalik; Britaniyaga oid',
      'from or relating to the UK',
      'британец; британский',
    ),
    pronunciation: {
      ttsText: 'British',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-french',
    headword: 'French',
    senseKey: 'relating-to-france',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '프랑스인; 프랑스의',
      'fransuz; Fransiyaga oid',
      'from or relating to France',
      'француз; французский',
    ),
    pronunciation: {
      ttsText: 'French',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-italian',
    headword: 'Italian',
    senseKey: 'relating-to-italy',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '이탈리아인; 이탈리아의',
      'italiyalik; Italiyaga oid',
      'from or relating to Italy',
      'итальянец; итальянский',
    ),
    pronunciation: {
      ttsText: 'Italian',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-greek',
    headword: 'Greek',
    senseKey: 'relating-to-greece',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '그리스인; 그리스의',
      'gretsiyalik; Gretsiyaga oid',
      'from or relating to Greece',
      'грек; греческий',
    ),
    pronunciation: {
      ttsText: 'Greek',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-turkish',
    headword: 'Turkish',
    senseKey: 'relating-to-turkey',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '튀르키예인; 튀르키예의',
      'turkiyalik; Turkiyaga oid',
      'from or relating to Turkey',
      'турок; турецкий',
    ),
    pronunciation: {
      ttsText: 'Turkish',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-polish',
    headword: 'Polish',
    senseKey: 'relating-to-poland',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '폴란드인; 폴란드의',
      'polyak; Polshaga oid',
      'from or relating to Poland',
      'поляк; польский',
    ),
    pronunciation: {
      ttsText: 'Polish',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-pakistani',
    headword: 'Pakistani',
    senseKey: 'relating-to-pakistan',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '파키스탄인; 파키스탄의',
      'pokistonlik; Pokistonga oid',
      'from or relating to Pakistan',
      'пакистанец; пакистанский',
    ),
    pronunciation: {
      ttsText: 'Pakistani',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-chinese',
    headword: 'Chinese',
    senseKey: 'relating-to-china',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '중국인; 중국의',
      'xitoylik; Xitoyga oid',
      'from or relating to China',
      'китаец; китайский',
    ),
    pronunciation: {
      ttsText: 'Chinese',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-vietnamese',
    headword: 'Vietnamese',
    senseKey: 'relating-to-vietnam',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '베트남인; 베트남의',
      'vyetnamlik; Vyetnamga oid',
      'from or relating to Vietnam',
      'вьетнамец; вьетнамский',
    ),
    pronunciation: {
      ttsText: 'Vietnamese',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-emirati',
    headword: 'Emirati',
    senseKey: 'relating-to-uae',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '아랍에미리트인; 아랍에미리트의',
      'BAA fuqarosi; BAAga oid',
      'from or relating to the UAE',
      'эмиратец; эмиратский',
    ),
    pronunciation: {
      ttsText: 'Emirati',
    },
    tags: ['nationalities'],
    difficulty: 2,
    isCore: true,
  },

  // ─────────────────────────────────────
  // Languages
  // ─────────────────────────────────────

  {
    code: 'en-language-english',
    headword: 'English',
    senseKey: 'english-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영어',
      'ingliz tili',
      'the English language',
      'английский язык',
    ),
    pronunciation: {
      ttsText: 'English',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-spanish',
    headword: 'Spanish',
    senseKey: 'spanish-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스페인어',
      'ispan tili',
      'the Spanish language',
      'испанский язык',
    ),
    pronunciation: {
      ttsText: 'Spanish',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-french',
    headword: 'French',
    senseKey: 'french-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '프랑스어',
      'fransuz tili',
      'the French language',
      'французский язык',
    ),
    pronunciation: {
      ttsText: 'French',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-italian',
    headword: 'Italian',
    senseKey: 'italian-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이탈리아어',
      'italyan tili',
      'the Italian language',
      'итальянский язык',
    ),
    pronunciation: {
      ttsText: 'Italian',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-greek',
    headword: 'Greek',
    senseKey: 'greek-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '그리스어',
      'yunon tili',
      'the Greek language',
      'греческий язык',
    ),
    pronunciation: {
      ttsText: 'Greek',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-turkish',
    headword: 'Turkish',
    senseKey: 'turkish-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '튀르키예어',
      'turk tili',
      'the Turkish language',
      'турецкий язык',
    ),
    pronunciation: {
      ttsText: 'Turkish',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-polish',
    headword: 'Polish',
    senseKey: 'polish-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '폴란드어',
      'polyak tili',
      'the Polish language',
      'польский язык',
    ),
    pronunciation: {
      ttsText: 'Polish',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-urdu',
    headword: 'Urdu',
    senseKey: 'urdu-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('우르두어', 'urdu tili', 'the Urdu language', 'язык урду'),
    pronunciation: {
      ttsText: 'Urdu',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-chinese',
    headword: 'Chinese',
    senseKey: 'chinese-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '중국어',
      'xitoy tili',
      'the Chinese language',
      'китайский язык',
    ),
    pronunciation: {
      ttsText: 'Chinese',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-vietnamese',
    headword: 'Vietnamese',
    senseKey: 'vietnamese-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '베트남어',
      'vyetnam tili',
      'the Vietnamese language',
      'вьетнамский язык',
    ),
    pronunciation: {
      ttsText: 'Vietnamese',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-language-arabic',
    headword: 'Arabic',
    senseKey: 'arabic-language',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아랍어', 'arab tili', 'the Arabic language', 'арабский язык'),
    pronunciation: {
      ttsText: 'Arabic',
    },
    tags: ['languages'],
    difficulty: 2,
    isCore: true,
  },
];

// ─────────────────────────────────────────────────────────────
// Questions
// Content determines the amount.
// Lesson 1: 18
// Lesson 2: 20
// Lesson 3: 18
// Lesson 4: 20
// Total: 76
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE1_QUESTIONS = {
  // ─────────────────────────────────────
  // Lesson 1 · Countries
  // ─────────────────────────────────────

  en_s2u1_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'the USA',
    audioText: 'the USA',
    answerTranslation: L('미국', 'AQSh', 'the USA', 'США'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'usa', 'pronunciation'],
  },

  en_s2u1_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'Mexico',
    choices: [
      { text: 'Mexico', label: '🇲🇽', emoji: '🇲🇽', imageUrl: '' },
      { text: 'France', label: '🇫🇷', emoji: '🇫🇷', imageUrl: '' },
      { text: 'Italy', label: '🇮🇹', emoji: '🇮🇹', imageUrl: '' },
      { text: 'Poland', label: '🇵🇱', emoji: '🇵🇱', imageUrl: '' },
    ],
    answerTranslation: L('멕시코', 'Meksika', 'Mexico', 'Мексика'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'mexico', 'image'],
  },

  en_s2u1_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'the USA',
        native: 'AQSh',
        nativeI18n: L('미국', 'AQSh', 'the USA', 'США'),
      },
      {
        text: 'Mexico',
        native: 'Meksika',
        nativeI18n: L('멕시코', 'Meksika', 'Mexico', 'Мексика'),
      },
      {
        text: 'the UK',
        native: 'Buyuk Britaniya',
        nativeI18n: L('영국', 'Buyuk Britaniya', 'the UK', 'Великобритания'),
      },
      {
        text: 'France',
        native: 'Fransiya',
        nativeI18n: L('프랑스', 'Fransiya', 'France', 'Франция'),
      },
      {
        text: 'Italy',
        native: 'Italiya',
        nativeI18n: L('이탈리아', 'Italiya', 'Italy', 'Италия'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'matching'],
  },

  en_s2u1_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Paris is in ___.',
    blankAnswers: ['France'],
    options: ['France', 'Italy', 'Greece', 'Poland'],
    answer: 'France',
    answerTranslation: L(
      '파리는 프랑스에 있어요.',
      'Parij Fransiyada.',
      'Paris is in France.',
      'Париж находится во Франции.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'france'],
  },

  en_s2u1_n1_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Greece',
    audioText: 'Greece',
    answerTranslation: L('그리스', 'Gretsiya', 'Greece', 'Греция'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'greece', 'pronunciation'],
  },

  en_s2u1_n1_006_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'China',
    choices: [
      { text: 'China', label: '🇨🇳', emoji: '🇨🇳', imageUrl: '' },
      { text: 'Vietnam', label: '🇻🇳', emoji: '🇻🇳', imageUrl: '' },
      { text: 'Pakistan', label: '🇵🇰', emoji: '🇵🇰', imageUrl: '' },
      { text: 'Turkey', label: '🇹🇷', emoji: '🇹🇷', imageUrl: '' },
    ],
    answerTranslation: L('중국', 'Xitoy', 'China', 'Китай'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'china', 'image'],
  },

  en_s2u1_n1_007_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'Greece',
        native: 'Gretsiya',
        nativeI18n: L('그리스', 'Gretsiya', 'Greece', 'Греция'),
      },
      {
        text: 'Turkey',
        native: 'Turkiya',
        nativeI18n: L('튀르키예', 'Turkiya', 'Turkey', 'Турция'),
      },
      {
        text: 'Poland',
        native: 'Polsha',
        nativeI18n: L('폴란드', 'Polsha', 'Poland', 'Польша'),
      },
      {
        text: 'Pakistan',
        native: 'Pokiston',
        nativeI18n: L('파키스탄', 'Pokiston', 'Pakistan', 'Пакистан'),
      },
      {
        text: 'China',
        native: 'Xitoy',
        nativeI18n: L('중국', 'Xitoy', 'China', 'Китай'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['countries', 'listening'],
  },

  en_s2u1_n1_008_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I’m', 'from', 'Poland', 'Pakistan', 'in'],
    answer: 'I’m from Poland',
    answerTranslation: L(
      '저는 폴란드 출신이에요.',
      'Men Polshadanman.',
      'I’m from Poland.',
      'Я из Польши.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['countries', 'poland', 'from'],
  },

  en_s2u1_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Islamabad is in ___.',
    blankAnswers: ['Pakistan'],
    options: ['Pakistan', 'Turkey', 'China', 'Vietnam'],
    answer: 'Pakistan',
    answerTranslation: L(
      '이슬라마바드는 파키스탄에 있어요.',
      'Islomobod Pokistonda.',
      'Islamabad is in Pakistan.',
      'Исламабад находится в Пакистане.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'pakistan'],
  },

  en_s2u1_n1_010_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'the UAE',
    audioText: 'the UAE',
    answerTranslation: L(
      '아랍에미리트',
      'Birlashgan Arab Amirliklari',
      'the UAE',
      'ОАЭ',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'uae', 'pronunciation'],
  },

  en_s2u1_n1_011_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['from', 'Vietnam', 'I’m', 'China', 'in'],
    answer: 'I’m from Vietnam',
    audioText: 'I’m from Vietnam.',
    answerTranslation: L(
      '저는 베트남 출신이에요.',
      'Men Vyetnamdanman.',
      'I’m from Vietnam.',
      'Я из Вьетнама.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['countries', 'vietnam', 'arrange'],
  },

  en_s2u1_n1_012_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'Turkey',
    choices: [
      { text: 'Turkey', label: '🇹🇷', emoji: '🇹🇷', imageUrl: '' },
      { text: 'Greece', label: '🇬🇷', emoji: '🇬🇷', imageUrl: '' },
      { text: 'Poland', label: '🇵🇱', emoji: '🇵🇱', imageUrl: '' },
      { text: 'Italy', label: '🇮🇹', emoji: '🇮🇹', imageUrl: '' },
    ],
    answerTranslation: L('튀르키예', 'Turkiya', 'Turkey', 'Турция'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'turkey', 'image'],
  },

  en_s2u1_n1_013_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We’re', 'from', 'the', 'UK', 'USA', 'Mexico'],
    answer: 'We’re from the UK',
    answerTranslation: L(
      '우리는 영국 출신이에요.',
      'Biz Buyuk Britaniyadanmiz.',
      'We’re from the UK.',
      'Мы из Великобритании.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['countries', 'uk', 'from'],
  },

  en_s2u1_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Rome is in ___.',
    blankAnswers: ['Italy'],
    options: ['Italy', 'France', 'Greece', 'Mexico'],
    answer: 'Italy',
    answerTranslation: L(
      '로마는 이탈리아에 있어요.',
      'Rim Italiyada.',
      'Rome is in Italy.',
      'Рим находится в Италии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'italy'],
  },

  en_s2u1_n1_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Mexico',
    audioText: 'Mexico',
    answerTranslation: L('멕시코', 'Meksika', 'Mexico', 'Мексика'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['countries', 'mexico', 'word-stress'],
  },

  en_s2u1_n1_016_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where are you from?' }],
    options: [
      'I’m from China.',
      'I’m Chinese language.',
      'China is nationality.',
      'Are you from China?',
    ],
    answer: 'I’m from China.',
    answerTranslation: L(
      '저는 중국 출신이에요.',
      'Men Xitoydanman.',
      'I’m from China.',
      'Я из Китая.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['countries', 'origin', 'dialog'],
  },

  en_s2u1_n1_017_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where are you from?',
    options: ['I’m', 'from', 'Greece', 'Greek', 'are', 'you'],
    answer: 'I’m from Greece',
    answerTranslation: L(
      '저는 그리스 출신이에요.',
      'Men Gretsiyadanman.',
      'I’m from Greece.',
      'Я из Греции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['countries', 'greece', 'reply-builder'],
  },

  en_s2u1_n1_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Melbourne is in Australia.',
    audioText: 'Melbourne is in Australia.',
    answerTranslation: L(
      '멜버른은 호주에 있어요.',
      'Melburn Avstraliyada.',
      'Melbourne is in Australia.',
      'Мельбурн находится в Австралии.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['multicultural-cities', 'australia', 'coursebook'],
  },

  // ─────────────────────────────────────
  // Lesson 2 · Nationalities and languages
  // ─────────────────────────────────────

  en_s2u1_n1_019_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'American',
        native: 'amerikalik',
        nativeI18n: L('미국인', 'amerikalik', 'American', 'американец'),
      },
      {
        text: 'Mexican',
        native: 'meksikalik',
        nativeI18n: L('멕시코인', 'meksikalik', 'Mexican', 'мексиканец'),
      },
      {
        text: 'British',
        native: 'britaniyalik',
        nativeI18n: L('영국인', 'britaniyalik', 'British', 'британец'),
      },
      {
        text: 'French',
        native: 'fransuz',
        nativeI18n: L('프랑스인', 'fransuz', 'French', 'француз'),
      },
      {
        text: 'Italian',
        native: 'italiyalik',
        nativeI18n: L('이탈리아인', 'italiyalik', 'Italian', 'итальянец'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['nationalities', 'matching'],
  },

  en_s2u1_n1_020_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She’s from Poland. She’s ___.',
    blankAnswers: ['Polish'],
    options: ['Polish', 'Poland', 'Pakistani', 'Greek'],
    answer: 'Polish',
    answerTranslation: L(
      '그녀는 폴란드 출신이에요. 폴란드인이에요.',
      'U Polshadan. U polyak.',
      'She’s from Poland. She’s Polish.',
      'Она из Польши. Она полька.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['nationalities', 'polish'],
  },

  en_s2u1_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'British',
    audioText: 'British',
    answerTranslation: L(
      '영국인; 영국의',
      'britaniyalik',
      'British',
      'британец; британский',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['nationalities', 'british', 'word-stress'],
  },

  en_s2u1_n1_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '국기와 맞는 국적을 고르세요.',
      'Bayroqqa mos millatni tanlang.',
      'Choose the nationality that matches the flag.',
      'Выберите национальность, соответствующую флагу.',
    ),
    answer: 'French',
    choices: [
      { text: 'French', label: '🇫🇷', emoji: '🇫🇷', imageUrl: '' },
      { text: 'Italian', label: '🇮🇹', emoji: '🇮🇹', imageUrl: '' },
      { text: 'Polish', label: '🇵🇱', emoji: '🇵🇱', imageUrl: '' },
      { text: 'Greek', label: '🇬🇷', emoji: '🇬🇷', imageUrl: '' },
    ],
    answerTranslation: L('프랑스인', 'fransuz', 'French', 'француз'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['nationalities', 'french', 'image'],
  },

  en_s2u1_n1_023_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'English',
        native: 'ingliz tili',
        nativeI18n: L('영어', 'ingliz tili', 'English', 'английский язык'),
      },
      {
        text: 'Spanish',
        native: 'ispan tili',
        nativeI18n: L('스페인어', 'ispan tili', 'Spanish', 'испанский язык'),
      },
      {
        text: 'French',
        native: 'fransuz tili',
        nativeI18n: L('프랑스어', 'fransuz tili', 'French', 'французский язык'),
      },
      {
        text: 'Italian',
        native: 'italyan tili',
        nativeI18n: L(
          '이탈리아어',
          'italyan tili',
          'Italian',
          'итальянский язык',
        ),
      },
      {
        text: 'Greek',
        native: 'yunon tili',
        nativeI18n: L('그리스어', 'yunon tili', 'Greek', 'греческий язык'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['languages', 'listening'],
  },

  en_s2u1_n1_024_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s Greek.',
    audioText: 'She’s Greek.',
    answerTranslation: L(
      '그녀는 그리스인이에요.',
      'U gretsiyalik.',
      'She’s Greek.',
      'Она гречанка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationalities', 'greek'],
  },

  en_s2u1_n1_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He’s from Turkey. He’s ___.',
    blankAnswers: ['Turkish'],
    options: ['Turkish', 'Turkey', 'Greek', 'Polish'],
    answer: 'Turkish',
    answerTranslation: L(
      '그는 튀르키예 출신이에요. 튀르키예인이에요.',
      'U Turkiyadan. U turkiyalik.',
      'He’s from Turkey. He’s Turkish.',
      'Он из Турции. Он турок.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['nationalities', 'turkish'],
  },

  en_s2u1_n1_026_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They’re', 'Polish', 'Poland', 'from', 'is'],
    answer: 'They’re Polish',
    answerTranslation: L(
      '그들은 폴란드인이에요.',
      'Ular polyak.',
      'They’re Polish.',
      'Они поляки.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['nationalities', 'polish'],
  },

  en_s2u1_n1_027_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['speak', 'English', 'We', 'British', 'are'],
    answer: 'We speak English',
    audioText: 'We speak English.',
    answerTranslation: L(
      '우리는 영어를 해요.',
      'Biz ingliz tilida gaplashamiz.',
      'We speak English.',
      'Мы говорим по-английски.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['languages', 'english'],
  },

  en_s2u1_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The main language in the UAE is ___.',
    blankAnswers: ['Arabic'],
    options: ['Arabic', 'Urdu', 'Turkish', 'English'],
    answer: 'Arabic',
    answerTranslation: L(
      '아랍에미리트의 주요 언어는 아랍어예요.',
      'BAAdagi asosiy til arab tilidir.',
      'The main language in the UAE is Arabic.',
      'Основной язык в ОАЭ — арабский.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['languages', 'arabic', 'uae'],
  },

  en_s2u1_n1_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Urdu',
    audioText: 'Urdu',
    answerTranslation: L('우르두어', 'urdu tili', 'Urdu', 'урду'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['languages', 'urdu', 'pronunciation'],
  },

  en_s2u1_n1_030_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'Turkish',
        native: 'turk tili',
        nativeI18n: L('튀르키예어', 'turk tili', 'Turkish', 'турецкий язык'),
      },
      {
        text: 'Polish',
        native: 'polyak tili',
        nativeI18n: L('폴란드어', 'polyak tili', 'Polish', 'польский язык'),
      },
      {
        text: 'Urdu',
        native: 'urdu tili',
        nativeI18n: L('우르두어', 'urdu tili', 'Urdu', 'язык урду'),
      },
      {
        text: 'Chinese',
        native: 'xitoy tili',
        nativeI18n: L('중국어', 'xitoy tili', 'Chinese', 'китайский язык'),
      },
      {
        text: 'Vietnamese',
        native: 'vyetnam tili',
        nativeI18n: L(
          '베트남어',
          'vyetnam tili',
          'Vietnamese',
          'вьетнамский язык',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['languages', 'matching'],
  },

  en_s2u1_n1_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s Pakistani.',
    audioText: 'She’s Pakistani.',
    answerTranslation: L(
      '그녀는 파키스탄인이에요.',
      'U pokistonlik.',
      'She’s Pakistani.',
      'Она пакистанка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationalities', 'pakistani'],
  },

  en_s2u1_n1_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your nationality?' }],
    options: [
      'I’m Polish.',
      'I’m Poland.',
      'I speak Poland.',
      'Poland is my language.',
    ],
    answer: 'I’m Polish.',
    answerTranslation: L(
      '저는 폴란드인이에요.',
      'Men polyakman.',
      'I’m Polish.',
      'Я поляк.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationality', 'polish', 'dialog'],
  },

  en_s2u1_n1_033_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your main language?',
    options: ['It’s', 'Spanish', 'Spain', 'I’m', 'from', 'Mexican'],
    answer: 'It’s Spanish',
    answerTranslation: L(
      '스페인어예요.',
      'Bu ispan tili.',
      'It’s Spanish.',
      'Это испанский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['languages', 'spanish', 'reply-builder'],
  },

  en_s2u1_n1_034_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['He’s', 'Chinese', 'China', 'is', 'language'],
    answer: 'He’s Chinese',
    answerTranslation: L(
      '그는 중국인이에요.',
      'U xitoylik.',
      'He’s Chinese.',
      'Он китаец.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['nationalities', 'chinese'],
  },

  en_s2u1_n1_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People in Mexico speak ___.',
    blankAnswers: ['Spanish'],
    options: ['Spanish', 'French', 'Italian', 'Urdu'],
    answer: 'Spanish',
    answerTranslation: L(
      '멕시코에서는 스페인어를 사용해요.',
      'Meksikada odamlar ispan tilida gaplashadi.',
      'People in Mexico speak Spanish.',
      'В Мексике говорят по-испански.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['languages', 'spanish', 'mexico'],
  },

  en_s2u1_n1_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re Vietnamese.',
    audioText: 'They’re Vietnamese.',
    answerTranslation: L(
      '그들은 베트남인이에요.',
      'Ular vyetnamlik.',
      'They’re Vietnamese.',
      'Они вьетнамцы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationalities', 'vietnamese'],
  },

  en_s2u1_n1_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['main', 'language', 'is', 'Turkish', 'My', 'Turkey'],
    answer: 'My main language is Turkish',
    audioText: 'My main language is Turkish.',
    answerTranslation: L(
      '제 주요 언어는 튀르키예어예요.',
      'Mening asosiy tilim turk tili.',
      'My main language is Turkish.',
      'Мой основной язык — турецкий.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['languages', 'turkish'],
  },

  en_s2u1_n1_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s Emirati.',
    audioText: 'He’s Emirati.',
    answerTranslation: L(
      '그는 아랍에미리트인이에요.',
      'U BAA fuqarosi.',
      'He’s Emirati.',
      'Он эмиратец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationalities', 'emirati'],
  },

  // ─────────────────────────────────────
  // Lesson 3 · Present simple be
  // ─────────────────────────────────────

  en_s2u1_n1_039_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ from Mexico.',
    blankAnswers: ['am'],
    options: ['am', 'is', 'are', 'be'],
    answer: 'am',
    answerTranslation: L(
      '저는 멕시코 출신이에요.',
      'Men Meksikadanman.',
      'I am from Mexico.',
      'Я из Мексики.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'am', 'positive'],
  },

  en_s2u1_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m American.',
    audioText: 'I’m American.',
    answerTranslation: L(
      '저는 미국인이에요.',
      'Men amerikalikman.',
      'I’m American.',
      'Я американец.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'contraction', 'american'],
  },

  en_s2u1_n1_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ British.',
    blankAnswers: ['is'],
    options: ['is', 'am', 'are', 'be'],
    answer: 'is',
    answerTranslation: L(
      '그는 영국인이에요.',
      'U britaniyalik.',
      'He is British.',
      'Он британец.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'is', 'positive'],
  },

  en_s2u1_n1_042_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We’re', 'from', 'Mexico', 'Mexican', 'is'],
    answer: 'We’re from Mexico',
    answerTranslation: L(
      '우리는 멕시코 출신이에요.',
      'Biz Meksikadanmiz.',
      'We’re from Mexico.',
      'Мы из Мексики.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'are', 'mexico'],
  },

  en_s2u1_n1_043_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'is', 'from', 'France', 'French', 'are'],
    answer: 'She is from France',
    audioText: 'She is from France.',
    answerTranslation: L(
      '그녀는 프랑스 출신이에요.',
      'U Fransiyadan.',
      'She is from France.',
      'Она из Франции.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['be', 'is', 'france'],
  },

  en_s2u1_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ from China.',
    blankAnswers: ['aren’t'],
    options: ['aren’t', 'isn’t', 'am not', 'doesn’t'],
    answer: 'aren’t',
    answerTranslation: L(
      '그들은 중국 출신이 아니에요.',
      'Ular Xitoydan emas.',
      'They aren’t from China.',
      'Они не из Китая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'negative', 'arent'],
  },

  en_s2u1_n1_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We’re students.',
    audioText: 'We’re students.',
    answerTranslation: L(
      '우리는 학생이에요.',
      'Biz talabalarmiz.',
      'We’re students.',
      'Мы студенты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'we-are', 'contraction'],
  },

  en_s2u1_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ French.',
    blankAnswers: ['is'],
    options: ['is', 'am', 'are', 'do'],
    answer: 'is',
    answerTranslation: L(
      '그녀는 프랑스인이에요.',
      'U fransuz.',
      'She is French.',
      'Она француженка.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'french', 'positive'],
  },

  en_s2u1_n1_047_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['He', 'isn’t', 'from', 'Pakistan', 'doesn’t', 'are'],
    answer: 'He isn’t from Pakistan',
    answerTranslation: L(
      '그는 파키스탄 출신이 아니에요.',
      'U Pokistondan emas.',
      'He isn’t from Pakistan.',
      'Он не из Пакистана.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'negative', 'pakistan'],
  },

  en_s2u1_n1_048_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['They', 'are', 'from', 'Vietnam', 'is', 'Vietnamese'],
    answer: 'They are from Vietnam',
    audioText: 'They are from Vietnam.',
    answerTranslation: L(
      '그들은 베트남 출신이에요.',
      'Ular Vyetnamdan.',
      'They are from Vietnam.',
      'Они из Вьетнама.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['be', 'are', 'vietnam'],
  },

  en_s2u1_n1_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You’re in London.',
    audioText: 'You’re in London.',
    answerTranslation: L(
      '당신은 런던에 있어요.',
      'Siz Londondasiz.',
      'You’re in London.',
      'Вы в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'you-are', 'london'],
  },

  en_s2u1_n1_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ a teacher.',
    blankAnswers: ['am not'],
    options: ['am not', 'isn’t', 'aren’t', 'don’t'],
    answer: 'am not',
    answerTranslation: L(
      '저는 선생님이 아니에요.',
      'Men o‘qituvchi emasman.',
      'I am not a teacher.',
      'Я не учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'negative', 'am-not'],
  },

  en_s2u1_n1_051_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['We', 'aren’t', 'American', 'don’t', 'America', 'are'],
    answer: 'We aren’t American',
    answerTranslation: L(
      '우리는 미국인이 아니에요.',
      'Biz amerikalik emasmiz.',
      'We aren’t American.',
      'Мы не американцы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'negative', 'american'],
  },

  en_s2u1_n1_052_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['It', 'is', 'in', 'Dubai', 'the', 'UAE'],
    answer: 'It is in Dubai',
    audioText: 'It is in Dubai.',
    answerTranslation: L(
      '그것은 두바이에 있어요.',
      'U Dubayda.',
      'It is in Dubai.',
      'Это находится в Дубае.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['be', 'it-is', 'dubai'],
  },

  en_s2u1_n1_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My wife is French.',
    audioText: 'My wife is French.',
    answerTranslation: L(
      '제 아내는 프랑스인이에요.',
      'Mening xotinim fransuz.',
      'My wife is French.',
      'Моя жена француженка.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'french', 'family-context'],
  },

  en_s2u1_n1_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My boss ___ from Iraq.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'am', 'do'],
    answer: 'is',
    answerTranslation: L(
      '제 상사는 이라크 출신이에요.',
      'Mening boshlig‘im Iroqdan.',
      'My boss is from Iraq.',
      'Мой начальник из Ирака.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'is', 'listening-context'],
  },

  en_s2u1_n1_055_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Her', 'home', 'is', 'in', 'London', 'are'],
    answer: 'Her home is in London',
    answerTranslation: L(
      '그녀의 집은 런던에 있어요.',
      'Uning uyi Londonda.',
      'Her home is in London.',
      'Её дом находится в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'london', 'home'],
  },

  en_s2u1_n1_056_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re neighbours.',
    audioText: 'They’re neighbours.',
    answerTranslation: L(
      '그들은 이웃이에요.',
      'Ular qo‘shnilar.',
      'They’re neighbours.',
      'Они соседи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be', 'they-are', 'contraction'],
  },

  // ─────────────────────────────────────
  // Lesson 4 · Questions and short answers
  // ─────────────────────────────────────

  en_s2u1_n1_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are you from Turkey?',
    audioText: 'Are you from Turkey?',
    answerTranslation: L(
      '튀르키예 출신이에요?',
      'Siz Turkiyadanmisiz?',
      'Are you from Turkey?',
      'Вы из Турции?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'turkey', 'speaking'],
  },

  en_s2u1_n1_058_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you from Turkey?',
    options: ['Yes', 'I', 'am', 'is', 'not', 'Turkey'],
    answer: 'Yes I am',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'short-answer', 'reply-builder'],
  },

  en_s2u1_n1_059_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ she Greek?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Am', 'Does'],
    answer: 'Is',
    answerTranslation: L(
      '그녀는 그리스인이에요?',
      'U gretsiyalikmi?',
      'Is she Greek?',
      'Она гречанка?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be-question', 'is', 'greek'],
  },

  en_s2u1_n1_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are they from Poland?' }],
    options: [
      'No, they aren’t.',
      'No, they don’t.',
      'No, they isn’t.',
      'No, they not.',
    ],
    answer: 'No, they aren’t.',
    answerTranslation: L(
      '아니요, 폴란드 출신이 아니에요.',
      'Yo‘q, ular Polshadan emas.',
      'No, they aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'negative-short-answer', 'poland'],
  },

  en_s2u1_n1_061_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Are', 'you', 'from', 'the', 'UAE', 'is'],
    answer: 'Are you from the UAE',
    audioText: 'Are you from the UAE?',
    answerTranslation: L(
      '아랍에미리트 출신이에요?',
      'Siz BAAdanmisiz?',
      'Are you from the UAE?',
      'Вы из ОАЭ?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['be-question', 'uae', 'arrange'],
  },

  en_s2u1_n1_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is he Mexican?',
    options: ['Yes', 'he', 'is', 'are', 'Mexican', 'Mexico'],
    answer: 'Yes he is',
    answerTranslation: L(
      '네, 멕시코인이에요.',
      'Ha, u meksikalik.',
      'Yes, he is.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'short-answer', 'mexican'],
  },

  en_s2u1_n1_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ we in London?',
    blankAnswers: ['Are'],
    options: ['Are', 'Is', 'Am', 'Do'],
    answer: 'Are',
    answerTranslation: L(
      '우리는 런던에 있나요?',
      'Biz Londondamizmi?',
      'Are we in London?',
      'Мы в Лондоне?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be-question', 'are', 'london'],
  },

  en_s2u1_n1_064_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Is', 'she', 'from', 'France', 'French', 'does'],
    answer: 'Is she from France',
    answerTranslation: L(
      '그녀는 프랑스 출신이에요?',
      'U Fransiyadanmi?',
      'Is she from France?',
      'Она из Франции?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be-question', 'france'],
  },

  en_s2u1_n1_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you British?' }],
    options: [
      'No, I’m not.',
      'No, I don’t.',
      'No, I isn’t.',
      'No, not British.',
    ],
    answer: 'No, I’m not.',
    answerTranslation: L(
      '아니요, 저는 영국인이 아니에요.',
      'Yo‘q, men britaniyalik emasman.',
      'No, I’m not.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'short-answer', 'british'],
  },

  en_s2u1_n1_066_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Where', 'are', 'you', 'from', 'is', 'country'],
    answer: 'Where are you from',
    audioText: 'Where are you from?',
    answerTranslation: L(
      '어디 출신이에요?',
      'Qayerdansiz?',
      'Where are you from?',
      'Откуда вы?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['origin', 'where', 'question'],
  },

  en_s2u1_n1_067_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where are you from?',
    options: ['I’m', 'from', 'Vietnam', 'Vietnamese', 'am', 'where'],
    answer: 'I’m from Vietnam',
    answerTranslation: L(
      '저는 베트남 출신이에요.',
      'Men Vyetnamdanman.',
      'I’m from Vietnam.',
      'Я из Вьетнама.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['origin', 'vietnam', 'reply-builder'],
  },

  en_s2u1_n1_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your nationality?',
    audioText: 'What’s your nationality?',
    answerTranslation: L(
      '국적이 뭐예요?',
      'Millatingiz nima?',
      'What’s your nationality?',
      'Какая у вас национальность?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationality', 'question', 'speaking'],
  },

  en_s2u1_n1_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your main language?' }],
    options: [
      'It’s Urdu.',
      'I’m Pakistan.',
      'I’m Urdu country.',
      'It’s Pakistani.',
    ],
    answer: 'It’s Urdu.',
    answerTranslation: L(
      '우르두어예요.',
      'Urdu tili.',
      'It’s Urdu.',
      'Это урду.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['languages', 'urdu', 'dialog'],
  },

  en_s2u1_n1_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your wife French?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Am', 'Does'],
    answer: 'Is',
    answerTranslation: L(
      '아내분은 프랑스인이에요?',
      'Xotiningiz fransuzmi?',
      'Is your wife French?',
      'Ваша жена француженка?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be-question', 'is', 'french'],
  },

  en_s2u1_n1_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Are your neighbours American?',
    audioText: 'Are your neighbours American?',
    answerTranslation: L(
      '이웃들은 미국인이에요?',
      'Qo‘shnilaringiz amerikalikmi?',
      'Are your neighbours American?',
      'Ваши соседи американцы?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'american', 'speaking'],
  },

  en_s2u1_n1_072_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you married?',
    options: ['Yes', 'I', 'am', 'are', 'married', 'do'],
    answer: 'Yes I am',
    answerTranslation: L(
      '네, 결혼했어요.',
      'Ha, turmush qurganman.',
      'Yes, I am.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['be-question', 'short-answer', 'workbook'],
  },

  en_s2u1_n1_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your home in London?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Am', 'Do'],
    answer: 'Is',
    answerTranslation: L(
      '집이 런던에 있어요?',
      'Uyingiz Londondami?',
      'Is your home in London?',
      'Ваш дом в Лондоне?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be-question', 'london', 'home'],
  },

  en_s2u1_n1_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Are', 'they', 'Chinese', 'China', 'is', 'from'],
    answer: 'Are they Chinese',
    answerTranslation: L(
      '그들은 중국인이에요?',
      'Ular xitoylikmi?',
      'Are they Chinese?',
      'Они китайцы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['be-question', 'chinese'],
  },

  en_s2u1_n1_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where is Melbourne?' }],
    options: [
      'It’s in Australia.',
      'It’s Australian.',
      'They’re Australia.',
      'It are in Australia.',
    ],
    answer: 'It’s in Australia.',
    answerTranslation: L(
      '호주에 있어요.',
      'U Avstraliyada.',
      'It’s in Australia.',
      'Он находится в Австралии.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['multicultural-cities', 'australia', 'dialog'],
  },

  en_s2u1_n1_076_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Dubai is a multicultural city.',
    audioText: 'Dubai is a multicultural city.',
    answerTranslation: L(
      '두바이는 다문화 도시예요.',
      'Dubay ko‘p madaniyatli shahar.',
      'Dubai is a multicultural city.',
      'Дубай — многонациональный город.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['multicultural-cities', 'dubai', 'review'],
  },
};

export const EN_S2_UNIT1_NODE1 = {
  title: L(
    '다문화 도시',
    'Ko‘p madaniyatli shaharlar',
    'Multicultural cities',
    'Многонациональные города',
  ),
  section: 2,
  unit: 1,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L('나라 이름', 'Mamlakatlar', 'Countries', 'Страны'),
      description: L(
        '여러 나라의 이름을 익히고 어디 출신인지 말해요.',
        'Mamlakat nomlarini o‘rganib, qayerdan ekaningizni aytasiz.',
        'Learn country names and say where people are from.',
        'Учимся называть страны и говорить, откуда люди.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u1_n1_001_speaking',
        'en_s2u1_n1_002_image_choice',
        'en_s2u1_n1_003_word_matching',
        'en_s2u1_n1_004_fill_in_blank',
        'en_s2u1_n1_005_speaking',
        'en_s2u1_n1_006_image_choice',
        'en_s2u1_n1_007_audio_match',
        'en_s2u1_n1_008_translate_builder',
        'en_s2u1_n1_009_fill_in_blank',
        'en_s2u1_n1_010_speaking',
        'en_s2u1_n1_011_word_arrange',
        'en_s2u1_n1_012_image_choice',
        'en_s2u1_n1_013_translate_builder',
        'en_s2u1_n1_014_fill_in_blank',
        'en_s2u1_n1_015_speaking',
        'en_s2u1_n1_016_dialog_complete',
        'en_s2u1_n1_017_reply_builder',
        'en_s2u1_n1_018_speaking',
      ],
    },

    {
      title: L(
        '국적과 언어',
        'Millatlar va tillar',
        'Nationalities and languages',
        'Национальности и языки',
      ),
      description: L(
        '나라와 국적, 주요 언어를 서로 연결하고 자연스럽게 말해요.',
        'Mamlakat, millat va asosiy tillarni bog‘lab o‘rganasiz.',
        'Connect countries with their nationalities and main languages.',
        'Связываем страны, национальности и основные языки.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u1_n1_019_word_matching',
        'en_s2u1_n1_020_fill_in_blank',
        'en_s2u1_n1_021_speaking',
        'en_s2u1_n1_022_image_choice',
        'en_s2u1_n1_023_audio_match',
        'en_s2u1_n1_024_speaking',
        'en_s2u1_n1_025_fill_in_blank',
        'en_s2u1_n1_026_translate_builder',
        'en_s2u1_n1_027_word_arrange',
        'en_s2u1_n1_028_fill_in_blank',
        'en_s2u1_n1_029_speaking',
        'en_s2u1_n1_030_word_matching',
        'en_s2u1_n1_031_speaking',
        'en_s2u1_n1_032_dialog_complete',
        'en_s2u1_n1_033_reply_builder',
        'en_s2u1_n1_034_translate_builder',
        'en_s2u1_n1_035_fill_in_blank',
        'en_s2u1_n1_036_speaking',
        'en_s2u1_n1_037_word_arrange',
        'en_s2u1_n1_038_speaking',
      ],
    },

    {
      title: L('am, is, are', 'Am, is, are', 'Am, is and are', 'Am, is и are'),
      description: L(
        'be 동사의 긍정문과 부정문, 축약형을 사용해 사람과 출신을 설명해요.',
        'Be fe’lining tasdiq, inkor va qisqartma shakllari bilan odamlarni tasvirlaysiz.',
        'Use positive, negative and contracted forms of be to describe people and origins.',
        'Используем утвердительные, отрицательные и сокращённые формы be.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u1_n1_039_fill_in_blank',
        'en_s2u1_n1_040_speaking',
        'en_s2u1_n1_041_fill_in_blank',
        'en_s2u1_n1_042_translate_builder',
        'en_s2u1_n1_043_word_arrange',
        'en_s2u1_n1_044_fill_in_blank',
        'en_s2u1_n1_045_speaking',
        'en_s2u1_n1_046_fill_in_blank',
        'en_s2u1_n1_047_translate_builder',
        'en_s2u1_n1_048_word_arrange',
        'en_s2u1_n1_049_speaking',
        'en_s2u1_n1_050_fill_in_blank',
        'en_s2u1_n1_051_translate_builder',
        'en_s2u1_n1_052_word_arrange',
        'en_s2u1_n1_053_speaking',
        'en_s2u1_n1_054_fill_in_blank',
        'en_s2u1_n1_055_translate_builder',
        'en_s2u1_n1_056_speaking',
      ],
    },

    {
      title: L(
        '어디 출신이에요?',
        'Qayerdansiz?',
        'Where are you from?',
        'Откуда вы?',
      ),
      description: L(
        'be 동사의 의문문과 짧은 대답을 사용해 출신, 국적, 언어를 묻고 답해요.',
        'Be bilan savollar va qisqa javoblardan foydalanib kelib chiqish, millat va til haqida so‘raysiz.',
        'Use be questions and short answers to ask about origin, nationality and language.',
        'Задаём вопросы с be и кратко отвечаем о стране, национальности и языке.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u1_n1_057_speaking',
        'en_s2u1_n1_058_reply_builder',
        'en_s2u1_n1_059_fill_in_blank',
        'en_s2u1_n1_060_dialog_complete',
        'en_s2u1_n1_061_word_arrange',
        'en_s2u1_n1_062_reply_builder',
        'en_s2u1_n1_063_fill_in_blank',
        'en_s2u1_n1_064_translate_builder',
        'en_s2u1_n1_065_dialog_complete',
        'en_s2u1_n1_066_word_arrange',
        'en_s2u1_n1_067_reply_builder',
        'en_s2u1_n1_068_speaking',
        'en_s2u1_n1_069_dialog_complete',
        'en_s2u1_n1_070_fill_in_blank',
        'en_s2u1_n1_071_speaking',
        'en_s2u1_n1_072_reply_builder',
        'en_s2u1_n1_073_fill_in_blank',
        'en_s2u1_n1_074_translate_builder',
        'en_s2u1_n1_075_dialog_complete',
        'en_s2u1_n1_076_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 1 · Node 2
// 1.2 Family
//
// Coverage
// - immediate family
// - extended family
// - family relationships
// - twins
// - step / half / in-law family vocabulary
// - possessive determiners:
//   my / your / his / her / its / our / their
// - possessive 's
// - Who's ...?
// - family descriptions
//
// IMPORTANT:
// *_WORDS에는 단어만 등록.
// 문장/표현문 등록 금지.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE2_WORDS = [
  {
    code: 'en-family-family',
    english: 'family',
    senseKey: 'related-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가족',
      'oila',
      'a group of people who are related to each other',
      'семья',
    ),
    examples: [
      {
        english: 'This is my family.',
        translations: L(
          '이쪽은 제 가족이에요.',
          'Bu mening oilam.',
          'This is my family.',
          'Это моя семья.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæməli/',
      ttsText: 'family',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-parent',
    english: 'parent',
    senseKey: 'mother-or-father',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '부모 중 한 명',
      'ota yoki ona',
      'a mother or father',
      'родитель',
    ),
    examples: [
      {
        english: 'A parent can be a mother or father.',
        translations: L(
          '부모는 어머니나 아버지를 말해요.',
          'Parent ota yoki ona bo‘lishi mumkin.',
          'A parent can be a mother or father.',
          'Родитель — это мать или отец.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeərənt/',
      ttsText: 'parent',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-mother',
    english: 'mother',
    senseKey: 'female-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('어머니', 'ona', 'a female parent', 'мать'),
    examples: [
      {
        english: 'She is my mother.',
        translations: L(
          '그녀는 제 어머니예요.',
          'U mening onam.',
          'She is my mother.',
          'Она моя мама.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmʌðə/',
      ttsText: 'mother',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-father',
    english: 'father',
    senseKey: 'male-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아버지', 'ota', 'a male parent', 'отец'),
    examples: [
      {
        english: 'He is my father.',
        translations: L(
          '그는 제 아버지예요.',
          'U mening otam.',
          'He is my father.',
          'Он мой отец.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɑːðə/',
      ttsText: 'father',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-child',
    english: 'child',
    senseKey: 'son-or-daughter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아이; 자녀', 'bola; farzand', 'a son or daughter', 'ребёнок'),
    examples: [
      {
        english: 'They have one child.',
        translations: L(
          '그들에게는 자녀가 한 명 있어요.',
          'Ularning bitta farzandi bor.',
          'They have one child.',
          'У них один ребёнок.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃaɪld/',
      ttsText: 'child',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-son',
    english: 'son',
    senseKey: 'male-child',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아들', 'o‘g‘il', 'a male child', 'сын'),
    examples: [
      {
        english: 'Their son is Hasan.',
        translations: L(
          '그들의 아들은 Hasan이에요.',
          'Ularning o‘g‘li Hasan.',
          'Their son is Hasan.',
          'Их сына зовут Хасан.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sʌn/',
      ttsText: 'son',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-daughter',
    english: 'daughter',
    senseKey: 'female-child',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('딸', 'qiz', 'a female child', 'дочь'),
    examples: [
      {
        english: 'Their daughter is Sahila.',
        translations: L(
          '그들의 딸은 Sahila예요.',
          'Ularning qizi Sahila.',
          'Their daughter is Sahila.',
          'Их дочь — Сахила.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɔːtə/',
      ttsText: 'daughter',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-brother',
    english: 'brother',
    senseKey: 'male-sibling',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('형; 오빠; 남동생', 'aka; uka', 'a male sibling', 'брат'),
    examples: [
      {
        english: 'Tariq is Hasan’s brother.',
        translations: L(
          'Tariq은 Hasan의 형제예요.',
          'Tariq Hasanning akasi yoki ukasi.',
          'Tariq is Hasan’s brother.',
          'Тарик — брат Хасана.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbrʌðə/',
      ttsText: 'brother',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-sister',
    english: 'sister',
    senseKey: 'female-sibling',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '누나; 언니; 여동생',
      'opa; singil',
      'a female sibling',
      'сестра',
    ),
    examples: [
      {
        english: 'She is his sister.',
        translations: L(
          '그녀는 그의 여자 형제예요.',
          'U uning opasi yoki singlisi.',
          'She is his sister.',
          'Она его сестра.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪstə/',
      ttsText: 'sister',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-husband',
    english: 'husband',
    senseKey: 'married-man',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('남편', 'er', 'a married man in relation to his wife', 'муж'),
    examples: [
      {
        english: 'Zafar is Rashida’s husband.',
        translations: L(
          'Zafar는 Rashida의 남편이에요.',
          'Zafar Rashidaning eri.',
          'Zafar is Rashida’s husband.',
          'Зафар — муж Рашиды.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhʌzbənd/',
      ttsText: 'husband',
    },
    tags: ['family', 'marriage'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-wife',
    english: 'wife',
    senseKey: 'married-woman',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '아내',
      'xotin; rafiqa',
      'a married woman in relation to her husband',
      'жена',
    ),
    examples: [
      {
        english: 'Rashida is Zafar’s wife.',
        translations: L(
          'Rashida는 Zafar의 아내예요.',
          'Rashida Zafarning rafiqasi.',
          'Rashida is Zafar’s wife.',
          'Рашида — жена Зафара.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/waɪf/',
      ttsText: 'wife',
    },
    tags: ['family', 'marriage'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-grandparent',
    english: 'grandparent',
    senseKey: 'parent-of-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조부모 중 한 명',
      'bobo yoki buvi',
      'a grandfather or grandmother',
      'дедушка или бабушка',
    ),
    examples: [
      {
        english: 'A grandparent is a grandfather or grandmother.',
        translations: L(
          '조부모는 할아버지나 할머니를 말해요.',
          'Grandparent bobo yoki buvi bo‘ladi.',
          'A grandparent is a grandfather or grandmother.',
          'Grandparent — это дедушка или бабушка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænpeərənt/',
      ttsText: 'grandparent',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-grandfather',
    english: 'grandfather',
    senseKey: 'male-grandparent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '할아버지; 외할아버지',
      'bobo',
      'the father of your mother or father',
      'дедушка',
    ),
    examples: [
      {
        english: 'Zafar is Sahila’s grandfather.',
        translations: L(
          'Zafar는 Sahila의 할아버지예요.',
          'Zafar Sahilaning bobosi.',
          'Zafar is Sahila’s grandfather.',
          'Зафар — дедушка Сахилы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænfɑːðə/',
      ttsText: 'grandfather',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-grandmother',
    english: 'grandmother',
    senseKey: 'female-grandparent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '할머니; 외할머니',
      'buvi',
      'the mother of your mother or father',
      'бабушка',
    ),
    examples: [
      {
        english: 'Rashida is Sahila’s grandmother.',
        translations: L(
          'Rashida는 Sahila의 할머니예요.',
          'Rashida Sahilaning buvisi.',
          'Rashida is Sahila’s grandmother.',
          'Рашида — бабушка Сахилы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænmʌðə/',
      ttsText: 'grandmother',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-grandson',
    english: 'grandson',
    senseKey: 'male-grandchild',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손자; 외손자',
      'nabira o‘g‘il',
      'a son of your son or daughter',
      'внук',
    ),
    examples: [
      {
        english: 'Hasan is Zafar’s grandson.',
        translations: L(
          'Hasan은 Zafar의 손자예요.',
          'Hasan Zafarning nabirasi.',
          'Hasan is Zafar’s grandson.',
          'Хасан — внук Зафара.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrænsʌn/',
      ttsText: 'grandson',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-granddaughter',
    english: 'granddaughter',
    senseKey: 'female-grandchild',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손녀; 외손녀',
      'nabira qiz',
      'a daughter of your son or daughter',
      'внучка',
    ),
    examples: [
      {
        english: 'Sahila is Rashida’s granddaughter.',
        translations: L(
          'Sahila는 Rashida의 손녀예요.',
          'Sahila Rashidaning nabirasi.',
          'Sahila is Rashida’s granddaughter.',
          'Сахила — внучка Рашиды.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡrændɔːtə/',
      ttsText: 'granddaughter',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-uncle',
    english: 'uncle',
    senseKey: 'parents-brother',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '삼촌; 외삼촌; 고모부; 이모부',
      'amaki; tog‘a',
      'the brother of a parent or the husband of an aunt',
      'дядя',
    ),
    examples: [
      {
        english: 'Andrew is her uncle.',
        translations: L(
          'Andrew는 그녀의 삼촌이에요.',
          'Andrew uning amakisi yoki tog‘asi.',
          'Andrew is her uncle.',
          'Эндрю — её дядя.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʌŋkəl/',
      ttsText: 'uncle',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-aunt',
    english: 'aunt',
    senseKey: 'parents-sister',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이모; 고모; 숙모',
      'amma; xola',
      'the sister of a parent or the wife of an uncle',
      'тётя',
    ),
    examples: [
      {
        english: 'Laura is his aunt.',
        translations: L(
          'Laura는 그의 이모나 고모예요.',
          'Laura uning ammasi yoki xolasi.',
          'Laura is his aunt.',
          'Лаура — его тётя.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɑːnt/',
      ttsText: 'aunt',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-nephew',
    english: 'nephew',
    senseKey: 'siblings-son',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조카 아들',
      'jiyan o‘g‘il',
      'the son of your brother or sister',
      'племянник',
    ),
    examples: [
      {
        english: 'He is my nephew.',
        translations: L(
          '그는 제 남자 조카예요.',
          'U mening jiyanim.',
          'He is my nephew.',
          'Он мой племянник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnefjuː/',
      ttsText: 'nephew',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-niece',
    english: 'niece',
    senseKey: 'siblings-daughter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조카 딸',
      'jiyan qiz',
      'the daughter of your brother or sister',
      'племянница',
    ),
    examples: [
      {
        english: 'She is my niece.',
        translations: L(
          '그녀는 제 여자 조카예요.',
          'U mening jiyanim.',
          'She is my niece.',
          'Она моя племянница.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/niːs/',
      ttsText: 'niece',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-stepfather',
    english: 'stepfather',
    senseKey: 'mothers-or-fathers-new-husband',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '새아버지; 의붓아버지',
      'o‘gay ota',
      'the husband of your parent who is not your biological father',
      'отчим',
    ),
    examples: [
      {
        english: 'He is her stepfather.',
        translations: L(
          '그는 그녀의 새아버지예요.',
          'U uning o‘gay otasi.',
          'He is her stepfather.',
          'Он её отчим.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstepfɑːðə/',
      ttsText: 'stepfather',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-stepmother',
    english: 'stepmother',
    senseKey: 'fathers-or-mothers-new-wife',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '새어머니; 의붓어머니',
      'o‘gay ona',
      'the wife of your parent who is not your biological mother',
      'мачеха',
    ),
    examples: [
      {
        english: 'She is his stepmother.',
        translations: L(
          '그녀는 그의 새어머니예요.',
          'U uning o‘gay onasi.',
          'She is his stepmother.',
          'Она его мачеха.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstepmʌðə/',
      ttsText: 'stepmother',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-half-brother',
    english: 'half-brother',
    senseKey: 'brother-sharing-one-parent',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이복형제',
      'o‘gay aka yoki uka',
      'a brother who has one parent in common with you',
      'единокровный или единоутробный брат',
    ),
    examples: [
      {
        english: 'He is my half-brother.',
        translations: L(
          '그는 제 이복형제예요.',
          'U mening o‘gay akam yoki ukam.',
          'He is my half-brother.',
          'Он мой сводный брат.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhɑːf ˌbrʌðə/',
      ttsText: 'half-brother',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-brother-in-law',
    english: 'brother-in-law',
    senseKey: 'brother-by-marriage',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '처남; 매형; 형부; 시동생 등 혼인 관계의 남자 형제',
      'qayni aka; qayni uka',
      'a brother by marriage',
      'шурин; деверь; зять',
    ),
    examples: [
      {
        english: 'He is my brother-in-law.',
        translations: L(
          '그는 제 혼인 관계의 남자 형제예요.',
          'U mening qayni akam yoki ukam.',
          'He is my brother-in-law.',
          'Он мой родственник по браку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbrʌðər ɪn lɔː/',
      ttsText: 'brother-in-law',
    },
    tags: ['family', 'in-law'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-sister-in-law',
    english: 'sister-in-law',
    senseKey: 'sister-by-marriage',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '형수; 제수; 올케; 처제 등 혼인 관계의 여자 형제',
      'qayni opa; qayni singil',
      'a sister by marriage',
      'невестка; золовка; свояченица',
    ),
    examples: [
      {
        english: 'She is my sister-in-law.',
        translations: L(
          '그녀는 제 혼인 관계의 여자 형제예요.',
          'U mening qayni opam yoki singlim.',
          'She is my sister-in-law.',
          'Она моя родственница по браку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪstər ɪn lɔː/',
      ttsText: 'sister-in-law',
    },
    tags: ['family', 'in-law'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-twin',
    english: 'twin',
    senseKey: 'one-of-two-born-together',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '쌍둥이 중 한 명',
      'egizak',
      'one of two children born to the same mother at the same time',
      'близнец',
    ),
    examples: [
      {
        english: 'She is a twin.',
        translations: L(
          '그녀는 쌍둥이예요.',
          'U egizak.',
          'She is a twin.',
          'Она близнец.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/twɪn/',
      ttsText: 'twin',
    },
    tags: ['family'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-family-married',
    english: 'married',
    senseKey: 'having-spouse',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '결혼한',
      'turmush qurgan',
      'having a husband or wife',
      'женатый; замужняя',
    ),
    examples: [
      {
        english: 'Are you married?',
        translations: L(
          '결혼했어요?',
          'Turmush qurganmisiz?',
          'Are you married?',
          'Вы женаты?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmærid/',
      ttsText: 'married',
    },
    tags: ['family', 'marriage'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT1_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Immediate family
  // ===========================================================

  en_s2u1_n2_001_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'mother',
    choices: [
      { text: 'mother', label: '👩', emoji: '👩', imageUrl: '' },
      { text: 'father', label: '👨', emoji: '👨', imageUrl: '' },
      { text: 'son', label: '👦', emoji: '👦', imageUrl: '' },
      { text: 'daughter', label: '👧', emoji: '👧', imageUrl: '' },
    ],
    answerTranslation: L('어머니', 'ona', 'mother', 'мать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'mother'],
  },

  en_s2u1_n2_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mother',
        native: 'ona',
        nativeI18n: L('어머니', 'ona', 'mother', 'мать'),
      },
      {
        text: 'father',
        native: 'ota',
        nativeI18n: L('아버지', 'ota', 'father', 'отец'),
      },
      {
        text: 'son',
        native: 'o‘g‘il',
        nativeI18n: L('아들', 'o‘g‘il', 'son', 'сын'),
      },
      {
        text: 'daughter',
        native: 'qiz',
        nativeI18n: L('딸', 'qiz', 'daughter', 'дочь'),
      },
      {
        text: 'child',
        native: 'farzand',
        nativeI18n: L('자녀', 'farzand', 'child', 'ребёнок'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'matching'],
  },

  en_s2u1_n2_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'This is my father.',
    audioText: 'This is my father.',
    answerTranslation: L(
      '이분은 제 아버지예요.',
      'Bu mening otam.',
      'This is my father.',
      'Это мой отец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'father'],
  },

  en_s2u1_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is my ___.',
    blankAnswers: ['mother'],
    options: ['mother', 'father', 'son', 'husband'],
    answer: 'mother',
    answerTranslation: L(
      '그녀는 제 어머니예요.',
      'U mening onam.',
      'She is my mother.',
      'Она моя мама.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'mother'],
  },

  en_s2u1_n2_005_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'daughter',
    choices: [
      { text: 'daughter', label: '👧', emoji: '👧', imageUrl: '' },
      { text: 'son', label: '👦', emoji: '👦', imageUrl: '' },
      { text: 'father', label: '👨', emoji: '👨', imageUrl: '' },
      { text: 'mother', label: '👩', emoji: '👩', imageUrl: '' },
    ],
    answerTranslation: L('딸', 'qiz', 'daughter', 'дочь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'daughter'],
  },

  en_s2u1_n2_006_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'A male child is a ',
    sentenceSuffix: '.',
    answer: 'son',
    answerTranslation: L(
      '남자 자녀는 아들이에요.',
      'Erkak farzand — o‘g‘il.',
      'A male child is a son.',
      'Ребёнок мужского пола — сын.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The family word son.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['typing', 'family'],
  },

  en_s2u1_n2_007_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['my', 'This', 'brother', 'is', 'father', 'are'],
    answer: 'This is my brother',
    answerTranslation: L(
      '이쪽은 제 형제예요.',
      'Bu mening akam yoki ukam.',
      'This is my brother.',
      'Это мой брат.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'brother'],
  },

  en_s2u1_n2_008_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'brother',
        native: 'aka yoki uka',
        nativeI18n: L('남자 형제', 'aka yoki uka', 'brother', 'брат'),
      },
      {
        text: 'sister',
        native: 'opa yoki singil',
        nativeI18n: L('여자 형제', 'opa yoki singil', 'sister', 'сестра'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'wife',
        native: 'rafiqa',
        nativeI18n: L('아내', 'rafiqa', 'wife', 'жена'),
      },
      {
        text: 'family',
        native: 'oila',
        nativeI18n: L('가족', 'oila', 'family', 'семья'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'matching'],
  },

  en_s2u1_n2_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She is my sister.',
    audioText: 'She is my sister.',
    answerTranslation: L(
      '그녀는 제 여자 형제예요.',
      'U mening opam yoki singlim.',
      'She is my sister.',
      'Она моя сестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'sister'],
  },

  en_s2u1_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Rashida is Zafar’s ___.',
    blankAnswers: ['wife'],
    options: ['wife', 'husband', 'son', 'brother'],
    answer: 'wife',
    answerTranslation: L(
      'Rashida는 Zafar의 아내예요.',
      'Rashida Zafarning rafiqasi.',
      'Rashida is Zafar’s wife.',
      'Рашида — жена Зафара.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'wife'],
  },

  en_s2u1_n2_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Zafar is Rashida’s ___.',
    blankAnswers: ['husband'],
    options: ['husband', 'wife', 'daughter', 'mother'],
    answer: 'husband',
    answerTranslation: L(
      'Zafar는 Rashida의 남편이에요.',
      'Zafar Rashidaning eri.',
      'Zafar is Rashida’s husband.',
      'Зафар — муж Рашиды.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'husband'],
  },

  en_s2u1_n2_012_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['two', 'They', 'children', 'have', 'has', 'family'],
    answer: 'They have two children',
    audioText: 'They have two children.',
    answerTranslation: L(
      '그들에게는 자녀가 두 명 있어요.',
      'Ularning ikki farzandi bor.',
      'They have two children.',
      'У них двое детей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['family', 'children'],
  },

  en_s2u1_n2_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who is Hasan?' }],
    options: [
      'He is their son.',
      'She is their daughter.',
      'They are my wife.',
      'He are their child.',
    ],
    answer: 'He is their son.',
    answerTranslation: L(
      '그는 그들의 아들이에요.',
      'U ularning o‘g‘li.',
      'He is their son.',
      'Он их сын.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'son'],
  },

  en_s2u1_n2_014_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'A female child is a ',
    sentenceSuffix: '.',
    answer: 'daughter',
    answerTranslation: L(
      '여자 자녀는 딸이에요.',
      'Ayol farzand — qiz.',
      'A female child is a daughter.',
      'Ребёнок женского пола — дочь.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The family word daughter.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['typing', 'family'],
  },

  en_s2u1_n2_015_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'They are my parents.',
    audioText: 'They are my parents.',
    answerI18n: L(
      '그들은 제 부모님이에요',
      'Ular mening ota-onam',
      'They are my parents',
      'Они мои родители',
    ),
    options: ['They', 'are', 'my', 'parents', 'parent', 'is'],
    optionsI18n: {
      ko: ['그들은', '제', '부모님이에요'],
      uz: ['Ular', 'mening', 'ota-onam'],
      en: ['They', 'are', 'my', 'parents'],
      ru: ['Они', 'мои', 'родители'],
    },
    answerTranslation: L(
      '그들은 제 부모님이에요.',
      'Ular mening ota-onam.',
      'They are my parents.',
      'Они мои родители.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['family', 'parents'],
  },

  en_s2u1_n2_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is Tariq your brother?',
    options: ['Yes', 'is', 'he', 'brother', 'my', 'are'],
    answer: 'Yes he is',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, he is.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'reply'],
  },

  en_s2u1_n2_017_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A mother or father is a ___.',
    blankAnswers: ['parent'],
    options: ['parent', 'child', 'brother', 'son'],
    answer: 'parent',
    answerTranslation: L(
      '어머니나 아버지는 부모예요.',
      'Ona yoki ota — parent.',
      'A mother or father is a parent.',
      'Мать или отец — родитель.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'parent'],
  },

  en_s2u1_n2_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'This is my family.',
    audioText: 'This is my family.',
    answerTranslation: L(
      '이쪽은 제 가족이에요.',
      'Bu mening oilam.',
      'This is my family.',
      'Это моя семья.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family'],
  },

  en_s2u1_n2_019_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are Hasan and Tariq brothers?' }],
    options: [
      'Yes, they are.',
      'Yes, he is.',
      'Yes, they is.',
      'No, she isn’t.',
    ],
    answer: 'Yes, they are.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, they are.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'brothers'],
  },

  en_s2u1_n2_020_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'parent',
        native: 'ota yoki ona',
        nativeI18n: L('부모', 'ota yoki ona', 'parent', 'родитель'),
      },
      {
        text: 'child',
        native: 'farzand',
        nativeI18n: L('자녀', 'farzand', 'child', 'ребёнок'),
      },
      {
        text: 'husband',
        native: 'er',
        nativeI18n: L('남편', 'er', 'husband', 'муж'),
      },
      {
        text: 'wife',
        native: 'rafiqa',
        nativeI18n: L('아내', 'rafiqa', 'wife', 'жена'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Extended family
  // ===========================================================

  en_s2u1_n2_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'grandfather',
        native: 'bobo',
        nativeI18n: L('할아버지', 'bobo', 'grandfather', 'дедушка'),
      },
      {
        text: 'grandmother',
        native: 'buvi',
        nativeI18n: L('할머니', 'buvi', 'grandmother', 'бабушка'),
      },
      {
        text: 'grandson',
        native: 'nabira o‘g‘il',
        nativeI18n: L('손자', 'nabira o‘g‘il', 'grandson', 'внук'),
      },
      {
        text: 'granddaughter',
        native: 'nabira qiz',
        nativeI18n: L('손녀', 'nabira qiz', 'granddaughter', 'внучка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'grandparents'],
  },

  en_s2u1_n2_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'grandmother',
    choices: [
      { text: 'grandmother', label: '👵', emoji: '👵', imageUrl: '' },
      { text: 'grandfather', label: '👴', emoji: '👴', imageUrl: '' },
      { text: 'mother', label: '👩', emoji: '👩', imageUrl: '' },
      { text: 'daughter', label: '👧', emoji: '👧', imageUrl: '' },
    ],
    answerTranslation: L('할머니', 'buvi', 'grandmother', 'бабушка'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'grandmother'],
  },

  en_s2u1_n2_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My mother’s father is my ___.',
    blankAnswers: ['grandfather'],
    options: ['grandfather', 'uncle', 'father', 'nephew'],
    answer: 'grandfather',
    answerTranslation: L(
      '제 어머니의 아버지는 제 할아버지예요.',
      'Onamning otasi mening bobom.',
      'My mother’s father is my grandfather.',
      'Отец моей матери — мой дедушка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'grandfather'],
  },

  en_s2u1_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My father’s mother is my ___.',
    blankAnswers: ['grandmother'],
    options: ['grandmother', 'aunt', 'mother', 'niece'],
    answer: 'grandmother',
    answerTranslation: L(
      '제 아버지의 어머니는 제 할머니예요.',
      'Otamning onasi mening buvim.',
      'My father’s mother is my grandmother.',
      'Мать моего отца — моя бабушка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'grandmother'],
  },

  en_s2u1_n2_025_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'uncle',
        native: 'amaki yoki tog‘a',
        nativeI18n: L('삼촌', 'amaki yoki tog‘a', 'uncle', 'дядя'),
      },
      {
        text: 'aunt',
        native: 'amma yoki xola',
        nativeI18n: L('이모; 고모', 'amma yoki xola', 'aunt', 'тётя'),
      },
      {
        text: 'nephew',
        native: 'jiyan o‘g‘il',
        nativeI18n: L('남자 조카', 'jiyan o‘g‘il', 'nephew', 'племянник'),
      },
      {
        text: 'niece',
        native: 'jiyan qiz',
        nativeI18n: L('여자 조카', 'jiyan qiz', 'niece', 'племянница'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['family', 'extended-family'],
  },

  en_s2u1_n2_026_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My mother’s brother is my ',
    sentenceSuffix: '.',
    answer: 'uncle',
    answerTranslation: L(
      '제 어머니의 남자 형제는 제 삼촌이에요.',
      'Onamning akasi yoki ukasi mening tog‘am.',
      'My mother’s brother is my uncle.',
      'Брат моей матери — мой дядя.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The family word uncle.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['typing', 'uncle'],
  },

  en_s2u1_n2_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My father’s sister is my ',
    sentenceSuffix: '.',
    answer: 'aunt',
    answerTranslation: L(
      '제 아버지의 여자 형제는 제 고모예요.',
      'Otamning opasi yoki singlisi mening ammam.',
      'My father’s sister is my aunt.',
      'Сестра моего отца — моя тётя.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The family word aunt.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['typing', 'aunt'],
  },

  en_s2u1_n2_028_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He is my nephew.',
    audioText: 'He is my nephew.',
    answerTranslation: L(
      '그는 제 남자 조카예요.',
      'U mening jiyanim.',
      'He is my nephew.',
      'Он мой племянник.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'nephew'],
  },

  en_s2u1_n2_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She is my niece.',
    audioText: 'She is my niece.',
    answerTranslation: L(
      '그녀는 제 여자 조카예요.',
      'U mening jiyanim.',
      'She is my niece.',
      'Она моя племянница.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'niece'],
  },

  en_s2u1_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A grandfather or grandmother is a ___.',
    blankAnswers: ['grandparent'],
    options: ['grandparent', 'parent', 'grandson', 'child'],
    answer: 'grandparent',
    answerTranslation: L(
      '할아버지나 할머니는 조부모예요.',
      'Bobo yoki buvi — grandparent.',
      'A grandfather or grandmother is a grandparent.',
      'Дедушка или бабушка — grandparent.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'grandparent'],
  },

  en_s2u1_n2_031_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['granddaughter', 'is', 'She', 'their', 'grandson', 'are'],
    answer: 'She is their granddaughter',
    audioText: 'She is their granddaughter.',
    answerTranslation: L(
      '그녀는 그들의 손녀예요.',
      'U ularning nabira qizi.',
      'She is their granddaughter.',
      'Она их внучка.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['family', 'granddaughter'],
  },

  en_s2u1_n2_032_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He is their grandson.',
    audioText: 'He is their grandson.',
    answerI18n: L(
      '그는 그들의 손자예요',
      'U ularning nabirasi',
      'He is their grandson',
      'Он их внук',
    ),
    options: ['He', 'is', 'their', 'grandson', 'grandfather', 'are'],
    optionsI18n: {
      ko: ['그는', '그들의', '손자예요'],
      uz: ['U', 'ularning', 'nabirasi'],
      en: ['He', 'is', 'their', 'grandson'],
      ru: ['Он', 'их', 'внук'],
    },
    answerTranslation: L(
      '그는 그들의 손자예요.',
      'U ularning nabirasi.',
      'He is their grandson.',
      'Он их внук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['family', 'grandson'],
  },

  en_s2u1_n2_033_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'stepfather',
        native: 'o‘gay ota',
        nativeI18n: L('새아버지', 'o‘gay ota', 'stepfather', 'отчим'),
      },
      {
        text: 'stepmother',
        native: 'o‘gay ona',
        nativeI18n: L('새어머니', 'o‘gay ona', 'stepmother', 'мачеха'),
      },
      {
        text: 'half-brother',
        native: 'o‘gay aka yoki uka',
        nativeI18n: L(
          '이복형제',
          'o‘gay aka yoki uka',
          'half-brother',
          'сводный брат',
        ),
      },
      {
        text: 'brother-in-law',
        native: 'qayni aka yoki uka',
        nativeI18n: L(
          '혼인 관계의 남자 형제',
          'qayni aka yoki uka',
          'brother-in-law',
          'родственник по браку',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'relationships'],
  },

  en_s2u1_n2_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My mother’s new husband is my ___.',
    blankAnswers: ['stepfather'],
    options: ['stepfather', 'grandfather', 'uncle', 'brother-in-law'],
    answer: 'stepfather',
    answerTranslation: L(
      '어머니의 새 남편은 제 새아버지예요.',
      'Onamning yangi eri mening o‘gay otam.',
      'My mother’s new husband is my stepfather.',
      'Новый муж моей матери — мой отчим.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'stepfather'],
  },

  en_s2u1_n2_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My father’s new wife is my ___.',
    blankAnswers: ['stepmother'],
    options: ['stepmother', 'grandmother', 'aunt', 'sister'],
    answer: 'stepmother',
    answerTranslation: L(
      '아버지의 새 아내는 제 새어머니예요.',
      'Otamning yangi rafiqasi mening o‘gay onam.',
      'My father’s new wife is my stepmother.',
      'Новая жена моего отца — моя мачеха.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'stepmother'],
  },

  en_s2u1_n2_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He is my half-brother.',
    audioText: 'He is my half-brother.',
    answerTranslation: L(
      '그는 제 이복형제예요.',
      'U mening o‘gay akam yoki ukam.',
      'He is my half-brother.',
      'Он мой сводный брат.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'half-brother'],
  },

  en_s2u1_n2_037_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'brother-in-law',
        native: 'qayni aka yoki uka',
        nativeI18n: L(
          '혼인 관계의 남자 형제',
          'qayni aka yoki uka',
          'brother-in-law',
          'родственник по браку',
        ),
      },
      {
        text: 'sister-in-law',
        native: 'qayni opa yoki singil',
        nativeI18n: L(
          '혼인 관계의 여자 형제',
          'qayni opa yoki singil',
          'sister-in-law',
          'родственница по браку',
        ),
      },
      {
        text: 'nephew',
        native: 'jiyan o‘g‘il',
        nativeI18n: L('남자 조카', 'jiyan o‘g‘il', 'nephew', 'племянник'),
      },
      {
        text: 'niece',
        native: 'jiyan qiz',
        nativeI18n: L('여자 조카', 'jiyan qiz', 'niece', 'племянница'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'in-law'],
  },

  en_s2u1_n2_038_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Two children born at the same time are ___.',
    blankAnswers: ['twins'],
    options: ['twins', 'parents', 'uncles', 'grandparents'],
    answer: 'twins',
    answerTranslation: L(
      '같은 때 태어난 두 아이는 쌍둥이예요.',
      'Bir vaqtda tug‘ilgan ikki bola egizaklar.',
      'Two children born at the same time are twins.',
      'Два ребёнка, родившиеся одновременно, — близнецы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'twin'],
  },

  en_s2u1_n2_039_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are they twins?' }],
    options: [
      'Yes, they are.',
      'Yes, she is.',
      'Yes, they is.',
      'No, he aren’t.',
    ],
    answer: 'Yes, they are.',
    answerTranslation: L(
      '네, 쌍둥이예요.',
      'Ha, ular egizak.',
      'Yes, they are.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'twins'],
  },

  en_s2u1_n2_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They have twins in their family.',
    audioText: 'They have twins in their family.',
    answerTranslation: L(
      '그 가족에는 쌍둥이가 있어요.',
      'Ularning oilasida egizaklar bor.',
      'They have twins in their family.',
      'В их семье есть близнецы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'twins', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Possessive determiners
  // ===========================================================

  en_s2u1_n2_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I love ___ family.',
    blankAnswers: ['my'],
    options: ['my', 'your', 'his', 'their'],
    answer: 'my',
    answerTranslation: L(
      '저는 제 가족을 사랑해요.',
      'Men oilamni yaxshi ko‘raman.',
      'I love my family.',
      'Я люблю свою семью.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'my'],
  },

  en_s2u1_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You have a brother. What is ___ name?',
    blankAnswers: ['his'],
    options: ['his', 'her', 'our', 'my'],
    answer: 'his',
    answerTranslation: L(
      '당신에게 남자 형제가 있어요. 그의 이름은 뭐예요?',
      'Sizning akangiz yoki ukangiz bor. Uning ismi nima?',
      'You have a brother. What is his name?',
      'У вас есть брат. Как его зовут?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'his'],
  },

  en_s2u1_n2_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She has a sister. ___ name is Sahila.',
    blankAnswers: ['Her'],
    options: ['Her', 'His', 'Their', 'Your'],
    answer: 'Her',
    answerTranslation: L(
      '그녀에게 여자 형제가 있어요. 그녀의 이름은 Sahila예요.',
      'Uning singlisi bor. Uning ismi Sahila.',
      'She has a sister. Her name is Sahila.',
      'У неё есть сестра. Её зовут Сахила.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'her'],
  },

  en_s2u1_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We love ___ family.',
    blankAnswers: ['our'],
    options: ['our', 'their', 'your', 'his'],
    answer: 'our',
    answerTranslation: L(
      '우리는 우리 가족을 사랑해요.',
      'Biz oilamizni yaxshi ko‘ramiz.',
      'We love our family.',
      'Мы любим нашу семью.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'our'],
  },

  en_s2u1_n2_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They live with ___ parents.',
    blankAnswers: ['their'],
    options: ['their', 'our', 'her', 'my'],
    answer: 'their',
    answerTranslation: L(
      '그들은 부모님과 함께 살아요.',
      'Ular ota-onalari bilan yashaydi.',
      'They live with their parents.',
      'Они живут со своими родителями.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'their'],
  },

  en_s2u1_n2_046_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I have a sister. ',
    sentenceSuffix: ' name is Anna.',
    answer: 'Her',
    answerTranslation: L(
      '저에게 여자 형제가 있어요. 그녀의 이름은 Anna예요.',
      'Mening opam yoki singlim bor. Uning ismi Anna.',
      'I have a sister. Her name is Anna.',
      'У меня есть сестра. Её зовут Анна.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the possessive determiner her.',
      acceptedAnswers: ['her'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['typing', 'possessive-determiner'],
  },

  en_s2u1_n2_047_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['father', 'His', 'is', 'doctor', 'a', 'Her'],
    answer: 'His father is a doctor',
    answerTranslation: L(
      '그의 아버지는 의사예요.',
      'Uning otasi shifokor.',
      'His father is a doctor.',
      'Его отец — врач.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'his'],
  },

  en_s2u1_n2_048_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['mother', 'teacher', 'Her', 'is', 'a', 'Their'],
    answer: 'Her mother is a teacher',
    audioText: 'Her mother is a teacher.',
    answerTranslation: L(
      '그녀의 어머니는 선생님이에요.',
      'Uning onasi o‘qituvchi.',
      'Her mother is a teacher.',
      'Её мама — учитель.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['possessive-determiner', 'her'],
  },

  en_s2u1_n2_049_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Their daughter is Sahila.',
    audioText: 'Their daughter is Sahila.',
    answerI18n: L(
      '그들의 딸은 Sahila예요',
      'Ularning qizi Sahila',
      'Their daughter is Sahila',
      'Их дочь — Сахила',
    ),
    options: ['Their', 'daughter', 'is', 'Sahila', 'Her', 'son'],
    optionsI18n: {
      ko: ['그들의', '딸은', 'Sahila예요'],
      uz: ['Ularning', 'qizi', 'Sahila'],
      en: ['Their', 'daughter', 'is', 'Sahila'],
      ru: ['Их', 'дочь', 'Сахила'],
    },
    answerTranslation: L(
      '그들의 딸은 Sahila예요.',
      'Ularning qizi Sahila.',
      'Their daughter is Sahila.',
      'Их дочь — Сахила.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['possessive-determiner', 'their'],
  },

  en_s2u1_n2_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your father’s name?' }],
    options: [
      'His name is Zafar.',
      'Her name is Zafar.',
      'My name are Zafar.',
      'Their father name Zafar.',
    ],
    answer: 'His name is Zafar.',
    answerTranslation: L(
      '그의 이름은 Zafar예요.',
      'Uning ismi Zafar.',
      'His name is Zafar.',
      'Его зовут Зафар.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'his'],
  },

  en_s2u1_n2_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You and your sister love ___ parents.',
    blankAnswers: ['your'],
    options: ['your', 'our', 'their', 'his'],
    answer: 'your',
    answerTranslation: L(
      '당신과 당신의 여자 형제는 부모님을 사랑해요.',
      'Siz va opangiz yoki singlingiz ota-onangizni yaxshi ko‘rasiz.',
      'You and your sister love your parents.',
      'Вы с сестрой любите своих родителей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'your'],
  },

  en_s2u1_n2_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The family has a house. ___ house is big.',
    blankAnswers: ['Their'],
    options: ['Their', 'Our', 'His', 'My'],
    answer: 'Their',
    answerTranslation: L(
      '그 가족에게 집이 있어요. 그들의 집은 커요.',
      'Oilaning uyi bor. Ularning uyi katta.',
      'The family has a house. Their house is big.',
      'У семьи есть дом. Их дом большой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'their'],
  },

  en_s2u1_n2_053_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We have two children. ',
    sentenceSuffix: ' children are young.',
    answer: 'Our',
    answerTranslation: L(
      '우리에게는 자녀가 두 명 있어요. 우리 아이들은 어려요.',
      'Bizning ikki farzandimiz bor. Farzandlarimiz yosh.',
      'We have two children. Our children are young.',
      'У нас двое детей. Наши дети маленькие.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the possessive determiner our.',
      acceptedAnswers: ['our'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['typing', 'possessive-determiner'],
  },

  en_s2u1_n2_054_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['parents', 'Their', 'Korea', 'from', 'are', 'Our'],
    answer: 'Their parents are from Korea',
    answerTranslation: L(
      '그들의 부모님은 한국 출신이에요.',
      'Ularning ota-onasi Koreyadan.',
      'Their parents are from Korea.',
      'Их родители из Кореи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'their'],
  },

  en_s2u1_n2_055_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your sister’s name?',
    options: ['Her', 'name', 'is', 'Sahila', 'His', 'are'],
    answer: 'Her name is Sahila',
    answerTranslation: L(
      '그녀의 이름은 Sahila예요.',
      'Uning ismi Sahila.',
      'Her name is Sahila.',
      'Её зовут Сахила.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['possessive-determiner', 'family'],
  },

  en_s2u1_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He has two children. ___ children are twins.',
    blankAnswers: ['His'],
    options: ['His', 'Her', 'Our', 'My'],
    answer: 'His',
    answerTranslation: L(
      '그에게는 자녀가 두 명 있어요. 그의 아이들은 쌍둥이예요.',
      'Uning ikki farzandi bor. Uning farzandlari egizak.',
      'He has two children. His children are twins.',
      'У него двое детей. Его дети — близнецы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'his'],
  },

  en_s2u1_n2_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Their family is very big.',
    audioText: 'Their family is very big.',
    answerTranslation: L(
      '그들의 가족은 아주 커요.',
      'Ularning oilasi juda katta.',
      'Their family is very big.',
      'Их семья очень большая.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'their'],
  },

  en_s2u1_n2_058_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is that your mother?' }],
    options: ['Yes, she is.', 'Yes, his is.', 'Yes, her are.', 'No, my is.'],
    answer: 'Yes, she is.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, she is.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'possessive-determiner'],
  },

  en_s2u1_n2_059_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['our', 'This', 'family', 'is', 'their', 'are'],
    answer: 'This is our family',
    audioText: 'This is our family.',
    answerTranslation: L(
      '이쪽은 우리 가족이에요.',
      'Bu bizning oilamiz.',
      'This is our family.',
      'Это наша семья.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['possessive-determiner', 'our'],
  },

  en_s2u1_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother and his wife live in London.',
    audioText: 'My brother and his wife live in London.',
    answerTranslation: L(
      '제 형제와 그의 아내는 런던에 살아요.',
      'Akam yoki ukam va uning rafiqasi Londonda yashaydi.',
      'My brother and his wife live in London.',
      'Мой брат и его жена живут в Лондоне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-determiner', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Possessive 's and family review
  // ===========================================================

  en_s2u1_n2_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Zafar is Rashida___ husband.',
    blankAnswers: ['’s'],
    options: ['’s', 's', 'is', 'are'],
    answer: '’s',
    answerTranslation: L(
      'Zafar는 Rashida의 남편이에요.',
      'Zafar Rashidaning eri.',
      'Zafar is Rashida’s husband.',
      'Зафар — муж Рашиды.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-s', 'family'],
  },

  en_s2u1_n2_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Hasan is Tariq___ brother.',
    blankAnswers: ['’s'],
    options: ['’s', 'is', 'are', 's'],
    answer: '’s',
    answerTranslation: L(
      'Hasan은 Tariq의 형제예요.',
      'Hasan Tariqning akasi yoki ukasi.',
      'Hasan is Tariq’s brother.',
      'Хасан — брат Тарика.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-s', 'brother'],
  },

  en_s2u1_n2_063_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['is', 'Sahila’s', 'Rafina', 'mother', 'father', 'are'],
    answer: 'Rafina is Sahila’s mother',
    answerTranslation: L(
      'Rafina는 Sahila의 어머니예요.',
      'Rafina Sahilaning onasi.',
      'Rafina is Sahila’s mother.',
      'Рафина — мать Сахилы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-s', 'family'],
  },

  en_s2u1_n2_064_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['grandmother', 'Rashida', 'Sahila’s', 'is', 'are', 'mother'],
    answer: 'Rashida is Sahila’s grandmother',
    audioText: 'Rashida is Sahila’s grandmother.',
    answerTranslation: L(
      'Rashida는 Sahila의 할머니예요.',
      'Rashida Sahilaning buvisi.',
      'Rashida is Sahila’s grandmother.',
      'Рашида — бабушка Сахилы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['possessive-s', 'grandmother'],
  },

  en_s2u1_n2_065_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Sahila is Rafina',
    sentenceSuffix: ' daughter.',
    answer: '’s',
    answerTranslation: L(
      'Sahila는 Rafina의 딸이에요.',
      'Sahila Rafinaning qizi.',
      'Sahila is Rafina’s daughter.',
      'Сахила — дочь Рафины.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use possessive apostrophe s.',
      acceptedAnswers: ["'s"],
      tolerance: {
        punctuation: false,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['typing', 'possessive-s'],
  },

  en_s2u1_n2_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Who’s Tariq?' }],
    options: [
      'He’s Hasan’s brother.',
      'She’s Hasan’s brother.',
      'He are Hasan brother.',
      'His Hasan brother.',
    ],
    answer: 'He’s Hasan’s brother.',
    answerTranslation: L(
      '그는 Hasan의 형제예요.',
      'U Hasanning akasi yoki ukasi.',
      'He’s Hasan’s brother.',
      'Он брат Хасана.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['possessive-s', 'who'],
  },

  en_s2u1_n2_067_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who’s Rashida?',
    options: ['Zafar’s', 'wife', 'She’s', 'husband', 'his', 'are'],
    answer: 'She’s Zafar’s wife',
    answerTranslation: L(
      '그녀는 Zafar의 아내예요.',
      'U Zafarning rafiqasi.',
      'She’s Zafar’s wife.',
      'Она жена Зафара.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['possessive-s', 'wife'],
  },

  en_s2u1_n2_068_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Zafar is Hasan’s grandfather.',
    audioText: 'Zafar is Hasan’s grandfather.',
    answerI18n: L(
      'Zafar는 Hasan의 할아버지예요',
      'Zafar Hasanning bobosi',
      'Zafar is Hasan’s grandfather',
      'Зафар — дедушка Хасана',
    ),
    options: ['Zafar', 'is', 'Hasan’s', 'grandfather', 'father', 'are'],
    optionsI18n: {
      ko: ['Zafar는', 'Hasan의', '할아버지예요'],
      uz: ['Zafar', 'Hasanning', 'bobosi'],
      en: ['Zafar', 'is', 'Hasan’s', 'grandfather'],
      ru: ['Зафар', 'дедушка', 'Хасана'],
    },
    answerTranslation: L(
      'Zafar는 Hasan의 할아버지예요.',
      'Zafar Hasanning bobosi.',
      'Zafar is Hasan’s grandfather.',
      'Зафар — дедушка Хасана.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['possessive-s', 'grandfather'],
  },

  en_s2u1_n2_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My ___ name is Anna.',
    blankAnswers: ['sister’s'],
    options: ['sister’s', 'sister', 'sisters', 'sisters’'],
    answer: 'sister’s',
    answerTranslation: L(
      '제 여자 형제의 이름은 Anna예요.',
      'Opam yoki singlimning ismi Anna.',
      'My sister’s name is Anna.',
      'Мою сестру зовут Анна.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-s', 'sister'],
  },

  en_s2u1_n2_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Her ___ job is interesting.',
    blankAnswers: ['husband’s'],
    options: ['husband’s', 'husband', 'husbands', 'husbands’'],
    answer: 'husband’s',
    answerTranslation: L(
      '그녀 남편의 직업은 흥미로워요.',
      'Uning erining ishi qiziq.',
      'Her husband’s job is interesting.',
      'Работа её мужа интересная.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['possessive-s', 'husband'],
  },

  en_s2u1_n2_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother’s children are my nephew and niece.',
    audioText: 'My brother’s children are my nephew and niece.',
    answerTranslation: L(
      '제 형제의 자녀들은 제 남자 조카와 여자 조카예요.',
      'Akam yoki ukamning farzandlari mening jiyanlarim.',
      'My brother’s children are my nephew and niece.',
      'Дети моего брата — мои племянник и племянница.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'possessive-s'],
  },

  en_s2u1_n2_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'mother',
        native: 'ona',
        nativeI18n: L('어머니', 'ona', 'mother', 'мать'),
      },
      {
        text: 'uncle',
        native: 'amaki yoki tog‘a',
        nativeI18n: L('삼촌', 'amaki yoki tog‘a', 'uncle', 'дядя'),
      },
      {
        text: 'granddaughter',
        native: 'nabira qiz',
        nativeI18n: L('손녀', 'nabira qiz', 'granddaughter', 'внучка'),
      },
      {
        text: 'stepfather',
        native: 'o‘gay ota',
        nativeI18n: L('새아버지', 'o‘gay ota', 'stepfather', 'отчим'),
      },
      {
        text: 'niece',
        native: 'jiyan qiz',
        nativeI18n: L('여자 조카', 'jiyan qiz', 'niece', 'племянница'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'review'],
  },

  en_s2u1_n2_073_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The son of my brother is my ',
    sentenceSuffix: '.',
    answer: 'nephew',
    answerTranslation: L(
      '제 형제의 아들은 제 남자 조카예요.',
      'Akam yoki ukamning o‘g‘li mening jiyanim.',
      'The son of my brother is my nephew.',
      'Сын моего брата — мой племянник.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The family word nephew.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['typing', 'nephew'],
  },

  en_s2u1_n2_074_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The daughter of my sister is my ',
    sentenceSuffix: '.',
    answer: 'niece',
    answerTranslation: L(
      '제 여자 형제의 딸은 제 여자 조카예요.',
      'Opam yoki singlimning qizi mening jiyanim.',
      'The daughter of my sister is my niece.',
      'Дочь моей сестры — моя племянница.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The family word niece.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['typing', 'niece'],
  },

  en_s2u1_n2_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you married?' }],
    options: ['Yes, I am.', 'Yes, I do.', 'Yes, I is.', 'Yes, married.'],
    answer: 'Yes, I am.',
    answerTranslation: L(
      '네, 결혼했어요.',
      'Ha, turmush qurganman.',
      'Yes, I am.',
      'Да.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'married'],
  },

  en_s2u1_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A wife and husband are ___.',
    blankAnswers: ['married'],
    options: ['married', 'twins', 'parents-in-law', 'children'],
    answer: 'married',
    answerTranslation: L(
      '아내와 남편은 결혼한 사이예요.',
      'Er va xotin turmush qurgan.',
      'A wife and husband are married.',
      'Муж и жена состоят в браке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['family', 'married'],
  },

  en_s2u1_n2_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['grandparents', 'These', 'my', 'are', 'is', 'parents'],
    answer: 'These are my grandparents',
    answerTranslation: L(
      '이분들은 제 조부모님이에요.',
      'Bular mening bobo-buvim.',
      'These are my grandparents.',
      'Это мои бабушка и дедушка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'grandparents'],
  },

  en_s2u1_n2_078_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Who is Sahila?',
    options: ['their', 'daughter', 'She’s', 'son', 'his', 'is'],
    answer: 'She’s their daughter',
    answerTranslation: L(
      '그녀는 그들의 딸이에요.',
      'U ularning qizi.',
      'She’s their daughter.',
      'Она их дочь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'daughter'],
  },

  en_s2u1_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Zafar and Rashida have two children and three grandchildren.',
    audioText: 'Zafar and Rashida have two children and three grandchildren.',
    answerTranslation: L(
      'Zafar와 Rashida에게는 자녀 두 명과 손주 세 명이 있어요.',
      'Zafar va Rashidaning ikki farzandi va uch nabirasi bor.',
      'Zafar and Rashida have two children and three grandchildren.',
      'У Зафара и Рашиды двое детей и трое внуков.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'review'],
  },

  en_s2u1_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Tell me about your family.' }],
    options: [
      'I have a brother and a sister.',
      'My nationality is family.',
      'I am two parents.',
      'My brother are daughter.',
    ],
    answer: 'I have a brother and a sister.',
    answerTranslation: L(
      '저에게는 남자 형제와 여자 형제가 한 명씩 있어요.',
      'Mening akam yoki ukam va opam yoki singlim bor.',
      'I have a brother and a sister.',
      'У меня есть брат и сестра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['family', 'unit-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE2 = {
  title: L('가족', 'Oila', 'Family', 'Семья'),
  section: 2,
  unit: 1,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L('우리 가족', 'Mening oilam', 'My family', 'Моя семья'),
      description: L(
        '부모, 자녀, 형제자매, 남편과 아내를 나타내는 기본 가족 어휘를 익혀요.',
        'Ota-ona, farzandlar, aka-uka, opa-singil, er va xotin kabi asosiy oila so‘zlarini o‘rganasiz.',
        'Learn basic family words for parents, children, brothers, sisters, husbands and wives.',
        'Изучаем основные слова о семье: родители, дети, братья, сёстры, муж и жена.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u1_n2_001_image_choice',
        'en_s2u1_n2_002_word_matching',
        'en_s2u1_n2_003_speaking',
        'en_s2u1_n2_004_fill_in_blank',
        'en_s2u1_n2_005_image_choice',
        'en_s2u1_n2_006_type_answer',
        'en_s2u1_n2_007_translate_builder',
        'en_s2u1_n2_008_word_matching',
        'en_s2u1_n2_009_speaking',
        'en_s2u1_n2_010_fill_in_blank',
        'en_s2u1_n2_011_fill_in_blank',
        'en_s2u1_n2_012_word_arrange',
        'en_s2u1_n2_013_dialog_complete',
        'en_s2u1_n2_014_type_answer',
        'en_s2u1_n2_015_sentence_builder',
        'en_s2u1_n2_016_reply_builder',
        'en_s2u1_n2_017_fill_in_blank',
        'en_s2u1_n2_018_speaking',
        'en_s2u1_n2_019_dialog_complete',
        'en_s2u1_n2_020_word_matching',
      ],
    },

    {
      title: L('대가족', 'Katta oila', 'Extended family', 'Большая семья'),
      description: L(
        '조부모, 손주, 삼촌, 이모·고모, 조카와 다양한 가족 관계를 익혀요.',
        'Bobo-buvi, nabiralar, amaki-tog‘a, amma-xola, jiyanlar va boshqa oilaviy munosabatlarni o‘rganasiz.',
        'Learn words for grandparents, grandchildren, uncles, aunts, nephews, nieces and other family relationships.',
        'Изучаем слова для бабушек и дедушек, внуков, дядей, тёть, племянников и других родственников.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u1_n2_021_word_matching',
        'en_s2u1_n2_022_image_choice',
        'en_s2u1_n2_023_fill_in_blank',
        'en_s2u1_n2_024_fill_in_blank',
        'en_s2u1_n2_025_word_matching',
        'en_s2u1_n2_026_type_answer',
        'en_s2u1_n2_027_type_answer',
        'en_s2u1_n2_028_speaking',
        'en_s2u1_n2_029_speaking',
        'en_s2u1_n2_030_fill_in_blank',
        'en_s2u1_n2_031_word_arrange',
        'en_s2u1_n2_032_sentence_builder',
        'en_s2u1_n2_033_word_matching',
        'en_s2u1_n2_034_fill_in_blank',
        'en_s2u1_n2_035_fill_in_blank',
        'en_s2u1_n2_036_speaking',
        'en_s2u1_n2_037_word_matching',
        'en_s2u1_n2_038_fill_in_blank',
        'en_s2u1_n2_039_dialog_complete',
        'en_s2u1_n2_040_speaking',
      ],
    },

    {
      title: L(
        '나의, 너의, 그의, 그녀의',
        'Mening, sizning, uning',
        'My, your, his and her',
        'Мой, твой, его и её',
      ),
      description: L(
        'my, your, his, her, our, their 같은 소유 한정사를 사용해 가족 관계를 설명해요.',
        'My, your, his, her, our va their kabi egalik aniqlovchilari bilan oila haqida gapirasiz.',
        'Use possessive determiners such as my, your, his, her, our and their to describe families.',
        'Используем my, your, his, her, our и their для описания семьи.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u1_n2_041_fill_in_blank',
        'en_s2u1_n2_042_fill_in_blank',
        'en_s2u1_n2_043_fill_in_blank',
        'en_s2u1_n2_044_fill_in_blank',
        'en_s2u1_n2_045_fill_in_blank',
        'en_s2u1_n2_046_type_answer',
        'en_s2u1_n2_047_translate_builder',
        'en_s2u1_n2_048_word_arrange',
        'en_s2u1_n2_049_sentence_builder',
        'en_s2u1_n2_050_dialog_complete',
        'en_s2u1_n2_051_fill_in_blank',
        'en_s2u1_n2_052_fill_in_blank',
        'en_s2u1_n2_053_type_answer',
        'en_s2u1_n2_054_translate_builder',
        'en_s2u1_n2_055_reply_builder',
        'en_s2u1_n2_056_fill_in_blank',
        'en_s2u1_n2_057_speaking',
        'en_s2u1_n2_058_dialog_complete',
        'en_s2u1_n2_059_word_arrange',
        'en_s2u1_n2_060_speaking',
      ],
    },

    {
      title: L(
        '누구의 가족이에요?',
        'Bu kimning oilasi?',
        'Whose family is it?',
        'Чья это семья?',
      ),
      description: L(
        '소유격 ’s를 사용해 누구의 부모, 형제, 자녀인지 말하고 Unit의 가족 어휘를 종합 복습해요.',
        'Egalik ’s shakli bilan kimning ota-onasi, aka-ukasi yoki farzandi ekanini aytib, oila so‘zlarini takrorlaysiz.',
        'Use possessive ’s to show family relationships and review the family vocabulary from the unit.',
        'Используем притяжательное ’s для семейных отношений и повторяем лексику темы.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u1_n2_061_fill_in_blank',
        'en_s2u1_n2_062_fill_in_blank',
        'en_s2u1_n2_063_translate_builder',
        'en_s2u1_n2_064_word_arrange',
        'en_s2u1_n2_065_type_answer',
        'en_s2u1_n2_066_dialog_complete',
        'en_s2u1_n2_067_reply_builder',
        'en_s2u1_n2_068_sentence_builder',
        'en_s2u1_n2_069_fill_in_blank',
        'en_s2u1_n2_070_fill_in_blank',
        'en_s2u1_n2_071_speaking',
        'en_s2u1_n2_072_word_matching',
        'en_s2u1_n2_073_type_answer',
        'en_s2u1_n2_074_type_answer',
        'en_s2u1_n2_075_dialog_complete',
        'en_s2u1_n2_076_fill_in_blank',
        'en_s2u1_n2_077_translate_builder',
        'en_s2u1_n2_078_reply_builder',
        'en_s2u1_n2_079_speaking',
        'en_s2u1_n2_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 1 · Node 3
// 1.3 Vocabulary and skills development
//
// Coverage
// - positive contractions
//   I'm / you're / he's / she's / it's / we're / they're
// - negative contractions
//   isn't / aren't
// - contraction pronunciation and recognition
// - regular plural nouns
// - plural + -s
// - plural + -es
// - consonant + y → -ies
// - irregular plurals
//   child → children
//   man → men
//   woman → women
//   person → people
// - names and titles
// - workbook vocabulary:
//   dictionary / bookshelf / box / chocolate / brush
//   football / pitch / bus / city / president / neighbour
//   child / adult / baby / man / woman / person / car / road
//
// IMPORTANT:
// *_WORDS에는 단어 하나만 등록.
// "box of chocolates", "football pitches" 같은 구는 등록 금지.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE3_WORDS = [
  {
    code: 'en-noun-name',
    english: 'name',
    senseKey: 'word-person-or-thing-is-called',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이름',
      'ism',
      'a word used to identify a person or thing',
      'имя; название',
    ),
    examples: [
      {
        english: 'My name is Anna.',
        translations: L(
          '제 이름은 Anna예요.',
          'Mening ismim Anna.',
          'My name is Anna.',
          'Меня зовут Анна.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/neɪm/',
      ttsText: 'name',
    },
    tags: ['identity', 'unit1'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-title',
    english: 'title',
    senseKey: 'word-showing-status-or-position',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '호칭; 칭호; 제목',
      'unvon; nom',
      'a word used before a name or a name given to a work',
      'титул; обращение; название',
    ),
    examples: [
      {
        english: 'Mr is a title.',
        translations: L(
          'Mr는 호칭이에요.',
          'Mr — unvon.',
          'Mr is a title.',
          'Mr — это форма обращения.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtaɪtəl/',
      ttsText: 'title',
    },
    tags: ['identity', 'names'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-dictionary',
    english: 'dictionary',
    senseKey: 'book-explaining-words',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사전',
      'lug‘at',
      'a book or resource that explains words',
      'словарь',
    ),
    examples: [
      {
        english: 'I have two dictionaries.',
        translations: L(
          '저는 사전이 두 권 있어요.',
          'Menda ikkita lug‘at bor.',
          'I have two dictionaries.',
          'У меня два словаря.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɪkʃənəri/',
      ttsText: 'dictionary',
    },
    tags: ['objects', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-bookshelf',
    english: 'bookshelf',
    senseKey: 'shelf-for-books',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '책꽂이; 책장',
      'kitob javoni',
      'a shelf for keeping books',
      'книжная полка',
    ),
    examples: [
      {
        english: 'There are three bookshelves.',
        translations: L(
          '책장이 세 개 있어요.',
          'Uchta kitob javoni bor.',
          'There are three bookshelves.',
          'Там три книжные полки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbʊkʃelf/',
      ttsText: 'bookshelf',
    },
    tags: ['objects', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-box',
    english: 'box',
    senseKey: 'container-with-flat-sides',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('상자', 'quti', 'a container with flat sides', 'коробка'),
    examples: [
      {
        english: 'There are two boxes.',
        translations: L(
          '상자가 두 개 있어요.',
          'Ikkita quti bor.',
          'There are two boxes.',
          'Там две коробки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɒks/',
      ttsText: 'box',
    },
    tags: ['objects', 'plural-es'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-chocolate',
    english: 'chocolate',
    senseKey: 'sweet-food-made-from-cocoa',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('초콜릿', 'shokolad', 'a sweet food made from cocoa', 'шоколад'),
    examples: [
      {
        english: 'The box has chocolates in it.',
        translations: L(
          '상자 안에 초콜릿이 들어 있어요.',
          'Qutida shokoladlar bor.',
          'The box has chocolates in it.',
          'В коробке есть шоколадные конфеты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃɒklət/',
      ttsText: 'chocolate',
    },
    tags: ['food', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-brush',
    english: 'brush',
    senseKey: 'tool-with-bristles',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '솔; 브러시',
      'cho‘tka',
      'a tool with bristles used for cleaning or grooming',
      'щётка',
    ),
    examples: [
      {
        english: 'There are two brushes.',
        translations: L(
          '브러시가 두 개 있어요.',
          'Ikkita cho‘tka bor.',
          'There are two brushes.',
          'Там две щётки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/brʌʃ/',
      ttsText: 'brush',
    },
    tags: ['objects', 'plural-es'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-football',
    english: 'football',
    senseKey: 'sport-played-with-ball',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '축구',
      'futbol',
      'a sport played with a ball between two teams',
      'футбол',
    ),
    examples: [
      {
        english: 'They play football.',
        translations: L(
          '그들은 축구를 해요.',
          'Ular futbol o‘ynaydi.',
          'They play football.',
          'Они играют в футбол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfʊtbɔːl/',
      ttsText: 'football',
    },
    tags: ['sports'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-pitch',
    english: 'pitch',
    senseKey: 'area-for-sports',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경기장',
      'sport maydoni',
      'an area of ground used for playing a sport',
      'спортивное поле',
    ),
    examples: [
      {
        english: 'There are two football pitches.',
        translations: L(
          '축구장이 두 개 있어요.',
          'Ikkita futbol maydoni bor.',
          'There are two football pitches.',
          'Там два футбольных поля.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɪtʃ/',
      ttsText: 'pitch',
    },
    tags: ['sports', 'places', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-vehicle-bus',
    english: 'bus',
    senseKey: 'large-road-passenger-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '버스',
      'avtobus',
      'a large road vehicle that carries passengers',
      'автобус',
    ),
    examples: [
      {
        english: 'There are many buses.',
        translations: L(
          '버스가 많이 있어요.',
          'Ko‘p avtobuslar bor.',
          'There are many buses.',
          'Там много автобусов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bʌs/',
      ttsText: 'bus',
    },
    tags: ['transport', 'plural-es'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-city',
    english: 'city',
    senseKey: 'large-town',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('도시', 'shahar', 'a large town', 'город'),
    examples: [
      {
        english: 'There are many cities in the USA.',
        translations: L(
          '미국에는 많은 도시가 있어요.',
          'AQShda ko‘p shaharlar bor.',
          'There are many cities in the USA.',
          'В США много городов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪti/',
      ttsText: 'city',
    },
    tags: ['places', 'plural-ies'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-president',
    english: 'president',
    senseKey: 'leader-of-country-or-organization',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대통령; 회장',
      'prezident',
      'the leader of a country or organization',
      'президент',
    ),
    examples: [
      {
        english: 'The USA has had many presidents.',
        translations: L(
          '미국에는 여러 대통령이 있었어요.',
          'AQShda ko‘plab prezidentlar bo‘lgan.',
          'The USA has had many presidents.',
          'В США было много президентов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprezɪdənt/',
      ttsText: 'president',
    },
    tags: ['people', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-neighbour',
    english: 'neighbour',
    senseKey: 'person-living-nearby',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('이웃', 'qo‘shni', 'a person who lives near you', 'сосед'),
    examples: [
      {
        english: 'Our neighbours are friendly.',
        translations: L(
          '우리 이웃들은 친절해요.',
          'Qo‘shnilarimiz mehribon.',
          'Our neighbours are friendly.',
          'Наши соседи дружелюбные.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈneɪbə/',
      ttsText: 'neighbour',
    },
    tags: ['people', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-child',
    english: 'child',
    senseKey: 'young-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아이', 'bola', 'a young person', 'ребёнок'),
    examples: [
      {
        english: 'The children are at school.',
        translations: L(
          '아이들은 학교에 있어요.',
          'Bolalar maktabda.',
          'The children are at school.',
          'Дети в школе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃaɪld/',
      ttsText: 'child',
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-adult',
    english: 'adult',
    senseKey: 'fully-grown-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '성인',
      'voyaga yetgan odam',
      'a fully grown person',
      'взрослый',
    ),
    examples: [
      {
        english: 'The adults are in the room.',
        translations: L(
          '성인들은 방 안에 있어요.',
          'Kattalar xonada.',
          'The adults are in the room.',
          'Взрослые находятся в комнате.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈædʌlt/',
      ttsText: 'adult',
    },
    tags: ['people', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-baby',
    english: 'baby',
    senseKey: 'very-young-child',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('아기', 'chaqaloq', 'a very young child', 'младенец'),
    examples: [
      {
        english: 'The babies are sleeping.',
        translations: L(
          '아기들이 자고 있어요.',
          'Chaqaloqlar uxlayapti.',
          'The babies are sleeping.',
          'Младенцы спят.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbeɪbi/',
      ttsText: 'baby',
    },
    tags: ['people', 'plural-ies'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-man',
    english: 'man',
    senseKey: 'adult-male-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('남자; 남성', 'erkak', 'an adult male person', 'мужчина'),
    examples: [
      {
        english: 'The men are at work.',
        translations: L(
          '남자들은 일하는 중이에요.',
          'Erkaklar ishda.',
          'The men are at work.',
          'Мужчины на работе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mæn/',
      ttsText: 'man',
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-woman',
    english: 'woman',
    senseKey: 'adult-female-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('여자; 여성', 'ayol', 'an adult female person', 'женщина'),
    examples: [
      {
        english: 'The women are teachers.',
        translations: L(
          '여자들은 선생님이에요.',
          'Ayollar o‘qituvchilar.',
          'The women are teachers.',
          'Женщины — учителя.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwʊmən/',
      ttsText: 'woman',
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-person',
    english: 'person',
    senseKey: 'human-individual',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('사람 한 명', 'odam', 'one human being', 'человек'),
    examples: [
      {
        english: 'One person is here.',
        translations: L(
          '한 사람이 여기 있어요.',
          'Bu yerda bir odam bor.',
          'One person is here.',
          'Здесь один человек.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɜːsən/',
      ttsText: 'person',
    },
    tags: ['people', 'irregular-plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-vehicle-car',
    english: 'car',
    senseKey: 'small-road-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자동차',
      'mashina',
      'a road vehicle with four wheels',
      'автомобиль',
    ),
    examples: [
      {
        english: 'There are many cars.',
        translations: L(
          '자동차가 많이 있어요.',
          'Ko‘p mashinalar bor.',
          'There are many cars.',
          'Там много машин.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kɑː/',
      ttsText: 'car',
    },
    tags: ['transport', 'plural'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-road',
    english: 'road',
    senseKey: 'route-for-vehicles',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도로; 길',
      'yo‘l',
      'a route for vehicles to travel on',
      'дорога',
    ),
    examples: [
      {
        english: 'The city has many roads.',
        translations: L(
          '그 도시에는 도로가 많아요.',
          'Shaharda ko‘p yo‘llar bor.',
          'The city has many roads.',
          'В городе много дорог.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rəʊd/',
      ttsText: 'road',
    },
    tags: ['places', 'transport', 'plural'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT1_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Positive and negative contractions
  // ===========================================================

  en_s2u1_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m from Russia.',
    audioText: 'I’m from Russia.',
    answerTranslation: L(
      '저는 러시아 출신이에요.',
      'Men Rossiyadanman.',
      'I’m from Russia.',
      'Я из России.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'positive'],
  },

  en_s2u1_n3_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ not Russian.',
    blankAnswers: ['’m'],
    options: ['’m', '’s', '’re', 'isn’t'],
    answer: '’m',
    answerTranslation: L(
      '저는 러시아인이 아니에요.',
      'Men rus emasman.',
      'I’m not Russian.',
      'Я не русский.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'im'],
  },

  en_s2u1_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He___ Australian.',
    blankAnswers: ['’s'],
    options: ['’s', '’re', '’m', 'aren’t'],
    answer: '’s',
    answerTranslation: L(
      '그는 호주인이에요.',
      'U avstraliyalik.',
      'He’s Australian.',
      'Он австралиец.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'hes'],
  },

  en_s2u1_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They___ from France.',
    blankAnswers: ['’re'],
    options: ['’re', '’s', '’m', 'isn’t'],
    answer: '’re',
    answerTranslation: L(
      '그들은 프랑스 출신이에요.',
      'Ular Fransiyadan.',
      'They’re from France.',
      'Они из Франции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'theyre'],
  },

  en_s2u1_n3_005_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['not', 'She’s', 'Spanish', 'is', 'are'],
    answer: 'She’s not Spanish',
    audioText: 'She’s not Spanish.',
    answerTranslation: L(
      '그녀는 스페인인이 아니에요.',
      'U ispaniyalik emas.',
      'She’s not Spanish.',
      'Она не испанка.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['contractions', 'negative'],
  },

  en_s2u1_n3_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is he married?' }],
    options: [
      'No, he isn’t.',
      'No, he aren’t.',
      'No, he’s not are.',
      'No, he don’t.',
    ],
    answer: 'No, he isn’t.',
    answerTranslation: L(
      '아니요, 결혼하지 않았어요.',
      'Yo‘q, u turmush qurmagan.',
      'No, he isn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'isnt'],
  },

  en_s2u1_n3_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are they French?' }],
    options: [
      'No, they aren’t.',
      'No, they isn’t.',
      'No, they’re not is.',
      'No, they doesn’t.',
    ],
    answer: 'No, they aren’t.',
    answerTranslation: L(
      '아니요, 프랑스인이 아니에요.',
      'Yo‘q, ular fransuz emas.',
      'No, they aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'arent'],
  },

  en_s2u1_n3_008_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'She ',
    sentenceSuffix: ' my friend.',
    answer: 'isn’t',
    answerTranslation: L(
      '그녀는 제 친구가 아니에요.',
      'U mening do‘stim emas.',
      'She isn’t my friend.',
      'Она не моя подруга.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the negative contraction isn’t.',
      acceptedAnswers: ['is not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['typing', 'isnt'],
  },

  en_s2u1_n3_009_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'We ',
    sentenceSuffix: ' married.',
    answer: 'aren’t',
    answerTranslation: L(
      '우리는 결혼한 사이가 아니에요.',
      'Biz turmush qurmagan.',
      'We aren’t married.',
      'Мы не женаты.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the negative contraction aren’t.',
      acceptedAnswers: ['are not'],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['typing', 'arent'],
  },

  en_s2u1_n3_010_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['British', 'not', 'We’re', 'is', 'are', 'Britain'],
    answer: 'We’re not British',
    answerTranslation: L(
      '우리는 영국인이 아니에요.',
      'Biz britaniyalik emasmiz.',
      'We’re not British.',
      'Мы не британцы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'negative'],
  },

  en_s2u1_n3_011_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He’s my brother.',
    audioText: 'He’s my brother.',
    answerI18n: L(
      '그는 제 형제예요',
      'U mening akam yoki ukam',
      'He’s my brother',
      'Он мой брат',
    ),
    options: ['He’s', 'my', 'brother', 'She’s', 'aren’t'],
    optionsI18n: {
      ko: ['그는', '제', '형제예요'],
      uz: ['U', 'mening', 'akam', 'yoki', 'ukam'],
      en: ['He’s', 'my', 'brother'],
      ru: ['Он', 'мой', 'брат'],
    },
    answerTranslation: L(
      '그는 제 형제예요.',
      'U mening akam yoki ukam.',
      'He’s my brother.',
      'Он мой брат.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['contractions', 'hes'],
  },

  en_s2u1_n3_012_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re my neighbours.',
    audioText: 'They’re my neighbours.',
    answerTranslation: L(
      '그들은 제 이웃이에요.',
      'Ular mening qo‘shnilarim.',
      'They’re my neighbours.',
      'Они мои соседи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'theyre'],
  },

  en_s2u1_n3_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It___ a very long name.',
    blankAnswers: ['’s'],
    options: ['’s', '’re', 'isn’t', 'aren’t'],
    answer: '’s',
    answerTranslation: L(
      '아주 긴 이름이에요.',
      'Bu juda uzun ism.',
      'It’s a very long name.',
      'Это очень длинное имя.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'its'],
  },

  en_s2u1_n3_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You___ very young.',
    blankAnswers: ['’re'],
    options: ['’re', '’s', 'isn’t', '’m'],
    answer: '’re',
    answerTranslation: L(
      '당신은 아주 어려요.',
      'Siz juda yoshsiz.',
      'You’re very young.',
      'Вы очень молоды.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'youre'],
  },

  en_s2u1_n3_015_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are you married?',
    options: ['not', 'I’m', 'No', 'isn’t', 'are'],
    answer: 'No I’m not',
    answerTranslation: L(
      '아니요, 결혼하지 않았어요.',
      'Yo‘q, turmush qurmaganman.',
      'No, I’m not.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['contractions', 'negative'],
  },

  en_s2u1_n3_016_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are your parents Spanish?' }],
    options: [
      'No, they aren’t.',
      'No, he isn’t.',
      'No, they isn’t.',
      'No, we isn’t.',
    ],
    answer: 'No, they aren’t.',
    answerTranslation: L(
      '아니요, 스페인인이 아니에요.',
      'Yo‘q, ular ispaniyalik emas.',
      'No, they aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'arent'],
  },

  en_s2u1_n3_017_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['not', 'It’s', 'name', 'a', 'title', 'is'],
    answer: 'It’s not a name',
    audioText: 'It’s not a name.',
    answerTranslation: L(
      '그것은 이름이 아니에요.',
      'Bu ism emas.',
      'It’s not a name.',
      'Это не имя.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['contractions', 'name'],
  },

  en_s2u1_n3_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She’s not married.',
    audioText: 'She’s not married.',
    answerTranslation: L(
      '그녀는 결혼하지 않았어요.',
      'U turmush qurmagan.',
      'She’s not married.',
      'Она не замужем.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'negative'],
  },

  en_s2u1_n3_019_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ my friends.',
    blankAnswers: ['aren’t'],
    options: ['aren’t', 'isn’t', 'am not', 'not'],
    answer: 'aren’t',
    answerTranslation: L(
      '그들은 제 친구들이 아니에요.',
      'Ular mening do‘stlarim emas.',
      'They aren’t my friends.',
      'Они не мои друзья.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'negative'],
  },

  en_s2u1_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He isn’t my brother.',
    audioText: 'He isn’t my brother.',
    answerTranslation: L(
      '그는 제 형제가 아니에요.',
      'U mening akam yoki ukam emas.',
      'He isn’t my brother.',
      'Он не мой брат.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['contractions', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Regular plurals
  // ===========================================================

  en_s2u1_n3_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'dictionary',
        native: 'lug‘at',
        nativeI18n: L('사전', 'lug‘at', 'dictionary', 'словарь'),
      },
      {
        text: 'bookshelf',
        native: 'kitob javoni',
        nativeI18n: L('책장', 'kitob javoni', 'bookshelf', 'книжная полка'),
      },
      {
        text: 'box',
        native: 'quti',
        nativeI18n: L('상자', 'quti', 'box', 'коробка'),
      },
      {
        text: 'brush',
        native: 'cho‘tka',
        nativeI18n: L('브러시', 'cho‘tka', 'brush', 'щётка'),
      },
      {
        text: 'bus',
        native: 'avtobus',
        nativeI18n: L('버스', 'avtobus', 'bus', 'автобус'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['plural', 'vocabulary'],
  },

  en_s2u1_n3_022_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'dictionary',
    choices: [
      { text: 'dictionary', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'brush', label: '🪥', emoji: '🪥', imageUrl: '' },
      { text: 'bus', label: '🚌', emoji: '🚌', imageUrl: '' },
      { text: 'box', label: '📦', emoji: '📦', imageUrl: '' },
    ],
    answerTranslation: L('사전', 'lug‘at', 'dictionary', 'словарь'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['dictionary', 'plural'],
  },

  en_s2u1_n3_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one car → two ___',
    blankAnswers: ['cars'],
    options: ['cars', 'cares', 'caries', 'car'],
    answer: 'cars',
    answerTranslation: L(
      '자동차 한 대 → 자동차 두 대',
      'bitta mashina → ikkita mashina',
      'one car → two cars',
      'одна машина → две машины',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['plural', 's'],
  },

  en_s2u1_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one road → two ___',
    blankAnswers: ['roads'],
    options: ['roads', 'roades', 'roadies', 'road'],
    answer: 'roads',
    answerTranslation: L(
      '도로 하나 → 도로 두 개',
      'bitta yo‘l → ikkita yo‘l',
      'one road → two roads',
      'одна дорога → две дороги',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['plural', 's'],
  },

  en_s2u1_n3_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one president → two ___',
    blankAnswers: ['presidents'],
    options: ['presidents', 'presidentes', 'presidenties', 'president'],
    answer: 'presidents',
    answerTranslation: L(
      '대통령 한 명 → 대통령 두 명',
      'bitta prezident → ikkita prezident',
      'one president → two presidents',
      'один президент → два президента',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['plural', 's'],
  },

  en_s2u1_n3_026_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'one neighbour → two ',
    sentenceSuffix: '',
    answer: 'neighbours',
    answerTranslation: L(
      '이웃 한 명 → 이웃 두 명',
      'bitta qo‘shni → ikkita qo‘shni',
      'one neighbour → two neighbours',
      'один сосед → два соседа',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The regular plural neighbours.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'typing'],
  },

  en_s2u1_n3_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'one adult → two ',
    sentenceSuffix: '',
    answer: 'adults',
    answerTranslation: L(
      '성인 한 명 → 성인 두 명',
      'bitta katta odam → ikkita katta odam',
      'one adult → two adults',
      'один взрослый → два взрослых',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The regular plural adults.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'typing'],
  },

  en_s2u1_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one box → two ___',
    blankAnswers: ['boxes'],
    options: ['boxes', 'boxs', 'boxies', 'box'],
    answer: 'boxes',
    answerTranslation: L(
      '상자 하나 → 상자 두 개',
      'bitta quti → ikkita quti',
      'one box → two boxes',
      'одна коробка → две коробки',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'es'],
  },

  en_s2u1_n3_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one brush → two ___',
    blankAnswers: ['brushes'],
    options: ['brushes', 'brushs', 'brushies', 'brush'],
    answer: 'brushes',
    answerTranslation: L(
      '브러시 하나 → 브러시 두 개',
      'bitta cho‘tka → ikkita cho‘tka',
      'one brush → two brushes',
      'одна щётка → две щётки',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'es'],
  },

  en_s2u1_n3_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one bus → two ___',
    blankAnswers: ['buses'],
    options: ['buses', 'buss', 'busies', 'bus'],
    answer: 'buses',
    answerTranslation: L(
      '버스 한 대 → 버스 두 대',
      'bitta avtobus → ikkita avtobus',
      'one bus → two buses',
      'один автобус → два автобуса',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'es'],
  },

  en_s2u1_n3_031_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['three', 'There', 'bookshelves', 'are', 'bookshelf', 'is'],
    answer: 'There are three bookshelves',
    audioText: 'There are three bookshelves.',
    answerTranslation: L(
      '책장이 세 개 있어요.',
      'Uchta kitob javoni bor.',
      'There are three bookshelves.',
      'Там три книжные полки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['plural', 'bookshelf'],
  },

  en_s2u1_n3_032_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['two', 'boxes', 'There', 'are', 'box', 'is'],
    answer: 'There are two boxes',
    answerTranslation: L(
      '상자가 두 개 있어요.',
      'Ikkita quti bor.',
      'There are two boxes.',
      'Там две коробки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'boxes'],
  },

  en_s2u1_n3_033_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'There are three brushes.',
    audioText: 'There are three brushes.',
    answerI18n: L(
      '브러시가 세 개 있어요',
      'Uchta cho‘tka bor',
      'There are three brushes',
      'Там три щётки',
    ),
    options: ['There', 'are', 'three', 'brushes', 'brush', 'is'],
    optionsI18n: {
      ko: ['브러시가', '세', '개', '있어요'],
      uz: ['Uchta', 'cho‘tka', 'bor'],
      en: ['There', 'are', 'three', 'brushes'],
      ru: ['Там', 'три', 'щётки'],
    },
    answerTranslation: L(
      '브러시가 세 개 있어요.',
      'Uchta cho‘tka bor.',
      'There are three brushes.',
      'Там три щётки.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['plural', 'brushes'],
  },

  en_s2u1_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are two football ___.',
    blankAnswers: ['pitches'],
    options: ['pitches', 'pitchs', 'pitch', 'pitchies'],
    answer: 'pitches',
    answerTranslation: L(
      '축구장이 두 개 있어요.',
      'Ikkita futbol maydoni bor.',
      'There are two football pitches.',
      'Там два футбольных поля.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'pitch'],
  },

  en_s2u1_n3_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'There are many buses in the city.',
    audioText: 'There are many buses in the city.',
    answerTranslation: L(
      '도시에 버스가 많이 있어요.',
      'Shaharda ko‘p avtobuslar bor.',
      'There are many buses in the city.',
      'В городе много автобусов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'buses'],
  },

  en_s2u1_n3_036_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '단수형과 복수형을 연결하세요.',
      'Birlik va ko‘plik shakllarini moslang.',
      'Match each singular noun with its plural.',
      'Соедините единственное и множественное число.',
    ),
    pairs: [
      {
        text: 'car',
        native: 'cars',
        nativeI18n: L('자동차들', 'mashinalar', 'cars', 'машины'),
      },
      {
        text: 'road',
        native: 'roads',
        nativeI18n: L('도로들', 'yo‘llar', 'roads', 'дороги'),
      },
      {
        text: 'brush',
        native: 'brushes',
        nativeI18n: L('브러시들', 'cho‘tkalar', 'brushes', 'щётки'),
      },
      {
        text: 'box',
        native: 'boxes',
        nativeI18n: L('상자들', 'qutilar', 'boxes', 'коробки'),
      },
      {
        text: 'bus',
        native: 'buses',
        nativeI18n: L('버스들', 'avtobuslar', 'buses', 'автобусы'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'matching'],
  },

  en_s2u1_n3_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'one bookshelf → two ',
    sentenceSuffix: '',
    answer: 'bookshelves',
    answerTranslation: L(
      '책장 하나 → 책장 두 개',
      'bitta kitob javoni → ikkita kitob javoni',
      'one bookshelf → two bookshelves',
      'одна книжная полка → две книжные полки',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The plural form bookshelves.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'bookshelf'],
  },

  en_s2u1_n3_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I have two dictionaries.',
    audioText: 'I have two dictionaries.',
    answerTranslation: L(
      '저는 사전이 두 권 있어요.',
      'Menda ikkita lug‘at bor.',
      'I have two dictionaries.',
      'У меня два словаря.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'dictionary'],
  },

  en_s2u1_n3_039_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are two boxes of ___.',
    blankAnswers: ['chocolates'],
    options: ['chocolates', 'chocolatees', 'chocolaties', 'chocolate'],
    answer: 'chocolates',
    answerTranslation: L(
      '초콜릿 상자가 두 개 있어요.',
      'Ikki quti shokolad bor.',
      'There are two boxes of chocolates.',
      'Есть две коробки шоколадных конфет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'chocolate'],
  },

  en_s2u1_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the plural of bus?' }],
    options: ['Buses.', 'Bus.', 'Buss.', 'Busies.'],
    answer: 'Buses.',
    answerTranslation: L('buses예요.', 'Buses.', 'Buses.', 'Buses.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'review'],
  },

  // ===========================================================
  // Lesson 3 · -s, -es and -ies
  // ===========================================================

  en_s2u1_n3_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one city → two ___',
    blankAnswers: ['cities'],
    options: ['cities', 'citys', 'cityes', 'city'],
    answer: 'cities',
    answerTranslation: L(
      '도시 하나 → 도시 두 개',
      'bitta shahar → ikkita shahar',
      'one city → two cities',
      'один город → два города',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'ies'],
  },

  en_s2u1_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one baby → two ___',
    blankAnswers: ['babies'],
    options: ['babies', 'babys', 'babyes', 'baby'],
    answer: 'babies',
    answerTranslation: L(
      '아기 한 명 → 아기 두 명',
      'bitta chaqaloq → ikkita chaqaloq',
      'one baby → two babies',
      'один младенец → два младенца',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'ies'],
  },

  en_s2u1_n3_043_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'city → ',
    sentenceSuffix: '',
    answer: 'cities',
    answerTranslation: L(
      'city의 복수형은 cities예요.',
      'City so‘zining ko‘pligi cities.',
      'The plural of city is cities.',
      'Множественное число city — cities.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Change consonant + y to -ies: cities.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'ies', 'typing'],
  },

  en_s2u1_n3_044_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'baby → ',
    sentenceSuffix: '',
    answer: 'babies',
    answerTranslation: L(
      'baby의 복수형은 babies예요.',
      'Baby so‘zining ko‘pligi babies.',
      'The plural of baby is babies.',
      'Множественное число baby — babies.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Change consonant + y to -ies: babies.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'ies', 'typing'],
  },

  en_s2u1_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are many ___ in the USA.',
    blankAnswers: ['cities'],
    options: ['cities', 'city', 'citys', 'cityes'],
    answer: 'cities',
    answerTranslation: L(
      '미국에는 도시가 많이 있어요.',
      'AQShda ko‘p shaharlar bor.',
      'There are many cities in the USA.',
      'В США много городов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'cities'],
  },

  en_s2u1_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Many ___ are born every year.',
    blankAnswers: ['babies'],
    options: ['babies', 'baby', 'babys', 'babyes'],
    answer: 'babies',
    answerTranslation: L(
      '매년 많은 아기가 태어나요.',
      'Har yili ko‘p chaqaloqlar tug‘iladi.',
      'Many babies are born every year.',
      'Каждый год рождается много детей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'babies'],
  },

  en_s2u1_n3_047_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '단수형과 올바른 복수형을 연결하세요.',
      'Birlik shaklini to‘g‘ri ko‘plik shakli bilan moslang.',
      'Match the singular nouns with the correct plurals.',
      'Соедините существительные с правильной формой множественного числа.',
    ),
    pairs: [
      {
        text: 'city',
        native: 'cities',
        nativeI18n: L('도시들', 'shaharlar', 'cities', 'города'),
      },
      {
        text: 'baby',
        native: 'babies',
        nativeI18n: L('아기들', 'chaqaloqlar', 'babies', 'младенцы'),
      },
      {
        text: 'bus',
        native: 'buses',
        nativeI18n: L('버스들', 'avtobuslar', 'buses', 'автобусы'),
      },
      {
        text: 'box',
        native: 'boxes',
        nativeI18n: L('상자들', 'qutilar', 'boxes', 'коробки'),
      },
      {
        text: 'brush',
        native: 'brushes',
        nativeI18n: L('브러시들', 'cho‘tkalar', 'brushes', 'щётки'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'spelling'],
  },

  en_s2u1_n3_048_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['many', 'cities', 'There', 'are', 'city', 'is'],
    answer: 'There are many cities',
    answerTranslation: L(
      '도시가 많이 있어요.',
      'Ko‘p shaharlar bor.',
      'There are many cities.',
      'Есть много городов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'cities'],
  },

  en_s2u1_n3_049_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['babies', 'The', 'young', 'are', 'baby', 'is'],
    answer: 'The babies are young',
    audioText: 'The babies are young.',
    answerTranslation: L(
      '아기들은 어려요.',
      'Chaqaloqlar yosh.',
      'The babies are young.',
      'Младенцы маленькие.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['plural', 'babies'],
  },

  en_s2u1_n3_050_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The cities are very big.',
    audioText: 'The cities are very big.',
    answerI18n: L(
      '그 도시들은 아주 커요',
      'Shaharlar juda katta',
      'The cities are very big',
      'Города очень большие',
    ),
    options: ['The', 'cities', 'are', 'very', 'big', 'city', 'is'],
    optionsI18n: {
      ko: ['그', '도시들은', '아주', '커요'],
      uz: ['Shaharlar', 'juda', 'katta'],
      en: ['The', 'cities', 'are', 'very', 'big'],
      ru: ['Города', 'очень', 'большие'],
    },
    answerTranslation: L(
      '그 도시들은 아주 커요.',
      'Shaharlar juda katta.',
      'The cities are very big.',
      'Города очень большие.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['plural', 'cities'],
  },

  en_s2u1_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'A noun ending in consonant + y often changes y to ___ in the plural.',
    blankAnswers: ['ies'],
    options: ['ies', 's', 'es', 'ys'],
    answer: 'ies',
    answerTranslation: L(
      '자음 + y로 끝나는 명사는 복수형에서 보통 y를 ies로 바꿔요.',
      'Undosh + y bilan tugagan otlarda ko‘pincha y o‘rniga ies keladi.',
      'A noun ending in consonant + y often changes y to ies in the plural.',
      'У существительных на согласную + y во множественном числе обычно используется ies.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'rule'],
  },

  en_s2u1_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'For many words ending in -s, -sh, -ch or -x, add ___.',
    blankAnswers: ['-es'],
    options: ['-es', '-ies', '-s', '-en'],
    answer: '-es',
    answerTranslation: L(
      '-s, -sh, -ch, -x로 끝나는 많은 단어에는 -es를 붙여요.',
      '-s, -sh, -ch yoki -x bilan tugagan ko‘p so‘zlarga -es qo‘shiladi.',
      'For many words ending in -s, -sh, -ch or -x, add -es.',
      'К словам на -s, -sh, -ch и -x часто добавляется -es.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'rule'],
  },

  en_s2u1_n3_053_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'brush → ',
    sentenceSuffix: '',
    answer: 'brushes',
    answerTranslation: L(
      'brush의 복수형은 brushes예요.',
      'Brush so‘zining ko‘pligi brushes.',
      'The plural of brush is brushes.',
      'Множественное число brush — brushes.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Add -es: brushes.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'es', 'typing'],
  },

  en_s2u1_n3_054_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'box → ',
    sentenceSuffix: '',
    answer: 'boxes',
    answerTranslation: L(
      'box의 복수형은 boxes예요.',
      'Box so‘zining ko‘pligi boxes.',
      'The plural of box is boxes.',
      'Множественное число box — boxes.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Add -es: boxes.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'es', 'typing'],
  },

  en_s2u1_n3_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the plural of city?' }],
    options: ['Cities.', 'Citys.', 'Cityes.', 'City.'],
    answer: 'Cities.',
    answerTranslation: L('cities예요.', 'Cities.', 'Cities.', 'Cities.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'cities'],
  },

  en_s2u1_n3_056_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the plural of baby?' }],
    options: ['Babies.', 'Babys.', 'Babyes.', 'Baby.'],
    answer: 'Babies.',
    answerTranslation: L('babies예요.', 'Babies.', 'Babies.', 'Babies.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'babies'],
  },

  en_s2u1_n3_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'There are many cities and roads.',
    audioText: 'There are many cities and roads.',
    answerTranslation: L(
      '도시와 도로가 많이 있어요.',
      'Ko‘p shaharlar va yo‘llar bor.',
      'There are many cities and roads.',
      'Есть много городов и дорог.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'review'],
  },

  en_s2u1_n3_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The city has many ___.',
    blankAnswers: ['buses'],
    options: ['buses', 'bus', 'busies', 'buss'],
    answer: 'buses',
    answerTranslation: L(
      '그 도시에는 버스가 많이 있어요.',
      'Shaharda ko‘p avtobuslar bor.',
      'The city has many buses.',
      'В городе много автобусов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'buses'],
  },

  en_s2u1_n3_059_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '복수형의 끝부분 규칙을 연결하세요.',
      'Ko‘plik shakli qoidalarini moslang.',
      'Match the plural forms with their patterns.',
      'Соедините формы множественного числа с их моделями.',
    ),
    pairs: [
      {
        text: 'car',
        native: 'cars',
        nativeI18n: L('-s', '-s', '-s', '-s'),
      },
      {
        text: 'bus',
        native: 'buses',
        nativeI18n: L('-es', '-es', '-es', '-es'),
      },
      {
        text: 'brush',
        native: 'brushes',
        nativeI18n: L('-es', '-es', '-es', '-es'),
      },
      {
        text: 'city',
        native: 'cities',
        nativeI18n: L('y → ies', 'y → ies', 'y → ies', 'y → ies'),
      },
      {
        text: 'baby',
        native: 'babies',
        nativeI18n: L('y → ies', 'y → ies', 'y → ies', 'y → ies'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'rules'],
  },

  en_s2u1_n3_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Cities, babies, boxes, brushes and buses.',
    audioText: 'Cities, babies, boxes, brushes and buses.',
    answerTranslation: L(
      'cities, babies, boxes, brushes, buses',
      'cities, babies, boxes, brushes va buses',
      'Cities, babies, boxes, brushes and buses.',
      'Cities, babies, boxes, brushes и buses.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['plural', 'pronunciation'],
  },

  // ===========================================================
  // Lesson 4 · Irregular plurals and review
  // ===========================================================

  en_s2u1_n3_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '단수형과 불규칙 복수형을 연결하세요.',
      'Birlik shaklini noto‘g‘ri ko‘plik shakli bilan moslang.',
      'Match each singular noun with its irregular plural.',
      'Соедините существительное с неправильной формой множественного числа.',
    ),
    pairs: [
      {
        text: 'child',
        native: 'children',
        nativeI18n: L('아이들', 'bolalar', 'children', 'дети'),
      },
      {
        text: 'man',
        native: 'men',
        nativeI18n: L('남자들', 'erkaklar', 'men', 'мужчины'),
      },
      {
        text: 'woman',
        native: 'women',
        nativeI18n: L('여자들', 'ayollar', 'women', 'женщины'),
      },
      {
        text: 'person',
        native: 'people',
        nativeI18n: L('사람들', 'odamlar', 'people', 'люди'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'matching'],
  },

  en_s2u1_n3_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one child → two ___',
    blankAnswers: ['children'],
    options: ['children', 'childs', 'childes', 'child'],
    answer: 'children',
    answerTranslation: L(
      '아이 한 명 → 아이 두 명',
      'bitta bola → ikkita bola',
      'one child → two children',
      'один ребёнок → двое детей',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'children'],
  },

  en_s2u1_n3_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one man → two ___',
    blankAnswers: ['men'],
    options: ['men', 'mans', 'manes', 'man'],
    answer: 'men',
    answerTranslation: L(
      '남자 한 명 → 남자 두 명',
      'bitta erkak → ikkita erkak',
      'one man → two men',
      'один мужчина → двое мужчин',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'men'],
  },

  en_s2u1_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one woman → two ___',
    blankAnswers: ['women'],
    options: ['women', 'womans', 'womanes', 'woman'],
    answer: 'women',
    answerTranslation: L(
      '여자 한 명 → 여자 두 명',
      'bitta ayol → ikkita ayol',
      'one woman → two women',
      'одна женщина → две женщины',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'women'],
  },

  en_s2u1_n3_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one person → two ___',
    blankAnswers: ['people'],
    options: ['people', 'persons', 'peoples', 'person'],
    answer: 'people',
    answerTranslation: L(
      '사람 한 명 → 사람 두 명',
      'bitta odam → ikkita odam',
      'one person → two people',
      'один человек → два человека',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'people'],
  },

  en_s2u1_n3_066_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'child → ',
    sentenceSuffix: '',
    answer: 'children',
    answerTranslation: L(
      'child의 복수형은 children이에요.',
      'Child so‘zining ko‘pligi children.',
      'The plural of child is children.',
      'Множественное число child — children.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The irregular plural children.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'typing'],
  },

  en_s2u1_n3_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'person → ',
    sentenceSuffix: '',
    answer: 'people',
    answerTranslation: L(
      'person의 일반적인 복수형은 people이에요.',
      'Person so‘zining odatiy ko‘pligi people.',
      'The usual plural of person is people.',
      'Обычное множественное число person — people.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The usual irregular plural people.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'typing'],
  },

  en_s2u1_n3_068_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['children', 'The', 'school', 'at', 'are', 'child', 'is'],
    answer: 'The children are at school',
    audioText: 'The children are at school.',
    answerTranslation: L(
      '아이들은 학교에 있어요.',
      'Bolalar maktabda.',
      'The children are at school.',
      'Дети в школе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['irregular-plural', 'children'],
  },

  en_s2u1_n3_069_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['people', 'There', 'many', 'are', 'person', 'is'],
    answer: 'There are many people',
    answerTranslation: L(
      '사람이 많이 있어요.',
      'Ko‘p odamlar bor.',
      'There are many people.',
      'Там много людей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'people'],
  },

  en_s2u1_n3_070_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The women are from Mexico.',
    audioText: 'The women are from Mexico.',
    answerI18n: L(
      '그 여자들은 멕시코 출신이에요',
      'Ayollar Meksikadan',
      'The women are from Mexico',
      'Женщины из Мексики',
    ),
    options: ['The', 'women', 'are', 'from', 'Mexico', 'woman', 'is'],
    optionsI18n: {
      ko: ['그', '여자들은', '멕시코', '출신이에요'],
      uz: ['Ayollar', 'Meksikadan'],
      en: ['The', 'women', 'are', 'from', 'Mexico'],
      ru: ['Женщины', 'из', 'Мексики'],
    },
    answerTranslation: L(
      '그 여자들은 멕시코 출신이에요.',
      'Ayollar Meksikadan.',
      'The women are from Mexico.',
      'Женщины из Мексики.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['irregular-plural', 'women'],
  },

  en_s2u1_n3_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The men are our neighbours.',
    audioText: 'The men are our neighbours.',
    answerTranslation: L(
      '그 남자들은 우리 이웃이에요.',
      'Erkaklar bizning qo‘shnilarimiz.',
      'The men are our neighbours.',
      'Эти мужчины — наши соседи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'men'],
  },

  en_s2u1_n3_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are many ___ in this city.',
    blankAnswers: ['people'],
    options: ['people', 'person', 'persons', 'peoples'],
    answer: 'people',
    answerTranslation: L(
      '이 도시에는 사람이 많이 있어요.',
      'Bu shaharda ko‘p odamlar bor.',
      'There are many people in this city.',
      'В этом городе много людей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'people'],
  },

  en_s2u1_n3_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ are playing football.',
    blankAnswers: ['children'],
    options: ['children', 'child', 'childs', 'childrens'],
    answer: 'children',
    answerTranslation: L(
      '아이들이 축구를 하고 있어요.',
      'Bolalar futbol o‘ynayapti.',
      'The children are playing football.',
      'Дети играют в футбол.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'children'],
  },

  en_s2u1_n3_074_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '단어와 올바른 복수형을 연결하세요.',
      'So‘zlarni to‘g‘ri ko‘plik shakllari bilan moslang.',
      'Match the nouns with their correct plural forms.',
      'Соедините существительные с правильными формами множественного числа.',
    ),
    pairs: [
      {
        text: 'dictionary',
        native: 'dictionaries',
        nativeI18n: L('사전들', 'lug‘atlar', 'dictionaries', 'словари'),
      },
      {
        text: 'bus',
        native: 'buses',
        nativeI18n: L('버스들', 'avtobuslar', 'buses', 'автобусы'),
      },
      {
        text: 'child',
        native: 'children',
        nativeI18n: L('아이들', 'bolalar', 'children', 'дети'),
      },
      {
        text: 'woman',
        native: 'women',
        nativeI18n: L('여자들', 'ayollar', 'women', 'женщины'),
      },
      {
        text: 'person',
        native: 'people',
        nativeI18n: L('사람들', 'odamlar', 'people', 'люди'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'review'],
  },

  en_s2u1_n3_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the plural of woman?' }],
    options: ['Women.', 'Womans.', 'Womens.', 'Woman.'],
    answer: 'Women.',
    answerTranslation: L('women이에요.', 'Women.', 'Women.', 'Women.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'women'],
  },

  en_s2u1_n3_076_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is the plural of man?' }],
    options: ['Men.', 'Mans.', 'Mens.', 'Man.'],
    answer: 'Men.',
    answerTranslation: L('men이에요.', 'Men.', 'Men.', 'Men.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'men'],
  },

  en_s2u1_n3_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'One person, two people.',
    audioText: 'One person, two people.',
    answerTranslation: L(
      '사람 한 명, 사람 두 명.',
      'Bitta odam, ikkita odam.',
      'One person, two people.',
      'Один человек, два человека.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['irregular-plural', 'people'],
  },

  en_s2u1_n3_078_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ and children are in the park.',
    blankAnswers: ['adults'],
    options: ['adults', 'adult', 'adultes', 'adulties'],
    answer: 'adults',
    answerTranslation: L(
      '성인들과 아이들이 공원에 있어요.',
      'Kattalar va bolalar bog‘da.',
      'The adults and children are in the park.',
      'Взрослые и дети находятся в парке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['plural', 'adults', 'children'],
  },

  en_s2u1_n3_079_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Are those people your neighbours?',
    options: ['Yes', 'they', 'are', 'people', 'is', 'neighbour'],
    answer: 'Yes they are',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, they are.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['plural', 'contractions', 'review'],
  },

  en_s2u1_n3_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Children, men, women and people are irregular plurals.',
    audioText: 'Children, men, women and people are irregular plurals.',
    answerTranslation: L(
      'children, men, women, people은 불규칙 복수형이에요.',
      'Children, men, women va people noto‘g‘ri ko‘plik shakllari.',
      'Children, men, women and people are irregular plurals.',
      'Children, men, women и people — неправильные формы множественного числа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['irregular-plural', 'unit-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE3 = {
  title: L(
    '축약형과 복수형',
    'Qisqartmalar va ko‘plik',
    'Contractions and plurals',
    'Сокращения и множественное число',
  ),
  section: 2,
  unit: 1,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '저는 러시아인이 아니에요',
        'Men rus emasman',
        'I’m not Russian',
        'Я не русский',
      ),
      description: L(
        'be동사의 긍정·부정 축약형을 듣고 구별하며 자연스럽게 사용해요.',
        'Be fe’lining tasdiq va inkor qisqartma shakllarini tinglab farqlaysiz va ishlatasiz.',
        'Recognize and use positive and negative contractions of be.',
        'Учимся распознавать и использовать утвердительные и отрицательные сокращённые формы be.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s2u1_n3_001_speaking',
        'en_s2u1_n3_002_fill_in_blank',
        'en_s2u1_n3_003_fill_in_blank',
        'en_s2u1_n3_004_fill_in_blank',
        'en_s2u1_n3_005_word_arrange',
        'en_s2u1_n3_006_dialog_complete',
        'en_s2u1_n3_007_dialog_complete',
        'en_s2u1_n3_008_type_answer',
        'en_s2u1_n3_009_type_answer',
        'en_s2u1_n3_010_translate_builder',
        'en_s2u1_n3_011_sentence_builder',
        'en_s2u1_n3_012_speaking',
        'en_s2u1_n3_013_fill_in_blank',
        'en_s2u1_n3_014_fill_in_blank',
        'en_s2u1_n3_015_reply_builder',
        'en_s2u1_n3_016_dialog_complete',
        'en_s2u1_n3_017_word_arrange',
        'en_s2u1_n3_018_speaking',
        'en_s2u1_n3_019_fill_in_blank',
        'en_s2u1_n3_020_speaking',
      ],
    },

    {
      title: L(
        '하나에서 여러 개로',
        'Bittadan ko‘plikka',
        'From one to many',
        'От одного ко многим',
      ),
      description: L(
        '-s와 -es를 사용하는 규칙 복수형과 교재의 사물·장소 어휘를 연습해요.',
        '-s va -es yordamida yasaladigan muntazam ko‘plik shakllarini mashq qilasiz.',
        'Practise regular plurals with -s and -es using the unit vocabulary.',
        'Практикуем правильное множественное число с -s и -es.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u1_n3_021_word_matching',
        'en_s2u1_n3_022_image_choice',
        'en_s2u1_n3_023_fill_in_blank',
        'en_s2u1_n3_024_fill_in_blank',
        'en_s2u1_n3_025_fill_in_blank',
        'en_s2u1_n3_026_type_answer',
        'en_s2u1_n3_027_type_answer',
        'en_s2u1_n3_028_fill_in_blank',
        'en_s2u1_n3_029_fill_in_blank',
        'en_s2u1_n3_030_fill_in_blank',
        'en_s2u1_n3_031_word_arrange',
        'en_s2u1_n3_032_translate_builder',
        'en_s2u1_n3_033_sentence_builder',
        'en_s2u1_n3_034_fill_in_blank',
        'en_s2u1_n3_035_speaking',
        'en_s2u1_n3_036_word_matching',
        'en_s2u1_n3_037_type_answer',
        'en_s2u1_n3_038_speaking',
        'en_s2u1_n3_039_fill_in_blank',
        'en_s2u1_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        'cities, babies, boxes',
        'cities, babies, boxes',
        'Cities, babies and boxes',
        'Cities, babies и boxes',
      ),
      description: L(
        '-s, -es, 자음+y → -ies 같은 복수형 철자 규칙을 구별해서 연습해요.',
        '-s, -es va undosh+y → -ies kabi ko‘plik imlo qoidalarini farqlab mashq qilasiz.',
        'Practise plural spelling patterns with -s, -es and consonant + y → -ies.',
        'Практикуем написание множественного числа с -s, -es и заменой y на -ies.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u1_n3_041_fill_in_blank',
        'en_s2u1_n3_042_fill_in_blank',
        'en_s2u1_n3_043_type_answer',
        'en_s2u1_n3_044_type_answer',
        'en_s2u1_n3_045_fill_in_blank',
        'en_s2u1_n3_046_fill_in_blank',
        'en_s2u1_n3_047_word_matching',
        'en_s2u1_n3_048_translate_builder',
        'en_s2u1_n3_049_word_arrange',
        'en_s2u1_n3_050_sentence_builder',
        'en_s2u1_n3_051_fill_in_blank',
        'en_s2u1_n3_052_fill_in_blank',
        'en_s2u1_n3_053_type_answer',
        'en_s2u1_n3_054_type_answer',
        'en_s2u1_n3_055_dialog_complete',
        'en_s2u1_n3_056_dialog_complete',
        'en_s2u1_n3_057_speaking',
        'en_s2u1_n3_058_fill_in_blank',
        'en_s2u1_n3_059_word_matching',
        'en_s2u1_n3_060_speaking',
      ],
    },

    {
      title: L(
        'children, men, women, people',
        'children, men, women, people',
        'Irregular plurals',
        'Неправильное множественное число',
      ),
      description: L(
        'child, man, woman, person의 불규칙 복수형을 익히고 Unit의 복수형 전체를 종합해서 연습해요.',
        'Child, man, woman va person so‘zlarining noto‘g‘ri ko‘plik shakllarini va barcha ko‘plik qoidalarini takrorlaysiz.',
        'Learn irregular plurals such as children, men, women and people and review all plural patterns.',
        'Изучаем неправильные формы children, men, women и people и повторяем множественное число.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u1_n3_061_word_matching',
        'en_s2u1_n3_062_fill_in_blank',
        'en_s2u1_n3_063_fill_in_blank',
        'en_s2u1_n3_064_fill_in_blank',
        'en_s2u1_n3_065_fill_in_blank',
        'en_s2u1_n3_066_type_answer',
        'en_s2u1_n3_067_type_answer',
        'en_s2u1_n3_068_word_arrange',
        'en_s2u1_n3_069_translate_builder',
        'en_s2u1_n3_070_sentence_builder',
        'en_s2u1_n3_071_speaking',
        'en_s2u1_n3_072_fill_in_blank',
        'en_s2u1_n3_073_fill_in_blank',
        'en_s2u1_n3_074_word_matching',
        'en_s2u1_n3_075_dialog_complete',
        'en_s2u1_n3_076_dialog_complete',
        'en_s2u1_n3_077_speaking',
        'en_s2u1_n3_078_fill_in_blank',
        'en_s2u1_n3_079_reply_builder',
        'en_s2u1_n3_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 1 · Node 4
// 1.4 Speaking and writing
//
// Coverage
// - asking for personal information
// - name / surname / nationality / job
// - email / address / website
// - checking you understand
// - asking someone to repeat
// - asking someone to spell a word/name
// - personal profiles
// - date / birth / home / skills / languages
// - business / management / restaurant
// - capital letters
// - writing a short personal profile
//
// IMPORTANT:
// *_WORDS에는 단어 하나만 등록.
// "email address", "date of birth", "personal profile",
// "business management" 같은 구는 headword로 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE4_WORDS = [
  {
    code: 'en-personal-name',
    english: 'name',
    senseKey: 'person-identifying-word',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('이름', 'ism', 'the word used to identify a person', 'имя'),
    examples: [
      {
        english: 'What’s your name?',
        translations: L(
          '이름이 뭐예요?',
          'Ismingiz nima?',
          'What’s your name?',
          'Как вас зовут?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/neɪm/',
      ttsText: 'name',
    },
    tags: ['personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-personal-surname',
    english: 'surname',
    senseKey: 'family-name',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('성', 'familiya', 'a family name', 'фамилия'),
    examples: [
      {
        english: 'What’s your surname?',
        translations: L(
          '성이 뭐예요?',
          'Familiyangiz nima?',
          'What’s your surname?',
          'Какая у вас фамилия?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɜːneɪm/',
      ttsText: 'surname',
    },
    tags: ['personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-work-job',
    english: 'job',
    senseKey: 'paid-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '직업; 일',
      'ish; kasb',
      'the work a person does',
      'работа; профессия',
    ),
    examples: [
      {
        english: 'What’s your job?',
        translations: L(
          '직업이 뭐예요?',
          'Kasbingiz nima?',
          'What’s your job?',
          'Кем вы работаете?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒɒb/',
      ttsText: 'job',
    },
    tags: ['personal-information', 'work'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-digital-email',
    english: 'email',
    senseKey: 'electronic-message-or-account',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이메일',
      'elektron pochta',
      'electronic mail',
      'электронная почта',
    ),
    examples: [
      {
        english: 'What’s your email address?',
        translations: L(
          '이메일 주소가 뭐예요?',
          'Elektron pochta manzilingiz nima?',
          'What’s your email address?',
          'Какой у вас адрес электронной почты?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈiːmeɪl/',
      ttsText: 'email',
    },
    tags: ['personal-information', 'digital'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-address',
    english: 'address',
    senseKey: 'location-or-contact-details',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '주소',
      'manzil',
      'details that show where someone lives or can be contacted',
      'адрес',
    ),
    examples: [
      {
        english: 'What’s your address?',
        translations: L(
          '주소가 뭐예요?',
          'Manzilingiz nima?',
          'What’s your address?',
          'Какой у вас адрес?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈdres/',
      ttsText: 'address',
    },
    tags: ['personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-digital-website',
    english: 'website',
    senseKey: 'collection-of-web-pages',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '웹사이트',
      'veb-sayt',
      'a collection of pages on the internet',
      'веб-сайт',
    ),
    examples: [
      {
        english: 'The website is for her business.',
        translations: L(
          '그 웹사이트는 그녀의 사업용이에요.',
          'Veb-sayt uning biznesi uchun.',
          'The website is for her business.',
          'Сайт предназначен для её бизнеса.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwebsaɪt/',
      ttsText: 'website',
    },
    tags: ['digital', 'personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-business',
    english: 'business',
    senseKey: 'commercial-activity',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사업; 비즈니스',
      'biznes',
      'commercial work or activity',
      'бизнес',
    ),
    examples: [
      {
        english: 'It is a business website.',
        translations: L(
          '그것은 비즈니스 웹사이트예요.',
          'Bu biznes veb-sayti.',
          'It is a business website.',
          'Это бизнес-сайт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪznəs/',
      ttsText: 'business',
    },
    tags: ['work', 'website'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-fun',
    english: 'fun',
    senseKey: 'enjoyment',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '재미; 즐거움',
      'zavq; ko‘ngilochar narsa',
      'enjoyment or entertainment',
      'веселье',
    ),
    examples: [
      {
        english: 'The website is for fun.',
        translations: L(
          '그 웹사이트는 재미를 위한 것이에요.',
          'Veb-sayt ko‘ngil ochish uchun.',
          'The website is for fun.',
          'Этот сайт создан для развлечения.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fʌn/',
      ttsText: 'fun',
    },
    tags: ['website'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-student',
    english: 'student',
    senseKey: 'person-who-studies',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '학생',
      'talaba; o‘quvchi',
      'a person who studies',
      'студент; учащийся',
    ),
    examples: [
      {
        english: 'I’m a student.',
        translations: L(
          '저는 학생이에요.',
          'Men talabaman.',
          'I’m a student.',
          'Я студент.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstjuːdənt/',
      ttsText: 'student',
    },
    tags: ['jobs', 'personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-receptionist',
    english: 'receptionist',
    senseKey: 'person-working-at-reception',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '접수원',
      'qabulxona xodimi',
      'a person who works at a reception desk',
      'администратор; сотрудник приёмной',
    ),
    examples: [
      {
        english: 'She is a receptionist.',
        translations: L(
          '그녀는 접수원이에요.',
          'U qabulxona xodimi.',
          'She is a receptionist.',
          'Она работает администратором.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsepʃənɪst/',
      ttsText: 'receptionist',
    },
    tags: ['jobs'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-journalist',
    english: 'journalist',
    senseKey: 'news-writer-or-reporter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기자',
      'jurnalist',
      'a person who writes or reports news',
      'журналист',
    ),
    examples: [
      {
        english: 'Her job is journalist.',
        translations: L(
          '그녀의 직업은 기자예요.',
          'U jurnalist.',
          'Her job is journalist.',
          'Она журналист.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒɜːnəlɪst/',
      ttsText: 'journalist',
    },
    tags: ['jobs'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-teacher',
    english: 'teacher',
    senseKey: 'person-who-teaches',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('교사; 선생님', 'o‘qituvchi', 'a person who teaches', 'учитель'),
    examples: [
      {
        english: 'She is a teacher.',
        translations: L(
          '그녀는 선생님이에요.',
          'U o‘qituvchi.',
          'She is a teacher.',
          'Она учитель.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtiːtʃə/',
      ttsText: 'teacher',
    },
    tags: ['jobs'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-college',
    english: 'college',
    senseKey: 'education-institution',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대학; 전문대학',
      'kollej',
      'an institution where people study after school',
      'колледж',
    ),
    examples: [
      {
        english: 'She studies at a college.',
        translations: L(
          '그녀는 대학에서 공부해요.',
          'U kollejda o‘qiydi.',
          'She studies at a college.',
          'Она учится в колледже.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒlɪdʒ/',
      ttsText: 'college',
    },
    tags: ['education'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-profile',
    english: 'profile',
    senseKey: 'short-description-of-person',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '프로필; 소개',
      'profil',
      'a short description containing information about a person',
      'профиль; краткая анкета',
    ),
    examples: [
      {
        english: 'Write a profile about yourself.',
        translations: L(
          '자신의 프로필을 작성하세요.',
          'O‘zingiz haqingizda profil yozing.',
          'Write a profile about yourself.',
          'Напишите профиль о себе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprəʊfaɪl/',
      ttsText: 'profile',
    },
    tags: ['writing', 'personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-date',
    english: 'date',
    senseKey: 'calendar-day',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('날짜', 'sana', 'a particular day of a month or year', 'дата'),
    examples: [
      {
        english: 'Write the date.',
        translations: L(
          '날짜를 쓰세요.',
          'Sanani yozing.',
          'Write the date.',
          'Напишите дату.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/deɪt/',
      ttsText: 'date',
    },
    tags: ['personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-birth',
    english: 'birth',
    senseKey: 'being-born',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '출생; 탄생',
      'tug‘ilish',
      'the time when a person is born',
      'рождение',
    ),
    examples: [
      {
        english: 'The form asks about birth.',
        translations: L(
          '그 양식은 출생에 관한 정보를 물어요.',
          'Shaklda tug‘ilish haqidagi ma’lumot so‘raladi.',
          'The form asks about birth.',
          'В анкете спрашивается информация о рождении.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɜːθ/',
      ttsText: 'birth',
    },
    tags: ['personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-home',
    english: 'home',
    senseKey: 'place-where-person-lives',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('집; 거주지', 'uy', 'the place where a person lives', 'дом'),
    examples: [
      {
        english: 'This is my home.',
        translations: L(
          '여기가 제 집이에요.',
          'Bu mening uyim.',
          'This is my home.',
          'Это мой дом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/həʊm/',
      ttsText: 'home',
    },
    tags: ['personal-information'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-skill',
    english: 'skill',
    senseKey: 'ability-to-do-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기술; 능력',
      'ko‘nikma',
      'an ability to do something well',
      'навык',
    ),
    examples: [
      {
        english: 'Cooking is one of his skills.',
        translations: L(
          '요리는 그의 기술 중 하나예요.',
          'Ovqat pishirish uning ko‘nikmalaridan biri.',
          'Cooking is one of his skills.',
          'Готовка — один из его навыков.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skɪl/',
      ttsText: 'skill',
    },
    tags: ['personal-information', 'abilities'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-activity-cooking',
    english: 'cooking',
    senseKey: 'preparing-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '요리',
      'ovqat pishirish',
      'the activity of preparing food',
      'готовка',
    ),
    examples: [
      {
        english: 'Cooking is one of his skills.',
        translations: L(
          '요리는 그의 기술 중 하나예요.',
          'Ovqat pishirish uning ko‘nikmalaridan biri.',
          'Cooking is one of his skills.',
          'Готовка — один из его навыков.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʊkɪŋ/',
      ttsText: 'cooking',
    },
    tags: ['skills'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-management',
    english: 'management',
    senseKey: 'organizing-business-or-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '경영; 관리',
      'boshqaruv',
      'the activity of organizing and controlling work or a business',
      'управление',
    ),
    examples: [
      {
        english: 'He studies management.',
        translations: L(
          '그는 경영을 공부해요.',
          'U boshqaruvni o‘rganadi.',
          'He studies management.',
          'Он изучает управление.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmænɪdʒmənt/',
      ttsText: 'management',
    },
    tags: ['skills', 'business'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-restaurant',
    english: 'restaurant',
    senseKey: 'place-serving-meals',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '식당; 레스토랑',
      'restoran',
      'a place where people buy and eat meals',
      'ресторан',
    ),
    examples: [
      {
        english: 'He owns a restaurant.',
        translations: L(
          '그는 식당을 운영해요.',
          'U restoranga egalik qiladi.',
          'He owns a restaurant.',
          'Он владеет рестораном.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrestrɒnt/',
      ttsText: 'restaurant',
    },
    tags: ['business', 'places'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-fluent',
    english: 'fluent',
    senseKey: 'able-to-speak-language-easily',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '유창한',
      'ravon',
      'able to speak a language easily and well',
      'свободно владеющий языком',
    ),
    examples: [
      {
        english: 'She is fluent in English.',
        translations: L(
          '그녀는 영어를 유창하게 해요.',
          'U ingliz tilida ravon gapiradi.',
          'She is fluent in English.',
          'Она свободно говорит по-английски.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfluːənt/',
      ttsText: 'fluent',
    },
    tags: ['languages', 'skills'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-unemployed',
    english: 'unemployed',
    senseKey: 'without-paid-job',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '실직한; 현재 직업이 없는',
      'ishsiz',
      'without a paid job',
      'безработный',
    ),
    examples: [
      {
        english: 'She is unemployed at the moment.',
        translations: L(
          '그녀는 현재 직업이 없어요.',
          'U hozir ishsiz.',
          'She is unemployed at the moment.',
          'Сейчас она безработная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌʌnɪmˈplɔɪd/',
      ttsText: 'unemployed',
    },
    tags: ['work', 'profile'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-art',
    english: 'art',
    senseKey: 'creative-visual-work',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '미술; 예술',
      'san’at',
      'creative work such as drawing or painting',
      'искусство',
    ),
    examples: [
      {
        english: 'Her website is for her art.',
        translations: L(
          '그녀의 웹사이트는 미술 작품을 위한 것이에요.',
          'Uning veb-sayti san’ati uchun.',
          'Her website is for her art.',
          'Её сайт посвящён её искусству.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɑːt/',
      ttsText: 'art',
    },
    tags: ['skills', 'profile'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-design',
    english: 'design',
    senseKey: 'planning-how-something-looks',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '디자인',
      'dizayn',
      'the activity of planning how something looks or works',
      'дизайн',
    ),
    examples: [
      {
        english: 'Design is one of her skills.',
        translations: L(
          '디자인은 그녀의 기술 중 하나예요.',
          'Dizayn uning ko‘nikmalaridan biri.',
          'Design is one of her skills.',
          'Дизайн — один из её навыков.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈzaɪn/',
      ttsText: 'design',
    },
    tags: ['skills', 'profile'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-capital',
    english: 'capital',
    senseKey: 'uppercase-letter',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '대문자의',
      'bosh harf',
      'written as a large uppercase letter',
      'заглавный',
    ),
    examples: [
      {
        english: 'Start names with a capital letter.',
        translations: L(
          '이름은 대문자로 시작하세요.',
          'Ismlarni bosh harf bilan boshlang.',
          'Start names with a capital letter.',
          'Начинайте имена с заглавной буквы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæpɪtəl/',
      ttsText: 'capital',
    },
    tags: ['writing'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-letter',
    english: 'letter',
    senseKey: 'alphabet-symbol',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('글자; 문자', 'harf', 'a symbol in an alphabet', 'буква'),
    examples: [
      {
        english: 'A is a letter.',
        translations: L(
          'A는 글자예요.',
          'A — harf.',
          'A is a letter.',
          'A — это буква.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈletə/',
      ttsText: 'letter',
    },
    tags: ['writing', 'spelling'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-repeat',
    english: 'repeat',
    senseKey: 'say-again',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '반복하다; 다시 말하다',
      'takrorlamoq',
      'to say or do something again',
      'повторять',
    ),
    examples: [
      {
        english: 'Please repeat that.',
        translations: L(
          '다시 말해 주세요.',
          'Iltimos, yana takrorlang.',
          'Please repeat that.',
          'Пожалуйста, повторите.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈpiːt/',
      ttsText: 'repeat',
    },
    tags: ['conversation', 'checking-understanding'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-spell',
    english: 'spell',
    senseKey: 'say-or-write-letters',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '철자를 말하다; 쓰다',
      'harflab aytmoq',
      'to say or write the letters of a word in order',
      'произносить или писать по буквам',
    ),
    examples: [
      {
        english: 'How do you spell your surname?',
        translations: L(
          '성을 어떻게 철자해요?',
          'Familiyangiz qanday harflanadi?',
          'How do you spell your surname?',
          'Как пишется ваша фамилия?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spel/',
      ttsText: 'spell',
    },
    tags: ['conversation', 'spelling'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT1_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Asking for personal information
  // ===========================================================

  en_s2u1_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your name?',
    audioText: 'What’s your name?',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your name?',
      'Как вас зовут?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'name'],
  },

  en_s2u1_n4_002_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your name?',
    options: ['My', 'name', 'is', 'Antonio', 'job', 'nationality'],
    answer: 'My name is Antonio',
    answerTranslation: L(
      '제 이름은 Antonio예요.',
      'Mening ismim Antonio.',
      'My name is Antonio.',
      'Меня зовут Антонио.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'name'],
  },

  en_s2u1_n4_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your surname?',
    audioText: 'What’s your surname?',
    answerTranslation: L(
      '성이 뭐예요?',
      'Familiyangiz nima?',
      'What’s your surname?',
      'Какая у вас фамилия?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'surname'],
  },

  en_s2u1_n4_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your ___?',
    blankAnswers: ['nationality'],
    options: ['nationality', 'country', 'language', 'website'],
    answer: 'nationality',
    answerTranslation: L(
      '국적이 뭐예요?',
      'Millatingiz nima?',
      'What’s your nationality?',
      'Какая у вас национальность?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'nationality'],
  },

  en_s2u1_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your nationality?' }],
    options: [
      'I’m Italian.',
      'I’m Italy.',
      'My nationality are Italy.',
      'I Italian from.',
    ],
    answer: 'I’m Italian.',
    answerTranslation: L(
      '저는 이탈리아인이에요.',
      'Men italiyalikman.',
      'I’m Italian.',
      'Я итальянец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'nationality'],
  },

  en_s2u1_n4_006_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your job?',
    audioText: 'What’s your job?',
    answerTranslation: L(
      '직업이 뭐예요?',
      'Kasbingiz nima?',
      'What’s your job?',
      'Кем вы работаете?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'job'],
  },

  en_s2u1_n4_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your job?' }],
    options: [
      'I’m a student.',
      'I’m a college.',
      'My student is job.',
      'I student are.',
    ],
    answer: 'I’m a student.',
    answerTranslation: L(
      '저는 학생이에요.',
      'Men talabaman.',
      'I’m a student.',
      'Я студент.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'job'],
  },

  en_s2u1_n4_008_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'student',
        native: 'talaba',
        nativeI18n: L('학생', 'talaba', 'student', 'студент'),
      },
      {
        text: 'teacher',
        native: 'o‘qituvchi',
        nativeI18n: L('선생님', 'o‘qituvchi', 'teacher', 'учитель'),
      },
      {
        text: 'journalist',
        native: 'jurnalist',
        nativeI18n: L('기자', 'jurnalist', 'journalist', 'журналист'),
      },
      {
        text: 'receptionist',
        native: 'qabulxona xodimi',
        nativeI18n: L(
          '접수원',
          'qabulxona xodimi',
          'receptionist',
          'администратор',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['jobs', 'personal-information'],
  },

  en_s2u1_n4_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your email address?',
    audioText: 'What’s your email address?',
    answerTranslation: L(
      '이메일 주소가 뭐예요?',
      'Elektron pochta manzilingiz nima?',
      'What’s your email address?',
      'Какой у вас адрес электронной почты?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'email'],
  },

  en_s2u1_n4_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your email ___?',
    blankAnswers: ['address'],
    options: ['address', 'job', 'name', 'business'],
    answer: 'address',
    answerTranslation: L(
      '이메일 주소가 뭐예요?',
      'Elektron pochta manzilingiz nima?',
      'What’s your email address?',
      'Какой у вас адрес электронной почты?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'address'],
  },

  en_s2u1_n4_011_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['your', 'What’s', 'address', 'email', 'job', 'is'],
    answer: 'What’s your email address',
    answerTranslation: L(
      '이메일 주소가 뭐예요?',
      'Elektron pochta manzilingiz nima?',
      'What’s your email address?',
      'Какой у вас адрес электронной почты?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'personal-information'],
  },

  en_s2u1_n4_012_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['your', 'What’s', 'job', 'name', 'is', 'you'],
    answer: 'What’s your job',
    audioText: 'What’s your job?',
    answerTranslation: L(
      '직업이 뭐예요?',
      'Kasbingiz nima?',
      'What’s your job?',
      'Кем вы работаете?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['personal-information', 'job'],
  },

  en_s2u1_n4_013_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your nationality?',
    options: ['Australian', 'I’m', 'Australia', 'job', 'my', 'is'],
    answer: 'I’m Australian',
    answerTranslation: L(
      '저는 호주인이에요.',
      'Men avstraliyalikman.',
      'I’m Australian.',
      'Я австралиец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['nationality', 'reply'],
  },

  en_s2u1_n4_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your email address?' }],
    options: [
      'It’s anna@example.com.',
      'I’m email.',
      'My address are email.',
      'It email job.',
    ],
    answer: 'It’s anna@example.com.',
    answerTranslation: L(
      'anna@example.com이에요.',
      'anna@example.com.',
      'It’s anna@example.com.',
      'anna@example.com.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'reply'],
  },

  en_s2u1_n4_015_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What’s your ',
    sentenceSuffix: '?',
    answer: 'surname',
    answerTranslation: L(
      '성이 뭐예요?',
      'Familiyangiz nima?',
      'What’s your surname?',
      'Какая у вас фамилия?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the word surname.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['typing', 'surname'],
  },

  en_s2u1_n4_016_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'What’s your ',
    sentenceSuffix: '?',
    answer: 'job',
    answerTranslation: L(
      '직업이 뭐예요?',
      'Kasbingiz nima?',
      'What’s your job?',
      'Кем вы работаете?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the word job.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['typing', 'job'],
  },

  en_s2u1_n4_017_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'What’s your nationality?',
    audioText: 'What’s your nationality?',
    answerI18n: L(
      '국적이 뭐예요',
      'Millatingiz nima',
      'What’s your nationality',
      'Какая у вас национальность',
    ),
    options: ['What’s', 'your', 'nationality', 'job', 'is', 'name'],
    optionsI18n: {
      ko: ['국적이', '뭐예요'],
      uz: ['Millatingiz', 'nima'],
      en: ['What’s', 'your', 'nationality'],
      ru: ['Какая', 'у', 'вас', 'национальность'],
    },
    answerTranslation: L(
      '국적이 뭐예요?',
      'Millatingiz nima?',
      'What’s your nationality?',
      'Какая у вас национальность?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['personal-information', 'nationality'],
  },

  en_s2u1_n4_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m a receptionist.',
    audioText: 'I’m a receptionist.',
    answerTranslation: L(
      '저는 접수원이에요.',
      'Men qabulxona xodimiman.',
      'I’m a receptionist.',
      'Я администратор.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['jobs', 'receptionist'],
  },

  en_s2u1_n4_019_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your job?' }],
    options: [
      'I’m a journalist.',
      'I’m journalism.',
      'My job journalist are.',
      'I nationality journalist.',
    ],
    answer: 'I’m a journalist.',
    answerTranslation: L(
      '저는 기자예요.',
      'Men jurnalistman.',
      'I’m a journalist.',
      'Я журналист.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['jobs', 'journalist'],
  },

  en_s2u1_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name is Antonio. I’m Italian.',
    audioText: 'My name is Antonio. I’m Italian.',
    answerTranslation: L(
      '제 이름은 Antonio예요. 저는 이탈리아인이에요.',
      'Mening ismim Antonio. Men italiyalikman.',
      'My name is Antonio. I’m Italian.',
      'Меня зовут Антонио. Я итальянец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['personal-information', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Checking you understand
  // ===========================================================

  en_s2u1_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Sorry, can you repeat that, please?',
    audioText: 'Sorry, can you repeat that, please?',
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요?',
      'Kechirasiz, yana takrorlay olasizmi?',
      'Sorry, can you repeat that, please?',
      'Извините, можете повторить, пожалуйста?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['checking-understanding', 'repeat'],
  },

  en_s2u1_n4_022_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'My surname is Oliveira.' }],
    options: [
      'Sorry, can you repeat that, please?',
      'What nationality Oliveira?',
      'I am Oliveira job.',
      'Yes, surname is.',
    ],
    answer: 'Sorry, can you repeat that, please?',
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요?',
      'Kechirasiz, yana takrorlay olasizmi?',
      'Sorry, can you repeat that, please?',
      'Извините, можете повторить, пожалуйста?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['checking-understanding', 'repeat'],
  },

  en_s2u1_n4_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do you spell that?',
    audioText: 'How do you spell that?',
    answerTranslation: L(
      '그걸 어떻게 철자해요?',
      'Bu qanday harflanadi?',
      'How do you spell that?',
      'Как это пишется?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['checking-understanding', 'spell'],
  },

  en_s2u1_n4_024_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['do', 'How', 'spell', 'you', 'that', 'repeat'],
    answer: 'How do you spell that',
    answerTranslation: L(
      '그걸 어떻게 철자해요?',
      'Bu qanday harflanadi?',
      'How do you spell that?',
      'Как это пишется?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spelling', 'checking-understanding'],
  },

  en_s2u1_n4_025_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['repeat', 'Can', 'that', 'you', 'please', 'spell'],
    answer: 'Can you repeat that please',
    audioText: 'Can you repeat that, please?',
    answerTranslation: L(
      '그걸 다시 말해 주시겠어요?',
      'Buni yana takrorlay olasizmi?',
      'Can you repeat that, please?',
      'Можете повторить это, пожалуйста?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['repeat', 'word-order'],
  },

  en_s2u1_n4_026_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Can you ',
    sentenceSuffix: ' that, please?',
    answer: 'repeat',
    answerTranslation: L(
      '그걸 다시 말해 주시겠어요?',
      'Buni yana takrorlay olasizmi?',
      'Can you repeat that, please?',
      'Можете повторить это, пожалуйста?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use repeat when asking someone to say something again.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['repeat', 'typing'],
  },

  en_s2u1_n4_027_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'How do you ',
    sentenceSuffix: ' your surname?',
    answer: 'spell',
    answerTranslation: L(
      '성을 어떻게 철자해요?',
      'Familiyangiz qanday harflanadi?',
      'How do you spell your surname?',
      'Как пишется ваша фамилия?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use spell when asking about letters.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spell', 'typing'],
  },

  en_s2u1_n4_028_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'My surname is Russo.',
    options: ['do', 'How', 'spell', 'you', 'that', 'email'],
    answer: 'How do you spell that',
    answerTranslation: L(
      '그걸 어떻게 철자해요?',
      'Bu qanday harflanadi?',
      'How do you spell that?',
      'Как это пишется?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spell', 'reply'],
  },

  en_s2u1_n4_029_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'R-U-S-S-O.' }],
    options: [
      'Thank you.',
      'What’s your job?',
      'I’m Russo.',
      'Nationality, please?',
    ],
    answer: 'Thank you.',
    answerTranslation: L('감사합니다.', 'Rahmat.', 'Thank you.', 'Спасибо.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['spelling', 'conversation'],
  },

  en_s2u1_n4_030_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Could you spell your surname?',
    audioText: 'Could you spell your surname?',
    answerTranslation: L(
      '성을 철자해 주시겠어요?',
      'Familiyangizni harflab ayta olasizmi?',
      'Could you spell your surname?',
      'Не могли бы вы произнести вашу фамилию по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spell', 'surname'],
  },

  en_s2u1_n4_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Sorry, can you ___ that, please?',
    blankAnswers: ['repeat'],
    options: ['repeat', 'spell', 'job', 'address'],
    answer: 'repeat',
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요?',
      'Kechirasiz, yana takrorlay olasizmi?',
      'Sorry, can you repeat that, please?',
      'Извините, можете повторить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['repeat'],
  },

  en_s2u1_n4_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How do you ___ Oliveira?',
    blankAnswers: ['spell'],
    options: ['spell', 'repeat', 'address', 'website'],
    answer: 'spell',
    answerTranslation: L(
      'Oliveira를 어떻게 철자해요?',
      'Oliveira qanday harflanadi?',
      'How do you spell Oliveira?',
      'Как пишется Oliveira?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spell'],
  },

  en_s2u1_n4_033_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Sorry, can you repeat that?',
    audioText: 'Sorry, can you repeat that?',
    answerI18n: L(
      '죄송하지만 다시 말해 주시겠어요',
      'Kechirasiz yana takrorlay olasizmi',
      'Sorry, can you repeat that',
      'Извините, можете повторить',
    ),
    options: ['Sorry', 'can', 'you', 'repeat', 'that', 'spell'],
    optionsI18n: {
      ko: ['죄송하지만', '다시', '말해', '주시겠어요'],
      uz: ['Kechirasiz', 'yana', 'takrorlay', 'olasizmi'],
      en: ['Sorry', 'can', 'you', 'repeat', 'that'],
      ru: ['Извините', 'можете', 'повторить'],
    },
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요?',
      'Kechirasiz, yana takrorlay olasizmi?',
      'Sorry, can you repeat that?',
      'Извините, можете повторить?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['repeat', 'listening'],
  },

  en_s2u1_n4_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'My email is a.russo@example.com.' }],
    options: [
      'Sorry, can you repeat that, please?',
      'I’m Italian.',
      'My job is student.',
      'It is a website.',
    ],
    answer: 'Sorry, can you repeat that, please?',
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요?',
      'Kechirasiz, yana takrorlay olasizmi?',
      'Sorry, can you repeat that, please?',
      'Извините, можете повторить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'repeat'],
  },

  en_s2u1_n4_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'R-U-S-S-O.',
    audioText: 'R, U, S, S, O.',
    answerTranslation: L(
      'R-U-S-S-O.',
      'R-U-S-S-O.',
      'R-U-S-S-O.',
      'R-U-S-S-O.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['spelling', 'surname'],
  },

  en_s2u1_n4_036_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do you spell your surname?' }],
    options: ['R-U-S-S-O.', 'I’m Italian.', 'It’s my job.', 'I’m a student.'],
    answer: 'R-U-S-S-O.',
    answerTranslation: L(
      'R-U-S-S-O.',
      'R-U-S-S-O.',
      'R-U-S-S-O.',
      'R-U-S-S-O.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spelling', 'surname'],
  },

  en_s2u1_n4_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['spell', 'Could', 'surname', 'your', 'you', 'repeat'],
    answer: 'Could you spell your surname',
    answerTranslation: L(
      '성을 철자해 주시겠어요?',
      'Familiyangizni harflab ayta olasizmi?',
      'Could you spell your surname?',
      'Не могли бы вы произнести фамилию по буквам?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['spell', 'surname'],
  },

  en_s2u1_n4_038_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'repeat',
        native: 'takrorlamoq',
        nativeI18n: L('다시 말하다', 'takrorlamoq', 'repeat', 'повторить'),
      },
      {
        text: 'spell',
        native: 'harflab aytmoq',
        nativeI18n: L(
          '철자를 말하다',
          'harflab aytmoq',
          'spell',
          'произнести по буквам',
        ),
      },
      {
        text: 'letter',
        native: 'harf',
        nativeI18n: L('글자', 'harf', 'letter', 'буква'),
      },
      {
        text: 'surname',
        native: 'familiya',
        nativeI18n: L('성', 'familiya', 'surname', 'фамилия'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['checking-understanding', 'spelling'],
  },

  en_s2u1_n4_039_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Sorry, can you repeat your email address?',
    options: [
      'Yes',
      'it’s',
      'anna@example.com',
      'job',
      'surname',
      'nationality',
    ],
    answer: 'Yes it’s anna@example.com',
    answerTranslation: L(
      '네, anna@example.com이에요.',
      'Ha, anna@example.com.',
      'Yes, it’s anna@example.com.',
      'Да, anna@example.com.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['email', 'repeat'],
  },

  en_s2u1_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Sorry, can you repeat that? How do you spell it?',
    audioText: 'Sorry, can you repeat that? How do you spell it?',
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요? 철자가 어떻게 돼요?',
      'Kechirasiz, yana takrorlay olasizmi? Qanday harflanadi?',
      'Sorry, can you repeat that? How do you spell it?',
      'Извините, можете повторить? Как это пишется?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['checking-understanding', 'review'],
  },

  // ===========================================================
  // Lesson 3 · A personal profile
  // ===========================================================

  en_s2u1_n4_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'profile',
        native: 'profil',
        nativeI18n: L('프로필', 'profil', 'profile', 'профиль'),
      },
      {
        text: 'date',
        native: 'sana',
        nativeI18n: L('날짜', 'sana', 'date', 'дата'),
      },
      {
        text: 'birth',
        native: 'tug‘ilish',
        nativeI18n: L('출생', 'tug‘ilish', 'birth', 'рождение'),
      },
      {
        text: 'skill',
        native: 'ko‘nikma',
        nativeI18n: L('기술', 'ko‘nikma', 'skill', 'навык'),
      },
      {
        text: 'home',
        native: 'uy',
        nativeI18n: L('집', 'uy', 'home', 'дом'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['profile', 'personal-information'],
  },

  en_s2u1_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Name, nationality and job are personal ___.',
    blankAnswers: ['information'],
    options: ['information', 'business', 'website', 'management'],
    answer: 'information',
    answerTranslation: L(
      '이름, 국적, 직업은 개인정보예요.',
      'Ism, millat va kasb shaxsiy ma’lumotlardir.',
      'Name, nationality and job are personal information.',
      'Имя, национальность и профессия — личная информация.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'personal-information'],
  },

  en_s2u1_n4_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Cooking is a ___.',
    blankAnswers: ['skill'],
    options: ['skill', 'job', 'address', 'nationality'],
    answer: 'skill',
    answerTranslation: L(
      '요리는 기술이에요.',
      'Ovqat pishirish ko‘nikma.',
      'Cooking is a skill.',
      'Готовка — это навык.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'cooking'],
  },

  en_s2u1_n4_044_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cooking',
        native: 'ovqat pishirish',
        nativeI18n: L('요리', 'ovqat pishirish', 'cooking', 'готовка'),
      },
      {
        text: 'business',
        native: 'biznes',
        nativeI18n: L('사업', 'biznes', 'business', 'бизнес'),
      },
      {
        text: 'management',
        native: 'boshqaruv',
        nativeI18n: L('경영', 'boshqaruv', 'management', 'управление'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['profile', 'skills'],
  },

  en_s2u1_n4_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Antonio is Italian.',
    audioText: 'Antonio is Italian.',
    answerTranslation: L(
      'Antonio는 이탈리아인이에요.',
      'Antonio italiyalik.',
      'Antonio is Italian.',
      'Антонио — итальянец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'nationality'],
  },

  en_s2u1_n4_046_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s Antonio’s nationality?' }],
    options: [
      'He’s Italian.',
      'He’s Italy.',
      'His nationality restaurant.',
      'He are Italian.',
    ],
    answer: 'He’s Italian.',
    answerTranslation: L(
      '그는 이탈리아인이에요.',
      'U italiyalik.',
      'He’s Italian.',
      'Он итальянец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'nationality'],
  },

  en_s2u1_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Antonio’s job is restaurant ___.',
    blankAnswers: ['owner'],
    options: ['owner', 'student', 'nationality', 'address'],
    answer: 'owner',
    answerTranslation: L(
      'Antonio의 직업은 식당 주인이에요.',
      'Antonio restoran egasi.',
      'Antonio’s job is restaurant owner.',
      'Антонио — владелец ресторана.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'job'],
  },

  en_s2u1_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'One of Antonio’s skills is ___.',
    blankAnswers: ['cooking'],
    options: ['cooking', 'Italian', 'restaurant', 'address'],
    answer: 'cooking',
    answerTranslation: L(
      'Antonio의 기술 중 하나는 요리예요.',
      'Antonioning ko‘nikmalaridan biri ovqat pishirish.',
      'One of Antonio’s skills is cooking.',
      'Один из навыков Антонио — готовка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['profile', 'cooking'],
  },

  en_s2u1_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Antonio also has business ___ skills.',
    blankAnswers: ['management'],
    options: ['management', 'nationality', 'address', 'email'],
    answer: 'management',
    answerTranslation: L(
      'Antonio는 경영 기술도 있어요.',
      'Antonioning biznes boshqaruvi ko‘nikmalari ham bor.',
      'Antonio also has business management skills.',
      'У Антонио также есть навыки управления бизнесом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['profile', 'management'],
  },

  en_s2u1_n4_050_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He is fluent in English and Italian.',
    audioText: 'He is fluent in English and Italian.',
    answerTranslation: L(
      '그는 영어와 이탈리아어를 유창하게 해요.',
      'U ingliz va italyan tillarida ravon gapiradi.',
      'He is fluent in English and Italian.',
      'Он свободно говорит по-английски и по-итальянски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'fluent', 'languages'],
  },

  en_s2u1_n4_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'If you speak a language very well, you are ___.',
    blankAnswers: ['fluent'],
    options: ['fluent', 'unemployed', 'capital', 'business'],
    answer: 'fluent',
    answerTranslation: L(
      '언어를 아주 잘하면 유창한 거예요.',
      'Tilni juda yaxshi gapirsangiz, siz ravon gapirasiz.',
      'If you speak a language very well, you are fluent.',
      'Если вы хорошо говорите на языке, вы говорите свободно.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['fluent', 'languages'],
  },

  en_s2u1_n4_052_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'art',
        native: 'san’at',
        nativeI18n: L('예술', 'san’at', 'art', 'искусство'),
      },
      {
        text: 'design',
        native: 'dizayn',
        nativeI18n: L('디자인', 'dizayn', 'design', 'дизайн'),
      },
      {
        text: 'fluent',
        native: 'ravon',
        nativeI18n: L('유창한', 'ravon', 'fluent', 'свободно'),
      },
      {
        text: 'unemployed',
        native: 'ishsiz',
        nativeI18n: L('직업이 없는', 'ishsiz', 'unemployed', 'безработный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['profile', 'vocabulary'],
  },

  en_s2u1_n4_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Cristina is ___ at the moment.',
    blankAnswers: ['unemployed'],
    options: ['unemployed', 'nationality', 'website', 'capital'],
    answer: 'unemployed',
    answerTranslation: L(
      'Cristina는 현재 직업이 없어요.',
      'Cristina hozir ishsiz.',
      'Cristina is unemployed at the moment.',
      'Сейчас Кристина безработная.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['profile', 'unemployed'],
  },

  en_s2u1_n4_054_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['fluent', 'English', 'in', 'She', 'is', 'job'],
    answer: 'She is fluent in English',
    answerTranslation: L(
      '그녀는 영어를 유창하게 해요.',
      'U ingliz tilida ravon gapiradi.',
      'She is fluent in English.',
      'Она свободно говорит по-английски.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'fluent'],
  },

  en_s2u1_n4_055_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['for', 'website', 'restaurant', 'The', 'his', 'is', 'her'],
    answer: 'The website is for his restaurant',
    audioText: 'The website is for his restaurant.',
    answerTranslation: L(
      '그 웹사이트는 그의 식당을 위한 것이에요.',
      'Veb-sayt uning restorani uchun.',
      'The website is for his restaurant.',
      'Сайт предназначен для его ресторана.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['website', 'restaurant', 'profile'],
  },

  en_s2u1_n4_056_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Her skills are art and design.',
    audioText: 'Her skills are art and design.',
    answerI18n: L(
      '그녀의 기술은 미술과 디자인이에요',
      'Uning ko‘nikmalari san’at va dizayn',
      'Her skills are art and design',
      'Её навыки — искусство и дизайн',
    ),
    options: ['Her', 'skills', 'are', 'art', 'and', 'design', 'job'],
    optionsI18n: {
      ko: ['그녀의', '기술은', '미술과', '디자인이에요'],
      uz: ['Uning', 'ko‘nikmalari', 'san’at', 'va', 'dizayn'],
      en: ['Her', 'skills', 'are', 'art', 'and', 'design'],
      ru: ['Её', 'навыки', 'искусство', 'и', 'дизайн'],
    },
    answerTranslation: L(
      '그녀의 기술은 미술과 디자인이에요.',
      'Uning ko‘nikmalari san’at va dizayn.',
      'Her skills are art and design.',
      'Её навыки — искусство и дизайн.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['profile', 'skills'],
  },

  en_s2u1_n4_057_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What are your skills?' }],
    options: [
      'Cooking and business management.',
      'Italian nationality.',
      'My address is Toronto.',
      'I am a website.',
    ],
    answer: 'Cooking and business management.',
    answerTranslation: L(
      '요리와 경영이에요.',
      'Ovqat pishirish va biznes boshqaruvi.',
      'Cooking and business management.',
      'Готовка и управление бизнесом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'skills'],
  },

  en_s2u1_n4_058_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What languages do you speak?',
    options: ['English', 'and', 'Italian', 'speak', 'I', 'job'],
    answer: 'I speak English and Italian',
    answerTranslation: L(
      '저는 영어와 이탈리아어를 해요.',
      'Men ingliz va italyan tillarida gapiraman.',
      'I speak English and Italian.',
      'Я говорю по-английски и по-итальянски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'languages'],
  },

  en_s2u1_n4_059_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What type of website is it?' }],
    options: [
      'It’s a business website.',
      'It’s Italian.',
      'It’s a nationality.',
      'It’s an email.',
    ],
    answer: 'It’s a business website.',
    answerTranslation: L(
      '비즈니스 웹사이트예요.',
      'Bu biznes veb-sayti.',
      'It’s a business website.',
      'Это бизнес-сайт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['website', 'business'],
  },

  en_s2u1_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My profile has my name, nationality, job and skills.',
    audioText: 'My profile has my name, nationality, job and skills.',
    answerTranslation: L(
      '제 프로필에는 이름, 국적, 직업, 기술이 있어요.',
      'Profilimda ismim, millatim, kasbim va ko‘nikmalarim bor.',
      'My profile has my name, nationality, job and skills.',
      'В моём профиле есть имя, национальность, работа и навыки.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Capital letters and writing a profile
  // ===========================================================

  en_s2u1_n4_061_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'capital',
        native: 'bosh harf',
        nativeI18n: L('대문자', 'bosh harf', 'capital', 'заглавный'),
      },
      {
        text: 'letter',
        native: 'harf',
        nativeI18n: L('글자', 'harf', 'letter', 'буква'),
      },
      {
        text: 'profile',
        native: 'profil',
        nativeI18n: L('프로필', 'profil', 'profile', 'профиль'),
      },
      {
        text: 'address',
        native: 'manzil',
        nativeI18n: L('주소', 'manzil', 'address', 'адрес'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['writing', 'capital-letters'],
  },

  en_s2u1_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People’s names begin with a ___ letter.',
    blankAnswers: ['capital'],
    options: ['capital', 'small', 'email', 'business'],
    answer: 'capital',
    answerTranslation: L(
      '사람 이름은 대문자로 시작해요.',
      'Odamlarning ismi bosh harf bilan boshlanadi.',
      'People’s names begin with a capital letter.',
      'Имена людей начинаются с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['capital-letters', 'names'],
  },

  en_s2u1_n4_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Nationalities begin with a ___ letter.',
    blankAnswers: ['capital'],
    options: ['capital', 'small', 'job', 'profile'],
    answer: 'capital',
    answerTranslation: L(
      '국적을 나타내는 말은 대문자로 시작해요.',
      'Millat nomlari bosh harf bilan boshlanadi.',
      'Nationalities begin with a capital letter.',
      'Названия национальностей начинаются с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['capital-letters', 'nationalities'],
  },

  en_s2u1_n4_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Language names begin with a ___ letter.',
    blankAnswers: ['capital'],
    options: ['capital', 'small', 'website', 'skill'],
    answer: 'capital',
    answerTranslation: L(
      '언어 이름은 대문자로 시작해요.',
      'Til nomlari bosh harf bilan boshlanadi.',
      'Language names begin with a capital letter.',
      'Названия языков начинаются с заглавной буквы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['capital-letters', 'languages'],
  },

  en_s2u1_n4_065_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'My parents are from ',
    sentenceSuffix: '.',
    answer: 'Mexico',
    answerTranslation: L(
      '제 부모님은 멕시코 출신이에요.',
      'Ota-onam Meksikadan.',
      'My parents are from Mexico.',
      'Мои родители из Мексики.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write the country name Mexico with a capital M.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['capital-letters', 'country'],
  },

  en_s2u1_n4_066_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I’m fluent in ',
    sentenceSuffix: '.',
    answer: 'Spanish',
    answerTranslation: L(
      '저는 스페인어를 유창하게 해요.',
      'Men ispan tilida ravon gapiraman.',
      'I’m fluent in Spanish.',
      'Я свободно говорю по-испански.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write Spanish with a capital S.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['capital-letters', 'language'],
  },

  en_s2u1_n4_067_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I speak Spanish and ',
    sentenceSuffix: '.',
    answer: 'English',
    answerTranslation: L(
      '저는 스페인어와 영어를 해요.',
      'Men ispan va ingliz tillarida gapiraman.',
      'I speak Spanish and English.',
      'Я говорю по-испански и по-английски.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Write English with a capital E.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['capital-letters', 'language'],
  },

  en_s2u1_n4_068_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['name', 'Maria', 'My', 'is', 'mexico', 'are'],
    answer: 'My name is Maria',
    answerTranslation: L(
      '제 이름은 Maria예요.',
      'Mening ismim Maria.',
      'My name is Maria.',
      'Меня зовут Мария.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'name'],
  },

  en_s2u1_n4_069_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My parents are Mexican.',
    audioText: 'My parents are Mexican.',
    answerI18n: L(
      '제 부모님은 멕시코인이에요',
      'Ota-onam meksikalik',
      'My parents are Mexican',
      'Мои родители — мексиканцы',
    ),
    options: ['My', 'parents', 'are', 'Mexican', 'Mexico', 'is'],
    optionsI18n: {
      ko: ['제', '부모님은', '멕시코인이에요'],
      uz: ['Ota-onam', 'meksikalik'],
      en: ['My', 'parents', 'are', 'Mexican'],
      ru: ['Мои', 'родители', 'мексиканцы'],
    },
    answerTranslation: L(
      '제 부모님은 멕시코인이에요.',
      'Ota-onam meksikalik.',
      'My parents are Mexican.',
      'Мои родители — мексиканцы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['profile', 'nationality'],
  },

  en_s2u1_n4_070_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['American', 'I’m', 'but', 'parents', 'Mexican', 'my', 'is'],
    answer: 'I’m American but my parents are Mexican',
    audioText: 'I’m American, but my parents are Mexican.',
    answerTranslation: L(
      '저는 미국인이지만 부모님은 멕시코인이에요.',
      'Men amerikalikman, lekin ota-onam meksikalik.',
      'I’m American, but my parents are Mexican.',
      'Я американка, но мои родители — мексиканцы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['profile', 'nationality'],
  },

  en_s2u1_n4_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m fluent in Spanish and English.',
    audioText: 'I’m fluent in Spanish and English.',
    answerTranslation: L(
      '저는 스페인어와 영어를 유창하게 해요.',
      'Men ispan va ingliz tillarida ravon gapiraman.',
      'I’m fluent in Spanish and English.',
      'Я свободно говорю по-испански и по-английски.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'languages'],
  },

  en_s2u1_n4_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where do you live?' }],
    options: [
      'I live in Los Angeles.',
      'I’m Los Angeles.',
      'My job is Los Angeles.',
      'I live American.',
    ],
    answer: 'I live in Los Angeles.',
    answerTranslation: L(
      '저는 로스앤젤레스에 살아요.',
      'Men Los-Anjelesda yashayman.',
      'I live in Los Angeles.',
      'Я живу в Лос-Анджелесе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'address'],
  },

  en_s2u1_n4_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A short text about yourself is a ___.',
    blankAnswers: ['profile'],
    options: ['profile', 'surname', 'capital', 'job'],
    answer: 'profile',
    answerTranslation: L(
      '자신에 대한 짧은 글은 프로필이에요.',
      'O‘zingiz haqingizdagi qisqa matn profil bo‘ladi.',
      'A short text about yourself is a profile.',
      'Короткий текст о себе — это профиль.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['profile'],
  },

  en_s2u1_n4_074_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Tell me about yourself.',
    options: ['name', 'My', 'Maria', 'is', 'job', 'website'],
    answer: 'My name is Maria',
    answerTranslation: L(
      '제 이름은 Maria예요.',
      'Mening ismim Maria.',
      'My name is Maria.',
      'Меня зовут Мария.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'introduction'],
  },

  en_s2u1_n4_075_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['live', 'I', 'in', 'Los', 'Angeles', 'nationality', 'am'],
    answer: 'I live in Los Angeles',
    answerTranslation: L(
      '저는 로스앤젤레스에 살아요.',
      'Men Los-Anjelesda yashayman.',
      'I live in Los Angeles.',
      'Я живу в Лос-Анджелесе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'address'],
  },

  en_s2u1_n4_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Maria is American, but her parents are ___.',
    blankAnswers: ['Mexican'],
    options: ['Mexican', 'Mexico', 'Spanish', 'American'],
    answer: 'Mexican',
    answerTranslation: L(
      'Maria는 미국인이지만 부모님은 멕시코인이에요.',
      'Maria amerikalik, lekin ota-onasi meksikalik.',
      'Maria is American, but her parents are Mexican.',
      'Мария американка, но её родители — мексиканцы.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'nationality'],
  },

  en_s2u1_n4_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What languages do you speak?' }],
    options: [
      'I speak Spanish and English.',
      'I’m Spain and England.',
      'My language address.',
      'Spanish are my job.',
    ],
    answer: 'I speak Spanish and English.',
    answerTranslation: L(
      '저는 스페인어와 영어를 해요.',
      'Men ispan va ingliz tillarida gapiraman.',
      'I speak Spanish and English.',
      'Я говорю по-испански и по-английски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['profile', 'languages'],
  },

  en_s2u1_n4_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name is Maria Martinez.',
    audioText: 'My name is Maria Martinez.',
    answerTranslation: L(
      '제 이름은 Maria Martinez예요.',
      'Mening ismim Maria Martinez.',
      'My name is Maria Martinez.',
      'Меня зовут Мария Мартинес.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'capital-letters'],
  },

  en_s2u1_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m American. I’m fluent in Spanish and English.',
    audioText: 'I’m American. I’m fluent in Spanish and English.',
    answerTranslation: L(
      '저는 미국인이에요. 스페인어와 영어를 유창하게 해요.',
      'Men amerikalikman. Ispan va ingliz tillarida ravon gapiraman.',
      'I’m American. I’m fluent in Spanish and English.',
      'Я американка. Я свободно говорю по-испански и по-английски.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'writing-review'],
  },

  en_s2u1_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'My name is Maria Martinez. I’m American. I’m fluent in Spanish and English. I live in Los Angeles.',
    audioText:
      'My name is Maria Martinez. I’m American. I’m fluent in Spanish and English. I live in Los Angeles.',
    answerTranslation: L(
      '제 이름은 Maria Martinez예요. 저는 미국인이에요. 스페인어와 영어를 유창하게 하고 로스앤젤레스에 살아요.',
      'Mening ismim Maria Martinez. Men amerikalikman. Ispan va ingliz tillarida ravon gapiraman. Men Los-Anjelesda yashayman.',
      'My name is Maria Martinez. I’m American. I’m fluent in Spanish and English. I live in Los Angeles.',
      'Меня зовут Мария Мартинес. Я американка. Я свободно говорю по-испански и по-английски. Я живу в Лос-Анджелесе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['profile', 'unit-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE4 = {
  title: L(
    '개인정보 묻기와 프로필',
    'Shaxsiy ma’lumot va profil',
    'Personal information and profiles',
    'Личная информация и профиль',
  ),
  section: 2,
  unit: 1,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '이름과 직업이 뭐예요?',
        'Ismingiz va kasbingiz nima?',
        'What’s your name and job?',
        'Как вас зовут и кем вы работаете?',
      ),
      description: L(
        '이름, 성, 국적, 직업, 이메일 주소 같은 기본 개인정보를 묻고 답해요.',
        'Ism, familiya, millat, kasb va elektron pochta kabi shaxsiy ma’lumotlarni so‘rash va javob berishni mashq qilasiz.',
        'Ask and answer questions about names, surnames, nationalities, jobs and email addresses.',
        'Учимся спрашивать и сообщать имя, фамилию, национальность, работу и электронную почту.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s2u1_n4_001_speaking',
        'en_s2u1_n4_002_reply_builder',
        'en_s2u1_n4_003_speaking',
        'en_s2u1_n4_004_fill_in_blank',
        'en_s2u1_n4_005_dialog_complete',
        'en_s2u1_n4_006_speaking',
        'en_s2u1_n4_007_dialog_complete',
        'en_s2u1_n4_008_word_matching',
        'en_s2u1_n4_009_speaking',
        'en_s2u1_n4_010_fill_in_blank',
        'en_s2u1_n4_011_translate_builder',
        'en_s2u1_n4_012_word_arrange',
        'en_s2u1_n4_013_reply_builder',
        'en_s2u1_n4_014_dialog_complete',
        'en_s2u1_n4_015_type_answer',
        'en_s2u1_n4_016_type_answer',
        'en_s2u1_n4_017_sentence_builder',
        'en_s2u1_n4_018_speaking',
        'en_s2u1_n4_019_dialog_complete',
        'en_s2u1_n4_020_speaking',
      ],
    },

    {
      title: L(
        '다시 말해 주시겠어요?',
        'Yana takrorlay olasizmi?',
        'Can you repeat that?',
        'Можете повторить?',
      ),
      description: L(
        '상대방의 말을 못 들었을 때 다시 말해 달라고 하거나 이름과 이메일의 철자를 확인해요.',
        'Gapni eshitmay qolganda qayta aytishni so‘rash va ism yoki elektron pochta yozilishini tekshirishni mashq qilasiz.',
        'Ask people to repeat information and check the spelling of names and contact details.',
        'Учимся просить повторить информацию и уточнять написание имён и контактных данных.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s2u1_n4_021_speaking',
        'en_s2u1_n4_022_dialog_complete',
        'en_s2u1_n4_023_speaking',
        'en_s2u1_n4_024_translate_builder',
        'en_s2u1_n4_025_word_arrange',
        'en_s2u1_n4_026_type_answer',
        'en_s2u1_n4_027_type_answer',
        'en_s2u1_n4_028_reply_builder',
        'en_s2u1_n4_029_dialog_complete',
        'en_s2u1_n4_030_speaking',
        'en_s2u1_n4_031_fill_in_blank',
        'en_s2u1_n4_032_fill_in_blank',
        'en_s2u1_n4_033_sentence_builder',
        'en_s2u1_n4_034_dialog_complete',
        'en_s2u1_n4_035_speaking',
        'en_s2u1_n4_036_dialog_complete',
        'en_s2u1_n4_037_translate_builder',
        'en_s2u1_n4_038_word_matching',
        'en_s2u1_n4_039_reply_builder',
        'en_s2u1_n4_040_speaking',
      ],
    },

    {
      title: L('나의 프로필', 'Mening profilim', 'My profile', 'Мой профиль'),
      description: L(
        '프로필에 들어가는 주소, 기술, 언어, 직업, 웹사이트 정보를 익히고 사람을 소개해요.',
        'Profil uchun manzil, ko‘nikmalar, tillar, kasb va veb-sayt ma’lumotlarini o‘rganib, odamni tanishtirasiz.',
        'Learn the information used in a profile, including addresses, skills, languages, jobs and websites.',
        'Изучаем информацию для профиля: адрес, навыки, языки, работу и сайт.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s2u1_n4_041_word_matching',
        'en_s2u1_n4_042_fill_in_blank',
        'en_s2u1_n4_043_fill_in_blank',
        'en_s2u1_n4_044_word_matching',
        'en_s2u1_n4_045_speaking',
        'en_s2u1_n4_046_dialog_complete',
        'en_s2u1_n4_047_fill_in_blank',
        'en_s2u1_n4_048_fill_in_blank',
        'en_s2u1_n4_049_fill_in_blank',
        'en_s2u1_n4_050_speaking',
        'en_s2u1_n4_051_fill_in_blank',
        'en_s2u1_n4_052_word_matching',
        'en_s2u1_n4_053_fill_in_blank',
        'en_s2u1_n4_054_translate_builder',
        'en_s2u1_n4_055_word_arrange',
        'en_s2u1_n4_056_sentence_builder',
        'en_s2u1_n4_057_dialog_complete',
        'en_s2u1_n4_058_reply_builder',
        'en_s2u1_n4_059_dialog_complete',
        'en_s2u1_n4_060_speaking',
      ],
    },

    {
      title: L(
        '프로필 작성하기',
        'Profil yozish',
        'Writing a profile',
        'Пишем профиль',
      ),
      description: L(
        '사람 이름, 국가, 국적, 언어에 대문자를 사용하고 간단한 자기소개 프로필을 완성해요.',
        'Ismlar, mamlakatlar, millatlar va tillarda bosh harflardan foydalanib, qisqa profil yozishni mashq qilasiz.',
        'Use capital letters correctly for names, countries, nationalities and languages and build a short personal profile.',
        'Используем заглавные буквы в именах, странах, национальностях и языках и составляем краткий профиль.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u1_n4_061_word_matching',
        'en_s2u1_n4_062_fill_in_blank',
        'en_s2u1_n4_063_fill_in_blank',
        'en_s2u1_n4_064_fill_in_blank',
        'en_s2u1_n4_065_type_answer',
        'en_s2u1_n4_066_type_answer',
        'en_s2u1_n4_067_type_answer',
        'en_s2u1_n4_068_translate_builder',
        'en_s2u1_n4_069_sentence_builder',
        'en_s2u1_n4_070_word_arrange',
        'en_s2u1_n4_071_speaking',
        'en_s2u1_n4_072_dialog_complete',
        'en_s2u1_n4_073_fill_in_blank',
        'en_s2u1_n4_074_reply_builder',
        'en_s2u1_n4_075_translate_builder',
        'en_s2u1_n4_076_fill_in_blank',
        'en_s2u1_n4_077_dialog_complete',
        'en_s2u1_n4_078_speaking',
        'en_s2u1_n4_079_speaking',
        'en_s2u1_n4_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 1 · Node 5
// 1.5 Video + Unit 1 Review
//
// Coverage
// - Brighton language exchange
// - places and people in the video
// - beach / library / pavilion / pier / restaurant
// - conversation / exchange
// - student / teacher
// - population / cost / famous
// - improving English
// - speaking / listening / reading / writing
// - pronunciation / grammar / vocabulary
// - Unit 1 cumulative review:
//   countries / nationalities / languages
//   family
//   be
//   possessive determiners
//   possessive 's
//   regular and irregular plurals
//   personal information
//
// IMPORTANT:
// *_WORDS에는 단어 하나만 등록.
// "language exchange", "Brighton Pier", "personal information"
// 같은 구는 headword로 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE5_WORDS = [
  {
    code: 'en-place-brighton',
    english: 'Brighton',
    senseKey: 'city-in-england',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '브라이턴',
      'Brayton',
      'a city on the south coast of England',
      'Брайтон',
    ),
    examples: [
      {
        english: 'Brighton is in England.',
        translations: L(
          '브라이턴은 영국에 있어요.',
          'Brayton Angliyada.',
          'Brighton is in England.',
          'Брайтон находится в Англии.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbraɪtən/',
      ttsText: 'Brighton',
    },
    tags: ['places', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-beach',
    english: 'beach',
    senseKey: 'sandy-or-pebbly-seashore',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '해변',
      'plyaj; sohil',
      'an area of sand or stones next to the sea',
      'пляж',
    ),
    examples: [
      {
        english: 'Brighton has a beach.',
        translations: L(
          '브라이턴에는 해변이 있어요.',
          'Braytonda plyaj bor.',
          'Brighton has a beach.',
          'В Брайтоне есть пляж.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/biːtʃ/',
      ttsText: 'beach',
    },
    tags: ['places', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-conversation',
    english: 'conversation',
    senseKey: 'talk-between-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대화',
      'suhbat',
      'a talk between two or more people',
      'разговор',
    ),
    examples: [
      {
        english: 'The students have a conversation.',
        translations: L(
          '학생들이 대화를 해요.',
          'Talabalar suhbatlashadi.',
          'The students have a conversation.',
          'Студенты разговаривают.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌkɒnvəˈseɪʃən/',
      ttsText: 'conversation',
    },
    tags: ['conversation', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-exchange',
    english: 'exchange',
    senseKey: 'giving-one-thing-for-another',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '교환; 교류',
      'almashuv',
      'an activity in which people give or share things with each other',
      'обмен',
    ),
    examples: [
      {
        english: 'The students join an exchange.',
        translations: L(
          '학생들이 교류 활동에 참여해요.',
          'Talabalar almashuvda qatnashadi.',
          'The students join an exchange.',
          'Студенты участвуют в обмене.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪksˈtʃeɪndʒ/',
      ttsText: 'exchange',
    },
    tags: ['conversation', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-flag',
    english: 'flag',
    senseKey: 'country-symbol-on-cloth',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '깃발; 국기',
      'bayroq',
      'a piece of cloth used as a symbol of a country or group',
      'флаг',
    ),
    examples: [
      {
        english: 'The flag is outside the building.',
        translations: L(
          '건물 밖에 깃발이 있어요.',
          'Binoning tashqarisida bayroq bor.',
          'The flag is outside the building.',
          'Флаг находится снаружи здания.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flæɡ/',
      ttsText: 'flag',
    },
    tags: ['objects', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-library',
    english: 'library',
    senseKey: 'place-with-books',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도서관',
      'kutubxona',
      'a place where people can read or borrow books',
      'библиотека',
    ),
    examples: [
      {
        english: 'The exchange is at a library.',
        translations: L(
          '교류 활동은 도서관에서 열려요.',
          'Almashuv kutubxonada bo‘ladi.',
          'The exchange is at a library.',
          'Обмен проходит в библиотеке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlaɪbrəri/',
      ttsText: 'library',
    },
    tags: ['places', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-pavilion',
    english: 'pavilion',
    senseKey: 'large-decorative-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '파빌리온; 전시관',
      'pavilon',
      'a large decorative building used for public activities',
      'павильон',
    ),
    examples: [
      {
        english: 'The pavilion is famous in Brighton.',
        translations: L(
          '그 파빌리온은 브라이턴에서 유명해요.',
          'Pavilon Braytonda mashhur.',
          'The pavilion is famous in Brighton.',
          'Павильон известен в Брайтоне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pəˈvɪliən/',
      ttsText: 'pavilion',
    },
    tags: ['places', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-pier',
    english: 'pier',
    senseKey: 'structure-extending-over-water',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '부두; 잔교',
      'pristan; dengiz ustidagi yo‘lak',
      'a structure built out over the sea',
      'пирс',
    ),
    examples: [
      {
        english: 'Brighton has a famous pier.',
        translations: L(
          '브라이턴에는 유명한 부두가 있어요.',
          'Braytonda mashhur pir bor.',
          'Brighton has a famous pier.',
          'В Брайтоне есть знаменитый пирс.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɪə/',
      ttsText: 'pier',
    },
    tags: ['places', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-restaurant',
    english: 'restaurant',
    senseKey: 'place-serving-meals',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '식당; 레스토랑',
      'restoran',
      'a place where people buy and eat meals',
      'ресторан',
    ),
    examples: [
      {
        english: 'The students go to a restaurant.',
        translations: L(
          '학생들이 식당에 가요.',
          'Talabalar restoranga boradi.',
          'The students go to a restaurant.',
          'Студенты идут в ресторан.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrestrɒnt/',
      ttsText: 'restaurant',
    },
    tags: ['places', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-student',
    english: 'student',
    senseKey: 'person-who-studies',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('학생', 'talaba; o‘quvchi', 'a person who studies', 'студент'),
    examples: [
      {
        english: 'The students practise English.',
        translations: L(
          '학생들은 영어를 연습해요.',
          'Talabalar ingliz tilini mashq qiladi.',
          'The students practise English.',
          'Студенты практикуют английский.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstjuːdənt/',
      ttsText: 'student',
    },
    tags: ['people', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-person-teacher',
    english: 'teacher',
    senseKey: 'person-who-teaches',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('선생님; 교사', 'o‘qituvchi', 'a person who teaches', 'учитель'),
    examples: [
      {
        english: 'The teacher helps the students.',
        translations: L(
          '선생님이 학생들을 도와요.',
          'O‘qituvchi talabalarga yordam beradi.',
          'The teacher helps the students.',
          'Учитель помогает студентам.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtiːtʃə/',
      ttsText: 'teacher',
    },
    tags: ['people', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-population',
    english: 'population',
    senseKey: 'people-living-in-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '인구',
      'aholi',
      'all the people who live in a particular place',
      'население',
    ),
    examples: [
      {
        english: 'Brighton has a large population.',
        translations: L(
          '브라이턴에는 많은 인구가 있어요.',
          'Brayton aholisi ko‘p.',
          'Brighton has a large population.',
          'Население Брайтона большое.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌpɒpjəˈleɪʃən/',
      ttsText: 'population',
    },
    tags: ['cities', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-famous',
    english: 'famous',
    senseKey: 'known-by-many-people',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('유명한', 'mashhur', 'known by many people', 'известный'),
    examples: [
      {
        english: 'Brighton Pier is famous.',
        translations: L(
          '브라이턴 부두는 유명해요.',
          'Brayton piri mashhur.',
          'Brighton Pier is famous.',
          'Брайтонский пирс знаменит.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfeɪməs/',
      ttsText: 'famous',
    },
    tags: ['description', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-cost',
    english: 'cost',
    senseKey: 'amount-of-money-needed',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '비용; 가격',
      'narx; xarajat',
      'the amount of money needed to buy or do something',
      'стоимость',
    ),
    examples: [
      {
        english: 'The cost is five pounds.',
        translations: L(
          '비용은 5파운드예요.',
          'Narxi besh funt.',
          'The cost is five pounds.',
          'Стоимость — пять фунтов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kɒst/',
      ttsText: 'cost',
    },
    tags: ['money', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-verb-improve',
    english: 'improve',
    senseKey: 'become-better',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '향상시키다; 나아지다',
      'yaxshilamoq',
      'to become better or make something better',
      'улучшать',
    ),
    examples: [
      {
        english: 'I want to improve my English.',
        translations: L(
          '저는 영어를 향상시키고 싶어요.',
          'Men ingliz tilimni yaxshilamoqchiman.',
          'I want to improve my English.',
          'Я хочу улучшить свой английский.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪmˈpruːv/',
      ttsText: 'improve',
    },
    tags: ['learning', 'video'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-skill-speaking',
    english: 'speaking',
    senseKey: 'language-speaking-skill',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '말하기',
      'gapirish',
      'the skill of speaking a language',
      'говорение',
    ),
    examples: [
      {
        english: 'I want to improve my speaking.',
        translations: L(
          '저는 말하기 실력을 향상시키고 싶어요.',
          'Men gapirish ko‘nikmamni yaxshilamoqchiman.',
          'I want to improve my speaking.',
          'Я хочу улучшить разговорную речь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈspiːkɪŋ/',
      ttsText: 'speaking',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-skill-listening',
    english: 'listening',
    senseKey: 'language-listening-skill',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '듣기',
      'tinglash',
      'the skill of understanding spoken language',
      'аудирование',
    ),
    examples: [
      {
        english: 'Listening is important.',
        translations: L(
          '듣기는 중요해요.',
          'Tinglash muhim.',
          'Listening is important.',
          'Аудирование важно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɪsənɪŋ/',
      ttsText: 'listening',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-skill-reading',
    english: 'reading',
    senseKey: 'language-reading-skill',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '읽기',
      'o‘qish',
      'the skill of understanding written language',
      'чтение',
    ),
    examples: [
      {
        english: 'Reading can improve your vocabulary.',
        translations: L(
          '읽기는 어휘력 향상에 도움이 될 수 있어요.',
          'O‘qish lug‘at boyligini yaxshilashi mumkin.',
          'Reading can improve your vocabulary.',
          'Чтение может улучшить словарный запас.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈriːdɪŋ/',
      ttsText: 'reading',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-skill-writing',
    english: 'writing',
    senseKey: 'language-writing-skill',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '쓰기',
      'yozish',
      'the skill of producing written language',
      'письмо',
    ),
    examples: [
      {
        english: 'I practise writing every day.',
        translations: L(
          '저는 매일 쓰기를 연습해요.',
          'Men har kuni yozishni mashq qilaman.',
          'I practise writing every day.',
          'Я каждый день практикую письмо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈraɪtɪŋ/',
      ttsText: 'writing',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-pronunciation',
    english: 'pronunciation',
    senseKey: 'way-word-is-spoken',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '발음',
      'talaffuz',
      'the way a word or language is spoken',
      'произношение',
    ),
    examples: [
      {
        english: 'I want to improve my pronunciation.',
        translations: L(
          '저는 발음을 향상시키고 싶어요.',
          'Men talaffuzimni yaxshilamoqchiman.',
          'I want to improve my pronunciation.',
          'Я хочу улучшить произношение.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/prəˌnʌnsiˈeɪʃən/',
      ttsText: 'pronunciation',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-grammar',
    english: 'grammar',
    senseKey: 'language-rules',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '문법',
      'grammatika',
      'the rules for forming words and sentences in a language',
      'грамматика',
    ),
    examples: [
      {
        english: 'I need to practise grammar.',
        translations: L(
          '저는 문법을 연습해야 해요.',
          'Men grammatikani mashq qilishim kerak.',
          'I need to practise grammar.',
          'Мне нужно практиковать грамматику.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡræmə/',
      ttsText: 'grammar',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-vocabulary',
    english: 'vocabulary',
    senseKey: 'set-of-known-words',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '어휘',
      'lug‘at boyligi',
      'the words a person knows or uses',
      'словарный запас',
    ),
    examples: [
      {
        english: 'Reading can improve your vocabulary.',
        translations: L(
          '읽기는 어휘력 향상에 도움이 될 수 있어요.',
          'O‘qish lug‘at boyligini yaxshilashi mumkin.',
          'Reading can improve your vocabulary.',
          'Чтение может улучшить словарный запас.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/vəˈkæbjələri/',
      ttsText: 'vocabulary',
    },
    tags: ['skills', 'learning'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT1_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Brighton language exchange
  // ===========================================================

  en_s2u1_n5_001_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'beach',
    choices: [
      { text: 'beach', label: '🏖️', emoji: '🏖️', imageUrl: '' },
      { text: 'library', label: '📚', emoji: '📚', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
      { text: 'pavilion', label: '🏛️', emoji: '🏛️', imageUrl: '' },
    ],
    answerTranslation: L('해변', 'plyaj', 'beach', 'пляж'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'beach'],
  },

  en_s2u1_n5_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'beach',
        native: 'plyaj',
        nativeI18n: L('해변', 'plyaj', 'beach', 'пляж'),
      },
      {
        text: 'library',
        native: 'kutubxona',
        nativeI18n: L('도서관', 'kutubxona', 'library', 'библиотека'),
      },
      {
        text: 'pier',
        native: 'pir',
        nativeI18n: L('부두', 'pir', 'pier', 'пирс'),
      },
      {
        text: 'pavilion',
        native: 'pavilon',
        nativeI18n: L('파빌리온', 'pavilon', 'pavilion', 'павильон'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'places'],
  },

  en_s2u1_n5_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Brighton is a city in ___.',
    blankAnswers: ['England'],
    options: ['England', 'France', 'Mexico', 'China'],
    answer: 'England',
    answerTranslation: L(
      '브라이턴은 영국에 있는 도시예요.',
      'Brayton Angliyadagi shahar.',
      'Brighton is a city in England.',
      'Брайтон — город в Англии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'brighton'],
  },

  en_s2u1_n5_004_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Brighton has a famous pier.',
    audioText: 'Brighton has a famous pier.',
    answerTranslation: L(
      '브라이턴에는 유명한 부두가 있어요.',
      'Braytonda mashhur pir bor.',
      'Brighton has a famous pier.',
      'В Брайтоне есть знаменитый пирс.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'pier', 'famous'],
  },

  en_s2u1_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Students meet at a ___.',
    blankAnswers: ['library'],
    options: ['library', 'beach', 'country', 'nationality'],
    answer: 'library',
    answerTranslation: L(
      '학생들은 도서관에서 만나요.',
      'Talabalar kutubxonada uchrashadi.',
      'Students meet at a library.',
      'Студенты встречаются в библиотеке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'library'],
  },

  en_s2u1_n5_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People talk together in a ___.',
    blankAnswers: ['conversation'],
    options: ['conversation', 'population', 'flag', 'cost'],
    answer: 'conversation',
    answerTranslation: L(
      '사람들은 대화를 나눠요.',
      'Odamlar suhbatlashadi.',
      'People talk together in a conversation.',
      'Люди разговаривают друг с другом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'conversation'],
  },

  en_s2u1_n5_007_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The activity is a language ',
    sentenceSuffix: '.',
    answer: 'exchange',
    answerTranslation: L(
      '그 활동은 언어 교류예요.',
      'Bu faoliyat til almashinuvi.',
      'The activity is a language exchange.',
      'Это языковой обмен.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the word exchange.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'exchange'],
  },

  en_s2u1_n5_008_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['English', 'students', 'practise', 'The', 'language', 'is'],
    answer: 'The students practise English',
    audioText: 'The students practise English.',
    answerTranslation: L(
      '학생들은 영어를 연습해요.',
      'Talabalar ingliz tilini mashq qiladi.',
      'The students practise English.',
      'Студенты практикуют английский.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['video', 'students'],
  },

  en_s2u1_n5_009_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The students have a conversation.',
    audioText: 'The students have a conversation.',
    answerI18n: L(
      '학생들이 대화를 해요',
      'Talabalar suhbatlashadi',
      'The students have a conversation',
      'Студенты разговаривают',
    ),
    options: ['The', 'students', 'have', 'a', 'conversation', 'teacher'],
    optionsI18n: {
      ko: ['학생들이', '대화를', '해요'],
      uz: ['Talabalar', 'suhbatlashadi'],
      en: ['The', 'students', 'have', 'a', 'conversation'],
      ru: ['Студенты', 'разговаривают'],
    },
    answerTranslation: L(
      '학생들이 대화를 해요.',
      'Talabalar suhbatlashadi.',
      'The students have a conversation.',
      'Студенты разговаривают.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['video', 'conversation'],
  },

  en_s2u1_n5_010_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: IMAGE_INSTRUCTION,
    answer: 'flag',
    choices: [
      { text: 'flag', label: '🚩', emoji: '🚩', imageUrl: '' },
      { text: 'pier', label: '🌊', emoji: '🌊', imageUrl: '' },
      { text: 'library', label: '📚', emoji: '📚', imageUrl: '' },
      { text: 'restaurant', label: '🍽️', emoji: '🍽️', imageUrl: '' },
    ],
    answerTranslation: L('깃발', 'bayroq', 'flag', 'флаг'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'flag'],
  },

  en_s2u1_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Brighton Pier is ___.',
    blankAnswers: ['famous'],
    options: ['famous', 'fluent', 'married', 'unemployed'],
    answer: 'famous',
    answerTranslation: L(
      '브라이턴 부두는 유명해요.',
      'Brayton piri mashhur.',
      'Brighton Pier is famous.',
      'Брайтонский пирс знаменит.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'famous'],
  },

  en_s2u1_n5_012_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'student',
        native: 'talaba',
        nativeI18n: L('학생', 'talaba', 'student', 'студент'),
      },
      {
        text: 'teacher',
        native: 'o‘qituvchi',
        nativeI18n: L('선생님', 'o‘qituvchi', 'teacher', 'учитель'),
      },
      {
        text: 'conversation',
        native: 'suhbat',
        nativeI18n: L('대화', 'suhbat', 'conversation', 'разговор'),
      },
      {
        text: 'exchange',
        native: 'almashuv',
        nativeI18n: L('교류', 'almashuv', 'exchange', 'обмен'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'people'],
  },

  en_s2u1_n5_013_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'Brighton has a famous ',
    sentenceSuffix: '.',
    answer: 'pier',
    answerTranslation: L(
      '브라이턴에는 유명한 부두가 있어요.',
      'Braytonda mashhur pir bor.',
      'Brighton has a famous pier.',
      'В Брайтоне есть знаменитый пирс.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the word pier.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'pier'],
  },

  en_s2u1_n5_014_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['library', 'at', 'meet', 'Students', 'a', 'teacher'],
    answer: 'Students meet at a library',
    answerTranslation: L(
      '학생들은 도서관에서 만나요.',
      'Talabalar kutubxonada uchrashadi.',
      'Students meet at a library.',
      'Студенты встречаются в библиотеке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['video', 'library'],
  },

  en_s2u1_n5_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The ___ is the number of people who live in a place.',
    blankAnswers: ['population'],
    options: ['population', 'nationality', 'conversation', 'grammar'],
    answer: 'population',
    answerTranslation: L(
      'population은 한 장소에 사는 사람들의 수를 뜻해요.',
      'Population bir joyda yashaydigan odamlar sonini anglatadi.',
      'Population is the number of people who live in a place.',
      'Population означает число людей, живущих в определённом месте.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['population'],
  },

  en_s2u1_n5_016_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The amount of money you pay is the ___.',
    blankAnswers: ['cost'],
    options: ['cost', 'population', 'language', 'profile'],
    answer: 'cost',
    answerTranslation: L(
      '지불하는 돈의 양은 비용이에요.',
      'To‘lanadigan pul miqdori cost bo‘ladi.',
      'The amount of money you pay is the cost.',
      'Сумма, которую вы платите, — это стоимость.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['cost'],
  },

  en_s2u1_n5_017_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where do the students meet?' }],
    options: [
      'At a library.',
      'At a nationality.',
      'At a language.',
      'At a population.',
    ],
    answer: 'At a library.',
    answerTranslation: L(
      '도서관에서요.',
      'Kutubxonada.',
      'At a library.',
      'В библиотеке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'library'],
  },

  en_s2u1_n5_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The language exchange helps students practise English.',
    audioText: 'The language exchange helps students practise English.',
    answerTranslation: L(
      '언어 교류는 학생들이 영어를 연습하는 데 도움을 줘요.',
      'Til almashinuvi talabalarga ingliz tilini mashq qilishga yordam beradi.',
      'The language exchange helps students practise English.',
      'Языковой обмен помогает студентам практиковать английский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'exchange'],
  },

  en_s2u1_n5_019_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What can you see in Brighton?',
    options: ['a', 'pier', 'beach', 'and', 'I', 'can', 'see'],
    answer: 'I can see a beach and pier',
    answerTranslation: L(
      '해변과 부두가 보여요.',
      'Men plyaj va pirni ko‘ryapman.',
      'I can see a beach and pier.',
      'Я вижу пляж и пирс.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'places'],
  },

  en_s2u1_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Brighton is famous for its pier and pavilion.',
    audioText: 'Brighton is famous for its pier and pavilion.',
    answerTranslation: L(
      '브라이턴은 부두와 파빌리온으로 유명해요.',
      'Brayton piri va paviloni bilan mashhur.',
      'Brighton is famous for its pier and pavilion.',
      'Брайтон знаменит своим пирсом и павильоном.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Improving your English
  // ===========================================================

  en_s2u1_n5_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'speaking',
        native: 'gapirish',
        nativeI18n: L('말하기', 'gapirish', 'speaking', 'говорение'),
      },
      {
        text: 'listening',
        native: 'tinglash',
        nativeI18n: L('듣기', 'tinglash', 'listening', 'аудирование'),
      },
      {
        text: 'reading',
        native: 'o‘qish',
        nativeI18n: L('읽기', 'o‘qish', 'reading', 'чтение'),
      },
      {
        text: 'writing',
        native: 'yozish',
        nativeI18n: L('쓰기', 'yozish', 'writing', 'письмо'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'english'],
  },

  en_s2u1_n5_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'pronunciation',
        native: 'talaffuz',
        nativeI18n: L('발음', 'talaffuz', 'pronunciation', 'произношение'),
      },
      {
        text: 'grammar',
        native: 'grammatika',
        nativeI18n: L('문법', 'grammatika', 'grammar', 'грамматика'),
      },
      {
        text: 'vocabulary',
        native: 'lug‘at boyligi',
        nativeI18n: L(
          '어휘',
          'lug‘at boyligi',
          'vocabulary',
          'словарный запас',
        ),
      },
      {
        text: 'improve',
        native: 'yaxshilamoq',
        nativeI18n: L('향상시키다', 'yaxshilamoq', 'improve', 'улучшать'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['skills', 'english'],
  },

  en_s2u1_n5_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Talking in English practises ___.',
    blankAnswers: ['speaking'],
    options: ['speaking', 'reading', 'writing', 'grammar'],
    answer: 'speaking',
    answerTranslation: L(
      '영어로 말하는 것은 말하기 연습이에요.',
      'Ingliz tilida gapirish speaking mashqidir.',
      'Talking in English practises speaking.',
      'Разговор на английском тренирует говорение.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'speaking'],
  },

  en_s2u1_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Understanding spoken English practises ___.',
    blankAnswers: ['listening'],
    options: ['listening', 'writing', 'reading', 'grammar'],
    answer: 'listening',
    answerTranslation: L(
      '말로 된 영어를 이해하는 것은 듣기 연습이에요.',
      'Og‘zaki ingliz tilini tushunish listening mashqidir.',
      'Understanding spoken English practises listening.',
      'Понимание устной речи тренирует аудирование.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'listening'],
  },

  en_s2u1_n5_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Understanding a book practises ___.',
    blankAnswers: ['reading'],
    options: ['reading', 'speaking', 'writing', 'pronunciation'],
    answer: 'reading',
    answerTranslation: L(
      '책을 이해하며 읽는 것은 읽기 연습이에요.',
      'Kitobni tushunib o‘qish reading mashqidir.',
      'Understanding a book practises reading.',
      'Чтение и понимание книги тренирует навык чтения.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'reading'],
  },

  en_s2u1_n5_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Producing a text practises ___.',
    blankAnswers: ['writing'],
    options: ['writing', 'listening', 'speaking', 'pronunciation'],
    answer: 'writing',
    answerTranslation: L(
      '글을 쓰는 것은 쓰기 연습이에요.',
      'Matn yozish writing mashqidir.',
      'Producing a text practises writing.',
      'Создание текста тренирует письмо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'writing'],
  },

  en_s2u1_n5_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The way you say words is your ___.',
    blankAnswers: ['pronunciation'],
    options: ['pronunciation', 'grammar', 'vocabulary', 'nationality'],
    answer: 'pronunciation',
    answerTranslation: L(
      '단어를 말하는 방식이 발음이에요.',
      'So‘zlarni aytish usulingiz talaffuzdir.',
      'The way you say words is your pronunciation.',
      'То, как вы произносите слова, — это произношение.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'pronunciation'],
  },

  en_s2u1_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The rules of a language are its ___.',
    blankAnswers: ['grammar'],
    options: ['grammar', 'vocabulary', 'speaking', 'profile'],
    answer: 'grammar',
    answerTranslation: L(
      '언어의 규칙은 문법이에요.',
      'Til qoidalari grammatika.',
      'The rules of a language are its grammar.',
      'Правила языка — это грамматика.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'grammar'],
  },

  en_s2u1_n5_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The words you know are your ___.',
    blankAnswers: ['vocabulary'],
    options: ['vocabulary', 'grammar', 'population', 'nationality'],
    answer: 'vocabulary',
    answerTranslation: L(
      '알고 있는 단어들이 어휘예요.',
      'Siz biladigan so‘zlar lug‘at boyligingizdir.',
      'The words you know are your vocabulary.',
      'Слова, которые вы знаете, составляют ваш словарный запас.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['skills', 'vocabulary'],
  },

  en_s2u1_n5_030_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I want to improve my English.',
    audioText: 'I want to improve my English.',
    answerTranslation: L(
      '저는 영어를 향상시키고 싶어요.',
      'Men ingliz tilimni yaxshilamoqchiman.',
      'I want to improve my English.',
      'Я хочу улучшить свой английский.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['improve', 'english'],
  },

  en_s2u1_n5_031_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['improve', 'want', 'speaking', 'my', 'I', 'to', 'grammar'],
    answer: 'I want to improve my speaking',
    answerTranslation: L(
      '저는 말하기 실력을 향상시키고 싶어요.',
      'Men gapirish ko‘nikmamni yaxshilamoqchiman.',
      'I want to improve my speaking.',
      'Я хочу улучшить разговорную речь.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['improve', 'speaking'],
  },

  en_s2u1_n5_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['pronunciation', 'improve', 'my', 'to', 'want', 'I'],
    answer: 'I want to improve my pronunciation',
    audioText: 'I want to improve my pronunciation.',
    answerTranslation: L(
      '저는 발음을 향상시키고 싶어요.',
      'Men talaffuzimni yaxshilamoqchiman.',
      'I want to improve my pronunciation.',
      'Я хочу улучшить произношение.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['improve', 'pronunciation'],
  },

  en_s2u1_n5_033_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Reading can improve your vocabulary.',
    audioText: 'Reading can improve your vocabulary.',
    answerI18n: L(
      '읽기는 어휘력을 향상시킬 수 있어요',
      'O‘qish lug‘at boyligingizni yaxshilashi mumkin',
      'Reading can improve your vocabulary',
      'Чтение может улучшить ваш словарный запас',
    ),
    options: ['Reading', 'can', 'improve', 'your', 'vocabulary', 'grammar'],
    optionsI18n: {
      ko: ['읽기는', '어휘력을', '향상시킬', '수', '있어요'],
      uz: ['O‘qish', 'lug‘at', 'boyligingizni', 'yaxshilashi', 'mumkin'],
      en: ['Reading', 'can', 'improve', 'your', 'vocabulary'],
      ru: ['Чтение', 'может', 'улучшить', 'словарный', 'запас'],
    },
    answerTranslation: L(
      '읽기는 어휘력을 향상시킬 수 있어요.',
      'O‘qish lug‘at boyligingizni yaxshilashi mumkin.',
      'Reading can improve your vocabulary.',
      'Чтение может улучшить ваш словарный запас.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['reading', 'vocabulary'],
  },

  en_s2u1_n5_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What do you want to improve?' }],
    options: [
      'My grammar.',
      'I’m grammar.',
      'My nationality is grammar.',
      'I grammar am.',
    ],
    answer: 'My grammar.',
    answerTranslation: L(
      '문법이요.',
      'Grammatikamni.',
      'My grammar.',
      'Грамматику.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['grammar', 'improve'],
  },

  en_s2u1_n5_035_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you want to improve?',
    options: ['my', 'I', 'want', 'to', 'improve', 'listening'],
    answer: 'I want to improve my listening',
    answerTranslation: L(
      '저는 듣기 실력을 향상시키고 싶어요.',
      'Men tinglash ko‘nikmamni yaxshilamoqchiman.',
      'I want to improve my listening.',
      'Я хочу улучшить аудирование.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['listening', 'improve'],
  },

  en_s2u1_n5_036_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'I want to improve my ',
    sentenceSuffix: '.',
    answer: 'writing',
    answerTranslation: L(
      '저는 쓰기 실력을 향상시키고 싶어요.',
      'Men yozish ko‘nikmamni yaxshilamoqchiman.',
      'I want to improve my writing.',
      'Я хочу улучшить письмо.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the skill word writing.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['writing', 'typing'],
  },

  en_s2u1_n5_037_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'The rules of English are English ',
    sentenceSuffix: '.',
    answer: 'grammar',
    answerTranslation: L(
      '영어의 규칙은 영어 문법이에요.',
      'Ingliz tili qoidalari ingliz grammatikasidir.',
      'The rules of English are English grammar.',
      'Правила английского языка — это английская грамматика.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the word grammar.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['grammar', 'typing'],
  },

  en_s2u1_n5_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Speaking, listening, reading and writing.',
    audioText: 'Speaking, listening, reading and writing.',
    answerTranslation: L(
      '말하기, 듣기, 읽기, 쓰기.',
      'Gapirish, tinglash, o‘qish va yozish.',
      'Speaking, listening, reading and writing.',
      'Говорение, аудирование, чтение и письмо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['skills', 'review'],
  },

  en_s2u1_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Pronunciation, grammar and vocabulary.',
    audioText: 'Pronunciation, grammar and vocabulary.',
    answerTranslation: L(
      '발음, 문법, 어휘.',
      'Talaffuz, grammatika va lug‘at boyligi.',
      'Pronunciation, grammar and vocabulary.',
      'Произношение, грамматика и словарный запас.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['skills', 'review'],
  },

  en_s2u1_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I want to improve my speaking and vocabulary.',
    audioText: 'I want to improve my speaking and vocabulary.',
    answerTranslation: L(
      '저는 말하기와 어휘를 향상시키고 싶어요.',
      'Men gapirish va lug‘at boyligimni yaxshilamoqchiman.',
      'I want to improve my speaking and vocabulary.',
      'Я хочу улучшить разговорную речь и словарный запас.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['skills', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Unit 1 Vocabulary Review
  // ===========================================================

  en_s2u1_n5_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '나라와 국적을 연결하세요.',
      'Mamlakat va millatni moslang.',
      'Match each country with its nationality.',
      'Соедините страну с национальностью.',
    ),
    pairs: [
      {
        text: 'China',
        native: 'Chinese',
        nativeI18n: L('중국인', 'xitoylik', 'Chinese', 'китаец'),
      },
      {
        text: 'Turkey',
        native: 'Turkish',
        nativeI18n: L('튀르키예인', 'turkiyalik', 'Turkish', 'турок'),
      },
      {
        text: 'Poland',
        native: 'Polish',
        nativeI18n: L('폴란드인', 'polshalik', 'Polish', 'поляк'),
      },
      {
        text: 'Pakistan',
        native: 'Pakistani',
        nativeI18n: L('파키스탄인', 'pokistonlik', 'Pakistani', 'пакистанец'),
      },
      {
        text: 'Vietnam',
        native: 'Vietnamese',
        nativeI18n: L('베트남인', 'vyetnamlik', 'Vietnamese', 'вьетнамец'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'nationalities'],
  },

  en_s2u1_n5_042_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '나라와 주요 언어를 연결하세요.',
      'Mamlakatni asosiy tili bilan moslang.',
      'Match each country with its main language.',
      'Соедините страну с основным языком.',
    ),
    pairs: [
      {
        text: 'Mexico',
        native: 'Spanish',
        nativeI18n: L('스페인어', 'ispan tili', 'Spanish', 'испанский'),
      },
      {
        text: 'the UAE',
        native: 'Arabic',
        nativeI18n: L('아랍어', 'arab tili', 'Arabic', 'арабский'),
      },
      {
        text: 'Pakistan',
        native: 'Urdu',
        nativeI18n: L('우르두어', 'urdu tili', 'Urdu', 'урду'),
      },
      {
        text: 'China',
        native: 'Chinese',
        nativeI18n: L('중국어', 'xitoy tili', 'Chinese', 'китайский'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'languages'],
  },

  en_s2u1_n5_043_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'grandfather',
        native: 'bobo',
        nativeI18n: L('할아버지', 'bobo', 'grandfather', 'дедушка'),
      },
      {
        text: 'granddaughter',
        native: 'nabira qiz',
        nativeI18n: L('손녀', 'nabira qiz', 'granddaughter', 'внучка'),
      },
      {
        text: 'uncle',
        native: 'amaki yoki tog‘a',
        nativeI18n: L('삼촌', 'amaki yoki tog‘a', 'uncle', 'дядя'),
      },
      {
        text: 'niece',
        native: 'jiyan qiz',
        nativeI18n: L('여자 조카', 'jiyan qiz', 'niece', 'племянница'),
      },
      {
        text: 'brother-in-law',
        native: 'qayni aka yoki uka',
        nativeI18n: L(
          '혼인 관계의 남자 형제',
          'qayni aka yoki uka',
          'brother-in-law',
          'родственник по браку',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'family'],
  },

  en_s2u1_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My mother’s father is my ___.',
    blankAnswers: ['grandfather'],
    options: ['grandfather', 'uncle', 'brother', 'nephew'],
    answer: 'grandfather',
    answerTranslation: L(
      '제 어머니의 아버지는 제 할아버지예요.',
      'Onamning otasi mening bobom.',
      'My mother’s father is my grandfather.',
      'Отец моей матери — мой дедушка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'family'],
  },

  en_s2u1_n5_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My sister’s daughter is my ___.',
    blankAnswers: ['niece'],
    options: ['niece', 'nephew', 'aunt', 'daughter'],
    answer: 'niece',
    answerTranslation: L(
      '제 여자 형제의 딸은 제 여자 조카예요.',
      'Opam yoki singlimning qizi mening jiyanim.',
      'My sister’s daughter is my niece.',
      'Дочь моей сестры — моя племянница.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'family'],
  },

  en_s2u1_n5_046_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '단수형과 복수형을 연결하세요.',
      'Birlik va ko‘plik shakllarini moslang.',
      'Match each singular noun with its plural.',
      'Соедините единственное число с множественным.',
    ),
    pairs: [
      {
        text: 'child',
        native: 'children',
        nativeI18n: L('아이들', 'bolalar', 'children', 'дети'),
      },
      {
        text: 'man',
        native: 'men',
        nativeI18n: L('남자들', 'erkaklar', 'men', 'мужчины'),
      },
      {
        text: 'woman',
        native: 'women',
        nativeI18n: L('여자들', 'ayollar', 'women', 'женщины'),
      },
      {
        text: 'person',
        native: 'people',
        nativeI18n: L('사람들', 'odamlar', 'people', 'люди'),
      },
      {
        text: 'city',
        native: 'cities',
        nativeI18n: L('도시들', 'shaharlar', 'cities', 'города'),
      },
    ],
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'plural'],
  },

  en_s2u1_n5_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one woman → two ___',
    blankAnswers: ['women'],
    options: ['women', 'womans', 'woman', 'womens'],
    answer: 'women',
    answerTranslation: L(
      '여자 한 명 → 여자 두 명',
      'bitta ayol → ikkita ayol',
      'one woman → two women',
      'одна женщина → две женщины',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'plural'],
  },

  en_s2u1_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'one city → two ___',
    blankAnswers: ['cities'],
    options: ['cities', 'citys', 'cityes', 'city'],
    answer: 'cities',
    answerTranslation: L(
      '도시 하나 → 도시 두 개',
      'bitta shahar → ikkita shahar',
      'one city → two cities',
      'один город → два города',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'plural'],
  },

  en_s2u1_n5_049_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'name',
        native: 'ism',
        nativeI18n: L('이름', 'ism', 'name', 'имя'),
      },
      {
        text: 'surname',
        native: 'familiya',
        nativeI18n: L('성', 'familiya', 'surname', 'фамилия'),
      },
      {
        text: 'job',
        native: 'kasb',
        nativeI18n: L('직업', 'kasb', 'job', 'работа'),
      },
      {
        text: 'email',
        native: 'elektron pochta',
        nativeI18n: L(
          '이메일',
          'elektron pochta',
          'email',
          'электронная почта',
        ),
      },
      {
        text: 'address',
        native: 'manzil',
        nativeI18n: L('주소', 'manzil', 'address', 'адрес'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'personal-information'],
  },

  en_s2u1_n5_050_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your nationality?' }],
    options: [
      'I’m British.',
      'I’m Britain.',
      'My British is.',
      'I nationality Britain.',
    ],
    answer: 'I’m British.',
    answerTranslation: L(
      '저는 영국인이에요.',
      'Men britaniyalikman.',
      'I’m British.',
      'Я британец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'personal-information'],
  },

  en_s2u1_n5_051_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your job?' }],
    options: [
      'I’m a teacher.',
      'I’m teaching job.',
      'My job are teacher.',
      'Teacher nationality.',
    ],
    answer: 'I’m a teacher.',
    answerTranslation: L(
      '저는 선생님이에요.',
      'Men o‘qituvchiman.',
      'I’m a teacher.',
      'Я учитель.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'job'],
  },

  en_s2u1_n5_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What’s your email address?' }],
    options: [
      'It’s kai@example.com.',
      'I’m kai@example.com.',
      'My job email.',
      'Email nationality.',
    ],
    answer: 'It’s kai@example.com.',
    answerTranslation: L(
      'kai@example.com이에요.',
      'kai@example.com.',
      'It’s kai@example.com.',
      'kai@example.com.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'email'],
  },

  en_s2u1_n5_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'My surname is Kowalski.' }],
    options: [
      'How do you spell that?',
      'What job Kowalski?',
      'Are surname?',
      'I’m spell.',
    ],
    answer: 'How do you spell that?',
    answerTranslation: L(
      '그걸 어떻게 철자해요?',
      'Bu qanday harflanadi?',
      'How do you spell that?',
      'Как это пишется?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'spelling'],
  },

  en_s2u1_n5_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I’m fluent in ___.',
    blankAnswers: ['English'],
    options: ['English', 'England', 'British', 'the UK'],
    answer: 'English',
    answerTranslation: L(
      '저는 영어를 유창하게 해요.',
      'Men ingliz tilida ravon gapiraman.',
      'I’m fluent in English.',
      'Я свободно говорю по-английски.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'languages'],
  },

  en_s2u1_n5_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Dubai is a very multicultural ___.',
    blankAnswers: ['city'],
    options: ['city', 'language', 'nationality', 'family'],
    answer: 'city',
    answerTranslation: L(
      '두바이는 매우 다문화적인 도시예요.',
      'Dubay juda ko‘p millatli shahar.',
      'Dubai is a very multicultural city.',
      'Дубай — очень многонациональный город.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'city'],
  },

  en_s2u1_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The main language of the UAE is ___.',
    blankAnswers: ['Arabic'],
    options: ['Arabic', 'Emirati', 'Urdu', 'English'],
    answer: 'Arabic',
    answerTranslation: L(
      '아랍에미리트의 주요 언어는 아랍어예요.',
      'BAAdagi asosiy til arab tili.',
      'The main language of the UAE is Arabic.',
      'Основной язык ОАЭ — арабский.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['unit-review', 'languages'],
  },

  en_s2u1_n5_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['from', 'Pakistan', 'are', 'They', 'Pakistani', 'is'],
    answer: 'They are from Pakistan',
    answerTranslation: L(
      '그들은 파키스탄 출신이에요.',
      'Ular Pokistondan.',
      'They are from Pakistan.',
      'Они из Пакистана.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'countries'],
  },

  en_s2u1_n5_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She is Vietnamese.',
    audioText: 'She is Vietnamese.',
    answerI18n: L(
      '그녀는 베트남인이에요',
      'U vyetnamlik',
      'She is Vietnamese',
      'Она вьетнамка',
    ),
    options: ['She', 'is', 'Vietnamese', 'Vietnam', 'are'],
    optionsI18n: {
      ko: ['그녀는', '베트남인이에요'],
      uz: ['U', 'vyetnamlik'],
      en: ['She', 'is', 'Vietnamese'],
      ru: ['Она', 'вьетнамка'],
    },
    answerTranslation: L(
      '그녀는 베트남인이에요.',
      'U vyetnamlik.',
      'She is Vietnamese.',
      'Она вьетнамка.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit-review', 'nationality'],
  },

  en_s2u1_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My name is Anna. I’m Polish and I speak Polish.',
    audioText: 'My name is Anna. I’m Polish and I speak Polish.',
    answerTranslation: L(
      '제 이름은 Anna예요. 저는 폴란드인이고 폴란드어를 해요.',
      'Mening ismim Anna. Men polshalikman va polyak tilida gapiraman.',
      'My name is Anna. I’m Polish and I speak Polish.',
      'Меня зовут Анна. Я полька и говорю по-польски.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'profile'],
  },

  en_s2u1_n5_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Countries, nationalities, languages and families.',
    audioText: 'Countries, nationalities, languages and families.',
    answerTranslation: L(
      '나라, 국적, 언어, 가족.',
      'Mamlakatlar, millatlar, tillar va oilalar.',
      'Countries, nationalities, languages and families.',
      'Страны, национальности, языки и семьи.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit-review', 'vocabulary'],
  },

  // ===========================================================
  // Lesson 4 · Unit 1 Grammar & Communication Review
  // ===========================================================

  en_s2u1_n5_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ from England.',
    blankAnswers: ['am'],
    options: ['am', 'is', 'are', 'be'],
    answer: 'am',
    answerTranslation: L(
      '저는 영국 출신이에요.',
      'Men Angliyadanman.',
      'I am from England.',
      'Я из Англии.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'be'],
  },

  en_s2u1_n5_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My parents ___ from Mexico.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'am', 'be'],
    answer: 'are',
    answerTranslation: L(
      '제 부모님은 멕시코 출신이에요.',
      'Ota-onam Meksikadan.',
      'My parents are from Mexico.',
      'Мои родители из Мексики.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'be'],
  },

  en_s2u1_n5_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ Canadian.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'am', 'be'],
    answer: 'is',
    answerTranslation: L(
      '그는 캐나다인이에요.',
      'U kanadalik.',
      'He is Canadian.',
      'Он канадец.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'be'],
  },

  en_s2u1_n5_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'No, he ___.',
    blankAnswers: ['isn’t'],
    options: ['isn’t', 'aren’t', 'am not', 'not'],
    answer: 'isn’t',
    answerTranslation: L('아니요, 아니에요.', 'Yo‘q.', 'No, he isn’t.', 'Нет.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'negative'],
  },

  en_s2u1_n5_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Are you from Australia?' }],
    options: ['Yes, I am.', 'Yes, I is.', 'Yes, I are.', 'Yes, am.'],
    answer: 'Yes, I am.',
    answerTranslation: L('네, 맞아요.', 'Ha.', 'Yes, I am.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'short-answer'],
  },

  en_s2u1_n5_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I love ___ family.',
    blankAnswers: ['my'],
    options: ['my', 'his', 'their', 'our'],
    answer: 'my',
    answerTranslation: L(
      '저는 제 가족을 사랑해요.',
      'Men oilamni yaxshi ko‘raman.',
      'I love my family.',
      'Я люблю свою семью.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'possessive'],
  },

  en_s2u1_n5_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She has a brother. ___ name is Ali.',
    blankAnswers: ['His'],
    options: ['His', 'Her', 'Our', 'My'],
    answer: 'His',
    answerTranslation: L(
      '그녀에게 남자 형제가 있어요. 그의 이름은 Ali예요.',
      'Uning akasi yoki ukasi bor. Uning ismi Ali.',
      'She has a brother. His name is Ali.',
      'У неё есть брат. Его зовут Али.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'possessive'],
  },

  en_s2u1_n5_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They live with ___ parents.',
    blankAnswers: ['their'],
    options: ['their', 'his', 'her', 'my'],
    answer: 'their',
    answerTranslation: L(
      '그들은 부모님과 함께 살아요.',
      'Ular ota-onalari bilan yashaydi.',
      'They live with their parents.',
      'Они живут со своими родителями.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'possessive'],
  },

  en_s2u1_n5_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Maria is Carlos___ sister.',
    blankAnswers: ['’s'],
    options: ['’s', 's', 'is', 'are'],
    answer: '’s',
    answerTranslation: L(
      'Maria는 Carlos의 여자 형제예요.',
      'Maria Carlosning opasi yoki singlisi.',
      'Maria is Carlos’s sister.',
      'Мария — сестра Карлоса.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'possessive-s'],
  },

  en_s2u1_n5_070_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'child → ',
    sentenceSuffix: '',
    answer: 'children',
    answerTranslation: L(
      'child의 복수형은 children이에요.',
      'Child so‘zining ko‘pligi children.',
      'The plural of child is children.',
      'Множественное число child — children.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the irregular plural children.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'plural'],
  },

  en_s2u1_n5_071_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'woman → ',
    sentenceSuffix: '',
    answer: 'women',
    answerTranslation: L(
      'woman의 복수형은 women이에요.',
      'Woman so‘zining ko‘pligi women.',
      'The plural of woman is women.',
      'Множественное число woman — women.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use the irregular plural women.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'plural'],
  },

  en_s2u1_n5_072_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: 'city → ',
    sentenceSuffix: '',
    answer: 'cities',
    answerTranslation: L(
      'city의 복수형은 cities예요.',
      'City so‘zining ko‘pligi cities.',
      'The plural of city is cities.',
      'Множественное число city — cities.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Change consonant + y to -ies: cities.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit-review', 'plural'],
  },

  en_s2u1_n5_073_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['your', 'What’s', 'name', 'is', 'you', 'job'],
    answer: 'What’s your name',
    audioText: 'What’s your name?',
    answerTranslation: L(
      '이름이 뭐예요?',
      'Ismingiz nima?',
      'What’s your name?',
      'Как вас зовут?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit-review', 'personal-information'],
  },

  en_s2u1_n5_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['your', 'What’s', 'job', 'nationality', 'email', 'is'],
    answer: 'What’s your job',
    answerTranslation: L(
      '직업이 뭐예요?',
      'Kasbingiz nima?',
      'What’s your job?',
      'Кем вы работаете?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'job'],
  },

  en_s2u1_n5_075_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What’s your nationality?',
    options: ['I’m', 'Mexican', 'Mexico', 'is', 'from'],
    answer: 'I’m Mexican',
    answerTranslation: L(
      '저는 멕시코인이에요.',
      'Men meksikalikman.',
      'I’m Mexican.',
      'Я мексиканец.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'nationality'],
  },

  en_s2u1_n5_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What languages do you speak?',
    options: ['I', 'speak', 'English', 'and', 'Spanish', 'nationality'],
    answer: 'I speak English and Spanish',
    answerTranslation: L(
      '저는 영어와 스페인어를 해요.',
      'Men ingliz va ispan tillarida gapiraman.',
      'I speak English and Spanish.',
      'Я говорю по-английски и по-испански.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'languages'],
  },

  en_s2u1_n5_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'My surname is Abdullaev.' }],
    options: [
      'Sorry, can you repeat that, please?',
      'I’m Abdullaev nationality.',
      'What job is surname?',
      'You are address.',
    ],
    answer: 'Sorry, can you repeat that, please?',
    answerTranslation: L(
      '죄송하지만 다시 말해 주시겠어요?',
      'Kechirasiz, yana takrorlay olasizmi?',
      'Sorry, can you repeat that, please?',
      'Извините, можете повторить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'checking-understanding'],
  },

  en_s2u1_n5_078_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do you spell your surname?' }],
    options: [
      'A-B-D-U-L-L-A-E-V.',
      'I’m Uzbek.',
      'I’m a student.',
      'My address is Seoul.',
    ],
    answer: 'A-B-D-U-L-L-A-E-V.',
    answerTranslation: L(
      'A-B-D-U-L-L-A-E-V.',
      'A-B-D-U-L-L-A-E-V.',
      'A-B-D-U-L-L-A-E-V.',
      'A-B-D-U-L-L-A-E-V.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit-review', 'spelling'],
  },

  en_s2u1_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'My name is Anna. I’m Polish. I speak Polish and English. I’m a student.',
    audioText:
      'My name is Anna. I’m Polish. I speak Polish and English. I’m a student.',
    answerTranslation: L(
      '제 이름은 Anna예요. 저는 폴란드인이에요. 폴란드어와 영어를 하고 학생이에요.',
      'Mening ismim Anna. Men polshalikman. Polyak va ingliz tillarida gapiraman. Men talabaman.',
      'My name is Anna. I’m Polish. I speak Polish and English. I’m a student.',
      'Меня зовут Анна. Я полька. Я говорю по-польски и по-английски. Я студентка.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['unit-review', 'profile'],
  },

  en_s2u1_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I can talk about countries, nationalities, languages, family and personal information.',
    audioText:
      'I can talk about countries, nationalities, languages, family and personal information.',
    answerTranslation: L(
      '저는 나라, 국적, 언어, 가족, 개인정보에 대해 말할 수 있어요.',
      'Men mamlakatlar, millatlar, tillar, oila va shaxsiy ma’lumotlar haqida gapira olaman.',
      'I can talk about countries, nationalities, languages, family and personal information.',
      'Я могу говорить о странах, национальностях, языках, семье и личной информации.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['unit-review', 'final'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT1_NODE5 = {
  title: L(
    '브라이턴 언어 교류와 종합 복습',
    'Brayton til almashinuvi va umumiy takrorlash',
    'Brighton language exchange and review',
    'Языковой обмен в Брайтоне и повторение',
  ),
  section: 2,
  unit: 1,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '브라이턴 언어 교류',
        'Brayton til almashinuvi',
        'Brighton language exchange',
        'Языковой обмен в Брайтоне',
      ),
      description: L(
        '영상에 나온 브라이턴의 장소와 언어 교류 활동에 필요한 어휘를 익혀요.',
        'Videodagi Brayton joylari va til almashinuvi faoliyati uchun kerakli so‘zlarni o‘rganasiz.',
        'Learn vocabulary for Brighton, its landmarks and the language exchange in the video.',
        'Изучаем лексику о Брайтоне, его местах и языковом обмене.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u1_n5_001_image_choice',
        'en_s2u1_n5_002_word_matching',
        'en_s2u1_n5_003_fill_in_blank',
        'en_s2u1_n5_004_speaking',
        'en_s2u1_n5_005_fill_in_blank',
        'en_s2u1_n5_006_fill_in_blank',
        'en_s2u1_n5_007_type_answer',
        'en_s2u1_n5_008_word_arrange',
        'en_s2u1_n5_009_sentence_builder',
        'en_s2u1_n5_010_image_choice',
        'en_s2u1_n5_011_fill_in_blank',
        'en_s2u1_n5_012_word_matching',
        'en_s2u1_n5_013_type_answer',
        'en_s2u1_n5_014_translate_builder',
        'en_s2u1_n5_015_fill_in_blank',
        'en_s2u1_n5_016_fill_in_blank',
        'en_s2u1_n5_017_dialog_complete',
        'en_s2u1_n5_018_speaking',
        'en_s2u1_n5_019_reply_builder',
        'en_s2u1_n5_020_speaking',
      ],
    },

    {
      title: L(
        '영어 실력 향상하기',
        'Ingliz tilini yaxshilash',
        'Improving your English',
        'Улучшаем английский',
      ),
      description: L(
        '말하기, 듣기, 읽기, 쓰기, 발음, 문법, 어휘를 구별하고 자신의 학습 목표를 말해요.',
        'Gapirish, tinglash, o‘qish, yozish, talaffuz, grammatika va lug‘atni farqlab, o‘rganish maqsadlaringizni aytasiz.',
        'Review speaking, listening, reading, writing, pronunciation, grammar and vocabulary and talk about what you want to improve.',
        'Повторяем говорение, аудирование, чтение, письмо, произношение, грамматику и лексику.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u1_n5_021_word_matching',
        'en_s2u1_n5_022_word_matching',
        'en_s2u1_n5_023_fill_in_blank',
        'en_s2u1_n5_024_fill_in_blank',
        'en_s2u1_n5_025_fill_in_blank',
        'en_s2u1_n5_026_fill_in_blank',
        'en_s2u1_n5_027_fill_in_blank',
        'en_s2u1_n5_028_fill_in_blank',
        'en_s2u1_n5_029_fill_in_blank',
        'en_s2u1_n5_030_speaking',
        'en_s2u1_n5_031_translate_builder',
        'en_s2u1_n5_032_word_arrange',
        'en_s2u1_n5_033_sentence_builder',
        'en_s2u1_n5_034_dialog_complete',
        'en_s2u1_n5_035_reply_builder',
        'en_s2u1_n5_036_type_answer',
        'en_s2u1_n5_037_type_answer',
        'en_s2u1_n5_038_speaking',
        'en_s2u1_n5_039_speaking',
        'en_s2u1_n5_040_speaking',
      ],
    },

    {
      title: L(
        'Unit 1 어휘 복습',
        'Unit 1 lug‘at takrori',
        'Unit 1 vocabulary review',
        'Повторение лексики Unit 1',
      ),
      description: L(
        '나라, 국적, 언어, 가족, 복수형, 개인정보 등 Unit 1의 핵심 어휘를 종합해서 복습해요.',
        'Mamlakatlar, millatlar, tillar, oila, ko‘plik va shaxsiy ma’lumotlar kabi Unit 1 so‘zlarini takrorlaysiz.',
        'Review the key Unit 1 vocabulary for countries, nationalities, languages, family, plurals and personal information.',
        'Повторяем основную лексику Unit 1: страны, национальности, языки, семью, множественное число и личную информацию.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u1_n5_041_word_matching',
        'en_s2u1_n5_042_word_matching',
        'en_s2u1_n5_043_word_matching',
        'en_s2u1_n5_044_fill_in_blank',
        'en_s2u1_n5_045_fill_in_blank',
        'en_s2u1_n5_046_word_matching',
        'en_s2u1_n5_047_fill_in_blank',
        'en_s2u1_n5_048_fill_in_blank',
        'en_s2u1_n5_049_word_matching',
        'en_s2u1_n5_050_dialog_complete',
        'en_s2u1_n5_051_dialog_complete',
        'en_s2u1_n5_052_dialog_complete',
        'en_s2u1_n5_053_dialog_complete',
        'en_s2u1_n5_054_fill_in_blank',
        'en_s2u1_n5_055_fill_in_blank',
        'en_s2u1_n5_056_fill_in_blank',
        'en_s2u1_n5_057_translate_builder',
        'en_s2u1_n5_058_sentence_builder',
        'en_s2u1_n5_059_speaking',
        'en_s2u1_n5_060_speaking',
      ],
    },

    {
      title: L(
        'Unit 1 최종 복습',
        'Unit 1 yakuniy takrorlash',
        'Unit 1 final review',
        'Итоговое повторение Unit 1',
      ),
      description: L(
        'be동사, 소유 표현, 복수형, 개인정보 질문과 자기소개를 종합해서 Unit 1을 마무리해요.',
        'Be fe’li, egalik shakllari, ko‘plik, shaxsiy ma’lumot savollari va tanishtirishni birgalikda takrorlaysiz.',
        'Finish Unit 1 with a cumulative review of be, possessives, plurals, personal-information questions and introductions.',
        'Завершаем Unit 1 повторением be, притяжательных форм, множественного числа, личных вопросов и представления.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u1_n5_061_fill_in_blank',
        'en_s2u1_n5_062_fill_in_blank',
        'en_s2u1_n5_063_fill_in_blank',
        'en_s2u1_n5_064_fill_in_blank',
        'en_s2u1_n5_065_dialog_complete',
        'en_s2u1_n5_066_fill_in_blank',
        'en_s2u1_n5_067_fill_in_blank',
        'en_s2u1_n5_068_fill_in_blank',
        'en_s2u1_n5_069_fill_in_blank',
        'en_s2u1_n5_070_type_answer',
        'en_s2u1_n5_071_type_answer',
        'en_s2u1_n5_072_type_answer',
        'en_s2u1_n5_073_word_arrange',
        'en_s2u1_n5_074_translate_builder',
        'en_s2u1_n5_075_reply_builder',
        'en_s2u1_n5_076_reply_builder',
        'en_s2u1_n5_077_dialog_complete',
        'en_s2u1_n5_078_dialog_complete',
        'en_s2u1_n5_079_speaking',
        'en_s2u1_n5_080_speaking',
      ],
    },
  ],
};
