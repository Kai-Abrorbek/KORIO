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

const FILL_INSTRUCTION = L(
  '빈칸에 알맞은 답을 고르세요.',
  'Bo‘sh joyga mos javobni tanlang.',
  'Choose the correct answer for the blank.',
  'Выберите правильный ответ для пропуска.',
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

const SENTENCE_BUILDER_INSTRUCTION = L(
  '단어를 올바른 순서로 배열해 영어 문장을 만드세요.',
  'So‘zlarni to‘g‘ri tartibda joylashtirib inglizcha gap tuzing.',
  'Put the words in the correct order to make an English sentence.',
  'Расположите слова в правильном порядке, чтобы составить предложение на английском языке.',
);

const SPEAK_INSTRUCTION = L(
  '영어를 듣고 따라 말하세요.',
  'Inglizcha gapni tinglang va takrorlang.',
  'Listen and repeat.',
  'Послушайте и повторите.',
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
// Section 2 · Unit 5 · Node 1
// 5.1 Shopping
//
// Coverage
// Vocabulary:
// - baker's
// - butcher's
// - cash
// - discount
// - newsagent's
// - online
// - return
// - sales
// - shopping centre
// - spend
//
// Workbook extension:
// - bread
// - meat
// - magazine
// - cash machine
// - credit card
//
// Grammar:
// - can / can't
// - could / couldn't
// - present possibility / ability
// - past possibility / ability
//
// Reading:
// - Shopping past and present
//
// Pronunciation:
// - can / can't
//
// IMPORTANT:
// *_WORDS에는 한 단어 headword만 등록.
// shopping centre / cash machine / credit card /
// vending machine 등 multi-word phrase는 WORD로 등록하지 않음.
//
// baker's / butcher's / newsagent's는 문제 표현에서 사용.
// WORD 등록은 baker / butcher / newsagent로 단일 headword 처리.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE1_WORDS = [
  {
    code: 'en-noun-baker',
    english: 'baker',
    senseKey: 'person-who-makes-and-sells-bread',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '제빵사',
      'nonvoy',
      'a person who makes or sells bread and cakes',
      'пекарь',
    ),
    examples: [
      {
        english: 'I buy bread from the baker’s.',
        translations: L(
          '저는 빵집에서 빵을 사요.',
          'Men nonni novvoyxonadan sotib olaman.',
          'I buy bread from the baker’s.',
          'Я покупаю хлеб в булочной.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbeɪkə/',
      ttsText: 'baker',
    },
    tags: ['shopping', 'shops', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-butcher',
    english: 'butcher',
    senseKey: 'person-who-sells-meat',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정육점 주인; 정육업자',
      'qassob',
      'a person who prepares and sells meat',
      'мясник',
    ),
    examples: [
      {
        english: 'I buy meat from the butcher’s.',
        translations: L(
          '저는 정육점에서 고기를 사요.',
          'Men go‘shtni qassob do‘konidan sotib olaman.',
          'I buy meat from the butcher’s.',
          'Я покупаю мясо в мясной лавке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbʊtʃə/',
      ttsText: 'butcher',
    },
    tags: ['shopping', 'shops', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-newsagent',
    english: 'newsagent',
    senseKey: 'person-or-shop-selling-newspapers-and-magazines',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '신문·잡지 판매원',
      'gazeta va jurnal sotuvchisi',
      'a person or shop that sells newspapers and magazines',
      'продавец газет и журналов',
    ),
    examples: [
      {
        english: 'I buy magazines from the newsagent’s.',
        translations: L(
          '저는 신문 가게에서 잡지를 사요.',
          'Men jurnallarni gazeta do‘konidan sotib olaman.',
          'I buy magazines from the newsagent’s.',
          'Я покупаю журналы в газетном киоске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnjuːzeɪdʒənt/',
      ttsText: 'newsagent',
    },
    tags: ['shopping', 'shops', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-cash',
    english: 'cash',
    senseKey: 'money-in-coins-or-notes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '현금',
      'naqd pul',
      'money in the form of coins or notes',
      'наличные',
    ),
    examples: [
      {
        english: 'I pay for small things with cash.',
        translations: L(
          '저는 작은 물건은 현금으로 계산해요.',
          'Men kichik narsalar uchun naqd pul bilan to‘layman.',
          'I pay for small things with cash.',
          'Я плачу наличными за небольшие покупки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kæʃ/',
      ttsText: 'cash',
    },
    tags: ['shopping', 'money', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-discount',
    english: 'discount',
    senseKey: 'reduction-in-price',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('할인', 'chegirma', 'a reduction in the usual price', 'скидка'),
    examples: [
      {
        english: 'Students can get a discount.',
        translations: L(
          '학생들은 할인을 받을 수 있어요.',
          'Talabalar chegirma olishlari mumkin.',
          'Students can get a discount.',
          'Студенты могут получить скидку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɪskaʊnt/',
      ttsText: 'discount',
    },
    tags: ['shopping', 'money', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-online',
    english: 'online',
    senseKey: 'using-the-internet',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '온라인으로',
      'onlayn',
      'using or connected to the internet',
      'онлайн',
    ),
    examples: [
      {
        english: 'I do a lot of my shopping online.',
        translations: L(
          '저는 쇼핑을 많이 온라인으로 해요.',
          'Men xaridlarimning ko‘pini onlayn qilaman.',
          'I do a lot of my shopping online.',
          'Я много покупаю онлайн.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌɒnˈlaɪn/',
      ttsText: 'online',
    },
    tags: ['shopping', 'internet', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-return',
    english: 'return',
    senseKey: 'take-item-back-to-shop',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '반품하다; 돌려주다',
      'qaytarmoq',
      'to take something back to a shop',
      'возвращать',
    ),
    examples: [
      {
        english: 'I return things I do not like.',
        translations: L(
          '저는 마음에 들지 않는 물건을 반품해요.',
          'Men yoqmagan narsalarni qaytaraman.',
          'I return things I do not like.',
          'Я возвращаю вещи, которые мне не нравятся.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈtɜːn/',
      ttsText: 'return',
    },
    tags: ['shopping', 'verbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sale',
    english: 'sale',
    senseKey: 'period-when-goods-are-sold-cheaper',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '세일; 할인 판매',
      'chegirmali savdo',
      'a period when a shop sells goods at lower prices',
      'распродажа',
    ),
    examples: [
      {
        english: 'I like shopping in the sales.',
        translations: L(
          '저는 세일 기간에 쇼핑하는 것을 좋아해요.',
          'Men chegirmali savdo paytida xarid qilishni yoqtiraman.',
          'I like shopping in the sales.',
          'Я люблю делать покупки во время распродаж.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/seɪl/',
      ttsText: 'sale',
    },
    tags: ['shopping', 'money', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-spend',
    english: 'spend',
    senseKey: 'use-money-to-buy-things',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '돈을 쓰다',
      'sarflamoq',
      'to use money to pay for things',
      'тратить',
    ),
    examples: [
      {
        english: 'I spend a lot of money at weekends.',
        translations: L(
          '저는 주말에 돈을 많이 써요.',
          'Men dam olish kunlari ko‘p pul sarflayman.',
          'I spend a lot of money at weekends.',
          'Я трачу много денег по выходным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/spend/',
      ttsText: 'spend',
    },
    tags: ['shopping', 'money', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bread',
    english: 'bread',
    senseKey: 'baked-food-made-from-flour',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '빵',
      'non',
      'food made from flour, water and usually yeast',
      'хлеб',
    ),
    examples: [
      {
        english: 'You can buy bread at the baker’s.',
        translations: L(
          '빵집에서 빵을 살 수 있어요.',
          'Novvoyxonadan non sotib olish mumkin.',
          'You can buy bread at the baker’s.',
          'В булочной можно купить хлеб.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bred/',
      ttsText: 'bread',
    },
    tags: ['shopping', 'food', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-meat',
    english: 'meat',
    senseKey: 'animal-flesh-eaten-as-food',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('고기', 'go‘sht', 'the flesh of animals eaten as food', 'мясо'),
    examples: [
      {
        english: 'The butcher’s sells meat.',
        translations: L(
          '정육점에서는 고기를 팔아요.',
          'Qassob do‘konida go‘sht sotiladi.',
          'The butcher’s sells meat.',
          'В мясной лавке продают мясо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/miːt/',
      ttsText: 'meat',
    },
    tags: ['shopping', 'food', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-magazine',
    english: 'magazine',
    senseKey: 'regular-publication-with-articles-and-pictures',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '잡지',
      'jurnal',
      'a publication with articles and pictures published regularly',
      'журнал',
    ),
    examples: [
      {
        english: 'I buy magazines at the newsagent’s.',
        translations: L(
          '저는 신문 가게에서 잡지를 사요.',
          'Men jurnallarni gazeta do‘konidan sotib olaman.',
          'I buy magazines at the newsagent’s.',
          'Я покупаю журналы в газетном киоске.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌmæɡəˈziːn/',
      ttsText: 'magazine',
    },
    tags: ['shopping', 'reading', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-centre',
    english: 'centre',
    senseKey: 'middle-or-main-area',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '중심; 센터',
      'markaz',
      'the middle or main part of a place',
      'центр',
    ),
    examples: [
      {
        english: 'There is a large shopping centre.',
        translations: L(
          '큰 쇼핑센터가 있어요.',
          'Katta savdo markazi bor.',
          'There is a large shopping centre.',
          'Есть большой торговый центр.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsentə/',
      ttsText: 'centre',
    },
    tags: ['shopping', 'places', 'unit5'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT5_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Shopping vocabulary
  // ===========================================================

  en_s2u5_n1_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: "baker's",
        native: 'novvoyxona',
        nativeI18n: L('빵집', 'novvoyxona', "baker's", 'булочная'),
      },
      {
        text: "butcher's",
        native: 'qassob do‘koni',
        nativeI18n: L('정육점', 'qassob do‘koni', "butcher's", 'мясная лавка'),
      },
      {
        text: "newsagent's",
        native: 'gazeta do‘koni',
        nativeI18n: L(
          '신문·잡지 가게',
          'gazeta do‘koni',
          "newsagent's",
          'газетный киоск',
        ),
      },
      {
        text: 'shopping centre',
        native: 'savdo markazi',
        nativeI18n: L(
          '쇼핑센터',
          'savdo markazi',
          'shopping centre',
          'торговый центр',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'shops'],
  },

  en_s2u5_n1_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'cash',
        native: 'naqd pul',
        nativeI18n: L('현금', 'naqd pul', 'cash', 'наличные'),
      },
      {
        text: 'discount',
        native: 'chegirma',
        nativeI18n: L('할인', 'chegirma', 'discount', 'скидка'),
      },
      {
        text: 'sales',
        native: 'chegirmali savdo',
        nativeI18n: L('세일', 'chegirmali savdo', 'sales', 'распродажи'),
      },
      {
        text: 'online',
        native: 'onlayn',
        nativeI18n: L('온라인으로', 'onlayn', 'online', 'онлайн'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping'],
  },

  en_s2u5_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'spend',
        native: 'sarflamoq',
        nativeI18n: L('돈을 쓰다', 'sarflamoq', 'spend', 'тратить'),
      },
      {
        text: 'return',
        native: 'qaytarmoq',
        nativeI18n: L('반품하다', 'qaytarmoq', 'return', 'возвращать'),
      },
      {
        text: 'bread',
        native: 'non',
        nativeI18n: L('빵', 'non', 'bread', 'хлеб'),
      },
      {
        text: 'meat',
        native: 'go‘sht',
        nativeI18n: L('고기', 'go‘sht', 'meat', 'мясо'),
      },
      {
        text: 'magazine',
        native: 'jurnal',
        nativeI18n: L('잡지', 'jurnal', 'magazine', 'журнал'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping'],
  },

  en_s2u5_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I buy bread from the ___.',
    blankAnswers: ["baker's"],
    options: ["baker's", "butcher's", "newsagent's", 'shopping centre'],
    answer: "baker's",
    answerTranslation: L(
      '저는 빵집에서 빵을 사요.',
      'Men nonni novvoyxonadan sotib olaman.',
      'I buy bread from the baker’s.',
      'Я покупаю хлеб в булочной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'bakers'],
  },

  en_s2u5_n1_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ a lot of money at weekends.',
    blankAnswers: ['spend'],
    options: ['spend', 'return', 'discount', 'cash'],
    answer: 'spend',
    answerTranslation: L(
      '저는 주말에 돈을 많이 써요.',
      'Men dam olish kunlari ko‘p pul sarflayman.',
      'I spend a lot of money at weekends.',
      'Я трачу много денег по выходным.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'spend'],
  },

  en_s2u5_n1_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I buy magazines and newspapers from the ___.',
    blankAnswers: ["newsagent's"],
    options: ["newsagent's", "baker's", "butcher's", 'chemist'],
    answer: "newsagent's",
    answerTranslation: L(
      '저는 신문 가게에서 잡지와 신문을 사요.',
      'Men jurnal va gazetalarni gazeta do‘konidan sotib olaman.',
      'I buy magazines and newspapers from the newsagent’s.',
      'Я покупаю журналы и газеты в газетном киоске.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'newsagents'],
  },

  en_s2u5_n1_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I buy meat from the ___.',
    blankAnswers: ["butcher's"],
    options: ["butcher's", "baker's", "newsagent's", 'library'],
    answer: "butcher's",
    answerTranslation: L(
      '저는 정육점에서 고기를 사요.',
      'Men go‘shtni qassob do‘konidan sotib olaman.',
      'I buy meat from the butcher’s.',
      'Я покупаю мясо в мясной лавке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'butchers'],
  },

  en_s2u5_n1_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I do a lot of my shopping ___.',
    blankAnswers: ['online'],
    options: ['online', 'cash', 'discount', 'return'],
    answer: 'online',
    answerTranslation: L(
      '저는 쇼핑을 많이 온라인으로 해요.',
      'Men xaridlarimning ko‘pini onlayn qilaman.',
      'I do a lot of my shopping online.',
      'Я много покупаю онлайн.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'online'],
  },

  en_s2u5_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I get a ___ because I’m a student.',
    blankAnswers: ['discount'],
    options: ['discount', 'cash', 'sale', 'return'],
    answer: 'discount',
    answerTranslation: L(
      '저는 학생이라서 할인을 받아요.',
      'Men talaba bo‘lganim uchun chegirma olaman.',
      'I get a discount because I’m a student.',
      'Я получаю скидку, потому что я студент.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'discount'],
  },

  en_s2u5_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I prefer a large ___ to lots of small shops.',
    blankAnswers: ['shopping centre'],
    options: ['shopping centre', "butcher's", "baker's", "newsagent's"],
    answer: 'shopping centre',
    answerTranslation: L(
      '저는 작은 가게 여러 곳보다 큰 쇼핑센터를 더 좋아해요.',
      'Men ko‘p kichik do‘konlardan ko‘ra katta savdo markazini afzal ko‘raman.',
      'I prefer a large shopping centre to lots of small shops.',
      'Я предпочитаю большой торговый центр множеству маленьких магазинов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['shopping', 'shopping-centre'],
  },

  en_s2u5_n1_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'When I buy something I don’t like, I ___ it to the shop.',
    blankAnswers: ['return'],
    options: ['return', 'spend', 'discount', 'cash'],
    answer: 'return',
    answerTranslation: L(
      '마음에 들지 않는 것을 사면 가게에 반품해요.',
      'Yoqmagan narsa sotib olsam, uni do‘konga qaytaraman.',
      'When I buy something I don’t like, I return it to the shop.',
      'Если мне не нравится покупка, я возвращаю её в магазин.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'return'],
  },

  en_s2u5_n1_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Some people wait for shops to open on the first day of the ___.',
    blankAnswers: ['sales'],
    options: ['sales', 'cash', 'discount', 'online'],
    answer: 'sales',
    answerTranslation: L(
      '어떤 사람들은 세일 첫날 가게가 열리기를 기다려요.',
      'Ba’zi odamlar chegirmali savdoning birinchi kuni do‘kon ochilishini kutadi.',
      'Some people wait for shops to open on the first day of the sales.',
      'Некоторые люди ждут открытия магазинов в первый день распродаж.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'sales'],
  },

  en_s2u5_n1_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I pay for small things with ___.',
    blankAnswers: ['cash'],
    options: ['cash', 'sales', 'return', 'online'],
    answer: 'cash',
    answerTranslation: L(
      '저는 작은 물건은 현금으로 계산해요.',
      'Men kichik narsalar uchun naqd pul bilan to‘layman.',
      'I pay for small things with cash.',
      'Я плачу наличными за небольшие покупки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'cash'],
  },

  en_s2u5_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A time when shops sell things at lower prices is a ___.',
    blankAnswers: ['sale'],
    options: ['sale', 'return', 'cash', 'centre'],
    answer: 'sale',
    answerTranslation: L(
      '가게가 더 낮은 가격에 물건을 파는 기간은 sale이에요.',
      'Do‘konlar narsalarni arzonroq sotadigan davr sale deyiladi.',
      'A time when shops sell things at lower prices is a sale.',
      'Период, когда магазины продают дешевле, называется распродажей.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'sale'],
  },

  en_s2u5_n1_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The butcher’s sells ___.',
    blankAnswers: ['meat'],
    options: ['meat', 'bread', 'magazines', 'books'],
    answer: 'meat',
    answerTranslation: L(
      '정육점에서는 고기를 팔아요.',
      'Qassob do‘konida go‘sht sotiladi.',
      'The butcher’s sells meat.',
      'В мясной лавке продают мясо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping', 'workbook'],
  },

  en_s2u5_n1_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'do', 'a', 'lot', 'of', 'shopping', 'online'],
    answer: 'I do a lot of shopping online',
    audioText: 'I do a lot of shopping online.',
    answerTranslation: L(
      '저는 온라인 쇼핑을 많이 해요.',
      'Men onlayn ko‘p xarid qilaman.',
      'I do a lot of shopping online.',
      'Я много покупаю онлайн.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['shopping'],
  },

  en_s2u5_n1_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'pay', 'for', 'small', 'things', 'with', 'cash'],
    answer: 'I pay for small things with cash',
    answerTranslation: L(
      '저는 작은 물건은 현금으로 계산해요.',
      'Men kichik narsalar uchun naqd pul bilan to‘layman.',
      'I pay for small things with cash.',
      'Я плачу наличными за небольшие покупки.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['shopping'],
  },

  en_s2u5_n1_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I buy magazines from the newsagent’s.',
    audioText: 'I buy magazines from the newsagent’s.',
    answerI18n: L(
      '저는 신문 가게에서 잡지를 사요',
      'Men jurnallarni gazeta do‘konidan sotib olaman',
      'I buy magazines from the newsagent’s',
      'Я покупаю журналы в газетном киоске',
    ),
    options: ['I', 'buy', 'magazines', 'from', 'the', 'newsagent’s.'],
    optionsI18n: {
      ko: ['저는', '신문', '가게에서', '잡지를', '사요'],
      uz: ['Men', 'jurnallarni', 'gazeta', 'do‘konidan', 'sotib', 'olaman'],
      en: ['I', 'buy', 'magazines', 'from', 'the', 'newsagent’s.'],
      ru: ['Я', 'покупаю', 'журналы', 'в', 'газетном', 'киоске'],
    },
    answerTranslation: L(
      '저는 신문 가게에서 잡지를 사요.',
      'Men jurnallarni gazeta do‘konidan sotib olaman.',
      'I buy magazines from the newsagent’s.',
      'Я покупаю журналы в газетном киоске.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['shopping'],
  },

  en_s2u5_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I buy bread at the baker’s, meat at the butcher’s and magazines at the newsagent’s.',
    audioText:
      'I buy bread at the baker’s, meat at the butcher’s and magazines at the newsagent’s.',
    answerTranslation: L(
      '저는 빵집에서 빵을, 정육점에서 고기를, 신문 가게에서 잡지를 사요.',
      'Men novvoyxonadan non, qassob do‘konidan go‘sht va gazeta do‘konidan jurnal sotib olaman.',
      'I buy bread at the baker’s, meat at the butcher’s and magazines at the newsagent’s.',
      'Я покупаю хлеб в булочной, мясо в мясной лавке и журналы в газетном киоске.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping', 'review'],
  },

  en_s2u5_n1_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I sometimes shop online, I often pay with cash, and I like getting a discount.',
    audioText:
      'I sometimes shop online, I often pay with cash, and I like getting a discount.',
    answerTranslation: L(
      '저는 가끔 온라인 쇼핑을 하고 자주 현금으로 계산하며 할인받는 것을 좋아해요.',
      'Men ba’zan onlayn xarid qilaman, ko‘pincha naqd pul bilan to‘layman va chegirma olishni yoqtiraman.',
      'I sometimes shop online, I often pay with cash, and I like getting a discount.',
      'Я иногда покупаю онлайн, часто плачу наличными и люблю получать скидки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Shopping past and present
  // ===========================================================

  en_s2u5_n1_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In the past, people often paid for things with ___.',
    blankAnswers: ['cash'],
    options: ['cash', 'online', 'sales', 'return'],
    answer: 'cash',
    answerTranslation: L(
      '과거에는 사람들이 물건값을 현금으로 내는 경우가 많았어요.',
      'Ilgari odamlar ko‘pincha narsalar uchun naqd pul bilan to‘lashgan.',
      'In the past, people often paid for things with cash.',
      'Раньше люди часто платили наличными.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today many people do their shopping ___.',
    blankAnswers: ['online'],
    options: ['online', 'cash', 'return', 'discount'],
    answer: 'online',
    answerTranslation: L(
      '오늘날 많은 사람들이 온라인으로 쇼핑해요.',
      'Bugun ko‘p odamlar onlayn xarid qiladi.',
      'Today many people do their shopping online.',
      'Сегодня многие люди делают покупки онлайн.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_023_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where did people often buy bread in the past?',
      },
    ],
    options: [
      'At a local baker’s.',
      'At an airport.',
      'At a museum.',
      'At a theatre.',
    ],
    answer: 'At a local baker’s.',
    answerTranslation: L(
      '동네 빵집에서요.',
      'Mahalliy novvoyxonadan.',
      'At a local baker’s.',
      'В местной булочной.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-past-present', 'reading'],
  },

  en_s2u5_n1_024_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where do many people buy food today?',
      },
    ],
    options: [
      'In supermarkets.',
      'In museums.',
      'In theatres.',
      'In libraries.',
    ],
    answer: 'In supermarkets.',
    answerTranslation: L(
      '슈퍼마켓에서요.',
      'Supermarketlarda.',
      'In supermarkets.',
      'В супермаркетах.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-past-present', 'reading'],
  },

  en_s2u5_n1_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People can shop from ___ now.',
    blankAnswers: ['home'],
    options: ['home', 'museum', 'airport', 'school'],
    answer: 'home',
    answerTranslation: L(
      '이제 사람들은 집에서도 쇼핑할 수 있어요.',
      'Endi odamlar uydan xarid qilishlari mumkin.',
      'People can shop from home now.',
      'Теперь люди могут делать покупки из дома.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Online shopping has become more ___.',
    blankAnswers: ['common'],
    options: ['common', 'impossible', 'underground', 'empty'],
    answer: 'common',
    answerTranslation: L(
      '온라인 쇼핑은 더 흔해졌어요.',
      'Onlayn xarid qilish yanada keng tarqaldi.',
      'Online shopping has become more common.',
      'Онлайн-покупки стали более распространёнными.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A cash ___ gives people money from their bank account.',
    blankAnswers: ['machine'],
    options: ['machine', 'centre', 'sale', 'discount'],
    answer: 'machine',
    answerTranslation: L(
      '현금 인출기는 은행 계좌에서 돈을 인출하게 해 줘요.',
      'Bankomat odamga bank hisobidan pul olish imkonini beradi.',
      'A cash machine gives people money from their bank account.',
      'Банкомат позволяет снять деньги со счёта.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-past-present', 'cash-machine'],
  },

  en_s2u5_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People can use a credit ___ in many shops.',
    blankAnswers: ['card'],
    options: ['card', 'sale', 'centre', 'return'],
    answer: 'card',
    answerTranslation: L(
      '많은 가게에서 신용카드를 사용할 수 있어요.',
      'Ko‘p do‘konlarda kredit kartadan foydalanish mumkin.',
      'People can use a credit card in many shops.',
      'Во многих магазинах можно пользоваться кредитной картой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-past-present', 'credit-card'],
  },

  en_s2u5_n1_029_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can people shop without leaving home today?',
      },
    ],
    options: [
      'Yes, they can.',
      'No, they can’t.',
      'Yes, they could.',
      'No, they couldn’t.',
    ],
    answer: 'Yes, they can.',
    answerTranslation: L(
      '네, 할 수 있어요.',
      'Ha, mumkin.',
      'Yes, they can.',
      'Да, могут.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-past-present', 'can'],
  },

  en_s2u5_n1_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Could people shop online before the internet?',
      },
    ],
    options: [
      'No, they couldn’t.',
      'Yes, they can.',
      'No, they can’t.',
      'Yes, they could.',
    ],
    answer: 'No, they couldn’t.',
    answerTranslation: L(
      '아니요, 할 수 없었어요.',
      'Yo‘q, ular buni qila olmagan.',
      'No, they couldn’t.',
      'Нет, не могли.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-past-present', 'could'],
  },

  en_s2u5_n1_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today you can ___ for many things online.',
    blankAnswers: ['pay'],
    options: ['pay', 'paid', 'paying', 'pays'],
    answer: 'pay',
    answerTranslation: L(
      '오늘날 많은 물건값을 온라인으로 지불할 수 있어요.',
      'Bugun ko‘p narsalar uchun onlayn to‘lash mumkin.',
      'Today you can pay for many things online.',
      'Сегодня за многое можно платить онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shopping-past-present', 'can'],
  },

  en_s2u5_n1_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In the past, people ___ buy things from local shops.',
    blankAnswers: ['could'],
    options: ['could', 'can', 'can’t', 'are'],
    answer: 'could',
    answerTranslation: L(
      '과거에도 사람들은 동네 가게에서 물건을 살 수 있었어요.',
      'Ilgari odamlar mahalliy do‘konlardan narsalar sotib olishlari mumkin edi.',
      'In the past, people could buy things from local shops.',
      'Раньше люди могли покупать товары в местных магазинах.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shopping-past-present', 'could'],
  },

  en_s2u5_n1_033_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['People', 'can', 'shop', 'online', 'today'],
    answer: 'People can shop online today',
    audioText: 'People can shop online today.',
    answerTranslation: L(
      '오늘날 사람들은 온라인 쇼핑을 할 수 있어요.',
      'Bugun odamlar onlayn xarid qilishlari mumkin.',
      'People can shop online today.',
      'Сегодня люди могут покупать онлайн.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_034_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['People', 'could', 'pay', 'with', 'cash'],
    answer: 'People could pay with cash',
    answerTranslation: L(
      '사람들은 현금으로 계산할 수 있었어요.',
      'Odamlar naqd pul bilan to‘lashlari mumkin edi.',
      'People could pay with cash.',
      'Люди могли платить наличными.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_035_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Today people can shop without leaving home.',
    audioText: 'Today people can shop without leaving home.',
    answerI18n: L(
      '오늘날 사람들은 집을 나가지 않고 쇼핑할 수 있어요',
      'Bugun odamlar uydan chiqmasdan xarid qilishlari mumkin',
      'Today people can shop without leaving home',
      'Сегодня люди могут делать покупки, не выходя из дома',
    ),
    options: ['Today', 'people', 'can', 'shop', 'without', 'leaving', 'home.'],
    optionsI18n: {
      ko: [
        '오늘날',
        '사람들은',
        '집을',
        '나가지',
        '않고',
        '쇼핑할',
        '수',
        '있어요',
      ],
      uz: [
        'Bugun',
        'odamlar',
        'uydan',
        'chiqmasdan',
        'xarid',
        'qilishlari',
        'mumkin',
      ],
      en: ['Today', 'people', 'can', 'shop', 'without', 'leaving', 'home.'],
      ru: [
        'Сегодня',
        'люди',
        'могут',
        'делать',
        'покупки',
        'не',
        'выходя',
        'из',
        'дома',
      ],
    },
    answerTranslation: L(
      '오늘날 사람들은 집을 나가지 않고 쇼핑할 수 있어요.',
      'Bugun odamlar uydan chiqmasdan xarid qilishlari mumkin.',
      'Today people can shop without leaving home.',
      'Сегодня люди могут делать покупки, не выходя из дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_036_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'In the past, people often bought food from local shops.',
    audioText: 'In the past, people often bought food from local shops.',
    answerTranslation: L(
      '과거에는 사람들이 동네 가게에서 음식을 자주 샀어요.',
      'Ilgari odamlar oziq-ovqatni ko‘pincha mahalliy do‘konlardan sotib olishgan.',
      'In the past, people often bought food from local shops.',
      'Раньше люди часто покупали продукты в местных магазинах.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Today many people spend money in supermarkets and shopping centres.',
    audioText:
      'Today many people spend money in supermarkets and shopping centres.',
    answerTranslation: L(
      '오늘날 많은 사람들은 슈퍼마켓과 쇼핑센터에서 돈을 써요.',
      'Bugun ko‘p odamlar supermarket va savdo markazlarida pul sarflaydi.',
      'Today many people spend money in supermarkets and shopping centres.',
      'Сегодня многие люди тратят деньги в супермаркетах и торговых центрах.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'People can use cash machines to get money from their bank accounts.',
    audioText:
      'People can use cash machines to get money from their bank accounts.',
    answerTranslation: L(
      '사람들은 현금 인출기를 사용해 은행 계좌에서 돈을 찾을 수 있어요.',
      'Odamlar bankomat orqali bank hisobidan pul olishlari mumkin.',
      'People can use cash machines to get money from their bank accounts.',
      'Люди могут снимать деньги со своих счетов через банкоматы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Shopping has changed because people can now buy many things online.',
    audioText:
      'Shopping has changed because people can now buy many things online.',
    answerTranslation: L(
      '이제 많은 물건을 온라인으로 살 수 있기 때문에 쇼핑 방식이 변했어요.',
      'Endi ko‘p narsalarni onlayn sotib olish mumkinligi sababli xarid qilish o‘zgardi.',
      'Shopping has changed because people can now buy many things online.',
      'Покупки изменились, потому что теперь многое можно покупать онлайн.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-past-present'],
  },

  en_s2u5_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The workbook compares local shops, supermarkets, shopping centres and online shopping.',
    audioText:
      'The workbook compares local shops, supermarkets, shopping centres and online shopping.',
    answerTranslation: L(
      'Workbook에서는 동네 가게, 슈퍼마켓, 쇼핑센터와 온라인 쇼핑을 비교해요.',
      'Workbook mahalliy do‘konlar, supermarketlar, savdo markazlari va onlayn xaridni taqqoslaydi.',
      'The workbook compares local shops, supermarkets, shopping centres and online shopping.',
      'Workbook сравнивает местные магазины, супермаркеты, торговые центры и онлайн-покупки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-past-present', 'review'],
  },

  // ===========================================================
  // Lesson 3 · can / can't / could / couldn't
  // ===========================================================

  en_s2u5_n1_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'We use ___ to talk about present ability or possibility.',
    blankAnswers: ['can'],
    options: ['can', 'could', 'couldn’t', 'was'],
    answer: 'can',
    answerTranslation: L(
      '현재의 능력이나 가능성은 can으로 말해요.',
      'Hozirgi qobiliyat yoki imkoniyat haqida can bilan gapiramiz.',
      'We use can to talk about present ability or possibility.',
      'Can используется для способности или возможности в настоящем.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We use ___ to talk about past ability or possibility.',
    blankAnswers: ['could'],
    options: ['could', 'can', 'can’t', 'is'],
    answer: 'could',
    answerTranslation: L(
      '과거의 능력이나 가능성은 could로 말해요.',
      'O‘tgan zamondagi qobiliyat yoki imkoniyat haqida could bilan gapiramiz.',
      'We use could to talk about past ability or possibility.',
      'Could используется для способности или возможности в прошлом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The negative form of “can” is ___.',
    blankAnswers: ["can't"],
    options: ["can't", "couldn't", 'doesn’t can', 'not can'],
    answer: "can't",
    answerTranslation: L(
      'can의 부정형은 can’t예요.',
      'Can ning inkor shakli can’t.',
      'The negative form of can is can’t.',
      'Отрицательная форма can — can’t.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The negative form of “could” is ___.',
    blankAnswers: ["couldn't"],
    options: ["couldn't", "can't", 'didn’t could', 'not could'],
    answer: "couldn't",
    answerTranslation: L(
      'could의 부정형은 couldn’t예요.',
      'Could ning inkor shakli couldn’t.',
      'The negative form of could is couldn’t.',
      'Отрицательная форма could — couldn’t.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ buy things online today.',
    blankAnswers: ['can'],
    options: ['can', 'could', "couldn't", 'were'],
    answer: 'can',
    answerTranslation: L(
      '오늘날 사람들은 온라인으로 물건을 살 수 있어요.',
      'Bugun odamlar narsalarni onlayn sotib olishlari mumkin.',
      'People can buy things online today.',
      'Сегодня люди могут покупать товары онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'shopping'],
  },

  en_s2u5_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ shop online before the internet.',
    blankAnswers: ["couldn't"],
    options: ["couldn't", 'can', 'could', 'are'],
    answer: "couldn't",
    answerTranslation: L(
      '인터넷 이전에는 온라인 쇼핑을 할 수 없었어요.',
      'Internetdan oldin odamlar onlayn xarid qila olmas edi.',
      'People couldn’t shop online before the internet.',
      'До появления интернета люди не могли покупать онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'shopping'],
  },

  en_s2u5_n1_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today you ___ get money from a cash machine.',
    blankAnswers: ['can'],
    options: ['can', "can't", "couldn't", 'did'],
    answer: 'can',
    answerTranslation: L(
      '오늘날 현금 인출기에서 돈을 찾을 수 있어요.',
      'Bugun bankomatdan pul olish mumkin.',
      'Today you can get money from a cash machine.',
      'Сегодня можно снять деньги в банкомате.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'cash-machine'],
  },

  en_s2u5_n1_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Before cash machines, people ___ get money from their bank.',
    blankAnswers: ['could'],
    options: ['could', 'can', "can't", 'do'],
    answer: 'could',
    answerTranslation: L(
      '현금 인출기가 생기기 전에도 사람들은 은행에서 돈을 찾을 수 있었어요.',
      'Bankomatlardan oldin odamlar bankdan pul olishlari mumkin edi.',
      'Before cash machines, people could get money from their bank.',
      'До банкоматов люди могли получать деньги в банке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Before cash machines, people ___ take money from a machine.',
    blankAnswers: ["couldn't"],
    options: ["couldn't", 'could', 'can', 'are'],
    answer: "couldn't",
    answerTranslation: L(
      '현금 인출기가 생기기 전에는 기계에서 돈을 찾을 수 없었어요.',
      'Bankomatlardan oldin odamlar mashinadan pul ola olmas edi.',
      'Before cash machines, people couldn’t take money from a machine.',
      'До появления банкоматов люди не могли снимать деньги из автомата.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ have a haircut online.',
    blankAnswers: ["can't"],
    options: ["can't", 'can', 'could', 'are'],
    answer: "can't",
    answerTranslation: L(
      '온라인으로 머리를 자를 수는 없어요.',
      'Onlayn tarzda soch oldirib bo‘lmaydi.',
      'You can’t have a haircut online.',
      'Нельзя постричься онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ find most things you need online.',
    blankAnswers: ['can'],
    options: ['can', "can't", "couldn't", 'were'],
    answer: 'can',
    answerTranslation: L(
      '필요한 대부분의 물건은 온라인에서 찾을 수 있어요.',
      'Kerakli narsalarning ko‘pini onlayn topish mumkin.',
      'You can find most things you need online.',
      'Большинство нужных вещей можно найти онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'online'],
  },

  en_s2u5_n1_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In the past, people ___ pay with cash.',
    blankAnswers: ['could'],
    options: ['could', "couldn't", "can't", 'do'],
    answer: 'could',
    answerTranslation: L(
      '과거에도 사람들은 현금으로 계산할 수 있었어요.',
      'Ilgari ham odamlar naqd pul bilan to‘lashlari mumkin edi.',
      'In the past, people could pay with cash.',
      'Раньше люди могли платить наличными.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'cash'],
  },

  en_s2u5_n1_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ use credit cards before they existed.',
    blankAnswers: ["couldn't"],
    options: ["couldn't", 'could', 'can', 'are'],
    answer: "couldn't",
    answerTranslation: L(
      '신용카드가 생기기 전에는 사용할 수 없었어요.',
      'Kredit kartalar paydo bo‘lishidan oldin ulardan foydalanib bo‘lmas edi.',
      'People couldn’t use credit cards before they existed.',
      'До появления кредитных карт люди не могли ими пользоваться.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'credit-card'],
  },

  en_s2u5_n1_054_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can you buy plane tickets online today?' },
    ],
    options: [
      'Yes, you can.',
      'Yes, you could.',
      'No, you couldn’t.',
      'Yes, you are.',
    ],
    answer: 'Yes, you can.',
    answerTranslation: L(
      '네, 살 수 있어요.',
      'Ha, mumkin.',
      'Yes, you can.',
      'Да, можно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_055_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Could people buy things online in 1970?' },
    ],
    options: [
      'No, they couldn’t.',
      'Yes, they can.',
      'No, they can’t today.',
      'Yes, they are.',
    ],
    answer: 'No, they couldn’t.',
    answerTranslation: L(
      '아니요, 살 수 없었어요.',
      'Yo‘q, ular sotib ola olmas edi.',
      'No, they couldn’t.',
      'Нет, не могли.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['People', 'can', 'buy', 'things', 'online', 'now'],
    answer: 'People can buy things online now',
    audioText: 'People can buy things online now.',
    answerTranslation: L(
      '이제 사람들은 온라인으로 물건을 살 수 있어요.',
      'Endi odamlar narsalarni onlayn sotib olishlari mumkin.',
      'People can buy things online now.',
      'Теперь люди могут покупать товары онлайн.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['People', 'couldn’t', 'shop', 'online', 'in', '1970'],
    answer: 'People couldn’t shop online in 1970',
    answerTranslation: L(
      '1970년에는 온라인 쇼핑을 할 수 없었어요.',
      '1970-yilda odamlar onlayn xarid qila olmas edi.',
      'People couldn’t shop online in 1970.',
      'В 1970 году люди не могли делать покупки онлайн.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Today you can buy many things from home.',
    audioText: 'Today you can buy many things from home.',
    answerI18n: L(
      '오늘날 집에서 많은 물건을 살 수 있어요',
      'Bugun uydan turib ko‘p narsalarni sotib olish mumkin',
      'Today you can buy many things from home',
      'Сегодня многое можно покупать из дома',
    ),
    options: ['Today', 'you', 'can', 'buy', 'many', 'things', 'from', 'home.'],
    optionsI18n: {
      ko: ['오늘날', '집에서', '많은', '물건을', '살', '수', '있어요'],
      uz: [
        'Bugun',
        'uydan',
        'turib',
        'ko‘p',
        'narsalarni',
        'sotib',
        'olish',
        'mumkin',
      ],
      en: ['Today', 'you', 'can', 'buy', 'many', 'things', 'from', 'home.'],
      ru: ['Сегодня', 'можно', 'покупать', 'многое', 'из', 'дома'],
    },
    answerTranslation: L(
      '오늘날 집에서 많은 물건을 살 수 있어요.',
      'Bugun uydan turib ko‘p narsalarni sotib olish mumkin.',
      'Today you can buy many things from home.',
      'Сегодня многое можно покупать из дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['can-could'],
  },

  en_s2u5_n1_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Can talks about ability and possibility now, and could talks about ability and possibility in the past.',
    audioText:
      'Can talks about ability and possibility now, and could talks about ability and possibility in the past.',
    answerTranslation: L(
      'can은 현재의 능력과 가능성을, could는 과거의 능력과 가능성을 나타내요.',
      'Can hozirgi qobiliyat va imkoniyatni, could esa o‘tgan zamondagisini bildiradi.',
      'Can talks about ability and possibility now, and could talks about ability and possibility in the past.',
      'Can выражает способность и возможность сейчас, а could — в прошлом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['can-could', 'review'],
  },

  en_s2u5_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The negative forms are can’t for the present and couldn’t for the past.',
    audioText:
      'The negative forms are can’t for the present and couldn’t for the past.',
    answerTranslation: L(
      '부정형은 현재에는 can’t, 과거에는 couldn’t를 사용해요.',
      'Inkor shakllari hozirgi zamonda can’t, o‘tgan zamonda couldn’t.',
      'The negative forms are can’t for the present and couldn’t for the past.',
      'Отрицательные формы: can’t для настоящего и couldn’t для прошлого.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['can-could', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Shopping then and now + pronunciation
  // ===========================================================

  en_s2u5_n1_061_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can people buy things online today?' },
    ],
    options: [
      'Yes, they can.',
      'No, they couldn’t.',
      'Yes, they could yesterday only.',
      'No, they are.',
    ],
    answer: 'Yes, they can.',
    answerTranslation: L(
      '네, 살 수 있어요.',
      'Ha, mumkin.',
      'Yes, they can.',
      'Да, могут.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Could people use the internet in the 1970s?' },
    ],
    options: [
      'No, they couldn’t.',
      'Yes, they can.',
      'Yes, they could.',
      'No, they don’t.',
    ],
    answer: 'No, they couldn’t.',
    answerTranslation: L(
      '아니요, 사용할 수 없었어요.',
      'Yo‘q, ular foydalana olmagan.',
      'No, they couldn’t.',
      'Нет, не могли.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_063_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can you buy plane tickets online?' },
    ],
    options: [
      'Yes, I can.',
      'Yes, I could.',
      'No, I couldn’t in the present.',
      'Yes, I am.',
    ],
    answer: 'Yes, I can.',
    answerTranslation: L(
      '네, 살 수 있어요.',
      'Ha, sotib ola olaman.',
      'Yes, I can.',
      'Да, могу.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In “I can shop online”, can is usually pronounced ___.',
    blankAnswers: ['weakly'],
    options: ['weakly', 'as a noun', 'silently', 'twice'],
    answer: 'weakly',
    answerTranslation: L(
      'I can shop online에서 can은 보통 약하게 발음돼요.',
      'I can shop online gapida can odatda kuchsiz talaffuz qilinadi.',
      'In “I can shop online”, can is usually pronounced weakly.',
      'В “I can shop online” слово can обычно произносится слабо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['pronunciation', 'can'],
  },

  en_s2u5_n1_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can book the theatre tickets online.',
    audioText: 'I can book the theatre tickets online.',
    answerTranslation: L(
      '극장 표를 온라인으로 예약할 수 있어요.',
      'Teatr chiptalarini onlayn bron qila olaman.',
      'I can book the theatre tickets online.',
      'Я могу забронировать билеты в театр онлайн.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'can'],
  },

  en_s2u5_n1_066_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, but we can book them by phone.',
    audioText: 'No, but we can book them by phone.',
    answerTranslation: L(
      '아니요, 하지만 전화로 예약할 수 있어요.',
      'Yo‘q, lekin ularni telefon orqali bron qilishimiz mumkin.',
      'No, but we can book them by phone.',
      'Нет, но мы можем забронировать их по телефону.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['pronunciation', 'can'],
  },

  en_s2u5_n1_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can he play a musical instrument?',
    audioText: 'Can he play a musical instrument?',
    answerTranslation: L(
      '그는 악기를 연주할 수 있나요?',
      'U musiqa asbobini chala oladimi?',
      'Can he play a musical instrument?',
      'Он умеет играть на музыкальном инструменте?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'can'],
  },

  en_s2u5_n1_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, he can.',
    audioText: 'Yes, he can.',
    answerTranslation: L(
      '네, 할 수 있어요.',
      'Ha, qila oladi.',
      'Yes, he can.',
      'Да, умеет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'can'],
  },

  en_s2u5_n1_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today people ___ buy tickets online.',
    blankAnswers: ['can'],
    options: ['can', "couldn't", 'could only in the past', 'were'],
    answer: 'can',
    answerTranslation: L(
      '오늘날 사람들은 온라인으로 표를 살 수 있어요.',
      'Bugun odamlar chiptalarni onlayn sotib olishlari mumkin.',
      'Today people can buy tickets online.',
      'Сегодня люди могут покупать билеты онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Children ___ play outside in the past.',
    blankAnswers: ['could'],
    options: ['could', 'can only now', "couldn't", 'are'],
    answer: 'could',
    answerTranslation: L(
      '과거에도 아이들은 밖에서 놀 수 있었어요.',
      'Ilgari bolalar tashqarida o‘ynay olishgan.',
      'Children could play outside in the past.',
      'Раньше дети могли играть на улице.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ buy most things online now.',
    blankAnswers: ['can'],
    options: ['can', "can't", "couldn't", 'did'],
    answer: 'can',
    answerTranslation: L(
      '이제 대부분의 물건을 온라인으로 살 수 있어요.',
      'Endi odamlar ko‘p narsalarni onlayn sotib olishlari mumkin.',
      'People can buy most things online now.',
      'Теперь люди могут покупать большинство вещей онлайн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ swim in the sea if the weather is dangerous.',
    blankAnswers: ["can't"],
    options: ["can't", 'can', 'could', 'are'],
    answer: "can't",
    answerTranslation: L(
      '날씨가 위험하면 바다에서 수영할 수 없어요.',
      'Ob-havo xavfli bo‘lsa, dengizda suzib bo‘lmaydi.',
      'You can’t swim in the sea if the weather is dangerous.',
      'Нельзя плавать в море, если погода опасная.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['can-could', 'review'],
  },

  en_s2u5_n1_073_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Can', 'you', 'buy', 'plane', 'tickets', 'online'],
    answer: 'Can you buy plane tickets online',
    audioText: 'Can you buy plane tickets online?',
    answerTranslation: L(
      '비행기 표를 온라인으로 살 수 있나요?',
      'Samolyot chiptalarini onlayn sotib olish mumkinmi?',
      'Can you buy plane tickets online?',
      'Можно купить билеты на самолёт онлайн?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['People', 'could', 'pay', 'with', 'cash', 'in', 'the', 'past'],
    answer: 'People could pay with cash in the past',
    answerTranslation: L(
      '과거에도 사람들은 현금으로 계산할 수 있었어요.',
      'Ilgari odamlar naqd pul bilan to‘lashlari mumkin edi.',
      'People could pay with cash in the past.',
      'Раньше люди могли платить наличными.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['can-could'],
  },

  en_s2u5_n1_075_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'People couldn’t shop online before the internet.',
    audioText: 'People couldn’t shop online before the internet.',
    answerI18n: L(
      '인터넷 이전에는 사람들이 온라인 쇼핑을 할 수 없었어요',
      'Internetdan oldin odamlar onlayn xarid qila olmas edi',
      'People couldn’t shop online before the internet',
      'До появления интернета люди не могли покупать онлайн',
    ),
    options: [
      'People',
      'couldn’t',
      'shop',
      'online',
      'before',
      'the',
      'internet.',
    ],
    optionsI18n: {
      ko: [
        '인터넷',
        '이전에는',
        '사람들이',
        '온라인',
        '쇼핑을',
        '할',
        '수',
        '없었어요',
      ],
      uz: [
        'Internetdan',
        'oldin',
        'odamlar',
        'onlayn',
        'xarid',
        'qila',
        'olmas',
        'edi',
      ],
      en: [
        'People',
        'couldn’t',
        'shop',
        'online',
        'before',
        'the',
        'internet.',
      ],
      ru: [
        'До',
        'появления',
        'интернета',
        'люди',
        'не',
        'могли',
        'покупать',
        'онлайн',
      ],
    },
    answerTranslation: L(
      '인터넷 이전에는 사람들이 온라인 쇼핑을 할 수 없었어요.',
      'Internetdan oldin odamlar onlayn xarid qila olmas edi.',
      'People couldn’t shop online before the internet.',
      'До появления интернета люди не могли покупать онлайн.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['can-could'],
  },

  en_s2u5_n1_076_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can you use cash in shops today?' }],
    options: [
      'Yes, you can.',
      'No, you couldn’t.',
      'Yes, you could only in the past.',
      'No, you are not.',
    ],
    answer: 'Yes, you can.',
    answerTranslation: L(
      '네, 사용할 수 있어요.',
      'Ha, foydalanish mumkin.',
      'Yes, you can.',
      'Да, можно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-could', 'shopping'],
  },

  en_s2u5_n1_077_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Could people use cash machines before they existed?',
      },
    ],
    options: [
      'No, they couldn’t.',
      'Yes, they can.',
      'Yes, they could.',
      'No, they aren’t.',
    ],
    answer: 'No, they couldn’t.',
    answerTranslation: L(
      '아니요, 사용할 수 없었어요.',
      'Yo‘q, foydalana olmas edi.',
      'No, they couldn’t.',
      'Нет, не могли.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['can-could', 'shopping'],
  },

  en_s2u5_n1_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In the past, people could pay with cash, but they couldn’t shop online.',
    audioText:
      'In the past, people could pay with cash, but they couldn’t shop online.',
    answerTranslation: L(
      '과거에는 현금으로 계산할 수 있었지만 온라인 쇼핑은 할 수 없었어요.',
      'Ilgari odamlar naqd pul bilan to‘lay olishgan, lekin onlayn xarid qila olmagan.',
      'In the past, people could pay with cash, but they couldn’t shop online.',
      'Раньше люди могли платить наличными, но не могли покупать онлайн.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Today people can shop online, use cash machines and buy tickets from home.',
    audioText:
      'Today people can shop online, use cash machines and buy tickets from home.',
    answerTranslation: L(
      '오늘날 사람들은 온라인 쇼핑을 하고 현금 인출기를 사용하며 집에서 표를 살 수 있어요.',
      'Bugun odamlar onlayn xarid qilishi, bankomatdan foydalanishi va uydan chipta sotib olishi mumkin.',
      'Today people can shop online, use cash machines and buy tickets from home.',
      'Сегодня люди могут покупать онлайн, пользоваться банкоматами и покупать билеты из дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-then-now'],
  },

  en_s2u5_n1_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 5.1, we talk about shopping and use can, can’t, could and couldn’t to compare possibilities and abilities now and in the past.',
    audioText:
      'In Unit 5.1, we talk about shopping and use can, can’t, could and couldn’t to compare possibilities and abilities now and in the past.',
    answerTranslation: L(
      'Unit 5.1에서는 쇼핑에 대해 이야기하고 can, can’t, could, couldn’t를 사용해 현재와 과거의 가능성과 능력을 비교해요.',
      'Unit 5.1 da xarid haqida gapiramiz va can, can’t, could, couldn’t yordamida hozirgi va o‘tgan zamondagi imkoniyat va qobiliyatlarni taqqoslaymiz.',
      'In Unit 5.1, we talk about shopping and use can, can’t, could and couldn’t to compare possibilities and abilities now and in the past.',
      'В Unit 5.1 мы говорим о покупках и используем can, can’t, could и couldn’t для сравнения возможностей и способностей сейчас и в прошлом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 1
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE1 = {
  title: L('쇼핑', 'Xarid qilish', 'Shopping', 'Покупки'),
  section: 2,
  unit: 5,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '쇼핑 어휘',
        'Xarid lug‘ati',
        'Shopping vocabulary',
        'Лексика покупок',
      ),
      description: L(
        'baker’s, butcher’s, newsagent’s, cash, discount, online, return, sales, shopping centre, spend 등 Unit 5.1의 핵심 쇼핑 어휘를 익혀요.',
        'Baker’s, butcher’s, newsagent’s, cash, discount, online, return, sales, shopping centre va spend kabi Unit 5.1 asosiy xarid so‘zlarini o‘rganasiz.',
        'Learn the main shopping vocabulary from Unit 5.1.',
        'Изучаем основную лексику покупок из Unit 5.1.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u5_n1_001_word_matching',
        'en_s2u5_n1_002_word_matching',
        'en_s2u5_n1_003_word_matching',
        'en_s2u5_n1_004_fill_in_blank',
        'en_s2u5_n1_005_fill_in_blank',
        'en_s2u5_n1_006_fill_in_blank',
        'en_s2u5_n1_007_fill_in_blank',
        'en_s2u5_n1_008_fill_in_blank',
        'en_s2u5_n1_009_fill_in_blank',
        'en_s2u5_n1_010_fill_in_blank',
        'en_s2u5_n1_011_fill_in_blank',
        'en_s2u5_n1_012_fill_in_blank',
        'en_s2u5_n1_013_fill_in_blank',
        'en_s2u5_n1_014_fill_in_blank',
        'en_s2u5_n1_015_fill_in_blank',
        'en_s2u5_n1_016_word_arrange',
        'en_s2u5_n1_017_translate_builder',
        'en_s2u5_n1_018_sentence_builder',
        'en_s2u5_n1_019_speaking',
        'en_s2u5_n1_020_speaking',
      ],
    },

    {
      title: L(
        '과거와 현재의 쇼핑',
        'O‘tmish va hozirgi xarid',
        'Shopping past and present',
        'Покупки раньше и сейчас',
      ),
      description: L(
        'Workbook의 Shopping past and present를 바탕으로 동네 가게, 슈퍼마켓, 쇼핑센터, 온라인 쇼핑과 결제 방식의 변화를 비교해요.',
        'Workbookdagi Shopping past and present orqali mahalliy do‘konlar, supermarketlar, savdo markazlari, onlayn xarid va to‘lov usullarini taqqoslaysiz.',
        'Compare shopping in the past and today using the workbook reading.',
        'Сравниваем покупки раньше и сейчас по тексту Workbook.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u5_n1_021_fill_in_blank',
        'en_s2u5_n1_022_fill_in_blank',
        'en_s2u5_n1_023_dialog_complete',
        'en_s2u5_n1_024_dialog_complete',
        'en_s2u5_n1_025_fill_in_blank',
        'en_s2u5_n1_026_fill_in_blank',
        'en_s2u5_n1_027_fill_in_blank',
        'en_s2u5_n1_028_fill_in_blank',
        'en_s2u5_n1_029_dialog_complete',
        'en_s2u5_n1_030_dialog_complete',
        'en_s2u5_n1_031_fill_in_blank',
        'en_s2u5_n1_032_fill_in_blank',
        'en_s2u5_n1_033_word_arrange',
        'en_s2u5_n1_034_translate_builder',
        'en_s2u5_n1_035_sentence_builder',
        'en_s2u5_n1_036_speaking',
        'en_s2u5_n1_037_speaking',
        'en_s2u5_n1_038_speaking',
        'en_s2u5_n1_039_speaking',
        'en_s2u5_n1_040_speaking',
      ],
    },

    {
      title: L(
        'can / can’t / could / couldn’t',
        'can / can’t / could / couldn’t',
        'can / can’t / could / couldn’t',
        'can / can’t / could / couldn’t',
      ),
      description: L(
        '현재의 능력·가능성에는 can/can’t를, 과거의 능력·가능성에는 could/couldn’t를 사용해요.',
        'Hozirgi qobiliyat va imkoniyat uchun can/can’t, o‘tgan zamon uchun could/couldn’t ishlatiladi.',
        'Use can and can’t for the present and could and couldn’t for the past.',
        'Используем can/can’t для настоящего и could/couldn’t для прошлого.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u5_n1_041_fill_in_blank',
        'en_s2u5_n1_042_fill_in_blank',
        'en_s2u5_n1_043_fill_in_blank',
        'en_s2u5_n1_044_fill_in_blank',
        'en_s2u5_n1_045_fill_in_blank',
        'en_s2u5_n1_046_fill_in_blank',
        'en_s2u5_n1_047_fill_in_blank',
        'en_s2u5_n1_048_fill_in_blank',
        'en_s2u5_n1_049_fill_in_blank',
        'en_s2u5_n1_050_fill_in_blank',
        'en_s2u5_n1_051_fill_in_blank',
        'en_s2u5_n1_052_fill_in_blank',
        'en_s2u5_n1_053_fill_in_blank',
        'en_s2u5_n1_054_dialog_complete',
        'en_s2u5_n1_055_dialog_complete',
        'en_s2u5_n1_056_word_arrange',
        'en_s2u5_n1_057_translate_builder',
        'en_s2u5_n1_058_sentence_builder',
        'en_s2u5_n1_059_speaking',
        'en_s2u5_n1_060_speaking',
      ],
    },

    {
      title: L(
        'Shopping then and now',
        'Shopping then and now',
        'Shopping then and now',
        'Shopping then and now',
      ),
      description: L(
        'Shopping then and now 활동과 can 발음을 통해 과거와 현재에 할 수 있는 일을 비교하고 Unit 5.1을 마무리해요.',
        'Shopping then and now hamda can talaffuzi orqali o‘tmish va hozirgi imkoniyatlarni taqqoslab Unit 5.1 ni yakunlaysiz.',
        'Compare shopping possibilities then and now and practise the pronunciation of can.',
        'Сравниваем возможности покупок раньше и сейчас и тренируем произношение can.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u5_n1_061_dialog_complete',
        'en_s2u5_n1_062_dialog_complete',
        'en_s2u5_n1_063_dialog_complete',
        'en_s2u5_n1_064_fill_in_blank',
        'en_s2u5_n1_065_speaking',
        'en_s2u5_n1_066_speaking',
        'en_s2u5_n1_067_speaking',
        'en_s2u5_n1_068_speaking',
        'en_s2u5_n1_069_fill_in_blank',
        'en_s2u5_n1_070_fill_in_blank',
        'en_s2u5_n1_071_fill_in_blank',
        'en_s2u5_n1_072_fill_in_blank',
        'en_s2u5_n1_073_word_arrange',
        'en_s2u5_n1_074_translate_builder',
        'en_s2u5_n1_075_sentence_builder',
        'en_s2u5_n1_076_dialog_complete',
        'en_s2u5_n1_077_dialog_complete',
        'en_s2u5_n1_078_speaking',
        'en_s2u5_n1_079_speaking',
        'en_s2u5_n1_080_speaking',
      ],
    },
  ],
}; // ─────────────────────────────────────────────────────────────
// Section 2 · Unit 5 · Node 2
// 5.2 What is he wearing?
//
// Coverage
// Clothes & accessories:
// - coat
// - dress
// - glasses
// - gloves
// - hat
// - hoodie
// - jacket
// - jeans
// - jewellery (reuse existing WORD)
// - scarf
// - shoes
// - shorts
// - skirt
// - socks
// - suit
// - tie
// - top
// - trainers
// - trousers
// - T-shirt
// - umbrella
//
// Coursebook:
// - Vera / Beatrice / Paul / Anita / Lelia / Mike
// - clothes for different situations
// - present continuous
// - present continuous vs present simple
//
// Workbook:
// - clothes/accessories
// - present continuous forms
// - present continuous vs present simple
// - An Indian wedding
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// jewellery는 Unit 4에서 이미 등록했으므로 재등록하지 않음.
// "present continuous", "wedding dress" 등 phrase는 WORD 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE2_WORDS = [
  {
    code: 'en-noun-coat',
    english: 'coat',
    senseKey: 'outer-piece-of-clothing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '코트',
      'palto',
      'a piece of clothing worn over other clothes',
      'пальто',
    ),
    examples: [
      {
        english: 'She is wearing a coat.',
        translations: L(
          '그녀는 코트를 입고 있어요.',
          'U palto kiyib turibdi.',
          'She is wearing a coat.',
          'На ней пальто.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəʊt/',
      ttsText: 'coat',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-dress',
    english: 'dress',
    senseKey: 'one-piece-clothing-for-woman-or-girl',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '드레스; 원피스',
      'ko‘ylak',
      'a one-piece item of clothing worn by a woman or girl',
      'платье',
    ),
    examples: [
      {
        english: 'Vera is wearing a blue dress.',
        translations: L(
          'Vera는 파란 드레스를 입고 있어요.',
          'Vera ko‘k ko‘ylak kiyib turibdi.',
          'Vera is wearing a blue dress.',
          'На Вере синее платье.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dres/',
      ttsText: 'dress',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-glasses',
    english: 'glasses',
    senseKey: 'lenses-worn-in-front-of-eyes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '안경',
      'ko‘zoynak',
      'lenses in a frame worn in front of the eyes',
      'очки',
    ),
    examples: [
      {
        english: 'I need my glasses for reading.',
        translations: L(
          '저는 책을 읽을 때 안경이 필요해요.',
          'O‘qish uchun menga ko‘zoynak kerak.',
          'I need my glasses for reading.',
          'Мне нужны очки для чтения.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡlɑːsɪz/',
      ttsText: 'glasses',
    },
    tags: ['accessories', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-glove',
    english: 'glove',
    senseKey: 'covering-for-hand',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '장갑',
      'qo‘lqop',
      'a covering for the hand and fingers',
      'перчатка',
    ),
    examples: [
      {
        english: 'She is wearing gloves.',
        translations: L(
          '그녀는 장갑을 끼고 있어요.',
          'U qo‘lqop kiyib turibdi.',
          'She is wearing gloves.',
          'На ней перчатки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡlʌv/',
      ttsText: 'glove',
    },
    tags: ['clothes', 'accessories', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-hat',
    english: 'hat',
    senseKey: 'covering-worn-on-head',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '모자',
      'bosh kiyim',
      'something worn on the head',
      'шляпа; головной убор',
    ),
    examples: [
      {
        english: 'Vera is wearing a hat.',
        translations: L(
          'Vera는 모자를 쓰고 있어요.',
          'Vera bosh kiyim kiyib turibdi.',
          'Vera is wearing a hat.',
          'На Вере шляпа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hæt/',
      ttsText: 'hat',
    },
    tags: ['clothes', 'accessories', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-hoodie',
    english: 'hoodie',
    senseKey: 'casual-top-with-hood',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '후드티',
      'kapyushonli kofta',
      'a casual top with a hood',
      'толстовка с капюшоном',
    ),
    examples: [
      {
        english: 'Lelia is wearing a hoodie.',
        translations: L(
          'Lelia는 후드티를 입고 있어요.',
          'Lelia kapyushonli kofta kiyib turibdi.',
          'Lelia is wearing a hoodie.',
          'На Лелии толстовка с капюшоном.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhʊdi/',
      ttsText: 'hoodie',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-jacket',
    english: 'jacket',
    senseKey: 'short-outer-piece-of-clothing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '재킷',
      'kurtka',
      'a short coat worn on the upper body',
      'куртка; пиджак',
    ),
    examples: [
      {
        english: 'Paul is wearing a jacket.',
        translations: L(
          'Paul은 재킷을 입고 있어요.',
          'Paul kurtka kiyib turibdi.',
          'Paul is wearing a jacket.',
          'На Поле пиджак.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒækɪt/',
      ttsText: 'jacket',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-jeans',
    english: 'jeans',
    senseKey: 'trousers-made-of-denim',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('청바지', 'jinsi shim', 'trousers made of denim', 'джинсы'),
    examples: [
      {
        english: 'Lelia is wearing jeans.',
        translations: L(
          'Lelia는 청바지를 입고 있어요.',
          'Lelia jinsi shim kiyib turibdi.',
          'Lelia is wearing jeans.',
          'Лелия в джинсах.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dʒiːnz/',
      ttsText: 'jeans',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-scarf',
    english: 'scarf',
    senseKey: 'cloth-worn-around-neck',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '목도리; 스카프',
      'sharf',
      'a piece of cloth worn around the neck',
      'шарф',
    ),
    examples: [
      {
        english: 'She has a big scarf around her neck.',
        translations: L(
          '그녀는 목에 큰 스카프를 두르고 있어요.',
          'U bo‘yniga katta sharf o‘ragan.',
          'She has a big scarf around her neck.',
          'У неё большой шарф на шее.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skɑːf/',
      ttsText: 'scarf',
    },
    tags: ['clothes', 'accessories', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-shoe',
    english: 'shoe',
    senseKey: 'covering-for-foot',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '신발',
      'oyoq kiyim',
      'something worn to protect the foot',
      'туфля; обувь',
    ),
    examples: [
      {
        english: 'She is wearing designer shoes.',
        translations: L(
          '그녀는 디자이너 신발을 신고 있어요.',
          'U dizayner oyoq kiyimini kiyib turibdi.',
          'She is wearing designer shoes.',
          'На ней дизайнерская обувь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃuː/',
      ttsText: 'shoe',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-shorts',
    english: 'shorts',
    senseKey: 'short-trousers',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '반바지',
      'kalta shim',
      'short trousers that end above the knee',
      'шорты',
    ),
    examples: [
      {
        english: 'Mike is wearing shorts.',
        translations: L(
          'Mike는 반바지를 입고 있어요.',
          'Mike kalta shim kiyib turibdi.',
          'Mike is wearing shorts.',
          'Майк в шортах.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃɔːts/',
      ttsText: 'shorts',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-skirt',
    english: 'skirt',
    senseKey: 'clothing-hanging-from-waist',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '치마',
      'yubka',
      'a piece of clothing hanging from the waist',
      'юбка',
    ),
    examples: [
      {
        english: 'Anita is wearing a skirt.',
        translations: L(
          'Anita는 치마를 입고 있어요.',
          'Anita yubka kiyib turibdi.',
          'Anita is wearing a skirt.',
          'Анита в юбке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skɜːt/',
      ttsText: 'skirt',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sock',
    english: 'sock',
    senseKey: 'soft-covering-for-foot',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '양말',
      'paypoq',
      'a soft piece of clothing worn on the foot',
      'носок',
    ),
    examples: [
      {
        english: 'Mike is wearing socks.',
        translations: L(
          'Mike는 양말을 신고 있어요.',
          'Mike paypoq kiyib turibdi.',
          'Mike is wearing socks.',
          'На Майке носки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɒk/',
      ttsText: 'sock',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-suit',
    english: 'suit',
    senseKey: 'matching-jacket-and-trousers',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '정장',
      'kostyum',
      'a jacket and trousers made from the same material',
      'костюм',
    ),
    examples: [
      {
        english: 'Paul is wearing a suit.',
        translations: L(
          'Paul은 정장을 입고 있어요.',
          'Paul kostyum kiyib turibdi.',
          'Paul is wearing a suit.',
          'Пол в костюме.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/suːt/',
      ttsText: 'suit',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tie',
    english: 'tie',
    senseKey: 'long-cloth-worn-around-neck-with-shirt',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '넥타이',
      'galstuk',
      'a long narrow piece of cloth worn around the neck with a shirt',
      'галстук',
    ),
    examples: [
      {
        english: 'Paul is wearing a tie.',
        translations: L(
          'Paul은 넥타이를 매고 있어요.',
          'Paul galstuk taqib turibdi.',
          'Paul is wearing a tie.',
          'Пол в галстуке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/taɪ/',
      ttsText: 'tie',
    },
    tags: ['clothes', 'accessories', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-top',
    english: 'top',
    senseKey: 'clothing-for-upper-body',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '상의',
      'ustki kiyim',
      'a piece of clothing worn on the upper body',
      'топ',
    ),
    examples: [
      {
        english: 'Anita is wearing a top.',
        translations: L(
          'Anita는 상의를 입고 있어요.',
          'Anita ustki kiyim kiyib turibdi.',
          'Anita is wearing a top.',
          'На Аните топ.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɒp/',
      ttsText: 'top',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-trainer',
    english: 'trainer',
    senseKey: 'sports-shoe',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('운동화', 'krossovka', 'a soft sports shoe', 'кроссовка'),
    examples: [
      {
        english: 'Mike is wearing trainers.',
        translations: L(
          'Mike는 운동화를 신고 있어요.',
          'Mike krossovka kiyib turibdi.',
          'Mike is wearing trainers.',
          'На Майке кроссовки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtreɪnə/',
      ttsText: 'trainer',
    },
    tags: ['clothes', 'shoes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-trousers',
    english: 'trousers',
    senseKey: 'clothing-covering-legs-separately',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '바지',
      'shim',
      'clothing covering the body from the waist to the ankles with separate parts for each leg',
      'брюки',
    ),
    examples: [
      {
        english: 'A suit has a jacket and trousers.',
        translations: L(
          '정장은 재킷과 바지로 이루어져 있어요.',
          'Kostyum kurtka va shimdan iborat.',
          'A suit has a jacket and trousers.',
          'Костюм состоит из пиджака и брюк.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtraʊzəz/',
      ttsText: 'trousers',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tshirt',
    english: 'T-shirt',
    senseKey: 'casual-short-sleeved-top',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '티셔츠',
      'futbolka',
      'a casual top with short sleeves',
      'футболка',
    ),
    examples: [
      {
        english: 'Mike is wearing a T-shirt.',
        translations: L(
          'Mike는 티셔츠를 입고 있어요.',
          'Mike futbolka kiyib turibdi.',
          'Mike is wearing a T-shirt.',
          'На Майке футболка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtiː ʃɜːt/',
      ttsText: 'T-shirt',
    },
    tags: ['clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-umbrella',
    english: 'umbrella',
    senseKey: 'object-used-for-protection-from-rain',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '우산',
      'soyabon',
      'an object held over the head to protect you from rain',
      'зонт',
    ),
    examples: [
      {
        english: 'She is carrying an umbrella.',
        translations: L(
          '그녀는 우산을 들고 있어요.',
          'U soyabon ko‘tarib turibdi.',
          'She is carrying an umbrella.',
          'Она несёт зонт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʌmˈbrelə/',
      ttsText: 'umbrella',
    },
    tags: ['accessories', 'weather', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-neck',
    english: 'neck',
    senseKey: 'body-part-between-head-and-shoulders',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '목',
      'bo‘yin',
      'the part of the body between the head and shoulders',
      'шея',
    ),
    examples: [
      {
        english: 'She has a scarf around her neck.',
        translations: L(
          '그녀는 목에 스카프를 두르고 있어요.',
          'U bo‘yniga sharf o‘ragan.',
          'She has a scarf around her neck.',
          'У неё шарф на шее.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/nek/',
      ttsText: 'neck',
    },
    tags: ['body', 'clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT5_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Clothes and accessories
  // ===========================================================

  en_s2u5_n2_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'coat',
        native: 'palto',
        nativeI18n: L('코트', 'palto', 'coat', 'пальто'),
      },
      {
        text: 'dress',
        native: 'ko‘ylak',
        nativeI18n: L('드레스', 'ko‘ylak', 'dress', 'платье'),
      },
      {
        text: 'jacket',
        native: 'kurtka',
        nativeI18n: L('재킷', 'kurtka', 'jacket', 'куртка'),
      },
      {
        text: 'jeans',
        native: 'jinsi shim',
        nativeI18n: L('청바지', 'jinsi shim', 'jeans', 'джинсы'),
      },
      {
        text: 'skirt',
        native: 'yubka',
        nativeI18n: L('치마', 'yubka', 'skirt', 'юбка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes'],
  },

  en_s2u5_n2_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'hat',
        native: 'bosh kiyim',
        nativeI18n: L('모자', 'bosh kiyim', 'hat', 'шляпа'),
      },
      {
        text: 'scarf',
        native: 'sharf',
        nativeI18n: L('스카프', 'sharf', 'scarf', 'шарф'),
      },
      {
        text: 'gloves',
        native: 'qo‘lqop',
        nativeI18n: L('장갑', 'qo‘lqop', 'gloves', 'перчатки'),
      },
      {
        text: 'glasses',
        native: 'ko‘zoynak',
        nativeI18n: L('안경', 'ko‘zoynak', 'glasses', 'очки'),
      },
      {
        text: 'umbrella',
        native: 'soyabon',
        nativeI18n: L('우산', 'soyabon', 'umbrella', 'зонт'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['accessories'],
  },

  en_s2u5_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'shorts',
        native: 'kalta shim',
        nativeI18n: L('반바지', 'kalta shim', 'shorts', 'шорты'),
      },
      {
        text: 'trousers',
        native: 'shim',
        nativeI18n: L('바지', 'shim', 'trousers', 'брюки'),
      },
      {
        text: 'socks',
        native: 'paypoq',
        nativeI18n: L('양말', 'paypoq', 'socks', 'носки'),
      },
      {
        text: 'trainers',
        native: 'krossovka',
        nativeI18n: L('운동화', 'krossovka', 'trainers', 'кроссовки'),
      },
      {
        text: 'T-shirt',
        native: 'futbolka',
        nativeI18n: L('티셔츠', 'futbolka', 'T-shirt', 'футболка'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes'],
  },

  en_s2u5_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vera is wearing a blue ___.',
    blankAnswers: ['dress'],
    options: ['dress', 'tie', 'hoodie', 'coat'],
    answer: 'dress',
    answerTranslation: L(
      'Vera는 파란 드레스를 입고 있어요.',
      'Vera ko‘k ko‘ylak kiyib turibdi.',
      'Vera is wearing a blue dress.',
      'На Вере синее платье.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'vera'],
  },

  en_s2u5_n2_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Vera is also wearing gold ___.',
    blankAnswers: ['jewellery'],
    options: ['jewellery', 'trousers', 'gloves', 'trainers'],
    answer: 'jewellery',
    answerTranslation: L(
      'Vera는 금 보석도 착용하고 있어요.',
      'Vera oltin taqinchoqlar ham taqib turibdi.',
      'Vera is also wearing gold jewellery.',
      'На Вере также золотые украшения.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'vera'],
  },

  en_s2u5_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Beatrice is wearing a big ___ around her neck.',
    blankAnswers: ['scarf'],
    options: ['scarf', 'tie', 'skirt', 'sock'],
    answer: 'scarf',
    answerTranslation: L(
      'Beatrice는 목에 큰 스카프를 두르고 있어요.',
      'Beatrice bo‘yniga katta sharf o‘ragan.',
      'Beatrice is wearing a big scarf around her neck.',
      'У Беатрис большой шарф на шее.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'beatrice'],
  },

  en_s2u5_n2_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Beatrice is carrying an ___.',
    blankAnswers: ['umbrella'],
    options: ['umbrella', 'jacket', 'tie', 'skirt'],
    answer: 'umbrella',
    answerTranslation: L(
      'Beatrice는 우산을 들고 있어요.',
      'Beatrice soyabon ko‘tarib turibdi.',
      'Beatrice is carrying an umbrella.',
      'Беатрис несёт зонт.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'beatrice'],
  },

  en_s2u5_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Paul is wearing a ___ and a tie.',
    blankAnswers: ['suit'],
    options: ['suit', 'dress', 'skirt', 'hoodie'],
    answer: 'suit',
    answerTranslation: L(
      'Paul은 정장과 넥타이를 착용하고 있어요.',
      'Paul kostyum va galstuk taqib turibdi.',
      'Paul is wearing a suit and a tie.',
      'Пол в костюме и галстуке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'paul'],
  },

  en_s2u5_n2_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Anita is wearing a skirt and a ___.',
    blankAnswers: ['top'],
    options: ['top', 'sock', 'trainer', 'tie'],
    answer: 'top',
    answerTranslation: L(
      'Anita는 치마와 상의를 입고 있어요.',
      'Anita yubka va ustki kiyim kiyib turibdi.',
      'Anita is wearing a skirt and a top.',
      'Анита в юбке и топе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'anita'],
  },

  en_s2u5_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Lelia is wearing jeans and a ___.',
    blankAnswers: ['hoodie'],
    options: ['hoodie', 'dress', 'suit', 'tie'],
    answer: 'hoodie',
    answerTranslation: L(
      'Lelia는 청바지와 후드티를 입고 있어요.',
      'Lelia jinsi shim va kapyushonli kofta kiyib turibdi.',
      'Lelia is wearing jeans and a hoodie.',
      'Лелия в джинсах и толстовке с капюшоном.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'lelia'],
  },

  en_s2u5_n2_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mike is wearing shorts and a ___.',
    blankAnswers: ['T-shirt'],
    options: ['T-shirt', 'dress', 'skirt', 'tie'],
    answer: 'T-shirt',
    answerTranslation: L(
      'Mike는 반바지와 티셔츠를 입고 있어요.',
      'Mike kalta shim va futbolka kiyib turibdi.',
      'Mike is wearing shorts and a T-shirt.',
      'Майк в шортах и футболке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'mike'],
  },

  en_s2u5_n2_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mike is wearing socks and ___.',
    blankAnswers: ['trainers'],
    options: ['trainers', 'gloves', 'glasses', 'ties'],
    answer: 'trainers',
    answerTranslation: L(
      'Mike는 양말과 운동화를 신고 있어요.',
      'Mike paypoq va krossovka kiyib turibdi.',
      'Mike is wearing socks and trainers.',
      'На Майке носки и кроссовки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'mike'],
  },

  en_s2u5_n2_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'It’s raining. What should I take?' },
    ],
    options: ['An umbrella.', 'A tie.', 'A skirt.', 'A suit.'],
    answer: 'An umbrella.',
    answerTranslation: L('우산이요.', 'Soyabon.', 'An umbrella.', 'Зонт.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['clothes', 'workbook'],
  },

  en_s2u5_n2_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What can you wear around your neck when it is cold?',
      },
    ],
    options: ['A scarf.', 'A skirt.', 'Shorts.', 'Trainers.'],
    answer: 'A scarf.',
    answerTranslation: L('스카프나 목도리요.', 'Sharf.', 'A scarf.', 'Шарф.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['clothes'],
  },

  en_s2u5_n2_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I need my ___ for reading.',
    blankAnswers: ['glasses'],
    options: ['glasses', 'gloves', 'trainers', 'shorts'],
    answer: 'glasses',
    answerTranslation: L(
      '저는 책을 읽을 때 안경이 필요해요.',
      'O‘qish uchun menga ko‘zoynak kerak.',
      'I need my glasses for reading.',
      'Мне нужны очки для чтения.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes', 'workbook'],
  },

  en_s2u5_n2_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'is', 'wearing', 'a', 'blue', 'dress'],
    answer: 'She is wearing a blue dress',
    audioText: 'She is wearing a blue dress.',
    answerTranslation: L(
      '그녀는 파란 드레스를 입고 있어요.',
      'U ko‘k ko‘ylak kiyib turibdi.',
      'She is wearing a blue dress.',
      'На ней синее платье.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes'],
  },

  en_s2u5_n2_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['He', 'is', 'wearing', 'a', 'suit', 'and', 'a', 'tie'],
    answer: 'He is wearing a suit and a tie',
    answerTranslation: L(
      '그는 정장과 넥타이를 착용하고 있어요.',
      'U kostyum va galstuk taqib turibdi.',
      'He is wearing a suit and a tie.',
      'Он в костюме и галстуке.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['clothes'],
  },

  en_s2u5_n2_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She is carrying an umbrella.',
    audioText: 'She is carrying an umbrella.',
    answerI18n: L(
      '그녀는 우산을 들고 있어요',
      'U soyabon ko‘tarib turibdi',
      'She is carrying an umbrella',
      'Она несёт зонт',
    ),
    options: ['She', 'is', 'carrying', 'an', 'umbrella.'],
    optionsI18n: {
      ko: ['그녀는', '우산을', '들고', '있어요'],
      uz: ['U', 'soyabon', 'ko‘tarib', 'turibdi'],
      en: ['She', 'is', 'carrying', 'an', 'umbrella.'],
      ru: ['Она', 'несёт', 'зонт'],
    },
    answerTranslation: L(
      '그녀는 우산을 들고 있어요.',
      'U soyabon ko‘tarib turibdi.',
      'She is carrying an umbrella.',
      'Она несёт зонт.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['clothes'],
  },

  en_s2u5_n2_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'For cold or rainy weather, I wear a coat, a scarf and gloves and carry an umbrella.',
    audioText:
      'For cold or rainy weather, I wear a coat, a scarf and gloves and carry an umbrella.',
    answerTranslation: L(
      '춥거나 비 오는 날에는 코트와 스카프, 장갑을 착용하고 우산을 들고 다녀요.',
      'Sovuq yoki yomg‘irli havoda palto, sharf va qo‘lqop kiyaman va soyabon olib yuraman.',
      'For cold or rainy weather, I wear a coat, a scarf and gloves and carry an umbrella.',
      'В холодную или дождливую погоду я надеваю пальто, шарф и перчатки и беру зонт.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['clothes', 'review'],
  },

  en_s2u5_n2_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A suit usually includes a jacket and trousers, and people often wear it with a tie.',
    audioText:
      'A suit usually includes a jacket and trousers, and people often wear it with a tie.',
    answerTranslation: L(
      '정장은 보통 재킷과 바지로 이루어져 있고 넥타이와 함께 입는 경우가 많아요.',
      'Kostyum odatda kurtka va shimdan iborat va odamlar uni ko‘pincha galstuk bilan kiyadi.',
      'A suit usually includes a jacket and trousers, and people often wear it with a tie.',
      'Костюм обычно состоит из пиджака и брюк и часто носится с галстуком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['clothes', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Present continuous
  // ===========================================================

  en_s2u5_n2_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Anita and Paul ___ having a meal.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'am', 'do'],
    answer: 'are',
    answerTranslation: L(
      'Anita와 Paul은 식사를 하고 있어요.',
      'Anita va Paul ovqatlanishyapti.',
      'Anita and Paul are having a meal.',
      'Анита и Пол сейчас едят.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Anna ___ wearing a hat.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'am', 'do'],
    answer: 'is',
    answerTranslation: L(
      'Anna는 모자를 쓰고 있어요.',
      'Anna bosh kiyim kiyib turibdi.',
      'Anna is wearing a hat.',
      'Анна в шляпе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They ___ working today.',
    blankAnswers: ["aren't"],
    options: ["aren't", "isn't", "don't", 'not'],
    answer: "aren't",
    answerTranslation: L(
      '그들은 오늘 일하고 있지 않아요.',
      'Ular bugun ishlamayapti.',
      'They aren’t working today.',
      'Они сегодня не работают.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'negative'],
  },

  en_s2u5_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ making dinner.',
    blankAnswers: ['am'],
    options: ['am', 'is', 'are', 'do'],
    answer: 'am',
    answerTranslation: L(
      '저는 저녁을 만들고 있어요.',
      'Men kechki ovqat tayyorlayapman.',
      'I am making dinner.',
      'Я готовлю ужин.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is ___ a blue dress.',
    blankAnswers: ['wearing'],
    options: ['wearing', 'wear', 'wears', 'wore'],
    answer: 'wearing',
    answerTranslation: L(
      '그녀는 파란 드레스를 입고 있어요.',
      'U ko‘k ko‘ylak kiyib turibdi.',
      'She is wearing a blue dress.',
      'На ней синее платье.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They are ___ in the pool.',
    blankAnswers: ['swimming'],
    options: ['swimming', 'swim', 'swims', 'swam'],
    answer: 'swimming',
    answerTranslation: L(
      '그들은 수영장에서 수영하고 있어요.',
      'Ular hovuzda suzyapti.',
      'They are swimming in the pool.',
      'Они плавают в бассейне.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We are ___ a meeting here.',
    blankAnswers: ['having'],
    options: ['having', 'have', 'has', 'had'],
    answer: 'having',
    answerTranslation: L(
      '우리는 여기에서 회의를 하고 있어요.',
      'Biz bu yerda yig‘ilish o‘tkazyapmiz.',
      'We are having a meeting here.',
      'Мы проводим здесь собрание.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We are ___ very fast.',
    blankAnswers: ['driving'],
    options: ['driving', 'drive', 'drives', 'drove'],
    answer: 'driving',
    answerTranslation: L(
      '우리는 아주 빠르게 운전하고 있어요.',
      'Biz juda tez haydayapmiz.',
      'We are driving very fast.',
      'Мы едем очень быстро.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is ___ today.',
    blankAnswers: ['raining'],
    options: ['raining', 'rain', 'rains', 'rained'],
    answer: 'raining',
    answerTranslation: L(
      '오늘 비가 오고 있어요.',
      'Bugun yomg‘ir yog‘yapti.',
      'It is raining today.',
      'Сегодня идёт дождь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you drinking my coffee?',
    blankAnswers: ['Are'],
    options: ['Are', 'Is', 'Do', 'Does'],
    answer: 'Are',
    answerTranslation: L(
      '제 커피를 마시고 있나요?',
      'Mening qahvamni ichyapsizmi?',
      'Are you drinking my coffee?',
      'Ты пьёшь мой кофе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'question'],
  },

  en_s2u5_n2_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ listening to the teacher.',
    blankAnswers: ["isn't"],
    options: ["isn't", "aren't", "doesn't", "don't"],
    answer: "isn't",
    answerTranslation: L(
      '그는 선생님의 말을 듣고 있지 않아요.',
      'U o‘qituvchini tinglamayapti.',
      'He isn’t listening to the teacher.',
      'Он не слушает учителя.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'negative'],
  },

  en_s2u5_n2_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ Ellie doing her homework?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Does', 'Do'],
    answer: 'Is',
    answerTranslation: L(
      'Ellie는 숙제를 하고 있나요?',
      'Ellie uy vazifasini qilyaptimi?',
      'Is Ellie doing her homework?',
      'Элли делает домашнее задание?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'question'],
  },

  en_s2u5_n2_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ enjoying this film.',
    blankAnswers: ['am not'],
    options: ['am not', "isn't", "aren't", "don't"],
    answer: 'am not',
    answerTranslation: L(
      '저는 이 영화를 재미있게 보고 있지 않아요.',
      'Men bu filmdan zavqlanmayapman.',
      'I am not enjoying this film.',
      'Мне сейчас не нравится этот фильм.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'negative'],
  },

  en_s2u5_n2_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It ___ snowing today.',
    blankAnswers: ["isn't"],
    options: ["isn't", "aren't", "doesn't", "don't"],
    answer: "isn't",
    answerTranslation: L(
      '오늘은 눈이 오고 있지 않아요.',
      'Bugun qor yog‘mayapti.',
      'It isn’t snowing today.',
      'Сегодня снег не идёт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'negative'],
  },

  en_s2u5_n2_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Why ___ those people standing there?',
    blankAnswers: ['are'],
    options: ['are', 'is', 'do', 'does'],
    answer: 'are',
    answerTranslation: L(
      '왜 저 사람들이 거기에 서 있나요?',
      'Nega u odamlar u yerda turibdi?',
      'Why are those people standing there?',
      'Почему те люди стоят там?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'question'],
  },

  en_s2u5_n2_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['What', 'are', 'you', 'wearing'],
    answer: 'What are you wearing',
    audioText: 'What are you wearing?',
    answerTranslation: L(
      '무엇을 입고 있나요?',
      'Nima kiyib turibsiz?',
      'What are you wearing?',
      'Что на тебе надето?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They', 'are', 'not', 'working', 'today'],
    answer: 'They are not working today',
    answerTranslation: L(
      '그들은 오늘 일하고 있지 않아요.',
      'Ular bugun ishlamayapti.',
      'They are not working today.',
      'Они сегодня не работают.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Why are those people standing there?',
    audioText: 'Why are those people standing there?',
    answerI18n: L(
      '왜 저 사람들이 거기에 서 있나요',
      'Nega u odamlar u yerda turibdi',
      'Why are those people standing there',
      'Почему те люди стоят там',
    ),
    options: ['Why', 'are', 'those', 'people', 'standing', 'there?'],
    optionsI18n: {
      ko: ['왜', '저', '사람들이', '거기에', '서', '있나요'],
      uz: ['Nega', 'u', 'odamlar', 'u', 'yerda', 'turibdi'],
      en: ['Why', 'are', 'those', 'people', 'standing', 'there?'],
      ru: ['Почему', 'те', 'люди', 'стоят', 'там'],
    },
    answerTranslation: L(
      '왜 저 사람들이 거기에 서 있나요?',
      'Nega u odamlar u yerda turibdi?',
      'Why are those people standing there?',
      'Почему те люди стоят там?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We form the present continuous with am, is or are plus the verb ending in -ing.',
    audioText:
      'We form the present continuous with am, is or are plus the verb ending in ing.',
    answerTranslation: L(
      '현재진행형은 am, is, are와 -ing 형태의 동사를 사용해 만들어요.',
      'Present continuous am, is yoki are va -ing shaklidagi fe’l bilan tuziladi.',
      'We form the present continuous with am, is or are plus the verb ending in -ing.',
      'Present continuous образуется с am, is или are и глаголом с -ing.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-continuous', 'review'],
  },

  en_s2u5_n2_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We use the present continuous for actions happening now or around this moment.',
    audioText:
      'We use the present continuous for actions happening now or around this moment.',
    answerTranslation: L(
      '현재진행형은 지금 또는 현재 시점 주변에 일어나고 있는 행동을 말할 때 사용해요.',
      'Present continuous hozir yoki shu vaqt atrofida sodir bo‘layotgan harakatlar uchun ishlatiladi.',
      'We use the present continuous for actions happening now or around this moment.',
      'Present continuous используется для действий, происходящих сейчас или примерно в этот период.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-continuous', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Present continuous or present simple
  // ===========================================================

  en_s2u5_n2_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I usually ___ to work, but today I am taking the train.',
    blankAnswers: ['drive'],
    options: ['drive', 'am driving', 'driving', 'drives'],
    answer: 'drive',
    answerTranslation: L(
      '저는 보통 운전해서 출근하지만 오늘은 기차를 타고 있어요.',
      'Men odatda ishga mashinada boraman, lekin bugun poyezdda ketyapman.',
      'I usually drive to work, but today I am taking the train.',
      'Обычно я езжу на работу на машине, но сегодня еду на поезде.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'present-continuous'],
  },

  en_s2u5_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Andrea ___ in an office from Monday to Friday.',
    blankAnswers: ['works'],
    options: ['works', 'is working', 'work', 'working'],
    answer: 'works',
    answerTranslation: L(
      'Andrea는 월요일부터 금요일까지 사무실에서 일해요.',
      'Andrea dushanbadan jumagacha ofisda ishlaydi.',
      'Andrea works in an office from Monday to Friday.',
      'Андреа работает в офисе с понедельника по пятницу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u5_n2_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today is Saturday and she ___ at home.',
    blankAnswers: ['is working'],
    options: ['is working', 'works', 'work', 'working'],
    answer: 'is working',
    answerTranslation: L(
      '오늘은 토요일이고 그녀는 집에서 일하고 있어요.',
      'Bugun shanba va u uyda ishlayapti.',
      'Today is Saturday and she is working at home.',
      'Сегодня суббота, и она работает дома.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Yanni ___ any clothes to wear for his job interview.',
    blankAnswers: ["doesn't have"],
    options: ["doesn't have", "isn't having", "don't have", 'not have'],
    answer: "doesn't have",
    answerTranslation: L(
      'Yanni는 면접에 입을 옷이 없어요.',
      'Yannining ish suhbatiga kiyadigan kiyimi yo‘q.',
      'Yanni doesn’t have any clothes to wear for his job interview.',
      'У Янни нет одежды для собеседования.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple'],
  },

  en_s2u5_n2_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ breakfast at nine o’clock today.',
    blankAnswers: ['are having'],
    options: ['are having', 'have', 'has', 'having'],
    answer: 'are having',
    answerTranslation: L(
      '오늘 우리는 9시에 아침을 먹고 있어요.',
      'Bugun biz soat to‘qqizda nonushta qilyapmiz.',
      'We are having breakfast at nine o’clock today.',
      'Сегодня мы завтракаем в девять часов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Their flight ___ at nine o’clock.',
    blankAnswers: ['opens'],
    options: ['opens', 'is opening', 'open', 'opening'],
    answer: 'opens',
    answerTranslation: L(
      '그들의 항공편은 9시에 시작돼요.',
      'Ularning reysi soat to‘qqizda ochiladi.',
      'Their flight opens at nine o’clock.',
      'Их рейс открывается в девять.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple'],
  },

  en_s2u5_n2_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Why ___ you ___ some money from the cash machine?',
    blankAnswers: ['are', 'getting'],
    options: ['are / getting', 'do / get', 'is / getting', 'are / get'],
    answer: 'are / getting',
    answerTranslation: L(
      '왜 현금 인출기에서 돈을 찾고 있나요?',
      'Nega bankomatdan pul olyapsiz?',
      'Why are you getting some money from the cash machine?',
      'Почему вы снимаете деньги в банкомате?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Sandy’s in the shopping centre. She ___ to a shop because she ___ to fix her phone.',
    blankAnswers: ['is going', 'wants'],
    options: [
      'is going / wants',
      'goes / is wanting',
      'go / want',
      'is going / is wanting',
    ],
    answer: 'is going / wants',
    answerTranslation: L(
      'Sandy는 쇼핑센터에 있어요. 휴대폰을 고치고 싶어서 가게로 가고 있어요.',
      'Sandy savdo markazida. Telefonini tuzatmoqchi bo‘lgani uchun do‘konga ketyapti.',
      'Sandy’s in the shopping centre. She is going to a shop because she wants to fix her phone.',
      'Сэнди в торговом центре. Она идёт в магазин, потому что хочет починить телефон.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'present-continuous'],
  },

  en_s2u5_n2_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It ___, so I am carrying an umbrella.',
    blankAnswers: ['is raining'],
    options: ['is raining', 'rains', 'rain', 'raining'],
    answer: 'is raining',
    answerTranslation: L(
      '비가 오고 있어서 우산을 들고 있어요.',
      'Yomg‘ir yog‘ayotgani uchun soyabon ko‘tarib yuribman.',
      'It is raining, so I am carrying an umbrella.',
      'Идёт дождь, поэтому я несу зонт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I always ___ an umbrella in my bag.',
    blankAnswers: ['carry'],
    options: ['carry', 'am carrying', 'carries', 'carrying'],
    answer: 'carry',
    answerTranslation: L(
      '저는 항상 가방에 우산을 가지고 다녀요.',
      'Men har doim sumkamda soyabon olib yuraman.',
      'I always carry an umbrella in my bag.',
      'Я всегда ношу зонт в сумке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u5_n2_051_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which tense usually describes routines and things that are generally true?',
      },
    ],
    options: [
      'The present simple.',
      'The present continuous.',
      'The past simple only.',
      'The imperative.',
    ],
    answer: 'The present simple.',
    answerTranslation: L(
      '현재시제예요.',
      'Present simple.',
      'The present simple.',
      'Present simple.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u5_n2_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which tense describes actions happening now?',
      },
    ],
    options: [
      'The present continuous.',
      'The present simple.',
      'The past simple.',
      'The infinitive.',
    ],
    answer: 'The present continuous.',
    answerTranslation: L(
      '현재진행형이에요.',
      'Present continuous.',
      'The present continuous.',
      'Present continuous.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The word “usually” often goes with the ___.',
    blankAnswers: ['present simple'],
    options: [
      'present simple',
      'present continuous',
      'imperative',
      'past continuous',
    ],
    answer: 'present simple',
    answerTranslation: L(
      'usually는 보통 현재시제와 함께 사용돼요.',
      'Usually ko‘pincha present simple bilan ishlatiladi.',
      'The word “usually” often goes with the present simple.',
      'Usually часто используется с present simple.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u5_n2_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The phrase “at the moment” often goes with the ___.',
    blankAnswers: ['present continuous'],
    options: [
      'present continuous',
      'present simple',
      'imperative',
      'past simple',
    ],
    answer: 'present continuous',
    answerTranslation: L(
      'at the moment는 보통 현재진행형과 함께 사용돼요.',
      'At the moment ko‘pincha present continuous bilan ishlatiladi.',
      'The phrase “at the moment” often goes with the present continuous.',
      'At the moment часто используется с present continuous.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I usually wear jeans, but today I ___ a suit.',
    blankAnswers: ['am wearing'],
    options: ['am wearing', 'wear', 'wears', 'wearing'],
    answer: 'am wearing',
    answerTranslation: L(
      '저는 보통 청바지를 입지만 오늘은 정장을 입고 있어요.',
      'Men odatda jinsi shim kiyaman, lekin bugun kostyum kiyib turibman.',
      'I usually wear jeans, but today I am wearing a suit.',
      'Обычно я ношу джинсы, но сегодня я в костюме.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'present-continuous'],
  },

  en_s2u5_n2_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'usually', 'drive', 'to', 'work'],
    answer: 'I usually drive to work',
    audioText: 'I usually drive to work.',
    answerTranslation: L(
      '저는 보통 운전해서 출근해요.',
      'Men odatda ishga mashinada boraman.',
      'I usually drive to work.',
      'Я обычно езжу на работу на машине.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple'],
  },

  en_s2u5_n2_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Today', 'I', 'am', 'taking', 'the', 'train'],
    answer: 'Today I am taking the train',
    answerTranslation: L(
      '오늘은 기차를 타고 있어요.',
      'Bugun poyezdda ketyapman.',
      'Today I am taking the train.',
      'Сегодня я еду на поезде.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['present-continuous'],
  },

  en_s2u5_n2_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I usually wear jeans, but today I am wearing a suit.',
    audioText: 'I usually wear jeans, but today I am wearing a suit.',
    answerI18n: L(
      '저는 보통 청바지를 입지만 오늘은 정장을 입고 있어요',
      'Men odatda jinsi shim kiyaman, lekin bugun kostyum kiyib turibman',
      'I usually wear jeans, but today I am wearing a suit',
      'Обычно я ношу джинсы, но сегодня я в костюме',
    ),
    options: [
      'I',
      'usually',
      'wear',
      'jeans,',
      'but',
      'today',
      'I',
      'am',
      'wearing',
      'a',
      'suit.',
    ],
    optionsI18n: {
      ko: [
        '저는',
        '보통',
        '청바지를',
        '입지만',
        '오늘은',
        '정장을',
        '입고',
        '있어요',
      ],
      uz: [
        'Men',
        'odatda',
        'jinsi',
        'shim',
        'kiyaman,',
        'lekin',
        'bugun',
        'kostyum',
        'kiyib',
        'turibman',
      ],
      en: [
        'I',
        'usually',
        'wear',
        'jeans,',
        'but',
        'today',
        'I',
        'am',
        'wearing',
        'a',
        'suit.',
      ],
      ru: [
        'Обычно',
        'я',
        'ношу',
        'джинсы,',
        'но',
        'сегодня',
        'я',
        'в',
        'костюме',
      ],
    },
    answerTranslation: L(
      '저는 보통 청바지를 입지만 오늘은 정장을 입고 있어요.',
      'Men odatda jinsi shim kiyaman, lekin bugun kostyum kiyib turibman.',
      'I usually wear jeans, but today I am wearing a suit.',
      'Обычно я ношу джинсы, но сегодня я в костюме.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['present-simple', 'present-continuous'],
  },

  en_s2u5_n2_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I use the present simple for routines and the present continuous for actions happening now.',
    audioText:
      'I use the present simple for routines and the present continuous for actions happening now.',
    answerTranslation: L(
      '습관에는 현재시제를, 지금 일어나는 행동에는 현재진행형을 사용해요.',
      'Odatlar uchun present simple, hozir sodir bo‘layotgan harakatlar uchun present continuous ishlataman.',
      'I use the present simple for routines and the present continuous for actions happening now.',
      'Я использую present simple для привычек, а present continuous для действий сейчас.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['present-simple', 'present-continuous'],
  },

  en_s2u5_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Usually, always and every day often describe routines, while now and at the moment describe current actions.',
    audioText:
      'Usually, always and every day often describe routines, while now and at the moment describe current actions.',
    answerTranslation: L(
      'usually, always, every day는 습관을 나타내는 경우가 많고 now와 at the moment는 현재 행동을 나타내요.',
      'Usually, always va every day ko‘pincha odatlarni, now va at the moment esa hozirgi harakatlarni bildiradi.',
      'Usually, always and every day often describe routines, while now and at the moment describe current actions.',
      'Usually, always и every day часто описывают привычки, а now и at the moment — текущие действия.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['grammar', 'review'],
  },

  // ===========================================================
  // Lesson 4 · An Indian wedding + Unit 5.2 review
  // ===========================================================

  en_s2u5_n2_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ashna ___ in Mumbai with her parents and two sisters.',
    blankAnswers: ['lives'],
    options: ['lives', 'is living', 'live', 'living'],
    answer: 'lives',
    answerTranslation: L(
      'Ashna는 부모님과 두 자매와 함께 Mumbai에 살아요.',
      'Ashna ota-onasi va ikki singlisi bilan Mumbayda yashaydi.',
      'Ashna lives in Mumbai with her parents and two sisters.',
      'Ашна живёт в Мумбаи с родителями и двумя сёстрами.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['indian-wedding', 'present-simple'],
  },

  en_s2u5_n2_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Meena and Lalita ___ their sister to get dressed for the wedding.',
    blankAnswers: ['are helping'],
    options: ['are helping', 'helping', 'helps', 'is helping'],
    answer: 'are helping',
    answerTranslation: L(
      'Meena와 Lalita는 결혼식을 위해 자매가 옷을 입는 것을 돕고 있어요.',
      'Meena va Lalita singlisiga to‘y uchun kiyinishga yordam berishyapti.',
      'Meena and Lalita are helping their sister to get dressed for the wedding.',
      'Мина и Лалита помогают сестре одеться на свадьбу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['indian-wedding', 'present-continuous'],
  },

  en_s2u5_n2_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'In India, women usually ___ a long dress called a sari for their wedding.',
    blankAnswers: ['wear'],
    options: ['wear', 'are wearing', 'wears', 'wearing'],
    answer: 'wear',
    answerTranslation: L(
      '인도에서는 여성들이 결혼식 때 보통 sari라는 긴 드레스를 입어요.',
      'Hindistonda ayollar to‘yda odatda sari deb ataladigan uzun kiyim kiyadi.',
      'In India, women usually wear a long dress called a sari for their wedding.',
      'В Индии женщины обычно надевают на свадьбу длинную одежду, называемую сари.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['indian-wedding', 'present-simple'],
  },

  en_s2u5_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today Ashna ___ a red sari.',
    blankAnswers: ['is wearing'],
    options: ['is wearing', 'wears', 'wear', 'wearing'],
    answer: 'is wearing',
    answerTranslation: L(
      '오늘 Ashna는 빨간 sari를 입고 있어요.',
      'Bugun Ashna qizil sari kiyib turibdi.',
      'Today Ashna is wearing a red sari.',
      'Сегодня Ашна в красном сари.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['indian-wedding', 'present-continuous'],
  },

  en_s2u5_n2_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ashna’s mother ___ food for the party.',
    blankAnswers: ['is cooking'],
    options: ['is cooking', 'cooks', 'cook', 'cooking'],
    answer: 'is cooking',
    answerTranslation: L(
      'Ashna의 어머니는 파티 음식을 요리하고 있어요.',
      'Ashnaning onasi bazm uchun ovqat pishiryapti.',
      'Ashna’s mother is cooking food for the party.',
      'Мама Ашны готовит еду для праздника.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['indian-wedding', 'present-continuous'],
  },

  en_s2u5_n2_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Ashna’s father ___ that today is a big day.',
    blankAnswers: ['thinks'],
    options: ['thinks', 'is thinking', 'think', 'thinking'],
    answer: 'thinks',
    answerTranslation: L(
      'Ashna의 아버지는 오늘이 중요한 날이라고 생각해요.',
      'Ashnaning otasi bugun muhim kun deb o‘ylaydi.',
      'Ashna’s father thinks that today is a big day.',
      'Отец Ашны считает, что сегодня важный день.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['indian-wedding', 'present-simple'],
  },

  en_s2u5_n2_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A lot of people ___ to the house.',
    blankAnswers: ['are coming'],
    options: ['are coming', 'comes', 'come now every day', 'is coming'],
    answer: 'are coming',
    answerTranslation: L(
      '많은 사람들이 집으로 오고 있어요.',
      'Ko‘p odamlar uyga kelyapti.',
      'A lot of people are coming to the house.',
      'Много людей приходят в дом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['indian-wedding', 'present-continuous'],
  },

  en_s2u5_n2_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People ___ special food for the wedding.',
    blankAnswers: ['are cooking'],
    options: ['are cooking', 'is cooking', 'cooks', 'cooking'],
    answer: 'are cooking',
    answerTranslation: L(
      '사람들이 결혼식을 위한 특별한 음식을 요리하고 있어요.',
      'Odamlar to‘y uchun maxsus taomlar pishiryapti.',
      'People are cooking special food for the wedding.',
      'Люди готовят особую еду для свадьбы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['indian-wedding', 'present-continuous'],
  },

  en_s2u5_n2_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where does Ashna live?' }],
    options: ['In Mumbai.', 'In London.', 'In New York.', 'In Dubai.'],
    answer: 'In Mumbai.',
    answerTranslation: L(
      'Mumbai에 살아요.',
      'Mumbayda.',
      'In Mumbai.',
      'В Мумбаи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What are Meena and Lalita doing?' }],
    options: [
      'They are helping their sister.',
      'They are driving to work.',
      'They are buying a car.',
      'They are swimming.',
    ],
    answer: 'They are helping their sister.',
    answerTranslation: L(
      '자매를 돕고 있어요.',
      'Ular singlisiga yordam berishyapti.',
      'They are helping their sister.',
      'Они помогают своей сестре.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_071_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What is Ashna wearing today?' }],
    options: [
      'A red sari.',
      'A blue suit.',
      'Jeans and a hoodie.',
      'Shorts and a T-shirt.',
    ],
    answer: 'A red sari.',
    answerTranslation: L(
      '빨간 sari를 입고 있어요.',
      'Qizil sari kiyib turibdi.',
      'A red sari.',
      'Красное сари.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Why are people coming to the house?' },
    ],
    options: [
      'Because there is a wedding.',
      'Because there is a job interview.',
      'Because they are shopping.',
      'Because they are going to work.',
    ],
    answer: 'Because there is a wedding.',
    answerTranslation: L(
      '결혼식이 있기 때문이에요.',
      'Chunki to‘y bo‘lyapti.',
      'Because there is a wedding.',
      'Потому что там свадьба.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_073_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Ashna', 'is', 'wearing', 'a', 'red', 'sari'],
    answer: 'Ashna is wearing a red sari',
    audioText: 'Ashna is wearing a red sari.',
    answerTranslation: L(
      'Ashna는 빨간 sari를 입고 있어요.',
      'Ashna qizil sari kiyib turibdi.',
      'Ashna is wearing a red sari.',
      'Ашна в красном сари.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They', 'are', 'helping', 'their', 'sister'],
    answer: 'They are helping their sister',
    answerTranslation: L(
      '그들은 자매를 돕고 있어요.',
      'Ular singlisiga yordam berishyapti.',
      'They are helping their sister.',
      'Они помогают своей сестре.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_075_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'A lot of people are coming to the house.',
    audioText: 'A lot of people are coming to the house.',
    answerI18n: L(
      '많은 사람들이 집으로 오고 있어요',
      'Ko‘p odamlar uyga kelyapti',
      'A lot of people are coming to the house',
      'Много людей приходят в дом',
    ),
    options: [
      'A',
      'lot',
      'of',
      'people',
      'are',
      'coming',
      'to',
      'the',
      'house.',
    ],
    optionsI18n: {
      ko: ['많은', '사람들이', '집으로', '오고', '있어요'],
      uz: ['Ko‘p', 'odamlar', 'uyga', 'kelyapti'],
      en: ['A', 'lot', 'of', 'people', 'are', 'coming', 'to', 'the', 'house.'],
      ru: ['Много', 'людей', 'приходят', 'в', 'дом'],
    },
    answerTranslation: L(
      '많은 사람들이 집으로 오고 있어요.',
      'Ko‘p odamlar uyga kelyapti.',
      'A lot of people are coming to the house.',
      'Много людей приходят в дом.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['indian-wedding'],
  },

  en_s2u5_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Women in India usually ___ a sari for their wedding.',
    blankAnswers: ['wear'],
    options: ['wear', 'are wearing', 'wearing', 'wears'],
    answer: 'wear',
    answerTranslation: L(
      '인도 여성들은 결혼식 때 보통 sari를 입어요.',
      'Hindistondagi ayollar to‘yda odatda sari kiyadi.',
      'Women in India usually wear a sari for their wedding.',
      'Женщины в Индии обычно надевают сари на свадьбу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'review'],
  },

  en_s2u5_n2_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Today Ashna ___ ready for her wedding.',
    blankAnswers: ['is getting'],
    options: ['is getting', 'gets', 'get', 'getting'],
    answer: 'is getting',
    answerTranslation: L(
      '오늘 Ashna는 결혼식 준비를 하고 있어요.',
      'Bugun Ashna to‘yiga tayyorlanyapti.',
      'Today Ashna is getting ready for her wedding.',
      'Сегодня Ашна готовится к свадьбе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-continuous', 'review'],
  },

  en_s2u5_n2_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Ashna lives in Mumbai, and today she is getting ready for her wedding.',
    audioText:
      'Ashna lives in Mumbai, and today she is getting ready for her wedding.',
    answerTranslation: L(
      'Ashna는 Mumbai에 살고 있고 오늘은 결혼식 준비를 하고 있어요.',
      'Ashna Mumbayda yashaydi va bugun to‘yiga tayyorlanyapti.',
      'Ashna lives in Mumbai, and today she is getting ready for her wedding.',
      'Ашна живёт в Мумбаи, а сегодня готовится к своей свадьбе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['indian-wedding', 'review'],
  },

  en_s2u5_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'She usually wears normal everyday clothes, but today she is wearing a red sari.',
    audioText:
      'She usually wears normal everyday clothes, but today she is wearing a red sari.',
    answerTranslation: L(
      '그녀는 평소에는 일상복을 입지만 오늘은 빨간 sari를 입고 있어요.',
      'U odatda kundalik kiyim kiyadi, lekin bugun qizil sari kiyib turibdi.',
      'She usually wears normal everyday clothes, but today she is wearing a red sari.',
      'Обычно она носит повседневную одежду, но сегодня на ней красное сари.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['present-simple', 'present-continuous'],
  },

  en_s2u5_n2_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 5.2, we talk about clothes and accessories and use the present continuous to describe actions happening at the moment.',
    audioText:
      'In Unit 5.2, we talk about clothes and accessories and use the present continuous to describe actions happening at the moment.',
    answerTranslation: L(
      'Unit 5.2에서는 옷과 액세서리에 대해 이야기하고 지금 일어나고 있는 행동을 현재진행형으로 표현해요.',
      'Unit 5.2 da kiyim va aksessuarlar haqida gapiramiz va hozir sodir bo‘layotgan harakatlarni present continuous bilan ifodalaymiz.',
      'In Unit 5.2, we talk about clothes and accessories and use the present continuous to describe actions happening at the moment.',
      'В Unit 5.2 мы говорим об одежде и аксессуарах и используем present continuous для действий, происходящих сейчас.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE2 = {
  title: L(
    '그는 무엇을 입고 있나요?',
    'U nima kiyib turibdi?',
    'What is he wearing?',
    'Во что он одет?',
  ),
  section: 2,
  unit: 5,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '옷과 액세서리',
        'Kiyim va aksessuarlar',
        'Clothes and accessories',
        'Одежда и аксессуары',
      ),
      description: L(
        'coat, dress, jeans, skirt, suit, scarf, gloves, trainers, umbrella 등 Unit 5.2의 핵심 옷과 액세서리를 익혀요.',
        'Coat, dress, jeans, skirt, suit, scarf, gloves, trainers va umbrella kabi Unit 5.2 asosiy kiyim va aksessuarlarini o‘rganasiz.',
        'Learn the main clothes and accessories vocabulary from Unit 5.2.',
        'Изучаем основную лексику одежды и аксессуаров из Unit 5.2.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u5_n2_001_word_matching',
        'en_s2u5_n2_002_word_matching',
        'en_s2u5_n2_003_word_matching',
        'en_s2u5_n2_004_fill_in_blank',
        'en_s2u5_n2_005_fill_in_blank',
        'en_s2u5_n2_006_fill_in_blank',
        'en_s2u5_n2_007_fill_in_blank',
        'en_s2u5_n2_008_fill_in_blank',
        'en_s2u5_n2_009_fill_in_blank',
        'en_s2u5_n2_010_fill_in_blank',
        'en_s2u5_n2_011_fill_in_blank',
        'en_s2u5_n2_012_fill_in_blank',
        'en_s2u5_n2_013_dialog_complete',
        'en_s2u5_n2_014_dialog_complete',
        'en_s2u5_n2_015_fill_in_blank',
        'en_s2u5_n2_016_word_arrange',
        'en_s2u5_n2_017_translate_builder',
        'en_s2u5_n2_018_sentence_builder',
        'en_s2u5_n2_019_speaking',
        'en_s2u5_n2_020_speaking',
      ],
    },

    {
      title: L(
        '현재진행형',
        'Present continuous',
        'Present continuous',
        'Present continuous',
      ),
      description: L(
        'am/is/are + -ing 형태로 지금 일어나고 있는 행동을 표현하고 긍정문, 부정문, 의문문을 연습해요.',
        'Am/is/are + -ing yordamida hozir sodir bo‘layotgan harakatlarni ifodalab, ijobiy, inkor va so‘roq gaplarni mashq qilasiz.',
        'Use am, is and are with -ing forms to describe actions happening now.',
        'Используем am, is и are с формой -ing для действий, происходящих сейчас.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u5_n2_021_fill_in_blank',
        'en_s2u5_n2_022_fill_in_blank',
        'en_s2u5_n2_023_fill_in_blank',
        'en_s2u5_n2_024_fill_in_blank',
        'en_s2u5_n2_025_fill_in_blank',
        'en_s2u5_n2_026_fill_in_blank',
        'en_s2u5_n2_027_fill_in_blank',
        'en_s2u5_n2_028_fill_in_blank',
        'en_s2u5_n2_029_fill_in_blank',
        'en_s2u5_n2_030_fill_in_blank',
        'en_s2u5_n2_031_fill_in_blank',
        'en_s2u5_n2_032_fill_in_blank',
        'en_s2u5_n2_033_fill_in_blank',
        'en_s2u5_n2_034_fill_in_blank',
        'en_s2u5_n2_035_fill_in_blank',
        'en_s2u5_n2_036_word_arrange',
        'en_s2u5_n2_037_translate_builder',
        'en_s2u5_n2_038_sentence_builder',
        'en_s2u5_n2_039_speaking',
        'en_s2u5_n2_040_speaking',
      ],
    },

    {
      title: L(
        '현재시제와 현재진행형',
        'Present simple va present continuous',
        'Present continuous or present simple',
        'Present simple или present continuous',
      ),
      description: L(
        '습관·일반적인 사실에는 present simple을, 지금 진행 중인 행동에는 present continuous를 사용해 구분해요.',
        'Odat va umumiy holatlar uchun present simple, hozirgi harakatlar uchun present continuous ishlatilishini farqlaysiz.',
        'Contrast routines in the present simple with actions happening now in the present continuous.',
        'Сравниваем present simple для привычек и present continuous для текущих действий.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u5_n2_041_fill_in_blank',
        'en_s2u5_n2_042_fill_in_blank',
        'en_s2u5_n2_043_fill_in_blank',
        'en_s2u5_n2_044_fill_in_blank',
        'en_s2u5_n2_045_fill_in_blank',
        'en_s2u5_n2_046_fill_in_blank',
        'en_s2u5_n2_047_fill_in_blank',
        'en_s2u5_n2_048_fill_in_blank',
        'en_s2u5_n2_049_fill_in_blank',
        'en_s2u5_n2_050_fill_in_blank',
        'en_s2u5_n2_051_dialog_complete',
        'en_s2u5_n2_052_dialog_complete',
        'en_s2u5_n2_053_fill_in_blank',
        'en_s2u5_n2_054_fill_in_blank',
        'en_s2u5_n2_055_fill_in_blank',
        'en_s2u5_n2_056_word_arrange',
        'en_s2u5_n2_057_translate_builder',
        'en_s2u5_n2_058_sentence_builder',
        'en_s2u5_n2_059_speaking',
        'en_s2u5_n2_060_speaking',
      ],
    },

    {
      title: L(
        '인도의 결혼식',
        'Hind to‘yi',
        'An Indian wedding',
        'Индийская свадьба',
      ),
      description: L(
        'Workbook의 An Indian wedding 글을 통해 present simple과 present continuous를 실제 문맥에서 복습하고 Unit 5.2를 마무리해요.',
        'Workbookdagi An Indian wedding matni orqali present simple va present continuous ni haqiqiy kontekstda takrorlaysiz.',
        'Review the two present tenses through the workbook reading An Indian wedding.',
        'Повторяем два настоящих времени по тексту An Indian wedding.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u5_n2_061_fill_in_blank',
        'en_s2u5_n2_062_fill_in_blank',
        'en_s2u5_n2_063_fill_in_blank',
        'en_s2u5_n2_064_fill_in_blank',
        'en_s2u5_n2_065_fill_in_blank',
        'en_s2u5_n2_066_fill_in_blank',
        'en_s2u5_n2_067_fill_in_blank',
        'en_s2u5_n2_068_fill_in_blank',
        'en_s2u5_n2_069_dialog_complete',
        'en_s2u5_n2_070_dialog_complete',
        'en_s2u5_n2_071_dialog_complete',
        'en_s2u5_n2_072_dialog_complete',
        'en_s2u5_n2_073_word_arrange',
        'en_s2u5_n2_074_translate_builder',
        'en_s2u5_n2_075_sentence_builder',
        'en_s2u5_n2_076_fill_in_blank',
        'en_s2u5_n2_077_fill_in_blank',
        'en_s2u5_n2_078_speaking',
        'en_s2u5_n2_079_speaking',
        'en_s2u5_n2_080_speaking',
      ],
    },
  ],
}; // ─────────────────────────────────────────────────────────────
// Section 2 · Unit 5 · Node 3
// 5.3 Vocabulary and skills development
//
// Coverage
// - understanding similar vowel sounds
// - vowel groups from Coursebook 5.3
// - adjectives and adverbs
// - adjective + -ly
// - easy → easily
// - good → well
// - fast → fast
// - hard → hard
// - late → late
// - shopping vocabulary review
// - clothes vs accessories review
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE3_WORDS = [
  {
    code: 'en-adv-quickly',
    english: 'quickly',
    senseKey: 'in-a-fast-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('빠르게', 'tez', 'in a fast way', 'быстро'),
    examples: [
      {
        english: 'I leave quickly.',
        translations: L(
          '저는 빠르게 떠나요.',
          'Men tez ketaman.',
          'I leave quickly.',
          'Я быстро ухожу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkwɪkli/',
      ttsText: 'quickly',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-easily',
    english: 'easily',
    senseKey: 'without-difficulty',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('쉽게', 'osonlik bilan', 'without difficulty', 'легко'),
    examples: [
      {
        english: 'I find the right jeans easily.',
        translations: L(
          '저는 맞는 청바지를 쉽게 찾아요.',
          'Men mos jinsi shimni oson topaman.',
          'I find the right jeans easily.',
          'Я легко нахожу подходящие джинсы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈiːzəli/',
      ttsText: 'easily',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-safely',
    english: 'safely',
    senseKey: 'in-a-safe-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '안전하게',
      'xavfsiz tarzda',
      'in a way that is safe',
      'безопасно',
    ),
    examples: [
      {
        english: 'Please drive safely.',
        translations: L(
          '안전하게 운전하세요.',
          'Iltimos, xavfsiz haydang.',
          'Please drive safely.',
          'Пожалуйста, водите безопасно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈseɪfli/',
      ttsText: 'safely',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-badly',
    english: 'badly',
    senseKey: 'in-a-bad-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '나쁘게; 서투르게',
      'yomon',
      'in a bad or unsuccessful way',
      'плохо',
    ),
    examples: [
      {
        english: 'I sing really badly.',
        translations: L(
          '저는 노래를 정말 못해요.',
          'Men juda yomon kuylayman.',
          'I sing really badly.',
          'Я очень плохо пою.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbædli/',
      ttsText: 'badly',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-carefully',
    english: 'carefully',
    senseKey: 'with-care-and-attention',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '조심스럽게; 주의 깊게',
      'ehtiyotkorlik bilan',
      'with care and attention',
      'осторожно',
    ),
    examples: [
      {
        english: 'I always drive carefully.',
        translations: L(
          '저는 항상 조심해서 운전해요.',
          'Men har doim ehtiyotkorlik bilan haydayman.',
          'I always drive carefully.',
          'Я всегда вожу осторожно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkeəfəli/',
      ttsText: 'carefully',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-quietly',
    english: 'quietly',
    senseKey: 'without-making-much-noise',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('조용히', 'sekin', 'without making much noise', 'тихо'),
    examples: [
      {
        english: 'Please play quietly.',
        translations: L(
          '조용히 놀아 주세요.',
          'Iltimos, sekin o‘ynang.',
          'Please play quietly.',
          'Пожалуйста, играйте тихо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkwaɪətli/',
      ttsText: 'quietly',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-clearly',
    english: 'clearly',
    senseKey: 'in-an-easy-to-see-or-understand-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '분명하게; 또렷하게',
      'aniq',
      'in a way that is easy to see, hear or understand',
      'ясно',
    ),
    examples: [
      {
        english: 'I cannot see the television clearly.',
        translations: L(
          '저는 텔레비전이 선명하게 보이지 않아요.',
          'Men televizorni aniq ko‘ra olmayman.',
          'I cannot see the television clearly.',
          'Я не могу ясно видеть телевизор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈklɪəli/',
      ttsText: 'clearly',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-dangerously',
    english: 'dangerously',
    senseKey: 'in-a-dangerous-way',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '위험하게',
      'xavfli tarzda',
      'in a way that may cause danger',
      'опасно',
    ),
    examples: [
      {
        english: 'Do not drive dangerously.',
        translations: L(
          '위험하게 운전하지 마세요.',
          'Xavfli tarzda haydamang.',
          'Do not drive dangerously.',
          'Не водите опасно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdeɪndʒərəsli/',
      ttsText: 'dangerously',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adv-correctly',
    english: 'correctly',
    senseKey: 'without-making-a-mistake',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '정확하게',
      'to‘g‘ri',
      'in a correct way, without mistakes',
      'правильно',
    ),
    examples: [
      {
        english: 'Maria answers every question correctly.',
        translations: L(
          'Maria는 모든 질문에 정확하게 답해요.',
          'Maria har bir savolga to‘g‘ri javob beradi.',
          'Maria answers every question correctly.',
          'Мария правильно отвечает на каждый вопрос.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈrektli/',
      ttsText: 'correctly',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adv-slowly',
    english: 'slowly',
    senseKey: 'at-a-slow-speed',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('천천히', 'sekin', 'at a slow speed', 'медленно'),
    examples: [
      {
        english: 'Please drive slowly.',
        translations: L(
          '천천히 운전하세요.',
          'Iltimos, sekin haydang.',
          'Please drive slowly.',
          'Пожалуйста, езжайте медленно.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsləʊli/',
      ttsText: 'slowly',
    },
    tags: ['adverbs', 'unit5'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT5_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Understanding similar vowel sounds
  // ===========================================================

  en_s2u5_n3_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '같은 모음 소리가 나는 단어를 연결하세요.',
      'Bir xil unli tovushli so‘zlarni moslang.',
      'Match the words with the same vowel sound.',
      'Соедините слова с одинаковым гласным звуком.',
    ),
    pairs: [
      {
        text: 'hate',
        native: 'take',
        nativeI18n: L('take', 'take', 'take', 'take'),
      },
      {
        text: 'mat',
        native: 'man',
        nativeI18n: L('man', 'man', 'man', 'man'),
      },
      {
        text: 'boat',
        native: 'note',
        nativeI18n: L('note', 'note', 'note', 'note'),
      },
      {
        text: 'shop',
        native: 'not',
        nativeI18n: L('not', 'not', 'not', 'not'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '같은 모음 소리가 나는 단어를 연결하세요.',
      'Bir xil unli tovushli so‘zlarni moslang.',
      'Match the words with the same vowel sound.',
      'Соедините слова с одинаковым гласным звуком.',
    ),
    pairs: [
      {
        text: 'shut',
        native: 'one',
        nativeI18n: L('one', 'one', 'one', 'one'),
      },
      {
        text: 'cheap',
        native: 'jeans',
        nativeI18n: L('jeans', 'jeans', 'jeans', 'jeans'),
      },
      {
        text: 'live',
        native: 'tin',
        nativeI18n: L('tin', 'tin', 'tin', 'tin'),
      },
      {
        text: 'text',
        native: 'press',
        nativeI18n: L('press', 'press', 'press', 'press'),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      '“hate”, “take”, “sales” and “page” have the same ___ sound.',
    blankAnswers: ['vowel'],
    options: ['vowel', 'final', 'plural', 'consonant'],
    answer: 'vowel',
    answerTranslation: L(
      'hate, take, sales, page는 같은 모음 소리를 가져요.',
      'hate, take, sales va page bir xil unli tovushga ega.',
      'Hate, take, sales and page have the same vowel sound.',
      'Hate, take, sales и page имеют одинаковый гласный звук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “hate”?',
    blankAnswers: ['take'],
    options: ['take', 'tin', 'shop', 'one'],
    answer: 'take',
    answerTranslation: L(
      'hate와 같은 모음 소리가 나는 단어는 take예요.',
      'hate bilan bir xil unli tovushli so‘z take.',
      'Take has the same vowel sound as hate.',
      'Take имеет тот же гласный звук, что и hate.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “mat”?',
    blankAnswers: ['stand'],
    options: ['stand', 'sales', 'note', 'cheap'],
    answer: 'stand',
    answerTranslation: L(
      'mat과 같은 모음 소리가 나는 단어는 stand예요.',
      'mat bilan bir xil unli tovushli so‘z stand.',
      'Stand has the same vowel sound as mat.',
      'Stand имеет тот же гласный звук, что и mat.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “boat”?',
    blankAnswers: ['coat'],
    options: ['coat', 'lots', 'press', 'thing'],
    answer: 'coat',
    answerTranslation: L(
      'boat와 같은 모음 소리가 나는 단어는 coat예요.',
      'boat bilan bir xil unli tovushli so‘z coat.',
      'Coat has the same vowel sound as boat.',
      'Coat имеет тот же гласный звук, что и boat.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “shop”?',
    blankAnswers: ['long'],
    options: ['long', 'jeans', 'take', 'one'],
    answer: 'long',
    answerTranslation: L(
      'shop과 같은 모음 소리가 나는 단어는 long이에요.',
      'shop bilan bir xil unli tovushli so‘z long.',
      'Long has the same vowel sound as shop.',
      'Long имеет тот же гласный звук, что и shop.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “shut”?',
    blankAnswers: ['one'],
    options: ['one', 'coat', 'press', 'man'],
    answer: 'one',
    answerTranslation: L(
      'shut과 같은 모음 소리가 나는 단어는 one이에요.',
      'shut bilan bir xil unli tovushli so‘z one.',
      'One has the same vowel sound as shut.',
      'One имеет тот же гласный звук, что и shut.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “cheap”?',
    blankAnswers: ['eat'],
    options: ['eat', 'text', 'tin', 'mat'],
    answer: 'eat',
    answerTranslation: L(
      'cheap과 같은 모음 소리가 나는 단어는 eat예요.',
      'cheap bilan bir xil unli tovushli so‘z eat.',
      'Eat has the same vowel sound as cheap.',
      'Eat имеет тот же гласный звук, что и cheap.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “live”?',
    blankAnswers: ['thing'],
    options: ['thing', 'page', 'coat', 'stand'],
    answer: 'thing',
    answerTranslation: L(
      'live와 같은 모음 소리가 나는 단어는 thing이에요.',
      'live bilan bir xil unli tovushli so‘z thing.',
      'Thing has the same vowel sound as live.',
      'Thing имеет тот же гласный звук, что и live.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Which word has the same vowel sound as “text”?',
    blankAnswers: ['press'],
    options: ['press', 'jeans', 'lots', 'note'],
    answer: 'press',
    answerTranslation: L(
      'text와 같은 모음 소리가 나는 단어는 press예요.',
      'text bilan bir xil unli tovushli so‘z press.',
      'Press has the same vowel sound as text.',
      'Press имеет тот же гласный звук, что и text.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_012_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which group has the same vowel sound?',
      },
    ],
    options: [
      'boat – note – coat',
      'boat – man – thing',
      'boat – shut – text',
      'boat – cheap – tin',
    ],
    answer: 'boat – note – coat',
    answerTranslation: L(
      'boat – note – coat가 같은 모음 소리 그룹이에요.',
      'boat – note – coat bir xil unli tovush guruhidir.',
      'Boat, note and coat have the same vowel sound.',
      'Boat, note и coat имеют одинаковый гласный звук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which group has the same vowel sound?',
      },
    ],
    options: [
      'shop – long – lots – not',
      'shop – one – page – tin',
      'shop – jeans – take – coat',
      'shop – man – press – thing',
    ],
    answer: 'shop – long – lots – not',
    answerTranslation: L(
      'shop – long – lots – not이 같은 모음 소리 그룹이에요.',
      'shop – long – lots – not bir xil unli tovush guruhidir.',
      'Shop, long, lots and not have the same vowel sound.',
      'Shop, long, lots и not имеют одинаковый гласный звук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which group has the same vowel sound?',
      },
    ],
    options: [
      'cheap – eat – jeans',
      'cheap – mat – text',
      'cheap – lots – one',
      'cheap – note – tin',
    ],
    answer: 'cheap – eat – jeans',
    answerTranslation: L(
      'cheap – eat – jeans가 같은 모음 소리 그룹이에요.',
      'cheap – eat – jeans bir xil unli tovush guruhidir.',
      'Cheap, eat and jeans have the same vowel sound.',
      'Cheap, eat и jeans имеют одинаковый гласный звук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What can help you understand similar vowel sounds?',
      },
    ],
    options: [
      'Listening carefully to the vowel in each word.',
      'Only looking at the first letter.',
      'Ignoring pronunciation.',
      'Only translating the word.',
    ],
    answer: 'Listening carefully to the vowel in each word.',
    answerTranslation: L(
      '각 단어의 모음 소리를 주의 깊게 들으면 도움이 돼요.',
      'Har bir so‘zdagi unli tovushni diqqat bilan tinglash yordam beradi.',
      'Listening carefully to the vowel in each word helps.',
      'Помогает внимательно слушать гласный звук в каждом слове.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['vowel-sounds', 'strategy'],
  },

  en_s2u5_n3_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['hate', 'take', 'sales', 'page'],
    answer: 'hate take sales page',
    audioText: 'hate, take, sales, page',
    answerTranslation: L(
      'hate, take, sales, page는 같은 모음 소리를 가져요.',
      'hate, take, sales va page bir xil unli tovushga ega.',
      'Hate, take, sales and page have the same vowel sound.',
      'Hate, take, sales и page имеют одинаковый гласный звук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds'],
  },

  en_s2u5_n3_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'hate, take, sales, page',
    audioText: 'hate, take, sales, page',
    answerTranslation: L(
      '같은 모음 소리를 가진 단어들을 발음해 보세요.',
      'Bir xil unli tovushli so‘zlarni talaffuz qiling.',
      'Practise the words with the same vowel sound.',
      'Произнесите слова с одинаковым гласным звуком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds', 'pronunciation'],
  },

  en_s2u5_n3_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'boat, note, coat',
    audioText: 'boat, note, coat',
    answerTranslation: L(
      'boat, note, coat를 발음해 보세요.',
      'boat, note, coat so‘zlarini talaffuz qiling.',
      'Practise: boat, note, coat.',
      'Произнесите: boat, note, coat.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds', 'pronunciation'],
  },

  en_s2u5_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'cheap, eat, jeans',
    audioText: 'cheap, eat, jeans',
    answerTranslation: L(
      'cheap, eat, jeans를 발음해 보세요.',
      'cheap, eat, jeans so‘zlarini talaffuz qiling.',
      'Practise: cheap, eat, jeans.',
      'Произнесите: cheap, eat, jeans.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['vowel-sounds', 'pronunciation'],
  },

  en_s2u5_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Words can look different but still contain the same vowel sound.',
    audioText:
      'Words can look different but still contain the same vowel sound.',
    answerTranslation: L(
      '철자가 달라도 같은 모음 소리가 날 수 있어요.',
      'So‘zlarning yozilishi har xil bo‘lsa ham, unli tovushi bir xil bo‘lishi mumkin.',
      'Words can look different but still contain the same vowel sound.',
      'Слова могут писаться по-разному, но иметь одинаковый гласный звук.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['vowel-sounds', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Adjectives and adverbs
  // ===========================================================

  en_s2u5_n3_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is a ___ worker.',
    blankAnswers: ['quick'],
    options: ['quick', 'quickly', 'carefully', 'easily'],
    answer: 'quick',
    answerTranslation: L(
      '그는 빠른 직원이에요.',
      'U tez ishlaydigan ishchi.',
      'He is a quick worker.',
      'Он быстрый работник.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives', 'adverbs'],
  },

  en_s2u5_n3_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He works ___.',
    blankAnswers: ['quickly'],
    options: ['quickly', 'quick', 'safe', 'easy'],
    answer: 'quickly',
    answerTranslation: L(
      '그는 빠르게 일해요.',
      'U tez ishlaydi.',
      'He works quickly.',
      'Он работает быстро.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives', 'adverbs'],
  },

  en_s2u5_n3_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adjectives describe people and ___.',
    blankAnswers: ['things'],
    options: ['things', 'verbs only', 'sounds only', 'questions only'],
    answer: 'things',
    answerTranslation: L(
      '형용사는 사람과 사물을 설명해요.',
      'Sifatlar odamlar va narsalarni tasvirlaydi.',
      'Adjectives describe people and things.',
      'Прилагательные описывают людей и предметы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives'],
  },

  en_s2u5_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Adverbs of manner tell us ___ something happens.',
    blankAnswers: ['how'],
    options: ['how', 'who', 'where only', 'which person'],
    answer: 'how',
    answerTranslation: L(
      '방법을 나타내는 부사는 어떤 일이 어떻게 일어나는지 알려 줘요.',
      'Ravishlar ish-harakat qanday sodir bo‘lishini bildiradi.',
      'Adverbs of manner tell us how something happens.',
      'Наречия образа действия показывают, как происходит действие.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Many adverbs are formed with adjective + ___.',
    blankAnswers: ['-ly'],
    options: ['-ly', '-ing', '-ed', '-s'],
    answer: '-ly',
    answerTranslation: L(
      '많은 부사는 형용사 + -ly로 만들어져요.',
      'Ko‘p ravishlar sifat + -ly yordamida yasaladi.',
      'Many adverbs are formed with adjective + -ly.',
      'Многие наречия образуются при помощи adjective + -ly.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'quick → ___.',
    blankAnswers: ['quickly'],
    options: ['quickly', 'quick', 'quicker', 'quicking'],
    answer: 'quickly',
    answerTranslation: L(
      'quick의 부사형은 quickly예요.',
      'quick ning ravish shakli quickly.',
      'Quick becomes quickly.',
      'Quick превращается в quickly.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'safe → ___.',
    blankAnswers: ['safely'],
    options: ['safely', 'safe', 'safety', 'safeing'],
    answer: 'safely',
    answerTranslation: L(
      'safe의 부사형은 safely예요.',
      'safe ning ravish shakli safely.',
      'Safe becomes safely.',
      'Safe превращается в safely.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'easy → ___.',
    blankAnswers: ['easily'],
    options: ['easily', 'easyly', 'easy', 'easier'],
    answer: 'easily',
    answerTranslation: L(
      'easy의 부사형은 easily예요.',
      'easy ning ravish shakli easily.',
      'Easy becomes easily.',
      'Easy превращается в easily.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs', 'spelling'],
  },

  en_s2u5_n3_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'bad → ___.',
    blankAnswers: ['badly'],
    options: ['badly', 'bad', 'badily', 'worse'],
    answer: 'badly',
    answerTranslation: L(
      'bad의 부사형은 badly예요.',
      'bad ning ravish shakli badly.',
      'Bad becomes badly.',
      'Bad превращается в badly.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'good → ___.',
    blankAnswers: ['well'],
    options: ['well', 'goodly', 'good', 'betterly'],
    answer: 'well',
    answerTranslation: L(
      'good의 부사형은 well이에요.',
      'good ning ravish shakli well.',
      'The adverb form of good is well.',
      'Наречная форма good — well.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs', 'irregular'],
  },

  en_s2u5_n3_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She writes ___.',
    blankAnswers: ['well'],
    options: ['well', 'good', 'goodly', 'better'],
    answer: 'well',
    answerTranslation: L(
      '그녀는 글을 잘 써요.',
      'U yaxshi yozadi.',
      'She writes well.',
      'Она хорошо пишет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'well'],
  },

  en_s2u5_n3_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is a very ___ worker.',
    blankAnswers: ['hard'],
    options: ['hard', 'hardly', 'carefully', 'well'],
    answer: 'hard',
    answerTranslation: L(
      '그는 매우 열심히 일하는 사람이에요.',
      'U juda mehnatkash ishchi.',
      'He is a very hard worker.',
      'Он очень усердный работник.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives'],
  },

  en_s2u5_n3_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I work ___.',
    blankAnswers: ['hard'],
    options: ['hard', 'hardly', 'hardlyly', 'hardly hard'],
    answer: 'hard',
    answerTranslation: L(
      '저는 열심히 일해요.',
      'Men qattiq ishlayman.',
      'I work hard.',
      'Я усердно работаю.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'irregular'],
  },

  en_s2u5_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The train arrives ___.',
    blankAnswers: ['late'],
    options: ['late', 'lately', 'laterly', 'lates'],
    answer: 'late',
    answerTranslation: L(
      '기차가 늦게 도착해요.',
      'Poyezd kech keladi.',
      'The train arrives late.',
      'Поезд прибывает поздно.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'irregular'],
  },

  en_s2u5_n3_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is a ___ swimmer.',
    blankAnswers: ['fast'],
    options: ['fast', 'fastly', 'quickly', 'well'],
    answer: 'fast',
    answerTranslation: L(
      '그는 빠른 수영 선수예요.',
      'U tez suzuvchi.',
      'He is a fast swimmer.',
      'Он быстрый пловец.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives'],
  },

  en_s2u5_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He swims ___.',
    blankAnswers: ['fast'],
    options: ['fast', 'fastly', 'fastestly', 'quick'],
    answer: 'fast',
    answerTranslation: L(
      '그는 빠르게 수영해요.',
      'U tez suzadi.',
      'He swims fast.',
      'Он быстро плавает.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'irregular'],
  },

  en_s2u5_n3_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['He', 'works', 'quickly'],
    answer: 'He works quickly',
    audioText: 'He works quickly.',
    answerTranslation: L(
      '그는 빠르게 일해요.',
      'U tez ishlaydi.',
      'He works quickly.',
      'Он работает быстро.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_038_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Please', 'drive', 'safely'],
    answer: 'Please drive safely',
    answerTranslation: L(
      '안전하게 운전하세요.',
      'Iltimos, xavfsiz haydang.',
      'Please drive safely.',
      'Пожалуйста, водите безопасно.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_039_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I find the right jeans easily.',
    audioText: 'I find the right jeans easily.',
    answerI18n: L(
      '저는 맞는 청바지를 쉽게 찾아요',
      'Men mos jinsi shimni oson topaman',
      'I find the right jeans easily',
      'Я легко нахожу подходящие джинсы',
    ),
    options: ['I', 'find', 'the', 'right', 'jeans', 'easily.'],
    optionsI18n: {
      ko: ['저는', '맞는', '청바지를', '쉽게', '찾아요'],
      uz: ['Men', 'mos', 'jinsi', 'shimni', 'oson', 'topaman'],
      en: ['I', 'find', 'the', 'right', 'jeans', 'easily.'],
      ru: ['Я', 'легко', 'нахожу', 'подходящие', 'джинсы'],
    },
    answerTranslation: L(
      '저는 맞는 청바지를 쉽게 찾아요.',
      'Men mos jinsi shimni oson topaman.',
      'I find the right jeans easily.',
      'Я легко нахожу подходящие джинсы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['adverbs'],
  },

  en_s2u5_n3_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Adjectives describe people and things, while adverbs describe how an action happens.',
    audioText:
      'Adjectives describe people and things, while adverbs describe how an action happens.',
    answerTranslation: L(
      '형용사는 사람과 사물을 설명하고 부사는 행동이 어떻게 일어나는지 설명해요.',
      'Sifatlar odam va narsalarni, ravishlar esa harakat qanday sodir bo‘lishini tasvirlaydi.',
      'Adjectives describe people and things, while adverbs describe how an action happens.',
      'Прилагательные описывают людей и предметы, а наречия — как происходит действие.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['adjectives', 'adverbs', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Adverb forms and use
  // ===========================================================

  en_s2u5_n3_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'quiet → ___.',
    blankAnswers: ['quietly'],
    options: ['quietly', 'quiet', 'quietily', 'quieter'],
    answer: 'quietly',
    answerTranslation: L(
      'quiet의 부사형은 quietly예요.',
      'quiet ning ravish shakli quietly.',
      'Quiet becomes quietly.',
      'Quiet превращается в quietly.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'careful → ___.',
    blankAnswers: ['carefully'],
    options: ['carefully', 'careful', 'carefuly', 'care'],
    answer: 'carefully',
    answerTranslation: L(
      'careful의 부사형은 carefully예요.',
      'careful ning ravish shakli carefully.',
      'Careful becomes carefully.',
      'Careful превращается в carefully.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'clear → ___.',
    blankAnswers: ['clearly'],
    options: ['clearly', 'clear', 'cleary', 'clearer'],
    answer: 'clearly',
    answerTranslation: L(
      'clear의 부사형은 clearly예요.',
      'clear ning ravish shakli clearly.',
      'Clear becomes clearly.',
      'Clear превращается в clearly.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'dangerous → ___.',
    blankAnswers: ['dangerously'],
    options: ['dangerously', 'dangerous', 'dangerly', 'danger'],
    answer: 'dangerously',
    answerTranslation: L(
      'dangerous의 부사형은 dangerously예요.',
      'dangerous ning ravish shakli dangerously.',
      'Dangerous becomes dangerously.',
      'Dangerous превращается в dangerously.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['adverbs'],
  },

  en_s2u5_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'correct → ___.',
    blankAnswers: ['correctly'],
    options: ['correctly', 'correct', 'correctily', 'correction'],
    answer: 'correctly',
    answerTranslation: L(
      'correct의 부사형은 correctly예요.',
      'correct ning ravish shakli correctly.',
      'Correct becomes correctly.',
      'Correct превращается в correctly.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'slow → ___.',
    blankAnswers: ['slowly'],
    options: ['slowly', 'slow', 'slowily', 'slower'],
    answer: 'slowly',
    answerTranslation: L(
      'slow의 부사형은 slowly예요.',
      'slow ning ravish shakli slowly.',
      'Slow becomes slowly.',
      'Slow превращается в slowly.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I always drive ___.',
    blankAnswers: ['carefully'],
    options: ['carefully', 'careful', 'care', 'carefulness'],
    answer: 'carefully',
    answerTranslation: L(
      '저는 항상 조심해서 운전해요.',
      'Men har doim ehtiyotkorlik bilan haydayman.',
      'I always drive carefully.',
      'Я всегда вожу осторожно.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'workbook'],
  },

  en_s2u5_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Please play ___.',
    blankAnswers: ['quietly'],
    options: ['quietly', 'quiet', 'quieter', 'quietness'],
    answer: 'quietly',
    answerTranslation: L(
      '조용히 놀아 주세요.',
      'Iltimos, sekin o‘ynang.',
      'Please play quietly.',
      'Пожалуйста, играйте тихо.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'workbook'],
  },

  en_s2u5_n3_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My sister cooks ___.',
    blankAnswers: ['well'],
    options: ['well', 'good', 'goodly', 'betterly'],
    answer: 'well',
    answerTranslation: L(
      '제 여동생은 요리를 잘해요.',
      'Singlim yaxshi ovqat pishiradi.',
      'My sister cooks well.',
      'Моя сестра хорошо готовит.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'workbook'],
  },

  en_s2u5_n3_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I cannot see the television ___.',
    blankAnswers: ['clearly'],
    options: ['clearly', 'clear', 'carefully', 'correct'],
    answer: 'clearly',
    answerTranslation: L(
      '저는 텔레비전이 선명하게 보이지 않아요.',
      'Men televizorni aniq ko‘ra olmayman.',
      'I cannot see the television clearly.',
      'Я не могу ясно видеть телевизор.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Maria answers every question ___.',
    blankAnswers: ['correctly'],
    options: ['correctly', 'correct', 'clear', 'good'],
    answer: 'correctly',
    answerTranslation: L(
      'Maria는 모든 질문에 정확하게 답해요.',
      'Maria har bir savolga to‘g‘ri javob beradi.',
      'Maria answers every question correctly.',
      'Мария правильно отвечает на каждый вопрос.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Why are you driving so ___?',
    blankAnswers: ['dangerously'],
    options: ['dangerously', 'dangerous', 'danger', 'safely'],
    answer: 'dangerously',
    answerTranslation: L(
      '왜 그렇게 위험하게 운전하고 있나요?',
      'Nega bunchalik xavfli haydayapsiz?',
      'Why are you driving so dangerously?',
      'Почему вы так опасно ведёте машину?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Why are you talking so ___?',
    blankAnswers: ['quietly'],
    options: ['quietly', 'quiet', 'quickly', 'badly'],
    answer: 'quietly',
    answerTranslation: L(
      '왜 그렇게 조용히 말하고 있나요?',
      'Nega bunchalik sekin gapiryapsiz?',
      'Why are you talking so quietly?',
      'Почему вы говорите так тихо?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I always get up ___ at weekends.',
    blankAnswers: ['late'],
    options: ['late', 'lately', 'slowly', 'badly'],
    answer: 'late',
    answerTranslation: L(
      '저는 주말에는 항상 늦게 일어나요.',
      'Men dam olish kunlari har doim kech turaman.',
      'I always get up late at weekends.',
      'По выходным я всегда встаю поздно.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Did you do ___ in your exam?',
    blankAnswers: ['well'],
    options: ['well', 'good', 'correct', 'careful'],
    answer: 'well',
    answerTranslation: L(
      '시험 잘 봤나요?',
      'Imtihonni yaxshi topshirdingizmi?',
      'Did you do well in your exam?',
      'Вы хорошо сдали экзамен?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'This is a ___ train.',
    blankAnswers: ['slow'],
    options: ['slow', 'slowly', 'slowness', 'slowerly'],
    answer: 'slow',
    answerTranslation: L(
      '이것은 느린 기차예요.',
      'Bu sekin poyezd.',
      'This is a slow train.',
      'Это медленный поезд.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives', 'workbook'],
  },

  en_s2u5_n3_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I do not speak French very ___.',
    blankAnswers: ['well'],
    options: ['well', 'good', 'goodly', 'correct'],
    answer: 'well',
    answerTranslation: L(
      '저는 프랑스어를 아주 잘하지는 못해요.',
      'Men fransuz tilida unchalik yaxshi gapirmayman.',
      'I do not speak French very well.',
      'Я не очень хорошо говорю по-французски.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'workbook'],
  },

  en_s2u5_n3_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What is the ___ answer to question six?',
    blankAnswers: ['correct'],
    options: ['correct', 'correctly', 'well', 'carefully'],
    answer: 'correct',
    answerTranslation: L(
      '6번 문제의 정답은 무엇인가요?',
      'Oltinchi savolning to‘g‘ri javobi nima?',
      'What is the correct answer to question six?',
      'Какой правильный ответ на шестой вопрос?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adjectives', 'workbook'],
  },

  en_s2u5_n3_059_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Why are you walking so ___?',
    blankAnswers: ['quickly'],
    options: ['quickly', 'quick', 'quiet', 'safe'],
    answer: 'quickly',
    answerTranslation: L(
      '왜 그렇게 빨리 걷고 있나요?',
      'Nega bunchalik tez yuryapsiz?',
      'Why are you walking so quickly?',
      'Почему вы идёте так быстро?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'workbook'],
  },

  en_s2u5_n3_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Good changes to well, but fast, hard and late can have the same form as adjectives and adverbs.',
    audioText:
      'Good changes to well, but fast, hard and late can have the same form as adjectives and adverbs.',
    answerTranslation: L(
      'good은 well로 바뀌지만 fast, hard, late는 형용사와 부사 형태가 같을 수 있어요.',
      'Good well ga o‘zgaradi, lekin fast, hard va late sifat va ravish sifatida bir xil shaklda bo‘lishi mumkin.',
      'Good changes to well, but fast, hard and late can have the same form as adjectives and adverbs.',
      'Good превращается в well, а fast, hard и late могут иметь одинаковую форму как прилагательные и наречия.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['adverbs', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Shopping & clothes vocabulary review
  // ===========================================================

  en_s2u5_n3_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A way to shop from your own home is ___.',
    blankAnswers: ['online'],
    options: ['online', 'cash', 'discount', 'sales'],
    answer: 'online',
    answerTranslation: L(
      '집에서 쇼핑하는 방법은 online이에요.',
      'Uydan xarid qilish usuli online.',
      'A way to shop from your own home is online.',
      'Способ делать покупки из дома — online.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You use ___ to pay for things.',
    blankAnswers: ['cash'],
    options: ['cash', 'return', 'sales', 'centre'],
    answer: 'cash',
    answerTranslation: L(
      '물건값을 지불할 때 현금을 사용할 수 있어요.',
      'Narsalar uchun to‘lashda naqd pul ishlatiladi.',
      'You use cash to pay for things.',
      'Наличными можно платить за покупки.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You ___ money and time.',
    blankAnswers: ['spend'],
    options: ['spend', 'return', 'discount', 'online'],
    answer: 'spend',
    answerTranslation: L(
      '돈과 시간을 쓰다에는 spend를 사용해요.',
      'Pul va vaqtni sarflash uchun spend ishlatiladi.',
      'You spend money and time.',
      'Можно тратить деньги и время.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A place with a lot of shops is a shopping ___.',
    blankAnswers: ['centre'],
    options: ['centre', 'discount', 'cash', 'return'],
    answer: 'centre',
    answerTranslation: L(
      '가게가 많이 모여 있는 곳은 shopping centre예요.',
      'Ko‘p do‘konlar bor joy shopping centre.',
      'A place with a lot of shops is a shopping centre.',
      'Место с большим количеством магазинов — торговый центр.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A shop that sells bread is the ___.',
    blankAnswers: ["baker's"],
    options: ["baker's", "butcher's", "newsagent's", 'sales'],
    answer: "baker's",
    answerTranslation: L(
      '빵을 파는 가게는 baker’s예요.',
      'Non sotadigan do‘kon baker’s.',
      'A shop that sells bread is the baker’s.',
      'Магазин, где продают хлеб, — baker’s.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A shop that sells newspapers is the ___.',
    blankAnswers: ["newsagent's"],
    options: ["newsagent's", "baker's", "butcher's", 'sales'],
    answer: "newsagent's",
    answerTranslation: L(
      '신문을 파는 가게는 newsagent’s예요.',
      'Gazeta sotadigan do‘kon newsagent’s.',
      'A shop that sells newspapers is the newsagent’s.',
      'Магазин, где продают газеты, — newsagent’s.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'To take something you do not like back to a shop is to ___ it.',
    blankAnswers: ['return'],
    options: ['return', 'spend', 'discount', 'buying'],
    answer: 'return',
    answerTranslation: L(
      '마음에 들지 않는 물건을 가게에 다시 가져가는 것은 return이에요.',
      'Yoqmagan narsani do‘konga qaytarish return.',
      'To take something you do not like back to a shop is to return it.',
      'Отнести неподходящую вещь обратно в магазин — это return.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The time when shops sell things cheaply is the ___.',
    blankAnswers: ['sales'],
    options: ['sales', 'cash', 'return', 'online'],
    answer: 'sales',
    answerTranslation: L(
      '가게에서 물건을 싸게 파는 기간은 the sales예요.',
      'Do‘konlar narsalarni arzon sotadigan vaqt the sales.',
      'The time when shops sell things cheaply is the sales.',
      'Период, когда магазины продают товары дешевле, — the sales.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A shop that sells meat is the ___.',
    blankAnswers: ["butcher's"],
    options: ["butcher's", "baker's", "newsagent's", 'centre'],
    answer: "butcher's",
    answerTranslation: L(
      '고기를 파는 가게는 butcher’s예요.',
      'Go‘sht sotadigan do‘kon butcher’s.',
      'A shop that sells meat is the butcher’s.',
      'Магазин, где продают мясо, — butcher’s.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A lower price you get when buying something is a ___.',
    blankAnswers: ['discount'],
    options: ['discount', 'cash', 'return', 'spend'],
    answer: 'discount',
    answerTranslation: L(
      '물건을 살 때 받는 가격 인하는 discount예요.',
      'Xarid paytida narxning kamayishi discount.',
      'A lower price you get when buying something is a discount.',
      'Снижение цены при покупке — это скидка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shopping-review'],
  },

  en_s2u5_n3_071_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '옷과 액세서리를 분류해 연결하세요.',
      'Kiyim va aksessuarlarni moslang.',
      'Match the clothes and accessories.',
      'Соотнесите одежду и аксессуары.',
    ),
    pairs: [
      {
        text: 'coat',
        native: 'clothes',
        nativeI18n: L('옷', 'kiyim', 'clothes', 'одежда'),
      },
      {
        text: 'dress',
        native: 'clothes',
        nativeI18n: L('옷', 'kiyim', 'clothes', 'одежда'),
      },
      {
        text: 'hoodie',
        native: 'clothes',
        nativeI18n: L('옷', 'kiyim', 'clothes', 'одежда'),
      },
      {
        text: 'jacket',
        native: 'clothes',
        nativeI18n: L('옷', 'kiyim', 'clothes', 'одежда'),
      },
      {
        text: 'jeans',
        native: 'clothes',
        nativeI18n: L('옷', 'kiyim', 'clothes', 'одежда'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes-review'],
  },

  en_s2u5_n3_072_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '옷과 액세서리를 분류해 연결하세요.',
      'Kiyim va aksessuarlarni moslang.',
      'Match the clothes and accessories.',
      'Соотнесите одежду и аксессуары.',
    ),
    pairs: [
      {
        text: 'glasses',
        native: 'accessories',
        nativeI18n: L('액세서리', 'aksessuarlar', 'accessories', 'аксессуары'),
      },
      {
        text: 'gloves',
        native: 'accessories',
        nativeI18n: L('액세서리', 'aksessuarlar', 'accessories', 'аксессуары'),
      },
      {
        text: 'hat',
        native: 'accessories',
        nativeI18n: L('액세서리', 'aksessuarlar', 'accessories', 'аксессуары'),
      },
      {
        text: 'jewellery',
        native: 'accessories',
        nativeI18n: L('액세서리', 'aksessuarlar', 'accessories', 'аксессуары'),
      },
      {
        text: 'scarf',
        native: 'accessories',
        nativeI18n: L('액세서리', 'aksessuarlar', 'accessories', 'аксессуары'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['clothes-review'],
  },

  en_s2u5_n3_073_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '형용사와 부사를 연결하세요.',
      'Sifat va ravishlarni moslang.',
      'Match the adjectives and adverbs.',
      'Соедините прилагательные и наречия.',
    ),
    pairs: [
      {
        text: 'bad',
        native: 'badly',
        nativeI18n: L('badly', 'badly', 'badly', 'badly'),
      },
      {
        text: 'careful',
        native: 'carefully',
        nativeI18n: L('carefully', 'carefully', 'carefully', 'carefully'),
      },
      {
        text: 'clear',
        native: 'clearly',
        nativeI18n: L('clearly', 'clearly', 'clearly', 'clearly'),
      },
      {
        text: 'dangerous',
        native: 'dangerously',
        nativeI18n: L(
          'dangerously',
          'dangerously',
          'dangerously',
          'dangerously',
        ),
      },
      {
        text: 'easy',
        native: 'easily',
        nativeI18n: L('easily', 'easily', 'easily', 'easily'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs', 'review'],
  },

  en_s2u5_n3_074_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '형용사와 부사를 연결하세요.',
      'Sifat va ravishlarni moslang.',
      'Match the adjectives and adverbs.',
      'Соедините прилагательные и наречия.',
    ),
    pairs: [
      {
        text: 'good',
        native: 'well',
        nativeI18n: L('well', 'well', 'well', 'well'),
      },
      {
        text: 'quick',
        native: 'quickly',
        nativeI18n: L('quickly', 'quickly', 'quickly', 'quickly'),
      },
      {
        text: 'quiet',
        native: 'quietly',
        nativeI18n: L('quietly', 'quietly', 'quietly', 'quietly'),
      },
      {
        text: 'slow',
        native: 'slowly',
        nativeI18n: L('slowly', 'slowly', 'slowly', 'slowly'),
      },
      {
        text: 'fast',
        native: 'fast',
        nativeI18n: L('fast', 'fast', 'fast', 'fast'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['adverbs', 'review'],
  },

  en_s2u5_n3_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'All my friends say that I sing really ___.',
    blankAnswers: ['badly'],
    options: ['badly', 'bad', 'good', 'quiet'],
    answer: 'badly',
    answerTranslation: L(
      '제 친구들은 모두 제가 노래를 정말 못한다고 해요.',
      'Do‘stlarimning hammasi men juda yomon kuylashimni aytadi.',
      'All my friends say that I sing really badly.',
      'Все мои друзья говорят, что я очень плохо пою.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['adverbs', 'workbook'],
  },

  en_s2u5_n3_076_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Please', 'do', 'not', 'drive', 'dangerously'],
    answer: 'Please do not drive dangerously',
    audioText: 'Please do not drive dangerously.',
    answerTranslation: L(
      '위험하게 운전하지 마세요.',
      'Iltimos, xavfli tarzda haydamang.',
      'Please do not drive dangerously.',
      'Пожалуйста, не водите опасно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['My', 'sister', 'cooks', 'well'],
    answer: 'My sister cooks well',
    answerTranslation: L(
      '제 여동생은 요리를 잘해요.',
      'Singlim yaxshi ovqat pishiradi.',
      'My sister cooks well.',
      'Моя сестра хорошо готовит.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['adverbs'],
  },

  en_s2u5_n3_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Maria answers every question correctly.',
    audioText: 'Maria answers every question correctly.',
    answerI18n: L(
      'Maria는 모든 질문에 정확하게 답해요',
      'Maria har bir savolga to‘g‘ri javob beradi',
      'Maria answers every question correctly',
      'Мария правильно отвечает на каждый вопрос',
    ),
    options: ['Maria', 'answers', 'every', 'question', 'correctly.'],
    optionsI18n: {
      ko: ['Maria는', '모든', '질문에', '정확하게', '답해요'],
      uz: ['Maria', 'har', 'bir', 'savolga', 'to‘g‘ri', 'javob', 'beradi'],
      en: ['Maria', 'answers', 'every', 'question', 'correctly.'],
      ru: ['Мария', 'правильно', 'отвечает', 'на', 'каждый', 'вопрос'],
    },
    answerTranslation: L(
      'Maria는 모든 질문에 정확하게 답해요.',
      'Maria har bir savolga to‘g‘ri javob beradi.',
      'Maria answers every question correctly.',
      'Мария правильно отвечает на каждый вопрос.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['adverbs'],
  },

  en_s2u5_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I shop online, spend money carefully and return things I do not want.',
    audioText:
      'I shop online, spend money carefully and return things I do not want.',
    answerTranslation: L(
      '저는 온라인 쇼핑을 하고 돈을 신중하게 쓰며 원하지 않는 물건은 반품해요.',
      'Men onlayn xarid qilaman, pulni ehtiyotkorlik bilan sarflayman va kerak bo‘lmagan narsalarni qaytaraman.',
      'I shop online, spend money carefully and return things I do not want.',
      'Я покупаю онлайн, осторожно трачу деньги и возвращаю ненужные вещи.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shopping-review', 'adverbs'],
  },

  en_s2u5_n3_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 5.3, we practise similar vowel sounds and learn how adjectives and adverbs describe people, things and actions.',
    audioText:
      'In Unit 5.3, we practise similar vowel sounds and learn how adjectives and adverbs describe people, things and actions.',
    answerTranslation: L(
      'Unit 5.3에서는 비슷한 모음 소리를 연습하고 형용사와 부사로 사람, 사물과 행동을 설명하는 방법을 배워요.',
      'Unit 5.3 da o‘xshash unli tovushlarni mashq qilamiz va sifat hamda ravishlar bilan odamlar, narsalar va harakatlarni tasvirlashni o‘rganamiz.',
      'In Unit 5.3, we practise similar vowel sounds and learn how adjectives and adverbs describe people, things and actions.',
      'В Unit 5.3 мы тренируем похожие гласные звуки и учимся использовать прилагательные и наречия.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE3 = {
  title: L(
    '형용사와 부사',
    'Sifatlar va ravishlar',
    'Adjectives and adverbs',
    'Прилагательные и наречия',
  ),
  section: 2,
  unit: 5,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '비슷한 모음 소리',
        'O‘xshash unli tovushlar',
        'Understanding similar vowel sounds',
        'Похожие гласные звуки',
      ),
      description: L(
        'hate/take, boat/note, cheap/jeans처럼 철자가 달라도 비슷하거나 같은 모음 소리가 나는 단어를 구별해요.',
        'hate/take, boat/note va cheap/jeans kabi yozilishi turlicha bo‘lsa ham bir xil unli tovushli so‘zlarni farqlaysiz.',
        'Practise recognising words with the same or similar vowel sounds.',
        'Учимся распознавать слова с одинаковыми и похожими гласными звуками.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 1,
      questions: [
        'en_s2u5_n3_001_word_matching',
        'en_s2u5_n3_002_word_matching',
        'en_s2u5_n3_003_fill_in_blank',
        'en_s2u5_n3_004_fill_in_blank',
        'en_s2u5_n3_005_fill_in_blank',
        'en_s2u5_n3_006_fill_in_blank',
        'en_s2u5_n3_007_fill_in_blank',
        'en_s2u5_n3_008_fill_in_blank',
        'en_s2u5_n3_009_fill_in_blank',
        'en_s2u5_n3_010_fill_in_blank',
        'en_s2u5_n3_011_fill_in_blank',
        'en_s2u5_n3_012_dialog_complete',
        'en_s2u5_n3_013_dialog_complete',
        'en_s2u5_n3_014_dialog_complete',
        'en_s2u5_n3_015_dialog_complete',
        'en_s2u5_n3_016_word_arrange',
        'en_s2u5_n3_017_speaking',
        'en_s2u5_n3_018_speaking',
        'en_s2u5_n3_019_speaking',
        'en_s2u5_n3_020_speaking',
      ],
    },

    {
      title: L(
        '형용사와 부사의 차이',
        'Sifat va ravish farqi',
        'Adjectives and adverbs',
        'Прилагательные и наречия',
      ),
      description: L(
        '형용사는 사람과 사물을 설명하고 부사는 행동이 어떻게 일어나는지 설명한다는 차이를 익혀요.',
        'Sifatlar odam va narsalarni, ravishlar esa harakat qanday bajarilishini tasvirlashini o‘rganasiz.',
        'Learn the difference between adjectives and adverbs and how common adverbs are formed.',
        'Изучаем разницу между прилагательными и наречиями.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u5_n3_021_fill_in_blank',
        'en_s2u5_n3_022_fill_in_blank',
        'en_s2u5_n3_023_fill_in_blank',
        'en_s2u5_n3_024_fill_in_blank',
        'en_s2u5_n3_025_fill_in_blank',
        'en_s2u5_n3_026_fill_in_blank',
        'en_s2u5_n3_027_fill_in_blank',
        'en_s2u5_n3_028_fill_in_blank',
        'en_s2u5_n3_029_fill_in_blank',
        'en_s2u5_n3_030_fill_in_blank',
        'en_s2u5_n3_031_fill_in_blank',
        'en_s2u5_n3_032_fill_in_blank',
        'en_s2u5_n3_033_fill_in_blank',
        'en_s2u5_n3_034_fill_in_blank',
        'en_s2u5_n3_035_fill_in_blank',
        'en_s2u5_n3_036_fill_in_blank',
        'en_s2u5_n3_037_word_arrange',
        'en_s2u5_n3_038_translate_builder',
        'en_s2u5_n3_039_sentence_builder',
        'en_s2u5_n3_040_speaking',
      ],
    },

    {
      title: L(
        '부사 만들기와 사용하기',
        'Ravish yasash va ishlatish',
        'Forming and using adverbs',
        'Образование и использование наречий',
      ),
      description: L(
        'quietly, carefully, clearly, dangerously, correctly, well, late 등 Coursebook과 Workbook의 부사 형태를 연습해요.',
        'quietly, carefully, clearly, dangerously, correctly, well va late kabi ravishlarni mashq qilasiz.',
        'Practise the adjective and adverb forms from the Coursebook and Workbook.',
        'Практикуем формы прилагательных и наречий из Coursebook и Workbook.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u5_n3_041_fill_in_blank',
        'en_s2u5_n3_042_fill_in_blank',
        'en_s2u5_n3_043_fill_in_blank',
        'en_s2u5_n3_044_fill_in_blank',
        'en_s2u5_n3_045_fill_in_blank',
        'en_s2u5_n3_046_fill_in_blank',
        'en_s2u5_n3_047_fill_in_blank',
        'en_s2u5_n3_048_fill_in_blank',
        'en_s2u5_n3_049_fill_in_blank',
        'en_s2u5_n3_050_fill_in_blank',
        'en_s2u5_n3_051_fill_in_blank',
        'en_s2u5_n3_052_fill_in_blank',
        'en_s2u5_n3_053_fill_in_blank',
        'en_s2u5_n3_054_fill_in_blank',
        'en_s2u5_n3_055_fill_in_blank',
        'en_s2u5_n3_056_fill_in_blank',
        'en_s2u5_n3_057_fill_in_blank',
        'en_s2u5_n3_058_fill_in_blank',
        'en_s2u5_n3_059_fill_in_blank',
        'en_s2u5_n3_060_speaking',
      ],
    },

    {
      title: L(
        '쇼핑과 옷 어휘 복습',
        'Xarid va kiyim lug‘ati takrori',
        'Shopping and clothes review',
        'Повторение покупок и одежды',
      ),
      description: L(
        'Workbook Vocabulary review를 바탕으로 shopping vocabulary, clothes/accessories와 형용사·부사를 종합 복습해요.',
        'Workbook Vocabulary review asosida shopping vocabulary, clothes/accessories va sifat-ravishlarni takrorlaysiz.',
        'Review shopping vocabulary, clothes, accessories, adjectives and adverbs.',
        'Повторяем покупки, одежду, аксессуары, прилагательные и наречия.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u5_n3_061_fill_in_blank',
        'en_s2u5_n3_062_fill_in_blank',
        'en_s2u5_n3_063_fill_in_blank',
        'en_s2u5_n3_064_fill_in_blank',
        'en_s2u5_n3_065_fill_in_blank',
        'en_s2u5_n3_066_fill_in_blank',
        'en_s2u5_n3_067_fill_in_blank',
        'en_s2u5_n3_068_fill_in_blank',
        'en_s2u5_n3_069_fill_in_blank',
        'en_s2u5_n3_070_fill_in_blank',
        'en_s2u5_n3_071_word_matching',
        'en_s2u5_n3_072_word_matching',
        'en_s2u5_n3_073_word_matching',
        'en_s2u5_n3_074_word_matching',
        'en_s2u5_n3_075_fill_in_blank',
        'en_s2u5_n3_076_word_arrange',
        'en_s2u5_n3_077_translate_builder',
        'en_s2u5_n3_078_sentence_builder',
        'en_s2u5_n3_079_speaking',
        'en_s2u5_n3_080_speaking',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 5 · Node 4
// 5.4 Speaking and writing
//
// Coverage
// Speaking in a shop:
// - customer / shop assistant
// - changing rooms
// - till
// - Can I help you?
// - Can I try this on, please?
// - Can I pay by card?
// - How much is this?
// - Do you offer a student discount?
// - Would you like a receipt?
// - Do you sell batteries?
// - What time do you close?
// - Do you need a bag?
//
// Writing:
// - an online product review
// - price
// - look
// - quality
// - user-friendliness
// - delivery
// - recommend
// - worth the money
// - great / poor value
// - easy / difficult to use
// - commas in lists
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// shop assistant / changing rooms / student discount /
// credit card / product review / great value 등은 WORD로 등록하지 않음.
//
// cash / discount는 Unit 5 Node 1에서 이미 등록했으므로 재등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE4_WORDS = [
  {
    code: 'en-noun-customer',
    english: 'customer',
    senseKey: 'person-who-buys-goods-or-services',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '손님; 고객',
      'mijoz',
      'a person who buys goods or services',
      'покупатель; клиент',
    ),
    examples: [
      {
        english: 'The customer wants to buy a top.',
        translations: L(
          '손님은 상의를 사고 싶어 해요.',
          'Mijoz ustki kiyim sotib olmoqchi.',
          'The customer wants to buy a top.',
          'Покупатель хочет купить топ.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌstəmə/',
      ttsText: 'customer',
    },
    tags: ['shopping', 'speaking', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-assistant',
    english: 'assistant',
    senseKey: 'person-who-helps-customers-in-shop',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '점원; 보조원',
      'sotuvchi yordamchi',
      'a person whose job is to help customers',
      'продавец-консультант; помощник',
    ),
    examples: [
      {
        english: 'The shop assistant helps the customer.',
        translations: L(
          '점원이 손님을 도와줘요.',
          'Do‘kon sotuvchisi mijozga yordam beradi.',
          'The shop assistant helps the customer.',
          'Продавец помогает покупателю.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈsɪstənt/',
      ttsText: 'assistant',
    },
    tags: ['shopping', 'speaking', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-till',
    english: 'till',
    senseKey: 'machine-or-place-where-shop-payments-are-made',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '계산대',
      'kassa',
      'the place or machine where customers pay in a shop',
      'касса',
    ),
    examples: [
      {
        english: 'You can pay at the till.',
        translations: L(
          '계산대에서 결제할 수 있어요.',
          'Kassada to‘lashingiz mumkin.',
          'You can pay at the till.',
          'Можно заплатить на кассе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɪl/',
      ttsText: 'till',
    },
    tags: ['shopping', 'shops', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-receipt',
    english: 'receipt',
    senseKey: 'paper-showing-payment-for-purchase',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영수증',
      'chek',
      'a piece of paper showing that you paid for something',
      'чек',
    ),
    examples: [
      {
        english: 'Would you like a receipt?',
        translations: L(
          '영수증 필요하세요?',
          'Chek kerakmi?',
          'Would you like a receipt?',
          'Вам нужен чек?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rɪˈsiːt/',
      ttsText: 'receipt',
    },
    tags: ['shopping', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-battery',
    english: 'battery',
    senseKey: 'object-providing-electric-power',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '배터리; 건전지',
      'batareya',
      'an object that provides electrical power',
      'батарейка',
    ),
    examples: [
      {
        english: 'Do you sell batteries?',
        translations: L(
          '건전지를 판매하나요?',
          'Batareyalar sotasizmi?',
          'Do you sell batteries?',
          'Вы продаёте батарейки?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbætəri/',
      ttsText: 'battery',
    },
    tags: ['shopping', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-product',
    english: 'product',
    senseKey: 'thing-made-or-sold',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '제품',
      'mahsulot',
      'something that is made or sold',
      'товар; продукт',
    ),
    examples: [
      {
        english: 'This is a great product.',
        translations: L(
          '이것은 훌륭한 제품이에요.',
          'Bu ajoyib mahsulot.',
          'This is a great product.',
          'Это отличный товар.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈprɒdʌkt/',
      ttsText: 'product',
    },
    tags: ['reviews', 'shopping', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-recommend',
    english: 'recommend',
    senseKey: 'say-something-is-good-and-worth-trying',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '추천하다',
      'tavsiya qilmoq',
      'to say that something is good and worth buying or trying',
      'рекомендовать',
    ),
    examples: [
      {
        english: 'I recommend it to everyone.',
        translations: L(
          '모두에게 추천해요.',
          'Men uni hammaga tavsiya qilaman.',
          'I recommend it to everyone.',
          'Я рекомендую это всем.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌrekəˈmend/',
      ttsText: 'recommend',
    },
    tags: ['reviews', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-quality',
    english: 'quality',
    senseKey: 'how-good-or-bad-something-is',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('품질', 'sifat', 'how good or bad something is', 'качество'),
    examples: [
      {
        english: 'The quality is very good.',
        translations: L(
          '품질이 아주 좋아요.',
          'Sifati juda yaxshi.',
          'The quality is very good.',
          'Качество очень хорошее.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkwɒləti/',
      ttsText: 'quality',
    },
    tags: ['reviews', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-delivery',
    english: 'delivery',
    senseKey: 'bringing-purchased-goods-to-customer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '배송',
      'yetkazib berish',
      'the process of bringing goods to a customer',
      'доставка',
    ),
    examples: [
      {
        english: 'The delivery was very quick.',
        translations: L(
          '배송이 아주 빨랐어요.',
          'Yetkazib berish juda tez bo‘ldi.',
          'The delivery was very quick.',
          'Доставка была очень быстрой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈlɪvəri/',
      ttsText: 'delivery',
    },
    tags: ['reviews', 'shopping', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-value',
    english: 'value',
    senseKey: 'worth-compared-with-price-paid',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가치; 가격 대비 가치',
      'qiymat',
      'how useful or good something is compared with its price',
      'ценность; соотношение цены и качества',
    ),
    examples: [
      {
        english: 'It is great value.',
        translations: L(
          '가격 대비 아주 좋아요.',
          'Bu narxiga yarasha juda yaxshi.',
          'It is great value.',
          'Это отличное соотношение цены и качества.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈvæljuː/',
      ttsText: 'value',
    },
    tags: ['reviews', 'shopping', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-expensive',
    english: 'expensive',
    senseKey: 'costing-a-lot-of-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('비싼', 'qimmat', 'costing a lot of money', 'дорогой'),
    examples: [
      {
        english: 'It looks expensive.',
        translations: L(
          '비싸 보여요.',
          'U qimmat ko‘rinadi.',
          'It looks expensive.',
          'Это выглядит дорого.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪkˈspensɪv/',
      ttsText: 'expensive',
    },
    tags: ['reviews', 'shopping', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-cheap',
    english: 'cheap',
    senseKey: 'costing-little-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('저렴한; 싼', 'arzon', 'costing little money', 'дешёвый'),
    examples: [
      {
        english: 'It looks cheap.',
        translations: L(
          '싸 보여요.',
          'U arzon ko‘rinadi.',
          'It looks cheap.',
          'Это выглядит дёшево.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃiːp/',
      ttsText: 'cheap',
    },
    tags: ['reviews', 'shopping', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-worth',
    english: 'worth',
    senseKey: 'having-value-equal-to-price-or-effort',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '~할 가치가 있는',
      'arziydigan',
      'having a value equal to the money or effort involved',
      'стоящий; достойный',
    ),
    examples: [
      {
        english: 'It is worth the money.',
        translations: L(
          '그 돈을 낼 가치가 있어요.',
          'U puliga arziydi.',
          'It is worth the money.',
          'Это стоит своих денег.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɜːθ/',
      ttsText: 'worth',
    },
    tags: ['reviews', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-size',
    english: 'size',
    senseKey: 'measurement-of-how-large-or-small-something-is',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '크기; 사이즈',
      'o‘lcham',
      'a measurement showing how large or small something is',
      'размер',
    ),
    examples: [
      {
        english: 'What size do you need?',
        translations: L(
          '어떤 사이즈가 필요하세요?',
          'Qaysi o‘lcham kerak?',
          'What size do you need?',
          'Какой размер вам нужен?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/saɪz/',
      ttsText: 'size',
    },
    tags: ['shopping', 'clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-medium',
    english: 'medium',
    senseKey: 'middle-size-not-large-or-small',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '중간 크기의',
      'o‘rta o‘lchamdagi',
      'of a middle size, not large or small',
      'среднего размера',
    ),
    examples: [
      {
        english: 'I need a medium, please.',
        translations: L(
          '중간 사이즈로 주세요.',
          'Menga o‘rta o‘lcham kerak.',
          'I need a medium, please.',
          'Мне нужен средний размер.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmiːdiəm/',
      ttsText: 'medium',
    },
    tags: ['shopping', 'clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT5_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Speaking in a shop
  // ===========================================================

  en_s2u5_n4_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'customer',
        native: 'mijoz',
        nativeI18n: L('손님', 'mijoz', 'customer', 'покупатель'),
      },
      {
        text: 'assistant',
        native: 'sotuvchi',
        nativeI18n: L('점원', 'sotuvchi', 'assistant', 'продавец'),
      },
      {
        text: 'till',
        native: 'kassa',
        nativeI18n: L('계산대', 'kassa', 'till', 'касса'),
      },
      {
        text: 'receipt',
        native: 'chek',
        nativeI18n: L('영수증', 'chek', 'receipt', 'чек'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_002_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I help you?' }],
    options: [
      'No, thanks. I’m just looking.',
      'At eight o’clock.',
      'It’s £4.99.',
      'Yes, I pay.',
    ],
    answer: 'No, thanks. I’m just looking.',
    answerTranslation: L(
      '아니요, 괜찮아요. 그냥 보고 있어요.',
      'Yo‘q, rahmat. Faqat ko‘ryapman.',
      'No, thanks. I’m just looking.',
      'Нет, спасибо. Я просто смотрю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_003_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you need a bag?' }],
    options: [
      'Yes, please. Just a small one.',
      'At eight o’clock.',
      'No, we only take cash.',
      'It’s £4.99.',
    ],
    answer: 'Yes, please. Just a small one.',
    answerTranslation: L(
      '네. 작은 것으로 하나 주세요.',
      'Ha, iltimos. Kichkinasidan bitta.',
      'Yes, please. Just a small one.',
      'Да, пожалуйста. Только маленький.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'bag'],
  },

  en_s2u5_n4_004_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I try this on, please?' }],
    options: [
      'Of course. The changing rooms are over there.',
      'No, we only take cash.',
      'It’s £4.99.',
      'At eight o’clock.',
    ],
    answer: 'Of course. The changing rooms are over there.',
    answerTranslation: L(
      '물론이죠. 탈의실은 저쪽에 있어요.',
      'Albatta. Kiyinish xonalari u yerda.',
      'Of course. The changing rooms are over there.',
      'Конечно. Примерочные вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'clothes'],
  },

  en_s2u5_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I pay by card?' }],
    options: [
      'No, I’m afraid we only take cash.',
      'Yes, please. Just a small one.',
      'At eight o’clock.',
      'The changing rooms are over there.',
    ],
    answer: 'No, I’m afraid we only take cash.',
    answerTranslation: L(
      '죄송하지만 저희는 현금만 받아요.',
      'Afsuski, biz faqat naqd pul qabul qilamiz.',
      'No, I’m afraid we only take cash.',
      'Боюсь, мы принимаем только наличные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'payment'],
  },

  en_s2u5_n4_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How much is this magazine?' }],
    options: [
      'It’s £4.99.',
      'At eight o’clock.',
      'Yes, we sell them.',
      'No, thanks.',
    ],
    answer: 'It’s £4.99.',
    answerTranslation: L(
      '4파운드 99펜스예요.',
      '£4.99.',
      'It’s £4.99.',
      'Это стоит £4.99.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'price'],
  },

  en_s2u5_n4_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you offer a student discount?' }],
    options: [
      'Yes, we do. You get 20% off.',
      'At eight o’clock.',
      'No, thanks. I’m looking.',
      'It’s a medium.',
    ],
    answer: 'Yes, we do. You get 20% off.',
    answerTranslation: L(
      '네. 20% 할인받을 수 있어요.',
      'Ha. 20% chegirma olasiz.',
      'Yes, we do. You get 20% off.',
      'Да. Вы получаете скидку 20%.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'discount'],
  },

  en_s2u5_n4_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Would you like a receipt?' }],
    options: [
      'Yes, please. Just put it in the bag.',
      'The changing rooms are over there.',
      'At eight o’clock.',
      'It costs medium.',
    ],
    answer: 'Yes, please. Just put it in the bag.',
    answerTranslation: L(
      '네. 봉투 안에 넣어 주세요.',
      'Ha, iltimos. Uni paketga solib qo‘ying.',
      'Yes, please. Just put it in the bag.',
      'Да, пожалуйста. Просто положите его в пакет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'receipt'],
  },

  en_s2u5_n4_009_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you sell batteries?' }],
    options: [
      'Yes, we do. What kind do you need?',
      'At eight o’clock.',
      'It’s £4.99.',
      'No, I am a battery.',
    ],
    answer: 'Yes, we do. What kind do you need?',
    answerTranslation: L(
      '네. 어떤 종류가 필요하세요?',
      'Ha. Qaysi turi kerak?',
      'Yes, we do. What kind do you need?',
      'Да. Какие вам нужны?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'battery'],
  },

  en_s2u5_n4_010_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time do you close?' }],
    options: [
      'At eight o’clock.',
      'It’s £4.99.',
      'Yes, a small bag.',
      'Cash only.',
    ],
    answer: 'At eight o’clock.',
    answerTranslation: L(
      '8시에 닫아요.',
      'Soat sakkizda.',
      'At eight o’clock.',
      'В восемь часов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop', 'opening-hours'],
  },

  en_s2u5_n4_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ this on, please?',
    blankAnswers: ['try'],
    options: ['try', 'take', 'pay', 'close'],
    answer: 'try',
    answerTranslation: L(
      '이것을 입어 봐도 될까요?',
      'Buni kiyib ko‘rsam bo‘ladimi?',
      'Can I try this on, please?',
      'Можно это примерить?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I pay ___ card?',
    blankAnswers: ['by'],
    options: ['by', 'at', 'on', 'from'],
    answer: 'by',
    answerTranslation: L(
      '카드로 결제할 수 있나요?',
      'Karta bilan to‘lasam bo‘ladimi?',
      'Can I pay by card?',
      'Можно оплатить картой?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Would you like a ___?',
    blankAnswers: ['receipt'],
    options: ['receipt', 'battery', 'size', 'till'],
    answer: 'receipt',
    answerTranslation: L(
      '영수증 필요하세요?',
      'Chek kerakmi?',
      'Would you like a receipt?',
      'Вам нужен чек?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How ___ is this magazine?',
    blankAnswers: ['much'],
    options: ['much', 'many', 'size', 'cash'],
    answer: 'much',
    answerTranslation: L(
      '이 잡지는 얼마인가요?',
      'Bu jurnal qancha turadi?',
      'How much is this magazine?',
      'Сколько стоит этот журнал?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What ___ do you need?',
    blankAnswers: ['size'],
    options: ['size', 'receipt', 'discount', 'till'],
    answer: 'size',
    answerTranslation: L(
      '어떤 사이즈가 필요하세요?',
      'Qaysi o‘lcham kerak?',
      'What size do you need?',
      'Какой размер вам нужен?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['in-a-shop', 'clothes'],
  },

  en_s2u5_n4_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Can', 'I', 'try', 'this', 'on', 'please'],
    answer: 'Can I try this on please',
    audioText: 'Can I try this on, please?',
    answerTranslation: L(
      '이것을 입어 봐도 될까요?',
      'Buni kiyib ko‘rsam bo‘ladimi?',
      'Can I try this on, please?',
      'Можно это примерить?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Do', 'you', 'offer', 'a', 'student', 'discount'],
    answer: 'Do you offer a student discount',
    answerTranslation: L(
      '학생 할인이 있나요?',
      'Talabalar uchun chegirma bormi?',
      'Do you offer a student discount?',
      'У вас есть скидка для студентов?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'No, thanks. I’m just looking.',
    audioText: 'No, thanks. I’m just looking.',
    answerI18n: L(
      '아니요, 괜찮아요. 그냥 보고 있어요',
      'Yo‘q, rahmat. Faqat ko‘ryapman',
      'No, thanks. I’m just looking',
      'Нет, спасибо. Я просто смотрю',
    ),
    options: ['No,', 'thanks.', 'I’m', 'just', 'looking.'],
    optionsI18n: {
      ko: ['아니요,', '괜찮아요.', '그냥', '보고', '있어요'],
      uz: ['Yo‘q,', 'rahmat.', 'Faqat', 'ko‘ryapman'],
      en: ['No,', 'thanks.', 'I’m', 'just', 'looking.'],
      ru: ['Нет,', 'спасибо.', 'Я', 'просто', 'смотрю'],
    },
    answerTranslation: L(
      '아니요, 괜찮아요. 그냥 보고 있어요.',
      'Yo‘q, rahmat. Faqat ko‘ryapman.',
      'No, thanks. I’m just looking.',
      'Нет, спасибо. Я просто смотрю.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me. Can I try this on, please?',
    audioText: 'Excuse me. Can I try this on, please?',
    answerTranslation: L(
      '실례합니다. 이것을 입어 봐도 될까요?',
      'Kechirasiz. Buni kiyib ko‘rsam bo‘ladimi?',
      'Excuse me. Can I try this on, please?',
      'Извините. Можно это примерить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I help you? No, thanks. I’m just looking.',
    audioText: 'Can I help you? No, thanks. I’m just looking.',
    answerTranslation: L(
      '도와드릴까요? 아니요, 괜찮아요. 그냥 보고 있어요.',
      'Yordam bera olamanmi? Yo‘q, rahmat. Faqat ko‘ryapman.',
      'Can I help you? No, thanks. I’m just looking.',
      'Могу я вам помочь? Нет, спасибо. Я просто смотрю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  // ===========================================================
  // Lesson 2 · Customer and shop assistant
  // ===========================================================

  en_s2u5_n4_021_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Excuse me?' }],
    options: [
      'Yes? How can I help you?',
      'It costs yesterday.',
      'I am a receipt.',
      'At a discount.',
    ],
    answer: 'Yes? How can I help you?',
    answerTranslation: L(
      '네? 무엇을 도와드릴까요?',
      'Ha? Sizga qanday yordam bera olaman?',
      'Yes? How can I help you?',
      'Да? Чем я могу вам помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'in-a-shop'],
  },

  en_s2u5_n4_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you do a student ___?',
    blankAnswers: ['discount'],
    options: ['discount', 'receipt', 'size', 'delivery'],
    answer: 'discount',
    answerTranslation: L(
      '학생 할인이 있나요?',
      'Talabalar uchun chegirma bormi?',
      'Do you do a student discount?',
      'У вас есть студенческая скидка?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'discount'],
  },

  en_s2u5_n4_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You get 10% ___ with a student card.',
    blankAnswers: ['off'],
    options: ['off', 'out', 'away', 'down'],
    answer: 'off',
    answerTranslation: L(
      '학생증이 있으면 10% 할인받아요.',
      'Talaba kartasi bilan 10% chegirma olasiz.',
      'You get 10% off with a student card.',
      'По студенческой карте вы получаете скидку 10%.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'discount'],
  },

  en_s2u5_n4_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'No, I’m afraid we only ___ cash.',
    blankAnswers: ['take'],
    options: ['take', 'try', 'close', 'ask'],
    answer: 'take',
    answerTranslation: L(
      '죄송하지만 현금만 받아요.',
      'Afsuski, biz faqat naqd pul qabul qilamiz.',
      'No, I’m afraid we only take cash.',
      'Боюсь, мы принимаем только наличные.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'cash'],
  },

  en_s2u5_n4_025_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I help you?' }],
    options: [
      'No, thanks. I’m just looking.',
      'I close half past six.',
      'Yes, cash is a size.',
      'It is receipt.',
    ],
    answer: 'No, thanks. I’m just looking.',
    answerTranslation: L(
      '아니요, 괜찮아요. 그냥 보고 있어요.',
      'Yo‘q, rahmat. Faqat ko‘ryapman.',
      'No, thanks. I’m just looking.',
      'Нет, спасибо. Я просто смотрю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'in-a-shop'],
  },

  en_s2u5_n4_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'If you need anything, just ___.',
    blankAnswers: ['ask'],
    options: ['ask', 'close', 'try', 'pay'],
    answer: 'ask',
    answerTranslation: L(
      '필요한 것이 있으면 물어보세요.',
      'Biror narsa kerak bo‘lsa, so‘rang.',
      'If you need anything, just ask.',
      'Если что-нибудь понадобится, просто спросите.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'in-a-shop'],
  },

  en_s2u5_n4_027_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time do you close?' }],
    options: ['Half past six.', 'A medium.', 'By card.', 'Twenty per cent.'],
    answer: 'Half past six.',
    answerTranslation: L(
      '6시 30분이요.',
      'Olti yarimda.',
      'Half past six.',
      'В половине седьмого.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'opening-hours'],
  },

  en_s2u5_n4_028_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can I try this top, please?',
      },
    ],
    options: [
      'Yes, of course. The changing rooms are on the left.',
      'No, it is £9.99.',
      'Yes, it is cash.',
      'At half past six.',
    ],
    answer: 'Yes, of course. The changing rooms are on the left.',
    answerTranslation: L(
      '네, 물론이죠. 탈의실은 왼쪽에 있어요.',
      'Ha, albatta. Kiyinish xonalari chap tomonda.',
      'Yes, of course. The changing rooms are on the left.',
      'Да, конечно. Примерочные слева.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'clothes'],
  },

  en_s2u5_n4_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The changing rooms are on the left, ___ the jeans.',
    blankAnswers: ['behind'],
    options: ['behind', 'by', 'off', 'through'],
    answer: 'behind',
    answerTranslation: L(
      '탈의실은 왼쪽 청바지 뒤쪽에 있어요.',
      'Kiyinish xonalari chap tomonda, jinsilar ortida.',
      'The changing rooms are on the left, behind the jeans.',
      'Примерочные слева, за джинсами.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'clothes'],
  },

  en_s2u5_n4_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What size do you need?' }],
    options: [
      'A medium, please.',
      'By cash.',
      'Half past six.',
      'Twenty per cent off.',
    ],
    answer: 'A medium, please.',
    answerTranslation: L(
      '중간 사이즈로 주세요.',
      'O‘rta o‘lcham, iltimos.',
      'A medium, please.',
      'Средний размер, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['size', 'clothes'],
  },

  en_s2u5_n4_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I need a ___, please.',
    blankAnswers: ['medium'],
    options: ['medium', 'receipt', 'delivery', 'quality'],
    answer: 'medium',
    answerTranslation: L(
      '중간 사이즈로 주세요.',
      'Menga o‘rta o‘lcham kerak.',
      'I need a medium, please.',
      'Мне нужен средний размер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['size', 'clothes'],
  },

  en_s2u5_n4_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Would you like a bag?' }],
    options: ['No, thanks.', 'It’s medium.', 'At six thirty.', 'It’s behind.'],
    answer: 'No, thanks.',
    answerTranslation: L(
      '아니요, 괜찮아요.',
      'Yo‘q, rahmat.',
      'No, thanks.',
      'Нет, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['bag'],
  },

  en_s2u5_n4_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you sell batteries?' }],
    options: [
      'Yes. What kind do you need?',
      'A medium, please.',
      'I’m just looking.',
      'At half past six.',
    ],
    answer: 'Yes. What kind do you need?',
    answerTranslation: L(
      '네. 어떤 종류가 필요하세요?',
      'Ha. Qaysi turi kerak?',
      'Yes. What kind do you need?',
      'Да. Какие вам нужны?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['battery'],
  },

  en_s2u5_n4_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The customer pays at the ___.',
    blankAnswers: ['till'],
    options: ['till', 'receipt', 'delivery', 'size'],
    answer: 'till',
    answerTranslation: L(
      '손님은 계산대에서 결제해요.',
      'Mijoz kassada to‘laydi.',
      'The customer pays at the till.',
      'Покупатель платит на кассе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shop', 'till'],
  },

  en_s2u5_n4_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I pay by card?' }],
    options: [
      'Yes, of course.',
      'A medium.',
      'Behind the jeans.',
      'A receipt costs.',
    ],
    answer: 'Yes, of course.',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['payment'],
  },

  en_s2u5_n4_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['How', 'can', 'I', 'help', 'you'],
    answer: 'How can I help you',
    audioText: 'How can I help you?',
    answerTranslation: L(
      '무엇을 도와드릴까요?',
      'Sizga qanday yordam bera olaman?',
      'How can I help you?',
      'Чем я могу вам помочь?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'time', 'do', 'you', 'close'],
    answer: 'What time do you close',
    answerTranslation: L(
      '몇 시에 문을 닫나요?',
      'Soat nechada yopilasiz?',
      'What time do you close?',
      'Во сколько вы закрываетесь?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'No, I’m afraid we only take cash.',
    audioText: 'No, I’m afraid we only take cash.',
    answerI18n: L(
      '죄송하지만 저희는 현금만 받아요',
      'Afsuski, biz faqat naqd pul qabul qilamiz',
      'No, I’m afraid we only take cash',
      'Боюсь, мы принимаем только наличные',
    ),
    options: ['No,', 'I’m', 'afraid', 'we', 'only', 'take', 'cash.'],
    optionsI18n: {
      ko: ['죄송하지만', '저희는', '현금만', '받아요'],
      uz: ['Afsuski,', 'biz', 'faqat', 'naqd', 'pul', 'qabul', 'qilamiz'],
      en: ['No,', 'I’m', 'afraid', 'we', 'only', 'take', 'cash.'],
      ru: ['Боюсь,', 'мы', 'принимаем', 'только', 'наличные'],
    },
    answerTranslation: L(
      '죄송하지만 저희는 현금만 받아요.',
      'Afsuski, biz faqat naqd pul qabul qilamiz.',
      'No, I’m afraid we only take cash.',
      'Боюсь, мы принимаем только наличные.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['in-a-shop'],
  },

  en_s2u5_n4_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me. Can I try this top on, please?',
    audioText: 'Excuse me. Can I try this top on, please?',
    answerTranslation: L(
      '실례합니다. 이 상의를 입어 봐도 될까요?',
      'Kechirasiz. Bu ustki kiyimni kiyib ko‘rsam bo‘ladimi?',
      'Excuse me. Can I try this top on, please?',
      'Извините. Можно примерить этот топ?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['roleplay', 'shop'],
  },

  en_s2u5_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The customer asks questions, and the shop assistant gives information and helps the customer.',
    audioText:
      'The customer asks questions, and the shop assistant gives information and helps the customer.',
    answerTranslation: L(
      '손님은 질문하고 점원은 정보를 주고 손님을 도와줘요.',
      'Mijoz savol beradi, sotuvchi esa ma’lumot beradi va unga yordam beradi.',
      'The customer asks questions, and the shop assistant gives information and helps the customer.',
      'Покупатель задаёт вопросы, а продавец даёт информацию и помогает.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['shop', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Writing a product review
  // ===========================================================

  en_s2u5_n4_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'price',
        native: 'narx',
        nativeI18n: L('가격', 'narx', 'price', 'цена'),
      },
      {
        text: 'quality',
        native: 'sifat',
        nativeI18n: L('품질', 'sifat', 'quality', 'качество'),
      },
      {
        text: 'delivery',
        native: 'yetkazib berish',
        nativeI18n: L('배송', 'yetkazib berish', 'delivery', 'доставка'),
      },
      {
        text: 'value',
        native: 'qiymat',
        nativeI18n: L('가치', 'qiymat', 'value', 'ценность'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A product review can include information about the ___.',
    blankAnswers: ['price'],
    options: ['price', 'weather', 'airport', 'job'],
    answer: 'price',
    answerTranslation: L(
      '제품 리뷰에는 가격에 대한 정보를 포함할 수 있어요.',
      'Mahsulot sharhida narx haqida ma’lumot bo‘lishi mumkin.',
      'A product review can include information about the price.',
      'Обзор товара может включать информацию о цене.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A review can say whether the ___ is good or poor.',
    blankAnswers: ['quality'],
    options: ['quality', 'receipt', 'customer', 'till'],
    answer: 'quality',
    answerTranslation: L(
      '리뷰에서는 품질이 좋은지 나쁜지 말할 수 있어요.',
      'Sharhda sifat yaxshi yoki yomon ekanini aytish mumkin.',
      'A review can say whether the quality is good or poor.',
      'В отзыве можно написать, хорошее или плохое качество.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A review can also describe the ___.',
    blankAnswers: ['delivery'],
    options: ['delivery', 'battery', 'customer', 'discount'],
    answer: 'delivery',
    answerTranslation: L(
      '리뷰에서는 배송에 대해서도 설명할 수 있어요.',
      'Sharhda yetkazib berish haqida ham yozish mumkin.',
      'A review can also describe the delivery.',
      'В отзыве также можно описать доставку.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ it to everyone.',
    blankAnswers: ['recommend'],
    options: ['recommend', 'return', 'spend', 'close'],
    answer: 'recommend',
    answerTranslation: L(
      '모두에게 추천해요.',
      'Men uni hammaga tavsiya qilaman.',
      'I recommend it to everyone.',
      'Я рекомендую это всем.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is great ___.',
    blankAnswers: ['value'],
    options: ['value', 'receipt', 'size', 'cash'],
    answer: 'value',
    answerTranslation: L(
      '가격 대비 아주 좋아요.',
      'Bu narxiga yarasha juda yaxshi.',
      'It is great value.',
      'Это отличное соотношение цены и качества.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is ___ the money.',
    blankAnswers: ['worth'],
    options: ['worth', 'value', 'cheap', 'delivery'],
    answer: 'worth',
    answerTranslation: L(
      '그 돈을 낼 가치가 있어요.',
      'U puliga arziydi.',
      'It is worth the money.',
      'Это стоит своих денег.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It looks ___.',
    blankAnswers: ['expensive'],
    options: ['expensive', 'quickly', 'carefully', 'receipt'],
    answer: 'expensive',
    answerTranslation: L(
      '비싸 보여요.',
      'U qimmat ko‘rinadi.',
      'It looks expensive.',
      'Это выглядит дорого.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is easy to ___.',
    blankAnswers: ['use'],
    options: ['use', 'using', 'used', 'uses'],
    answer: 'use',
    answerTranslation: L(
      '사용하기 쉬워요.',
      'Uni ishlatish oson.',
      'It is easy to use.',
      'Им легко пользоваться.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is difficult to ___.',
    blankAnswers: ['use'],
    options: ['use', 'used', 'using', 'uses'],
    answer: 'use',
    answerTranslation: L(
      '사용하기 어려워요.',
      'Uni ishlatish qiyin.',
      'It is difficult to use.',
      'Им трудно пользоваться.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The product is too ___.',
    blankAnswers: ['expensive'],
    options: ['expensive', 'carefully', 'delivery', 'receipt'],
    answer: 'expensive',
    answerTranslation: L(
      '제품이 너무 비싸요.',
      'Mahsulot juda qimmat.',
      'The product is too expensive.',
      'Товар слишком дорогой.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_052_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What should you include in a product review?',
      },
    ],
    options: [
      'Price, look, quality, user-friendliness and delivery.',
      'Only the colour.',
      'Only the shop address.',
      'Only the customer’s name.',
    ],
    answer: 'Price, look, quality, user-friendliness and delivery.',
    answerTranslation: L(
      '가격, 외관, 품질, 사용 편의성과 배송이에요.',
      'Narx, ko‘rinish, sifat, foydalanish qulayligi va yetkazib berish.',
      'Price, look, quality, user-friendliness and delivery.',
      'Цена, внешний вид, качество, удобство использования и доставка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['product-review'],
  },

  en_s2u5_n4_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What can you write if you really like a product?',
      },
    ],
    options: [
      'I recommend it.',
      'I close it.',
      'I receipt it.',
      'I discount it.',
    ],
    answer: 'I recommend it.',
    answerTranslation: L(
      '추천해요.',
      'Men uni tavsiya qilaman.',
      'I recommend it.',
      'Я рекомендую это.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_054_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What can you write if a product is not good enough for its price?',
      },
    ],
    options: [
      'It is not worth the money.',
      'It is a receipt.',
      'It closes at eight.',
      'It takes cash.',
    ],
    answer: 'It is not worth the money.',
    answerTranslation: L(
      '그 돈을 낼 가치가 없어요.',
      'U puliga arzimaydi.',
      'It is not worth the money.',
      'Это не стоит своих денег.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The delivery was very ___.',
    blankAnswers: ['quick'],
    options: ['quick', 'quickly', 'expensively', 'worth'],
    answer: 'quick',
    answerTranslation: L(
      '배송이 아주 빨랐어요.',
      'Yetkazib berish juda tez bo‘ldi.',
      'The delivery was very quick.',
      'Доставка была очень быстрой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['product-review', 'adjective'],
  },

  en_s2u5_n4_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'recommend', 'it', 'to', 'everyone'],
    answer: 'I recommend it to everyone',
    audioText: 'I recommend it to everyone.',
    answerTranslation: L(
      '모두에게 추천해요.',
      'Men uni hammaga tavsiya qilaman.',
      'I recommend it to everyone.',
      'Я рекомендую это всем.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['It', 'is', 'great', 'value'],
    answer: 'It is great value',
    answerTranslation: L(
      '가격 대비 아주 좋아요.',
      'Bu narxiga yarasha juda yaxshi.',
      'It is great value.',
      'Это отличное соотношение цены и качества.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'It is easy to use and worth the money.',
    audioText: 'It is easy to use and worth the money.',
    answerI18n: L(
      '사용하기 쉽고 그 돈을 낼 가치가 있어요',
      'Uni ishlatish oson va puliga arziydi',
      'It is easy to use and worth the money',
      'Им легко пользоваться, и он стоит своих денег',
    ),
    options: ['It', 'is', 'easy', 'to', 'use', 'and', 'worth', 'the', 'money.'],
    optionsI18n: {
      ko: ['사용하기', '쉽고', '그', '돈을', '낼', '가치가', '있어요'],
      uz: ['Uni', 'ishlatish', 'oson', 'va', 'puliga', 'arziydi'],
      en: ['It', 'is', 'easy', 'to', 'use', 'and', 'worth', 'the', 'money.'],
      ru: [
        'Им',
        'легко',
        'пользоваться,',
        'и',
        'он',
        'стоит',
        'своих',
        'денег',
      ],
    },
    answerTranslation: L(
      '사용하기 쉽고 그 돈을 낼 가치가 있어요.',
      'Uni ishlatish oson va puliga arziydi.',
      'It is easy to use and worth the money.',
      'Им легко пользоваться, и он стоит своих денег.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['product-review'],
  },

  en_s2u5_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'This is a great product. It looks good, it is easy to use and I recommend it.',
    audioText:
      'This is a great product. It looks good, it is easy to use and I recommend it.',
    answerTranslation: L(
      '이것은 훌륭한 제품이에요. 보기 좋고 사용하기 쉬워서 추천해요.',
      'Bu ajoyib mahsulot. Yaxshi ko‘rinadi, ishlatish oson va men uni tavsiya qilaman.',
      'This is a great product. It looks good, it is easy to use and I recommend it.',
      'Это отличный товар. Он хорошо выглядит, им легко пользоваться, и я его рекомендую.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['product-review'],
  },

  en_s2u5_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A useful product review describes the product and gives the writer’s opinion.',
    audioText:
      'A useful product review describes the product and gives the writer’s opinion.',
    answerTranslation: L(
      '유용한 제품 리뷰는 제품을 설명하고 작성자의 의견을 말해요.',
      'Foydali mahsulot sharhi mahsulotni tasvirlaydi va muallif fikrini beradi.',
      'A useful product review describes the product and gives the writer’s opinion.',
      'Полезный отзыв описывает товар и выражает мнение автора.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['product-review', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Workbook product review & writing
  // ===========================================================

  en_s2u5_n4_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'This is a great bike and I ___ it.',
    blankAnswers: ['recommend'],
    options: ['recommend', 'return', 'close', 'spend'],
    answer: 'recommend',
    answerTranslation: L(
      '이 자전거는 훌륭해서 추천해요.',
      'Bu ajoyib velosiped va men uni tavsiya qilaman.',
      'This is a great bike and I recommend it.',
      'Это отличный велосипед, и я его рекомендую.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'product-review'],
  },

  en_s2u5_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It looks ___.',
    blankAnswers: ['expensive'],
    options: ['expensive', 'badly', 'quickly', 'receipt'],
    answer: 'expensive',
    answerTranslation: L(
      '비싸 보여요.',
      'U qimmat ko‘rinadi.',
      'It looks expensive.',
      'Это выглядит дорого.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'product-review'],
  },

  en_s2u5_n4_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Overall, it is great ___.',
    blankAnswers: ['value'],
    options: ['value', 'size', 'receipt', 'battery'],
    answer: 'value',
    answerTranslation: L(
      '전체적으로 가격 대비 아주 좋아요.',
      'Umuman olganda, narxiga yarasha juda yaxshi.',
      'Overall, it is great value.',
      'В целом это отличное соотношение цены и качества.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'product-review'],
  },

  en_s2u5_n4_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It arrived very ___.',
    blankAnswers: ['quickly'],
    options: ['quickly', 'quick', 'expensive', 'value'],
    answer: 'quickly',
    answerTranslation: L(
      '아주 빨리 도착했어요.',
      'U juda tez yetib keldi.',
      'It arrived very quickly.',
      'Он прибыл очень быстро.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'adverbs'],
  },

  en_s2u5_n4_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is very ___ to use.',
    blankAnswers: ['easy'],
    options: ['easy', 'easily', 'quickly', 'expensively'],
    answer: 'easy',
    answerTranslation: L(
      '사용하기 아주 쉬워요.',
      'Uni ishlatish juda oson.',
      'It is very easy to use.',
      'Им очень легко пользоваться.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'product-review'],
  },

  en_s2u5_n4_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'The bike arrived the day after I ordered it. What can I say?',
      },
    ],
    options: [
      'It arrived quickly.',
      'It is difficult to use.',
      'It looks cheap.',
      'I do not recommend it.',
    ],
    answer: 'It arrived quickly.',
    answerTranslation: L(
      '빨리 도착했다고 말할 수 있어요.',
      'It arrived quickly deb aytish mumkin.',
      'It arrived quickly.',
      'Он прибыл быстро.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'delivery'],
  },

  en_s2u5_n4_067_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'The product is good for its price. What can you write?',
      },
    ],
    options: [
      'It is great value.',
      'It is a till.',
      'It is a receipt.',
      'It closes early.',
    ],
    answer: 'It is great value.',
    answerTranslation: L(
      '가격 대비 아주 좋다고 쓸 수 있어요.',
      'It is great value deb yozish mumkin.',
      'It is great value.',
      'Это отличное соотношение цены и качества.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'value'],
  },

  en_s2u5_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is wearing a scarf, a hat ___ gloves today.',
    blankAnswers: ['and'],
    options: ['and', 'but', 'because', 'or'],
    answer: 'and',
    answerTranslation: L(
      '그녀는 오늘 스카프, 모자와 장갑을 착용하고 있어요.',
      'U bugun sharf, bosh kiyim va qo‘lqop kiygan.',
      'She is wearing a scarf, a hat and gloves today.',
      'Сегодня на ней шарф, шляпа и перчатки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which sentence uses a list correctly?',
      },
    ],
    options: [
      'She is wearing a scarf, a hat and gloves.',
      'She is wearing, a scarf a hat, and gloves.',
      'She, is wearing a scarf a hat gloves.',
      'She is wearing a scarf and, a hat gloves.',
    ],
    answer: 'She is wearing a scarf, a hat and gloves.',
    answerTranslation: L(
      'She is wearing a scarf, a hat and gloves.가 올바른 문장이에요.',
      'She is wearing a scarf, a hat and gloves. to‘g‘ri.',
      'She is wearing a scarf, a hat and gloves.',
      'Правильно: She is wearing a scarf, a hat and gloves.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_070_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer:
      'Shopping online is easy, cheap and you can return things you do not like.',
    audioText:
      'Shopping online is easy, cheap and you can return things you do not like.',
    answerI18n: L(
      '온라인 쇼핑은 쉽고 저렴하며 마음에 들지 않는 물건은 반품할 수 있어요',
      'Onlayn xarid qilish oson, arzon va yoqmagan narsalarni qaytarish mumkin',
      'Shopping online is easy, cheap and you can return things you do not like',
      'Покупать онлайн легко и дёшево, а ненужные вещи можно вернуть',
    ),
    options: [
      'Shopping',
      'online',
      'is',
      'easy,',
      'cheap',
      'and',
      'you',
      'can',
      'return',
      'things',
      'you',
      'do',
      'not',
      'like.',
    ],
    optionsI18n: {
      ko: [
        '온라인',
        '쇼핑은',
        '쉽고,',
        '저렴하며',
        '마음에',
        '들지',
        '않는',
        '물건은',
        '반품할',
        '수',
        '있어요',
      ],
      uz: [
        'Onlayn',
        'xarid',
        'qilish',
        'oson,',
        'arzon',
        'va',
        'yoqmagan',
        'narsalarni',
        'qaytarish',
        'mumkin',
      ],
      en: [
        'Shopping',
        'online',
        'is',
        'easy,',
        'cheap',
        'and',
        'you',
        'can',
        'return',
        'things',
        'you',
        'do',
        'not',
        'like.',
      ],
      ru: [
        'Покупать',
        'онлайн',
        'легко,',
        'дёшево,',
        'и',
        'ненужные',
        'вещи',
        'можно',
        'вернуть',
      ],
    },
    answerTranslation: L(
      '온라인 쇼핑은 쉽고 저렴하며 마음에 들지 않는 물건은 반품할 수 있어요.',
      'Onlayn xarid qilish oson, arzon va yoqmagan narsalarni qaytarish mumkin.',
      'Shopping online is easy, cheap and you can return things you do not like.',
      'Покупать онлайн легко и дёшево, а ненужные вещи можно вернуть.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Jake drives slowly, carefully ___ not too fast.',
    blankAnswers: ['and'],
    options: ['and', 'because', 'or', 'but'],
    answer: 'and',
    answerTranslation: L(
      'Jake는 천천히, 조심스럽게 그리고 너무 빠르지 않게 운전해요.',
      'Jake sekin, ehtiyotkorlik bilan va juda tez bo‘lmagan holda haydaydi.',
      'Jake drives slowly, carefully and not too fast.',
      'Джейк водит медленно, осторожно и не слишком быстро.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In a list, we usually use ___ before the last item.',
    blankAnswers: ['and'],
    options: ['and', 'because', 'when', 'so'],
    answer: 'and',
    answerTranslation: L(
      '목록의 마지막 항목 앞에는 보통 and를 사용해요.',
      'Ro‘yxatdagi oxirgi elementdan oldin odatda and ishlatiladi.',
      'In a list, we usually use and before the last item.',
      'В списке перед последним элементом обычно используется and.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'When there are several items in a list, we use ___.',
    blankAnswers: ['commas'],
    options: ['commas', 'questions', 'discounts', 'receipts'],
    answer: 'commas',
    answerTranslation: L(
      '목록에 여러 항목이 있을 때 쉼표를 사용해요.',
      'Ro‘yxatda bir nechta element bo‘lsa, vergullar ishlatiladi.',
      'When there are several items in a list, we use commas.',
      'Когда в списке несколько элементов, используются запятые.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['It', 'is', 'easy', 'cheap', 'and', 'useful'],
    answer: 'It is easy cheap and useful',
    audioText: 'It is easy, cheap and useful.',
    answerTranslation: L(
      '쉽고 저렴하며 유용해요.',
      'U oson, arzon va foydali.',
      'It is easy, cheap and useful.',
      'Это легко, дёшево и полезно.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['writing', 'commas'],
  },

  en_s2u5_n4_075_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'The',
      'quality',
      'is',
      'good',
      'and',
      'the',
      'delivery',
      'is',
      'quick',
    ],
    answer: 'The quality is good and the delivery is quick',
    answerTranslation: L(
      '품질이 좋고 배송이 빨라요.',
      'Sifati yaxshi va yetkazib berish tez.',
      'The quality is good and the delivery is quick.',
      'Качество хорошее, а доставка быстрая.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['product-review'],
  },

  en_s2u5_n4_076_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'This is a great product and I recommend it.',
    audioText: 'This is a great product and I recommend it.',
    answerI18n: L(
      '이것은 훌륭한 제품이고 추천해요',
      'Bu ajoyib mahsulot va men uni tavsiya qilaman',
      'This is a great product and I recommend it',
      'Это отличный товар, и я его рекомендую',
    ),
    options: [
      'This',
      'is',
      'a',
      'great',
      'product',
      'and',
      'I',
      'recommend',
      'it.',
    ],
    optionsI18n: {
      ko: ['이것은', '훌륭한', '제품이고', '추천해요'],
      uz: [
        'Bu',
        'ajoyib',
        'mahsulot',
        'va',
        'men',
        'uni',
        'tavsiya',
        'qilaman',
      ],
      en: [
        'This',
        'is',
        'a',
        'great',
        'product',
        'and',
        'I',
        'recommend',
        'it.',
      ],
      ru: ['Это', 'отличный', 'товар,', 'и', 'я', 'его', 'рекомендую'],
    },
    answerTranslation: L(
      '이것은 훌륭한 제품이고 추천해요.',
      'Bu ajoyib mahsulot va men uni tavsiya qilaman.',
      'This is a great product and I recommend it.',
      'Это отличный товар, и я его рекомендую.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['product-review'],
  },

  en_s2u5_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'This product looks good, the quality is excellent and it is easy to use.',
    audioText:
      'This product looks good, the quality is excellent and it is easy to use.',
    answerTranslation: L(
      '이 제품은 보기 좋고 품질이 훌륭하며 사용하기 쉬워요.',
      'Bu mahsulot yaxshi ko‘rinadi, sifati a’lo va ishlatish oson.',
      'This product looks good, the quality is excellent and it is easy to use.',
      'Этот товар хорошо выглядит, качество отличное, и им легко пользоваться.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['product-review'],
  },

  en_s2u5_n4_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It arrived quickly, it is great value and I recommend it.',
    audioText: 'It arrived quickly, it is great value and I recommend it.',
    answerTranslation: L(
      '빨리 도착했고 가격 대비 아주 좋으며 추천해요.',
      'U tez yetib keldi, narxiga yarasha juda yaxshi va men uni tavsiya qilaman.',
      'It arrived quickly, it is great value and I recommend it.',
      'Он быстро прибыл, это отличное соотношение цены и качества, и я его рекомендую.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['product-review'],
  },

  en_s2u5_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'When I write a product review, I include the price, look, quality, user-friendliness, delivery and my opinion.',
    audioText:
      'When I write a product review, I include the price, look, quality, user-friendliness, delivery and my opinion.',
    answerTranslation: L(
      '제품 리뷰를 쓸 때 가격, 외관, 품질, 사용 편의성, 배송과 제 의견을 포함해요.',
      'Mahsulot sharhi yozganda narx, ko‘rinish, sifat, foydalanish qulayligi, yetkazib berish va fikrimni kiritaman.',
      'When I write a product review, I include the price, look, quality, user-friendliness, delivery and my opinion.',
      'Когда я пишу отзыв о товаре, я указываю цену, внешний вид, качество, удобство использования, доставку и своё мнение.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['product-review', 'review'],
  },

  en_s2u5_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 5.4, we practise buying things in a shop and writing an online product review.',
    audioText:
      'In Unit 5.4, we practise buying things in a shop and writing an online product review.',
    answerTranslation: L(
      'Unit 5.4에서는 가게에서 물건을 사는 대화와 온라인 제품 리뷰 쓰기를 연습해요.',
      'Unit 5.4 da do‘konda narsalar sotib olish va onlayn mahsulot sharhi yozishni mashq qilamiz.',
      'In Unit 5.4, we practise buying things in a shop and writing an online product review.',
      'В Unit 5.4 мы тренируем покупки в магазине и написание онлайн-отзыва о товаре.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE4 = {
  title: L(
    '가게에서 쇼핑하기와 제품 리뷰',
    'Do‘konda xarid va mahsulot sharhi',
    'Shopping in a shop and product reviews',
    'Покупки в магазине и отзывы о товарах',
  ),
  section: 2,
  unit: 5,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '가게에서 사용하는 표현',
        'Do‘kondagi iboralar',
        'Speaking in a shop',
        'Разговор в магазине',
      ),
      description: L(
        'Can I help you?, Can I try this on?, Can I pay by card?, How much is this? 등 가게에서 자주 사용하는 표현을 익혀요.',
        'Can I help you?, Can I try this on?, Can I pay by card? va How much is this? kabi do‘kondagi asosiy iboralarni o‘rganasiz.',
        'Practise the main customer and shop-assistant expressions from Unit 5.4.',
        'Практикуем основные фразы покупателя и продавца из Unit 5.4.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s2u5_n4_001_word_matching',
        'en_s2u5_n4_002_dialog_complete',
        'en_s2u5_n4_003_dialog_complete',
        'en_s2u5_n4_004_dialog_complete',
        'en_s2u5_n4_005_dialog_complete',
        'en_s2u5_n4_006_dialog_complete',
        'en_s2u5_n4_007_dialog_complete',
        'en_s2u5_n4_008_dialog_complete',
        'en_s2u5_n4_009_dialog_complete',
        'en_s2u5_n4_010_dialog_complete',
        'en_s2u5_n4_011_fill_in_blank',
        'en_s2u5_n4_012_fill_in_blank',
        'en_s2u5_n4_013_fill_in_blank',
        'en_s2u5_n4_014_fill_in_blank',
        'en_s2u5_n4_015_fill_in_blank',
        'en_s2u5_n4_016_word_arrange',
        'en_s2u5_n4_017_translate_builder',
        'en_s2u5_n4_018_sentence_builder',
        'en_s2u5_n4_019_speaking',
        'en_s2u5_n4_020_speaking',
      ],
    },

    {
      title: L(
        '손님과 점원의 대화',
        'Mijoz va sotuvchi suhbati',
        'Customer and shop assistant',
        'Покупатель и продавец',
      ),
      description: L(
        'Workbook의 대화를 바탕으로 할인, 결제, 사이즈, 탈의실과 영업시간을 묻고 답하는 표현을 연습해요.',
        'Workbook suhbatlari orqali chegirma, to‘lov, o‘lcham, kiyinish xonasi va yopilish vaqtini so‘rashni mashq qilasiz.',
        'Complete and practise the shop dialogues from the Workbook.',
        'Дополняем и тренируем диалоги из Workbook.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s2u5_n4_021_dialog_complete',
        'en_s2u5_n4_022_fill_in_blank',
        'en_s2u5_n4_023_fill_in_blank',
        'en_s2u5_n4_024_fill_in_blank',
        'en_s2u5_n4_025_dialog_complete',
        'en_s2u5_n4_026_fill_in_blank',
        'en_s2u5_n4_027_dialog_complete',
        'en_s2u5_n4_028_dialog_complete',
        'en_s2u5_n4_029_fill_in_blank',
        'en_s2u5_n4_030_dialog_complete',
        'en_s2u5_n4_031_fill_in_blank',
        'en_s2u5_n4_032_dialog_complete',
        'en_s2u5_n4_033_dialog_complete',
        'en_s2u5_n4_034_fill_in_blank',
        'en_s2u5_n4_035_dialog_complete',
        'en_s2u5_n4_036_word_arrange',
        'en_s2u5_n4_037_translate_builder',
        'en_s2u5_n4_038_sentence_builder',
        'en_s2u5_n4_039_speaking',
        'en_s2u5_n4_040_speaking',
      ],
    },

    {
      title: L(
        '제품 리뷰 쓰기',
        'Mahsulot sharhi yozish',
        'Writing a product review',
        'Как написать отзыв о товаре',
      ),
      description: L(
        '가격, 외관, 품질, 사용 편의성, 배송을 설명하고 recommend, worth, value 같은 표현으로 의견을 작성해요.',
        'Narx, ko‘rinish, sifat, foydalanish qulayligi va yetkazib berishni tasvirlab, recommend, worth va value bilan fikr bildirasiz.',
        'Describe price, look, quality, user-friendliness and delivery and give an opinion.',
        'Описываем цену, внешний вид, качество, удобство и доставку и выражаем мнение.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u5_n4_041_word_matching',
        'en_s2u5_n4_042_fill_in_blank',
        'en_s2u5_n4_043_fill_in_blank',
        'en_s2u5_n4_044_fill_in_blank',
        'en_s2u5_n4_045_fill_in_blank',
        'en_s2u5_n4_046_fill_in_blank',
        'en_s2u5_n4_047_fill_in_blank',
        'en_s2u5_n4_048_fill_in_blank',
        'en_s2u5_n4_049_fill_in_blank',
        'en_s2u5_n4_050_fill_in_blank',
        'en_s2u5_n4_051_fill_in_blank',
        'en_s2u5_n4_052_dialog_complete',
        'en_s2u5_n4_053_dialog_complete',
        'en_s2u5_n4_054_dialog_complete',
        'en_s2u5_n4_055_fill_in_blank',
        'en_s2u5_n4_056_word_arrange',
        'en_s2u5_n4_057_translate_builder',
        'en_s2u5_n4_058_sentence_builder',
        'en_s2u5_n4_059_speaking',
        'en_s2u5_n4_060_speaking',
      ],
    },

    {
      title: L(
        '좋은 리뷰와 문장 부호',
        'Yaxshi sharh va tinish belgilari',
        'Good reviews and punctuation',
        'Хороший отзыв и пунктуация',
      ),
      description: L(
        'Workbook의 product review를 긍정적인 리뷰로 바꾸고, 목록에서 쉼표와 and를 사용하는 방법까지 복습해요.',
        'Workbookdagi product review ni ijobiy sharhga o‘zgartirib, ro‘yxatlarda vergul va and ishlatishni mashq qilasiz.',
        'Improve a product review and practise commas and and in lists.',
        'Улучшаем отзыв о товаре и тренируем запятые и and в списках.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u5_n4_061_fill_in_blank',
        'en_s2u5_n4_062_fill_in_blank',
        'en_s2u5_n4_063_fill_in_blank',
        'en_s2u5_n4_064_fill_in_blank',
        'en_s2u5_n4_065_fill_in_blank',
        'en_s2u5_n4_066_dialog_complete',
        'en_s2u5_n4_067_dialog_complete',
        'en_s2u5_n4_068_fill_in_blank',
        'en_s2u5_n4_069_dialog_complete',
        'en_s2u5_n4_070_sentence_builder',
        'en_s2u5_n4_071_fill_in_blank',
        'en_s2u5_n4_072_fill_in_blank',
        'en_s2u5_n4_073_fill_in_blank',
        'en_s2u5_n4_074_word_arrange',
        'en_s2u5_n4_075_translate_builder',
        'en_s2u5_n4_076_sentence_builder',
        'en_s2u5_n4_077_speaking',
        'en_s2u5_n4_078_speaking',
        'en_s2u5_n4_079_speaking',
        'en_s2u5_n4_080_speaking',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 5 · Node 5
// 5.5 Video · Camden Market + Unit 5 Review
//
// Coverage
// Video:
// - Camden Market
// - stall
// - vintage
// - fashion
// - home-made
// - high street
// - stylish
// - shopping choice / payment / hours / prices / quality
// - flag / hat / shoes / sunglasses / umbrella
//
// Unit 5 Review:
// - can / could
// - present continuous
// - shopping habits
// - clothes and accessories
// - adjectives → adverbs
// - speaking in a shop
//
// IMPORTANT:
// *_WORDS에는 단일 headword만 등록.
// high street / home-made / credit card / changing room 등은
// phrase/compound이므로 WORD 등록하지 않음.
//
// customer / quality / umbrella 등 기존 WORD는 재등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE5_WORDS = [
  {
    code: 'en-noun-stall',
    english: 'stall',
    senseKey: 'small-shop-or-table-in-market',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '노점; 가판대',
      'rastacha',
      'a small shop or table in a street or market where people sell things',
      'прилавок; торговая палатка',
    ),
    examples: [
      {
        english: 'There are many stalls at Camden Market.',
        translations: L(
          'Camden Market에는 많은 노점이 있어요.',
          'Camden Marketda ko‘plab rastalar bor.',
          'There are many stalls at Camden Market.',
          'На Camden Market много торговых палаток.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/stɔːl/',
      ttsText: 'stall',
    },
    tags: ['shopping', 'market', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-vintage',
    english: 'vintage',
    senseKey: 'old-but-high-quality',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '빈티지의; 오래됐지만 좋은 품질의',
      'vintaj; eski, ammo sifatli',
      'old, but of good quality',
      'винтажный',
    ),
    examples: [
      {
        english: 'They sell vintage clothes.',
        translations: L(
          '그들은 빈티지 옷을 팔아요.',
          'Ular vintaj kiyimlar sotadi.',
          'They sell vintage clothes.',
          'Они продают винтажную одежду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈvɪntɪdʒ/',
      ttsText: 'vintage',
    },
    tags: ['shopping', 'clothes', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-fashion',
    english: 'fashion',
    senseKey: 'popular-style-of-clothes-or-appearance',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '패션; 유행',
      'moda',
      'a style of clothes or appearance that is popular',
      'мода',
    ),
    examples: [
      {
        english: 'Fashion changes quickly.',
        translations: L(
          '패션은 빠르게 변해요.',
          'Moda tez o‘zgaradi.',
          'Fashion changes quickly.',
          'Мода быстро меняется.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæʃən/',
      ttsText: 'fashion',
    },
    tags: ['shopping', 'clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-stylish',
    english: 'stylish',
    senseKey: 'attractive-and-fashionable',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '세련된; 멋진',
      'zamonaviy va chiroyli',
      'attractive and fashionable',
      'стильный',
    ),
    examples: [
      {
        english: 'That jacket is very stylish.',
        translations: L(
          '그 재킷은 아주 세련됐어요.',
          'U kurtka juda chiroyli va zamonaviy.',
          'That jacket is very stylish.',
          'Этот пиджак очень стильный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstaɪlɪʃ/',
      ttsText: 'stylish',
    },
    tags: ['shopping', 'clothes', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-flag',
    english: 'flag',
    senseKey: 'piece-of-cloth-symbolizing-country-or-group',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '깃발',
      'bayroq',
      'a piece of cloth with a design representing a country or group',
      'флаг',
    ),
    examples: [
      {
        english: 'There is a flag above the shop.',
        translations: L(
          '가게 위에 깃발이 있어요.',
          'Do‘kon ustida bayroq bor.',
          'There is a flag above the shop.',
          'Над магазином есть флаг.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flæɡ/',
      ttsText: 'flag',
    },
    tags: ['video', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sunglasses',
    english: 'sunglasses',
    senseKey: 'dark-glasses-protecting-eyes-from-sun',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '선글라스',
      'quyosh ko‘zoynagi',
      'dark glasses worn to protect the eyes from bright sunlight',
      'солнцезащитные очки',
    ),
    examples: [
      {
        english: 'She is wearing sunglasses.',
        translations: L(
          '그녀는 선글라스를 쓰고 있어요.',
          'U quyosh ko‘zoynagi taqib turibdi.',
          'She is wearing sunglasses.',
          'На ней солнцезащитные очки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌnɡlɑːsɪz/',
      ttsText: 'sunglasses',
    },
    tags: ['clothes', 'accessories', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-choice',
    english: 'choice',
    senseKey: 'range-of-things-to-choose-from',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '선택; 선택의 폭',
      'tanlov',
      'a range of things that you can choose from',
      'выбор',
    ),
    examples: [
      {
        english: 'The market has a good choice of clothes.',
        translations: L(
          '그 시장에는 다양한 옷이 있어요.',
          'Bozorda kiyimlarning yaxshi tanlovi bor.',
          'The market has a good choice of clothes.',
          'На рынке хороший выбор одежды.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃɔɪs/',
      ttsText: 'choice',
    },
    tags: ['shopping', 'market', 'unit5'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-payment',
    english: 'payment',
    senseKey: 'act-or-method-of-paying',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '결제; 지불',
      'to‘lov',
      'the act or method of paying for something',
      'оплата',
    ),
    examples: [
      {
        english: 'Different shops accept different forms of payment.',
        translations: L(
          '가게마다 받는 결제 방식이 달라요.',
          'Turli do‘konlar turli to‘lov usullarini qabul qiladi.',
          'Different shops accept different forms of payment.',
          'Разные магазины принимают разные способы оплаты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeɪmənt/',
      ttsText: 'payment',
    },
    tags: ['shopping', 'money', 'unit5'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-price',
    english: 'price',
    senseKey: 'amount-of-money-needed-to-buy-something',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가격',
      'narx',
      'the amount of money needed to buy something',
      'цена',
    ),
    examples: [
      {
        english: 'The price is very low.',
        translations: L(
          '가격이 아주 낮아요.',
          'Narxi juda past.',
          'The price is very low.',
          'Цена очень низкая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/praɪs/',
      ttsText: 'price',
    },
    tags: ['shopping', 'money', 'unit5'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT5_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Camden Market
  // ===========================================================

  en_s2u5_n5_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'stall',
        native: 'rastacha',
        nativeI18n: L('노점', 'rastacha', 'stall', 'торговая палатка'),
      },
      {
        text: 'vintage',
        native: 'vintaj',
        nativeI18n: L('빈티지', 'vintaj', 'vintage', 'винтажный'),
      },
      {
        text: 'fashion',
        native: 'moda',
        nativeI18n: L('패션', 'moda', 'fashion', 'мода'),
      },
      {
        text: 'stylish',
        native: 'zamonaviy',
        nativeI18n: L('세련된', 'zamonaviy', 'stylish', 'стильный'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market'],
  },

  en_s2u5_n5_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'A ___ is a small shop or table in a street or market where people sell things.',
    blankAnswers: ['stall'],
    options: ['stall', 'flag', 'fashion', 'payment'],
    answer: 'stall',
    answerTranslation: L(
      '거리나 시장에서 물건을 파는 작은 가게나 테이블을 stall이라고 해요.',
      'Ko‘cha yoki bozorda narsalar sotiladigan kichik joy stall deyiladi.',
      'A stall is a small shop or table in a street or market where people sell things.',
      'Stall — это небольшая торговая точка или стол на улице или рынке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'stall'],
  },

  en_s2u5_n5_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Something that is old but high quality can be called ___.',
    blankAnswers: ['vintage'],
    options: ['vintage', 'stylish', 'online', 'quickly'],
    answer: 'vintage',
    answerTranslation: L(
      '오래됐지만 품질이 좋은 것은 vintage라고 할 수 있어요.',
      'Eski, ammo sifatli narsani vintage deb atash mumkin.',
      'Something that is old but high quality can be called vintage.',
      'Старую, но качественную вещь можно назвать vintage.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'vintage'],
  },

  en_s2u5_n5_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A popular style is called ___.',
    blankAnswers: ['fashion'],
    options: ['fashion', 'payment', 'stall', 'receipt'],
    answer: 'fashion',
    answerTranslation: L(
      '인기 있는 스타일은 fashion이라고 해요.',
      'Mashhur uslub fashion deyiladi.',
      'A popular style is called fashion.',
      'Популярный стиль называется fashion.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'fashion'],
  },

  en_s2u5_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People make ___ products in their houses to sell.',
    blankAnswers: ['home-made'],
    options: ['home-made', 'high street', 'vintage', 'online'],
    answer: 'home-made',
    answerTranslation: L(
      '사람들은 집에서 직접 만든 제품을 판매하기도 해요.',
      'Odamlar uyda tayyorlangan mahsulotlarni sotishadi.',
      'People make home-made products in their houses to sell.',
      'Люди делают дома товары ручной работы для продажи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market'],
  },

  en_s2u5_n5_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The ___ is the street where the most important shops, banks and businesses are.',
    blankAnswers: ['high street'],
    options: ['high street', 'stall', 'fashion', 'sales'],
    answer: 'high street',
    answerTranslation: L(
      '주요 가게, 은행과 사업체가 모여 있는 중심 상업 거리를 high street라고 해요.',
      'Asosiy do‘kon, bank va bizneslar joylashgan ko‘cha high street deyiladi.',
      'The high street is the street where the most important shops, banks and businesses are.',
      'High street — это главная торговая улица с магазинами, банками и компаниями.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['camden-market'],
  },

  en_s2u5_n5_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Something attractive and fashionable is ___.',
    blankAnswers: ['stylish'],
    options: ['stylish', 'vintage', 'cash', 'slowly'],
    answer: 'stylish',
    answerTranslation: L(
      '매력적이고 세련된 것은 stylish해요.',
      'Chiroyli va zamonaviy narsa stylish.',
      'Something attractive and fashionable is stylish.',
      'Привлекательная и модная вещь — stylish.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'stylish'],
  },

  en_s2u5_n5_008_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'flag',
        native: 'bayroq',
        nativeI18n: L('깃발', 'bayroq', 'flag', 'флаг'),
      },
      {
        text: 'sunglasses',
        native: 'quyosh ko‘zoynagi',
        nativeI18n: L(
          '선글라스',
          'quyosh ko‘zoynagi',
          'sunglasses',
          'солнцезащитные очки',
        ),
      },
      {
        text: 'umbrella',
        native: 'soyabon',
        nativeI18n: L('우산', 'soyabon', 'umbrella', 'зонт'),
      },
      {
        text: 'hat',
        native: 'bosh kiyim',
        nativeI18n: L('모자', 'bosh kiyim', 'hat', 'шляпа'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'video'],
  },

  en_s2u5_n5_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You wear ___ to protect your eyes from bright sunlight.',
    blankAnswers: ['sunglasses'],
    options: ['sunglasses', 'gloves', 'socks', 'trousers'],
    answer: 'sunglasses',
    answerTranslation: L(
      '강한 햇빛으로부터 눈을 보호하려고 선글라스를 써요.',
      'Ko‘zni kuchli quyoshdan himoya qilish uchun quyosh ko‘zoynagi taqiladi.',
      'You wear sunglasses to protect your eyes from bright sunlight.',
      'Солнцезащитные очки защищают глаза от яркого солнца.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'video'],
  },

  en_s2u5_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ can represent a country.',
    blankAnswers: ['flag'],
    options: ['flag', 'stall', 'payment', 'price'],
    answer: 'flag',
    answerTranslation: L(
      '깃발은 한 나라를 나타낼 수 있어요.',
      'Bayroq mamlakatni ifodalashi mumkin.',
      'A flag can represent a country.',
      'Флаг может представлять страну.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'video'],
  },

  en_s2u5_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'When comparing places to shop, you can think about the ___ of products.',
    blankAnswers: ['choice'],
    options: ['choice', 'receipt', 'tie', 'delivery'],
    answer: 'choice',
    answerTranslation: L(
      '쇼핑 장소를 비교할 때 상품 선택의 폭을 생각할 수 있어요.',
      'Xarid joylarini taqqoslaganda mahsulot tanlovini ko‘rib chiqish mumkin.',
      'When comparing places to shop, you can think about the choice of products.',
      'При сравнении мест для покупок можно учитывать выбор товаров.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'shopping'],
  },

  en_s2u5_n5_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Cash and cards are forms of ___.',
    blankAnswers: ['payment'],
    options: ['payment', 'fashion', 'quality', 'choice'],
    answer: 'payment',
    answerTranslation: L(
      '현금과 카드는 결제 방식이에요.',
      'Naqd pul va kartalar to‘lov shakllari.',
      'Cash and cards are forms of payment.',
      'Наличные и карты — формы оплаты.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'shopping'],
  },

  en_s2u5_n5_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The amount of money something costs is its ___.',
    blankAnswers: ['price'],
    options: ['price', 'choice', 'fashion', 'stall'],
    answer: 'price',
    answerTranslation: L(
      '물건이 얼마인지 나타내는 것은 가격이에요.',
      'Narsaning qancha turishini bildiradigan narsa uning narxi.',
      'The amount of money something costs is its price.',
      'Сумма, которую стоит товар, — его цена.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['camden-market', 'shopping'],
  },

  en_s2u5_n5_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What can you compare when you look at two places to shop?',
      },
    ],
    options: [
      'Choice, payment, hours, prices and quality.',
      'Only the weather.',
      'Only the building colour.',
      'Only the street name.',
    ],
    answer: 'Choice, payment, hours, prices and quality.',
    answerTranslation: L(
      '선택의 폭, 결제 방식, 영업시간, 가격과 품질을 비교할 수 있어요.',
      'Tanlov, to‘lov, ish vaqti, narx va sifatni taqqoslash mumkin.',
      'Choice, payment, hours, prices and quality.',
      'Выбор, оплату, часы работы, цены и качество.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['camden-market'],
  },

  en_s2u5_n5_015_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Where can you often find stalls?',
      },
    ],
    options: [
      'In a street or market.',
      'Only inside an airport.',
      'Only inside a hospital.',
      'Only in a classroom.',
    ],
    answer: 'In a street or market.',
    answerTranslation: L(
      '거리나 시장에서요.',
      'Ko‘cha yoki bozorda.',
      'In a street or market.',
      'На улице или рынке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['camden-market'],
  },

  en_s2u5_n5_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['They', 'sell', 'vintage', 'clothes', 'at', 'the', 'market'],
    answer: 'They sell vintage clothes at the market',
    audioText: 'They sell vintage clothes at the market.',
    answerTranslation: L(
      '그 시장에서는 빈티지 옷을 팔아요.',
      'Bozorda vintaj kiyimlar sotiladi.',
      'They sell vintage clothes at the market.',
      'На рынке продают винтажную одежду.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['camden-market'],
  },

  en_s2u5_n5_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'are', 'many', 'stalls', 'at', 'the', 'market'],
    answer: 'There are many stalls at the market',
    answerTranslation: L(
      '시장에는 많은 노점이 있어요.',
      'Bozorda ko‘plab rastalar bor.',
      'There are many stalls at the market.',
      'На рынке много торговых палаток.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['camden-market'],
  },

  en_s2u5_n5_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The market has a good choice of stylish clothes.',
    audioText: 'The market has a good choice of stylish clothes.',
    answerI18n: L(
      '그 시장에는 세련된 옷을 다양하게 선택할 수 있어요',
      'Bozorda zamonaviy kiyimlarning yaxshi tanlovi bor',
      'The market has a good choice of stylish clothes',
      'На рынке хороший выбор стильной одежды',
    ),
    options: [
      'The',
      'market',
      'has',
      'a',
      'good',
      'choice',
      'of',
      'stylish',
      'clothes.',
    ],
    optionsI18n: {
      ko: [
        '그',
        '시장에는',
        '세련된',
        '옷을',
        '다양하게',
        '선택할',
        '수',
        '있어요',
      ],
      uz: ['Bozorda', 'zamonaviy', 'kiyimlarning', 'yaxshi', 'tanlovi', 'bor'],
      en: [
        'The',
        'market',
        'has',
        'a',
        'good',
        'choice',
        'of',
        'stylish',
        'clothes.',
      ],
      ru: ['На', 'рынке', 'хороший', 'выбор', 'стильной', 'одежды'],
    },
    answerTranslation: L(
      '그 시장에는 세련된 옷을 다양하게 선택할 수 있어요.',
      'Bozorda zamonaviy kiyimlarning yaxshi tanlovi bor.',
      'The market has a good choice of stylish clothes.',
      'На рынке хороший выбор стильной одежды.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['camden-market'],
  },

  en_s2u5_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'At a market, you can compare the choice of products, prices, payment methods and quality.',
    audioText:
      'At a market, you can compare the choice of products, prices, payment methods and quality.',
    answerTranslation: L(
      '시장에서는 상품 선택의 폭, 가격, 결제 방식과 품질을 비교할 수 있어요.',
      'Bozorda mahsulot tanlovi, narxlar, to‘lov usullari va sifatni taqqoslash mumkin.',
      'At a market, you can compare the choice of products, prices, payment methods and quality.',
      'На рынке можно сравнивать выбор товаров, цены, способы оплаты и качество.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['camden-market'],
  },

  en_s2u5_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Camden Market is connected with stalls, fashion, vintage clothes and unusual shopping.',
    audioText:
      'Camden Market is connected with stalls, fashion, vintage clothes and unusual shopping.',
    answerTranslation: L(
      'Camden Market은 노점, 패션, 빈티지 옷과 독특한 쇼핑과 관련돼 있어요.',
      'Camden Market rastalar, moda, vintaj kiyimlar va noodatiy xarid bilan bog‘liq.',
      'Camden Market is connected with stalls, fashion, vintage clothes and unusual shopping.',
      'Camden Market связан с торговыми палатками, модой, винтажной одеждой и необычными покупками.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['camden-market', 'review'],
  },

  // ===========================================================
  // Lesson 2 · can / could & present continuous review
  // ===========================================================

  en_s2u5_n5_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you drive a car?',
    blankAnswers: ['Can'],
    options: ['Can', 'Couldn’t', 'Are', 'Do can'],
    answer: 'Can',
    answerTranslation: L(
      '운전할 수 있나요?',
      'Mashina hayday olasizmi?',
      'Can you drive a car?',
      'Вы умеете водить машину?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'can'],
  },

  en_s2u5_n5_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you drive a car when you were a child?',
    blankAnswers: ['Could'],
    options: ['Could', 'Can', 'Are', 'Did can'],
    answer: 'Could',
    answerTranslation: L(
      '어렸을 때 운전할 수 있었나요?',
      'Bolaligingizda mashina hayday olarmidingiz?',
      'Could you drive a car when you were a child?',
      'Вы умели водить машину в детстве?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'could'],
  },

  en_s2u5_n5_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can you ___ for half an hour?',
    blankAnswers: ['run'],
    options: ['run', 'running', 'ran', 'runs'],
    answer: 'run',
    answerTranslation: L(
      '30분 동안 달릴 수 있나요?',
      'Yarim soat yugura olasizmi?',
      'Can you run for half an hour?',
      'Вы можете бегать полчаса?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'can'],
  },

  en_s2u5_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'Could you ___ a musical instrument when you were a child?',
    blankAnswers: ['play'],
    options: ['play', 'played', 'playing', 'plays'],
    answer: 'play',
    answerTranslation: L(
      '어렸을 때 악기를 연주할 수 있었나요?',
      'Bolaligingizda musiqa asbobini chala olarmidingiz?',
      'Could you play a musical instrument when you were a child?',
      'Вы умели играть на музыкальном инструменте в детстве?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'could'],
  },

  en_s2u5_n5_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can you use credit cards in most ___?',
    blankAnswers: ['shops'],
    options: ['shops', 'scarves', 'jeans', 'sales'],
    answer: 'shops',
    answerTranslation: L(
      '대부분의 가게에서 신용카드를 사용할 수 있나요?',
      'Ko‘p do‘konlarda kredit kartadan foydalana olasizmi?',
      'Can you use credit cards in most shops?',
      'Можно пользоваться кредитными картами в большинстве магазинов?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'can'],
  },

  en_s2u5_n5_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Look at the people in the park! They ___ running.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'do', 'can'],
    answer: 'are',
    answerTranslation: L(
      '공원에 있는 사람들을 보세요! 달리고 있어요.',
      'Parkdagi odamlarga qarang! Ular yuguryapti.',
      'Look at the people in the park! They are running.',
      'Посмотрите на людей в парке! Они бегут.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Don’t turn off the TV. I ___ watching it.',
    blankAnswers: ['am'],
    options: ['am', 'is', 'are', 'do'],
    answer: 'am',
    answerTranslation: L(
      'TV를 끄지 마세요. 보고 있어요.',
      'Televizorni o‘chirmang. Men uni ko‘ryapman.',
      'Don’t turn off the TV. I am watching it.',
      'Не выключайте телевизор. Я его смотрю.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Listen! The birds ___ singing.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'do', 'does'],
    answer: 'are',
    answerTranslation: L(
      '들어 보세요! 새들이 노래하고 있어요.',
      'Tinglang! Qushlar sayrayapti.',
      'Listen! The birds are singing.',
      'Послушайте! Птицы поют.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'You can’t go in that changing room. Someone ___ using it.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'does', 'can'],
    answer: 'is',
    answerTranslation: L(
      '그 탈의실에는 들어갈 수 없어요. 누군가 사용하고 있어요.',
      'U kiyinish xonasiga kira olmaysiz. Kimdir undan foydalanyapti.',
      'You can’t go in that changing room. Someone is using it.',
      'В эту примерочную нельзя войти. Кто-то ей пользуется.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He can’t answer the phone. He ___ driving.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'does', 'can'],
    answer: 'is',
    answerTranslation: L(
      '그는 전화를 받을 수 없어요. 운전하고 있어요.',
      'U telefonga javob bera olmaydi. U mashina haydayapti.',
      'He can’t answer the phone. He is driving.',
      'Он не может ответить на телефон. Он за рулём.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can you play a musical instrument?' },
    ],
    options: [
      'No, I can’t.',
      'No, I couldn’t now.',
      'No, I’m not play.',
      'No, I don’t can.',
    ],
    answer: 'No, I can’t.',
    answerTranslation: L(
      '아니요, 못해요.',
      'Yo‘q, chala olmayman.',
      'No, I can’t.',
      'Нет, не умею.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'can'],
  },

  en_s2u5_n5_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Could you play a musical instrument when you were a child?',
      },
    ],
    options: [
      'Yes, I could. I could play the piano.',
      'Yes, I can yesterday.',
      'Yes, I was play the piano.',
      'Yes, I could played.',
    ],
    answer: 'Yes, I could. I could play the piano.',
    answerTranslation: L(
      '네. 피아노를 칠 수 있었어요.',
      'Ha. Men pianino chala olardim.',
      'Yes, I could. I could play the piano.',
      'Да. Я умел играть на пианино.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'could'],
  },

  en_s2u5_n5_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We use can for ability ___.',
    blankAnswers: ['now'],
    options: ['now', 'only yesterday', 'only in 1970', 'never'],
    answer: 'now',
    answerTranslation: L(
      'can은 현재의 능력을 말할 때 사용해요.',
      'Can hozirgi qobiliyat uchun ishlatiladi.',
      'We use can for ability now.',
      'Can используется для способности сейчас.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'can'],
  },

  en_s2u5_n5_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We use could for ability in the ___.',
    blankAnswers: ['past'],
    options: ['past', 'future only', 'present only', 'imperative'],
    answer: 'past',
    answerTranslation: L(
      'could는 과거의 능력을 말할 때 사용해요.',
      'Could o‘tgan zamondagi qobiliyat uchun ishlatiladi.',
      'We use could for ability in the past.',
      'Could используется для способности в прошлом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'could'],
  },

  en_s2u5_n5_035_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'Could',
      'you',
      'speak',
      'English',
      'when',
      'you',
      'were',
      'a',
      'child',
    ],
    answer: 'Could you speak English when you were a child',
    audioText: 'Could you speak English when you were a child?',
    answerTranslation: L(
      '어렸을 때 영어를 할 수 있었나요?',
      'Bolaligingizda ingliz tilida gapira olarmidingiz?',
      'Could you speak English when you were a child?',
      'Вы умели говорить по-английски в детстве?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit5-review', 'could'],
  },

  en_s2u5_n5_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'birds', 'are', 'singing'],
    answer: 'The birds are singing',
    answerTranslation: L(
      '새들이 노래하고 있어요.',
      'Qushlar sayrayapti.',
      'The birds are singing.',
      'Птицы поют.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_037_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Someone is using the changing room.',
    audioText: 'Someone is using the changing room.',
    answerI18n: L(
      '누군가 탈의실을 사용하고 있어요',
      'Kimdir kiyinish xonasidan foydalanyapti',
      'Someone is using the changing room',
      'Кто-то пользуется примерочной',
    ),
    options: ['Someone', 'is', 'using', 'the', 'changing', 'room.'],
    optionsI18n: {
      ko: ['누군가', '탈의실을', '사용하고', '있어요'],
      uz: ['Kimdir', 'kiyinish', 'xonasidan', 'foydalanyapti'],
      en: ['Someone', 'is', 'using', 'the', 'changing', 'room.'],
      ru: ['Кто-то', 'пользуется', 'примерочной'],
    },
    answerTranslation: L(
      '누군가 탈의실을 사용하고 있어요.',
      'Kimdir kiyinish xonasidan foydalanyapti.',
      'Someone is using the changing room.',
      'Кто-то пользуется примерочной.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Can you stay up late? Could you stay up late when you were a child?',
    audioText:
      'Can you stay up late? Could you stay up late when you were a child?',
    answerTranslation: L(
      '지금 늦게까지 깨어 있을 수 있나요? 어렸을 때도 그럴 수 있었나요?',
      'Hozir kechgacha uyg‘oq qola olasizmi? Bolaligingizda ham shunday qila olarmidingiz?',
      'Can you stay up late? Could you stay up late when you were a child?',
      'Вы можете поздно ложиться сейчас? А в детстве могли?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review', 'can-could'],
  },

  en_s2u5_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The present continuous describes actions that are happening now.',
    audioText:
      'The present continuous describes actions that are happening now.',
    answerTranslation: L(
      '현재진행형은 지금 일어나고 있는 행동을 나타내요.',
      'Present continuous hozir sodir bo‘layotgan harakatlarni bildiradi.',
      'The present continuous describes actions that are happening now.',
      'Present continuous описывает действия, происходящие сейчас.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit5-review', 'present-continuous'],
  },

  en_s2u5_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Can and could describe ability, while the present continuous describes an action happening now.',
    audioText:
      'Can and could describe ability, while the present continuous describes an action happening now.',
    answerTranslation: L(
      'can과 could는 능력을 나타내고 현재진행형은 지금 일어나는 행동을 나타내요.',
      'Can va could qobiliyatni, present continuous esa hozirgi harakatni bildiradi.',
      'Can and could describe ability, while the present continuous describes an action happening now.',
      'Can и could выражают способность, а present continuous — действие, происходящее сейчас.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit5-review'],
  },

  // ===========================================================
  // Lesson 3 · Shopping, clothes & adverbs review
  // ===========================================================

  en_s2u5_n5_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: "baker's",
        native: 'bread',
        nativeI18n: L('빵', 'non', 'bread', 'хлеб'),
      },
      {
        text: "butcher's",
        native: 'meat',
        nativeI18n: L('고기', 'go‘sht', 'meat', 'мясо'),
      },
      {
        text: "newsagent's",
        native: 'magazines',
        nativeI18n: L('잡지', 'jurnallar', 'magazines', 'журналы'),
      },
      {
        text: 'sales',
        native: 'lower prices',
        nativeI18n: L(
          '낮은 가격',
          'arzonroq narxlar',
          'lower prices',
          'низкие цены',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'shopping'],
  },

  en_s2u5_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I hardly ever buy bread from the ___.',
    blankAnswers: ["baker's"],
    options: ["baker's", "butcher's", "newsagent's", 'sales'],
    answer: "baker's",
    answerTranslation: L(
      '저는 빵집에서 빵을 거의 사지 않아요.',
      'Men novvoyxonadan deyarli hech qachon non sotib olmayman.',
      'I hardly ever buy bread from the baker’s.',
      'Я почти никогда не покупаю хлеб в булочной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'shopping'],
  },

  en_s2u5_n5_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'If something is the wrong size, you can ___ it to the shop.',
    blankAnswers: ['return'],
    options: ['return', 'spend', 'wear', 'close'],
    answer: 'return',
    answerTranslation: L(
      '사이즈가 맞지 않으면 가게에 반품할 수 있어요.',
      'O‘lchami noto‘g‘ri bo‘lsa, uni do‘konga qaytarish mumkin.',
      'If something is the wrong size, you can return it to the shop.',
      'Если размер не подходит, вещь можно вернуть в магазин.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'shopping'],
  },

  en_s2u5_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Students sometimes get a ___.',
    blankAnswers: ['discount'],
    options: ['discount', 'receipt', 'fashion', 'stall'],
    answer: 'discount',
    answerTranslation: L(
      '학생들은 가끔 할인을 받아요.',
      'Talabalar ba’zan chegirma oladi.',
      'Students sometimes get a discount.',
      'Студенты иногда получают скидку.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'shopping'],
  },

  en_s2u5_n5_045_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which item is different: hat, jeans, shorts, trousers?',
      },
    ],
    options: ['hat', 'jeans', 'shorts', 'trousers'],
    answer: 'hat',
    answerTranslation: L(
      'hat이에요. 나머지는 모두 다리에 입는 옷이에요.',
      'hat. Qolganlari oyoqqa kiyiladigan kiyimlar.',
      'Hat. The others are all clothes worn on the legs.',
      'Hat. Остальные — одежда для ног.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'clothes'],
  },

  en_s2u5_n5_046_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which item is different: socks, jacket, trainers, shoes?',
      },
    ],
    options: ['jacket', 'socks', 'trainers', 'shoes'],
    answer: 'jacket',
    answerTranslation: L('jacket이에요.', 'jacket.', 'Jacket.', 'Jacket.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'clothes'],
  },

  en_s2u5_n5_047_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which item is different: top, T-shirt, jewellery, hoodie?',
      },
    ],
    options: ['jewellery', 'top', 'T-shirt', 'hoodie'],
    answer: 'jewellery',
    answerTranslation: L(
      'jewellery예요. 나머지는 옷이에요.',
      'jewellery. Qolganlari kiyim.',
      'Jewellery. The others are clothes.',
      'Jewellery. Остальное — одежда.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'clothes'],
  },

  en_s2u5_n5_048_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which item is different: coat, scarf, gloves, dress?',
      },
    ],
    options: ['dress', 'coat', 'scarf', 'gloves'],
    answer: 'dress',
    answerTranslation: L('dress예요.', 'dress.', 'Dress.', 'Dress.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'clothes'],
  },

  en_s2u5_n5_049_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '형용사와 알맞은 부사를 연결하세요.',
      'Sifatlarni mos ravishlar bilan bog‘lang.',
      'Match the adjectives with the correct adverbs.',
      'Соедините прилагательные с правильными наречиями.',
    ),
    pairs: [
      {
        text: 'bad',
        native: 'badly',
        nativeI18n: L('badly', 'badly', 'badly', 'badly'),
      },
      {
        text: 'careful',
        native: 'carefully',
        nativeI18n: L('carefully', 'carefully', 'carefully', 'carefully'),
      },
      {
        text: 'good',
        native: 'well',
        nativeI18n: L('well', 'well', 'well', 'well'),
      },
      {
        text: 'quick',
        native: 'quickly',
        nativeI18n: L('quickly', 'quickly', 'quickly', 'quickly'),
      },
      {
        text: 'slow',
        native: 'slowly',
        nativeI18n: L('slowly', 'slowly', 'slowly', 'slowly'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is running ___.',
    blankAnswers: ['quickly'],
    options: ['quickly', 'quick', 'well', 'careful'],
    answer: 'quickly',
    answerTranslation: L(
      '그녀는 빠르게 달리고 있어요.',
      'U tez yuguryapti.',
      'She is running quickly.',
      'Она быстро бежит.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is driving ___.',
    blankAnswers: ['carefully'],
    options: ['carefully', 'careful', 'good', 'slow'],
    answer: 'carefully',
    answerTranslation: L(
      '그는 조심스럽게 운전하고 있어요.',
      'U ehtiyotkorlik bilan mashina haydayapti.',
      'He is driving carefully.',
      'Он осторожно ведёт машину.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She is singing very ___.',
    blankAnswers: ['well'],
    options: ['well', 'good', 'careful', 'quiet'],
    answer: 'well',
    answerTranslation: L(
      '그녀는 노래를 아주 잘하고 있어요.',
      'U juda yaxshi kuylayapti.',
      'She is singing very well.',
      'Она очень хорошо поёт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They are talking ___.',
    blankAnswers: ['quietly'],
    options: ['quietly', 'quiet', 'bad', 'careful'],
    answer: 'quietly',
    answerTranslation: L(
      '그들은 조용히 이야기하고 있어요.',
      'Ular sekin gaplashyapti.',
      'They are talking quietly.',
      'Они тихо разговаривают.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He is carrying the plates ___.',
    blankAnswers: ['carefully'],
    options: ['carefully', 'careful', 'good', 'stylish'],
    answer: 'carefully',
    answerTranslation: L(
      '그는 접시를 조심스럽게 들고 있어요.',
      'U likopchalarni ehtiyotkorlik bilan ko‘tarib ketyapti.',
      'He is carrying the plates carefully.',
      'Он осторожно несёт тарелки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The adjective “good” changes to the adverb ___.',
    blankAnswers: ['well'],
    options: ['well', 'goodly', 'good', 'betterly'],
    answer: 'well',
    answerTranslation: L(
      'good의 부사형은 well이에요.',
      'good ning ravish shakli well.',
      'The adjective good changes to the adverb well.',
      'Прилагательное good превращается в наречие well.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'is', 'running', 'quickly'],
    answer: 'She is running quickly',
    audioText: 'She is running quickly.',
    answerTranslation: L(
      '그녀는 빠르게 달리고 있어요.',
      'U tez yuguryapti.',
      'She is running quickly.',
      'Она быстро бежит.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['He', 'is', 'driving', 'carefully'],
    answer: 'He is driving carefully',
    answerTranslation: L(
      '그는 조심스럽게 운전하고 있어요.',
      'U ehtiyotkorlik bilan mashina haydayapti.',
      'He is driving carefully.',
      'Он осторожно ведёт машину.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She is singing very well.',
    audioText: 'She is singing very well.',
    answerI18n: L(
      '그녀는 노래를 아주 잘하고 있어요',
      'U juda yaxshi kuylayapti',
      'She is singing very well',
      'Она очень хорошо поёт',
    ),
    options: ['She', 'is', 'singing', 'very', 'well.'],
    optionsI18n: {
      ko: ['그녀는', '노래를', '아주', '잘하고', '있어요'],
      uz: ['U', 'juda', 'yaxshi', 'kuylayapti'],
      en: ['She', 'is', 'singing', 'very', 'well.'],
      ru: ['Она', 'очень', 'хорошо', 'поёт'],
    },
    answerTranslation: L(
      '그녀는 노래를 아주 잘하고 있어요.',
      'U juda yaxshi kuylayapti.',
      'She is singing very well.',
      'Она очень хорошо поёт.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit5-review', 'adverbs'],
  },

  en_s2u5_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I usually shop online, but I sometimes go to the sales and shopping centres.',
    audioText:
      'I usually shop online, but I sometimes go to the sales and shopping centres.',
    answerTranslation: L(
      '저는 보통 온라인으로 쇼핑하지만 가끔 세일이나 쇼핑센터에 가요.',
      'Men odatda onlayn xarid qilaman, lekin ba’zan chegirmali savdo va savdo markazlariga boraman.',
      'I usually shop online, but I sometimes go to the sales and shopping centres.',
      'Обычно я покупаю онлайн, но иногда хожу на распродажи и в торговые центры.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review', 'shopping'],
  },

  en_s2u5_n5_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Unit 5 vocabulary includes shopping, clothes, accessories and adverbs that describe actions.',
    audioText:
      'Unit 5 vocabulary includes shopping, clothes, accessories and adverbs that describe actions.',
    answerTranslation: L(
      'Unit 5 어휘에는 쇼핑, 옷, 액세서리와 행동을 설명하는 부사가 포함돼요.',
      'Unit 5 lug‘atiga xarid, kiyim, aksessuarlar va harakatni tasvirlaydigan ravishlar kiradi.',
      'Unit 5 vocabulary includes shopping, clothes, accessories and adverbs that describe actions.',
      'Лексика Unit 5 включает покупки, одежду, аксессуары и наречия.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review'],
  },

  // ===========================================================
  // Lesson 4 · Speaking in a shop & final review
  // ===========================================================

  en_s2u5_n5_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Can I ___ this on?',
    blankAnswers: ['try'],
    options: ['try', 'trying', 'tried', 'tries'],
    answer: 'try',
    answerTranslation: L(
      '이것을 입어 봐도 될까요?',
      'Buni kiyib ko‘rsam bo‘ladimi?',
      'Can I try this on?',
      'Можно это примерить?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How ___ is it?',
    blankAnswers: ['much'],
    options: ['much', 'many', 'size', 'price'],
    answer: 'much',
    answerTranslation: L(
      '얼마인가요?',
      'Qancha turadi?',
      'How much is it?',
      'Сколько это стоит?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you ___ a student discount?',
    blankAnswers: ['offer'],
    options: ['offer', 'wear', 'carry', 'returning'],
    answer: 'offer',
    answerTranslation: L(
      '학생 할인이 있나요?',
      'Talabalar uchun chegirma bormi?',
      'Do you offer a student discount?',
      'У вас есть скидка для студентов?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What time do you ___?',
    blankAnswers: ['close'],
    options: ['close', 'closed', 'closing', 'closes'],
    answer: 'close',
    answerTranslation: L(
      '몇 시에 문을 닫나요?',
      'Soat nechada yopilasiz?',
      'What time do you close?',
      'Во сколько вы закрываетесь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_065_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I bought this shirt, but it’s the wrong size.',
      },
    ],
    options: [
      'Would you like a smaller or bigger size?',
      'What time do you close?',
      'It is singing well.',
      'The market is vintage.',
    ],
    answer: 'Would you like a smaller or bigger size?',
    answerTranslation: L(
      '더 작은 사이즈나 큰 사이즈로 바꾸시겠어요?',
      'Kichikroq yoki kattaroq o‘lcham kerakmi?',
      'Would you like a smaller or bigger size?',
      'Хотите размер меньше или больше?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’d like to return this shirt.',
      },
    ],
    options: [
      'Do you have the receipt?',
      'Are you singing?',
      'Can you drive?',
      'Is it vintage fashion?',
    ],
    answer: 'Do you have the receipt?',
    answerTranslation: L(
      '영수증이 있으세요?',
      'Chekingiz bormi?',
      'Do you have the receipt?',
      'У вас есть чек?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_067_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'I’m looking for some cheap trainers.',
      },
    ],
    options: [
      'What colour and size do you need?',
      'Could you sing as a child?',
      'They are running quickly.',
      'The baker’s sells bread.',
    ],
    answer: 'What colour and size do you need?',
    answerTranslation: L(
      '어떤 색과 사이즈가 필요하세요?',
      'Qaysi rang va o‘lcham kerak?',
      'What colour and size do you need?',
      'Какой цвет и размер вам нужны?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can I pay by credit card?',
      },
    ],
    options: [
      'Yes, of course.',
      'A medium size.',
      'I am wearing jeans.',
      'She runs quickly.',
    ],
    answer: 'Yes, of course.',
    answerTranslation: L(
      '네, 물론이죠.',
      'Ha, albatta.',
      'Yes, of course.',
      'Да, конечно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Would you like a bag?',
      },
    ],
    options: [
      'Yes, please.',
      'Yes, I could.',
      'It is stylishly.',
      'At the baker’s.',
    ],
    answer: 'Yes, please.',
    answerTranslation: L(
      '네, 주세요.',
      'Ha, iltimos.',
      'Yes, please.',
      'Да, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Would you like a receipt?',
      },
    ],
    options: [
      'Yes, please.',
      'A pair of jeans.',
      'No, I couldn’t yesterday.',
      'It runs carefully.',
    ],
    answer: 'Yes, please.',
    answerTranslation: L(
      '네, 주세요.',
      'Ha, iltimos.',
      'Yes, please.',
      'Да, пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'A customer wants to ___ a shirt because it is the wrong size.',
    blankAnswers: ['return'],
    options: ['return', 'sing', 'drive', 'wearing'],
    answer: 'return',
    answerTranslation: L(
      '손님은 셔츠 사이즈가 맞지 않아 반품하고 싶어 해요.',
      'Mijoz ko‘ylak o‘lchami noto‘g‘ri bo‘lgani uchun uni qaytarmoqchi.',
      'A customer wants to return a shirt because it is the wrong size.',
      'Покупатель хочет вернуть рубашку, потому что размер не подходит.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The shop assistant needs to know the colour and the ___.',
    blankAnswers: ['size'],
    options: ['size', 'receipt', 'fashion', 'stall'],
    answer: 'size',
    answerTranslation: L(
      '점원은 색과 사이즈를 알아야 해요.',
      'Sotuvchi rang va o‘lchamni bilishi kerak.',
      'The shop assistant needs to know the colour and the size.',
      'Продавцу нужно знать цвет и размер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_073_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Do', 'you', 'have', 'the', 'receipt'],
    answer: 'Do you have the receipt',
    audioText: 'Do you have the receipt?',
    answerTranslation: L(
      '영수증이 있으세요?',
      'Chekingiz bormi?',
      'Do you have the receipt?',
      'У вас есть чек?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'colour', 'and', 'size', 'do', 'you', 'need'],
    answer: 'What colour and size do you need',
    answerTranslation: L(
      '어떤 색과 사이즈가 필요하세요?',
      'Qaysi rang va o‘lcham kerak?',
      'What colour and size do you need?',
      'Какой цвет и размер вам нужны?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_075_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'I would like to return this shirt.',
    audioText: 'I would like to return this shirt.',
    answerI18n: L(
      '이 셔츠를 반품하고 싶어요',
      'Bu ko‘ylakni qaytarmoqchiman',
      'I would like to return this shirt',
      'Я хотел бы вернуть эту рубашку',
    ),
    options: ['I', 'would', 'like', 'to', 'return', 'this', 'shirt.'],
    optionsI18n: {
      ko: ['이', '셔츠를', '반품하고', '싶어요'],
      uz: ['Bu', 'ko‘ylakni', 'qaytarmoqchiman'],
      en: ['I', 'would', 'like', 'to', 'return', 'this', 'shirt.'],
      ru: ['Я', 'хотел', 'бы', 'вернуть', 'эту', 'рубашку'],
    },
    answerTranslation: L(
      '이 셔츠를 반품하고 싶어요.',
      'Bu ko‘ylakni qaytarmoqchiman.',
      'I would like to return this shirt.',
      'Я хотел бы вернуть эту рубашку.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_076_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Excuse me. I’d like to return this shirt because it is the wrong size.',
    audioText:
      'Excuse me. I’d like to return this shirt because it is the wrong size.',
    answerTranslation: L(
      '실례합니다. 이 셔츠의 사이즈가 맞지 않아서 반품하고 싶어요.',
      'Kechirasiz. Bu ko‘ylakning o‘lchami noto‘g‘ri, shuning uchun uni qaytarmoqchiman.',
      'Excuse me. I’d like to return this shirt because it is the wrong size.',
      'Извините. Я хотел бы вернуть эту рубашку, потому что размер не подходит.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m looking for some cheap trainers. Do you have them in black?',
    audioText:
      'I’m looking for some cheap trainers. Do you have them in black?',
    answerTranslation: L(
      '저렴한 운동화를 찾고 있어요. 검은색이 있나요?',
      'Arzon krossovka qidiryapman. Qora ranglisi bormi?',
      'I’m looking for some cheap trainers. Do you have them in black?',
      'Я ищу недорогие кроссовки. У вас есть чёрные?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I try these on, please? What size do you need?',
    audioText: 'Can I try these on, please? What size do you need?',
    answerTranslation: L(
      '이것들을 신어 봐도 될까요? 어떤 사이즈가 필요하세요?',
      'Bularni kiyib ko‘rsam bo‘ladimi? Qaysi o‘lcham kerak?',
      'Can I try these on, please? What size do you need?',
      'Можно их примерить? Какой размер вам нужен?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5-review', 'shop'],
  },

  en_s2u5_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Unit 5 teaches shopping vocabulary, clothes, can and could, the present continuous, adverbs and useful shop conversations.',
    audioText:
      'Unit 5 teaches shopping vocabulary, clothes, can and could, the present continuous, adverbs and useful shop conversations.',
    answerTranslation: L(
      'Unit 5에서는 쇼핑 어휘, 옷, can과 could, 현재진행형, 부사와 가게에서 사용하는 대화를 배워요.',
      'Unit 5 da xarid lug‘ati, kiyimlar, can va could, present continuous, ravishlar va do‘kondagi suhbatlarni o‘rganamiz.',
      'Unit 5 teaches shopping vocabulary, clothes, can and could, the present continuous, adverbs and useful shop conversations.',
      'В Unit 5 изучаются покупки, одежда, can и could, present continuous, наречия и разговоры в магазине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5', 'review'],
  },

  en_s2u5_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I can now talk about shopping, describe what people are wearing and doing, and communicate with a shop assistant.',
    audioText:
      'I can now talk about shopping, describe what people are wearing and doing, and communicate with a shop assistant.',
    answerTranslation: L(
      '이제 쇼핑에 대해 말하고, 사람들이 무엇을 입고 무엇을 하고 있는지 설명하며, 점원과 대화할 수 있어요.',
      'Endi xarid haqida gapira olaman, odamlarning nima kiyganini va nima qilayotganini tasvirlay olaman hamda sotuvchi bilan gaplasha olaman.',
      'I can now talk about shopping, describe what people are wearing and doing, and communicate with a shop assistant.',
      'Теперь я могу говорить о покупках, описывать одежду и действия людей и общаться с продавцом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit5', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT5_NODE5 = {
  title: L(
    'Camden Market와 Unit 5 복습',
    'Camden Market va Unit 5 takrori',
    'Camden Market and Unit 5 review',
    'Camden Market и повторение Unit 5',
  ),
  section: 2,
  unit: 5,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        'Camden Market',
        'Camden Market',
        'Camden Market',
        'Camden Market',
      ),
      description: L(
        'stall, vintage, fashion, stylish와 쇼핑 장소를 비교할 때 사용하는 choice, payment, price 등의 어휘를 익혀요.',
        'stall, vintage, fashion, stylish hamda xarid joylarini taqqoslash uchun choice, payment va price so‘zlarini o‘rganasiz.',
        'Learn the key Camden Market vocabulary and language for comparing places to shop.',
        'Изучаем лексику Camden Market и слова для сравнения мест покупок.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u5_n5_001_word_matching',
        'en_s2u5_n5_002_fill_in_blank',
        'en_s2u5_n5_003_fill_in_blank',
        'en_s2u5_n5_004_fill_in_blank',
        'en_s2u5_n5_005_fill_in_blank',
        'en_s2u5_n5_006_fill_in_blank',
        'en_s2u5_n5_007_fill_in_blank',
        'en_s2u5_n5_008_word_matching',
        'en_s2u5_n5_009_fill_in_blank',
        'en_s2u5_n5_010_fill_in_blank',
        'en_s2u5_n5_011_fill_in_blank',
        'en_s2u5_n5_012_fill_in_blank',
        'en_s2u5_n5_013_fill_in_blank',
        'en_s2u5_n5_014_dialog_complete',
        'en_s2u5_n5_015_dialog_complete',
        'en_s2u5_n5_016_word_arrange',
        'en_s2u5_n5_017_translate_builder',
        'en_s2u5_n5_018_sentence_builder',
        'en_s2u5_n5_019_speaking',
        'en_s2u5_n5_020_speaking',
      ],
    },

    {
      title: L(
        'can/could와 현재진행형 복습',
        'can/could va present continuous takrori',
        'Can, could and present continuous review',
        'Повторение can, could и present continuous',
      ),
      description: L(
        '현재와 과거의 능력을 can/could로 비교하고 지금 일어나는 행동을 현재진행형으로 다시 연습해요.',
        'Hozirgi va o‘tgan qobiliyatni can/could bilan taqqoslab, hozirgi harakatlarni present continuous bilan takrorlaysiz.',
        'Review ability with can and could and actions happening now with the present continuous.',
        'Повторяем способности с can/could и текущие действия с present continuous.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s2u5_n5_021_fill_in_blank',
        'en_s2u5_n5_022_fill_in_blank',
        'en_s2u5_n5_023_fill_in_blank',
        'en_s2u5_n5_024_fill_in_blank',
        'en_s2u5_n5_025_fill_in_blank',
        'en_s2u5_n5_026_fill_in_blank',
        'en_s2u5_n5_027_fill_in_blank',
        'en_s2u5_n5_028_fill_in_blank',
        'en_s2u5_n5_029_fill_in_blank',
        'en_s2u5_n5_030_fill_in_blank',
        'en_s2u5_n5_031_dialog_complete',
        'en_s2u5_n5_032_dialog_complete',
        'en_s2u5_n5_033_fill_in_blank',
        'en_s2u5_n5_034_fill_in_blank',
        'en_s2u5_n5_035_word_arrange',
        'en_s2u5_n5_036_translate_builder',
        'en_s2u5_n5_037_sentence_builder',
        'en_s2u5_n5_038_speaking',
        'en_s2u5_n5_039_speaking',
        'en_s2u5_n5_040_speaking',
      ],
    },

    {
      title: L(
        '쇼핑·옷·부사 복습',
        'Xarid, kiyim va ravishlar takrori',
        'Shopping, clothes and adverbs review',
        'Повторение покупок, одежды и наречий',
      ),
      description: L(
        'baker’s, sales, discount, return 같은 쇼핑 어휘와 옷·액세서리, 형용사에서 부사 만들기를 종합 복습해요.',
        'baker’s, sales, discount va return kabi xarid so‘zlari, kiyimlar va sifatdan ravish yasashni takrorlaysiz.',
        'Review shopping vocabulary, clothes and accessories, and adjective-to-adverb forms.',
        'Повторяем лексику покупок, одежду, аксессуары и образование наречий.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u5_n5_041_word_matching',
        'en_s2u5_n5_042_fill_in_blank',
        'en_s2u5_n5_043_fill_in_blank',
        'en_s2u5_n5_044_fill_in_blank',
        'en_s2u5_n5_045_dialog_complete',
        'en_s2u5_n5_046_dialog_complete',
        'en_s2u5_n5_047_dialog_complete',
        'en_s2u5_n5_048_dialog_complete',
        'en_s2u5_n5_049_word_matching',
        'en_s2u5_n5_050_fill_in_blank',
        'en_s2u5_n5_051_fill_in_blank',
        'en_s2u5_n5_052_fill_in_blank',
        'en_s2u5_n5_053_fill_in_blank',
        'en_s2u5_n5_054_fill_in_blank',
        'en_s2u5_n5_055_fill_in_blank',
        'en_s2u5_n5_056_word_arrange',
        'en_s2u5_n5_057_translate_builder',
        'en_s2u5_n5_058_sentence_builder',
        'en_s2u5_n5_059_speaking',
        'en_s2u5_n5_060_speaking',
      ],
    },

    {
      title: L(
        '가게 대화와 Unit 5 마무리',
        'Do‘kon suhbati va Unit 5 yakuni',
        'Shop conversations and Unit 5 final review',
        'Разговоры в магазине и итог Unit 5',
      ),
      description: L(
        '상품 입어 보기, 가격·할인·영수증·사이즈 묻기와 반품 상황을 연습하면서 Unit 5 전체를 마무리해요.',
        'Kiyimni kiyib ko‘rish, narx, chegirma, chek va o‘lchamni so‘rash hamda mahsulotni qaytarish vaziyatlari bilan Unit 5 ni yakunlaysiz.',
        'Finish Unit 5 by practising shop questions, sizes, payment and returns.',
        'Завершаем Unit 5 диалогами о размере, оплате, примерке и возврате.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u5_n5_061_fill_in_blank',
        'en_s2u5_n5_062_fill_in_blank',
        'en_s2u5_n5_063_fill_in_blank',
        'en_s2u5_n5_064_fill_in_blank',
        'en_s2u5_n5_065_dialog_complete',
        'en_s2u5_n5_066_dialog_complete',
        'en_s2u5_n5_067_dialog_complete',
        'en_s2u5_n5_068_dialog_complete',
        'en_s2u5_n5_069_dialog_complete',
        'en_s2u5_n5_070_dialog_complete',
        'en_s2u5_n5_071_fill_in_blank',
        'en_s2u5_n5_072_fill_in_blank',
        'en_s2u5_n5_073_word_arrange',
        'en_s2u5_n5_074_translate_builder',
        'en_s2u5_n5_075_sentence_builder',
        'en_s2u5_n5_076_speaking',
        'en_s2u5_n5_077_speaking',
        'en_s2u5_n5_078_speaking',
        'en_s2u5_n5_079_speaking',
        'en_s2u5_n5_080_speaking',
      ],
    },
  ],
};
