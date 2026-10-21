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

const TRANSLATE_INSTRUCTION = L(
  '뜻을 보고 영어 문장을 만드세요.',
  'Ma’noga qarab inglizcha gap tuzing.',
  'Build the sentence in English.',
  'Составьте предложение на английском языке.',
);

const ARRANGE_INSTRUCTION = L(
  '영어를 듣고 단어를 올바른 순서로 배열하세요.',
  'Inglizcha gapni tinglab, so‘zlarni to‘g‘ri tartibda joylashtiring.',
  'Listen and put the English words in the correct order.',
  'Прослушайте и расположите английские слова в правильном порядке.',
);

const SENTENCE_BUILDER_INSTRUCTION = L(
  '영어를 듣고 뜻을 올바른 순서로 만드세요.',
  'Inglizcha gapni tinglang va ma’nosini to‘g‘ri tartibda tuzing.',
  'Listen to the English sentence and build its meaning.',
  'Прослушайте английское предложение и соберите его значение.',
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

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 4 · Node 1
// 4.1 About me
//
// IMPORTANT:
// LessonCategory는 실제 enum에 존재하는 값만 사용.
// - VOCABULARY
// - GRAMMAR
// - EXPRESSION
// - CONVERSATION
// - LISTENING
// - TOPIK
//
// Coverage
// - common verbs:
//   live / study / go / work / play
//   like / teach / watch / read / have
// - common verb phrases:
//   live in a flat
//   study English / at university
//   go abroad / to work / to the beach
//   work for a charity / in an office
//   play basketball / the violin
//   like comics / cars / music
//   teach English / young people
//   watch TV / films
//   read newspapers / books / comics
// - present simple positive:
//   I/You/We/They + base verb
//   He/She/It + -(e)s
// - spelling:
//   play → plays
//   read → reads
//   live → lives
//   like → likes
//   work → works
//   teach → teaches
//   watch → watches
//   go → goes
//   study → studies
//   have → has
// - pronunciation:
//   /s/ likes, works
//   /z/ goes, lives, plays, reads, studies
//   /ɪz/ teaches, watches
// - present simple = habits / routines
// - possession:
//   She has a car.
//   She has got a car. / She's got a car.
// - present simple action:
//   I have lunch at one.
//   NOT "I have got lunch at one."
// - talk about your life
// - understand verb phrases by finding the verb first
//
// 4 lessons × 20 = 80 questions
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT4_NODE1_WORDS = [
  {
    code: 'en-verb-live',
    english: 'live',
    senseKey: 'have-home-in-place',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('살다', 'yashamoq', 'to have your home in a place', 'жить'),
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
      ipa: '/lɪv/',
      ttsText: 'live',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: L(
        '집에서 사는 사람',
        'uyda yashayotgan odam',
        'a person living at home',
        'человек дома',
      ),
    },
    tags: ['common-verbs', 'life'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-study',
    english: 'study',
    senseKey: 'learn-subject',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '공부하다',
      'o‘qimoq; o‘rganmoq',
      'to learn about a subject',
      'учиться; изучать',
    ),
    examples: [
      {
        english: 'We study English.',
        translations: L(
          '우리는 영어를 공부해요.',
          'Biz ingliz tilini o‘rganamiz.',
          'We study English.',
          'Мы изучаем английский.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈstʌdi/',
      ttsText: 'study',
    },
    media: {
      emoji: '📖',
      imageUrl: '',
      imageAlt: L(
        '공부하는 사람',
        'o‘qiyotgan odam',
        'a person studying',
        'человек учится',
      ),
    },
    tags: ['common-verbs', 'study'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-go',
    english: 'go',
    senseKey: 'move-to-place',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가다',
      'bormoq',
      'to move or travel to another place',
      'идти; ехать',
    ),
    examples: [
      {
        english: 'They go abroad a lot.',
        translations: L(
          '그들은 해외에 자주 가요.',
          'Ular chet elga ko‘p boradi.',
          'They go abroad a lot.',
          'Они часто ездят за границу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊ/',
      ttsText: 'go',
    },
    media: {
      emoji: '➡️',
      imageUrl: '',
      imageAlt: L(
        '어딘가로 가는 사람',
        'bir joyga ketayotgan odam',
        'a person going somewhere',
        'человек куда-то идёт',
      ),
    },
    tags: ['common-verbs', 'travel'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-work',
    english: 'work',
    senseKey: 'do-job',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L('일하다', 'ishlamoq', 'to do a job', 'работать'),
    examples: [
      {
        english: 'She works in an office.',
        translations: L(
          '그녀는 사무실에서 일해요.',
          'U ofisda ishlaydi.',
          'She works in an office.',
          'Она работает в офисе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɜːk/',
      ttsText: 'work',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L(
        '일하는 사람',
        'ishlayotgan odam',
        'a person working',
        'человек работает',
      ),
    },
    tags: ['common-verbs', 'jobs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-play',
    english: 'play',
    senseKey: 'sport-or-instrument',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '하다; 연주하다',
      'o‘ynamoq; chalmoq',
      'to do a sport or make music with an instrument',
      'играть',
    ),
    examples: [
      {
        english: 'He plays tennis.',
        translations: L(
          '그는 테니스를 쳐요.',
          'U tennis o‘ynaydi.',
          'He plays tennis.',
          'Он играет в теннис.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pleɪ/',
      ttsText: 'play',
    },
    media: {
      emoji: '🎾',
      imageUrl: '',
      imageAlt: L(
        '테니스를 하는 사람',
        'tennis o‘ynayotgan odam',
        'a person playing tennis',
        'человек играет в теннис',
      ),
    },
    tags: ['common-verbs', 'activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-like',
    english: 'like',
    senseKey: 'enjoy-something',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '좋아하다',
      'yoqtirmoq',
      'to enjoy or think something is good',
      'нравиться; любить',
    ),
    examples: [
      {
        english: 'I like old buildings.',
        translations: L(
          '저는 오래된 건물을 좋아해요.',
          'Men eski binolarni yoqtiraman.',
          'I like old buildings.',
          'Мне нравятся старые здания.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/laɪk/',
      ttsText: 'like',
    },
    media: {
      emoji: '👍',
      imageUrl: '',
      imageAlt: L(
        '좋아하는 표시',
        'yoqtirish belgisi',
        'a like symbol',
        'знак «нравится»',
      ),
    },
    tags: ['common-verbs', 'preferences'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-teach',
    english: 'teach',
    senseKey: 'help-people-learn',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가르치다',
      'o‘qitmoq',
      'to help people learn something',
      'преподавать; учить',
    ),
    examples: [
      {
        english: 'She teaches English.',
        translations: L(
          '그녀는 영어를 가르쳐요.',
          'U ingliz tilini o‘qitadi.',
          'She teaches English.',
          'Она преподаёт английский.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tiːtʃ/',
      ttsText: 'teach',
    },
    media: {
      emoji: '🧑‍🏫',
      imageUrl: '',
      imageAlt: L(
        '학생을 가르치는 선생님',
        'o‘quvchilarga dars berayotgan o‘qituvchi',
        'a teacher teaching students',
        'учитель преподаёт ученикам',
      ),
    },
    tags: ['common-verbs', 'education'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-watch',
    english: 'watch',
    senseKey: 'look-at-moving-images',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '보다; 시청하다',
      'tomosha qilmoq',
      'to look at something for a period of time',
      'смотреть',
    ),
    examples: [
      {
        english: 'We watch films at the weekend.',
        translations: L(
          '우리는 주말에 영화를 봐요.',
          'Biz dam olish kunlari filmlar tomosha qilamiz.',
          'We watch films at the weekend.',
          'Мы смотрим фильмы на выходных.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɒtʃ/',
      ttsText: 'watch',
    },
    media: {
      emoji: '📺',
      imageUrl: '',
      imageAlt: L(
        '텔레비전을 보는 사람',
        'televizor ko‘rayotgan odam',
        'a person watching television',
        'человек смотрит телевизор',
      ),
    },
    tags: ['common-verbs', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-read',
    english: 'read',
    senseKey: 'look-at-written-words',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '읽다',
      'o‘qimoq',
      'to look at and understand written words',
      'читать',
    ),
    examples: [
      {
        english: 'They read books in their free time.',
        translations: L(
          '그들은 여가 시간에 책을 읽어요.',
          'Ular bo‘sh vaqtida kitob o‘qiydi.',
          'They read books in their free time.',
          'Они читают книги в свободное время.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/riːd/',
      ttsText: 'read',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L(
        '책을 읽는 사람',
        'kitob o‘qiyotgan odam',
        'a person reading a book',
        'человек читает книгу',
      ),
    },
    tags: ['common-verbs', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-have',
    english: 'have',
    senseKey: 'possess-or-experience',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '가지고 있다; 하다',
      'ega bo‘lmoq; qilmoq',
      'to possess something or experience an activity',
      'иметь',
    ),
    examples: [
      {
        english: 'I have lunch at one.',
        translations: L(
          '저는 1시에 점심을 먹어요.',
          'Men soat birda tushlik qilaman.',
          'I have lunch at one.',
          'Я обедаю в час.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hæv/',
      ttsText: 'have',
    },
    media: {
      emoji: '🍽️',
      imageUrl: '',
      imageAlt: L('점심 식사', 'tushlik', 'lunch', 'обед'),
    },
    tags: ['common-verbs', 'grammar'],
    difficulty: 1,
    usageNote: L(
      'he/she/it에서는 has를 사용해요.',
      'he/she/it bilan has ishlatiladi.',
      'Use has with he, she and it.',
      'С he, she и it используется has.',
    ),
    isCore: true,
  },

  {
    code: 'en-adverb-abroad',
    english: 'abroad',
    senseKey: 'in-another-country',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '해외로; 해외에서',
      'chet elga; chet elda',
      'in or to another country',
      'за границей; за границу',
    ),
    examples: [
      {
        english: 'They go abroad every year.',
        translations: L(
          '그들은 매년 해외에 가요.',
          'Ular har yili chet elga boradi.',
          'They go abroad every year.',
          'Они каждый год ездят за границу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/əˈbrɔːd/',
      ttsText: 'abroad',
    },
    media: {
      emoji: '✈️',
      imageUrl: '',
      imageAlt: L(
        '해외여행',
        'chet el safari',
        'international travel',
        'поездка за границу',
      ),
    },
    tags: ['travel', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-charity',
    english: 'charity',
    senseKey: 'organisation-helping-people',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자선단체',
      'xayriya tashkiloti',
      'an organisation that helps people in need',
      'благотворительная организация',
    ),
    examples: [
      {
        english: 'She works for a charity.',
        translations: L(
          '그녀는 자선단체에서 일해요.',
          'U xayriya tashkilotida ishlaydi.',
          'She works for a charity.',
          'Она работает в благотворительной организации.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtʃærəti/',
      ttsText: 'charity',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '사람들을 돕는 단체',
        'odamlarga yordam beradigan tashkilot',
        'an organisation helping people',
        'организация, помогающая людям',
      ),
    },
    tags: ['jobs', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-expression-free-time',
    english: 'free time',
    senseKey: 'time-not-working',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '여가 시간',
      'bo‘sh vaqt',
      'time when you are not working or studying',
      'свободное время',
    ),
    examples: [
      {
        english: 'I read in my free time.',
        translations: L(
          '저는 여가 시간에 책을 읽어요.',
          'Men bo‘sh vaqtimda kitob o‘qiyman.',
          'I read in my free time.',
          'Я читаю в свободное время.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌfriː ˈtaɪm/',
      ttsText: 'free time',
    },
    media: {
      emoji: '🕒',
      imageUrl: '',
      imageAlt: L('여가 시간', 'bo‘sh vaqt', 'free time', 'свободное время'),
    },
    tags: ['life', 'activities'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT4_NODE1_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Common verbs and verb phrases
  // ===========================================================

  en_s1u4_n1_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I live in a flat.',
    audioText: 'I live in a flat.',
    answerTranslation: L(
      '저는 아파트에 살아요.',
      'Men kvartirada yashayman.',
      'I live in a flat.',
      'Я живу в квартире.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'live'],
  },

  en_s1u4_n1_002_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 동사와 맞는 그림을 고르세요.',
      'Inglizcha fe’lga mos rasmni tanlang.',
      'Choose the picture that matches the English verb.',
      'Выберите картинку, соответствующую английскому глаголу.',
    ),
    answer: 'read',
    choices: [
      { text: 'read', label: '📖', emoji: '📖', imageUrl: '' },
      { text: 'watch', label: '📺', emoji: '📺', imageUrl: '' },
      { text: 'play', label: '🎾', emoji: '🎾', imageUrl: '' },
      { text: 'work', label: '💼', emoji: '💼', imageUrl: '' },
    ],
    answerTranslation: L('읽다', 'o‘qimoq', 'read', 'читать'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'read'],
  },

  en_s1u4_n1_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We study English.',
    audioText: 'We study English.',
    answerTranslation: L(
      '우리는 영어를 공부해요.',
      'Biz ingliz tilini o‘rganamiz.',
      'We study English.',
      'Мы изучаем английский.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'study'],
  },

  en_s1u4_n1_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ English.',
    blankAnswers: ['study'],
    options: ['study', 'play', 'watch', 'live'],
    answer: 'study',
    answerTranslation: L(
      '우리는 영어를 공부해요.',
      'Biz ingliz tilini o‘rganamiz.',
      'We study English.',
      'Мы изучаем английский.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'study'],
  },

  en_s1u4_n1_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They go abroad every year.',
    audioText: 'They go abroad every year.',
    answerTranslation: L(
      '그들은 매년 해외에 가요.',
      'Ular har yili chet elga boradi.',
      'They go abroad every year.',
      'Они каждый год ездят за границу.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'go-abroad'],
  },

  en_s1u4_n1_006_image_choice: {
    type: 'image_choice',
    level: LV,
    instruction: L(
      '영어 표현과 맞는 그림을 고르세요.',
      'Inglizcha iboraga mos rasmni tanlang.',
      'Choose the picture that matches the English phrase.',
      'Выберите картинку, соответствующую английской фразе.',
    ),
    answer: 'play the violin',
    choices: [
      { text: 'play the violin', label: '🎻', emoji: '🎻', imageUrl: '' },
      { text: 'read a book', label: '📕', emoji: '📕', imageUrl: '' },
      { text: 'watch TV', label: '📺', emoji: '📺', imageUrl: '' },
      { text: 'go abroad', label: '✈️', emoji: '✈️', imageUrl: '' },
    ],
    answerTranslation: L(
      '바이올린을 연주하다',
      'skripka chalmoq',
      'play the violin',
      'играть на скрипке',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'play'],
  },

  en_s1u4_n1_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She works for a charity.',
    audioText: 'She works for a charity.',
    answerTranslation: L(
      '그녀는 자선단체에서 일해요.',
      'U xayriya tashkilotida ishlaydi.',
      'She works for a charity.',
      'Она работает в благотворительной организации.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'work'],
  },

  en_s1u4_n1_008_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'live', native: 'yashamoq' },
      { korean: 'study', native: 'o‘rganmoq' },
      { korean: 'work', native: 'ishlamoq' },
      { korean: 'read', native: 'o‘qimoq' },
      { korean: 'watch', native: 'tomosha qilmoq' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'matching'],
  },

  en_s1u4_n1_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I play basketball.',
    audioText: 'I play basketball.',
    answerTranslation: L(
      '저는 농구를 해요.',
      'Men basketbol o‘ynayman.',
      'I play basketball.',
      'Я играю в баскетбол.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'play'],
  },

  en_s1u4_n1_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ the violin.',
    blankAnswers: ['play'],
    options: ['play', 'read', 'watch', 'study'],
    answer: 'play',
    answerTranslation: L(
      '저는 바이올린을 연주해요.',
      'Men skripka chalaman.',
      'I play the violin.',
      'Я играю на скрипке.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'play'],
  },

  en_s1u4_n1_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They like old buildings.',
    audioText: 'They like old buildings.',
    answerTranslation: L(
      '그들은 오래된 건물을 좋아해요.',
      'Ular eski binolarni yoqtiradi.',
      'They like old buildings.',
      'Им нравятся старые здания.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'like'],
  },

  en_s1u4_n1_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '자연스러운 동사구를 완성하세요.',
      'Tabiiy fe’l birikmasini to‘ldiring.',
      'Complete the natural verb phrase.',
      'Дополните естественное словосочетание.',
    ),
    sentenceTemplate: '___ newspapers',
    blankAnswers: ['read'],
    options: ['read', 'watch', 'play', 'live'],
    answer: 'read',
    answerTranslation: L(
      '신문을 읽다',
      'gazeta o‘qimoq',
      'read newspapers',
      'читать газеты',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'read'],
  },

  en_s1u4_n1_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We watch films.',
    audioText: 'We watch films.',
    answerTranslation: L(
      '우리는 영화를 봐요.',
      'Biz filmlar tomosha qilamiz.',
      'We watch films.',
      'Мы смотрим фильмы.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'watch'],
  },

  en_s1u4_n1_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '자연스러운 동사구를 완성하세요.',
      'Tabiiy fe’l birikmasini to‘ldiring.',
      'Complete the natural verb phrase.',
      'Дополните естественное словосочетание.',
    ),
    sentenceTemplate: '___ TV',
    blankAnswers: ['watch'],
    options: ['watch', 'read', 'study', 'live'],
    answer: 'watch',
    answerTranslation: L(
      'TV를 보다',
      'televizor tomosha qilmoq',
      'watch TV',
      'смотреть телевизор',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'watch'],
  },

  en_s1u4_n1_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They teach young people.',
    audioText: 'They teach young people.',
    answerTranslation: L(
      '그들은 젊은 사람들을 가르쳐요.',
      'Ular yosh odamlarga dars beradi.',
      'They teach young people.',
      'Они обучают молодых людей.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['common-verbs', 'teach'],
  },

  en_s1u4_n1_016_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'go abroad', native: 'chet elga bormoq' },
      { korean: 'work in an office', native: 'ofisda ishlamoq' },
      { korean: 'play tennis', native: 'tennis o‘ynamoq' },
      { korean: 'watch television', native: 'televizor ko‘rmoq' },
      { korean: 'read books', native: 'kitob o‘qimoq' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['verb-phrases', 'listening'],
  },

  en_s1u4_n1_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I read comics in my free time.',
    audioText: 'I read comics in my free time.',
    answerTranslation: L(
      '저는 여가 시간에 만화책을 읽어요.',
      'Men bo‘sh vaqtimda komiks o‘qiyman.',
      'I read comics in my free time.',
      'Я читаю комиксы в свободное время.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['free-time', 'read'],
  },

  en_s1u4_n1_018_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'read', 'books', 'in', 'my', 'free', 'time', 'watch'],
    answer: 'I read books in my free time',
    answerTranslation: L(
      '저는 여가 시간에 책을 읽어요.',
      'Men bo‘sh vaqtimda kitob o‘qiyman.',
      'I read books in my free time.',
      'Я читаю книги в свободное время.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['free-time', 'verb-phrases'],
  },

  en_s1u4_n1_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We work in a hospital.',
    audioText: 'We work in a hospital.',
    answerTranslation: L(
      '우리는 병원에서 일해요.',
      'Biz kasalxonada ishlaymiz.',
      'We work in a hospital.',
      'Мы работаем в больнице.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['work', 'verb-phrases'],
  },

  en_s1u4_n1_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'What do you do in your free time?' },
    ],
    options: [
      'I read books and watch films.',
      'I live books and study films.',
      'I play newspapers and read TV.',
      'I work basketball and watch English.',
    ],
    answer: 'I read books and watch films.',
    answerTranslation: L(
      '저는 책을 읽고 영화를 봐요.',
      'Men kitob o‘qiyman va film tomosha qilaman.',
      'I read books and watch films.',
      'Я читаю книги и смотрю фильмы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['free-time', 'verb-phrases'],
  },

  // ===========================================================
  // Lesson 2 · Present simple positive
  // ===========================================================

  en_s1u4_n1_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I work in an office.',
    audioText: 'I work in an office.',
    answerTranslation: L(
      '저는 사무실에서 일해요.',
      'Men ofisda ishlayman.',
      'I work in an office.',
      'Я работаю в офисе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'i'],
  },

  en_s1u4_n1_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ in an office.',
    blankAnswers: ['work'],
    options: ['work', 'works', 'working', 'is work'],
    answer: 'work',
    answerTranslation: L(
      '저는 사무실에서 일해요.',
      'Men ofisda ishlayman.',
      'I work in an office.',
      'Я работаю в офисе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'i'],
  },

  en_s1u4_n1_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'You live near the university.',
    audioText: 'You live near the university.',
    answerTranslation: L(
      '당신은 대학교 근처에 살아요.',
      'Siz universitet yaqinida yashaysiz.',
      'You live near the university.',
      'Вы живёте рядом с университетом.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'you'],
  },

  en_s1u4_n1_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ English at university.',
    blankAnswers: ['study'],
    options: ['study', 'studies', 'studys', 'is study'],
    answer: 'study',
    answerTranslation: L(
      '우리는 대학교에서 영어를 공부해요.',
      'Biz universitetda ingliz tilini o‘rganamiz.',
      'We study English at university.',
      'Мы изучаем английский в университете.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'we'],
  },

  en_s1u4_n1_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They play tennis at the weekend.',
    audioText: 'They play tennis at the weekend.',
    answerTranslation: L(
      '그들은 주말에 테니스를 쳐요.',
      'Ular dam olish kunlari tennis o‘ynaydi.',
      'They play tennis at the weekend.',
      'Они играют в теннис на выходных.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'they'],
  },

  en_s1u4_n1_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'I/you/we/they 뒤에 맞는 동사 형태를 고르세요.',
      'I/you/we/they dan keyin to‘g‘ri fe’l shaklini tanlang.',
      'Choose the correct verb form after I/you/we/they.',
      'Выберите правильную форму глагола после I/you/we/they.',
    ),
    sentenceTemplate: 'They ___ books every evening.',
    blankAnswers: ['read'],
    options: ['read', 'reads', 'reades', 'is read'],
    answer: 'read',
    answerTranslation: L(
      '그들은 매일 저녁 책을 읽어요.',
      'Ular har oqshom kitob o‘qiydi.',
      'They read books every evening.',
      'Они читают книги каждый вечер.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'base-form'],
  },

  en_s1u4_n1_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He works in a hospital.',
    audioText: 'He works in a hospital.',
    answerTranslation: L(
      '그는 병원에서 일해요.',
      'U kasalxonada ishlaydi.',
      'He works in a hospital.',
      'Он работает в больнице.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'he', 's-ending'],
  },

  en_s1u4_n1_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ in a hospital.',
    blankAnswers: ['works'],
    options: ['works', 'work', 'workes', 'working'],
    answer: 'works',
    answerTranslation: L(
      '그는 병원에서 일해요.',
      'U kasalxonada ishlaydi.',
      'He works in a hospital.',
      'Он работает в больнице.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'he', 's-ending'],
  },

  en_s1u4_n1_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She reads newspapers.',
    audioText: 'She reads newspapers.',
    answerTranslation: L(
      '그녀는 신문을 읽어요.',
      'U gazetalar o‘qiydi.',
      'She reads newspapers.',
      'Она читает газеты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'she', 's-ending'],
  },

  en_s1u4_n1_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ newspapers.',
    blankAnswers: ['reads'],
    options: ['reads', 'read', 'reades', 'reading'],
    answer: 'reads',
    answerTranslation: L(
      '그녀는 신문을 읽어요.',
      'U gazetalar o‘qiydi.',
      'She reads newspapers.',
      'Она читает газеты.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'she', 's-ending'],
  },

  en_s1u4_n1_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He likes comics.',
    audioText: 'He likes comics.',
    answerTranslation: L(
      '그는 만화책을 좋아해요.',
      'U komikslarni yoqtiradi.',
      'He likes comics.',
      'Он любит комиксы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'likes'],
  },

  en_s1u4_n1_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['He', 'likes', 'old', 'books', 'like', 'watch'],
    answer: 'He likes old books',
    audioText: 'He likes old books.',
    answerTranslation: L(
      '그는 오래된 책을 좋아해요.',
      'U eski kitoblarni yoqtiradi.',
      'He likes old books.',
      'Он любит старые книги.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple', 'likes'],
  },

  en_s1u4_n1_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She has two children.',
    audioText: 'She has two children.',
    answerTranslation: L(
      '그녀에게는 아이가 두 명 있어요.',
      'Uning ikki farzandi bor.',
      'She has two children.',
      'У неё двое детей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'have-has'],
  },

  en_s1u4_n1_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ two children.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'haves', 'having'],
    answer: 'has',
    answerTranslation: L(
      '그녀에게는 아이가 두 명 있어요.',
      'Uning ikki farzandi bor.',
      'She has two children.',
      'У неё двое детей.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'have-has'],
  },

  en_s1u4_n1_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We have a small flat.',
    audioText: 'We have a small flat.',
    answerTranslation: L(
      '우리는 작은 아파트가 있어요.',
      'Bizning kichik kvartiramiz bor.',
      'We have a small flat.',
      'У нас маленькая квартира.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'have'],
  },

  en_s1u4_n1_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'has', 'a', 'good', 'job', 'have', 'works'],
    answer: 'She has a good job',
    answerTranslation: L(
      '그녀는 좋은 직업이 있어요.',
      'Uning yaxshi ishi bor.',
      'She has a good job.',
      'У неё хорошая работа.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'has'],
  },

  en_s1u4_n1_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Present simple talks about habits and routines.',
    audioText: 'Present simple talks about habits and routines.',
    answerTranslation: L(
      '현재시제는 습관과 일상을 말할 때 사용해요.',
      'Present simple odatlar va kundalik ishlar haqida gapirish uchun ishlatiladi.',
      'Present simple talks about habits and routines.',
      'Present Simple используется для привычек и регулярных действий.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'routine'],
  },

  en_s1u4_n1_038_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '매주 반복되는 행동에 맞는 문장을 완성하세요.',
      'Har hafta takrorlanadigan harakat uchun gapni to‘ldiring.',
      'Complete the sentence about a regular routine.',
      'Дополните предложение о регулярном действии.',
    ),
    sentenceTemplate: 'He ___ basketball every Saturday.',
    blankAnswers: ['plays'],
    options: ['plays', 'play', 'playing', 'is play'],
    answer: 'plays',
    answerTranslation: L(
      '그는 매주 토요일 농구를 해요.',
      'U har shanba basketbol o‘ynaydi.',
      'He plays basketball every Saturday.',
      'Он играет в баскетбол каждую субботу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'routine'],
  },

  en_s1u4_n1_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friends watch films every weekend.',
    audioText: 'My friends watch films every weekend.',
    answerTranslation: L(
      '제 친구들은 매주 주말 영화를 봐요.',
      'Do‘stlarim har dam olish kuni film ko‘radi.',
      'My friends watch films every weekend.',
      'Мои друзья смотрят фильмы каждые выходные.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple', 'routine'],
  },

  en_s1u4_n1_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Tell me about your brother.' }],
    options: [
      'He works in a school and plays tennis.',
      'He work in a school and play tennis.',
      'He works in a school and play tennis.',
      'He working in a school and plays tennis.',
    ],
    answer: 'He works in a school and plays tennis.',
    answerTranslation: L(
      '그는 학교에서 일하고 테니스를 쳐요.',
      'U maktabda ishlaydi va tennis o‘ynaydi.',
      'He works in a school and plays tennis.',
      'Он работает в школе и играет в теннис.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['present-simple', 'he-she-it'],
  },

  // ===========================================================
  // Lesson 3 · -s / -es / -ies + pronunciation
  // ===========================================================

  en_s1u4_n1_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Play. Plays.',
    audioText: 'Play. Plays.',
    answerTranslation: L(
      'play. plays.',
      'play. plays.',
      'Play. Plays.',
      'Play. Plays.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple', 'spelling', 's'],
  },

  en_s1u4_n1_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'he/she/it 형태를 고르세요.',
      'he/she/it shaklini tanlang.',
      'Choose the he/she/it form.',
      'Выберите форму для he/she/it.',
    ),
    sentenceTemplate: 'play → ___',
    blankAnswers: ['plays'],
    options: ['plays', 'playes', 'plaies', 'play'],
    answer: 'plays',
    answerTranslation: L(
      'play → plays',
      'play → plays',
      'play → plays',
      'play → plays',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 's'],
  },

  en_s1u4_n1_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Go. Goes.',
    audioText: 'Go. Goes.',
    answerTranslation: L('go. goes.', 'go. goes.', 'Go. Goes.', 'Go. Goes.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'es'],
  },

  en_s1u4_n1_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 he/she/it 형태를 고르세요.',
      'To‘g‘ri he/she/it shaklini tanlang.',
      'Choose the correct he/she/it form.',
      'Выберите правильную форму для he/she/it.',
    ),
    sentenceTemplate: 'go → ___',
    blankAnswers: ['goes'],
    options: ['goes', 'gos', 'goies', 'go'],
    answer: 'goes',
    answerTranslation: L('go → goes', 'go → goes', 'go → goes', 'go → goes'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'es'],
  },

  en_s1u4_n1_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Watch. Watches.',
    audioText: 'Watch. Watches.',
    answerTranslation: L(
      'watch. watches.',
      'watch. watches.',
      'Watch. Watches.',
      'Watch. Watches.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'es'],
  },

  en_s1u4_n1_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'watch → ___',
    blankAnswers: ['watches'],
    options: ['watches', 'watchs', 'watchies', 'watch'],
    answer: 'watches',
    answerTranslation: L(
      'watch → watches',
      'watch → watches',
      'watch → watches',
      'watch → watches',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'es'],
  },

  en_s1u4_n1_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Teach. Teaches.',
    audioText: 'Teach. Teaches.',
    answerTranslation: L(
      'teach. teaches.',
      'teach. teaches.',
      'Teach. Teaches.',
      'Teach. Teaches.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'es'],
  },

  en_s1u4_n1_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'teach → ___',
    blankAnswers: ['teaches'],
    options: ['teaches', 'teachs', 'teachies', 'teach'],
    answer: 'teaches',
    answerTranslation: L(
      'teach → teaches',
      'teach → teaches',
      'teach → teaches',
      'teach → teaches',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'es'],
  },

  en_s1u4_n1_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Study. Studies.',
    audioText: 'Study. Studies.',
    answerTranslation: L(
      'study. studies.',
      'study. studies.',
      'Study. Studies.',
      'Study. Studies.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'ies'],
  },

  en_s1u4_n1_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '자음 + y로 끝나는 동사의 형태를 완성하세요.',
      'Undosh + y bilan tugagan fe’l shaklini to‘ldiring.',
      'Complete the verb ending in consonant + y.',
      'Дополните форму глагола, оканчивающегося на согласную + y.',
    ),
    sentenceTemplate: 'study → ___',
    blankAnswers: ['studies'],
    options: ['studies', 'studys', 'studyes', 'study'],
    answer: 'studies',
    answerTranslation: L(
      'study → studies',
      'study → studies',
      'study → studies',
      'study → studies',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['spelling', 'ies'],
  },

  en_s1u4_n1_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '/s/ 소리에 집중해서 따라 말하세요.',
      '/s/ tovushiga e’tibor berib takrorlang.',
      'Repeat and focus on the /s/ ending.',
      'Повторите, обращая внимание на окончание /s/.',
    ),
    answer: 'Likes. Works.',
    audioText: 'Likes. Works.',
    answerTranslation: L(
      'likes, works는 끝소리가 /s/예요.',
      'likes va works oxirida /s/ tovushi bor.',
      'Likes and works end with /s/.',
      'Likes и works заканчиваются звуком /s/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 's-sound'],
  },

  en_s1u4_n1_052_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: L(
      '동사를 끝소리 그룹과 연결하세요.',
      'Fe’lni oxirgi tovush guruhi bilan ulang.',
      'Match each verb to its final sound group.',
      'Соедините глагол с группой конечного звука.',
    ),
    pairs: [
      { korean: 'likes', native: '/s/' },
      { korean: 'works', native: '/s/' },
      { korean: 'plays', native: '/z/' },
      { korean: 'teaches', native: '/ɪz/' },
      { korean: 'watches', native: '/ɪz/' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'endings'],
  },

  en_s1u4_n1_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '/z/ 소리에 집중해서 따라 말하세요.',
      '/z/ tovushiga e’tibor berib takrorlang.',
      'Repeat and focus on the /z/ ending.',
      'Повторите, обращая внимание на окончание /z/.',
    ),
    answer: 'Goes. Lives. Plays. Reads. Studies.',
    audioText: 'Goes. Lives. Plays. Reads. Studies.',
    answerTranslation: L(
      '이 동사들은 끝소리가 /z/예요.',
      'Bu fe’llar oxirida /z/ tovushi bilan aytiladi.',
      'These verbs end with /z/.',
      'Эти глаголы заканчиваются звуком /z/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'z-sound'],
  },

  en_s1u4_n1_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'reads의 끝소리를 고르세요.',
      'reads so‘zining oxirgi tovushini tanlang.',
      'Choose the final sound in reads.',
      'Выберите конечный звук в reads.',
    ),
    sentenceTemplate: 'reads → ___',
    blankAnswers: ['/z/'],
    options: ['/z/', '/s/', '/ɪz/', '/t/'],
    answer: '/z/',
    answerTranslation: L(
      'reads는 /z/로 끝나요.',
      'reads /z/ tovushi bilan tugaydi.',
      'reads ends with /z/.',
      'reads заканчивается звуком /z/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'z-sound'],
  },

  en_s1u4_n1_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '/ɪz/ 소리에 집중해서 따라 말하세요.',
      '/ɪz/ tovushiga e’tibor berib takrorlang.',
      'Repeat and focus on the /ɪz/ ending.',
      'Повторите, обращая внимание на окончание /ɪz/.',
    ),
    answer: 'Teaches. Watches.',
    audioText: 'Teaches. Watches.',
    answerTranslation: L(
      'teaches와 watches는 /ɪz/로 끝나요.',
      'teaches va watches /ɪz/ tovushi bilan tugaydi.',
      'Teaches and watches end with /ɪz/.',
      'Teaches и watches заканчиваются звуком /ɪz/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'iz-sound'],
  },

  en_s1u4_n1_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'watches의 끝소리를 고르세요.',
      'watches so‘zining oxirgi tovushini tanlang.',
      'Choose the final sound in watches.',
      'Выберите конечный звук в watches.',
    ),
    sentenceTemplate: 'watches → ___',
    blankAnswers: ['/ɪz/'],
    options: ['/ɪz/', '/z/', '/s/', '/d/'],
    answer: '/ɪz/',
    answerTranslation: L(
      'watches는 /ɪz/로 끝나요.',
      'watches /ɪz/ tovushi bilan tugaydi.',
      'watches ends with /ɪz/.',
      'watches заканчивается звуком /ɪz/.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'iz-sound'],
  },

  en_s1u4_n1_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He goes abroad a lot.',
    audioText: 'He goes abroad a lot.',
    answerTranslation: L(
      '그는 해외에 자주 가요.',
      'U chet elga ko‘p boradi.',
      'He goes abroad a lot.',
      'Он часто ездит за границу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['goes', 'present-simple'],
  },

  en_s1u4_n1_058_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'She',
      'studies',
      'English',
      'at',
      'university',
      'study',
      'plays',
    ],
    answer: 'She studies English at university',
    audioText: 'She studies English at university.',
    answerTranslation: L(
      '그녀는 대학교에서 영어를 공부해요.',
      'U universitetda ingliz tilini o‘rganadi.',
      'She studies English at university.',
      'Она изучает английский в университете.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['studies', 'present-simple'],
  },

  en_s1u4_n1_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He teaches maths and watches films.',
    audioText: 'He teaches maths and watches films.',
    answerTranslation: L(
      '그는 수학을 가르치고 영화를 봐요.',
      'U matematika o‘qitadi va filmlar tomosha qiladi.',
      'He teaches maths and watches films.',
      'Он преподаёт математику и смотрит фильмы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['teaches', 'watches'],
  },

  en_s1u4_n1_060_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She reads books and plays tennis.',
    audioText: 'She reads books and plays tennis.',
    answerI18n: L(
      '그녀는 책을 읽고 테니스를 쳐요',
      'U kitob o‘qiydi va tennis o‘ynaydi',
      'She reads books and plays tennis',
      'Она читает книги и играет в теннис',
    ),
    options: ['She', 'reads', 'books', 'and', 'plays', 'tennis', 'read'],
    optionsI18n: {
      ko: ['그녀는', '책을', '읽고', '테니스를', '쳐요'],
      uz: ['U', 'kitob', 'o‘qiydi', 'va', 'tennis', 'o‘ynaydi'],
      en: ['She', 'reads', 'books', 'and', 'plays', 'tennis'],
      ru: ['Она', 'читает', 'книги', 'и', 'играет', 'в теннис'],
    },
    answerTranslation: L(
      '그녀는 책을 읽고 테니스를 쳐요.',
      'U kitob o‘qiydi va tennis o‘ynaydi.',
      'She reads books and plays tennis.',
      'Она читает книги и играет в теннис.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'present-simple'],
  },

  // ===========================================================
  // Lesson 4 · Talk about your life + verb phrases
  // ===========================================================

  en_s1u4_n1_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I live in a small city.',
    audioText: 'I live in a small city.',
    answerTranslation: L(
      '저는 작은 도시에 살아요.',
      'Men kichik shaharda yashayman.',
      'I live in a small city.',
      'Я живу в небольшом городе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-life', 'live'],
  },

  en_s1u4_n1_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where do you live?',
    options: ['I', 'live', 'in', 'a', 'small', 'city', 'works'],
    answer: 'I live in a small city',
    answerTranslation: L(
      '저는 작은 도시에 살아요.',
      'Men kichik shaharda yashayman.',
      'I live in a small city.',
      'Я живу в небольшом городе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-life', 'live'],
  },

  en_s1u4_n1_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I work for a small company.',
    audioText: 'I work for a small company.',
    answerTranslation: L(
      '저는 작은 회사에서 일해요.',
      'Men kichik kompaniyada ishlayman.',
      'I work for a small company.',
      'Я работаю в небольшой компании.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-life', 'work'],
  },

  en_s1u4_n1_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'work와 자연스럽게 쓰이는 전치사를 고르세요.',
      'work bilan tabiiy ishlatiladigan predlogni tanlang.',
      'Choose the natural preposition with work.',
      'Выберите естественный предлог с work.',
    ),
    sentenceTemplate: 'I work ___ a company.',
    blankAnswers: ['for'],
    options: ['for', 'to', 'at from', 'on'],
    answer: 'for',
    answerTranslation: L(
      '저는 회사에서 일해요.',
      'Men kompaniyada ishlayman.',
      'I work for a company.',
      'Я работаю в компании.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['verb-phrases', 'work-for'],
  },

  en_s1u4_n1_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I study English at university.',
    audioText: 'I study English at university.',
    answerTranslation: L(
      '저는 대학교에서 영어를 공부해요.',
      'Men universitetda ingliz tilini o‘rganaman.',
      'I study English at university.',
      'Я изучаю английский в университете.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-life', 'study'],
  },

  en_s1u4_n1_066_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I play football at the weekend.',
    audioText: 'I play football at the weekend.',
    answerTranslation: L(
      '저는 주말에 축구를 해요.',
      'Men dam olish kunlari futbol o‘ynayman.',
      'I play football at the weekend.',
      'Я играю в футбол на выходных.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-life', 'play'],
  },

  en_s1u4_n1_067_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'What do you do in your free time?',
    options: ['I', 'watch', 'films', 'and', 'read', 'books', 'works'],
    answer: 'I watch films and read books',
    answerTranslation: L(
      '저는 영화를 보고 책을 읽어요.',
      'Men film tomosha qilaman va kitob o‘qiyman.',
      'I watch films and read books.',
      'Я смотрю фильмы и читаю книги.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-life', 'free-time'],
  },

  en_s1u4_n1_068_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My sister lives in a flat.',
    audioText: 'My sister lives in a flat.',
    answerTranslation: L(
      '제 여자 형제는 아파트에 살아요.',
      'Opam yoki singlim kvartirada yashaydi.',
      'My sister lives in a flat.',
      'Моя сестра живёт в квартире.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-others', 'lives'],
  },

  en_s1u4_n1_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She works in a hospital.',
    audioText: 'She works in a hospital.',
    answerTranslation: L(
      '그녀는 병원에서 일해요.',
      'U kasalxonada ishlaydi.',
      'She works in a hospital.',
      'Она работает в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-others', 'works'],
  },

  en_s1u4_n1_070_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'works', 'in', 'a', 'hospital', 'work', 'plays'],
    answer: 'She works in a hospital',
    answerTranslation: L(
      '그녀는 병원에서 일해요.',
      'U kasalxonada ishlaydi.',
      'She works in a hospital.',
      'Она работает в больнице.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-others', 'works'],
  },

  en_s1u4_n1_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She reads books and watches films.',
    audioText: 'She reads books and watches films.',
    answerTranslation: L(
      '그녀는 책을 읽고 영화를 봐요.',
      'U kitob o‘qiydi va film tomosha qiladi.',
      'She reads books and watches films.',
      'Она читает книги и смотрит фильмы.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['talk-about-others', 'free-time'],
  },

  en_s1u4_n1_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '문장에서 핵심 동사를 고르세요.',
      'Gapdagi asosiy fe’lni tanlang.',
      'Choose the key verb in the sentence.',
      'Выберите основной глагол в предложении.',
    ),
    sentenceTemplate: 'Mina works in a hospital.',
    blankAnswers: ['works'],
    options: ['works', 'hospital', 'Mina', 'in'],
    answer: 'works',
    answerTranslation: L(
      '핵심 동사는 works예요.',
      'Asosiy fe’l works.',
      'The key verb is works.',
      'Основной глагол — works.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'reading-skill'],
  },

  en_s1u4_n1_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '동사구 전체를 따라 말하세요.',
      'Butun fe’l birikmasini takrorlang.',
      'Repeat the whole verb phrase.',
      'Повторите всё глагольное словосочетание.',
    ),
    answer: 'Works in a hospital.',
    audioText: 'Works in a hospital.',
    answerTranslation: L(
      '병원에서 일하다.',
      'Kasalxonada ishlamoq.',
      'Works in a hospital.',
      'Работает в больнице.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['verb-phrases', 'reading-skill'],
  },

  en_s1u4_n1_074_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'study와 함께 묶이는 정보를 고르세요.',
      'study bilan birga keladigan ma’lumotni tanlang.',
      'Choose the information that completes the verb phrase with study.',
      'Выберите информацию, завершающую словосочетание со study.',
    ),
    sentenceTemplate: 'Nadia studies ___',
    blankAnswers: ['art at university'],
    options: ['art at university', 'a television', 'to the beach', 'in a car'],
    answer: 'art at university',
    answerTranslation: L(
      'Nadia는 대학교에서 미술을 공부해요.',
      'Nadia universitetda san’atni o‘rganadi.',
      'Nadia studies art at university.',
      'Надя изучает искусство в университете.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'reading-skill'],
  },

  en_s1u4_n1_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He goes to the beach at the weekend.',
    audioText: 'He goes to the beach at the weekend.',
    answerTranslation: L(
      '그는 주말에 해변에 가요.',
      'U dam olish kunlari plyajga boradi.',
      'He goes to the beach at the weekend.',
      'Он ходит на пляж по выходным.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['verb-phrases', 'go'],
  },

  en_s1u4_n1_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '자연스럽지 않은 동사구를 피하고 올바른 동사를 고르세요.',
      'Noto‘g‘ri fe’l birikmasidan qochib, to‘g‘ri fe’lni tanlang.',
      'Choose the correct verb for the phrase.',
      'Выберите правильный глагол для словосочетания.',
    ),
    sentenceTemplate: '___ a film',
    blankAnswers: ['watch'],
    options: ['watch', 'read', 'live', 'study'],
    answer: 'watch',
    answerTranslation: L(
      '영화를 보다',
      'film tomosha qilmoq',
      'watch a film',
      'смотреть фильм',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['verb-phrases', 'collocations'],
  },

  en_s1u4_n1_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She has a car.',
    audioText: 'She has a car.',
    answerTranslation: L(
      '그녀는 자동차가 있어요.',
      'Uning mashinasi bor.',
      'She has a car.',
      'У неё есть машина.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have', 'possession'],
  },

  en_s1u4_n1_078_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '소유를 나타내는 자연스러운 문장을 고르세요.',
      'Egalikni bildiradigan tabiiy gapni tanlang.',
      'Choose the natural sentence for possession.',
      'Выберите естественное предложение для выражения принадлежности.',
    ),
    dialogLines: [{ speaker: 'npc', text: 'Tell me about Sara’s car.' }],
    options: [
      'She has a new car.',
      'She have a new car.',
      'She has got lunch at one.',
      'She haves a new car.',
    ],
    answer: 'She has a new car.',
    answerTranslation: L(
      '그녀는 새 자동차가 있어요.',
      'Uning yangi mashinasi bor.',
      'She has a new car.',
      'У неё новая машина.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have', 'possession'],
  },

  en_s1u4_n1_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I have lunch at one.',
    audioText: 'I have lunch at one.',
    answerTranslation: L(
      '저는 1시에 점심을 먹어요.',
      'Men soat birda tushlik qilaman.',
      'I have lunch at one.',
      'Я обедаю в час.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['have', 'present-simple-action'],
  },

  en_s1u4_n1_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '현재의 반복 행동을 나타내는 자연스러운 문장을 고르세요.',
      'Hozirgi takroriy harakatni bildiradigan tabiiy gapni tanlang.',
      'Choose the natural sentence for a regular present action.',
      'Выберите естественное предложение для регулярного действия.',
    ),
    dialogLines: [
      { speaker: 'npc', text: 'What do you do at one o’clock every day?' },
    ],
    options: [
      'I have lunch.',
      'I have got lunch.',
      'I has lunch.',
      'I having lunch.',
    ],
    answer: 'I have lunch.',
    answerTranslation: L(
      '저는 점심을 먹어요.',
      'Men tushlik qilaman.',
      'I have lunch.',
      'Я обедаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['have', 'routine', 'final'],
  },
};

