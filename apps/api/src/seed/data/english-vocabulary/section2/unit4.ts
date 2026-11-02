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
// Section 2 · Unit 4 · Node 1
// 4.1 Underground towns
//
// Coverage
// - places in towns and cities
// - airport / campsite / chemist / cinema
// - hairdresser's / hotel / library / museum
// - railway station / restaurant / school
// - shop / supermarket / swimming pool
// - theatre / tourist information centre
// - road / mine / underground
//
// Reading:
// - Coober Pedy
// - Lightning Ridge
// - opal mining towns
// - underground buildings
//
// Pronunciation:
// - word stress
//
// Grammar:
// - there is / there's
// - there are
// - there isn't
// - there aren't
// - Is there ...?
// - Are there ...?
// - a/an + singular
// - some + plural
// - any + plural
//
// Existing word reused:
// - hospital
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE1_WORDS = [
  {
    code: 'en-place-airport',
    english: 'airport',
    senseKey: 'place-where-aircraft-arrive-and-leave',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '공항',
      'aeroport',
      'a place where aircraft arrive and leave',
      'аэропорт',
    ),
    examples: [
      {
        english: 'There is an airport near the town.',
        translations: L(
          '마을 근처에 공항이 있어요.',
          'Shahar yaqinida aeroport bor.',
          'There is an airport near the town.',
          'Рядом с городом есть аэропорт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈeəpɔːt/',
      ttsText: 'airport',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-campsite',
    english: 'campsite',
    senseKey: 'place-for-camping',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '캠핑장',
      'lager joyi',
      'a place where people can stay in tents',
      'кемпинг',
    ),
    examples: [
      {
        english: 'There is a campsite near the town.',
        translations: L(
          '마을 근처에 캠핑장이 있어요.',
          'Shahar yaqinida lager joyi bor.',
          'There is a campsite near the town.',
          'Рядом с городом есть кемпинг.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkæmpsaɪt/',
      ttsText: 'campsite',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-chemist',
    english: 'chemist',
    senseKey: 'shop-selling-medicines',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '약국',
      'dorixona',
      'a shop where medicines and health products are sold',
      'аптека',
    ),
    examples: [
      {
        english: 'There is a chemist in the town.',
        translations: L(
          '마을에 약국이 있어요.',
          'Shaharda dorixona bor.',
          'There is a chemist in the town.',
          'В городе есть аптека.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkemɪst/',
      ttsText: 'chemist',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-cinema',
    english: 'cinema',
    senseKey: 'place-for-watching-films',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '영화관',
      'kinoteatr',
      'a place where people go to watch films',
      'кинотеатр',
    ),
    examples: [
      {
        english: 'Is there a cinema in the town?',
        translations: L(
          '마을에 영화관이 있나요?',
          'Shaharda kinoteatr bormi?',
          'Is there a cinema in the town?',
          'В городе есть кинотеатр?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪnəmə/',
      ttsText: 'cinema',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-hairdressers',
    english: "hairdresser's",
    senseKey: 'place-where-hairdresser-works',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '미용실',
      'sartaroshxona',
      'a place where a hairdresser works',
      'парикмахерская',
    ),
    examples: [
      {
        english: "There is a hairdresser's near the chemist.",
        translations: L(
          '약국 근처에 미용실이 있어요.',
          'Dorixona yaqinida sartaroshxona bor.',
          "There is a hairdresser's near the chemist.",
          'Рядом с аптекой есть парикмахерская.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈheədresəz/',
      ttsText: "hairdresser's",
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-hotel',
    english: 'hotel',
    senseKey: 'place-where-travellers-stay',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '호텔',
      'mehmonxona',
      'a place where people pay to stay when travelling',
      'отель',
    ),
    examples: [
      {
        english: 'There are hotels in Coober Pedy.',
        translations: L(
          'Coober Pedy에는 호텔들이 있어요.',
          'Coober Pedyda mehmonxonalar bor.',
          'There are hotels in Coober Pedy.',
          'В Кубер-Педи есть отели.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/həʊˈtel/',
      ttsText: 'hotel',
    },
    tags: ['places', 'travel', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-library',
    english: 'library',
    senseKey: 'place-for-borrowing-books',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도서관',
      'kutubxona',
      'a place where people can read or borrow books',
      'библиотека',
    ),
    examples: [
      {
        english: 'There is a library in the town.',
        translations: L(
          '마을에 도서관이 있어요.',
          'Shaharda kutubxona bor.',
          'There is a library in the town.',
          'В городе есть библиотека.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlaɪbrəri/',
      ttsText: 'library',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-museum',
    english: 'museum',
    senseKey: 'place-showing-historical-or-cultural-objects',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '박물관',
      'muzey',
      'a place where historical, scientific or cultural objects are shown',
      'музей',
    ),
    examples: [
      {
        english: 'There is a museum about the history of the town.',
        translations: L(
          '마을의 역사에 관한 박물관이 있어요.',
          'Shahar tarixi haqida muzey bor.',
          'There is a museum about the history of the town.',
          'Есть музей об истории города.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/mjuˈziːəm/',
      ttsText: 'museum',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-railway-station',
    english: 'railway station',
    senseKey: 'place-where-trains-arrive-and-leave',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기차역',
      'temir yo‘l vokzali',
      'a place where trains arrive and leave',
      'железнодорожный вокзал',
    ),
    examples: [
      {
        english: 'There is not a railway station near the town.',
        translations: L(
          '마을 근처에는 기차역이 없어요.',
          'Shahar yaqinida temir yo‘l vokzali yo‘q.',
          'There is not a railway station near the town.',
          'Рядом с городом нет железнодорожной станции.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈreɪlweɪ ˌsteɪʃən/',
      ttsText: 'railway station',
    },
    tags: ['places', 'transport', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-restaurant',
    english: 'restaurant',
    senseKey: 'place-serving-meals',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '식당',
      'restoran',
      'a place where people pay to eat meals',
      'ресторан',
    ),
    examples: [
      {
        english: 'There are restaurants in the town.',
        translations: L(
          '마을에 식당들이 있어요.',
          'Shaharda restoranlar bor.',
          'There are restaurants in the town.',
          'В городе есть рестораны.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈrestrɒnt/',
      ttsText: 'restaurant',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-school',
    english: 'school',
    senseKey: 'place-where-children-study',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('학교', 'maktab', 'a place where children study', 'школа'),
    examples: [
      {
        english: 'There is a school in Lightning Ridge.',
        translations: L(
          'Lightning Ridge에는 학교가 있어요.',
          'Lightning Ridgeda maktab bor.',
          'There is a school in Lightning Ridge.',
          'В Лайтнинг-Ридже есть школа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skuːl/',
      ttsText: 'school',
    },
    tags: ['places', 'education', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-shop',
    english: 'shop',
    senseKey: 'place-where-things-are-sold',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('가게', 'do‘kon', 'a place where things are sold', 'магазин'),
    examples: [
      {
        english: 'There are shops in the town.',
        translations: L(
          '마을에 가게들이 있어요.',
          'Shaharda do‘konlar bor.',
          'There are shops in the town.',
          'В городе есть магазины.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃɒp/',
      ttsText: 'shop',
    },
    tags: ['places', 'town', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-supermarket',
    english: 'supermarket',
    senseKey: 'large-self-service-food-shop',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '슈퍼마켓',
      'supermarket',
      'a large shop that sells food and everyday products',
      'супермаркет',
    ),
    examples: [
      {
        english: 'There is a supermarket in the village.',
        translations: L(
          '마을에 슈퍼마켓이 있어요.',
          'Qishloqda supermarket bor.',
          'There is a supermarket in the village.',
          'В деревне есть супермаркет.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsuːpəmɑːkɪt/',
      ttsText: 'supermarket',
    },
    tags: ['places', 'shopping', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-swimming-pool',
    english: 'swimming pool',
    senseKey: 'place-for-swimming',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '수영장',
      'suzish havzasi',
      'a place built for people to swim in',
      'бассейн',
    ),
    examples: [
      {
        english: 'There is a swimming pool in the town.',
        translations: L(
          '마을에 수영장이 있어요.',
          'Shaharda suzish havzasi bor.',
          'There is a swimming pool in the town.',
          'В городе есть бассейн.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈswɪmɪŋ ˌpuːl/',
      ttsText: 'swimming pool',
    },
    tags: ['places', 'sport', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-theatre',
    english: 'theatre',
    senseKey: 'place-for-plays-and-performances',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '극장',
      'teatr',
      'a place where people watch plays and performances',
      'театр',
    ),
    examples: [
      {
        english: 'There is a theatre in Lightning Ridge.',
        translations: L(
          'Lightning Ridge에는 극장이 있어요.',
          'Lightning Ridgeda teatr bor.',
          'There is a theatre in Lightning Ridge.',
          'В Лайтнинг-Ридже есть театр.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈθɪətə/',
      ttsText: 'theatre',
    },
    tags: ['places', 'entertainment', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-tourist-information-centre',
    english: 'tourist information centre',
    senseKey: 'place-giving-information-to-visitors',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '관광 안내소',
      'turist axborot markazi',
      'a place where visitors can get information about an area',
      'туристический информационный центр',
    ),
    examples: [
      {
        english: 'There is a tourist information centre.',
        translations: L(
          '관광 안내소가 있어요.',
          'Turist axborot markazi bor.',
          'There is a tourist information centre.',
          'Есть туристический информационный центр.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʊərɪst ˌɪnfəˈmeɪʃən ˌsentə/',
      ttsText: 'tourist information centre',
    },
    tags: ['places', 'tourism', 'unit4'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-road',
    english: 'road',
    senseKey: 'route-for-cars-and-other-vehicles',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '도로',
      'yo‘l',
      'a route that cars and other vehicles travel on',
      'дорога',
    ),
    examples: [
      {
        english: 'The roads are good.',
        translations: L(
          '도로가 좋아요.',
          'Yo‘llar yaxshi.',
          'The roads are good.',
          'Дороги хорошие.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/rəʊd/',
      ttsText: 'road',
    },
    tags: ['transport', 'town', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-mine',
    english: 'mine',
    senseKey: 'place-where-material-is-taken-from-ground',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '광산',
      'kon',
      'a place where minerals are taken from under the ground',
      'шахта',
    ),
    examples: [
      {
        english: 'People work in the opal mines.',
        translations: L(
          '사람들은 오팔 광산에서 일해요.',
          'Odamlar opal konlarida ishlaydi.',
          'People work in the opal mines.',
          'Люди работают на опаловых шахтах.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/maɪn/',
      ttsText: 'mine',
    },
    tags: ['town', 'underground', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adjective-underground',
    english: 'underground',
    senseKey: 'below-surface-of-ground',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '지하의',
      'yer ostidagi',
      'below the surface of the ground',
      'подземный',
    ),
    examples: [
      {
        english: 'There are underground houses.',
        translations: L(
          '지하 주택들이 있어요.',
          'Yer ostidagi uylar bor.',
          'There are underground houses.',
          'Есть подземные дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌʌndəˈɡraʊnd/',
      ttsText: 'underground',
    },
    tags: ['places', 'description', 'unit4'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT4_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Places in towns and cities
  // ===========================================================

  en_s2u4_n1_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'chemist',
        native: 'dorixona',
        nativeI18n: L('약국', 'dorixona', 'chemist', 'аптека'),
      },
      {
        text: 'cinema',
        native: 'kinoteatr',
        nativeI18n: L('영화관', 'kinoteatr', 'cinema', 'кинотеатр'),
      },
      {
        text: "hairdresser's",
        native: 'sartaroshxona',
        nativeI18n: L(
          '미용실',
          'sartaroshxona',
          "hairdresser's",
          'парикмахерская',
        ),
      },
      {
        text: 'library',
        native: 'kutubxona',
        nativeI18n: L('도서관', 'kutubxona', 'library', 'библиотека'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places'],
  },

  en_s2u4_n1_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'museum',
        native: 'muzey',
        nativeI18n: L('박물관', 'muzey', 'museum', 'музей'),
      },
      {
        text: 'restaurant',
        native: 'restoran',
        nativeI18n: L('식당', 'restoran', 'restaurant', 'ресторан'),
      },
      {
        text: 'swimming pool',
        native: 'suzish havzasi',
        nativeI18n: L('수영장', 'suzish havzasi', 'swimming pool', 'бассейн'),
      },
      {
        text: 'theatre',
        native: 'teatr',
        nativeI18n: L('극장', 'teatr', 'theatre', 'театр'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places'],
  },

  en_s2u4_n1_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'airport',
        native: 'aeroport',
        nativeI18n: L('공항', 'aeroport', 'airport', 'аэропорт'),
      },
      {
        text: 'railway station',
        native: 'temir yo‘l vokzali',
        nativeI18n: L(
          '기차역',
          'temir yo‘l vokzali',
          'railway station',
          'железнодорожный вокзал',
        ),
      },
      {
        text: 'campsite',
        native: 'lager joyi',
        nativeI18n: L('캠핑장', 'lager joyi', 'campsite', 'кемпинг'),
      },
      {
        text: 'tourist information centre',
        native: 'turist axborot markazi',
        nativeI18n: L(
          '관광 안내소',
          'turist axborot markazi',
          'tourist information centre',
          'туристический информационный центр',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['places', 'tourism'],
  },

  en_s2u4_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can borrow books from a ___.',
    blankAnswers: ['library'],
    options: ['library', 'chemist', 'cinema', 'restaurant'],
    answer: 'library',
    answerTranslation: L(
      '도서관에서 책을 빌릴 수 있어요.',
      'Kutubxonadan kitob olishingiz mumkin.',
      'You can borrow books from a library.',
      'В библиотеке можно брать книги.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'library'],
  },

  en_s2u4_n1_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can watch films at a ___.',
    blankAnswers: ['cinema'],
    options: ['cinema', 'chemist', 'library', 'campsite'],
    answer: 'cinema',
    answerTranslation: L(
      '영화관에서 영화를 볼 수 있어요.',
      'Kinoteatrda film tomosha qilishingiz mumkin.',
      'You can watch films at a cinema.',
      'В кинотеатре можно смотреть фильмы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'cinema'],
  },

  en_s2u4_n1_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can buy medicine at a ___.',
    blankAnswers: ['chemist'],
    options: ['chemist', 'museum', 'theatre', 'airport'],
    answer: 'chemist',
    answerTranslation: L(
      '약국에서 약을 살 수 있어요.',
      'Dorixonadan dori sotib olishingiz mumkin.',
      'You can buy medicine at a chemist.',
      'Лекарство можно купить в аптеке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'chemist'],
  },

  en_s2u4_n1_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can have your hair cut at a ___.',
    blankAnswers: ["hairdresser's"],
    options: ["hairdresser's", 'museum', 'school', 'airport'],
    answer: "hairdresser's",
    answerTranslation: L(
      '미용실에서 머리를 자를 수 있어요.',
      'Sartaroshxonada sochingizni kestirishingiz mumkin.',
      "You can have your hair cut at a hairdresser's.",
      'В парикмахерской можно постричься.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['places', 'hairdressers'],
  },

  en_s2u4_n1_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can eat a meal in a ___.',
    blankAnswers: ['restaurant'],
    options: ['restaurant', 'railway station', 'museum', 'school'],
    answer: 'restaurant',
    answerTranslation: L(
      '식당에서 식사할 수 있어요.',
      'Restoranda ovqatlanishingiz mumkin.',
      'You can eat a meal in a restaurant.',
      'В ресторане можно поесть.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'restaurant'],
  },

  en_s2u4_n1_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can swim at a ___.',
    blankAnswers: ['swimming pool'],
    options: ['swimming pool', 'museum', 'railway station', 'library'],
    answer: 'swimming pool',
    answerTranslation: L(
      '수영장에서 수영할 수 있어요.',
      'Suzish havzasida suzishingiz mumkin.',
      'You can swim at a swimming pool.',
      'В бассейне можно плавать.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'swimming-pool'],
  },

  en_s2u4_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can watch a play at a ___.',
    blankAnswers: ['theatre'],
    options: ['theatre', 'airport', 'chemist', 'school'],
    answer: 'theatre',
    answerTranslation: L(
      '극장에서 공연을 볼 수 있어요.',
      'Teatrda spektakl tomosha qilishingiz mumkin.',
      'You can watch a play at a theatre.',
      'В театре можно посмотреть спектакль.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'theatre'],
  },

  en_s2u4_n1_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Visitors can get a town map at the ___.',
    blankAnswers: ['tourist information centre'],
    options: [
      'tourist information centre',
      'swimming pool',
      'chemist',
      'school',
    ],
    answer: 'tourist information centre',
    answerTranslation: L(
      '방문객은 관광 안내소에서 마을 지도를 받을 수 있어요.',
      'Sayyohlar turist axborot markazidan shahar xaritasini olishlari mumkin.',
      'Visitors can get a town map at the tourist information centre.',
      'Туристы могут получить карту города в туристическом центре.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['places', 'tourism'],
  },

  en_s2u4_n1_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Trains arrive and leave from a ___.',
    blankAnswers: ['railway station'],
    options: ['railway station', 'airport', 'library', 'restaurant'],
    answer: 'railway station',
    answerTranslation: L(
      '기차는 기차역에 도착하고 출발해요.',
      'Poyezdlar temir yo‘l vokzaliga keladi va u yerdan ketadi.',
      'Trains arrive and leave from a railway station.',
      'Поезда прибывают и отправляются с вокзала.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['places', 'transport'],
  },

  en_s2u4_n1_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Planes arrive and leave from an ___.',
    blankAnswers: ['airport'],
    options: ['airport', 'campsite', 'museum', 'library'],
    answer: 'airport',
    answerTranslation: L(
      '비행기는 공항에 도착하고 출발해요.',
      'Samolyotlar aeroportga keladi va u yerdan uchadi.',
      'Planes arrive and leave from an airport.',
      'Самолёты прибывают и отправляются из аэропорта.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'airport'],
  },

  en_s2u4_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Children learn at a ___.',
    blankAnswers: ['school'],
    options: ['school', 'restaurant', 'chemist', 'campsite'],
    answer: 'school',
    answerTranslation: L(
      '아이들은 학교에서 배워요.',
      'Bolalar maktabda o‘qiydi.',
      'Children learn at a school.',
      'Дети учатся в школе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['places', 'school'],
  },

  en_s2u4_n1_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can stay in a tent at a ___.',
    blankAnswers: ['campsite'],
    options: ['campsite', 'cinema', 'chemist', 'library'],
    answer: 'campsite',
    answerTranslation: L(
      '캠핑장에서 텐트에 묵을 수 있어요.',
      'Lager joyida chodirda qolishingiz mumkin.',
      'You can stay in a tent at a campsite.',
      'В кемпинге можно остановиться в палатке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['places', 'campsite'],
  },

  en_s2u4_n1_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['a', 'library', 'There', 'is', 'town', 'the', 'in'],
    answer: 'There is a library in the town',
    audioText: 'There is a library in the town.',
    answerTranslation: L(
      '마을에 도서관이 있어요.',
      'Shaharda kutubxona bor.',
      'There is a library in the town.',
      'В городе есть библиотека.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['places'],
  },

  en_s2u4_n1_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'are', 'shops', 'in', 'town', 'the', 'a'],
    answer: 'There are shops in the town',
    answerTranslation: L(
      '마을에 가게들이 있어요.',
      'Shaharda do‘konlar bor.',
      'There are shops in the town.',
      'В городе есть магазины.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['places'],
  },

  en_s2u4_n1_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'There is a chemist and there is a hairdresser’s.',
    audioText: 'There is a chemist and there is a hairdresser’s.',
    answerTranslation: L(
      '약국과 미용실이 있어요.',
      'Dorixona va sartaroshxona bor.',
      'There is a chemist and there is a hairdresser’s.',
      'Есть аптека и парикмахерская.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['places'],
  },

  en_s2u4_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A town can have a hospital, a school, shops, restaurants and a swimming pool.',
    audioText:
      'A town can have a hospital, a school, shops, restaurants and a swimming pool.',
    answerTranslation: L(
      '마을에는 병원, 학교, 가게, 식당과 수영장이 있을 수 있어요.',
      'Shaharda kasalxona, maktab, do‘konlar, restoranlar va suzish havzasi bo‘lishi mumkin.',
      'A town can have a hospital, a school, shops, restaurants and a swimming pool.',
      'В городе могут быть больница, школа, магазины, рестораны и бассейн.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['places', 'review'],
  },

  en_s2u4_n1_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A tourist information centre gives visitors information about a town.',
    audioText:
      'A tourist information centre gives visitors information about a town.',
    answerTranslation: L(
      '관광 안내소는 방문객에게 마을 정보를 제공해요.',
      'Turist axborot markazi sayyohlarga shahar haqida ma’lumot beradi.',
      'A tourist information centre gives visitors information about a town.',
      'Туристический центр даёт посетителям информацию о городе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['places', 'tourism'],
  },

  // ===========================================================
  // Lesson 2 · Coober Pedy and Lightning Ridge
  // ===========================================================

  en_s2u4_n1_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Coober Pedy is a small town in ___.',
    blankAnswers: ['Australia'],
    options: ['Australia', 'Canada', 'Britain', 'France'],
    answer: 'Australia',
    answerTranslation: L(
      'Coober Pedy는 호주의 작은 마을이에요.',
      'Coober Pedy Avstraliyadagi kichik shaharcha.',
      'Coober Pedy is a small town in Australia.',
      'Кубер-Педи — небольшой город в Австралии.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'reading'],
  },

  en_s2u4_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Coober Pedy is very ___.',
    blankAnswers: ['hot'],
    options: ['hot', 'cold', 'wet', 'snowy'],
    answer: 'hot',
    answerTranslation: L(
      'Coober Pedy는 매우 더워요.',
      'Coober Pedy juda issiq.',
      'Coober Pedy is very hot.',
      'В Кубер-Педи очень жарко.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'reading'],
  },

  en_s2u4_n1_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'People work in the opal ___.',
    blankAnswers: ['mines'],
    options: ['mines', 'libraries', 'cinemas', 'schools'],
    answer: 'mines',
    answerTranslation: L(
      '사람들은 오팔 광산에서 일해요.',
      'Odamlar opal konlarida ishlaydi.',
      'People work in the opal mines.',
      'Люди работают на опаловых шахтах.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'mine'],
  },

  en_s2u4_n1_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The mines are ___.',
    blankAnswers: ['underground'],
    options: [
      'underground',
      'inside a cinema',
      'at the airport',
      'in a library',
    ],
    answer: 'underground',
    answerTranslation: L(
      '광산은 지하에 있어요.',
      'Konlar yer ostida.',
      'The mines are underground.',
      'Шахты находятся под землёй.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'underground'],
  },

  en_s2u4_n1_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Many houses in Coober Pedy are ___.',
    blankAnswers: ['underground'],
    options: ['underground', 'on trains', 'in airports', 'in museums'],
    answer: 'underground',
    answerTranslation: L(
      'Coober Pedy의 많은 집은 지하에 있어요.',
      'Coober Pedydagi ko‘plab uylar yer ostida.',
      'Many houses in Coober Pedy are underground.',
      'Многие дома в Кубер-Педи находятся под землёй.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'underground'],
  },

  en_s2u4_n1_026_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Why do people live underground in Coober Pedy?',
      },
    ],
    options: [
      'Because it is cooler underground.',
      'Because there are no houses.',
      'Because they work at the airport.',
      'Because the town is very cold.',
    ],
    answer: 'Because it is cooler underground.',
    answerTranslation: L(
      '지하가 더 시원하기 때문이에요.',
      'Chunki yer osti salqinroq.',
      'Because it is cooler underground.',
      'Потому что под землёй прохладнее.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['coober-pedy', 'reading'],
  },

  en_s2u4_n1_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are underground shops and ___.',
    blankAnswers: ['restaurants'],
    options: ['restaurants', 'airports', 'schools', 'railway stations'],
    answer: 'restaurants',
    answerTranslation: L(
      '지하 가게와 식당이 있어요.',
      'Yer ostida do‘konlar va restoranlar bor.',
      'There are underground shops and restaurants.',
      'Под землёй есть магазины и рестораны.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'reading'],
  },

  en_s2u4_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is also an underground ___.',
    blankAnswers: ['swimming pool'],
    options: ['swimming pool', 'airport', 'railway station', 'school'],
    answer: 'swimming pool',
    answerTranslation: L(
      '지하 수영장도 있어요.',
      'Yer ostida suzish havzasi ham bor.',
      'There is also an underground swimming pool.',
      'Есть также подземный бассейн.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'reading'],
  },

  en_s2u4_n1_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Tourists visit the underground ___.',
    blankAnswers: ['buildings'],
    options: ['buildings', 'planes', 'trains', 'roads'],
    answer: 'buildings',
    answerTranslation: L(
      '관광객들은 지하 건물들을 방문해요.',
      'Sayyohlar yer ostidagi binolarni ko‘radi.',
      'Tourists visit the underground buildings.',
      'Туристы посещают подземные здания.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['coober-pedy', 'tourism'],
  },

  en_s2u4_n1_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Visitors can stay at hotels or at a ___.',
    blankAnswers: ['campsite'],
    options: ['campsite', 'chemist', 'library', 'mine'],
    answer: 'campsite',
    answerTranslation: L(
      '방문객들은 호텔이나 캠핑장에서 묵을 수 있어요.',
      'Sayyohlar mehmonxona yoki lager joyida qolishlari mumkin.',
      'Visitors can stay at hotels or at a campsite.',
      'Посетители могут остановиться в отеле или кемпинге.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'tourism'],
  },

  en_s2u4_n1_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a ___ about the history of Coober Pedy.',
    blankAnswers: ['museum'],
    options: ['museum', 'chemist', 'school', 'campsite'],
    answer: 'museum',
    answerTranslation: L(
      'Coober Pedy의 역사에 관한 박물관이 있어요.',
      'Coober Pedy tarixi haqida muzey bor.',
      'There is a museum about the history of Coober Pedy.',
      'Есть музей об истории Кубер-Педи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'museum'],
  },

  en_s2u4_n1_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a tourist information ___.',
    blankAnswers: ['centre'],
    options: ['centre', 'mine', 'road', 'pool'],
    answer: 'centre',
    answerTranslation: L(
      '관광 안내소가 있어요.',
      'Turist axborot markazi bor.',
      'There is a tourist information centre.',
      'Есть туристический информационный центр.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'tourism'],
  },

  en_s2u4_n1_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Coober Pedy has an ___.',
    blankAnswers: ['airport'],
    options: ['airport', 'railway station', 'cinema', 'school'],
    answer: 'airport',
    answerTranslation: L(
      'Coober Pedy에는 공항이 있어요.',
      'Coober Pedyda aeroport bor.',
      'Coober Pedy has an airport.',
      'В Кубер-Педи есть аэропорт.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['coober-pedy', 'airport'],
  },

  en_s2u4_n1_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is there a railway station in Coober Pedy?' },
    ],
    options: [
      'No, there isn’t.',
      'Yes, there are.',
      'No, there aren’t.',
      'Yes, it does.',
    ],
    answer: 'No, there isn’t.',
    answerTranslation: L(
      '아니요, 없어요.',
      'Yo‘q.',
      'No, there isn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['coober-pedy', 'there-is'],
  },

  en_s2u4_n1_035_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Lightning Ridge is also an opal mining ___.',
    blankAnswers: ['town'],
    options: ['town', 'cinema', 'library', 'airport'],
    answer: 'town',
    answerTranslation: L(
      'Lightning Ridge도 오팔 광산 마을이에요.',
      'Lightning Ridge ham opal qazib olinadigan shaharcha.',
      'Lightning Ridge is also an opal mining town.',
      'Лайтнинг-Ридж — тоже город добычи опала.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['lightning-ridge', 'reading'],
  },

  en_s2u4_n1_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a place with doctors and nurses: a ___.',
    blankAnswers: ['hospital'],
    options: ['hospital', 'cinema', 'library', 'museum'],
    answer: 'hospital',
    answerTranslation: L(
      '의사와 간호사가 있는 곳은 병원이에요.',
      'Shifokorlar va hamshiralar ishlaydigan joy kasalxona.',
      'There is a place with doctors and nurses: a hospital.',
      'Место, где работают врачи и медсёстры, — больница.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['lightning-ridge', 'hospital'],
  },

  en_s2u4_n1_037_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is there a cinema in Lightning Ridge?' },
    ],
    options: [
      'No, there isn’t.',
      'Yes, there are.',
      'No, there aren’t.',
      'Yes, it is.',
    ],
    answer: 'No, there isn’t.',
    answerTranslation: L(
      '아니요, 영화관은 없어요.',
      'Yo‘q, kinoteatr yo‘q.',
      'No, there isn’t.',
      'Нет, кинотеатра нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['lightning-ridge', 'cinema'],
  },

  en_s2u4_n1_038_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is there a theatre in Lightning Ridge?' },
    ],
    options: [
      'Yes, there is.',
      'Yes, there are.',
      'No, there isn’t.',
      'No, it doesn’t.',
    ],
    answer: 'Yes, there is.',
    answerTranslation: L(
      '네, 극장이 있어요.',
      'Ha, teatr bor.',
      'Yes, there is.',
      'Да, театр есть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['lightning-ridge', 'theatre'],
  },

  en_s2u4_n1_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Lightning Ridge has a hospital, shops, a chemist, a hairdresser’s, restaurants, a library and a theatre.',
    audioText:
      'Lightning Ridge has a hospital, shops, a chemist, a hairdresser’s, restaurants, a library and a theatre.',
    answerTranslation: L(
      'Lightning Ridge에는 병원, 가게, 약국, 미용실, 식당, 도서관과 극장이 있어요.',
      'Lightning Ridgeda kasalxona, do‘konlar, dorixona, sartaroshxona, restoranlar, kutubxona va teatr bor.',
      'Lightning Ridge has a hospital, shops, a chemist, a hairdresser’s, restaurants, a library and a theatre.',
      'В Лайтнинг-Ридже есть больница, магазины, аптека, парикмахерская, рестораны, библиотека и театр.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['lightning-ridge', 'review'],
  },

  en_s2u4_n1_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Coober Pedy and Lightning Ridge are Australian opal mining towns.',
    audioText:
      'Coober Pedy and Lightning Ridge are Australian opal mining towns.',
    answerTranslation: L(
      'Coober Pedy와 Lightning Ridge는 호주의 오팔 광산 마을이에요.',
      'Coober Pedy va Lightning Ridge Avstraliyadagi opal qazib olinadigan shaharchalar.',
      'Coober Pedy and Lightning Ridge are Australian opal mining towns.',
      'Кубер-Педи и Лайтнинг-Ридж — австралийские города добычи опала.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['reading', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Word stress
  // ===========================================================

  en_s2u4_n1_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '단어와 강세가 있는 부분을 연결하세요.',
      'So‘zni urg‘uli qismi bilan moslang.',
      'Match each word with its stressed part.',
      'Соедините слово с ударной частью.',
    ),
    pairs: [
      {
        text: 'AIRport',
        native: 'first',
        nativeI18n: L(
          '첫 음절',
          'birinchi bo‘g‘in',
          'first syllable',
          'первый слог',
        ),
      },
      {
        text: 'CHEMist',
        native: 'first',
        nativeI18n: L(
          '첫 음절',
          'birinchi bo‘g‘in',
          'first syllable',
          'первый слог',
        ),
      },
      {
        text: 'hoTEL',
        native: 'second',
        nativeI18n: L(
          '두 번째 음절',
          'ikkinchi bo‘g‘in',
          'second syllable',
          'второй слог',
        ),
      },
      {
        text: 'muSEum',
        native: 'second',
        nativeI18n: L(
          '두 번째 음절',
          'ikkinchi bo‘g‘in',
          'second syllable',
          'второй слог',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['word-stress'],
  },

  en_s2u4_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The stress in “airport” is on the ___ syllable.',
    blankAnswers: ['first'],
    options: ['first', 'second', 'third', 'fourth'],
    answer: 'first',
    answerTranslation: L(
      'airport는 첫 음절에 강세가 있어요.',
      'Airport so‘zida urg‘u birinchi bo‘g‘inda.',
      'The stress in “airport” is on the first syllable.',
      'В слове airport ударение на первом слоге.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress', 'airport'],
  },

  en_s2u4_n1_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The stress in “chemist” is on the ___ syllable.',
    blankAnswers: ['first'],
    options: ['first', 'second', 'third', 'fourth'],
    answer: 'first',
    answerTranslation: L(
      'chemist는 첫 음절에 강세가 있어요.',
      'Chemist so‘zida urg‘u birinchi bo‘g‘inda.',
      'The stress in “chemist” is on the first syllable.',
      'В слове chemist ударение на первом слоге.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress', 'chemist'],
  },

  en_s2u4_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The stress in “hotel” is on the ___ syllable.',
    blankAnswers: ['second'],
    options: ['second', 'first', 'third', 'fourth'],
    answer: 'second',
    answerTranslation: L(
      'hotel은 두 번째 음절에 강세가 있어요.',
      'Hotel so‘zida urg‘u ikkinchi bo‘g‘inda.',
      'The stress in “hotel” is on the second syllable.',
      'В слове hotel ударение на втором слоге.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress', 'hotel'],
  },

  en_s2u4_n1_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The stress in “museum” is on the ___ syllable.',
    blankAnswers: ['second'],
    options: ['second', 'first', 'third', 'fourth'],
    answer: 'second',
    answerTranslation: L(
      'museum은 두 번째 음절에 강세가 있어요.',
      'Museum so‘zida urg‘u ikkinchi bo‘g‘inda.',
      'The stress in “museum” is on the second syllable.',
      'В слове museum ударение на втором слоге.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress', 'museum'],
  },

  en_s2u4_n1_046_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'airport',
    audioText: 'airport',
    answerTranslation: L('공항', 'aeroport', 'airport', 'аэропорт'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'campsite',
    audioText: 'campsite',
    answerTranslation: L('캠핑장', 'lager joyi', 'campsite', 'кемпинг'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_048_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'chemist',
    audioText: 'chemist',
    answerTranslation: L('약국', 'dorixona', 'chemist', 'аптека'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: "hairdresser's",
    audioText: "hairdresser's",
    answerTranslation: L(
      '미용실',
      'sartaroshxona',
      "hairdresser's",
      'парикмахерская',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_050_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'hospital',
    audioText: 'hospital',
    answerTranslation: L('병원', 'kasalxona', 'hospital', 'больница'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'hotel',
    audioText: 'hotel',
    answerTranslation: L('호텔', 'mehmonxona', 'hotel', 'отель'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_052_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'library',
    audioText: 'library',
    answerTranslation: L('도서관', 'kutubxona', 'library', 'библиотека'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'museum',
    audioText: 'museum',
    answerTranslation: L('박물관', 'muzey', 'museum', 'музей'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_054_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'railway station',
    audioText: 'railway station',
    answerTranslation: L(
      '기차역',
      'temir yo‘l vokzali',
      'railway station',
      'железнодорожный вокзал',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['word-stress'],
  },

  en_s2u4_n1_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'restaurant',
    audioText: 'restaurant',
    answerTranslation: L('식당', 'restoran', 'restaurant', 'ресторан'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_056_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'swimming pool',
    audioText: 'swimming pool',
    answerTranslation: L(
      '수영장',
      'suzish havzasi',
      'swimming pool',
      'бассейн',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'theatre',
    audioText: 'theatre',
    answerTranslation: L('극장', 'teatr', 'theatre', 'театр'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress'],
  },

  en_s2u4_n1_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['There', 'is', 'a', 'museum', 'here'],
    answer: 'There is a museum here',
    audioText: 'There is a museum here.',
    answerTranslation: L(
      '여기에 박물관이 있어요.',
      'Bu yerda muzey bor.',
      'There is a museum here.',
      'Здесь есть музей.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['word-stress', 'places'],
  },

  en_s2u4_n1_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Airport, campsite, chemist, hairdresser’s, hospital, hotel, library, museum, railway station, restaurant, swimming pool, theatre.',
    audioText:
      'Airport, campsite, chemist, hairdresser’s, hospital, hotel, library, museum, railway station, restaurant, swimming pool, theatre.',
    answerTranslation: L(
      '장소 단어의 강세를 듣고 따라 말해요.',
      'Joy nomlarining urg‘usini tinglang va takrorlang.',
      'Listen to and repeat the stress in the place words.',
      'Слушайте и повторяйте ударение в названиях мест.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['word-stress', 'review'],
  },

  en_s2u4_n1_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'English words can have stress on different syllables, so listen carefully and copy the stress.',
    audioText:
      'English words can have stress on different syllables, so listen carefully and copy the stress.',
    answerTranslation: L(
      '영어 단어는 서로 다른 음절에 강세가 올 수 있으므로 잘 듣고 따라 말해요.',
      'Inglizcha so‘zlarda urg‘u turli bo‘g‘inlarga tushishi mumkin, shuning uchun diqqat bilan tinglab takrorlang.',
      'English words can have stress on different syllables, so listen carefully and copy the stress.',
      'В английских словах ударение может падать на разные слоги, поэтому внимательно слушайте и повторяйте.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['word-stress', 'review'],
  },

  // ===========================================================
  // Lesson 4 · there is / there are
  // ===========================================================

  en_s2u4_n1_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a swimming pool.',
    blankAnswers: ["There's"],
    options: ["There's", 'There are', "There aren't", 'Are there'],
    answer: "There's",
    answerTranslation: L(
      '수영장이 있어요.',
      'Suzish havzasi bor.',
      'There’s a swimming pool.',
      'Есть бассейн.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ some restaurants.',
    blankAnswers: ['There are'],
    options: ['There are', "There's", "There isn't", 'Is there'],
    answer: 'There are',
    answerTranslation: L(
      '식당들이 있어요.',
      'Restoranlar bor.',
      'There are some restaurants.',
      'Есть несколько ресторанов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a cinema.',
    blankAnswers: ["There isn't"],
    options: ["There isn't", "There aren't", 'There are', 'Are there'],
    answer: "There isn't",
    answerTranslation: L(
      '영화관이 없어요.',
      'Kinoteatr yo‘q.',
      'There isn’t a cinema.',
      'Кинотеатра нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ any theatres here.',
    blankAnswers: ["There aren't"],
    options: ["There aren't", "There isn't", 'There is', 'Is there'],
    answer: "There aren't",
    answerTranslation: L(
      '여기에는 극장이 없어요.',
      'Bu yerda teatrlar yo‘q.',
      'There aren’t any theatres here.',
      'Здесь нет театров.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a museum near here?',
    blankAnswers: ['Is there'],
    options: ['Is there', 'Are there', 'There is', 'There are'],
    answer: 'Is there',
    answerTranslation: L(
      '이 근처에 박물관이 있나요?',
      'Bu yer yaqinida muzey bormi?',
      'Is there a museum near here?',
      'Здесь рядом есть музей?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ any restaurants near here?',
    blankAnswers: ['Are there'],
    options: ['Are there', 'Is there', 'There is', "There isn't"],
    answer: 'Are there',
    answerTranslation: L(
      '이 근처에 식당이 있나요?',
      'Bu yer yaqinida restoranlar bormi?',
      'Are there any restaurants near here?',
      'Здесь рядом есть рестораны?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ some nice restaurants in the town centre.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'isn’t', 'aren’t'],
    answer: 'are',
    answerTranslation: L(
      '시내 중심에 좋은 식당들이 있어요.',
      'Shahar markazida yaxshi restoranlar bor.',
      'There are some nice restaurants in the town centre.',
      'В центре города есть хорошие рестораны.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ a swimming pool at the hotel.',
    blankAnswers: ["isn't"],
    options: ["isn't", "aren't", 'are', 'be'],
    answer: "isn't",
    answerTranslation: L(
      '호텔에는 수영장이 없어요.',
      'Mehmonxonada suzish havzasi yo‘q.',
      'There isn’t a swimming pool at the hotel.',
      'В отеле нет бассейна.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ any theatres here.',
    blankAnswers: ["aren't"],
    options: ["aren't", "isn't", 'is', 'be'],
    answer: "aren't",
    answerTranslation: L(
      '여기에는 극장이 없어요.',
      'Bu yerda teatrlar yo‘q.',
      'There aren’t any theatres here.',
      'Здесь нет театров.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ there a cinema near the hotel?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Do', 'Does'],
    answer: 'Is',
    answerTranslation: L(
      '호텔 근처에 영화관이 있나요?',
      'Mehmonxona yaqinida kinoteatr bormi?',
      'Is there a cinema near the hotel?',
      'Рядом с отелем есть кинотеатр?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ there any underground buildings we can visit?',
    blankAnswers: ['Are'],
    options: ['Are', 'Is', 'Do', 'Does'],
    answer: 'Are',
    answerTranslation: L(
      '방문할 수 있는 지하 건물들이 있나요?',
      'Ko‘rishimiz mumkin bo‘lgan yer osti binolari bormi?',
      'Are there any underground buildings we can visit?',
      'Есть подземные здания, которые можно посетить?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_072_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Is there a tourist information centre in town?',
      },
    ],
    options: [
      'Yes, there is.',
      'Yes, there are.',
      'No, they don’t.',
      'Yes, it does.',
    ],
    answer: 'Yes, there is.',
    answerTranslation: L(
      '네, 있어요.',
      'Ha, bor.',
      'Yes, there is.',
      'Да, есть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_073_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is there a cinema in the town centre?' },
    ],
    options: [
      'No, there isn’t, but there’s a theatre.',
      'No, there aren’t, but there are a theatre.',
      'No, it doesn’t.',
      'No, it isn’t a town.',
    ],
    answer: 'No, there isn’t, but there’s a theatre.',
    answerTranslation: L(
      '아니요, 영화관은 없지만 극장은 있어요.',
      'Yo‘q, kinoteatr yo‘q, lekin teatr bor.',
      'No, there isn’t, but there’s a theatre.',
      'Нет, кинотеатра нет, но есть театр.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Are there any nice restaurants near here?' },
    ],
    options: [
      'Yes, there are.',
      'Yes, there is.',
      'Yes, it does.',
      'No, it isn’t.',
    ],
    answer: 'Yes, there are.',
    answerTranslation: L(
      '네, 있어요.',
      'Ha, bor.',
      'Yes, there are.',
      'Да, есть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Are there any bookshops in the village?' },
    ],
    options: [
      'No, there aren’t.',
      'No, there isn’t.',
      'No, it doesn’t.',
      'No, they isn’t.',
    ],
    answer: 'No, there aren’t.',
    answerTranslation: L(
      '아니요, 없어요.',
      'Yo‘q.',
      'No, there aren’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_076_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['there', 'Is', 'a', 'museum', 'near', 'here'],
    answer: 'Is there a museum near here',
    audioText: 'Is there a museum near here?',
    answerTranslation: L(
      '이 근처에 박물관이 있나요?',
      'Bu yer yaqinida muzey bormi?',
      'Is there a museum near here?',
      'Здесь рядом есть музей?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Are', 'there', 'any', 'restaurants', 'near', 'here'],
    answer: 'Are there any restaurants near here',
    answerTranslation: L(
      '이 근처에 식당이 있나요?',
      'Bu yer yaqinida restoranlar bormi?',
      'Are there any restaurants near here?',
      'Здесь рядом есть рестораны?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'There are some restaurants in the town centre.',
    audioText: 'There are some restaurants in the town centre.',
    answerI18n: L(
      '시내 중심에 식당들이 있어요',
      'Shahar markazida restoranlar bor',
      'There are some restaurants in the town centre',
      'В центре города есть рестораны',
    ),
    options: [
      'There',
      'are',
      'some',
      'restaurants',
      'in',
      'the',
      'town',
      'centre.',
    ],
    optionsI18n: {
      ko: ['시내', '중심에', '식당들이', '있어요'],
      uz: ['Shahar', 'markazida', 'restoranlar', 'bor'],
      en: [
        'There',
        'are',
        'some',
        'restaurants',
        'in',
        'the',
        'town',
        'centre.',
      ],
      ru: ['В', 'центре', 'города', 'есть', 'рестораны'],
    },
    answerTranslation: L(
      '시내 중심에 식당들이 있어요.',
      'Shahar markazida restoranlar bor.',
      'There are some restaurants in the town centre.',
      'В центре города есть рестораны.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['there-is-there-are'],
  },

  en_s2u4_n1_079_type_answer: {
    type: 'type_answer',
    level: LV,
    instruction: TYPE_INSTRUCTION,
    sentencePrefix: '',
    sentenceSuffix: ' there any restaurants near here?',
    answer: 'Are',
    answerTranslation: L(
      '이 근처에 식당이 있나요?',
      'Bu yer yaqinida restoranlar bormi?',
      'Are there any restaurants near here?',
      'Здесь рядом есть рестораны?',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'Use Are with there and a plural noun.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: false,
      },
    },
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['there-is-there-are', 'typing'],
  },

  en_s2u4_n1_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Use there is with a singular noun, there are with plural nouns, and is there or are there to ask questions.',
    audioText:
      'Use there is with a singular noun, there are with plural nouns, and is there or are there to ask questions.',
    answerTranslation: L(
      '단수 명사에는 there is, 복수 명사에는 there are를 사용하고 질문할 때는 is there 또는 are there를 사용해요.',
      'Birlik ot bilan there is, ko‘plik otlar bilan there are, savollarda esa is there yoki are there ishlatiladi.',
      'Use there is with a singular noun, there are with plural nouns, and is there or are there to ask questions.',
      'С существительным в единственном числе используйте there is, во множественном — there are, а в вопросах — is there или are there.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit4', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 1
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE1 = {
  title: L(
    '지하 마을과 도시의 장소',
    'Yer osti shaharchalari va shahar joylari',
    'Underground towns and places',
    'Подземные города и городские места',
  ),
  section: 2,
  unit: 4,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '도시의 장소',
        'Shahardagi joylar',
        'Places in towns and cities',
        'Места в городе',
      ),
      description: L(
        '약국, 영화관, 미용실, 도서관, 박물관, 식당, 수영장, 극장, 공항, 기차역과 관광 안내소 등 도시의 주요 장소를 익혀요.',
        'Dorixona, kinoteatr, sartaroshxona, kutubxona, muzey, restoran, suzish havzasi, teatr, aeroport, vokzal va turist axborot markazi kabi joylarni o‘rganasiz.',
        'Learn the main places in towns and cities from Unit 4.1.',
        'Изучаем основные места в городе из Unit 4.1.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u4_n1_001_word_matching',
        'en_s2u4_n1_002_word_matching',
        'en_s2u4_n1_003_word_matching',
        'en_s2u4_n1_004_fill_in_blank',
        'en_s2u4_n1_005_fill_in_blank',
        'en_s2u4_n1_006_fill_in_blank',
        'en_s2u4_n1_007_fill_in_blank',
        'en_s2u4_n1_008_fill_in_blank',
        'en_s2u4_n1_009_fill_in_blank',
        'en_s2u4_n1_010_fill_in_blank',
        'en_s2u4_n1_011_fill_in_blank',
        'en_s2u4_n1_012_fill_in_blank',
        'en_s2u4_n1_013_fill_in_blank',
        'en_s2u4_n1_014_fill_in_blank',
        'en_s2u4_n1_015_fill_in_blank',
        'en_s2u4_n1_016_word_arrange',
        'en_s2u4_n1_017_translate_builder',
        'en_s2u4_n1_018_speaking',
        'en_s2u4_n1_019_speaking',
        'en_s2u4_n1_020_speaking',
      ],
    },

    {
      title: L(
        'Coober Pedy와 Lightning Ridge',
        'Coober Pedy va Lightning Ridge',
        'Coober Pedy and Lightning Ridge',
        'Кубер-Педи и Лайтнинг-Ридж',
      ),
      description: L(
        '호주의 오팔 광산 마을 Coober Pedy와 Lightning Ridge를 통해 지하 건물과 도시 시설에 관한 어휘를 읽고 이해해요.',
        'Avstraliyadagi Coober Pedy va Lightning Ridge opal shaharchalari orqali yer osti binolari va shahar joylarini o‘rganasiz.',
        'Read about the Australian opal towns Coober Pedy and Lightning Ridge.',
        'Читаем об австралийских городах добычи опала Кубер-Педи и Лайтнинг-Ридж.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u4_n1_021_fill_in_blank',
        'en_s2u4_n1_022_fill_in_blank',
        'en_s2u4_n1_023_fill_in_blank',
        'en_s2u4_n1_024_fill_in_blank',
        'en_s2u4_n1_025_fill_in_blank',
        'en_s2u4_n1_026_dialog_complete',
        'en_s2u4_n1_027_fill_in_blank',
        'en_s2u4_n1_028_fill_in_blank',
        'en_s2u4_n1_029_fill_in_blank',
        'en_s2u4_n1_030_fill_in_blank',
        'en_s2u4_n1_031_fill_in_blank',
        'en_s2u4_n1_032_fill_in_blank',
        'en_s2u4_n1_033_fill_in_blank',
        'en_s2u4_n1_034_dialog_complete',
        'en_s2u4_n1_035_fill_in_blank',
        'en_s2u4_n1_036_fill_in_blank',
        'en_s2u4_n1_037_dialog_complete',
        'en_s2u4_n1_038_dialog_complete',
        'en_s2u4_n1_039_speaking',
        'en_s2u4_n1_040_speaking',
      ],
    },

    {
      title: L(
        '단어 강세',
        'So‘z urg‘usi',
        'Word stress',
        'Словесное ударение',
      ),
      description: L(
        'airport, campsite, chemist, hairdresser’s, hospital, hotel, library, museum, railway station, restaurant, swimming pool, theatre의 강세를 연습해요.',
        'Airport, campsite, chemist, hairdresser’s, hospital, hotel, library, museum, railway station, restaurant, swimming pool va theatre so‘zlarining urg‘usini mashq qilasiz.',
        'Practise word stress with the place vocabulary from Unit 4.1.',
        'Практикуем ударение в названиях мест из Unit 4.1.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 3,
      questions: [
        'en_s2u4_n1_041_word_matching',
        'en_s2u4_n1_042_fill_in_blank',
        'en_s2u4_n1_043_fill_in_blank',
        'en_s2u4_n1_044_fill_in_blank',
        'en_s2u4_n1_045_fill_in_blank',
        'en_s2u4_n1_046_speaking',
        'en_s2u4_n1_047_speaking',
        'en_s2u4_n1_048_speaking',
        'en_s2u4_n1_049_speaking',
        'en_s2u4_n1_050_speaking',
        'en_s2u4_n1_051_speaking',
        'en_s2u4_n1_052_speaking',
        'en_s2u4_n1_053_speaking',
        'en_s2u4_n1_054_speaking',
        'en_s2u4_n1_055_speaking',
        'en_s2u4_n1_056_speaking',
        'en_s2u4_n1_057_speaking',
        'en_s2u4_n1_058_word_arrange',
        'en_s2u4_n1_059_speaking',
        'en_s2u4_n1_060_speaking',
      ],
    },

    {
      title: L(
        'there is / there are',
        'there is / there are',
        'there is / there are',
        'there is / there are',
      ),
      description: L(
        '단수와 복수에 맞춰 there is, there are, there isn’t, there aren’t와 Is there, Are there 질문을 사용해요.',
        'Birlik va ko‘plikka qarab there is, there are, there isn’t, there aren’t hamda Is there, Are there savollarini ishlatasiz.',
        'Use there is and there are in positive, negative and question forms.',
        'Используем there is и there are в утверждениях, отрицаниях и вопросах.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 4,
      questions: [
        'en_s2u4_n1_061_fill_in_blank',
        'en_s2u4_n1_062_fill_in_blank',
        'en_s2u4_n1_063_fill_in_blank',
        'en_s2u4_n1_064_fill_in_blank',
        'en_s2u4_n1_065_fill_in_blank',
        'en_s2u4_n1_066_fill_in_blank',
        'en_s2u4_n1_067_fill_in_blank',
        'en_s2u4_n1_068_fill_in_blank',
        'en_s2u4_n1_069_fill_in_blank',
        'en_s2u4_n1_070_fill_in_blank',
        'en_s2u4_n1_071_fill_in_blank',
        'en_s2u4_n1_072_dialog_complete',
        'en_s2u4_n1_073_dialog_complete',
        'en_s2u4_n1_074_dialog_complete',
        'en_s2u4_n1_075_dialog_complete',
        'en_s2u4_n1_076_word_arrange',
        'en_s2u4_n1_077_translate_builder',
        'en_s2u4_n1_078_sentence_builder',
        'en_s2u4_n1_079_type_answer',
        'en_s2u4_n1_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 4 · Node 2
// 4.2 Where I live
//
// Coverage
// - rooms:
//   house / flat / garage / bedroom / kitchen
//   toilet / living room / bathroom / office / dining room
//
// - furniture:
//   bed / cooker / fridge / carpet / table
//   washing machine / shelf / sink / armchair
//
// - additional text vocabulary:
//   building / dishwasher / laundrette / television
//
// - prepositions of place:
//   behind / opposite / next to / above
//   in front of / between / under / on
//
// - Claire's flat description
//
// Grammar:
// - articles a / an
// - the
// - no article (-)
//
// Pronunciation:
// - schwa /ə/
// - unstressed a / an / the
//
// IMPORTANT:
// WORDS에는 한 단어 headword만 등록.
// living room / dining room / washing machine /
// next to / in front of 같은 phrase는 WORD로 등록하지 않음.
//
// Previously registered words such as:
// house / office / restaurant / shop / town / city
// are reused without duplicate WORD entries.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE2_WORDS = [
  {
    code: 'en-noun-flat',
    english: 'flat',
    senseKey: 'set-of-rooms-for-living',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '아파트; 주거 공간',
      'kvartira',
      'a set of rooms for living in, usually on one floor of a building',
      'квартира',
    ),
    examples: [
      {
        english: 'I live in a flat.',
        translations: L(
          '저는 아파트에 살아요.',
          'Men kvartirada yashayman.',
          'I live in a flat.',
          'Я живу в квартире.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flæt/',
      ttsText: 'flat',
    },
    tags: ['home', 'rooms', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-garage',
    english: 'garage',
    senseKey: 'building-or-space-for-cars',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '차고',
      'garaj',
      'a building or space where cars are kept',
      'гараж',
    ),
    examples: [
      {
        english: 'There is a garage under the building.',
        translations: L(
          '건물 아래에 차고가 있어요.',
          'Bino ostida garaj bor.',
          'There is a garage under the building.',
          'Под зданием есть гараж.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡærɑːʒ/',
      ttsText: 'garage',
    },
    tags: ['home', 'places', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-bedroom',
    english: 'bedroom',
    senseKey: 'room-for-sleeping',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('침실', 'yotoqxona', 'a room used for sleeping', 'спальня'),
    examples: [
      {
        english: 'There is one bedroom.',
        translations: L(
          '침실이 하나 있어요.',
          'Bitta yotoqxona bor.',
          'There is one bedroom.',
          'Есть одна спальня.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbedruːm/',
      ttsText: 'bedroom',
    },
    tags: ['home', 'rooms', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-kitchen',
    english: 'kitchen',
    senseKey: 'room-for-cooking',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '주방',
      'oshxona',
      'a room where food is prepared and cooked',
      'кухня',
    ),
    examples: [
      {
        english: 'The fridge is in the kitchen.',
        translations: L(
          '냉장고는 주방에 있어요.',
          'Muzlatgich oshxonada.',
          'The fridge is in the kitchen.',
          'Холодильник находится на кухне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɪtʃɪn/',
      ttsText: 'kitchen',
    },
    tags: ['home', 'rooms', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-toilet',
    english: 'toilet',
    senseKey: 'room-or-fixture-for-toilet-use',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '화장실; 변기',
      'hojatxona',
      'a room or fixture used as a toilet',
      'туалет',
    ),
    examples: [
      {
        english: 'There is a toilet in the flat.',
        translations: L(
          '아파트에 화장실이 있어요.',
          'Kvartirada hojatxona bor.',
          'There is a toilet in the flat.',
          'В квартире есть туалет.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtɔɪlət/',
      ttsText: 'toilet',
    },
    tags: ['home', 'rooms', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bathroom',
    english: 'bathroom',
    senseKey: 'room-with-bath-or-shower',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('욕실', 'hammom', 'a room with a bath or shower', 'ванная'),
    examples: [
      {
        english: 'The flat has a bathroom.',
        translations: L(
          '그 아파트에는 욕실이 있어요.',
          'Kvartirada hammom bor.',
          'The flat has a bathroom.',
          'В квартире есть ванная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɑːθruːm/',
      ttsText: 'bathroom',
    },
    tags: ['home', 'rooms', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-bed',
    english: 'bed',
    senseKey: 'furniture-for-sleeping',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '침대',
      'karavot',
      'a piece of furniture used for sleeping',
      'кровать',
    ),
    examples: [
      {
        english: 'My bed is above the kitchen.',
        translations: L(
          '제 침대는 주방 위에 있어요.',
          'Karavotim oshxona ustida.',
          'My bed is above the kitchen.',
          'Моя кровать находится над кухней.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bed/',
      ttsText: 'bed',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-cooker',
    english: 'cooker',
    senseKey: 'appliance-for-cooking',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조리기; 레인지',
      'ovqat pishirgich',
      'a large appliance used for cooking food',
      'плита',
    ),
    examples: [
      {
        english: 'The cooker is in the kitchen.',
        translations: L(
          '레인지는 주방에 있어요.',
          'Ovqat pishirgich oshxonada.',
          'The cooker is in the kitchen.',
          'Плита находится на кухне.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʊkə/',
      ttsText: 'cooker',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-fridge',
    english: 'fridge',
    senseKey: 'appliance-for-keeping-food-cold',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '냉장고',
      'muzlatgich',
      'an appliance used to keep food and drinks cold',
      'холодильник',
    ),
    examples: [
      {
        english: 'There is a fridge in the kitchen.',
        translations: L(
          '주방에 냉장고가 있어요.',
          'Oshxonada muzlatgich bor.',
          'There is a fridge in the kitchen.',
          'На кухне есть холодильник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/frɪdʒ/',
      ttsText: 'fridge',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-carpet',
    english: 'carpet',
    senseKey: 'floor-covering-made-of-thick-material',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '카펫',
      'gilam',
      'a thick material used to cover a floor',
      'ковёр',
    ),
    examples: [
      {
        english: 'There is a red carpet on the floor.',
        translations: L(
          '바닥에 빨간 카펫이 있어요.',
          'Polda qizil gilam bor.',
          'There is a red carpet on the floor.',
          'На полу лежит красный ковёр.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɑːpɪt/',
      ttsText: 'carpet',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-table',
    english: 'table',
    senseKey: 'furniture-with-flat-top',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '테이블; 탁자',
      'stol',
      'a piece of furniture with a flat top',
      'стол',
    ),
    examples: [
      {
        english: 'There is a television on the table.',
        translations: L(
          '탁자 위에 텔레비전이 있어요.',
          'Stol ustida televizor bor.',
          'There is a television on the table.',
          'На столе стоит телевизор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈteɪbəl/',
      ttsText: 'table',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-shelf',
    english: 'shelf',
    senseKey: 'flat-board-for-putting-things-on',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '선반',
      'tokcha',
      'a flat board used for putting things on',
      'полка',
    ),
    examples: [
      {
        english: 'The bed is on a shelf.',
        translations: L(
          '침대는 선반 위에 있어요.',
          'Karavot tokcha ustida.',
          'The bed is on a shelf.',
          'Кровать находится на платформе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ʃelf/',
      ttsText: 'shelf',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-sink',
    english: 'sink',
    senseKey: 'basin-for-washing',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '싱크대',
      'rakovina',
      'a basin with water used for washing things',
      'раковина',
    ),
    examples: [
      {
        english: 'Claire washes things in the sink.',
        translations: L(
          'Claire는 싱크대에서 물건을 씻어요.',
          'Claire narsalarni rakovinada yuvadi.',
          'Claire washes things in the sink.',
          'Клэр моет вещи в раковине.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sɪŋk/',
      ttsText: 'sink',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-armchair',
    english: 'armchair',
    senseKey: 'comfortable-chair-with-arms',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '안락의자',
      'kreslo',
      'a comfortable chair with supports for your arms',
      'кресло',
    ),
    examples: [
      {
        english: 'There is an armchair near the window.',
        translations: L(
          '창문 근처에 안락의자가 있어요.',
          'Deraza yaqinida kreslo bor.',
          'There is an armchair near the window.',
          'Рядом с окном есть кресло.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɑːmtʃeə/',
      ttsText: 'armchair',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-dishwasher',
    english: 'dishwasher',
    senseKey: 'machine-for-washing-dishes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '식기세척기',
      'idish yuvish mashinasi',
      'a machine used for washing dishes',
      'посудомоечная машина',
    ),
    examples: [
      {
        english: 'Claire does not have a dishwasher.',
        translations: L(
          'Claire에게는 식기세척기가 없어요.',
          'Claireda idish yuvish mashinasi yo‘q.',
          'Claire does not have a dishwasher.',
          'У Клэр нет посудомоечной машины.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɪʃwɒʃə/',
      ttsText: 'dishwasher',
    },
    tags: ['home', 'appliances', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-place-laundrette',
    english: 'laundrette',
    senseKey: 'place-with-machines-for-washing-clothes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '셀프 세탁소',
      'kir yuvish joyi',
      'a place where people pay to use washing machines',
      'прачечная самообслуживания',
    ),
    examples: [
      {
        english: 'Claire goes to the laundrette.',
        translations: L(
          'Claire는 셀프 세탁소에 가요.',
          'Claire kir yuvish joyiga boradi.',
          'Claire goes to the laundrette.',
          'Клэр ходит в прачечную.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌlɔːnˈdret/',
      ttsText: 'laundrette',
    },
    tags: ['home', 'places', 'unit4'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-television',
    english: 'television',
    senseKey: 'device-for-watching-programmes',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '텔레비전',
      'televizor',
      'a device used for watching television programmes',
      'телевизор',
    ),
    examples: [
      {
        english: 'There is a television on the table.',
        translations: L(
          '탁자 위에 텔레비전이 있어요.',
          'Stol ustida televizor bor.',
          'There is a television on the table.',
          'На столе стоит телевизор.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtelɪvɪʒən/',
      ttsText: 'television',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-building',
    english: 'building',
    senseKey: 'structure-with-walls-and-roof',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('건물', 'bino', 'a structure with walls and a roof', 'здание'),
    examples: [
      {
        english: 'The flat is in a building.',
        translations: L(
          '그 아파트는 건물 안에 있어요.',
          'Kvartira binoda joylashgan.',
          'The flat is in a building.',
          'Квартира находится в здании.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɪldɪŋ/',
      ttsText: 'building',
    },
    tags: ['home', 'places', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-floor',
    english: 'floor',
    senseKey: 'level-of-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '층; 바닥',
      'qavat; pol',
      'a level of a building or the surface you walk on',
      'этаж; пол',
    ),
    examples: [
      {
        english: 'The flat is on the fourth floor.',
        translations: L(
          '그 아파트는 4층에 있어요.',
          'Kvartira to‘rtinchi qavatda.',
          'The flat is on the fourth floor.',
          'Квартира находится на четвёртом этаже.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/flɔː/',
      ttsText: 'floor',
    },
    tags: ['home', 'places', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-street',
    english: 'street',
    senseKey: 'road-in-town-with-buildings',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '거리',
      'ko‘cha',
      'a road in a town or city with buildings along it',
      'улица',
    ),
    examples: [
      {
        english: 'There are lots of cars in the street.',
        translations: L(
          '거리에 차가 많아요.',
          'Ko‘chada ko‘p mashinalar bor.',
          'There are lots of cars in the street.',
          'На улице много машин.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/striːt/',
      ttsText: 'street',
    },
    tags: ['places', 'city', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sofa',
    english: 'sofa',
    senseKey: 'long-comfortable-seat',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '소파',
      'divan',
      'a long comfortable seat for two or more people',
      'диван',
    ),
    examples: [
      {
        english: 'I have a big sofa in my living room.',
        translations: L(
          '거실에 큰 소파가 있어요.',
          'Mehmonxonamda katta divan bor.',
          'I have a big sofa in my living room.',
          'В моей гостиной есть большой диван.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsəʊfə/',
      ttsText: 'sofa',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-elevator',
    english: 'elevator',
    senseKey: 'machine-moving-people-between-floors',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '엘리베이터',
      'lift',
      'a machine that carries people between floors in a building',
      'лифт',
    ),
    examples: [
      {
        english: 'Is there an elevator in your building?',
        translations: L(
          '건물에 엘리베이터가 있나요?',
          'Binoingizda lift bormi?',
          'Is there an elevator in your building?',
          'В вашем здании есть лифт?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈelɪveɪtə/',
      ttsText: 'elevator',
    },
    tags: ['home', 'building', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-metro',
    english: 'metro',
    senseKey: 'underground-city-railway-system',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '지하철',
      'metro',
      'an underground railway system in a city',
      'метро',
    ),
    examples: [
      {
        english: 'Is there a metro station near here?',
        translations: L(
          '이 근처에 지하철역이 있나요?',
          'Bu yer yaqinida metro bekati bormi?',
          'Is there a metro station near here?',
          'Здесь рядом есть станция метро?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmetrəʊ/',
      ttsText: 'metro',
    },
    tags: ['transport', 'city', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-preposition-above',
    english: 'above',
    senseKey: 'in-higher-position-than',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~보다 위에',
      'ustida',
      'in a higher position than something',
      'над',
    ),
    examples: [
      {
        english: 'The bed is above the kitchen.',
        translations: L(
          '침대는 주방 위에 있어요.',
          'Karavot oshxona ustida.',
          'The bed is above the kitchen.',
          'Кровать находится над кухней.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈbʌv/',
      ttsText: 'above',
    },
    tags: ['prepositions', 'place', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-behind',
    english: 'behind',
    senseKey: 'at-back-of',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('~뒤에', 'orqasida', 'at the back of something', 'за'),
    examples: [
      {
        english: 'The building is behind the restaurant.',
        translations: L(
          '건물은 식당 뒤에 있어요.',
          'Bino restoran orqasida.',
          'The building is behind the restaurant.',
          'Здание находится за рестораном.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪˈhaɪnd/',
      ttsText: 'behind',
    },
    tags: ['prepositions', 'place', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-between',
    english: 'between',
    senseKey: 'in-middle-of-two-things',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~사이에',
      'orasida',
      'in the middle of two people or things',
      'между',
    ),
    examples: [
      {
        english: 'The building is between two places.',
        translations: L(
          '건물은 두 장소 사이에 있어요.',
          'Bino ikki joy orasida.',
          'The building is between two places.',
          'Здание находится между двумя местами.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bɪˈtwiːn/',
      ttsText: 'between',
    },
    tags: ['prepositions', 'place', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-opposite',
    english: 'opposite',
    senseKey: 'on-other-side-facing',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~맞은편에',
      'ro‘parasida',
      'on the other side from something and facing it',
      'напротив',
    ),
    examples: [
      {
        english: 'There is a supermarket opposite my house.',
        translations: L(
          '우리 집 맞은편에 슈퍼마켓이 있어요.',
          'Uyimning ro‘parasida supermarket bor.',
          'There is a supermarket opposite my house.',
          'Напротив моего дома есть супермаркет.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɒpəzɪt/',
      ttsText: 'opposite',
    },
    tags: ['prepositions', 'place', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-preposition-under',
    english: 'under',
    senseKey: 'below-something',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L('~아래에', 'ostida', 'below something', 'под'),
    examples: [
      {
        english: 'The garage is under the building.',
        translations: L(
          '차고는 건물 아래에 있어요.',
          'Garaj bino ostida.',
          'The garage is under the building.',
          'Гараж находится под зданием.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʌndə/',
      ttsText: 'under',
    },
    tags: ['prepositions', 'place', 'unit4'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT4_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Rooms, furniture and prepositions
  // ===========================================================

  en_s2u4_n2_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'flat',
        native: 'kvartira',
        nativeI18n: L('아파트', 'kvartira', 'flat', 'квартира'),
      },
      {
        text: 'garage',
        native: 'garaj',
        nativeI18n: L('차고', 'garaj', 'garage', 'гараж'),
      },
      {
        text: 'bedroom',
        native: 'yotoqxona',
        nativeI18n: L('침실', 'yotoqxona', 'bedroom', 'спальня'),
      },
      {
        text: 'kitchen',
        native: 'oshxona',
        nativeI18n: L('주방', 'oshxona', 'kitchen', 'кухня'),
      },
      {
        text: 'bathroom',
        native: 'hammom',
        nativeI18n: L('욕실', 'hammom', 'bathroom', 'ванная'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['rooms', 'home'],
  },

  en_s2u4_n2_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'bed',
        native: 'karavot',
        nativeI18n: L('침대', 'karavot', 'bed', 'кровать'),
      },
      {
        text: 'fridge',
        native: 'muzlatgich',
        nativeI18n: L('냉장고', 'muzlatgich', 'fridge', 'холодильник'),
      },
      {
        text: 'carpet',
        native: 'gilam',
        nativeI18n: L('카펫', 'gilam', 'carpet', 'ковёр'),
      },
      {
        text: 'shelf',
        native: 'tokcha',
        nativeI18n: L('선반', 'tokcha', 'shelf', 'полка'),
      },
      {
        text: 'sink',
        native: 'rakovina',
        nativeI18n: L('싱크대', 'rakovina', 'sink', 'раковина'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture', 'home'],
  },

  en_s2u4_n2_003_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'behind',
        native: 'orqasida',
        nativeI18n: L('뒤에', 'orqasida', 'behind', 'за'),
      },
      {
        text: 'opposite',
        native: 'ro‘parasida',
        nativeI18n: L('맞은편에', 'ro‘parasida', 'opposite', 'напротив'),
      },
      {
        text: 'above',
        native: 'ustida',
        nativeI18n: L('위에', 'ustida', 'above', 'над'),
      },
      {
        text: 'between',
        native: 'orasida',
        nativeI18n: L('사이에', 'orasida', 'between', 'между'),
      },
      {
        text: 'under',
        native: 'ostida',
        nativeI18n: L('아래에', 'ostida', 'under', 'под'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions', 'place'],
  },

  en_s2u4_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I sleep in a ___.',
    blankAnswers: ['bed'],
    options: ['bed', 'sink', 'fridge', 'cooker'],
    answer: 'bed',
    answerTranslation: L(
      '저는 침대에서 자요.',
      'Men karavotda uxlayman.',
      'I sleep in a bed.',
      'Я сплю в кровати.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Food stays cold in a ___.',
    blankAnswers: ['fridge'],
    options: ['fridge', 'sink', 'carpet', 'bed'],
    answer: 'fridge',
    answerTranslation: L(
      '음식은 냉장고에서 차갑게 보관돼요.',
      'Ovqat muzlatgichda sovuq saqlanadi.',
      'Food stays cold in a fridge.',
      'Еда хранится холодной в холодильнике.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire washes things in the ___.',
    blankAnswers: ['sink'],
    options: ['sink', 'bed', 'shelf', 'carpet'],
    answer: 'sink',
    answerTranslation: L(
      'Claire는 싱크대에서 물건을 씻어요.',
      'Claire narsalarni rakovinada yuvadi.',
      'Claire washes things in the sink.',
      'Клэр моет вещи в раковине.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire cooks food on the ___.',
    blankAnswers: ['cooker'],
    options: ['cooker', 'carpet', 'bed', 'shelf'],
    answer: 'cooker',
    answerTranslation: L(
      'Claire는 레인지에서 요리해요.',
      'Claire ovqatni pishirgichda tayyorlaydi.',
      'Claire cooks food on the cooker.',
      'Клэр готовит еду на плите.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire sits in an ___ to watch TV.',
    blankAnswers: ['armchair'],
    options: ['armchair', 'sink', 'garage', 'shelf'],
    answer: 'armchair',
    answerTranslation: L(
      'Claire는 TV를 보기 위해 안락의자에 앉아요.',
      'Claire televizor ko‘rish uchun kresloga o‘tiradi.',
      'Claire sits in an armchair to watch TV.',
      'Клэр сидит в кресле и смотрит телевизор.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a red ___ on the floor.',
    blankAnswers: ['carpet'],
    options: ['carpet', 'sink', 'fridge', 'garage'],
    answer: 'carpet',
    answerTranslation: L(
      '바닥에 빨간 카펫이 있어요.',
      'Polda qizil gilam bor.',
      'There is a red carpet on the floor.',
      'На полу лежит красный ковёр.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a television on the ___.',
    blankAnswers: ['table'],
    options: ['table', 'garage', 'toilet', 'fridge'],
    answer: 'table',
    answerTranslation: L(
      '탁자 위에 텔레비전이 있어요.',
      'Stol ustida televizor bor.',
      'There is a television on the table.',
      'На столе стоит телевизор.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['furniture'],
  },

  en_s2u4_n2_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The cup is ___ the chair.',
    blankAnswers: ['behind'],
    options: ['behind', 'above', 'between', 'opposite'],
    answer: 'behind',
    answerTranslation: L(
      '컵은 의자 뒤에 있어요.',
      'Stakan stulning orqasida.',
      'The cup is behind the chair.',
      'Чашка находится за стулом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions'],
  },

  en_s2u4_n2_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The two buildings are ___ each other.',
    blankAnswers: ['opposite'],
    options: ['opposite', 'under', 'above', 'behind'],
    answer: 'opposite',
    answerTranslation: L(
      '두 건물은 서로 맞은편에 있어요.',
      'Ikki bino bir-birining ro‘parasida.',
      'The two buildings are opposite each other.',
      'Два здания находятся друг напротив друга.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['prepositions'],
  },

  en_s2u4_n2_013_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The guitar is ___ the bed.',
    blankAnswers: ['on'],
    options: ['on', 'between', 'behind', 'opposite'],
    answer: 'on',
    answerTranslation: L(
      '기타는 침대 위에 있어요.',
      'Gitara karavot ustida.',
      'The guitar is on the bed.',
      'Гитара лежит на кровати.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions'],
  },

  en_s2u4_n2_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The shelf is ___ the sink.',
    blankAnswers: ['above'],
    options: ['above', 'behind', 'opposite', 'between'],
    answer: 'above',
    answerTranslation: L(
      '선반은 싱크대 위에 있어요.',
      'Tokcha rakovina ustida.',
      'The shelf is above the sink.',
      'Полка находится над раковиной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions'],
  },

  en_s2u4_n2_015_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The garage is ___ the building.',
    blankAnswers: ['under'],
    options: ['under', 'above', 'opposite', 'behind'],
    answer: 'under',
    answerTranslation: L(
      '차고는 건물 아래에 있어요.',
      'Garaj bino ostida.',
      'The garage is under the building.',
      'Гараж находится под зданием.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prepositions'],
  },

  en_s2u4_n2_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'bed', 'is', 'above', 'the', 'kitchen'],
    answer: 'The bed is above the kitchen',
    audioText: 'The bed is above the kitchen.',
    answerTranslation: L(
      '침대는 주방 위에 있어요.',
      'Karavot oshxona ustida.',
      'The bed is above the kitchen.',
      'Кровать находится над кухней.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['prepositions'],
  },

  en_s2u4_n2_017_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'is', 'a', 'fridge', 'in', 'the', 'kitchen'],
    answer: 'There is a fridge in the kitchen',
    answerTranslation: L(
      '주방에 냉장고가 있어요.',
      'Oshxonada muzlatgich bor.',
      'There is a fridge in the kitchen.',
      'На кухне есть холодильник.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['home', 'furniture'],
  },

  en_s2u4_n2_018_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The armchair is in front of the window.',
    audioText: 'The armchair is in front of the window.',
    answerI18n: L(
      '안락의자는 창문 앞에 있어요',
      'Kreslo deraza oldida',
      'The armchair is in front of the window',
      'Кресло находится перед окном',
    ),
    options: ['The', 'armchair', 'is', 'in', 'front', 'of', 'the', 'window.'],
    optionsI18n: {
      ko: ['안락의자는', '창문', '앞에', '있어요'],
      uz: ['Kreslo', 'deraza', 'oldida'],
      en: ['The', 'armchair', 'is', 'in', 'front', 'of', 'the', 'window.'],
      ru: ['Кресло', 'находится', 'перед', 'окном'],
    },
    answerTranslation: L(
      '안락의자는 창문 앞에 있어요.',
      'Kreslo deraza oldida.',
      'The armchair is in front of the window.',
      'Кресло находится перед окном.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['prepositions'],
  },

  en_s2u4_n2_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My home has a kitchen, a bathroom, a bedroom and a living room.',
    audioText:
      'My home has a kitchen, a bathroom, a bedroom and a living room.',
    answerTranslation: L(
      '우리 집에는 주방, 욕실, 침실과 거실이 있어요.',
      'Uyimda oshxona, hammom, yotoqxona va mehmonxona bor.',
      'My home has a kitchen, a bathroom, a bedroom and a living room.',
      'В моём доме есть кухня, ванная, спальня и гостиная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['rooms'],
  },

  en_s2u4_n2_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We use prepositions such as behind, opposite, above, between, under, on, next to and in front of to describe position.',
    audioText:
      'We use prepositions such as behind, opposite, above, between, under, on, next to and in front of to describe position.',
    answerTranslation: L(
      '위치를 설명할 때 behind, opposite, above, between, under, on, next to, in front of 같은 전치사를 사용해요.',
      'Joylashuvni tasvirlash uchun behind, opposite, above, between, under, on, next to va in front of ishlatiladi.',
      'We use prepositions such as behind, opposite, above, between, under, on, next to and in front of to describe position.',
      'Для описания положения используются behind, opposite, above, between, under, on, next to и in front of.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['prepositions', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Claire's flat
  // ===========================================================

  en_s2u4_n2_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire’s flat is ___ the fourth floor.',
    blankAnswers: ['on'],
    options: ['on', 'under', 'behind', 'opposite'],
    answer: 'on',
    answerTranslation: L(
      'Claire의 아파트는 4층에 있어요.',
      'Clairening kvartirasi to‘rtinchi qavatda.',
      'Claire’s flat is on the fourth floor.',
      'Квартира Клэр находится на четвёртом этаже.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The garage is ___ the building.',
    blankAnswers: ['under'],
    options: ['under', 'above', 'on', 'opposite'],
    answer: 'under',
    answerTranslation: L(
      '차고는 건물 아래에 있어요.',
      'Garaj bino ostida.',
      'The garage is under the building.',
      'Гараж находится под зданием.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The building is ___ a 24-hour garage.',
    blankAnswers: ['behind'],
    options: ['behind', 'above', 'on', 'under'],
    answer: 'behind',
    answerTranslation: L(
      '건물은 24시간 차고 뒤에 있어요.',
      'Bino 24 soatlik garaj orqasida.',
      'The building is behind a 24-hour garage.',
      'Здание находится за круглосуточным гаражом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The building is ___ the garage and an Indian restaurant.',
    blankAnswers: ['between'],
    options: ['between', 'under', 'above', 'on'],
    answer: 'between',
    answerTranslation: L(
      '건물은 차고와 인도 식당 사이에 있어요.',
      'Bino garaj va hind restorani orasida.',
      'The building is between the garage and an Indian restaurant.',
      'Здание находится между гаражом и индийским рестораном.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire’s bed is ___ the kitchen.',
    blankAnswers: ['above'],
    options: ['above', 'behind', 'opposite', 'under'],
    answer: 'above',
    answerTranslation: L(
      'Claire의 침대는 주방 위에 있어요.',
      'Clairening karavoti oshxona ustida.',
      'Claire’s bed is above the kitchen.',
      'Кровать Клэр находится над кухней.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The toilet and shower are ___ the shelf.',
    blankAnswers: ['on'],
    options: ['on', 'under', 'between', 'opposite'],
    answer: 'on',
    answerTranslation: L(
      '화장실과 샤워 공간은 선반 위에 있어요.',
      'Hojatxona va dush tokcha ustida.',
      'The toilet and shower are on the shelf.',
      'Туалет и душ находятся на платформе.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The armchair is ___ the window.',
    blankAnswers: ['in front of'],
    options: ['in front of', 'between', 'under', 'on'],
    answer: 'in front of',
    answerTranslation: L(
      '안락의자는 창문 앞에 있어요.',
      'Kreslo deraza oldida.',
      'The armchair is in front of the window.',
      'Кресло находится перед окном.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The river is ___ the building.',
    blankAnswers: ['next to'],
    options: ['next to', 'under', 'above', 'on'],
    answer: 'next to',
    answerTranslation: L(
      '강은 건물 옆에 있어요.',
      'Daryo bino yonida.',
      'The river is next to the building.',
      'Река находится рядом со зданием.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The flat is ___ a noisy street.',
    blankAnswers: ['opposite'],
    options: ['opposite', 'above', 'under', 'on'],
    answer: 'opposite',
    answerTranslation: L(
      '아파트는 시끄러운 거리 맞은편에 있어요.',
      'Kvartira shovqinli ko‘chaning ro‘parasida.',
      'The flat is opposite a noisy street.',
      'Квартира находится напротив шумной улицы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire’s flat is a ___ flat with only one room.',
    blankAnswers: ['studio'],
    options: ['studio', 'hotel', 'school', 'garage'],
    answer: 'studio',
    answerTranslation: L(
      'Claire의 집은 방이 하나뿐인 스튜디오형 아파트예요.',
      'Clairening uyi faqat bitta xonali studio kvartira.',
      'Claire’s flat is a studio flat with only one room.',
      'Квартира Клэр — студия всего с одной комнатой.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'flat'],
  },

  en_s2u4_n2_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire does not have a ___.',
    blankAnswers: ['dishwasher'],
    options: ['dishwasher', 'fridge', 'sink', 'cooker'],
    answer: 'dishwasher',
    answerTranslation: L(
      'Claire에게는 식기세척기가 없어요.',
      'Claireda idish yuvish mashinasi yo‘q.',
      'Claire does not have a dishwasher.',
      'У Клэр нет посудомоечной машины.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'appliances'],
  },

  en_s2u4_n2_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire does not have a washing ___.',
    blankAnswers: ['machine'],
    options: ['machine', 'carpet', 'shelf', 'garage'],
    answer: 'machine',
    answerTranslation: L(
      'Claire에게는 세탁기가 없어요.',
      'Claireda kir yuvish mashinasi yo‘q.',
      'Claire does not have a washing machine.',
      'У Клэр нет стиральной машины.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'appliances'],
  },

  en_s2u4_n2_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire goes to the ___ to wash her clothes.',
    blankAnswers: ['laundrette'],
    options: ['laundrette', 'library', 'garage', 'museum'],
    answer: 'laundrette',
    answerTranslation: L(
      'Claire는 옷을 빨기 위해 셀프 세탁소에 가요.',
      'Claire kiyimlarini yuvish uchun kir yuvish joyiga boradi.',
      'Claire goes to the laundrette to wash her clothes.',
      'Клэр ходит в прачечную стирать одежду.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['claire', 'laundrette'],
  },

  en_s2u4_n2_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire can see the East ___ from the window.',
    blankAnswers: ['River'],
    options: ['River', 'Garage', 'Shelf', 'Kitchen'],
    answer: 'River',
    answerTranslation: L(
      'Claire는 창문에서 East River를 볼 수 있어요.',
      'Claire derazadan East Riverni ko‘ra oladi.',
      'Claire can see the East River from the window.',
      'Из окна Клэр видит Ист-Ривер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['claire', 'reading'],
  },

  en_s2u4_n2_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where is Claire’s flat?' }],
    options: [
      'On the fourth floor.',
      'In a railway station.',
      'Under a river.',
      'In a museum.',
    ],
    answer: 'On the fourth floor.',
    answerTranslation: L(
      '4층에 있어요.',
      'To‘rtinchi qavatda.',
      'On the fourth floor.',
      'На четвёртом этаже.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['claire', 'reading'],
  },

  en_s2u4_n2_036_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How many rooms are there?' }],
    options: [
      'There is only one room.',
      'There are ten rooms.',
      'There is no kitchen.',
      'There are two buildings.',
    ],
    answer: 'There is only one room.',
    answerTranslation: L(
      '방은 하나뿐이에요.',
      'Faqat bitta xona bor.',
      'There is only one room.',
      'Есть только одна комната.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['claire', 'reading'],
  },

  en_s2u4_n2_037_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'flat', 'is', 'on', 'the', 'fourth', 'floor'],
    answer: 'The flat is on the fourth floor',
    audioText: 'The flat is on the fourth floor.',
    answerTranslation: L(
      '아파트는 4층에 있어요.',
      'Kvartira to‘rtinchi qavatda.',
      'The flat is on the fourth floor.',
      'Квартира находится на четвёртом этаже.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['claire'],
  },

  en_s2u4_n2_038_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'There',
      'is',
      'an',
      'armchair',
      'in',
      'front',
      'of',
      'the',
      'window',
    ],
    answer: 'There is an armchair in front of the window',
    answerTranslation: L(
      '창문 앞에 안락의자가 있어요.',
      'Deraza oldida kreslo bor.',
      'There is an armchair in front of the window.',
      'Перед окном стоит кресло.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 2,
    tags: ['claire', 'prepositions'],
  },

  en_s2u4_n2_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Claire has a studio flat with a bed, a kitchen, an armchair, a table and a television.',
    audioText:
      'Claire has a studio flat with a bed, a kitchen, an armchair, a table and a television.',
    answerTranslation: L(
      'Claire의 스튜디오형 아파트에는 침대, 주방, 안락의자, 탁자와 텔레비전이 있어요.',
      'Clairening studio kvartirasida karavot, oshxona, kreslo, stol va televizor bor.',
      'Claire has a studio flat with a bed, a kitchen, an armchair, a table and a television.',
      'В студии Клэр есть кровать, кухня, кресло, стол и телевизор.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['claire', 'review'],
  },

  en_s2u4_n2_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Claire does not have a dishwasher or a washing machine, so she goes to the laundrette.',
    audioText:
      'Claire does not have a dishwasher or a washing machine, so she goes to the laundrette.',
    answerTranslation: L(
      'Claire에게는 식기세척기와 세탁기가 없어서 셀프 세탁소에 가요.',
      'Claireda idish yuvish mashinasi yoki kir yuvish mashinasi yo‘q, shuning uchun u kir yuvish joyiga boradi.',
      'Claire does not have a dishwasher or a washing machine, so she goes to the laundrette.',
      'У Клэр нет посудомоечной и стиральной машины, поэтому она ходит в прачечную.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['claire', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Articles a / an / the / no article
  // ===========================================================

  en_s2u4_n2_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is ___ flat.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      '그것은 아파트예요.',
      'Bu kvartira.',
      'It is a flat.',
      'Это квартира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'a-an'],
  },

  en_s2u4_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is ___ Indian restaurant.',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      '인도 식당이 하나 있어요.',
      'Hind restorani bor.',
      'There is an Indian restaurant.',
      'Есть индийский ресторан.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'a-an'],
  },

  en_s2u4_n2_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is ___ armchair near the window.',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      '창문 근처에 안락의자가 하나 있어요.',
      'Deraza yaqinida kreslo bor.',
      'There is an armchair near the window.',
      'Рядом с окном есть кресло.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'a-an'],
  },

  en_s2u4_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Claire lives in ___ building.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      'Claire는 한 건물에 살아요.',
      'Claire bir binoda yashaydi.',
      'Claire lives in a building.',
      'Клэр живёт в здании.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'a-an'],
  },

  en_s2u4_n2_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My flat is in ___ centre of the city.',
    blankAnswers: ['the'],
    options: ['the', 'a', 'an', '–'],
    answer: 'the',
    answerTranslation: L(
      '제 아파트는 도시 중심에 있어요.',
      'Kvartiram shahar markazida.',
      'My flat is in the centre of the city.',
      'Моя квартира находится в центре города.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'the'],
  },

  en_s2u4_n2_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are ___ shops and restaurants around me.',
    blankAnswers: ['–'],
    options: ['–', 'the', 'a', 'an'],
    answer: '–',
    answerTranslation: L(
      '제 주변에 가게와 식당들이 있어요.',
      'Atrofimda do‘konlar va restoranlar bor.',
      'There are shops and restaurants around me.',
      'Вокруг меня есть магазины и рестораны.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'no-article'],
  },

  en_s2u4_n2_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My flat is near ___ East River.',
    blankAnswers: ['the'],
    options: ['the', 'a', 'an', '–'],
    answer: 'the',
    answerTranslation: L(
      '제 아파트는 East River 근처에 있어요.',
      'Kvartiram East River yaqinida.',
      'My flat is near the East River.',
      'Моя квартира находится рядом с Ист-Ривер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'the'],
  },

  en_s2u4_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I live in ___ New York.',
    blankAnswers: ['–'],
    options: ['–', 'the', 'a', 'an'],
    answer: '–',
    answerTranslation: L(
      '저는 New York에 살아요.',
      'Men New Yorkda yashayman.',
      'I live in New York.',
      'Я живу в Нью-Йорке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'no-article'],
  },

  en_s2u4_n2_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mumbai is ___ interesting city to visit.',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      'Mumbai는 방문하기 흥미로운 도시예요.',
      'Mumbai tashrif buyurish uchun qiziqarli shahar.',
      'Mumbai is an interesting city to visit.',
      'Мумбаи — интересный город для посещения.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is there ___ elevator in your building?',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      '건물에 엘리베이터가 있나요?',
      'Binoingizda lift bormi?',
      'Is there an elevator in your building?',
      'В вашем здании есть лифт?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My parents have ___ house near the beach.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      '부모님은 해변 근처에 집이 있어요.',
      'Ota-onamning sohil yaqinida uyi bor.',
      'My parents have a house near the beach.',
      'У моих родителей есть дом возле пляжа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I have ___ big sofa in my living room.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      '거실에 큰 소파가 있어요.',
      'Mehmonxonamda katta divan bor.',
      'I have a big sofa in my living room.',
      'В моей гостиной есть большой диван.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'You can visit ___ opal mine in Australia.',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      '호주에서 오팔 광산을 방문할 수 있어요.',
      'Avstraliyada opal koniga tashrif buyurishingiz mumkin.',
      'You can visit an opal mine in Australia.',
      'В Австралии можно посетить опаловую шахту.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is there ___ metro station near here?',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      '이 근처에 지하철역이 있나요?',
      'Bu yer yaqinida metro bekati bormi?',
      'Is there a metro station near here?',
      'Здесь рядом есть станция метро?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There isn’t ___ airport in my town.',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      '우리 마을에는 공항이 없어요.',
      'Shahrimda aeroport yo‘q.',
      'There isn’t an airport in my town.',
      'В моём городе нет аэропорта.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There’s ___ park in the town centre.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      '시내 중심에 공원이 있어요.',
      'Shahar markazida park bor.',
      'There’s a park in the town centre.',
      'В центре города есть парк.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'workbook'],
  },

  en_s2u4_n2_057_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The capital of Thailand is ___ Bangkok.',
    blankAnswers: ['–'],
    options: ['–', 'the', 'a', 'an'],
    answer: '–',
    answerTranslation: L(
      '태국의 수도는 Bangkok이에요.',
      'Tailand poytaxti Bangkok.',
      'The capital of Thailand is Bangkok.',
      'Столица Таиланда — Бангкок.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'no-article'],
  },

  en_s2u4_n2_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['There', 'is', 'an', 'elevator', 'in', 'the', 'building'],
    answer: 'There is an elevator in the building',
    audioText: 'There is an elevator in the building.',
    answerTranslation: L(
      '건물에 엘리베이터가 있어요.',
      'Binoda lift bor.',
      'There is an elevator in the building.',
      'В здании есть лифт.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['articles'],
  },

  en_s2u4_n2_059_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My flat is in the centre of the city.',
    audioText: 'My flat is in the centre of the city.',
    answerI18n: L(
      '제 아파트는 도시 중심에 있어요',
      'Kvartiram shahar markazida',
      'My flat is in the centre of the city',
      'Моя квартира находится в центре города',
    ),
    options: ['My', 'flat', 'is', 'in', 'the', 'centre', 'of', 'the', 'city.'],
    optionsI18n: {
      ko: ['제', '아파트는', '도시', '중심에', '있어요'],
      uz: ['Kvartiram', 'shahar', 'markazida'],
      en: ['My', 'flat', 'is', 'in', 'the', 'centre', 'of', 'the', 'city.'],
      ru: ['Моя', 'квартира', 'находится', 'в', 'центре', 'города'],
    },
    answerTranslation: L(
      '제 아파트는 도시 중심에 있어요.',
      'Kvartiram shahar markazida.',
      'My flat is in the centre of the city.',
      'Моя квартира находится в центре города.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['articles'],
  },

  en_s2u4_n2_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Use a or an when something is mentioned for the first time, and use the when the listener knows which thing you mean.',
    audioText:
      'Use a or an when something is mentioned for the first time, and use the when the listener knows which thing you mean.',
    answerTranslation: L(
      '처음 언급하는 단수 명사에는 a 또는 an을 사용하고, 어떤 것을 말하는지 상대방이 알고 있을 때 the를 사용해요.',
      'Biror narsani birinchi marta aytganda a yoki an, qaysi narsani nazarda tutayotganingiz ma’lum bo‘lsa the ishlatiladi.',
      'Use a or an when something is mentioned for the first time, and use the when the listener knows which thing you mean.',
      'Используйте a или an при первом упоминании, а the — когда понятно, о каком предмете идёт речь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Schwa /ə/ and 4.2 review
  // ===========================================================

  en_s2u4_n2_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The unstressed article “a” is often pronounced with the ___ sound.',
    blankAnswers: ['schwa'],
    options: ['schwa', 'long e', 'long i', 'silent'],
    answer: 'schwa',
    answerTranslation: L(
      '강세가 없는 a는 자주 schwa 소리로 발음돼요.',
      'Urg‘usiz a ko‘pincha schwa tovushi bilan aytiladi.',
      'The unstressed article “a” is often pronounced with the schwa sound.',
      'Безударный артикль a часто произносится со звуком schwa.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u4_n2_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The schwa sound is written as ___.',
    blankAnswers: ['/ə/'],
    options: ['/ə/', '/iː/', '/uː/', '/aɪ/'],
    answer: '/ə/',
    answerTranslation: L(
      'schwa 소리는 /ə/로 표시해요.',
      'Schwa tovushi /ə/ bilan belgilanadi.',
      'The schwa sound is written as /ə/.',
      'Звук schwa обозначается как /ə/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa'],
  },

  en_s2u4_n2_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s in the centre of the city.',
    audioText: 'It’s in the centre of the city.',
    answerTranslation: L(
      '그것은 도시 중심에 있어요.',
      'U shahar markazida.',
      'It’s in the centre of the city.',
      'Это находится в центре города.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u4_n2_064_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s near a theatre.',
    audioText: 'It’s near a theatre.',
    answerTranslation: L(
      '그것은 극장 근처에 있어요.',
      'U teatr yaqinida.',
      'It’s near a theatre.',
      'Это рядом с театром.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u4_n2_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s difficult to find a flat.',
    audioText: 'It’s difficult to find a flat.',
    answerTranslation: L(
      '아파트를 구하기 어려워요.',
      'Kvartira topish qiyin.',
      'It’s difficult to find a flat.',
      'Трудно найти квартиру.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'pronunciation'],
  },

  en_s2u4_n2_066_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My house is next to the park.',
    audioText: 'My house is next to the park.',
    answerTranslation: L(
      '우리 집은 공원 옆에 있어요.',
      'Uyim park yonida.',
      'My house is next to the park.',
      'Мой дом находится рядом с парком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'workbook'],
  },

  en_s2u4_n2_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'There’s a supermarket opposite the cinema.',
    audioText: 'There’s a supermarket opposite the cinema.',
    answerTranslation: L(
      '영화관 맞은편에 슈퍼마켓이 있어요.',
      'Kinoteatr ro‘parasida supermarket bor.',
      'There’s a supermarket opposite the cinema.',
      'Напротив кинотеатра есть супермаркет.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'workbook'],
  },

  en_s2u4_n2_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do you have a map of the city?',
    audioText: 'Do you have a map of the city?',
    answerTranslation: L(
      '도시 지도가 있나요?',
      'Shahar xaritasi bormi?',
      'Do you have a map of the city?',
      'У вас есть карта города?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'workbook'],
  },

  en_s2u4_n2_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is there an airport near your town?',
    audioText: 'Is there an airport near your town?',
    answerTranslation: L(
      '당신의 마을 근처에 공항이 있나요?',
      'Shahringiz yaqinida aeroport bormi?',
      'Is there an airport near your town?',
      'Рядом с вашим городом есть аэропорт?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['schwa', 'workbook'],
  },

  en_s2u4_n2_070_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The students are in a classroom on the second floor.',
    audioText: 'The students are in a classroom on the second floor.',
    answerTranslation: L(
      '학생들은 2층 교실에 있어요.',
      'Talabalar ikkinchi qavatdagi sinfxonada.',
      'The students are in a classroom on the second floor.',
      'Студенты находятся в аудитории на втором этаже.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'workbook'],
  },

  en_s2u4_n2_071_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '문장에서 강세가 있는 핵심 단어를 연결하세요.',
      'Gapdagi urg‘uli asosiy so‘zlarni moslang.',
      'Match each sentence with its stressed content words.',
      'Соедините предложение с ударными смысловыми словами.',
    ),
    pairs: [
      {
        text: 'My house is next to the park.',
        native: 'house / next / park',
        nativeI18n: L(
          'house / next / park',
          'house / next / park',
          'house / next / park',
          'house / next / park',
        ),
      },
      {
        text: 'There’s a supermarket opposite the cinema.',
        native: 'supermarket / opposite / cinema',
        nativeI18n: L(
          'supermarket / opposite / cinema',
          'supermarket / opposite / cinema',
          'supermarket / opposite / cinema',
          'supermarket / opposite / cinema',
        ),
      },
      {
        text: 'Do you have a map of the city?',
        native: 'have / map / city',
        nativeI18n: L(
          'have / map / city',
          'have / map / city',
          'have / map / city',
          'have / map / city',
        ),
      },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['schwa', 'stress'],
  },

  en_s2u4_n2_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Amsterdam is ___ capital city of the Netherlands.',
    blankAnswers: ['the'],
    options: ['the', 'a', 'an', '–'],
    answer: 'the',
    answerTranslation: L(
      'Amsterdam은 네덜란드의 수도예요.',
      'Amsterdam Niderlandiyaning poytaxti.',
      'Amsterdam is the capital city of the Netherlands.',
      'Амстердам — столица Нидерландов.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'amsterdam'],
  },

  en_s2u4_n2_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Amsterdam is ___ great place to spend time.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      'Amsterdam은 시간을 보내기 좋은 곳이에요.',
      'Amsterdam vaqt o‘tkazish uchun ajoyib joy.',
      'Amsterdam is a great place to spend time.',
      'Амстердам — прекрасное место для отдыха.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['articles', 'amsterdam'],
  },

  en_s2u4_n2_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It has ___ big railway station and ___ airport.',
    blankAnswers: ['a', 'an'],
    options: ['a / an', 'an / a', 'the / the', '– / –'],
    answer: 'a / an',
    answerTranslation: L(
      '큰 기차역과 공항이 있어요.',
      'U yerda katta temir yo‘l vokzali va aeroport bor.',
      'It has a big railway station and an airport.',
      'Там есть большой вокзал и аэропорт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'amsterdam'],
  },

  en_s2u4_n2_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are ___ shops and ___ restaurants.',
    blankAnswers: ['–', '–'],
    options: ['– / –', 'the / the', 'a / an', 'an / a'],
    answer: '– / –',
    answerTranslation: L(
      '가게와 식당들이 있어요.',
      'Do‘konlar va restoranlar bor.',
      'There are shops and restaurants.',
      'Есть магазины и рестораны.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['articles', 'amsterdam'],
  },

  en_s2u4_n2_076_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['My', 'house', 'is', 'next', 'to', 'the', 'park'],
    answer: 'My house is next to the park',
    audioText: 'My house is next to the park.',
    answerTranslation: L(
      '우리 집은 공원 옆에 있어요.',
      'Uyim park yonida.',
      'My house is next to the park.',
      'Мой дом находится рядом с парком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prepositions', 'review'],
  },

  en_s2u4_n2_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'is', 'a', 'supermarket', 'opposite', 'my', 'house'],
    answer: 'There is a supermarket opposite my house',
    answerTranslation: L(
      '우리 집 맞은편에 슈퍼마켓이 있어요.',
      'Uyimning ro‘parasida supermarket bor.',
      'There is a supermarket opposite my house.',
      'Напротив моего дома есть супермаркет.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['prepositions', 'review'],
  },

  en_s2u4_n2_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My flat is on the fifth floor.',
    audioText: 'My flat is on the fifth floor.',
    answerI18n: L(
      '제 아파트는 5층에 있어요',
      'Kvartiram beshinchi qavatda',
      'My flat is on the fifth floor',
      'Моя квартира находится на пятом этаже',
    ),
    options: ['My', 'flat', 'is', 'on', 'the', 'fifth', 'floor.'],
    optionsI18n: {
      ko: ['제', '아파트는', '5층에', '있어요'],
      uz: ['Kvartiram', 'beshinchi', 'qavatda'],
      en: ['My', 'flat', 'is', 'on', 'the', 'fifth', 'floor.'],
      ru: ['Моя', 'квартира', 'находится', 'на', 'пятом', 'этаже'],
    },
    answerTranslation: L(
      '제 아파트는 5층에 있어요.',
      'Kvartiram beshinchi qavatda.',
      'My flat is on the fifth floor.',
      'Моя квартира находится на пятом этаже.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['home', 'review'],
  },

  en_s2u4_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'My favourite room has a bed, a table and an armchair. The armchair is next to the bed.',
    audioText:
      'My favourite room has a bed, a table and an armchair. The armchair is next to the bed.',
    answerTranslation: L(
      '제가 가장 좋아하는 방에는 침대, 탁자와 안락의자가 있어요. 안락의자는 침대 옆에 있어요.',
      'Sevimli xonamda karavot, stol va kreslo bor. Kreslo karavot yonida.',
      'My favourite room has a bed, a table and an armchair. The armchair is next to the bed.',
      'В моей любимой комнате есть кровать, стол и кресло. Кресло стоит рядом с кроватью.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['home', 'speaking'],
  },

  en_s2u4_n2_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 4.2, we describe rooms and furniture, use prepositions of place, choose a, an and the, and practise the schwa sound.',
    audioText:
      'In Unit 4.2, we describe rooms and furniture, use prepositions of place, choose a, an and the, and practise the schwa sound.',
    answerTranslation: L(
      'Unit 4.2에서는 방과 가구를 설명하고, 위치 전치사를 사용하며, a·an·the를 선택하고 schwa 소리를 연습해요.',
      'Unit 4.2 da xonalar va mebellarni tasvirlaymiz, joy predloglarini ishlatamiz, a, an va the ni tanlaymiz va schwa tovushini mashq qilamiz.',
      'In Unit 4.2, we describe rooms and furniture, use prepositions of place, choose a, an and the, and practise the schwa sound.',
      'В Unit 4.2 мы описываем комнаты и мебель, используем предлоги места, артикли a, an, the и тренируем звук schwa.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 2
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE2 = {
  title: L('내가 사는 곳', 'Men yashaydigan joy', 'Where I live', 'Где я живу'),
  section: 2,
  unit: 4,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L(
        '방, 가구와 위치',
        'Xonalar, mebel va joylashuv',
        'Rooms, furniture and position',
        'Комнаты, мебель и расположение',
      ),
      description: L(
        '집의 방과 가구를 익히고 behind, opposite, next to, above, in front of, between, under, on으로 위치를 설명해요.',
        'Uy xonalari va mebellarni o‘rganib, behind, opposite, next to, above, in front of, between, under va on bilan joylashuvni tasvirlaysiz.',
        'Learn rooms and furniture and describe position with the Unit 4.2 prepositions.',
        'Изучаем комнаты, мебель и предлоги места из Unit 4.2.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u4_n2_001_word_matching',
        'en_s2u4_n2_002_word_matching',
        'en_s2u4_n2_003_word_matching',
        'en_s2u4_n2_004_fill_in_blank',
        'en_s2u4_n2_005_fill_in_blank',
        'en_s2u4_n2_006_fill_in_blank',
        'en_s2u4_n2_007_fill_in_blank',
        'en_s2u4_n2_008_fill_in_blank',
        'en_s2u4_n2_009_fill_in_blank',
        'en_s2u4_n2_010_fill_in_blank',
        'en_s2u4_n2_011_fill_in_blank',
        'en_s2u4_n2_012_fill_in_blank',
        'en_s2u4_n2_013_fill_in_blank',
        'en_s2u4_n2_014_fill_in_blank',
        'en_s2u4_n2_015_fill_in_blank',
        'en_s2u4_n2_016_word_arrange',
        'en_s2u4_n2_017_translate_builder',
        'en_s2u4_n2_018_sentence_builder',
        'en_s2u4_n2_019_speaking',
        'en_s2u4_n2_020_speaking',
      ],
    },

    {
      title: L(
        'Claire의 아파트',
        'Clairening kvartirasi',
        'Claire’s flat',
        'Квартира Клэр',
      ),
      description: L(
        'Claire의 스튜디오형 아파트 설명을 통해 가구, 가전제품과 위치 전치사를 실제 문맥에서 연습해요.',
        'Clairening studio kvartirasi orqali mebel, maishiy texnika va joy predloglarini matn ichida mashq qilasiz.',
        'Use Claire’s studio flat description to practise furniture and prepositions in context.',
        'Практикуем мебель и предлоги места по описанию квартиры Клэр.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u4_n2_021_fill_in_blank',
        'en_s2u4_n2_022_fill_in_blank',
        'en_s2u4_n2_023_fill_in_blank',
        'en_s2u4_n2_024_fill_in_blank',
        'en_s2u4_n2_025_fill_in_blank',
        'en_s2u4_n2_026_fill_in_blank',
        'en_s2u4_n2_027_fill_in_blank',
        'en_s2u4_n2_028_fill_in_blank',
        'en_s2u4_n2_029_fill_in_blank',
        'en_s2u4_n2_030_fill_in_blank',
        'en_s2u4_n2_031_fill_in_blank',
        'en_s2u4_n2_032_fill_in_blank',
        'en_s2u4_n2_033_fill_in_blank',
        'en_s2u4_n2_034_fill_in_blank',
        'en_s2u4_n2_035_dialog_complete',
        'en_s2u4_n2_036_dialog_complete',
        'en_s2u4_n2_037_word_arrange',
        'en_s2u4_n2_038_translate_builder',
        'en_s2u4_n2_039_speaking',
        'en_s2u4_n2_040_speaking',
      ],
    },

    {
      title: L(
        '관사 a, an, the',
        'a, an, the artikllari',
        'Articles a, an and the',
        'Артикли a, an и the',
      ),
      description: L(
        '처음 언급하는 단수 명사에는 a/an을, 이미 특정된 대상에는 the를 사용하고 도시·복수 일반명사에서 관사를 쓰지 않는 경우도 연습해요.',
        'Birinchi marta aytilgan birlik otlarda a/an, ma’lum narsalarda the va ayrim shahar yoki umumiy ko‘plik otlarda artiklsiz shaklni mashq qilasiz.',
        'Practise a, an, the and cases where no article is used.',
        'Практикуем a, an, the и случаи без артикля.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u4_n2_041_fill_in_blank',
        'en_s2u4_n2_042_fill_in_blank',
        'en_s2u4_n2_043_fill_in_blank',
        'en_s2u4_n2_044_fill_in_blank',
        'en_s2u4_n2_045_fill_in_blank',
        'en_s2u4_n2_046_fill_in_blank',
        'en_s2u4_n2_047_fill_in_blank',
        'en_s2u4_n2_048_fill_in_blank',
        'en_s2u4_n2_049_fill_in_blank',
        'en_s2u4_n2_050_fill_in_blank',
        'en_s2u4_n2_051_fill_in_blank',
        'en_s2u4_n2_052_fill_in_blank',
        'en_s2u4_n2_053_fill_in_blank',
        'en_s2u4_n2_054_fill_in_blank',
        'en_s2u4_n2_055_fill_in_blank',
        'en_s2u4_n2_056_fill_in_blank',
        'en_s2u4_n2_057_fill_in_blank',
        'en_s2u4_n2_058_word_arrange',
        'en_s2u4_n2_059_sentence_builder',
        'en_s2u4_n2_060_speaking',
      ],
    },

    {
      title: L(
        'schwa /ə/와 종합 연습',
        'Schwa /ə/ va umumiy mashq',
        'The schwa /ə/ and review',
        'Schwa /ə/ и повторение',
      ),
      description: L(
        'a/an/the가 자연스러운 문장에서 약하게 발음되는 schwa /ə/ 소리를 듣고, Workbook의 Amsterdam 관사 활동까지 함께 복습해요.',
        'Tabiiy nutqda a/an/the ning schwa /ə/ bilan kuchsiz talaffuzini tinglab, Amsterdam haqidagi artikl mashqini ham takrorlaysiz.',
        'Practise the schwa /ə/ in natural speech and review articles using the Amsterdam activity.',
        'Тренируем schwa /ə/ в естественной речи и повторяем артикли на тексте об Амстердаме.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 4,
      questions: [
        'en_s2u4_n2_061_fill_in_blank',
        'en_s2u4_n2_062_fill_in_blank',
        'en_s2u4_n2_063_speaking',
        'en_s2u4_n2_064_speaking',
        'en_s2u4_n2_065_speaking',
        'en_s2u4_n2_066_speaking',
        'en_s2u4_n2_067_speaking',
        'en_s2u4_n2_068_speaking',
        'en_s2u4_n2_069_speaking',
        'en_s2u4_n2_070_speaking',
        'en_s2u4_n2_071_word_matching',
        'en_s2u4_n2_072_fill_in_blank',
        'en_s2u4_n2_073_fill_in_blank',
        'en_s2u4_n2_074_fill_in_blank',
        'en_s2u4_n2_075_fill_in_blank',
        'en_s2u4_n2_076_word_arrange',
        'en_s2u4_n2_077_translate_builder',
        'en_s2u4_n2_078_sentence_builder',
        'en_s2u4_n2_079_speaking',
        'en_s2u4_n2_080_speaking',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 4 · Node 3
// 4.3 Vocabulary and skills development
//
// Coverage
// - pronoun referencing
//   it / them / they / they're
// - understanding what a pronoun refers to
//
// Reading:
// - Are you a tidy worker or a messy worker?
// - Officegirl91
// - Navigator9
// - Terry13 / Mala
//
// Vocabulary:
// - opposite adjectives
// - difficult ↔ easy
// - big ↔ small
// - new ↔ old
// - good ↔ bad
// - clean ↔ dirty
// - long ↔ short
// - heavy ↔ light
// - quiet ↔ noisy
// - ugly ↔ beautiful
// - old-fashioned ↔ modern
// - expensive ↔ cheap
// - terrible ↔ fantastic
// - tidy ↔ messy
//
// Additional reading vocabulary:
// - desk / cupboard / housemate
// - battery / scissors / envelope / sandwich
// - lazy / organised
//
// IMPORTANT:
// *_WORDS에는 한 단어 headword만 등록.
// "old-fashioned"은 하나의 hyphenated lexical item으로 처리.
//
// Basic adjectives already used earlier are reused in questions.
// beautiful / quiet / terrible 등 기존 WORD는 중복 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE3_WORDS = [
  {
    code: 'en-adj-tidy',
    english: 'tidy',
    senseKey: 'clean-and-organised',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '깔끔한; 정돈된',
      'tartibli',
      'clean and arranged in an organised way',
      'аккуратный',
    ),
    examples: [
      {
        english: 'My desk is very tidy.',
        translations: L(
          '제 책상은 아주 깔끔해요.',
          'Stolim juda tartibli.',
          'My desk is very tidy.',
          'Мой стол очень аккуратный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtaɪdi/',
      ttsText: 'tidy',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-messy',
    english: 'messy',
    senseKey: 'untidy-and-disorganised',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '어질러진; 지저분한',
      'tartibsiz',
      'untidy or not organised',
      'неаккуратный',
    ),
    examples: [
      {
        english: 'Her room is very messy.',
        translations: L(
          '그녀의 방은 아주 어질러져 있어요.',
          'Uning xonasi juda tartibsiz.',
          'Her room is very messy.',
          'Её комната очень неаккуратная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmesi/',
      ttsText: 'messy',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-dirty',
    english: 'dirty',
    senseKey: 'not-clean',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('더러운', 'iflos', 'not clean', 'грязный'),
    examples: [
      {
        english: 'Those clothes are dirty.',
        translations: L(
          '그 옷들은 더러워요.',
          'U kiyimlar iflos.',
          'Those clothes are dirty.',
          'Эта одежда грязная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɜːti/',
      ttsText: 'dirty',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-heavy',
    english: 'heavy',
    senseKey: 'weighing-a-lot',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('무거운', 'og‘ir', 'weighing a lot', 'тяжёлый'),
    examples: [
      {
        english: 'This box is very heavy.',
        translations: L(
          '이 상자는 아주 무거워요.',
          'Bu quti juda og‘ir.',
          'This box is very heavy.',
          'Эта коробка очень тяжёлая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhevi/',
      ttsText: 'heavy',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-light',
    english: 'light',
    senseKey: 'not-heavy',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('가벼운', 'yengil', 'not heavy', 'лёгкий'),
    examples: [
      {
        english: 'This bag is light.',
        translations: L(
          '이 가방은 가벼워요.',
          'Bu sumka yengil.',
          'This bag is light.',
          'Эта сумка лёгкая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/laɪt/',
      ttsText: 'light',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-noisy',
    english: 'noisy',
    senseKey: 'making-a-lot-of-noise',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('시끄러운', 'shovqinli', 'making a lot of noise', 'шумный'),
    examples: [
      {
        english: 'The street is very noisy.',
        translations: L(
          '그 거리는 아주 시끄러워요.',
          'Ko‘cha juda shovqinli.',
          'The street is very noisy.',
          'Улица очень шумная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈnɔɪzi/',
      ttsText: 'noisy',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-ugly',
    english: 'ugly',
    senseKey: 'not-attractive',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '못생긴; 보기 싫은',
      'xunuk',
      'not attractive or beautiful',
      'некрасивый',
    ),
    examples: [
      {
        english: 'I think the building is ugly.',
        translations: L(
          '저는 그 건물이 못생겼다고 생각해요.',
          'Menimcha, bino xunuk.',
          'I think the building is ugly.',
          'Я думаю, что здание некрасивое.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈʌɡli/',
      ttsText: 'ugly',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adj-old-fashioned',
    english: 'old-fashioned',
    senseKey: 'not-modern-in-style',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '구식의',
      'eskicha',
      'not modern in style or ideas',
      'старомодный',
    ),
    examples: [
      {
        english: 'My mother is very old-fashioned.',
        translations: L(
          '우리 어머니는 아주 구식이에요.',
          'Onam juda eskicha fikrlaydi.',
          'My mother is very old-fashioned.',
          'Моя мама очень старомодная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌəʊldˈfæʃənd/',
      ttsText: 'old-fashioned',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adj-modern',
    english: 'modern',
    senseKey: 'using-current-styles-or-ideas',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '현대적인',
      'zamonaviy',
      'using current styles, ideas or technology',
      'современный',
    ),
    examples: [
      {
        english: 'Their flat is very modern.',
        translations: L(
          '그들의 아파트는 아주 현대적이에요.',
          'Ularning kvartirasi juda zamonaviy.',
          'Their flat is very modern.',
          'Их квартира очень современная.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmɒdən/',
      ttsText: 'modern',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-expensive',
    english: 'expensive',
    senseKey: 'costing-a-lot-of-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('비싼', 'qimmat', 'costing a lot of money', 'дорогой'),
    examples: [
      {
        english: 'The computer is expensive.',
        translations: L(
          '그 컴퓨터는 비싸요.',
          'Kompyuter qimmat.',
          'The computer is expensive.',
          'Компьютер дорогой.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪkˈspensɪv/',
      ttsText: 'expensive',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adj-cheap',
    english: 'cheap',
    senseKey: 'not-costing-much-money',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L('싼', 'arzon', 'not costing much money', 'дешёвый'),
    examples: [
      {
        english: 'It is a cheap place to live.',
        translations: L(
          '그곳은 살기 저렴한 곳이에요.',
          'U yashash uchun arzon joy.',
          'It is a cheap place to live.',
          'Это дешёвое место для жизни.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃiːp/',
      ttsText: 'cheap',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-fantastic',
    english: 'fantastic',
    senseKey: 'extremely-good',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '환상적인; 아주 좋은',
      'ajoyib',
      'extremely good',
      'фантастический',
    ),
    examples: [
      {
        english: 'The actors were fantastic.',
        translations: L(
          '배우들이 정말 훌륭했어요.',
          'Aktyorlar ajoyib edi.',
          'The actors were fantastic.',
          'Актёры были великолепны.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fænˈtæstɪk/',
      ttsText: 'fantastic',
    },
    tags: ['adjectives', 'opposites', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-adj-lazy',
    english: 'lazy',
    senseKey: 'not-wanting-to-work-or-make-effort',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '게으른',
      'dangasa',
      'not wanting to work or make an effort',
      'ленивый',
    ),
    examples: [
      {
        english: 'Her housemates are very lazy.',
        translations: L(
          '그녀의 하우스메이트들은 아주 게을러요.',
          'Uning uy sheriklari juda dangasa.',
          'Her housemates are very lazy.',
          'Её соседи по дому очень ленивые.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈleɪzi/',
      ttsText: 'lazy',
    },
    tags: ['adjectives', 'reading', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adj-organised',
    english: 'organised',
    senseKey: 'arranged-neatly-and-systematically',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '정리된; 체계적인',
      'tartibli',
      'arranged neatly and systematically',
      'организованный',
    ),
    examples: [
      {
        english: 'She keeps her bedroom tidy and organised.',
        translations: L(
          '그녀는 침실을 깔끔하고 정리된 상태로 유지해요.',
          'U yotoqxonasini ozoda va tartibli saqlaydi.',
          'She keeps her bedroom tidy and organised.',
          'Она держит спальню чистой и организованной.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɔːɡənaɪzd/',
      ttsText: 'organised',
    },
    tags: ['adjectives', 'reading', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-desk',
    english: 'desk',
    senseKey: 'table-used-for-work-or-study',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '책상',
      'yozuv stoli',
      'a table used for working or studying',
      'письменный стол',
    ),
    examples: [
      {
        english: 'My desk is very messy.',
        translations: L(
          '제 책상은 아주 지저분해요.',
          'Stolim juda tartibsiz.',
          'My desk is very messy.',
          'Мой стол очень неаккуратный.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/desk/',
      ttsText: 'desk',
    },
    tags: ['home', 'office', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-cupboard',
    english: 'cupboard',
    senseKey: 'furniture-with-shelves-and-door',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '찬장; 수납장',
      'shkaf',
      'a piece of furniture with shelves and a door for storing things',
      'шкаф',
    ),
    examples: [
      {
        english: 'She puts the books in the cupboard.',
        translations: L(
          '그녀는 책을 수납장에 넣어요.',
          'U kitoblarni shkafga qo‘yadi.',
          'She puts the books in the cupboard.',
          'Она кладёт книги в шкаф.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkʌbəd/',
      ttsText: 'cupboard',
    },
    tags: ['home', 'furniture', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-housemate',
    english: 'housemate',
    senseKey: 'person-sharing-house',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '하우스메이트; 함께 사는 사람',
      'uy sherigi',
      'a person who lives in the same house as you',
      'сосед по дому',
    ),
    examples: [
      {
        english: 'My housemates are fun.',
        translations: L(
          '제 하우스메이트들은 재미있어요.',
          'Uy sheriklarim quvnoq.',
          'My housemates are fun.',
          'Мои соседи по дому весёлые.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈhaʊsmeɪt/',
      ttsText: 'housemate',
    },
    tags: ['people', 'home', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-battery',
    english: 'battery',
    senseKey: 'device-storing-electric-energy',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '배터리; 건전지',
      'batareya',
      'a small device that stores electrical energy',
      'батарейка',
    ),
    examples: [
      {
        english: 'There are batteries on her desk.',
        translations: L(
          '그녀의 책상 위에 배터리들이 있어요.',
          'Uning stolida batareyalar bor.',
          'There are batteries on her desk.',
          'На её столе лежат батарейки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbætəri/',
      ttsText: 'battery',
    },
    tags: ['objects', 'reading', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-scissors',
    english: 'scissors',
    senseKey: 'tool-for-cutting',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '가위',
      'qaychi',
      'a tool used for cutting paper or other materials',
      'ножницы',
    ),
    examples: [
      {
        english: 'There are scissors on the desk.',
        translations: L(
          '책상 위에 가위가 있어요.',
          'Stolda qaychi bor.',
          'There are scissors on the desk.',
          'На столе есть ножницы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsɪzəz/',
      ttsText: 'scissors',
    },
    tags: ['objects', 'reading', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-envelope',
    english: 'envelope',
    senseKey: 'paper-cover-for-letter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '봉투',
      'konvert',
      'a flat paper container used for a letter',
      'конверт',
    ),
    examples: [
      {
        english: 'There are envelopes on the desk.',
        translations: L(
          '책상 위에 봉투들이 있어요.',
          'Stolda konvertlar bor.',
          'There are envelopes on the desk.',
          'На столе лежат конверты.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈenvələʊp/',
      ttsText: 'envelope',
    },
    tags: ['objects', 'reading', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-sandwich',
    english: 'sandwich',
    senseKey: 'food-between-pieces-of-bread',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '샌드위치',
      'sendvich',
      'food placed between pieces of bread',
      'сэндвич',
    ),
    examples: [
      {
        english: 'There is a cheese sandwich on her desk.',
        translations: L(
          '그녀의 책상 위에 치즈 샌드위치가 있어요.',
          'Uning stolida pishloqli sendvich bor.',
          'There is a cheese sandwich on her desk.',
          'На её столе лежит сэндвич с сыром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsænwɪdʒ/',
      ttsText: 'sandwich',
    },
    tags: ['food', 'reading', 'unit4'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S2_UNIT4_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Pronoun referencing
  // ===========================================================

  en_s2u4_n3_001_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My bedroom is very big, but I share ___ with my sister.',
    blankAnswers: ['it'],
    options: ['it', 'them', 'they', 'she'],
    answer: 'it',
    answerTranslation: L(
      '제 침실은 아주 크지만 여동생과 함께 사용해요.',
      'Yotoqxonam juda katta, lekin uni singlim bilan bo‘lishaman.',
      'My bedroom is very big, but I share it with my sister.',
      'Моя спальня очень большая, но я делю её с сестрой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_002_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'My bedroom is very big, but I share it with my sister. What does “it” refer to?',
      },
    ],
    options: ['The bedroom.', 'The sister.', 'The house.', 'The desk.'],
    answer: 'The bedroom.',
    answerTranslation: L(
      '침실을 가리켜요.',
      'Yotoqxonani bildiradi.',
      'It refers to the bedroom.',
      'Это относится к спальне.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His things are all on the floor. He never tidies ___.',
    blankAnswers: ['them'],
    options: ['them', 'it', 'him', 'they'],
    answer: 'them',
    answerTranslation: L(
      '그의 물건들은 모두 바닥에 있어요. 그는 그것들을 정리하지 않아요.',
      'Uning narsalari polda. U ularni hech qachon yig‘ishtirmaydi.',
      'His things are all on the floor. He never tidies them.',
      'Его вещи лежат на полу. Он никогда их не убирает.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_004_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'His things are all on the floor. He never tidies them. What does “them” refer to?',
      },
    ],
    options: ['His things.', 'The floor.', 'The bedroom.', 'His sister.'],
    answer: 'His things.',
    answerTranslation: L(
      '그의 물건들을 가리켜요.',
      'Uning narsalarini bildiradi.',
      'It refers to his things.',
      'Это относится к его вещам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'We’ve got two big armchairs in the living room. ___ are really comfortable.',
    blankAnswers: ['They'],
    options: ['They', 'It', 'He', 'She'],
    answer: 'They',
    answerTranslation: L(
      '거실에 큰 안락의자 두 개가 있어요. 그것들은 정말 편안해요.',
      'Mehmonxonada ikkita katta kreslo bor. Ular juda qulay.',
      'We’ve got two big armchairs in the living room. They are really comfortable.',
      'В гостиной два больших кресла. Они очень удобные.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'We’ve got two big armchairs. They’re really comfortable. What does “they” refer to?',
      },
    ],
    options: [
      'The armchairs.',
      'The living room.',
      'The people.',
      'The tables.',
    ],
    answer: 'The armchairs.',
    answerTranslation: L(
      '안락의자들을 가리켜요.',
      'Kreslolarni bildiradi.',
      'They refers to the armchairs.',
      'They относится к креслам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'That’s a beautiful picture. Where did you get ___?',
    blankAnswers: ['it'],
    options: ['it', 'them', 'they', 'him'],
    answer: 'it',
    answerTranslation: L(
      '아름다운 그림이네요. 어디서 구했어요?',
      'Bu chiroyli rasm. Uni qayerdan oldingiz?',
      'That’s a beautiful picture. Where did you get it?',
      'Какая красивая картина. Где вы её взяли?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'That’s a beautiful picture. Where did you get it? What does “it” refer to?',
      },
    ],
    options: ['The picture.', 'The room.', 'The wall.', 'The person.'],
    answer: 'The picture.',
    answerTranslation: L(
      '그림을 가리켜요.',
      'Rasmni bildiradi.',
      'It refers to the picture.',
      'Это относится к картине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Our house is quite small, but I really like ___.',
    blankAnswers: ['it'],
    options: ['it', 'them', 'they', 'her'],
    answer: 'it',
    answerTranslation: L(
      '우리 집은 꽤 작지만 저는 정말 좋아해요.',
      'Uyimiz ancha kichik, lekin men uni juda yaxshi ko‘raman.',
      'Our house is quite small, but I really like it.',
      'Наш дом довольно маленький, но он мне очень нравится.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_010_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Are those your keys?',
      },
      {
        speaker: 'user',
        text: 'No, they’re yours.',
      },
    ],
    options: [
      '“They” refers to the keys.',
      '“They” refers to the people.',
      '“They” refers to the house.',
      '“They” refers to the desk.',
    ],
    answer: '“They” refers to the keys.',
    answerTranslation: L(
      'they는 열쇠들을 가리켜요.',
      'They kalitlarni bildiradi.',
      '“They” refers to the keys.',
      'They относится к ключам.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A singular thing can often be replaced by ___.',
    blankAnswers: ['it'],
    options: ['it', 'them', 'they', 'we'],
    answer: 'it',
    answerTranslation: L(
      '단수 사물은 보통 it으로 대신할 수 있어요.',
      'Birlikdagi narsa ko‘pincha it bilan almashtiriladi.',
      'A singular thing can often be replaced by it.',
      'Предмет в единственном числе часто заменяется на it.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Plural things can often be replaced by ___ or ___.',
    blankAnswers: ['they', 'them'],
    options: ['they / them', 'it / him', 'she / her', 'I / me'],
    answer: 'they / them',
    answerTranslation: L(
      '복수 사물은 보통 they 또는 them으로 대신할 수 있어요.',
      'Ko‘plikdagi narsalar ko‘pincha they yoki them bilan almashtiriladi.',
      'Plural things can often be replaced by they or them.',
      'Предметы во множественном числе часто заменяются на they или them.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Why do writers use pronouns such as it, they and them?',
      },
    ],
    options: [
      'To avoid repeating the same noun.',
      'To make every sentence longer.',
      'To change a noun into a verb.',
      'To show the time.',
    ],
    answer: 'To avoid repeating the same noun.',
    answerTranslation: L(
      '같은 명사를 반복하지 않기 위해서예요.',
      'Bir xil otni qayta-qayta takrorlamaslik uchun.',
      'To avoid repeating the same noun.',
      'Чтобы не повторять одно и то же существительное.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_014_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'really', 'like', 'it'],
    answer: 'I really like it',
    audioText: 'I really like it.',
    answerTranslation: L(
      '저는 그것을 정말 좋아해요.',
      'Men uni juda yaxshi ko‘raman.',
      'I really like it.',
      'Мне это очень нравится.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_015_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['They', 'are', 'really', 'comfortable'],
    answer: 'They are really comfortable',
    answerTranslation: L(
      '그것들은 정말 편안해요.',
      'Ular juda qulay.',
      'They are really comfortable.',
      'Они очень удобные.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_016_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He never tidies them.',
    audioText: 'He never tidies them.',
    answerI18n: L(
      '그는 그것들을 절대 정리하지 않아요',
      'U ularni hech qachon yig‘ishtirmaydi',
      'He never tidies them',
      'Он никогда их не убирает',
    ),
    options: ['He', 'never', 'tidies', 'them.'],
    optionsI18n: {
      ko: ['그는', '그것들을', '절대', '정리하지', '않아요'],
      uz: ['U', 'ularni', 'hech', 'qachon', 'yig‘ishtirmaydi'],
      en: ['He', 'never', 'tidies', 'them.'],
      ru: ['Он', 'никогда', 'их', 'не', 'убирает'],
    },
    answerTranslation: L(
      '그는 그것들을 절대 정리하지 않아요.',
      'U ularni hech qachon yig‘ishtirmaydi.',
      'He never tidies them.',
      'Он никогда их не убирает.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My bedroom is very big, but I share it with my sister.',
    audioText: 'My bedroom is very big, but I share it with my sister.',
    answerTranslation: L(
      '제 침실은 아주 크지만 여동생과 함께 사용해요.',
      'Yotoqxonam juda katta, lekin uni singlim bilan bo‘lishaman.',
      'My bedroom is very big, but I share it with my sister.',
      'Моя спальня очень большая, но я делю её с сестрой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We have two big armchairs. They are really comfortable.',
    audioText: 'We have two big armchairs. They are really comfortable.',
    answerTranslation: L(
      '큰 안락의자 두 개가 있어요. 그것들은 정말 편안해요.',
      'Ikkita katta kreslomiz bor. Ular juda qulay.',
      'We have two big armchairs. They are really comfortable.',
      'У нас два больших кресла. Они очень удобные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Pronouns refer back to a person or thing already mentioned.',
    audioText: 'Pronouns refer back to a person or thing already mentioned.',
    answerTranslation: L(
      '대명사는 앞에서 이미 언급한 사람이나 사물을 다시 가리켜요.',
      'Olmoshlar oldin aytilgan odam yoki narsaga ishora qiladi.',
      'Pronouns refer back to a person or thing already mentioned.',
      'Местоимения относятся к уже упомянутому человеку или предмету.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['pronoun-referencing'],
  },

  en_s2u4_n3_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Use the words around a pronoun to understand who or what it refers to.',
    audioText:
      'Use the words around a pronoun to understand who or what it refers to.',
    answerTranslation: L(
      '대명사가 누구나 무엇을 가리키는지 이해하려면 주변 단어를 확인해요.',
      'Olmosh kim yoki nimani bildirishini tushunish uchun atrofidagi so‘zlarga qarang.',
      'Use the words around a pronoun to understand who or what it refers to.',
      'Используйте окружающие слова, чтобы понять, к кому или чему относится местоимение.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['pronoun-referencing', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Tidy worker or messy worker?
  // ===========================================================

  en_s2u4_n3_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Officegirl91 says her desk is really ___.',
    blankAnswers: ['messy'],
    options: ['messy', 'tidy', 'empty', 'modern'],
    answer: 'messy',
    answerTranslation: L(
      'Officegirl91은 자신의 책상이 정말 지저분하다고 해요.',
      'Officegirl91 stoli juda tartibsiz ekanini aytadi.',
      'Officegirl91 says her desk is really messy.',
      'Officegirl91 говорит, что её стол очень неаккуратный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'messy'],
  },

  en_s2u4_n3_022_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Who cannot believe all the things on Officegirl91’s desk?',
      },
    ],
    options: [
      'Her colleagues.',
      'Her housemates.',
      'Her sister.',
      'Her customers.',
    ],
    answer: 'Her colleagues.',
    answerTranslation: L(
      '그녀의 동료들이요.',
      'Uning hamkasblari.',
      'Her colleagues.',
      'Её коллеги.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'pronoun-referencing'],
  },

  en_s2u4_n3_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Officegirl91 has batteries and ___ on her desk.',
    blankAnswers: ['scissors'],
    options: ['scissors', 'shoes', 'plates', 'towels'],
    answer: 'scissors',
    answerTranslation: L(
      'Officegirl91의 책상에는 배터리와 가위가 있어요.',
      'Officegirl91 stolida batareyalar va qaychi bor.',
      'Officegirl91 has batteries and scissors on her desk.',
      'На столе Officegirl91 лежат батарейки и ножницы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'desk'],
  },

  en_s2u4_n3_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are five or six ___ on Officegirl91’s desk.',
    blankAnswers: ['magazines'],
    options: ['magazines', 'beds', 'cars', 'chairs'],
    answer: 'magazines',
    answerTranslation: L(
      'Officegirl91의 책상에는 잡지가 다섯 권이나 여섯 권 있어요.',
      'Officegirl91 stolida besh yoki olti jurnal bor.',
      'There are five or six magazines on Officegirl91’s desk.',
      'На столе Officegirl91 лежат пять или шесть журналов.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'desk'],
  },

  en_s2u4_n3_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a bottle of ___ on her desk.',
    blankAnswers: ['water'],
    options: ['water', 'paint', 'medicine', 'coffee beans'],
    answer: 'water',
    answerTranslation: L(
      '그녀의 책상에는 물 한 병이 있어요.',
      'Uning stolida bir shisha suv bor.',
      'There is a bottle of water on her desk.',
      'На её столе стоит бутылка воды.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'desk'],
  },

  en_s2u4_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is a cheese ___ on Officegirl91’s desk.',
    blankAnswers: ['sandwich'],
    options: ['sandwich', 'battery', 'envelope', 'computer'],
    answer: 'sandwich',
    answerTranslation: L(
      'Officegirl91의 책상에는 치즈 샌드위치가 있어요.',
      'Officegirl91 stolida pishloqli sendvich bor.',
      'There is a cheese sandwich on Officegirl91’s desk.',
      'На столе Officegirl91 лежит сэндвич с сыром.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'desk'],
  },

  en_s2u4_n3_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Navigator9 says his desk is very ___.',
    blankAnswers: ['tidy'],
    options: ['tidy', 'messy', 'dirty', 'noisy'],
    answer: 'tidy',
    answerTranslation: L(
      'Navigator9는 자신의 책상이 아주 깔끔하다고 해요.',
      'Navigator9 stoli juda tartibli ekanini aytadi.',
      'Navigator9 says his desk is very tidy.',
      'Navigator9 говорит, что его стол очень аккуратный.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'tidy'],
  },

  en_s2u4_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Navigator9 only has a computer and a ___ on his desk.',
    blankAnswers: ['printer'],
    options: ['printer', 'sandwich', 'battery', 'magazine'],
    answer: 'printer',
    answerTranslation: L(
      'Navigator9의 책상에는 컴퓨터와 프린터만 있어요.',
      'Navigator9 stolida faqat kompyuter va printer bor.',
      'Navigator9 only has a computer and a printer on his desk.',
      'На столе Navigator9 только компьютер и принтер.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'tidy'],
  },

  en_s2u4_n3_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'His computer and printer are both new and ___.',
    blankAnswers: ['expensive'],
    options: ['expensive', 'cheap', 'dirty', 'old-fashioned'],
    answer: 'expensive',
    answerTranslation: L(
      '그의 컴퓨터와 프린터는 둘 다 새것이고 비싸요.',
      'Uning kompyuteri va printeri yangi va qimmat.',
      'His computer and printer are both new and expensive.',
      'Его компьютер и принтер новые и дорогие.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'expensive'],
  },

  en_s2u4_n3_030_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Why does Navigator9 keep his computer and printer very clean?',
      },
    ],
    options: [
      'Because they are new and expensive.',
      'Because they are old and cheap.',
      'Because they belong to his sister.',
      'Because he never uses them.',
    ],
    answer: 'Because they are new and expensive.',
    answerTranslation: L(
      '새것이고 비싸기 때문이에요.',
      'Chunki ular yangi va qimmat.',
      'Because they are new and expensive.',
      'Потому что они новые и дорогие.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['reading', 'pronoun-referencing'],
  },

  en_s2u4_n3_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mala shares a house with other ___.',
    blankAnswers: ['students'],
    options: ['students', 'doctors', 'pilots', 'farmers'],
    answer: 'students',
    answerTranslation: L(
      'Mala는 다른 학생들과 집을 함께 써요.',
      'Mala boshqa talabalar bilan bir uyda yashaydi.',
      'Mala shares a house with other students.',
      'Мала делит дом с другими студентами.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'mala'],
  },

  en_s2u4_n3_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mala’s kitchen and bathroom are never ___.',
    blankAnswers: ['clean'],
    options: ['clean', 'modern', 'beautiful', 'expensive'],
    answer: 'clean',
    answerTranslation: L(
      'Mala의 주방과 욕실은 절대 깨끗하지 않아요.',
      'Malaning oshxonasi va hammomi hech qachon toza emas.',
      'Mala’s kitchen and bathroom are never clean.',
      'Кухня и ванная Малы никогда не бывают чистыми.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'mala'],
  },

  en_s2u4_n3_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mala says her housemates are very ___.',
    blankAnswers: ['lazy'],
    options: ['lazy', 'tidy', 'modern', 'quiet'],
    answer: 'lazy',
    answerTranslation: L(
      'Mala는 하우스메이트들이 아주 게으르다고 해요.',
      'Mala uy sheriklari juda dangasa ekanini aytadi.',
      'Mala says her housemates are very lazy.',
      'Мала говорит, что её соседи очень ленивые.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'lazy'],
  },

  en_s2u4_n3_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Who never does any cleaning in Mala’s house?',
      },
    ],
    options: [
      'Her housemates.',
      'Her colleagues.',
      'Her teachers.',
      'Her customers.',
    ],
    answer: 'Her housemates.',
    answerTranslation: L(
      '그녀의 하우스메이트들이요.',
      'Uning uy sheriklari.',
      'Her housemates.',
      'Её соседи по дому.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'pronoun-referencing'],
  },

  en_s2u4_n3_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Who does not want to visit Mala’s house?',
      },
    ],
    options: [
      'Her friends.',
      'Her housemates.',
      'Her colleagues.',
      'Her teachers.',
    ],
    answer: 'Her friends.',
    answerTranslation: L(
      '그녀의 친구들이요.',
      'Uning do‘stlari.',
      'Her friends.',
      'Её друзья.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['reading', 'pronoun-referencing'],
  },

  en_s2u4_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mala says the house is a ___ place to live.',
    blankAnswers: ['cheap'],
    options: ['cheap', 'expensive', 'modern', 'beautiful'],
    answer: 'cheap',
    answerTranslation: L(
      'Mala는 그 집이 살기 저렴한 곳이라고 해요.',
      'Mala bu uy yashash uchun arzon joy ekanini aytadi.',
      'Mala says the house is a cheap place to live.',
      'Мала говорит, что это дешёвое место для жизни.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'cheap'],
  },

  en_s2u4_n3_037_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mala keeps her bedroom tidy and ___.',
    blankAnswers: ['organised'],
    options: ['organised', 'messy', 'dirty', 'noisy'],
    answer: 'organised',
    answerTranslation: L(
      'Mala는 침실을 깔끔하고 정리된 상태로 유지해요.',
      'Mala yotoqxonasini ozoda va tartibli saqlaydi.',
      'Mala keeps her bedroom tidy and organised.',
      'Мала держит спальню аккуратной и организованной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'organised'],
  },

  en_s2u4_n3_038_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'When Mala finishes work, she puts her books in the ___.',
    blankAnswers: ['cupboard'],
    options: ['cupboard', 'sink', 'garage', 'fridge'],
    answer: 'cupboard',
    answerTranslation: L(
      'Mala는 일을 끝내면 책을 수납장에 넣어요.',
      'Mala ishni tugatgach kitoblarini shkafga qo‘yadi.',
      'When Mala finishes work, she puts her books in the cupboard.',
      'Когда Мала заканчивает работу, она кладёт книги в шкаф.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading', 'cupboard'],
  },

  en_s2u4_n3_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Mala’s house is messy, but her bedroom is tidy and organised.',
    audioText: 'Mala’s house is messy, but her bedroom is tidy and organised.',
    answerTranslation: L(
      'Mala의 집은 지저분하지만 침실은 깔끔하고 정리되어 있어요.',
      'Malaning uyi tartibsiz, lekin yotoqxonasi ozoda va tartibli.',
      'Mala’s house is messy, but her bedroom is tidy and organised.',
      'Дом Малы неаккуратный, но её спальня чистая и организованная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['reading', 'review'],
  },

  en_s2u4_n3_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Officegirl91 is messy, Navigator9 is tidy, and Mala keeps her own room tidy.',
    audioText:
      'Officegirl91 is messy, Navigator9 is tidy, and Mala keeps her own room tidy.',
    answerTranslation: L(
      'Officegirl91은 지저분하고 Navigator9는 깔끔하며 Mala는 자기 방을 깔끔하게 유지해요.',
      'Officegirl91 tartibsiz, Navigator9 tartibli, Mala esa o‘z xonasini ozoda saqlaydi.',
      'Officegirl91 is messy, Navigator9 is tidy, and Mala keeps her own room tidy.',
      'Officegirl91 неаккуратная, Navigator9 аккуратный, а Мала держит свою комнату в порядке.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['reading', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Opposite adjectives
  // ===========================================================

  en_s2u4_n3_041_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대 뜻의 형용사를 연결하세요.',
      'Qarama-qarshi ma’noli sifatlarni moslang.',
      'Match the opposite adjectives.',
      'Соедините противоположные прилагательные.',
    ),
    pairs: [
      {
        text: 'difficult',
        native: 'easy',
        nativeI18n: L('easy', 'easy', 'easy', 'easy'),
      },
      {
        text: 'big',
        native: 'small',
        nativeI18n: L('small', 'small', 'small', 'small'),
      },
      {
        text: 'new',
        native: 'old',
        nativeI18n: L('old', 'old', 'old', 'old'),
      },
      {
        text: 'good',
        native: 'bad',
        nativeI18n: L('bad', 'bad', 'bad', 'bad'),
      },
      {
        text: 'clean',
        native: 'dirty',
        nativeI18n: L('dirty', 'dirty', 'dirty', 'dirty'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_042_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대 뜻의 형용사를 연결하세요.',
      'Qarama-qarshi ma’noli sifatlarni moslang.',
      'Match the opposite adjectives.',
      'Соедините противоположные прилагательные.',
    ),
    pairs: [
      {
        text: 'long',
        native: 'short',
        nativeI18n: L('short', 'short', 'short', 'short'),
      },
      {
        text: 'heavy',
        native: 'light',
        nativeI18n: L('light', 'light', 'light', 'light'),
      },
      {
        text: 'quiet',
        native: 'noisy',
        nativeI18n: L('noisy', 'noisy', 'noisy', 'noisy'),
      },
      {
        text: 'ugly',
        native: 'beautiful',
        nativeI18n: L('beautiful', 'beautiful', 'beautiful', 'beautiful'),
      },
      {
        text: 'old-fashioned',
        native: 'modern',
        nativeI18n: L('modern', 'modern', 'modern', 'modern'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “difficult” is ___.',
    blankAnswers: ['easy'],
    options: ['easy', 'heavy', 'dirty', 'noisy'],
    answer: 'easy',
    answerTranslation: L(
      'difficult의 반대말은 easy예요.',
      'Difficult so‘zining teskarisi easy.',
      'The opposite of difficult is easy.',
      'Противоположность difficult — easy.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “big” is ___.',
    blankAnswers: ['small'],
    options: ['small', 'long', 'good', 'modern'],
    answer: 'small',
    answerTranslation: L(
      'big의 반대말은 small이에요.',
      'Big so‘zining teskarisi small.',
      'The opposite of big is small.',
      'Противоположность big — small.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “new” is ___.',
    blankAnswers: ['old'],
    options: ['old', 'bad', 'light', 'cheap'],
    answer: 'old',
    answerTranslation: L(
      'new의 반대말은 old예요.',
      'New so‘zining teskarisi old.',
      'The opposite of new is old.',
      'Противоположность new — old.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “good” is ___.',
    blankAnswers: ['bad'],
    options: ['bad', 'clean', 'modern', 'short'],
    answer: 'bad',
    answerTranslation: L(
      'good의 반대말은 bad예요.',
      'Good so‘zining teskarisi bad.',
      'The opposite of good is bad.',
      'Противоположность good — bad.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “clean” is ___.',
    blankAnswers: ['dirty'],
    options: ['dirty', 'quiet', 'easy', 'beautiful'],
    answer: 'dirty',
    answerTranslation: L(
      'clean의 반대말은 dirty예요.',
      'Clean so‘zining teskarisi dirty.',
      'The opposite of clean is dirty.',
      'Противоположность clean — dirty.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “long” is ___.',
    blankAnswers: ['short'],
    options: ['short', 'small', 'light', 'bad'],
    answer: 'short',
    answerTranslation: L(
      'long의 반대말은 short예요.',
      'Long so‘zining teskarisi short.',
      'The opposite of long is short.',
      'Противоположность long — short.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “heavy” is ___.',
    blankAnswers: ['light'],
    options: ['light', 'modern', 'noisy', 'dirty'],
    answer: 'light',
    answerTranslation: L(
      'heavy의 반대말은 light예요.',
      'Heavy so‘zining teskarisi light.',
      'The opposite of heavy is light.',
      'Противоположность heavy — light.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “quiet” is ___.',
    blankAnswers: ['noisy'],
    options: ['noisy', 'tidy', 'modern', 'cheap'],
    answer: 'noisy',
    answerTranslation: L(
      'quiet의 반대말은 noisy예요.',
      'Quiet so‘zining teskarisi noisy.',
      'The opposite of quiet is noisy.',
      'Противоположность quiet — noisy.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “ugly” is ___.',
    blankAnswers: ['beautiful'],
    options: ['beautiful', 'heavy', 'dirty', 'old'],
    answer: 'beautiful',
    answerTranslation: L(
      'ugly의 반대말은 beautiful이에요.',
      'Ugly so‘zining teskarisi beautiful.',
      'The opposite of ugly is beautiful.',
      'Противоположность ugly — beautiful.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “old-fashioned” is ___.',
    blankAnswers: ['modern'],
    options: ['modern', 'old', 'short', 'quiet'],
    answer: 'modern',
    answerTranslation: L(
      'old-fashioned의 반대말은 modern이에요.',
      'Old-fashioned so‘zining teskarisi modern.',
      'The opposite of old-fashioned is modern.',
      'Противоположность old-fashioned — modern.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “expensive” is ___.',
    blankAnswers: ['cheap'],
    options: ['cheap', 'heavy', 'messy', 'old-fashioned'],
    answer: 'cheap',
    answerTranslation: L(
      'expensive의 반대말은 cheap이에요.',
      'Expensive so‘zining teskarisi cheap.',
      'The opposite of expensive is cheap.',
      'Противоположность expensive — cheap.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “terrible” is ___.',
    blankAnswers: ['fantastic'],
    options: ['fantastic', 'dirty', 'short', 'heavy'],
    answer: 'fantastic',
    answerTranslation: L(
      'terrible의 반대말은 fantastic이에요.',
      'Terrible so‘zining teskarisi fantastic.',
      'The opposite of terrible is fantastic.',
      'Противоположность terrible — fantastic.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The opposite of “messy” is ___.',
    blankAnswers: ['tidy'],
    options: ['tidy', 'noisy', 'heavy', 'bad'],
    answer: 'tidy',
    answerTranslation: L(
      'messy의 반대말은 tidy예요.',
      'Messy so‘zining teskarisi tidy.',
      'The opposite of messy is tidy.',
      'Противоположность messy — tidy.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['The', 'box', 'is', 'very', 'heavy'],
    answer: 'The box is very heavy',
    audioText: 'The box is very heavy.',
    answerTranslation: L(
      '그 상자는 아주 무거워요.',
      'Quti juda og‘ir.',
      'The box is very heavy.',
      'Коробка очень тяжёлая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'street', 'is', 'very', 'noisy'],
    answer: 'The street is very noisy',
    answerTranslation: L(
      '그 거리는 아주 시끄러워요.',
      'Ko‘cha juda shovqinli.',
      'The street is very noisy.',
      'Улица очень шумная.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My flat is modern but very small.',
    audioText: 'My flat is modern but very small.',
    answerI18n: L(
      '제 아파트는 현대적이지만 아주 작아요',
      'Kvartiram zamonaviy, lekin juda kichik',
      'My flat is modern but very small',
      'Моя квартира современная, но очень маленькая',
    ),
    options: ['My', 'flat', 'is', 'modern', 'but', 'very', 'small.'],
    optionsI18n: {
      ko: ['제', '아파트는', '현대적이지만', '아주', '작아요'],
      uz: ['Kvartiram', 'zamonaviy', 'lekin', 'juda', 'kichik'],
      en: ['My', 'flat', 'is', 'modern', 'but', 'very', 'small.'],
      ru: ['Моя', 'квартира', 'современная', 'но', 'очень', 'маленькая'],
    },
    answerTranslation: L(
      '제 아파트는 현대적이지만 아주 작아요.',
      'Kvartiram zamonaviy, lekin juda kichik.',
      'My flat is modern but very small.',
      'Моя квартира современная, но очень маленькая.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Difficult and easy, big and small, new and old, good and bad are opposites.',
    audioText:
      'Difficult and easy, big and small, new and old, good and bad are opposites.',
    answerTranslation: L(
      'difficult와 easy, big과 small, new와 old, good과 bad는 반대말이에요.',
      'Difficult va easy, big va small, new va old, good va bad qarama-qarshi ma’noli so‘zlar.',
      'Difficult and easy, big and small, new and old, good and bad are opposites.',
      'Difficult и easy, big и small, new и old, good и bad — противоположности.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['opposite-adjectives'],
  },

  en_s2u4_n3_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Clean and dirty, heavy and light, quiet and noisy, ugly and beautiful are opposites.',
    audioText:
      'Clean and dirty, heavy and light, quiet and noisy, ugly and beautiful are opposites.',
    answerTranslation: L(
      'clean과 dirty, heavy와 light, quiet와 noisy, ugly와 beautiful은 반대말이에요.',
      'Clean va dirty, heavy va light, quiet va noisy, ugly va beautiful qarama-qarshi ma’noli so‘zlar.',
      'Clean and dirty, heavy and light, quiet and noisy, ugly and beautiful are opposites.',
      'Clean и dirty, heavy и light, quiet и noisy, ugly и beautiful — противоположности.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['opposite-adjectives'],
  },

  // ===========================================================
  // Lesson 4 · Workbook vocabulary development & review
  // ===========================================================

  en_s2u4_n3_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Mandy, put those ___ clothes in the washing machine!',
    blankAnswers: ['dirty'],
    options: ['dirty', 'clean', 'modern', 'light'],
    answer: 'dirty',
    answerTranslation: L(
      'Mandy, 그 더러운 옷들을 세탁기에 넣어!',
      'Mandy, o‘sha iflos kiyimlarni kir yuvish mashinasiga sol!',
      'Mandy, put those dirty clothes in the washing machine!',
      'Мэнди, положи эту грязную одежду в стиральную машину!',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'opposite-adjectives'],
  },

  en_s2u4_n3_062_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Your bag is beautiful.',
      },
    ],
    options: [
      'Thank you.',
      'It is very dirty.',
      'No, it is heavy.',
      'I am a bag.',
    ],
    answer: 'Thank you.',
    answerTranslation: L('고마워요.', 'Rahmat.', 'Thank you.', 'Спасибо.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'beautiful'],
  },

  en_s2u4_n3_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The journey from the north to the south of Africa is very ___.',
    blankAnswers: ['long'],
    options: ['long', 'short', 'small', 'light'],
    answer: 'long',
    answerTranslation: L(
      '아프리카 북쪽에서 남쪽까지의 여행은 아주 길어요.',
      'Afrikaning shimolidan janubigacha bo‘lgan safar juda uzoq.',
      'The journey from the north to the south of Africa is very long.',
      'Путешествие с севера на юг Африки очень долгое.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'opposite-adjectives'],
  },

  en_s2u4_n3_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Did you enjoy the play?',
      },
    ],
    options: [
      'Yes, the actors were fantastic!',
      'Yes, the actors were terrible!',
      'No, it was heavy.',
      'No, it was tidy.',
    ],
    answer: 'Yes, the actors were fantastic!',
    answerTranslation: L(
      '네, 배우들이 정말 훌륭했어요!',
      'Ha, aktyorlar ajoyib edi!',
      'Yes, the actors were fantastic!',
      'Да, актёры были великолепны!',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'fantastic'],
  },

  en_s2u4_n3_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We can’t go to the beach if the weather is ___.',
    blankAnswers: ['bad'],
    options: ['bad', 'good', 'beautiful', 'modern'],
    answer: 'bad',
    answerTranslation: L(
      '날씨가 나쁘면 해변에 갈 수 없어요.',
      'Ob-havo yomon bo‘lsa, sohilga bora olmaymiz.',
      'We can’t go to the beach if the weather is bad.',
      'Мы не можем пойти на пляж, если погода плохая.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'opposite-adjectives'],
  },

  en_s2u4_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My mother is very ___. She doesn’t use a computer.',
    blankAnswers: ['old-fashioned'],
    options: ['old-fashioned', 'modern', 'tidy', 'cheap'],
    answer: 'old-fashioned',
    answerTranslation: L(
      '우리 어머니는 아주 구식이에요. 컴퓨터를 사용하지 않아요.',
      'Onam juda eskicha. U kompyuterdan foydalanmaydi.',
      'My mother is very old-fashioned. She doesn’t use a computer.',
      'Моя мама очень старомодная. Она не пользуется компьютером.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['workbook', 'old-fashioned'],
  },

  en_s2u4_n3_067_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Can you do this exercise?',
      },
    ],
    options: [
      'No, it’s difficult.',
      'No, it’s easy.',
      'Yes, it’s dirty.',
      'Yes, it’s noisy.',
    ],
    answer: 'No, it’s difficult.',
    answerTranslation: L(
      '아니요, 어려워요.',
      'Yo‘q, qiyin.',
      'No, it’s difficult.',
      'Нет, это трудно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'difficult'],
  },

  en_s2u4_n3_068_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대말을 연결하세요.',
      'Qarama-qarshi so‘zlarni moslang.',
      'Match the opposites.',
      'Соедините противоположности.',
    ),
    pairs: [
      {
        text: 'messy',
        native: 'tidy',
        nativeI18n: L('tidy', 'tidy', 'tidy', 'tidy'),
      },
      {
        text: 'clean',
        native: 'dirty',
        nativeI18n: L('dirty', 'dirty', 'dirty', 'dirty'),
      },
      {
        text: 'long',
        native: 'short',
        nativeI18n: L('short', 'short', 'short', 'short'),
      },
      {
        text: 'expensive',
        native: 'cheap',
        nativeI18n: L('cheap', 'cheap', 'cheap', 'cheap'),
      },
      {
        text: 'quiet',
        native: 'noisy',
        nativeI18n: L('noisy', 'noisy', 'noisy', 'noisy'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'opposite-adjectives'],
  },

  en_s2u4_n3_069_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대말을 연결하세요.',
      'Qarama-qarshi so‘zlarni moslang.',
      'Match the opposites.',
      'Соедините противоположности.',
    ),
    pairs: [
      {
        text: 'difficult',
        native: 'easy',
        nativeI18n: L('easy', 'easy', 'easy', 'easy'),
      },
      {
        text: 'bad',
        native: 'good',
        nativeI18n: L('good', 'good', 'good', 'good'),
      },
      {
        text: 'beautiful',
        native: 'ugly',
        nativeI18n: L('ugly', 'ugly', 'ugly', 'ugly'),
      },
      {
        text: 'old',
        native: 'new',
        nativeI18n: L('new', 'new', 'new', 'new'),
      },
      {
        text: 'heavy',
        native: 'light',
        nativeI18n: L('light', 'light', 'light', 'light'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'opposite-adjectives'],
  },

  en_s2u4_n3_070_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대말을 연결하세요.',
      'Qarama-qarshi so‘zlarni moslang.',
      'Match the opposites.',
      'Соедините противоположности.',
    ),
    pairs: [
      {
        text: 'big',
        native: 'small',
        nativeI18n: L('small', 'small', 'small', 'small'),
      },
      {
        text: 'terrible',
        native: 'fantastic',
        nativeI18n: L('fantastic', 'fantastic', 'fantastic', 'fantastic'),
      },
      {
        text: 'old-fashioned',
        native: 'modern',
        nativeI18n: L('modern', 'modern', 'modern', 'modern'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'opposite-adjectives'],
  },

  en_s2u4_n3_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is your home usually tidy or ___?',
    blankAnswers: ['messy'],
    options: ['messy', 'modern', 'heavy', 'long'],
    answer: 'messy',
    answerTranslation: L(
      '집이 보통 깔끔한가요, 아니면 어질러져 있나요?',
      'Uyingiz odatda tartiblimi yoki tartibsizmi?',
      'Is your home usually tidy or messy?',
      'Ваш дом обычно аккуратный или неаккуратный?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['speaking', 'opposites'],
  },

  en_s2u4_n3_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is your flat modern or ___?',
    blankAnswers: ['old-fashioned'],
    options: ['old-fashioned', 'beautiful', 'light', 'clean'],
    answer: 'old-fashioned',
    answerTranslation: L(
      '아파트가 현대적인가요, 아니면 구식인가요?',
      'Kvartirangiz zamonaviymi yoki eskichami?',
      'Is your flat modern or old-fashioned?',
      'Ваша квартира современная или старомодная?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['speaking', 'opposites'],
  },

  en_s2u4_n3_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is your furniture mostly new or ___?',
    blankAnswers: ['old'],
    options: ['old', 'clean', 'cheap', 'short'],
    answer: 'old',
    answerTranslation: L(
      '가구가 대부분 새것인가요, 아니면 오래됐나요?',
      'Mebellaringiz asosan yangimi yoki eskimi?',
      'Is your furniture mostly new or old?',
      'Ваша мебель в основном новая или старая?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['speaking', 'opposites'],
  },

  en_s2u4_n3_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is your road quiet or ___?',
    blankAnswers: ['noisy'],
    options: ['noisy', 'tidy', 'modern', 'small'],
    answer: 'noisy',
    answerTranslation: L(
      '당신이 사는 길은 조용한가요, 아니면 시끄러운가요?',
      'Ko‘changiz tinchmi yoki shovqinlimi?',
      'Is your road quiet or noisy?',
      'Ваша улица тихая или шумная?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['speaking', 'opposites'],
  },

  en_s2u4_n3_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is it in a cheap or ___ part of town?',
    blankAnswers: ['expensive'],
    options: ['expensive', 'heavy', 'dirty', 'old'],
    answer: 'expensive',
    answerTranslation: L(
      '그곳은 도시의 저렴한 지역인가요, 비싼 지역인가요?',
      'U shaharning arzon yoki qimmat qismidami?',
      'Is it in a cheap or expensive part of town?',
      'Это дешёвый или дорогой район города?',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['speaking', 'opposites'],
  },

  en_s2u4_n3_076_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Is', 'your', 'road', 'quiet', 'or', 'noisy'],
    answer: 'Is your road quiet or noisy',
    audioText: 'Is your road quiet or noisy?',
    answerTranslation: L(
      '당신이 사는 길은 조용한가요, 시끄러운가요?',
      'Ko‘changiz tinchmi yoki shovqinlimi?',
      'Is your road quiet or noisy?',
      'Ваша улица тихая или шумная?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['speaking', 'opposites'],
  },

  en_s2u4_n3_077_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['My', 'desk', 'is', 'usually', 'very', 'tidy'],
    answer: 'My desk is usually very tidy',
    answerTranslation: L(
      '제 책상은 보통 아주 깔끔해요.',
      'Stolim odatda juda tartibli.',
      'My desk is usually very tidy.',
      'Мой стол обычно очень аккуратный.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['tidy', 'review'],
  },

  en_s2u4_n3_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My room is small but very comfortable.',
    audioText: 'My room is small but very comfortable.',
    answerI18n: L(
      '제 방은 작지만 아주 편안해요',
      'Xonam kichik, lekin juda qulay',
      'My room is small but very comfortable',
      'Моя комната маленькая, но очень удобная',
    ),
    options: ['My', 'room', 'is', 'small', 'but', 'very', 'comfortable.'],
    optionsI18n: {
      ko: ['제', '방은', '작지만', '아주', '편안해요'],
      uz: ['Xonam', 'kichik', 'lekin', 'juda', 'qulay'],
      en: ['My', 'room', 'is', 'small', 'but', 'very', 'comfortable.'],
      ru: ['Моя', 'комната', 'маленькая', 'но', 'очень', 'удобная'],
    },
    answerTranslation: L(
      '제 방은 작지만 아주 편안해요.',
      'Xonam kichik, lekin juda qulay.',
      'My room is small but very comfortable.',
      'Моя комната маленькая, но очень удобная.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['review', 'adjectives'],
  },

  en_s2u4_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'My home is modern, my room is tidy, and the street outside is quite noisy.',
    audioText:
      'My home is modern, my room is tidy, and the street outside is quite noisy.',
    answerTranslation: L(
      '우리 집은 현대적이고 제 방은 깔끔하며 밖의 거리는 꽤 시끄러워요.',
      'Uyim zamonaviy, xonam tartibli, tashqaridagi ko‘cha esa ancha shovqinli.',
      'My home is modern, my room is tidy, and the street outside is quite noisy.',
      'Мой дом современный, моя комната аккуратная, а улица снаружи довольно шумная.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['speaking', 'review'],
  },

  en_s2u4_n3_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 4.3, we use pronouns to refer back to people and things and use opposite adjectives to describe homes, objects and places.',
    audioText:
      'In Unit 4.3, we use pronouns to refer back to people and things and use opposite adjectives to describe homes, objects and places.',
    answerTranslation: L(
      'Unit 4.3에서는 대명사로 앞에서 언급한 사람과 사물을 다시 가리키고, 반대 형용사로 집·물건·장소를 설명해요.',
      'Unit 4.3 da olmoshlar bilan oldin aytilgan odam va narsalarga ishora qilamiz va qarama-qarshi sifatlar bilan uylar, buyumlar va joylarni tasvirlaymiz.',
      'In Unit 4.3, we use pronouns to refer back to people and things and use opposite adjectives to describe homes, objects and places.',
      'В Unit 4.3 мы используем местоимения для связи с ранее упомянутыми людьми и предметами и противоположные прилагательные для описания домов, вещей и мест.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 3
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE3 = {
  title: L(
    '깔끔한가요, 어질러졌나요?',
    'Tartiblimi yoki tartibsizmi?',
    'Tidy or messy?',
    'Аккуратно или неаккуратно?',
  ),
  section: 2,
  unit: 4,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '대명사가 가리키는 말 찾기',
        'Olmosh nimani bildiradi?',
        'Pronoun referencing',
        'К чему относится местоимение',
      ),
      description: L(
        'it, they, them 같은 대명사가 앞에서 언급한 어떤 사람이나 사물을 가리키는지 문맥을 통해 이해해요.',
        'It, they va them kabi olmoshlar oldin aytilgan qaysi odam yoki narsani bildirishini matndan tushunasiz.',
        'Understand what pronouns such as it, they and them refer to.',
        'Учимся понимать, к чему относятся it, they и them.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 1,
      questions: [
        'en_s2u4_n3_001_fill_in_blank',
        'en_s2u4_n3_002_dialog_complete',
        'en_s2u4_n3_003_fill_in_blank',
        'en_s2u4_n3_004_dialog_complete',
        'en_s2u4_n3_005_fill_in_blank',
        'en_s2u4_n3_006_dialog_complete',
        'en_s2u4_n3_007_fill_in_blank',
        'en_s2u4_n3_008_dialog_complete',
        'en_s2u4_n3_009_fill_in_blank',
        'en_s2u4_n3_010_dialog_complete',
        'en_s2u4_n3_011_fill_in_blank',
        'en_s2u4_n3_012_fill_in_blank',
        'en_s2u4_n3_013_dialog_complete',
        'en_s2u4_n3_014_word_arrange',
        'en_s2u4_n3_015_translate_builder',
        'en_s2u4_n3_016_sentence_builder',
        'en_s2u4_n3_017_speaking',
        'en_s2u4_n3_018_speaking',
        'en_s2u4_n3_019_speaking',
        'en_s2u4_n3_020_speaking',
      ],
    },

    {
      title: L(
        '깔끔한 사람과 어질러 놓는 사람',
        'Tartibli va tartibsiz odamlar',
        'Tidy and messy workers',
        'Аккуратные и неаккуратные люди',
      ),
      description: L(
        'Officegirl91, Navigator9, Mala의 글을 읽고 책상과 집의 상태, 그리고 대명사가 가리키는 내용을 이해해요.',
        'Officegirl91, Navigator9 va Malaning postlarini o‘qib, stol va uyning holati hamda olmoshlarning ma’nosini tushunasiz.',
        'Read the forum posts about tidy and messy desks and homes.',
        'Читаем сообщения о порядке и беспорядке на столе и дома.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u4_n3_021_fill_in_blank',
        'en_s2u4_n3_022_dialog_complete',
        'en_s2u4_n3_023_fill_in_blank',
        'en_s2u4_n3_024_fill_in_blank',
        'en_s2u4_n3_025_fill_in_blank',
        'en_s2u4_n3_026_fill_in_blank',
        'en_s2u4_n3_027_fill_in_blank',
        'en_s2u4_n3_028_fill_in_blank',
        'en_s2u4_n3_029_fill_in_blank',
        'en_s2u4_n3_030_dialog_complete',
        'en_s2u4_n3_031_fill_in_blank',
        'en_s2u4_n3_032_fill_in_blank',
        'en_s2u4_n3_033_fill_in_blank',
        'en_s2u4_n3_034_dialog_complete',
        'en_s2u4_n3_035_dialog_complete',
        'en_s2u4_n3_036_fill_in_blank',
        'en_s2u4_n3_037_fill_in_blank',
        'en_s2u4_n3_038_fill_in_blank',
        'en_s2u4_n3_039_speaking',
        'en_s2u4_n3_040_speaking',
      ],
    },

    {
      title: L(
        '반대 형용사',
        'Qarama-qarshi sifatlar',
        'Opposite adjectives',
        'Противоположные прилагательные',
      ),
      description: L(
        'difficult/easy, big/small, clean/dirty, heavy/light, quiet/noisy, ugly/beautiful 등 4.3의 반대 형용사를 익혀요.',
        'Difficult/easy, big/small, clean/dirty, heavy/light, quiet/noisy, ugly/beautiful kabi qarama-qarshi sifatlarni o‘rganasiz.',
        'Learn and practise the opposite adjective pairs from Unit 4.3.',
        'Изучаем пары противоположных прилагательных из Unit 4.3.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 3,
      questions: [
        'en_s2u4_n3_041_word_matching',
        'en_s2u4_n3_042_word_matching',
        'en_s2u4_n3_043_fill_in_blank',
        'en_s2u4_n3_044_fill_in_blank',
        'en_s2u4_n3_045_fill_in_blank',
        'en_s2u4_n3_046_fill_in_blank',
        'en_s2u4_n3_047_fill_in_blank',
        'en_s2u4_n3_048_fill_in_blank',
        'en_s2u4_n3_049_fill_in_blank',
        'en_s2u4_n3_050_fill_in_blank',
        'en_s2u4_n3_051_fill_in_blank',
        'en_s2u4_n3_052_fill_in_blank',
        'en_s2u4_n3_053_fill_in_blank',
        'en_s2u4_n3_054_fill_in_blank',
        'en_s2u4_n3_055_fill_in_blank',
        'en_s2u4_n3_056_word_arrange',
        'en_s2u4_n3_057_translate_builder',
        'en_s2u4_n3_058_sentence_builder',
        'en_s2u4_n3_059_speaking',
        'en_s2u4_n3_060_speaking',
      ],
    },

    {
      title: L(
        '형용사 종합 연습',
        'Sifatlarni umumiy mashq qilish',
        'Adjective development and review',
        'Развитие и повторение прилагательных',
      ),
      description: L(
        'Workbook의 문장 선택과 반대말 활동을 통해 dirty, fantastic, old-fashioned, difficult, expensive 등 핵심 형용사를 종합 복습해요.',
        'Workbook mashqlari orqali dirty, fantastic, old-fashioned, difficult, expensive kabi asosiy sifatlarni takrorlaysiz.',
        'Consolidate the opposite adjectives using the Unit 4.3 workbook activities.',
        'Закрепляем противоположные прилагательные по заданиям Workbook 4.3.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 4,
      questions: [
        'en_s2u4_n3_061_fill_in_blank',
        'en_s2u4_n3_062_dialog_complete',
        'en_s2u4_n3_063_fill_in_blank',
        'en_s2u4_n3_064_dialog_complete',
        'en_s2u4_n3_065_fill_in_blank',
        'en_s2u4_n3_066_fill_in_blank',
        'en_s2u4_n3_067_dialog_complete',
        'en_s2u4_n3_068_word_matching',
        'en_s2u4_n3_069_word_matching',
        'en_s2u4_n3_070_word_matching',
        'en_s2u4_n3_071_fill_in_blank',
        'en_s2u4_n3_072_fill_in_blank',
        'en_s2u4_n3_073_fill_in_blank',
        'en_s2u4_n3_074_fill_in_blank',
        'en_s2u4_n3_075_fill_in_blank',
        'en_s2u4_n3_076_word_arrange',
        'en_s2u4_n3_077_translate_builder',
        'en_s2u4_n3_078_sentence_builder',
        'en_s2u4_n3_079_speaking',
        'en_s2u4_n3_080_speaking',
      ],
    },
  ],
}; // ─────────────────────────────────────────────────────────────
// Section 2 · Unit 4 · Node 4
// 4.4 Speaking and writing
//
// Coverage
// Asking for directions:
// - Excuse me, where's ...?
// - How do I get to ...?
// - Could you give me some directions, please?
// - Is there a ... near here?
//
// Giving directions:
// - turn left / turn right
// - go straight on
// - go past ...
// - take the first / second / third left/right
// - on the left / on the right
// - on the corner
// - at the end of the road
// - next to / opposite / near / behind / between
//
// Writing:
// - imperatives
// - infinitive without "to"
// - negative: don't + infinitive
//
// Bali tour email:
// - arrive
// - bring
// - passport
// - wear
// - scarf
// - temple
// - photograph
// - tip
//
// Workbook:
// - direction phrases
// - house rules
//
// IMPORTANT:
// *_WORDS에는 한 단어 headword만 등록.
// "go straight on", "turn left", "on the corner",
// "tourist information centre" 등 phrase는 WORD 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE4_WORDS = [
  {
    code: 'en-noun-direction',
    english: 'direction',
    senseKey: 'instruction-about-how-to-get-somewhere',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '방향; 길 안내',
      'yo‘nalish; yo‘l ko‘rsatma',
      'information or instructions about how to get somewhere',
      'направление',
    ),
    examples: [
      {
        english: 'Could you give me some directions?',
        translations: L(
          '길을 좀 알려주시겠어요?',
          'Menga yo‘lni ko‘rsata olasizmi?',
          'Could you give me some directions?',
          'Не могли бы вы подсказать дорогу?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dəˈrekʃən/',
      ttsText: 'direction',
    },
    tags: ['directions', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-corner',
    english: 'corner',
    senseKey: 'place-where-two-streets-or-sides-meet',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '모퉁이',
      'burchak',
      'a place where two streets or sides meet',
      'угол',
    ),
    examples: [
      {
        english: 'The bank is on the corner.',
        translations: L(
          '은행은 모퉁이에 있어요.',
          'Bank burchakda.',
          'The bank is on the corner.',
          'Банк находится на углу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɔːnə/',
      ttsText: 'corner',
    },
    tags: ['directions', 'places', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-left',
    english: 'left',
    senseKey: 'left-side-or-direction',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '왼쪽',
      'chap tomon',
      'the direction or side opposite right',
      'левая сторона',
    ),
    examples: [
      {
        english: 'Turn left here.',
        translations: L(
          '여기서 왼쪽으로 도세요.',
          'Bu yerda chapga buriling.',
          'Turn left here.',
          'Здесь поверните налево.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/left/',
      ttsText: 'left',
    },
    tags: ['directions', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-right',
    english: 'right',
    senseKey: 'right-side-or-direction',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '오른쪽',
      'o‘ng tomon',
      'the direction or side opposite left',
      'правая сторона',
    ),
    examples: [
      {
        english: 'Turn right here.',
        translations: L(
          '여기서 오른쪽으로 도세요.',
          'Bu yerda o‘ngga buriling.',
          'Turn right here.',
          'Здесь поверните направо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪt/',
      ttsText: 'right',
    },
    tags: ['directions', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adv-straight',
    english: 'straight',
    senseKey: 'directly-forward-without-turning',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('곧장', 'to‘g‘ri', 'directly forward without turning', 'прямо'),
    examples: [
      {
        english: 'Go straight on.',
        translations: L(
          '곧장 가세요.',
          'To‘g‘ri boring.',
          'Go straight on.',
          'Идите прямо.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/streɪt/',
      ttsText: 'straight',
    },
    tags: ['directions', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-preposition-past',
    english: 'past',
    senseKey: 'beyond-a-place-while-moving',
    partOfSpeech: WordPartOfSpeech.OTHER,
    meaning: L(
      '~을 지나서',
      'yonidan o‘tib',
      'beyond a place while moving',
      'мимо',
    ),
    examples: [
      {
        english: 'Go past the bank.',
        translations: L(
          '은행을 지나가세요.',
          'Bank yonidan o‘ting.',
          'Go past the bank.',
          'Пройдите мимо банка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɑːst/',
      ttsText: 'past',
    },
    tags: ['directions', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-turn',
    english: 'turn',
    senseKey: 'change-direction',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '돌다; 방향을 바꾸다',
      'burilmoq',
      'to change the direction in which you are moving',
      'поворачивать',
    ),
    examples: [
      {
        english: 'Turn right at the bank.',
        translations: L(
          '은행에서 오른쪽으로 도세요.',
          'Bank oldida o‘ngga buriling.',
          'Turn right at the bank.',
          'Поверните направо у банка.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɜːn/',
      ttsText: 'turn',
    },
    tags: ['directions', 'verbs', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-temple',
    english: 'temple',
    senseKey: 'building-used-for-religious-worship',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사원',
      'ibodatxona',
      'a building used for religious worship',
      'храм',
    ),
    examples: [
      {
        english: 'Do not take photographs inside the temple.',
        translations: L(
          '사원 안에서 사진을 찍지 마세요.',
          'Ibodatxona ichida suratga olmang.',
          'Do not take photographs inside the temple.',
          'Не фотографируйте внутри храма.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtempəl/',
      ttsText: 'temple',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-cave',
    english: 'cave',
    senseKey: 'large-natural-hole-in-ground-or-rock',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '동굴',
      'g‘or',
      'a large natural hole in the ground or in rock',
      'пещера',
    ),
    examples: [
      {
        english: 'The tour visits caves and temples.',
        translations: L(
          '그 투어는 동굴과 사원을 방문해요.',
          'Sayohat g‘orlar va ibodatxonalarni ziyorat qiladi.',
          'The tour visits caves and temples.',
          'Экскурсия посещает пещеры и храмы.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/keɪv/',
      ttsText: 'cave',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-passport',
    english: 'passport',
    senseKey: 'official-document-for-international-travel',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '여권',
      'pasport',
      'an official document used for international travel',
      'паспорт',
    ),
    examples: [
      {
        english: 'Bring your passport with you.',
        translations: L(
          '여권을 가져오세요.',
          'Pasportingizni o‘zingiz bilan olib keling.',
          'Bring your passport with you.',
          'Возьмите с собой паспорт.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpɑːspɔːt/',
      ttsText: 'passport',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-scarf',
    english: 'scarf',
    senseKey: 'cloth-worn-around-neck-or-head',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스카프',
      'sharf',
      'a piece of cloth worn around the neck or head',
      'шарф',
    ),
    examples: [
      {
        english: 'Take a hat or scarf.',
        translations: L(
          '모자나 스카프를 가져가세요.',
          'Shlyapa yoki sharf oling.',
          'Take a hat or scarf.',
          'Возьмите шляпу или шарф.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/skɑːf/',
      ttsText: 'scarf',
    },
    tags: ['travel', 'clothes', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-sunhat',
    english: 'sunhat',
    senseKey: 'hat-protecting-head-from-sun',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '햇빛 가리개 모자',
      'quyoshdan saqlovchi bosh kiyim',
      'a hat worn to protect the head from the sun',
      'шляпа от солнца',
    ),
    examples: [
      {
        english: 'Bring a sunhat.',
        translations: L(
          '햇빛 가리개 모자를 가져오세요.',
          'Quyoshdan saqlovchi bosh kiyim olib keling.',
          'Bring a sunhat.',
          'Возьмите шляпу от солнца.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌnhæt/',
      ttsText: 'sunhat',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tap',
    english: 'tap',
    senseKey: 'device-controlling-water-flow',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '수도꼭지',
      'kran',
      'a device that controls the flow of water',
      'кран',
    ),
    examples: [
      {
        english: 'Do not drink water from the tap.',
        translations: L(
          '수돗물을 마시지 마세요.',
          'Krandan suv ichmang.',
          'Do not drink water from the tap.',
          'Не пейте воду из-под крана.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tæp/',
      ttsText: 'tap',
    },
    tags: ['travel', 'home', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-booking',
    english: 'booking',
    senseKey: 'arrangement-to-reserve-place-or-service',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '예약',
      'bron',
      'an arrangement to reserve a place, ticket or service',
      'бронирование',
    ),
    examples: [
      {
        english: 'Bring the booking form.',
        translations: L(
          '예약 양식을 가져오세요.',
          'Bron shaklini olib keling.',
          'Bring the booking form.',
          'Возьмите форму бронирования.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbʊkɪŋ/',
      ttsText: 'booking',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-photograph',
    english: 'photograph',
    senseKey: 'picture-made-with-camera',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사진',
      'fotosurat',
      'a picture made using a camera',
      'фотография',
    ),
    examples: [
      {
        english: 'Do not take photographs inside the temple.',
        translations: L(
          '사원 안에서 사진을 찍지 마세요.',
          'Ibodatxona ichida fotosurat olmang.',
          'Do not take photographs inside the temple.',
          'Не фотографируйте внутри храма.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfəʊtəɡrɑːf/',
      ttsText: 'photograph',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-tip',
    english: 'tip',
    senseKey: 'extra-money-given-for-service',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '팁',
      'choychaqa',
      'extra money given to someone for a service',
      'чаевые',
    ),
    examples: [
      {
        english: 'Bring some money to tip the bus driver.',
        translations: L(
          '버스 기사에게 팁을 줄 돈을 조금 가져오세요.',
          'Avtobus haydovchisiga choychaqa berish uchun pul olib keling.',
          'Bring some money to tip the bus driver.',
          'Возьмите деньги на чаевые водителю автобуса.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tɪp/',
      ttsText: 'tip',
    },
    tags: ['travel', 'bali', 'unit4'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT4_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Asking for directions
  // ===========================================================

  en_s2u4_n4_001_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Excuse me, could you give me some directions, please?',
      },
    ],
    options: [
      'Yes, of course.',
      'Yes, there is.',
      'Turned left.',
      'I am directions.',
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
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Excuse ___, could you give me some directions?',
    blankAnswers: ['me'],
    options: ['me', 'I', 'my', 'mine'],
    answer: 'me',
    answerTranslation: L(
      '실례합니다. 길을 좀 알려주시겠어요?',
      'Kechirasiz, menga yo‘lni ko‘rsata olasizmi?',
      'Excuse me, could you give me some directions?',
      'Извините, не могли бы вы подсказать дорогу?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Is there a chemist ___ here?',
    blankAnswers: ['near'],
    options: ['near', 'past', 'left', 'end'],
    answer: 'near',
    answerTranslation: L(
      '이 근처에 약국이 있나요?',
      'Bu yer yaqinida dorixona bormi?',
      'Is there a chemist near here?',
      'Здесь рядом есть аптека?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How do I ___ there?',
    blankAnswers: ['get'],
    options: ['get', 'turn', 'past', 'straight'],
    answer: 'get',
    answerTranslation: L(
      '거기에 어떻게 가나요?',
      'U yerga qanday boraman?',
      'How do I get there?',
      'Как мне туда добраться?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_005_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do I get to the bank?' }],
    options: [
      'Go straight on and turn left.',
      'The bank is money.',
      'I go to the bank yesterday.',
      'It is a direction.',
    ],
    answer: 'Go straight on and turn left.',
    answerTranslation: L(
      '곧장 가서 왼쪽으로 도세요.',
      'To‘g‘ri boring va chapga buriling.',
      'Go straight on and turn left.',
      'Идите прямо и поверните налево.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_006_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Excuse me, where’s the post office?' },
    ],
    options: [
      'It’s near the bank.',
      'I post office.',
      'Go is the office.',
      'The bank goes.',
    ],
    answer: 'It’s near the bank.',
    answerTranslation: L(
      '은행 근처에 있어요.',
      'U bank yaqinida.',
      'It’s near the bank.',
      'Это рядом с банком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_007_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Is there an internet café near here?' },
    ],
    options: [
      'Yes, there is.',
      'Yes, there are.',
      'Yes, it does.',
      'Yes, I am.',
    ],
    answer: 'Yes, there is.',
    answerTranslation: L(
      '네, 있어요.',
      'Ha, bor.',
      'Yes, there is.',
      'Да, есть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Could you give me some ___, please?',
    blankAnswers: ['directions'],
    options: ['directions', 'corners', 'lefts', 'roads'],
    answer: 'directions',
    answerTranslation: L(
      '길을 좀 알려주시겠어요?',
      'Menga yo‘lni ko‘rsata olasizmi?',
      'Could you give me some directions, please?',
      'Не могли бы вы подсказать мне дорогу?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_009_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Excuse', 'me', 'where’s', 'the', 'bank'],
    answer: 'Excuse me where’s the bank',
    audioText: 'Excuse me, where’s the bank?',
    answerTranslation: L(
      '실례합니다. 은행이 어디에 있나요?',
      'Kechirasiz, bank qayerda?',
      'Excuse me, where’s the bank?',
      'Извините, где банк?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_010_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['How', 'do', 'I', 'get', 'there'],
    answer: 'How do I get there',
    answerTranslation: L(
      '거기에 어떻게 가나요?',
      'U yerga qanday boraman?',
      'How do I get there?',
      'Как мне туда добраться?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_011_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Is there a chemist near here?',
    audioText: 'Is there a chemist near here?',
    answerI18n: L(
      '이 근처에 약국이 있나요',
      'Bu yer yaqinida dorixona bormi',
      'Is there a chemist near here',
      'Здесь рядом есть аптека',
    ),
    options: ['Is', 'there', 'a', 'chemist', 'near', 'here?'],
    optionsI18n: {
      ko: ['이', '근처에', '약국이', '있나요'],
      uz: ['Bu', 'yer', 'yaqinida', 'dorixona', 'bormi'],
      en: ['Is', 'there', 'a', 'chemist', 'near', 'here?'],
      ru: ['Здесь', 'рядом', 'есть', 'аптека'],
    },
    answerTranslation: L(
      '이 근처에 약국이 있나요?',
      'Bu yer yaqinida dorixona bormi?',
      'Is there a chemist near here?',
      'Здесь рядом есть аптека?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How can I ___ you?',
    blankAnswers: ['help'],
    options: ['help', 'past', 'straight', 'corner'],
    answer: 'help',
    answerTranslation: L(
      '무엇을 도와드릴까요?',
      'Sizga qanday yordam bera olaman?',
      'How can I help you?',
      'Чем я могу вам помочь?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions', 'conversation'],
  },

  en_s2u4_n4_013_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Excuse me, could you give us some directions, please?',
      },
    ],
    options: [
      'Yes, of course. How can I help you?',
      'No, directions are left.',
      'Yes, I am a road.',
      'Go yesterday.',
    ],
    answer: 'Yes, of course. How can I help you?',
    answerTranslation: L(
      '네, 물론이죠. 무엇을 도와드릴까요?',
      'Ha, albatta. Sizga qanday yordam bera olaman?',
      'Yes, of course. How can I help you?',
      'Да, конечно. Чем могу помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'conversation'],
  },

  en_s2u4_n4_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We want to ___ to the theatre.',
    blankAnswers: ['get'],
    options: ['get', 'past', 'left', 'corner'],
    answer: 'get',
    answerTranslation: L(
      '극장에 가고 싶어요.',
      'Biz teatrga bormoqchimiz.',
      'We want to get to the theatre.',
      'Мы хотим добраться до театра.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me, where’s the bank?',
    audioText: 'Excuse me, where’s the bank?',
    answerTranslation: L(
      '실례합니다. 은행이 어디에 있나요?',
      'Kechirasiz, bank qayerda?',
      'Excuse me, where’s the bank?',
      'Извините, где банк?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_016_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How do I get to the post office?',
    audioText: 'How do I get to the post office?',
    answerTranslation: L(
      '우체국에 어떻게 가나요?',
      'Pochta bo‘limiga qanday boraman?',
      'How do I get to the post office?',
      'Как добраться до почты?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Could you give me some directions, please?',
    audioText: 'Could you give me some directions, please?',
    answerTranslation: L(
      '길을 좀 알려주시겠어요?',
      'Menga yo‘lni ko‘rsata olasizmi?',
      'Could you give me some directions, please?',
      'Не могли бы вы подсказать дорогу?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is there a supermarket near here?',
    audioText: 'Is there a supermarket near here?',
    answerTranslation: L(
      '이 근처에 슈퍼마켓이 있나요?',
      'Bu yer yaqinida supermarket bormi?',
      'Is there a supermarket near here?',
      'Здесь рядом есть супермаркет?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'asking'],
  },

  en_s2u4_n4_019_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Thanks for your help.' }],
    options: [
      'You’re welcome.',
      'Turn left.',
      'Where is help?',
      'Go straight thanks.',
    ],
    answer: 'You’re welcome.',
    answerTranslation: L(
      '천만에요.',
      'Arzimaydi.',
      'You’re welcome.',
      'Пожалуйста.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions', 'conversation'],
  },

  en_s2u4_n4_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We can ask for directions with Where’s, How do I get to, Is there, and Could you give me some directions?',
    audioText:
      'We can ask for directions with Where’s, How do I get to, Is there, and Could you give me some directions?',
    answerTranslation: L(
      'Where’s, How do I get to, Is there, Could you give me some directions?를 사용해 길을 물을 수 있어요.',
      'Yo‘l so‘rash uchun Where’s, How do I get to, Is there va Could you give me some directions? ishlatiladi.',
      'We can ask for directions with Where’s, How do I get to, Is there, and Could you give me some directions?',
      'Для вопроса о дороге можно использовать Where’s, How do I get to, Is there и Could you give me some directions?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'review'],
  },

  // ===========================================================
  // Lesson 2 · Giving directions
  // ===========================================================

  en_s2u4_n4_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'turn left',
        native: 'chapga buriling',
        nativeI18n: L(
          '왼쪽으로 도세요',
          'chapga buriling',
          'turn left',
          'поверните налево',
        ),
      },
      {
        text: 'turn right',
        native: 'o‘ngga buriling',
        nativeI18n: L(
          '오른쪽으로 도세요',
          'o‘ngga buriling',
          'turn right',
          'поверните направо',
        ),
      },
      {
        text: 'go straight on',
        native: 'to‘g‘ri boring',
        nativeI18n: L(
          '곧장 가세요',
          'to‘g‘ri boring',
          'go straight on',
          'идите прямо',
        ),
      },
      {
        text: 'go past',
        native: 'yonidan o‘ting',
        nativeI18n: L(
          '지나가세요',
          'yonidan o‘ting',
          'go past',
          'пройдите мимо',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'giving'],
  },

  en_s2u4_n4_022_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'on the left',
        native: 'chap tomonda',
        nativeI18n: L('왼쪽에', 'chap tomonda', 'on the left', 'слева'),
      },
      {
        text: 'on the right',
        native: 'o‘ng tomonda',
        nativeI18n: L('오른쪽에', 'o‘ng tomonda', 'on the right', 'справа'),
      },
      {
        text: 'on the corner',
        native: 'burchakda',
        nativeI18n: L('모퉁이에', 'burchakda', 'on the corner', 'на углу'),
      },
      {
        text: 'at the end',
        native: 'oxirida',
        nativeI18n: L('끝에', 'oxirida', 'at the end', 'в конце'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'giving'],
  },

  en_s2u4_n4_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Turn ___ at the bank.',
    blankAnswers: ['left'],
    options: ['left', 'past', 'straight', 'corner'],
    answer: 'left',
    answerTranslation: L(
      '은행에서 왼쪽으로 도세요.',
      'Bank oldida chapga buriling.',
      'Turn left at the bank.',
      'Поверните налево у банка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'left'],
  },

  en_s2u4_n4_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Turn ___ into Raya Andong.',
    blankAnswers: ['right'],
    options: ['right', 'past', 'end', 'straight'],
    answer: 'right',
    answerTranslation: L(
      'Raya Andong으로 오른쪽으로 도세요.',
      'Raya Andongga o‘ngga buriling.',
      'Turn right into Raya Andong.',
      'Поверните направо на Raya Andong.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'right'],
  },

  en_s2u4_n4_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go ___ on for about five minutes.',
    blankAnswers: ['straight'],
    options: ['straight', 'corner', 'left', 'end'],
    answer: 'straight',
    answerTranslation: L(
      '약 5분 동안 곧장 가세요.',
      'Taxminan besh daqiqa to‘g‘ri boring.',
      'Go straight on for about five minutes.',
      'Идите прямо примерно пять минут.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'straight'],
  },

  en_s2u4_n4_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go ___ the internet café and the bank.',
    blankAnswers: ['past'],
    options: ['past', 'left', 'right', 'end'],
    answer: 'past',
    answerTranslation: L(
      '인터넷 카페와 은행을 지나가세요.',
      'Internet kafe va bank yonidan o‘ting.',
      'Go past the internet café and the bank.',
      'Пройдите мимо интернет-кафе и банка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'past'],
  },

  en_s2u4_n4_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Take the first ___ on the left.',
    blankAnswers: ['road'],
    options: ['road', 'corner', 'direction', 'bank'],
    answer: 'road',
    answerTranslation: L(
      '첫 번째 길에서 왼쪽으로 가세요.',
      'Birinchi yo‘lda chapga buriling.',
      'Take the first road on the left.',
      'Сверните на первую дорогу слева.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['directions'],
  },

  en_s2u4_n4_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Take the ___ road on the right.',
    blankAnswers: ['second'],
    options: ['second', 'past', 'straight', 'corner'],
    answer: 'second',
    answerTranslation: L(
      '두 번째 길에서 오른쪽으로 가세요.',
      'Ikkinchi yo‘lda o‘ngga buriling.',
      'Take the second road on the right.',
      'Сверните на вторую дорогу справа.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_029_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is on the ___ of the road.',
    blankAnswers: ['left'],
    options: ['left', 'past', 'straight', 'turn'],
    answer: 'left',
    answerTranslation: L(
      '길의 왼쪽에 있어요.',
      'U yo‘lning chap tomonida.',
      'It is on the left of the road.',
      'Это находится слева от дороги.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The shop is on the ___.',
    blankAnswers: ['corner'],
    options: ['corner', 'straight', 'past', 'direction'],
    answer: 'corner',
    answerTranslation: L(
      '가게는 모퉁이에 있어요.',
      'Do‘kon burchakda.',
      'The shop is on the corner.',
      'Магазин находится на углу.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions', 'corner'],
  },

  en_s2u4_n4_031_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go to the ___ of the road.',
    blankAnswers: ['end'],
    options: ['end', 'past', 'left', 'straight'],
    answer: 'end',
    answerTranslation: L(
      '길 끝까지 가세요.',
      'Yo‘lning oxirigacha boring.',
      'Go to the end of the road.',
      'Идите до конца дороги.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Where is the chemist?' }],
    options: [
      'It’s on the left, next to the supermarket.',
      'Go is left supermarket.',
      'It’s straight yesterday.',
      'The chemist turns me.',
    ],
    answer: 'It’s on the left, next to the supermarket.',
    answerTranslation: L(
      '왼쪽에 있고 슈퍼마켓 옆이에요.',
      'U chap tomonda, supermarket yonida.',
      'It’s on the left, next to the supermarket.',
      'Она слева, рядом с супермаркетом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'giving'],
  },

  en_s2u4_n4_033_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do I get to the theatre?' }],
    options: [
      'Go straight on, past the bank, and turn right.',
      'The theatre is watching.',
      'I went theatre tomorrow.',
      'Go theatre is bank.',
    ],
    answer: 'Go straight on, past the bank, and turn right.',
    answerTranslation: L(
      '곧장 가서 은행을 지나 오른쪽으로 도세요.',
      'To‘g‘ri boring, bank yonidan o‘tib o‘ngga buriling.',
      'Go straight on, past the bank, and turn right.',
      'Идите прямо, пройдите мимо банка и поверните направо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'giving'],
  },

  en_s2u4_n4_034_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Go', 'straight', 'on', 'for', 'ten', 'minutes'],
    answer: 'Go straight on for ten minutes',
    audioText: 'Go straight on for ten minutes.',
    answerTranslation: L(
      '10분 동안 곧장 가세요.',
      'O‘n daqiqa to‘g‘ri boring.',
      'Go straight on for ten minutes.',
      'Идите прямо десять минут.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_035_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Take', 'the', 'second', 'road', 'on', 'the', 'right'],
    answer: 'Take the second road on the right',
    audioText: 'Take the second road on the right.',
    answerTranslation: L(
      '두 번째 길에서 오른쪽으로 가세요.',
      'Ikkinchi yo‘lda o‘ngga buriling.',
      'Take the second road on the right.',
      'Сверните на вторую дорогу справа.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['directions'],
  },

  en_s2u4_n4_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Go', 'past', 'the', 'bank'],
    answer: 'Go past the bank',
    answerTranslation: L(
      '은행을 지나가세요.',
      'Bank yonidan o‘ting.',
      'Go past the bank.',
      'Пройдите мимо банка.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_037_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Turn left at the end of the road.',
    audioText: 'Turn left at the end of the road.',
    answerI18n: L(
      '길 끝에서 왼쪽으로 도세요',
      'Yo‘l oxirida chapga buriling',
      'Turn left at the end of the road',
      'В конце дороги поверните налево',
    ),
    options: ['Turn', 'left', 'at', 'the', 'end', 'of', 'the', 'road.'],
    optionsI18n: {
      ko: ['길', '끝에서', '왼쪽으로', '도세요'],
      uz: ['Yo‘l', 'oxirida', 'chapga', 'buriling'],
      en: ['Turn', 'left', 'at', 'the', 'end', 'of', 'the', 'road.'],
      ru: ['В', 'конце', 'дороги', 'поверните', 'налево'],
    },
    answerTranslation: L(
      '길 끝에서 왼쪽으로 도세요.',
      'Yo‘l oxirida chapga buriling.',
      'Turn left at the end of the road.',
      'В конце дороги поверните налево.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['directions'],
  },

  en_s2u4_n4_038_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Go straight on and take the first left.',
    audioText: 'Go straight on and take the first left.',
    answerTranslation: L(
      '곧장 가서 첫 번째 길에서 왼쪽으로 가세요.',
      'To‘g‘ri boring va birinchi yo‘lda chapga buriling.',
      'Go straight on and take the first left.',
      'Идите прямо и поверните на первом повороте налево.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Go past the internet café and turn right.',
    audioText: 'Go past the internet café and turn right.',
    answerTranslation: L(
      '인터넷 카페를 지나 오른쪽으로 도세요.',
      'Internet kafe yonidan o‘tib o‘ngga buriling.',
      'Go past the internet café and turn right.',
      'Пройдите мимо интернет-кафе и поверните направо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['directions'],
  },

  en_s2u4_n4_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'We give directions with expressions such as turn left, turn right, go straight on, go past, and take the first or second road.',
    audioText:
      'We give directions with expressions such as turn left, turn right, go straight on, go past, and take the first or second road.',
    answerTranslation: L(
      'turn left, turn right, go straight on, go past, take the first/second road 같은 표현으로 길을 안내해요.',
      'Yo‘l ko‘rsatishda turn left, turn right, go straight on, go past va take the first yoki second road kabi iboralar ishlatiladi.',
      'We give directions with expressions such as turn left, turn right, go straight on, go past, and take the first or second road.',
      'Для указания дороги используются turn left, turn right, go straight on, go past и take the first или second road.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Imperatives and Bali tour
  // ===========================================================

  en_s2u4_n4_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ by 9.30 a.m.',
    blankAnswers: ['Arrive'],
    options: ['Arrive', 'Arrives', 'Arriving', 'To arrive'],
    answer: 'Arrive',
    answerTranslation: L(
      '오전 9시 30분까지 도착하세요.',
      'Soat 9:30 gacha yetib keling.',
      'Arrive by 9.30 a.m.',
      'Приходите к 9:30.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ the booking form and your passport.',
    blankAnswers: ['Bring'],
    options: ['Bring', 'Brings', 'Bringing', 'To bring'],
    answer: 'Bring',
    answerTranslation: L(
      '예약 양식과 여권을 가져오세요.',
      'Bron shakli va pasportingizni olib keling.',
      'Bring the booking form and your passport.',
      'Возьмите форму бронирования и паспорт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ comfortable shoes for the walk.',
    blankAnswers: ['Wear'],
    options: ['Wear', 'Wears', 'Wearing', 'To wear'],
    answer: 'Wear',
    answerTranslation: L(
      '걷기 편한 신발을 신으세요.',
      'Yurish uchun qulay oyoq kiyim kiying.',
      'Wear comfortable shoes for the walk.',
      'Наденьте удобную обувь для прогулки.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a hat or scarf.',
    blankAnswers: ['Take'],
    options: ['Take', 'Takes', 'Taking', 'To take'],
    answer: 'Take',
    answerTranslation: L(
      '모자나 스카프를 가져가세요.',
      'Shlyapa yoki sharf oling.',
      'Take a hat or scarf.',
      'Возьмите шляпу или шарф.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Please ___ take photographs inside the temple.',
    blankAnswers: ["don't"],
    options: ["don't", "doesn't", 'not', "isn't"],
    answer: "don't",
    answerTranslation: L(
      '사원 안에서는 사진을 찍지 마세요.',
      'Iltimos, ibodatxona ichida suratga olmang.',
      'Please don’t take photographs inside the temple.',
      'Пожалуйста, не фотографируйте внутри храма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'negative'],
  },

  en_s2u4_n4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: "Don't ___ your passport.",
    blankAnswers: ['forget'],
    options: ['forget', 'forgets', 'forgot', 'forgetting'],
    answer: 'forget',
    answerTranslation: L(
      '여권을 잊지 마세요.',
      'Pasportingizni unutmang.',
      'Don’t forget your passport.',
      'Не забудьте паспорт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'negative'],
  },

  en_s2u4_n4_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a sunhat. It’s very hot in Bali.',
    blankAnswers: ['Bring'],
    options: ['Bring', 'Drink', 'Leave', 'Learn'],
    answer: 'Bring',
    answerTranslation: L(
      '햇빛 가리개 모자를 가져오세요. Bali는 매우 더워요.',
      'Quyoshdan saqlovchi bosh kiyim olib keling. Balida juda issiq.',
      'Bring a sunhat. It’s very hot in Bali.',
      'Возьмите шляпу от солнца. На Бали очень жарко.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ when you speak to people.',
    blankAnswers: ['Smile'],
    options: ['Smile', 'Leave', 'Drink', 'Bring'],
    answer: 'Smile',
    answerTranslation: L(
      '사람들과 이야기할 때 미소 지으세요.',
      'Odamlar bilan gaplashganda tabassum qiling.',
      'Smile when you speak to people.',
      'Улыбайтесь, когда разговариваете с людьми.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ some words in the local language.',
    blankAnswers: ['Learn'],
    options: ['Learn', 'Leave', 'Drink', 'Bring'],
    answer: 'Learn',
    answerTranslation: L(
      '현지 언어의 단어 몇 개를 배우세요.',
      'Mahalliy tildan bir nechta so‘z o‘rganing.',
      'Learn some words in the local language.',
      'Выучите несколько слов на местном языке.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your left hand to give or pass things.',
    blankAnswers: ["Don't use"],
    options: ["Don't use", 'Use', 'Drink', 'Leave'],
    answer: "Don't use",
    answerTranslation: L(
      '물건을 건네줄 때 왼손을 사용하지 마세요.',
      'Narsalarni berishda chap qo‘lingizdan foydalanmang.',
      'Don’t use your left hand to give or pass things.',
      'Не используйте левую руку, когда передаёте вещи.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['imperatives', 'negative', 'bali'],
  },

  en_s2u4_n4_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ water from the tap.',
    blankAnswers: ["Don't drink"],
    options: ["Don't drink", 'Drink', 'Bring', 'Learn'],
    answer: "Don't drink",
    answerTranslation: L(
      '수돗물을 마시지 마세요.',
      'Krandan suv ichmang.',
      'Don’t drink water from the tap.',
      'Не пейте воду из-под крана.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['imperatives', 'negative', 'bali'],
  },

  en_s2u4_n4_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      '___ your shoes at the door when you go into someone’s house.',
    blankAnswers: ['Leave'],
    options: ['Leave', 'Drink', 'Learn', 'Smile'],
    answer: 'Leave',
    answerTranslation: L(
      '다른 사람의 집에 들어갈 때 신발은 문 앞에 두세요.',
      'Birovning uyiga kirganda oyoq kiyimingizni eshik oldida qoldiring.',
      'Leave your shoes at the door when you go into someone’s house.',
      'Оставляйте обувь у двери, когда входите в чей-то дом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_053_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What does an imperative do?' }],
    options: [
      'It tells people what to do or gives instructions.',
      'It always asks a question.',
      'It describes the past.',
      'It only describes people.',
    ],
    answer: 'It tells people what to do or gives instructions.',
    answerTranslation: L(
      '사람에게 무엇을 하라고 말하거나 지시를 해요.',
      'U odamlarga nima qilish kerakligini aytadi yoki ko‘rsatma beradi.',
      'It tells people what to do or gives instructions.',
      'Он говорит, что нужно делать, или даёт инструкции.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['imperatives'],
  },

  en_s2u4_n4_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The imperative uses the infinitive ___ “to”.',
    blankAnswers: ['without'],
    options: ['without', 'with', 'after', 'before'],
    answer: 'without',
    answerTranslation: L(
      '명령문은 to 없이 동사원형을 사용해요.',
      'Buyruq gapda infinitiv to siz ishlatiladi.',
      'The imperative uses the infinitive without “to”.',
      'В повелительном наклонении инфинитив используется без to.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['imperatives'],
  },

  en_s2u4_n4_055_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'For a negative imperative, use “don’t” + ___.',
    blankAnswers: ['infinitive'],
    options: ['infinitive', 'past tense', 'noun', 'adjective'],
    answer: 'infinitive',
    answerTranslation: L(
      '부정 명령문은 don’t + 동사원형을 사용해요.',
      'Inkor buyruqda don’t + infinitive ishlatiladi.',
      'For a negative imperative, use “don’t” + infinitive.',
      'Для отрицательного императива используйте don’t + инфинитив.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['imperatives', 'negative'],
  },

  en_s2u4_n4_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Bring', 'your', 'passport', 'with', 'you'],
    answer: 'Bring your passport with you',
    audioText: 'Bring your passport with you.',
    answerTranslation: L(
      '여권을 가져오세요.',
      'Pasportingizni o‘zingiz bilan olib keling.',
      'Bring your passport with you.',
      'Возьмите с собой паспорт.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ["Don't", 'forget', 'your', 'passport'],
    answer: "Don't forget your passport",
    answerTranslation: L(
      '여권을 잊지 마세요.',
      'Pasportingizni unutmang.',
      'Don’t forget your passport.',
      'Не забудьте паспорт.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['imperatives', 'negative'],
  },

  en_s2u4_n4_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Please do not take photographs inside the temple.',
    audioText: 'Please do not take photographs inside the temple.',
    answerI18n: L(
      '사원 안에서는 사진을 찍지 마세요',
      'Iltimos, ibodatxona ichida suratga olmang',
      'Please do not take photographs inside the temple',
      'Пожалуйста, не фотографируйте внутри храма',
    ),
    options: [
      'Please',
      'do',
      'not',
      'take',
      'photographs',
      'inside',
      'the',
      'temple.',
    ],
    optionsI18n: {
      ko: ['사원', '안에서는', '사진을', '찍지', '마세요'],
      uz: ['Iltimos', 'ibodatxona', 'ichida', 'suratga', 'olmang'],
      en: [
        'Please',
        'do',
        'not',
        'take',
        'photographs',
        'inside',
        'the',
        'temple.',
      ],
      ru: ['Пожалуйста', 'не', 'фотографируйте', 'внутри', 'храма'],
    },
    answerTranslation: L(
      '사원 안에서는 사진을 찍지 마세요.',
      'Iltimos, ibodatxona ichida suratga olmang.',
      'Please do not take photographs inside the temple.',
      'Пожалуйста, не фотографируйте внутри храма.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Arrive by nine thirty, bring your passport, and wear comfortable shoes.',
    audioText:
      'Arrive by nine thirty, bring your passport, and wear comfortable shoes.',
    answerTranslation: L(
      '9시 30분까지 도착하고 여권을 가져오며 편한 신발을 신으세요.',
      'Soat 9:30 gacha yetib keling, pasportingizni olib keling va qulay oyoq kiyim kiying.',
      'Arrive by nine thirty, bring your passport, and wear comfortable shoes.',
      'Приходите к 9:30, возьмите паспорт и наденьте удобную обувь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['imperatives', 'bali'],
  },

  en_s2u4_n4_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Imperatives use the base form of the verb, and negative imperatives use don’t plus the base form.',
    audioText:
      'Imperatives use the base form of the verb, and negative imperatives use don’t plus the base form.',
    answerTranslation: L(
      '명령문은 동사원형을 사용하고 부정 명령문은 don’t와 동사원형을 사용해요.',
      'Buyruq gapda fe’lning asosiy shakli, inkor buyruqda esa don’t va fe’lning asosiy shakli ishlatiladi.',
      'Imperatives use the base form of the verb, and negative imperatives use don’t plus the base form.',
      'Императив использует основную форму глагола, а отрицательный — don’t плюс основная форма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['imperatives', 'review'],
  },

  // ===========================================================
  // Lesson 4 · Workbook directions and writing
  // ===========================================================

  en_s2u4_n4_061_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is on the ___.',
    blankAnswers: ['left'],
    options: ['left', 'past', 'straight', 'end'],
    answer: 'left',
    answerTranslation: L(
      '왼쪽에 있어요.',
      'U chap tomonda.',
      'It is on the left.',
      'Это слева.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go to the ___ of the road.',
    blankAnswers: ['end'],
    options: ['end', 'left', 'past', 'turn'],
    answer: 'end',
    answerTranslation: L(
      '길 끝까지 가세요.',
      'Yo‘l oxirigacha boring.',
      'Go to the end of the road.',
      'Идите до конца дороги.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Take the ___ left.',
    blankAnswers: ['first'],
    options: ['first', 'past', 'straight', 'corner'],
    answer: 'first',
    answerTranslation: L(
      '첫 번째 길에서 왼쪽으로 가세요.',
      'Birinchi yo‘lda chapga buriling.',
      'Take the first left.',
      'Поверните на первом повороте налево.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is on the ___.',
    blankAnswers: ['corner'],
    options: ['corner', 'straight', 'past', 'turn'],
    answer: 'corner',
    answerTranslation: L(
      '모퉁이에 있어요.',
      'U burchakda.',
      'It is on the corner.',
      'Это на углу.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ right.',
    blankAnswers: ['Turn'],
    options: ['Turn', 'Past', 'Corner', 'End'],
    answer: 'Turn',
    answerTranslation: L(
      '오른쪽으로 도세요.',
      'O‘ngga buriling.',
      'Turn right.',
      'Поверните направо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go ___ on.',
    blankAnswers: ['straight'],
    options: ['straight', 'past', 'corner', 'left'],
    answer: 'straight',
    answerTranslation: L(
      '곧장 가세요.',
      'To‘g‘ri boring.',
      'Go straight on.',
      'Идите прямо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ the second left.',
    blankAnswers: ['Take'],
    options: ['Take', 'Go', 'Past', 'End'],
    answer: 'Take',
    answerTranslation: L(
      '두 번째 길에서 왼쪽으로 가세요.',
      'Ikkinchi yo‘lda chapga buriling.',
      'Take the second left.',
      'Поверните на втором повороте налево.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go ___ the cinema.',
    blankAnswers: ['past'],
    options: ['past', 'turn', 'corner', 'left'],
    answer: 'past',
    answerTranslation: L(
      '영화관을 지나가세요.',
      'Kinoteatr yonidan o‘ting.',
      'Go past the cinema.',
      'Пройдите мимо кинотеатра.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_069_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Excuse me, how do we get to the theatre?' },
    ],
    options: [
      'Go out of the main door and turn right.',
      'The theatre is an actor.',
      'We get yesterday.',
      'Go door was right.',
    ],
    answer: 'Go out of the main door and turn right.',
    answerTranslation: L(
      '정문으로 나가서 오른쪽으로 도세요.',
      'Asosiy eshikdan chiqib o‘ngga buriling.',
      'Go out of the main door and turn right.',
      'Выйдите через главную дверь и поверните направо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Excuse me, could you give us some directions, please?',
      },
    ],
    options: [
      'Yes, of course. How can I help you?',
      'I am the directions.',
      'No, turn road.',
      'Yes, directions was.',
    ],
    answer: 'Yes, of course. How can I help you?',
    answerTranslation: L(
      '네, 물론이죠. 무엇을 도와드릴까요?',
      'Ha, albatta. Sizga qanday yordam bera olaman?',
      'Yes, of course. How can I help you?',
      'Да, конечно. Чем я могу помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['workbook', 'directions'],
  },

  en_s2u4_n4_071_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Please ___ your dishes.',
    blankAnswers: ['wash'],
    options: ['wash', 'washing', 'washed', 'washes'],
    answer: 'wash',
    answerTranslation: L(
      '접시를 씻어 주세요.',
      'Iltimos, idishlaringizni yuving.',
      'Please wash your dishes.',
      'Пожалуйста, мойте свою посуду.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'imperatives'],
  },

  en_s2u4_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Please ___ leave dirty cups and plates in the sink.',
    blankAnswers: ["don't"],
    options: ["don't", "doesn't", 'not', "isn't"],
    answer: "don't",
    answerTranslation: L(
      '더러운 컵과 접시를 싱크대에 두지 마세요.',
      'Iltimos, iflos piyola va likopchalarni rakovinada qoldirmang.',
      'Please don’t leave dirty cups and plates in the sink.',
      'Пожалуйста, не оставляйте грязные чашки и тарелки в раковине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'imperatives'],
  },

  en_s2u4_n4_073_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Please ___ the shower after you use it.',
    blankAnswers: ['clean'],
    options: ['clean', 'cleaning', 'cleaned', 'cleans'],
    answer: 'clean',
    answerTranslation: L(
      '샤워를 사용한 후 청소해 주세요.',
      'Dushdan foydalangandan keyin uni tozalang.',
      'Please clean the shower after you use it.',
      'Пожалуйста, убирайте душ после использования.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['workbook', 'imperatives'],
  },

  en_s2u4_n4_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ["Don't", 'leave', 'dirty', 'cups', 'in', 'the', 'sink'],
    answer: "Don't leave dirty cups in the sink",
    audioText: "Don't leave dirty cups in the sink.",
    answerTranslation: L(
      '더러운 컵을 싱크대에 두지 마세요.',
      'Iflos piyolalarni rakovinada qoldirmang.',
      "Don't leave dirty cups in the sink.",
      'Не оставляйте грязные чашки в раковине.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['workbook', 'imperatives'],
  },

  en_s2u4_n4_075_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Please', 'clean', 'the', 'shower'],
    answer: 'Please clean the shower',
    answerTranslation: L(
      '샤워 공간을 청소해 주세요.',
      'Iltimos, dushni tozalang.',
      'Please clean the shower.',
      'Пожалуйста, уберите душ.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['workbook', 'imperatives'],
  },

  en_s2u4_n4_076_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Go straight on and take the second left.',
    audioText: 'Go straight on and take the second left.',
    answerI18n: L(
      '곧장 가서 두 번째 길에서 왼쪽으로 가세요',
      'To‘g‘ri boring va ikkinchi yo‘lda chapga buriling',
      'Go straight on and take the second left',
      'Идите прямо и поверните на втором повороте налево',
    ),
    options: ['Go', 'straight', 'on', 'and', 'take', 'the', 'second', 'left.'],
    optionsI18n: {
      ko: ['곧장', '가서', '두', '번째', '길에서', '왼쪽으로', '가세요'],
      uz: [
        'To‘g‘ri',
        'boring',
        'va',
        'ikkinchi',
        'yo‘lda',
        'chapga',
        'buriling',
      ],
      en: ['Go', 'straight', 'on', 'and', 'take', 'the', 'second', 'left.'],
      ru: [
        'Идите',
        'прямо',
        'и',
        'поверните',
        'на',
        'втором',
        'повороте',
        'налево',
      ],
    },
    answerTranslation: L(
      '곧장 가서 두 번째 길에서 왼쪽으로 가세요.',
      'To‘g‘ri boring va ikkinchi yo‘lda chapga buriling.',
      'Go straight on and take the second left.',
      'Идите прямо и поверните на втором повороте налево.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['directions', 'review'],
  },

  en_s2u4_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Excuse me, could you give me some directions, please? I want to get to the theatre.',
    audioText:
      'Excuse me, could you give me some directions, please? I want to get to the theatre.',
    answerTranslation: L(
      '실례합니다. 길을 좀 알려주시겠어요? 극장에 가고 싶어요.',
      'Kechirasiz, menga yo‘lni ko‘rsata olasizmi? Men teatrga bormoqchiman.',
      'Excuse me, could you give me some directions, please? I want to get to the theatre.',
      'Извините, не могли бы вы подсказать дорогу? Я хочу добраться до театра.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'review'],
  },

  en_s2u4_n4_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Go straight on, go past the bank, and turn left at the end of the road.',
    audioText:
      'Go straight on, go past the bank, and turn left at the end of the road.',
    answerTranslation: L(
      '곧장 가서 은행을 지나고 길 끝에서 왼쪽으로 도세요.',
      'To‘g‘ri boring, bank yonidan o‘ting va yo‘l oxirida chapga buriling.',
      'Go straight on, go past the bank, and turn left at the end of the road.',
      'Идите прямо, пройдите мимо банка и в конце дороги поверните налево.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['directions', 'review'],
  },

  en_s2u4_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Bring your passport, wear comfortable shoes, take a hat, and do not take photographs inside the temple.',
    audioText:
      'Bring your passport, wear comfortable shoes, take a hat, and do not take photographs inside the temple.',
    answerTranslation: L(
      '여권을 가져오고 편한 신발을 신고 모자를 챙기며 사원 안에서는 사진을 찍지 마세요.',
      'Pasportingizni olib keling, qulay oyoq kiyim kiying, bosh kiyim oling va ibodatxona ichida suratga olmang.',
      'Bring your passport, wear comfortable shoes, take a hat, and do not take photographs inside the temple.',
      'Возьмите паспорт, наденьте удобную обувь, возьмите шляпу и не фотографируйте внутри храма.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['imperatives', 'review'],
  },

  en_s2u4_n4_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'In Unit 4.4, we ask for directions, give directions with imperatives, and write instructions using positive and negative imperative forms.',
    audioText:
      'In Unit 4.4, we ask for directions, give directions with imperatives, and write instructions using positive and negative imperative forms.',
    answerTranslation: L(
      'Unit 4.4에서는 길을 묻고, 명령문으로 길을 안내하며, 긍정·부정 명령문으로 지시사항을 작성해요.',
      'Unit 4.4 da yo‘l so‘raymiz, buyruq gaplar bilan yo‘l ko‘rsatamiz va ijobiy hamda inkor buyruqlar bilan ko‘rsatmalar yozamiz.',
      'In Unit 4.4, we ask for directions, give directions with imperatives, and write instructions using positive and negative imperative forms.',
      'В Unit 4.4 мы спрашиваем и объясняем дорогу и пишем инструкции с помощью утвердительных и отрицательных императивов.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 4
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE4 = {
  title: L(
    '길 묻기와 안내하기',
    'Yo‘l so‘rash va yo‘l ko‘rsatish',
    'Asking for and giving directions',
    'Как спросить и объяснить дорогу',
  ),
  section: 2,
  unit: 4,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '길 묻기',
        'Yo‘l so‘rash',
        'Asking for directions',
        'Как спросить дорогу',
      ),
      description: L(
        'Excuse me, Where’s ...?, How do I get to ...?, Is there ... near here?, Could you give me some directions?로 길을 물어요.',
        'Excuse me, Where’s ...?, How do I get to ...?, Is there ... near here? va Could you give me some directions? bilan yo‘l so‘raysiz.',
        'Practise the key Unit 4.4 expressions for asking for directions.',
        'Практикуем основные выражения для вопроса о дороге.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s2u4_n4_001_dialog_complete',
        'en_s2u4_n4_002_fill_in_blank',
        'en_s2u4_n4_003_fill_in_blank',
        'en_s2u4_n4_004_fill_in_blank',
        'en_s2u4_n4_005_dialog_complete',
        'en_s2u4_n4_006_dialog_complete',
        'en_s2u4_n4_007_dialog_complete',
        'en_s2u4_n4_008_fill_in_blank',
        'en_s2u4_n4_009_word_arrange',
        'en_s2u4_n4_010_translate_builder',
        'en_s2u4_n4_011_sentence_builder',
        'en_s2u4_n4_012_fill_in_blank',
        'en_s2u4_n4_013_dialog_complete',
        'en_s2u4_n4_014_fill_in_blank',
        'en_s2u4_n4_015_speaking',
        'en_s2u4_n4_016_speaking',
        'en_s2u4_n4_017_speaking',
        'en_s2u4_n4_018_speaking',
        'en_s2u4_n4_019_dialog_complete',
        'en_s2u4_n4_020_speaking',
      ],
    },

    {
      title: L(
        '길 안내하기',
        'Yo‘l ko‘rsatish',
        'Giving directions',
        'Как объяснить дорогу',
      ),
      description: L(
        'turn left/right, go straight on, go past, take the first/second road와 on the corner, at the end 같은 표현으로 길을 안내해요.',
        'Turn left/right, go straight on, go past, take the first/second road hamda on the corner va at the end bilan yo‘l ko‘rsatasiz.',
        'Give directions using the map language from Unit 4.4.',
        'Объясняем дорогу с помощью выражений из Unit 4.4.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s2u4_n4_021_word_matching',
        'en_s2u4_n4_022_word_matching',
        'en_s2u4_n4_023_fill_in_blank',
        'en_s2u4_n4_024_fill_in_blank',
        'en_s2u4_n4_025_fill_in_blank',
        'en_s2u4_n4_026_fill_in_blank',
        'en_s2u4_n4_027_fill_in_blank',
        'en_s2u4_n4_028_fill_in_blank',
        'en_s2u4_n4_029_fill_in_blank',
        'en_s2u4_n4_030_fill_in_blank',
        'en_s2u4_n4_031_fill_in_blank',
        'en_s2u4_n4_032_dialog_complete',
        'en_s2u4_n4_033_dialog_complete',
        'en_s2u4_n4_034_word_arrange',
        'en_s2u4_n4_035_word_arrange',
        'en_s2u4_n4_036_translate_builder',
        'en_s2u4_n4_037_sentence_builder',
        'en_s2u4_n4_038_speaking',
        'en_s2u4_n4_039_speaking',
        'en_s2u4_n4_040_speaking',
      ],
    },

    {
      title: L(
        '명령문과 Bali 여행 안내',
        'Buyruq gaplar va Bali sayohati',
        'Imperatives and the Bali tour',
        'Императивы и экскурсия по Бали',
      ),
      description: L(
        'Bali의 caves and temples tour 이메일을 바탕으로 Bring, Wear, Take, Don’t take, Don’t forget 같은 긍정·부정 명령문을 익혀요.',
        'Bali caves and temples tour emaili orqali Bring, Wear, Take, Don’t take va Don’t forget kabi ijobiy va inkor buyruqlarni o‘rganasiz.',
        'Use the Bali tour email to practise positive and negative imperatives.',
        'Практикуем утвердительные и отрицательные императивы по письму об экскурсии на Бали.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u4_n4_041_fill_in_blank',
        'en_s2u4_n4_042_fill_in_blank',
        'en_s2u4_n4_043_fill_in_blank',
        'en_s2u4_n4_044_fill_in_blank',
        'en_s2u4_n4_045_fill_in_blank',
        'en_s2u4_n4_046_fill_in_blank',
        'en_s2u4_n4_047_fill_in_blank',
        'en_s2u4_n4_048_fill_in_blank',
        'en_s2u4_n4_049_fill_in_blank',
        'en_s2u4_n4_050_fill_in_blank',
        'en_s2u4_n4_051_fill_in_blank',
        'en_s2u4_n4_052_fill_in_blank',
        'en_s2u4_n4_053_dialog_complete',
        'en_s2u4_n4_054_fill_in_blank',
        'en_s2u4_n4_055_fill_in_blank',
        'en_s2u4_n4_056_word_arrange',
        'en_s2u4_n4_057_translate_builder',
        'en_s2u4_n4_058_sentence_builder',
        'en_s2u4_n4_059_speaking',
        'en_s2u4_n4_060_speaking',
      ],
    },

    {
      title: L(
        '길 안내와 생활 규칙',
        'Yo‘l ko‘rsatish va uy qoidalari',
        'Directions and house rules',
        'Маршруты и домашние правила',
      ),
      description: L(
        'Workbook의 길 안내 표현을 다시 연습하고, wash, clean, don’t leave 같은 명령문으로 생활 규칙을 표현해요.',
        'Workbookdagi yo‘l ko‘rsatish iboralarini takrorlab, wash, clean va don’t leave kabi buyruqlar bilan uy qoidalarini ifodalaysiz.',
        'Review directions and use imperatives to write simple house rules.',
        'Повторяем маршруты и используем императивы для домашних правил.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u4_n4_061_fill_in_blank',
        'en_s2u4_n4_062_fill_in_blank',
        'en_s2u4_n4_063_fill_in_blank',
        'en_s2u4_n4_064_fill_in_blank',
        'en_s2u4_n4_065_fill_in_blank',
        'en_s2u4_n4_066_fill_in_blank',
        'en_s2u4_n4_067_fill_in_blank',
        'en_s2u4_n4_068_fill_in_blank',
        'en_s2u4_n4_069_dialog_complete',
        'en_s2u4_n4_070_dialog_complete',
        'en_s2u4_n4_071_fill_in_blank',
        'en_s2u4_n4_072_fill_in_blank',
        'en_s2u4_n4_073_fill_in_blank',
        'en_s2u4_n4_074_word_arrange',
        'en_s2u4_n4_075_translate_builder',
        'en_s2u4_n4_076_sentence_builder',
        'en_s2u4_n4_077_speaking',
        'en_s2u4_n4_078_speaking',
        'en_s2u4_n4_079_speaking',
        'en_s2u4_n4_080_speaking',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 2 · Unit 4 · Node 5
// 4.5 Video + Reading for pleasure + Unit 4 Review
//
// Coverage
// Coursebook 4.5 Video:
// - Almas Tower
// - skyscraper
// - basement / facilities
// - glass / gold / diamond / pearl
// - jewellery
// - tower / view
// - shops / offices / car park
//
// Workbook 4.5 Reading for pleasure:
// - The museums of Manhattan
// - Metropolitan Museum of Art
// - Whitney Museum of American Art
// - Museum of Modern Art (MoMA)
// - Museum of the City of New York
// - Guggenheim Museum
// - artist / painting / exhibition / statue
// - modern art
//
// Unit 4 Review:
// - places
// - rooms and furniture
// - opposite adjectives
// - there is / there are
// - a / an / the / no article
// - prepositions of place
// - asking and giving directions
// - imperatives
//
// IMPORTANT:
// WORDS에는 단일 headword만 등록.
// car park / ground floor / modern art /
// tourist information centre 등 phrase는 WORD로 등록하지 않음.
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE5_WORDS = [
  {
    code: 'en-noun-basement',
    english: 'basement',
    senseKey: 'lowest-floor-below-ground',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '지하층',
      'yerto‘la qavati',
      'the lowest floor of a building, usually below ground level',
      'подвал',
    ),
    examples: [
      {
        english: 'The car park is in the basement.',
        translations: L(
          '주차장은 지하층에 있어요.',
          'Avtoturargoh yerto‘la qavatida.',
          'The car park is in the basement.',
          'Парковка находится в подвале.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbeɪsmənt/',
      ttsText: 'basement',
    },
    tags: ['building', 'video', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-diamond',
    english: 'diamond',
    senseKey: 'valuable-clear-precious-stone',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '다이아몬드',
      'olmos',
      'a very hard and valuable precious stone',
      'бриллиант',
    ),
    examples: [
      {
        english: 'Diamonds are used in jewellery.',
        translations: L(
          '다이아몬드는 보석류에 사용돼요.',
          'Olmoslar zargarlik buyumlarida ishlatiladi.',
          'Diamonds are used in jewellery.',
          'Бриллианты используются в ювелирных изделиях.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdaɪəmənd/',
      ttsText: 'diamond',
    },
    tags: ['jewellery', 'video', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-gold',
    english: 'gold',
    senseKey: 'valuable-yellow-metal',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('금', 'oltin', 'a valuable yellow metal', 'золото'),
    examples: [
      {
        english: 'Gold is used to make jewellery.',
        translations: L(
          '금은 보석류를 만드는 데 사용돼요.',
          'Oltin zargarlik buyumlarini tayyorlashda ishlatiladi.',
          'Gold is used to make jewellery.',
          'Золото используется для изготовления украшений.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊld/',
      ttsText: 'gold',
    },
    tags: ['jewellery', 'video', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-pearl',
    english: 'pearl',
    senseKey: 'small-shiny-object-used-in-jewellery',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '진주',
      'marvarid',
      'a small shiny object formed inside a shell and used in jewellery',
      'жемчуг',
    ),
    examples: [
      {
        english: 'The necklace has pearls.',
        translations: L(
          '그 목걸이에는 진주가 있어요.',
          'Marjonda marvaridlar bor.',
          'The necklace has pearls.',
          'На ожерелье есть жемчуг.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pɜːl/',
      ttsText: 'pearl',
    },
    tags: ['jewellery', 'video', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-jewellery',
    english: 'jewellery',
    senseKey: 'decorative-items-worn-on-body',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '보석류',
      'zargarlik buyumlari',
      'decorative objects such as rings, necklaces and bracelets',
      'ювелирные изделия',
    ),
    examples: [
      {
        english: 'There is jewellery in the video.',
        translations: L(
          '영상에 보석류가 나와요.',
          'Videoda zargarlik buyumlari bor.',
          'There is jewellery in the video.',
          'В видео есть ювелирные изделия.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒuːəlri/',
      ttsText: 'jewellery',
    },
    tags: ['jewellery', 'video', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-glass',
    english: 'glass',
    senseKey: 'hard-transparent-material',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '유리',
      'shisha',
      'a hard transparent material used in windows and buildings',
      'стекло',
    ),
    examples: [
      {
        english: 'The tower has a lot of glass.',
        translations: L(
          '그 타워에는 유리가 많이 사용돼요.',
          'Minorada ko‘p shisha bor.',
          'The tower has a lot of glass.',
          'В башне много стекла.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡlɑːs/',
      ttsText: 'glass',
    },
    tags: ['building', 'video', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-facility',
    english: 'facility',
    senseKey: 'place-or-service-for-particular-purpose',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '시설',
      'inshoot',
      'a place or service provided for a particular purpose',
      'объект; сооружение',
    ),
    examples: [
      {
        english: 'The building has many facilities.',
        translations: L(
          '그 건물에는 많은 시설이 있어요.',
          'Binoda ko‘plab inshootlar bor.',
          'The building has many facilities.',
          'В здании много объектов и услуг.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/fəˈsɪləti/',
      ttsText: 'facility',
    },
    tags: ['building', 'video', 'unit4'],
    difficulty: 3,
    isCore: true,
  },

  {
    code: 'en-noun-skyscraper',
    english: 'skyscraper',
    senseKey: 'very-tall-building',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '고층 빌딩',
      'osmono‘par bino',
      'a very tall building',
      'небоскрёб',
    ),
    examples: [
      {
        english: 'Almas Tower is a skyscraper.',
        translations: L(
          'Almas Tower는 고층 빌딩이에요.',
          'Almas Tower osmono‘par bino.',
          'Almas Tower is a skyscraper.',
          'Almas Tower — небоскрёб.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈskaɪskreɪpə/',
      ttsText: 'skyscraper',
    },
    tags: ['building', 'video', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-tower',
    english: 'tower',
    senseKey: 'tall-narrow-building-or-structure',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '탑; 타워',
      'minora',
      'a tall narrow building or structure',
      'башня',
    ),
    examples: [
      {
        english: 'The tower is very tall.',
        translations: L(
          '그 타워는 매우 높아요.',
          'Minora juda baland.',
          'The tower is very tall.',
          'Башня очень высокая.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtaʊə/',
      ttsText: 'tower',
    },
    tags: ['building', 'video', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-view',
    english: 'view',
    senseKey: 'what-can-be-seen-from-place',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전망; 경치',
      'manzara',
      'what you can see from a particular place',
      'вид',
    ),
    examples: [
      {
        english: 'There is a wonderful view from the tower.',
        translations: L(
          '타워에서는 멋진 전망을 볼 수 있어요.',
          'Minoradan ajoyib manzara ko‘rinadi.',
          'There is a wonderful view from the tower.',
          'С башни открывается прекрасный вид.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/vjuː/',
      ttsText: 'view',
    },
    tags: ['building', 'video', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-artist',
    english: 'artist',
    senseKey: 'person-who-creates-art',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '예술가',
      'rassom; san’atkor',
      'a person who creates art',
      'художник',
    ),
    examples: [
      {
        english: 'The museum has work by many artists.',
        translations: L(
          '그 박물관에는 많은 예술가들의 작품이 있어요.',
          'Muzeyda ko‘plab rassomlarning asarlari bor.',
          'The museum has work by many artists.',
          'В музее есть работы многих художников.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɑːtɪst/',
      ttsText: 'artist',
    },
    tags: ['museum', 'art', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-painting',
    english: 'painting',
    senseKey: 'picture-made-with-paint',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('그림; 회화', 'rasm', 'a picture made using paint', 'картина'),
    examples: [
      {
        english: 'There are famous paintings in the museum.',
        translations: L(
          '박물관에는 유명한 그림들이 있어요.',
          'Muzeyda mashhur rasmlar bor.',
          'There are famous paintings in the museum.',
          'В музее есть известные картины.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈpeɪntɪŋ/',
      ttsText: 'painting',
    },
    tags: ['museum', 'art', 'unit4'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-exhibition',
    english: 'exhibition',
    senseKey: 'public-show-of-art-or-objects',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전시회',
      'ko‘rgazma',
      'a public show of art or interesting objects',
      'выставка',
    ),
    examples: [
      {
        english: 'We visited an exhibition.',
        translations: L(
          '우리는 전시회를 방문했어요.',
          'Biz ko‘rgazmaga bordik.',
          'We visited an exhibition.',
          'Мы посетили выставку.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌeksɪˈbɪʃən/',
      ttsText: 'exhibition',
    },
    tags: ['museum', 'art', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-statue',
    english: 'statue',
    senseKey: 'model-of-person-or-animal-made-from-material',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '조각상',
      'haykal',
      'a model of a person or animal made from stone, metal or another material',
      'статуя',
    ),
    examples: [
      {
        english: 'There are statues in the museum.',
        translations: L(
          '박물관에 조각상들이 있어요.',
          'Muzeyda haykallar bor.',
          'There are statues in the museum.',
          'В музее есть статуи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstætʃuː/',
      ttsText: 'statue',
    },
    tags: ['museum', 'art', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-gallery',
    english: 'gallery',
    senseKey: 'place-showing-art',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '미술관; 갤러리',
      'galereya',
      'a place where works of art are shown',
      'галерея',
    ),
    examples: [
      {
        english: 'There are many galleries in Manhattan.',
        translations: L(
          'Manhattan에는 많은 갤러리가 있어요.',
          'Manhattanda ko‘plab galereyalar bor.',
          'There are many galleries in Manhattan.',
          'На Манхэттене много галерей.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɡæləri/',
      ttsText: 'gallery',
    },
    tags: ['museum', 'art', 'unit4'],
    difficulty: 2,
    isCore: true,
  },

  {
    code: 'en-noun-collection',
    english: 'collection',
    senseKey: 'group-of-objects-kept-together',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '소장품; 컬렉션',
      'to‘plam',
      'a group of objects kept together',
      'коллекция',
    ),
    examples: [
      {
        english: 'The museum has a large collection of modern art.',
        translations: L(
          '그 박물관에는 현대 미술 소장품이 많이 있어요.',
          'Muzeyda zamonaviy san’atning katta to‘plami bor.',
          'The museum has a large collection of modern art.',
          'В музее большая коллекция современного искусства.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kəˈlekʃən/',
      ttsText: 'collection',
    },
    tags: ['museum', 'art', 'unit4'],
    difficulty: 2,
    isCore: true,
  },
];

export const EN_S2_UNIT4_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Almas Tower
  // ===========================================================

  en_s2u4_n5_001_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'skyscraper',
        native: 'osmono‘par bino',
        nativeI18n: L(
          '고층 빌딩',
          'osmono‘par bino',
          'skyscraper',
          'небоскрёб',
        ),
      },
      {
        text: 'tower',
        native: 'minora',
        nativeI18n: L('타워', 'minora', 'tower', 'башня'),
      },
      {
        text: 'basement',
        native: 'yerto‘la qavati',
        nativeI18n: L('지하층', 'yerto‘la qavati', 'basement', 'подвал'),
      },
      {
        text: 'glass',
        native: 'shisha',
        nativeI18n: L('유리', 'shisha', 'glass', 'стекло'),
      },
      {
        text: 'view',
        native: 'manzara',
        nativeI18n: L('전망', 'manzara', 'view', 'вид'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'almas-tower'],
  },

  en_s2u4_n5_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'diamond',
        native: 'olmos',
        nativeI18n: L('다이아몬드', 'olmos', 'diamond', 'бриллиант'),
      },
      {
        text: 'gold',
        native: 'oltin',
        nativeI18n: L('금', 'oltin', 'gold', 'золото'),
      },
      {
        text: 'pearl',
        native: 'marvarid',
        nativeI18n: L('진주', 'marvarid', 'pearl', 'жемчуг'),
      },
      {
        text: 'jewellery',
        native: 'zargarlik buyumlari',
        nativeI18n: L(
          '보석류',
          'zargarlik buyumlari',
          'jewellery',
          'ювелирные изделия',
        ),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'jewellery'],
  },

  en_s2u4_n5_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Almas Tower is a ___.',
    blankAnswers: ['skyscraper'],
    options: ['skyscraper', 'museum', 'campsite', 'house'],
    answer: 'skyscraper',
    answerTranslation: L(
      'Almas Tower는 고층 빌딩이에요.',
      'Almas Tower osmono‘par bino.',
      'Almas Tower is a skyscraper.',
      'Almas Tower — небоскрёб.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'almas-tower'],
  },

  en_s2u4_n5_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A very tall building can be called a ___.',
    blankAnswers: ['skyscraper'],
    options: ['skyscraper', 'cave', 'chemist', 'campsite'],
    answer: 'skyscraper',
    answerTranslation: L(
      '아주 높은 건물은 skyscraper라고 할 수 있어요.',
      'Juda baland bino skyscraper deb ataladi.',
      'A very tall building can be called a skyscraper.',
      'Очень высокое здание можно назвать небоскрёбом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'building'],
  },

  en_s2u4_n5_005_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The lowest part of a building can be the ___.',
    blankAnswers: ['basement'],
    options: ['basement', 'tower', 'view', 'diamond'],
    answer: 'basement',
    answerTranslation: L(
      '건물의 가장 아래 부분은 지하층일 수 있어요.',
      'Binoning eng pastki qismi yerto‘la bo‘lishi mumkin.',
      'The lowest part of a building can be the basement.',
      'Самая нижняя часть здания может быть подвалом.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'building'],
  },

  en_s2u4_n5_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Windows are often made of ___.',
    blankAnswers: ['glass'],
    options: ['glass', 'gold', 'pearl', 'diamond'],
    answer: 'glass',
    answerTranslation: L(
      '창문은 보통 유리로 만들어져요.',
      'Derazalar ko‘pincha shishadan tayyorlanadi.',
      'Windows are often made of glass.',
      'Окна часто делают из стекла.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'glass'],
  },

  en_s2u4_n5_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Rings and necklaces are types of ___.',
    blankAnswers: ['jewellery'],
    options: ['jewellery', 'facilities', 'glass', 'basement'],
    answer: 'jewellery',
    answerTranslation: L(
      '반지와 목걸이는 보석류예요.',
      'Uzuk va marjon zargarlik buyumlari hisoblanadi.',
      'Rings and necklaces are types of jewellery.',
      'Кольца и ожерелья относятся к ювелирным изделиям.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'jewellery'],
  },

  en_s2u4_n5_008_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ is a valuable yellow metal.',
    blankAnswers: ['gold'],
    options: ['gold', 'glass', 'view', 'tower'],
    answer: 'gold',
    answerTranslation: L(
      '금은 귀중한 노란색 금속이에요.',
      'Oltin qimmatbaho sariq metall.',
      'Gold is a valuable yellow metal.',
      'Золото — ценный жёлтый металл.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'gold'],
  },

  en_s2u4_n5_009_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A ___ can be used in an expensive ring.',
    blankAnswers: ['diamond'],
    options: ['diamond', 'basement', 'facility', 'tower'],
    answer: 'diamond',
    answerTranslation: L(
      '비싼 반지에는 다이아몬드가 사용될 수 있어요.',
      'Qimmat uzukda olmos bo‘lishi mumkin.',
      'A diamond can be used in an expensive ring.',
      'В дорогом кольце может быть бриллиант.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'diamond'],
  },

  en_s2u4_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A necklace can have a ___.',
    blankAnswers: ['pearl'],
    options: ['pearl', 'basement', 'tower', 'facility'],
    answer: 'pearl',
    answerTranslation: L(
      '목걸이에 진주가 있을 수 있어요.',
      'Marjonda marvarid bo‘lishi mumkin.',
      'A necklace can have a pearl.',
      'На ожерелье может быть жемчужина.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'pearl'],
  },

  en_s2u4_n5_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A large building can have many ___.',
    blankAnswers: ['facilities'],
    options: ['facilities', 'pearls', 'diamonds', 'paintings'],
    answer: 'facilities',
    answerTranslation: L(
      '큰 건물에는 많은 시설이 있을 수 있어요.',
      'Katta binoda ko‘plab inshootlar bo‘lishi mumkin.',
      'A large building can have many facilities.',
      'В большом здании может быть много объектов и услуг.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'facilities'],
  },

  en_s2u4_n5_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'From a tall tower, you can have a wonderful ___.',
    blankAnswers: ['view'],
    options: ['view', 'basement', 'pearl', 'glass'],
    answer: 'view',
    answerTranslation: L(
      '높은 타워에서는 멋진 전망을 볼 수 있어요.',
      'Baland minoradan ajoyib manzara ko‘rish mumkin.',
      'From a tall tower, you can have a wonderful view.',
      'С высокой башни может открываться прекрасный вид.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['video', 'view'],
  },

  en_s2u4_n5_013_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Almas', 'Tower', 'is', 'a', 'skyscraper'],
    answer: 'Almas Tower is a skyscraper',
    audioText: 'Almas Tower is a skyscraper.',
    answerTranslation: L(
      'Almas Tower는 고층 빌딩이에요.',
      'Almas Tower osmono‘par bino.',
      'Almas Tower is a skyscraper.',
      'Almas Tower — небоскрёб.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'almas-tower'],
  },

  en_s2u4_n5_014_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'is', 'a', 'wonderful', 'view'],
    answer: 'There is a wonderful view',
    answerTranslation: L(
      '멋진 전망이 있어요.',
      'Ajoyib manzara bor.',
      'There is a wonderful view.',
      'Отсюда открывается прекрасный вид.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'view'],
  },

  en_s2u4_n5_015_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Gold, diamonds and pearls are used in jewellery.',
    audioText: 'Gold, diamonds and pearls are used in jewellery.',
    answerI18n: L(
      '금, 다이아몬드와 진주는 보석류에 사용돼요',
      'Oltin, olmos va marvarid zargarlik buyumlarida ishlatiladi',
      'Gold, diamonds and pearls are used in jewellery',
      'Золото, бриллианты и жемчуг используются в украшениях',
    ),
    options: [
      'Gold,',
      'diamonds',
      'and',
      'pearls',
      'are',
      'used',
      'in',
      'jewellery.',
    ],
    optionsI18n: {
      ko: ['금,', '다이아몬드와', '진주는', '보석류에', '사용돼요'],
      uz: [
        'Oltin,',
        'olmos',
        'va',
        'marvarid',
        'zargarlik',
        'buyumlarida',
        'ishlatiladi',
      ],
      en: [
        'Gold,',
        'diamonds',
        'and',
        'pearls',
        'are',
        'used',
        'in',
        'jewellery.',
      ],
      ru: [
        'Золото,',
        'бриллианты',
        'и',
        'жемчуг',
        'используются',
        'в',
        'украшениях',
      ],
    },
    answerTranslation: L(
      '금, 다이아몬드와 진주는 보석류에 사용돼요.',
      'Oltin, olmos va marvarid zargarlik buyumlarida ishlatiladi.',
      'Gold, diamonds and pearls are used in jewellery.',
      'Золото, бриллианты и жемчуг используются в украшениях.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['video', 'jewellery'],
  },

  en_s2u4_n5_016_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What kind of building is Almas Tower?' },
    ],
    options: ['A skyscraper.', 'A campsite.', 'A museum.', 'A small house.'],
    answer: 'A skyscraper.',
    answerTranslation: L(
      '고층 빌딩이에요.',
      'Osmono‘par bino.',
      'A skyscraper.',
      'Небоскрёб.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['video'],
  },

  en_s2u4_n5_017_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What materials and valuable objects appear in the Almas Tower vocabulary?',
      },
    ],
    options: [
      'Glass, gold, diamonds and pearls.',
      'Wood, paper and books.',
      'Beds, carpets and sinks.',
      'Food, medicine and clothes.',
    ],
    answer: 'Glass, gold, diamonds and pearls.',
    answerTranslation: L(
      '유리, 금, 다이아몬드와 진주예요.',
      'Shisha, oltin, olmos va marvarid.',
      'Glass, gold, diamonds and pearls.',
      'Стекло, золото, бриллианты и жемчуг.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'vocabulary'],
  },

  en_s2u4_n5_018_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Almas Tower is a skyscraper with offices, facilities and a wonderful view.',
    audioText:
      'Almas Tower is a skyscraper with offices, facilities and a wonderful view.',
    answerTranslation: L(
      'Almas Tower는 사무실과 시설, 멋진 전망이 있는 고층 빌딩이에요.',
      'Almas Tower ofislar, inshootlar va ajoyib manzaraga ega osmono‘par bino.',
      'Almas Tower is a skyscraper with offices, facilities and a wonderful view.',
      'Almas Tower — небоскрёб с офисами, объектами и прекрасным видом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'review'],
  },

  en_s2u4_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The video vocabulary includes basement, car park, diamond, facilities, glass, gold, jewellery, pearl, shops and skyscraper.',
    audioText:
      'The video vocabulary includes basement, car park, diamond, facilities, glass, gold, jewellery, pearl, shops and skyscraper.',
    answerTranslation: L(
      '영상 어휘에는 basement, car park, diamond, facilities, glass, gold, jewellery, pearl, shops와 skyscraper가 포함돼요.',
      'Video lug‘atida basement, car park, diamond, facilities, glass, gold, jewellery, pearl, shops va skyscraper bor.',
      'The video vocabulary includes basement, car park, diamond, facilities, glass, gold, jewellery, pearl, shops and skyscraper.',
      'В лексике видео есть basement, car park, diamond, facilities, glass, gold, jewellery, pearl, shops и skyscraper.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['video', 'review'],
  },

  en_s2u4_n5_020_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'A famous building can have shops, offices, facilities and a viewing area.',
    audioText:
      'A famous building can have shops, offices, facilities and a viewing area.',
    answerTranslation: L(
      '유명한 건물에는 가게, 사무실, 시설과 전망 공간이 있을 수 있어요.',
      'Mashhur binoda do‘konlar, ofislar, inshootlar va tomosha maydoni bo‘lishi mumkin.',
      'A famous building can have shops, offices, facilities and a viewing area.',
      'В известном здании могут быть магазины, офисы, объекты и смотровая площадка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['video', 'building'],
  },

  // ===========================================================
  // Lesson 2 · The museums of Manhattan
  // ===========================================================

  en_s2u4_n5_021_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'artist',
        native: 'rassom',
        nativeI18n: L('예술가', 'rassom', 'artist', 'художник'),
      },
      {
        text: 'painting',
        native: 'rasm',
        nativeI18n: L('그림', 'rasm', 'painting', 'картина'),
      },
      {
        text: 'exhibition',
        native: 'ko‘rgazma',
        nativeI18n: L('전시회', 'ko‘rgazma', 'exhibition', 'выставка'),
      },
      {
        text: 'statue',
        native: 'haykal',
        nativeI18n: L('조각상', 'haykal', 'statue', 'статуя'),
      },
      {
        text: 'gallery',
        native: 'galereya',
        nativeI18n: L('갤러리', 'galereya', 'gallery', 'галерея'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['reading-for-pleasure', 'museum'],
  },

  en_s2u4_n5_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A person who creates art is an ___.',
    blankAnswers: ['artist'],
    options: ['artist', 'statue', 'painting', 'exhibition'],
    answer: 'artist',
    answerTranslation: L(
      '예술을 만드는 사람은 artist예요.',
      'San’at yaratadigan odam artist.',
      'A person who creates art is an artist.',
      'Человек, создающий искусство, — художник.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'artist'],
  },

  en_s2u4_n5_023_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A picture made with paint is a ___.',
    blankAnswers: ['painting'],
    options: ['painting', 'statue', 'gallery', 'artist'],
    answer: 'painting',
    answerTranslation: L(
      '물감으로 만든 그림은 painting이에요.',
      'Bo‘yoq bilan yaratilgan rasm painting.',
      'A picture made with paint is a painting.',
      'Изображение, созданное красками, — картина.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'painting'],
  },

  en_s2u4_n5_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A public show of art is an ___.',
    blankAnswers: ['exhibition'],
    options: ['exhibition', 'artist', 'statue', 'tower'],
    answer: 'exhibition',
    answerTranslation: L(
      '미술 작품을 공개적으로 보여 주는 행사는 exhibition이에요.',
      'San’at asarlari ommaga namoyish qilinadigan tadbir exhibition.',
      'A public show of art is an exhibition.',
      'Публичный показ искусства — выставка.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'exhibition'],
  },

  en_s2u4_n5_025_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A model of a person or animal can be a ___.',
    blankAnswers: ['statue'],
    options: ['statue', 'painting', 'artist', 'gallery'],
    answer: 'statue',
    answerTranslation: L(
      '사람이나 동물의 형태를 만든 작품은 statue일 수 있어요.',
      'Odam yoki hayvon shaklidagi asar statue bo‘lishi mumkin.',
      'A model of a person or animal can be a statue.',
      'Изображение человека или животного в объёме может быть статуей.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['museum', 'statue'],
  },

  en_s2u4_n5_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There are more than sixty ___ in Manhattan.',
    blankAnswers: ['museums'],
    options: ['museums', 'airports', 'campsites', 'garages'],
    answer: 'museums',
    answerTranslation: L(
      'Manhattan에는 60개가 넘는 박물관이 있어요.',
      'Manhattanda oltmishdan ortiq muzey bor.',
      'There are more than sixty museums in Manhattan.',
      'На Манхэттене более шестидесяти музеев.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['manhattan', 'reading'],
  },

  en_s2u4_n5_027_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which museum does the text describe as New York’s biggest museum?',
      },
    ],
    options: [
      'The Metropolitan Museum of Art.',
      'The Whitney Museum.',
      'The Guggenheim Museum.',
      'The Museum of the City of New York.',
    ],
    answer: 'The Metropolitan Museum of Art.',
    answerTranslation: L(
      'Metropolitan Museum of Art예요.',
      'Metropolitan Museum of Art.',
      'The Metropolitan Museum of Art.',
      'Метрополитен-музей.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['manhattan', 'reading'],
  },

  en_s2u4_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate:
      'The Metropolitan Museum has paintings, statues and other ___.',
    blankAnswers: ['things'],
    options: ['things', 'airports', 'roads', 'campsites'],
    answer: 'things',
    answerTranslation: L(
      'Metropolitan Museum에는 그림, 조각상과 다른 여러 물건이 있어요.',
      'Metropolitan Museumda rasmlar, haykallar va boshqa buyumlar bor.',
      'The Metropolitan Museum has paintings, statues and other things.',
      'В Метрополитен-музее есть картины, статуи и другие предметы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['metropolitan', 'reading'],
  },

  en_s2u4_n5_029_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which museum is especially connected with American artists?',
      },
    ],
    options: [
      'The Whitney Museum of American Art.',
      'Almas Tower.',
      'The Metropolitan Museum only.',
      'The tourist information centre.',
    ],
    answer: 'The Whitney Museum of American Art.',
    answerTranslation: L(
      'Whitney Museum of American Art예요.',
      'Whitney Museum of American Art.',
      'The Whitney Museum of American Art.',
      'Музей американского искусства Уитни.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['whitney', 'reading'],
  },

  en_s2u4_n5_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The Whitney Museum shows work by American ___.',
    blankAnswers: ['artists'],
    options: ['artists', 'pilots', 'mechanics', 'dentists'],
    answer: 'artists',
    answerTranslation: L(
      'Whitney Museum은 미국 예술가들의 작품을 보여 줘요.',
      'Whitney Museum amerikalik rassomlarning asarlarini namoyish qiladi.',
      'The Whitney Museum shows work by American artists.',
      'Музей Уитни показывает работы американских художников.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['whitney', 'artist'],
  },

  en_s2u4_n5_031_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which museum is famous for modern art?',
      },
    ],
    options: [
      'The Museum of Modern Art.',
      'A railway station.',
      'A hospital.',
      'A campsite.',
    ],
    answer: 'The Museum of Modern Art.',
    answerTranslation: L(
      'Museum of Modern Art예요.',
      'Museum of Modern Art.',
      'The Museum of Modern Art.',
      'Музей современного искусства.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['moma', 'reading'],
  },

  en_s2u4_n5_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'MoMA has a large ___ of modern art.',
    blankAnswers: ['collection'],
    options: ['collection', 'direction', 'basement', 'passport'],
    answer: 'collection',
    answerTranslation: L(
      'MoMA에는 현대 미술 소장품이 많이 있어요.',
      'MoMAda zamonaviy san’atning katta to‘plami bor.',
      'MoMA has a large collection of modern art.',
      'В MoMA большая коллекция современного искусства.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 2,
    tags: ['moma', 'collection'],
  },

  en_s2u4_n5_033_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'MoMA has pictures, photographs and ___.',
    blankAnswers: ['statues'],
    options: ['statues', 'airports', 'campsites', 'garages'],
    answer: 'statues',
    answerTranslation: L(
      'MoMA에는 그림, 사진과 조각상이 있어요.',
      'MoMAda rasmlar, fotosuratlar va haykallar bor.',
      'MoMA has pictures, photographs and statues.',
      'В MoMA есть картины, фотографии и статуи.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['moma', 'reading'],
  },

  en_s2u4_n5_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which museum tells the story of New York from its beginning?',
      },
    ],
    options: [
      'The Museum of the City of New York.',
      'The Whitney Museum.',
      'Almas Tower.',
      'The Metropolitan Museum of Art.',
    ],
    answer: 'The Museum of the City of New York.',
    answerTranslation: L(
      'Museum of the City of New York예요.',
      'Museum of the City of New York.',
      'The Museum of the City of New York.',
      'Музей города Нью-Йорка.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['new-york', 'reading'],
  },

  en_s2u4_n5_035_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Which museum opened in 1959?',
      },
    ],
    options: [
      'The Guggenheim Museum.',
      'The Whitney Museum.',
      'The Museum of the City of New York.',
      'Almas Tower.',
    ],
    answer: 'The Guggenheim Museum.',
    answerTranslation: L(
      'Guggenheim Museum이에요.',
      'Guggenheim Museum.',
      'The Guggenheim Museum.',
      'Музей Гуггенхайма.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['guggenheim', 'reading'],
  },

  en_s2u4_n5_036_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['There', 'are', 'many', 'museums', 'in', 'Manhattan'],
    answer: 'There are many museums in Manhattan',
    audioText: 'There are many museums in Manhattan.',
    answerTranslation: L(
      'Manhattan에는 많은 박물관이 있어요.',
      'Manhattanda ko‘plab muzeylar bor.',
      'There are many museums in Manhattan.',
      'На Манхэттене много музеев.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['manhattan'],
  },

  en_s2u4_n5_037_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'museum', 'has', 'many', 'famous', 'paintings'],
    answer: 'The museum has many famous paintings',
    answerTranslation: L(
      '그 박물관에는 유명한 그림들이 많이 있어요.',
      'Muzeyda ko‘plab mashhur rasmlar bor.',
      'The museum has many famous paintings.',
      'В музее много известных картин.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['museum'],
  },

  en_s2u4_n5_038_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'The Museum of Modern Art has a large collection.',
    audioText: 'The Museum of Modern Art has a large collection.',
    answerI18n: L(
      'Museum of Modern Art에는 큰 소장품 컬렉션이 있어요',
      'Museum of Modern Artda katta to‘plam bor',
      'The Museum of Modern Art has a large collection',
      'В Музее современного искусства большая коллекция',
    ),
    options: [
      'The',
      'Museum',
      'of',
      'Modern',
      'Art',
      'has',
      'a',
      'large',
      'collection.',
    ],
    optionsI18n: {
      ko: [
        'Museum',
        'of',
        'Modern',
        'Art에는',
        '큰',
        '소장품',
        '컬렉션이',
        '있어요',
      ],
      uz: ['Museum', 'of', 'Modern', 'Artda', 'katta', 'to‘plam', 'bor'],
      en: [
        'The',
        'Museum',
        'of',
        'Modern',
        'Art',
        'has',
        'a',
        'large',
        'collection.',
      ],
      ru: ['В', 'Музее', 'современного', 'искусства', 'большая', 'коллекция'],
    },
    answerTranslation: L(
      'Museum of Modern Art에는 큰 소장품 컬렉션이 있어요.',
      'Museum of Modern Artda katta to‘plam bor.',
      'The Museum of Modern Art has a large collection.',
      'В Музее современного искусства большая коллекция.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['museum', 'moma'],
  },

  en_s2u4_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Manhattan has many museums and art galleries with paintings, photographs, exhibitions and statues.',
    audioText:
      'Manhattan has many museums and art galleries with paintings, photographs, exhibitions and statues.',
    answerTranslation: L(
      'Manhattan에는 그림, 사진, 전시회와 조각상이 있는 많은 박물관과 미술관이 있어요.',
      'Manhattanda rasmlar, fotosuratlar, ko‘rgazmalar va haykallarga ega ko‘plab muzey va galereyalar bor.',
      'Manhattan has many museums and art galleries with paintings, photographs, exhibitions and statues.',
      'На Манхэттене много музеев и галерей с картинами, фотографиями, выставками и статуями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['museum', 'review'],
  },

  en_s2u4_n5_040_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'The reading introduces the Metropolitan Museum, the Whitney, MoMA, the Museum of the City of New York and the Guggenheim.',
    audioText:
      'The reading introduces the Metropolitan Museum, the Whitney, MoMA, the Museum of the City of New York and the Guggenheim.',
    answerTranslation: L(
      '읽기 자료에서는 Metropolitan Museum, Whitney, MoMA, Museum of the City of New York와 Guggenheim을 소개해요.',
      'Matnda Metropolitan Museum, Whitney, MoMA, Museum of the City of New York va Guggenheim tanishtiriladi.',
      'The reading introduces the Metropolitan Museum, the Whitney, MoMA, the Museum of the City of New York and the Guggenheim.',
      'В тексте представлены Metropolitan Museum, Whitney, MoMA, Museum of the City of New York и Guggenheim.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['reading-for-pleasure', 'review'],
  },

  // ===========================================================
  // Lesson 3 · Unit 4 grammar and vocabulary review
  // ===========================================================

  en_s2u4_n5_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ an airport near the town.',
    blankAnswers: ['is'],
    options: ['is', 'are', 'aren’t', 'be'],
    answer: 'is',
    answerTranslation: L(
      '마을 근처에 공항이 있어요.',
      'Shahar yaqinida aeroport bor.',
      'There is an airport near the town.',
      'Рядом с городом есть аэропорт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'there-is'],
  },

  en_s2u4_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ three restaurants.',
    blankAnswers: ['are'],
    options: ['are', 'is', 'isn’t', 'be'],
    answer: 'are',
    answerTranslation: L(
      '식당이 세 곳 있어요.',
      'Uchta restoran bor.',
      'There are three restaurants.',
      'Есть три ресторана.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'there-are'],
  },

  en_s2u4_n5_043_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ a supermarket.',
    blankAnswers: ["isn't"],
    options: ["isn't", "aren't", 'are', 'be'],
    answer: "isn't",
    answerTranslation: L(
      '슈퍼마켓이 없어요.',
      'Supermarket yo‘q.',
      'There isn’t a supermarket.',
      'Супермаркета нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'there-is'],
  },

  en_s2u4_n5_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There ___ any big hotels.',
    blankAnswers: ["aren't"],
    options: ["aren't", "isn't", 'is', 'be'],
    answer: "aren't",
    answerTranslation: L(
      '큰 호텔들이 없어요.',
      'Katta mehmonxonalar yo‘q.',
      'There aren’t any big hotels.',
      'Больших отелей нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'there-are'],
  },

  en_s2u4_n5_045_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ there an airport?',
    blankAnswers: ['Is'],
    options: ['Is', 'Are', 'Do', 'Does'],
    answer: 'Is',
    answerTranslation: L(
      '공항이 있나요?',
      'Aeroport bormi?',
      'Is there an airport?',
      'Есть аэропорт?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'question'],
  },

  en_s2u4_n5_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ there any shops?',
    blankAnswers: ['Are'],
    options: ['Are', 'Is', 'Do', 'Does'],
    answer: 'Are',
    answerTranslation: L(
      '가게들이 있나요?',
      'Do‘konlar bormi?',
      'Are there any shops?',
      'Есть магазины?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'question'],
  },

  en_s2u4_n5_047_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'It is ___ interesting city.',
    blankAnswers: ['an'],
    options: ['an', 'a', 'the', '–'],
    answer: 'an',
    answerTranslation: L(
      '그곳은 흥미로운 도시예요.',
      'U qiziqarli shahar.',
      'It is an interesting city.',
      'Это интересный город.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'articles'],
  },

  en_s2u4_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'There is ___ library near my house.',
    blankAnswers: ['a'],
    options: ['a', 'an', 'the', '–'],
    answer: 'a',
    answerTranslation: L(
      '우리 집 근처에 도서관이 있어요.',
      'Uyim yaqinida kutubxona bor.',
      'There is a library near my house.',
      'Рядом с моим домом есть библиотека.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'articles'],
  },

  en_s2u4_n5_049_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My flat is in ___ centre of town.',
    blankAnswers: ['the'],
    options: ['the', 'a', 'an', '–'],
    answer: 'the',
    answerTranslation: L(
      '제 아파트는 시내 중심에 있어요.',
      'Kvartiram shahar markazida.',
      'My flat is in the centre of town.',
      'Моя квартира находится в центре города.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'articles'],
  },

  en_s2u4_n5_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I live in ___ Madrid.',
    blankAnswers: ['–'],
    options: ['–', 'the', 'a', 'an'],
    answer: '–',
    answerTranslation: L(
      '저는 Madrid에 살아요.',
      'Men Madridda yashayman.',
      'I live in Madrid.',
      'Я живу в Мадриде.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit4-review', 'articles'],
  },

  en_s2u4_n5_051_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The armchair is ___ the window.',
    blankAnswers: ['in front of'],
    options: ['in front of', 'between', 'under', 'past'],
    answer: 'in front of',
    answerTranslation: L(
      '안락의자는 창문 앞에 있어요.',
      'Kreslo deraza oldida.',
      'The armchair is in front of the window.',
      'Кресло находится перед окном.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'prepositions'],
  },

  en_s2u4_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The garage is ___ the building.',
    blankAnswers: ['under'],
    options: ['under', 'opposite', 'between', 'past'],
    answer: 'under',
    answerTranslation: L(
      '차고는 건물 아래에 있어요.',
      'Garaj bino ostida.',
      'The garage is under the building.',
      'Гараж находится под зданием.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'prepositions'],
  },

  en_s2u4_n5_053_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The supermarket is ___ my house.',
    blankAnswers: ['opposite'],
    options: ['opposite', 'above', 'under', 'past'],
    answer: 'opposite',
    answerTranslation: L(
      '슈퍼마켓은 우리 집 맞은편에 있어요.',
      'Supermarket uyimning ro‘parasida.',
      'The supermarket is opposite my house.',
      'Супермаркет находится напротив моего дома.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'prepositions'],
  },

  en_s2u4_n5_054_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      '반대 뜻의 형용사를 연결하세요.',
      'Qarama-qarshi sifatlarni moslang.',
      'Match the opposite adjectives.',
      'Соедините противоположные прилагательные.',
    ),
    pairs: [
      {
        text: 'tidy',
        native: 'messy',
        nativeI18n: L('messy', 'messy', 'messy', 'messy'),
      },
      {
        text: 'clean',
        native: 'dirty',
        nativeI18n: L('dirty', 'dirty', 'dirty', 'dirty'),
      },
      {
        text: 'heavy',
        native: 'light',
        nativeI18n: L('light', 'light', 'light', 'light'),
      },
      {
        text: 'quiet',
        native: 'noisy',
        nativeI18n: L('noisy', 'noisy', 'noisy', 'noisy'),
      },
      {
        text: 'old-fashioned',
        native: 'modern',
        nativeI18n: L('modern', 'modern', 'modern', 'modern'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'opposites'],
  },

  en_s2u4_n5_055_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      {
        text: 'bedroom',
        native: 'yotoqxona',
        nativeI18n: L('침실', 'yotoqxona', 'bedroom', 'спальня'),
      },
      {
        text: 'kitchen',
        native: 'oshxona',
        nativeI18n: L('주방', 'oshxona', 'kitchen', 'кухня'),
      },
      {
        text: 'bathroom',
        native: 'hammom',
        nativeI18n: L('욕실', 'hammom', 'bathroom', 'ванная'),
      },
      {
        text: 'garage',
        native: 'garaj',
        nativeI18n: L('차고', 'garaj', 'garage', 'гараж'),
      },
      {
        text: 'library',
        native: 'kutubxona',
        nativeI18n: L('도서관', 'kutubxona', 'library', 'библиотека'),
      },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'places'],
  },

  en_s2u4_n5_056_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['There', 'are', 'three', 'restaurants'],
    answer: 'There are three restaurants',
    audioText: 'There are three restaurants.',
    answerTranslation: L(
      '식당이 세 곳 있어요.',
      'Uchta restoran bor.',
      'There are three restaurants.',
      'Есть три ресторана.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit4-review', 'grammar'],
  },

  en_s2u4_n5_057_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['There', 'is', 'an', 'airport', 'near', 'the', 'town'],
    answer: 'There is an airport near the town',
    answerTranslation: L(
      '마을 근처에 공항이 있어요.',
      'Shahar yaqinida aeroport bor.',
      'There is an airport near the town.',
      'Рядом с городом есть аэропорт.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit4-review', 'grammar'],
  },

  en_s2u4_n5_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'My house is next to the park.',
    audioText: 'My house is next to the park.',
    answerI18n: L(
      '우리 집은 공원 옆에 있어요',
      'Uyim park yonida',
      'My house is next to the park',
      'Мой дом находится рядом с парком',
    ),
    options: ['My', 'house', 'is', 'next', 'to', 'the', 'park.'],
    optionsI18n: {
      ko: ['우리', '집은', '공원', '옆에', '있어요'],
      uz: ['Uyim', 'park', 'yonida'],
      en: ['My', 'house', 'is', 'next', 'to', 'the', 'park.'],
      ru: ['Мой', 'дом', 'находится', 'рядом', 'с', 'парком'],
    },
    answerTranslation: L(
      '우리 집은 공원 옆에 있어요.',
      'Uyim park yonida.',
      'My house is next to the park.',
      'Мой дом находится рядом с парком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit4-review', 'prepositions'],
  },

  en_s2u4_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'There is a library near my house, and there are some restaurants in the town centre.',
    audioText:
      'There is a library near my house, and there are some restaurants in the town centre.',
    answerTranslation: L(
      '우리 집 근처에 도서관이 있고 시내 중심에는 식당들이 있어요.',
      'Uyim yaqinida kutubxona bor va shahar markazida restoranlar bor.',
      'There is a library near my house, and there are some restaurants in the town centre.',
      'Рядом с моим домом есть библиотека, а в центре города есть рестораны.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4-review', 'grammar'],
  },

  en_s2u4_n5_060_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Unit 4 uses there is and there are, articles and prepositions to describe places and homes.',
    audioText:
      'Unit 4 uses there is and there are, articles and prepositions to describe places and homes.',
    answerTranslation: L(
      'Unit 4에서는 장소와 집을 설명할 때 there is/there are, 관사와 위치 전치사를 사용해요.',
      'Unit 4 da joylar va uylarni tasvirlash uchun there is/there are, artikllar va joy predloglari ishlatiladi.',
      'Unit 4 uses there is and there are, articles and prepositions to describe places and homes.',
      'В Unit 4 для описания мест и домов используются there is/there are, артикли и предлоги места.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit4-review', 'grammar'],
  },

  // ===========================================================
  // Lesson 4 · Directions, imperatives and final Unit 4 review
  // ===========================================================

  en_s2u4_n5_061_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'Excuse me, is there a tourist information centre near here?',
      },
    ],
    options: [
      'Yes. Go straight on.',
      'Yes, I am.',
      'It is a tourist.',
      'There directions.',
    ],
    answer: 'Yes. Go straight on.',
    answerTranslation: L(
      '네. 곧장 가세요.',
      'Ha. To‘g‘ri boring.',
      'Yes. Go straight on.',
      'Да. Идите прямо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go ___ on.',
    blankAnswers: ['straight'],
    options: ['straight', 'corner', 'left', 'past'],
    answer: 'straight',
    answerTranslation: L(
      '곧장 가세요.',
      'To‘g‘ri boring.',
      'Go straight on.',
      'Идите прямо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_063_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Turn ___ at the bank.',
    blankAnswers: ['right'],
    options: ['right', 'past', 'straight', 'end'],
    answer: 'right',
    answerTranslation: L(
      '은행에서 오른쪽으로 도세요.',
      'Bank oldida o‘ngga buriling.',
      'Turn right at the bank.',
      'У банка поверните направо.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Go ___ the museum.',
    blankAnswers: ['past'],
    options: ['past', 'right', 'corner', 'end'],
    answer: 'past',
    answerTranslation: L(
      '박물관을 지나가세요.',
      'Muzey yonidan o‘ting.',
      'Go past the museum.',
      'Пройдите мимо музея.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_065_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Take the first ___ on the left.',
    blankAnswers: ['road'],
    options: ['road', 'view', 'painting', 'floor'],
    answer: 'road',
    answerTranslation: L(
      '첫 번째 길에서 왼쪽으로 가세요.',
      'Birinchi yo‘lda chapga buriling.',
      'Take the first road on the left.',
      'Сверните на первую дорогу слева.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_066_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do I get to the cinema?' }],
    options: [
      'Go straight on and take the second right.',
      'The cinema watches films.',
      'There is directions.',
      'Go cinema yesterday.',
    ],
    answer: 'Go straight on and take the second right.',
    answerTranslation: L(
      '곧장 가서 두 번째 길에서 오른쪽으로 가세요.',
      'To‘g‘ri boring va ikkinchi yo‘lda o‘ngga buriling.',
      'Go straight on and take the second right.',
      'Идите прямо и поверните на втором повороте направо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_067_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your passport.',
    blankAnswers: ['Bring'],
    options: ['Bring', 'Brings', 'Bringing', 'Brought'],
    answer: 'Bring',
    answerTranslation: L(
      '여권을 가져오세요.',
      'Pasportingizni olib keling.',
      'Bring your passport.',
      'Возьмите паспорт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ comfortable shoes.',
    blankAnswers: ['Wear'],
    options: ['Wear', 'Wears', 'Wearing', 'Wore'],
    answer: 'Wear',
    answerTranslation: L(
      '편한 신발을 신으세요.',
      'Qulay oyoq kiyim kiying.',
      'Wear comfortable shoes.',
      'Наденьте удобную обувь.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ take photographs inside the temple.',
    blankAnswers: ["Don't"],
    options: ["Don't", "Doesn't", 'Not', "Isn't"],
    answer: "Don't",
    answerTranslation: L(
      '사원 안에서는 사진을 찍지 마세요.',
      'Ibodatxona ichida suratga olmang.',
      'Don’t take photographs inside the temple.',
      'Не фотографируйте внутри храма.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_070_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: "Don't ___ dirty cups in the sink.",
    blankAnswers: ['leave'],
    options: ['leave', 'leaves', 'leaving', 'left'],
    answer: 'leave',
    answerTranslation: L(
      '더러운 컵을 싱크대에 두지 마세요.',
      'Iflos piyolalarni rakovinada qoldirmang.',
      'Don’t leave dirty cups in the sink.',
      'Не оставляйте грязные чашки в раковине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_071_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Go', 'straight', 'on', 'and', 'turn', 'left'],
    answer: 'Go straight on and turn left',
    audioText: 'Go straight on and turn left.',
    answerTranslation: L(
      '곧장 가서 왼쪽으로 도세요.',
      'To‘g‘ri boring va chapga buriling.',
      'Go straight on and turn left.',
      'Идите прямо и поверните налево.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_072_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Go', 'past', 'the', 'museum'],
    answer: 'Go past the museum',
    answerTranslation: L(
      '박물관을 지나가세요.',
      'Muzey yonidan o‘ting.',
      'Go past the museum.',
      'Пройдите мимо музея.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_073_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'Turn right at the end of the road.',
    audioText: 'Turn right at the end of the road.',
    answerI18n: L(
      '길 끝에서 오른쪽으로 도세요',
      'Yo‘l oxirida o‘ngga buriling',
      'Turn right at the end of the road',
      'В конце дороги поверните направо',
    ),
    options: ['Turn', 'right', 'at', 'the', 'end', 'of', 'the', 'road.'],
    optionsI18n: {
      ko: ['길', '끝에서', '오른쪽으로', '도세요'],
      uz: ['Yo‘l', 'oxirida', 'o‘ngga', 'buriling'],
      en: ['Turn', 'right', 'at', 'the', 'end', 'of', 'the', 'road.'],
      ru: ['В', 'конце', 'дороги', 'поверните', 'направо'],
    },
    answerTranslation: L(
      '길 끝에서 오른쪽으로 도세요.',
      'Yo‘l oxirida o‘ngga buriling.',
      'Turn right at the end of the road.',
      'В конце дороги поверните направо.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 2,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Could you give me some directions, please?' },
    ],
    options: [
      'Yes, of course.',
      'Yes, I directions.',
      'The road is give.',
      'No, turn yesterday.',
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
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_075_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is there a café near here?' }],
    options: [
      'Yes. It’s next to the museum.',
      'Yes. Café is drink.',
      'It went yesterday.',
      'The café are.',
    ],
    answer: 'Yes. It’s next to the museum.',
    answerTranslation: L(
      '네. 박물관 옆에 있어요.',
      'Ha. U muzey yonida.',
      'Yes. It’s next to the museum.',
      'Да. Оно рядом с музеем.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'The imperative normally uses the ___ form of the verb.',
    blankAnswers: ['base'],
    options: ['base', 'past', 'continuous', 'third-person'],
    answer: 'base',
    answerTranslation: L(
      '명령문은 보통 동사의 기본형을 사용해요.',
      'Buyruq gap odatda fe’lning asosiy shaklini ishlatadi.',
      'The imperative normally uses the base form of the verb.',
      'Повелительное наклонение обычно использует основную форму глагола.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 2,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A negative imperative begins with ___.',
    blankAnswers: ["don't"],
    options: ["don't", 'does', 'is', 'are'],
    answer: "don't",
    answerTranslation: L(
      '부정 명령문은 don’t로 시작해요.',
      'Inkor buyruq gap don’t bilan boshlanadi.',
      'A negative imperative begins with don’t.',
      'Отрицательный императив начинается с don’t.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_078_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Excuse me, how do I get to the museum? Go straight on, go past the bank and turn right.',
    audioText:
      'Excuse me, how do I get to the museum? Go straight on, go past the bank and turn right.',
    answerTranslation: L(
      '실례합니다. 박물관에 어떻게 가나요? 곧장 가서 은행을 지나 오른쪽으로 도세요.',
      'Kechirasiz, muzeyga qanday boraman? To‘g‘ri boring, bank yonidan o‘ting va o‘ngga buriling.',
      'Excuse me, how do I get to the museum? Go straight on, go past the bank and turn right.',
      'Извините, как пройти к музею? Идите прямо, пройдите мимо банка и поверните направо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4-review', 'directions'],
  },

  en_s2u4_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Bring your passport, wear comfortable shoes, and do not take photographs inside the temple.',
    audioText:
      'Bring your passport, wear comfortable shoes, and do not take photographs inside the temple.',
    answerTranslation: L(
      '여권을 가져오고 편한 신발을 신으며 사원 안에서는 사진을 찍지 마세요.',
      'Pasportingizni olib keling, qulay oyoq kiyim kiying va ibodatxona ichida suratga olmang.',
      'Bring your passport, wear comfortable shoes, and do not take photographs inside the temple.',
      'Возьмите паспорт, наденьте удобную обувь и не фотографируйте внутри храма.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4-review', 'imperatives'],
  },

  en_s2u4_n5_080_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Unit 4 teaches us to describe places and homes, use articles and prepositions, understand opposite adjectives, ask for directions and give instructions.',
    audioText:
      'Unit 4 teaches us to describe places and homes, use articles and prepositions, understand opposite adjectives, ask for directions and give instructions.',
    answerTranslation: L(
      'Unit 4에서는 장소와 집을 설명하고, 관사와 위치 전치사를 사용하며, 반대 형용사를 익히고, 길을 묻고 안내하며, 지시사항을 표현하는 방법을 배워요.',
      'Unit 4 da joylar va uylarni tasvirlash, artikl va joy predloglarini ishlatish, qarama-qarshi sifatlarni tushunish, yo‘l so‘rash va ko‘rsatmalar berishni o‘rganamiz.',
      'Unit 4 teaches us to describe places and homes, use articles and prepositions, understand opposite adjectives, ask for directions and give instructions.',
      'В Unit 4 мы учимся описывать места и дома, использовать артикли и предлоги, противоположные прилагательные, спрашивать дорогу и давать инструкции.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 2,
    tags: ['unit4', 'node-review'],
  },
};

// ─────────────────────────────────────────────────────────────
// Node 5
// ─────────────────────────────────────────────────────────────

export const EN_S2_UNIT4_NODE5 = {
  title: L(
    'Almas Tower와 Unit 4 종합 복습',
    'Almas Tower va Unit 4 umumiy takrori',
    'Almas Tower and Unit 4 review',
    'Almas Tower и повторение Unit 4',
  ),
  section: 2,
  unit: 4,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L('Almas Tower', 'Almas Tower', 'Almas Tower', 'Almas Tower'),
      description: L(
        'Almas Tower 영상을 바탕으로 skyscraper, basement, glass, diamond, gold, pearl, jewellery, facilities와 view를 익혀요.',
        'Almas Tower videosi orqali skyscraper, basement, glass, diamond, gold, pearl, jewellery, facilities va view so‘zlarini o‘rganasiz.',
        'Learn the key building and jewellery vocabulary from the Almas Tower video.',
        'Изучаем лексику о зданиях и украшениях по видео Almas Tower.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s2u4_n5_001_word_matching',
        'en_s2u4_n5_002_word_matching',
        'en_s2u4_n5_003_fill_in_blank',
        'en_s2u4_n5_004_fill_in_blank',
        'en_s2u4_n5_005_fill_in_blank',
        'en_s2u4_n5_006_fill_in_blank',
        'en_s2u4_n5_007_fill_in_blank',
        'en_s2u4_n5_008_fill_in_blank',
        'en_s2u4_n5_009_fill_in_blank',
        'en_s2u4_n5_010_fill_in_blank',
        'en_s2u4_n5_011_fill_in_blank',
        'en_s2u4_n5_012_fill_in_blank',
        'en_s2u4_n5_013_word_arrange',
        'en_s2u4_n5_014_translate_builder',
        'en_s2u4_n5_015_sentence_builder',
        'en_s2u4_n5_016_dialog_complete',
        'en_s2u4_n5_017_dialog_complete',
        'en_s2u4_n5_018_speaking',
        'en_s2u4_n5_019_speaking',
        'en_s2u4_n5_020_speaking',
      ],
    },

    {
      title: L(
        'Manhattan의 박물관',
        'Manhattan muzeylari',
        'The museums of Manhattan',
        'Музеи Манхэттена',
      ),
      description: L(
        'Metropolitan Museum, Whitney, MoMA, Museum of the City of New York와 Guggenheim에 관한 글을 읽으며 미술관 관련 어휘를 익혀요.',
        'Metropolitan Museum, Whitney, MoMA, Museum of the City of New York va Guggenheim haqidagi matn orqali muzey lug‘atini o‘rganasiz.',
        'Read about five Manhattan museums and learn art and museum vocabulary.',
        'Читаем о пяти музеях Манхэттена и изучаем лексику искусства.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 2,
      questions: [
        'en_s2u4_n5_021_word_matching',
        'en_s2u4_n5_022_fill_in_blank',
        'en_s2u4_n5_023_fill_in_blank',
        'en_s2u4_n5_024_fill_in_blank',
        'en_s2u4_n5_025_fill_in_blank',
        'en_s2u4_n5_026_fill_in_blank',
        'en_s2u4_n5_027_dialog_complete',
        'en_s2u4_n5_028_fill_in_blank',
        'en_s2u4_n5_029_dialog_complete',
        'en_s2u4_n5_030_fill_in_blank',
        'en_s2u4_n5_031_dialog_complete',
        'en_s2u4_n5_032_fill_in_blank',
        'en_s2u4_n5_033_fill_in_blank',
        'en_s2u4_n5_034_dialog_complete',
        'en_s2u4_n5_035_dialog_complete',
        'en_s2u4_n5_036_word_arrange',
        'en_s2u4_n5_037_translate_builder',
        'en_s2u4_n5_038_sentence_builder',
        'en_s2u4_n5_039_speaking',
        'en_s2u4_n5_040_speaking',
      ],
    },

    {
      title: L(
        'Unit 4 문법과 어휘 복습',
        'Unit 4 grammatika va lug‘at takrori',
        'Unit 4 grammar and vocabulary review',
        'Повторение грамматики и лексики Unit 4',
      ),
      description: L(
        'there is/are, a/an/the, 위치 전치사, 집과 도시 장소, 반대 형용사를 종합적으로 복습해요.',
        'There is/are, a/an/the, joy predloglari, uy va shahar joylari hamda qarama-qarshi sifatlarni umumiy takrorlaysiz.',
        'Review there is/are, articles, prepositions, places, rooms and opposite adjectives.',
        'Повторяем there is/are, артикли, предлоги, места, комнаты и противоположные прилагательные.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s2u4_n5_041_fill_in_blank',
        'en_s2u4_n5_042_fill_in_blank',
        'en_s2u4_n5_043_fill_in_blank',
        'en_s2u4_n5_044_fill_in_blank',
        'en_s2u4_n5_045_fill_in_blank',
        'en_s2u4_n5_046_fill_in_blank',
        'en_s2u4_n5_047_fill_in_blank',
        'en_s2u4_n5_048_fill_in_blank',
        'en_s2u4_n5_049_fill_in_blank',
        'en_s2u4_n5_050_fill_in_blank',
        'en_s2u4_n5_051_fill_in_blank',
        'en_s2u4_n5_052_fill_in_blank',
        'en_s2u4_n5_053_fill_in_blank',
        'en_s2u4_n5_054_word_matching',
        'en_s2u4_n5_055_word_matching',
        'en_s2u4_n5_056_word_arrange',
        'en_s2u4_n5_057_translate_builder',
        'en_s2u4_n5_058_sentence_builder',
        'en_s2u4_n5_059_speaking',
        'en_s2u4_n5_060_speaking',
      ],
    },

    {
      title: L(
        '길 안내와 Unit 4 마무리',
        'Yo‘l ko‘rsatish va Unit 4 yakuni',
        'Directions and Unit 4 final review',
        'Маршруты и итоговое повторение Unit 4',
      ),
      description: L(
        '길 묻기·길 안내와 긍정/부정 명령문을 다시 연습하면서 Unit 4 전체 내용을 마무리해요.',
        'Yo‘l so‘rash, yo‘l ko‘rsatish va ijobiy/inkor buyruqlarni takrorlab Unit 4 ni yakunlaysiz.',
        'Finish Unit 4 by reviewing directions and positive and negative imperatives.',
        'Завершаем Unit 4 повторением маршрутов и императивов.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s2u4_n5_061_dialog_complete',
        'en_s2u4_n5_062_fill_in_blank',
        'en_s2u4_n5_063_fill_in_blank',
        'en_s2u4_n5_064_fill_in_blank',
        'en_s2u4_n5_065_fill_in_blank',
        'en_s2u4_n5_066_dialog_complete',
        'en_s2u4_n5_067_fill_in_blank',
        'en_s2u4_n5_068_fill_in_blank',
        'en_s2u4_n5_069_fill_in_blank',
        'en_s2u4_n5_070_fill_in_blank',
        'en_s2u4_n5_071_word_arrange',
        'en_s2u4_n5_072_translate_builder',
        'en_s2u4_n5_073_sentence_builder',
        'en_s2u4_n5_074_dialog_complete',
        'en_s2u4_n5_075_dialog_complete',
        'en_s2u4_n5_076_fill_in_blank',
        'en_s2u4_n5_077_fill_in_blank',
        'en_s2u4_n5_078_speaking',
        'en_s2u4_n5_079_speaking',
        'en_s2u4_n5_080_speaking',
      ],
    },
  ],
};