export const EN_S1_UNIT4_NODE1 = {
  title: L('나에 대해 말하기', 'Men haqimda', 'About me', 'Обо мне'),
  section: 1,
  unit: 4,
  order: 1,
  isActive: true,

  lessons: [
    {
      title: L(
        '자주 쓰는 동사',
        'Ko‘p ishlatiladigan fe’llar',
        'Common verbs',
        'Основные глаголы',
      ),
      description: L(
        'live, study, go, work, play, like, teach, watch, read 같은 기본 동사를 자연스러운 표현과 함께 익혀요.',
        'live, study, go, work, play, like, teach, watch va read kabi asosiy fe’llarni tabiiy birikmalar bilan o‘rganasiz.',
        'Learn common verbs such as live, study, go, work, play, like, teach, watch and read as useful verb phrases.',
        'Учимся использовать основные глаголы live, study, go, work, play, like, teach, watch и read в естественных словосочетаниях.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u4_n1_001_speaking',
        'en_s1u4_n1_002_image_choice',
        'en_s1u4_n1_003_speaking',
        'en_s1u4_n1_004_fill_in_blank',
        'en_s1u4_n1_005_speaking',
        'en_s1u4_n1_006_image_choice',
        'en_s1u4_n1_007_speaking',
        'en_s1u4_n1_008_word_matching',
        'en_s1u4_n1_009_speaking',
        'en_s1u4_n1_010_fill_in_blank',
        'en_s1u4_n1_011_speaking',
        'en_s1u4_n1_012_fill_in_blank',
        'en_s1u4_n1_013_speaking',
        'en_s1u4_n1_014_fill_in_blank',
        'en_s1u4_n1_015_speaking',
        'en_s1u4_n1_016_audio_match',
        'en_s1u4_n1_017_speaking',
        'en_s1u4_n1_018_translate_builder',
        'en_s1u4_n1_019_speaking',
        'en_s1u4_n1_020_dialog_complete',
      ],
    },

    {
      title: L(
        '매일 하는 일 말하기',
        'Kundalik ishlar haqida gapirish',
        'Present simple positive',
        'Present Simple: утвердительная форма',
      ),
      description: L(
        'I/you/we/they 뒤에는 기본형을 쓰고 he/she/it 뒤에는 동사에 -(e)s를 붙여 습관과 일상을 말해요.',
        'I/you/we/they bilan fe’lning asosiy shaklini, he/she/it bilan esa -(e)s shaklini ishlatib odatlar va kundalik ishlar haqida gapirasiz.',
        'Use the base verb with I, you, we and they, and the -(e)s form with he, she and it to talk about habits and routines.',
        'Используем основную форму с I, you, we, they и форму -(e)s с he, she, it для привычек и регулярных действий.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u4_n1_021_speaking',
        'en_s1u4_n1_022_fill_in_blank',
        'en_s1u4_n1_023_speaking',
        'en_s1u4_n1_024_fill_in_blank',
        'en_s1u4_n1_025_speaking',
        'en_s1u4_n1_026_fill_in_blank',
        'en_s1u4_n1_027_speaking',
        'en_s1u4_n1_028_fill_in_blank',
        'en_s1u4_n1_029_speaking',
        'en_s1u4_n1_030_fill_in_blank',
        'en_s1u4_n1_031_speaking',
        'en_s1u4_n1_032_word_arrange',
        'en_s1u4_n1_033_speaking',
        'en_s1u4_n1_034_fill_in_blank',
        'en_s1u4_n1_035_speaking',
        'en_s1u4_n1_036_translate_builder',
        'en_s1u4_n1_037_speaking',
        'en_s1u4_n1_038_fill_in_blank',
        'en_s1u4_n1_039_speaking',
        'en_s1u4_n1_040_dialog_complete',
      ],
    },

    {
      title: L(
        'plays, goes, studies',
        'plays, goes, studies',
        'Verb endings',
        'Окончания глаголов',
      ),
      description: L(
        'he/she/it에서 -s, -es, -ies를 붙이는 철자 규칙과 /s/, /z/, /ɪz/ 세 가지 발음을 익혀요.',
        'he/she/it uchun -s, -es va -ies yozilish qoidalarini hamda /s/, /z/, /ɪz/ uch xil talaffuzni o‘rganasiz.',
        'Learn the -s, -es and -ies spelling rules and the three final sounds /s/, /z/ and /ɪz/.',
        'Изучаем правила -s, -es, -ies и три варианта произношения окончаний: /s/, /z/ и /ɪz/.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u4_n1_041_speaking',
        'en_s1u4_n1_042_fill_in_blank',
        'en_s1u4_n1_043_speaking',
        'en_s1u4_n1_044_fill_in_blank',
        'en_s1u4_n1_045_speaking',
        'en_s1u4_n1_046_fill_in_blank',
        'en_s1u4_n1_047_speaking',
        'en_s1u4_n1_048_fill_in_blank',
        'en_s1u4_n1_049_speaking',
        'en_s1u4_n1_050_fill_in_blank',
        'en_s1u4_n1_051_speaking',
        'en_s1u4_n1_052_audio_match',
        'en_s1u4_n1_053_speaking',
        'en_s1u4_n1_054_fill_in_blank',
        'en_s1u4_n1_055_speaking',
        'en_s1u4_n1_056_fill_in_blank',
        'en_s1u4_n1_057_speaking',
        'en_s1u4_n1_058_word_arrange',
        'en_s1u4_n1_059_speaking',
        'en_s1u4_n1_060_sentence_builder',
      ],
    },

    {
      title: L(
        '내 생활 소개하기',
        'Hayotim haqida gapirish',
        'Talking about your life',
        'Рассказываем о своей жизни',
      ),
      description: L(
        '사는 곳, 일, 공부, 취미와 여가 시간을 말하고, 문장을 읽을 때 동사를 먼저 찾아 뒤의 정보를 하나의 동사구로 이해해요.',
        'Qayerda yashashingiz, ishlashingiz, o‘qishingiz va bo‘sh vaqtingiz haqida gapirasiz hamda gapda avval fe’lni topib, keyingi ma’lumotni bir fe’l birikmasi sifatida tushunasiz.',
        'Talk about where you live, work, study and what you do in your free time, and identify complete verb phrases.',
        'Рассказываем о месте жительства, работе, учёбе и свободном времени и учимся находить полные глагольные словосочетания.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u4_n1_061_speaking',
        'en_s1u4_n1_062_reply_builder',
        'en_s1u4_n1_063_speaking',
        'en_s1u4_n1_064_fill_in_blank',
        'en_s1u4_n1_065_speaking',
        'en_s1u4_n1_066_speaking',
        'en_s1u4_n1_067_reply_builder',
        'en_s1u4_n1_068_speaking',
        'en_s1u4_n1_069_speaking',
        'en_s1u4_n1_070_translate_builder',
        'en_s1u4_n1_071_speaking',
        'en_s1u4_n1_072_fill_in_blank',
        'en_s1u4_n1_073_speaking',
        'en_s1u4_n1_074_fill_in_blank',
        'en_s1u4_n1_075_speaking',
        'en_s1u4_n1_076_fill_in_blank',
        'en_s1u4_n1_077_speaking',
        'en_s1u4_n1_078_dialog_complete',
        'en_s1u4_n1_079_speaking',
        'en_s1u4_n1_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 4 · Node 2
// 4.2 Journeys
//
// LessonCategory:
// 실제 enum에 존재하는 값만 사용.
// VOCABULARY / GRAMMAR / EXPRESSION / CONVERSATION / LISTENING / TOPIK
//
// Coverage
// - transport:
//   bus / ferry / motorbike / train
//   cycle / drive / walk
// - transport phrases:
//   go by bus
//   go by train
//   go by ferry
//   go by motorbike
//   drive to work
//   cycle to work
//   walk to work/school
// - public transport
// - present simple negative:
//   I/You/We/They don't + verb
//   He/She/It doesn't + verb
// - after doesn't, use base verb:
//   doesn't drive
//   doesn't go
//   doesn't work
// - contractions:
//   do not → don't
//   does not → doesn't
// - listening:
//   positive vs negative contractions
//   negative contractions end in n't
// - distinguish negative systems:
//   be: isn't / aren't
//   have got: haven't got / hasn't got
//   other verbs: don't / doesn't + verb
// - talk about journeys
// - describe another person's journey
//
// 4 lessons × 20 = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT4_NODE2_WORDS = [
  {
    code: 'en-transport-bus',
    english: 'bus',
    senseKey: 'road-public-transport',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '버스',
      'avtobus',
      'a large road vehicle that carries many passengers',
      'автобус',
    ),
    examples: [
      {
        english: 'I go to work by bus.',
        translations: L(
          '저는 버스로 출근해요.',
          'Men ishga avtobusda boraman.',
          'I go to work by bus.',
          'Я езжу на работу на автобусе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/bʌs/',
      ttsText: 'bus',
    },
    media: {
      emoji: '🚌',
      imageUrl: '',
      imageAlt: L('버스', 'avtobus', 'a bus', 'автобус'),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-ferry',
    english: 'ferry',
    senseKey: 'boat-public-transport',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '페리; 연락선',
      'parom',
      'a boat that carries people or vehicles across water',
      'паром',
    ),
    examples: [
      {
        english: 'We go by ferry.',
        translations: L(
          '우리는 페리를 타고 가요.',
          'Biz paromda boramiz.',
          'We go by ferry.',
          'Мы едем на пароме.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈferi/',
      ttsText: 'ferry',
    },
    media: {
      emoji: '⛴️',
      imageUrl: '',
      imageAlt: L('페리', 'parom', 'a ferry', 'паром'),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-motorbike',
    english: 'motorbike',
    senseKey: 'two-wheel-motor-vehicle',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '오토바이',
      'mototsikl',
      'a two-wheeled vehicle with an engine',
      'мотоцикл',
    ),
    examples: [
      {
        english: 'He goes to university by motorbike.',
        translations: L(
          '그는 오토바이로 대학교에 가요.',
          'U universitetga mototsiklda boradi.',
          'He goes to university by motorbike.',
          'Он ездит в университет на мотоцикле.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈməʊtəbaɪk/',
      ttsText: 'motorbike',
    },
    media: {
      emoji: '🏍️',
      imageUrl: '',
      imageAlt: L('오토바이', 'mototsikl', 'a motorbike', 'мотоцикл'),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-train',
    english: 'train',
    senseKey: 'rail-transport',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기차',
      'poyezd',
      'a vehicle that travels on railway tracks',
      'поезд',
    ),
    examples: [
      {
        english: 'She goes to work by train.',
        translations: L(
          '그녀는 기차로 출근해요.',
          'U ishga poyezdda boradi.',
          'She goes to work by train.',
          'Она ездит на работу на поезде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/treɪn/',
      ttsText: 'train',
    },
    media: {
      emoji: '🚆',
      imageUrl: '',
      imageAlt: L('기차', 'poyezd', 'a train', 'поезд'),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-cycle',
    english: 'cycle',
    senseKey: 'travel-by-bicycle',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '자전거를 타고 가다',
      'velosipedda bormoq',
      'to travel by bicycle',
      'ехать на велосипеде',
    ),
    examples: [
      {
        english: 'I cycle to work.',
        translations: L(
          '저는 자전거로 출근해요.',
          'Men ishga velosipedda boraman.',
          'I cycle to work.',
          'Я езжу на работу на велосипеде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsaɪkl/',
      ttsText: 'cycle',
    },
    media: {
      emoji: '🚲',
      imageUrl: '',
      imageAlt: L(
        '자전거를 타는 사람',
        'velosiped minayotgan odam',
        'a person cycling',
        'человек едет на велосипеде',
      ),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-drive',
    english: 'drive',
    senseKey: 'control-car',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '운전하다',
      'mashina haydamoq',
      'to control and travel in a car',
      'водить машину',
    ),
    examples: [
      {
        english: 'They drive to work.',
        translations: L(
          '그들은 운전해서 출근해요.',
          'Ular ishga mashina haydab boradi.',
          'They drive to work.',
          'Они ездят на работу на машине.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/draɪv/',
      ttsText: 'drive',
    },
    media: {
      emoji: '🚗',
      imageUrl: '',
      imageAlt: L(
        '운전하는 사람',
        'mashina haydayotgan odam',
        'a person driving',
        'человек за рулём',
      ),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-walk',
    english: 'walk',
    senseKey: 'travel-on-foot',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '걷다; 걸어가다',
      'piyoda yurmoq',
      'to travel somewhere on foot',
      'идти пешком',
    ),
    examples: [
      {
        english: 'We walk to school.',
        translations: L(
          '우리는 학교에 걸어가요.',
          'Biz maktabga piyoda boramiz.',
          'We walk to school.',
          'Мы ходим в школу пешком.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/wɔːk/',
      ttsText: 'walk',
    },
    media: {
      emoji: '🚶',
      imageUrl: '',
      imageAlt: L(
        '걷는 사람',
        'piyoda ketayotgan odam',
        'a person walking',
        'идущий человек',
      ),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-public-transport',
    english: 'public transport',
    senseKey: 'shared-transport-system',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대중교통',
      'jamoat transporti',
      'transport such as buses and trains used by the public',
      'общественный транспорт',
    ),
    examples: [
      {
        english: 'A lot of people use public transport.',
        translations: L(
          '많은 사람들이 대중교통을 이용해요.',
          'Ko‘p odamlar jamoat transportidan foydalanadi.',
          'A lot of people use public transport.',
          'Многие люди пользуются общественным транспортом.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌpʌblɪk ˈtrænspɔːt/',
      ttsText: 'public transport',
    },
    media: {
      emoji: '🚉',
      imageUrl: '',
      imageAlt: L(
        '대중교통',
        'jamoat transporti',
        'public transport',
        'общественный транспорт',
      ),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-travel-journey',
    english: 'journey',
    senseKey: 'travel-from-one-place-to-another',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '이동; 여정',
      'safar; yo‘l',
      'travel from one place to another',
      'поездка; путешествие',
    ),
    examples: [
      {
        english: 'Tell me about your journey to work.',
        translations: L(
          '출근길에 대해 말해 주세요.',
          'Ishga boradigan yo‘lingiz haqida gapiring.',
          'Tell me about your journey to work.',
          'Расскажите о своей поездке на работу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdʒɜːni/',
      ttsText: 'journey',
    },
    media: {
      emoji: '🛣️',
      imageUrl: '',
      imageAlt: L('이동하는 길', 'safar yo‘li', 'a journey', 'поездка'),
    },
    tags: ['transport', 'journeys'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT4_NODE2_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Transport
  // ===========================================================

  en_s1u4_n2_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I go to work by train.',
    audioText: 'I go to work by train.',
    answerTranslation: L(
      '저는 기차로 출근해요.',
      'Men ishga poyezdda boraman.',
      'I go to work by train.',
      'Я езжу на работу на поезде.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['transport', 'train'],
  },

  en_s1u4_n2_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'bus', native: 'avtobus' },
      { korean: 'ferry', native: 'parom' },
      { korean: 'motorbike', native: 'mototsikl' },
      { korean: 'train', native: 'poyezd' },
      { korean: 'walk', native: 'piyoda yurmoq' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['transport', 'matching'],
  },

  en_s1u4_n2_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I cycle to work.',
    audioText: 'I cycle to work.',
    answerTranslation: L(
      '저는 자전거로 출근해요.',
      'Men ishga velosipedda boraman.',
      'I cycle to work.',
      'Я езжу на работу на велосипеде.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['transport', 'cycle'],
  },

  en_s1u4_n2_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ to the centre every day.',
    blankAnswers: ['drive'],
    options: ['drive', 'ferry', 'bus', 'train'],
    answer: 'drive',
    answerTranslation: L(
      '우리는 매일 운전해서 도심에 가요.',
      'Biz har kuni markazga mashina haydab boramiz.',
      'We drive to the centre every day.',
      'Мы каждый день ездим в центр на машине.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['transport', 'drive'],
  },

  en_s1u4_n2_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We walk to school.',
    audioText: 'We walk to school.',
    answerTranslation: L(
      '우리는 학교에 걸어가요.',
      'Biz maktabga piyoda boramiz.',
      'We walk to school.',
      'Мы ходим в школу пешком.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['transport', 'walk'],
  },

  en_s1u4_n2_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I go to work ___ train.',
    blankAnswers: ['by'],
    options: ['by', 'in', 'at', 'for'],
    answer: 'by',
    answerTranslation: L(
      '저는 기차로 출근해요.',
      'Men ishga poyezdda boraman.',
      'I go to work by train.',
      'Я езжу на работу на поезде.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'by'],
  },

  en_s1u4_n2_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They go by ferry.',
    audioText: 'They go by ferry.',
    answerTranslation: L(
      '그들은 페리를 타고 가요.',
      'Ular paromda boradi.',
      'They go by ferry.',
      'Они едут на пароме.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'ferry'],
  },

  en_s1u4_n2_008_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'by bus', native: 'avtobusda' },
      { korean: 'by train', native: 'poyezdda' },
      { korean: 'by ferry', native: 'paromda' },
      { korean: 'by motorbike', native: 'mototsiklda' },
      { korean: 'walk', native: 'piyoda yurmoq' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['transport', 'listening'],
  },

  en_s1u4_n2_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She goes to university by motorbike.',
    audioText: 'She goes to university by motorbike.',
    answerTranslation: L(
      '그녀는 오토바이로 대학교에 가요.',
      'U universitetga mototsiklda boradi.',
      'She goes to university by motorbike.',
      'Она ездит в университет на мотоцикле.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'motorbike'],
  },

  en_s1u4_n2_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ to work every morning.',
    blankAnswers: ['walk'],
    options: ['walk', 'bus', 'ferry', 'train'],
    answer: 'walk',
    answerTranslation: L(
      '저는 매일 아침 걸어서 출근해요.',
      'Men har kuni ertalab ishga piyoda boraman.',
      'I walk to work every morning.',
      'Я каждое утро хожу на работу пешком.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['transport', 'walk'],
  },

  en_s1u4_n2_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We go to university by bus.',
    audioText: 'We go to university by bus.',
    answerTranslation: L(
      '우리는 버스로 대학교에 가요.',
      'Biz universitetga avtobusda boramiz.',
      'We go to university by bus.',
      'Мы ездим в университет на автобусе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'bus'],
  },

  en_s1u4_n2_012_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'They go to work ___ bus.',
    blankAnswers: ['by'],
    options: ['by', 'on', 'for', 'from'],
    answer: 'by',
    answerTranslation: L(
      '그들은 버스로 출근해요.',
      'Ular ishga avtobusda boradi.',
      'They go to work by bus.',
      'Они ездят на работу на автобусе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'by-bus'],
  },

  en_s1u4_n2_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'A lot of people go by motorbike.',
    audioText: 'A lot of people go by motorbike.',
    answerTranslation: L(
      '많은 사람들이 오토바이로 이동해요.',
      'Ko‘p odamlar mototsiklda yuradi.',
      'A lot of people go by motorbike.',
      'Многие люди ездят на мотоциклах.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'motorbike'],
  },

  en_s1u4_n2_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'A lot of people go ___ motorbike.',
    blankAnswers: ['by'],
    options: ['by', 'at', 'to', 'for'],
    answer: 'by',
    answerTranslation: L(
      '많은 사람들이 오토바이로 이동해요.',
      'Ko‘p odamlar mototsiklda yuradi.',
      'A lot of people go by motorbike.',
      'Многие люди ездят на мотоциклах.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'by-motorbike'],
  },

  en_s1u4_n2_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Public transport is very good.',
    audioText: 'Public transport is very good.',
    answerTranslation: L(
      '대중교통이 아주 좋아요.',
      'Jamoat transporti juda yaxshi.',
      'Public transport is very good.',
      'Общественный транспорт очень хороший.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['public-transport'],
  },

  en_s1u4_n2_016_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'go', 'to', 'university', 'by', 'train', 'drive', 'walk'],
    answer: 'I go to university by train',
    answerTranslation: L(
      '저는 기차로 대학교에 가요.',
      'Men universitetga poyezdda boraman.',
      'I go to university by train.',
      'Я езжу в университет на поезде.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'train'],
  },

  en_s1u4_n2_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They drive to work every day.',
    audioText: 'They drive to work every day.',
    answerTranslation: L(
      '그들은 매일 운전해서 출근해요.',
      'Ular har kuni ishga mashina haydab boradi.',
      'They drive to work every day.',
      'Они каждый день ездят на работу на машине.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['transport', 'drive'],
  },

  en_s1u4_n2_018_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['They', 'go', 'to', 'work', 'by', 'bus', 'train', 'drive'],
    answer: 'They go to work by bus',
    audioText: 'They go to work by bus.',
    answerTranslation: L(
      '그들은 버스로 출근해요.',
      'Ular ishga avtobusda boradi.',
      'They go to work by bus.',
      'Они ездят на работу на автобусе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['transport', 'bus'],
  },

  en_s1u4_n2_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I walk to school.',
    audioText: 'I walk to school.',
    answerTranslation: L(
      '저는 학교에 걸어가요.',
      'Men maktabga piyoda boraman.',
      'I walk to school.',
      'Я хожу в школу пешком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journey', 'walk'],
  },

  en_s1u4_n2_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'How do you go to work?' }],
    options: [
      'I cycle to work.',
      'I by cycle to work.',
      'I go cycle by work.',
      'I am cycle to work.',
    ],
    answer: 'I cycle to work.',
    answerTranslation: L(
      '저는 자전거로 출근해요.',
      'Men ishga velosipedda boraman.',
      'I cycle to work.',
      'Я езжу на работу на велосипеде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journey', 'conversation'],
  },

  // ===========================================================
  // Lesson 2 · Present simple negative
  // ===========================================================

  en_s1u4_n2_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t drive to work.',
    audioText: 'I don’t drive to work.',
    answerTranslation: L(
      '저는 운전해서 출근하지 않아요.',
      'Men ishga mashina haydab bormayman.',
      'I don’t drive to work.',
      'Я не езжу на работу на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'dont'],
  },

  en_s1u4_n2_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ drive to work.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'hasn’t'],
    answer: 'don’t',
    answerTranslation: L(
      '저는 운전해서 출근하지 않아요.',
      'Men ishga mashina haydab bormayman.',
      'I don’t drive to work.',
      'Я не езжу на работу на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'dont'],
  },

  en_s1u4_n2_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We don’t like buses.',
    audioText: 'We don’t like buses.',
    answerTranslation: L(
      '우리는 버스를 좋아하지 않아요.',
      'Biz avtobuslarni yoqtirmaymiz.',
      'We don’t like buses.',
      'Мы не любим автобусы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'we'],
  },

  en_s1u4_n2_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ like buses.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'aren’t', 'haven’t'],
    answer: 'don’t',
    answerTranslation: L(
      '우리는 버스를 좋아하지 않아요.',
      'Biz avtobuslarni yoqtirmaymiz.',
      'We don’t like buses.',
      'Мы не любим автобусы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'we'],
  },

  en_s1u4_n2_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They don’t work near the centre.',
    audioText: 'They don’t work near the centre.',
    answerTranslation: L(
      '그들은 도심 근처에서 일하지 않아요.',
      'Ular markaz yaqinida ishlamaydi.',
      'They don’t work near the centre.',
      'Они не работают рядом с центром.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'they'],
  },

  en_s1u4_n2_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'I/you/we/they의 부정형을 고르세요.',
      'I/you/we/they uchun inkor shaklini tanlang.',
      'Choose the negative form for I/you/we/they.',
      'Выберите отрицательную форму для I/you/we/they.',
    ),
    sentenceTemplate: 'They ___ study at night.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'hasn’t'],
    answer: 'don’t',
    answerTranslation: L(
      '그들은 밤에 공부하지 않아요.',
      'Ular kechasi o‘qimaydi.',
      'They don’t study at night.',
      'Они не учатся ночью.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'dont'],
  },

  en_s1u4_n2_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He doesn’t walk to work.',
    audioText: 'He doesn’t walk to work.',
    answerTranslation: L(
      '그는 걸어서 출근하지 않아요.',
      'U ishga piyoda bormaydi.',
      'He doesn’t walk to work.',
      'Он не ходит на работу пешком.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'doesnt'],
  },

  en_s1u4_n2_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ walk to work.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'hasn’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그는 걸어서 출근하지 않아요.',
      'U ishga piyoda bormaydi.',
      'He doesn’t walk to work.',
      'Он не ходит на работу пешком.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'doesnt'],
  },

  en_s1u4_n2_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She doesn’t teach music.',
    audioText: 'She doesn’t teach music.',
    answerTranslation: L(
      '그녀는 음악을 가르치지 않아요.',
      'U musiqa o‘qitmaydi.',
      'She doesn’t teach music.',
      'Она не преподаёт музыку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'she'],
  },

  en_s1u4_n2_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ teach music.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'aren’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그녀는 음악을 가르치지 않아요.',
      'U musiqa o‘qitmaydi.',
      'She doesn’t teach music.',
      'Она не преподаёт музыку.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'she'],
  },

  en_s1u4_n2_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My brother doesn’t work for a big company.',
    audioText: 'My brother doesn’t work for a big company.',
    answerTranslation: L(
      '제 형제는 큰 회사에서 일하지 않아요.',
      'Akam yoki ukam katta kompaniyada ishlamaydi.',
      'My brother doesn’t work for a big company.',
      'Мой брат не работает в большой компании.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'work'],
  },

  en_s1u4_n2_032_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['My', 'brother', 'doesn’t', 'work', 'here', 'works', 'don’t'],
    answer: 'My brother doesn’t work here',
    audioText: 'My brother doesn’t work here.',
    answerTranslation: L(
      '제 형제는 여기에서 일하지 않아요.',
      'Akam yoki ukam bu yerda ishlamaydi.',
      'My brother doesn’t work here.',
      'Мой брат здесь не работает.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['present-simple-negative', 'doesnt'],
  },

  en_s1u4_n2_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She doesn’t go to work by train.',
    audioText: 'She doesn’t go to work by train.',
    answerTranslation: L(
      '그녀는 기차로 출근하지 않아요.',
      'U ishga poyezdda bormaydi.',
      'She doesn’t go to work by train.',
      'Она не ездит на работу на поезде.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'go'],
  },

  en_s1u4_n2_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'doesn’t 뒤에 오는 올바른 동사 형태를 고르세요.',
      'doesn’t dan keyin to‘g‘ri fe’l shaklini tanlang.',
      'Choose the correct verb form after doesn’t.',
      'Выберите правильную форму глагола после doesn’t.',
    ),
    sentenceTemplate: 'She doesn’t ___ to work by train.',
    blankAnswers: ['go'],
    options: ['go', 'goes', 'going', 'gos'],
    answer: 'go',
    answerTranslation: L(
      'doesn’t 뒤에는 go를 사용해요.',
      'doesn’t dan keyin go ishlatiladi.',
      'Use go after doesn’t.',
      'После doesn’t используется go.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'base-form'],
  },

  en_s1u4_n2_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He doesn’t drive to university.',
    audioText: 'He doesn’t drive to university.',
    answerTranslation: L(
      '그는 운전해서 대학교에 가지 않아요.',
      'U universitetga mashina haydab bormaydi.',
      'He doesn’t drive to university.',
      'Он не ездит в университет на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'drive'],
  },

  en_s1u4_n2_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 부정문을 완성하세요.',
      'To‘g‘ri inkor gapni to‘ldiring.',
      'Complete the correct negative sentence.',
      'Дополните правильное отрицательное предложение.',
    ),
    sentenceTemplate: 'He doesn’t ___ to university.',
    blankAnswers: ['drive'],
    options: ['drive', 'drives', 'driving', 'drived'],
    answer: 'drive',
    answerTranslation: L(
      '그는 운전해서 대학교에 가지 않아요.',
      'U universitetga mashina haydab bormaydi.',
      'He doesn’t drive to university.',
      'Он не ездит в университет на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'base-form'],
  },

  en_s1u4_n2_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The bus doesn’t go to my street.',
    audioText: 'The bus doesn’t go to my street.',
    answerTranslation: L(
      '그 버스는 제가 사는 거리로 가지 않아요.',
      'Bu avtobus mening ko‘chamga bormaydi.',
      'The bus doesn’t go to my street.',
      'Этот автобус не идёт на мою улицу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'it'],
  },

  en_s1u4_n2_038_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['The', 'bus', 'doesn’t', 'go', 'to', 'my', 'street', 'goes'],
    answer: 'The bus doesn’t go to my street',
    answerTranslation: L(
      '그 버스는 제가 사는 거리로 가지 않아요.',
      'Bu avtobus mening ko‘chamga bormaydi.',
      'The bus doesn’t go to my street.',
      'Этот автобус не идёт на мою улицу.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'go'],
  },

  en_s1u4_n2_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t like old ferries.',
    audioText: 'I don’t like old ferries.',
    answerTranslation: L(
      '저는 오래된 페리를 좋아하지 않아요.',
      'Men eski paromlarni yoqtirmayman.',
      'I don’t like old ferries.',
      'Я не люблю старые паромы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'like'],
  },

  en_s1u4_n2_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does your sister drive to work?' }],
    options: [
      'She doesn’t drive to work.',
      'She doesn’t drives to work.',
      'She don’t drive to work.',
      'She isn’t drive to work.',
    ],
    answer: 'She doesn’t drive to work.',
    answerTranslation: L(
      '그녀는 운전해서 출근하지 않아요.',
      'U ishga mashina haydab bormaydi.',
      'She doesn’t drive to work.',
      'Она не ездит на работу на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['present-simple-negative', 'base-form'],
  },

  // ===========================================================
  // Lesson 3 · Understanding contractions
  // ===========================================================

  en_s1u4_n2_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do not. Don’t.',
    audioText: 'Do not. Don’t.',
    answerTranslation: L(
      'do not의 축약형은 don’t예요.',
      'do not qisqartmasi don’t.',
      'Don’t is the contraction of do not.',
      'Don’t — сокращение от do not.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'dont'],
  },

  en_s1u4_n2_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'do not의 축약형을 고르세요.',
      'do not qisqartmasini tanlang.',
      'Choose the contraction of do not.',
      'Выберите сокращение от do not.',
    ),
    sentenceTemplate: 'do not → ___',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'hasn’t'],
    answer: 'don’t',
    answerTranslation: L(
      'do not → don’t',
      'do not → don’t',
      'do not → don’t',
      'do not → don’t',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'dont'],
  },

  en_s1u4_n2_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does not. Doesn’t.',
    audioText: 'Does not. Doesn’t.',
    answerTranslation: L(
      'does not의 축약형은 doesn’t예요.',
      'does not qisqartmasi doesn’t.',
      'Doesn’t is the contraction of does not.',
      'Doesn’t — сокращение от does not.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'doesnt'],
  },

  en_s1u4_n2_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'does not의 축약형을 고르세요.',
      'does not qisqartmasini tanlang.',
      'Choose the contraction of does not.',
      'Выберите сокращение от does not.',
    ),
    sentenceTemplate: 'does not → ___',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'hasn’t', 'aren’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      'does not → doesn’t',
      'does not → doesn’t',
      'does not → doesn’t',
      'does not → doesn’t',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'doesnt'],
  },

  en_s1u4_n2_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      "n't 소리에 집중해서 따라 말하세요.",
      "n't tovushiga e’tibor berib takrorlang.",
      "Repeat and listen for the n't ending.",
      "Повторите, обращая внимание на окончание n't.",
    ),
    answer: 'Don’t. Doesn’t. Isn’t. Aren’t. Hasn’t.',
    audioText: 'Don’t. Doesn’t. Isn’t. Aren’t. Hasn’t.',
    answerTranslation: L(
      '이 단어들은 모두 부정 축약형이에요.',
      'Bu so‘zlarning barchasi inkor qisqartmalaridir.',
      'These are all negative contractions.',
      'Это отрицательные сокращённые формы.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'negative'],
  },

  en_s1u4_n2_046_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'don’t', native: 'do not' },
      { korean: 'doesn’t', native: 'does not' },
      { korean: 'isn’t', native: 'is not' },
      { korean: 'aren’t', native: 'are not' },
      { korean: 'hasn’t', native: 'has not' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'negative'],
  },

  en_s1u4_n2_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He’s happy.',
    audioText: 'He’s happy.',
    answerTranslation: L(
      '그는 행복해요.',
      'U xursand.',
      'He’s happy.',
      'Он счастлив.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'positive'],
  },

  en_s1u4_n2_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '긍정 축약형을 고르세요.',
      'Tasdiq qisqartmasini tanlang.',
      'Choose the positive contraction.',
      'Выберите утвердительную сокращённую форму.',
    ),
    sentenceTemplate: '___ happy.',
    blankAnswers: ['He’s'],
    options: ['He’s', 'isn’t', 'doesn’t', 'hasn’t'],
    answer: 'He’s',
    answerTranslation: L(
      'He’s happy.',
      'He’s happy.',
      'He’s happy.',
      'He’s happy.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'positive-negative'],
  },

  en_s1u4_n2_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He isn’t happy.',
    audioText: 'He isn’t happy.',
    answerTranslation: L(
      '그는 행복하지 않아요.',
      'U xursand emas.',
      'He isn’t happy.',
      'Он не счастлив.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'negative'],
  },

  en_s1u4_n2_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'be동사의 부정형을 고르세요.',
      'be fe’lining inkor shaklini tanlang.',
      'Choose the negative form of be.',
      'Выберите отрицательную форму be.',
    ),
    sentenceTemplate: 'That phone ___ cheap.',
    blankAnswers: ['isn’t'],
    options: ['isn’t', 'doesn’t', 'hasn’t', 'don’t'],
    answer: 'isn’t',
    answerTranslation: L(
      '그 휴대전화는 싸지 않아요.',
      'U telefon arzon emas.',
      'That phone isn’t cheap.',
      'Этот телефон не дешёвый.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative-systems', 'be'],
  },

  en_s1u4_n2_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We haven’t got a car.',
    audioText: 'We haven’t got a car.',
    answerTranslation: L(
      '우리는 자동차가 없어요.',
      'Bizning mashinamiz yo‘q.',
      'We haven’t got a car.',
      'У нас нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative-systems', 'have-got'],
  },

  en_s1u4_n2_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'have got의 부정형을 고르세요.',
      'have got inkor shaklini tanlang.',
      'Choose the negative form of have got.',
      'Выберите отрицательную форму have got.',
    ),
    sentenceTemplate: 'We ___ got a car.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'don’t', 'aren’t', 'doesn’t'],
    answer: 'haven’t',
    answerTranslation: L(
      '우리는 자동차가 없어요.',
      'Bizning mashinamiz yo‘q.',
      'We haven’t got a car.',
      'У нас нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative-systems', 'have-got'],
  },

  en_s1u4_n2_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He doesn’t live here.',
    audioText: 'He doesn’t live here.',
    answerTranslation: L(
      '그는 여기에 살지 않아요.',
      'U bu yerda yashamaydi.',
      'He doesn’t live here.',
      'Он здесь не живёт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative-systems', 'other-verbs'],
  },

  en_s1u4_n2_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '일반동사의 현재시제 부정형을 고르세요.',
      'Oddiy fe’lning present simple inkor shaklini tanlang.',
      'Choose the present simple negative for an ordinary verb.',
      'Выберите отрицательную форму Present Simple обычного глагола.',
    ),
    sentenceTemplate: 'He ___ live here.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'isn’t', 'hasn’t', 'aren’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      '그는 여기에 살지 않아요.',
      'U bu yerda yashamaydi.',
      'He doesn’t live here.',
      'Он здесь не живёт.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['negative-systems', 'other-verbs'],
  },

  en_s1u4_n2_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My parents aren’t old.',
    audioText: 'My parents aren’t old.',
    answerTranslation: L(
      '제 부모님은 나이가 많지 않아요.',
      'Ota-onam keksa emas.',
      'My parents aren’t old.',
      'Мои родители не пожилые.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['negative-systems', 'be'],
  },

  en_s1u4_n2_056_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: L(
      '문장을 부정 형태와 연결하세요.',
      'Gapni inkor turi bilan ulang.',
      'Match each sentence to its negative pattern.',
      'Соедините предложение с типом отрицания.',
    ),
    pairs: [
      { korean: 'That phone isn’t cheap.', native: 'be' },
      { korean: 'My parents aren’t old.', native: 'be' },
      { korean: 'We haven’t got a car.', native: 'have got' },
      { korean: 'He hasn’t got a job.', native: 'have got' },
      { korean: 'He doesn’t live here.', native: 'other verb' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['negative-systems', 'listening'],
  },

  en_s1u4_n2_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '긍정문과 부정문의 차이를 분명하게 말하세요.',
      'Tasdiq va inkor gap farqini aniq ayting.',
      'Say the positive and negative forms clearly.',
      'Чётко произнесите утвердительную и отрицательную формы.',
    ),
    answer: 'I drive to work. I don’t drive to work.',
    audioText: 'I drive to work. I don’t drive to work.',
    answerTranslation: L(
      '저는 운전해서 출근해요. 저는 운전해서 출근하지 않아요.',
      'Men ishga mashinada boraman. Men ishga mashinada bormayman.',
      'I drive to work. I don’t drive to work.',
      'Я езжу на работу на машине. Я не езжу на работу на машине.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['positive-negative', 'listening'],
  },

  en_s1u4_n2_058_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'She doesn’t go to work by bus.',
    audioText: 'She doesn’t go to work by bus.',
    answerI18n: L(
      '그녀는 버스로 출근하지 않아요',
      'U ishga avtobusda bormaydi',
      'She does not go to work by bus',
      'Она не ездит на работу на автобусе',
    ),
    options: ['She', 'doesn’t', 'go', 'to', 'work', 'by', 'bus', 'goes'],
    optionsI18n: {
      ko: ['그녀는', '버스로', '출근하지', '않아요'],
      uz: ['U', 'ishga', 'avtobusda', 'bormaydi'],
      en: ['She', 'does', 'not', 'go', 'to', 'work', 'by', 'bus'],
      ru: ['Она', 'не', 'ездит', 'на', 'работу', 'на', 'автобусе'],
    },
    answerTranslation: L(
      '그녀는 버스로 출근하지 않아요.',
      'U ishga avtobusda bormaydi.',
      'She doesn’t go to work by bus.',
      'Она не ездит на работу на автобусе.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'sentence-builder'],
  },

  en_s1u4_n2_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’ve got bicycles, but they don’t drive.',
    audioText: 'They’ve got bicycles, but they don’t drive.',
    answerTranslation: L(
      '그들은 자전거가 있지만 운전하지 않아요.',
      'Ularning velosipedlari bor, lekin ular mashina haydamaydi.',
      'They’ve got bicycles, but they don’t drive.',
      'У них есть велосипеды, но они не ездят на машине.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'positive-negative'],
  },

  en_s1u4_n2_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '들은 내용의 긍정/부정 의미와 맞는 답을 고르세요.',
      'Eshitilgan gapning tasdiq yoki inkor ma’nosiga mos javobni tanlang.',
      'Choose the answer that matches the positive or negative meaning.',
      'Выберите ответ, соответствующий утвердительному или отрицательному значению.',
    ),
    dialogLines: [{ speaker: 'npc', text: 'Maya doesn’t drive to work.' }],
    options: [
      'She does not drive to work.',
      'She drives to work.',
      'She has got a car at work.',
      'She is at work.',
    ],
    answer: 'She does not drive to work.',
    answerTranslation: L(
      '그녀는 운전해서 출근하지 않아요.',
      'U ishga mashina haydab bormaydi.',
      'She does not drive to work.',
      'Она не ездит на работу на машине.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['contractions', 'meaning'],
  },

  // ===========================================================
  // Lesson 4 · Talking about journeys
  // ===========================================================

  en_s1u4_n2_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t drive to work. I go by train.',
    audioText: 'I don’t drive to work. I go by train.',
    answerTranslation: L(
      '저는 운전해서 출근하지 않아요. 기차로 가요.',
      'Men ishga mashina haydab bormayman. Poyezdda boraman.',
      'I don’t drive to work. I go by train.',
      'Я не езжу на работу на машине. Я езжу на поезде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'positive-negative'],
  },

  en_s1u4_n2_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'How do you go to work?',
    options: ['I', 'go', 'by', 'train', 'drive', 'doesn’t', 'bus'],
    answer: 'I go by train',
    answerTranslation: L(
      '저는 기차로 가요.',
      'Men poyezdda boraman.',
      'I go by train.',
      'Я езжу на поезде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'train'],
  },

  en_s1u4_n2_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My office is near my home, so I walk to work.',
    audioText: 'My office is near my home, so I walk to work.',
    answerTranslation: L(
      '제 사무실은 집 근처에 있어서 걸어서 출근해요.',
      'Ofisim uyimga yaqin, shuning uchun ishga piyoda boraman.',
      'My office is near my home, so I walk to work.',
      'Мой офис рядом с домом, поэтому я хожу на работу пешком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'walk'],
  },

  en_s1u4_n2_064_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My office is near my home, so I ___ to work.',
    blankAnswers: ['walk'],
    options: ['walk', 'bus', 'ferry', 'train'],
    answer: 'walk',
    answerTranslation: L(
      '사무실이 집 근처라 걸어서 출근해요.',
      'Ofisim uyimga yaqin, shuning uchun piyoda boraman.',
      'My office is near my home, so I walk to work.',
      'Офис рядом с домом, поэтому я хожу на работу пешком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'walk'],
  },

  en_s1u4_n2_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My sister doesn’t walk to university. She cycles.',
    audioText: 'My sister doesn’t walk to university. She cycles.',
    answerTranslation: L(
      '제 여자 형제는 대학교에 걸어가지 않아요. 자전거로 가요.',
      'Opam yoki singlim universitetga piyoda bormaydi. U velosipedda boradi.',
      'My sister doesn’t walk to university. She cycles.',
      'Моя сестра не ходит в университет пешком. Она ездит на велосипеде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'third-person'],
  },

  en_s1u4_n2_066_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'My',
      'sister',
      'doesn’t',
      'walk',
      'to',
      'university',
      'cycles',
      'drive',
    ],
    answer: 'My sister doesn’t walk to university',
    answerTranslation: L(
      '제 여자 형제는 대학교에 걸어가지 않아요.',
      'Opam yoki singlim universitetga piyoda bormaydi.',
      'My sister doesn’t walk to university.',
      'Моя сестра не ходит в университет пешком.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'negative'],
  },

  en_s1u4_n2_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'He doesn’t go by bus. He drives.',
    audioText: 'He doesn’t go by bus. He drives.',
    answerTranslation: L(
      '그는 버스로 가지 않아요. 운전해서 가요.',
      'U avtobusda bormaydi. Mashina haydaydi.',
      'He doesn’t go by bus. He drives.',
      'Он не ездит на автобусе. Он ездит на машине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'contrast'],
  },

  en_s1u4_n2_068_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does Leo go to work by bus?' },
      { speaker: 'user', text: 'No.' },
    ],
    options: [
      'He doesn’t go by bus. He drives.',
      'He doesn’t goes by bus. He drive.',
      'He don’t go by bus. He drives.',
      'He isn’t go by bus. He drives.',
    ],
    answer: 'He doesn’t go by bus. He drives.',
    answerTranslation: L(
      '그는 버스로 가지 않아요. 운전해서 가요.',
      'U avtobusda bormaydi. Mashina haydaydi.',
      'He doesn’t go by bus. He drives.',
      'Он не ездит на автобусе. Он ездит на машине.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'third-person'],
  },

  en_s1u4_n2_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The journey is fifteen minutes.',
    audioText: 'The journey is fifteen minutes.',
    answerTranslation: L(
      '이동 시간은 15분이에요.',
      'Yo‘l o‘n besh daqiqa.',
      'The journey is fifteen minutes.',
      'Поездка занимает пятнадцать минут.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['journeys', 'time'],
  },

  en_s1u4_n2_070_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'five minutes', native: 'besh daqiqa' },
      { korean: 'fifteen minutes', native: 'o‘n besh daqiqa' },
      { korean: 'seventeen kilometres', native: 'o‘n yetti kilometr' },
      { korean: 'seventy kilometres', native: 'yetmish kilometr' },
      { korean: 'by train', native: 'poyezdda' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['journeys', 'listening-detail'],
  },

  en_s1u4_n2_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t live near my work.',
    audioText: 'I don’t live near my work.',
    answerTranslation: L(
      '저는 직장 근처에 살지 않아요.',
      'Men ish joyim yaqinida yashamayman.',
      'I don’t live near my work.',
      'Я не живу рядом с работой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'negative'],
  },

  en_s1u4_n2_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ live near my work.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'isn’t', 'haven’t'],
    answer: 'don’t',
    answerTranslation: L(
      '저는 직장 근처에 살지 않아요.',
      'Men ish joyim yaqinida yashamayman.',
      'I don’t live near my work.',
      'Я не живу рядом с работой.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['journeys', 'dont'],
  },

  en_s1u4_n2_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t go by motorbike. I go by bus.',
    audioText: 'I don’t go by motorbike. I go by bus.',
    answerTranslation: L(
      '저는 오토바이로 가지 않아요. 버스로 가요.',
      'Men mototsiklda bormayman. Avtobusda boraman.',
      'I don’t go by motorbike. I go by bus.',
      'Я не езжу на мотоцикле. Я езжу на автобусе.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'contrast'],
  },

  en_s1u4_n2_074_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'don’t', 'go', 'by', 'motorbike', 'bus', 'goes'],
    answer: 'I don’t go by motorbike',
    audioText: 'I don’t go by motorbike.',
    answerTranslation: L(
      '저는 오토바이로 가지 않아요.',
      'Men mototsiklda bormayman.',
      'I don’t go by motorbike.',
      'Я не езжу на мотоцикле.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['journeys', 'negative'],
  },

  en_s1u4_n2_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friend lives near the university.',
    audioText: 'My friend lives near the university.',
    answerTranslation: L(
      '제 친구는 대학교 근처에 살아요.',
      'Do‘stim universitet yaqinida yashaydi.',
      'My friend lives near the university.',
      'Мой друг живёт рядом с университетом.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'third-person'],
  },

  en_s1u4_n2_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My friend ___ drive to university.',
    blankAnswers: ['doesn’t'],
    options: ['doesn’t', 'don’t', 'isn’t', 'haven’t'],
    answer: 'doesn’t',
    answerTranslation: L(
      '제 친구는 운전해서 대학교에 가지 않아요.',
      'Do‘stim universitetga mashina haydab bormaydi.',
      'My friend doesn’t drive to university.',
      'Мой друг не ездит в университет на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['journeys', 'third-person'],
  },

  en_s1u4_n2_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She cycles to university every morning.',
    audioText: 'She cycles to university every morning.',
    answerTranslation: L(
      '그녀는 매일 아침 자전거로 대학교에 가요.',
      'U har kuni ertalab universitetga velosipedda boradi.',
      'She cycles to university every morning.',
      'Она каждое утро ездит в университет на велосипеде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'cycle'],
  },

  en_s1u4_n2_078_sentence_builder: {
    type: 'sentence_builder',
    level: LV,
    instruction: SENTENCE_BUILDER_INSTRUCTION,
    answer: 'He doesn’t walk to work.',
    audioText: 'He doesn’t walk to work.',
    answerI18n: L(
      '그는 걸어서 출근하지 않아요',
      'U ishga piyoda bormaydi',
      'He does not walk to work',
      'Он не ходит на работу пешком',
    ),
    options: ['He', 'doesn’t', 'walk', 'to', 'work', 'walks', 'don’t'],
    optionsI18n: {
      ko: ['그는', '걸어서', '출근하지', '않아요'],
      uz: ['U', 'ishga', 'piyoda', 'bormaydi'],
      en: ['He', 'does', 'not', 'walk', 'to', 'work'],
      ru: ['Он', 'не', 'ходит', 'на', 'работу', 'пешком'],
    },
    answerTranslation: L(
      '그는 걸어서 출근하지 않아요.',
      'U ishga piyoda bormaydi.',
      'He doesn’t walk to work.',
      'Он не ходит на работу пешком.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['journeys', 'sentence-builder'],
  },

  en_s1u4_n2_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I live near the centre. I don’t drive to work. I go by train, and the journey is fifteen minutes.',
    audioText:
      'I live near the centre. I don’t drive to work. I go by train, and the journey is fifteen minutes.',
    answerTranslation: L(
      '저는 도심 근처에 살아요. 운전해서 출근하지 않고 기차로 가요. 이동 시간은 15분이에요.',
      'Men markaz yaqinida yashayman. Ishga mashina haydab bormayman. Poyezdda boraman va yo‘l o‘n besh daqiqa.',
      'I live near the centre. I don’t drive to work. I go by train, and the journey is fifteen minutes.',
      'Я живу рядом с центром. Я не езжу на работу на машине, а езжу на поезде. Поездка занимает пятнадцать минут.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'complete-description'],
  },

  en_s1u4_n2_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Tell me about your friend’s journey to work.' },
      { speaker: 'user', text: 'She lives near the city centre.' },
      { speaker: 'npc', text: 'Does she drive?' },
    ],
    options: [
      'No, she doesn’t. She cycles to work.',
      'No, she don’t. She cycle to work.',
      'No, she isn’t. She cycles work.',
      'No, she hasn’t. She by cycle.',
    ],
    answer: 'No, she doesn’t. She cycles to work.',
    answerTranslation: L(
      '아니요. 운전하지 않고 자전거로 출근해요.',
      'Yo‘q. U mashina haydamaydi. Ishga velosipedda boradi.',
      'No, she doesn’t. She cycles to work.',
      'Нет. Она не ездит на машине. Она ездит на работу на велосипеде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['journeys', 'third-person', 'final'],
  },
};

export const EN_S1_UNIT4_NODE2 = {
  title: L('이동과 교통', 'Yo‘l va transport', 'Journeys', 'Поездки'),
  section: 1,
  unit: 4,
  order: 2,
  isActive: true,

  lessons: [
    {
      title: L('어떻게 이동해요?', 'Qanday borasiz?', 'Transport', 'Транспорт'),
      description: L(
        'bus, ferry, motorbike, train과 cycle, drive, walk를 익히고 go by train, walk to work 같은 이동 표현을 사용해요.',
        'bus, ferry, motorbike, train hamda cycle, drive va walk so‘zlarini o‘rganib, go by train va walk to work kabi iboralarni ishlatasiz.',
        'Learn common transport nouns and verbs and use phrases such as go by train, drive to work and walk to school.',
        'Учимся называть транспорт и использовать выражения go by train, drive to work и walk to school.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u4_n2_001_speaking',
        'en_s1u4_n2_002_word_matching',
        'en_s1u4_n2_003_speaking',
        'en_s1u4_n2_004_fill_in_blank',
        'en_s1u4_n2_005_speaking',
        'en_s1u4_n2_006_fill_in_blank',
        'en_s1u4_n2_007_speaking',
        'en_s1u4_n2_008_audio_match',
        'en_s1u4_n2_009_speaking',
        'en_s1u4_n2_010_fill_in_blank',
        'en_s1u4_n2_011_speaking',
        'en_s1u4_n2_012_fill_in_blank',
        'en_s1u4_n2_013_speaking',
        'en_s1u4_n2_014_fill_in_blank',
        'en_s1u4_n2_015_speaking',
        'en_s1u4_n2_016_translate_builder',
        'en_s1u4_n2_017_speaking',
        'en_s1u4_n2_018_word_arrange',
        'en_s1u4_n2_019_speaking',
        'en_s1u4_n2_020_dialog_complete',
      ],
    },

    {
      title: L(
        '하지 않는 일 말하기',
        'Qilmaydigan ishlar',
        'Present simple negative',
        'Present Simple: отрицательная форма',
      ),
      description: L(
        'I/you/we/they에는 don’t, he/she/it에는 doesn’t를 사용하고 그 뒤에는 항상 동사원형을 사용해요.',
        'I/you/we/they bilan don’t, he/she/it bilan doesn’t ishlatib, undan keyin fe’lning asosiy shaklini qo‘llasiz.',
        'Use don’t with I, you, we and they, and doesn’t with he, she and it, followed by the base verb.',
        'Используем don’t с I, you, we, they и doesn’t с he, she, it, после которых ставится начальная форма глагола.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u4_n2_021_speaking',
        'en_s1u4_n2_022_fill_in_blank',
        'en_s1u4_n2_023_speaking',
        'en_s1u4_n2_024_fill_in_blank',
        'en_s1u4_n2_025_speaking',
        'en_s1u4_n2_026_fill_in_blank',
        'en_s1u4_n2_027_speaking',
        'en_s1u4_n2_028_fill_in_blank',
        'en_s1u4_n2_029_speaking',
        'en_s1u4_n2_030_fill_in_blank',
        'en_s1u4_n2_031_speaking',
        'en_s1u4_n2_032_word_arrange',
        'en_s1u4_n2_033_speaking',
        'en_s1u4_n2_034_fill_in_blank',
        'en_s1u4_n2_035_speaking',
        'en_s1u4_n2_036_fill_in_blank',
        'en_s1u4_n2_037_speaking',
        'en_s1u4_n2_038_translate_builder',
        'en_s1u4_n2_039_speaking',
        'en_s1u4_n2_040_dialog_complete',
      ],
    },

    {
      title: L(
        '부정 축약형 알아듣기',
        'Inkor qisqartmalarini tushunish',
        'Understanding contractions',
        'Понимаем сокращения',
      ),
      description: L(
        "don't, doesn't, isn't, aren't, hasn't처럼 n't로 끝나는 부정 축약형을 듣고, be·have got·일반동사의 서로 다른 부정 구조를 구별해요.",
        "don't, doesn't, isn't, aren't va hasn't kabi n't bilan tugaydigan inkor qisqartmalarini tinglab, be, have got va oddiy fe’llarning inkor shakllarini farqlaysiz.",
        "Listen for negative contractions ending in n't and distinguish negatives with be, have got and ordinary present-simple verbs.",
        "Учимся слышать сокращения с n't и различать отрицания с be, have got и обычными глаголами.",
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 3,
      questions: [
        'en_s1u4_n2_041_speaking',
        'en_s1u4_n2_042_fill_in_blank',
        'en_s1u4_n2_043_speaking',
        'en_s1u4_n2_044_fill_in_blank',
        'en_s1u4_n2_045_speaking',
        'en_s1u4_n2_046_audio_match',
        'en_s1u4_n2_047_speaking',
        'en_s1u4_n2_048_fill_in_blank',
        'en_s1u4_n2_049_speaking',
        'en_s1u4_n2_050_fill_in_blank',
        'en_s1u4_n2_051_speaking',
        'en_s1u4_n2_052_fill_in_blank',
        'en_s1u4_n2_053_speaking',
        'en_s1u4_n2_054_fill_in_blank',
        'en_s1u4_n2_055_speaking',
        'en_s1u4_n2_056_audio_match',
        'en_s1u4_n2_057_speaking',
        'en_s1u4_n2_058_sentence_builder',
        'en_s1u4_n2_059_speaking',
        'en_s1u4_n2_060_dialog_complete',
      ],
    },

    {
      title: L(
        '내 이동 방법 말하기',
        'Yo‘lim haqida gapirish',
        'Talking about journeys',
        'Рассказываем о поездках',
      ),
      description: L(
        '어떻게 출근·등교하는지, 어떤 교통수단을 사용하지 않는지, 이동 시간이 얼마나 걸리는지 말하고 다른 사람의 이동 방법도 설명해요.',
        'Ishga yoki o‘qishga qanday borishingiz, qaysi transportdan foydalanmasligingiz va yo‘l qancha vaqt olishini aytasiz hamda boshqa odamning yo‘lini tasvirlaysiz.',
        'Talk about how you travel to work or study, what transport you do not use and how long the journey takes, then describe another person’s journey.',
        'Рассказываем, как добираемся на работу или учёбу, каким транспортом не пользуемся и сколько занимает дорога.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u4_n2_061_speaking',
        'en_s1u4_n2_062_reply_builder',
        'en_s1u4_n2_063_speaking',
        'en_s1u4_n2_064_fill_in_blank',
        'en_s1u4_n2_065_speaking',
        'en_s1u4_n2_066_translate_builder',
        'en_s1u4_n2_067_speaking',
        'en_s1u4_n2_068_dialog_complete',
        'en_s1u4_n2_069_speaking',
        'en_s1u4_n2_070_audio_match',
        'en_s1u4_n2_071_speaking',
        'en_s1u4_n2_072_fill_in_blank',
        'en_s1u4_n2_073_speaking',
        'en_s1u4_n2_074_word_arrange',
        'en_s1u4_n2_075_speaking',
        'en_s1u4_n2_076_fill_in_blank',
        'en_s1u4_n2_077_speaking',
        'en_s1u4_n2_078_sentence_builder',
        'en_s1u4_n2_079_speaking',
        'en_s1u4_n2_080_dialog_complete',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 4 · Node 3
// 4.3 My day
//
// LessonCategory:
// VOCABULARY / GRAMMAR / EXPRESSION / CONVERSATION / LISTENING / TOPIK
//
// Coverage
// - days:
//   Monday / Tuesday / Wednesday / Thursday
//   Friday / Saturday / Sunday
//
// - daily activities:
//   get up
//   have a shower
//   get dressed
//   check emails
//   have breakfast
//   go to work
//   start work
//   finish work
//   get home
//   have dinner
//   go out
//   go to bed
//
// - useful phrase groups:
//   go to work / school / university
//   go out with friends
//   go to bed
//   have breakfast / lunch / dinner
//   have a shower / bath
//   have a coffee
//   get home
//   get up
//
// - present simple yes/no questions:
//   Do + I/you/we/they + base verb?
//   Does + he/she/it + base verb?
//
// - short answers:
//   Yes, I/you/we/they do.
//   No, I/you/we/they don't.
//   Yes, he/she/it does.
//   No, he/she/it doesn't.
//
// - IMPORTANT:
//   Does she go ...?
//   NOT Does she goes ...?
//
// - pronunciation:
//   stress in present simple yes/no questions and answers
//
// - talk about your day
// - ask about another person's day
// - compare two routines
//
// 4 lessons × 20 questions = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT4_NODE3_WORDS = [
  {
    code: 'en-day-monday',
    english: 'Monday',
    senseKey: 'day-of-week-1',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('월요일', 'dushanba', 'the day after Sunday', 'понедельник'),
    examples: [
      {
        english: 'I work on Monday.',
        translations: L(
          '저는 월요일에 일해요.',
          'Men dushanba kuni ishlayman.',
          'I work on Monday.',
          'Я работаю в понедельник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈmʌndeɪ/',
      ttsText: 'Monday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '월요일 달력',
        'dushanba taqvimi',
        'Monday on a calendar',
        'понедельник в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-day-tuesday',
    english: 'Tuesday',
    senseKey: 'day-of-week-2',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('화요일', 'seshanba', 'the day after Monday', 'вторник'),
    examples: [
      {
        english: 'She studies on Tuesday.',
        translations: L(
          '그녀는 화요일에 공부해요.',
          'U seshanba kuni o‘qiydi.',
          'She studies on Tuesday.',
          'Она учится во вторник.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtjuːzdeɪ/',
      ttsText: 'Tuesday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '화요일 달력',
        'seshanba taqvimi',
        'Tuesday on a calendar',
        'вторник в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-day-wednesday',
    english: 'Wednesday',
    senseKey: 'day-of-week-3',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('수요일', 'chorshanba', 'the day after Tuesday', 'среда'),
    examples: [
      {
        english: 'We go out on Wednesday.',
        translations: L(
          '우리는 수요일에 외출해요.',
          'Biz chorshanba kuni tashqariga chiqamiz.',
          'We go out on Wednesday.',
          'Мы выходим куда-нибудь в среду.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈwenzdeɪ/',
      ttsText: 'Wednesday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '수요일 달력',
        'chorshanba taqvimi',
        'Wednesday on a calendar',
        'среда в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-day-thursday',
    english: 'Thursday',
    senseKey: 'day-of-week-4',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('목요일', 'payshanba', 'the day after Wednesday', 'четверг'),
    examples: [
      {
        english: 'He finishes work early on Thursday.',
        translations: L(
          '그는 목요일에 일을 일찍 끝내요.',
          'U payshanba kuni ishni erta tugatadi.',
          'He finishes work early on Thursday.',
          'Он рано заканчивает работу в четверг.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈθɜːzdeɪ/',
      ttsText: 'Thursday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '목요일 달력',
        'payshanba taqvimi',
        'Thursday on a calendar',
        'четверг в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-day-friday',
    english: 'Friday',
    senseKey: 'day-of-week-5',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('금요일', 'juma', 'the day after Thursday', 'пятница'),
    examples: [
      {
        english: 'We go out on Friday.',
        translations: L(
          '우리는 금요일에 외출해요.',
          'Biz juma kuni tashqariga chiqamiz.',
          'We go out on Friday.',
          'Мы куда-нибудь выходим в пятницу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfraɪdeɪ/',
      ttsText: 'Friday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '금요일 달력',
        'juma taqvimi',
        'Friday on a calendar',
        'пятница в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-day-saturday',
    english: 'Saturday',
    senseKey: 'day-of-week-6',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('토요일', 'shanba', 'the day after Friday', 'суббота'),
    examples: [
      {
        english: 'I don’t work on Saturday.',
        translations: L(
          '저는 토요일에 일하지 않아요.',
          'Men shanba kuni ishlamayman.',
          'I don’t work on Saturday.',
          'Я не работаю в субботу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsætədeɪ/',
      ttsText: 'Saturday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '토요일 달력',
        'shanba taqvimi',
        'Saturday on a calendar',
        'суббота в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-day-sunday',
    english: 'Sunday',
    senseKey: 'day-of-week-7',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('일요일', 'yakshanba', 'the day after Saturday', 'воскресенье'),
    examples: [
      {
        english: 'My family has dinner together on Sunday.',
        translations: L(
          '우리 가족은 일요일에 함께 저녁을 먹어요.',
          'Oilamiz yakshanba kuni birga kechki ovqat qiladi.',
          'My family has dinner together on Sunday.',
          'Моя семья ужинает вместе в воскресенье.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈsʌndeɪ/',
      ttsText: 'Sunday',
    },
    media: {
      emoji: '📅',
      imageUrl: '',
      imageAlt: L(
        '일요일 달력',
        'yakshanba taqvimi',
        'Sunday on a calendar',
        'воскресенье в календаре',
      ),
    },
    tags: ['days', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-get-up',
    english: 'get up',
    senseKey: 'leave-bed',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '일어나다',
      'uyg‘onib turmoq',
      'to leave your bed after sleeping',
      'вставать',
    ),
    examples: [
      {
        english: 'I get up at seven.',
        translations: L(
          '저는 7시에 일어나요.',
          'Men soat yettida turaman.',
          'I get up at seven.',
          'Я встаю в семь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡet ˈʌp/',
      ttsText: 'get up',
    },
    media: {
      emoji: '⏰',
      imageUrl: '',
      imageAlt: L(
        '침대에서 일어나는 사람',
        'o‘rnidan turgan odam',
        'a person getting up',
        'человек встаёт',
      ),
    },
    tags: ['daily-activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-have-shower',
    english: 'have a shower',
    senseKey: 'wash-in-shower',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '샤워하다',
      'dush qabul qilmoq',
      'to wash yourself in a shower',
      'принимать душ',
    ),
    examples: [
      {
        english: 'I have a shower in the morning.',
        translations: L(
          '저는 아침에 샤워해요.',
          'Men ertalab dush qabul qilaman.',
          'I have a shower in the morning.',
          'Я принимаю душ утром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hæv ə ˈʃaʊə/',
      ttsText: 'have a shower',
    },
    media: {
      emoji: '🚿',
      imageUrl: '',
      imageAlt: L('샤워', 'dush', 'a shower', 'душ'),
    },
    tags: ['daily-activities', 'have-phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-get-dressed',
    english: 'get dressed',
    senseKey: 'put-clothes-on',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L('옷을 입다', 'kiyinmoq', 'to put your clothes on', 'одеваться'),
    examples: [
      {
        english: 'She gets dressed after her shower.',
        translations: L(
          '그녀는 샤워 후 옷을 입어요.',
          'U dushdan keyin kiyinadi.',
          'She gets dressed after her shower.',
          'Она одевается после душа.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡet ˈdrest/',
      ttsText: 'get dressed',
    },
    media: {
      emoji: '👕',
      imageUrl: '',
      imageAlt: L(
        '옷을 입는 사람',
        'kiyinayotgan odam',
        'a person getting dressed',
        'человек одевается',
      ),
    },
    tags: ['daily-activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-check-emails',
    english: 'check emails',
    senseKey: 'read-email-messages',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '이메일을 확인하다',
      'elektron pochtani tekshirmoq',
      'to look at your email messages',
      'проверять электронную почту',
    ),
    examples: [
      {
        english: 'He checks emails in the morning.',
        translations: L(
          '그는 아침에 이메일을 확인해요.',
          'U ertalab elektron pochtasini tekshiradi.',
          'He checks emails in the morning.',
          'Он проверяет почту утром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/tʃek ˈiːmeɪlz/',
      ttsText: 'check emails',
    },
    media: {
      emoji: '📧',
      imageUrl: '',
      imageAlt: L(
        '이메일 확인',
        'elektron pochtani tekshirish',
        'checking emails',
        'проверка почты',
      ),
    },
    tags: ['daily-activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-have-breakfast',
    english: 'have breakfast',
    senseKey: 'eat-morning-meal',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '아침을 먹다',
      'nonushta qilmoq',
      'to eat the morning meal',
      'завтракать',
    ),
    examples: [
      {
        english: 'We have breakfast at home.',
        translations: L(
          '우리는 집에서 아침을 먹어요.',
          'Biz uyda nonushta qilamiz.',
          'We have breakfast at home.',
          'Мы завтракаем дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hæv ˈbrekfəst/',
      ttsText: 'have breakfast',
    },
    media: {
      emoji: '🥣',
      imageUrl: '',
      imageAlt: L('아침 식사', 'nonushta', 'breakfast', 'завтрак'),
    },
    tags: ['daily-activities', 'have-phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-start-work',
    english: 'start work',
    senseKey: 'begin-working',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '일을 시작하다',
      'ishni boshlamoq',
      'to begin your working day',
      'начинать работу',
    ),
    examples: [
      {
        english: 'I start work at eight.',
        translations: L(
          '저는 8시에 일을 시작해요.',
          'Men ishni soat sakkizda boshlayman.',
          'I start work at eight.',
          'Я начинаю работу в восемь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/stɑːt ˈwɜːk/',
      ttsText: 'start work',
    },
    media: {
      emoji: '💼',
      imageUrl: '',
      imageAlt: L(
        '업무 시작',
        'ish boshlanishi',
        'starting work',
        'начало работы',
      ),
    },
    tags: ['daily-activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-finish-work',
    english: 'finish work',
    senseKey: 'stop-working',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '일을 끝내다',
      'ishni tugatmoq',
      'to end your working day',
      'заканчивать работу',
    ),
    examples: [
      {
        english: 'She finishes work at six.',
        translations: L(
          '그녀는 6시에 일을 끝내요.',
          'U ishni soat oltida tugatadi.',
          'She finishes work at six.',
          'Она заканчивает работу в шесть.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɪnɪʃ wɜːk/',
      ttsText: 'finish work',
    },
    media: {
      emoji: '🏁',
      imageUrl: '',
      imageAlt: L(
        '업무 종료',
        'ishning tugashi',
        'finishing work',
        'окончание работы',
      ),
    },
    tags: ['daily-activities'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-get-home',
    english: 'get home',
    senseKey: 'arrive-home',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '집에 도착하다',
      'uyga yetib kelmoq',
      'to arrive at your home',
      'приходить домой',
    ),
    examples: [
      {
        english: 'He gets home at seven.',
        translations: L(
          '그는 7시에 집에 도착해요.',
          'U soat yettida uyga keladi.',
          'He gets home at seven.',
          'Он приходит домой в семь.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡet ˈhəʊm/',
      ttsText: 'get home',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: L('집에 도착', 'uyga kelish', 'arriving home', 'приход домой'),
    },
    tags: ['daily-activities', 'get-phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-have-dinner',
    english: 'have dinner',
    senseKey: 'eat-evening-meal',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '저녁을 먹다',
      'kechki ovqat qilmoq',
      'to eat the evening meal',
      'ужинать',
    ),
    examples: [
      {
        english: 'We have dinner together.',
        translations: L(
          '우리는 함께 저녁을 먹어요.',
          'Biz birga kechki ovqat qilamiz.',
          'We have dinner together.',
          'Мы ужинаем вместе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/hæv ˈdɪnə/',
      ttsText: 'have dinner',
    },
    media: {
      emoji: '🍽️',
      imageUrl: '',
      imageAlt: L('저녁 식사', 'kechki ovqat', 'dinner', 'ужин'),
    },
    tags: ['daily-activities', 'have-phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-go-out',
    english: 'go out',
    senseKey: 'leave-home-for-social-activity',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '외출하다',
      'tashqariga chiqmoq',
      'to leave home to spend time somewhere else',
      'выходить куда-нибудь',
    ),
    examples: [
      {
        english: 'We go out with friends on Friday.',
        translations: L(
          '우리는 금요일에 친구들과 외출해요.',
          'Biz juma kuni do‘stlar bilan tashqariga chiqamiz.',
          'We go out with friends on Friday.',
          'Мы выходим с друзьями в пятницу.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊ ˈaʊt/',
      ttsText: 'go out',
    },
    media: {
      emoji: '🌆',
      imageUrl: '',
      imageAlt: L(
        '친구들과 외출',
        'do‘stlar bilan tashqariga chiqish',
        'going out with friends',
        'выход с друзьями',
      ),
    },
    tags: ['daily-activities', 'go-phrase'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-go-to-bed',
    english: 'go to bed',
    senseKey: 'go-to-sleep',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '잠자리에 들다',
      'uxlashga yotmoq',
      'to go to your bed to sleep',
      'ложиться спать',
    ),
    examples: [
      {
        english: 'I go to bed at eleven.',
        translations: L(
          '저는 11시에 잠자리에 들어요.',
          'Men soat o‘n birda uxlashga yotaman.',
          'I go to bed at eleven.',
          'Я ложусь спать в одиннадцать.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊ tə ˈbed/',
      ttsText: 'go to bed',
    },
    media: {
      emoji: '🛏️',
      imageUrl: '',
      imageAlt: L(
        '잠자리에 들기',
        'uxlashga yotish',
        'going to bed',
        'отход ко сну',
      ),
    },
    tags: ['daily-activities', 'go-phrase'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT4_NODE3_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · Days and daily activities
  // ===========================================================

  en_s1u4_n3_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Monday, Tuesday, Wednesday.',
    audioText: 'Monday, Tuesday, Wednesday.',
    answerTranslation: L(
      '월요일, 화요일, 수요일.',
      'Dushanba, seshanba, chorshanba.',
      'Monday, Tuesday, Wednesday.',
      'Понедельник, вторник, среда.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['days'],
  },

  en_s1u4_n3_002_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'Monday', native: 'dushanba' },
      { korean: 'Tuesday', native: 'seshanba' },
      { korean: 'Wednesday', native: 'chorshanba' },
      { korean: 'Thursday', native: 'payshanba' },
      { korean: 'Friday', native: 'juma' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['days', 'matching'],
  },

  en_s1u4_n3_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thursday, Friday, Saturday, Sunday.',
    audioText: 'Thursday, Friday, Saturday, Sunday.',
    answerTranslation: L(
      '목요일, 금요일, 토요일, 일요일.',
      'Payshanba, juma, shanba, yakshanba.',
      'Thursday, Friday, Saturday, Sunday.',
      'Четверг, пятница, суббота, воскресенье.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['days'],
  },

  en_s1u4_n3_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '요일 순서를 완성하세요.',
      'Hafta kunlari ketma-ketligini to‘ldiring.',
      'Complete the sequence of days.',
      'Дополните последовательность дней недели.',
    ),
    sentenceTemplate: 'Friday, Saturday, ___.',
    blankAnswers: ['Sunday'],
    options: ['Sunday', 'Tuesday', 'Thursday', 'Monday'],
    answer: 'Sunday',
    answerTranslation: L(
      '금요일, 토요일, 일요일.',
      'Juma, shanba, yakshanba.',
      'Friday, Saturday, Sunday.',
      'Пятница, суббота, воскресенье.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['days'],
  },

  en_s1u4_n3_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up at seven.',
    audioText: 'I get up at seven.',
    answerTranslation: L(
      '저는 7시에 일어나요.',
      'Men soat yettida turaman.',
      'I get up at seven.',
      'Я встаю в семь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'get-up'],
  },

  en_s1u4_n3_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ up at seven.',
    blankAnswers: ['get'],
    options: ['get', 'have', 'go', 'start'],
    answer: 'get',
    answerTranslation: L(
      '저는 7시에 일어나요.',
      'Men soat yettida turaman.',
      'I get up at seven.',
      'Я встаю в семь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'get-up'],
  },

  en_s1u4_n3_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I have a shower and get dressed.',
    audioText: 'I have a shower and get dressed.',
    answerTranslation: L(
      '저는 샤워하고 옷을 입어요.',
      'Men dush qabul qilaman va kiyinaman.',
      'I have a shower and get dressed.',
      'Я принимаю душ и одеваюсь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'morning'],
  },

  en_s1u4_n3_008_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: MATCH_INSTRUCTION,
    pairs: [
      { korean: 'get up', native: 'turmoq' },
      { korean: 'have a shower', native: 'dush qabul qilmoq' },
      { korean: 'get dressed', native: 'kiyinmoq' },
      { korean: 'check emails', native: 'elektron pochtani tekshirmoq' },
      { korean: 'have breakfast', native: 'nonushta qilmoq' },
    ],
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'matching'],
  },

  en_s1u4_n3_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I check emails after breakfast.',
    audioText: 'I check emails after breakfast.',
    answerTranslation: L(
      '저는 아침 식사 후 이메일을 확인해요.',
      'Men nonushtadan keyin elektron pochtani tekshiraman.',
      'I check emails after breakfast.',
      'Я проверяю почту после завтрака.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'check-emails'],
  },

  en_s1u4_n3_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ breakfast at home.',
    blankAnswers: ['have'],
    options: ['have', 'get', 'go', 'finish'],
    answer: 'have',
    answerTranslation: L(
      '우리는 집에서 아침을 먹어요.',
      'Biz uyda nonushta qilamiz.',
      'We have breakfast at home.',
      'Мы завтракаем дома.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'have-breakfast'],
  },

  en_s1u4_n3_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I go to work at eight.',
    audioText: 'I go to work at eight.',
    answerTranslation: L(
      '저는 8시에 출근해요.',
      'Men soat sakkizda ishga boraman.',
      'I go to work at eight.',
      'Я иду на работу в восемь.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'go-to-work'],
  },

  en_s1u4_n3_012_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: AUDIO_MATCH_INSTRUCTION,
    pairs: [
      { korean: 'go to work', native: 'ishga bormoq' },
      { korean: 'start work', native: 'ishni boshlamoq' },
      { korean: 'finish work', native: 'ishni tugatmoq' },
      { korean: 'get home', native: 'uyga yetib kelmoq' },
      { korean: 'have dinner', native: 'kechki ovqat qilmoq' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['daily-activities', 'listening'],
  },

  en_s1u4_n3_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She starts work at nine.',
    audioText: 'She starts work at nine.',
    answerTranslation: L(
      '그녀는 9시에 일을 시작해요.',
      'U ishni soat to‘qqizda boshlaydi.',
      'She starts work at nine.',
      'Она начинает работу в девять.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'start-work'],
  },

  en_s1u4_n3_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'He ___ work at six.',
    blankAnswers: ['finishes'],
    options: ['finishes', 'starts', 'gets', 'goes'],
    answer: 'finishes',
    answerTranslation: L(
      '그는 6시에 일을 끝내요.',
      'U ishni soat oltida tugatadi.',
      'He finishes work at six.',
      'Он заканчивает работу в шесть.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'finish-work'],
  },

  en_s1u4_n3_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get home at seven and have dinner.',
    audioText: 'I get home at seven and have dinner.',
    answerTranslation: L(
      '저는 7시에 집에 와서 저녁을 먹어요.',
      'Men soat yettida uyga kelaman va kechki ovqat qilaman.',
      'I get home at seven and have dinner.',
      'Я прихожу домой в семь и ужинаю.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['daily-activities', 'evening'],
  },

  en_s1u4_n3_016_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'get', 'home', 'at', 'seven', 'and', 'have', 'dinner'],
    answer: 'I get home at seven and have dinner',
    answerTranslation: L(
      '저는 7시에 집에 와서 저녁을 먹어요.',
      'Men soat yettida uyga kelaman va kechki ovqat qilaman.',
      'I get home at seven and have dinner.',
      'Я прихожу домой в семь и ужинаю.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['daily-activities', 'evening'],
  },

  en_s1u4_n3_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We go out with friends on Friday.',
    audioText: 'We go out with friends on Friday.',
    answerTranslation: L(
      '우리는 금요일에 친구들과 외출해요.',
      'Biz juma kuni do‘stlar bilan tashqariga chiqamiz.',
      'We go out with friends on Friday.',
      'Мы выходим с друзьями в пятницу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['daily-activities', 'go-out'],
  },

  en_s1u4_n3_018_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I go to ___ at eleven.',
    blankAnswers: ['bed'],
    options: ['bed', 'home', 'dinner', 'emails'],
    answer: 'bed',
    answerTranslation: L(
      '저는 11시에 잠자리에 들어요.',
      'Men soat o‘n birda uxlashga yotaman.',
      'I go to bed at eleven.',
      'Я ложусь спать в одиннадцать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['daily-activities', 'go-to-bed'],
  },

  en_s1u4_n3_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up at seven, have breakfast and go to work at eight.',
    audioText: 'I get up at seven, have breakfast and go to work at eight.',
    answerTranslation: L(
      '저는 7시에 일어나서 아침을 먹고 8시에 출근해요.',
      'Men soat yettida turaman, nonushta qilaman va sakkizda ishga boraman.',
      'I get up at seven, have breakfast and go to work at eight.',
      'Я встаю в семь, завтракаю и иду на работу в восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['daily-activities', 'routine'],
  },

  en_s1u4_n3_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What do you do after work?' }],
    options: [
      'I get home and have dinner.',
      'I have home and get dinner.',
      'I go dinner and have home.',
      'I start home and finish dinner.',
    ],
    answer: 'I get home and have dinner.',
    answerTranslation: L(
      '집에 와서 저녁을 먹어요.',
      'Uyga kelaman va kechki ovqat qilaman.',
      'I get home and have dinner.',
      'Я прихожу домой и ужинаю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['daily-activities', 'routine'],
  },

  // ===========================================================
  // Lesson 2 · Present simple yes/no questions
  // ===========================================================

  en_s1u4_n3_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do you get up early?',
    audioText: 'Do you get up early?',
    answerTranslation: L(
      '일찍 일어나요?',
      'Erta turasizmi?',
      'Do you get up early?',
      'Вы рано встаёте?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s1u4_n3_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you get up early?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Have'],
    answer: 'Do',
    answerTranslation: L(
      '일찍 일어나요?',
      'Erta turasizmi?',
      'Do you get up early?',
      'Вы рано встаёте?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s1u4_n3_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do they work at the weekend?',
    audioText: 'Do they work at the weekend?',
    answerTranslation: L(
      '그들은 주말에 일해요?',
      'Ular dam olish kunlari ishlaydimi?',
      'Do they work at the weekend?',
      'Они работают по выходным?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s1u4_n3_024_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Do', 'they', 'work', 'at', 'the', 'weekend', 'works'],
    answer: 'Do they work at the weekend',
    audioText: 'Do they work at the weekend?',
    answerTranslation: L(
      '그들은 주말에 일해요?',
      'Ular dam olish kunlari ishlaydimi?',
      'Do they work at the weekend?',
      'Они работают по выходным?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s1u4_n3_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does she start work early?',
    audioText: 'Does she start work early?',
    answerTranslation: L(
      '그녀는 일을 일찍 시작해요?',
      'U ishni erta boshlaydimi?',
      'Does she start work early?',
      'Она рано начинает работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'does'],
  },

  en_s1u4_n3_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ she start work early?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Is', 'Has'],
    answer: 'Does',
    answerTranslation: L(
      '그녀는 일을 일찍 시작해요?',
      'U ishni erta boshlaydimi?',
      'Does she start work early?',
      'Она рано начинает работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'does'],
  },

  en_s1u4_n3_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does he go to work by train?',
    audioText: 'Does he go to work by train?',
    answerTranslation: L(
      '그는 기차로 출근해요?',
      'U ishga poyezdda boradimi?',
      'Does he go to work by train?',
      'Он ездит на работу на поезде?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'base-verb'],
  },

  en_s1u4_n3_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Does 뒤에 오는 올바른 동사 형태를 고르세요.',
      'Does dan keyin to‘g‘ri fe’l shaklini tanlang.',
      'Choose the correct verb form after Does.',
      'Выберите правильную форму глагола после Does.',
    ),
    sentenceTemplate: 'Does he ___ to work by train?',
    blankAnswers: ['go'],
    options: ['go', 'goes', 'going', 'gos'],
    answer: 'go',
    answerTranslation: L(
      'Does 뒤에는 동사원형 go를 사용해요.',
      'Does dan keyin fe’lning asosiy shakli go ishlatiladi.',
      'Use the base verb go after Does.',
      'После Does используется начальная форма go.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'base-verb'],
  },

  en_s1u4_n3_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does your sister check emails in the morning?',
    audioText: 'Does your sister check emails in the morning?',
    answerTranslation: L(
      '여자 형제는 아침에 이메일을 확인해요?',
      'Opangiz yoki singlingiz ertalab elektron pochtani tekshiradimi?',
      'Does your sister check emails in the morning?',
      'Ваша сестра проверяет почту утром?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'does'],
  },

  en_s1u4_n3_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 질문을 완성하세요.',
      'To‘g‘ri savolni to‘ldiring.',
      'Complete the correct question.',
      'Дополните правильный вопрос.',
    ),
    sentenceTemplate: 'Does your sister ___ emails?',
    blankAnswers: ['check'],
    options: ['check', 'checks', 'checking', 'checked'],
    answer: 'check',
    answerTranslation: L(
      '여자 형제는 이메일을 확인해요?',
      'Opangiz yoki singlingiz elektron pochtani tekshiradimi?',
      'Does your sister check emails?',
      'Ваша сестра проверяет почту?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'base-verb'],
  },

  en_s1u4_n3_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does your father have breakfast at home?',
    audioText: 'Does your father have breakfast at home?',
    answerTranslation: L(
      '아버지는 집에서 아침을 먹어요?',
      'Otangiz uyda nonushta qiladimi?',
      'Does your father have breakfast at home?',
      'Ваш отец завтракает дома?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'have'],
  },

  en_s1u4_n3_032_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'Does',
      'your',
      'father',
      'have',
      'breakfast',
      'at',
      'home',
      'has',
    ],
    answer: 'Does your father have breakfast at home',
    answerTranslation: L(
      '아버지는 집에서 아침을 먹어요?',
      'Otangiz uyda nonushta qiladimi?',
      'Does your father have breakfast at home?',
      'Ваш отец завтракает дома?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'have'],
  },

  en_s1u4_n3_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do your friends go out on Friday?',
    audioText: 'Do your friends go out on Friday?',
    answerTranslation: L(
      '친구들은 금요일에 외출해요?',
      'Do‘stlaringiz juma kuni tashqariga chiqadimi?',
      'Do your friends go out on Friday?',
      'Ваши друзья куда-нибудь выходят в пятницу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'do'],
  },

  en_s1u4_n3_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your friends go out on Friday?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Is', 'Has'],
    answer: 'Do',
    answerTranslation: L(
      '친구들은 금요일에 외출해요?',
      'Do‘stlaringiz juma kuni tashqariga chiqadimi?',
      'Do your friends go out on Friday?',
      'Ваши друзья куда-нибудь выходят в пятницу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'plural-subject'],
  },

  en_s1u4_n3_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does the shop open on Sunday?',
    audioText: 'Does the shop open on Sunday?',
    answerTranslation: L(
      '그 가게는 일요일에 열어요?',
      'Do‘kon yakshanba kuni ochiladimi?',
      'Does the shop open on Sunday?',
      'Магазин открыт в воскресенье?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'it'],
  },

  en_s1u4_n3_036_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'he/she/it 계열 주어에 맞는 질문 형태를 고르세요.',
      'he/she/it turidagi ega uchun to‘g‘ri savol shaklini tanlang.',
      'Choose the correct question form for a he/she/it subject.',
      'Выберите правильную форму вопроса для he/she/it.',
    ),
    sentenceTemplate: '___ the shop open on Sunday?',
    blankAnswers: ['Does'],
    options: ['Does', 'Do', 'Are', 'Have'],
    answer: 'Does',
    answerTranslation: L(
      '그 가게는 일요일에 열어요?',
      'Do‘kon yakshanba kuni ochiladimi?',
      'Does the shop open on Sunday?',
      'Магазин открыт в воскресенье?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['yes-no-questions', 'does'],
  },

  en_s1u4_n3_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do you have dinner with your family?',
    audioText: 'Do you have dinner with your family?',
    answerTranslation: L(
      '가족과 함께 저녁을 먹어요?',
      'Oilangiz bilan birga kechki ovqat qilasizmi?',
      'Do you have dinner with your family?',
      'Вы ужинаете с семьёй?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions', 'routine'],
  },

  en_s1u4_n3_038_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you have dinner with your family?',
    options: ['Yes', 'I', 'do', 'does', 'have', 'family'],
    answer: 'Yes I do',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, I do.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answers', 'do'],
  },

  en_s1u4_n3_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does your brother go to bed early?',
    audioText: 'Does your brother go to bed early?',
    answerTranslation: L(
      '형제는 일찍 자요?',
      'Akangiz yoki ukangiz erta uxlaydimi?',
      'Does your brother go to bed early?',
      'Ваш брат рано ложится спать?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['yes-no-questions', 'routine'],
  },

  en_s1u4_n3_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does your brother go to bed early?' },
    ],
    options: [
      'No, he doesn’t.',
      'No, he don’t.',
      'No, he isn’t.',
      'No, he hasn’t.',
    ],
    answer: 'No, he doesn’t.',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q.',
      'No, he doesn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answers', 'doesnt'],
  },

  // ===========================================================
  // Lesson 3 · Short answers + stress + phrase groups
  // ===========================================================

  en_s1u4_n3_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, I do.',
    audioText: 'Yes, I do.',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, I do.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'do'],
  },

  en_s1u4_n3_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'Do로 시작한 질문의 긍정 짧은 대답을 완성하세요.',
      'Do bilan boshlangan savolning qisqa tasdiq javobini to‘ldiring.',
      'Complete the positive short answer to a Do question.',
      'Дополните краткий положительный ответ на вопрос с Do.',
    ),
    sentenceTemplate: 'Do you work on Monday? — Yes, I ___.',
    blankAnswers: ['do'],
    options: ['do', 'work', 'does', 'am'],
    answer: 'do',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, I do.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'do'],
  },

  en_s1u4_n3_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, we don’t.',
    audioText: 'No, we don’t.',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q.',
      'No, we don’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'dont'],
  },

  en_s1u4_n3_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you and Mina go out on Monday? — No, we ___.',
    blankAnswers: ['don’t'],
    options: ['don’t', 'doesn’t', 'aren’t', 'haven’t'],
    answer: 'don’t',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q.',
      'No, we don’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'dont'],
  },

  en_s1u4_n3_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, she does.',
    audioText: 'Yes, she does.',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, she does.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'does'],
  },

  en_s1u4_n3_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Does she start work early? — Yes, she ___.',
    blankAnswers: ['does'],
    options: ['does', 'starts', 'do', 'is'],
    answer: 'does',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, she does.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'does'],
  },

  en_s1u4_n3_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, he doesn’t.',
    audioText: 'No, he doesn’t.',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q.',
      'No, he doesn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['short-answers', 'doesnt'],
  },

  en_s1u4_n3_048_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does he have breakfast at home?' }],
    options: [
      'No, he doesn’t.',
      'No, he doesn’t have.',
      'No, he hasn’t.',
      'No, he isn’t.',
    ],
    answer: 'No, he doesn’t.',
    answerTranslation: L(
      '아니요, 그렇지 않아요.',
      'Yo‘q.',
      'No, he doesn’t.',
      'Нет.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answers', 'doesnt'],
  },

  en_s1u4_n3_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '강세가 있는 단어를 분명하게 말하세요.',
      'Urg‘uli so‘zlarni aniq ayting.',
      'Say the stressed words clearly.',
      'Чётко произнесите ударные слова.',
    ),
    answer: 'Do you WORK at the WEEKEND?',
    audioText: 'Do you work at the weekend?',
    answerTranslation: L(
      'WORK와 WEEKEND에 강세를 둬요.',
      'WORK va WEEKEND so‘zlariga urg‘u tushadi.',
      'Stress WORK and WEEKEND.',
      'Ударение падает на WORK и WEEKEND.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'stress'],
  },

  en_s1u4_n3_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '질문에서 강세가 있는 핵심 동사를 고르세요.',
      'Savoldagi urg‘uli asosiy fe’lni tanlang.',
      'Choose the stressed main verb in the question.',
      'Выберите ударный основной глагол в вопросе.',
    ),
    sentenceTemplate: 'Do you ___ at the weekend?',
    blankAnswers: ['WORK'],
    options: ['WORK', 'do', 'you', 'at'],
    answer: 'WORK',
    answerTranslation: L(
      '핵심 동사 work에 강세가 있어요.',
      'Asosiy fe’l work urg‘uli.',
      'The main verb work is stressed.',
      'Основной глагол work находится под ударением.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'stress'],
  },

  en_s1u4_n3_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: L(
      '짧은 대답의 핵심 단어를 분명하게 말하세요.',
      'Qisqa javobdagi asosiy so‘zni aniq ayting.',
      'Say the key word in the short answer clearly.',
      'Чётко произнесите ключевое слово в кратком ответе.',
    ),
    answer: 'Yes, I DO.',
    audioText: 'Yes, I do.',
    answerTranslation: L(
      '짧은 대답에서 do에 강세가 있어요.',
      'Qisqa javobda do urg‘uli.',
      'Do is stressed in the short answer.',
      'В кратком ответе ударение падает на do.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['pronunciation', 'stress'],
  },

  en_s1u4_n3_052_audio_match: {
    type: 'audio_match',
    level: LV,
    instruction: L(
      '질문과 자연스러운 짧은 대답을 연결하세요.',
      'Savolni tabiiy qisqa javob bilan ulang.',
      'Match each question to the natural short answer.',
      'Соедините вопрос с естественным кратким ответом.',
    ),
    pairs: [
      { korean: 'Do you work on Saturday?', native: 'Yes, I do.' },
      { korean: 'Does she get up early?', native: 'No, she doesn’t.' },
      { korean: 'Do they go out on Friday?', native: 'Yes, they do.' },
      { korean: 'Does he drive to work?', native: 'No, he doesn’t.' },
      { korean: 'Do we start at nine?', native: 'Yes, we do.' },
    ],
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['short-answers', 'listening'],
  },

  en_s1u4_n3_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Go to work. Go out. Go to bed.',
    audioText: 'Go to work. Go out. Go to bed.',
    answerTranslation: L(
      '출근하다. 외출하다. 잠자리에 들다.',
      'Ishga bormoq. Tashqariga chiqmoq. Uxlashga yotmoq.',
      'Go to work. Go out. Go to bed.',
      'Идти на работу. Выходить. Ложиться спать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'go'],
  },

  en_s1u4_n3_054_word_matching: {
    type: 'word_matching',
    level: LV,
    instruction: L(
      'go와 함께 쓰이는 표현을 연결하세요.',
      'go bilan ishlatiladigan iboralarni ulang.',
      'Match the phrases with go.',
      'Соедините выражения с go.',
    ),
    pairs: [
      { korean: 'go to work', native: 'ishga bormoq' },
      { korean: 'go to school', native: 'maktabga bormoq' },
      { korean: 'go to university', native: 'universitetga bormoq' },
      { korean: 'go out', native: 'tashqariga chiqmoq' },
      { korean: 'go to bed', native: 'uxlashga yotmoq' },
    ],
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'go'],
  },

  en_s1u4_n3_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have breakfast. Have lunch. Have dinner.',
    audioText: 'Have breakfast. Have lunch. Have dinner.',
    answerTranslation: L(
      '아침을 먹다. 점심을 먹다. 저녁을 먹다.',
      'Nonushta qilmoq. Tushlik qilmoq. Kechki ovqat qilmoq.',
      'Have breakfast. Have lunch. Have dinner.',
      'Завтракать. Обедать. Ужинать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'have'],
  },

  en_s1u4_n3_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'have와 자연스럽게 쓰이는 단어를 고르세요.',
      'have bilan tabiiy ishlatiladigan so‘zni tanlang.',
      'Choose the word that naturally goes with have.',
      'Выберите слово, которое естественно употребляется с have.',
    ),
    sentenceTemplate: 'have ___',
    blankAnswers: ['a shower'],
    options: ['a shower', 'home', 'to bed', 'up'],
    answer: 'a shower',
    answerTranslation: L(
      '샤워하다',
      'dush qabul qilmoq',
      'have a shower',
      'принимать душ',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'have'],
  },

  en_s1u4_n3_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Have a coffee.',
    audioText: 'Have a coffee.',
    answerTranslation: L(
      '커피를 마시다.',
      'qahva ichmoq',
      'Have a coffee.',
      'Выпить кофе.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'have'],
  },

  en_s1u4_n3_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'get과 자연스럽게 쓰이는 표현을 고르세요.',
      'get bilan tabiiy ishlatiladigan iborani tanlang.',
      'Choose the phrase that naturally goes with get.',
      'Выберите выражение, которое естественно употребляется с get.',
    ),
    sentenceTemplate: 'get ___',
    blankAnswers: ['home'],
    options: ['home', 'breakfast', 'to work', 'dinner'],
    answer: 'home',
    answerTranslation: L(
      '집에 도착하다',
      'uyga yetib kelmoq',
      'get home',
      'приходить домой',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'get'],
  },

  en_s1u4_n3_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Get up. Get home.',
    audioText: 'Get up. Get home.',
    answerTranslation: L(
      '일어나다. 집에 도착하다.',
      'Turmoq. Uyga yetib kelmoq.',
      'Get up. Get home.',
      'Вставать. Приходить домой.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['phrase-groups', 'get'],
  },

  en_s1u4_n3_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Do you have coffee in the morning?' },
    ],
    options: ['Yes, I do.', 'Yes, I have.', 'Yes, I coffee.', 'Yes, I am.'],
    answer: 'Yes, I do.',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, I do.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['short-answers', 'have-coffee'],
  },

  // ===========================================================
  // Lesson 4 · Talk about your day
  // ===========================================================

  en_s1u4_n3_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up at six thirty.',
    audioText: 'I get up at six thirty.',
    answerTranslation: L(
      '저는 6시 30분에 일어나요.',
      'Men soat olti yarimda turaman.',
      'I get up at six thirty.',
      'Я встаю в шесть тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'get-up'],
  },

  en_s1u4_n3_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you get up early?',
    options: ['Yes', 'I', 'do', 'at', 'six', 'thirty', 'does'],
    answer: 'Yes I do at six thirty',
    answerTranslation: L(
      '네. 6시 30분에 일어나요.',
      'Ha. Soat olti yarimda turaman.',
      'Yes, I do. At six thirty.',
      'Да. В шесть тридцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'reply-builder'],
  },

  en_s1u4_n3_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I have breakfast at home.',
    audioText: 'I have breakfast at home.',
    answerTranslation: L(
      '저는 집에서 아침을 먹어요.',
      'Men uyda nonushta qilaman.',
      'I have breakfast at home.',
      'Я завтракаю дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'breakfast'],
  },

  en_s1u4_n3_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you have breakfast at home?' }],
    options: [
      'Yes, I do.',
      'Yes, I have breakfast.',
      'Yes, I does.',
      'Yes, I am.',
    ],
    answer: 'Yes, I do.',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, I do.', 'Да.'),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'short-answer'],
  },

  en_s1u4_n3_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I go to work by bus and start work at nine.',
    audioText: 'I go to work by bus and start work at nine.',
    answerTranslation: L(
      '저는 버스로 출근해서 9시에 일을 시작해요.',
      'Men ishga avtobusda boraman va ishni soat to‘qqizda boshlayman.',
      'I go to work by bus and start work at nine.',
      'Я езжу на работу на автобусе и начинаю работу в девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'work'],
  },

  en_s1u4_n3_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I ___ work at nine.',
    blankAnswers: ['start'],
    options: ['start', 'finish', 'get', 'have'],
    answer: 'start',
    answerTranslation: L(
      '저는 9시에 일을 시작해요.',
      'Men ishni soat to‘qqizda boshlayman.',
      'I start work at nine.',
      'Я начинаю работу в девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'start-work'],
  },

  en_s1u4_n3_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I finish work at six and get home at seven.',
    audioText: 'I finish work at six and get home at seven.',
    answerTranslation: L(
      '저는 6시에 일을 끝내고 7시에 집에 와요.',
      'Men ishni soat oltida tugataman va yettida uyga kelaman.',
      'I finish work at six and get home at seven.',
      'Я заканчиваю работу в шесть и прихожу домой в семь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'evening'],
  },

  en_s1u4_n3_068_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'finish', 'work', 'at', 'six', 'and', 'get', 'home'],
    answer: 'I finish work at six and get home',
    answerTranslation: L(
      '저는 6시에 일을 끝내고 집에 와요.',
      'Men ishni soat oltida tugataman va uyga kelaman.',
      'I finish work at six and get home.',
      'Я заканчиваю работу в шесть и прихожу домой.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'builder'],
  },

  en_s1u4_n3_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I have dinner with my family.',
    audioText: 'I have dinner with my family.',
    answerTranslation: L(
      '저는 가족과 함께 저녁을 먹어요.',
      'Men oilam bilan birga kechki ovqat qilaman.',
      'I have dinner with my family.',
      'Я ужинаю с семьёй.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'family'],
  },

  en_s1u4_n3_070_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you have dinner with your family?',
    options: ['Yes', 'I', 'do', 'every', 'evening', 'does', 'have'],
    answer: 'Yes I do every evening',
    answerTranslation: L(
      '네. 매일 저녁 그래요.',
      'Ha. Har oqshom.',
      'Yes, I do. Every evening.',
      'Да. Каждый вечер.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'reply-builder'],
  },

  en_s1u4_n3_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t go out on Monday.',
    audioText: 'I don’t go out on Monday.',
    answerTranslation: L(
      '저는 월요일에 외출하지 않아요.',
      'Men dushanba kuni tashqariga chiqmayman.',
      'I don’t go out on Monday.',
      'Я никуда не выхожу в понедельник.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'days'],
  },

  en_s1u4_n3_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I go out with friends ___ Friday.',
    blankAnswers: ['on'],
    options: ['on', 'at', 'in', 'by'],
    answer: 'on',
    answerTranslation: L(
      '저는 금요일에 친구들과 외출해요.',
      'Men juma kuni do‘stlar bilan tashqariga chiqaman.',
      'I go out with friends on Friday.',
      'Я выхожу с друзьями в пятницу.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['my-day', 'days'],
  },

  en_s1u4_n3_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friend gets up at eight.',
    audioText: 'My friend gets up at eight.',
    answerTranslation: L(
      '제 친구는 8시에 일어나요.',
      'Do‘stim soat sakkizda turadi.',
      'My friend gets up at eight.',
      'Мой друг встаёт в восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['other-person', 'routine'],
  },

  en_s1u4_n3_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does your friend get up early?' },
      { speaker: 'user', text: 'No, he doesn’t.' },
      { speaker: 'npc', text: 'What time does he get up?' },
    ],
    options: [
      'He gets up at eight.',
      'He get up at eight.',
      'He does gets up at eight.',
      'He is get up at eight.',
    ],
    answer: 'He gets up at eight.',
    answerTranslation: L(
      '그는 8시에 일어나요.',
      'U soat sakkizda turadi.',
      'He gets up at eight.',
      'Он встаёт в восемь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['other-person', 'routine'],
  },

  en_s1u4_n3_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She starts work at eight, but I start at nine.',
    audioText: 'She starts work at eight, but I start at nine.',
    answerTranslation: L(
      '그녀는 8시에 일을 시작하지만 저는 9시에 시작해요.',
      'U ishni soat sakkizda boshlaydi, men esa to‘qqizda.',
      'She starts work at eight, but I start at nine.',
      'Она начинает работу в восемь, а я в девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['compare-routines', 'but'],
  },

  en_s1u4_n3_076_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '두 사람의 다른 일상을 연결하는 단어를 고르세요.',
      'Ikki odamning turli tartibini bog‘laydigan so‘zni tanlang.',
      'Choose the word that contrasts the two routines.',
      'Выберите слово, противопоставляющее два распорядка.',
    ),
    sentenceTemplate: 'She starts at eight, ___ I start at nine.',
    blankAnswers: ['but'],
    options: ['but', 'and', 'by', 'on'],
    answer: 'but',
    answerTranslation: L(
      '그녀는 8시에 시작하지만 저는 9시에 시작해요.',
      'U sakkizda boshlaydi, men esa to‘qqizda.',
      'She starts at eight, but I start at nine.',
      'Она начинает в восемь, а я в девять.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['compare-routines', 'but'],
  },

  en_s1u4_n3_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'We both have dinner at seven.',
    audioText: 'We both have dinner at seven.',
    answerTranslation: L(
      '우리 둘 다 7시에 저녁을 먹어요.',
      'Ikkalamiz ham soat yettida kechki ovqat qilamiz.',
      'We both have dinner at seven.',
      'Мы оба ужинаем в семь.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['compare-routines', 'same'],
  },

  en_s1u4_n3_078_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'Does',
      'your',
      'friend',
      'work',
      'at',
      'the',
      'weekend',
      'works',
    ],
    answer: 'Does your friend work at the weekend',
    audioText: 'Does your friend work at the weekend?',
    answerTranslation: L(
      '친구는 주말에 일해요?',
      'Do‘stingiz dam olish kunlari ishlaydimi?',
      'Does your friend work at the weekend?',
      'Ваш друг работает по выходным?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['other-person', 'question'],
  },

  en_s1u4_n3_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'I get up at seven, have breakfast at home, start work at nine, get home at six and go to bed at eleven.',
    audioText:
      'I get up at seven, have breakfast at home, start work at nine, get home at six and go to bed at eleven.',
    answerTranslation: L(
      '저는 7시에 일어나 집에서 아침을 먹고, 9시에 일을 시작하고, 6시에 집에 와서 11시에 자요.',
      'Men soat yettida turaman, uyda nonushta qilaman, to‘qqizda ish boshlayman, oltida uyga kelaman va o‘n birda uxlayman.',
      'I get up at seven, have breakfast at home, start work at nine, get home at six and go to bed at eleven.',
      'Я встаю в семь, завтракаю дома, начинаю работу в девять, прихожу домой в шесть и ложусь спать в одиннадцать.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['my-day', 'complete-routine'],
  },

  en_s1u4_n3_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does Mina start work at nine?' },
      { speaker: 'user', text: 'No, she doesn’t. She starts at eight.' },
      { speaker: 'npc', text: 'Do you start at eight too?' },
    ],
    options: [
      'No, I don’t. I start at nine.',
      'No, I doesn’t. I start at nine.',
      'No, I’m not. I start nine.',
      'No, I haven’t. I starts at nine.',
    ],
    answer: 'No, I don’t. I start at nine.',
    answerTranslation: L(
      '아니요. 저는 9시에 시작해요.',
      'Yo‘q. Men soat to‘qqizda boshlayman.',
      'No, I don’t. I start at nine.',
      'Нет. Я начинаю в девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['compare-routines', 'final'],
  },
};

export const EN_S1_UNIT4_NODE3 = {
  title: L('나의 하루', 'Mening kunim', 'My day', 'Мой день'),
  section: 1,
  unit: 4,
  order: 3,
  isActive: true,

  lessons: [
    {
      title: L(
        '하루 일과',
        'Kundalik ishlar',
        'Daily activities',
        'Повседневные дела',
      ),
      description: L(
        '요일과 get up, have breakfast, start work, get home, go to bed 같은 하루 일과 표현을 익혀요.',
        'Hafta kunlari hamda get up, have breakfast, start work, get home va go to bed kabi kundalik iboralarni o‘rganasiz.',
        'Learn the days of the week and key daily activities such as get up, have breakfast, start work, get home and go to bed.',
        'Учимся называть дни недели и основные повседневные действия: get up, have breakfast, start work, get home и go to bed.',
      ),
      category: LessonCategory.VOCABULARY,
      level: LV,
      order: 1,
      questions: [
        'en_s1u4_n3_001_speaking',
        'en_s1u4_n3_002_word_matching',
        'en_s1u4_n3_003_speaking',
        'en_s1u4_n3_004_fill_in_blank',
        'en_s1u4_n3_005_speaking',
        'en_s1u4_n3_006_fill_in_blank',
        'en_s1u4_n3_007_speaking',
        'en_s1u4_n3_008_word_matching',
        'en_s1u4_n3_009_speaking',
        'en_s1u4_n3_010_fill_in_blank',
        'en_s1u4_n3_011_speaking',
        'en_s1u4_n3_012_audio_match',
        'en_s1u4_n3_013_speaking',
        'en_s1u4_n3_014_fill_in_blank',
        'en_s1u4_n3_015_speaking',
        'en_s1u4_n3_016_translate_builder',
        'en_s1u4_n3_017_speaking',
        'en_s1u4_n3_018_fill_in_blank',
        'en_s1u4_n3_019_speaking',
        'en_s1u4_n3_020_dialog_complete',
      ],
    },

    {
      title: L(
        'Do you...? Does she...?',
        'Do you...? Does she...?',
        'Yes/No questions',
        'Вопросы Yes/No',
      ),
      description: L(
        'I/you/we/they에는 Do, he/she/it에는 Does를 사용하고 Does 뒤에서는 본동사에 -s를 붙이지 않아요.',
        'I/you/we/they bilan Do, he/she/it bilan Does ishlatasiz va Does dan keyin fe’lga -s qo‘shmaysiz.',
        'Use Do with I, you, we and they and Does with he, she and it. After Does, use the base verb without -s.',
        'Используем Do с I, you, we, they и Does с he, she, it. После Does используется глагол без -s.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 2,
      questions: [
        'en_s1u4_n3_021_speaking',
        'en_s1u4_n3_022_fill_in_blank',
        'en_s1u4_n3_023_speaking',
        'en_s1u4_n3_024_word_arrange',
        'en_s1u4_n3_025_speaking',
        'en_s1u4_n3_026_fill_in_blank',
        'en_s1u4_n3_027_speaking',
        'en_s1u4_n3_028_fill_in_blank',
        'en_s1u4_n3_029_speaking',
        'en_s1u4_n3_030_fill_in_blank',
        'en_s1u4_n3_031_speaking',
        'en_s1u4_n3_032_translate_builder',
        'en_s1u4_n3_033_speaking',
        'en_s1u4_n3_034_fill_in_blank',
        'en_s1u4_n3_035_speaking',
        'en_s1u4_n3_036_fill_in_blank',
        'en_s1u4_n3_037_speaking',
        'en_s1u4_n3_038_reply_builder',
        'en_s1u4_n3_039_speaking',
        'en_s1u4_n3_040_dialog_complete',
      ],
    },

    {
      title: L(
        '짧게 대답하기',
        'Qisqa javoblar',
        'Short answers and stress',
        'Краткие ответы и ударение',
      ),
      description: L(
        'Yes, I do / No, I don’t / Yes, she does / No, he doesn’t 같은 짧은 대답과 질문·대답의 강세를 익히고 go, have, get 표현을 통째로 학습해요.',
        'Yes, I do / No, I don’t / Yes, she does / No, he doesn’t kabi qisqa javoblarni, savol-javob urg‘usini va go, have, get iboralarini birikma holida o‘rganasiz.',
        'Practise short answers with do and does, hear the stress in questions and answers, and learn common go, have and get phrases as chunks.',
        'Практикуем краткие ответы с do и does, ударение в вопросах и ответах и устойчивые сочетания с go, have и get.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 3,
      questions: [
        'en_s1u4_n3_041_speaking',
        'en_s1u4_n3_042_fill_in_blank',
        'en_s1u4_n3_043_speaking',
        'en_s1u4_n3_044_fill_in_blank',
        'en_s1u4_n3_045_speaking',
        'en_s1u4_n3_046_fill_in_blank',
        'en_s1u4_n3_047_speaking',
        'en_s1u4_n3_048_dialog_complete',
        'en_s1u4_n3_049_speaking',
        'en_s1u4_n3_050_fill_in_blank',
        'en_s1u4_n3_051_speaking',
        'en_s1u4_n3_052_audio_match',
        'en_s1u4_n3_053_speaking',
        'en_s1u4_n3_054_word_matching',
        'en_s1u4_n3_055_speaking',
        'en_s1u4_n3_056_fill_in_blank',
        'en_s1u4_n3_057_speaking',
        'en_s1u4_n3_058_fill_in_blank',
        'en_s1u4_n3_059_speaking',
        'en_s1u4_n3_060_dialog_complete',
      ],
    },

    {
      title: L(
        '내 하루 말하기',
        'Kunim haqida gapirish',
        'Talking about your day',
        'Рассказываем о своём дне',
      ),
      description: L(
        '기상부터 취침까지 자신의 하루를 설명하고 다른 사람에게 일상을 질문한 뒤 두 사람의 같은 점과 다른 점을 말해요.',
        'Uyg‘onishdan uxlashgacha o‘z kuningizni tasvirlaysiz, boshqa odamning kun tartibi haqida savollar berasiz va ikki tartibning o‘xshash hamda farqli tomonlarini aytasiz.',
        'Describe your day from getting up to going to bed, ask about another person’s routine and compare what is the same or different.',
        'Описываем свой день от подъёма до сна, спрашиваем о распорядке другого человека и сравниваем сходства и различия.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u4_n3_061_speaking',
        'en_s1u4_n3_062_reply_builder',
        'en_s1u4_n3_063_speaking',
        'en_s1u4_n3_064_dialog_complete',
        'en_s1u4_n3_065_speaking',
        'en_s1u4_n3_066_fill_in_blank',
        'en_s1u4_n3_067_speaking',
        'en_s1u4_n3_068_translate_builder',
        'en_s1u4_n3_069_speaking',
        'en_s1u4_n3_070_reply_builder',
        'en_s1u4_n3_071_speaking',
        'en_s1u4_n3_072_fill_in_blank',
        'en_s1u4_n3_073_speaking',
        'en_s1u4_n3_074_dialog_complete',
        'en_s1u4_n3_075_speaking',
        'en_s1u4_n3_076_fill_in_blank',
        'en_s1u4_n3_077_speaking',
        'en_s1u4_n3_078_word_arrange',
        'en_s1u4_n3_079_speaking',
        'en_s1u4_n3_080_dialog_complete',
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 4 · Node 4
// 4.4 Speaking and writing
//
// LessonCategory:
// VOCABULARY / GRAMMAR / EXPRESSION / CONVERSATION / LISTENING / TOPIK
//
// Coverage
// - shops:
//   pharmacy
//   department store
//   electronics shop
//   bookshop
//
// - customer language:
//   Excuse me. Do you have a/any ...?
//   How much is this ...?
//   How much are these ...?
//   OK. I'll take it.
//   OK. I'll take them.
//
// - shop assistant language:
//   Can I help you?
//   Yes, it's over there.
//   Yes, they're over there.
//   Is that everything?
//
// - customer responses:
//   Yes, please. I need ...
//   No, thanks. Just looking.
//   Yes, thank you.
//   No, I need ... too.
//
// - prices:
//   dollar / pound / pence / euro
//   one-number prices
//   two-number prices
//
// - informal email:
//   full stop (.)
//   question mark (?)
//   comma (,)
//   apostrophe (')
//   exclamation mark (!)
//
// - punctuation rules:
//   . end of sentence
//   ? end of question
//   , before but
//   ' missing letters in contractions
//   ! strong feelings
//
// - informal email structure:
//   Hi/Hello + name
//   How are you?
//   Thanks for your email.
//   Can't wait to see you.
//   Thanks,
//   Love,
//
// - email travel functions:
//   ask for an address
//   ask how to get somewhere
//   ask about transport
//   ask ticket price
//   give phone number
//   say arrival day/time
//
// 4 lessons × 20 = 80 questions
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT4_NODE4_WORDS = [
  {
    code: 'en-shop-pharmacy',
    english: 'pharmacy',
    senseKey: 'shop-medicines',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '약국',
      'dorixona',
      'a shop where you can buy medicines',
      'аптека',
    ),
    examples: [
      {
        english: 'The pharmacy is near the station.',
        translations: L(
          '약국은 역 근처에 있어요.',
          'Dorixona vokzal yaqinida.',
          'The pharmacy is near the station.',
          'Аптека находится рядом со станцией.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfɑːməsi/',
      ttsText: 'pharmacy',
    },
    media: {
      emoji: '💊',
      imageUrl: '',
      imageAlt: L('약국', 'dorixona', 'a pharmacy', 'аптека'),
    },
    tags: ['shops'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-shop-department-store',
    english: 'department store',
    senseKey: 'large-shop-many-departments',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '백화점',
      'univermag',
      'a large shop with different sections selling many kinds of things',
      'универмаг',
    ),
    examples: [
      {
        english: 'The department store has clothes and bags.',
        translations: L(
          '그 백화점에는 옷과 가방이 있어요.',
          'Univermagda kiyimlar va sumkalar bor.',
          'The department store has clothes and bags.',
          'В универмаге есть одежда и сумки.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/dɪˈpɑːtmənt stɔː/',
      ttsText: 'department store',
    },
    media: {
      emoji: '🏬',
      imageUrl: '',
      imageAlt: L('백화점', 'univermag', 'a department store', 'универмаг'),
    },
    tags: ['shops'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-shop-electronics-shop',
    english: 'electronics shop',
    senseKey: 'shop-electronic-devices',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '전자제품 가게',
      'elektronika do‘koni',
      'a shop that sells electronic devices',
      'магазин электроники',
    ),
    examples: [
      {
        english: 'I need a charger from the electronics shop.',
        translations: L(
          '전자제품 가게에서 충전기가 필요해요.',
          'Menga elektronika do‘konidan zaryadlovchi kerak.',
          'I need a charger from the electronics shop.',
          'Мне нужно зарядное устройство из магазина электроники.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɪˌlekˈtrɒnɪks ʃɒp/',
      ttsText: 'electronics shop',
    },
    media: {
      emoji: '💻',
      imageUrl: '',
      imageAlt: L(
        '전자제품 가게',
        'elektronika do‘koni',
        'an electronics shop',
        'магазин электроники',
      ),
    },
    tags: ['shops'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-shop-bookshop',
    english: 'bookshop',
    senseKey: 'shop-books',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '서점',
      'kitob do‘koni',
      'a shop that sells books',
      'книжный магазин',
    ),
    examples: [
      {
        english: 'There is a bookshop near my office.',
        translations: L(
          '제 사무실 근처에 서점이 있어요.',
          'Ofisim yaqinida kitob do‘koni bor.',
          'There is a bookshop near my office.',
          'Рядом с моим офисом есть книжный магазин.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbʊkʃɒp/',
      ttsText: 'bookshop',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L('서점', 'kitob do‘koni', 'a bookshop', 'книжный магазин'),
    },
    tags: ['shops'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-shopping-price',
    english: 'price',
    senseKey: 'money-cost',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('가격', 'narx', 'the amount of money something costs', 'цена'),
    examples: [
      {
        english: 'What is the price?',
        translations: L(
          '가격이 얼마예요?',
          'Narxi qancha?',
          'What is the price?',
          'Какая цена?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/praɪs/',
      ttsText: 'price',
    },
    media: {
      emoji: '🏷️',
      imageUrl: '',
      imageAlt: L('가격표', 'narx yorlig‘i', 'a price tag', 'ценник'),
    },
    tags: ['shopping', 'prices'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-money-pound',
    english: 'pound',
    senseKey: 'british-currency-unit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('파운드', 'funt', 'a unit of British money', 'фунт'),
    examples: [
      {
        english: 'It’s twenty pounds.',
        translations: L(
          '20파운드예요.',
          'Yigirma funt.',
          'It’s twenty pounds.',
          'Это двадцать фунтов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/paʊnd/',
      ttsText: 'pound',
    },
    media: {
      emoji: '💷',
      imageUrl: '',
      imageAlt: L('파운드 화폐', 'funt', 'British pounds', 'британские фунты'),
    },
    tags: ['money', 'prices'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-money-pence',
    english: 'pence',
    senseKey: 'british-small-currency-unit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '펜스',
      'pens',
      'the plural form used for British pennies as an amount of money',
      'пенсы',
    ),
    examples: [
      {
        english: 'It’s eighty pence.',
        translations: L(
          '80펜스예요.',
          'Sakson pens.',
          'It’s eighty pence.',
          'Это восемьдесят пенсов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pens/',
      ttsText: 'pence',
    },
    media: {
      emoji: '🪙',
      imageUrl: '',
      imageAlt: L('동전', 'tanga', 'coins', 'монеты'),
    },
    tags: ['money', 'prices'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-money-dollar',
    english: 'dollar',
    senseKey: 'dollar-currency-unit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '달러',
      'dollar',
      'a unit of money used in several countries',
      'доллар',
    ),
    examples: [
      {
        english: 'It’s thirty dollars.',
        translations: L(
          '30달러예요.',
          'O‘ttiz dollar.',
          'It’s thirty dollars.',
          'Это тридцать долларов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdɒlə/',
      ttsText: 'dollar',
    },
    media: {
      emoji: '💵',
      imageUrl: '',
      imageAlt: L('달러 지폐', 'dollar', 'dollars', 'доллары'),
    },
    tags: ['money', 'prices'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-money-euro',
    english: 'euro',
    senseKey: 'european-currency-unit',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '유로',
      'yevro',
      'a unit of money used in many European countries',
      'евро',
    ),
    examples: [
      {
        english: 'The bag is forty euros.',
        translations: L(
          '그 가방은 40유로예요.',
          'Sumka qirq yevro.',
          'The bag is forty euros.',
          'Сумка стоит сорок евро.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈjʊərəʊ/',
      ttsText: 'euro',
    },
    media: {
      emoji: '💶',
      imageUrl: '',
      imageAlt: L('유로 화폐', 'yevro', 'euros', 'евро'),
    },
    tags: ['money', 'prices'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT4_NODE4_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · In a shop
  // ===========================================================

  en_s1u4_n4_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Pharmacy.',
    audioText: 'Pharmacy.',
    answerTranslation: L('약국.', 'Dorixona.', 'Pharmacy.', 'Аптека.'),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shops', 'pharmacy'],
  },

  en_s1u4_n4_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '약을 사는 가게를 고르세요.',
      'Dori sotib olinadigan do‘konni tanlang.',
      'Choose the shop where you buy medicine.',
      'Выберите магазин, где покупают лекарства.',
    ),
    sentenceTemplate: 'I need some vitamins. I need a ___.',
    blankAnswers: ['pharmacy'],
    options: ['pharmacy', 'bookshop', 'electronics shop', 'station'],
    answer: 'pharmacy',
    answerTranslation: L(
      '비타민이 필요해서 약국에 가야 해요.',
      'Menga vitaminlar kerak, shuning uchun dorixona kerak.',
      'I need some vitamins, so I need a pharmacy.',
      'Мне нужны витамины, поэтому нужна аптека.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shops', 'pharmacy'],
  },

  en_s1u4_n4_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Electronics shop.',
    audioText: 'Electronics shop.',
    answerTranslation: L(
      '전자제품 가게.',
      'Elektronika do‘koni.',
      'Electronics shop.',
      'Магазин электроники.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shops', 'electronics-shop'],
  },

  en_s1u4_n4_004_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I need a new tablet. Let’s go to the ___.',
    blankAnswers: ['electronics shop'],
    options: ['electronics shop', 'pharmacy', 'bookshop', 'bus station'],
    answer: 'electronics shop',
    answerTranslation: L(
      '새 태블릿이 필요해요. 전자제품 가게에 가요.',
      'Menga yangi planshet kerak. Elektronika do‘koniga boramiz.',
      'I need a new tablet. Let’s go to the electronics shop.',
      'Мне нужен новый планшет. Пойдём в магазин электроники.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['shops', 'electronics-shop'],
  },

  en_s1u4_n4_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me. Do you have any umbrellas?',
    audioText: 'Excuse me. Do you have any umbrellas?',
    answerTranslation: L(
      '실례합니다. 우산이 있나요?',
      'Kechirasiz. Soyabonlaringiz bormi?',
      'Excuse me. Do you have any umbrellas?',
      'Извините. У вас есть зонты?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'customer'],
  },

  en_s1u4_n4_006_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Excuse', 'me', 'Do', 'you', 'have', 'any', 'umbrellas', 'has'],
    answer: 'Excuse me Do you have any umbrellas',
    audioText: 'Excuse me. Do you have any umbrellas?',
    answerTranslation: L(
      '실례합니다. 우산이 있나요?',
      'Kechirasiz. Soyabonlaringiz bormi?',
      'Excuse me. Do you have any umbrellas?',
      'Извините. У вас есть зонты?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['shop-language', 'customer'],
  },

  en_s1u4_n4_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, they’re over there.',
    audioText: 'Yes, they’re over there.',
    answerTranslation: L(
      '네, 저쪽에 있어요.',
      'Ha, ular ana u yerda.',
      'Yes, they’re over there.',
      'Да, они вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'plural'],
  },

  en_s1u4_n4_008_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'user', text: 'Excuse me. Do you have any pens?' },
    ],
    options: [
      'Yes, they’re over there.',
      'Yes, it’s over there.',
      'No, I’m a pen.',
      'They has over there.',
    ],
    answer: 'Yes, they’re over there.',
    answerTranslation: L(
      '네, 저쪽에 있어요.',
      'Ha, ular ana u yerda.',
      'Yes, they’re over there.',
      'Да, они вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'plural'],
  },

  en_s1u4_n4_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Excuse me. Do you have a dictionary?',
    audioText: 'Excuse me. Do you have a dictionary?',
    answerTranslation: L(
      '실례합니다. 사전이 있나요?',
      'Kechirasiz. Lug‘atingiz bormi?',
      'Excuse me. Do you have a dictionary?',
      'Извините. У вас есть словарь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'singular'],
  },

  en_s1u4_n4_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'Do you have ___ English dictionary?',
    blankAnswers: ['an'],
    options: ['an', 'any', 'some', 'are'],
    answer: 'an',
    answerTranslation: L(
      '영어 사전이 있나요?',
      'Inglizcha lug‘atingiz bormi?',
      'Do you have an English dictionary?',
      'У вас есть английский словарь?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shop-language', 'a-an'],
  },

  en_s1u4_n4_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I help you?',
    audioText: 'Can I help you?',
    answerTranslation: L(
      '도와드릴까요?',
      'Sizga yordam bera olamanmi?',
      'Can I help you?',
      'Могу я вам помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'shop-assistant'],
  },

  en_s1u4_n4_012_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I help you?',
    options: ['Yes', 'please', 'I', 'need', 'a', 'notepad', 'take'],
    answer: 'Yes please I need a notepad',
    answerTranslation: L(
      '네. 메모장이 필요해요.',
      'Ha, iltimos. Menga bloknot kerak.',
      'Yes, please. I need a notepad.',
      'Да, пожалуйста. Мне нужен блокнот.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'need'],
  },

  en_s1u4_n4_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'No, thanks. Just looking.',
    audioText: 'No, thanks. Just looking.',
    answerTranslation: L(
      '아니요, 괜찮아요. 그냥 보고 있어요.',
      'Yo‘q, rahmat. Shunchaki ko‘ryapman.',
      'No, thanks. Just looking.',
      'Нет, спасибо. Я просто смотрю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'just-looking'],
  },

  en_s1u4_n4_014_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Can I help you?' }],
    options: [
      'No, thanks. Just looking.',
      'No, I’m not help.',
      'No, I look a thanks.',
      'No, it isn’t.',
    ],
    answer: 'No, thanks. Just looking.',
    answerTranslation: L(
      '아니요, 괜찮아요. 그냥 보고 있어요.',
      'Yo‘q, rahmat. Shunchaki ko‘ryapman.',
      'No, thanks. Just looking.',
      'Нет, спасибо. Я просто смотрю.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'just-looking'],
  },

  en_s1u4_n4_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Is that everything?',
    audioText: 'Is that everything?',
    answerTranslation: L(
      '그게 전부인가요?',
      'Hammasi shumi?',
      'Is that everything?',
      'Это всё?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'shop-assistant'],
  },

  en_s1u4_n4_016_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Is that everything?',
    options: ['No', 'I', 'need', 'two', 'pens', 'too', 'take'],
    answer: 'No I need two pens too',
    answerTranslation: L(
      '아니요. 펜 두 자루도 필요해요.',
      'Yo‘q. Menga yana ikkita ruchka kerak.',
      'No, I need two pens too.',
      'Нет. Мне ещё нужны две ручки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'too'],
  },

  en_s1u4_n4_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, thank you.',
    audioText: 'Yes, thank you.',
    answerTranslation: L(
      '네, 감사합니다.',
      'Ha, rahmat.',
      'Yes, thank you.',
      'Да, спасибо.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language'],
  },

  en_s1u4_n4_018_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Excuse', 'me', 'Do', 'you', 'have', 'any', 'notepads', 'is'],
    answer: 'Excuse me Do you have any notepads',
    answerTranslation: L(
      '실례합니다. 메모장이 있나요?',
      'Kechirasiz. Bloknotlaringiz bormi?',
      'Excuse me. Do you have any notepads?',
      'Извините. У вас есть блокноты?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'builder'],
  },

  en_s1u4_n4_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I need a notebook and three pens.',
    audioText: 'I need a notebook and three pens.',
    answerTranslation: L(
      '노트 한 권과 펜 세 자루가 필요해요.',
      'Menga bitta daftar va uchta ruchka kerak.',
      'I need a notebook and three pens.',
      'Мне нужны тетрадь и три ручки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'need'],
  },

  en_s1u4_n4_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Can I help you?' },
      { speaker: 'user', text: 'Yes, please. I need a notebook.' },
      { speaker: 'npc', text: 'Is that everything?' },
    ],
    options: [
      'No, I need three pens too.',
      'No, three pens are me.',
      'No, I am three pens.',
      'No, they doesn’t.',
    ],
    answer: 'No, I need three pens too.',
    answerTranslation: L(
      '아니요. 펜 세 자루도 필요해요.',
      'Yo‘q. Menga yana uchta ruchka kerak.',
      'No, I need three pens too.',
      'Нет. Мне ещё нужны три ручки.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'complete-dialog'],
  },

  // ===========================================================
  // Lesson 2 · Prices and buying
  // ===========================================================

  en_s1u4_n4_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How much is this tablet?',
    audioText: 'How much is this tablet?',
    answerTranslation: L(
      '이 태블릿은 얼마예요?',
      'Bu planshet qancha turadi?',
      'How much is this tablet?',
      'Сколько стоит этот планшет?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prices', 'singular'],
  },

  en_s1u4_n4_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How much ___ this tablet?',
    blankAnswers: ['is'],
    options: ['is', 'are', 'do', 'does'],
    answer: 'is',
    answerTranslation: L(
      '이 태블릿은 얼마예요?',
      'Bu planshet qancha turadi?',
      'How much is this tablet?',
      'Сколько стоит этот планшет?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['prices', 'singular'],
  },

  en_s1u4_n4_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How much are these pens?',
    audioText: 'How much are these pens?',
    answerTranslation: L(
      '이 펜들은 얼마예요?',
      'Bu ruchkalar qancha turadi?',
      'How much are these pens?',
      'Сколько стоят эти ручки?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prices', 'plural'],
  },

  en_s1u4_n4_024_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How much ___ these pens?',
    blankAnswers: ['are'],
    options: ['are', 'is', 'do', 'has'],
    answer: 'are',
    answerTranslation: L(
      '이 펜들은 얼마예요?',
      'Bu ruchkalar qancha turadi?',
      'How much are these pens?',
      'Сколько стоят эти ручки?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['prices', 'plural'],
  },

  en_s1u4_n4_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s twenty dollars.',
    audioText: 'It’s twenty dollars.',
    answerTranslation: L(
      '20달러예요.',
      'Yigirma dollar.',
      'It’s twenty dollars.',
      'Это двадцать долларов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'one-number'],
  },

  en_s1u4_n4_026_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '들은 가격을 고르세요.',
      'Eshitilgan narxni tanlang.',
      'Choose the price you hear.',
      'Выберите услышанную цену.',
    ),
    sentenceTemplate: 'It’s twenty dollars. → $___',
    blankAnswers: ['20'],
    options: ['20', '12', '2.20', '22.20'],
    answer: '20',
    answerTranslation: L('20달러', '20 dollar', '$20', '20 долларов'),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'one-number'],
  },

  en_s1u4_n4_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s forty-five pounds.',
    audioText: 'It’s forty-five pounds.',
    answerTranslation: L(
      '45파운드예요.',
      'Qirq besh funt.',
      'It’s forty-five pounds.',
      'Это сорок пять фунтов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'pounds'],
  },

  en_s1u4_n4_028_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['It’s', 'forty-five', 'pounds', 'fifteen', 'euros'],
    answer: 'It’s forty-five pounds',
    audioText: 'It’s forty-five pounds.',
    answerTranslation: L(
      '45파운드예요.',
      'Qirq besh funt.',
      'It’s forty-five pounds.',
      'Это сорок пять фунтов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'pounds'],
  },

  en_s1u4_n4_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s ninety pence.',
    audioText: 'It’s ninety pence.',
    answerTranslation: L(
      '90펜스예요.',
      'To‘qson pens.',
      'It’s ninety pence.',
      'Это девяносто пенсов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'pence'],
  },

  en_s1u4_n4_030_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'pence 가격을 완성하세요.',
      'Pence narxini to‘ldiring.',
      'Complete the price in pence.',
      'Дополните цену в пенсах.',
    ),
    sentenceTemplate: '90p = ninety ___.',
    blankAnswers: ['pence'],
    options: ['pence', 'pounds', 'euros', 'dollars'],
    answer: 'pence',
    answerTranslation: L(
      '90펜스',
      '90 pens',
      'ninety pence',
      'девяносто пенсов',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['prices', 'pence'],
  },

  en_s1u4_n4_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s twelve euros fifty.',
    audioText: 'It’s twelve euros fifty.',
    answerTranslation: L(
      '12유로 50센트예요.',
      'O‘n ikki yevro ellik.',
      'It’s twelve euros fifty.',
      'Это двенадцать евро пятьдесят.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'two-numbers'],
  },

  en_s1u4_n4_032_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '들은 가격을 고르세요.',
      'Eshitilgan narxni tanlang.',
      'Choose the price you hear.',
      'Выберите услышанную цену.',
    ),
    sentenceTemplate: 'twelve euros fifty → €___',
    blankAnswers: ['12.50'],
    options: ['12.50', '12.05', '50.12', '125.00'],
    answer: '12.50',
    answerTranslation: L(
      '12유로 50센트',
      '12,50 yevro',
      '€12.50',
      '12,50 евро',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'two-numbers'],
  },

  en_s1u4_n4_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'They’re nine pounds ninety-nine.',
    audioText: 'They’re nine pounds ninety-nine.',
    answerTranslation: L(
      '9파운드 99펜스예요.',
      'To‘qqiz funt to‘qson to‘qqiz.',
      'They’re nine pounds ninety-nine.',
      'Они стоят девять фунтов девяносто девять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['prices', 'two-numbers'],
  },

  en_s1u4_n4_034_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'user', text: 'How much are these notebooks?' }],
    options: [
      'They’re nine pounds ninety-nine.',
      'It’s nine pounds ninety-nine.',
      'They nine pounds are.',
      'They does nine pounds.',
    ],
    answer: 'They’re nine pounds ninety-nine.',
    answerTranslation: L(
      '9파운드 99펜스예요.',
      'To‘qqiz funt to‘qson to‘qqiz.',
      'They’re nine pounds ninety-nine.',
      'Они стоят девять фунтов девяносто девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prices', 'plural'],
  },

  en_s1u4_n4_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'OK. I’ll take it.',
    audioText: 'OK. I’ll take it.',
    answerTranslation: L(
      '좋아요. 이걸 살게요.',
      'Mayli. Buni olaman.',
      'OK. I’ll take it.',
      'Хорошо. Я возьму это.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'buy'],
  },

  en_s1u4_n4_036_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'This umbrella is fifteen dollars.',
    options: ['OK', 'I’ll', 'take', 'it', 'them', 'how'],
    answer: 'OK I’ll take it',
    answerTranslation: L(
      '좋아요. 이걸 살게요.',
      'Mayli. Buni olaman.',
      'OK. I’ll take it.',
      'Хорошо. Я возьму это.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'it'],
  },

  en_s1u4_n4_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'OK. I’ll take them.',
    audioText: 'OK. I’ll take them.',
    answerTranslation: L(
      '좋아요. 그것들을 살게요.',
      'Mayli. Ularni olaman.',
      'OK. I’ll take them.',
      'Хорошо. Я возьму их.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['shop-language', 'them'],
  },

  en_s1u4_n4_038_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '여러 물건을 살 때 알맞은 대명사를 고르세요.',
      'Bir nechta buyumni olayotganda to‘g‘ri olmoshni tanlang.',
      'Choose the pronoun for buying several things.',
      'Выберите местоимение для нескольких предметов.',
    ),
    sentenceTemplate: 'These pens are cheap. I’ll take ___.',
    blankAnswers: ['them'],
    options: ['them', 'it', 'he', 'she'],
    answer: 'them',
    answerTranslation: L(
      '이 펜들은 싸요. 그것들을 살게요.',
      'Bu ruchkalar arzon. Ularni olaman.',
      'These pens are cheap. I’ll take them.',
      'Эти ручки дешёвые. Я возьму их.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['shop-language', 'them'],
  },

  en_s1u4_n4_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How much are these wallets, please?',
    audioText: 'How much are these wallets, please?',
    answerTranslation: L(
      '이 지갑들은 얼마예요?',
      'Bu hamyonlar qancha turadi?',
      'How much are these wallets, please?',
      'Сколько стоят эти кошельки?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prices', 'shopping'],
  },

  en_s1u4_n4_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'user', text: 'How much are these wallets, please?' },
      { speaker: 'npc', text: 'They’re twenty euros.' },
    ],
    options: [
      'OK. I’ll take them.',
      'OK. I’ll take it.',
      'OK. I take they.',
      'OK. They’ll take me.',
    ],
    answer: 'OK. I’ll take them.',
    answerTranslation: L(
      '좋아요. 그것들을 살게요.',
      'Mayli. Ularni olaman.',
      'OK. I’ll take them.',
      'Хорошо. Я возьму их.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['prices', 'buy', 'final'],
  },

  // ===========================================================
  // Lesson 3 · Basic punctuation
  // ===========================================================

  en_s1u4_n4_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Full stop.',
    audioText: 'Full stop.',
    answerTranslation: L('마침표.', 'Nuqta.', 'Full stop.', 'Точка.'),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'full-stop'],
  },

  en_s1u4_n4_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '평서문의 끝에 오는 문장부호를 고르세요.',
      'Oddiy gap oxiridagi tinish belgisini tanlang.',
      'Choose the punctuation mark at the end of a sentence.',
      'Выберите знак препинания в конце предложения.',
    ),
    sentenceTemplate: 'I’m in Berlin___',
    blankAnswers: ['.'],
    options: ['.', '?', '!', ','],
    answer: '.',
    answerTranslation: L(
      'I’m in Berlin.',
      'I’m in Berlin.',
      'I’m in Berlin.',
      'I’m in Berlin.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'full-stop'],
  },

  en_s1u4_n4_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Question mark.',
    audioText: 'Question mark.',
    answerTranslation: L(
      '물음표.',
      'So‘roq belgisi.',
      'Question mark.',
      'Вопросительный знак.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'question-mark'],
  },

  en_s1u4_n4_044_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '질문의 끝에 오는 문장부호를 고르세요.',
      'Savol oxiridagi tinish belgisini tanlang.',
      'Choose the punctuation mark at the end of a question.',
      'Выберите знак препинания в конце вопроса.',
    ),
    sentenceTemplate: 'How are you___',
    blankAnswers: ['?'],
    options: ['?', '.', ',', '!'],
    answer: '?',
    answerTranslation: L(
      'How are you?',
      'How are you?',
      'How are you?',
      'How are you?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'question-mark'],
  },

  en_s1u4_n4_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Comma.',
    audioText: 'Comma.',
    answerTranslation: L('쉼표.', 'Vergul.', 'Comma.', 'Запятая.'),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'comma'],
  },

  en_s1u4_n4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'but 앞에 들어갈 문장부호를 고르세요.',
      'but oldidan keladigan tinish belgisini tanlang.',
      'Choose the punctuation mark before but.',
      'Выберите знак препинания перед but.',
    ),
    sentenceTemplate: 'It’s cold___ but I like the city.',
    blankAnswers: [','],
    options: [',', '?', '!', "'"],
    answer: ',',
    answerTranslation: L(
      '춥지만 저는 이 도시가 좋아요.',
      'Havo sovuq, lekin menga shahar yoqadi.',
      'It’s cold, but I like the city.',
      'Холодно, но мне нравится город.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'comma', 'but'],
  },

  en_s1u4_n4_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Apostrophe.',
    audioText: 'Apostrophe.',
    answerTranslation: L(
      '아포스트로피.',
      'Apostrof.',
      'Apostrophe.',
      'Апостроф.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'apostrophe'],
  },

  en_s1u4_n4_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '축약형에서 빠진 글자를 표시하는 기호를 고르세요.',
      'Qisqartmada tushib qolgan harfni ko‘rsatuvchi belgini tanlang.',
      'Choose the mark used where letters are missing in a contraction.',
      'Выберите знак, обозначающий пропущенные буквы в сокращении.',
    ),
    sentenceTemplate: 'I am → I___m',
    blankAnswers: ["'"],
    options: ["'", ',', '.', '?'],
    answer: "'",
    answerTranslation: L(
      'I am → I’m',
      'I am → I’m',
      'I am → I’m',
      'I am → I’m',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'apostrophe'],
  },

  en_s1u4_n4_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Exclamation mark.',
    audioText: 'Exclamation mark.',
    answerTranslation: L(
      '느낌표.',
      'Undov belgisi.',
      'Exclamation mark.',
      'Восклицательный знак.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'exclamation-mark'],
  },

  en_s1u4_n4_050_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '강한 감정을 나타내는 문장부호를 고르세요.',
      'Kuchli hissiyotni bildiradigan tinish belgisini tanlang.',
      'Choose the punctuation mark used for strong feelings.',
      'Выберите знак препинания для сильных эмоций.',
    ),
    sentenceTemplate: 'Great___',
    blankAnswers: ['!'],
    options: ['!', '.', '?', ','],
    answer: '!',
    answerTranslation: L('좋아요!', 'Ajoyib!', 'Great!', 'Отлично!'),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'exclamation-mark'],
  },

  en_s1u4_n4_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’m in Prague now.',
    audioText: 'I’m in Prague now.',
    answerTranslation: L(
      '저는 지금 프라하에 있어요.',
      'Men hozir Pragada.',
      'I’m in Prague now.',
      'Я сейчас в Праге.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'contractions'],
  },

  en_s1u4_n4_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '올바른 축약형을 고르세요.',
      'To‘g‘ri qisqartmani tanlang.',
      'Choose the correct contraction.',
      'Выберите правильное сокращение.',
    ),
    sentenceTemplate: 'I am in Prague. → ___ in Prague.',
    blankAnswers: ['I’m'],
    options: ['I’m', 'Im', "I's", 'I’ve'],
    answer: 'I’m',
    answerTranslation: L(
      '저는 프라하에 있어요.',
      'Men Pragada.',
      'I’m in Prague.',
      'Я в Праге.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'apostrophe'],
  },

  en_s1u4_n4_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s cold, but the city is beautiful.',
    audioText: 'It’s cold, but the city is beautiful.',
    answerTranslation: L(
      '춥지만 도시는 아름다워요.',
      'Havo sovuq, lekin shahar chiroyli.',
      'It’s cold, but the city is beautiful.',
      'Холодно, но город красивый.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'comma', 'but'],
  },

  en_s1u4_n4_054_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['It’s', 'cold', 'but', 'the', 'city', 'is', 'beautiful', 'and'],
    answer: 'It’s cold but the city is beautiful',
    audioText: 'It’s cold, but the city is beautiful.',
    answerTranslation: L(
      '춥지만 도시는 아름다워요.',
      'Havo sovuq, lekin shahar chiroyli.',
      'It’s cold, but the city is beautiful.',
      'Холодно, но город красивый.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['punctuation', 'but'],
  },

  en_s1u4_n4_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your phone number?',
    audioText: 'What’s your phone number?',
    answerTranslation: L(
      '전화번호가 뭐예요?',
      'Telefon raqamingiz nima?',
      'What’s your phone number?',
      'Какой у вас номер телефона?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'question-mark'],
  },

  en_s1u4_n4_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '문장 끝에 맞는 문장부호를 고르세요.',
      'Gap oxiriga mos tinish belgisini tanlang.',
      'Choose the correct punctuation at the end.',
      'Выберите правильный знак в конце.',
    ),
    sentenceTemplate: 'What’s your phone number___',
    blankAnswers: ['?'],
    options: ['?', '.', '!', ','],
    answer: '?',
    answerTranslation: L(
      '전화번호가 뭐예요?',
      'Telefon raqamingiz nima?',
      'What’s your phone number?',
      'Какой у вас номер телефона?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'question-mark'],
  },

  en_s1u4_n4_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I can’t wait to see you!',
    audioText: 'I can’t wait to see you!',
    answerTranslation: L(
      '빨리 만나고 싶어요!',
      'Sizni ko‘rishni sabrsizlik bilan kutyapman!',
      'I can’t wait to see you!',
      'Не могу дождаться встречи!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'apostrophe', 'exclamation-mark'],
  },

  en_s1u4_n4_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'can not의 축약형을 완성하세요.',
      'can not qisqartmasini to‘ldiring.',
      'Complete the contraction of cannot.',
      'Дополните сокращение cannot.',
    ),
    sentenceTemplate: 'can not → can___t',
    blankAnswers: ["'"],
    options: ["'", '.', ',', '?'],
    answer: "'",
    answerTranslation: L(
      'cannot → can’t',
      'cannot → can’t',
      'cannot → can’t',
      'cannot → can’t',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'apostrophe'],
  },

  en_s1u4_n4_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi, Mina. How are you?',
    audioText: 'Hi, Mina. How are you?',
    answerTranslation: L(
      '안녕, Mina. 잘 지내?',
      'Salom, Mina. Qalaysan?',
      'Hi, Mina. How are you?',
      'Привет, Мина. Как дела?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'punctuation'],
  },

  en_s1u4_n4_060_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '올바른 문장부호가 사용된 문장을 고르세요.',
      'Tinish belgilari to‘g‘ri qo‘yilgan gapni tanlang.',
      'Choose the sentence with correct punctuation.',
      'Выберите предложение с правильной пунктуацией.',
    ),
    dialogLines: [{ speaker: 'npc', text: 'Which sentence is correct?' }],
    options: [
      'Hi, Leo. How are you?',
      'Hi Leo? How are you.',
      'Hi Leo! How are you.',
      'Hi. Leo, How are you!',
    ],
    answer: 'Hi, Leo. How are you?',
    answerTranslation: L(
      'Hi, Leo. How are you?',
      'Hi, Leo. How are you?',
      'Hi, Leo. How are you?',
      'Hi, Leo. How are you?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['punctuation', 'email'],
  },

  // ===========================================================
  // Lesson 4 · An informal email
  // ===========================================================

  en_s1u4_n4_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Hi, Amir.',
    audioText: 'Hi, Amir.',
    answerTranslation: L(
      '안녕, Amir.',
      'Salom, Amir.',
      'Hi, Amir.',
      'Привет, Амир.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'opening'],
  },

  en_s1u4_n4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '친구에게 보내는 이메일의 자연스러운 시작을 고르세요.',
      'Do‘stga yozilgan emailning tabiiy boshlanishini tanlang.',
      'Choose a natural opening for an informal email.',
      'Выберите естественное начало неформального письма.',
    ),
    sentenceTemplate: '___ Amir,',
    blankAnswers: ['Hi'],
    options: ['Hi', 'Dear Sir', 'Attention', 'Shop'],
    answer: 'Hi',
    answerTranslation: L(
      '안녕, Amir.',
      'Salom, Amir.',
      'Hi, Amir.',
      'Привет, Амир.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'opening'],
  },

  en_s1u4_n4_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Thanks for your email.',
    audioText: 'Thanks for your email.',
    answerTranslation: L(
      '이메일 고마워.',
      'Emailing uchun rahmat.',
      'Thanks for your email.',
      'Спасибо за твоё письмо.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'opening'],
  },

  en_s1u4_n4_064_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Hi! How are you?',
    options: ['I’m', 'fine', 'thanks', 'Thanks', 'for', 'your', 'email'],
    answer: 'I’m fine thanks',
    answerTranslation: L(
      '잘 지내, 고마워.',
      'Yaxshiman, rahmat.',
      'I’m fine, thanks.',
      'У меня всё хорошо, спасибо.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'reply'],
  },

  en_s1u4_n4_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I arrive on Friday at six thirty.',
    audioText: 'I arrive on Friday at six thirty.',
    answerTranslation: L(
      '저는 금요일 6시 30분에 도착해요.',
      'Men juma kuni soat olti yarimda yetib kelaman.',
      'I arrive on Friday at six thirty.',
      'Я приезжаю в пятницу в шесть тридцать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'arrival'],
  },

  en_s1u4_n4_066_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['I', 'arrive', 'on', 'Friday', 'at', 'six', 'thirty', 'does'],
    answer: 'I arrive on Friday at six thirty',
    answerTranslation: L(
      '저는 금요일 6시 30분에 도착해요.',
      'Men juma kuni soat olti yarimda yetib kelaman.',
      'I arrive on Friday at six thirty.',
      'Я приезжаю в пятницу в шесть тридцать.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'arrival'],
  },

  en_s1u4_n4_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What’s your address?',
    audioText: 'What’s your address?',
    answerTranslation: L(
      '주소가 뭐예요?',
      'Manzilingiz nima?',
      'What’s your address?',
      'Какой у тебя адрес?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'address'],
  },

  en_s1u4_n4_068_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What’s your ___?',
    blankAnswers: ['address'],
    options: ['address', 'price', 'shop', 'pence'],
    answer: 'address',
    answerTranslation: L(
      '주소가 뭐예요?',
      'Manzilingiz nima?',
      'What’s your address?',
      'Какой у тебя адрес?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'address'],
  },

  en_s1u4_n4_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does the bus go near your house?',
    audioText: 'Does the bus go near your house?',
    answerTranslation: L(
      '버스가 네 집 근처까지 가?',
      'Avtobus uyingiz yaqiniga boradimi?',
      'Does the bus go near your house?',
      'Автобус идёт рядом с твоим домом?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'transport'],
  },

  en_s1u4_n4_070_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['Does', 'the', 'bus', 'go', 'near', 'your', 'house', 'goes'],
    answer: 'Does the bus go near your house',
    audioText: 'Does the bus go near your house?',
    answerTranslation: L(
      '버스가 네 집 근처까지 가?',
      'Avtobus uyingiz yaqiniga boradimi?',
      'Does the bus go near your house?',
      'Автобус идёт рядом с твоим домом?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['email', 'transport'],
  },

  en_s1u4_n4_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How much is a bus ticket?',
    audioText: 'How much is a bus ticket?',
    answerTranslation: L(
      '버스표는 얼마야?',
      'Avtobus chiptasi qancha?',
      'How much is a bus ticket?',
      'Сколько стоит билет на автобус?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'ticket', 'price'],
  },

  en_s1u4_n4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How much ___ a bus ticket?',
    blankAnswers: ['is'],
    options: ['is', 'are', 'do', 'does'],
    answer: 'is',
    answerTranslation: L(
      '버스표는 얼마예요?',
      'Avtobus chiptasi qancha?',
      'How much is a bus ticket?',
      'Сколько стоит билет на автобус?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'price'],
  },

  en_s1u4_n4_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My phone number is 0715 284 963.',
    audioText:
      'My phone number is zero seven one five, two eight four, nine six three.',
    answerTranslation: L(
      '제 전화번호는 0715 284 963이에요.',
      'Telefon raqamim 0715 284 963.',
      'My phone number is 0715 284 963.',
      'Мой номер телефона 0715 284 963.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'phone-number'],
  },

  en_s1u4_n4_074_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'user', text: 'I arrive on Friday evening.' },
      { speaker: 'user', text: 'What’s your address?' },
    ],
    options: [
      'My address is 18 Green Street.',
      'My address eighteen is street.',
      'I address is Friday.',
      'My street does eighteen.',
    ],
    answer: 'My address is 18 Green Street.',
    answerTranslation: L(
      '제 주소는 Green Street 18번지예요.',
      'Mening manzilim Green Street 18.',
      'My address is 18 Green Street.',
      'Мой адрес — 18 Green Street.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'address'],
  },

  en_s1u4_n4_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Call me when you get to the station.',
    audioText: 'Call me when you get to the station.',
    answerTranslation: L(
      '역에 도착하면 전화해.',
      'Vokzalga yetib kelganingizda menga qo‘ng‘iroq qiling.',
      'Call me when you get to the station.',
      'Позвони мне, когда доберёшься до станции.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'travel'],
  },

  en_s1u4_n4_076_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['Call', 'me', 'when', 'you', 'get', 'to', 'the', 'station'],
    answer: 'Call me when you get to the station',
    answerTranslation: L(
      '역에 도착하면 전화해.',
      'Vokzalga yetib kelganingizda menga qo‘ng‘iroq qiling.',
      'Call me when you get to the station.',
      'Позвони мне, когда доберёшься до станции.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'travel'],
  },

  en_s1u4_n4_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can’t wait to see you!',
    audioText: 'Can’t wait to see you!',
    answerTranslation: L(
      '빨리 만나고 싶어!',
      'Sizni ko‘rishni sabrsizlik bilan kutyapman!',
      'Can’t wait to see you!',
      'Не могу дождаться встречи!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'ending'],
  },

  en_s1u4_n4_078_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '친구에게 보내는 이메일의 자연스러운 마무리를 고르세요.',
      'Do‘stga yozilgan emailning tabiiy yakunini tanlang.',
      'Choose a natural ending for an informal email.',
      'Выберите естественное завершение неформального письма.',
    ),
    sentenceTemplate: '___ to see you!',
    blankAnswers: ['Can’t wait'],
    options: ['Can’t wait', 'Can I help', 'How much', 'Is that everything'],
    answer: 'Can’t wait',
    answerTranslation: L(
      '빨리 만나고 싶어!',
      'Sizni ko‘rishni sabrsizlik bilan kutyapman!',
      'Can’t wait to see you!',
      'Не могу дождаться встречи!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'ending'],
  },

  en_s1u4_n4_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'Hi, Mina. How are you? I arrive on Saturday at four. Does the bus go near your house? What’s your address? Can’t wait to see you!',
    audioText:
      'Hi, Mina. How are you? I arrive on Saturday at four. Does the bus go near your house? What’s your address? Can’t wait to see you!',
    answerTranslation: L(
      '안녕, Mina. 잘 지내? 나는 토요일 4시에 도착해. 버스가 네 집 근처까지 가? 주소가 뭐야? 빨리 만나고 싶어!',
      'Salom, Mina. Qalaysan? Men shanba kuni soat to‘rtda yetib kelaman. Avtobus uying yaqiniga boradimi? Manziling nima? Seni ko‘rishni sabrsizlik bilan kutyapman!',
      'Hi, Mina. How are you? I arrive on Saturday at four. Does the bus go near your house? What’s your address? Can’t wait to see you!',
      'Привет, Мина. Как дела? Я приезжаю в субботу в четыре. Автобус идёт рядом с твоим домом? Какой у тебя адрес? Не могу дождаться встречи!',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'complete-email'],
  },

  en_s1u4_n4_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '이메일의 마지막 부분으로 가장 자연스러운 것을 고르세요.',
      'Emailning oxiri uchun eng tabiiy variantni tanlang.',
      'Choose the most natural ending for the email.',
      'Выберите наиболее естественное завершение письма.',
    ),
    dialogLines: [
      {
        speaker: 'user',
        text: 'Hi, Leo. Thanks for your email. I arrive on Thursday evening. My phone number is 0742 615 830.',
      },
    ],
    options: [
      'Can’t wait to see you! Love, Hana',
      'Can I help you? Is that everything?',
      'How much are these? I’ll take them.',
      'Do you have any umbrellas? Yes, please.',
    ],
    answer: 'Can’t wait to see you! Love, Hana',
    answerTranslation: L(
      '빨리 만나고 싶어! 사랑을 담아, Hana',
      'Seni ko‘rishni sabrsizlik bilan kutyapman! Sevgilar bilan, Hana',
      'Can’t wait to see you! Love, Hana',
      'Не могу дождаться встречи! С любовью, Хана',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['email', 'ending', 'final'],
  },
};

export const EN_S1_UNIT4_NODE4 = {
  title: L(
    '가게와 이메일',
    'Do‘kon va email',
    'Shopping and emails',
    'Магазин и электронные письма',
  ),
  section: 1,
  unit: 4,
  order: 4,
  isActive: true,

  lessons: [
    {
      title: L(
        '가게에서 물건 찾기',
        'Do‘konda buyum so‘rash',
        'In a shop',
        'В магазине',
      ),
      description: L(
        '가게 종류를 익히고 Do you have...?, Can I help you?, Is that everything? 같은 표현으로 물건을 찾고 요청해요.',
        'Do‘kon turlarini o‘rganib, Do you have...?, Can I help you? va Is that everything? kabi iboralar bilan buyum so‘raysiz.',
        'Learn common shops and use Do you have...?, Can I help you? and Is that everything? to ask for things.',
        'Учимся называть магазины и использовать Do you have...?, Can I help you? и Is that everything?.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 1,
      questions: [
        'en_s1u4_n4_001_speaking',
        'en_s1u4_n4_002_fill_in_blank',
        'en_s1u4_n4_003_speaking',
        'en_s1u4_n4_004_fill_in_blank',
        'en_s1u4_n4_005_speaking',
        'en_s1u4_n4_006_word_arrange',
        'en_s1u4_n4_007_speaking',
        'en_s1u4_n4_008_dialog_complete',
        'en_s1u4_n4_009_speaking',
        'en_s1u4_n4_010_fill_in_blank',
        'en_s1u4_n4_011_speaking',
        'en_s1u4_n4_012_reply_builder',
        'en_s1u4_n4_013_speaking',
        'en_s1u4_n4_014_dialog_complete',
        'en_s1u4_n4_015_speaking',
        'en_s1u4_n4_016_reply_builder',
        'en_s1u4_n4_017_speaking',
        'en_s1u4_n4_018_translate_builder',
        'en_s1u4_n4_019_speaking',
        'en_s1u4_n4_020_dialog_complete',
      ],
    },

    {
      title: L(
        '가격 묻고 구매하기',
        'Narx so‘rash va xarid qilish',
        'Prices and buying',
        'Цены и покупки',
      ),
      description: L(
        'How much is/are...?로 가격을 묻고 한 숫자·두 숫자로 들리는 가격을 구별한 뒤 I’ll take it/them으로 구매 의사를 말해요.',
        'How much is/are...? bilan narx so‘rab, bir va ikki sonli narxlarni tinglab farqlaysiz hamda I’ll take it/them bilan xarid qilasiz.',
        'Ask prices with How much is/are...?, understand one- and two-number prices and use I’ll take it/them.',
        'Спрашиваем цену с How much is/are...?, различаем цены из одного и двух чисел и используем I’ll take it/them.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 2,
      questions: [
        'en_s1u4_n4_021_speaking',
        'en_s1u4_n4_022_fill_in_blank',
        'en_s1u4_n4_023_speaking',
        'en_s1u4_n4_024_fill_in_blank',
        'en_s1u4_n4_025_speaking',
        'en_s1u4_n4_026_fill_in_blank',
        'en_s1u4_n4_027_speaking',
        'en_s1u4_n4_028_word_arrange',
        'en_s1u4_n4_029_speaking',
        'en_s1u4_n4_030_fill_in_blank',
        'en_s1u4_n4_031_speaking',
        'en_s1u4_n4_032_fill_in_blank',
        'en_s1u4_n4_033_speaking',
        'en_s1u4_n4_034_dialog_complete',
        'en_s1u4_n4_035_speaking',
        'en_s1u4_n4_036_reply_builder',
        'en_s1u4_n4_037_speaking',
        'en_s1u4_n4_038_fill_in_blank',
        'en_s1u4_n4_039_speaking',
        'en_s1u4_n4_040_dialog_complete',
      ],
    },

    {
      title: L(
        '기본 문장부호',
        'Asosiy tinish belgilari',
        'Basic punctuation',
        'Основная пунктуация',
      ),
      description: L(
        '마침표, 물음표, 쉼표, 아포스트로피, 느낌표의 역할을 익히고 이메일 문장을 올바르게 구분해요.',
        'Nuqta, so‘roq belgisi, vergul, apostrof va undov belgisining vazifasini o‘rganib, email gaplarini to‘g‘ri yozasiz.',
        'Learn how to use full stops, question marks, commas, apostrophes and exclamation marks in an informal email.',
        'Учимся использовать точки, вопросительные знаки, запятые, апострофы и восклицательные знаки.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 3,
      questions: [
        'en_s1u4_n4_041_speaking',
        'en_s1u4_n4_042_fill_in_blank',
        'en_s1u4_n4_043_speaking',
        'en_s1u4_n4_044_fill_in_blank',
        'en_s1u4_n4_045_speaking',
        'en_s1u4_n4_046_fill_in_blank',
        'en_s1u4_n4_047_speaking',
        'en_s1u4_n4_048_fill_in_blank',
        'en_s1u4_n4_049_speaking',
        'en_s1u4_n4_050_fill_in_blank',
        'en_s1u4_n4_051_speaking',
        'en_s1u4_n4_052_fill_in_blank',
        'en_s1u4_n4_053_speaking',
        'en_s1u4_n4_054_word_arrange',
        'en_s1u4_n4_055_speaking',
        'en_s1u4_n4_056_fill_in_blank',
        'en_s1u4_n4_057_speaking',
        'en_s1u4_n4_058_fill_in_blank',
        'en_s1u4_n4_059_speaking',
        'en_s1u4_n4_060_dialog_complete',
      ],
    },

    {
      title: L(
        '친구에게 이메일 쓰기',
        'Do‘stga email yozish',
        'An informal email',
        'Неформальное письмо',
      ),
      description: L(
        '친구에게 인사하고 도착 시간·주소·교통·표 가격·전화번호를 묻고 알려 준 뒤 자연스럽게 이메일을 마무리해요.',
        'Do‘stingiz bilan salomlashib, yetib kelish vaqti, manzil, transport, chipta narxi va telefon raqami haqida so‘raysiz va emailni tabiiy yakunlaysiz.',
        'Write an informal email with a greeting, arrival information, travel questions, contact details and a natural ending.',
        'Пишем неформальное письмо с приветствием, временем прибытия, вопросами о дороге, контактами и естественным завершением.',
      ),
      category: LessonCategory.EXPRESSION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u4_n4_061_speaking',
        'en_s1u4_n4_062_fill_in_blank',
        'en_s1u4_n4_063_speaking',
        'en_s1u4_n4_064_reply_builder',
        'en_s1u4_n4_065_speaking',
        'en_s1u4_n4_066_translate_builder',
        'en_s1u4_n4_067_speaking',
        'en_s1u4_n4_068_fill_in_blank',
        'en_s1u4_n4_069_speaking',
        'en_s1u4_n4_070_word_arrange',
        'en_s1u4_n4_071_speaking',
        'en_s1u4_n4_072_fill_in_blank',
        'en_s1u4_n4_073_speaking',
        'en_s1u4_n4_074_dialog_complete',
        'en_s1u4_n4_075_speaking',
        'en_s1u4_n4_076_translate_builder',
        'en_s1u4_n4_077_speaking',
        'en_s1u4_n4_078_fill_in_blank',
        'en_s1u4_n4_079_speaking',
        'en_s1u4_n4_080_dialog_complete',
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Section 1 · Unit 4 · Node 5
// 4.5 Video + Review
//
// 실제 source:
// - Coursebook 4.5 Video: A day in the life of a journalist
// - Workbook: Review Units 3 and 4
//
// LessonCategory:
// VOCABULARY / GRAMMAR / EXPRESSION
// CONVERSATION / LISTENING / TOPIK
//
// Coverage
// - verb phrases:
//   cook dinner
//   listen to the news
//   write a story
//   play the guitar
//   go by bike
//   have breakfast
//
// - daily routine listening:
//   get up
//   check emails
//   read the news
//   have breakfast
//   start work
//   work at home
//   write a story
//   go home
//   listen to an interview
//   watch TV
//
// - routine questions:
//   Do you ...?
//   What time do you ...?
//   What do you ...?
//   What transport do you ...?
//   Where do you ...?
//
// - report another person's routine
//
// Review Units 3–4:
// - have got
// - possessive 's
// - adjective opposites
// - family
// - present simple positive / negative
// - do / does / don't / doesn't
// - transport
// - shop functional language
//
// 4 lessons × 20 = 80
// ─────────────────────────────────────────────────────────────

export const EN_S1_UNIT4_NODE5_WORDS = [
  {
    code: 'en-job-actor',
    english: 'actor',
    senseKey: 'person-who-acts-in-films-or-plays',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '배우',
      'aktyor',
      'a person who acts in films, television or plays',
      'актёр',
    ),
    examples: [
      {
        english: 'Matt Damon is a film actor.',
        translations: L(
          '맷 데이먼은 영화배우예요.',
          'Matt Damon kino aktyori.',
          'Matt Damon is a film actor.',
          'Мэтт Дэймон — киноактёр.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈæktə(r)/',
      ttsText: 'actor',
    },
    media: {
      emoji: '🎭',
      imageUrl: '',
      imageAlt: L('배우', 'aktyor', 'an actor', 'актёр'),
    },
    tags: ['jobs', 'film'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-sport-baseball',
    english: 'baseball',
    senseKey: 'sport-played-with-bat-and-ball',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '야구',
      'beysbol',
      'a sport played with a bat and ball',
      'бейсбол',
    ),
    examples: [
      {
        english: 'He watches baseball at the weekend.',
        translations: L(
          '그는 주말에 야구를 봐요.',
          'U dam olish kunlari beysbol ko‘radi.',
          'He watches baseball at the weekend.',
          'По выходным он смотрит бейсбол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbeɪsbɔːl/',
      ttsText: 'baseball',
    },
    media: {
      emoji: '⚾',
      imageUrl: '',
      imageAlt: L('야구', 'beysbol', 'baseball', 'бейсбол'),
    },
    tags: ['sports', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-sport-basketball',
    english: 'basketball',
    senseKey: 'sport-with-ball-and-baskets',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '농구',
      'basketbol',
      'a sport in which players throw a ball through a basket',
      'баскетбол',
    ),
    examples: [
      {
        english: 'He plays basketball when he has time.',
        translations: L(
          '그는 시간이 있을 때 농구를 해요.',
          'U vaqti bo‘lsa basketbol o‘ynaydi.',
          'He plays basketball when he has time.',
          'Когда у него есть время, он играет в баскетбол.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈbɑːskɪtbɔːl/',
      ttsText: 'basketball',
    },
    media: {
      emoji: '🏀',
      imageUrl: '',
      imageAlt: L('농구', 'basketbol', 'basketball', 'баскетбол'),
    },
    tags: ['sports', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-verb-call',
    english: 'call',
    senseKey: 'contact-someone-by-phone',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '전화하다',
      'telefon qilmoq',
      'to contact someone by phone',
      'звонить',
    ),
    examples: [
      {
        english: 'Call me when you get to the hotel.',
        translations: L(
          '호텔에 도착하면 전화해 주세요.',
          'Mehmonxonaga yetib borganingizda menga telefon qiling.',
          'Call me when you get to the hotel.',
          'Позвони мне, когда доберёшься до отеля.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kɔːl/',
      ttsText: 'call',
    },
    media: {
      emoji: '📞',
      imageUrl: '',
      imageAlt: L(
        '전화하는 모습',
        'telefon qilish',
        'making a phone call',
        'телефонный звонок',
      ),
    },
    tags: ['communication', 'verbs'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-money-cent',
    english: 'cent',
    senseKey: 'one-hundredth-of-dollar-or-euro',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '센트',
      'sent',
      'a unit of money equal to one hundredth of a dollar or euro',
      'цент',
    ),
    examples: [
      {
        english: 'It is two dollars fifty cents.',
        translations: L(
          '2달러 50센트예요.',
          'Bu ikki dollar ellik sent.',
          'It is two dollars fifty cents.',
          'Это два доллара пятьдесят центов.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/sent/',
      ttsText: 'cent',
    },
    media: {
      emoji: '🪙',
      imageUrl: '',
      imageAlt: L('동전', 'tanga', 'a coin', 'монета'),
    },
    tags: ['money', 'prices'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-media-comics',
    english: 'comics',
    senseKey: 'stories-told-with-pictures-and-words',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '만화',
      'komikslar',
      'stories told using pictures and words',
      'комиксы',
    ),
    examples: [
      {
        english: 'He likes Spider-Man comics.',
        translations: L(
          '그는 스파이더맨 만화를 좋아해요.',
          'U Spider-Man komikslarini yoqtiradi.',
          'He likes Spider-Man comics.',
          'Ему нравятся комиксы о Человеке-пауке.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkɒmɪks/',
      ttsText: 'comics',
    },
    media: {
      emoji: '📚',
      imageUrl: '',
      imageAlt: L('만화책', 'komikslar', 'comics', 'комиксы'),
    },
    tags: ['media', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-denmark',
    english: 'Denmark',
    senseKey: 'country-denmark',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('덴마크', 'Daniya', 'a country in northern Europe', 'Дания'),
    examples: [
      {
        english: 'A lot of people cycle to work in Denmark.',
        translations: L(
          '덴마크에서는 많은 사람들이 자전거로 출근해요.',
          'Daniyada ko‘p odamlar ishga velosipedda boradi.',
          'A lot of people cycle to work in Denmark.',
          'В Дании многие ездят на работу на велосипеде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈdenmɑːk/',
      ttsText: 'Denmark',
    },
    media: {
      emoji: '🇩🇰',
      imageUrl: '',
      imageAlt: L(
        '덴마크 국기',
        'Daniya bayrog‘i',
        'the flag of Denmark',
        'флаг Дании',
      ),
    },
    tags: ['countries', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-early',
    english: 'early',
    senseKey: 'before-usual-or-expected-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L('일찍', 'erta', 'before the usual or expected time', 'рано'),
    examples: [
      {
        english: 'Does she get up early?',
        translations: L(
          '그녀는 일찍 일어나요?',
          'U erta turadimi?',
          'Does she get up early?',
          'Она рано встаёт?',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈɜːli/',
      ttsText: 'early',
    },
    media: {
      emoji: '🌅',
      imageUrl: '',
      imageAlt: L('이른 아침', 'erta tong', 'early morning', 'раннее утро'),
    },
    tags: ['time', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-place-factory',
    english: 'factory',
    senseKey: 'building-where-goods-are-made',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '공장',
      'zavod',
      'a building where goods are made',
      'фабрика; завод',
    ),
    examples: [
      {
        english: 'John works in a car factory.',
        translations: L(
          '존은 자동차 공장에서 일해요.',
          'John avtomobil zavodida ishlaydi.',
          'John works in a car factory.',
          'Джон работает на автомобильном заводе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfæktri/',
      ttsText: 'factory',
    },
    media: {
      emoji: '🏭',
      imageUrl: '',
      imageAlt: L('공장', 'zavod', 'a factory', 'завод'),
    },
    tags: ['places', 'work'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-favourite',
    english: 'favourite',
    senseKey: 'liked-more-than-others',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '가장 좋아하는',
      'eng sevimli',
      'liked more than all others',
      'любимый',
    ),
    examples: [
      {
        english: 'My favourite day is Saturday.',
        translations: L(
          '제가 가장 좋아하는 요일은 토요일이에요.',
          'Mening eng sevimli kunim shanba.',
          'My favourite day is Saturday.',
          'Мой любимый день — суббота.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈfeɪvərɪt/',
      ttsText: 'favourite',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: L(
        '가장 좋아하는 것을 나타내는 하트',
        'eng sevimli narsani bildiruvchi yurak',
        'a favourite thing',
        'любимая вещь',
      ),
    },
    tags: ['adjectives', 'preferences'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-music-guitar',
    english: 'guitar',
    senseKey: 'stringed-musical-instrument',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('기타', 'gitara', 'a musical instrument with strings', 'гитара'),
    examples: [
      {
        english: 'My sister plays the guitar.',
        translations: L(
          '제 자매는 기타를 쳐요.',
          'Singlim gitara chaladi.',
          'My sister plays the guitar.',
          'Моя сестра играет на гитаре.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡɪˈtɑː(r)/',
      ttsText: 'guitar',
    },
    media: {
      emoji: '🎸',
      imageUrl: '',
      imageAlt: L('기타', 'gitara', 'a guitar', 'гитара'),
    },
    tags: ['music', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-kenya',
    english: 'Kenya',
    senseKey: 'country-kenya',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('케냐', 'Keniya', 'a country in East Africa', 'Кения'),
    examples: [
      {
        english: 'She lives in Nairobi in Kenya.',
        translations: L(
          '그녀는 케냐 나이로비에 살아요.',
          'U Keniyaning Nayrobi shahrida yashaydi.',
          'She lives in Nairobi in Kenya.',
          'Она живёт в Найроби, Кения.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈkenjə/',
      ttsText: 'Kenya',
    },
    media: {
      emoji: '🇰🇪',
      imageUrl: '',
      imageAlt: L(
        '케냐 국기',
        'Keniya bayrog‘i',
        'the flag of Kenya',
        'флаг Кении',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-noun-lives',
    english: 'lives',
    senseKey: 'plural-of-life',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '삶들; 생활 방식',
      'hayotlar; turmush tarzlari',
      'the plural of life; the ways people live',
      'жизни; образ жизни',
    ),
    examples: [
      {
        english: 'They have very different lives.',
        translations: L(
          '그들은 아주 다른 삶을 살아요.',
          'Ularning hayotlari juda boshqacha.',
          'They have very different lives.',
          'У них очень разные жизни.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/laɪvz/',
      ttsText: 'lives',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '서로 다른 삶을 사는 사람들',
        'turli hayot kechirayotgan odamlar',
        'people with different lives',
        'люди с разным образом жизни',
      ),
    },
    tags: ['life', 'plural'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-named',
    english: 'named',
    senseKey: 'having-particular-name',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '~라는 이름의',
      'ismli; deb atalgan',
      'having a particular name',
      'по имени; названный',
    ),
    examples: [
      {
        english: 'She has a daughter named Akinyi.',
        translations: L(
          '그녀에게는 아키니라는 이름의 딸이 있어요.',
          'Uning Akinyi ismli qizi bor.',
          'She has a daughter named Akinyi.',
          'У неё есть дочь по имени Акиньи.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/neɪmd/',
      ttsText: 'named',
    },
    media: {
      emoji: '🏷️',
      imageUrl: '',
      imageAlt: L(
        '이름표',
        'ism yozilgan yorliq',
        'a name label',
        'именная табличка',
      ),
    },
    tags: ['names', 'description'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adjective-same',
    english: 'same',
    senseKey: 'not-different',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '같은',
      'bir xil',
      'not different; exactly alike',
      'одинаковый; тот же',
    ),
    examples: [
      {
        english: 'They have the same father.',
        translations: L(
          '그들은 아버지가 같아요.',
          'Ularning otasi bir.',
          'They have the same father.',
          'У них один и тот же отец.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/seɪm/',
      ttsText: 'same',
    },
    media: {
      emoji: '🟰',
      imageUrl: '',
      imageAlt: L(
        '같음을 나타내는 표시',
        'bir xillik belgisi',
        'two things that are the same',
        'две одинаковые вещи',
      ),
    },
    tags: ['adjectives', 'comparison'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-switzerland',
    english: 'Switzerland',
    senseKey: 'country-switzerland',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '스위스',
      'Shveytsariya',
      'a country in central Europe',
      'Швейцария',
    ),
    examples: [
      {
        english: 'A lot of people in Switzerland go to work by train.',
        translations: L(
          '스위스에서는 많은 사람들이 기차로 출근해요.',
          'Shveytsariyada ko‘p odamlar ishga poyezdda boradi.',
          'A lot of people in Switzerland go to work by train.',
          'В Швейцарии многие ездят на работу на поезде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈswɪtsələnd/',
      ttsText: 'Switzerland',
    },
    media: {
      emoji: '🇨🇭',
      imageUrl: '',
      imageAlt: L(
        '스위스 국기',
        'Shveytsariya bayrog‘i',
        'the flag of Switzerland',
        'флаг Швейцарии',
      ),
    },
    tags: ['countries', 'transport'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-sport-tennis',
    english: 'tennis',
    senseKey: 'sport-played-with-rackets-and-ball',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '테니스',
      'tennis',
      'a sport played with rackets and a ball',
      'теннис',
    ),
    examples: [
      {
        english: 'Valentina plays tennis at the weekend.',
        translations: L(
          '발렌티나는 주말에 테니스를 쳐요.',
          'Valentina dam olish kunlari tennis o‘ynaydi.',
          'Valentina plays tennis at the weekend.',
          'Валентина играет в теннис по выходным.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈtenɪs/',
      ttsText: 'tennis',
    },
    media: {
      emoji: '🎾',
      imageUrl: '',
      imageAlt: L('테니스', 'tennis', 'tennis', 'теннис'),
    },
    tags: ['sports', 'free-time'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-adverb-together',
    english: 'together',
    senseKey: 'with-another-person-or-people',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '함께',
      'birga',
      'with another person or other people',
      'вместе',
    ),
    examples: [
      {
        english: 'We have dinner together.',
        translations: L(
          '우리는 함께 저녁을 먹어요.',
          'Biz kechki ovqatni birga yeymiz.',
          'We have dinner together.',
          'Мы ужинаем вместе.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/təˈɡeðə(r)/',
      ttsText: 'together',
    },
    media: {
      emoji: '👥',
      imageUrl: '',
      imageAlt: L(
        '함께 있는 사람들',
        'birga turgan odamlar',
        'people together',
        'люди вместе',
      ),
    },
    tags: ['adverbs', 'routine'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-country-vietnam',
    english: 'Vietnam',
    senseKey: 'country-vietnam',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L('베트남', 'Vyetnam', 'a country in Southeast Asia', 'Вьетнам'),
    examples: [
      {
        english: 'My grandparents live in Vietnam.',
        translations: L(
          '제 조부모님은 베트남에 살아요.',
          'Buvim va bobom Vyetnamda yashaydi.',
          'My grandparents live in Vietnam.',
          'Мои бабушка и дедушка живут во Вьетнаме.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˌvjetˈnæm/',
      ttsText: 'Vietnam',
    },
    media: {
      emoji: '🇻🇳',
      imageUrl: '',
      imageAlt: L(
        '베트남 국기',
        'Vyetnam bayrog‘i',
        'the flag of Vietnam',
        'флаг Вьетнама',
      ),
    },
    tags: ['countries'],
    difficulty: 1,
    isCore: true,
  },
  {
    code: 'en-routine-cook-dinner',
    english: 'cook dinner',
    senseKey: 'prepare-evening-meal',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '저녁을 요리하다',
      'kechki ovqat tayyorlamoq',
      'to prepare the evening meal',
      'готовить ужин',
    ),
    examples: [
      {
        english: 'I cook dinner at home.',
        translations: L(
          '저는 집에서 저녁을 요리해요.',
          'Men uyda kechki ovqat tayyorlayman.',
          'I cook dinner at home.',
          'Я готовлю ужин дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/kʊk ˈdɪnə/',
      ttsText: 'cook dinner',
    },
    media: {
      emoji: '🍳',
      imageUrl: '',
      imageAlt: L(
        '저녁을 요리하는 사람',
        'kechki ovqat tayyorlayotgan odam',
        'a person cooking dinner',
        'человек готовит ужин',
      ),
    },
    tags: ['daily-routine', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-listen-to-news',
    english: 'listen to the news',
    senseKey: 'listen-news-programme',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '뉴스를 듣다',
      'yangiliklarni tinglamoq',
      'to listen to a news programme',
      'слушать новости',
    ),
    examples: [
      {
        english: 'We listen to the news in the morning.',
        translations: L(
          '우리는 아침에 뉴스를 들어요.',
          'Biz ertalab yangiliklarni tinglaymiz.',
          'We listen to the news in the morning.',
          'Мы слушаем новости утром.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ˈlɪsn tə ðə njuːz/',
      ttsText: 'listen to the news',
    },
    media: {
      emoji: '🎧',
      imageUrl: '',
      imageAlt: L(
        '뉴스를 듣는 사람',
        'yangiliklarni tinglayotgan odam',
        'a person listening to the news',
        'человек слушает новости',
      ),
    },
    tags: ['daily-routine', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-write-story',
    english: 'write a story',
    senseKey: 'create-written-story',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '글·이야기를 쓰다',
      'hikoya yozmoq',
      'to write a story or article',
      'писать историю',
    ),
    examples: [
      {
        english: 'She writes a story at home.',
        translations: L(
          '그녀는 집에서 글을 써요.',
          'U uyda hikoya yozadi.',
          'She writes a story at home.',
          'Она пишет историю дома.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/raɪt ə ˈstɔːri/',
      ttsText: 'write a story',
    },
    media: {
      emoji: '✍️',
      imageUrl: '',
      imageAlt: L(
        '글을 쓰는 사람',
        'hikoya yozayotgan odam',
        'a person writing a story',
        'человек пишет историю',
      ),
    },
    tags: ['daily-routine', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-routine-play-guitar',
    english: 'play the guitar',
    senseKey: 'play-guitar-instrument',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '기타를 치다',
      'gitara chalmoq',
      'to make music with a guitar',
      'играть на гитаре',
    ),
    examples: [
      {
        english: 'He plays the guitar in the evening.',
        translations: L(
          '그는 저녁에 기타를 쳐요.',
          'U kechqurun gitara chaladi.',
          'He plays the guitar in the evening.',
          'Он играет на гитаре вечером.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/pleɪ ðə ɡɪˈtɑː/',
      ttsText: 'play the guitar',
    },
    media: {
      emoji: '🎸',
      imageUrl: '',
      imageAlt: L(
        '기타를 연주하는 사람',
        'gitara chalayotgan odam',
        'a person playing the guitar',
        'человек играет на гитаре',
      ),
    },
    tags: ['daily-routine', 'free-time', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },

  {
    code: 'en-transport-go-by-bike',
    english: 'go by bike',
    senseKey: 'travel-by-bicycle',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '자전거로 가다',
      'velosipedda bormoq',
      'to travel somewhere by bicycle',
      'ехать на велосипеде',
    ),
    examples: [
      {
        english: 'I go to work by bike.',
        translations: L(
          '저는 자전거로 출근해요.',
          'Men ishga velosipedda boraman.',
          'I go to work by bike.',
          'Я езжу на работу на велосипеде.',
        ),
      },
    ],
    pronunciation: {
      ipa: '/ɡəʊ baɪ baɪk/',
      ttsText: 'go by bike',
    },
    media: {
      emoji: '🚲',
      imageUrl: '',
      imageAlt: L(
        '자전거로 이동하는 사람',
        'velosipedda ketayotgan odam',
        'a person travelling by bike',
        'человек едет на велосипеде',
      ),
    },
    tags: ['transport', 'verb-phrases'],
    difficulty: 1,
    isCore: true,
  },
];

export const EN_S1_UNIT4_NODE5_QUESTIONS = {
  // ===========================================================
  // Lesson 1 · A journalist's day
  // ===========================================================

  en_s1u4_n5_001_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Cook dinner.',
    audioText: 'Cook dinner.',
    answerTranslation: L(
      '저녁을 요리하다.',
      'Kechki ovqat tayyorlamoq.',
      'Cook dinner.',
      'Готовить ужин.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_002_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ dinner',
    blankAnswers: ['cook'],
    options: ['cook', 'listen', 'write', 'play'],
    answer: 'cook',
    answerTranslation: L(
      '저녁을 요리하다',
      'kechki ovqat tayyorlamoq',
      'cook dinner',
      'готовить ужин',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_003_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Listen to the news.',
    audioText: 'Listen to the news.',
    answerTranslation: L(
      '뉴스를 듣다.',
      'Yangiliklarni tinglamoq.',
      'Listen to the news.',
      'Слушать новости.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_004_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['listen', 'to', 'the', 'news', 'story', 'play'],
    answer: 'listen to the news',
    audioText: 'Listen to the news.',
    answerTranslation: L(
      '뉴스를 듣다.',
      'Yangiliklarni tinglamoq.',
      'Listen to the news.',
      'Слушать новости.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_005_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Write a story.',
    audioText: 'Write a story.',
    answerTranslation: L(
      '글을 쓰다.',
      'Hikoya yozmoq.',
      'Write a story.',
      'Писать историю.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_006_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ a story',
    blankAnswers: ['write'],
    options: ['write', 'listen', 'cook', 'go'],
    answer: 'write',
    answerTranslation: L(
      '글을 쓰다',
      'hikoya yozmoq',
      'write a story',
      'писать историю',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_007_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Play the guitar.',
    audioText: 'Play the guitar.',
    answerTranslation: L(
      '기타를 치다.',
      'Gitara chalmoq.',
      'Play the guitar.',
      'Играть на гитаре.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'verb-phrases'],
  },

  en_s1u4_n5_008_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'plays', 'the', 'guitar', 'in', 'the', 'evening', 'play'],
    answer: 'She plays the guitar in the evening',
    answerTranslation: L(
      '그녀는 저녁에 기타를 쳐요.',
      'U kechqurun gitara chaladi.',
      'She plays the guitar in the evening.',
      'Она играет на гитаре вечером.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'free-time'],
  },

  en_s1u4_n5_009_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Go by bike.',
    audioText: 'Go by bike.',
    answerTranslation: L(
      '자전거로 가다.',
      'Velosipedda bormoq.',
      'Go by bike.',
      'Ехать на велосипеде.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'transport'],
  },

  en_s1u4_n5_010_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'I go to work ___ bike.',
    blankAnswers: ['by'],
    options: ['by', 'in', 'at', 'for'],
    answer: 'by',
    answerTranslation: L(
      '저는 자전거로 출근해요.',
      'Men ishga velosipedda boraman.',
      'I go to work by bike.',
      'Я езжу на работу на велосипеде.',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['video', 'transport'],
  },

  en_s1u4_n5_011_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The journalist gets up at six o’clock.',
    audioText: 'The journalist gets up at six o’clock.',
    answerTranslation: L(
      '그 기자는 6시에 일어나요.',
      'Jurnalist soat oltida turadi.',
      'The journalist gets up at six o’clock.',
      'Журналист встаёт в шесть часов.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'routine'],
  },

  en_s1u4_n5_012_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '영상의 하루 일과와 맞는 문장을 고르세요.',
      'Videodagi kun tartibiga mos gapni tanlang.',
      'Choose the sentence that matches the routine in the video.',
      'Выберите предложение, соответствующее распорядку в видео.',
    ),
    dialogLines: [
      { speaker: 'npc', text: 'What does the journalist do after getting up?' },
    ],
    options: [
      'She checks her emails and reads the news.',
      'She goes to bed again.',
      'She cooks dinner immediately.',
      'She goes shopping.',
    ],
    answer: 'She checks her emails and reads the news.',
    answerTranslation: L(
      '이메일을 확인하고 뉴스를 읽어요.',
      'U elektron pochtasini tekshiradi va yangiliklarni o‘qiydi.',
      'She checks her emails and reads the news.',
      'Она проверяет почту и читает новости.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'detail'],
  },

  en_s1u4_n5_013_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She has breakfast and starts work.',
    audioText: 'She has breakfast and starts work.',
    answerTranslation: L(
      '그녀는 아침을 먹고 일을 시작해요.',
      'U nonushta qiladi va ishni boshlaydi.',
      'She has breakfast and starts work.',
      'Она завтракает и начинает работу.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'routine'],
  },

  en_s1u4_n5_014_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She works at ___.',
    blankAnswers: ['home'],
    options: ['home', 'school', 'hospital', 'station'],
    answer: 'home',
    answerTranslation: L(
      '그녀는 집에서 일해요.',
      'U uyda ishlaydi.',
      'She works at home.',
      'Она работает дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'detail'],
  },

  en_s1u4_n5_015_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She writes a story.',
    audioText: 'She writes a story.',
    answerTranslation: L(
      '그녀는 글을 써요.',
      'U hikoya yozadi.',
      'She writes a story.',
      'Она пишет историю.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'routine'],
  },

  en_s1u4_n5_016_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['She', 'writes', 'a', 'story', 'at', 'home', 'write'],
    answer: 'She writes a story at home',
    audioText: 'She writes a story at home.',
    answerTranslation: L(
      '그녀는 집에서 글을 써요.',
      'U uyda hikoya yozadi.',
      'She writes a story at home.',
      'Она пишет историю дома.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'routine'],
  },

  en_s1u4_n5_017_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'In the evening, she plays the guitar and watches TV.',
    audioText: 'In the evening, she plays the guitar and watches TV.',
    answerTranslation: L(
      '저녁에는 기타를 치고 TV를 봐요.',
      'Kechqurun u gitara chaladi va televizor ko‘radi.',
      'In the evening, she plays the guitar and watches TV.',
      'Вечером она играет на гитаре и смотрит телевизор.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'evening'],
  },

  en_s1u4_n5_018_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'In the evening, she ___ TV.',
    blankAnswers: ['watches'],
    options: ['watches', 'watch', 'listens', 'writes'],
    answer: 'watches',
    answerTranslation: L(
      '저녁에 TV를 봐요.',
      'Kechqurun u televizor ko‘radi.',
      'She watches TV in the evening.',
      'Вечером она смотрит телевизор.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'present-simple'],
  },

  en_s1u4_n5_019_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'She gets up early, checks her emails, works at home and writes stories.',
    audioText:
      'She gets up early, checks her emails, works at home and writes stories.',
    answerTranslation: L(
      '그녀는 일찍 일어나 이메일을 확인하고 집에서 일하며 글을 써요.',
      'U erta turadi, elektron pochtasini tekshiradi, uyda ishlaydi va hikoyalar yozadi.',
      'She gets up early, checks her emails, works at home and writes stories.',
      'Она рано встаёт, проверяет почту, работает дома и пишет истории.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'summary'],
  },

  en_s1u4_n5_020_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: L(
      '영상 내용의 요약으로 가장 알맞은 것을 고르세요.',
      'Video mazmunining eng to‘g‘ri qisqa xulosasini tanlang.',
      'Choose the best summary of the video routine.',
      'Выберите лучшее краткое описание распорядка из видео.',
    ),
    dialogLines: [{ speaker: 'npc', text: 'What is the video mainly about?' }],
    options: [
      'A journalist’s working day and evening routine.',
      'A family shopping for clothes.',
      'A student travelling on holiday.',
      'A restaurant menu.',
    ],
    answer: 'A journalist’s working day and evening routine.',
    answerTranslation: L(
      '기자의 업무와 저녁 일과.',
      'Jurnalistning ish kuni va kechki tartibi.',
      'A journalist’s working day and evening routine.',
      'Рабочий день и вечерний распорядок журналиста.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['video', 'gist'],
  },

  // ===========================================================
  // Lesson 2 · Ask about daily routines
  // ===========================================================

  en_s1u4_n5_021_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do you cook dinner?',
    audioText: 'Do you cook dinner?',
    answerTranslation: L(
      '저녁을 요리해요?',
      'Kechki ovqat tayyorlaysizmi?',
      'Do you cook dinner?',
      'Вы готовите ужин?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'do'],
  },

  en_s1u4_n5_022_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ you cook dinner?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Have'],
    answer: 'Do',
    answerTranslation: L(
      '저녁을 요리해요?',
      'Kechki ovqat tayyorlaysizmi?',
      'Do you cook dinner?',
      'Вы готовите ужин?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['routine-questions', 'do'],
  },

  en_s1u4_n5_023_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time do you get up?',
    audioText: 'What time do you get up?',
    answerTranslation: L(
      '몇 시에 일어나요?',
      'Soat nechada turasiz?',
      'What time do you get up?',
      'Во сколько вы встаёте?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'what-time'],
  },

  en_s1u4_n5_024_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['What', 'time', 'do', 'you', 'get', 'up', 'does'],
    answer: 'What time do you get up',
    audioText: 'What time do you get up?',
    answerTranslation: L(
      '몇 시에 일어나요?',
      'Soat nechada turasiz?',
      'What time do you get up?',
      'Во сколько вы встаёте?',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['routine-questions', 'what-time'],
  },

  en_s1u4_n5_025_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What do you have for breakfast?',
    audioText: 'What do you have for breakfast?',
    answerTranslation: L(
      '아침으로 뭘 먹어요?',
      'Nonushtaga nima yeysiz?',
      'What do you have for breakfast?',
      'Что вы едите на завтрак?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'what'],
  },

  en_s1u4_n5_026_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'do', 'you', 'have', 'for', 'breakfast', 'does', 'has'],
    answer: 'What do you have for breakfast',
    answerTranslation: L(
      '아침으로 뭘 먹어요?',
      'Nonushtaga nima yeysiz?',
      'What do you have for breakfast?',
      'Что вы едите на завтрак?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'what'],
  },

  en_s1u4_n5_027_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What transport do you use?',
    audioText: 'What transport do you use?',
    answerTranslation: L(
      '어떤 교통수단을 이용해요?',
      'Qaysi transportdan foydalanasiz?',
      'What transport do you use?',
      'Каким транспортом вы пользуетесь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'transport'],
  },

  en_s1u4_n5_028_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What transport do you ___?',
    blankAnswers: ['use'],
    options: ['use', 'uses', 'using', 'used'],
    answer: 'use',
    answerTranslation: L(
      '어떤 교통수단을 이용해요?',
      'Qaysi transportdan foydalanasiz?',
      'What transport do you use?',
      'Каким транспортом вы пользуетесь?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['routine-questions', 'transport'],
  },

  en_s1u4_n5_029_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Where do you work?',
    audioText: 'Where do you work?',
    answerTranslation: L(
      '어디에서 일해요?',
      'Qayerda ishlaysiz?',
      'Where do you work?',
      'Где вы работаете?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'where'],
  },

  en_s1u4_n5_030_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Where do you work?',
    options: ['I', 'work', 'at', 'home', 'works', 'does', 'do'],
    answer: 'I work at home',
    answerTranslation: L(
      '저는 집에서 일해요.',
      'Men uyda ishlayman.',
      'I work at home.',
      'Я работаю дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'where'],
  },

  en_s1u4_n5_031_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time do you start work?',
    audioText: 'What time do you start work?',
    answerTranslation: L(
      '몇 시에 일을 시작해요?',
      'Soat nechada ish boshlaysiz?',
      'What time do you start work?',
      'Во сколько вы начинаете работу?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'start-work'],
  },

  en_s1u4_n5_032_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'What time do you start work?' }],
    options: [
      'I start work at nine.',
      'I starts work at nine.',
      'I do start works at nine.',
      'I am start work nine.',
    ],
    answer: 'I start work at nine.',
    answerTranslation: L(
      '저는 9시에 일을 시작해요.',
      'Men ishni soat to‘qqizda boshlayman.',
      'I start work at nine.',
      'Я начинаю работу в девять.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'answer'],
  },

  en_s1u4_n5_033_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What time do you finish work?',
    audioText: 'What time do you finish work?',
    answerTranslation: L(
      '몇 시에 일을 끝내요?',
      'Soat nechada ishni tugatasiz?',
      'What time do you finish work?',
      'Во сколько вы заканчиваете работу?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'finish-work'],
  },

  en_s1u4_n5_034_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'What time ___ you finish work?',
    blankAnswers: ['do'],
    options: ['do', 'does', 'are', 'is'],
    answer: 'do',
    answerTranslation: L(
      '몇 시에 일을 끝내요?',
      'Soat nechada ishni tugatasiz?',
      'What time do you finish work?',
      'Во сколько вы заканчиваете работу?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['routine-questions', 'do'],
  },

  en_s1u4_n5_035_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'What do you watch in the evening?',
    audioText: 'What do you watch in the evening?',
    answerTranslation: L(
      '저녁에 뭘 봐요?',
      'Kechqurun nima tomosha qilasiz?',
      'What do you watch in the evening?',
      'Что вы смотрите вечером?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'watch'],
  },

  en_s1u4_n5_036_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['What', 'do', 'you', 'watch', 'in', 'the', 'evening', 'watches'],
    answer: 'What do you watch in the evening',
    answerTranslation: L(
      '저녁에 뭘 봐요?',
      'Kechqurun nima tomosha qilasiz?',
      'What do you watch in the evening?',
      'Что вы смотрите вечером?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'watch'],
  },

  en_s1u4_n5_037_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Do you go out at the weekend?',
    audioText: 'Do you go out at the weekend?',
    answerTranslation: L(
      '주말에 외출해요?',
      'Dam olish kunlari tashqariga chiqasizmi?',
      'Do you go out at the weekend?',
      'Вы куда-нибудь выходите на выходных?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'go-out'],
  },

  en_s1u4_n5_038_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Do you go out at the weekend?',
    options: ['Yes', 'I', 'do', 'with', 'friends', 'does', 'goes'],
    answer: 'Yes I do with friends',
    answerTranslation: L(
      '네. 친구들과 외출해요.',
      'Ha. Do‘stlar bilan chiqaman.',
      'Yes, I do. With friends.',
      'Да. С друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-questions', 'reply'],
  },

  en_s1u4_n5_039_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'My friend gets up at seven, works at home and finishes work at six.',
    audioText:
      'My friend gets up at seven, works at home and finishes work at six.',
    answerTranslation: L(
      '제 친구는 7시에 일어나 집에서 일하고 6시에 일을 끝내요.',
      'Do‘stim soat yettida turadi, uyda ishlaydi va ishni oltida tugatadi.',
      'My friend gets up at seven, works at home and finishes work at six.',
      'Мой друг встаёт в семь, работает дома и заканчивает работу в шесть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-survey', 'report'],
  },

  en_s1u4_n5_040_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      {
        speaker: 'npc',
        text: 'What did you learn about your friend’s routine?',
      },
    ],
    options: [
      'She gets up early and works at home.',
      'She get up early and work at home.',
      'She does gets up and works home.',
      'She is get up early.',
    ],
    answer: 'She gets up early and works at home.',
    answerTranslation: L(
      '그녀는 일찍 일어나고 집에서 일해요.',
      'U erta turadi va uyda ishlaydi.',
      'She gets up early and works at home.',
      'Она рано встаёт и работает дома.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['routine-survey', 'report'],
  },

  // ===========================================================
  // Lesson 3 · Units 3–4 grammar review
  // ===========================================================

  en_s1u4_n5_041_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I’ve got two brothers.',
    audioText: 'I’ve got two brothers.',
    answerTranslation: L(
      '저는 남자 형제가 두 명 있어요.',
      'Mening ikkita akam yoki ukam bor.',
      'I’ve got two brothers.',
      'У меня два брата.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got'],
  },

  en_s1u4_n5_042_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'We ___ got a car.',
    blankAnswers: ['haven’t'],
    options: ['haven’t', 'hasn’t', 'don’t', 'aren’t'],
    answer: 'haven’t',
    answerTranslation: L(
      '우리는 자동차가 없어요.',
      'Bizning mashinamiz yo‘q.',
      'We haven’t got a car.',
      'У нас нет машины.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got'],
  },

  en_s1u4_n5_043_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Has your sister got a pet?',
    audioText: 'Has your sister got a pet?',
    answerTranslation: L(
      '여자 형제에게 반려동물이 있어요?',
      'Opangiz yoki singlingizning uy hayvoni bormi?',
      'Has your sister got a pet?',
      'У вашей сестры есть питомец?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got-question'],
  },

  en_s1u4_n5_044_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Has your sister got a pet?' }],
    options: [
      'Yes, she has.',
      'Yes, she have.',
      'Yes, she does.',
      'Yes, she is.',
    ],
    answer: 'Yes, she has.',
    answerTranslation: L('네, 있어요.', 'Ha, bor.', 'Yes, she has.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got-short-answer'],
  },

  en_s1u4_n5_045_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friend’s brother is a teacher.',
    audioText: 'My friend’s brother is a teacher.',
    answerTranslation: L(
      '제 친구의 남자 형제는 선생님이에요.',
      'Do‘stimning akasi yoki ukasi o‘qituvchi.',
      'My friend’s brother is a teacher.',
      'Брат моего друга — учитель.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'possessive-s'],
  },

  en_s1u4_n5_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      '소유를 나타내는 올바른 표현을 고르세요.',
      'Egalikni bildiradigan to‘g‘ri shaklni tanlang.',
      'Choose the correct possessive form.',
      'Выберите правильную притяжательную форму.',
    ),
    sentenceTemplate: 'This is my ___ car.',
    blankAnswers: ['mother’s'],
    options: ['mother’s', 'mothers', "mother're", 'mother'],
    answer: 'mother’s',
    answerTranslation: L(
      '이것은 제 어머니의 자동차예요.',
      'Bu onamning mashinasi.',
      'This is my mother’s car.',
      'Это машина моей мамы.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'possessive-s'],
  },

  en_s1u4_n5_047_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My friends watch films at the weekend.',
    audioText: 'My friends watch films at the weekend.',
    answerTranslation: L(
      '제 친구들은 주말에 영화를 봐요.',
      'Do‘stlarim dam olish kunlari film ko‘radi.',
      'My friends watch films at the weekend.',
      'Мои друзья смотрят фильмы на выходных.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'present-simple-positive'],
  },

  en_s1u4_n5_048_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'She ___ in a hospital.',
    blankAnswers: ['works'],
    options: ['works', 'work', 'doesn’t', 'working'],
    answer: 'works',
    answerTranslation: L(
      '그녀는 병원에서 일해요.',
      'U kasalxonada ishlaydi.',
      'She works in a hospital.',
      'Она работает в больнице.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'present-simple-positive'],
  },

  en_s1u4_n5_049_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I don’t go to work by bus.',
    audioText: 'I don’t go to work by bus.',
    answerTranslation: L(
      '저는 버스로 출근하지 않아요.',
      'Men ishga avtobusda bormayman.',
      'I don’t go to work by bus.',
      'Я не езжу на работу на автобусе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'present-simple-negative'],
  },

  en_s1u4_n5_050_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: ['I', 'don’t', 'go', 'to', 'work', 'by', 'bus', 'goes'],
    answer: 'I don’t go to work by bus',
    audioText: 'I don’t go to work by bus.',
    answerTranslation: L(
      '저는 버스로 출근하지 않아요.',
      'Men ishga avtobusda bormayman.',
      'I don’t go to work by bus.',
      'Я не езжу на работу на автобусе.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'negative'],
  },

  en_s1u4_n5_051_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does your husband work in an office?',
    audioText: 'Does your husband work in an office?',
    answerTranslation: L(
      '남편은 사무실에서 일해요?',
      'Eringiz ofisda ishlaydimi?',
      'Does your husband work in an office?',
      'Ваш муж работает в офисе?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'does-question'],
  },

  en_s1u4_n5_052_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: '___ your friends read comics?',
    blankAnswers: ['Do'],
    options: ['Do', 'Does', 'Are', 'Has'],
    answer: 'Do',
    answerTranslation: L(
      '친구들은 만화책을 읽어요?',
      'Do‘stlaringiz komiks o‘qiydimi?',
      'Do your friends read comics?',
      'Ваши друзья читают комиксы?',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'do-question'],
  },

  en_s1u4_n5_053_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, they do.',
    audioText: 'Yes, they do.',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, they do.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'short-answer'],
  },

  en_s1u4_n5_054_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Does Mina cycle to university?' }],
    options: [
      'Yes, she does.',
      'Yes, she do.',
      'Yes, she cycles does.',
      'Yes, she is.',
    ],
    answer: 'Yes, she does.',
    answerTranslation: L('네, 그래요.', 'Ha.', 'Yes, she does.', 'Да.'),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'short-answer'],
  },

  en_s1u4_n5_055_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'The phone is new, not old.',
    audioText: 'The phone is new, not old.',
    answerTranslation: L(
      '그 휴대전화는 오래된 게 아니라 새것이에요.',
      'Telefon eski emas, yangi.',
      'The phone is new, not old.',
      'Телефон новый, а не старый.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'opposites'],
  },

  en_s1u4_n5_056_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'cheap의 반대말을 고르세요.',
      'cheap so‘zining teskarisini tanlang.',
      'Choose the opposite of cheap.',
      'Выберите антоним cheap.',
    ),
    sentenceTemplate: 'cheap ↔ ___',
    blankAnswers: ['expensive'],
    options: ['expensive', 'happy', 'new', 'cold'],
    answer: 'expensive',
    answerTranslation: L(
      'cheap ↔ expensive',
      'cheap ↔ expensive',
      'cheap ↔ expensive',
      'cheap ↔ expensive',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'opposites'],
  },

  en_s1u4_n5_057_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She is happy, not sad.',
    audioText: 'She is happy, not sad.',
    answerTranslation: L(
      '그녀는 슬픈 게 아니라 행복해요.',
      'U xafa emas, xursand.',
      'She is happy, not sad.',
      'Она счастлива, а не грустна.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'opposites'],
  },

  en_s1u4_n5_058_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: L(
      'hot의 반대말을 고르세요.',
      'hot so‘zining teskarisini tanlang.',
      'Choose the opposite of hot.',
      'Выберите антоним hot.',
    ),
    sentenceTemplate: 'hot ↔ ___',
    blankAnswers: ['cold'],
    options: ['cold', 'poor', 'young', 'small'],
    answer: 'cold',
    answerTranslation: L(
      'hot ↔ cold',
      'hot ↔ cold',
      'hot ↔ cold',
      'hot ↔ cold',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'opposites'],
  },

  en_s1u4_n5_059_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My parents and my sister live near me.',
    audioText: 'My parents and my sister live near me.',
    answerTranslation: L(
      '제 부모님과 여자 형제는 제 근처에 살아요.',
      'Ota-onam va opam yoki singlim menga yaqin yashaydi.',
      'My parents and my sister live near me.',
      'Мои родители и сестра живут рядом со мной.',
    ),
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 1,
    tags: ['review', 'family'],
  },

  en_s1u4_n5_060_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: [
      'My',
      'brother',
      'doesn’t',
      'drive',
      'to',
      'work',
      'he',
      'cycles',
    ],
    answer: 'My brother doesn’t drive to work',
    answerTranslation: L(
      '제 남자 형제는 운전해서 출근하지 않아요.',
      'Akam yoki ukam ishga mashina haydab bormaydi.',
      'My brother doesn’t drive to work.',
      'Мой брат не ездит на работу на машине.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'present-simple-negative'],
  },

  // ===========================================================
  // Lesson 4 · Functional language review
  // ===========================================================

  en_s1u4_n5_061_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Can I help you?',
    audioText: 'Can I help you?',
    answerTranslation: L(
      '도와드릴까요?',
      'Sizga yordam bera olamanmi?',
      'Can I help you?',
      'Могу я вам помочь?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'shop'],
  },

  en_s1u4_n5_062_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Can I help you?',
    options: ['Yes', 'do', 'you', 'have', 'any', 'bags', 'much'],
    answer: 'Yes do you have any bags',
    answerTranslation: L(
      '네. 가방이 있나요?',
      'Ha. Sumkalaringiz bormi?',
      'Yes. Do you have any bags?',
      'Да. У вас есть сумки?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'shop'],
  },

  en_s1u4_n5_063_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Yes, they’re over there.',
    audioText: 'Yes, they’re over there.',
    answerTranslation: L(
      '네, 저쪽에 있어요.',
      'Ha, ular ana u yerda.',
      'Yes, they’re over there.',
      'Да, они вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'shop'],
  },

  en_s1u4_n5_064_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'user', text: 'Do you have any bags?' }],
    options: [
      'Yes, they’re over there.',
      'Yes, it is over there.',
      'Yes, they does.',
      'Yes, we bag.',
    ],
    answer: 'Yes, they’re over there.',
    answerTranslation: L(
      '네, 저쪽에 있어요.',
      'Ha, ular ana u yerda.',
      'Yes, they’re over there.',
      'Да, они вон там.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'shop'],
  },

  en_s1u4_n5_065_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'How much is the small bag?',
    audioText: 'How much is the small bag?',
    answerTranslation: L(
      '작은 가방은 얼마예요?',
      'Kichik sumka qancha turadi?',
      'How much is the small bag?',
      'Сколько стоит маленькая сумка?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'price'],
  },

  en_s1u4_n5_066_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'How ___ is the small bag?',
    blankAnswers: ['much'],
    options: ['much', 'many', 'price', 'money'],
    answer: 'much',
    answerTranslation: L(
      '작은 가방은 얼마예요?',
      'Kichik sumka qancha turadi?',
      'How much is the small bag?',
      'Сколько стоит маленькая сумка?',
    ),
    lessonCategory: LessonCategory.EXPRESSION,
    difficulty: 1,
    tags: ['review', 'price'],
  },

  en_s1u4_n5_067_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'It’s thirty-five euros ninety-nine.',
    audioText: 'It’s thirty-five euros ninety-nine.',
    answerTranslation: L(
      '35유로 99센트예요.',
      'O‘ttiz besh yevro to‘qson to‘qqiz.',
      'It’s thirty-five euros ninety-nine.',
      'Это тридцать пять евро девяносто девять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'price'],
  },

  en_s1u4_n5_068_word_arrange: {
    type: 'word_arrange',
    level: LV,
    instruction: ARRANGE_INSTRUCTION,
    options: [
      'It’s',
      'thirty-five',
      'euros',
      'ninety-nine',
      'pounds',
      'twenty',
    ],
    answer: 'It’s thirty-five euros ninety-nine',
    audioText: 'It’s thirty-five euros ninety-nine.',
    answerTranslation: L(
      '35유로 99센트예요.',
      'O‘ttiz besh yevro to‘qson to‘qqiz.',
      'It’s thirty-five euros ninety-nine.',
      'Это тридцать пять евро девяносто девять.',
    ),
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 1,
    tags: ['review', 'price'],
  },

  en_s1u4_n5_069_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'OK. I’ll take it.',
    audioText: 'OK. I’ll take it.',
    answerTranslation: L(
      '좋아요. 이걸 살게요.',
      'Mayli. Buni olaman.',
      'OK. I’ll take it.',
      'Хорошо. Я возьму это.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'shop'],
  },

  en_s1u4_n5_070_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Is that everything?' }],
    options: [
      'No, I need a book too.',
      'No, I does a book too.',
      'No, book is everything.',
      'No, I’m book too.',
    ],
    answer: 'No, I need a book too.',
    answerTranslation: L(
      '아니요. 책도 한 권 필요해요.',
      'Yo‘q. Menga yana kitob kerak.',
      'No, I need a book too.',
      'Нет. Мне ещё нужна книга.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'shop'],
  },

  en_s1u4_n5_071_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'My sister has got a new phone.',
    audioText: 'My sister has got a new phone.',
    answerTranslation: L(
      '제 여자 형제에게 새 휴대전화가 있어요.',
      'Opam yoki singlimning yangi telefoni bor.',
      'My sister has got a new phone.',
      'У моей сестры новый телефон.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got'],
  },

  en_s1u4_n5_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: LV,
    instruction: FILL_INSTRUCTION,
    sentenceTemplate: 'My sister ___ got a new phone.',
    blankAnswers: ['has'],
    options: ['has', 'have', 'does', 'is'],
    answer: 'has',
    answerTranslation: L(
      '제 여자 형제에게 새 휴대전화가 있어요.',
      'Opam yoki singlimning yangi telefoni bor.',
      'My sister has got a new phone.',
      'У моей сестры новый телефон.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'have-got'],
  },

  en_s1u4_n5_073_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'She doesn’t drive. She goes to work by train.',
    audioText: 'She doesn’t drive. She goes to work by train.',
    answerTranslation: L(
      '그녀는 운전하지 않아요. 기차로 출근해요.',
      'U mashina haydamaydi. Ishga poyezdda boradi.',
      'She doesn’t drive. She goes to work by train.',
      'Она не водит машину. Она ездит на работу на поезде.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'transport'],
  },

  en_s1u4_n5_074_translate_builder: {
    type: 'translate_builder',
    level: LV,
    instruction: TRANSLATE_INSTRUCTION,
    options: ['She', 'goes', 'to', 'work', 'by', 'train', 'go', 'doesn’t'],
    answer: 'She goes to work by train',
    answerTranslation: L(
      '그녀는 기차로 출근해요.',
      'U ishga poyezdda boradi.',
      'She goes to work by train.',
      'Она ездит на работу на поезде.',
    ),
    lessonCategory: LessonCategory.GRAMMAR,
    difficulty: 1,
    tags: ['review', 'transport'],
  },

  en_s1u4_n5_075_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'Does your brother get up early?',
    audioText: 'Does your brother get up early?',
    answerTranslation: L(
      '남자 형제는 일찍 일어나요?',
      'Akangiz yoki ukangiz erta turadimi?',
      'Does your brother get up early?',
      'Ваш брат рано встаёт?',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'routine-question'],
  },

  en_s1u4_n5_076_reply_builder: {
    type: 'reply_builder',
    level: LV,
    instruction: REPLY_INSTRUCTION,
    npcText: 'Does your brother get up early?',
    options: ['No', 'he', 'doesn’t', 'he', 'gets', 'up', 'late'],
    answer: 'No he doesn’t he gets up late',
    answerTranslation: L(
      '아니요. 그는 늦게 일어나요.',
      'Yo‘q. U kech turadi.',
      'No, he doesn’t. He gets up late.',
      'Нет. Он встаёт поздно.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'routine'],
  },

  en_s1u4_n5_077_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer: 'I get up at seven, go to work by bus and finish work at six.',
    audioText: 'I get up at seven, go to work by bus and finish work at six.',
    answerTranslation: L(
      '저는 7시에 일어나 버스로 출근하고 6시에 일을 끝내요.',
      'Men soat yettida turaman, ishga avtobusda boraman va ishni oltida tugataman.',
      'I get up at seven, go to work by bus and finish work at six.',
      'Я встаю в семь, езжу на работу на автобусе и заканчиваю работу в шесть.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'routine'],
  },

  en_s1u4_n5_078_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [{ speaker: 'npc', text: 'Do you work at the weekend?' }],
    options: [
      'No, I don’t. I go out with friends.',
      'No, I doesn’t. I goes out.',
      'No, I’m not. I do go friends.',
      'No, I haven’t. I go out.',
    ],
    answer: 'No, I don’t. I go out with friends.',
    answerTranslation: L(
      '아니요. 친구들과 외출해요.',
      'Yo‘q. Do‘stlar bilan tashqariga chiqaman.',
      'No, I don’t. I go out with friends.',
      'Нет. Я выхожу с друзьями.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'routine'],
  },

  en_s1u4_n5_079_speaking: {
    type: 'speaking',
    level: LV,
    instruction: SPEAK_INSTRUCTION,
    answer:
      'My parents have got a car, but they usually go to the centre by train.',
    audioText:
      'My parents have got a car, but they usually go to the centre by train.',
    answerTranslation: L(
      '부모님은 차가 있지만 보통 기차로 도심에 가요.',
      'Ota-onamning mashinasi bor, lekin ular odatda markazga poyezdda boradi.',
      'My parents have got a car, but they usually go to the centre by train.',
      'У моих родителей есть машина, но обычно они ездят в центр на поезде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'integrated'],
  },

  en_s1u4_n5_080_dialog_complete: {
    type: 'dialog_complete',
    level: LV,
    instruction: DIALOG_INSTRUCTION,
    dialogLines: [
      { speaker: 'npc', text: 'Does your sister work in an office?' },
      { speaker: 'user', text: 'No, she doesn’t. She works at home.' },
      { speaker: 'npc', text: 'How does she go to meetings?' },
    ],
    options: [
      'She usually goes by train.',
      'She usually go by train.',
      'She does usually goes train.',
      'She usually is by train.',
    ],
    answer: 'She usually goes by train.',
    answerTranslation: L(
      '그녀는 보통 기차로 가요.',
      'U odatda poyezdda boradi.',
      'She usually goes by train.',
      'Она обычно ездит на поезде.',
    ),
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 1,
    tags: ['review', 'final'],
  },
};

export const EN_S1_UNIT4_NODE5 = {
  title: L(
    '하루 일과와 Unit 4 복습',
    'Kun tartibi va Unit 4 takrori',
    'Daily routines and review',
    'Распорядок дня и повторение',
  ),
  section: 1,
  unit: 4,
  order: 5,
  isActive: true,

  lessons: [
    {
      title: L(
        '기자의 하루',
        'Jurnalistning bir kuni',
        'A journalist’s day',
        'День журналиста',
      ),
      description: L(
        'cook dinner, listen to the news, write a story, play the guitar 같은 동사구를 익히고 영상 속 기자의 하루 일과를 들어요.',
        'cook dinner, listen to the news, write a story va play the guitar kabi fe’l birikmalarini o‘rganib, jurnalistning kun tartibini tinglaysiz.',
        'Learn the video verb phrases and follow a journalist’s working day and evening routine.',
        'Изучаем глагольные сочетания из видео и распорядок рабочего дня журналиста.',
      ),
      category: LessonCategory.LISTENING,
      level: LV,
      order: 1,
      questions: [
        'en_s1u4_n5_001_speaking',
        'en_s1u4_n5_002_fill_in_blank',
        'en_s1u4_n5_003_speaking',
        'en_s1u4_n5_004_word_arrange',
        'en_s1u4_n5_005_speaking',
        'en_s1u4_n5_006_fill_in_blank',
        'en_s1u4_n5_007_speaking',
        'en_s1u4_n5_008_translate_builder',
        'en_s1u4_n5_009_speaking',
        'en_s1u4_n5_010_fill_in_blank',
        'en_s1u4_n5_011_speaking',
        'en_s1u4_n5_012_dialog_complete',
        'en_s1u4_n5_013_speaking',
        'en_s1u4_n5_014_fill_in_blank',
        'en_s1u4_n5_015_speaking',
        'en_s1u4_n5_016_word_arrange',
        'en_s1u4_n5_017_speaking',
        'en_s1u4_n5_018_fill_in_blank',
        'en_s1u4_n5_019_speaking',
        'en_s1u4_n5_020_dialog_complete',
      ],
    },

    {
      title: L(
        '다른 사람의 하루 묻기',
        'Boshqalarning kuni haqida so‘rash',
        'Ask about daily routines',
        'Спрашиваем о распорядке дня',
      ),
      description: L(
        'Do you...?, What time do you...?, What do you...?, What transport do you...?, Where do you...?를 사용해 일상을 질문하고 답을 정리해 말해요.',
        'Do you...?, What time do you...?, What do you...?, What transport do you...? va Where do you...? bilan kun tartibi haqida savol berib, javoblarni aytasiz.',
        'Use the five question patterns from the video lesson to ask about another person’s daily routine and report the answers.',
        'Используем пять типов вопросов из видео, чтобы узнать распорядок другого человека и рассказать об ответах.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 2,
      questions: [
        'en_s1u4_n5_021_speaking',
        'en_s1u4_n5_022_fill_in_blank',
        'en_s1u4_n5_023_speaking',
        'en_s1u4_n5_024_word_arrange',
        'en_s1u4_n5_025_speaking',
        'en_s1u4_n5_026_translate_builder',
        'en_s1u4_n5_027_speaking',
        'en_s1u4_n5_028_fill_in_blank',
        'en_s1u4_n5_029_speaking',
        'en_s1u4_n5_030_reply_builder',
        'en_s1u4_n5_031_speaking',
        'en_s1u4_n5_032_dialog_complete',
        'en_s1u4_n5_033_speaking',
        'en_s1u4_n5_034_fill_in_blank',
        'en_s1u4_n5_035_speaking',
        'en_s1u4_n5_036_translate_builder',
        'en_s1u4_n5_037_speaking',
        'en_s1u4_n5_038_reply_builder',
        'en_s1u4_n5_039_speaking',
        'en_s1u4_n5_040_dialog_complete',
      ],
    },

    {
      title: L(
        'Units 3–4 문법 복습',
        'Units 3–4 grammatika takrori',
        'Units 3–4 grammar review',
        'Повторение грамматики Units 3–4',
      ),
      description: L(
        'have got, 소유격 ’s, 현재시제 긍정·부정, Do/Does 질문과 짧은 대답, 반대 형용사와 가족 표현을 복습해요.',
        'have got, egalik ’s, Present Simple tasdiq va inkor shakllari, Do/Does savollari, qisqa javoblar, qarama-qarshi sifatlar va oila so‘zlarini takrorlaysiz.',
        'Review have got, possessive ’s, present simple forms, Do/Does questions, short answers, opposites and family vocabulary.',
        'Повторяем have got, притяжательное ’s, Present Simple, вопросы Do/Does, краткие ответы, антонимы и лексику семьи.',
      ),
      category: LessonCategory.GRAMMAR,
      level: LV,
      order: 3,
      questions: [
        'en_s1u4_n5_041_speaking',
        'en_s1u4_n5_042_fill_in_blank',
        'en_s1u4_n5_043_speaking',
        'en_s1u4_n5_044_dialog_complete',
        'en_s1u4_n5_045_speaking',
        'en_s1u4_n5_046_fill_in_blank',
        'en_s1u4_n5_047_speaking',
        'en_s1u4_n5_048_fill_in_blank',
        'en_s1u4_n5_049_speaking',
        'en_s1u4_n5_050_word_arrange',
        'en_s1u4_n5_051_speaking',
        'en_s1u4_n5_052_fill_in_blank',
        'en_s1u4_n5_053_speaking',
        'en_s1u4_n5_054_dialog_complete',
        'en_s1u4_n5_055_speaking',
        'en_s1u4_n5_056_fill_in_blank',
        'en_s1u4_n5_057_speaking',
        'en_s1u4_n5_058_fill_in_blank',
        'en_s1u4_n5_059_speaking',
        'en_s1u4_n5_060_translate_builder',
      ],
    },

    {
      title: L(
        'Units 3–4 종합 복습',
        'Units 3–4 umumiy takrorlash',
        'Units 3–4 review',
        'Повторение Units 3–4',
      ),
      description: L(
        '가게에서 물건을 요청하고 가격을 묻는 표현, 교통수단, have got, 현재시제 질문과 하루 일과를 한꺼번에 다시 사용해요.',
        'Do‘konda buyum so‘rash, narx so‘rash, transport, have got, Present Simple savollari va kun tartibini birgalikda takrorlaysiz.',
        'Recycle shop language, prices, transport, have got, present-simple questions and daily routines.',
        'Повторяем язык магазина, цены, транспорт, have got, вопросы Present Simple и распорядок дня.',
      ),
      category: LessonCategory.CONVERSATION,
      level: LV,
      order: 4,
      questions: [
        'en_s1u4_n5_061_speaking',
        'en_s1u4_n5_062_reply_builder',
        'en_s1u4_n5_063_speaking',
        'en_s1u4_n5_064_dialog_complete',
        'en_s1u4_n5_065_speaking',
        'en_s1u4_n5_066_fill_in_blank',
        'en_s1u4_n5_067_speaking',
        'en_s1u4_n5_068_word_arrange',
        'en_s1u4_n5_069_speaking',
        'en_s1u4_n5_070_dialog_complete',
        'en_s1u4_n5_071_speaking',
        'en_s1u4_n5_072_fill_in_blank',
        'en_s1u4_n5_073_speaking',
        'en_s1u4_n5_074_translate_builder',
        'en_s1u4_n5_075_speaking',
        'en_s1u4_n5_076_reply_builder',
        'en_s1u4_n5_077_speaking',
        'en_s1u4_n5_078_dialog_complete',
        'en_s1u4_n5_079_speaking',
        'en_s1u4_n5_080_dialog_complete',
      ],
    },
  ],
};
